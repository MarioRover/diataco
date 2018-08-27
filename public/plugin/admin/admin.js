let rows = $('.sidebar .row');

$.each(rows, function (rowIndex, row) { 
  $(row).click(function () { 
    
    if($(this).hasClass('coll-tab') && ! $(this).hasClass('open')) {

      if(! $(this).next().hasClass('open')) {
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
  if($(row).hasClass('active')) {
    $(this).parent().prev().addClass('open');
    $(this).parent().addClass('show');
  }
});

function activeRow(rowName) {
  $(`.sidebar .row.${rowName}`).addClass('active');
}