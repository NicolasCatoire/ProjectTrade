<template>
  <q-card flat bordered>
		<q-card-section align="left" :class="$q.screen.gt.sm ? 'row justify-between' :  ''" >
			<div class="text-overline text-uppercase">{{ referential.name }}</div>
			<q-btn 
				@click="confirmationDeleteRefDialogOpen = true"
				size="xs"
				v-if="userRole === 'SuperAdmin'"
				color="red"
				unelevated
				class="q-ml-md q-ma-xs"
				label="supprimer le référentiel"
			/>
		</q-card-section>
		<ReferentialDetails :referential="referential" />
		<div class="row justify-center q-ma-md">
			<q-btn 
				@click="seeDescription()"
				label="voir la description"
				unelevated
				color="primary"
			/>
		</div>
		<ConfirmationModale 
			:modalIsOpen="confirmationDeleteRefDialogOpen"
			text="Êtes-vous certain de vouloir supprimer ce référentiel ? Attention, tous les métiers et recrutements en cours seront supprimés également."
			@confirm="deleteRef()"
			@closeDialog="confirmationDeleteRefDialogOpen = false"
			:loading="loadingDeleteRef"
		/>
		<TextContentModale 
			:modalIsOpen="seeDescriptionModale"
			@closeDialog="seeDescriptionModale = false"
			:text="referential.description"
		/>
	</q-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import ConfirmationModale from '../commons/confirmationModale.vue'
import ReferentialDetails from './referentialDetails.vue'
import TextContentModale from '../commons/textContentModale.vue'

export default {
	components: {
		ConfirmationModale,
		ReferentialDetails,
		TextContentModale
	},
	props: {
		referential: Object
	},
	data() {
		return {
			loadingDeleteRef: false,
			confirmationDeleteRefDialogOpen: false,
			seeDescriptionModale: false
		}
	},
	methods: {
		...mapActions('company', ['deleteReferential']),
		async deleteRef() {
			this.loadingDeleteRef = true
			await this.deleteReferential(this.referential.id)
				.then(() => {
					this.$q.notify('Le référentiel a bien été supprimé')
				})
				.catch(() => {
					this.$q.notify('Une erreur est survenue')
				})
			this.loadingDeleteRef = false
		},
		seeDescription() {
			this.seeDescriptionModale = true
		}
	},
	computed: {
		...mapGetters('auth', ['userRole'])
	}
}
</script>

<style>

</style>