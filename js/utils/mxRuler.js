// window.uiTheme = 'dark';

function mxRuler(a, c, d, b) {
  function g() {
    var b = a.diagramContainer;
    q.style.top = b.offsetTop - k + "px";
    q.style.left = b.offsetLeft - k + "px";
    q.style.width = (d ? 0 : b.offsetWidth) + k + "px";
    q.style.height = (d ? b.offsetHeight : 0) + k + "px"
  }

  function f(a, b, c) {
    var d;
    return function () {
      var e = this
        , f = arguments
        , g = c && !d;
      clearTimeout(d);
      d = setTimeout(function () {
        d = null;
        c || a.apply(e, f)
      }, b);
      g && a.apply(e, f)
    }
  }

  var k = this.RULER_THICKNESS
    , l = this;
  this.unit = c;
  var n = "dark" != window.uiTheme ? {
    bkgClr: "#ffffff",
    outBkgClr: "#e8e9ed",
    cornerClr: "#fbfbfb",
    strokeClr: "rgba(66,66,161,0.57)",
    fontClr: "#222",
    guideClr: "#0000BB"
  } : {
    bkgClr: "#202020",
    outBkgClr: "#2a2a2a",
    cornerClr: "#2a2a2a",
    strokeClr: "#505759",
    fontClr: "#BBBBBB",
    guideClr: "#0088cf"
  }
    , q = document.createElement("div");
  q.style.position = "absolute";
  q.style.background = n.bkgClr;
  q.style[d ? "borderRight" : "borderBottom"] = "0.5px solid " + n.strokeClr;
  q.style.borderLeft = "0.5px solid " + n.strokeClr;
  document.body.appendChild(q);
  mxEvent.disableContextMenu(q);
  this.editorUiRefresh = a.refresh;
  a.refresh = function (b) {
    l.editorUiRefresh.apply(a, arguments);
    g()
  }
  ;
  g();
  var e = document.createElement("canvas");
  e.width = q.offsetWidth;
  e.height = q.offsetHeight;
  q.style.overflow = "hidden";
  e.style.position = "relative";
  q.appendChild(e);
  var m = e.getContext("2d");
  this.ui = a;
  var p = a.editor.graph;
  this.graph = p;
  this.container = q;
  this.canvas = e;
  var u = function (a, b, c, e, f) {
    a = Math.round(a);
    b = Math.round(b);
    c = Math.round(c);
    e = Math.round(e);
    m.beginPath();
    m.moveTo(a + .5, b + .5);
    m.lineTo(c + .5, e + .5);
    m.stroke();
    f && (d ? (m.save(),
      m.translate(a, b),
      m.rotate(-Math.PI / 2),
      m.fillText(f, 0, 0),
      m.restore()) : m.fillText(f, a, b))
  }
    , v = function () {
    m.clearRect(0, 0, e.width, e.height);
    m.beginPath();
    m.lineWidth = .7;
    m.strokeStyle = n.strokeClr;
    m.setLineDash([]);
    m.font = "10px Arial";
    m.textAlign = "center";
    var a = p.view.scale
      , b = p.view.getBackgroundPageBounds()
      , c = p.view.translate
      , f = p.view.getGraphBounds()
      , g = p.pageVisible
      ,
      q = g ? k + (d ? b.y - p.container.scrollTop : b.x - p.container.scrollLeft) : k + (d ? c.y - p.container.scrollTop : c.x - p.container.scrollLeft)
      , v = 0;
    g && (v = d ? Math.floor(((f.y + 1) / a - c.y) / p.pageFormat.height) * p.pageFormat.height * a : Math.floor(((f.x + 1) / a - c.x) / p.pageFormat.width) * p.pageFormat.width * a);
    var D, A, E;
    switch (l.unit) {
      case mxConstants.POINTS:
        D = E = 10;
        A = [3, 5, 5, 5, 5, 10, 5, 5, 5, 5];
        break;
      case mxConstants.MILLIMETERS:
        E = 10;
        D = mxConstants.PIXELS_PER_MM;
        A = [5, 3, 3, 3, 3, 6, 3, 3, 3, 3];
        break;
      case mxConstants.SANTIMETERS: //TODO
        E = 10
        D = mxConstants.PIXELS_PER_SM;
        A = [5, 3, 3, 3, 3, 6, 3, 3, 3, 3];
        break;
      case mxConstants.METERS: //TODO
        E = 100;
        D = mxConstants.PIXELS_PER_M;
        A = [5, 3, 3, 3, 3, 6, 3, 3, 3, 3];
        break;
      case mxConstants.INCHES:
        E = .5 >= a || 4 <= a ? 8 : 16,
          D = mxConstants.PIXELS_PER_INCH / E,
          A = [5, 3, 5, 3, 7, 3, 5, 3, 7, 3, 5, 3, 7, 3, 5, 3]
    }
    c = D;
    2 <= a ? c = D / (2 * Math.floor(a / 2)) : .5 >= a && (c = D * Math.floor(1 / a / 2) * (l.unit == mxConstants.SANTIMETERS ? 1 : (l.unit == mxConstants.MILLIMETERS ? 2 : 1)));
    D = null;
    b = g ? Math.min(q + (d ? b.height : b.width), d ? e.height : e.width) : d ? e.height : e.width;
    g && (m.fillStyle = n.outBkgClr,
      d ? (m.fillRect(0, k, k, q - k),
        m.fillRect(0, b, k, e.height)) : (m.fillRect(k, 0, q - k, k),
        m.fillRect(b, 0, e.width, k)));
    m.fillStyle = n.fontClr;
    for (g = g ? q : q % (c * a); g <= b; g += c * a)
      if (f = Math.round((g - q) / a / c),
        !(g < k || f == D)) {
        D = f;
        var I = null;
        0 == f % E && (I = l.formatText(v + f * c) + "");
        d ? u(k - A[Math.abs(f) % E], g, k, g, I) : u(g, k - A[Math.abs(f) % E], g, k, I)
      }
    m.lineWidth = 1;
    u(d ? 0 : k, d ? k : 0, k, k);
    m.fillStyle = n.cornerClr;
    m.fillRect(0, 0, k, k)
  };
  this.drawRuler = v;
  this.sizeListener = c = f(function () {
    var a = p.container;
    d ? (a = a.offsetHeight + k,
    e.height != a && (e.height = a,
      q.style.height = a + "px",
      v())) : (a = a.offsetWidth + k,
    e.width != a && (e.width = a,
      q.style.width = a + "px",
      v()))
  }, 10);
  this.pageListener = function () {
    v()
  }
  ;
  this.scrollListener = b = f(function () {
    var a = d ? p.container.scrollTop : p.container.scrollLeft;
    l.lastScroll != a && (l.lastScroll = a,
      v())
  }, 10);
  this.unitListener = function (a, b) {
    l.setUnit(b.getProperty("unit"))
  }
  ;
  p.addListener(mxEvent.SIZE, c);
  p.container.addEventListener("scroll", b);
  p.view.addListener("unitChanged", this.unitListener);
  a.addListener("pageViewChanged", this.pageListener);
  a.addListener("pageScaleChanged", this.pageListener);
  a.addListener("pageFormatChanged", this.pageListener);
  this.setStyle = function (a) {
    n = a;
    q.style.background = n.bkgClr;
    v()
  }
  ;
  this.origGuideMove = mxGuide.prototype.move;
  mxGuide.prototype.move = function (a, b, c, e) {
    var f;
    if (d && 4 < a.height || !d && 4 < a.width) {
      if (null != l.guidePart)
        try {
          m.putImageData(l.guidePart.imgData1, l.guidePart.x1, l.guidePart.y1),
            m.putImageData(l.guidePart.imgData2, l.guidePart.x2, l.guidePart.y2),
            m.putImageData(l.guidePart.imgData3, l.guidePart.x3, l.guidePart.y3)
        } catch (K) {
        }
      f = l.origGuideMove.apply(this, arguments);
      try {
        var g, p, q, t, v, x, z, B, F;
        m.lineWidth = 1;
        m.strokeStyle = n.guideClr;
        d ? (p = a.y + f.y + k - this.graph.container.scrollTop,
          g = 0,
          v = p + a.height / 2,
          t = k / 2,
          B = p + a.height,
          z = 0,
          q = m.getImageData(g, p - 1, k, 3),
          u(g, p, k, p),
          p--,
          x = m.getImageData(t, v - 1, k, 3),
          u(t, v, k, v),
          v--,
          F = m.getImageData(z, B - 1, k, 3),
          u(z, B, k, B),
          B--) : (p = 0,
          g = a.x + f.x + k - this.graph.container.scrollLeft,
          v = k / 2,
          t = g + a.width / 2,
          B = 0,
          z = g + a.width,
          q = m.getImageData(g - 1, p, 3, k),
          u(g, p, g, k),
          g--,
          x = m.getImageData(t - 1, v, 3, k),
          u(t, v, t, k),
          t--,
          F = m.getImageData(z - 1, B, 3, k),
          u(z, B, z, k),
          z--);
        if (null == l.guidePart || l.guidePart.x1 != g || l.guidePart.y1 != p)
          l.guidePart = {
            imgData1: q,
            x1: g,
            y1: p,
            imgData2: x,
            x2: t,
            y2: v,
            imgData3: F,
            x3: z,
            y3: B
          }
      } catch (K) {
      }
    } else
      f = l.origGuideMove.apply(this, arguments);
    return f
  }
  ;
  this.origGuideDestroy = mxGuide.prototype.destroy;
  mxGuide.prototype.destroy = function () {
    var a = l.origGuideDestroy.apply(this, arguments);
    if (null != l.guidePart)
      try {
        m.putImageData(l.guidePart.imgData1, l.guidePart.x1, l.guidePart.y1),
          m.putImageData(l.guidePart.imgData2, l.guidePart.x2, l.guidePart.y2),
          m.putImageData(l.guidePart.imgData3, l.guidePart.x3, l.guidePart.y3),
          l.guidePart = null
      } catch (z) {
      }
    return a
  }
}
mxRuler.prototype.RULER_THICKNESS = 14;
mxRuler.prototype.unit = mxConstants.POINTS;
mxRuler.prototype.setUnit = function (a) {
  this.unit = a;
  this.drawRuler()
};
mxRuler.prototype.formatText = function (a) {
  switch (this.unit) {
    case mxConstants.POINTS:
      return Math.round(a);
    case mxConstants.MILLIMETERS:
      return (a / mxConstants.PIXELS_PER_MM).toFixed(1);
    case mxConstants.SANTIMETERS:
      return (a / mxConstants.PIXELS_PER_SM).toFixed(2);
    case mxConstants.METERS:
      return (a / mxConstants.PIXELS_PER_M).toFixed(2);
    case mxConstants.INCHES:
      return (a / mxConstants.PIXELS_PER_INCH).toFixed(2)
  }
};
mxRuler.prototype.destroy = function () {
  this.ui.refresh = this.editorUiRefresh;
  mxGuide.prototype.move = this.origGuideMove;
  mxGuide.prototype.destroy = this.origGuideDestroy;
  this.graph.removeListener(this.sizeListener);
  this.graph.container.removeEventListener("scroll", this.scrollListener);
  this.graph.view.removeListener("unitChanged", this.unitListener);
  this.ui.removeListener("pageViewChanged", this.pageListener);
  this.ui.removeListener("pageScaleChanged", this.pageListener);
  this.ui.removeListener("pageFormatChanged", this.pageListener);
  null != this.container && this.container.parentNode.removeChild(this.container)
};

function mxDualRuler(a, c) {
  var d = new mxPoint(mxRuler.prototype.RULER_THICKNESS, mxRuler.prototype.RULER_THICKNESS);
  this.editorUiGetDiagContOffset = a.getDiagramContainerOffset;
  a.getDiagramContainerOffset = function () {
    return d
  }
  ;
  this.editorUiRefresh = a.refresh;
  this.ui = a;
  this.origGuideMove = mxGuide.prototype.move;
  this.origGuideDestroy = mxGuide.prototype.destroy;
  this.vRuler = new mxRuler(a, c, !0);
  this.hRuler = new mxRuler(a, c, !1, !0);
  var b = mxUtils.bind(this, function (b) {
    var c = !1;
    mxEvent.addGestureListeners(b, mxUtils.bind(this, function (b) {
      c = null != a.currentMenu;
      mxEvent.consume(b)
    }), null, mxUtils.bind(this, function (d) {
      if (a.editor.graph.isEnabled() && !a.editor.graph.isMouseDown && (mxEvent.isTouchEvent(d) || mxEvent.isPopupTrigger(d))) {
        a.editor.graph.popupMenuHandler.hideMenu();
        a.hideCurrentMenu();
        if (!mxEvent.isTouchEvent(d) || !c) {
          var f = new mxPopupMenu(mxUtils.bind(this, function (b, c) {
            a.menus.addMenuItems(b, ["points", "millimeters"], c)
          }));
          f.div.className += " geMenubarMenu";
          f.smartSeparators = !0;
          f.showDisabled = !0;
          f.autoExpand = !0;
          f.hideMenu = mxUtils.bind(this, function () {
            mxPopupMenu.prototype.hideMenu.apply(f, arguments);
            a.resetCurrentMenu();
            f.destroy()
          });
          var g = mxEvent.getClientX(d)
            , k = mxEvent.getClientY(d);
          f.popup(g, k, null, d);
          a.setCurrentMenu(f, b)
        }
        mxEvent.consume(d)
      }
    }))
  });
  b(this.hRuler.container);
  b(this.vRuler.container);
  this.vRuler.drawRuler();
  this.hRuler.drawRuler()
}

mxDualRuler.prototype.setUnit = function (a) {
  this.vRuler.setUnit(a);
  this.hRuler.setUnit(a)
}
;
mxDualRuler.prototype.setStyle = function (a) {
  this.vRuler.setStyle(a);
  this.hRuler.setStyle(a)
}
;
mxDualRuler.prototype.destroy = function () {
  this.vRuler.destroy();
  this.hRuler.destroy();
  this.ui.refresh = this.editorUiRefresh;
  mxGuide.prototype.move = this.origGuideMove;
  mxGuide.prototype.destroy = this.origGuideDestroy;
  this.ui.getDiagramContainerOffset = this.editorUiGetDiagContOffset
};
