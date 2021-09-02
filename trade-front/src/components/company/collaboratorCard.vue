<template>
  <q-card flat bordered>
		<q-card-section align="left" :class="$q.screen.gt.sm ? 'row justify-between' :  ''" >
			<div class="text-overline text-uppercase">Collaborateurs de {{ user.firstname }} {{ user.lastname }}</div>
			<q-btn 
				@click="deleteCollab()"
				size="xs"
				color="red"
				unelevated
				class="q-ml-md q-ma-xs"
				label="supprimer le collaborateur"
			/>
		</q-card-section>
		
		<q-list bordered separator class="q-ma-sm">
			<div v-if="!user.subordinates || user.subordinates && user.subordinates.length === 0">
				<q-item >
					<q-item-section>
						<q-item-label overline>Pas de collaborateur</q-item-label>
					</q-item-section>
				</q-item>
			</div>
			<div v-else>
				<q-item v-for="collab in user.subordinates" 
					:key="collab.id"
					class="q-ma-sm" 
					bordered
				>
					<subordinate-card :collab="collab" />
				</q-item>
			</div>
    </q-list>
	</q-card>
</template>

<script>
import { mapActions } from "vuex"

import SubordinateCard from "./subortinateCard.vue"

export default {
	components: {
		SubordinateCard
	},
	props: {
		user: Object
	},
	methods: {
		...mapActions('company', ['deleteCollaborator']),
		async deleteCollab() {
			await this.deleteCollaborator(this.user.id)
		}
	}
}
</script>

<style>

</style>