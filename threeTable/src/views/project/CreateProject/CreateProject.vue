<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-19 10:37:07
 * @LastEditTime: 2019-09-23 15:22:52
 * @LastEditors: Huanghao
 -->
<template>
  <div class="userManage padding1 w100 h100">
      <NoPerimission v-if="!btPermissions['/project/createProject']" />
  <template v-else>
    <!-- 创建项目 -->
    <el-dialog
      :visible.sync="addDialogFormVisible"
      title="创建项目"
    >
      <el-form
        :model="addForm"
        :rules="addRuleForm"
        ref="addRuleForm"
        status-icon
      >
        <el-form-item
          label="项目编号"
          prop="projectNumber"
        >
          <el-input
            :maxlength="50"
            auto-complete="off"
            name="admin-projectNumber"
            placeholder="请输入项目编号"
            v-model.trim="addForm.projectNumber"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="项目名称"
          prop="projectName"
        >
          <el-input
            :maxlength="50"
            auto-complete="off"
            name="admin-projectName"
            placeholder="请输入项目名称"
            v-model.trim="addForm.projectName"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="项目类型"
          prop="typeName"
        >
          <el-select
            name="admin-typeName"
            placeholder="请选择项目类型"
            v-model.trim="addForm.typeName"
          >
            <el-option
              :key="item.id"
              :label="item.dictDataName"
              :value="item.dictDataName"
              v-for="item in typeList"
              @click.native="handleAddChangeType(item)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="项目描述"
          prop="remarks"
        >
          <el-input
            :maxlength="50"
            auto-complete="off"
            name="admin-remarks"
            placeholder="请输入项目描述"
            v-model.trim="addForm.remarks"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="项目经理"
          prop="managerName"
        >
          <el-select
            :loading="selectLoading"
            :remote-method="remoteMethod"
            filterable
            placeholder="请输入项目经理姓名或工号（可模糊查询）"
            remote
            reserve-keyword
            v-model.trim="addForm.managerName"
            @focus="remoteMethodDefault"
          >
            <el-option
              :key="item.code"
              :label="item.name+'-'+item.code"
              :value="item.name"
              @click.native="addManagerCode(item)"
              v-for="item in managerList"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div
        class="dialog-footer"
        slot="footer"
      >
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button
          @click="commitAdd()"
          type="primary"
        >确定新增</el-button>
      </div>
    </el-dialog>
    <!-- -----------------------------------------------------修改 -->
    <el-dialog
      :visible.sync="updateDialogFormVisible"
      title="修改项目"
    >
      <el-form
        :model="updateForm"
        :rules="updateRuleForm"
        ref="updateRuleForm"
        status-icon
      >
        <el-form-item
          label="项目编号"
          prop="projectNumber"
        >
          <el-input
            :maxlength="50"
            auto-complete="off"
            name="admin-projectNumber"
            placeholder="请输入项目编号"
            v-model.trim="updateForm.projectNumber"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="项目名称"
          prop="projectName"
        >
          <el-input
            :maxlength="50"
            auto-complete="off"
            name="admin-projectName"
            placeholder="请输入项目名称"
            v-model.trim="updateForm.projectName"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="项目类型"
          prop="typeName"
        >
          <el-select
            name="admin-typeName"
            placeholder="请选择项目类型"
            v-model.trim="updateForm.typeName"
            
          >
            <el-option
              :key="item.id"
              :label="item.dictDataName"
              :value="item.dictDataName"
              v-for="item in typeList"
              @click.native="handleUpdateChangeType(item)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="项目描述"
          prop="remarks"
        >
          <el-input
            :maxlength="50"
            auto-complete="off"
            name="admin-remarks"
            placeholder="请输入项目描述"
            v-model.trim="updateForm.remarks"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="项目经理"
          prop="managerName"
        >
          <el-select
            :loading="selectLoading"
            :remote-method="remoteMethod"
            filterable
            placeholder="请输入项目经理姓名或工号（可模糊查询）"
            remote
            reserve-keyword
            v-model.trim="updateForm.managerName"
            @focus="remoteMethodDefault"
          >
            <el-option
              :key="item.code"
              :label="item.name+'-'+item.code"
              :value="item.name"
              @click.native="updateManagerCode(item)"
              v-for="item in managerList"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div
        class="dialog-footer"
        slot="footer"
      >
        <el-button @click="updateDialogFormVisible = false">取 消</el-button>
        <el-button
          @click="commitUpdate()"
          type="primary"
        >确定修改</el-button>
      </div>
    </el-dialog>
    <!-- -----------------------------------------------------查询 -->
    <div class="header ovh">
      <div class="hearder-top">
        <el-button
          :style="{'background-color':bgColor.addBt,'border-color':bgColor.addBt ,}"
          @click="addDialogFormVisible = true;imgList= []"
          size="mini"
          type="danger"
          class="fs_13 margin-right4"
          icon="icon-jia iconfont fs_16"
          v-show="btPermissions['/project/createProject/add']"
        >创建项目</el-button>
        <i
          @click="refresh()"
          class="el-icon-refresh refresh fr fs20 poi"
        ></i>
      </div>
    </div>
    <!-- -----------------------------------------------------表格 -->
    <div class="table w100">
      <CommonTable
        :default-sort="{prop: 'id', order: 'ascending'}"
        :tableData="adminList"
        refreshFuncName="getAdminList"
      >
        <template slot="main">
          <el-table-column
            align="center"
            label="项目编号"
            prop="projectNumber"
            width="150"
          ></el-table-column>
          <el-table-column
            align="center"
            label="项目名称"
            prop="projectName"
          ></el-table-column>
          <el-table-column
            align="center"
            label="项目类型"
            prop="typeName"
          ></el-table-column>
          <el-table-column
            align="center"
            label="部门名称"
            prop="deptName"
          ></el-table-column>
          <el-table-column
            align="center"
            label="项目经理"
            prop="managerName"
          ></el-table-column>
          <el-table-column
            align="center"
            label="项目描述"
            prop="remarks"
          ></el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="150"
          >
            <template slot-scope="scope">
              <el-button
                :style="{'background-color':bgColor.deleteBt,'border-color':bgColor.deleteBt }"
                @click="deleteAdmin(scope.row.id)"
                size="small"
                type="danger"
                v-show="btPermissions['/project/createProject/delete']"
              >删除</el-button>
              <el-button
                :style="{'background-color':bgColor.updateBt,'border-color':bgColor.updateBt }"
                @click="updateAdmin(scope.row)"
                size="small"
                type="danger"
                v-show="btPermissions['/project/createProject/update']"
              >修改</el-button>
            </template>
          </el-table-column>
        </template>
      </CommonTable>
    </div>
  </template>
  </div>
</template>

<script>
export default {
    name: "userManage",
    components: {},
    filters: {},
    props: {},
    data() {
        return {
            managerList: [],
            typeList: [],
            // departList: [],
            searchObj: {
                //请求参数对象
                page: 1, //第几页 页码
                pageSize: 10, //页码大小,一页显示多少条
                projectNumber: "", // 项目编号
                projectName: "" ,//项目名称
                //typeName: "", // 项目类型
                // type: "", // 项目类型
                // remarks: "", //项目描述
                // name: "", // 项目经理
                // deptId: "",// 部门编号
                // deptName: "" //部门名称
            },
            selectLoading: false, //项目经理选项显示
            loading: false, //控制加载中显示
            adminList: [], //表格数据列表
            org: [], //组织结构数据
            roleList: [],
            total: null, //一共有多少条数据
            addDialogFormVisible: false, // 添加对话框显隐
            updateDialogFormVisible: false, // 修改对话框显隐
            dictValue: "PROJECT_TYPE", //项目类型默认值
            departType: "1", //组织类型，部门
            addForm: {
                projectNumber: "", // 项目编号
                typeName: "", // 项目类型
                type: "", // 项目类型
                projectName: "", //项目名称
                projectDescribe: "", //项目描述
                managerCode: "", //项目经理编号
                managerName: "", //项目经理姓名
                deptId: "", // 部门编号
                deptName: "", //部门名称
                remarks: "" //项目描述
            },
            updateForm: {
                projectNumber: "", // 项目编号
                typeName: "", // 项目类型
                type: "", // 项目类型
                projectName: "", //项目名称
                projectDescribe: "", //项目描述
                managerCode: "", //项目经理编号
                managerName: "", //项目经理姓名
                deptId: "", // 部门编号
                deptName: "", //部门名称
                remarks: "" //项目描述
            },
            addRuleForm: {
                projectNumber: [{
                    required: true,
                    message: "请输入项目编号"
                }],
                projectName: [{
                    required: true,
                    message: "请输入项目名称"
                }],
                projectDescribe: [{
                    required: true,
                    message: "请输入项目名称"
                }],
                typeName: [{
                    required: true,
                    message: "请输入项目类型"
                }],
                deptId: [{
                    required: true,
                    message: "请输入部门"
                }],
                managerName: [{
                    required: true,
                    message: "请输入项目经理"
                }]
            },
            updateRuleForm: {
                projectNumber: [{
                    required: true,
                    message: "请输入项目编号"
                }],
                projectName: [{
                    required: true,
                    message: "请输入项目名称"
                }],
                projectDescribe: [{
                    required: true,
                    message: "请输入项目名称"
                }],
                typeName: [{
                    required: true,
                    message: "请输入项目类型"
                }],
                deptId: [{
                    required: true,
                    message: "请输入部门"
                }],
                managerName: [{
                    required: true,
                    message: "请输入项目经理"
                }]
            }
        };
    },
    computed: {},
    watch: {},
    async created() {
        this.getAdminList();
        this.roleList = await this.$api.common.getRole();
        this.getAllList();
    },
    methods: {
        async remoteMethod(query) {
            if (query !== "") {
                this.selectLoading = true;
                this.managerList = await this.$api.common.getNativeUser({
                    name: query
                });
                this.selectLoading = false;
            } else {
                this.managerList = [];
            }
        },
        async remoteMethodDefault() {
            this.selectLoading = true;
            this.managerList = await this.$api.common.getNativeUser();
            console.log('this.managerList');
            console.log(this.managerList);
            this.selectLoading = false;
        },
        clearOut() {
            this.searchObj = {
                page: 1, //第几页 页码
                pageSize: 15 //页码大小,一页显示多少条
            };
        },
        refresh() {
            this.clearOut();
            this.getAdminList();
        },
        addManagerCode(item) {
            this.addForm.managerCode = item.code;
            this.addForm.deptId = item.deptId;
            this.addForm.deptName = item.deptName;
        },
        updateManagerCode(item) {
            this.updateForm.managerCode = item.code;
            this.updateForm.deptId = item.deptId;
            this.updateForm.deptName = item.deptName;
        },
        // 获取项目列表
        getAdminList() {
            let self = this;
            self.loading = true; // 显示加载中
            self.$http.post(
                "/admin/tfProject/listByPage.d",
                self.searchObj,
                function (suc) {
                    self.adminList = suc.body.rows; // 列表数据赋值
                    self.total = suc.body.total; // 列表数据总长度
                    self.loading = false; // 隐藏加载中
                    console.log('self.adminList');
                    console.log(self.adminList);
                },
                function (err) {
                    self.$message({
                        // 提示失败
                        showClose: true,
                        message: err.result.msg,
                        type: "warning"
                    });
                    self.loading = false; // 隐藏加载中
                },
                function (serverErr) {
                    self.$message({
                        // 提示失败
                        showClose: true,
                        message: serverErr.error + "-" + serverErr.message,
                        type: "warning"
                    });
                    self.loading = false; // 隐藏加载中
                }
            );
        },
        //删除
        deleteAdmin(id) {
            let self = this;
            this.$confirm("确定删除吗？", "提示", {
                    // 删除确认提示框
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(() => {
                    // 如果确认
                    self.loading = true; // 显示加载中
                    self.$http.post(
                        "/admin/tfProject/delete.d", {
                            id: id
                        },
                        function (suc) {
                            self.getAdminList(); // 刷新列表
                            self.$message({
                                showClose: true,
                                type: "success",
                                message: "删除成功!"
                            });
                            self.loading = false; // 隐藏加载中
                        },
                        function (err) {
                            self.$message({
                                // 提示失败
                                showClose: true,
                                message: err.result.msg,
                                type: "warning"
                            });
                            self.loading = false; // 隐藏加载中
                        },
                        function (serverErr) {
                            self.$message({
                                // 提示失败
                                showClose: true,
                                message: serverErr.error + "-" + serverErr.message,
                                type: "warning"
                            });
                            self.loading = false; // 隐藏加载中
                        }
                    );
                })
                .catch(() => {
                    this.$message({
                        // 提示失败
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
            this.$refs["addRuleForm"].validate(valid => {
                // 数据格式验证
                if (valid) {
                    // 如果通过
                    self.loading = true; // 显示加载中
                    self.addDialogFormVisible = false; // 关闭修改对话框
                    console.log(self.addForm);
                    console.log(self.addForm);
                    self.$http.post(
                        "/admin/tfProject/add.d",
                        self.addForm,
                        function (suc) {
                            self.getAdminList(); // 刷新列表
                            self.$message({
                                // 提示成功
                                showClose: true,
                                message: "新增成功",
                                type: "success"
                            });
                            self.loading = false; // 隐藏加载中
                        },
                        function (err) {
                            self.$message({
                                // 提示失败
                                showClose: true,
                                message: err.result.msg,
                                type: "warning"
                            });
                            self.loading = false; // 隐藏加载中
                        },
                        function (serverErr) {
                            self.$message({
                                // 提示失败
                                showClose: true,
                                message: serverErr.error + "-" + serverErr.message,
                                type: "warning"
                            });
                            self.loading = false; // 隐藏加载中
                        }
                    );
                } else {
                    self.$message({
                        // 提示失败
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
            console.log("self.updateForm");
            console.log(self.updateForm);
            this.$refs["updateRuleForm"].validate(valid => {
                // 数据格式验证
                if (valid) {
                    // 如果通过
                    self.loading = true; // 显示加载中
                    self.updateDialogFormVisible = false; // 关闭修改对话框'
                    self.$http.post(
                        "/admin/tfProject/update.d",
                        self.updateForm,
                        function (suc) {
                            self.getAdminList(); // 刷新列表
                            self.$message({
                                // 提示成功
                                showClose: true,
                                message: "修改成功",
                                type: "success"
                            });
                            self.loading = false; // 隐藏加载中
                        },
                        function (err) {
                            self.$message({
                                // 提示失败
                                showClose: true,
                                message: err.result.msg,
                                type: "warning"
                            });
                            self.loading = false; // 隐藏加载中
                        },
                        function (serverErr) {
                            self.$message({
                                // 提示失败
                                showClose: true,
                                message: serverErr.error + "-" + serverErr.message,
                                type: "warning"
                            });
                            self.loading = false; // 隐藏加载中
                        }
                    );
                } else {
                    self.$message({
                        // 提示失败
                        showClose: true,
                        message: "输入格式非法",
                        type: "warning"
                    });
                    return false;
                }
            });
        },
        async getAllList() {
            let self = this;
            self.loading = true; // 显示加载中
            self.typeList = await this.$api.common.getDictionary({
                parentDictValue: self.dictValue
            });
        },
        handleAddChangeType(item){
          this.addForm.type = item.dictValue;
        },
        handleUpdateChangeType(item){
          this.updateForm.type = item.dictValue;
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
