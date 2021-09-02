<template>
	<div>
		<div class="text-caption text-grey q-mb-sm">Informations de contact</div>
		<div class="row q-mb-sm">
			<div class="row col-12 q-mb-xs">
				<div class="col-xs-12 col-sm-2">
					Adresse :
				</div>
				<div class="col-xs-12 col-sm-10">
					{{ companyInfos.company.street }} {{ companyInfos.company.zip_code }} - {{ companyInfos.company.city }} 
				</div>
			</div>
		</div>

		<div class="text-caption text-grey q-mb-sm">Informations de l'Administrateur</div>
		<div class="row">
			<div class="row col-12 q-mb-xs">
				<div class="col-xs-12 col-sm-2">
					Nom :
				</div>
				<div class="col-xs-12 col-sm-10">
					{{ adminInfos.firstname }} {{ adminInfos.lastname }}
				</div>
			</div>
			<div class="row col-12 q-mb-xs">
				<div class="col-xs-12 col-sm-2">
					Téléphone :
				</div>
				<div class="col-xs-12 col-sm-10">
					{{ adminInfos.phone }}
				</div>
			</div>
			<div class="row col-12 q-mb-xs">
				<div class="col-xs-12 col-sm-2">
					Email :
				</div>
				<div class="col-xs-12 col-sm-10">
					{{ adminInfos.email }}
				</div>
			</div>
			<div class="row col-12 q-mb-xs">
				<div class="col-xs-12 col-sm-2">
					Adresse :
				</div>
				<div class="col-xs-12 col-sm-10">
					{{ companyInfos.company.street }} {{ companyInfos.company.zip_code }} - {{ companyInfos.company.city }} 
				</div>
			</div>
		</div>

		<div class="text-caption text-grey q-mt-md q-mb-sm">Autres informations</div>
		<div class="row">
			<div class="row col-12 q-mb-xs">
				<div class="col-xs-12 col-sm-2">
					Nombre d'employés :
				</div>
				<div class="col-xs-12 col-sm-10">
					{{ companyInfos.collabs.length }}/{{ companyInfos.company.employees_limit }}
				</div>
			</div>
			<div class="row col-12 q-mb-xs">
				<div class="col-xs-12 col-sm-2">
					Secteur d'activité :
				</div>
				<div class="col-xs-12 col-sm-10">
					{{ companyInfos.company.activity_sector }}
				</div>
			</div>
			<div class="row col-12 q-mb-xs">
				<div class="col-xs-12 col-sm-2">
					Date d'inscription :
				</div>
				<div class="col-8">
					{{ formatDateHour(companyInfos.company.createdAt) }}
				</div>
			</div>
			<div class="row col-12 q-mb-xs">
				<div class="col-xs-12 col-sm-2">
					APE Code :
				</div>
				<div class="col-xs-12 col-sm-10">
					{{ companyInfos.company.ape_code }}
				</div>
			</div>
			<div class="row col-12 q-mb-xs">
				<div class="col-xs-12 col-sm-2">
					TVA :
				</div>
				<div class="col-xs-12 col-sm-10">
					{{ companyInfos.company.tva }}
				</div>
			</div>
			<div class="row col-12 q-mb-xs">
				<div class="col-xs-12 col-sm-2">
					Id entreprise :
				</div>
				<div class="col-xs-12 col-sm-10">
					{{ companyInfos.company.id }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { date } from "quasar"

export default {
	props: {
		companyInfos: Object
	},
	computed: {
		adminInfos() {
			return this.companyInfos.collabs.filter(user => user.role === 'B2B_Admin')[0]
		}
	},
	methods: {
		formatDateHour(data) {
      if (!data) {
        return '-'
      }
      const timeStamp = new Date(data)
      const formattedString = date.formatDate(timeStamp, 'DD/MM/YYYY - HH:mm')
      return formattedString
    }
	}
}
</script>

<style>

</style>