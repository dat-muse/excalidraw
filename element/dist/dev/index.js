var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// <define:import.meta.env>
var define_import_meta_env_default;
var init_define_import_meta_env = __esm({
  "<define:import.meta.env>"() {
    define_import_meta_env_default = { DEV: true };
  }
});

// ../../node_modules/lodash.throttle/index.js
var require_lodash = __commonJS({
  "../../node_modules/lodash.throttle/index.js"(exports, module) {
    init_define_import_meta_env();
    var FUNC_ERROR_TEXT = "Expected a function";
    var NAN = 0 / 0;
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    var nativeMax = Math.max;
    var nativeMin = Math.min;
    var now = function() {
      return root.Date.now();
    };
    function debounce(func, wait, options) {
      var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = "maxWait" in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = void 0;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }
      function leadingEdge(time) {
        lastInvokeTime = time;
        timerId = setTimeout(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
      }
      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result2 = wait - timeSinceLastCall;
        return maxing ? nativeMin(result2, maxWait - timeSinceLastInvoke) : result2;
      }
      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
      }
      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        timerId = setTimeout(timerExpired, remainingWait(time));
      }
      function trailingEdge(time) {
        timerId = void 0;
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = void 0;
        return result;
      }
      function cancel() {
        if (timerId !== void 0) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = void 0;
      }
      function flush() {
        return timerId === void 0 ? result : trailingEdge(now());
      }
      function debounced() {
        var time = now(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
          if (timerId === void 0) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === void 0) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }
    function throttle2(func, wait, options) {
      var leading = true, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      if (isObject(options)) {
        leading = "leading" in options ? !!options.leading : leading;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      return debounce(func, wait, {
        "leading": leading,
        "maxWait": wait,
        "trailing": trailing
      });
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module.exports = throttle2;
  }
});

// src/index.ts
init_define_import_meta_env();
import { toIterable as toIterable2 } from "@excalidraw/common";

// src/sizeHelpers.ts
init_define_import_meta_env();
import {
  SHIFT_LOCKING_ANGLE,
  viewportCoordsToSceneCoords as viewportCoordsToSceneCoords2
} from "@excalidraw/common";
import {
  normalizeRadians,
  radiansBetweenAngles,
  radiansDifference
} from "@excalidraw/math";
import { pointsEqual as pointsEqual7 } from "@excalidraw/math";

// src/bounds.ts
init_define_import_meta_env();

// ../../node_modules/roughjs/bin/rough.js
init_define_import_meta_env();

// ../../node_modules/roughjs/bin/canvas.js
init_define_import_meta_env();

// ../../node_modules/roughjs/bin/generator.js
init_define_import_meta_env();

// ../../node_modules/roughjs/bin/renderer.js
init_define_import_meta_env();

// ../../node_modules/roughjs/bin/fillers/filler.js
init_define_import_meta_env();

// ../../node_modules/roughjs/bin/fillers/hachure-filler.js
init_define_import_meta_env();

// ../../node_modules/roughjs/bin/fillers/scan-line-hachure.js
init_define_import_meta_env();

// ../../node_modules/hachure-fill/bin/hachure.js
init_define_import_meta_env();
function rotatePoints(points, center, degrees) {
  if (points && points.length) {
    const [cx, cy] = center;
    const angle = Math.PI / 180 * degrees;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    for (const p of points) {
      const [x, y] = p;
      p[0] = (x - cx) * cos - (y - cy) * sin + cx;
      p[1] = (x - cx) * sin + (y - cy) * cos + cy;
    }
  }
}
function rotateLines(lines, center, degrees) {
  const points = [];
  lines.forEach((line2) => points.push(...line2));
  rotatePoints(points, center, degrees);
}
function areSamePoints(p1, p2) {
  return p1[0] === p2[0] && p1[1] === p2[1];
}
function hachureLines(polygons, hachureGap, hachureAngle, hachureStepOffset = 1) {
  const angle = hachureAngle;
  const gap = Math.max(hachureGap, 0.1);
  const polygonList = polygons[0] && polygons[0][0] && typeof polygons[0][0] === "number" ? [polygons] : polygons;
  const rotationCenter = [0, 0];
  if (angle) {
    for (const polygon3 of polygonList) {
      rotatePoints(polygon3, rotationCenter, angle);
    }
  }
  const lines = straightHachureLines(polygonList, gap, hachureStepOffset);
  if (angle) {
    for (const polygon3 of polygonList) {
      rotatePoints(polygon3, rotationCenter, -angle);
    }
    rotateLines(lines, rotationCenter, -angle);
  }
  return lines;
}
function straightHachureLines(polygons, gap, hachureStepOffset) {
  const vertexArray = [];
  for (const polygon3 of polygons) {
    const vertices = [...polygon3];
    if (!areSamePoints(vertices[0], vertices[vertices.length - 1])) {
      vertices.push([vertices[0][0], vertices[0][1]]);
    }
    if (vertices.length > 2) {
      vertexArray.push(vertices);
    }
  }
  const lines = [];
  gap = Math.max(gap, 0.1);
  const edges = [];
  for (const vertices of vertexArray) {
    for (let i = 0; i < vertices.length - 1; i++) {
      const p1 = vertices[i];
      const p2 = vertices[i + 1];
      if (p1[1] !== p2[1]) {
        const ymin = Math.min(p1[1], p2[1]);
        edges.push({
          ymin,
          ymax: Math.max(p1[1], p2[1]),
          x: ymin === p1[1] ? p1[0] : p2[0],
          islope: (p2[0] - p1[0]) / (p2[1] - p1[1])
        });
      }
    }
  }
  edges.sort((e1, e2) => {
    if (e1.ymin < e2.ymin) {
      return -1;
    }
    if (e1.ymin > e2.ymin) {
      return 1;
    }
    if (e1.x < e2.x) {
      return -1;
    }
    if (e1.x > e2.x) {
      return 1;
    }
    if (e1.ymax === e2.ymax) {
      return 0;
    }
    return (e1.ymax - e2.ymax) / Math.abs(e1.ymax - e2.ymax);
  });
  if (!edges.length) {
    return lines;
  }
  let activeEdges = [];
  let y = edges[0].ymin;
  let iteration = 0;
  while (activeEdges.length || edges.length) {
    if (edges.length) {
      let ix = -1;
      for (let i = 0; i < edges.length; i++) {
        if (edges[i].ymin > y) {
          break;
        }
        ix = i;
      }
      const removed = edges.splice(0, ix + 1);
      removed.forEach((edge) => {
        activeEdges.push({ s: y, edge });
      });
    }
    activeEdges = activeEdges.filter((ae2) => {
      if (ae2.edge.ymax <= y) {
        return false;
      }
      return true;
    });
    activeEdges.sort((ae1, ae2) => {
      if (ae1.edge.x === ae2.edge.x) {
        return 0;
      }
      return (ae1.edge.x - ae2.edge.x) / Math.abs(ae1.edge.x - ae2.edge.x);
    });
    if (hachureStepOffset !== 1 || iteration % gap === 0) {
      if (activeEdges.length > 1) {
        for (let i = 0; i < activeEdges.length; i = i + 2) {
          const nexti = i + 1;
          if (nexti >= activeEdges.length) {
            break;
          }
          const ce2 = activeEdges[i].edge;
          const ne = activeEdges[nexti].edge;
          lines.push([
            [Math.round(ce2.x), y],
            [Math.round(ne.x), y]
          ]);
        }
      }
    }
    y += hachureStepOffset;
    activeEdges.forEach((ae2) => {
      ae2.edge.x = ae2.edge.x + hachureStepOffset * ae2.edge.islope;
    });
    iteration++;
  }
  return lines;
}

// ../../node_modules/roughjs/bin/fillers/scan-line-hachure.js
function polygonHachureLines(polygonList, o) {
  var _a;
  const angle = o.hachureAngle + 90;
  let gap = o.hachureGap;
  if (gap < 0) {
    gap = o.strokeWidth * 4;
  }
  gap = Math.max(gap, 0.1);
  let skipOffset = 1;
  if (o.roughness >= 1) {
    if ((((_a = o.randomizer) === null || _a === void 0 ? void 0 : _a.next()) || Math.random()) > 0.7) {
      skipOffset = gap;
    }
  }
  return hachureLines(polygonList, gap, angle, skipOffset || 1);
}

// ../../node_modules/roughjs/bin/fillers/hachure-filler.js
var HachureFiller = class {
  constructor(helper2) {
    this.helper = helper2;
  }
  fillPolygons(polygonList, o) {
    return this._fillPolygons(polygonList, o);
  }
  _fillPolygons(polygonList, o) {
    const lines = polygonHachureLines(polygonList, o);
    const ops = this.renderLines(lines, o);
    return { type: "fillSketch", ops };
  }
  renderLines(lines, o) {
    const ops = [];
    for (const line2 of lines) {
      ops.push(...this.helper.doubleLineOps(line2[0][0], line2[0][1], line2[1][0], line2[1][1], o));
    }
    return ops;
  }
};

// ../../node_modules/roughjs/bin/fillers/zigzag-filler.js
init_define_import_meta_env();

// ../../node_modules/roughjs/bin/geometry.js
init_define_import_meta_env();
function lineLength(line2) {
  const p1 = line2[0];
  const p2 = line2[1];
  return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
}

// ../../node_modules/roughjs/bin/fillers/zigzag-filler.js
var ZigZagFiller = class extends HachureFiller {
  fillPolygons(polygonList, o) {
    let gap = o.hachureGap;
    if (gap < 0) {
      gap = o.strokeWidth * 4;
    }
    gap = Math.max(gap, 0.1);
    const o2 = Object.assign({}, o, { hachureGap: gap });
    const lines = polygonHachureLines(polygonList, o2);
    const zigZagAngle = Math.PI / 180 * o.hachureAngle;
    const zigzagLines = [];
    const dgx = gap * 0.5 * Math.cos(zigZagAngle);
    const dgy = gap * 0.5 * Math.sin(zigZagAngle);
    for (const [p1, p2] of lines) {
      if (lineLength([p1, p2])) {
        zigzagLines.push([
          [p1[0] - dgx, p1[1] + dgy],
          [...p2]
        ], [
          [p1[0] + dgx, p1[1] - dgy],
          [...p2]
        ]);
      }
    }
    const ops = this.renderLines(zigzagLines, o);
    return { type: "fillSketch", ops };
  }
};

// ../../node_modules/roughjs/bin/fillers/hatch-filler.js
init_define_import_meta_env();
var HatchFiller = class extends HachureFiller {
  fillPolygons(polygonList, o) {
    const set = this._fillPolygons(polygonList, o);
    const o2 = Object.assign({}, o, { hachureAngle: o.hachureAngle + 90 });
    const set2 = this._fillPolygons(polygonList, o2);
    set.ops = set.ops.concat(set2.ops);
    return set;
  }
};

// ../../node_modules/roughjs/bin/fillers/dot-filler.js
init_define_import_meta_env();
var DotFiller = class {
  constructor(helper2) {
    this.helper = helper2;
  }
  fillPolygons(polygonList, o) {
    o = Object.assign({}, o, { hachureAngle: 0 });
    const lines = polygonHachureLines(polygonList, o);
    return this.dotsOnLines(lines, o);
  }
  dotsOnLines(lines, o) {
    const ops = [];
    let gap = o.hachureGap;
    if (gap < 0) {
      gap = o.strokeWidth * 4;
    }
    gap = Math.max(gap, 0.1);
    let fweight = o.fillWeight;
    if (fweight < 0) {
      fweight = o.strokeWidth / 2;
    }
    const ro = gap / 4;
    for (const line2 of lines) {
      const length = lineLength(line2);
      const dl = length / gap;
      const count = Math.ceil(dl) - 1;
      const offset = length - count * gap;
      const x = (line2[0][0] + line2[1][0]) / 2 - gap / 4;
      const minY = Math.min(line2[0][1], line2[1][1]);
      for (let i = 0; i < count; i++) {
        const y = minY + offset + i * gap;
        const cx = x - ro + Math.random() * 2 * ro;
        const cy = y - ro + Math.random() * 2 * ro;
        const el = this.helper.ellipse(cx, cy, fweight, fweight, o);
        ops.push(...el.ops);
      }
    }
    return { type: "fillSketch", ops };
  }
};

// ../../node_modules/roughjs/bin/fillers/dashed-filler.js
init_define_import_meta_env();
var DashedFiller = class {
  constructor(helper2) {
    this.helper = helper2;
  }
  fillPolygons(polygonList, o) {
    const lines = polygonHachureLines(polygonList, o);
    return { type: "fillSketch", ops: this.dashedLine(lines, o) };
  }
  dashedLine(lines, o) {
    const offset = o.dashOffset < 0 ? o.hachureGap < 0 ? o.strokeWidth * 4 : o.hachureGap : o.dashOffset;
    const gap = o.dashGap < 0 ? o.hachureGap < 0 ? o.strokeWidth * 4 : o.hachureGap : o.dashGap;
    const ops = [];
    lines.forEach((line2) => {
      const length = lineLength(line2);
      const count = Math.floor(length / (offset + gap));
      const startOffset = (length + gap - count * (offset + gap)) / 2;
      let p1 = line2[0];
      let p2 = line2[1];
      if (p1[0] > p2[0]) {
        p1 = line2[1];
        p2 = line2[0];
      }
      const alpha = Math.atan((p2[1] - p1[1]) / (p2[0] - p1[0]));
      for (let i = 0; i < count; i++) {
        const lstart = i * (offset + gap);
        const lend = lstart + offset;
        const start = [p1[0] + lstart * Math.cos(alpha) + startOffset * Math.cos(alpha), p1[1] + lstart * Math.sin(alpha) + startOffset * Math.sin(alpha)];
        const end = [p1[0] + lend * Math.cos(alpha) + startOffset * Math.cos(alpha), p1[1] + lend * Math.sin(alpha) + startOffset * Math.sin(alpha)];
        ops.push(...this.helper.doubleLineOps(start[0], start[1], end[0], end[1], o));
      }
    });
    return ops;
  }
};

// ../../node_modules/roughjs/bin/fillers/zigzag-line-filler.js
init_define_import_meta_env();
var ZigZagLineFiller = class {
  constructor(helper2) {
    this.helper = helper2;
  }
  fillPolygons(polygonList, o) {
    const gap = o.hachureGap < 0 ? o.strokeWidth * 4 : o.hachureGap;
    const zo = o.zigzagOffset < 0 ? gap : o.zigzagOffset;
    o = Object.assign({}, o, { hachureGap: gap + zo });
    const lines = polygonHachureLines(polygonList, o);
    return { type: "fillSketch", ops: this.zigzagLines(lines, zo, o) };
  }
  zigzagLines(lines, zo, o) {
    const ops = [];
    lines.forEach((line2) => {
      const length = lineLength(line2);
      const count = Math.round(length / (2 * zo));
      let p1 = line2[0];
      let p2 = line2[1];
      if (p1[0] > p2[0]) {
        p1 = line2[1];
        p2 = line2[0];
      }
      const alpha = Math.atan((p2[1] - p1[1]) / (p2[0] - p1[0]));
      for (let i = 0; i < count; i++) {
        const lstart = i * 2 * zo;
        const lend = (i + 1) * 2 * zo;
        const dz = Math.sqrt(2 * Math.pow(zo, 2));
        const start = [p1[0] + lstart * Math.cos(alpha), p1[1] + lstart * Math.sin(alpha)];
        const end = [p1[0] + lend * Math.cos(alpha), p1[1] + lend * Math.sin(alpha)];
        const middle = [start[0] + dz * Math.cos(alpha + Math.PI / 4), start[1] + dz * Math.sin(alpha + Math.PI / 4)];
        ops.push(...this.helper.doubleLineOps(start[0], start[1], middle[0], middle[1], o), ...this.helper.doubleLineOps(middle[0], middle[1], end[0], end[1], o));
      }
    });
    return ops;
  }
};

// ../../node_modules/roughjs/bin/fillers/filler.js
var fillers = {};
function getFiller(o, helper2) {
  let fillerName = o.fillStyle || "hachure";
  if (!fillers[fillerName]) {
    switch (fillerName) {
      case "zigzag":
        if (!fillers[fillerName]) {
          fillers[fillerName] = new ZigZagFiller(helper2);
        }
        break;
      case "cross-hatch":
        if (!fillers[fillerName]) {
          fillers[fillerName] = new HatchFiller(helper2);
        }
        break;
      case "dots":
        if (!fillers[fillerName]) {
          fillers[fillerName] = new DotFiller(helper2);
        }
        break;
      case "dashed":
        if (!fillers[fillerName]) {
          fillers[fillerName] = new DashedFiller(helper2);
        }
        break;
      case "zigzag-line":
        if (!fillers[fillerName]) {
          fillers[fillerName] = new ZigZagLineFiller(helper2);
        }
        break;
      case "hachure":
      default:
        fillerName = "hachure";
        if (!fillers[fillerName]) {
          fillers[fillerName] = new HachureFiller(helper2);
        }
        break;
    }
  }
  return fillers[fillerName];
}

// ../../node_modules/roughjs/bin/math.js
init_define_import_meta_env();
function randomSeed() {
  return Math.floor(Math.random() * 2 ** 31);
}
var Random = class {
  constructor(seed) {
    this.seed = seed;
  }
  next() {
    if (this.seed) {
      return (2 ** 31 - 1 & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31;
    } else {
      return Math.random();
    }
  }
};

// ../../node_modules/path-data-parser/lib/index.js
init_define_import_meta_env();

// ../../node_modules/path-data-parser/lib/parser.js
init_define_import_meta_env();
var COMMAND = 0;
var NUMBER = 1;
var EOD = 2;
var PARAMS = { A: 7, a: 7, C: 6, c: 6, H: 1, h: 1, L: 2, l: 2, M: 2, m: 2, Q: 4, q: 4, S: 4, s: 4, T: 2, t: 2, V: 1, v: 1, Z: 0, z: 0 };
function tokenize(d) {
  const tokens = new Array();
  while (d !== "") {
    if (d.match(/^([ \t\r\n,]+)/)) {
      d = d.substr(RegExp.$1.length);
    } else if (d.match(/^([aAcChHlLmMqQsStTvVzZ])/)) {
      tokens[tokens.length] = { type: COMMAND, text: RegExp.$1 };
      d = d.substr(RegExp.$1.length);
    } else if (d.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)) {
      tokens[tokens.length] = { type: NUMBER, text: `${parseFloat(RegExp.$1)}` };
      d = d.substr(RegExp.$1.length);
    } else {
      return [];
    }
  }
  tokens[tokens.length] = { type: EOD, text: "" };
  return tokens;
}
function isType(token, type) {
  return token.type === type;
}
function parsePath(d) {
  const segments = [];
  const tokens = tokenize(d);
  let mode = "BOD";
  let index = 0;
  let token = tokens[index];
  while (!isType(token, EOD)) {
    let paramsCount = 0;
    const params = [];
    if (mode === "BOD") {
      if (token.text === "M" || token.text === "m") {
        index++;
        paramsCount = PARAMS[token.text];
        mode = token.text;
      } else {
        return parsePath("M0,0" + d);
      }
    } else if (isType(token, NUMBER)) {
      paramsCount = PARAMS[mode];
    } else {
      index++;
      paramsCount = PARAMS[token.text];
      mode = token.text;
    }
    if (index + paramsCount < tokens.length) {
      for (let i = index; i < index + paramsCount; i++) {
        const numbeToken = tokens[i];
        if (isType(numbeToken, NUMBER)) {
          params[params.length] = +numbeToken.text;
        } else {
          throw new Error("Param not a number: " + mode + "," + numbeToken.text);
        }
      }
      if (typeof PARAMS[mode] === "number") {
        const segment = { key: mode, data: params };
        segments.push(segment);
        index += paramsCount;
        token = tokens[index];
        if (mode === "M")
          mode = "L";
        if (mode === "m")
          mode = "l";
      } else {
        throw new Error("Bad segment: " + mode);
      }
    } else {
      throw new Error("Path data ended short");
    }
  }
  return segments;
}

// ../../node_modules/path-data-parser/lib/absolutize.js
init_define_import_meta_env();
function absolutize(segments) {
  let cx = 0, cy = 0;
  let subx = 0, suby = 0;
  const out = [];
  for (const { key, data } of segments) {
    switch (key) {
      case "M":
        out.push({ key: "M", data: [...data] });
        [cx, cy] = data;
        [subx, suby] = data;
        break;
      case "m":
        cx += data[0];
        cy += data[1];
        out.push({ key: "M", data: [cx, cy] });
        subx = cx;
        suby = cy;
        break;
      case "L":
        out.push({ key: "L", data: [...data] });
        [cx, cy] = data;
        break;
      case "l":
        cx += data[0];
        cy += data[1];
        out.push({ key: "L", data: [cx, cy] });
        break;
      case "C":
        out.push({ key: "C", data: [...data] });
        cx = data[4];
        cy = data[5];
        break;
      case "c": {
        const newdata = data.map((d, i) => i % 2 ? d + cy : d + cx);
        out.push({ key: "C", data: newdata });
        cx = newdata[4];
        cy = newdata[5];
        break;
      }
      case "Q":
        out.push({ key: "Q", data: [...data] });
        cx = data[2];
        cy = data[3];
        break;
      case "q": {
        const newdata = data.map((d, i) => i % 2 ? d + cy : d + cx);
        out.push({ key: "Q", data: newdata });
        cx = newdata[2];
        cy = newdata[3];
        break;
      }
      case "A":
        out.push({ key: "A", data: [...data] });
        cx = data[5];
        cy = data[6];
        break;
      case "a":
        cx += data[5];
        cy += data[6];
        out.push({ key: "A", data: [data[0], data[1], data[2], data[3], data[4], cx, cy] });
        break;
      case "H":
        out.push({ key: "H", data: [...data] });
        cx = data[0];
        break;
      case "h":
        cx += data[0];
        out.push({ key: "H", data: [cx] });
        break;
      case "V":
        out.push({ key: "V", data: [...data] });
        cy = data[0];
        break;
      case "v":
        cy += data[0];
        out.push({ key: "V", data: [cy] });
        break;
      case "S":
        out.push({ key: "S", data: [...data] });
        cx = data[2];
        cy = data[3];
        break;
      case "s": {
        const newdata = data.map((d, i) => i % 2 ? d + cy : d + cx);
        out.push({ key: "S", data: newdata });
        cx = newdata[2];
        cy = newdata[3];
        break;
      }
      case "T":
        out.push({ key: "T", data: [...data] });
        cx = data[0];
        cy = data[1];
        break;
      case "t":
        cx += data[0];
        cy += data[1];
        out.push({ key: "T", data: [cx, cy] });
        break;
      case "Z":
      case "z":
        out.push({ key: "Z", data: [] });
        cx = subx;
        cy = suby;
        break;
    }
  }
  return out;
}

// ../../node_modules/path-data-parser/lib/normalize.js
init_define_import_meta_env();
function normalize(segments) {
  const out = [];
  let lastType = "";
  let cx = 0, cy = 0;
  let subx = 0, suby = 0;
  let lcx = 0, lcy = 0;
  for (const { key, data } of segments) {
    switch (key) {
      case "M":
        out.push({ key: "M", data: [...data] });
        [cx, cy] = data;
        [subx, suby] = data;
        break;
      case "C":
        out.push({ key: "C", data: [...data] });
        cx = data[4];
        cy = data[5];
        lcx = data[2];
        lcy = data[3];
        break;
      case "L":
        out.push({ key: "L", data: [...data] });
        [cx, cy] = data;
        break;
      case "H":
        cx = data[0];
        out.push({ key: "L", data: [cx, cy] });
        break;
      case "V":
        cy = data[0];
        out.push({ key: "L", data: [cx, cy] });
        break;
      case "S": {
        let cx1 = 0, cy1 = 0;
        if (lastType === "C" || lastType === "S") {
          cx1 = cx + (cx - lcx);
          cy1 = cy + (cy - lcy);
        } else {
          cx1 = cx;
          cy1 = cy;
        }
        out.push({ key: "C", data: [cx1, cy1, ...data] });
        lcx = data[0];
        lcy = data[1];
        cx = data[2];
        cy = data[3];
        break;
      }
      case "T": {
        const [x, y] = data;
        let x1 = 0, y1 = 0;
        if (lastType === "Q" || lastType === "T") {
          x1 = cx + (cx - lcx);
          y1 = cy + (cy - lcy);
        } else {
          x1 = cx;
          y1 = cy;
        }
        const cx1 = cx + 2 * (x1 - cx) / 3;
        const cy1 = cy + 2 * (y1 - cy) / 3;
        const cx2 = x + 2 * (x1 - x) / 3;
        const cy2 = y + 2 * (y1 - y) / 3;
        out.push({ key: "C", data: [cx1, cy1, cx2, cy2, x, y] });
        lcx = x1;
        lcy = y1;
        cx = x;
        cy = y;
        break;
      }
      case "Q": {
        const [x1, y1, x, y] = data;
        const cx1 = cx + 2 * (x1 - cx) / 3;
        const cy1 = cy + 2 * (y1 - cy) / 3;
        const cx2 = x + 2 * (x1 - x) / 3;
        const cy2 = y + 2 * (y1 - y) / 3;
        out.push({ key: "C", data: [cx1, cy1, cx2, cy2, x, y] });
        lcx = x1;
        lcy = y1;
        cx = x;
        cy = y;
        break;
      }
      case "A": {
        const r1 = Math.abs(data[0]);
        const r2 = Math.abs(data[1]);
        const angle = data[2];
        const largeArcFlag = data[3];
        const sweepFlag = data[4];
        const x = data[5];
        const y = data[6];
        if (r1 === 0 || r2 === 0) {
          out.push({ key: "C", data: [cx, cy, x, y, x, y] });
          cx = x;
          cy = y;
        } else {
          if (cx !== x || cy !== y) {
            const curves = arcToCubicCurves(cx, cy, x, y, r1, r2, angle, largeArcFlag, sweepFlag);
            curves.forEach(function(curve4) {
              out.push({ key: "C", data: curve4 });
            });
            cx = x;
            cy = y;
          }
        }
        break;
      }
      case "Z":
        out.push({ key: "Z", data: [] });
        cx = subx;
        cy = suby;
        break;
    }
    lastType = key;
  }
  return out;
}
function degToRad(degrees) {
  return Math.PI * degrees / 180;
}
function rotate(x, y, angleRad) {
  const X = x * Math.cos(angleRad) - y * Math.sin(angleRad);
  const Y = x * Math.sin(angleRad) + y * Math.cos(angleRad);
  return [X, Y];
}
function arcToCubicCurves(x1, y1, x2, y2, r1, r2, angle, largeArcFlag, sweepFlag, recursive) {
  const angleRad = degToRad(angle);
  let params = [];
  let f1 = 0, f2 = 0, cx = 0, cy = 0;
  if (recursive) {
    [f1, f2, cx, cy] = recursive;
  } else {
    [x1, y1] = rotate(x1, y1, -angleRad);
    [x2, y2] = rotate(x2, y2, -angleRad);
    const x = (x1 - x2) / 2;
    const y = (y1 - y2) / 2;
    let h = x * x / (r1 * r1) + y * y / (r2 * r2);
    if (h > 1) {
      h = Math.sqrt(h);
      r1 = h * r1;
      r2 = h * r2;
    }
    const sign = largeArcFlag === sweepFlag ? -1 : 1;
    const r1Pow = r1 * r1;
    const r2Pow = r2 * r2;
    const left = r1Pow * r2Pow - r1Pow * y * y - r2Pow * x * x;
    const right = r1Pow * y * y + r2Pow * x * x;
    const k = sign * Math.sqrt(Math.abs(left / right));
    cx = k * r1 * y / r2 + (x1 + x2) / 2;
    cy = k * -r2 * x / r1 + (y1 + y2) / 2;
    f1 = Math.asin(parseFloat(((y1 - cy) / r2).toFixed(9)));
    f2 = Math.asin(parseFloat(((y2 - cy) / r2).toFixed(9)));
    if (x1 < cx) {
      f1 = Math.PI - f1;
    }
    if (x2 < cx) {
      f2 = Math.PI - f2;
    }
    if (f1 < 0) {
      f1 = Math.PI * 2 + f1;
    }
    if (f2 < 0) {
      f2 = Math.PI * 2 + f2;
    }
    if (sweepFlag && f1 > f2) {
      f1 = f1 - Math.PI * 2;
    }
    if (!sweepFlag && f2 > f1) {
      f2 = f2 - Math.PI * 2;
    }
  }
  let df = f2 - f1;
  if (Math.abs(df) > Math.PI * 120 / 180) {
    const f2old = f2;
    const x2old = x2;
    const y2old = y2;
    if (sweepFlag && f2 > f1) {
      f2 = f1 + Math.PI * 120 / 180 * 1;
    } else {
      f2 = f1 + Math.PI * 120 / 180 * -1;
    }
    x2 = cx + r1 * Math.cos(f2);
    y2 = cy + r2 * Math.sin(f2);
    params = arcToCubicCurves(x2, y2, x2old, y2old, r1, r2, angle, 0, sweepFlag, [f2, f2old, cx, cy]);
  }
  df = f2 - f1;
  const c1 = Math.cos(f1);
  const s1 = Math.sin(f1);
  const c2 = Math.cos(f2);
  const s2 = Math.sin(f2);
  const t = Math.tan(df / 4);
  const hx = 4 / 3 * r1 * t;
  const hy = 4 / 3 * r2 * t;
  const m1 = [x1, y1];
  const m2 = [x1 + hx * s1, y1 - hy * c1];
  const m3 = [x2 + hx * s2, y2 - hy * c2];
  const m4 = [x2, y2];
  m2[0] = 2 * m1[0] - m2[0];
  m2[1] = 2 * m1[1] - m2[1];
  if (recursive) {
    return [m2, m3, m4].concat(params);
  } else {
    params = [m2, m3, m4].concat(params);
    const curves = [];
    for (let i = 0; i < params.length; i += 3) {
      const r12 = rotate(params[i][0], params[i][1], angleRad);
      const r22 = rotate(params[i + 1][0], params[i + 1][1], angleRad);
      const r3 = rotate(params[i + 2][0], params[i + 2][1], angleRad);
      curves.push([r12[0], r12[1], r22[0], r22[1], r3[0], r3[1]]);
    }
    return curves;
  }
}

// ../../node_modules/roughjs/bin/renderer.js
var helper = {
  randOffset,
  randOffsetWithRange,
  ellipse,
  doubleLineOps: doubleLineFillOps
};
function line(x1, y1, x2, y2, o) {
  return { type: "path", ops: _doubleLine(x1, y1, x2, y2, o) };
}
function linearPath(points, close, o) {
  const len = (points || []).length;
  if (len > 2) {
    const ops = [];
    for (let i = 0; i < len - 1; i++) {
      ops.push(..._doubleLine(points[i][0], points[i][1], points[i + 1][0], points[i + 1][1], o));
    }
    if (close) {
      ops.push(..._doubleLine(points[len - 1][0], points[len - 1][1], points[0][0], points[0][1], o));
    }
    return { type: "path", ops };
  } else if (len === 2) {
    return line(points[0][0], points[0][1], points[1][0], points[1][1], o);
  }
  return { type: "path", ops: [] };
}
function polygon(points, o) {
  return linearPath(points, true, o);
}
function rectangle(x, y, width, height, o) {
  const points = [
    [x, y],
    [x + width, y],
    [x + width, y + height],
    [x, y + height]
  ];
  return polygon(points, o);
}
function curve(points, o) {
  let o1 = _curveWithOffset(points, 1 * (1 + o.roughness * 0.2), o);
  if (!o.disableMultiStroke) {
    const o2 = _curveWithOffset(points, 1.5 * (1 + o.roughness * 0.22), cloneOptionsAlterSeed(o));
    o1 = o1.concat(o2);
  }
  return { type: "path", ops: o1 };
}
function ellipse(x, y, width, height, o) {
  const params = generateEllipseParams(width, height, o);
  return ellipseWithParams(x, y, o, params).opset;
}
function generateEllipseParams(width, height, o) {
  const psq = Math.sqrt(Math.PI * 2 * Math.sqrt((Math.pow(width / 2, 2) + Math.pow(height / 2, 2)) / 2));
  const stepCount = Math.ceil(Math.max(o.curveStepCount, o.curveStepCount / Math.sqrt(200) * psq));
  const increment = Math.PI * 2 / stepCount;
  let rx = Math.abs(width / 2);
  let ry = Math.abs(height / 2);
  const curveFitRandomness = 1 - o.curveFitting;
  rx += _offsetOpt(rx * curveFitRandomness, o);
  ry += _offsetOpt(ry * curveFitRandomness, o);
  return { increment, rx, ry };
}
function ellipseWithParams(x, y, o, ellipseParams) {
  const [ap1, cp1] = _computeEllipsePoints(ellipseParams.increment, x, y, ellipseParams.rx, ellipseParams.ry, 1, ellipseParams.increment * _offset(0.1, _offset(0.4, 1, o), o), o);
  let o1 = _curve(ap1, null, o);
  if (!o.disableMultiStroke && o.roughness !== 0) {
    const [ap2] = _computeEllipsePoints(ellipseParams.increment, x, y, ellipseParams.rx, ellipseParams.ry, 1.5, 0, o);
    const o2 = _curve(ap2, null, o);
    o1 = o1.concat(o2);
  }
  return {
    estimatedPoints: cp1,
    opset: { type: "path", ops: o1 }
  };
}
function arc(x, y, width, height, start, stop, closed, roughClosure, o) {
  const cx = x;
  const cy = y;
  let rx = Math.abs(width / 2);
  let ry = Math.abs(height / 2);
  rx += _offsetOpt(rx * 0.01, o);
  ry += _offsetOpt(ry * 0.01, o);
  let strt = start;
  let stp = stop;
  while (strt < 0) {
    strt += Math.PI * 2;
    stp += Math.PI * 2;
  }
  if (stp - strt > Math.PI * 2) {
    strt = 0;
    stp = Math.PI * 2;
  }
  const ellipseInc = Math.PI * 2 / o.curveStepCount;
  const arcInc = Math.min(ellipseInc / 2, (stp - strt) / 2);
  const ops = _arc(arcInc, cx, cy, rx, ry, strt, stp, 1, o);
  if (!o.disableMultiStroke) {
    const o2 = _arc(arcInc, cx, cy, rx, ry, strt, stp, 1.5, o);
    ops.push(...o2);
  }
  if (closed) {
    if (roughClosure) {
      ops.push(..._doubleLine(cx, cy, cx + rx * Math.cos(strt), cy + ry * Math.sin(strt), o), ..._doubleLine(cx, cy, cx + rx * Math.cos(stp), cy + ry * Math.sin(stp), o));
    } else {
      ops.push({ op: "lineTo", data: [cx, cy] }, { op: "lineTo", data: [cx + rx * Math.cos(strt), cy + ry * Math.sin(strt)] });
    }
  }
  return { type: "path", ops };
}
function svgPath(path, o) {
  const segments = normalize(absolutize(parsePath(path)));
  const ops = [];
  let first = [0, 0];
  let current = [0, 0];
  for (const { key, data } of segments) {
    switch (key) {
      case "M": {
        current = [data[0], data[1]];
        first = [data[0], data[1]];
        break;
      }
      case "L":
        ops.push(..._doubleLine(current[0], current[1], data[0], data[1], o));
        current = [data[0], data[1]];
        break;
      case "C": {
        const [x1, y1, x2, y2, x, y] = data;
        ops.push(..._bezierTo(x1, y1, x2, y2, x, y, current, o));
        current = [x, y];
        break;
      }
      case "Z":
        ops.push(..._doubleLine(current[0], current[1], first[0], first[1], o));
        current = [first[0], first[1]];
        break;
    }
  }
  return { type: "path", ops };
}
function solidFillPolygon(polygonList, o) {
  const ops = [];
  for (const points of polygonList) {
    if (points.length) {
      const offset = o.maxRandomnessOffset || 0;
      const len = points.length;
      if (len > 2) {
        ops.push({ op: "move", data: [points[0][0] + _offsetOpt(offset, o), points[0][1] + _offsetOpt(offset, o)] });
        for (let i = 1; i < len; i++) {
          ops.push({ op: "lineTo", data: [points[i][0] + _offsetOpt(offset, o), points[i][1] + _offsetOpt(offset, o)] });
        }
      }
    }
  }
  return { type: "fillPath", ops };
}
function patternFillPolygons(polygonList, o) {
  return getFiller(o, helper).fillPolygons(polygonList, o);
}
function patternFillArc(x, y, width, height, start, stop, o) {
  const cx = x;
  const cy = y;
  let rx = Math.abs(width / 2);
  let ry = Math.abs(height / 2);
  rx += _offsetOpt(rx * 0.01, o);
  ry += _offsetOpt(ry * 0.01, o);
  let strt = start;
  let stp = stop;
  while (strt < 0) {
    strt += Math.PI * 2;
    stp += Math.PI * 2;
  }
  if (stp - strt > Math.PI * 2) {
    strt = 0;
    stp = Math.PI * 2;
  }
  const increment = (stp - strt) / o.curveStepCount;
  const points = [];
  for (let angle = strt; angle <= stp; angle = angle + increment) {
    points.push([cx + rx * Math.cos(angle), cy + ry * Math.sin(angle)]);
  }
  points.push([cx + rx * Math.cos(stp), cy + ry * Math.sin(stp)]);
  points.push([cx, cy]);
  return patternFillPolygons([points], o);
}
function randOffset(x, o) {
  return _offsetOpt(x, o);
}
function randOffsetWithRange(min, max, o) {
  return _offset(min, max, o);
}
function doubleLineFillOps(x1, y1, x2, y2, o) {
  return _doubleLine(x1, y1, x2, y2, o, true);
}
function cloneOptionsAlterSeed(ops) {
  const result = Object.assign({}, ops);
  result.randomizer = void 0;
  if (ops.seed) {
    result.seed = ops.seed + 1;
  }
  return result;
}
function random(ops) {
  if (!ops.randomizer) {
    ops.randomizer = new Random(ops.seed || 0);
  }
  return ops.randomizer.next();
}
function _offset(min, max, ops, roughnessGain = 1) {
  return ops.roughness * roughnessGain * (random(ops) * (max - min) + min);
}
function _offsetOpt(x, ops, roughnessGain = 1) {
  return _offset(-x, x, ops, roughnessGain);
}
function _doubleLine(x1, y1, x2, y2, o, filling = false) {
  const singleStroke = filling ? o.disableMultiStrokeFill : o.disableMultiStroke;
  const o1 = _line(x1, y1, x2, y2, o, true, false);
  if (singleStroke) {
    return o1;
  }
  const o2 = _line(x1, y1, x2, y2, o, true, true);
  return o1.concat(o2);
}
function _line(x1, y1, x2, y2, o, move, overlay) {
  const lengthSq = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
  const length = Math.sqrt(lengthSq);
  let roughnessGain = 1;
  if (length < 200) {
    roughnessGain = 1;
  } else if (length > 500) {
    roughnessGain = 0.4;
  } else {
    roughnessGain = -16668e-7 * length + 1.233334;
  }
  let offset = o.maxRandomnessOffset || 0;
  if (offset * offset * 100 > lengthSq) {
    offset = length / 10;
  }
  const halfOffset = offset / 2;
  const divergePoint = 0.2 + random(o) * 0.2;
  let midDispX = o.bowing * o.maxRandomnessOffset * (y2 - y1) / 200;
  let midDispY = o.bowing * o.maxRandomnessOffset * (x1 - x2) / 200;
  midDispX = _offsetOpt(midDispX, o, roughnessGain);
  midDispY = _offsetOpt(midDispY, o, roughnessGain);
  const ops = [];
  const randomHalf = () => _offsetOpt(halfOffset, o, roughnessGain);
  const randomFull = () => _offsetOpt(offset, o, roughnessGain);
  const preserveVertices = o.preserveVertices;
  if (move) {
    if (overlay) {
      ops.push({
        op: "move",
        data: [
          x1 + (preserveVertices ? 0 : randomHalf()),
          y1 + (preserveVertices ? 0 : randomHalf())
        ]
      });
    } else {
      ops.push({
        op: "move",
        data: [
          x1 + (preserveVertices ? 0 : _offsetOpt(offset, o, roughnessGain)),
          y1 + (preserveVertices ? 0 : _offsetOpt(offset, o, roughnessGain))
        ]
      });
    }
  }
  if (overlay) {
    ops.push({
      op: "bcurveTo",
      data: [
        midDispX + x1 + (x2 - x1) * divergePoint + randomHalf(),
        midDispY + y1 + (y2 - y1) * divergePoint + randomHalf(),
        midDispX + x1 + 2 * (x2 - x1) * divergePoint + randomHalf(),
        midDispY + y1 + 2 * (y2 - y1) * divergePoint + randomHalf(),
        x2 + (preserveVertices ? 0 : randomHalf()),
        y2 + (preserveVertices ? 0 : randomHalf())
      ]
    });
  } else {
    ops.push({
      op: "bcurveTo",
      data: [
        midDispX + x1 + (x2 - x1) * divergePoint + randomFull(),
        midDispY + y1 + (y2 - y1) * divergePoint + randomFull(),
        midDispX + x1 + 2 * (x2 - x1) * divergePoint + randomFull(),
        midDispY + y1 + 2 * (y2 - y1) * divergePoint + randomFull(),
        x2 + (preserveVertices ? 0 : randomFull()),
        y2 + (preserveVertices ? 0 : randomFull())
      ]
    });
  }
  return ops;
}
function _curveWithOffset(points, offset, o) {
  const ps = [];
  ps.push([
    points[0][0] + _offsetOpt(offset, o),
    points[0][1] + _offsetOpt(offset, o)
  ]);
  ps.push([
    points[0][0] + _offsetOpt(offset, o),
    points[0][1] + _offsetOpt(offset, o)
  ]);
  for (let i = 1; i < points.length; i++) {
    ps.push([
      points[i][0] + _offsetOpt(offset, o),
      points[i][1] + _offsetOpt(offset, o)
    ]);
    if (i === points.length - 1) {
      ps.push([
        points[i][0] + _offsetOpt(offset, o),
        points[i][1] + _offsetOpt(offset, o)
      ]);
    }
  }
  return _curve(ps, null, o);
}
function _curve(points, closePoint, o) {
  const len = points.length;
  const ops = [];
  if (len > 3) {
    const b2 = [];
    const s = 1 - o.curveTightness;
    ops.push({ op: "move", data: [points[1][0], points[1][1]] });
    for (let i = 1; i + 2 < len; i++) {
      const cachedVertArray = points[i];
      b2[0] = [cachedVertArray[0], cachedVertArray[1]];
      b2[1] = [cachedVertArray[0] + (s * points[i + 1][0] - s * points[i - 1][0]) / 6, cachedVertArray[1] + (s * points[i + 1][1] - s * points[i - 1][1]) / 6];
      b2[2] = [points[i + 1][0] + (s * points[i][0] - s * points[i + 2][0]) / 6, points[i + 1][1] + (s * points[i][1] - s * points[i + 2][1]) / 6];
      b2[3] = [points[i + 1][0], points[i + 1][1]];
      ops.push({ op: "bcurveTo", data: [b2[1][0], b2[1][1], b2[2][0], b2[2][1], b2[3][0], b2[3][1]] });
    }
    if (closePoint && closePoint.length === 2) {
      const ro = o.maxRandomnessOffset;
      ops.push({ op: "lineTo", data: [closePoint[0] + _offsetOpt(ro, o), closePoint[1] + _offsetOpt(ro, o)] });
    }
  } else if (len === 3) {
    ops.push({ op: "move", data: [points[1][0], points[1][1]] });
    ops.push({
      op: "bcurveTo",
      data: [
        points[1][0],
        points[1][1],
        points[2][0],
        points[2][1],
        points[2][0],
        points[2][1]
      ]
    });
  } else if (len === 2) {
    ops.push(..._doubleLine(points[0][0], points[0][1], points[1][0], points[1][1], o));
  }
  return ops;
}
function _computeEllipsePoints(increment, cx, cy, rx, ry, offset, overlap, o) {
  const coreOnly = o.roughness === 0;
  const corePoints = [];
  const allPoints = [];
  if (coreOnly) {
    increment = increment / 4;
    allPoints.push([
      cx + rx * Math.cos(-increment),
      cy + ry * Math.sin(-increment)
    ]);
    for (let angle = 0; angle <= Math.PI * 2; angle = angle + increment) {
      const p = [
        cx + rx * Math.cos(angle),
        cy + ry * Math.sin(angle)
      ];
      corePoints.push(p);
      allPoints.push(p);
    }
    allPoints.push([
      cx + rx * Math.cos(0),
      cy + ry * Math.sin(0)
    ]);
    allPoints.push([
      cx + rx * Math.cos(increment),
      cy + ry * Math.sin(increment)
    ]);
  } else {
    const radOffset = _offsetOpt(0.5, o) - Math.PI / 2;
    allPoints.push([
      _offsetOpt(offset, o) + cx + 0.9 * rx * Math.cos(radOffset - increment),
      _offsetOpt(offset, o) + cy + 0.9 * ry * Math.sin(radOffset - increment)
    ]);
    const endAngle = Math.PI * 2 + radOffset - 0.01;
    for (let angle = radOffset; angle < endAngle; angle = angle + increment) {
      const p = [
        _offsetOpt(offset, o) + cx + rx * Math.cos(angle),
        _offsetOpt(offset, o) + cy + ry * Math.sin(angle)
      ];
      corePoints.push(p);
      allPoints.push(p);
    }
    allPoints.push([
      _offsetOpt(offset, o) + cx + rx * Math.cos(radOffset + Math.PI * 2 + overlap * 0.5),
      _offsetOpt(offset, o) + cy + ry * Math.sin(radOffset + Math.PI * 2 + overlap * 0.5)
    ]);
    allPoints.push([
      _offsetOpt(offset, o) + cx + 0.98 * rx * Math.cos(radOffset + overlap),
      _offsetOpt(offset, o) + cy + 0.98 * ry * Math.sin(radOffset + overlap)
    ]);
    allPoints.push([
      _offsetOpt(offset, o) + cx + 0.9 * rx * Math.cos(radOffset + overlap * 0.5),
      _offsetOpt(offset, o) + cy + 0.9 * ry * Math.sin(radOffset + overlap * 0.5)
    ]);
  }
  return [allPoints, corePoints];
}
function _arc(increment, cx, cy, rx, ry, strt, stp, offset, o) {
  const radOffset = strt + _offsetOpt(0.1, o);
  const points = [];
  points.push([
    _offsetOpt(offset, o) + cx + 0.9 * rx * Math.cos(radOffset - increment),
    _offsetOpt(offset, o) + cy + 0.9 * ry * Math.sin(radOffset - increment)
  ]);
  for (let angle = radOffset; angle <= stp; angle = angle + increment) {
    points.push([
      _offsetOpt(offset, o) + cx + rx * Math.cos(angle),
      _offsetOpt(offset, o) + cy + ry * Math.sin(angle)
    ]);
  }
  points.push([
    cx + rx * Math.cos(stp),
    cy + ry * Math.sin(stp)
  ]);
  points.push([
    cx + rx * Math.cos(stp),
    cy + ry * Math.sin(stp)
  ]);
  return _curve(points, null, o);
}
function _bezierTo(x1, y1, x2, y2, x, y, current, o) {
  const ops = [];
  const ros = [o.maxRandomnessOffset || 1, (o.maxRandomnessOffset || 1) + 0.3];
  let f = [0, 0];
  const iterations = o.disableMultiStroke ? 1 : 2;
  const preserveVertices = o.preserveVertices;
  for (let i = 0; i < iterations; i++) {
    if (i === 0) {
      ops.push({ op: "move", data: [current[0], current[1]] });
    } else {
      ops.push({ op: "move", data: [current[0] + (preserveVertices ? 0 : _offsetOpt(ros[0], o)), current[1] + (preserveVertices ? 0 : _offsetOpt(ros[0], o))] });
    }
    f = preserveVertices ? [x, y] : [x + _offsetOpt(ros[i], o), y + _offsetOpt(ros[i], o)];
    ops.push({
      op: "bcurveTo",
      data: [
        x1 + _offsetOpt(ros[i], o),
        y1 + _offsetOpt(ros[i], o),
        x2 + _offsetOpt(ros[i], o),
        y2 + _offsetOpt(ros[i], o),
        f[0],
        f[1]
      ]
    });
  }
  return ops;
}

// ../../node_modules/points-on-curve/lib/curve-to-bezier.js
init_define_import_meta_env();
function clone(p) {
  return [...p];
}
function curveToBezier(pointsIn, curveTightness = 0) {
  const len = pointsIn.length;
  if (len < 3) {
    throw new Error("A curve must have at least three points.");
  }
  const out = [];
  if (len === 3) {
    out.push(clone(pointsIn[0]), clone(pointsIn[1]), clone(pointsIn[2]), clone(pointsIn[2]));
  } else {
    const points = [];
    points.push(pointsIn[0], pointsIn[0]);
    for (let i = 1; i < pointsIn.length; i++) {
      points.push(pointsIn[i]);
      if (i === pointsIn.length - 1) {
        points.push(pointsIn[i]);
      }
    }
    const b2 = [];
    const s = 1 - curveTightness;
    out.push(clone(points[0]));
    for (let i = 1; i + 2 < points.length; i++) {
      const cachedVertArray = points[i];
      b2[0] = [cachedVertArray[0], cachedVertArray[1]];
      b2[1] = [cachedVertArray[0] + (s * points[i + 1][0] - s * points[i - 1][0]) / 6, cachedVertArray[1] + (s * points[i + 1][1] - s * points[i - 1][1]) / 6];
      b2[2] = [points[i + 1][0] + (s * points[i][0] - s * points[i + 2][0]) / 6, points[i + 1][1] + (s * points[i][1] - s * points[i + 2][1]) / 6];
      b2[3] = [points[i + 1][0], points[i + 1][1]];
      out.push(b2[1], b2[2], b2[3]);
    }
  }
  return out;
}

// ../../node_modules/points-on-curve/lib/index.js
init_define_import_meta_env();
function distance(p1, p2) {
  return Math.sqrt(distanceSq(p1, p2));
}
function distanceSq(p1, p2) {
  return Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2);
}
function distanceToSegmentSq(p, v, w) {
  const l2 = distanceSq(v, w);
  if (l2 === 0) {
    return distanceSq(p, v);
  }
  let t = ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;
  t = Math.max(0, Math.min(1, t));
  return distanceSq(p, lerp(v, w, t));
}
function lerp(a2, b2, t) {
  return [
    a2[0] + (b2[0] - a2[0]) * t,
    a2[1] + (b2[1] - a2[1]) * t
  ];
}
function flatness(points, offset) {
  const p1 = points[offset + 0];
  const p2 = points[offset + 1];
  const p3 = points[offset + 2];
  const p4 = points[offset + 3];
  let ux = 3 * p2[0] - 2 * p1[0] - p4[0];
  ux *= ux;
  let uy = 3 * p2[1] - 2 * p1[1] - p4[1];
  uy *= uy;
  let vx = 3 * p3[0] - 2 * p4[0] - p1[0];
  vx *= vx;
  let vy = 3 * p3[1] - 2 * p4[1] - p1[1];
  vy *= vy;
  if (ux < vx) {
    ux = vx;
  }
  if (uy < vy) {
    uy = vy;
  }
  return ux + uy;
}
function getPointsOnBezierCurveWithSplitting(points, offset, tolerance, newPoints) {
  const outPoints = newPoints || [];
  if (flatness(points, offset) < tolerance) {
    const p0 = points[offset + 0];
    if (outPoints.length) {
      const d = distance(outPoints[outPoints.length - 1], p0);
      if (d > 1) {
        outPoints.push(p0);
      }
    } else {
      outPoints.push(p0);
    }
    outPoints.push(points[offset + 3]);
  } else {
    const t = 0.5;
    const p1 = points[offset + 0];
    const p2 = points[offset + 1];
    const p3 = points[offset + 2];
    const p4 = points[offset + 3];
    const q1 = lerp(p1, p2, t);
    const q2 = lerp(p2, p3, t);
    const q3 = lerp(p3, p4, t);
    const r1 = lerp(q1, q2, t);
    const r2 = lerp(q2, q3, t);
    const red = lerp(r1, r2, t);
    getPointsOnBezierCurveWithSplitting([p1, q1, r1, red], 0, tolerance, outPoints);
    getPointsOnBezierCurveWithSplitting([red, r2, q3, p4], 0, tolerance, outPoints);
  }
  return outPoints;
}
function simplify(points, distance3) {
  return simplifyPoints(points, 0, points.length, distance3);
}
function simplifyPoints(points, start, end, epsilon, newPoints) {
  const outPoints = newPoints || [];
  const s = points[start];
  const e = points[end - 1];
  let maxDistSq = 0;
  let maxNdx = 1;
  for (let i = start + 1; i < end - 1; ++i) {
    const distSq = distanceToSegmentSq(points[i], s, e);
    if (distSq > maxDistSq) {
      maxDistSq = distSq;
      maxNdx = i;
    }
  }
  if (Math.sqrt(maxDistSq) > epsilon) {
    simplifyPoints(points, start, maxNdx + 1, epsilon, outPoints);
    simplifyPoints(points, maxNdx, end, epsilon, outPoints);
  } else {
    if (!outPoints.length) {
      outPoints.push(s);
    }
    outPoints.push(e);
  }
  return outPoints;
}
function pointsOnBezierCurves(points, tolerance = 0.15, distance3) {
  const newPoints = [];
  const numSegments = (points.length - 1) / 3;
  for (let i = 0; i < numSegments; i++) {
    const offset = i * 3;
    getPointsOnBezierCurveWithSplitting(points, offset, tolerance, newPoints);
  }
  if (distance3 && distance3 > 0) {
    return simplifyPoints(newPoints, 0, newPoints.length, distance3);
  }
  return newPoints;
}

// ../../node_modules/points-on-path/lib/index.js
init_define_import_meta_env();
function pointsOnPath(path, tolerance, distance3) {
  const segments = parsePath(path);
  const normalized = normalize(absolutize(segments));
  const sets = [];
  let currentPoints = [];
  let start = [0, 0];
  let pendingCurve = [];
  const appendPendingCurve = () => {
    if (pendingCurve.length >= 4) {
      currentPoints.push(...pointsOnBezierCurves(pendingCurve, tolerance));
    }
    pendingCurve = [];
  };
  const appendPendingPoints = () => {
    appendPendingCurve();
    if (currentPoints.length) {
      sets.push(currentPoints);
      currentPoints = [];
    }
  };
  for (const { key, data } of normalized) {
    switch (key) {
      case "M":
        appendPendingPoints();
        start = [data[0], data[1]];
        currentPoints.push(start);
        break;
      case "L":
        appendPendingCurve();
        currentPoints.push([data[0], data[1]]);
        break;
      case "C":
        if (!pendingCurve.length) {
          const lastPoint = currentPoints.length ? currentPoints[currentPoints.length - 1] : start;
          pendingCurve.push([lastPoint[0], lastPoint[1]]);
        }
        pendingCurve.push([data[0], data[1]]);
        pendingCurve.push([data[2], data[3]]);
        pendingCurve.push([data[4], data[5]]);
        break;
      case "Z":
        appendPendingCurve();
        currentPoints.push([start[0], start[1]]);
        break;
    }
  }
  appendPendingPoints();
  if (!distance3) {
    return sets;
  }
  const out = [];
  for (const set of sets) {
    const simplifiedSet = simplify(set, distance3);
    if (simplifiedSet.length) {
      out.push(simplifiedSet);
    }
  }
  return out;
}

// ../../node_modules/roughjs/bin/generator.js
var NOS = "none";
var RoughGenerator = class {
  constructor(config) {
    this.defaultOptions = {
      maxRandomnessOffset: 2,
      roughness: 1,
      bowing: 1,
      stroke: "#000",
      strokeWidth: 1,
      curveTightness: 0,
      curveFitting: 0.95,
      curveStepCount: 9,
      fillStyle: "hachure",
      fillWeight: -1,
      hachureAngle: -41,
      hachureGap: -1,
      dashOffset: -1,
      dashGap: -1,
      zigzagOffset: -1,
      seed: 0,
      disableMultiStroke: false,
      disableMultiStrokeFill: false,
      preserveVertices: false,
      fillShapeRoughnessGain: 0.8
    };
    this.config = config || {};
    if (this.config.options) {
      this.defaultOptions = this._o(this.config.options);
    }
  }
  static newSeed() {
    return randomSeed();
  }
  _o(options) {
    return options ? Object.assign({}, this.defaultOptions, options) : this.defaultOptions;
  }
  _d(shape, sets, options) {
    return { shape, sets: sets || [], options: options || this.defaultOptions };
  }
  line(x1, y1, x2, y2, options) {
    const o = this._o(options);
    return this._d("line", [line(x1, y1, x2, y2, o)], o);
  }
  rectangle(x, y, width, height, options) {
    const o = this._o(options);
    const paths = [];
    const outline = rectangle(x, y, width, height, o);
    if (o.fill) {
      const points = [[x, y], [x + width, y], [x + width, y + height], [x, y + height]];
      if (o.fillStyle === "solid") {
        paths.push(solidFillPolygon([points], o));
      } else {
        paths.push(patternFillPolygons([points], o));
      }
    }
    if (o.stroke !== NOS) {
      paths.push(outline);
    }
    return this._d("rectangle", paths, o);
  }
  ellipse(x, y, width, height, options) {
    const o = this._o(options);
    const paths = [];
    const ellipseParams = generateEllipseParams(width, height, o);
    const ellipseResponse = ellipseWithParams(x, y, o, ellipseParams);
    if (o.fill) {
      if (o.fillStyle === "solid") {
        const shape = ellipseWithParams(x, y, o, ellipseParams).opset;
        shape.type = "fillPath";
        paths.push(shape);
      } else {
        paths.push(patternFillPolygons([ellipseResponse.estimatedPoints], o));
      }
    }
    if (o.stroke !== NOS) {
      paths.push(ellipseResponse.opset);
    }
    return this._d("ellipse", paths, o);
  }
  circle(x, y, diameter, options) {
    const ret = this.ellipse(x, y, diameter, diameter, options);
    ret.shape = "circle";
    return ret;
  }
  linearPath(points, options) {
    const o = this._o(options);
    return this._d("linearPath", [linearPath(points, false, o)], o);
  }
  arc(x, y, width, height, start, stop, closed = false, options) {
    const o = this._o(options);
    const paths = [];
    const outline = arc(x, y, width, height, start, stop, closed, true, o);
    if (closed && o.fill) {
      if (o.fillStyle === "solid") {
        const fillOptions = Object.assign({}, o);
        fillOptions.disableMultiStroke = true;
        const shape = arc(x, y, width, height, start, stop, true, false, fillOptions);
        shape.type = "fillPath";
        paths.push(shape);
      } else {
        paths.push(patternFillArc(x, y, width, height, start, stop, o));
      }
    }
    if (o.stroke !== NOS) {
      paths.push(outline);
    }
    return this._d("arc", paths, o);
  }
  curve(points, options) {
    const o = this._o(options);
    const paths = [];
    const outline = curve(points, o);
    if (o.fill && o.fill !== NOS && points.length >= 3) {
      if (o.fillStyle === "solid") {
        const fillShape = curve(points, Object.assign(Object.assign({}, o), { disableMultiStroke: true, roughness: o.roughness ? o.roughness + o.fillShapeRoughnessGain : 0 }));
        paths.push({
          type: "fillPath",
          ops: this._mergedShape(fillShape.ops)
        });
      } else {
        const bcurve = curveToBezier(points);
        const polyPoints = pointsOnBezierCurves(bcurve, 10, (1 + o.roughness) / 2);
        paths.push(patternFillPolygons([polyPoints], o));
      }
    }
    if (o.stroke !== NOS) {
      paths.push(outline);
    }
    return this._d("curve", paths, o);
  }
  polygon(points, options) {
    const o = this._o(options);
    const paths = [];
    const outline = linearPath(points, true, o);
    if (o.fill) {
      if (o.fillStyle === "solid") {
        paths.push(solidFillPolygon([points], o));
      } else {
        paths.push(patternFillPolygons([points], o));
      }
    }
    if (o.stroke !== NOS) {
      paths.push(outline);
    }
    return this._d("polygon", paths, o);
  }
  path(d, options) {
    const o = this._o(options);
    const paths = [];
    if (!d) {
      return this._d("path", paths, o);
    }
    d = (d || "").replace(/\n/g, " ").replace(/(-\s)/g, "-").replace("/(ss)/g", " ");
    const hasFill = o.fill && o.fill !== "transparent" && o.fill !== NOS;
    const hasStroke = o.stroke !== NOS;
    const simplified = !!(o.simplification && o.simplification < 1);
    const distance3 = simplified ? 4 - 4 * (o.simplification || 1) : (1 + o.roughness) / 2;
    const sets = pointsOnPath(d, 1, distance3);
    const shape = svgPath(d, o);
    if (hasFill) {
      if (o.fillStyle === "solid") {
        if (sets.length === 1) {
          const fillShape = svgPath(d, Object.assign(Object.assign({}, o), { disableMultiStroke: true, roughness: o.roughness ? o.roughness + o.fillShapeRoughnessGain : 0 }));
          paths.push({
            type: "fillPath",
            ops: this._mergedShape(fillShape.ops)
          });
        } else {
          paths.push(solidFillPolygon(sets, o));
        }
      } else {
        paths.push(patternFillPolygons(sets, o));
      }
    }
    if (hasStroke) {
      if (simplified) {
        sets.forEach((set) => {
          paths.push(linearPath(set, false, o));
        });
      } else {
        paths.push(shape);
      }
    }
    return this._d("path", paths, o);
  }
  opsToPath(drawing, fixedDecimals) {
    let path = "";
    for (const item of drawing.ops) {
      const data = typeof fixedDecimals === "number" && fixedDecimals >= 0 ? item.data.map((d) => +d.toFixed(fixedDecimals)) : item.data;
      switch (item.op) {
        case "move":
          path += `M${data[0]} ${data[1]} `;
          break;
        case "bcurveTo":
          path += `C${data[0]} ${data[1]}, ${data[2]} ${data[3]}, ${data[4]} ${data[5]} `;
          break;
        case "lineTo":
          path += `L${data[0]} ${data[1]} `;
          break;
      }
    }
    return path.trim();
  }
  toPaths(drawable) {
    const sets = drawable.sets || [];
    const o = drawable.options || this.defaultOptions;
    const paths = [];
    for (const drawing of sets) {
      let path = null;
      switch (drawing.type) {
        case "path":
          path = {
            d: this.opsToPath(drawing),
            stroke: o.stroke,
            strokeWidth: o.strokeWidth,
            fill: NOS
          };
          break;
        case "fillPath":
          path = {
            d: this.opsToPath(drawing),
            stroke: NOS,
            strokeWidth: 0,
            fill: o.fill || NOS
          };
          break;
        case "fillSketch":
          path = this.fillSketch(drawing, o);
          break;
      }
      if (path) {
        paths.push(path);
      }
    }
    return paths;
  }
  fillSketch(drawing, o) {
    let fweight = o.fillWeight;
    if (fweight < 0) {
      fweight = o.strokeWidth / 2;
    }
    return {
      d: this.opsToPath(drawing),
      stroke: o.fill || NOS,
      strokeWidth: fweight,
      fill: NOS
    };
  }
  _mergedShape(input) {
    return input.filter((d, i) => {
      if (i === 0) {
        return true;
      }
      if (d.op === "move") {
        return false;
      }
      return true;
    });
  }
};

// ../../node_modules/roughjs/bin/canvas.js
var RoughCanvas = class {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.gen = new RoughGenerator(config);
  }
  draw(drawable) {
    const sets = drawable.sets || [];
    const o = drawable.options || this.getDefaultOptions();
    const ctx = this.ctx;
    const precision = drawable.options.fixedDecimalPlaceDigits;
    for (const drawing of sets) {
      switch (drawing.type) {
        case "path":
          ctx.save();
          ctx.strokeStyle = o.stroke === "none" ? "transparent" : o.stroke;
          ctx.lineWidth = o.strokeWidth;
          if (o.strokeLineDash) {
            ctx.setLineDash(o.strokeLineDash);
          }
          if (o.strokeLineDashOffset) {
            ctx.lineDashOffset = o.strokeLineDashOffset;
          }
          this._drawToContext(ctx, drawing, precision);
          ctx.restore();
          break;
        case "fillPath": {
          ctx.save();
          ctx.fillStyle = o.fill || "";
          const fillRule = drawable.shape === "curve" || drawable.shape === "polygon" || drawable.shape === "path" ? "evenodd" : "nonzero";
          this._drawToContext(ctx, drawing, precision, fillRule);
          ctx.restore();
          break;
        }
        case "fillSketch":
          this.fillSketch(ctx, drawing, o);
          break;
      }
    }
  }
  fillSketch(ctx, drawing, o) {
    let fweight = o.fillWeight;
    if (fweight < 0) {
      fweight = o.strokeWidth / 2;
    }
    ctx.save();
    if (o.fillLineDash) {
      ctx.setLineDash(o.fillLineDash);
    }
    if (o.fillLineDashOffset) {
      ctx.lineDashOffset = o.fillLineDashOffset;
    }
    ctx.strokeStyle = o.fill || "";
    ctx.lineWidth = fweight;
    this._drawToContext(ctx, drawing, o.fixedDecimalPlaceDigits);
    ctx.restore();
  }
  _drawToContext(ctx, drawing, fixedDecimals, rule = "nonzero") {
    ctx.beginPath();
    for (const item of drawing.ops) {
      const data = typeof fixedDecimals === "number" && fixedDecimals >= 0 ? item.data.map((d) => +d.toFixed(fixedDecimals)) : item.data;
      switch (item.op) {
        case "move":
          ctx.moveTo(data[0], data[1]);
          break;
        case "bcurveTo":
          ctx.bezierCurveTo(data[0], data[1], data[2], data[3], data[4], data[5]);
          break;
        case "lineTo":
          ctx.lineTo(data[0], data[1]);
          break;
      }
    }
    if (drawing.type === "fillPath") {
      ctx.fill(rule);
    } else {
      ctx.stroke();
    }
  }
  get generator() {
    return this.gen;
  }
  getDefaultOptions() {
    return this.gen.defaultOptions;
  }
  line(x1, y1, x2, y2, options) {
    const d = this.gen.line(x1, y1, x2, y2, options);
    this.draw(d);
    return d;
  }
  rectangle(x, y, width, height, options) {
    const d = this.gen.rectangle(x, y, width, height, options);
    this.draw(d);
    return d;
  }
  ellipse(x, y, width, height, options) {
    const d = this.gen.ellipse(x, y, width, height, options);
    this.draw(d);
    return d;
  }
  circle(x, y, diameter, options) {
    const d = this.gen.circle(x, y, diameter, options);
    this.draw(d);
    return d;
  }
  linearPath(points, options) {
    const d = this.gen.linearPath(points, options);
    this.draw(d);
    return d;
  }
  polygon(points, options) {
    const d = this.gen.polygon(points, options);
    this.draw(d);
    return d;
  }
  arc(x, y, width, height, start, stop, closed = false, options) {
    const d = this.gen.arc(x, y, width, height, start, stop, closed, options);
    this.draw(d);
    return d;
  }
  curve(points, options) {
    const d = this.gen.curve(points, options);
    this.draw(d);
    return d;
  }
  path(d, options) {
    const drawing = this.gen.path(d, options);
    this.draw(drawing);
    return drawing;
  }
};

// ../../node_modules/roughjs/bin/svg.js
init_define_import_meta_env();

// ../../node_modules/roughjs/bin/core.js
init_define_import_meta_env();
var SVGNS = "http://www.w3.org/2000/svg";

// ../../node_modules/roughjs/bin/svg.js
var RoughSVG = class {
  constructor(svg, config) {
    this.svg = svg;
    this.gen = new RoughGenerator(config);
  }
  draw(drawable) {
    const sets = drawable.sets || [];
    const o = drawable.options || this.getDefaultOptions();
    const doc = this.svg.ownerDocument || window.document;
    const g = doc.createElementNS(SVGNS, "g");
    const precision = drawable.options.fixedDecimalPlaceDigits;
    for (const drawing of sets) {
      let path = null;
      switch (drawing.type) {
        case "path": {
          path = doc.createElementNS(SVGNS, "path");
          path.setAttribute("d", this.opsToPath(drawing, precision));
          path.setAttribute("stroke", o.stroke);
          path.setAttribute("stroke-width", o.strokeWidth + "");
          path.setAttribute("fill", "none");
          if (o.strokeLineDash) {
            path.setAttribute("stroke-dasharray", o.strokeLineDash.join(" ").trim());
          }
          if (o.strokeLineDashOffset) {
            path.setAttribute("stroke-dashoffset", `${o.strokeLineDashOffset}`);
          }
          break;
        }
        case "fillPath": {
          path = doc.createElementNS(SVGNS, "path");
          path.setAttribute("d", this.opsToPath(drawing, precision));
          path.setAttribute("stroke", "none");
          path.setAttribute("stroke-width", "0");
          path.setAttribute("fill", o.fill || "");
          if (drawable.shape === "curve" || drawable.shape === "polygon") {
            path.setAttribute("fill-rule", "evenodd");
          }
          break;
        }
        case "fillSketch": {
          path = this.fillSketch(doc, drawing, o);
          break;
        }
      }
      if (path) {
        g.appendChild(path);
      }
    }
    return g;
  }
  fillSketch(doc, drawing, o) {
    let fweight = o.fillWeight;
    if (fweight < 0) {
      fweight = o.strokeWidth / 2;
    }
    const path = doc.createElementNS(SVGNS, "path");
    path.setAttribute("d", this.opsToPath(drawing, o.fixedDecimalPlaceDigits));
    path.setAttribute("stroke", o.fill || "");
    path.setAttribute("stroke-width", fweight + "");
    path.setAttribute("fill", "none");
    if (o.fillLineDash) {
      path.setAttribute("stroke-dasharray", o.fillLineDash.join(" ").trim());
    }
    if (o.fillLineDashOffset) {
      path.setAttribute("stroke-dashoffset", `${o.fillLineDashOffset}`);
    }
    return path;
  }
  get generator() {
    return this.gen;
  }
  getDefaultOptions() {
    return this.gen.defaultOptions;
  }
  opsToPath(drawing, fixedDecimalPlaceDigits) {
    return this.gen.opsToPath(drawing, fixedDecimalPlaceDigits);
  }
  line(x1, y1, x2, y2, options) {
    const d = this.gen.line(x1, y1, x2, y2, options);
    return this.draw(d);
  }
  rectangle(x, y, width, height, options) {
    const d = this.gen.rectangle(x, y, width, height, options);
    return this.draw(d);
  }
  ellipse(x, y, width, height, options) {
    const d = this.gen.ellipse(x, y, width, height, options);
    return this.draw(d);
  }
  circle(x, y, diameter, options) {
    const d = this.gen.circle(x, y, diameter, options);
    return this.draw(d);
  }
  linearPath(points, options) {
    const d = this.gen.linearPath(points, options);
    return this.draw(d);
  }
  polygon(points, options) {
    const d = this.gen.polygon(points, options);
    return this.draw(d);
  }
  arc(x, y, width, height, start, stop, closed = false, options) {
    const d = this.gen.arc(x, y, width, height, start, stop, closed, options);
    return this.draw(d);
  }
  curve(points, options) {
    const d = this.gen.curve(points, options);
    return this.draw(d);
  }
  path(d, options) {
    const drawing = this.gen.path(d, options);
    return this.draw(drawing);
  }
};

// ../../node_modules/roughjs/bin/rough.js
var rough_default = {
  canvas(canvas, config) {
    return new RoughCanvas(canvas, config);
  },
  svg(svg, config) {
    return new RoughSVG(svg, config);
  },
  generator(config) {
    return new RoughGenerator(config);
  },
  newSeed() {
    return RoughGenerator.newSeed();
  }
};

// src/bounds.ts
import {
  arrayToMap as arrayToMap6,
  invariant as invariant7,
  rescalePoints,
  sizeOf
} from "@excalidraw/common";
import {
  degreesToRadians,
  lineSegment as lineSegment5,
  pointDistance as pointDistance7,
  pointFrom as pointFrom12,
  pointFromArray as pointFromArray3,
  pointRotateRads as pointRotateRads10
} from "@excalidraw/math";

// ../utils/src/shape.ts
init_define_import_meta_env();
import { invariant } from "@excalidraw/common";
import {
  curve as curve2,
  lineSegment,
  pointFrom,
  pointDistance,
  pointFromArray,
  pointFromVector,
  pointRotateRads,
  polygon as polygon2,
  polygonFromPoints,
  PRECISION,
  segmentsIntersectAt,
  vector,
  vectorAdd,
  vectorFromPoint,
  vectorScale
} from "@excalidraw/math";
import { getElementAbsoluteCoords } from "@excalidraw/element";
var getPolygonShape = (element) => {
  const { angle, width, height, x, y } = element;
  const cx = x + width / 2;
  const cy = y + height / 2;
  const center = pointFrom(cx, cy);
  let data;
  if (element.type === "diamond") {
    data = polygon2(
      pointRotateRads(pointFrom(cx, y), center, angle),
      pointRotateRads(pointFrom(x + width, cy), center, angle),
      pointRotateRads(pointFrom(cx, y + height), center, angle),
      pointRotateRads(pointFrom(x, cy), center, angle)
    );
  } else {
    data = polygon2(
      pointRotateRads(pointFrom(x, y), center, angle),
      pointRotateRads(pointFrom(x + width, y), center, angle),
      pointRotateRads(pointFrom(x + width, y + height), center, angle),
      pointRotateRads(pointFrom(x, y + height), center, angle)
    );
  }
  return {
    type: "polygon",
    data
  };
};
var getEllipseShape = (element) => {
  const { width, height, angle, x, y } = element;
  return {
    type: "ellipse",
    data: {
      center: pointFrom(x + width / 2, y + height / 2),
      angle,
      halfWidth: width / 2,
      halfHeight: height / 2
    }
  };
};
var getCurvePathOps = (shape) => {
  if (!shape) {
    return [];
  }
  for (const set of shape.sets) {
    if (set.type === "path") {
      return set.ops;
    }
  }
  return shape.sets[0].ops;
};
var getCurveShape = (roughShape, startingPoint = pointFrom(0, 0), angleInRadian, center) => {
  const transform = (p) => pointRotateRads(
    pointFrom(p[0] + startingPoint[0], p[1] + startingPoint[1]),
    center,
    angleInRadian
  );
  const ops = getCurvePathOps(roughShape);
  const polycurve = [];
  let p0 = pointFrom(0, 0);
  for (const op of ops) {
    if (op.op === "move") {
      const p = pointFromArray(op.data);
      invariant(p != null, "Ops data is not a point");
      p0 = transform(p);
    }
    if (op.op === "bcurveTo") {
      const p1 = transform(pointFrom(op.data[0], op.data[1]));
      const p2 = transform(pointFrom(op.data[2], op.data[3]));
      const p3 = transform(pointFrom(op.data[4], op.data[5]));
      polycurve.push(curve2(p0, p1, p2, p3));
      p0 = p3;
    }
  }
  return {
    type: "polycurve",
    data: polycurve
  };
};
var polylineFromPoints = (points) => {
  let previousPoint = points[0];
  const polyline = [];
  for (let i = 1; i < points.length; i++) {
    const nextPoint = points[i];
    polyline.push(lineSegment(previousPoint, nextPoint));
    previousPoint = nextPoint;
  }
  return polyline;
};
var getFreedrawShape = (element, center, isClosed = false) => {
  const transform = (p) => pointRotateRads(
    pointFromVector(
      vectorAdd(vectorFromPoint(p), vector(element.x, element.y))
    ),
    center,
    element.angle
  );
  const polyline = polylineFromPoints(
    element.points.map((p) => transform(p))
  );
  return isClosed ? {
    type: "polygon",
    data: polygonFromPoints(polyline.flat())
  } : {
    type: "polyline",
    data: polyline
  };
};
var getClosedCurveShape = (element, roughShape, startingPoint = pointFrom(0, 0), angleInRadian, center) => {
  const transform = (p) => pointRotateRads(
    pointFrom(p[0] + startingPoint[0], p[1] + startingPoint[1]),
    center,
    angleInRadian
  );
  if (element.roundness === null) {
    return {
      type: "polygon",
      data: polygonFromPoints(
        element.points.map((p) => transform(p))
      )
    };
  }
  const ops = getCurvePathOps(roughShape);
  const points = [];
  let odd = false;
  for (const operation of ops) {
    if (operation.op === "move") {
      odd = !odd;
      if (odd) {
        points.push(pointFrom(operation.data[0], operation.data[1]));
      }
    } else if (operation.op === "bcurveTo") {
      if (odd) {
        points.push(pointFrom(operation.data[0], operation.data[1]));
        points.push(pointFrom(operation.data[2], operation.data[3]));
        points.push(pointFrom(operation.data[4], operation.data[5]));
      }
    } else if (operation.op === "lineTo") {
      if (odd) {
        points.push(pointFrom(operation.data[0], operation.data[1]));
      }
    }
  }
  const polygonPoints = pointsOnBezierCurves(points, 10, 5).map(
    (p) => transform(p)
  );
  return {
    type: "polygon",
    data: polygonFromPoints(polygonPoints)
  };
};

// src/shape.ts
init_define_import_meta_env();
import {
  pointFrom as pointFrom11,
  pointDistance as pointDistance6,
  pointRotateRads as pointRotateRads9
} from "@excalidraw/math";
import {
  ROUGHNESS,
  isTransparent as isTransparent2,
  assertNever as assertNever2,
  COLOR_PALETTE,
  LINE_POLYGON_POINT_MERGE_DISTANCE
} from "@excalidraw/common";

// src/renderElement.ts
init_define_import_meta_env();

// ../../node_modules/perfect-freehand/dist/esm/index.js
init_define_import_meta_env();
function $(e, t, u, x = (h) => h) {
  return e * x(0.5 - t * (0.5 - u));
}
function se(e) {
  return [-e[0], -e[1]];
}
function l(e, t) {
  return [e[0] + t[0], e[1] + t[1]];
}
function a(e, t) {
  return [e[0] - t[0], e[1] - t[1]];
}
function b(e, t) {
  return [e[0] * t, e[1] * t];
}
function he(e, t) {
  return [e[0] / t, e[1] / t];
}
function R(e) {
  return [e[1], -e[0]];
}
function B(e, t) {
  return e[0] * t[0] + e[1] * t[1];
}
function ue(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}
function ge(e) {
  return Math.hypot(e[0], e[1]);
}
function de(e) {
  return e[0] * e[0] + e[1] * e[1];
}
function A(e, t) {
  return de(a(e, t));
}
function G(e) {
  return he(e, ge(e));
}
function ie(e, t) {
  return Math.hypot(e[1] - t[1], e[0] - t[0]);
}
function L(e, t, u) {
  let x = Math.sin(u), h = Math.cos(u), y = e[0] - t[0], n = e[1] - t[1], f = y * h - n * x, d = y * x + n * h;
  return [f + t[0], d + t[1]];
}
function K(e, t, u) {
  return l(e, b(a(t, e), u));
}
function ee(e, t, u) {
  return l(e, b(t, u));
}
var { min: C, PI: xe } = Math;
var pe = 0.275;
var V = xe + 1e-4;
function ce(e, t = {}) {
  let { size: u = 16, smoothing: x = 0.5, thinning: h = 0.5, simulatePressure: y = true, easing: n = (r) => r, start: f = {}, end: d = {}, last: D = false } = t, { cap: S = true, easing: j = (r) => r * (2 - r) } = f, { cap: q = true, easing: c = (r) => --r * r * r + 1 } = d;
  if (e.length === 0 || u <= 0)
    return [];
  let p = e[e.length - 1].runningLength, g = f.taper === false ? 0 : f.taper === true ? Math.max(u, p) : f.taper, T = d.taper === false ? 0 : d.taper === true ? Math.max(u, p) : d.taper, te = Math.pow(u * x, 2), _ = [], M = [], H = e.slice(0, 10).reduce((r, i) => {
    let o = i.pressure;
    if (y) {
      let s = C(1, i.distance / u), W = C(1, 1 - s);
      o = C(1, r + (W - r) * (s * pe));
    }
    return (r + o) / 2;
  }, e[0].pressure), m = $(u, h, e[e.length - 1].pressure, n), U, X = e[0].vector, z = e[0].point, F = z, O = z, E = F, J = false;
  for (let r = 0; r < e.length; r++) {
    let { pressure: i } = e[r], { point: o, vector: s, distance: W, runningLength: I } = e[r];
    if (r < e.length - 1 && p - I < 3)
      continue;
    if (h) {
      if (y) {
        let v = C(1, W / u), Z = C(1, 1 - v);
        i = C(1, H + (Z - H) * (v * pe));
      }
      m = $(u, h, i, n);
    } else
      m = u / 2;
    U === void 0 && (U = m);
    let le = I < g ? j(I / g) : 1, fe = p - I < T ? c((p - I) / T) : 1;
    m = Math.max(0.01, m * Math.min(le, fe));
    let re = (r < e.length - 1 ? e[r + 1] : e[r]).vector, Y = r < e.length - 1 ? B(s, re) : 1, be = B(s, X) < 0 && !J, ne = Y !== null && Y < 0;
    if (be || ne) {
      let v = b(R(X), m);
      for (let Z = 1 / 13, w = 0; w <= 1; w += Z)
        O = L(a(o, v), o, V * w), _.push(O), E = L(l(o, v), o, V * -w), M.push(E);
      z = O, F = E, ne && (J = true);
      continue;
    }
    if (J = false, r === e.length - 1) {
      let v = b(R(s), m);
      _.push(a(o, v)), M.push(l(o, v));
      continue;
    }
    let oe = b(R(K(re, s, Y)), m);
    O = a(o, oe), (r <= 1 || A(z, O) > te) && (_.push(O), z = O), E = l(o, oe), (r <= 1 || A(F, E) > te) && (M.push(E), F = E), H = i, X = s;
  }
  let P = e[0].point.slice(0, 2), k = e.length > 1 ? e[e.length - 1].point.slice(0, 2) : l(e[0].point, [1, 1]), Q = [], N = [];
  if (e.length === 1) {
    if (!(g || T) || D) {
      let r = ee(P, G(R(a(P, k))), -(U || m)), i = [];
      for (let o = 1 / 13, s = o; s <= 1; s += o)
        i.push(L(r, P, V * 2 * s));
      return i;
    }
  } else {
    if (!(g || T && e.length === 1))
      if (S)
        for (let i = 1 / 13, o = i; o <= 1; o += i) {
          let s = L(M[0], P, V * o);
          Q.push(s);
        }
      else {
        let i = a(_[0], M[0]), o = b(i, 0.5), s = b(i, 0.51);
        Q.push(a(P, o), a(P, s), l(P, s), l(P, o));
      }
    let r = R(se(e[e.length - 1].vector));
    if (T || g && e.length === 1)
      N.push(k);
    else if (q) {
      let i = ee(k, r, m);
      for (let o = 1 / 29, s = o; s < 1; s += o)
        N.push(L(i, k, V * 3 * s));
    } else
      N.push(l(k, b(r, m)), l(k, b(r, m * 0.99)), a(k, b(r, m * 0.99)), a(k, b(r, m)));
  }
  return _.concat(N, M.reverse(), Q);
}
function me(e, t = {}) {
  var q;
  let { streamline: u = 0.5, size: x = 16, last: h = false } = t;
  if (e.length === 0)
    return [];
  let y = 0.15 + (1 - u) * 0.85, n = Array.isArray(e[0]) ? e : e.map(({ x: c, y: p, pressure: g = 0.5 }) => [c, p, g]);
  if (n.length === 2) {
    let c = n[1];
    n = n.slice(0, -1);
    for (let p = 1; p < 5; p++)
      n.push(K(n[0], c, p / 4));
  }
  n.length === 1 && (n = [...n, [...l(n[0], [1, 1]), ...n[0].slice(2)]]);
  let f = [{ point: [n[0][0], n[0][1]], pressure: n[0][2] >= 0 ? n[0][2] : 0.25, vector: [1, 1], distance: 0, runningLength: 0 }], d = false, D = 0, S = f[0], j = n.length - 1;
  for (let c = 1; c < n.length; c++) {
    let p = h && c === j ? n[c].slice(0, 2) : K(S.point, n[c], y);
    if (ue(S.point, p))
      continue;
    let g = ie(p, S.point);
    if (D += g, c < j && !d) {
      if (D < x)
        continue;
      d = true;
    }
    S = { point: p, pressure: n[c][2] >= 0 ? n[c][2] : 0.5, vector: G(a(S.point, p)), distance: g, runningLength: D }, f.push(S);
  }
  return f[0].vector = ((q = f[1]) == null ? void 0 : q.vector) || [0, 0], f;
}
function ae(e, t = {}) {
  return ce(me(e, t), t);
}

// src/renderElement.ts
import { isRightAngleRads } from "@excalidraw/math";
import {
  BOUND_TEXT_PADDING as BOUND_TEXT_PADDING3,
  DEFAULT_REDUCED_GLOBAL_ALPHA,
  ELEMENT_READY_TO_ERASE_OPACITY,
  FRAME_STYLE,
  MIME_TYPES,
  THEME,
  distance as distance2,
  getFontString as getFontString3,
  isRTL,
  getVerticalOffset
} from "@excalidraw/common";

// src/cropElement.ts
init_define_import_meta_env();
import {
  pointFrom as pointFrom2,
  pointCenter,
  pointRotateRads as pointRotateRads2,
  vectorFromPoint as vectorFromPoint2,
  vectorNormalize,
  vectorSubtract,
  vectorAdd as vectorAdd2,
  vectorScale as vectorScale2,
  pointFromVector as pointFromVector2,
  clamp,
  isCloseTo
} from "@excalidraw/math";
var MINIMAL_CROP_SIZE = 10;
var cropElement = (element, elementsMap, transformHandle, naturalWidth, naturalHeight, pointerX, pointerY, widthAspectRatio) => {
  const { width: uncroppedWidth, height: uncroppedHeight } = getUncroppedWidthAndHeight(element);
  const naturalWidthToUncropped = naturalWidth / uncroppedWidth;
  const naturalHeightToUncropped = naturalHeight / uncroppedHeight;
  const croppedLeft = (element.crop?.x ?? 0) / naturalWidthToUncropped;
  const croppedTop = (element.crop?.y ?? 0) / naturalHeightToUncropped;
  const rotatedPointer = pointRotateRads2(
    pointFrom2(pointerX, pointerY),
    elementCenterPoint(element, elementsMap),
    -element.angle
  );
  pointerX = rotatedPointer[0];
  pointerY = rotatedPointer[1];
  let nextWidth = element.width;
  let nextHeight = element.height;
  let crop = element.crop ?? {
    x: 0,
    y: 0,
    width: naturalWidth,
    height: naturalHeight,
    naturalWidth,
    naturalHeight
  };
  const previousCropHeight = crop.height;
  const previousCropWidth = crop.width;
  const isFlippedByX = element.scale[0] === -1;
  const isFlippedByY = element.scale[1] === -1;
  let changeInHeight = pointerY - element.y;
  let changeInWidth = pointerX - element.x;
  if (transformHandle.includes("n")) {
    nextHeight = clamp(
      element.height - changeInHeight,
      MINIMAL_CROP_SIZE,
      isFlippedByY ? uncroppedHeight - croppedTop : element.height + croppedTop
    );
  }
  if (transformHandle.includes("s")) {
    changeInHeight = pointerY - element.y - element.height;
    nextHeight = clamp(
      element.height + changeInHeight,
      MINIMAL_CROP_SIZE,
      isFlippedByY ? element.height + croppedTop : uncroppedHeight - croppedTop
    );
  }
  if (transformHandle.includes("e")) {
    changeInWidth = pointerX - element.x - element.width;
    nextWidth = clamp(
      element.width + changeInWidth,
      MINIMAL_CROP_SIZE,
      isFlippedByX ? element.width + croppedLeft : uncroppedWidth - croppedLeft
    );
  }
  if (transformHandle.includes("w")) {
    nextWidth = clamp(
      element.width - changeInWidth,
      MINIMAL_CROP_SIZE,
      isFlippedByX ? uncroppedWidth - croppedLeft : element.width + croppedLeft
    );
  }
  const updateCropWidthAndHeight = (crop2) => {
    crop2.height = nextHeight * naturalHeightToUncropped;
    crop2.width = nextWidth * naturalWidthToUncropped;
  };
  updateCropWidthAndHeight(crop);
  const adjustFlipForHandle = (handle, crop2) => {
    updateCropWidthAndHeight(crop2);
    if (handle.includes("n")) {
      if (!isFlippedByY) {
        crop2.y += previousCropHeight - crop2.height;
      }
    }
    if (handle.includes("s")) {
      if (isFlippedByY) {
        crop2.y += previousCropHeight - crop2.height;
      }
    }
    if (handle.includes("e")) {
      if (isFlippedByX) {
        crop2.x += previousCropWidth - crop2.width;
      }
    }
    if (handle.includes("w")) {
      if (!isFlippedByX) {
        crop2.x += previousCropWidth - crop2.width;
      }
    }
  };
  switch (transformHandle) {
    case "n": {
      if (widthAspectRatio) {
        const distanceToLeft = croppedLeft + element.width / 2;
        const distanceToRight = uncroppedWidth - croppedLeft - element.width / 2;
        const MAX_WIDTH = Math.min(distanceToLeft, distanceToRight) * 2;
        nextWidth = clamp(
          nextHeight * widthAspectRatio,
          MINIMAL_CROP_SIZE,
          MAX_WIDTH
        );
        nextHeight = nextWidth / widthAspectRatio;
      }
      adjustFlipForHandle(transformHandle, crop);
      if (widthAspectRatio) {
        crop.x += (previousCropWidth - crop.width) / 2;
      }
      break;
    }
    case "s": {
      if (widthAspectRatio) {
        const distanceToLeft = croppedLeft + element.width / 2;
        const distanceToRight = uncroppedWidth - croppedLeft - element.width / 2;
        const MAX_WIDTH = Math.min(distanceToLeft, distanceToRight) * 2;
        nextWidth = clamp(
          nextHeight * widthAspectRatio,
          MINIMAL_CROP_SIZE,
          MAX_WIDTH
        );
        nextHeight = nextWidth / widthAspectRatio;
      }
      adjustFlipForHandle(transformHandle, crop);
      if (widthAspectRatio) {
        crop.x += (previousCropWidth - crop.width) / 2;
      }
      break;
    }
    case "w": {
      if (widthAspectRatio) {
        const distanceToTop = croppedTop + element.height / 2;
        const distanceToBottom = uncroppedHeight - croppedTop - element.height / 2;
        const MAX_HEIGHT = Math.min(distanceToTop, distanceToBottom) * 2;
        nextHeight = clamp(
          nextWidth / widthAspectRatio,
          MINIMAL_CROP_SIZE,
          MAX_HEIGHT
        );
        nextWidth = nextHeight * widthAspectRatio;
      }
      adjustFlipForHandle(transformHandle, crop);
      if (widthAspectRatio) {
        crop.y += (previousCropHeight - crop.height) / 2;
      }
      break;
    }
    case "e": {
      if (widthAspectRatio) {
        const distanceToTop = croppedTop + element.height / 2;
        const distanceToBottom = uncroppedHeight - croppedTop - element.height / 2;
        const MAX_HEIGHT = Math.min(distanceToTop, distanceToBottom) * 2;
        nextHeight = clamp(
          nextWidth / widthAspectRatio,
          MINIMAL_CROP_SIZE,
          MAX_HEIGHT
        );
        nextWidth = nextHeight * widthAspectRatio;
      }
      adjustFlipForHandle(transformHandle, crop);
      if (widthAspectRatio) {
        crop.y += (previousCropHeight - crop.height) / 2;
      }
      break;
    }
    case "ne": {
      if (widthAspectRatio) {
        if (changeInWidth > -changeInHeight) {
          const MAX_HEIGHT = isFlippedByY ? uncroppedHeight - croppedTop : croppedTop + element.height;
          nextHeight = clamp(
            nextWidth / widthAspectRatio,
            MINIMAL_CROP_SIZE,
            MAX_HEIGHT
          );
          nextWidth = nextHeight * widthAspectRatio;
        } else {
          const MAX_WIDTH = isFlippedByX ? croppedLeft + element.width : uncroppedWidth - croppedLeft;
          nextWidth = clamp(
            nextHeight * widthAspectRatio,
            MINIMAL_CROP_SIZE,
            MAX_WIDTH
          );
          nextHeight = nextWidth / widthAspectRatio;
        }
      }
      adjustFlipForHandle(transformHandle, crop);
      break;
    }
    case "nw": {
      if (widthAspectRatio) {
        if (changeInWidth < changeInHeight) {
          const MAX_HEIGHT = isFlippedByY ? uncroppedHeight - croppedTop : croppedTop + element.height;
          nextHeight = clamp(
            nextWidth / widthAspectRatio,
            MINIMAL_CROP_SIZE,
            MAX_HEIGHT
          );
          nextWidth = nextHeight * widthAspectRatio;
        } else {
          const MAX_WIDTH = isFlippedByX ? uncroppedWidth - croppedLeft : croppedLeft + element.width;
          nextWidth = clamp(
            nextHeight * widthAspectRatio,
            MINIMAL_CROP_SIZE,
            MAX_WIDTH
          );
          nextHeight = nextWidth / widthAspectRatio;
        }
      }
      adjustFlipForHandle(transformHandle, crop);
      break;
    }
    case "se": {
      if (widthAspectRatio) {
        if (changeInWidth > changeInHeight) {
          const MAX_HEIGHT = isFlippedByY ? croppedTop + element.height : uncroppedHeight - croppedTop;
          nextHeight = clamp(
            nextWidth / widthAspectRatio,
            MINIMAL_CROP_SIZE,
            MAX_HEIGHT
          );
          nextWidth = nextHeight * widthAspectRatio;
        } else {
          const MAX_WIDTH = isFlippedByX ? croppedLeft + element.width : uncroppedWidth - croppedLeft;
          nextWidth = clamp(
            nextHeight * widthAspectRatio,
            MINIMAL_CROP_SIZE,
            MAX_WIDTH
          );
          nextHeight = nextWidth / widthAspectRatio;
        }
      }
      adjustFlipForHandle(transformHandle, crop);
      break;
    }
    case "sw": {
      if (widthAspectRatio) {
        if (-changeInWidth > changeInHeight) {
          const MAX_HEIGHT = isFlippedByY ? croppedTop + element.height : uncroppedHeight - croppedTop;
          nextHeight = clamp(
            nextWidth / widthAspectRatio,
            MINIMAL_CROP_SIZE,
            MAX_HEIGHT
          );
          nextWidth = nextHeight * widthAspectRatio;
        } else {
          const MAX_WIDTH = isFlippedByX ? uncroppedWidth - croppedLeft : croppedLeft + element.width;
          nextWidth = clamp(
            nextHeight * widthAspectRatio,
            MINIMAL_CROP_SIZE,
            MAX_WIDTH
          );
          nextHeight = nextWidth / widthAspectRatio;
        }
      }
      adjustFlipForHandle(transformHandle, crop);
      break;
    }
    default:
      break;
  }
  const newOrigin = recomputeOrigin(
    element,
    transformHandle,
    nextWidth,
    nextHeight,
    !!widthAspectRatio
  );
  if (isCloseTo(crop.width, crop.naturalWidth) && isCloseTo(crop.height, crop.naturalHeight)) {
    crop = null;
  }
  return {
    x: newOrigin[0],
    y: newOrigin[1],
    width: nextWidth,
    height: nextHeight,
    crop
  };
};
var recomputeOrigin = (stateAtCropStart, transformHandle, width, height, shouldMaintainAspectRatio) => {
  const [x1, y1, x2, y2] = getResizedElementAbsoluteCoords(
    stateAtCropStart,
    stateAtCropStart.width,
    stateAtCropStart.height,
    true
  );
  const startTopLeft = pointFrom2(x1, y1);
  const startBottomRight = pointFrom2(x2, y2);
  const startCenter = pointCenter(startTopLeft, startBottomRight);
  const [newBoundsX1, newBoundsY1, newBoundsX2, newBoundsY2] = getResizedElementAbsoluteCoords(stateAtCropStart, width, height, true);
  const newBoundsWidth = newBoundsX2 - newBoundsX1;
  const newBoundsHeight = newBoundsY2 - newBoundsY1;
  let newTopLeft = [...startTopLeft];
  if (["n", "w", "nw"].includes(transformHandle)) {
    newTopLeft = [
      startBottomRight[0] - Math.abs(newBoundsWidth),
      startBottomRight[1] - Math.abs(newBoundsHeight)
    ];
  }
  if (transformHandle === "ne") {
    const bottomLeft = [startTopLeft[0], startBottomRight[1]];
    newTopLeft = [bottomLeft[0], bottomLeft[1] - Math.abs(newBoundsHeight)];
  }
  if (transformHandle === "sw") {
    const topRight = [startBottomRight[0], startTopLeft[1]];
    newTopLeft = [topRight[0] - Math.abs(newBoundsWidth), topRight[1]];
  }
  if (shouldMaintainAspectRatio) {
    if (["s", "n"].includes(transformHandle)) {
      newTopLeft[0] = startCenter[0] - newBoundsWidth / 2;
    }
    if (["e", "w"].includes(transformHandle)) {
      newTopLeft[1] = startCenter[1] - newBoundsHeight / 2;
    }
  }
  const angle = stateAtCropStart.angle;
  const rotatedTopLeft = pointRotateRads2(newTopLeft, startCenter, angle);
  const newCenter = [
    newTopLeft[0] + Math.abs(newBoundsWidth) / 2,
    newTopLeft[1] + Math.abs(newBoundsHeight) / 2
  ];
  const rotatedNewCenter = pointRotateRads2(newCenter, startCenter, angle);
  newTopLeft = pointRotateRads2(
    rotatedTopLeft,
    rotatedNewCenter,
    -angle
  );
  const newOrigin = [...newTopLeft];
  newOrigin[0] += stateAtCropStart.x - newBoundsX1;
  newOrigin[1] += stateAtCropStart.y - newBoundsY1;
  return newOrigin;
};
var getUncroppedImageElement = (element, elementsMap) => {
  if (element.crop) {
    const { width, height } = getUncroppedWidthAndHeight(element);
    const [x1, y1, x2, y2, cx, cy] = getElementAbsoluteCoords2(
      element,
      elementsMap
    );
    const topLeftVector = vectorFromPoint2(
      pointRotateRads2(pointFrom2(x1, y1), pointFrom2(cx, cy), element.angle)
    );
    const topRightVector = vectorFromPoint2(
      pointRotateRads2(pointFrom2(x2, y1), pointFrom2(cx, cy), element.angle)
    );
    const topEdgeNormalized = vectorNormalize(
      vectorSubtract(topRightVector, topLeftVector)
    );
    const bottomLeftVector = vectorFromPoint2(
      pointRotateRads2(pointFrom2(x1, y2), pointFrom2(cx, cy), element.angle)
    );
    const leftEdgeVector = vectorSubtract(bottomLeftVector, topLeftVector);
    const leftEdgeNormalized = vectorNormalize(leftEdgeVector);
    const { cropX, cropY } = adjustCropPosition(element.crop, element.scale);
    const rotatedTopLeft = vectorAdd2(
      vectorAdd2(
        topLeftVector,
        vectorScale2(
          topEdgeNormalized,
          -cropX * width / element.crop.naturalWidth
        )
      ),
      vectorScale2(
        leftEdgeNormalized,
        -cropY * height / element.crop.naturalHeight
      )
    );
    const center = pointFromVector2(
      vectorAdd2(
        vectorAdd2(rotatedTopLeft, vectorScale2(topEdgeNormalized, width / 2)),
        vectorScale2(leftEdgeNormalized, height / 2)
      )
    );
    const unrotatedTopLeft = pointRotateRads2(
      pointFromVector2(rotatedTopLeft),
      center,
      -element.angle
    );
    const uncroppedElement = {
      ...element,
      x: unrotatedTopLeft[0],
      y: unrotatedTopLeft[1],
      width,
      height,
      crop: null
    };
    return uncroppedElement;
  }
  return element;
};
var getUncroppedWidthAndHeight = (element) => {
  if (element.crop) {
    const width = element.width / (element.crop.width / element.crop.naturalWidth);
    const height = element.height / (element.crop.height / element.crop.naturalHeight);
    return {
      width,
      height
    };
  }
  return {
    width: element.width,
    height: element.height
  };
};
var adjustCropPosition = (crop, scale) => {
  let cropX = crop.x;
  let cropY = crop.y;
  const flipX = scale[0] === -1;
  const flipY = scale[1] === -1;
  if (flipX) {
    cropX = crop.naturalWidth - Math.abs(cropX) - crop.width;
  }
  if (flipY) {
    cropY = crop.naturalHeight - Math.abs(cropY) - crop.height;
  }
  return {
    cropX,
    cropY
  };
};
var getFlipAdjustedCropPosition = (element, natural = false) => {
  const crop = element.crop;
  if (!crop) {
    return null;
  }
  const isFlippedByX = element.scale[0] === -1;
  const isFlippedByY = element.scale[1] === -1;
  let cropX = crop.x;
  let cropY = crop.y;
  if (isFlippedByX) {
    cropX = crop.naturalWidth - crop.width - crop.x;
  }
  if (isFlippedByY) {
    cropY = crop.naturalHeight - crop.height - crop.y;
  }
  if (natural) {
    return {
      x: cropX,
      y: cropY
    };
  }
  const { width, height } = getUncroppedWidthAndHeight(element);
  return {
    x: cropX / (crop.naturalWidth / width),
    y: cropY / (crop.naturalHeight / height)
  };
};

// src/linearElementEditor.ts
init_define_import_meta_env();
import {
  pointCenter as pointCenter2,
  pointFrom as pointFrom8,
  pointRotateRads as pointRotateRads7,
  pointsEqual as pointsEqual6,
  pointDistance as pointDistance5,
  vectorFromPoint as vectorFromPoint7,
  curveLength,
  curvePointAtLength
} from "@excalidraw/math";
import {
  DRAGGING_THRESHOLD,
  KEYS as KEYS2,
  shouldRotateWithDiscreteAngle,
  getGridPoint,
  invariant as invariant6,
  tupleToCoors as tupleToCoors3,
  viewportCoordsToSceneCoords
} from "@excalidraw/common";
import {
  deconstructLinearOrFreeDrawElement as deconstructLinearOrFreeDrawElement2,
  isPathALoop as isPathALoop2
} from "@excalidraw/element";

// src/binding.ts
init_define_import_meta_env();
import {
  KEYS,
  arrayToMap as arrayToMap2,
  isBindingFallthroughEnabled,
  tupleToCoors as tupleToCoors2,
  invariant as invariant5,
  isDevEnv as isDevEnv4,
  isTestEnv as isTestEnv4
} from "@excalidraw/common";
import {
  lineSegment as lineSegment4,
  pointFrom as pointFrom7,
  pointRotateRads as pointRotateRads6,
  vectorFromPoint as vectorFromPoint6,
  pointDistanceSq,
  clamp as clamp3,
  pointDistance as pointDistance4,
  pointFromVector as pointFromVector5,
  vectorScale as vectorScale6,
  vectorNormalize as vectorNormalize3,
  vectorCross as vectorCross3,
  pointsEqual as pointsEqual5,
  lineSegmentIntersectionPoints as lineSegmentIntersectionPoints2,
  PRECISION as PRECISION2
} from "@excalidraw/math";

// src/collision.ts
init_define_import_meta_env();
import { isTransparent } from "@excalidraw/common";
import {
  curveIntersectLineSegment,
  isPointWithinBounds,
  lineSegment as lineSegment3,
  lineSegmentIntersectionPoints,
  pointFrom as pointFrom4,
  pointFromVector as pointFromVector3,
  pointRotateRads as pointRotateRads4,
  pointsEqual as pointsEqual2,
  vectorFromPoint as vectorFromPoint3,
  vectorNormalize as vectorNormalize2,
  vectorScale as vectorScale3
} from "@excalidraw/math";
import {
  ellipse as ellipse3,
  ellipseSegmentInterceptPoints
} from "@excalidraw/math/ellipse";

// src/utils.ts
init_define_import_meta_env();
import {
  DEFAULT_ADAPTIVE_RADIUS,
  DEFAULT_PROPORTIONAL_RADIUS,
  LINE_CONFIRM_THRESHOLD,
  ROUNDNESS
} from "@excalidraw/common";
import {
  curve as curve3,
  curveCatmullRomCubicApproxPoints,
  curveOffsetPoints,
  lineSegment as lineSegment2,
  pointDistance as pointDistance2,
  pointFrom as pointFrom3,
  pointFromArray as pointFromArray2,
  rectangle as rectangle2
} from "@excalidraw/math";
var ElementShapesCache = /* @__PURE__ */ new WeakMap();
var getElementShapesCacheEntry = (element, offset) => {
  const record = ElementShapesCache.get(element);
  if (!record) {
    return void 0;
  }
  const { version, shapes } = record;
  if (version !== element.version) {
    ElementShapesCache.delete(element);
    return void 0;
  }
  return shapes.get(offset);
};
var setElementShapesCacheEntry = (element, shape, offset) => {
  const record = ElementShapesCache.get(element);
  if (!record) {
    ElementShapesCache.set(element, {
      version: element.version,
      shapes: /* @__PURE__ */ new Map([[offset, shape]])
    });
    return;
  }
  const { version, shapes } = record;
  if (version !== element.version) {
    ElementShapesCache.set(element, {
      version: element.version,
      shapes: /* @__PURE__ */ new Map([[offset, shape]])
    });
    return;
  }
  shapes.set(offset, shape);
};
function deconstructLinearOrFreeDrawElement(element) {
  const cachedShape = getElementShapesCacheEntry(element, 0);
  if (cachedShape) {
    return cachedShape;
  }
  const ops = generateLinearCollisionShape(element);
  const lines = [];
  const curves = [];
  for (let idx = 0; idx < ops.length; idx += 1) {
    const op = ops[idx];
    const prevPoint = ops[idx - 1] && pointFromArray2(ops[idx - 1].data.slice(-2));
    switch (op.op) {
      case "move":
        continue;
      case "lineTo":
        if (!prevPoint) {
          throw new Error("prevPoint is undefined");
        }
        lines.push(
          lineSegment2(
            pointFrom3(
              element.x + prevPoint[0],
              element.y + prevPoint[1]
            ),
            pointFrom3(
              element.x + op.data[0],
              element.y + op.data[1]
            )
          )
        );
        continue;
      case "bcurveTo":
        if (!prevPoint) {
          throw new Error("prevPoint is undefined");
        }
        curves.push(
          curve3(
            pointFrom3(
              element.x + prevPoint[0],
              element.y + prevPoint[1]
            ),
            pointFrom3(
              element.x + op.data[0],
              element.y + op.data[1]
            ),
            pointFrom3(
              element.x + op.data[2],
              element.y + op.data[3]
            ),
            pointFrom3(
              element.x + op.data[4],
              element.y + op.data[5]
            )
          )
        );
        continue;
      default: {
        console.error("Unknown op type", op.op);
      }
    }
  }
  const shape = [lines, curves];
  setElementShapesCacheEntry(element, shape, 0);
  return shape;
}
function deconstructRectanguloidElement(element, offset = 0) {
  const cachedShape = getElementShapesCacheEntry(element, offset);
  if (cachedShape) {
    return cachedShape;
  }
  let radius = getCornerRadius(
    Math.min(element.width, element.height),
    element
  );
  if (radius === 0) {
    radius = 0.01;
  }
  const r = rectangle2(
    pointFrom3(element.x, element.y),
    pointFrom3(element.x + element.width, element.y + element.height)
  );
  const top = lineSegment2(
    pointFrom3(r[0][0] + radius, r[0][1]),
    pointFrom3(r[1][0] - radius, r[0][1])
  );
  const right = lineSegment2(
    pointFrom3(r[1][0], r[0][1] + radius),
    pointFrom3(r[1][0], r[1][1] - radius)
  );
  const bottom = lineSegment2(
    pointFrom3(r[0][0] + radius, r[1][1]),
    pointFrom3(r[1][0] - radius, r[1][1])
  );
  const left = lineSegment2(
    pointFrom3(r[0][0], r[1][1] - radius),
    pointFrom3(r[0][0], r[0][1] + radius)
  );
  const baseCorners = [
    curve3(
      left[1],
      pointFrom3(
        left[1][0] + 2 / 3 * (r[0][0] - left[1][0]),
        left[1][1] + 2 / 3 * (r[0][1] - left[1][1])
      ),
      pointFrom3(
        top[0][0] + 2 / 3 * (r[0][0] - top[0][0]),
        top[0][1] + 2 / 3 * (r[0][1] - top[0][1])
      ),
      top[0]
    ),
    // TOP LEFT
    curve3(
      top[1],
      pointFrom3(
        top[1][0] + 2 / 3 * (r[1][0] - top[1][0]),
        top[1][1] + 2 / 3 * (r[0][1] - top[1][1])
      ),
      pointFrom3(
        right[0][0] + 2 / 3 * (r[1][0] - right[0][0]),
        right[0][1] + 2 / 3 * (r[0][1] - right[0][1])
      ),
      right[0]
    ),
    // TOP RIGHT
    curve3(
      right[1],
      pointFrom3(
        right[1][0] + 2 / 3 * (r[1][0] - right[1][0]),
        right[1][1] + 2 / 3 * (r[1][1] - right[1][1])
      ),
      pointFrom3(
        bottom[1][0] + 2 / 3 * (r[1][0] - bottom[1][0]),
        bottom[1][1] + 2 / 3 * (r[1][1] - bottom[1][1])
      ),
      bottom[1]
    ),
    // BOTTOM RIGHT
    curve3(
      bottom[0],
      pointFrom3(
        bottom[0][0] + 2 / 3 * (r[0][0] - bottom[0][0]),
        bottom[0][1] + 2 / 3 * (r[1][1] - bottom[0][1])
      ),
      pointFrom3(
        left[0][0] + 2 / 3 * (r[0][0] - left[0][0]),
        left[0][1] + 2 / 3 * (r[1][1] - left[0][1])
      ),
      left[0]
    )
    // BOTTOM LEFT
  ];
  const corners = offset > 0 ? baseCorners.map(
    (corner) => curveCatmullRomCubicApproxPoints(
      curveOffsetPoints(corner, offset)
    )
  ) : [
    [baseCorners[0]],
    [baseCorners[1]],
    [baseCorners[2]],
    [baseCorners[3]]
  ];
  const sides = [
    lineSegment2(
      corners[0][corners[0].length - 1][3],
      corners[1][0][0]
    ),
    lineSegment2(
      corners[1][corners[1].length - 1][3],
      corners[2][0][0]
    ),
    lineSegment2(
      corners[2][corners[2].length - 1][3],
      corners[3][0][0]
    ),
    lineSegment2(
      corners[3][corners[3].length - 1][3],
      corners[0][0][0]
    )
  ];
  const shape = [sides, corners.flat()];
  setElementShapesCacheEntry(element, shape, offset);
  return shape;
}
function deconstructDiamondElement(element, offset = 0) {
  const cachedShape = getElementShapesCacheEntry(element, offset);
  if (cachedShape) {
    return cachedShape;
  }
  const [topX, topY, rightX, rightY, bottomX, bottomY, leftX, leftY] = getDiamondPoints(element);
  const verticalRadius = element.roundness ? getCornerRadius(Math.abs(topX - leftX), element) : (topX - leftX) * 0.01;
  const horizontalRadius = element.roundness ? getCornerRadius(Math.abs(rightY - topY), element) : (rightY - topY) * 0.01;
  const [top, right, bottom, left] = [
    pointFrom3(element.x + topX, element.y + topY),
    pointFrom3(element.x + rightX, element.y + rightY),
    pointFrom3(element.x + bottomX, element.y + bottomY),
    pointFrom3(element.x + leftX, element.y + leftY)
  ];
  const baseCorners = [
    curve3(
      pointFrom3(
        right[0] - verticalRadius,
        right[1] - horizontalRadius
      ),
      right,
      right,
      pointFrom3(
        right[0] - verticalRadius,
        right[1] + horizontalRadius
      )
    ),
    // RIGHT
    curve3(
      pointFrom3(
        bottom[0] + verticalRadius,
        bottom[1] - horizontalRadius
      ),
      bottom,
      bottom,
      pointFrom3(
        bottom[0] - verticalRadius,
        bottom[1] - horizontalRadius
      )
    ),
    // BOTTOM
    curve3(
      pointFrom3(
        left[0] + verticalRadius,
        left[1] + horizontalRadius
      ),
      left,
      left,
      pointFrom3(
        left[0] + verticalRadius,
        left[1] - horizontalRadius
      )
    ),
    // LEFT
    curve3(
      pointFrom3(
        top[0] - verticalRadius,
        top[1] + horizontalRadius
      ),
      top,
      top,
      pointFrom3(
        top[0] + verticalRadius,
        top[1] + horizontalRadius
      )
    )
    // TOP
  ];
  const corners = offset > 0 ? baseCorners.map(
    (corner) => curveCatmullRomCubicApproxPoints(
      curveOffsetPoints(corner, offset)
    )
  ) : [
    [baseCorners[0]],
    [baseCorners[1]],
    [baseCorners[2]],
    [baseCorners[3]]
  ];
  const sides = [
    lineSegment2(
      corners[0][corners[0].length - 1][3],
      corners[1][0][0]
    ),
    lineSegment2(
      corners[1][corners[1].length - 1][3],
      corners[2][0][0]
    ),
    lineSegment2(
      corners[2][corners[2].length - 1][3],
      corners[3][0][0]
    ),
    lineSegment2(
      corners[3][corners[3].length - 1][3],
      corners[0][0][0]
    )
  ];
  const shape = [sides, corners.flat()];
  setElementShapesCacheEntry(element, shape, offset);
  return shape;
}
var isPathALoop = (points, zoomValue = 1) => {
  if (points.length >= 3) {
    const [first, last] = [points[0], points[points.length - 1]];
    const distance3 = pointDistance2(first, last);
    return distance3 <= LINE_CONFIRM_THRESHOLD / zoomValue;
  }
  return false;
};
var getCornerRadius = (x, element) => {
  if (element.roundness?.type === ROUNDNESS.PROPORTIONAL_RADIUS || element.roundness?.type === ROUNDNESS.LEGACY) {
    return x * DEFAULT_PROPORTIONAL_RADIUS;
  }
  if (element.roundness?.type === ROUNDNESS.ADAPTIVE_RADIUS) {
    const fixedRadiusSize = element.roundness?.value ?? DEFAULT_ADAPTIVE_RADIUS;
    const CUTOFF_SIZE = fixedRadiusSize / DEFAULT_PROPORTIONAL_RADIUS;
    if (x <= CUTOFF_SIZE) {
      return x * DEFAULT_PROPORTIONAL_RADIUS;
    }
    return fixedRadiusSize;
  }
  return 0;
};

// src/typeChecks.ts
init_define_import_meta_env();
import { ROUNDNESS as ROUNDNESS2, assertNever } from "@excalidraw/common";
import { pointsEqual } from "@excalidraw/math";
var isInitializedImageElement = (element) => {
  return !!element && element.type === "image" && !!element.fileId;
};
var isImageElement = (element) => {
  return !!element && element.type === "image";
};
var isEmbeddableElement = (element) => {
  return !!element && element.type === "embeddable";
};
var isIframeElement = (element) => {
  return !!element && element.type === "iframe";
};
var isIframeLikeElement = (element) => {
  return !!element && (element.type === "iframe" || element.type === "embeddable");
};
var isTextElement = (element) => {
  return element != null && element.type === "text";
};
var isFrameElement = (element) => {
  return element != null && element.type === "frame";
};
var isMagicFrameElement = (element) => {
  return element != null && element.type === "magicframe";
};
var isFrameLikeElement = (element) => {
  return element != null && (element.type === "frame" || element.type === "magicframe");
};
var isFreeDrawElement = (element) => {
  return element != null && isFreeDrawElementType(element.type);
};
var isFreeDrawElementType = (elementType) => {
  return elementType === "freedraw";
};
var isLinearElement = (element) => {
  return element != null && isLinearElementType(element.type);
};
var isLineElement = (element) => {
  return element != null && element.type === "line";
};
var isArrowElement = (element) => {
  return element != null && element.type === "arrow";
};
var isElbowArrow = (element) => {
  return isArrowElement(element) && element.elbowed;
};
var isSimpleArrow = (element) => {
  return isArrowElement(element) && !element.elbowed;
};
var isSharpArrow = (element) => {
  return isArrowElement(element) && !element.elbowed && !element.roundness;
};
var isCurvedArrow = (element) => {
  return isArrowElement(element) && !element.elbowed && element.roundness !== null;
};
var isLinearElementType = (elementType) => {
  return elementType === "arrow" || elementType === "line";
};
var isBindingElement = (element, includeLocked = true) => {
  return element != null && (!element.locked || includeLocked === true) && isBindingElementType(element.type);
};
var isBindingElementType = (elementType) => {
  return elementType === "arrow";
};
var isBindableElement = (element, includeLocked = true) => {
  return element != null && (!element.locked || includeLocked === true) && (element.type === "rectangle" || element.type === "diamond" || element.type === "ellipse" || element.type === "image" || element.type === "iframe" || element.type === "embeddable" || element.type === "frame" || element.type === "magicframe" || element.type === "text" && !element.containerId);
};
var isRectanguloidElement = (element) => {
  return element != null && (element.type === "rectangle" || element.type === "diamond" || element.type === "image" || element.type === "iframe" || element.type === "embeddable" || element.type === "frame" || element.type === "magicframe" || element.type === "text" && !element.containerId);
};
var isRectangularElement = (element) => {
  return element != null && (element.type === "rectangle" || element.type === "image" || element.type === "text" || element.type === "iframe" || element.type === "embeddable" || element.type === "frame" || element.type === "magicframe" || element.type === "freedraw");
};
var isTextBindableContainer = (element, includeLocked = true) => {
  return element != null && (!element.locked || includeLocked === true) && (element.type === "rectangle" || element.type === "diamond" || element.type === "ellipse" || isArrowElement(element));
};
var isExcalidrawElement = (element) => {
  const type = element?.type;
  if (!type) {
    return false;
  }
  switch (type) {
    case "text":
    case "diamond":
    case "rectangle":
    case "iframe":
    case "embeddable":
    case "ellipse":
    case "arrow":
    case "freedraw":
    case "line":
    case "frame":
    case "magicframe":
    case "image":
    case "selection": {
      return true;
    }
    default: {
      assertNever(type, null);
      return false;
    }
  }
};
var isFlowchartNodeElement = (element) => {
  return element.type === "rectangle" || element.type === "ellipse" || element.type === "diamond";
};
var hasBoundTextElement = (element) => {
  return isTextBindableContainer(element) && !!element.boundElements?.some(({ type }) => type === "text");
};
var isBoundToContainer = (element) => {
  return element !== null && "containerId" in element && element.containerId !== null && isTextElement(element);
};
var isArrowBoundToElement = (element) => {
  return !!element.startBinding || !!element.endBinding;
};
var isUsingAdaptiveRadius = (type) => type === "rectangle" || type === "embeddable" || type === "iframe" || type === "image";
var isUsingProportionalRadius = (type) => type === "line" || type === "arrow" || type === "diamond";
var canApplyRoundnessTypeToElement = (roundnessType, element) => {
  if ((roundnessType === ROUNDNESS2.ADAPTIVE_RADIUS || // if legacy roundness, it can be applied to elements that currently
  // use adaptive radius
  roundnessType === ROUNDNESS2.LEGACY) && isUsingAdaptiveRadius(element.type)) {
    return true;
  }
  if (roundnessType === ROUNDNESS2.PROPORTIONAL_RADIUS && isUsingProportionalRadius(element.type)) {
    return true;
  }
  return false;
};
var getDefaultRoundnessTypeForElement = (element) => {
  if (isUsingProportionalRadius(element.type)) {
    return {
      type: ROUNDNESS2.PROPORTIONAL_RADIUS
    };
  }
  if (isUsingAdaptiveRadius(element.type)) {
    return {
      type: ROUNDNESS2.ADAPTIVE_RADIUS
    };
  }
  return null;
};
var isFixedPointBinding = (binding) => {
  return Object.hasOwn(binding, "fixedPoint") && binding.fixedPoint != null;
};
var isBounds = (box) => Array.isArray(box) && box.length === 4 && typeof box[0] === "number" && typeof box[1] === "number" && typeof box[2] === "number" && typeof box[3] === "number";
var getLinearElementSubType = (element) => {
  if (isSharpArrow(element)) {
    return "sharpArrow";
  }
  if (isCurvedArrow(element)) {
    return "curvedArrow";
  }
  if (isElbowArrow(element)) {
    return "elbowArrow";
  }
  return "line";
};
var isValidPolygon = (points) => {
  return points.length > 3 && pointsEqual(points[0], points[points.length - 1]);
};
var canBecomePolygon = (points) => {
  return points.length > 3 || // 3-point polygons can't have all points in a single line
  points.length === 3 && !pointsEqual(points[0], points[points.length - 1]);
};

// src/textElement.ts
init_define_import_meta_env();
import {
  ARROW_LABEL_FONT_SIZE_TO_MIN_WIDTH_RATIO,
  ARROW_LABEL_WIDTH_FRACTION,
  BOUND_TEXT_PADDING as BOUND_TEXT_PADDING2,
  DEFAULT_FONT_SIZE as DEFAULT_FONT_SIZE2,
  TEXT_ALIGN,
  VERTICAL_ALIGN,
  getFontString as getFontString2,
  isProdEnv,
  invariant as invariant2
} from "@excalidraw/common";

// src/containerCache.ts
init_define_import_meta_env();
var originalContainerCache = {};
var updateOriginalContainerCache = (id, height) => {
  const data = originalContainerCache[id] || (originalContainerCache[id] = { height });
  data.height = height;
  return data;
};
var resetOriginalContainerCache = (id) => {
  if (originalContainerCache[id]) {
    delete originalContainerCache[id];
  }
};
var getOriginalContainerHeightFromCache = (id) => {
  return originalContainerCache[id]?.height ?? null;
};

// src/textMeasurements.ts
init_define_import_meta_env();
import {
  BOUND_TEXT_PADDING,
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_FAMILY,
  getFontString,
  isTestEnv,
  normalizeEOL
} from "@excalidraw/common";
var measureText = (text, font, lineHeight) => {
  const _text = text.split("\n").map((x) => x || " ").join("\n");
  const fontSize = parseFloat(font);
  const height = getTextHeight(_text, fontSize, lineHeight);
  const width = getTextWidth(_text, font);
  return { width, height };
};
var DUMMY_TEXT = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".toLocaleUpperCase();
var getApproxMinLineWidth = (font, lineHeight) => {
  const maxCharWidth = getMaxCharWidth(font);
  if (maxCharWidth === 0) {
    return measureText(DUMMY_TEXT.split("").join("\n"), font, lineHeight).width + BOUND_TEXT_PADDING * 2;
  }
  return maxCharWidth + BOUND_TEXT_PADDING * 2;
};
var getMinTextElementWidth = (font, lineHeight) => {
  return measureText("", font, lineHeight).width + BOUND_TEXT_PADDING * 2;
};
var isMeasureTextSupported = () => {
  const width = getTextWidth(
    DUMMY_TEXT,
    getFontString({
      fontSize: DEFAULT_FONT_SIZE,
      fontFamily: DEFAULT_FONT_FAMILY
    })
  );
  return width > 0;
};
var normalizeText = (text) => {
  return normalizeEOL(text).replace(/\t/g, "        ");
};
var splitIntoLines = (text) => {
  return normalizeText(text).split("\n");
};
var detectLineHeight = (textElement) => {
  const lineCount = splitIntoLines(textElement.text).length;
  return textElement.height / lineCount / textElement.fontSize;
};
var getLineHeightInPx = (fontSize, lineHeight) => {
  return fontSize * lineHeight;
};
var getApproxMinLineHeight = (fontSize, lineHeight) => {
  return getLineHeightInPx(fontSize, lineHeight) + BOUND_TEXT_PADDING * 2;
};
var textMetricsProvider;
var setCustomTextMetricsProvider = (provider) => {
  textMetricsProvider = provider;
};
var CanvasTextMetricsProvider = class {
  canvas;
  constructor() {
    this.canvas = document.createElement("canvas");
  }
  /**
   * We need to use the advance width as that's the closest thing to the browser wrapping algo, hence using it for:
   * - text wrapping
   * - wysiwyg editor (+padding)
   *
   * > The advance width is the distance between the glyph's initial pen position and the next glyph's initial pen position.
   */
  getLineWidth(text, fontString) {
    const context = this.canvas.getContext("2d");
    context.font = fontString;
    const metrics = context.measureText(text);
    const advanceWidth = metrics.width;
    if (isTestEnv()) {
      return advanceWidth * 10;
    }
    return advanceWidth;
  }
};
var getLineWidth = (text, font) => {
  if (!textMetricsProvider) {
    textMetricsProvider = new CanvasTextMetricsProvider();
  }
  return textMetricsProvider.getLineWidth(text, font);
};
var getTextWidth = (text, font) => {
  const lines = splitIntoLines(text);
  let width = 0;
  lines.forEach((line2) => {
    width = Math.max(width, getLineWidth(line2, font));
  });
  return width;
};
var getTextHeight = (text, fontSize, lineHeight) => {
  const lineCount = splitIntoLines(text).length;
  return getLineHeightInPx(fontSize, lineHeight) * lineCount;
};
var charWidth = /* @__PURE__ */ (() => {
  const cachedCharWidth = {};
  const calculate = (char, font) => {
    const unicode = char.charCodeAt(0);
    if (!cachedCharWidth[font]) {
      cachedCharWidth[font] = [];
    }
    if (!cachedCharWidth[font][unicode]) {
      const width = getLineWidth(char, font);
      cachedCharWidth[font][unicode] = width;
    }
    return cachedCharWidth[font][unicode];
  };
  const getCache = (font) => {
    return cachedCharWidth[font];
  };
  const clearCache = (font) => {
    cachedCharWidth[font] = [];
  };
  return {
    calculate,
    getCache,
    clearCache
  };
})();
var getMinCharWidth = (font) => {
  const cache = charWidth.getCache(font);
  if (!cache) {
    return 0;
  }
  const cacheWithOutEmpty = cache.filter((val) => val !== void 0);
  return Math.min(...cacheWithOutEmpty);
};
var getMaxCharWidth = (font) => {
  const cache = charWidth.getCache(font);
  if (!cache) {
    return 0;
  }
  const cacheWithOutEmpty = cache.filter((val) => val !== void 0);
  return Math.max(...cacheWithOutEmpty);
};

// src/textWrapping.ts
init_define_import_meta_env();
import { isDevEnv, isTestEnv as isTestEnv2 } from "@excalidraw/common";
var cachedCjkRegex;
var cachedLineBreakRegex;
var cachedEmojiRegex;
var containsCJK = (text) => {
  if (!cachedCjkRegex) {
    cachedCjkRegex = Regex.class(...Object.values(CJK));
  }
  return cachedCjkRegex.test(text);
};
var getLineBreakRegex = () => {
  if (!cachedLineBreakRegex) {
    try {
      cachedLineBreakRegex = getLineBreakRegexAdvanced();
    } catch {
      cachedLineBreakRegex = getLineBreakRegexSimple();
    }
  }
  return cachedLineBreakRegex;
};
var getEmojiRegex = () => {
  if (!cachedEmojiRegex) {
    cachedEmojiRegex = getEmojiRegexUnicode();
  }
  return cachedEmojiRegex;
};
var COMMON = {
  /**
   * Natural breaking points for any grammars.
   *
   * Hello world
   *      ↑ BREAK ALWAYS " " → ["Hello", " ", "world"]
   * Hello-world
   *       ↑ BREAK AFTER "-" → ["Hello-", "world"]
   */
  WHITESPACE: /\s/u,
  HYPHEN: /-/u,
  /**
   * Generally do not break, unless closed symbol is followed by an opening symbol.
   *
   * Also, western punctation is often used in modern Korean and expects to be treated
   * similarly to the CJK opening and closing symbols.
   *
   * Hello(한글)→ ["Hello", "(한", "글)"]
   *      ↑ BREAK BEFORE "("
   *          ↑ BREAK AFTER ")"
   */
  OPENING: /<\(\[\{/u,
  CLOSING: />\)\]\}.,:;!\?…\//u
};
var CJK = {
  /**
   * Every CJK breaks before and after, unless it's paired with an opening or closing symbol.
   *
   * Does not include every possible char used in CJK texts, such as currency, parentheses or punctuation.
   */
  CHAR: /\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}｀＇＾〃〰〆＃＆＊＋－ー／＼＝｜￤〒￢￣/u,
  /**
   * Opening and closing CJK punctuation breaks before and after all such characters (in case of many),
   * and creates pairs with neighboring characters.
   *
   * Hello た。→ ["Hello", "た。"]
   *        ↑ DON'T BREAK "た。"
   * * Hello「た」 World → ["Hello", "「た」", "World"]
   *       ↑ DON'T BREAK "「た"
   *        ↑ DON'T BREAK "た"
   *      ↑ BREAK BEFORE "「"
   *         ↑ BREAK AFTER "」"
   */
  // eslint-disable-next-line prettier/prettier
  OPENING: /（［｛〈《｟｢「『【〖〔〘〚＜〝/u,
  CLOSING: /）］｝〉》｠｣」』】〗〕〙〛＞。．，、〟‥？！：；・〜〞/u,
  /**
   * Currency symbols break before, not after
   *
   * Price￥100 → ["Price", "￥100"]
   *      ↑ BREAK BEFORE "￥"
   */
  CURRENCY: /￥￦￡￠＄/u
};
var EMOJI = {
  FLAG: /\p{RI}\p{RI}/u,
  JOINER: /(?:\p{Emoji_Modifier}|\uFE0F\u20E3?|[\u{E0020}-\u{E007E}]+\u{E007F})?/u,
  ZWJ: /\u200D/u,
  ANY: /[\p{Emoji}]/u,
  MOST: /[\p{Extended_Pictographic}\p{Emoji_Presentation}]/u
};
var getLineBreakRegexSimple = () => Regex.or(
  getEmojiRegex(),
  Break.On(COMMON.HYPHEN, COMMON.WHITESPACE, CJK.CHAR)
);
var getLineBreakRegexAdvanced = () => Regex.or(
  // Unicode-defined regex for (multi-codepoint) Emojis
  getEmojiRegex(),
  // Rules for whitespace and hyphen
  Break.Before(COMMON.WHITESPACE).Build(),
  Break.After(COMMON.WHITESPACE, COMMON.HYPHEN).Build(),
  // Rules for CJK (chars, symbols, currency)
  Break.Before(CJK.CHAR, CJK.CURRENCY).NotPrecededBy(COMMON.OPENING, CJK.OPENING).Build(),
  Break.After(CJK.CHAR).NotFollowedBy(COMMON.HYPHEN, COMMON.CLOSING, CJK.CLOSING).Build(),
  // Rules for opening and closing punctuation
  Break.BeforeMany(CJK.OPENING).NotPrecededBy(COMMON.OPENING).Build(),
  Break.AfterMany(CJK.CLOSING).NotFollowedBy(COMMON.CLOSING).Build(),
  Break.AfterMany(COMMON.CLOSING).FollowedBy(COMMON.OPENING).Build()
);
var getEmojiRegexUnicode = () => Regex.group(
  Regex.or(
    EMOJI.FLAG,
    Regex.and(
      EMOJI.MOST,
      EMOJI.JOINER,
      Regex.build(
        `(?:${EMOJI.ZWJ.source}(?:${EMOJI.FLAG.source}|${EMOJI.ANY.source}${EMOJI.JOINER.source}))*`
      )
    )
  )
);
var Regex = {
  /**
   * Builds a regex from a string.
   */
  build: (regex) => new RegExp(regex, "u"),
  /**
   * Joins regexes into a single string.
   */
  join: (...regexes) => regexes.map((x) => x.source).join(""),
  /**
   * Joins regexes into a single regex as with "and" operator.
   */
  and: (...regexes) => Regex.build(Regex.join(...regexes)),
  /**
   * Joins regexes into a single regex with "or" operator.
   */
  or: (...regexes) => Regex.build(regexes.map((x) => x.source).join("|")),
  /**
   * Puts regexes into a matching group.
   */
  group: (...regexes) => Regex.build(`(${Regex.join(...regexes)})`),
  /**
   * Puts regexes into a character class.
   */
  class: (...regexes) => Regex.build(`[${Regex.join(...regexes)}]`)
};
var Break = {
  /**
   * Break on the given class of characters.
   */
  On: (...regexes) => {
    const joined = Regex.join(...regexes);
    return Regex.build(`([${joined}])`);
  },
  /**
   * Break before the given class of characters.
   */
  Before: (...regexes) => {
    const joined = Regex.join(...regexes);
    const builder = () => Regex.build(`(?=[${joined}])`);
    return Break.Chain(builder);
  },
  /**
   * Break after the given class of characters.
   */
  After: (...regexes) => {
    const joined = Regex.join(...regexes);
    const builder = () => Regex.build(`(?<=[${joined}])`);
    return Break.Chain(builder);
  },
  /**
   * Break before one or multiple characters of the same class.
   */
  BeforeMany: (...regexes) => {
    const joined = Regex.join(...regexes);
    const builder = () => Regex.build(`(?<![${joined}])(?=[${joined}])`);
    return Break.Chain(builder);
  },
  /**
   * Break after one or multiple character from the same class.
   */
  AfterMany: (...regexes) => {
    const joined = Regex.join(...regexes);
    const builder = () => Regex.build(`(?<=[${joined}])(?![${joined}])`);
    return Break.Chain(builder);
  },
  /**
   * Do not break before the given class of characters.
   */
  NotBefore: (...regexes) => {
    const joined = Regex.join(...regexes);
    const builder = () => Regex.build(`(?![${joined}])`);
    return Break.Chain(builder);
  },
  /**
   * Do not break after the given class of characters.
   */
  NotAfter: (...regexes) => {
    const joined = Regex.join(...regexes);
    const builder = () => Regex.build(`(?<![${joined}])`);
    return Break.Chain(builder);
  },
  Chain: (rootBuilder) => ({
    /**
     * Build the root regex.
     */
    Build: rootBuilder,
    /**
     * Specify additional class of characters that should precede the root regex.
     */
    PreceededBy: (...regexes) => {
      const root = rootBuilder();
      const preceeded = Break.After(...regexes).Build();
      const builder = () => Regex.and(preceeded, root);
      return Break.Chain(builder);
    },
    /**
     * Specify additional class of characters that should follow the root regex.
     */
    FollowedBy: (...regexes) => {
      const root = rootBuilder();
      const followed = Break.Before(...regexes).Build();
      const builder = () => Regex.and(root, followed);
      return Break.Chain(builder);
    },
    /**
     * Specify additional class of characters that should not precede the root regex.
     */
    NotPrecededBy: (...regexes) => {
      const root = rootBuilder();
      const notPreceeded = Break.NotAfter(...regexes).Build();
      const builder = () => Regex.and(notPreceeded, root);
      return Break.Chain(builder);
    },
    /**
     * Specify additional class of characters that should not follow the root regex.
     */
    NotFollowedBy: (...regexes) => {
      const root = rootBuilder();
      const notFollowed = Break.NotBefore(...regexes).Build();
      const builder = () => Regex.and(root, notFollowed);
      return Break.Chain(builder);
    }
  })
};
var parseTokens = (line2) => {
  const breakLineRegex = getLineBreakRegex();
  return line2.normalize("NFC").split(breakLineRegex).filter(Boolean);
};
var wrapText = (text, font, maxWidth) => {
  if (!Number.isFinite(maxWidth) || maxWidth < 0) {
    return text;
  }
  const lines = [];
  const originalLines = text.split("\n");
  for (const originalLine of originalLines) {
    const currentLineWidth = getLineWidth(originalLine, font);
    if (currentLineWidth <= maxWidth) {
      lines.push(originalLine);
      continue;
    }
    const wrappedLine = wrapLine(originalLine, font, maxWidth);
    lines.push(...wrappedLine);
  }
  return lines.join("\n");
};
var wrapLine = (line2, font, maxWidth) => {
  const lines = [];
  const tokens = parseTokens(line2);
  const tokenIterator = tokens[Symbol.iterator]();
  let currentLine = "";
  let currentLineWidth = 0;
  let iterator = tokenIterator.next();
  while (!iterator.done) {
    const token = iterator.value;
    const testLine = currentLine + token;
    const testLineWidth = isSingleCharacter(token) ? currentLineWidth + charWidth.calculate(token, font) : getLineWidth(testLine, font);
    if (/\s/.test(token) || testLineWidth <= maxWidth) {
      currentLine = testLine;
      currentLineWidth = testLineWidth;
      iterator = tokenIterator.next();
      continue;
    }
    if (!currentLine) {
      const wrappedWord = wrapWord(token, font, maxWidth);
      const trailingLine = wrappedWord[wrappedWord.length - 1] ?? "";
      const precedingLines = wrappedWord.slice(0, -1);
      lines.push(...precedingLines);
      currentLine = trailingLine;
      currentLineWidth = getLineWidth(trailingLine, font);
      iterator = tokenIterator.next();
    } else {
      lines.push(currentLine.trimEnd());
      currentLine = "";
      currentLineWidth = 0;
    }
  }
  if (currentLine) {
    const trailingLine = trimLine(currentLine, font, maxWidth);
    lines.push(trailingLine);
  }
  return lines;
};
var wrapWord = (word, font, maxWidth) => {
  if (getEmojiRegex().test(word)) {
    return [word];
  }
  satisfiesWordInvariant(word);
  const lines = [];
  const chars = Array.from(word);
  let currentLine = "";
  let currentLineWidth = 0;
  for (const char of chars) {
    const _charWidth = charWidth.calculate(char, font);
    const testLineWidth = currentLineWidth + _charWidth;
    if (testLineWidth <= maxWidth) {
      currentLine = currentLine + char;
      currentLineWidth = testLineWidth;
      continue;
    }
    if (currentLine) {
      lines.push(currentLine);
    }
    currentLine = char;
    currentLineWidth = _charWidth;
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
};
var trimLine = (line2, font, maxWidth) => {
  const shouldTrimWhitespaces = getLineWidth(line2, font) > maxWidth;
  if (!shouldTrimWhitespaces) {
    return line2;
  }
  let [, trimmedLine, whitespaces] = line2.match(/^(.+?)(\s+)$/) ?? [
    line2,
    line2.trimEnd(),
    ""
  ];
  let trimmedLineWidth = getLineWidth(trimmedLine, font);
  for (const whitespace of Array.from(whitespaces)) {
    const _charWidth = charWidth.calculate(whitespace, font);
    const testLineWidth = trimmedLineWidth + _charWidth;
    if (testLineWidth > maxWidth) {
      break;
    }
    trimmedLine = trimmedLine + whitespace;
    trimmedLineWidth = testLineWidth;
  }
  return trimmedLine;
};
var isSingleCharacter = (maybeSingleCharacter) => {
  return maybeSingleCharacter.codePointAt(0) !== void 0 && maybeSingleCharacter.codePointAt(1) === void 0;
};
var satisfiesWordInvariant = (word) => {
  if (isTestEnv2() || isDevEnv()) {
    if (/\s/.test(word)) {
      throw new Error("Word should not contain any whitespaces!");
    }
  }
};

// src/textElement.ts
var redrawTextBoundingBox = (textElement, container, scene) => {
  const elementsMap = scene.getNonDeletedElementsMap();
  let maxWidth = void 0;
  if (!isProdEnv()) {
    invariant2(
      !container || !isArrowElement(container) || textElement.angle === 0,
      "text element angle must be 0 if bound to arrow container"
    );
  }
  const boundTextUpdates = {
    x: textElement.x,
    y: textElement.y,
    text: textElement.text,
    width: textElement.width,
    height: textElement.height,
    angle: container ? isArrowElement(container) ? 0 : container.angle : textElement.angle
  };
  boundTextUpdates.text = textElement.text;
  if (container || !textElement.autoResize) {
    maxWidth = container ? getBoundTextMaxWidth(container, textElement) : textElement.width;
    boundTextUpdates.text = wrapText(
      textElement.originalText,
      getFontString2(textElement),
      maxWidth
    );
  }
  const metrics = measureText(
    boundTextUpdates.text,
    getFontString2(textElement),
    textElement.lineHeight
  );
  if (textElement.autoResize) {
    boundTextUpdates.width = metrics.width;
  }
  boundTextUpdates.height = metrics.height;
  if (container) {
    const maxContainerHeight = getBoundTextMaxHeight(
      container,
      textElement
    );
    const maxContainerWidth = getBoundTextMaxWidth(container, textElement);
    if (!isArrowElement(container) && metrics.height > maxContainerHeight) {
      const nextHeight = computeContainerDimensionForBoundText(
        metrics.height,
        container.type
      );
      scene.mutateElement(container, { height: nextHeight });
      updateOriginalContainerCache(container.id, nextHeight);
    }
    if (metrics.width > maxContainerWidth) {
      const nextWidth = computeContainerDimensionForBoundText(
        metrics.width,
        container.type
      );
      scene.mutateElement(container, { width: nextWidth });
    }
    const updatedTextElement = {
      ...textElement,
      ...boundTextUpdates
    };
    const { x, y } = computeBoundTextPosition(
      container,
      updatedTextElement,
      elementsMap
    );
    boundTextUpdates.x = x;
    boundTextUpdates.y = y;
  }
  scene.mutateElement(textElement, boundTextUpdates);
};
var handleBindTextResize = (container, scene, transformHandleType, shouldMaintainAspectRatio = false) => {
  const elementsMap = scene.getNonDeletedElementsMap();
  const boundTextElementId = getBoundTextElementId(container);
  if (!boundTextElementId) {
    return;
  }
  resetOriginalContainerCache(container.id);
  const textElement = getBoundTextElement(container, elementsMap);
  if (textElement && textElement.text) {
    if (!container) {
      return;
    }
    let text = textElement.text;
    let nextHeight = textElement.height;
    let nextWidth = textElement.width;
    const maxWidth = getBoundTextMaxWidth(container, textElement);
    const maxHeight = getBoundTextMaxHeight(container, textElement);
    let containerHeight = container.height;
    if (shouldMaintainAspectRatio || transformHandleType !== "n" && transformHandleType !== "s") {
      if (text) {
        text = wrapText(
          textElement.originalText,
          getFontString2(textElement),
          maxWidth
        );
      }
      const metrics = measureText(
        text,
        getFontString2(textElement),
        textElement.lineHeight
      );
      nextHeight = metrics.height;
      nextWidth = metrics.width;
    }
    if (nextHeight > maxHeight) {
      containerHeight = computeContainerDimensionForBoundText(
        nextHeight,
        container.type
      );
      const diff = containerHeight - container.height;
      const updatedY = !isArrowElement(container) && (transformHandleType === "ne" || transformHandleType === "nw" || transformHandleType === "n") ? container.y - diff : container.y;
      scene.mutateElement(container, {
        height: containerHeight,
        y: updatedY
      });
    }
    scene.mutateElement(textElement, {
      text,
      width: nextWidth,
      height: nextHeight
    });
    if (!isArrowElement(container)) {
      scene.mutateElement(
        textElement,
        computeBoundTextPosition(container, textElement, elementsMap)
      );
    }
  }
};
var computeBoundTextPosition = (container, boundTextElement, elementsMap) => {
  if (isArrowElement(container)) {
    return LinearElementEditor.getBoundTextElementPosition(
      container,
      boundTextElement,
      elementsMap
    );
  }
  const containerCoords = getContainerCoords(container);
  const maxContainerHeight = getBoundTextMaxHeight(container, boundTextElement);
  const maxContainerWidth = getBoundTextMaxWidth(container, boundTextElement);
  let x;
  let y;
  if (boundTextElement.verticalAlign === VERTICAL_ALIGN.TOP) {
    y = containerCoords.y;
  } else if (boundTextElement.verticalAlign === VERTICAL_ALIGN.BOTTOM) {
    y = containerCoords.y + (maxContainerHeight - boundTextElement.height);
  } else {
    y = containerCoords.y + (maxContainerHeight / 2 - boundTextElement.height / 2);
  }
  if (boundTextElement.textAlign === TEXT_ALIGN.LEFT) {
    x = containerCoords.x;
  } else if (boundTextElement.textAlign === TEXT_ALIGN.RIGHT) {
    x = containerCoords.x + (maxContainerWidth - boundTextElement.width);
  } else {
    x = containerCoords.x + (maxContainerWidth / 2 - boundTextElement.width / 2);
  }
  return { x, y };
};
var getBoundTextElementId = (container) => {
  return container?.boundElements?.length ? container?.boundElements?.find((ele) => ele.type === "text")?.id || null : null;
};
var getBoundTextElement = (element, elementsMap) => {
  if (!element) {
    return null;
  }
  const boundTextElementId = getBoundTextElementId(element);
  if (boundTextElementId) {
    return elementsMap.get(boundTextElementId) || null;
  }
  return null;
};
var getContainerElement = (element, elementsMap) => {
  if (!element) {
    return null;
  }
  if (element.containerId) {
    return elementsMap.get(element.containerId) || null;
  }
  return null;
};
var getContainerCenter = (container, appState, elementsMap) => {
  if (!isArrowElement(container)) {
    return {
      x: container.x + container.width / 2,
      y: container.y + container.height / 2
    };
  }
  const points = LinearElementEditor.getPointsGlobalCoordinates(
    container,
    elementsMap
  );
  if (points.length % 2 === 1) {
    const index2 = Math.floor(container.points.length / 2);
    const midPoint = LinearElementEditor.getPointGlobalCoordinates(
      container,
      container.points[index2],
      elementsMap
    );
    return { x: midPoint[0], y: midPoint[1] };
  }
  const index = container.points.length / 2 - 1;
  let midSegmentMidpoint = LinearElementEditor.getEditorMidPoints(
    container,
    elementsMap,
    appState
  )[index];
  if (!midSegmentMidpoint) {
    midSegmentMidpoint = LinearElementEditor.getSegmentMidPoint(
      container,
      index + 1
    );
  }
  return { x: midSegmentMidpoint[0], y: midSegmentMidpoint[1] };
};
var getContainerCoords = (container) => {
  let offsetX = BOUND_TEXT_PADDING2;
  let offsetY = BOUND_TEXT_PADDING2;
  if (container.type === "ellipse") {
    offsetX += container.width / 2 * (1 - Math.sqrt(2) / 2);
    offsetY += container.height / 2 * (1 - Math.sqrt(2) / 2);
  }
  if (container.type === "diamond") {
    offsetX += container.width / 4;
    offsetY += container.height / 4;
  }
  return {
    x: container.x + offsetX,
    y: container.y + offsetY
  };
};
var getTextElementAngle = (textElement, container) => {
  if (isArrowElement(container)) {
    return 0;
  }
  if (!container) {
    return textElement.angle;
  }
  return container.angle;
};
var getBoundTextElementPosition = (container, boundTextElement, elementsMap) => {
  if (isArrowElement(container)) {
    return LinearElementEditor.getBoundTextElementPosition(
      container,
      boundTextElement,
      elementsMap
    );
  }
};
var shouldAllowVerticalAlign = (selectedElements, elementsMap) => {
  return selectedElements.some((element) => {
    if (isBoundToContainer(element)) {
      const container = getContainerElement(element, elementsMap);
      if (isArrowElement(container)) {
        return false;
      }
      return true;
    }
    return false;
  });
};
var suppportsHorizontalAlign = (selectedElements, elementsMap) => {
  return selectedElements.some((element) => {
    if (isBoundToContainer(element)) {
      const container = getContainerElement(element, elementsMap);
      if (isArrowElement(container)) {
        return false;
      }
      return true;
    }
    return isTextElement(element);
  });
};
var VALID_CONTAINER_TYPES = /* @__PURE__ */ new Set([
  "rectangle",
  "ellipse",
  "diamond",
  "arrow"
]);
var isValidTextContainer = (element) => VALID_CONTAINER_TYPES.has(element.type);
var computeContainerDimensionForBoundText = (dimension, containerType) => {
  dimension = Math.ceil(dimension);
  const padding = BOUND_TEXT_PADDING2 * 2;
  if (containerType === "ellipse") {
    return Math.round((dimension + padding) / Math.sqrt(2) * 2);
  }
  if (containerType === "arrow") {
    return dimension + padding * 8;
  }
  if (containerType === "diamond") {
    return 2 * (dimension + padding);
  }
  return dimension + padding;
};
var getBoundTextMaxWidth = (container, boundTextElement) => {
  const { width } = container;
  if (isArrowElement(container)) {
    const minWidth = (boundTextElement?.fontSize ?? DEFAULT_FONT_SIZE2) * ARROW_LABEL_FONT_SIZE_TO_MIN_WIDTH_RATIO;
    return Math.max(ARROW_LABEL_WIDTH_FRACTION * width, minWidth);
  }
  if (container.type === "ellipse") {
    return Math.round(width / 2 * Math.sqrt(2)) - BOUND_TEXT_PADDING2 * 2;
  }
  if (container.type === "diamond") {
    return Math.round(width / 2) - BOUND_TEXT_PADDING2 * 2;
  }
  return width - BOUND_TEXT_PADDING2 * 2;
};
var getBoundTextMaxHeight = (container, boundTextElement) => {
  const { height } = container;
  if (isArrowElement(container)) {
    const containerHeight = height - BOUND_TEXT_PADDING2 * 8 * 2;
    if (containerHeight <= 0) {
      return boundTextElement.height;
    }
    return height;
  }
  if (container.type === "ellipse") {
    return Math.round(height / 2 * Math.sqrt(2)) - BOUND_TEXT_PADDING2 * 2;
  }
  if (container.type === "diamond") {
    return Math.round(height / 2) - BOUND_TEXT_PADDING2 * 2;
  }
  return height - BOUND_TEXT_PADDING2 * 2;
};
var getTextFromElements = (elements, separator = "\n\n") => {
  const text = elements.reduce((acc, element) => {
    if (isTextElement(element)) {
      acc.push(element.text);
    }
    return acc;
  }, []).join(separator);
  return text;
};

// src/distance.ts
init_define_import_meta_env();
import {
  curvePointDistance,
  distanceToLineSegment,
  pointRotateRads as pointRotateRads3
} from "@excalidraw/math";
import { ellipse as ellipse2, ellipseDistanceFromPoint } from "@excalidraw/math/ellipse";
var distanceToElement = (element, elementsMap, p) => {
  switch (element.type) {
    case "selection":
    case "rectangle":
    case "image":
    case "text":
    case "iframe":
    case "embeddable":
    case "frame":
    case "magicframe":
      return distanceToRectanguloidElement(element, elementsMap, p);
    case "diamond":
      return distanceToDiamondElement(element, elementsMap, p);
    case "ellipse":
      return distanceToEllipseElement(element, elementsMap, p);
    case "line":
    case "arrow":
    case "freedraw":
      return distanceToLinearOrFreeDraElement(element, p);
  }
};
var distanceToRectanguloidElement = (element, elementsMap, p) => {
  const center = elementCenterPoint(element, elementsMap);
  const rotatedPoint = pointRotateRads3(p, center, -element.angle);
  const [sides, corners] = deconstructRectanguloidElement(element);
  return Math.min(
    ...sides.map((s) => distanceToLineSegment(rotatedPoint, s)),
    ...corners.map((a2) => curvePointDistance(a2, rotatedPoint)).filter((d) => d !== null)
  );
};
var distanceToDiamondElement = (element, elementsMap, p) => {
  const center = elementCenterPoint(element, elementsMap);
  const rotatedPoint = pointRotateRads3(p, center, -element.angle);
  const [sides, curves] = deconstructDiamondElement(element);
  return Math.min(
    ...sides.map((s) => distanceToLineSegment(rotatedPoint, s)),
    ...curves.map((a2) => curvePointDistance(a2, rotatedPoint)).filter((d) => d !== null)
  );
};
var distanceToEllipseElement = (element, elementsMap, p) => {
  const center = elementCenterPoint(element, elementsMap);
  return ellipseDistanceFromPoint(
    // Instead of rotating the ellipse, rotate the point to the inverse angle
    pointRotateRads3(p, center, -element.angle),
    ellipse2(center, element.width / 2, element.height / 2)
  );
};
var distanceToLinearOrFreeDraElement = (element, p) => {
  const [lines, curves] = deconstructLinearOrFreeDrawElement(element);
  return Math.min(
    ...lines.map((s) => distanceToLineSegment(p, s)),
    ...curves.map((a2) => curvePointDistance(a2, p))
  );
};

// src/collision.ts
var shouldTestInside = (element) => {
  if (element.type === "arrow") {
    return false;
  }
  const isDraggableFromInside = !isTransparent(element.backgroundColor) || hasBoundTextElement(element) || isIframeLikeElement(element) || isTextElement(element);
  if (element.type === "line") {
    return isDraggableFromInside && isPathALoop(element.points);
  }
  if (element.type === "freedraw") {
    return isDraggableFromInside && isPathALoop(element.points);
  }
  return isDraggableFromInside || isImageElement(element);
};
var hitElementItself = ({
  point,
  element,
  threshold,
  elementsMap,
  frameNameBound = null
}) => {
  const hitFrameName = frameNameBound ? isPointWithinBounds(
    pointFrom4(frameNameBound.x - threshold, frameNameBound.y - threshold),
    point,
    pointFrom4(
      frameNameBound.x + frameNameBound.width + threshold,
      frameNameBound.y + frameNameBound.height + threshold
    )
  ) : false;
  const bounds = getElementBounds(element, elementsMap, true);
  const hitBounds = isPointWithinBounds(
    pointFrom4(bounds[0] - threshold, bounds[1] - threshold),
    pointRotateRads4(
      point,
      getCenterForBounds(bounds),
      -element.angle
    ),
    pointFrom4(bounds[2] + threshold, bounds[3] + threshold)
  );
  if (!hitBounds && !hitFrameName) {
    return false;
  }
  const hitElement = shouldTestInside(element) ? (
    // Since `inShape` tests STRICTLY againt the insides of a shape
    // we would need `onShape` as well to include the "borders"
    isPointInElement(point, element, elementsMap) || isPointOnElementOutline(point, element, elementsMap, threshold)
  ) : isPointOnElementOutline(point, element, elementsMap, threshold);
  return hitElement || hitFrameName;
};
var hitElementBoundingBox = (point, element, elementsMap, tolerance = 0) => {
  let [x1, y1, x2, y2] = getElementBounds(element, elementsMap);
  x1 -= tolerance;
  y1 -= tolerance;
  x2 += tolerance;
  y2 += tolerance;
  return isPointWithinBounds(pointFrom4(x1, y1), point, pointFrom4(x2, y2));
};
var hitElementBoundingBoxOnly = (hitArgs, elementsMap) => !hitElementItself(hitArgs) && // bound text is considered part of the element (even if it's outside the bounding box)
!hitElementBoundText(hitArgs.point, hitArgs.element, elementsMap) && hitElementBoundingBox(hitArgs.point, hitArgs.element, elementsMap);
var hitElementBoundText = (point, element, elementsMap) => {
  const boundTextElementCandidate = getBoundTextElement(element, elementsMap);
  if (!boundTextElementCandidate) {
    return false;
  }
  const boundTextElement = isLinearElement(element) ? {
    ...boundTextElementCandidate,
    // arrow's bound text accurate position is not stored in the element's property
    // but rather calculated and returned from the following static method
    ...LinearElementEditor.getBoundTextElementPosition(
      element,
      boundTextElementCandidate,
      elementsMap
    )
  } : boundTextElementCandidate;
  return isPointInElement(point, boundTextElement, elementsMap);
};
var intersectElementWithLineSegment = (element, elementsMap, line2, offset = 0, onlyFirst = false) => {
  const intersectorBounds = [
    Math.min(line2[0][0] - offset, line2[1][0] - offset),
    Math.min(line2[0][1] - offset, line2[1][1] - offset),
    Math.max(line2[0][0] + offset, line2[1][0] + offset),
    Math.max(line2[0][1] + offset, line2[1][1] + offset)
  ];
  const elementBounds = getElementBounds(element, elementsMap);
  if (!doBoundsIntersect(intersectorBounds, elementBounds)) {
    return [];
  }
  switch (element.type) {
    case "rectangle":
    case "image":
    case "text":
    case "iframe":
    case "embeddable":
    case "frame":
    case "selection":
    case "magicframe":
      return intersectRectanguloidWithLineSegment(
        element,
        elementsMap,
        line2,
        offset,
        onlyFirst
      );
    case "diamond":
      return intersectDiamondWithLineSegment(
        element,
        elementsMap,
        line2,
        offset,
        onlyFirst
      );
    case "ellipse":
      return intersectEllipseWithLineSegment(
        element,
        elementsMap,
        line2,
        offset
      );
    case "line":
    case "freedraw":
    case "arrow":
      return intersectLinearOrFreeDrawWithLineSegment(element, line2, onlyFirst);
  }
};
var curveIntersections = (curves, segment, intersections, center, angle, onlyFirst = false) => {
  for (const c of curves) {
    const b1 = getCubicBezierCurveBound(c[0], c[1], c[2], c[3]);
    const b2 = [
      Math.min(segment[0][0], segment[1][0]),
      Math.min(segment[0][1], segment[1][1]),
      Math.max(segment[0][0], segment[1][0]),
      Math.max(segment[0][1], segment[1][1])
    ];
    if (!doBoundsIntersect(b1, b2)) {
      continue;
    }
    const hits = curveIntersectLineSegment(c, segment);
    if (hits.length > 0) {
      for (const j of hits) {
        intersections.push(pointRotateRads4(j, center, angle));
      }
      if (onlyFirst) {
        return intersections;
      }
    }
  }
  return intersections;
};
var lineIntersections = (lines, segment, intersections, center, angle, onlyFirst = false) => {
  for (const l2 of lines) {
    const intersection = lineSegmentIntersectionPoints(l2, segment);
    if (intersection) {
      intersections.push(pointRotateRads4(intersection, center, angle));
      if (onlyFirst) {
        return intersections;
      }
    }
  }
  return intersections;
};
var intersectLinearOrFreeDrawWithLineSegment = (element, segment, onlyFirst = false) => {
  const [lines, curves] = deconstructLinearOrFreeDrawElement(element);
  const intersections = [];
  for (const l2 of lines) {
    const intersection = lineSegmentIntersectionPoints(l2, segment);
    if (intersection) {
      intersections.push(intersection);
      if (onlyFirst) {
        return intersections;
      }
    }
  }
  for (const c of curves) {
    const b1 = getCubicBezierCurveBound(c[0], c[1], c[2], c[3]);
    const b2 = [
      Math.min(segment[0][0], segment[1][0]),
      Math.min(segment[0][1], segment[1][1]),
      Math.max(segment[0][0], segment[1][0]),
      Math.max(segment[0][1], segment[1][1])
    ];
    if (!doBoundsIntersect(b1, b2)) {
      continue;
    }
    const hits = curveIntersectLineSegment(c, segment);
    if (hits.length > 0) {
      intersections.push(...hits);
      if (onlyFirst) {
        return intersections;
      }
    }
  }
  return intersections;
};
var intersectRectanguloidWithLineSegment = (element, elementsMap, segment, offset = 0, onlyFirst = false) => {
  const center = elementCenterPoint(element, elementsMap);
  const rotatedA = pointRotateRads4(
    segment[0],
    center,
    -element.angle
  );
  const rotatedB = pointRotateRads4(
    segment[1],
    center,
    -element.angle
  );
  const rotatedIntersector = lineSegment3(rotatedA, rotatedB);
  const [sides, corners] = deconstructRectanguloidElement(element, offset);
  const intersections = [];
  lineIntersections(
    sides,
    rotatedIntersector,
    intersections,
    center,
    element.angle,
    onlyFirst
  );
  if (onlyFirst && intersections.length > 0) {
    return intersections;
  }
  curveIntersections(
    corners,
    rotatedIntersector,
    intersections,
    center,
    element.angle,
    onlyFirst
  );
  return intersections;
};
var intersectDiamondWithLineSegment = (element, elementsMap, l2, offset = 0, onlyFirst = false) => {
  const center = elementCenterPoint(element, elementsMap);
  const rotatedA = pointRotateRads4(l2[0], center, -element.angle);
  const rotatedB = pointRotateRads4(l2[1], center, -element.angle);
  const rotatedIntersector = lineSegment3(rotatedA, rotatedB);
  const [sides, corners] = deconstructDiamondElement(element, offset);
  const intersections = [];
  lineIntersections(
    sides,
    rotatedIntersector,
    intersections,
    center,
    element.angle,
    onlyFirst
  );
  if (onlyFirst && intersections.length > 0) {
    return intersections;
  }
  curveIntersections(
    corners,
    rotatedIntersector,
    intersections,
    center,
    element.angle,
    onlyFirst
  );
  return intersections;
};
var intersectEllipseWithLineSegment = (element, elementsMap, l2, offset = 0) => {
  const center = elementCenterPoint(element, elementsMap);
  const rotatedA = pointRotateRads4(l2[0], center, -element.angle);
  const rotatedB = pointRotateRads4(l2[1], center, -element.angle);
  return ellipseSegmentInterceptPoints(
    ellipse3(center, element.width / 2 + offset, element.height / 2 + offset),
    lineSegment3(rotatedA, rotatedB)
  ).map((p) => pointRotateRads4(p, center, element.angle));
};
var isPointOnElementOutline = (point, element, elementsMap, tolerance = 1) => distanceToElement(element, elementsMap, point) <= tolerance;
var isPointInElement = (point, element, elementsMap) => {
  if ((isLinearElement(element) || isFreeDrawElement(element)) && !isPathALoop(element.points)) {
    return false;
  }
  const [x1, y1, x2, y2] = getElementBounds(element, elementsMap);
  if (!isPointWithinBounds(pointFrom4(x1, y1), point, pointFrom4(x2, y2))) {
    return false;
  }
  const center = pointFrom4((x1 + x2) / 2, (y1 + y2) / 2);
  const otherPoint = pointFromVector3(
    vectorScale3(
      vectorNormalize2(vectorFromPoint3(point, center, 0.1)),
      Math.max(element.width, element.height) * 2
    ),
    center
  );
  const intersector = lineSegment3(point, otherPoint);
  const intersections = intersectElementWithLineSegment(
    element,
    elementsMap,
    intersector
  ).filter((p, pos, arr) => arr.findIndex((q) => pointsEqual2(q, p)) === pos);
  return intersections.length % 2 === 1;
};

// src/heading.ts
init_define_import_meta_env();
import { invariant as invariant3, isDevEnv as isDevEnv2, isTestEnv as isTestEnv3 } from "@excalidraw/common";
import {
  pointFrom as pointFrom5,
  pointFromVector as pointFromVector4,
  pointRotateRads as pointRotateRads5,
  pointScaleFromOrigin,
  pointsEqual as pointsEqual3,
  triangleIncludesPoint,
  vectorCross,
  vectorFromPoint as vectorFromPoint4,
  vectorScale as vectorScale4
} from "@excalidraw/math";
var HEADING_RIGHT = [1, 0];
var HEADING_DOWN = [0, 1];
var HEADING_LEFT = [-1, 0];
var HEADING_UP = [0, -1];
var vectorToHeading = (vec) => {
  const [x, y] = vec;
  const absX = Math.abs(x);
  const absY = Math.abs(y);
  if (x > absY) {
    return HEADING_RIGHT;
  } else if (x <= -absY) {
    return HEADING_LEFT;
  } else if (y > absX) {
    return HEADING_DOWN;
  }
  return HEADING_UP;
};
var headingForPoint = (p, o) => vectorToHeading(vectorFromPoint4(p, o));
var headingForPointIsHorizontal = (p, o) => headingIsHorizontal(headingForPoint(p, o));
var compareHeading = (a2, b2) => a2[0] === b2[0] && a2[1] === b2[1];
var headingIsHorizontal = (a2) => compareHeading(a2, HEADING_RIGHT) || compareHeading(a2, HEADING_LEFT);
var headingIsVertical = (a2) => !headingIsHorizontal(a2);
var headingForPointFromDiamondElement = (element, aabb, point) => {
  const midPoint = getCenterForBounds(aabb);
  if (isDevEnv2() || isTestEnv3()) {
    invariant3(
      element.width > 0 && element.height > 0,
      "Diamond element has no width or height"
    );
    invariant3(
      !pointsEqual3(midPoint, point),
      "The point is too close to the element mid point to determine heading"
    );
  }
  const SHRINK = 0.95;
  const top = pointFromVector4(
    vectorScale4(
      vectorFromPoint4(
        pointRotateRads5(
          pointFrom5(element.x + element.width / 2, element.y),
          midPoint,
          element.angle
        ),
        midPoint
      ),
      SHRINK
    ),
    midPoint
  );
  const right = pointFromVector4(
    vectorScale4(
      vectorFromPoint4(
        pointRotateRads5(
          pointFrom5(
            element.x + element.width,
            element.y + element.height / 2
          ),
          midPoint,
          element.angle
        ),
        midPoint
      ),
      SHRINK
    ),
    midPoint
  );
  const bottom = pointFromVector4(
    vectorScale4(
      vectorFromPoint4(
        pointRotateRads5(
          pointFrom5(
            element.x + element.width / 2,
            element.y + element.height
          ),
          midPoint,
          element.angle
        ),
        midPoint
      ),
      SHRINK
    ),
    midPoint
  );
  const left = pointFromVector4(
    vectorScale4(
      vectorFromPoint4(
        pointRotateRads5(
          pointFrom5(element.x, element.y + element.height / 2),
          midPoint,
          element.angle
        ),
        midPoint
      ),
      SHRINK
    ),
    midPoint
  );
  if (vectorCross(vectorFromPoint4(point, top), vectorFromPoint4(top, right)) <= 0 && vectorCross(vectorFromPoint4(point, top), vectorFromPoint4(top, left)) > 0) {
    return headingForPoint(top, midPoint);
  } else if (vectorCross(
    vectorFromPoint4(point, right),
    vectorFromPoint4(right, bottom)
  ) <= 0 && vectorCross(vectorFromPoint4(point, right), vectorFromPoint4(right, top)) > 0) {
    return headingForPoint(right, midPoint);
  } else if (vectorCross(
    vectorFromPoint4(point, bottom),
    vectorFromPoint4(bottom, left)
  ) <= 0 && vectorCross(
    vectorFromPoint4(point, bottom),
    vectorFromPoint4(bottom, right)
  ) > 0) {
    return headingForPoint(bottom, midPoint);
  } else if (vectorCross(vectorFromPoint4(point, left), vectorFromPoint4(left, top)) <= 0 && vectorCross(vectorFromPoint4(point, left), vectorFromPoint4(left, bottom)) > 0) {
    return headingForPoint(left, midPoint);
  }
  if (vectorCross(
    vectorFromPoint4(point, midPoint),
    vectorFromPoint4(top, midPoint)
  ) <= 0 && vectorCross(
    vectorFromPoint4(point, midPoint),
    vectorFromPoint4(right, midPoint)
  ) > 0) {
    const p2 = element.width > element.height ? top : right;
    return headingForPoint(p2, midPoint);
  } else if (vectorCross(
    vectorFromPoint4(point, midPoint),
    vectorFromPoint4(right, midPoint)
  ) <= 0 && vectorCross(
    vectorFromPoint4(point, midPoint),
    vectorFromPoint4(bottom, midPoint)
  ) > 0) {
    const p2 = element.width > element.height ? bottom : right;
    return headingForPoint(p2, midPoint);
  } else if (vectorCross(
    vectorFromPoint4(point, midPoint),
    vectorFromPoint4(bottom, midPoint)
  ) <= 0 && vectorCross(
    vectorFromPoint4(point, midPoint),
    vectorFromPoint4(left, midPoint)
  ) > 0) {
    const p2 = element.width > element.height ? bottom : left;
    return headingForPoint(p2, midPoint);
  }
  const p = element.width > element.height ? top : left;
  return headingForPoint(p, midPoint);
};
var headingForPointFromElement = (element, aabb, p) => {
  const SEARCH_CONE_MULTIPLIER = 2;
  const midPoint = getCenterForBounds(aabb);
  if (element.type === "diamond") {
    return headingForPointFromDiamondElement(element, aabb, p);
  }
  const topLeft = pointScaleFromOrigin(
    pointFrom5(aabb[0], aabb[1]),
    midPoint,
    SEARCH_CONE_MULTIPLIER
  );
  const topRight = pointScaleFromOrigin(
    pointFrom5(aabb[2], aabb[1]),
    midPoint,
    SEARCH_CONE_MULTIPLIER
  );
  const bottomLeft = pointScaleFromOrigin(
    pointFrom5(aabb[0], aabb[3]),
    midPoint,
    SEARCH_CONE_MULTIPLIER
  );
  const bottomRight = pointScaleFromOrigin(
    pointFrom5(aabb[2], aabb[3]),
    midPoint,
    SEARCH_CONE_MULTIPLIER
  );
  return triangleIncludesPoint(
    [topLeft, topRight, midPoint],
    p
  ) ? HEADING_UP : triangleIncludesPoint(
    [topRight, bottomRight, midPoint],
    p
  ) ? HEADING_RIGHT : triangleIncludesPoint(
    [bottomRight, bottomLeft, midPoint],
    p
  ) ? HEADING_DOWN : HEADING_LEFT;
};
var flipHeading = (h) => [
  h[0] === 0 ? 0 : h[0] > 0 ? -1 : 1,
  h[1] === 0 ? 0 : h[1] > 0 ? -1 : 1
];

// src/mutateElement.ts
init_define_import_meta_env();
import {
  getSizeFromPoints as getSizeFromPoints2,
  randomInteger,
  getUpdatedTimestamp
} from "@excalidraw/common";

// src/elbowArrow.ts
init_define_import_meta_env();
import {
  clamp as clamp2,
  pointDistance as pointDistance3,
  pointFrom as pointFrom6,
  pointScaleFromOrigin as pointScaleFromOrigin2,
  pointsEqual as pointsEqual4,
  pointTranslate,
  vector as vector2,
  vectorCross as vectorCross2,
  vectorFromPoint as vectorFromPoint5,
  vectorScale as vectorScale5
} from "@excalidraw/math";
import {
  BinaryHeap,
  invariant as invariant4,
  isAnyTrue,
  tupleToCoors,
  getSizeFromPoints,
  isDevEnv as isDevEnv3,
  arrayToMap
} from "@excalidraw/common";
var DEDUP_TRESHOLD = 1;
var BASE_PADDING = 40;
var handleSegmentRenormalization = (arrow, elementsMap) => {
  const nextFixedSegments = arrow.fixedSegments ? arrow.fixedSegments.slice() : null;
  if (nextFixedSegments) {
    const _nextPoints = [];
    arrow.points.map((p) => pointFrom6(arrow.x + p[0], arrow.y + p[1])).forEach((p, i, points) => {
      if (i < 2) {
        return _nextPoints.push(p);
      }
      const currentSegmentIsHorizontal = headingForPoint(p, points[i - 1]);
      const prevSegmentIsHorizontal = headingForPoint(
        points[i - 1],
        points[i - 2]
      );
      if (
        // Check if previous two points are on the same line
        compareHeading(currentSegmentIsHorizontal, prevSegmentIsHorizontal)
      ) {
        const prevSegmentIdx = nextFixedSegments?.findIndex(
          (segment) => segment.index === i - 1
        ) ?? -1;
        const segmentIdx = nextFixedSegments?.findIndex((segment) => segment.index === i) ?? -1;
        if (segmentIdx !== -1) {
          nextFixedSegments[segmentIdx].start = pointFrom6(
            points[i - 2][0] - arrow.x,
            points[i - 2][1] - arrow.y
          );
        }
        if (prevSegmentIdx !== -1) {
          nextFixedSegments.splice(prevSegmentIdx, 1);
        }
        _nextPoints.splice(-1, 1);
        nextFixedSegments.forEach((segment) => {
          if (segment.index > i - 1) {
            segment.index -= 1;
          }
        });
      }
      return _nextPoints.push(p);
    });
    const nextPoints = [];
    _nextPoints.forEach((p, i, points) => {
      if (i < 3) {
        return nextPoints.push(p);
      }
      if (
        // Remove segments that are too short
        pointDistance3(points[i - 2], points[i - 1]) < DEDUP_TRESHOLD
      ) {
        const prevPrevSegmentIdx = nextFixedSegments?.findIndex((segment) => segment.index === i - 2) ?? -1;
        const prevSegmentIdx = nextFixedSegments?.findIndex((segment) => segment.index === i - 1) ?? -1;
        if (prevSegmentIdx !== -1) {
          nextFixedSegments.splice(prevSegmentIdx, 1);
        }
        if (prevPrevSegmentIdx !== -1) {
          nextFixedSegments.splice(prevPrevSegmentIdx, 1);
        }
        nextPoints.splice(-2, 2);
        nextFixedSegments.forEach((segment) => {
          if (segment.index > i - 2) {
            segment.index -= 2;
          }
        });
        const isHorizontal = headingForPointIsHorizontal(p, points[i - 1]);
        return nextPoints.push(
          pointFrom6(
            !isHorizontal ? points[i - 2][0] : p[0],
            isHorizontal ? points[i - 2][1] : p[1]
          )
        );
      }
      nextPoints.push(p);
    });
    const filteredNextFixedSegments = nextFixedSegments.filter(
      (segment) => segment.index !== 1 && segment.index !== nextPoints.length - 1
    );
    if (filteredNextFixedSegments.length === 0) {
      return normalizeArrowElementUpdate(
        getElbowArrowCornerPoints(
          removeElbowArrowShortSegments(
            routeElbowArrow(
              arrow,
              getElbowArrowData(
                arrow,
                elementsMap,
                nextPoints.map(
                  (p) => pointFrom6(p[0] - arrow.x, p[1] - arrow.y)
                )
              )
            ) ?? []
          )
        ),
        filteredNextFixedSegments,
        null,
        null
      );
    }
    isDevEnv3() && invariant4(
      validateElbowPoints(nextPoints),
      "Invalid elbow points with fixed segments"
    );
    return normalizeArrowElementUpdate(
      nextPoints,
      filteredNextFixedSegments,
      arrow.startIsSpecial,
      arrow.endIsSpecial
    );
  }
  return {
    x: arrow.x,
    y: arrow.y,
    points: arrow.points,
    fixedSegments: arrow.fixedSegments,
    startIsSpecial: arrow.startIsSpecial,
    endIsSpecial: arrow.endIsSpecial
  };
};
var handleSegmentRelease = (arrow, fixedSegments, elementsMap) => {
  const newFixedSegmentIndices = fixedSegments.map((segment) => segment.index);
  const oldFixedSegmentIndices = arrow.fixedSegments?.map((segment) => segment.index) ?? [];
  const deletedSegmentIdx = oldFixedSegmentIndices.findIndex(
    (idx) => !newFixedSegmentIndices.includes(idx)
  );
  if (deletedSegmentIdx === -1 || !arrow.fixedSegments?.[deletedSegmentIdx]) {
    return {
      points: arrow.points
    };
  }
  const deletedIdx = arrow.fixedSegments[deletedSegmentIdx].index;
  const prevSegment = arrow.fixedSegments[deletedSegmentIdx - 1];
  const nextSegment = arrow.fixedSegments[deletedSegmentIdx + 1];
  const x = arrow.x + (prevSegment ? prevSegment.end[0] : 0);
  const y = arrow.y + (prevSegment ? prevSegment.end[1] : 0);
  const startBinding = prevSegment ? null : arrow.startBinding;
  const endBinding = nextSegment ? null : arrow.endBinding;
  const {
    startHeading,
    endHeading,
    startGlobalPoint,
    endGlobalPoint,
    hoveredStartElement,
    hoveredEndElement,
    ...rest
  } = getElbowArrowData(
    {
      x,
      y,
      startBinding,
      endBinding,
      startArrowhead: null,
      endArrowhead: null,
      points: arrow.points
    },
    elementsMap,
    [
      pointFrom6(0, 0),
      pointFrom6(
        arrow.x + (nextSegment?.start[0] ?? arrow.points[arrow.points.length - 1][0]) - x,
        arrow.y + (nextSegment?.start[1] ?? arrow.points[arrow.points.length - 1][1]) - y
      )
    ],
    { isDragging: false }
  );
  const { points: restoredPoints } = normalizeArrowElementUpdate(
    getElbowArrowCornerPoints(
      removeElbowArrowShortSegments(
        routeElbowArrow(arrow, {
          startHeading,
          endHeading,
          startGlobalPoint,
          endGlobalPoint,
          hoveredStartElement,
          hoveredEndElement,
          ...rest
        }) ?? []
      )
    ),
    fixedSegments,
    null,
    null
  );
  const nextPoints = [];
  if (prevSegment) {
    for (let i = 0; i < prevSegment.index; i++) {
      nextPoints.push(
        pointFrom6(
          arrow.x + arrow.points[i][0],
          arrow.y + arrow.points[i][1]
        )
      );
    }
  }
  restoredPoints.forEach((p) => {
    nextPoints.push(
      pointFrom6(
        arrow.x + (prevSegment ? prevSegment.end[0] : 0) + p[0],
        arrow.y + (prevSegment ? prevSegment.end[1] : 0) + p[1]
      )
    );
  });
  if (nextSegment) {
    for (let i = nextSegment.index; i < arrow.points.length; i++) {
      nextPoints.push(
        pointFrom6(
          arrow.x + arrow.points[i][0],
          arrow.y + arrow.points[i][1]
        )
      );
    }
  }
  const originalSegmentCountDiff = (nextSegment?.index ?? arrow.points.length) - (prevSegment?.index ?? 0) - 1;
  const nextFixedSegments = fixedSegments.map((segment) => {
    if (segment.index > deletedIdx) {
      return {
        ...segment,
        index: segment.index - originalSegmentCountDiff + (restoredPoints.length - 1)
      };
    }
    return segment;
  });
  const simplifiedPoints = nextPoints.flatMap((p, i) => {
    const prev = nextPoints[i - 1];
    const next = nextPoints[i + 1];
    if (prev && next) {
      const prevHeading = headingForPoint(p, prev);
      const nextHeading = headingForPoint(next, p);
      if (compareHeading(prevHeading, nextHeading)) {
        nextFixedSegments.forEach((segment) => {
          if (segment.index > i) {
            segment.index -= 1;
          }
        });
        return [];
      } else if (compareHeading(prevHeading, flipHeading(nextHeading))) {
        nextFixedSegments.forEach((segment) => {
          if (segment.index > i) {
            segment.index += 1;
          }
        });
        return [p, p];
      }
    }
    return [p];
  });
  return normalizeArrowElementUpdate(
    simplifiedPoints,
    nextFixedSegments,
    false,
    false
  );
};
var handleSegmentMove = (arrow, fixedSegments, startHeading, endHeading, hoveredStartElement, hoveredEndElement) => {
  const activelyModifiedSegmentIdx = fixedSegments.map((segment, i) => {
    if (arrow.fixedSegments == null || arrow.fixedSegments[i] === void 0 || arrow.fixedSegments[i].index !== segment.index) {
      return i;
    }
    return (segment.start[0] !== arrow.fixedSegments[i].start[0] && segment.end[0] !== arrow.fixedSegments[i].end[0]) !== (segment.start[1] !== arrow.fixedSegments[i].start[1] && segment.end[1] !== arrow.fixedSegments[i].end[1]) ? i : null;
  }).filter((idx) => idx !== null).shift();
  if (activelyModifiedSegmentIdx == null) {
    return { points: arrow.points };
  }
  const firstSegmentIdx = arrow.fixedSegments?.findIndex((segment) => segment.index === 1) ?? -1;
  const lastSegmentIdx = arrow.fixedSegments?.findIndex(
    (segment) => segment.index === arrow.points.length - 1
  ) ?? -1;
  const segmentLength = pointDistance3(
    fixedSegments[activelyModifiedSegmentIdx].start,
    fixedSegments[activelyModifiedSegmentIdx].end
  );
  const segmentIsTooShort = segmentLength < BASE_PADDING + 5;
  if (firstSegmentIdx === -1 && fixedSegments[activelyModifiedSegmentIdx].index === 1 && hoveredStartElement) {
    const startIsHorizontal = headingIsHorizontal(startHeading);
    const startIsPositive = startIsHorizontal ? compareHeading(startHeading, HEADING_RIGHT) : compareHeading(startHeading, HEADING_DOWN);
    const padding = startIsPositive ? segmentIsTooShort ? segmentLength / 2 : BASE_PADDING : segmentIsTooShort ? -segmentLength / 2 : -BASE_PADDING;
    fixedSegments[activelyModifiedSegmentIdx].start = pointFrom6(
      fixedSegments[activelyModifiedSegmentIdx].start[0] + (startIsHorizontal ? padding : 0),
      fixedSegments[activelyModifiedSegmentIdx].start[1] + (!startIsHorizontal ? padding : 0)
    );
  }
  if (lastSegmentIdx === -1 && fixedSegments[activelyModifiedSegmentIdx].index === arrow.points.length - 1 && hoveredEndElement) {
    const endIsHorizontal = headingIsHorizontal(endHeading);
    const endIsPositive = endIsHorizontal ? compareHeading(endHeading, HEADING_RIGHT) : compareHeading(endHeading, HEADING_DOWN);
    const padding = endIsPositive ? segmentIsTooShort ? segmentLength / 2 : BASE_PADDING : segmentIsTooShort ? -segmentLength / 2 : -BASE_PADDING;
    fixedSegments[activelyModifiedSegmentIdx].end = pointFrom6(
      fixedSegments[activelyModifiedSegmentIdx].end[0] + (endIsHorizontal ? padding : 0),
      fixedSegments[activelyModifiedSegmentIdx].end[1] + (!endIsHorizontal ? padding : 0)
    );
  }
  const nextFixedSegments = fixedSegments.map((segment) => ({
    ...segment,
    start: pointFrom6(
      arrow.x + segment.start[0],
      arrow.y + segment.start[1]
    ),
    end: pointFrom6(
      arrow.x + segment.end[0],
      arrow.y + segment.end[1]
    )
  }));
  const newPoints = arrow.points.map(
    (p, i) => pointFrom6(arrow.x + p[0], arrow.y + p[1])
  );
  const startIdx = nextFixedSegments[activelyModifiedSegmentIdx].index - 1;
  const endIdx = nextFixedSegments[activelyModifiedSegmentIdx].index;
  const start = nextFixedSegments[activelyModifiedSegmentIdx].start;
  const end = nextFixedSegments[activelyModifiedSegmentIdx].end;
  const prevSegmentIsHorizontal = newPoints[startIdx - 1] && !pointsEqual4(newPoints[startIdx], newPoints[startIdx - 1]) ? headingForPointIsHorizontal(
    newPoints[startIdx - 1],
    newPoints[startIdx]
  ) : void 0;
  const nextSegmentIsHorizontal = newPoints[endIdx + 1] && !pointsEqual4(newPoints[endIdx], newPoints[endIdx + 1]) ? headingForPointIsHorizontal(newPoints[endIdx + 1], newPoints[endIdx]) : void 0;
  if (prevSegmentIsHorizontal !== void 0) {
    const dir = prevSegmentIsHorizontal ? 1 : 0;
    newPoints[startIdx - 1][dir] = start[dir];
  }
  newPoints[startIdx] = start;
  newPoints[endIdx] = end;
  if (nextSegmentIsHorizontal !== void 0) {
    const dir = nextSegmentIsHorizontal ? 1 : 0;
    newPoints[endIdx + 1][dir] = end[dir];
  }
  const prevSegmentIdx = nextFixedSegments.findIndex(
    (segment) => segment.index === startIdx
  );
  if (prevSegmentIdx !== -1) {
    const dir = headingForPointIsHorizontal(
      nextFixedSegments[prevSegmentIdx].end,
      nextFixedSegments[prevSegmentIdx].start
    ) ? 1 : 0;
    nextFixedSegments[prevSegmentIdx].start[dir] = start[dir];
    nextFixedSegments[prevSegmentIdx].end = start;
  }
  const nextSegmentIdx = nextFixedSegments.findIndex(
    (segment) => segment.index === endIdx + 1
  );
  if (nextSegmentIdx !== -1) {
    const dir = headingForPointIsHorizontal(
      nextFixedSegments[nextSegmentIdx].end,
      nextFixedSegments[nextSegmentIdx].start
    ) ? 1 : 0;
    nextFixedSegments[nextSegmentIdx].end[dir] = end[dir];
    nextFixedSegments[nextSegmentIdx].start = end;
  }
  if (firstSegmentIdx === -1 && startIdx === 0) {
    const startIsHorizontal = hoveredStartElement ? headingIsHorizontal(startHeading) : headingForPointIsHorizontal(newPoints[1], newPoints[0]);
    newPoints.unshift(
      pointFrom6(
        startIsHorizontal ? start[0] : arrow.x + arrow.points[0][0],
        !startIsHorizontal ? start[1] : arrow.y + arrow.points[0][1]
      )
    );
    if (hoveredStartElement) {
      newPoints.unshift(
        pointFrom6(
          arrow.x + arrow.points[0][0],
          arrow.y + arrow.points[0][1]
        )
      );
    }
    for (const segment of nextFixedSegments) {
      segment.index += hoveredStartElement ? 2 : 1;
    }
  }
  if (lastSegmentIdx === -1 && endIdx === arrow.points.length - 1) {
    const endIsHorizontal = headingIsHorizontal(endHeading);
    newPoints.push(
      pointFrom6(
        endIsHorizontal ? end[0] : arrow.x + arrow.points[arrow.points.length - 1][0],
        !endIsHorizontal ? end[1] : arrow.y + arrow.points[arrow.points.length - 1][1]
      )
    );
    if (hoveredEndElement) {
      newPoints.push(
        pointFrom6(
          arrow.x + arrow.points[arrow.points.length - 1][0],
          arrow.y + arrow.points[arrow.points.length - 1][1]
        )
      );
    }
  }
  return normalizeArrowElementUpdate(
    newPoints,
    nextFixedSegments.map((segment) => ({
      ...segment,
      start: pointFrom6(
        segment.start[0] - arrow.x,
        segment.start[1] - arrow.y
      ),
      end: pointFrom6(
        segment.end[0] - arrow.x,
        segment.end[1] - arrow.y
      )
    })),
    false,
    // If you move a segment, there is no special point anymore
    false
    // If you move a segment, there is no special point anymore
  );
};
var handleEndpointDrag = (arrow, updatedPoints, fixedSegments, startHeading, endHeading, startGlobalPoint, endGlobalPoint, hoveredStartElement, hoveredEndElement) => {
  let startIsSpecial = arrow.startIsSpecial ?? null;
  let endIsSpecial = arrow.endIsSpecial ?? null;
  const globalUpdatedPoints = updatedPoints.map(
    (p, i) => i === 0 ? pointFrom6(arrow.x + p[0], arrow.y + p[1]) : i === updatedPoints.length - 1 ? pointFrom6(arrow.x + p[0], arrow.y + p[1]) : pointFrom6(
      arrow.x + arrow.points[i][0],
      arrow.y + arrow.points[i][1]
    )
  );
  const nextFixedSegments = fixedSegments.map((segment) => ({
    ...segment,
    start: pointFrom6(
      arrow.x + (segment.start[0] - updatedPoints[0][0]),
      arrow.y + (segment.start[1] - updatedPoints[0][1])
    ),
    end: pointFrom6(
      arrow.x + (segment.end[0] - updatedPoints[0][0]),
      arrow.y + (segment.end[1] - updatedPoints[0][1])
    )
  }));
  const newPoints = [];
  const offset = 2 + (startIsSpecial ? 1 : 0);
  const endOffset = 2 + (endIsSpecial ? 1 : 0);
  while (newPoints.length + offset < globalUpdatedPoints.length - endOffset) {
    newPoints.push(globalUpdatedPoints[newPoints.length + offset]);
  }
  {
    const secondPoint = globalUpdatedPoints[startIsSpecial ? 2 : 1];
    const thirdPoint = globalUpdatedPoints[startIsSpecial ? 3 : 2];
    const startIsHorizontal = headingIsHorizontal(startHeading);
    const secondIsHorizontal = headingIsHorizontal(
      vectorToHeading(vectorFromPoint5(secondPoint, thirdPoint))
    );
    if (hoveredStartElement && startIsHorizontal === secondIsHorizontal) {
      const positive = startIsHorizontal ? compareHeading(startHeading, HEADING_RIGHT) : compareHeading(startHeading, HEADING_DOWN);
      newPoints.unshift(
        pointFrom6(
          !secondIsHorizontal ? thirdPoint[0] : startGlobalPoint[0] + (positive ? BASE_PADDING : -BASE_PADDING),
          secondIsHorizontal ? thirdPoint[1] : startGlobalPoint[1] + (positive ? BASE_PADDING : -BASE_PADDING)
        )
      );
      newPoints.unshift(
        pointFrom6(
          startIsHorizontal ? startGlobalPoint[0] + (positive ? BASE_PADDING : -BASE_PADDING) : startGlobalPoint[0],
          !startIsHorizontal ? startGlobalPoint[1] + (positive ? BASE_PADDING : -BASE_PADDING) : startGlobalPoint[1]
        )
      );
      if (!startIsSpecial) {
        startIsSpecial = true;
        for (const segment of nextFixedSegments) {
          if (segment.index > 1) {
            segment.index += 1;
          }
        }
      }
    } else {
      newPoints.unshift(
        pointFrom6(
          !secondIsHorizontal ? secondPoint[0] : startGlobalPoint[0],
          secondIsHorizontal ? secondPoint[1] : startGlobalPoint[1]
        )
      );
      if (startIsSpecial) {
        startIsSpecial = false;
        for (const segment of nextFixedSegments) {
          if (segment.index > 1) {
            segment.index -= 1;
          }
        }
      }
    }
    newPoints.unshift(startGlobalPoint);
  }
  {
    const secondToLastPoint = globalUpdatedPoints[globalUpdatedPoints.length - (endIsSpecial ? 3 : 2)];
    const thirdToLastPoint = globalUpdatedPoints[globalUpdatedPoints.length - (endIsSpecial ? 4 : 3)];
    const endIsHorizontal = headingIsHorizontal(endHeading);
    const secondIsHorizontal = headingForPointIsHorizontal(
      thirdToLastPoint,
      secondToLastPoint
    );
    if (hoveredEndElement && endIsHorizontal === secondIsHorizontal) {
      const positive = endIsHorizontal ? compareHeading(endHeading, HEADING_RIGHT) : compareHeading(endHeading, HEADING_DOWN);
      newPoints.push(
        pointFrom6(
          !secondIsHorizontal ? thirdToLastPoint[0] : endGlobalPoint[0] + (positive ? BASE_PADDING : -BASE_PADDING),
          secondIsHorizontal ? thirdToLastPoint[1] : endGlobalPoint[1] + (positive ? BASE_PADDING : -BASE_PADDING)
        )
      );
      newPoints.push(
        pointFrom6(
          endIsHorizontal ? endGlobalPoint[0] + (positive ? BASE_PADDING : -BASE_PADDING) : endGlobalPoint[0],
          !endIsHorizontal ? endGlobalPoint[1] + (positive ? BASE_PADDING : -BASE_PADDING) : endGlobalPoint[1]
        )
      );
      if (!endIsSpecial) {
        endIsSpecial = true;
      }
    } else {
      newPoints.push(
        pointFrom6(
          !secondIsHorizontal ? secondToLastPoint[0] : endGlobalPoint[0],
          secondIsHorizontal ? secondToLastPoint[1] : endGlobalPoint[1]
        )
      );
      if (endIsSpecial) {
        endIsSpecial = false;
      }
    }
  }
  newPoints.push(endGlobalPoint);
  return normalizeArrowElementUpdate(
    newPoints,
    nextFixedSegments.map(({ index }) => ({
      index,
      start: newPoints[index - 1],
      end: newPoints[index]
    })).map((segment) => ({
      ...segment,
      start: pointFrom6(
        segment.start[0] - startGlobalPoint[0],
        segment.start[1] - startGlobalPoint[1]
      ),
      end: pointFrom6(
        segment.end[0] - startGlobalPoint[0],
        segment.end[1] - startGlobalPoint[1]
      )
    })),
    startIsSpecial,
    endIsSpecial
  );
};
var MAX_POS = 1e6;
var updateElbowArrowPoints = (arrow, elementsMap, updates, options) => {
  if (arrow.points.length < 2) {
    return { points: updates.points ?? arrow.points };
  }
  if (!define_import_meta_env_default.PROD) {
    invariant4(
      !updates.points || updates.points.length >= 2,
      "Updated point array length must match the arrow point length, contain exactly the new start and end points or not be specified at all (i.e. you can't add new points between start and end manually to elbow arrows)"
    );
    invariant4(
      !arrow.fixedSegments || arrow.fixedSegments.map((s) => s.start[0] === s.end[0] || s.start[1] === s.end[1]).every(Boolean),
      "Fixed segments must be either horizontal or vertical"
    );
    invariant4(
      !updates.fixedSegments || updates.fixedSegments.map((s) => s.start[0] === s.end[0] || s.start[1] === s.end[1]).every(Boolean),
      "Updates to fixed segments must be either horizontal or vertical"
    );
    invariant4(
      arrow.points.slice(1).map(
        (p, i) => p[0] === arrow.points[i][0] || p[1] === arrow.points[i][1]
      ),
      "Elbow arrow segments must be either horizontal or vertical"
    );
    invariant4(
      updates.fixedSegments?.find(
        (segment) => segment.index === 1 && pointsEqual4(segment.start, (updates.points ?? arrow.points)[0])
      ) == null && updates.fixedSegments?.find(
        (segment) => segment.index === (updates.points ?? arrow.points).length - 1 && pointsEqual4(
          segment.end,
          (updates.points ?? arrow.points)[(updates.points ?? arrow.points).length - 1]
        )
      ) == null,
      "The first and last segments cannot be fixed"
    );
  }
  const fixedSegments = updates.fixedSegments ?? arrow.fixedSegments ?? [];
  const updatedPoints = updates.points ? updates.points && updates.points.length === 2 ? arrow.points.map(
    (p, idx) => idx === 0 ? updates.points[0] : idx === arrow.points.length - 1 ? updates.points[1] : p
  ) : updates.points.slice() : arrow.points.slice();
  const {
    startBinding: updatedStartBinding,
    endBinding: updatedEndBinding,
    ...restOfTheUpdates
  } = updates;
  const startBinding = typeof updatedStartBinding !== "undefined" ? updatedStartBinding : arrow.startBinding;
  const endBinding = typeof updatedEndBinding !== "undefined" ? updatedEndBinding : arrow.endBinding;
  const startElement = startBinding && getBindableElementForId(startBinding.elementId, elementsMap);
  const endElement = endBinding && getBindableElementForId(endBinding.elementId, elementsMap);
  const areUpdatedPointsValid = validateElbowPoints(updatedPoints);
  if (startBinding && !startElement && areUpdatedPointsValid || endBinding && !endElement && areUpdatedPointsValid || elementsMap.size === 0 && areUpdatedPointsValid || Object.keys(restOfTheUpdates).length === 0 && (startElement?.id !== startBinding?.elementId || endElement?.id !== endBinding?.elementId)) {
    return normalizeArrowElementUpdate(
      updatedPoints.map(
        (p) => pointFrom6(arrow.x + p[0], arrow.y + p[1])
      ),
      arrow.fixedSegments,
      arrow.startIsSpecial,
      arrow.endIsSpecial
    );
  }
  const {
    startHeading,
    endHeading,
    startGlobalPoint,
    endGlobalPoint,
    hoveredStartElement,
    hoveredEndElement,
    ...rest
  } = getElbowArrowData(
    {
      x: arrow.x,
      y: arrow.y,
      startBinding,
      endBinding,
      startArrowhead: arrow.startArrowhead,
      endArrowhead: arrow.endArrowhead,
      points: arrow.points
    },
    elementsMap,
    updatedPoints,
    options
  );
  if (elementsMap.size === 0 && areUpdatedPointsValid) {
    return normalizeArrowElementUpdate(
      updatedPoints.map(
        (p) => pointFrom6(arrow.x + p[0], arrow.y + p[1])
      ),
      arrow.fixedSegments,
      arrow.startIsSpecial,
      arrow.endIsSpecial
    );
  }
  if (!updates.points && !updates.fixedSegments && !updates.startBinding && !updates.endBinding) {
    return handleSegmentRenormalization(arrow, elementsMap);
  }
  if (updates.startBinding === arrow.startBinding && updates.endBinding === arrow.endBinding && (updates.points ?? []).every(
    (p, i) => pointsEqual4(
      p,
      arrow.points[i] ?? pointFrom6(Infinity, Infinity)
    )
  ) && areUpdatedPointsValid) {
    return {};
  }
  if (fixedSegments.length === 0) {
    return normalizeArrowElementUpdate(
      getElbowArrowCornerPoints(
        removeElbowArrowShortSegments(
          routeElbowArrow(arrow, {
            startHeading,
            endHeading,
            startGlobalPoint,
            endGlobalPoint,
            hoveredStartElement,
            hoveredEndElement,
            ...rest
          }) ?? []
        )
      ),
      fixedSegments,
      null,
      null
    );
  }
  if ((arrow.fixedSegments?.length ?? 0) > fixedSegments.length) {
    return handleSegmentRelease(arrow, fixedSegments, elementsMap);
  }
  if (!updates.points) {
    return handleSegmentMove(
      arrow,
      fixedSegments,
      startHeading,
      endHeading,
      hoveredStartElement,
      hoveredEndElement
    );
  }
  if (updates.points && updates.fixedSegments) {
    return updates;
  }
  return handleEndpointDrag(
    arrow,
    updatedPoints,
    fixedSegments,
    startHeading,
    endHeading,
    startGlobalPoint,
    endGlobalPoint,
    hoveredStartElement,
    hoveredEndElement
  );
};
var getElbowArrowData = (arrow, elementsMap, nextPoints, options) => {
  const origStartGlobalPoint = pointTranslate(nextPoints[0], vector2(arrow.x, arrow.y));
  const origEndGlobalPoint = pointTranslate(nextPoints[nextPoints.length - 1], vector2(arrow.x, arrow.y));
  let hoveredStartElement = null;
  let hoveredEndElement = null;
  if (options?.isDragging) {
    const elements = Array.from(elementsMap.values());
    hoveredStartElement = getHoveredElement(
      origStartGlobalPoint,
      elementsMap,
      elements,
      options?.zoom
    ) || null;
    hoveredEndElement = getHoveredElement(
      origEndGlobalPoint,
      elementsMap,
      elements,
      options?.zoom
    ) || null;
  } else {
    hoveredStartElement = arrow.startBinding ? getBindableElementForId(arrow.startBinding.elementId, elementsMap) || null : null;
    hoveredEndElement = arrow.endBinding ? getBindableElementForId(arrow.endBinding.elementId, elementsMap) || null : null;
  }
  const startGlobalPoint = getGlobalPoint(
    {
      ...arrow,
      type: "arrow",
      elbowed: true,
      points: nextPoints
    },
    "start",
    arrow.startBinding?.fixedPoint,
    origStartGlobalPoint,
    hoveredStartElement,
    elementsMap,
    options?.isDragging
  );
  const endGlobalPoint = getGlobalPoint(
    {
      ...arrow,
      type: "arrow",
      elbowed: true,
      points: nextPoints
    },
    "end",
    arrow.endBinding?.fixedPoint,
    origEndGlobalPoint,
    hoveredEndElement,
    elementsMap,
    options?.isDragging
  );
  const startHeading = getBindPointHeading(
    startGlobalPoint,
    endGlobalPoint,
    hoveredStartElement,
    origStartGlobalPoint,
    elementsMap
  );
  const endHeading = getBindPointHeading(
    endGlobalPoint,
    startGlobalPoint,
    hoveredEndElement,
    origEndGlobalPoint,
    elementsMap
  );
  const startPointBounds = [
    startGlobalPoint[0] - 2,
    startGlobalPoint[1] - 2,
    startGlobalPoint[0] + 2,
    startGlobalPoint[1] + 2
  ];
  const endPointBounds = [
    endGlobalPoint[0] - 2,
    endGlobalPoint[1] - 2,
    endGlobalPoint[0] + 2,
    endGlobalPoint[1] + 2
  ];
  const startElementBounds = hoveredStartElement ? aabbForElement(
    hoveredStartElement,
    elementsMap,
    offsetFromHeading(
      startHeading,
      arrow.startArrowhead ? FIXED_BINDING_DISTANCE * 6 : FIXED_BINDING_DISTANCE * 2,
      1
    )
  ) : startPointBounds;
  const endElementBounds = hoveredEndElement ? aabbForElement(
    hoveredEndElement,
    elementsMap,
    offsetFromHeading(
      endHeading,
      arrow.endArrowhead ? FIXED_BINDING_DISTANCE * 6 : FIXED_BINDING_DISTANCE * 2,
      1
    )
  ) : endPointBounds;
  const boundsOverlap = pointInsideBounds(
    startGlobalPoint,
    hoveredEndElement ? aabbForElement(
      hoveredEndElement,
      elementsMap,
      offsetFromHeading(endHeading, BASE_PADDING, BASE_PADDING)
    ) : endPointBounds
  ) || pointInsideBounds(
    endGlobalPoint,
    hoveredStartElement ? aabbForElement(
      hoveredStartElement,
      elementsMap,
      offsetFromHeading(startHeading, BASE_PADDING, BASE_PADDING)
    ) : startPointBounds
  );
  const commonBounds = commonAABB(
    boundsOverlap ? [startPointBounds, endPointBounds] : [startElementBounds, endElementBounds]
  );
  const dynamicAABBs = generateDynamicAABBs(
    boundsOverlap ? startPointBounds : startElementBounds,
    boundsOverlap ? endPointBounds : endElementBounds,
    commonBounds,
    boundsOverlap ? offsetFromHeading(
      startHeading,
      !hoveredStartElement && !hoveredEndElement ? 0 : BASE_PADDING,
      0
    ) : offsetFromHeading(
      startHeading,
      !hoveredStartElement && !hoveredEndElement ? 0 : BASE_PADDING - (arrow.startArrowhead ? FIXED_BINDING_DISTANCE * 6 : FIXED_BINDING_DISTANCE * 2),
      BASE_PADDING
    ),
    boundsOverlap ? offsetFromHeading(
      endHeading,
      !hoveredStartElement && !hoveredEndElement ? 0 : BASE_PADDING,
      0
    ) : offsetFromHeading(
      endHeading,
      !hoveredStartElement && !hoveredEndElement ? 0 : BASE_PADDING - (arrow.endArrowhead ? FIXED_BINDING_DISTANCE * 6 : FIXED_BINDING_DISTANCE * 2),
      BASE_PADDING
    ),
    boundsOverlap,
    hoveredStartElement && aabbForElement(hoveredStartElement, elementsMap),
    hoveredEndElement && aabbForElement(hoveredEndElement, elementsMap)
  );
  const startDonglePosition = getDonglePosition(
    dynamicAABBs[0],
    startHeading,
    startGlobalPoint
  );
  const endDonglePosition = getDonglePosition(
    dynamicAABBs[1],
    endHeading,
    endGlobalPoint
  );
  return {
    dynamicAABBs,
    startDonglePosition,
    startGlobalPoint,
    startHeading,
    endDonglePosition,
    endGlobalPoint,
    endHeading,
    commonBounds,
    hoveredStartElement,
    hoveredEndElement,
    boundsOverlap,
    startElementBounds,
    endElementBounds
  };
};
var routeElbowArrow = (arrow, elbowArrowData) => {
  const {
    dynamicAABBs,
    startDonglePosition,
    startGlobalPoint,
    startHeading,
    endDonglePosition,
    endGlobalPoint,
    endHeading,
    commonBounds,
    hoveredEndElement
  } = elbowArrowData;
  const grid = calculateGrid(
    dynamicAABBs,
    startDonglePosition ? startDonglePosition : startGlobalPoint,
    startHeading,
    endDonglePosition ? endDonglePosition : endGlobalPoint,
    endHeading,
    commonBounds
  );
  const startDongle = startDonglePosition && pointToGridNode(startDonglePosition, grid);
  const endDongle = endDonglePosition && pointToGridNode(endDonglePosition, grid);
  const endNode = pointToGridNode(endGlobalPoint, grid);
  if (endNode && hoveredEndElement) {
    endNode.closed = true;
  }
  const startNode = pointToGridNode(startGlobalPoint, grid);
  if (startNode && arrow.startBinding) {
    startNode.closed = true;
  }
  const dongleOverlap = startDongle && endDongle && (pointInsideBounds(startDongle.pos, dynamicAABBs[1]) || pointInsideBounds(endDongle.pos, dynamicAABBs[0]));
  const path = astar(
    startDongle ? startDongle : startNode,
    endDongle ? endDongle : endNode,
    grid,
    startHeading ? startHeading : HEADING_RIGHT,
    endHeading ? endHeading : HEADING_RIGHT,
    dongleOverlap ? [] : dynamicAABBs
  );
  if (path) {
    const points = path.map((node) => [
      node.pos[0],
      node.pos[1]
    ]);
    startDongle && points.unshift(startGlobalPoint);
    endDongle && points.push(endGlobalPoint);
    return points;
  }
  return null;
};
var offsetFromHeading = (heading, head, side) => {
  switch (heading) {
    case HEADING_UP:
      return [head, side, side, side];
    case HEADING_RIGHT:
      return [side, head, side, side];
    case HEADING_DOWN:
      return [side, side, head, side];
  }
  return [side, side, side, head];
};
var astar = (start, end, grid, startHeading, endHeading, aabbs) => {
  const bendMultiplier = m_dist(start.pos, end.pos);
  const open = new BinaryHeap((node) => node.f);
  open.push(start);
  while (open.size() > 0) {
    const current = open.pop();
    if (!current || current.closed) {
      continue;
    }
    if (current === end) {
      return pathTo(start, current);
    }
    current.closed = true;
    const neighbors = getNeighbors(current.addr, grid);
    for (let i = 0; i < 4; i++) {
      const neighbor = neighbors[i];
      if (!neighbor || neighbor.closed) {
        continue;
      }
      const neighborHalfPoint = pointScaleFromOrigin2(
        neighbor.pos,
        current.pos,
        0.5
      );
      if (isAnyTrue(
        ...aabbs.map((aabb) => pointInsideBounds(neighborHalfPoint, aabb))
      )) {
        continue;
      }
      const neighborHeading = neighborIndexToHeading(i);
      const previousDirection = current.parent ? vectorToHeading(vectorFromPoint5(current.pos, current.parent.pos)) : startHeading;
      const reverseHeading = flipHeading(previousDirection);
      const neighborIsReverseRoute = compareHeading(reverseHeading, neighborHeading) || gridAddressesEqual(start.addr, neighbor.addr) && compareHeading(neighborHeading, startHeading) || gridAddressesEqual(end.addr, neighbor.addr) && compareHeading(neighborHeading, endHeading);
      if (neighborIsReverseRoute) {
        continue;
      }
      const directionChange = previousDirection !== neighborHeading;
      const gScore = current.g + m_dist(neighbor.pos, current.pos) + (directionChange ? Math.pow(bendMultiplier, 3) : 0);
      const beenVisited = neighbor.visited;
      if (!beenVisited || gScore < neighbor.g) {
        const estBendCount = estimateSegmentCount(
          neighbor,
          end,
          neighborHeading,
          endHeading
        );
        neighbor.visited = true;
        neighbor.parent = current;
        neighbor.h = m_dist(end.pos, neighbor.pos) + estBendCount * Math.pow(bendMultiplier, 2);
        neighbor.g = gScore;
        neighbor.f = neighbor.g + neighbor.h;
        if (!beenVisited) {
          open.push(neighbor);
        } else {
          open.rescoreElement(neighbor);
        }
      }
    }
  }
  return null;
};
var pathTo = (start, node) => {
  let curr = node;
  const path = [];
  while (curr.parent) {
    path.unshift(curr);
    curr = curr.parent;
  }
  path.unshift(start);
  return path;
};
var m_dist = (a2, b2) => Math.abs(a2[0] - b2[0]) + Math.abs(a2[1] - b2[1]);
var generateDynamicAABBs = (a2, b2, common, startDifference, endDifference, disableSideHack, startElementBounds, endElementBounds) => {
  const startEl = startElementBounds ?? a2;
  const endEl = endElementBounds ?? b2;
  const [startUp, startRight, startDown, startLeft] = startDifference ?? [
    0,
    0,
    0,
    0
  ];
  const [endUp, endRight, endDown, endLeft] = endDifference ?? [0, 0, 0, 0];
  const first = [
    a2[0] > b2[2] ? a2[1] > b2[3] || a2[3] < b2[1] ? Math.min((startEl[0] + endEl[2]) / 2, a2[0] - startLeft) : (startEl[0] + endEl[2]) / 2 : a2[0] > b2[0] ? a2[0] - startLeft : common[0] - startLeft,
    a2[1] > b2[3] ? a2[0] > b2[2] || a2[2] < b2[0] ? Math.min((startEl[1] + endEl[3]) / 2, a2[1] - startUp) : (startEl[1] + endEl[3]) / 2 : a2[1] > b2[1] ? a2[1] - startUp : common[1] - startUp,
    a2[2] < b2[0] ? a2[1] > b2[3] || a2[3] < b2[1] ? Math.max((startEl[2] + endEl[0]) / 2, a2[2] + startRight) : (startEl[2] + endEl[0]) / 2 : a2[2] < b2[2] ? a2[2] + startRight : common[2] + startRight,
    a2[3] < b2[1] ? a2[0] > b2[2] || a2[2] < b2[0] ? Math.max((startEl[3] + endEl[1]) / 2, a2[3] + startDown) : (startEl[3] + endEl[1]) / 2 : a2[3] < b2[3] ? a2[3] + startDown : common[3] + startDown
  ];
  const second = [
    b2[0] > a2[2] ? b2[1] > a2[3] || b2[3] < a2[1] ? Math.min((endEl[0] + startEl[2]) / 2, b2[0] - endLeft) : (endEl[0] + startEl[2]) / 2 : b2[0] > a2[0] ? b2[0] - endLeft : common[0] - endLeft,
    b2[1] > a2[3] ? b2[0] > a2[2] || b2[2] < a2[0] ? Math.min((endEl[1] + startEl[3]) / 2, b2[1] - endUp) : (endEl[1] + startEl[3]) / 2 : b2[1] > a2[1] ? b2[1] - endUp : common[1] - endUp,
    b2[2] < a2[0] ? b2[1] > a2[3] || b2[3] < a2[1] ? Math.max((endEl[2] + startEl[0]) / 2, b2[2] + endRight) : (endEl[2] + startEl[0]) / 2 : b2[2] < a2[2] ? b2[2] + endRight : common[2] + endRight,
    b2[3] < a2[1] ? b2[0] > a2[2] || b2[2] < a2[0] ? Math.max((endEl[3] + startEl[1]) / 2, b2[3] + endDown) : (endEl[3] + startEl[1]) / 2 : b2[3] < a2[3] ? b2[3] + endDown : common[3] + endDown
  ];
  const c = commonAABB([first, second]);
  if (!disableSideHack && first[2] - first[0] + second[2] - second[0] > c[2] - c[0] + 1e-11 && first[3] - first[1] + second[3] - second[1] > c[3] - c[1] + 1e-11) {
    const [endCenterX, endCenterY] = [
      (second[0] + second[2]) / 2,
      (second[1] + second[3]) / 2
    ];
    if (b2[0] > a2[2] && a2[1] > b2[3]) {
      const cX = first[2] + (second[0] - first[2]) / 2;
      const cY = second[3] + (first[1] - second[3]) / 2;
      if (vectorCross2(
        vector2(a2[2] - endCenterX, a2[1] - endCenterY),
        vector2(a2[0] - endCenterX, a2[3] - endCenterY)
      ) > 0) {
        return [
          [first[0], first[1], cX, first[3]],
          [cX, second[1], second[2], second[3]]
        ];
      }
      return [
        [first[0], cY, first[2], first[3]],
        [second[0], second[1], second[2], cY]
      ];
    } else if (a2[2] < b2[0] && a2[3] < b2[1]) {
      const cX = first[2] + (second[0] - first[2]) / 2;
      const cY = first[3] + (second[1] - first[3]) / 2;
      if (vectorCross2(
        vector2(a2[0] - endCenterX, a2[1] - endCenterY),
        vector2(a2[2] - endCenterX, a2[3] - endCenterY)
      ) > 0) {
        return [
          [first[0], first[1], first[2], cY],
          [second[0], cY, second[2], second[3]]
        ];
      }
      return [
        [first[0], first[1], cX, first[3]],
        [cX, second[1], second[2], second[3]]
      ];
    } else if (a2[0] > b2[2] && a2[3] < b2[1]) {
      const cX = second[2] + (first[0] - second[2]) / 2;
      const cY = first[3] + (second[1] - first[3]) / 2;
      if (vectorCross2(
        vector2(a2[2] - endCenterX, a2[1] - endCenterY),
        vector2(a2[0] - endCenterX, a2[3] - endCenterY)
      ) > 0) {
        return [
          [cX, first[1], first[2], first[3]],
          [second[0], second[1], cX, second[3]]
        ];
      }
      return [
        [first[0], first[1], first[2], cY],
        [second[0], cY, second[2], second[3]]
      ];
    } else if (a2[0] > b2[2] && a2[1] > b2[3]) {
      const cX = second[2] + (first[0] - second[2]) / 2;
      const cY = second[3] + (first[1] - second[3]) / 2;
      if (vectorCross2(
        vector2(a2[0] - endCenterX, a2[1] - endCenterY),
        vector2(a2[2] - endCenterX, a2[3] - endCenterY)
      ) > 0) {
        return [
          [cX, first[1], first[2], first[3]],
          [second[0], second[1], cX, second[3]]
        ];
      }
      return [
        [first[0], cY, first[2], first[3]],
        [second[0], second[1], second[2], cY]
      ];
    }
  }
  return [first, second];
};
var calculateGrid = (aabbs, start, startHeading, end, endHeading, common) => {
  const horizontal = /* @__PURE__ */ new Set();
  const vertical = /* @__PURE__ */ new Set();
  if (startHeading === HEADING_LEFT || startHeading === HEADING_RIGHT) {
    vertical.add(start[1]);
  } else {
    horizontal.add(start[0]);
  }
  if (endHeading === HEADING_LEFT || endHeading === HEADING_RIGHT) {
    vertical.add(end[1]);
  } else {
    horizontal.add(end[0]);
  }
  aabbs.forEach((aabb) => {
    horizontal.add(aabb[0]);
    horizontal.add(aabb[2]);
    vertical.add(aabb[1]);
    vertical.add(aabb[3]);
  });
  horizontal.add(common[0]);
  horizontal.add(common[2]);
  vertical.add(common[1]);
  vertical.add(common[3]);
  const _vertical = Array.from(vertical).sort((a2, b2) => a2 - b2);
  const _horizontal = Array.from(horizontal).sort((a2, b2) => a2 - b2);
  return {
    row: _vertical.length,
    col: _horizontal.length,
    data: _vertical.flatMap(
      (y, row) => _horizontal.map(
        (x, col) => ({
          f: 0,
          g: 0,
          h: 0,
          closed: false,
          visited: false,
          parent: null,
          addr: [col, row],
          pos: [x, y]
        })
      )
    )
  };
};
var getDonglePosition = (bounds, heading, p) => {
  switch (heading) {
    case HEADING_UP:
      return pointFrom6(p[0], bounds[1]);
    case HEADING_RIGHT:
      return pointFrom6(bounds[2], p[1]);
    case HEADING_DOWN:
      return pointFrom6(p[0], bounds[3]);
  }
  return pointFrom6(bounds[0], p[1]);
};
var estimateSegmentCount = (start, end, startHeading, endHeading) => {
  if (endHeading === HEADING_RIGHT) {
    switch (startHeading) {
      case HEADING_RIGHT: {
        if (start.pos[0] >= end.pos[0]) {
          return 4;
        }
        if (start.pos[1] === end.pos[1]) {
          return 0;
        }
        return 2;
      }
      case HEADING_UP:
        if (start.pos[1] > end.pos[1] && start.pos[0] < end.pos[0]) {
          return 1;
        }
        return 3;
      case HEADING_DOWN:
        if (start.pos[1] < end.pos[1] && start.pos[0] < end.pos[0]) {
          return 1;
        }
        return 3;
      case HEADING_LEFT:
        if (start.pos[1] === end.pos[1]) {
          return 4;
        }
        return 2;
    }
  } else if (endHeading === HEADING_LEFT) {
    switch (startHeading) {
      case HEADING_RIGHT:
        if (start.pos[1] === end.pos[1]) {
          return 4;
        }
        return 2;
      case HEADING_UP:
        if (start.pos[1] > end.pos[1] && start.pos[0] > end.pos[0]) {
          return 1;
        }
        return 3;
      case HEADING_DOWN:
        if (start.pos[1] < end.pos[1] && start.pos[0] > end.pos[0]) {
          return 1;
        }
        return 3;
      case HEADING_LEFT:
        if (start.pos[0] <= end.pos[0]) {
          return 4;
        }
        if (start.pos[1] === end.pos[1]) {
          return 0;
        }
        return 2;
    }
  } else if (endHeading === HEADING_UP) {
    switch (startHeading) {
      case HEADING_RIGHT:
        if (start.pos[1] > end.pos[1] && start.pos[0] < end.pos[0]) {
          return 1;
        }
        return 3;
      case HEADING_UP:
        if (start.pos[1] >= end.pos[1]) {
          return 4;
        }
        if (start.pos[0] === end.pos[0]) {
          return 0;
        }
        return 2;
      case HEADING_DOWN:
        if (start.pos[0] === end.pos[0]) {
          return 4;
        }
        return 2;
      case HEADING_LEFT:
        if (start.pos[1] > end.pos[1] && start.pos[0] > end.pos[0]) {
          return 1;
        }
        return 3;
    }
  } else if (endHeading === HEADING_DOWN) {
    switch (startHeading) {
      case HEADING_RIGHT:
        if (start.pos[1] < end.pos[1] && start.pos[0] < end.pos[0]) {
          return 1;
        }
        return 3;
      case HEADING_UP:
        if (start.pos[0] === end.pos[0]) {
          return 4;
        }
        return 2;
      case HEADING_DOWN:
        if (start.pos[1] <= end.pos[1]) {
          return 4;
        }
        if (start.pos[0] === end.pos[0]) {
          return 0;
        }
        return 2;
      case HEADING_LEFT:
        if (start.pos[1] < end.pos[1] && start.pos[0] > end.pos[0]) {
          return 1;
        }
        return 3;
    }
  }
  return 0;
};
var getNeighbors = ([col, row], grid) => [
  gridNodeFromAddr([col, row - 1], grid),
  gridNodeFromAddr([col + 1, row], grid),
  gridNodeFromAddr([col, row + 1], grid),
  gridNodeFromAddr([col - 1, row], grid)
];
var gridNodeFromAddr = ([col, row], grid) => {
  if (col < 0 || col >= grid.col || row < 0 || row >= grid.row) {
    return null;
  }
  return grid.data[row * grid.col + col] ?? null;
};
var pointToGridNode = (point, grid) => {
  for (let col = 0; col < grid.col; col++) {
    for (let row = 0; row < grid.row; row++) {
      const candidate = gridNodeFromAddr([col, row], grid);
      if (candidate && point[0] === candidate.pos[0] && point[1] === candidate.pos[1]) {
        return candidate;
      }
    }
  }
  return null;
};
var commonAABB = (aabbs) => [
  Math.min(...aabbs.map((aabb) => aabb[0])),
  Math.min(...aabbs.map((aabb) => aabb[1])),
  Math.max(...aabbs.map((aabb) => aabb[2])),
  Math.max(...aabbs.map((aabb) => aabb[3]))
];
var getBindableElementForId = (id, elementsMap) => {
  const element = elementsMap.get(id);
  if (element && isBindableElement(element)) {
    return element;
  }
  return null;
};
var normalizeArrowElementUpdate = (global2, nextFixedSegments, startIsSpecial, endIsSpecial) => {
  const offsetX = global2[0][0];
  const offsetY = global2[0][1];
  let points = global2.map(
    (p) => pointTranslate(
      p,
      vectorScale5(vectorFromPoint5(global2[0]), -1)
    )
  );
  if (offsetX < -MAX_POS || offsetX > MAX_POS || offsetY < -MAX_POS || offsetY > MAX_POS || offsetX + points[points.length - 1][0] < -MAX_POS || offsetY + points[points.length - 1][0] > MAX_POS || offsetX + points[points.length - 1][1] < -MAX_POS || offsetY + points[points.length - 1][1] > MAX_POS) {
    console.error(
      "Elbow arrow normalization is outside reasonable bounds (> 1e6)",
      {
        x: offsetX,
        y: offsetY,
        points,
        ...getSizeFromPoints(points)
      }
    );
  }
  points = points.map(
    ([x, y]) => pointFrom6(clamp2(x, -1e6, 1e6), clamp2(y, -1e6, 1e6))
  );
  return {
    points,
    x: clamp2(offsetX, -1e6, 1e6),
    y: clamp2(offsetY, -1e6, 1e6),
    fixedSegments: (nextFixedSegments?.length ?? 0) > 0 ? nextFixedSegments : null,
    ...getSizeFromPoints(points),
    startIsSpecial,
    endIsSpecial
  };
};
var getElbowArrowCornerPoints = (points) => {
  if (points.length > 1) {
    let previousHorizontal = Math.abs(points[0][1] - points[1][1]) < Math.abs(points[0][0] - points[1][0]);
    return points.filter((p, idx) => {
      if (idx === 0 || idx === points.length - 1) {
        return true;
      }
      const next = points[idx + 1];
      const nextHorizontal = Math.abs(p[1] - next[1]) < Math.abs(p[0] - next[0]);
      if (previousHorizontal === nextHorizontal) {
        previousHorizontal = nextHorizontal;
        return false;
      }
      previousHorizontal = nextHorizontal;
      return true;
    });
  }
  return points;
};
var removeElbowArrowShortSegments = (points) => {
  if (points.length >= 4) {
    return points.filter((p, idx) => {
      if (idx === 0 || idx === points.length - 1) {
        return true;
      }
      const prev = points[idx - 1];
      const prevDist = pointDistance3(prev, p);
      return prevDist > DEDUP_TRESHOLD;
    });
  }
  return points;
};
var neighborIndexToHeading = (idx) => {
  switch (idx) {
    case 0:
      return HEADING_UP;
    case 1:
      return HEADING_RIGHT;
    case 2:
      return HEADING_DOWN;
  }
  return HEADING_LEFT;
};
var getGlobalPoint = (arrow, startOrEnd, fixedPointRatio, initialPoint, element, elementsMap, isDragging) => {
  if (isDragging) {
    if (element && elementsMap) {
      return bindPointToSnapToElementOutline(
        arrow,
        element,
        startOrEnd,
        elementsMap
      );
    }
    return initialPoint;
  }
  if (element) {
    return getGlobalFixedPointForBindableElement(
      fixedPointRatio || [0, 0],
      element,
      elementsMap ?? arrayToMap([element])
    );
  }
  return initialPoint;
};
var getBindPointHeading = (p, otherPoint, hoveredElement, origPoint, elementsMap) => getHeadingForElbowArrowSnap(
  p,
  otherPoint,
  hoveredElement,
  hoveredElement && aabbForElement(
    hoveredElement,
    elementsMap,
    Array(4).fill(distanceToElement(hoveredElement, elementsMap, p))
  ),
  origPoint,
  elementsMap
);
var getHoveredElement = (origPoint, elementsMap, elements, zoom) => {
  return getHoveredElementForBinding(
    tupleToCoors(origPoint),
    elements,
    elementsMap,
    zoom,
    true,
    true
  );
};
var gridAddressesEqual = (a2, b2) => a2[0] === b2[0] && a2[1] === b2[1];
var validateElbowPoints = (points, tolerance = DEDUP_TRESHOLD) => points.slice(1).map(
  (p, i) => Math.abs(p[0] - points[i][0]) < tolerance || Math.abs(p[1] - points[i][1]) < tolerance
).every(Boolean);

// src/mutateElement.ts
var mutateElement = (element, elementsMap, updates, options) => {
  let didChange = false;
  const { points, fixedSegments, startBinding, endBinding, fileId } = updates;
  if (isElbowArrow(element) && (Object.keys(updates).length === 0 || // normalization case
  typeof points !== "undefined" || // repositioning
  typeof fixedSegments !== "undefined" || // segment fixing
  typeof startBinding !== "undefined" || typeof endBinding !== "undefined")) {
    updates = {
      ...updates,
      angle: 0,
      ...updateElbowArrowPoints(
        {
          ...element,
          x: updates.x || element.x,
          y: updates.y || element.y
        },
        elementsMap,
        updates,
        options
      )
    };
  } else if (typeof points !== "undefined") {
    updates = { ...getSizeFromPoints2(points), ...updates };
  }
  for (const key in updates) {
    const value = updates[key];
    if (typeof value !== "undefined") {
      if (element[key] === value && // if object, always update because its attrs could have changed
      // (except for specific keys we handle below)
      (typeof value !== "object" || value === null || key === "groupIds" || key === "scale")) {
        continue;
      }
      if (key === "scale") {
        const prevScale = element[key];
        const nextScale = value;
        if (prevScale[0] === nextScale[0] && prevScale[1] === nextScale[1]) {
          continue;
        }
      } else if (key === "points") {
        const prevPoints = element[key];
        const nextPoints = value;
        if (prevPoints.length === nextPoints.length) {
          let didChangePoints = false;
          let index = prevPoints.length;
          while (--index) {
            const prevPoint = prevPoints[index];
            const nextPoint = nextPoints[index];
            if (prevPoint[0] !== nextPoint[0] || prevPoint[1] !== nextPoint[1]) {
              didChangePoints = true;
              break;
            }
          }
          if (!didChangePoints) {
            continue;
          }
        }
      }
      element[key] = value;
      didChange = true;
    }
  }
  if (!didChange) {
    return element;
  }
  if (typeof updates.height !== "undefined" || typeof updates.width !== "undefined" || typeof fileId != "undefined" || typeof points !== "undefined") {
    ShapeCache.delete(element);
  }
  element.version = updates.version ?? element.version + 1;
  element.versionNonce = updates.versionNonce ?? randomInteger();
  element.updated = getUpdatedTimestamp();
  return element;
};
var newElementWith = (element, updates, force = false) => {
  let didChange = false;
  for (const key in updates) {
    const value = updates[key];
    if (typeof value !== "undefined") {
      if (element[key] === value && // if object, always update because its attrs could have changed
      (typeof value !== "object" || value === null)) {
        continue;
      }
      didChange = true;
    }
  }
  if (!didChange && !force) {
    return element;
  }
  return {
    ...element,
    ...updates,
    version: updates.version ?? element.version + 1,
    versionNonce: updates.versionNonce ?? randomInteger(),
    updated: getUpdatedTimestamp()
  };
};
var bumpVersion = (element, version) => {
  element.version = (version ?? element.version) + 1;
  element.versionNonce = randomInteger();
  element.updated = getUpdatedTimestamp();
  return element;
};

// src/binding.ts
var shouldEnableBindingForPointerEvent = (event) => {
  return !event[KEYS.CTRL_OR_CMD];
};
var isBindingEnabled = (appState) => {
  return appState.isBindingEnabled;
};
var FIXED_BINDING_DISTANCE = 5;
var BINDING_HIGHLIGHT_THICKNESS = 10;
var getNonDeletedElements = (scene, ids) => {
  const result = [];
  ids.forEach((id) => {
    const element = scene.getNonDeletedElement(id);
    if (element != null) {
      result.push(element);
    }
  });
  return result;
};
var bindOrUnbindLinearElement = (linearElement, startBindingElement, endBindingElement, scene) => {
  const elementsMap = scene.getNonDeletedElementsMap();
  const boundToElementIds = /* @__PURE__ */ new Set();
  const unboundFromElementIds = /* @__PURE__ */ new Set();
  bindOrUnbindLinearElementEdge(
    linearElement,
    startBindingElement,
    endBindingElement,
    "start",
    boundToElementIds,
    unboundFromElementIds,
    scene,
    elementsMap
  );
  bindOrUnbindLinearElementEdge(
    linearElement,
    endBindingElement,
    startBindingElement,
    "end",
    boundToElementIds,
    unboundFromElementIds,
    scene,
    elementsMap
  );
  const onlyUnbound = Array.from(unboundFromElementIds).filter(
    (id) => !boundToElementIds.has(id)
  );
  getNonDeletedElements(scene, onlyUnbound).forEach((element) => {
    scene.mutateElement(element, {
      boundElements: element.boundElements?.filter(
        (element2) => element2.type !== "arrow" || element2.id !== linearElement.id
      )
    });
  });
};
var bindOrUnbindLinearElementEdge = (linearElement, bindableElement, otherEdgeBindableElement, startOrEnd, boundToElementIds, unboundFromElementIds, scene, elementsMap) => {
  if (bindableElement === "keep") {
    return;
  }
  if (bindableElement === null) {
    const unbound = unbindLinearElement(linearElement, startOrEnd, scene);
    if (unbound != null) {
      unboundFromElementIds.add(unbound);
    }
    return;
  }
  if (isLinearElementSimple(linearElement)) {
    if (otherEdgeBindableElement == null || (otherEdgeBindableElement === "keep" ? (
      // TODO: Refactor - Needlessly complex
      !isLinearElementSimpleAndAlreadyBoundOnOppositeEdge(
        linearElement,
        bindableElement,
        startOrEnd
      )
    ) : startOrEnd === "start" || otherEdgeBindableElement.id !== bindableElement.id)) {
      bindLinearElement(linearElement, bindableElement, startOrEnd, scene);
      boundToElementIds.add(bindableElement.id);
    }
  } else {
    bindLinearElement(linearElement, bindableElement, startOrEnd, scene);
    boundToElementIds.add(bindableElement.id);
  }
};
var getOriginalBindingsIfStillCloseToArrowEnds = (linearElement, elementsMap, zoom) => ["start", "end"].map((edge) => {
  const coors = getLinearElementEdgeCoors(linearElement, edge, elementsMap);
  const elementId = edge === "start" ? linearElement.startBinding?.elementId : linearElement.endBinding?.elementId;
  if (elementId) {
    const element = elementsMap.get(elementId);
    if (isBindableElement(element) && bindingBorderTest(element, coors, elementsMap, zoom)) {
      return element;
    }
  }
  return null;
});
var getBindingStrategyForDraggingArrowEndpoints = (selectedElement, isBindingEnabled2, draggingPoints, elementsMap, elements, zoom) => {
  const startIdx = 0;
  const endIdx = selectedElement.points.length - 1;
  const startDragged = draggingPoints.findIndex((i) => i === startIdx) > -1;
  const endDragged = draggingPoints.findIndex((i) => i === endIdx) > -1;
  const start = startDragged ? isBindingEnabled2 ? getEligibleElementForBindingElement(
    selectedElement,
    "start",
    elementsMap,
    elements,
    zoom
  ) : null : "keep";
  const end = endDragged ? isBindingEnabled2 ? getEligibleElementForBindingElement(
    selectedElement,
    "end",
    elementsMap,
    elements,
    zoom
  ) : null : "keep";
  return [start, end];
};
var getBindingStrategyForDraggingArrowOrJoints = (selectedElement, elementsMap, elements, isBindingEnabled2, zoom) => {
  if (isElbowArrow(selectedElement)) {
    return ["keep", "keep"];
  }
  const [startIsClose, endIsClose] = getOriginalBindingsIfStillCloseToArrowEnds(
    selectedElement,
    elementsMap,
    zoom
  );
  const start = startIsClose ? isBindingEnabled2 ? getEligibleElementForBindingElement(
    selectedElement,
    "start",
    elementsMap,
    elements,
    zoom
  ) : null : null;
  const end = endIsClose ? isBindingEnabled2 ? getEligibleElementForBindingElement(
    selectedElement,
    "end",
    elementsMap,
    elements,
    zoom
  ) : null : null;
  return [start, end];
};
var bindOrUnbindLinearElements = (selectedElements, isBindingEnabled2, draggingPoints, scene, zoom) => {
  selectedElements.forEach((selectedElement) => {
    const [start, end] = draggingPoints?.length ? (
      // The arrow edge points are dragged (i.e. start, end)
      getBindingStrategyForDraggingArrowEndpoints(
        selectedElement,
        isBindingEnabled2,
        draggingPoints ?? [],
        scene.getNonDeletedElementsMap(),
        scene.getNonDeletedElements(),
        zoom
      )
    ) : (
      // The arrow itself (the shaft) or the inner joins are dragged
      getBindingStrategyForDraggingArrowOrJoints(
        selectedElement,
        scene.getNonDeletedElementsMap(),
        scene.getNonDeletedElements(),
        isBindingEnabled2,
        zoom
      )
    );
    bindOrUnbindLinearElement(selectedElement, start, end, scene);
  });
};
var getSuggestedBindingsForArrows = (selectedElements, elementsMap, zoom) => {
  if (selectedElements.length > 50) {
    return [];
  }
  return selectedElements.filter(isLinearElement).flatMap(
    (element) => getOriginalBindingsIfStillCloseToArrowEnds(element, elementsMap, zoom)
  ).filter(
    (element) => element !== null
  ).filter(
    (element) => selectedElements.filter((selected) => selected.id === element?.id).length === 0
  );
};
var maybeSuggestBindingsForLinearElementAtCoords = (linearElement, pointerCoords, scene, zoom, oppositeBindingBoundElement) => Array.from(
  pointerCoords.reduce(
    (acc, coords) => {
      const hoveredBindableElement = getHoveredElementForBinding(
        coords,
        scene.getNonDeletedElements(),
        scene.getNonDeletedElementsMap(),
        zoom,
        isElbowArrow(linearElement),
        isElbowArrow(linearElement)
      );
      if (hoveredBindableElement != null && !isLinearElementSimpleAndAlreadyBound(
        linearElement,
        oppositeBindingBoundElement?.id,
        hoveredBindableElement
      )) {
        acc.add(hoveredBindableElement);
      }
      return acc;
    },
    /* @__PURE__ */ new Set()
  )
);
var maybeBindLinearElement = (linearElement, appState, pointerCoords, scene) => {
  const elements = scene.getNonDeletedElements();
  const elementsMap = scene.getNonDeletedElementsMap();
  if (appState.startBoundElement != null) {
    bindLinearElement(
      linearElement,
      appState.startBoundElement,
      "start",
      scene
    );
  }
  const hoveredElement = getHoveredElementForBinding(
    pointerCoords,
    elements,
    elementsMap,
    appState.zoom,
    isElbowArrow(linearElement),
    isElbowArrow(linearElement)
  );
  if (hoveredElement !== null) {
    if (!isLinearElementSimpleAndAlreadyBoundOnOppositeEdge(
      linearElement,
      hoveredElement,
      "end"
    )) {
      bindLinearElement(linearElement, hoveredElement, "end", scene);
    }
  }
};
var normalizePointBinding = (binding, hoveredElement) => ({
  ...binding,
  gap: Math.min(
    binding.gap,
    maxBindingGap(hoveredElement, hoveredElement.width, hoveredElement.height)
  )
});
var bindLinearElement = (linearElement, hoveredElement, startOrEnd, scene) => {
  if (!isArrowElement(linearElement)) {
    return;
  }
  let binding = {
    elementId: hoveredElement.id,
    ...normalizePointBinding(
      calculateFocusAndGap(
        linearElement,
        hoveredElement,
        startOrEnd,
        scene.getNonDeletedElementsMap()
      ),
      hoveredElement
    )
  };
  if (isElbowArrow(linearElement)) {
    binding = {
      ...binding,
      ...calculateFixedPointForElbowArrowBinding(
        linearElement,
        hoveredElement,
        startOrEnd,
        scene.getNonDeletedElementsMap()
      )
    };
  }
  scene.mutateElement(linearElement, {
    [startOrEnd === "start" ? "startBinding" : "endBinding"]: binding
  });
  const boundElementsMap = arrayToMap2(hoveredElement.boundElements || []);
  if (!boundElementsMap.has(linearElement.id)) {
    scene.mutateElement(hoveredElement, {
      boundElements: (hoveredElement.boundElements || []).concat({
        id: linearElement.id,
        type: "arrow"
      })
    });
  }
};
var isLinearElementSimpleAndAlreadyBoundOnOppositeEdge = (linearElement, bindableElement, startOrEnd) => {
  const otherBinding = linearElement[startOrEnd === "start" ? "endBinding" : "startBinding"];
  return isLinearElementSimpleAndAlreadyBound(
    linearElement,
    otherBinding?.elementId,
    bindableElement
  );
};
var isLinearElementSimpleAndAlreadyBound = (linearElement, alreadyBoundToId, bindableElement) => {
  return alreadyBoundToId === bindableElement.id && isLinearElementSimple(linearElement);
};
var isLinearElementSimple = (linearElement) => linearElement.points.length < 3 && !isElbowArrow(linearElement);
var unbindLinearElement = (linearElement, startOrEnd, scene) => {
  const field = startOrEnd === "start" ? "startBinding" : "endBinding";
  const binding = linearElement[field];
  if (binding == null) {
    return null;
  }
  scene.mutateElement(linearElement, { [field]: null });
  return binding.elementId;
};
var getHoveredElementForBinding = (pointerCoords, elements, elementsMap, zoom, fullShape, considerAllElements) => {
  if (considerAllElements) {
    let cullRest = false;
    const candidateElements = getAllElementsAtPositionForBinding(
      elements,
      (element) => isBindableElement(element, false) && bindingBorderTest(
        element,
        pointerCoords,
        elementsMap,
        zoom,
        (fullShape || !isBindingFallthroughEnabled(
          element
        )) && // disable fullshape snapping for frame elements so we
        // can bind to frame children
        !isFrameLikeElement(element)
      )
    ).filter((element) => {
      if (cullRest) {
        return false;
      }
      if (!isBindingFallthroughEnabled(element)) {
        cullRest = true;
      }
      return true;
    });
    if (!candidateElements || candidateElements.length === 0) {
      return null;
    }
    if (candidateElements.length === 1) {
      return candidateElements[0];
    }
    const borderTestElements = candidateElements.filter(
      (element) => bindingBorderTest(element, pointerCoords, elementsMap, zoom, false)
    );
    if (borderTestElements.length === 1) {
      return borderTestElements[0];
    }
    return candidateElements.sort(
      (a2, b2) => b2.width ** 2 + b2.height ** 2 - (a2.width ** 2 + a2.height ** 2)
    ).pop();
  }
  const hoveredElement = getElementAtPositionForBinding(
    elements,
    (element) => isBindableElement(element, false) && bindingBorderTest(
      element,
      pointerCoords,
      elementsMap,
      zoom,
      // disable fullshape snapping for frame elements so we
      // can bind to frame children
      (fullShape || !isBindingFallthroughEnabled(element)) && !isFrameLikeElement(element)
    )
  );
  return hoveredElement;
};
var getElementAtPositionForBinding = (elements, isAtPositionFn) => {
  let hitElement = null;
  for (let index = elements.length - 1; index >= 0; --index) {
    const element = elements[index];
    if (element.isDeleted) {
      continue;
    }
    if (isAtPositionFn(element)) {
      hitElement = element;
      break;
    }
  }
  return hitElement;
};
var getAllElementsAtPositionForBinding = (elements, isAtPositionFn) => {
  const elementsAtPosition = [];
  for (let index = elements.length - 1; index >= 0; --index) {
    const element = elements[index];
    if (element.isDeleted) {
      continue;
    }
    if (isAtPositionFn(element)) {
      elementsAtPosition.push(element);
    }
  }
  return elementsAtPosition;
};
var calculateFocusAndGap = (linearElement, hoveredElement, startOrEnd, elementsMap) => {
  const direction = startOrEnd === "start" ? -1 : 1;
  const edgePointIndex = direction === -1 ? 0 : linearElement.points.length - 1;
  const adjacentPointIndex = edgePointIndex - direction;
  const edgePoint = LinearElementEditor.getPointAtIndexGlobalCoordinates(
    linearElement,
    edgePointIndex,
    elementsMap
  );
  const adjacentPoint = LinearElementEditor.getPointAtIndexGlobalCoordinates(
    linearElement,
    adjacentPointIndex,
    elementsMap
  );
  return {
    focus: determineFocusDistance(
      hoveredElement,
      elementsMap,
      adjacentPoint,
      edgePoint
    ),
    gap: Math.max(1, distanceToElement(hoveredElement, elementsMap, edgePoint))
  };
};
var updateBoundElements = (changedElement, scene, options) => {
  if (!isBindableElement(changedElement)) {
    return;
  }
  const { newSize, simultaneouslyUpdated } = options ?? {};
  const simultaneouslyUpdatedElementIds = getSimultaneouslyUpdatedElementIds(
    simultaneouslyUpdated
  );
  let elementsMap = scene.getNonDeletedElementsMap();
  if (options?.changedElements) {
    elementsMap = new Map(elementsMap);
    options.changedElements.forEach((element) => {
      elementsMap.set(element.id, element);
    });
  }
  boundElementsVisitor(elementsMap, changedElement, (element) => {
    if (!isLinearElement(element) || element.isDeleted) {
      return;
    }
    if (!doesNeedUpdate(element, changedElement)) {
      return;
    }
    const startBindingElement = element.startBinding ? elementsMap.get(element.startBinding.elementId) : null;
    const endBindingElement = element.endBinding ? elementsMap.get(element.endBinding.elementId) : null;
    let startBounds = null;
    let endBounds = null;
    if (startBindingElement && endBindingElement) {
      startBounds = getElementBounds(startBindingElement, elementsMap);
      endBounds = getElementBounds(endBindingElement, elementsMap);
    }
    const bindings = {
      startBinding: maybeCalculateNewGapWhenScaling(
        changedElement,
        element.startBinding,
        newSize
      ),
      endBinding: maybeCalculateNewGapWhenScaling(
        changedElement,
        element.endBinding,
        newSize
      )
    };
    if (simultaneouslyUpdatedElementIds.has(element.id)) {
      scene.mutateElement(element, bindings);
      return;
    }
    const updates = bindableElementsVisitor(
      elementsMap,
      element,
      (bindableElement, bindingProp) => {
        if (bindableElement && isBindableElement(bindableElement) && (bindingProp === "startBinding" || bindingProp === "endBinding") && (changedElement.id === element[bindingProp]?.elementId || changedElement.id === element[bindingProp === "startBinding" ? "endBinding" : "startBinding"]?.elementId && !doBoundsIntersect(startBounds, endBounds))) {
          const point = updateBoundPoint(
            element,
            bindingProp,
            bindings[bindingProp],
            bindableElement,
            elementsMap
          );
          if (point) {
            return [
              bindingProp === "startBinding" ? 0 : element.points.length - 1,
              { point }
            ];
          }
        }
        return null;
      }
    ).filter(
      (update) => update !== null
    );
    LinearElementEditor.movePoints(element, scene, new Map(updates), {
      ...changedElement.id === element.startBinding?.elementId ? { startBinding: bindings.startBinding } : {},
      ...changedElement.id === element.endBinding?.elementId ? { endBinding: bindings.endBinding } : {}
    });
    const boundText = getBoundTextElement(element, elementsMap);
    if (boundText && !boundText.isDeleted) {
      handleBindTextResize(element, scene, false);
    }
  });
};
var updateBindings = (latestElement, scene, options) => {
  if (isLinearElement(latestElement)) {
    bindOrUnbindLinearElements([latestElement], true, [], scene, options?.zoom);
  } else {
    updateBoundElements(latestElement, scene, {
      ...options,
      changedElements: /* @__PURE__ */ new Map([[latestElement.id, latestElement]])
    });
  }
};
var doesNeedUpdate = (boundElement, changedElement) => {
  return boundElement.startBinding?.elementId === changedElement.id || boundElement.endBinding?.elementId === changedElement.id;
};
var getSimultaneouslyUpdatedElementIds = (simultaneouslyUpdated) => {
  return new Set((simultaneouslyUpdated || []).map((element) => element.id));
};
var getHeadingForElbowArrowSnap = (p, otherPoint, bindableElement, aabb, origPoint, elementsMap, zoom) => {
  const otherPointHeading = vectorToHeading(vectorFromPoint6(otherPoint, p));
  if (!bindableElement || !aabb) {
    return otherPointHeading;
  }
  const distance3 = getDistanceForBinding(
    origPoint,
    bindableElement,
    elementsMap,
    zoom
  );
  if (!distance3) {
    return vectorToHeading(
      vectorFromPoint6(p, elementCenterPoint(bindableElement, elementsMap))
    );
  }
  return headingForPointFromElement(bindableElement, aabb, p);
};
var getDistanceForBinding = (point, bindableElement, elementsMap, zoom) => {
  const distance3 = distanceToElement(bindableElement, elementsMap, point);
  const bindDistance = maxBindingGap(
    bindableElement,
    bindableElement.width,
    bindableElement.height,
    zoom
  );
  return distance3 > bindDistance ? null : distance3;
};
var bindPointToSnapToElementOutline = (arrow, bindableElement, startOrEnd, elementsMap) => {
  if (isDevEnv4() || isTestEnv4()) {
    invariant5(arrow.points.length > 1, "Arrow should have at least 2 points");
  }
  const aabb = aabbForElement(bindableElement, elementsMap);
  const localP = arrow.points[startOrEnd === "start" ? 0 : arrow.points.length - 1];
  const globalP = pointFrom7(
    arrow.x + localP[0],
    arrow.y + localP[1]
  );
  const edgePoint = isRectanguloidElement(bindableElement) ? avoidRectangularCorner(bindableElement, elementsMap, globalP) : globalP;
  const elbowed = isElbowArrow(arrow);
  const center = getCenterForBounds(aabb);
  const adjacentPointIdx = startOrEnd === "start" ? 1 : arrow.points.length - 2;
  const adjacentPoint = pointRotateRads6(
    pointFrom7(
      arrow.x + arrow.points[adjacentPointIdx][0],
      arrow.y + arrow.points[adjacentPointIdx][1]
    ),
    center,
    arrow.angle ?? 0
  );
  let intersection = null;
  if (elbowed) {
    const isHorizontal = headingIsHorizontal(
      headingForPointFromElement(bindableElement, aabb, globalP)
    );
    const snapPoint = snapToMid(bindableElement, elementsMap, edgePoint);
    const otherPoint = pointFrom7(
      isHorizontal ? center[0] : snapPoint[0],
      !isHorizontal ? center[1] : snapPoint[1]
    );
    const intersector = lineSegment4(
      otherPoint,
      pointFromVector5(
        vectorScale6(
          vectorNormalize3(vectorFromPoint6(snapPoint, otherPoint)),
          Math.max(bindableElement.width, bindableElement.height) * 2
        ),
        otherPoint
      )
    );
    intersection = intersectElementWithLineSegment(
      bindableElement,
      elementsMap,
      intersector,
      FIXED_BINDING_DISTANCE
    ).sort(pointDistanceSq)[0];
  } else {
    intersection = intersectElementWithLineSegment(
      bindableElement,
      elementsMap,
      lineSegment4(
        adjacentPoint,
        pointFromVector5(
          vectorScale6(
            vectorNormalize3(vectorFromPoint6(edgePoint, adjacentPoint)),
            pointDistance4(edgePoint, adjacentPoint) + Math.max(bindableElement.width, bindableElement.height) * 2
          ),
          adjacentPoint
        )
      ),
      FIXED_BINDING_DISTANCE
    ).sort(
      (g, h) => pointDistanceSq(g, adjacentPoint) - pointDistanceSq(h, adjacentPoint)
    )[0];
  }
  if (!intersection || // Too close to determine vector from intersection to edgePoint
  pointDistanceSq(edgePoint, intersection) < PRECISION2) {
    return edgePoint;
  }
  return elbowed ? intersection : edgePoint;
};
var avoidRectangularCorner = (element, elementsMap, p) => {
  const center = elementCenterPoint(element, elementsMap);
  const nonRotatedPoint = pointRotateRads6(p, center, -element.angle);
  if (nonRotatedPoint[0] < element.x && nonRotatedPoint[1] < element.y) {
    if (nonRotatedPoint[1] - element.y > -FIXED_BINDING_DISTANCE) {
      return pointRotateRads6(
        pointFrom7(element.x - FIXED_BINDING_DISTANCE, element.y),
        center,
        element.angle
      );
    }
    return pointRotateRads6(
      pointFrom7(element.x, element.y - FIXED_BINDING_DISTANCE),
      center,
      element.angle
    );
  } else if (nonRotatedPoint[0] < element.x && nonRotatedPoint[1] > element.y + element.height) {
    if (nonRotatedPoint[0] - element.x > -FIXED_BINDING_DISTANCE) {
      return pointRotateRads6(
        pointFrom7(
          element.x,
          element.y + element.height + FIXED_BINDING_DISTANCE
        ),
        center,
        element.angle
      );
    }
    return pointRotateRads6(
      pointFrom7(element.x - FIXED_BINDING_DISTANCE, element.y + element.height),
      center,
      element.angle
    );
  } else if (nonRotatedPoint[0] > element.x + element.width && nonRotatedPoint[1] > element.y + element.height) {
    if (nonRotatedPoint[0] - element.x < element.width + FIXED_BINDING_DISTANCE) {
      return pointRotateRads6(
        pointFrom7(
          element.x + element.width,
          element.y + element.height + FIXED_BINDING_DISTANCE
        ),
        center,
        element.angle
      );
    }
    return pointRotateRads6(
      pointFrom7(
        element.x + element.width + FIXED_BINDING_DISTANCE,
        element.y + element.height
      ),
      center,
      element.angle
    );
  } else if (nonRotatedPoint[0] > element.x + element.width && nonRotatedPoint[1] < element.y) {
    if (nonRotatedPoint[0] - element.x < element.width + FIXED_BINDING_DISTANCE) {
      return pointRotateRads6(
        pointFrom7(
          element.x + element.width,
          element.y - FIXED_BINDING_DISTANCE
        ),
        center,
        element.angle
      );
    }
    return pointRotateRads6(
      pointFrom7(element.x + element.width + FIXED_BINDING_DISTANCE, element.y),
      center,
      element.angle
    );
  }
  return p;
};
var snapToMid = (element, elementsMap, p, tolerance = 0.05) => {
  const { x, y, width, height, angle } = element;
  const center = elementCenterPoint(element, elementsMap, -0.1, -0.1);
  const nonRotated = pointRotateRads6(p, center, -angle);
  const verticalThreshold = clamp3(tolerance * height, 5, 80);
  const horizontalThreshold = clamp3(tolerance * width, 5, 80);
  if (nonRotated[0] <= x + width / 2 && nonRotated[1] > center[1] - verticalThreshold && nonRotated[1] < center[1] + verticalThreshold) {
    return pointRotateRads6(
      pointFrom7(x - FIXED_BINDING_DISTANCE, center[1]),
      center,
      angle
    );
  } else if (nonRotated[1] <= y + height / 2 && nonRotated[0] > center[0] - horizontalThreshold && nonRotated[0] < center[0] + horizontalThreshold) {
    return pointRotateRads6(
      pointFrom7(center[0], y - FIXED_BINDING_DISTANCE),
      center,
      angle
    );
  } else if (nonRotated[0] >= x + width / 2 && nonRotated[1] > center[1] - verticalThreshold && nonRotated[1] < center[1] + verticalThreshold) {
    return pointRotateRads6(
      pointFrom7(x + width + FIXED_BINDING_DISTANCE, center[1]),
      center,
      angle
    );
  } else if (nonRotated[1] >= y + height / 2 && nonRotated[0] > center[0] - horizontalThreshold && nonRotated[0] < center[0] + horizontalThreshold) {
    return pointRotateRads6(
      pointFrom7(center[0], y + height + FIXED_BINDING_DISTANCE),
      center,
      angle
    );
  } else if (element.type === "diamond") {
    const distance3 = FIXED_BINDING_DISTANCE;
    const topLeft = pointFrom7(
      x + width / 4 - distance3,
      y + height / 4 - distance3
    );
    const topRight = pointFrom7(
      x + 3 * width / 4 + distance3,
      y + height / 4 - distance3
    );
    const bottomLeft = pointFrom7(
      x + width / 4 - distance3,
      y + 3 * height / 4 + distance3
    );
    const bottomRight = pointFrom7(
      x + 3 * width / 4 + distance3,
      y + 3 * height / 4 + distance3
    );
    if (pointDistance4(topLeft, nonRotated) < Math.max(horizontalThreshold, verticalThreshold)) {
      return pointRotateRads6(topLeft, center, angle);
    }
    if (pointDistance4(topRight, nonRotated) < Math.max(horizontalThreshold, verticalThreshold)) {
      return pointRotateRads6(topRight, center, angle);
    }
    if (pointDistance4(bottomLeft, nonRotated) < Math.max(horizontalThreshold, verticalThreshold)) {
      return pointRotateRads6(bottomLeft, center, angle);
    }
    if (pointDistance4(bottomRight, nonRotated) < Math.max(horizontalThreshold, verticalThreshold)) {
      return pointRotateRads6(bottomRight, center, angle);
    }
  }
  return p;
};
var updateBoundPoint = (linearElement, startOrEnd, binding, bindableElement, elementsMap) => {
  if (binding == null || // We only need to update the other end if this is a 2 point line element
  binding.elementId !== bindableElement.id && linearElement.points.length > 2) {
    return null;
  }
  const direction = startOrEnd === "startBinding" ? -1 : 1;
  const edgePointIndex = direction === -1 ? 0 : linearElement.points.length - 1;
  if (isElbowArrow(linearElement) && isFixedPointBinding(binding)) {
    const fixedPoint = normalizeFixedPoint(binding.fixedPoint) ?? calculateFixedPointForElbowArrowBinding(
      linearElement,
      bindableElement,
      startOrEnd === "startBinding" ? "start" : "end",
      elementsMap
    ).fixedPoint;
    const globalMidPoint = elementCenterPoint(bindableElement, elementsMap);
    const global2 = pointFrom7(
      bindableElement.x + fixedPoint[0] * bindableElement.width,
      bindableElement.y + fixedPoint[1] * bindableElement.height
    );
    const rotatedGlobal = pointRotateRads6(
      global2,
      globalMidPoint,
      bindableElement.angle
    );
    return LinearElementEditor.pointFromAbsoluteCoords(
      linearElement,
      rotatedGlobal,
      elementsMap
    );
  }
  const adjacentPointIndex = edgePointIndex - direction;
  const adjacentPoint = LinearElementEditor.getPointAtIndexGlobalCoordinates(
    linearElement,
    adjacentPointIndex,
    elementsMap
  );
  const focusPointAbsolute = determineFocusPoint(
    bindableElement,
    elementsMap,
    binding.focus,
    adjacentPoint
  );
  let newEdgePoint;
  if (binding.gap === 0) {
    newEdgePoint = focusPointAbsolute;
  } else {
    const edgePointAbsolute = LinearElementEditor.getPointAtIndexGlobalCoordinates(
      linearElement,
      edgePointIndex,
      elementsMap
    );
    const center = elementCenterPoint(bindableElement, elementsMap);
    const interceptorLength = pointDistance4(adjacentPoint, edgePointAbsolute) + pointDistance4(adjacentPoint, center) + Math.max(bindableElement.width, bindableElement.height) * 2;
    const intersections = [
      ...intersectElementWithLineSegment(
        bindableElement,
        elementsMap,
        lineSegment4(
          adjacentPoint,
          pointFromVector5(
            vectorScale6(
              vectorNormalize3(
                vectorFromPoint6(focusPointAbsolute, adjacentPoint)
              ),
              interceptorLength
            ),
            adjacentPoint
          )
        ),
        binding.gap
      ).sort(
        (g, h) => pointDistanceSq(g, adjacentPoint) - pointDistanceSq(h, adjacentPoint)
      ),
      // Fallback when arrow doesn't point to the shape
      pointFromVector5(
        vectorScale6(
          vectorNormalize3(vectorFromPoint6(focusPointAbsolute, adjacentPoint)),
          pointDistance4(adjacentPoint, edgePointAbsolute)
        ),
        adjacentPoint
      )
    ];
    if (intersections.length > 1) {
      newEdgePoint = intersections[0];
    } else if (intersections.length === 1) {
      newEdgePoint = focusPointAbsolute;
    } else {
      newEdgePoint = edgePointAbsolute;
    }
  }
  return LinearElementEditor.pointFromAbsoluteCoords(
    linearElement,
    newEdgePoint,
    elementsMap
  );
};
var calculateFixedPointForElbowArrowBinding = (linearElement, hoveredElement, startOrEnd, elementsMap) => {
  const bounds = [
    hoveredElement.x,
    hoveredElement.y,
    hoveredElement.x + hoveredElement.width,
    hoveredElement.y + hoveredElement.height
  ];
  const snappedPoint = bindPointToSnapToElementOutline(
    linearElement,
    hoveredElement,
    startOrEnd,
    elementsMap
  );
  const globalMidPoint = pointFrom7(
    bounds[0] + (bounds[2] - bounds[0]) / 2,
    bounds[1] + (bounds[3] - bounds[1]) / 2
  );
  const nonRotatedSnappedGlobalPoint = pointRotateRads6(
    snappedPoint,
    globalMidPoint,
    -hoveredElement.angle
  );
  return {
    fixedPoint: normalizeFixedPoint([
      (nonRotatedSnappedGlobalPoint[0] - hoveredElement.x) / hoveredElement.width,
      (nonRotatedSnappedGlobalPoint[1] - hoveredElement.y) / hoveredElement.height
    ])
  };
};
var maybeCalculateNewGapWhenScaling = (changedElement, currentBinding, newSize) => {
  if (currentBinding == null || newSize == null) {
    return currentBinding;
  }
  const { width: newWidth, height: newHeight } = newSize;
  const { width, height } = changedElement;
  const newGap = Math.max(
    1,
    Math.min(
      maxBindingGap(changedElement, newWidth, newHeight),
      currentBinding.gap * (newWidth < newHeight ? newWidth / width : newHeight / height)
    )
  );
  return { ...currentBinding, gap: newGap };
};
var getEligibleElementForBindingElement = (linearElement, startOrEnd, elementsMap, elements, zoom) => {
  return getHoveredElementForBinding(
    getLinearElementEdgeCoors(linearElement, startOrEnd, elementsMap),
    elements,
    elementsMap,
    zoom,
    isElbowArrow(linearElement),
    isElbowArrow(linearElement)
  );
};
var getLinearElementEdgeCoors = (linearElement, startOrEnd, elementsMap) => {
  const index = startOrEnd === "start" ? 0 : -1;
  return tupleToCoors2(
    LinearElementEditor.getPointAtIndexGlobalCoordinates(
      linearElement,
      index,
      elementsMap
    )
  );
};
var fixDuplicatedBindingsAfterDuplication = (duplicatedElements, origIdToDuplicateId, duplicateElementsMap) => {
  for (const duplicateElement2 of duplicatedElements) {
    if ("boundElements" in duplicateElement2 && duplicateElement2.boundElements) {
      Object.assign(duplicateElement2, {
        boundElements: duplicateElement2.boundElements.reduce(
          (acc, binding) => {
            const newBindingId = origIdToDuplicateId.get(binding.id);
            if (newBindingId) {
              acc.push({ ...binding, id: newBindingId });
            }
            return acc;
          },
          []
        )
      });
    }
    if ("containerId" in duplicateElement2 && duplicateElement2.containerId) {
      Object.assign(duplicateElement2, {
        containerId: origIdToDuplicateId.get(duplicateElement2.containerId) ?? null
      });
    }
    if ("endBinding" in duplicateElement2 && duplicateElement2.endBinding) {
      const newEndBindingId = origIdToDuplicateId.get(
        duplicateElement2.endBinding.elementId
      );
      Object.assign(duplicateElement2, {
        endBinding: newEndBindingId ? {
          ...duplicateElement2.endBinding,
          elementId: newEndBindingId
        } : null
      });
    }
    if ("startBinding" in duplicateElement2 && duplicateElement2.startBinding) {
      const newEndBindingId = origIdToDuplicateId.get(
        duplicateElement2.startBinding.elementId
      );
      Object.assign(duplicateElement2, {
        startBinding: newEndBindingId ? {
          ...duplicateElement2.startBinding,
          elementId: newEndBindingId
        } : null
      });
    }
    if (isElbowArrow(duplicateElement2)) {
      Object.assign(
        duplicateElement2,
        updateElbowArrowPoints(duplicateElement2, duplicateElementsMap, {
          points: [
            duplicateElement2.points[0],
            duplicateElement2.points[duplicateElement2.points.length - 1]
          ]
        })
      );
    }
  }
};
var fixBindingsAfterDeletion = (sceneElements, deletedElements) => {
  const elements = arrayToMap2(sceneElements);
  for (const element of deletedElements) {
    BoundElement.unbindAffected(
      elements,
      element,
      (element2, updates) => mutateElement(element2, elements, updates)
    );
    BindableElement.unbindAffected(
      elements,
      element,
      (element2, updates) => mutateElement(element2, elements, updates)
    );
  }
};
var newBoundElements = (boundElements, idsToRemove, elementsToAdd = []) => {
  if (!boundElements) {
    return null;
  }
  const nextBoundElements = boundElements.filter(
    (boundElement) => !idsToRemove.has(boundElement.id)
  );
  nextBoundElements.push(
    ...elementsToAdd.map(
      (x) => ({ id: x.id, type: x.type })
    )
  );
  return nextBoundElements;
};
var bindingBorderTest = (element, { x, y }, elementsMap, zoom, fullShape) => {
  const p = pointFrom7(x, y);
  const threshold = maxBindingGap(element, element.width, element.height, zoom);
  const shouldTestInside2 = (
    // disable fullshape snapping for frame elements so we
    // can bind to frame children
    (fullShape || !isBindingFallthroughEnabled(element)) && !isFrameLikeElement(element)
  );
  const bounds = [
    x - threshold,
    y - threshold,
    x + threshold,
    y + threshold
  ];
  const elementBounds = getElementBounds(element, elementsMap);
  if (!doBoundsIntersect(bounds, elementBounds)) {
    return false;
  }
  const intersections = intersectElementWithLineSegment(
    element,
    elementsMap,
    lineSegment4(elementCenterPoint(element, elementsMap), p)
  );
  const distance3 = distanceToElement(element, elementsMap, p);
  return shouldTestInside2 ? intersections.length === 0 || distance3 <= threshold : intersections.length > 0 && distance3 <= threshold;
};
var maxBindingGap = (element, elementWidth, elementHeight, zoom) => {
  const zoomValue = zoom?.value && zoom.value < 1 ? zoom.value : 1;
  const shapeRatio = element.type === "diamond" ? 1 / Math.sqrt(2) : 1;
  const smallerDimension = shapeRatio * Math.min(elementWidth, elementHeight);
  return Math.max(
    16,
    // bigger bindable boundary for bigger elements
    Math.min(0.25 * smallerDimension, 32),
    // keep in sync with the zoomed highlight
    BINDING_HIGHLIGHT_THICKNESS / zoomValue + FIXED_BINDING_DISTANCE
  );
};
var determineFocusDistance = (element, elementsMap, a2, b2) => {
  const center = elementCenterPoint(element, elementsMap);
  if (pointsEqual5(a2, b2)) {
    return 0;
  }
  const rotatedA = pointRotateRads6(a2, center, -element.angle);
  const rotatedB = pointRotateRads6(b2, center, -element.angle);
  const sign = Math.sign(
    vectorCross3(
      vectorFromPoint6(rotatedB, a2),
      vectorFromPoint6(rotatedB, center)
    )
  ) * -1;
  const rotatedInterceptor = lineSegment4(
    rotatedB,
    pointFromVector5(
      vectorScale6(
        vectorNormalize3(vectorFromPoint6(rotatedB, rotatedA)),
        Math.max(element.width * 2, element.height * 2)
      ),
      rotatedB
    )
  );
  const axes = element.type === "diamond" ? [
    lineSegment4(
      pointFrom7(element.x + element.width / 2, element.y),
      pointFrom7(
        element.x + element.width / 2,
        element.y + element.height
      )
    ),
    lineSegment4(
      pointFrom7(element.x, element.y + element.height / 2),
      pointFrom7(
        element.x + element.width,
        element.y + element.height / 2
      )
    )
  ] : [
    lineSegment4(
      pointFrom7(element.x, element.y),
      pointFrom7(
        element.x + element.width,
        element.y + element.height
      )
    ),
    lineSegment4(
      pointFrom7(element.x + element.width, element.y),
      pointFrom7(element.x, element.y + element.height)
    )
  ];
  const interceptees = element.type === "diamond" ? [
    lineSegment4(
      pointFrom7(
        element.x + element.width / 2,
        element.y - element.height
      ),
      pointFrom7(
        element.x + element.width / 2,
        element.y + element.height * 2
      )
    ),
    lineSegment4(
      pointFrom7(
        element.x - element.width,
        element.y + element.height / 2
      ),
      pointFrom7(
        element.x + element.width * 2,
        element.y + element.height / 2
      )
    )
  ] : [
    lineSegment4(
      pointFrom7(
        element.x - element.width,
        element.y - element.height
      ),
      pointFrom7(
        element.x + element.width * 2,
        element.y + element.height * 2
      )
    ),
    lineSegment4(
      pointFrom7(
        element.x + element.width * 2,
        element.y - element.height
      ),
      pointFrom7(
        element.x - element.width,
        element.y + element.height * 2
      )
    )
  ];
  const ordered = [
    lineSegmentIntersectionPoints2(rotatedInterceptor, interceptees[0]),
    lineSegmentIntersectionPoints2(rotatedInterceptor, interceptees[1])
  ].filter((p) => p !== null).sort((g, h) => pointDistanceSq(g, b2) - pointDistanceSq(h, b2)).map(
    (p, idx) => sign * pointDistance4(center, p) / (element.type === "diamond" ? pointDistance4(axes[idx][0], axes[idx][1]) / 2 : Math.sqrt(element.width ** 2 + element.height ** 2) / 2)
  ).sort((g, h) => Math.abs(g) - Math.abs(h));
  const signedDistanceRatio = ordered[0] ?? 0;
  return signedDistanceRatio;
};
var determineFocusPoint = (element, elementsMap, focus, adjacentPoint) => {
  const center = elementCenterPoint(element, elementsMap);
  if (focus === 0) {
    return center;
  }
  const candidates = (element.type === "diamond" ? [
    pointFrom7(element.x, element.y + element.height / 2),
    pointFrom7(element.x + element.width / 2, element.y),
    pointFrom7(
      element.x + element.width,
      element.y + element.height / 2
    ),
    pointFrom7(
      element.x + element.width / 2,
      element.y + element.height
    )
  ] : [
    pointFrom7(element.x, element.y),
    pointFrom7(element.x + element.width, element.y),
    pointFrom7(
      element.x + element.width,
      element.y + element.height
    ),
    pointFrom7(element.x, element.y + element.height)
  ]).map(
    (p) => pointFromVector5(
      vectorScale6(vectorFromPoint6(p, center), Math.abs(focus)),
      center
    )
  ).map((p) => pointRotateRads6(p, center, element.angle));
  const selected = [
    vectorCross3(
      vectorFromPoint6(adjacentPoint, candidates[0]),
      vectorFromPoint6(candidates[1], candidates[0])
    ) > 0 && // TOP
    (focus > 0 ? vectorCross3(
      vectorFromPoint6(adjacentPoint, candidates[1]),
      vectorFromPoint6(candidates[2], candidates[1])
    ) < 0 : vectorCross3(
      vectorFromPoint6(adjacentPoint, candidates[3]),
      vectorFromPoint6(candidates[0], candidates[3])
    ) < 0),
    vectorCross3(
      vectorFromPoint6(adjacentPoint, candidates[1]),
      vectorFromPoint6(candidates[2], candidates[1])
    ) > 0 && // RIGHT
    (focus > 0 ? vectorCross3(
      vectorFromPoint6(adjacentPoint, candidates[2]),
      vectorFromPoint6(candidates[3], candidates[2])
    ) < 0 : vectorCross3(
      vectorFromPoint6(adjacentPoint, candidates[0]),
      vectorFromPoint6(candidates[1], candidates[0])
    ) < 0),
    vectorCross3(
      vectorFromPoint6(adjacentPoint, candidates[2]),
      vectorFromPoint6(candidates[3], candidates[2])
    ) > 0 && // BOTTOM
    (focus > 0 ? vectorCross3(
      vectorFromPoint6(adjacentPoint, candidates[3]),
      vectorFromPoint6(candidates[0], candidates[3])
    ) < 0 : vectorCross3(
      vectorFromPoint6(adjacentPoint, candidates[1]),
      vectorFromPoint6(candidates[2], candidates[1])
    ) < 0),
    vectorCross3(
      vectorFromPoint6(adjacentPoint, candidates[3]),
      vectorFromPoint6(candidates[0], candidates[3])
    ) > 0 && // LEFT
    (focus > 0 ? vectorCross3(
      vectorFromPoint6(adjacentPoint, candidates[0]),
      vectorFromPoint6(candidates[1], candidates[0])
    ) < 0 : vectorCross3(
      vectorFromPoint6(adjacentPoint, candidates[2]),
      vectorFromPoint6(candidates[3], candidates[2])
    ) < 0)
  ];
  const focusPoint = selected[0] ? focus > 0 ? candidates[1] : candidates[0] : selected[1] ? focus > 0 ? candidates[2] : candidates[1] : selected[2] ? focus > 0 ? candidates[3] : candidates[2] : focus > 0 ? candidates[0] : candidates[3];
  return focusPoint;
};
var bindingProperties = /* @__PURE__ */ new Set([
  "boundElements",
  "frameId",
  "containerId",
  "startBinding",
  "endBinding"
]);
var boundElementsVisitor = (elements, element, visit) => {
  if (isBindableElement(element)) {
    const boundElements = element.boundElements?.slice() ?? [];
    boundElements.forEach(({ id }) => {
      visit(elements.get(id), "boundElements", id);
    });
  }
};
var bindableElementsVisitor = (elements, element, visit) => {
  const result = [];
  if (element.frameId) {
    const id = element.frameId;
    result.push(visit(elements.get(id), "frameId", id));
  }
  if (isBoundToContainer(element)) {
    const id = element.containerId;
    result.push(visit(elements.get(id), "containerId", id));
  }
  if (isArrowElement(element)) {
    if (element.startBinding) {
      const id = element.startBinding.elementId;
      result.push(visit(elements.get(id), "startBinding", id));
    }
    if (element.endBinding) {
      const id = element.endBinding.elementId;
      result.push(visit(elements.get(id), "endBinding", id));
    }
  }
  return result;
};
var BoundElement = class {
  /**
   * Unbind the affected non deleted bindable elements (removing element from `boundElements`).
   * - iterates non deleted bindable elements (`containerId` | `startBinding.elementId` | `endBinding.elementId`) of the current element
   * - prepares updates to unbind each bindable element's `boundElements` from the current element
   */
  static unbindAffected(elements, boundElement, updateElementWith) {
    if (!boundElement) {
      return;
    }
    bindableElementsVisitor(elements, boundElement, (bindableElement) => {
      if (!bindableElement || bindableElement.isDeleted) {
        return;
      }
      boundElementsVisitor(
        elements,
        bindableElement,
        (_, __, boundElementId) => {
          if (boundElementId === boundElement.id) {
            updateElementWith(bindableElement, {
              boundElements: newBoundElements(
                bindableElement.boundElements,
                /* @__PURE__ */ new Set([boundElementId])
              )
            });
          }
        }
      );
    });
  }
  /**
   * Rebind the next affected non deleted bindable elements (adding element to `boundElements`).
   * - iterates non deleted bindable elements (`containerId` | `startBinding.elementId` | `endBinding.elementId`) of the current element
   * - prepares updates to rebind each bindable element's `boundElements` to the current element
   *
   * NOTE: rebind expects that affected elements were previously unbound with `BoundElement.unbindAffected`
   */
  static rebindAffected = (elements, boundElement, updateElementWith) => {
    if (!boundElement || boundElement.isDeleted) {
      return;
    }
    bindableElementsVisitor(
      elements,
      boundElement,
      (bindableElement, bindingProp) => {
        if (!bindableElement || bindableElement.isDeleted) {
          updateElementWith(boundElement, { [bindingProp]: null });
          return;
        }
        if (bindingProp === "frameId") {
          return;
        }
        if (bindableElement.boundElements?.find((x) => x.id === boundElement.id)) {
          return;
        }
        if (isArrowElement(boundElement)) {
          updateElementWith(bindableElement, {
            boundElements: newBoundElements(
              bindableElement.boundElements,
              /* @__PURE__ */ new Set(),
              new Array(boundElement)
            )
          });
        }
        if (isTextElement(boundElement)) {
          if (!bindableElement.boundElements?.find((x) => x.type === "text")) {
            updateElementWith(bindableElement, {
              boundElements: newBoundElements(
                bindableElement.boundElements,
                /* @__PURE__ */ new Set(),
                new Array(boundElement)
              )
            });
          } else {
            updateElementWith(boundElement, { [bindingProp]: null });
          }
        }
      }
    );
  };
};
var BindableElement = class {
  /**
   * Unbind the affected non deleted bound elements (resetting `containerId`, `startBinding`, `endBinding` to `null`).
   * - iterates through non deleted `boundElements` of the current element
   * - prepares updates to unbind each bound element from the current element
   */
  static unbindAffected(elements, bindableElement, updateElementWith) {
    if (!bindableElement) {
      return;
    }
    boundElementsVisitor(elements, bindableElement, (boundElement) => {
      if (!boundElement || boundElement.isDeleted) {
        return;
      }
      bindableElementsVisitor(
        elements,
        boundElement,
        (_, bindingProp, bindableElementId) => {
          if (bindableElementId === bindableElement.id) {
            updateElementWith(boundElement, { [bindingProp]: null });
          }
        }
      );
    });
  }
  /**
   * Rebind the affected non deleted bound elements (for now setting only `containerId`, as we cannot rebind arrows atm).
   * - iterates through non deleted `boundElements` of the current element
   * - prepares updates to rebind each bound element to the current element or unbind it from `boundElements` in case of conflicts
   *
   * NOTE: rebind expects that affected elements were previously unbound with `BindaleElement.unbindAffected`
   */
  static rebindAffected = (elements, bindableElement, updateElementWith) => {
    if (!bindableElement || bindableElement.isDeleted) {
      return;
    }
    boundElementsVisitor(
      elements,
      bindableElement,
      (boundElement, _, boundElementId) => {
        if (!boundElement || boundElement.isDeleted) {
          updateElementWith(bindableElement, {
            boundElements: newBoundElements(
              bindableElement.boundElements,
              /* @__PURE__ */ new Set([boundElementId])
            )
          });
          return;
        }
        if (isTextElement(boundElement)) {
          const boundElements = bindableElement.boundElements?.slice() ?? [];
          if (boundElements.reverse().find((x) => x.type === "text")?.id === boundElement.id) {
            if (boundElement.containerId !== bindableElement.id) {
              updateElementWith(boundElement, {
                containerId: bindableElement.id
              });
            }
          } else {
            if (boundElement.containerId !== null) {
              updateElementWith(boundElement, {
                containerId: null
              });
            }
            updateElementWith(bindableElement, {
              boundElements: newBoundElements(
                bindableElement.boundElements,
                /* @__PURE__ */ new Set([boundElement.id])
              )
            });
          }
        }
      }
    );
  };
};
var getGlobalFixedPointForBindableElement = (fixedPointRatio, element, elementsMap) => {
  const [fixedX, fixedY] = normalizeFixedPoint(fixedPointRatio);
  return pointRotateRads6(
    pointFrom7(
      element.x + element.width * fixedX,
      element.y + element.height * fixedY
    ),
    elementCenterPoint(element, elementsMap),
    element.angle
  );
};
var getGlobalFixedPoints = (arrow, elementsMap) => {
  const startElement = arrow.startBinding && elementsMap.get(arrow.startBinding.elementId);
  const endElement = arrow.endBinding && elementsMap.get(arrow.endBinding.elementId);
  const startPoint = startElement && arrow.startBinding ? getGlobalFixedPointForBindableElement(
    arrow.startBinding.fixedPoint,
    startElement,
    elementsMap
  ) : pointFrom7(
    arrow.x + arrow.points[0][0],
    arrow.y + arrow.points[0][1]
  );
  const endPoint = endElement && arrow.endBinding ? getGlobalFixedPointForBindableElement(
    arrow.endBinding.fixedPoint,
    endElement,
    elementsMap
  ) : pointFrom7(
    arrow.x + arrow.points[arrow.points.length - 1][0],
    arrow.y + arrow.points[arrow.points.length - 1][1]
  );
  return [startPoint, endPoint];
};
var getArrowLocalFixedPoints = (arrow, elementsMap) => {
  const [startPoint, endPoint] = getGlobalFixedPoints(arrow, elementsMap);
  return [
    LinearElementEditor.pointFromAbsoluteCoords(arrow, startPoint, elementsMap),
    LinearElementEditor.pointFromAbsoluteCoords(arrow, endPoint, elementsMap)
  ];
};
var normalizeFixedPoint = (fixedPoint) => {
  if (fixedPoint && (Math.abs(fixedPoint[0] - 0.5) < 1e-4 || Math.abs(fixedPoint[1] - 0.5) < 1e-4)) {
    return fixedPoint.map(
      (ratio) => Math.abs(ratio - 0.5) < 1e-4 ? 0.5001 : ratio
    );
  }
  return fixedPoint;
};

// src/linearElementEditor.ts
var getNormalizedPoints = ({
  points
}) => {
  const offsetX = points[0][0];
  const offsetY = points[0][1];
  return {
    points: points.map((p) => {
      return pointFrom8(p[0] - offsetX, p[1] - offsetY);
    }),
    offsetX,
    offsetY
  };
};
var LinearElementEditor = class _LinearElementEditor {
  elementId;
  /** indices */
  selectedPointsIndices;
  pointerDownState;
  /** whether you're dragging a point */
  isDragging;
  lastUncommittedPoint;
  pointerOffset;
  startBindingElement;
  endBindingElement;
  hoverPointIndex;
  segmentMidPointHoveredCoords;
  elbowed;
  customLineAngle;
  constructor(element, elementsMap) {
    this.elementId = element.id;
    if (!pointsEqual6(element.points[0], pointFrom8(0, 0))) {
      console.error("Linear element is not normalized", Error().stack);
      mutateElement(
        element,
        elementsMap,
        _LinearElementEditor.getNormalizeElementPointsAndCoords(element)
      );
    }
    this.selectedPointsIndices = null;
    this.lastUncommittedPoint = null;
    this.isDragging = false;
    this.pointerOffset = { x: 0, y: 0 };
    this.startBindingElement = "keep";
    this.endBindingElement = "keep";
    this.pointerDownState = {
      prevSelectedPointsIndices: null,
      lastClickedPoint: -1,
      lastClickedIsEndPoint: false,
      origin: null,
      segmentMidpoint: {
        value: null,
        index: null,
        added: false
      }
    };
    this.hoverPointIndex = -1;
    this.segmentMidPointHoveredCoords = null;
    this.elbowed = isElbowArrow(element) && element.elbowed;
    this.customLineAngle = null;
  }
  // ---------------------------------------------------------------------------
  // static methods
  // ---------------------------------------------------------------------------
  static POINT_HANDLE_SIZE = 10;
  /**
   * @param id the `elementId` from the instance of this class (so that we can
   *  statically guarantee this method returns an ExcalidrawLinearElement)
   */
  static getElement(id, elementsMap) {
    const element = elementsMap.get(id);
    if (element) {
      return element;
    }
    return null;
  }
  static handleBoxSelection(event, appState, setState, elementsMap) {
    if (!appState.editingLinearElement || !appState.selectionElement) {
      return false;
    }
    const { editingLinearElement } = appState;
    const { selectedPointsIndices, elementId } = editingLinearElement;
    const element = _LinearElementEditor.getElement(elementId, elementsMap);
    if (!element) {
      return false;
    }
    const [selectionX1, selectionY1, selectionX2, selectionY2] = getElementAbsoluteCoords2(appState.selectionElement, elementsMap);
    const pointsSceneCoords = _LinearElementEditor.getPointsGlobalCoordinates(
      element,
      elementsMap
    );
    const nextSelectedPoints = pointsSceneCoords.reduce((acc, point, index) => {
      if (point[0] >= selectionX1 && point[0] <= selectionX2 && point[1] >= selectionY1 && point[1] <= selectionY2 || event.shiftKey && selectedPointsIndices?.includes(index)) {
        acc.push(index);
      }
      return acc;
    }, []).filter((index) => {
      if (isElbowArrow(element) && index !== 0 && index !== element.points.length - 1) {
        return false;
      }
      return true;
    });
    setState({
      editingLinearElement: {
        ...editingLinearElement,
        selectedPointsIndices: nextSelectedPoints.length ? nextSelectedPoints : null
      }
    });
  }
  /**
   * @returns whether point was dragged
   */
  static handlePointDragging(event, app, scenePointerX, scenePointerY, linearElementEditor) {
    if (!linearElementEditor) {
      return null;
    }
    const { elementId } = linearElementEditor;
    const elementsMap = app.scene.getNonDeletedElementsMap();
    const element = _LinearElementEditor.getElement(elementId, elementsMap);
    let customLineAngle = linearElementEditor.customLineAngle;
    if (!element) {
      return null;
    }
    if (isElbowArrow(element) && !linearElementEditor.pointerDownState.lastClickedIsEndPoint && linearElementEditor.pointerDownState.lastClickedPoint !== 0) {
      return null;
    }
    const selectedPointsIndices = isElbowArrow(element) ? [
      !!linearElementEditor.selectedPointsIndices?.includes(0) ? 0 : void 0,
      !!linearElementEditor.selectedPointsIndices?.find((idx) => idx > 0) ? element.points.length - 1 : void 0
    ].filter((idx) => idx !== void 0) : linearElementEditor.selectedPointsIndices;
    const lastClickedPoint = isElbowArrow(element) ? linearElementEditor.pointerDownState.lastClickedPoint > 0 ? element.points.length - 1 : 0 : linearElementEditor.pointerDownState.lastClickedPoint;
    const draggingPoint = element.points[lastClickedPoint];
    if (selectedPointsIndices && draggingPoint) {
      if (shouldRotateWithDiscreteAngle(event) && selectedPointsIndices.length === 1 && element.points.length > 1) {
        const selectedIndex = selectedPointsIndices[0];
        const referencePoint = element.points[selectedIndex === 0 ? 1 : selectedIndex - 1];
        customLineAngle = linearElementEditor.customLineAngle ?? Math.atan2(
          element.points[selectedIndex][1] - referencePoint[1],
          element.points[selectedIndex][0] - referencePoint[0]
        );
        const [width, height] = _LinearElementEditor._getShiftLockedDelta(
          element,
          elementsMap,
          referencePoint,
          pointFrom8(scenePointerX, scenePointerY),
          event[KEYS2.CTRL_OR_CMD] ? null : app.getEffectiveGridSize(),
          customLineAngle
        );
        _LinearElementEditor.movePoints(
          element,
          app.scene,
          /* @__PURE__ */ new Map([
            [
              selectedIndex,
              {
                point: pointFrom8(
                  width + referencePoint[0],
                  height + referencePoint[1]
                ),
                isDragging: selectedIndex === lastClickedPoint
              }
            ]
          ])
        );
      } else {
        const newDraggingPointPosition = _LinearElementEditor.createPointAt(
          element,
          elementsMap,
          scenePointerX - linearElementEditor.pointerOffset.x,
          scenePointerY - linearElementEditor.pointerOffset.y,
          event[KEYS2.CTRL_OR_CMD] ? null : app.getEffectiveGridSize()
        );
        const deltaX = newDraggingPointPosition[0] - draggingPoint[0];
        const deltaY = newDraggingPointPosition[1] - draggingPoint[1];
        _LinearElementEditor.movePoints(
          element,
          app.scene,
          new Map(
            selectedPointsIndices.map((pointIndex) => {
              const newPointPosition = pointIndex === lastClickedPoint ? _LinearElementEditor.createPointAt(
                element,
                elementsMap,
                scenePointerX - linearElementEditor.pointerOffset.x,
                scenePointerY - linearElementEditor.pointerOffset.y,
                event[KEYS2.CTRL_OR_CMD] ? null : app.getEffectiveGridSize()
              ) : pointFrom8(
                element.points[pointIndex][0] + deltaX,
                element.points[pointIndex][1] + deltaY
              );
              return [
                pointIndex,
                {
                  point: newPointPosition,
                  isDragging: pointIndex === lastClickedPoint
                }
              ];
            })
          )
        );
      }
      const boundTextElement = getBoundTextElement(element, elementsMap);
      if (boundTextElement) {
        handleBindTextResize(element, app.scene, false);
      }
      let suggestedBindings = [];
      if (isBindingElement(element, false)) {
        const firstSelectedIndex = selectedPointsIndices[0] === 0;
        const lastSelectedIndex = selectedPointsIndices[selectedPointsIndices.length - 1] === element.points.length - 1;
        const coords = [];
        if (!firstSelectedIndex !== !lastSelectedIndex) {
          coords.push({ x: scenePointerX, y: scenePointerY });
        } else {
          if (firstSelectedIndex) {
            coords.push(
              tupleToCoors3(
                _LinearElementEditor.getPointGlobalCoordinates(
                  element,
                  element.points[0],
                  elementsMap
                )
              )
            );
          }
          if (lastSelectedIndex) {
            coords.push(
              tupleToCoors3(
                _LinearElementEditor.getPointGlobalCoordinates(
                  element,
                  element.points[selectedPointsIndices[selectedPointsIndices.length - 1]],
                  elementsMap
                )
              )
            );
          }
        }
        if (coords.length) {
          suggestedBindings = maybeSuggestBindingsForLinearElementAtCoords(
            element,
            coords,
            app.scene,
            app.state.zoom
          );
        }
      }
      const newLinearElementEditor = {
        ...linearElementEditor,
        selectedPointsIndices,
        segmentMidPointHoveredCoords: lastClickedPoint !== 0 && lastClickedPoint !== element.points.length - 1 ? this.getPointGlobalCoordinates(
          element,
          draggingPoint,
          elementsMap
        ) : null,
        hoverPointIndex: lastClickedPoint === 0 || lastClickedPoint === element.points.length - 1 ? lastClickedPoint : -1,
        isDragging: true,
        customLineAngle
      };
      return {
        ...app.state,
        editingLinearElement: app.state.editingLinearElement ? newLinearElementEditor : null,
        selectedLinearElement: newLinearElementEditor,
        suggestedBindings
      };
    }
    return null;
  }
  static handlePointerUp(event, editingLinearElement, appState, scene) {
    const elementsMap = scene.getNonDeletedElementsMap();
    const elements = scene.getNonDeletedElements();
    const pointerCoords = viewportCoordsToSceneCoords(event, appState);
    const { elementId, selectedPointsIndices, isDragging, pointerDownState } = editingLinearElement;
    const element = _LinearElementEditor.getElement(elementId, elementsMap);
    if (!element) {
      return editingLinearElement;
    }
    const bindings = {};
    if (isDragging && selectedPointsIndices) {
      for (const selectedPoint of selectedPointsIndices) {
        if (selectedPoint === 0 || selectedPoint === element.points.length - 1) {
          if (isPathALoop2(element.points, appState.zoom.value)) {
            if (isLineElement(element)) {
              scene.mutateElement(
                element,
                {
                  ...toggleLinePolygonState(element, true)
                },
                {
                  informMutation: false,
                  isDragging: false
                }
              );
            }
            _LinearElementEditor.movePoints(
              element,
              scene,
              /* @__PURE__ */ new Map([
                [
                  selectedPoint,
                  {
                    point: selectedPoint === 0 ? element.points[element.points.length - 1] : element.points[0]
                  }
                ]
              ])
            );
          }
          const bindingElement = isBindingEnabled(appState) ? getHoveredElementForBinding(
            (selectedPointsIndices?.length ?? 0) > 1 ? tupleToCoors3(
              _LinearElementEditor.getPointAtIndexGlobalCoordinates(
                element,
                selectedPoint,
                elementsMap
              )
            ) : pointerCoords,
            elements,
            elementsMap,
            appState.zoom,
            isElbowArrow(element),
            isElbowArrow(element)
          ) : null;
          bindings[selectedPoint === 0 ? "startBindingElement" : "endBindingElement"] = bindingElement;
        }
      }
    }
    return {
      ...editingLinearElement,
      ...bindings,
      segmentMidPointHoveredCoords: null,
      hoverPointIndex: -1,
      // if clicking without previously dragging a point(s), and not holding
      // shift, deselect all points except the one clicked. If holding shift,
      // toggle the point.
      selectedPointsIndices: isDragging || event.shiftKey ? !isDragging && event.shiftKey && pointerDownState.prevSelectedPointsIndices?.includes(
        pointerDownState.lastClickedPoint
      ) ? selectedPointsIndices && selectedPointsIndices.filter(
        (pointIndex) => pointIndex !== pointerDownState.lastClickedPoint
      ) : selectedPointsIndices : selectedPointsIndices?.includes(pointerDownState.lastClickedPoint) ? [pointerDownState.lastClickedPoint] : selectedPointsIndices,
      isDragging: false,
      pointerOffset: { x: 0, y: 0 },
      customLineAngle: null
    };
  }
  static getEditorMidPoints = (element, elementsMap, appState) => {
    const boundText = getBoundTextElement(element, elementsMap);
    if (!isElbowArrow(element) && !appState.editingLinearElement && element.points.length > 2 && !boundText) {
      return [];
    }
    const points = _LinearElementEditor.getPointsGlobalCoordinates(
      element,
      elementsMap
    );
    let index = 0;
    const midpoints = [];
    while (index < points.length - 1) {
      if (_LinearElementEditor.isSegmentTooShort(
        element,
        element.points[index],
        element.points[index + 1],
        index,
        appState.zoom
      )) {
        midpoints.push(null);
        index++;
        continue;
      }
      const segmentMidPoint = _LinearElementEditor.getSegmentMidPoint(
        element,
        index + 1
      );
      midpoints.push(segmentMidPoint);
      index++;
    }
    return midpoints;
  };
  static getSegmentMidpointHitCoords = (linearElementEditor, scenePointer, appState, elementsMap) => {
    const { elementId } = linearElementEditor;
    const element = _LinearElementEditor.getElement(elementId, elementsMap);
    if (!element) {
      return null;
    }
    const clickedPointIndex = _LinearElementEditor.getPointIndexUnderCursor(
      element,
      elementsMap,
      appState.zoom,
      scenePointer.x,
      scenePointer.y
    );
    if (!isElbowArrow(element) && clickedPointIndex >= 0) {
      return null;
    }
    const points = _LinearElementEditor.getPointsGlobalCoordinates(
      element,
      elementsMap
    );
    if (points.length >= 3 && !appState.editingLinearElement && !isElbowArrow(element)) {
      return null;
    }
    const threshold = (_LinearElementEditor.POINT_HANDLE_SIZE + 1) / appState.zoom.value;
    const existingSegmentMidpointHitCoords = linearElementEditor.segmentMidPointHoveredCoords;
    if (existingSegmentMidpointHitCoords) {
      const distance3 = pointDistance5(
        pointFrom8(
          existingSegmentMidpointHitCoords[0],
          existingSegmentMidpointHitCoords[1]
        ),
        pointFrom8(scenePointer.x, scenePointer.y)
      );
      if (distance3 <= threshold) {
        return existingSegmentMidpointHitCoords;
      }
    }
    let index = 0;
    const midPoints = _LinearElementEditor.getEditorMidPoints(
      element,
      elementsMap,
      appState
    );
    while (index < midPoints.length) {
      if (midPoints[index] !== null) {
        const distance3 = pointDistance5(
          midPoints[index],
          pointFrom8(scenePointer.x, scenePointer.y)
        );
        if (distance3 <= threshold) {
          return midPoints[index];
        }
      }
      index++;
    }
    return null;
  };
  static isSegmentTooShort(element, startPoint, endPoint, index, zoom) {
    if (isElbowArrow(element)) {
      if (index >= 0 && index < element.points.length) {
        return pointDistance5(startPoint, endPoint) * zoom.value < _LinearElementEditor.POINT_HANDLE_SIZE / 2;
      }
      return false;
    }
    let distance3 = pointDistance5(startPoint, endPoint);
    if (element.points.length > 2 && element.roundness) {
      const [lines, curves] = deconstructLinearOrFreeDrawElement2(element);
      invariant6(
        lines.length === 0 && curves.length > 0,
        "Only linears built out of curves are supported"
      );
      invariant6(
        lines.length + curves.length >= index,
        "Invalid segment index while calculating mid point"
      );
      distance3 = curveLength(curves[index]);
    }
    return distance3 * zoom.value < _LinearElementEditor.POINT_HANDLE_SIZE * 4;
  }
  static getSegmentMidPoint(element, index) {
    if (isElbowArrow(element)) {
      invariant6(
        element.points.length >= index,
        "Invalid segment index while calculating elbow arrow mid point"
      );
      const p = pointCenter2(element.points[index - 1], element.points[index]);
      return pointFrom8(element.x + p[0], element.y + p[1]);
    }
    const [lines, curves] = deconstructLinearOrFreeDrawElement2(element);
    invariant6(
      lines.length === 0 && curves.length > 0 || lines.length > 0 && curves.length === 0,
      "Only linears built out of either segments or curves are supported"
    );
    invariant6(
      lines.length + curves.length >= index,
      "Invalid segment index while calculating mid point"
    );
    if (lines.length) {
      const segment = lines[index - 1];
      return pointCenter2(segment[0], segment[1]);
    }
    if (curves.length) {
      const segment = curves[index - 1];
      return curvePointAtLength(segment, 0.5);
    }
    invariant6(false, "Invalid segment type while calculating mid point");
  }
  static getSegmentMidPointIndex(linearElementEditor, appState, midPoint, elementsMap) {
    const element = _LinearElementEditor.getElement(
      linearElementEditor.elementId,
      elementsMap
    );
    if (!element) {
      return -1;
    }
    const midPoints = _LinearElementEditor.getEditorMidPoints(
      element,
      elementsMap,
      appState
    );
    let index = 0;
    while (index < midPoints.length) {
      if (_LinearElementEditor.arePointsEqual(midPoint, midPoints[index])) {
        return index + 1;
      }
      index++;
    }
    return -1;
  }
  static handlePointerDown(event, app, store, scenePointer, linearElementEditor, scene) {
    const appState = app.state;
    const elementsMap = scene.getNonDeletedElementsMap();
    const elements = scene.getNonDeletedElements();
    const ret = {
      didAddPoint: false,
      hitElement: null,
      linearElementEditor: null
    };
    if (!linearElementEditor) {
      return ret;
    }
    const { elementId } = linearElementEditor;
    const element = _LinearElementEditor.getElement(elementId, elementsMap);
    if (!element) {
      return ret;
    }
    const segmentMidpoint = _LinearElementEditor.getSegmentMidpointHitCoords(
      linearElementEditor,
      scenePointer,
      appState,
      elementsMap
    );
    let segmentMidpointIndex = null;
    if (segmentMidpoint) {
      segmentMidpointIndex = _LinearElementEditor.getSegmentMidPointIndex(
        linearElementEditor,
        appState,
        segmentMidpoint,
        elementsMap
      );
    } else if (event.altKey && appState.editingLinearElement) {
      if (linearElementEditor.lastUncommittedPoint == null) {
        scene.mutateElement(element, {
          points: [
            ...element.points,
            _LinearElementEditor.createPointAt(
              element,
              elementsMap,
              scenePointer.x,
              scenePointer.y,
              event[KEYS2.CTRL_OR_CMD] ? null : app.getEffectiveGridSize()
            )
          ]
        });
        ret.didAddPoint = true;
      }
      store.scheduleCapture();
      ret.linearElementEditor = {
        ...linearElementEditor,
        pointerDownState: {
          prevSelectedPointsIndices: linearElementEditor.selectedPointsIndices,
          lastClickedPoint: -1,
          lastClickedIsEndPoint: false,
          origin: { x: scenePointer.x, y: scenePointer.y },
          segmentMidpoint: {
            value: segmentMidpoint,
            index: segmentMidpointIndex,
            added: false
          }
        },
        selectedPointsIndices: [element.points.length - 1],
        lastUncommittedPoint: null,
        endBindingElement: getHoveredElementForBinding(
          scenePointer,
          elements,
          elementsMap,
          app.state.zoom,
          linearElementEditor.elbowed
        )
      };
      ret.didAddPoint = true;
      return ret;
    }
    const clickedPointIndex = _LinearElementEditor.getPointIndexUnderCursor(
      element,
      elementsMap,
      appState.zoom,
      scenePointer.x,
      scenePointer.y
    );
    if (clickedPointIndex >= 0 || segmentMidpoint) {
      ret.hitElement = element;
    } else {
      const { startBindingElement, endBindingElement } = linearElementEditor;
      if (isBindingEnabled(appState) && isBindingElement(element)) {
        bindOrUnbindLinearElement(
          element,
          startBindingElement,
          endBindingElement,
          scene
        );
      }
    }
    const [x1, y1, x2, y2] = getElementAbsoluteCoords2(element, elementsMap);
    const cx = (x1 + x2) / 2;
    const cy = (y1 + y2) / 2;
    const targetPoint = clickedPointIndex > -1 && pointRotateRads7(
      pointFrom8(
        element.x + element.points[clickedPointIndex][0],
        element.y + element.points[clickedPointIndex][1]
      ),
      pointFrom8(cx, cy),
      element.angle
    );
    const nextSelectedPointsIndices = clickedPointIndex > -1 || event.shiftKey ? event.shiftKey || linearElementEditor.selectedPointsIndices?.includes(clickedPointIndex) ? normalizeSelectedPoints([
      ...linearElementEditor.selectedPointsIndices || [],
      clickedPointIndex
    ]) : [clickedPointIndex] : null;
    ret.linearElementEditor = {
      ...linearElementEditor,
      pointerDownState: {
        prevSelectedPointsIndices: linearElementEditor.selectedPointsIndices,
        lastClickedPoint: clickedPointIndex,
        lastClickedIsEndPoint: clickedPointIndex === element.points.length - 1,
        origin: { x: scenePointer.x, y: scenePointer.y },
        segmentMidpoint: {
          value: segmentMidpoint,
          index: segmentMidpointIndex,
          added: false
        }
      },
      selectedPointsIndices: nextSelectedPointsIndices,
      pointerOffset: targetPoint ? {
        x: scenePointer.x - targetPoint[0],
        y: scenePointer.y - targetPoint[1]
      } : { x: 0, y: 0 }
    };
    return ret;
  }
  static arePointsEqual(point1, point2) {
    if (!point1 && !point2) {
      return true;
    }
    if (!point1 || !point2) {
      return false;
    }
    return pointsEqual6(point1, point2);
  }
  static handlePointerMove(event, scenePointerX, scenePointerY, app) {
    const appState = app.state;
    if (!appState.editingLinearElement) {
      return null;
    }
    const { elementId, lastUncommittedPoint } = appState.editingLinearElement;
    const elementsMap = app.scene.getNonDeletedElementsMap();
    const element = _LinearElementEditor.getElement(elementId, elementsMap);
    if (!element) {
      return appState.editingLinearElement;
    }
    const { points } = element;
    const lastPoint = points[points.length - 1];
    if (!event.altKey) {
      if (lastPoint === lastUncommittedPoint) {
        _LinearElementEditor.deletePoints(element, app, [points.length - 1]);
      }
      return {
        ...appState.editingLinearElement,
        lastUncommittedPoint: null
      };
    }
    let newPoint;
    if (shouldRotateWithDiscreteAngle(event) && points.length >= 2) {
      const lastCommittedPoint = points[points.length - 2];
      const [width, height] = _LinearElementEditor._getShiftLockedDelta(
        element,
        elementsMap,
        lastCommittedPoint,
        pointFrom8(scenePointerX, scenePointerY),
        event[KEYS2.CTRL_OR_CMD] ? null : app.getEffectiveGridSize()
      );
      newPoint = pointFrom8(
        width + lastCommittedPoint[0],
        height + lastCommittedPoint[1]
      );
    } else {
      newPoint = _LinearElementEditor.createPointAt(
        element,
        elementsMap,
        scenePointerX - appState.editingLinearElement.pointerOffset.x,
        scenePointerY - appState.editingLinearElement.pointerOffset.y,
        event[KEYS2.CTRL_OR_CMD] || isElbowArrow(element) ? null : app.getEffectiveGridSize()
      );
    }
    if (lastPoint === lastUncommittedPoint) {
      _LinearElementEditor.movePoints(
        element,
        app.scene,
        /* @__PURE__ */ new Map([
          [
            element.points.length - 1,
            {
              point: newPoint
            }
          ]
        ])
      );
    } else {
      _LinearElementEditor.addPoints(element, app.scene, [newPoint]);
    }
    return {
      ...appState.editingLinearElement,
      lastUncommittedPoint: element.points[element.points.length - 1]
    };
  }
  /** scene coords */
  static getPointGlobalCoordinates(element, p, elementsMap) {
    const [x1, y1, x2, y2] = getElementAbsoluteCoords2(element, elementsMap);
    const cx = (x1 + x2) / 2;
    const cy = (y1 + y2) / 2;
    const { x, y } = element;
    return pointRotateRads7(
      pointFrom8(x + p[0], y + p[1]),
      pointFrom8(cx, cy),
      element.angle
    );
  }
  /** scene coords */
  static getPointsGlobalCoordinates(element, elementsMap) {
    const [x1, y1, x2, y2] = getElementAbsoluteCoords2(element, elementsMap);
    const cx = (x1 + x2) / 2;
    const cy = (y1 + y2) / 2;
    return element.points.map((p) => {
      const { x, y } = element;
      return pointRotateRads7(
        pointFrom8(x + p[0], y + p[1]),
        pointFrom8(cx, cy),
        element.angle
      );
    });
  }
  static getPointAtIndexGlobalCoordinates(element, indexMaybeFromEnd, elementsMap) {
    const index = indexMaybeFromEnd < 0 ? element.points.length + indexMaybeFromEnd : indexMaybeFromEnd;
    const [x1, y1, x2, y2] = getElementAbsoluteCoords2(element, elementsMap);
    const cx = (x1 + x2) / 2;
    const cy = (y1 + y2) / 2;
    const p = element.points[index];
    const { x, y } = element;
    return p ? pointRotateRads7(
      pointFrom8(x + p[0], y + p[1]),
      pointFrom8(cx, cy),
      element.angle
    ) : pointRotateRads7(pointFrom8(x, y), pointFrom8(cx, cy), element.angle);
  }
  static pointFromAbsoluteCoords(element, absoluteCoords, elementsMap) {
    if (isElbowArrow(element)) {
      return pointFrom8(
        absoluteCoords[0] - element.x,
        absoluteCoords[1] - element.y
      );
    }
    const [x1, y1, x2, y2] = getElementAbsoluteCoords2(element, elementsMap);
    const cx = (x1 + x2) / 2;
    const cy = (y1 + y2) / 2;
    const [x, y] = pointRotateRads7(
      pointFrom8(absoluteCoords[0], absoluteCoords[1]),
      pointFrom8(cx, cy),
      -element.angle
    );
    return pointFrom8(x - element.x, y - element.y);
  }
  static getPointIndexUnderCursor(element, elementsMap, zoom, x, y) {
    const pointHandles = _LinearElementEditor.getPointsGlobalCoordinates(
      element,
      elementsMap
    );
    let idx = pointHandles.length;
    while (--idx > -1) {
      const p = pointHandles[idx];
      if (pointDistance5(pointFrom8(x, y), pointFrom8(p[0], p[1])) * zoom.value < // +1px to account for outline stroke
      _LinearElementEditor.POINT_HANDLE_SIZE + 1) {
        return idx;
      }
    }
    return -1;
  }
  static createPointAt(element, elementsMap, scenePointerX, scenePointerY, gridSize) {
    const pointerOnGrid = getGridPoint(scenePointerX, scenePointerY, gridSize);
    const [x1, y1, x2, y2] = getElementAbsoluteCoords2(element, elementsMap);
    const cx = (x1 + x2) / 2;
    const cy = (y1 + y2) / 2;
    const [rotatedX, rotatedY] = pointRotateRads7(
      pointFrom8(pointerOnGrid[0], pointerOnGrid[1]),
      pointFrom8(cx, cy),
      -element.angle
    );
    return pointFrom8(rotatedX - element.x, rotatedY - element.y);
  }
  /**
   * Normalizes line points so that the start point is at [0,0]. This is
   * expected in various parts of the codebase.
   *
   * Also returns normalized x and y coords to account for the normalization
   * of the points.
   */
  static getNormalizeElementPointsAndCoords(element) {
    const { points, offsetX, offsetY } = getNormalizedPoints(element);
    return {
      points,
      x: element.x + offsetX,
      y: element.y + offsetY
    };
  }
  // element-mutating methods
  // ---------------------------------------------------------------------------
  static duplicateSelectedPoints(appState, scene) {
    invariant6(
      appState.editingLinearElement,
      "Not currently editing a linear element"
    );
    const elementsMap = scene.getNonDeletedElementsMap();
    const { selectedPointsIndices, elementId } = appState.editingLinearElement;
    const element = _LinearElementEditor.getElement(elementId, elementsMap);
    invariant6(
      element,
      "The linear element does not exist in the provided Scene"
    );
    invariant6(
      selectedPointsIndices != null,
      "There are no selected points to duplicate"
    );
    const { points } = element;
    const nextSelectedIndices = [];
    let pointAddedToEnd = false;
    let indexCursor = -1;
    const nextPoints = points.reduce((acc, p, index) => {
      ++indexCursor;
      acc.push(p);
      const isSelected = selectedPointsIndices.includes(index);
      if (isSelected) {
        const nextPoint = points[index + 1];
        if (!nextPoint) {
          pointAddedToEnd = true;
        }
        acc.push(
          nextPoint ? pointFrom8((p[0] + nextPoint[0]) / 2, (p[1] + nextPoint[1]) / 2) : pointFrom8(p[0], p[1])
        );
        nextSelectedIndices.push(indexCursor + 1);
        ++indexCursor;
      }
      return acc;
    }, []);
    scene.mutateElement(element, { points: nextPoints });
    if (pointAddedToEnd) {
      const lastPoint = element.points[element.points.length - 1];
      _LinearElementEditor.movePoints(
        element,
        scene,
        /* @__PURE__ */ new Map([
          [
            element.points.length - 1,
            { point: pointFrom8(lastPoint[0] + 30, lastPoint[1] + 30) }
          ]
        ])
      );
    }
    return {
      ...appState,
      editingLinearElement: {
        ...appState.editingLinearElement,
        selectedPointsIndices: nextSelectedIndices
      }
    };
  }
  static deletePoints(element, app, pointIndices) {
    const isUncommittedPoint = app.state.editingLinearElement?.lastUncommittedPoint === element.points[element.points.length - 1];
    const nextPoints = element.points.filter((_, idx) => {
      return !pointIndices.includes(idx);
    });
    const isPolygon = isLineElement(element) && element.polygon;
    if (isPolygon && (isUncommittedPoint || pointIndices.includes(0) || pointIndices.includes(element.points.length - 1))) {
      nextPoints[0] = pointFrom8(
        nextPoints[nextPoints.length - 1][0],
        nextPoints[nextPoints.length - 1][1]
      );
    }
    const {
      points: normalizedPoints,
      offsetX,
      offsetY
    } = getNormalizedPoints({ points: nextPoints });
    _LinearElementEditor._updatePoints(
      element,
      app.scene,
      normalizedPoints,
      offsetX,
      offsetY
    );
  }
  static addPoints(element, scene, addedPoints) {
    const nextPoints = [...element.points, ...addedPoints];
    if (isLineElement(element) && element.polygon) {
      nextPoints[0] = pointFrom8(
        nextPoints[nextPoints.length - 1][0],
        nextPoints[nextPoints.length - 1][1]
      );
    }
    const {
      points: normalizedPoints,
      offsetX,
      offsetY
    } = getNormalizedPoints({ points: nextPoints });
    _LinearElementEditor._updatePoints(
      element,
      scene,
      normalizedPoints,
      offsetX,
      offsetY
    );
  }
  static movePoints(element, scene, pointUpdates, otherUpdates) {
    const { points } = element;
    if (isLineElement(element) && element.polygon) {
      const firstPointUpdate = pointUpdates.get(0);
      const lastPointUpdate = pointUpdates.get(points.length - 1);
      if (firstPointUpdate) {
        pointUpdates.set(points.length - 1, {
          point: pointFrom8(
            firstPointUpdate.point[0],
            firstPointUpdate.point[1]
          ),
          isDragging: firstPointUpdate.isDragging
        });
      } else if (lastPointUpdate) {
        pointUpdates.set(0, {
          point: pointFrom8(lastPointUpdate.point[0], lastPointUpdate.point[1]),
          isDragging: lastPointUpdate.isDragging
        });
      }
    }
    const updatedOriginPoint = pointUpdates.get(0)?.point ?? pointFrom8(0, 0);
    const [offsetX, offsetY] = updatedOriginPoint;
    const nextPoints = isElbowArrow(element) ? [
      pointUpdates.get(0)?.point ?? points[0],
      pointUpdates.get(points.length - 1)?.point ?? points[points.length - 1]
    ] : points.map((p, idx) => {
      const current = pointUpdates.get(idx)?.point ?? p;
      return pointFrom8(
        current[0] - offsetX,
        current[1] - offsetY
      );
    });
    _LinearElementEditor._updatePoints(
      element,
      scene,
      nextPoints,
      offsetX,
      offsetY,
      otherUpdates,
      {
        isDragging: Array.from(pointUpdates.values()).some((t) => t.isDragging)
      }
    );
  }
  static shouldAddMidpoint(linearElementEditor, pointerCoords, appState, elementsMap) {
    const element = _LinearElementEditor.getElement(
      linearElementEditor.elementId,
      elementsMap
    );
    if (element && isElbowArrow(element)) {
      return false;
    }
    if (!element) {
      return false;
    }
    const { segmentMidpoint } = linearElementEditor.pointerDownState;
    if (segmentMidpoint.added || segmentMidpoint.value === null || segmentMidpoint.index === null || linearElementEditor.pointerDownState.origin === null) {
      return false;
    }
    const origin = linearElementEditor.pointerDownState.origin;
    const dist = pointDistance5(
      pointFrom8(origin.x, origin.y),
      pointFrom8(pointerCoords.x, pointerCoords.y)
    );
    if (!appState.editingLinearElement && dist < DRAGGING_THRESHOLD / appState.zoom.value) {
      return false;
    }
    return true;
  }
  static addMidpoint(linearElementEditor, pointerCoords, app, snapToGrid, scene) {
    const elementsMap = scene.getNonDeletedElementsMap();
    const element = _LinearElementEditor.getElement(
      linearElementEditor.elementId,
      elementsMap
    );
    if (!element) {
      return;
    }
    const { segmentMidpoint } = linearElementEditor.pointerDownState;
    const ret = {
      pointerDownState: linearElementEditor.pointerDownState,
      selectedPointsIndices: linearElementEditor.selectedPointsIndices
    };
    const midpoint2 = _LinearElementEditor.createPointAt(
      element,
      elementsMap,
      pointerCoords.x,
      pointerCoords.y,
      snapToGrid && !isElbowArrow(element) ? app.getEffectiveGridSize() : null
    );
    const points = [
      ...element.points.slice(0, segmentMidpoint.index),
      midpoint2,
      ...element.points.slice(segmentMidpoint.index)
    ];
    scene.mutateElement(element, { points });
    ret.pointerDownState = {
      ...linearElementEditor.pointerDownState,
      segmentMidpoint: {
        ...linearElementEditor.pointerDownState.segmentMidpoint,
        added: true
      },
      lastClickedPoint: segmentMidpoint.index
    };
    ret.selectedPointsIndices = [segmentMidpoint.index];
    return ret;
  }
  static _updatePoints(element, scene, nextPoints, offsetX, offsetY, otherUpdates, options) {
    if (isElbowArrow(element)) {
      const updates = {};
      if (otherUpdates?.startBinding !== void 0) {
        updates.startBinding = otherUpdates.startBinding !== null && isFixedPointBinding(otherUpdates.startBinding) ? otherUpdates.startBinding : null;
      }
      if (otherUpdates?.endBinding !== void 0) {
        updates.endBinding = otherUpdates.endBinding !== null && isFixedPointBinding(otherUpdates.endBinding) ? otherUpdates.endBinding : null;
      }
      updates.points = Array.from(nextPoints);
      scene.mutateElement(element, updates, {
        informMutation: true,
        isDragging: options?.isDragging ?? false
      });
    } else {
      const nextCoords = getElementPointsCoords(element, nextPoints);
      const prevCoords = getElementPointsCoords(element, element.points);
      const nextCenterX = (nextCoords[0] + nextCoords[2]) / 2;
      const nextCenterY = (nextCoords[1] + nextCoords[3]) / 2;
      const prevCenterX = (prevCoords[0] + prevCoords[2]) / 2;
      const prevCenterY = (prevCoords[1] + prevCoords[3]) / 2;
      const dX = prevCenterX - nextCenterX;
      const dY = prevCenterY - nextCenterY;
      const rotatedOffset = pointRotateRads7(
        pointFrom8(offsetX, offsetY),
        pointFrom8(dX, dY),
        element.angle
      );
      scene.mutateElement(element, {
        ...otherUpdates,
        points: nextPoints,
        x: element.x + rotatedOffset[0],
        y: element.y + rotatedOffset[1]
      });
    }
  }
  static _getShiftLockedDelta(element, elementsMap, referencePoint, scenePointer, gridSize, customLineAngle) {
    const referencePointCoords = _LinearElementEditor.getPointGlobalCoordinates(
      element,
      referencePoint,
      elementsMap
    );
    if (isElbowArrow(element)) {
      return [
        scenePointer[0] - referencePointCoords[0],
        scenePointer[1] - referencePointCoords[1]
      ];
    }
    const [gridX, gridY] = getGridPoint(
      scenePointer[0],
      scenePointer[1],
      gridSize
    );
    const { width, height } = getLockedLinearCursorAlignSize(
      referencePointCoords[0],
      referencePointCoords[1],
      gridX,
      gridY,
      customLineAngle
    );
    return pointRotateRads7(
      pointFrom8(width, height),
      pointFrom8(0, 0),
      -element.angle
    );
  }
  static getBoundTextElementPosition = (element, boundTextElement, elementsMap) => {
    const points = _LinearElementEditor.getPointsGlobalCoordinates(
      element,
      elementsMap
    );
    if (points.length < 2) {
      mutateElement(boundTextElement, elementsMap, { isDeleted: true });
    }
    let x = 0;
    let y = 0;
    if (element.points.length % 2 === 1) {
      const index = Math.floor(element.points.length / 2);
      const midPoint = _LinearElementEditor.getPointGlobalCoordinates(
        element,
        element.points[index],
        elementsMap
      );
      x = midPoint[0] - boundTextElement.width / 2;
      y = midPoint[1] - boundTextElement.height / 2;
    } else {
      const index = element.points.length / 2 - 1;
      const midSegmentMidpoint = _LinearElementEditor.getSegmentMidPoint(
        element,
        index + 1
      );
      x = midSegmentMidpoint[0] - boundTextElement.width / 2;
      y = midSegmentMidpoint[1] - boundTextElement.height / 2;
    }
    return { x, y };
  };
  static getMinMaxXYWithBoundText = (element, elementsMap, elementBounds, boundTextElement) => {
    let [x1, y1, x2, y2] = elementBounds;
    const cx = (x1 + x2) / 2;
    const cy = (y1 + y2) / 2;
    const { x: boundTextX1, y: boundTextY1 } = _LinearElementEditor.getBoundTextElementPosition(
      element,
      boundTextElement,
      elementsMap
    );
    const boundTextX2 = boundTextX1 + boundTextElement.width;
    const boundTextY2 = boundTextY1 + boundTextElement.height;
    const centerPoint = pointFrom8(cx, cy);
    const topLeftRotatedPoint = pointRotateRads7(
      pointFrom8(x1, y1),
      centerPoint,
      element.angle
    );
    const topRightRotatedPoint = pointRotateRads7(
      pointFrom8(x2, y1),
      centerPoint,
      element.angle
    );
    const counterRotateBoundTextTopLeft = pointRotateRads7(
      pointFrom8(boundTextX1, boundTextY1),
      centerPoint,
      -element.angle
    );
    const counterRotateBoundTextTopRight = pointRotateRads7(
      pointFrom8(boundTextX2, boundTextY1),
      centerPoint,
      -element.angle
    );
    const counterRotateBoundTextBottomLeft = pointRotateRads7(
      pointFrom8(boundTextX1, boundTextY2),
      centerPoint,
      -element.angle
    );
    const counterRotateBoundTextBottomRight = pointRotateRads7(
      pointFrom8(boundTextX2, boundTextY2),
      centerPoint,
      -element.angle
    );
    if (topLeftRotatedPoint[0] < topRightRotatedPoint[0] && topLeftRotatedPoint[1] >= topRightRotatedPoint[1]) {
      x1 = Math.min(x1, counterRotateBoundTextBottomLeft[0]);
      x2 = Math.max(
        x2,
        Math.max(
          counterRotateBoundTextTopRight[0],
          counterRotateBoundTextBottomRight[0]
        )
      );
      y1 = Math.min(y1, counterRotateBoundTextTopLeft[1]);
      y2 = Math.max(y2, counterRotateBoundTextBottomRight[1]);
    } else if (topLeftRotatedPoint[0] >= topRightRotatedPoint[0] && topLeftRotatedPoint[1] > topRightRotatedPoint[1]) {
      x1 = Math.min(x1, counterRotateBoundTextBottomRight[0]);
      x2 = Math.max(
        x2,
        Math.max(
          counterRotateBoundTextTopLeft[0],
          counterRotateBoundTextTopRight[0]
        )
      );
      y1 = Math.min(y1, counterRotateBoundTextBottomLeft[1]);
      y2 = Math.max(y2, counterRotateBoundTextTopRight[1]);
    } else if (topLeftRotatedPoint[0] >= topRightRotatedPoint[0]) {
      x1 = Math.min(x1, counterRotateBoundTextTopRight[0]);
      x2 = Math.max(x2, counterRotateBoundTextBottomLeft[0]);
      y1 = Math.min(y1, counterRotateBoundTextBottomRight[1]);
      y2 = Math.max(y2, counterRotateBoundTextTopLeft[1]);
    } else if (topLeftRotatedPoint[1] <= topRightRotatedPoint[1]) {
      x1 = Math.min(
        x1,
        Math.min(
          counterRotateBoundTextTopRight[0],
          counterRotateBoundTextTopLeft[0]
        )
      );
      x2 = Math.max(x2, counterRotateBoundTextBottomRight[0]);
      y1 = Math.min(y1, counterRotateBoundTextTopRight[1]);
      y2 = Math.max(y2, counterRotateBoundTextBottomLeft[1]);
    }
    return [x1, y1, x2, y2, cx, cy];
  };
  static getElementAbsoluteCoords = (element, elementsMap, includeBoundText = false) => {
    let coords;
    let x1;
    let y1;
    let x2;
    let y2;
    if (element.points.length < 2 || !ShapeCache.get(element)) {
      const { minX, minY, maxX, maxY } = element.points.reduce(
        (limits, [x, y]) => {
          limits.minY = Math.min(limits.minY, y);
          limits.minX = Math.min(limits.minX, x);
          limits.maxX = Math.max(limits.maxX, x);
          limits.maxY = Math.max(limits.maxY, y);
          return limits;
        },
        { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
      );
      x1 = minX + element.x;
      y1 = minY + element.y;
      x2 = maxX + element.x;
      y2 = maxY + element.y;
    } else {
      const shape = ShapeCache.generateElementShape(element, null);
      const ops = getCurvePathOps(shape[0]);
      const [minX, minY, maxX, maxY] = getMinMaxXYFromCurvePathOps(ops);
      x1 = minX + element.x;
      y1 = minY + element.y;
      x2 = maxX + element.x;
      y2 = maxY + element.y;
    }
    const cx = (x1 + x2) / 2;
    const cy = (y1 + y2) / 2;
    coords = [x1, y1, x2, y2, cx, cy];
    if (!includeBoundText) {
      return coords;
    }
    const boundTextElement = getBoundTextElement(element, elementsMap);
    if (boundTextElement) {
      coords = _LinearElementEditor.getMinMaxXYWithBoundText(
        element,
        elementsMap,
        [x1, y1, x2, y2],
        boundTextElement
      );
    }
    return coords;
  };
  static moveFixedSegment(linearElement, index, x, y, scene) {
    const elementsMap = scene.getNonDeletedElementsMap();
    const element = _LinearElementEditor.getElement(
      linearElement.elementId,
      elementsMap
    );
    if (!element || !isElbowArrow(element)) {
      return linearElement;
    }
    if (index && index > 0 && index < element.points.length) {
      const isHorizontal = headingIsHorizontal(
        vectorToHeading(
          vectorFromPoint7(element.points[index], element.points[index - 1])
        )
      );
      const fixedSegments = (element.fixedSegments ?? []).reduce(
        (segments, s) => {
          segments[s.index] = s;
          return segments;
        },
        {}
      );
      fixedSegments[index] = {
        index,
        start: pointFrom8(
          !isHorizontal ? x - element.x : element.points[index - 1][0],
          isHorizontal ? y - element.y : element.points[index - 1][1]
        ),
        end: pointFrom8(
          !isHorizontal ? x - element.x : element.points[index][0],
          isHorizontal ? y - element.y : element.points[index][1]
        )
      };
      const nextFixedSegments = Object.values(fixedSegments).sort(
        (a2, b2) => a2.index - b2.index
      );
      const offset = nextFixedSegments.map((segment) => segment.index).reduce((count, idx) => idx < index ? count + 1 : count, 0);
      scene.mutateElement(element, {
        fixedSegments: nextFixedSegments
      });
      const point = pointFrom8(
        element.x + (element.fixedSegments[offset].start[0] + element.fixedSegments[offset].end[0]) / 2,
        element.y + (element.fixedSegments[offset].start[1] + element.fixedSegments[offset].end[1]) / 2
      );
      return {
        ...linearElement,
        segmentMidPointHoveredCoords: point,
        pointerDownState: {
          ...linearElement.pointerDownState,
          segmentMidpoint: {
            added: false,
            index: element.fixedSegments[offset].index,
            value: point
          }
        }
      };
    }
    return linearElement;
  }
  static deleteFixedSegment(element, scene, index) {
    scene.mutateElement(element, {
      fixedSegments: element.fixedSegments?.filter(
        (segment) => segment.index !== index
      )
    });
  }
};
var normalizeSelectedPoints = (points) => {
  let nextPoints = [
    ...new Set(points.filter((p) => p !== null && p !== -1))
  ];
  nextPoints = nextPoints.sort((a2, b2) => a2 - b2);
  return nextPoints.length ? nextPoints : null;
};

// src/frame.ts
init_define_import_meta_env();
import { arrayToMap as arrayToMap5 } from "@excalidraw/common";
import { isPointWithinBounds as isPointWithinBounds2, pointFrom as pointFrom10 } from "@excalidraw/math";

// ../utils/src/bbox.ts
init_define_import_meta_env();
import {
  vectorCross as vectorCross4,
  vectorFromPoint as vectorFromPoint8
} from "@excalidraw/math";
function getBBox(line2) {
  return [
    Math.min(line2[0][0], line2[1][0]),
    Math.min(line2[0][1], line2[1][1]),
    Math.max(line2[0][0], line2[1][0]),
    Math.max(line2[0][1], line2[1][1])
  ];
}
function doBBoxesIntersect(a2, b2) {
  return a2[0] <= b2[2] && a2[2] >= b2[0] && a2[1] <= b2[3] && a2[3] >= b2[1];
}
var EPSILON = 1e-6;
function isPointOnLine(l2, p) {
  const p1 = vectorFromPoint8(l2[1], l2[0]);
  const p2 = vectorFromPoint8(p, l2[0]);
  const r = vectorCross4(p1, p2);
  return Math.abs(r) < EPSILON;
}
function isPointRightOfLine(l2, p) {
  const p1 = vectorFromPoint8(l2[1], l2[0]);
  const p2 = vectorFromPoint8(p, l2[0]);
  return vectorCross4(p1, p2) < 0;
}
function isLineSegmentTouchingOrCrossingLine(a2, b2) {
  return isPointOnLine(a2, b2[0]) || isPointOnLine(a2, b2[1]) || (isPointRightOfLine(a2, b2[0]) ? !isPointRightOfLine(a2, b2[1]) : isPointRightOfLine(a2, b2[1]));
}
function doLineSegmentsIntersect(a2, b2) {
  return doBBoxesIntersect(getBBox(a2), getBBox(b2)) && isLineSegmentTouchingOrCrossingLine(a2, b2) && isLineSegmentTouchingOrCrossingLine(b2, a2);
}

// ../utils/src/withinBounds.ts
init_define_import_meta_env();
import { arrayToMap as arrayToMap3 } from "@excalidraw/common";
import { getElementBounds as getElementBounds2 } from "@excalidraw/element";
import {
  isArrowElement as isArrowElement2,
  isExcalidrawElement as isExcalidrawElement2,
  isFreeDrawElement as isFreeDrawElement2,
  isLinearElement as isLinearElement2,
  isTextElement as isTextElement2
} from "@excalidraw/element";
import {
  rangeIncludesValue,
  pointFrom as pointFrom9,
  pointRotateRads as pointRotateRads8,
  rangeInclusive
} from "@excalidraw/math";
var getNonLinearElementRelativePoints = (element) => {
  if (element.type === "diamond") {
    return [
      pointFrom9(element.width / 2, 0),
      pointFrom9(element.width, element.height / 2),
      pointFrom9(element.width / 2, element.height),
      pointFrom9(0, element.height / 2)
    ];
  }
  return [
    pointFrom9(0, 0),
    pointFrom9(0 + element.width, 0),
    pointFrom9(0 + element.width, element.height),
    pointFrom9(0, element.height)
  ];
};
var getElementRelativePoints = (element) => {
  if (isLinearElement2(element) || isFreeDrawElement2(element)) {
    return element.points;
  }
  return getNonLinearElementRelativePoints(element);
};
var getMinMaxPoints = (points) => {
  const ret = points.reduce(
    (limits, [x, y]) => {
      limits.minY = Math.min(limits.minY, y);
      limits.minX = Math.min(limits.minX, x);
      limits.maxX = Math.max(limits.maxX, x);
      limits.maxY = Math.max(limits.maxY, y);
      return limits;
    },
    {
      minX: Infinity,
      minY: Infinity,
      maxX: -Infinity,
      maxY: -Infinity,
      cx: 0,
      cy: 0
    }
  );
  ret.cx = (ret.maxX + ret.minX) / 2;
  ret.cy = (ret.maxY + ret.minY) / 2;
  return ret;
};
var getRotatedBBox = (element) => {
  const points = getElementRelativePoints(element);
  const { cx, cy } = getMinMaxPoints(points);
  const centerPoint = pointFrom9(cx, cy);
  const rotatedPoints = points.map(
    (p) => pointRotateRads8(p, centerPoint, element.angle)
  );
  const { minX, minY, maxX, maxY } = getMinMaxPoints(rotatedPoints);
  return [
    minX + element.x,
    minY + element.y,
    maxX + element.x,
    maxY + element.y
  ];
};
var isElementInsideBBox = (element, bbox, eitherDirection = false) => {
  const elementBBox = getRotatedBBox(element);
  const elementInsideBbox = bbox[0] <= elementBBox[0] && bbox[2] >= elementBBox[2] && bbox[1] <= elementBBox[1] && bbox[3] >= elementBBox[3];
  if (!eitherDirection) {
    return elementInsideBbox;
  }
  if (elementInsideBbox) {
    return true;
  }
  return elementBBox[0] <= bbox[0] && elementBBox[2] >= bbox[2] && elementBBox[1] <= bbox[1] && elementBBox[3] >= bbox[3];
};
var elementPartiallyOverlapsWithOrContainsBBox = (element, bbox) => {
  const elementBBox = getRotatedBBox(element);
  return (rangeIncludesValue(elementBBox[0], rangeInclusive(bbox[0], bbox[2])) || rangeIncludesValue(
    bbox[0],
    rangeInclusive(elementBBox[0], elementBBox[2])
  )) && (rangeIncludesValue(elementBBox[1], rangeInclusive(bbox[1], bbox[3])) || rangeIncludesValue(
    bbox[1],
    rangeInclusive(elementBBox[1], elementBBox[3])
  ));
};
var elementsOverlappingBBox = ({
  elements,
  bounds,
  type,
  errorMargin = 0
}) => {
  if (isExcalidrawElement2(bounds)) {
    bounds = getElementBounds2(bounds, arrayToMap3(elements));
  }
  const adjustedBBox = [
    bounds[0] - errorMargin,
    bounds[1] - errorMargin,
    bounds[2] + errorMargin,
    bounds[3] + errorMargin
  ];
  const includedElementSet = /* @__PURE__ */ new Set();
  for (const element of elements) {
    if (includedElementSet.has(element.id)) {
      continue;
    }
    const isOverlaping = type === "overlap" ? elementPartiallyOverlapsWithOrContainsBBox(element, adjustedBBox) : type === "inside" ? isElementInsideBBox(element, adjustedBBox) : isElementInsideBBox(element, adjustedBBox, true);
    if (isOverlaping) {
      includedElementSet.add(element.id);
      if (element.boundElements) {
        for (const boundElement of element.boundElements) {
          includedElementSet.add(boundElement.id);
        }
      }
      if (isTextElement2(element) && element.containerId) {
        includedElementSet.add(element.containerId);
      }
      if (isArrowElement2(element)) {
        if (element.startBinding) {
          includedElementSet.add(element.startBinding.elementId);
        }
        if (element.endBinding) {
          includedElementSet.add(element.endBinding?.elementId);
        }
      }
    }
  }
  return elements.filter((element) => includedElementSet.has(element.id));
};

// src/selection.ts
init_define_import_meta_env();
import { arrayToMap as arrayToMap4, isShallowEqual } from "@excalidraw/common";

// src/groups.ts
init_define_import_meta_env();
var selectGroup = (groupId, appState, elements) => {
  const elementsInGroup = elements.reduce(
    (acc, element) => {
      if (element.groupIds.includes(groupId)) {
        acc[element.id] = true;
      }
      return acc;
    },
    {}
  );
  if (Object.keys(elementsInGroup).length < 2) {
    if (appState.selectedGroupIds[groupId] || appState.editingGroupId === groupId) {
      return {
        selectedElementIds: appState.selectedElementIds,
        selectedGroupIds: { ...appState.selectedGroupIds, [groupId]: false },
        editingGroupId: null
      };
    }
    return appState;
  }
  return {
    editingGroupId: appState.editingGroupId,
    selectedGroupIds: { ...appState.selectedGroupIds, [groupId]: true },
    selectedElementIds: {
      ...appState.selectedElementIds,
      ...elementsInGroup
    }
  };
};
var selectGroupsForSelectedElements = function() {
  let lastSelectedElements = null;
  let lastElements = null;
  let lastReturnValue = null;
  const _selectGroups = (selectedElements, elements, appState, prevAppState) => {
    if (lastReturnValue !== void 0 && elements === lastElements && selectedElements === lastSelectedElements && appState.editingGroupId === lastReturnValue?.editingGroupId) {
      return lastReturnValue;
    }
    const selectedGroupIds = {};
    for (const selectedElement of selectedElements) {
      let groupIds = selectedElement.groupIds;
      if (appState.editingGroupId) {
        const indexOfEditingGroup = groupIds.indexOf(appState.editingGroupId);
        if (indexOfEditingGroup > -1) {
          groupIds = groupIds.slice(0, indexOfEditingGroup);
        }
      }
      if (groupIds.length > 0) {
        const lastSelectedGroup = groupIds[groupIds.length - 1];
        selectedGroupIds[lastSelectedGroup] = true;
      }
    }
    const groupElementsIndex = {};
    const selectedElementIdsInGroups = elements.reduce(
      (acc, element) => {
        if (element.isDeleted) {
          return acc;
        }
        const groupId = element.groupIds.find((id) => selectedGroupIds[id]);
        if (groupId) {
          acc[element.id] = true;
          if (!Array.isArray(groupElementsIndex[groupId])) {
            groupElementsIndex[groupId] = [element.id];
          } else {
            groupElementsIndex[groupId].push(element.id);
          }
        }
        return acc;
      },
      {}
    );
    for (const groupId of Object.keys(groupElementsIndex)) {
      if (groupElementsIndex[groupId].length < 2) {
        if (selectedGroupIds[groupId]) {
          selectedGroupIds[groupId] = false;
        }
      }
    }
    lastElements = elements;
    lastSelectedElements = selectedElements;
    lastReturnValue = {
      editingGroupId: appState.editingGroupId,
      selectedGroupIds,
      selectedElementIds: makeNextSelectedElementIds(
        {
          ...appState.selectedElementIds,
          ...selectedElementIdsInGroups
        },
        prevAppState
      )
    };
    return lastReturnValue;
  };
  const selectGroupsForSelectedElements2 = (appState, elements, prevAppState, app) => {
    const selectedElements = app ? app.scene.getSelectedElements({
      selectedElementIds: appState.selectedElementIds,
      // supplying elements explicitly in case we're passed non-state elements
      elements
    }) : getSelectedElements(elements, appState);
    if (!selectedElements.length) {
      return {
        selectedGroupIds: {},
        editingGroupId: null,
        selectedElementIds: makeNextSelectedElementIds(
          appState.selectedElementIds,
          prevAppState
        )
      };
    }
    return _selectGroups(selectedElements, elements, appState, prevAppState);
  };
  selectGroupsForSelectedElements2.clearCache = () => {
    lastElements = null;
    lastSelectedElements = null;
    lastReturnValue = null;
  };
  return selectGroupsForSelectedElements2;
}();
var isSelectedViaGroup = (appState, element) => getSelectedGroupForElement(appState, element) != null;
var getSelectedGroupForElement = (appState, element) => element.groupIds.filter((groupId) => groupId !== appState.editingGroupId).find((groupId) => appState.selectedGroupIds[groupId]);
var getSelectedGroupIds = (appState) => Object.entries(appState.selectedGroupIds).filter(([groupId, isSelected]) => isSelected).map(([groupId, isSelected]) => groupId);
var selectGroupsFromGivenElements = (elements, appState) => {
  let nextAppState = {
    ...appState,
    selectedGroupIds: {}
  };
  for (const element of elements) {
    let groupIds = element.groupIds;
    if (appState.editingGroupId) {
      const indexOfEditingGroup = groupIds.indexOf(appState.editingGroupId);
      if (indexOfEditingGroup > -1) {
        groupIds = groupIds.slice(0, indexOfEditingGroup);
      }
    }
    if (groupIds.length > 0) {
      const groupId = groupIds[groupIds.length - 1];
      nextAppState = {
        ...nextAppState,
        ...selectGroup(groupId, nextAppState, elements)
      };
    }
  }
  return nextAppState.selectedGroupIds;
};
var editGroupForSelectedElement = (appState, element) => {
  return {
    ...appState,
    editingGroupId: element.groupIds.length ? element.groupIds[0] : null,
    selectedGroupIds: {},
    selectedElementIds: {
      [element.id]: true
    }
  };
};
var isElementInGroup = (element, groupId) => element.groupIds.includes(groupId);
var getElementsInGroup = (elements, groupId) => {
  const elementsInGroup = [];
  for (const element of elements.values()) {
    if (isElementInGroup(element, groupId)) {
      elementsInGroup.push(element);
    }
  }
  return elementsInGroup;
};
var getSelectedGroupIdForElement = (element, selectedGroupIds) => element.groupIds.find((groupId) => selectedGroupIds[groupId]);
var addToGroup = (prevGroupIds, newGroupId, editingGroupId) => {
  const groupIds = [...prevGroupIds];
  const positionOfEditingGroupId = editingGroupId ? groupIds.indexOf(editingGroupId) : -1;
  const positionToInsert = positionOfEditingGroupId > -1 ? positionOfEditingGroupId : groupIds.length;
  groupIds.splice(positionToInsert, 0, newGroupId);
  return groupIds;
};
var removeFromSelectedGroups = (groupIds, selectedGroupIds) => groupIds.filter((groupId) => !selectedGroupIds[groupId]);
var getMaximumGroups = (elements, elementsMap) => {
  const groups = /* @__PURE__ */ new Map();
  elements.forEach((element) => {
    const groupId = element.groupIds.length === 0 ? element.id : element.groupIds[element.groupIds.length - 1];
    const currentGroupMembers = groups.get(groupId) || [];
    const boundTextElement = getBoundTextElement(element, elementsMap);
    if (boundTextElement) {
      currentGroupMembers.push(boundTextElement);
    }
    groups.set(groupId, [...currentGroupMembers, element]);
  });
  return Array.from(groups.values());
};
var getNonDeletedGroupIds = (elements) => {
  const nonDeletedGroupIds = /* @__PURE__ */ new Set();
  for (const [, element] of elements) {
    if (element.isDeleted) {
      continue;
    }
    for (const groupId of element.groupIds ?? []) {
      nonDeletedGroupIds.add(groupId);
    }
  }
  return nonDeletedGroupIds;
};
var elementsAreInSameGroup = (elements) => {
  const allGroups = elements.flatMap((element) => element.groupIds);
  const groupCount = /* @__PURE__ */ new Map();
  let maxGroup = 0;
  for (const group of allGroups) {
    groupCount.set(group, (groupCount.get(group) ?? 0) + 1);
    if (groupCount.get(group) > maxGroup) {
      maxGroup = groupCount.get(group);
    }
  }
  return maxGroup === elements.length;
};
var isInGroup = (element) => {
  return element.groupIds.length > 0;
};
var getNewGroupIdsForDuplication = (groupIds, editingGroupId, mapper) => {
  const copy = [...groupIds];
  const positionOfEditingGroupId = editingGroupId ? groupIds.indexOf(editingGroupId) : -1;
  const endIndex = positionOfEditingGroupId > -1 ? positionOfEditingGroupId : groupIds.length;
  for (let index = 0; index < endIndex; index++) {
    copy[index] = mapper(copy[index]);
  }
  return copy;
};

// src/selection.ts
var excludeElementsInFramesFromSelection = (selectedElements) => {
  const framesInSelection = /* @__PURE__ */ new Set();
  selectedElements.forEach((element) => {
    if (isFrameLikeElement(element)) {
      framesInSelection.add(element.id);
    }
  });
  return selectedElements.filter((element) => {
    if (element.frameId && framesInSelection.has(element.frameId)) {
      return false;
    }
    return true;
  });
};
var getElementsWithinSelection = (elements, selection, elementsMap, excludeElementsInFrames = true) => {
  const [selectionX1, selectionY1, selectionX2, selectionY2] = getElementAbsoluteCoords2(selection, elementsMap);
  let elementsInSelection = elements.filter((element) => {
    let [elementX1, elementY1, elementX2, elementY2] = getElementBounds(
      element,
      elementsMap
    );
    const containingFrame = getContainingFrame(element, elementsMap);
    if (containingFrame) {
      const [fx1, fy1, fx2, fy2] = getElementBounds(
        containingFrame,
        elementsMap
      );
      elementX1 = Math.max(fx1, elementX1);
      elementY1 = Math.max(fy1, elementY1);
      elementX2 = Math.min(fx2, elementX2);
      elementY2 = Math.min(fy2, elementY2);
    }
    return element.locked === false && element.type !== "selection" && !isBoundToContainer(element) && selectionX1 <= elementX1 && selectionY1 <= elementY1 && selectionX2 >= elementX2 && selectionY2 >= elementY2;
  });
  elementsInSelection = excludeElementsInFrames ? excludeElementsInFramesFromSelection(elementsInSelection) : elementsInSelection;
  elementsInSelection = elementsInSelection.filter((element) => {
    const containingFrame = getContainingFrame(element, elementsMap);
    if (containingFrame) {
      return elementOverlapsWithFrame(element, containingFrame, elementsMap);
    }
    return true;
  });
  return elementsInSelection;
};
var getVisibleAndNonSelectedElements = (elements, selectedElements, appState, elementsMap) => {
  const selectedElementsSet = new Set(
    selectedElements.map((element) => element.id)
  );
  return elements.filter((element) => {
    const isVisible = isElementInViewport(
      element,
      appState.width,
      appState.height,
      appState,
      elementsMap
    );
    return !selectedElementsSet.has(element.id) && isVisible;
  });
};
var isSomeElementSelected = function() {
  let lastElements = null;
  let lastSelectedElementIds = null;
  let isSelected = null;
  const ret = (elements, appState) => {
    if (isSelected != null && elements === lastElements && appState.selectedElementIds === lastSelectedElementIds) {
      return isSelected;
    }
    isSelected = elements.some(
      (element) => appState.selectedElementIds[element.id]
    );
    lastElements = elements;
    lastSelectedElementIds = appState.selectedElementIds;
    return isSelected;
  };
  ret.clearCache = () => {
    lastElements = null;
    lastSelectedElementIds = null;
    isSelected = null;
  };
  return ret;
}();
var getSelectedElements = (elements, appState, opts) => {
  const addedElements = /* @__PURE__ */ new Set();
  const selectedElements = [];
  for (const element of elements.values()) {
    if (appState.selectedElementIds[element.id]) {
      selectedElements.push(element);
      addedElements.add(element.id);
      continue;
    }
    if (opts?.includeBoundTextElement && isBoundToContainer(element) && appState.selectedElementIds[element?.containerId]) {
      selectedElements.push(element);
      addedElements.add(element.id);
      continue;
    }
  }
  if (opts?.includeElementsInFrames) {
    const elementsToInclude = [];
    selectedElements.forEach((element) => {
      if (isFrameLikeElement(element)) {
        getFrameChildren(elements, element.id).forEach(
          (e) => !addedElements.has(e.id) && elementsToInclude.push(e)
        );
      }
      elementsToInclude.push(element);
    });
    return elementsToInclude;
  }
  return selectedElements;
};
var getTargetElements = (elements, appState) => appState.editingTextElement ? [appState.editingTextElement] : appState.newElement ? [appState.newElement] : getSelectedElements(elements, appState, {
  includeBoundTextElement: true
});
var makeNextSelectedElementIds = (nextSelectedElementIds, prevState) => {
  if (isShallowEqual(prevState.selectedElementIds, nextSelectedElementIds)) {
    return prevState.selectedElementIds;
  }
  return nextSelectedElementIds;
};
var _getLinearElementEditor = (targetElements, allElements) => {
  const linears = targetElements.filter(isLinearElement);
  if (linears.length === 1) {
    const linear = linears[0];
    const boundElements = linear.boundElements?.map((def) => def.id) ?? [];
    const onlySingleLinearSelected = targetElements.every(
      (el) => el.id === linear.id || boundElements.includes(el.id)
    );
    if (onlySingleLinearSelected) {
      return new LinearElementEditor(linear, arrayToMap4(allElements));
    }
  }
  return null;
};
var getSelectionStateForElements = (targetElements, allElements, appState) => {
  return {
    selectedLinearElement: _getLinearElementEditor(targetElements, allElements),
    ...selectGroupsForSelectedElements(
      {
        editingGroupId: appState.editingGroupId,
        selectedElementIds: excludeElementsInFramesFromSelection(
          targetElements
        ).reduce((acc, element) => {
          if (!isBoundToContainer(element)) {
            acc[element.id] = true;
          }
          return acc;
        }, {})
      },
      allElements,
      appState,
      null
    )
  };
};

// src/frame.ts
var bindElementsToFramesAfterDuplication = (nextElements, origElements, origIdToDuplicateId) => {
  const nextElementMap = arrayToMap5(nextElements);
  for (const element of origElements) {
    if (element.frameId) {
      const nextElementId = origIdToDuplicateId.get(element.id);
      const nextFrameId = origIdToDuplicateId.get(element.frameId);
      const nextElement = nextElementId && nextElementMap.get(nextElementId);
      if (nextElement) {
        mutateElement(nextElement, nextElementMap, {
          frameId: nextFrameId ?? null
        });
      }
    }
  }
};
function isElementIntersectingFrame(element, frame, elementsMap) {
  const frameLineSegments = getElementLineSegments(frame, elementsMap);
  const elementLineSegments = getElementLineSegments(element, elementsMap);
  const intersecting = frameLineSegments.some(
    (frameLineSegment) => elementLineSegments.some(
      (elementLineSegment) => doLineSegmentsIntersect(frameLineSegment, elementLineSegment)
    )
  );
  return intersecting;
}
var getElementsCompletelyInFrame = (elements, frame, elementsMap) => omitGroupsContainingFrameLikes(
  getElementsWithinSelection(elements, frame, elementsMap, false)
).filter(
  (element) => !isFrameLikeElement(element) && !element.frameId || element.frameId === frame.id
);
var isElementContainingFrame = (element, frame, elementsMap) => {
  return getElementsWithinSelection([frame], element, elementsMap).some(
    (e) => e.id === frame.id
  );
};
var getElementsIntersectingFrame = (elements, frame) => {
  const elementsMap = arrayToMap5(elements);
  return elements.filter(
    (element) => isElementIntersectingFrame(element, frame, elementsMap)
  );
};
var elementsAreInFrameBounds = (elements, frame, elementsMap) => {
  const [frameX1, frameY1, frameX2, frameY2] = getElementAbsoluteCoords2(
    frame,
    elementsMap
  );
  const [elementX1, elementY1, elementX2, elementY2] = getCommonBounds(elements);
  return frameX1 <= elementX1 && frameY1 <= elementY1 && frameX2 >= elementX2 && frameY2 >= elementY2;
};
var elementOverlapsWithFrame = (element, frame, elementsMap) => {
  return elementsAreInFrameBounds([element], frame, elementsMap) || isElementIntersectingFrame(element, frame, elementsMap) || isElementContainingFrame(element, frame, elementsMap);
};
var isCursorInFrame = (cursorCoords, frame, elementsMap) => {
  const [fx1, fy1, fx2, fy2] = getElementAbsoluteCoords2(frame, elementsMap);
  return isPointWithinBounds2(
    pointFrom10(fx1, fy1),
    pointFrom10(cursorCoords.x, cursorCoords.y),
    pointFrom10(fx2, fy2)
  );
};
var groupsAreAtLeastIntersectingTheFrame = (elements, groupIds, frame) => {
  const elementsMap = arrayToMap5(elements);
  const elementsInGroup = groupIds.flatMap(
    (groupId) => getElementsInGroup(elements, groupId)
  );
  if (elementsInGroup.length === 0) {
    return true;
  }
  return !!elementsInGroup.find(
    (element) => elementsAreInFrameBounds([element], frame, elementsMap) || isElementIntersectingFrame(element, frame, elementsMap)
  );
};
var groupsAreCompletelyOutOfFrame = (elements, groupIds, frame) => {
  const elementsMap = arrayToMap5(elements);
  const elementsInGroup = groupIds.flatMap(
    (groupId) => getElementsInGroup(elements, groupId)
  );
  if (elementsInGroup.length === 0) {
    return true;
  }
  return elementsInGroup.find(
    (element) => elementsAreInFrameBounds([element], frame, elementsMap) || isElementIntersectingFrame(element, frame, elementsMap)
  ) === void 0;
};
var groupByFrameLikes = (elements) => {
  const frameElementsMap = /* @__PURE__ */ new Map();
  for (const element of elements) {
    const frameId = isFrameLikeElement(element) ? element.id : element.frameId;
    if (frameId && !frameElementsMap.has(frameId)) {
      frameElementsMap.set(frameId, getFrameChildren(elements, frameId));
    }
  }
  return frameElementsMap;
};
var getFrameChildren = (allElements, frameId) => {
  const frameChildren = [];
  for (const element of allElements.values()) {
    if (element.frameId === frameId) {
      frameChildren.push(element);
    }
  }
  return frameChildren;
};
var getFrameLikeElements = (allElements) => {
  return allElements.filter(
    (element) => isFrameLikeElement(element)
  );
};
var getRootElements = (allElements) => {
  const frameElements = arrayToMap5(getFrameLikeElements(allElements));
  return allElements.filter(
    (element) => frameElements.has(element.id) || !element.frameId || !frameElements.has(element.frameId)
  );
};
var getElementsInResizingFrame = (allElements, frame, appState, elementsMap) => {
  const prevElementsInFrame = getFrameChildren(allElements, frame.id);
  const nextElementsInFrame = new Set(prevElementsInFrame);
  const elementsCompletelyInFrame = /* @__PURE__ */ new Set([
    ...getElementsCompletelyInFrame(allElements, frame, elementsMap),
    ...prevElementsInFrame.filter(
      (element) => isElementContainingFrame(element, frame, elementsMap)
    )
  ]);
  const elementsNotCompletelyInFrame = prevElementsInFrame.filter(
    (element) => !elementsCompletelyInFrame.has(element)
  );
  const groupsToKeep = new Set(
    Array.from(elementsCompletelyInFrame).flatMap(
      (element) => element.groupIds
    )
  );
  for (const element of elementsNotCompletelyInFrame) {
    if (!isElementIntersectingFrame(element, frame, elementsMap)) {
      if (element.groupIds.length === 0) {
        nextElementsInFrame.delete(element);
      }
    } else if (element.groupIds.length > 0) {
      for (const id of element.groupIds) {
        groupsToKeep.add(id);
      }
    }
  }
  for (const element of elementsNotCompletelyInFrame) {
    if (element.groupIds.length > 0) {
      let shouldRemoveElement = true;
      for (const id of element.groupIds) {
        if (groupsToKeep.has(id)) {
          shouldRemoveElement = false;
        }
      }
      if (shouldRemoveElement) {
        nextElementsInFrame.delete(element);
      }
    }
  }
  const individualElementsCompletelyInFrame = Array.from(
    elementsCompletelyInFrame
  ).filter((element) => element.groupIds.length === 0);
  for (const element of individualElementsCompletelyInFrame) {
    nextElementsInFrame.add(element);
  }
  const newGroupElementsCompletelyInFrame = Array.from(
    elementsCompletelyInFrame
  ).filter((element) => element.groupIds.length > 0);
  const groupIds = selectGroupsFromGivenElements(
    newGroupElementsCompletelyInFrame,
    appState
  );
  for (const [id, isSelected] of Object.entries(groupIds)) {
    if (isSelected) {
      const elementsInGroup = getElementsInGroup(allElements, id);
      if (elementsAreInFrameBounds(elementsInGroup, frame, elementsMap)) {
        for (const element of elementsInGroup) {
          nextElementsInFrame.add(element);
        }
      }
    }
  }
  return [...nextElementsInFrame].filter((element) => {
    return !(isTextElement(element) && element.containerId);
  });
};
var getElementsInNewFrame = (elements, frame, elementsMap) => {
  return omitPartialGroups(
    omitGroupsContainingFrameLikes(
      elements,
      getElementsCompletelyInFrame(elements, frame, elementsMap)
    ),
    frame,
    elementsMap
  );
};
var omitPartialGroups = (elements, frame, allElementsMap) => {
  const elementsToReturn = [];
  const checkedGroups = /* @__PURE__ */ new Map();
  for (const element of elements) {
    let shouldOmit = false;
    if (element.groupIds.length > 0) {
      if (element.groupIds.some((gid) => checkedGroups.get(gid))) {
        shouldOmit = true;
      } else {
        const allElementsInGroup = new Set(
          element.groupIds.flatMap(
            (gid) => getElementsInGroup(allElementsMap, gid)
          )
        );
        shouldOmit = !elementsAreInFrameBounds(
          Array.from(allElementsInGroup),
          frame,
          allElementsMap
        );
      }
      element.groupIds.forEach((gid) => {
        checkedGroups.set(gid, shouldOmit);
      });
    }
    if (!shouldOmit) {
      elementsToReturn.push(element);
    }
  }
  return elementsToReturn;
};
var getContainingFrame = (element, elementsMap) => {
  if (!element.frameId) {
    return null;
  }
  return elementsMap.get(element.frameId) || null;
};
var filterElementsEligibleAsFrameChildren = (elements, frame) => {
  const otherFrames = /* @__PURE__ */ new Set();
  const elementsMap = arrayToMap5(elements);
  elements = omitGroupsContainingFrameLikes(elements);
  for (const element of elements) {
    if (isFrameLikeElement(element) && element.id !== frame.id) {
      otherFrames.add(element.id);
    }
  }
  const processedGroups = /* @__PURE__ */ new Set();
  const eligibleElements = [];
  for (const element of elements) {
    if (isFrameLikeElement(element) || element.frameId && otherFrames.has(element.frameId)) {
      continue;
    }
    if (element.groupIds.length) {
      const shallowestGroupId = element.groupIds.at(-1);
      if (!processedGroups.has(shallowestGroupId)) {
        processedGroups.add(shallowestGroupId);
        const groupElements = getElementsInGroup(elements, shallowestGroupId);
        if (groupElements.some(
          (el) => elementOverlapsWithFrame(el, frame, elementsMap)
        )) {
          for (const child of groupElements) {
            eligibleElements.push(child);
          }
        }
      }
    } else {
      const overlaps = elementOverlapsWithFrame(element, frame, elementsMap);
      if (overlaps) {
        eligibleElements.push(element);
      }
    }
  }
  return eligibleElements;
};
var addElementsToFrame = (allElements, elementsToAdd, frame, appState) => {
  const elementsMap = arrayToMap5(allElements);
  const currTargetFrameChildrenMap = /* @__PURE__ */ new Map();
  for (const element of allElements.values()) {
    if (element.frameId === frame.id) {
      currTargetFrameChildrenMap.set(element.id, true);
    }
  }
  const suppliedElementsToAddSet = new Set(elementsToAdd.map((el) => el.id));
  const finalElementsToAdd = [];
  const otherFrames = /* @__PURE__ */ new Set();
  for (const element of elementsToAdd) {
    if (isFrameLikeElement(element) && element.id !== frame.id) {
      otherFrames.add(element.id);
    }
  }
  for (const element of omitGroupsContainingFrameLikes(
    allElements,
    elementsToAdd
  )) {
    if (isFrameLikeElement(element) || element.frameId && otherFrames.has(element.frameId)) {
      continue;
    }
    if (element.frameId && appState.selectedElementIds[element.id] && appState.selectedElementIds[element.frameId]) {
      continue;
    }
    if (!currTargetFrameChildrenMap.has(element.id)) {
      finalElementsToAdd.push(element);
    }
    const boundTextElement = getBoundTextElement(element, elementsMap);
    if (boundTextElement && !suppliedElementsToAddSet.has(boundTextElement.id) && !currTargetFrameChildrenMap.has(boundTextElement.id)) {
      finalElementsToAdd.push(boundTextElement);
    }
  }
  for (const element of finalElementsToAdd) {
    mutateElement(element, elementsMap, {
      frameId: frame.id
    });
  }
  return allElements;
};
var removeElementsFromFrame = (elementsToRemove, elementsMap) => {
  const _elementsToRemove = /* @__PURE__ */ new Map();
  const toRemoveElementsByFrame = /* @__PURE__ */ new Map();
  for (const element of elementsToRemove) {
    if (element.frameId) {
      _elementsToRemove.set(element.id, element);
      const arr = toRemoveElementsByFrame.get(element.frameId) || [];
      arr.push(element);
      const boundTextElement = getBoundTextElement(element, elementsMap);
      if (boundTextElement) {
        _elementsToRemove.set(boundTextElement.id, boundTextElement);
        arr.push(boundTextElement);
      }
      toRemoveElementsByFrame.set(element.frameId, arr);
    }
  }
  for (const [, element] of _elementsToRemove) {
    mutateElement(element, elementsMap, {
      frameId: null
    });
  }
};
var removeAllElementsFromFrame = (allElements, frame) => {
  const elementsInFrame = getFrameChildren(allElements, frame.id);
  removeElementsFromFrame(elementsInFrame, arrayToMap5(allElements));
  return allElements;
};
var replaceAllElementsInFrame = (allElements, nextElementsInFrame, frame, app) => {
  return addElementsToFrame(
    removeAllElementsFromFrame(allElements, frame),
    nextElementsInFrame,
    frame,
    app.state
  ).slice();
};
var updateFrameMembershipOfSelectedElements = (allElements, appState, app) => {
  const selectedElements = app.scene.getSelectedElements({
    selectedElementIds: appState.selectedElementIds,
    // supplying elements explicitly in case we're passed non-state elements
    elements: allElements
  });
  const elementsToFilter = new Set(selectedElements);
  if (appState.editingGroupId) {
    for (const element of selectedElements) {
      if (element.groupIds.length === 0) {
        elementsToFilter.add(element);
      } else {
        element.groupIds.flatMap((gid) => getElementsInGroup(allElements, gid)).forEach((element2) => elementsToFilter.add(element2));
      }
    }
  }
  const elementsToRemove = /* @__PURE__ */ new Set();
  const elementsMap = arrayToMap5(allElements);
  elementsToFilter.forEach((element) => {
    if (element.frameId && !isFrameLikeElement(element) && !isElementInFrame(element, elementsMap, appState)) {
      elementsToRemove.add(element);
    }
  });
  if (elementsToRemove.size > 0) {
    removeElementsFromFrame(elementsToRemove, elementsMap);
  }
  return allElements;
};
var omitGroupsContainingFrameLikes = (allElements, selectedElements) => {
  const uniqueGroupIds = /* @__PURE__ */ new Set();
  const elements = selectedElements || allElements;
  for (const el of elements.values()) {
    const topMostGroupId = el.groupIds[el.groupIds.length - 1];
    if (topMostGroupId) {
      uniqueGroupIds.add(topMostGroupId);
    }
  }
  const rejectedGroupIds = /* @__PURE__ */ new Set();
  for (const groupId of uniqueGroupIds) {
    if (getElementsInGroup(allElements, groupId).some(
      (el) => isFrameLikeElement(el)
    )) {
      rejectedGroupIds.add(groupId);
    }
  }
  const ret = [];
  for (const element of elements.values()) {
    if (!rejectedGroupIds.has(element.groupIds[element.groupIds.length - 1])) {
      ret.push(element);
    }
  }
  return ret;
};
var getTargetFrame = (element, elementsMap, appState) => {
  const _element = isTextElement(element) ? getContainerElement(element, elementsMap) || element : element;
  if (_element.frameId && appState.selectedElementIds[_element.id] && appState.selectedElementIds[_element.frameId]) {
    return getContainingFrame(_element, elementsMap);
  }
  return appState.selectedElementIds[_element.id] && appState.selectedElementsAreBeingDragged ? appState.frameToHighlight : getContainingFrame(_element, elementsMap);
};
var isElementInFrame = (element, allElementsMap, appState, opts) => {
  const frame = opts?.targetFrame ?? getTargetFrame(element, allElementsMap, appState);
  if (!frame) {
    return false;
  }
  const _element = isTextElement(element) ? getContainerElement(element, allElementsMap) || element : element;
  const setGroupsInFrame = (isInFrame) => {
    if (opts?.checkedGroups) {
      _element.groupIds.forEach((groupId) => {
        opts.checkedGroups?.set(groupId, isInFrame);
      });
    }
  };
  if (
    // if the element is not selected, or it is selected but not being dragged,
    // frame membership won't update, so return true
    !appState.selectedElementIds[_element.id] || !appState.selectedElementsAreBeingDragged || // if both frame and element are selected, won't update membership, so return true
    appState.selectedElementIds[_element.id] && appState.selectedElementIds[frame.id]
  ) {
    return true;
  }
  if (_element.groupIds.length === 0) {
    return elementOverlapsWithFrame(_element, frame, allElementsMap);
  }
  for (const gid of _element.groupIds) {
    if (opts?.checkedGroups?.has(gid)) {
      return opts.checkedGroups.get(gid);
    }
  }
  const allElementsInGroup = new Set(
    _element.groupIds.filter((gid) => {
      if (opts?.checkedGroups) {
        return !opts.checkedGroups.has(gid);
      }
      return true;
    }).flatMap((gid) => getElementsInGroup(allElementsMap, gid))
  );
  if (appState.editingGroupId && appState.selectedElementsAreBeingDragged) {
    const selectedElements = new Set(
      getSelectedElements(allElementsMap, appState)
    );
    const editingGroupOverlapsFrame = appState.frameToHighlight !== null;
    if (editingGroupOverlapsFrame) {
      return true;
    }
    selectedElements.forEach((selectedElement) => {
      allElementsInGroup.delete(selectedElement);
    });
  }
  for (const elementInGroup of allElementsInGroup) {
    if (isFrameLikeElement(elementInGroup)) {
      setGroupsInFrame(false);
      return false;
    }
  }
  for (const elementInGroup of allElementsInGroup) {
    if (elementOverlapsWithFrame(elementInGroup, frame, allElementsMap)) {
      setGroupsInFrame(true);
      return true;
    }
  }
  return false;
};
var shouldApplyFrameClip = (element, frame, appState, elementsMap, checkedGroups) => {
  if (!appState.frameRendering || !appState.frameRendering.clip) {
    return false;
  }
  const shouldClipElementItself = isElementIntersectingFrame(element, frame, elementsMap) || isElementContainingFrame(element, frame, elementsMap);
  if (shouldClipElementItself) {
    for (const groupId of element.groupIds) {
      checkedGroups?.set(groupId, true);
    }
    return true;
  }
  if (!shouldClipElementItself && element.groupIds.length > 0 && !elementsAreInFrameBounds([element], frame, elementsMap)) {
    let shouldClip = false;
    if (!appState.selectedElementsAreBeingDragged) {
      shouldClip = element.frameId === frame.id;
      for (const groupId of element.groupIds) {
        checkedGroups?.set(groupId, shouldClip);
      }
    } else {
      shouldClip = isElementInFrame(element, elementsMap, appState, {
        targetFrame: frame,
        checkedGroups
      });
    }
    for (const groupId of element.groupIds) {
      checkedGroups?.set(groupId, shouldClip);
    }
    return shouldClip;
  }
  return false;
};
var DEFAULT_FRAME_NAME = "Frame";
var DEFAULT_AI_FRAME_NAME = "AI Frame";
var getDefaultFrameName = (element) => {
  return isFrameElement(element) ? DEFAULT_FRAME_NAME : DEFAULT_AI_FRAME_NAME;
};
var getFrameLikeTitle = (element) => {
  return element.name === null ? getDefaultFrameName(element) : element.name;
};
var getElementsOverlappingFrame = (elements, frame) => {
  return elementsOverlappingBBox({
    elements,
    bounds: frame,
    type: "overlap"
  }).filter((el) => !el.frameId || el.frameId === frame.id);
};
var frameAndChildrenSelectedTogether = (selectedElements) => {
  const selectedElementsMap = arrayToMap5(selectedElements);
  return selectedElements.length > 1 && selectedElements.some(
    (element) => element.frameId && selectedElementsMap.has(element.frameId)
  );
};

// src/renderElement.ts
var IMAGE_INVERT_FILTER = "invert(100%) hue-rotate(180deg) saturate(1.25)";
var isPendingImageElement = (element, renderConfig) => isInitializedImageElement(element) && !renderConfig.imageCache.has(element.fileId);
var shouldResetImageFilter = (element, renderConfig, appState) => {
  return appState.theme === THEME.DARK && isInitializedImageElement(element) && !isPendingImageElement(element, renderConfig) && renderConfig.imageCache.get(element.fileId)?.mimeType !== MIME_TYPES.svg;
};
var getCanvasPadding = (element) => {
  switch (element.type) {
    case "freedraw":
      return element.strokeWidth * 12;
    case "text":
      return element.fontSize / 2;
    default:
      return 20;
  }
};
var getRenderOpacity = (element, containingFrame, elementsPendingErasure, pendingNodes, globalAlpha = 1) => {
  let opacity = (containingFrame?.opacity ?? 100) * element.opacity / 1e4 * globalAlpha;
  if (elementsPendingErasure.has(element.id) || pendingNodes && pendingNodes.some((node) => node.id === element.id) || containingFrame && elementsPendingErasure.has(containingFrame.id)) {
    opacity *= ELEMENT_READY_TO_ERASE_OPACITY / 100;
  }
  return opacity;
};
var cappedElementCanvasSize = (element, elementsMap, zoom) => {
  const AREA_LIMIT = 16777216;
  const WIDTH_HEIGHT_LIMIT = 32767;
  const padding = getCanvasPadding(element);
  const [x1, y1, x2, y2] = getElementAbsoluteCoords2(element, elementsMap);
  const elementWidth = isLinearElement(element) || isFreeDrawElement(element) ? distance2(x1, x2) : element.width;
  const elementHeight = isLinearElement(element) || isFreeDrawElement(element) ? distance2(y1, y2) : element.height;
  let width = elementWidth * window.devicePixelRatio + padding * 2;
  let height = elementHeight * window.devicePixelRatio + padding * 2;
  let scale = zoom.value;
  if (width * scale > WIDTH_HEIGHT_LIMIT || height * scale > WIDTH_HEIGHT_LIMIT) {
    scale = Math.min(WIDTH_HEIGHT_LIMIT / width, WIDTH_HEIGHT_LIMIT / height);
  }
  if (width * height * scale * scale > AREA_LIMIT) {
    scale = Math.sqrt(AREA_LIMIT / (width * height));
  }
  width = Math.floor(width * scale);
  height = Math.floor(height * scale);
  return { width, height, scale };
};
var generateElementCanvas = (element, elementsMap, zoom, renderConfig, appState) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const padding = getCanvasPadding(element);
  const { width, height, scale } = cappedElementCanvasSize(
    element,
    elementsMap,
    zoom
  );
  if (!width || !height) {
    return null;
  }
  canvas.width = width;
  canvas.height = height;
  let canvasOffsetX = -100;
  let canvasOffsetY = 0;
  if (isLinearElement(element) || isFreeDrawElement(element)) {
    const [x1, y1] = getElementAbsoluteCoords2(element, elementsMap);
    canvasOffsetX = element.x > x1 ? distance2(element.x, x1) * window.devicePixelRatio * scale : 0;
    canvasOffsetY = element.y > y1 ? distance2(element.y, y1) * window.devicePixelRatio * scale : 0;
    context.translate(canvasOffsetX, canvasOffsetY);
  }
  context.save();
  context.translate(padding * scale, padding * scale);
  context.scale(
    window.devicePixelRatio * scale,
    window.devicePixelRatio * scale
  );
  const rc = rough_default.canvas(canvas);
  if (shouldResetImageFilter(element, renderConfig, appState)) {
    context.filter = IMAGE_INVERT_FILTER;
  }
  drawElementOnCanvas(element, rc, context, renderConfig, appState);
  context.restore();
  const boundTextElement = getBoundTextElement(element, elementsMap);
  const boundTextCanvas = document.createElement("canvas");
  const boundTextCanvasContext = boundTextCanvas.getContext("2d");
  if (isArrowElement(element) && boundTextElement) {
    const [x1, y1, x2, y2] = getElementAbsoluteCoords2(element, elementsMap);
    const maxDim = Math.max(distance2(x1, x2), distance2(y1, y2));
    boundTextCanvas.width = maxDim * window.devicePixelRatio * scale + padding * scale * 10;
    boundTextCanvas.height = maxDim * window.devicePixelRatio * scale + padding * scale * 10;
    boundTextCanvasContext.translate(
      boundTextCanvas.width / 2,
      boundTextCanvas.height / 2
    );
    boundTextCanvasContext.rotate(element.angle);
    boundTextCanvasContext.drawImage(
      canvas,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );
    const [, , , , boundTextCx, boundTextCy] = getElementAbsoluteCoords2(
      boundTextElement,
      elementsMap
    );
    boundTextCanvasContext.rotate(-element.angle);
    const offsetX = (boundTextCanvas.width - canvas.width) / 2;
    const offsetY = (boundTextCanvas.height - canvas.height) / 2;
    const shiftX = boundTextCanvas.width / 2 - (boundTextCx - x1) * window.devicePixelRatio * scale - offsetX - padding * scale;
    const shiftY = boundTextCanvas.height / 2 - (boundTextCy - y1) * window.devicePixelRatio * scale - offsetY - padding * scale;
    boundTextCanvasContext.translate(-shiftX, -shiftY);
    boundTextCanvasContext.clearRect(
      -(boundTextElement.width / 2 + BOUND_TEXT_PADDING3) * window.devicePixelRatio * scale,
      -(boundTextElement.height / 2 + BOUND_TEXT_PADDING3) * window.devicePixelRatio * scale,
      (boundTextElement.width + BOUND_TEXT_PADDING3 * 2) * window.devicePixelRatio * scale,
      (boundTextElement.height + BOUND_TEXT_PADDING3 * 2) * window.devicePixelRatio * scale
    );
  }
  return {
    element,
    canvas,
    theme: appState.theme,
    scale,
    zoomValue: zoom.value,
    canvasOffsetX,
    canvasOffsetY,
    boundTextElementVersion: getBoundTextElement(element, elementsMap)?.version || null,
    containingFrameOpacity: getContainingFrame(element, elementsMap)?.opacity || 100,
    boundTextCanvas,
    angle: element.angle,
    imageCrop: isImageElement(element) ? element.crop : null
  };
};
var DEFAULT_LINK_SIZE = 14;
var IMAGE_PLACEHOLDER_IMG = typeof document !== "undefined" ? document.createElement("img") : { src: "" };
IMAGE_PLACEHOLDER_IMG.src = `data:${MIME_TYPES.svg},${encodeURIComponent(
  `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="image" class="svg-inline--fa fa-image fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#888" d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"></path></svg>`
)}`;
var IMAGE_ERROR_PLACEHOLDER_IMG = typeof document !== "undefined" ? document.createElement("img") : { src: "" };
IMAGE_ERROR_PLACEHOLDER_IMG.src = `data:${MIME_TYPES.svg},${encodeURIComponent(
  `<svg viewBox="0 0 668 668" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"><path d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48ZM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56ZM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48Z" style="fill:#888;fill-rule:nonzero" transform="matrix(.81709 0 0 .81709 124.825 145.825)"/><path d="M256 8C119.034 8 8 119.033 8 256c0 136.967 111.034 248 248 248s248-111.034 248-248S392.967 8 256 8Zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676ZM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676Z" style="fill:#888;fill-rule:nonzero" transform="matrix(.30366 0 0 .30366 506.822 60.065)"/></svg>`
)}`;
var drawImagePlaceholder = (element, context) => {
  context.fillStyle = "#E7E7E7";
  context.fillRect(0, 0, element.width, element.height);
  const imageMinWidthOrHeight = Math.min(element.width, element.height);
  const size = Math.min(
    imageMinWidthOrHeight,
    Math.min(imageMinWidthOrHeight * 0.4, 100)
  );
  context.drawImage(
    element.status === "error" ? IMAGE_ERROR_PLACEHOLDER_IMG : IMAGE_PLACEHOLDER_IMG,
    element.width / 2 - size / 2,
    element.height / 2 - size / 2,
    size,
    size
  );
};
var drawElementOnCanvas = (element, rc, context, renderConfig, appState) => {
  switch (element.type) {
    case "rectangle":
    case "iframe":
    case "embeddable":
    case "diamond":
    case "ellipse": {
      context.lineJoin = "round";
      context.lineCap = "round";
      rc.draw(ShapeCache.get(element));
      break;
    }
    case "arrow":
    case "line": {
      context.lineJoin = "round";
      context.lineCap = "round";
      ShapeCache.get(element).forEach((shape) => {
        rc.draw(shape);
      });
      break;
    }
    case "freedraw": {
      context.save();
      context.fillStyle = element.strokeColor;
      const path = getFreeDrawPath2D(element);
      const fillShape = ShapeCache.get(element);
      if (fillShape) {
        rc.draw(fillShape);
      }
      context.fillStyle = element.strokeColor;
      context.fill(path);
      context.restore();
      break;
    }
    case "image": {
      const img = isInitializedImageElement(element) ? renderConfig.imageCache.get(element.fileId)?.image : void 0;
      if (img != null && !(img instanceof Promise)) {
        if (element.roundness && context.roundRect) {
          context.beginPath();
          context.roundRect(
            0,
            0,
            element.width,
            element.height,
            getCornerRadius(Math.min(element.width, element.height), element)
          );
          context.clip();
        }
        const { x, y, width, height } = element.crop ? element.crop : {
          x: 0,
          y: 0,
          width: img.naturalWidth,
          height: img.naturalHeight
        };
        context.drawImage(
          img,
          x,
          y,
          width,
          height,
          0,
          0,
          element.width,
          element.height
        );
      } else {
        drawImagePlaceholder(element, context);
      }
      break;
    }
    default: {
      if (isTextElement(element)) {
        const rtl = isRTL(element.text);
        const shouldTemporarilyAttach = rtl && !context.canvas.isConnected;
        if (shouldTemporarilyAttach) {
          document.body.appendChild(context.canvas);
        }
        context.canvas.setAttribute("dir", rtl ? "rtl" : "ltr");
        context.save();
        context.font = getFontString3(element);
        context.fillStyle = element.strokeColor;
        context.textAlign = element.textAlign;
        const lines = element.text.replace(/\r\n?/g, "\n").split("\n");
        const horizontalOffset = element.textAlign === "center" ? element.width / 2 : element.textAlign === "right" ? element.width : 0;
        const lineHeightPx = getLineHeightInPx(
          element.fontSize,
          element.lineHeight
        );
        const verticalOffset = getVerticalOffset(
          element.fontFamily,
          element.fontSize,
          lineHeightPx
        );
        for (let index = 0; index < lines.length; index++) {
          context.fillText(
            lines[index],
            horizontalOffset,
            index * lineHeightPx + verticalOffset
          );
        }
        context.restore();
        if (shouldTemporarilyAttach) {
          context.canvas.remove();
        }
      } else {
        throw new Error(`Unimplemented type ${element.type}`);
      }
    }
  }
};
var elementWithCanvasCache = /* @__PURE__ */ new WeakMap();
var generateElementWithCanvas = (element, elementsMap, renderConfig, appState) => {
  const zoom = renderConfig ? appState.zoom : {
    value: 1
  };
  const prevElementWithCanvas = elementWithCanvasCache.get(element);
  const shouldRegenerateBecauseZoom = prevElementWithCanvas && prevElementWithCanvas.zoomValue !== zoom.value && !appState?.shouldCacheIgnoreZoom;
  const boundTextElement = getBoundTextElement(element, elementsMap);
  const boundTextElementVersion = boundTextElement?.version || null;
  const imageCrop = isImageElement(element) ? element.crop : null;
  const containingFrameOpacity = getContainingFrame(element, elementsMap)?.opacity || 100;
  if (!prevElementWithCanvas || shouldRegenerateBecauseZoom || prevElementWithCanvas.theme !== appState.theme || prevElementWithCanvas.boundTextElementVersion !== boundTextElementVersion || prevElementWithCanvas.imageCrop !== imageCrop || prevElementWithCanvas.containingFrameOpacity !== containingFrameOpacity || // since we rotate the canvas when copying from cached canvas, we don't
  // regenerate the cached canvas. But we need to in case of labels which are
  // cached alongside the arrow, and we want the labels to remain unrotated
  // with respect to the arrow.
  isArrowElement(element) && boundTextElement && element.angle !== prevElementWithCanvas.angle) {
    const elementWithCanvas = generateElementCanvas(
      element,
      elementsMap,
      zoom,
      renderConfig,
      appState
    );
    if (!elementWithCanvas) {
      return null;
    }
    elementWithCanvasCache.set(element, elementWithCanvas);
    return elementWithCanvas;
  }
  return prevElementWithCanvas;
};
var drawElementFromCanvas = (elementWithCanvas, context, renderConfig, appState, allElementsMap) => {
  const element = elementWithCanvas.element;
  const padding = getCanvasPadding(element);
  const zoom = elementWithCanvas.scale;
  const [x1, y1, x2, y2] = getElementAbsoluteCoords2(element, allElementsMap);
  const cx = ((x1 + x2) / 2 + appState.scrollX) * window.devicePixelRatio;
  const cy = ((y1 + y2) / 2 + appState.scrollY) * window.devicePixelRatio;
  context.save();
  context.scale(1 / window.devicePixelRatio, 1 / window.devicePixelRatio);
  const boundTextElement = getBoundTextElement(element, allElementsMap);
  if (isArrowElement(element) && boundTextElement) {
    const offsetX = (elementWithCanvas.boundTextCanvas.width - elementWithCanvas.canvas.width) / 2;
    const offsetY = (elementWithCanvas.boundTextCanvas.height - elementWithCanvas.canvas.height) / 2;
    context.translate(cx, cy);
    context.drawImage(
      elementWithCanvas.boundTextCanvas,
      -(x2 - x1) / 2 * window.devicePixelRatio - offsetX / zoom - padding,
      -(y2 - y1) / 2 * window.devicePixelRatio - offsetY / zoom - padding,
      elementWithCanvas.boundTextCanvas.width / zoom,
      elementWithCanvas.boundTextCanvas.height / zoom
    );
  } else {
    context.translate(cx, cy);
    context.rotate(element.angle);
    if ("scale" in elementWithCanvas.element && !isPendingImageElement(element, renderConfig)) {
      context.scale(
        elementWithCanvas.element.scale[0],
        elementWithCanvas.element.scale[1]
      );
    }
    context.translate(-cx, -cy);
    context.drawImage(
      elementWithCanvas.canvas,
      (x1 + appState.scrollX) * window.devicePixelRatio - padding * elementWithCanvas.scale / elementWithCanvas.scale,
      (y1 + appState.scrollY) * window.devicePixelRatio - padding * elementWithCanvas.scale / elementWithCanvas.scale,
      elementWithCanvas.canvas.width / elementWithCanvas.scale,
      elementWithCanvas.canvas.height / elementWithCanvas.scale
    );
    if (define_import_meta_env_default.VITE_APP_DEBUG_ENABLE_TEXT_CONTAINER_BOUNDING_BOX === "true" && hasBoundTextElement(element)) {
      const textElement = getBoundTextElement(
        element,
        allElementsMap
      );
      const coords = getContainerCoords(element);
      context.strokeStyle = "#c92a2a";
      context.lineWidth = 3;
      context.strokeRect(
        (coords.x + appState.scrollX) * window.devicePixelRatio,
        (coords.y + appState.scrollY) * window.devicePixelRatio,
        getBoundTextMaxWidth(element, textElement) * window.devicePixelRatio,
        getBoundTextMaxHeight(element, textElement) * window.devicePixelRatio
      );
    }
  }
  context.restore();
};
var renderSelectionElement = (element, context, appState, selectionColor) => {
  context.save();
  context.translate(element.x + appState.scrollX, element.y + appState.scrollY);
  context.fillStyle = "rgba(0, 0, 200, 0.04)";
  const offset = 0.5 / appState.zoom.value;
  context.fillRect(offset, offset, element.width, element.height);
  context.lineWidth = 1 / appState.zoom.value;
  context.strokeStyle = selectionColor;
  context.strokeRect(offset, offset, element.width, element.height);
  context.restore();
};
var renderElement = (element, elementsMap, allElementsMap, rc, context, renderConfig, appState) => {
  const reduceAlphaForSelection = appState.openDialog?.name === "elementLinkSelector" && !appState.selectedElementIds[element.id] && !appState.hoveredElementIds[element.id];
  context.globalAlpha = getRenderOpacity(
    element,
    getContainingFrame(element, elementsMap),
    renderConfig.elementsPendingErasure,
    renderConfig.pendingFlowchartNodes,
    reduceAlphaForSelection ? DEFAULT_REDUCED_GLOBAL_ALPHA : 1
  );
  switch (element.type) {
    case "magicframe":
    case "frame": {
      if (appState.frameRendering.enabled && appState.frameRendering.outline) {
        context.save();
        context.translate(
          element.x + appState.scrollX,
          element.y + appState.scrollY
        );
        context.fillStyle = "rgba(0, 0, 200, 0.04)";
        context.lineWidth = FRAME_STYLE.strokeWidth / appState.zoom.value;
        context.strokeStyle = FRAME_STYLE.strokeColor;
        if (isMagicFrameElement(element)) {
          context.strokeStyle = appState.theme === THEME.LIGHT ? "#7affd7" : "#1d8264";
        }
        if (FRAME_STYLE.radius && context.roundRect) {
          context.beginPath();
          context.roundRect(
            0,
            0,
            element.width,
            element.height,
            FRAME_STYLE.radius / appState.zoom.value
          );
          context.stroke();
          context.closePath();
        } else {
          context.strokeRect(0, 0, element.width, element.height);
        }
        context.restore();
      }
      break;
    }
    case "freedraw": {
      ShapeCache.generateElementShape(element, null);
      if (renderConfig.isExporting) {
        const [x1, y1, x2, y2] = getElementAbsoluteCoords2(element, elementsMap);
        const cx = (x1 + x2) / 2 + appState.scrollX;
        const cy = (y1 + y2) / 2 + appState.scrollY;
        const shiftX = (x2 - x1) / 2 - (element.x - x1);
        const shiftY = (y2 - y1) / 2 - (element.y - y1);
        context.save();
        context.translate(cx, cy);
        context.rotate(element.angle);
        context.translate(-shiftX, -shiftY);
        drawElementOnCanvas(element, rc, context, renderConfig, appState);
        context.restore();
      } else {
        const elementWithCanvas = generateElementWithCanvas(
          element,
          allElementsMap,
          renderConfig,
          appState
        );
        if (!elementWithCanvas) {
          return;
        }
        drawElementFromCanvas(
          elementWithCanvas,
          context,
          renderConfig,
          appState,
          allElementsMap
        );
      }
      break;
    }
    case "rectangle":
    case "diamond":
    case "ellipse":
    case "line":
    case "arrow":
    case "image":
    case "text":
    case "iframe":
    case "embeddable": {
      ShapeCache.generateElementShape(element, renderConfig);
      if (renderConfig.isExporting) {
        const [x1, y1, x2, y2] = getElementAbsoluteCoords2(element, elementsMap);
        const cx = (x1 + x2) / 2 + appState.scrollX;
        const cy = (y1 + y2) / 2 + appState.scrollY;
        let shiftX = (x2 - x1) / 2 - (element.x - x1);
        let shiftY = (y2 - y1) / 2 - (element.y - y1);
        if (isTextElement(element)) {
          const container = getContainerElement(element, elementsMap);
          if (isArrowElement(container)) {
            const boundTextCoords = LinearElementEditor.getBoundTextElementPosition(
              container,
              element,
              elementsMap
            );
            shiftX = (x2 - x1) / 2 - (boundTextCoords.x - x1);
            shiftY = (y2 - y1) / 2 - (boundTextCoords.y - y1);
          }
        }
        context.save();
        context.translate(cx, cy);
        if (shouldResetImageFilter(element, renderConfig, appState)) {
          context.filter = "none";
        }
        const boundTextElement = getBoundTextElement(element, elementsMap);
        if (isArrowElement(element) && boundTextElement) {
          const tempCanvas = document.createElement("canvas");
          const tempCanvasContext = tempCanvas.getContext("2d");
          const maxDim = Math.max(distance2(x1, x2), distance2(y1, y2));
          const padding = getCanvasPadding(element);
          tempCanvas.width = maxDim * appState.exportScale + padding * 10 * appState.exportScale;
          tempCanvas.height = maxDim * appState.exportScale + padding * 10 * appState.exportScale;
          tempCanvasContext.translate(
            tempCanvas.width / 2,
            tempCanvas.height / 2
          );
          tempCanvasContext.scale(appState.exportScale, appState.exportScale);
          shiftX = element.width / 2 - (element.x - x1);
          shiftY = element.height / 2 - (element.y - y1);
          tempCanvasContext.rotate(element.angle);
          const tempRc = rough_default.canvas(tempCanvas);
          tempCanvasContext.translate(-shiftX, -shiftY);
          drawElementOnCanvas(
            element,
            tempRc,
            tempCanvasContext,
            renderConfig,
            appState
          );
          tempCanvasContext.translate(shiftX, shiftY);
          tempCanvasContext.rotate(-element.angle);
          const [, , , , boundTextCx, boundTextCy] = getElementAbsoluteCoords2(
            boundTextElement,
            elementsMap
          );
          const boundTextShiftX = (x1 + x2) / 2 - boundTextCx;
          const boundTextShiftY = (y1 + y2) / 2 - boundTextCy;
          tempCanvasContext.translate(-boundTextShiftX, -boundTextShiftY);
          tempCanvasContext.clearRect(
            -boundTextElement.width / 2,
            -boundTextElement.height / 2,
            boundTextElement.width,
            boundTextElement.height
          );
          context.scale(1 / appState.exportScale, 1 / appState.exportScale);
          context.drawImage(
            tempCanvas,
            -tempCanvas.width / 2,
            -tempCanvas.height / 2,
            tempCanvas.width,
            tempCanvas.height
          );
        } else {
          context.rotate(element.angle);
          if (element.type === "image") {
            context.scale(element.scale[0], element.scale[1]);
          }
          context.translate(-shiftX, -shiftY);
          drawElementOnCanvas(element, rc, context, renderConfig, appState);
        }
        context.restore();
      } else {
        const elementWithCanvas = generateElementWithCanvas(
          element,
          allElementsMap,
          renderConfig,
          appState
        );
        if (!elementWithCanvas) {
          return;
        }
        const currentImageSmoothingStatus = context.imageSmoothingEnabled;
        if (
          // do not disable smoothing during zoom as blurry shapes look better
          // on low resolution (while still zooming in) than sharp ones
          !appState?.shouldCacheIgnoreZoom && // angle is 0 -> always disable smoothing
          (!element.angle || // or check if angle is a right angle in which case we can still
          // disable smoothing without adversely affecting the result
          // We need less-than comparison because of FP artihmetic
          isRightAngleRads(element.angle))
        ) {
          context.imageSmoothingEnabled = false;
        }
        if (element.id === appState.croppingElementId && isImageElement(elementWithCanvas.element) && elementWithCanvas.element.crop !== null) {
          context.save();
          context.globalAlpha = 0.1;
          const uncroppedElementCanvas = generateElementCanvas(
            getUncroppedImageElement(elementWithCanvas.element, elementsMap),
            allElementsMap,
            appState.zoom,
            renderConfig,
            appState
          );
          if (uncroppedElementCanvas) {
            drawElementFromCanvas(
              uncroppedElementCanvas,
              context,
              renderConfig,
              appState,
              allElementsMap
            );
          }
          context.restore();
        }
        drawElementFromCanvas(
          elementWithCanvas,
          context,
          renderConfig,
          appState,
          allElementsMap
        );
        context.imageSmoothingEnabled = currentImageSmoothingStatus;
      }
      break;
    }
    default: {
      throw new Error(`Unimplemented type ${element.type}`);
    }
  }
  context.globalAlpha = 1;
};
var pathsCache = /* @__PURE__ */ new WeakMap([]);
function generateFreeDrawShape(element) {
  const svgPathData = getFreeDrawSvgPath(element);
  const path = new Path2D(svgPathData);
  pathsCache.set(element, path);
  return path;
}
function getFreeDrawPath2D(element) {
  return pathsCache.get(element);
}
function getFreeDrawSvgPath(element) {
  const inputPoints = element.simulatePressure ? element.points : element.points.length ? element.points.map(([x, y], i) => [x, y, element.pressures[i]]) : [[0, 0, 0.5]];
  const options = {
    simulatePressure: element.simulatePressure,
    size: element.strokeWidth * 4.25,
    thinning: 0.6,
    smoothing: 0.5,
    streamline: 0.5,
    easing: (t) => Math.sin(t * Math.PI / 2),
    // https://easings.net/#easeOutSine
    last: !!element.lastCommittedPoint
    // LastCommittedPoint is added on pointerup
  };
  return getSvgPathFromStroke(ae(inputPoints, options));
}
function med(A2, B2) {
  return [(A2[0] + B2[0]) / 2, (A2[1] + B2[1]) / 2];
}
var TO_FIXED_PRECISION = /(\s?[A-Z]?,?-?[0-9]*\.[0-9]{0,2})(([0-9]|e|-)*)/g;
function getSvgPathFromStroke(points) {
  if (!points.length) {
    return "";
  }
  const max = points.length - 1;
  return points.reduce(
    (acc, point, i, arr) => {
      if (i === max) {
        acc.push(point, med(point, arr[0]), "L", arr[0], "Z");
      } else {
        acc.push(point, med(point, arr[i + 1]));
      }
      return acc;
    },
    ["M", points[0], "Q"]
  ).join(" ").replace(TO_FIXED_PRECISION, "$1");
}

// src/comparisons.ts
init_define_import_meta_env();
var hasBackground = (type) => type === "rectangle" || type === "iframe" || type === "embeddable" || type === "ellipse" || type === "diamond" || type === "line" || type === "freedraw";
var hasStrokeColor = (type) => type !== "image" && type !== "frame" && type !== "magicframe";
var hasStrokeWidth = (type) => type === "rectangle" || type === "iframe" || type === "embeddable" || type === "ellipse" || type === "diamond" || type === "freedraw" || type === "arrow" || type === "line";
var hasStrokeStyle = (type) => type === "rectangle" || type === "iframe" || type === "embeddable" || type === "ellipse" || type === "diamond" || type === "arrow" || type === "line";
var canChangeRoundness = (type) => type === "rectangle" || type === "iframe" || type === "embeddable" || type === "line" || type === "diamond" || type === "image";
var toolIsArrow = (type) => type === "arrow";
var canHaveArrowheads = (type) => type === "arrow";

// src/shape.ts
var ShapeCache = class _ShapeCache {
  static rg = new RoughGenerator();
  static cache = /* @__PURE__ */ new WeakMap();
  /**
   * Retrieves shape from cache if available. Use this only if shape
   * is optional and you have a fallback in case it's not cached.
   */
  static get = (element) => {
    return _ShapeCache.cache.get(
      element
    );
  };
  static set = (element, shape) => _ShapeCache.cache.set(element, shape);
  static delete = (element) => _ShapeCache.cache.delete(element);
  static destroy = () => {
    _ShapeCache.cache = /* @__PURE__ */ new WeakMap();
  };
  /**
   * Generates & caches shape for element if not already cached, otherwise
   * returns cached shape.
   */
  static generateElementShape = (element, renderConfig) => {
    const cachedShape = renderConfig?.isExporting ? void 0 : _ShapeCache.get(element);
    if (cachedShape !== void 0) {
      return cachedShape;
    }
    elementWithCanvasCache.delete(element);
    const shape = generateElementShape(
      element,
      _ShapeCache.rg,
      renderConfig || {
        isExporting: false,
        canvasBackgroundColor: COLOR_PALETTE.white,
        embedsValidationStatus: null
      }
    );
    _ShapeCache.cache.set(element, shape);
    return shape;
  };
};
var getDashArrayDashed = (strokeWidth) => [8, 8 + strokeWidth];
var getDashArrayDotted = (strokeWidth) => [1.5, 6 + strokeWidth];
function adjustRoughness(element) {
  const roughness = element.roughness;
  const maxSize = Math.max(element.width, element.height);
  const minSize = Math.min(element.width, element.height);
  if (
    // both sides relatively big
    minSize >= 20 && maxSize >= 50 || // is round & both sides above 15px
    minSize >= 15 && !!element.roundness && canChangeRoundness(element.type) || // relatively long linear element
    isLinearElement(element) && maxSize >= 50
  ) {
    return roughness;
  }
  return Math.min(roughness / (maxSize < 10 ? 3 : 2), 2.5);
}
var generateRoughOptions = (element, continuousPath = false) => {
  const options = {
    seed: element.seed,
    strokeLineDash: element.strokeStyle === "dashed" ? getDashArrayDashed(element.strokeWidth) : element.strokeStyle === "dotted" ? getDashArrayDotted(element.strokeWidth) : void 0,
    // for non-solid strokes, disable multiStroke because it tends to make
    // dashes/dots overlay each other
    disableMultiStroke: element.strokeStyle !== "solid",
    // for non-solid strokes, increase the width a bit to make it visually
    // similar to solid strokes, because we're also disabling multiStroke
    strokeWidth: element.strokeStyle !== "solid" ? element.strokeWidth + 0.5 : element.strokeWidth,
    // when increasing strokeWidth, we must explicitly set fillWeight and
    // hachureGap because if not specified, roughjs uses strokeWidth to
    // calculate them (and we don't want the fills to be modified)
    fillWeight: element.strokeWidth / 2,
    hachureGap: element.strokeWidth * 4,
    roughness: adjustRoughness(element),
    stroke: element.strokeColor,
    preserveVertices: continuousPath || element.roughness < ROUGHNESS.cartoonist
  };
  switch (element.type) {
    case "rectangle":
    case "iframe":
    case "embeddable":
    case "diamond":
    case "ellipse": {
      options.fillStyle = element.fillStyle;
      options.fill = isTransparent2(element.backgroundColor) ? void 0 : element.backgroundColor;
      if (element.type === "ellipse") {
        options.curveFitting = 1;
      }
      return options;
    }
    case "line":
    case "freedraw": {
      if (isPathALoop(element.points)) {
        options.fillStyle = element.fillStyle;
        options.fill = element.backgroundColor === "transparent" ? void 0 : element.backgroundColor;
      }
      return options;
    }
    case "arrow":
      return options;
    default: {
      throw new Error(`Unimplemented type ${element.type}`);
    }
  }
};
var modifyIframeLikeForRoughOptions = (element, isExporting, embedsValidationStatus) => {
  if (isIframeLikeElement(element) && (isExporting || isEmbeddableElement(element) && embedsValidationStatus?.get(element.id) !== true) && isTransparent2(element.backgroundColor) && isTransparent2(element.strokeColor)) {
    return {
      ...element,
      roughness: 0,
      backgroundColor: "#d3d3d3",
      fillStyle: "solid"
    };
  } else if (isIframeElement(element)) {
    return {
      ...element,
      strokeColor: isTransparent2(element.strokeColor) ? "#000000" : element.strokeColor,
      backgroundColor: isTransparent2(element.backgroundColor) ? "#f4f4f6" : element.backgroundColor
    };
  }
  return element;
};
var getArrowheadShapes = (element, shape, position, arrowhead, generator, options, canvasBackgroundColor) => {
  const arrowheadPoints = getArrowheadPoints(
    element,
    shape,
    position,
    arrowhead
  );
  if (arrowheadPoints === null) {
    return [];
  }
  const generateCrowfootOne = (arrowheadPoints2, options2) => {
    if (arrowheadPoints2 === null) {
      return [];
    }
    const [, , x3, y3, x4, y4] = arrowheadPoints2;
    return [generator.line(x3, y3, x4, y4, options2)];
  };
  switch (arrowhead) {
    case "dot":
    case "circle":
    case "circle_outline": {
      const [x, y, diameter] = arrowheadPoints;
      delete options.strokeLineDash;
      return [
        generator.circle(x, y, diameter, {
          ...options,
          fill: arrowhead === "circle_outline" ? canvasBackgroundColor : element.strokeColor,
          fillStyle: "solid",
          stroke: element.strokeColor,
          roughness: Math.min(0.5, options.roughness || 0)
        })
      ];
    }
    case "triangle":
    case "triangle_outline": {
      const [x, y, x2, y2, x3, y3] = arrowheadPoints;
      delete options.strokeLineDash;
      return [
        generator.polygon(
          [
            [x, y],
            [x2, y2],
            [x3, y3],
            [x, y]
          ],
          {
            ...options,
            fill: arrowhead === "triangle_outline" ? canvasBackgroundColor : element.strokeColor,
            fillStyle: "solid",
            roughness: Math.min(1, options.roughness || 0)
          }
        )
      ];
    }
    case "diamond":
    case "diamond_outline": {
      const [x, y, x2, y2, x3, y3, x4, y4] = arrowheadPoints;
      delete options.strokeLineDash;
      return [
        generator.polygon(
          [
            [x, y],
            [x2, y2],
            [x3, y3],
            [x4, y4],
            [x, y]
          ],
          {
            ...options,
            fill: arrowhead === "diamond_outline" ? canvasBackgroundColor : element.strokeColor,
            fillStyle: "solid",
            roughness: Math.min(1, options.roughness || 0)
          }
        )
      ];
    }
    case "crowfoot_one":
      return generateCrowfootOne(arrowheadPoints, options);
    case "bar":
    case "arrow":
    case "crowfoot_many":
    case "crowfoot_one_or_many":
    default: {
      const [x2, y2, x3, y3, x4, y4] = arrowheadPoints;
      if (element.strokeStyle === "dotted") {
        const dash = getDashArrayDotted(element.strokeWidth - 1);
        options.strokeLineDash = [dash[0], dash[1] - 1];
      } else {
        delete options.strokeLineDash;
      }
      options.roughness = Math.min(1, options.roughness || 0);
      return [
        generator.line(x3, y3, x2, y2, options),
        generator.line(x4, y4, x2, y2, options),
        ...arrowhead === "crowfoot_one_or_many" ? generateCrowfootOne(
          getArrowheadPoints(element, shape, position, "crowfoot_one"),
          options
        ) : []
      ];
    }
  }
};
var generateLinearCollisionShape = (element) => {
  const generator = new RoughGenerator();
  const options = {
    seed: element.seed,
    disableMultiStroke: true,
    disableMultiStrokeFill: true,
    roughness: 0,
    preserveVertices: true
  };
  const center = getCenterForBounds(
    // Need a non-rotated center point
    element.points.reduce(
      (acc, point) => {
        return [
          Math.min(element.x + point[0], acc[0]),
          Math.min(element.y + point[1], acc[1]),
          Math.max(element.x + point[0], acc[2]),
          Math.max(element.y + point[1], acc[3])
        ];
      },
      [Infinity, Infinity, -Infinity, -Infinity]
    )
  );
  switch (element.type) {
    case "line":
    case "arrow": {
      const points = element.points.length ? element.points : [pointFrom11(0, 0)];
      if (isElbowArrow(element)) {
        return generator.path(generateElbowArrowShape(points, 16), options).sets[0].ops;
      } else if (!element.roundness) {
        return points.map((point, idx) => {
          const p = pointRotateRads9(
            pointFrom11(element.x + point[0], element.y + point[1]),
            center,
            element.angle
          );
          return {
            op: idx === 0 ? "move" : "lineTo",
            data: pointFrom11(p[0] - element.x, p[1] - element.y)
          };
        });
      }
      return generator.curve(points, options).sets[0].ops.slice(0, element.points.length).map((op, i) => {
        if (i === 0) {
          const p = pointRotateRads9(
            pointFrom11(
              element.x + op.data[0],
              element.y + op.data[1]
            ),
            center,
            element.angle
          );
          return {
            op: "move",
            data: pointFrom11(p[0] - element.x, p[1] - element.y)
          };
        }
        return {
          op: "bcurveTo",
          data: [
            pointRotateRads9(
              pointFrom11(
                element.x + op.data[0],
                element.y + op.data[1]
              ),
              center,
              element.angle
            ),
            pointRotateRads9(
              pointFrom11(
                element.x + op.data[2],
                element.y + op.data[3]
              ),
              center,
              element.angle
            ),
            pointRotateRads9(
              pointFrom11(
                element.x + op.data[4],
                element.y + op.data[5]
              ),
              center,
              element.angle
            )
          ].map(
            (p) => pointFrom11(p[0] - element.x, p[1] - element.y)
          ).flat()
        };
      });
    }
    case "freedraw": {
      if (element.points.length < 2) {
        return [];
      }
      const simplifiedPoints = simplify(
        element.points,
        0.75
      );
      return generator.curve(simplifiedPoints, options).sets[0].ops.slice(0, element.points.length).map((op, i) => {
        if (i === 0) {
          const p = pointRotateRads9(
            pointFrom11(
              element.x + op.data[0],
              element.y + op.data[1]
            ),
            center,
            element.angle
          );
          return {
            op: "move",
            data: pointFrom11(p[0] - element.x, p[1] - element.y)
          };
        }
        return {
          op: "bcurveTo",
          data: [
            pointRotateRads9(
              pointFrom11(
                element.x + op.data[0],
                element.y + op.data[1]
              ),
              center,
              element.angle
            ),
            pointRotateRads9(
              pointFrom11(
                element.x + op.data[2],
                element.y + op.data[3]
              ),
              center,
              element.angle
            ),
            pointRotateRads9(
              pointFrom11(
                element.x + op.data[4],
                element.y + op.data[5]
              ),
              center,
              element.angle
            )
          ].map(
            (p) => pointFrom11(p[0] - element.x, p[1] - element.y)
          ).flat()
        };
      });
    }
  }
};
var generateElementShape = (element, generator, {
  isExporting,
  canvasBackgroundColor,
  embedsValidationStatus
}) => {
  switch (element.type) {
    case "rectangle":
    case "iframe":
    case "embeddable": {
      let shape;
      if (element.roundness) {
        const w = element.width;
        const h = element.height;
        const r = getCornerRadius(Math.min(w, h), element);
        shape = generator.path(
          `M ${r} 0 L ${w - r} 0 Q ${w} 0, ${w} ${r} L ${w} ${h - r} Q ${w} ${h}, ${w - r} ${h} L ${r} ${h} Q 0 ${h}, 0 ${h - r} L 0 ${r} Q 0 0, ${r} 0`,
          generateRoughOptions(
            modifyIframeLikeForRoughOptions(
              element,
              isExporting,
              embedsValidationStatus
            ),
            true
          )
        );
      } else {
        shape = generator.rectangle(
          0,
          0,
          element.width,
          element.height,
          generateRoughOptions(
            modifyIframeLikeForRoughOptions(
              element,
              isExporting,
              embedsValidationStatus
            ),
            false
          )
        );
      }
      return shape;
    }
    case "diamond": {
      let shape;
      const [topX, topY, rightX, rightY, bottomX, bottomY, leftX, leftY] = getDiamondPoints(element);
      if (element.roundness) {
        const verticalRadius = getCornerRadius(Math.abs(topX - leftX), element);
        const horizontalRadius = getCornerRadius(
          Math.abs(rightY - topY),
          element
        );
        shape = generator.path(
          `M ${topX + verticalRadius} ${topY + horizontalRadius} L ${rightX - verticalRadius} ${rightY - horizontalRadius}
            C ${rightX} ${rightY}, ${rightX} ${rightY}, ${rightX - verticalRadius} ${rightY + horizontalRadius}
            L ${bottomX + verticalRadius} ${bottomY - horizontalRadius}
            C ${bottomX} ${bottomY}, ${bottomX} ${bottomY}, ${bottomX - verticalRadius} ${bottomY - horizontalRadius}
            L ${leftX + verticalRadius} ${leftY + horizontalRadius}
            C ${leftX} ${leftY}, ${leftX} ${leftY}, ${leftX + verticalRadius} ${leftY - horizontalRadius}
            L ${topX - verticalRadius} ${topY + horizontalRadius}
            C ${topX} ${topY}, ${topX} ${topY}, ${topX + verticalRadius} ${topY + horizontalRadius}`,
          generateRoughOptions(element, true)
        );
      } else {
        shape = generator.polygon(
          [
            [topX, topY],
            [rightX, rightY],
            [bottomX, bottomY],
            [leftX, leftY]
          ],
          generateRoughOptions(element)
        );
      }
      return shape;
    }
    case "ellipse": {
      const shape = generator.ellipse(
        element.width / 2,
        element.height / 2,
        element.width,
        element.height,
        generateRoughOptions(element)
      );
      return shape;
    }
    case "line":
    case "arrow": {
      let shape;
      const options = generateRoughOptions(element);
      const points = element.points.length ? element.points : [pointFrom11(0, 0)];
      if (isElbowArrow(element)) {
        if (!points.every(
          (point) => Math.abs(point[0]) <= 1e6 && Math.abs(point[1]) <= 1e6
        )) {
          console.error(
            `Elbow arrow with extreme point positions detected. Arrow not rendered.`,
            element.id,
            JSON.stringify(points)
          );
          shape = [];
        } else {
          shape = [
            generator.path(
              generateElbowArrowShape(points, 16),
              generateRoughOptions(element, true)
            )
          ];
        }
      } else if (!element.roundness) {
        if (options.fill) {
          shape = [
            generator.polygon(points, options)
          ];
        } else {
          shape = [
            generator.linearPath(points, options)
          ];
        }
      } else {
        shape = [generator.curve(points, options)];
      }
      if (element.type === "arrow") {
        const { startArrowhead = null, endArrowhead = "arrow" } = element;
        if (startArrowhead !== null) {
          const shapes = getArrowheadShapes(
            element,
            shape,
            "start",
            startArrowhead,
            generator,
            options,
            canvasBackgroundColor
          );
          shape.push(...shapes);
        }
        if (endArrowhead !== null) {
          if (endArrowhead === void 0) {
          }
          const shapes = getArrowheadShapes(
            element,
            shape,
            "end",
            endArrowhead,
            generator,
            options,
            canvasBackgroundColor
          );
          shape.push(...shapes);
        }
      }
      return shape;
    }
    case "freedraw": {
      let shape;
      generateFreeDrawShape(element);
      if (isPathALoop(element.points)) {
        const simplifiedPoints = simplify(
          element.points,
          0.75
        );
        shape = generator.curve(simplifiedPoints, {
          ...generateRoughOptions(element),
          stroke: "none"
        });
      } else {
        shape = null;
      }
      return shape;
    }
    case "frame":
    case "magicframe":
    case "text":
    case "image": {
      const shape = null;
      return shape;
    }
    default: {
      assertNever2(
        element,
        `generateElementShape(): Unimplemented type ${element?.type}`
      );
      return null;
    }
  }
};
var generateElbowArrowShape = (points, radius) => {
  const subpoints = [];
  for (let i = 1; i < points.length - 1; i += 1) {
    const prev = points[i - 1];
    const next = points[i + 1];
    const point = points[i];
    const prevIsHorizontal = headingForPointIsHorizontal(point, prev);
    const nextIsHorizontal = headingForPointIsHorizontal(next, point);
    const corner = Math.min(
      radius,
      pointDistance6(points[i], next) / 2,
      pointDistance6(points[i], prev) / 2
    );
    if (prevIsHorizontal) {
      if (prev[0] < point[0]) {
        subpoints.push([points[i][0] - corner, points[i][1]]);
      } else {
        subpoints.push([points[i][0] + corner, points[i][1]]);
      }
    } else if (prev[1] < point[1]) {
      subpoints.push([points[i][0], points[i][1] - corner]);
    } else {
      subpoints.push([points[i][0], points[i][1] + corner]);
    }
    subpoints.push(points[i]);
    if (nextIsHorizontal) {
      if (next[0] < point[0]) {
        subpoints.push([points[i][0] - corner, points[i][1]]);
      } else {
        subpoints.push([points[i][0] + corner, points[i][1]]);
      }
    } else if (next[1] < point[1]) {
      subpoints.push([points[i][0], points[i][1] - corner]);
    } else {
      subpoints.push([points[i][0], points[i][1] + corner]);
    }
  }
  const d = [`M ${points[0][0]} ${points[0][1]}`];
  for (let i = 0; i < subpoints.length; i += 3) {
    d.push(`L ${subpoints[i][0]} ${subpoints[i][1]}`);
    d.push(
      `Q ${subpoints[i + 1][0]} ${subpoints[i + 1][1]}, ${subpoints[i + 2][0]} ${subpoints[i + 2][1]}`
    );
  }
  d.push(`L ${points[points.length - 1][0]} ${points[points.length - 1][1]}`);
  return d.join(" ");
};
var getElementShape = (element, elementsMap) => {
  switch (element.type) {
    case "rectangle":
    case "diamond":
    case "frame":
    case "magicframe":
    case "embeddable":
    case "image":
    case "iframe":
    case "text":
    case "selection":
      return getPolygonShape(element);
    case "arrow":
    case "line": {
      const roughShape = ShapeCache.get(element)?.[0] ?? ShapeCache.generateElementShape(element, null)[0];
      const [, , , , cx, cy] = getElementAbsoluteCoords2(element, elementsMap);
      return shouldTestInside(element) ? getClosedCurveShape(
        element,
        roughShape,
        pointFrom11(element.x, element.y),
        element.angle,
        pointFrom11(cx, cy)
      ) : getCurveShape(
        roughShape,
        pointFrom11(element.x, element.y),
        element.angle,
        pointFrom11(cx, cy)
      );
    }
    case "ellipse":
      return getEllipseShape(element);
    case "freedraw": {
      const [, , , , cx, cy] = getElementAbsoluteCoords2(element, elementsMap);
      return getFreedrawShape(
        element,
        pointFrom11(cx, cy),
        shouldTestInside(element)
      );
    }
  }
};
var toggleLinePolygonState = (element, nextPolygonState) => {
  const updatedPoints = [...element.points];
  if (nextPolygonState) {
    if (!canBecomePolygon(element.points)) {
      return null;
    }
    const firstPoint = updatedPoints[0];
    const lastPoint = updatedPoints[updatedPoints.length - 1];
    const distance3 = Math.hypot(
      firstPoint[0] - lastPoint[0],
      firstPoint[1] - lastPoint[1]
    );
    if (distance3 > LINE_POLYGON_POINT_MERGE_DISTANCE || updatedPoints.length < 4) {
      updatedPoints.push(pointFrom11(firstPoint[0], firstPoint[1]));
    } else {
      updatedPoints[updatedPoints.length - 1] = pointFrom11(
        firstPoint[0],
        firstPoint[1]
      );
    }
  }
  const ret = {
    polygon: nextPolygonState,
    points: updatedPoints
  };
  return ret;
};

// src/bounds.ts
var ElementBounds = class _ElementBounds {
  static boundsCache = /* @__PURE__ */ new WeakMap();
  static nonRotatedBoundsCache = /* @__PURE__ */ new WeakMap();
  static getBounds(element, elementsMap, nonRotated = false) {
    const cachedBounds = nonRotated && element.angle !== 0 ? _ElementBounds.nonRotatedBoundsCache.get(element) : _ElementBounds.boundsCache.get(element);
    if (cachedBounds?.version && cachedBounds.version === element.version && // we don't invalidate cache when we update containers and not labels,
    // which is causing problems down the line. Fix TBA.
    !isBoundToContainer(element)) {
      return cachedBounds.bounds;
    }
    if (nonRotated && element.angle !== 0) {
      const nonRotatedBounds = _ElementBounds.calculateBounds(
        {
          ...element,
          angle: 0
        },
        elementsMap
      );
      _ElementBounds.nonRotatedBoundsCache.set(element, {
        version: element.version,
        bounds: nonRotatedBounds
      });
      return nonRotatedBounds;
    }
    const bounds = _ElementBounds.calculateBounds(element, elementsMap);
    _ElementBounds.boundsCache.set(element, {
      version: element.version,
      bounds
    });
    return bounds;
  }
  static calculateBounds(element, elementsMap) {
    let bounds;
    const [x1, y1, x2, y2, cx, cy] = getElementAbsoluteCoords2(
      element,
      elementsMap
    );
    if (isFreeDrawElement(element)) {
      const [minX, minY, maxX, maxY] = getBoundsFromPoints(
        element.points.map(
          ([x, y]) => pointRotateRads10(
            pointFrom12(x, y),
            pointFrom12(cx - element.x, cy - element.y),
            element.angle
          )
        )
      );
      return [
        minX + element.x,
        minY + element.y,
        maxX + element.x,
        maxY + element.y
      ];
    } else if (isLinearElement(element)) {
      bounds = getLinearElementRotatedBounds(element, cx, cy, elementsMap);
    } else if (element.type === "diamond") {
      const [x11, y11] = pointRotateRads10(
        pointFrom12(cx, y1),
        pointFrom12(cx, cy),
        element.angle
      );
      const [x12, y12] = pointRotateRads10(
        pointFrom12(cx, y2),
        pointFrom12(cx, cy),
        element.angle
      );
      const [x22, y22] = pointRotateRads10(
        pointFrom12(x1, cy),
        pointFrom12(cx, cy),
        element.angle
      );
      const [x21, y21] = pointRotateRads10(
        pointFrom12(x2, cy),
        pointFrom12(cx, cy),
        element.angle
      );
      const minX = Math.min(x11, x12, x22, x21);
      const minY = Math.min(y11, y12, y22, y21);
      const maxX = Math.max(x11, x12, x22, x21);
      const maxY = Math.max(y11, y12, y22, y21);
      bounds = [minX, minY, maxX, maxY];
    } else if (element.type === "ellipse") {
      const w = (x2 - x1) / 2;
      const h = (y2 - y1) / 2;
      const cos = Math.cos(element.angle);
      const sin = Math.sin(element.angle);
      const ww = Math.hypot(w * cos, h * sin);
      const hh = Math.hypot(h * cos, w * sin);
      bounds = [cx - ww, cy - hh, cx + ww, cy + hh];
    } else {
      const [x11, y11] = pointRotateRads10(
        pointFrom12(x1, y1),
        pointFrom12(cx, cy),
        element.angle
      );
      const [x12, y12] = pointRotateRads10(
        pointFrom12(x1, y2),
        pointFrom12(cx, cy),
        element.angle
      );
      const [x22, y22] = pointRotateRads10(
        pointFrom12(x2, y2),
        pointFrom12(cx, cy),
        element.angle
      );
      const [x21, y21] = pointRotateRads10(
        pointFrom12(x2, y1),
        pointFrom12(cx, cy),
        element.angle
      );
      const minX = Math.min(x11, x12, x22, x21);
      const minY = Math.min(y11, y12, y22, y21);
      const maxX = Math.max(x11, x12, x22, x21);
      const maxY = Math.max(y11, y12, y22, y21);
      bounds = [minX, minY, maxX, maxY];
    }
    return bounds;
  }
};
var getElementAbsoluteCoords2 = (element, elementsMap, includeBoundText = false) => {
  if (isFreeDrawElement(element)) {
    return getFreeDrawElementAbsoluteCoords(element);
  } else if (isLinearElement(element)) {
    return LinearElementEditor.getElementAbsoluteCoords(
      element,
      elementsMap,
      includeBoundText
    );
  } else if (isTextElement(element)) {
    const container = elementsMap ? getContainerElement(element, elementsMap) : null;
    if (isArrowElement(container)) {
      const { x, y } = LinearElementEditor.getBoundTextElementPosition(
        container,
        element,
        elementsMap
      );
      return [
        x,
        y,
        x + element.width,
        y + element.height,
        x + element.width / 2,
        y + element.height / 2
      ];
    }
  }
  return [
    element.x,
    element.y,
    element.x + element.width,
    element.y + element.height,
    element.x + element.width / 2,
    element.y + element.height / 2
  ];
};
var getElementLineSegments = (element, elementsMap) => {
  const shape = getElementShape(element, elementsMap);
  const [x1, y1, x2, y2, cx, cy] = getElementAbsoluteCoords2(
    element,
    elementsMap
  );
  const center = pointFrom12(cx, cy);
  if (shape.type === "polycurve") {
    const curves = shape.data;
    const points = curves.map((curve4) => pointsOnBezierCurves(curve4, 10)).flat();
    let i = 0;
    const segments = [];
    while (i < points.length - 1) {
      segments.push(
        lineSegment5(
          pointFrom12(points[i][0], points[i][1]),
          pointFrom12(points[i + 1][0], points[i + 1][1])
        )
      );
      i++;
    }
    return segments;
  } else if (shape.type === "polyline") {
    return shape.data;
  } else if (_isRectanguloidElement(element)) {
    const [sides, corners] = deconstructRectanguloidElement(element);
    const cornerSegments = corners.map((corner) => getSegmentsOnCurve(corner, center, element.angle)).flat();
    const rotatedSides = getRotatedSides(sides, center, element.angle);
    return [...rotatedSides, ...cornerSegments];
  } else if (element.type === "diamond") {
    const [sides, corners] = deconstructDiamondElement(element);
    const cornerSegments = corners.map((corner) => getSegmentsOnCurve(corner, center, element.angle)).flat();
    const rotatedSides = getRotatedSides(sides, center, element.angle);
    return [...rotatedSides, ...cornerSegments];
  } else if (shape.type === "polygon") {
    if (isTextElement(element)) {
      const container = getContainerElement(element, elementsMap);
      if (container && isLinearElement(container)) {
        const segments2 = [
          lineSegment5(pointFrom12(x1, y1), pointFrom12(x2, y1)),
          lineSegment5(pointFrom12(x2, y1), pointFrom12(x2, y2)),
          lineSegment5(pointFrom12(x2, y2), pointFrom12(x1, y2)),
          lineSegment5(pointFrom12(x1, y2), pointFrom12(x1, y1))
        ];
        return segments2;
      }
    }
    const points = shape.data;
    const segments = [];
    for (let i = 0; i < points.length - 1; i++) {
      segments.push(lineSegment5(points[i], points[i + 1]));
    }
    return segments;
  } else if (shape.type === "ellipse") {
    return getSegmentsOnEllipse(element);
  }
  const [nw, ne, sw, se2, , , w, e] = [
    [x1, y1],
    [x2, y1],
    [x1, y2],
    [x2, y2],
    [cx, y1],
    [cx, y2],
    [x1, cy],
    [x2, cy]
  ].map((point) => pointRotateRads10(point, center, element.angle));
  return [
    lineSegment5(nw, ne),
    lineSegment5(sw, se2),
    lineSegment5(nw, sw),
    lineSegment5(ne, se2),
    lineSegment5(nw, e),
    lineSegment5(sw, e),
    lineSegment5(ne, w),
    lineSegment5(se2, w)
  ];
};
var _isRectanguloidElement = (element) => {
  return element != null && (element.type === "rectangle" || element.type === "image" || element.type === "iframe" || element.type === "embeddable" || element.type === "frame" || element.type === "magicframe" || element.type === "text" && !element.containerId);
};
var getRotatedSides = (sides, center, angle) => {
  return sides.map((side) => {
    return lineSegment5(
      pointRotateRads10(side[0], center, angle),
      pointRotateRads10(side[1], center, angle)
    );
  });
};
var getSegmentsOnCurve = (curve4, center, angle) => {
  const points = pointsOnBezierCurves(curve4, 10);
  let i = 0;
  const segments = [];
  while (i < points.length - 1) {
    segments.push(
      lineSegment5(
        pointRotateRads10(
          pointFrom12(points[i][0], points[i][1]),
          center,
          angle
        ),
        pointRotateRads10(
          pointFrom12(points[i + 1][0], points[i + 1][1]),
          center,
          angle
        )
      )
    );
    i++;
  }
  return segments;
};
var getSegmentsOnEllipse = (ellipse4) => {
  const center = pointFrom12(
    ellipse4.x + ellipse4.width / 2,
    ellipse4.y + ellipse4.height / 2
  );
  const a2 = ellipse4.width / 2;
  const b2 = ellipse4.height / 2;
  const segments = [];
  const points = [];
  const n = 90;
  const deltaT = Math.PI * 2 / n;
  for (let i = 0; i < n; i++) {
    const t = i * deltaT;
    const x = center[0] + a2 * Math.cos(t);
    const y = center[1] + b2 * Math.sin(t);
    points.push(pointRotateRads10(pointFrom12(x, y), center, ellipse4.angle));
  }
  for (let i = 0; i < points.length - 1; i++) {
    segments.push(lineSegment5(points[i], points[i + 1]));
  }
  segments.push(lineSegment5(points[points.length - 1], points[0]));
  return segments;
};
var getRectangleBoxAbsoluteCoords = (boxSceneCoords) => {
  return [
    boxSceneCoords.x,
    boxSceneCoords.y,
    boxSceneCoords.x + boxSceneCoords.width,
    boxSceneCoords.y + boxSceneCoords.height,
    boxSceneCoords.x + boxSceneCoords.width / 2,
    boxSceneCoords.y + boxSceneCoords.height / 2
  ];
};
var getDiamondPoints = (element) => {
  const topX = Math.floor(element.width / 2) + 1;
  const topY = 0;
  const rightX = element.width;
  const rightY = Math.floor(element.height / 2) + 1;
  const bottomX = topX;
  const bottomY = element.height;
  const leftX = 0;
  const leftY = rightY;
  return [topX, topY, rightX, rightY, bottomX, bottomY, leftX, leftY];
};
var getBezierValueForT = (t, p0, p1, p2, p3) => {
  const oneMinusT = 1 - t;
  return Math.pow(oneMinusT, 3) * p0 + 3 * Math.pow(oneMinusT, 2) * t * p1 + 3 * oneMinusT * Math.pow(t, 2) * p2 + Math.pow(t, 3) * p3;
};
var solveQuadratic = (p0, p1, p2, p3) => {
  const i = p1 - p0;
  const j = p2 - p1;
  const k = p3 - p2;
  const a2 = 3 * i - 6 * j + 3 * k;
  const b2 = 6 * j - 6 * i;
  const c = 3 * i;
  const sqrtPart = b2 * b2 - 4 * a2 * c;
  const hasSolution = sqrtPart >= 0;
  if (!hasSolution) {
    return false;
  }
  let s1 = null;
  let s2 = null;
  let t1 = Infinity;
  let t2 = Infinity;
  if (a2 === 0) {
    t1 = t2 = -c / b2;
  } else {
    t1 = (-b2 + Math.sqrt(sqrtPart)) / (2 * a2);
    t2 = (-b2 - Math.sqrt(sqrtPart)) / (2 * a2);
  }
  if (t1 >= 0 && t1 <= 1) {
    s1 = getBezierValueForT(t1, p0, p1, p2, p3);
  }
  if (t2 >= 0 && t2 <= 1) {
    s2 = getBezierValueForT(t2, p0, p1, p2, p3);
  }
  return [s1, s2];
};
var getCubicBezierCurveBound = (p0, p1, p2, p3) => {
  const solX = solveQuadratic(p0[0], p1[0], p2[0], p3[0]);
  const solY = solveQuadratic(p0[1], p1[1], p2[1], p3[1]);
  let minX = Math.min(p0[0], p3[0]);
  let maxX = Math.max(p0[0], p3[0]);
  if (solX) {
    const xs = solX.filter((x) => x !== null);
    minX = Math.min(minX, ...xs);
    maxX = Math.max(maxX, ...xs);
  }
  let minY = Math.min(p0[1], p3[1]);
  let maxY = Math.max(p0[1], p3[1]);
  if (solY) {
    const ys = solY.filter((y) => y !== null);
    minY = Math.min(minY, ...ys);
    maxY = Math.max(maxY, ...ys);
  }
  return [minX, minY, maxX, maxY];
};
var getMinMaxXYFromCurvePathOps = (ops, transformXY) => {
  let currentP = pointFrom12(0, 0);
  const { minX, minY, maxX, maxY } = ops.reduce(
    (limits, { op, data }) => {
      if (op === "move") {
        const p = pointFromArray3(data);
        invariant7(p != null, "Op data is not a point");
        currentP = p;
      } else if (op === "bcurveTo") {
        const _p1 = pointFrom12(data[0], data[1]);
        const _p2 = pointFrom12(data[2], data[3]);
        const _p3 = pointFrom12(data[4], data[5]);
        const p1 = transformXY ? transformXY(_p1) : _p1;
        const p2 = transformXY ? transformXY(_p2) : _p2;
        const p3 = transformXY ? transformXY(_p3) : _p3;
        const p0 = transformXY ? transformXY(currentP) : currentP;
        currentP = _p3;
        const [minX2, minY2, maxX2, maxY2] = getCubicBezierCurveBound(
          p0,
          p1,
          p2,
          p3
        );
        limits.minX = Math.min(limits.minX, minX2);
        limits.minY = Math.min(limits.minY, minY2);
        limits.maxX = Math.max(limits.maxX, maxX2);
        limits.maxY = Math.max(limits.maxY, maxY2);
      } else if (op === "lineTo") {
      } else if (op === "qcurveTo") {
      }
      return limits;
    },
    { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
  );
  return [minX, minY, maxX, maxY];
};
var getBoundsFromPoints = (points) => {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const [x, y] of points) {
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }
  return [minX, minY, maxX, maxY];
};
var getFreeDrawElementAbsoluteCoords = (element) => {
  const [minX, minY, maxX, maxY] = getBoundsFromPoints(element.points);
  const x1 = minX + element.x;
  const y1 = minY + element.y;
  const x2 = maxX + element.x;
  const y2 = maxY + element.y;
  return [x1, y1, x2, y2, (x1 + x2) / 2, (y1 + y2) / 2];
};
var getArrowheadSize = (arrowhead) => {
  switch (arrowhead) {
    case "arrow":
      return 25;
    case "diamond":
    case "diamond_outline":
      return 12;
    case "crowfoot_many":
    case "crowfoot_one":
    case "crowfoot_one_or_many":
      return 20;
    default:
      return 15;
  }
};
var getArrowheadAngle = (arrowhead) => {
  switch (arrowhead) {
    case "bar":
      return 90;
    case "arrow":
      return 20;
    default:
      return 25;
  }
};
var getArrowheadPoints = (element, shape, position, arrowhead) => {
  if (shape.length < 1) {
    return null;
  }
  const ops = getCurvePathOps(shape[0]);
  if (ops.length < 1) {
    return null;
  }
  const index = position === "start" ? 1 : ops.length - 1;
  const data = ops[index].data;
  invariant7(data.length === 6, "Op data length is not 6");
  const p3 = pointFrom12(data[4], data[5]);
  const p2 = pointFrom12(data[2], data[3]);
  const p1 = pointFrom12(data[0], data[1]);
  const prevOp = ops[index - 1];
  let p0 = pointFrom12(0, 0);
  if (prevOp.op === "move") {
    const p = pointFromArray3(prevOp.data);
    invariant7(p != null, "Op data is not a point");
    p0 = p;
  } else if (prevOp.op === "bcurveTo") {
    p0 = pointFrom12(prevOp.data[4], prevOp.data[5]);
  }
  const equation = (t, idx) => Math.pow(1 - t, 3) * p3[idx] + 3 * t * Math.pow(1 - t, 2) * p2[idx] + 3 * Math.pow(t, 2) * (1 - t) * p1[idx] + p0[idx] * Math.pow(t, 3);
  const [x2, y2] = position === "start" ? p0 : p3;
  const [x1, y1] = [equation(0.3, 0), equation(0.3, 1)];
  const distance3 = Math.hypot(x2 - x1, y2 - y1);
  const nx = (x2 - x1) / distance3;
  const ny = (y2 - y1) / distance3;
  const size = getArrowheadSize(arrowhead);
  let length = 0;
  {
    const [cx, cy] = position === "end" ? element.points[element.points.length - 1] : element.points[0];
    const [px, py] = element.points.length > 1 ? position === "end" ? element.points[element.points.length - 2] : element.points[1] : [0, 0];
    length = Math.hypot(cx - px, cy - py);
  }
  const lengthMultiplier = arrowhead === "diamond" || arrowhead === "diamond_outline" ? 0.25 : 0.5;
  const minSize = Math.min(size, length * lengthMultiplier);
  const xs = x2 - nx * minSize;
  const ys = y2 - ny * minSize;
  if (arrowhead === "dot" || arrowhead === "circle" || arrowhead === "circle_outline") {
    const diameter = Math.hypot(ys - y2, xs - x2) + element.strokeWidth - 2;
    return [x2, y2, diameter];
  }
  const angle = getArrowheadAngle(arrowhead);
  if (arrowhead === "crowfoot_many" || arrowhead === "crowfoot_one_or_many") {
    const [x32, y32] = pointRotateRads10(
      pointFrom12(x2, y2),
      pointFrom12(xs, ys),
      degreesToRadians(-angle)
    );
    const [x42, y42] = pointRotateRads10(
      pointFrom12(x2, y2),
      pointFrom12(xs, ys),
      degreesToRadians(angle)
    );
    return [xs, ys, x32, y32, x42, y42];
  }
  const [x3, y3] = pointRotateRads10(
    pointFrom12(xs, ys),
    pointFrom12(x2, y2),
    -angle * Math.PI / 180
  );
  const [x4, y4] = pointRotateRads10(
    pointFrom12(xs, ys),
    pointFrom12(x2, y2),
    degreesToRadians(angle)
  );
  if (arrowhead === "diamond" || arrowhead === "diamond_outline") {
    let ox;
    let oy;
    if (position === "start") {
      const [px, py] = element.points.length > 1 ? element.points[1] : [0, 0];
      [ox, oy] = pointRotateRads10(
        pointFrom12(x2 + minSize * 2, y2),
        pointFrom12(x2, y2),
        Math.atan2(py - y2, px - x2)
      );
    } else {
      const [px, py] = element.points.length > 1 ? element.points[element.points.length - 2] : [0, 0];
      [ox, oy] = pointRotateRads10(
        pointFrom12(x2 - minSize * 2, y2),
        pointFrom12(x2, y2),
        Math.atan2(y2 - py, x2 - px)
      );
    }
    return [x2, y2, x3, y3, ox, oy, x4, y4];
  }
  return [x2, y2, x3, y3, x4, y4];
};
var generateLinearElementShape = (element) => {
  const generator = rough_default.generator();
  const options = generateRoughOptions(element);
  const method = (() => {
    if (element.roundness) {
      return "curve";
    }
    if (options.fill) {
      return "polygon";
    }
    return "linearPath";
  })();
  return generator[method](
    element.points,
    options
  );
};
var getLinearElementRotatedBounds = (element, cx, cy, elementsMap) => {
  const boundTextElement = getBoundTextElement(element, elementsMap);
  if (element.points.length < 2) {
    const [pointX, pointY] = element.points[0];
    const [x, y] = pointRotateRads10(
      pointFrom12(element.x + pointX, element.y + pointY),
      pointFrom12(cx, cy),
      element.angle
    );
    let coords2 = [x, y, x, y];
    if (boundTextElement) {
      const coordsWithBoundText = LinearElementEditor.getMinMaxXYWithBoundText(
        element,
        elementsMap,
        [x, y, x, y],
        boundTextElement
      );
      coords2 = [
        coordsWithBoundText[0],
        coordsWithBoundText[1],
        coordsWithBoundText[2],
        coordsWithBoundText[3]
      ];
    }
    return coords2;
  }
  const cachedShape = ShapeCache.get(element)?.[0];
  const shape = cachedShape ?? generateLinearElementShape(element);
  const ops = getCurvePathOps(shape);
  const transformXY = ([x, y]) => pointRotateRads10(
    pointFrom12(element.x + x, element.y + y),
    pointFrom12(cx, cy),
    element.angle
  );
  const res = getMinMaxXYFromCurvePathOps(ops, transformXY);
  let coords = [res[0], res[1], res[2], res[3]];
  if (boundTextElement) {
    const coordsWithBoundText = LinearElementEditor.getMinMaxXYWithBoundText(
      element,
      elementsMap,
      coords,
      boundTextElement
    );
    coords = [
      coordsWithBoundText[0],
      coordsWithBoundText[1],
      coordsWithBoundText[2],
      coordsWithBoundText[3]
    ];
  }
  return coords;
};
var getElementBounds = (element, elementsMap, nonRotated = false) => {
  return ElementBounds.getBounds(element, elementsMap, nonRotated);
};
var getCommonBounds = (elements, elementsMap) => {
  if (!sizeOf(elements)) {
    return [0, 0, 0, 0];
  }
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  const _elementsMap = elementsMap || arrayToMap6(elements);
  elements.forEach((element) => {
    const [x1, y1, x2, y2] = getElementBounds(element, _elementsMap);
    minX = Math.min(minX, x1);
    minY = Math.min(minY, y1);
    maxX = Math.max(maxX, x2);
    maxY = Math.max(maxY, y2);
  });
  return [minX, minY, maxX, maxY];
};
var getDraggedElementsBounds = (elements, dragOffset) => {
  const [minX, minY, maxX, maxY] = getCommonBounds(elements);
  return [
    minX + dragOffset.x,
    minY + dragOffset.y,
    maxX + dragOffset.x,
    maxY + dragOffset.y
  ];
};
var getResizedElementAbsoluteCoords = (element, nextWidth, nextHeight, normalizePoints) => {
  if (!(isLinearElement(element) || isFreeDrawElement(element))) {
    return [
      element.x,
      element.y,
      element.x + nextWidth,
      element.y + nextHeight
    ];
  }
  const points = rescalePoints(
    0,
    nextWidth,
    rescalePoints(1, nextHeight, element.points, normalizePoints),
    normalizePoints
  );
  let bounds;
  if (isFreeDrawElement(element)) {
    bounds = getBoundsFromPoints(points);
  } else {
    const gen = rough_default.generator();
    const curve4 = !element.roundness ? gen.linearPath(
      points,
      generateRoughOptions(element)
    ) : gen.curve(points, generateRoughOptions(element));
    const ops = getCurvePathOps(curve4);
    bounds = getMinMaxXYFromCurvePathOps(ops);
  }
  const [minX, minY, maxX, maxY] = bounds;
  return [
    minX + element.x,
    minY + element.y,
    maxX + element.x,
    maxY + element.y
  ];
};
var getElementPointsCoords = (element, points) => {
  const gen = rough_default.generator();
  const curve4 = element.roundness == null ? gen.linearPath(
    points,
    generateRoughOptions(element)
  ) : gen.curve(points, generateRoughOptions(element));
  const ops = getCurvePathOps(curve4);
  const [minX, minY, maxX, maxY] = getMinMaxXYFromCurvePathOps(ops);
  return [
    minX + element.x,
    minY + element.y,
    maxX + element.x,
    maxY + element.y
  ];
};
var getClosestElementBounds = (elements, from) => {
  if (!elements.length) {
    return [0, 0, 0, 0];
  }
  let minDistance = Infinity;
  let closestElement = elements[0];
  const elementsMap = arrayToMap6(elements);
  elements.forEach((element) => {
    const [x1, y1, x2, y2] = getElementBounds(element, elementsMap);
    const distance3 = pointDistance7(
      pointFrom12((x1 + x2) / 2, (y1 + y2) / 2),
      pointFrom12(from.x, from.y)
    );
    if (distance3 < minDistance) {
      minDistance = distance3;
      closestElement = element;
    }
  });
  return getElementBounds(closestElement, elementsMap);
};
var getCommonBoundingBox = (elements) => {
  const [minX, minY, maxX, maxY] = getCommonBounds(elements);
  return {
    minX,
    minY,
    maxX,
    maxY,
    width: maxX - minX,
    height: maxY - minY,
    midX: (minX + maxX) / 2,
    midY: (minY + maxY) / 2
  };
};
var getVisibleSceneBounds = ({
  scrollX,
  scrollY,
  width,
  height,
  zoom
}) => {
  return [
    -scrollX,
    -scrollY,
    -scrollX + width / zoom.value,
    -scrollY + height / zoom.value
  ];
};
var getCenterForBounds = (bounds) => pointFrom12(
  bounds[0] + (bounds[2] - bounds[0]) / 2,
  bounds[1] + (bounds[3] - bounds[1]) / 2
);
var aabbForElement = (element, elementsMap, offset) => {
  const bbox = {
    minX: element.x,
    minY: element.y,
    maxX: element.x + element.width,
    maxY: element.y + element.height,
    midX: element.x + element.width / 2,
    midY: element.y + element.height / 2
  };
  const center = elementCenterPoint(element, elementsMap);
  const [topLeftX, topLeftY] = pointRotateRads10(
    pointFrom12(bbox.minX, bbox.minY),
    center,
    element.angle
  );
  const [topRightX, topRightY] = pointRotateRads10(
    pointFrom12(bbox.maxX, bbox.minY),
    center,
    element.angle
  );
  const [bottomRightX, bottomRightY] = pointRotateRads10(
    pointFrom12(bbox.maxX, bbox.maxY),
    center,
    element.angle
  );
  const [bottomLeftX, bottomLeftY] = pointRotateRads10(
    pointFrom12(bbox.minX, bbox.maxY),
    center,
    element.angle
  );
  const bounds = [
    Math.min(topLeftX, topRightX, bottomRightX, bottomLeftX),
    Math.min(topLeftY, topRightY, bottomRightY, bottomLeftY),
    Math.max(topLeftX, topRightX, bottomRightX, bottomLeftX),
    Math.max(topLeftY, topRightY, bottomRightY, bottomLeftY)
  ];
  if (offset) {
    const [topOffset, rightOffset, downOffset, leftOffset] = offset;
    return [
      bounds[0] - leftOffset,
      bounds[1] - topOffset,
      bounds[2] + rightOffset,
      bounds[3] + downOffset
    ];
  }
  return bounds;
};
var pointInsideBounds = (p, bounds) => p[0] > bounds[0] && p[0] < bounds[2] && p[1] > bounds[1] && p[1] < bounds[3];
var doBoundsIntersect = (bounds1, bounds2) => {
  if (bounds1 == null || bounds2 == null) {
    return false;
  }
  const [minX1, minY1, maxX1, maxY1] = bounds1;
  const [minX2, minY2, maxX2, maxY2] = bounds2;
  return minX1 < maxX2 && maxX1 > minX2 && minY1 < maxY2 && maxY1 > minY2;
};
var elementCenterPoint = (element, elementsMap, xOffset = 0, yOffset = 0) => {
  const [x, y] = getCenterForBounds(getElementBounds(element, elementsMap));
  return pointFrom12(x + xOffset, y + yOffset);
};

// src/sizeHelpers.ts
var INVISIBLY_SMALL_ELEMENT_SIZE = 0.1;
var isInvisiblySmallElement = (element) => {
  if (isLinearElement(element) || isFreeDrawElement(element)) {
    return element.points.length < 2 || element.points.length === 2 && isArrowElement(element) && pointsEqual7(
      element.points[0],
      element.points[element.points.length - 1],
      INVISIBLY_SMALL_ELEMENT_SIZE
    );
  }
  return element.width === 0 && element.height === 0;
};
var isElementInViewport = (element, width, height, viewTransformations, elementsMap) => {
  const [x1, y1, x2, y2] = getElementBounds(element, elementsMap);
  const topLeftSceneCoords = viewportCoordsToSceneCoords2(
    {
      clientX: viewTransformations.offsetLeft,
      clientY: viewTransformations.offsetTop
    },
    viewTransformations
  );
  const bottomRightSceneCoords = viewportCoordsToSceneCoords2(
    {
      clientX: viewTransformations.offsetLeft + width,
      clientY: viewTransformations.offsetTop + height
    },
    viewTransformations
  );
  return topLeftSceneCoords.x <= x2 && topLeftSceneCoords.y <= y2 && bottomRightSceneCoords.x >= x1 && bottomRightSceneCoords.y >= y1;
};
var isElementCompletelyInViewport = (elements, width, height, viewTransformations, elementsMap, padding) => {
  const [x1, y1, x2, y2] = getCommonBounds(elements, elementsMap);
  const topLeftSceneCoords = viewportCoordsToSceneCoords2(
    {
      clientX: viewTransformations.offsetLeft + (padding?.left || 0),
      clientY: viewTransformations.offsetTop + (padding?.top || 0)
    },
    viewTransformations
  );
  const bottomRightSceneCoords = viewportCoordsToSceneCoords2(
    {
      clientX: viewTransformations.offsetLeft + width - (padding?.right || 0),
      clientY: viewTransformations.offsetTop + height - (padding?.bottom || 0)
    },
    viewTransformations
  );
  return x1 >= topLeftSceneCoords.x && y1 >= topLeftSceneCoords.y && x2 <= bottomRightSceneCoords.x && y2 <= bottomRightSceneCoords.y;
};
var getPerfectElementSize = (elementType, width, height) => {
  const absWidth = Math.abs(width);
  const absHeight = Math.abs(height);
  if (elementType === "line" || elementType === "arrow" || elementType === "freedraw") {
    const lockedAngle = Math.round(Math.atan(absHeight / absWidth) / SHIFT_LOCKING_ANGLE) * SHIFT_LOCKING_ANGLE;
    if (lockedAngle === 0) {
      height = 0;
    } else if (lockedAngle === Math.PI / 2) {
      width = 0;
    } else {
      height = absWidth * Math.tan(lockedAngle) * Math.sign(height) || height;
    }
  } else if (elementType !== "selection") {
    height = absWidth * Math.sign(height);
  }
  return { width, height };
};
var getLockedLinearCursorAlignSize = (originX, originY, x, y, customAngle) => {
  let width = x - originX;
  let height = y - originY;
  const angle = Math.atan2(height, width);
  let lockedAngle = Math.round(angle / SHIFT_LOCKING_ANGLE) * SHIFT_LOCKING_ANGLE;
  if (customAngle) {
    const lower = Math.floor(customAngle / SHIFT_LOCKING_ANGLE) * SHIFT_LOCKING_ANGLE;
    if (radiansBetweenAngles(
      angle,
      lower,
      lower + SHIFT_LOCKING_ANGLE
    )) {
      if (radiansDifference(angle, customAngle) < SHIFT_LOCKING_ANGLE / 6) {
        lockedAngle = customAngle;
      } else if (normalizeRadians(angle) > normalizeRadians(customAngle)) {
        lockedAngle = lower + SHIFT_LOCKING_ANGLE;
      } else {
        lockedAngle = lower;
      }
    }
  }
  if (lockedAngle === 0) {
    height = 0;
  } else if (lockedAngle === Math.PI / 2) {
    width = 0;
  } else {
    const a1 = Math.tan(lockedAngle);
    const b1 = -1;
    const c1 = originY - a1 * originX;
    const a2 = -1 / a1;
    const b2 = -1;
    const c2 = y - a2 * x;
    const intersectX = (b1 * c2 - b2 * c1) / (a1 * b2 - a2 * b1);
    const intersectY = (c1 * a2 - c2 * a1) / (a1 * b2 - a2 * b1);
    width = intersectX - originX;
    height = intersectY - originY;
  }
  return { width, height };
};
var getNormalizedDimensions = (element) => {
  const ret = {
    width: element.width,
    height: element.height,
    x: element.x,
    y: element.y
  };
  if (element.width < 0) {
    const nextWidth = Math.abs(element.width);
    ret.width = nextWidth;
    ret.x = element.x - nextWidth;
  }
  if (element.height < 0) {
    const nextHeight = Math.abs(element.height);
    ret.height = nextHeight;
    ret.y = element.y - nextHeight;
  }
  return ret;
};

// src/align.ts
init_define_import_meta_env();
var alignElements = (selectedElements, alignment, scene) => {
  const elementsMap = scene.getNonDeletedElementsMap();
  const groups = getMaximumGroups(
    selectedElements,
    elementsMap
  );
  const selectionBoundingBox = getCommonBoundingBox(selectedElements);
  return groups.flatMap((group) => {
    const translation = calculateTranslation(
      group,
      selectionBoundingBox,
      alignment
    );
    return group.map((element) => {
      const updatedEle = scene.mutateElement(element, {
        x: element.x + translation.x,
        y: element.y + translation.y
      });
      updateBoundElements(element, scene, {
        simultaneouslyUpdated: group
      });
      return updatedEle;
    });
  });
};
var calculateTranslation = (group, selectionBoundingBox, { axis, position }) => {
  const groupBoundingBox = getCommonBoundingBox(group);
  const [min, max] = axis === "x" ? ["minX", "maxX"] : ["minY", "maxY"];
  const noTranslation = { x: 0, y: 0 };
  if (position === "start") {
    return {
      ...noTranslation,
      [axis]: selectionBoundingBox[min] - groupBoundingBox[min]
    };
  } else if (position === "end") {
    return {
      ...noTranslation,
      [axis]: selectionBoundingBox[max] - groupBoundingBox[max]
    };
  }
  return {
    ...noTranslation,
    [axis]: (selectionBoundingBox[min] + selectionBoundingBox[max]) / 2 - (groupBoundingBox[min] + groupBoundingBox[max]) / 2
  };
};

// src/delta.ts
init_define_import_meta_env();
import {
  arrayToMap as arrayToMap10,
  arrayToObject,
  assertNever as assertNever4,
  isDevEnv as isDevEnv7,
  isShallowEqual as isShallowEqual2,
  isTestEnv as isTestEnv8,
  randomInteger as randomInteger4
} from "@excalidraw/common";

// src/store.ts
init_define_import_meta_env();
import {
  assertNever as assertNever3,
  COLOR_PALETTE as COLOR_PALETTE2,
  isDevEnv as isDevEnv5,
  isTestEnv as isTestEnv6,
  randomId as randomId2,
  Emitter,
  toIterable
} from "@excalidraw/common";

// src/duplicate.ts
init_define_import_meta_env();
import {
  ORIG_ID,
  randomId,
  randomInteger as randomInteger2,
  arrayToMap as arrayToMap7,
  castArray,
  findLastIndex,
  getUpdatedTimestamp as getUpdatedTimestamp2,
  isTestEnv as isTestEnv5
} from "@excalidraw/common";

// src/sortElements.ts
init_define_import_meta_env();
import { arrayToMapWithIndex } from "@excalidraw/common";
var normalizeGroupElementOrder = (elements) => {
  const origElements = elements.slice();
  const sortedElements = /* @__PURE__ */ new Set();
  const orderInnerGroups = (elements2) => {
    const firstGroupSig = elements2[0]?.groupIds?.join("");
    const aGroup = [elements2[0]];
    const bGroup = [];
    for (const element of elements2.slice(1)) {
      if (element.groupIds?.join("") === firstGroupSig) {
        aGroup.push(element);
      } else {
        bGroup.push(element);
      }
    }
    return bGroup.length ? [...aGroup, ...orderInnerGroups(bGroup)] : aGroup;
  };
  const groupHandledElements = /* @__PURE__ */ new Map();
  origElements.forEach((element, idx) => {
    if (groupHandledElements.has(element.id)) {
      return;
    }
    if (element.groupIds?.length) {
      const topGroup = element.groupIds[element.groupIds.length - 1];
      const groupElements = origElements.slice(idx).filter((element2) => {
        const ret = element2?.groupIds?.some((id) => id === topGroup);
        if (ret) {
          groupHandledElements.set(element2.id, true);
        }
        return ret;
      });
      for (const elem of orderInnerGroups(groupElements)) {
        sortedElements.add(elem);
      }
    } else {
      sortedElements.add(element);
    }
  });
  if (sortedElements.size !== elements.length) {
    console.error("normalizeGroupElementOrder: lost some elements... bailing!");
    return elements;
  }
  return [...sortedElements];
};
var normalizeBoundElementsOrder = (elements) => {
  const elementsMap = arrayToMapWithIndex(elements);
  const origElements = elements.slice();
  const sortedElements = /* @__PURE__ */ new Set();
  origElements.forEach((element, idx) => {
    if (!element) {
      return;
    }
    if (element.boundElements?.length) {
      sortedElements.add(element);
      origElements[idx] = null;
      element.boundElements.forEach((boundElement) => {
        const child = elementsMap.get(boundElement.id);
        if (child && boundElement.type === "text") {
          sortedElements.add(child[0]);
          origElements[child[1]] = null;
        }
      });
    } else if (element.type === "text" && element.containerId) {
      const parent = elementsMap.get(element.containerId);
      if (!parent?.[0].boundElements?.find((x) => x.id === element.id)) {
        sortedElements.add(element);
        origElements[idx] = null;
      }
    } else {
      sortedElements.add(element);
      origElements[idx] = null;
    }
  });
  if (sortedElements.size !== elements.length) {
    console.error(
      "normalizeBoundElementsOrder: lost some elements... bailing!"
    );
    return elements;
  }
  return [...sortedElements];
};
var normalizeElementOrder = (elements) => {
  return normalizeBoundElementsOrder(normalizeGroupElementOrder(elements));
};

// src/duplicate.ts
var duplicateElement = (editingGroupId, groupIdMapForOperation, element, randomizeSeed) => {
  const copy = deepCopyElement(element);
  if (isTestEnv5()) {
    __test__defineOrigId(copy, element.id);
  }
  copy.id = randomId();
  copy.updated = getUpdatedTimestamp2();
  if (randomizeSeed) {
    copy.seed = randomInteger2();
    bumpVersion(copy);
  }
  copy.groupIds = getNewGroupIdsForDuplication(
    copy.groupIds,
    editingGroupId,
    (groupId) => {
      if (!groupIdMapForOperation.has(groupId)) {
        groupIdMapForOperation.set(groupId, randomId());
      }
      return groupIdMapForOperation.get(groupId);
    }
  );
  return copy;
};
var duplicateElements = (opts) => {
  let { elements } = opts;
  const appState = "appState" in opts ? opts.appState : {
    editingGroupId: null,
    selectedGroupIds: {}
  };
  const processedIds = /* @__PURE__ */ new Map();
  const groupIdMap = /* @__PURE__ */ new Map();
  const duplicatedElements = [];
  const origElements = [];
  const origIdToDuplicateId = /* @__PURE__ */ new Map();
  const duplicateIdToOrigElement = /* @__PURE__ */ new Map();
  const duplicateElementsMap = /* @__PURE__ */ new Map();
  const elementsMap = arrayToMap7(elements);
  const _idsOfElementsToDuplicate = opts.type === "in-place" ? opts.idsOfElementsToDuplicate : new Map(elements.map((el) => [el.id, el]));
  if (opts.type === "in-place") {
    for (const groupId of Object.keys(opts.appState.selectedGroupIds)) {
      elements.filter((el) => el.groupIds?.includes(groupId)).forEach((el) => _idsOfElementsToDuplicate.set(el.id, el));
    }
  }
  elements = normalizeElementOrder(elements);
  const elementsWithDuplicates = elements.slice();
  const copyElements = (element) => {
    const elements2 = castArray(element);
    const _newElements = elements2.reduce(
      (acc, element2) => {
        if (processedIds.has(element2.id)) {
          return acc;
        }
        processedIds.set(element2.id, true);
        const newElement2 = duplicateElement(
          appState.editingGroupId,
          groupIdMap,
          element2,
          opts.randomizeSeed
        );
        processedIds.set(newElement2.id, true);
        duplicateElementsMap.set(newElement2.id, newElement2);
        origIdToDuplicateId.set(element2.id, newElement2.id);
        duplicateIdToOrigElement.set(newElement2.id, element2);
        origElements.push(element2);
        duplicatedElements.push(newElement2);
        acc.push(newElement2);
        return acc;
      },
      []
    );
    return Array.isArray(element) ? _newElements : _newElements[0] || null;
  };
  const insertBeforeOrAfterIndex = (index, elements2) => {
    if (!elements2) {
      return;
    }
    if (index > elementsWithDuplicates.length - 1) {
      elementsWithDuplicates.push(...castArray(elements2));
      return;
    }
    elementsWithDuplicates.splice(index + 1, 0, ...castArray(elements2));
  };
  const frameIdsToDuplicate = new Set(
    elements.filter(
      (el) => _idsOfElementsToDuplicate.has(el.id) && isFrameLikeElement(el)
    ).map((el) => el.id)
  );
  for (const element of elements) {
    if (processedIds.has(element.id)) {
      continue;
    }
    if (!_idsOfElementsToDuplicate.has(element.id)) {
      continue;
    }
    const groupId = getSelectedGroupForElement(appState, element);
    if (groupId) {
      const groupElements = getElementsInGroup(elements, groupId).flatMap(
        (element2) => isFrameLikeElement(element2) ? [...getFrameChildren(elements, element2.id), element2] : [element2]
      );
      const targetIndex = findLastIndex(elementsWithDuplicates, (el) => {
        return el.groupIds?.includes(groupId);
      });
      insertBeforeOrAfterIndex(targetIndex, copyElements(groupElements));
      continue;
    }
    if (element.frameId && frameIdsToDuplicate.has(element.frameId)) {
      continue;
    }
    if (isFrameLikeElement(element)) {
      const frameId = element.id;
      const frameChildren = getFrameChildren(elements, frameId);
      const targetIndex = findLastIndex(elementsWithDuplicates, (el) => {
        return el.frameId === frameId || el.id === frameId;
      });
      insertBeforeOrAfterIndex(
        targetIndex,
        copyElements([...frameChildren, element])
      );
      continue;
    }
    if (hasBoundTextElement(element)) {
      const boundTextElement = getBoundTextElement(element, elementsMap);
      const targetIndex = findLastIndex(elementsWithDuplicates, (el) => {
        return el.id === element.id || "containerId" in el && el.containerId === element.id;
      });
      if (boundTextElement) {
        insertBeforeOrAfterIndex(
          targetIndex,
          copyElements([element, boundTextElement])
        );
      } else {
        insertBeforeOrAfterIndex(targetIndex, copyElements(element));
      }
      continue;
    }
    if (isBoundToContainer(element)) {
      const container = getContainerElement(element, elementsMap);
      const targetIndex = findLastIndex(elementsWithDuplicates, (el) => {
        return el.id === element.id || el.id === container?.id;
      });
      if (container) {
        insertBeforeOrAfterIndex(
          targetIndex,
          copyElements([container, element])
        );
      } else {
        insertBeforeOrAfterIndex(targetIndex, copyElements(element));
      }
      continue;
    }
    insertBeforeOrAfterIndex(
      findLastIndex(elementsWithDuplicates, (el) => el.id === element.id),
      copyElements(element)
    );
  }
  fixDuplicatedBindingsAfterDuplication(
    duplicatedElements,
    origIdToDuplicateId,
    duplicateElementsMap
  );
  bindElementsToFramesAfterDuplication(
    elementsWithDuplicates,
    origElements,
    origIdToDuplicateId
  );
  if (opts.overrides) {
    for (const duplicateElement2 of duplicatedElements) {
      const origElement = duplicateIdToOrigElement.get(duplicateElement2.id);
      if (origElement) {
        Object.assign(
          duplicateElement2,
          opts.overrides({
            duplicateElement: duplicateElement2,
            origElement,
            origIdToDuplicateId
          })
        );
      }
    }
  }
  return {
    duplicatedElements,
    duplicateElementsMap,
    elementsWithDuplicates,
    origIdToDuplicateId
  };
};
var _deepCopyElement = (val, depth = 0) => {
  if (val == null || typeof val !== "object") {
    return val;
  }
  const objectType = Object.prototype.toString.call(val);
  if (objectType === "[object Object]") {
    const tmp = typeof val.constructor === "function" ? Object.create(Object.getPrototypeOf(val)) : {};
    for (const key in val) {
      if (val.hasOwnProperty(key)) {
        if (depth === 0 && (key === "shape" || key === "canvas")) {
          continue;
        }
        tmp[key] = _deepCopyElement(val[key], depth + 1);
      }
    }
    return tmp;
  }
  if (Array.isArray(val)) {
    let k = val.length;
    const arr = new Array(k);
    while (k--) {
      arr[k] = _deepCopyElement(val[k], depth + 1);
    }
    return arr;
  }
  if (define_import_meta_env_default.DEV) {
    if (objectType !== "[object Object]" && objectType !== "[object Array]" && objectType.startsWith("[object ")) {
      console.warn(
        `_deepCloneElement: unexpected object type ${objectType}. This value will not be cloned!`
      );
    }
  }
  return val;
};
var deepCopyElement = (val) => {
  return _deepCopyElement(val);
};
var __test__defineOrigId = (clonedObj, origId) => {
  Object.defineProperty(clonedObj, ORIG_ID, {
    value: origId,
    writable: false,
    enumerable: false
  });
};

// src/store.ts
var CaptureUpdateAction = {
  /**
   * Immediately undoable.
   *
   * Use for updates which should be captured.
   * Should be used for most of the local updates, except ephemerals such as dragging or resizing.
   *
   * These updates will _immediately_ make it to the local undo / redo stacks.
   */
  IMMEDIATELY: "IMMEDIATELY",
  /**
   * Never undoable.
   *
   * Use for updates which should never be recorded, such as remote updates
   * or scene initialization.
   *
   * These updates will _never_ make it to the local undo / redo stacks.
   */
  NEVER: "NEVER",
  /**
   * Eventually undoable.
   *
   * Use for updates which should not be captured immediately - likely
   * exceptions which are part of some async multi-step process. Otherwise, all
   * such updates would end up being captured with the next
   * `CaptureUpdateAction.IMMEDIATELY` - triggered either by the next `updateScene`
   * or internally by the editor.
   *
   * These updates will _eventually_ make it to the local undo / redo stacks.
   */
  EVENTUALLY: "EVENTUALLY"
};
var Store = class {
  constructor(app) {
    this.app = app;
  }
  // internally used by history
  onDurableIncrementEmitter = new Emitter();
  onStoreIncrementEmitter = new Emitter();
  scheduledMacroActions = /* @__PURE__ */ new Set();
  scheduledMicroActions = [];
  _snapshot = StoreSnapshot.empty();
  get snapshot() {
    return this._snapshot;
  }
  set snapshot(snapshot) {
    this._snapshot = snapshot;
  }
  scheduleAction(action) {
    this.scheduledMacroActions.add(action);
    this.satisfiesScheduledActionsInvariant();
  }
  /**
   * Use to schedule a delta calculation, which will consquentially be emitted as `DurableStoreIncrement` and pushed in the undo stack.
   */
  // TODO: Suspicious that this is called so many places. Seems error-prone.
  scheduleCapture() {
    this.scheduleAction(CaptureUpdateAction.IMMEDIATELY);
  }
  /**
   * Schedule special "micro" actions, to-be executed before the next commit, before it executes a scheduled "macro" action.
   */
  scheduleMicroAction(params) {
    const { action } = params;
    let change;
    if ("change" in params) {
      change = params.change;
    } else {
      const currentSnapshot = StoreSnapshot.create(
        this.app.scene.getElementsMapIncludingDeleted(),
        this.app.state
      );
      const scheduledSnapshot = currentSnapshot.maybeClone(
        action,
        // let's sync invalid indices first, so that we could detect this change
        // also have the synced elements immutable, so that we don't mutate elements,
        // that are already in the scene, otherwise we wouldn't see any change
        params.elements ? syncInvalidIndicesImmutable(params.elements) : void 0,
        params.appState
      );
      change = StoreChange.create(currentSnapshot, scheduledSnapshot);
    }
    const delta = "delta" in params ? params.delta : void 0;
    this.scheduledMicroActions.push(
      () => this.processAction({
        action,
        change,
        delta
      })
    );
  }
  /**
   * Performs the incoming `CaptureUpdateAction` and emits the corresponding `StoreIncrement`.
   * Emits `DurableStoreIncrement` when action is "capture", emits `EphemeralStoreIncrement` otherwise.
   *
   * @emits StoreIncrement
   */
  commit(elements, appState) {
    this.flushMicroActions();
    try {
      const action = this.getScheduledMacroAction();
      this.processAction({ action, elements, appState });
    } finally {
      this.satisfiesScheduledActionsInvariant();
      this.scheduledMacroActions = /* @__PURE__ */ new Set();
    }
  }
  /**
   * Clears the store instance.
   */
  clear() {
    this.snapshot = StoreSnapshot.empty();
    this.scheduledMacroActions = /* @__PURE__ */ new Set();
  }
  /**
   * Performs delta & change calculation and emits a durable increment.
   *
   * @emits StoreIncrement.
   */
  emitDurableIncrement(snapshot, change = void 0, delta = void 0) {
    const prevSnapshot = this.snapshot;
    let storeChange;
    let storeDelta;
    if (change) {
      storeChange = change;
    } else {
      storeChange = StoreChange.create(prevSnapshot, snapshot);
    }
    if (delta) {
      storeDelta = delta;
    } else {
      storeDelta = StoreDelta.calculate(prevSnapshot, snapshot);
    }
    if (!storeDelta.isEmpty()) {
      const increment = new DurableIncrement(storeChange, storeDelta);
      this.onDurableIncrementEmitter.trigger(increment);
      this.onStoreIncrementEmitter.trigger(increment);
    }
  }
  /**
   * Performs change calculation and emits an ephemeral increment.
   *
   * @emits EphemeralStoreIncrement
   */
  emitEphemeralIncrement(snapshot, change = void 0) {
    let storeChange;
    if (change) {
      storeChange = change;
    } else {
      const prevSnapshot = this.snapshot;
      storeChange = StoreChange.create(prevSnapshot, snapshot);
    }
    const increment = new EphemeralIncrement(storeChange);
    this.onStoreIncrementEmitter.trigger(increment);
  }
  applyChangeToSnapshot(change) {
    const prevSnapshot = this.snapshot;
    const nextSnapshot = this.snapshot.applyChange(change);
    if (prevSnapshot === nextSnapshot) {
      return null;
    }
    return nextSnapshot;
  }
  /**
   * Clones the snapshot if there are changes detected.
   */
  maybeCloneSnapshot(action, elements, appState) {
    if (!elements && !appState) {
      return null;
    }
    const prevSnapshot = this.snapshot;
    const nextSnapshot = this.snapshot.maybeClone(action, elements, appState);
    if (prevSnapshot === nextSnapshot) {
      return null;
    }
    return nextSnapshot;
  }
  flushMicroActions() {
    for (const microAction of this.scheduledMicroActions) {
      try {
        microAction();
      } catch (error) {
        console.error(`Failed to execute scheduled micro action`, error);
      }
    }
    this.scheduledMicroActions = [];
  }
  processAction(params) {
    const { action } = params;
    if (action === CaptureUpdateAction.EVENTUALLY && !this.onStoreIncrementEmitter.subscribers.length) {
      return;
    }
    let nextSnapshot;
    if ("change" in params) {
      nextSnapshot = this.applyChangeToSnapshot(params.change);
    } else {
      nextSnapshot = this.maybeCloneSnapshot(
        action,
        params.elements,
        params.appState
      );
    }
    if (!nextSnapshot) {
      return;
    }
    const change = "change" in params ? params.change : void 0;
    const delta = "delta" in params ? params.delta : void 0;
    try {
      switch (action) {
        case CaptureUpdateAction.IMMEDIATELY:
          this.emitDurableIncrement(nextSnapshot, change, delta);
          break;
        case CaptureUpdateAction.NEVER:
        case CaptureUpdateAction.EVENTUALLY:
          this.emitEphemeralIncrement(nextSnapshot, change);
          break;
        default:
          assertNever3(action, `Unknown store action`);
      }
    } finally {
      switch (action) {
        case CaptureUpdateAction.IMMEDIATELY:
        case CaptureUpdateAction.NEVER:
          this.snapshot = nextSnapshot;
          break;
      }
    }
  }
  /**
   * Returns the scheduled macro action.
   */
  getScheduledMacroAction() {
    let scheduledAction;
    if (this.scheduledMacroActions.has(CaptureUpdateAction.IMMEDIATELY)) {
      scheduledAction = CaptureUpdateAction.IMMEDIATELY;
    } else if (this.scheduledMacroActions.has(CaptureUpdateAction.NEVER)) {
      scheduledAction = CaptureUpdateAction.NEVER;
    } else {
      scheduledAction = CaptureUpdateAction.EVENTUALLY;
    }
    return scheduledAction;
  }
  /**
   * Ensures that the scheduled actions invariant is satisfied.
   */
  satisfiesScheduledActionsInvariant() {
    if (!(this.scheduledMacroActions.size >= 0 && this.scheduledMacroActions.size <= Object.keys(CaptureUpdateAction).length)) {
      const message = `There can be at most three store actions scheduled at the same time, but there are "${this.scheduledMacroActions.size}".`;
      console.error(message, this.scheduledMacroActions.values());
      if (isTestEnv6() || isDevEnv5()) {
        throw new Error(message);
      }
    }
  }
};
var StoreChange = class _StoreChange {
  // so figuring out what has changed should ideally be just quick reference checks
  // TODO: we might need to have binary files here as well, in order to be drop-in replacement for `onChange`
  constructor(elements, appState) {
    this.elements = elements;
    this.appState = appState;
  }
  static create(prevSnapshot, nextSnapshot) {
    const changedElements = nextSnapshot.getChangedElements(prevSnapshot);
    const changedAppState = nextSnapshot.getChangedAppState(prevSnapshot);
    return new _StoreChange(changedElements, changedAppState);
  }
};
var StoreIncrement = class {
  constructor(type, change) {
    this.type = type;
    this.change = change;
  }
  static isDurable(increment) {
    return increment.type === "durable";
  }
  static isEphemeral(increment) {
    return increment.type === "ephemeral";
  }
};
var DurableIncrement = class extends StoreIncrement {
  constructor(change, delta) {
    super("durable", change);
    this.change = change;
    this.delta = delta;
  }
};
var EphemeralIncrement = class extends StoreIncrement {
  constructor(change) {
    super("ephemeral", change);
    this.change = change;
  }
};
var StoreDelta = class {
  constructor(id, elements, appState) {
    this.id = id;
    this.elements = elements;
    this.appState = appState;
  }
  /**
   * Create a new instance of `StoreDelta`.
   */
  static create(elements, appState, opts = {
    id: randomId2()
  }) {
    return new this(opts.id, elements, appState);
  }
  /**
   * Calculate the delta between the previous and next snapshot.
   */
  static calculate(prevSnapshot, nextSnapshot) {
    const elementsDelta = nextSnapshot.metadata.didElementsChange ? ElementsDelta.calculate(prevSnapshot.elements, nextSnapshot.elements) : ElementsDelta.empty();
    const appStateDelta = nextSnapshot.metadata.didAppStateChange ? AppStateDelta.calculate(prevSnapshot.appState, nextSnapshot.appState) : AppStateDelta.empty();
    return this.create(elementsDelta, appStateDelta);
  }
  /**
   * Restore a store delta instance from a DTO.
   */
  static restore(storeDeltaDTO) {
    const { id, elements, appState } = storeDeltaDTO;
    return new this(
      id,
      ElementsDelta.restore(elements),
      AppStateDelta.restore(appState)
    );
  }
  /**
   * Parse and load the delta from the remote payload.
   */
  static load({
    id,
    elements: { added, removed, updated }
  }) {
    const elements = ElementsDelta.create(added, removed, updated);
    return new this(id, elements, AppStateDelta.empty());
  }
  /**
   * Inverse store delta, creates new instance of `StoreDelta`.
   */
  static inverse(delta) {
    return this.create(delta.elements.inverse(), delta.appState.inverse());
  }
  /**
   * Apply the delta to the passed elements and appState, does not modify the snapshot.
   */
  static applyTo(delta, elements, appState) {
    const [nextElements, elementsContainVisibleChange] = delta.elements.applyTo(elements);
    const [nextAppState, appStateContainsVisibleChange] = delta.appState.applyTo(appState, nextElements);
    const appliedVisibleChanges = elementsContainVisibleChange || appStateContainsVisibleChange;
    return [nextElements, nextAppState, appliedVisibleChanges];
  }
  /**
   * Apply latest (remote) changes to the delta, creates new instance of `StoreDelta`.
   */
  static applyLatestChanges(delta, prevElements, nextElements, modifierOptions) {
    return this.create(
      delta.elements.applyLatestChanges(
        prevElements,
        nextElements,
        modifierOptions
      ),
      delta.appState,
      {
        id: delta.id
      }
    );
  }
  isEmpty() {
    return this.elements.isEmpty() && this.appState.isEmpty();
  }
};
var StoreSnapshot = class _StoreSnapshot {
  constructor(elements, appState, metadata = {
    didElementsChange: false,
    didAppStateChange: false,
    isEmpty: false
  }) {
    this.elements = elements;
    this.appState = appState;
    this.metadata = metadata;
  }
  _lastChangedElementsHash = 0;
  _lastChangedAppStateHash = 0;
  static create(elements, appState, metadata = {
    didElementsChange: false,
    didAppStateChange: false
  }) {
    return new _StoreSnapshot(
      elements,
      isObservedAppState(appState) ? appState : getObservedAppState(appState),
      metadata
    );
  }
  static empty() {
    return new _StoreSnapshot(
      /* @__PURE__ */ new Map(),
      getDefaultObservedAppState(),
      {
        didElementsChange: false,
        didAppStateChange: false,
        isEmpty: true
      }
    );
  }
  getChangedElements(prevSnapshot) {
    const changedElements = {};
    for (const prevElement of toIterable(prevSnapshot.elements)) {
      const nextElement = this.elements.get(prevElement.id);
      if (!nextElement) {
        changedElements[prevElement.id] = newElementWith(prevElement, {
          isDeleted: true
        });
      }
    }
    for (const nextElement of toIterable(this.elements)) {
      if (prevSnapshot.elements.get(nextElement.id) !== nextElement) {
        changedElements[nextElement.id] = nextElement;
      }
    }
    return changedElements;
  }
  getChangedAppState(prevSnapshot) {
    return Delta.getRightDifferences(
      prevSnapshot.appState,
      this.appState
    ).reduce(
      (acc, key) => Object.assign(acc, {
        [key]: this.appState[key]
      }),
      {}
    );
  }
  isEmpty() {
    return this.metadata.isEmpty;
  }
  /**
   * Apply the change and return a new snapshot instance.
   */
  applyChange(change) {
    const nextElements = new Map(this.elements);
    for (const [id, changedElement] of Object.entries(change.elements)) {
      nextElements.set(id, changedElement);
    }
    const nextAppState = getObservedAppState({
      ...this.appState,
      ...change.appState
    });
    return _StoreSnapshot.create(nextElements, nextAppState, {
      // by default we assume that change is different from what we have in the snapshot
      // so that we trigger the delta calculation and if it isn't different, delta will be empty
      didElementsChange: Object.keys(change.elements).length > 0,
      didAppStateChange: Object.keys(change.appState).length > 0
    });
  }
  /**
   * Efficiently clone the existing snapshot, only if we detected changes.
   *
   * @returns same instance if there are no changes detected, new instance otherwise.
   */
  maybeClone(action, elements, appState) {
    const options = {
      shouldCompareHashes: false
    };
    if (action === CaptureUpdateAction.EVENTUALLY) {
      options.shouldCompareHashes = true;
    }
    const nextElementsSnapshot = this.maybeCreateElementsSnapshot(
      elements,
      options
    );
    const nextAppStateSnapshot = this.maybeCreateAppStateSnapshot(
      appState,
      options
    );
    let didElementsChange = false;
    let didAppStateChange = false;
    if (this.elements !== nextElementsSnapshot) {
      didElementsChange = true;
    }
    if (this.appState !== nextAppStateSnapshot) {
      didAppStateChange = true;
    }
    if (!didElementsChange && !didAppStateChange) {
      return this;
    }
    const snapshot = new _StoreSnapshot(
      nextElementsSnapshot,
      nextAppStateSnapshot,
      {
        didElementsChange,
        didAppStateChange
      }
    );
    return snapshot;
  }
  maybeCreateAppStateSnapshot(appState, options = {
    shouldCompareHashes: false
  }) {
    if (!appState) {
      return this.appState;
    }
    const nextAppStateSnapshot = !isObservedAppState(appState) ? getObservedAppState(appState) : appState;
    const didAppStateChange = this.detectChangedAppState(
      nextAppStateSnapshot,
      options
    );
    if (!didAppStateChange) {
      return this.appState;
    }
    return nextAppStateSnapshot;
  }
  maybeCreateElementsSnapshot(elements, options = {
    shouldCompareHashes: false
  }) {
    if (!elements) {
      return this.elements;
    }
    const changedElements = this.detectChangedElements(elements, options);
    if (!changedElements?.size) {
      return this.elements;
    }
    const elementsSnapshot = this.createElementsSnapshot(changedElements);
    return elementsSnapshot;
  }
  detectChangedAppState(nextObservedAppState, options = {
    shouldCompareHashes: false
  }) {
    if (this.appState === nextObservedAppState) {
      return;
    }
    const didAppStateChange = Delta.isRightDifferent(
      this.appState,
      nextObservedAppState
    );
    if (!didAppStateChange) {
      return;
    }
    const changedAppStateHash = hashString(
      JSON.stringify(nextObservedAppState)
    );
    if (options.shouldCompareHashes && this._lastChangedAppStateHash === changedAppStateHash) {
      return;
    }
    this._lastChangedAppStateHash = changedAppStateHash;
    return didAppStateChange;
  }
  /**
   * Detect if there are any changed elements.
   */
  detectChangedElements(nextElements, options = {
    shouldCompareHashes: false
  }) {
    if (this.elements === nextElements) {
      return;
    }
    const changedElements = /* @__PURE__ */ new Map();
    for (const prevElement of toIterable(this.elements)) {
      const nextElement = nextElements.get(prevElement.id);
      if (!nextElement) {
        changedElements.set(
          prevElement.id,
          newElementWith(prevElement, { isDeleted: true })
        );
      }
    }
    for (const nextElement of toIterable(nextElements)) {
      const prevElement = this.elements.get(nextElement.id);
      if (!prevElement || // element was added
      prevElement.version < nextElement.version) {
        if (isImageElement(nextElement) && !isInitializedImageElement(nextElement)) {
          continue;
        }
        changedElements.set(nextElement.id, nextElement);
      }
    }
    if (!changedElements.size) {
      return;
    }
    const changedElementsHash = hashElementsVersion(changedElements);
    if (options.shouldCompareHashes && this._lastChangedElementsHash === changedElementsHash) {
      return;
    }
    this._lastChangedElementsHash = changedElementsHash;
    return changedElements;
  }
  /**
   * Perform structural clone, deep cloning only elements that changed.
   */
  createElementsSnapshot(changedElements) {
    const clonedElements = /* @__PURE__ */ new Map();
    for (const prevElement of toIterable(this.elements)) {
      clonedElements.set(prevElement.id, prevElement);
    }
    for (const changedElement of toIterable(changedElements)) {
      clonedElements.set(changedElement.id, deepCopyElement(changedElement));
    }
    return clonedElements;
  }
};
var hiddenObservedAppStateProp = "__observedAppState";
var getDefaultObservedAppState = () => {
  return {
    name: null,
    editingGroupId: null,
    viewBackgroundColor: COLOR_PALETTE2.white,
    selectedElementIds: {},
    selectedGroupIds: {},
    editingLinearElementId: null,
    selectedLinearElementId: null,
    croppingElementId: null,
    activeLockedId: null,
    lockedMultiSelections: {}
  };
};
var getObservedAppState = (appState) => {
  const observedAppState = {
    name: appState.name,
    editingGroupId: appState.editingGroupId,
    viewBackgroundColor: appState.viewBackgroundColor,
    selectedElementIds: appState.selectedElementIds,
    selectedGroupIds: appState.selectedGroupIds,
    croppingElementId: appState.croppingElementId,
    activeLockedId: appState.activeLockedId,
    lockedMultiSelections: appState.lockedMultiSelections,
    editingLinearElementId: appState.editingLinearElement?.elementId ?? // prefer app state, as it's likely newer
    appState.editingLinearElementId ?? // fallback to observed app state, as it's likely older coming from a previous snapshot
    null,
    selectedLinearElementId: appState.selectedLinearElement?.elementId ?? appState.selectedLinearElementId ?? null
  };
  Reflect.defineProperty(observedAppState, hiddenObservedAppStateProp, {
    value: true,
    enumerable: false
  });
  return observedAppState;
};
var isObservedAppState = (appState) => !!Reflect.get(appState, hiddenObservedAppStateProp);

// src/fractionalIndex.ts
init_define_import_meta_env();

// ../../node_modules/fractional-indexing/src/index.js
init_define_import_meta_env();
var BASE_62_DIGITS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
function midpoint(a2, b2, digits) {
  const zero = digits[0];
  if (b2 != null && a2 >= b2) {
    throw new Error(a2 + " >= " + b2);
  }
  if (a2.slice(-1) === zero || b2 && b2.slice(-1) === zero) {
    throw new Error("trailing zero");
  }
  if (b2) {
    let n = 0;
    while ((a2[n] || zero) === b2[n]) {
      n++;
    }
    if (n > 0) {
      return b2.slice(0, n) + midpoint(a2.slice(n), b2.slice(n), digits);
    }
  }
  const digitA = a2 ? digits.indexOf(a2[0]) : 0;
  const digitB = b2 != null ? digits.indexOf(b2[0]) : digits.length;
  if (digitB - digitA > 1) {
    const midDigit = Math.round(0.5 * (digitA + digitB));
    return digits[midDigit];
  } else {
    if (b2 && b2.length > 1) {
      return b2.slice(0, 1);
    } else {
      return digits[digitA] + midpoint(a2.slice(1), null, digits);
    }
  }
}
function validateInteger(int) {
  if (int.length !== getIntegerLength(int[0])) {
    throw new Error("invalid integer part of order key: " + int);
  }
}
function getIntegerLength(head) {
  if (head >= "a" && head <= "z") {
    return head.charCodeAt(0) - "a".charCodeAt(0) + 2;
  } else if (head >= "A" && head <= "Z") {
    return "Z".charCodeAt(0) - head.charCodeAt(0) + 2;
  } else {
    throw new Error("invalid order key head: " + head);
  }
}
function getIntegerPart(key) {
  const integerPartLength = getIntegerLength(key[0]);
  if (integerPartLength > key.length) {
    throw new Error("invalid order key: " + key);
  }
  return key.slice(0, integerPartLength);
}
function validateOrderKey(key, digits) {
  if (key === "A" + digits[0].repeat(26)) {
    throw new Error("invalid order key: " + key);
  }
  const i = getIntegerPart(key);
  const f = key.slice(i.length);
  if (f.slice(-1) === digits[0]) {
    throw new Error("invalid order key: " + key);
  }
}
function incrementInteger(x, digits) {
  validateInteger(x);
  const [head, ...digs] = x.split("");
  let carry = true;
  for (let i = digs.length - 1; carry && i >= 0; i--) {
    const d = digits.indexOf(digs[i]) + 1;
    if (d === digits.length) {
      digs[i] = digits[0];
    } else {
      digs[i] = digits[d];
      carry = false;
    }
  }
  if (carry) {
    if (head === "Z") {
      return "a" + digits[0];
    }
    if (head === "z") {
      return null;
    }
    const h = String.fromCharCode(head.charCodeAt(0) + 1);
    if (h > "a") {
      digs.push(digits[0]);
    } else {
      digs.pop();
    }
    return h + digs.join("");
  } else {
    return head + digs.join("");
  }
}
function decrementInteger(x, digits) {
  validateInteger(x);
  const [head, ...digs] = x.split("");
  let borrow = true;
  for (let i = digs.length - 1; borrow && i >= 0; i--) {
    const d = digits.indexOf(digs[i]) - 1;
    if (d === -1) {
      digs[i] = digits.slice(-1);
    } else {
      digs[i] = digits[d];
      borrow = false;
    }
  }
  if (borrow) {
    if (head === "a") {
      return "Z" + digits.slice(-1);
    }
    if (head === "A") {
      return null;
    }
    const h = String.fromCharCode(head.charCodeAt(0) - 1);
    if (h < "Z") {
      digs.push(digits.slice(-1));
    } else {
      digs.pop();
    }
    return h + digs.join("");
  } else {
    return head + digs.join("");
  }
}
function generateKeyBetween(a2, b2, digits = BASE_62_DIGITS) {
  if (a2 != null) {
    validateOrderKey(a2, digits);
  }
  if (b2 != null) {
    validateOrderKey(b2, digits);
  }
  if (a2 != null && b2 != null && a2 >= b2) {
    throw new Error(a2 + " >= " + b2);
  }
  if (a2 == null) {
    if (b2 == null) {
      return "a" + digits[0];
    }
    const ib2 = getIntegerPart(b2);
    const fb2 = b2.slice(ib2.length);
    if (ib2 === "A" + digits[0].repeat(26)) {
      return ib2 + midpoint("", fb2, digits);
    }
    if (ib2 < b2) {
      return ib2;
    }
    const res = decrementInteger(ib2, digits);
    if (res == null) {
      throw new Error("cannot decrement any more");
    }
    return res;
  }
  if (b2 == null) {
    const ia2 = getIntegerPart(a2);
    const fa2 = a2.slice(ia2.length);
    const i2 = incrementInteger(ia2, digits);
    return i2 == null ? ia2 + midpoint(fa2, null, digits) : i2;
  }
  const ia = getIntegerPart(a2);
  const fa = a2.slice(ia.length);
  const ib = getIntegerPart(b2);
  const fb = b2.slice(ib.length);
  if (ia === ib) {
    return ia + midpoint(fa, fb, digits);
  }
  const i = incrementInteger(ia, digits);
  if (i == null) {
    throw new Error("cannot increment any more");
  }
  if (i < b2) {
    return i;
  }
  return ia + midpoint(fa, null, digits);
}
function generateNKeysBetween(a2, b2, n, digits = BASE_62_DIGITS) {
  if (n === 0) {
    return [];
  }
  if (n === 1) {
    return [generateKeyBetween(a2, b2, digits)];
  }
  if (b2 == null) {
    let c2 = generateKeyBetween(a2, b2, digits);
    const result = [c2];
    for (let i = 0; i < n - 1; i++) {
      c2 = generateKeyBetween(c2, b2, digits);
      result.push(c2);
    }
    return result;
  }
  if (a2 == null) {
    let c2 = generateKeyBetween(a2, b2, digits);
    const result = [c2];
    for (let i = 0; i < n - 1; i++) {
      c2 = generateKeyBetween(a2, c2, digits);
      result.push(c2);
    }
    result.reverse();
    return result;
  }
  const mid = Math.floor(n / 2);
  const c = generateKeyBetween(a2, b2, digits);
  return [
    ...generateNKeysBetween(a2, c, mid, digits),
    c,
    ...generateNKeysBetween(c, b2, n - mid - 1, digits)
  ];
}

// src/fractionalIndex.ts
import { arrayToMap as arrayToMap8 } from "@excalidraw/common";
var InvalidFractionalIndexError = class extends Error {
  code = "ELEMENT_HAS_INVALID_INDEX";
};
var validateFractionalIndices = (elements, {
  shouldThrow = false,
  includeBoundTextValidation = false,
  ignoreLogs,
  reconciliationContext
}) => {
  const errorMessages = [];
  const stringifyElement = (element) => `${element?.index}:${element?.id}:${element?.type}:${element?.isDeleted}:${element?.version}:${element?.versionNonce}`;
  const indices = elements.map((x) => x.index);
  for (const [i, index] of indices.entries()) {
    const predecessorIndex = indices[i - 1];
    const successorIndex = indices[i + 1];
    if (!isValidFractionalIndex(index, predecessorIndex, successorIndex)) {
      errorMessages.push(
        `Fractional indices invariant has been compromised: "${stringifyElement(
          elements[i - 1]
        )}", "${stringifyElement(elements[i])}", "${stringifyElement(
          elements[i + 1]
        )}"`
      );
    }
    if (includeBoundTextValidation && hasBoundTextElement(elements[i])) {
      const container = elements[i];
      const text = getBoundTextElement(container, arrayToMap8(elements));
      if (text && text.index <= container.index) {
        errorMessages.push(
          `Fractional indices invariant for bound elements has been compromised: "${stringifyElement(
            text
          )}", "${stringifyElement(container)}"`
        );
      }
    }
  }
  if (errorMessages.length) {
    const error = new InvalidFractionalIndexError();
    const additionalContext = [];
    if (reconciliationContext) {
      additionalContext.push("Additional reconciliation context:");
      additionalContext.push(
        reconciliationContext.localElements.map((x) => stringifyElement(x))
      );
      additionalContext.push(
        reconciliationContext.remoteElements.map((x) => stringifyElement(x))
      );
    }
    if (!ignoreLogs) {
      console.error(
        errorMessages.join("\n\n"),
        error.stack,
        elements.map((x) => stringifyElement(x)),
        ...additionalContext
      );
    }
    if (shouldThrow) {
      throw error;
    }
  }
};
var orderByFractionalIndex = (elements) => {
  return elements.sort((a2, b2) => {
    if (isOrderedElement(a2) && isOrderedElement(b2)) {
      if (a2.index < b2.index) {
        return -1;
      } else if (a2.index > b2.index) {
        return 1;
      }
      return a2.id < b2.id ? -1 : 1;
    }
    return 1;
  });
};
var syncMovedIndices = (elements, movedElements) => {
  try {
    const elementsMap = arrayToMap8(elements);
    const indicesGroups = getMovedIndicesGroups(elements, movedElements);
    const elementsUpdates = generateIndices(elements, indicesGroups);
    const elementsCandidates = elements.map((x) => {
      const elementUpdates = elementsUpdates.get(x);
      if (elementUpdates) {
        return { ...x, index: elementUpdates.index };
      }
      return x;
    });
    validateFractionalIndices(
      elementsCandidates,
      // we don't autofix invalid bound text indices, hence don't include it in the validation
      {
        includeBoundTextValidation: false,
        shouldThrow: true,
        ignoreLogs: true
      }
    );
    for (const [element, { index }] of elementsUpdates) {
      mutateElement(element, elementsMap, { index });
    }
  } catch (e) {
    syncInvalidIndices(elements);
  }
  return elements;
};
var syncInvalidIndices = (elements) => {
  const elementsMap = arrayToMap8(elements);
  const indicesGroups = getInvalidIndicesGroups(elements);
  const elementsUpdates = generateIndices(elements, indicesGroups);
  for (const [element, { index }] of elementsUpdates) {
    mutateElement(element, elementsMap, { index });
  }
  return elements;
};
var syncInvalidIndicesImmutable = (elements) => {
  const syncedElements = arrayToMap8(elements);
  const indicesGroups = getInvalidIndicesGroups(elements);
  const elementsUpdates = generateIndices(elements, indicesGroups);
  for (const [element, { index }] of elementsUpdates) {
    syncedElements.set(element.id, newElementWith(element, { index }));
  }
  return syncedElements;
};
var getMovedIndicesGroups = (elements, movedElements) => {
  const indicesGroups = [];
  let i = 0;
  while (i < elements.length) {
    if (movedElements.has(elements[i].id)) {
      const indicesGroup = [i - 1, i];
      while (++i < elements.length) {
        if (!movedElements.has(elements[i].id)) {
          break;
        }
        indicesGroup.push(i);
      }
      indicesGroup.push(i);
      indicesGroups.push(indicesGroup);
    } else {
      i++;
    }
  }
  return indicesGroups;
};
var getInvalidIndicesGroups = (elements) => {
  const indicesGroups = [];
  let lowerBound = void 0;
  let upperBound = void 0;
  let lowerBoundIndex = -1;
  let upperBoundIndex = 0;
  const getLowerBound = (index) => {
    const lowerBound2 = elements[lowerBoundIndex] ? elements[lowerBoundIndex].index : void 0;
    const candidate = elements[index - 1]?.index;
    if (!lowerBound2 && candidate || // first lowerBound
    lowerBound2 && candidate && candidate > lowerBound2) {
      return [candidate, index - 1];
    }
    return [lowerBound2, lowerBoundIndex];
  };
  const getUpperBound = (index) => {
    const upperBound2 = elements[upperBoundIndex] ? elements[upperBoundIndex].index : void 0;
    if (upperBound2 && index < upperBoundIndex) {
      return [upperBound2, upperBoundIndex];
    }
    let i2 = upperBoundIndex;
    while (++i2 < elements.length) {
      const candidate = elements[i2]?.index;
      if (!upperBound2 && candidate || // first upperBound
      upperBound2 && candidate && candidate > upperBound2) {
        return [candidate, i2];
      }
    }
    return [void 0, i2];
  };
  let i = 0;
  while (i < elements.length) {
    const current = elements[i].index;
    [lowerBound, lowerBoundIndex] = getLowerBound(i);
    [upperBound, upperBoundIndex] = getUpperBound(i);
    if (!isValidFractionalIndex(current, lowerBound, upperBound)) {
      const indicesGroup = [lowerBoundIndex, i];
      while (++i < elements.length) {
        const current2 = elements[i].index;
        const [nextLowerBound, nextLowerBoundIndex] = getLowerBound(i);
        const [nextUpperBound, nextUpperBoundIndex] = getUpperBound(i);
        if (isValidFractionalIndex(current2, nextLowerBound, nextUpperBound)) {
          break;
        }
        [lowerBound, lowerBoundIndex] = [nextLowerBound, nextLowerBoundIndex];
        [upperBound, upperBoundIndex] = [nextUpperBound, nextUpperBoundIndex];
        indicesGroup.push(i);
      }
      indicesGroup.push(upperBoundIndex);
      indicesGroups.push(indicesGroup);
    } else {
      i++;
    }
  }
  return indicesGroups;
};
var isValidFractionalIndex = (index, predecessor, successor) => {
  if (!index) {
    return false;
  }
  if (predecessor && successor) {
    return predecessor < index && index < successor;
  }
  if (!predecessor && successor) {
    return index < successor;
  }
  if (predecessor && !successor) {
    return predecessor < index;
  }
  return !!index;
};
var generateIndices = (elements, indicesGroups) => {
  const elementsUpdates = /* @__PURE__ */ new Map();
  for (const indices of indicesGroups) {
    const lowerBoundIndex = indices.shift();
    const upperBoundIndex = indices.pop();
    const fractionalIndices = generateNKeysBetween(
      elements[lowerBoundIndex]?.index,
      elements[upperBoundIndex]?.index,
      indices.length
    );
    for (let i = 0; i < indices.length; i++) {
      const element = elements[indices[i]];
      elementsUpdates.set(element, {
        index: fractionalIndices[i]
      });
    }
  }
  return elementsUpdates;
};
var isOrderedElement = (element) => {
  if (element.index) {
    return true;
  }
  return false;
};

// src/Scene.ts
init_define_import_meta_env();
var import_lodash = __toESM(require_lodash(), 1);
import {
  randomInteger as randomInteger3,
  arrayToMap as arrayToMap9,
  toBrandedType,
  isDevEnv as isDevEnv6,
  isTestEnv as isTestEnv7,
  toArray
} from "@excalidraw/common";
import { isNonDeletedElement } from "@excalidraw/element";
import { isFrameLikeElement as isFrameLikeElement2 } from "@excalidraw/element";
import { getElementsInGroup as getElementsInGroup2 } from "@excalidraw/element";
import {
  syncInvalidIndices as syncInvalidIndices2,
  syncMovedIndices as syncMovedIndices2,
  validateFractionalIndices as validateFractionalIndices2
} from "@excalidraw/element";
import { getSelectedElements as getSelectedElements2 } from "@excalidraw/element";
import { mutateElement as mutateElement2 } from "@excalidraw/element";
var getNonDeletedElements2 = (allElements) => {
  const elementsMap = /* @__PURE__ */ new Map();
  const elements = [];
  for (const element of allElements) {
    if (!element.isDeleted) {
      elements.push(element);
      elementsMap.set(
        element.id,
        element
      );
    }
  }
  return { elementsMap, elements };
};
var validateIndicesThrottled = (0, import_lodash.default)(
  (elements) => {
    if (isDevEnv6() || isTestEnv7() || window?.DEBUG_FRACTIONAL_INDICES) {
      validateFractionalIndices2(elements, {
        // throw only in dev & test, to remain functional on `DEBUG_FRACTIONAL_INDICES`
        shouldThrow: isDevEnv6() || isTestEnv7(),
        includeBoundTextValidation: true
      });
    }
  },
  1e3 * 60,
  { leading: true, trailing: false }
);
var hashSelectionOpts = (opts) => {
  const keys = ["includeBoundTextElement", "includeElementsInFrames"];
  let hash = "";
  for (const key of keys) {
    hash += `${key}:${opts[key] ? "1" : "0"}`;
  }
  return hash;
};
var Scene = class {
  // ---------------------------------------------------------------------------
  // instance methods/props
  // ---------------------------------------------------------------------------
  callbacks = /* @__PURE__ */ new Set();
  nonDeletedElements = [];
  nonDeletedElementsMap = toBrandedType(
    /* @__PURE__ */ new Map()
  );
  // ideally all elements within the scene should be wrapped around with `Ordered` type, but right now there is no real benefit doing so
  elements = [];
  nonDeletedFramesLikes = [];
  frames = [];
  elementsMap = toBrandedType(/* @__PURE__ */ new Map());
  selectedElementsCache = {
    selectedElementIds: null,
    elements: null,
    cache: /* @__PURE__ */ new Map()
  };
  /**
   * Random integer regenerated each scene update.
   *
   * Does not relate to elements versions, it's only a renderer
   * cache-invalidation nonce at the moment.
   */
  sceneNonce;
  getSceneNonce() {
    return this.sceneNonce;
  }
  getNonDeletedElementsMap() {
    return this.nonDeletedElementsMap;
  }
  getElementsIncludingDeleted() {
    return this.elements;
  }
  getElementsMapIncludingDeleted() {
    return this.elementsMap;
  }
  getNonDeletedElements() {
    return this.nonDeletedElements;
  }
  getFramesIncludingDeleted() {
    return this.frames;
  }
  constructor(elements = null) {
    if (elements) {
      this.replaceAllElements(elements);
    }
  }
  getSelectedElements(opts) {
    const hash = hashSelectionOpts(opts);
    const elements = opts?.elements || this.nonDeletedElements;
    if (this.selectedElementsCache.elements === elements && this.selectedElementsCache.selectedElementIds === opts.selectedElementIds) {
      const cached = this.selectedElementsCache.cache.get(hash);
      if (cached) {
        return cached;
      }
    } else if (opts?.elements == null) {
      this.selectedElementsCache.cache.clear();
    }
    const selectedElements = getSelectedElements2(
      elements,
      { selectedElementIds: opts.selectedElementIds },
      opts
    );
    if (opts?.elements == null) {
      this.selectedElementsCache.selectedElementIds = opts.selectedElementIds;
      this.selectedElementsCache.elements = this.nonDeletedElements;
      this.selectedElementsCache.cache.set(hash, selectedElements);
    }
    return selectedElements;
  }
  getNonDeletedFramesLikes() {
    return this.nonDeletedFramesLikes;
  }
  getElement(id) {
    return this.elementsMap.get(id) || null;
  }
  getNonDeletedElement(id) {
    const element = this.getElement(id);
    if (element && isNonDeletedElement(element)) {
      return element;
    }
    return null;
  }
  /**
   * A utility method to help with updating all scene elements, with the added
   * performance optimization of not renewing the array if no change is made.
   *
   * Maps all current excalidraw elements, invoking the callback for each
   * element. The callback should either return a new mapped element, or the
   * original element if no changes are made. If no changes are made to any
   * element, this results in a no-op. Otherwise, the newly mapped elements
   * are set as the next scene's elements.
   *
   * @returns whether a change was made
   */
  mapElements(iteratee) {
    let didChange = false;
    const newElements = this.elements.map((element) => {
      const nextElement = iteratee(element);
      if (nextElement !== element) {
        didChange = true;
      }
      return nextElement;
    });
    if (didChange) {
      this.replaceAllElements(newElements);
    }
    return didChange;
  }
  replaceAllElements(nextElements) {
    const _nextElements = toArray(nextElements);
    const nextFrameLikes = [];
    validateIndicesThrottled(_nextElements);
    this.elements = syncInvalidIndices2(_nextElements);
    this.elementsMap.clear();
    this.elements.forEach((element) => {
      if (isFrameLikeElement2(element)) {
        nextFrameLikes.push(element);
      }
      this.elementsMap.set(element.id, element);
    });
    const nonDeletedElements = getNonDeletedElements2(this.elements);
    this.nonDeletedElements = nonDeletedElements.elements;
    this.nonDeletedElementsMap = nonDeletedElements.elementsMap;
    this.frames = nextFrameLikes;
    this.nonDeletedFramesLikes = getNonDeletedElements2(this.frames).elements;
    this.triggerUpdate();
  }
  triggerUpdate() {
    this.sceneNonce = randomInteger3();
    for (const callback of Array.from(this.callbacks)) {
      callback();
    }
  }
  onUpdate(cb) {
    if (this.callbacks.has(cb)) {
      throw new Error();
    }
    this.callbacks.add(cb);
    return () => {
      if (!this.callbacks.has(cb)) {
        throw new Error();
      }
      this.callbacks.delete(cb);
    };
  }
  destroy() {
    this.elements = [];
    this.nonDeletedElements = [];
    this.nonDeletedFramesLikes = [];
    this.frames = [];
    this.elementsMap.clear();
    this.selectedElementsCache.selectedElementIds = null;
    this.selectedElementsCache.elements = null;
    this.selectedElementsCache.cache.clear();
    this.callbacks.clear();
  }
  insertElementAtIndex(element, index) {
    if (!Number.isFinite(index) || index < 0) {
      throw new Error(
        "insertElementAtIndex can only be called with index >= 0"
      );
    }
    const nextElements = [
      ...this.elements.slice(0, index),
      element,
      ...this.elements.slice(index)
    ];
    syncMovedIndices2(nextElements, arrayToMap9([element]));
    this.replaceAllElements(nextElements);
  }
  insertElementsAtIndex(elements, index) {
    if (!elements.length) {
      return;
    }
    if (!Number.isFinite(index) || index < 0) {
      throw new Error(
        "insertElementAtIndex can only be called with index >= 0"
      );
    }
    const nextElements = [
      ...this.elements.slice(0, index),
      ...elements,
      ...this.elements.slice(index)
    ];
    syncMovedIndices2(nextElements, arrayToMap9(elements));
    this.replaceAllElements(nextElements);
  }
  insertElement = (element) => {
    const index = element.frameId ? this.getElementIndex(element.frameId) : this.elements.length;
    this.insertElementAtIndex(element, index);
  };
  insertElements = (elements) => {
    if (!elements.length) {
      return;
    }
    const index = elements[0]?.frameId ? this.getElementIndex(elements[0].frameId) : this.elements.length;
    this.insertElementsAtIndex(elements, index);
  };
  getElementIndex(elementId) {
    return this.elements.findIndex((element) => element.id === elementId);
  }
  getContainerElement = (element) => {
    if (!element) {
      return null;
    }
    if (element.containerId) {
      return this.getElement(element.containerId) || null;
    }
    return null;
  };
  getElementsFromId = (id) => {
    const elementsMap = this.getNonDeletedElementsMap();
    const el = elementsMap.get(id);
    if (el) {
      return [el];
    }
    return getElementsInGroup2(elementsMap, id);
  };
  // Mutate an element with passed updates and trigger the component to update. Make sure you
  // are calling it either from a React event handler or within unstable_batchedUpdates().
  mutateElement(element, updates, options = {
    informMutation: true,
    isDragging: false
  }) {
    const elementsMap = this.getNonDeletedElementsMap();
    const { version: prevVersion } = element;
    const { version: nextVersion } = mutateElement2(
      element,
      elementsMap,
      updates,
      options
    );
    if (
      // skip if the element is not in the scene (i.e. selection)
      this.elementsMap.has(element.id) && // skip if the element's version hasn't changed, as mutateElement returned the same element
      prevVersion !== nextVersion && options.informMutation
    ) {
      this.triggerUpdate();
    }
    return element;
  }
};

// src/delta.ts
var Delta = class _Delta {
  constructor(deleted, inserted) {
    this.deleted = deleted;
    this.inserted = inserted;
  }
  static create(deleted, inserted, modifier, modifierOptions) {
    const modifiedDeleted = modifier && modifierOptions !== "inserted" ? modifier(deleted, "deleted") : deleted;
    const modifiedInserted = modifier && modifierOptions !== "deleted" ? modifier(inserted, "inserted") : inserted;
    return new _Delta(modifiedDeleted, modifiedInserted);
  }
  /**
   * Calculates the delta between two objects.
   *
   * @param prevObject - The previous state of the object.
   * @param nextObject - The next state of the object.
   *
   * @returns new delta instance.
   */
  static calculate(prevObject, nextObject, modifier, postProcess) {
    if (prevObject === nextObject) {
      return _Delta.empty();
    }
    const deleted = {};
    const inserted = {};
    for (const key of this.getDifferences(prevObject, nextObject)) {
      deleted[key] = prevObject[key];
      inserted[key] = nextObject[key];
    }
    const [processedDeleted, processedInserted] = postProcess ? postProcess(deleted, inserted) : [deleted, inserted];
    return _Delta.create(processedDeleted, processedInserted, modifier);
  }
  static empty() {
    return new _Delta({}, {});
  }
  static isEmpty(delta) {
    return !Object.keys(delta.deleted).length && !Object.keys(delta.inserted).length;
  }
  /**
   * Merges deleted and inserted object partials.
   */
  static mergeObjects(prev, added, removed) {
    const cloned = { ...prev };
    for (const key of Object.keys(removed)) {
      delete cloned[key];
    }
    return { ...cloned, ...added };
  }
  /**
   * Merges deleted and inserted array partials.
   */
  static mergeArrays(prev, added, removed, predicate) {
    return Object.values(
      _Delta.mergeObjects(
        arrayToObject(prev ?? [], predicate),
        arrayToObject(added ?? [], predicate),
        arrayToObject(removed ?? [], predicate)
      )
    );
  }
  /**
   * Diff object partials as part of the `postProcess`.
   */
  static diffObjects(deleted, inserted, property, setValue) {
    if (!deleted[property] && !inserted[property]) {
      return;
    }
    const isDeletedObject = deleted[property] !== null && typeof deleted[property] === "object";
    const isInsertedObject = inserted[property] !== null && typeof inserted[property] === "object";
    if (isDeletedObject || isInsertedObject) {
      const deletedObject = deleted[property] ?? {};
      const insertedObject = inserted[property] ?? {};
      const deletedDifferences = _Delta.getLeftDifferences(
        deletedObject,
        insertedObject
      ).reduce((acc, curr) => {
        acc[curr] = setValue(deletedObject[curr]);
        return acc;
      }, {});
      const insertedDifferences = _Delta.getRightDifferences(
        deletedObject,
        insertedObject
      ).reduce((acc, curr) => {
        acc[curr] = setValue(insertedObject[curr]);
        return acc;
      }, {});
      if (Object.keys(deletedDifferences).length || Object.keys(insertedDifferences).length) {
        Reflect.set(deleted, property, deletedDifferences);
        Reflect.set(inserted, property, insertedDifferences);
      } else {
        Reflect.deleteProperty(deleted, property);
        Reflect.deleteProperty(inserted, property);
      }
    } else if (deleted[property] === inserted[property]) {
      Reflect.deleteProperty(deleted, property);
      Reflect.deleteProperty(inserted, property);
    }
  }
  /**
   * Diff array partials as part of the `postProcess`.
   */
  static diffArrays(deleted, inserted, property, groupBy) {
    if (!deleted[property] && !inserted[property]) {
      return;
    }
    if (Array.isArray(deleted[property]) || Array.isArray(inserted[property])) {
      const deletedArray = Array.isArray(deleted[property]) ? deleted[property] : [];
      const insertedArray = Array.isArray(inserted[property]) ? inserted[property] : [];
      const deletedDifferences = arrayToObject(
        _Delta.getLeftDifferences(
          arrayToObject(deletedArray, groupBy),
          arrayToObject(insertedArray, groupBy)
        ),
        (x) => x
      );
      const insertedDifferences = arrayToObject(
        _Delta.getRightDifferences(
          arrayToObject(deletedArray, groupBy),
          arrayToObject(insertedArray, groupBy)
        ),
        (x) => x
      );
      if (Object.keys(deletedDifferences).length || Object.keys(insertedDifferences).length) {
        const deletedValue = deletedArray.filter(
          (x) => deletedDifferences[groupBy ? groupBy(x) : String(x)]
        );
        const insertedValue = insertedArray.filter(
          (x) => insertedDifferences[groupBy ? groupBy(x) : String(x)]
        );
        Reflect.set(deleted, property, deletedValue);
        Reflect.set(inserted, property, insertedValue);
      } else {
        Reflect.deleteProperty(deleted, property);
        Reflect.deleteProperty(inserted, property);
      }
    }
  }
  /**
   * Compares if object1 contains any different value compared to the object2.
   */
  static isLeftDifferent(object1, object2, skipShallowCompare = false) {
    const anyDistinctKey = this.distinctKeysIterator(
      "left",
      object1,
      object2,
      skipShallowCompare
    ).next().value;
    return !!anyDistinctKey;
  }
  /**
   * Compares if object2 contains any different value compared to the object1.
   */
  static isRightDifferent(object1, object2, skipShallowCompare = false) {
    const anyDistinctKey = this.distinctKeysIterator(
      "right",
      object1,
      object2,
      skipShallowCompare
    ).next().value;
    return !!anyDistinctKey;
  }
  /**
   * Compares if shared properties of object1 and object2 contain any different value (aka inner join).
   */
  static isInnerDifferent(object1, object2, skipShallowCompare = false) {
    const anyDistinctKey = !!this.distinctKeysIterator(
      "inner",
      object1,
      object2,
      skipShallowCompare
    ).next().value;
    return !!anyDistinctKey;
  }
  /**
   * Compares if any properties of object1 and object2 contain any different value (aka full join).
   */
  static isDifferent(object1, object2, skipShallowCompare = false) {
    const anyDistinctKey = !!this.distinctKeysIterator(
      "full",
      object1,
      object2,
      skipShallowCompare
    ).next().value;
    return !!anyDistinctKey;
  }
  /**
   * Returns sorted object1 keys that have distinct values.
   */
  static getLeftDifferences(object1, object2, skipShallowCompare = false) {
    return Array.from(
      this.distinctKeysIterator("left", object1, object2, skipShallowCompare)
    ).sort();
  }
  /**
   * Returns sorted object2 keys that have distinct values.
   */
  static getRightDifferences(object1, object2, skipShallowCompare = false) {
    return Array.from(
      this.distinctKeysIterator("right", object1, object2, skipShallowCompare)
    ).sort();
  }
  /**
   * Returns sorted keys of shared object1 and object2 properties that have distinct values (aka inner join).
   */
  static getInnerDifferences(object1, object2, skipShallowCompare = false) {
    return Array.from(
      this.distinctKeysIterator("inner", object1, object2, skipShallowCompare)
    ).sort();
  }
  /**
   * Returns sorted keys that have distinct values between object1 and object2 (aka full join).
   */
  static getDifferences(object1, object2, skipShallowCompare = false) {
    return Array.from(
      this.distinctKeysIterator("full", object1, object2, skipShallowCompare)
    ).sort();
  }
  /**
   * Iterator comparing values of object properties based on the passed joining strategy.
   *
   * @yields keys of properties with different values
   *
   * WARN: it's based on shallow compare performed only on the first level and doesn't go deeper than that.
   */
  static *distinctKeysIterator(join, object1, object2, skipShallowCompare = false) {
    if (object1 === object2) {
      return;
    }
    let keys = [];
    if (join === "left") {
      keys = Object.keys(object1);
    } else if (join === "right") {
      keys = Object.keys(object2);
    } else if (join === "inner") {
      keys = Object.keys(object1).filter((key) => key in object2);
    } else if (join === "full") {
      keys = Array.from(
        /* @__PURE__ */ new Set([...Object.keys(object1), ...Object.keys(object2)])
      );
    } else {
      assertNever4(
        join,
        `Unknown distinctKeysIterator's join param "${join}"`,
        true
      );
    }
    for (const key of keys) {
      const value1 = object1[key];
      const value2 = object2[key];
      if (value1 !== value2) {
        if (!skipShallowCompare && typeof value1 === "object" && typeof value2 === "object" && value1 !== null && value2 !== null && isShallowEqual2(value1, value2)) {
          continue;
        }
        yield key;
      }
    }
  }
};
var AppStateDelta = class _AppStateDelta {
  constructor(delta) {
    this.delta = delta;
  }
  static calculate(prevAppState, nextAppState) {
    const delta = Delta.calculate(
      prevAppState,
      nextAppState,
      // making the order of keys in deltas stable for hashing purposes
      _AppStateDelta.orderAppStateKeys,
      _AppStateDelta.postProcess
    );
    return new _AppStateDelta(delta);
  }
  static restore(appStateDeltaDTO) {
    const { delta } = appStateDeltaDTO;
    return new _AppStateDelta(delta);
  }
  static empty() {
    return new _AppStateDelta(Delta.create({}, {}));
  }
  inverse() {
    const inversedDelta = Delta.create(this.delta.inserted, this.delta.deleted);
    return new _AppStateDelta(inversedDelta);
  }
  applyTo(appState, nextElements) {
    try {
      const {
        selectedElementIds: removedSelectedElementIds = {},
        selectedGroupIds: removedSelectedGroupIds = {}
      } = this.delta.deleted;
      const {
        selectedElementIds: addedSelectedElementIds = {},
        selectedGroupIds: addedSelectedGroupIds = {},
        selectedLinearElementId,
        editingLinearElementId,
        ...directlyApplicablePartial
      } = this.delta.inserted;
      const mergedSelectedElementIds = Delta.mergeObjects(
        appState.selectedElementIds,
        addedSelectedElementIds,
        removedSelectedElementIds
      );
      const mergedSelectedGroupIds = Delta.mergeObjects(
        appState.selectedGroupIds,
        addedSelectedGroupIds,
        removedSelectedGroupIds
      );
      const selectedLinearElement = selectedLinearElementId && nextElements.has(selectedLinearElementId) ? new LinearElementEditor(
        nextElements.get(
          selectedLinearElementId
        ),
        nextElements
      ) : null;
      const editingLinearElement = editingLinearElementId && nextElements.has(editingLinearElementId) ? new LinearElementEditor(
        nextElements.get(
          editingLinearElementId
        ),
        nextElements
      ) : null;
      const nextAppState = {
        ...appState,
        ...directlyApplicablePartial,
        selectedElementIds: mergedSelectedElementIds,
        selectedGroupIds: mergedSelectedGroupIds,
        selectedLinearElement: typeof selectedLinearElementId !== "undefined" ? selectedLinearElement : appState.selectedLinearElement,
        // otherwise assign what we had before
        editingLinearElement: typeof editingLinearElementId !== "undefined" ? editingLinearElement : appState.editingLinearElement
        // otherwise assign what we had before
      };
      const constainsVisibleChanges = this.filterInvisibleChanges(
        appState,
        nextAppState,
        nextElements
      );
      return [nextAppState, constainsVisibleChanges];
    } catch (e) {
      console.error(`Couldn't apply appstate change`, e);
      if (isTestEnv8() || isDevEnv7()) {
        throw e;
      }
      return [appState, false];
    }
  }
  isEmpty() {
    return Delta.isEmpty(this.delta);
  }
  /**
   * Mutates `nextAppState` be filtering out state related to deleted elements.
   *
   * @returns `true` if a visible change is found, `false` otherwise.
   */
  filterInvisibleChanges(prevAppState, nextAppState, nextElements) {
    const prevObservedAppState = getObservedAppState(prevAppState);
    const nextObservedAppState = getObservedAppState(nextAppState);
    const containsStandaloneDifference = Delta.isRightDifferent(
      _AppStateDelta.stripElementsProps(prevObservedAppState),
      _AppStateDelta.stripElementsProps(nextObservedAppState)
    );
    const containsElementsDifference = Delta.isRightDifferent(
      _AppStateDelta.stripStandaloneProps(prevObservedAppState),
      _AppStateDelta.stripStandaloneProps(nextObservedAppState)
    );
    if (!containsStandaloneDifference && !containsElementsDifference) {
      return false;
    }
    const visibleDifferenceFlag = {
      value: containsStandaloneDifference
    };
    if (containsElementsDifference) {
      const changedElementsProps = Delta.getRightDifferences(
        _AppStateDelta.stripStandaloneProps(prevObservedAppState),
        _AppStateDelta.stripStandaloneProps(nextObservedAppState)
      );
      let nonDeletedGroupIds = /* @__PURE__ */ new Set();
      if (changedElementsProps.includes("editingGroupId") || changedElementsProps.includes("selectedGroupIds")) {
        nonDeletedGroupIds = getNonDeletedGroupIds(nextElements);
      }
      for (const key of changedElementsProps) {
        switch (key) {
          case "selectedElementIds":
            nextAppState[key] = _AppStateDelta.filterSelectedElements(
              nextAppState[key],
              nextElements,
              visibleDifferenceFlag
            );
            break;
          case "selectedGroupIds":
            nextAppState[key] = _AppStateDelta.filterSelectedGroups(
              nextAppState[key],
              nonDeletedGroupIds,
              visibleDifferenceFlag
            );
            break;
          case "croppingElementId": {
            const croppingElementId = nextAppState[key];
            if (!croppingElementId) {
              visibleDifferenceFlag.value = true;
            } else {
              const element = nextElements.get(croppingElementId);
              if (element && !element.isDeleted) {
                visibleDifferenceFlag.value = true;
              } else {
                nextAppState[key] = null;
              }
            }
            break;
          }
          case "editingGroupId":
            const editingGroupId = nextAppState[key];
            if (!editingGroupId) {
              visibleDifferenceFlag.value = true;
            } else if (nonDeletedGroupIds.has(editingGroupId)) {
              visibleDifferenceFlag.value = true;
            } else {
              nextAppState[key] = null;
            }
            break;
          case "selectedLinearElementId":
          case "editingLinearElementId":
            const appStateKey = _AppStateDelta.convertToAppStateKey(key);
            const linearElement = nextAppState[appStateKey];
            if (!linearElement) {
              visibleDifferenceFlag.value = true;
            } else {
              const element = nextElements.get(linearElement.elementId);
              if (element && !element.isDeleted) {
                visibleDifferenceFlag.value = true;
              } else {
                nextAppState[appStateKey] = null;
              }
            }
            break;
          case "lockedMultiSelections": {
            const prevLockedUnits = prevAppState[key] || {};
            const nextLockedUnits = nextAppState[key] || {};
            if (!isShallowEqual2(prevLockedUnits, nextLockedUnits)) {
              visibleDifferenceFlag.value = true;
            }
            break;
          }
          case "activeLockedId": {
            const prevHitLockedId = prevAppState[key] || null;
            const nextHitLockedId = nextAppState[key] || null;
            if (prevHitLockedId !== nextHitLockedId) {
              visibleDifferenceFlag.value = true;
            }
            break;
          }
          default: {
            assertNever4(
              key,
              `Unknown ObservedElementsAppState's key "${key}"`,
              true
            );
          }
        }
      }
    }
    return visibleDifferenceFlag.value;
  }
  static convertToAppStateKey(key) {
    switch (key) {
      case "selectedLinearElementId":
        return "selectedLinearElement";
      case "editingLinearElementId":
        return "editingLinearElement";
    }
  }
  static filterSelectedElements(selectedElementIds, elements, visibleDifferenceFlag) {
    const ids = Object.keys(selectedElementIds);
    if (!ids.length) {
      visibleDifferenceFlag.value = true;
      return selectedElementIds;
    }
    const nextSelectedElementIds = { ...selectedElementIds };
    for (const id of ids) {
      const element = elements.get(id);
      if (element && !element.isDeleted) {
        visibleDifferenceFlag.value = true;
      } else {
        delete nextSelectedElementIds[id];
      }
    }
    return nextSelectedElementIds;
  }
  static filterSelectedGroups(selectedGroupIds, nonDeletedGroupIds, visibleDifferenceFlag) {
    const ids = Object.keys(selectedGroupIds);
    if (!ids.length) {
      visibleDifferenceFlag.value = true;
      return selectedGroupIds;
    }
    const nextSelectedGroupIds = { ...selectedGroupIds };
    for (const id of Object.keys(nextSelectedGroupIds)) {
      if (nonDeletedGroupIds.has(id)) {
        visibleDifferenceFlag.value = true;
      } else {
        delete nextSelectedGroupIds[id];
      }
    }
    return nextSelectedGroupIds;
  }
  static stripElementsProps(delta) {
    const {
      editingGroupId,
      selectedGroupIds,
      selectedElementIds,
      editingLinearElementId,
      selectedLinearElementId,
      croppingElementId,
      lockedMultiSelections,
      activeLockedId,
      ...standaloneProps
    } = delta;
    return standaloneProps;
  }
  static stripStandaloneProps(delta) {
    const { name, viewBackgroundColor, ...elementsProps } = delta;
    return elementsProps;
  }
  /**
   * It is necessary to post process the partials in case of reference values,
   * for which we need to calculate the real diff between `deleted` and `inserted`.
   */
  static postProcess(deleted, inserted) {
    try {
      Delta.diffObjects(
        deleted,
        inserted,
        "selectedElementIds",
        // ts language server has a bit trouble resolving this, so we are giving it a little push
        (_) => true
      );
      Delta.diffObjects(
        deleted,
        inserted,
        "selectedGroupIds",
        (prevValue) => prevValue ?? false
      );
      Delta.diffObjects(
        deleted,
        inserted,
        "lockedMultiSelections",
        (prevValue) => prevValue ?? {}
      );
      Delta.diffObjects(
        deleted,
        inserted,
        "activeLockedId",
        (prevValue) => prevValue ?? null
      );
    } catch (e) {
      console.error(`Couldn't postprocess appstate change deltas.`);
      if (isTestEnv8() || isDevEnv7()) {
        throw e;
      }
    } finally {
      return [deleted, inserted];
    }
  }
  static orderAppStateKeys(partial) {
    const orderedPartial = {};
    for (const key of Object.keys(partial).sort()) {
      orderedPartial[key] = partial[key];
    }
    return orderedPartial;
  }
};
var ElementsDelta = class _ElementsDelta {
  constructor(added, removed, updated) {
    this.added = added;
    this.removed = removed;
    this.updated = updated;
  }
  static create(added, removed, updated, options = {
    shouldRedistribute: false
  }) {
    let delta;
    if (options.shouldRedistribute) {
      const nextAdded = {};
      const nextRemoved = {};
      const nextUpdated = {};
      const deltas = [
        ...Object.entries(added),
        ...Object.entries(removed),
        ...Object.entries(updated)
      ];
      for (const [id, delta2] of deltas) {
        if (this.satisfiesAddition(delta2)) {
          nextAdded[id] = delta2;
        } else if (this.satisfiesRemoval(delta2)) {
          nextRemoved[id] = delta2;
        } else {
          nextUpdated[id] = delta2;
        }
      }
      delta = new _ElementsDelta(nextAdded, nextRemoved, nextUpdated);
    } else {
      delta = new _ElementsDelta(added, removed, updated);
    }
    if (isTestEnv8() || isDevEnv7()) {
      _ElementsDelta.validate(delta, "added", this.satisfiesAddition);
      _ElementsDelta.validate(delta, "removed", this.satisfiesRemoval);
      _ElementsDelta.validate(delta, "updated", this.satisfiesUpdate);
    }
    return delta;
  }
  static restore(elementsDeltaDTO) {
    const { added, removed, updated } = elementsDeltaDTO;
    return _ElementsDelta.create(added, removed, updated);
  }
  static satisfiesAddition = ({
    deleted,
    inserted
  }) => (
    // dissallowing added as "deleted", which could cause issues when resolving conflicts
    deleted.isDeleted === true && !inserted.isDeleted
  );
  static satisfiesRemoval = ({
    deleted,
    inserted
  }) => !deleted.isDeleted && inserted.isDeleted === true;
  static satisfiesUpdate = ({
    deleted,
    inserted
  }) => !!deleted.isDeleted === !!inserted.isDeleted;
  static satisfiesCommmonInvariants = ({
    deleted,
    inserted
  }) => !!(deleted.version && inserted.version && // versions are required integers
  Number.isInteger(deleted.version) && Number.isInteger(inserted.version) && // versions should be positive, zero included
  deleted.version >= 0 && inserted.version >= 0 && // versions should never be the same
  deleted.version !== inserted.version);
  static validate(elementsDelta, type, satifiesSpecialInvariants) {
    for (const [id, delta] of Object.entries(elementsDelta[type])) {
      if (!this.satisfiesCommmonInvariants(delta) || !satifiesSpecialInvariants(delta)) {
        console.error(
          `Broken invariant for "${type}" delta, element "${id}", delta:`,
          delta
        );
        throw new Error(`ElementsDelta invariant broken for element "${id}".`);
      }
    }
  }
  /**
   * Calculates the `Delta`s between the previous and next set of elements.
   *
   * @param prevElements - Map representing the previous state of elements.
   * @param nextElements - Map representing the next state of elements.
   *
   * @returns `ElementsDelta` instance representing the `Delta` changes between the two sets of elements.
   */
  static calculate(prevElements, nextElements) {
    if (prevElements === nextElements) {
      return _ElementsDelta.empty();
    }
    const added = {};
    const removed = {};
    const updated = {};
    for (const prevElement of prevElements.values()) {
      const nextElement = nextElements.get(prevElement.id);
      if (!nextElement) {
        const deleted = { ...prevElement, isDeleted: false };
        const inserted = {
          isDeleted: true,
          version: prevElement.version + 1,
          versionNonce: randomInteger4()
        };
        const delta = Delta.create(
          deleted,
          inserted,
          _ElementsDelta.stripIrrelevantProps
        );
        removed[prevElement.id] = delta;
      }
    }
    for (const nextElement of nextElements.values()) {
      const prevElement = prevElements.get(nextElement.id);
      if (!prevElement) {
        const deleted = {
          isDeleted: true,
          version: nextElement.version - 1,
          versionNonce: randomInteger4()
        };
        const inserted = {
          ...nextElement,
          isDeleted: false
        };
        const delta = Delta.create(
          deleted,
          inserted,
          _ElementsDelta.stripIrrelevantProps
        );
        added[nextElement.id] = delta;
        continue;
      }
      if (prevElement.versionNonce !== nextElement.versionNonce) {
        const delta = Delta.calculate(
          prevElement,
          nextElement,
          _ElementsDelta.stripIrrelevantProps,
          _ElementsDelta.postProcess
        );
        if (
          // making sure we don't get here some non-boolean values (i.e. undefined, null, etc.)
          typeof prevElement.isDeleted === "boolean" && typeof nextElement.isDeleted === "boolean" && prevElement.isDeleted !== nextElement.isDeleted
        ) {
          if (prevElement.isDeleted && !nextElement.isDeleted) {
            added[nextElement.id] = delta;
          } else {
            removed[nextElement.id] = delta;
          }
          continue;
        }
        if (!Delta.isEmpty(delta)) {
          updated[nextElement.id] = delta;
        }
      }
    }
    return _ElementsDelta.create(added, removed, updated);
  }
  static empty() {
    return _ElementsDelta.create({}, {}, {});
  }
  inverse() {
    const inverseInternal = (deltas) => {
      const inversedDeltas = {};
      for (const [id, delta] of Object.entries(deltas)) {
        inversedDeltas[id] = Delta.create(delta.inserted, delta.deleted);
      }
      return inversedDeltas;
    };
    const added = inverseInternal(this.added);
    const removed = inverseInternal(this.removed);
    const updated = inverseInternal(this.updated);
    return _ElementsDelta.create(removed, added, updated);
  }
  isEmpty() {
    return Object.keys(this.added).length === 0 && Object.keys(this.removed).length === 0 && Object.keys(this.updated).length === 0;
  }
  /**
   * Update delta/s based on the existing elements.
   *
   * @param nextElements current elements
   * @param modifierOptions defines which of the delta (`deleted` or `inserted`) will be updated
   * @returns new instance with modified delta/s
   */
  applyLatestChanges(prevElements, nextElements, modifierOptions) {
    const modifier = (prevElement, nextElement) => (partial, partialType) => {
      let element;
      switch (partialType) {
        case "deleted":
          element = prevElement;
          break;
        case "inserted":
          element = nextElement;
          break;
      }
      if (!element) {
        console.error(
          `Element not found when trying to apply latest changes`
        );
        return partial;
      }
      const latestPartial = {};
      for (const key of Object.keys(partial)) {
        switch (key) {
          case "boundElements":
            latestPartial[key] = partial[key];
            break;
          default:
            latestPartial[key] = element[key];
        }
      }
      return latestPartial;
    };
    const applyLatestChangesInternal = (deltas) => {
      const modifiedDeltas = {};
      for (const [id, delta] of Object.entries(deltas)) {
        const prevElement = prevElements.get(id);
        const nextElement = nextElements.get(id);
        let latestDelta = null;
        if (prevElement || nextElement) {
          latestDelta = Delta.create(
            delta.deleted,
            delta.inserted,
            modifier(prevElement, nextElement),
            modifierOptions
          );
        } else {
          latestDelta = delta;
        }
        if (Delta.isInnerDifferent(latestDelta.deleted, latestDelta.inserted)) {
          modifiedDeltas[id] = latestDelta;
        }
      }
      return modifiedDeltas;
    };
    const added = applyLatestChangesInternal(this.added);
    const removed = applyLatestChangesInternal(this.removed);
    const updated = applyLatestChangesInternal(this.updated);
    return _ElementsDelta.create(added, removed, updated, {
      shouldRedistribute: true
      // redistribute the deltas as `isDeleted` could have been updated
    });
  }
  applyTo(elements, snapshot = StoreSnapshot.empty().elements, options = {
    excludedProperties: /* @__PURE__ */ new Set()
  }) {
    let nextElements = new Map(elements);
    let changedElements;
    const flags = {
      containsVisibleDifference: false,
      containsZindexDifference: false
    };
    try {
      const applyDeltas = _ElementsDelta.createApplier(
        nextElements,
        snapshot,
        options,
        flags
      );
      const addedElements = applyDeltas(this.added);
      const removedElements = applyDeltas(this.removed);
      const updatedElements = applyDeltas(this.updated);
      const affectedElements = this.resolveConflicts(elements, nextElements);
      changedElements = new Map([
        ...addedElements,
        ...removedElements,
        ...updatedElements,
        ...affectedElements
      ]);
    } catch (e) {
      console.error(`Couldn't apply elements delta`, e);
      if (isTestEnv8() || isDevEnv7()) {
        throw e;
      }
      return [elements, true];
    }
    try {
      nextElements = _ElementsDelta.reorderElements(
        nextElements,
        changedElements,
        flags
      );
      const tempScene = new Scene(nextElements);
      _ElementsDelta.redrawTextBoundingBoxes(tempScene, changedElements);
      _ElementsDelta.redrawBoundArrows(tempScene, changedElements);
    } catch (e) {
      console.error(
        `Couldn't mutate elements after applying elements change`,
        e
      );
      if (isTestEnv8() || isDevEnv7()) {
        throw e;
      }
    } finally {
      return [nextElements, flags.containsVisibleDifference];
    }
  }
  static createApplier = (nextElements, snapshot, options, flags) => (deltas) => {
    const getElement = _ElementsDelta.createGetter(
      nextElements,
      snapshot,
      flags
    );
    return Object.entries(deltas).reduce((acc, [id, delta]) => {
      const element = getElement(id, delta.inserted);
      if (element) {
        const newElement2 = _ElementsDelta.applyDelta(
          element,
          delta,
          options,
          flags
        );
        nextElements.set(newElement2.id, newElement2);
        acc.set(newElement2.id, newElement2);
      }
      return acc;
    }, /* @__PURE__ */ new Map());
  };
  static createGetter = (elements, snapshot, flags) => (id, partial) => {
    let element = elements.get(id);
    if (!element) {
      element = snapshot.get(id);
      if (element) {
        flags.containsZindexDifference = true;
        if (!partial.isDeleted || partial.isDeleted && !element.isDeleted) {
          flags.containsVisibleDifference = true;
        }
      } else {
        element = newElementWith(
          { id, version: 1 },
          {
            ...partial
          }
        );
      }
    }
    return element;
  };
  static applyDelta(element, delta, options, flags) {
    const directlyApplicablePartial = {};
    for (const key of Object.keys(delta.inserted)) {
      if (key === "boundElements") {
        continue;
      }
      if (options.excludedProperties.has(key)) {
        continue;
      }
      const value = delta.inserted[key];
      Reflect.set(directlyApplicablePartial, key, value);
    }
    if (delta.deleted.boundElements?.length || delta.inserted.boundElements?.length) {
      const mergedBoundElements = Delta.mergeArrays(
        element.boundElements,
        delta.inserted.boundElements,
        delta.deleted.boundElements,
        (x) => x.id
      );
      Object.assign(directlyApplicablePartial, {
        boundElements: mergedBoundElements
      });
    }
    if (!flags.containsVisibleDifference) {
      const { index, ...rest } = directlyApplicablePartial;
      const containsVisibleDifference = _ElementsDelta.checkForVisibleDifference(
        element,
        rest
      );
      flags.containsVisibleDifference = containsVisibleDifference;
    }
    if (!flags.containsZindexDifference) {
      flags.containsZindexDifference = delta.deleted.index !== delta.inserted.index;
    }
    return newElementWith(element, directlyApplicablePartial);
  }
  /**
   * Check for visible changes regardless of whether they were removed, added or updated.
   */
  static checkForVisibleDifference(element, partial) {
    if (element.isDeleted && partial.isDeleted !== false) {
      return false;
    }
    if (element.isDeleted && partial.isDeleted === false) {
      return true;
    }
    if (element.isDeleted === false && partial.isDeleted) {
      return true;
    }
    return Delta.isRightDifferent(element, partial);
  }
  /**
   * Resolves conflicts for all previously added, removed and updated elements.
   * Updates the previous deltas with all the changes after conflict resolution.
   *
   * // TODO: revisit since some bound arrows seem to be often redrawn incorrectly
   *
   * @returns all elements affected by the conflict resolution
   */
  resolveConflicts(prevElements, nextElements) {
    const nextAffectedElements = /* @__PURE__ */ new Map();
    const updater = (element, updates) => {
      const nextElement = nextElements.get(element.id);
      if (!nextElement) {
        return;
      }
      let affectedElement;
      if (prevElements.get(element.id) === nextElement) {
        affectedElement = newElementWith(
          nextElement,
          updates
        );
      } else {
        affectedElement = mutateElement(
          nextElement,
          nextElements,
          updates
        );
      }
      nextAffectedElements.set(affectedElement.id, affectedElement);
      nextElements.set(affectedElement.id, affectedElement);
    };
    for (const id of Object.keys(this.removed)) {
      _ElementsDelta.unbindAffected(prevElements, nextElements, id, updater);
    }
    for (const id of Object.keys(this.added)) {
      _ElementsDelta.rebindAffected(prevElements, nextElements, id, updater);
    }
    for (const [id] of Array.from(Object.entries(this.updated)).filter(
      ([_, delta]) => Object.keys({ ...delta.deleted, ...delta.inserted }).find(
        (prop) => bindingProperties.has(prop)
      )
    )) {
      const updatedElement = nextElements.get(id);
      if (!updatedElement || updatedElement.isDeleted) {
        continue;
      }
      _ElementsDelta.rebindAffected(prevElements, nextElements, id, updater);
    }
    const prevAffectedElements = new Map(
      Array.from(prevElements).filter(([id]) => nextAffectedElements.has(id))
    );
    const { added, removed, updated } = _ElementsDelta.calculate(
      prevAffectedElements,
      nextAffectedElements
    );
    for (const [id, delta] of Object.entries(added)) {
      this.added[id] = delta;
    }
    for (const [id, delta] of Object.entries(removed)) {
      this.removed[id] = delta;
    }
    for (const [id, delta] of Object.entries(updated)) {
      this.updated[id] = delta;
    }
    return nextAffectedElements;
  }
  /**
   * Non deleted affected elements of removed elements (before and after applying delta),
   * should be unbound ~ bindings should not point from non deleted into the deleted element/s.
   */
  static unbindAffected(prevElements, nextElements, id, updater) {
    const prevElement = () => prevElements.get(id);
    const nextElement = () => nextElements.get(id);
    BoundElement.unbindAffected(nextElements, prevElement(), updater);
    BoundElement.unbindAffected(nextElements, nextElement(), updater);
    BindableElement.unbindAffected(nextElements, prevElement(), updater);
    BindableElement.unbindAffected(nextElements, nextElement(), updater);
  }
  /**
   * Non deleted affected elements of added or updated element/s (before and after applying delta),
   * should be rebound (if possible) with the current element ~ bindings should be bidirectional.
   */
  static rebindAffected(prevElements, nextElements, id, updater) {
    const prevElement = () => prevElements.get(id);
    const nextElement = () => nextElements.get(id);
    BoundElement.unbindAffected(nextElements, prevElement(), updater);
    BoundElement.rebindAffected(nextElements, nextElement(), updater);
    BindableElement.unbindAffected(
      nextElements,
      prevElement(),
      (element, updates) => {
        if (isTextElement(element)) {
          updater(element, updates);
        }
      }
    );
    BindableElement.rebindAffected(nextElements, nextElement(), updater);
  }
  static redrawTextBoundingBoxes(scene, changed) {
    const elements = scene.getNonDeletedElementsMap();
    const boxesToRedraw = /* @__PURE__ */ new Map();
    for (const element of changed.values()) {
      if (isBoundToContainer(element)) {
        const { containerId } = element;
        const container = containerId ? elements.get(containerId) : void 0;
        if (container) {
          boxesToRedraw.set(container.id, {
            container,
            boundText: element
          });
        }
      }
      if (hasBoundTextElement(element)) {
        const boundTextElementId = getBoundTextElementId(element);
        const boundText = boundTextElementId ? elements.get(boundTextElementId) : void 0;
        if (boundText) {
          boxesToRedraw.set(element.id, {
            container: element,
            boundText
          });
        }
      }
    }
    for (const { container, boundText } of boxesToRedraw.values()) {
      if (container.isDeleted || boundText.isDeleted) {
        continue;
      }
      redrawTextBoundingBox(boundText, container, scene);
    }
  }
  static redrawBoundArrows(scene, changed) {
    for (const element of changed.values()) {
      if (!element.isDeleted && isBindableElement(element)) {
        updateBoundElements(element, scene, {
          changedElements: changed
        });
      }
    }
  }
  static reorderElements(elements, changed, flags) {
    if (!flags.containsZindexDifference) {
      return elements;
    }
    const unordered = Array.from(elements.values());
    const ordered = orderByFractionalIndex([...unordered]);
    const moved = Delta.getRightDifferences(unordered, ordered, true).reduce(
      (acc, arrayIndex) => {
        const candidate = unordered[Number(arrayIndex)];
        if (candidate && changed.has(candidate.id)) {
          acc.set(candidate.id, candidate);
        }
        return acc;
      },
      /* @__PURE__ */ new Map()
    );
    if (!flags.containsVisibleDifference && moved.size) {
      flags.containsVisibleDifference = true;
    }
    return arrayToMap10(syncMovedIndices(ordered, moved));
  }
  /**
   * It is necessary to post process the partials in case of reference values,
   * for which we need to calculate the real diff between `deleted` and `inserted`.
   */
  static postProcess(deleted, inserted) {
    try {
      Delta.diffArrays(deleted, inserted, "boundElements", (x) => x.id);
      const deletedPoints = deleted.points ?? [];
      const insertedPoints = inserted.points ?? [];
      if (!Delta.isDifferent(deletedPoints, insertedPoints)) {
        Reflect.deleteProperty(deleted, "points");
        Reflect.deleteProperty(inserted, "points");
      }
    } catch (e) {
      console.error(`Couldn't postprocess elements delta.`);
      if (isTestEnv8() || isDevEnv7()) {
        throw e;
      }
    } finally {
      return [deleted, inserted];
    }
  }
  static stripIrrelevantProps(partial) {
    const { id, updated, ...strippedPartial } = partial;
    return strippedPartial;
  }
};

// src/distribute.ts
init_define_import_meta_env();
var distributeElements = (selectedElements, elementsMap, distribution) => {
  const [start, mid, end, extent] = distribution.axis === "x" ? ["minX", "midX", "maxX", "width"] : ["minY", "midY", "maxY", "height"];
  const bounds = getCommonBoundingBox(selectedElements);
  const groups = getMaximumGroups(selectedElements, elementsMap).map((group) => [group, getCommonBoundingBox(group)]).sort((a2, b2) => a2[1][mid] - b2[1][mid]);
  let span = 0;
  for (const group of groups) {
    span += group[1][extent];
  }
  const step = (bounds[extent] - span) / (groups.length - 1);
  if (step < 0) {
    const index0 = groups.findIndex((g) => g[1][start] === bounds[start]);
    const index1 = groups.findIndex((g) => g[1][end] === bounds[end]);
    const step2 = (groups[index1][1][mid] - groups[index0][1][mid]) / (groups.length - 1);
    let pos2 = groups[index0][1][mid];
    return groups.flatMap(([group, box], index) => {
      const translation = {
        x: 0,
        y: 0
      };
      if (index !== index0 && index !== index1) {
        pos2 += step2;
        translation[distribution.axis] = pos2 - box[mid];
      }
      return group.map(
        (element) => newElementWith(element, {
          x: element.x + translation.x,
          y: element.y + translation.y
        })
      );
    });
  }
  let pos = bounds[start];
  return groups.flatMap(([group, box]) => {
    const translation = {
      x: 0,
      y: 0
    };
    translation[distribution.axis] = pos - box[start];
    pos += step;
    pos += box[extent];
    return group.map(
      (element) => newElementWith(element, {
        x: element.x + translation.x,
        y: element.y + translation.y
      })
    );
  });
};

// src/dragElements.ts
init_define_import_meta_env();
import {
  TEXT_AUTOWRAP_THRESHOLD,
  getGridPoint as getGridPoint2,
  getFontString as getFontString4
} from "@excalidraw/common";
var dragSelectedElements = (pointerDownState, _selectedElements, offset, scene, snapOffset, gridSize) => {
  if (_selectedElements.length === 1 && isElbowArrow(_selectedElements[0]) && (_selectedElements[0].startBinding || _selectedElements[0].endBinding)) {
    return;
  }
  const selectedElements = _selectedElements.filter((element) => {
    if (isElbowArrow(element) && element.startBinding && element.endBinding) {
      const startElement = _selectedElements.find(
        (el) => el.id === element.startBinding?.elementId
      );
      const endElement = _selectedElements.find(
        (el) => el.id === element.endBinding?.elementId
      );
      return startElement && endElement;
    }
    return true;
  });
  const elementsToUpdate = new Set(
    selectedElements
  );
  const frames = selectedElements.filter((e) => isFrameLikeElement(e)).map((f) => f.id);
  if (frames.length > 0) {
    for (const element of scene.getNonDeletedElements()) {
      if (element.frameId !== null && frames.includes(element.frameId)) {
        elementsToUpdate.add(element);
      }
    }
  }
  const origElements = [];
  for (const element of elementsToUpdate) {
    const origElement = pointerDownState.originalElements.get(element.id);
    if (!origElement) {
      return;
    }
    origElements.push(origElement);
  }
  const adjustedOffset = calculateOffset(
    getCommonBounds(origElements),
    offset,
    snapOffset,
    gridSize
  );
  elementsToUpdate.forEach((element) => {
    updateElementCoords(pointerDownState, element, scene, adjustedOffset);
    if (!isArrowElement(element)) {
      const textElement = getBoundTextElement(
        element,
        scene.getNonDeletedElementsMap()
      );
      if (textElement) {
        updateElementCoords(
          pointerDownState,
          textElement,
          scene,
          adjustedOffset
        );
      }
      updateBoundElements(element, scene, {
        simultaneouslyUpdated: Array.from(elementsToUpdate)
      });
    }
  });
};
var calculateOffset = (commonBounds, dragOffset, snapOffset, gridSize) => {
  const [x, y] = commonBounds;
  let nextX = x + dragOffset.x + snapOffset.x;
  let nextY = y + dragOffset.y + snapOffset.y;
  if (snapOffset.x === 0 || snapOffset.y === 0) {
    const [nextGridX, nextGridY] = getGridPoint2(
      x + dragOffset.x,
      y + dragOffset.y,
      gridSize
    );
    if (snapOffset.x === 0) {
      nextX = nextGridX;
    }
    if (snapOffset.y === 0) {
      nextY = nextGridY;
    }
  }
  return {
    x: nextX - x,
    y: nextY - y
  };
};
var updateElementCoords = (pointerDownState, element, scene, dragOffset) => {
  const originalElement = pointerDownState.originalElements.get(element.id) ?? element;
  const nextX = originalElement.x + dragOffset.x;
  const nextY = originalElement.y + dragOffset.y;
  scene.mutateElement(element, {
    x: nextX,
    y: nextY
  });
};
var getDragOffsetXY = (selectedElements, x, y) => {
  const [x1, y1] = getCommonBounds(selectedElements);
  return [x - x1, y - y1];
};
var dragNewElement = ({
  newElement: newElement2,
  elementType,
  originX,
  originY,
  x,
  y,
  width,
  height,
  shouldMaintainAspectRatio,
  shouldResizeFromCenter,
  zoom,
  scene,
  widthAspectRatio = null,
  originOffset = null,
  informMutation = true
}) => {
  if (shouldMaintainAspectRatio && newElement2.type !== "selection") {
    if (widthAspectRatio) {
      height = width / widthAspectRatio;
    } else {
      if (Math.abs(y - originY) > Math.abs(x - originX)) {
        ({ width, height } = getPerfectElementSize(
          elementType,
          height,
          x < originX ? -width : width
        ));
      } else {
        ({ width, height } = getPerfectElementSize(
          elementType,
          width,
          y < originY ? -height : height
        ));
      }
      if (height < 0) {
        height = -height;
      }
    }
  }
  let newX = x < originX ? originX - width : originX;
  let newY = y < originY ? originY - height : originY;
  if (shouldResizeFromCenter) {
    width += width;
    height += height;
    newX = originX - width / 2;
    newY = originY - height / 2;
  }
  let textAutoResize = null;
  if (isTextElement(newElement2)) {
    height = newElement2.height;
    const minWidth = getMinTextElementWidth(
      getFontString4({
        fontSize: newElement2.fontSize,
        fontFamily: newElement2.fontFamily
      }),
      newElement2.lineHeight
    );
    width = Math.max(width, minWidth);
    if (Math.abs(x - originX) > TEXT_AUTOWRAP_THRESHOLD / zoom) {
      textAutoResize = {
        autoResize: false
      };
    }
    newY = originY;
    if (shouldResizeFromCenter) {
      newX = originX - width / 2;
    }
  }
  if (width !== 0 && height !== 0) {
    let imageInitialDimension = null;
    if (isImageElement(newElement2)) {
      imageInitialDimension = {
        initialWidth: width,
        initialHeight: height
      };
    }
    scene.mutateElement(
      newElement2,
      {
        x: newX + (originOffset?.x ?? 0),
        y: newY + (originOffset?.y ?? 0),
        width,
        height,
        ...textAutoResize,
        ...imageInitialDimension
      },
      { informMutation, isDragging: false }
    );
  }
};

// src/elementLink.ts
init_define_import_meta_env();
import { ELEMENT_LINK_KEY, normalizeLink } from "@excalidraw/common";
var defaultGetElementLinkFromSelection = (id, type) => {
  const url = window.location.href;
  try {
    const link = new URL(url);
    link.searchParams.set(ELEMENT_LINK_KEY, id);
    return normalizeLink(link.toString());
  } catch (error) {
    console.error(error);
  }
  return normalizeLink(url);
};
var getLinkIdAndTypeFromSelection = (selectedElements, appState) => {
  if (selectedElements.length > 0 && canCreateLinkFromElements(selectedElements)) {
    if (selectedElements.length === 1) {
      return {
        id: selectedElements[0].id,
        type: "element"
      };
    }
    if (selectedElements.length > 1) {
      const selectedGroupId = Object.keys(appState.selectedGroupIds)[0];
      if (selectedGroupId) {
        return {
          id: selectedGroupId,
          type: "group"
        };
      }
      return {
        id: selectedElements[0].groupIds[0],
        type: "group"
      };
    }
  }
  return null;
};
var canCreateLinkFromElements = (selectedElements) => {
  if (selectedElements.length === 1) {
    return true;
  }
  if (selectedElements.length > 1 && elementsAreInSameGroup(selectedElements)) {
    return true;
  }
  return false;
};
var isElementLink = (url) => {
  try {
    const _url = new URL(url);
    return _url.searchParams.has(ELEMENT_LINK_KEY) && _url.host === window.location.host;
  } catch (error) {
    return false;
  }
};
var parseElementLinkFromURL = (url) => {
  try {
    const { searchParams } = new URL(url);
    if (searchParams.has(ELEMENT_LINK_KEY)) {
      const id = searchParams.get(ELEMENT_LINK_KEY);
      return id;
    }
  } catch {
  }
  return null;
};

// src/embeddable.ts
init_define_import_meta_env();
import {
  FONT_FAMILY,
  VERTICAL_ALIGN as VERTICAL_ALIGN3,
  escapeDoubleQuotes,
  getFontString as getFontString6
} from "@excalidraw/common";

// src/newElement.ts
init_define_import_meta_env();
import {
  DEFAULT_ELEMENT_PROPS,
  DEFAULT_FONT_FAMILY as DEFAULT_FONT_FAMILY2,
  DEFAULT_FONT_SIZE as DEFAULT_FONT_SIZE3,
  DEFAULT_TEXT_ALIGN,
  DEFAULT_VERTICAL_ALIGN,
  VERTICAL_ALIGN as VERTICAL_ALIGN2,
  randomInteger as randomInteger5,
  randomId as randomId3,
  getFontString as getFontString5,
  getUpdatedTimestamp as getUpdatedTimestamp3,
  getLineHeight
} from "@excalidraw/common";
var _newElementBase = (type, {
  x,
  y,
  strokeColor = DEFAULT_ELEMENT_PROPS.strokeColor,
  backgroundColor = DEFAULT_ELEMENT_PROPS.backgroundColor,
  fillStyle = DEFAULT_ELEMENT_PROPS.fillStyle,
  strokeWidth = DEFAULT_ELEMENT_PROPS.strokeWidth,
  strokeStyle = DEFAULT_ELEMENT_PROPS.strokeStyle,
  roughness = DEFAULT_ELEMENT_PROPS.roughness,
  opacity = DEFAULT_ELEMENT_PROPS.opacity,
  width = 0,
  height = 0,
  angle = 0,
  groupIds = [],
  frameId = null,
  index = null,
  roundness = null,
  boundElements = null,
  link = null,
  locked = DEFAULT_ELEMENT_PROPS.locked,
  ...rest
}) => {
  if (x < -1e6 || x > 1e6 || y < -1e6 || y > 1e6 || width < -1e6 || width > 1e6 || height < -1e6 || height > 1e6) {
    console.error("New element size or position is too large", {
      x,
      y,
      width,
      height,
      // @ts-ignore
      points: rest.points
    });
  }
  const element = {
    id: rest.id || randomId3(),
    type,
    x,
    y,
    width,
    height,
    angle,
    strokeColor,
    backgroundColor,
    fillStyle,
    strokeWidth,
    strokeStyle,
    roughness,
    opacity,
    groupIds,
    frameId,
    index,
    roundness,
    seed: rest.seed ?? randomInteger5(),
    version: rest.version || 1,
    versionNonce: rest.versionNonce ?? 0,
    isDeleted: false,
    boundElements,
    updated: getUpdatedTimestamp3(),
    link,
    locked,
    customData: rest.customData
  };
  return element;
};
var newElement = (opts) => _newElementBase(opts.type, opts);
var newEmbeddableElement = (opts) => {
  return _newElementBase("embeddable", opts);
};
var newIframeElement = (opts) => {
  return {
    ..._newElementBase("iframe", opts)
  };
};
var newFrameElement = (opts) => {
  const frameElement = newElementWith(
    {
      ..._newElementBase("frame", opts),
      type: "frame",
      name: opts?.name || null
    },
    {}
  );
  return frameElement;
};
var newMagicFrameElement = (opts) => {
  const frameElement = newElementWith(
    {
      ..._newElementBase("magicframe", opts),
      type: "magicframe",
      name: opts?.name || null
    },
    {}
  );
  return frameElement;
};
var getTextElementPositionOffsets = (opts, metrics) => {
  return {
    x: opts.textAlign === "center" ? metrics.width / 2 : opts.textAlign === "right" ? metrics.width : 0,
    y: opts.verticalAlign === "middle" ? metrics.height / 2 : 0
  };
};
var newTextElement = (opts) => {
  const fontFamily = opts.fontFamily || DEFAULT_FONT_FAMILY2;
  const fontSize = opts.fontSize || DEFAULT_FONT_SIZE3;
  const lineHeight = opts.lineHeight || getLineHeight(fontFamily);
  const text = normalizeText(opts.text);
  const metrics = measureText(
    text,
    getFontString5({ fontFamily, fontSize }),
    lineHeight
  );
  const textAlign = opts.textAlign || DEFAULT_TEXT_ALIGN;
  const verticalAlign = opts.verticalAlign || DEFAULT_VERTICAL_ALIGN;
  const offsets = getTextElementPositionOffsets(
    { textAlign, verticalAlign },
    metrics
  );
  const textElementProps = {
    ..._newElementBase("text", opts),
    text,
    fontSize,
    fontFamily,
    textAlign,
    verticalAlign,
    x: opts.x - offsets.x,
    y: opts.y - offsets.y,
    width: metrics.width,
    height: metrics.height,
    containerId: opts.containerId || null,
    originalText: opts.originalText ?? text,
    autoResize: opts.autoResize ?? true,
    lineHeight
  };
  const textElement = newElementWith(
    textElementProps,
    {}
  );
  return textElement;
};
var getAdjustedDimensions = (element, elementsMap, nextText) => {
  let { width: nextWidth, height: nextHeight } = measureText(
    nextText,
    getFontString5(element),
    element.lineHeight
  );
  if (!element.autoResize) {
    nextWidth = element.width;
  }
  const { textAlign, verticalAlign } = element;
  let x;
  let y;
  if (textAlign === "center" && verticalAlign === VERTICAL_ALIGN2.MIDDLE && !element.containerId && element.autoResize) {
    const prevMetrics = measureText(
      element.text,
      getFontString5(element),
      element.lineHeight
    );
    const offsets = getTextElementPositionOffsets(element, {
      width: nextWidth - prevMetrics.width,
      height: nextHeight - prevMetrics.height
    });
    x = element.x - offsets.x;
    y = element.y - offsets.y;
  } else {
    const [x1, y1, x2, y2] = getElementAbsoluteCoords2(element, elementsMap);
    const [nextX1, nextY1, nextX2, nextY2] = getResizedElementAbsoluteCoords(
      element,
      nextWidth,
      nextHeight,
      false
    );
    const deltaX1 = (x1 - nextX1) / 2;
    const deltaY1 = (y1 - nextY1) / 2;
    const deltaX2 = (x2 - nextX2) / 2;
    const deltaY2 = (y2 - nextY2) / 2;
    [x, y] = adjustXYWithRotation(
      {
        s: true,
        e: textAlign === "center" || textAlign === "left",
        w: textAlign === "center" || textAlign === "right"
      },
      element.x,
      element.y,
      element.angle,
      deltaX1,
      deltaY1,
      deltaX2,
      deltaY2
    );
  }
  return {
    width: nextWidth,
    height: nextHeight,
    x: Number.isFinite(x) ? x : element.x,
    y: Number.isFinite(y) ? y : element.y
  };
};
var adjustXYWithRotation = (sides, x, y, angle, deltaX1, deltaY1, deltaX2, deltaY2) => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  if (sides.e && sides.w) {
    x += deltaX1 + deltaX2;
  } else if (sides.e) {
    x += deltaX1 * (1 + cos);
    y += deltaX1 * sin;
    x += deltaX2 * (1 - cos);
    y += deltaX2 * -sin;
  } else if (sides.w) {
    x += deltaX1 * (1 - cos);
    y += deltaX1 * -sin;
    x += deltaX2 * (1 + cos);
    y += deltaX2 * sin;
  }
  if (sides.n && sides.s) {
    y += deltaY1 + deltaY2;
  } else if (sides.n) {
    x += deltaY1 * sin;
    y += deltaY1 * (1 - cos);
    x += deltaY2 * -sin;
    y += deltaY2 * (1 + cos);
  } else if (sides.s) {
    x += deltaY1 * -sin;
    y += deltaY1 * (1 + cos);
    x += deltaY2 * sin;
    y += deltaY2 * (1 - cos);
  }
  return [x, y];
};
var refreshTextDimensions = (textElement, container, elementsMap, text = textElement.text) => {
  if (textElement.isDeleted) {
    return;
  }
  if (container || !textElement.autoResize) {
    text = wrapText(
      text,
      getFontString5(textElement),
      container ? getBoundTextMaxWidth(container, textElement) : textElement.width
    );
  }
  const dimensions = getAdjustedDimensions(textElement, elementsMap, text);
  return { text, ...dimensions };
};
var newFreeDrawElement = (opts) => {
  return {
    ..._newElementBase(opts.type, opts),
    points: opts.points || [],
    pressures: opts.pressures || [],
    simulatePressure: opts.simulatePressure,
    lastCommittedPoint: null
  };
};
var newLinearElement = (opts) => {
  const element = {
    ..._newElementBase(opts.type, opts),
    points: opts.points || [],
    lastCommittedPoint: null,
    startBinding: null,
    endBinding: null,
    startArrowhead: null,
    endArrowhead: null
  };
  if (isLineElement(element)) {
    const lineElement = {
      ...element,
      polygon: opts.polygon ?? false
    };
    return lineElement;
  }
  return element;
};
var newArrowElement = (opts) => {
  if (opts.elbowed) {
    return {
      ..._newElementBase(opts.type, opts),
      points: opts.points || [],
      lastCommittedPoint: null,
      startBinding: null,
      endBinding: null,
      startArrowhead: opts.startArrowhead || null,
      endArrowhead: opts.endArrowhead || null,
      elbowed: true,
      fixedSegments: opts.fixedSegments || [],
      startIsSpecial: false,
      endIsSpecial: false
    };
  }
  return {
    ..._newElementBase(opts.type, opts),
    points: opts.points || [],
    lastCommittedPoint: null,
    startBinding: null,
    endBinding: null,
    startArrowhead: opts.startArrowhead || null,
    endArrowhead: opts.endArrowhead || null,
    elbowed: false
  };
};
var newImageElement = (opts) => {
  return {
    ..._newElementBase("image", opts),
    // in the future we'll support changing stroke color for some SVG elements,
    // and `transparent` will likely mean "use original colors of the image"
    strokeColor: "transparent",
    status: opts.status ?? "pending",
    fileId: opts.fileId ?? null,
    scale: opts.scale ?? [1, 1],
    crop: opts.crop ?? null
  };
};

// src/embeddable.ts
var embeddedLinkCache = /* @__PURE__ */ new Map();
var RE_YOUTUBE = /^(?:http(?:s)?:\/\/)?(?:www\.)?youtu(?:be\.com|\.be)\/(embed\/|watch\?v=|shorts\/|playlist\?list=|embed\/videoseries\?list=)?([a-zA-Z0-9_-]+)(?:\?t=|&t=|\?start=|&start=)?([a-zA-Z0-9_-]+)?[^\s]*$/;
var RE_VIMEO = /^(?:http(?:s)?:\/\/)?(?:(?:w){3}\.)?(?:player\.)?vimeo\.com\/(?:video\/)?([^?\s]+)(?:\?.*)?$/;
var RE_FIGMA = /^https:\/\/(?:www\.)?figma\.com/;
var RE_GH_GIST = /^https:\/\/gist\.github\.com\/([\w_-]+)\/([\w_-]+)/;
var RE_GH_GIST_EMBED = /^<script[\s\S]*?\ssrc=["'](https:\/\/gist\.github\.com\/.*?)\.js["']/i;
var RE_MSFORMS = /^(?:https?:\/\/)?forms\.microsoft\.com\//;
var RE_TWITTER = /(?:https?:\/\/)?(?:(?:w){3}\.)?(?:twitter|x)\.com\/[^/]+\/status\/(\d+)/;
var RE_TWITTER_EMBED = /^<blockquote[\s\S]*?\shref=["'](https?:\/\/(?:twitter|x)\.com\/[^"']*)/i;
var RE_VALTOWN = /^https:\/\/(?:www\.)?val\.town\/(v|embed)\/[a-zA-Z_$][0-9a-zA-Z_$]+\.[a-zA-Z_$][0-9a-zA-Z_$]+/;
var RE_GENERIC_EMBED = /^<(?:iframe|blockquote)[\s\S]*?\s(?:src|href)=["']([^"']*)["'][\s\S]*?>$/i;
var RE_GIPHY = /giphy.com\/(?:clips|embed|gifs)\/[a-zA-Z0-9]*?-?([a-zA-Z0-9]+)(?:[^a-zA-Z0-9]|$)/;
var RE_REDDIT = /^(?:http(?:s)?:\/\/)?(?:www\.)?reddit\.com\/r\/([a-zA-Z0-9_]+)\/comments\/([a-zA-Z0-9_]+)\/([a-zA-Z0-9_]+)\/?(?:\?[^#\s]*)?(?:#[^\s]*)?$/;
var RE_REDDIT_EMBED = /^<blockquote[\s\S]*?\shref=["'](https?:\/\/(?:www\.)?reddit\.com\/[^"']*)/i;
var ALLOWED_DOMAINS = /* @__PURE__ */ new Set([
  "youtube.com",
  "youtu.be",
  "vimeo.com",
  "player.vimeo.com",
  "figma.com",
  "link.excalidraw.com",
  "gist.github.com",
  "twitter.com",
  "x.com",
  "*.simplepdf.eu",
  "stackblitz.com",
  "val.town",
  "giphy.com",
  "reddit.com",
  "forms.microsoft.com"
]);
var ALLOW_SAME_ORIGIN = /* @__PURE__ */ new Set([
  "youtube.com",
  "youtu.be",
  "vimeo.com",
  "player.vimeo.com",
  "figma.com",
  "twitter.com",
  "x.com",
  "*.simplepdf.eu",
  "stackblitz.com",
  "reddit.com",
  "forms.microsoft.com"
]);
var createSrcDoc = (body) => {
  return `<html><body>${body}</body></html>`;
};
var getEmbedLink = (link) => {
  if (!link) {
    return null;
  }
  if (embeddedLinkCache.has(link)) {
    return embeddedLinkCache.get(link);
  }
  const originalLink = link;
  const allowSameOrigin = ALLOW_SAME_ORIGIN.has(
    matchHostname(link, ALLOW_SAME_ORIGIN) || ""
  );
  let type = "generic";
  let aspectRatio = { w: 560, h: 840 };
  const ytLink = link.match(RE_YOUTUBE);
  if (ytLink?.[2]) {
    const time = ytLink[3] ? `&start=${ytLink[3]}` : ``;
    const isPortrait = link.includes("shorts");
    type = "video";
    switch (ytLink[1]) {
      case "embed/":
      case "watch?v=":
      case "shorts/":
        link = `https://www.youtube.com/embed/${ytLink[2]}?enablejsapi=1${time}`;
        break;
      case "playlist?list=":
      case "embed/videoseries?list=":
        link = `https://www.youtube.com/embed/videoseries?list=${ytLink[2]}&enablejsapi=1${time}`;
        break;
      default:
        link = `https://www.youtube.com/embed/${ytLink[2]}?enablejsapi=1${time}`;
        break;
    }
    aspectRatio = isPortrait ? { w: 315, h: 560 } : { w: 560, h: 315 };
    embeddedLinkCache.set(originalLink, {
      link,
      intrinsicSize: aspectRatio,
      type,
      sandbox: { allowSameOrigin }
    });
    return {
      link,
      intrinsicSize: aspectRatio,
      type,
      sandbox: { allowSameOrigin }
    };
  }
  const vimeoLink = link.match(RE_VIMEO);
  if (vimeoLink?.[1]) {
    const target = vimeoLink?.[1];
    const error = !/^\d+$/.test(target) ? new URIError("Invalid embed link format") : void 0;
    type = "video";
    link = `https://player.vimeo.com/video/${target}?api=1`;
    aspectRatio = { w: 560, h: 315 };
    embeddedLinkCache.set(originalLink, {
      link,
      intrinsicSize: aspectRatio,
      type,
      sandbox: { allowSameOrigin }
    });
    return {
      link,
      intrinsicSize: aspectRatio,
      type,
      error,
      sandbox: { allowSameOrigin }
    };
  }
  const figmaLink = link.match(RE_FIGMA);
  if (figmaLink) {
    type = "generic";
    link = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(
      link
    )}`;
    aspectRatio = { w: 550, h: 550 };
    embeddedLinkCache.set(originalLink, {
      link,
      intrinsicSize: aspectRatio,
      type,
      sandbox: { allowSameOrigin }
    });
    return {
      link,
      intrinsicSize: aspectRatio,
      type,
      sandbox: { allowSameOrigin }
    };
  }
  const valLink = link.match(RE_VALTOWN);
  if (valLink) {
    link = valLink[1] === "embed" ? valLink[0] : valLink[0].replace("/v", "/embed");
    embeddedLinkCache.set(originalLink, {
      link,
      intrinsicSize: aspectRatio,
      type,
      sandbox: { allowSameOrigin }
    });
    return {
      link,
      intrinsicSize: aspectRatio,
      type,
      sandbox: { allowSameOrigin }
    };
  }
  if (RE_MSFORMS.test(link) && !link.includes("embed=true")) {
    link += link.includes("?") ? "&embed=true" : "?embed=true";
  }
  if (RE_TWITTER.test(link)) {
    const postId = link.match(RE_TWITTER)[1];
    const safeURL = escapeDoubleQuotes(
      `https://twitter.com/x/status/${postId}`
    );
    const ret = {
      type: "document",
      srcdoc: (theme) => createSrcDoc(
        `<blockquote class="twitter-tweet" data-dnt="true" data-theme="${theme}"><a href="${safeURL}"></a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"><\/script>`
      ),
      intrinsicSize: { w: 480, h: 480 },
      sandbox: { allowSameOrigin }
    };
    embeddedLinkCache.set(originalLink, ret);
    return ret;
  }
  if (RE_REDDIT.test(link)) {
    const [, page, postId, title] = link.match(RE_REDDIT);
    const safeURL = escapeDoubleQuotes(
      `https://reddit.com/r/${page}/comments/${postId}/${title}`
    );
    const ret = {
      type: "document",
      srcdoc: (theme) => createSrcDoc(
        `<blockquote class="reddit-embed-bq" data-embed-theme="${theme}"><a href="${safeURL}"></a><br></blockquote><script async="" src="https://embed.reddit.com/widgets.js" charset="UTF-8"><\/script>`
      ),
      intrinsicSize: { w: 480, h: 480 },
      sandbox: { allowSameOrigin }
    };
    embeddedLinkCache.set(originalLink, ret);
    return ret;
  }
  if (RE_GH_GIST.test(link)) {
    const [, user, gistId] = link.match(RE_GH_GIST);
    const safeURL = escapeDoubleQuotes(
      `https://gist.github.com/${user}/${gistId}`
    );
    const ret = {
      type: "document",
      srcdoc: () => createSrcDoc(`
          <script src="${safeURL}.js"><\/script>
          <style type="text/css">
            * { margin: 0px; }
            table, .gist { height: 100%; }
            .gist .gist-file { height: calc(100vh - 2px); padding: 0px; display: grid; grid-template-rows: 1fr auto; }
          </style>
        `),
      intrinsicSize: { w: 550, h: 720 },
      sandbox: { allowSameOrigin }
    };
    embeddedLinkCache.set(link, ret);
    return ret;
  }
  embeddedLinkCache.set(link, {
    link,
    intrinsicSize: aspectRatio,
    type,
    sandbox: { allowSameOrigin }
  });
  return {
    link,
    intrinsicSize: aspectRatio,
    type,
    sandbox: { allowSameOrigin }
  };
};
var createPlaceholderEmbeddableLabel = (element) => {
  let text;
  if (isIframeElement(element)) {
    text = "IFrame element";
  } else {
    text = !element.link || element?.link === "" ? "Empty Web-Embed" : element.link;
  }
  const fontSize = Math.max(
    Math.min(element.width / 2, element.width / text.length),
    element.width / 30
  );
  const fontFamily = FONT_FAMILY.Helvetica;
  const fontString = getFontString6({
    fontSize,
    fontFamily
  });
  return newTextElement({
    x: element.x + element.width / 2,
    y: element.y + element.height / 2,
    strokeColor: element.strokeColor !== "transparent" ? element.strokeColor : "black",
    backgroundColor: "transparent",
    fontFamily,
    fontSize,
    text: wrapText(text, fontString, element.width - 20),
    textAlign: "center",
    verticalAlign: VERTICAL_ALIGN3.MIDDLE,
    angle: element.angle ?? 0
  });
};
var matchHostname = (url, allowedHostnames) => {
  try {
    const { hostname } = new URL(url);
    const bareDomain = hostname.replace(/^www\./, "");
    if (allowedHostnames instanceof Set) {
      if (ALLOWED_DOMAINS.has(bareDomain)) {
        return bareDomain;
      }
      const bareDomainWithFirstSubdomainWildcarded = bareDomain.replace(
        /^([^.]+)/,
        "*"
      );
      if (ALLOWED_DOMAINS.has(bareDomainWithFirstSubdomainWildcarded)) {
        return bareDomainWithFirstSubdomainWildcarded;
      }
      return null;
    }
    const bareAllowedHostname = allowedHostnames.replace(/^www\./, "");
    if (bareDomain === bareAllowedHostname) {
      return bareAllowedHostname;
    }
  } catch (error) {
  }
  return null;
};
var maybeParseEmbedSrc = (str) => {
  const twitterMatch = str.match(RE_TWITTER_EMBED);
  if (twitterMatch && twitterMatch.length === 2) {
    return twitterMatch[1];
  }
  const redditMatch = str.match(RE_REDDIT_EMBED);
  if (redditMatch && redditMatch.length === 2) {
    return redditMatch[1];
  }
  const gistMatch = str.match(RE_GH_GIST_EMBED);
  if (gistMatch && gistMatch.length === 2) {
    return gistMatch[1];
  }
  if (RE_GIPHY.test(str)) {
    return `https://giphy.com/embed/${RE_GIPHY.exec(str)[1]}`;
  }
  const match = str.match(RE_GENERIC_EMBED);
  if (match && match.length === 2) {
    return match[1];
  }
  return str;
};
var embeddableURLValidator = (url, validateEmbeddable) => {
  if (!url) {
    return false;
  }
  if (validateEmbeddable != null) {
    if (typeof validateEmbeddable === "function") {
      const ret = validateEmbeddable(url);
      if (typeof ret === "boolean") {
        return ret;
      }
    } else if (typeof validateEmbeddable === "boolean") {
      return validateEmbeddable;
    } else if (validateEmbeddable instanceof RegExp) {
      return validateEmbeddable.test(url);
    } else if (Array.isArray(validateEmbeddable)) {
      for (const domain of validateEmbeddable) {
        if (domain instanceof RegExp) {
          if (url.match(domain)) {
            return true;
          }
        } else if (matchHostname(url, domain)) {
          return true;
        }
      }
      return false;
    }
  }
  return !!matchHostname(url, ALLOWED_DOMAINS);
};

// src/flowchart.ts
init_define_import_meta_env();
import { KEYS as KEYS3, invariant as invariant8, toBrandedType as toBrandedType2 } from "@excalidraw/common";
import { pointFrom as pointFrom13 } from "@excalidraw/math";
var VERTICAL_OFFSET = 100;
var HORIZONTAL_OFFSET = 100;
var getLinkDirectionFromKey = (key) => {
  switch (key) {
    case KEYS3.ARROW_UP:
      return "up";
    case KEYS3.ARROW_DOWN:
      return "down";
    case KEYS3.ARROW_RIGHT:
      return "right";
    case KEYS3.ARROW_LEFT:
      return "left";
    default:
      return "right";
  }
};
var getNodeRelatives = (type, node, elementsMap, direction) => {
  const items = [...elementsMap.values()].reduce(
    (acc, el) => {
      let oppositeBinding;
      if (isElbowArrow(el) && // we want check existence of the opposite binding, in the direction
      // we're interested in
      (oppositeBinding = el[type === "predecessors" ? "startBinding" : "endBinding"]) && // similarly, we need to filter only arrows bound to target node
      el[type === "predecessors" ? "endBinding" : "startBinding"]?.elementId === node.id) {
        const relative = elementsMap.get(oppositeBinding.elementId);
        if (!relative) {
          return acc;
        }
        invariant8(
          isBindableElement(relative),
          "not an ExcalidrawBindableElement"
        );
        const edgePoint = type === "predecessors" ? el.points[el.points.length - 1] : [0, 0];
        const heading = headingForPointFromElement(
          node,
          aabbForElement(node, elementsMap),
          [edgePoint[0] + el.x, edgePoint[1] + el.y]
        );
        acc.push({
          relative,
          heading
        });
      }
      return acc;
    },
    []
  );
  switch (direction) {
    case "up":
      return items.filter((item) => compareHeading(item.heading, HEADING_UP)).map((item) => item.relative);
    case "down":
      return items.filter((item) => compareHeading(item.heading, HEADING_DOWN)).map((item) => item.relative);
    case "right":
      return items.filter((item) => compareHeading(item.heading, HEADING_RIGHT)).map((item) => item.relative);
    case "left":
      return items.filter((item) => compareHeading(item.heading, HEADING_LEFT)).map((item) => item.relative);
  }
};
var getSuccessors = (node, elementsMap, direction) => {
  return getNodeRelatives("successors", node, elementsMap, direction);
};
var getPredecessors = (node, elementsMap, direction) => {
  return getNodeRelatives("predecessors", node, elementsMap, direction);
};
var getOffsets = (element, linkedNodes, direction) => {
  const _HORIZONTAL_OFFSET = HORIZONTAL_OFFSET + element.width;
  if (direction === "up" || direction === "down") {
    const _VERTICAL_OFFSET2 = VERTICAL_OFFSET + element.height;
    const minX = element.x;
    const maxX = element.x + element.width;
    if (linkedNodes.every(
      (linkedNode) => linkedNode.x + linkedNode.width < minX || linkedNode.x > maxX
    )) {
      return {
        x: 0,
        y: _VERTICAL_OFFSET2 * (direction === "up" ? -1 : 1)
      };
    }
  } else if (direction === "right" || direction === "left") {
    const minY = element.y;
    const maxY = element.y + element.height;
    if (linkedNodes.every(
      (linkedNode) => linkedNode.y + linkedNode.height < minY || linkedNode.y > maxY
    )) {
      return {
        x: (HORIZONTAL_OFFSET + element.width) * (direction === "left" ? -1 : 1),
        y: 0
      };
    }
  }
  if (direction === "up" || direction === "down") {
    const _VERTICAL_OFFSET2 = VERTICAL_OFFSET + element.height;
    const y2 = linkedNodes.length === 0 ? _VERTICAL_OFFSET2 : _VERTICAL_OFFSET2;
    const x2 = linkedNodes.length === 0 ? 0 : (linkedNodes.length + 1) % 2 === 0 ? (linkedNodes.length + 1) / 2 * _HORIZONTAL_OFFSET : linkedNodes.length / 2 * _HORIZONTAL_OFFSET * -1;
    if (direction === "up") {
      return {
        x: x2,
        y: y2 * -1
      };
    }
    return {
      x: x2,
      y: y2
    };
  }
  const _VERTICAL_OFFSET = VERTICAL_OFFSET + element.height;
  const x = (linkedNodes.length === 0 ? HORIZONTAL_OFFSET : HORIZONTAL_OFFSET) + element.width;
  const y = linkedNodes.length === 0 ? 0 : (linkedNodes.length + 1) % 2 === 0 ? (linkedNodes.length + 1) / 2 * _VERTICAL_OFFSET : linkedNodes.length / 2 * _VERTICAL_OFFSET * -1;
  if (direction === "left") {
    return {
      x: x * -1,
      y
    };
  }
  return {
    x,
    y
  };
};
var addNewNode = (element, appState, direction, scene) => {
  const elementsMap = scene.getNonDeletedElementsMap();
  const successors = getSuccessors(element, elementsMap, direction);
  const predeccessors = getPredecessors(element, elementsMap, direction);
  const offsets = getOffsets(
    element,
    [...successors, ...predeccessors],
    direction
  );
  const nextNode = newElement({
    type: element.type,
    x: element.x + offsets.x,
    y: element.y + offsets.y,
    // TODO: extract this to a util
    width: element.width,
    height: element.height,
    roundness: element.roundness,
    roughness: element.roughness,
    backgroundColor: element.backgroundColor,
    strokeColor: element.strokeColor,
    strokeWidth: element.strokeWidth,
    opacity: element.opacity,
    fillStyle: element.fillStyle,
    strokeStyle: element.strokeStyle
  });
  invariant8(
    isFlowchartNodeElement(nextNode),
    "not an ExcalidrawFlowchartNodeElement"
  );
  const bindingArrow = createBindingArrow(
    element,
    nextNode,
    direction,
    appState,
    scene
  );
  return {
    nextNode,
    bindingArrow
  };
};
var addNewNodes = (startNode, appState, direction, scene, numberOfNodes) => {
  const newNodes = [];
  for (let i = 0; i < numberOfNodes; i++) {
    let nextX;
    let nextY;
    if (direction === "left" || direction === "right") {
      const totalHeight = VERTICAL_OFFSET * (numberOfNodes - 1) + numberOfNodes * startNode.height;
      const startY = startNode.y + startNode.height / 2 - totalHeight / 2;
      let offsetX = HORIZONTAL_OFFSET + startNode.width;
      if (direction === "left") {
        offsetX *= -1;
      }
      nextX = startNode.x + offsetX;
      const offsetY = (VERTICAL_OFFSET + startNode.height) * i;
      nextY = startY + offsetY;
    } else {
      const totalWidth = HORIZONTAL_OFFSET * (numberOfNodes - 1) + numberOfNodes * startNode.width;
      const startX = startNode.x + startNode.width / 2 - totalWidth / 2;
      let offsetY = VERTICAL_OFFSET + startNode.height;
      if (direction === "up") {
        offsetY *= -1;
      }
      nextY = startNode.y + offsetY;
      const offsetX = (HORIZONTAL_OFFSET + startNode.width) * i;
      nextX = startX + offsetX;
    }
    const nextNode = newElement({
      type: startNode.type,
      x: nextX,
      y: nextY,
      // TODO: extract this to a util
      width: startNode.width,
      height: startNode.height,
      roundness: startNode.roundness,
      roughness: startNode.roughness,
      backgroundColor: startNode.backgroundColor,
      strokeColor: startNode.strokeColor,
      strokeWidth: startNode.strokeWidth,
      opacity: startNode.opacity,
      fillStyle: startNode.fillStyle,
      strokeStyle: startNode.strokeStyle
    });
    invariant8(
      isFlowchartNodeElement(nextNode),
      "not an ExcalidrawFlowchartNodeElement"
    );
    const bindingArrow = createBindingArrow(
      startNode,
      nextNode,
      direction,
      appState,
      scene
    );
    newNodes.push(nextNode);
    newNodes.push(bindingArrow);
  }
  return newNodes;
};
var createBindingArrow = (startBindingElement, endBindingElement, direction, appState, scene) => {
  let startX;
  let startY;
  const PADDING = 6;
  switch (direction) {
    case "up": {
      startX = startBindingElement.x + startBindingElement.width / 2;
      startY = startBindingElement.y - PADDING;
      break;
    }
    case "down": {
      startX = startBindingElement.x + startBindingElement.width / 2;
      startY = startBindingElement.y + startBindingElement.height + PADDING;
      break;
    }
    case "right": {
      startX = startBindingElement.x + startBindingElement.width + PADDING;
      startY = startBindingElement.y + startBindingElement.height / 2;
      break;
    }
    case "left": {
      startX = startBindingElement.x - PADDING;
      startY = startBindingElement.y + startBindingElement.height / 2;
      break;
    }
  }
  let endX;
  let endY;
  switch (direction) {
    case "up": {
      endX = endBindingElement.x + endBindingElement.width / 2 - startX;
      endY = endBindingElement.y + endBindingElement.height - startY + PADDING;
      break;
    }
    case "down": {
      endX = endBindingElement.x + endBindingElement.width / 2 - startX;
      endY = endBindingElement.y - startY - PADDING;
      break;
    }
    case "right": {
      endX = endBindingElement.x - startX - PADDING;
      endY = endBindingElement.y - startY + endBindingElement.height / 2;
      break;
    }
    case "left": {
      endX = endBindingElement.x + endBindingElement.width - startX + PADDING;
      endY = endBindingElement.y - startY + endBindingElement.height / 2;
      break;
    }
  }
  const bindingArrow = newArrowElement({
    type: "arrow",
    x: startX,
    y: startY,
    startArrowhead: null,
    endArrowhead: appState.currentItemEndArrowhead,
    strokeColor: startBindingElement.strokeColor,
    strokeStyle: startBindingElement.strokeStyle,
    strokeWidth: startBindingElement.strokeWidth,
    opacity: startBindingElement.opacity,
    roughness: startBindingElement.roughness,
    points: [pointFrom13(0, 0), pointFrom13(endX, endY)],
    elbowed: true
  });
  const elementsMap = scene.getNonDeletedElementsMap();
  bindLinearElement(bindingArrow, startBindingElement, "start", scene);
  bindLinearElement(bindingArrow, endBindingElement, "end", scene);
  const changedElements = /* @__PURE__ */ new Map();
  changedElements.set(
    startBindingElement.id,
    startBindingElement
  );
  changedElements.set(
    endBindingElement.id,
    endBindingElement
  );
  changedElements.set(
    bindingArrow.id,
    bindingArrow
  );
  LinearElementEditor.movePoints(
    bindingArrow,
    scene,
    /* @__PURE__ */ new Map([
      [
        1,
        {
          point: bindingArrow.points[1]
        }
      ]
    ])
  );
  const update = updateElbowArrowPoints(
    bindingArrow,
    toBrandedType2(
      new Map([
        ...elementsMap.entries(),
        [startBindingElement.id, startBindingElement],
        [endBindingElement.id, endBindingElement],
        [bindingArrow.id, bindingArrow]
      ])
    ),
    { points: bindingArrow.points }
  );
  return {
    ...bindingArrow,
    ...update
  };
};
var FlowChartNavigator = class {
  isExploring = false;
  // nodes that are ONE link away (successor and predecessor both included)
  sameLevelNodes = [];
  sameLevelIndex = 0;
  // set it to the opposite of the defalut creation direction
  direction = null;
  // for speedier navigation
  visitedNodes = /* @__PURE__ */ new Set();
  clear() {
    this.isExploring = false;
    this.sameLevelNodes = [];
    this.sameLevelIndex = 0;
    this.direction = null;
    this.visitedNodes.clear();
  }
  exploreByDirection(element, elementsMap, direction) {
    if (!isBindableElement(element)) {
      return null;
    }
    if (direction !== this.direction) {
      this.clear();
    }
    if (!this.visitedNodes.has(element.id)) {
      this.visitedNodes.add(element.id);
    }
    if (this.isExploring && direction === this.direction && this.sameLevelNodes.length > 1) {
      this.sameLevelIndex = (this.sameLevelIndex + 1) % this.sameLevelNodes.length;
      return this.sameLevelNodes[this.sameLevelIndex].id;
    }
    const nodes = [
      ...getSuccessors(element, elementsMap, direction),
      ...getPredecessors(element, elementsMap, direction)
    ];
    if (nodes.length > 0) {
      this.sameLevelIndex = 0;
      this.isExploring = true;
      this.sameLevelNodes = nodes;
      this.direction = direction;
      this.visitedNodes.add(nodes[0].id);
      return nodes[0].id;
    }
    if (direction === this.direction || !this.isExploring) {
      if (!this.isExploring) {
        this.visitedNodes.add(element.id);
      }
      const otherDirections = [
        "up",
        "right",
        "down",
        "left"
      ].filter((dir) => dir !== direction);
      const otherLinkedNodes = otherDirections.map((dir) => [
        ...getSuccessors(element, elementsMap, dir),
        ...getPredecessors(element, elementsMap, dir)
      ]).flat().filter((linkedNode) => !this.visitedNodes.has(linkedNode.id));
      for (const linkedNode of otherLinkedNodes) {
        if (!this.visitedNodes.has(linkedNode.id)) {
          this.visitedNodes.add(linkedNode.id);
          this.isExploring = true;
          this.direction = direction;
          return linkedNode.id;
        }
      }
    }
    return null;
  }
};
var FlowChartCreator = class {
  isCreatingChart = false;
  numberOfNodes = 0;
  direction = "right";
  pendingNodes = null;
  createNodes(startNode, appState, direction, scene) {
    const elementsMap = scene.getNonDeletedElementsMap();
    if (direction !== this.direction) {
      const { nextNode, bindingArrow } = addNewNode(
        startNode,
        appState,
        direction,
        scene
      );
      this.numberOfNodes = 1;
      this.isCreatingChart = true;
      this.direction = direction;
      this.pendingNodes = [nextNode, bindingArrow];
    } else {
      this.numberOfNodes += 1;
      const newNodes = addNewNodes(
        startNode,
        appState,
        direction,
        scene,
        this.numberOfNodes
      );
      this.isCreatingChart = true;
      this.direction = direction;
      this.pendingNodes = newNodes;
    }
    if (startNode.frameId) {
      const frame = elementsMap.get(startNode.frameId);
      invariant8(
        frame && isFrameElement(frame),
        "not an ExcalidrawFrameElement"
      );
      if (frame && this.pendingNodes.every(
        (node) => elementsAreInFrameBounds([node], frame, elementsMap) || elementOverlapsWithFrame(node, frame, elementsMap)
      )) {
        this.pendingNodes = this.pendingNodes.map(
          (node) => mutateElement(node, elementsMap, {
            frameId: startNode.frameId
          })
        );
      }
    }
  }
  clear() {
    this.isCreatingChart = false;
    this.pendingNodes = null;
    this.direction = null;
    this.numberOfNodes = 0;
  }
};
var isNodeInFlowchart = (element, elementsMap) => {
  for (const [, el] of elementsMap) {
    if (el.type === "arrow" && (el.startBinding?.elementId === element.id || el.endBinding?.elementId === element.id)) {
      return true;
    }
  }
  return false;
};

// src/image.ts
init_define_import_meta_env();
import { MIME_TYPES as MIME_TYPES2, SVG_NS } from "@excalidraw/common";
var loadHTMLImageElement = (dataURL) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.onerror = (error) => {
      reject(error);
    };
    image.src = dataURL;
  });
};
var updateImageCache = async ({
  fileIds,
  files,
  imageCache
}) => {
  const updatedFiles = /* @__PURE__ */ new Map();
  const erroredFiles = /* @__PURE__ */ new Map();
  await Promise.all(
    fileIds.reduce((promises, fileId) => {
      const fileData = files[fileId];
      if (fileData && !updatedFiles.has(fileId)) {
        updatedFiles.set(fileId, true);
        return promises.concat(
          (async () => {
            try {
              if (fileData.mimeType === MIME_TYPES2.binary) {
                throw new Error("Only images can be added to ImageCache");
              }
              const imagePromise = loadHTMLImageElement(fileData.dataURL);
              const data = {
                image: imagePromise,
                mimeType: fileData.mimeType
              };
              imageCache.set(fileId, data);
              const image = await imagePromise;
              imageCache.set(fileId, { ...data, image });
            } catch (error) {
              erroredFiles.set(fileId, true);
            }
          })()
        );
      }
      return promises;
    }, [])
  );
  return {
    imageCache,
    /** includes errored files because they cache was updated nonetheless */
    updatedFiles,
    /** files that failed when creating HTMLImageElement */
    erroredFiles
  };
};
var getInitializedImageElements = (elements) => elements.filter(
  (element) => isInitializedImageElement(element)
);
var isHTMLSVGElement = (node) => {
  return node?.nodeName.toLowerCase() === "svg";
};
var normalizeSVG = (SVGString) => {
  const doc = new DOMParser().parseFromString(SVGString, MIME_TYPES2.svg);
  const svg = doc.querySelector("svg");
  const errorNode = doc.querySelector("parsererror");
  if (errorNode || !isHTMLSVGElement(svg)) {
    throw new Error("Invalid SVG");
  } else {
    if (!svg.hasAttribute("xmlns")) {
      svg.setAttribute("xmlns", SVG_NS);
    }
    let width = svg.getAttribute("width");
    let height = svg.getAttribute("height");
    if (width?.includes("%") || width === "auto") {
      width = null;
    }
    if (height?.includes("%") || height === "auto") {
      height = null;
    }
    const viewBox = svg.getAttribute("viewBox");
    if (!width || !height) {
      width = width || "50";
      height = height || "50";
      if (viewBox) {
        const match = viewBox.match(
          /\d+ +\d+ +(\d+(?:\.\d+)?) +(\d+(?:\.\d+)?)/
        );
        if (match) {
          [, width, height] = match;
        }
      }
      svg.setAttribute("width", width);
      svg.setAttribute("height", height);
    }
    if (!viewBox) {
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    }
    return svg.outerHTML;
  }
};

// src/resizeElements.ts
init_define_import_meta_env();
import {
  pointCenter as pointCenter3,
  normalizeRadians as normalizeRadians2,
  pointFrom as pointFrom14,
  pointRotateRads as pointRotateRads11
} from "@excalidraw/math";
import {
  MIN_FONT_SIZE,
  SHIFT_LOCKING_ANGLE as SHIFT_LOCKING_ANGLE2,
  rescalePoints as rescalePoints2,
  getFontString as getFontString7
} from "@excalidraw/common";
var transformElements = (originalElements, transformHandleType, selectedElements, scene, shouldRotateWithDiscreteAngle2, shouldResizeFromCenter, shouldMaintainAspectRatio, pointerX, pointerY, centerX, centerY) => {
  const elementsMap = scene.getNonDeletedElementsMap();
  if (selectedElements.length === 1) {
    const [element] = selectedElements;
    if (transformHandleType === "rotation") {
      if (!isElbowArrow(element)) {
        rotateSingleElement(
          element,
          scene,
          pointerX,
          pointerY,
          shouldRotateWithDiscreteAngle2
        );
        updateBoundElements(element, scene);
      }
    } else if (transformHandleType) {
      const elementId = selectedElements[0].id;
      const latestElement = elementsMap.get(elementId);
      const origElement = originalElements.get(elementId);
      if (latestElement && origElement) {
        const { nextWidth, nextHeight } = getNextSingleWidthAndHeightFromPointer(
          latestElement,
          origElement,
          transformHandleType,
          pointerX,
          pointerY,
          {
            shouldMaintainAspectRatio,
            shouldResizeFromCenter
          }
        );
        resizeSingleElement(
          nextWidth,
          nextHeight,
          latestElement,
          origElement,
          originalElements,
          scene,
          transformHandleType,
          {
            shouldMaintainAspectRatio,
            shouldResizeFromCenter
          }
        );
      }
    }
    if (isTextElement(element)) {
      updateBoundElements(element, scene);
    }
    return true;
  } else if (selectedElements.length > 1) {
    if (transformHandleType === "rotation") {
      rotateMultipleElements(
        originalElements,
        selectedElements,
        scene,
        pointerX,
        pointerY,
        shouldRotateWithDiscreteAngle2,
        centerX,
        centerY
      );
      return true;
    } else if (transformHandleType) {
      const { nextWidth, nextHeight, flipByX, flipByY, originalBoundingBox } = getNextMultipleWidthAndHeightFromPointer(
        selectedElements,
        originalElements,
        elementsMap,
        transformHandleType,
        pointerX,
        pointerY,
        {
          shouldMaintainAspectRatio,
          shouldResizeFromCenter
        }
      );
      resizeMultipleElements(
        selectedElements,
        elementsMap,
        transformHandleType,
        scene,
        originalElements,
        {
          shouldResizeFromCenter,
          shouldMaintainAspectRatio,
          flipByX,
          flipByY,
          nextWidth,
          nextHeight,
          originalBoundingBox
        }
      );
      return true;
    }
  }
  return false;
};
var rotateSingleElement = (element, scene, pointerX, pointerY, shouldRotateWithDiscreteAngle2) => {
  const [x1, y1, x2, y2] = getElementAbsoluteCoords2(
    element,
    scene.getNonDeletedElementsMap()
  );
  const cx = (x1 + x2) / 2;
  const cy = (y1 + y2) / 2;
  let angle;
  if (isFrameLikeElement(element)) {
    angle = 0;
  } else {
    angle = 5 * Math.PI / 2 + Math.atan2(pointerY - cy, pointerX - cx);
    if (shouldRotateWithDiscreteAngle2) {
      angle = angle + SHIFT_LOCKING_ANGLE2 / 2;
      angle = angle - angle % SHIFT_LOCKING_ANGLE2;
    }
    angle = normalizeRadians2(angle);
  }
  const boundTextElementId = getBoundTextElementId(element);
  scene.mutateElement(element, { angle });
  if (boundTextElementId) {
    const textElement = scene.getElement(boundTextElementId);
    if (textElement && !isArrowElement(element)) {
      scene.mutateElement(textElement, { angle });
    }
  }
};
var rescalePointsInElement = (element, width, height, normalizePoints) => isLinearElement(element) || isFreeDrawElement(element) ? {
  points: rescalePoints2(
    0,
    width,
    rescalePoints2(1, height, element.points, normalizePoints),
    normalizePoints
  )
} : {};
var measureFontSizeFromWidth = (element, elementsMap, nextWidth) => {
  let width = element.width;
  const hasContainer = isBoundToContainer(element);
  if (hasContainer) {
    const container = getContainerElement(element, elementsMap);
    if (container) {
      width = getBoundTextMaxWidth(container, element);
    }
  }
  const nextFontSize = element.fontSize * (nextWidth / width);
  if (nextFontSize < MIN_FONT_SIZE) {
    return null;
  }
  return {
    size: nextFontSize
  };
};
var resizeSingleTextElement = (origElement, element, scene, transformHandleType, shouldResizeFromCenter, nextWidth, nextHeight) => {
  const elementsMap = scene.getNonDeletedElementsMap();
  const metricsWidth = element.width * (nextHeight / element.height);
  const metrics = measureFontSizeFromWidth(element, elementsMap, metricsWidth);
  if (metrics === null) {
    return;
  }
  if (transformHandleType.includes("n") || transformHandleType.includes("s")) {
    const previousOrigin = pointFrom14(origElement.x, origElement.y);
    const newOrigin = getResizedOrigin(
      previousOrigin,
      origElement.width,
      origElement.height,
      metricsWidth,
      nextHeight,
      origElement.angle,
      transformHandleType,
      false,
      shouldResizeFromCenter
    );
    scene.mutateElement(element, {
      fontSize: metrics.size,
      width: metricsWidth,
      height: nextHeight,
      x: newOrigin.x,
      y: newOrigin.y
    });
    return;
  }
  if (transformHandleType === "e" || transformHandleType === "w") {
    const minWidth = getMinTextElementWidth(
      getFontString7({
        fontSize: element.fontSize,
        fontFamily: element.fontFamily
      }),
      element.lineHeight
    );
    const newWidth = Math.max(minWidth, nextWidth);
    const text = wrapText(
      element.originalText,
      getFontString7(element),
      Math.abs(newWidth)
    );
    const metrics2 = measureText(
      text,
      getFontString7(element),
      element.lineHeight
    );
    const newHeight = metrics2.height;
    const previousOrigin = pointFrom14(origElement.x, origElement.y);
    const newOrigin = getResizedOrigin(
      previousOrigin,
      origElement.width,
      origElement.height,
      newWidth,
      newHeight,
      element.angle,
      transformHandleType,
      false,
      shouldResizeFromCenter
    );
    const resizedElement = {
      width: Math.abs(newWidth),
      height: Math.abs(metrics2.height),
      x: newOrigin.x,
      y: newOrigin.y,
      text,
      autoResize: false
    };
    scene.mutateElement(element, resizedElement);
  }
};
var rotateMultipleElements = (originalElements, elements, scene, pointerX, pointerY, shouldRotateWithDiscreteAngle2, centerX, centerY) => {
  const elementsMap = scene.getNonDeletedElementsMap();
  let centerAngle = 5 * Math.PI / 2 + Math.atan2(pointerY - centerY, pointerX - centerX);
  if (shouldRotateWithDiscreteAngle2) {
    centerAngle += SHIFT_LOCKING_ANGLE2 / 2;
    centerAngle -= centerAngle % SHIFT_LOCKING_ANGLE2;
  }
  for (const element of elements) {
    if (!isFrameLikeElement(element)) {
      const [x1, y1, x2, y2] = getElementAbsoluteCoords2(element, elementsMap);
      const cx = (x1 + x2) / 2;
      const cy = (y1 + y2) / 2;
      const origAngle = originalElements.get(element.id)?.angle ?? element.angle;
      const [rotatedCX, rotatedCY] = pointRotateRads11(
        pointFrom14(cx, cy),
        pointFrom14(centerX, centerY),
        centerAngle + origAngle - element.angle
      );
      const updates = isElbowArrow(element) ? {
        // Needed to re-route the arrow
        points: getArrowLocalFixedPoints(element, elementsMap)
      } : {
        x: element.x + (rotatedCX - cx),
        y: element.y + (rotatedCY - cy),
        angle: normalizeRadians2(centerAngle + origAngle)
      };
      scene.mutateElement(element, updates);
      updateBoundElements(element, scene, {
        simultaneouslyUpdated: elements
      });
      const boundText = getBoundTextElement(element, elementsMap);
      if (boundText && !isArrowElement(element)) {
        scene.mutateElement(boundText, {
          x: boundText.x + (rotatedCX - cx),
          y: boundText.y + (rotatedCY - cy),
          angle: normalizeRadians2(centerAngle + origAngle)
        });
      }
    }
  }
  scene.triggerUpdate();
};
var getResizeOffsetXY = (transformHandleType, selectedElements, elementsMap, x, y) => {
  const [x1, y1, x2, y2] = selectedElements.length === 1 ? getElementAbsoluteCoords2(selectedElements[0], elementsMap) : getCommonBounds(selectedElements);
  const cx = (x1 + x2) / 2;
  const cy = (y1 + y2) / 2;
  const angle = selectedElements.length === 1 ? selectedElements[0].angle : 0;
  [x, y] = pointRotateRads11(
    pointFrom14(x, y),
    pointFrom14(cx, cy),
    -angle
  );
  switch (transformHandleType) {
    case "n":
      return pointRotateRads11(
        pointFrom14(x - (x1 + x2) / 2, y - y1),
        pointFrom14(0, 0),
        angle
      );
    case "s":
      return pointRotateRads11(
        pointFrom14(x - (x1 + x2) / 2, y - y2),
        pointFrom14(0, 0),
        angle
      );
    case "w":
      return pointRotateRads11(
        pointFrom14(x - x1, y - (y1 + y2) / 2),
        pointFrom14(0, 0),
        angle
      );
    case "e":
      return pointRotateRads11(
        pointFrom14(x - x2, y - (y1 + y2) / 2),
        pointFrom14(0, 0),
        angle
      );
    case "nw":
      return pointRotateRads11(pointFrom14(x - x1, y - y1), pointFrom14(0, 0), angle);
    case "ne":
      return pointRotateRads11(pointFrom14(x - x2, y - y1), pointFrom14(0, 0), angle);
    case "sw":
      return pointRotateRads11(pointFrom14(x - x1, y - y2), pointFrom14(0, 0), angle);
    case "se":
      return pointRotateRads11(pointFrom14(x - x2, y - y2), pointFrom14(0, 0), angle);
    default:
      return [0, 0];
  }
};
var getResizeArrowDirection = (transformHandleType, element) => {
  const [, [px, py]] = element.points;
  const isResizeEnd = transformHandleType === "nw" && (px < 0 || py < 0) || transformHandleType === "ne" && px >= 0 || transformHandleType === "sw" && px <= 0 || transformHandleType === "se" && (px > 0 || py > 0);
  return isResizeEnd ? "end" : "origin";
};
var getResizeAnchor = (handleDirection, shouldMaintainAspectRatio, shouldResizeFromCenter) => {
  if (shouldResizeFromCenter) {
    return "center";
  }
  if (shouldMaintainAspectRatio) {
    switch (handleDirection) {
      case "n":
        return "south-side";
      case "e": {
        return "west-side";
      }
      case "s":
        return "north-side";
      case "w":
        return "east-side";
      case "ne":
        return "bottom-left";
      case "nw":
        return "bottom-right";
      case "se":
        return "top-left";
      case "sw":
        return "top-right";
    }
  }
  if (["e", "se", "s"].includes(handleDirection)) {
    return "top-left";
  } else if (["n", "nw", "w"].includes(handleDirection)) {
    return "bottom-right";
  } else if (handleDirection === "ne") {
    return "bottom-left";
  }
  return "top-right";
};
var getResizedOrigin = (prevOrigin, prevWidth, prevHeight, newWidth, newHeight, angle, handleDirection, shouldMaintainAspectRatio, shouldResizeFromCenter) => {
  const anchor = getResizeAnchor(
    handleDirection,
    shouldMaintainAspectRatio,
    shouldResizeFromCenter
  );
  const [x, y] = prevOrigin;
  switch (anchor) {
    case "top-left":
      return {
        x: x + (prevWidth - newWidth) / 2 + (newWidth - prevWidth) / 2 * Math.cos(angle) + (prevHeight - newHeight) / 2 * Math.sin(angle),
        y: y + (prevHeight - newHeight) / 2 + (newWidth - prevWidth) / 2 * Math.sin(angle) + (newHeight - prevHeight) / 2 * Math.cos(angle)
      };
    case "top-right":
      return {
        x: x + (prevWidth - newWidth) / 2 * (Math.cos(angle) + 1) + (prevHeight - newHeight) / 2 * Math.sin(angle),
        y: y + (prevHeight - newHeight) / 2 + (prevWidth - newWidth) / 2 * Math.sin(angle) + (newHeight - prevHeight) / 2 * Math.cos(angle)
      };
    case "bottom-left":
      return {
        x: x + (prevWidth - newWidth) / 2 * (1 - Math.cos(angle)) + (newHeight - prevHeight) / 2 * Math.sin(angle),
        y: y + (prevHeight - newHeight) / 2 * (Math.cos(angle) + 1) + (newWidth - prevWidth) / 2 * Math.sin(angle)
      };
    case "bottom-right":
      return {
        x: x + (prevWidth - newWidth) / 2 * (Math.cos(angle) + 1) + (newHeight - prevHeight) / 2 * Math.sin(angle),
        y: y + (prevHeight - newHeight) / 2 * (Math.cos(angle) + 1) + (prevWidth - newWidth) / 2 * Math.sin(angle)
      };
    case "center":
      return {
        x: x - (newWidth - prevWidth) / 2,
        y: y - (newHeight - prevHeight) / 2
      };
    case "east-side":
      return {
        x: x + (prevWidth - newWidth) / 2 * (Math.cos(angle) + 1),
        y: y + (prevWidth - newWidth) / 2 * Math.sin(angle) + (prevHeight - newHeight) / 2
      };
    case "west-side":
      return {
        x: x + (prevWidth - newWidth) / 2 * (1 - Math.cos(angle)),
        y: y + (newWidth - prevWidth) / 2 * Math.sin(angle) + (prevHeight - newHeight) / 2
      };
    case "north-side":
      return {
        x: x + (prevWidth - newWidth) / 2 + (prevHeight - newHeight) / 2 * Math.sin(angle),
        y: y + (newHeight - prevHeight) / 2 * (Math.cos(angle) - 1)
      };
    case "south-side":
      return {
        x: x + (prevWidth - newWidth) / 2 + (newHeight - prevHeight) / 2 * Math.sin(angle),
        y: y + (prevHeight - newHeight) / 2 * (Math.cos(angle) + 1)
      };
  }
};
var resizeSingleElement = (nextWidth, nextHeight, latestElement, origElement, originalElementsMap, scene, handleDirection, {
  shouldInformMutation = true,
  shouldMaintainAspectRatio = false,
  shouldResizeFromCenter = false
} = {}) => {
  if (isTextElement(latestElement) && isTextElement(origElement)) {
    return resizeSingleTextElement(
      origElement,
      latestElement,
      scene,
      handleDirection,
      shouldResizeFromCenter,
      nextWidth,
      nextHeight
    );
  }
  let boundTextFont = {};
  const elementsMap = scene.getNonDeletedElementsMap();
  const boundTextElement = getBoundTextElement(latestElement, elementsMap);
  if (boundTextElement) {
    const stateOfBoundTextElementAtResize = originalElementsMap.get(
      boundTextElement.id
    );
    if (stateOfBoundTextElementAtResize) {
      boundTextFont = {
        fontSize: stateOfBoundTextElementAtResize.fontSize
      };
    }
    if (shouldMaintainAspectRatio) {
      const updatedElement = {
        ...latestElement,
        width: nextWidth,
        height: nextHeight
      };
      const nextFont = measureFontSizeFromWidth(
        boundTextElement,
        elementsMap,
        getBoundTextMaxWidth(updatedElement, boundTextElement)
      );
      if (nextFont === null) {
        return;
      }
      boundTextFont = {
        fontSize: nextFont.size
      };
    } else {
      const minWidth = getApproxMinLineWidth(
        getFontString7(boundTextElement),
        boundTextElement.lineHeight
      );
      const minHeight = getApproxMinLineHeight(
        boundTextElement.fontSize,
        boundTextElement.lineHeight
      );
      nextWidth = Math.max(nextWidth, minWidth);
      nextHeight = Math.max(nextHeight, minHeight);
    }
  }
  const rescaledPoints = rescalePointsInElement(
    origElement,
    nextWidth,
    nextHeight,
    true
  );
  let previousOrigin = pointFrom14(origElement.x, origElement.y);
  if (isLinearElement(origElement)) {
    const [x1, y1] = getElementBounds(origElement, originalElementsMap);
    previousOrigin = pointFrom14(x1, y1);
  }
  const newOrigin = getResizedOrigin(
    previousOrigin,
    origElement.width,
    origElement.height,
    nextWidth,
    nextHeight,
    origElement.angle,
    handleDirection,
    shouldMaintainAspectRatio,
    shouldResizeFromCenter
  );
  if (isLinearElement(origElement) && rescaledPoints.points) {
    const offsetX = origElement.x - previousOrigin[0];
    const offsetY = origElement.y - previousOrigin[1];
    newOrigin.x += offsetX;
    newOrigin.y += offsetY;
    const scaledX = rescaledPoints.points[0][0];
    const scaledY = rescaledPoints.points[0][1];
    newOrigin.x += scaledX;
    newOrigin.y += scaledY;
    rescaledPoints.points = rescaledPoints.points.map(
      (p) => pointFrom14(p[0] - scaledX, p[1] - scaledY)
    );
  }
  if (nextWidth < 0) {
    newOrigin.x = newOrigin.x + nextWidth;
  }
  if (nextHeight < 0) {
    newOrigin.y = newOrigin.y + nextHeight;
  }
  if ("scale" in latestElement && "scale" in origElement) {
    scene.mutateElement(latestElement, {
      scale: [
        // defaulting because scaleX/Y can be 0/-0
        (Math.sign(nextWidth) || origElement.scale[0]) * origElement.scale[0],
        (Math.sign(nextHeight) || origElement.scale[1]) * origElement.scale[1]
      ]
    });
  }
  if (isArrowElement(latestElement) && boundTextElement && shouldMaintainAspectRatio) {
    const fontSize = nextWidth / latestElement.width * boundTextElement.fontSize;
    if (fontSize < MIN_FONT_SIZE) {
      return;
    }
    boundTextFont.fontSize = fontSize;
  }
  if (nextWidth !== 0 && nextHeight !== 0 && Number.isFinite(newOrigin.x) && Number.isFinite(newOrigin.y)) {
    const updates = {
      ...newOrigin,
      width: Math.abs(nextWidth),
      height: Math.abs(nextHeight),
      ...rescaledPoints
    };
    scene.mutateElement(latestElement, updates, {
      informMutation: shouldInformMutation,
      isDragging: false
    });
    if (boundTextElement && boundTextFont != null) {
      scene.mutateElement(boundTextElement, {
        fontSize: boundTextFont.fontSize
      });
    }
    handleBindTextResize(
      latestElement,
      scene,
      handleDirection,
      shouldMaintainAspectRatio
    );
    updateBoundElements(latestElement, scene, {
      // TODO: confirm with MARK if this actually makes sense
      newSize: { width: nextWidth, height: nextHeight }
    });
  }
};
var getNextSingleWidthAndHeightFromPointer = (latestElement, origElement, handleDirection, pointerX, pointerY, {
  shouldMaintainAspectRatio = false,
  shouldResizeFromCenter = false
} = {}) => {
  const [x1, y1, x2, y2] = getResizedElementAbsoluteCoords(
    origElement,
    origElement.width,
    origElement.height,
    true
  );
  const startTopLeft = pointFrom14(x1, y1);
  const startBottomRight = pointFrom14(x2, y2);
  const startCenter = pointCenter3(startTopLeft, startBottomRight);
  const rotatedPointer = pointRotateRads11(
    pointFrom14(pointerX, pointerY),
    startCenter,
    -origElement.angle
  );
  const [esx1, esy1, esx2, esy2] = getResizedElementAbsoluteCoords(
    latestElement,
    latestElement.width,
    latestElement.height,
    true
  );
  const boundsCurrentWidth = esx2 - esx1;
  const boundsCurrentHeight = esy2 - esy1;
  const atStartBoundsWidth = startBottomRight[0] - startTopLeft[0];
  const atStartBoundsHeight = startBottomRight[1] - startTopLeft[1];
  let scaleX = atStartBoundsWidth / boundsCurrentWidth;
  let scaleY = atStartBoundsHeight / boundsCurrentHeight;
  if (handleDirection.includes("e")) {
    scaleX = (rotatedPointer[0] - startTopLeft[0]) / boundsCurrentWidth;
  }
  if (handleDirection.includes("s")) {
    scaleY = (rotatedPointer[1] - startTopLeft[1]) / boundsCurrentHeight;
  }
  if (handleDirection.includes("w")) {
    scaleX = (startBottomRight[0] - rotatedPointer[0]) / boundsCurrentWidth;
  }
  if (handleDirection.includes("n")) {
    scaleY = (startBottomRight[1] - rotatedPointer[1]) / boundsCurrentHeight;
  }
  let nextWidth = latestElement.width * scaleX;
  let nextHeight = latestElement.height * scaleY;
  if (shouldResizeFromCenter) {
    nextWidth = 2 * nextWidth - origElement.width;
    nextHeight = 2 * nextHeight - origElement.height;
  }
  if (shouldMaintainAspectRatio) {
    const widthRatio = Math.abs(nextWidth) / origElement.width;
    const heightRatio = Math.abs(nextHeight) / origElement.height;
    if (handleDirection.length === 1) {
      nextHeight *= widthRatio;
      nextWidth *= heightRatio;
    }
    if (handleDirection.length === 2) {
      const ratio = Math.max(widthRatio, heightRatio);
      nextWidth = origElement.width * ratio * Math.sign(nextWidth);
      nextHeight = origElement.height * ratio * Math.sign(nextHeight);
    }
  }
  return {
    nextWidth,
    nextHeight
  };
};
var getNextMultipleWidthAndHeightFromPointer = (selectedElements, originalElementsMap, elementsMap, handleDirection, pointerX, pointerY, {
  shouldMaintainAspectRatio = false,
  shouldResizeFromCenter = false
} = {}) => {
  const originalElementsArray = selectedElements.map(
    (el) => originalElementsMap.get(el.id)
  );
  const boundTextElements = originalElementsArray.reduce((acc, orig) => {
    if (!isLinearElement(orig)) {
      return acc;
    }
    const textId = getBoundTextElementId(orig);
    if (!textId) {
      return acc;
    }
    const text = originalElementsMap.get(textId) ?? null;
    if (!isBoundToContainer(text)) {
      return acc;
    }
    return [
      ...acc,
      {
        ...text,
        ...LinearElementEditor.getBoundTextElementPosition(
          orig,
          text,
          elementsMap
        )
      }
    ];
  }, []);
  const originalBoundingBox = getCommonBoundingBox(
    originalElementsArray.map((orig) => orig).concat(boundTextElements)
  );
  const { minX, minY, maxX, maxY, midX, midY } = originalBoundingBox;
  const width = maxX - minX;
  const height = maxY - minY;
  const anchorsMap = {
    ne: [minX, maxY],
    se: [minX, minY],
    sw: [maxX, minY],
    nw: [maxX, maxY],
    e: [minX, minY + height / 2],
    w: [maxX, minY + height / 2],
    n: [minX + width / 2, maxY],
    s: [minX + width / 2, minY]
  };
  const [anchorX, anchorY] = shouldResizeFromCenter ? [midX, midY] : anchorsMap[handleDirection];
  const resizeFromCenterScale = shouldResizeFromCenter ? 2 : 1;
  const scale = Math.max(
    Math.abs(pointerX - anchorX) / width || 0,
    Math.abs(pointerY - anchorY) / height || 0
  ) * resizeFromCenterScale;
  let nextWidth = handleDirection.includes("e") || handleDirection.includes("w") ? Math.abs(pointerX - anchorX) * resizeFromCenterScale : width;
  let nextHeight = handleDirection.includes("n") || handleDirection.includes("s") ? Math.abs(pointerY - anchorY) * resizeFromCenterScale : height;
  if (shouldMaintainAspectRatio) {
    nextWidth = width * scale * Math.sign(pointerX - anchorX);
    nextHeight = height * scale * Math.sign(pointerY - anchorY);
  }
  const flipConditionsMap = {
    ne: [pointerX < anchorX, pointerY > anchorY],
    se: [pointerX < anchorX, pointerY < anchorY],
    sw: [pointerX > anchorX, pointerY < anchorY],
    nw: [pointerX > anchorX, pointerY > anchorY],
    // e.g. when resizing from the "e" side, we do not need to consider changes in the `y` direction
    //      and therefore, we do not need to flip in the `y` direction at all
    e: [pointerX < anchorX, false],
    w: [pointerX > anchorX, false],
    n: [false, pointerY > anchorY],
    s: [false, pointerY < anchorY]
  };
  const [flipByX, flipByY] = flipConditionsMap[handleDirection].map(
    (condition) => condition
  );
  return {
    originalBoundingBox,
    nextWidth,
    nextHeight,
    flipByX,
    flipByY
  };
};
var resizeMultipleElements = (selectedElements, elementsMap, handleDirection, scene, originalElementsMap, {
  shouldMaintainAspectRatio = false,
  shouldResizeFromCenter = false,
  flipByX = false,
  flipByY = false,
  nextHeight,
  nextWidth,
  originalBoundingBox
} = {}) => {
  if (nextWidth === void 0 && nextHeight === void 0 && flipByX === void 0 && flipByY === void 0) {
    return;
  }
  if (nextHeight === 0 || nextWidth === 0) {
    return;
  }
  if (!originalElementsMap) {
    originalElementsMap = elementsMap;
  }
  const targetElements = selectedElements.reduce(
    (acc, element) => {
      const origElement = originalElementsMap.get(element.id);
      if (origElement) {
        acc.push({ orig: origElement, latest: element });
      }
      return acc;
    },
    []
  );
  let boundingBox;
  if (originalBoundingBox) {
    boundingBox = originalBoundingBox;
  } else {
    const boundTextElements = targetElements.reduce((acc, { orig }) => {
      if (!isLinearElement(orig)) {
        return acc;
      }
      const textId = getBoundTextElementId(orig);
      if (!textId) {
        return acc;
      }
      const text = originalElementsMap.get(textId) ?? null;
      if (!isBoundToContainer(text)) {
        return acc;
      }
      return [
        ...acc,
        {
          ...text,
          ...LinearElementEditor.getBoundTextElementPosition(
            orig,
            text,
            elementsMap
          )
        }
      ];
    }, []);
    boundingBox = getCommonBoundingBox(
      targetElements.map(({ orig }) => orig).concat(boundTextElements)
    );
  }
  const { minX, minY, maxX, maxY, midX, midY } = boundingBox;
  const width = maxX - minX;
  const height = maxY - minY;
  if (nextWidth === void 0 && nextHeight === void 0) {
    nextWidth = width;
    nextHeight = height;
  }
  if (shouldMaintainAspectRatio) {
    if (nextWidth === void 0) {
      nextWidth = nextHeight * (width / height);
    } else if (nextHeight === void 0) {
      nextHeight = nextWidth * (height / width);
    } else if (Math.abs(nextWidth / nextHeight - width / height) > 1e-3) {
      nextWidth = nextHeight * (width / height);
    }
  }
  if (nextWidth && nextHeight) {
    let scaleX = handleDirection.includes("e") || handleDirection.includes("w") ? Math.abs(nextWidth) / width : 1;
    let scaleY = handleDirection.includes("n") || handleDirection.includes("s") ? Math.abs(nextHeight) / height : 1;
    let scale;
    if (handleDirection.length === 1) {
      scale = handleDirection.includes("e") || handleDirection.includes("w") ? scaleX : scaleY;
    } else {
      scale = Math.max(
        Math.abs(nextWidth) / width || 0,
        Math.abs(nextHeight) / height || 0
      );
    }
    const anchorsMap = {
      ne: [minX, maxY],
      se: [minX, minY],
      sw: [maxX, minY],
      nw: [maxX, maxY],
      e: [minX, minY + height / 2],
      w: [maxX, minY + height / 2],
      n: [minX + width / 2, maxY],
      s: [minX + width / 2, minY]
    };
    const [anchorX, anchorY] = shouldResizeFromCenter ? [midX, midY] : anchorsMap[handleDirection];
    const keepAspectRatio = shouldMaintainAspectRatio || targetElements.some(
      (item) => item.latest.angle !== 0 || isTextElement(item.latest) || isInGroup(item.latest)
    );
    if (keepAspectRatio) {
      scaleX = scale;
      scaleY = scale;
    }
    const [flipFactorX, flipFactorY] = [flipByX ? -1 : 1, flipByY ? -1 : 1];
    const elementsAndUpdates = [];
    for (const { orig, latest } of targetElements) {
      if (isTextElement(orig) && isBoundToContainer(orig)) {
        continue;
      }
      const width2 = orig.width * scaleX;
      const height2 = orig.height * scaleY;
      const angle = normalizeRadians2(
        orig.angle * flipFactorX * flipFactorY
      );
      const isLinearOrFreeDraw = isLinearElement(orig) || isFreeDrawElement(orig);
      const offsetX = orig.x - anchorX;
      const offsetY = orig.y - anchorY;
      const shiftX = flipByX && !isLinearOrFreeDraw ? width2 : 0;
      const shiftY = flipByY && !isLinearOrFreeDraw ? height2 : 0;
      const x = anchorX + flipFactorX * (offsetX * scaleX + shiftX);
      const y = anchorY + flipFactorY * (offsetY * scaleY + shiftY);
      const rescaledPoints = rescalePointsInElement(
        orig,
        width2 * flipFactorX,
        height2 * flipFactorY,
        false
      );
      const update = {
        x,
        y,
        width: width2,
        height: height2,
        angle,
        ...rescaledPoints
      };
      if (isElbowArrow(orig)) {
        if (orig.startBinding) {
          update.startBinding = {
            ...orig.startBinding,
            fixedPoint: [
              flipByX ? -orig.startBinding.fixedPoint[0] + 1 : orig.startBinding.fixedPoint[0],
              flipByY ? -orig.startBinding.fixedPoint[1] + 1 : orig.startBinding.fixedPoint[1]
            ]
          };
        }
        if (orig.endBinding) {
          update.endBinding = {
            ...orig.endBinding,
            fixedPoint: [
              flipByX ? -orig.endBinding.fixedPoint[0] + 1 : orig.endBinding.fixedPoint[0],
              flipByY ? -orig.endBinding.fixedPoint[1] + 1 : orig.endBinding.fixedPoint[1]
            ]
          };
        }
        if (orig.fixedSegments && rescaledPoints.points) {
          update.fixedSegments = orig.fixedSegments.map((segment) => ({
            ...segment,
            start: rescaledPoints.points[segment.index - 1],
            end: rescaledPoints.points[segment.index]
          }));
        }
      }
      if (isImageElement(orig)) {
        update.scale = [
          orig.scale[0] * flipFactorX,
          orig.scale[1] * flipFactorY
        ];
      }
      if (isTextElement(orig)) {
        const metrics = measureFontSizeFromWidth(orig, elementsMap, width2);
        if (!metrics) {
          return;
        }
        update.fontSize = metrics.size;
      }
      const boundTextElement = originalElementsMap.get(
        getBoundTextElementId(orig) ?? ""
      );
      if (boundTextElement) {
        if (keepAspectRatio) {
          const newFontSize = boundTextElement.fontSize * scale;
          if (newFontSize < MIN_FONT_SIZE) {
            return;
          }
          update.boundTextFontSize = newFontSize;
        } else {
          update.boundTextFontSize = boundTextElement.fontSize;
        }
      }
      elementsAndUpdates.push({
        element: latest,
        update
      });
    }
    const elementsToUpdate = elementsAndUpdates.map(({ element }) => element);
    for (const {
      element,
      update: { boundTextFontSize, ...update }
    } of elementsAndUpdates) {
      const { width: width2, height: height2, angle } = update;
      scene.mutateElement(element, update);
      updateBoundElements(element, scene, {
        simultaneouslyUpdated: elementsToUpdate,
        newSize: { width: width2, height: height2 }
      });
      const boundTextElement = getBoundTextElement(element, elementsMap);
      if (boundTextElement && boundTextFontSize) {
        scene.mutateElement(boundTextElement, {
          fontSize: boundTextFontSize,
          angle: isLinearElement(element) ? void 0 : angle
        });
        handleBindTextResize(element, scene, handleDirection, true);
      }
    }
    scene.triggerUpdate();
  }
};

// src/resizeTest.ts
init_define_import_meta_env();
import {
  pointFrom as pointFrom16,
  pointOnLineSegment,
  pointRotateRads as pointRotateRads13
} from "@excalidraw/math";
import { SIDE_RESIZING_THRESHOLD } from "@excalidraw/common";

// src/transformHandles.ts
init_define_import_meta_env();
import {
  DEFAULT_TRANSFORM_HANDLE_SPACING,
  isAndroid,
  isIOS
} from "@excalidraw/common";
import { pointFrom as pointFrom15, pointRotateRads as pointRotateRads12 } from "@excalidraw/math";
var transformHandleSizes = {
  mouse: 8,
  pen: 16,
  touch: 28
};
var ROTATION_RESIZE_HANDLE_GAP = 16;
var DEFAULT_OMIT_SIDES = {
  e: true,
  s: true,
  n: true,
  w: true
};
var OMIT_SIDES_FOR_MULTIPLE_ELEMENTS = {
  e: true,
  s: true,
  n: true,
  w: true
};
var OMIT_SIDES_FOR_FRAME = {
  e: true,
  s: true,
  n: true,
  w: true,
  rotation: true
};
var OMIT_SIDES_FOR_LINE_SLASH = {
  e: true,
  s: true,
  n: true,
  w: true,
  nw: true,
  se: true
};
var OMIT_SIDES_FOR_LINE_BACKSLASH = {
  e: true,
  s: true,
  n: true,
  w: true
};
var generateTransformHandle = (x, y, width, height, cx, cy, angle) => {
  const [xx, yy] = pointRotateRads12(
    pointFrom15(x + width / 2, y + height / 2),
    pointFrom15(cx, cy),
    angle
  );
  return [xx - width / 2, yy - height / 2, width, height];
};
var canResizeFromSides = (device) => {
  if (device.viewport.isMobile) {
    return false;
  }
  if (device.isTouchScreen && (isAndroid || isIOS)) {
    return false;
  }
  return true;
};
var getOmitSidesForDevice = (device) => {
  if (canResizeFromSides(device)) {
    return DEFAULT_OMIT_SIDES;
  }
  return {};
};
var getTransformHandlesFromCoords = ([x1, y1, x2, y2, cx, cy], angle, zoom, pointerType, omitSides = {}, margin = 4, spacing = DEFAULT_TRANSFORM_HANDLE_SPACING) => {
  const size = transformHandleSizes[pointerType];
  const handleWidth = size / zoom.value;
  const handleHeight = size / zoom.value;
  const handleMarginX = size / zoom.value;
  const handleMarginY = size / zoom.value;
  const width = x2 - x1;
  const height = y2 - y1;
  const dashedLineMargin = margin / zoom.value;
  const centeringOffset = (size - spacing * 2) / (2 * zoom.value);
  const transformHandles = {
    nw: omitSides.nw ? void 0 : generateTransformHandle(
      x1 - dashedLineMargin - handleMarginX + centeringOffset,
      y1 - dashedLineMargin - handleMarginY + centeringOffset,
      handleWidth,
      handleHeight,
      cx,
      cy,
      angle
    ),
    ne: omitSides.ne ? void 0 : generateTransformHandle(
      x2 + dashedLineMargin - centeringOffset,
      y1 - dashedLineMargin - handleMarginY + centeringOffset,
      handleWidth,
      handleHeight,
      cx,
      cy,
      angle
    ),
    sw: omitSides.sw ? void 0 : generateTransformHandle(
      x1 - dashedLineMargin - handleMarginX + centeringOffset,
      y2 + dashedLineMargin - centeringOffset,
      handleWidth,
      handleHeight,
      cx,
      cy,
      angle
    ),
    se: omitSides.se ? void 0 : generateTransformHandle(
      x2 + dashedLineMargin - centeringOffset,
      y2 + dashedLineMargin - centeringOffset,
      handleWidth,
      handleHeight,
      cx,
      cy,
      angle
    ),
    rotation: omitSides.rotation ? void 0 : generateTransformHandle(
      x1 + width / 2 - handleWidth / 2,
      y1 - dashedLineMargin - handleMarginY + centeringOffset - ROTATION_RESIZE_HANDLE_GAP / zoom.value,
      handleWidth,
      handleHeight,
      cx,
      cy,
      angle
    )
  };
  const minimumSizeForEightHandles = 5 * transformHandleSizes.mouse / zoom.value;
  if (Math.abs(width) > minimumSizeForEightHandles) {
    if (!omitSides.n) {
      transformHandles.n = generateTransformHandle(
        x1 + width / 2 - handleWidth / 2,
        y1 - dashedLineMargin - handleMarginY + centeringOffset,
        handleWidth,
        handleHeight,
        cx,
        cy,
        angle
      );
    }
    if (!omitSides.s) {
      transformHandles.s = generateTransformHandle(
        x1 + width / 2 - handleWidth / 2,
        y2 + dashedLineMargin - centeringOffset,
        handleWidth,
        handleHeight,
        cx,
        cy,
        angle
      );
    }
  }
  if (Math.abs(height) > minimumSizeForEightHandles) {
    if (!omitSides.w) {
      transformHandles.w = generateTransformHandle(
        x1 - dashedLineMargin - handleMarginX + centeringOffset,
        y1 + height / 2 - handleHeight / 2,
        handleWidth,
        handleHeight,
        cx,
        cy,
        angle
      );
    }
    if (!omitSides.e) {
      transformHandles.e = generateTransformHandle(
        x2 + dashedLineMargin - centeringOffset,
        y1 + height / 2 - handleHeight / 2,
        handleWidth,
        handleHeight,
        cx,
        cy,
        angle
      );
    }
  }
  return transformHandles;
};
var getTransformHandles = (element, zoom, elementsMap, pointerType = "mouse", omitSides = DEFAULT_OMIT_SIDES) => {
  if (element.locked || // Elbow arrows cannot be rotated
  isElbowArrow(element)) {
    return {};
  }
  if (element.type === "freedraw" || isLinearElement(element)) {
    if (element.points.length === 2) {
      const [, p1] = element.points;
      if (p1[0] === 0 || p1[1] === 0) {
        omitSides = OMIT_SIDES_FOR_LINE_BACKSLASH;
      } else if (p1[0] > 0 && p1[1] < 0) {
        omitSides = OMIT_SIDES_FOR_LINE_SLASH;
      } else if (p1[0] > 0 && p1[1] > 0) {
        omitSides = OMIT_SIDES_FOR_LINE_BACKSLASH;
      } else if (p1[0] < 0 && p1[1] > 0) {
        omitSides = OMIT_SIDES_FOR_LINE_SLASH;
      } else if (p1[0] < 0 && p1[1] < 0) {
        omitSides = OMIT_SIDES_FOR_LINE_BACKSLASH;
      }
    }
  } else if (isFrameLikeElement(element)) {
    omitSides = {
      ...omitSides,
      rotation: true
    };
  }
  const margin = isLinearElement(element) ? DEFAULT_TRANSFORM_HANDLE_SPACING + 8 : isImageElement(element) ? 0 : DEFAULT_TRANSFORM_HANDLE_SPACING;
  return getTransformHandlesFromCoords(
    getElementAbsoluteCoords2(element, elementsMap, true),
    element.angle,
    zoom,
    pointerType,
    omitSides,
    margin,
    isImageElement(element) ? 0 : void 0
  );
};
var shouldShowBoundingBox = (elements, appState) => {
  if (appState.editingLinearElement) {
    return false;
  }
  if (elements.length > 1) {
    return true;
  }
  const element = elements[0];
  if (isElbowArrow(element)) {
    return false;
  }
  if (!isLinearElement(element)) {
    return true;
  }
  return element.points.length > 2;
};

// src/resizeTest.ts
var isInsideTransformHandle = (transformHandle, x, y) => x >= transformHandle[0] && x <= transformHandle[0] + transformHandle[2] && y >= transformHandle[1] && y <= transformHandle[1] + transformHandle[3];
var resizeTest = (element, elementsMap, appState, x, y, zoom, pointerType, device) => {
  if (!appState.selectedElementIds[element.id]) {
    return false;
  }
  const { rotation: rotationTransformHandle, ...transformHandles } = getTransformHandles(
    element,
    zoom,
    elementsMap,
    pointerType,
    getOmitSidesForDevice(device)
  );
  if (rotationTransformHandle && isInsideTransformHandle(rotationTransformHandle, x, y)) {
    return "rotation";
  }
  const filter = Object.keys(transformHandles).filter((key) => {
    const transformHandle = transformHandles[key];
    if (!transformHandle) {
      return false;
    }
    return isInsideTransformHandle(transformHandle, x, y);
  });
  if (filter.length > 0) {
    return filter[0];
  }
  if (canResizeFromSides(device)) {
    const [x1, y1, x2, y2, cx, cy] = getElementAbsoluteCoords2(
      element,
      elementsMap
    );
    if (!(isLinearElement(element) && element.points.length <= 2)) {
      const SPACING = isImageElement(element) ? 0 : SIDE_RESIZING_THRESHOLD / zoom.value;
      const ZOOMED_SIDE_RESIZING_THRESHOLD = SIDE_RESIZING_THRESHOLD / zoom.value;
      const sides = getSelectionBorders(
        pointFrom16(x1 - SPACING, y1 - SPACING),
        pointFrom16(x2 + SPACING, y2 + SPACING),
        pointFrom16(cx, cy),
        element.angle
      );
      for (const [dir, side] of Object.entries(sides)) {
        if (pointOnLineSegment(
          pointFrom16(x, y),
          side,
          ZOOMED_SIDE_RESIZING_THRESHOLD
        )) {
          return dir;
        }
      }
    }
  }
  return false;
};
var getElementWithTransformHandleType = (elements, appState, scenePointerX, scenePointerY, zoom, pointerType, elementsMap, device) => {
  return elements.reduce((result, element) => {
    if (result) {
      return result;
    }
    const transformHandleType = resizeTest(
      element,
      elementsMap,
      appState,
      scenePointerX,
      scenePointerY,
      zoom,
      pointerType,
      device
    );
    return transformHandleType ? { element, transformHandleType } : null;
  }, null);
};
var getTransformHandleTypeFromCoords = ([x1, y1, x2, y2], scenePointerX, scenePointerY, zoom, pointerType, device) => {
  const transformHandles = getTransformHandlesFromCoords(
    [x1, y1, x2, y2, (x1 + x2) / 2, (y1 + y2) / 2],
    0,
    zoom,
    pointerType,
    getOmitSidesForDevice(device)
  );
  const found = Object.keys(transformHandles).find((key) => {
    const transformHandle = transformHandles[key];
    return transformHandle && isInsideTransformHandle(transformHandle, scenePointerX, scenePointerY);
  });
  if (found) {
    return found;
  }
  if (canResizeFromSides(device)) {
    const cx = (x1 + x2) / 2;
    const cy = (y1 + y2) / 2;
    const SPACING = SIDE_RESIZING_THRESHOLD / zoom.value;
    const sides = getSelectionBorders(
      pointFrom16(x1 - SPACING, y1 - SPACING),
      pointFrom16(x2 + SPACING, y2 + SPACING),
      pointFrom16(cx, cy),
      0
    );
    for (const [dir, side] of Object.entries(sides)) {
      if (pointOnLineSegment(
        pointFrom16(scenePointerX, scenePointerY),
        side,
        SPACING
      )) {
        return dir;
      }
    }
  }
  return false;
};
var RESIZE_CURSORS = ["ns", "nesw", "ew", "nwse"];
var rotateResizeCursor = (cursor, angle) => {
  const index = RESIZE_CURSORS.indexOf(cursor);
  if (index >= 0) {
    const a2 = Math.round(angle / (Math.PI / 4));
    cursor = RESIZE_CURSORS[(index + a2) % RESIZE_CURSORS.length];
  }
  return cursor;
};
var getCursorForResizingElement = (resizingElement) => {
  const { element, transformHandleType } = resizingElement;
  const shouldSwapCursors = element && Math.sign(element.height) * Math.sign(element.width) === -1;
  let cursor = null;
  switch (transformHandleType) {
    case "n":
    case "s":
      cursor = "ns";
      break;
    case "w":
    case "e":
      cursor = "ew";
      break;
    case "nw":
    case "se":
      if (shouldSwapCursors) {
        cursor = "nesw";
      } else {
        cursor = "nwse";
      }
      break;
    case "ne":
    case "sw":
      if (shouldSwapCursors) {
        cursor = "nwse";
      } else {
        cursor = "nesw";
      }
      break;
    case "rotation":
      return "grab";
  }
  if (cursor && element) {
    cursor = rotateResizeCursor(cursor, element.angle);
  }
  return cursor ? `${cursor}-resize` : "";
};
var getSelectionBorders = ([x1, y1], [x2, y2], center, angle) => {
  const topLeft = pointRotateRads13(pointFrom16(x1, y1), center, angle);
  const topRight = pointRotateRads13(pointFrom16(x2, y1), center, angle);
  const bottomLeft = pointRotateRads13(pointFrom16(x1, y2), center, angle);
  const bottomRight = pointRotateRads13(pointFrom16(x2, y2), center, angle);
  return {
    n: [topLeft, topRight],
    e: [topRight, bottomRight],
    s: [bottomRight, bottomLeft],
    w: [bottomLeft, topLeft]
  };
};

// src/showSelectedShapeActions.ts
init_define_import_meta_env();
var showSelectedShapeActions = (appState, elements) => Boolean(
  !appState.viewModeEnabled && appState.openDialog?.name !== "elementLinkSelector" && (appState.activeTool.type !== "custom" && (appState.editingTextElement || appState.activeTool.type !== "selection" && appState.activeTool.type !== "lasso" && appState.activeTool.type !== "eraser" && appState.activeTool.type !== "hand" && appState.activeTool.type !== "laser") || getSelectedElements(elements, appState).length)
);

// src/zindex.ts
init_define_import_meta_env();
import { arrayToMap as arrayToMap11, findIndex, findLastIndex as findLastIndex2 } from "@excalidraw/common";
var isOfTargetFrame = (element, frameId) => {
  return element.frameId === frameId || element.id === frameId;
};
var getIndicesToMove = (elements, appState, elementsToBeMoved) => {
  let selectedIndices = [];
  let deletedIndices = [];
  let includeDeletedIndex = null;
  let index = -1;
  const selectedElementIds = arrayToMap11(
    elementsToBeMoved ? elementsToBeMoved : getSelectedElements(elements, appState, {
      includeBoundTextElement: true,
      includeElementsInFrames: true
    })
  );
  while (++index < elements.length) {
    const element = elements[index];
    if (selectedElementIds.get(element.id)) {
      if (deletedIndices.length) {
        selectedIndices = selectedIndices.concat(deletedIndices);
        deletedIndices = [];
      }
      selectedIndices.push(index);
      includeDeletedIndex = index + 1;
    } else if (element.isDeleted && includeDeletedIndex === index) {
      includeDeletedIndex = index + 1;
      deletedIndices.push(index);
    } else {
      deletedIndices = [];
    }
  }
  return selectedIndices;
};
var toContiguousGroups = (array) => {
  let cursor = 0;
  return array.reduce((acc, value, index) => {
    if (index > 0 && array[index - 1] !== value - 1) {
      cursor = ++cursor;
    }
    (acc[cursor] || (acc[cursor] = [])).push(value);
    return acc;
  }, []);
};
var getTargetIndexAccountingForBinding = (nextElement, elements, direction, scene) => {
  if ("containerId" in nextElement && nextElement.containerId) {
    const containerElement = scene.getElement(nextElement.containerId);
    if (containerElement) {
      return direction === "left" ? Math.min(
        elements.indexOf(containerElement),
        elements.indexOf(nextElement)
      ) : Math.max(
        elements.indexOf(containerElement),
        elements.indexOf(nextElement)
      );
    }
  } else {
    const boundElementId = nextElement.boundElements?.find(
      (binding) => binding.type !== "arrow"
    )?.id;
    if (boundElementId) {
      const boundTextElement = scene.getElement(boundElementId);
      if (boundTextElement) {
        return direction === "left" ? Math.min(
          elements.indexOf(boundTextElement),
          elements.indexOf(nextElement)
        ) : Math.max(
          elements.indexOf(boundTextElement),
          elements.indexOf(nextElement)
        );
      }
    }
  }
};
var getContiguousFrameRangeElements = (allElements, frameId) => {
  let rangeStart = -1;
  let rangeEnd = -1;
  allElements.forEach((element, index) => {
    if (isOfTargetFrame(element, frameId)) {
      if (rangeStart === -1) {
        rangeStart = index;
      }
      rangeEnd = index;
    }
  });
  if (rangeStart === -1) {
    return [];
  }
  return allElements.slice(rangeStart, rangeEnd + 1);
};
var getTargetIndex = (appState, elements, boundaryIndex, direction, containingFrame, scene) => {
  const sourceElement = elements[boundaryIndex];
  const indexFilter = (element) => {
    if (element.isDeleted) {
      return false;
    }
    if (containingFrame) {
      return element.frameId === containingFrame;
    }
    if (appState.editingGroupId) {
      return element.groupIds.includes(appState.editingGroupId);
    }
    return true;
  };
  const candidateIndex = direction === "left" ? findLastIndex2(
    elements,
    (el) => indexFilter(el),
    Math.max(0, boundaryIndex - 1)
  ) : findIndex(elements, (el) => indexFilter(el), boundaryIndex + 1);
  const nextElement = elements[candidateIndex];
  if (!nextElement) {
    return -1;
  }
  if (appState.editingGroupId) {
    if (
      // candidate element is a sibling in current editing group → return
      sourceElement?.groupIds.join("") === nextElement?.groupIds.join("")
    ) {
      return getTargetIndexAccountingForBinding(
        nextElement,
        elements,
        direction,
        scene
      ) ?? candidateIndex;
    } else if (!nextElement?.groupIds.includes(appState.editingGroupId)) {
      return -1;
    }
  }
  if (!containingFrame && (nextElement.frameId || isFrameLikeElement(nextElement))) {
    const frameElements = getContiguousFrameRangeElements(
      elements,
      nextElement.frameId || nextElement.id
    );
    return direction === "left" ? elements.indexOf(frameElements[0]) : elements.indexOf(frameElements[frameElements.length - 1]);
  }
  if (!nextElement.groupIds.length) {
    return getTargetIndexAccountingForBinding(
      nextElement,
      elements,
      direction,
      scene
    ) ?? candidateIndex;
  }
  const siblingGroupId = appState.editingGroupId ? nextElement.groupIds[nextElement.groupIds.indexOf(appState.editingGroupId) - 1] : nextElement.groupIds[nextElement.groupIds.length - 1];
  const elementsInSiblingGroup = getElementsInGroup(elements, siblingGroupId);
  if (elementsInSiblingGroup.length) {
    return direction === "left" ? elements.indexOf(elementsInSiblingGroup[0]) : elements.indexOf(
      elementsInSiblingGroup[elementsInSiblingGroup.length - 1]
    );
  }
  return candidateIndex;
};
var getTargetElementsMap = (elements, indices) => {
  return indices.reduce((acc, index) => {
    const element = elements[index];
    acc.set(element.id, element);
    return acc;
  }, /* @__PURE__ */ new Map());
};
var shiftElementsByOne = (elements, appState, direction, scene) => {
  const indicesToMove = getIndicesToMove(elements, appState);
  const targetElementsMap = getTargetElementsMap(elements, indicesToMove);
  let groupedIndices = toContiguousGroups(indicesToMove);
  if (direction === "right") {
    groupedIndices = groupedIndices.reverse();
  }
  const selectedFrames = new Set(
    indicesToMove.filter((idx) => isFrameLikeElement(elements[idx])).map((idx) => elements[idx].id)
  );
  groupedIndices.forEach((indices, i) => {
    const leadingIndex = indices[0];
    const trailingIndex = indices[indices.length - 1];
    const boundaryIndex = direction === "left" ? leadingIndex : trailingIndex;
    const containingFrame = indices.some((idx) => {
      const el = elements[idx];
      return el.frameId && selectedFrames.has(el.frameId);
    }) ? null : elements[boundaryIndex]?.frameId;
    const targetIndex = getTargetIndex(
      appState,
      elements,
      boundaryIndex,
      direction,
      containingFrame,
      scene
    );
    if (targetIndex === -1 || boundaryIndex === targetIndex) {
      return;
    }
    const leadingElements = direction === "left" ? elements.slice(0, targetIndex) : elements.slice(0, leadingIndex);
    const targetElements = elements.slice(leadingIndex, trailingIndex + 1);
    const displacedElements = direction === "left" ? elements.slice(targetIndex, leadingIndex) : elements.slice(trailingIndex + 1, targetIndex + 1);
    const trailingElements = direction === "left" ? elements.slice(trailingIndex + 1) : elements.slice(targetIndex + 1);
    elements = direction === "left" ? [
      ...leadingElements,
      ...targetElements,
      ...displacedElements,
      ...trailingElements
    ] : [
      ...leadingElements,
      ...displacedElements,
      ...targetElements,
      ...trailingElements
    ];
  });
  syncMovedIndices(elements, targetElementsMap);
  return elements;
};
var shiftElementsToEnd = (elements, appState, direction, containingFrame, elementsToBeMoved) => {
  const indicesToMove = getIndicesToMove(elements, appState, elementsToBeMoved);
  const targetElementsMap = getTargetElementsMap(elements, indicesToMove);
  const displacedElements = [];
  let leadingIndex;
  let trailingIndex;
  if (direction === "left") {
    if (containingFrame) {
      leadingIndex = findIndex(
        elements,
        (el) => isOfTargetFrame(el, containingFrame)
      );
    } else if (appState.editingGroupId) {
      const groupElements = getElementsInGroup(
        elements,
        appState.editingGroupId
      );
      if (!groupElements.length) {
        return elements;
      }
      leadingIndex = elements.indexOf(groupElements[0]);
    } else {
      leadingIndex = 0;
    }
    trailingIndex = indicesToMove[indicesToMove.length - 1];
  } else {
    if (containingFrame) {
      trailingIndex = findLastIndex2(
        elements,
        (el) => isOfTargetFrame(el, containingFrame)
      );
    } else if (appState.editingGroupId) {
      const groupElements = getElementsInGroup(
        elements,
        appState.editingGroupId
      );
      if (!groupElements.length) {
        return elements;
      }
      trailingIndex = elements.indexOf(groupElements[groupElements.length - 1]);
    } else {
      trailingIndex = elements.length - 1;
    }
    leadingIndex = indicesToMove[0];
  }
  if (leadingIndex === -1) {
    leadingIndex = 0;
  }
  for (let index = leadingIndex; index < trailingIndex + 1; index++) {
    if (!indicesToMove.includes(index)) {
      displacedElements.push(elements[index]);
    }
  }
  const targetElements = Array.from(targetElementsMap.values());
  const leadingElements = elements.slice(0, leadingIndex);
  const trailingElements = elements.slice(trailingIndex + 1);
  const nextElements = direction === "left" ? [
    ...leadingElements,
    ...targetElements,
    ...displacedElements,
    ...trailingElements
  ] : [
    ...leadingElements,
    ...displacedElements,
    ...targetElements,
    ...trailingElements
  ];
  syncMovedIndices(nextElements, targetElementsMap);
  return nextElements;
};
function shiftElementsAccountingForFrames(allElements, appState, direction, shiftFunction) {
  const elementsToMove = arrayToMap11(
    getSelectedElements(allElements, appState, {
      includeBoundTextElement: true,
      includeElementsInFrames: true
    })
  );
  const frameAwareContiguousElementsToMove = { regularElements: [], frameChildren: /* @__PURE__ */ new Map() };
  const fullySelectedFrames = /* @__PURE__ */ new Set();
  for (const element of allElements) {
    if (elementsToMove.has(element.id) && isFrameLikeElement(element)) {
      fullySelectedFrames.add(element.id);
    }
  }
  for (const element of allElements) {
    if (elementsToMove.has(element.id)) {
      if (isFrameLikeElement(element) || element.frameId && fullySelectedFrames.has(element.frameId)) {
        frameAwareContiguousElementsToMove.regularElements.push(element);
      } else if (!element.frameId) {
        frameAwareContiguousElementsToMove.regularElements.push(element);
      } else {
        const frameChildren = frameAwareContiguousElementsToMove.frameChildren.get(
          element.frameId
        ) || [];
        frameChildren.push(element);
        frameAwareContiguousElementsToMove.frameChildren.set(
          element.frameId,
          frameChildren
        );
      }
    }
  }
  let nextElements = allElements;
  const frameChildrenSets = Array.from(
    frameAwareContiguousElementsToMove.frameChildren.entries()
  );
  for (const [frameId, children] of frameChildrenSets) {
    nextElements = shiftFunction(
      allElements,
      appState,
      direction,
      frameId,
      children
    );
  }
  return shiftFunction(
    nextElements,
    appState,
    direction,
    null,
    frameAwareContiguousElementsToMove.regularElements
  );
}
var moveOneLeft = (allElements, appState, scene) => {
  return shiftElementsByOne(allElements, appState, "left", scene);
};
var moveOneRight = (allElements, appState, scene) => {
  return shiftElementsByOne(allElements, appState, "right", scene);
};
var moveAllLeft = (allElements, appState) => {
  return shiftElementsAccountingForFrames(
    allElements,
    appState,
    "left",
    shiftElementsToEnd
  );
};
var moveAllRight = (allElements, appState) => {
  return shiftElementsAccountingForFrames(
    allElements,
    appState,
    "right",
    shiftElementsToEnd
  );
};

// src/index.ts
var getSceneVersion = (elements) => elements.reduce((acc, el) => acc + el.version, 0);
var hashElementsVersion = (elements) => {
  let hash = 5381;
  for (const element of toIterable2(elements)) {
    hash = (hash << 5) + hash + element.versionNonce;
  }
  return hash >>> 0;
};
var hashString = (s) => {
  let hash = 5381;
  for (let i = 0; i < s.length; i++) {
    const char = s.charCodeAt(i);
    hash = (hash << 5) + hash + char;
  }
  return hash >>> 0;
};
var getVisibleElements = (elements) => elements.filter(
  (el) => !el.isDeleted && !isInvisiblySmallElement(el)
);
var getNonDeletedElements3 = (elements) => elements.filter((element) => !element.isDeleted);
var isNonDeletedElement2 = (element) => !element.isDeleted;
var _clearElements = (elements) => getNonDeletedElements3(elements).map(
  (element) => isLinearElementType(element.type) ? { ...element, lastCommittedPoint: null } : element
);
var clearElementsForDatabase = (elements) => _clearElements(elements);
var clearElementsForExport = (elements) => _clearElements(elements);
var clearElementsForLocalStorage = (elements) => _clearElements(elements);
export {
  AppStateDelta,
  BASE_PADDING,
  BINDING_HIGHLIGHT_THICKNESS,
  BindableElement,
  BoundElement,
  CaptureUpdateAction,
  DEFAULT_LINK_SIZE,
  DEFAULT_OMIT_SIDES,
  Delta,
  DurableIncrement,
  ElementBounds,
  ElementsDelta,
  EphemeralIncrement,
  FIXED_BINDING_DISTANCE,
  FlowChartCreator,
  FlowChartNavigator,
  HEADING_DOWN,
  HEADING_LEFT,
  HEADING_RIGHT,
  HEADING_UP,
  IMAGE_INVERT_FILTER,
  INVISIBLY_SMALL_ELEMENT_SIZE,
  InvalidFractionalIndexError,
  LinearElementEditor,
  MINIMAL_CROP_SIZE,
  OMIT_SIDES_FOR_FRAME,
  OMIT_SIDES_FOR_MULTIPLE_ELEMENTS,
  Scene,
  ShapeCache,
  Store,
  StoreChange,
  StoreDelta,
  StoreIncrement,
  StoreSnapshot,
  aabbForElement,
  addElementsToFrame,
  addNewNodes,
  addToGroup,
  alignElements,
  avoidRectangularCorner,
  bindElementsToFramesAfterDuplication,
  bindLinearElement,
  bindOrUnbindLinearElement,
  bindOrUnbindLinearElements,
  bindPointToSnapToElementOutline,
  bindingBorderTest,
  bindingProperties,
  bumpVersion,
  calculateFixedPointForElbowArrowBinding,
  canApplyRoundnessTypeToElement,
  canBecomePolygon,
  canChangeRoundness,
  canCreateLinkFromElements,
  canHaveArrowheads,
  canResizeFromSides,
  charWidth,
  clearElementsForDatabase,
  clearElementsForExport,
  clearElementsForLocalStorage,
  compareHeading,
  computeBoundTextPosition,
  computeContainerDimensionForBoundText,
  containsCJK,
  createPlaceholderEmbeddableLabel,
  createSrcDoc,
  cropElement,
  deconstructDiamondElement,
  deconstructLinearOrFreeDrawElement,
  deconstructRectanguloidElement,
  deepCopyElement,
  defaultGetElementLinkFromSelection,
  detectLineHeight,
  distanceToElement,
  distributeElements,
  doBoundsIntersect,
  dragNewElement,
  dragSelectedElements,
  duplicateElement,
  duplicateElements,
  editGroupForSelectedElement,
  elementCenterPoint,
  elementOverlapsWithFrame,
  elementWithCanvasCache,
  elementsAreInFrameBounds,
  elementsAreInSameGroup,
  embeddableURLValidator,
  excludeElementsInFramesFromSelection,
  filterElementsEligibleAsFrameChildren,
  fixBindingsAfterDeletion,
  fixDuplicatedBindingsAfterDuplication,
  flipHeading,
  frameAndChildrenSelectedTogether,
  generateFreeDrawShape,
  generateLinearCollisionShape,
  generateRoughOptions,
  getApproxMinLineHeight,
  getApproxMinLineWidth,
  getArrowLocalFixedPoints,
  getArrowheadAngle,
  getArrowheadPoints,
  getArrowheadSize,
  getBoundTextElement,
  getBoundTextElementId,
  getBoundTextElementPosition,
  getBoundTextMaxHeight,
  getBoundTextMaxWidth,
  getBoundsFromPoints,
  getCenterForBounds,
  getClosestElementBounds,
  getCommonBoundingBox,
  getCommonBounds,
  getContainerCenter,
  getContainerCoords,
  getContainerElement,
  getContainingFrame,
  getCornerRadius,
  getCubicBezierCurveBound,
  getCursorForResizingElement,
  getDefaultFrameName,
  getDefaultRoundnessTypeForElement,
  getDiamondPoints,
  getDragOffsetXY,
  getDraggedElementsBounds,
  getElementAbsoluteCoords2 as getElementAbsoluteCoords,
  getElementBounds,
  getElementLineSegments,
  getElementPointsCoords,
  getElementShape,
  getElementWithTransformHandleType,
  getElementsCompletelyInFrame,
  getElementsInGroup,
  getElementsInNewFrame,
  getElementsInResizingFrame,
  getElementsIntersectingFrame,
  getElementsOverlappingFrame,
  getElementsWithinSelection,
  getEmbedLink,
  getFlipAdjustedCropPosition,
  getFrameChildren,
  getFrameLikeElements,
  getFrameLikeTitle,
  getFreeDrawPath2D,
  getFreeDrawSvgPath,
  getGlobalFixedPointForBindableElement,
  getGlobalFixedPoints,
  getHeadingForElbowArrowSnap,
  getHoveredElementForBinding,
  getInitializedImageElements,
  getLineHeightInPx,
  getLineWidth,
  getLinearElementSubType,
  getLinkDirectionFromKey,
  getLinkIdAndTypeFromSelection,
  getLockedLinearCursorAlignSize,
  getMaxCharWidth,
  getMaximumGroups,
  getMinCharWidth,
  getMinMaxXYFromCurvePathOps,
  getMinTextElementWidth,
  getNewGroupIdsForDuplication,
  getNonDeletedElements3 as getNonDeletedElements,
  getNonDeletedGroupIds,
  getNormalizedDimensions,
  getObservedAppState,
  getOmitSidesForDevice,
  getOriginalContainerHeightFromCache,
  getPerfectElementSize,
  getPredecessors,
  getRectangleBoxAbsoluteCoords,
  getRenderOpacity,
  getResizeArrowDirection,
  getResizeOffsetXY,
  getResizedElementAbsoluteCoords,
  getRootElements,
  getSceneVersion,
  getSelectedElements,
  getSelectedGroupForElement,
  getSelectedGroupIdForElement,
  getSelectedGroupIds,
  getSelectionStateForElements,
  getSuggestedBindingsForArrows,
  getTargetElements,
  getTargetFrame,
  getTextElementAngle,
  getTextFromElements,
  getTextHeight,
  getTextWidth,
  getTransformHandleTypeFromCoords,
  getTransformHandles,
  getTransformHandlesFromCoords,
  getUncroppedImageElement,
  getUncroppedWidthAndHeight,
  getVisibleAndNonSelectedElements,
  getVisibleElements,
  getVisibleSceneBounds,
  groupByFrameLikes,
  groupsAreAtLeastIntersectingTheFrame,
  groupsAreCompletelyOutOfFrame,
  handleBindTextResize,
  hasBackground,
  hasBoundTextElement,
  hasStrokeColor,
  hasStrokeStyle,
  hasStrokeWidth,
  hashElementsVersion,
  hashString,
  headingForPoint,
  headingForPointFromElement,
  headingForPointIsHorizontal,
  headingIsHorizontal,
  headingIsVertical,
  hitElementBoundText,
  hitElementBoundingBox,
  hitElementBoundingBoxOnly,
  hitElementItself,
  intersectElementWithLineSegment,
  isArrowBoundToElement,
  isArrowElement,
  isBindableElement,
  isBindingElement,
  isBindingElementType,
  isBindingEnabled,
  isBoundToContainer,
  isBounds,
  isCursorInFrame,
  isCurvedArrow,
  isElbowArrow,
  isElementCompletelyInViewport,
  isElementContainingFrame,
  isElementInFrame,
  isElementInGroup,
  isElementInViewport,
  isElementIntersectingFrame,
  isElementLink,
  isEmbeddableElement,
  isExcalidrawElement,
  isFixedPointBinding,
  isFlowchartNodeElement,
  isFrameElement,
  isFrameLikeElement,
  isFreeDrawElement,
  isFreeDrawElementType,
  isHTMLSVGElement,
  isIframeElement,
  isIframeLikeElement,
  isImageElement,
  isInGroup,
  isInitializedImageElement,
  isInvisiblySmallElement,
  isLineElement,
  isLinearElement,
  isLinearElementSimpleAndAlreadyBound,
  isLinearElementType,
  isMagicFrameElement,
  isMeasureTextSupported,
  isNodeInFlowchart,
  isNonDeletedElement2 as isNonDeletedElement,
  isPathALoop,
  isPointInElement,
  isRectangularElement,
  isRectanguloidElement,
  isSelectedViaGroup,
  isSharpArrow,
  isSimpleArrow,
  isSomeElementSelected,
  isTextBindableContainer,
  isTextElement,
  isUsingAdaptiveRadius,
  isUsingProportionalRadius,
  isValidPolygon,
  isValidTextContainer,
  loadHTMLImageElement,
  makeNextSelectedElementIds,
  maxBindingGap,
  maybeBindLinearElement,
  maybeParseEmbedSrc,
  maybeSuggestBindingsForLinearElementAtCoords,
  measureFontSizeFromWidth,
  measureText,
  moveAllLeft,
  moveAllRight,
  moveOneLeft,
  moveOneRight,
  mutateElement,
  newArrowElement,
  newElement,
  newElementWith,
  newEmbeddableElement,
  newFrameElement,
  newFreeDrawElement,
  newIframeElement,
  newImageElement,
  newLinearElement,
  newMagicFrameElement,
  newTextElement,
  normalizeElementOrder,
  normalizeFixedPoint,
  normalizeSVG,
  normalizeText,
  omitGroupsContainingFrameLikes,
  omitPartialGroups,
  orderByFractionalIndex,
  originalContainerCache,
  parseElementLinkFromURL,
  parseTokens,
  pathsCache,
  pointInsideBounds,
  redrawTextBoundingBox,
  refreshTextDimensions,
  removeAllElementsFromFrame,
  removeElementsFromFrame,
  removeFromSelectedGroups,
  renderElement,
  renderSelectionElement,
  replaceAllElementsInFrame,
  rescalePointsInElement,
  resetOriginalContainerCache,
  resizeMultipleElements,
  resizeSingleElement,
  resizeSingleTextElement,
  resizeTest,
  selectGroup,
  selectGroupsForSelectedElements,
  selectGroupsFromGivenElements,
  setCustomTextMetricsProvider,
  shouldAllowVerticalAlign,
  shouldApplyFrameClip,
  shouldEnableBindingForPointerEvent,
  shouldShowBoundingBox,
  shouldTestInside,
  showSelectedShapeActions,
  snapToMid,
  suppportsHorizontalAlign,
  syncInvalidIndices,
  syncInvalidIndicesImmutable,
  syncMovedIndices,
  toggleLinePolygonState,
  toolIsArrow,
  transformElements,
  updateBindings,
  updateBoundElements,
  updateElbowArrowPoints,
  updateFrameMembershipOfSelectedElements,
  updateImageCache,
  updateOriginalContainerCache,
  validateElbowPoints,
  validateFractionalIndices,
  vectorToHeading,
  wrapText
};
//# sourceMappingURL=index.js.map
