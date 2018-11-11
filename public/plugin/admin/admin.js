let rows = $('.sidebar .row');

function activeRow(rowName) {
  $(`.sidebar .row.${rowName}`).addClass('active');
}

window.addEventListener('load', function (event) {
  $.each(rows, function (rowIndex, row) {
    if ($(row).hasClass('active')) {
      $(this).parent().prev().addClass('open');
      $(this).parent().addClass('show');
    }
    $(row).click(function () {

      if ($(this).hasClass('coll-tab') && !$(this).hasClass('open')) {

        if (!$(this).next().hasClass('open')) {
          $(this).addClass('open');
          $(this).next().addClass('show');
        } else {
          $(this).removeClass('open');
          $(this).next().removeClass('show');
        }
      } else if ($(this).hasClass('coll-tab') && $(this).hasClass('open')) {
        $(this).removeClass('open');
        $(this).next().removeClass('show');
      }
    });
  });
});

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('.image-box img').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

function readURL2(input , boxNumber) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $(`.image-box.box${boxNumber} img`).attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

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
/////////////////Gallery//////////////////
  let button = $(".gallery .insert-image button");
  let image = $(".gallery .input-group .image-box img");
  let boxsData = {};
  let images = $('input[name = "images"]');
  let number = $('.gallery-box .box').length + 1;
  

  $(".gallery input[name='images']").change(function () {
    $(button).css('display', 'block');
  });

  $(".gallery .insert-image").click(function (e) {
    e.preventDefault();
    let boxs = $(".gallery-box .box");
    if (boxs.length > 5) {
      return izitoast('Error', ['تعداد عکس های وارد شده نمی تواند بیش از حد مجاز باشد']);
    }
    let box = $(`<div class="box"><img number="${number}" src="${image.attr('src')}" alt=""><div class="close grid align-center-middle btn-danger" data=""><i class="far fa-times-circle"></i></div></div>`);
    $('.gallery-box .box-wrap').append(box);
    boxsData[number] = images[0].files[0];
    number++;
    let closes = $('.gallery-box .box .close');
    $.each(closes, function (indexInArray, close) {
      $(close).click(function (e) {
        e.preventDefault();
        let id = $(this).siblings('img').attr('number');
        delete boxsData[`${id}`];
        $(this).parent().remove();
      });
    });
  });
  let closes = $('.gallery-box .box .close');
  $.each(closes, function (indexInArray, close) {
    $(close).click(function (e) {
      e.preventDefault();
      let pathName = window.location.pathname.split('/');
      let product = pathName[pathName.length - 2];
      let slug = pathName[pathName.length - 1];
      let body = {box : $(this).attr('data')};
      $(this).parent().remove();
      Fetch2(`/admin/gallery?product=${product}&slug=${slug}`, 'DELETE', body);
    });
  });
  // Checkbox
  let checkbox = $('.input-wrap .input-group.checkbox input[type="checkbox"]')
  $('.input-wrap .input-group.checkbox span').click(function (e) {
    e.preventDefault();
    if ($(checkbox).is(':checked')) {
      $(checkbox).prop('checked', false);
    } else {
      $(checkbox).prop('checked', true);
    }
  });