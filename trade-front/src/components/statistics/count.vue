<template>
  <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
		<q-card>
			<q-card-section :class="$q.dark.isActive? darkColor : color" class="text-white">
				<div class="row">
					<div class="col-10">
						<div class="text-h6">{{ text }}</div>
						<div class="text-h5">{{ data }}</div>
					</div>
					<div class="col-2">
						<q-icon size="62px" :name="icon"/>
					</div>
				</div>
			</q-card-section>
		</q-card>
	</div>
</template>

<script>
export default {
	props: {
		text: String,
		data: Number,
		color: String,
		darkColor: String,
		icon: String
	}
}

</script>

<style>

</style>