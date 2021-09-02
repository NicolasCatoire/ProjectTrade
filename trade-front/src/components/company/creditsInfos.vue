<template>
  <div flat bordered class="q-pa-md q-mt-lg q-mr-lg q-ml-lg">
		<q-card-section class="q-pt-none" >
			<div class="text-uppercase text-weight-light text-subtitle2 text-center">
				Crédits
			</div>
			<q-separator inset />
		</q-card-section>
	
		<div class="flex flex-center">
			<div class="column items-center">
				<div class="text-caption text-weight-thin">Recrutement</div>
				<q-knob
					:step="10"
					:max="500"
					v-model="recruitment"
					show-value
					readonly
					size="60px"
					:thickness="0.22"
					:color="recruitment > 10 ? 'lime' : 'orange'"
					:track-color="recruitment > 10 ? 'lime-3' : 'orange-3'"
					:class="recruitment > 10 ? 'text-lime q-ma-md' : 'text-orange q-ma-md'"
				/>
			</div>
			<div class="column items-center">
				<div class="text-caption text-weight-thin">Rdv Leihien</div>
				<q-knob
					:step="25"
					:max="500"
					v-model="leihien"
					readonly
					show-value
					size="60px"
					:thickness="0.22"
					:color="recruitment > 10 ? 'lime' : 'orange'"
					:track-color="recruitment > 10 ? 'lime-3' : 'orange-3'"
					:class="recruitment > 10 ? 'text-lime q-ma-md' : 'text-orange q-ma-md'"
				/>
			</div>
		</div>
		<div>
		</div>
		
	</div>
</template>

<script>
export default {
	props: {
		leihienCredits: Number,
		recruitmentCredits: Number
	},
	watch: {
		leihienCredits() {
			this.leihien = this.leihienCredits
		},
		recruitmentCredits() {
			this.recruitment = this.recruitmentCredits
		}
	},
	data() {
		return {
			leihien: this.leihienCredits,
			recruitment: this.recruitmentCredits
		}
	}
}
</script>

<style lang="scss" scoped>

</style>