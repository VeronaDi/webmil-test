/* Smooth scroll */

$(document).ready(function(){
	$('.smooth-scroll').click(function() {
		$('html, body').animate({
			scrollTop: $( $(this).attr('href') ).offset().top
		}, 1000);
	});
});

/* Mobile navigation button toggle */

 $(document).ready(function(){
	$('#hideshow').on('click', function(event) {        
		 $('#navbar-mobile').toggle('show');
	});
});

/* Background scroll */
$(document).ready(function(){
$(window).scroll(function () {
    $(".bckg-image").css("background-position","20% " + ($(this).scrollTop() / 2) + "px");
});
});


