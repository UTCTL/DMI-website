$(document).ready(function() {
	setup_navbar(); 

	$(window).scroll(function() {
		setup_banner(); 
	}); 

	$(window).load(function() { 
		read_url(); 
	}); 
}); 

function setup_navbar() { 
	$('nav li').click(function(e) {
		e.preventDefault(); 
		var id = $(this).attr('id'); 
		if(id=="logo") 
			window.location.assign('index.html'); 
		else 
			window.location.assign('index.html#'+id); 
	}); 
}

// function setup_lightbox() {
// 	$('.thumbnail').fancybox({
// 		width:700, 
// 		height:400, 
// 		helpers: {
// 			overlay: {locked:false}, 
// 			title: { type:'inside' }, 
// 			thumbs: { 
// 				width:700, 
// 				height:400 
// 			}
// 		}, 
// 		type: 'iframe', 
// 		fitToView: false 
// 	}); 
// } 

// function setup_projects() {
// 	$('.project-content').click(function() {
// 		var id = $(this).attr('id'); 
// 		window.location.assign('projects.html#'+id); 
// 	}); 
// }

function read_url() {
	var url = window.location.href;  
	var n = url.lastIndexOf('#'); 

	if(n>-1) scroll_to(url.substring(n+1)); 

	window.history.pushState("","Digital Media Institute",url.substring(0,n)); 
} 

function scroll_to(id) {
	scroll_animated(id,true,-1); 
}

function scroll_animated(id,animation,actual) {
	var qty = actual; 
	if(actual<0) qty = $('.project#'+id).offset().top-60; 

	// Change selected state of clicked menu item 
	// $('nav .menu li.selected').removeClass("selected"); 
	// $('nav .menu li#'+id).addClass("selected"); 
	// change_nav_state(id); 

	// Scroll to desired location on page
	$('html,body').animate({ 
		scrollTop: qty 
	},0,'swing'); 
}

function setup_banner() {
	var top = $(window).scrollTop(); 
	var current = get_current_section(); 
	var banner = $('section#'+current+' .banner'); 

	// $('section .banner').css({ 
	// 	'position':'' 
	// }); 

	// banner.css({
	// 	'position':'fixed'
	// }); 
	
}

function get_current_section() {
	var focus = $(window).scrollTop() + $('nav').height(); //+($(window).height()*(1/4)); 
	var sections = []; 
	var top_bound; 
	var bot_bound; 
	var this_section; 

	$(document).find('section').each(function() { 
		sections.push(this.id); 
	}); 

	for(var i = 0; i<sections.length; i++) {
		this_section = 'section#'+sections[i]; 
		top_bound = $(this_section).offset().top; 
		bot_bound = top_bound + $(this_section).height(); 

		if(top_bound<=focus && focus<=bot_bound) return sections[i]; 
	}

	return null; 
}