<!--
 * @Author: Huanghao
 * @Date: 2019-09-06 11:03:21
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-24 11:14:10
 * @Description: 
 -->
<template>
  <div class="addChildTask w100 padding-left4 padding-right4">
    <div class="addChildTask__header w100  margin-top2 flex_row_between">
      <div class="flex_row_start">
        <div>可分配工时:<span class="cl_blue">{{remainManHours}} </span></div>
       <!--  <div class="margin-left4">计划开始日期:<span class="cl_blue">{{planStartTime}}</span></div>
        <div class="margin-left4">预计完成日期:<span class="cl_blue">{{planEndTime}}</span></div> -->
      </div>
    </div>
    <div class="addChildTask__body margin-top2">
      <table class="w100  tableForm">
        <tbody>
          <tr class="header" >
            <td width="150">序号</td>
            <td width="200">任务名称</td>
            <td width="200">任务描述</td>
            <td width="100">指派给</td>
            <td width="100">工作模块</td>
            <td width="100">计划开始时间</td>
            <td width="100">预计完成时间</td>
            <td width="80">计划投入工时</td>
            <td width="100"></td>
          </tr>
          <tr class="header cl_fblack">
            <td width="150">父任务</td>
            <td width="200">{{parentTask}}</td>
            <td width="200">{{description}}</td>
            <td width="100">{{principalAdminName}}</td>
            <td width="100">{{moduleName}}</td>
            <td width="100">{{planStartTime}}</td>
            <td width="100">{{planEndTime}}</td>
            <td width="80">{{planManHours}}</td>
            <td width="100"></td>
          </tr>
          <tr
            v-for="(item,index) in addForms"
            :key="index"
          >
            <td width="150">
              <div style="width:50px;">{{index+1}}</div></td>

            <td width="200">
              <el-input
                placeholder="输入任务名称"
                v-model="item.name"
                :maxlength="30"
                style="width: 160px"
                clearable
              >
              </el-input>
            </td>
            <td width="200">
              <el-input
                placeholder="任务描述"
                v-model="item.description"
                :maxlength="30"
                style="width: 160px"
                clearable
              >
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
               @focus="(value)=>{userFocus(value,item)}"
                @change="(value)=>{changeName(value,item,index)}"
                :remote-method="remoteMethod"
                :loading="userLoading"
              >
                <el-option
                  v-for="item in users"
                  :key="item.code"
                  :label="item.name+'-'+item.code"
                  :value="item.code"
                >
                </el-option>
              </el-select>
            </td>
            <td width="100">
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
            <td width="100">
              <el-date-picker
                v-model="item.planStartTime"
                type="date"
                :default-value="defaultDate"
                :picker-options="pickerOptions"
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
                :default-value="defaultDate"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd"
                placeholder="预计完成时间"
                @change="(value)=>{handlerDate(value,item,'planEndTime')}"
              >
              </el-date-picker>
            </td>
            <td width="80">
              <el-input
                placeholder="预计投入工时"
                v-model="item.planManHours"
                type="Number"
                clearable
              >
              </el-input>
            </td>
            <td width="100">
              <div>
                <i
                  class="iconfont icon-jia fs_20 cl_blue"
                  @click="addNode(index)"
                ></i>
                <i
                  class="iconfont icon-cha fs_20 cl_red"
                  @click="deleteNode(index)"
                ></i>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="addChildTask__footer w100  margin-top2 flex_row_center">
      <el-button
        type="primary"
        @click="save()"
      >保存</el-button>
      <el-button @click="$emit('cancel')">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
    name: "addChildTask",
    components: {

    },
    filters: {

    },
    props: {
        distributableManHours: {
            type: Number,
            default: null,
            required: true
        }
    },
    data() {
        return {
            addForms: [{
                name: '', //任务名称
                description: '', //任务描述
                principalAdminCode: '', //责任人工号
                moduleId:'',
                planStartTime: '', //计划开始时间
                planEndTime: '', //计划完成时间
                planManHours: '', //计划投入工时
            }],
            planStartTime: this.$route.query.planStartTime,
            planEndTime: this.$route.query.planEndTime,
            moduleName: this.$route.query.moduleName,
            parentTask: this.$route.query.parentTask,
            taskId: this.$route.query.parentTask,
            planManHours: this.$route.query.planManHours,
            taskStatus: this.$route.query.taskStatus,
            description: this.$route.query.description,
            principalAdminName: this.$route.query.principalAdminName,
            users: [],
            moduleList:[[]],            
            loading: false,
            userLoading: false,
            childManHours:0,
            pickerOptions:{
                    disabledDate: (time) => {
                      
                        let planStartTime = this.$moment(this.planStartTime).valueOf()
                        let planEndTime = this.$moment(this.planEndTime).valueOf()
                        return time.getTime() < planStartTime || time.getTime() > planEndTime
                    }
                }

        }
    },
    computed: {
        remainManHours() {
            return this.distributableManHours-this.childManHours
        },
       
        startPickerOptions() {
            return function () {
                return {
                    disabledDate: (time) => {
                        let planStartTime = this.$moment(this.planStartTime).valueOf()
                        let planEndTime = this.$moment(this.planEndTime).valueOf()
                        return time.getTime() < planStartTime || time.getTime() > planEndTime
                    }
                }
            }
        },
        endPickerOptions(item) {
            return function (item) {
                return {
                    disabledDate: (time) => {
                        let planStartTime = this.$moment(this.planStartTime).valueOf()
                        let planEndTime = this.$moment(this.planEndTime).valueOf()
                        return time.getTime() < planStartTime || time.getTime() > planEndTime ||
                            time.getTime() < this.$moment(item.planStartTime).valueOf()
                    }
                }
            }
        },
        defaultDate() {
            return this.$moment(this.planStartTime).toDate()
        }

    },
    watch: {
      addForms:{
         handler: function(newValue, oldValue) {
           this.childManHours=0;
          newValue.forEach(element => {
              if(!this.$isEmpty(element.planManHours)){
                this.childManHours=this.childManHours+Number(element.planManHours)
              }
              
          });
        },
        // 深度观察监听
        deep: true,
        immediate: true
      }
    },
    created() {

    },
    methods: {
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
        async remoteMethod(query) {
            console.log(query);
            if (query !== '') {
                this.userLoading = true;
                this.users = await this.$api.common.getNativeUser({
                    name: query
                })
                this.userLoading = false;
            } else {
                this.users = [];
            }
        },
        async userFocus(value,item){
            console.log('ssdfsdfd')
            this.users=await this.$api.common.getNativeUser()
        },        
        addNode(index) {
            let newNode = {
                principalAdminCode: '', //责任人工号
                name: '', //任务名称
                moduleId:'',
                description: '', //任务描述
                planStartTime: '', //计划开始时间
                planEndTime: '', //计划完成时间
                planManHours: '', //计划投入工时
            }
            this.addForms.splice(index+1,0,newNode)
           
            this.moduleList.splice(index+1,0,[])
        },
        deleteNode(index) {
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
        save() {
            let nameMap={
                'name':'任务名称',
                'description':'任务描述',
                'principalAdminCode':'责任人',
                 'moduleId':'工作模块',
                 'planStartTime':'计划开始时间',
                'planEndTime':'计划完成时间',
                'planManHours':'计划投入工时'
            }    
            for(let i=0;i<this.addForms.length;i++){
                let element=this.addForms[i]
                for (let key in element) {
                    if (this.$isEmpty(element[key])&&key!='description'&&key!='planManHours') {
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
                "/admin/tfTask/addChildTasks.d", {
                    tfTasksStr: JSON.stringify(self.addForms),
                    parentId: self.$route.query.taskId
                },
                function (suc) {
                    self.$message({ // 提示成功
                        showClose: true,
                        message: "新增成功",
                        type: "success"
                    });
                    self.loading = false; // 隐藏加载中
                    self.$emit("cancel")
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

        }
        
    },

};
</script>

<style lang="scss">
.addChildTask {
  .el-input {
    width: 120px;
  }

  &__body {
    min-height: 200px;
  }

  tr {
    height: 30px;
  }

  td {
    vertical-align: middle;
    height: 20px;
  }
}
</style>
