<!--
 * @Author: Huanghao
 * @Date: 2019-09-06 11:03:21
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-25 02:23:24
 * @Description: 
 -->
<template>
<div class="create-task w100 rel">
    <div class="bg_white pos padding2 padding-left4">
        <el-breadcrumb separator-class="iconfont icon-you ">
            <el-breadcrumb-item>明珞</el-breadcrumb-item>
            <el-breadcrumb-item>{{departName}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{groupName}}</el-breadcrumb-item>
             <el-breadcrumb-item><span class="navItem" @click="$backTo()">任务</span></el-breadcrumb-item>
            <el-breadcrumb-item>批量创建任务</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="task-status fs_13 padding2 padding-left4  flex_row_between">
        <span>批量创建</span>
        <div class="flex_row_start">
          <el-button
        type="primary"
        class="fs_13 margin-right4 flex_row_center" 
        icon="icon-fanhui iconfont fs_13"
        @click="$backTo()"
      >返回</el-button>
      </div>        
    </div>
    <div v-loading="loading" class="create-task-table bg_white  margin-left4 margin-right4 border">
        <table class="w100  tableForm">
            <tbody>
            <tr class="header">
            <td width="50">序号</td>
            <td width="150">项目编号</td>
            <td width="100">线体</td>
            <td width="100">指派给</td>
            <td width="150">工作模块</td>
            <td width="200">任务名称</td>
            <td width="200">任务描述</td>
            <td width="100">计划开始时间</td>
            <td width="100">预计完成时间</td>
            <td width="100">计划投入工时(h)</td>
            <td width="100"></td>
            </tr>
            <tr v-for="(item,index) in addForms" :key="index">
            <td width="50">{{index+1}}</td>
            <td width="150">
                <el-select
                    v-model="item.projectNumber"
                    clearable 
                    filterable
                    remote
                    reserve-keyword
                    :remote-method="projectRemoteMethod"
                    :loading="projectLoading"
                    placeholder="请输入项目编号"
                    @focus="(value)=>{projectFocus(value,item)}"
                    >
                    <el-option
                    v-for="item in projectList"
                    :key="item.sapCode"
                    :label="item.projectNumber+'-'+item.projectName"
                    :value="item.projectNumber">
                    </el-option>
                </el-select> 
            </td>
            <td width="120">
                <el-input
                placeholder="输入线体名"
                v-model="item.lineName"
                :maxlength="20"
                clearable>
                </el-input>
            </td>
            <td width="100">
                <el-select
                    v-model="item.principalAdminCode"
                    clearable 
                    filterable
                    remote
                    reserve-keyword
                    placeholder="输入姓名"
                    @change="(value)=>{changeName(value,item,index)}"
                    @focus="(value)=>{userFocus(value,item)}"
                    :remote-method="remoteMethod"
                    :loading="userLoading">
                    <el-option
                    v-for="item in users"
                    :key="item.code"
                    :label="item.name+'-'+item.code"
                    :value="item.code">
                    </el-option>
                </el-select>                
            </td>
            <td width="150">
                <el-select
                    v-model="item.moduleId"
                    clearable 
                    filterable
                    placeholder="选择模块"
                    @focus="(value)=>{moduleFocus(value,item)}"
                    >
                    <el-option
                    v-for="item in moduleList[index]"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select> 
            </td>
            <td width="250">
                <el-input
                placeholder="输入任务名称"
                v-model="item.name"
                :maxlength="20"
                clearable>
                </el-input>                
            </td>
            <td width="250">
                <el-input
                placeholder="任务描述"
                v-model="item.description"
                :maxlength="30"
                clearable>
                </el-input>                
            </td>
            <td width="100">
                <el-date-picker
                v-model="item.planStartTime"
                type="date"
                style="width:100px"
                value-format="yyyy-MM-dd"
                placeholder="计划开始时间"
                @change="(value)=>{handlerDate(value,item,'planStartTime')}"
            >
                </el-date-picker>                
            </td>
            <td width="100">
                <el-date-picker
                v-model="item.planEndTime"
                type="date"
                style="width:100px"
                value-format="yyyy-MM-dd"
                placeholder="预计完成时间"
                 @change="(value)=>{handlerDate(value,item,'planEndTime')}"
                
            >
                </el-date-picker>                
            </td>
            <td width="100">
                <el-input
                placeholder="预计投入工时"
                v-model="item.planManHours"
                style="width:100px"
                type="Number"
                clearable>
                </el-input>
            </td>
            <td width="100">
                <div>
                    <i class="iconfont icon-jia fs_20 cl_blue" @click="addNode(index)"></i>
                    <i class="iconfont icon-cha fs_20 cl_red" @click="deleteNode(index)"></i>
                </div>
            </td>
            </tr>
            </tbody>
        </table>
        <div class="w100 flex_row_center padding1">
            <el-button type="primary" @click="save()">保存</el-button>
            <el-button  @click="$backTo">返回</el-button>            
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "create-task",
    components: {
        
    },
    filters: {

    },
    props: {

    },
    data() {
        return {
            departName: this.$store.getters['user/getInfo'] && this.$store.getters['user/getInfo'].deptName,
            groupName: this.$store.getters['user/getInfo'] && this.$store.getters['user/getInfo'].groupName,
            departId:this.$store.getters['user/getInfo'] && this.$store.getters['user/getInfo'].deptId,
            groupId: this.$store.getters['user/getInfo'] && this.$store.getters['user/getInfo'].groupId,
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
            total: 100,
            taskStatus: 0,
            addForms: [{
                projectNumber: '', 
                lineName:'',//线体
                principalAdminCode:'',//责任人工号
                moduleId:'',//工作模块
                name:'',//任务名称  
                description: '', //任务描述
                planStartTime:'',//计划开始时间
                planEndTime:'',//计划完成时间
                planManHours:'',//计划投入工时
            }],
            users:[],
            list:[],
            moduleList:[[]],  
            projectList:[],
            loading:false,
            userLoading:false,
            projectLoading:false,

        }
    },
    computed: {

    },
    watch: {

    },
    async created() {
        console.log(this.$store.getters['user/getInfo'], 'saadasd')
        console.log(this.$lodash.compact([0, 1, false, 2, '', 3]));
        // [16, 64]
        
        //this.projectList= await this.$api.common.getProject()
    },
    methods: {
        refresh() {

        },
       handlerDate(value,item,type){
          console.log('ssss',value,item)
          if(this.$moment(item.planEndTime).valueOf()<this.$moment(item.planStartTime).valueOf()){
            item[type]=''
            this.$message({ // 提示失败
                        showClose: true,
                        message: '预计完成时间不能小于计划开始时间',
                        type: "warning"
                    });
          }
        },        
        async changeName(value,item,index){
         item.moduleId=null;
          this.$set(this.moduleList,index,await this.$api.common.getModule({values:value}))
        },
        moduleFocus(value,item){
            if(this.$isEmpty(item.principalAdminCode)){
                this.$message({ // 提示失败
                showClose: true,
                message: '请先选择指派人',
                type: 'warning'
                })                
            }
            console.log("sss")
        },
        async userFocus(value,item){
            console.log('ssdfsdfd')
            this.users=await this.$api.common.getNativeUser()
        },
        async projectFocus(value,item){
            console.log('ssdfsdfd')
            this.projectList=await this.$api.common.getProject()
        },
        async remoteMethod(query){
            console.log(query);
            if (query !== '') {
             this.userLoading = true;
             this.users=await this.$api.common.getNativeUser({name:query})
             this.userLoading = false;
            } else {
                this.userLoading = true;
                this.users=await this.$api.common.getNativeUser({name:query})
                this.userLoading = false;
            }            
        },
        async projectRemoteMethod(query){
            console.log(query);
            if (query !== '') {
             this.projectLoading = true;
             this.projectList=await this.$api.common.getProject({values:query})
             this.projectLoading = false;
            } else {
              this.projectList = [];
            }            
        },
        addNode (index) {
          let beforeNode= this.addForms[index]
          let newNode={
                projectNumber: beforeNode.projectNumber,
                lineName:beforeNode.lineName,//线体
                principalAdminCode:beforeNode.principalAdminCode,//责任人工号
                moduleId:beforeNode.moduleId,//工作模块
                name:'',//任务名称
                description: '', //任务描述
                planStartTime:beforeNode.planEndTime,//计划开始时间
                planEndTime:'',//计划完成时间
                planManHours:'',//计划投入工时
          }
          this.addForms.splice(index+1,0,newNode)
          let newModuleList=JSON.parse(JSON.stringify(this.moduleList[index])) 
          this.moduleList.splice(index+1,0,newModuleList)
        },
        deleteNode (index) {
          if (this.addForms.length > 1) {
            this.addForms.splice(index, 1)
            this.moduleList.splice(index, 1)
          } else {
            this.$message({ // 提示失败
              showClose: true,
              message: '不能再删除了',
              type: 'warning'
            })
          }
        },  
        save(){
            let tipStr=''

            let nameMap={
                'projectNumber':'项目编号',
                'lineName':'线体',
                'moduleId':'工作模块',
                'principalAdminCode':'责任人',
                'name':'任务名称',
                'description':'任务描述',
                'lineName':'线体',
                'planStartTime':'计划开始时间',
                'planEndTime':'计划完成时间',
                'planManHours':'计划投入工时'
            }
            console.log(this.addForms)
            for(let i=0;i<this.addForms.length;i++){
                let element=this.addForms[i]
                element.departmentId=this.departId;
                element.groupId=this.groupId;
                for (let key in element) {
                    if (this.$isEmpty(element[key])&&key!='lineName'&&key!='description'&&key!='planManHours') {
                        this.$message({ // 提示失败
                            showClose: true,
                            message: '请填写完整'+nameMap[key],
                            type: 'warning'
                        })
                        return
                    }else{
                    if(key=='planManHours'){
                        if(element['planManHours']<=0){
                        this.$message({ // 提示失败
                            showClose: true,
                            message: '计划投入工时范围必须大于0',
                            type: 'warning'
                        })
                        return                      
                        }                          
                    }
                    }
                    
                  
                }              
            }             
            this.$confirm('确认提交?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                
            this.commitAdd()
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消'
            });          
            });            
        },
        //确认新增
        commitAdd() {
            let self = this;
            let temp = true
            self.loading = true; // 显示加载中
            self.addDialogFormVisible = false; // 关闭修改对话框     
            self.$http.post(
                "/admin/tfTask/adds.d",
                {tfTasksStr: JSON.stringify(self.addForms)},
                function (suc) {
                    self.$message({ // 提示成功
                        showClose: true,
                        message: "新增成功",
                        type: "success"
                    });
                    self.loading = false; // 隐藏加载中
                    self.$backTo()
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
                    self.loading = false; // 隐藏加载中sssss
                }
            );
              
        },        
    },

};
</script>

<style lang="scss" scoped>
.create-task-table {}
</style>
