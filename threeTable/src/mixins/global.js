/*
 * @Author: Huanghao
 * @Date: 2019-09-10 14:08:28
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-12 09:41:05
 * @Description: 
 */
import {
  mapState,
  mapGetters,
  mapActions
} from 'vuex' // 先要引入
export default {
  data () {
    return {
      
    }
  },
  computed: {
    ...mapGetters('style', { // style指的是modules文件夹下的style.js模块
      bgColor: 'getBgColor' // 第一个bgColor是我自定义的,第二个bgColor是对应的style.js里的getters里的getBgColor
    }),
    ...mapGetters('user', {
      btPermissions: 'getBtPermissions',
      token: 'getToken'
    })
  },
  methods: {

  }
}
