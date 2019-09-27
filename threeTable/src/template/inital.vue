<!--
 * @Author: Huanghao
 * @Date: 2019-09-06 11:03:21
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-09 21:41:11
 * @Description: 
 -->
<template>
  <div class="compName w100">
    初始化模版
  </div>

</template>

<script>
export default {
  name: "compName",
  components: {
    
  },
  filters:{

  },
  props:{

  },
  data(){
    return{
      
    }
  },
  computed:{

  },
  watch:{
    
  }, 
  created(){

  },
  methods:{
        async getQuestionByDepartAndProject () {
      let self = this
      self.ifShowLoading1 = true
      await self.$http.post(
        self.$api.common._typeNumByDeparts, {
        })
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
<style lang="scss" scoped>
.compName {
}
</style>
