<template>
  <q-dialog v-model="dialog">
    <q-card style="width: 1200px; max-width: 100vw;">
      <q-card-section>
        <div class="text-h6">
          <span>Détails - {{ form.name }}</span>
          <q-btn flat dense icon="close" class="float-right" color="grey-8" v-close-popup/>
        </div>
      </q-card-section>

      <q-separator inset />
      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md" @submit="onSubmit">
          <company-card-section
            :editing="modalOpen === true"
            :companyFields="companyFields"
            :formModel="form"
            :readonly="readonly"
          />
          <q-card-actions align="right" class="text-teal">
            <q-btn
              v-if="!readonly"
              label="Enregistrer"
              type="submit"
              color="primary"
              :loading="loading"
            />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import _ from "lodash"
import CompanyCardSection from "../company/companyCardSection.vue"

export default {
  name: "companyDetails",
  components: {
    CompanyCardSection
  },
  props: {
    modalOpen: Boolean,
    loading: Boolean,
    row: Object,
    readonly: Boolean
  },
  watch: {
    modalOpen: function(open) {
      if (open === true) {
        this.form = _.cloneDeep(this.row)
      }
    }
  },
  data() {
    return {
      openFilesModale: false,
      form: {
				name: "",
				street: "",
				zip_code: "",
				city: "",
				activity_sector: "",
				ape_code: "",
				siret: "",
				tva: "",
				recruitments_limit: "",
				rdvs_limit: "",
				employees_limit: "",
        offer: "",
        colors: {
					primary: "",
					secondary: ""
				}
			},
      text: 'Field content',
      companyFields: [
        {
          label: "Nom",
          model: 'name',
          mandatory: true
        },
        {
          label: "Code postal",
          model: 'zip_code',
          mandatory: true
        },
        {
          label: "Ville",
          model: 'city',
          mandatory: true
        },
        {
          label: "Adresse",
          model: 'street',
          mandatory: true
        },
        {
          label: "Siret",
          model: 'siret',
          mandatory: true
        },
        {
          label: "Code APE",
          model: 'ape_code',
          mandatory: false
        },
        {
          label: "Offre",
          model: 'offer',
          mandatory: false
        },
        {
          label: "Secteur d'activité",
          model: 'activity_sector',
          mandatory: false
        },
        {
          label: "TVA intracommunautaire",
          model: 'tva',
          mandatory: false
        },
        {
          label: "Nbre. recrutements max",
          model: 'recruitments_limit',
          mandatory: true
        },
        {
          label: "Nbre. rdvs leihiens max",
          model: 'rdvs_limit',
          mandatory: true
        },
        {
          label: "Nbre. employés max",
          model: 'employees_limit',
          mandatory: true
        }
      ]
    }
  },
  computed: {
    ...mapGetters("auth", ["userRole"]),
    dialog: {
      get() {
        return this.modalOpen
      },
      set() {
        this.$emit("closeModal")
      }
    }
  },
  methods: {
    openFiles() {
      this.openFilesModale = true
    },
    onSubmit() {
      const formData = {
        id: this.form.id,
        form: {
          name: this.form.name,
          street: this.form.street,
          zip_code: this.form.zip_code,
          city: this.form.city,
          activity_sector: this.form.activity_sector,
          ape_code: this.form.ape_code,
          siret: this.form.siret,
          tva: this.form.tva,
          recruitments_limit: this.form.recruitments_limit,
          rdvs_limit: this.form.rdvs_limit,
          employees_limit: this.form.employees_limit,
          offer: this.form.offer,
          colors: {
            primary: this.form.colors.primary,
            secondary: this.form.colors.secondary,
          }
        }
      }
      this.$emit('sendForm', formData)
    }
  }
}
</script>

<style scoped>

</style>
