$(document).ready(function() {
	setup_scrolling(); 
	setup_slider(); 
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
	$(function() {
		var slider = $('.projects').unslider({
			speed: 500,
			delay: 5000, 
			complete: function() {}, 
			keys: true, 
			dots: true, 
			fluid: true 
		}); 
		var data = slider.data('unslider'); 

		data.start(); 
	}); 
}