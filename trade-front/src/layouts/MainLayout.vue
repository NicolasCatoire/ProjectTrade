<template>
  <q-layout view="lHh LpR lFf">
    <q-header
      reveal
      :class="$q.dark.isActive ? 'header_dark' : 'header_normal'"
    >
      <q-toolbar>
        <q-btn
          @click="left = !left"
          flat
          round
          dense
          icon="menu"
          class="q-mr-sm"
        />

        <q-toolbar-title>Leihia - Administration | Hello {{ userInfos.firstname }}</q-toolbar-title>
        <q-btn
          class="q-mr-xs"
          flat
          round
          @click="$q.dark.toggle()"
          :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
        />

        <q-btn
          flat
          round
          dense
          icon="fas fa-sign-out-alt"
          @click="logout()"
        />
      </q-toolbar>
    </q-header>
    <q-drawer
      class="left-navigation text-white"
      show-if-above
      @mouseleave="closeDrawer()"
      @mouseenter="preventClose = true"
      v-model="left"
      side="left"
      elevated
      
    >
      <div
        class="full-height"
        :class="$q.dark.isActive ? 'drawer_dark' : 'drawer_normal'"
      >
        <div style="height: calc(100% - 117px);padding:10px;">
          <q-toolbar>
            <q-toolbar-title>Menu</q-toolbar-title>
          </q-toolbar>
          <hr/>
          <q-scroll-area style="height:100%;">
            <q-list padding>
              <q-item
                active-class="tab-active"
                to="/"
                exact
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="home"/>
                </q-item-section>

                <q-item-section>Accueil</q-item-section>
              </q-item>

              <q-item
                active-class="tab-active"
                to="/clients"
                exact
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="business"/>
                </q-item-section>

                <q-item-section>
                  Clients
                </q-item-section>
              </q-item>

              <q-item
                active-class="tab-active"
                to="/candidates"
                exact
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="badge"/>
                </q-item-section>

                <q-item-section>
                  Candidats
                </q-item-section>
              </q-item>

              <q-item
                active-class="tab-active"
                to="/settings"
                exact
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="settings"/>
                </q-item-section>

                <q-item-section>
                  Paramètres
                </q-item-section>
              </q-item>

              <q-item
                active-class="tab-active"
                to="/statistics"
                exact
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="timeline"/>
                </q-item-section>

                <q-item-section>
                  Statistiques
                </q-item-section>
              </q-item>


            </q-list>
          </q-scroll-area>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <q-page class="row no-wrap">
        <div class="col">
          <div class="full-height">
            <q-scroll-area :content-style="{ height: '100%', position: 'initial' }" class="q-pr-sm full-height" visible>
              <router-view />
            </q-scroll-area>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      left: false,
      preventClose: false
    };
  },
  methods: {
    ...mapActions('auth', ['logout']),
    logoutNotify() {
      this.logout()
    },
    closeDrawer() {
      this.preventClose = false
      setTimeout(() => {
        if (!this.preventClose) {
          this.left = false
        }
      }, 1000)
    }
  },
  computed: {
    ...mapGetters('auth', ['userInfos'])
  }
};
</script>

<style>
.q-drawer {
  background-size: cover !important;
}

.drawer_normal {
  background-color: rgba(1, 1, 1, 0.75);
}

.drawer_dark {
  background-color: #010101f2;
}

.navigation-item {
  border-radius: 5px;
}

.tab-active {
  background-color: #2d8827;
}

body {
  background: #f1f1f1 !important;
}

.header_normal {
  background: linear-gradient(
    145deg,
    rgb(90, 90, 87),
    rgb(90, 89, 89)
  );
}

.header_dark {
  background: linear-gradient(145deg, rgb(61, 14, 42) 15%, rgb(14, 43, 78) 70%);
}
</style>
