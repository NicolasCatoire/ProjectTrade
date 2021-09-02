<template>
	<div>
		<div class="row q-mb-sm full-width">
			<q-table
				class="full-width"
				title="Référentiels métiers"
				:data="refs"
				:columns="columns"
				row-key="id"
				:filter="filter"
			>
				<template v-slot:header="props">
					<q-tr :props="props">
						<q-th auto-width></q-th>
						<q-th
							v-for="col in props.cols"
							:key="col.name"
							:props="props"
						>
							{{ col.label }}
						</q-th>
					</q-tr>
				</template>
				<template v-slot:top-right="">
					<q-input style="width: 280px;" outlined dense debounce="300" v-model="filter" placeholder="Recherche">
						<template v-slot:append>
						<q-icon name="search"/>
						</template>
					</q-input>
				</template>
				<template v-slot:body="props">
					<q-tr :props="props">
						<q-td auto-width>
							<q-btn size="sm" color="primary" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
						</q-td>
						<q-td
							v-for="col in props.cols"
							:key="col.name"
							:props="props"
						>
							<span v-if="col.name === 'createdAt'">
								 {{ formatDate(col.value) }}
							</span>
							<span v-else>
								{{ col.value }}
							</span>
						</q-td>
					</q-tr>
					<q-tr v-show="props.expand" :props="props">
						<q-td colspan="100%">
							<ReferentialCard :referential="props.row" />
						</q-td>
					</q-tr>
				</template>
			</q-table>
		</div>
	</div>
</template>

<script>
import { date } from "quasar"
import ReferentialCard from '../referentialCard.vue'

export default {
	components: {
		ReferentialCard
	},
	props: {
		refs: Array
	},
	data() {
		return {
			filter: '',
			columns: [
				{
					name: 'name',
					label: 'Nom',
					align: 'center',
					field: 'name',
					sortable: true
				},
				{
					name: 'ref',
					label: 'Ref',
					align: 'center',
					field: 'ref',
					sortable: true
				},
				{
					name: 'createdAt',
					label: 'Création',
					align: 'center',
					field: 'createdAt',
					sortable: true
				},
				{
					name: 'id',
					label: 'Id',
					align: 'center',
					field: 'id',
					sortable: true
				}
			]
		}
	},
	methods: {
		formatDate(data) {
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