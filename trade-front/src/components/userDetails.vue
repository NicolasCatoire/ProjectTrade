<template>
  <q-dialog v-model="dialog">
    <q-card style="width: 700px; max-width: 100vw;">
      <q-card-section>
        <div class="text-h6">
          <span>Détails {{ row_infos.name }}</span>
          <q-btn flat dense icon="close" class="float-right" color="grey-8" v-close-popup/>
        </div>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md" @submit="onSubmit">
          <q-list>
            <div class="q-pa-md">
              <div class="row q-col-gutter-x-xs q-col-gutter-y-xs">

                <q-item class="col-xs-12 col-sm-6">
                  <q-item-section>
                    <q-input 
                      color="orange" 
                      filled 
                      v-model="row_infos.lastname" 
                      label="Nom"
                      hide-bottom-space
                      :rules="[val => !!val || 'Champ requis']"
                    />
                  </q-item-section>
                </q-item>

                <q-item class="col-xs-12 col-sm-6">
                  <q-item-section>
                    <q-input 
                      color="orange" 
                      filled 
                      v-model="row_infos.firstname" 
                      label="Prénom"
                      hide-bottom-space
                      :rules="[val => !!val || 'Champ requis']"
                    />
                  </q-item-section>
                </q-item>

                <q-item class="col-xs-12 col-sm-6">
                  <q-item-section>
                    <q-input 
                      color="orange" 
                      filled 
                      v-model="row_infos.username" 
                      label="Username"
                      hide-bottom-space
                      :rules="[val => !!val || 'Champ requis']" 
                    />
                  </q-item-section>
                </q-item>

                <q-item class="col-xs-12 col-sm-6">
                  <q-item-section>
                    <q-input 
                      color="orange" 
                      filled 
                      v-model="row_infos.email" 
                      type="email" 
                      label="Email"
                      hide-bottom-space
                      :rules="[val => !!val || 'Champ requis']" 
                    />
                  </q-item-section>
                </q-item>

                <q-item class="col-xs-12 col-sm-4">
                  <q-item-section>
                    <q-input 
                      color="orange" 
                      filled 
                      v-model="row_infos.phone" 
                      label="Téléphone" 
                    />
                  </q-item-section>
                </q-item>

                <q-item class="col-xs-12 col-sm-8">
                  <q-item-section>
                    <q-input 
                      color="orange" 
                      filled 
                      v-model="row_infos.street" 
                      label="Adresse" 
                    />
                  </q-item-section>
                </q-item>

                <q-item class="col-xs-12 col-sm-3">
                  <q-item-section>
                    <q-input 
                      color="orange" 
                      filled 
                      v-model="row_infos.zip_code" 
                      label="Code Postal" 
                    />
                  </q-item-section>
                </q-item>

                <q-item class="col-xs-12 col-sm-9">
                  <q-item-section>
                    <q-input 
                      color="orange" 
                      filled 
                      v-model="row_infos.city" 
                      label="Ville" 
                    />
                  </q-item-section>
                </q-item>

              </div>
            </div>
          </q-list>
          <q-card-actions align="right" class="text-teal">
            <q-btn 
              unelevated 
              label="Enregistrer les changements" 
              type="submit" 
              color="primary"
              :loading="loadingSaveUserInfos"
            />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "userDetails",
  props: {
    modalOpen: Boolean,
    rowInfos: Object
  },
  data() {
    return {
      loadingSaveUserInfos: false,
      form: {
        username: this.rowInfos.username,
        firstname: this.rowInfos.firstname,
        lastname: this.rowInfos.lastname,
        email: this.rowInfos.email,
        phone: this.rowInfos.phone,
        address: this.rowInfos.address,
        street: this.rowInfos.street,
        city: this.rowInfos.city,
        zip_code: this.rowInfos.zip_code,
      },
    }
  },
  computed: {
    ...mapGetters("auth", ["userRole"]),
    row_infos: {
      get() {
        return this.form
      }
    },
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
    ...mapActions('user', ['updateUserMainInfos']),
    async onSubmit() {
      this.loadingSaveUserInfos = true
      await this.updateUserMainInfos({ id: this.rowInfos.id, form: this.form })
        .then(() => {
          this.$q.notify('Les informations ont été modifiées')
          this.$emit("updateMainInfosSuccess")
        })
        .catch(() => {
          this.$q.notify('Une erreur est survenue')
        })
        this.loadingSaveUserInfos = false
    }
  }
}
</script>

<style scoped>

.q-validation-component.q-field--with-bottom{
  padding-bottom: 0px!important;
  transition: .5s .2s padding-bottom
}
.q-field--error.q-validation-component.q-field--with-bottom {
  padding-bottom: 20px
}

</style>
