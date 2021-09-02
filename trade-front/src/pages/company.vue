<template>
	<div class="full-height row">
		<span class="q-ml-md q-my-sm">
			<div class="q-pa-md q-gutter-sm">
				<q-breadcrumbs v-if="dataLoaded">
					<q-breadcrumbs-el label="Liste de clients" to="/clients" />
					<q-breadcrumbs-el :label="companyInfos.company.name" />
				</q-breadcrumbs>
  		</div>
		</span>
		<q-card class="full-height row col-12">

			<q-card-section class="col-xs-12 col-sm-3">
				<div v-if="dataLoaded">
					<div class="row justify-center q-mt-md">
						<q-img width="70%" :src="companyInfos.company.logo ? companyInfos.company.logo.url : 'default-company-logo.png'" />
					</div>
					<credits-infos 
						:leihienCredits="companyInfos.company.rdvs_limit"
						:recruitmentCredits="companyInfos.company.recruitments_limit"
						:employeesLimit="companyInfos.company.employees_limit"
					/>
				</div>
				
			</q-card-section>
			
			<q-card-section class="col-xs-12 col-sm-9">
				<div v-if="dataLoaded" class="row">
					<div class="text-h5">
						{{ companyInfos.company.name }}
					</div>
					<div class="q-ml-md q-mt-xs">
						<q-icon name="location_on" color="grey" size="xs" /> 
						<span class="text-caption text-grey">{{ companyInfos.company.city ? companyInfos.company.city : "Ville non renseignée" }}</span>
					</div>
				</div>
				<div v-if="dataLoaded">
					<span class="text-caption text-blue">Siret : {{ companyInfos.company.siret ? companyInfos.company.siret : 'Aucun métier renseigné' }}</span>
				</div>
				<q-card v-if="loadingFetchCompany" flat  class="q-mt-md q-pa-sm " style="width: 300px;">
					<q-spinner
						class="q-mr-xs"
						color="primary"
						size="2em"
					/>	
					Chargement des informations...
				</q-card>
				<q-card-actions class="q-pl-none q-mt-lg row">
					<q-btn
						@click="editCompanyMainInfos()"
						v-if="userRole === 'SuperAdmin'"
						unelevated
						:disable="!dataLoaded"
						style="background: #E3F2FD;"
						class="q-pl-none text-blue"
						label="éditer les informations" 
					/>
					<q-toggle
						v-if="userRole === 'SuperAdmin'"
						class="q-ml-md"
						:label="careerSite ? 'Désactiver le site carrière' : 'Activer le site carrière'" 
						color="blue"
						v-model="careerSite"
						keep-color
					/>
				</q-card-actions>

				<company-tabs 
					:dataLoaded="dataLoaded"
					:companyInfos="companyInfos"
					@uploadDocumentSuccess="uploadDocumentSuccess()"
					@deleteFileSuccess="deleteFileSuccess()"
				/>
			</q-card-section>
		
			<company-details-edition 
				:readonly="userRole !=='SuperAdmin'"
				v-if="dataLoaded"
				ref="companyEdit"
				@closeModal="companyEditMainInfos = false" 
				@sendForm="sendEditCompany($event)"
				:modalOpen="companyEditMainInfos"
				:row="companyInfos.company"
			/>
		</q-card>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import CreditsInfos from "../components/company/creditsInfos.vue"
import CompanyTabs from "../components/company/companyTabs.vue"
import CompanyDetailsEdition from "../components/company/companyDetails.vue";

export default {
	components: {
		CreditsInfos,
		CompanyDetailsEdition,
		CompanyTabs
	},
	data() {
		return {
			dataLoaded: false,
			loadingEdition: false,
			loadingFetchCompany: false,
			companyEditMainInfos: false
		}
	},
	beforeMount() {
		this.fetchCompanyInfo()
	},
	methods: {
		...mapActions('company', ['getCompanyInfos', 'editCompany', 'updateCareerStatus']),
		async fetchCompanyInfo() {
			this.loadingFetchCompany = true
			await this.getCompanyInfos(this.$route.params.id)
				.then(() => {
					this.dataLoaded = true
				})
			this.loadingFetchCompany = false
		},
		editCompanyMainInfos() {
			this.companyEditMainInfos = true
		},
		updateMainInfosSuccess() {
			this.companyEditMainInfos = false
			this.fetchCompanyInfo()
		},
		uploadDocumentSuccess() {
			this.$q.notify(`Le fichier a bien été envoyé. L'entreprise a été notifiée.`)
			this.fetchCompanyInfo()
		},
		deleteFileSuccess() {
			this.$q.notify(`Le fichier a bien été supprimé.`)
			this.fetchCompanyInfo()
		},
		async sendEditCompany(data) {
			this.loadingEdition = true
			await this.editCompany(data)
				.then(() => {
					this.$q.notify(`Entreprise ${data.form.name} modifiée`)
					this.$refs['companyEdit'].readonly = true
					this.updateMainInfosSuccess()
					this.loadingEdition = false
				})
				.catch(() => {
					this.$q.notify('Un problème est survenu')
					this.loadingEdition = false
				})
		}
	},
	computed: {
		...mapGetters('company', ['companyInfos']),
		...mapGetters('auth', ['userRole']),
		careerSite: {
			get() {
				return this.companyInfos?.company?.career
			},
			async set(val) {
				await this.updateCareerStatus({id: this.companyInfos.company.id, status: val})
					.then(() => {
						this.$q.notify(val ? `Le site carrière de l'entreprise est mis en ligne` : `Le site carrière de l'entreprise est mis en hors-ligne`)
					})
					.catch(() => this.$q.notify('Un problème est survenu'))
			}
		}
	}
}
</script>

<style>

</style>