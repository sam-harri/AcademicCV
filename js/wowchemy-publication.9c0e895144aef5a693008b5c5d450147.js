var a = {},
  s, r, l = $("#container-publications");
if (l.length) {
  l.isotope({
    itemSelector: ".isotope-item",
    percentPosition: !0,
    masonry: {
      columnWidth: ".grid-sizer"
    },
    filter: function () {
      let t = $(this),
        e = s ? t.text().match(s) : !0,
        o = r ? t.is(r) : !0;
      return e && o
    }
  });
  let i = $(".filter-search").keyup(p(function () {
    s = new RegExp(i.val(), "gi"), l.isotope()
  }));
  $(".pub-filters").on("change", function () {
    let e = $(this)[0].getAttribute("data-filter-group");
    if (a[e] = this.value, r = f(a), l.isotope(), e === "pubtype") {
      let o = $(this).val();
      o.substr(0, 9) === ".pubtype-" ? window.location.hash = o.substr(9) : window.location.hash = ""
    }
  })
}

function p(i, t) {
  let e;
  return t = t || 100,
    function () {
      clearTimeout(e);
      let u = arguments,
        n = this;

      function c() {
        i.apply(n, u)
      }
      e = setTimeout(c, t)
    }
}

function f(i) {
  let t = "";
  for (let e in i) t += i[e];
  return t
}

function d() {
  if (!l.length) return;
  let i = window.location.hash.replace("#", ""),
    t = "*";
  i != "" && (t = ".pubtype-" + i);
  let e = "pubtype";
  a[e] = t, r = f(a), l.isotope(), $(".pubtype-select").val(t)
}
document.addEventListener("DOMContentLoaded", function () {
  $(".pub-filters-select") && d(), $(".js-cite-modal").click(function (i) {
    i.preventDefault();
    let t = $(this).attr("data-filename"),
      e = $("#modal");
    e.find(".modal-body code").load(t, function (o, u, n) {
      u == "error" ? $("#modal-error").html("Error: " + n.status + " " + n.statusText) : $(".js-download-cite").attr("href", t)
    }), e.modal("show")
  }), $(".js-copy-cite").click(function (i) {
    i.preventDefault();
    let t = document.querySelector("#modal .modal-body code").innerHTML;
    navigator.clipboard.writeText(t).then(function () {
      console.debug("Citation copied!")
    }).catch(function () {
      console.error("Citation copy failed!")
    })
  })
});
