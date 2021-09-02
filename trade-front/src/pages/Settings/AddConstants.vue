<template>
	<div class="row">
		<list
			:loading="loading"
			:constants="this.constantsList"
		/>
		<div class="col-7 q-pa-md">
			<q-card class="column q-pa-md">
				<div class="text-h6">
					Ajouter des éléments
				</div>
				<div class="q-pt-md q-gutter-md">
					<!-- {{ categorySelect}} -->
					<q-select
						v-model="categorySelect"
						filled 
						:options="constantsList"
						label="Choisissez une catégorie"
						option-label="name"
						emit-value
        		map-options
					/>
					<!-- {{ categorySelect.options[0] }} -->
					<q-select
						v-if="categorySelect.hasCategories === true"
						v-model="subCategorySelect"
						filled 
						:options="categorySelect.options"
						label="Choisissez une sous-catégorie"
						option-label="Category"
						emit-value
        		map-options

					/>
					<q-input
						v-if="categorySelect.name !== 'Degrees' && categorySelect.name && categorySelect.name.length > 0"
						v-model="input"
						filled
						label="Ecrivez votre champ"
					/>
					<q-card 
						v-if="categorySelect.name === 'Degrees'"
						class="bg-red q-pa-md text-white"
					>
						Important : Afin de modifier la catégorie Diplômes (Degrees), veuillez vous rapprocher de l'équipe technique
					</q-card>
					<q-card-actions align="right">
						<q-btn
							:disable="!input || categorySelect.name === 'Degrees' || categorySelect.hasCategories === true && !subCategorySelect"
							color="primary"
							unelevated 
							label="Ajouter le champ"
							@click="confirmationModale = true"
						/>
					</q-card-actions>
				</div>
			</q-card>
		</div>
		<confirmation-modale 
			:modalIsOpen="confirmationModale"
			@closeDialog="confirmationModale = false"
			@confirm="addField()"
			:text="`Confirmez-vous l'ajout de l'élement ?`"
		/>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import List from "../../components/settings/AddConstants/List.vue"
import ConfirmationModale from "../../components/commons/confirmationModale.vue"

export default {
	components: {
		List,
		ConfirmationModale
	},
	data() {
		return {
			loading: false,
			constantsList: [],
			categorySelect: '',
			subCategorySelect: '',
			input: '',
			confirmationModale: false
		}
	},
	mounted() {
		this.loading = true
		this.init()
	},
	watch: {
		input: function(val) {
			if (val && val[0] !== val[0].toUpperCase()) {
				this.input = val.firstLetterCapitalize()
			}
		}
	},
	methods: {
		...mapActions('constants', ['getConstants', 'addConstant']),
		async init() {
			this.getConstants()
				.then(res => {
					this.constantsList = res.data
					this.loading = false
				})
		},
		addField() {
			this.loading = true
			this.addConstant({ name: this.categorySelect.name, category: this.categorySelect.hasCategories === true ? this.subCategorySelect.Category : '', field: this.input })
				.then(() => {
					this.init()
					this.input = ''
					this.$q.notify('Champ rajouté à la liste')
					this.loading = false
				})
		}
	}
}
</script>

<style scoped>

</style>