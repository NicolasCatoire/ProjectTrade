<template>
	<q-list bordered separator class="q-ma-sm">
		<ReferentialDetailsItem
			title="Ref"
			:data="referential.ref"
		/>
		<ReferentialDetailsItem
			title="Id"
			:data="referential.id"
		/>
		<ReferentialDetailsItem
			title="Contrat"
			:data="referential.default_job.contract.type"
			input="type-duration"
			:duration="filteredData(referential.default_job.contract.duration, duration)"
		/>
		<ReferentialDetailsItem
			title="Salaire"
			:data="filteredData(referential.default_job.salary, salary)"
		/>
		<ReferentialDetailsItem
			title="Expérience"
			:data="filteredData(referential.default_job.experience, experience)"
		/>
		<ReferentialDetailsItem
			title="Classification du poste"
			:data="referential.default_job.classification"
		/>
		<ReferentialDetailsItem
			title="Avantages"
			:multiple="true"
			:data="referential.benefits"
		/>
		<ReferentialDetailsItem
			title="Atouts"
			:multiple="true"
			:data="referential.soft_Skills"
		/>
		<ReferentialDetailsItem
			title="Passions"
			:multiple="true"
			:data="referential.hobbies"
		/>
		<ReferentialDetailsItem
			title="Compétences informatiques"
			:multiple="true"
			:data="referential.computer_skills"
		/>
		<ReferentialDetailsItem
			title="Moyens de locomotion"
			:multiple="true"
			:data="referential.vehicule"
		/>
		<ReferentialDetailsItem
			title="Permis de conduire"
			:multiple="true"
			:data="referential.driver_license"
		/>
		<ReferentialDetailsItem
			title="Certifications"
			:multiple="true"
			:data="referential.certificates"
		/>
		<ReferentialDetailsItem
			title="Langues"
			:multiple="true"
			:data="referential.languages"
		/>
		<ReferentialDetailsItem
			title="Dernier Dipôme"
			:data="referential.degree ? referential.degree.label : ''"
		/>
		<ReferentialDetailsItem
			title="Télétravail"
			:data="referential.home_work"
		/>
		<ReferentialDetailsItem
			title="Niveau de langue française"
			:data="filteredData(referential.french, frenchLevel)"
		/>
		<ReferentialDetailsItem
			title="Classification"
			:data="referential.classification"
		/>
		<ReferentialDetailsItem
			title="Richesse"
			:data="referential.richesse"
		/>
	</q-list>
</template>

<script>
import ReferentialDetailsItem from './referentialDetailsItem.vue'

export default {
	components: {
		ReferentialDetailsItem
	},
	props: {
		referential: Object
	},
	data() {
		return {
			frenchLevel: [
          {
            label: "Langue maternelle / Bilingue (niveau C2 et +)",
            value: 5
          },
          { 
            label: "Courant (niveau C1)",
            value: 4 
          },
          { 
            label: "Intermédiaire niveau B2",
            value: 3 
          },
          { 
            label: "Expert niveau A2",
            value: 2 
          },
          { 
            label: "Débutant niveau A1",
            value: 1 
          }
      ],
			duration: [
				{ label: "Temps complet", value: "0" },
				{ label: "Temps complet (Week-end accepté)", "value": "1"},
				{ label: "4/5ème", "value": "2" },
				{ label: "3/5ème", "value": "3" },
				{ label: "mi-temps", "value": "4" },
				{ label: "2/8", "value": "5" },
				{ label: "3/8", "value": "6" }
      ],
			salary: [
				{ label: "Gratification de stage", value: "0"},
				{ label: "Le SMIC", "value": "1" },
				{ label: "Entre le SMIC et 20 000 €", value: "2" },
				{ label: "De 20 000 à 30 000 €", value: "3" },
				{ label: "De 30 000 à 40 000 €", value: "4" },
				{ label: "De 40 000 à 50 000 €", value: "5" },
				{ label: "De 50 000 à 60 000 €", value: "6" },
				{ label: "De 60 000 à 80 000 €", value: "7" },
				{ label: "De 80 000 à 100 000 €", value: "8" },
				{ label: "De 100 000 à 150 000 €", value: "9" },
				{ label: "De 150 000 à 200 000 €", value: "10" },
				{ label: "Plus de 200 000 €", value: "11" }
			],
			experience: [
				{ label: "Débutant junior (moins de 2 ans)", value: 1 },
				{ label: "Intermédiaire (2 à 4 ans)", value: 2 },
				{ label: "Confirmé (+ de 5 ans)", value: 3 },
				{ label: "Expert (+ 10 ans)", value: 4 }
			]
		}
	},
	methods: {
		filteredData(data, list) {
			if (!data) {
				return ''
			} else {
					let item = list.filter(item => {
						return item.value == data
					})
				return item[0].label
			}
    }
	}
}

</script>

<style>

</style>