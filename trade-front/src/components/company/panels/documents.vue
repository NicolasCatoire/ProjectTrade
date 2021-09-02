<template>
  <div>
		<div class="q-mb-md row q-gutter-md">
			<q-uploader
				flat
				bordered
				style="max-width: 300px; height: 150px;"
				label="Ajouter un contract"
				auto-upload
				@uploaded="uploadedSuccess()"
				@failed="uploadFailed"
				:factory="factoryFnContract"
				:filter="checkFileType"
			/>
			
			<q-uploader
				flat
				bordered
				style="max-width: 300px"
				label="Ajouter une facture"
				auto-upload
				@uploaded="uploadedSuccess()"
				@failed="uploadFailed"
				:factory="factoryFnInvoice"
				:filter="checkFileType"
			/>
		</div>

		<q-tree
			:nodes="contractsList"
			node-key="label"
		>
			<template v-slot:default-header="prop">
				<div class="row items-center">
					<q-icon v-if="!prop.node.children" :name="prop.node.icon || 'description'" color="grey-5" size="28px" class="q-mr-sm" />
					<div class="text-weight-bold text-primary">{{ prop.node.label }}</div>
					<file-actions 
						v-if="!prop.node.children" 
						:node="prop.node" 
						:companyId="companyInfos.company.id" 
						fileType="contracts"
						@deleteSuccess="deleteFileSuccess()"
					/>
				</div>
			</template>
		</q-tree>

		<q-tree
			:nodes="invoicesList"
			node-key="label"
		>
			<template v-slot:default-header="prop">
				<div class="row items-center">
					<q-icon v-if="!prop.node.children" :name="prop.node.icon || 'description'" color="grey-5" size="28px" class="q-mr-sm" />
					<div class="text-weight-bold text-primary">{{ prop.node.label }}</div>
					<file-actions 
						v-if="!prop.node.children" 
						:node="prop.node" 
						:companyId="companyInfos.company.id" 
						fileType="invoices"
						@deleteSuccess="deleteFileSuccess()"
					/>
				</div>
			</template>
		</q-tree>
  </div>
</template>

<script>
import { LocalStorage } from 'quasar'
import FileActions from "./fileActions.vue"

export default {
	components: {
		FileActions
	},
	props: {
		companyInfos: Object,
	},
	data() {
		return {
			loadingDeleteContract: false,
			loadingDeleteInvoice: false,
			invoicesList: [
        {
          label: 'Factures',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          children: []
        }
      ],
			contractsList: [
        {
          label: 'Contracts',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          children: []
        }
      ]
		}
	},
	mounted() {
		this.setFiles()
	},
	watch: {
		companyInfos() {
			this.setFiles()
		}
	},
	methods: {
		setFiles() {
			if (this.companyInfos.company.hasOwnProperty('invoices')) {
				this.invoicesList[0].children = []
				this.companyInfos.company.invoices.forEach(invoice => {
					this.invoicesList[0].children.push({
						label: invoice.originalname,
						url: invoice.url
					})
				})
			}
			if (this.companyInfos.company.hasOwnProperty('contracts')) {
				this.contractsList[0].children = []
				this.companyInfos.company.contracts.forEach(contract => {
					this.contractsList[0].children.push({
						label: contract.originalname,
						url: contract.url
					})
				})
			}
		},
		factoryFnContract() {
      return new Promise((resolve, reject) => {
				const token = LocalStorage.getItem('token')
        resolve({
					fieldName: 'file',
          url: `${process.env.VUE_APP_API_URL}/company/contracts/${this.companyInfos.company.id}`,
          method: 'POST',
          headers: [
            { name: 'Authorization', value: `Bearer ${token}` }
          ]
        })
      })
    },
		factoryFnInvoice() {
      return new Promise((resolve, reject) => {
				const token = LocalStorage.getItem('token')
        resolve({
					fieldName: 'file',
          url: `${process.env.VUE_APP_API_URL}/company/invoices/${this.companyInfos.company.id}`,
          method: 'POST',
          headers: [
            { name: 'Authorization', value: `Bearer ${token}` }
          ]
        })
      })
    },
		checkFileType(files) {
			if (files[0].type !== 'application/pdf') {
				this.$q.notify('Format PDF obligatoire')
			}
      return files.filter(file => file.type === 'application/pdf')
    },
		uploadedSuccess() {
			this.$emit('uploadSuccess')
		},
		deleteFileSuccess() {
			this.$emit('deleteFileSuccess')
		},
		uploadFailed(res) {
			if (res && res.xhr.response) {
				const msg = JSON.parse(res.xhr.response)
				switch(msg.err) {
					case 'FILE_TOO_BIG':
						this.$q.notify('Le fichier envoyé est trop volumineux')
						break;
					case 'FILE_MIMETYPE_NOT_PDF':
						this.$q.notify(`Le fichier n'est pas en PDF`)
						break;
					case 'EXISTING_FILE_NAME':
						this.$q.notify(`Un fichier comporte déjà ce même nom`)
						break;
					default:
						this.$q.notify('Une erreur est survenue')
				}
			} else {
				this.$q.notify('Une erreur est survenue')
			}
		}
	}

}
</script>

<style>

</style>