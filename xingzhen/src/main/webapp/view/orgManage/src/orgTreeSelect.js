importing('ztree');
define(['../dat/orgInfo.js'], function (orgInfoAjax) {
    var targetId;
    return {
        initOrgTreeSelect: function (targetId, targetName) {
            var tpl = '<div id="menuContent" class="menuContent" style="display: none; position: absolute; z-index: 9999; overflow: auto; height: 200px; background: #ffffff; border: 1px solid #ddd;">'
            tpl += '<ul id="orgTree" class="ztree" style="margin-top: 0; width: 110px;">';
            tpl += '</ul>';
            tpl += '</div>';
            $('#main-div').append(tpl);
            setTimeout(function () {
                orgInfoAjax.getOrgTreeListBySuperId({superId: top.orgId}, function (res) {
                    var nodes = [];
                    orgInfo = res.data;
                    for (var i = 0; i < orgInfo.length; i++) {
                        if (orgInfo[i].superId == null || orgInfo[i].superId == -1) {
                            nodes.push({id: orgInfo[i].orgId, pid: -1, name: orgInfo[i].orgName, sort: i});
                        } else {
                            nodes.push({id: orgInfo[i].orgId, pid: orgInfo[i].superId, name: orgInfo[i].orgName, sort: i});
                        }
                    }
                    treeObj = $('#orgTree').ztree({
                        check: {
                            enable: true,
                            chkStyle: "checkbox",
                            chkboxType: { "Y": "s", "N": "ps" }
                        },
                        data: {
                            simpleData: {
                                enable: "pid",
                                idKey: "id",
                                pIdKey: "pid"
                            }
                        },
                        view: {
                            showTitle: false,
                            nameIsHTML: true,
                            selectedMulti: true
                        },
                        callback: {
                            onCheck: function (event, treeId, treeNode) {
                                var zTree = $.fn.zTree.getZTreeObj("orgTree"),
                                    nodes = zTree.getCheckedNodes(true),
                                    id = "";
                                value = "";
                                for (var i = 0, l = nodes.length; i < l; i++) {
                                    id += nodes[i].id + ",";
                                    value += nodes[i].name + ",";

                                }
                                if (id.length > 0)
                                    id = id.substring(0, id.length - 1);
                                if (value.length > 0)
                                    value = value.substring(0, value.length - 1);
                                $("#" + targetId).attr("value", id);
                                $("#" + targetName).attr("value", value);
                                //不加此处代码，会在重置之后选择了也无法显示其值
                                $("#" + targetId).val(id);
                                $("#" + targetName).val(value);
                                //重置按钮点击时，取消选中状态
                                $("#reset-btn").on('click',function(){
                                    zTree.checkAllNodes(false);
                                });
                            },
                            onClick: function (e, treeId, treeNode) {
                                var zTree = $.fn.zTree.getZTreeObj("orgTree");
                                zTree.checkNode(treeNode, !treeNode.checked, null, true);
                                return false;
                            }
                        }
                    }, nodes);
                });
            }, 600);
        },
        showMenu: function (obj) {
            var _obj = $(obj);
            targetId = _obj.attr("id")
            var offset = _obj.offset();
            $("#menuContent").css({left: offset.left + "px", top: offset.top + _obj.outerHeight() + "px", width: _obj[0].offsetWidth + "px"}).slideDown("fast");
            $("body").bind("mousedown", onBodyDown);
        }
    }
    function hideMenu() {
        $("#menuContent").fadeOut("fast");
        $("body").unbind("mousedown", onBodyDown);
    }

    function onBodyDown(event) {
        if (!(event.target.id == targetId || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length > 0)) {
            hideMenu();
        }
    }
})

