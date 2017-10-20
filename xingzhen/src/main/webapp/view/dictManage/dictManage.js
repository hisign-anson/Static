$.ajaxSetup({
    beforeSend:showLoading,
    complete:hideLoading
});
require(['src/dictManage.js'],function(dictManage){
	dictManage.showDictTree();
})