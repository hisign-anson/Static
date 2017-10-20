$.ajaxSetup({
    beforeSend:showLoading,
    complete:hideLoading
});
require(['src/userInfo.js'],function(userInfo){
	userInfo.showOrgTree();
})