<!--
 * @Author: Huanghao
 * @Date: 2019-09-06 11:03:21
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-25 06:02:59
 * @Description: 
 -->
<template>
  <div class="updateWorkTime w100 padding-left4 padding-right4">
    <div class="updateWorkTime__header w100  margin-top2 flex_row_between">
      <div class="flex_row_start">
        <div>剩余工时:<span class="cl_blue">{{remainManHours}}小时</span></div>
        <div class="margin-left4">工作累计完成率:<span class="cl_blue">{{completeRate}}%</span></div>
        <div class="margin-left4">任务计划开始:<span class="cl_blue">{{selectRow.planStartTime}}</span></div>
        <div class="margin-left4">任务计划结束:<span class="cl_blue">{{selectRow.planEndTime}}</span></div>
      </div>
      <div>
        <el-button
          type="primary"
          class="fs_13"
          @click="switchEdit"
          v-show="updateForms.length>0"
          v-if="!batchEditFlag"
        >批量修改</el-button>
        <template  v-else>
          <el-button   type="primary" @click="save()">保存</el-button>
           <el-button
          class="fs_13"
          @click="switchEdit"
        >取消</el-button>
        </template>

       
       
      </div>
    </div>
    <div class="updateWorkTime__body margin-top2">
       <table class="w100  tableForm">
        <tbody>
          <tr class="header">
            <td width="100">序号</td>
            <td width="150">日期</td>
            <td width="100">投入工时</td>
            <td width="100">今日完成率</td>
            <td width="400">报工描述</td>
            <td width="100"></td>
          </tr>
          <tr
            v-for="(item,index) in updateForms"
            :key="index"
          >
            <td width="100">{{index+1}}</td>

            <td width="150">
              
              <el-date-picker
                v-if="batchEditFlag&&ifCanEdit(item,'recordDate')"
                v-model="item.recordDate"
                type="date"
                class="mini-date"
                value-format="yyyy-MM-dd"
                placeholder="日期">
                </el-date-picker>
                <span v-else>
                  {{item.recordDate}}
                </span>
            </td>
            <td width="100">
              <el-input
                placeholder=""

                type="Number"
                style="width:80px;"
                class="mini-input"
                :maxlength="3"
                :value="item.manHours" 
                @input="(value)=>{
                  changeManHoursInput(value,item);
                }"
                 v-if="batchEditFlag&&ifCanEdit(item,'manHours')"
                clearable>
                </el-input>
                 <span v-else>
                  {{item.manHours}}
                </span>
            </td>
            <td width="100">
              <el-input
                placeholder=""               
                type="Number"
                style="width:80px;"
                class="mini-input"
                :value="item.completionRate" 
                @input="(value)=>{
                  changeCompleteRateInput(value,item);
                }"
                :maxlength="3"
                 v-if="batchEditFlag&&ifCanEdit(item,'completionRate')"
                clearable>
                </el-input>
                 <span v-else>
                  {{item.completionRate}}
                </span>
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
                 v-if="batchEditFlag&&ifCanEdit(item,'description')"
                clearable>
                </el-input>
                  <span v-else>
                  {{item.description}}
                </span>
            </td>
            <td width="100">
              <div>
                <i
                  class="iconfont icon-jia fs_20 cl_blue"
                  @click="addNode(index)"
                  v-if="false"
                ></i>
                <i
                  class="iconfont icon-cha fs_20 cl_red"
                  @click="deleteWorkTime(item)"
                ></i>
              </div>             
            </td>
           
          </tr>
        </tbody>
      </table>
      
    </div>
    <div class="updateWorkTime__footer w100  margin-top4 flex_column_start ">
       <Pagination
      v-on:child-say="pageNum"
      :pageSizeNum="10"
      v-if="!batchEditFlag"
      ref="pagination"
      v-on:child-say2="pageShowCount"
      :totalNum="total"
    ></Pagination>       
      <div class="flex_row_center" v-if="false">
        <el-button  v-if="batchEditFlag"  type="primary" @click="save()">保存</el-button>
        <el-button  @click="$emit('cancel')">返回</el-button>   
      </div>
       
               
    </div>
  </div>
</template>

<script>
export default {
    name: "updateWorkTime",
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
          searchObj: { //请求参数对象
                page: 1, //第几页 页码
                pageSize: 10, //页码大小,一页显示多少条
          },
          sapCode:this.$store.getters['user/getInfo']&&this.$store.getters['user/getInfo'].sapCode,
            updateForms: [],
            total:0,
            batchEditFlag:false,
            updateFormsCopy:[],
            oldReportManHours:0,
            reportManHours:0,
            oldReportRate:0,
            reportRate:0,
            remainManHours:this.selectRow.planManHours-this.selectRow.actualManHours,
            completeRate:this.selectRow.completionRate,
            remainManHoursCopy:0,
            completeRateCopy:0
        }
    },
    computed: {
      taskId(){
        return this.selectRow.id
      },
/*         remainManHours() {
            return  this.selectRow.planManHours-this.selectRow.actualManHours +this.reportManHours-this.oldReportManHours
        },
        completeRate(){ 
            return this.selectRow.completionRate+this.reportRate-this.oldReportRate
        }, */
       /*  updateFormsComp(){
          return JSON.parse(JSON.stringify(this.updateForms) ) 
        } */

    },
    watch: {
      selectRow:{
         handler: function(newValue, oldValue) {
           
           this.refresh()
        },
        // 深度观察监听
        deep: true,
        immediate: true
      },
/*       updateFormsComp:{
         handler(newValue, oldValue) {
           if(this.$isEmpty(oldValue)){
             return
           }
           console.log(newValue)
           console.log(oldValue)
           console.log('新值')
          let newReportManHours=newValue.reduce((total,element)=>{
                      if(!this.$isEmpty(element.manHours)){
                        return total+Number(element.manHours)
                      }else{
                        return total
                      }
                      
          },0)
          let oldReportManHours=oldValue.reduce((total,element)=>{
                      if(!this.$isEmpty(element.manHours)){
                        return total+Number(element.manHours)
                      }else{
                        return total
                      }
                      
          },0)
          console.log(newReportManHours)
           console.log(oldReportManHours)
          let manhoursDiff=newReportManHours-oldReportManHours;

          let newReportRate=newValue.reduce((total,element)=>{
                      if(!this.$isEmpty(element.completionRate)){
                        return total+Number(element.completionRate)
                      }else{
                        return total
                      }
                      
          },0)
          let oldReportRate=oldValue.reduce((total,element)=>{
                      if(!this.$isEmpty(element.completionRate)){
                        return total+Number(element.completionRate)
                      }else{
                        return total
                      }
                      
          },0)
          let rateDiff=newReportRate-oldReportRate;
          console.log('差异',manhoursDiff)
          this.remainManHours=this.remainManHours-manhoursDiff;
          this.completeRate=this.completeRate+rateDiff
        },
        deep: true,
        immediate: true,
      } */
    },
    created() {
      
    },
    methods: {
      ifMyPrinciples(code){
        if(code==this.sapCode) return true
        else return false
      },       
        refresh(){
            this.getTaskWork()
        }, 
        // 页码
        pageNum (currentSect) {
          this.searchObj.page = currentSect //设置页码
          this.getTaskWork() // 刷新列表
        },
        // 一页显示多少条
        pageShowCount (currentSect) {
          this.searchObj.pageSize = currentSect //设置一页显示条数
          this.getTaskWork() // 刷新列表
        },   
        changeManHoursInput(value,item){
          console.log(value,item.manHours)
          console.log(value)
          let manhoursDiff=value-item.manHours;
          item.manHours=value
          this.remainManHours=this.remainManHours-manhoursDiff;
        },  
        changeCompleteRateInput(value,item){
          console.log(value,item.completionRate)
          console.log(value)
          let rateDiff=value-item.completionRate;
          item.completionRate=value
          this.completeRate=this.completeRate+rateDiff;
        },     
        switchEdit(){
        let obj=this.selectRow
        if(obj.status==3){
          this.$message({ // 提示失败
                      showClose: true,
                      message: '该任务已关闭，无法修改',
                      type: "warning"
          });
          return
        }
        if(!this.ifMyPrinciples(obj.principalAdminCode)){
        this.$message({ // 提示失败
                    showClose: true,
                    message: '该任务不是指派给您的，无法修改',
                    type: "warning"
        });
        return
        }                     
         this.batchEditFlag=!this.batchEditFlag
         console.log(this.updateFormsCopy)
         if(this.batchEditFlag){
           this.remainManHoursCopy=this.remainManHours
           this.completeRateCopy=this.completeRate
         }else{
           this.remainManHours=this.remainManHoursCopy
           this.completeRate=this.completeRateCopy
           this.updateForms=JSON.parse(this.updateFormsCopy) 
         }
         }, 
        ifCanEdit(item,field){
          let createTime=this.$moment(item.createTime).format('YYYY-MM-DD')
          let moment=this.$moment().format('YYYY-MM-DD')
          if(createTime==moment)  return true 
          else if(field=='completionRate') return true
          else return false
        } ,
        deleteWorkTime(obj){
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
        
        save(){
            let self = this;
            let temp = true
            if(this.completeRate>100){
              this.$message({ // 提示失败
                          showClose: true,
                          message: '累计完成率不能大于100%',
                          type: "warning"
                      });
              return
            }           
            for(let i=0;i<this.updateForms.length;i++){
              let element=this.updateForms[i]
 /*              this.$filterUpdate(element) */
              Reflect.deleteProperty(element,'sapCode')
              Reflect.deleteProperty(element,'createAdminName')
              Reflect.deleteProperty(element,'departmentId')
              Reflect.deleteProperty(element,'groupId')
              Reflect.deleteProperty(element,'moduleId')
              Reflect.deleteProperty(element,'projectNumber')
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
              if(this.$isEmpty( element.recordDate)
              ||this.$isEmpty( element.manHours)
              ||this.$isEmpty( element.completionRate)
              ||this.$isEmpty( element.description)){
                this.$message({ // 提示失败
                      showClose: true,
                      message: '请填写完所有项',
                      type: 'warning'
                  })
                  return
                }
            }       
         /*  if(this.completeRate>100){
            this.$message({ // 提示失败
                        showClose: true,
                        message: '累计完成率不能大于100%',
                        type: "warning"
                    });
            return
          } */
          this.$confirm('确认提交?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              this.commitUpdate()
          }).catch(() => {
              this.$message({
                  type: 'info',
                  message: '已取消'
              });
          });          
        },
        //确认删除
        commitDelete(id){
        let self = this;
        self.loading = true; // 显示加载中
        self.$http.post(
            "/admin/tfTaskWork/delete.d",
            {id:id},
            function (suc) {
              self.$message({
              type: 'success',
              message: '删除成功!'
              }); 
              self.getTaskWork()
              self.$emit('refresh')                 
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
        //确认修改
        commitUpdate() {
            let self = this;
            self.loading = true; // 显示加载中    
            self.$http.post(
                "/admin/tfTaskWork/updates.d", {
                    tfTaskWorksStr: JSON.stringify(self.updateForms),
                    taskId: self.selectRow.id
                },
                function (suc) {
                    self.$message({ // 提示成功
                        showClose: true,
                        message: "修改成功",
                        type: "success"
                    });
                    self.loading = false; // 隐藏加载中
                    self.getTaskWork()
                    self.$emit('refresh')       
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
        //确认新增
        getTaskWork() {
            let self = this;
            self.loading = true; // 显示加载中
            self.$http.post(
                "/admin/tfTaskWork/listByPage.d",{...self.searchObj,taskId:self.taskId},
                function (suc) {
                    self.updateForms = suc.body.rows; // 列表数据赋值
                    self.updateFormsCopy=JSON.stringify(self.updateForms)
                    self.total=suc.body.total; 
                    self.batchEditFlag=false;
                    self.oldReportManHours=self.updateForms.reduce((total,element)=>{
                      console.log(total,element)
                      return total+element.manHours
                    },0)
                    self.oldReportRate=self.updateForms.reduce((total,element)=>{
                      return total+element.completionRate
                    },0)
                    
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
                }
            );

        },
    },

};
</script>

<style lang="scss">
.updateWorkTime {
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
