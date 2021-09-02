<template>
  <q-card class="my-card" >
    <q-img  width="100%" height="200px" :src="infos.img" />
    <q-card-section>
      <q-btn
        :disabled="disabled"
        fab
        color="primary"
        :icon="infos.buttonIcon"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%);"
        @click="action()"
      />
      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis q-mt-sm">
          {{ infos.title }}
        </div>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-caption text-grey">
        {{ infos.desc }}
      </div>
    </q-card-section>


    <q-card-actions class="bottomLink">
      <q-btn flat color="primary" @click="action()" :disabled="disabled">
        {{ infos.linkText }}
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
	props: {
		infos: Object,
    disabled: Boolean
	},
	methods: {
		action() {
			this.$router.push({name: this.infos.linkRoute})
		}
	}
}
</script>

<style scoped>
.my-card {
  min-height: 400px !important;
  width: 100%;
  max-width: 280px;
}

.bottomLink{
  position: absolute;
  bottom: 20px;
}
</style>
