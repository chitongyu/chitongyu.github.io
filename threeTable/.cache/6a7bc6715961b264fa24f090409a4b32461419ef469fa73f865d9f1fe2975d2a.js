{"source":"(window.webpackJsonp=window.webpackJsonp||[]).push([[\"chunk-2d0aacdc\"],{1326:function(e,t,a){\"use strict\";a.r(t);a(\"591a\");var o={data:function(){return{searchObj:{page:1,pageSize:10,pid:\"\",name:\"\",type:\"\",remarks:\"\"},loading:!0,tfOrganizationList:[],total:null,addDialogFormVisible:!1,updateDialogFormVisible:!1,addForm:{pid:0,name:\"\",type:\"\",remarks:\"\"},updateForm:{pid:\"\",name:\"\",type:\"\",remarks:\"\"},addRuleForm:{pid:[{required:!0,message:\"请输入父id\"}],name:[{required:!0,message:\"请输入名称\"}],type:[{required:!0,message:\"请输入组织类型\"}],remarks:[{required:!0,message:\"请输入备注\"}]},updateRuleForm:{pid:[{required:!0,message:\"请输入父id\"}],name:[{required:!0,message:\"请输入名称\"}],type:[{required:!0,message:\"请输入组织类型\"}],remarks:[{required:!0,message:\"请输入备注\"}]}}},computed:{},watch:{},components:{},methods:{search:function(){this.searchObj.page=1,this.getTfOrganizationList()},clearOut:function(){this.searchObj={page:1,pageSize:10}},refresh:function(){this.clearOut(),this.getTfOrganizationList()},pageNum:function(e){this.searchObj.page=e,this.getTfOrganizationList()},pageShowCount:function(e){this.searchObj.pageSize=e,this.getTfOrganizationList()},addOrganization:function(e){this.addForm.pid=e.id,this.addForm.type=\"2\",this.addDialogFormVisible=!0},getTfOrganizationList:function(){var t=this;t.loading=!0,t.$http.post(\"/admin/tfOrganization/list.d\",t.searchObj,function(e){t.tfOrganizationList=e.body.rows,t.total=e.body.total,t.loading=!1},function(e){t.$message({showClose:!0,message:e.result.msg,type:\"warning\"}),t.loading=!1},function(e){t.$message({showClose:!0,message:e.error+\"-\"+e.message,type:\"warning\"}),t.loading=!1})},deleteTfOrganization:function(e){var t=this,a=this;this.$confirm(\"确定删除吗？\",\"提示\",{confirmButtonText:\"确定\",cancelButtonText:\"取消\",type:\"warning\"}).then(function(){a.loading=!0,a.$http.post(\"/admin/tfOrganization/delete.d\",{id:e},function(e){a.getTfOrganizationList(),a.$message({type:\"success\",message:\"删除成功!\"}),a.loading=!1},function(e){a.$message({showClose:!0,message:e.result.msg,type:\"warning\"}),a.loading=!1},function(e){a.$message({showClose:!0,message:e.error+\"-\"+e.message,type:\"warning\"}),a.loading=!1})}).catch(function(){t.$message({type:\"info\",message:\"操作异常\"}),a.loading=!1})},updateTfOrganization:function(e){this.imgList=[],this.updateDialogFormVisible=!0,this.updateForm=this.$copyObj(e)},commitAdd:function(){var t=this;this.$refs.addRuleForm.validate(function(e){if(!e)return t.$message({showClose:!0,message:\"输入格式非法\",type:\"warning\"}),t.loading=!1;t.loading=!0,t.addDialogFormVisible=!1,t.$http.post(\"/admin/tfOrganization/add.d\",t.addForm,function(e){t.getTfOrganizationList(),t.$message({showClose:!0,message:\"新增成功\",type:\"success\"}),t.loading=!1},function(e){t.$message({showClose:!0,message:e.result.msg,type:\"warning\"}),t.loading=!1},function(e){t.$message({showClose:!0,message:e.error+\"-\"+e.message,type:\"warning\"}),t.loading=!1})})},commitUpdate:function(){var t=this;this.$refs.updateRuleForm.validate(function(e){if(!e)return t.$message({showClose:!0,message:\"输入格式非法\",type:\"warning\"}),!1;t.loading=!0,t.updateDialogFormVisible=!1,t.$filterUpdate(t.updateForm),t.$http.post(\"/admin/tfOrganization/update.d\",t.updateForm,function(e){t.getTfOrganizationList(),t.$message({showClose:!0,message:\"修改成功\",type:\"success\"}),t.loading=!1},function(e){t.$message({showClose:!0,message:e.result.msg,type:\"warning\"}),t.loading=!1},function(e){t.$message({showClose:!0,message:e.error+\"-\"+e.message,type:\"warning\"}),t.loading=!1})})}},mounted:function(){this.$onkeydown(this.getTfOrganizationList),this.getTfOrganizationList()}},s=a(\"6691\"),i=Object(s.a)(o,function(){var a=this,e=a.$createElement,o=a._self._c||e;return o(\"div\",{directives:[{name:\"loading\",rawName:\"v-loading\",value:a.loading,expression:\"loading\"}],staticClass:\"orgManage padding1 w100\"},[o(\"el-dialog\",{attrs:{title:\"部门新增\",visible:a.addDialogFormVisible},on:{\"update:visible\":function(e){a.addDialogFormVisible=e}}},[o(\"el-form\",{ref:\"addRuleForm\",attrs:{model:a.addForm,rules:a.addRuleForm,\"status-icon\":\"\",\"label-width\":\"100px\"}},[o(\"el-form-item\",{attrs:{label:\"名称\",prop:\"name\"}},[o(\"el-input\",{attrs:{maxlength:50,placeholder:\"请输入名称\",name:\"tfOrganization-name\",\"auto-complete\":\"off\"},model:{value:a.addForm.name,callback:function(e){a.$set(a.addForm,\"name\",\"string\"==typeof e?e.trim():e)},expression:\"addForm.name\"}})],1),o(\"el-form-item\",{attrs:{label:\"备注\"}},[o(\"el-input\",{attrs:{maxlength:50,placeholder:\"请输入备注\",name:\"tfOrganization-remarks\",\"auto-complete\":\"off\"},model:{value:a.addForm.remarks,callback:function(e){a.$set(a.addForm,\"remarks\",\"string\"==typeof e?e.trim():e)},expression:\"addForm.remarks\"}})],1)],1),o(\"div\",{staticClass:\"dialog-footer\",attrs:{slot:\"footer\"},slot:\"footer\"},[o(\"el-button\",{on:{click:function(e){a.addDialogFormVisible=!1}}},[a._v(\"取 消\")]),o(\"el-button\",{attrs:{type:\"primary\"},on:{click:function(e){return a.commitAdd()}}},[a._v(\"确定新增\")])],1)],1),o(\"el-dialog\",{attrs:{title:\"组织修改\",visible:a.updateDialogFormVisible},on:{\"update:visible\":function(e){a.updateDialogFormVisible=e}}},[o(\"el-form\",{ref:\"updateRuleForm\",attrs:{model:a.updateForm,rules:a.updateRuleForm,\"status-icon\":\"\",\"label-width\":\"100px\"}},[o(\"el-form-item\",{attrs:{label:\"名称\",prop:\"name\"}},[o(\"el-input\",{attrs:{maxlength:50,placeholder:\"请输入名称\",name:\"tfOrganization-name\",\"auto-complete\":\"off\"},model:{value:a.updateForm.name,callback:function(e){a.$set(a.updateForm,\"name\",\"string\"==typeof e?e.trim():e)},expression:\"updateForm.name\"}})],1),o(\"el-form-item\",{attrs:{label:\"备注\"}},[o(\"el-input\",{attrs:{maxlength:50,placeholder:\"请输入备注\",name:\"tfOrganization-remarks\",\"auto-complete\":\"off\"},model:{value:a.updateForm.remarks,callback:function(e){a.$set(a.updateForm,\"remarks\",\"string\"==typeof e?e.trim():e)},expression:\"updateForm.remarks\"}})],1)],1),o(\"div\",{staticClass:\"dialog-footer\",attrs:{slot:\"footer\"},slot:\"footer\"},[o(\"el-button\",{on:{click:function(e){a.updateDialogFormVisible=!1}}},[a._v(\"取 消\")]),o(\"el-button\",{attrs:{type:\"primary\"},on:{click:function(e){return a.commitUpdate()}}},[a._v(\"确定修改\")])],1)],1),o(\"div\",{staticClass:\"header\"},[o(\"div\",{staticClass:\"hearder-top\"},[o(\"el-button\",{directives:[{name:\"show\",rawName:\"v-show\",value:a.btPermissions[\"/backend/orgManage/add\"],expression:\"btPermissions['/backend/orgManage/add']\"}],style:{\"background-color\":a.bgColor.addBt,\"border-color\":a.bgColor.addBt},attrs:{type:\"danger\",size:\"mini\"},on:{click:function(e){a.addDialogFormVisible=!0,a.addForm.pid=0,a.addForm.type=\"1\"}}},[a._v(\"添加部门\")]),o(\"i\",{staticClass:\"el-icon-refresh refresh fr fs20 poi\",on:{click:function(e){return a.refresh()}}})],1),o(\"el-row\",{staticClass:\"row1\",attrs:{gutter:5}},[o(\"el-col\",{staticClass:\"col1\",attrs:{span:20}},[o(\"el-col\",{attrs:{span:3}},[o(\"el-input\",{attrs:{placeholder:\"请输入名称\",name:\"tfOrganization-name\",\"auto-complete\":\"off\"},model:{value:a.searchObj.name,callback:function(e){a.$set(a.searchObj,\"name\",\"string\"==typeof e?e.trim():e)},expression:\"searchObj.name\"}})],1),o(\"el-col\",{attrs:{span:1.5}},[o(\"el-button\",{directives:[{name:\"show\",rawName:\"v-show\",value:a.btPermissions[\"/backend/orgManage/select\"],expression:\"btPermissions['/backend/orgManage/select']\"}],style:{\"background-color\":a.bgColor.selectBt,\"border-color\":a.bgColor.selectBt},attrs:{type:\"primary\",size:\"small\"},on:{click:function(e){return a.search()}}},[a._v(\"搜索\")])],1),o(\"el-col\",{attrs:{span:1.5}},[o(\"el-button\",{style:{\"background-color\":a.bgColor.clearBt,\"border-color\":a.bgColor.clearBt},attrs:{type:\"primary\",size:\"small\"},on:{click:function(e){return a.clearOut()}}},[a._v(\"清除\")])],1)],1)],1),o(\"el-row\",{staticClass:\"row2\",attrs:{gutter:5}})],1),o(\"div\",{staticClass:\"table\"},[o(\"CommonTable\",{attrs:{tableData:a.tfOrganizationList,\"row-key\":\"id\",ifPagination:!1,refreshFuncName:\"getTfOrganizationList\",\"default-sort\":{prop:\"id\",order:\"ascending\"}}},[o(\"template\",{slot:\"main\"},[o(\"el-table-column\",{attrs:{align:\"center\",prop:\"id\",label:\"序号\",width:\"100\"}}),o(\"el-table-column\",{attrs:{align:\"center\",prop:\"name\",label:\"名称\"}}),o(\"el-table-column\",{attrs:{align:\"center\",prop:\"type\",label:\"组织类型\"},scopedSlots:a._u([{key:\"default\",fn:function(e){var t=e.row;return[a._v(\"\\n            \"+a._s(a._f(\"orgType\")(t.type))+\"\\n          \")]}}])}),o(\"el-table-column\",{attrs:{align:\"center\",prop:\"remarks\",label:\"备注\"}}),o(\"el-table-column\",{attrs:{align:\"center\",label:\"操作\",width:\"250\"},scopedSlots:a._u([{key:\"default\",fn:function(t){return[2!=t.row.type?o(\"el-button\",{directives:[{name:\"show\",rawName:\"v-show\",value:a.btPermissions[\"/backend/orgManage/add\"],expression:\"btPermissions['/backend/orgManage/add']\"}],style:{\"background-color\":a.bgColor.addBt,\"border-color\":a.bgColor.addBt},attrs:{type:\"danger\",size:\"mini\"},on:{click:function(e){return a.addOrganization(t.row)}}},[a._v(\"添加班组\")]):o(\"span\",{staticClass:\"ib\",staticStyle:{width:\"76px\",height:\"10px\"}}),o(\"el-button\",{directives:[{name:\"show\",rawName:\"v-show\",value:a.btPermissions[\"/backend/orgManage/delete\"],expression:\"btPermissions['/backend/orgManage/delete']\"}],style:{\"background-color\":a.bgColor.deleteBt,\"border-color\":a.bgColor.deleteBt},attrs:{type:\"danger\",size:\"small\"},on:{click:function(e){return a.deleteTfOrganization(t.row.id)}}},[a._v(\"删除\")]),o(\"el-button\",{directives:[{name:\"show\",rawName:\"v-show\",value:a.btPermissions[\"/backend/orgManage/update\"],expression:\"btPermissions['/backend/orgManage/update']\"}],style:{\"background-color\":a.bgColor.updateBt,\"border-color\":a.bgColor.updateBt},attrs:{type:\"danger\",size:\"small\"},on:{click:function(e){return a.updateTfOrganization(t.row)}}},[a._v(\"修改\")])]}}])})],1)],2)],1)],1)},[],!1,null,\"1e0ab831\",null);t.default=i.exports}}]);"}