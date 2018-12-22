// CSS Loader
import '../css/fonts.css';
import '../css/fontawesome-all.css';
import '../css/setting.css';
import '../css/style.css';
import '../plugin/izitoast/iziToast.css';
import '../plugin/home/owlcarousel/owl.carousel.min.css';
import '../plugin/home/owlcarousel/owl.theme.default.min.css';
import '../css/aos.css';
import '../css/responsive.css';
// JS Loader
import '../plugin/preloader/jquery.preloader.min';
import './ajaxController';
import '../plugin/home/owlcarousel/owl.carousel.min';
//////////////Mobile Navigation/////////////////// 
let mobileIcon = $('#nav-icon');
let mobileNav = $('.mobile-nav');
$(document).ready(function () {
  $(mobileIcon).click(() => {
    if(!$(mobileIcon).hasClass('open')) {
      $(mobileIcon).addClass('open');
      $(mobileNav).addClass('open');
    } else {
      $(mobileIcon).removeClass('open');
      $(mobileNav).removeClass('open');
    }
  });
});
///////////////Tab of Products/////////////////////
let tabNavs = $('.tab-nav .tabnav-item');
let tabContent = $('.products-tab .tab-content .tab-content-wrap');

$.each(tabNavs , (tabIndex , tabNav) => {
  $(tabNav).click((e) => { 
    e.preventDefault();
    // Remove Active Class From Navs
    $.each(tabNavs , (tabI , tab) => {
      $(tab).removeClass('active');
      $(tab).parent().removeClass('active');
    });
    $(tabNav).addClass('active');
    $(tabNav).parent().addClass('active');
    // Remove Active Class From Content
    $.each(tabContent , (index ,content) => {
      $(content).removeClass('active');
    });
    $(tabContent[tabIndex]).addClass('active');
  });
})
//////AOS////
window.addEventListener('load', function (event) {
  //////Input/////
  let inputs = $('input');
  let textareas = $('textarea');
  $.each(inputs, (indexInArray, input) => {
    $(input).val('');
  });
  $.each(textareas, (indexInArray, textarea) => {
    $(textarea).val('');
  });
});
// ///////////Counter/////////////
$('.count').each(function () {
  $(this).prop('Counter', 0).animate({
    Counter: $(this).text()
  }, {
    duration: 4000,
    easing: 'swing',
    step: function (now) {
      $(this).text(Math.ceil(now));
    }
  });
});

