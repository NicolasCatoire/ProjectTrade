<template>
	<q-item >
		<q-item-section>
			<q-item-label class="text-primary" overline>{{ title }} :</q-item-label>
			<q-item-label v-if="multiple === true && data.length === 0 || multiple === false && !data">Non communiqué</q-item-label>
			<q-item-label v-else-if="multiple" v-for="(item, index) in data" :key="index">
					- {{ item.label ? item.label : item }} {{ item.mandatory ? '(champs obligatoire)' : ''}}
				</q-item-label>
			<q-item-label v-else-if="input === 'type-duration'">
				Type : {{ data }}
				/ durée : {{ duration }}
			</q-item-label>
			<q-item-label v-else>{{ data }}</q-item-label>
		</q-item-section>
	</q-item>
</template>

<script>

export default {
	props: {
		title: String,
		data: [String, Array],
		multiple: Boolean,
		input: String,
		duration: String
	}
}

</script>

<style>

</style>