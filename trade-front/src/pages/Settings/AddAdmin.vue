<template>

  <div class="row justify-center">
    <h5 class=" q-pa-xs col-12 text-uppercase " style="text-align:center">Ajouter un
      administrateur</h5>

    <q-form @submit="submitAddAdmin">
      <q-input 
        lazy-rules 
        label="Prénom"
        :rules="[val => val.length > 1 || 'Le champ est requis']"
        class="addAdminInput col-12" filled v-model="addAdminForm.firstname"
      />

      <q-input 
        lazy-rules 
        label="Nom"
        :rules="[val => val.length > 1 || 'Le champ est requis']"
        class="addAdminInput" filled v-model="addAdminForm.lastname"
      />

      <q-select 
        lazy-rules 
        label="Role"
        :rules="[val => val.length > 0 || 'Le champ est requis']"
        class="addAdminInput" filled v-model="addAdminForm.role" :options="['SuperAdmin', 'Admin']" 
      />

      <q-input 
        lazy-rules 
        label="Email"
        :rules="[val => val.length > 3 || 'Le champ est requis']"
        class="addAdminInput" filled v-model="addAdminForm.email"
      />

      <q-input 
        lazy-rules 
        label="Mot de passe"
        :rules="[val => val.length > 7 || 'Le champ est requis']"
        class="addAdminInput" filled v-model="addAdminForm.password"
      />

      <q-input 
        lazy-rules 
        label="Description du poste"
        :rules="[val => val.length > 10 || 'Le champ est requis']"
        class="addAdminInput" hint="Vous devez décrire la fonction ou le poste de cet adminstrateur" filled v-model="addAdminForm.description"
        type="textarea"
      />

      <div class="formButtonContainer row">
        <q-btn outline color="indigo-6" class="q-ma-lg" to="/settings">Annuler</q-btn>

        <q-btn type="submit" color="indigo-6" class="q-ma-lg">Valider</q-btn>
      </div>

    </q-form>
  </div>
</template>
<script>

import {mapActions} from 'vuex'

export default {
  name: "AddAdmin",
  data() {
    return {
      addAdminForm: {
        firstname: "",
        role:"Admin",
        lastname: "",
        email: "",
        password: "",
        description: "",
      }
    }
  },

  methods: {
    ...mapActions("admin", ["addAdminBackOffice"]),

    submitAddAdmin() {
      this.addAdminBackOffice({
        firstname: this.addAdminForm.firstname,
        role: this.addAdminForm.role,
        lastname: this.addAdminForm.lastname,
        email: this.addAdminForm.email,
        password: this.addAdminForm.password,
        description: this.addAdminForm.description,
        username: this.addAdminForm.email
      }).then(res => {
        this.$q.notify("L'admin a bien été créé")

        setTimeout(() => {
          this.$router.push({path: "/"})
        })
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
  .formButtonContainer{
    justify-content: flex-end;
  }
</style>
