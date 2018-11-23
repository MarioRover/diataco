const Fetch = (url,method,body) => {  
  fetch(url, {method,body})
  .then(res => {
    return res.json();
  }).then(res => {
    if(res.status == 'serverError') {
      if (res.data.debug) {
        window.localStorage.setItem('message', res.data.msg);
        window.localStorage.setItem('statusCode', res.data.statusCode);
        window.localStorage.setItem('stack', res.data.stack);
        window.location = '/error';
      } else {
        window.location = 'errors/stack';
      }
    }
    if(res.status == 'transData') {
      if (typeof res.data.transfer.imageUrl !== 'undefined') {
        setImageUrl(res.data.transfer.imageUrl);
      }
    }
    if (res.status == 'redirect') {
      setTimeout(() => {
        window.location = res.data.href;
      } , 3000)
    }
    let messages = res.data.msg;
    if (typeof messages !== 'undefined') {
      messages.map(message => {
        izitoast(res.data.method, message);
      });
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
        window.location = res.data.href;
      }, 3000);
    }
    if(res.status == 'deleteObj') {
      switch (res.data.actionDel) {
        case 'row':
          rowDelete(res.data.objId);
          break;
        case 'box':
          boxDelete(res.data.objId);
          break;
        default:
          break;
      }
    }
    let messages = res.data.msg;
    if (typeof messages !== 'undefined') {
      messages.map(message => {
        izitoast(res.data.method, message);
      });
    }
  }).catch(err => {
    console.log(err);
  })
}
//GuidGenerator
function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
