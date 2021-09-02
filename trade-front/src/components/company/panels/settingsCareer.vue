<template>
  <div>
		<div class="text-caption text-grey q-mb-sm">Liens vers le site Carrière</div>
		<div class="row q-mb-md">
			<a class="careerLink" :href="`https://carriere.leihia.com/${companyInfos.company.name}/${companyInfos.company.id}`" target="_blank">{{`https://carriere.leihia.com/${companyInfos.company.name}/${companyInfos.company.id}`}}</a>
		</div>
		<div class="text-caption text-grey q-mb-sm">Couleurs</div>
		<div class="row q-mb-sm">
			<div class="row col-12 q-mb-xs">
				<div class="col-xs-12 col-sm-2">
					Primaire :
				</div>
				<q-card class="col-xs-4 col-sm-2 row justify-center items-center" :style="`height: 50px; background-color: ${companyInfos.company.colors.primary};color: ${companyInfos.company.colors.primary === '#000000' ? 'white' : 'black'};`">
					<q-chip size="sm" dense>{{ companyInfos.company.colors.primary }}</q-chip>
				</q-card>
			</div>
			<div class="row col-12 q-mb-xs">
				<div class="col-xs-12 col-sm-2">
					Secondaire :
				</div>
				<q-card class="col-xs-4 col-sm-2 row justify-center items-center" :style="`height: 50px; background-color: ${companyInfos.company.colors.secondary};color: ${companyInfos.company.colors.primary === '#000000' ? 'white' : 'black'};`">
					<q-chip size="sm" dense>{{ companyInfos.company.colors.secondary }}</q-chip>
				</q-card>
			</div>
		</div>
  </div>
</template>

<script>
export default {
	props: {
		companyInfos: Object
	}
}
</script>

<style lang="scss" scoped>

.careerLink {
	color: rgb(85, 85, 85);
}

</style>