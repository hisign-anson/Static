(function($) {

    $.fn.dragmove = function() {
        return this.each(function() {
            var $document = $(document),
                $this = $(this),
                active,
                startX,
                startY,
                click;
            
            $this.on('mousedown', function(e) {
                active = true;
                startX = e.originalEvent.pageX - $this.offset().left;
                startY = e.originalEvent.pageY - $this.offset().top;	
                
                if ('mousedown' == e.type){
                	click = $this;
                }
                                    
                if (window.mozInnerScreenX == null){
                	return false;	
                }
            });
            
            $document.on('mousemove', function(e) {
                if ('mousemove' == e.type && active){
                	click.css({right:'',bottom:''});
                	click.offset({ 
                    
                        left: e.originalEvent.pageX - startX,
                        top: e.originalEvent.pageY - startY
                    });
                }
            }).on('mouseup', function() {
                active = false;
            });
        });
    };

})(jQuery);