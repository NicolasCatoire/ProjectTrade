<template>
<div class="q-mt-lg q-gutter-y-md">
	<q-tabs
		v-model="tab"
		class="text-black"
		content-class="row justify-start"
		size="md"
		indicator-color="primary"
		dense
		inline-label
		shrink stretch
	>
		<q-tab name="about" icon="person_outline" label="à propos" />
		<q-tab name="documents" icon="folder_open" label="Documents" />
		<q-tab name="collaborators" icon="groups" label="Collaborateurs" />
		<q-tab name="jobs" icon="work_outline" label="Métiers" />
		<q-tab name="carrière" icon="badge" label="Carrière" />
		
	</q-tabs>
	<q-separator class="q-ma-none"/>

	<q-tab-panels v-model="tab" animated>
		<q-tab-panel name="about">
			<About 
				v-if="dataLoaded"
				:companyInfos="companyInfos"
			/>
		</q-tab-panel>

		<q-tab-panel name="documents">
			<Documents 
				:companyInfos="companyInfos"
				@uploadSuccess="uploadDocumentSuccess()"
				@deleteFileSuccess="deleteFileSuccess()"
			/>
		</q-tab-panel>

		<q-tab-panel name="collaborators">
			<Collaborators :collaborators="companyInfos.collabs" />
		</q-tab-panel>

		<q-tab-panel name="jobs">
			<Referentials :refs="companyInfos.refs" />
		</q-tab-panel>

		<q-tab-panel name="carrière">
			<Settings-career :companyInfos="companyInfos" />
		</q-tab-panel>

	</q-tab-panels>
	
</div>

</template>

<script>
import About from "./panels/about.vue"
import Documents from "./panels/documents.vue"
import SettingsCareer from "./panels/settingsCareer.vue"
import Collaborators from "./panels/collaborators.vue"
import Referentials from "./panels/referentials.vue"

export default {
	components: {
		About,
		Documents,
		SettingsCareer,
		Collaborators,
		Referentials
	},
	props: {
		companyInfos: Object,
		dataLoaded: Boolean
	},
	data() {
		return {
			tab: 'about',
		}
	},
	methods: {
		uploadDocumentSuccess() {
			this.$emit('uploadDocumentSuccess')
		},
		deleteFileSuccess() {
			this.$emit('deleteFileSuccess')
		}
	}
}

</script>
