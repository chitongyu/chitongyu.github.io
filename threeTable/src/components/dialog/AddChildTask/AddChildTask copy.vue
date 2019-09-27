<!--
 * @Author: Huanghao
 * @Date: 2019-09-06 11:03:21
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-16 19:25:19
 * @Description: 
 -->
<template>
  <div class="addChildTask w100 padding-left4 padding-right4">
    <div class="addChildTask__header w100  margin-top2 flex_row_between">
      <div class="flex_row_start">
        <div>剩余工时:<span class="cl_blue">5小时</span></div>
        <div class="margin-left4">计划开始日期:<span class="cl_blue">2019/09/11</span></div>
        <div class="margin-left4">预计完成日期:<span class="cl_blue">2019/09/11</span></div>
      </div>
      <div>
        <el-button
          type="primary"
          class="fs_13"
          @click="addNode"
        >添加</el-button>
      </div>
    </div>
    <div class="addChildTask__body margin-top2">
      <table class="w100">
        <tbody>
          <tr
            v-for="(item,index) in addForms"
            :key="index"
            class="margin-top2"
          >
          <td  width="100">
            工作模块<el-input
                placeholder=""
                v-model="item.worktime"
                type="Number"
                style="width:40px;"
                class="mini-input"
                :maxlength="3"
                clearable>
                </el-input>
          </td>
          <td   width="80">
            线体<el-input
                placeholder=""
                v-model="item.worktime"
                type="Number"
                style="width:40px;"
                class="mini-input"
                :maxlength="3"
                clearable>
                </el-input>
          </td>
          <td width="100">
            任务名称<el-input
                placeholder=""
                v-model="item.worktime"
                type="Number"
                style="width:40px;"
                class="mini-input"
                :maxlength="3"
                clearable>
                </el-input>
          </td>
          <td width="180">
            计划开始<el-date-picker
                v-model="item.date"
                type="date"
                class="mini-date"
                placeholder="日期">
                </el-date-picker>  
          </td>
          <td width="180">
            预计完成<el-date-picker
                v-model="item.date"
                type="date"
                class="mini-date"
                placeholder="日期">
                </el-date-picker>  
          </td>
          <td width="120">
            预计投入工时<el-input
                placeholder=""
                v-model="item.worktime"
                type="Number"
                style="width:40px;"
                class="mini-input"
                :maxlength="3"
                clearable>
                </el-input>
          </td>
          <td width="100">
            指派给<el-input
                placeholder=""
                v-model="item.worktime"
                type="Number"
                style="width:40px;"
                class="mini-input"
                :maxlength="3"
                clearable>
                </el-input>
          </td>
          <td  width="20">
            <i class="iconfont icon-cha fs_20 cl_red" @click="deleteNode(index)"></i>
          </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="addChildTask__footer w100  margin-top2 flex_row_center">
      <el-button type="primary" @click="save()">保存</el-button>
      <el-button  @click="$emit('cancel')">返回</el-button>            
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

    },
    data() {
        return {
            addForms: [{
                date: '',
                worktime:''
            }]
        }
    },
    computed: {

    },
    watch: {

    },
    created() {

    },
    methods: {
        addNode() {
          let addNode= {
                date: '',
                worktime:''
            }
          this.addForms.push(addNode)
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

        },
        async getQuestionByDepartAndProject() {
            let self = this
            self.ifShowLoading1 = true
            await self.$http.post(
                    self.$api.common._typeNumByDeparts, {})
                .then(function (res) {
                    if (!res.status) { // 如果接口请求失败
                        console.error('接口响应失败', res.data)
                        self.$message({
                            showClose: true,
                            message: '接口响应失败',
                            type: 'warning'
                        })
                    } else {
                        if (res.isEmpty) { // 如果接口请求数据为空
                            console.error('接口请求数据为空', res.data)
                            self.$message({
                                showClose: true,
                                message: '接口请求数据为空',
                                type: 'warning'
                            })
                        } else {
                            self.ifError1 = 0
                            self.questionByDepartAndProject = res.data.rows // 列表数据赋值 */
                        }
                    }
                }).catch(function (err) { // 如果请求服务器失败
                    console.error('服务器响应失败', err)
                    self.$message({
                        showClose: true,
                        message: '服务器响应失败',
                        type: 'warning'
                    })
                })
            self.ifShowLoading1 = false
        }
    },

};
</script>

<style lang="scss">
.addChildTask {
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
