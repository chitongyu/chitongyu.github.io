
<template>
  <div v-loading="loading">
    <!-- -----------------------------------------------------新增 -->
    <el-dialog title="部门人员情况新增"
               :visible.sync="addDialogFormVisible">
      <el-form :model="addForm"
               :rules="addRuleForm"
               ref="addRuleForm"
               status-icon
               label-width="100px">

        <el-form-item label="年份"
                      prop="year">
          <el-date-picker v-model.trim="addForm.year"
                          name="scienceTechUser-year"
                          type="year"
                          value-format="yyyy"
                          placeholder="请选择年份"></el-date-picker>
        </el-form-item>
        <el-form-item label="周数"
                      prop="week">
          <el-select :span="4"
                     v-model.trim="addForm.week"
                     filterable
                     clearable
                     placeholder="请选择周数">
            <el-option :label="num"
                       :value="num"
                       v-for="num in 53"
                       :key="num">第{{num}}周</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门人数"
                      prop="userNum">
          <el-input v-model.trim="addForm.userNum"
                    type="Number"
                    placeholder="请输入部门人数"
                    name="scienceTechUser-userNum"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="入职人数"
                      prop="entryNum">
          <el-input v-model.trim="addForm.entryNum"
                    type="Number"
                    placeholder="请输入入职人数"
                    name="scienceTechUser-entryNum"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="离职人数"
                      prop="dimissionNum">
          <el-input v-model.trim="addForm.dimissionNum"
                    type="Number"
                    placeholder="请输入离职人数"
                    name="scienceTechUser-dimissionNum"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="缺少岗位数"
                      prop="missJobNum">
          <el-input v-model.trim="addForm.missJobNum"
                    type="Number"
                    placeholder="请输入缺少岗位数"
                    name="scienceTechUser-missJobNum"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="缺少的岗位"
                      prop="missJob">
          <el-input v-model.trim="addForm.missJob"
                    type="textarea"
                    :autosize="{ minRows: 5, maxRows: 5}"
                    placeholder="请输入缺少的岗位详情"
                    name="scienceTechUser-missJob"
                    auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="加班工时"
                      prop="overWorkTime">
          <el-input v-model.trim="addForm.overWorkTime"
                    type="Number"
                    placeholder="请输入加班工时"
                    name="scienceTechUser-overWorkTime"
                    auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="commitAdd()">确定新增</el-button>
      </div>
    </el-dialog>
    <!-- -----------------------------------------------------修改 -->
    <el-dialog title="部门人员情况修改"
               :visible.sync="updateDialogFormVisible">
      <el-form :model="updateForm"
               :rules="updateRuleForm"
               ref="updateRuleForm"
               status-icon
               label-width="100px">

        <el-form-item label="年份"
                      prop="year">
          <el-date-picker v-model.trim="updateForm.year"
                          name="scienceTechUser-year"
                          type="year"
                          value-format="yyyy"
                          placeholder="请选择年份"></el-date-picker>
        </el-form-item>
        <el-form-item label="周数"
                      prop="week">
          <el-select :span="4"
                     v-model.trim="updateForm.week"
                     filterable
                     clearable
                     placeholder="请选择周数">
            <el-option :label="num"
                       :value="num"
                       v-for="num in 53"
                       :key="num">第{{num}}周</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门人数"
                      prop="userNum">
          <el-input v-model.trim="updateForm.userNum"
                    type="Number"
                    placeholder="请输入部门人数"
                    name="scienceTechUser-userNum"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="入职人数"
                      prop="entryNum">
          <el-input v-model.trim="updateForm.entryNum"
                    type="Number"
                    placeholder="请输入入职人数"
                    name="scienceTechUser-entryNum"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="离职人数"
                      prop="dimissionNum">
          <el-input v-model.trim="updateForm.dimissionNum"
                    type="Number"
                    placeholder="请输入离职人数"
                    name="scienceTechUser-dimissionNum"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="缺少岗位数"
                      prop="missJobNum">
          <el-input v-model.trim="updateForm.missJobNum"
                    type="Number"
                    placeholder="请输入缺少岗位数"
                    name="scienceTechUser-missJobNum"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="缺少的岗位" prop="missJob">
          <el-input v-model.trim="updateForm.missJob"
                    type="textarea"
                    :autosize="{ minRows: 5, maxRows: 5}"
                    placeholder="请输入缺少的岗位详情"
                    name="scienceTechUser-missJob"
                    auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="加班工时"
                      prop="overWorkTime">
          <el-input v-model.trim="updateForm.overWorkTime"
                    type="Number"
                    placeholder="请输入加班工时"
                    name="scienceTechUser-overWorkTime"
                    auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="updateDialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="commitUpdate()">确定修改</el-button>
      </div>
    </el-dialog>
    <!-- -----------------------------------------------------查询 -->
    <div class="header">
      <div class="hearder-top">
        <el-button type="danger"
                   @click="addDialogFormVisible = true;imgList= []"
                   size="mini"
                   :style="{'background-color':bgColor.addBt,'border-color':bgColor.addBt }"
                   v-show="btPermissions['/scienceDepart/scienceTechUser/add']">添加</el-button>
        <i class="el-icon-refresh refresh fr fs20 poi"
           @click="refresh()"></i>
      </div>
      <el-row :gutter="5"
              class="row1">
        <el-col :span="20"
                class="col1">

          <el-col :span="3">
            <el-date-picker v-model.trim="searchObj.year"
                            name="scienceTechUser-year"
                            type="year"
                            value-format="yyyy"
                            placeholder="请选择年份"></el-date-picker>
          </el-col>
          <el-col :span="3">
            <el-input :maxlength="50"
                      size="small"
                      v-model.trim="searchObj.week"
                      name="scienceTechUser-week"
                      auto-complete="on"
                      placeholder="周数"></el-input>
          </el-col>
          <el-col :span="1.5">
            <el-button type="primary"
                       size="small"
                       @click="search()"
                       :style="{'background-color':bgColor.selectBt,'border-color':bgColor.selectBt }"
                       v-show="btPermissions['/scienceDepart/scienceTechUser/select']">搜索</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="primary"
                       size="small"
                       @click="clearOut()"
                       :style="{'background-color':bgColor.clearBt,'border-color':bgColor.clearBt }">清除</el-button>
          </el-col>
        </el-col>
      </el-row>
      <el-row :gutter="5"
              class="row2">
      </el-row>
    </div>
    <!-- -----------------------------------------------------表格 -->
    <div class="table">
      <el-table :data="scienceTechUserList"
                style="width: 100%"
                border>
        <el-table-column align="center"
                         prop="id"
                         label="序号"
                         width="60">
        </el-table-column>
        <el-table-column align="center"
                         prop="year"
                         label="年份">
        </el-table-column>
        <el-table-column align="center"
                         prop="week"
                         label="周数">
        </el-table-column>
        <el-table-column align="center"
                         prop="userNum"
                         label="部门人数">
        </el-table-column>
        <el-table-column align="center"
                         prop="entryNum"
                         label="入职人数">
        </el-table-column>
        <el-table-column align="center"
                         prop="dimissionNum"
                         label="离职人数">
        </el-table-column>
        <el-table-column align="center"
                         prop="missJob"
                         label="缺少的岗位"
                         width="250">
        </el-table-column>
        <el-table-column align="center"
                         prop="missJobNum"
                         label="缺少岗位数">
        </el-table-column>
        <el-table-column align="center"
                         prop="overWorkTime"
                         label="加班工时">
        </el-table-column>
        <el-table-column align="center"
                         label="操作"
                         width="150">
          <template slot-scope="scope">
            <el-button type="danger"
                       size="small"
                       :style="{'background-color':bgColor.deleteBt,'border-color':bgColor.deleteBt }"
                       @click="deletescienceTechUser(scope.row.id)"
                       v-show="btPermissions['/scienceDepart/scienceTechUser/delete']">删除</el-button>
            <el-button type="danger"
                       size="small"
                       :style="{'background-color':bgColor.updateBt,'border-color':bgColor.updateBt }"
                       @click="updatescienceTechUser(scope.row)"
                       v-show="btPermissions['/scienceDepart/scienceTechUser/update']">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-on:child-say="pageNum"
                  v-on:child-say2="pageShowCount"
                  :totalNum="total"></pagination>
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions
} from 'vuex' // 先要引入
import pagination from '@/components/common/pagination.vue'
export default {
  data () {
    return {
      searchObj: { // 请求参数对象
        page: 1, // 第几页 页码
        pageSize: 10, // 页码大小,一页显示多少条
        year: '', // 年份
        week: '', // 周数
        userNum: '', // 部门人数
        entryNum: '', // 入职人数
        dimissionNum: '', // 离职人数
        missJob: '', // 缺少的岗位
        missJobNum: '', // 缺少岗位数
        overWorkTime: '' // 加班工时
      },
      loading: true, // 控制加载中显示
      scienceTechUserList: [], // 表格数据列表
      total: null, // 一共有多少条数据
      addDialogFormVisible: false, // 添加对话框显隐
      updateDialogFormVisible: false, // 修改对话框显隐
      addForm: {
        year: '', // 年份
        week: '', // 周数
        userNum: '', // 部门人数
        entryNum: '', // 入职人数
        dimissionNum: '', // 离职人数
        missJob: '', // 缺少的岗位
        missJobNum: '', // 缺少岗位数
        overWorkTime: '' // 加班工时
      },
      updateForm: {
        year: '', // 年份
        week: '', // 周数
        userNum: '', // 部门人数
        entryNum: '', // 入职人数
        dimissionNum: '', // 离职人数
        missJob: '', // 缺少的岗位
        missJobNum: '', // 缺少岗位数
        overWorkTime: '' // 加班工时
      },
      addRuleForm: {
        year: [{
          required: true,
          message: '请输入年份'
        }],
        week: [{
          required: true,
          message: '请输入周数'
        }],
        userNum: [{
          required: true,
          message: '请输入部门人数'
        }],
        entryNum: [{
          required: true,
          message: '请输入入职人数'
        }],
        dimissionNum: [{
          required: true,
          message: '请输入离职人数'
        }],
        missJobNum: [{
          required: true,
          message: '请输入缺少岗位数'
        }],
        missJob: [{
          required: true,
          message: '请输入缺少岗位'
        }],
        overWorkTime: [{
          required: true,
          message: '请输入加班工时'
        }]
      },
      updateRuleForm: {
        year: [{
          required: true,
          message: '请输入年份'
        }],
        week: [{
          required: true,
          message: '请输入周数'
        }],
        userNum: [{
          required: true,
          message: '请输入部门人数'
        }],
        entryNum: [{
          required: true,
          message: '请输入入职人数'
        }],
        dimissionNum: [{
          required: true,
          message: '请输入离职人数'
        }],
        missJob: [{
          required: true,
          message: '请输入缺少的岗位'
        }],
        missJobNum: [{
          required: true,
          message: '请输入缺少岗位数'
        }],
        overWorkTime: [{
          required: true,
          message: '请输入加班工时'
        }]
      }
    }
  },
  computed: {
    ...mapGetters('style', { // style指的是modules文件夹下的style.js模块
      bgColor: 'getBgColor' // 第一个bgColor是我自定义的,第二个bgColor是对应的style.js里的getters里的getBgColor
    }),
    ...mapGetters('adminMsg', {
      btPermissions: 'getBtPermissions',
      token: 'getToken'
    }),
    ...mapGetters('dictionary', {})
  },
  watch: {

  },
  components: {
    pagination
  },
  methods: {
    // 搜索
    search () {
      this.searchObj.page = 1
      this.getscienceTechUserList()
    },
    clearOut () {
      this.searchObj = {
        page: 1, // 第几页 页码
        pageSize: 10 // 页码大小,一页显示多少条
      }
    },
    refresh () {
      this.clearOut()
      this.getscienceTechUserList()
    },
    // 页码
    pageNum (currentSect) {
      this.searchObj.page = currentSect
      this.getscienceTechUserList() // 刷新列表
    },
    // 一页显示多少条
    pageShowCount (currentSect) {
      this.searchObj.pageSize = currentSect
      this.getscienceTechUserList() // 刷新列表
    },

    // 获取项目列表
    getscienceTechUserList () {
      let self = this
      self.loading = true // 显示加载中
      self.$http.post(
        '/admin/scienceTechUser/listByPage.d',
        self.searchObj,
        function (suc) {
          self.scienceTechUserList = suc.body.rows // 列表数据赋值
          self.total = suc.body.total // 列表数据总长度
          self.loading = false // 隐藏加载中
        },
        function (err) {
          self.$message({ // 提示失败
            showClose: true,
            message: err.result.msg,
            type: 'warning'
          })
          self.loading = false // 隐藏加载中
        },
        function (serverErr) {
          self.$message({ // 提示失败
            showClose: true,
            message: serverErr.error + '-' + serverErr.message,
            type: 'warning'
          })
          self.loading = false // 隐藏加载中
        })
    },
    // 删除
    deletescienceTechUser (id) {
      let self = this
      this.$confirm('确定删除吗？', '提示', { // 删除确认提示框
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => { // 如果确认
          self.loading = true // 显示加载中
          self.$http.post(
            '/admin/scienceTechUser/delete.d', {
              id: id
            },
            function (suc) {
              self.getscienceTechUserList() // 刷新列表
              self.$message({
                type: 'success',
                message: '删除成功!'
              })
              self.loading = false // 隐藏加载中
            },
            function (err) {
              self.$message({ // 提示失败
                showClose: true,
                message: err.result.msg,
                type: 'warning'
              })
              self.loading = false // 隐藏加载中
            },
            function (serverErr) {
              self.$message({ // 提示失败
                showClose: true,
                message: serverErr.error + '-' + serverErr.message,
                type: 'warning'
              })
              self.loading = false // 隐藏加载中
            }
          )
        })
        .catch(() => {
          this.$message({ // 提示失败
            type: 'info',
            message: '操作异常'
          })
          self.loading = false // 隐藏加载中
        })
    },
    // 修改
    updatescienceTechUser (item) {
      this.imgList = []
      this.updateDialogFormVisible = true // 显示修改对话框
      this.updateForm = this.$copyObj(item) // 浅拷贝选择对象
    },
    // 确认新增
    commitAdd () {
      let self = this
      this.$refs['addRuleForm'].validate(valid => { // 数据格式验证
        if (valid) { // 如果通过
          self.loading = true // 显示加载中
          self.addDialogFormVisible = false // 关闭修改对话框
          self.$http.post(
            '/admin/scienceTechUser/add.d',
            self.addForm,
            function (suc) {
              self.getscienceTechUserList() // 刷新列表
              self.$message({ // 提示成功
                showClose: true,
                message: '新增成功',
                type: 'success'
              })
              self.loading = false // 隐藏加载中
            },
            function (err) {
              self.$message({ // 提示失败
                showClose: true,
                message: err.result.msg,
                type: 'warning'
              })
              self.loading = false // 隐藏加载中
            },
            function (serverErr) {
              self.$message({ // 提示失败
                showClose: true,
                message: serverErr.error + '-' + serverErr.message,
                type: 'warning'
              })
              self.loading = false // 隐藏加载中
            }
          )
        } else {
          self.$message({ // 提示失败
            showClose: true,
            message: '输入格式非法',
            type: 'warning'
          })
          self.loading = false // 显示加载中
          return false
        }
      })
    },
    // 确认修改
    commitUpdate () {
      let self = this
      this.$refs['updateRuleForm'].validate(valid => { // 数据格式验证
        if (valid) { // 如果通过
          self.loading = true // 显示加载中
          self.updateDialogFormVisible = false // 关闭修改对话框'
          self.$http.post(
            '/admin/scienceTechUser/update.d',
            self.updateForm,
            function (suc) {
              self.getscienceTechUserList() // 刷新列表
              self.$message({ // 提示成功
                showClose: true,
                message: '修改成功',
                type: 'success'
              })
              self.loading = false // 隐藏加载中
            },
            function (err) {
              self.$message({ // 提示失败
                showClose: true,
                message: err.result.msg,
                type: 'warning'
              })
              self.loading = false // 隐藏加载中
            },
            function (serverErr) {
              self.$message({ // 提示失败
                showClose: true,
                message: serverErr.error + '-' + serverErr.message,
                type: 'warning'
              })
              self.loading = false // 隐藏加载中
            }
          )
        } else {
          self.$message({ // 提示失败
            showClose: true,
            message: '输入格式非法',
            type: 'warning'
          })
          return false
        }
      })
    }

  },
  mounted () {
    this.$onkeydown(this.getscienceTechUserList)
    this.getscienceTechUserList()
  }
}
</script>

<style lang="scss" scoped>
</style>
