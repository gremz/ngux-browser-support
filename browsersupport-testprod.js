window.trb = window.trb || {};
trb.utils = trb.utils || {};

trb.browsersupport = {
  supportsSvg: function() {
    return document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1');
  },
  svginImg: function(callback) {
    var testImg = document.createElement('img');
    testImg.setAttribute('src', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNzUiIGhlaWdodD0iMjc1Ij48L3N2Zz4%3D');
    testImg.onload = function() {
      callback && callback(true);
    };
    testImg.onerror = function() {
      callback && callback();
    };
  },
  isMobile: function() {
    var userAgentString = navigator.userAgent || navigator.vendor || window.opera;
    return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|playbook|silk/i.test(userAgentString)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(userAgentString.substr(0,4));
  },
  isIE9: function() {
    if (navigator.appName == 'Microsoft Internet Explorer' && /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent)) {
      return parseFloat(RegExp.$1) == 9;
    }
  },
  notmobileCalccheck: function() {
    if (this.isMobile()) return true;

    var el = document.createElement('div');
    el.style.cssText = "width:-webkit-calc(10px);width:calc(10px)";
    return !!el.style.length;
  },
  isAndroidBrowser: function() {
    var userAgentString = navigator.userAgent || navigator.vendor;

    return /android/i.test(userAgentString) &&
          (!/chrome/i.test(userAgentString) || /chrome/i.test(userAgentString) && /Version/i.test(userAgentString)) &&
          !/firefox/i.test(userAgentString) &&
          !window.opera;
  },
  isSupportedBrowser: function() {
    if (this.isAndroidBrowser()) {//is android
      return this.getScreenWidth() < 420; //native browser not table
    }
    
    return !(/blackberry|playbook|midp/i.test(navigator.userAgent || navigator.vendor)) && !window.opera; //not belongs to unsuported browser list (window.opera does not exist in Opera with blink engine)
  },
  getScreenWidth: function() {
    var dpr = window.devicePixelRatio || 1;
    return Math.min(screen.width/dpr, screen.height/dpr);
  },
  isSupported: function isSupported(condition, callback) {
    var sessionStorageKey = 'trb.browsersupport.supported',
        supported = false;

    if (window.sessionStorage && sessionStorage[sessionStorageKey]) {
      supported = sessionStorage[sessionStorageKey] == 'true';
    } else {
      try {
        supported = this.supportsSvg() &&
                    this.notmobileCalccheck() &&
                    this.isSupportedBrowser();
                    
      } catch(ex) {
        supported = false;
      }
    }

    if (window.sessionStorage) {
      sessionStorage[sessionStorageKey] = supported;
    }

    if (supported == condition) {
      callback();
    }
  }
};

trb.utils.isIEversion8orBelow = function() {
  if (navigator.appName == 'Microsoft Internet Explorer' && /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent)) {
    return parseFloat(RegExp.$1) <= 8.0;
  }
};

trb.utils.redirect = function(url) {
  if (trb.utils.isIEversion8orBelow()) {
    var my_form = document.createElement('FORM');
    my_form.name = 'redirectIeForm'; 
    my_form.method = 'GET'; 
    my_form.action = url; 
    my_form.style.display = "none";
    document.body.appendChild(my_form);
    my_form.submit();
  } else {
    window.location.replace(url);
  }
};

trb.utils.getRedirectToUrl = function() {
  var redirectToUrl = window.location.href.split('#url=')[1];
  if (!redirectToUrl || redirectToUrl[0] != '/') {
    return '/';
  }
  return redirectToUrl;
};

trb.storage = {
  set: function set(args, value, timestamp) {
    if (typeof args == 'string' && typeof value != undefined) {
      localStorage[args] = value;
    } else {
      for(var key in args) {
       localStorage[key] = args[key];
      }
    }
    if (timestamp) {
      localStorage[args + 'Timestamp'] = timestamp;
    }
    return true;
  },

  get: function get(arr) {
    if (!this.isExpired(arr)) {
      if (arr instanceof Array) {
        var returnObj = {};
        for (var i = 0; i < arr.length; i++) {
          returnObj[arr[i]] = localStorage[arr[i]];
        }
        return returnObj;
      }
      return localStorage[arr];
    }
    return null;
  },

  remove: function remove(arr) {
    arr instanceof Array || (arr = [arr]);
    for (var i = 0; i < arr.length; i++) {
      localStorage.removeItem(arr[i]);
      localStorage.removeItem(arr[i] + 'Timestamp');
    }
    return true;
  },

  /*Checks the expiration variable {$var}Timestamp and returns true if data has expired */
  isExpired: function isExpired(arg) {
    var oldTimestamp = localStorage[arg + 'Timestamp']; // WTF
    if (oldTimestamp) {
      return Date.now() > oldTimestamp;
    }
  }
};

trb.cookie = {
  set: function set(name,value,days) {
    var date,
    expires = '';
    if(days) {
      date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toGMTString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
    return true;
  },

  get: function get(name) {
    var nameEQ = name + '=',
    ca = document.cookie.split(';'),
    c;
    for (var i=0; i < ca.length; i++) {
      c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
  },
  
  remove: function remove(name) {
    createCookie(name, '', -1);
    return true;
  }  
};