<template>
  <q-page class="bg-info window-height window-width row justify-center items-center">
    <login-component />
  </q-page>
</template>

<script>
import loginComponent from '../components/auth/Login.vue'

export default {
  name: 'Login',
  components: {
	  loginComponent
  },
  data () {
    return {
      email: '',
      password: ''
    }
  }
}
</script>

<style scoped>

</style>