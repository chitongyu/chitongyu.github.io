<!--
 * @Author: Huanghao
 * @Date: 2019-09-06 11:03:21
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-23 15:20:34
 * @Description: 
 -->
<template>
  <div
    class="userManage padding1 w100 h100"
    v-loading="loading"
  >
  <NoPerimission v-if="!btPermissions['/backend/userManage']" />
  <template v-else>
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

        <!-- <el-form-item
          label="工号"
          prop="code"
        >
          <el-input
            :maxlength="50"
            v-model.trim="addForm.code"
            placeholder="请输入工号"
            name="admin-code"
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
        </el-form-item> -->
        <el-form-item
          label="姓名-工号"
          prop="name"
        >
          <el-select
            :loading="selectLoading"
            :remote-method="remoteMethod"
            filterable
            placeholder="请输入姓名或工号（可模糊查询）"
            remote
            reserve-keyword
            v-model.trim="addForm.name"
            @focus="remoteMethodDefault"
          >
            <el-option
              :key="item.sapCode"
              :label="item.name+'-'+item.sapCode"
              :value="item.name"
              @click.native="addCode(item.sapCode)"
              v-for="item in codeList"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="选择角色"
          prop="roleId"
        >
          <el-select
            :span="4"
            v-model.trim="addForm.roleId"
            filterable
            clearable
            placeholder="选择角色"
          >
            <el-option
              :label="item.name"
              :value="item.id"
              v-show="showRole(item.name)"
              v-for="(item,index) in roleList"
              :key="index"
            >{{item.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="所属班组"
          prop="selectedOrg"
        >
          <el-cascader
            v-model="addForm.selectedOrg"
            :options="org"
            placeholder="请选择班组"
            clearable
            filterable
            :props="{value:'id',label:'name'}"
            @change="handleAddChange"
          ></el-cascader>
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

<!--         <el-form-item
          label="工号"
          prop="code"
        >
          <el-input
            :maxlength="50"
            v-model.trim="updateForm.code"
            placeholder="请输入工号"
            name="admin-code"
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
        </el-form-item> -->
        <el-form-item
          label="选择角色"
          prop="roleId"
        >
          <el-select
            :span="4"
            v-model.trim="updateForm.roleId"
            filterable
            clearable
            placeholder="选择角色"
          >
            <el-option
              :label="item.name"
              :value="item.id+''"
              v-show="showRole(item.name)"  
              v-for="(item,index) in roleList"
              :key="index"
            >{{item.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="请选择班组"
          prop="selectedOrg"
        >
          <el-cascader
            v-model="updateForm.selectedOrg"
            :options="org"
            placeholder="请选择班组"
            clearable
            filterable
            :props="{value:'id',label:'name'}"
            @change="handleUpdateChange"
          ></el-cascader>
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
    <div class="header ovh">
      <div class="hearder-top">
        <el-button
          type="danger"
          @click="addDialogFormVisible = true;imgList= []"
          size="mini"
          :style="{'background-color':bgColor.addBt,'border-color':bgColor.addBt }"
          v-show="btPermissions['/backend/userManage/add']"
        >添加</el-button>
        <i
          class="el-icon-refresh refresh fr fs20 poi"
          @click="refresh()"
        ></i>
      </div>
      <el-row
        :gutter="5"
        class="row1 padding1"
      >
        <el-col
          :span="20"
          class="col1"
        >
          <el-col :span="3">
            <el-input
              v-model.trim="searchObj.name"
              placeholder="请输入姓名"
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
              v-show="btPermissions['/backend/userManage/select']"
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
    <div class="table w100">
      <CommonTable
        :tableData="adminList"
        refreshFuncName="getAdminList"
        :default-sort="{prop: 'id', order: 'ascending'}"
      >
        <template slot="main">
          <el-table-column
            align="center"
            prop="id"
            label="序号"
            width="60"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="code"
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
            prop="roleName"
            label="角色"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="deptName"
            label="部门"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="groupName"
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
                v-show="btPermissions['/backend/userManage/delete']"
              >删除</el-button>
              <el-button
                type="danger"
                size="small"
                :style="{'background-color':bgColor.updateBt,'border-color':bgColor.updateBt }"
                @click="updateAdmin(scope.row)"
                v-show="btPermissions['/backend/userManage/update']"
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
    components: {

    },
    filters: {

    },
    props: {

    },
    data() {
        return {
          roleName:this.$store.getters['user/getInfo'] && this.$store.getters['user/getInfo'].roleName,
            searchObj: { //请求参数对象
                page: 1, //第几页 页码
                pageSize: 15, //页码大小,一页显示多少条
                code: "", // 工号
                name: "", // 姓名
                roleId: "", // 角色
                deptId: "", // 部门
                groupId: "", // 班组
            },
            selectLoading: false,//加载工号和姓名
            codeList: [],//工号、姓名数据列表
            loading: true, //控制加载中显示
            adminList: [], //表格数据列表
            org: [], //组织结构数据
            roleList: [],
            selectedOrg: [],
            total: null, //一共有多少条数据
            addDialogFormVisible: false, // 添加对话框显隐
            updateDialogFormVisible: false, // 修改对话框显隐
            addForm: {
                code: "", // 工号
                name: "", // 姓名
                roleId: "", // 角色
                deptId: "", // 部门
                groupId: "", // 班组
                selectedOrg:null
            },
            updateForm: {
                code: "", // 工号
                name: "", // 姓名
                roleId: "", // 角色
                deptId: "", // 部门
                groupId: "", // 班组
                selectedOrg: null
            },
            addRuleForm: {
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
                selectedOrg: [{
                    required: true,
                    message: "请选择班组"
                }],
            },
            updateRuleForm: {
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
                selectedOrg: [{
                    required: true,
                    message: "请选择班组"
                }],
            }
        }
    },
    computed: {

    },
    watch: {

    },
    async created() {
        this.org = await this.$api.common.getOrg()
        /*          this.org=[{
                    "id": 7,
                    "createTime": "2019-09-10 14:28:05",
                    "updateTime": "2019-09-11 10:25:00",
                    "createAdminCode": "10001321",
                    "updateAdminCode": "10001130",
                    "ifDelete": 0,
                    "pid": 0,
                    "name": "信息化",
                    "type": "1",
                    "remarks": null,
                    "children": [{
                        "id": 9,
                        "createTime": "2019-09-10 14:30:06",
                        "updateTime": "2019-09-10 14:30:06",
                        "createAdminCode": "10001321",
                        "updateAdminCode": "10001321",
                        "ifDelete": 0,
                        "pid": 7,
                        "name": "开发组",
                        "type": "2",
                        "remarks": null,
                        "children":null
                    }, {
                        "id": 10,
                        "createTime": "2019-09-10 14:30:17",
                        "updateTime": "2019-09-10 14:30:17",
                        "createAdminCode": "10001321",
                        "updateAdminCode": "10001321",
                        "ifDelete": 0,
                        "pid": 7,
                        "name": "业务组",
                        "type": "2",
                        "remarks": null,
                        "children": null
                    }]
                }, {
                    "id": 8,
                    "createTime": "2019-09-10 14:29:18",
                    "updateTime": "2019-09-10 09:26:33",
                    "createAdminCode": "10001321",
                    "updateAdminCode": "10001321",
                    "ifDelete": 0,
                    "pid": 0,
                    "name": "EHS&改善",
                    "type": "1",
                    "remarks": null,
                    "children": [{
                        "id": 11,
                        "createTime": "2019-09-10 14:30:40",
                        "updateTime": "2019-09-10 14:30:40",
                        "createAdminCode": "10001321",
                        "updateAdminCode": "10001321",
                        "ifDelete": 0,
                        "pid": 8,
                        "name": "运营组",
                        "type": "2",
                        "remarks": null,
                        "children": null
                    }]
                }, {
                    "id": 12,
                    "createTime": "2019-09-11 18:34:30",
                    "updateTime": "2019-09-11 18:34:30",
                    "createAdminCode": "10001130",
                    "updateAdminCode": "10001130",
                    "ifDelete": 0,
                    "pid": 0,
                    "name": "MISP",
                    "type": "1",
                    "remarks": "12",
                    "children": null
                }] */
        this.getAdminList();
        this.roleList = await this.$api.common.getRole()

    },
    methods: {
        // 搜索
        search() {
            this.searchObj.page = 1;
            this.getAdminList();
        },  
        showRole(name){
          if(name=='超级管理员'){
             return name==this.roleName
          }else{
            return true
          }
         
        },   
        async remoteMethod(query) {
          if (query !== '') {
              this.selectLoading = true;
              this.codeList = await this.$api.common.getUser({values: query})
              this.selectLoading = false;
          } else {
            this.codeList= [];
          }
        },
        async remoteMethodDefault() {
          this.codeList = await this.$api.common.getUser()
        },
        addCode(data){
          this.addForm.code=data;
          console.log(this.addForm.code);
        },
        updateCode(data){
          this.updateForm.code=data;
        },
        clearOut() {
            this.searchObj = {
                page: 1, //第几页 页码
                pageSize: 15, //页码大小,一页显示多少条
            }
        },
        refresh() {
            this.clearOut();
            this.getAdminList();
        },
        handleAddChange(data) {
            this.addForm.deptId = data[0];
            this.addForm.groupId = data[1];
        },
        handleUpdateChange(data) {
            this.updateForm.deptId = data[0];
            this.updateForm.groupId = data[1];
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
            this.updateForm.selectedOrg = [this.updateForm.deptId, this.updateForm.groupId]
            console.log(this.updateForm)
        },
        //确认新增
        commitAdd() {
            let self = this;
            this.$refs["addRuleForm"].validate(valid => { // 数据格式验证
                if (valid) { // 如果通过
                    console.log(self.addForm.deptId,self.addForm.groupId)
                    if (self.$isEmpty(self.addForm.deptId) || self.$isEmpty(self.addForm.groupId)) {
                        self.$message({ // 提示失败
                            showClose: true,
                            message: '选择班组格式不正确，请重新选择',
                            type: "warning"
                        });
                        return;
                    }
                    self.loading = true; // 显示加载中
                    self.addDialogFormVisible = false; // 关闭修改对话框
                    Reflect.deleteProperty(self.addForm, 'selectedOrg')
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
                    if (self.$isEmpty(self.updateForm.deptId) || self.$isEmpty(self.updateForm.groupId)) {
                        self.$message({ // 提示失败
                            showClose: true,
                            message: '选择班组格式不正确，请重新选择',
                            type: "warning"
                        });
                        return;
                    }
                    self.loading = true; // 显示加载中
                    self.updateDialogFormVisible = false; // 关闭修改对话框'
                    self.$filterUpdate(self.updateForm),
                  
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

};
</script>

<style lang="scss" scoped>
.userManage {
}
</style>
