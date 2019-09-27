<!--
 * @Author: Huanghao
 * @Date: 2019-09-06 11:03:21
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-17 10:12:55
 * @Description: 
 -->
<template>
  <div class="mytask w100 h100 flex column">
     
    <div class="bg_white pos padding2 padding-left4 no_shrink">
      <el-breadcrumb separator-class="iconfont icon-you ">
        <el-breadcrumb-item>明珞</el-breadcrumb-item>
        <el-breadcrumb-item>{{departName}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{groupName}}</el-breadcrumb-item>
        <el-breadcrumb-item>任务</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="w100 rel h100">
      <el-dialog class="addWorkTimeDialog dialogCenter" title="添加报工" :modal-append-to-body="false" :close-on-click-modal='false'  :visible.sync="addWorkTimeDialog">
        <AddWorkTime @cancel="addWorkTimeDialog=false;"/>
    </el-dialog>   
    <el-dialog class="updateWorkTimeDialog dialogCenter" title="修改报工" :modal-append-to-body="false" :close-on-click-modal='false'  :visible.sync="updateWorkTimeDialog">
        <UpdateWorkTime @cancel="updateWorkTimeDialog=false;"/>
    </el-dialog> 
    <div class="flex_row_start padding-left4 margin-top1">
      <div class="poi" @click="chooseType('giveMe')" :class="typeClass=='giveMe'?'activeTask':''">指派给我的任务</div>
      <div class="margin-left4 poi"  @click="chooseType('mycreate')" :class="typeClass=='mycreate'?'activeTask':''">我创建的任务</div>
    </div>
    <div class="task-status  padding2 padding-left4  flex_row_between">
      <el-radio-group v-model="taskStatus">
        <el-radio :label="0">全部</el-radio>
        <el-radio :label="1">进行中</el-radio>
        <el-radio :label="2">已完成</el-radio>
        <el-radio :label="3">未开始</el-radio>
        <el-radio :label="4">已延期</el-radio>
      </el-radio-group>
      <el-button
        type="primary"
        class="fs_13 margin-right4" 
        icon="icon-jia iconfont fs_16"
        @click="$pushTo('/task/createTask')"
      >批量创建</el-button>
    </div>
    <div class="mytask-table bg_white  margin-left4 margin-right4">
      <CommonTable
        :tableData="tableData"
        refreshFuncName="refresh"
        
        :default-sort="{prop: 'id', order: 'ascending'}"
      >
        <template slot="main">
          <el-table-column
            align="center"
            prop="id"
            label="ID"
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
            prop="moduleId"
            label="工作模块"
            width="100"
            sortable
          > </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="任务名称"
            width="200"
            sortable
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
            prop="name"
            label="预计"
            width="70"
            sortable
          > </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="消耗"
            width="70"
            sortable
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="剩余"
            width="70"
            sortable
          > </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="进度"
            width="70"
            sortable
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="principalAdminCode"
            label="指派给"
            width="80"
            sortable
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="创建人"
            width="80"
            sortable
          > </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="状态"
            width="70"
            sortable
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop=""
            label="操作"
            width="150"
            sortable
            fixed="right"
          >
          <template>
            <el-tooltip class="item" effect="dark" content="新增报工" placement="bottom-start">
             <i class="iconfont icon-shijian fs_20 cl_blue" @click="addWorkTimeDialog=true"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="查看报工" placement="bottom-start">
             <i class="iconfont icon-bianji1 fs_20 cl_blue" @click="updateWorkTimeDialog=true"></i>
            </el-tooltip>
             <el-tooltip class="item" effect="dark" content="查看子任务" placement="bottom-start">
             <i class="iconfont icon-zuzhi fs_20 cl_blue" @click="$pushTo('/task/createChildTask')"></i>
             </el-tooltip>
             <el-tooltip class="item" effect="dark" content="查看任务" placement="bottom-start">
             <i class="iconfont icon-wancheng fs_20 cl_blue" @click="$pushTo('/task/updateTask')"></i>
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
export default {
  name: "myTask",
  components: {
    AddWorkTime,
    UpdateWorkTime
  },
  filters:{

  },
  props:{

  },
  data(){
    return{
      typeClass:'giveMe',
      departName:this.$store.getters['user/getInfo']&&this.$store.getters['user/getInfo'].deptName,
      groupName:this.$store.getters['user/getInfo']&&this.$store.getters['user/getInfo'].groupName,
      tableData:[{id:2,name:'test',value:1},{id:1,name:'test',value:1}],
      searchObj:{
          page: 1, // 第几页 页码
          pageSize: 15, // 页码大小,一页显示多少条
      },
      total:100,
      taskStatus:0,
      addWorkTimeDialog:false,
      updateWorkTimeDialog:false,
      myPrincipalTaskList:[],
      myPrincipalTaskSearchObj:{
        page: 1, //第几页 页码
        pageSize: 15, //页码大小,一页显示多少条
      }

        
    }
  },
  computed:{

  },
  watch:{
    
  }, 
  created(){
    console.log(this.$store.getters['user/getInfo'],'saadasd')
    console.log(this.$lodash.compact([0, 1, false, 2, '', 3]))
     // [16, 64]
   
  },
  methods:{
    refresh(){
        
    },
    chooseType(type){
      this.typeClass=type
    },
    // 获取指派给我的任务
    getMyPrincipalTaskByPage() {
        let self = this;
        self.loading = true; // 显示加载中
        self.$http.post(
            "/admin/tfTask/listMyPrincipalTaskByPage.d",
            self.searchObj,
            function (suc) {
                self.myPrincipalTaskList = suc.body.rows; // 列表数据赋值
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
.mytask-table {
  
}
.activeTask{
    text-decoration: underline;
    color:$blue
}
</style>
