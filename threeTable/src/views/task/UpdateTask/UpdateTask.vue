<!--
 * @Author: Huanghao
 * @Date: 2019-09-06 11:03:21
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-21 15:43:50
 * @Description: 
 -->
<template>
<div class="update-task w100 h100 flex column">
    <div class="bg_white pos padding2 padding-left4 no_shrink">
        <el-breadcrumb separator-class="iconfont icon-you ">
            <el-breadcrumb-item>明珞</el-breadcrumb-item>
            <el-breadcrumb-item>{{departName}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{groupName}}</el-breadcrumb-item>
            <el-breadcrumb-item><span class="navItem" @click="$backTo()">任务</span></el-breadcrumb-item>
            <el-breadcrumb-item>修改历史</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="w100 h100 rel">
       <el-dialog class="updateTaskDialog dialogCenter"  title="修改历史"  :modal-append-to-body="false" :close-on-click-modal='false'  :visible.sync="updateTaskDialog" :destroy-on-close="true">
        <UpdateTask @cancel="updateTaskDialog=false;refresh()" :updateObj="updateObj" :taskId="Number($route.query.taskId)" />
    </el-dialog>         
    
    <div class="task-status fs_13 padding2 padding-left4  flex_row_between w100">
        <span>{{updateObj.name}}</span>
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
        @click="updateTask()"
      >修改任务</el-button>     
      </div>         

    </div>
    <div class="update-task-table bg_white  margin-left4 margin-right4 border">
      <CommonTable
        :tableData="taskLogList"
        refreshFuncName="refresh"
        :default-sort="{prop: 'id', order: 'ascending'}"
      >
        <template slot="main">
          <el-table-column
            align="center"
            type=index
            label="序号"
            width="70"
            sortable
          > </el-table-column>
          <el-table-column
            align="center"
            prop="projectNumber"
            label="项目编号"
            width="100"
            sortable
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="projectName"
            label="项目名称"
            width="100"
            sortable
          > </el-table-column>
          <el-table-column
            align="center"
            prop="lineName"
            label="线体"
            width="100"
            sortable
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="moduleName"
            label="工作模块"
            width="100"
            sortable
          > </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="任务名称"
          >
          </el-table-column>
           <el-table-column
            align="center"
            prop="description"
            label="描述"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="planStartTime"
            label="计划开始时间"
            width="120"
            sortable
          > </el-table-column>
          <el-table-column
            align="center"
            prop="planEndTime"
            label="计划完成时间"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="planManHours"
            label="预计工时"
            width="80"
          > </el-table-column>
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
            prop="reason"
            label="修改原因"
            width="80"
          > </el-table-column>
          <el-table-column
            align="center"
            prop="createTime"
            label="修改时间"
            width="90"
          > </el-table-column>
        </template>

      </CommonTable>
    </div>
    </div>
</div>
</template>

<script>
import UpdateTask from "@/components/dialog/UpdateTask/UpdateTask.vue";
export default {
    name: "update-task",
    components: {
        UpdateTask,
    },
    filters: {

    },
    props: {
        
    },
    data() {
        return {
            updateTaskDialog:false,
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
                taskId:this.$route.query.taskId
            },
            taskLogList:[],
            updateObj:{},
            taskName:'',
            total: 100,
            loading:false

        }
    },
    computed: {
      ifShowUpdate(){
        if(!this.$isEmpty(this.$route.query.taskStatus)&&this.$route.query.taskStatus!=3&&this.$route.query.taskStatus!=2) {
          return true
        }else{
          return false
        }      
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
        refresh() {
            this.getTaskLog()
        },
        updateTask(){
      if(this.$route.query.taskStatus==3){
        this.$message({ // 提示失败
                    showClose: true,
                    message: '该任务已关闭，无法修改',
                    type: "warning"
        });
        return
      }  
      if(this.$route.query.taskStatus==2){
        this.$message({ // 提示失败
                    showClose: true,
                    message: '该任务已完成，无法修改',
                    type: "warning"
        });
        return
      }          
       this.updateTaskDialog=true   
        },
        // 获取任务修改记录
        getTaskLog() {
            let self = this;
            self.loading = true; // 显示加载中
            self.$http.post(
                "/admin/tfTaskLog/listByPage.d",
                self.searchObj,
                function (suc) {
                    self.taskLogList = suc.body.rows; // 列表数据赋值
                    self.updateObj=self.taskLogList[0]
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
.update-task-table {}
</style>
