(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/basic/column/stack"],{

/***/ 100:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/Language/WEB/soft/github/hsq/chitongyu.github.io/uni_app/pages/basic/column/stack.vue?vue&type=template&id=3a66ca27& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("view", { staticClass: "qiun-columns" }, [
    _vm._m(0),
    _c("view", { staticClass: "qiun-charts" }, [
      _c("canvas", {
        staticClass: "charts",
        attrs: {
          "canvas-id": "canvasColumnStack",
          id: "canvasColumnStack",
          eventid: "02094545-0"
        },
        on: { touchstart: _vm.touchColumn }
      })
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "view",
      { staticClass: "qiun-bg-white qiun-title-bar qiun-common-mt" },
      [
        _c("view", { staticClass: "qiun-title-dot-light" }, [
          _vm._v("堆叠柱状图")
        ])
      ]
    )
  }
]
render._withStripped = true



/***/ }),

/***/ 101:
/*!*************************************************************************************************************************!*\
  !*** D:/Language/WEB/soft/github/hsq/chitongyu.github.io/uni_app/pages/basic/column/stack.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_stack_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./stack.vue?vue&type=script&lang=js& */ 102);
/* harmony import */ var _E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_stack_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_stack_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_stack_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_stack_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_stack_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 102:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/Language/WEB/soft/github/hsq/chitongyu.github.io/uni_app/pages/basic/column/stack.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;


































var _uCharts = _interopRequireDefault(__webpack_require__(/*! @/components/u-charts/u-charts.js */ 85));
var _checker = __webpack_require__(/*! @/common/checker.js */ 86);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var _self;
var canvaColumn = null;var _default =
{
  data: function data() {
    return {
      cWidth: '',
      cHeight: '',
      pixelRatio: 1,
      textarea: '' };

  },
  onLoad: function onLoad() {
    _self = this;











    this.cWidth = uni.upx2px(750);
    this.cHeight = uni.upx2px(500);
    this.getServerData();
  },
  methods: {
    getServerData: function getServerData() {
      uni.request({
        url: 'https://www.ucharts.cn/data.json',
        data: {},

        success: function success(res) {
          console.log(res.data.data);
          var ColumnStack = { categories: [], series: [] };
          //这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
          ColumnStack.categories = res.data.data.ColumnStack.categories;
          ColumnStack.series = res.data.data.ColumnStack.series;
          _self.textarea = JSON.stringify(res.data.data.ColumnStack);
          _self.showColumnStack("canvasColumnStack", ColumnStack);
        },
        fail: function fail() {
          _self.tips = "网络错误，小程序端请检查合法域名";
        } });

    },
    showColumnStack: function showColumnStack(canvasId, chartData) {
      canvaColumn = new _uCharts.default({
        $this: _self,
        canvasId: canvasId,
        type: 'column',
        padding: [15, 15, 0, 15],
        legend: {
          show: true,
          padding: 5,
          lineHeight: 11,
          margin: 0 },

        fontSize: 11,
        background: '#FFFFFF',
        pixelRatio: _self.pixelRatio,
        animation: true,
        categories: chartData.categories,
        series: chartData.series,
        xAxis: {
          disableGrid: true },

        yAxis: {
          //disabled:true
        },
        dataLabel: true,
        width: _self.cWidth * _self.pixelRatio,
        height: _self.cHeight * _self.pixelRatio,
        extra: {
          column: {
            type: 'stack',
            width: _self.cWidth * _self.pixelRatio * 0.5 / chartData.categories.length } } });




    },
    touchColumn: function touchColumn(e) {
      canvaColumn.touchLegend(e);
      canvaColumn.showToolTip(e, {
        format: function format(item, category) {
          return category + ' ' + item.name + ':' + item.data;
        } });

    },
    changeData: function changeData() {
      if ((0, _checker.isJSON)(_self.textarea)) {
        var newdata = JSON.parse(_self.textarea);
        canvaColumn.updateData({
          series: newdata.series,
          categories: newdata.categories });

      } else {
        uni.showToast({
          title: '数据格式错误',
          image: '../../../static/images/alert-warning.png' });

      }
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 29)["default"]))

/***/ }),

/***/ 103:
/*!*********************************************************************************************************************************!*\
  !*** D:/Language/WEB/soft/github/hsq/chitongyu.github.io/uni_app/pages/basic/column/stack.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_stack_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./stack.vue?vue&type=style&index=0&lang=css& */ 104);
/* harmony import */ var _E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_stack_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_stack_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_stack_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_stack_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_stack_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 104:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/Language/WEB/soft/github/hsq/chitongyu.github.io/uni_app/pages/basic/column/stack.vue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 97:
/*!*********************************************************************************************************************!*\
  !*** D:/Language/WEB/soft/github/hsq/chitongyu.github.io/uni_app/main.js?{"page":"pages%2Fbasic%2Fcolumn%2Fstack"} ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
__webpack_require__(/*! uni-pages */ 1);
var _mpvuePageFactory = _interopRequireDefault(__webpack_require__(/*! mpvue-page-factory */ 11));
var _stack = _interopRequireDefault(__webpack_require__(/*! ./pages/basic/column/stack.vue */ 98));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
Page((0, _mpvuePageFactory.default)(_stack.default));

/***/ }),

/***/ 98:
/*!************************************************************************************************!*\
  !*** D:/Language/WEB/soft/github/hsq/chitongyu.github.io/uni_app/pages/basic/column/stack.vue ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stack_vue_vue_type_template_id_3a66ca27___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stack.vue?vue&type=template&id=3a66ca27& */ 99);
/* harmony import */ var _stack_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stack.vue?vue&type=script&lang=js& */ 101);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _stack_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _stack_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _stack_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stack.vue?vue&type=style&index=0&lang=css& */ 103);
/* harmony import */ var _E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 9);






/* normalize component */

var component = Object(_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _stack_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _stack_vue_vue_type_template_id_3a66ca27___WEBPACK_IMPORTED_MODULE_0__["render"],
  _stack_vue_vue_type_template_id_3a66ca27___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "D:/Language/WEB/soft/github/hsq/chitongyu.github.io/uni_app/pages/basic/column/stack.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 99:
/*!*******************************************************************************************************************************!*\
  !*** D:/Language/WEB/soft/github/hsq/chitongyu.github.io/uni_app/pages/basic/column/stack.vue?vue&type=template&id=3a66ca27& ***!
  \*******************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_templateLoader_js_vue_loader_options_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_stack_vue_vue_type_template_id_3a66ca27___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./stack.vue?vue&type=template&id=3a66ca27& */ 100);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_templateLoader_js_vue_loader_options_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_stack_vue_vue_type_template_id_3a66ca27___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_templateLoader_js_vue_loader_options_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_uniApp_HBuilderX_2_3_6_20191021_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_stack_vue_vue_type_template_id_3a66ca27___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

},[[97,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/basic/column/stack.js.map