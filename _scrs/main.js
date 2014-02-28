$(document).ready(function() {
	setup_scrolling(); 
	setup_slider(); 
	setup_lightbox(); 
	// setup_projects(); 

	$(window).load(function() {
		// set_project_content_size($(window).width()); 
		read_url(); 
	}); 
}); 


// Seting up navigation bar scrolling
function setup_scrolling() {
	$('nav .menu li, .footer .on-site li a').click(function(e) { 
		e.preventDefault(); 
		var id = $(this).attr('id'); 
		if(id=="logo") id = "about"; 
		scroll_to(id); 
	}); 

	$(window).scroll(function() {
		change_nav_state(get_current_section()); 
	}); 
}

function scroll_to(id) {
	scroll_animated(id,true,-1); 
}

function scroll_animated(id,animation,actual) {
	var qty = actual; 
	if(actual<0) qty = $('section.'+id).offset().top-60; 

	// Change selected state of clicked menu item 
	// $('nav .menu li.selected').removeClass("selected"); 
	// $('nav .menu li#'+id).addClass("selected"); 
	// change_nav_state(id); 

	// Scroll to desired location on page
	$('html,body').animate({ 
		scrollTop: qty 
	},1000,'swing'); 
}

// Setting up project slider 
function setup_slider() {
	
	// Formatting the banner and starting slider
	$('.projects li').css({'width':'300px','height': '335px'}); 
	var slider = $('.bxslider').bxSlider({
		'auto':true, 
		'pause':5000, 
		'autoStart':true, 
		'autoHover':true 
	}); 

	// $('.arrow#right').on('click',slider.goToNextSlide()); 
	// $('.arrow#left').on('click',slider.goToPrevSlide()); 


	// $(function() {
	// 	var slider = $('.banner').unslider({
	// 		speed: 500,
	// 		delay: 5000, 
	// 		complete: function() {}, 
	// 		keys: true, 
	// 		dots: true, 
	// 		fluid: true 
	// 	}).data('unslider').play(); 
	// 	var height = $('.projects').height()-100; 
	// 	var pos_top = $('.projects').offset().top+(height/2)-($('.arrow').height()/2)+25; 

	// 	$('.dots').css({'top': (height+60)+'px', 'z-index':'998' }); 
	// 	$('banner li').css({'z-index':'299'}); 
	// 	$('.arrow').css({ 'top': pos_top+'px' }); 
	// }); 

	// Activating arrows 
	// var slider = $('.banner').unslider().data('unslider'); 
	// $('.arrow#right').on('click',function() {
	// 	slider.next(); 
	// }); 
	// $('.arrow#left').on('click',function() {
	// 	slider.prev(); 
	// }); 

	// Setting size of project content 
	// $(window).resize(function() { 
	// 	set_project_content_size($(window).width()); 
	// }); 

}

function set_project_content_size(size) {
	$('.project-content, .projects li.project').css({ 'width':size+'px' }); 
	$('.project-content p, .project-content h1').css({ 'padding-left':((size/2)-300)+'px' }); 
	$('.dots').css({ 'margin-left':(0-($('.dots').width()/2))+'px' }); 
} 

function get_current_section() {
	var focus = $(window).scrollTop()+($(window).height()*(1/4)); 
	var sections = []; 
	var top_bound; 
	var bot_bound; 
	var this_section; 

	$(document).find('section').each(function() {
		sections.push(this.className); 
	}); 

	for(var i = 0; i<sections.length; i++) {
		this_section = 'section.'+sections[i]; 
		top_bound = $(this_section).offset().top; 
		bot_bound = top_bound + $(this_section).height(); 

		if(top_bound<=focus && focus<=bot_bound) return sections[i]; 
	}

	return null; 
}

function change_nav_state(focus) {
	switch(focus) {
		case null:
			return; 
			break; 
		case 'companies':
			focus = 'internship'; 
			break; 
		case 'staff':
		case 'footer':
			focus = 'projects'; 
			break; 
	}

	$('nav .menu li').removeClass('selected'); 
	$('nav .menu li#'+focus).addClass('selected'); 
}

function setup_lightbox() {
	$("li[rel^='prettyPhoto']").prettyPhoto(); 
	$("a[rel^='prettyPhoto']").prettyPhoto(); 
	// $('.thumbnail').fancybox({
	// 	width:700, 
	// 	height:400, 
	// 	helpers: {
	// 		overlay: {locked:false}, 
	// 		title: { type:'inside' }, 
	// 		thumbs: { 
	// 			width:700, 
	// 			height:400 
	// 		}
	// 	}, 
	// 	type: 'iframe', 
	// 	fitToView: false 
	// }); 
} 

function setup_projects() {
	$('.project-content').click(function() {
		var id = $(this).attr('id'); 
		window.location.assign('projects.html#'+id);
	}); 
}

function read_url() {
	var url = window.location.href;  
	var n = url.lastIndexOf('#'); 

	if(n>-1) scroll_to(url.substring(n+1)); 

	window.history.pushState("","Digital Media Institute",url.substring(0,n)); 
} 