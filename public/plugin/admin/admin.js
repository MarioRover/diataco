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


