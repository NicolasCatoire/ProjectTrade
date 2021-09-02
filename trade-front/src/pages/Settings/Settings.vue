<template>
  <q-page class="q-pa-md row items-start q-gutter-md">
		<card
			v-for="(card, index) in cards" :key="index"
			:infos="card"
      :hidden="card.role === 'SuperAdmin' && userRole !== 'SuperAdmin'"
		/>
    <div class="col-12 row justify-center" v-if="userRole === 'SuperAdmin'">
      <Admins-list />
    </div>
  </q-page>
</template>

<script>
import Card from '../../components/settings/Card.vue'
import AdminsList from '../../components/settings/AdminsList.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
      Card,
      AdminsList
  },
  data() {
    return {
			cards: [
				{
					title: "Ajouter des champs",
					desc: `Ajouter des champs aux input de type "select". Exemple : softskills, compétences informatique, passion, avantages etc...`,
					buttonIcon: "toc",
					linkText: "Ajouter des champs",
					img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d3JpdGV8ZW58MHx8MHx8",
					linkRoute: "constants",
          role: "SuperAdmin"
				},
        {
          title: "Ajouter un admin",
          desc: `Ajouter un administrateur Admin ou SuperAdmin`,
          linkText: "Ajouter un admin",
          img: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=712&q=80",
          linkRoute: "addAdmin",
          buttonIcon: "toc",
          role: "SuperAdmin"
        },
        {
          title: "Modifier mon profil admin",
          desc: `Vous devez modifier votre mot de passe s'il s'agit de votre première connexion`,
          linkText: "Mon profil",
          img: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
          linkRoute: "updateProfile",
          buttonIcon: "toc",
        }
      ]
    }
  },
  computed: {
    ...mapGetters("auth", ["userRole", "userInfos"]),
  }
}
</script>
<style scoped>
	.my-card {
			width: 100%;
			max-width: 280px;
	}
  table{
    background: #0b2e13;

  }
</style>
