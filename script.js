$(document).ready(function() {
	var outside = $('#outside');	
	var width = $(document).width();
	var height = $(document).height();
	
	if (Math.round((height - outside.height()) / 2) > 0) {
		outside.css('top', Math.round((height - outside.height()) / 2) + 'px');
	}
	if (Math.round((width - outside.width()) / 2) > 0) {
		outside.css('left', Math.round((width - outside.width()) / 2) + 'px');
	}
	
	$.horizontal_slides = {};
	$('#menu').css('opacity', 0).hide();
	$('#slide > li').each(function(index){
		var style = '';
		if (index == 0) {
			$('body').data('current', $('#slide > li').eq(index).data('nav'));
			style = ' style="background: rgba(0,0,0,0.95);"';
		}
		$('#menu').append('<li><a href="#/' + $('#slide > li').eq(index).data('nav') + '" class="scroller"' + style + '>' + $('#slide > li').eq(index).data('nav') + '</a></li>');
		$.horizontal_slides[$('#slide > li').eq(index).data('nav')] = index;
	});
	
	if (!$.browser['msie']) {
		$.getJSON('https://www.googleapis.com/plus/v1/people/107744372254752109523/activities/public?key=AIzaSyBH2lAVF5Tak_-QZIgq8GK1vhfMGDb4TKQ', function(data) {
			$.each(data.items, function(key, value) {
				var slide = '<li>';
				if (typeof value.object.attachments != 'undefined') {
					if (value.object.attachments[0].objectType == 'photo') {
						var attachment = "background: url('" + value.object.attachments[0].image.url.replace('resize_h=100', 'resize_w=464') + "') no-repeat; background-size: 464px auto;"
						slide += '<div style="height: 261px;' + attachment + '"></div><div style="height: 100px; overflow: hidden; padding: 5px 5px;"><p>' + value.object.content + '</p></div>';
					} else if (value.object.attachments[0].objectType == 'video' && value.object.attachments[0].url.match(/http:\/\/www\.youtube\.com.*/)) {
						var attachment = '<iframe width="464" height="261" src="https://www.youtube-nocookie.com/embed/' + $.getQueryFromURL(value.object.attachments[0].url).v + '" frameborder="0" allowfullscreen></iframe>';
						slide += attachment + '<div style="height: 113px; padding: 5px 10px;"><p style="display: inline-block; border-radius: 0.25em; margin: 1.0em 1.0em; padding: 0.75em; background-color: rgba(255,255,255,0.05);">' + value.object.content + '</p></div>';
					} else {
						var attachment = '<a href="' + value.object.attachments[0].url + '">' + value.object.attachments[0].displayName + '</a>';
						slide += '<div style="height: 364px; padding: 10px;"><p style="display: inline-block; border-radius: 0.25em; margin: 1.0em 1.0em 0.5em; padding: 0.75em; background-color: rgba(255,255,255,0.05);">' + value.object.content + '</p><p style="display: inline-block; border-radius: 0.25em; margin: 0.5em 1.0em 1.0em; padding: 0.25em 0.75em; background-color: rgba(255,255,255,0.05);">' + attachment + '</p></div>';
					}
				} else {
					slide += '<div style="height: 364px; padding: 10px;"><p style="display: inline-block; border-radius: 0.25em; margin: 1.0em 1.0em; padding: 0.75em; background-color: rgba(255,255,255,0.05);">' + value.object.content + '</p></div>';
				}
				var replies = (value.object.replies.totalItems == 1) ? '1 reply' : value.object.replies.totalItems + ' replies';
				var plusones = (value.object.plusoners.totalItems == 0) ? "+0" : '<span style="color: #DD4B39;">+' + value.object.plusoners.totalItems + '</span>';
				slide += '<div style="font-size: 0.70em; padding: 0 1.0em; line-height: 40px;"><a href="' + value.object.url + '">Permalink</a> | Updated <time class="timeago" datetime="' + value.updated + '">' + (new Date(value.updated)).toDateString() + '</time> &middot; ' + replies + ' &middot; ' + plusones + '</div>';
				slide += '</li>';
				$('#google-plus-slides').append(slide);
			});
			$('.timeago').timeago();
			$.startScrolling();
		});
	} else {
		$('#slide').remove('li[data-nav="Posts]"');
		$('#menu [href="#/Posts"]').hide();
		$.startScrolling();
	}
	
	$('#slide > li').each(function(index){
		if ($('#slide li[data-nav="' + $('#slide > li').eq(index).data('nav') + '"] .slide ol').length > 0) {
			$('#slide li[data-nav="' + $('#slide > li').eq(index).data('nav') + '"] .slide').append(
				'<div class="creation-nav">'
				+ '<a href="#/' + $('#slide > li').eq(index).data('nav') + '" style="float: left;" class="scroller creation-scroll">&larr; Beginning</a>'
				+ '<a href="#/' + $('#slide > li').eq(index).data('nav') + '/1" style="float: right;" class="scroller creation-scroll">Next &rarr;</a>'
				+ '<div style="clear: both;"></div>'
				+ '</div>'
			);
		}
	});
	$('li[data-nav="Welcome"] .slide .creation-nav').html('<span style="display: inline-block; line-height: 40px; margin-right: 1.0em; float: right;">Marvel at my wondrous <a href="#/Creations" style="font-weight: bold;">creations</a>.</span>');
	$('#menu').show().animate({opacity: 1.0}, 1100);
});

$.getQueryFromURL = function(url) {
	var urlParams = {};
	var match,
		pl     = /\+/g,  // Regex for replacing addition symbol with a space
		search = /([^&=]+)=?([^&]*)/g,
		decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
		query  = url.split('?')[1].substring();
	while (match = search.exec(query))
		urlParams[decode(match[1])] = decode(match[2]);
	return urlParams;
};

$.startScrolling = function() {
	$.current_hash = false;
	window.setInterval(function() {
		if(window.location.hash != $.current_hash) {
			$.current_hash = window.location.hash;
			$.scrolling();
		}
	}, 100);
}

$.scrolling = function(){
	var yx, y, x, count, hash;
	hash = window.location.hash;
	yx = hash.replace('#/','').split('/');
	y = $.horizontal_slides[yx[0]];
	count = $('#slide li[data-nav="' + yx[0] + '"] ol li').length;
	if (yx.length == 1) yx[1] = 0;
	x = yx[1] * 1 || yx[1];
	if (typeof x == 'string') {
		$('#slide li[data-nav="' + yx[0] + '"] .slide ol li').each(function(index) {
			if ($('#slide li[data-nav="' + yx[0] + '"] .slide ol li').eq(index).data('nav') == yx[1]) {
				x = index;
			}
		});
	}
	if (typeof x != 'number') { x = y = 0; }
	if ((-1 * x * $('#right').width()) == 0) {
		$('a.creation-scroll[href="#/' + yx[0] + '"]').animate({opacity: 0.0}, 500).hide(500);
	} else {
		$('a.creation-scroll[href="#/' + yx[0] + '"]').show().animate({opacity: 1.0}, 500);
	}
	if (x >= count-1) {
		$('a.creation-scroll[href^="#/' + yx[0] + '/"]').animate({opacity: 0.0}, 500).hide(500);
	} else if (x == 0) {
		$('a.creation-scroll[href^="#/' + yx[0] + '/"]').show().animate({opacity: 1.0}, 500);
	}
	$('#slide [data-nav="' + $('body').data('current') + '"] ol').stop().animate({
		marginLeft: 0
	}, 400);
	$('#slide [data-nav="' + yx[0] + '"] ol').stop().animate({
		marginLeft: -1 * x * $('#slide').width()
	}, 400);
	$('#right .inside ul').stop().animate({
		marginTop: -1 * y * $('#right').height()
	}, 200);
	if (this != $ && this != window) {
		event.preventDefault();
	}
	//window.location.hash = hash;
	$('a.creation-scroll[href^="#/' + yx[0] + '/"]').attr('href', '#/' + yx[0] + '/' + ((x + 1) % count));
	$('#menu [href="#/' + $('body').data('current') + '"]').css('background', 'rgba(0,0,0,0.75)');
	$('#menu [href="#/' + yx[0] + '"]').css('background', 'rgba(0,0,0,0.95)');
	$('body').data('current', yx[0]);
}
