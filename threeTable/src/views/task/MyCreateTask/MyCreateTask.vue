<!--
 * @Author: Huanghao
 * @Date: 2019-09-06 11:03:21
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-25 01:30:19
 * @Description: 
 -->
<template>
  <div class="myCreateTaskList w100 h100 flex column">
    <div class="bg_white pos padding2 padding-left4 no_shrink">
      <el-breadcrumb separator-class="iconfont icon-you ">
        <el-breadcrumb-item>明珞</el-breadcrumb-item>
        <el-breadcrumb-item>{{departName}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{groupName}}</el-breadcrumb-item>
        <el-breadcrumb-item>任务</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="w100 rel h100" ref="maindiv">
      <el-dialog class="addWorkTimeDialog dialogCenter" title="添加报工" :modal-append-to-body="false" :close-on-click-modal='false'  :visible.sync="addWorkTimeDialog">
        <AddWorkTime @cancel="addWorkTimeDialog=false;reload()" @refresh="refresh()"  @back="addWorkTimeDialog=false;" :selectRow="selectRow"/>
    </el-dialog>   
    <el-dialog class="updateWorkTimeDialog dialogCenter" title="报工明细" :modal-append-to-body="false" :close-on-click-modal='false'  :visible.sync="updateWorkTimeDialog" >
        <UpdateWorkTime @cancel="updateWorkTimeDialog=false;reload()" @refresh="reload()" :selectRow="selectRow"/>
    </el-dialog> 
     
       <el-dialog class="updateTaskDialog dialogCenter"  title="修改任务"  :modal-append-to-body="false" :close-on-click-modal='false'  :visible.sync="updateTaskDialog" >
        <UpdateTask @cancel="updateTaskDialog=false;reload()" :updateObj="updateObj" :taskId="updateTaskId" />
    </el-dialog>        
    <div class="flex_row_start padding-left4 margin-top1" ref="header1">
     <div class="poi " @click="$replaceTo('/task/myPrincipalTask?taskStatus=')" >指派给我的任务</div>
      <div class="margin-left4 poi activeTask"  @click="$replaceTo('/task/myCreateTask?taskStatus=')" >我创建的任务</div>
    </div>
    <div class="task-status  padding2 padding-left4  flex_row_between" ref="header2">
      <el-radio-group v-model="searchObj.status">
        <el-radio label="" >全部</el-radio>
        <el-radio label="0">未开始</el-radio>
        <el-radio label="1">进行中</el-radio>
        <el-radio label="2">已完成</el-radio>
        <el-radio label="3">已关闭</el-radio>
        <el-radio label="4">已延期</el-radio>
      </el-radio-group>
      <el-button
        type="primary"
        class="fs_13 margin-right4 flex_row_center" 
        icon="icon-jia iconfont fs_16"
        @click="$pushTo('/task/createTask')"
      >批量创建</el-button>
    </div>
    <div v-loading="loading" class="myCreateTaskList-table bg_white  margin-left4 margin-right4">
      <CommonTable
         v-if="maxHeight"
        :tableData="myCreateTaskList"
        refreshFuncName="getMyPrincipalTaskByPage"
        :row-style="selectedHighlight"
          @row-click="rowClick" 
          :indent="12"
         :max-height="maxHeight"  
        :load="load"
        lazy
        row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      >
         <template slot="main">
          <el-table-column
            align="center"
            prop="level"
            label="层级"
            fixed="left"
            width="100"
            class-name="levelColumn"
          > 
          <template slot-scope="{row}">
           <span class="levelValue">
             {{row.level}}
           </span>
          </template>
          </el-table-column>           
          <el-table-column
            align="center"
            prop="id"
            label="ID"
            width="100"
          > </el-table-column>
          <el-table-column
            align="center"
            prop="projectNumber"
            label="项目编号"
            width="100"
            
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="projectName"
            label="项目名称"
          > </el-table-column>
          <el-table-column
            align="center"
            prop="lineName"
            label="线体"
            width="100"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="任务名称"
            min-width="150"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="description"
            min-width="150"
            label="描述"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="planStartTime"
            label="计划开始时间"
            width="120"
            
          > </el-table-column>
          <el-table-column
            align="center"
            prop="planEndTime"
            label="计划完成时间"
            width="120"
            
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="principalAdminName"
            label="指派给"
            width="80"
            
          >
          </el-table-column>          
          <el-table-column
            align="center"
            prop="planManHours"
            label="计划工时"
            width="80"
            
          > 
          <template slot-scope="{row}">
            {{$toInt(row.planManHours)}}
          </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="actualManHours"
            label="报工工时"
            width="80"
            
          >
           <template slot-scope="{row}">
            {{$toInt(row.actualManHours)}}
          </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="distributableManHours"
            label="剩余"
            width="70"
            
          > 
          <template slot-scope="{row}">
            {{$toInt(row.planManHours-row.actualManHours)}}
          </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="completionRate"
            label="进度"
            width="70"
            
          >
           <template slot-scope="{row}">
            {{$toInt(row.completionRate)}}%
          </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="departmentName"
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
            prop="moduleName"
            label="工作模块"
            width="90"
          > </el-table-column>          

          <el-table-column
            align="center"
            prop="createAdminName"
            label="创建人"
            width="80"
            
          > </el-table-column>
          <el-table-column
            align="center"
            prop="status"
            label="状态"
            width="70"

            
          >
          <template slot-scope="{row}">
              {{row.status|taskStatus}}
          </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop=""
            label="操作"
            width="120"
            
            fixed="right"
          >
          <template slot-scope="{row}">
            <el-tooltip class="item" effect="dark" content="新增报工" placement="bottom-start">
             <i class="iconfont icon-shijian fs_20 "  :class="row.status==3||row.status==2||row.isLeaf!=1||!ifMyPrinciples(row.principalAdminCode)?'cl_grey':'cl_blue'"  @click="addWorkTime(row)"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="查看/修改报工" placement="bottom-start">
             <i class="iconfont icon-bianji1 fs_20 "  :class="row.status==3||row.isLeaf!=1?'cl_grey':'cl_blue'"  @click="updateWorkTime(row)" ></i>
            </el-tooltip>
             <el-tooltip class="item" effect="dark" content="添加/修改子任务" placement="bottom-start">
             <i class="iconfont icon-zuzhi fs_20 " :class="row.distributableManHours<=0||row.status==3?'cl_grey':'cl_blue'"  @click="createChildTask(row)"></i>
             </el-tooltip>
             <el-popover
                placement="bottom"
                width="100"
                trigger="click"
              ><div class="margin-top1 flex_row_center" @click="deleteTask(row)"><el-button type="primary">删除任务</el-button></div>
               <div class="margin-top1 flex_row_center"  @click="updateTask(row)"><el-button type="primary">修改任务</el-button></div>
               <div class="margin-top1 flex_row_center" @click="$pushTo('/task/updateTask',{name:row.name,taskId:row.id,taskStatus:row.status})"><el-button type="primary">修改历史</el-button></div>
               <div class="margin-top1 flex_row_center"  @click="closeTask(row)"><el-button type="primary">关闭任务</el-button></div>
                <el-tooltip class="item" effect="dark"  slot="reference"  content="更多操作" placement="bottom-start">
                <i class="iconfont icon-gengduo fs_20 cl_blue"></i>
                </el-tooltip>
              </el-popover>            
          </template>
          </el-table-column>         
          <el-table-column
            v-if="false"
            align="center"
            prop=""
            label="操作"
            width="120"
            fixed="right"
          >
          <template slot-scope="{row}">
            <el-tooltip class="item" effect="dark" content="新增报工" placement="bottom-start">
             <i class="iconfont icon-shijian fs_20 "  :class="row.status==3||row.status==2||row.isLeaf!=1?'cl_grey':'cl_blue'"  @click="addWorkTime(row)"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="查看/修改报工" placement="bottom-start">
             <i class="iconfont icon-bianji1 fs_20 "  :class="row.status==3||row.isLeaf!=1?'cl_grey':'cl_blue'"  @click="updateWorkTime(row)" ></i>
            </el-tooltip>
             <el-tooltip class="item" effect="dark" content="添加/修改子任务" placement="bottom-start">
             <i class="iconfont icon-zuzhi fs_20 " :class="row.status==3||row.status==2||!$ifZero(row.actualManHours)?'cl_grey':'cl_blue'"  @click="createChildTask(row)"></i>
             </el-tooltip>
             <el-tooltip class="item" effect="dark" content="关闭任务" placement="bottom-start">
              <i class="iconfont icon-wancheng fs_20 " :class="row.status==3||row.status==2?'cl_grey':'cl_blue'"  @click="closeTask(row)"></i>
             </el-tooltip>             
          </template>
          </el-table-column>
        </template>
      </CommonTable>
    </div>
    </div>
  </div>

</template>

<script>
import AddWorkTime from "@/components/dialog/AddWorkTime/AddWorkTime.vue";
import UpdateWorkTime from "@/components/dialog/UpdateWorkTime/UpdateWorkTime.vue";
import UpdateTask from "@/components/dialog/UpdateTask/UpdateTask.vue";
export default {
  name: "myCreateTaskList",
  components: {
    AddWorkTime,
    UpdateWorkTime,
    UpdateTask
  },
  inject:['reload'],
  filters:{

  },
  props:{

  },
  data(){
    return{
      typeClass:'giveMe',
      departName:this.$store.getters['user/getInfo']&&this.$store.getters['user/getInfo'].deptName,
      groupName:this.$store.getters['user/getInfo']&&this.$store.getters['user/getInfo'].groupName,
       sapCode:this.$store.getters['user/getInfo']&&this.$store.getters['user/getInfo'].sapCode,
      tableData:[{id:2,name:'test',value:1},{id:1,name:'test',value:1}],
      searchObj:{
          page: 1, // 第几页 页码
          pageSize: 15, // 页码大小,一页显示多少条
          status:1
      },
      total:100,
      maxHeight:'',
      taskStatus:0,
      getIndex:'',
      addWorkTimeDialog:false,
      updateWorkTimeDialog:false,
      myCreateTaskList:[],
      selectRow:{},
      updateTaskDialog:false,
      updateObj:{},
      updateTaskId:null,
      loading:false

        
    }
  },
  computed:{

  },
  watch:{
      'searchObj.status': {
      handler: function(newValue, oldValue){
        this.$replaceTo('?',{taskStatus:newValue})
      },
      // 深度观察监听
      deep: true,
      immediate: false
    } ,
    '$route': {
      handler: function(to, from){
        console.log(to.query)
        this.searchObj.status=to.query.taskStatus
      },
      // 深度观察监听
      deep: true,
      immediate: true
    }     
  }, 
  created(){
    console.log(this.$store.getters['user/getInfo'],'saadasd')
    console.log(this.$lodash.compact([0, 1, false, 2, '', 3]))
     // [16, 64]
     this.refresh()
   
  },
  mounted(){
      this.setHeight()
  },
  methods:{
    ifMyPrinciples(code){
      if(code==this.sapCode) return true
      else return false
    },   
    setHeight(){
      console.log('设置高度')
      let mainDiv=this.$refs.maindiv;
      let height=mainDiv.offsetHeight
      this.maxHeight=mainDiv.offsetHeight-this.$refs.header1.offsetHeight-this.$refs.header2.offsetHeight-50
     
     console.log('设置高度为',this.maxHeight)
   },
    refresh(){
        this.getMyCreateTaskByPage()
    },
    chooseType(type){
      this.typeClass=type
    },
    selectedHighlight({row, rowIndex}) {

    if ((this.getIndex) === row.id ) {

    return {

    "background-color": "#EBF2FC !important"

    };}},

     

    rowClick (row) {
    this.getIndex=row.id

    },    
    addWorkTime(obj){
      if(obj.status==3){
        this.$message({ // 提示失败
                    showClose: true,
                    message: '该任务已关闭，请重新选择',
                    type: "warning"
        });
        return
      }  
      if(obj.status==2){
        this.$message({ // 提示失败
                    showClose: true,
                    message: '该任务已完成，请重新选择',
                    type: "warning"
        });
        return
      }  
      if(obj.isLeaf!=1){
        this.$message({ // 提示失败
                    showClose: true,
                    message: '不能对父任务报工',
                    type: "warning"
        });
        return
      }    
         if(!this.ifMyPrinciples(obj.principalAdminCode)){
        this.$message({ // 提示失败
                    showClose: true,
                    message: '该任务不是指派给您的，无法报工',
                    type: "warning"
        });
        return
      }         
      this.selectRow=obj
      this.addWorkTimeDialog=true
    },
    updateWorkTime(obj){
      if(obj.isLeaf!=1){
        this.$message({ // 提示失败
                    showClose: true,
                    message: '无法对父任务进行该项操作，请选择子任务',
                    type: "warning"
        });
        return
      }         
      this.selectRow=obj
      this.updateWorkTimeDialog=true
    },    
    updateTask(obj){
       if(obj.status==3){
        this.$message({ // 提示失败
                    showClose: true,
                    message: '该任务已关闭',
                    type: "warning"
          });
        return
      }
      if(obj.status==2){
        this.$message({ // 提示失败
                    showClose: true,
                    message: '该任务已完成，请重新选择',
                    type: "warning"
        });
        return
      }  
      this.updateObj=obj
      this.updateTaskDialog=true 
    }, 
    deleteTask(obj){
      if(obj.status!=0){
        this.$message({ // 提示失败
                    showClose: true,
                    message: '只有未开始的任务才能删除',
                    type: "warning"
          });
        return
      }      
      this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          this.commitDelete(obj.id)
      }).catch(() => {
          this.$message({
              type: 'info',
              message: '已取消'
          });
      });
    },       
    createChildTask(obj){
      if(obj.status==3){
        this.$message({ // 提示失败
                    showClose: true,
                    message: '该任务已关闭，请重新选择',
                    type: "warning"
        });
        return
      }  
      if(obj.distributableManHours<=0){
        this.$message({ // 提示失败
                    showClose: true,
                    message: '该任务无可分配工时，请重新选择',
                    type: "warning"
        });
        return
      }  
/*       if(!this.$ifZero(obj.actualManHours)){
        this.$message({ // 提示失败
                    showClose: true,
                    message: '该任务已经存在报工，请重新选择',
                    type: "warning"
        });
        return
      } */
      this.$pushTo('/task/createChildTask',
      {
      taskId:obj.id,
      taskStatus:obj.status,
      description:obj.description,
      principalAdminName:obj.principalAdminName,
      moduleName:obj.moduleName,
      taskId:obj.id,
      parentTask:obj.name,
      planManHours:obj.planManHours,
      planStartTime:obj.planStartTime,
      planEndTime:obj.planEndTime
      })  
    },
    closeTask(obj){
      if(obj.status==3){
        this.$message({ // 提示失败
                    showClose: true,
                    message: '该任务已关闭，请重新选择',
                    type: "warning"
          });
        return
      }
      if(obj.status==2){
        this.$message({ // 提示失败
                    showClose: true,
                    message: '该任务已完成，请重新选择',
                    type: "warning"
        });
        return
      }  
      this.$confirm('确认关闭?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          this.commitClose(obj.id)
      }).catch(() => {
          this.$message({
              type: 'info',
              message: '已取消'
          });
      });
    },  
    commitDelete(id){
        let self = this;
        self.loading = true; // 显示加载中
        self.$http.post(
            "/admin/tfTask/deleteTask.d",
            {id:id},
            function (suc) {
              self.$message({
              type: 'success',
              message: '删除成功!'
              }); 
              self.refresh()                 
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
    commitClose(id){
        let self = this;
        self.loading = true; // 显示加载中
        self.$http.post(
            "/admin/tfTask/closeTask.d",
            {id:id},
            function (suc) {
              self.$message({
              type: 'success',
              message: '关闭成功!'
              }); 
              self.refresh()                 
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
    // 获取指派给我的任务
    getMyCreateTaskByPage() {
        let self = this;
        self.loading = true; // 显示加载中
        self.$http.post(
            "/admin/tfTask/listMyCreateTaskByPage.d",
            self.searchObj,
            function (suc) {
                self.myCreateTaskList = suc.body.rows; // 列表数据赋值
                self.myCreateTaskList.forEach((element)=>{
                element.level=1;  
                  if(element.isLeaf!=1){
                     element.hasChildren=true;
                  } 
                })
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
      load(tree, treeNode, resolve) {
        let self = this;
        console.log(tree)
        self.$http.post(
            "/admin/tfTask/listAllByParentId.d",
            {parentId: tree.id},
            function (suc) {
                let childTaskList = suc.body.rows; // 列表数据赋值
                childTaskList.forEach((element)=>{
                 element.level = tree.level+1
                if(element.isLeaf!=1){
                     element.hasChildren=true;
                  } 
                })
                resolve(childTaskList)
            },
            function (err) {
               resolve([])
                 self.$message({ // 提示失败
                    showClose: true,
                    message: err.result.msg,
                    type: "warning"
                });
            },
            function (serverErr) {
               resolve([])
                 self.$message({ // 提示失败
                    showClose: true,
                    message: err.result.msg,
                    type: "warning"
                });
            })
      }      
  },

};
</script>
<style lang="scss" scoped>
.myCreateTaskList-table {
  
}
.activeTask{
    text-decoration: underline;
    color:$blue
}
</style>
