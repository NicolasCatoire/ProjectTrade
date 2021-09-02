<template>
  <q-dialog
		v-model="seePdfDialog"
		maximized
		transition-show="slide-up"
		transition-hide="slide-down"
	>
		<q-card class="bg-primary">
			<q-bar>
				<q-space />
				<q-btn dense flat icon="close" color="white" v-close-popup>
					<q-tooltip class="bg-white text-primary">Fermer</q-tooltip>
				</q-btn>
			</q-bar>
			<q-pdfviewer
					v-model="seePdfDialog"
					:type="pdfType"
					:src="fileUrl"
					content-class="absolute"
				/>
		</q-card>
	</q-dialog>
</template>

<script>
export default {
	props: {
		pdfType: String,
		fileUrl: String,
		dialog: Boolean
	},
	computed: {
		seePdfDialog: {
			get() {
				return this.dialog
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