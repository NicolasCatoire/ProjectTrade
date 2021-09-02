<template>
	<div v-if="candidateInfos.user" class="full-height row">
		<span class="q-ml-md q-my-sm">
			<div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Liste de candidats" to="/candidates" />
      <q-breadcrumbs-el :label="candidateInfos.user.firstname + ' ' + candidateInfos.user.lastname" />
    </q-breadcrumbs>

  </div>
		</span>
		<q-card class="full-height row col-12">

			<q-card-section class="col-xs-12 col-sm-3">
				<div class="row justify-center q-mt-md">
					<q-img width="70%" :src="candidateInfos.user.profilePicture ? candidateInfos.user.profilePicture.url : 'default-no-profilepic.png'" />
				</div>
				<div class="row justify-center q-mt-md">
					<q-btn
						:loading="loadingGetBilanPdf"
						:disable="candidateInfos.user.quiz && candidateInfos.user.quiz.profile ? false : true"
						unelevated
						label="Voir le bilan"
						style="background: #E3F2FD;"
						class="q-pl-none text-blue"
						@click="downloadFile()"
					/>

          <q-btn
            :loading="loadingGetCVPdf"
            :disable="candidateInfos.user.quiz && candidateInfos.user.quiz.profile ? false : true"
            unelevated
            label="Voir le CV "            style="background: #E3F2FD;"
            class="q-pl-none text-blue"
            @click="downloadCV()"
          />

					<PdfViewerModale
						pdfType="html5"
						:fileUrl="fileUrl"
						:dialog="seePdfDialog"
						@closeDialog="seePdfDialog = false"
					/>
				</div>
			</q-card-section>

			<q-card-section class="col-xs-12 col-sm-9">
				<div class="row">
					<div class="text-h5">
						{{ candidateInfos.user.firstname }} {{ candidateInfos.user.lastname }}
					</div>
					<div class="q-ml-md q-mt-xs">
						<q-icon name="location_on" color="grey" size="xs" />
						<span class="text-caption text-grey">{{ candidateInfos.user.city ? candidateInfos.user.city : "Ville non renseignée" }}</span>
						<q-badge class="q-ml-md" outline :color="candidateInfos.user.accountActivated === true ? 'green' : 'red' " :label="candidateInfos.user.accountActivated === true ? 'Compte activé' : 'Compte non activé'" />
						<q-badge class="q-ml-md" outline :color="candidateInfos.user.quiz && candidateInfos.user.quiz.profile ? 'green' : 'red' " :label="candidateInfos.user.quiz && candidateInfos.user.quiz.profile ? 'Expérience Leihia vécue' : 'Expérience Leihia non vécue'" />
					</div>
				</div>
				<div v-if="candidateInfos.user && candidateInfos.user.quiz && candidateInfos.user.quiz.profile && candidateInfos.user.quiz.profile.métier">
					<span v-for="(job, index) in candidateInfos.user.quiz.profile.métier" :key="index">
						<span class="text-caption text-blue">{{ index == candidateInfos.user.quiz.profile.métier.length -1 ? job : job + " / " }}</span>
					</span>
				</div>
				<div v-else>
					<span class="text-caption text-blue">Aucun métier renseigné</span>
				</div>
				<q-card v-if="loadingFetchUser" flat  class="q-mt-md q-pa-sm " style="width: 300px;">
					<q-spinner
						class="q-mr-xs"
						color="primary"
						size="2em"
					/>
					Chargement des informations...
				</q-card>
				<q-card-actions class="q-pl-none q-mt-lg row">
					<q-btn
            @click="editUserMainInfos()"
            v-if="userRole === 'SuperAdmin'"
            unelevated
            :disable="!dataLoaded"
            style="background: #E3F2FD;"
            class="q-pl-none text-blue"
            label="éditer les informations"
          />

          <q-btn
            @click="connectAsCandidate()"
            v-if="userRole === 'SuperAdmin'"
            unelevated
            :disable="!dataLoaded"
            style="background: #E3F2FD;"
            class="q-pl-none text-blue"
            label="Connexion en tant qu'utilisateur"
          />

					<q-btn
						v-if="candidateInfos.user.accountActivated === false"
						unelevated
						:disable="!dataLoaded"
						style="background: #eaf9eb;"
						class="q-pl-none text-green"
						label="Activer le compte"
						:loading="activationLoading"
						@click="handleActivateUserAccount()"
					/>

					<q-btn
						v-if="userRole === 'SuperAdmin'"
						:disable="!dataLoaded"
						flat
						text-color="red"
						label="supprimer l'utilisateur"
					/>
				</q-card-actions>

				 <div class="q-mt-md q-gutter-y-md" style="max-width: 500px">

						<q-tabs
							v-model="tab"
							class="text-black"
							size="md"
							indicator-color="primary"
							dense
							inline-label
						>
							<q-tab name="about" icon="person" label="à propos" />
							<q-tab disable name="Rendez-vous Leihiens" icon="badge" label="Rendez-vous Leihiens" />

						</q-tabs>
						<q-separator class="q-ma-none"/>

						<q-tab-panels v-model="tab" animated style="font-size: 16px;">
							<q-tab-panel name="about">
								<div class="text-caption text-grey q-mb-sm">Informations de contact</div>
								<div class="row">
									<div class="row col-12 q-mb-xs">
										<div class="col-6">
											Téléphone :
										</div>
										<div class="col-6">
											{{ candidateInfos.user.phone }}
										</div>
									</div>
									<div class="row col-12 q-mb-xs">
										<div class="col-6">
											Email :
										</div>
										<div class="col-6">
											{{ candidateInfos.user.email }}
										</div>
									</div>
									<div class="row col-12 q-mb-xs">
										<div class="col-6">
											Username :
										</div>
										<div class="col-6">
											{{ candidateInfos.user.username }}
										</div>
									</div>
									<div class="row col-12 q-mb-xs">
										<div class="col-6">
											Adresse :
										</div>
										<div class="col-6">
											{{ candidateInfos.user.street }} {{ candidateInfos.user.zip_code }} - {{ candidateInfos.user.city }}
										</div>
									</div>
								</div>

								<div class="text-caption text-grey q-mt-md q-mb-sm">Autres informations</div>
								<div class="row">
									<div class="row col-12 q-mb-xs">
										<div class="col-6">
											Date de naissance :
										</div>
										<div class="col-6">
											{{ formatBirthdate(candidateInfos.user.date_of_birth) }}
										</div>
									</div>
									<div class="row col-12 q-mb-xs">
										<div class="col-6">
											Date d'inscription :
										</div>
										<div class="col-6">
											{{ formatDateHour(candidateInfos.user.createdAt) }}
										</div>
									</div>
                  <div class="row col-12 q-mb-xs">
                    <div class="col-6">
                      Dernière activité :
                    </div>
                    <div class="col-6">
                      {{ formatDateHour(candidateInfos.user.accessedAt) }}
                    </div>
                  </div>
                  <div class="row col-12 q-mb-xs">
                    <div class="col-6">
                      Id utilisateur :
                    </div>
                    <div class="col-6">
                      {{ candidateInfos.user.id }}
                    </div>
                  </div>
                </div>

                <div class="text-caption text-grey q-mt-md q-mb-sm">Quiz</div>
                <div class="row">
                  <div class="row col-12 q-mb-xs">
                    <div class="col-6">
                      Date de quiz :
                    </div>
                    <div class="col-6">
                      {{ formatDateHour(candidateInfos.user.date_of_quiz) }}
                    </div>
                  </div>
                </div>

                <div class="row col-12 q-mb-xs">
                  <div class="col-6">
                    Note de quiz :
                  </div>
                  <div class="col-6">
                    {{ candidateInfos.user.quiz_rating ? candidateInfos.user.quiz_rating.note : "-" }}
                  </div>
                </div>

                <div class="row col-12 q-mb-xs">
                  <div class="col-6">
                    Commentaire du quiz :
                  </div>
                  <div class="col-6">
                    {{ candidateInfos.user.quiz_rating ? candidateInfos.user.quiz_rating.commentary : "-" }}
                  </div>
                </div>

                <div class="text-caption text-grey q-mt-md q-mb-sm">Mugs</div>
                <div class="row">
                  <div class="row col-12 q-mb-xs">
                    <div class="q-pa-md q-gutter-sm"  style="font-size: 16px">
                      <q-tree
                        :expanded.sync="expanded"
                        accordion
                        :nodes="profile.simple"
                        node-key="label"
                      />
                    </div>
                  </div>
                </div>

              </q-tab-panel>

						</q-tab-panels>

				 </div>
			</q-card-section>
			 	<user-details v-if="dataLoaded" @closeModal="userEditMainInfos = false" @updateMainInfosSuccess="updateMainInfosSuccess()"
			 		:modalOpen="userEditMainInfos" :rowInfos="candidateInfos.user"/>
		</q-card>
	</div>
</template>
//
<script>
import {LocalStorage} from "quasar";
import { mapGetters, mapActions } from "vuex"
import { date } from 'quasar'
import userDetails from "components/userDetails"
import PdfViewerModale from '../components/commons/pdfViewerModale.vue'
import JobExperience from '../json/jobExperience.json'
import languagesLevel from '../json/LanguagesLevel.json'
import salaryRangeB2C from '../json/SalaryRangeB2c.json'

export default {
	components: {
		userDetails,
		PdfViewerModale
	},

	data() {
		return {
		  jobExperience: JobExperience,
      languagesLev: languagesLevel,
      salaryRange: salaryRangeB2C,
      expanded: [ "Profil du talent"],
      loadingGetBilanPdf: false,
      loadingGetCVPdf: false,
      seePdfDialog: false,
			fileUrl: '',
			tab: 'about',
			dataLoaded: false,
			loadingFetchUser: false,
			activationLoading: false,
			userEditMainInfos: false
		}
	},

	beforeMount() {
		this.fetchUserInfo()
	},

	methods: {
		...mapActions('user', ['getCandidateInfos', 'activateUserAccount', 'getUserBilanPdf', 'getUserCVPdf', 'connectAsB2C']),

    arrayManager(arraySend) {
      let tempSource = []

      let arrayTemp = arraySend ? arraySend : []

      for (let i = 0; i < arrayTemp.length; i++) {
        let result = (arrayTemp[i])

        let data = {
          label: result,
        }
        tempSource.push(data)
      }
      return tempSource
    },

    findLabelFromValue(value, json){
      let label = ""
      for (let i = 0; i < Object.keys(json).length; i++) {
        if (json[i].value == value) {
          label = json[i].label
          break;
        }
      }

      return label
    },

    arrayObjectManager(arraySend) {
      let tempSource = []

      let arrayTemp = arraySend ? arraySend : []

      for (let i = 0; i < Object.keys(arrayTemp).length; i++) {
        let result = (arrayTemp[Object.keys(arrayTemp)[i]])

        let data = {
          label: result,
        }
        tempSource.push(data)
      }
      return tempSource
    },

		async fetchUserInfo() {
			this.loadingFetchUser = true
			await this.getCandidateInfos(this.$route.params.id)
				.then(() => {
					this.dataLoaded = true
				})
			this.loadingFetchUser = false
		},

		editUserMainInfos() {
			this.userEditMainInfos = true
		},

		updateMainInfosSuccess() {
			this.userEditMainInfos = false
			this.fetchUserInfo()
		},

		async handleActivateUserAccount() {
			this.activationLoading = true
			await this.activateUserAccount(this.candidateInfos.user.id)
				.then(() => {
					this.fetchUserInfo()
					this.$q.notify(`L'utilisateur a été activé`)
				})
				.catch(() => {
					this.$q.notify('Une erreure est survenue')
				})
			this.activationLoading = false
		},

		formatBirthdate(data) {
      if (!data) {
        return '-'
      }
      const timeStamp = new Date(data)
      const formattedString = date.formatDate(timeStamp, 'DD/MM/YYYY')
      return formattedString
    },

		formatDateHour(data) {
      if (!data) {
        return '-'
      }
      const timeStamp = new Date(data)
      const formattedString = date.formatDate(timeStamp, 'DD/MM/YYYY - HH:mm')
      return formattedString
    },

		async downloadFile() {
			this.loadingGetBilanPdf = true
			await this.getUserBilanPdf(this.candidateInfos.user.id)
			.then(res => {
				const blob = new Blob([res.data], { type: 'application/pdf' })
    		this.fileUrl = window.URL.createObjectURL(blob)
				this.seePdfDialog = true
      }).catch(err => {
        this.$q.notify('Un problème est survenu')
      })
      this.loadingGetBilanPdf = false
		},

    async downloadCV() {
      this.loadingGetCVPdf = true
      let cv = await this.getUserCVPdf(this.candidateInfos.user.id).then(res => {

        const blob = new Blob([res.data], {type: 'application/pdf'})
        this.fileUrl = window.URL.createObjectURL(blob)
        this.seePdfDialog = true

      }).catch(
        err => {
          this.$q.notify('Un problème est survenu ou absence de CV')
        })
      this.loadingGetCVPdf = false
    },

    async connectAsCandidate() {
     await this.connectAsB2C(this.candidateInfos.user.id).then(res => {
        let tkn = res.data.access_token,
            BOtkn = LocalStorage.getItem('token')

        this.$q.cookies.set("tkn", tkn, {
          domain: process.env.NODE_ENV == 'development' ? "localhost" : "leihia.com",
          path: '/'
        });

        this.$q.cookies.set("BOtkn", BOtkn, 
        {
          domain: process.env.NODE_ENV == 'development' ? "localhost" : "leihia.com",
          path: '/'
        });

        this.$q.cookies.set("idUser", this.candidateInfos.user.id, 
        {
          domain: process.env.NODE_ENV == 'development' ? "localhost" : "leihia.com",
          path: '/'
        });

       }).finally(() => {
          let url = process.env.NODE_ENV == 'development' ? "http://localhost:8081/profil" : "https://app.leihia.com/profil"
          window.open(url, '_blank')
      })
    }
  },

  computed: {
    ...mapGetters('user', ['candidateInfos']),
    ...mapGetters('auth', ['userRole']),



    profile() {

      return {

        simple: [
          {
            label: "Profil du talent",
            icon: 'fas fa-id-badge',
            children: [

              {
                label: "Compétences comportementales",
                icon: 'fas fa-brain',
                children: [
                  {
                    label: 'Soft skills',
                    icon: 'fas fa-cogs',
                    children: this.arrayManager(this.candidateInfos.user.quiz?.profile?.atout)

                  },
                  {
                    label: 'Hobbies',
                    icon: 'fas fa-biking',
                    children: this.arrayManager(this.candidateInfos.user.quiz?.profile?.hobbies)

                  },
                ]
              },

              {
                label: "Compétences académiques",
                icon: 'fas fa-graduation-cap',
                children: [
                  {
                    label: 'Langues',
                    icon: 'fas fa-language',
                    children: this.arrayManager(this.candidateInfos.user.quiz?.profile?.languages)

                  },

                  {
                    label: 'Diplomes',
                    icon: 'fas fa-school',
                    children: this.arrayObjectManager([this.candidateInfos.user.quiz?.profile?.degree?.label])

                  },

                  {
                    label: 'Expérience ',
                    icon: 'fas fa-flask',
                    children: this.arrayManager([this.findLabelFromValue(this.candidateInfos.user.quiz?.profile?.experience, this.jobExperience)])

                  },

                  {
                    label: 'Niveau de Français ',
                    icon: 'fas fa-language',
                    children: this.arrayManager([this.findLabelFromValue(this.candidateInfos.user.quiz?.profile?.french, this.languagesLev)])

                  },

                ]
              },

              {
                label: "Compétences techniques",
                icon: 'fas fa-wrench',
                children: [
                  {
                    label: 'Permis',
                    icon: 'fas fa-id-card',
                    children: this.arrayManager(this.candidateInfos.user.quiz?.profile?.driver_licence)

                  },
                  {
                    label: 'Certifications',
                    icon: 'fas fa-certificate',
                    children: this.arrayManager(this.candidateInfos.user.quiz?.profile?.certificates)
                  },

                  {
                    label: "Compétences informatiques",
                    icon: 'fas fa-laptop',
                    children: this.arrayManager(this.candidateInfos.user.quiz?.profile?.computer_skills)
                  },
                ]
              },

              {
                label: "Travail",
                icon: 'fas fa-building',
                children: [
                  {
                    label: 'Métiers',
                    icon: 'fas fa-briefcase',
                    children: this.arrayManager(this.candidateInfos.user.quiz?.profile?.métier)

                  },
                  {
                    label: 'Contrats',
                    icon: 'fas fa-file-signature',
                    children: this.arrayManager(this.candidateInfos.user.quiz?.profile?.contract)

                  },
                  {
                    label: 'Véhicules',
                    icon: 'fas fa-car',
                    children: this.arrayManager(this.candidateInfos.user.quiz?.profile?.vehicule)

                  },
                  {
                    label: 'Télétravail',
                    icon: 'fas fa-laptop-house',
                    children: this.arrayManager([this.candidateInfos.user.quiz?.profile?.teletravail])

                  },

                  {
                    label: 'Temps de travail',
                    icon: 'fas fa-calendar-alt',
                    children: this.candidateInfos.user.quiz?.profile?["temps travail"] : ["-"]

                  },

                  {
                    label: 'Mobilité',
                    icon: 'fas fa-road',
                    children: this.arrayManager([this.candidateInfos.user.quiz?.profile?.mobilite + " km"])

                  },

                  {
                    label: 'Fourchette de salaire',
                    icon: 'fas fa-money-bill-wave',
                    children: this.arrayManager([this.findLabelFromValue(this.candidateInfos.user.quiz?.profile?.salary, this.salaryRange)])

                  },
                ]
              },
            ]
          }
        ],
      }
    }
  }
}
</script>

<style>



</style>
