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

var velocity = 0.3;

function update(){ 
var pos = $(window).scrollTop(); 
$('#forwhom').each(function() { 
    var $element = $(this);
    var height = $element.height()+135;
    $(this).css('backgroundPosition', '20% ' + Math.round((height - pos) * velocity) +  'px'); 
   }); 
   };

 $(window).bind('scroll', update);
    