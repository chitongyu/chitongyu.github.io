<!--
 * @Author: Huanghao
 * @Date: 2019-09-23 10:00:13
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-23 15:12:34
 * @Description: 
 -->
<template>
<!-- 任务修改记录 -->
  <div
    class="TaskLogReport w100 h100 flex column"
    v-loading="loading"
  >
    <NoPerimission v-if="!btPermissions['/backend/taskLogReport']" />
  <template v-else>
    <div class="header w100">
      <el-row
        :gutter="5"
        class="row1 padding1"
      >
      <el-col :span="4">
          <el-input
            placeholder="请输入项目编号"
            v-model.trim="projectNumber"
            clearable
            name="admin-projectNumber"
          ></el-input>
        </el-col>
        <el-col :span="4">
          <el-input
            placeholder="请输入项目名称"
            v-model.trim="projectName"
            clearable
            name="admin-projectName"
          ></el-input>
        </el-col>
        <el-col :span="5">
          <el-cascader
            :options="org"
            :props="{value:'id',label:'name',checkStrictly: true}"
            @change="handleSelectChange"
            clearable
            filterable
            placeholder="请选择部门或班组"
            ref="org"
            v-model.trim="team"
          ></el-cascader>
        </el-col>
        <el-col
          :span="15"
          class="col1"
        >
          <span class="fs_14">修改日期范围:</span>
          <el-col :span="4">
            <el-date-picker
              placeholder="选择日期"
              type="date"
              v-model.trim="startCreateTime"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-col>
          <el-col :span="4">
            <el-date-picker
              placeholder="选择日期"
              type="date"
              v-model.trim="endCreateTime"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-col>
          <el-col :span="1.5">
            <el-button
              :style="{'background-color':bgColor.selectBt,'border-color':bgColor.selectBt }"
              @click="search()"
              size="small"
              type="primary"
              v-show="btPermissions['/backend/taskLogReport/select']"
            >搜索</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              :style="{'background-color':bgColor.clearBt,'border-color':bgColor.clearBt }"
              @click="clearOut()"
              size="small"
              type="primary"
            >清除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              :disabled="btnDiable()"
              :style="{'background-color':bgColor.updateBt,'border-color':bgColor.updateBt }"
              @click="exportExcel()"
              size="small"
              type="primary"
              v-show="btPermissions['/backend/taskLogReport/export']"
            >导出搜索内容</el-button>
          </el-col>
        </el-col>
      </el-row>
      <el-row
        :gutter="5"
        class="row2"
      ></el-row>
    </div>
    <!-- -----------------------------------------------------表格 -->
    
    <div class="bg_white w100 h100" >
      <NoData v-if="adminList.length==0" />
      <CommonTable
        v-else
        :default-sort="{prop: 'id', order: 'ascending'}"
        :ifStripe="true"
        :pageSizeNum="10"
        :tableData="adminList"
        border
        highlight-current-row
        refreshFuncName="getAdminList"
        style="width:100%"
        max-height="600"
      >
        <template slot="main">
          <el-table-column
            align="center"
            label="序号"
            prop="rowNum"
            width="60"
          ></el-table-column>
          <el-table-column
            align="center"
            label="项目类型"
            prop="projectType"
          ></el-table-column>
          <el-table-column
            align="center"
            fixed
            label="项目编号"
            prop="projectNumber"
            width="100"
          ></el-table-column>
          <el-table-column
            align="center"
            label="项目名称"
            prop="projectName"
            width="400"
          ></el-table-column>
          <el-table-column
            align="center"
            label="项目经理"
            prop="managerName"
          ></el-table-column>
          <el-table-column
            align="center"
            label="线体"
            prop="lineName"
            width="200"
          ></el-table-column>
          <el-table-column
            align="center"
            label="工作模块"
            prop="moduleName"
          ></el-table-column>
          <el-table-column
            align="center"
            label="任务名称"
            prop="taskName"
            width="300"
          ></el-table-column>
          <el-table-column
            align="center"
            label="计划开始日期 "
            prop="planStartTime"
            width="100"
          ></el-table-column>
          <el-table-column
            align="center"
            label="要求完成日期"
            prop="planEndTime"
            width="100"
          ></el-table-column>
          <el-table-column
            align="center"
            label="预计投入工时"
            width="100"
            prop="planManHours"
          ></el-table-column>
          <el-table-column
            align="center"
            label="负责人"
            prop="principalAdminName"
          ></el-table-column>
          <el-table-column
            align="center"
            label="负责人工号"
            width="90"
            prop="principalAdminCode"
          ></el-table-column>
          <el-table-column
            align="center"
            label="负责人部门"
            width="90"
            prop="deptName"
          ></el-table-column>
          <el-table-column
            align="center"
            label="负责人班组"
            width="90"
            prop="groupName"
          ></el-table-column>
          <el-table-column
            align="center"
            label="任务修改类型"
            width="100"
            prop="operate"
          ></el-table-column>
          <el-table-column
            align="center"
            label="任务创建日期"
            prop="taskCreateTime"
            width="180"
          ></el-table-column>
          <el-table-column
            align="center"
            label="任务修改日期"
            prop="logCreateTime"
            width="180"
          ></el-table-column>
          <el-table-column
            align="center"
            label="任务修改原因"
            min-width="200"
            prop="reason"
          ></el-table-column>
        </template>
      </CommonTable>
    </div>
  </template>
  </div>
</template>

<script>
import { log } from 'util';
export default {
    name: "TaskReport",
    components: {

    },
    filters: {

    },
    props: {

    },
    data() {
        return {
            searchObj: { //请求参数对象
                page: 1, //第几页 页码
                pageSize: 10, //页码大小,一页显示多少条
                projectName: '',//项目名称
                projectNumber: '',//项目编号
                projectType: '',//项目类型
                deptName: '',//部门名称
                groupName: '',//班组名称
                startCreateTime: '',//开始，修改日期
                endCreateTime: '',//完成，修改日期
                // token: ''
            },
            projectName: '',//项目名称
            projectNumber: '',//项目编号
            projectType: '',//项目类型
            deptName: '',//部门名称
            groupName: '',//班组名称
            startCreateTime: '',//开始，修改日期
            endCreateTime: '',//完成，修改日期
            loading: false, //控制加载中显示
            adminList: [], //表格数据列表
            projectTypeList:[],
            selectedOrg: [],
            // projectTypeList: [],//项目类型
            org: [],//组织结构数据
            team: '',//部门/班组
            total: null, //一共有多少条数据、
            exportStatus: true,
            dictValue: "PROJECT_TYPE", //项目类型默认值
            departType: "1", //组织类型，部门
            pickerOptions: {
              disabledDate: this.disabledDate
            }
        }
    },
    computed: {

    },
    watch: {

    },
    async created() {
        // this.getAdminList();
      this.getAllList();
    },
    methods: {
         //导出
        btnDiable() {
          return this.exportStatus;
        },
        // 搜索
        search() {
          this.searchObj.page = 1;
          this.searchObj.projectName = this.projectName;
          this.searchObj.projectNumber = this.projectNumber;
          this.searchObj.projectType = this.projectType;
          this.searchObj.deptName = this.deptName;
          this.searchObj.groupName = this.groupName;
          this.searchObj.startCreateTime = this.startCreateTime;
          this.searchObj.endCreateTime = this.endCreateTime;
          if(this.projectName==''&&this.projectNumber==''&&this.projectType==''&&this.deptName==''&&this.startCreateTime==''&&this.endCreateTime==''){
            this.$message({ // 提示输入条件
                        showClose: true,
                        message: "请输入搜索条件",
                        type: "warning"
                    });
            this.adminList = [];
            this.exportStatus = true;
            return;
          }
          else{
            this.exportStatus = false;
            this.getAdminList();
          }
        },
        clearOut() {
            this.searchObj = {
                page: 1, //第几页 页码
                pageSize: 10, //页码大小,一页显示多少条
            }
            this.projectName = '';
            this.projectNumber = '';
            this.projectType = '';
            this.deptName = '';
            this.groupName = '';
            this.startCreateTime = '';
            this.endCreateTime = '';
            this.searchObj.endCreateTime = '';
            this.team = '';
            this.adminList = [];
            this.exportStatus = true;
        },
        refresh() {
            this.clearOut();
            this.getAdminList();
        },
        // 获取项目列表
        getAdminList() {
            let self = this;
            self.loading = true; // 显示加载中
            self.$http.post(
                "/admin/report/taskLogReportByPage.d",
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
        //导出
        exportExcel() {
          let self = this;
          const token = this.$store.getters['user/getToken'];
          console.log('self.searchObj');
          console.log(self.searchObj);
          let url= "/admin/report/taskLogReportExport.d?deptName="+self.searchObj.deptName+
          "&groupName="+self.searchObj.groupName+
          "&projectName="+self.searchObj.projectName+
          "&projectNumber="+self.searchObj.projectNumber+
          "&startCreateTime="+self.searchObj.startCreateTime+
          "&endCreateTime="+self.searchObj.endCreateTime+
          "&token="+token; 
          window.location.href = url;
        },
        disabledDate(time) {
          let dateStr = this.$dateFormat(this.startCreateTime,"YYYY-MM-DD");
          let date = new Date(dateStr.replace(/-/,"/"));
          return time.getTime() < date
        },
        async getAllList(){
          let self = this;
          //项目类型
          // self.projectTypeList = await this.$api.common.getDictionary({
          //       parentDictValue: self.dictValue
          //   }); 
          self.org = await this.$api.common.getOrg()
        },
        handleSelectChange(){
          let self = this;
           if(self.$refs.org.getCheckedNodes().length != 0){
            self.searchObj.deptName = self.$refs.org.getCheckedNodes()[0].pathLabels[0];
            self.searchObj.groupName = self.$refs.org.getCheckedNodes()[0].pathLabels[1];
            self.deptName = self.searchObj.deptName;
            self.groupName = self.searchObj.groupName;
          }else{
            self.searchObj.deptName = '';
            self.searchObj.groupName = '';
            self.deptName = '';
            self.groupName = '';
          }
        },
        async remoteMethod(query){
          let self = this;
          if(query!=''){
            self.selectLoading = true;
            self.projectList = await this.$api.common.getProject({
              values:query
            }); 
            self.selectLoading = false;
          }else{
            self.projectList = [];
          }
        },
        async remoteMethodDefault(){
          let self = this;
          self.selectLoading = true;
          self.projectList = await this.$api.common.getProject(); 
          self.selectLoading = false;
        }
    }

};
</script>

<style lang="scss" scoped>
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 150px;
  }
  .el-col-4 {
    width: 125px;
  }
  .el-col-6 {
    width: 150px;
  }
  .dateFromTo {
    float: left;
  }
  .el-col-2 {
      width: 90px;
  }
  .el-col-5 {
    width: 125px;
    height: 34px;
  }
</style>
