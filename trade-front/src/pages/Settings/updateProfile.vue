<template>

  <div class="row justify-center ">
    <h5 class=" q-pa-xs col-12 text-uppercase " style="text-align:center">Modifier un
      administrateur</h5>

    <q-form @submit="submitAddAdmin">
      <q-list>

        <q-item class="col-12 col-sm-6" style="width: 480px;">
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

        <q-item class="col-xs-12 col-sm-6 " style="width: 480px">
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

        <q-item class="col-xs-12 col-sm-6 " style="width: 480px">
          <q-item-section>
            <q-input
              color="orange"
              filled
              v-model="admin.password"
              type="password"
              label="Password"
              hide-bottom-space
            />
          </q-item-section>
        </q-item>

        <q-item class="col-xs-12 col-sm-4">
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

        <q-item class="col-12 col-sm-12" style="width: 480px;">
          <q-item-section>


          </q-item-section>
        </q-item>

      </q-list>
      <div class="formButtonContainer row">

        <q-btn outline color="indigo-6" class="q-ma-lg" to="/settings">Annuler</q-btn>

        <q-btn type="submit" color="indigo-6" class="q-ma-lg">Valider</q-btn>
      </div>


    </q-form>


  </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'
import {updateAdmin} from "src/store/admin/actions";

export default {

  components: {},

  name: "updateProfile",
  data() {
    return {
      confirmationDeleteDialogOpen: false,
      admin: {},
    }
  },

  beforeMount() {
    this.init()
  },

  methods: {
    ...mapActions("admin", ["updateAdmin", "getAdmin", "deleteAdminBO"]),
    ...mapActions("auth", ["updateSelfAdmin"]),

    init() {
      this.getAdminInfo()
    },

    async getAdminInfo() {
      let id = this.userInfos.id
      await this.getAdmin(id).then(res => {
        this.admin = res.data.admin
      }).catch(err => {
        console.log(err)
      })
    },

    async submitAddAdmin() {
      await this.updateSelfAdmin({
        id: this.userInfos.id,
        firstname: this.admin.firstname,
        role: this.admin.role,
        lastname: this.admin.lastname,
        email: this.admin.email,
        password: this.admin.password,
        description: this.admin.description,
      }).then(res => {
        this.$q.notify("Votre profil a bien été modifié")

        setTimeout(() => {
          this.$router.push({path: "/settings"})
        }, 500)
      }).catch(err => {
        console.log(err)
      })
    }
  },

  computed: {
    ...mapGetters("auth", ['userInfos']),
  },

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
