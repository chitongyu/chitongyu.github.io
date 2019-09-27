<!--
 * @Author: Huanghao
 * @Date: 2019-09-10 16:47:40
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-10 16:47:40
 * @Description: 
 -->
<template>
  <div class="block"
       style="max-width:600px;margin:0 auto">
    <el-pagination v-if="paginationShow"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[this.pageSizeNum, this.pageSizeNum*2, this.pageSizeNum*3, 100]"
                   :page-size="pageSize"
                   class="flex_row_center"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="totalNum"></el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    totalNum: Number,
    pageSizeNum: {
      type: Number,
      default: 10,
      require: false
    }
  },
  watch: {
    pageSizeNum: {
      handler (newValue, oldValue) {
        this.pageSize = newValue
      },
      immediate: true
    }
  },
  data () {
    return {
      currentPage: 1, // 默认显示第一页
      pageSize: this.pageSizeNum, // 默认每页显示10条
      paginationShow: true
    }
  },
  methods: {
    handleSizeChange (val) { // pageSize  改变时会触发  每一页显示多少条
      //
      let self = this
      self.pageSize = val
      this.$emit('child-say2', val)
    },
    handleCurrentChange (val) { // currentPage  改变时会触发  第几页
      //
      this.paginationShow = false
      this.$nextTick(function () {
        this.currentPage = val
        this.$emit('child-say', val)
        this.paginationShow = true
      })
    }
  },
  mounted () {
    let self = this
  }
}
</script>
