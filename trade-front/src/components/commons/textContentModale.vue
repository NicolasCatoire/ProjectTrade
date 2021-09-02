<template>
  <q-dialog
		v-model="dialog"
		class="q-gutter-sm"
	>
		<q-card class="full-width" style="max-width: 90vw;">
			<q-card-section horizontal class="row justify-between q-ma-md" align="center">
				<div class="text-h6">Description du référentiel</div>
				<q-btn icon="close" label="Fermer" unelevated color="primary" v-close-popup />
			</q-card-section>

			<q-card-section class="q-pt-none">
				<div v-html="text" />
			</q-card-section>

			<q-card-actions align="right">
				<q-btn label="Fermer" unelevated color="primary" v-close-popup />
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script>
export default {
	props: {
		modalIsOpen: Boolean,
		text: String
	},
	computed: {
		dialog: {
			get() {
				return this.modalIsOpen
			},
			set() {
				this.$emit('closeDialog')
			}
		}
	}

}
</script>

<style>

</style>