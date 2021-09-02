<template>
	<q-item-section>
		<q-item-label overline class="text-primary">{{ collab.firstname }} {{ collab.firstname }}</q-item-label>
		<q-item-label>Role : {{ collab.role }}</q-item-label>
		<q-item-label>Email : {{ collab.email }}</q-item-label>
		<q-item-label>Téléphone : {{ collab.phone }}</q-item-label>
		<q-item-label>Id : {{ collab.id }}</q-item-label>
		<q-item-label>Collaborateurs : {{ collab.subordinates.length }}</q-item-label>
		<div style="width: 150px;">
			<q-btn 
				v-if="collab.subordinates.length > 0"
				@click="expanded =! expanded" 
				:label="expanded ? 'Fermer' : 'Voir ses collaborateurs'"
				unelevated
				size="sm"
				class="q-mt-md"
				color="primary"
			/>
		</div>

		<div v-show="expanded"  ref="expandSubs">
			<q-table
				grid
				:data="collab.subordinates"
				:columns="columns"
				row-key="name"
				hide-header
			>
				<template v-slot:item="props">
					<div class="q-ma-xs">
						<q-card>
							<q-card-section class="text-center">
								<strong>{{ props.row.firstname }} {{ props.row.lastname }}</strong>
							</q-card-section>
							<q-separator />
							<q-card-section class="column flex-start">
								<q-item-label>Role : {{  props.row.role }}</q-item-label>
								<q-item-label>Email : {{  props.row.email }}</q-item-label>
								<q-item-label>Téléphone : {{  props.row.phone }}</q-item-label>
								<q-item-label>Id : {{ props.row.id }}</q-item-label>
								<q-item-label>Collaborateurs : {{ props.row.subordinates.length }}</q-item-label>
							</q-card-section>
						</q-card>
					</div>
				</template>
			</q-table>
		</div>
	</q-item-section>
</template>

<script>

	export default {
		props: {
			collab: Object
		},
		data() {
			return {
				expanded: false,
				columns: [
					{ 
						name: 'firstname',
						align: 'center', 
						label: 'Prénom', 
						field: 'firstname' 
					},
					{ 
						name: 'lastname',
						align: 'center', 
						label: 'Nom', 
						field: 'lastname' 
					},
					{ 
						name: 'role',
						align: 'center', 
						label: 'Rôle', 
						field: 'role' 
					},
					{ 
						name: 'email',
						align: 'center', 
						label: 'Email', 
						field: 'email' 
					},
					{ 
						name: 'id',
						align: 'center', 
						label: 'Id', 
						field: 'id' 
					},
					{ 
						name: 'subordinates',
						align: 'center', 
						label: 'Collaborateurs', 
						field: 'subordinates' 
					},
				]
			}
		}
	}
	
</script>

<style>

</style>