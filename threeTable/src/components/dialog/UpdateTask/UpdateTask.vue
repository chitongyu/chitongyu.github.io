<!--
 * @Author: Huanghao
 * @Date: 2019-09-06 11:03:21
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-24 16:56:11
 * @Description: 
 -->
<template>
  <div class="compName w100">
    <el-form
      :model="updateForm"
      :rules="updateRuleForm"
      ref="updateRuleForm"
      status-icon
      label-width="100px"
    >

      <el-form-item
        label="项目编号"
        prop="projectNumber"
      >
        <el-input
          :maxlength="50"
          v-model.trim="updateForm.projectNumber"
          placeholder="请项目编号"
          name="projectNumber"
          :disabled="true"
          auto-complete="off"
        ></el-input>
      </el-form-item>
       <el-form-item
        label="项目名称"
        prop="projectNumber"
      >
        <el-input
          :maxlength="50"
          v-model.trim="updateForm.projectName"
          placeholder="项目名称"
          name="projectName"
          :disabled="true"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="工作模块"
        prop="name"
      >
        <el-input
          :maxlength="50"
          v-model.trim="updateForm.moduleName"
          placeholder=""
          name="moduleName"
          :disabled="true"
          auto-complete="off"
        ></el-input>      
<!--         <el-select
          v-model="updateForm.moduleId"
          clearable
          filterable
           :disabled="true"
          placeholder="选择模块"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select> -->
      </el-form-item>
      <el-form-item
        label="任务名称"
        prop="name"
      >
        <el-input
          :maxlength="50"
          v-model.trim="updateForm.name"
          placeholder="输入任务名称"
          name="name"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="任务描述"
        prop="name"
      >
        <el-input
          :maxlength="50"
          v-model.trim="updateForm.description"
          placeholder="输入任务描述"
          name="name"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="计划开始时间"
        prop="name"
      >
        <el-date-picker
          v-model="updateForm.planStartTime"
          type="date"
          value-format="yyyy-MM-dd"
          @change="(value)=>{handlerDate(value,updateForm,'planStartTime')}"
          placeholder="计划开始时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="预计完成时间"
        prop="planEndTime"
      >
        <el-date-picker
          v-model="updateForm.planEndTime"
          type="date"
           @change="(value)=>{handlerDate(value,updateForm,'planEndTime')}"
          value-format="yyyy-MM-dd"
          placeholder="预计完成时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="预计投入工时"
        prop="planManHours"
      >
        <el-input
          placeholder="预计投入工时"
          v-model="updateForm.planManHours"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item
        label="指派给"
        prop="principalAdminName"
      >
         <el-input
          placeholder=""
          v-model="updateForm.principalAdminName"
          clearable
          :disabled="true"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        label="修改原因"
        prop="reason"
      >
        <el-input
          :maxlength="50"
          v-model.trim="updateForm.reason"
          placeholder="请输入修改原因"
          name="reason"
          auto-complete="off"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="w100 flex_row_center padding1">
      <el-button
        type="primary"
        @click="commitUpdate()"
      >保存</el-button>
      <el-button @click="$emit('cancel')">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
    name: "compName",
    components: {

    },
    filters: {

    },
    props: {

        updateObj: {
            type: Object,
            default: () => {},
            required: false,
        },
        taskId: {
            type: Number,
            default:null,
            required: false,
        },
    },
    data() {
        return {
            options: [{
                lable: 1,
                value: 1
            }],
            list: [],
            loading: false,
            updateForm: {
                id: '',
                projectNumber: '',
                principalAdminCode: '', //责任人工号
                moduleId: '', //工作模块
                moduleName:'',
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

            }
        }
    },
    computed: {

    },
    watch: {
        updateObj: {
            handler: function (newValue, oldValue) {
/*                 this.updateForm = this.$copyObj(newValue); // 浅拷贝选择对象 */
                this.updateForm.taskId = this.taskId
                              this.updateForm.id=newValue.id;
                              this.updateForm.taskId=newValue.id;
                              this.updateForm.projectNumber=newValue.projectNumber;
                              this.updateForm.projectName=newValue.projectName;
                              this.updateForm.principalAdminCode=newValue.principalAdminCode;
                              this.updateForm.principalAdminName=newValue.principalAdminName;
                              this.updateForm.moduleId=newValue.moduleId;
                              this.updateForm.moduleName=newValue.moduleName;
                              this.updateForm.name=newValue.name;
                              this.updateForm.description=newValue.description;
                              this.updateForm.lineName=newValue.lineName;
                              this.updateForm.planStartTime=newValue.planStartTime;
                              this.updateForm.planEndTime=newValue.planEndTime;
                              this.updateForm.planManHours=newValue.planManHours
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
        save() {
          if(self.updateForm['manHours']>24||self.updateForm['manHours']<=0){
                        self.$message({ // 提示失败
                            showClose: true,
                            message: '工时范围必须为0~24之间',
                            type: 'warning'
                        })
                        return                      
                    }          
            this.$confirm('确认提交?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '提交成功!'
                });
                this.$backTo()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        // 获取任务修改记录
        commitUpdate() {
            let self = this;
            self.$http.post(
                "/admin/tfTask/update.d",
                self.updateForm,
                function (suc) {
                    self.$emit('cancel')
                    self.$message({ // 提示失败
                        showClose: true,
                        message: '修改成功',
                        type: "success"
                    });
                },
                function (err) {
                    self.$message({ // 提示失败
                        showClose: true,
                        message: err.result.msg,
                        type: "warning"
                    });

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
.compName {
}
</style>
