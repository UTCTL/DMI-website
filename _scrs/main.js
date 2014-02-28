$(document).ready(function() {
	setup_scrolling(); 
	setup_slider(); 
	setup_lightbox(); 

	$(window).load(function() {
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

// Calls scroll_animated with defauly params 
function scroll_to(id) {
	scroll_animated(id,true,-1); 
}

// Actual window scrolling function 
function scroll_animated(id,animation,actual) {
	var qty = actual; 
	if(actual<0) qty = $('section.'+id).offset().top-60; 

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
}

function set_project_content_size(size) {
	$('.project-content, .projects li.project').css({ 'width':size+'px' }); 
	$('.project-content p, .project-content h1').css({ 'padding-left':((size/2)-300)+'px' }); 
	$('.dots').css({ 'margin-left':(0-($('.dots').width()/2))+'px' }); 
} 

// Returns main section being desplayed 
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

// Change active state of menu options 
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

// Setting up detection of lightboxes 
function setup_lightbox() {
	$("li[rel^='prettyPhoto']").prettyPhoto(); 
	$("a[rel^='prettyPhoto']").prettyPhoto(); 
} 

// Getting url to detect particular section and cleaning it 
function read_url() {
	var url = window.location.href;  
	var n = url.lastIndexOf('#'); 

	if(n>-1) scroll_to(url.substring(n+1)); 

	window.history.pushState("","Digital Media Institute",url.substring(0,n)); 
} 