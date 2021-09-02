<template>
  <div class="col-5 q-pa-md" style="">
		<q-card v-if="loading" class="column items-center justify-center full-height">
			chargement de la liste
			<q-spinner 
				size="40px"
			/>
		</q-card>
		<q-card v-else class="full-height">
			<div class="q-pt-md column items-center"> 
				<div class="text-h6">
					Elements présents
				</div>
				<q-input 
					v-model="search"
					filled
					type="search"
					label="Filtrer"
					class="full-width q-pa-md"
				>
					<template v-slot:append>
          	<q-icon name="search" />
        	</template>
				</q-input>
			</div>
			<q-list bordered separator class="column full-height">
				<q-expansion-item v-for="(item, index) in this.filteredList"
					:caption="item.hasCategories ? 'Contient des catégories': ''"
					group="somegroup"
					:key="index" 
					:label="item.name"
					header-class="text-black"
				>
					<q-card v-if="item.hasCategories === false">
						<q-card-section>
							<ul v-for="(field, indx) in item.options" :key="indx">
								<li>{{ field.label }}</li>
							</ul>
						</q-card-section>
					</q-card>
					<div v-else>
						<q-expansion-item v-for="(option, idx) in item.options" 
							:header-inset-level="0.2"
							:key="idx" 
							:label="option.Category"
						>
							<q-scroll-area style="height: 300px;">
								<q-card>
									<q-card-section>
										<ul v-for="(i, index) in option.options" :key="index">
											<li>{{ i.label ? i.label : i }}</li>
										</ul>
									</q-card-section>
								</q-card>
							</q-scroll-area>
						</q-expansion-item>
					</div>
				</q-expansion-item>
			</q-list>
		</q-card>
	</div>
</template>

<script>
export default {
	props: {
		constants: Array,
		loading: Boolean
	},
	data() {
		return {
			search: ''
		}
	},
	computed: {
		filteredList() {
			if (this.search.length == 0) {
				return this.constants
			}
			// filter on Category Name
			let formatString = this.search.toLowerCase().strToNoAccent()
      let filter = this.constants.filter(item => { 
				return item.name.toLowerCase().indexOf(formatString) > -1
			})

				this.constants.forEach(constant => {
					if (!constant.hasCategories) {
						// filter on the Category single options
						const options = constant.options.map(opt => opt.label)
						let filterLength = options.filter(opt => opt.toLowerCase().strToNoAccent().indexOf(formatString) > -1 )
						if (filterLength.length > 0) {
							if (filter.indexOf(constant) === -1) {
								filter.push(constant)
							}
						}
					} else {
						// filter on the Category name including several options
						const options = constant.options.map(opt => opt.Category)
						let filterL = options.filter(opt => opt.toLowerCase().strToNoAccent().indexOf(formatString) > -1)
						if (filterL.length > 0) {
							if (filter.indexOf(constant) === -1) {
								filter.push(constant)
							}
						}
						// filter on the labels of this sub options
						constant.options.forEach(subOpt => {
							subOpt.options.forEach(obj => {
								let indexOfSearch
								if (obj.label) {
									indexOfSearch = obj.label.toLowerCase().strToNoAccent().indexOf(formatString)
								} else {
									indexOfSearch = obj.toLowerCase().strToNoAccent().indexOf(formatString)
								}
								if (indexOfSearch >= 0) {
									if (filter.indexOf(constant) === -1) {
										filter.push(constant)
									}
								}
							})
						})
					}
				})
			return filter
    }
	}
}
</script>

<style>

</style>