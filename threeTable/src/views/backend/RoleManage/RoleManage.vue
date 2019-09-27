<!--
 * @Author: Huanghao
 * @Date: 2019-03-12 10:33:24
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-23 15:03:11
 * @Description:
 -->
<template>
  <div
    class="roleManage padding1 w100 h100"
    v-loading="loading"
  >
   <NoPerimission v-if="!btPermissions['/backend/roleManage']" />
  <template v-else>
    <el-dialog
      title="角色新增"
      :visible.sync="addDialogFormVisible"
    >
      <el-form
        :model="addRuleForm"
        :rules="addRuleForm"
        ref="addRuleForm"
        status-icon
        label-width="100px"
      >
        <el-form-item
          label="角色名"
          prop="name"
        >
          <el-input
            v-model.trim="addForm.name"
            name="roleName"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="角色类型"
          prop="type"
        >
          <el-select
            :span="4"
            v-model.trim="addForm.type"
            filterable
            clearable
            placeholder="选择角色类型"
          >
            <el-option
              label="系统管理"
              value="1"
            >系统管理</el-option>
            <el-option
              label="项目结构"
              value="2"
            >项目结构</el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="commitAdd()"
        >确定新增</el-button>
      </div>
    </el-dialog>
    <!-- -----------------------------------------------------分界线 -->

    <el-dialog
      title="角色修改"
      :visible.sync="updateDialogFormVisible"
    >
      <el-form
        :model="updateRuleForm"
        :rules="updateRuleForm"
        ref="updateRuleForm"
        status-icon
        label-width="100px"
      >
        <el-form-item
          label="新角色名称"
          prop="name"
        >
          <el-input
            v-model.trim="updateForm.name"
            name="roleName"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="角色类型"
          prop="type"
        >
          <el-select
            :span="4"
            v-model.trim="updateForm.type"
            filterable
            clearable
            placeholder="选择角色类型"
          >
            <el-option
              label="系统管理"
              value="1"
            >系统管理</el-option>
            <el-option
              label="项目结构"
              value="2"
            >项目结构</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="updateDialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="commitUpdate()"
        >确定修改</el-button>
      </div>
    </el-dialog>
    <!-- -----------------------------------------------------分界线 -->
    <div class="role">
      <el-dialog
        title="权限设置"
        :visible.sync="PermissionDialogFormVisible"
      >
        <el-tree
          show-checkbox
          :data="permissionList"
          node-key="id"
          ref="tree"
          @check="checkOne"
          default-expand-all
        >
        </el-tree>
      </el-dialog>
    </div>
    <!-- -----------------------------------------------------分界线 -->
    <div class="header ovh">
      <div class="hearder-top">
        <el-button
          type="danger"
          @click="addDialogFormVisible = true;addForm.parentId= 0"
          size="mini"
          :style="{'background-color':bgColor.addBt,'border-color':bgColor.addBt }"
          v-show="btPermissions['/backend/roleManage/add']"
        >添加</el-button>
        <i
          class="el-icon-refresh refresh fr fs20 poi"
          @click="refresh()"
        ></i>
      </div>
    </div>

    <div class="table">

      <CommonTable
       
        :tableData="roleList"
        refreshFuncName="getRoleList"
        :default-sort="{prop: 'id', order: 'ascending'}"
      >
        <template slot="main">
          <el-table-column
            align="center"
            prop="id"
            label="id"
            width="100"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="角色名"
          ></el-table-column>
          <el-table-column
            align="center"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button

                type="danger"
                @click="addRole(scope.row)"
                size="mini"
                :style="{'background-color':bgColor.addBt,'border-color':bgColor.addBt }"
                v-show="false&&btPermissions['/backend/roleManage/add']"
              >添加子角色</el-button>
              <el-button
                type="danger"
                size="small"
                :style="{'background-color':bgColor.updateBt,'border-color':bgColor.updateBt }"
                @click="updateRole(scope.row)"
                v-show="btPermissions['/backend/roleManage/update']"
              >修改角色</el-button>
              <el-button
                type="danger"
                size="small"
                :style="{'background-color':bgColor.deleteBt,'border-color':bgColor.deleteBt }"
                @click="deleteRole(scope.row.id)"
                v-show="btPermissions['/backend/roleManage/delete']"
              >删除</el-button>
              
              <el-button
                type="danger"
                size="small"
                :style="{'background-color':bgColor.redBt,'border-color':bgColor.redBt }"
                @click="updatePermission(scope.row.id)"
                v-show="btPermissions['/backend/roleManage/update']"
              >权限设置</el-button>
            </template>
          </el-table-column>
        </template>
      </CommonTable>

    </div>
  </template>
  </div>
</template>

<script>
import {
    mapState,
    mapGetters,
    mapActions
} from 'vuex' // 先要引入
export default {
    data() {
        return {
            searchObj: { // 请求参数对象
                page: 1, // 第几页 页码
                pageSize: 10 // 页码大小,一页显示多少条
            },
            roleId: '', // 角色id
            loading: true, // 控制加载中显示
            roleList: [], // 表格数据列表
            permissionList: [], // 权限list
            rolePerimissions: '', // 角色权限list
            total: null, // 一共有多少条数据
            addDialogFormVisible: false, // 添加对话框显隐
            updateDialogFormVisible: false, // 修改对话框显隐
            PermissionDialogFormVisible: false, // 权限对话框显隐
            addForm: { // 添加表单
                name: '',
                parentId: 0,
                type: '1'
            },
            updateForm: { // 修改表单
                name: '',
                parentId: '',
                id: '',
                type: ''
            },
            addRuleForm: { // 添加表单数据验证
                name: [{
                    required: true,
                    message: '请输入角色名'
                }],
                type: [{
                    required: true,
                    message: '请选择类型'
                }],
            },
            updateRuleForm: { // 修改表单数据验证
                name: [{
                    required: true,
                    message: '请输入角色名'
                }],
                type: [{
                    required: true,
                    message: '请选择类型'
                }],
            }
        }
    },
    computed: {},
    watch: {

    },
    components: {

    },
    methods: {
        // 搜索
        search() {
            this.searchObj.page = 1
            this.getRoleList()
        },
        clearOut() {
            this.searchObj = {
                page: 1, // 第几页 页码
                pageSize: 10 // 页码大小,一页显示多少条
            }
        },
        refresh() {
            this.clearOut()
            this.getRoleList()
        },
        // 获取角色列表
        getRoleList() {
            let self = this
            self.loading = true // 显示加载中
            self.$http.post(
                '/admin/role/list.d',
                self.searchObj,
                function (suc) {
                    self.roleList = suc.body.rows // 列表数据赋值
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
                })
        },
        // 页码
        pageNum(currentSect) {
            this.searchObj.page = currentSect
            this.getRoleList() // 刷新列表
        },
        // 一页显示多少条
        pageShowCount(currentSect) {
            this.searchObj.pageSize = currentSect
            this.getRoleList() // 刷新列表
        },
        addRole(item) {
            this.addForm.parentId = item.id
            this.addDialogFormVisible = true
        },
        // 删除
        deleteRole(id) {
            let self = this
            this.$confirm('确定删除吗？', '提示', { // 删除确认提示框
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => { // 如果确认
                    self.loading = true // 显示加载中
                    self.$http.post(
                        '/admin/role/delete.d', {
                            id: id
                        },
                        function (suc) {
                            self.getRoleList() // 刷新列表
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
        updateRole(item) {
            this.updateDialogFormVisible = true // 显示修改对话框
            this.updateForm = this.$copyObj(item); // 浅拷贝选择对象
            // 浅拷贝选择对象
        },
        // 确认新增
        commitAdd() {
            let self = this
            this.$refs['addRuleForm'].validate(valid => { // 数据格式验证
                if (valid) { // 如果通过
                    self.loading = true // 显示加载中
                    self.addDialogFormVisible = false // 关闭修改对话框

                    self.$http.post(
                        '/admin/role/add.d',
                        self.addForm,
                        function (suc) {
                            self.getRoleList() // 刷新列表
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
        },
        // 确认修改
        commitUpdate() {
            let self = this
            this.$refs['updateRuleForm'].validate(valid => { // 数据格式验证
                if (valid) { // 如果通过
                    self.loading = true // 显示加载中
                    self.updateDialogFormVisible = false // 关闭修改对话框
                    self.$filterUpdate(self.updateForm) 
                    self.$http.post(
                        '/admin/role/update.d',
                        self.updateForm,
                        function (suc) {
                            self.getRoleList() // 刷新列表
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
        },
        updatePermission(roleId) {
            let self = this
            self.roleId = roleId
            let permissionJson = ''
            self.$http.post(
                '/admin/permission/list.d', {},
                function (suc) {
                    self.permissionList = suc.body.rows
                    self.permissionList = self.setData(self.permissionList)
                    self.$http.post(
                        '/admin/rolePermission/listByRoleId.d', {
                            roleId: roleId
                        },
                        function (suc) {
                            permissionJson = suc.body.rows
                            self.PermissionDialogFormVisible = true
                            if (permissionJson == null) {
                                permissionJson = {}
                            }
                            let topArray = self.getTopNode(permissionJson)
                            self.$nextTick(function () {
                                self.$refs.tree.setCheckedNodes(topArray)
                            })
                        },
                        function (err) {
                            self.$message({
                                showClose: true,
                                message: err.result.msg,
                                type: 'warning'
                            })
                        }
                    )
                },
                function (err) {
                    self.$message({
                        showClose: true,
                        message: err.result.msg,
                        type: 'warning'
                    })
                }
            )
        },
        checkOne(data, node) {
            let self = this
            let url = ''
            let tip = ''
            let ifChange = '' // 如失败，恢复原勾选标识
            if (node.checkedKeys.indexOf(data.id) >= 0) {
                ifChange = false
            } else {
                ifChange = true
            }
            if (node.checkedKeys.indexOf(data.id) >= 0) {
                url = '/admin/rolePermission/add.d'
                tip = '添加成功'
            } else if (node.checkedKeys.indexOf(data.id) < 0) {
                url = '/admin/rolePermission/delete.d'
                tip = '删除成功'
            } else {
                self.$message({
                    showClose: true,
                    message: '您没有权限',
                    type: 'warning'
                })
                self.$refs.tree.setChecked(data.id, ifChange, true)
            }
            /*       if (node.checkedKeys.indexOf(data.id) >= 0) {

                          url = "/admin/rolePermission/add.d";
                          tip="添加成功";
                          ifChange=false;
                        } else {
                        url = "/admin/rolePermission/delete.d";
                        tip="删除成功"
                        ifChange=true;
                        } */
            if (url != '') {
                self.$http.post(
                    url, {
                        permissionId: data.id,
                        roleId: self.roleId
                    },
                    function (suc) {
                        self.$message({
                            showClose: true,
                            message: tip,
                            type: 'success'
                        })
                    },
                    function (err) {
                        self.$nextTick(function () {
                            self.$refs.tree.setChecked(data.id, ifChange, true)
                        })

                        self.$message({
                            showClose: true,
                            message: err.result.msg,
                            type: 'warning'
                        })
                    }
                )
            }
        },
        setData(permissionTree) {
            let self = this
            let perList = permissionTree // 获取权限树
            let dataList = []
            // 遍历树
            function readTree(tempData, tempPermissions) {
                let length = tempPermissions.length
                for (let index = 0; index < length; index++) {
                    let a = {
                        id: '',
                        label: '',
                        children: []
                    }
                    a.id = tempPermissions[index].id
                    a.label = tempPermissions[index].name
                    tempData.push(a)
                    if (tempPermissions[index].children.length != 0) {
                        readTree(
                            tempData[index].children,
                            tempPermissions[index].children
                        )
                    }
                }
            }
            readTree(dataList, perList)
            return dataList
        }, // 将后台返回设置权限格式为{id:1;lable:啦啦;children:[]}
        getTopNode(permissionoJson) {
            let a = []

            function readTop(permissionoJson) {
                let length = permissionoJson.length
                for (let index = 0; index < length; index++) {
                    if (permissionoJson[index].rolePermissions.length == 0) {
                        if (permissionoJson[index].ifSelect == 1) {
                            a.push({
                                id: permissionoJson[index].id
                            })
                        }
                    } else {
                        readTop(permissionoJson[index].rolePermissions)
                    }
                }
            }
            readTop(permissionoJson)
            return a
        }, // 获取树的叶子节点数组
        change(data, a, b) {
            let self = this
            this.$confirm('确定删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    self.$http.post(
                        '/admin/rolePermission/delete.d', {
                            permissionId: data.id,
                            roleId: self.roleId
                        },
                        function (suc) {
                            self.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                            self.updatePermission(1)
                        },
                        function (err) {
                            self.$message({
                                showClose: true,
                                message: err.result.msg,
                                type: 'warning'
                            })
                        }
                    )
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
        }
    },
    mounted() {
        this.getRoleList()
    }
}
</script>

<style lang="scss" scoped>
.el-tree {
  border-bottom: 0px solid #d1dbe5;
}
</style>
