<!--
 * @Author: Huanghao
 * @Date: 2019-03-12 10:33:24
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-23 15:00:50
 * @Description:
 -->
<template>
<div class="permissionManage padding1 w100 h100" v-loading="loading">
  <NoPerimission v-if="!btPermissions['/backend/permissionManage']" />
  <!--   权限树 -->
  <template v-else>
    <div class="hearder-top">
      <el-button
          type="danger"
          @click="dialogFormVisible = true;addForm.parentId= 0"
          size="mini"
          :style="{'background-color':bgColor.addBt,'border-color':bgColor.addBt }"
          v-show="btPermissions['/backend/permissionManage/add']"
      >添加</el-button>
      <i class="el-icon-refresh refresh fr fs20 poi"  @click="refresh()"></i>
    </div>
    <el-tree style="width:100%;height:100%"
      :data="data2"
      node-key="id"
      :render-content="renderContent">
    </el-tree>
    <el-dialog title="权限新增" :visible.sync="dialogFormVisible">
    <el-form :model="addForm"  :rules="ruleForm1" ref="ruleForm1"  status-icon label-width="100px"  class="demo-ruleForm"  >
      <el-form-item label="权限名称" prop="name">
        <el-input v-model.trim="addForm.name" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="前端路由" prop="route">
        <el-input v-model.trim="addForm.route" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="权限类型" prop="type">
              <el-select :span="4" v-model.trim="addForm.type " filterable clearable placeholder="选择权限类型">
            <el-option :value="1" label="菜单">菜单</el-option>
            <el-option :value="2" label="按钮">按钮</el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="commitAdd()">确定新增</el-button>
    </div>
    </el-dialog>
      <el-dialog title="权限修改" :visible.sync="dialogFormVisible2">
    <el-form :model="updateForm"   :rules="ruleForm2" ref="ruleForm2"  status-icon label-width="100px"  class="demo-ruleForm" >
      <el-form-item label="权限名称" prop="name">
        <el-input v-model.trim="updateForm.name" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="前端路由" prop="route">
        <el-input v-model.trim="updateForm.route" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="权限类型" prop="type">
              <el-select :span="4" v-model.trim="updateForm.type " filterable clearable placeholder="选择权限类型">
            <el-option :value="1" label="菜单">菜单</el-option>
            <el-option :value="2" label="按钮">按钮</el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible2 = false">取 消</el-button>
      <el-button type="primary" @click="commitUpdate()">确定修改</el-button>
    </div>
    </el-dialog>
  </template>

</div>
</template>

<script>
let id = 1000;

export default {
  data() {
    return {
      data2: [
      ],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      permissionList: [],//权限树列表
      loading: true,//控制加载中显示
      dataList: [],
      root:[],
      addForm: { //新增表单
        name: "",
        type:1,
        route:"",
        parentId: ""
      },
      updateForm: { //修改表单
        name: "",
        id:"",
        type:1,
        route:"",
      },
      ruleForm1: {
        name: [{ required: true, message: "请输入角色名" }],
        route: [{ required: true, message: "前端路由" }],
        type: [{ required: true, message: "请选择类型" }]
      },
      ruleForm2: {
        name: [{ required: true, message: "请输入角色名" }],
        route: [{ required: true, message: "前端路由" }],
        type: [{ required: true, message: "请选择类型" }]
      },
    };
  },

  methods: {
    refresh(){
       this.getPermissionList();
    },
    //添加
    append(store, data) {
      let self=this;
      self.dialogFormVisible=true;
      self.addForm.parentId=data.id;

      /*  store.append({ id: id++, label: 'testtest', children: [] }, data); */
    },
    //删除
    remove(store, data) {
      let self=this;
      self.deletePermission(data.id)
    },
    //修改
    update(store, data) {
      let self=this;
      self.dialogFormVisible2=true;
      let temp=data.label;

      self.updateForm.name=temp.substring(data.label.indexOf('-')+1);
      self.updateForm.id=data.id;
      self.updateForm.route=data.route;
      self.updateForm.type=data.type;
    },
    renderContent(h, { node, data, store }) {
      if(data.id==0){
          return (
                  <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
            <el-button class="permissionbt" size="mini" on-click={() => this.append(store, data)}>
              添加
            </el-button>
            </span>
          </span>
      );
      }
      else  return (
                  <span class="custom-tree-node">
            <span>{node.label}</span>
            <span >
            <el-button class="permissionbt" v-show="btPermissions['/backend/permissionManage/add']"  size="mini" on-click={() => this.append(store, data)}>
              添加
            </el-button>
            <el-button class="permissionbt" v-show="btPermissions['/backend/permissionManage/delete']" size="mini" on-click={() => this.remove(store, data)}>
              删除
            </el-button>
            <el-button class="permissionbt" v-show="btPermissions['/backend/permissionManage/update']" size="mini" on-click={() => this.update(store, data)}>
              修改
            </el-button>
            </span>
          </span>
      );
    },
    //获取权限树
    async getPermissionList() {
      let self = this;
      self.loading = true;
      await self.$http.post(
        "/admin/permission/list.d",
        {},
        function(suc) {
          self.permissionList = suc.body.rows;
          self.setData();
        },
        function(err) {
          self.$message({
            showClose: true,
            message: err.result.msg,
            type: "warning"
          });
        }
      );
      self.loading = false;
    },
    //设置权限树格式 转换成[{id:"",lable:"",children:[]}]格式
    setData() {
      let self = this;
      let perList = self.permissionList; //获取权限树
      self.dataList=[];
      //遍历树
      function readTree(tempData, tempPermissions) {
        let length = tempPermissions.length;
        for (var index = 0; index < length; index++) {
          var a = { id: "", label: "", children: [] };
          a.id = tempPermissions[index].id;
          a.label =tempPermissions[index].id+"-"+tempPermissions[index].name;
          a.route = tempPermissions[index].route;
          a.type = tempPermissions[index].type;
          tempData.push(a);
          if (tempPermissions[index].children.length != 0) {
            readTree(
              tempData[index].children,
              tempPermissions[index].children
            );
          }
        }
      }
      readTree(self.dataList, perList);
      self.root.id=0;
      self.root.label="根权限";
      self.root.children= self.dataList;
      self.data2=[];
      console.log(self.dataList)
      self.data2=self.dataList;
    },
    //添加权限
    commitAdd(){
       let self = this;
      self.$refs["ruleForm1"].validate(valid => {
        if (valid) {
      self.$http.post(
        "/admin/permission/add.d",
        self.addForm,
        function(suc) {
          self.dialogFormVisible = false;
          //self.getPermissionList();
              self.$message({
                showClose: true,
                message: "新增成功",
                type: "success"
              });
        },
        function(err) {
          self.$message({
            showClose: true,
            message: err.result.msg,
            type: "warning"
          });
        }
      );
        } else {
              self.$message({
                showClose: true,
                message: "输入格式错误",
                type: "warning"
              });
          return false;
        }
      });

    },
        //修改权限
    commitUpdate(){
       let self = this;
      this.$refs["ruleForm2"].validate(valid => {
        if (valid) {
      self.$http.post(
        "/admin/permission/update.d",
        self.updateForm,
        function(suc) {
          self.dialogFormVisible2 = false;
          //self.getPermissionList();
              self.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              });
        },
        function(err) {
          self.$message({
            showClose: true,
            message: err.result.msg,
            type: "warning"
          });
        }
      );
        } else {
              self.$message({
                showClose: true,
                message: "输入格式错误",
                type: "warning"
              });
          return false;
        }
      });

    },
        //删除权限
    deletePermission(id){
            let self = this;
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          self.$http.post(
            "/admin/permission/delete.d",
            { id: id },
            function(suc) {
              //self.getPermissionList();
              self.$message({
                type: "success",
                message: "删除成功!"
              });
            },
            function(err) {
              self.$message({
                showClose: true,
                message: err.result.msg,
                type: "warning"
              });
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    let self = this;
    self.getPermissionList();
  }
};
</script>
<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    float: right;

  }
  .el-tree-node__content :hover{
    background-color: #f2f2f2
  }
  .el-tree{
    border-bottom: 0px solid #d1dbe5;
  }
  .permissionbt{
    padding: 4px 15px;
  }
</style>
