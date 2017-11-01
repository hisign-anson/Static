require(['src/fstPage-MoreClick.js'],function(fstPageMoreClick){
    var text = $('.tabs-selected', window.parent.document).text();
    var groupId = $('.tabs-selected', window.parent.document).find('em').attr('data-id');
    if(groupId){
        typeof fstPageMoreClick.showAchieveOne(groupId)=='function' && fstPageMoreClick.showAchieveOne(groupId);
    }else{
        switch (text) {
            case "平台成果展示":
                fstPageMoreClick.showAchieveMoreList();
                break;
            case "通知公告":
                fstPageMoreClick.showNewsMoreList();
                break;
            case "信息提醒":
                fstPageMoreClick.showMessageMoreList();
                break;
            case "知识库":
                fstPageMoreClick.showKnowledgeMoreList();
                break;
            case "系统工具下载":
                fstPageMoreClick.showToolMoreList();
                break;
        }
    }
});
