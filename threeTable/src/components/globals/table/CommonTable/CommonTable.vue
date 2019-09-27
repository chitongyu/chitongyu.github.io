<!--
 * @Author: Huanghao
 * @Date: 2019-09-10 16:56:25
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-21 16:03:37
 * @Description: 
 -->
<template>
  <div class="w100 h100 ">
    <el-table
      :data="tableData"
      empty-text=' '
        style="width:100%"
      min-height="50px"
      :stripe="ifStripe"
      :class="tableClass"
      :span-method="spanMethod"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <slot name="main"></slot>
    </el-table>
    <Pagination
      v-if="ifPagination"
      v-on:child-say="pageNum"
      :pageSizeNum="pageSizeNum"
      ref="pagination"
      v-on:child-say2="pageShowCount"
      :totalNum="total"
    ></Pagination>
  </div>

</template>
<script>
import {
  mapState,
  mapGetters,
  mapActions
} from 'vuex' // 先要引入
export default {
  data () {
    return {
      spanArr: {
      },
      pos: {
      }
    }
  },
  props: {
    ifStripe: {
      type: Boolean,
      default: false,
      required: false
    },
    tableClass: {
      type: String,
      default: '',
      required: false
    },
    tableData:{
      type: Array,
      default: ()=>[],
      required: false
    },
    mergeAttrArr: {
      type: Array,
      default: () => [],
      required: false
    },
    extraMergeIndex: {
      type: Array,
      default: () => [4],
      required: false
    },
    searchObjName: { //搜索对象名
      type: String,
      default: 'searchObj',
      required: false
    },
    refreshFuncName: { //刷新函数名
      type: String,
      default: '',
      required: true
    },
    pageSizeNum:{
      type: Number,
      default: 15,
      required: false
    },
    ifPagination:{
      type: Boolean,
      default: true,
      required: false
    },
  },
  watch: {
    tableData: {
      handler (newValue, oldValue) {
        this.startUp()
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    total(){
      return this.$parent.total
    }
  },
  created () {
  },
  methods: {
    startUp () {
      if (!this.$isEmpty(this.mergeAttrArr)) {
        this.spanArrayHandler(this.tableData)
      }
    },
    setSpan () {
      this.spanArr = {}
      for (let i = 0; i < this.mergeAttrArr.length; i++) {
        let AttrItem = this.mergeAttrArr[i]
        this.$set(this.spanArr, AttrItem, [])
        this.$set(this.pos, AttrItem, 0)
      }
    },
    getItemAttrValue(obj){
      let str='';
      for (let i = 0; i < this.mergeAttrArr.length; i++) {
        str= str+obj[this.mergeAttrArr[i]]+'-'
      }
      return str
    },
    spanArrayHandler (arr) {
      this.setSpan()
      let mergeObj={}
      for (let i = 0; i < this.mergeAttrArr.length; i++) {
        let AttrItem = this.mergeAttrArr[i]
        this.$set(this.spanArr, AttrItem, [])
        this.$set(this.pos, AttrItem, 0)
      }
      for (let i = 0; i < arr.length; i++) {
        let item = arr[i]
  
        if (i == 0) {
          for (let j = 0; j < this.mergeAttrArr.length; j++) {
            let AttrItem = this.mergeAttrArr[j]
            this.spanArr[AttrItem].push(1)
            this.pos[AttrItem] = 0
          }
          let temp = []
          temp.push(arr[0])
          let key=this.getItemAttrValue(arr[0])
          mergeObj[key]=temp
        } else {
          let key=this.getItemAttrValue(item)
            if (this.$isEmpty(mergeObj[key])) {
              let temp = []
              temp.push(item)
              mergeObj[key] = temp
            } else {
              mergeObj[key].push(item)
          }
          let beforeItem = arr[i - 1]
          for (let m = 0; m < this.mergeAttrArr.length; m++) {
            let AttrItem = this.mergeAttrArr[m]
            let AttrMerge = ''
            let beforeAttrMerge = ''
            for (let n = 0; n <= m; n++) {
              AttrMerge = AttrMerge + item[this.mergeAttrArr[n]]
              beforeAttrMerge = beforeAttrMerge + beforeItem[this.mergeAttrArr[n]]
            }
            if (AttrMerge == beforeAttrMerge) {
              this.spanArr[AttrItem][this.pos[AttrItem]] += 1
            } else {
              this.pos[AttrItem] = i
              this.spanArr[AttrItem][i] = 1
            }
          }
        }
        //将合并属性设置处理key=>合并属性相加 value:列表中为该属性的所有项
      }
        this.$parent.mergeObj=mergeObj
        console.log('处理后',mergeObj)
    },
    spanMethod ({
      row,
      column,
      rowIndex,
      columnIndex
    }) { // 表格合并行
      if (this.$isEmpty(this.mergeAttrArr)) {
        return {
          rowspan: 1,
          colspan: 1
        }
      }
      for (let i = 0; i < this.mergeAttrArr.length; i++) {
        let AttrItem = this.mergeAttrArr[i]
        if (columnIndex === i) {
          const _row = this.spanArr[AttrItem][rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      }
      const lastAttrItem= this.mergeAttrArr[this.mergeAttrArr.length-1]
      if (!this.$isEmpty(this.extraMergeIndex)) {
        for (let i = 0; i < this.extraMergeIndex.length; i++) {
          let mergeIndex = this.extraMergeIndex[i]
          if (columnIndex === mergeIndex) {
            const _row = this.spanArr[lastAttrItem][rowIndex]
            const _col = _row > 0 ? 1 : 0
            return {
              rowspan: _row,
              colspan: _col
            }
          }
        }
        return {
          rowspan: 1,
          colspan: 1
        }
      }
    }, 
    //重置为第一页
    reset () { 
      this.$refs.pagination.handleCurrentChange(1)
    },
    // 页码
    pageNum (currentSect) {
      this.$parent[this.searchObjName].page = currentSect //设置页码
      this.$parent[this.refreshFuncName]() // 刷新列表
    },
    // 一页显示多少条
    pageShowCount (currentSect) {
      this.$parent[this.searchObjName].pageSize = currentSect //设置一页显示条数
      this.$parent[this.refreshFuncName]() // 刷新列表
    },   
  }

}
</script>

<style lang="scss" scoped>
</style>
