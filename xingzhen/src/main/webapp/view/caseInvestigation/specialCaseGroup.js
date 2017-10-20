/**
 * Created by Miya on 2017/9/20.
 */
$.ajaxSetup({
    beforeSend:showLoading,
    complete:hideLoading
});
// importing('dat/carFilter.js');
require(['src/specialCaseGroup.js'],function(specialCaseGroup){
    specialCaseGroup.showList();
});
