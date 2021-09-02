<script src="../store/user/actions.js"></script>
<template>
  <q-page class="q-pa-sm"  v-if="userRole === 'SuperAdmin' || 'Admin' || 'Recruiter' ">
    <q-card class="full-width">
      <q-table
        v-if="userRole === 'SuperAdmin' || 'Admin' || 'Recruiter' "
        :class="loading ? '' : 'table'"
        virtual-scroll
        title="Candidats"
        :data="allCandidates"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="name"
        :grid="mode==='grid'"
        :filter="filter"
        @row-click="onRowClick"
        :pagination.sync="pagination"
        :loading="loading"
      >
        <template v-slot:top-left>
          <div class="row">
            <div class="text-h6">Candidats</div>
            <q-btn
              :disable="loading"
              label="rafraichir"
              :loading="loading"
              icon-right="refresh"
              @click="refresh()"
              unelevated
              color="primary"
              class="q-ml-md q-ma-xs"
              size="xs"
            />
          </div>
        </template>
        <template v-slot:top-right="props">
          <q-input style="width: 280px;" outlined dense debounce="300" v-model="filter" placeholder="Recherche par nom, email, métier...">
            <template v-slot:append>
              <q-icon name="search"/>

            </template>
          </q-input>

          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            v-if="mode === 'list'"
          >

            <q-tooltip :disable="$q.platform.is.mobile" v-close-popup>
              {{ props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen' }}
            </q-tooltip>
          </q-btn>

          <q-btn
            flat round dense :icon="mode === 'grid' ? 'list' : 'grid_on'"
            @click="mode = mode === 'grid' ? 'list' : 'grid'; separator = mode === 'grid' ? 'none' : 'horizontal'"
            v-if="!props.inFullscreen"
          >
            <q-tooltip :disable="$q.platform.is.mobile" v-close-popup>
              {{ mode === 'grid' ? 'List' : 'Grid' }}
            </q-tooltip>
          </q-btn>

          <q-btn
            color="primary"
            v-if="userRole === 'SuperAdmin'"
            icon-right="archive"
            label="Exporter en csv"
            no-caps
            @click="exportTable()"
          />

        </template>
        <template v-slot:body-cell-zip_code="props">
          <q-td :props="props">
            {{ props.value ? props.value : '-' }}
          </q-td>
        </template>
        <template v-slot:body-cell-phone="props">
          <q-td :props="props">
            {{ props.value ? props.value : '-' }}
          </q-td>
        </template>
        <template v-slot:body-cell-createdAt="props">
          <q-td :props="props">
            {{ props.value }}
          </q-td>
        </template>
        <template v-slot:body-cell-updatedAt="props">
          <q-td :props="props">
            {{ props.value }}
          </q-td>
        </template>
        <template v-slot:body-cell-métier="props">
          <q-td :props="props">
            <div v-if="!props.value || props.value.length === 0">-</div>
            <div v-else>
              <div v-for="(job, index) in props.value" :key="index">
                {{ index === props.value.length -1 ? job : job + ', ' }}
              </div>
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-activated="props">
          <q-td :props="props">
            <q-chip
              :color="props.row.accountActivated == true ? 'green': 'red'"
              text-color=" white"
              dense
              class="text-weight-bolder"
              square
              style="width: 50px"
            >
              <span
                style="color: white">{{ props.row.accountActivated == true ? 'oui' : 'non' }}</span>
            </q-chip>
          </q-td>
        </template>
        <template v-slot:body-cell-quiz_rating="props">
          <q-td :props="props">
            {{ props.row.note ? props.row.note : '-'  }}
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script>
import { exportFile, LocalStorage } from "quasar"
import { mapGetters, mapActions } from "vuex"
import { date } from 'quasar'

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
}

export default {
  data() {
    return {
      loading: false,
      filter: "",
      mode: "list",
      user_details: false,
      rowInfos: null,
      users: [],
      columns: [
        {
          name: "lastname",
          align: "left",
          label: "Nom",
          field: "lastname",
          sortable: true
        },
        {
          name: "firstname",
          align: "left",
          label: "Prénom",
          field: "firstname",
          sortable: true
        },
        {
          name: "email",
          align: "left",
          label: "Email",
          field: "email",
          sortable: true
        },
        {
          name: "phone",
          align: "left",
          label: "Téléphone",
          field: "phone",
          sortable: true
        },
        {
          name: "zip_code",
          align: "left",
          label: "Code Postal",
          field: "zip_code",
          sortable: true
        },
        {
          name: "createdAt",
          align: "left",
          label: "Date d'inscription",
          field: "createdAt",
          sortable: true
        },
        {
          name: "métier",
          align: "left",
          label: "Métier",
          field: "métier",
          sortable: true
        },
        {
          name: "activated",
          align: "left",
          label: "Activé",
          field: "accountActivated",
          sortable: true
        },
        {
          name: "quiz_rating",
          align: "left",
          label: "Notes",
          field: "note",
          sortable: true
        },
      ],

      pagination: {
        rowsPerPage: 200
      }
    };
  },
  async mounted() {
    // if already loaded, useless to fetch all datas
    if (this.allCandidates.length === 0) {
      this.loading = true
      if(this.userRole === 'SuperAdmin' || 'Admin' || 'Recruiter') {
        await this.getAllCandidates()
        this.loading = false
      }
    }
  },
  computed: {
    ...mapGetters("auth", ["userRole"]),
    ...mapGetters("user", ["allCandidates"]),
  },
  methods: {
    ...mapActions('user', ['getAllCandidates']),
    async refresh() {
      this.loading = true
      if(this.userRole === 'SuperAdmin' || 'Admin' || 'Recruiter') {
        await this.getAllCandidates()
        this.loading = false
      }
    },
    exportTable() {
      const content = [this.columns.map(col => wrapCsvValue(col.label))]
        .concat(
          this.allCandidates.map(row =>
            this.columns
              .map(col =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row) : row[col.field === void 0 ? col.name : col.field], col.format))
              .join(",")))
        .join("\r\n");

      const status = exportFile("users.csv", content, "text/csv");

      if (status !== true) {
        this.$q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning"
        });
      }
    },

    onRowClick(evt, row) {
      // this.rowInfos = row
      // this.user_details = true
      this.$router.push(`/candidate/${row.id}`)
    },

    sendForm(formValue) {
    },

  }
};
</script>
<style scoped>

.table {
  height: 90vh;
}

</style>
