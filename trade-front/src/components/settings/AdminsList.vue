<template>
  <q-card class="col-12 q-px-xl">
		<h5 style="text-align: center">Admins</h5>
		<q-table
			:loading="loadingFetchData"
			virtual-scroll
			:hidden="userRole !== 'SuperAdmin'"
			:data="admins ? admins : []"
			table-title-class="bg-grey-5"
			table-header-class="bg-grey-5"
			:hide-header="mode === 'grid'"
			:columns="columns"
			row-key="name"
			:grid="mode === 'grid'"
			:filter="filter"
			@row-click="onRowClick"
			:pagination.sync="pagination"
		>
			<template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
			<template v-slot:body-cell-status="props">
				<q-td :props="props">
					<q-chip
						:color="
						props.row.status == 'Active'? 'green': props.row.status == 'Inactive'? 'red': 'grey'"
						text-color="white"
						dense
						class="text-weight-bolder"
						square
						style="width: 85px"
					>
						{{ props.row.status }}
					</q-chip>
				</q-td>
			</template>
		</q-table>
	</q-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	data() {
		return {
			loadingFetchData: false,
			columns: [
        {
          name: "lastname",
          align: "left",
          label: "Nom",
          field: "lastname",
          sortable: true,
        },
        {
          name: "firstname",
          align: "left",
          label: "Prénom",
          field: "firstname",
          sortable: true,
        },
        {
          name: "role",
          align: "left",
          label: "Role",
          field: "role",
          sortable: true,
        },
        {
          name: "email",
          align: "left",
          label: "Email",
          field: "email",
          sortable: true,
        },
        {
          name: "description",
          align: "left",
          label: "Description",
          field: "description",
          sortable: true,
        },
      ],
      pagination: {
        rowsPerPage: 10,
      },
			admins: this.admins,
      filter: "",
      mode: "list",
		}
	},
	mounted() {
    this.init()
  },
	methods: {
		...mapActions('admin', ['getAdmins']),
		init(){
      this.getAdminsSettings()
    },
    async getAdminsSettings() {
      if (this.userRole === "SuperAdmin") {
				this.loadingFetchData = true
        await this.getAdmins()
					.then(res => {
          	this.admins = res.data.admins.filter(user => user._id !== this.userInfos.id)
						this.loadingFetchData = false
        	})
      }
    },
		onRowClick(evt, row) {
      this.$router.push(`/admin/${row._id}`)
    }
	},
	computed: {
    ...mapGetters("auth", ["userInfos", "userRole"]),
  }
}
</script>

<style>

</style>