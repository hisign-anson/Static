$.ajaxSetup({
    beforeSend:showLoading,
    complete:hideLoading
});
require(['src/orgInfo.js'],function(orgInfo){
	orgInfo.showOrgTree();
})