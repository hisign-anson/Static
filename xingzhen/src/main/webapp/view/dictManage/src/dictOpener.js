/**
 * Created by Miya on 2017/8/22.
 */
define(['underscore',
    'text!/view/dictManage/tpl/dictOpenerAdd.html',
    '../dat/dictManage.js',
    '../../userInfoManage/dat/userInfo.js'], function (_, dictOpenerAddTpl, dictManageAjax, userInfoAjax) {
    return {
        //********************************新的选择弹框 start*******************************************//
        //选择案件类别
        openCaseType: function (obj) {
            _selfDict = this;
            var dictVal = obj.attr("dict-value");
            var title = obj.attr("title");
            window.newwin = $open('#caseTypeBlock', {width: 600, height: 400, top: 100, title: '选择' + title});
            _selfDict.getDictAbList(dictVal);
            var opener = $(".panel #caseTypeBlock");
            opener.find("#groupType").val("");
            opener.find("#caseTypeOpenerResult").attr('dictVal', dictVal);
            opener.find("#caseTypeOpenerResult").off("click").on("click", ".item-value", function () {
                var input = obj.prev();//页面上需要填入的input
                input.val($(this).find("span").text());
                var inputHidden = obj.siblings("input[type='hidden']");//页面上需要填入的input
                inputHidden.val($(this).find("span").attr("val"));
                opener.$close();
            });
            // opener.find("#queryBtnGroupType").off("click").on("click", function () {
            //     var groupType = $.trim(opener.find('#groupType').val());
            //     _selfDict.getDictAbList(dictVal, groupType);
            // });
            opener.find("#resetBtnGroupType").off("click").on("click", function () {
                opener.find("#groupType").val("");
            });
            //输入框回车搜索
            opener.find("#groupType").on('keyup', function (event) {
                var e = event || window.event;
                if (e.keyCode === 13) {
                    var groupType = $.trim(opener.find('#groupType').val());
                    _selfDict.getDictAbList(dictVal, groupType);
                }
            });
        },
        getDictAbList: function (key, value) {
            _selfDict = this;
            var target = $("#caseTypeOpenerResult");
            var tpl = '<div class="item-value"><u><span val="">全部</span></div></u>';
            var param = {
                key: key,
                queryString: value,
                end: 50//显示前50条
            };
            $post(top.servicePath + '/sys/dict/getDictListByParentKey', param, function (r) {
                $.each(r.data, function (i, o) {
                    tpl += '<div class="item-value"><u><span val="' + o.key + '">' + o.value + '</span></div></u>';
                });
                target.html(tpl);
            }, true);
        },
        //选择所属专案组
        openGroup: function (obj) {
            _selfDict = this;
            var title = obj.attr("title");
            window.newwin = $open('#groupBlock', {width: 400, height: 300, top: 100, title: '选择' + title});

            _selfDict.getGroupPortList();
            var opener = $(".panel #groupBlock");
            opener.find("#groupName").val("");
            opener.find("#groupOpenerResult").off("click").on("click", ".item-value", function () {
                var input = obj.siblings("input[type='text']");//页面上需要填入的input
                input.val($(this).find("span").text());
                var inputHidden = obj.siblings("input[type='hidden']");//页面上需要填入的input
                inputHidden.val($(this).find("span").attr("val"));

                opener.$close();
            });
            // opener.find("#queryBtnGroup").off("click").on("click", function () {
            //     var groupName = $.trim($('#groupName').val());
            //     _selfDict.getGroupPortList(groupName);
            // });
            opener.find("#resetBtnGroup").off("click").on("click", function () {
                opener.find("#groupName").val("");
            });
            //输入框回车搜索
            opener.find("#groupName").on('keyup', function (event) {
                var e = event || window.event;
                if (e.keyCode === 13) {
                    var groupName = $.trim($('#groupName').val());
                    _selfDict.getGroupPortList(groupName);
                }
            });
        },
        getGroupPortList: function (groupName) {
            _selfDict = this;
            var target = $("#groupOpenerResult");
            var tpl = '';
            var param = {
                userId: top.userId,
                groupName: groupName ? groupName : ""
            };
            $.ajax({
                url: top.servicePath_xz + '/group/getAllGroupByUserId',
                type: "post",
                contentType: "application/x-www-form-urlencoded",
                data: param,
                success: function (r) {
                    if (r.flag == 1) {
                        $.each(r.data, function (i, o) {
                            tpl += "<div class='item-value'><u><span paramattr='" + obj2str(o) + "' val='" + o.id + "'>" + o.groupname + "</span></div></u>";
                        });
                        target.html(tpl);
                    }
                }
            });
        },
        //选择下发人
        openCreator: function (obj) {
            _selfDict = this;
            var title = obj.attr("title");
            window.newwin = $open('#creatorBlock', {width: 400, height: 300, top: 100, title: '选择' + title});
            _selfDict.getCreatorPortList();
            var opener = $(".panel #creatorBlock");
            opener.find("#creator").val("");
            opener.find("#creOpenerResult").off("click").on("click", ".item-value", function () {
                var input = obj.siblings("input[type='text']");//页面上需要填入的input
                input.val($(this).find("span").text());
                var inputHidden = obj.siblings("input[type='hidden']");//页面上需要填入的input
                inputHidden.val($(this).find("span").attr("val"));

                opener.$close();
            });
            // opener.find("#queryBtnCreator").off("click").on("click", function () {
            //     var userName = $.trim(opener.find('#creator').val());
            //     _selfDict.getCreatorPortList(userName);
            // });
            opener.find("#resetBtnCreator").off("click").on("click", function () {
                opener.find("#creator").val("");
            });
            //输入框回车搜索
            opener.find("#creator").on('keyup', function (event) {
                var e = event || window.event;
                if (e.keyCode === 13) {
                    var userName = $.trim(opener.find('#creator').val());
                    _selfDict.getCreatorPortList(userName);
                }
            });
        },
        getCreatorPortList: function (userName) {
            _selfDict = this;
            var target = $("#creOpenerResult");
            var tpl = '';
            var param = {
                orgId: top.orgId,
                userName: userName ? userName : ""
            };
            userInfoAjax.getUserInfoListByOrgId(param, function (r) {
                if (r.flag == 1) {
                    $.each(r.data, function (i, o) {
                        tpl += "<div class='item-value'><u>" +
                            "<span paramattr='" + obj2str(o) + "' val='" + o.userId + "' phone='" + o.phone + "'>" + o.userName + "," + o.orgName + "</span>" +
                            "</u></div>";
                    });
                    target.html(tpl);
                }
            });
        },
        //查询条件 选择接收人
        openRecipient: function (obj) {
            _selfDict = this;
            var title = obj.attr("title");
            window.newwin = $open('#recipientBlock', {width: 400, height: 300, top: 100, title: '选择' + title});
            _selfDict.getRecipientPortList();
            var opener = $(".panel #recipientBlock");
            opener.find("#recipient").val("");
            opener.find("#recOpenerResult").off("click").on("click", ".item-value", function () {
                var input = obj.siblings("input[type='text']");//页面上需要填入的input
                input.val($(this).find("span").text());
                var inputHidden = obj.siblings("input[type='hidden']");//页面上需要填入的input
                inputHidden.val($(this).find("span").attr("val"));

                opener.$close();
            });
            // opener.find("#queryBtnRecipient").off("click").on("click", function () {
            //     var userName = $.trim(opener.find('#recipient').val());
            //     _selfDict.getRecipientPortList(userName);
            // });
            opener.find("#resetBtnRecipient").off("click").on("click", function () {
                opener.find("#recipient").val("");
            });
            //输入框回车搜索
            opener.find("#recipient").on('keyup', function (event) {
                var e = event || window.event;
                if (e.keyCode === 13) {
                    var userName = $.trim(opener.find('#recipient').val());
                    _selfDict.getRecipientPortList(userName);
                }
            });
        },
        getRecipientPortList: function (userName) {
            _selfDict = this;
            var target = $("#recOpenerResult");
            var tpl = '';
            var param = {
                orgId: top.orgId,
                userName: userName ? userName : ""
            };
            userInfoAjax.getUserInfoListByOrgId(param, function (r) {
                if (r.flag == 1) {
                    $.each(r.data, function (i, o) {
                        tpl += "<div class='item-value'><u>" +
                            "<span paramattr='" + obj2str(o) + "' val='" + o.userId + "' phone='" + o.phone + "'>" + o.userName + "," + o.orgName + "</span>" +
                            "</u></div>";
                    });
                    target.html(tpl);
                }
            });
        },
        //表单 选择接收人(专案组内)
        openGroupRecipient: function (obj,param) {
            _selfDict = this;
            //弹框id
            var openerId = "#recipientGroupBlock";
            var $openerDiv = $(openerId);
            var title = obj.attr("title");
            window.newwin = $open(openerId, {width: 400, height: 300, top: 100, title: '选择' + title});
            _selfDict.getRecipientGroupPortList(param);

            $openerDiv.find("#recipient").val("");
            //已经在加载数据是=时，去掉当前登录人了
            // $openerDiv.find("#recOpenerResult").off("click").on("click", ".item-value:not(.disabled)", function () {
            //     toast("不能选择自己！", 600).warn();
            // });
            $openerDiv.find("#recOpenerResult").off("click").on("click", ".item-value", function () {
                var input = obj.siblings("input[type='text']");//页面上需要填入的input
                input.val($(this).find("span").text());
                var inputHidden = obj.siblings("input[type='hidden']");//页面上需要填入的input
                inputHidden.val($(this).find("span").attr("val"));

                var paramAttr = $(this).find("span").attr("paramattr");
                input.attr("paramattr", paramAttr);
                if ($("#jsrLxfs").length > 0) {
                    $("#jsrLxfs").val($(this).find("span").attr("phone"));
                }
                $openerDiv.$close();
            });
            $openerDiv.find("#resetBtnRecipient").off("click").on("click", function () {
                $openerDiv.find("#recipient").val("");
            });
            //输入框回车搜索
            $openerDiv.find("#recipient").on('keyup', function (event) {
                var e = event || window.event;
                if (e.keyCode === 13) {
                    var userName = $.trim($openerDiv.find('#recipient').val());
                    _selfDict.getRecipientGroupPortList(param,userName);
                }
            });
        },
        getRecipientGroupPortList: function (param,userName) {
            _selfDict = this;
            var target = $("#recOpenerResult");
            var tpl = '';
            $.extend(param, {
                userName: userName ? userName : ""
            });
            $post(top.servicePath_xz + '/usergroup/getUsergroupPage', param, function (r) {
                if (r.flag == 1) {
                    $.each(r.data, function (i, o) {
                        if (o.userId == top.userId) {
                            tpl += ""
                        } else {
                            tpl += "<div class='item-value'><u>" +
                                "<span paramattr='" + obj2str(o) + "' val='" + o.userId + "' phone='" + o.phone + "'>" + o.userName + "," + o.orgName + "</span>" +
                                "</u></div>";
                        }
                    });
                    target.html(tpl);
                }
            }, true);
        },
        //选择所属单位
        openOrg: function (obj) {
            _selfDict = this;
            var title = obj.attr("title");
            window.newwin = $open('#orgBlock', {width: 400, height: 300, top: 100, title: '选择' + title});
            _selfDict.getOrgPortList();
            var opener = $(".panel #orgBlock");
            opener.find("#orgName").val("");
            opener.find("#orgOpenerResult").off("click").on("click", ".item-value", function () {
                var input = obj.siblings("input[type='text']");//页面上需要填入的input
                input.val($(this).find("span").text());
                var inputHidden = obj.siblings("input[type='hidden']");//页面上需要填入的input
                inputHidden.val($(this).find("span").attr("val"));

                var paramAttr = $(this).find("span").attr("paramattr");
                input.attr("paramattr", paramAttr);
                opener.$close();
            });
            // opener.find("#queryBtnOrgName").off("click").on("click", function () {
            //     var orgName = $.trim(opener.find('#orgName').val());
            //     _selfDict.getOrgPortList(orgName);
            // });
            opener.find("#resetBtnOrgName").off("click").on("click", function () {
                opener.find("#orgName").val("");
            });
            //输入框回车搜索
            opener.find("#orgName").on('keyup', function (event) {
                var e = event || window.event;
                if (e.keyCode === 13) {
                    var orgName = $.trim(opener.find('#orgName').val());
                    _selfDict.getOrgPortList(orgName);
                }
            });
        },
        getOrgPortList: function (orgName) {
            _selfDict = this;
            var target = $("#orgOpenerResult");
            var tpl = '';
            var param = {
                orgName: orgName ? orgName : ""
            };
            userInfoAjax.getOrgTreeList(param, function (r) {
                if (r.flag == 1) {
                    $.each(r.data, function (i, o) {
                        tpl += "<div class='item-value'><u><span paramattr='" + obj2str(o) + "' val='" + o.orgId + "'>" + o.orgName + "</span></div></u>";
                    });
                    target.html(tpl);
                }
            });
        },
        //********************************新的选择弹框 end*******************************************//


        openChooseDict: function (obj, dictVal, title) {
            _selfDict = this;
            var dictVal = obj.attr("dict-value");
            var title = obj.attr("title");

            window.newwin = $open('#dict-block-type', {width: 600, height: 400, top: 100, title: '选择' + title});
            _selfDict.getDictListByParentKey(dictVal);
            var opener = $(".panel #dict-block-type");
            $(".panel #dict-block-type .query-block-row input").val("");
            opener.find("#dict-wrap-type").attr('dictVal', dictVal);
            opener.find("#dict-wrap-type").off("click").on("click", "div", function () {
                var input = obj.prev();//页面上需要填入的input
                input.val($(this).find("span").text());
                var inputHidden = obj.siblings("input[type='hidden']");//页面上需要填入的input
                inputHidden.val($(this).find("span").attr("val"));
                opener.$close();
            });
            opener.find("#queryBtnGroupType").off("click").on("click", function () {
                var groupType = $.trim(opener.find('#groupType').val());
                _selfDict.getDictListByParentKey(dictVal, groupType);
            });
            opener.find("#resetBtnGroupType").off("click").on("click", function () {
                opener.find("#groupType").val("");
            });
        },
        getDictListByParentKey: function (key, value) {
            _selfDict = this;
            var param = {};
            $.extend(param, {
                key: key,
                queryString: value
            });
            $('#dict-block-type').pagingList({
                action: top.servicePath + '/sys/dict/getDictListByParentKey',
                jsonObj: param,
                callback: function (r) {
                    var target = $("#dict-wrap-type");
                    var tpl = '<div><u><span val="">全部</span></div></u>';
                    $.each(r, function (i, o) {
                        tpl += '<div><u><span val="' + o.key + '">' + o.value + '</span>' +
                            '</div></u>';
                    });
                    target.html(tpl);
                }
            })
        },
        openUserChoosePort: function (obj) {//打开人员选择端口
            _selfDict = this;
            var title = obj.attr("title");
            window.newwin = $open('#dict-block', {width: 400, height: 300, top: 100, title: '选择' + title});
            _selfDict.getUserPortList();
            var opener = $(".panel #dict-block");
            $(".panel #dict-block .query-block-row input").val("");
            opener.find("#dict-wrap").off("click").on("click", ".item-value", function () {
                // var input = obj.prev();//页面上需要填入的input
                var input = obj.siblings("input[type='text']");//页面上需要填入的input
                input.val($(this).find("span").text());
                var inputHidden = obj.siblings("input[type='hidden']");//页面上需要填入的input
                inputHidden.val($(this).find("span").attr("val"));

                var paramAttr = $(this).find("span").attr("paramattr");
                input.attr("paramattr", paramAttr);
                if ($("#jsrLxfs").length > 0) {
                    $("#jsrLxfs").val($(this).find("span").attr("phone"));
                }
                opener.$close();
            });
            opener.find("#queryBtn").off("click").on("click", function () {
                var userName = $.trim(opener.find('#userName').val());
                _selfDict.getUserPortList(userName);
            });
            opener.find("#resetBtn").off("click").on("click", function () {
                opener.find("#userName").val("");
            })
        },
        getUserPortList: function (userName) {
            _selfDict = this;
            var tpl = '';
            var target = $("#dict-wrap");
            userInfoAjax.getUserInfoListByOrgId({orgId: top.orgId, userName: userName, end: ""}, function (r) {
                if (r.flag == 1) {
                    $.each(r.data, function (i, o) {
                        // // 加三目去除当前人
                        // o.userId==top.currentUser.userInfo.userId?tpl+="":tpl+="<div class='item-value'><u><span paramattr='"+ obj2str(o) +"' val='"+o.userId+"' phone='"+o.phone+"'>"+o.userName+","+o.orgName+"</span></div></u>";
                        tpl += "<div class='item-value'><u><span paramattr='" + obj2str(o) + "' val='" + o.userId + "' phone='" + o.phone + "'>" + o.userName + "," + o.orgName + "</span></div></u>";
                    });
                    target.html(tpl);
                }
            });
        },

        openUnitChoosePort: function (obj) {
            _selfDict = this;
            var title = obj.attr("title");
            window.newwin = $open('#dict-block-unit', {width: 400, height: 300, top: 100, title: '选择' + title});
            _selfDict.getUnitPortList();
            var opener = $(".panel #dict-block-unit");
            $(".panel #dict-block-unit .query-block-row input").val("");
            opener.find("#dict-wrap-unit").off("click").on("click", ".item-value", function () {
                // var input = obj.prev();//页面上需要填入的input
                var input = obj.siblings("input[type='text']");//页面上需要填入的input
                input.val($(this).find("span").text());
                var inputHidden = obj.siblings("input[type='hidden']");//页面上需要填入的input
                inputHidden.val($(this).find("span").attr("val"));

                var paramAttr = $(this).find("span").attr("paramattr");
                input.attr("paramattr", paramAttr);
                opener.$close();
            });
            opener.find("#queryBtnOrgName").off("click").on("click", function () {
                var orgName = $.trim(opener.find('#orgName').val());
                _selfDict.getUnitPortList(orgName);
            });
            opener.find("#resetBtnOrgName").off("click").on("click", function () {
                opener.find('#orgName').val("");
            })
        },
        getUnitPortList: function (orgName) {
            _selfDict = this;
            userInfoAjax.getOrgTreeList({orgName: orgName, end: ""}, function (r) {
                if (r.flag == 1) {
                    var target = $("#dict-wrap-unit");
                    var tpl = '';
                    $.each(r.data, function (i, o) {
                        // tpl+='<div class="item-value"><u><span val="'+o.orgId+'">'+o.orgName+'</span></div></u>';
                        tpl += "<div class='item-value'><u><span paramattr='" + obj2str(o) + "' val='" + o.orgId + "'>" + o.orgName + "</span></div></u>";
                    });
                    target.html(tpl);
                }
            });
        },
        openChoosePort: function (obj, portType, portAddress, param, chooseType) {
            _selfDict = this;
            var title = obj.attr("title");
            window.newwin = $open('#dict-block-group', {width: 400, height: 300, top: 100, title: '选择' + title});
            if (portAddress) {
                _selfDict.getPortList(portType, portAddress, param, chooseType);
            } else {
                _selfDict.getGroupByIdPortList(param);
            }
            var opener = $(".panel #dict-block-group");
            $(".panel #dict-block-group .query-block-row input").val("");
            opener.find("#dict-wrap-group").off("click").on("click", "div:not(.disabled)", function () {
                toast("不能选择自己！", 600).warn();
            });
            opener.find("#dict-wrap-group").off("click").on("click", "div:not(.disabled)", function () {
                var input = obj.siblings("input[type='text']");//页面上需要填入的input
                input.val($(this).find("span").text());
                var inputHidden = obj.siblings("input[type='hidden']");//页面上需要填入的input
                inputHidden.val($(this).find("span").attr("val"));

                var paramAttr = $(this).find("span").attr("paramattr");
                input.attr("paramattr", paramAttr);
                if ($("#jsrLxfs").length > 0) {
                    $("#jsrLxfs").val($(this).find("span").attr("phone"));
                }
                opener.$close();
            });
            opener.find("#queryBtnGroupName").off("click").on("click", function () {
                var groupName = $.trim($('#groupName').val());
                if (portAddress) {
                    _selfDict.getPortList(portType, portAddress, param, chooseType, groupName);
                } else {
                    _selfDict.getGroupByIdPortList(param, groupName);
                }
            });
            opener.find("#resetBtnGroupName").off("click").on("click", function () {
                $('#groupName').val("");
            })
        },
        getGroupByIdPortList: function (param, groupName) {
            _selfDict = this;
            $.extend(param, {
                groupName: groupName
            });
            $.ajax({
                url: top.servicePath_xz + '/group/getAllGroupByUserId',
                type: "post",
                contentType: "application/x-www-form-urlencoded",
                data: param,
                success: function (r) {
                    if (r.flag == 1) {
                        var target = $("#dict-wrap-group");
                        var tpl = '';
                        $.each(r.data, function (i, o) {
                            tpl += "<div class='item-value'><u><span paramattr='" + obj2str(o) + "' val='" + o.id + "'>" + o.groupname + "</span></div></u>";
                        });
                        target.html(tpl);
                    }
                }
            });

        },
        getUserByGroupIdPortList: function (obj, param) {//单独新增的方法（vince）
            _selfDict = this;
            var title = obj.attr("title");
            window.newwin = $open('#dict-block-group', {width: 400, height: 300, top: 100, title: '选择' + title});
            $("#dict-block-group .dict-container").find(".query-block-row").empty();
            $post(top.servicePath_xz + '/usergroup/getUsergroupPage', param, function (r) {
                if (r.flag == 1) {
                    var target = $("#dict-wrap-group");
                    var tpl = '';
                    $.each(r.data, function (i, o) {
                        o.userId == top.currentUser.userInfo.userId ? tpl += "" : tpl += "<div class='item-value'><u><span paramattr='" + obj2str(o) + "' val='" + o.userId + "' phone='" + o.phone + "'>" + o.userName + ',' + o.orgName + "</span></div></u>";
                    });
                    target.html(tpl);
                    var opener = $(".panel #dict-block-group");
                    $(".query-block-row input").val("");
                    opener.find("#dict-wrap-group").off("click").on("click", "div:not(.disabled)", function () {
                        toast("不能选择自己！", 600).warn();
                    });
                    opener.find("#dict-wrap-group").off("click").on("click", "div:not(.disabled)", function () {
                        var input = obj.siblings("input[type='text']");//页面上需要填入的input
                        input.val($(this).find("span").text());
                        var inputHidden = obj.siblings("input[type='hidden']");//页面上需要填入的input
                        inputHidden.val($(this).find("span").attr("val"));

                        var paramAttr = $(this).find("span").attr("paramattr");
                        input.attr("paramattr", paramAttr);
                        if ($("#jsrLxfs").length > 0) {
                            $("#jsrLxfs").val($(this).find("span").attr("phone"));
                        }
                        opener.$close();
                    });
                }
            }, true);
        },
        getPortList: function (portType, portAddress, param, chooseType, groupName) {
            _selfDict = this;
            var flagThis;
            if (portType == $post) {
                flagThis = true;
            } else if (portType == $get) {
                flagThis = false;
            }
            $.extend(param, {groupName: groupName});
            portType(portAddress, param, function (r) {
                if (r.flag == 1) {
                    var target = $("#dict-wrap-group");
                    $(".dict-container").find(".query-block-row").empty();
                    $(".dict-container").find(".query-block-row").siblings("hr").empty();
                    var tpl = '';
                    switch (chooseType) {
                        case "user":
                            $.each(r.data, function (i, o) {
                                if (o.userId == top.userId) {
                                    o.userId == top.currentUser.userInfo.userId ? tpl += "" : tpl += "<div class='item-value disabled'><u><span paramattr='" + obj2str(o) + "' val='" + o.userId + "' phone='" + o.phone + "'>" + o.userName + ',' + o.orgName + "</span></div></u>";
                                } else {
                                    o.userId == top.currentUser.userInfo.userId ? tpl += "" : tpl += "<div class='item-value'><u><span paramattr='" + obj2str(o) + "' val='" + o.userId + "' phone='" + o.phone + "'>" + o.userName + ',' + o.orgName + "</span></div></u>";

                                }
                            });
                            break;
                        case "unit":
                            $.each(r.data, function (i, o) {
                                tpl += "<div class='item-value'><u><span paramattr='" + obj2str(o) + "' val='" + o.orgCode + "'>" + o.orgName + "</span></div></u>";
                            });
                            break;
                    }
                    target.html(tpl);
                }
            }, flagThis);
        },
        closeOpenerDiv: function () {
            _selfDict = this;
            $(".panel.window").each(function (i, e) {
                if (!$(e).is(":visible")) {
                    $(e).remove();
                }
            });
        }
    }
});