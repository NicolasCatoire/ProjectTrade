<template>
  <div>
		<div class="row q-mb-sm full-width">
			<q-table
				class="full-width"
				title="Collaborateurs"
				:data="collaborators"
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
          <q-input style="width: 280px;" outlined dense debounce="300" v-model="filter" placeholder="Recherche par nom, email, rôle...">
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
							{{ col.value }}
						</q-td>
					</q-tr>
					<q-tr v-show="props.expand" :props="props">
						<q-td colspan="100%">
							<collaborator-card :user="props.row" />
						</q-td>
					</q-tr>
				</template>
			</q-table>
		</div>
  </div>
</template>

<script>
import CollaboratorCard from "../collaboratorCard.vue"

export default {
	components: {
		CollaboratorCard
	},
	props: {
		collaborators: Array
	},
	data() {
		return {
			filter: '',
			columns: [
				{
					name: 'firstname',
					label: 'Prénom',
					align: 'center',
					field: 'firstname',
					sortable: true
				},
				{
					name: 'lastname', 
					align: 'center', 
					label: 'Nom', 
					field: 'lastname', 
					sortable: true 
				},
				{
					name: 'role', 
					align: 'center', 
					label: 'Role', 
					field: 'role', 
					sortable: true 
				},
				{
					name: 'email', 
					align: 'center', 
					label: 'Email', 
					field: 'email', 
					sortable: true 
				},
				{
					name: 'phone', 
					align: 'center', 
					label: 'Téléphone', 
					field: 'phone', 
					sortable: true 
				}
			]
		}
	}
}
</script>

<style lang="scss" scoped>

.careerLink {
	color: rgb(85, 85, 85);
}

</style>