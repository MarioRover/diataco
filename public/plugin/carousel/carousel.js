$(document).ready(function() {
	var slideIndex = 0;
	var slides = $(".myslides");
	var dots = $(".demo");
	showSlides(slideIndex);
	$(function() {
		$("#ember1").click(function() {
			showSlides(slideIndex = 0);
		});
		$("#ember2").click(function() {
			showSlides(slideIndex = 1);
		});
		$("#ember3").click(function() {
			showSlides(slideIndex = 2);
		});
		$("#ember4").click(function() {
			showSlides(slideIndex = 3);
		});
		$("#ember5").click(function () {
			showSlides(slideIndex = 4);
		});
		$("#ember6").click(function () {
			showSlides(slideIndex = 5);
		});
	});
	function showSlides(slideNum) {
		var i;
		if(slideNum > (slides.length - 1)) {
			slideIndex = 0;
		}
		if(slideNum < 0) {
			slideIndex = (slides.length - 1);
		}
		for(i = 0; i < (slides.length); i++) {
			slides[i].style.display = "none";
		}
		for(i = 0; i < (dots.length); i++) {
			dots[i].className = dots[i].className.replace(" active" , "");
		}
		slides[slideIndex].style.display = "block";
		dots[slideIndex].className += " active";
	}
});