<!--
 * @Author: Huanghao
 * @Date: 2019-09-06 11:03:21
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-21 15:40:21
 * @Description: 
 -->
<template>
<div class="create-child-task w100 h100 rel flex column">
    <div class="bg_white pos padding2 padding-left4 no_shrink">
        <el-breadcrumb separator-class="iconfont icon-you ">
            <el-breadcrumb-item>明珞</el-breadcrumb-item>
            <el-breadcrumb-item>{{departName}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{groupName}}</el-breadcrumb-item>
            <el-breadcrumb-item><span class="navItem" @click="$backTo()">任务</span></el-breadcrumb-item>
            <el-breadcrumb-item>子任务</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
     <div class="w100 h100 rel">
       <el-dialog class="updateTaskDialog dialogCenter"  title="修改任务"  :modal-append-to-body="false" :close-on-click-modal='false'  :visible.sync="updateTaskDialog"  :destroy-on-close="true">
        <UpdateTask @cancel="updateTaskDialog=false;refresh()" :updateObj="updateObj" :taskId="childTaskId" />
    </el-dialog>        
       <el-dialog class="addChildTaskDialog dialogCenter" title="添加子任务" :modal-append-to-body="false" :close-on-click-modal='false'  :visible.sync="addChildTaskDialog" :destroy-on-close="true">
        <AddChildTask @cancel="addChildTaskDialog=false;refresh()" :distributableManHours="distributableManHours"/>
    </el-dialog>         
    <div class="task-status fs_13 padding2 padding-left4  flex_row_between">
        <span>父任务：{{$route.query.parentTask}}</span>
        <div class="flex_row_start">
          <el-button
        type="primary"
        class="fs_13 flex_row_center" 
        icon="icon-fanhui iconfont fs_13"
        @click="$backTo()"
      >返回</el-button>
        <el-button
        type="primary"
        class="fs_13 margin-right4" 
        @click="addChildTaskDialog=true"
      >添加子任务</el-button>
      </div>
    </div>
    <div class="create-child-task-table bg_white  margin-left4 margin-right4 border">
      <el-table
        :data="childTaskList"
      >
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
            prop="departmentName"
            label="部门"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="groupName"
            label="小组"
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
            prop="planManHours"
            label="预计"
            width="70"
            
          > 
          <template slot-scope="{row}">
            {{$toInt(row.planManHours)}}
          </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="actualManHours"
            label="消耗"
            width="70"
            
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
            prop="principalAdminName"
            label="指派给"
            width="80"
            
          >
          </el-table-column>
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
            width="60"
            fixed="right"
            
          >
          <template slot-scope="{row}">
              {{row.status|taskStatus}}
          </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop=""
            label="操作"
            width="80"
            fixed="right"
          >
          <template slot-scope="{row}">
            <el-tooltip class="item" effect="dark"  v-if="showUpdate(row.createAdminCode)" content="修改任务" placement="bottom-start">
            <i class="iconfont icon-bianji1 fs_20 "  :class="row.status==3||row.status==2?'cl_grey':'cl_blue'"  @click="updateTask(row)"></i>
            </el-tooltip>
             <el-tooltip class="item" effect="dark"  v-if="showUpdate(row.createAdminCode)" content="删除任务" placement="bottom-start">
              <i class="iconfont icon-cha fs_20" :class="row.status==0?'cl_blue':'cl_grey'"  @click="deleteTask(row)"></i>
             </el-tooltip>         
          </template>
          </el-table-column>         
      </el-table>
    </div>
     </div>
</div>
</template>

<script>
import AddChildTask from "@/components/dialog/AddChildTask/AddChildTask.vue";
import UpdateTask from "@/components/dialog/UpdateTask/UpdateTask.vue";
export default {
    name: "create-child-task",
    components: {
        AddChildTask,UpdateTask
    },
    filters: {

    },
    props: {

    },
    data() {
        return {
            addChildTaskDialog:false,
            departName: this.$store.getters['user/getInfo'] && this.$store.getters['user/getInfo'].deptName,
            groupName: this.$store.getters['user/getInfo'] && this.$store.getters['user/getInfo'].groupName,
            tableData: [{
                id: 2,
                name: 'test',
                value: 1
            }, {
                id: 1,
                name: 'test',
                value: 1
            }],
            searchObj: {
                page: 1, // 第几页 页码
                pageSize: 15, // 页码大小,一页显示多少条
            },
            updateObj:{},
             updateTaskDialog:false,
            updateForm: {
                id: '',
                projectNumber: '',
                principalAdminCode: '', //责任人工号
                moduleId: '', //工作模块
                name: '', //任务名称
                description: '', //任务描述
                lineName: '', //线体
                planStartTime: '', //计划开始时间
                planEndTime: '', //计划完成时间
                planManHours: '', //计划投入工时
            },
            updateRuleForm: {

                projectNumber: [{
                    required: true,
                    message: "请输入项目编号"
                }],
                moduleId: [{
                    required: true,
                    message: "请选择模块"
                }],
                name: [{
                    required: true,
                    message: "请输入任务名称"
                }],
                description: [{
                    required: true,
                    message: "请输入任务描述"
                }],
                roleId: [{
                    required: true,
                    message: "请输入角色"
                }],
                planStartTime: [{
                    required: true,
                    message: "请选择计划开始时间"
                }],
                planEndTime: [{
                    required: true,
                    message: "请选择计划结束时间"
                }],
                planManHours: [{
                    required: true,
                    message: "请输入预计投入工时"
                }],
                principalAdminName: [{
                    required: true,
                    message: ""
                }],
                reason: [{
                    required: true,
                    message: "请输入修改原因"
                }],

            },            
            total: 100,
            taskStatus: 0,
            childTaskId:null,
            list:[],
            childTaskList:[],
            loading:false

        }
    },
    computed: {
      distributableManHours(){
        let p=this.$route.query.planManHours
        let childManHours=this.childTaskList.reduce((total, currentValue)=>{
          return total+currentValue.planManHours
        },0)
        console.log(p,childManHours)
        return Number(p)-childManHours
      }
    },
    watch: {

    },
    created() {
        console.log(this.$store.getters['user/getInfo'], 'saadasd')
        console.log(this.$lodash.compact([0, 1, false, 2, '', 3]))
        // [16, 64]
        this.refresh()

    },
    methods: {
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
        this.updateObj=obj; // 浅拷贝选择对象
        this.childTaskId=obj.id
        console.log(obj)
        this.updateTaskDialog=true
      },
      showUpdate(code){
        let loginCode=this.$store.getters['user/getInfo']?this.$store.getters['user/getInfo'].sapCode:'';
        if(loginCode==code) return true
        else return false

      },      
        refresh() {
          this.getAllTaskByParentId()
        },
    // 获取指派给我的任务
    getAllTaskByParentId() {
        let self = this;
        self.loading = true; // 显示加载中
        self.$http.post(
            "/admin/tfTask/listAllByParentId.d",
            {parentId:this.$route.query.taskId},
            function (suc) {
                self.childTaskList = suc.body.rows; // 列表数据赋值
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
        
    },

};
</script>

<style lang="scss" scoped>
.create-child-task-table {}
</style>
