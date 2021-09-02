<template>
  <q-dialog v-model="dialog" class="q-gutter-sm">
		<q-card style="width: 400px; max-width: 80vw;">
			<q-card-section>
				<div class="text-h6">Confirmation</div>
			</q-card-section>

			<q-card-section class="q-pt-none">
				{{ text }}
			</q-card-section>

			<q-card-actions align="right">
				<q-btn flat label="Annuler" color="primary" v-close-popup />
				<q-btn @click="confirm()" unelevated label="Confirmer" color="primary" v-close-popup :loading="loading" />
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script>
export default {
	props: {
		modalIsOpen: Boolean,
		text: String,
		loading: Boolean
	},
	computed: {
		dialog: {
			get() {
				return this.modalIsOpen
			},
			set() {
				this.$emit('closeDialog')
			}
		}
	},
	methods: {
		confirm() {
			this.$emit('confirm')
		},
		cancel() {
			this.$emit('closeDialog')
		}
	}
}
</script>

<style>

</style>