<!--
 * @Author: Huanghao
 * @Date: 2019-09-11 09:17:18
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-20 08:50:39
 * @Description: 
 -->

<template>
  <div
    v-loading="loading"
     class="orgManage padding1 w100"
  >
    <!-- -----------------------------------------------------新增 -->
    <el-dialog
      title="部门新增"
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
          label="名称"
          prop="name"
        >
          <el-input
            :maxlength="50"
            v-model.trim="addForm.name"
            placeholder="请输入名称"
            name="tfOrganization-name"
            auto-complete="off"
          ></el-input>
        </el-form-item>
<!--         <el-form-item
          label="组织类型"
          prop="type"
        >
          <el-select
            :span="4"
            v-model.trim="addForm.type"
            filterable
            clearable
            placeholder="请输入组织类型"
          >
            <el-option
              label="部门"
              value="1"
            >部门</el-option>
            <el-option
              label="班组"
              value="2"
            >班组</el-option>
          </el-select>
        </el-form-item> -->  
        <el-form-item
          label="备注"
        
        >
          <el-input
            :maxlength="50"
            v-model.trim="addForm.remarks"
            placeholder="请输入备注"
            name="tfOrganization-remarks"
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
      title="组织修改"
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
          label="名称"
          prop="name"
        >
          <el-input
            :maxlength="50"
            v-model.trim="updateForm.name"
            placeholder="请输入名称"
            name="tfOrganization-name"
            auto-complete="off"
          ></el-input>
        </el-form-item>
<!--         <el-form-item
          label="组织类型"
          prop="type"
        >
          <el-select
            :span="4"
            v-model.trim="updateForm.type"
            filterable
            clearable
            placeholder="请输入组织类型"
          >
            <el-option
              label="部门"
              value="1"
            >部门</el-option>
            <el-option
              label="班组"
              value="2"
            >班组</el-option>
          </el-select>
        </el-form-item>  -->       
        <el-form-item
          label="备注"
        
        >
          <el-input
            :maxlength="50"
            v-model.trim="updateForm.remarks"
            placeholder="请输入备注"
            name="tfOrganization-remarks"
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
          @click="addDialogFormVisible = true;addForm.pid= 0;addForm.type='1'"
          size="mini"
          :style="{'background-color':bgColor.addBt,'border-color':bgColor.addBt }"
          v-show="btPermissions['/backend/orgManage/add']"
        >添加部门</el-button>
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
              placeholder="请输入名称"
              name="tfOrganization-name"
              auto-complete="off"
            ></el-input>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="primary"
              size="small"
              @click="search()"
              :style="{'background-color':bgColor.selectBt,'border-color':bgColor.selectBt }"
              v-show="btPermissions['/backend/orgManage/select']"
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
      <CommonTable
        :tableData="tfOrganizationList"
         row-key="id"
         :ifPagination="false"
        refreshFuncName="getTfOrganizationList"
        :default-sort="{prop: 'id', order: 'ascending'}"
      >
        <template slot="main">
          <el-table-column
            align="center"
            prop="id"
            label="序号"
            width="100"
          >
          </el-table-column>  
          <el-table-column
            align="center"
            prop="name"
            label="名称"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="type"
            label="组织类型"
          >
          <template slot-scope="{row}">
            {{row.type|orgType}}
          </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="remarks"
            label="备注"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="250"
          >
            <template slot-scope="scope">
              <el-button
                type="danger"
                @click="addOrganization(scope.row)"
                size="mini"
                v-if="scope.row.type!=2"
                :style="{'background-color':bgColor.addBt,'border-color':bgColor.addBt }"
                v-show="btPermissions['/backend/orgManage/add']"
              >添加班组</el-button>
              <span v-else class="ib" style="width:76px;height:10px;"></span>
              <el-button
                type="danger"
                size="small"
                :style="{'background-color':bgColor.deleteBt,'border-color':bgColor.deleteBt }"
                @click="deleteTfOrganization(scope.row.id)"
                v-show="btPermissions['/backend/orgManage/delete']"
              >删除</el-button>
              <el-button
                type="danger"
                size="small"
                :style="{'background-color':bgColor.updateBt,'border-color':bgColor.updateBt }"
                @click="updateTfOrganization(scope.row)"
                v-show="btPermissions['/backend/orgManage/update']"
              >修改</el-button>
            </template>
          </el-table-column>
        </template>
      </CommonTable>
    </div>
  </div>
</template>

<script>
import {
    mapState,
    mapGetters,
    mapActions
} from 'vuex'; //先要引入
export default {
    data() {
        return {
            searchObj: { //请求参数对象
                page: 1, //第几页 页码
                pageSize: 10, //页码大小,一页显示多少条
                pid: "", // 父id
                name: "", // 名称
                type: "", // 组织类型
                remarks: "", // 备注
            },
            loading: true, //控制加载中显示
            tfOrganizationList: [], //表格数据列表
            total: null, //一共有多少条数据
            addDialogFormVisible: false, // 添加对话框显隐
            updateDialogFormVisible: false, // 修改对话框显隐
            addForm: {
                pid: 0, // 父id
                name: "", // 名称
                type: "", // 组织类型
                remarks: "", // 备注
            },
            updateForm: {
                pid: "", // 父id
                name: "", // 名称
                type: "", // 组织类型
                remarks: "", // 备注
            },
            addRuleForm: {
                pid: [{
                    required: true,
                    message: "请输入父id"
                }],
                name: [{
                    required: true,
                    message: "请输入名称"
                }],
                type: [{
                    required: true,
                    message: "请输入组织类型"
                }],
                remarks: [{
                    required: true,
                    message: "请输入备注"
                }],
            },
            updateRuleForm: {
                pid: [{
                    required: true,
                    message: "请输入父id"
                }],
                name: [{
                    required: true,
                    message: "请输入名称"
                }],
                type: [{
                    required: true,
                    message: "请输入组织类型"
                }],
                remarks: [{
                    required: true,
                    message: "请输入备注"
                }],
            }
        }
    },
    computed: {

    },
    watch: {

    },
    components: {

    },
    methods: {
        // 搜索
        search() {
            this.searchObj.page = 1;
            this.getTfOrganizationList();
        },
        clearOut() {
            this.searchObj = {
                page: 1, //第几页 页码
                pageSize: 10, //页码大小,一页显示多少条
            }
        },
        refresh() {
            this.clearOut();
            this.getTfOrganizationList();
        },
        // 页码
        pageNum(currentSect) {
            this.searchObj.page = currentSect;
            this.getTfOrganizationList(); // 刷新列表
        },
        // 一页显示多少条
        pageShowCount(currentSect) {
            this.searchObj.pageSize = currentSect;
            this.getTfOrganizationList(); // 刷新列表
        },
        addOrganization(item) {
            this.addForm.pid = item.id
            this.addForm.type='2'
            this.addDialogFormVisible = true
        },
        // 获取项目列表
        getTfOrganizationList() {
            let self = this;
            self.loading = true; // 显示加载中
            self.$http.post(
                "/admin/tfOrganization/list.d",
                self.searchObj,
                function (suc) {
                    self.tfOrganizationList = suc.body.rows; // 列表数据赋值
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
        deleteTfOrganization(id) {
            let self = this;
            this.$confirm("确定删除吗？", "提示", { // 删除确认提示框
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(() => { // 如果确认
                    self.loading = true; // 显示加载中
                    self.$http.post(
                        "/admin/tfOrganization/delete.d", {
                            id: id
                        },
                        function (suc) {
                            self.getTfOrganizationList(); // 刷新列表
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
        updateTfOrganization(item) {
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
                        "/admin/tfOrganization/add.d",
                        self.addForm,
                        function (suc) {
                            self.getTfOrganizationList(); // 刷新列表
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
                     self.$filterUpdate(self.updateForm)
                    self.$http.post(
                        "/admin/tfOrganization/update.d",
                        self.updateForm,
                        function (suc) {
                            self.getTfOrganizationList(); // 刷新列表
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
        this.$onkeydown(this.getTfOrganizationList);
        this.getTfOrganizationList();
    }
}
</script>

<style lang="scss" scoped>
</style>
