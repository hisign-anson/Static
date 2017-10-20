define(function(){
	
	var map ={
			// 数据存储对象

			datamap : {},

			// 根据key从Map中获取值

			get : function(key) {
				return this.datamap[key];
			},

			// 向Map中设置值

			put : function(key, value) {
				this.datamap[key] = value;
			},

			// 获取Map中元素个数

			size : function() {
				return this.keys().length;
			},
			
			//根据key删除Map中元素

			remove : function(key) {
				delete this.datamap[key];
			},

			//判断map是否为空，如果为空则返回true，否则返回false

			isEmpty : function() {
				return this.size() == 0;
			},

			//判断map中是否存在指定的key，如果存在返回true，否则返回false

			containsKey : function(key) {
				return key in this.datamap;
			},

			//判断map中是否存在指定的value，如果存在返回true，否则返回false

			containsValue : function(value) {
				return this.values().indexOf(value) > -1;
			},

			//清空map中所有元素

			clear : function() {
				for (key in this.datamap) {
					delete this.datamap[key];
				}
			},

			//遍历map中所有key，返回所有key组成的数组

			keys : function() {
				keys = [];
				for (key in this.datamap) {
					keys.push(key);
				}
				return keys;
			},

			//遍历map中所有value，返回所有value组成的数组

			values : function() {
				values = [];
				for (key in this.datamap) {
					values.push(this.datamap[key]);
				}
				return values;
			}
	};
	return {
		getMap:function(){
		return new HashMap();
	}}
})

function HashMap() {     
    this.elements = new Array();     
       
    //获取MAP元素个数     
    this.size = function() {     
        return this.elements.length;     
    }     
       
    //判断MAP是否为空     
    this.isEmpty = function() {     
        return(this.elements.length < 1);     
    }     
       
    //删除MAP所有元素     
    this.clear = function() {     
        this.elements = new Array();     
    }     
       
    //向MAP中增加元素（key, value)      
    this.put = function(_key, _value) {     
        this.elements.push( {     
            key : _key,     
            value : _value     
        });     
    }     
       
    //删除指定KEY的元素，成功返回True，失败返回False     
    this.remove = function(_key) {     
        var bln = false;     
        try{     
            for(i = 0; i < this.elements.length; i++) {     
                if(this.elements[i].key == _key) {     
                    this.elements.splice(i, 1);     
                    return true;     
                }     
            }     
        } catch(e) {     
            bln = false;     
        }     
        return bln;     
    }     
       
    //获取指定KEY的元素值VALUE，失败返回NULL     
    this.get = function(_key) {     
        try{     
            for(i = 0; i < this.elements.length; i++) {     
                if(this.elements[i].key == _key) {     
                    return this.elements[i].value;     
                }     
            }     
        } catch(e) {     
            return null;     
        }     
    }     
       
    //获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL     
    this.element = function(_index) {     
        if(_index < 0 || _index >= this.elements.length) {     
            return null;     
        }     
        return this.elements[_index];     
    }     
       
    //判断MAP中是否含有指定KEY的元素     
    this.containsKey = function(_key) {     
        varbln = false;     
        try{     
            for(i = 0; i < this.elements.length; i++) {     
                if(this.elements[i].key == _key) {     
                    bln = true;     
                }     
            }     
        } catch(e) {     
            bln = false;     
        }     
        return bln;     
    }     
       
    //判断MAP中是否含有指定VALUE的元素     
    this.containsValue = function(_value) {     
        var bln = false;     
        try{     
            for(i = 0; i < this.elements.length; i++) {     
                if(this.elements[i].value == _value) {     
                    bln = true;     
                }     
            }     
        } catch(e) {     
            bln = false;     
        }     
        return bln;     
    }     
       
    //获取MAP中所有VALUE的数组（ARRAY）     
    this.values = function() {     
        var arr = new Array();     
        for(i = 0; i < this.elements.length; i++) {     
            arr.push(this.elements[i].value);     
        }     
        return arr;     
    }     
       
    //获取MAP中所有KEY的数组（ARRAY）     
    this.keys = function() {     
        var arr = new Array();     
        for(i = 0; i < this.elements.length; i++) {     
            arr.push(this.elements[i].key);     
        }     
        return arr;     
    }     
}     

