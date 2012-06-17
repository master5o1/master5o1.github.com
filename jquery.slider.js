(function($) {

	$.fn.slipperyDip = function(options){
	  
		var defaults = {			
			vertical:   false,
			speed:      1000
		}; 

    $.easing.smooth = function (x, t, b, c, d) {
      if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
      return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    };
		
		var options = $.extend(defaults, options);  
				
		this.each(function() {
			var obj = $(this); 				
			var s = $("li", obj).length;
			var w = $("li", obj).width(); 
			var h = $("li", obj).height(); 
			obj.width(w); 
			obj.height(h); 
			obj.css("overflow","hidden");
			var ts = s-1;
			var t = 0;
			$("ul", obj).css('width',s*w);			
			if(!options.vertical) $("li", obj).css('float','left');
			
      var html = '<center><ul id="slider-nav">';
      $('#slider li').each(function(index) {
        html += (index>1) ? '<li><a data-cell="' + (index) + '" href="javascript:;">' + $(this).data('nav') + '</a></li>' : '';
      });
      html += '</ul></center>';
			$(obj).after(html);
      skipToMyLoop(2);
      $('#slider-nav a, a').click(function() {
        if ($(this).data('cell')) skipToMyLoop($(this).data('cell'));
      });
	
			function skipToMyLoop(newt){
        $('#slider-nav a').each(function (index) {
          if (index+2 == newt) $(this).addClass('active');
          else $(this).removeClass('active');
        });
				var ot = t;
        t = newt;
				var diff = Math.abs(ot-t);
				var speed = diff*options.speed;						
        follyScroll('top');
				if(!options.vertical) {
					p = (t*w*-1);
					$("ul",obj).animate(
						{ marginLeft: p }, 
						options.speed,
            'smooth'
					);				
				} else {
					p = (t*h*-1);
					$("ul",obj).animate(
						{ marginTop: p }, 
						options.speed,
            'smooth'
					);					
				};
			};			
		});
	  
	};

})(jQuery);