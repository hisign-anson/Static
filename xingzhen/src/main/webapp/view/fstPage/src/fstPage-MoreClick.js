importing('currentDate');
define([
    'underscore',
    'text!/view/fstPage/tpl/moreList/achievementMoreListTr.html',
    'text!/view/fstPage/tpl/moreList/achievementInfo.html',
    'text!/view/fstPage/tpl/moreList/newsMoreListTr.html',
    'text!/view/fstPage/tpl/moreList/messageMoreListTr.html',
    'text!/view/fstPage/tpl/moreList/knowledgeMoreListTr.html',
    'text!/view/fstPage/tpl/moreList/toolDownloadMoreListTr.html'], function (_,achieveMoreListTrTpl,achievementInfoTpl,newsMoreListTrTpl,messageMoreListTrTpl,knowledgeMoreListTrTpl,downloadMoreListTrTpl ) {
    return {
        showAchieveMoreList:function () {
            _self = this;
            $("#achieveListTable tbody").empty().html(_.template(achieveMoreListTrTpl));
            $("#achieveListTable").on("click", ".link-text", function () {
                $("#mainDiv").empty().html(_.template(achievementInfoTpl));
            });
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
