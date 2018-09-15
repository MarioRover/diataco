window.addEventListener('load', function (event) {
  $(window).preloader({
    selector: '#preloader',
    type: 'document',
    removeType: 'fade',
    fadeDuration: 1000,
    delay: 0
  });
});