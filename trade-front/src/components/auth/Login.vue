<template>
  <div class="column">
    <div class="row">
      <q-card square bordered class="q-pa-lg shadow-1">
        <q-img src="logo-leihia.jpg" />
        <q-form @submit="onSubmit">
          <q-card-section class="q-gutter-md">
            <q-input
              square
              filled
              clearable
              v-model="form.username"
              type="email"
              label="identifiant"
            />
            <q-input
              square
              filled
              clearable
              v-model="form.password"
              type="password"
              label="mot de passe"
            />
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              unelevated
              color="secondary"
              size="lg"
              class="full-width"
              label="Login"
              type="submit"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import { Cookies } from "quasar"
import { LocalStorage } from 'quasar'

export default {
	data() {
		return {
			loading: false,
			form: {
				username: "",
				password: "",
			},
		};
	},
	mounted() {
    // email address setter in Cookie
		const email = Cookies.get("BoEmail")
		if (email) {
			this.form.username = email
		}

    // In case that an user goes here with some data in storage. We clean it
    const user = LocalStorage.getItem('user')
    const tkn = LocalStorage.getItem('token')
    if (user || tkn) {
      LocalStorage.clear()
    }
	},
	methods: {
		...mapActions("auth", ["login"]),
		onSubmit() {
			this.loading = true
			Cookies.set("BoEmail", this.form.username)
			this.login(this.form)
				.catch(() => {
					this.loading = false
					this.$q.notify('Vos informations sont incorrects')
				})
		},
	},
};
</script>

<style lang="scss" scoped>
  .q-card {
    width: 360px;
  }
</style>