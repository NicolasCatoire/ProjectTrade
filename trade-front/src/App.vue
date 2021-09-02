<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
import {LocalStorage} from "quasar";

export default {
  name: 'App',
  mounted() {
    const user = LocalStorage.getItem('user')
    const token = LocalStorage.getItem('token')
    if (token && user) {
      this.setUser({token: token, user: user})
    }

    // format strings
    String.prototype.strToNoAccent = function () {
			var map = {
				'a' : 'á|à|ã|â|ä|Ä|À|Á|Ã|Â',
				'e' : 'é|è|ê|ë|Ë|É|È|Ê',
				'i' : 'í|ì|Ï|ï|î|Í|Ì|Î',
				'o' : 'ó|ò|ô|õ|ö|Ö|Ó|Ò|Ô|Õ',
				'u' : 'ú|ù|û|ü|Ú|Ù|Û|Ü',
				'c' : 'ç|Ç',
				'n' : 'ñ|Ñ'
			}
			let replacement = this
			for (var pattern in map) {
				replacement = replacement.replace(new RegExp(map[pattern], 'g'), pattern)
			}
    	return replacement
		}	

    // first letter Capitalize 
    String.prototype.firstLetterCapitalize = function () {
			let replacement = this
			return replacement.charAt(0).toUpperCase() + replacement.slice(1);
		}	

  },
  methods: {
    ...mapActions('auth', ['setUser'])
  },
}
</script>
