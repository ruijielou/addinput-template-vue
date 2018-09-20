// (function(doc, win) {
//     var docEl = doc.documentElement,
//         resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//         recalc = function() {
//             var clientWidth = docEl.clientWidth;
//             if (!clientWidth) return;
//             docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
//         };
//     if (!doc.addEventListener) return;
//     win.addEventListener(resizeEvt, recalc, false);
//     doc.addEventListener('DOMContentLoaded', recalc, false);
// })(document, window);
// (function flexible (window, document) {
//     var docEl = document.documentElement
//     var dpr = window.devicePixelRatio || 1

//     // adjust body font size
//     function setBodyFontSize () {
//       if (document.body) {
//         document.body.style.fontSize = (12 * dpr) + 'px'
//       }
//       else {
//         document.addEventListener('DOMContentLoaded', setBodyFontSize)
//       }
//     }
//     setBodyFontSize();

//     // set 1rem = viewWidth / 10
//     function setRemUnit () {
//       var rem = docEl.clientWidth / 10
//       docEl.style.fontSize = rem + 'px'
//     }

//     setRemUnit()

//     // reset rem unit on page resize
//     window.addEventListener('resize', setRemUnit)
//     window.addEventListener('pageshow', function (e) {
//       if (e.persisted) {
//         setRemUnit()
//       }
//     })

//     // detect 0.5px supports
//     if (dpr >= 2) {
//       var fakeBody = document.createElement('body')
//       var testElement = document.createElement('div')
//       testElement.style.border = '.5px solid transparent'
//       fakeBody.appendChild(testElement)
//       docEl.appendChild(fakeBody)
//       if (testElement.offsetHeight === 1) {
//         docEl.classList.add('hairlines')
//       }
//       docEl.removeChild(fakeBody)
//     }
//   }(window, document))

!(function(win, lib) {
  var timer,
    doc = win.document,
    docElem = doc.documentElement,
    vpMeta = doc.querySelector('meta[name="viewport"]'),
    flexMeta = doc.querySelector('meta[name="flexible"]'),
    dpr = 0,
    scale = 0,
    flexible = lib.flexible || (lib.flexible = {});

  // 设置了 viewport meta
  if (vpMeta) {
    console.warn("将根据已有的meta标签来设置缩放比例");
    var initial = vpMeta
      .getAttribute("content")
      .match(/initial\-scale=([\d\.]+)/);

    if (initial) {
      scale = parseFloat(initial[1]); // 已设置的 initialScale
      dpr = parseInt(1 / scale); // 设备像素比 devicePixelRatio
    }
  }
  // 设置了 flexible Meta
  else if (flexMeta) {
    var flexMetaContent = flexMeta.getAttribute("content");
    if (flexMetaContent) {
      var initial = flexMetaContent.match(/initial\-dpr=([\d\.]+)/),
        maximum = flexMetaContent.match(/maximum\-dpr=([\d\.]+)/);

      if (initial) {
        dpr = parseFloat(initial[1]);
        scale = parseFloat((1 / dpr).toFixed(2));
      }

      if (maximum) {
        dpr = parseFloat(maximum[1]);
        scale = parseFloat((1 / dpr).toFixed(2));
      }
    }
  }

  // viewport 或 flexible
  // meta 均未设置
  if (!dpr && !scale) {
    // QST
    // 这里的 第一句有什么用 ?
    // 和 Android 有毛关系 ?
    var u = (win.navigator.appVersion.match(/android/gi),
      win.navigator.appVersion.match(/iphone/gi)),
      _dpr = win.devicePixelRatio;

    // 所以这里似乎是将所有 Android 设备都设置为 1 了
    dpr = u
      ? _dpr >= 3 && (!dpr || dpr >= 3)
        ? 3
        : _dpr >= 2 && (!dpr || dpr >= 2)
          ? 2
          : 1
      : 1;

    scale = 1 / dpr;
  }

  docElem.setAttribute("data-dpr", dpr);

  // 插入 viewport meta
  if (!vpMeta) {
    vpMeta = doc.createElement("meta");

    vpMeta.setAttribute("name", "viewport");
    vpMeta.setAttribute(
      "content",
      "initial-scale=" +
        scale +
        ", maximum-scale=" +
        scale +
        ", minimum-scale=" +
        scale +
        ", user-scalable=no"
    );

    if (docElem.firstElementChild) {
      docElem.firstElementChild.appendChild(vpMeta);
    } else {
      var div = doc.createElement("div");
      div.appendChild(vpMeta);
      doc.write(div.innerHTML);
    }
  }

  function setFontSize() {
    var winWidth = docElem.getBoundingClientRect().width;

    if (winWidth / dpr > 540) {
      winWidth = 540 * dpr;
    }

    // 根节点 fontSize 根据宽度决定
    var baseSize = winWidth / 10;

    docElem.style.fontSize = baseSize + "px";
    flexible.rem = win.rem = baseSize;
  }

  // 调整窗口时重置
  win.addEventListener(
    "resize",
    function() {
      clearTimeout(timer);
      timer = setTimeout(setFontSize, 300);
    },
    false
  );

  // 这一段是我自己加的
  // orientationchange 时也需要重算下吧
  win.addEventListener(
    "orientationchange",
    function() {
      clearTimeout(timer);
      timer = setTimeout(setFontSize, 300);
    },
    false
  );

  // pageshow
  // keyword: 倒退 缓存相关
  win.addEventListener(
    "pageshow",
    function(e) {
      if (e.persisted) {
        clearTimeout(timer);
        timer = setTimeout(setFontSize, 300);
      }
    },
    false
  );

  // 设置基准字体
  if ("complete" === doc.readyState) {
    doc.body.style.fontSize = 12 * dpr + "px";
  } else {
    doc.addEventListener(
      "DOMContentLoaded",
      function() {
        doc.body.style.fontSize = 12 * dpr + "px";
      },
      false
    );
  }

  setFontSize();

  flexible.dpr = win.dpr = dpr;

  flexible.refreshRem = setFontSize;

  flexible.rem2px = function(d) {
    var c = parseFloat(d) * this.rem;
    if ("string" == typeof d && d.match(/rem$/)) {
      c += "px";
    }
    return c;
  };

  flexible.px2rem = function(d) {
    var c = parseFloat(d) / this.rem;

    if ("string" == typeof d && d.match(/px$/)) {
      c += "rem";
    }
    return c;
  };
})(window, window.lib || (window.lib = {}));

function GUID() {
  this.date = new Date(); /* 判断是否初始化过，如果初始化过以下代码，则以下代码将不再执行，实际中只执行一次 */
  if (typeof this.newGUID != "function") {
    /* 生成GUID码 */
    GUID.prototype.newGUID = function() {
      this.date = new Date();
      var guidStr = "";
      sexadecimalDate = this.hexadecimal(this.getGUIDDate(), 16);
      sexadecimalTime = this.hexadecimal(this.getGUIDTime(), 16);
      for (var i = 0; i < 9; i++) {
        guidStr += Math.floor(Math.random() * 16).toString(16);
      }
      guidStr += sexadecimalDate;
      guidStr += sexadecimalTime;
      while (guidStr.length < 32) {
        guidStr += Math.floor(Math.random() * 16).toString(16);
      }
      return this.formatGUID(guidStr);
    };
    /* * 功能：获取当前日期的GUID格式，即8位数的日期：19700101 * 返回值：返回GUID日期格式的字条串 */
    GUID.prototype.getGUIDDate = function() {
      return (
        this.date.getFullYear() +
        this.addZero(this.date.getMonth() + 1) +
        this.addZero(this.date.getDay())
      );
    };
    /* * 功能：获取当前时间的GUID格式，即8位数的时间，包括毫秒，毫秒为2位数：12300933 * 返回值：返回GUID日期格式的字条串 */
    GUID.prototype.getGUIDTime = function() {
      return (
        this.addZero(this.date.getHours()) +
        this.addZero(this.date.getMinutes()) +
        this.addZero(this.date.getSeconds()) +
        this.addZero(parseInt(this.date.getMilliseconds() / 10))
      );
    };
    /* * 功能: 为一位数的正整数前面添加0，如果是可以转成非NaN数字的字符串也可以实现 * 参数: 参数表示准备再前面添加0的数字或可以转换成数字的字符串 * 返回值: 如果符合条件，返回添加0后的字条串类型，否则返回自身的字符串 */
    GUID.prototype.addZero = function(num) {
      if (Number(num).toString() != "NaN" && num >= 0 && num < 10) {
        return "0" + Math.floor(num);
      } else {
        return num.toString();
      }
    };
    /*  * 功能：将y进制的数值，转换为x进制的数值 * 参数：第1个参数表示欲转换的数值；第2个参数表示欲转换的进制；第3个参数可选，表示当前的进制数，如不写则为10 * 返回值：返回转换后的字符串 */ GUID.prototype.hexadecimal = function(
      num,
      x,
      y
    ) {
      if (y != undefined) {
        return parseInt(num.toString(), y).toString(x);
      } else {
        return parseInt(num.toString()).toString(x);
      }
    };
    /* * 功能：格式化32位的字符串为GUID模式的字符串 * 参数：第1个参数表示32位的字符串 * 返回值：标准GUID格式的字符串 */
    GUID.prototype.formatGUID = function(guidStr) {
      var str1 = guidStr.slice(0, 8) + "-",
        str2 = guidStr.slice(8, 12) + "-",
        str3 = guidStr.slice(12, 16) + "-",
        str4 = guidStr.slice(16, 20) + "-",
        str5 = guidStr.slice(20);
      return str1 + str2 + str3 + str4 + str5;
    };
  }
}
window.GUID = GUID;

Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
