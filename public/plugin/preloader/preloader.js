window.addEventListener('load', function (event) {
  console.log('page is loaded');
  $(window).preloader({
    selector: '#preloader',
    type: 'document',
    removeType: 'fade',
    fadeDuration: 1000,
    delay: 0
  });
});