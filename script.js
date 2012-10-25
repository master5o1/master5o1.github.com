var GooglePlus = function(data) {
	$(document).ready(function() {
		$.each(data.items, function(key, value) {
			var slide = '<li data-nav="' + key + '">';
			if (typeof value.object.attachments != 'undefined') {
				if (value.object.attachments[0].objectType == 'video' && value.object.attachments[0].url.match(/http:\/\/www\.youtube\.com.*/)) {
					var attachment = '<iframe width="464" height="261" src="https://www.youtube-nocookie.com/embed/' + $.getQueryFromURL(value.object.attachments[0].url).v + '" frameborder="0" allowfullscreen></iframe>';
					slide += attachment + '<div class="video-content"><p>' + value.object.content + '</p></div>';
				} else if (value.object.attachments[0].objectType == 'photo' || value.object.attachments[0].objectType == 'video') {
					var image = value.object.attachments[0].image.url.replace('resize_h=100', 'resize_w=464');
					var attachment = "background-image: url('" + image + "');"
					var video = '';
					if (value.object.attachments[0].objectType == 'video') {
						video = '<span style="display: inline-block; font-size: 0.75em; margin: 0.5em 0.75em; font-style: oblique;">This is a video, view it <a href="' + value.object.attachments[0].url + '">here</a>.</span>';
					}
					slide += '<div class="photo" style="' + attachment + '">' + video + '</div><div class="photo-content"><p>' + value.object.content + '</p></div>';
				} else if (value.object.attachments[0].objectType == 'album') {
					var album = [];
					for (var i = 0; i < value.object.attachments[0].thumbnails.length; i++) {
						var image = value.object.attachments[0].thumbnails[i].image.url.replace(/w[0-9]+-h[0-9]+(-p)?/, 'w464-h261-p')
						album.push('<img src="' + image + '" alt="' + i + '" />');
					}
					slide += '<div class="album">' + album.join("") + '</div><div class="album-content"><p>' + value.object.content + '</p></div>';
				} else {
					var attachment = '<h2><a href="' + value.object.attachments[0].url + '">' + value.object.attachments[0].displayName + '</a></h2>';
					slide += attachment + '<div class="url-content"><p>' + value.object.content + '</p></div>';
				}
			} else {
				slide += '<div class="text-content"><p>' + value.object.content + '</p></div>';
			}
			var replies = (value.object.replies.totalItems == 1) ? '1 reply' : value.object.replies.totalItems + ' replies';
			var plusones = (value.object.plusoners.totalItems == 0) ? "+0" : '<span style="color: #DD4B39;">+' + value.object.plusoners.totalItems + '</span>';
			slide += '<div class="permalink-bar"><a href="' + value.object.url + '">Permalink</a> | Updated <time class="timeago" datetime="' + value.updated + '">' + (new Date(value.updated)).toDateString() + '</time> &middot; ' + replies + ' &middot; ' + plusones + '</div>';
			slide += '</li>';
			$('#google-plus-slides').append(slide);
		});
		$('#google-plus-slides div.album').cycle({
			timeout: 4000
		});
	});
}

var Twitter = function(data) {
	$(document).ready(function() {
		for (var i = 0; i < data.length; i+=4) {
			var slide = '<li data-nav="' + (i/4) +'">';
			for (var j = 0; j < 4; j++) {
				if (i+j >= data.length) { break; }
				var value = data[i+j];
				var tweet = '<div class="text-content">';
				var text = value.text;
				var linkUrls = function (text) {
					var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
					return text.replace(exp,"<a href='$1'>$1</a>"); 
				};
				text = linkUrls(text);
				text = text.replace(/@([a-zA-Z0-9_]+)/g, '@<a href="https://twitter.com/$1">$1</a>');
				text = text.replace(/#([a-zA-Z0-9_]+)/g,'#<a href="https://twitter.com/search?q=%23$1">$1</a>');
				tweet += '<p>' + text + '</p>';
				var retweet_count = (value.retweet_count == 0? "" : " &middot; " + value.retweet_count + " retweet" + (value.retweet_count == 1? "" : "s"));
				tweet += '<div class="permalink-bar"><a href="https://twitter.com/master5o1/status/' + value.id_str + '">Permalink</a> | Posted <time class="timeago" datetime="' + value.created_at + '">' + (new Date(value.created_at)).toDateString() + '</time> via ' + value.source + retweet_count + '</div>';
				tweet += '</div>';
				slide += tweet;
			}
			slide += '</li>';
			$('#twitter-slides').append(slide);
		}
	});
}

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
	
	$('#menu').css('opacity', 0).hide();
	$('#slide > li').each(function(index){
		var style = '';
		if (index == 0) {
			$('body').data('current', $('#slide > li').eq(index).data('nav'));
			style = ' current';
		}
		if ($('#slide > li').eq(index).data('menu') != false)
			$('#menu').append('<li><a href="#/' + $('#slide > li').eq(index).data('nav') + '" class="scroller' + style + '">' + $('#slide > li').eq(index).data('nav') + '</a></li>');
	});

	$('#menu').show().animate({opacity: 1.0}, 750);

	$('#feature').cycle({
		fx: 'scrollLeft',
		timeout: 4000
	});

	$(window).bind('hashchange', function(event) { if (window.location.hash.substring(0,2) == '#/') $.scrolling(event); });
	$(window).load($.scrolling);
	$('.timeago').timeago();
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

$.submenu = function(page, slide, count) {
	$('#sub-menu').css('opacity', 0).hide();
	$('#sub-menu').html('');
	$('li[data-nav="' + page + '"] div.slide ol > li').each(function(index){
		if ($('li[data-nav="' + page + '"] div.slide ol > li').eq(index).data('nav') == undefined) { return; }
		var nav = $('li[data-nav="' + page + '"] div.slide ol > li').eq(index).data('nav');
		var label = nav*1 || nav;
		var className = '';
		if (index == slide) {
			className += ' current';
		}
		if (typeof label == 'string') { label = label.replace(/-/g,' '); }
		else { return; label = (label + 1); }
		$('#sub-menu').append('<li><a href="#/' + page + '/' + nav + '" class="scroller' + className + '"><span>' + label + '</span></a></li>');
	});
	if (count > 1) {
		if (slide > 0) {
			var prev = $('li[data-nav="' + page + '"] div.slide ol > li').eq(slide - 1).data('nav');
			$('#sub-menu').append('<li><a href="#/' + page + '/' + prev + '" class="scroller">&larr;</a></li>');
		} else {
			$('#sub-menu').append('<li><a class="scroller" style="background: rgba(0,0,0,0.50);">&larr;</a></li>');
		}
		if ((slide + 1) < count) {
			var next = $('li[data-nav="' + page + '"] div.slide ol > li').eq(slide + 1).data('nav');
			$('#sub-menu').append('<li><a href="#/' + page + '/' + next + '" class="scroller">&rarr;</a></li>');
		} else {
			$('#sub-menu').append('<li><a class="scroller" style="background: rgba(0,0,0,0.50);">&rarr;</a></li>');
		}
	}
	$('#sub-menu').show().animate({opacity: 1.0}, 0);
}

$.scrolling = function(event){
	var yx, count, hash, y_index, x_index, y_name, x_name;
	hash = window.location.hash;
	yx = hash.replace('#/','').split('/');
	y_index = yx[0];
	y_name = yx[0] * 1 || yx[0];
	if (yx.length == 1) yx[1] = 0;
	x_index = yx[1];
	x_name = yx[1] * 1 || yx[1];
	if (typeof y_name == 'string') {
		$('#slide > li').each(function(index) {
			if ($('#slide > li').eq(index).data('nav') == yx[0]) {
				y_index = index;
			}
		});
	} else {
		y_index = y_index * 1;
		y_name = $('#slide > li').eq(y_index).data('nav');
	}
	count = $('#slide li[data-nav="' + y_name + '"] ol li').length;
	if (typeof x_name == 'string') {
		$('#slide li[data-nav="' + y_name + '"] .slide ol li').each(function(index) {
			if ($('#slide li[data-nav="' + y_name + '"] .slide ol li').eq(index).data('nav') == yx[1]) {
				x_index = index;
			}
		});
	} else {
		x_index = x_index * 1;
		x_name = $('#slide li[data-nav="' + y_name + '"] .slide ol li').eq(x_index).data('nav');
	}
	if (typeof x_index != 'number') { x_index = y_index = 0; }
	var current_name = "";
	$('#slide > li ol').each(function(index) {
		if ($('#slide > li ol').eq(index).css('marginLeft') != '0px') {
			current_name = $('#slide > li ol').eq(index).parent().parent().data('nav');
		}
	});
	if (current_name != y_name) {
		$('#slide [data-nav="' + current_name + '"] ol').stop().animate({
			marginLeft: 0
		}, 400);
	}
	$('#slide [data-nav="' + y_name + '"] ol').stop().animate({
		marginLeft: -1 * x_index * $('#slide').width()
	}, 400);
	$('#right .inside ul').stop().animate({
		marginTop: -1 * y_index * $('#right').height()
	}, 200);
	if (this != $ && this != window) {
		event.preventDefault();
	}
	
	$('#feature').cycle('pause');
	$('#google-plus-slides div.album').cycle('pause');
	if (y_name == 'Welcome') $('#feature').cycle('resume');
	if (y_name == 'Posts') $('#google-plus-slides div.album').cycle('resume');
	
	$('#menu .current').removeClass('current');
	$('#menu [href="#/' + y_name + '"]').addClass('current');
	$.submenu(y_name, x_index, count);
}
