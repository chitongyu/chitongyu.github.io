{"source":"(window.webpackJsonp=window.webpackJsonp||[]).push([[\"chunk-5a8a30f2\"],{\"1c33\":function(e,t,a){\"use strict\";a.r(t);a(\"d4d5\"),a(\"63ff\");var n,r,i,o=a(\"ad3e\"),s=(a(\"f763\"),{name:\"addChildTask\",components:{},filters:{},props:{distributableManHours:{type:Number,default:null,required:!0}},data:function(){var n=this;return{addForms:[{name:\"\",description:\"\",principalAdminCode:\"\",moduleId:\"\",planStartTime:\"\",planEndTime:\"\",planManHours:\"\"}],planStartTime:this.$route.query.planStartTime,planEndTime:this.$route.query.planEndTime,moduleName:this.$route.query.moduleName,parentTask:this.$route.query.parentTask,taskId:this.$route.query.parentTask,planManHours:this.$route.query.planManHours,taskStatus:this.$route.query.taskStatus,description:this.$route.query.description,principalAdminName:this.$route.query.principalAdminName,users:[],moduleList:[[]],loading:!1,userLoading:!1,childManHours:0,pickerOptions:{disabledDate:function(e){var t=n.$moment(n.planStartTime).valueOf(),a=n.$moment(n.planEndTime).valueOf();return e.getTime()<t||e.getTime()>a}}}},computed:{remainManHours:function(){return this.distributableManHours-this.childManHours},startPickerOptions:function(){return function(){var n=this;return{disabledDate:function(e){var t=n.$moment(n.planStartTime).valueOf(),a=n.$moment(n.planEndTime).valueOf();return e.getTime()<t||e.getTime()>a}}}},endPickerOptions:function(e){return function(n){var r=this;return{disabledDate:function(e){var t=r.$moment(r.planStartTime).valueOf(),a=r.$moment(r.planEndTime).valueOf();return e.getTime()<t||e.getTime()>a||e.getTime()<r.$moment(n.planStartTime).valueOf()}}}},defaultDate:function(){return this.$moment(this.planStartTime).toDate()}},watch:{addForms:{handler:function(e,t){var a=this;this.childManHours=0,e.forEach(function(e){a.$isEmpty(e.planManHours)||(a.childManHours=a.childManHours+Number(e.planManHours))})},deep:!0,immediate:!0}},created:function(){},methods:{handlerDate:function(e,t,a){this.$moment(t.planEndTime).valueOf()<this.$moment(t.planStartTime).valueOf()&&(t[a]=\"\",this.$message({showClose:!0,message:\"预计完成时间不能小于计划开始时间\",type:\"warning\"}))},changeName:(i=Object(o.a)(regeneratorRuntime.mark(function e(t,a,n){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a.moduleId=null,e.t0=this,e.t1=this.moduleList,e.t2=n,e.next=6,this.$api.common.getModule({values:t});case 6:e.t3=e.sent,e.t0.$set.call(e.t0,e.t1,e.t2,e.t3);case 8:case\"end\":return e.stop()}},e,this)})),function(e,t,a){return i.apply(this,arguments)}),moduleFocus:function(e,t){this.$isEmpty(t.principalAdminCode)&&this.$message({showClose:!0,message:\"请先选择指派人\",type:\"warning\"})},remoteMethod:(r=Object(o.a)(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(\"\"!==t)return this.userLoading=!0,e.next=5,this.$api.common.getNativeUser({name:t});e.next=9;break;case 5:this.users=e.sent,this.userLoading=!1,e.next=10;break;case 9:this.users=[];case 10:case\"end\":return e.stop()}},e,this)})),function(e){return r.apply(this,arguments)}),userFocus:(n=Object(o.a)(regeneratorRuntime.mark(function e(t,a){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=3,this.$api.common.getNativeUser();case 3:this.users=e.sent;case 4:case\"end\":return e.stop()}},e,this)})),function(e,t){return n.apply(this,arguments)}),addNode:function(e){this.addForms.splice(e+1,0,{principalAdminCode:\"\",name:\"\",moduleId:\"\",description:\"\",planStartTime:\"\",planEndTime:\"\",planManHours:\"\"}),this.moduleList.splice(e+1,0,[])},deleteNode:function(e){1<this.addForms.length?(this.addForms.splice(e,1),this.moduleList.splice(e,1)):this.$message({showClose:!0,message:\"不能再删除了\",type:\"warning\"})},save:function(){for(var e=this,t={name:\"任务名称\",description:\"任务描述\",principalAdminCode:\"责任人\",moduleId:\"工作模块\",planStartTime:\"计划开始时间\",planEndTime:\"计划完成时间\",planManHours:\"计划投入工时\"},a=0;a<this.addForms.length;a++){var n=this.addForms[a];for(var r in n){if(this.$isEmpty(n[r])&&\"description\"!=r&&\"planManHours\"!=r)return void this.$message({showClose:!0,message:\"请填写完整\"+t[r],type:\"warning\"});if(\"planManHours\"==r&&n.planManHours<=0)return void this.$message({showClose:!0,message:\"计划投入工时范围必须大于0\",type:\"warning\"})}}this.$confirm(\"确认提交?\",\"提示\",{confirmButtonText:\"确定\",cancelButtonText:\"取消\",type:\"warning\"}).then(function(){e.commitAdd()}).catch(function(){e.$message({type:\"info\",message:\"已取消\"})})},commitAdd:function(){var t=this;t.loading=!0,t.addDialogFormVisible=!1,t.$http.post(\"/admin/tfTask/addChildTasks.d\",{tfTasksStr:JSON.stringify(t.addForms),parentId:t.$route.query.taskId},function(e){t.$message({showClose:!0,message:\"新增成功\",type:\"success\"}),t.loading=!1,t.$emit(\"cancel\")},function(e){t.$message({showClose:!0,message:e.result.msg,type:\"warning\"}),t.loading=!1},function(e){t.$message({showClose:!0,message:e.error+\"-\"+e.message,type:\"warning\"}),t.loading=!1})}}}),l=(a(\"f735\"),a(\"6691\")),u={name:\"create-child-task\",components:{AddChildTask:Object(l.a)(s,function(){var n=this,e=n.$createElement,r=n._self._c||e;return r(\"div\",{staticClass:\"addChildTask w100 padding-left4 padding-right4\"},[r(\"div\",{staticClass:\"addChildTask__header w100  margin-top2 flex_row_between\"},[r(\"div\",{staticClass:\"flex_row_start\"},[r(\"div\",[n._v(\"可分配工时:\"),r(\"span\",{staticClass:\"cl_blue\"},[n._v(n._s(n.remainManHours)+\" \")])])])]),r(\"div\",{staticClass:\"addChildTask__body margin-top2\"},[r(\"table\",{staticClass:\"w100  tableForm\"},[r(\"tbody\",[n._m(0),r(\"tr\",{staticClass:\"header cl_fblack\"},[r(\"td\",{attrs:{width:\"150\"}},[n._v(\"父任务\")]),r(\"td\",{attrs:{width:\"200\"}},[n._v(n._s(n.parentTask))]),r(\"td\",{attrs:{width:\"200\"}},[n._v(n._s(n.description))]),r(\"td\",{attrs:{width:\"100\"}},[n._v(n._s(n.principalAdminName))]),r(\"td\",{attrs:{width:\"100\"}},[n._v(n._s(n.moduleName))]),r(\"td\",{attrs:{width:\"100\"}},[n._v(n._s(n.planStartTime))]),r(\"td\",{attrs:{width:\"100\"}},[n._v(n._s(n.planEndTime))]),r(\"td\",{attrs:{width:\"80\"}},[n._v(n._s(n.planManHours))]),r(\"td\",{attrs:{width:\"100\"}})]),n._l(n.addForms,function(t,a){return r(\"tr\",{key:a},[r(\"td\",{attrs:{width:\"150\"}},[r(\"div\",{staticStyle:{width:\"50px\"}},[n._v(n._s(a+1))])]),r(\"td\",{attrs:{width:\"200\"}},[r(\"el-input\",{staticStyle:{width:\"160px\"},attrs:{placeholder:\"输入任务名称\",maxlength:30,clearable:\"\"},model:{value:t.name,callback:function(e){n.$set(t,\"name\",e)},expression:\"item.name\"}})],1),r(\"td\",{attrs:{width:\"200\"}},[r(\"el-input\",{staticStyle:{width:\"160px\"},attrs:{placeholder:\"任务描述\",maxlength:30,clearable:\"\"},model:{value:t.description,callback:function(e){n.$set(t,\"description\",e)},expression:\"item.description\"}})],1),r(\"td\",{attrs:{width:\"100\"}},[r(\"el-select\",{attrs:{clearable:\"\",filterable:\"\",remote:\"\",\"reserve-keyword\":\"\",placeholder:\"输入姓名\",\"remote-method\":n.remoteMethod,loading:n.userLoading},on:{focus:function(e){n.userFocus(e,t)},change:function(e){n.changeName(e,t,a)}},model:{value:t.principalAdminCode,callback:function(e){n.$set(t,\"principalAdminCode\",e)},expression:\"item.principalAdminCode\"}},n._l(n.users,function(e){return r(\"el-option\",{key:e.code,attrs:{label:e.name+\"-\"+e.code,value:e.code}})}),1)],1),r(\"td\",{attrs:{width:\"100\"}},[r(\"el-select\",{attrs:{clearable:\"\",filterable:\"\",placeholder:\"选择模块\"},on:{focus:function(e){n.moduleFocus(e,t)}},model:{value:t.moduleId,callback:function(e){n.$set(t,\"moduleId\",e)},expression:\"item.moduleId\"}},n._l(n.moduleList[a],function(e){return r(\"el-option\",{key:e.id,attrs:{label:e.name,value:e.id}})}),1)],1),r(\"td\",{attrs:{width:\"100\"}},[r(\"el-date-picker\",{attrs:{type:\"date\",\"default-value\":n.defaultDate,\"picker-options\":n.pickerOptions,\"value-format\":\"yyyy-MM-dd\",placeholder:\"计划开始时间\"},on:{change:function(e){n.handlerDate(e,t,\"planStartTime\")}},model:{value:t.planStartTime,callback:function(e){n.$set(t,\"planStartTime\",e)},expression:\"item.planStartTime\"}})],1),r(\"td\",{attrs:{width:\"100\"}},[r(\"el-date-picker\",{attrs:{type:\"date\",\"default-value\":n.defaultDate,\"picker-options\":n.pickerOptions,\"value-format\":\"yyyy-MM-dd\",placeholder:\"预计完成时间\"},on:{change:function(e){n.handlerDate(e,t,\"planEndTime\")}},model:{value:t.planEndTime,callback:function(e){n.$set(t,\"planEndTime\",e)},expression:\"item.planEndTime\"}})],1),r(\"td\",{attrs:{width:\"80\"}},[r(\"el-input\",{attrs:{placeholder:\"预计投入工时\",type:\"Number\",clearable:\"\"},model:{value:t.planManHours,callback:function(e){n.$set(t,\"planManHours\",e)},expression:\"item.planManHours\"}})],1),r(\"td\",{attrs:{width:\"100\"}},[r(\"div\",[r(\"i\",{staticClass:\"iconfont icon-jia fs_20 cl_blue\",on:{click:function(e){return n.addNode(a)}}}),r(\"i\",{staticClass:\"iconfont icon-cha fs_20 cl_red\",on:{click:function(e){return n.deleteNode(a)}}})])])])})],2)])]),r(\"div\",{staticClass:\"addChildTask__footer w100  margin-top2 flex_row_center\"},[r(\"el-button\",{attrs:{type:\"primary\"},on:{click:function(e){return n.save()}}},[n._v(\"保存\")]),r(\"el-button\",{on:{click:function(e){return n.$emit(\"cancel\")}}},[n._v(\"返回\")])],1)])},[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a(\"tr\",{staticClass:\"header\"},[a(\"td\",{attrs:{width:\"150\"}},[e._v(\"序号\")]),a(\"td\",{attrs:{width:\"200\"}},[e._v(\"任务名称\")]),a(\"td\",{attrs:{width:\"200\"}},[e._v(\"任务描述\")]),a(\"td\",{attrs:{width:\"100\"}},[e._v(\"指派给\")]),a(\"td\",{attrs:{width:\"100\"}},[e._v(\"工作模块\")]),a(\"td\",{attrs:{width:\"100\"}},[e._v(\"计划开始时间\")]),a(\"td\",{attrs:{width:\"100\"}},[e._v(\"预计完成时间\")]),a(\"td\",{attrs:{width:\"80\"}},[e._v(\"计划投入工时\")]),a(\"td\",{attrs:{width:\"100\"}})])}],!1,null,null,null).exports,UpdateTask:a(\"467b\").a},filters:{},props:{},data:function(){return{addChildTaskDialog:!1,departName:this.$store.getters[\"user/getInfo\"]&&this.$store.getters[\"user/getInfo\"].deptName,groupName:this.$store.getters[\"user/getInfo\"]&&this.$store.getters[\"user/getInfo\"].groupName,tableData:[{id:2,name:\"test\",value:1},{id:1,name:\"test\",value:1}],searchObj:{page:1,pageSize:15},updateObj:{},updateTaskDialog:!1,updateForm:{id:\"\",projectNumber:\"\",principalAdminCode:\"\",moduleId:\"\",name:\"\",description:\"\",lineName:\"\",planStartTime:\"\",planEndTime:\"\",planManHours:\"\"},updateRuleForm:{projectNumber:[{required:!0,message:\"请输入项目编号\"}],moduleId:[{required:!0,message:\"请选择模块\"}],name:[{required:!0,message:\"请输入任务名称\"}],description:[{required:!0,message:\"请输入任务描述\"}],roleId:[{required:!0,message:\"请输入角色\"}],planStartTime:[{required:!0,message:\"请选择计划开始时间\"}],planEndTime:[{required:!0,message:\"请选择计划结束时间\"}],planManHours:[{required:!0,message:\"请输入预计投入工时\"}],principalAdminName:[{required:!0,message:\"\"}],reason:[{required:!0,message:\"请输入修改原因\"}]},total:100,taskStatus:0,childTaskId:null,list:[],childTaskList:[],loading:!1}},computed:{distributableManHours:function(){var e=this.$route.query.planManHours,t=this.childTaskList.reduce(function(e,t){return e+t.planManHours},0);return Number(e)-t}},watch:{},created:function(){this.refresh()},methods:{deleteTask:function(e){var t=this;0==e.status?this.$confirm(\"确认删除?\",\"提示\",{confirmButtonText:\"确定\",cancelButtonText:\"取消\",type:\"warning\"}).then(function(){t.commitDelete(e.id)}).catch(function(){t.$message({type:\"info\",message:\"已取消\"})}):this.$message({showClose:!0,message:\"只有未开始的任务才能删除\",type:\"warning\"})},commitDelete:function(e){var t=this;t.loading=!0,t.$http.post(\"/admin/tfTask/deleteTask.d\",{id:e},function(e){t.$message({type:\"success\",message:\"删除成功!\"}),t.refresh()},function(e){t.$message({showClose:!0,message:e.result.msg,type:\"warning\"}),t.loading=!1},function(e){t.$message({showClose:!0,message:e.error+\"-\"+e.message,type:\"warning\"}),t.loading=!1})},updateTask:function(e){3!=e.status?2!=e.status?(this.updateObj=e,this.childTaskId=e.id,this.updateTaskDialog=!0):this.$message({showClose:!0,message:\"该任务已完成，请重新选择\",type:\"warning\"}):this.$message({showClose:!0,message:\"该任务已关闭\",type:\"warning\"})},showUpdate:function(e){return(this.$store.getters[\"user/getInfo\"]?this.$store.getters[\"user/getInfo\"].sapCode:\"\")==e},refresh:function(){this.getAllTaskByParentId()},getAllTaskByParentId:function(){var t=this;t.loading=!0,t.$http.post(\"/admin/tfTask/listAllByParentId.d\",{parentId:this.$route.query.taskId},function(e){t.childTaskList=e.body.rows,t.total=e.body.total,t.loading=!1},function(e){t.$message({showClose:!0,message:e.result.msg,type:\"warning\"}),t.loading=!1},function(e){t.$message({showClose:!0,message:e.error+\"-\"+e.message,type:\"warning\"}),t.loading=!1})}}},c=(a(\"78df\"),Object(l.a)(u,function(){var a=this,e=a.$createElement,n=a._self._c||e;return n(\"div\",{staticClass:\"create-child-task w100 h100 rel flex column\"},[n(\"div\",{staticClass:\"bg_white pos padding2 padding-left4 no_shrink\"},[n(\"el-breadcrumb\",{attrs:{\"separator-class\":\"iconfont icon-you \"}},[n(\"el-breadcrumb-item\",[a._v(\"明珞\")]),n(\"el-breadcrumb-item\",[a._v(a._s(a.departName))]),n(\"el-breadcrumb-item\",[a._v(a._s(a.groupName))]),n(\"el-breadcrumb-item\",[n(\"span\",{staticClass:\"navItem\",on:{click:function(e){return a.$backTo()}}},[a._v(\"任务\")])]),n(\"el-breadcrumb-item\",[a._v(\"子任务\")])],1)],1),n(\"div\",{staticClass:\"w100 h100 rel\"},[n(\"el-dialog\",{staticClass:\"updateTaskDialog dialogCenter\",attrs:{title:\"修改任务\",\"modal-append-to-body\":!1,\"close-on-click-modal\":!1,visible:a.updateTaskDialog,\"destroy-on-close\":!0},on:{\"update:visible\":function(e){a.updateTaskDialog=e}}},[n(\"UpdateTask\",{attrs:{updateObj:a.updateObj,taskId:a.childTaskId},on:{cancel:function(e){a.updateTaskDialog=!1,a.refresh()}}})],1),n(\"el-dialog\",{staticClass:\"addChildTaskDialog dialogCenter\",attrs:{title:\"添加子任务\",\"modal-append-to-body\":!1,\"close-on-click-modal\":!1,visible:a.addChildTaskDialog,\"destroy-on-close\":!0},on:{\"update:visible\":function(e){a.addChildTaskDialog=e}}},[n(\"AddChildTask\",{attrs:{distributableManHours:a.distributableManHours},on:{cancel:function(e){a.addChildTaskDialog=!1,a.refresh()}}})],1),n(\"div\",{staticClass:\"task-status fs_13 padding2 padding-left4  flex_row_between\"},[n(\"span\",[a._v(\"父任务：\"+a._s(a.$route.query.parentTask))]),n(\"div\",{staticClass:\"flex_row_start\"},[n(\"el-button\",{staticClass:\"fs_13 flex_row_center\",attrs:{type:\"primary\",icon:\"icon-fanhui iconfont fs_13\"},on:{click:function(e){return a.$backTo()}}},[a._v(\"返回\")]),n(\"el-button\",{staticClass:\"fs_13 margin-right4\",attrs:{type:\"primary\"},on:{click:function(e){a.addChildTaskDialog=!0}}},[a._v(\"添加子任务\")])],1)]),n(\"div\",{staticClass:\"create-child-task-table bg_white  margin-left4 margin-right4 border\"},[n(\"el-table\",{attrs:{data:a.childTaskList}},[n(\"el-table-column\",{attrs:{align:\"center\",prop:\"id\",label:\"ID\",width:\"100\"}}),n(\"el-table-column\",{attrs:{align:\"center\",prop:\"projectNumber\",label:\"项目编号\",width:\"100\"}}),n(\"el-table-column\",{attrs:{align:\"center\",prop:\"projectName\",label:\"项目名称\"}}),n(\"el-table-column\",{attrs:{align:\"center\",prop:\"lineName\",label:\"线体\",width:\"100\"}}),n(\"el-table-column\",{attrs:{align:\"center\",prop:\"departmentName\",label:\"部门\"}}),n(\"el-table-column\",{attrs:{align:\"center\",prop:\"groupName\",label:\"小组\"}}),n(\"el-table-column\",{attrs:{align:\"center\",prop:\"moduleName\",label:\"工作模块\",width:\"90\"}}),n(\"el-table-column\",{attrs:{align:\"center\",prop:\"name\",label:\"任务名称\",\"min-width\":\"150\"}}),n(\"el-table-column\",{attrs:{align:\"center\",prop:\"description\",\"min-width\":\"150\",label:\"描述\"}}),n(\"el-table-column\",{attrs:{align:\"center\",prop:\"planStartTime\",label:\"计划开始时间\",width:\"120\"}}),n(\"el-table-column\",{attrs:{align:\"center\",prop:\"planEndTime\",label:\"计划完成时间\",width:\"120\"}}),n(\"el-table-column\",{attrs:{align:\"center\",prop:\"planManHours\",label:\"预计\",width:\"70\"},scopedSlots:a._u([{key:\"default\",fn:function(e){var t=e.row;return[a._v(\"\\r\\n            \"+a._s(a.$toInt(t.planManHours))+\"\\r\\n          \")]}}])}),n(\"el-table-column\",{attrs:{align:\"center\",prop:\"actualManHours\",label:\"消耗\",width:\"70\"},scopedSlots:a._u([{key:\"default\",fn:function(e){var t=e.row;return[a._v(\"\\r\\n            \"+a._s(a.$toInt(t.actualManHours))+\"\\r\\n          \")]}}])}),n(\"el-table-column\",{attrs:{align:\"center\",prop:\"distributableManHours\",label:\"剩余\",width:\"70\"},scopedSlots:a._u([{key:\"default\",fn:function(e){var t=e.row;return[a._v(\"\\r\\n            \"+a._s(a.$toInt(t.planManHours-t.actualManHours))+\"\\r\\n          \")]}}])}),n(\"el-table-column\",{attrs:{align:\"center\",prop:\"completionRate\",label:\"进度\",width:\"70\"},scopedSlots:a._u([{key:\"default\",fn:function(e){var t=e.row;return[a._v(\"\\r\\n            \"+a._s(a.$toInt(t.completionRate))+\"%\\r\\n          \")]}}])}),n(\"el-table-column\",{attrs:{align:\"center\",prop:\"principalAdminName\",label:\"指派给\",width:\"80\"}}),n(\"el-table-column\",{attrs:{align:\"center\",prop:\"createAdminName\",label:\"创建人\",width:\"80\"}}),n(\"el-table-column\",{attrs:{align:\"center\",prop:\"status\",label:\"状态\",width:\"60\",fixed:\"right\"},scopedSlots:a._u([{key:\"default\",fn:function(e){var t=e.row;return[a._v(\"\\r\\n              \"+a._s(a._f(\"taskStatus\")(t.status))+\"\\r\\n          \")]}}])}),n(\"el-table-column\",{attrs:{align:\"center\",prop:\"\",label:\"操作\",width:\"80\",fixed:\"right\"},scopedSlots:a._u([{key:\"default\",fn:function(e){var t=e.row;return[a.showUpdate(t.createAdminCode)?n(\"el-tooltip\",{staticClass:\"item\",attrs:{effect:\"dark\",content:\"修改任务\",placement:\"bottom-start\"}},[n(\"i\",{staticClass:\"iconfont icon-bianji1 fs_20 \",class:3==t.status||2==t.status?\"cl_grey\":\"cl_blue\",on:{click:function(e){return a.updateTask(t)}}})]):a._e(),a.showUpdate(t.createAdminCode)?n(\"el-tooltip\",{staticClass:\"item\",attrs:{effect:\"dark\",content:\"删除任务\",placement:\"bottom-start\"}},[n(\"i\",{staticClass:\"iconfont icon-cha fs_20\",class:0==t.status?\"cl_blue\":\"cl_grey\",on:{click:function(e){return a.deleteTask(t)}}})]):a._e()]}}])})],1)],1)],1)])},[],!1,null,\"0a849e1f\",null));t.default=c.exports},\"467b\":function(e,t,a){\"use strict\";a(\"7364\"),a(\"d4d5\");var n={name:\"compName\",components:{},filters:{},props:{updateObj:{type:Object,default:function(){},required:!1},taskId:{type:Number,default:null,required:!1}},data:function(){return{options:[{lable:1,value:1}],list:[],loading:!1,updateForm:{id:\"\",projectNumber:\"\",principalAdminCode:\"\",moduleId:\"\",moduleName:\"\",name:\"\",description:\"\",lineName:\"\",planStartTime:\"\",planEndTime:\"\",planManHours:\"\"},updateRuleForm:{projectNumber:[{required:!0,message:\"请输入项目编号\"}],moduleId:[{required:!0,message:\"请选择模块\"}],name:[{required:!0,message:\"请输入任务名称\"}],description:[{required:!0,message:\"请输入任务描述\"}],roleId:[{required:!0,message:\"请输入角色\"}],planStartTime:[{required:!0,message:\"请选择计划开始时间\"}],planEndTime:[{required:!0,message:\"请选择计划结束时间\"}],planManHours:[{required:!0,message:\"请输入预计投入工时\"}],principalAdminName:[{required:!0,message:\"\"}],reason:[{required:!0,message:\"请输入修改原因\"}]}}},computed:{},watch:{updateObj:{handler:function(e,t){this.updateForm.taskId=this.taskId,this.updateForm.id=e.id,this.updateForm.taskId=e.id,this.updateForm.projectNumber=e.projectNumber,this.updateForm.projectName=e.projectName,this.updateForm.principalAdminCode=e.principalAdminCode,this.updateForm.principalAdminName=e.principalAdminName,this.updateForm.moduleId=e.moduleId,this.updateForm.moduleName=e.moduleName,this.updateForm.name=e.name,this.updateForm.description=e.description,this.updateForm.lineName=e.lineName,this.updateForm.planStartTime=e.planStartTime,this.updateForm.planEndTime=e.planEndTime,this.updateForm.planManHours=e.planManHours},deep:!0,immediate:!0}},created:function(){},methods:{handlerDate:function(e,t,a){this.$moment(t.planEndTime).valueOf()<this.$moment(t.planStartTime).valueOf()&&(t[a]=\"\",this.$message({showClose:!0,message:\"预计完成时间不能小于计划开始时间\",type:\"warning\"}))},save:function(){var e=this;24<self.updateForm.manHours||self.updateForm.manHours<=0?self.$message({showClose:!0,message:\"工时范围必须为0~24之间\",type:\"warning\"}):this.$confirm(\"确认提交?\",\"提示\",{confirmButtonText:\"确定\",cancelButtonText:\"取消\",type:\"warning\"}).then(function(){e.$message({type:\"success\",message:\"提交成功!\"}),e.$backTo()}).catch(function(){e.$message({type:\"info\",message:\"已取消\"})})},commitUpdate:function(){var t=this;t.$http.post(\"/admin/tfTask/update.d\",t.updateForm,function(e){t.$emit(\"cancel\"),t.$message({showClose:!0,message:\"修改成功\",type:\"success\"})},function(e){t.$message({showClose:!0,message:e.result.msg,type:\"warning\"})},function(e){t.$message({showClose:!0,message:e.error+\"-\"+e.message,type:\"warning\"}),t.loading=!1})}}},r=(a(\"7eb6\"),a(\"6691\")),i=Object(r.a)(n,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(\"div\",{staticClass:\"compName w100\"},[a(\"el-form\",{ref:\"updateRuleForm\",attrs:{model:t.updateForm,rules:t.updateRuleForm,\"status-icon\":\"\",\"label-width\":\"100px\"}},[a(\"el-form-item\",{attrs:{label:\"项目编号\",prop:\"projectNumber\"}},[a(\"el-input\",{attrs:{maxlength:50,placeholder:\"请项目编号\",name:\"projectNumber\",disabled:!0,\"auto-complete\":\"off\"},model:{value:t.updateForm.projectNumber,callback:function(e){t.$set(t.updateForm,\"projectNumber\",\"string\"==typeof e?e.trim():e)},expression:\"updateForm.projectNumber\"}})],1),a(\"el-form-item\",{attrs:{label:\"项目名称\",prop:\"projectNumber\"}},[a(\"el-input\",{attrs:{maxlength:50,placeholder:\"项目名称\",name:\"projectName\",disabled:!0,\"auto-complete\":\"off\"},model:{value:t.updateForm.projectName,callback:function(e){t.$set(t.updateForm,\"projectName\",\"string\"==typeof e?e.trim():e)},expression:\"updateForm.projectName\"}})],1),a(\"el-form-item\",{attrs:{label:\"工作模块\",prop:\"name\"}},[a(\"el-input\",{attrs:{maxlength:50,placeholder:\"\",name:\"moduleName\",disabled:!0,\"auto-complete\":\"off\"},model:{value:t.updateForm.moduleName,callback:function(e){t.$set(t.updateForm,\"moduleName\",\"string\"==typeof e?e.trim():e)},expression:\"updateForm.moduleName\"}})],1),a(\"el-form-item\",{attrs:{label:\"任务名称\",prop:\"name\"}},[a(\"el-input\",{attrs:{maxlength:50,placeholder:\"输入任务名称\",name:\"name\",\"auto-complete\":\"off\"},model:{value:t.updateForm.name,callback:function(e){t.$set(t.updateForm,\"name\",\"string\"==typeof e?e.trim():e)},expression:\"updateForm.name\"}})],1),a(\"el-form-item\",{attrs:{label:\"任务描述\",prop:\"name\"}},[a(\"el-input\",{attrs:{maxlength:50,placeholder:\"输入任务描述\",name:\"name\",\"auto-complete\":\"off\"},model:{value:t.updateForm.description,callback:function(e){t.$set(t.updateForm,\"description\",\"string\"==typeof e?e.trim():e)},expression:\"updateForm.description\"}})],1),a(\"el-form-item\",{attrs:{label:\"计划开始时间\",prop:\"name\"}},[a(\"el-date-picker\",{attrs:{type:\"date\",\"value-format\":\"yyyy-MM-dd\",placeholder:\"计划开始时间\"},on:{change:function(e){t.handlerDate(e,t.updateForm,\"planStartTime\")}},model:{value:t.updateForm.planStartTime,callback:function(e){t.$set(t.updateForm,\"planStartTime\",e)},expression:\"updateForm.planStartTime\"}})],1),a(\"el-form-item\",{attrs:{label:\"预计完成时间\",prop:\"planEndTime\"}},[a(\"el-date-picker\",{attrs:{type:\"date\",\"value-format\":\"yyyy-MM-dd\",placeholder:\"预计完成时间\"},on:{change:function(e){t.handlerDate(e,t.updateForm,\"planEndTime\")}},model:{value:t.updateForm.planEndTime,callback:function(e){t.$set(t.updateForm,\"planEndTime\",e)},expression:\"updateForm.planEndTime\"}})],1),a(\"el-form-item\",{attrs:{label:\"预计投入工时\",prop:\"planManHours\"}},[a(\"el-input\",{attrs:{placeholder:\"预计投入工时\",clearable:\"\"},model:{value:t.updateForm.planManHours,callback:function(e){t.$set(t.updateForm,\"planManHours\",e)},expression:\"updateForm.planManHours\"}})],1),a(\"el-form-item\",{attrs:{label:\"指派给\",prop:\"principalAdminName\"}},[a(\"el-input\",{attrs:{placeholder:\"\",clearable:\"\",disabled:!0},model:{value:t.updateForm.principalAdminName,callback:function(e){t.$set(t.updateForm,\"principalAdminName\",e)},expression:\"updateForm.principalAdminName\"}})],1),a(\"el-form-item\",{attrs:{label:\"修改原因\",prop:\"reason\"}},[a(\"el-input\",{attrs:{maxlength:50,placeholder:\"请输入修改原因\",name:\"reason\",\"auto-complete\":\"off\"},model:{value:t.updateForm.reason,callback:function(e){t.$set(t.updateForm,\"reason\",\"string\"==typeof e?e.trim():e)},expression:\"updateForm.reason\"}})],1)],1),a(\"div\",{staticClass:\"w100 flex_row_center padding1\"},[a(\"el-button\",{attrs:{type:\"primary\"},on:{click:function(e){return t.commitUpdate()}}},[t._v(\"保存\")]),a(\"el-button\",{on:{click:function(e){return t.$emit(\"cancel\")}}},[t._v(\"返回\")])],1)],1)},[],!1,null,\"3e0ee58e\",null);t.a=i.exports},\"63ff\":function(e,t,a){var n=function(i){\"use strict\";var l,e=Object.prototype,u=e.hasOwnProperty,t=\"function\"==typeof Symbol?Symbol:{},r=t.iterator||\"@@iterator\",a=t.asyncIterator||\"@@asyncIterator\",n=t.toStringTag||\"@@toStringTag\";function o(e,t,a,n){var r=t&&t.prototype instanceof s?t:s,i=Object.create(r.prototype),o=new F(n||[]);return i._invoke=function(i,o,s){var l=d;return function(e,t){if(l===p)throw new Error(\"Generator is already running\");if(l===h){if(\"throw\"===e)throw t;return E()}for(s.method=e,s.arg=t;;){var a=s.delegate;if(a){var n=$(a,s);if(n){if(n===f)continue;return n}}if(\"next\"===s.method)s.sent=s._sent=s.arg;else if(\"throw\"===s.method){if(l===d)throw l=h,s.arg;s.dispatchException(s.arg)}else\"return\"===s.method&&s.abrupt(\"return\",s.arg);l=p;var r=c(i,o,s);if(\"normal\"===r.type){if(l=s.done?h:m,r.arg===f)continue;return{value:r.arg,done:s.done}}\"throw\"===r.type&&(l=h,s.method=\"throw\",s.arg=r.arg)}}}(e,a,o),i}function c(e,t,a){try{return{type:\"normal\",arg:e.call(t,a)}}catch(e){return{type:\"throw\",arg:e}}}i.wrap=o;var d=\"suspendedStart\",m=\"suspendedYield\",p=\"executing\",h=\"completed\",f={};function s(){}function g(){}function v(){}var b={};b[r]=function(){return this};var y=Object.getPrototypeOf,w=y&&y(y(C([])));w&&w!==e&&u.call(w,r)&&(b=w);var k=v.prototype=s.prototype=Object.create(b);function _(e){[\"next\",\"throw\",\"return\"].forEach(function(t){e[t]=function(e){return this._invoke(t,e)}})}function T(l){var t;this._invoke=function(a,n){function e(){return new Promise(function(e,t){!function t(e,a,n,r){var i=c(l[e],l,a);if(\"throw\"!==i.type){var o=i.arg,s=o.value;return s&&\"object\"==typeof s&&u.call(s,\"__await\")?Promise.resolve(s.__await).then(function(e){t(\"next\",e,n,r)},function(e){t(\"throw\",e,n,r)}):Promise.resolve(s).then(function(e){o.value=e,n(o)},function(e){return t(\"throw\",e,n,r)})}r(i.arg)}(a,n,e,t)})}return t=t?t.then(e,e):e()}}function $(e,t){var a=e.iterator[t.method];if(a===l){if(t.delegate=null,\"throw\"===t.method){if(e.iterator.return&&(t.method=\"return\",t.arg=l,$(e,t),\"throw\"===t.method))return f;t.method=\"throw\",t.arg=new TypeError(\"The iterator does not provide a 'throw' method\")}return f}var n=c(a,e.iterator,t.arg);if(\"throw\"===n.type)return t.method=\"throw\",t.arg=n.arg,t.delegate=null,f;var r=n.arg;return r?r.done?(t[e.resultName]=r.value,t.next=e.nextLoc,\"return\"!==t.method&&(t.method=\"next\",t.arg=l),t.delegate=null,f):r:(t.method=\"throw\",t.arg=new TypeError(\"iterator result is not an object\"),t.delegate=null,f)}function x(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function N(e){var t=e.completion||{};t.type=\"normal\",delete t.arg,e.completion=t}function F(e){this.tryEntries=[{tryLoc:\"root\"}],e.forEach(x,this),this.reset(!0)}function C(t){if(t){var e=t[r];if(e)return e.call(t);if(\"function\"==typeof t.next)return t;if(!isNaN(t.length)){var a=-1,n=function e(){for(;++a<t.length;)if(u.call(t,a))return e.value=t[a],e.done=!1,e;return e.value=l,e.done=!0,e};return n.next=n}}return{next:E}}function E(){return{value:l,done:!0}}return g.prototype=k.constructor=v,v.constructor=g,v[n]=g.displayName=\"GeneratorFunction\",i.isGeneratorFunction=function(e){var t=\"function\"==typeof e&&e.constructor;return!!t&&(t===g||\"GeneratorFunction\"===(t.displayName||t.name))},i.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,v):(e.__proto__=v,n in e||(e[n]=\"GeneratorFunction\")),e.prototype=Object.create(k),e},i.awrap=function(e){return{__await:e}},_(T.prototype),T.prototype[a]=function(){return this},i.AsyncIterator=T,i.async=function(e,t,a,n){var r=new T(o(e,t,a,n));return i.isGeneratorFunction(t)?r:r.next().then(function(e){return e.done?e.value:r.next()})},_(k),k[n]=\"Generator\",k[r]=function(){return this},k.toString=function(){return\"[object Generator]\"},i.keys=function(a){var n=[];for(var e in a)n.push(e);return n.reverse(),function e(){for(;n.length;){var t=n.pop();if(t in a)return e.value=t,e.done=!1,e}return e.done=!0,e}},i.values=C,F.prototype={constructor:F,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=l,this.done=!1,this.delegate=null,this.method=\"next\",this.arg=l,this.tryEntries.forEach(N),!e)for(var t in this)\"t\"===t.charAt(0)&&u.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=l)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if(\"throw\"===e.type)throw e.arg;return this.rval},dispatchException:function(a){if(this.done)throw a;var n=this;function e(e,t){return i.type=\"throw\",i.arg=a,n.next=e,t&&(n.method=\"next\",n.arg=l),!!t}for(var t=this.tryEntries.length-1;0<=t;--t){var r=this.tryEntries[t],i=r.completion;if(\"root\"===r.tryLoc)return e(\"end\");if(r.tryLoc<=this.prev){var o=u.call(r,\"catchLoc\"),s=u.call(r,\"finallyLoc\");if(o&&s){if(this.prev<r.catchLoc)return e(r.catchLoc,!0);if(this.prev<r.finallyLoc)return e(r.finallyLoc)}else if(o){if(this.prev<r.catchLoc)return e(r.catchLoc,!0)}else{if(!s)throw new Error(\"try statement without catch or finally\");if(this.prev<r.finallyLoc)return e(r.finallyLoc)}}}},abrupt:function(e,t){for(var a=this.tryEntries.length-1;0<=a;--a){var n=this.tryEntries[a];if(n.tryLoc<=this.prev&&u.call(n,\"finallyLoc\")&&this.prev<n.finallyLoc){var r=n;break}}r&&(\"break\"===e||\"continue\"===e)&&r.tryLoc<=t&&t<=r.finallyLoc&&(r=null);var i=r?r.completion:{};return i.type=e,i.arg=t,r?(this.method=\"next\",this.next=r.finallyLoc,f):this.complete(i)},complete:function(e,t){if(\"throw\"===e.type)throw e.arg;return\"break\"===e.type||\"continue\"===e.type?this.next=e.arg:\"return\"===e.type?(this.rval=this.arg=e.arg,this.method=\"return\",this.next=\"end\"):\"normal\"===e.type&&t&&(this.next=t),f},finish:function(e){for(var t=this.tryEntries.length-1;0<=t;--t){var a=this.tryEntries[t];if(a.finallyLoc===e)return this.complete(a.completion,a.afterLoc),N(a),f}},catch:function(e){for(var t=this.tryEntries.length-1;0<=t;--t){var a=this.tryEntries[t];if(a.tryLoc===e){var n=a.completion;if(\"throw\"===n.type){var r=n.arg;N(a)}return r}}throw new Error(\"illegal catch attempt\")},delegateYield:function(e,t,a){return this.delegate={iterator:C(e),resultName:t,nextLoc:a},\"next\"===this.method&&(this.arg=l),f}},i}(e.exports);try{regeneratorRuntime=n}catch(e){Function(\"r\",\"regeneratorRuntime = r\")(n)}},7364:function(e,t,a){var n=a(\"ddf7\").f,r=Function.prototype,i=/^\\s*function ([^ (]*)/;\"name\"in r||a(\"dad2\")&&n(r,\"name\",{configurable:!0,get:function(){try{return(\"\"+this).match(i)[1]}catch(e){return\"\"}}})},\"78df\":function(e,t,a){\"use strict\";var n=a(\"ad94\");a.n(n).a},\"7eb6\":function(e,t,a){\"use strict\";var n=a(\"9b41\");a.n(n).a},\"9b41\":function(e,t,a){},ad3e:function(e,t,a){\"use strict\";function l(e,t,a,n,r,i,o){try{var s=e[i](o),l=s.value}catch(e){return void a(e)}s.done?t(l):Promise.resolve(l).then(n,r)}function n(s){return function(){var e=this,o=arguments;return new Promise(function(t,a){var n=s.apply(e,o);function r(e){l(n,t,a,r,i,\"next\",e)}function i(e){l(n,t,a,r,i,\"throw\",e)}r(void 0)})}}a.d(t,\"a\",function(){return n})},ad94:function(e,t,a){},f465:function(e,t,a){},f735:function(e,t,a){\"use strict\";var n=a(\"f465\");a.n(n).a}}]);"}