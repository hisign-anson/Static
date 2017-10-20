importing('currentDate');
define([
    'underscore',
    'text!/view/fstPage/achievementMoreList.html',
    'text!/view/fstPage/tpl/moreList/achievementMoreListTr.html',
    'text!/view/fstPage/tpl/moreList/achievementInfo.html',
    'text!/view/fstPage/tpl/moreList/groupTaskList.html',
    'text!/view/fstPage/tpl/moreList/newsMoreListTr.html',
    'text!/view/fstPage/tpl/moreList/messageMoreListTr.html',
    'text!/view/fstPage/tpl/moreList/knowledgeMoreListTr.html',
    'text!/view/fstPage/tpl/moreList/toolDownloadMoreListTr.html',
    'text!/view/fstPage/tpl/moreList/commonMoreListTr.html'], function (_, achieveMoreListTpl, achieveMoreListTrTpl, achievementInfoTpl, groupTaskListTpl,
                                                                              newsMoreListTrTpl, messageMoreListTrTpl, knowledgeMoreListTrTpl, downloadMoreListTrTpl,commonMoreListTrTpl) {
    return {
        showAchieveMoreList: function () {
            _self = this;
            $("#achieveListTable tbody").empty().html(_.template(achieveMoreListTrTpl));
            $("#achieveListTable").on("click", ".link-text", function () {
                $("#mainDiv").empty().html(_.template(achievementInfoTpl));
                $("#myTabMinor a").on("click", function () {
                    $(this).tab('show');
                    if ($(this).attr("id") == "01") {
                        // $(".tab-content.content-minor").empty().html(_.template("graph 图"));
                        _self.showChart();
                    } else {
                        _self.showTable();
                    }
                });
                $('#myTabMinor a:first').click();
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
        showTable: function () {
            _self = this;
            // var param = $("#query-condition").serializeObject();
            // $.extend(param, {
            //     startTime: $.trim($("#startTime").val()),
            //     endTime: $.trim($("#endTime").val())
            // });
            // expenseStatAjax.getExesApplyStatList(param, function (r) {

            var tdata = [
                {
                    "rownum": "1",
                    "taskId": "76756593625281910",
                    "taskContent": "下发任务",
                    "taskName": "",
                    "creator": "季林华",
                    "time": "2017-10-15",
                    "receiver": "刘凯"
                }, {
                    "rownum": "2",
                    "taskId": "4534524523346455",
                    "taskContent": "下发任务2",
                    "taskName": "水电费",
                    "creator": "倪慧",
                    "time": "2017-10-20",
                    "receiver": "于继月"
                }
            ];
            $(".tab-content.content-minor").empty().html(_.template(groupTaskListTpl, {data: tdata}));
            $(".into-feedback").on('click', function () {
                console.info("任务的反馈信息");
                $open("#panelDiv", {width: 600, title: '&nbsp反馈信息'});

                $("#panelDiv").on("click", "#closeBtn", function () {
                    $("#panelDiv").$close();
                });
            });
            // });
        },

        showNewsMoreList: function () {
            _self = this;
            $("#achieveListTable tbody").empty().html(_.template(achieveMoreListTrTpl));

        },
        showMessageMoreList: function () {
            _self = this;

        },
        showKnowledgeMoreList: function () {
            _self = this;
            $("#achieveListTable tbody").empty().html(_.template(achieveMoreListTrTpl));

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
