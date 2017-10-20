require.config({
    // baseUrl: '',
    // paths: {
    //     plugins: 'dist/plugin',
		// views:'dist/view'
    // }
});
// require(['src/fstPage.js'],function(fstPage){
// 	fstPage.showFstPage();
//
// });
require(['src/fstPage-mock.js'],function(fstPage){
    fstPage.showFstPage();

});


