<template>
  <q-page class="row">
    <q-card class="col-4">
      <Timeline
        id="leihia_emploi"
        sourceType="profile"
        :options="{ width:'500',
        height:'900' }"
        class="flex flex-center"
      >
        <div class="row justify-center items-center" style="height: 900px;">
          <q-spinner-ball color="primary" size="md" />
        </div>
      </Timeline>
    </q-card>

    <q-card class="col-8 row justify-center">
      <div class="q-pa-md full-width">
        <h6 class="row justify-center">
          Nombres de B2C inscrits
        </h6>
        <div class="row justify-center">
          <q-date v-model="dateRange" range
                  title="Nombre d'inscrits"
                  subtitle="Choisir deux dates"
                  mask="YYYY-MM-DD"
          />
        </div>
        <div class="row justify-center">
          <q-btn @click="numbersB2CDate(dateRange.from, dateRange.to)" label="Submit"
                 class="q-mt-lg"/>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" v-if='hidden === true'>
          <q-card flat bordered class="">
            <q-card-section class="row">
              <div class="text-h6 col-12">Derniers inscrits
              </div>
            </q-card-section>

            <q-separator inset></q-separator>

            <q-card-section>
              <IEcharts :option="lineLastQuizOptions" ref="line" :resizable="true"
                        style="height:350px"/>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-card>

  </q-page>

</template>


<script>
import { Timeline } from 'vue-tweet-embed'
import Vue from 'vue';
import IEcharts from 'vue-echarts-v3/src/full.js';
import {exportFile} from 'quasar';
import {api} from "boot/axios";
import {mapGetters, mapActions} from 'vuex'
Vue.component('IEcharts', IEcharts);

export default {
  components: {
    Timeline
  },



  data() {
    return {
      hidden: false,
      result: this.result,
        dateRange: { from: "", to: "" }
    }
  },
  methods: {
    ...mapActions("user", ["getNumbersB2CBetweenTwoDates"]),
    async numbersB2CDate() {
      await this.getNumbersB2CBetweenTwoDates({from: this.dateRange.from, to: this.dateRange.to}).then(res => {
        this.result = res.data.result
        this.hidden = true
      })
    }
  },
  computed: {
    lineLastQuizOptions() {
      return {
        grid: {
          bottom: '20%',
          left: '10%',
          top: '10%'
        },
        legend: {
          bottom: 0,
          textStyle: {
            color: this.$q.dark.isActive ? 'white' : 'black'
          }
        },
        tooltip: {},
        dataset: {
          dimensions: ['date', 'counter'],
          source: this.result
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            color: this.$q.dark.isActive ? 'white' : 'black'
          }
        },
        yAxis: {
          axisLabel: {
            color: this.$q.dark.isActive ? 'white' : 'black'
          }
        },
        series: [
          {type: 'line', name: 'Nombre d\'utilisateurs'},
        ]
      }
    },
  }
};
</script>


<style scoped>
.q-chip__content {
  display: block;
  text-align: center;
}
</style>
