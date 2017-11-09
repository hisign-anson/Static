define(['underscore',
    'text!/view/fstPage/tpl/tableMessageTr.html',
    'text!/view/newsManage/tpl/noticeListTr.html',
    '../dat/tableMessage.js',
],function(_,tableMessageTrTpl,tableMessageAjax){
    return {
        //点击
        queryTableList:function(){
            _self = this;
            param = ({
                currentPage:$('.paging').data('currentPage'),
                startTime:$("#startTime").val(),
                type:3,
                endTime:$("#endTime").val()
            });
            $('#query-result').pagingList({
                action:top.servicePath+'/sys/message/findPage',
                currentPage:param.currentPage,
                jsonObj:param,
                callback:function(data){
                    $("#tableList-table tbody").empty().html(_.template(tableMessageTrTpl,{data:data,ops:top.opsMap}));
                    //$(".into-view").on('click',function(){
                    //    _self.noticeView($(this).attr('id'));
                    //});
                }
            });
        },
        //点击进行预览
        noticeView:function(id){
            _self = this;
            if(id){
                tableMessageAjax.findTableById({id:id},function(r){
                    if(r.flag == 1){
                        $(".tab-content").empty().html(_.template(noticeViewTpl,r));
                        $("#cancel-btn").on("click",function(){
                            if(r.data.type==1){
                                _self.showNoticeList();
                            }else if(r.data.type==2){
                                _self.showRulesList();
                            }else if(r.data.type==3){
                                _self.showTableList();
                            }

                        })
                    }
                });
            }
        }
    }
})