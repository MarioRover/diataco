const Fetch = (url,method,body) => {  
  fetch(url, {method,body})
  .then(res => {
    return res.json();
  }).then(res => {
    let messages = res.data.msg;
    if (typeof messages !== 'undefined') {
      messages.map(message => {
        izitoast(res.data.method, message);
      });
    }
    if(res.status == 'serverError') {
      if (res.data.debug) {
        window.localStorage.setItem('message', res.data.msg);
        window.localStorage.setItem('statusCode', res.data.statusCode);
        window.localStorage.setItem('stack', res.data.stack);
        window.location = '/error';
      } else {
        window.location = 'errors/errorPage';
      }
    }
    if(res.status == 'transData') {
      if (typeof res.data.transfer.imageUrl !== 'undefined') {
        setImageUrl(res.data.transfer.imageUrl);
      }
    }
  }).catch(err => {
    console.log(err);
  })
}
const Fetch2 = (url,method,body) => {
  fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => {
    return res.json();
  }).then(res => {
    if (res.status == 'userError') {
      let messages = res.data.msg;
      if (typeof messages !== 'undefined') {
        messages.map(message => {
          izitoast(res.data.method, message);
        });
      }
      if (typeof res.data.redirect !== 'undefined') {
        setTimeout(() => {
          window.location = res.data.redirect;
        },4000);
      }
    }
    if (res.status == 'serverError') {
      if (res.data.debug) {
        window.localStorage.setItem('message', res.data.msg);
        window.localStorage.setItem('statusCode', res.data.statusCode);
        window.localStorage.setItem('stack', res.data.stack);
        window.location = '/error';
      } else {
        window.location = 'errors/errorPage';
      }
    }
    if(res.status == 'redirect') {
      setTimeout(() => {
        window.location = res.data.url;
      }, 3000);
    }
    if(res.status == 'deleteObj') {
      switch (res.data.actionDel) {
        case 'row':
          rowDelete(res.data.objId);
          break;
        default:
          break;
      }
      let messages = res.data.msg;
      if (typeof messages !== 'undefined') {
        messages.map(message => {
          izitoast(res.data.method, message);
        });
      }
    }
  }).catch(err => {
    console.log(err);
  })
}
// Recaptcha
const token = guidGenerator();
const getToken = async() => {
  return token;
}
var onloadCallback = function () {
  grecaptcha.render('html_element', {
    'sitekey': '6Lf5x20UAAAAAM8RZ_3GppCb-Hk_CKxdLo5F4aA0',
    'theme': 'dark',
    'callback': verifyCallback,
    'hl' : 'fa'
  });
};
const verifyCallback = (res) => {
  sessionStorage.setItem('recaptcha', token);
};
//GuidGenerator
function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
const rowDelete = (objId) => {
  let row = $(`tr td button[value=${objId}]`).parents('tr');
  $(row).remove();
}