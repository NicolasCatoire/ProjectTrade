<template>
  <q-dialog v-model="dialog">
    <q-card style="min-width: 700px; max-width: 60vw;">
      <q-form @submit="onSubmit">
        <div class="q-pa-md">
          <q-card style="min-height: 600px;" class="column justify-between">
            <div>
              <q-tabs
                v-model="tab"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="justify"
                narrow-indicator
              >
                <q-tab name="company" label="Entreprise" :alert="validators.companyErr ? 'red': false" />
                <q-tab name="admin" label="Admin" :alert="validators.adminErr ? 'red': false" />
              </q-tabs>

              <q-separator />
            
              <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="company">
                  <q-card-section>
                    <div class="text-h6">
                      Ajouter une entreprise
                      <q-btn
                        round
                        flat
                        dense
                        icon="close"
                        class="float-right"
                        color="grey-8"
                        v-close-popup
                      ></q-btn>
                    </div>
                  </q-card-section>
                  <q-separator inset />
                  <company-card-section 
                    :companyFields="companyFields"
                    :formModel="form.company"
                  />
                </q-tab-panel>
                <q-tab-panel name="admin">
                  <q-card-section>
                    <div class="text-h6">
                      Ajouter un admin
                      <q-btn
                        round
                        flat
                        dense
                        icon="close"
                        class="float-right"
                        color="grey-8"
                        v-close-popup
                      ></q-btn>
                    </div>
                  </q-card-section>
                  <q-separator inset></q-separator>
                  <q-card-section>
                    <div
                      class="
                        q-col-gutter-md
                        row
                        justify-center
                        items-center
                        align-center
                      "
                    >
                      <div class="col-12">
                        <q-input
                          filled
                          color="orange"
                          dense
                          outlined
                          v-model="form.admin.lastname"
                          label="Nom"
                          hide-bottom-space
                          :rules="[val => !!val || 'Champ requis']"
                        />
                      </div>
                      <div class="col-12">
                        <q-input
                          filled
                          color="orange"
                          dense
                          outlined
                          v-model="form.admin.firstname"
                          label="Prénom"
                          hide-bottom-space
                          :rules="[val => !!val || 'Champ requis']"
                        />
                      </div>

                      <div class="col-12">
                        <q-input
                          filled
                          color="orange"
                          dense
                          outlined
                          v-model="form.admin.email"
                          label="Email"
                          type="email"
                          hide-bottom-space
                          :rules="[val => !!val || 'Champ requis']"
                        />
                      </div>
                      <div class="col-12">
                        <q-input
                          filled
                          color="orange"
                          dense
                          outlined
                          v-model="form.admin.phone"
                          label="Téléphone"
                        />
                      </div>
                    </div>
                  </q-card-section>
                </q-tab-panel>
              </q-tab-panels>
            </div>
            <q-card-actions align="right" class="q-pt-none text-teal">
              <q-btn :loading="loading" label="Ajouter l'entreprise" type="submit" color="primary" />
            </q-card-actions>
   
          </q-card>
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions } from "vuex"
import CompanyCardSection from "./companyCardSection.vue"

export default {
  name: "addCompany",
  props: ["modalOpen"],
  components: {
    CompanyCardSection
  },
  data() {
    return {
      validators: {
        companyErr: false,
        adminErr: false
      },
      loading: false,
      tab: "company",
      form: {
        company: {
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
          colors: {
            primary: "#000000",
            secondary: "#000000",
          }
        },
        admin: {
          email: "",
          username: "",
          phone: "",
          firstname: "",
          lastname: "",
        },
      },
      companyFields: [
        {
          label: "Nom",
          model: 'name',
          mandatory: true
        },
        {
          label: "Code postal",
          model: 'zip_code',
          type: 'number',
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
          type: 'number',
          mandatory: true
        },
        {
          label: "Code APE",
          model: 'ape_code',
          mandatory: true
        },
        {
          label: "Secteur d'activité",
          model: 'activity_sector',
          mandatory: true
        },
        {
          label: "TVA intracommunautaire",
          model: 'tva',
          mandatory: true
        },
        {
          label: "Nbre. recrutements max",
          model: 'recruitments_limit',
          type: 'number',
          mandatory: true
        },
        {
          label: "Nbre. rdvs leihiens max",
          model: 'rdvs_limit',
          type: 'number',
          mandatory: true
        },
        {
          label: "Nbre. employés max",
          model: 'employees_limit',
          type: 'number',
          mandatory: true
        }
      ]
    };
  },
  computed: {
    dialog: {
      get() {
        return this.modalOpen;
      },
      set() {
        this.$emit("closeModal")
      },
    },
  },
  methods: {
    ...mapActions('company', ['addCompany']),
    async onSubmit() {
      this.form.admin.username = this.form.admin.email
      let alertCompany = 0
      let alertAdmin = 0
      const companyNotMandatory = ['activity_sector', 'tva']
      Object.keys(this.form.admin).forEach(key => {
        if (!this.form.admin[key]) {
          alertAdmin += 1
        }
      })
      Object.keys(this.form.company).forEach(key => {
        if (!this.form.company[key] && !companyNotMandatory.includes(key)) {
          alertCompany += 1
        }
      })
      if (alertAdmin || alertCompany) {
        alertAdmin ? this.validators.adminErr = true : this.validators.adminErr = false
        alertCompany ? this.validators.companyErr = true : this.validators.companyErr = false

        this.$q.notify('Veuillez remplir tous les champs des deux onglets')
      } else {
        this.loading = true
        await this.addCompany(this.form)
          .then(() => {
            this.loading = false
            this.$q.notify(`L'entreprise a été créée`)
            this.$emit("reload")
          })
          .catch(err => {
            this.loading = false
            this.$q.notify('une erreur est survenue. Veuillez vérifier les champs')
          })
      }
    }
  }
}
</script>

<style>

.q-validation-component.q-field--with-bottom{
  padding-bottom: 0px!important;
  transition: .5s .2s padding-bottom
}
.q-field--error.q-validation-component.q-field--with-bottom {
  padding-bottom: 20px
}

</style>
