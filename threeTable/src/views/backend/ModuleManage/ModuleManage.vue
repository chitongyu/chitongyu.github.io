<!--
 * @Author: Huanghao
 * @Date: 2019-09-11 09:17:24
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-23 15:03:42
 * @Description: 
 -->

<template>
  <div
    v-loading="loading"
    class="moduleManage padding1 w100 h100 "
  >
    <NoPerimission v-if="!btPermissions['/backend/moduleManage']" />
  <template v-else>
    <!-- -----------------------------------------------------新增 -->
    <el-dialog
      title="模块管理新增"
      :visible.sync="addDialogFormVisible"
    >
      <el-form>
        <el-form-item
          label="所属班组"
          prop="selectedOrg"
        >
          <el-cascader
            v-model="selectedOrg"
            :options="org"
            placeholder="请选择班组"
            filterable
            :props="{value:'id',label:'name'}"
            @change="handleAddChange"
          ></el-cascader>
        </el-form-item>
        <table
          class="addTable"
          v-if="!$isEmpty(addForms)"
        >
          <tr>
            <th>
              <div
                class=" flex_row_end"
                style="width:130px!important;padding-right:12px"
              >
                <div
                  style="width:100px"
                  class="flex_row_end"
                >
                  <i
                    class="el-icon-plus poi changeGreen"
                    @click="addNode"
                    style="font-size:16px"
                  ></i>
                </div>
              </div>
            </th>
            <th>模块名</th>
            <th>备注</th>
          </tr>

          <tr
            v-for="(item,index) in addForms"
            :key="index"
          >
            <td>
              <div
                class=" flex_row_end"
                style="width:130px!important;padding-right:12px"
              >
                <i
                  class="el-icon-remove-outline poi changeRed"
                  @click="deleteNode(index)"
                  style="font-size:16px"
                ></i>模块{{index+1}}</div>
            </td>
            <td>
              <el-input
                class="widthInitial"
                v-model.trim="addForms[index].name"
                name="projectProgress-actualWeeks"
                auto-complete="off"
              ></el-input>
            </td>
            <td>
              <el-input
                class="widthInitial"
                type="number"
                v-model.trim="addForms[index].remarks"
                name="projectProgress-actualWeeks"
                auto-complete="off"
              ></el-input>
            </td>
          </tr>
        </table>
        <!--         <el-form-item
          label="模块名"
          prop="name"
        >
          <el-input
            :maxlength="50"
            v-model.trim="addForm.name"
            placeholder="请输入模块名"
            name="tfModule-name"
            auto-complete="off"
          ></el-input>
        </el-form-item>     
        <el-form-item
          label="备注"
        
        >
          <el-input
            :maxlength="50"
            v-model.trim="addForm.remarks"
            placeholder="请输入备注"
            name="tfModule-remarks"
            auto-complete="off"
          ></el-input>
        </el-form-item> -->
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
      title="模块管理修改"
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
          label="模块名"
          prop="name"
        >
          <el-input
            :maxlength="50"
            v-model.trim="updateForm.name"
            placeholder="请输入模块名"
            name="tfModule-name"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="所属班组"
          prop="selectedOrg"
          v-if="false"
        >
          <el-cascader
            v-model="updateForm.selectedOrg"
            :options="org"
            placeholder="请选择班组"
            filterable
            :props="{value:'id',label:'name'}"
            @change="handleUpdateChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            :maxlength="50"
            v-model.trim="updateForm.remarks"
            placeholder="请输入备注"
            name="tfModule-remarks"
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
          @click="addDialogFormVisible = true;"
          size="mini"
          :style="{'background-color':bgColor.addBt,'border-color':bgColor.addBt }"
          v-show="btPermissions['/backend/moduleManage/add']"
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
              placeholder="请输入模块名"
              name="tfModule-name"
              auto-complete="off"
            ></el-input>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="primary"
              size="small"
              @click="search()"
              :style="{'background-color':bgColor.selectBt,'border-color':bgColor.selectBt }"
              v-show="btPermissions['/backend/moduleManage/select']"
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
    <div class="table td-border">
      <CommonTable
        :tableData="tfModuleList"
        row-key="id"
        border
        :extraMergeIndex="[0,1]"
        :mergeAttrArr="mergeAttrs"
        refreshFuncName="getTfModuleList"
        :default-sort="{prop: 'id', order: 'ascending'}"
      >
        <template slot="main">
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
            prop="name"
            label="模块名"
          >
          <template slot-scope="{row}">
            <el-input
              size="small"
              class="edit-cell" 
              v-if="showEdit[$getObjAttrsValue(row,mergeAttrs)]"
              v-model.trim="row.name"
            ></el-input>
            <span v-if="!showEdit[$getObjAttrsValue(row,mergeAttrs)]">{{row.name}}</span>
          </template>          
          </el-table-column>

          <el-table-column
            align="center"
            prop="remarks"
            label="备注"
          >
          <template slot-scope="{row}">
            <el-input
              size="small"
              class="edit-cell"
              v-if="showEdit[$getObjAttrsValue(row,mergeAttrs)]"
              v-model.trim="row.remarks"
            ></el-input>
            <span v-if="!showEdit[$getObjAttrsValue(row,mergeAttrs)]">{{row.remarks}}</span>
          </template>             
          </el-table-column>
        <el-table-column
          align="center"
          label="批量修改"
          width="150"
          v-if="false"
        >
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="small"
              :style="{'background-color':bgColor.updateBt,'border-color':bgColor.updateBt }"
              @click="edit(scope.row)"
              v-show="btPermissions['/backend/moduleManage/update']"
              v-if="!showEdit[$getObjAttrsValue(scope.row,mergeAttrs)]"
            >编辑</el-button>
            <el-button
              type="danger"
              size="small"
              :style="{'background-color':bgColor.deleteBt,'border-color':bgColor.deleteBt }"
              @click="cancelEdit(scope.row)"
              v-if="showEdit[$getObjAttrsValue(scope.row,mergeAttrs)]"
            >取消</el-button>
            <el-button
              type="danger"
              size="small"
              :style="{'background-color':bgColor.selectBt,'border-color':bgColor.selectBt }"
              @click="saveEdit(scope.row)"
              v-if="showEdit[$getObjAttrsValue(scope.row,mergeAttrs)]"
            >保存</el-button>
            <el-button
              type="danger"
              size="small"
              :style="{'background-color':bgColor.redBt,'border-color':bgColor.redBt }"
              @click="deleteAllProject(scope.row)"
              v-show="btPermissions['/backend/moduleManage/delete']"
              v-if="!showEdit[$getObjAttrsValue(scope.row,mergeAttrs)]"
            >删除</el-button>
          </template>
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
                @click="deleteTfModule(scope.row.id)"
                v-show="btPermissions['/backend/moduleManage/delete']"
              >删除</el-button>
              <el-button
                type="danger"
                size="small"
                :style="{'background-color':bgColor.updateBt,'border-color':bgColor.updateBt }"
                @click="updateTfModule(scope.row)"
                v-show="btPermissions['/backend/moduleManage/update']"
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
                pageSize: 15, //页码大小,一页显示多少条
                deptId: "", // 部门Id
                groupId: "", // 班组Id
                name: "", // 模块名
                remarks: "", // 备注
            },
            loading: true, //控制加载中显示
            tfModuleList: [], //表格数据列表
            org: [], //组织结构数据
            total: null, //一共有多少条数据
            addDialogFormVisible: false, // 添加对话框显隐
            updateDialogFormVisible: false, // 修改对话框显隐
            mergeObj:{},
            copyObj:{},
            mergeAttrs:['deptId','groupId'],
            showEdit: {},
            addFormDeptId:'',
            addFormGroupId:'',
            updateFormDeptId:'',
            updateFormGroupId:'',
            selectedOrg:[],
            addForms: [{
                deptId: "", // 部门Id
                groupId: "", // 班组Id
                name: "", // 模块名
                remarks: ""
            },{
                deptId: "", // 部门Id
                groupId: "", // 班组Id
                name: "", // 模块名
                remarks: ""
            },{
                deptId: "", // 部门Id
                groupId: "", // 班组Id
                name: "", // 模块名
                remarks: ""
            }],
            updateForm: {
                deptId: "", // 部门Id
                groupId: "", // 班组Id
                name: "", // 模块名
                remarks: "", // 备注
                 selectedOrg:[]
            },
            addRuleForm: {
                deptId: [{
                    required: true,
                    message: "请输入部门Id"
                }],
                groupId: [{
                    required: true,
                    message: "请输入班组Id"
                }],
                name: [{
                    required: true,
                    message: "请输入模块名"
                }],
                remarks: [{
                    required: true,
                    message: "请输入备注"
                }],
                selectedOrg: [{
                    required: true,
                    message: "请选择班组"
                }],
            },
            updateRuleForm: {
                deptId: [{
                    required: true,
                    message: "请输入部门Id"
                }],
                groupId: [{
                    required: true,
                    message: "请输入班组Id"
                }],
                name: [{
                    required: true,
                    message: "请输入模块名"
                }],
                remarks: [{
                    required: true,
                    message: "请输入备注"
                }],
                selectedOrg: [{
                    required: true,
                    message: "请选择班组"
                }],
            }
        }
    },
    computed: {},
    watch: {

    },
    components: {

    },
    async created() {
        this.getTfModuleList();
        this.org = await this.$api.common.getOrg()
    },
    methods: {
        // 搜索
        search() {
            this.searchObj.page = 1;
            this.getTfModuleList();
        },
        clearOut() {
            this.searchObj = {
                page: 1, //第几页 页码
                pageSize: 10, //页码大小,一页显示多少条
            }
        },
        refresh() {
            this.clearOut();
            this.getTfModuleList();
        },
        addNode () {
          this.addForms.push({
            deptId: "", // 部门Id
            groupId: "", // 班组Id
            name: "", // 模块名
            remarks: ""
          })
        },
        deleteNode (index) {
          if (this.addForms.length > 1) {
            this.addForms.splice(index, 1)
          } else {
            this.$message({ // 提示失败
              showClose: true,
              message: '不能再删除了',
              type: 'warning'
            })
          }
        },        
        handleAddChange(data){
         this.addFormDeptId=data[0];
         this.addFormGroupId=data[1];
        },
        handleUpdateChange(data){
         this.updateFormDeptId=data[0];
         this.updateFormGroupId=data[1];
        },
    // 修改
    edit (item) {
      let key=this.$getObjAttrsValue(item,this.mergeAttrs)
      this.$set(this.showEdit, key, true)
      this.copyObj[key] = JSON.parse(JSON.stringify(this.mergeObj[key])) // 复制
      /*             this.imgList = [];
                  this.updateDialogFormVisible = true; // 显示修改对话框
                  this.updateForm = this.$copyObj(item); // 浅拷贝选择对象 */
    },
    cancelEdit (item) {
      let key=this.$getObjAttrsValue(item,this.mergeAttrs)
      this.$set(this.showEdit, key, true)
      for (let i = 0; i < this.mergeObj[key].length; i++) {
        Object.assign(this.mergeObj[key][i], JSON.parse(JSON.stringify(this.copyObj[key][i])))
      }
      this.showEdit[key] = false
      /*             this.imgList = [];
                  this.updateDialogFormVisible = true; // 显示修改对话框
                  this.updateForm = this.$copyObj(item); // 浅拷贝选择对象 */
    },
    saveEdit (item) {
      let key=this.$getObjAttrsValue(item,this.mergeAttrs)
      let self = this
      let mustInputFlag = false
      let list = this.mergeObj[key]
      for (let i = 0; i < list.length; i++) {
        if (self.$isEmpty(list[i].name)) {
          mustInputFlag = true
        }
         self.$filterUpdate(list[i])
      }
      if (mustInputFlag) {
        self.$message({ // 提示失败
          showClose: true,
          message: '必填字段不能为空',
          type: 'warning'
        })
        return
      }
      let tempArr = list.map((element) => {
        return element.name
      })
      if (!self.$ifRepeatOrNull(tempArr)) {
        self.$message({ // 提示失败
          showClose: true,
          message: '不能有重复值',
          type: 'warning'
        })
        return
      }
      self.loading = true // 显示加载中
      let tfModulesStr = JSON.stringify(list)
      self.$http.post(
        '/admin/tfModule/updateBatch.d', {
          jsonStr: tfModulesStr
        },
        function (suc) {
          self.getTfModuleList() // 刷新列表
          self.showEdit[key] = false
          self.$message({ // 提示成功
            showClose: true,
            message: '保存成功',
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
    },
    deleteAllProject (item) {
      let self = this
      this.$confirm('确定删除吗？', '提示', { // 删除确认提示框
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => { // 如果确认
          self.loading = true // 显示加载中
          self.$http.post(
            '/admin/tfModule/deleteByGroupId.d', {
              deptId: item.deptId,
              groupId: item.groupId
            },
            function (suc) {
              self.getTfModuleList() // 刷新列表
              self.$message({ // 提示成功
                showClose: true,
                message: '删除成功',
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
        })
        .catch(() => {
          this.$message({ // 提示失败
            type: 'info',
            message: '操作异常'
          })
          self.loading = false // 隐藏加载中
        })
    },
        // 获取项目列表
        getTfModuleList() {
            let self = this;
            self.loading = true; // 显示加载中
            self.$http.post(
                "/admin/tfModule/listByPage.d",
                self.searchObj,
                function (suc) {
                    self.tfModuleList = suc.body.rows; // 列表数据赋值
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
        deleteTfModule(id) {
            let self = this;
            this.$confirm("确定删除吗？", "提示", { // 删除确认提示框
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(() => { // 如果确认
                    self.loading = true; // 显示加载中
                    self.$http.post(
                        "/admin/tfModule/delete.d", {
                            id: id
                        },
                        function (suc) {
                            self.getTfModuleList(); // 刷新列表
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
        updateTfModule(item) {
            console.log(this.mergeObj)
            this.imgList = [];
            this.updateDialogFormVisible = true; // 显示修改对话框
            this.updateForm = this.$copyObj(item); // 浅拷贝选择对象
            this.updateForm.selectedOrg=[item.deptId,item.groupId]
        },
        //确认新增
        commitAdd() {
            let self = this;
            //判断班组必填
            if(self.$isEmpty(self.addFormDeptId)){
              self.$message({ // 提示失败
                showClose: true,
                message: '请选择班组',
                type: 'warning'
              })
              return
            }

            let tempArr = this.addForms.map((element) => {
              element.deptId = self.addFormDeptId
              element.groupId = self.addFormGroupId
              return element.name
            })
            //判断重复和空值
            if (!self.$ifRepeatOrNull(tempArr)) {
              self.$message({ // 提示失败
                showClose: true,
                message: '模块名不能为空或不能重复',
                type: 'warning'
              })
              return
            }  
            if (self.$isEmpty(self.addFormDeptId) || self.$isEmpty(self.addFormGroupId)) {
                self.$message({ // 提示失败
                    showClose: true,
                    message: '选择班组格式不正确，请重新选择',
                    type: "warning"
                });
                return;
            }                 
            self.loading = true; // 显示加载中
            self.addDialogFormVisible = false; // 关闭修改对话框     
            self.$http.post(
                "/admin/tfModule/addBatch.d",
                {jsonStr: JSON.stringify(self.addForms)},
                function (suc) {
                    self.getTfModuleList(); // 刷新列表
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
              
        },
        // 确认修改
        commitUpdate() {
            let self = this;
            this.$refs["updateRuleForm"].validate(valid => { // 数据格式验证
                if (valid) { // 如果通过
                    self.loading = true; // 显示加载中
                    self.updateDialogFormVisible = false; // 关闭修改对话框'
                    self.$http.post(
                        "/admin/tfModule/update.d",
                        self.$filterUpdate(self.updateForm),
                        function (suc) {
                            self.getTfModuleList(); // 刷新列表
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

}
</script>

<style lang="scss" scoped>

</style>
