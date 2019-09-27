<!--
 * @Author: Huanghao
 * @Date: 2019-09-06 11:03:21
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-22 17:28:21
 * @Description: 
 -->
<template>
  <div class="addWorkTime w100 padding-left4 padding-right4">
    <div class="addWorkTime__header w100  margin-top2 flex_row_between">
      <div class="flex_row_start">
        <div>剩余工时:<span class="cl_blue">{{remainManHours}}小时</span></div>
        <div class="margin-left4">工作累计完成率:<span class="cl_blue">{{completeRate}}%</span></div>
        <div class="margin-left4">任务计划开始:<span class="cl_blue">{{selectRow.planStartTime}}</span></div>
        <div class="margin-left4">任务计划结束:<span class="cl_blue">{{selectRow.planEndTime}}</span></div>
      </div>
    </div>
    <div class="addWorkTime__body margin-top2">
      <table class="w100  tableForm">
        <tbody>
          <tr class="header">
            <td width="100">序号</td>
            <td width="150">日期</td>
            <td width="80">投入工时</td>
            <td width="80">今日完成率</td>
            <td width="400">报工描述</td>
            <td width="100"></td>
          </tr>
          <tr
            v-for="(item,index) in addForms"
            :key="index"
          >
            <td width="100">{{index+1}}</td>

            <td width="150">
              <el-date-picker
                v-model="item.recordDate"
                type="date"
                class="mini-date"
                value-format="yyyy-MM-dd"
               @change="(value)=>{handlerDate(value,item)}"
                placeholder="日期">
                </el-date-picker>
            </td>
            <td width="80">
              <el-input
                placeholder=""
                v-model="item.manHours"
                type="Number"
                style="width:80px;"
                class="mini-input"
                :maxlength="3"
                clearable>
                </el-input>
            </td>
            <td width="80">
              <el-input
                placeholder=""
                v-model="item.completionRate"
                type="Number"
                style="width:80px;"
                class="mini-input"
                :maxlength="3"
                clearable>
                </el-input>
            </td>
            <td width="500">
              <el-input
                placeholder=""
                v-model="item.description"
                style="width:500px;"
                class="mini-input"
                type="text"
                :maxlength="100"
                show-word-limit
                clearable>
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
    <div class="addWorkTime__footer w100  margin-top2 flex_row_center">
      <el-button type="primary" @click="save()">保存</el-button>
      <el-button  @click="$emit('back')">返回</el-button>            
    </div>
  </div>
</template>

<script>
export default {
    name: "addWorkTime",
    components: {

    },
    filters: {

    },
    props: {
       selectRow: {
            type: Object,
            default: ()=>{},
            required: true
        }

    },
    data() {
        return {
            addForms: [{
                recordDate: '',
                manHours:'',
                completionRate:'',
                description:''
            }],
            reportManHours:0,
            reportRate:0          
        }
    },
    computed: {
        remainManHours() {
            return  (this.selectRow.planManHours-this.selectRow.actualManHours-this.reportManHours)
        },
        completeRate(){
            return this.selectRow.completionRate+this.reportRate
        },
    },
    watch: {
      addForms:{
         handler: function(newValue, oldValue) {
           this.reportRate=0;
          newValue.forEach(element => {
              if(!this.$isEmpty(element.completionRate)){
                this.reportRate=this.reportRate+Number(element.completionRate)
              }
              
          });
          this.reportManHours=0;
          newValue.forEach(element => {
              if(!this.$isEmpty(element.manHours)){
                this.reportManHours=this.reportManHours+Number(element.manHours)
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
       handlerDate(value,item){
          let moment=this.$moment(this.$moment().format("YYYY-MM-DD"));
          let selectDate=this.$moment(this.$moment(value).format("YYYY-MM-DD"))
          if(moment.isBefore(value)){
            item.recordDate=''
            this.$message({ // 提示失败
                        showClose: true,
                        message: '报工日期不能超过今天',
                        type: "warning"
                    });
          }
        },      
        addNode(index) {
          let newNode={
                recordDate: '',
                manHours:'',
                completionRate:'',
                description:''
            }
         this.addForms.splice(index+1,0,newNode)
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
        save(){
            let self = this;
            let temp = true
            for(let i=0;i<this.addForms.length;i++){
                let element=this.addForms[i]
                for (let key in element) {
                    if(element['manHours']>24||element['manHours']<=0){
                        self.$message({ // 提示失败
                            showClose: true,
                            message: '工时范围必须为0~24之间',
                            type: 'warning'
                        })
                        return                      
                    }
                    if(element['completionRate']<=0){
                        self.$message({ // 提示失败
                            showClose: true,
                            message: '完成率必须大于0',
                            type: 'warning'
                        })
                        return                      
                    }
                    if (this.$isEmpty(element[key])) {
                        console.log(element[key])
                        temp = false
                        break
                    }
                }              
            }
            console.log(this.addForms)
            if (!temp) {
                self.$message({ // 提示失败
                    showClose: true,
                    message: '请填写完所有项',
                    type: 'warning'
                })
                return
            }          
          if(this.completeRate>100){
            this.$message({ // 提示失败
                        showClose: true,
                        message: '累计完成率不能大于100%',
                        type: "warning"
                    });
            return
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
            self.loading = true; // 显示加载中
            self.addDialogFormVisible = false; // 关闭修改对话框     
            self.$http.post(
                "/admin/tfTaskWork/adds.d", {
                    tfTaskWorksStr: JSON.stringify(self.addForms),
                    taskId: self.selectRow.id
                },
                function (suc) {
                    self.$message({ // 提示成功
                        showClose: true,
                        message: "新增成功",
                        type: "success"
                    });
                    self.addForms=[{
                recordDate: '',
                manHours:'',
                completionRate:'',
                description:''
            }]
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

        },
    },

};
</script>

<style lang="scss">
.addWorkTime {
  .el-input{
    width:120px;
  }
  &__body{
    min-height:200px;
  }
  tr{
    height:30px;
  }
  td{
    vertical-align:middle;
    height:20px;
  }
}
</style>
