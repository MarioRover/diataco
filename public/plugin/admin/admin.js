let collTabs = $('.coll-tab');

$.each(collTabs , (collIndex, collTab) => { 
  $(collTab).click(() => { 
    if (! $(collTab).next().hasClass('show') ) {
      //Show Collapse
      $(collTab).next().addClass('show');
      $(collTab).find('.caret').addClass('rotate');
    } else {
      //Hidden Collapse
      $(collTab).next().removeClass('show');
      $(collTab).find('.caret').removeClass('rotate');
    }
  });
});