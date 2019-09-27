<!--
 * @Author: Huanghao
 * @Date: 2019-09-11 16:28:04
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-11 16:28:04
 * @Description: 
 -->

<template>
  <div v-loading="loading">
    <!-- -----------------------------------------------------新增 -->
    <el-dialog
      title="用户新增"
      :visible.sync="addDialogFormVisible"
    >
      <el-form
        :model="addForm"
        :rules="addRuleForm"
        ref="addRuleForm"
        status-icon
        label-width="100px"
      >

        <el-form-item
          label="工号"
          prop="sapCode"
        >
          <el-input
            :maxlength="50"
            v-model.trim="addForm.sapCode"
            placeholder="请输入工号"
            name="admin-sapCode"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="姓名"
          prop="name"
        >
          <el-input
            :maxlength="50"
            v-model.trim="addForm.name"
            placeholder="请输入姓名"
            name="admin-name"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="角色"
          prop="roleId"
        >
          <el-input
            :maxlength="50"
            v-model.trim="addForm.roleId"
            placeholder="请输入角色"
            name="admin-roleId"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="部门"
          prop="deptId"
        >
          <el-input
            :maxlength="50"
            v-model.trim="addForm.deptId"
            placeholder="请输入部门"
            name="admin-deptId"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="班组"
          prop="groupId"
        >
          <el-input
            :maxlength="50"
            v-model.trim="addForm.groupId"
            placeholder="请输入班组"
            name="admin-groupId"
            auto-complete="off"
          ></el-input>
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
    <!-- -----------------------------------------------------修改 -->
    <el-dialog
      title="用户修改"
      :visible.sync="updateDialogFormVisible"
    >
      <el-form
        :model="updateForm"
        :rules="updateRuleForm"
        ref="updateRuleForm"
        status-icon
        label-width="100px"
      >

        <el-form-item
          label="工号"
          prop="sapCode"
        >
          <el-input
            :maxlength="50"
            v-model.trim="updateForm.sapCode"
            placeholder="请输入工号"
            name="admin-sapCode"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="姓名"
          prop="name"
        >
          <el-input
            :maxlength="50"
            v-model.trim="updateForm.name"
            placeholder="请输入姓名"
            name="admin-name"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="角色"
          prop="roleId"
        >
          <el-input
            :maxlength="50"
            v-model.trim="updateForm.roleId"
            placeholder="请输入角色"
            name="admin-roleId"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="部门"
          prop="deptId"
        >
          <el-input
            :maxlength="50"
            v-model.trim="updateForm.deptId"
            placeholder="请输入部门"
            name="admin-deptId"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="班组"
          prop="groupId"
        >
          <el-input
            :maxlength="50"
            v-model.trim="updateForm.groupId"
            placeholder="请输入班组"
            name="admin-groupId"
            auto-complete="off"
          ></el-input>
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
    <!-- -----------------------------------------------------查询 -->
    <div class="header">
      <div class="hearder-top">
        <el-button
          type="danger"
          @click="addDialogFormVisible = true;imgList= []"
          size="mini"
          :style="{'background-color':bgColor.addBt,'border-color':bgColor.addBt }"
          v-show="btPermissions['/admin/admin/add']"
        >添加</el-button>
        <i
          class="el-icon-refresh refresh fr fs20 poi"
          @click="refresh()"
        ></i>
      </div>
      <el-row
        :gutter="5"
        class="row1"
      >
        <el-col
          :span="20"
          class="col1"
        >
          <el-col :span="3">
            <el-input
              v-model.trim="searchObj.name"
              placeholder="请输入undefined"
              name="admin-name"
              auto-complete="off"
            ></el-input>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="primary"
              size="small"
              @click="search()"
              :style="{'background-color':bgColor.selectBt,'border-color':bgColor.selectBt }"
              v-show="btPermissions['/admin/admin/select']"
            >搜索</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="primary"
              size="small"
              @click="clearOut()"
              :style="{'background-color':bgColor.clearBt,'border-color':bgColor.clearBt }"
            >清除</el-button>
          </el-col>
        </el-col>
      </el-row>
      <el-row
        :gutter="5"
        class="row2"
      >
      </el-row>
    </div>
    <!-- -----------------------------------------------------表格 -->
    <div class="table">
      <el-table
        :data="adminList"
        style="width: 100%"
        border
      >
        <el-table-column
          align="center"
          prop="id"
          label="序号"
          width="60"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="sapCode"
          label="工号"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="姓名"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="roleId"
          label="角色"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="deptId"
          label="部门"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="groupId"
          label="班组"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="150"
        >
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="small"
              :style="{'background-color':bgColor.deleteBt,'border-color':bgColor.deleteBt }"
              @click="deleteAdmin(scope.row.id)"
              v-show="btPermissions['/admin/admin/delete']"
            >删除</el-button>
            <el-button
              type="danger"
              size="small"
              :style="{'background-color':bgColor.updateBt,'border-color':bgColor.updateBt }"
              @click="updateAdmin(scope.row)"
              v-show="btPermissions['/admin/admin/update']"
            >修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-on:child-say="pageNum"
        v-on:child-say2="pageShowCount"
        :totalNum="total"
      ></pagination>
    </div>
  </div>
</template>

<script>
import {
    mapState,
    mapGetters,
    mapActions
} from 'vuex'; //先要引入
import pagination from "@/components/common/pagination.vue";
export default {
    data() {
        return {
            searchObj: { //请求参数对象
                page: 1, //第几页 页码
                pageSize: 10, //页码大小,一页显示多少条
                sapCode:"", // 工号
                name:"", // 姓名
                roleId:"", // 角色
                deptId:"", // 部门
                groupId:"", // 班组
            },
            loading: true, //控制加载中显示
            adminList: [], //表格数据列表
            total: null, //一共有多少条数据
            addDialogFormVisible: false, // 添加对话框显隐
            updateDialogFormVisible: false, // 修改对话框显隐
            addForm: { 
                sapCode:"", // 工号
                name:"", // 姓名
                roleId:"", // 角色
                deptId:"", // 部门
                groupId:"", // 班组
            },
             updateForm: { 
                sapCode:"", // 工号
                name:"", // 姓名
                roleId:"", // 角色
                deptId:"", // 部门
                groupId:"", // 班组
             },
            addRuleForm: { 
          sapCode: [{
                    required: true,
                    message: "请输入工号"
                }],
          name: [{
                    required: true,
                    message: "请输入姓名"
                }],
          roleId: [{
                    required: true,
                    message: "请输入角色"
                }],
          deptId: [{
                    required: true,
                    message: "请输入部门"
                }],
          groupId: [{
                    required: true,
                    message: "请输入班组"
                }],
        },
            updateRuleForm: { 
          sapCode: [{
                    required: true,
                    message: "请输入工号"
                }],
          name: [{
                    required: true,
                    message: "请输入姓名"
                }],
          roleId: [{
                    required: true,
                    message: "请输入角色"
                }],
          deptId: [{
                    required: true,
                    message: "请输入部门"
                }],
          groupId: [{
                    required: true,
                    message: "请输入班组"
                }],
        }
        }
    },
    computed: {
        ...mapGetters('style', { //style指的是modules文件夹下的style.js模块
            bgColor: 'getBgColor', //第一个bgColor是我自定义的,第二个bgColor是对应的style.js里的getters里的getBgColor
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
        search() {
            this.searchObj.page = 1;
            this.getAdminList();
        },
        clearOut() {
            this.searchObj = {
                page: 1, //第几页 页码
                pageSize: 10, //页码大小,一页显示多少条
            }
        },
        refresh() {
            this.clearOut();
            this.getAdminList();
        },
        // 页码
        pageNum(currentSect) {
            this.searchObj.page = currentSect;
            this.getAdminList(); // 刷新列表
        },
        // 一页显示多少条
        pageShowCount(currentSect) {
            this.searchObj.pageSize = currentSect;
            this.getAdminList(); // 刷新列表
        },

        // 获取项目列表
        getAdminList() {
            let self = this;
            self.loading = true; // 显示加载中
            self.$http.post(
                    "/admin/admin/listByPage.d",
                    self.searchObj,
                    function (suc) {
                        self.adminList = suc.body.rows; // 列表数据赋值
                        self.total = suc.body.total; // 列表数据总长度
                        self.loading = false; // 隐藏加载中
                    },
                    function (err) {
                        self.$message({ // 提示失败
                            showClose: true,
                            message: err.result.msg,
                            type: "warning"
                        });
                        self.loading = false; // 隐藏加载中
                    },
                function (serverErr) {
                    self.$message({ // 提示失败
                        showClose: true,
                        message: serverErr.error + '-' + serverErr.message,
                        type: "warning"
                    });
                    self.loading = false; // 隐藏加载中
                })
        },
        //删除
        deleteAdmin(id) {
            let self = this;
            this.$confirm("确定删除吗？", "提示", { // 删除确认提示框
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(() => { // 如果确认
                    self.loading = true; // 显示加载中
                    self.$http.post(
                        "/admin/admin/delete.d", {
                            id: id
                        },
                        function (suc) {
                            self.getAdminList(); // 刷新列表
                            self.$message({
                                type: "success",
                                message: "删除成功!"
                            });
                            self.loading = false; // 隐藏加载中
                        },
                        function (err) {
                            self.$message({ // 提示失败
                                showClose: true,
                                message: err.result.msg,
                                type: "warning"
                            });
                            self.loading = false; // 隐藏加载中
                        },
                        function (serverErr) {
                            self.$message({ // 提示失败
                                showClose: true,
                                message: serverErr.error + '-' + serverErr.message,
                                type: "warning"
                            });
                            self.loading = false; // 隐藏加载中
                        }
                    );
                })
                .catch(() => {
                    this.$message({ // 提示失败
                        type: "info",
                        message: "操作异常"
                    });
                    self.loading = false; // 隐藏加载中
                });
        },
        //修改
        updateAdmin(item) {
            this.imgList = [];
            this.updateDialogFormVisible = true; // 显示修改对话框
            this.updateForm = this.$copyObj(item); // 浅拷贝选择对象
        },
        //确认新增
        commitAdd() {
            let self = this;
            this.$refs["addRuleForm"].validate(valid => { // 数据格式验证
                if (valid) { // 如果通过
                    self.loading = true; // 显示加载中
                    self.addDialogFormVisible = false; // 关闭修改对话框
                    self.$http.post(
                        "/admin/admin/add.d",
                        self.addForm,
                        function (suc) {
                            self.getAdminList(); // 刷新列表
                            self.$message({ // 提示成功
                                showClose: true,
                                message: "新增成功",
                                type: "success"
                            });
                            self.loading = false; // 隐藏加载中
                        },
                        function (err) {
                            self.$message({ // 提示失败
                                showClose: true,
                                message: err.result.msg,
                                type: "warning"
                            });
                            self.loading = false; // 隐藏加载中
                        },
                        function (serverErr) {
                            self.$message({ // 提示失败
                                showClose: true,
                                message: serverErr.error + '-' + serverErr.message,
                                type: "warning"
                            });
                            self.loading = false; // 隐藏加载中
                        }
                    );
                } else {
                    self.$message({ // 提示失败
                        showClose: true,
                        message: "输入格式非法",
                        type: "warning"
                    });
                    self.loading = false; // 显示加载中
                    return false;
                }
            });
        },

        // 确认修改
        commitUpdate() {
            let self = this;
            this.$refs["updateRuleForm"].validate(valid => { // 数据格式验证
                if (valid) { // 如果通过
                    self.loading = true; // 显示加载中
                    self.updateDialogFormVisible = false; // 关闭修改对话框'
                    self.$http.post(
                        "/admin/admin/update.d",
                        self.updateForm,
                        function (suc) {
                            self.getAdminList(); // 刷新列表
                            self.$message({ // 提示成功
                                showClose: true,
                                message: "修改成功",
                                type: "success"
                            });
                            self.loading = false; // 隐藏加载中
                        },
                        function (err) {
                            self.$message({ // 提示失败
                                showClose: true,
                                message: err.result.msg,
                                type: "warning"
                            });
                            self.loading = false; // 隐藏加载中
                        },
                        function (serverErr) {
                            self.$message({ // 提示失败
                                showClose: true,
                                message: serverErr.error + '-' + serverErr.message,
                                type: "warning"
                            });
                            self.loading = false; // 隐藏加载中
                        }
                    );
                } else {
                    self.$message({ // 提示失败
                        showClose: true,
                        message: "输入格式非法",
                        type: "warning"
                    });
                    return false;
                }
            });
        },

    },
    mounted() {
        this.$onkeydown(this.getAdminList);
        this.getAdminList();
    }
  }
< /script>

<style lang="scss" scoped>

</style>
