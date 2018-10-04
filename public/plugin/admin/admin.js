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
// width: 260 px;
// width: calc(100 % -260 px);


