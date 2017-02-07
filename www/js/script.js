$(document).ready(function(){
	$("a.scroll").on("click", function(e){
		e.preventDefault();
		href = $(this).attr("href");
		if($(href).length != 0) {
			$("body,html").stop().animate({ scrollTop: $(href).offset().top - 110}, 1000);
		}
	});
});