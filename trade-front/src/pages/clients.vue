<template>
  <q-page class="q-pa-sm">
    <q-card class="full-width">
      <q-table
        :class="loading ? '' : 'table'"
        virtual-scroll
        title="Clients"
        :data="companies"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="name"
        :grid="mode === 'grid'"
        :filter="filter"
        @row-click="onRowClick"
        :pagination.sync="pagination"
      >
        <template v-slot:top-right="props">
          <q-btn
            @click="company_creation = true"
            outline
            color="primary"
            label="Ajouter une entreprise"
            class="q-mr-xs"
            v-if="userRole === 'SuperAdmin'"
          />

          <q-input
            outlined
            dense
            debounce="300"
            v-model="filter"
            placeholder="Rechercher"
          >
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
            <q-tooltip
              :disable="$q.platform.is.mobile"
              v-close-popup
            >
              {{ props.inFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen" }}
            </q-tooltip>
          </q-btn>

          <q-btn
            flat
            round
            dense
            :icon="mode === 'grid' ? 'list' : 'grid_on'"
            @click="mode = mode === 'grid' ? 'list' : 'grid';
              separator = mode === 'grid' ? 'none' : 'horizontal';
            "
            v-if="!props.inFullscreen"
          >
            <q-tooltip
              :disable="$q.platform.is.mobile"
              v-close-popup
            >
              {{ mode === "grid" ? "List" : "Grid" }}
            </q-tooltip>
          </q-btn>
        </template>
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-chip
              :color="
                props.row.status == 'Active'? 'green': props.row.status == 'Inactive'? 'red': 'grey'"
              text-color="white"
              dense
              class="text-weight-bolder"
              square
              style="width: 85px"
            >
              {{ props.row.status }}
            </q-chip>
          </q-td>
        </template>
      </q-table>
    </q-card>
    <add-company
      @closeModal="company_creation = false"
      @reload="init(), company_creation = false"
      :modalOpen="company_creation"
      :companyCreate="companyCreationObj"
    />
  </q-page>
</template>

<script>
import AddCompany from "../components/company/addCompany.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    AddCompany,
  },
  data() {
    return {
      loading: false,
      filter: "",
      mode: "list",
      companyCreationObj: {},
      company_details: false,
      company_creation: false,
      columns: [
        {
          name: "name",
          align: "left",
          label: "Nom",
          field: "name",
          sortable: true,
        },
        {
          name: "adress",
          required: true,
          label: "Adresse",
          align: "left",
          field: "street",
          sortable: true,
        },
        {
          name: "zip_code",
          align: "left",
          label: "Code postal",
          field: "zip_code",
          sortable: true,
        },
        {
          name: "town",
          align: "left",
          label: "Ville",
          field: "city",
          sortable: true,
        },

        {
          name: "siret",
          align: "left",
          label: "Siret",
          field: "siret",
          sortable: true,
        },
      ],
      pagination: {
        rowsPerPage: 10,
      },
    };
  },

  mounted() {
    this.init()
  },
  computed: {
    ...mapGetters('auth', ['userRole']),
    ...mapGetters('company', ['companies']),
  },
  methods: {
    ...mapActions('company', ['getCompanies']),
    async init() {
      this.loading = true
      await this.getCompanies()
        .then(() => this.loading = false)
        .catch(() => {
          this.loading = false
          this.$q.notify('Un problème est survenu lors de la récupération des données')
        })
    },
    onRowClick(evt, row) {
      this.$router.push(`/client/${row.id}`)
    }
  }
}
</script>
<style scoped>

.q-chip__content {
  display: block;
  text-align: center;
}

.my-input {
  max-width: 250px;
}

.table {
  height: 90vh;
}

</style>
