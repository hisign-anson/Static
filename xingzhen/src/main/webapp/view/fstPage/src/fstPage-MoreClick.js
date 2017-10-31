importing('currentDate');
define([
    'underscore',
    'text!/view/fstPage/achievementMoreList.html',
    'text!/view/fstPage/tpl/moreList/achievementMoreListTr.html',
    'text!/view/fstPage/tpl/moreList/achievementInfo.html',
    'text!/view/fstPage/tpl/moreList/achievementInfoAjTr.html',
    'text!/view/fstPage/tpl/moreList/achievementInfoGroupMemberTr.html',
    'text!/view/fstPage/tpl/moreList/groupTaskList.html',
    'text!/view/fstPage/tpl/moreList/newsMoreListTr.html',
    'text!/view/fstPage/tpl/moreList/messageMoreListTr.html',
    'text!/view/fstPage/tpl/moreList/knowledgeMoreListTr.html',
    'text!/view/fstPage/tpl/moreList/toolDownloadMoreListTr.html',
    'text!/view/fstPage/tpl/moreList/commonMoreListTr.html',
    'text!/view/caseInvestigation/tpl/task/taskEdit.html',
    '../dat/fstPage.js'], function (_, achieveMoreListTpl, achieveMoreListTrTpl, achievementInfoTpl,achievementInfoAjTrTpl,achievementInfoGroupMemberTrTpl, groupTaskListTpl,
                                                                              newsMoreListTrTpl, messageMoreListTrTpl, knowledgeMoreListTrTpl, downloadMoreListTrTpl,commonMoreListTrTpl,taskEditTpl,fstPageAjax) {
    return {
        showAchieveMoreList: function () {
            _self = this;
            $('#achieveListResult').pagingList({
                action:top.servicePath_xz+'/index/getAchievement',
                jsonObj:{},
                callback:function(data){
                    debugger
                    $("#achieveListTable tbody").empty().html(_.template(achieveMoreListTrTpl, {data: data}));

                    $("#achieveListTable").on("click", ".link-text", function () {
                        $("#mainDiv").empty().html(_.template(achievementInfoTpl));
                        var groupId=$(this).attr("data-groupId");
                        $("#myTabMinor").attr("data-groupid",groupId);//把值存到导航头
                        if(groupId){
                            _self.getGroupMemberList(groupId);//平台成果展示(点击更多--获取所有组内成员)
                        }
                        _self.getAjGroupPage();//平台成果展示(点击更多--涉及案件)
                        $("#myTabMinor a").on("click", function () {
                            $(this).tab('show');
                            var groupId=$("#myTabMinor").attr("data-groupid");//获取导航头的值
                            if ($(this).attr("id") == "01") {
                                // $(".tab-content.content-minor").empty().html(_.template("graph 图"));
                                _self.showChart();
                            } else {
                                if(groupId){
                                    _self.showTable(groupId);
                                }
                            }
                        });
                        $('#myTabMinor a:first').click();
                    });
                }
            })

        },

        getAjGroupPage:function(){//平台成果展示(点击更多--涉及案件)
            _self=this;
            fstPageAjax.getAjGroupPage({},function(r){
                debugger
                if(r.flag==1){
                    $("#caseTable tbody").empty().html(_.template(achievementInfoAjTrTpl,{data: r.data}));
                }else{
                    toast(r.msg,600).err();
                }
            });
        },
        getGroupMemberList:function(groupId){//平台成果展示(点击更多--获取所有组内成员)
            _self=this;
            $.ajax({
                url:top.servicePath_xz+'/usergroup/getGroupMemberList',
                type:"post",
                contentType: "application/x-www-form-urlencoded",
                data:{groupId:groupId},
                success:function(r){
                    debugger
                    if(r.flag==1){
                        $("#staffTable tbody").empty().html(_.template(achievementInfoAjTrTpl,{data: r.data}));
                    }else{
                        toast(r.msg,600).err();
                    }
                }
            });
        },
        showChart: function () {
            _self = this;
            var iframe = '<iframe id="mapSvgFrame" class="tab-content-frame" src="/view/graph/d3graphView.html"></iframe>';
            $(".tab-content.content-minor").empty().html(_.template(iframe));
            $("#mapSvgFrame").css({
                "width": "100%",
                "height": "500px",
                "border": "1px solid #eeeeee"
            });
        },
        showTable: function (groupId) {
            _self = this;
            // var param = $("#query-condition").serializeObject();
            // $.extend(param, {
            //     startTime: $.trim($("#startTime").val()),
            //     endTime: $.trim($("#endTime").val())
            // });
            // expenseStatAjax.getExesApplyStatList(param, function (r) {
            debugger
            var param = {
                userId:top.userId,
                //taskType:$.trim($("#taskType").val()),
                //taskName:$.trim($("#taskName").val()),
                //taskNo:$.trim($("#taskNo").val()),
                groupid:$.trim($("#groupid").val()) || groupId,
                //creator:$.trim($("#creator").val()),
                //jsr:$.trim($("#jsr").val()),
                //startTime:$.trim($("#startTime").val()),
                //endTime:$.trim($("#endTime").val()),
                //fkqrzt:$.trim($("#fkqrzt").val()),
                //fkzt:$.trim($("#fkzt").val()),
                //yjzt:$.trim($("#yjzt").val()),
                //overdue:$.trim($("#overdue").val()),
                //deparmentcode:$.trim($("#deparmentcode").val()),
                //fkstartTime:$.trim($("#fkstartTime").val()),
                //fkendTime:$.trim($("#fkendTime").val())
            };
            $('.tab-content.content-minor').pagingList({
                action:top.servicePath_xz+'/task/getTaskPage',
                jsonObj:param,
                callback:function(r){
                    //$("#taskListTable tbody").empty().html(_.template(taskListTrTpl, {data: data,isOperation:false}));
                    //$(".link-text").on("click",function () {
                    //    _selfCommand.handleDetail($(this).attr('id'));
                    //});
                    $(".tab-content.content-minor").empty().html(_.template(groupTaskListTpl, {data: r}));
                    $(".into-feedback").on('click', function () {
                        //console.info("任务的反馈信息");
                        var id=$(this).attr("data-id");
                        fstPageAjax.taskDetail({id: id, userId: top.userId}, function (r) {
                            if (r.flag == 1) {
                                $open("#panelDiv", {width: 600, title: '&nbsp反馈信息'});
                                debugger
                                $("#panelDiv .panel-container").empty().html(_.template(taskEditTpl, r.data));
                            }
                        });
                        $("#panelDiv").on("click", "#closeBtn", function () {
                            $("#panelDiv").$close();
                        });
                    });
                }
            });

            //var tdata = [
            //    {
            //        "rownum": "1",
            //        "taskId": "76756593625281910",
            //        "taskContent": "下发任务",
            //        "taskName": "",
            //        "creator": "季林华",
            //        "time": "2017-10-15",
            //        "receiver": "刘凯"
            //    }, {
            //        "rownum": "2",
            //        "taskId": "4534524523346455",
            //        "taskContent": "下发任务2",
            //        "taskName": "水电费",
            //        "creator": "倪慧",
            //        "time": "2017-10-20",
            //        "receiver": "于继月"
            //    }
            //];

            // });
        },

        showNewsMoreList: function () {
            _self = this;
            $("#newsListTable tbody").empty().html(_.template(commonMoreListTrTpl));

        },
        showMessageMoreList: function () {
            _self = this;

        },
        showKnowledgeMoreList: function () {
            _self = this;
            $("#knowledgeListTable tbody").empty().html(_.template(commonMoreListTrTpl));

        },
        showToolMoreList: function () {
            _self = this;
            $("#toolListTable tbody").empty().html(_.template(commonMoreListTrTpl));

        }
    }
});
// function achieveMessageFn() {
//     importing('dict', 'datepicker', function(){
//         $("#achieveListTable").on("click",".link-text",function () {
//             $("#mainDiv").empty().html();
//         });
//     });
// }
