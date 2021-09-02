<template>
  <q-page
    :hidden="userRole !== 'SuperAdmin' ||'Admin'">
    <div v-if="!loading">
      <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
        <Count
          :data="statistics.role.B2Cs"
          color="bg-green-8"
          darkColor="green_dark"
          text="Nombre B2C : "
          icon="trending_up"
        />
        <Count
          :data="statistics.role.B2BAdmin + statistics.role.B2BManagers + statistics.role.B2BCollabs + statistics.role.B2BRHs"
          color="bg-green-8"
          darkColor="green_dark"
          text="Nombre B2B : "
          icon="fas fa-address-book"
        />
        <Count
          :data="statistics.countCompany"
          color="bg-green-8"
          darkColor="green_dark"
          text="Nombre de clients :"
          icon="fas fa-building"
        />
      </div>

      <div>
        <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
          <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
            <q-card flat bordered class="">
              <q-card-section class="row">
                <div class="text-h6 col-12">Notes du quiz : {{lineNoteOptions.mean}} / 5
                  <q-btn flat dense icon="fas fa-download" class="float-right"
                    @click="SaveImage('bar')"
                    :color="!$q.dark.isActive? 'grey-8':'white'">
                    <q-tooltip>Download</q-tooltip>
                  </q-btn>
                </div>
              </q-card-section>

              <q-separator inset></q-separator>

              <q-card-section>
                <IEcharts 
                  :option="lineNoteOptions" 
                  ref="bar" 
                  :resizable="true"
                  style="height:350px"
                />
              </q-card-section>
            </q-card>
          </div>

          <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-card flat bordered class="">
              <q-card-section class="row">
                <div class="text-h6 col-12">Age des candidats :
                  <q-btn flat dense icon="fas fa-download" class="float-right"
                         @click="SaveImage('pie')"
                         :color="!$q.dark.isActive? 'grey-8':'white'">
                    <q-tooltip>Download</q-tooltip>
                  </q-btn>
                </div>
              </q-card-section>

              <q-separator inset></q-separator>

              <q-card-section>
                <IEcharts ref="pie" :option="pieOptions" :resizable="true" style="height:350px"/>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">

            <q-card flat bordered class="">
              <q-card-section class="row">
                <div class="text-h6 col-12">Nombre de role par catégories :
                  <q-btn flat dense icon="fas fa-download" class="float-right"
                    @click="SaveImage('bar')"
                    :color="!$q.dark.isActive? 'grey-8':'white'"
                  >
                    <q-tooltip>Download</q-tooltip>
                  </q-btn>
                </div>
              </q-card-section>

              <q-separator inset></q-separator>

              <q-card-section>
                <IEcharts :option="barRoleOptions" ref="bar" :resizable="true"
                  style="height:350px"
                />
              </q-card-section>
            </q-card>
          </div>

        </div>
        <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
          <Count
            :data="statistics.xpLeihia.xpLeihia"
            color="bg-grey-8"
            darkColor="blue_dark"
            text="Vécu expérience :"
            icon="trending_up"
          />
          <Count
            :data="statistics.xpLeihia.xpLeihiaNone"
            color="bg-grey-8"
            darkColor="green_dark"
            text="N'a pas vécu l'expérience :"
            icon="fas fa-folder-open"
          />
          <Count
            :data="statistics.xpLeihia.xpLeihiaIncomplete"
            color="bg-grey-8"
            darkColor="orange_dark"
            text="Expérience incomplète :"
            icon="fas fa-ban"
          />
        </div>
        <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-card flat bordered class="">
              <q-card-section class="row">
                <div class="text-h6 col-12">Dernier quiz
                  <q-btn 
                    flat 
                    dense 
                    icon="fas fa-download" 
                    class="float-right"
                    @click="SaveImage('bar')"
                    :color="!$q.dark.isActive? 'grey-8':'white'"
                  >
                    <q-tooltip>Download</q-tooltip>
                  </q-btn>
                </div>
              </q-card-section>

              <q-separator inset></q-separator>

              <q-card-section>
                <IEcharts 
                  :option="barLastQuizOptions" 
                  ref="bar" 
                  :resizable="true"
                  style="height:350px"
                />
              </q-card-section>
            </q-card>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">

            <q-card flat bordered class="">
              <q-card-section class="row">
                <div class="text-h6 col-12">Recherche par type de contrats :
                  <q-btn flat dense icon="fas fa-download" class="float-right"
                    @click="SaveImage('bar')"
                    :color="!$q.dark.isActive? 'grey-8':'white'"
                  >
                    <q-tooltip>Download</q-tooltip>
                  </q-btn>
                </div>
              </q-card-section>

              <q-separator inset></q-separator>

              <q-card-section>
                <IEcharts 
                  :option="barContractOptions" 
                  ref="chart" 
                  :resizable="true"
                  style="height:350px"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <q-card flat bordered class="">
            <q-card-section class="row">
              <div class="text-h6 col-12">Type de recherche :
                <q-btn flat dense icon="fas fa-download" class="float-right"
                       @click="SaveImage('bar')"
                       :color="!$q.dark.isActive? 'grey-8':'white'">
                  <q-tooltip>Download</q-tooltip>
                </q-btn>
              </div>
            </q-card-section>

            <q-card-section>
              <q-table
                :pagination.sync="tableSearch.pagination"
                class="tableSearch"
                :data="tableSearch.dataSearch"
                :columns="tableSearch.columnsSearch"
                hide-bottom
                hide-header
              ></q-table>
            </q-card-section>
            <q-separator inset></q-separator>
          </q-card>
        </div>
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <q-card flat bordered class="">
            <q-card-section class="row">
              <div class="text-h6 col-12">Clients sans crédits :
                <q-btn flat dense icon="fas fa-download" class="float-right"
                       @click="SaveImage('bar')"
                       :color="!$q.dark.isActive? 'grey-8':'white'">
                  <q-tooltip>Download</q-tooltip>
                </q-btn>
              </div>
            </q-card-section>

            <q-card-section class="row no-wrap" style="height: 417px">
              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <h6>Crédits recrutements</h6>
                <ul style="border-right: 6px solid green">

                  <li :key="item" v-for="item of this.statistics.creditLeihienNull">{{ item }}</li>
                </ul>

              </div>

              <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="margin-left: 50px">
                <h6>Crédits leihiens</h6>

                <ul>

                  <li :key="item" v-for="item of this.statistics.creditLeihienNull">{{ item }}</li>
                </ul>

              </div>
            </q-card-section>

            <q-separator inset></q-separator>

          </q-card>
        </div>
      </div>
    </div>
      <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

          <q-card flat bordered class="">
            <q-card-section class="row">
              <div class="text-h6 col-12">Jobs par régions :
                <q-btn flat dense icon="fas fa-download" class="float-right"
                  @click="SaveImage('bar')"
                  :color="!$q.dark.isActive? 'grey-8':'white'"
                >
                  <q-tooltip>Download</q-tooltip>
                </q-btn>
              </div>
            </q-card-section>

            <q-separator inset></q-separator>

            <q-card-section>
              <IEcharts 
                :option="regionsChart" 
                ref="bar" 
                :resizable="true"
                style="height:600px; width: 100%"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
      <q-card class="col-12 row justify-center">
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
            <q-btn 
              @click="numbersB2CDate(dateRange.from, dateRange.to)" 
              color="primary" 
              label="Envoyer"
              class="q-my-lg"
            />
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
    </div>
    <div v-else class="q-pa-md q-gutter-md">
      <div class="bg-grey-3 ">
        <q-inner-loading :showing="loading">
          <q-spinner-gears size="50px" color="primary" />
          Chargement des statistiques...
        </q-inner-loading>
      </div>
    </div>
  </q-page>
</template>

<script>
import Count from '../components/statistics/count.vue'
import Vue from 'vue';
import IEcharts from 'vue-echarts-v3/src/full.js';
import {exportFile} from 'quasar';
import {api} from "boot/axios";
import {mapActions, mapGetters} from "vuex";

Vue.component('IEcharts', IEcharts);


function statsPercentage(obj) {
  let sum = 0;
  for (const el in obj) {
    if (obj.hasOwnProperty(el)) {
      sum += parseFloat(obj[el]);
    }
  }
  return sum;
}

export default {
  components: {
    Count
  },
  data() {
    return {
      filter: '',
      mode: 'list',
      loading: false,
      statistics: {},
      hidden: false,
      result: this.result,
      dateRange: { from: "", to: "" }
    }
  },

  async beforeMount() {
    this.loading = true
    await api.get('/statistics')
      .then(response => {
        this.statistics = response.data
        this.loading = false
      })

  },

  computed: {
     ...mapGetters("auth", ["userRole"]),
    regionsChart(){
      let source = []

      for(let i = 0; i < Object.keys(this.statistics.regions.regions).length; i++){
        let region = this.statistics.regions.regions[i]
        let data = {
          type: region.name,
          jobs: region.jobCounter,
          candidats: region.b2cCounter
        }

        source.push(data)
      }

      return {

        grid: {
          bottom: '30%',
          left: '5%',
          right: '5%',
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
          dimensions: ['type', 'jobs', 'candidats'],
          source: source
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            color: this.$q.dark.isActive ? 'white' : 'black',
            rotate: 60,
          }
        },
        yAxis: {
          axisLabel: {
            color: this.$q.dark.isActive ? 'white' : 'black',
          },
        },
        series: [
          {type: 'bar', name: 'Nombre de jobs'},
          {type: 'bar', name: 'Nombre de candidats'}
        ]
      }
    },
    tableSearch()
    {
      return {
        pagination: {
          rowsPerPage: 10
        },
        columnsSearch: [
          {
            name: 'desc',
            required: true,
            label: 'Type de recherche',
            align: 'left',
            field: row => row.name,
            format: val => `${val}`,
          },
          {name: 'numbers', align: 'center', label: 'Nombres', field: 'numbers', sortable: true},
        ],
        dataSearch: [
          {name: 'Etudiant', numbers: this.statistics.search.posStudent},
          {name: 'Collégien / lycéen', numbers: this.statistics.search.posTeenager},
          {name: 'Recherche active d’un emploi', numbers: this.statistics.search.posSearchActiv},
          {name: 'Travaille + un préavis d’un mois', numbers: this.statistics.search.posWork1Month},
          {name: 'Travaille + un préavis de deux mois', numbers: this.statistics.search.posWork2Month},
          {name: 'Travaille + un préavis de trois mois ou plus', numbers: this.statistics.search.posWorkMore3Month},
          {name: 'Veille active', numbers: this.statistics.search.posActiveStandby},
          {name: 'Curieux', numbers: this.statistics.search.posCurious},
        ],
      }
    },

    barLastQuizOptions() {
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
          dimensions: ['time_period', 'mois'],
          source: [
            {time_period: '< 3 Mois', mois: this.statistics.lastQuiz.dateOfQuiz3Months},
            {time_period: '3 - 6 Mois', mois: this.statistics.lastQuiz.dateOfQuiz6Months},
            {time_period: '6 Mois - 1 an', mois: this.statistics.lastQuiz.dateOfQuiz1Year},
            {time_period: '+ 1 an', mois: this.statistics.lastQuiz.dateOfQuizMore}
          ]
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
          {type: 'bar', name: 'Nombre d\'utilisateurs'},
        ]
      }
    },

    barContractOptions() {
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
          dimensions: ['type', 'clients', 'candidats'],
          source: [
            {
              type: 'Alternance',
              clients: this.statistics.contractTypeJobs.contractAlternance,
              candidats: this.statistics.contractTypeB2C.contractAlternance
            },
            {
              type: 'Freelance',
              clients: this.statistics.contractTypeJobs.contractFreelance,
              candidats: this.statistics.contractTypeB2C.contractFreelance
            },
            {
              type: 'CDD',
              clients: this.statistics.contractTypeJobs.contractCDD,
              candidats: this.statistics.contractTypeB2C.contractCDD
            },
            {
              type: 'CDI',
              clients: this.statistics.contractTypeJobs.contractCDI,
              candidats: this.statistics.contractTypeB2C.contractCDI
            },
            {
              type: 'Stage',
              clients: this.statistics.contractTypeJobs.contractStage,
              candidats: this.statistics.contractTypeB2C.contractStage
            }
          ]
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
          {type: 'bar', name: 'Nombre de clients'},
          {type: 'bar', name: 'Nombre de candidats'}
        ]
      }
    },
    barRoleOptions() {
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
          dimensions: ['value', 'role'],
          source: [
            {value: 'Admin', role: this.statistics.role.B2BAdmin},
            {value: 'Manager', role: this.statistics.role.B2BManagers},
            {value: 'Collabs', role: this.statistics.role.B2BCollabs},
            {value: 'RH', role: this.statistics.role.B2BRHs}
          ]
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
          {type: 'bar', name: 'Nombre de B2B'},
        ]
      }
    },
    lineNoteOptions() {
      return {
        mean: Math.round((((this.statistics.quizRate.quizNote1 * 1) + (this.statistics.quizRate.quizNote2 * 2) + (this.statistics.quizRate.quizNote3 * 3) + (this.statistics.quizRate.quizNote4 * 4) + (this.statistics.quizRate.quizNote5 * 5)) / (this.statistics.quizRate.quizNote1 + this.statistics.quizRate.quizNote2 + this.statistics.quizRate.quizNote3 + this.statistics.quizRate.quizNote4 + this.statistics.quizRate.quizNote5)) *10)/10,
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
          dimensions: ['value', 'note'],
          source: [
            {value: '1', note: this.statistics.quizRate.quizNote1},
            {value: '2', note: this.statistics.quizRate.quizNote2},
            {value: '3', note: this.statistics.quizRate.quizNote3},
            {value: '4', note: this.statistics.quizRate.quizNote4},
            {value: '5', note: this.statistics.quizRate.quizNote5}
          ]
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
          {type: 'bar', name: 'Nombre de notes'},
        ]
      }
    },
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
    pieOptions() {
      return {
        tooltip: {
          show: true
        },
        legend: {
          orient: 'horizontal',
          bottom: 0,
          width: 400,
          textStyle: {
            color: this.$q.dark.isActive ? 'white' : 'black'
          }
        },
        series: [
          {
            name: 'Age',
            type: 'pie',
            radius: ['40%', '75%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'inner',
                formatter: function (param, index) {
                  return param.value + ' %'
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '20',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },

            selectedMode: 'single',
            data: [
              {
                value: (this.statistics.age.count14_18 * 100 / statsPercentage(this.statistics.age)).toFixed(1),
                name: '14 - 18 ans',
                selected: false
              },
              {
                value: (this.statistics.age.count19_29 * 100 / statsPercentage(this.statistics.age)).toFixed(1),
                name: '19 - 29 ans',
                selected: false
              },
              {
                value: (this.statistics.age.count30_44 * 100 / statsPercentage(this.statistics.age)).toFixed(1),
                name: '30 - 44 ans',
                selected: false
              },
              {
                value: (this.statistics.age.count45 * 100 / statsPercentage(this.statistics.age)).toFixed(1),
                name: '+ 45 ans',
                selected: false
              },
            ]
          }
        ]
      }
    },
  },
  methods: {
    ...mapActions("user", ["getNumbersB2CBetweenTwoDates"]),
    async numbersB2CDate() {
      await this.getNumbersB2CBetweenTwoDates({
        from: this.dateRange.from,
        to: this.dateRange.to
      }).then(res => {
        this.result = res.data.result
        this.hidden = true
      })
    },
    SaveImage(type) {
      const linkSource = this.$refs[type].getDataURL();
      const downloadLink = document.createElement('a');
      document.body.appendChild(downloadLink);
      downloadLink.href = linkSource;
      downloadLink.target = '_self';
      downloadLink.download = type + '.png';
      downloadLink.click();
    },
  }
}
</script>

<style scoped>
.blue_dark {
  background-color: #082f56;
}

.green_dark {
  background-color: #084a0b;
}

.orange_dark {
  background-color: #64350e;
}
</style>
