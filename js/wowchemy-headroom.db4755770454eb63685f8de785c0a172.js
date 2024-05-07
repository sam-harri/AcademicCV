var B = Object.create;
var T = Object.defineProperty;
var E = Object.getOwnPropertyDescriptor;
var L = Object.getOwnPropertyNames;
var z = Object.getPrototypeOf,
  M = Object.prototype.hasOwnProperty;
var Y = (n, o) => () => (o || n((o = {
  exports: {}
}).exports, o), o.exports);
var j = (n, o, l, u) => {
  if (o && typeof o == "object" || typeof o == "function")
    for (let s of L(o)) !M.call(n, s) && s !== l && T(n, s, {
      get: () => o[s],
      enumerable: !(u = E(o, s)) || u.enumerable
    });
  return n
};
var x = (n, o, l) => (l = n != null ? B(z(n)) : {}, j(o || !n || !n.__esModule ? T(l, "default", {
  value: n,
  enumerable: !0
}) : l, n));
var O = Y((C, v) => {
  (function (n, o) {
    typeof C == "object" && typeof v < "u" ? v.exports = o() : typeof define == "function" && define.amd ? define(o) : (n = n || self).Headroom = o()
  })(C, function () {
    "use strict";

    function n() {
      return typeof window < "u"
    }

    function o(t) {
      return function (e) {
        return e && e.document && function (d) {
          return d.nodeType === 9
        }(e.document)
      }(t) ? function (e) {
        var d = e.document,
          a = d.body,
          c = d.documentElement;
        return {
          scrollHeight: function () {
            return Math.max(a.scrollHeight, c.scrollHeight, a.offsetHeight, c.offsetHeight, a.clientHeight, c.clientHeight)
          },
          height: function () {
            return e.innerHeight || c.clientHeight || a.clientHeight
          },
          scrollY: function () {
            return e.pageYOffset !== void 0 ? e.pageYOffset : (c || a.parentNode || a).scrollTop
          }
        }
      }(t) : function (e) {
        return {
          scrollHeight: function () {
            return Math.max(e.scrollHeight, e.offsetHeight, e.clientHeight)
          },
          height: function () {
            return Math.max(e.offsetHeight, e.clientHeight)
          },
          scrollY: function () {
            return e.scrollTop
          }
        }
      }(t)
    }

    function l(t, e, d) {
      var a, c = function () {
          var r = !1;
          try {
            var h = {
              get passive() {
                r = !0
              }
            };
            window.addEventListener("test", h, h), window.removeEventListener("test", h, h)
          } catch {
            r = !1
          }
          return r
        }(),
        p = !1,
        f = o(t),
        m = f.scrollY(),
        i = {};

      function b() {
        var r = Math.round(f.scrollY()),
          h = f.height(),
          g = f.scrollHeight();
        i.scrollY = r, i.lastScrollY = m, i.direction = m < r ? "down" : "up", i.distance = Math.abs(r - m), i.isOutOfBounds = r < 0 || g < r + h, i.top = r <= e.offset[i.direction], i.bottom = g <= r + h, i.toleranceExceeded = i.distance > e.tolerance[i.direction], d(i), m = r, p = !1
      }

      function H() {
        p || (p = !0, a = requestAnimationFrame(b))
      }
      var y = !!c && {
        passive: !0,
        capture: !1
      };
      return t.addEventListener("scroll", H, y), b(), {
        destroy: function () {
          cancelAnimationFrame(a), t.removeEventListener("scroll", H, y)
        }
      }
    }

    function u(t) {
      return t === Object(t) ? t : {
        down: t,
        up: t
      }
    }

    function s(t, e) {
      e = e || {}, Object.assign(this, s.options, e), this.classes = Object.assign({}, s.options.classes, e.classes), this.elem = t, this.tolerance = u(this.tolerance), this.offset = u(this.offset), this.initialised = !1, this.frozen = !1
    }
    return s.prototype = {
      constructor: s,
      init: function () {
        return s.cutsTheMustard && !this.initialised && (this.addClass("initial"), this.initialised = !0, setTimeout(function (t) {
          t.scrollTracker = l(t.scroller, {
            offset: t.offset,
            tolerance: t.tolerance
          }, t.update.bind(t))
        }, 100, this)), this
      },
      destroy: function () {
        this.initialised = !1, Object.keys(this.classes).forEach(this.removeClass, this), this.scrollTracker.destroy()
      },
      unpin: function () {
        !this.hasClass("pinned") && this.hasClass("unpinned") || (this.addClass("unpinned"), this.removeClass("pinned"), this.onUnpin && this.onUnpin.call(this))
      },
      pin: function () {
        this.hasClass("unpinned") && (this.addClass("pinned"), this.removeClass("unpinned"), this.onPin && this.onPin.call(this))
      },
      freeze: function () {
        this.frozen = !0, this.addClass("frozen")
      },
      unfreeze: function () {
        this.frozen = !1, this.removeClass("frozen")
      },
      top: function () {
        this.hasClass("top") || (this.addClass("top"), this.removeClass("notTop"), this.onTop && this.onTop.call(this))
      },
      notTop: function () {
        this.hasClass("notTop") || (this.addClass("notTop"), this.removeClass("top"), this.onNotTop && this.onNotTop.call(this))
      },
      bottom: function () {
        this.hasClass("bottom") || (this.addClass("bottom"), this.removeClass("notBottom"), this.onBottom && this.onBottom.call(this))
      },
      notBottom: function () {
        this.hasClass("notBottom") || (this.addClass("notBottom"), this.removeClass("bottom"), this.onNotBottom && this.onNotBottom.call(this))
      },
      shouldUnpin: function (t) {
        return t.direction === "down" && !t.top && t.toleranceExceeded
      },
      shouldPin: function (t) {
        return t.direction === "up" && t.toleranceExceeded || t.top
      },
      addClass: function (t) {
        this.elem.classList.add.apply(this.elem.classList, this.classes[t].split(" "))
      },
      removeClass: function (t) {
        this.elem.classList.remove.apply(this.elem.classList, this.classes[t].split(" "))
      },
      hasClass: function (t) {
        return this.classes[t].split(" ").every(function (e) {
          return this.classList.contains(e)
        }, this.elem)
      },
      update: function (t) {
        t.isOutOfBounds || this.frozen !== !0 && (t.top ? this.top() : this.notTop(), t.bottom ? this.bottom() : this.notBottom(), this.shouldUnpin(t) ? this.unpin() : this.shouldPin(t) && this.pin())
      }
    }, s.options = {
      tolerance: {
        up: 0,
        down: 0
      },
      offset: 0,
      scroller: n() ? window : null,
      classes: {
        frozen: "headroom--frozen",
        pinned: "headroom--pinned",
        unpinned: "headroom--unpinned",
        top: "headroom--top",
        notTop: "headroom--not-top",
        bottom: "headroom--bottom",
        notBottom: "headroom--not-bottom",
        initial: "headroom"
      }
    }, s.cutsTheMustard = !!(n() && function () {}.bind && "classList" in document.documentElement && Object.assign && Object.keys && requestAnimationFrame), s
  })
});
var w = x(O());
document.addEventListener("DOMContentLoaded", function () {
  let n = JSON.parse(document.getElementById("page-data").textContent);
  console.debug(`Use headroom on this page? ${n.use_headroom}`);
  let o = document.querySelector(".page-header");
  o && n.use_headroom === !0 && new w.default(o).init()
});
/*!
 * headroom.js v0.12.0 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2020 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */
