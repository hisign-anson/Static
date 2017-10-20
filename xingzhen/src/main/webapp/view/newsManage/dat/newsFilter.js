//权限
var ops = top.opsMap;
//通知公告等级
$filter('asMsgLevel', function () {
    if (this.valueOf() == 1) {
        return "普通";
    } else if (this.valueOf() == 2) {
        return "加急";
    } else if (this.valueOf() == 3) {
        return "特急";
    }
});
//发布状态
$filter('asRev4', function () {
    if (this.valueOf() == 0) {
        return "未发布";
    } else if (this.valueOf() == 1) {
        return "已发布";
    }
});
//通知公告、规则制度、表格下载列表：操作
$filter('asNoticeOperationsBtn', function (item) {
    var html = "";
    if (ops && ops.get('showNoticeEdit') && ops.get('showNoticeEdit') == 1 && item.createPid == top.userId && item.type == 1) {
        if (item.rev4 == 0 || item.rev4 == 1) {
            html += '<a class="into-send icon-plus-btn" id="{id}" title="发布"></a>';
        }
    }

    if (item.rev4 == 0) {
        html += '<a class="into-edit icon-edit-btn" id="{id}" title="修改"></a>';
    }

    html += '<a class="into-view icon-show-btn" id="{id}" title="预览"></a>';
    if (item.rev4 == 0) {
        html += '<a class="delete-for icon-remove-btn" id="{id}" noticeNo="{id}" data-subject="{subject}" title="删除"></a>';
    }
    return html.format({
        id:this.valueOf(),
        subject:item.subject
    });
});
