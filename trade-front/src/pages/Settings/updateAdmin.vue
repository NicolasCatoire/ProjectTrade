<template>

  <div class="row justify-center ">
    <h5 class=" q-pa-xs col-12 text-uppercase" style="text-align:center">
      Modifier un administrateur
    </h5>

    <q-form @submit="submitEditAdmin">
      <q-list>

        <q-item class="col-xs-12 col-sm-8">
          <q-item-section>
            <q-input
              color="orange"
              filled
              v-model="admin.lastname"
              label="Nom"
              hide-bottom-space
              :rules="[val => !!val || 'Champ requis']"
            />
          </q-item-section>
        </q-item>

        <q-item class="col-xs-12 col-sm-8">
          <q-item-section>
            <q-input
              color="orange"
              filled
              v-model="admin.firstname"
              label="Prénom"
              hide-bottom-space
              :rules="[val => !!val || 'Champ requis']"
            />
          </q-item-section>
        </q-item>

        <q-item class="col-xs-12 col-sm-8">
          <q-item-section>

            <q-select color="orange"
              filled
              v-model="admin.role"
              label="Role"
              hide-bottom-space
              :rules="[val => !!val || 'Champ requis']"
              :options="['SuperAdmin', 'Commercial', 'Recruiter','Admin']">
            </q-select>
          </q-item-section>

        </q-item>

        <q-item class="col-xs-12 col-sm-8">
          <q-item-section>
            <q-input
              color="orange"
              filled
              v-model="newPassword"
              type="password"
              label="Password"
              hide-bottom-space
            />
          </q-item-section>
        </q-item>

        <q-item class="col-xs-12 col-sm-8">
          <q-item-section>
            <q-input
              color="orange"
              filled
              v-model="admin.email"
              label="Email"
            />
          </q-item-section>
        </q-item>

        <q-item class="col-xs-12 col-sm-8">
          <q-item-section>
            <q-input
              color="orange"
              filled
              v-model="admin.description"
              label="Description"
            />
          </q-item-section>
        </q-item>

        <q-item class="col-xs-12 col-sm-8" style="width: 480px;">
          <q-item-section>


          </q-item-section>
        </q-item>

      </q-list>
      <div class="formButtonContainer row">

        <q-btn @click="confirmationDeleteDialogOpen = true" class="q-ma-lg"  color="red"> Supprimer administrateur</q-btn>

        <q-btn outline color="indigo-6" class="q-ma-lg" to="/settings">Annuler</q-btn>

        <q-btn type="submit" color="indigo-6" class="q-ma-lg">Valider</q-btn>
      </div>


    </q-form>

    <ConfirmationModale
      :modalIsOpen="confirmationDeleteDialogOpen"
      text="Êtes-vous certain de vouloir supprimer cet admin ?"
      @confirm="deleteAdmin()"
      @closeDialog="confirmationDeleteDialogOpen = false"
    />

  </div>
</template>

<script>

import {mapActions} from 'vuex'
import {updateAdmin} from "src/store/admin/actions";
import ConfirmationModale from "src/components/commons/confirmationModale.vue"
export default {

  components: {
    ConfirmationModale,
  },

  name: "updateAdmin",
  data() {
    return {
      newPassword: "",
      confirmationDeleteDialogOpen: false,
      admin: {},
    }
  },

  beforeMount() {
    this.init()
  },

  methods: {
    ...mapActions("admin", ["updateAdmin", 'getAdmin', 'deleteAdminBO']),

    init() {
      this.getAdminInfo()
    },

    async deleteAdmin(){
      let id = this.$route.params.id
      this.deleteAdminBO(id).then(res => {
        this.$q.notify("Admin supprimé")
        this.$router.push({path: "/settings"})
      })
    },

    async getAdminInfo() {
      let id = this.$route.params.id
      this.getAdmin(id).then(res => {
        this.admin = res.data.admin
      }).catch(err => {
        console.log(err)
      })
    },

    submitEditAdmin() {
      this.updateAdmin({
        id : this.$route.params.id,
        firstname: this.admin.firstname,
        role: this.admin.role,
        lastname: this.admin.lastname,
        email: this.admin.email,
        password: this.newPassword,
        description: this.admin.description,
      }).then(res => {
        this.$q.notify("L'admin a bien été modifié")

        setTimeout(() => {
          this.$router.push({path: "/settings"})
        }, 500)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}


</script>

<style scoped>
.addAdminInput {
  width: 480px;
}

.formButtonContainer {
  justify-content: flex-end;
}
</style>
