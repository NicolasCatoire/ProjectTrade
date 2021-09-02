<template>
  <div class="q-ml-md row justify-between" style="width: 135px;">
		<q-btn @click="downloadFile(node)" unelevated color="green" label="voir" size="xs" />
		<q-btn v-if="userRole === 'SuperAdmin'" @click="askDeleteFile(node)" :loading="loadingDeleteFile" unelevated color="red" label="supprimer" size="xs" />
		<PdfViewerModale 
			pdfType="html5"
			:fileUrl="fileUrl"
			:dialog="seePdfDialog"
			@closeDialog="seePdfDialog = false"
		/>
		<ConfirmationModale 
			:modalIsOpen="confirmationDeleteDialogOpen"
			text="Êtes-vous certain de vouloir supprimer ce fichier ?"
			@confirm="deleteFile()"
			@closeDialog="confirmationDeleteDialogOpen = false"
			:loading="loadingDeleteFile"
		/>
	</div>
</template>

<script>
import PdfViewerModale from '../../commons/pdfViewerModale.vue'
import ConfirmationModale from '../../commons/confirmationModale.vue'
import { mapGetters, mapActions } from "vuex"

export default {
	components: {
		PdfViewerModale,
		ConfirmationModale
	},
	props: {
		node: Object,
		fileType: String,
		companyId: String
	},
	data() {
		return {
			seePdfDialog: false,
			fileUrl: '',
			file: '',
			loadingDeleteFile: false,
			confirmationDeleteDialogOpen: false
		}
	},
	methods: {
		...mapActions('company', ['deleteContractPdf', 'deleteInvoicePdf']),
		async downloadFile(file) {
			this.fileUrl = file.url
			this.seePdfDialog = true
		},
		askDeleteFile(file) {
			this.file = file
			this.confirmationDeleteDialogOpen = true
		},
		async deleteFile() {
			this.loadingDeleteFile = true
			if (this.fileType === "invoices") {
				await this.deleteInvoicePdf({ id: this.companyId, fileName: this.file.label })
				.then(() => {
					this.$emit('deleteSuccess')
				})
				.catch(() => {
					this.$q.notify('un problème est survenu')
				})
				this.loadingDeleteFile = false
			}
			if (this.fileType === 'contracts') {
				await this.deleteContractPdf({id: this.companyId, fileName: this.file.label})
					.then(() => {
						this.$emit('deleteSuccess')
					})
					.catch(() => {
						this.$q.notify('un problème est survenu')
					})
			}
			else {
				this.loadingDeleteFile = false
			}
		}
	},
	computed: {
		...mapGetters('auth', ['userRole'])
	}
}
</script>

<style>

</style>