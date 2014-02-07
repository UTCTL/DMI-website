$(document).ready(function() {
	setup_scrolling(); 
	setup_slider(); 

	$(window).load(function() {
		set_project_content_size($(window).width()); 
	}); 
}); 


// Seting up navigation bar scrolling
function setup_scrolling() {
	$('nav .menu li').click(function(e) { 
		e.preventDefault(); 
		var id = $(this).attr('id'); 
		if(id=="logo") id = "about"; 
		scrollTo(id); 
	}); 
}

function scrollTo(id) {
	scrollAnimated(id,true,-1); 
}

function scrollAnimated(id,animation,actual) {
	var qty = actual; 
	if(actual<0) qty = $('section.'+id).offset().top-60; 

	// Change selected state of clicked menu item 
	$('nav .menu li.selected').removeClass("selected"); 
	$('nav .menu li#'+id).addClass("selected"); 

	// Scroll to desired location on page
	$('html,body').animate({ 
		scrollTop: qty 
	},1000,'swing'); 
}

// Setting up project slider 
function setup_slider() {
	
	// Formatting the banner and starting slider
	$('.banner li').css({'height': ($('.projects').height())+'px'}); 
	$(function() {
		var slider = $('.banner').unslider({
			speed: 500,
			delay: 5000, 
			complete: function() {}, 
			keys: true, 
			dots: true, 
			fluid: true 
		}).data('unslider').start(); 
		var height = $('.projects').height()-100; 
		var pos_top = $('.projects').offset().top+(height/2)-($('.arrow').height()/2)+30; 

		$('.dots').css({'top': (height+60)+'px', 'z-index':'998' }); 
		$('banner li').css({'z-index':'299'}); 
		$('.arrow').css({ 'top': pos_top+'px' }); 
	}); 

	// Activating arrows 
	var slider = $('.banner').unslider().data('unslider'); 
	$('.arrow#right').on('click',function() {
		slider.next(); 
	}); 
	$('.arrow#left').on('click',function() {
		slider.prev(); 
	}); 

	// Setting size of project content 
	$(window).resize(function() { 
		set_project_content_size($(window).width()); 
	}); 

}

function set_project_content_size(size) {
	$('.project-content').css({ 'width':size+'px' }); 
	$('.project-content p, .project-content h1').css({ 'padding-left':((size/2)-300)+'px' }); 
	$('.dots').css({ 'margin-left':(0-($('.dots').width()/2))+'px' }); 
} 