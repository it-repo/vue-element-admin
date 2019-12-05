<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row stripe style="width: 100%">
      <el-table-column prop="ID" label="ID" width="100" />
      <el-table-column prop="UID" label="UID" width="100" />
      <el-table-column prop="Name" label="操作" width="200" />
      <el-table-column label="时间" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.CreatedAt | formatDateTime }}
        </template>
      </el-table-column>
      <el-table-column prop="Desc" label="详情" />
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getList" />
  </div>
</template>

<script>
import { fetchLogList } from '@/api/system'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 20,
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchLogList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
  },
}
</script>

<style>
</style>
