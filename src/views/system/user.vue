<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" @click="showAdd">添加</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="delAll">删除</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="用户名" width="160" />
      <el-table-column prop="nick" label="昵称" width="160" />
      <el-table-column label="头像" width="50" align="center">
        <template slot-scope="scope">
          <img class="avatar" :src="scope.row.avatar">
        </template>
      </el-table-column>
      <el-table-column prop="desc" label="详情" />
      <!-- TODO: role -->
      <el-table-column label="创建时间" width="180" align="center">
        <template slot-scope="scope">{{ scope.row.CreatedAt | formatDateTime }}</template>
      </el-table-column>
      <el-table-column label="更新时间" width="180" align="center">
        <template slot-scope="scope">{{ scope.row.UpdatedAt | formatDateTime }}</template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" @click="showEdit(scope.row.ID)">更改</el-button>
          <el-button type="danger" @click="del(scope.row.ID)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="getList"
    />

    <el-dialog title="添加用户" :visible.sync="dialogAdd">
      <el-form :model="formAdd">
        <el-form-item label="用 户 名" :label-width="formLabelWidth">
          <el-input v-model="formAdd.username" />
        </el-form-item>
        <el-form-item label="默认密码" :label-width="formLabelWidth">
          <el-input v-model="formAdd.password" show-password />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAdd = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改用户" :visible.sync="dialogEdit">
      <el-form :model="formEdit">
        <el-form-item label="昵    称" :label-width="formLabelWidth">
          <el-input v-model="formEdit.nick" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEdit = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchUserList,
  fetchUser,
  deleteUser,
  createUser,
  // updateUser,
} from '@/api/system'
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
      ids: [],

      formLabelWidth: '70px',
      dialogAdd: false,
      formAdd: {},
      dialogEdit: false,
      formEdit: {},
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      return fetchUserList(this.listQuery).then(response => {
        // this.list = response.data.items
        // this.total = response.data.total
        this.list = response.data
        this.total = 100
        this.listLoading = false
      })
    },
    handleSelectionChange(data) {
      this.ids = data.map(d => d.ID)
    },

    showAdd() {
      this.formAdd = {}
      this.dialogAdd = true
    },
    add() {
      console.log('add', this.formAdd)
      createUser(this.formAdd).then(res => {
        this.$alert('添加成功')
        this.getList().then(() => {
          this.dialogAdd = false
        })
      }).catch(() => {
        this.$alert('添加失败')
      })
    },
    showEdit(id) {
      fetchUser(id).then(res => {
        const { nick } = res.data
        this.formEdit = {
          id,
          nick,
        }
        this.dialogEdit = true
      })
    },
    edit() {
      // TODO
      console.log('edit', this.formEdit.id)
    },
    delAll() {
      const ids = this.ids.join(',')
      deleteUser(ids).then(res => {
        this.getList().then(() => {
          this.$alert('删除成功')
        })
      })
    },
    del(id) {
      deleteUser(id).then(res => {
        this.getList().then(() => {
          this.$alert('删除成功')
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.avatar {
  width: 30px;
  height: 30px;
}
</style>
