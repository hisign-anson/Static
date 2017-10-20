//jQuery全局方法扩展，调用方式为：$.方法名(参数？)。
window.$.extend({
    //获取Url中的参数,返回Url参数中指定的name参数值，不送参数返回所有的Url参数
    getUrlParam : function(name){
        var result = location.search.match(new RegExp('[\?\&][^\?\&]+=[^\?\&]*','g'));
        if(result==null){
            return false
        };
        var j=result.length,obj={},arr=[];
        for(var i=0;i<j;i++){
            arr=result[i].slice(1).split('=');
            if(name && arr[0] == name){
                return arr[1];
            }
            obj[arr[0]]=arr[1];
        }
        return name ? obj[name]||'' : obj;
    },
});

//jQuery对象方法扩展，调用方式为：$(选择器).方法名(参数？)。
window.$.fn.extend({
    //通过form中input、select、textarea的name属性选择，并赋值;data:赋值json数据
    setTagsValue : function(data){
        var tags = this.find(':input').not(':button,:submit,:reset,:image');
        $.each(tags,function(){
            if (data[this.name]){
                if (this.type == 'checkbox'){
                    $(this).prop('checked',this.value == data[this.name]).trigger('change');
                } else  if(this.type == 'radio') {
                	if(this.value == data[this.name]){$(this).prop('checked',true).trigger('change');}
                } else {
                    $(this).val(data[this.name]).trigger('change');
                }
            }
        });
    }
});