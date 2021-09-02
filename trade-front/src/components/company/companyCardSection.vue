<template>
  <div>
    <q-card-section class="q-pb-none">
      <div
        class="
					q-col-gutter-md
					row
					justify-center
					items-center
					align-center
				"
      >
        <div v-for="(field, index) in this.companyFields"
             :key="index"
             class="col-xs-12 col-sm-6"
        >
          <q-select
            v-if="field.model == 'offer'"
            :options="['Découverte', 'Privilège', 'Exploration']"
            :readonly="readonly"
            :filled="!readonly"
            color="orange"
            dense
            outlined
            v-model="form[field.model]"
            :label="field.label"
            class="no-margin"
            hide-bottom-space
          />

          <q-input
            v-else
            :readonly="readonly"
            :filled="!readonly"
            color="orange"
            dense
            outlined
            v-model="form[field.model]"
            :label="field.label"
            :type="field.type"
            hide-bottom-space
            class="no-margin"
            :rules="field.mandatory ? [val => val !== null && val !== '' || 'Champ requis'] : []"
          />

        </div>
        <div class="row full-width justify-between">

          <q-input
            :readonly="readonly"
            :filled="!readonly"
            label="Couleur primaire"
            dense
            v-model="form.colors.primary"
            :rules="['hexColor']"
            error-message="Champ requis"
            hide-bottom-space
            class="my-input col-6"
          >
            <template v-slot:append>
              <div
                class="q-mr-md"
                :style="`height: 14px; width: 14px; background-color: ${form.colors.primary};`"
              />
              <q-icon v-if="!readonly" name="colorize" class="cursor-pointer">
                <q-popup-proxy
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-color v-model="form.colors.primary"/>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
            :readonly="readonly"
            :filled="!readonly"
            label="Couleur secondaire"
            dense
            v-model="form.colors.secondary"
            :rules="['hexColor']"
            error-message="Champ requis"
            hide-bottom-space
            class="my-input col-6"
          >
            <template v-slot:append>
              <div
                class="q-mr-md"
                :style="`height: 14px; width: 14px; background-color: ${form.colors.secondary};`"
              />
              <q-icon v-if="!readonly" name="colorize" class="cursor-pointer">
                <q-popup-proxy
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-color
                    v-model="form.colors.secondary"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
    </q-card-section>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  props: {
    editing: Boolean,
    companyFields: Array,
    formModel: Object,
    readonly: Boolean
  },
  methods: {},
  computed: {
    ...mapGetters("company", ["editingCompany"]),
    form() {
      return this.formModel
    }
  }
}
</script>

<style>

</style>
