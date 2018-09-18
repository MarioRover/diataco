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

// document.querySelector('.contactPageSetting').addEventListener('submit' , function(e) {
//   e.preventDefault();
//   let address = document.querySelector('input[name = "address"]');
//   let iconAddress = document.querySelector('input[name = "iconAddress"]');
//   let file = document.querySelector('input[name = "file"]');
  
  // $('.contactPageSetting').submit((e) =>{
  //   e.preventDefault();
  //   let address = $('input[name = "address"]');
  //   let iconAddress = $('input[name = "iconAddress"]');

  //   fetch('/admin/site-setting/pages/contact', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       address: address.value,
  //       iconAddress: iconAddress.value,
  //     }),
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     }
  //   }).then(res => {
  //     return res.json();
  //   }).then(res => {
  //     console.log(res);
  //   }).catch(err => {
  //     console.log(err);
  //   })

  // });

