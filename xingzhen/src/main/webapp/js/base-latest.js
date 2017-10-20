!function e(t, n, i) {
    function o(a, s) {
        if (!n[a]) {
            if (!t[a]) {
                var l = "function" == typeof require && require;
                if (!s && l)return l(a, !0);
                if (r)return r(a, !0);
                throw new Error("Cannot find module '" + a + "'")
            }
            var c = n[a] = {exports: {}};
            t[a][0].call(c.exports, function (e) {
                var n = t[a][1][e];
                return o(n || e)
            }, c, c.exports, e, t, n, i)
        }
        return n[a].exports
    }

    for (var r = "function" == typeof require && require, a = 0; a < i.length; a++)o(i[a]);
    return o
}({
    1: [function (e, t, n) {
        (function (t, i, o, r, a, s, l, c, d) {
            function o(e, t, n) {
                if (!(this instanceof o))return new o(e, t, n);
                var i = typeof e;
                if ("base64" === t && "string" === i)for (e = q(e); e.length % 4 != 0;)e += "=";
                var r;
                if ("number" === i) r = z(e); else if ("string" === i) r = o.byteLength(e, t); else {
                    if ("object" !== i)throw new Error("First argument needs to be a number, array or string.");
                    r = z(e.length)
                }
                var a;
                o._useTypedArrays ? a = o._augment(new Uint8Array(r)) : (a = this, a.length = r, a._isBuffer = !0);
                var s;
                if (o._useTypedArrays && "number" == typeof e.byteLength) a._set(e); else if (N(e))for (s = 0; s < r; s++)o.isBuffer(e) ? a[s] = e.readUInt8(s) : a[s] = e[s]; else if ("string" === i) a.write(e, 0, t); else if ("number" === i && !o._useTypedArrays && !n)for (s = 0; s < r; s++)a[s] = 0;
                return a
            }

            function u(e, t, n, i) {
                n = Number(n) || 0;
                var r = e.length - n;
                i ? (i = Number(i)) > r && (i = r) : i = r;
                var a = t.length;
                Q(a % 2 == 0, "Invalid hex string"), i > a / 2 && (i = a / 2);
                for (var s = 0; s < i; s++) {
                    var l = parseInt(t.substr(2 * s, 2), 16);
                    Q(!isNaN(l), "Invalid hex string"), e[n + s] = l
                }
                return o._charsWritten = 2 * s, s
            }

            function f(e, t, n, i) {
                return o._charsWritten = R(M(t), e, n, i)
            }

            function p(e, t, n, i) {
                return o._charsWritten = R(W(t), e, n, i)
            }

            function h(e, t, n, i) {
                return p(e, t, n, i)
            }

            function m(e, t, n, i) {
                return o._charsWritten = R(Y(t), e, n, i)
            }

            function g(e, t, n, i) {
                return o._charsWritten = R(P(t), e, n, i)
            }

            function b(e, t, n) {
                return 0 === t && n === e.length ? J.fromByteArray(e) : J.fromByteArray(e.slice(t, n))
            }

            function v(e, t, n) {
                var i = "", o = "";
                n = Math.min(e.length, n);
                for (var r = t; r < n; r++)e[r] <= 127 ? (i += V(o) + String.fromCharCode(e[r]), o = "") : o += "%" + e[r].toString(16);
                return i + V(o)
            }

            function x(e, t, n) {
                var i = "";
                n = Math.min(e.length, n);
                for (var o = t; o < n; o++)i += String.fromCharCode(e[o]);
                return i
            }

            function w(e, t, n) {
                return x(e, t, n)
            }

            function y(e, t, n) {
                var i = e.length;
                (!t || t < 0) && (t = 0), (!n || n < 0 || n > i) && (n = i);
                for (var o = "", r = t; r < n; r++)o += B(e[r]);
                return o
            }

            function $(e, t, n) {
                for (var i = e.slice(t, n), o = "", r = 0; r < i.length; r += 2)o += String.fromCharCode(i[r] + 256 * i[r + 1]);
                return o
            }

            function _(e, t, n, i) {
                i || (Q("boolean" == typeof n, "missing or invalid endian"), Q(void 0 !== t && null !== t, "missing offset"), Q(t + 1 < e.length, "Trying to read beyond buffer length"));
                var o = e.length;
                if (!(t >= o)) {
                    var r;
                    return n ? (r = e[t], t + 1 < o && (r |= e[t + 1] << 8)) : (r = e[t] << 8, t + 1 < o && (r |= e[t + 1])), r
                }
            }

            function C(e, t, n, i) {
                i || (Q("boolean" == typeof n, "missing or invalid endian"), Q(void 0 !== t && null !== t, "missing offset"), Q(t + 3 < e.length, "Trying to read beyond buffer length"));
                var o = e.length;
                if (!(t >= o)) {
                    var r;
                    return n ? (t + 2 < o && (r = e[t + 2] << 16), t + 1 < o && (r |= e[t + 1] << 8), r |= e[t], t + 3 < o && (r += e[t + 3] << 24 >>> 0)) : (t + 1 < o && (r = e[t + 1] << 16), t + 2 < o && (r |= e[t + 2] << 8), t + 3 < o && (r |= e[t + 3]), r += e[t] << 24 >>> 0), r
                }
            }

            function k(e, t, n, i) {
                if (i || (Q("boolean" == typeof n, "missing or invalid endian"), Q(void 0 !== t && null !== t, "missing offset"), Q(t + 1 < e.length, "Trying to read beyond buffer length")), !(t >= e.length)) {
                    var o = _(e, t, n, !0);
                    return 32768 & o ? -1 * (65535 - o + 1) : o
                }
            }

            function T(e, t, n, i) {
                if (i || (Q("boolean" == typeof n, "missing or invalid endian"), Q(void 0 !== t && null !== t, "missing offset"), Q(t + 3 < e.length, "Trying to read beyond buffer length")), !(t >= e.length)) {
                    var o = C(e, t, n, !0);
                    return 2147483648 & o ? -1 * (4294967295 - o + 1) : o
                }
            }

            function j(e, t, n, i) {
                return i || (Q("boolean" == typeof n, "missing or invalid endian"), Q(t + 3 < e.length, "Trying to read beyond buffer length")), G.read(e, t, n, 23, 4)
            }

            function S(e, t, n, i) {
                return i || (Q("boolean" == typeof n, "missing or invalid endian"), Q(t + 7 < e.length, "Trying to read beyond buffer length")), G.read(e, t, n, 52, 8)
            }

            function D(e, t, n, i, o) {
                o || (Q(void 0 !== t && null !== t, "missing value"), Q("boolean" == typeof i, "missing or invalid endian"), Q(void 0 !== n && null !== n, "missing offset"), Q(n + 1 < e.length, "trying to write beyond buffer length"), Z(t, 65535));
                var r = e.length;
                if (!(n >= r))for (var a = 0, s = Math.min(r - n, 2); a < s; a++)e[n + a] = (t & 255 << 8 * (i ? a : 1 - a)) >>> 8 * (i ? a : 1 - a)
            }

            function E(e, t, n, i, o) {
                o || (Q(void 0 !== t && null !== t, "missing value"), Q("boolean" == typeof i, "missing or invalid endian"), Q(void 0 !== n && null !== n, "missing offset"), Q(n + 3 < e.length, "trying to write beyond buffer length"), Z(t, 4294967295));
                var r = e.length;
                if (!(n >= r))for (var a = 0, s = Math.min(r - n, 4); a < s; a++)e[n + a] = t >>> 8 * (i ? a : 3 - a) & 255
            }

            function F(e, t, n, i, o) {
                o || (Q(void 0 !== t && null !== t, "missing value"), Q("boolean" == typeof i, "missing or invalid endian"), Q(void 0 !== n && null !== n, "missing offset"), Q(n + 1 < e.length, "Trying to write beyond buffer length"), U(t, 32767, -32768)), n >= e.length || (t >= 0 ? D(e, t, n, i, o) : D(e, 65535 + t + 1, n, i, o))
            }

            function A(e, t, n, i, o) {
                o || (Q(void 0 !== t && null !== t, "missing value"), Q("boolean" == typeof i, "missing or invalid endian"), Q(void 0 !== n && null !== n, "missing offset"), Q(n + 3 < e.length, "Trying to write beyond buffer length"), U(t, 2147483647, -2147483648)), n >= e.length || (t >= 0 ? E(e, t, n, i, o) : E(e, 4294967295 + t + 1, n, i, o))
            }

            function O(e, t, n, i, o) {
                o || (Q(void 0 !== t && null !== t, "missing value"), Q("boolean" == typeof i, "missing or invalid endian"), Q(void 0 !== n && null !== n, "missing offset"), Q(n + 3 < e.length, "Trying to write beyond buffer length"), X(t, 3.4028234663852886e38, -3.4028234663852886e38)), n >= e.length || G.write(e, t, n, i, 23, 4)
            }

            function H(e, t, n, i, o) {
                o || (Q(void 0 !== t && null !== t, "missing value"), Q("boolean" == typeof i, "missing or invalid endian"), Q(void 0 !== n && null !== n, "missing offset"), Q(n + 7 < e.length, "Trying to write beyond buffer length"), X(t, 1.7976931348623157e308, -1.7976931348623157e308)), n >= e.length || G.write(e, t, n, i, 52, 8)
            }

            function q(e) {
                return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
            }

            function I(e, t, n) {
                return "number" != typeof e ? n : (e = ~~e) >= t ? t : e >= 0 ? e : (e += t, e >= 0 ? e : 0)
            }

            function z(e) {
                return e = ~~Math.ceil(+e), e < 0 ? 0 : e
            }

            function L(e) {
                return (Array.isArray || function (e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                })(e)
            }

            function N(e) {
                return L(e) || o.isBuffer(e) || e && "object" == typeof e && "number" == typeof e.length
            }

            function B(e) {
                return e < 16 ? "0" + e.toString(16) : e.toString(16)
            }

            function M(e) {
                for (var t = [], n = 0; n < e.length; n++) {
                    var i = e.charCodeAt(n);
                    if (i <= 127) t.push(e.charCodeAt(n)); else {
                        var o = n;
                        i >= 55296 && i <= 57343 && n++;
                        for (var r = encodeURIComponent(e.slice(o, n + 1)).substr(1).split("%"), a = 0; a < r.length; a++)t.push(parseInt(r[a], 16))
                    }
                }
                return t
            }

            function W(e) {
                for (var t = [], n = 0; n < e.length; n++)t.push(255 & e.charCodeAt(n));
                return t
            }

            function P(e) {
                for (var t, n, i, o = [], r = 0; r < e.length; r++)t = e.charCodeAt(r), n = t >> 8, i = t % 256, o.push(i), o.push(n);
                return o
            }

            function Y(e) {
                return J.toByteArray(e)
            }

            function R(e, t, n, i) {
                for (var o = 0; o < i && !(o + n >= t.length || o >= e.length); o++)t[o + n] = e[o];
                return o
            }

            function V(e) {
                try {
                    return decodeURIComponent(e)
                } catch (e) {
                    return String.fromCharCode(65533)
                }
            }

            function Z(e, t) {
                Q("number" == typeof e, "cannot write a non-number as a number"), Q(e >= 0, "specified a negative value for writing an unsigned value"), Q(e <= t, "value is larger than maximum value for type"), Q(Math.floor(e) === e, "value has a fractional component")
            }

            function U(e, t, n) {
                Q("number" == typeof e, "cannot write a non-number as a number"), Q(e <= t, "value larger than maximum allowed value"), Q(e >= n, "value smaller than minimum allowed value"), Q(Math.floor(e) === e, "value has a fractional component")
            }

            function X(e, t, n) {
                Q("number" == typeof e, "cannot write a non-number as a number"), Q(e <= t, "value larger than maximum allowed value"), Q(e >= n, "value smaller than minimum allowed value")
            }

            function Q(e, t) {
                if (!e)throw new Error(t || "Failed assertion")
            }

            var J = e("base64-js"), G = e("ieee754");
            n.Buffer = o, n.SlowBuffer = o, n.INSPECT_MAX_BYTES = 50, o.poolSize = 8192, o._useTypedArrays = function () {
                try {
                    var e = new ArrayBuffer(0), t = new Uint8Array(e);
                    return t.foo = function () {
                        return 42
                    }, 42 === t.foo() && "function" == typeof t.subarray
                } catch (e) {
                    return !1
                }
            }(), o.isEncoding = function (e) {
                switch (String(e).toLowerCase()) {
                    case"hex":
                    case"utf8":
                    case"utf-8":
                    case"ascii":
                    case"binary":
                    case"base64":
                    case"raw":
                    case"ucs2":
                    case"ucs-2":
                    case"utf16le":
                    case"utf-16le":
                        return !0;
                    default:
                        return !1
                }
            }, o.isBuffer = function (e) {
                return !(null === e || void 0 === e || !e._isBuffer)
            }, o.byteLength = function (e, t) {
                var n;
                switch (e += "", t || "utf8") {
                    case"hex":
                        n = e.length / 2;
                        break;
                    case"utf8":
                    case"utf-8":
                        n = M(e).length;
                        break;
                    case"ascii":
                    case"binary":
                    case"raw":
                        n = e.length;
                        break;
                    case"base64":
                        n = Y(e).length;
                        break;
                    case"ucs2":
                    case"ucs-2":
                    case"utf16le":
                    case"utf-16le":
                        n = 2 * e.length;
                        break;
                    default:
                        throw new Error("Unknown encoding")
                }
                return n
            }, o.concat = function (e, t) {
                if (Q(L(e), "Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."), 0 === e.length)return new o(0);
                if (1 === e.length)return e[0];
                var n;
                if ("number" != typeof t)for (t = 0, n = 0; n < e.length; n++)t += e[n].length;
                var i = new o(t), r = 0;
                for (n = 0; n < e.length; n++) {
                    var a = e[n];
                    a.copy(i, r), r += a.length
                }
                return i
            }, o.prototype.write = function (e, t, n, i) {
                if (isFinite(t)) isFinite(n) || (i = n, n = void 0); else {
                    var o = i;
                    i = t, t = n, n = o
                }
                t = Number(t) || 0;
                var r = this.length - t;
                n ? (n = Number(n)) > r && (n = r) : n = r, i = String(i || "utf8").toLowerCase();
                var a;
                switch (i) {
                    case"hex":
                        a = u(this, e, t, n);
                        break;
                    case"utf8":
                    case"utf-8":
                        a = f(this, e, t, n);
                        break;
                    case"ascii":
                        a = p(this, e, t, n);
                        break;
                    case"binary":
                        a = h(this, e, t, n);
                        break;
                    case"base64":
                        a = m(this, e, t, n);
                        break;
                    case"ucs2":
                    case"ucs-2":
                    case"utf16le":
                    case"utf-16le":
                        a = g(this, e, t, n);
                        break;
                    default:
                        throw new Error("Unknown encoding")
                }
                return a
            }, o.prototype.toString = function (e, t, n) {
                var i = this;
                if (e = String(e || "utf8").toLowerCase(), t = Number(t) || 0, (n = void 0 !== n ? Number(n) : n = i.length) === t)return "";
                var o;
                switch (e) {
                    case"hex":
                        o = y(i, t, n);
                        break;
                    case"utf8":
                    case"utf-8":
                        o = v(i, t, n);
                        break;
                    case"ascii":
                        o = x(i, t, n);
                        break;
                    case"binary":
                        o = w(i, t, n);
                        break;
                    case"base64":
                        o = b(i, t, n);
                        break;
                    case"ucs2":
                    case"ucs-2":
                    case"utf16le":
                    case"utf-16le":
                        o = $(i, t, n);
                        break;
                    default:
                        throw new Error("Unknown encoding")
                }
                return o
            }, o.prototype.toJSON = function () {
                return {type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0)}
            }, o.prototype.copy = function (e, t, n, i) {
                var r = this;
                if (n || (n = 0), i || 0 === i || (i = this.length), t || (t = 0), i !== n && 0 !== e.length && 0 !== r.length) {
                    Q(i >= n, "sourceEnd < sourceStart"), Q(t >= 0 && t < e.length, "targetStart out of bounds"), Q(n >= 0 && n < r.length, "sourceStart out of bounds"), Q(i >= 0 && i <= r.length, "sourceEnd out of bounds"), i > this.length && (i = this.length), e.length - t < i - n && (i = e.length - t + n);
                    var a = i - n;
                    if (a < 100 || !o._useTypedArrays)for (var s = 0; s < a; s++)e[s + t] = this[s + n]; else e._set(this.subarray(n, n + a), t)
                }
            }, o.prototype.slice = function (e, t) {
                var n = this.length;
                if (e = I(e, n, 0), t = I(t, n, n), o._useTypedArrays)return o._augment(this.subarray(e, t));
                for (var i = t - e, r = new o(i, void 0, !0), a = 0; a < i; a++)r[a] = this[a + e];
                return r
            }, o.prototype.get = function (e) {
                return console.log(".get() is deprecated. Access using array indexes instead."), this.readUInt8(e)
            }, o.prototype.set = function (e, t) {
                return console.log(".set() is deprecated. Access using array indexes instead."), this.writeUInt8(e, t)
            }, o.prototype.readUInt8 = function (e, t) {
                if (t || (Q(void 0 !== e && null !== e, "missing offset"), Q(e < this.length, "Trying to read beyond buffer length")), !(e >= this.length))return this[e]
            }, o.prototype.readUInt16LE = function (e, t) {
                return _(this, e, !0, t)
            }, o.prototype.readUInt16BE = function (e, t) {
                return _(this, e, !1, t)
            }, o.prototype.readUInt32LE = function (e, t) {
                return C(this, e, !0, t)
            }, o.prototype.readUInt32BE = function (e, t) {
                return C(this, e, !1, t)
            }, o.prototype.readInt8 = function (e, t) {
                if (t || (Q(void 0 !== e && null !== e, "missing offset"), Q(e < this.length, "Trying to read beyond buffer length")), !(e >= this.length)) {
                    return 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
                }
            }, o.prototype.readInt16LE = function (e, t) {
                return k(this, e, !0, t)
            }, o.prototype.readInt16BE = function (e, t) {
                return k(this, e, !1, t)
            }, o.prototype.readInt32LE = function (e, t) {
                return T(this, e, !0, t)
            }, o.prototype.readInt32BE = function (e, t) {
                return T(this, e, !1, t)
            }, o.prototype.readFloatLE = function (e, t) {
                return j(this, e, !0, t)
            }, o.prototype.readFloatBE = function (e, t) {
                return j(this, e, !1, t)
            }, o.prototype.readDoubleLE = function (e, t) {
                return S(this, e, !0, t)
            }, o.prototype.readDoubleBE = function (e, t) {
                return S(this, e, !1, t)
            }, o.prototype.writeUInt8 = function (e, t, n) {
                n || (Q(void 0 !== e && null !== e, "missing value"), Q(void 0 !== t && null !== t, "missing offset"), Q(t < this.length, "trying to write beyond buffer length"), Z(e, 255)), t >= this.length || (this[t] = e)
            }, o.prototype.writeUInt16LE = function (e, t, n) {
                D(this, e, t, !0, n)
            }, o.prototype.writeUInt16BE = function (e, t, n) {
                D(this, e, t, !1, n)
            }, o.prototype.writeUInt32LE = function (e, t, n) {
                E(this, e, t, !0, n)
            }, o.prototype.writeUInt32BE = function (e, t, n) {
                E(this, e, t, !1, n)
            }, o.prototype.writeInt8 = function (e, t, n) {
                n || (Q(void 0 !== e && null !== e, "missing value"), Q(void 0 !== t && null !== t, "missing offset"), Q(t < this.length, "Trying to write beyond buffer length"), U(e, 127, -128)), t >= this.length || (e >= 0 ? this.writeUInt8(e, t, n) : this.writeUInt8(255 + e + 1, t, n))
            }, o.prototype.writeInt16LE = function (e, t, n) {
                F(this, e, t, !0, n)
            }, o.prototype.writeInt16BE = function (e, t, n) {
                F(this, e, t, !1, n)
            }, o.prototype.writeInt32LE = function (e, t, n) {
                A(this, e, t, !0, n)
            }, o.prototype.writeInt32BE = function (e, t, n) {
                A(this, e, t, !1, n)
            }, o.prototype.writeFloatLE = function (e, t, n) {
                O(this, e, t, !0, n)
            }, o.prototype.writeFloatBE = function (e, t, n) {
                O(this, e, t, !1, n)
            }, o.prototype.writeDoubleLE = function (e, t, n) {
                H(this, e, t, !0, n)
            }, o.prototype.writeDoubleBE = function (e, t, n) {
                H(this, e, t, !1, n)
            }, o.prototype.fill = function (e, t, n) {
                if (e || (e = 0), t || (t = 0), n || (n = this.length), "string" == typeof e && (e = e.charCodeAt(0)), Q("number" == typeof e && !isNaN(e), "value is not a number"), Q(n >= t, "end < start"), n !== t && 0 !== this.length) {
                    Q(t >= 0 && t < this.length, "start out of bounds"), Q(n >= 0 && n <= this.length, "end out of bounds");
                    for (var i = t; i < n; i++)this[i] = e
                }
            }, o.prototype.inspect = function () {
                for (var e = [], t = this.length, i = 0; i < t; i++)if (e[i] = B(this[i]), i === n.INSPECT_MAX_BYTES) {
                    e[i + 1] = "...";
                    break
                }
                return "<Buffer " + e.join(" ") + ">"
            }, o.prototype.toArrayBuffer = function () {
                if ("undefined" != typeof Uint8Array) {
                    if (o._useTypedArrays)return new o(this).buffer;
                    for (var e = new Uint8Array(this.length), t = 0, n = e.length; t < n; t += 1)e[t] = this[t];
                    return e.buffer
                }
                throw new Error("Buffer.toArrayBuffer not supported in this browser")
            };
            var K = o.prototype;
            o._augment = function (e) {
                return e._isBuffer = !0, e._get = e.get, e._set = e.set, e.get = K.get, e.set = K.set, e.write = K.write, e.toString = K.toString, e.toLocaleString = K.toString, e.toJSON = K.toJSON, e.copy = K.copy, e.slice = K.slice, e.readUInt8 = K.readUInt8, e.readUInt16LE = K.readUInt16LE, e.readUInt16BE = K.readUInt16BE, e.readUInt32LE = K.readUInt32LE, e.readUInt32BE = K.readUInt32BE, e.readInt8 = K.readInt8, e.readInt16LE = K.readInt16LE, e.readInt16BE = K.readInt16BE, e.readInt32LE = K.readInt32LE, e.readInt32BE = K.readInt32BE, e.readFloatLE = K.readFloatLE, e.readFloatBE = K.readFloatBE, e.readDoubleLE = K.readDoubleLE, e.readDoubleBE = K.readDoubleBE, e.writeUInt8 = K.writeUInt8, e.writeUInt16LE = K.writeUInt16LE, e.writeUInt16BE = K.writeUInt16BE, e.writeUInt32LE = K.writeUInt32LE, e.writeUInt32BE = K.writeUInt32BE, e.writeInt8 = K.writeInt8, e.writeInt16LE = K.writeInt16LE, e.writeInt16BE = K.writeInt16BE, e.writeInt32LE = K.writeInt32LE, e.writeInt32BE = K.writeInt32BE, e.writeFloatLE = K.writeFloatLE, e.writeFloatBE = K.writeFloatBE, e.writeDoubleLE = K.writeDoubleLE, e.writeDoubleBE = K.writeDoubleBE, e.fill = K.fill, e.inspect = K.inspect, e.toArrayBuffer = K.toArrayBuffer, e
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/index.js", "/../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer")
    }, {"1YiZ5S": 4, "base64-js": 2, buffer: 1, ieee754: 3}],
    2: [function (e, t, n) {
        (function (e, t, i, o, r, a, s, l, c) {
            !function (e) {
                "use strict";
                function t(e) {
                    var t = e.charCodeAt(0);
                    return t === r || t === d ? 62 : t === a || t === u ? 63 : t < s ? -1 : t < s + 10 ? t - s + 26 + 26 : t < c + 26 ? t - c : t < l + 26 ? t - l + 26 : void 0
                }

                function n(e) {
                    function n(e) {
                        c[u++] = e
                    }

                    var i, r, a, s, l, c;
                    if (e.length % 4 > 0)throw new Error("Invalid string. Length must be a multiple of 4");
                    var d = e.length;
                    l = "=" === e.charAt(d - 2) ? 2 : "=" === e.charAt(d - 1) ? 1 : 0, c = new o(3 * e.length / 4 - l), a = l > 0 ? e.length - 4 : e.length;
                    var u = 0;
                    for (i = 0, r = 0; i < a; i += 4, r += 3)s = t(e.charAt(i)) << 18 | t(e.charAt(i + 1)) << 12 | t(e.charAt(i + 2)) << 6 | t(e.charAt(i + 3)), n((16711680 & s) >> 16), n((65280 & s) >> 8), n(255 & s);
                    return 2 === l ? (s = t(e.charAt(i)) << 2 | t(e.charAt(i + 1)) >> 4, n(255 & s)) : 1 === l && (s = t(e.charAt(i)) << 10 | t(e.charAt(i + 1)) << 4 | t(e.charAt(i + 2)) >> 2, n(s >> 8 & 255), n(255 & s)), c
                }

                function i(e) {
                    function t(e) {
                        return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e)
                    }

                    var n, i, o, r = e.length % 3, a = "";
                    for (n = 0, o = e.length - r; n < o; n += 3)i = (e[n] << 16) + (e[n + 1] << 8) + e[n + 2], a += function (e) {
                        return t(e >> 18 & 63) + t(e >> 12 & 63) + t(e >> 6 & 63) + t(63 & e)
                    }(i);
                    switch (r) {
                        case 1:
                            i = e[e.length - 1], a += t(i >> 2), a += t(i << 4 & 63), a += "==";
                            break;
                        case 2:
                            i = (e[e.length - 2] << 8) + e[e.length - 1], a += t(i >> 10), a += t(i >> 4 & 63), a += t(i << 2 & 63), a += "="
                    }
                    return a
                }

                var o = "undefined" != typeof Uint8Array ? Uint8Array : Array, r = "+".charCodeAt(0),
                    a = "/".charCodeAt(0), s = "0".charCodeAt(0), l = "a".charCodeAt(0), c = "A".charCodeAt(0),
                    d = "-".charCodeAt(0), u = "_".charCodeAt(0);
                e.toByteArray = n, e.fromByteArray = i
            }(void 0 === n ? this.base64js = {} : n)
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/base64-js/lib/b64.js", "/../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/base64-js/lib")
    }, {"1YiZ5S": 4, buffer: 1}],
    3: [function (e, t, n) {
        (function (e, t, i, o, r, a, s, l, c) {
            n.read = function (e, t, n, i, o) {
                var r, a, s = 8 * o - i - 1, l = (1 << s) - 1, c = l >> 1, d = -7, u = n ? o - 1 : 0, f = n ? -1 : 1,
                    p = e[t + u];
                for (u += f, r = p & (1 << -d) - 1, p >>= -d, d += s; d > 0; r = 256 * r + e[t + u], u += f, d -= 8);
                for (a = r & (1 << -d) - 1, r >>= -d, d += i; d > 0; a = 256 * a + e[t + u], u += f, d -= 8);
                if (0 === r) r = 1 - c; else {
                    if (r === l)return a ? NaN : 1 / 0 * (p ? -1 : 1);
                    a += Math.pow(2, i), r -= c
                }
                return (p ? -1 : 1) * a * Math.pow(2, r - i)
            }, n.write = function (e, t, n, i, o, r) {
                var a, s, l, c = 8 * r - o - 1, d = (1 << c) - 1, u = d >> 1,
                    f = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0, p = i ? 0 : r - 1, h = i ? 1 : -1,
                    m = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
                for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (s = isNaN(t) ? 1 : 0, a = d) : (a = Math.floor(Math.log(t) / Math.LN2), t * (l = Math.pow(2, -a)) < 1 && (a--, l *= 2), t += a + u >= 1 ? f / l : f * Math.pow(2, 1 - u), t * l >= 2 && (a++, l /= 2), a + u >= d ? (s = 0, a = d) : a + u >= 1 ? (s = (t * l - 1) * Math.pow(2, o), a += u) : (s = t * Math.pow(2, u - 1) * Math.pow(2, o), a = 0)); o >= 8; e[n + p] = 255 & s, p += h, s /= 256, o -= 8);
                for (a = a << o | s, c += o; c > 0; e[n + p] = 255 & a, p += h, a /= 256, c -= 8);
                e[n + p - h] |= 128 * m
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/ieee754/index.js", "/../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/ieee754")
    }, {"1YiZ5S": 4, buffer: 1}],
    4: [function (e, t, n) {
        (function (e, n, i, o, r, a, s, l, c) {
            function d() {
            }

            var e = t.exports = {};
            e.nextTick = function () {
                var e = "undefined" != typeof window && window.setImmediate,
                    t = "undefined" != typeof window && window.postMessage && window.addEventListener;
                if (e)return function (e) {
                    return window.setImmediate(e)
                };
                if (t) {
                    var n = [];
                    return window.addEventListener("message", function (e) {
                        var t = e.source;
                        if ((t === window || null === t) && "process-tick" === e.data && (e.stopPropagation(), n.length > 0)) {
                            n.shift()()
                        }
                    }, !0), function (e) {
                        n.push(e), window.postMessage("process-tick", "*")
                    }
                }
                return function (e) {
                    setTimeout(e, 0)
                }
            }(), e.title = "browser", e.browser = !0, e.env = {}, e.argv = [], e.on = d, e.addListener = d, e.once = d, e.off = d, e.removeListener = d, e.removeAllListeners = d, e.emit = d, e.binding = function (e) {
                throw new Error("process.binding is not supported")
            }, e.cwd = function () {
                return "/"
            }, e.chdir = function (e) {
                throw new Error("process.chdir is not supported")
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/gulp-browserify/node_modules/browserify/node_modules/process/browser.js", "/../node_modules/gulp-browserify/node_modules/browserify/node_modules/process")
    }, {"1YiZ5S": 4, buffer: 1}],
    5: [function (e, t, n) {
        (function (t, n, i, o, r, a, s, l, c) {
            e("./behaviors/wave"), e("./behaviors/date-time"), e("./behaviors/date-range"), e("./behaviors/log-children"), e("./behaviors/toggle-active"), e("./behaviors/in-wrap"), e("./behaviors/has-paging"), e("./behaviors/auto-dict"), e("./behaviors/auto-reset"), e("./behaviors/auto-events"), e("./behaviors/validate-id"), e("./behaviors/x-select2"), e("./behaviors/number-spinner"), e("./behaviors/query-block"), e("./behaviors/asScrollbar-handle"), e("./behaviors/textarea-change"), e("./behaviors/panel-full-panel"), e("./behaviors/panel-color-box"), e("./behaviors/kyjcry-picker"), e("./behaviors/more-codition"), e("./behaviors/watch-title"), e("./behaviors/result-pack")
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/behavior.js", "/")
    }, {
        "./behaviors/asScrollbar-handle": 6,
        "./behaviors/auto-dict": 7,
        "./behaviors/auto-events": 8,
        "./behaviors/auto-reset": 9,
        "./behaviors/date-range": 10,
        "./behaviors/date-time": 11,
        "./behaviors/has-paging": 12,
        "./behaviors/in-wrap": 13,
        "./behaviors/kyjcry-picker": 14,
        "./behaviors/log-children": 15,
        "./behaviors/more-codition": 16,
        "./behaviors/number-spinner": 17,
        "./behaviors/panel-color-box": 18,
        "./behaviors/panel-full-panel": 19,
        "./behaviors/query-block": 20,
        "./behaviors/result-pack": 21,
        "./behaviors/textarea-change": 22,
        "./behaviors/toggle-active": 23,
        "./behaviors/validate-id": 24,
        "./behaviors/watch-title": 25,
        "./behaviors/wave": 26,
        "./behaviors/x-select2": 27,
        "1YiZ5S": 4,
        buffer: 1
    }],
    6: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            function c(e) {
                $(this).mouseenter(function () {
                    $(this)[0].scrollHeight - $(this)[0].clientHeight > 0 ? $(this).addClass("hasScrollbar") : $(this).removeClass("hasScrollbar")
                })
            }

            $behavior("asScrollbar-handle", function () {
                return {
                    init: function (e) {
                        c.call(this, e)
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/behaviors/asScrollbar-handle.js", "/behaviors")
    }, {"1YiZ5S": 4, buffer: 1}],
    7: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            function c() {
                var e = $(this).addClass("dict").attr("x-dict", ""), t = e.attr("dict-name"), n = e.attr("x-name");
                if (!t && !n)throw new Error("the dict has no dict-name or x-name");
                return t && e.attr("x-name", t), n && e.attr("dict-name", n), e
            }

            $behavior("dict", function () {
                return {
                    importing: ["dict"], init: function (e) {
                        var t = c.call(this);
                        "false" !== e.auto && (e.act ? window["$" + (e.act.split("@")[1] || "get")](window.makeAct(e.act.split("@")[0], null, e.subprj), null, function (e) {
                            t.dict(e.data)
                        }) : t.dict())
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/behaviors/auto-dict.js", "/behaviors")
    }, {"1YiZ5S": 4, buffer: 1}],
    8: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            function c(e, t, n) {
                e.click($.dbs(function () {
                    e.trigger(t)
                }, 1200, !0))
            }

            $behavior("x-query", function () {
                return {
                    init: function (e) {
                        c($(this), "x-query")
                    }
                }
            })("x-reset", function () {
                return {
                    init: function (e) {
                        c($(this), "x-reset")
                    }
                }
            })("x-go-save", function () {
                return {
                    init: function (e) {
                        c($(this), "x-go-save")
                    }
                }
            })("x-save", function () {
                return {
                    init: function (e) {
                        c($(this), "x-save")
                    }
                }
            })("x-cancel", function () {
                return {
                    init: function (e) {
                        c($(this), "x-cancel")
                    }
                }
            })("x-redo", function () {
                return {
                    init: function (e) {
                        c($(this), "x-redo")
                    }
                }
            })("x-excel", function () {
                return {
                    init: function (e) {
                        c($(this), "x-excel")
                    }
                }
            })("x-remove", function () {
                return {
                    init: function (e) {
                        c($(this), "x-remove")
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/behaviors/auto-events.js", "/behaviors")
    }, {"1YiZ5S": 4, buffer: 1}],
    9: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            $behavior("auto-reset", function () {
                return {
                    init: function (e) {
                        var t = $(this);
                        t.on("x-reset", function () {
                            t.xReset()
                        })
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/behaviors/auto-reset.js", "/behaviors")
    }, {"1YiZ5S": 4, buffer: 1}],
    10: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            $behavior("date-range", function () {
                return {
                    importing: ["daterangepicker"], init: function (e) {
                        var t = $(this), n = e.timepicker;
                        t.addClass("cm-input date-range-picker").daterangepicker({timePicker: "true" == String(n)}).extractor("rangeDate").injector("rangeDate")
                    }
                }
            })("date-range2", function () {
                return {
                    importing: ["daterangepicker"], init: function (e) {
                        var t = $(this), n = e.timepicker2;
                        t.addClass("cm-input date-range-picker").daterangepicker({timePicker2: "true" == String(n)}).extractor("rangeDate").injector("rangeDate")
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/behaviors/date-range.js", "/behaviors")
    }, {"1YiZ5S": 4, buffer: 1}],
    11: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            $behavior("date-time", function () {
                return {
                    importing: ["datetimepicker"], init: function (e) {
                        var t = $(this), n = (e.timepicker, e.mindate), i = e.maxdate;
                        t.addClass("cm-input").datetimepicker({
                            format: "YYYY-MM-DD",
                            pickTime: !1,
                            minDate: !!n && new Date,
                            maxDate: !!i && new Date
                        })
                    }
                }
            })("date-time2", function () {
                return {
                    importing: ["datetimepicker"], init: function (e) {
                        var t = $(this), n = (e.timepicker, e.mindate), i = e.maxdate;
                        t.addClass("cm-input").datetimepicker({
                            format: "YYYY-MM-DD HH:MM",
                            minDate: !!n && new Date,
                            maxDate: !!i && new Date
                        })
                    }
                }
            })("date-time3", function () {
                return {
                    importing: ["datetimepicker"], init: function (e) {
                        var t = $(this), n = (e.timepicker, e.mindate), i = e.maxdate;
                        t.addClass("cm-input").datetimepicker({
                            inline: !0,
                            sideBySide: !0,
                            minDate: !!n && new Date,
                            maxDate: !!i && new Date
                        })
                    }
                }
            })("date-time4", function () {
                return {
                    importing: ["datetimepicker"], init: function (e) {
                        var t = $(this), n = (e.timepicker, e.mindate), i = e.maxdate;
                        t.addClass("cm-input").datetimepicker({
                            format: "YYYY-MM-DD HH:MM:SS",
                            inline: !0,
                            sideBySide: !0,
                            minDate: !!n && new Date,
                            maxDate: !!i && new Date
                        })
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/behaviors/date-time.js", "/behaviors")
    }, {"1YiZ5S": 4, buffer: 1}],
    12: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            $behavior("has-paging", function () {
                return {
                    init: function (e) {
                        $(this).append('<div class="paging">')
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/behaviors/has-paging.js", "/behaviors")
    }, {"1YiZ5S": 4, buffer: 1}],
    13: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            $behavior("in-wrap", function () {
                return {
                    init: function (e) {
                        $(this).wrap('<div class="{0}">'.format(e.wrapcls || "all-fix-wrap"))
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/behaviors/in-wrap.js", "/behaviors")
    }, {"1YiZ5S": 4, buffer: 1}],
    14: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            function c() {
                var e = $(this).addClass("dict").attr("x-dict", ""), t = e.attr("dict-name"), n = e.attr("x-name");
                if (!t && !n)throw new Error("the dict has no dict-name or x-name");
                return t && e.attr("x-name", t), n && e.attr("dict-name", n), e
            }

            function d(e) {
                var t = $(this), n = t.attr("dict-name"), i = t.attr("dict-id"), o = t.find("#" + i).val(),
                    r = t.find("#query-kyjcry-input-hidden").val(), a = o || r;
                if (!e)return a;
                e[n] = a
            }

            $behavior("kyjcry-picker", function () {
                return {
                    importing: ["dict"], init: function (e) {
                        c.call(this).extractor(d)
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/behaviors/kyjcry-picker.js", "/behaviors")
    }, {"1YiZ5S": 4, buffer: 1}],
    15: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            $behavior("info-childNodes", function () {
                return {
                    init: function (e) {
                        var t = $(this), n = e.selector || "*", i = e.all;
                        t.click(function () {
                            var e = t[i ? "find" : "children"](n).toArray();
                            log("子元素:{0}个,  选择器:{1},  查找范围:{2}".format(e.length, n, i ? "所有子孙元素" : "直接子元素")), console.info(e)
                        })
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/behaviors/log-children.js", "/behaviors")
    }, {"1YiZ5S": 4, buffer: 1}],
    16: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            function c(e) {
                var t = $(this);
                (e.selector ? t.find(e.selector) : t).on("click", function () {
                    $(".query-condition-hide").slideUp()
                })
            }

            function d() {
                $(this).on("click", function () {
                    $(".query-condition-hide").slideDown()
                })
            }

            $behavior("toggle-more-condition", function () {
                return {
                    init: function (e) {
                        toggleMoreCondition.call(this, e)
                    }
                }
            })("hide-more-condition", function () {
                return {
                    init: function (e) {
                        c.call(this, e)
                    }
                }
            })("show-more-condition", function () {
                return {
                    init: function (e) {
                        d.call(this, e)
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/behaviors/more-codition.js", "/behaviors")
    }, {"1YiZ5S": 4, buffer: 1}],
    17: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            $behavior("number-spinner", function () {
                return {
                    init: function () {
                        $(this).numberspinner()
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/behaviors/number-spinner.js", "/behaviors")
    }, {"1YiZ5S": 4, buffer: 1}],
    18: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            $behavior("panel-color-box", function () {
                return {
                    importing: ["panelCtrls"], init: function () {
                        $.colorBox($(this).parent(".panel-controls"))
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/behaviors/panel-color-box.js", "/behaviors")
    }, {"1YiZ5S": 4, buffer: 1}],
    19: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            $behavior("panel-full-panel", function () {
                return {
                    importing: ["panelCtrls"], init: function () {
                        $(this).closest(".hook-panel").fullPanel()
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/behaviors/panel-full-panel.js", "/behaviors")
    }, {"1YiZ5S": 4, buffer: 1}],
    20: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            function c(e, t, n) {
                e.click($.dbs(function () {
                    e.trigger(t)
                }, 1200, !0))
            }

            $behavior("query", function () {
                return {
                    init: function (e) {
                        c($(this), "x-query", e)
                    }
                }
            })("reset", function () {
                return {
                    init: function (e) {
                        c($(this), "x-reset", e)
                    }
                }
            })("query-block", function () {
                return {
                    init: function (e) {
                        var t = $(this);
                        c(t.find(".cm-query-btn").not(".query-widget-wrap *"), "x-query"), c(t.find(".cm-reset-btn").not(".query-widget-wrap *"), "x-reset")
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/behaviors/query-block.js", "/behaviors")
    }, {"1YiZ5S": 4, buffer: 1}],
    21: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            $behavior("result-pack", function () {
                return {
                    importing: ["panelCtrls"], init: function (e) {
                        e.title = e.title || "查询结果";
                        var t = $(this),
                            n = '<div class="panel-heading query-title">                                        <span>                                            <span class="panel-icon"><i class="icon-search"></i></span>                                            <span class="panel-title">{title}                                                <em>共找到<i class="total-count">0</i>条符合的记录</em>                                            </span>                                        </span>                                        <span class="panel-controls fr">                                            <a href="javascript:void(0);" class="into-change-color panel-control-color {color}"></a>                                            <a href="javascript:void(0);" class="into-full icon-resize-full full-ctrl-btn {full}" title="最大化显示"></a>                                            <a href="javascript:void(0);" class="h-config hide" title="自定义列占位"></a>                                        </span>                                        <div class="hook-btns-box fr"><div></div></div>                                    </div>'.format(e);
                        t.prepend(n),
                            t.append('<div class="paging"></div>'), t.find(".hook-btns-box>div").replaceWith(t.find(".hook-btns").children()), t.find(".hook-btns").remove(), $.colorBox(t.children(".query-title")[0]), t.fullPanel()
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/behaviors/result-pack.js", "/behaviors")
    }, {"1YiZ5S": 4, buffer: 1}],
    22: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            function c(e) {
                $(this).not(".ui-noborder").on("focus", function () {
                    $(this).css({overflowY: "auto"}).removeClass("ellipsis").animate({height: 55})
                }).on("blur", function () {
                    $(this).css({overflowY: "hidden"}).addClass("ellipsis").animate({height: 27})
                })
            }

            $behavior("textarea-change", function () {
                return {
                    init: function (e) {
                        c.call(this, e)
                    }
                }
            }), $behavior("ui-required", function () {
                return {
                    init: function () {
                        var e = $(this);
                        e.val() || e.addClass("cm-ui-required"), e.on("input change", function () {
                            $(this).val() ? e.removeClass("cm-ui-required") : e.addClass("cm-ui-required")
                        })
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/behaviors/textarea-change.js", "/behaviors")
    }, {"1YiZ5S": 4, buffer: 1}],
    23: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            function c() {
                $(this).children().on("click", function () {
                    $(this).addClass("active").siblings().removeClass("active")
                })
            }

            $behavior("toggle-active", function () {
                return {
                    init: function (e) {
                        c.call(this, e)
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/behaviors/toggle-active.js", "/behaviors")
    }, {"1YiZ5S": 4, buffer: 1}],
    24: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            function c() {
                $(this).validatebox({required: !0, validType: "isChineseID"})
            }

            $behavior("validate-id", function () {
                return {
                    init: function () {
                        $(this).on({blur: c.call(this), "x-validate": c.call(this)})
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/behaviors/validate-id.js", "/behaviors")
    }, {"1YiZ5S": 4, buffer: 1}],
    25: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            $behavior("watchAllValToTitle", function () {
                return {
                    init: function (e) {
                        var t = e["target-sync-attr"] || "title", n = +e.itv || 160, i = function (e, o) {
                            setTimeout(function () {
                                e.prop(t, e.xVal()), i(e, o)
                            }, n + 5 * o)
                        };
                        $(this).xReady(function () {
                            $(this).find("[x-name]").each(function (n) {
                                var o = $(this);
                                e["set-event"] ? o.on("x-set", function () {
                                    o.prop(t, o.xVal())
                                }) : i(o, n)
                            })
                        })
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/behaviors/watch-title.js", "/behaviors")
    }, {"1YiZ5S": 4, buffer: 1}],
    26: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            function c(e) {
                var t = {}, n = 0, i = 0, o = "", r = {}, a = {}, s = 0, l = function () {
                    return window.requestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
                            window.setTimeout(e, 1e3 / 60)
                        }
                }(), c = function (e) {
                    o = e.toElement.parentElement.dataset.color || "transparent", a = e.toElement, r = a.getContext("2d"), s = 0, n = e.offsetX, i = e.offsetY, r.clearRect(0, 0, a.width, a.height), d()
                }, d = function () {
                    r.beginPath(), r.arc(n, i, s, 0, 2 * Math.PI, !1), r.fillStyle = o, r.fill(), (s += 2) < a.width && l(d)
                };
                !function () {
                    "static" !== getComputedStyle(e).position || $(e).css("position", "relative"), t = document.createElement("canvas"), $(t).css({
                        opacity: .25,
                        position: "absolute",
                        top: 0,
                        left: 0
                    }), t.addEventListener("click", c, !1), e.appendChild(t), t.style.width = "100%", t.style.height = "100%", t.width = t.offsetWidth, t.height = t.offsetHeight
                }()
            }

            $.fn.xDazzleWave = function () {
                this.each(function (e, t) {
                    c(t)
                })
            }, $behavior("wave", function () {
                return {
                    init: function () {
                        $(this).addClass("wave").xDazzleWave()
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/behaviors/wave.js", "/behaviors")
    }, {"1YiZ5S": 4, buffer: 1}],
    27: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            $behavior("x-select2", function () {
                return {
                    importing: ["select2"], init: function () {
                        $(this).select2({tag: !0, allowClear: !0})
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/behaviors/x-select2.js", "/behaviors")
    }, {"1YiZ5S": 4, buffer: 1}],
    28: [function (e, t, n) {
        (function (e, n, i, o, r, a, s, l, c) {
            window.sysParams = window.sysParams || localData.get("sysParams") || {};
            var d = window.sysParams.cobwebPath || "http://10.130.151.151:8088/cobweb",
                u = d.replace("http://", "").replace("/cobweb", ""),
                f = getViewPath("page-cobweb.html") + "&shortPath={0}&phoneNo={1}".format(u, 12345);
            t.exports = {
                ajInfoCheckByAjJqBh: function (e) {
                    if (null == e)return !1;
                    var t = makeAct("sys/proc/apiInside/SP_INT_API_SEL_TIMELY_CASE", "", "zhgl");
                    $post(t, {caseNo: e}, function (e) {
                        var t = e.data && e.data.case;
                        if (!t)return toast("查不到数据！", 600).warn(), !1;
                        top.registry.global.ajxxData = t;
                        var n = $open("_win/quality-check-ajinfo.html", {
                            width: 820, title: "案件基本信息", onClose: function () {
                                "function" == typeof window.ajInfoCheckCloseFn && ajInfoCheckCloseFn()
                            }
                        }, !0, function () {
                            intoAjInfoCheck(n)
                        })
                    }, !0)
                }, initJqInfoCheck: function (e) {
                    var t = makeAct("sys/proc/apiInside/SP_INT_API_SEL_TIMELY_RECEPT", "", "zhgl");
                    $post(t, {receptionNo: e}, function (e) {
                        var t = e.data, n = {};
                        if (null == t)return toast("查不到数据！", 600).warn(), !1;
                        n = $open("_win/jq-info-check.html", {width: 780, title: "警情信息查看"}, !0, function () {
                            var e = $("#jq-info-check-block");
                            e.children("#jq-info-wrap").template(t), $("#jq-info-bar-info").fixTable("all"), e.on("click", ".cm-close-btn", function () {
                                $(n).$close()
                            })
                        })
                    }, !0)
                }, intoXckyAdd2: function (e, t) {
                    top.openIE(top.sysParams.xcky2Url + "?taskNo={0}&type=2&flag=1&clientKey={1}&kno={2}".format(e, top.rasCarId, t))
                }, intoXckyView2: function (e, t) {
                    top.openIE(top.sysParams.xcky2Url + "?taskNo={0}&type=2&flag=2&clientKey={1}&kno={2}".format(e, top.rasCarId, t))
                }, openDoc: function (e, t, n, i, o, r, a, s) {
                    var l = arguments[0],
                        c = "object" == typeof l ? [l.docID, l.tableID, l.tableName, l.title, l.allowEdit, l.showCustomBar, l.showMenuBar] : arguments,
                        d = top.config.wordJspPath || top.path + "/jsp/word.jsp",
                        u = d + "?docID={0}&tableID={1}&tableName={2}&title={3}&allowEdit={4}&showCustomBar={5}&showMenuBar={6}".format(c[0], c[1], c[2] || "", c[3] || "", c[4] || "0", c[5] || "0", c[6] || "0");
                    return "object" == typeof s ? s.src = u : top.$open(u, {
                        title: i,
                        width: top.innerWidth - 120,
                        height: top.innerHeight - 20
                    })
                }, openDocInFrame: function (e, t, n, i, o, r, a, s) {
                    return openDoc(t, n, i, o, r, a, s, e)
                }, cobwebInit: function (e) {
                    window.open(f)
                }, cobwebDirect: function (e) {
                    info("蛛网页面地址:" + e);
                    var t = document.createElement("iframe");
                    t.height = 0, t.width = 0, document.body.appendChild(t), t.onload = function () {
                        setTimeout(function () {
                            window.open(e), setTimeout(function () {
                                document.body.removeChild(t)
                            }, 2e3)
                        }, 360)
                    }, t.src = f
                }, cobwebSearch: function (e, t) {
                    e = e || "", "id" == (t = t || "handsetNum") && (t = "identification");
                    var n = e ? "{0}/oneSearch/searchResult?keyType={1}&keyWord={2}".format(d, t, e) : "{0}/oneSearch/searchPage".format(d);
                    cobwebDirect(n)
                }, sisInit: function () {
                    cobwebDirect(d + "/sisSearch/getIndex")
                }
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/business/pub-business.js", "/business")
    }, {"1YiZ5S": 4, buffer: 1}],
    29: [function (e, t, n) {
        (function (e, n, i, o, r, a, s, l, c) {
            t.exports = {
                fromPackFlag: !0,
                useJsonMenu: !1,
                useDistAsRoot: !1,
                baseNginxBus: "",
                globalMock: !1,
                mock: !1,
                platformTitle: "刑事技术一体化综合应用平台",
                neabServer: "http://192.168.1.211:53000",
                systemPlace: "350200000000",
                prjName: "sso",
                testTime: 0,
                testOptimize: 0,
                restfuls: ["http://211.157.146.6:11888"],
                subPrj: {
                    sso: {prjName: "sso", restfuls: ["http://211.157.146.7:8811"]},
                    zhgl: {prjName: "zhgl", restfuls: ["http://192.168.1.203:58080"]},
                    sjzx: {prjName: "zhgl", restfuls: ["http://192.168.1.203:58080"]},
                    wz: {prjName: "wzgl", restfuls: ["http://211.157.146.6:5000"]},
                    xk: {
                        prjName: "xcky3",
                        restfuls: ["http://211.157.146.7:8811"],
                        desc: {"杭州": "http://192.168.1.203:58080"}
                    },
                    lab: {prjName: "alims", zhsysPort: "2145", zhsysUrl: "", restfuls: ["http://211.157.146.6:8822"]}
                },
                xApp: "actual",
                version: "1.0.2",
                timeCode: 20170510,
                maxTabCount: 9,
                scrollBarWidth: 5,
                indexStyle: "adds",
                useFullWrap: !1,
                tabLength: null,
                holdToken: !1,
                mapVersion: 2,
                autoCustomCol: 1,
                mapServerPath: "http://192.168.1.211:8101",
                test: 1,
                useLocalAgent: 1,
                commonImports: ["xtp", "xTable", "fixTable", "customCol", "scope", "filter", "widget"],
                plugins: {
                    baseStyle: "base/css/base-plus.css",
                    "inline-select": "selects/inline-select",
                    hsmap: "hsmap/hsmap.js",
                    html2canvas: "canvas/html2canvas.js",
                    resumable: "upload/resumable.js",
                    fullScreen: "fullscreen/jquery.fullscreen.js",
                    autocomplete: "autocomplete/autocomplete.js",
                    mappicker: "mappicker/mappicker.js",
                    datepicker: "date/my97/datepicker.js",
                    xtree: "ztree/ztree.js",
                    ztree: "ztree/ztree.js",
                    echarts: "echarts/echarts3110.js",
                    echarts2: "echarts/echarts225.js",
                    echarts3: "echarts/echarts3110.js",
                    echarts354: "echarts/echarts3.5.4.js",
                    china: "echarts/china.js",
                    jqgrid: "jqgrid/jquery.jqGrid.min.js",
                    dataTable: "dataTable/jquery.dataTables.js",
                    fixDataTable: "dataTable/dataTables.fixedColumns.js",
                    jqColor: "jqColor/jquery.color.js",
                    dict: {path: "dict/dict.js", depending: ["plugin/dict/dict2.css"]},
                    "wz-dict": "dict/wz-dict.js",
                    socket: "socket/socket.io.js",
                    ckeditor: "ckeditor/ckeditor.js",
                    moment: "date/moment.js",
                    daterangepicker: {path: "date/daterangepicker/daterangepicker2124.js", depending: ["moment"]},
                    currentDate: "date/currentDate.js",
                    "bs-popover": "bootstrap/bs-popover.js",
                    "bs-tooltip": "bootstrap/bs-tooltip.js",
                    bootstrap: {depending: ["bootstrap-css", "bootstrap-js"]},
                    "bootstrap-js": "bootstrap/bootstrap.3.31.js",
                    "bootstrap-css": "bootstrap/bootstrap.3.31.css",
                    datetimepicker: {
                        path: "date/bs.datetimepicker/bootstrap-datetimepicker.min.js",
                        depending: ["moment"]
                    },
                    "adminDesign.main": "admindesign/main.js",
                    colorBox: "admindesign/colorbox.js",
                    panelCtrls: "admindesign/panel.ctrls.js",
                    slick: "slick/slick.min.js",
                    bowser: "bowser.min.js",
                    tooltips: "tooltips/tooltipster.bundle.min.js",
                    jui: "jui/jquery-ui.js",
                    popover: "popover/jquery.webui-popover.min.js",
                    previewBox: "preview/previewbox.js",
                    previewPro: {path: "preview/previewpro.js", depending: ["plugin/preview/previewpro.htm", "jui"]},
                    fullcalendar: {
                        path: "fullcalendar/fullcalendar.min.js",
                        depending: ["plugin/fullcalendar/fullcalendar.css"]
                    },
                    roundabout: "round/jquery.roundabout2.js",
                    glyphiconsPro: "../font/glyphicons-pro/glyphicons-pro.css",
                    barcode: "barcode/jsbarcode-all.js",
                    select2: "select2/select2.min.js",
                    "bootstrap-multiselect": "admindesign/bootstrap-multiselect.js",
                    "holiday-calendar": "holiday-calendar/calendar.js",
                    draw: {path: "draw/draw.js", depending: ["plugin/draw/draw.htm", "plugin/draw/draw.css", "jui"]},
                    d3: "d3/d3.v3.min.js"
                },
                restDesc: "上方为restful服务器路径,会自动加上项目名对应到xcky3,下方为具体的业务action登记,登记后使用makeAct('login')就可以得到完整的服务url, 如未登记,则用makeAct('sys/login/login')也能生成全路径",
                actions: {
                    login: "sys/login/login",
                    logout: "sys/login/logout",
                    sysUserUpd: "sys/sysUser/upd",
                    sysOrgDict: "sys/sysOrganization/dict_unit",
                    sysAuthUnit: "sys/sysOrganization/getAuthUnit",
                    sceneStatCount: "sceneCollecting/sceneInvestigation/queryCount",
                    caseType: "sys/sysDict/tree/AJLBDM",
                    proofType: "sys/sysDict/tree/WZLBDM",
                    proofUnit: "sys/sysDict/tree/WZJLDWDM/WZJLDWDM",
                    billOutType: "sys/sysDict/tree/WZCKLXDM/WZCKLXDM",
                    historyQuery: "http://192.168.1.107:3000/bigbang/ele-setting/query-condition-history/list",
                    historyQueryAdd: "http://192.168.1.107:3000/bigbang/ele-setting/query-condition-history/add",
                    historyQueryDel: "http://192.168.1.107:3000/bigbang/ele-setting/query-condition-history/del",
                    savedQuery: "http://192.168.1.107:3000/bigbang/ele-setting/query-condition-saved/list",
                    savedQueryAdd: "http://192.168.1.107:3000/bigbang/ele-setting/query-condition-saved/add",
                    savedQueryDel: "http://192.168.1.107:3000/bigbang/ele-setting/query-condition-saved/del"
                },
                mockActions: {
                    login: "",
                    logout: "",
                    sysUserUpd: "sys/sysUser/upd",
                    sysOrgDict: "sys/sysOrganization/dict_unit",
                    sceneStatCount: "sceneCollecting/sceneInvestigation/queryCount",
                    messageList: ""
                }
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/config.js", "/")
    }, {"1YiZ5S": 4, buffer: 1}],
    30: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            window.$extractor("rangeDate", function (e, t) {
                var n = $(this), i = n.data(), o = t || n.attr("x-name"), r = n.val().split(","),
                    a = i.bname || o + "Begin", s = i.ename || o + "End";
                if (!e)return n.val();
                e[a] = r[0].trim(), e[s] = (r[1] || "").trim()
            })("dict", function (e, t) {
                var n = $(this), i = n.attr("dict-name") || n.attr("x-name"), o = n.attr("dict-id"),
                    r = n.find("#" + o).val();
                if (!e)return r;
                e[i] = r
            })("dict.valAndTxt", function (e, t) {
                var n = $(this), i = n.attr("dict-id"), o = n.attr("dict-id") + "_displayValue",
                    r = n.find("#" + i).val(), a = n.find("#" + o).val(), s = n.data().needTxt || t + "Name";
                if (!e)return r;
                e[t] = r, e[s] = a
            })("dict.xkStyle", function (e, t) {
                return window.$extractor("dict").call(this, e, t)
            })("dict.AJLBDM.not-xk", function (e, t) {
                var n = null != $(this).attr("data-need-txt") ? "dict.valAndTxt" : "dict";
                return window.$extractor(n).call(this, e, t)
            })("dict.select", function (e, t) {
                var n = $(this), i = n.attr("dict-id"), o = n.find("#" + i).val();
                if (!e)return o;
                e[t] = o
            })("childInput-agent", function (e) {
                var t = $(this), n = t.attr("dict-name"), i = t.attr("dict-id"), o = t.find("#" + i).val();
                if (!e)return o;
                e[n] = o
            })("getRadioValue", function (e, t) {
                if ($(this).prop("checked")) {
                    if (!e)return $(this).attr("value");
                    e[t] = $(this).attr("value")
                }
            })("xWrap.radio", function (e, t) {
                var n = $(this).find(":checked").val();
                if (!e)return n;
                e[t] = n
            })("xWrap.select", function (e, t) {
                var n = $(this).find("select").val();
                if (!e)return n;
                e[t] = n
            })("xWrap.checkbox", function (e, t) {
                var n, i = $(this).find(":checkbox"), o = [];
                if (i.each(function (e, t) {
                        t.checked && o.push(t.value)
                    }), n = o.join(","), !e)return n;
                e[t] = n
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/extractor.js", "/")
    }, {"1YiZ5S": 4, buffer: 1}],
    31: [function (e, t, n) {
        (function (n, i, o, r, a, s, l, c, d) {
            var i = window, u = Object.create(null);
            e("./lib/defineding.js"), e("./lib/proto");
            var f = e("./config");
            f.isClient = ("file:" == location.protocol || "chrome-extension:" == location.protocol) && "function" == typeof window._top.require, f.isLocal = f.isClient || f.useLocalAgent && location.href.indexOf("webapp/dist/") > -1, i.extending({
                config: f,
                setSubPrj: function (e) {
                    if (!f.subPrj)return void console.warn("the config.subPrj is undefined!");
                    var t = f.subPrj[e];
                    f.prjName = t.prjName, f.restfuls = t.restfuls || f.restfuls, f.currentSubPrj = e
                }
            });
            var p = e("./lib/locals");
            i.extending(p, !0), i.extending({
                $cache: function (e, t) {
                    var n = arguments.length;
                    return 2 == n ? u[e] = t : 1 == n ? u[e] : 0 == n ? u : void 0
                }
            }), i.$source = i.$source || i.$cache, e("./lib/path.js");
            var h = e("./lib/jquery"), m = e("./lib/jquery.xfn");
            h.fn.extending(m), i.extending({$: h, jQuery: h}, !0), i.extending("xReady", function () {
                return m.xReady.apply(document.body, arguments)
            }), e("./lib/jquery.extend"), e("./lib/eui")(h), e("./lib/jquery.cookie")(h);
            var g = e("./lib/ex");
            i.extending(g, !0);
            var b = e("./lib/module");
            i.extending("$module", b.$module);
            var v = e("./lib/xtp");
            i.extending(v);
            var x = e("./lib/pub");
            i.$.fn.extending(x.jqueryFnPack, !0), i.extending(x.globalFnPack, !0), i.getting(x.globalGetterPack);
            var w = e("./lib/ajax");
            i.extending(w, !0);
            var y = e("./business/pub-business");
            i.extending(y);
            e("./lib/paging.js"), e("./lib/validate.js");
            _top.molKeys && i.localParamsInit(_top.molKeys), e("./lib/mock-register.js"), e("./filter.js"), e("./extractor.js"), e("./injector.js"), e("./resetter.js"), e("./widget.js"), e("./behavior.js"), i === i._top && i.extending("$state", e("./lib/naving.state.js")), e("./lib/patch.js");
            var $ = localData.get("_packJson");
            $ && i.$.extend(i.config, $), t.exports = {
                checkDtd: function () {
                    if ("BackCompat" == document.compatMode)throw new Error("BackCompat！please check DTD！")
                }
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/fake_d4d66203.js", "/")
    }, {
        "./behavior.js": 5,
        "./business/pub-business": 28,
        "./config": 29,
        "./extractor.js": 30,
        "./filter.js": 32,
        "./injector.js": 33,
        "./lib/ajax": 34,
        "./lib/defineding.js": 35,
        "./lib/eui": 36,
        "./lib/ex": 37,
        "./lib/jquery": 42,
        "./lib/jquery.cookie": 40,
        "./lib/jquery.extend": 41,
        "./lib/jquery.xfn": 43,
        "./lib/locals": 45,
        "./lib/mock-register.js": 46,
        "./lib/module": 47,
        "./lib/naving.state.js": 48,
        "./lib/paging.js": 49,
        "./lib/patch.js": 50,
        "./lib/path.js": 51,
        "./lib/proto": 52,
        "./lib/pub": 59,
        "./lib/validate.js": 61,
        "./lib/xtp": 66,
        "./resetter.js": 69,
        "./widget.js": 70,
        "1YiZ5S": 4,
        buffer: 1
    }],
    32: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            function c(e, t, n) {
                var i = parseInt(this);
                return 1 === i ? e : 0 === i ? t : void 0 !== n ? n : this.valueOf()
            }

            window.$filter("asInt", function () {
                return 1 == this.valueOf() ? 1 : 0
            }, Boolean), window.$filter("toStr", function () {
                return this.toString()
            }), window.$filter("sub16", function () {
                return this.trim().slice(0, 16)
            }, String), window.$filter("asDate16", function () {
                return this.valueOf() ? new Date(this).format("YYYY-M-D hh:mm") : ""
            }), window.$filter("asDate10", function () {
                return this.valueOf() ? new Date(this).format("YYYY-M-D") : ""
            }), window.$filter("asCnTime", function () {
                return this.valueOf() ? new Date(this).format("YYYY年M月D日 hh:mm") : window.config.emptyDateSymbol || "--"
            }), window.$filter("asCnDate", function () {
                return this.valueOf() ? new Date(this).format("YYYY年M月D日") : ""
            }), window.$filter("asRead", function () {
                return c.apply(this, ["已读", "未读"])
            }), window.$filter("asEnable", function () {
                return c.apply(this, ["启用", "禁用", "禁用"])
            }), window.$filter("asSolved", function () {
                return c.apply(this, ["已解决", "未解决"])
            }), window.$filter("asActive", function () {
                return c.apply(this, ["active", "no-active", ""])
            }), window.$filter("toInt", function () {
                return parseInt(this.valueOf())
            }), window.$filter("asSex", function () {
                return this.toString().trim().replace("1", "男").replace("2", "女").replace("0", "未知")
            }), window.$filter("exNum", function () {
                return 1 === parseInt(this) ? 0 : 1
            }), window.$filter("asYes", function () {
                return isTrueVal(this) ? "是" : "否"
            }), window.$filter("asUndefined", function () {
                return "undefined" == this.toString() ? void 0 : this
            }), window.$filter("html2txt", function () {
                return this.toString().replace(/<\/?.*?>/g, "")
            }), window.$filter("asRemoveTag", function () {
                return this.toString().replace(/<\/?.*?>/g, "")
            }), window.$filter("asHide", function () {
                return isTrueVal(this) ? " hide-plus " : ""
            }), window.$filter("asShow", function () {
                return isTrueVal(this) ? "" : " hide-plus "
            }), window.$filter("asBolStr", function () {
                return isTrueVal(this) ? "true" : "false"
            }), window.$filter("asSelectedProp", function () {
                return isTrueVal(this) ? "selected" : ""
            }), window.$filter("asCheckedAttr", function () {
                return isTrueVal(this) ? "checked" : ""
            }), window.$filter("asReadonlyAttr", function () {
                return isTrueVal(this) ? "readonly" : ""
            }), window.$filter("asTime6", function () {
                var e = parseInt(this / 3600), t = parseInt((this - 3600 * e) / 60), n = parseInt(this % 60);
                return this >= 3600 ? e + ":" + t + ":" + n : this >= 60 && this < 3600 ? t + ":" + n : n
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/filter.js", "/")
    }, {"1YiZ5S": 4, buffer: 1}],
    33: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            window.$injector("rangeDate", function (e, t, n) {
                var i = $(this), o = i.data(), r = n || i.attr("x-name"), a = o.bname || r + "Begin",
                    s = o.ename || r + "End";
                return t ? (console.log(t), t[a] && t[s] ? i.val(t[a] + "," + t[s]) : i.val("")) : i.val(e)
            })("setRadioValue", function (e) {
                e == $(this).prop("value") ? $(this).prop("checked", !0) : $(this).prop("checked", !1)
            })("dict", function (e, t, n) {
                return $(this).dictSelect(e)
            })("dict.valAndTxt", function (e, t) {
                var n = function (n) {
                    var i = $(this), o = i.attr("dict-id"), r = $("#" + o + "_displayValue"), a = $("#" + o);
                    null !== n && (r.val(n[e || i.attr("dict-name") + "Name"]), a.val(n[t || i.attr("dict-name")])), i.find(".validate").attr("data-options", "required:true")
                };
                return function (e) {
                    var t = $(this);
                    t.children().length ? n.call(this, e) : t.hasClass("dict-loading") ? t.data("dict-reserve-do", n.bind(this, e)) : t.dict(n.bind(this, e))
                }
            }())("dict.xkStyle", function (e, t, n) {
                return window.$injector("dict").call(this, e, t, n)
            })("dict.AJLBDM.not-xk", function (e, t, n) {
                return window.$injector("dict").call(this, t, n)
            })("dict.select", function (e) {
                $(this).children("select").val(e)
            })("xWrap.radio", function (e, t, n) {
                $(this).find("[type=radio]").each(function (t, n) {
                    n.checked = n.value == e
                })
            })("xWrap.select", function (e, t, n) {
                $(this).find("select").val(e)
            })("xWrap.checkbox", function (e, t, n) {
                e = e || "";
                var i = $(this).find(":checkbox"), o = "array" == typeOf(e) ? e : e.split(",");
                i.each(function (e, t) {
                    t.checked = o.includes(parseInt(t.value)) || o.includes(String(t.value))
                })
            })("spinner", function (e) {
                $(this).numberspinner("setValue", e)
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/injector.js", "/")
    }, {"1YiZ5S": 4, buffer: 1}],
    34: [function (e, t, n) {
        (function (e, n, i, o, r, a, s, l, c) {
            var n = window, d = Function.voidFn;
            $.ajax.failHandle = function (e, t, n, i) {
                var o = "string" == typeof e.msg ? e.msg.slice(0, 99) : "";
                toast(o).err(), console.warn(e.msg), n ? console.warn("ajax请求失败!\n请求路径为:{0}\n请求参数为:{1}\n后台返回的错误信息为:{2}".format(n, obj2str(i), e.msg || "")) : console.warn("ajax请求失败! 请检查后端接口, 在network中查看请求参数")
            }, $.ajax.logoutHandle = function (e, t) {
                toast("登录状态过期,请重新登录", function () {
                    _top.logout()
                })
            }, $.ajax.serverErrHandle = function (e, t, n) {
                (e.message || e.msg) && toast(e.message || e.msg).err(), console.warn("$ajax请求地址错误或网络问题, status: {0}, action:{1} ".format(t, n))
            }, $.ajax.unDone = function (e, t, n, i) {
                0 == e.flag ? $.ajax.failHandle(e, t, n, i) : -1 == e.flag && $.ajax.logoutHandle(e, t)
            };
            var u = {
                $ajax: function () {
                    var e, t, i, o, r, a, s, l = arguments, c = arguments[0], u = n.showLoading;
                    "object" == typeof c ? (e = c.url, t = c.data || c.params, i = c.success || c.callback, o = c.type || c.method, r = c.beforeSend, a = c.complete) : (e = l[0], t = l[1], i = l[2], o = l[3], r = l[4], a = l[5]), "string" == typeof e && e.match(/\/mock\/.+\.json/i) && (o = "GET"), !1 === r ? r = d : "function" != typeof r && (r = function () {
                            u()
                        }), a = r == d ? d : "function" == typeof a ? a : function () {
                        hideLoading()
                    };
                    var f = localData.get("currentUser"), p = {
                        account: f ? encodeURIComponent(f.account) : "",
                        token: "string" == typeof window.token ? window.token : localData.get("token")
                    };
                    return n.config && n.config.exToken && (p.exToken = n.config.exToken), n.config && n.config.systemid && (p.systemid = n.config.systemid), "GET" == o && ("string" == typeOf(t) && e.lastIndexOf("/") == e.length - 1 ? (e += t, t = null) : "object" == typeOf(t) && e.indexOf("{") > -1 && e.indexOf("}") > 0 && (e = e.format(t), t = null)), "function" == typeof arguments[1] ? (i = arguments[1], t = null, u = !1 === arguments[2] ? d : u) : !1 !== arguments[1] && !1 !== arguments[2] || (u = d), t = t || {}, s = $.ajax($.extend({
                        type: o || "POST",
                        url: e,
                        headers: p,
                        contentType: "application/json; charset=UTF-8",
                        dataType: "json",
                        data: "GET" == o ? t : obj2str(t),
                        beforeSend: r
                    }, "object" == typeOf(c) ? c : null)), "function" != typeof i ? (s._ajaxComplete = a, s) : s.always(function (o, r) {
                        a(o, r), "success" == r ? 1 == o.flag || n.config.flagAtResHead ? (n.config.flagAtResHead && (o = {
                            flag: 1,
                            data: o
                        }), "function" == typeof i && i(o)) : $.ajax.unDone(o, r, e, t) : "nocontent" === r || o && 404 == o.status || $.ajax.serverErrHandle(o, r, e)
                    })
                }, $post: function (e, t, n, i, o) {
                    return $ajax(e, t, n, "POST", i, o)
                }, $get: function (e, t, n, i, o) {
                    return $ajax(e, t, n, "GET", i, o)
                }, action2link: function (e) {
                    var t = window.token || localData.get("token"), n = localData.get("currentUser"),
                        i = n ? n.account : "", o = "token={0}&account={1}".format(t, i);
                    return e + (e.indexOf("?") > -1 ? "&" : "?") + o
                }, act2link: function (e) {
                    return u.action2link(e)
                }, makeAct: function (e, t, i) {
                    e = e.replace(/^\//, ""), t = t || "api";
                    var o, r, a, s = n.config.mock || n.config.globalMock,
                        l = s ? n.config.mockActions : n.config.actions;
                    e.split("/")[0];
                    return n.config.baseNginxBus ? (o = n.config.baseNginxBus, r = i ? n.config.subPrj[i].prjName : n.config.prjName) : (o = i ? n.config.subPrj[i].restfuls[0] : n.config.restfuls[0], r = i ? n.config.subPrj[i].prjName : n.config.prjName), a = "{0}/{1}/{2}/".format(o, r, t), e = e.replace(/\?.+/, ""), s ? e = l[e] || n.getDistPath("mock/{0}.json".format(e.replace(/\/$/, "").replace(/\/|\./g, "-"))) : (e = l[e] || e, 0 === e.indexOf("http") ? e : a + e)
                }
            };
            t.exports = u
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/ajax.js", "/lib")
    }, {"1YiZ5S": 4, buffer: 1}],
    35: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            var c = function (e) {
                var t = Object.create(null);
                e = (e || location.search).trim(), "?" === e[0] || "&" === e[0] || (e = "?" + e);
                var n = e.match(new RegExp("[?&][^?&]+=[^?&]*", "g"));
                if (null == n)return !1;
                for (var i, o = n.length, r = 0; r < o; r++)i = n[r].slice(1).split("="), t[i[0]] = i[1];
                return t
            };
            !function (e) {
                Object.defineProperty(Object.prototype, "extending", {
                    value: function () {
                        var e = {};
                        "object" == typeof arguments[0] ? e = arguments[0] : e[arguments[0]] = arguments[1];
                        for (var t in e)e.hasOwnProperty(t) && Object.defineProperty(this, t, {
                            value: e[t],
                            writable: !1,
                            enumerable: !0 === arguments[arguments.length - 1],
                            configurable: !0
                        });
                        return this
                    }, writable: !1, enumerable: !1, configurable: !1
                }), Object.defineProperty(Object.prototype, "getting", {
                    value: function () {
                        var e = {};
                        "object" == typeof arguments[0] ? e = arguments[0] : e[arguments[0]] = arguments[1];
                        for (var t in e)Object.defineProperty(this, t, {
                            get: e[t],
                            enumerable: !0 === arguments[arguments.length - 1],
                            configurable: !1
                        });
                        return this
                    }, writable: !1, enumerable: !1, configurable: !1
                })
            }(window), Object.prototype.extending("fixing", function (e) {
                Object.defineProperty(this, e, {writable: !1, configurable: !1})
            }), window.getting({
                _top: function () {
                    return document.documentElement.hasAttribute("flag-top") || "self" === c().top ? (window.logout = Function.voidFn, window.ops = {}, window) : window.parent["hook-top-body"] ? window.parent : window.parent.parent["hook-top-body"] ? window.parent.parent : window.parent.parent.parent["hook-top-body"] ? window.parent.parent.parent : window.parent.parent.parent["hook-top-body"] ? window.parent.parent.parent.parent : window.top
                }, doc: function () {
                    return document.documentElement
                }, width: function () {
                    return this.innerWidth
                }, height: function () {
                    return this.innerHeight
                }, scrollTop: function () {
                    return document.documentElement.scrollTop || document.body.scrollTop
                }, scrollLeft: function () {
                    return document.documentElement.scrollLeft || document.body.scrollLeft
                }, iframe: function () {
                    return window.frameElement
                }, $opener: function () {
                    var e = this.iframe.getAttribute("opener-id");
                    return _top._opener_wins[e]
                }
            }), window.extending(window === _top ? {_mol_wins: {}, _opener_wins: {}} : {
                $window: _top.$window,
                $document: _top.$document,
                $$: _top.$$
            }), window.extending("getPrjName", function () {
                return window.config.prjName
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/defineding.js", "/lib")
    }, {"1YiZ5S": 4, buffer: 1}],
    36: [function (require, module, exports) {
        (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
            var _eui = function (jQuery) {
                !function (e) {
                    e.parser = {
                        auto: !0,
                        onComplete: function (e) {
                        },
                        plugins: ["_draggable", "_droppable", "_resizable", "pagination", "etooltip", "linkbutton", "menu", "menubutton", "splitbutton", "progressbar", "tree", "textbox", "filebox", "combo", "combobox", "combotree", "combogrid", "numberbox", "validatebox", "searchbox", "spinner", "numberspinner", "timespinner", "datetimespinner", "calendar", "datebox", "datetimebox", "slider", "layout", "epanel", "datagrid", "propertygrid", "treegrid", "datalist", "tabs", "accordion", "window", "dialog", "form"],
                        parse: function (t) {
                            for (var n = [], i = 0; i < e.parser.plugins.length; i++) {
                                var o = e.parser.plugins[i], r = e(".eui-" + o, t);
                                r.length && (r[o] ? r[o]() : n.push({name: o, jq: r}))
                            }
                            if (n.length && window.easyloader) {
                                for (var a = [], i = 0; i < n.length; i++)a.push(n[i].name);
                                easyloader.load(a, function () {
                                    for (var i = 0; i < n.length; i++) {
                                        var o = n[i].name;
                                        n[i].jq[o]()
                                    }
                                    e.parser.onComplete.call(e.parser, t)
                                })
                            } else e.parser.onComplete.call(e.parser, t)
                        },
                        parseValue: function (t, n, i, o) {
                            o = o || 0;
                            var r = e.trim(String(n || ""));
                            return "%" == r.substr(r.length - 1, 1) ? (r = parseInt(r.substr(0, r.length - 1)), r = t.toLowerCase().indexOf("width") >= 0 ? Math.floor((i.width() - o) * r / 100) : Math.floor((i.height() - o) * r / 100)) : r = parseInt(r) || void 0, r
                        },
                        parseOptions: function (t, n) {
                            var i = e(t), o = {}, r = e.trim(i.attr("data-options"));
                            if (r && ("{" != r.substring(0, 1) && (r = "{" + r + "}"), o = new Function("return " + r)()), e.map(["width", "height", "left", "top", "minWidth", "maxWidth", "minHeight", "maxHeight"], function (n) {
                                    var i = e.trim(t.style[n] || "");
                                    i && (-1 == i.indexOf("%") && (i = parseInt(i) || void 0), o[n] = i)
                                }), n) {
                                for (var a = {}, s = 0; s < n.length; s++) {
                                    var l = n[s];
                                    if ("string" == typeof l) a[l] = i.attr(l); else for (var c in l) {
                                        var d = l[c];
                                        "boolean" == d ? a[c] = i.attr(c) ? "true" == i.attr(c) : void 0 : "number" == d && (a[c] = "0" == i.attr(c) ? 0 : parseFloat(i.attr(c)) || void 0)
                                    }
                                }
                                e.extend(o, a)
                            }
                            return o
                        }
                    }, e(function () {
                        var t = e('<div style="position:absolute;top:-1000px;width:100px;height:100px;padding:5px"></div>').appendTo("body");
                        e._boxModel = 100 != t.outerWidth(), t.remove(), !window.easyloader && e.parser.auto && e.parser.parse()
                    }), e.fn._outerWidth = function (e) {
                        return void 0 == e ? this[0] == window ? this.width() || document.body.clientWidth : this.outerWidth() || 0 : this._size("width", e)
                    }, e.fn._outerHeight = function (e) {
                        return void 0 == e ? this[0] == window ? this.height() || document.body.clientHeight : this.outerHeight() || 0 : this._size("height", e)
                    }, e.fn._scrollLeft = function (t) {
                        return void 0 == t ? this.scrollLeft() : this.each(function () {
                            e(this).scrollLeft(t)
                        })
                    }, e.fn._propAttr = e.fn.prop || e.fn.attr, e.fn._size = function (t, n) {
                        function i(t, n, i) {
                            if (!n.length)return !1;
                            var o = e(t)[0], r = n[0], a = r.fcount || 0;
                            return i ? (o.fitted || (o.fitted = !0, r.fcount = a + 1, e(r).addClass("epanel-noscroll"), "BODY" == r.tagName && e("html").addClass("epanel-fit")), {
                                width: e(r).width() || 1,
                                height: e(r).height() || 1
                            }) : (o.fitted && (o.fitted = !1, r.fcount = a - 1, 0 == r.fcount && (e(r).removeClass("epanel-noscroll"), "BODY" == r.tagName && e("html").removeClass("epanel-fit"))), !1)
                        }

                        function o(t, n, i, o) {
                            var r = e(t), a = n, s = a.substr(0, 1).toUpperCase() + a.substr(1),
                                l = e.parser.parseValue("min" + s, o["min" + s], i),
                                c = e.parser.parseValue("max" + s, o["max" + s], i),
                                d = e.parser.parseValue(a, o[a], i), u = String(o[a] || "").indexOf("%") >= 0;
                            if (isNaN(d)) r._size(a, ""), r._size("min" + s, l), r._size("max" + s, c); else {
                                var f = Math.min(Math.max(d, l || 0), c || 99999);
                                u || (o[a] = f), r._size("min" + s, ""), r._size("max" + s, ""), r._size(a, f)
                            }
                            return u || o.fit
                        }

                        function r(t, n, i) {
                            function o() {
                                return n.toLowerCase().indexOf("width") >= 0 ? r.outerWidth() - r.width() : r.outerHeight() - r.height()
                            }

                            var r = e(t);
                            if (void 0 == i) {
                                if (i = parseInt(t.style[n]), isNaN(i))return;
                                return e._boxModel && (i += o()), i
                            }
                            "" === i ? r.css(n, "") : (e._boxModel && (i -= o()) < 0 && (i = 0), r.css(n, i + "px"))
                        }

                        return "string" == typeof t ? "clear" == t ? this.each(function () {
                            e(this).css({
                                width: "",
                                minWidth: "",
                                maxWidth: "",
                                height: "",
                                minHeight: "",
                                maxHeight: ""
                            })
                        }) : "fit" == t ? this.each(function () {
                            i(this, "BODY" == this.tagName ? e("body") : e(this).parent(), !0)
                        }) : "unfit" == t ? this.each(function () {
                            i(this, e(this).parent(), !1)
                        }) : void 0 == n ? r(this[0], t) : this.each(function () {
                            r(this, t, n)
                        }) : this.each(function () {
                            n = n || e(this).parent(), e.extend(t, i(this, n, t.fit) || {});
                            var r = o(this, "width", n, t), a = o(this, "height", n, t);
                            r || a ? e(this).addClass("eui-fluid") : e(this).removeClass("eui-fluid")
                        })
                    }
                }(jQuery), function (e) {
                    function t(t) {
                        1 == t.touches.length && (a ? (clearTimeout(dblClickTimer), a = !1, o(t, "dblclick")) : (a = !0, dblClickTimer = setTimeout(function () {
                            a = !1
                        }, 500)), r = setTimeout(function () {
                            o(t, "contextmenu", 3)
                        }, 1e3), o(t, "mousedown"), (e.fn._draggable.isDragging || e.fn._resizable.isResizing) && t.preventDefault())
                    }

                    function n(t) {
                        1 == t.touches.length && (r && clearTimeout(r), o(t, "mousemove"), (e.fn._draggable.isDragging || e.fn._resizable.isResizing) && t.preventDefault())
                    }

                    function i(t) {
                        r && clearTimeout(r), o(t, "mouseup"), (e.fn._draggable.isDragging || e.fn._resizable.isResizing) && t.preventDefault()
                    }

                    function o(t, n, i) {
                        var o = new e.Event(n);
                        o.pageX = t.changedTouches[0].pageX, o.pageY = t.changedTouches[0].pageY, o.which = i || 1, e(t.target).trigger(o)
                    }

                    var r = null, a = !1;
                    document.addEventListener && (document.addEventListener("touchstart", t, !0), document.addEventListener("touchmove", n, !0), document.addEventListener("touchend", i, !0))
                }(jQuery), function (e) {
                    function t(t) {
                        var n = e.data(t.data.target, "_draggable"), i = n.options, o = n.proxy, r = t.data,
                            a = r.startLeft + t.pageX - r.startX, s = r.startTop + t.pageY - r.startY;
                        o && (o.parent()[0] == document.body ? (a = null != i.deltaX && void 0 != i.deltaX ? t.pageX + i.deltaX : t.pageX - t.data.offsetWidth,
                            s = null != i.deltaY && void 0 != i.deltaY ? t.pageY + i.deltaY : t.pageY - t.data.offsetHeight) : (null != i.deltaX && void 0 != i.deltaX && (a += t.data.offsetWidth + i.deltaX), null != i.deltaY && void 0 != i.deltaY && (s += t.data.offsetHeight + i.deltaY))), t.data.parent != document.body && (a += e(t.data.parent).scrollLeft(), s += e(t.data.parent).scrollTop()), "h" == i.axis ? r.left = a : "v" == i.axis ? r.top = s : (r.left = a, r.top = s)
                    }

                    function n(t) {
                        var n = e.data(t.data.target, "_draggable"), i = n.options, o = n.proxy;
                        o || (o = e(t.data.target)), o.css({
                            left: t.data.left,
                            top: t.data.top
                        }), e("body").css("cursor", i.cursor)
                    }

                    function i(i) {
                        if (!e.fn._draggable.isDragging)return !1;
                        var o = e.data(i.data.target, "_draggable"), r = o.options,
                            a = e("._droppable").filter(function () {
                                return i.data.target != this
                            }).filter(function () {
                                var t = e.data(this, "_droppable").options.accept;
                                return !t || e(t).filter(function () {
                                        return this == i.data.target
                                    }).length > 0
                            });
                        o._droppables = a;
                        var s = o.proxy;
                        return s || (r.proxy ? (s = "clone" == r.proxy ? e(i.data.target).clone().insertAfter(i.data.target) : r.proxy.call(i.data.target, i.data.target), o.proxy = s) : s = e(i.data.target)), s.css("position", "absolute"), t(i), n(i), r.onStartDrag.call(i.data.target, i), !1
                    }

                    function o(i) {
                        if (!e.fn._draggable.isDragging)return !1;
                        var o = e.data(i.data.target, "_draggable");
                        t(i), 0 != o.options.onDrag.call(i.data.target, i) && n(i);
                        var r = i.data.target;
                        return o._droppables.each(function () {
                            var t = e(this);
                            if (!t._droppable("options").disabled) {
                                var n = t.offset();
                                i.pageX > n.left && i.pageX < n.left + t.outerWidth() && i.pageY > n.top && i.pageY < n.top + t.outerHeight() ? (this.entered || (e(this).trigger("_dragenter", [r]), this.entered = !0), e(this).trigger("_dragover", [r])) : this.entered && (e(this).trigger("_dragleave", [r]), this.entered = !1)
                            }
                        }), !1
                    }

                    function r(t) {
                        function n() {
                            s && s.remove(), r.proxy = null
                        }

                        function i() {
                            var i = !1;
                            return r._droppables.each(function () {
                                var o = e(this);
                                if (!o._droppable("options").disabled) {
                                    var r = o.offset();
                                    return t.pageX > r.left && t.pageX < r.left + o.outerWidth() && t.pageY > r.top && t.pageY < r.top + o.outerHeight() ? (l.revert && e(t.data.target).css({
                                        position: t.data.startPosition,
                                        left: t.data.startLeft,
                                        top: t.data.startTop
                                    }), e(this).trigger("_drop", [t.data.target]), n(), i = !0, this.entered = !1, !1) : void 0
                                }
                            }), i || l.revert || n(), i
                        }

                        if (!e.fn._draggable.isDragging)return a(), !1;
                        o(t);
                        var r = e.data(t.data.target, "_draggable"), s = r.proxy, l = r.options;
                        if (l.revert)if (1 == i()) e(t.data.target).css({
                            position: t.data.startPosition,
                            left: t.data.startLeft,
                            top: t.data.startTop
                        }); else if (s) {
                            var c, d;
                            s.parent()[0] == document.body ? (c = t.data.startX - t.data.offsetWidth, d = t.data.startY - t.data.offsetHeight) : (c = t.data.startLeft, d = t.data.startTop), s.animate({
                                left: c,
                                top: d
                            }, function () {
                                n()
                            })
                        } else e(t.data.target).animate({left: t.data.startLeft, top: t.data.startTop}, function () {
                            e(t.data.target).css("position", t.data.startPosition)
                        }); else e(t.data.target).css({position: "absolute", left: t.data.left, top: t.data.top}), i();
                        return l.onStopDrag.call(t.data.target, t), a(), !1
                    }

                    function a() {
                        e.fn._draggable.timer && (clearTimeout(e.fn._draggable.timer), e.fn._draggable.timer = void 0), e(document).unbind("._draggable"), e.fn._draggable.isDragging = !1, setTimeout(function () {
                            e("body").css("cursor", "")
                        }, 100)
                    }

                    e.fn._draggable = function (t, n) {
                        return "string" == typeof t ? e.fn._draggable.methods[t](this, n) : this.each(function () {
                            function n(t) {
                                var n = e.data(t.data.target, "_draggable"), i = n.handle, o = e(i).offset(),
                                    r = e(i).outerWidth(), a = e(i).outerHeight(), s = t.pageY - o.top,
                                    l = o.left + r - t.pageX, c = o.top + a - t.pageY, d = t.pageX - o.left;
                                return Math.min(s, l, c, d) > n.options.edge
                            }

                            var a, s = e.data(this, "_draggable");
                            s ? (s.handle.unbind("._draggable"), a = e.extend(s.options, t)) : a = e.extend({}, e.fn._draggable.defaults, e.fn._draggable.parseOptions(this), t || {});
                            var l = a.handle ? "string" == typeof a.handle ? e(a.handle, this) : a.handle : e(this);
                            if (e.data(this, "_draggable", {
                                    options: a,
                                    handle: l
                                }), a.disabled)return void e(this).css("cursor", "");
                            l.unbind("._draggable").bind("mousemove._draggable", {target: this}, function (t) {
                                if (!e.fn._draggable.isDragging) {
                                    var i = e.data(t.data.target, "_draggable").options;
                                    n(t) ? e(this).css("cursor", i.cursor) : e(this).css("cursor", "")
                                }
                            }).bind("mouseleave._draggable", {target: this}, function (t) {
                                e(this).css("cursor", "")
                            }).bind("mousedown._draggable", {target: this}, function (t) {
                                if (0 != n(t)) {
                                    e(this).css("cursor", "");
                                    var a = e(t.data.target).position(), s = e(t.data.target).offset(), l = {
                                        startPosition: e(t.data.target).css("position"),
                                        startLeft: a.left,
                                        startTop: a.top,
                                        left: a.left,
                                        top: a.top,
                                        startX: t.pageX,
                                        startY: t.pageY,
                                        offsetWidth: t.pageX - s.left,
                                        offsetHeight: t.pageY - s.top,
                                        target: t.data.target,
                                        parent: e(t.data.target).parent()[0]
                                    };
                                    e.extend(t.data, l);
                                    var c = e.data(t.data.target, "_draggable").options;
                                    if (0 != c.onBeforeDrag.call(t.data.target, t))return e(document).bind("mousedown._draggable", t.data, i), e(document).bind("mousemove._draggable", t.data, o), e(document).bind("mouseup._draggable", t.data, r), e.fn._draggable.timer = setTimeout(function () {
                                        e.fn._draggable.isDragging = !0, i(t)
                                    }, c.delay), !1
                                }
                            })
                        })
                    }, e.fn._draggable.methods = {
                        options: function (t) {
                            return e.data(t[0], "_draggable").options
                        }, proxy: function (t) {
                            return e.data(t[0], "_draggable").proxy
                        }, enable: function (t) {
                            return t.each(function () {
                                e(this)._draggable({disabled: !1})
                            })
                        }, disable: function (t) {
                            return t.each(function () {
                                e(this)._draggable({disabled: !0})
                            })
                        }
                    }, e.fn._draggable.parseOptions = function (t) {
                        var n = e(t);
                        return e.extend({}, e.parser.parseOptions(t, ["cursor", "handle", "axis", {
                            revert: "boolean",
                            deltaX: "number",
                            deltaY: "number",
                            edge: "number",
                            delay: "number"
                        }]), {disabled: !!n.attr("disabled") || void 0})
                    }, e.fn._draggable.defaults = {
                        proxy: null,
                        revert: !1,
                        cursor: "move",
                        deltaX: null,
                        deltaY: null,
                        handle: null,
                        disabled: !1,
                        edge: 0,
                        axis: null,
                        delay: 100,
                        onBeforeDrag: function (e) {
                        },
                        onStartDrag: function (e) {
                        },
                        onDrag: function (e) {
                        },
                        onStopDrag: function (e) {
                        }
                    }, e.fn._draggable.isDragging = !1
                }(jQuery), function (e) {
                    function t(t) {
                        e(t).addClass("_droppable"), e(t).bind("_dragenter", function (n, i) {
                            e.data(t, "_droppable").options.onDragEnter.apply(t, [n, i])
                        }), e(t).bind("_dragleave", function (n, i) {
                            e.data(t, "_droppable").options.onDragLeave.apply(t, [n, i])
                        }), e(t).bind("_dragover", function (n, i) {
                            e.data(t, "_droppable").options.onDragOver.apply(t, [n, i])
                        }), e(t).bind("_drop", function (n, i) {
                            e.data(t, "_droppable").options.onDrop.apply(t, [n, i])
                        })
                    }

                    e.fn._droppable = function (n, i) {
                        return "string" == typeof n ? e.fn._droppable.methods[n](this, i) : (n = n || {}, this.each(function () {
                            var i = e.data(this, "_droppable");
                            i ? e.extend(i.options, n) : (t(this), e.data(this, "_droppable", {options: e.extend({}, e.fn._droppable.defaults, e.fn._droppable.parseOptions(this), n)}))
                        }))
                    }, e.fn._droppable.methods = {
                        options: function (t) {
                            return e.data(t[0], "_droppable").options
                        }, enable: function (t) {
                            return t.each(function () {
                                e(this)._droppable({disabled: !1})
                            })
                        }, disable: function (t) {
                            return t.each(function () {
                                e(this)._droppable({disabled: !0})
                            })
                        }
                    }, e.fn._droppable.parseOptions = function (t) {
                        var n = e(t);
                        return e.extend({}, e.parser.parseOptions(t, ["accept"]), {disabled: !!n.attr("disabled") || void 0})
                    }, e.fn._droppable.defaults = {
                        accept: null, disabled: !1, onDragEnter: function (e, t) {
                        }, onDragOver: function (e, t) {
                        }, onDragLeave: function (e, t) {
                        }, onDrop: function (e, t) {
                        }
                    }
                }(jQuery), function (e) {
                    e.fn._resizable = function (t, n) {
                        function i(t) {
                            var n = t.data, i = e.data(n.target, "_resizable").options;
                            if (-1 != n.dir.indexOf("e")) {
                                var o = n.startWidth + t.pageX - n.startX;
                                o = Math.min(Math.max(o, i.minWidth), i.maxWidth), n.width = o
                            }
                            if (-1 != n.dir.indexOf("s")) {
                                var r = n.startHeight + t.pageY - n.startY;
                                r = Math.min(Math.max(r, i.minHeight), i.maxHeight), n.height = r
                            }
                            if (-1 != n.dir.indexOf("w")) {
                                var o = n.startWidth - t.pageX + n.startX;
                                o = Math.min(Math.max(o, i.minWidth), i.maxWidth), n.width = o, n.left = n.startLeft + n.startWidth - n.width
                            }
                            if (-1 != n.dir.indexOf("n")) {
                                var r = n.startHeight - t.pageY + n.startY;
                                r = Math.min(Math.max(r, i.minHeight), i.maxHeight), n.height = r, n.top = n.startTop + n.startHeight - n.height
                            }
                        }

                        function o(t) {
                            var n = t.data, i = e(n.target);
                            i.css({
                                left: n.left,
                                top: n.top
                            }), i.outerWidth() != n.width && i._outerWidth(n.width), i.outerHeight() != n.height && i._outerHeight(n.height)
                        }

                        function r(t) {
                            return e.fn._resizable.isResizing = !0, e.data(t.data.target, "_resizable").options.onStartResize.call(t.data.target, t), !1
                        }

                        function a(t) {
                            return i(t), 0 != e.data(t.data.target, "_resizable").options.onResize.call(t.data.target, t) && o(t), !1
                        }

                        function s(t) {
                            return e.fn._resizable.isResizing = !1, i(t, !0), o(t), e.data(t.data.target, "_resizable").options.onStopResize.call(t.data.target, t), e(document).unbind("._resizable"), e("body").css("cursor", ""), !1
                        }

                        return "string" == typeof t ? e.fn._resizable.methods[t](this, n) : this.each(function () {
                            function n(t) {
                                var n = e(t.data.target), o = "", r = n.offset(), a = n.outerWidth(),
                                    s = n.outerHeight(), l = i.edge;
                                t.pageY > r.top && t.pageY < r.top + l ? o += "n" : t.pageY < r.top + s && t.pageY > r.top + s - l && (o += "s"), t.pageX > r.left && t.pageX < r.left + l ? o += "w" : t.pageX < r.left + a && t.pageX > r.left + a - l && (o += "e");
                                for (var c = i.handles.split(","), d = 0; d < c.length; d++) {
                                    var u = c[d].replace(/(^\s*)|(\s*$)/g, "");
                                    if ("all" == u || u == o)return o
                                }
                                return ""
                            }

                            var i = null, o = e.data(this, "_resizable");
                            o ? (e(this).unbind("._resizable"), i = e.extend(o.options, t || {})) : (i = e.extend({}, e.fn._resizable.defaults, e.fn._resizable.parseOptions(this), t || {}), e.data(this, "_resizable", {options: i})), 1 != i.disabled && e(this).bind("mousemove._resizable", {target: this}, function (t) {
                                if (!e.fn._resizable.isResizing) {
                                    var i = n(t);
                                    "" == i ? e(t.data.target).css("cursor", "") : e(t.data.target).css("cursor", i + "-resize")
                                }
                            }).bind("mouseleave._resizable", {target: this}, function (t) {
                                e(t.data.target).css("cursor", "")
                            }).bind("mousedown._resizable", {target: this}, function (t) {
                                function i(n) {
                                    var i = parseInt(e(t.data.target).css(n));
                                    return isNaN(i) ? 0 : i
                                }

                                var o = n(t);
                                if ("" != o) {
                                    var l = {
                                        target: t.data.target,
                                        dir: o,
                                        startLeft: i("left"),
                                        startTop: i("top"),
                                        left: i("left"),
                                        top: i("top"),
                                        startX: t.pageX,
                                        startY: t.pageY,
                                        startWidth: e(t.data.target).outerWidth(),
                                        startHeight: e(t.data.target).outerHeight(),
                                        width: e(t.data.target).outerWidth(),
                                        height: e(t.data.target).outerHeight(),
                                        deltaWidth: e(t.data.target).outerWidth() - e(t.data.target).width(),
                                        deltaHeight: e(t.data.target).outerHeight() - e(t.data.target).height()
                                    };
                                    e(document).bind("mousedown._resizable", l, r), e(document).bind("mousemove._resizable", l, a), e(document).bind("mouseup._resizable", l, s), e("body").css("cursor", o + "-resize")
                                }
                            })
                        })
                    }, e.fn._resizable.methods = {
                        options: function (t) {
                            return e.data(t[0], "_resizable").options
                        }, enable: function (t) {
                            return t.each(function () {
                                e(this)._resizable({disabled: !1})
                            })
                        }, disable: function (t) {
                            return t.each(function () {
                                e(this)._resizable({disabled: !0})
                            })
                        }
                    }, e.fn._resizable.parseOptions = function (t) {
                        var n = e(t);
                        return e.extend({}, e.parser.parseOptions(t, ["handles", {
                            minWidth: "number",
                            minHeight: "number",
                            maxWidth: "number",
                            maxHeight: "number",
                            edge: "number"
                        }]), {disabled: !!n.attr("disabled") || void 0})
                    }, e.fn._resizable.defaults = {
                        disabled: !1,
                        handles: "n, e, s, w, ne, se, sw, nw, all",
                        minWidth: 10,
                        minHeight: 10,
                        maxWidth: 1e4,
                        maxHeight: 1e4,
                        edge: 5,
                        onStartResize: function (e) {
                        },
                        onResize: function (e) {
                        },
                        onStopResize: function (e) {
                        }
                    }, e.fn._resizable.isResizing = !1
                }(jQuery), function (e) {
                    function t(t, n) {
                        var i = e.data(t, "linkbutton").options;
                        if (n && e.extend(i, n), i.width || i.height || i.fit) {
                            var o = e(t), r = o.parent(), a = o.is(":visible");
                            if (!a) {
                                var s = e('<div style="display:none"></div>').insertBefore(t),
                                    l = {position: o.css("position"), display: o.css("display"), left: o.css("left")};
                                o.appendTo("body"), o.css({position: "absolute", display: "inline-block", left: -2e4})
                            }
                            o._size(i, r);
                            var c = o.find(".l-btn-left");
                            c.css("margin-top", 0), c.css("margin-top", parseInt((o.height() - c.height()) / 2) + "px"), a || (o.insertAfter(s), o.css(l), s.remove())
                        }
                    }

                    function n(t) {
                        var n = e.data(t, "linkbutton").options, r = e(t).empty();
                        r.addClass("l-btn").removeClass("l-btn-plain l-btn-selected l-btn-plain-selected l-btn-outline"), r.removeClass("l-btn-small l-btn-medium l-btn-large").addClass("l-btn-" + n.size), n.plain && r.addClass("l-btn-plain"), n.outline && r.addClass("l-btn-outline"), n.selected && r.addClass(n.plain ? "l-btn-selected l-btn-plain-selected" : "l-btn-selected"), r.attr("group", n.group || ""), r.attr("id", n.id || "");
                        var a = e('<span class="l-btn-left"></span>').appendTo(r);
                        n.text ? e('<span class="l-btn-text"></span>').html(n.text).appendTo(a) : e('<span class="l-btn-text l-btn-empty">&nbsp;</span>').appendTo(a), n.iconCls && (e('<span class="l-btn-icon">&nbsp;</span>').addClass(n.iconCls).appendTo(a), a.addClass("l-btn-icon-" + n.iconAlign)), r.unbind(".linkbutton").bind("focus.linkbutton", function () {
                            n.disabled || e(this).addClass("l-btn-focus")
                        }).bind("blur.linkbutton", function () {
                            e(this).removeClass("l-btn-focus")
                        }).bind("click.linkbutton", function () {
                            n.disabled || (n.toggle && (n.selected ? e(this).linkbutton("unselect") : e(this).linkbutton("select")), n.onClick.call(this))
                        }), i(t, n.selected), o(t, n.disabled)
                    }

                    function i(t, n) {
                        var i = e.data(t, "linkbutton").options;
                        n ? (i.group && e('a.l-btn[group="' + i.group + '"]').each(function () {
                            var t = e(this).linkbutton("options");
                            t.toggle && (e(this).removeClass("l-btn-selected l-btn-plain-selected"), t.selected = !1)
                        }), e(t).addClass(i.plain ? "l-btn-selected l-btn-plain-selected" : "l-btn-selected"), i.selected = !0) : i.group || (e(t).removeClass("l-btn-selected l-btn-plain-selected"), i.selected = !1)
                    }

                    function o(t, n) {
                        var i = e.data(t, "linkbutton"), o = i.options;
                        if (e(t).removeClass("l-btn-disabled l-btn-plain-disabled"), n) {
                            o.disabled = !0;
                            var r = e(t).attr("href");
                            r && (i.href = r, e(t).attr("href", "javascript:void(0)")), t.onclick && (i.onclick = t.onclick, t.onclick = null), o.plain ? e(t).addClass("l-btn-disabled l-btn-plain-disabled") : e(t).addClass("l-btn-disabled")
                        } else o.disabled = !1, i.href && e(t).attr("href", i.href), i.onclick && (t.onclick = i.onclick)
                    }

                    e.fn.linkbutton = function (i, o) {
                        return "string" == typeof i ? e.fn.linkbutton.methods[i](this, o) : (i = i || {}, this.each(function () {
                            var o = e.data(this, "linkbutton");
                            o ? e.extend(o.options, i) : (e.data(this, "linkbutton", {options: e.extend({}, e.fn.linkbutton.defaults, e.fn.linkbutton.parseOptions(this), i)}), e(this).removeAttr("disabled"), e(this).bind("_resize", function (n, i) {
                                return (e(this).hasClass("eui-fluid") || i) && t(this), !1
                            })), n(this), t(this)
                        }))
                    }, e.fn.linkbutton.methods = {
                        options: function (t) {
                            return e.data(t[0], "linkbutton").options
                        }, resize: function (e, n) {
                            return e.each(function () {
                                t(this, n)
                            })
                        }, enable: function (e) {
                            return e.each(function () {
                                o(this, !1)
                            })
                        }, disable: function (e) {
                            return e.each(function () {
                                o(this, !0)
                            })
                        }, select: function (e) {
                            return e.each(function () {
                                i(this, !0)
                            })
                        }, unselect: function (e) {
                            return e.each(function () {
                                i(this, !1)
                            })
                        }
                    }, e.fn.linkbutton.parseOptions = function (t) {
                        var n = e(t);
                        return e.extend({}, e.parser.parseOptions(t, ["id", "iconCls", "iconAlign", "group", "size", {
                            plain: "boolean",
                            toggle: "boolean",
                            selected: "boolean",
                            outline: "boolean"
                        }]), {
                            disabled: !!n.attr("disabled") || void 0,
                            text: e.trim(n.html()),
                            iconCls: n.attr("icon") || n.attr("iconCls")
                        })
                    }, e.fn.linkbutton.defaults = {
                        id: null,
                        disabled: !1,
                        toggle: !1,
                        selected: !1,
                        outline: !1,
                        group: null,
                        plain: !1,
                        text: "",
                        iconCls: null,
                        iconAlign: "left",
                        size: "small",
                        onClick: function () {
                        }
                    }
                }(jQuery), function (e) {
                    function t(t) {
                        e(t).addClass("etooltip-f")
                    }

                    function n(t) {
                        var n = e.data(t, "etooltip").options;
                        e(t).unbind(".etooltip").bind(n.showEvent + ".etooltip", function (n) {
                            e(t).etooltip("show", n)
                        }).bind(n.hideEvent + ".etooltip", function (n) {
                            e(t).etooltip("hide", n)
                        }).bind("mousemove.etooltip", function (i) {
                            n.trackMouse && (n.trackMouseX = i.pageX, n.trackMouseY = i.pageY, e(t).etooltip("reposition"))
                        })
                    }

                    function i(t) {
                        var n = e.data(t, "etooltip");
                        n.showTimer && (clearTimeout(n.showTimer), n.showTimer = null), n.hideTimer && (clearTimeout(n.hideTimer), n.hideTimer = null)
                    }

                    function o(t) {
                        function n(n) {
                            o.position = n || "bottom", r.removeClass("etooltip-top etooltip-bottom etooltip-left etooltip-right").addClass("etooltip-" + o.position);
                            var i, a;
                            if (o.trackMouse) s = e(), i = o.trackMouseX + o.deltaX, a = o.trackMouseY + o.deltaY; else {
                                var s = e(t);
                                i = s.offset().left + o.deltaX, a = s.offset().top + o.deltaY
                            }
                            switch (o.position) {
                                case"right":
                                    i += s._outerWidth() + 12 + (o.trackMouse ? 12 : 0), a -= (r._outerHeight() - s._outerHeight()) / 2;
                                    break;
                                case"left":
                                    i -= r._outerWidth() + 12 + (o.trackMouse ? 12 : 0), a -= (r._outerHeight() - s._outerHeight()) / 2;
                                    break;
                                case"top":
                                    i -= (r._outerWidth() - s._outerWidth()) / 2, a -= r._outerHeight() + 12 + (o.trackMouse ? 12 : 0);
                                    break;
                                case"bottom":
                                    i -= (r._outerWidth() - s._outerWidth()) / 2, a += s._outerHeight() + 12 + (o.trackMouse ? 12 : 0)
                            }
                            return {left: i, top: a}
                        }

                        var i = e.data(t, "etooltip");
                        if (i && i.tip) {
                            var o = i.options, r = i.tip, a = {left: -1e5, top: -1e5};
                            if (e(t).is(":visible"))if (a = n(o.position), "top" == o.position && a.top < 0 ? a = n("bottom") : "bottom" == o.position && a.top + r._outerHeight() > e(window)._outerHeight() + e(document).scrollTop() && (a = n("top")), a.left < 0) "left" == o.position ? a = n("right") : (e(t).etooltip("arrow").css("left", r._outerWidth() / 2 + a.left), a.left = 0); else if (a.left + r._outerWidth() > e(window)._outerWidth() + e(document)._scrollLeft())if ("right" == o.position) a = n("left"); else {
                                var s = a.left;
                                a.left = e(window)._outerWidth() + e(document)._scrollLeft() - r._outerWidth(), e(t).etooltip("arrow").css("left", r._outerWidth() / 2 - (a.left - s))
                            }
                            r.css({
                                left: a.left,
                                top: a.top,
                                zIndex: void 0 != o.zIndex ? o.zIndex : e.fn.window ? e.fn.window.defaults.zIndex++ : ""
                            }), o.onPosition.call(t, a.left, a.top)
                        }
                    }

                    function r(t, n) {
                        var o = e.data(t, "etooltip"), r = o.options, a = o.tip;
                        a || (a = e('<div tabindex="-1" class="etooltip"><div class="etooltip-content"></div><div class="etooltip-arrow-outer"></div><div class="etooltip-arrow"></div></div>').appendTo("body"), o.tip = a, s(t)), i(t), o.showTimer = setTimeout(function () {
                            e(t).etooltip("reposition"), a.show(), r.onShow.call(t, n);
                            var i = a.children(".etooltip-arrow-outer"), o = a.children(".etooltip-arrow"),
                                s = "border-" + r.position + "-color";
                            i.add(o).css({
                                borderTopColor: "",
                                borderBottomColor: "",
                                borderLeftColor: "",
                                borderRightColor: ""
                            }), i.css(s, a.css(s)), o.css(s, a.css("backgroundColor"))
                        }, r.showDelay)
                    }

                    function a(t, n) {
                        var o = e.data(t, "etooltip");
                        o && o.tip && (i(t), o.hideTimer = setTimeout(function () {
                            o.tip.hide(), o.options.onHide.call(t, n)
                        }, o.options.hideDelay))
                    }

                    function s(t, n) {
                        var i = e.data(t, "etooltip"), o = i.options;
                        if (n && (o.content = n), i.tip) {
                            var r = "function" == typeof o.content ? o.content.call(t) : o.content;
                            i.tip.children(".etooltip-content").html(r), o.onUpdate.call(t, r)
                        }
                    }

                    function l(t) {
                        var n = e.data(t, "etooltip");
                        if (n) {
                            i(t);
                            var o = n.options;
                            n.tip && n.tip.remove(), o._title && e(t).attr("title", o._title), e.removeData(t, "etooltip"), e(t).unbind(".etooltip").removeClass("etooltip-f"), o.onDestroy.call(t)
                        }
                    }

                    e.fn.etooltip = function (i, o) {
                        return "string" == typeof i ? e.fn.etooltip.methods[i](this, o) : (i = i || {}, this.each(function () {
                            var o = e.data(this, "etooltip");
                            o ? e.extend(o.options, i) : (e.data(this, "etooltip", {options: e.extend({}, e.fn.etooltip.defaults, e.fn.etooltip.parseOptions(this), i)}), t(this)), n(this), s(this)
                        }))
                    }, e.fn.etooltip.methods = {
                        options: function (t) {
                            return e.data(t[0], "etooltip").options
                        }, tip: function (t) {
                            return e.data(t[0], "etooltip").tip
                        }, arrow: function (e) {
                            return e.etooltip("tip").children(".etooltip-arrow-outer,.etooltip-arrow")
                        }, show: function (e, t) {
                            return e.each(function () {
                                r(this, t)
                            })
                        }, hide: function (e, t) {
                            return e.each(function () {
                                a(this, t)
                            })
                        }, update: function (e, t) {
                            return e.each(function () {
                                s(this, t)
                            })
                        }, reposition: function (e) {
                            return e.each(function () {
                                o(this)
                            })
                        }, destroy: function (e) {
                            return e.each(function () {
                                l(this)
                            })
                        }
                    }, e.fn.etooltip.parseOptions = function (t) {
                        var n = e(t),
                            i = e.extend({}, e.parser.parseOptions(t, ["position", "showEvent", "hideEvent", "content", {
                                trackMouse: "boolean",
                                deltaX: "number",
                                deltaY: "number",
                                showDelay: "number",
                                hideDelay: "number"
                            }]), {_title: n.attr("title")});
                        return n.attr("title", ""), i.content || (i.content = i._title), i
                    }, e.fn.etooltip.defaults = {
                        position: "bottom",
                        content: null,
                        trackMouse: !1,
                        deltaX: 0,
                        deltaY: 0,
                        showEvent: "mouseenter",
                        hideEvent: "mouseleave",
                        showDelay: 200,
                        hideDelay: 100,
                        onShow: function (e) {
                        },
                        onHide: function (e) {
                        },
                        onUpdate: function (e) {
                        },
                        onPosition: function (e, t) {
                        },
                        onDestroy: function () {
                        }
                    }
                }(jQuery), function ($) {
                    function _20b(e) {
                        e._remove()
                    }

                    function _20c(e, t) {
                        var n = $.data(e, "epanel"), i = n.options, o = n.epanel, r = o.children(".epanel-header"),
                            a = o.children(".epanel-body"), s = o.children(".epanel-footer");
                        if (t && $.extend(i, {
                                width: t.width,
                                height: t.height,
                                minWidth: t.minWidth,
                                maxWidth: t.maxWidth,
                                minHeight: t.minHeight,
                                maxHeight: t.maxHeight,
                                left: t.left,
                                top: t.top
                            }), o._size(i), r.add(a)._outerWidth(o.width()), isNaN(parseInt(i.height))) {
                            a.css("height", "");
                            var l = $.parser.parseValue("minHeight", i.minHeight, o.parent()),
                                c = $.parser.parseValue("maxHeight", i.maxHeight, o.parent()),
                                d = r._outerHeight() + s._outerHeight() + o._outerHeight() - o.height();
                            a._size("minHeight", l ? l - d : ""), a._size("maxHeight", c ? c - d : "")
                        } else a._outerHeight(o.height() - r._outerHeight() - s._outerHeight());
                        o.css({
                            height: "",
                            minHeight: "",
                            maxHeight: "",
                            left: i.left,
                            top: i.top
                        }), i.onResize.apply(e, [i.width, i.height]), $(e).epanel("doLayout")
                    }

                    function _215(e, t) {
                        var n = $.data(e, "epanel").options, i = $.data(e, "epanel").epanel;
                        t && (null != t.left && (n.left = t.left), null != t.top && (n.top = t.top)), i.css({
                            left: n.left,
                            top: n.top
                        }), n.onMove.apply(e, [n.left, n.top])
                    }

                    function _219(e) {
                        $(e).addClass("epanel-body")._size("clear");
                        var t = $('<div class="epanel"></div>').insertBefore(e);
                        return t[0].appendChild(e), t.bind("_resize", function (t, n) {
                            return ($(this).hasClass("eui-fluid") || n) && _20c(e), !1
                        }), t
                    }

                    function _21d(_21e) {
                        function _221() {
                            if (opts.noheader || !opts.title && !opts.header) _20b(_220.children(".epanel-header")), _220.children(".epanel-body").addClass("epanel-body-noheader"); else {
                                if (opts.header) $(opts.header).addClass("epanel-header").prependTo(_220); else {
                                    var _225 = _220.children(".epanel-header");
                                    _225.length || (_225 = $('<div class="epanel-header"></div>').prependTo(_220)), $.isArray(opts.tools) || _225.find("div.epanel-tool .epanel-tool-a").appendTo(opts.tools), _225.empty();
                                    var _226 = $('<div class="epanel-title"></div>').html(opts.title).appendTo(_225);
                                    opts.iconCls && (_226.addClass("epanel-with-icon"), $('<div class="epanel-icon"></div>').addClass(opts.iconCls).appendTo(_225));
                                    var tool = $('<div class="epanel-tool"></div>').appendTo(_225);
                                    tool.bind("click", function (e) {
                                        e.stopPropagation()
                                    }), opts.tools && ($.isArray(opts.tools) ? $.map(opts.tools, function (t) {
                                        _227(tool, t.iconCls, eval(t.handler))
                                    }) : $(opts.tools).children().each(function () {
                                        $(this).addClass($(this).attr("iconCls")).addClass("epanel-tool-a").appendTo(tool)
                                    })), opts.collapsible && _227(tool, "epanel-tool-collapse", function () {
                                        1 == opts.collapsed ? _245(_21e, !0) : _238(_21e, !0)
                                    }), opts.minimizable && _227(tool, "epanel-tool-min", function () {
                                        _24b(_21e)
                                    }), opts.maximizable && _227(tool, "epanel-tool-max", function () {
                                        1 == opts.maximized ? _24e(_21e) : _237(_21e)
                                    }), opts.closable && _227(tool, "epanel-tool-close", function () {
                                        _239(_21e)
                                    })
                                }
                                _220.children("div.epanel-body").removeClass("epanel-body-noheader")
                            }
                        }

                        function _227(e, t, n) {
                            $('<a href="javascript:void(0)"></a>').addClass(t).appendTo(e).bind("click", n)
                        }

                        function _222() {
                            opts.footer ? ($(opts.footer).addClass("epanel-footer").appendTo(_220), $(_21e).addClass("epanel-body-nobottom")) : (_220.children(".epanel-footer").remove(), $(_21e).removeClass("epanel-body-nobottom"))
                        }

                        var _21f = $.data(_21e, "epanel"), opts = _21f.options, _220 = _21f.epanel;
                        _220.css(opts.style), _220.addClass(opts.cls), _221(), _222();
                        var _223 = $(_21e).epanel("header"), body = $(_21e).epanel("body"),
                            _224 = $(_21e).siblings(".epanel-footer");
                        opts.border ? (_223.removeClass("epanel-header-noborder"), body.removeClass("epanel-body-noborder"), _224.removeClass("epanel-footer-noborder")) : (_223.addClass("epanel-header-noborder"), body.addClass("epanel-body-noborder"), _224.addClass("epanel-footer-noborder")), _223.addClass(opts.headerCls), body.addClass(opts.bodyCls), $(_21e).attr("id", opts.id || ""), opts.content && ($(_21e).epanel("clear"), $(_21e).html(opts.content), $.parser.parse($(_21e)))
                    }

                    function _229(e, t) {
                        var n = $.data(e, "epanel"), i = n.options;
                        if (o && (i.queryParams = t), i.href && (!n.isLoaded || !i.cache)) {
                            var o = $.extend({}, i.queryParams);
                            if (0 == i.onBeforeLoad.call(e, o))return;
                            n.isLoaded = !1, $(e).epanel("clear"), i.loadingMessage && $(e).html($('<div class="epanel-loading"></div>').html(i.loadingMessage)), i.loader.call(e, o, function (t) {
                                var o = i.extractor.call(e, t);
                                $(e).html(o), $.parser.parse($(e)), i.onLoad.apply(e, arguments), n.isLoaded = !0
                            }, function () {
                                i.onLoadError.apply(e, arguments)
                            })
                        }
                    }

                    function _22f(e) {
                        var t = $(e);
                        t.find(".combo-f").each(function () {
                            $(this).combo("destroy")
                        }), t.find(".m-btn").each(function () {
                            $(this).menubutton("destroy")
                        }), t.find(".s-btn").each(function () {
                            $(this).splitbutton("destroy")
                        }), t.find(".etooltip-f").each(function () {
                            $(this).etooltip("destroy")
                        }), t.children("div").each(function () {
                            $(this)._size("unfit")
                        }), t.empty()
                    }

                    function _231(e) {
                        $(e).epanel("doLayout", !0)
                    }

                    function _233(e, t) {
                        function n() {
                            i.closed = !1, i.minimized = !1, o.children(".epanel-header").find("a.epanel-tool-restore").length && (i.maximized = !0), i.onOpen.call(e), 1 == i.maximized && (i.maximized = !1, _237(e)), 1 == i.collapsed && (i.collapsed = !1, _238(e)), i.collapsed || (_229(e), _231(e))
                        }

                        var i = $.data(e, "epanel").options, o = $.data(e, "epanel").epanel;
                        if (1 == t || 0 != i.onBeforeOpen.call(e))if (o.stop(!0, !0), $.isFunction(i.openAnimation)) i.openAnimation.call(e, n); else switch (i.openAnimation) {
                            case"slide":
                                o.slideDown(i.openDuration, n);
                                break;
                            case"fade":
                                o.fadeIn(i.openDuration, n);
                                break;
                            case"show":
                                o.show(i.openDuration, n);
                                break;
                            default:
                                o.show(), n()
                        }
                    }

                    function _239(e, t) {
                        function n() {
                            i.closed = !0, i.onClose.call(e)
                        }

                        var i = $.data(e, "epanel").options, o = $.data(e, "epanel").epanel;
                        if (1 == t || 0 != i.onBeforeClose.call(e))if (o.stop(!0, !0), o._size("unfit"), $.isFunction(i.closeAnimation)) i.closeAnimation.call(e, n); else switch (i.closeAnimation) {
                            case"slide":
                                o.slideUp(i.closeDuration, n);
                                break;
                            case"fade":
                                o.fadeOut(i.closeDuration, n);
                                break;
                            case"hide":
                                o.hide(i.closeDuration, n);
                                break;
                            default:
                                o.hide(), o.removeClass("animated").next(".window-mask").remove(), o.children(".epanel-body").is("[dynamic]") && o.remove(), top.hideMask(), n()
                        }
                    }

                    function _23d(e, t) {
                        var n = $.data(e, "epanel"), i = n.options, o = n.epanel;
                        1 != t && 0 == i.onBeforeDestroy.call(e) || ($(e).epanel("clear").epanel("clear", "footer"), _20b(o), i.onDestroy.call(e))
                    }

                    function _238(e, t) {
                        var n = $.data(e, "epanel").options, i = $.data(e, "epanel").epanel,
                            o = i.children(".epanel-body"),
                            r = i.children(".epanel-header").find("a.epanel-tool-collapse");
                        1 != n.collapsed && (o.stop(!0, !0), 0 != n.onBeforeCollapse.call(e) && (r.addClass("epanel-tool-expand"), 1 == t ? o.slideUp("normal", function () {
                            n.collapsed = !0, n.onCollapse.call(e)
                        }) : (o.hide(), n.collapsed = !0, n.onCollapse.call(e))))
                    }

                    function _245(e, t) {
                        var n = $.data(e, "epanel").options, i = $.data(e, "epanel").epanel,
                            o = i.children(".epanel-body"),
                            r = i.children(".epanel-header").find("a.epanel-tool-collapse");
                        0 != n.collapsed && (o.stop(!0, !0), 0 != n.onBeforeExpand.call(e) && (r.removeClass("epanel-tool-expand"), 1 == t ? o.slideDown("normal", function () {
                            n.collapsed = !1, n.onExpand.call(e), _229(e), _231(e)
                        }) : (o.show(), n.collapsed = !1, n.onExpand.call(e), _229(e), _231(e))))
                    }

                    function _237(e) {
                        var t = $.data(e, "epanel").options, n = $.data(e, "epanel").epanel,
                            i = n.children(".epanel-header").find("a.epanel-tool-max");
                        1 != t.maximized && (i.addClass("epanel-tool-restore"), $.data(e, "epanel").original || ($.data(e, "epanel").original = {
                            width: t.width,
                            height: t.height,
                            left: t.left,
                            top: t.top,
                            fit: t.fit
                        }), t.left = 0, t.top = 0, t.fit = !0, _20c(e), t.minimized = !1, t.maximized = !0, t.onMaximize.call(e))
                    }

                    function _24b(e) {
                        var t = $.data(e, "epanel").options, n = $.data(e, "epanel").epanel;
                        n._size("unfit"), n.hide(), t.minimized = !0, t.maximized = !1, t.onMinimize.call(e)
                    }

                    function _24e(e) {
                        var t = $.data(e, "epanel").options, n = $.data(e, "epanel").epanel,
                            i = n.children(".epanel-header").find("a.epanel-tool-max");
                        0 != t.maximized && (n.show(), i.removeClass("epanel-tool-restore"), $.extend(t, $.data(e, "epanel").original), _20c(e), t.minimized = !1, t.maximized = !1, $.data(e, "epanel").original = null, t.onRestore.call(e))
                    }

                    function _251(e, t) {
                        $.data(e, "epanel").options.title = t, $(e).epanel("header").find("div.epanel-title").html(t)
                    }

                    $.fn._remove = function () {
                        return this.each(function () {
                            $(this).remove();
                            try {
                                this.outerHTML = ""
                            } catch (e) {
                            }
                        })
                    };
                    var _254 = null;
                    $(window).unbind(".epanel").bind("resize.epanel", function () {
                        _254 && clearTimeout(_254), _254 = setTimeout(function () {
                            var e = $("body.layout");
                            e.length ? (e.layout("resize"), $("body").children(".eui-fluid:visible").each(function () {
                                $(this).triggerHandler("_resize")
                            })) : $("body").epanel("doLayout"), _254 = null
                        }, 100)
                    }), $.fn.epanel = function (e, t) {
                        return "string" == typeof e ? $.fn.epanel.methods[e](this, t) : (e = e || {}, this.each(function () {
                            var t, n = $.data(this, "epanel");
                            n ? (t = $.extend(n.options, e), n.isLoaded = !1) : (t = $.extend({}, $.fn.epanel.defaults, $.fn.epanel.parseOptions(this), e), $(this).attr("title", ""), n = $.data(this, "epanel", {
                                options: t,
                                epanel: _219(this),
                                isLoaded: !1
                            })), _21d(this), 1 == t.doSize && (n.epanel.css("display", "block"), _20c(this)), 1 == t.closed || 1 == t.minimized ? n.epanel.hide() : _233(this)
                        }))
                    }, $.fn.epanel.methods = {
                        options: function (e) {
                            return $.data(e[0], "epanel").options
                        }, epanel: function (e) {
                            return $.data(e[0], "epanel").epanel
                        }, header: function (e) {
                            return $.data(e[0], "epanel").epanel.children(".epanel-header")
                        }, footer: function (e) {
                            return e.epanel("epanel").children(".epanel-footer")
                        }, body: function (e) {
                            return $.data(e[0], "epanel").epanel.children(".epanel-body")
                        }, setTitle: function (e, t) {
                            return e.each(function () {
                                _251(this, t)
                            })
                        }, open: function (e, t) {
                            return e.each(function () {
                                _233(this, t)
                            })
                        }, close: function (e, t) {
                            return e.each(function () {
                                _239(this, t)
                            })
                        }, destroy: function (e, t) {
                            return e.each(function () {
                                _23d(this, t)
                            })
                        }, clear: function (e, t) {
                            return e.each(function () {
                                _22f("footer" == t ? $(this).epanel("footer") : this)
                            })
                        }, refresh: function (e, t) {
                            return e.each(function () {
                                var e = $.data(this, "epanel");
                                e.isLoaded = !1, t && ("string" == typeof t ? e.options.href = t : e.options.queryParams = t), _229(this)
                            })
                        }, resize: function (e, t) {
                            return e.each(function () {
                                _20c(this, t)
                            })
                        }, doLayout: function (e, t) {
                            return e.each(function () {
                                function e(e, n) {
                                    if (e) {
                                        var i = e == $("body")[0];
                                        $(e).find("div.epanel:visible,div.accordion:visible,div.tabs-container:visible,div.layout:visible,.eui-fluid:visible").filter(function (t, o) {
                                            var r = $(o).parents(".epanel-" + n + ":first");
                                            return i ? 0 == r.length : r[0] == e
                                        }).each(function () {
                                            $(this).triggerHandler("_resize", [t || !1])
                                        })
                                    }
                                }

                                e(this, "body"), e($(this).siblings(".epanel-footer")[0], "footer")
                            })
                        }, move: function (e, t) {
                            return e.each(function () {
                                _215(this, t)
                            })
                        }, maximize: function (e) {
                            return e.each(function () {
                                _237(this)
                            })
                        }, minimize: function (e) {
                            return e.each(function () {
                                _24b(this)
                            })
                        }, restore: function (e) {
                            return e.each(function () {
                                _24e(this)
                            })
                        }, collapse: function (e, t) {
                            return e.each(function () {
                                _238(this, t)
                            })
                        }, expand: function (e, t) {
                            return e.each(function () {
                                _245(this, t)
                            })
                        }
                    }, $.fn.epanel.parseOptions = function (e) {
                        var t = $(e), n = t.children(".epanel-header,header"), i = t.children(".epanel-footer,footer");
                        return $.extend({}, $.parser.parseOptions(e, ["id", "width", "height", "left", "top", "title", "iconCls", "cls", "headerCls", "bodyCls", "tools", "href", "method", "header", "footer", {
                            cache: "boolean",
                            fit: "boolean",
                            border: "boolean",
                            noheader: "boolean"
                        }, {
                            collapsible: "boolean",
                            minimizable: "boolean",
                            maximizable: "boolean"
                        }, {
                            closable: "boolean",
                            collapsed: "boolean",
                            minimized: "boolean",
                            maximized: "boolean",
                            closed: "boolean"
                        }, "openAnimation", "closeAnimation", {
                            openDuration: "number",
                            closeDuration: "number"
                        }]), {
                            loadingMessage: void 0 != t.attr("loadingMessage") ? t.attr("loadingMessage") : void 0,
                            header: n.length ? n.removeClass("epanel-header") : void 0,
                            footer: i.length ? i.removeClass("epanel-footer") : void 0
                        })
                    }, $.fn.epanel.defaults = {
                        id: null,
                        title: null,
                        iconCls: null,
                        width: "auto",
                        height: "auto",
                        left: null,
                        top: null,
                        cls: null,
                        headerCls: null,
                        bodyCls: null,
                        style: {},
                        href: null,
                        cache: !0,
                        fit: !1,
                        border: !0,
                        doSize: !0,
                        noheader: !1,
                        content: null,
                        collapsible: !1,
                        minimizable: !1,
                        maximizable: !1,
                        closable: !1,
                        collapsed: !1,
                        minimized: !1,
                        maximized: !1,
                        closed: !1,
                        openAnimation: !1,
                        openDuration: 400,
                        closeAnimation: !1,
                        closeDuration: 400,
                        tools: null,
                        footer: null,
                        header: null,
                        queryParams: {},
                        method: "get",
                        href: null,
                        loadingMessage: "Loading...",
                        loader: function (e, t, n) {
                            var i = $(this).epanel("options");
                            if (!i.href)return !1;
                            $.ajax({
                                type: i.method,
                                url: i.href,
                                cache: !1,
                                data: e,
                                dataType: "html",
                                success: function (e) {
                                    t(e)
                                },
                                error: function () {
                                    n.apply(this, arguments)
                                }
                            })
                        },
                        extractor: function (e) {
                            var t = /<body[^>]*>((.|[\n\r])*)<\/body>/im, n = t.exec(e);
                            return n ? n[1] : e
                        },
                        onBeforeLoad: function (e) {
                        },
                        onLoad: function () {
                        },
                        onLoadError: function () {
                        },
                        onBeforeOpen: function () {
                        },
                        onOpen: function () {
                        },
                        onBeforeClose: function () {
                        },
                        onClose: function () {
                        },
                        onBeforeDestroy: function () {
                        },
                        onDestroy: function () {
                        },
                        onResize: function (e, t) {
                        },
                        onMove: function (e, t) {
                        },
                        onMaximize: function () {
                        },
                        onRestore: function () {
                        },
                        onMinimize: function () {
                        },
                        onBeforeCollapse: function () {
                        },
                        onBeforeExpand: function () {
                        },
                        onCollapse: function () {
                        },
                        onExpand: function () {
                        }
                    }
                }(jQuery), function (e) {
                    function t(t, n) {
                        var i = e.data(t, "window");
                        n && (null != n.left && (i.options.left = n.left), null != n.top && (i.options.top = n.top)),
                            e(t).epanel("move", i.options), i.shadow && i.shadow.css({
                            left: i.options.left,
                            top: i.options.top
                        })
                    }

                    function n(n, i) {
                        var o = e.data(n, "window").options, r = e(n).window("epanel"), a = r._outerWidth();
                        if (o.inline) {
                            var s = r.parent();
                            o.left = Math.ceil((s.width() - a) / 2 + s.scrollLeft())
                        } else o.left = Math.ceil((e(window)._outerWidth() - a) / 2 + e(document).scrollLeft());
                        i && t(n)
                    }

                    function i(n, i) {
                        var o = e.data(n, "window").options, r = e(n).window("epanel"), a = r._outerHeight();
                        if (o.inline) {
                            var s = r.parent();
                            o.top = Math.ceil((s.height() - a) / 2 + s.scrollTop())
                        } else o.top = Math.ceil((e(window)._outerHeight() - a) / 2 + e(document).scrollTop());
                        i && t(n)
                    }

                    function o(o) {
                        var r = e.data(o, "window"), s = r.options, l = e(o).epanel(e.extend({}, r.options, {
                            border: !1,
                            doSize: !0,
                            closed: !0,
                            cls: "window",
                            headerCls: "window-header",
                            bodyCls: "window-body " + (s.noheader ? "window-body-noheader" : ""),
                            onBeforeDestroy: function () {
                                if (0 == s.onBeforeDestroy.call(o))return !1;
                                r.shadow && r.shadow.remove(), r.mask && r.mask.remove()
                            },
                            onClose: function () {
                                r.shadow && r.shadow.hide(), r.mask && r.mask.hide(), s.onClose.call(o)
                            },
                            onOpen: function () {
                                r.mask && r.mask.css({
                                    display: "block",
                                    zIndex: e.fn.window.defaults.zIndex++
                                }), r.shadow && r.shadow.css({
                                    display: "block",
                                    zIndex: e.fn.window.defaults.zIndex++,
                                    left: s.left,
                                    top: s.top,
                                    width: r.window._outerWidth(),
                                    height: r.window._outerHeight()
                                }), r.window.css("z-index", e.fn.window.defaults.zIndex++), s.onOpen.call(o)
                            },
                            onResize: function (t, n) {
                                var i = e(this).epanel("options");
                                e.extend(s, {
                                    width: i.width,
                                    height: i.height,
                                    left: i.left,
                                    top: i.top
                                }), r.shadow && r.shadow.css({
                                    left: s.left,
                                    top: s.top,
                                    width: r.window._outerWidth(),
                                    height: r.window._outerHeight()
                                }), s.onResize.call(o, t, n)
                            },
                            onMinimize: function () {
                                r.shadow && r.shadow.hide(), r.mask && r.mask.hide(), r.options.onMinimize.call(o)
                            },
                            onBeforeCollapse: function () {
                                if (0 == s.onBeforeCollapse.call(o))return !1;
                                r.shadow && r.shadow.hide()
                            },
                            onExpand: function () {
                                r.shadow && r.shadow.show(), s.onExpand.call(o)
                            }
                        }));
                        r.window = l.epanel("epanel"), r.mask && r.mask.remove(), 1 == s.modal && (r.mask = e('<div class="window-mask"></div>').insertAfter(r.window), r.mask.css({
                            width: s.inline ? r.mask.parent().width() : a().width,
                            height: s.inline ? r.mask.parent().height() : a().height,
                            display: "none"
                        })), r.shadow && r.shadow.remove(), 1 == s.shadow && (r.shadow = e('<div class="window-shadow"></div>').insertAfter(r.window), r.shadow.css({display: "none"})), null == s.left && n(o), null == s.top && i(o), t(o), s.closed || l.window("open")
                    }

                    function r(t) {
                        var n = e.data(t, "window");
                        n.window._draggable({
                            handle: ">div.epanel-header>div.epanel-title",
                            disabled: 0 == n.options._draggable,
                            onStartDrag: function (t) {
                                n.mask && n.mask.css("z-index", e.fn.window.defaults.zIndex++), n.shadow && n.shadow.css("z-index", e.fn.window.defaults.zIndex++), n.window.css("z-index", e.fn.window.defaults.zIndex++), n.proxy || (n.proxy = e('<div class="window-proxy"></div>').insertAfter(n.window)), n.proxy.css({
                                    display: "none",
                                    zIndex: e.fn.window.defaults.zIndex++,
                                    left: t.data.left,
                                    top: t.data.top
                                }), n.proxy._outerWidth(n.window._outerWidth()), n.proxy._outerHeight(n.window._outerHeight()), setTimeout(function () {
                                    n.proxy && n.proxy.show()
                                }, 500)
                            },
                            onDrag: function (e) {
                                return n.proxy.css({display: "block", left: e.data.left, top: e.data.top}), !1
                            },
                            onStopDrag: function (i) {
                                n.options.left = i.data.left, n.options.top = i.data.top, e(t).window("move"), n.proxy.remove(), n.proxy = null
                            }
                        }), n.window._resizable({
                            disabled: 0 == n.options._resizable, onStartResize: function (t) {
                                n.pmask && n.pmask.remove(), n.pmask = e('<div class="window-proxy-mask"></div>').insertAfter(n.window), n.pmask.css({
                                    zIndex: e.fn.window.defaults.zIndex++,
                                    left: t.data.left,
                                    top: t.data.top,
                                    width: n.window._outerWidth(),
                                    height: n.window._outerHeight()
                                }), n.proxy && n.proxy.remove(), n.proxy = e('<div class="window-proxy"></div>').insertAfter(n.window), n.proxy.css({
                                    zIndex: e.fn.window.defaults.zIndex++,
                                    left: t.data.left,
                                    top: t.data.top
                                }), n.proxy._outerWidth(t.data.width)._outerHeight(t.data.height)
                            }, onResize: function (e) {
                                return n.proxy.css({
                                    left: e.data.left,
                                    top: e.data.top
                                }), n.proxy._outerWidth(e.data.width), n.proxy._outerHeight(e.data.height), !1
                            }, onStopResize: function (i) {
                                e(t).window("resize", i.data), n.pmask.remove(), n.pmask = null, n.proxy.remove(), n.proxy = null
                            }
                        })
                    }

                    function a() {
                        return "BackCompat" == document.compatMode ? {
                            width: Math.max(document.body.scrollWidth, document.body.clientWidth),
                            height: Math.max(document.body.scrollHeight, document.body.clientHeight)
                        } : {
                            width: Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth),
                            height: Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
                        }
                    }

                    e(window).resize(function () {
                        e("body>div.window-mask").css({
                            width: e(window)._outerWidth(),
                            height: e(window)._outerHeight()
                        }), setTimeout(function () {
                            e("body>div.window-mask").css({width: a().width, height: a().height})
                        }, 50)
                    }), e.fn.window = function (t, n) {
                        if ("string" == typeof t) {
                            var i = e.fn.window.methods[t];
                            return i ? i(this, n) : this.epanel(t, n)
                        }
                        return t = t || {}, this.each(function () {
                            var n = e.data(this, "window");
                            n ? e.extend(n.options, t) : (n = e.data(this, "window", {options: e.extend({}, e.fn.window.defaults, e.fn.window.parseOptions(this), t)}), n.options.inline || document.body.appendChild(this)), o(this), r(this)
                        })
                    }, e.fn.window.methods = {
                        options: function (t) {
                            var n = t.epanel("options"), i = e.data(t[0], "window").options;
                            return e.extend(i, {
                                closed: n.closed,
                                collapsed: n.collapsed,
                                minimized: n.minimized,
                                maximized: n.maximized
                            })
                        }, window: function (t) {
                            return e.data(t[0], "window").window
                        }, move: function (e, n) {
                            return e.each(function () {
                                t(this, n)
                            })
                        }, hcenter: function (e) {
                            return e.each(function () {
                                n(this, !0)
                            })
                        }, vcenter: function (e) {
                            return e.each(function () {
                                i(this, !0)
                            })
                        }, center: function (e) {
                            return e.each(function () {
                                n(this), i(this), t(this)
                            })
                        }
                    }, e.fn.window.parseOptions = function (t) {
                        return e.extend({}, e.fn.epanel.parseOptions(t), e.parser.parseOptions(t, [{
                            _draggable: "boolean",
                            _resizable: "boolean",
                            shadow: "boolean",
                            modal: "boolean",
                            inline: "boolean"
                        }]))
                    }, e.fn.window.defaults = e.extend({}, e.fn.epanel.defaults, {
                        zIndex: 9e3,
                        _draggable: !0,
                        _resizable: !0,
                        shadow: !0,
                        modal: !1,
                        inline: !1,
                        title: "  ",
                        collapsible: !0,
                        minimizable: !0,
                        maximizable: !0,
                        closable: !0,
                        closed: !1
                    })
                }(jQuery), function ($) {
                    function _28f(_290) {
                        var opts = $.data(_290, "dialog").options;
                        opts.inited = !1, $(_290).window($.extend({}, opts, {
                            onResize: function (e, t) {
                                opts.inited && (_295(this), opts.onResize.call(this, e, t))
                            }
                        }));
                        var win = $(_290).window("window");
                        if (opts.toolbar)if ($.isArray(opts.toolbar)) {
                            $(_290).siblings("div.dialog-toolbar").remove();
                            for (var _291 = $('<div class="dialog-toolbar"><table cellspacing="0" cellpadding="0"><tr></tr></table></div>').appendTo(win), tr = _291.find("tr"), i = 0; i < opts.toolbar.length; i++) {
                                var btn = opts.toolbar[i];
                                if ("-" == btn) $('<td><div class="dialog-tool-separator"></div></td>').appendTo(tr); else {
                                    var td = $("<td></td>").appendTo(tr),
                                        tool = $('<a href="javascript:void(0)"></a>').appendTo(td);
                                    tool[0].onclick = eval(btn.handler || function () {
                                        }), tool.linkbutton($.extend({}, btn, {plain: !0}))
                                }
                            }
                        } else $(opts.toolbar).addClass("dialog-toolbar").appendTo(win), $(opts.toolbar).show(); else $(_290).siblings("div.dialog-toolbar").remove();
                        if (opts.buttons)if ($.isArray(opts.buttons)) {
                            $(_290).siblings("div.dialog-button").remove();
                            for (var _292 = $('<div class="dialog-button"></div>').appendTo(win), i = 0; i < opts.buttons.length; i++) {
                                var p = opts.buttons[i], _293 = $('<a href="javascript:void(0)"></a>').appendTo(_292);
                                p.handler && (_293[0].onclick = p.handler), _293.linkbutton(p)
                            }
                        } else $(opts.buttons).addClass("dialog-button").appendTo(win), $(opts.buttons).show(); else $(_290).siblings("div.dialog-button").remove();
                        opts.inited = !0;
                        var _294 = opts.closed;
                        win.show(), $(_290).window("resize"), _294 && win.hide()
                    }

                    function _295(e, t) {
                        var n = $(e), i = n.dialog("options"), o = i.noheader, r = n.siblings(".dialog-toolbar"),
                            a = n.siblings(".dialog-button");
                        r.insertBefore(e).css({
                            position: "relative",
                            borderTopWidth: o ? 1 : 0,
                            top: o ? r.length : 0
                        }), a.insertAfter(e).css({
                            position: "relative",
                            top: -1
                        }), r.add(a)._outerWidth(n._outerWidth()).find(".eui-fluid:visible").each(function () {
                            $(this).triggerHandler("_resize")
                        }), isNaN(parseInt(i.height)) || n._outerHeight(n._outerHeight() - r._outerHeight() - a._outerHeight());
                        var s = $.data(e, "window").shadow;
                        if (s) {
                            var l = n.epanel("epanel");
                            s.css({width: l._outerWidth(), height: l._outerHeight()})
                        }
                    }

                    $.fn.dialog = function (e, t) {
                        if ("string" == typeof e) {
                            var n = $.fn.dialog.methods[e];
                            return n ? n(this, t) : this.window(e, t)
                        }
                        return e = e || {}, this.each(function () {
                            var t = $.data(this, "dialog");
                            t ? $.extend(t.options, e) : $.data(this, "dialog", {options: $.extend({}, $.fn.dialog.defaults, $.fn.dialog.parseOptions(this), e)}), _28f(this)
                        })
                    }, $.fn.dialog.methods = {
                        options: function (e) {
                            var t = $.data(e[0], "dialog").options, n = e.epanel("options");
                            return $.extend(t, {
                                width: n.width,
                                height: n.height,
                                left: n.left,
                                top: n.top,
                                closed: n.closed,
                                collapsed: n.collapsed,
                                minimized: n.minimized,
                                maximized: n.maximized
                            }), t
                        }, dialog: function (e) {
                            return e.window("window")
                        }
                    }, $.fn.dialog.parseOptions = function (e) {
                        var t = $(e);
                        return $.extend({}, $.fn.window.parseOptions(e), $.parser.parseOptions(e, ["toolbar", "buttons"]), {
                            toolbar: t.children(".dialog-toolbar").length ? t.children(".dialog-toolbar").removeClass("dialog-toolbar") : void 0,
                            buttons: t.children(".dialog-button").length ? t.children(".dialog-button").removeClass("dialog-button") : void 0
                        })
                    }, $.fn.dialog.defaults = $.extend({}, $.fn.window.defaults, {
                        title: "New Dialog",
                        collapsible: !1,
                        minimizable: !1,
                        maximizable: !1,
                        _resizable: !1,
                        toolbar: null,
                        buttons: null
                    })
                }(jQuery), function (e) {
                    function t() {
                        e(document).unbind(".messager").bind("keydown.messager", function (t) {
                            if (27 == t.keyCode) e("body").children("div.messager-window").children("div.messager-body").each(function () {
                                e(this).window("close")
                            }); else if (9 == t.keyCode) {
                                var n = e("body").children("div.messager-window").children("div.messager-body");
                                if (!n.length)return;
                                for (var i = n.find(".messager-input,.messager-button .l-btn"), o = 0; o < i.length; o++)if (e(i[o]).is(":focus"))return e(i[o >= i.length - 1 ? 0 : o + 1]).focus(), !1
                            }
                        })
                    }

                    function n() {
                        e(document).unbind(".messager")
                    }

                    function i(t) {
                        var n = e.extend({}, e.messager.defaults, {
                            modal: !1,
                            shadow: !1,
                            _draggable: !1,
                            _resizable: !1,
                            closed: !0,
                            style: {
                                left: "",
                                top: "",
                                right: 0,
                                zIndex: e.fn.window.defaults.zIndex++,
                                bottom: -document.body.scrollTop - document.documentElement.scrollTop
                            },
                            title: "",
                            width: 250,
                            height: 100,
                            showType: "slide",
                            showSpeed: 600,
                            msg: "",
                            timeout: 4e3
                        }, t), i = e('<div class="messager-body"></div>').html(n.msg).appendTo("body");
                        return i.window(e.extend({}, n, {
                            openAnimation: n.showType,
                            closeAnimation: "show" == n.showType ? "hide" : n.showType,
                            openDuration: n.showSpeed,
                            closeDuration: n.showSpeed,
                            onOpen: function () {
                                function e() {
                                    n.timeout > 0 && (n.timer = setTimeout(function () {
                                        i.length && i.data("window") && i.window("close")
                                    }, n.timeout))
                                }

                                i.window("window").hover(function () {
                                    n.timer && clearTimeout(n.timer)
                                }, function () {
                                    e()
                                }), e(), t.onOpen ? t.onOpen.call(this) : n.onOpen.call(this)
                            },
                            onClose: function () {
                                n.timer && clearTimeout(n.timer), t.onClose ? t.onClose.call(this) : n.onClose.call(this), i.window("destroy")
                            }
                        })), i.window("window").css(n.style), i.window("open"), i
                    }

                    function o(i) {
                        t();
                        var o = e('<div class="messager-body"></div>').appendTo("body");
                        if (o.window(e.extend({}, i, {
                                doSize: !1, noheader: !i.title, onClose: function () {
                                    n(), i.onClose && i.onClose.call(this), setTimeout(function () {
                                        o.window("destroy")
                                    }, 100)
                                }
                            })), i.buttons && i.buttons.length) {
                            var r = e('<div class="messager-button"></div>').appendTo(o);
                            e.map(i.buttons, function (t) {
                                e('<a href="javascript:void(0)" style="margin-left:10px"></a>').appendTo(r).linkbutton(t)
                            })
                        }
                        return o.window("window").addClass("messager-window"), o.window("resize"), o.children("div.messager-button").children("a:first").focus(), o
                    }

                    e.messager = {
                        show: function (e) {
                            return i(e)
                        }, alert: function (t, n, i, r) {
                            var a = "object" == typeof t ? t : {title: t, msg: n, icon: i, fn: r},
                                s = a.icon ? "messager-icon messager-" + a.icon : "";
                            a = e.extend({}, e.messager.defaults, {
                                content: '<div class="' + s + '"></div><div>' + a.msg + '</div><div style="clear:both;"/>',
                                buttons: [{
                                    text: e.messager.defaults.ok, onClick: function () {
                                        l.window("close"), a.fn()
                                    }
                                }]
                            }, a);
                            var l = o(a);
                            return l
                        }, confirm: function (t, n, i) {
                            var r = "object" == typeof t ? t : {title: t, msg: n, fn: i};
                            r = e.extend({}, e.messager.defaults, {
                                content: '<div class="messager-icon messager-question"></div><div>' + r.msg + '</div><div style="clear:both;"/>',
                                buttons: [{
                                    text: e.messager.defaults.ok, onClick: function () {
                                        a.window("close"), r.fn(!0)
                                    }
                                }, {
                                    text: e.messager.defaults.cancel, onClick: function () {
                                        a.window("close"), r.fn(!1)
                                    }
                                }]
                            }, r);
                            var a = o(r);
                            return a
                        }, prompt: function (t, n, i) {
                            var r = "object" == typeof t ? t : {title: t, msg: n, fn: i};
                            r = e.extend({}, e.messager.defaults, {
                                content: '<div class="messager-icon messager-question"></div><div>' + r.msg + '</div><br/><div style="clear:both;"/><div><input class="messager-input" type="text"/></div>',
                                buttons: [{
                                    text: e.messager.defaults.ok, onClick: function () {
                                        a.window("close"), r.fn(a.find(".messager-input").val())
                                    }
                                }, {
                                    text: e.messager.defaults.cancel, onClick: function () {
                                        a.window("close"), r.fn()
                                    }
                                }]
                            }, r);
                            var a = o(r);
                            return a.find("input.messager-input").focus(), a
                        }, progress: function (t) {
                            var n = {
                                bar: function () {
                                    return e("body>div.messager-window").find("div.messager-p-bar")
                                }, close: function () {
                                    var t = e("body>div.messager-window>div.messager-body:has(div.messager-progress)");
                                    t.length && t.window("close")
                                }
                            };
                            if ("string" == typeof t) {
                                return (0, n[t])()
                            }
                            var i = e.extend({}, {
                                title: "",
                                content: void 0,
                                msg: "",
                                text: void 0,
                                interval: 300
                            }, t || {}), r = o(e.extend({}, e.messager.defaults, {
                                content: '<div class="messager-progress"><div class="messager-p-msg">' + i.msg + '</div><div class="messager-p-bar"></div></div>',
                                closable: !1,
                                doSize: !1
                            }, i, {
                                onClose: function () {
                                    this.timer && clearInterval(this.timer), t.onClose ? t.onClose.call(this) : e.messager.defaults.onClose.call(this)
                                }
                            })), a = r.find("div.messager-p-bar");
                            return a.progressbar({text: i.text}), r.window("resize"), i.interval && (r[0].timer = setInterval(function () {
                                var e = a.progressbar("getValue");
                                e += 10, e > 100 && (e = 0), a.progressbar("setValue", e)
                            }, i.interval)), r
                        }
                    }, e.messager.defaults = e.extend({}, e.fn.window.defaults, {
                        ok: "确定",
                        cancel: "取消",
                        width: 300,
                        height: "auto",
                        modal: !0,
                        collapsible: !1,
                        minimizable: !1,
                        maximizable: !1,
                        _resizable: !1,
                        fn: function () {
                        }
                    })
                }(jQuery), function (e) {
                    function t(t, n) {
                        function i(e, t) {
                            for (var n = 0, i = 0; i < a.length; i++) {
                                var o = a[i], r = o.epanel("header")._outerHeight(l);
                                if (o.epanel("options").collapsible == e) {
                                    var c = isNaN(t) ? void 0 : t + l * r.length;
                                    o.epanel("resize", {
                                        width: s.width(),
                                        height: e ? c : void 0
                                    }), n += o.epanel("epanel").outerHeight() - l * r.length
                                }
                            }
                            return n
                        }

                        var o = e.data(t, "accordion"), r = o.options, a = o.epanels, s = e(t);
                        n && e.extend(r, {width: n.width, height: n.height}), s._size(r);
                        var l = 0, c = "auto", d = s.find(">.epanel>.accordion-header");
                        d.length && (l = e(d[0]).css("height", "")._outerHeight()), isNaN(parseInt(r.height)) || (c = s.height() - l * d.length), i(!0, c - i(!1) + 1)
                    }

                    function n(t, n, i, o) {
                        for (var r = e.data(t, "accordion").epanels, a = [], s = 0; s < r.length; s++) {
                            var l = r[s];
                            if (n) l.epanel("options")[n] == i && a.push(l); else if (l[0] == e(i)[0])return s
                        }
                        return n ? o ? a : a.length ? a[0] : null : -1
                    }

                    function i(e) {
                        return n(e, "collapsed", !1, !0)
                    }

                    function o(e) {
                        var t = i(e);
                        return t.length ? t[0] : null
                    }

                    function r(e, t) {
                        return n(e, null, t)
                    }

                    function a(t, i) {
                        var o = e.data(t, "accordion").epanels;
                        return "number" == typeof i ? i < 0 || i >= o.length ? null : o[i] : n(t, "title", i)
                    }

                    function s(t) {
                        var n = e.data(t, "accordion").options, i = e(t);
                        n.border ? i.removeClass("accordion-noborder") : i.addClass("accordion-noborder")
                    }

                    function l(n) {
                        var i = e.data(n, "accordion"), o = e(n);
                        o.addClass("accordion"), i.epanels = [], o.children("div").each(function () {
                            var t = e.extend({}, e.parser.parseOptions(this), {selected: !!e(this).attr("selected") || void 0}),
                                o = e(this);
                            i.epanels.push(o), c(n, o, t)
                        }), o.bind("_resize", function (i, o) {
                            return (e(this).hasClass("eui-fluid") || o) && t(n), !1
                        })
                    }

                    function c(t, n, o) {
                        function a(e) {
                            var n = e.epanel("options");
                            if (n.collapsible) {
                                var i = r(t, e);
                                n.collapsed ? d(t, i) : u(t, i)
                            }
                        }

                        var s = e.data(t, "accordion").options;
                        n.epanel(e.extend({}, {
                            collapsible: !0,
                            minimizable: !1,
                            maximizable: !1,
                            closable: !1,
                            doSize: !1,
                            collapsed: !0,
                            headerCls: "accordion-header",
                            bodyCls: "accordion-body"
                        }, o, {
                            onBeforeExpand: function () {
                                if (o.onBeforeExpand && 0 == o.onBeforeExpand.call(this))return !1;
                                if (!s.multiple)for (var n = e.grep(i(t), function (e) {
                                    return e.epanel("options").collapsible
                                }), a = 0; a < n.length; a++)u(t, r(t, n[a]));
                                var l = e(this).epanel("header");
                                l.addClass("accordion-header-selected"), l.find(".accordion-collapse").removeClass("accordion-expand")
                            }, onExpand: function () {
                                o.onExpand && o.onExpand.call(this), s.onSelect.call(t, e(this).epanel("options").title, r(t, this))
                            }, onBeforeCollapse: function () {
                                if (o.onBeforeCollapse && 0 == o.onBeforeCollapse.call(this))return !1;
                                var t = e(this).epanel("header");
                                t.removeClass("accordion-header-selected"), t.find(".accordion-collapse").addClass("accordion-expand")
                            }, onCollapse: function () {
                                o.onCollapse && o.onCollapse.call(this), s.onUnselect.call(t, e(this).epanel("options").title, r(t, this))
                            }
                        }));
                        var l = n.epanel("header"), c = l.children("div.epanel-tool");
                        c.children("a.epanel-tool-collapse").hide();
                        var f = e('<a href="javascript:void(0)"></a>').addClass("accordion-collapse accordion-expand").appendTo(c);
                        f.bind("click", function () {
                            return a(n), !1
                        }), n.epanel("options").collapsible ? f.show() : f.hide(), l.click(function () {
                            return a(n), !1
                        })
                    }

                    function d(t, n) {
                        var i = a(t, n);
                        if (i) {
                            p(t);
                            var o = e.data(t, "accordion").options;
                            i.epanel("expand", o.animate)
                        }
                    }

                    function u(t, n) {
                        var i = a(t, n);
                        if (i) {
                            p(t);
                            var o = e.data(t, "accordion").options;
                            i.epanel("collapse", o.animate)
                        }
                    }

                    function f(t) {
                        function i(e) {
                            var n = o.animate;
                            o.animate = !1, d(t, e), o.animate = n
                        }

                        var o = e.data(t, "accordion").options, a = n(t, "selected", !0);
                        i(a ? r(t, a) : o.selected)
                    }

                    function p(t) {
                        for (var n = e.data(t, "accordion").epanels, i = 0; i < n.length; i++)n[i].stop(!0, !0)
                    }

                    function h(n, i) {
                        var o = e.data(n, "accordion"), r = o.options, a = o.epanels;
                        void 0 == i.selected && (i.selected = !0), p(n);
                        var s = e("<div></div>").appendTo(n);
                        a.push(s), c(n, s, i), t(n), r.onAdd.call(n, i.title, a.length - 1), i.selected && d(n, a.length - 1)
                    }

                    function m(n, i) {
                        var s = e.data(n, "accordion"), l = s.options, c = s.epanels;
                        p(n);
                        var u = a(n, i), f = u.epanel("options").title, h = r(n, u);
                        if (u && 0 != l.onBeforeRemove.call(n, f, h)) {
                            if (c.splice(h, 1), u.epanel("destroy"), c.length) {
                                t(n);
                                o(n) || d(n, 0)
                            }
                            l.onRemove.call(n, f, h)
                        }
                    }

                    e.fn.accordion = function (n, i) {
                        return "string" == typeof n ? e.fn.accordion.methods[n](this, i) : (n = n || {}, this.each(function () {
                            var i = e.data(this, "accordion");
                            i ? e.extend(i.options, n) : (e.data(this, "accordion", {
                                options: e.extend({}, e.fn.accordion.defaults, e.fn.accordion.parseOptions(this), n),
                                accordion: e(this).addClass("accordion"),
                                epanels: []
                            }), l(this)), s(this), t(this), f(this)
                        }))
                    }, e.fn.accordion.methods = {
                        options: function (t) {
                            return e.data(t[0], "accordion").options
                        }, epanels: function (t) {
                            return e.data(t[0], "accordion").epanels
                        }, resize: function (e, n) {
                            return e.each(function () {
                                t(this, n)
                            })
                        }, getSelections: function (e) {
                            return i(e[0])
                        }, getSelected: function (e) {
                            return o(e[0])
                        }, getepanel: function (e, t) {
                            return a(e[0], t)
                        }, getepanelIndex: function (e, t) {
                            return r(e[0], t)
                        }, select: function (e, t) {
                            return e.each(function () {
                                d(this, t)
                            })
                        }, unselect: function (e, t) {
                            return e.each(function () {
                                u(this, t)
                            })
                        }, add: function (e, t) {
                            return e.each(function () {
                                h(this, t)
                            })
                        }, remove: function (e, t) {
                            return e.each(function () {
                                m(this, t)
                            })
                        }
                    }, e.fn.accordion.parseOptions = function (t) {
                        e(t);
                        return e.extend({}, e.parser.parseOptions(t, ["width", "height", {
                            fit: "boolean",
                            border: "boolean",
                            animate: "boolean",
                            multiple: "boolean",
                            selected: "number"
                        }]))
                    }, e.fn.accordion.defaults = {
                        width: "auto",
                        height: "auto",
                        fit: !1,
                        border: !0,
                        animate: !0,
                        multiple: !1,
                        selected: 0,
                        onSelect: function (e, t) {
                        },
                        onUnselect: function (e, t) {
                        },
                        onAdd: function (e, t) {
                        },
                        onBeforeRemove: function (e, t) {
                        },
                        onRemove: function (e, t) {
                        }
                    }
                }(jQuery), function ($) {
                    function _30a(e) {
                        var t = 0;
                        return $(e).children().each(function () {
                            t += $(this).outerWidth(!0)
                        }), t
                    }

                    function _30b(e) {
                        var t = $.data(e, "tabs").options;
                        if ("left" != t.tabPosition && "right" != t.tabPosition && t.showHeader) {
                            var n = $(e).children("div.tabs-header"), i = n.children("div.tabs-tool"),
                                o = n.children("div.tabs-scroller-left"), r = n.children("div.tabs-scroller-right"),
                                a = n.children("div.tabs-wrap"), s = n.outerHeight();
                            t.plain && (s -= s - n.height()), i._outerHeight(s);
                            var l = _30a(n.find("ul.tabs")), c = n.width() - i._outerWidth();
                            l > c ? (o.add(r).show()._outerHeight(s), "left" == t.toolPosition ? (i.css({
                                left: o.outerWidth(),
                                right: ""
                            }), a.css({
                                marginLeft: o.outerWidth() + i._outerWidth(),
                                marginRight: r._outerWidth(),
                                width: c - o.outerWidth() - r.outerWidth()
                            })) : (i.css({left: "", right: r.outerWidth()}), a.css({
                                marginLeft: o.outerWidth(),
                                marginRight: r.outerWidth() + i._outerWidth(),
                                width: c - o.outerWidth() - r.outerWidth()
                            }))) : (o.add(r).hide(), "left" == t.toolPosition ? (i.css({
                                left: 0,
                                right: ""
                            }), a.css({marginLeft: i._outerWidth(), marginRight: 0, width: c})) : (i.css({
                                left: "",
                                right: 0
                            }), a.css({marginLeft: 0, marginRight: i._outerWidth(), width: c})))
                        }
                    }

                    function _313(_314) {
                        var opts = $.data(_314, "tabs").options, _315 = $(_314).children("div.tabs-header");
                        if (opts.tools)if ("string" == typeof opts.tools) $(opts.tools).addClass("tabs-tool").appendTo(_315), $(opts.tools).show(); else {
                            _315.children("div.tabs-tool").remove();
                            for (var _316 = $('<div class="tabs-tool"><table cellspacing="0" cellpadding="0" style="height:100%"><tr></tr></table></div>').appendTo(_315), tr = _316.find("tr"), i = 0; i < opts.tools.length; i++) {
                                var td = $("<td></td>").appendTo(tr),
                                    tool = $('<a href="javascript:void(0);"></a>').appendTo(td);
                                tool[0].onclick = eval(opts.tools[i].handler || function () {
                                    }), tool.linkbutton($.extend({}, opts.tools[i], {plain: !0}))
                            }
                        } else _315.children("div.tabs-tool").remove()
                    }

                    function _317(e, t) {
                        function n(e, t) {
                            var n = e.epanel("options"), i = n.tab.find("a.tabs-inner"),
                                t = t || parseInt(n.tabWidth || o.tabWidth || void 0);
                            t ? i._outerWidth(t) : i.css("width", ""), i._outerHeight(o.tabHeight), i.css("lineHeight", i.height() + "px"), i.find(".eui-fluid:visible").triggerHandler("_resize")
                        }

                        var i = $.data(e, "tabs"), o = i.options, r = $(e);
                        if (o.doSize) {
                            t && $.extend(o, {width: t.width, height: t.height}), r._size(o);
                            var a = r.children("div.tabs-header"), s = r.children("div.tabs-epanels"),
                                l = a.find("div.tabs-wrap"), c = l.find(".tabs");
                            if (c.children("li").removeClass("tabs-first tabs-last"), c.children("li:first").addClass("tabs-first"), c.children("li:last").addClass("tabs-last"), "left" == o.tabPosition || "right" == o.tabPosition ? (a._outerWidth(o.showHeader ? o.headerWidth : 0), s._outerWidth(r.width() - a.outerWidth()), a.add(s)._outerHeight(o.height), l._outerWidth(a.width()), c._outerWidth(l.width()).css("height", "")) : (a.children("div.tabs-scroller-left,div.tabs-scroller-right,div.tabs-tool").css("display", o.showHeader ? "block" : "none"), a._outerWidth(r.width()).css("height", ""), o.showHeader ? (a.css("background-color", ""), l.css("height", "")) : (a.css("background-color", "transparent"), a._outerHeight(0), l._outerHeight(0)), c._outerHeight(o.tabHeight).css("width", ""), c._outerHeight(c.outerHeight() - c.height() - 1 + o.tabHeight).css("width", ""), s._size("height", isNaN(o.height) ? "" : o.height - a.outerHeight()), s._size("width", isNaN(o.width) ? "" : o.width)), i.tabs.length) {
                                var d = c.outerWidth(!0) - c.width(), u = c.children("li:first"),
                                    f = u.outerWidth(!0) - u.width(),
                                    p = a.width() - a.children(".tabs-tool")._outerWidth(),
                                    h = Math.floor((p - d - f * i.tabs.length) / i.tabs.length);
                                if ($.map(i.tabs, function (e) {
                                        n(e, o.justified && $.inArray(o.tabPosition, ["top", "bottom"]) >= 0 ? h : void 0)
                                    }), o.justified && $.inArray(o.tabPosition, ["top", "bottom"]) >= 0) {
                                    var m = p - d - _30a(c);
                                    n(i.tabs[i.tabs.length - 1], h + m)
                                }
                            }
                            _30b(e)
                        }
                    }

                    function _323(e) {
                        var t = $.data(e, "tabs").options, n = _325(e);
                        if (n) {
                            var i = $(e).children("div.tabs-epanels"), o = "auto" == t.width ? "auto" : i.width(),
                                r = "auto" == t.height ? "auto" : i.height();
                            n.epanel("resize", {width: o, height: r})
                        }
                    }

                    function _329(e) {
                        var t = ($.data(e, "tabs").tabs, $(e).addClass("tabs-container")),
                            n = $('<div class="tabs-epanels"></div>').insertBefore(t);
                        t.children("div").each(function () {
                            n[0].appendChild(this)
                        }), t[0].appendChild(n[0]), $('<div class="tabs-header"><div class="tabs-scroller-left"></div><div class="tabs-scroller-right"></div><div class="tabs-wrap"><ul class="tabs"></ul></div></div>').prependTo(e), t.children("div.tabs-epanels").children("div").each(function (t) {
                            var n = $.extend({}, $.parser.parseOptions(this), {selected: !!$(this).attr("selected") || void 0});
                            _338(e, n, $(this))
                        }), t.children("div.tabs-header").find(".tabs-scroller-left, .tabs-scroller-right").hover(function () {
                            $(this).addClass("tabs-scroller-over")
                        }, function () {
                            $(this).removeClass("tabs-scroller-over")
                        }), t.bind("_resize", function (t, n) {
                            return ($(this).hasClass("eui-fluid") || n) && (_317(e), _323(e)), !1
                        })
                    }

                    function _32d(e) {
                        function t(e) {
                            var t = 0;
                            return e.parent().children("li").each(function (n) {
                                if (e[0] == this)return t = n, !1
                            }), t
                        }

                        var n = $.data(e, "tabs"), i = n.options;
                        $(e).children("div.tabs-header").unbind().bind("click", function (o) {
                            if ($(o.target).hasClass("tabs-scroller-left")) $(e).tabs("scrollBy", -i.scrollIncrement); else {
                                if (!$(o.target).hasClass("tabs-scroller-right")) {
                                    var r = $(o.target).closest("li");
                                    if (r.hasClass("tabs-disabled"))return !1;
                                    if ($(o.target).closest("a.tabs-close").length) _351(e, t(r)); else if (r.length) {
                                        var a = t(r), s = n.tabs[a].epanel("options");
                                        s.collapsible ? s.closed ? _348(e, a) : _365(e, a) : _348(e, a)
                                    }
                                    return !1
                                }
                                $(e).tabs("scrollBy", i.scrollIncrement)
                            }
                        }).bind("contextmenu", function (n) {
                            var o = $(n.target).closest("li");
                            o.hasClass("tabs-disabled") || o.length && i.onContextMenu.call(e, n, o.find("span.tabs-title").html(), t(o))
                        })
                    }

                    function _334(e) {
                        var t = $.data(e, "tabs").options, n = $(e).children("div.tabs-header"),
                            i = $(e).children("div.tabs-epanels");
                        n.removeClass("tabs-header-top tabs-header-bottom tabs-header-left tabs-header-right"), i.removeClass("tabs-epanels-top tabs-epanels-bottom tabs-epanels-left tabs-epanels-right"), "top" == t.tabPosition ? n.insertBefore(i) : "bottom" == t.tabPosition ? (n.insertAfter(i), n.addClass("tabs-header-bottom"), i.addClass("tabs-epanels-top")) : "left" == t.tabPosition ? (n.addClass("tabs-header-left"), i.addClass("tabs-epanels-right")) : "right" == t.tabPosition && (n.addClass("tabs-header-right"), i.addClass("tabs-epanels-left")), 1 == t.plain ? n.addClass("tabs-header-plain") : n.removeClass("tabs-header-plain"), n.removeClass("tabs-header-narrow").addClass(t.narrow ? "tabs-header-narrow" : "");
                        var o = n.find(".tabs");
                        o.removeClass("tabs-pill").addClass(t.pill ? "tabs-pill" : ""), o.removeClass("tabs-narrow").addClass(t.narrow ? "tabs-narrow" : ""), o.removeClass("tabs-justified").addClass(t.justified ? "tabs-justified" : ""), 1 == t.border ? (n.removeClass("tabs-header-noborder"), i.removeClass("tabs-epanels-noborder")) : (n.addClass("tabs-header-noborder"), i.addClass("tabs-epanels-noborder")), t.doSize = !0
                    }

                    function _338(e, t, n) {
                        t = t || {};
                        var i = $.data(e, "tabs"), o = i.tabs;
                        (void 0 == t.index || t.index > o.length) && (t.index = o.length), t.index < 0 && (t.index = 0);
                        var r = $(e).children("div.tabs-header").find("ul.tabs"), a = $(e).children("div.tabs-epanels"),
                            s = $('<li><a href="javascript:void(0)" class="tabs-inner"><span class="tabs-title"></span><span class="tabs-icon"></span></a></li>');
                        n || (n = $("<div></div>")), t.index >= o.length ? (s.appendTo(r), n.appendTo(a), o.push(n)) : (s.insertBefore(r.children("li:eq(" + t.index + ")")), n.insertBefore(a.children("div.epanel:eq(" + t.index + ")")), o.splice(t.index, 0, n)), n.epanel($.extend({}, t, {
                            tab: s,
                            border: !1,
                            noheader: !0,
                            closed: !0,
                            doSize: !1,
                            iconCls: t.icon ? t.icon : void 0,
                            onLoad: function () {
                                t.onLoad && t.onLoad.call(this, arguments), i.options.onLoad.call(e, $(this))
                            },
                            onBeforeOpen: function () {
                                if (t.onBeforeOpen && 0 == t.onBeforeOpen.call(this))return !1;
                                var n = $(e).tabs("getSelected");
                                if (n) {
                                    if (n[0] == this)return _323(e), !1;
                                    if ($(e).tabs("unselect", _343(e, n)), n = $(e).tabs("getSelected"))return !1
                                }
                                var i = $(this).epanel("options");
                                i.tab.addClass("tabs-selected");
                                var o = $(e).find(">div.tabs-header>div.tabs-wrap"), r = i.tab.position().left,
                                    a = r + i.tab.outerWidth();
                                if (r < 0 || a > o.width()) {
                                    var s = r - (o.width() - i.tab.width()) / 2;
                                    $(e).tabs("scrollBy", s)
                                } else $(e).tabs("scrollBy", 0);
                                var l = $(this).epanel("epanel");
                                l.css("display", "block"), _323(e), l.css("display", "none")
                            },
                            onOpen: function () {
                                t.onOpen && t.onOpen.call(this);
                                var n = $(this).epanel("options");
                                i.selectHis.push(n.title), i.options.onSelect.call(e, n.title, _343(e, this))
                            },
                            onBeforeClose: function () {
                                if (t.onBeforeClose && 0 == t.onBeforeClose.call(this))return !1;
                                $(this).epanel("options").tab.removeClass("tabs-selected")
                            },
                            onClose: function () {
                                t.onClose && t.onClose.call(this);
                                var n = $(this).epanel("options");
                                i.options.onUnselect.call(e, n.title, _343(e, this))
                            }
                        })), $(e).tabs("update", {tab: n, options: n.epanel("options"), type: "header"})
                    }

                    function _344(e, t) {
                        var n = $.data(e, "tabs"), i = n.options;
                        void 0 == t.selected && (t.selected = !0), _338(e, t), i.onAdd.call(e, t.title, t.index), t.selected && _348(e, t.index)
                    }

                    function _349(e, t) {
                        t.type = t.type || "all";
                        var n = $.data(e, "tabs").selectHis, i = t.tab, o = i.epanel("options").title;
                        if ("all" != t.type && "body" != t || i.epanel($.extend({}, t.options, {iconCls: t.options.icon ? t.options.icon : void 0})), "all" == t.type || "header" == t.type) {
                            var r = i.epanel("options"), a = r.tab;
                            if (r.header) a.find(".tabs-inner").html($(r.header)); else {
                                var s = a.find("span.tabs-title"), l = a.find("span.tabs-icon");
                                if (s.html(r.title), l.attr("class", "tabs-icon"), a.find("a.tabs-close").remove(), r.closable ? (s.addClass("tabs-closable"), $('<a href="javascript:void(0)" class="tabs-close"></a>').appendTo(a)) : s.removeClass("tabs-closable"), r.iconCls ? (s.addClass("tabs-with-icon"), l.addClass(r.iconCls)) : s.removeClass("tabs-with-icon"), r.tools) {
                                    var c = a.find("span.tabs-p-tool");
                                    if (!c.length)var c = $('<span class="tabs-p-tool"></span>').insertAfter(a.find("a.tabs-inner"));
                                    if ($.isArray(r.tools))for (var d = 0; d < r.tools.length; d++) {
                                        var u = $('<a href="javascript:void(0)"></a>').appendTo(c);
                                        u.addClass(r.tools[d].iconCls), r.tools[d].handler && u.bind("click", {handler: r.tools[d].handler}, function (e) {
                                            $(this).parents("li").hasClass("tabs-disabled") || e.data.handler.call(this)
                                        })
                                    } else $(r.tools).children().appendTo(c);
                                    var f = 12 * c.children().length;
                                    r.closable ? f += 8 : (f -= 3, c.css("right", "5px")), s.css("padding-right", f + "px")
                                } else a.find("span.tabs-p-tool").remove(), s.css("padding-right", "")
                            }
                            if (o != r.title)for (var d = 0; d < n.length; d++)n[d] == o && (n[d] = r.title)
                        }
                        _317(e), $.data(e, "tabs").options.onUpdate.call(e, r.title, _343(e, i))
                    }

                    function _351(e, t) {
                        var n = $.data(e, "tabs").options, i = $.data(e, "tabs").tabs, o = $.data(e, "tabs").selectHis;
                        if (_355(e, t)) {
                            var r = _356(e, t), a = r.epanel("options").title, s = _343(e, r);
                            if (0 != n.onBeforeClose.call(e, a, s)) {
                                var r = _356(e, t, !0);
                                r.epanel("options").tab.remove(), r.epanel("destroy"), n.onClose.call(e, a, s), _317(e);
                                for (var l = 0; l < o.length; l++)o[l] == a && (o.splice(l, 1), l--);
                                var c = o.pop();
                                c ? _348(e, c) : i.length && _348(e, 0)
                            }
                        }
                    }

                    function _356(e, t, n) {
                        var i = $.data(e, "tabs").tabs;
                        if ("number" == typeof t) {
                            if (t < 0 || t >= i.length)return null;
                            var o = i[t];
                            return n && i.splice(t, 1), o
                        }
                        for (var r = 0; r < i.length; r++) {
                            var o = i[r];
                            if (o.epanel("options").title == t)return n && i.splice(r, 1), o
                        }
                        return null
                    }

                    function _343(e, t) {
                        for (var n = $.data(e, "tabs").tabs, i = 0; i < n.length; i++)if (n[i][0] == $(t)[0])return i;
                        return -1
                    }

                    function _325(e) {
                        for (var t = $.data(e, "tabs").tabs, n = 0; n < t.length; n++) {
                            var i = t[n];
                            if (i.epanel("options").tab.hasClass("tabs-selected"))return i
                        }
                        return null
                    }

                    function _35f(e) {
                        for (var t = $.data(e, "tabs"), n = t.tabs, i = 0; i < n.length; i++)if (n[i].epanel("options").selected)return void _348(e, i);
                        _348(e, t.options.selected)
                    }

                    function _348(e, t) {
                        var n = _356(e, t);
                        n && !n.is(":visible") && (_364(e), n.epanel("open"))
                    }

                    function _365(e, t) {
                        var n = _356(e, t);
                        n && n.is(":visible") && (_364(e), n.epanel("close"))
                    }

                    function _364(e) {
                        $(e).children("div.tabs-epanels").each(function () {
                            $(this).stop(!0, !0)
                        })
                    }

                    function _355(e, t) {
                        return null != _356(e, t)
                    }

                    function _36b(e, t) {
                        $.data(e, "tabs").options.showHeader = t, $(e).tabs("resize")
                    }

                    $.fn.tabs = function (e, t) {
                        return "string" == typeof e ? $.fn.tabs.methods[e](this, t) : (e = e || {}, this.each(function () {
                            var t = $.data(this, "tabs");
                            t ? $.extend(t.options, e) : ($.data(this, "tabs", {
                                options: $.extend({}, $.fn.tabs.defaults, $.fn.tabs.parseOptions(this), e),
                                tabs: [],
                                selectHis: []
                            }), _329(this)), _313(this), _334(this), _317(this), _32d(this), _35f(this)
                        }))
                    }, $.fn.tabs.methods = {
                        options: function (e) {
                            var t = e[0], n = $.data(t, "tabs").options, i = _325(t);
                            return n.selected = i ? _343(t, i) : -1, n
                        }, tabs: function (e) {
                            return $.data(e[0], "tabs").tabs
                        }, resize: function (e, t) {
                            return e.each(function () {
                                _317(this, t), _323(this)
                            })
                        }, add: function (e, t) {
                            return e.each(function () {
                                _344(this, t)
                            })
                        }, close: function (e, t) {
                            return e.each(function () {
                                _351(this, t)
                            })
                        }, getTab: function (e, t) {
                            return _356(e[0], t)
                        }, getTabIndex: function (e, t) {
                            return _343(e[0], t)
                        }, getSelected: function (e) {
                            return _325(e[0])
                        }, select: function (e, t) {
                            return e.each(function () {
                                _348(this, t)
                            })
                        }, unselect: function (e, t) {
                            return e.each(function () {
                                _365(this, t)
                            })
                        }, exists: function (e, t) {
                            return _355(e[0], t)
                        }, update: function (e, t) {
                            return e.each(function () {
                                _349(this, t)
                            })
                        }, enableTab: function (e, t) {
                            return e.each(function () {
                                $(this).tabs("getTab", t).epanel("options").tab.removeClass("tabs-disabled")
                            })
                        }, disableTab: function (e, t) {
                            return e.each(function () {
                                $(this).tabs("getTab", t).epanel("options").tab.addClass("tabs-disabled")
                            })
                        }, showHeader: function (e) {
                            return e.each(function () {
                                _36b(this, !0)
                            })
                        }, hideHeader: function (e) {
                            return e.each(function () {
                                _36b(this, !1)
                            })
                        }, scrollBy: function (e, t) {
                            return e.each(function () {
                                var e = $(this).tabs("options"), n = $(this).find(">div.tabs-header>div.tabs-wrap"),
                                    i = Math.min(n._scrollLeft() + t, function () {
                                        var e = 0, t = n.children("ul");
                                        return t.children("li").each(function () {
                                            e += $(this).outerWidth(!0)
                                        }), e - n.width() + (t.outerWidth() - t.width())
                                    }());
                                n.animate({scrollLeft: i}, e.scrollDuration)
                            })
                        }
                    }, $.fn.tabs.parseOptions = function (e) {
                        return $.extend({}, $.parser.parseOptions(e, ["tools", "toolPosition", "tabPosition", {
                            fit: "boolean",
                            border: "boolean",
                            plain: "boolean"
                        }, {
                            headerWidth: "number",
                            tabWidth: "number",
                            tabHeight: "number",
                            selected: "number"
                        }, {showHeader: "boolean", justified: "boolean", narrow: "boolean", pill: "boolean"}]))
                    }, $.fn.tabs.defaults = {
                        width: "auto",
                        height: "auto",
                        headerWidth: 150,
                        tabWidth: "auto",
                        tabHeight: 27,
                        selected: 0,
                        showHeader: !0,
                        plain: !1,
                        fit: !1,
                        border: !0,
                        justified: !1,
                        narrow: !1,
                        pill: !1,
                        tools: null,
                        toolPosition: "right",
                        tabPosition: "top",
                        scrollIncrement: 100,
                        scrollDuration: 400,
                        onLoad: function (e) {
                        },
                        onSelect: function (e, t) {
                        },
                        onUnselect: function (e, t) {
                        },
                        onBeforeClose: function (e, t) {
                        },
                        onClose: function (e, t) {
                        },
                        onAdd: function (e, t) {
                        },
                        onUpdate: function (e, t) {
                        },
                        onContextMenu: function (e, t, n) {
                        }
                    }
                }(jQuery), function (e) {
                    function t(t, n) {
                        function i(e, t) {
                            if (e.length && s(e)) {
                                var n = e.epanel("options");
                                e.epanel("resize", {width: c.width(), height: n.height});
                                var i = e.epanel("epanel").outerHeight();
                                e.epanel("move", {
                                    left: 0,
                                    top: "n" == t ? 0 : c.height() - i
                                }), d.height -= i, "n" == t && (d.top += i, !n.split && n.border && d.top--), !n.split && n.border && d.height++
                            }
                        }

                        function o(e, t) {
                            if (e.length && s(e)) {
                                var n = e.epanel("options");
                                e.epanel("resize", {width: n.width, height: d.height});
                                var i = e.epanel("epanel").outerWidth();
                                e.epanel("move", {
                                    left: "e" == t ? c.width() - i : 0,
                                    top: d.top
                                }), d.width -= i, "w" == t && (d.left += i, !n.split && n.border && d.left--), !n.split && n.border && d.width++
                            }
                        }

                        var r = e.data(t, "layout"), a = r.options, l = r.epanels, c = e(t);
                        n && e.extend(a, {
                            width: n.width,
                            height: n.height
                        }), "body" == t.tagName.toLowerCase() ? c._size("fit") : c._size(a);
                        var d = {top: 0, left: 0, width: c.width(), height: c.height()};
                        i(s(l.expandNorth) ? l.expandNorth : l.north, "n"), i(s(l.expandSouth) ? l.expandSouth : l.south, "s"), o(s(l.expandEast) ? l.expandEast : l.east, "e"), o(s(l.expandWest) ? l.expandWest : l.west, "w"), l.center.epanel("resize", d)
                    }

                    function n(n) {
                        function o(t) {
                            t.children("div").each(function () {
                                var t = e.fn.layout.parseepanelOptions(this);
                                "north,south,east,west,center".indexOf(t.region) >= 0 && i(n, t, this)
                            })
                        }

                        var r = e(n);
                        r.addClass("layout"), o(r.children("form").length ? r.children("form") : r), r.append('<div class="layout-split-proxy-h"></div><div class="layout-split-proxy-v"></div>'), r.bind("_resize", function (i, o) {
                            return (e(this).hasClass("eui-fluid") || o) && t(n), !1
                        })
                    }

                    function i(n, i, o) {
                        i.region = i.region || "center";
                        var a = e.data(n, "layout").epanels, s = e(n), l = i.region;
                        if (!a[l].length) {
                            var c = e(o);
                            c.length || (c = e("<div></div>").appendTo(s));
                            var u = e.extend({}, e.fn.layout.epaneldefaults, {
                                width: c.length ? parseInt(c[0].style.width) || c.outerWidth() : "auto",
                                height: c.length ? parseInt(c[0].style.height) || c.outerHeight() : "auto",
                                doSize: !1,
                                collapsible: !0,
                                cls: "layout-epanel layout-epanel-" + l,
                                bodyCls: "layout-body",
                                onOpen: function () {
                                    var t = e(this).epanel("header").children("div.epanel-tool");
                                    t.children("a.epanel-tool-collapse").hide();
                                    var i = {north: "up", south: "down", east: "right", west: "left"};
                                    if (i[l]) {
                                        var o = "layout-button-" + i[l], a = t.children("a." + o);
                                        a.length || (a = e('<a href="javascript:void(0)"></a>').addClass(o).appendTo(t), a.bind("click", {dir: l}, function (e) {
                                            return r(n, e.data.dir), !1
                                        })), e(this).epanel("options").collapsible ? a.show() : a.hide()
                                    }
                                }
                            }, i);
                            c.epanel(u), a[l] = c;
                            var f = {north: "s", south: "n", east: "w", west: "e"}, p = c.epanel("epanel");
                            c.epanel("options").split && p.addClass("layout-split-" + l), p._resizable(e.extend({}, {
                                handles: f[l] || "",
                                disabled: !c.epanel("options").split,
                                onStartResize: function (t) {
                                    if (d = !0, "north" == l || "south" == l)var i = e(">div.layout-split-proxy-v", n); else var i = e(">div.layout-split-proxy-h", n);
                                    var o = {display: "block"};
                                    "north" == l ? (o.top = parseInt(p.css("top")) + p.outerHeight() - i.height(), o.left = parseInt(p.css("left")), o.width = p.outerWidth(), o.height = i.height()) : "south" == l ? (o.top = parseInt(p.css("top")), o.left = parseInt(p.css("left")), o.width = p.outerWidth(), o.height = i.height()) : "east" == l ? (o.top = parseInt(p.css("top")) || 0, o.left = parseInt(p.css("left")) || 0, o.width = i.width(), o.height = p.outerHeight()) : "west" == l && (o.top = parseInt(p.css("top")) || 0, o.left = p.outerWidth() - i.width(), o.width = i.width(), o.height = p.outerHeight()), i.css(o), e('<div class="layout-mask"></div>').css({
                                        left: 0,
                                        top: 0,
                                        width: s.width(),
                                        height: s.height()
                                    }).appendTo(s)
                                },
                                onResize: function (t) {
                                    if ("north" == l || "south" == l) {
                                        var i = e(">div.layout-split-proxy-v", n);
                                        i.css("top", t.pageY - e(n).offset().top - i.height() / 2)
                                    } else {
                                        var i = e(">div.layout-split-proxy-h", n);
                                        i.css("left", t.pageX - e(n).offset().left - i.width() / 2)
                                    }
                                    return !1
                                },
                                onStopResize: function (e) {
                                    s.children("div.layout-split-proxy-v,div.layout-split-proxy-h").hide(), c.epanel("resize", e.data), t(n), d = !1, s.find(">div.layout-mask").remove()
                                }
                            }, i))
                        }
                    }

                    function o(t, n) {
                        var i = e.data(t, "layout").epanels;
                        if (i[n].length) {
                            i[n].epanel("destroy"), i[n] = e();
                            var o = "expand" + n.substring(0, 1).toUpperCase() + n.substring(1);
                            i[o] && (i[o].epanel("destroy"), i[o] = void 0)
                        }
                    }

                    function r(t, n, i) {
                        function o() {
                            var i = e(t), o = l.center.epanel("options"), r = u.collapsedSize;
                            if ("east" == n) {
                                var a = c.epanel("epanel")._outerWidth(), d = o.width + a - r;
                                return !u.split && u.border || d++, {
                                    resizeC: {width: d},
                                    expand: {left: i.width() - a},
                                    expandP: {top: o.top, left: i.width() - r, width: r, height: o.height},
                                    collapse: {left: i.width(), top: o.top, height: o.height}
                                }
                            }
                            if ("west" == n) {
                                var a = c.epanel("epanel")._outerWidth(), d = o.width + a - r;
                                return !u.split && u.border || d++, {
                                    resizeC: {width: d, left: r - 1},
                                    expand: {left: 0},
                                    expandP: {left: 0, top: o.top, width: r, height: o.height},
                                    collapse: {left: -a, top: o.top, height: o.height}
                                }
                            }
                            if ("north" == n) {
                                var f = c.epanel("epanel")._outerHeight(), p = o.height;
                                return s(l.expandNorth) || (p += f - r + (u.split || !u.border ? 1 : 0)), l.east.add(l.west).add(l.expandEast).add(l.expandWest).epanel("resize", {
                                    top: r - 1,
                                    height: p
                                }), {
                                    resizeC: {top: r - 1, height: p},
                                    expand: {top: 0},
                                    expandP: {top: 0, left: 0, width: i.width(), height: r},
                                    collapse: {top: -f, width: i.width()}
                                }
                            }
                            if ("south" == n) {
                                var f = c.epanel("epanel")._outerHeight(), p = o.height;
                                return s(l.expandSouth) || (p += f - r + (u.split || !u.border ? 1 : 0)), l.east.add(l.west).add(l.expandEast).add(l.expandWest).epanel("resize", {height: p}), {
                                    resizeC: {height: p},
                                    expand: {top: i.height() - f},
                                    expandP: {top: i.height() - r, left: 0, width: i.width(), height: r},
                                    collapse: {top: i.height(), width: i.width()}
                                }
                            }
                        }

                        void 0 == i && (i = "normal");
                        var l = e.data(t, "layout").epanels, c = l[n], u = c.epanel("options");
                        if (0 != u.onBeforeCollapse.call(c)) {
                            var f = "expand" + n.substring(0, 1).toUpperCase() + n.substring(1);
                            l[f] || (l[f] = function (i) {
                                var o;
                                "east" == i ? o = "layout-button-left" : "west" == i ? o = "layout-button-right" : "north" == i ? o = "layout-button-down" : "south" == i && (o = "layout-button-up");
                                var r = e("<div></div>").appendTo(t);
                                return r.epanel(e.extend({}, e.fn.layout.epaneldefaults, {
                                    cls: "layout-expand layout-expand-" + i,
                                    title: "&nbsp;",
                                    closed: !0,
                                    minWidth: 0,
                                    minHeight: 0,
                                    doSize: !1,
                                    tools: [{
                                        iconCls: o, handler: function () {
                                            return a(t, n), !1
                                        }
                                    }]
                                })), r.epanel("epanel").hover(function () {
                                    e(this).addClass("layout-expand-over")
                                }, function () {
                                    e(this).removeClass("layout-expand-over")
                                }), r
                            }(n), l[f].epanel("epanel").bind("click", function () {
                                c.epanel("expand", !1).epanel("open");
                                var i = o();
                                return c.epanel("resize", i.collapse), c.epanel("epanel").animate(i.expand, function () {
                                    e(this).unbind(".layout").bind("mouseleave.layout", {region: n}, function (n) {
                                        1 != d && (e("body>div.combo-p>div.combo-epanel:visible").length || r(t, n.data.region))
                                    })
                                }), !1
                            }));
                            var p = o();
                            s(l[f]) || l.center.epanel("resize", p.resizeC), c.epanel("epanel").animate(p.collapse, i, function () {
                                c.epanel("collapse", !1).epanel("close"), l[f].epanel("open").epanel("resize", p.expandP), e(this).unbind(".layout")
                            })
                        }
                    }

                    function a(n, i) {
                        var o = e.data(n, "layout").epanels, r = o[i];
                        if (0 != r.epanel("options").onBeforeExpand.call(r)) {
                            var a = "expand" + i.substring(0, 1).toUpperCase() + i.substring(1);
                            if (o[a]) {
                                o[a].epanel("close"), r.epanel("epanel").stop(!0, !0), r.epanel("expand", !1).epanel("open");
                                var s = function () {
                                    var t = e(n), a = o.center.epanel("options");
                                    return "east" == i && o.expandEast ? {
                                        collapse: {
                                            left: t.width(),
                                            top: a.top,
                                            height: a.height
                                        }, expand: {left: t.width() - r.epanel("epanel")._outerWidth()}
                                    } : "west" == i && o.expandWest ? {
                                        collapse: {
                                            left: -r.epanel("epanel")._outerWidth(),
                                            top: a.top,
                                            height: a.height
                                        }, expand: {left: 0}
                                    } : "north" == i && o.expandNorth ? {
                                        collapse: {
                                            top: -r.epanel("epanel")._outerHeight(),
                                            width: t.width()
                                        }, expand: {top: 0}
                                    } : "south" == i && o.expandSouth ? {
                                        collapse: {top: t.height(), width: t.width()},
                                        expand: {top: t.height() - r.epanel("epanel")._outerHeight()}
                                    } : void 0
                                }();
                                r.epanel("resize", s.collapse), r.epanel("epanel").animate(s.expand, function () {
                                    t(n)
                                })
                            }
                        }
                    }

                    function s(e) {
                        return !!e && (!!e.length && e.epanel("epanel").is(":visible"))
                    }

                    function l(t) {
                        function n(e) {
                            var n = i[e];
                            n.length && n.epanel("options").collapsed && r(t, e, 0)
                        }

                        var i = e.data(t, "layout").epanels;
                        n("east"), n("west"), n("north"), n("south")
                    }

                    function c(n, i, o) {
                        var r = e(n).layout("epanel", i);
                        r.epanel("options").split = o;
                        var a = "layout-split-" + i, s = r.epanel("epanel").removeClass(a);
                        o && s.addClass(a), s._resizable({disabled: !o}), t(n)
                    }

                    var d = !1;
                    e.fn.layout = function (i, o) {
                        return "string" == typeof i ? e.fn.layout.methods[i](this, o) : (i = i || {}, this.each(function () {
                            var o = e.data(this, "layout");
                            if (o) e.extend(o.options, i); else {
                                var r = e.extend({}, e.fn.layout.defaults, e.fn.layout.parseOptions(this), i);
                                e.data(this, "layout", {
                                    options: r,
                                    epanels: {center: e(), north: e(), south: e(), east: e(), west: e()}
                                }), n(this)
                            }
                            t(this), l(this)
                        }))
                    }, e.fn.layout.methods = {
                        options: function (t) {
                            return e.data(t[0], "layout").options
                        }, resize: function (e, n) {
                            return e.each(function () {
                                t(this, n)
                            })
                        }, epanel: function (t, n) {
                            return e.data(t[0], "layout").epanels[n]
                        }, collapse: function (e, t) {
                            return e.each(function () {
                                r(this, t)
                            })
                        }, expand: function (e, t) {
                            return e.each(function () {
                                a(this, t)
                            })
                        }, add: function (n, o) {
                            return n.each(function () {
                                i(this, o), t(this), e(this).layout("epanel", o.region).epanel("options").collapsed && r(this, o.region, 0)
                            })
                        }, remove: function (e, n) {
                            return e.each(function () {
                                o(this, n), t(this)
                            })
                        }, split: function (e, t) {
                            return e.each(function () {
                                c(this, t, !0)
                            })
                        }, unsplit: function (e, t) {
                            return e.each(function () {
                                c(this, t, !1)
                            })
                        }
                    }, e.fn.layout.parseOptions = function (t) {
                        return e.extend({}, e.parser.parseOptions(t, [{fit: "boolean"}]))
                    }, e.fn.layout.defaults = {fit: !1}, e.fn.layout.parseepanelOptions = function (t) {
                        e(t);
                        return e.extend({}, e.fn.epanel.parseOptions(t), e.parser.parseOptions(t, ["region", {
                            split: "boolean",
                            collpasedSize: "number",
                            minWidth: "number",
                            minHeight: "number",
                            maxWidth: "number",
                            maxHeight: "number"
                        }]))
                    }, e.fn.layout.epaneldefaults = e.extend({}, e.fn.epanel.defaults, {
                        region: null,
                        split: !1,
                        collapsedSize: 28,
                        minWidth: 10,
                        minHeight: 10,
                        maxWidth: 1e4,
                        maxHeight: 1e4
                    })
                }(jQuery), function ($) {
                    function init(e) {
                        function t(e) {
                            var n = [];
                            return e.addClass("menu"), n.push(e), e.hasClass("menu-content") || e.children("div").each(function () {
                                var e = $(this).children("div");
                                if (e.length) {
                                    e.appendTo("body"), this.submenu = e;
                                    var i = t(e);
                                    n = n.concat(i)
                                }
                            }), n
                        }

                        var n = $.data(e, "menu").options;
                        $(e).addClass("menu-top"), n.inline ? $(e).addClass("menu-inline") : $(e).appendTo("body"), $(e).bind("_resize", function (t, n) {
                            return ($(this).hasClass("eui-fluid") || n) && $(e).menu("resize", e), !1
                        });
                        for (var i = t($(e)), o = 0; o < i.length; o++)!function (t) {
                            var n = $.parser.parseOptions(t[0], ["width", "height"]);
                            t[0].originalHeight = n.height || 0, t.hasClass("menu-content") ? t[0].originalWidth = n.width || t._outerWidth() : (t[0].originalWidth = n.width || 0, t.children("div").each(function () {
                                var t = $(this),
                                    n = $.extend({}, $.parser.parseOptions(this, ["name", "iconCls", "href", {separator: "boolean"}]), {disabled: !!t.attr("disabled") || void 0});
                                if (n.separator && t.addClass("menu-sep"), !t.hasClass("menu-sep")) {
                                    t[0].itemName = n.name || "", t[0].itemHref = n.href || "";
                                    var i = t.addClass("menu-item").html();
                                    t.empty().append($('<div class="menu-text"></div>').html(i)), n.iconCls && $('<div class="menu-icon"></div>').addClass(n.iconCls).appendTo(t), n.disabled && _3e6(e, t[0], !0), t[0].submenu && $('<div class="menu-rightarrow"></div>').appendTo(t), _3e7(e, t)
                                }
                            }), $('<div class="menu-line"></div>').prependTo(t)), _3e8(e, t), t.hasClass("menu-inline") || t.hide(), _3e9(e, t)
                        }(i[o])
                    }

                    function _3e8(e, t) {
                        var n = $.data(e, "menu").options, i = t.attr("style") || "";
                        t.css({
                            display: "block",
                            left: -1e4,
                            height: "auto",
                            overflow: "hidden"
                        }), t.find(".menu-item").each(function () {
                            $(this)._outerHeight(n.itemHeight), $(this).find(".menu-text").css({
                                height: n.itemHeight - 2 + "px",
                                lineHeight: n.itemHeight - 2 + "px"
                            })
                        }), t.removeClass("menu-noline").addClass(n.noline ? "menu-noline" : "");
                        var o = t[0].originalWidth || "auto";
                        isNaN(parseInt(o)) && (o = 0, t.find("div.menu-text").each(function () {
                            o < $(this)._outerWidth() && (o = $(this)._outerWidth())
                        }), o += 40);
                        var r = t.outerHeight(), a = t[0].originalHeight || "auto";
                        if (isNaN(parseInt(a)))if (a = r, t.hasClass("menu-top") && n.alignTo) {
                            var s = $(n.alignTo), l = s.offset().top - $(document).scrollTop(),
                                c = $(window)._outerHeight() + $(document).scrollTop() - s.offset().top - s._outerHeight();
                            a = Math.min(a, Math.max(l, c))
                        } else a > $(window)._outerHeight() && (a = $(window).height());
                        t.attr("style", i), t._size({
                            fit: t[0] == e && n.fit,
                            width: o,
                            minWidth: n.minWidth,
                            height: a
                        }), t.css("overflow", t.outerHeight() < r ? "auto" : "hidden"), t.children("div.menu-line")._outerHeight(r - 2)
                    }

                    function _3e9(e, t) {
                        if (!t.hasClass("menu-inline")) {
                            var n = $.data(e, "menu");
                            t.unbind(".menu").bind("mouseenter.menu", function () {
                                n.timer && (clearTimeout(n.timer), n.timer = null)
                            }).bind("mouseleave.menu", function () {
                                n.options.hideOnUnhover && (n.timer = setTimeout(function () {
                                    _3f1(e, $(e).hasClass("menu-inline"))
                                }, n.options.duration))
                            })
                        }
                    }

                    function _3e7(e, t) {
                        t.hasClass("menu-item") && (t.unbind(".menu"), t.bind("click.menu", function () {
                            if (!$(this).hasClass("menu-item-disabled")) {
                                if (!this.submenu) {
                                    _3f1(e, $(e).hasClass("menu-inline"));
                                    var t = this.itemHref;
                                    t && (location.href = t)
                                }
                                $(this).trigger("mouseenter");
                                var n = $(e).menu("getItem", this);
                                $.data(e, "menu").options.onClick.call(e, n)
                            }
                        }).bind("mouseenter.menu", function (n) {
                            if (t.siblings().each(function () {
                                    this.submenu && _3dd(this.submenu), $(this).removeClass("menu-active")
                                }), t.addClass("menu-active"), $(this).hasClass("menu-item-disabled"))return void t.addClass("menu-active-disabled");
                            var i = t[0].submenu;
                            i && $(e).menu("show", {menu: i, parent: t})
                        }).bind("mouseleave.menu", function (e) {
                            t.removeClass("menu-active menu-active-disabled");
                            var n = t[0].submenu;
                            n ? e.pageX >= parseInt(n.css("left")) ? t.addClass("menu-active") : _3dd(n) : t.removeClass("menu-active")
                        }))
                    }

                    function _3f1(e, t) {
                        var n = $.data(e, "menu");
                        return n && $(e).is(":visible") && (_3dd($(e)), t ? $(e).show() : n.options.onHide.call(e)), !1
                    }

                    function _3f8(e, t) {
                        function n(e, t) {
                            return e + r.outerHeight() > $(window)._outerHeight() + $(document).scrollTop() && (e = t ? $(t).offset().top - r._outerHeight() : $(window)._outerHeight() + $(document).scrollTop() - r.outerHeight()), e < 0 && (e = 0), e
                        }

                        var i, o;
                        t = t || {};
                        var r = $(t.menu || e);
                        if ($(e).menu("resize", r[0]), r.hasClass("menu-top")) {
                            var a = $.data(e, "menu").options;
                            if ($.extend(a, t), i = a.left, o = a.top, a.alignTo) {
                                var s = $(a.alignTo);
                                i = s.offset().left, o = s.offset().top + s._outerHeight(), "right" == a.align && (i += s.outerWidth() - r.outerWidth())
                            }
                            i + r.outerWidth() > $(window)._outerWidth() + $(document)._scrollLeft() && (i = $(window)._outerWidth() + $(document).scrollLeft() - r.outerWidth() - 5), i < 0 && (i = 0), o = n(o, a.alignTo)
                        } else {
                            var l = t.parent;
                            i = l.offset().left + l.outerWidth() - 2, i + r.outerWidth() + 5 > $(window)._outerWidth() + $(document).scrollLeft() && (i = l.offset().left - r.outerWidth() + 2), o = n(l.offset().top - 3)
                        }
                        r.css({left: i, top: o}), r.show(0, function () {
                            r[0].shadow || (r[0].shadow = $('<div class="menu-shadow"></div>').insertAfter(r)), r[0].shadow.css({
                                display: r.hasClass("menu-inline") ? "none" : "block",
                                zIndex: $.fn.menu.defaults.zIndex++,
                                left: r.css("left"),
                                top: r.css("top"),
                                width: r.outerWidth(),
                                height: r.outerHeight()
                            }), r.css("z-index", $.fn.menu.defaults.zIndex++), r.hasClass("menu-top") && $.data(r[0], "menu").options.onShow.call(r[0])
                        })
                    }

                    function _3dd(e) {
                        e && e.length && (!function (e) {
                            e.stop(!0, !0), e[0].shadow && e[0].shadow.hide(), e.hide()
                        }(e), e.find("div.menu-item").each(function () {
                            this.submenu && _3dd(this.submenu), $(this).removeClass("menu-active")
                        }))
                    }

                    function _3ff(e, t) {
                        function n(r) {
                            r.children("div.menu-item").each(function () {
                                var r = $(e).menu("getItem", this), a = o.empty().html(r.text).text();
                                t == $.trim(a) ? i = r : this.submenu && !i && n(this.submenu)
                            })
                        }

                        var i = null, o = $("<div></div>");
                        return n($(e)), o.remove(), i
                    }

                    function _3e6(e, t, n) {
                        var i = $(t);
                        i.hasClass("menu-item") && (n ? (i.addClass("menu-item-disabled"), t.onclick && (t.onclick1 = t.onclick, t.onclick = null)) : (i.removeClass("menu-item-disabled"), t.onclick1 && (t.onclick = t.onclick1, t.onclick1 = null)))
                    }

                    function _405(_406, _407) {
                        var opts = $.data(_406, "menu").options, menu = $(_406);
                        if (_407.parent) {
                            if (!_407.parent.submenu) {
                                var _408 = $('<div class="menu"><div class="menu-line"></div></div>').appendTo("body");
                                _408.hide(), _407.parent.submenu = _408, $('<div class="menu-rightarrow"></div>').appendTo(_407.parent)
                            }
                            menu = _407.parent.submenu
                        }
                        if (_407.separator)var item = $('<div class="menu-sep"></div>').appendTo(menu); else {
                            var item = $('<div class="menu-item"></div>').appendTo(menu);
                            $('<div class="menu-text"></div>').html(_407.text).appendTo(item)
                        }
                        _407.iconCls && $('<div class="menu-icon"></div>').addClass(_407.iconCls).appendTo(item), _407.id && item.attr("id", _407.id), _407.name && (item[0].itemName = _407.name), _407.href && (item[0].itemHref = _407.href), _407.onclick && ("string" == typeof _407.onclick ? item.attr("onclick", _407.onclick) : item[0].onclick = eval(_407.onclick)), _407.handler && (item[0].onclick = eval(_407.handler)), _407.disabled && _3e6(_406, item[0], !0), _3e7(_406, item), _3e9(_406, menu), _3e8(_406, menu)
                    }

                    function _409(e, t) {
                        function n(e) {
                            if (e.submenu) {
                                e.submenu.children("div.menu-item").each(function () {
                                    n(this)
                                });
                                var t = e.submenu[0].shadow;
                                t && t.remove(), e.submenu.remove()
                            }
                            $(e).remove()
                        }

                        var i = $(t).parent();
                        n(t), _3e8(e, i)
                    }

                    function _40e(e, t, n) {
                        var i = $(t).parent();
                        n ? $(t).show() : $(t).hide(), _3e8(e, i)
                    }

                    function _412(e) {
                        $(e).children("div.menu-item").each(function () {
                            _409(e, this)
                        }), e.shadow && e.shadow.remove(), $(e).remove()
                    }

                    $(function () {
                        $(document).unbind(".menu").bind("mousedown.menu", function (e) {
                            $(e.target).closest("div.menu,div.combo-p").length || ($("body>div.menu-top:visible").not(".menu-inline").menu("hide"), _3dd($("body>div.menu:visible").not(".menu-inline")))
                        })
                    }), $.fn.menu = function (e, t) {
                        return "string" == typeof e ? $.fn.menu.methods[e](this, t) : (e = e || {}, this.each(function () {
                            var t = $.data(this, "menu");
                            t ? $.extend(t.options, e) : (t = $.data(this, "menu", {options: $.extend({}, $.fn.menu.defaults, $.fn.menu.parseOptions(this), e)}), init(this)), $(this).css({
                                left: t.options.left,
                                top: t.options.top
                            })
                        }))
                    }, $.fn.menu.methods = {
                        options: function (e) {
                            return $.data(e[0], "menu").options
                        }, show: function (e, t) {
                            return e.each(function () {
                                _3f8(this, t)
                            })
                        }, hide: function (e) {
                            return e.each(function () {
                                _3f1(this)
                            })
                        }, destroy: function (e) {
                            return e.each(function () {
                                _412(this)
                            })
                        }, setText: function (e, t) {
                            return e.each(function () {
                                $(t.target).children("div.menu-text").html(t.text)
                            })
                        }, setIcon: function (e, t) {
                            return e.each(function () {
                                $(t.target).children("div.menu-icon").remove(), t.iconCls && $('<div class="menu-icon"></div>').addClass(t.iconCls).appendTo(t.target)
                            })
                        }, getItem: function (e, t) {
                            var n = $(t), i = {
                                target: t,
                                id: n.attr("id"),
                                text: $.trim(n.children("div.menu-text").html()),
                                disabled: n.hasClass("menu-item-disabled"),
                                name: t.itemName,
                                href: t.itemHref,
                                onclick: t.onclick
                            }, o = n.children("div.menu-icon");
                            if (o.length) {
                                for (var r = [], a = o.attr("class").split(" "), s = 0; s < a.length; s++)"menu-icon" != a[s] && r.push(a[s]);
                                i.iconCls = r.join(" ")
                            }
                            return i
                        }, findItem: function (e, t) {
                            return _3ff(e[0], t)
                        }, appendItem: function (e, t) {
                            return e.each(function () {
                                _405(this, t)
                            })
                        }, removeItem: function (e, t) {
                            return e.each(function () {
                                _409(this, t)
                            })
                        }, enableItem: function (e, t) {
                            return e.each(function () {
                                _3e6(this, t, !1)
                            })
                        }, disableItem: function (e, t) {
                            return e.each(function () {
                                _3e6(this, t, !0)
                            })
                        }, showItem: function (e, t) {
                            return e.each(function () {
                                _40e(this, t, !0)
                            })
                        }, hideItem: function (e, t) {
                            return e.each(function () {
                                _40e(this, t, !1)
                            })
                        }, resize: function (e, t) {
                            return e.each(function () {
                                _3e8(this, $(t))
                            })
                        }
                    }, $.fn.menu.parseOptions = function (e) {
                        return $.extend({}, $.parser.parseOptions(e, [{
                            minWidth: "number",
                            itemHeight: "number",
                            duration: "number",
                            hideOnUnhover: "boolean"
                        }, {fit: "boolean", inline: "boolean", noline: "boolean"}]))
                    }, $.fn.menu.defaults = {
                        zIndex: 11e4,
                        left: 0,
                        top: 0,
                        alignTo: null,
                        align: "left",
                        minWidth: 120,
                        itemHeight: 22,
                        duration: 100,
                        hideOnUnhover: !0,
                        inline: !1,
                        fit: !1,
                        noline: !1,
                        onShow: function () {
                        },
                        onHide: function () {
                        },
                        onClick: function (e) {
                        }
                    }
                }(jQuery), function (e) {
                    function t(t) {
                        var n = e.data(t, "menubutton").options, i = e(t);
                        if (i.linkbutton(n), n.hasDownArrow) {
                            i.removeClass(n.cls.btn1 + " " + n.cls.btn2).addClass("m-btn"), i.removeClass("m-btn-small m-btn-medium m-btn-large").addClass("m-btn-" + n.size);
                            var o = i.find(".l-btn-left");
                            e("<span></span>").addClass(n.cls.arrow).appendTo(o), e("<span></span>").addClass("m-btn-line").appendTo(o)
                        }
                        if (e(t).menubutton("resize"), n.menu) {
                            e(n.menu).menu({duration: n.duration});
                            var r = e(n.menu).menu("options"), a = r.onShow, s = r.onHide;
                            e.extend(r, {
                                onShow: function () {
                                    var t = e(this).menu("options"), n = e(t.alignTo), i = n.menubutton("options");
                                    n.addClass(1 == i.plain ? i.cls.btn2 : i.cls.btn1), a.call(this)
                                }, onHide: function () {
                                    var t = e(this).menu("options"), n = e(t.alignTo), i = n.menubutton("options");
                                    n.removeClass(1 == i.plain ? i.cls.btn2 : i.cls.btn1), s.call(this)
                                }
                            })
                        }
                    }

                    function n(t) {
                        function n() {
                            return e(t).linkbutton("options").disabled
                        }

                        var o = e.data(t, "menubutton").options, r = e(t), a = r.find("." + o.cls.trigger);
                        a.length || (a = r), a.unbind(".menubutton");
                        var s = null;
                        a.bind("click.menubutton", function () {
                            if (!n())return i(t), !1
                        }).bind("mouseenter.menubutton", function () {
                            if (!n())return s = setTimeout(function () {
                                i(t)
                            }, o.duration), !1
                        }).bind("mouseleave.menubutton", function () {
                            s && clearTimeout(s), e(o.menu).triggerHandler("mouseleave")
                        })
                    }

                    function i(t) {
                        var n = e(t).menubutton("options");
                        if (!n.disabled && n.menu) {
                            e("body>div.menu-top").menu("hide");
                            var i = e(t), o = e(n.menu);
                            o.length && (o.menu("options").alignTo = i, o.menu("show", {
                                alignTo: i,
                                align: n.menuAlign
                            })), i.blur()
                        }
                    }

                    e.fn.menubutton = function (i, o) {
                        if ("string" == typeof i) {
                            var r = e.fn.menubutton.methods[i];
                            return r ? r(this, o) : this.linkbutton(i, o)
                        }
                        return i = i || {}, this.each(function () {
                            var o = e.data(this, "menubutton");
                            o ? e.extend(o.options, i) : (e.data(this, "menubutton", {options: e.extend({}, e.fn.menubutton.defaults, e.fn.menubutton.parseOptions(this), i)}), e(this).removeAttr("disabled")), t(this), n(this)
                        })
                    }, e.fn.menubutton.methods = {
                        options: function (t) {
                            var n = t.linkbutton("options");
                            return e.extend(e.data(t[0], "menubutton").options, {
                                toggle: n.toggle,
                                selected: n.selected,
                                disabled: n.disabled
                            })
                        }, destroy: function (t) {
                            return t.each(function () {
                                var t = e(this).menubutton("options");
                                t.menu && e(t.menu).menu("destroy"), e(this).remove()
                            })
                        }
                    }, e.fn.menubutton.parseOptions = function (t) {
                        e(t);
                        return e.extend({}, e.fn.linkbutton.parseOptions(t), e.parser.parseOptions(t, ["menu", {
                            plain: "boolean",
                            hasDownArrow: "boolean",
                            duration: "number"
                        }]))
                    }, e.fn.menubutton.defaults = e.extend({}, e.fn.linkbutton.defaults, {
                        plain: !0,
                        hasDownArrow: !0,
                        menu: null,
                        menuAlign: "left",
                        duration: 100,
                        cls: {
                            btn1: "m-btn-active",
                            btn2: "m-btn-plain-active",
                            arrow: "m-btn-downarrow",
                            trigger: "m-btn"
                        }
                    })
                }(jQuery), function (e) {
                    function t(t) {
                        var n = e.data(t, "splitbutton").options;
                        e(t).menubutton(n), e(t).addClass("s-btn")
                    }

                    e.fn.splitbutton = function (n, i) {
                        if ("string" == typeof n) {
                            var o = e.fn.splitbutton.methods[n];
                            return o ? o(this, i) : this.menubutton(n, i)
                        }
                        return n = n || {}, this.each(function () {
                            var i = e.data(this, "splitbutton");
                            i ? e.extend(i.options, n) : (e.data(this, "splitbutton", {options: e.extend({}, e.fn.splitbutton.defaults, e.fn.splitbutton.parseOptions(this), n)}), e(this).removeAttr("disabled")), t(this)
                        })
                    }, e.fn.splitbutton.methods = {
                        options: function (t) {
                            var n = t.menubutton("options"), i = e.data(t[0], "splitbutton").options;
                            return e.extend(i, {disabled: n.disabled, toggle: n.toggle, selected: n.selected}), i
                        }
                    }, e.fn.splitbutton.parseOptions = function (t) {
                        e(t);
                        return e.extend({}, e.fn.linkbutton.parseOptions(t), e.parser.parseOptions(t, ["menu", {
                            plain: "boolean",
                            duration: "number"
                        }]))
                    }, e.fn.splitbutton.defaults = e.extend({}, e.fn.linkbutton.defaults, {
                        plain: !0,
                        menu: null,
                        duration: 100,
                        cls: {
                            btn1: "m-btn-active s-btn-active",
                            btn2: "m-btn-plain-active s-btn-plain-active",
                            arrow: "m-btn-downarrow",
                            trigger: "m-btn-line"
                        }
                    })
                }(jQuery), function ($) {
                    function init(e) {
                        $(e).addClass("validatebox-text")
                    }

                    function _43e(e) {
                        var t = $.data(e, "validatebox");
                        t.validating = !1, t.timer && clearTimeout(t.timer), $(e).etooltip("destroy"), $(e).unbind(), $(e).remove()
                    }

                    function _441(e) {
                        var t = $.data(e, "validatebox").options, n = $(e);
                        if (n.unbind(".validatebox"), !t.novalidate && !n.is(":disabled"))for (var i in t.events)$(e).bind(i + ".validatebox", {target: e}, t.events[i])
                    }

                    function _444(e) {
                        var t = e.data.target, n = $.data(t, "validatebox"), i = $(t);
                        $(t).attr("readonly") || (n.validating = !0, n.value = void 0, function () {
                            n.validating && (n.value != i.val() ? (n.value = i.val(), n.timer && clearTimeout(n.timer), n.timer = setTimeout(function () {
                                $(t).validatebox("validate")
                            }, n.options.delay)) : _447(t), setTimeout(arguments.callee, 200))
                        }())
                    }

                    function _448(e) {
                        var t = e.data.target, n = $.data(t, "validatebox");
                        n.timer && (clearTimeout(n.timer), n.timer = void 0), n.validating = !1, _44b(t)
                    }

                    function _44c(e) {
                        var t = e.data.target;
                        $(t).hasClass("validatebox-invalid") && _44e(t)
                    }

                    function _44f(e) {
                        var t = e.data.target;
                        $.data(t, "validatebox").validating || _44b(t)
                    }

                    function _44e(e) {
                        var t = $.data(e, "validatebox"), n = t.options;
                        $(e).etooltip($.extend({}, n.tipOptions, {
                            content: t.message,
                            position: n.tipPosition,
                            deltaX: n.deltaX
                        })).etooltip("show"), t.tip = !0
                    }

                    function _447(e) {
                        var t = $.data(e, "validatebox");
                        t && t.tip && $(e).etooltip("reposition")
                    }

                    function _44b(e) {
                        $.data(e, "validatebox").tip = !1, $(e).etooltip("hide")
                    }

                    function _458(_459) {
                        function _45d(e) {
                            _45a.message = e
                        }

                        function _45e(_45f, _460) {
                            var _461 = box.val(), _462 = /([a-zA-Z_]+)(.*)/.exec(_45f), rule = opts.rules[_462[1]];
                            if (rule && _461) {
                                var _463 = _460 || opts.validParams || eval(_462[2]);
                                if (!rule.validator.call(_459, _461, _463)) {
                                    box.addClass("validatebox-invalid");
                                    var _464 = rule.message;
                                    if (_463)for (var i = 0; i < _463.length; i++)_464 = _464.replace(new RegExp("\\{" + i + "\\}", "g"), _463[i]);
                                    return _45d(opts.invalidMessage || _464), _45a.validating && _44e(_459), !1
                                }
                            }
                            return !0
                        }

                        function _45c() {
                            if (box.removeClass("validatebox-invalid"), _44b(_459), opts.novalidate || box.is(":disabled"))return !0;
                            if (opts.required && ("" == box.val() && !box.attr("contenteditable") || box.attr("contenteditable") && "" == $.trim(box.html())))return box.addClass("validatebox-invalid"), _45d(opts.missingMessage), _45a.validating && _44e(_459), !1;
                            if (opts.validType)if ($.isArray(opts.validType)) {
                                for (var e = 0; e < opts.validType.length; e++)if (!_45e(opts.validType[e]))return !1
                            } else if ("string" == typeof opts.validType) {
                                if (!_45e(opts.validType))return !1
                            } else for (var t in opts.validType) {
                                var n = opts.validType[t];
                                if (!_45e(t, n))return !1
                            }
                            return !0
                        }

                        var _45a = $.data(_459, "validatebox"), opts = _45a.options, box = $(_459);
                        opts.onBeforeValidate.call(_459);
                        var _45b = _45c();
                        return opts.onValidate.call(_459, _45b), _45b
                    }

                    function _467(e, t) {
                        var n = $.data(e, "validatebox").options;
                        void 0 != t && (n.novalidate = t), n.novalidate && ($(e).removeClass("validatebox-invalid"), _44b(e)), _458(e), _441(e)
                    }

                    $.fn.validatebox = function (e, t) {
                        return "string" == typeof e ? $.fn.validatebox.methods[e](this, t) : (e = e || {}, this.each(function () {
                            var t = $.data(this, "validatebox");
                            t ? $.extend(t.options, e) : (init(this), $.data(this, "validatebox", {options: $.extend({}, $.fn.validatebox.defaults, $.fn.validatebox.parseOptions(this), e)})), _467(this), _458(this)
                        }))
                    }, $.fn.validatebox.methods = {
                        options: function (e) {
                            return $.data(e[0], "validatebox").options
                        }, destroy: function (e) {
                            return e.each(function () {
                                _43e(this)
                            })
                        }, validate: function (e) {
                            return e.each(function () {
                                _458(this)
                            })
                        }, isValid: function (e) {
                            return _458(e[0])
                        }, enableValidation: function (e) {
                            return e.each(function () {
                                _467(this, !1)
                            })
                        }, disableValidation: function (e) {
                            return e.each(function () {
                                _467(this, !0)
                            })
                        }
                    }, $.fn.validatebox.parseOptions = function (e) {
                        var t = $(e);
                        return $.extend({}, $.parser.parseOptions(e, ["validType", "missingMessage", "invalidMessage", "tipPosition", {
                            delay: "number",
                            deltaX: "number"
                        }]), {
                            required: !!t.attr("required") || void 0,
                            novalidate: void 0 != t.attr("novalidate") || void 0
                        })
                    }, $.fn.validatebox.defaults = {
                        required: !1,
                        validType: null,
                        validParams: null,
                        delay: 200,
                        missingMessage: "该项必须填写",
                        invalidMessage: null,
                        tipPosition: "right",
                        deltaX: 0,
                        novalidate: !1,
                        events: {
                            focus: _444, blur: _448, mouseenter: _44c, mouseleave: _44f, click: function (e) {
                                var t = $(e.data.target);
                                t.is(":focus") || t.trigger("focus")
                            }
                        },
                        tipOptions: {
                            showEvent: "none",
                            hideEvent: "none",
                            showDelay: 0,
                            hideDelay: 0,
                            zIndex: "",
                            onShow: function () {
                                $(this).etooltip("tip").css({
                                    color: "#000",
                                    borderColor: "#CC9933",
                                    backgroundColor: "#FFFFCC"
                                })
                            },
                            onHide: function () {
                                $(this).etooltip("destroy")
                            }
                        },
                        rules: {
                            chinese: {
                                validator: function (e) {
                                    return /^[\u0391-\uFFE5]+$/.test(e)
                                }, message: "请输入纯中文"
                            }, mobile: {
                                validator: function (e) {
                                    return /^1\d{10}$/.test(e)
                                }, message: "手机号码格式错误"
                            }, zipCode: {
                                validator: function (e) {
                                    return /^[0-9]\d{5}$/.test(e)
                                }, message: "邮编格式错误"
                            }, number: {
                                validator: function (e) {
                                    return /^[0-9]*$/.test(e)
                                }, message: "请输入纯数字"
                            }, email: {
                                validator: function (e) {
                                    return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(e)
                                }, message: "Email格式错误"
                            }, url: {
                                validator: function (e) {
                                    return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(e)
                                }, message: "网址格式错误"
                            }, length: {
                                validator: function (e, t) {
                                    var n = $.trim(e).length;
                                    return n >= t[0] && n <= t[1]
                                }, message: "请输入{0}个到{1}个字符"
                            }, remote: {
                                validator: function (e, t) {
                                    var n = {};
                                    return n[t[1]] = e, "true" == $.ajax({
                                        url: t[0],
                                        dataType: "json",
                                        data: n,
                                        async: !1,
                                        cache: !1,
                                        type: "post"
                                    }).responseText
                                }, message: "填写错误, 请更正"
                            }
                        },
                        onBeforeValidate: function () {
                        },
                        onValidate: function (e) {
                        }
                    }, $.extendValidateRules = function (e) {
                        return $.extend($.fn.validatebox.defaults.rules, e)
                    }
                }(jQuery), function (e) {
                    function t(t) {
                        e(t).addClass("textbox-f").hide();
                        var n = e('<span class="textbox"><input class="textbox-text" autocomplete="off"><input type="hidden" class="textbox-value"></span>').insertAfter(t),
                            i = e(t).attr("name");
                        return i && (n.find("input.textbox-value").attr("name", i), e(t).removeAttr("name").attr("textboxName", i)), n
                    }

                    function n(t) {
                        var n = e.data(t, "textbox"), i = n.options, o = n.textbox
                        ;o.find(".textbox-text").remove(), i.multiline ? e('<textarea class="textbox-text" autocomplete="off"></textarea>').prependTo(o) : e('<input type="' + i.type + '" class="textbox-text" autocomplete="off">').prependTo(o), o.find(".textbox-addon").remove();
                        var r = i.icons ? e.extend(!0, [], i.icons) : [];
                        if (i.iconCls && r.push({iconCls: i.iconCls, disabled: !0}), r.length) {
                            var a = e('<span class="textbox-addon"></span>').prependTo(o);
                            a.addClass("textbox-addon-" + i.iconAlign);
                            for (var c = 0; c < r.length; c++)a.append('<a href="javascript:void(0)" class="textbox-icon ' + r[c].iconCls + '" icon-index="' + c + '" tabindex="-1"></a>')
                        }
                        if (o.find(".textbox-button").remove(), i.buttonText || i.buttonIcon) {
                            e('<a href="javascript:void(0)" class="textbox-button"></a>').prependTo(o).addClass("textbox-button-" + i.buttonAlign).linkbutton({
                                text: i.buttonText,
                                iconCls: i.buttonIcon
                            })
                        }
                        s(t, i.disabled), l(t, i.readonly)
                    }

                    function i(t) {
                        var n = e.data(t, "textbox").textbox;
                        n.find(".textbox-text").validatebox("destroy"), n.remove(), e(t).remove()
                    }

                    function o(t, n) {
                        function i(e) {
                            return (r.iconAlign == e ? f._outerWidth() : 0) + (r.buttonAlign == e ? u._outerWidth() : 0)
                        }

                        var o = e.data(t, "textbox"), r = o.options, a = o.textbox, s = a.parent();
                        if (n && (r.width = n), isNaN(parseInt(r.width))) {
                            var l = e(t).clone();
                            l.css("visibility", "hidden"), l.insertAfter(t), r.width = l.outerWidth(), l.remove()
                        }
                        var c = a.is(":visible");
                        c || a.appendTo("body");
                        var d = a.find(".textbox-text"), u = a.find(".textbox-button"), f = a.find(".textbox-addon"),
                            p = f.find(".textbox-icon");
                        if (a._size(r, s), u.linkbutton("resize", {height: a.height()}), u.css({
                                left: "left" == r.buttonAlign ? 0 : "",
                                right: "right" == r.buttonAlign ? 0 : ""
                            }), f.css({
                                left: "left" == r.iconAlign ? "left" == r.buttonAlign ? u._outerWidth() : 0 : "",
                                right: "right" == r.iconAlign ? "right" == r.buttonAlign ? u._outerWidth() : 0 : ""
                            }), p.css({
                                width: r.iconWidth + "px",
                                height: a.height() + "px"
                            }), d.css({
                                paddingLeft: t.style.paddingLeft || "",
                                paddingRight: t.style.paddingRight || "",
                                marginLeft: i("left"),
                                marginRight: i("right")
                            }), r.multiline) d.css({
                            paddingTop: t.style.paddingTop || "",
                            paddingBottom: t.style.paddingBottom || ""
                        }), d._outerHeight(a.height()); else {
                            var h = Math.floor((a.height() - d.height()) / 2);
                            d.css({paddingTop: h + "px", paddingBottom: h + "px"})
                        }
                        d._outerWidth(a.width() - p.length * r.iconWidth - u._outerWidth()), c || a.insertAfter(t), r.onResize.call(t, r.width, r.height)
                    }

                    function r(t) {
                        var n = e(t).textbox("options");
                        e(t).textbox("textbox").validatebox(e.extend({}, n, {
                            deltaX: e(t).textbox("getTipX"),
                            onBeforeValidate: function () {
                                var t = e(this);
                                t.is(":focus") || (n.oldInputValue = t.val(), t.val(n.value))
                            },
                            onValidate: function (t) {
                                var i = e(this);
                                void 0 != n.oldInputValue && (i.val(n.oldInputValue), n.oldInputValue = void 0);
                                var o = i.parent();
                                t ? o.removeClass("textbox-invalid") : o.addClass("textbox-invalid")
                            }
                        }))
                    }

                    function a(t) {
                        var n = e.data(t, "textbox"), i = n.options, r = n.textbox, a = r.find(".textbox-text");
                        if (a.attr("placeholder", i.prompt), a.unbind(".textbox"), !i.disabled && !i.readonly) {
                            a.bind("blur.textbox", function (t) {
                                r.hasClass("textbox-focused") && (i.value = e(this).val(), "" == i.value ? e(this).val(i.prompt).addClass("textbox-prompt") : e(this).removeClass("textbox-prompt"), r.removeClass("textbox-focused"))
                            }).bind("focus.textbox", function (t) {
                                r.hasClass("textbox-focused") || (e(this).val() != i.value && e(this).val(i.value), e(this).removeClass("textbox-prompt"), r.addClass("textbox-focused"))
                            });
                            for (var s in i.inputEvents)a.bind(s + ".textbox", {target: t}, i.inputEvents[s])
                        }
                        var l = r.find(".textbox-addon");
                        l.unbind().bind("click", {target: t}, function (n) {
                            var o = e(n.target).closest("a.textbox-icon:not(.textbox-icon-disabled)");
                            if (o.length) {
                                var r = parseInt(o.attr("icon-index")), a = i.icons[r];
                                a && a.handler && (a.handler.call(o[0], n), i.onClickIcon.call(t, r))
                            }
                        }), l.find(".textbox-icon").each(function (t) {
                            var n = i.icons[t], o = e(this);
                            !n || n.disabled || i.disabled || i.readonly ? o.addClass("textbox-icon-disabled") : o.removeClass("textbox-icon-disabled")
                        });
                        var c = r.find(".textbox-button");
                        c.unbind(".textbox").bind("click.textbox", function () {
                            c.linkbutton("options").disabled || i.onClickButton.call(t)
                        }), c.linkbutton(i.disabled || i.readonly ? "disable" : "enable"), r.unbind(".textbox").bind("_resize.textbox", function (n, i) {
                            return (e(this).hasClass("eui-fluid") || i) && o(t), !1
                        })
                    }

                    function s(t, n) {
                        var i = e.data(t, "textbox"), o = i.options, r = i.textbox;
                        n ? (o.disabled = !0, e(t).attr("disabled", "disabled"), r.addClass("textbox-disabled"), r.find(".textbox-text,.textbox-value").attr("disabled", "disabled")) : (o.disabled = !1, r.removeClass("textbox-disabled"), e(t).removeAttr("disabled"), r.find(".textbox-text,.textbox-value").removeAttr("disabled"))
                    }

                    function l(t, n) {
                        var i = e.data(t, "textbox"), o = i.options;
                        o.readonly = void 0 == n || n, i.textbox.removeClass("textbox-readonly").addClass(o.readonly ? "textbox-readonly" : "");
                        var r = i.textbox.find(".textbox-text");
                        r.removeAttr("readonly"), !o.readonly && o.editable || r.attr("readonly", "readonly")
                    }

                    e.fn.textbox = function (i, s) {
                        if ("string" == typeof i) {
                            var l = e.fn.textbox.methods[i];
                            return l ? l(this, s) : this.each(function () {
                                e(this).textbox("textbox").validatebox(i, s)
                            })
                        }
                        return i = i || {}, this.each(function () {
                            var s = e.data(this, "textbox");
                            s ? (e.extend(s.options, i), void 0 != i.value && (s.options.originalValue = i.value)) : (s = e.data(this, "textbox", {
                                options: e.extend({}, e.fn.textbox.defaults, e.fn.textbox.parseOptions(this), i),
                                textbox: t(this)
                            }), s.options.originalValue = s.options.value), n(this), a(this), o(this), r(this), e(this).textbox("initValue", s.options.value)
                        })
                    }, e.fn.textbox.methods = {
                        options: function (t) {
                            return e.data(t[0], "textbox").options
                        }, cloneFrom: function (t, n) {
                            return t.each(function () {
                                var t = e(this);
                                if (!t.data("textbox")) {
                                    e(n).data("textbox") || e(n).textbox();
                                    var i = t.attr("name") || "";
                                    t.addClass("textbox-f").hide(), t.removeAttr("name").attr("textboxName", i);
                                    var o = e(n).next().clone().insertAfter(t);
                                    o.find("input.textbox-value").attr("name", i), e.data(this, "textbox", {
                                        options: e.extend(!0, {}, e(n).textbox("options")),
                                        textbox: o
                                    });
                                    var s = e(n).textbox("button");
                                    s.length && t.textbox("button").linkbutton(e.extend(!0, {}, s.linkbutton("options"))), a(this), r(this)
                                }
                            })
                        }, textbox: function (t) {
                            return e.data(t[0], "textbox").textbox.find(".textbox-text")
                        }, button: function (t) {
                            return e.data(t[0], "textbox").textbox.find(".textbox-button")
                        }, destroy: function (e) {
                            return e.each(function () {
                                i(this)
                            })
                        }, resize: function (e, t) {
                            return e.each(function () {
                                o(this, t)
                            })
                        }, disable: function (e) {
                            return e.each(function () {
                                s(this, !0), a(this)
                            })
                        }, enable: function (e) {
                            return e.each(function () {
                                s(this, !1), a(this)
                            })
                        }, readonly: function (e, t) {
                            return e.each(function () {
                                l(this, t), a(this)
                            })
                        }, isValid: function (e) {
                            return e.textbox("textbox").validatebox("isValid")
                        }, clear: function (t) {
                            return t.each(function () {
                                e(this).textbox("setValue", "")
                            })
                        }, setText: function (t, n) {
                            return t.each(function () {
                                var t = e(this).textbox("options"), i = e(this).textbox("textbox");
                                e(this).textbox("getText") != n && (t.value = n, i.val(n)), i.is(":focus") || (n ? i.removeClass("textbox-prompt") : i.val(t.prompt).addClass("textbox-prompt")), e(this).textbox("validate")
                            })
                        }, initValue: function (t, n) {
                            return t.each(function () {
                                var t = e.data(this, "textbox");
                                t.options.value = "", e(this).textbox("setText", n), t.textbox.find(".textbox-value").val(n), e(this).val(n)
                            })
                        }, setValue: function (t, n) {
                            return t.each(function () {
                                var t = e.data(this, "textbox").options, i = e(this).textbox("getValue");
                                e(this).textbox("initValue", n), i != n && (t.onChange.call(this, n, i), e(this).closest("form").trigger("_change", [this]))
                            })
                        }, getText: function (e) {
                            var t = e.textbox("textbox");
                            return t.is(":focus") ? t.val() : e.textbox("options").value
                        }, getValue: function (e) {
                            return e.data("textbox").textbox.find(".textbox-value").val()
                        }, reset: function (t) {
                            return t.each(function () {
                                var t = e(this).textbox("options");
                                e(this).textbox("setValue", t.originalValue)
                            })
                        }, getIcon: function (e, t) {
                            return e.data("textbox").textbox.find(".textbox-icon:eq(" + t + ")")
                        }, getTipX: function (e) {
                            var t = e.data("textbox"), n = t.options, i = t.textbox,
                                o = (i.find(".textbox-text"), i.find(".textbox-addon")._outerWidth()),
                                r = i.find(".textbox-button")._outerWidth();
                            return "right" == n.tipPosition ? ("right" == n.iconAlign ? o : 0) + ("right" == n.buttonAlign ? r : 0) + 1 : "left" == n.tipPosition ? ("left" == n.iconAlign ? -o : 0) + ("left" == n.buttonAlign ? -r : 0) - 1 : o / 2 * ("right" == n.iconAlign ? 1 : -1)
                        }
                    }, e.fn.textbox.parseOptions = function (t) {
                        var n = e(t);
                        return e.extend({}, e.fn.validatebox.parseOptions(t), e.parser.parseOptions(t, ["prompt", "iconCls", "iconAlign", "buttonText", "buttonIcon", "buttonAlign", {
                            multiline: "boolean",
                            editable: "boolean",
                            iconWidth: "number"
                        }]), {
                            value: n.val() || void 0,
                            type: n.attr("type") ? n.attr("type") : void 0,
                            disabled: !!n.attr("disabled") || void 0,
                            readonly: !!n.attr("readonly") || void 0
                        })
                    }, e.fn.textbox.defaults = e.extend({}, e.fn.validatebox.defaults, {
                        width: "auto",
                        height: 22,
                        prompt: "",
                        value: "",
                        type: "text",
                        multiline: !1,
                        editable: !0,
                        disabled: !1,
                        readonly: !1,
                        icons: [],
                        iconCls: null,
                        iconAlign: "right",
                        iconWidth: 18,
                        buttonText: "",
                        buttonIcon: null,
                        buttonAlign: "right",
                        inputEvents: {
                            blur: function (t) {
                                var n = e(t.data.target), i = n.textbox("options");
                                n.textbox("setValue", i.value)
                            }, keydown: function (t) {
                                if (13 == t.keyCode) {
                                    var n = e(t.data.target);
                                    n.textbox("setValue", n.textbox("getText"))
                                }
                            }
                        },
                        onChange: function (e, t) {
                        },
                        onResize: function (e, t) {
                        },
                        onClickButton: function () {
                        },
                        onClickIcon: function (e) {
                        }
                    })
                }(jQuery), function (e) {
                    function t(t) {
                        var i = e.data(t, "filebox"), o = i.options, r = "filebox_file_id_" + ++n;
                        e(t).addClass("filebox-f").textbox(o), e(t).textbox("textbox").attr("readonly", "readonly"), i.filebox = e(t).next().addClass("filebox"), i.filebox.find(".textbox-value").remove(), o.oldValue = "";
                        var a = e('<input type="file" class="textbox-value">').appendTo(i.filebox);
                        a.attr("id", r).attr("name", e(t).attr("textboxName") || ""), a.change(function () {
                            e(t).filebox("setText", this.value), o.onChange.call(t, this.value, o.oldValue), o.oldValue = this.value
                        });
                        var s = e(t).filebox("button");
                        s.length && (e('<label class="filebox-label" for="' + r + '"></label>').appendTo(s), s.linkbutton("options").disabled ? a.attr("disabled", "disabled") : a.removeAttr("disabled"))
                    }

                    var n = 0;
                    e.fn.filebox = function (n, i) {
                        if ("string" == typeof n) {
                            var o = e.fn.filebox.methods[n];
                            return o ? o(this, i) : this.textbox(n, i)
                        }
                        return n = n || {}, this.each(function () {
                            var i = e.data(this, "filebox");
                            i ? e.extend(i.options, n) : e.data(this, "filebox", {options: e.extend({}, e.fn.filebox.defaults, e.fn.filebox.parseOptions(this), n)}), t(this)
                        })
                    }, e.fn.filebox.methods = {
                        options: function (t) {
                            var n = t.textbox("options");
                            return e.extend(e.data(t[0], "filebox").options, {
                                width: n.width,
                                value: n.value,
                                originalValue: n.originalValue,
                                disabled: n.disabled,
                                readonly: n.readonly
                            })
                        }
                    }, e.fn.filebox.parseOptions = function (t) {
                        return e.extend({}, e.fn.textbox.parseOptions(t), {})
                    }, e.fn.filebox.defaults = e.extend({}, e.fn.textbox.defaults, {
                        buttonIcon: null,
                        buttonText: "Choose File",
                        buttonAlign: "right",
                        inputEvents: {}
                    })
                }(jQuery), function ($) {
                    function _4bf(e) {
                        function t(t) {
                            t && ($(e).textbox("button").menubutton({
                                text: t.text,
                                iconCls: t.iconCls || null,
                                menu: n.menu,
                                menuAlign: i.buttonAlign,
                                plain: !1
                            }), n.searchbox.find("input.textbox-value").attr("name", t.name || t.text), $(e).searchbox("resize"))
                        }

                        var n = $.data(e, "searchbox"), i = n.options, o = $.extend(!0, [], i.icons);
                        o.push({
                            iconCls: "searchbox-button", handler: function (e) {
                                var t = $(e.data.target);
                                t.searchbox("options").searcher.call(e.data.target, t.searchbox("getValue"), t.searchbox("getName"))
                            }
                        }), function () {
                            if (i.menu) {
                                n.menu = $(i.menu).menu();
                                var e = n.menu.menu("options"), o = e.onClick;
                                e.onClick = function (e) {
                                    t(e), o.call(this, e)
                                }
                            } else n.menu && n.menu.menu("destroy"), n.menu = null
                        }();
                        var r = function () {
                            if (n.menu) {
                                var e = n.menu.children("div.menu-item:first");
                                return n.menu.children("div.menu-item").each(function () {
                                    if ($.extend({}, $.parser.parseOptions(this), {selected: !!$(this).attr("selected") || void 0}).selected)return e = $(this), !1
                                }), n.menu.menu("getItem", e[0])
                            }
                            return null
                        }();
                        $(e).addClass("searchbox-f").textbox($.extend({}, i, {
                            icons: o,
                            buttonText: r ? r.text : ""
                        })), $(e).attr("searchboxName", $(e).attr("textboxName")), n.searchbox = $(e).next(), n.searchbox.addClass("searchbox"), t(r)
                    }

                    $.fn.searchbox = function (e, t) {
                        if ("string" == typeof e) {
                            var n = $.fn.searchbox.methods[e];
                            return n ? n(this, t) : this.textbox(e, t)
                        }
                        return e = e || {}, this.each(function () {
                            var t = $.data(this, "searchbox");
                            t ? $.extend(t.options, e) : $.data(this, "searchbox", {options: $.extend({}, $.fn.searchbox.defaults, $.fn.searchbox.parseOptions(this), e)}), _4bf(this)
                        })
                    }, $.fn.searchbox.methods = {
                        options: function (e) {
                            var t = e.textbox("options");
                            return $.extend($.data(e[0], "searchbox").options, {
                                width: t.width,
                                value: t.value,
                                originalValue: t.originalValue,
                                disabled: t.disabled,
                                readonly: t.readonly
                            })
                        }, menu: function (e) {
                            return $.data(e[0], "searchbox").menu
                        }, getName: function (e) {
                            return $.data(e[0], "searchbox").searchbox.find("input.textbox-value").attr("name")
                        }, selectName: function (e, t) {
                            return e.each(function () {
                                var e = $.data(this, "searchbox").menu;
                                e && e.children("div.menu-item").each(function () {
                                    if (e.menu("getItem", this).name == t)return $(this).triggerHandler("click"), !1
                                })
                            })
                        }, destroy: function (e) {
                            return e.each(function () {
                                var e = $(this).searchbox("menu");
                                e && e.menu("destroy"), $(this).textbox("destroy")
                            })
                        }
                    }, $.fn.searchbox.parseOptions = function (_4ce) {
                        var t = $(_4ce);
                        return $.extend({}, $.fn.textbox.parseOptions(_4ce), $.parser.parseOptions(_4ce, ["menu"]), {searcher: t.attr("searcher") ? eval(t.attr("searcher")) : void 0})
                    }, $.fn.searchbox.defaults = $.extend({}, $.fn.textbox.defaults, {
                        inputEvents: $.extend({}, $.fn.textbox.defaults.inputEvents, {
                            keydown: function (e) {
                                if (13 == e.keyCode) {
                                    e.preventDefault();
                                    var t = $(e.data.target), n = t.searchbox("options");
                                    return t.searchbox("setValue", $(this).val()), n.searcher.call(e.data.target, t.searchbox("getValue"), t.searchbox("getName")), !1
                                }
                            }
                        }), buttonAlign: "left", menu: null, searcher: function (e, t) {
                        }
                    })
                }(jQuery), function (e) {
                    function t(t) {
                        var n = e.data(t, "numberbox"), i = n.options;
                        e(t).addClass("numberbox-f").textbox(i), e(t).textbox("textbox").css({imeMode: "disabled"}), e(t).attr("numberboxName", e(t).attr("textboxName")), n.numberbox = e(t).next(), n.numberbox.addClass("numberbox");
                        var o = i.parser.call(t, i.value), r = i.formatter.call(t, o);
                        e(t).numberbox("initValue", o).numberbox("setText", r)
                    }

                    function n(t, n) {
                        var i = e.data(t, "numberbox"), o = i.options, n = o.parser.call(t, n),
                            r = o.formatter.call(t, n);
                        o.value = n, e(t).textbox("setText", r).textbox("setValue", n), r = o.formatter.call(t, e(t).textbox("getValue")), e(t).textbox("setText", r)
                    }

                    e.fn.numberbox = function (n, i) {
                        if ("string" == typeof n) {
                            var o = e.fn.numberbox.methods[n];
                            return o ? o(this, i) : this.textbox(n, i)
                        }
                        return n = n || {}, this.each(function () {
                            var i = e.data(this, "numberbox");
                            i ? e.extend(i.options, n) : i = e.data(this, "numberbox", {options: e.extend({}, e.fn.numberbox.defaults, e.fn.numberbox.parseOptions(this), n)}), t(this)
                        })
                    }, e.fn.numberbox.methods = {
                        options: function (t) {
                            var n = t.data("textbox") ? t.textbox("options") : {};
                            return e.extend(e.data(t[0], "numberbox").options, {
                                width: n.width,
                                originalValue: n.originalValue,
                                disabled: n.disabled,
                                readonly: n.readonly
                            })
                        }, fix: function (t) {
                            return t.each(function () {
                                e(this).numberbox("setValue", e(this).numberbox("getText"))
                            })
                        }, setValue: function (e, t) {
                            return e.each(function () {
                                n(this, t)
                            })
                        }, clear: function (t) {
                            return t.each(function () {
                                e(this).textbox("clear"), e(this).numberbox("options").value = ""
                            })
                        }, reset: function (t) {
                            return t.each(function () {
                                e(this).textbox("reset"), e(this).numberbox("setValue", e(this).numberbox("getValue"))
                            })
                        }
                    }, e.fn.numberbox.parseOptions = function (t) {
                        var n = e(t);
                        return e.extend({}, e.fn.textbox.parseOptions(t), e.parser.parseOptions(t, ["decimalSeparator", "groupSeparator", "suffix", {
                            min: "number",
                            max: "number",
                            precision: "number"
                        }]), {prefix: n.attr("prefix") ? n.attr("prefix") : void 0})
                    }, e.fn.numberbox.defaults = e.extend({}, e.fn.textbox.defaults, {
                        inputEvents: {
                            keypress: function (t) {
                                var n = t.data.target;
                                return e(n).numberbox("options").filter.call(n, t)
                            }, blur: function (t) {
                                var n = t.data.target;
                                e(n).numberbox("setValue", e(n).numberbox("getText"))
                            }, keydown: function (t) {
                                if (13 == t.keyCode) {
                                    var n = t.data.target;
                                    e(n).numberbox("setValue", e(n).numberbox("getText"))
                                }
                            }
                        },
                        min: null,
                        max: null,
                        precision: 0,
                        decimalSeparator: ".",
                        groupSeparator: "",
                        prefix: "",
                        suffix: "",
                        filter: function (t) {
                            var n = e(this).numberbox("options"), i = e(this).numberbox("getText");
                            if (13 == t.which)return !0;
                            if (45 == t.which)return -1 == i.indexOf("-");
                            var o = String.fromCharCode(t.which);
                            return o == n.decimalSeparator ? -1 == i.indexOf(o) : o == n.groupSeparator || (t.which >= 48 && t.which <= 57 && 0 == t.ctrlKey && 0 == t.shiftKey || 0 == t.which || 8 == t.which || 1 == t.ctrlKey && (99 == t.which || 118 == t.which))
                        },
                        formatter: function (t) {
                            if (!t)return t;
                            t += "";
                            var n = e(this).numberbox("options"), i = t, o = "", r = t.indexOf(".");
                            if (r >= 0 && (i = t.substring(0, r), o = t.substring(r + 1, t.length)), n.groupSeparator)for (var a = /(\d+)(\d{3})/; a.test(i);)i = i.replace(a, "$1" + n.groupSeparator + "$2");
                            return o ? n.prefix + i + n.decimalSeparator + o + n.suffix : n.prefix + i + n.suffix
                        },
                        parser: function (t) {
                            t += "";
                            var n = e(this).numberbox("options");
                            parseFloat(t) != t && (n.prefix && (t = e.trim(t.replace(new RegExp("\\" + e.trim(n.prefix), "g"), ""))), n.suffix && (t = e.trim(t.replace(new RegExp("\\" + e.trim(n.suffix), "g"), ""))), n.groupSeparator && (t = e.trim(t.replace(new RegExp("\\" + n.groupSeparator, "g"), ""))), n.decimalSeparator && (t = e.trim(t.replace(new RegExp("\\" + n.decimalSeparator, "g"), "."))), t = t.replace(/\s/g, ""));
                            var i = parseFloat(t).toFixed(n.precision);
                            return isNaN(i) ? i = "" : "number" == typeof n.min && i < n.min ? i = n.min.toFixed(n.precision) : "number" == typeof n.max && i > n.max && (i = n.max.toFixed(n.precision)), i
                        }
                    })
                }(jQuery), function (e) {
                    function t(t) {
                        var i = e.data(t, "spinner"), o = i.options, r = e.extend(!0, [], o.icons);
                        r.push({
                            iconCls: "spinner-arrow", handler: function (e) {
                                n(e)
                            }
                        }), e(t).addClass("spinner-f").textbox(e.extend({}, o, {icons: r}));
                        var a = e(t).textbox("getIcon", r.length - 1);
                        a.append('<a href="javascript:void(0)" class="spinner-arrow-up" tabindex="-1"></a>'), a.append('<a href="javascript:void(0)" class="spinner-arrow-down" tabindex="-1"></a>'), e(t).attr("spinnerName", e(t).attr("textboxName")), i.spinner = e(t).next(), i.spinner.addClass("spinner")
                    }

                    function n(t) {
                        var n = t.data.target, i = e(n).spinner("options");
                        e(t.target).closest("a.spinner-arrow-up").length && (i.spin.call(n, !1), i.onSpinUp.call(n), e(n).spinner("validate")), e(t.target).closest("a.spinner-arrow-down").length && (i.spin.call(n, !0), i.onSpinDown.call(n), e(n).spinner("validate"))
                    }

                    e.fn.spinner = function (n, i) {
                        if ("string" == typeof n) {
                            var o = e.fn.spinner.methods[n];
                            return o ? o(this, i) : this.textbox(n, i)
                        }
                        return n = n || {}, this.each(function () {
                            var i = e.data(this, "spinner");
                            i ? e.extend(i.options, n) : i = e.data(this, "spinner", {options: e.extend({}, e.fn.spinner.defaults, e.fn.spinner.parseOptions(this), n)}), t(this)
                        })
                    }, e.fn.spinner.methods = {
                        options: function (t) {
                            var n = t.textbox("options");
                            return e.extend(e.data(t[0], "spinner").options, {
                                width: n.width,
                                value: n.value,
                                originalValue: n.originalValue,
                                disabled: n.disabled,
                                readonly: n.readonly
                            })
                        }
                    }, e.fn.spinner.parseOptions = function (t) {
                        return e.extend({}, e.fn.textbox.parseOptions(t), e.parser.parseOptions(t, ["min", "max", {increment: "number"}]))
                    }, e.fn.spinner.defaults = e.extend({}, e.fn.textbox.defaults, {
                        min: null,
                        max: null,
                        increment: 1,
                        spin: function (e) {
                        },
                        onSpinUp: function () {
                        },
                        onSpinDown: function () {
                        }
                    })
                }(jQuery), function (e) {
                    function t(t) {
                        e(t).addClass("numberspinner-f");
                        var n = e.data(t, "numberspinner").options;
                        e(t).numberbox(n).spinner(n), e(t).numberbox("setValue", n.value)
                    }

                    function n(t, n) {
                        var i = e.data(t, "numberspinner").options,
                            o = parseFloat(e(t).numberbox("getValue") || i.value) || 0;
                        n ? o -= i.increment : o += i.increment, e(t).numberbox("setValue", o)
                    }

                    e.fn.numberspinner = function (n, i) {
                        if ("string" == typeof n) {
                            var o = e.fn.numberspinner.methods[n];
                            return o ? o(this, i) : this.numberbox(n, i)
                        }
                        return n = n || {}, this.each(function () {
                            var i = e.data(this, "numberspinner");
                            i ? e.extend(i.options, n) : e.data(this, "numberspinner", {options: e.extend({}, e.fn.numberspinner.defaults, e.fn.numberspinner.parseOptions(this), n)}), t(this)
                        })
                    }, e.fn.numberspinner.methods = {
                        options: function (t) {
                            var n = t.numberbox("options");
                            return e.extend(e.data(t[0], "numberspinner").options, {
                                width: n.width,
                                value: n.value,
                                originalValue: n.originalValue,
                                disabled: n.disabled,
                                readonly: n.readonly
                            })
                        }
                    }, e.fn.numberspinner.parseOptions = function (t) {
                        return e.extend({}, e.fn.spinner.parseOptions(t), e.fn.numberbox.parseOptions(t), {})
                    }, e.fn.numberspinner.defaults = e.extend({}, e.fn.spinner.defaults, e.fn.numberbox.defaults, {
                        spin: function (e) {
                            n(this, e)
                        }
                    })
                }(jQuery), function (e) {
                    function t(e) {
                        var t = 0;
                        if (e.selectionStart) t = e.selectionStart; else if (e.createTextRange) {
                            var n = e.createTextRange(), i = document.selection.createRange();
                            i.setEndPoint("StartToStart", n), t = i.text.length
                        }
                        return t
                    }

                    function n(e, t, n) {
                        if (e.selectionStart) e.setSelectionRange(t, n); else if (e.createTextRange) {
                            var i = e.createTextRange();
                            i.collapse(), i.moveEnd("character", n), i.moveStart("character", t), i.select()
                        }
                    }

                    function i(t) {
                        var n = e.data(t, "timespinner").options;
                        e(t).addClass("timespinner-f").spinner(n);
                        var i = n.formatter.call(t, n.parser.call(t, n.value));
                        e(t).timespinner("initValue", i)
                    }

                    function o(n) {
                        for (var i = n.data.target, o = e.data(i, "timespinner").options, a = t(this), s = 0; s < o.selections.length; s++) {
                            var l = o.selections[s];
                            if (a >= l[0] && a <= l[1])return void r(i, s)
                        }
                    }

                    function r(t, i) {
                        var o = e.data(t, "timespinner").options;
                        void 0 != i && (o.highlight = i);
                        var r = o.selections[o.highlight];
                        if (r) {
                            var a = e(t).timespinner("textbox");
                            n(a[0], r[0], r[1]), a.focus()
                        }
                    }

                    function a(t, n) {
                        var i = e.data(t, "timespinner").options, n = i.parser.call(t, n), o = i.formatter.call(t, n);
                        e(t).spinner("setValue", o)
                    }

                    function s(t, n) {
                        var i = e.data(t, "timespinner").options, o = e(t).timespinner("getValue"),
                            a = i.selections[i.highlight], s = o.substring(0, a[0]), l = o.substring(a[0], a[1]),
                            c = o.substring(a[1]), d = s + ((parseInt(l) || 0) + i.increment * (n ? -1 : 1)) + c;
                        e(t).timespinner("setValue", d), r(t)
                    }

                    e.fn.timespinner = function (t, n) {
                        if ("string" == typeof t) {
                            var o = e.fn.timespinner.methods[t];
                            return o ? o(this, n) : this.spinner(t, n)
                        }
                        return t = t || {}, this.each(function () {
                            var n = e.data(this, "timespinner");
                            n ? e.extend(n.options, t) : e.data(this, "timespinner", {options: e.extend({}, e.fn.timespinner.defaults, e.fn.timespinner.parseOptions(this), t)}), i(this)
                        })
                    }, e.fn.timespinner.methods = {
                        options: function (t) {
                            var n = t.data("spinner") ? t.spinner("options") : {};
                            return e.extend(e.data(t[0], "timespinner").options, {
                                width: n.width,
                                value: n.value,
                                originalValue: n.originalValue,
                                disabled: n.disabled,
                                readonly: n.readonly
                            })
                        }, setValue: function (e, t) {
                            return e.each(function () {
                                a(this, t)
                            })
                        }, getHours: function (t) {
                            var n = e.data(t[0], "timespinner").options,
                                i = t.timespinner("getValue").split(n.separator);
                            return parseInt(i[0], 10)
                        }, getMinutes: function (t) {
                            var n = e.data(t[0], "timespinner").options,
                                i = t.timespinner("getValue").split(n.separator);
                            return parseInt(i[1], 10)
                        }, getSeconds: function (t) {
                            var n = e.data(t[0], "timespinner").options,
                                i = t.timespinner("getValue").split(n.separator);
                            return parseInt(i[2], 10) || 0
                        }
                    }, e.fn.timespinner.parseOptions = function (t) {
                        return e.extend({}, e.fn.spinner.parseOptions(t), e.parser.parseOptions(t, ["separator", {
                            showSeconds: "boolean",
                            highlight: "number"
                        }]))
                    }, e.fn.timespinner.defaults = e.extend({}, e.fn.spinner.defaults, {
                        inputEvents: e.extend({}, e.fn.spinner.defaults.inputEvents, {
                            click: function (e) {
                                o.call(this, e)
                            }, blur: function (t) {
                                var n = e(t.data.target);
                                n.timespinner("setValue", n.timespinner("getText"))
                            }, keydown: function (t) {
                                if (13 == t.keyCode) {
                                    var n = e(t.data.target);
                                    n.timespinner("setValue", n.timespinner("getText"))
                                }
                            }
                        }),
                        formatter: function (t) {
                            function n(e) {
                                return (e < 10 ? "0" : "") + e
                            }

                            if (!t)return "";
                            var i = e(this).timespinner("options"), o = [n(t.getHours()), n(t.getMinutes())];
                            return i.showSeconds && o.push(n(t.getSeconds())), o.join(i.separator)
                        },
                        parser: function (t) {
                            function n(e) {
                                if (!e)return null;
                                var t = e.split(i.separator);
                                return new Date(1900, 0, 0, parseInt(t[0], 10) || 0, parseInt(t[1], 10) || 0, parseInt(t[2], 10) || 0)
                            }

                            var i = e(this).timespinner("options"), o = n(t);
                            if (o) {
                                var r = n(i.min), a = n(i.max);
                                r && r > o && (o = r), a && a < o && (o = a)
                            }
                            return o
                        },
                        selections: [[0, 2], [3, 5], [6, 8]],
                        separator: ":",
                        showSeconds: !1,
                        highlight: 0,
                        spin: function (e) {
                            s(this, e)
                        }
                    })
                }(jQuery), function (e) {
                    function t(t) {
                        var n = e.data(t, "combo"), r = n.options;
                        n.epanel || (n.epanel = e('<div class="combo-epanel"></div>').appendTo("body"), n.epanel.epanel({
                            minWidth: r.epanelMinWidth,
                            maxWidth: r.epanelMaxWidth,
                            minHeight: r.epanelMinHeight,
                            maxHeight: r.epanelMaxHeight,
                            doSize: !1,
                            closed: !0,
                            cls: "combo-p",
                            style: {position: "absolute", zIndex: 10},
                            onOpen: function () {
                                var t = e(this).epanel("options").comboTarget, n = e.data(t, "combo");
                                n && n.options.onShowepanel.call(t)
                            },
                            onBeforeClose: function () {
                                o(this)
                            },
                            onClose: function () {
                                var t = e(this).epanel("options").comboTarget, n = e(t).data("combo");
                                n && n.options.onHideepanel.call(t)
                            }
                        }));
                        var a = e.extend(!0, [], r.icons);
                        r.hasDownArrow && a.push({
                            iconCls: "combo-arrow", handler: function (e) {
                                i(e.data.target)
                            }
                        }), e(t).addClass("combo-f").textbox(e.extend({}, r, {
                            icons: a, onChange: function () {
                            }
                        })), e(t).attr("comboName", e(t).attr("textboxName")), n.combo = e(t).next(), n.combo.addClass("combo")
                    }

                    function n(t) {
                        var n = e.data(t, "combo"), i = n.options, o = n.epanel;
                        o.is(":visible") && o.epanel("close"), i.cloned || o.epanel("destroy"), e(t).textbox("destroy")
                    }

                    function i(t) {
                        var n = e.data(t, "combo").epanel;
                        if (n.is(":visible")) l(t); else {
                            var i = e(t).closest("div.combo-epanel");
                            e("div.combo-epanel:visible").not(n).not(i).epanel("close"), e(t).combo("showepanel")
                        }
                        e(t).combo("textbox").focus()
                    }

                    function o(t) {
                        e(t).find(".combo-f").each(function () {
                            var t = e(this).combo("epanel");
                            t.is(":visible") && t.epanel("close")
                        })
                    }

                    function r(t) {
                        var n = t.data.target, o = e.data(n, "combo"), r = o.options, a = o.epanel;
                        if (r.editable) {
                            var s = e(n).closest("div.combo-epanel");
                            e("div.combo-epanel:visible").not(a).not(s).epanel("close")
                        } else i(n)
                    }

                    function a(t) {
                        var n = t.data.target, i = e(n), o = i.data("combo"), r = i.combo("options");
                        switch (t.keyCode) {
                            case 38:
                                r.keyHandler.up.call(n, t);
                                break;
                            case 40:
                                r.keyHandler.down.call(n, t);
                                break;
                            case 37:
                                r.keyHandler.left.call(n, t);
                                break;
                            case 39:
                                r.keyHandler.right.call(n, t);
                                break;
                            case 13:
                                return t.preventDefault(), r.keyHandler.enter.call(n, t), !1;
                            case 9:
                            case 27:
                                l(n);
                                break;
                            default:
                                r.editable && (o.timer && clearTimeout(o.timer), o.timer = setTimeout(function () {
                                    var e = i.combo("getText");
                                    o.previousText != e && (o.previousText = e, i.combo("showepanel"), r.keyHandler.query.call(n, e, t), i.combo("validate"))
                                }, r.delay))
                        }
                    }

                    function s(t) {
                        function n() {
                            var t = r.offset().left;
                            return "right" == s.epanelAlign && (t += r._outerWidth() - a._outerWidth()), t + a._outerWidth() > e(window)._outerWidth() + e(document).scrollLeft() && (t = e(window)._outerWidth() + e(document).scrollLeft() - a._outerWidth()), t < 0 && (t = 0), t
                        }

                        function i() {
                            var t = r.offset().top + r._outerHeight();
                            return t + a._outerHeight() > e(window)._outerHeight() + e(document).scrollTop() && (t = r.offset().top - a._outerHeight()), t < e(document).scrollTop() && (t = r.offset().top + r._outerHeight()), t
                        }

                        var o = e.data(t, "combo"), r = o.combo, a = o.epanel, s = e(t).combo("options"),
                            l = a.epanel("options");
                        l.comboTarget = t, l.closed && (a.epanel("epanel").show().css({
                            zIndex: e.fn.menu ? e.fn.menu.defaults.zIndex++ : e.fn.window.defaults.zIndex++,
                            left: -999999
                        }), a.epanel("resize", {
                            width: s.epanelWidth ? s.epanelWidth : r._outerWidth(),
                            height: s.epanelHeight
                        }), a.epanel("epanel").hide(), a.epanel("open")), function () {
                            a.is(":visible") && (a.epanel("move", {
                                left: n(),
                                top: i()
                            }), setTimeout(arguments.callee, 200))
                        }()
                    }

                    function l(t) {
                        e.data(t, "combo").epanel.epanel("close")
                    }

                    function c(t, n) {
                        var i = e.data(t, "combo");
                        e(t).textbox("getText") != n && (e(t).textbox("setText", n), i.previousText = n)
                    }

                    function d(t) {
                        var n = [];
                        return e.data(t, "combo").combo.find(".textbox-value").each(function () {
                            n.push(e(this).val())
                        }), n
                    }

                    function u(t, n) {
                        var i = e.data(t, "combo"), o = i.options, r = i.combo;
                        e.isArray(n) || (n = n.split(o.separator));
                        var a = d(t);
                        r.find(".textbox-value").remove();
                        for (var s = e(t).attr("textboxName") || "", l = 0; l < n.length; l++) {
                            var c = e('<input type="hidden" class="textbox-value">').appendTo(r);
                            c.attr("name", s), o.disabled && c.attr("disabled", "disabled"), c.val(n[l])
                        }
                        (function () {
                            if (a.length != n.length)return !0;
                            var t = e.extend(!0, [], a), i = e.extend(!0, [], n);
                            t.sort(), i.sort();
                            for (var o = 0; o < t.length; o++)if (t[o] != i[o])return !0;
                            return !1
                        })() && (o.multiple ? o.onChange.call(t, n, a) : o.onChange.call(t, n[0], a[0]), e(t).closest("form").trigger("_change", [t]))
                    }

                    function f(e) {
                        return d(e)[0]
                    }

                    function p(e, t) {
                        u(e, [t])
                    }

                    function h(t) {
                        var n = e.data(t, "combo").options, i = n.onChange;
                        n.onChange = function () {
                        }, n.multiple ? u(t, n.value ? n.value : []) : p(t, n.value), n.onChange = i
                    }

                    e(function () {
                        e(document).unbind(".combo").bind("mousedown.combo mousewheel.combo", function (t) {
                            var n = e(t.target).closest("span.combo,div.combo-p,div.menu");
                            if (n.length)return void o(n);
                            e("body>div.combo-p>div.combo-epanel:visible").epanel("close")
                        })
                    }), e.fn.combo = function (n, i) {
                        if ("string" == typeof n) {
                            var o = e.fn.combo.methods[n];
                            return o ? o(this, i) : this.textbox(n, i)
                        }
                        return n = n || {}, this.each(function () {
                            var i = e.data(this, "combo");
                            i ? (e.extend(i.options, n), void 0 != n.value && (i.options.originalValue = n.value)) : (i = e.data(this, "combo", {
                                options: e.extend({}, e.fn.combo.defaults, e.fn.combo.parseOptions(this), n),
                                previousText: ""
                            }), i.options.originalValue = i.options.value), t(this), h(this)
                        })
                    }, e.fn.combo.methods = {
                        options: function (t) {
                            var n = t.textbox("options");
                            return e.extend(e.data(t[0], "combo").options, {
                                width: n.width,
                                height: n.height,
                                disabled: n.disabled,
                                readonly: n.readonly
                            })
                        }, cloneFrom: function (t, n) {
                            return t.each(function () {
                                e(this).textbox("cloneFrom", n), e.data(this, "combo", {
                                    options: e.extend(!0, {cloned: !0}, e(n).combo("options")),
                                    combo: e(this).next(),
                                    epanel: e(n).combo("epanel")
                                }), e(this).addClass("combo-f").attr("comboName", e(this).attr("textboxName"))
                            })
                        }, epanel: function (t) {
                            return e.data(t[0], "combo").epanel
                        }, destroy: function (e) {
                            return e.each(function () {
                                n(this)
                            })
                        }, showepanel: function (e) {
                            return e.each(function () {
                                s(this)
                            })
                        }, hideepanel: function (e) {
                            return e.each(function () {
                                l(this)
                            })
                        }, clear: function (t) {
                            return t.each(function () {
                                e(this).textbox("setText", ""), e.data(this, "combo").options.multiple ? e(this).combo("setValues", []) : e(this).combo("setValue", "")
                            })
                        }, reset: function (t) {
                            return t.each(function () {
                                var t = e.data(this, "combo").options;
                                t.multiple ? e(this).combo("setValues", t.originalValue) : e(this).combo("setValue", t.originalValue)
                            })
                        }, setText: function (e, t) {
                            return e.each(function () {
                                c(this, t)
                            })
                        }, getValues: function (e) {
                            return d(e[0])
                        }, setValues: function (e, t) {
                            return e.each(function () {
                                u(this, t)
                            })
                        }, getValue: function (e) {
                            return f(e[0])
                        }, setValue: function (e, t) {
                            return e.each(function () {
                                p(this, t)
                            })
                        }
                    }, e.fn.combo.parseOptions = function (t) {
                        var n = e(t);
                        return e.extend({}, e.fn.textbox.parseOptions(t), e.parser.parseOptions(t, ["separator", "epanelAlign", {
                            epanelWidth: "number",
                            hasDownArrow: "boolean",
                            delay: "number",
                            selectOnNavigation: "boolean"
                        }, {
                            epanelMinWidth: "number",
                            epanelMaxWidth: "number",
                            epanelMinHeight: "number",
                            epanelMaxHeight: "number"
                        }]), {
                            epanelHeight: "auto" == n.attr("epanelHeight") ? "auto" : parseInt(n.attr("epanelHeight")) || void 0,
                            multiple: !!n.attr("multiple") || void 0
                        })
                    }, e.fn.combo.defaults = e.extend({}, e.fn.textbox.defaults, {
                        inputEvents: {
                            click: r,
                            keydown: a,
                            paste: a,
                            drop: a
                        },
                        epanelWidth: null,
                        epanelHeight: 200,
                        epanelMinWidth: null,
                        epanelMaxWidth: null,
                        epanelMinHeight: null,
                        epanelMaxHeight: null,
                        epanelAlign: "left",
                        multiple: !1,
                        selectOnNavigation: !0,
                        separator: ",",
                        hasDownArrow: !0,
                        delay: 200,
                        keyHandler: {
                            up: function (e) {
                            }, down: function (e) {
                            }, left: function (e) {
                            }, right: function (e) {
                            }, enter: function (e) {
                            }, query: function (e, t) {
                            }
                        },
                        onShowepanel: function () {
                        },
                        onHideepanel: function () {
                        },
                        onChange: function (e, t) {
                        }
                    })
                }(jQuery), function (e) {
                    function t(t, n) {
                        for (var i = e.data(t, "combobox"), o = i.options, r = i.data, a = 0; a < r.length; a++)if (r[a][o.valueField] == n)return a;
                        return -1
                    }

                    function n(t, n) {
                        var i = e.data(t, "combobox").options, o = e(t).combo("epanel"), r = i.finder.getEl(t, n);
                        if (r.length)if (r.position().top <= 0) {
                            var a = o.scrollTop() + r.position().top;
                            o.scrollTop(a)
                        } else if (r.position().top + r.outerHeight() > o.height()) {
                            var a = o.scrollTop() + r.position().top + r.outerHeight() - o.height();
                            o.scrollTop(a)
                        }
                    }

                    function i(t, i) {
                        var r = e.data(t, "combobox").options, a = e(t).combobox("epanel"),
                            s = a.children("div.combobox-item-hover");
                        s.length || (s = a.children("div.combobox-item-selected")), s.removeClass("combobox-item-hover");
                        var l = "div.combobox-item:visible:not(.combobox-item-disabled):first",
                            c = "div.combobox-item:visible:not(.combobox-item-disabled):last";
                        if (s.length ? "next" == i ? (s = s.nextAll(l), s.length || (s = a.children(l))) : (s = s.prevAll(l), s.length || (s = a.children(c))) : s = a.children("next" == i ? l : c), s.length) {
                            s.addClass("combobox-item-hover");
                            var d = r.finder.getRow(t, s);
                            d && (n(t, d[r.valueField]), r.selectOnNavigation && o(t, d[r.valueField]))
                        }
                    }

                    function o(t, n) {
                        var i = e.data(t, "combobox").options, o = e(t).combo("getValues");
                        -1 == e.inArray(n + "", o) && (i.multiple ? o.push(n) : o = [n], a(t, o), i.onSelect.call(t, i.finder.getRow(t, n)))
                    }

                    function r(t, n) {
                        var i = e.data(t, "combobox").options, o = e(t).combo("getValues"), r = e.inArray(n + "", o)
                        ;r >= 0 && (o.splice(r, 1), a(t, o), i.onUnselect.call(t, i.finder.getRow(t, n)))
                    }

                    function a(t, n, i) {
                        var o = e.data(t, "combobox").options, r = e(t).combo("epanel");
                        e.isArray(n) || (n = n.split(o.separator)), r.find("div.combobox-item-selected").removeClass("combobox-item-selected");
                        for (var a = [], s = [], l = 0; l < n.length; l++) {
                            var c = n[l], d = c;
                            o.finder.getEl(t, c).addClass("combobox-item-selected");
                            var u = o.finder.getRow(t, c);
                            u && (d = u[o.textField]), a.push(c), s.push(d)
                        }
                        i || e(t).combo("setText", s.join(o.separator)), e(t).combo("setValues", a)
                    }

                    function s(t, n, i) {
                        var o = e.data(t, "combobox"), r = o.options;
                        o.data = r.loadFilter.call(t, n), o.groups = [], n = o.data;
                        for (var s = e(t).combobox("getValues"), l = [], c = void 0, d = 0; d < n.length; d++) {
                            var u = n[d], f = u[r.valueField] + "", p = u[r.textField], h = u[r.groupField];
                            h ? c != h && (c = h, o.groups.push(h), l.push('<div id="' + o.groupIdPrefix + "_" + (o.groups.length - 1) + '" class="combobox-group">'), l.push(r.groupFormatter ? r.groupFormatter.call(t, h) : h), l.push("</div>")) : c = void 0;
                            var m = "combobox-item" + (u.disabled ? " combobox-item-disabled" : "") + (h ? " combobox-gitem" : "");
                            l.push('<div id="' + o.itemIdPrefix + "_" + d + '" class="' + m + '">'), l.push(r.formatter ? r.formatter.call(t, u) : p), l.push("</div>"), u.selected && -1 == e.inArray(f, s) && s.push(f)
                        }
                        e(t).combo("epanel").html(l.join("")), r.multiple ? a(t, s, i) : a(t, s.length ? [s[s.length - 1]] : [], i), r.onLoadSuccess.call(t, n)
                    }

                    function l(t, n, i, o) {
                        var r = e.data(t, "combobox").options;
                        n && (r.url = n), i = e.extend({}, r.queryParams, i || {}), 0 != r.onBeforeLoad.call(t, i) && r.loader.call(t, i, function (e) {
                            s(t, e, o)
                        }, function () {
                            r.onLoadError.apply(this, arguments)
                        })
                    }

                    function c(t, n) {
                        function i(e) {
                            a(t, r.multiple ? n ? e : [] : e, !0)
                        }

                        var o = e.data(t, "combobox"), r = o.options, s = r.multiple ? n.split(r.separator) : [n];
                        if ("remote" == r.mode) i(s), l(t, null, {q: n}, !0); else {
                            var c = e(t).combo("epanel");
                            c.find("div.combobox-item-selected,div.combobox-item-hover").removeClass("combobox-item-selected combobox-item-hover"), c.find("div.combobox-item,div.combobox-group").hide();
                            var d = o.data, u = [];
                            e.map(s, function (n) {
                                n = e.trim(n);
                                for (var i = n, a = void 0, s = 0; s < d.length; s++) {
                                    var l = d[s];
                                    if (r.filter.call(t, n, l)) {
                                        var c = l[r.valueField], f = l[r.textField], p = l[r.groupField],
                                            h = r.finder.getEl(t, c).show();
                                        f.toLowerCase() == n.toLowerCase() && (i = c, h.addClass("combobox-item-selected")), r.groupField && a != p && (e("#" + o.groupIdPrefix + "_" + e.inArray(p, o.groups)).show(), a = p)
                                    }
                                }
                                u.push(i)
                            }), i(u)
                        }
                    }

                    function d(n) {
                        var i = e(n), o = i.combobox("options"), r = i.combobox("epanel"),
                            a = r.children("div.combobox-item-hover");
                        if (a.length) {
                            var s = o.finder.getRow(n, a), l = s[o.valueField];
                            o.multiple && a.hasClass("combobox-item-selected") ? i.combobox("unselect", l) : i.combobox("select", l)
                        }
                        var c = [];
                        e.map(i.combobox("getValues"), function (e) {
                            t(n, e) >= 0 && c.push(e)
                        }), i.combobox("setValues", c), o.multiple || i.combobox("hideepanel")
                    }

                    function u(t) {
                        var i = e.data(t, "combobox"), a = i.options;
                        f++, i.itemIdPrefix = "_eui_combobox_i" + f, i.groupIdPrefix = "_eui_combobox_g" + f, e(t).addClass("combobox-f"), e(t).combo(e.extend({}, a, {
                            onShowepanel: function () {
                                e(t).combo("epanel").find("div.combobox-item,div.combobox-group").show(), n(t, e(t).combobox("getValue")), a.onShowepanel.call(t)
                            }
                        })), e(t).combo("epanel").unbind().bind("mouseover", function (t) {
                            e(this).children("div.combobox-item-hover").removeClass("combobox-item-hover");
                            var n = e(t.target).closest("div.combobox-item");
                            n.hasClass("combobox-item-disabled") || n.addClass("combobox-item-hover"), t.stopPropagation()
                        }).bind("mouseout", function (t) {
                            e(t.target).closest("div.combobox-item").removeClass("combobox-item-hover"), t.stopPropagation()
                        }).bind("click", function (n) {
                            var i = e(n.target).closest("div.combobox-item");
                            if (i.length && !i.hasClass("combobox-item-disabled")) {
                                var s = a.finder.getRow(t, i);
                                if (s) {
                                    var l = s[a.valueField];
                                    a.multiple ? i.hasClass("combobox-item-selected") ? r(t, l) : o(t, l) : (o(t, l), e(t).combo("hideepanel")), n.stopPropagation()
                                }
                            }
                        })
                    }

                    var f = 0;
                    e.fn.combobox = function (t, n) {
                        if ("string" == typeof t) {
                            var i = e.fn.combobox.methods[t];
                            return i ? i(this, n) : this.combo(t, n)
                        }
                        return t = t || {}, this.each(function () {
                            var n = e.data(this, "combobox");
                            if (n) e.extend(n.options, t), u(this); else {
                                n = e.data(this, "combobox", {
                                    options: e.extend({}, e.fn.combobox.defaults, e.fn.combobox.parseOptions(this), t),
                                    data: []
                                }), u(this);
                                var i = e.fn.combobox.parseData(this);
                                i.length && s(this, i)
                            }
                            n.options.data && s(this, n.options.data), l(this)
                        })
                    }, e.fn.combobox.methods = {
                        options: function (t) {
                            var n = t.combo("options");
                            return e.extend(e.data(t[0], "combobox").options, {
                                width: n.width,
                                height: n.height,
                                originalValue: n.originalValue,
                                disabled: n.disabled,
                                readonly: n.readonly
                            })
                        }, getData: function (t) {
                            return e.data(t[0], "combobox").data
                        }, setValues: function (e, t) {
                            return e.each(function () {
                                a(this, t)
                            })
                        }, setValue: function (e, t) {
                            return e.each(function () {
                                a(this, [t])
                            })
                        }, clear: function (t) {
                            return t.each(function () {
                                e(this).combo("clear"), e(this).combo("epanel").find("div.combobox-item-selected").removeClass("combobox-item-selected")
                            })
                        }, reset: function (t) {
                            return t.each(function () {
                                var t = e(this).combobox("options");
                                t.multiple ? e(this).combobox("setValues", t.originalValue) : e(this).combobox("setValue", t.originalValue)
                            })
                        }, loadData: function (e, t) {
                            return e.each(function () {
                                s(this, t)
                            })
                        }, reload: function (t, n) {
                            return t.each(function () {
                                if ("string" == typeof n) l(this, n); else {
                                    if (n) {
                                        e(this).combobox("options").queryParams = n
                                    }
                                    l(this)
                                }
                            })
                        }, select: function (e, t) {
                            return e.each(function () {
                                o(this, t)
                            })
                        }, unselect: function (e, t) {
                            return e.each(function () {
                                r(this, t)
                            })
                        }
                    }, e.fn.combobox.parseOptions = function (t) {
                        e(t);
                        return e.extend({}, e.fn.combo.parseOptions(t), e.parser.parseOptions(t, ["valueField", "textField", "groupField", "mode", "method", "url"]))
                    }, e.fn.combobox.parseData = function (t) {
                        function n(t, n) {
                            var r = e(t), a = {};
                            a[o.valueField] = void 0 != r.attr("value") ? r.attr("value") : r.text(), a[o.textField] = r.text(), a.selected = r.is(":selected"), a.disabled = r.is(":disabled"), n && (o.groupField = o.groupField || "group", a[o.groupField] = n), i.push(a)
                        }

                        var i = [], o = e(t).combobox("options");
                        return e(t).children().each(function () {
                            if ("optgroup" == this.tagName.toLowerCase()) {
                                var t = e(this).attr("label");
                                e(this).children().each(function () {
                                    n(this, t)
                                })
                            } else n(this)
                        }), i
                    }, e.fn.combobox.defaults = e.extend({}, e.fn.combo.defaults, {
                        valueField: "value",
                        textField: "text",
                        groupField: null,
                        groupFormatter: function (e) {
                            return e
                        },
                        mode: "local",
                        method: "post",
                        url: null,
                        data: null,
                        queryParams: {},
                        keyHandler: {
                            up: function (e) {
                                i(this, "prev"), e.preventDefault()
                            }, down: function (e) {
                                i(this, "next"), e.preventDefault()
                            }, left: function (e) {
                            }, right: function (e) {
                            }, enter: function (e) {
                                d(this)
                            }, query: function (e, t) {
                                c(this, e)
                            }
                        },
                        filter: function (t, n) {
                            return 0 == n[e(this).combobox("options").textField].toLowerCase().indexOf(t.toLowerCase())
                        },
                        formatter: function (t) {
                            return t[e(this).combobox("options").textField]
                        },
                        loader: function (t, n, i) {
                            var o = e(this).combobox("options");
                            if (!o.url)return !1;
                            e.ajax({
                                type: o.method, url: o.url, data: t, dataType: "json", success: function (e) {
                                    n(e)
                                }, error: function () {
                                    i.apply(this, arguments)
                                }
                            })
                        },
                        loadFilter: function (e) {
                            return e
                        },
                        finder: {
                            getEl: function (n, i) {
                                var o = t(n, i), r = e.data(n, "combobox").itemIdPrefix + "_" + o;
                                return e("#" + r)
                            }, getRow: function (n, i) {
                                var o = e.data(n, "combobox"),
                                    r = i instanceof jQuery ? i.attr("id").substr(o.itemIdPrefix.length + 1) : t(n, i);
                                return o.data[parseInt(r)]
                            }
                        },
                        onBeforeLoad: function (e) {
                        },
                        onLoadSuccess: function () {
                        },
                        onLoadError: function () {
                        },
                        onSelect: function (e) {
                        },
                        onUnselect: function (e) {
                        }
                    })
                }(jQuery)
            };
            module.exports = _eui
        }).call(this, require("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/eui.js", "/lib")
    }, {"1YiZ5S": 4, buffer: 1}],
    37: [function (require, module, exports) {
        (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
            var scrollFunc = function (e) {
                return e = e || window.event, e.preventDefault ? (e.preventDefault(), e.stopPropagation()) : (e.cancelBubble = !0, e.returnValue = !1), !1
            }, exPack = {
                ppp: function (e, t, n) {
                    t || (e = $.extend({rowNum: "序号"}, e)), n || (e.asOps = "操作");
                    var i = "", o = Object.keys(e);
                    o.each(function (t, n) {
                        i += "{title:'{0}' ,key:'{1}' ,cls:''}{2}\n".format(e[t].trim().split(/\s|\.|\:|\,|，/)[0].trim(), t, n == o.length - 1 ? "" : ",")
                    }), console.log("\n" + i + "\n")
                }, obj2str: function (e) {
                    return "object" == typeof e ? JSON.stringify(e) : e
                }, str2obj: function (str, b) {
                    var obj;
                    return obj = "string" == typeof str ? b ? eval("(" + str + ")") : JSON.parse(str) : str
                }, dash2camel: function (e) {
                    for (var t = e.split("-"), n = 1; n < t.length; n++)t[n] && (t[0] = t[0] + t[n][0].toUpperCase() + t[n].slice(1));
                    return t[0]
                }, camel2dash: function (e) {
                    return e.replace(/[A-Z]/g, function (e, t) {
                        return (t ? "-" : "") + e.toLowerCase()
                    })
                }, byid: function (e, t) {
                    return (t || document).getElementById(e)
                }, bytag: function (e, t) {
                    return (t || document).getElementsByTagName(e)
                }, byId: function (e, t) {
                    return (t || document).getElementById(e)
                }, byTag: function (e, t) {
                    return (t || document).getElementById(e)
                }, byName: function (e, t) {
                    return (t || document).getElementsByName(e)
                }, getRect: function (e) {
                    return e.getBoundingClientRect()
                }, hasScroll: function (e, t, n) {
                    var i = "xXyY".indexOf(t) > 1 ? "Height" : "Width";
                    if (n) {
                        if (!0 === n) {
                            var o = getComputedStyle(e);
                            n = "Height" == i ? parseInt(o.borderLeftWidth) + parseInt(o.borderRightWidth) : parseInt(o.borderTopWidth) + parseInt(o.borderBottomWidth)
                        }
                    } else n = 0;
                    return e["scroll" + i] > e["client" + i] + n
                }, log: function () {
                    window.config.test && "undefined" != typeof console && console.log.apply(console, arguments)
                }, info: function () {
                    window.config.test && "undefined" != typeof console && console.info.apply(console, arguments)
                }, warn: function () {
                    window.config.test && "undefined" != typeof console && console.warn.apply(console, arguments)
                }, error: function () {
                    window.config.test && "undefined" != typeof console && console.error.apply(console, arguments)
                }, logEx: function (e, t) {
                    t = t ? "font-size:16px;" + t : "font-size:16px;color:red;", console.log("%c" + e, t)
                }, time: function (e) {
                    window.config && window.config.testTime && console.time(e)
                }, timeEnd: function (e) {
                    window.config && window.config.testTime && console.timeEnd(e)
                }, typeOf: function () {
                    var e = {
                        "[object Object]": "object",
                        "[object RegExp]": "regexp",
                        "[object Date]": "date",
                        "[object Array]": "array",
                        "[object String]": "string",
                        "[object Number]": "number",
                        "[object Boolean]": "boolean",
                        "[object Error]": "error",
                        "[object Window]": "window"
                    }, t = Object.prototype.toString;
                    return function (n, i) {
                        return "object" != typeof n ? typeof n : null === n ? "null" : i ? n !== n ? "NaN" : e[t.apply(n)] || t.call(n).slice(8, -1).toLowerCase() || "object" : e[t.apply(n)] || "object"
                    }
                }(), queryParse: function (e) {
                    var t = Object.create(null);
                    e = (e || location.search).trim(), "?" === e[0] || "&" === e[0] || (e = "?" + e);
                    var n = e.match(new RegExp("[?&][^?&]+=[^?&]*", "g"));
                    if (null == n)return !1;
                    for (var i, o = n.length, r = 0; r < o; r++)i = n[r].slice(1).split("="), t[i[0]] = i[1];
                    return t
                }, getJspData: function (e) {
                    return e || null
                }, replaceDDD: function (e) {
                    return e.replace(/\<ddd\>/gim, "'")
                }, isBadNum: function (e) {
                    return e !== e
                }, getValueOf: function (e) {
                    return null == e || e !== e ? e : "function" == typeof e.valueOf ? e.valueOf() : e
                }, isFalseVal: function (e) {
                    return !(e = exPack.getValueOf(e)) || (!!["0", "false", "FALSE", "null", "NULL", "undefined", "UNDEFINED"].includes(String(e)) || ("array" == typeOf(e) && 0 == e.length || "object" == typeOf(e) && 0 == Object.keys(e).length))
                }, isTrueVal: function (e) {
                    return !exPack.isFalseVal(e)
                }, disabledMouseWheel: function (e) {
                    var e = e || document;
                    e.addEventListener && document.addEventListener("DOMMouseScroll", scrollFunc, !1), e.onmousewheel = scrollFunc
                }, enabledMouseWheel: function (e, t) {
                    var e = e || document;
                    e.removeEventListener && e.removeEventListener("DOMMouseScroll", scrollFunc, !1), e.onmousewheel = t || function () {
                        }
                }, open2: function () {
                    var e = "", t = {
                        status: 0,
                        width: _top.getWidth() - 40,
                        height: _top.getHeight() - 70,
                        top: 20,
                        left: 20,
                        scrollbars: 1,
                        resizable: 1,
                        fullscreen: 0,
                        channelmode: 0,
                        directories: 1,
                        help: 0,
                        menubar: 0,
                        toolbar: 0,
                        location: 0
                    }, n = "object" == typeof arguments[0] ? arguments[0] : {
                        url: arguments[0],
                        name: arguments[1],
                        width: arguments[2],
                        height: arguments[3],
                        left: arguments[4],
                        top: arguments[5]
                    };
                    for (var i in n)void 0 !== n[i] && (t[i] = n[i]);
                    for (var o in t)"url" == o && "name" == o || (e += "," + o + "=" + t[o]);
                    return window.open(t.url, t.name || "_blank", e.slice(1))
                }, removeTag: function (e, t) {
                    var n = document.head.getElementsByTagName(t || "script");
                    e = e.replace("../", "").replace("..\\", "").replace(".\\", "").replace("./", "") + "?version=" + config.version;
                    for (var i = 0; i < n.length; i++)0 == ("link" == t ? n[i].href : n[i].src).split("").reverse().join("").indexOf(e.split("").reverse().join("")) && document.head.removeChild(n[i])
                }, checkExistTag: function (e, t) {
                    var n = document.head.getElementsByTagName(t || "script");
                    e = e.replace("../", "").replace("..\\", "").replace(".\\", "").replace("./", "") + "?version=" + config.version;
                    for (var i = 0; i < n.length; i++)if (0 == ("link" == t ? n[i].href : n[i].src).split("").reverse().join("").indexOf(e.split("").reverse().join("")))return n[i];
                    return !1
                }, $style: function (e, t, n) {
                    null != e.match(/\.css$/i) || (e += ".css");
                    var i = exPack.checkExistTag(e, "link");
                    if (i && !n)return "function" == typeof t && t();
                    i && document.head.removeChild(i);
                    var o = document.createElement("link");
                    return o.rel = "stylesheet", o.type = "text/css", o.media = "screen", o.href = e + (window.config.version ? "?version=" + window.config.version : ""), document.head.appendChild(o), t && t.call(o), o
                }, $script: function (e, t, n) {
                    var i = !1, o = document.createElement("script"), r = exPack.checkExistTag(e);
                    return r && !n ? "function" == typeof t && t() : (r && document.head.removeChild(r), o.type = "text/javascript", o.language = "javascript", null != e.match(/\.js$/i) || (e += ".js"), o.src = e + (window.config.version ? "?version=" + window.config.version : ""), o.onload = o.onreadystatechange = function () {
                        i || o.readyState && "loaded" != o.readyState && "complete" != o.readyState || (i = !0, o.onload = o.onreadystatechange = null, t && t())
                    }, document.head.appendChild(o), o)
                }, $loadHTML: function (e, t) {
                    return $loadTEXT(e, t, "HTML")
                }, $loadJSON: function (e, t) {
                    return $loadTEXT(e, t, "JSON")
                }, $loadTEXT: function (e, t, n) {
                    var i = e.replace(/\?.*$/, "");
                    n = n || (i.match(/\.json$/) ? "JSON" : null), i.match(/\.html?$/i) ? i = window.getViewPath(e) : i.match(/\.json$|\.txt$|\.md$/i) && (i = window.getSrcPath(e)), window.$cache(e) ? "function" == typeof t && t() : $.get(i + (i.indexOf("?") > 0 ? "&" : "?") + "version=" + window.config.version, function (i) {
                        i = "JSON" == n ? str2obj(i) : i, window.$cache(e, i), "function" == typeof t && t(i)
                    }).fail(function (e, t) {
                        console.warn([e, t, i])
                    })
                }, importing: require("./importing.js"), exportExcel: function (e) {
                    function t() {
                        window.clearInterval(n), CollectGarbage()
                    }

                    var n, i = function () {
                        var e = function (e) {
                            return window.btoa(unescape(encodeURIComponent(e)))
                        }, t = function (e, t) {
                            return e.replace(/{(\w+)}/g, function (e, n) {
                                return t[n]
                            })
                        };
                        return function (n, i) {
                            n.nodeType || (n = document.getElementById(n));
                            var o = {worksheet: name || "Worksheet", table: n.innerHTML},
                                r = "data:application/vnd.ms-excel;base64," + e(t('<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head>\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e</head><body><table>{table}</table></body></html>', o)),
                                a = document.createElement("a");
                            a.setAttribute("style", "display:none!important;width:0!important;"), document.body.appendChild(a), a.href = r, a.download = i, a.click(), document.body.removeChild(a)
                        }
                    }(), o = function (e, o) {
                        if ("function" == typeof ActiveXObject) {
                            var r = e, a = new ActiveXObject("Excel.Application"), s = a.Workbooks.Add(),
                                l = s.Worksheets(1), c = document.body.createTextRange();
                            c.moveToElementText(r), c.select(), c.execCommand("Copy"), l.Paste(), a.Visible = !0;
                            try {
                                var d = a.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls")
                            } catch (e) {
                                print("Nested catch caught " + e)
                            } finally {
                                s.SaveAs(d), s.Close(savechanges = !1), a.Quit(), a = null, n = window.setInterval(t, 1)
                            }
                        } else i(e, o)
                    };
                    if (!e)return o;
                    e.exportExcel = o
                }()
            };
            module.exports = exPack
        }).call(this, require("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/ex.js", "/lib")
    }, {"./importing.js": 38, "1YiZ5S": 4, buffer: 1}],
    38: [function (e, t, n) {
        (function (n, i, o, r, a, s, l, c, d) {
            var u, f, i = window, p = e("./scope"), h = e("./xtp.widget"), m = function () {
                var e = arguments, t = e[0], n = typeOf(t);
                if ("function" === n || "boolean" === n || 0 === e.length) {
                    var o = h.reg.call(this, [].slice.call(e));
                    return o ? o() : (h.init(), "function" == n && (1 == t.length ? $(document.body).xReady(function () {
                        var e = p();
                        console.log("                     ...xReady"), $("body, body>.body-agent").removeClass("unready"), e.scanEx(), t(e)
                    }, "[widget],[replace],[include],[behavior],.x-widget-loading") : t()), !1)
                }
                if ("array" == n)return m.apply(this, t.concat([].slice.call(e, 1)));
                var r = i.config.plugins;
                if (r[t]) {
                    if ("object" == typeof r[t])return t = (r[t].depending || []).concat(r[t].path ? i.getDistPath("plugin/" + r[t].path) : []), m.apply(this, t.concat([].slice.call(e, 1)));
                    t = i.getDistPath("plugin/" + r[t])
                } else {
                    if ("" == t || "null" == String(t))return m.apply(this, [].slice.call(e, 1));
                    if (0 != t.indexOf("http")) {
                        if (t.replace(/\?.*$/, "").match(/\.html?$|\.json$|\.txt$/i))return i.$loadTEXT(t, function () {
                            m.apply(this, [].slice.call(e, 1))
                        }, !0 === e[e.length - 1]);
                        t.indexOf("/") < 0 ? t.match(/.*.css$/i) ? t = i.getDistPath() + "css/" + t : t.match(/.*.js$/i) && (t = i.getDistPath() + "js/" + t) : t = t.indexOf(i.getDistPath()) > -1 ? t : i.getDistPath() + t
                    }
                }
                i[t.match(/.*\/css\/.+|.css$/i) ? "$style" : "$script"](t, function () {
                    m.apply(this, [].slice.call(e, 1))
                }, !0 === e[e.length - 1])
            };
            m.resetWidgetScan = function (e) {
                return f = u = e, m
            }, m.setInitState = function (e) {
                return f = e, m
            }, m.setRegState = function (e) {
                return u = e, m
            }, m.getInitState = function () {
                return f
            }, m.getRegState = function () {
                return u
            }, t.exports = m
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/importing.js", "/lib")
    }, {"./scope": 60, "./xtp.widget": 68, "1YiZ5S": 4, buffer: 1}],
    39: [function (e, t, n) {
        (function (e, n, i, o, r, a, s, l, c) {
            var d = Object.create(null), u = Object.create(null), f = Object.create(null), p = function (e, t) {
                return 1 == arguments.length ? d[e] : (Object.defineProperty(d, e, {
                    value: t,
                    writable: !1,
                    enumerable: !0,
                    configurable: !1
                }), p)
            }, h = function (e, t) {
                return 1 == arguments.length ? u[e] : (Object.defineProperty(u, e, {
                    value: t,
                    writable: !1,
                    enumerable: !0,
                    configurable: !1
                }), h)
            }, m = function (e, t) {
                return 1 == arguments.length ? f[e] : (Object.defineProperty(f, e, {
                    value: t,
                    writable: !1,
                    enumerable: !0,
                    configurable: !1
                }), m)
            }, g = {injector: d, extractor: u, resetter: f}, b = {
                "[x-radio-wrap]": "xWrap.radio",
                "[x-checkbox-wrap]": "xWrap.checkbox",
                "[x-select-wrap]": "xWrap.select",
                "[dict-type]": "dict",
                "dict-has-common": "dict.xkStyle",
                "[dict-root=AJLBDM].not-xk": "dict.AJLBDM.not-xk",
                "[dict-type=select]": "dict.select"
            }, v = function (e) {
                var t = this.data("x-" + e) || g[e][this.attr("x-" + e)] || g[e][this.attr("x-id") + "." + e];
                return t || (this.is("[x-radio-wrap]") ? t = g[e][b["[x-radio-wrap]"]] : this.is("[x-checkbox-wrap]") ? t = g[e][b["[x-checkbox-wrap]"]] : this.is("[x-select-wrap]") ? t = g[e][b["[x-select-wrap]"]] : this.is("[dict-common=true]") || this.is("[dict-common=manual]") ? t = g[e][b["dict-has-common"]] : this.is("[dict-type]") ? t = g[e][b["[dict-type]"]] : this.is("[dict-root=AJLBDM]") ? t = g[e][b["[dict-root=AJLBDM].not-xk"]] : this.is("[dict-type=select]") && (t = g[e][b["[dict-type=select]"]])), t
            };
            $.fn.injector = function (e) {
                return arguments.length ? this.data("x-injector", "string" == typeof e ? d[e] : e) : v.call(this, "injector")
            }, $.fn.extractor = function (e) {
                return arguments.length ? this.data("x-extractor", "string" == typeof e ? u[e] : e) : v.call(this, "extractor")
            }, $.fn.resetter = function (e) {
                return arguments.length ? this.data("x-resetter", "string" == typeof e ? f[e] : e) : v.call(this, "resetter")
            }, window.extending({$injector: p, $extractor: h, $resetter: m}), t.exports = {
                xInjectors: d,
                xExtractors: u,
                xResetters: f
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/injector-extractor.js", "/lib")
    }, {"1YiZ5S": 4, buffer: 1}],
    40: [function (e, t, n) {
        (function (e, n, i, o, r, a, s, l, c) {
            !function (e) {
                t.exports = e
            }(function (e) {
                function t(e) {
                    return s.raw ? e : encodeURIComponent(e)
                }

                function n(e) {
                    return s.raw ? e : decodeURIComponent(e)
                }

                function i(e) {
                    return t(s.json ? JSON.stringify(e) : String(e))
                }

                function o(e) {
                    0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
                    try {
                        return e = decodeURIComponent(e.replace(a, " ")), s.json ? JSON.parse(e) : e
                    } catch (e) {
                    }
                }

                function r(t, n) {
                    var i = s.raw ? t : o(t);
                    return e.isFunction(n) ? n(i) : i
                }

                var a = /\+/g, s = e.cookie = function (o, a, l) {
                    if (void 0 !== a && !e.isFunction(a)) {
                        if (l = e.extend({}, s.defaults, l), "number" == typeof l.expires) {
                            var c = l.expires, d = l.expires = new Date;
                            d.setTime(+d + 864e5 * c)
                        }
                        return document.cookie = [t(o), "=", i(a), l.expires ? "; expires=" + l.expires.toUTCString() : "", l.path ? "; path=" + l.path : "", l.domain ? "; domain=" + l.domain : "", l.secure ? "; secure" : ""].join("")
                    }
                    for (var u = o ? void 0 : {}, f = document.cookie ? document.cookie.split("; ") : [], p = 0, h = f.length; p < h; p++) {
                        var m = f[p].split("="), g = n(m.shift()), b = m.join("=");
                        if (o && o === g) {
                            u = r(b, a);
                            break
                        }
                        o || void 0 === (b = r(b)) || (u[g] = b)
                    }
                    return u
                };
                s.defaults = {}, e.removeCookie = function (t, n) {
                    return void 0 !== e.cookie(t) && (e.cookie(t, "", e.extend({}, n, {expires: -1})), !e.cookie(t))
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/jquery.cookie.js", "/lib")
    }, {"1YiZ5S": 4, buffer: 1}],
    41: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            var t = window, c = t.$;
            t.$.throttle = c.trt = function (e, t, n) {
                var i, o, r, a = null, s = 0;
                n || (n = {});
                var l = function () {
                    s = !1 === n.leading ? 0 : c.now(), a = null, r = e.apply(i, o), a || (i = o = null)
                };
                return function () {
                    var d = c.now();
                    s || !1 !== n.leading || (s = d);
                    var u = t - (d - s);
                    return i = this, o = arguments, 0 >= u || u > t ? (clearTimeout(a), a = null, s = d, r = e.apply(i, o), a || (i = o = null)) : a || !1 === n.trailing || (a = setTimeout(l, u)), r
                }
            }, t.$.debounce = c.dbs = function (e, t, n) {
                var i, o, r, a, s, l = function () {
                    var d = c.now() - a;
                    t > d && d > 0 ? i = setTimeout(l, t - d) : (i = null, n || (s = e.apply(r, o), i || (r = o = null)))
                };
                return function () {
                    r = this, o = arguments, a = c.now();
                    var d = n && !i;
                    return i || (i = setTimeout(l, t)), d && (s = e.apply(r, o), r = o = null), s
                }
            }, t.$.noOutline = function (e) {
                c(e || "a").on("focus", function () {
                    this.blur()
                })
            }, t.$.fn.serializeObject = function () {
                var e = function (e) {
                    for (var t = e.length, n = {}; t--;)void 0 === n[e[t].name] ? n[e[t].name] = e[t].value : n[e[t].name] += "," + e[t].value;
                    return n
                };
                return function () {
                    return e(this.serializeArray())
                }
            }(), t.$.fn.val2 = t.$.fn.valTrim = function () {
                return this.is(":text") || this.is("textarea") ? this.val().trim() : this.val()
            }, c.fn.hidden = function () {
                return this.xCss("visibility", "hidden")
            }, c.fn.visible = function () {
                return this.xCss("visibility", "visible")
            }, c.random = function () {
                return (c.now() + Math.random()).toString(24).replace(".", "").slice(6)
            }, c.extendValidates = function (e, t, n) {
                var i = {};
                i[e] = {validator: t, message: n}, c.extend(c.fn.validatebox.defaults.rules, i)
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/jquery.extend.js", "/lib")
    }, {"1YiZ5S": 4, buffer: 1}],
    42: [function (e, t, n) {
        (function (e, n, i, o, r, a, s, l, c) {
            !function (e, n) {
                t.exports = e.document ? n(e, !0) : function (e) {
                    if (!e.document)throw new Error("jQuery requires a window with a document");
                    return n(e)
                }
            }("undefined" != typeof window ? window : this, function (e, t) {
                function n(e) {
                    var t = !!e && "length" in e && e.length, n = re.type(e);
                    return "function" !== n && !re.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
                }

                function i(e, t, n) {
                    if (re.isFunction(t))return re.grep(e, function (e, i) {
                        return !!t.call(e, i, e) !== n
                    });
                    if (t.nodeType)return re.grep(e, function (e) {
                        return e === t !== n
                    });
                    if ("string" == typeof t) {
                        if (me.test(t))return re.filter(t, e, n);
                        t = re.filter(t, e)
                    }
                    return re.grep(e, function (e) {
                        return ee.call(t, e) > -1 !== n
                    })
                }

                function o(e, t) {
                    for (; (e = e[t]) && 1 !== e.nodeType;);
                    return e
                }

                function r(e) {
                    var t = {};
                    return re.each(e.match(we) || [], function (e, n) {
                        t[n] = !0
                    }), t
                }

                function a() {
                    Q.removeEventListener("DOMContentLoaded", a), e.removeEventListener("load", a), re.ready()
                }

                function s() {
                    this.expando = re.expando + s.uid++
                }

                function l(e, t, n) {
                    var i;
                    if (void 0 === n && 1 === e.nodeType)if (i = "data-" + t.replace(je, "-$&").toLowerCase(), "string" == typeof(n = e.getAttribute(i))) {
                        try {
                            n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : Te.test(n) ? re.parseJSON(n) : n)
                        } catch (e) {
                        }
                        ke.set(e, t, n)
                    } else n = void 0;
                    return n
                }

                function c(e, t, n, i) {
                    var o, r = 1, a = 20, s = i ? function () {
                            return i.cur()
                        } : function () {
                            return re.css(e, t, "")
                        }, l = s(), c = n && n[3] || (re.cssNumber[t] ? "" : "px"),
                        d = (re.cssNumber[t] || "px" !== c && +l) && De.exec(re.css(e, t));
                    if (d && d[3] !== c) {
                        c = c || d[3], n = n || [], d = +l || 1;
                        do {
                            r = r || ".5", d /= r, re.style(e, t, d + c)
                        } while (r !== (r = s() / l) && 1 !== r && --a)
                    }
                    return n && (d = +d || +l || 0, o = n[1] ? d + (n[1] + 1) * n[2] : +n[2], i && (i.unit = c, i.start = d, i.end = o)), o
                }

                function d(e, t) {
                    var n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
                    return void 0 === t || t && re.nodeName(e, t) ? re.merge([e], n) : n
                }

                function u(e, t) {
                    for (var n = 0, i = e.length; n < i; n++)Ce.set(e[n], "globalEval", !t || Ce.get(t[n], "globalEval"))
                }

                function f(e, t, n, i, o) {
                    for (var r, a, s, l, c, f, p = t.createDocumentFragment(), h = [], m = 0, g = e.length; m < g; m++)if ((r = e[m]) || 0 === r)if ("object" === re.type(r)) re.merge(h, r.nodeType ? [r] : r); else if (Ie.test(r)) {
                        for (a = a || p.appendChild(t.createElement("div")), s = (Oe.exec(r) || ["", ""])[1].toLowerCase(), l = qe[s] || qe._default, a.innerHTML = l[1] + re.htmlPrefilter(r) + l[2], f = l[0]; f--;)a = a.lastChild;
                        re.merge(h, a.childNodes), a = p.firstChild, a.textContent = ""
                    } else h.push(t.createTextNode(r));
                    for (p.textContent = "", m = 0; r = h[m++];)if (i && re.inArray(r, i) > -1) o && o.push(r); else if (c = re.contains(r.ownerDocument, r), a = d(p.appendChild(r), "script"), c && u(a), n)for (f = 0; r = a[f++];)He.test(r.type || "") && n.push(r);
                    return p
                }

                function p() {
                    return !0
                }

                function h() {
                    return !1
                }

                function m() {
                    try {
                        return Q.activeElement
                    } catch (e) {
                    }
                }

                function g(e, t, n, i, o, r) {
                    var a, s;
                    if ("string" == typeof t && ~t.indexOf("@"))return g(e, t.split("@")[0], t.split("@")[1], n, i, o);
                    if ("object" == typeof t) {
                        "string" != typeof n && (i = i || n, n = void 0);
                        for (s in t)~s.indexOf("@") ? g(e, s.split("@")[0], s.split("@")[1], i, t[s], r) : g(e, s, n, i, t[s], r);
                        return e
                    }
                    if (null == i && null == o ? (o = n, i = n = void 0) : null == o && ("string" == typeof n ? (o = i, i = void 0) : (o = i, i = n, n = void 0)), !1 === o) o = h; else if (!o)return this;
                    return 1 === r && (a = o, o = function (e) {
                        return re().off(e), a.apply(this, arguments)
                    }, o.guid = a.guid || (a.guid = re.guid++)), e.each(function () {
                        re.event.add(this, t, o, i, n)
                    })
                }

                function b(e, t) {
                    return re.nodeName(e, "table") && re.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e : e
                }

                function v(e) {
                    return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
                }

                function x(e) {
                    var t = Pe.exec(e.type);
                    return t ? e.type = t[1] : e.removeAttribute("type"), e
                }

                function w(e, t) {
                    var n, i, o, r, a, s, l, c;
                    if (1 === t.nodeType) {
                        if (Ce.hasData(e) && (r = Ce.access(e), a = Ce.set(t, r), c = r.events)) {
                            delete a.handle, a.events = {};
                            for (o in c)for (n = 0, i = c[o].length; n < i; n++)re.event.add(t, o, c[o][n])
                        }
                        ke.hasData(e) && (s = ke.access(e), l = re.extend({}, s), ke.set(t, l))
                    }
                }

                function y(e, t) {
                    var n = t.nodeName.toLowerCase();
                    "input" === n && Ae.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
                }

                function _(e, t, n, i) {
                    t = G.apply([], t);
                    var o, r, a, s, l, c, u = 0, p = e.length, h = p - 1, m = t[0], g = re.isFunction(m);
                    if (g || p > 1 && "string" == typeof m && !oe.checkClone && We.test(m))return e.each(function (o) {
                        var r = e.eq(o);
                        g && (t[0] = m.call(this, o, r.html())), _(r, t, n, i)
                    });
                    if (p && (o = f(t, e[0].ownerDocument, !1, e, i), r = o.firstChild, 1 === o.childNodes.length && (o = r), r || i)) {
                        for (a = re.map(d(o, "script"), v), s = a.length; u < p; u++)l = o, u !== h && (l = re.clone(l, !0, !0), s && re.merge(a, d(l, "script"))), n.call(e[u], l, u);
                        if (s)for (c = a[a.length - 1].ownerDocument, re.map(a, x), u = 0; u < s; u++)l = a[u], He.test(l.type || "") && !Ce.access(l, "globalEval") && re.contains(c, l) && (l.src ? re._evalUrl && re._evalUrl(l.src) : re.globalEval(l.textContent.replace(Ye, "")))
                    }
                    return e
                }

                function C(e, t, n) {
                    for (var i, o = t ? re.filter(t, e) : e, r = 0; null != (i = o[r]); r++)n || 1 !== i.nodeType || re.cleanData(d(i)), i.parentNode && (n && re.contains(i.ownerDocument, i) && u(d(i, "script")), i.parentNode.removeChild(i));
                    return e
                }

                function k(e, t) {
                    var n = re(t.createElement(e)).appendTo(t.body), i = re.css(n[0], "display");
                    return n.detach(), i
                }

                function T(e) {
                    var t = Q, n = Ve[e];
                    return n || (n = k(e, t), "none" !== n && n || (Re = (Re || re("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = Re[0].contentDocument, t.write(), t.close(), n = k(e, t), Re.detach()), Ve[e] = n), n
                }

                function j(e, t, n) {
                    var i, o, r, a, s = e.style;
                    return n = n || Xe(e), n && (a = n.getPropertyValue(t) || n[t], "" !== a || re.contains(e.ownerDocument, e) || (a = re.style(e, t)), !oe.pixelMarginRight() && Ue.test(a) && Ze.test(t) && (i = s.width, o = s.minWidth, r = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = i, s.minWidth = o, s.maxWidth = r)), void 0 !== a ? a + "" : a
                }

                function S(e, t) {
                    return {
                        get: function () {
                            return e() ? void delete this.get : (this.get = t).apply(this, arguments)
                        }
                    }
                }

                function D(e) {
                    if (e in nt)return e;
                    for (var t = e[0].toUpperCase() + e.slice(1), n = tt.length; n--;)if ((e = tt[n] + t) in nt)return e
                }

                function E(e, t, n) {
                    var i = De.exec(t);
                    return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : t
                }

                function F(e, t, n, i, o) {
                    for (var r = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; r < 4; r += 2)"margin" === n && (a += re.css(e, n + Ee[r], !0, o)), i ? ("content" === n && (a -= re.css(e, "padding" + Ee[r], !0, o)), "margin" !== n && (a -= re.css(e, "border" + Ee[r] + "Width", !0, o))) : (a += re.css(e, "padding" + Ee[r], !0, o), "padding" !== n && (a += re.css(e, "border" + Ee[r] + "Width", !0, o)));
                    return a
                }

                function A(t, n, i) {
                    var o = !0, r = "width" === n ? t.offsetWidth : t.offsetHeight, a = Xe(t),
                        s = "border-box" === re.css(t, "boxSizing", !1, a);
                    if (Q.msFullscreenElement && e.top !== e && t.getClientRects().length && (r = Math.round(100 * t.getBoundingClientRect()[n])), r <= 0 || null == r) {
                        if (r = j(t, n, a), (r < 0 || null == r) && (r = t.style[n]), Ue.test(r))return r;
                        o = s && (oe.boxSizingReliable() || r === t.style[n]), r = parseFloat(r) || 0
                    }
                    return r + F(t, n, i || (s ? "border" : "content"), o, a) + "px"
                }

                function O(e, t) {
                    for (var n, i, o, r = [], a = 0, s = e.length; a < s; a++)i = e[a], i.style && (r[a] = Ce.get(i, "olddisplay"), n = i.style.display, t ? (r[a] || "none" !== n || (i.style.display = ""), "" === i.style.display && Fe(i) && (r[a] = Ce.access(i, "olddisplay", T(i.nodeName)))) : (o = Fe(i), "none" === n && o || Ce.set(i, "olddisplay", o ? n : re.css(i, "display"))));
                    for (a = 0; a < s; a++)i = e[a], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? r[a] || "" : "none"));
                    return e
                }

                function H(e, t, n, i, o) {
                    return new H.prototype.init(e, t, n, i, o)
                }

                function q() {
                    return e.setTimeout(function () {
                        it = void 0
                    }), it = re.now()
                }

                function I(e, t) {
                    var n, i = 0, o = {height: e};
                    for (t = t ? 1 : 0; i < 4; i += 2 - t)n = Ee[i], o["margin" + n] = o["padding" + n] = e;
                    return t && (o.opacity = o.width = e), o
                }

                function z(e, t, n) {
                    for (var i, o = (B.tweeners[t] || []).concat(B.tweeners["*"]), r = 0, a = o.length; r < a; r++)if (i = o[r].call(n, t, e))return i
                }

                function L(e, t, n) {
                    var i, o, r, a, s, l, c, d = this, u = {}, f = e.style, p = e.nodeType && Fe(e),
                        h = Ce.get(e, "fxshow");
                    n.queue || (s = re._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, l = s.empty.fire, s.empty.fire = function () {
                        s.unqueued || l()
                    }), s.unqueued++, d.always(function () {
                        d.always(function () {
                            s.unqueued--, re.queue(e, "fx").length || s.empty.fire()
                        })
                    })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [f.overflow, f.overflowX, f.overflowY], c = re.css(e, "display"), "inline" === ("none" === c ? Ce.get(e, "olddisplay") || T(e.nodeName) : c) && "none" === re.css(e, "float") && (f.display = "inline-block")), n.overflow && (f.overflow = "hidden", d.always(function () {
                        f.overflow = n.overflow[0], f.overflowX = n.overflow[1], f.overflowY = n.overflow[2]
                    }));
                    for (i in t)if (o = t[i], rt.exec(o)) {
                        if (delete t[i], r = r || "toggle" === o, o === (p ? "hide" : "show")) {
                            if ("show" !== o || !h || void 0 === h[i])continue;
                            p = !0
                        }
                        u[i] = h && h[i] || re.style(e, i)
                    } else c = void 0;
                    if (re.isEmptyObject(u)) "inline" === ("none" === c ? T(e.nodeName) : c) && (f.display = c); else {
                        h ? "hidden" in h && (p = h.hidden) : h = Ce.access(e, "fxshow", {}), r && (h.hidden = !p), p ? re(e).show() : d.done(function () {
                            re(e).hide()
                        }), d.done(function () {
                            var t;
                            Ce.remove(e, "fxshow");
                            for (t in u)re.style(e, t, u[t])
                        });
                        for (i in u)a = z(p ? h[i] : 0, i, d), i in h || (h[i] = a.start, p && (a.end = a.start, a.start = "width" === i || "height" === i ? 1 : 0))
                    }
                }

                function N(e, t) {
                    var n, i, o, r, a;
                    for (n in e)if (i = re.camelCase(n), o = t[i], r = e[n], re.isArray(r) && (o = r[1], r = e[n] = r[0]), n !== i && (e[i] = r, delete e[n]), (a = re.cssHooks[i]) && "expand" in a) {
                        r = a.expand(r), delete e[i];
                        for (n in r)n in e || (e[n] = r[n], t[n] = o)
                    } else t[i] = o
                }

                function B(e, t, n) {
                    var i, o, r = 0, a = B.prefilters.length, s = re.Deferred().always(function () {
                        delete l.elem
                    }), l = function () {
                        if (o)return !1
                            ;
                        for (var t = it || q(), n = Math.max(0, c.startTime + c.duration - t), i = n / c.duration || 0, r = 1 - i, a = 0, l = c.tweens.length; a < l; a++)c.tweens[a].run(r);
                        return s.notifyWith(e, [c, r, n]), r < 1 && l ? n : (s.resolveWith(e, [c]), !1)
                    }, c = s.promise({
                        elem: e,
                        props: re.extend({}, t),
                        opts: re.extend(!0, {specialEasing: {}, easing: re.easing._default}, n),
                        originalProperties: t,
                        originalOptions: n,
                        startTime: it || q(),
                        duration: n.duration,
                        tweens: [],
                        createTween: function (t, n) {
                            var i = re.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
                            return c.tweens.push(i), i
                        },
                        stop: function (t) {
                            var n = 0, i = t ? c.tweens.length : 0;
                            if (o)return this;
                            for (o = !0; n < i; n++)c.tweens[n].run(1);
                            return t ? (s.notifyWith(e, [c, 1, 0]), s.resolveWith(e, [c, t])) : s.rejectWith(e, [c, t]), this
                        }
                    }), d = c.props;
                    for (N(d, c.opts.specialEasing); r < a; r++)if (i = B.prefilters[r].call(c, e, d, c.opts))return re.isFunction(i.stop) && (re._queueHooks(c.elem, c.opts.queue).stop = re.proxy(i.stop, i)), i;
                    return re.map(d, z, c), re.isFunction(c.opts.start) && c.opts.start.call(e, c), re.fx.timer(re.extend(l, {
                        elem: e,
                        anim: c,
                        queue: c.opts.queue
                    })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
                }

                function M(e) {
                    return e.getAttribute && e.getAttribute("class") || ""
                }

                function W(e) {
                    return function (t, n) {
                        "string" != typeof t && (n = t, t = "*");
                        var i, o = 0, r = t.toLowerCase().match(we) || [];
                        if (re.isFunction(n))for (; i = r[o++];)"+" === i[0] ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
                    }
                }

                function P(e, t, n, i) {
                    function o(s) {
                        var l;
                        return r[s] = !0, re.each(e[s] || [], function (e, s) {
                            var c = s(t, n, i);
                            return "string" != typeof c || a || r[c] ? a ? !(l = c) : void 0 : (t.dataTypes.unshift(c), o(c), !1)
                        }), l
                    }

                    var r = {}, a = e === Ct;
                    return o(t.dataTypes[0]) || !r["*"] && o("*")
                }

                function Y(e, t) {
                    var n, i, o = re.ajaxSettings.flatOptions || {};
                    for (n in t)void 0 !== t[n] && ((o[n] ? e : i || (i = {}))[n] = t[n]);
                    return i && re.extend(!0, e, i), e
                }

                function R(e, t, n) {
                    for (var i, o, r, a, s = e.contents, l = e.dataTypes; "*" === l[0];)l.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
                    if (i)for (o in s)if (s[o] && s[o].test(i)) {
                        l.unshift(o);
                        break
                    }
                    if (l[0] in n) r = l[0]; else {
                        for (o in n) {
                            if (!l[0] || e.converters[o + " " + l[0]]) {
                                r = o;
                                break
                            }
                            a || (a = o)
                        }
                        r = r || a
                    }
                    if (r)return r !== l[0] && l.unshift(r), n[r]
                }

                function V(e, t, n, i) {
                    var o, r, a, s, l, c = {}, d = e.dataTypes.slice();
                    if (d[1])for (a in e.converters)c[a.toLowerCase()] = e.converters[a];
                    for (r = d.shift(); r;)if (e.responseFields[r] && (n[e.responseFields[r]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = r, r = d.shift())if ("*" === r) r = l; else if ("*" !== l && l !== r) {
                        if (!(a = c[l + " " + r] || c["* " + r]))for (o in c)if (s = o.split(" "), s[1] === r && (a = c[l + " " + s[0]] || c["* " + s[0]])) {
                            !0 === a ? a = c[o] : !0 !== c[o] && (r = s[0], d.unshift(s[1]));
                            break
                        }
                        if (!0 !== a)if (a && e.throws) t = a(t); else try {
                            t = a(t)
                        } catch (e) {
                            return {state: "parsererror", error: a ? e : "No conversion from " + l + " to " + r}
                        }
                    }
                    return {state: "success", data: t}
                }

                function Z(e, t, n, i) {
                    var o;
                    if (re.isArray(t)) re.each(t, function (t, o) {
                        n || St.test(e) ? i(e, o) : Z(e + "[" + ("object" == typeof o && null != o ? t : "") + "]", o, n, i)
                    }); else if (n || "object" !== re.type(t)) i(e, t); else for (o in t)Z(e + "[" + o + "]", t[o], n, i)
                }

                function U(e) {
                    return re.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
                }

                var X = [], Q = e.document, J = X.slice, G = X.concat, K = X.push, ee = X.indexOf, te = {},
                    ne = te.toString, ie = te.hasOwnProperty, oe = {}, re = function (e, t) {
                        return new re.fn.init(e, t)
                    }, ae = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, se = /^-ms-/, le = /-([\da-z])/gi, ce = function (e, t) {
                        return t.toUpperCase()
                    };
                re.fn = re.prototype = {
                    jquery: "2.2.0",
                    constructor: re,
                    selector: "",
                    length: 0,
                    toArray: function () {
                        return J.call(this)
                    },
                    get: function (e) {
                        return null != e ? e < 0 ? this[e + this.length] : this[e] : J.call(this)
                    },
                    pushStack: function (e) {
                        var t = re.merge(this.constructor(), e);
                        return t.prevObject = this, t.context = this.context, t
                    },
                    each: function (e) {
                        return re.each(this, e)
                    },
                    map: function (e) {
                        return this.pushStack(re.map(this, function (t, n) {
                            return e.call(t, n, t)
                        }))
                    },
                    slice: function () {
                        return this.pushStack(J.apply(this, arguments))
                    },
                    first: function () {
                        return this.eq(0)
                    },
                    last: function () {
                        return this.eq(-1)
                    },
                    eq: function (e) {
                        var t = this.length, n = +e + (e < 0 ? t : 0);
                        return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
                    },
                    end: function () {
                        return this.prevObject || this.constructor()
                    },
                    push: K,
                    sort: X.sort,
                    splice: X.splice
                }, re.extend = re.fn.extend = function () {
                    var e, t, n, i, o, r, a = arguments[0] || {}, s = 1, l = arguments.length, c = !1;
                    for ("boolean" == typeof a && (c = a, a = arguments[s] || {}, s++), "object" == typeof a || re.isFunction(a) || (a = {}), s === l && (a = this, s--); s < l; s++)if (null != (e = arguments[s]))for (t in e)n = a[t], i = e[t], a !== i && (c && i && (re.isPlainObject(i) || (o = re.isArray(i))) ? (o ? (o = !1, r = n && re.isArray(n) ? n : []) : r = n && re.isPlainObject(n) ? n : {}, a[t] = re.extend(c, r, i)) : void 0 !== i && (a[t] = i));
                    return a
                }, re.extend({
                    expando: "jQuery" + ("2.2.0" + Math.random()).replace(/\D/g, ""),
                    isReady: !0,
                    error: function (e) {
                        throw new Error(e)
                    },
                    noop: function () {
                    },
                    isFunction: function (e) {
                        return "function" === re.type(e)
                    },
                    isArray: Array.isArray,
                    isWindow: function (e) {
                        return null != e && e === e.window
                    },
                    isNumeric: function (e) {
                        var t = e && e.toString();
                        return !re.isArray(e) && t - parseFloat(t) + 1 >= 0
                    },
                    isPlainObject: function (e) {
                        return "object" === re.type(e) && !e.nodeType && !re.isWindow(e) && !(e.constructor && !ie.call(e.constructor.prototype, "isPrototypeOf"))
                    },
                    isEmptyObject: function (e) {
                        var t;
                        for (t in e)return !1;
                        return !0
                    },
                    type: function (e) {
                        return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? te[ne.call(e)] || "object" : typeof e
                    },
                    globalEval: function (e) {
                        var t, n = eval;
                        (e = re.trim(e)) && (1 === e.indexOf("use strict") ? (t = Q.createElement("script"), t.text = e, Q.head.appendChild(t).parentNode.removeChild(t)) : n(e))
                    },
                    camelCase: function (e) {
                        return e.replace(se, "ms-").replace(le, ce)
                    },
                    nodeName: function (e, t) {
                        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
                    },
                    each: function (e, t) {
                        var i, o = 0;
                        if (n(e))for (i = e.length; o < i && !1 !== t.call(e[o], o, e[o]); o++); else for (o in e)if (!1 === t.call(e[o], o, e[o]))break;
                        return e
                    },
                    trim: function (e) {
                        return null == e ? "" : (e + "").replace(ae, "")
                    },
                    makeArray: function (e, t) {
                        var i = t || [];
                        return null != e && (n(Object(e)) ? re.merge(i, "string" == typeof e ? [e] : e) : K.call(i, e)), i
                    },
                    inArray: function (e, t, n) {
                        return null == t ? -1 : ee.call(t, e, n)
                    },
                    merge: function (e, t) {
                        for (var n = +t.length, i = 0, o = e.length; i < n; i++)e[o++] = t[i];
                        return e.length = o, e
                    },
                    grep: function (e, t, n) {
                        for (var i = [], o = 0, r = e.length, a = !n; o < r; o++)!t(e[o], o) !== a && i.push(e[o]);
                        return i
                    },
                    map: function (e, t, i) {
                        var o, r, a = 0, s = [];
                        if (n(e))for (o = e.length; a < o; a++)null != (r = t(e[a], a, i)) && s.push(r); else for (a in e)null != (r = t(e[a], a, i)) && s.push(r);
                        return G.apply([], s)
                    },
                    guid: 1,
                    proxy: function (e, t) {
                        var n, i, o;
                        if ("string" == typeof t && (n = e[t], t = e, e = n), re.isFunction(e))return i = J.call(arguments, 2), o = function () {
                            return e.apply(t || this, i.concat(J.call(arguments)))
                        }, o.guid = e.guid = e.guid || re.guid++, o
                    },
                    now: Date.now,
                    support: oe
                }), "function" == typeof Symbol && (re.fn[Symbol.iterator] = X[Symbol.iterator]), re.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
                    te["[object " + t + "]"] = t.toLowerCase()
                });
                var de = function (e) {
                    function t(e, t, n, i) {
                        var o, r, a, s, c, u, f, p, h = t && t.ownerDocument, m = t ? t.nodeType : 9;
                        if (n = n || [], "string" != typeof e || !e || 1 !== m && 9 !== m && 11 !== m)return n;
                        if (!i && ((t ? t.ownerDocument || t : L) !== E && D(t), t = t || E, A)) {
                            if (11 !== m && (u = me.exec(e)))if (o = u[1]) {
                                if (9 === m) {
                                    if (!(a = t.getElementById(o)))return n;
                                    if (a.id === o)return n.push(a), n
                                } else if (h && (a = h.getElementById(o)) && I(t, a) && a.id === o)return n.push(a), n
                            } else {
                                if (u[2])return Q.apply(n, t.getElementsByTagName(e)), n;
                                if ((o = u[3]) && x.getElementsByClassName && t.getElementsByClassName)return Q.apply(n, t.getElementsByClassName(o)), n
                            }
                            if (x.qsa && !P[e + " "] && (!O || !O.test(e))) {
                                if (1 !== m) h = t, p = e; else if ("object" !== t.nodeName.toLowerCase()) {
                                    for ((s = t.getAttribute("id")) ? s = s.replace(be, "\\$&") : t.setAttribute("id", s = z), f = _(e), r = f.length, c = de.test(s) ? "#" + s : "[id='" + s + "']"; r--;)f[r] = c + " " + d(f[r]);
                                    p = f.join(","), h = ge.test(e) && l(t.parentNode) || t
                                }
                                if (p)try {
                                    return Q.apply(n, h.querySelectorAll(p)), n
                                } catch (e) {
                                } finally {
                                    s === z && t.removeAttribute("id")
                                }
                            }
                        }
                        return k(e.replace(re, "$1"), t, n, i)
                    }

                    function n() {
                        function e(n, i) {
                            return t.push(n + " ") > w.cacheLength && delete e[t.shift()], e[n + " "] = i
                        }

                        var t = [];
                        return e
                    }

                    function i(e) {
                        return e[z] = !0, e
                    }

                    function o(e) {
                        var t = E.createElement("div");
                        try {
                            return !!e(t)
                        } catch (e) {
                            return !1
                        } finally {
                            t.parentNode && t.parentNode.removeChild(t), t = null
                        }
                    }

                    function r(e, t) {
                        for (var n = e.split("|"), i = n.length; i--;)w.attrHandle[n[i]] = t
                    }

                    function a(e, t) {
                        var n = t && e,
                            i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || R) - (~e.sourceIndex || R);
                        if (i)return i;
                        if (n)for (; n = n.nextSibling;)if (n === t)return -1;
                        return e ? 1 : -1
                    }

                    function s(e) {
                        return i(function (t) {
                            return t = +t, i(function (n, i) {
                                for (var o, r = e([], n.length, t), a = r.length; a--;)n[o = r[a]] && (n[o] = !(i[o] = n[o]))
                            })
                        })
                    }

                    function l(e) {
                        return e && void 0 !== e.getElementsByTagName && e
                    }

                    function c() {
                    }

                    function d(e) {
                        for (var t = 0, n = e.length, i = ""; t < n; t++)i += e[t].value;
                        return i
                    }

                    function u(e, t, n) {
                        var i = t.dir, o = n && "parentNode" === i, r = B++;
                        return t.first ? function (t, n, r) {
                            for (; t = t[i];)if (1 === t.nodeType || o)return e(t, n, r)
                        } : function (t, n, a) {
                            var s, l, c, d = [N, r];
                            if (a) {
                                for (; t = t[i];)if ((1 === t.nodeType || o) && e(t, n, a))return !0
                            } else for (; t = t[i];)if (1 === t.nodeType || o) {
                                if (c = t[z] || (t[z] = {}), l = c[t.uniqueID] || (c[t.uniqueID] = {}), (s = l[i]) && s[0] === N && s[1] === r)return d[2] = s[2];
                                if (l[i] = d, d[2] = e(t, n, a))return !0
                            }
                        }
                    }

                    function f(e) {
                        return e.length > 1 ? function (t, n, i) {
                            for (var o = e.length; o--;)if (!e[o](t, n, i))return !1;
                            return !0
                        } : e[0]
                    }

                    function p(e, n, i) {
                        for (var o = 0, r = n.length; o < r; o++)t(e, n[o], i);
                        return i
                    }

                    function h(e, t, n, i, o) {
                        for (var r, a = [], s = 0, l = e.length, c = null != t; s < l; s++)(r = e[s]) && (n && !n(r, i, o) || (a.push(r), c && t.push(s)));
                        return a
                    }

                    function m(e, t, n, o, r, a) {
                        return o && !o[z] && (o = m(o)), r && !r[z] && (r = m(r, a)), i(function (i, a, s, l) {
                            var c, d, u, f = [], m = [], g = a.length, b = i || p(t || "*", s.nodeType ? [s] : s, []),
                                v = !e || !i && t ? b : h(b, f, e, s, l), x = n ? r || (i ? e : g || o) ? [] : a : v;
                            if (n && n(v, x, s, l), o)for (c = h(x, m), o(c, [], s, l), d = c.length; d--;)(u = c[d]) && (x[m[d]] = !(v[m[d]] = u));
                            if (i) {
                                if (r || e) {
                                    if (r) {
                                        for (c = [], d = x.length; d--;)(u = x[d]) && c.push(v[d] = u);
                                        r(null, x = [], c, l)
                                    }
                                    for (d = x.length; d--;)(u = x[d]) && (c = r ? G(i, u) : f[d]) > -1 && (i[c] = !(a[c] = u))
                                }
                            } else x = h(x === a ? x.splice(g, x.length) : x), r ? r(null, a, x, l) : Q.apply(a, x)
                        })
                    }

                    function g(e) {
                        for (var t, n, i, o = e.length, r = w.relative[e[0].type], a = r || w.relative[" "], s = r ? 1 : 0, l = u(function (e) {
                            return e === t
                        }, a, !0), c = u(function (e) {
                            return G(t, e) > -1
                        }, a, !0), p = [function (e, n, i) {
                            var o = !r && (i || n !== T) || ((t = n).nodeType ? l(e, n, i) : c(e, n, i));
                            return t = null, o
                        }]; s < o; s++)if (n = w.relative[e[s].type]) p = [u(f(p), n)]; else {
                            if (n = w.filter[e[s].type].apply(null, e[s].matches), n[z]) {
                                for (i = ++s; i < o && !w.relative[e[i].type]; i++);
                                return m(s > 1 && f(p), s > 1 && d(e.slice(0, s - 1).concat({value: " " === e[s - 2].type ? "*" : ""})).replace(re, "$1"), n, s < i && g(e.slice(s, i)), i < o && g(e = e.slice(i)), i < o && d(e))
                            }
                            p.push(n)
                        }
                        return f(p)
                    }

                    function b(e, n) {
                        var o = n.length > 0, r = e.length > 0, a = function (i, a, s, l, c) {
                            var d, u, f, p = 0, m = "0", g = i && [], b = [], v = T, x = i || r && w.find.TAG("*", c),
                                y = N += null == v ? 1 : Math.random() || .1, $ = x.length;
                            for (c && (T = a === E || a || c); m !== $ && null != (d = x[m]); m++) {
                                if (r && d) {
                                    for (u = 0, a || d.ownerDocument === E || (D(d), s = !A); f = e[u++];)if (f(d, a || E, s)) {
                                        l.push(d);
                                        break
                                    }
                                    c && (N = y)
                                }
                                o && ((d = !f && d) && p--, i && g.push(d))
                            }
                            if (p += m, o && m !== p) {
                                for (u = 0; f = n[u++];)f(g, b, a, s);
                                if (i) {
                                    if (p > 0)for (; m--;)g[m] || b[m] || (b[m] = U.call(l));
                                    b = h(b)
                                }
                                Q.apply(l, b), c && !i && b.length > 0 && p + n.length > 1 && t.uniqueSort(l)
                            }
                            return c && (N = y, T = v), g
                        };
                        return o ? i(a) : a
                    }

                    var v, x, w, y, $, _, C, k, T, j, S, D, E, F, A, O, H, q, I, z = "sizzle" + 1 * new Date,
                        L = e.document, N = 0, B = 0, M = n(), W = n(), P = n(), Y = function (e, t) {
                            return e === t && (S = !0), 0
                        }, R = 1 << 31, V = {}.hasOwnProperty, Z = [], U = Z.pop, X = Z.push, Q = Z.push, J = Z.slice,
                        G = function (e, t) {
                            for (var n = 0, i = e.length; n < i; n++)if (e[n] === t)return n;
                            return -1
                        },
                        K = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                        ee = "[\\x20\\t\\r\\n\\f]", te = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                        ne = "\\[" + ee + "*(" + te + ")(?:" + ee + "*([*^$|!~]?=)" + ee + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + te + "))|)" + ee + "*\\]",
                        ie = ":(" + te + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ne + ")*)|.*)\\)|)",
                        oe = new RegExp(ee + "+", "g"),
                        re = new RegExp("^" + ee + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ee + "+$", "g"),
                        ae = new RegExp("^" + ee + "*," + ee + "*"),
                        se = new RegExp("^" + ee + "*([>+~]|" + ee + ")" + ee + "*"),
                        le = new RegExp("=" + ee + "*([^\\]'\"]*?)" + ee + "*\\]", "g"), ce = new RegExp(ie),
                        de = new RegExp("^" + te + "$"), ue = {
                            ID: new RegExp("^#(" + te + ")"),
                            CLASS: new RegExp("^\\.(" + te + ")"),
                            TAG: new RegExp("^(" + te + "|[*])"),
                            ATTR: new RegExp("^" + ne),
                            PSEUDO: new RegExp("^" + ie),
                            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ee + "*(even|odd|(([+-]|)(\\d*)n|)" + ee + "*(?:([+-]|)" + ee + "*(\\d+)|))" + ee + "*\\)|)", "i"),
                            bool: new RegExp("^(?:" + K + ")$", "i"),
                            needsContext: new RegExp("^" + ee + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ee + "*((?:-\\d)?\\d*)" + ee + "*\\)|)(?=[^-]|$)", "i")
                        }, fe = /^(?:input|select|textarea|button)$/i, pe = /^h\d$/i, he = /^[^{]+\{\s*\[native \w/,
                        me = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ge = /[+~]/, be = /'|\\/g,
                        ve = new RegExp("\\\\([\\da-f]{1,6}" + ee + "?|(" + ee + ")|.)", "ig"),
                        xe = function (e, t, n) {
                            var i = "0x" + t - 65536;
                            return i !== i || n ? t : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
                        }, we = function () {
                            D()
                        };
                    try {
                        Q.apply(Z = J.call(L.childNodes), L.childNodes), Z[L.childNodes.length].nodeType
                    } catch (e) {
                        Q = {
                            apply: Z.length ? function (e, t) {
                                X.apply(e, J.call(t))
                            } : function (e, t) {
                                for (var n = e.length, i = 0; e[n++] = t[i++];);
                                e.length = n - 1
                            }
                        }
                    }
                    x = t.support = {}, $ = t.isXML = function (e) {
                        var t = e && (e.ownerDocument || e).documentElement;
                        return !!t && "HTML" !== t.nodeName
                    }, D = t.setDocument = function (e) {
                        var t, n, i = e ? e.ownerDocument || e : L;
                        return i !== E && 9 === i.nodeType && i.documentElement ? (E = i, F = E.documentElement, A = !$(E), (n = E.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", we, !1) : n.attachEvent && n.attachEvent("onunload", we)), x.attributes = o(function (e) {
                            return e.className = "i", !e.getAttribute("className")
                        }), x.getElementsByTagName = o(function (e) {
                            return e.appendChild(E.createComment("")), !e.getElementsByTagName("*").length
                        }), x.getElementsByClassName = he.test(E.getElementsByClassName), x.getById = o(function (e) {
                            return F.appendChild(e).id = z, !E.getElementsByName || !E.getElementsByName(z).length
                        }), x.getById ? (w.find.ID = function (e, t) {
                            if (void 0 !== t.getElementById && A) {
                                var n = t.getElementById(e);
                                return n ? [n] : []
                            }
                        }, w.filter.ID = function (e) {
                            var t = e.replace(ve, xe);
                            return function (e) {
                                return e.getAttribute("id") === t
                            }
                        }) : (delete w.find.ID, w.filter.ID = function (e) {
                            var t = e.replace(ve, xe);
                            return function (e) {
                                var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                                return n && n.value === t
                            }
                        }), w.find.TAG = x.getElementsByTagName ? function (e, t) {
                            return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : x.qsa ? t.querySelectorAll(e) : void 0
                        } : function (e, t) {
                            var n, i = [], o = 0, r = t.getElementsByTagName(e);
                            if ("*" === e) {
                                for (; n = r[o++];)1 === n.nodeType && i.push(n);
                                return i
                            }
                            return r
                        }, w.find.CLASS = x.getElementsByClassName && function (e, t) {
                                if (void 0 !== t.getElementsByClassName && A)return t.getElementsByClassName(e)
                            }, H = [], O = [], (x.qsa = he.test(E.querySelectorAll)) && (o(function (e) {
                            F.appendChild(e).innerHTML = "<a id='" + z + "'></a><select id='" + z + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && O.push("[*^$]=" + ee + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || O.push("\\[" + ee + "*(?:value|" + K + ")"), e.querySelectorAll("[id~=" + z + "-]").length || O.push("~="), e.querySelectorAll(":checked").length || O.push(":checked"), e.querySelectorAll("a#" + z + "+*").length || O.push(".#.+[+~]")
                        }), o(function (e) {
                            var t = E.createElement("input");
                            t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && O.push("name" + ee + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || O.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), O.push(",.*:")
                        })), (x.matchesSelector = he.test(q = F.matches || F.webkitMatchesSelector || F.mozMatchesSelector || F.oMatchesSelector || F.msMatchesSelector)) && o(function (e) {
                            x.disconnectedMatch = q.call(e, "div"), q.call(e, "[s!='']:x"), H.push("!=", ie)
                        }), O = O.length && new RegExp(O.join("|")), H = H.length && new RegExp(H.join("|")), t = he.test(F.compareDocumentPosition), I = t || he.test(F.contains) ? function (e, t) {
                            var n = 9 === e.nodeType ? e.documentElement : e, i = t && t.parentNode;
                            return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
                        } : function (e, t) {
                            if (t)for (; t = t.parentNode;)if (t === e)return !0;
                            return !1
                        }, Y = t ? function (e, t) {
                            if (e === t)return S = !0, 0;
                            var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                            return n || (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !x.sortDetached && t.compareDocumentPosition(e) === n ? e === E || e.ownerDocument === L && I(L, e) ? -1 : t === E || t.ownerDocument === L && I(L, t) ? 1 : j ? G(j, e) - G(j, t) : 0 : 4 & n ? -1 : 1)
                        } : function (e, t) {
                            if (e === t)return S = !0, 0;
                            var n, i = 0, o = e.parentNode, r = t.parentNode, s = [e], l = [t];
                            if (!o || !r)return e === E ? -1 : t === E ? 1 : o ? -1 : r ? 1 : j ? G(j, e) - G(j, t) : 0;
                            if (o === r)return a(e, t);
                            for (n = e; n = n.parentNode;)s.unshift(n);
                            for (n = t; n = n.parentNode;)l.unshift(n);
                            for (; s[i] === l[i];)i++;
                            return i ? a(s[i], l[i]) : s[i] === L ? -1 : l[i] === L ? 1 : 0
                        }, E) : E
                    }, t.matches = function (e, n) {
                        return t(e, null, null, n)
                    }, t.matchesSelector = function (e, n) {
                        if ((e.ownerDocument || e) !== E && D(e), n = n.replace(le, "='$1']"), x.matchesSelector && A && !P[n + " "] && (!H || !H.test(n)) && (!O || !O.test(n)))try {
                            var i = q.call(e, n);
                            if (i || x.disconnectedMatch || e.document && 11 !== e.document.nodeType)return i
                        } catch (e) {
                        }
                        return t(n, E, null, [e]).length > 0
                    }, t.contains = function (e, t) {
                        return (e.ownerDocument || e) !== E && D(e), I(e, t)
                    }, t.attr = function (e, t) {
                        (e.ownerDocument || e) !== E && D(e);
                        var n = w.attrHandle[t.toLowerCase()],
                            i = n && V.call(w.attrHandle, t.toLowerCase()) ? n(e, t, !A) : void 0;
                        return void 0 !== i ? i : x.attributes || !A ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
                    }, t.error = function (e) {
                        throw new Error("Syntax error, unrecognized expression: " + e)
                    }, t.uniqueSort = function (e) {
                        var t, n = [], i = 0, o = 0;
                        if (S = !x.detectDuplicates, j = !x.sortStable && e.slice(0), e.sort(Y), S) {
                            for (; t = e[o++];)t === e[o] && (i = n.push(o));
                            for (; i--;)e.splice(n[i], 1)
                        }
                        return j = null, e
                    }, y = t.getText = function (e) {
                        var t, n = "", i = 0, o = e.nodeType;
                        if (o) {
                            if (1 === o || 9 === o || 11 === o) {
                                if ("string" == typeof e.textContent)return e.textContent;
                                for (e = e.firstChild; e; e = e.nextSibling)n += y(e)
                            } else if (3 === o || 4 === o)return e.nodeValue
                        } else for (; t = e[i++];)n += y(t);
                        return n
                    }, w = t.selectors = {
                        cacheLength: 50,
                        createPseudo: i,
                        match: ue,
                        attrHandle: {},
                        find: {},
                        relative: {
                            ">": {dir: "parentNode", first: !0},
                            " ": {dir: "parentNode"},
                            "+": {dir: "previousSibling", first: !0},
                            "~": {dir: "previousSibling"}
                        },
                        preFilter: {
                            ATTR: function (e) {
                                return e[1] = e[1].replace(ve, xe), e[3] = (e[3] || e[4] || e[5] || "").replace(ve, xe), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                            }, CHILD: function (e) {
                                return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                            }, PSEUDO: function (e) {
                                var t, n = !e[6] && e[2];
                                return ue.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && ce.test(n) && (t = _(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                            }
                        },
                        filter: {
                            TAG: function (e) {
                                var t = e.replace(ve, xe).toLowerCase();
                                return "*" === e ? function () {
                                    return !0
                                } : function (e) {
                                    return e.nodeName && e.nodeName.toLowerCase() === t
                                }
                            }, CLASS: function (e) {
                                var t = M[e + " "];
                                return t || (t = new RegExp("(^|" + ee + ")" + e + "(" + ee + "|$)")) && M(e, function (e) {
                                        return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                                    })
                            }, ATTR: function (e, n, i) {
                                return function (o) {
                                    var r = t.attr(o, e);
                                    return null == r ? "!=" === n : !n || (r += "", "=" === n ? r === i : "!=" === n ? r !== i : "^=" === n ? i && 0 === r.indexOf(i) : "*=" === n ? i && r.indexOf(i) > -1 : "$=" === n ? i && r.slice(-i.length) === i : "~=" === n ? (" " + r.replace(oe, " ") + " ").indexOf(i) > -1 : "|=" === n && (r === i || r.slice(0, i.length + 1) === i + "-"))
                                }
                            }, CHILD: function (e, t, n, i, o) {
                                var r = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t;
                                return 1 === i && 0 === o ? function (e) {
                                    return !!e.parentNode
                                } : function (t, n, l) {
                                    var c, d, u, f, p, h, m = r !== a ? "nextSibling" : "previousSibling",
                                        g = t.parentNode, b = s && t.nodeName.toLowerCase(), v = !l && !s, x = !1;
                                    if (g) {
                                        if (r) {
                                            for (; m;) {
                                                for (f = t; f = f[m];)if (s ? f.nodeName.toLowerCase() === b : 1 === f.nodeType)return !1;
                                                h = m = "only" === e && !h && "nextSibling"
                                            }
                                            return !0
                                        }
                                        if (h = [a ? g.firstChild : g.lastChild], a && v) {
                                            for (f = g, u = f[z] || (f[z] = {}), d = u[f.uniqueID] || (u[f.uniqueID] = {}), c = d[e] || [], p = c[0] === N && c[1], x = p && c[2], f = p && g.childNodes[p]; f = ++p && f && f[m] || (x = p = 0) || h.pop();)if (1 === f.nodeType && ++x && f === t) {
                                                d[e] = [N, p, x];
                                                break
                                            }
                                        } else if (v && (f = t, u = f[z] || (f[z] = {}), d = u[f.uniqueID] || (u[f.uniqueID] = {}), c = d[e] || [], p = c[0] === N && c[1], x = p), !1 === x)for (; (f = ++p && f && f[m] || (x = p = 0) || h.pop()) && ((s ? f.nodeName.toLowerCase() !== b : 1 !== f.nodeType) || !++x || (v && (u = f[z] || (f[z] = {}), d = u[f.uniqueID] || (u[f.uniqueID] = {}), d[e] = [N, x]), f !== t)););
                                        return (x -= o) === i || x % i == 0 && x / i >= 0
                                    }
                                }
                            }, PSEUDO: function (e, n) {
                                var o,
                                    r = w.pseudos[e] || w.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                                return r[z] ? r(n) : r.length > 1 ? (o = [e, e, "", n], w.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function (e, t) {
                                    for (var i, o = r(e, n), a = o.length; a--;)i = G(e, o[a]), e[i] = !(t[i] = o[a])
                                }) : function (e) {
                                    return r(e, 0, o)
                                }) : r
                            }
                        },
                        pseudos: {
                            not: i(function (e) {
                                var t = [], n = [], o = C(e.replace(re, "$1"));
                                return o[z] ? i(function (e, t, n, i) {
                                    for (var r, a = o(e, null, i, []), s = e.length; s--;)(r = a[s]) && (e[s] = !(t[s] = r))
                                }) : function (e, i, r) {
                                    return t[0] = e, o(t, null, r, n), t[0] = null, !n.pop()
                                }
                            }), has: i(function (e) {
                                return function (n) {
                                    return t(e, n).length > 0
                                }
                            }), contains: i(function (e) {
                                return e = e.replace(ve, xe), function (t) {
                                    return (t.textContent || t.innerText || y(t)).indexOf(e) > -1
                                }
                            }), lang: i(function (e) {
                                return de.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(ve, xe).toLowerCase(), function (t) {
                                    var n;
                                    do {
                                        if (n = A ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                                    } while ((t = t.parentNode) && 1 === t.nodeType);
                                    return !1
                                }
                            }), target: function (t) {
                                var n = e.location && e.location.hash;
                                return n && n.slice(1) === t.id
                            }, root: function (e) {
                                return e === F
                            }, focus: function (e) {
                                return e === E.activeElement && (!E.hasFocus || E.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                            }, enabled: function (e) {
                                return !1 === e.disabled
                            }, disabled: function (e) {
                                return !0 === e.disabled
                            }, checked: function (e) {
                                var t = e.nodeName.toLowerCase();
                                return "input" === t && !!e.checked || "option" === t && !!e.selected
                            }, selected: function (e) {
                                return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                            }, empty: function (e) {
                                for (e = e.firstChild; e; e = e.nextSibling)if (e.nodeType < 6)return !1;
                                return !0
                            }, parent: function (e) {
                                return !w.pseudos.empty(e)
                            }, header: function (e) {
                                return pe.test(e.nodeName)
                            }, input: function (e) {
                                return fe.test(e.nodeName)
                            }, button: function (e) {
                                var t = e.nodeName.toLowerCase();
                                return "input" === t && "button" === e.type || "button" === t
                            }, text: function (e) {
                                var t;
                                return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                            }, first: s(function () {
                                return [0]
                            }), last: s(function (e, t) {
                                return [t - 1]
                            }), eq: s(function (e, t, n) {
                                return [n < 0 ? n + t : n]
                            }), even: s(function (e, t) {
                                for (var n = 0; n < t; n += 2)e.push(n);
                                return e
                            }), odd: s(function (e, t) {
                                for (var n = 1; n < t; n += 2)e.push(n);
                                return e
                            }), lt: s(function (e, t, n) {
                                for (var i = n < 0 ? n + t : n; --i >= 0;)e.push(i);
                                return e
                            }), gt: s(function (e, t, n) {
                                for (var i = n < 0 ? n + t : n; ++i < t;)e.push(i);
                                return e
                            })
                        }
                    }, w.pseudos.nth = w.pseudos.eq;
                    for (v in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})w.pseudos[v] = function (e) {
                        return function (t) {
                            return "input" === t.nodeName.toLowerCase() && t.type === e
                        }
                    }(v);
                    for (v in{submit: !0, reset: !0})w.pseudos[v] = function (e) {
                        return function (t) {
                            var n = t.nodeName.toLowerCase();
                            return ("input" === n || "button" === n) && t.type === e
                        }
                    }(v);
                    return c.prototype = w.filters = w.pseudos, w.setFilters = new c, _ = t.tokenize = function (e, n) {
                        var i, o, r, a, s, l, c, d = W[e + " "];
                        if (d)return n ? 0 : d.slice(0);
                        for (s = e, l = [], c = w.preFilter; s;) {
                            i && !(o = ae.exec(s)) || (o && (s = s.slice(o[0].length) || s), l.push(r = [])), i = !1, (o = se.exec(s)) && (i = o.shift(), r.push({
                                value: i,
                                type: o[0].replace(re, " ")
                            }), s = s.slice(i.length));
                            for (a in w.filter)!(o = ue[a].exec(s)) || c[a] && !(o = c[a](o)) || (i = o.shift(), r.push({
                                value: i,
                                type: a,
                                matches: o
                            }), s = s.slice(i.length));
                            if (!i)break
                        }
                        return n ? s.length : s ? t.error(e) : W(e, l).slice(0)
                    }, C = t.compile = function (e, t) {
                        var n, i = [], o = [], r = P[e + " "];
                        if (!r) {
                            for (t || (t = _(e)), n = t.length; n--;)r = g(t[n]), r[z] ? i.push(r) : o.push(r);
                            r = P(e, b(o, i)), r.selector = e
                        }
                        return r
                    }, k = t.select = function (e, t, n, i) {
                        var o, r, a, s, c, u = "function" == typeof e && e, f = !i && _(e = u.selector || e);
                        if (n = n || [], 1 === f.length) {
                            if (r = f[0] = f[0].slice(0), r.length > 2 && "ID" === (a = r[0]).type && x.getById && 9 === t.nodeType && A && w.relative[r[1].type]) {
                                if (!(t = (w.find.ID(a.matches[0].replace(ve, xe), t) || [])[0]))return n;
                                u && (t = t.parentNode), e = e.slice(r.shift().value.length)
                            }
                            for (o = ue.needsContext.test(e) ? 0 : r.length; o-- && (a = r[o], !w.relative[s = a.type]);)if ((c = w.find[s]) && (i = c(a.matches[0].replace(ve, xe), ge.test(r[0].type) && l(t.parentNode) || t))) {
                                if (r.splice(o, 1), !(e = i.length && d(r)))return Q.apply(n, i), n;
                                break
                            }
                        }
                        return (u || C(e, f))(i, t, !A, n, !t || ge.test(e) && l(t.parentNode) || t), n
                    }, x.sortStable = z.split("").sort(Y).join("") === z, x.detectDuplicates = !!S, D(), x.sortDetached = o(function (e) {
                        return 1 & e.compareDocumentPosition(E.createElement("div"))
                    }), o(function (e) {
                        return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
                    }) || r("type|href|height|width", function (e, t, n) {
                        if (!n)return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
                    }), x.attributes && o(function (e) {
                        return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
                    }) || r("value", function (e, t, n) {
                        if (!n && "input" === e.nodeName.toLowerCase())return e.defaultValue
                    }), o(function (e) {
                        return null == e.getAttribute("disabled")
                    }) || r(K, function (e, t, n) {
                        var i;
                        if (!n)return !0 === e[t] ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
                    }), t
                }(e);
                re.find = de, re.expr = de.selectors, re.expr[":"] = re.expr.pseudos, re.uniqueSort = re.unique = de.uniqueSort, re.text = de.getText, re.isXMLDoc = de.isXML, re.contains = de.contains;
                var ue = function (e, t, n) {
                    for (var i = [], o = void 0 !== n; (e = e[t]) && 9 !== e.nodeType;)if (1 === e.nodeType) {
                        if (o && re(e).is(n))break;
                        i.push(e)
                    }
                    return i
                }, fe = function (e, t) {
                    for (var n = []; e; e = e.nextSibling)1 === e.nodeType && e !== t && n.push(e);
                    return n
                }, pe = re.expr.match.needsContext, he = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, me = /^.[^:#\[\.,]*$/;
                re.filter = function (e, t, n) {
                    var i = t[0];
                    return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? re.find.matchesSelector(i, e) ? [i] : [] : re.find.matches(e, re.grep(t, function (e) {
                        return 1 === e.nodeType
                    }))
                }, re.fn.extend({
                    find: function (e) {
                        var t, n = this.length, i = [], o = this;
                        if ("string" != typeof e)return this.pushStack(re(e).filter(function () {
                            for (t = 0; t < n; t++)if (re.contains(o[t], this))return !0
                        }));
                        for (t = 0; t < n; t++)re.find(e, o[t], i);
                        return i = this.pushStack(n > 1 ? re.unique(i) : i), i.selector = this.selector ? this.selector + " " + e : e, i
                    }, filter: function (e) {
                        return this.pushStack(i(this, e || [], !1))
                    }, not: function (e) {
                        return this.pushStack(i(this, e || [], !0))
                    }, is: function (e) {
                        return !!i(this, "string" == typeof e && pe.test(e) ? re(e) : e || [], !1).length
                    }
                });
                var ge, be = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
                (re.fn.init = function (e, t, n) {
                    var i, o;
                    if (!e)return this;
                    if (n = n || ge, "string" == typeof e) {
                        if (!(i = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : be.exec(e)) || !i[1] && t)return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                        if (i[1]) {
                            if (t = t instanceof re ? t[0] : t, re.merge(this, re.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : Q, !0)), he.test(i[1]) && re.isPlainObject(t))for (i in t)re.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                            return this
                        }
                        return o = Q.getElementById(i[2]), o && o.parentNode && (this.length = 1, this[0] = o), this.context = Q, this.selector = e, this
                    }
                    return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : re.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(re) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), re.makeArray(e, this))
                }).prototype = re.fn, ge = re(Q);
                var ve = /^(?:parents|prev(?:Until|All))/, xe = {children: !0, contents: !0, next: !0, prev: !0};
                re.fn.extend({
                    has: function (e) {
                        var t = re(e, this), n = t.length;
                        return this.filter(function () {
                            for (var e = 0; e < n; e++)if (re.contains(this, t[e]))return !0
                        })
                    }, closest: function (e, t) {
                        for (var n, i = 0, o = this.length, r = [], a = pe.test(e) || "string" != typeof e ? re(e, t || this.context) : 0; i < o; i++)for (n = this[i]; n && n !== t; n = n.parentNode)if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && re.find.matchesSelector(n, e))) {
                            r.push(n);
                            break
                        }
                        return this.pushStack(r.length > 1 ? re.uniqueSort(r) : r)
                    }, index: function (e) {
                        return e ? "string" == typeof e ? ee.call(re(e), this[0]) : ee.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                    }, add: function (e, t) {
                        return this.pushStack(re.uniqueSort(re.merge(this.get(), re(e, t))))
                    }, addBack: function (e) {
                        return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
                    }
                }), re.each({
                    parent: function (e) {
                        var t = e.parentNode;
                        return t && 11 !== t.nodeType ? t : null
                    }, parents: function (e) {
                        return ue(e, "parentNode")
                    }, parentsUntil: function (e, t, n) {
                        return ue(e, "parentNode", n)
                    }, next: function (e) {
                        return o(e, "nextSibling")
                    }, prev: function (e) {
                        return o(e, "previousSibling")
                    }, nextAll: function (e) {
                        return ue(e, "nextSibling")
                    }, prevAll: function (e) {
                        return ue(e, "previousSibling")
                    }, nextUntil: function (e, t, n) {
                        return ue(e, "nextSibling", n)
                    }, prevUntil: function (e, t, n) {
                        return ue(e, "previousSibling", n)
                    }, siblings: function (e) {
                        return fe((e.parentNode || {}).firstChild, e)
                    }, children: function (e) {
                        return fe(e.firstChild)
                    }, contents: function (e) {
                        return e.contentDocument || re.merge([], e.childNodes)
                    }
                }, function (e, t) {
                    re.fn[e] = function (n, i) {
                        var o = re.map(this, t, n);
                        return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (o = re.filter(i, o)), this.length > 1 && (xe[e] || re.uniqueSort(o), ve.test(e) && o.reverse()), this.pushStack(o)
                    }
                });
                var we = /\S+/g;
                re.Callbacks = function (e) {
                    e = "string" == typeof e ? r(e) : re.extend({}, e);
                    var t, n, i, o, a = [], s = [], l = -1, c = function () {
                        for (o = e.once, i = t = !0; s.length; l = -1)for (n = s.shift(); ++l < a.length;)!1 === a[l].apply(n[0], n[1]) && e.stopOnFalse && (l = a.length, n = !1);
                        e.memory || (n = !1), t = !1, o && (a = n ? [] : "")
                    }, d = {
                        add: function () {
                            return a && (n && !t && (l = a.length - 1, s.push(n)), function t(n) {
                                re.each(n, function (n, i) {
                                    re.isFunction(i) ? e.unique && d.has(i) || a.push(i) : i && i.length && "string" !== re.type(i) && t(i)
                                })
                            }(arguments), n && !t && c()), this
                        }, remove: function () {
                            return re.each(arguments, function (e, t) {
                                for (var n; (n = re.inArray(t, a, n)) > -1;)a.splice(n, 1), n <= l && l--
                            }), this
                        }, has: function (e) {
                            return e ? re.inArray(e, a) > -1 : a.length > 0
                        }, empty: function () {
                            return a && (a = []), this
                        }, disable: function () {
                            return o = s = [], a = n = "", this
                        }, disabled: function () {
                            return !a
                        }, lock: function () {
                            return o = s = [], n || (a = n = ""), this
                        }, locked: function () {
                            return !!o
                        }, fireWith: function (e, n) {
                            return o || (n = n || [], n = [e, n.slice ? n.slice() : n], s.push(n), t || c()), this
                        }, fire: function () {
                            return d.fireWith(this, arguments), this
                        }, fired: function () {
                            return !!i
                        }
                    };
                    return d
                }, re.extend({
                    Deferred: function (e) {
                        var t = [["resolve", "done", re.Callbacks("once memory"), "resolved"], ["reject", "fail", re.Callbacks("once memory"), "rejected"], ["notify", "progress", re.Callbacks("memory")]],
                            n = "pending", i = {
                                state: function () {
                                    return n
                                }, always: function () {
                                    return o.done(arguments).fail(arguments), this
                                }, then: function () {
                                    var e = arguments;
                                    return re.Deferred(function (n) {
                                        re.each(t, function (t, r) {
                                            var a = re.isFunction(e[t]) && e[t];
                                            o[r[1]](function () {
                                                var e = a && a.apply(this, arguments);
                                                e && re.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[r[0] + "With"](this === i ? n.promise() : this, a ? [e] : arguments)
                                            })
                                        }), e = null
                                    }).promise()
                                }, xThen: function (e) {
                                    var t = this;
                                    return t.then(function (n, i) {
                                        if (n)return 1 == n.flag ? e(n) : $.ajax.unDone(n, i, t._ajaxUrl, t._ajaxParams)
                                    }, function (e, t) {
                                        e && $.ajax.serverErrHandle(e, t)
                                    }).always(function () {
                                        t._ajaxComplete && t._ajaxComplete()
                                    })
                                }, promise: function (e) {
                                    return null != e ? re.extend(e, i) : i
                                }
                            }, o = {};
                        return i.pipe = i.then, re.each(t, function (e, r) {
                            var a = r[2], s = r[3];
                            i[r[1]] = a.add, s && a.add(function () {
                                n = s
                            }, t[1 ^ e][2].disable, t[2][2].lock), o[r[0]] = function () {
                                return o[r[0] + "With"](this === o ? i : this, arguments), this
                            }, o[r[0] + "With"] = a.fireWith
                        }), i.promise(o), e && e.call(o, o), o
                    }, when: function (e) {
                        var t, n, i, o = 0, r = J.call(arguments), a = r.length,
                            s = 1 !== a || e && re.isFunction(e.promise) ? a : 0, l = 1 === s ? e : re.Deferred(),
                            c = function (e, n, i) {
                                return function (o) {
                                    n[e] = this, i[e] = arguments.length > 1 ? J.call(arguments) : o, i === t ? l.notifyWith(n, i) : --s || l.resolveWith(n, i)
                                }
                            };
                        if (a > 1)for (t = new Array(a), n = new Array(a), i = new Array(a); o < a; o++)r[o] && re.isFunction(r[o].promise) ? r[o].promise().progress(c(o, n, t)).done(c(o, i, r)).fail(l.reject) : --s;
                        return s || l.resolveWith(i, r), l.promise()
                    }
                });
                var ye;
                re.fn.ready = function (e) {
                    return re.ready.promise().done(e), this
                }, re.extend({
                    isReady: !1, readyWait: 1, holdReady: function (e) {
                        e ? re.readyWait++ : re.ready(!0)
                    }, ready: function (e) {
                        (!0 === e ? --re.readyWait : re.isReady) || (re.isReady = !0, !0 !== e && --re.readyWait > 0 || (ye.resolveWith(Q, [re]), re.fn.triggerHandler && (re(Q).triggerHandler("ready"), re(Q).off("ready"))))
                    }
                }), re.ready.promise = function (t) {
                    return ye || (ye = re.Deferred(), "complete" === Q.readyState || "loading" !== Q.readyState && !Q.documentElement.doScroll ? e.setTimeout(re.ready) : (Q.addEventListener("DOMContentLoaded", a), e.addEventListener("load", a))), ye.promise(t)
                }, re.ready.promise();
                var $e = function (e, t, n, i, o, r, a) {
                    var s = 0, l = e.length, c = null == n;
                    if ("object" === re.type(n)) {
                        o = !0;
                        for (s in n)$e(e, t, s, n[s], !0, r, a)
                    } else if (void 0 !== i && (o = !0, re.isFunction(i) || (a = !0), c && (a ? (t.call(e, i), t = null) : (c = t, t = function (e, t, n) {
                            return c.call(re(e), n)
                        })), t))for (; s < l; s++)t(e[s], n, a ? i : i.call(e[s], s, t(e[s], n)));
                    return o ? e : c ? t.call(e) : l ? t(e[0], n) : r
                }, _e = function (e) {
                    return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
                };
                s.uid = 1, s.prototype = {
                    register: function (e, t) {
                        var n = t || {};
                        return e.nodeType ? e[this.expando] = n : Object.defineProperty(e, this.expando, {
                            value: n,
                            writable: !0,
                            configurable: !0
                        }), e[this.expando]
                    }, cache: function (e) {
                        if (!_e(e))return {};
                        var t = e[this.expando];
                        return t || (t = {}, _e(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                            value: t,
                            configurable: !0
                        }))), t
                    }, set: function (e, t, n) {
                        var i, o = this.cache(e);
                        if ("string" == typeof t) o[t] = n; else for (i in t)o[i] = t[i];
                        return o
                    }, get: function (e, t) {
                        return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][t]
                    }, access: function (e, t, n) {
                        var i;
                        return void 0 === t || t && "string" == typeof t && void 0 === n ? (i = this.get(e, t), void 0 !== i ? i : this.get(e, re.camelCase(t))) : (this.set(e, t, n), void 0 !== n ? n : t)
                    }, remove: function (e, t) {
                        var n, i, o, r = e[this.expando];
                        if (void 0 !== r) {
                            if (void 0 === t) this.register(e); else {
                                re.isArray(t) ? i = t.concat(t.map(re.camelCase)) : (o = re.camelCase(t), t in r ? i = [t, o] : (i = o, i = i in r ? [i] : i.match(we) || [])), n = i.length;
                                for (; n--;)delete r[i[n]]
                            }
                            (void 0 === t || re.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
                        }
                    }, hasData: function (e) {
                        var t = e[this.expando];
                        return void 0 !== t && !re.isEmptyObject(t)
                    }
                };
                var Ce = new s, ke = new s, Te = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, je = /[A-Z]/g;
                re.extend({
                    hasData: function (e) {
                        return ke.hasData(e) || Ce.hasData(e)
                    }, data: function (e, t, n) {
                        return ke.access(e, t, n)
                    }, removeData: function (e, t) {
                        ke.remove(e, t)
                    }, _data: function (e, t, n) {
                        return Ce.access(e, t, n)
                    }, _removeData: function (e, t) {
                        Ce.remove(e, t)
                    }
                }), re.fn.extend({
                    data: function (e, t) {
                        var n, i, o, r = this[0], a = r && r.attributes;
                        if (void 0 === e) {
                            if (this.length && (o = ke.get(r), 1 === r.nodeType && !Ce.get(r, "hasDataAttrs"))) {
                                for (n = a.length; n--;)a[n] && (i = a[n].name, 0 === i.indexOf("data-") && (i = re.camelCase(i.slice(5)), l(r, i, o[i])));
                                Ce.set(r, "hasDataAttrs", !0)
                            }
                            return o
                        }
                        return "object" == typeof e ? this.each(function () {
                            ke.set(this, e)
                        }) : $e(this, function (t) {
                            var n, i;
                            if (r && void 0 === t) {
                                if (void 0 !== (n = ke.get(r, e) || ke.get(r, e.replace(je, "-$&").toLowerCase())))return n;
                                if (i = re.camelCase(e), void 0 !== (n = ke.get(r, i)))return n;
                                if (void 0 !== (n = l(r, i, void 0)))return n
                            } else i = re.camelCase(e), this.each(function () {
                                var n = ke.get(this, i);
                                ke.set(this, i, t), e.indexOf("-") > -1 && void 0 !== n && ke.set(this, e, t)
                            })
                        }, null, t, arguments.length > 1, null, !0)
                    }, removeData: function (e) {
                        return this.each(function () {
                            ke.remove(this, e)
                        })
                    }
                }), re.extend({
                    queue: function (e, t, n) {
                        var i;
                        if (e)return t = (t || "fx") + "queue", i = Ce.get(e, t), n && (!i || re.isArray(n) ? i = Ce.access(e, t, re.makeArray(n)) : i.push(n)), i || []
                    }, dequeue: function (e, t) {
                        t = t || "fx";
                        var n = re.queue(e, t), i = n.length, o = n.shift(), r = re._queueHooks(e, t), a = function () {
                            re.dequeue(e, t)
                        };
                        "inprogress" === o && (o = n.shift(), i--), o && ("fx" === t && n.unshift("inprogress"), delete r.stop, o.call(e, a, r)), !i && r && r.empty.fire()
                    }, _queueHooks: function (e, t) {
                        var n = t + "queueHooks";
                        return Ce.get(e, n) || Ce.access(e, n, {
                                empty: re.Callbacks("once memory").add(function () {
                                    Ce.remove(e, [t + "queue", n])
                                })
                            })
                    }
                }), re.fn.extend({
                    queue: function (e, t) {
                        var n = 2;
                        return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? re.queue(this[0], e) : void 0 === t ? this : this.each(function () {
                            var n = re.queue(this, e, t);
                            re._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && re.dequeue(this, e)
                        })
                    }, dequeue: function (e) {
                        return this.each(function () {
                            re.dequeue(this, e)
                        })
                    }, clearQueue: function (e) {
                        return this.queue(e || "fx", [])
                    }, promise: function (e, t) {
                        var n, i = 1, o = re.Deferred(), r = this, a = this.length, s = function () {
                            --i || o.resolveWith(r, [r])
                        };
                        for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;)(n = Ce.get(r[a], e + "queueHooks")) && n.empty && (i++, n.empty.add(s));
                        return s(), o.promise(t)
                    }
                });
                var Se = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                    De = new RegExp("^(?:([+-])=|)(" + Se + ")([a-z%]*)$", "i"),
                    Ee = ["Top", "Right", "Bottom", "Left"], Fe = function (e, t) {
                        return e = t || e, "none" === re.css(e, "display") || !re.contains(e.ownerDocument, e)
                    }, Ae = /^(?:checkbox|radio)$/i, Oe = /<([\w:-]+)/, He = /^$|\/(?:java|ecma)script/i, qe = {
                        option: [1, "<select multiple='multiple'>", "</select>"],
                        thead: [1, "<table>", "</table>"],
                        col: [2, "<table><colgroup>", "</colgroup></table>"],
                        tr: [2, "<table><tbody>", "</tbody></table>"],
                        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                        _default: [0, "", ""]
                    };
                qe.optgroup = qe.option, qe.tbody = qe.tfoot = qe.colgroup = qe.caption = qe.thead, qe.th = qe.td;
                var Ie = /<|&#?\w+;/;
                !function () {
                    var e = Q.createDocumentFragment(), t = e.appendChild(Q.createElement("div")),
                        n = Q.createElement("input");
                    n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), oe.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", oe.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
                }();
                var ze = /^key/, Le = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, Ne = /^([^.]*)(?:\.(.+)|)/;
                re.event = {
                    global: {},
                    add: function (e, t, n, i, o) {
                        var r, a, s, l, c, d, u, f, p, h, m, g = Ce.get(e);
                        if (g)for (n.handler && (r = n, n = r.handler, o = r.selector), n.guid || (n.guid = re.guid++), (l = g.events) || (l = g.events = {}), (a = g.handle) || (a = g.handle = function (t) {
                            return void 0 !== re && re.event.triggered !== t.type ? re.event.dispatch.apply(e, arguments) : void 0
                        }), t = (t || "").match(we) || [""], c = t.length; c--;)s = Ne.exec(t[c]) || [], p = m = s[1], h = (s[2] || "").split(".").sort(), p && (u = re.event.special[p] || {}, p = (o ? u.delegateType : u.bindType) || p, u = re.event.special[p] || {}, d = re.extend({
                            type: p,
                            origType: m,
                            data: i,
                            handler: n,
                            guid: n.guid,
                            selector: o,
                            needsContext: o && re.expr.match.needsContext.test(o),
                            namespace: h.join(".")
                        }, r), (f = l[p]) || (f = l[p] = [], f.delegateCount = 0, u.setup && !1 !== u.setup.call(e, i, h, a) || e.addEventListener && e.addEventListener(p, a)), u.add && (u.add.call(e, d), d.handler.guid || (d.handler.guid = n.guid)), o ? f.splice(f.delegateCount++, 0, d) : f.push(d), re.event.global[p] = !0)
                    },
                    remove: function (e, t, n, i, o) {
                        var r, a, s, l, c, d, u, f, p, h, m, g = Ce.hasData(e) && Ce.get(e);
                        if (g && (l = g.events)) {
                            for (t = (t || "").match(we) || [""], c = t.length; c--;)if (s = Ne.exec(t[c]) || [], p = m = s[1], h = (s[2] || "").split(".").sort(), p) {
                                for (u = re.event.special[p] || {}, p = (i ? u.delegateType : u.bindType) || p, f = l[p] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = r = f.length; r--;)d = f[r], !o && m !== d.origType || n && n.guid !== d.guid || s && !s.test(d.namespace) || i && i !== d.selector && ("**" !== i || !d.selector) || (f.splice(r, 1), d.selector && f.delegateCount--, u.remove && u.remove.call(e, d));
                                a && !f.length && (u.teardown && !1 !== u.teardown.call(e, h, g.handle) || re.removeEvent(e, p, g.handle), delete l[p])
                            } else for (p in l)re.event.remove(e, p + t[c], n, i, !0);
                            re.isEmptyObject(l) && Ce.remove(e, "handle events")
                        }
                    },
                    dispatch: function (e) {
                        e = re.event.fix(e);
                        var t, n, i, o, r, a = [], s = J.call(arguments),
                            l = (Ce.get(this, "events") || {})[e.type] || [], c = re.event.special[e.type] || {};
                        if (s[0] = e, e.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, e)) {
                            for (a = re.event.handlers.call(this, e, l), t = 0; (o = a[t++]) && !e.isPropagationStopped();)for (e.currentTarget = o.elem, n = 0; (r = o.handlers[n++]) && !e.isImmediatePropagationStopped();)e.rnamespace && !e.rnamespace.test(r.namespace) || (e.handleObj = r, e.data = r.data, void 0 !== (i = ((re.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, s)) && !1 === (e.result = i) && (e.preventDefault(), e.stopPropagation()));
                            return c.postDispatch && c.postDispatch.call(this, e), e.result
                        }
                    },
                    handlers: function (e, t) {
                        var n, i, o, r, a = [], s = t.delegateCount, l = e.target;
                        if (s && l.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))for (; l !== this; l = l.parentNode || this)if (1 === l.nodeType && (!0 !== l.disabled || "click" !== e.type)) {
                            for (i = [], n = 0; n < s; n++)r = t[n], o = r.selector + " ", void 0 === i[o] && (i[o] = r.needsContext ? re(o, this).index(l) > -1 : re.find(o, this, null, [l]).length), i[o] && i.push(r);
                            i.length && a.push({elem: l, handlers: i})
                        }
                        return s < t.length && a.push({elem: this, handlers: t.slice(s)}), a
                    },
                    props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                    fixHooks: {},
                    keyHooks: {
                        props: "char charCode key keyCode".split(" "), filter: function (e, t) {
                            return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
                        }
                    },
                    mouseHooks: {
                        props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                        filter: function (e, t) {
                            var n, i, o, r = t.button;
                            return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || Q, i = n.documentElement, o = n.body, e.pageX = t.clientX + (i && i.scrollLeft || o && o.scrollLeft || 0) - (i && i.clientLeft || o && o.clientLeft || 0), e.pageY = t.clientY + (i && i.scrollTop || o && o.scrollTop || 0) - (i && i.clientTop || o && o.clientTop || 0)), e.which || void 0 === r || (e.which = 1 & r ? 1 : 2 & r ? 3 : 4 & r ? 2 : 0), e
                        }
                    },
                    fix: function (e) {
                        if (e[re.expando])return e;
                        var t, n, i, o = e.type, r = e, a = this.fixHooks[o];
                        for (a || (this.fixHooks[o] = a = Le.test(o) ? this.mouseHooks : ze.test(o) ? this.keyHooks : {}), i = a.props ? this.props.concat(a.props) : this.props, e = new re.Event(r), t = i.length; t--;)n = i[t], e[n] = r[n];
                        return e.target || (e.target = Q), 3 === e.target.nodeType && (e.target = e.target.parentNode), a.filter ? a.filter(e, r) : e
                    },
                    special: {
                        load: {noBubble: !0}, focus: {
                            trigger: function () {
                                if (this !== m() && this.focus)return this.focus(), !1
                            }, delegateType: "focusin"
                        }, blur: {
                            trigger: function () {
                                if (this === m() && this.blur)return this.blur(), !1
                            }, delegateType: "focusout"
                        }, click: {
                            trigger: function () {
                                if ("checkbox" === this.type && this.click && re.nodeName(this, "input"))return this.click(), !1
                            }, _default: function (e) {
                                return re.nodeName(e.target, "a")
                            }
                        }, beforeunload: {
                            postDispatch: function (e) {
                                void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                            }
                        }
                    }
                }, re.removeEvent = function (e, t, n) {
                    e.removeEventListener && e.removeEventListener(t, n)
                }, re.Event = function (e, t) {
                    if (!(this instanceof re.Event))return new re.Event(e, t);
                    e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? p : h) : this.type = e, t && re.extend(this, t), this.timeStamp = e && e.timeStamp || re.now(), this[re.expando] = !0
                }, re.Event.prototype = {
                    constructor: re.Event,
                    isDefaultPrevented: h,
                    isPropagationStopped: h,
                    isImmediatePropagationStopped: h,
                    preventDefault: function () {
                        var e = this.originalEvent;
                        this.isDefaultPrevented = p, e && e.preventDefault()
                    },
                    stopPropagation: function () {
                        var e = this.originalEvent;
                        this.isPropagationStopped = p, e && e.stopPropagation()
                    },
                    stopImmediatePropagation: function () {
                        var e = this.originalEvent;
                        this.isImmediatePropagationStopped = p, e && e.stopImmediatePropagation(), this.stopPropagation()
                    }
                }, re.each({
                    mouseenter: "mouseover",
                    mouseleave: "mouseout",
                    pointerenter: "pointerover",
                    pointerleave: "pointerout"
                }, function (e, t) {
                    re.event.special[e] = {
                        delegateType: t, bindType: t, handle: function (e) {
                            var n, i = this, o = e.relatedTarget, r = e.handleObj;
                            return o && (o === i || re.contains(i, o)) || (e.type = r.origType, n = r.handler.apply(this, arguments), e.type = t), n
                        }
                    }
                }), re.fn.extend({
                    on: function (e, t, n, i) {
                        return g(this, e, t, n, i)
                    }, one: function (e, t, n, i) {
                        return g(this, e, t, n, i, 1)
                    }, off: function (e, t, n) {
                        var i, o;
                        if (e && e.preventDefault && e.handleObj)return i = e.handleObj, re(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
                        if ("object" == typeof e) {
                            for (o in e)this.off(o, t, e[o]);
                            return this
                        }
                        return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = h), this.each(function () {
                            re.event.remove(this, e, n, t)
                        })
                    }
                });
                var Be = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
                    Me = /<script|<style|<link/i, We = /checked\s*(?:[^=]|=\s*.checked.)/i, Pe = /^true\/(.*)/,
                    Ye = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
                re.extend({
                    htmlPrefilter: function (e) {
                        return e.replace(Be, "<$1></$2>")
                    }, clone: function (e, t, n) {
                        var i, o, r, a, s = e.cloneNode(!0), l = re.contains(e.ownerDocument, e);
                        if (!(oe.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || re.isXMLDoc(e)))for (a = d(s), r = d(e), i = 0, o = r.length; i < o; i++)y(r[i], a[i]);
                        if (t)if (n)for (r = r || d(e), a = a || d(s), i = 0, o = r.length; i < o; i++)w(r[i], a[i]); else w(e, s);
                        return a = d(s, "script"), a.length > 0 && u(a, !l && d(e, "script")), s
                    }, cleanData: function (e) {
                        for (var t, n, i, o = re.event.special, r = 0; void 0 !== (n = e[r]); r++)if (_e(n)) {
                            if (t = n[Ce.expando]) {
                                if (t.events)for (i in t.events)o[i] ? re.event.remove(n, i) : re.removeEvent(n, i, t.handle);
                                n[Ce.expando] = void 0
                            }
                            n[ke.expando] && (n[ke.expando] = void 0)
                        }
                    }
                }), re.fn.extend({
                    domManip: _, detach: function (e) {
                        return C(this, e, !0)
                    }, remove: function (e) {
                        return C(this, e)
                    }, text: function (e) {
                        return $e(this, function (e) {
                            return void 0 === e ? re.text(this) : this.empty().each(function () {
                                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                            })
                        }, null, e, arguments.length)
                    }, append: function () {
                        return _(this, arguments, function (e) {
                            if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                                b(this, e).appendChild(e)
                            }
                        })
                    }, prepend: function () {
                        return _(this, arguments, function (e) {
                            if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                                var t = b(this, e);
                                t.insertBefore(e, t.firstChild)
                            }
                        })
                    }, before: function () {
                        return _(this, arguments, function (e) {
                            this.parentNode && this.parentNode.insertBefore(e, this)
                        })
                    }, after: function () {
                        return _(this, arguments, function (e) {
                            this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                        })
                    }, empty: function () {
                        for (var e, t = 0; null != (e = this[t]); t++)1 === e.nodeType && (re.cleanData(d(e, !1)), e.textContent = "");
                        return this
                    }, clone: function (e, t) {
                        return e = null != e && e, t = null == t ? e : t, this.map(function () {
                            return re.clone(this, e, t)
                        })
                    }, html: function (e) {
                        return $e(this, function (e) {
                            var t = this[0] || {}, n = 0, i = this.length;
                            if (void 0 === e && 1 === t.nodeType)return t.innerHTML;
                            if ("string" == typeof e && !Me.test(e) && !qe[(Oe.exec(e) || ["", ""])[1].toLowerCase()]) {
                                e = re.htmlPrefilter(e);
                                try {
                                    for (; n < i; n++)t = this[n] || {}, 1 === t.nodeType && (re.cleanData(d(t, !1)), t.innerHTML = e);
                                    t = 0
                                } catch (e) {
                                }
                            }
                            t && this.empty().append(e)
                        }, null, e, arguments.length)
                    }, replaceWith: function () {
                        var e = [];
                        return _(this, arguments, function (t) {
                            var n = this.parentNode;
                            re.inArray(this, e) < 0 && (re.cleanData(d(this)), n && n.replaceChild(t, this))
                        }, e)
                    }
                }), re.each({
                    appendTo: "append",
                    prependTo: "prepend",
                    insertBefore: "before",
                    insertAfter: "after",
                    replaceAll: "replaceWith"
                }, function (e, t) {
                    re.fn[e] = function (e) {
                        for (var n, i = [], o = re(e), r = o.length - 1, a = 0; a <= r; a++)n = a === r ? this : this.clone(!0), re(o[a])[t](n), K.apply(i, n.get());
                        return this.pushStack(i)
                    }
                });
                var Re, Ve = {HTML: "block", BODY: "block"}, Ze = /^margin/,
                    Ue = new RegExp("^(" + Se + ")(?!px)[a-z%]+$", "i"), Xe = function (t) {
                        var n = t.ownerDocument.defaultView;
                        return n.opener || (n = e), n.getComputedStyle(t)
                    }, Qe = function (e, t, n, i) {
                        var o, r, a = {};
                        for (r in t)a[r] = e.style[r], e.style[r] = t[r];
                        o = n.apply(e, i || []);
                        for (r in t)e.style[r] = a[r];
                        return o
                    }, Je = Q.documentElement;
                !function () {
                    function t() {
                        s.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", s.innerHTML = "", Je.appendChild(a);
                        var t = e.getComputedStyle(s);
                        n = "1%" !== t.top, r = "2px" === t.marginLeft, i = "4px" === t.width, s.style.marginRight = "50%", o = "4px" === t.marginRight, Je.removeChild(a)
                    }

                    var n, i, o, r, a = Q.createElement("div"), s = Q.createElement("div");
                    s.style && (s.style.backgroundClip = "content-box", s.cloneNode(!0).style.backgroundClip = "", oe.clearCloneStyle = "content-box" === s.style.backgroundClip, a.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", a.appendChild(s), re.extend(oe, {
                        pixelPosition: function () {
                            return t(), n
                        }, boxSizingReliable: function () {
                            return null == i && t(), i
                        }, pixelMarginRight: function () {
                            return null == i && t(), o
                        }, reliableMarginLeft: function () {
                            return null == i && t(), r
                        }, reliableMarginRight: function () {
                            var t, n = s.appendChild(Q.createElement("div"));
                            return n.style.cssText = s.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", n.style.marginRight = n.style.width = "0", s.style.width = "1px", Je.appendChild(a), t = !parseFloat(e.getComputedStyle(n).marginRight), Je.removeChild(a), s.removeChild(n), t
                        }
                    }))
                }();
                var Ge = /^(none|table(?!-c[ea]).+)/,
                    Ke = {position: "absolute", visibility: "hidden", display: "block"},
                    et = {letterSpacing: "0", fontWeight: "400"}, tt = ["Webkit", "O", "Moz", "ms"],
                    nt = Q.createElement("div").style;
                re.extend({
                    cssHooks: {
                        opacity: {
                            get: function (e, t) {
                                if (t) {
                                    var n = j(e, "opacity");
                                    return "" === n ? "1" : n
                                }
                            }
                        }
                    },
                    cssNumber: {
                        animationIterationCount: !0,
                        columnCount: !0,
                        fillOpacity: !0,
                        flexGrow: !0,
                        flexShrink: !0,
                        fontWeight: !0,
                        lineHeight: !0,
                        opacity: !0,
                        order: !0,
                        orphans: !0,
                        widows: !0,
                        zIndex: !0,
                        zoom: !0
                    },
                    cssProps: {float: "cssFloat"},
                    style: function (e, t, n, i) {
                        if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                            var o, r, a, s = re.camelCase(t), l = e.style;
                            if (t = re.cssProps[s] || (re.cssProps[s] = D(s) || s), a = re.cssHooks[t] || re.cssHooks[s], void 0 === n)return a && "get" in a && void 0 !== (o = a.get(e, !1, i)) ? o : l[t];
                            r = typeof n, "string" === r && (o = De.exec(n)) && o[1] && (n = c(e, t, o), r = "number"), null != n && n === n && ("number" === r && (n += o && o[3] || (re.cssNumber[s] ? "" : "px")), oe.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, i)) || (l[t] = n))
                        }
                    },
                    css: function (e, t, n, i) {
                        var o, r, a, s = re.camelCase(t);
                        return t = re.cssProps[s] || (re.cssProps[s] = D(s) || s), a = re.cssHooks[t] || re.cssHooks[s], a && "get" in a && (o = a.get(e, !0, n)), void 0 === o && (o = j(e, t, i)), "normal" === o && t in et && (o = et[t]), "" === n || n ? (r = parseFloat(o), !0 === n || isFinite(r) ? r || 0 : o) : o
                    }
                }), re.each(["height", "width"], function (e, t) {
                    re.cssHooks[t] = {
                        get: function (e, n, i) {
                            if (n)return Ge.test(re.css(e, "display")) && 0 === e.offsetWidth ? Qe(e, Ke, function () {
                                return A(e, t, i)
                            }) : A(e, t, i)
                        }, set: function (e, n, i) {
                            var o, r = i && Xe(e),
                                a = i && F(e, t, i, "border-box" === re.css(e, "boxSizing", !1, r), r);
                            return a && (o = De.exec(n)) && "px" !== (o[3] || "px") && (e.style[t] = n, n = re.css(e, t)), E(e, n, a)
                        }
                    }
                }), re.cssHooks.marginLeft = S(oe.reliableMarginLeft, function (e, t) {
                    if (t)return (parseFloat(j(e, "marginLeft")) || e.getBoundingClientRect().left - Qe(e, {marginLeft: 0}, function () {
                            return e.getBoundingClientRect().left
                        })) + "px"
                }), re.cssHooks.marginRight = S(oe.reliableMarginRight, function (e, t) {
                    if (t)return Qe(e, {display: "inline-block"}, j, [e, "marginRight"])
                }), re.each({margin: "", padding: "", border: "Width"}, function (e, t) {
                    re.cssHooks[e + t] = {
                        expand: function (n) {
                            for (var i = 0, o = {}, r = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++)o[e + Ee[i] + t] = r[i] || r[i - 2] || r[0];
                            return o
                        }
                    }, Ze.test(e) || (re.cssHooks[e + t].set = E)
                }), re.fn.extend({
                    css: function (e, t) {
                        return $e(this, function (e, t, n) {
                            var i, o, r = {}, a = 0;
                            if (re.isArray(t)) {
                                for (i = Xe(e), o = t.length; a < o; a++)r[t[a]] = re.css(e, t[a], !1, i);
                                return r
                            }
                            return void 0 !== n ? re.style(e, t, n) : re.css(e, t)
                        }, e, t, arguments.length > 1)
                    }, show: function () {
                        return O(this, !0)
                    }, hide: function () {
                        return O(this)
                    }, toggle: function (e) {
                        return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                            Fe(this) ? re(this).show() : re(this).hide()
                        })
                    }
                }), re.Tween = H, H.prototype = {
                    constructor: H, init: function (e, t, n, i, o, r) {
                        this.elem = e, this.prop = n, this.easing = o || re.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = r || (re.cssNumber[n] ? "" : "px")
                    }, cur: function () {
                        var e = H.propHooks[this.prop];
                        return e && e.get ? e.get(this) : H.propHooks._default.get(this)
                    }, run: function (e) {
                        var t, n = H.propHooks[this.prop];
                        return this.options.duration ? this.pos = t = re.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : H.propHooks._default.set(this), this
                    }
                }, H.prototype.init.prototype = H.prototype, H.propHooks = {
                    _default: {
                        get: function (e) {
                            var t;
                            return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = re.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0)
                        }, set: function (e) {
                            re.fx.step[e.prop] ? re.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[re.cssProps[e.prop]] && !re.cssHooks[e.prop] ? e.elem[e.prop] = e.now : re.style(e.elem, e.prop, e.now + e.unit)
                        }
                    }
                }, H.propHooks.scrollTop = H.propHooks.scrollLeft = {
                    set: function (e) {
                        e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
                    }
                }, re.easing = {
                    linear: function (e) {
                        return e
                    }, swing: function (e) {
                        return .5 - Math.cos(e * Math.PI) / 2
                    }, _default: "swing"
                }, re.fx = H.prototype.init, re.fx.step = {};
                var it, ot, rt = /^(?:toggle|show|hide)$/, at = /queueHooks$/;
                re.Animation = re.extend(B, {
                    tweeners: {
                        "*": [function (e, t) {
                            var n = this.createTween(e, t);
                            return c(n.elem, e, De.exec(t), n), n
                        }]
                    }, tweener: function (e, t) {
                        re.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(we);
                        for (var n, i = 0, o = e.length; i < o; i++)n = e[i], B.tweeners[n] = B.tweeners[n] || [], B.tweeners[n].unshift(t)
                    }, prefilters: [L], prefilter: function (e, t) {
                        t ? B.prefilters.unshift(e) : B.prefilters.push(e)
                    }
                }), re.speed = function (e, t, n) {
                    var i = e && "object" == typeof e ? re.extend({}, e) : {
                        complete: n || !n && t || re.isFunction(e) && e,
                        duration: e,
                        easing: n && t || t && !re.isFunction(t) && t
                    };
                    return i.duration = re.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in re.fx.speeds ? re.fx.speeds[i.duration] : re.fx.speeds._default, null != i.queue && !0 !== i.queue || (i.queue = "fx"), i.old = i.complete, i.complete = function () {
                        re.isFunction(i.old) && i.old.call(this), i.queue && re.dequeue(this, i.queue)
                    }, i
                }, re.fn.extend({
                    fadeTo: function (e, t, n, i) {
                        return this.filter(Fe).css("opacity", 0).show().end().animate({opacity: t}, e, n, i)
                    }, animate: function (e, t, n, i) {
                        var o = re.isEmptyObject(e), r = re.speed(t, n, i), a = function () {
                            var t = B(this, re.extend({}, e), r);
                            (o || Ce.get(this, "finish")) && t.stop(!0)
                        };
                        return a.finish = a, o || !1 === r.queue ? this.each(a) : this.queue(r.queue, a)
                    }, stop: function (e, t, n) {
                        var i = function (e) {
                            var t = e.stop;
                            delete e.stop, t(n)
                        };
                        return "string" != typeof e && (n = t, t = e, e = void 0), t && !1 !== e && this.queue(e || "fx", []), this.each(function () {
                            var t = !0, o = null != e && e + "queueHooks", r = re.timers, a = Ce.get(this);
                            if (o) a[o] && a[o].stop && i(a[o]); else for (o in a)a[o] && a[o].stop && at.test(o) && i(a[o]);
                            for (o = r.length; o--;)r[o].elem !== this || null != e && r[o].queue !== e || (r[o].anim.stop(n), t = !1, r.splice(o, 1));
                            !t && n || re.dequeue(this, e)
                        })
                    }, finish: function (e) {
                        return !1 !== e && (e = e || "fx"), this.each(function () {
                            var t, n = Ce.get(this), i = n[e + "queue"], o = n[e + "queueHooks"], r = re.timers,
                                a = i ? i.length : 0;
                            for (n.finish = !0, re.queue(this, e, []), o && o.stop && o.stop.call(this, !0), t = r.length; t--;)r[t].elem === this && r[t].queue === e && (r[t].anim.stop(!0), r.splice(t, 1));
                            for (t = 0; t < a; t++)i[t] && i[t].finish && i[t].finish.call(this);
                            delete n.finish
                        })
                    }
                }), re.each(["toggle", "show", "hide"], function (e, t) {
                    var n = re.fn[t];
                    re.fn[t] = function (e, i, o) {
                        return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(I(t, !0), e, i, o)
                    }
                }), re.each({
                    slideDown: I("show"),
                    slideUp: I("hide"),
                    slideToggle: I("toggle"),
                    fadeIn: {opacity: "show"},
                    fadeOut: {opacity: "hide"},
                    fadeToggle: {opacity: "toggle"}
                }, function (e, t) {
                    re.fn[e] = function (e, n, i) {
                        return this.animate(t, e, n, i)
                    }
                }), re.timers = [], re.fx.tick = function () {
                    var e, t = 0, n = re.timers;
                    for (it = re.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1);
                    n.length || re.fx.stop(), it = void 0
                }, re.fx.timer = function (e) {
                    re.timers.push(e), e() ? re.fx.start() : re.timers.pop()
                }, re.fx.interval = 13, re.fx.start = function () {
                    ot || (ot = e.setInterval(re.fx.tick, re.fx.interval))
                }, re.fx.stop = function () {
                    e.clearInterval(ot), ot = null
                }, re.fx.speeds = {slow: 600, fast: 200, _default: 400}, re.fn.delay = function (t, n) {
                    return t = re.fx ? re.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function (n, i) {
                        var o = e.setTimeout(n, t);
                        i.stop = function () {
                            e.clearTimeout(o)
                        }
                    })
                }, function () {
                    var e = Q.createElement("input"), t = Q.createElement("select"),
                        n = t.appendChild(Q.createElement("option"));
                    e.type = "checkbox", oe.checkOn = "" !== e.value, oe.optSelected = n.selected, t.disabled = !0, oe.optDisabled = !n.disabled, e = Q.createElement("input"), e.value = "t", e.type = "radio", oe.radioValue = "t" === e.value
                }();
                var st, lt = re.expr.attrHandle;
                re.fn.extend({
                    attr: function (e, t) {
                        return $e(this, re.attr, e, t, arguments.length > 1)
                    }, removeAttr: function (e) {
                        return this.each(function () {
                            re.removeAttr(this, e)
                        })
                    }
                }), re.extend({
                    attr: function (e, t, n) {
                        var i, o, r = e.nodeType;
                        if (3 !== r && 8 !== r && 2 !== r)return void 0 === e.getAttribute ? re.prop(e, t, n) : (1 === r && re.isXMLDoc(e) || (t = t.toLowerCase(), o = re.attrHooks[t] || (re.expr.match.bool.test(t) ? st : void 0)), void 0 !== n ? null === n ? void re.removeAttr(e, t) : o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : o && "get" in o && null !== (i = o.get(e, t)) ? i : (i = re.find.attr(e, t), null == i ? void 0 : i))
                    }, attrHooks: {
                        type: {
                            set: function (e, t) {
                                if (!oe.radioValue && "radio" === t && re.nodeName(e, "input")) {
                                    var n = e.value;
                                    return e.setAttribute("type", t), n && (e.value = n), t
                                }
                            }
                        }
                    }, removeAttr: function (e, t) {
                        var n, i, o = 0, r = t && t.match(we);
                        if (r && 1 === e.nodeType)for (; n = r[o++];)i = re.propFix[n] || n, re.expr.match.bool.test(n) && (e[i] = !1), e.removeAttribute(n)
                    }
                }), st = {
                    set: function (e, t, n) {
                        return !1 === t ? re.removeAttr(e, n) : e.setAttribute(n, n), n
                    }
                }, re.each(re.expr.match.bool.source.match(/\w+/g), function (e, t) {
                    var n = lt[t] || re.find.attr;
                    lt[t] = function (e, t, i) {
                        var o, r;
                        return i || (r = lt[t], lt[t] = o, o = null != n(e, t, i) ? t.toLowerCase() : null, lt[t] = r), o
                    }
                });
                var ct = /^(?:input|select|textarea|button)$/i, dt = /^(?:a|area)$/i;
                re.fn.extend({
                    prop: function (e, t) {
                        return $e(this, re.prop, e, t, arguments.length > 1)
                    }, removeProp: function (e) {
                        return this.each(function () {
                            delete this[re.propFix[e] || e]
                        })
                    }
                }), re.extend({
                    prop: function (e, t, n) {
                        var i, o, r = e.nodeType;
                        if (3 !== r && 8 !== r && 2 !== r)return 1 === r && re.isXMLDoc(e) || (t = re.propFix[t] || t, o = re.propHooks[t]), void 0 !== n ? o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : e[t] = n : o && "get" in o && null !== (i = o.get(e, t)) ? i : e[t]
                    }, propHooks: {
                        tabIndex: {
                            get: function (e) {
                                var t = re.find.attr(e, "tabindex");
                                return t ? parseInt(t, 10) : ct.test(e.nodeName) || dt.test(e.nodeName) && e.href ? 0 : -1
                            }
                        }
                    }, propFix: {for: "htmlFor", class: "className"}
                }), oe.optSelected || (re.propHooks.selected = {
                    get: function (e) {
                        var t = e.parentNode;
                        return t && t.parentNode && t.parentNode.selectedIndex, null
                    }
                }), re.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
                    re.propFix[this.toLowerCase()] = this
                });
                var ut = /[\t\r\n\f]/g;
                re.fn.extend({
                    addClass: function (e) {
                        var t, n, i, o, r, a, s, l = 0;
                        if (re.isFunction(e))return this.each(function (t) {
                            re(this).addClass(e.call(this, t, M(this)))
                        });
                        if ("string" == typeof e && e)for (t = e.match(we) || []; n = this[l++];)if (o = M(n), i = 1 === n.nodeType && (" " + o + " ").replace(ut, " ")) {
                            for (a = 0; r = t[a++];)i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                            s = re.trim(i), o !== s && n.setAttribute("class", s)
                        }
                        return this
                    }, removeClass: function (e) {
                        var t, n, i, o, r, a, s, l = 0;
                        if (re.isFunction(e))return this.each(function (t) {
                            re(this).removeClass(e.call(this, t, M(this)))
                        });
                        if (!arguments.length)return this.attr("class", "");
                        if ("string" == typeof e && e)for (t = e.match(we) || []; n = this[l++];)if (o = M(n), i = 1 === n.nodeType && (" " + o + " ").replace(ut, " ")) {
                            for (a = 0; r = t[a++];)for (; i.indexOf(" " + r + " ") > -1;)i = i.replace(" " + r + " ", " ");
                            s = re.trim(i), o !== s && n.setAttribute("class", s)
                        }
                        return this
                    }, toggleClass: function (e, t) {
                        var n = typeof e;
                        return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : re.isFunction(e) ? this.each(function (n) {
                            re(this).toggleClass(e.call(this, n, M(this), t), t)
                        }) : this.each(function () {
                            var t, i, o, r;
                            if ("string" === n)for (i = 0, o = re(this), r = e.match(we) || []; t = r[i++];)o.hasClass(t) ? o.removeClass(t) : o.addClass(t); else void 0 !== e && "boolean" !== n || (t = M(this), t && Ce.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : Ce.get(this, "__className__") || ""))
                        })
                    }, hasClass: function (e) {
                        var t, n, i = 0;
                        for (t = " " + e + " "; n = this[i++];)if (1 === n.nodeType && (" " + M(n) + " ").replace(ut, " ").indexOf(t) > -1)return !0;
                        return !1
                    }
                });
                var ft = /\r/g;
                re.fn.extend({
                    val: function (e) {
                        var t, n, i, o = this[0];
                        {
                            if (arguments.length)return i = re.isFunction(e), this.each(function (n) {
                                var o;
                                1 === this.nodeType && (o = i ? e.call(this, n, re(this).val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : re.isArray(o) && (o = re.map(o, function (e) {
                                        return null == e ? "" : e + ""
                                    })), (t = re.valHooks[this.type] || re.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, o, "value") || (this.value = o))
                            });
                            if (o)return (t = re.valHooks[o.type] || re.valHooks[o.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(o, "value")) ? n : (n = o.value, "string" == typeof n ? n.replace(ft, "") : null == n ? "" : n)
                        }
                    }
                }), re.extend({
                    valHooks: {
                        option: {
                            get: function (e) {
                                return re.trim(e.value)
                            }
                        }, select: {
                            get: function (e) {
                                for (var t, n, i = e.options, o = e.selectedIndex, r = "select-one" === e.type || o < 0, a = r ? null : [], s = r ? o + 1 : i.length, l = o < 0 ? s : r ? o : 0; l < s; l++)if (n = i[l], (n.selected || l === o) && (oe.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !re.nodeName(n.parentNode, "optgroup"))) {
                                    if (t = re(n).val(), r)return t;
                                    a.push(t)
                                }
                                return a
                            }, set: function (e, t) {
                                for (var n, i, o = e.options, r = re.makeArray(t), a = o.length; a--;)i = o[a], (i.selected = re.inArray(re.valHooks.option.get(i), r) > -1) && (n = !0);
                                return n || (e.selectedIndex = -1), r
                            }
                        }
                    }
                }), re.each(["radio", "checkbox"], function () {
                    re.valHooks[this] = {
                        set: function (e, t) {
                            if (re.isArray(t))return e.checked = re.inArray(re(e).val(), t) > -1
                        }
                    }, oe.checkOn || (re.valHooks[this].get = function (e) {
                        return null === e.getAttribute("value") ? "on" : e.value
                    })
                });
                var pt = /^(?:focusinfocus|focusoutblur)$/;
                re.extend(re.event, {
                    trigger: function (t, n, i, o) {
                        var r, a, s, l, c, d, u, f = [i || Q], p = ie.call(t, "type") ? t.type : t,
                            h = ie.call(t, "namespace") ? t.namespace.split(".") : [];
                        if (a = s = i = i || Q, 3 !== i.nodeType && 8 !== i.nodeType && !pt.test(p + re.event.triggered) && (p.indexOf(".") > -1 && (h = p.split("."), p = h.shift(), h.sort()), c = p.indexOf(":") < 0 && "on" + p, t = t[re.expando] ? t : new re.Event(p, "object" == typeof t && t), t.isTrigger = o ? 2 : 3, t.namespace = h.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : re.makeArray(n, [t]), u = re.event.special[p] || {}, o || !u.trigger || !1 !== u.trigger.apply(i, n))) {
                            if (!o && !u.noBubble && !re.isWindow(i)) {
                                for (l = u.delegateType || p, pt.test(l + p) || (a = a.parentNode); a; a = a.parentNode)f.push(a), s = a;
                                s === (i.ownerDocument || Q) && f.push(s.defaultView || s.parentWindow || e)
                            }
                            for (r = 0; (a = f[r++]) && !t.isPropagationStopped();)t.type = r > 1 ? l : u.bindType || p, d = (Ce.get(a, "events") || {})[t.type] && Ce.get(a, "handle"), d && d.apply(a, n), (d = c && a[c]) && d.apply && _e(a) && (t.result = d.apply(a, n), !1 === t.result && t.preventDefault());
                            return t.type = p, o || t.isDefaultPrevented() || u._default && !1 !== u._default.apply(f.pop(), n) || !_e(i) || c && re.isFunction(i[p]) && !re.isWindow(i) && (s = i[c], s && (i[c] = null), re.event.triggered = p, i[p](), re.event.triggered = void 0, s && (i[c] = s)), t.result
                        }
                    }, simulate: function (e, t, n) {
                        var i = re.extend(new re.Event, n, {type: e, isSimulated: !0});
                        re.event.trigger(i, null, t), i.isDefaultPrevented() && n.preventDefault()
                    }
                }), re.fn.extend({
                    trigger: function (e, t) {
                        return this.each(function () {
                            re.event.trigger(e, t, this)
                        })
                    }, triggerHandler: function (e, t) {
                        var n = this[0];
                        if (n)return re.event.trigger(e, t, n, !0)
                    }
                }), re.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
                    re.fn[t] = function (e, n) {
                        return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
                    }
                }), re.fn.extend({
                    hover: function (e, t) {
                        return this.mouseenter(e).mouseleave(t || e)
                    }
                }), oe.focusin = "onfocusin" in e, oe.focusin || re.each({
                    focus: "focusin",
                    blur: "focusout"
                }, function (e, t) {
                    var n = function (e) {
                        re.event.simulate(t, e.target, re.event.fix(e))
                    };
                    re.event.special[t] = {
                        setup: function () {
                            var i = this.ownerDocument || this, o = Ce.access(i, t);
                            o || i.addEventListener(e, n, !0), Ce.access(i, t, (o || 0) + 1)
                        }, teardown: function () {
                            var i = this.ownerDocument || this, o = Ce.access(i, t) - 1;
                            o ? Ce.access(i, t, o) : (i.removeEventListener(e, n, !0), Ce.remove(i, t))
                        }
                    }
                });
                var ht = e.location, mt = re.now(), gt = /\?/;
                re.parseJSON = function (e) {
                    return JSON.parse(e + "")
                }, re.parseXML = function (t) {
                    var n;
                    if (!t || "string" != typeof t)return null;
                    try {
                        n = (new e.DOMParser).parseFromString(t, "text/xml")
                    } catch (e) {
                        n = void 0
                    }
                    return n && !n.getElementsByTagName("parsererror").length || re.error("Invalid XML: " + t), n
                };
                var bt = /#.*$/, vt = /([?&])_=[^&]*/, xt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
                    wt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, yt = /^(?:GET|HEAD)$/,
                    $t = /^\/\//, _t = {}, Ct = {}, kt = "*/".concat("*"), Tt = Q.createElement("a");
                Tt.href = ht.href, re.extend({
                    active: 0, lastModified: {}, etag: {}, ajaxSettings: {
                        url: ht.href,
                        type: "GET",
                        isLocal: wt.test(ht.protocol),
                        global: !0,
                        processData: !0,
                        async: !0,
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        accepts: {
                            "*": kt,
                            text: "text/plain",
                            html: "text/html",
                            xml: "application/xml, text/xml",
                            json: "application/data, text/javascript"
                        },
                        contents: {xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/},
                        responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
                        converters: {
                            "* text": String,
                            "text html": !0,
                            "text json": re.parseJSON,
                            "text xml": re.parseXML
                        },
                        flatOptions: {url: !0, context: !0}
                    }, ajaxSetup: function (e, t) {
                        return t ? Y(Y(e, re.ajaxSettings), t) : Y(re.ajaxSettings, e)
                    }, ajaxPrefilter: W(_t), ajaxTransport: W(Ct), ajax: function (t, n) {
                        function i(t, n, i, s) {
                            var c, u, v, x, y, $ = n;
                            2 !== w && (w = 2, l && e.clearTimeout(l), o = void 0, a = s || "", _.readyState = t > 0 ? 4 : 0, c = t >= 200 && t < 300 || 304 === t, i && (x = R(f, _, i)), x = V(f, x, _, c), c ? (f.ifModified && (y = _.getResponseHeader("Last-Modified"), y && (re.lastModified[r] = y), (y = _.getResponseHeader("etag")) && (re.etag[r] = y)), 204 === t || "HEAD" === f.type ? $ = "nocontent" : 304 === t ? $ = "notmodified" : ($ = x.state, u = x.data, v = x.error, c = !v)) : (v = $, !t && $ || ($ = "error", t < 0 && (t = 0))), _.status = t, _.statusText = (n || $) + "", c ? m.resolveWith(p, [u, $, _]) : m.rejectWith(p, [_, $, v]), _.statusCode(b), b = void 0, d && h.trigger(c ? "ajaxSuccess" : "ajaxError", [_, f, c ? u : v]), g.fireWith(p, [_, $]), d && (h.trigger("ajaxComplete", [_, f]), --re.active || re.event.trigger("ajaxStop")))
                        }

                        "object" == typeof t && (n = t, t = void 0), n = n || {};
                        var o, r, a, s, l, c, d, u, f = re.ajaxSetup({}, n), p = f.context || f,
                            h = f.context && (p.nodeType || p.jquery) ? re(p) : re.event, m = re.Deferred(),
                            g = re.Callbacks("once memory"), b = f.statusCode || {}, v = {}, x = {}, w = 0,
                            y = "canceled", _ = {
                                readyState: 0, getResponseHeader: function (e) {
                                    var t;
                                    if (2 === w) {
                                        if (!s)for (s = {}; t = xt.exec(a);)s[t[1].toLowerCase()] = t[2];
                                        t = s[e.toLowerCase()]
                                    }
                                    return null == t ? null : t
                                }, getAllResponseHeaders: function () {
                                    return 2 === w ? a : null
                                }, setRequestHeader: function (e, t) {
                                    var n = e.toLowerCase();
                                    return w || (e = x[n] = x[n] || e, v[e] = t), this
                                }, overrideMimeType: function (e) {
                                    return w || (f.mimeType = e), this
                                }, statusCode: function (e) {
                                    var t;
                                    if (e)if (w < 2)for (t in e)b[t] = [b[t], e[t]]; else _.always(e[_.status]);
                                    return this
                                }, abort: function (e) {
                                    var t = e || y;
                                    return o && o.abort(t), i(0, t), this
                                }
                            };
                        if (m.promise(_).complete = g.add, _.success = _.done, _.error = _.fail, f.url = ((t || f.url || ht.href) + "").replace(bt, "").replace($t, ht.protocol + "//"), f.type = n.method || n.type || f.method || f.type, f.dataTypes = re.trim(f.dataType || "*").toLowerCase().match(we) || [""], null == f.crossDomain) {
                            c = Q.createElement("a");
                            try {
                                c.href = f.url, c.href = c.href, f.crossDomain = Tt.protocol + "//" + Tt.host != c.protocol + "//" + c.host
                            } catch (e) {
                                f.crossDomain = !0
                            }
                        }
                        if (f.data && f.processData && "string" != typeof f.data && (f.data = re.param(f.data, f.traditional)), _.xThen = function (e) {
                                var t = this, n = t.then(function (t, i) {
                                    if (t) {
                                        var o;
                                        return 1 == t.flag ? (o = e(t)) && o.readyState && (n._ajaxUrl = o._ajaxUrl, n._ajaxParams = o._ajaxParams, n._ajaxComplete = o._ajaxComplete) : $.ajax.unDone(t, i, f.url, f.data), o
                                    }
                                }, function (e, t) {
                                    e && $.ajax.serverErrHandle(e, t, f.url)
                                }).always(function () {
                                    t._ajaxComplete && t._ajaxComplete()
                                });
                                return n
                            }, _._ajaxUrl = f.url, _._ajaxParams = f.data, P(_t, f, n, _), 2 === w)return _;
                        d = re.event && f.global, d && 0 == re.active++ && re.event.trigger("ajaxStart"), f.type = f.type.toUpperCase(), f.hasContent = !yt.test(f.type), r = f.url, f.hasContent || (f.data && (r = f.url += (gt.test(r) ? "&" : "?") + f.data, delete f.data), !1 === f.cache && (f.url = vt.test(r) ? r.replace(vt, "$1_=" + mt++) : r + (gt.test(r) ? "&" : "?") + "_=" + mt++)), f.ifModified && (re.lastModified[r] && _.setRequestHeader("If-Modified-Since", re.lastModified[r]), re.etag[r] && _.setRequestHeader("If-None-Match", re.etag[r])), (f.data && f.hasContent && !1 !== f.contentType || n.contentType) && _.setRequestHeader("Content-Type", f.contentType), _.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + kt + "; q=0.01" : "") : f.accepts["*"]);
                        for (u in f.headers)_.setRequestHeader(u, f.headers[u]);
                        if (f.beforeSend && (!1 === f.beforeSend.call(p, _, f) || 2 === w))return _.abort();
                        y = "abort";
                        for (u in{success: 1, error: 1, complete: 1})_[u](f[u]);
                        if (o = P(Ct, f, n, _)) {
                            if (_.readyState = 1, d && h.trigger("ajaxSend", [_, f]), 2 === w)return _;
                            f.async && f.timeout > 0 && (l = e.setTimeout(function () {
                                _.abort("timeout")
                            }, f.timeout));
                            try {
                                w = 1, o.send(v, i)
                            } catch (e) {
                                if (!(w < 2))throw e;
                                i(-1, e)
                            }
                        } else i(-1, "No Transport");
                        return _
                    }, getJSON: function (e, t, n) {
                        return re.get(e, t, n, "json")
                    }, getScript: function (e, t) {
                        return re.get(e, void 0, t, "script")
                    }
                }), re.each(["get", "post"], function (e, t) {
                    re[t] = function (e, n, i, o) {
                        return re.isFunction(n) && (o = o || i, i = n, n = void 0), re.ajax(re.extend({
                            url: e,
                            type: t,
                            dataType: o,
                            data: n,
                            success: i
                        }, re.isPlainObject(e) && e))
                    }
                }), re._evalUrl = function (e) {
                    return re.ajax({url: e, type: "GET", dataType: "script", async: !1, global: !1, throws: !0})
                }, re.fn.extend({
                    wrapAll: function (e) {
                        var t;
                        return re.isFunction(e) ? this.each(function (t) {
                            re(this).wrapAll(e.call(this, t))
                        }) : (this[0] && (t = re(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                            for (var e = this; e.firstElementChild;)e = e.firstElementChild;
                            return e
                        }).append(this)), this)
                    }, wrapInner: function (e) {
                        return re.isFunction(e) ? this.each(function (t) {
                            re(this).wrapInner(e.call(this, t))
                        }) : this.each(function () {
                            var t = re(this), n = t.contents();
                            n.length ? n.wrapAll(e) : t.append(e)
                        })
                    }, wrap: function (e) {
                        var t = re.isFunction(e);
                        return this.each(function (n) {
                            re(this).wrapAll(t ? e.call(this, n) : e)
                        })
                    }, unwrap: function () {
                        return this.parent().each(function () {
                            re.nodeName(this, "body") || re(this).replaceWith(this.childNodes)
                        }).end()
                    }
                }), re.expr.filters.hidden = function (e) {
                    return !re.expr.filters.visible(e)
                }, re.expr.filters.visible = function (e) {
                    return e.offsetWidth > 0 || e.offsetHeight > 0 || e.getClientRects().length > 0
                };
                var jt = /%20/g, St = /\[\]$/, Dt = /\r?\n/g, Et = /^(?:submit|button|image|reset|file)$/i,
                    Ft = /^(?:input|select|textarea|keygen)/i;
                re.param = function (e, t) {
                    var n, i = [], o = function (e, t) {
                        t = re.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                    };
                    if (void 0 === t && (t = re.ajaxSettings && re.ajaxSettings.traditional), re.isArray(e) || e.jquery && !re.isPlainObject(e)) re.each(e, function () {
                        o(this.name, this.value)
                    }); else for (n in e)Z(n, e[n], t, o);
                    return i.join("&").replace(jt, "+")
                }, re.fn.extend({
                    serialize: function () {
                        return re.param(this.serializeArray())
                    }, serializeArray: function () {
                        return this.map(function () {
                            var e = re.prop(this, "elements");
                            return e ? re.makeArray(e) : this
                        }).filter(function () {
                            var e = this.type;
                            return this.name && !re(this).is(":disabled") && Ft.test(this.nodeName) && !Et.test(e) && (this.checked || !Ae.test(e))
                        }).map(function (e, t) {
                            var n = re(this).val();
                            return null == n ? null : re.isArray(n) ? re.map(n, function (e) {
                                return {name: t.name, value: e.replace(Dt, "\r\n")}
                            }) : {name: t.name, value: n.replace(Dt, "\r\n")}
                        }).get()
                    }
                }), re.ajaxSettings.xhr = function () {
                    try {
                        return new e.XMLHttpRequest
                    } catch (e) {
                    }
                };
                var At = {0: 200, 1223: 204}, Ot = re.ajaxSettings.xhr();
                oe.cors = !!Ot && "withCredentials" in Ot, oe.ajax = Ot = !!Ot, re.ajaxTransport(function (t) {
                    var n, i;
                    if (oe.cors || Ot && !t.crossDomain)return {
                        send: function (o, r) {
                            var a, s = t.xhr();
                            if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)for (a in t.xhrFields)s[a] = t.xhrFields[a];
                            t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || o["X-Requested-With"] || (o["X-Requested-With"] = "XMLHttpRequest");
                            for (a in o)s.setRequestHeader(a, o[a]);
                            n = function (e) {
                                return function () {
                                    n && (n = i = s.onload = s.onerror = s.onabort = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? r(0, "error") : r(s.status, s.statusText) : r(At[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {binary: s.response} : {text: s.responseText}, s.getAllResponseHeaders()))
                                }
                            }, s.onload = n(), i = s.onerror = n("error"), void 0 !== s.onabort ? s.onabort = i : s.onreadystatechange = function () {
                                4 === s.readyState && e.setTimeout(function () {
                                    n && i()
                                })
                            }, n = n("abort");
                            try {
                                s.send(t.hasContent && t.data || null)
                            } catch (e) {
                                if (n)throw e
                            }
                        }, abort: function () {
                            n && n()
                        }
                    }
                }), re.ajaxSetup({
                    accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
                    contents: {script: /\b(?:java|ecma)script\b/},
                    converters: {
                        "text script": function (e) {
                            return re.globalEval(e), e
                        }
                    }
                }), re.ajaxPrefilter("script", function (e) {
                    void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
                }), re.ajaxTransport("script", function (e) {
                    if (e.crossDomain) {
                        var t, n;
                        return {
                            send: function (i, o) {
                                t = re("<script>").prop({
                                    charset: e.scriptCharset,
                                    src: e.url
                                }).on("load error", n = function (e) {
                                    t.remove(), n = null, e && o("error" === e.type ? 404 : 200, e.type)
                                }), Q.head.appendChild(t[0])
                            }, abort: function () {
                                n && n()
                            }
                        }
                    }
                });
                var Ht = [], qt = /(=)\?(?=&|$)|\?\?/;
                re.ajaxSetup({
                    jsonp: "callback", jsonpCallback: function () {
                        var e = Ht.pop() || re.expando + "_" + mt++;
                        return this[e] = !0, e
                    }
                }), re.ajaxPrefilter("data jsonp", function (t, n, i) {
                    var o, r, a,
                        s = !1 !== t.jsonp && (qt.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && qt.test(t.data) && "data");
                    if (s || "jsonp" === t.dataTypes[0])return o = t.jsonpCallback = re.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(qt, "$1" + o) : !1 !== t.jsonp && (t.url += (gt.test(t.url) ? "&" : "?") + t.jsonp + "=" + o), t.converters["script json"] = function () {
                        return a || re.error(o + " was not called"), a[0]
                    }, t.dataTypes[0] = "json", r = e[o], e[o] = function () {
                        a = arguments
                    }, i.always(function () {
                        void 0 === r ? re(e).removeProp(o) : e[o] = r, t[o] && (t.jsonpCallback = n.jsonpCallback, Ht.push(o)), a && re.isFunction(r) && r(a[0]), a = r = void 0
                    }), "script"
                }), oe.createHTMLDocument = function () {
                    var e = Q.implementation.createHTMLDocument("").body;
                    return e.innerHTML = "<form></form><form></form>", 2 === e.childNodes.length
                }(), re.parseHTML = function (e, t, n) {
                    if (!e || "string" != typeof e)return null;
                    "boolean" == typeof t && (n = t, t = !1), t = t || (oe.createHTMLDocument ? Q.implementation.createHTMLDocument("") : Q);
                    var i = he.exec(e), o = !n && [];
                    return i ? [t.createElement(i[1])] : (i = f([e], t, o), o && o.length && re(o).remove(), re.merge([], i.childNodes))
                };
                var It = re.fn.load;
                re.fn.load = function (e, t, n) {
                    if ("string" != typeof e && It)return It.apply(this, arguments);
                    var i, o, r, a = this, s = e.indexOf(" ");
                    return s > -1 && (i = re.trim(e.slice(s)), e = e.slice(0, s)), re.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (o = "POST"), a.length > 0 && re.ajax({
                        url: e,
                        type: o || "GET",
                        dataType: "html",
                        data: t
                    }).done(function (e) {
                        r = arguments, a.html(i ? re("<div>").append(re.parseHTML(e)).find(i) : e)
                    }).always(n && function (e, t) {
                            a.each(function () {
                                n.apply(a, r || [e.responseText, t, e])
                            })
                        }), this
                }, re.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
                    re.fn[t] = function (e) {
                        return this.on(t, e)
                    }
                }), re.expr.filters.animated = function (e) {
                    return re.grep(re.timers, function (t) {
                        return e === t.elem
                    }).length
                }, re.offset = {
                    setOffset: function (e, t, n) {
                        var i, o, r, a, s, l, c, d = re.css(e, "position"), u = re(e), f = {};
                        "static" === d && (e.style.position = "relative"), s = u.offset(), r = re.css(e, "top"), l = re.css(e, "left"), c = ("absolute" === d || "fixed" === d) && (r + l).indexOf("auto") > -1, c ? (i = u.position(), a = i.top, o = i.left) : (a = parseFloat(r) || 0, o = parseFloat(l) || 0), re.isFunction(t) && (t = t.call(e, n, re.extend({}, s))), null != t.top && (f.top = t.top - s.top + a), null != t.left && (f.left = t.left - s.left + o), "using" in t ? t.using.call(e, f) : u.css(f)
                    }
                }, re.fn.extend({
                    offset: function (e) {
                        if (arguments.length)return void 0 === e ? this : this.each(function (t) {
                            re.offset.setOffset(this, e, t)
                        });
                        var t, n, i = this[0], o = {top: 0, left: 0}, r = i && i.ownerDocument;
                        if (r)return t = r.documentElement, re.contains(t, i) ? (o = i.getBoundingClientRect(), n = U(r), {
                            top: o.top + n.pageYOffset - t.clientTop,
                            left: o.left + n.pageXOffset - t.clientLeft
                        }) : o
                    }, position: function () {
                        if (this[0]) {
                            var e, t, n = this[0], i = {top: 0, left: 0};
                            return "fixed" === re.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), re.nodeName(e[0], "html") || (i = e.offset()), i.top += re.css(e[0], "borderTopWidth", !0) - e.scrollTop(), i.left += re.css(e[0], "borderLeftWidth", !0) - e.scrollLeft()), {
                                top: t.top - i.top - re.css(n, "marginTop", !0),
                                left: t.left - i.left - re.css(n, "marginLeft", !0)
                            }
                        }
                    }, offsetParent: function () {
                        return this.map(function () {
                            for (var e = this.offsetParent; e && "static" === re.css(e, "position");)e = e.offsetParent;
                            return e || Je
                        })
                    }
                }), re.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (e, t) {
                    var n = "pageYOffset" === t;
                    re.fn[e] = function (i) {
                        return $e(this, function (e, i, o) {
                            var r = U(e);
                            if (void 0 === o)return r ? r[t] : e[i];
                            r ? r.scrollTo(n ? r.pageXOffset : o, n ? o : r.pageYOffset) : e[i] = o
                        }, e, i, arguments.length)
                    }
                }), re.each(["top", "left"], function (e, t) {
                    re.cssHooks[t] = S(oe.pixelPosition, function (e, n) {
                        if (n)return n = j(e, t), Ue.test(n) ? re(e).position()[t] + "px" : n
                    })
                }), re.each({Height: "height", Width: "width"}, function (e, t) {
                    re.each({padding: "inner" + e, content: t, "": "outer" + e}, function (n, i) {
                        re.fn[i] = function (i, o) {
                            var r = arguments.length && (n || "boolean" != typeof i),
                                a = n || (!0 === i || !0 === o ? "margin" : "border");
                            return $e(this, function (t, n, i) {
                                var o;
                                return re.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? re.css(t, n, a) : re.style(t, n, i, a)
                            }, t, r ? i : void 0, r, null)
                        }
                    })
                }), re.fn.extend({
                    bind: function (e, t, n) {
                        return this.on(e, null, t, n)
                    }, unbind: function (e, t) {
                        return this.off(e, null, t)
                    }, delegate: function (e, t, n, i) {
                        return this.on(t, e, n, i)
                    }, undelegate: function (e, t, n) {
                        return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
                    }, size: function () {
                        return this.length
                    }
                }), re.fn.andSelf = re.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
                    return re
                });
                var zt = e.jQuery, Lt = e.$;
                return re.noConflict = function (t) {
                    return e.$ === re && (e.$ = Lt), t && e.jQuery === re && (e.jQuery = zt), re
                }, t || (e.jQuery = e.$ = re), re
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/jquery.js", "/lib")
    }, {"1YiZ5S": 4, buffer: 1}],
    43: [function (e, t, n) {
        (function (e, n, i, o, r, a, s, l, c) {
            String._overlook = String._overlook || String.symbol();
            var d = {done: Function.voidFn, fail: Function.voidFn, then: Function.voidFn, always: Function.voidFn},
                u = function (e) {
                    return null == e ? "" : e
                }, f = function (e, t, n, i) {
                    return "function" == typeof i ? e.valueAt(t, i) : e.valueAt(t, n)
                }, p = function (e, t, n) {
                    for (var i = e.split("."), o = i.length, r = t, a = 0; a < o; a++) {
                        var s = i[a], l = a == i.length - 1;
                        if ("function" == typeof r.hasOwnProperty && !r.hasOwnProperty(s) && void 0 !== r[s])throw new Error("can not set a prefix property is not ownProperty");
                        if (l) r[s] = n; else {
                            if (void 0 === r[s]) r[s] = Object.create(null); else if ("object" != typeof r[s] || null === r[s])throw new Error("can not set a prefix property is null or typeof Number,Boolean,Function");
                            r = r[s]
                        }
                    }
                    return t
                };
            t.exports = {
                xReady: function (e) {
                    var t = $(this), n = 5,
                        i = "string" == typeof arguments[arguments.length - 1] ? arguments[arguments.length - 1] : '[widget], [replace], [include], [behavior],.unready,  [dict-type]:not(".dict-ready"), [x-act]:not(".x-act-done"), .x-widget-loading',
                        o = t.is("table"), r = function () {
                            var a;
                            n > 12e3 && console.warn(["timeout over, the async data for docInit loading failed", a]), setTimeout(function () {
                                var n;
                                o ? n = !t.hasClass("fixing") : (a = t.find(i).add(t.filter(i)), a.length && console.log([a.length, a[0]]), n = 0 === a.length), n ? (t.removeClass("unready"), e && e.call(t)) : r()
                            }, n += n)
                        };
                    null === arguments[arguments.length - 1] ? e() : r()
                }, xLoad: function () {
                    var e, t, n, i;
                    "function" == typeof arguments[0] ? i = arguments[0] : (n = arguments[0], i = arguments[1]), this.each(function (o, r) {
                        var a = $(r), s = a.attr("x-act") || a.attr("x-act-wait"), l = a.is("select"),
                            c = a.is("[dict-type]");
                        e = window.makeAct(s.split("@")[0]), t = s.split("@")[1] || "get", a.removeClass("x-act-done").addClass("x-act-loading"), window["$" + t](e, n || null, function (e) {
                            l ? a.template(e.data) : a.hasClass("inline-select") ? a.inlineSelect(e.data) : c || a.xData(e.data), a.removeClass("x-act-loading").addClass("x-act-done"), "function" == typeof i && i()
                        }, !1, !1)
                    })
                }, xReset: function (e, t) {
                    return this.each(function (n, i) {
                        var o = $(i), r = o.data("current-data"), a = o.resetter(), s = o.xConfig() || {};
                        "function" == typeof a ? a.call(i, e, t) : o.is("select") ? t || !o.is("[x-list]") ? o.children().eq(0).prop("selected", !0) : o.template([], s.helper, s.allowHTML) : o.is("[x-form]") ? o.find("[x-name]").add(o.attr("x-outside")).xReset(e, !0) : o.is("[x-form-list]") ? o.children("[x-form]").xReset(e, !0) : o.is("[x-tree]") ? o.xtree(o.data("xtree-data")) : o.is("[x-table]") ? o.table([]) : o.is("[x-map]") || o.is("[x-tp]") || o.is("[tpsource]") ? o.template({}, s.helper, s.allowHTML) : o.is("[x-list]") ? o.template([], s.helper, s.allowHTML) : r ? o.template("array" === typeOf(r) ? [] : {}, s.helper, s.allowHTML) : o.is(":checkbox") || o.is(":radio") ? i.checked = !1 : o.is(":input") ? o.val("") : o.is("img") ? i.src = "" : o.html("")
                    })
                }, xState: function () {
                    return 0 == arguments.length ? $(this).getState() : "string" == typeof arguments[0] && 1 == arguments.length ? $(this).getState(arguments[0]) : "string" == typeof arguments[0] && 2 == arguments.length ? $(this).setState(arguments[0], arguments[1]) : void 0
                }, getState: function (e) {
                    return this[0] ? this.xState : void 0
                }, setState: function (e) {
                    if ("string" != typeof e)throw new Error("the state must be a string!");
                    return this.each(function () {
                        var t = $(this), n = t.xStateHandle() || $module(t.attr("x-state-handle"));
                        this.xState = e, "function" == typeof n ? n(e) : n[e] && n[e]()
                    }), this
                }, xStateHandle: function (e) {
                    if (!arguments.length)return $(this).data("x-state-handle");
                    $(this).data("x-state-handle", e)
                }, xVal: function (e, t) {
                    if (0 == arguments.length) {
                        var n = $(this), i = n.data("current-data"), o = n.extractor();
                        return "function" == typeof o ? o.call(n, null) : n.is("[x-form]") || n.is("[x-form-list]") ? n.checkOut() : n.is("[x-tree]") ? n.data("xtree-data") : i || n.is("[x-table]") || n.is("[x-map]") || n.is("[x-tp]") || n.is("[x-list]") ? i : n.is(":checkbox") || n.is(":radio") ? "number" == n[0].getAttribute("data-return") ? ~~n[0].checked : n[0].checked : n.is(":input") ? n[0].value : n.is("img") ? n[0].src : n.html()
                    }
                    return this.each(function () {
                        var n = this, i = $(n), o = i.data("current-data"), r = i.injector(), a = i.xConfig() || {};
                        if ("function" == typeof r)return r.apply(i, [e, null, t]);
                        if (i.is("[x-form]") || i.is("[x-form-list]")) i.checkIn(e); else if (i.is("[x-tree]")) i.xtree(e); else if (o && o === e && !t); else if (i.is("[x-map]")) i.checkIn(e, !0); else if (i.is("[x-table]")) i.table(e); else if (i.is("[x-tp]") || i.is("[x-list]") || i.is("[tpsource]")) i.template(e, a.helper, a.allowHTML, e); else {
                            if ("object" == typeOf(e))throw console.warn([i, e]), new Error("the val is an object, but the ele is not a x-ct, the injector is undefined---sth for how to use the object");
                            i.is(":checkbox") || i.is(":radio") ? i[0].checked = [!0, "true", 1, "1"].includes(e) : i.is(":file") ? isFalseVal(e) && i.val("") : i.is("select") && i.prop("multiple") ? (e = "string" == typeof e ? e.split(",") : [].concat(e), e.forEach(function (e) {
                                i.children("option").each(function (t) {
                                    t.selected = t.value == e
                                })
                            })) : i.is(":input") ? i.val(e) : i.is("img") ? i[0].src = e : i.html(null == e ? "" : e)
                        }
                        i.closest("[x-form]").attr("x-up-time", +new Date)
                    }), this
                }, xData: function () {
                    var e = arguments;
                    return 0 == e.length ? this.getData() : "function" == typeof e[0] ? this.upData(e[0], e[1]) : this.setData(e[0], e[1])
                }, setData: function (e, t) {
                    return this.each(function () {
                        var n = $(this), i = n.data("x-couple");
                        i ? (console.log([this.tagName + "通过couple设值", e, this]), i.set(e, t)) : n.xVal(e, t)
                    }), this
                }, getData: function () {
                    var e = this.data("x-couple");
                    return e ? e.get() : this.xVal()
                }, upData: function (e, t) {
                    return this.each(function () {
                        var n = $(this), i = n.data("x-couple");
                        if (i) i.update(e, t); else {
                            var o, r = this.getData();
                            t ? r && r.each(e) : (o = e(r), r = void 0 === o ? r : o), this.setData(r)
                        }
                    }), this
                }, checkIn: function (e, t) {
                    return "array" === typeOf(e) ? (this.filter("[x-form-list]").each(function (t, n) {
                        $(n).children("[x-form]").each(function (t, n) {
                            $(n).checkIn(e[t])
                        })
                    }), this) : (this.filter("[x-form],[x-map]").each(function (n, i) {
                        var o = $(i), r = o.attr("x-outside"), a = o.find("[x-name],[x-key]");
                        if (0 == a.length && o.is("[x-map]")) {
                            o.find("*").each(function (n, i) {
                                [].slice.call(i.attributes).each(function (n) {
                                    var o = i.getAttribute(n);
                                    "string" == typeof o && o && ("#" == o[0] && (o = o.replace(/^#/, "replace4compile#ID")), i.setAttribute(n, window.$compile(o, e, t).replace(/^replace4compile#ID/, "#")))
                                }), 0 == i.children.length && (i.innerHTML = window.$compile(i.innerHTML, e, t))
                            })
                        }
                        (r ? a.add($(r)) : a).each(function (n, i) {
                            var r = $(i);
                            if (!o.is("[x-form]") || r.closest("[x-form]")[0] === o[0]) {
                                var a, s = r.attr("x-name") || r.attr("x-key");
                                a = "x-key" == s ? f(s, e, t) : f(s, e, t, u);
                                var l = r.injector();
                                "function" == typeof l ? l.call(r, a, e) : r.is("select") ? r.val(a) : r.xVal(a)
                            }
                        }), o.is("[x-map]") && o.data("current-data", e)
                    }), this)
                }, checkOut: function (e) {
                    if (0 == this.filter("[x-form],[x-form-list]").length)return console.info(["the selector has no x-form elements", this]), !1;
                    if (!this.eq(0).is("[x-form]") && !this.eq(0).is("[x-form-list]"))throw console.info(this), new Error("the element is not a [x-form]");
                    var t = this.eq(0);
                    if (t.is("[x-form-list]")) {
                        var n = [];
                        return t.children("[x-form]").each(function (e, t) {
                            n.push($(t).checkOut())
                        }), JSON.clone(n)
                    }
                    if (!t.is("[x-form]"))throw console.info(this), new Error("the element is not a [x-form]");
                    var i = t.attr("x-outside"), o = t.data("x-form-obj"), r = t.find("[x-name]");
                    if (o)for (var a in o)o.hasOwnProperty(a) && (o[a] = String._overlook); else o = {}, t.data("x-form-obj", o);
                    (i ? r.add($(i)) : r).each(function (e, n) {
                        var r = $(n);
                        if (r.is(i) || r.closest("[x-form]")[0] === t[0]) {
                            var a, s = r.extractor(), l = r.attr("x-name");
                            if ("function" == typeof s) {
                                var c = s.call(r, o, l);
                                void 0 === c || (o[l] = c)
                            } else a = r.is("select") ? r.val() : r.xVal(), p(l, o, a)
                        }
                    });
                    for (var a in o)!o.hasOwnProperty(a) || null != o[a] && o[a] != $._overlook || (o[a] = "");
                    return JSON.clone(o)
                }, xScanDis: function () {
                    var e, t, n, i = this.find("[x-hide],[x-show]");
                    return "string" == typeof arguments[0] ? (e = arguments[0], t = arguments[1], i.each(function (n, i) {
                        var o = $(i), r = o.attr("x-hide"), a = o.attr("x-show");
                        o.attr("x-remove") === e && t ? o.remove() : (r === e && o.toggleClass("hide-plus", t), a === e && o.toggleClass("x-show-on", t))
                    })) : (n = arguments[0], i.each(function (e, t) {
                        var i = $(t), o = i.attr("x-hide"), r = i.attr("x-show"), a = i.attr("x-remove");
                        a && n.get(a) ? i.remove() : (o && i.toggleClass("hide-plus", n.get(o)), r && i.toggleClass("x-show-on", n.get(r)))
                    })), this
                }, xSubContent: function (e, t) {
                    var n = this;
                    if (!n.is("tr"))throw new Error("this is not a tr!");
                    "string" == typeof e && "#" === e[0] && (e = $($(e).html())), n.each(function (n, i) {
                        var o = $(i), r = $(this).closest("table"),
                            a = ($(this).closest("tbody"), $('<td colspan="{0}"><div class="x-sub-ct"></div></td>'.format(o.children().length))),
                            s = a.children(), l = a.wrap('<tr class="x-sub-tr">').parent();
                        if ("yes" != o.attr("x-sub-ct-show")) {
                            r.find(">tbody>tr").attr("x-sub-ct-show", "no"), o.attr("x-sub-ct-show", "yes"), $(e).addClass("hide").appendTo("body"), r.find(">tbody>.x-sub-tr").remove();
                            var c = document.body.scrollTop;
                            l.insertAfter(o), $(e).appendTo(s).removeClass("hide"), document.body.scrollTop = c, "function" == typeof t && t.call(s, !0)
                        } else r.find(">tbody>tr").attr("x-sub-ct-show", "no"), o.attr("x-sub-ct-show", "no"), r.find(".x-sub-ct").children().addClass("hide").appendTo("body"), r.find(">tbody>.x-sub-tr").remove(), "function" == typeof t && t.call(s, !1);
                        return e
                    })
                }, xPromise: function (e) {
                    return arguments.length ? this.data("x-promise", e) : this.data("x-promise") || d
                }, xDone: function (e) {
                    return this.xPromise().done().apply(null, arguments)
                }, xThen: function (e) {
                    return this.xPromise().then().apply(null, arguments)
                }, xFail: function (e) {
                    return this.xPromise().fail().apply(null, arguments)
                }, xAlways: function (e) {
                    return this.xPromise().always().apply(null, arguments)
                }, xHasBind: function () {
                    return this.data("x-couple")
                }, xRemoveAttrExceptTheme: function () {
                    return this.each(function (e, t) {
                        [].slice.call(t.attributes).each(function (e) {
                            "class" != e.name && "style" != e.name && t.removeAttribute(e.name)
                        })
                    }), this
                }, xCheckedList: function (e) {
                    var t, n = $(this), i = n.find(">tbody>tr>td .xtp-check-tr:checked").toArray();
                    return "array" == typeOf(e) || (t = "tr" == e ? 'o=> $(o).closest("tr")[0]' : "data" == e ? 'o=> $(o).closest("tr").xVal()' : !0 === e ? 'o=> {index:o.getAttribute("tr-index"), rownum:o.getAttribute("tr-rownum") ,param:o.getAttribute("tr-param")} ' : 'o=>o.getAttribute("tr-{0}")'.format("string" == typeof e ? e : "param")), i.select(t)
                }, xCheckRow: function (e, t) {
                    $(this).find(">tbody, >table>tbody, >div>table>tbody, >.all-fix-wrap>div>table>tbody").children("tr:nth-child({0})".format(e + 1)).toggleClass("checked", t).find(">td:first :checkbox").prop("checked", t)
                }, xCss: function () {
                    var e = arguments;
                    if ("object" == typeof e[0])for (var t in e[0])this.xCss(t, e[0][t]); else this.each(function (t, n) {
                        var i = n.getAttribute("style") || "";
                        i.lastIndexOf(";") == i.length - 1 || (i += ";"), i += "{0}:{1}!important;".format(e[0], e[1]), n.setAttribute("style", i.split(";").reverse().distinct().reverse().join(";"))
                    });
                    return this
                }, xColsMap: function (e) {
                    return this.find(">thead>tr>th").filter(!0 === e ? ":not(:hidden)" : !1 === e ? ":hidden" : "*").toArray().select('th => th.getAttribute("col-map")')
                }, xHelper: function (e) {
                    return e ? $(this).data("helper", e) : $(this).data("helper")
                }, xMethod: function (e, t) {
                    var n = $(this).xConfig("method") || Object.create(null);
                    if ("function" == typeof t) n[e] = t, $(this).xConfig("method", n); else {
                        if ("object" != typeOf(e))return "string" == typeof e ? "function" == typeof n[e] ? n[e].bind(this) : void 0 : n;
                        $(this).xConfig("method", $.extend(n, e))
                    }
                }, xParams: function (e) {
                    return e ? $(this).attr("x-params", e ? obj2str(e) : "") : $lambda($(this).attr("x-params") || "{}")()
                }, xConfig: function () {
                    var e, t, n = $(this);
                    if (!arguments.length)return n.data("x-config");
                    if ("string" == typeof arguments[0]) {
                        if (e = arguments[0], t = n.data("x-config"), 1 == arguments.length)return t ? t[e] : null;
                        2 == arguments.length && (t ? t[e] = arguments[1] : (t = {}, t[e] = arguments[1], n.data("x-config", t)))
                    } else if ("object" == typeof arguments[0])if (!0 === arguments[1]) n.data("x-config", arguments[0]); else {
                        t = n.data("x-config") || {};
                        for (var i in arguments[0])t[i] = arguments[0][i]
                    }
                }, xValidate: function () {
                    var e = this.add(this.find(".validate"));
                    return e.validatebox(), !e.filter(".validatebox-invalid").length
                }, xHtml: function (e, t) {
                    var n = this;
                    return n.html(e), n.scanSubWidget(function () {
                        t && n.xScanDis(t)
                    })
                }, xAppend: function (e, t) {
                    var n = this;
                    return n.append(e), n.scanSubWidget(function () {
                        t && n.xScanDis(t)
                    })
                }, xAppendTo: function (e, t) {
                    return this.appendTo(e), $(e).scanSubWidget(function () {
                        t && $(e).xScanDis(t)
                    })
                }
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/jquery.xfn.js", "/lib")
    }, {"1YiZ5S": 4, buffer: 1}],
    44: [function (require, module, exports) {
        (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
            var $lambda = window.$lambda = function (e) {
                var t, n, i, o;
                if (!e)return function (e) {
                    return e
                };
                if ("function" == typeof e)return e;
                t = e.source ? e.source.replace(/^\s+|\s+$/g, "") : e.replace(/^\s+|\s+$/g, "");
                var n = t.indexOf("=>");
                return -1 == n ? new Function("return " + t) : (i = t.slice(0, n).replace(/\s+/gm, ""), o = t.slice(n + 2).replace(/^\s+|\s+$/g, ""), o = 0 == o.indexOf("<") ? o.slice(1, -1) : "return " + o, "args" == i && (o = "var args=arguments;" + o, i = ""), new Function(i, o))
            };
            module.exports = {
                indexAs: function (e) {
                    for (var t = this.length, n = 0; n < t; n++)if (JSON.equal(e, this[n]))return n;
                    return -1
                }, lastIndexAs: function (e) {
                    for (var t = this.length - 1; t > -1; t--)if (JSON.equal(e, this[t]))return t;
                    return -1
                }, each: function (e, t) {
                    return this.forEach($lambda(e), t), this
                }, remove: function (e) {
                    return this.splice(e, 1)
                }, has: function (e, t) {
                    return !1 === t ? this.indexOf(e) + 1 : this.indexAs(e) + 1
                }, any: function (e, t) {
                    return this.some($lambda(e), t)
                }, where: function (e, t) {
                    return this.filter($lambda(e), t)
                }, select: function (e, t) {
                    return this.map($lambda(e), t)
                }, update: function (e, t) {
                    return this.forEach(function (t, n, i) {
                        i[n] = $lambda(e)(t, n, i)
                    }, t), this
                }, distinct: function (e) {
                    var t, n;
                    for (t = this.length - 1; t > 0; t--)(n = e ? this.indexAs(this[t]) : this.indexOf(this[t])) > -1 && n < t && this.remove(t);
                    return this.where('x => typeof x !="undefined" ')
                }, orderby: function (e, t) {
                    var n, i = this.slice(), o = function (e) {
                        return e
                    }, r = {
                        number: function (e, t) {
                            return o(e) - o(t)
                        }, string: function (e, t) {
                            return o(e).localeCompare(o(t))
                        }, boolean: function (e, t) {
                            return !o(e)
                        }
                    };
                    if (this.length < 2)return i;
                    o = $lambda(e), n = r[typeof o(i[0])];
                    try {
                        i.sort(n || null)
                    } catch (e) {
                        throw new Error("排序失败,请检测方法和数组内容")
                    }
                    return t && i.reverse(), i
                }, max: function (e) {
                    var t, n = this.length, i = $lambda(e);
                    if (0 == n)return null;
                    if (1 == n)return this[0];
                    t = this[0];
                    for (var o = 1; o < n; o++)t = i(this[o]) > i(t) ? this[o] : t;
                    return t
                }, min: function (e) {
                    var t, n = this.length, i = $lambda(e);
                    if (0 == n)return null;
                    if (1 == n)return this[0];
                    t = this[0];
                    for (var o = 1; o < n; o++)t = i(this[o]) < i(t) ? this[o] : t;
                    return t
                }, sum: function (e) {
                    var t, n = this.length, i = $lambda(e);
                    if (0 == n)return null;
                    if (1 == n)return i(this[0]);
                    t = i(this[0]);
                    for (var o = 1; o < n; o++)next = i(this[o]), t = null == t ? next : null == next ? t : t + next;
                    return t
                }, linq: function (query) {
                    var dataInfo = query.match(/\sfrom\s+([^\s]+\s+\w)/)[1].split(/\s+/), dataName = dataInfo[0],
                        dataMark = dataInfo[1], columns = [], where_clause = "", order_clause = "", desc = "",
                        cond = query.match(/\swhere\s+(.+)(order\sby){0,1}/);
                    if (cond.length && cond.length > 1) {
                        var clause = cond[1].split(" order by ");
                        where_clause = clause[0], clause.length > 1 && (order_clause = clause[1], (desc = " desc" == order_clause.slice(-5)) && (order_clause = order_clause.slice(0, -5)))
                    } else if (cond = query.match(new RegExp("\\s#\\s+*\\s+order\\sby(.+)".replace("#", dataName).replace("*", dataMark))), cond.length && cond.length > 1) {
                        var index = cond[0].indexOf(" order by ");
                        order_clause = cond[0].slice(index + 10)
                    }
                    where_clause.trim() && (where_clause = dataMark + "=>" + where_clause), order_clause.trim() && (order_clause = dataMark + "=>" + order_clause);
                    var cols = query.match(/^select\s+(.+)\s+from/);
                    if (cols.length && cols.length > 1)if (cols = cols[1].trim(), "*" == cols.trim()) columns[0] = ""; else {
                        columns = cols.split(/,\s+/gm);
                        for (var j = columns.length, i = 0; i < j; i++)columns[i] = dataMark + "=>" + columns[i]
                    }
                    return eval("var data=" + dataName), function () {
                        return [].select.apply(data.where(where_clause).orderby(order_clause, desc), columns)
                    }
                }
            }
        }).call(this, require("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/lambda.js", "/lib")
    }, {"1YiZ5S": 4, buffer: 1}],
    45: [function (e, t, n) {
        (function (e, n, i, o, r, a, s, l, c) {
            var d = "@prj:" + window.getPrjName() + "-", u = function (e) {
                var t = {}, n = function (e, n, i) {
                    return t.set(e + n, i)
                }, i = function (e, n, i) {
                    return t.get(e + n, i)
                }, o = {
                    set: function (e, t) {
                        return e = d + e, localStorage["params@" + e] = t, !0
                    }, get: function (e) {
                        return e = d + e, localStorage["params@" + e]
                    }
                };
                e.push("global");
                for (var r = 0; r < e.length; r++) {
                    var a = "global" == e[r] ? "" : e[r] + "@";
                    o[dash2camel(e[r])] = {
                        get: function (e) {
                            return function (t, n) {
                                return i(e, t)
                            }
                        }(a), set: function (e) {
                            return function (t, i) {
                                return n(e, t, i)
                            }
                        }(a)
                    }
                }
                t.extending(o), window.extending({localParams: t}), window.localParams = window.localParams
            }, f = {};
            f.extending({
                set: function (e, t) {
                    if (e = d + e, null == t && (localStorage[e] = "null"), "string" == typeof t && (localStorage[e] = t), "number" == typeof t && (localStorage[e] = "[number]:" + t), "boolean" == typeof t && (localStorage[e] = "[boolean]:" + t), "date" == typeOf(t)) localStorage[e] = "[date]:" + t.getTime(); else try {
                        localStorage[e] = JSON.stringify(t)
                    } catch (n) {
                        localStorage[e] = String(t)
                    }
                    return !0
                }, get: function (e) {
                    e = d + e;
                    var t, n = localStorage[e];
                    if ("string" != typeof n)return n;
                    if ("null" === n)return null;
                    if (0 == n.indexOf("[number]:"))return +n.slice(9);
                    if (0 == n.indexOf("[boolean]:"))return "true" === n.slice(10);
                    if (0 == n.indexOf("[date]:"))return new Date(+n.slice(7));
                    try {
                        t = JSON.parse(n)
                    } catch (e) {
                        t = String(n)
                    }
                    return t
                }
            });
            var p = function () {
                window === _top && window.extending({
                    registry: function () {
                        for (var e = {}, t = 0; t < window.molDatas.length; t++)!e.hasOwnProperty(dash2camel(window.molDatas[t].molNo)) && e.extending(dash2camel(window.molDatas[t].molNo), {});
                        return e.extending("global", {}), !e.xcgl && e.extending("xcgl", {}), e
                    }()
                })
            };
            t.exports = {localData: f, localParamsInit: u, registryInit: p}
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/locals.js", "/lib")
    }, {"1YiZ5S": 4, buffer: 1}],
    46: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            !function () {
                var e = window.getDistPath() + "mock/", t = window.config.mockActions;
                for (var n in t)t[n] = e + (t[n] || n).replace(/\//g, "-") + ".json"
            }()
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/mock-register.js", "/lib")
    }, {"1YiZ5S": 4, buffer: 1}],
    47: [function (e, t, n) {
        (function (e, n, i, o, r, a, s, l, c) {
            function d() {
                var e, t;
                if ("object" == typeof arguments[0]) {
                    t = arguments[0];
                    var n, i = $('script[src*="run="]');
                    if (i.length) {
                        var o = queryParse(i[0].src).run;
                        if ("pageNo" !== o) n = t[o]; else {
                            var r = _top.currentPageNo || (window.frameElement ? window.frameElement.getAttribute("page-no") : "");
                            r && window !== _top && (n = t[dash2camel(r)])
                        }
                        "function" == typeof n && n()
                    }
                } else {
                    if ("string" == typeof arguments[0] && 1 == arguments.length)return m(arguments[0], u);
                    if ("string" == typeof arguments[0])return e = arguments[0], t = arguments[1], "object" == typeof u[e] && "object" == typeof t && null !== u[e] && null !== t ? p(u[e], t) : h(e, t, u), d
                }
            }

            var u = Object.create(null), f = Object.prototype.hasOwnProperty, p = function (e, t) {
                Object.keys(t).forEach(function (n) {
                    e[n] = t[n]
                })
            }, h = function (e, t, n) {
                for (var i = e.split("."), o = i.length, r = n, a = 0; a < o; a++) {
                    var s = i[a], l = a == i.length - 1;
                    if (!f.call(r, s) && void 0 !== r[s])throw new Error("can not set a prefix property which is not ownProperty");
                    if (l) r[s] = t; else {
                        if (void 0 === r[s]) r[s] = Object.create(null); else if ("object" != typeof r[s] || null === r[s])throw new Error("can not set a prefix property which is null or typeof Number,Boolean,Function");
                        r = r[s]
                    }
                }
                return n
            }, m = function (e, t) {
                var n = e.indexOf("."), i = e.slice(0, n), o = e.slice(n + 1);
                return -1 === n ? t[e] : m(o, t[i])
            };
            t.exports = {$module: d, deepSet: h, deepGet: m}
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/module.js", "/lib")
    }, {"1YiZ5S": 4, buffer: 1}],
    48: [function (e, t, n) {
        (function (e, n, i, o, r, a, s, l, c) {
            var n = window, d = n.importing, u = Object.create(null), f = !0, p = {
                go: function (e) {
                    var t = u[e], n = t.importing || [], i = t.view, o = !i.match(/\.htm$|\.htm\?/);
                    return p.current = _top.currentPageNo = e, o ? (p.ct.addClass("hide-plus").empty(), p.frame.removeClass("hide-plus"), p.frame[0].src = getViewPath(i.trim()), p.frame.attr("page-no", e)) : (p.getCache() || $source(i, null), d.apply(null, n.concat(i).concat(function () {
                        p.frame.addClass("hide-plus"), p.ct.empty().removeClass("hide-plus").tpsource(i).template(), d.resetWidgetScan(!1), d.call(p.ct, function (e) {
                            "function" == typeof t.init && t.init.call(p.ct.children(), e)
                        })
                    }))), p
                }, on: function (e, t) {
                    return "string" == typeof arguments[1] && (t = {view: arguments[1]}), u[e] ? $.extend(u[e], t) : u[e] = t, p
                }, current: null, ct: null, frame: null, setCtFrame: function (e, t) {
                    return p.ct = e, p.frame = t, p
                }, getCache: function () {
                    return f
                }, setCache: function (e) {
                    return f = e
                }
            };
            t.exports = p
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/naving.state.js", "/lib")
    }, {"1YiZ5S": 4, buffer: 1}],
    49: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            !function (e) {
                e.PaginationCalculator = function (e, t) {
                    this.maxentries = e, this.opts = t
                }, e.extend(e.PaginationCalculator.prototype, {
                    numPages: function () {
                        return Math.ceil(this.maxentries / this.opts.pageOnce)
                    }, getInterval: function (e) {
                        var t = Math.floor(this.opts.num_display_entries / 2), n = this.numPages(),
                            i = n - this.opts.num_display_entries;
                        return {
                            start: e > t ? Math.max(Math.min(e - t, i), 0) : 0,
                            end: e > t ? Math.min(e + t + this.opts.num_display_entries % 2, n) : Math.min(this.opts.num_display_entries, n)
                        }
                    }
                }), e.PaginationRenderers = {}, e.PaginationRenderers.defaultRenderer = function (t, n) {
                    this.maxentries = t, this.opts = n, this.pc = new e.PaginationCalculator(t, n)
                }, e.extend(e.PaginationRenderers.defaultRenderer.prototype, {
                    createLink: function (t, n, i) {
                        var o, r = this.pc.numPages();
                        return t = t < 0 ? 0 : t < r ? t : r - 1, i = e.extend({
                            text: t + 1,
                            classes: ""
                        }, i || {}), o = t == n ? e("<span class='current'>" + i.text + "</span>") : e("<a>" + i.text + "</a>").attr("href", this.opts.link_to.replace(/__id__/, t)), i.classes && o.addClass(i.classes), i.rel && o.attr("rel", i.rel), o.data("page_id", t), o
                    }, appendRange: function (e, t, n, i, o) {
                        var r;
                        for (r = n; r < i; r++)this.createLink(r, t, o).appendTo(e)
                    }, getLinks: function (t, n) {
                        var i, o, r = this.pc.getInterval(t), a = this.pc.numPages(), s = e("<div>");
                        return this.opts.prev_text && (t > 0 || this.opts.prev_show_always) && s.append(this.createLink(t - 1, t, {
                            text: this.opts.prev_text,
                            classes: "prev",
                            rel: "prev"
                        })), r.start > 0 && this.opts.num_edge_entries > 0 && (o = Math.min(this.opts.num_edge_entries, r.start), this.appendRange(s, t, 0, o, {classes: "sp"}), this.opts.num_edge_entries < r.start && this.opts.ellipse_text && e("<span>" + this.opts.ellipse_text + "</span>").appendTo(s)), this.appendRange(s, t, r.start, r.end), r.end < a && this.opts.num_edge_entries > 0 && (a - this.opts.num_edge_entries > r.end && this.opts.ellipse_text && e("<span>" + this.opts.ellipse_text + "</span>").appendTo(s), i = Math.max(a - this.opts.num_edge_entries, r.end), this.appendRange(s, t, i, a, {classes: "ep"})), this.opts.next_text && (t < a - 1 || this.opts.next_show_always) && s.append(this.createLink(t + 1, t, {
                            text: this.opts.next_text,
                            classes: "next",
                            rel: "next"
                        })), e("a", s).click(n), s
                    }
                }), e.fn._pagination = function (t, n) {
                    function i(t) {
                        var n = e(t.target).data("page_id"), i = o(n);
                        return i || t.stopPropagation(), i
                    }

                    function o(e) {
                        return u.data("currentPage", e), a = r.getLinks(e, i), c > d ? l.empty() : u.empty(), a.appendTo(l), n.callback(e, u)
                    }

                    n = e.extend({
                        pageOnce: 10,
                        num_display_entries: 11,
                        currentPage: 0,
                        num_edge_entries: 0,
                        link_to: "javascript:void(0);",
                        prev_text: "<",
                        next_text: ">",
                        ellipse_text: "...",
                        prev_show_always: !0,
                        next_show_always: !0,
                        renderer: "defaultRenderer",
                        show_if_single_page: !1,
                        loadFirstPage: !0,
                        callback: function () {
                            return !1
                        }
                    }, n || {});
                    var r, a, s, l, c = t, d = n.pageOnce, u = this;
                    if (u.children("div:not(.select-pageonce)").length || u.append("<div></div>"), l = u.children("div:not(.select-pageonce)"), s = parseInt(n.currentPage, 10), u.data("currentPage", s), t = !t || t < 0 ? 1 : t, n.pageOnce = !n.pageOnce || n.pageOnce < 0 ? 1 : n.pageOnce, !e.PaginationRenderers[n.renderer])throw new ReferenceError("Pagination renderer '" + n.renderer + "' was not found in jQuery.PaginationRenderers object.");
                    r = new e.PaginationRenderers[n.renderer](t, n);
                    var f = new e.PaginationCalculator(t, n), p = f.numPages();
                    return u.off("setPage").on("setPage", {numPages: p}, function (e, t) {
                        if (t >= 0 && t < e.data.numPages)return o(t), !1
                    }), u.off("prevPage").on("prevPage", function (t) {
                        var n = e(this).data("currentPage");
                        return n > 0 && o(n - 1), !1
                    }), u.off("nextPage").on("nextPage", {numPages: p}, function (t) {
                        var n = e(this).data("currentPage");
                        return n < t.data.numPages - 1 && o(n + 1), !1
                    }), u.off("currentPage").on("currentPage", function () {
                        return o(e(this).data("currentPage")), !1
                    }), a = r.getLinks(s, i), c > d ? l.empty() : u.empty(), (p > 1 || n.show_if_single_page) && a.appendTo(l), u.is(":empty") && a.appendTo(u), n.loadFirstPage && n.callback(s, u, !0), this
                }, e.fn.paging = function (t, n) {
                    this.children(".paging").empty();
                    "number" == typeof t && (t = {count: t});
                    var i = t.pageOnce = t.pageOnce || 10, o = t.currentPage || 0, r = e(this), a = {
                        pageOnce: i,
                        loadFirstPage: !1 !== t.loadFirstPage,
                        num_display_entries: t.num_display_entries || 5,
                        num_edge_entries: t.num_edge_entries || 1,
                        currentPage: o,
                        callback: function (o, a, s) {
                            var l = o * i, c = Math.min((o + 1) * i, t.count);
                            s && r.children(".paging").children(".select-pageonce").length && (r.children(".paging").children(".select-pageonce").children("select")[0].options.selected = !0), n(l + 1, c, s, o, i, t.count), !s && !1 !== t.autoHash && e(a.parent()[0].scrollIntoView()).hide().show()
                        }
                    };
                    r.children(".paging")._pagination(t.count, a), r.find(".total-count").html(t.count), t.name && r.find(".table-name,.list-name").html(t.name), r.find(".list-title-bar").show();
                    var s = e('<div class="select-pageonce"><label>每页显示</label><select name="datatable_length"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select>条</div>');
                    r.children(".paging").append(s);
                    for (var l = s.children("select")[0].options, c = 0; c < l.length; c++)if (l[c].value == i) {
                        l[c].selected = !0;
                        break
                    }
                    return s.children("select").on("change", function () {
                        t.pageOnce = +this.value, t.count = null, r.pagingList(t)
                    }), 0 == t.count && r.children(".select-pageonce").remove(), r
                };
                var t = {},
                    n = window.config.paingListCommonHTML || '<div class="new-color-bar list-title-bar"> <b>▌</b><u class="table-name"></u><span class="table-desc">共查找到<u class="total-count"></u>条数据</span></div><div class="search-result"  tpsource="#search-result-tp"></div><div class="paging"></div>',
                    i = function (e, t, n) {
                        var i = "";
                        if ("number" == typeof t && "number" == typeof e || (i = "缓存参数设置错误，非数字！"), t > e && (i = "缓存参数设置错误，单次缓存数大于总体缓存数!"), t < n && (i = "缓存参数设置错误，单次缓存数小于单页条数!"), i)throw new Error(i + " cacheMax,cacheOnce,pageOnce: " + [e, t, n].join(","));
                        return !0
                    }, o = function (e) {
                        t[e] = [], t[e].size = 0, t[e].time = (new Date).getTime()
                    }, r = function (e, n, i, r, a) {
                        a = a || 1, (r || t[e].size + i.length > n) && o(e);
                        for (var s = i.length - 1; s > -1; s--)t[e][a - 1 + s] = i[s];
                        return t[e].size += i.length, !0
                    };
                e.fn.setCache = function (t, n, i, o) {
                    var a = this[0].id || this.attr("cache-id");
                    return r(a, o || 1600, t, !1 !== i, n || 1), e(this)
                }, e.fn.pagingList = function (a) {
                    var s = this[0].id || this.attr("cache-id");
                    t[s] = [], t[s].size = 0;
                    var l = this, c = !1 !== a.newSearch, d = a.pageOnce || 10, u = (a.cacheOnce || 4) * d,
                        f = Math.min((a.cacheMax || 16) * d, window.config.pagingCacheMaxCount || 1600),
                        p = !1 !== a.useCache, h = a.begin || 1, m = a.end || h - 1 + d,
                        g = (a.name, a.action || a.url), b = a.jsonObj = a.jsonObj || Object.create(null),
                        v = a.params || a.data, x = a.callback, w = a.onerr || Function.voidFn,
                        y = a.method || a.type || "post";
                    a.commonHTML && l.html(n);
                    var $ = function (n, i, o, l) {
                        if (p ? (b.begin = Math.floor(o / u) * u + 1, b.end = b.begin + u - 1) : (b.pageSize = d, b.pageNum = Math.ceil(o / b.pageSize), b.begin = o, b.end = l), "string" == typeof b.jsonStr) {
                            var c = str2obj(b.jsonStr);
                            c.begin = b.begin, c.end = b.end, b.jsonStr = obj2str(c)
                        }
                        v = v || Object.create(null), "string" == typeof g && g.match(/\/mock\/.+\.json/i) && (y = "GET");
                        var h;
                        if (!1 !== a.loading) {
                            var m = a.beforeSend || Function.voidFn;
                            a.beforeSend = function () {
                                m.apply(null, arguments), h = showLoading()
                            }
                        }
                        var x = {token: "string" == typeof window.token ? window.token : localData.get("token")},
                            $ = localData.get("currentUser");
                        x.account = $ ? $.account : "", window.config && window.config.exToken && (x.exToken = window.config.exToken), window.config && window.config.systemid && (x.systemid = window.config.systemid), v = e.extend({}, v, b), v.fromPageHandle = a.fromPageHandle, !1 === a.useFromPageHandle && delete v.fromPageHandle, e.ajax(e.extend({
                            type: y || "POST",
                            url: g,
                            headers: x,
                            contentType: "application/json; charset=UTF-8",
                            dataType: "json",
                            data: "GET" == y ? v : obj2str(v)
                        }, a)).always(function (c, d) {
                            h && h.fadeOut && h.fadeOut(150), "success" == d ? (e.fn.pagingList.maxLengthExamine(c), c = str2obj(c), 1 == c.flag ? (p && r(s, f, c.data, !1, b.begin), i && a.extraCb && a.extraCb(c.extraRes, c), n(p ? {
                                flag: 1,
                                data: t[s].slice(o - 1, l),
                                totalCount: c.totalCount
                            } : c)) : -1 == c.flag ? (w(c), e.ajax.logoutHandle(c, d)) : (w(c), e.ajax.failHandle(c, d, g, v))) : 404 == c.status || e.ajax.serverErrHandle(c, d, g)
                        })
                    }, _ = function (e, n, i, r, l, c) {
                        if (a.fromPageHandle = "true", 0 == a.count)return x([], e, n, i, r, l, c), !1;
                        t[s].time + 18e4 > (new Date).getTime() || o(s), t[s][e - 1] && t[s][n - 1] ? x(t[s].slice(e - 1, n), e, n, !1, r, l, c) : $(function (t) {
                            x(t.data.slice(0, l), e, n, i, r, l, c)
                        }, i, e, n)
                    };
                    i(f, u, d), c && o(s), a.count ? l.paging(a, _) : $(function (e) {
                        a.count = e.totalCount, p ? l.paging(a, _) : (a.loadFirstPage = !1, l.paging(a, _), x(e.data, h, m, c, 0, d, a.count))
                    }, c, h, m);
                    var C = function (e, t) {
                        var n = this.getAttribute("sort-name"), i = this.getAttribute("sort-order") || "asc",
                            o = t.find(".native-fix-wrap>table");
                        if (o.length || (o = t.find("table")), o.data("table-config").cols.each(function (e) {
                                e.sortOrder = "", e.sort == n && (e.sortOrder = "asc" == i ? "desc" : "asc")
                            }), o.attr("sort-reg", "true"), !n)return !1;
                        e.jsonObj.sortName = n, e.jsonObj.sortOrder = i, e.fromPageHandle = "", t.pagingList(e), "desc" == i ? (t.find("[sort-name={0}]".format(n)).attr("sort-order", "asc"), t.find("[sort-name={0}]".format(n)).removeClass("sort-asc").addClass("sort-desc")) : (t.find("[sort-name={0}]".format(n)).attr("sort-order", "desc"), t.find("[sort-name={0}]".format(n)).removeClass("sort-desc").addClass("sort-asc"))
                    };
                    if (c && l.off("click", "[sort-name]").on("click", "[sort-name]", function () {
                            C.apply(this, [a, l])
                        }), !a.jsonObj.sortOrder) {
                        var k = l.find("[sort-reg]"), T = k.data("table-config");
                        T && T.cols.each('col => col.sortOrder="" ')
                    }
                    return l
                }, e.fn.pagingList.maxLengthExamine = function (e) {
                    if (!window.config.mock && ("string" == typeof e && e.length > 204800 || "array" == typeOf(e.data) && e.data.length > 2e3))return warn("result's length too long, check the end－begin,or other params wrong？"), !1
                }
            }(window.jQuery)
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/paging.js", "/lib")
    }, {"1YiZ5S": 4, buffer: 1}],
    50: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            !function () {
                window !== _top && !config.isLocal && (window.originSrc = window.iframe.getAttribute("o-src")) && location.pathname + location.search !== originSrc && (console.info(location.pathname + location.search), console.error("状态过期,请刷新页面\n" + originSrc), _top.document.body.innerHTML = "<br><h2>状态过期,请刷新页面\n</h2>");
                var e = function (e) {
                    var t = e || window.event, n = t.target || t.srcElement, i = n.type || n.getAttribute("type"),
                        o = n.hasAttribute("contenteditable"), r = n.getAttribute("readonly"),
                        a = n.getAttribute("enabled");
                    r = null != r && r, a = null == a || a;
                    var s = !(8 != t.keyCode || "password" != i && "text" != i && "textarea" != i || 1 != r && 1 == a);
                    return !(8 == t.keyCode && "password" != i && "text" != i && "textarea" != i && !o) && !s && void 0
                };
                document.onkeydown = e, $(".query-block").on("click", ".more-condition", function () {
                    var e = $(this), t = e[0].scrollHeight;
                    setTimeout(function () {
                        e[0].scrollHeight == t || $(".query-result").find(".native-fix-wrap>table").each(function () {
                            var e = $(this), t = e.attr("fixed-mode");
                            t && e.fixTable(t)
                        })
                    }, 500)
                })
            }()
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/patch.js", "/lib")
    }, {"1YiZ5S": 4, buffer: 1}],
    51: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            window.path = "string" == typeof window.path ? window.path : localData.get("path") || location.href.replace(/\/view\/.*/, "").replace(/\/dist/, "").replace(location.protocol + "//" + location.host, "") || "", window.getDistPath = function (e) {
                if (e = e || "", config.isLocal) {
                    var t = location.href, n = "", i = t.indexOf("/view/"), o = t.indexOf("/plugin/");
                    if (i > -1)for (i += 6; i < t.length; i++)"/" == t[i] && (n += "../"); else if (o > -1)for (o += 8; o < t.length; o++)"/" == t[o] && (n += "../");
                    return (location.pathname.match(/\/index\.html|\/login\.html|\\index\.html|\\login\.html/) ? "./" : n + "../") + e
                }
                return window.path + (config.useDistAsRoot ? "/" : "/dist/") + e
            }, window.getSrcPath = function (e) {
                return e.match(/^https?|^\.|^\//i) ? e : e.match(/.css$/i) ? window.getDistPath() + "css/" + e : e.match(/.js$/i) ? window.getDistPath() + "js/" + e : e.match(/.html?$/i) ? window.getDistPath() + "view/" + e : window.getDistPath() + e
            }, window.getViewPath = function (e, t) {
                var n;
                if (e.match(/^https?|^\.|^\//i))return e;
                n = t || (0 == e.indexOf("plugin/") ? window.getDistPath() : window.getDistPath("view/"));
                var i = n.indexOf("?") > -1 ? "&" : "?";
                return n + (e || "404.html") + i + "version=" + window.config.version
            }, window.getMap_server = function () {
                var e = localData.get("sysParams") ? localData.get("sysParams").defaultMapServer : "";
                if (!(e = e || window.config.mapServerPath))throw new Error("the mapServerPath is empty or undefined!");
                return e
            }, window.getWebsiteUrl = function (e) {
                return (window.config.subPrj[e] || {}).websitePath
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/path.js", "/lib")
    }, {"1YiZ5S": 4, buffer: 1}],
    52: [function (e, t, n) {
        (function (t, n, i, o, r, a, s, l, c) {
            e("./proto/json"), e("./proto/function"), e("./proto/string"), e("./proto/number"), e("./proto/array"), e("./proto/date")
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/proto.js", "/lib")
    }, {
        "./proto/array": 53,
        "./proto/date": 54,
        "./proto/function": 55,
        "./proto/json": 56,
        "./proto/number": 57,
        "./proto/string": 58,
        "1YiZ5S": 4,
        buffer: 1
    }],
    53: [function (e, t, n) {
        (function (t, n, i, o, r, a, s, l, c) {
            var d = e("../lambda");
            Array.prototype.extending(d).extending("fire", function (e) {
                if (!this.length)return !1;
                "function" == typeof this[0] && this[0](e), this.shift(), arguments.callee.call(this, e)
            }), Array.prototype.includes || Array.prototype.extending("includes", function (e, t) {
                if (null == this)throw new TypeError('"this" is null or not defined');
                var n = Object(this), i = n.length >>> 0;
                if (0 === i)return !1;
                for (var o = 0 | t, r = Math.max(o >= 0 ? o : i - Math.abs(o), 0); r < i;) {
                    if (n[r] === e)return !0;
                    r++
                }
                return !1
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/proto/array.js", "/lib/proto")
    }, {"../lambda": 44, "1YiZ5S": 4, buffer: 1}],
    54: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            var c = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"], d = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
            Date.prototype.extending({
                getDayAs: function (e) {
                    return "星期" == e ? c[this.getDay()] : "周" == e ? d[this.getDay()] : this.getDay()
                }, addMonth: function (e) {
                    var t = this.getMonth(), n = this.getFullYear();
                    return e > 0 ? e > 11 && (n += Math.floor(e / 12)) : e < -11 && (n += Math.ceil(e / 12)), t += e % 12, this.setMonth(t), this.setFullYear(n), this
                }, format: function (e) {
                    var t = {
                        "M+": this.getMonth() + 1,
                        "D+": this.getDate(),
                        "h+": this.getHours(),
                        "m+": this.getMinutes(),
                        "s+": this.getSeconds(),
                        "Q+": Math.floor((this.getMonth() + 3) / 3),
                        S: this.getMilliseconds()
                    };
                    e = e || "YYYY-MM-DD hh:mm:ss";
                    for (var n in{
                        8: 8,
                        10: 10
                    })"YYYYMMDD" == e.slice(0, +n).toUpperCase().replace(/\-|\.|\s|\//g, "") && (e = e.slice(0, +n).toUpperCase() + e.slice(+n));
                    /(Y+)/.test(e) && (e = e.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
                    for (var i in t)new RegExp("(" + i + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? t[i] : ("00" + t[i]).substr(("" + t[i]).length)));
                    return e
                }
            }), Date.extending({
                now: function () {
                    return (new Date).getTime()
                }, format: function (e) {
                    return (new Date).format(e)
                }, getDayAs: function (e) {
                    return (new Date).getDayAs(e)
                }, weeks: c, weeks2: d
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/proto/date.js", "/lib/proto")
    }, {"1YiZ5S": 4, buffer: 1}],
    55: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            Function.extending({
                voidFn: function () {
                }, returnSelf: function (e) {
                    return e
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/proto/function.js", "/lib/proto")
    }, {"1YiZ5S": 4, buffer: 1}],
    56: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            JSON.extending({
                equal: function (e, t) {
                    return e === t || typeof e == typeof t && JSON.stringify(e) === JSON.stringify(t)
                }, clone: function (e) {
                    return !e || "object" != typeOf(e, !0) && "array" != typeOf(e, !0) ? e : window.str2obj(window.obj2str(e))
                }, toStr: function () {
                    return JSON.stringify.apply(null, arguments)
                }, toObj: function () {
                    return JSON.parse.apply(null, arguments)
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/proto/json.js", "/lib/proto")
    }, {"1YiZ5S": 4, buffer: 1}],
    57: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            Number.prototype.extending({
                prev: function () {
                    return this - 1
                }, next: function () {
                    return this + 1
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/proto/number.js", "/lib/proto")
    }, {"1YiZ5S": 4, buffer: 1}],
    58: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            function c(e, t, n, i) {
                var o = {
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot",
                    "'": "&#39",
                    ":": "&#58",
                    "{": "&#123;",
                    "}": "&#125;"
                };
                return null == e || "null" == e || "NULL" == e || !n && 0 === e || !1 === e ? "" : (e = t ? String(e).replace(/\<\/?script[^\>]*\>/gim, function (e) {
                    return e.replace(/\<|\>/gm, function (e) {
                        return o[e]
                    })
                }) : String(e).replace(/\<|\>/gm, function (e) {
                    return o[e]
                }), i && (e = e.replace(/\"\'\{\}\:/gm, function (e) {
                    return o[e]
                })), e)
            }

            function d(e, t, n, i) {
                var o = "!" === e[0];
                e = e.replace("!", "");
                for (var r = t, a = e.split("."), s = this, l = 0; l < a.length; l++) {
                    if (0 == l) {
                        if ("this" == a[l]) {
                            r = s;
                            continue
                        }
                        if (void 0 !== i) {
                            if ("$index" === a[l] || "_index" === a[l]) {
                                r = i;
                                continue
                            }
                            if ("$rownum" == a[l] || "_rownum" === a[l]) {
                                r = i + 1;
                                continue
                            }
                            if ("$nth" == a[l] || "_nth" === a[l]) {
                                r = i % 2 == 1 ? "nth-even" : "nth-odd", i % 3 == 2 && (r += " nth-third");
                                continue
                            }
                        }
                    }
                    "number" == typeof r && "length" == a[l] || (r = "function" == typeof r[a[l]] ? r[a[l]].toString().indexOf("[native code]") > -1 ? r[a[l]]() : r[a[l]].call(r, t, i) : r[a[l]]), null != r && "null" != r && "NULL" != r || void 0 === a[l + 1] || (r = "")
                }
                return r = o ? !r : r, "function" == typeof arguments[2] ? arguments[2](r) : c(r, n)
            }

            function u(e, t, n, i) {
                var o = this, r = function (e, r) {
                    return d.call(o, e, t, r || n, i)
                };
                if (e.isEmpty())return e;
                e = e.replace(/&amp;&amp;/g, "&&"), e = e.replace(/\n\s*}}\s*\n/g, "\n}}\n");
                var a = e.split("\n}}\n");
                return 1 === a.length || "" === a[a.length - 1] || (e = "", a.forEach(function (o, r) {
                    r !== a.length - 1 && (o += "\n}}\n"), e += u(o, t, n, i)
                })), e = e.replace(/{{\w+(\.\w+)*\s?\?\s?#.+#}}|{{!?\w+(\.\w+)*\s?&{2}\s?#[\w\-]+}}|{{\w+(\.\w+)*\s?:\s?#[\w\-]+}}|{{!?\w+(\.\w+)*\s?&{2}\s#[^#].+#}}|{{\w+(\.\w+)*\s?:\s?#[^#].+#}}|{{!?\w+(\.\w+)*\s?&{2}\s?\n[^\xdd]+\n\s*}}|{{!?\w+(\.\w+)*\s?:\s?\n[^\xdd]+\n\s*}}/g, function (e) {
                    e = e.replace(/^{{|}}$/g, "");
                    var i = e.indexOf("\n"), a = e.indexOf("#");
                    if (i > -1 && a > -1 && i < a || i > -1 && -1 == a) {
                        var s = e.lastIndexOf("\n");
                        e = e.replace(/\n/, "#"), e = e.slice(0, s) + "#"
                    }
                    e = e.trim();
                    var l, c, d, u, p = e.indexOf(":"), h = e.indexOf("&&");
                    if (-1 == p && -1 == h)return $(e).html() || "object" == typeof console && console.error("can`t find the inlaid template: " + id) || "";
                    d = e.indexOf(":") > 0 && e.indexOf(":") < e.indexOf("#") ? 1 : 2;
                    var m = e.has("?") && e.indexOf("?") < e.indexOf("#");
                    m && (d = 1, p = e.indexOf("?")), l = 1 == d ? e.slice(0, p).trim() : e.slice(0, h).trim(), u = 1 == d ? p : h;
                    var g = e.slice(u + d).trim();
                    if (e.lastIndexOf("#") == e.length - 1 ? c = g.slice(1, -1) : 0 == g.indexOf("#") && (c = $(g).html()), m)return c = c.replace(/#\s+:\s+#/, "#:#").split("#:#")[r(l) ? 0 : 1], f.call(o, c, t, n);
                    if (1 === d) {
                        var b = r(l, function (e) {
                            return e
                        });
                        return null != b ? f.call(o, c, b, function (e) {
                            return "object" == typeof e && !e.$super && e.extending("$super", t), !1
                        }, n) : ""
                    }
                    return 0 === l.indexOf("!") ? r(l.slice(1)) ? "" : f.call(o, c, t, n) : r(l) ? f.call(o, c, t, n) : ""
                }), e = e.replace(/{(!)?[\$\w\d]+(\.\w+)*}/gm, function (e, t) {
                    var n = e.slice(1, -1);
                    return r(n)
                })
            }

            function f(e, t, n, i) {
                var o, r, a = this, s = typeOf(t);
                if (null == t || "array" == s && 0 == t.length)return "";
                if ("object" == s && 0 == Object.keys(t).length)return "";
                if (t = "array" == s ? t : [t], "boolean" == typeof n ? o = n : (r = n, o = i), "string" == typeof e && "#" == e[0] && (e = $(e).html()), !e)throw new Error("source undefined! please checkout the template source,id or url!");
                for (var l = 0, c = t.length, d = []; l < c; l++)"function" == typeof r && !t[l]._xtp_helper_done_ && r(t[l], l) && t[l].extending({_xtp_helper_done_: !0}), d.push(u.call(a, e, t[l], o, l));
                return d.join("")
            }

            function p(e, t, n) {
                return d(this.valueOf(), e, t, n)
            }

            function h() {
                return 0 === this.replace(/\s+/gm, "").length
            }

            function m() {
                var e, t = "\\{i\\}", n = this;
                if ("object" == typeof arguments[0])return u(this, arguments[0], arguments[1], arguments[2]);
                for (var i = arguments.length - 1; i > -1; i--)e = t.replace("i", i), n = n.replace(new RegExp(e, "g"), arguments[i]);
                return n
            }

            function g(e) {
                var t = 0 == e.indexOf("%"), n = e.lastIndexOf("%") == e.length - 1;
                return t && n ? -1 != this.indexOf(e.slice(1, -1)) : t ? this.lastIndexOf(e.slice(1)) == this.length - e.length + 1 : n ? 0 == this.indexOf(e.slice(0, -1)) : String(this) === String(e)
            }

            function b() {
                for (var e = this, t = 0; t < arguments.length - 1; t++)e += null == arguments[t] ? "" : arguments[t];
                return e
            }

            function v(e) {
                return -1 !== this.indexOf(e)
            }

            function x() {
                return this.toLowerCase()
            }

            function w() {
                return this.toUpperCase()
            }

            function y(e) {
                return this.toLowerCase() == e.toLowerCase()
            }

            function _() {
                return ("" + Date.now() + Math.random()).replace(".", "").slice(8)
            }

            var C = {$format: u, $compile: f}, k = {symbol: _, xEncode: c, xGetVal: d}, T = {
                isEmpty: h,
                format: m,
                has: v,
                like: g,
                add: b,
                lower: x,
                upper: w,
                low: x,
                up: w,
                valueAt: p,
                lowEqual: y
            };
            window.extending(C), String.extending(k), String.prototype.extending(T), String.prototype.includes || String.prototype.extending("includes", function (e, t) {
                return "number" != typeof t && (t = 0), !(t + e.length > this.length) && -1 !== this.indexOf(e, t)
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/proto/string.js", "/lib/proto")
    }, {"1YiZ5S": 4, buffer: 1}],
    59: [function (e, t, n) {
        (function (n, i, o, r, a, s, l, c, d) {
            function u(e) {
                return e.replace(/version=[\d.]+/g, "").replace(/[?&]$/, "")
            }

            function f(e, t) {
                return e && t && u(e) === u(t)
            }

            function p(e) {
                return e.contentWindow.location.reload(), e
            }

            var h = {
                currentTab: function () {
                    return _top.rootTabs.tabs("getSelected")
                }, currentTabWin: function () {
                    return _top.$(".tabs-panels>.epanel:not(hide)").find(".tab-content-frame")[0].contentWindow
                }
            }, m = {
                $close: function () {
                    var e = this[0].id;
                    if (e && 0 == e.indexOf("root-tab")) {
                        var t = _top.rootTabs.tabs("getTabIndex", this);
                        _top.rootTabs.tabs("close", t)
                    } else try {
                        this.window("close")
                    } catch (e) {
                        this.parent().find(">.epanel-header > .epanel-tool > a.epanel-tool-close").click()
                    }
                    return this
                }, $select: function () {
                    if (this.hasClass("epanel-body")) {
                        var e = _top.rootTabs.tabs("getTabIndex", this);
                        _top.rootTabs.tabs("select", e)
                    }
                    return this
                }, $open: function (e) {
                    return window.$open(this, e || this.data("open-params") || {})
                }
            }, g = {
                showLoading: function (e) {
                    if (!1 === config.globalLoading)return !1;
                    var t = $(".loading-mask");
                    return t.length || (t = $('<div class="loading-mask"><div class="loading"><i class="icon-spinner"></i><p>加载中...</p></div></div>').appendTo("body")), t.toggleClass("transparent", !1 === e).show()
                }, hideLoading: function () {
                    return $(".loading-mask").fadeOut(160)
                }, showMask: function () {
                    var e = $(".common-mask.preview-mask");
                    return e.length || (e = $('<div class="common-mask preview-mask">')), e.appendTo("body").show()
                }, hideMask: function () {
                    return $(".common-mask.preview-mask").fadeOut(150)
                }, toast: function (e) {
                    var t, n, i, o;
                    e = String(e);
                    var r = e.length > 15, a = r ? e.length : 15;
                    "number" == typeof arguments[1] ? (t = arguments[1], "function" == typeof arguments[2] && (n = arguments[2])) : "function" == typeof arguments[1] && (n = arguments[1]);
                    (new Date).getTime();
                    t = t || 1600 + 30 * (a - 15);
                    var s = jQuery("<div><p>str</p></div>".replace("str", e)), l = function () {
                        o || (s.animate({opacity: 0}, 500, function () {
                            n && n(s), s.remove()
                        }), o = !0)
                    };
                    return jQuery(".toast").hide(), document.body.addEventListener("click", l, !0), s.addClass("toast").appendTo("body").css({"text-align": r ? "left" : "center"}).bind("mouseenter", function () {
                        clearTimeout(i)
                    }).bind("mouseleave", function () {
                        i = setTimeout(l, 200)
                    }).extend({
                        ok: function () {
                            return s.addClass("ok")
                        }, err: function () {
                            return s.addClass("err")
                        }, warn: function () {
                            return s.addClass("warn")
                        }
                    }).fadeIn(function () {
                        i = setTimeout(l, t || 900)
                    })
                }, _$alert: function (e) {
                    var t, n = "提示", i = "info", o = function () {
                    };
                    "object" != typeof e ? (t = e, o = arguments[1] || o) : (n = e.title || n, i = e.icon || i, o = e.callback || o, t = e.msg);
                    var r = jQuery.messager.alert(n, t, i, o);
                    return jQuery(".messager-window, .messager-window+.window-shadow").css("top", function (e, t) {
                        return Math.max(100, parseInt(t, 10) - 60)
                    }), $.noOutline(), r.parent()
                }, _$confirm: function (e) {
                    var t, n = "提示", i = function () {
                    };
                    "object" != typeof e ? (t = e, i = arguments[1] || i) : (n = e.title || n, i = e.callback || i, t = e.msg);
                    var o = jQuery.messager.confirm(n, t, i);
                    return jQuery(".messager-window, .messager-window+.window-shadow").css("top", function (e, t) {
                        return Math.max(100, parseInt(t, 10) - 60)
                    }), $.noOutline(), o.parent()
                }, $alert: function () {
                    return _top._$alert.apply(this, [].slice.call(arguments))
                }, $confirm: function () {
                    return _top._$confirm.apply(this, [].slice.call(arguments))
                }, $show: function (e) {
                    return jQuery.messager.show({
                        title: "提示",
                        msg: e,
                        showType: "fade",
                        timeout: 1500,
                        showSpeed: 500,
                        width: 220,
                        height: 120,
                        style: {right: "50%", top: "50%", margin: "-120px -110px 0  0 "}
                    })
                }, $msg: function (e) {
                    return "string" == typeof e && (e = {msg: e}), $.messager.show({
                        title: e.title || '<i class="icon-envelope-alt"></i> 新消息提醒',
                        msg: e.msg,
                        timeout: e.timeout || 8e3,
                        width: e.width || 380,
                        height: e.height || 210,
                        showType: "slide"
                    }).closest(".window").addClass("corner-msg " + (e.className || ""))
                }, $open: e("./win").$open, $close: function (e, t) {
                    var n, i, o = window._top, r = o.rootTabs || o.$("#root-tabs");
                    if (!0 === e) {
                        var a = r.tabs("getSelected");
                        a && 0 !== (n = r.tabs("getTabIndex", a)) && r.tabs("close", n)
                    } else if (window === o) n = e, r.tabs("close", e), i = o.$("iframe.tab-content-frame").length - 1, r.tabs("select", "number" == typeof t || "string" == typeof t ? t : i); else if ("self" === e) n = r.tabs("getTabIndex", o.$(window.frameElement.parentNode)), i = o.$("iframe.tab-content-frame").length - 1, o.rootTabs.tabs("close", n); else if ("number" == typeof e) n = e, r.tabs("close", n); else {
                        var s = window.iframe;
                        if (s) {
                            var l = o._mol_wins[s.getAttribute("win-id")];
                            l && l.window("close")
                        }
                    }
                }, $select: function (e) {
                    if (e)var t = _top.$("iframe.tab-conten-frame").eq(e); else var t = $(this.iframe).parentsUntil(".epanel", ".epanel-body");
                    return t.$select()
                }, $append: function (e, t, n, i, o) {
                    var r = window._top, a = r.mainFrame, s = a.getAttribute("src"), l = r.$(a).parent(),
                        c = r.rootTabs || r.$("#root-tabs");
                    c.data("tab-urls") || c.data("tab-urls", {});
                    var d = c.data("tab-urls");
                    if (f(s, e))return l.$select(), "reload" === n && p(a), l;
                    if (!1 !== n && d[e]) {
                        var u, h = c.find(">.tabs-epanels>.epanel>.epanel-body");
                        if (h.each(function () {
                                if (!u) {
                                    var t = r.$(this), i = t.children()[0], o = i.getAttribute(e);
                                    f(e, o) && (u = t.$select(), "reload" === n && p(i))
                                }
                            }), u)return u
                    }
                    d[e] = !0;
                    var m = "root-tab-" + (new Date).getTime(), g = "opener-" + m;
                    r._opener_wins[g] = this;
                    var b = function (n) {
                        c.tabs("add", {
                            title: t,
                            id: n,
                            content: '<iframe class="tab-content-frame" src="{0}" opener-id="{1}" frameborder="0"></iframe>'.format(e, g),
                            iconCls: o || null,
                            closable: !1 !== i
                        })
                    };
                    return c.tabs("tabs").length > (parseInt(window.config.maxTabCount) || 7) ? r.$confirm("页签窗口过多!<br>将关闭最先打开的页签, 再打开新窗口。<br>是否继续?", function (e) {
                        e && (c.tabs("close", 1), b(m))
                    }) : b(m), r.$("#" + m).data("tab-src", e).addClass("root-tab-one")
                }, getTabWinIndex: function () {
                    return _top.rootTabs.tabs("getTabIndex", _top.$(window.frameElement.parentNode))
                }, getSelfTabCloseBtn: function () {
                    var e = $(frameElement).closest(".epanel").index();
                    return _top.rootTabs.find("ul.tabs>li").eq(e).find(".tabs-close")
                }, selfTabOnBeforeClose: function (e) {
                    var t = g.getSelfTabCloseBtn();
                    t.off("click").click(function (n, i) {
                        var o = function () {
                            t.trigger("click", [!0])
                        };
                        i || (n.stopPropagation(), "function" == typeof e ? e(o) : $confirm(e, function (e) {
                            e && o()
                        }))
                    })
                }, tabsInit: function (e) {
                    $(e || document.body).find(".tabs-list").find("li").on("click", function (e) {
                        var t = this.parentNode, n = t.parentNode;
                        t.find(".current").removeClass("current"), n.find(".tabs-content").hide(), $(this).addClass("current"), $(this.getAttribute("direct")).show()
                    })
                }, isShowMore: function (e) {
                    var t = $(e || document.body), n = 140, i = function (e, n) {
                        var i = e.innerHTML.replace(/\n/gm, "<br>"), n = n, o = "", r = i.length, a = $(e),
                            s = a.next(), l = s.attr("moreId");
                        i.match(/<br/gm);
                        r > n && (o = i.substring(0, n), a.html(o), s.show(), s.on("click", function () {
                            toggleMore(this, l, n, i, o), t.find(".native-fix-wrap>table").trigger("refitFix")
                        }))
                    };
                    $(e || "body").find("p.brief-content").each(function (e, t) {
                        i(t, n)
                    }), t.find(".native-fix-wrap>table").trigger("refitFix"), n = null
                }, toggleMore: function () {
                    var e = [];
                    return function (t, n, i, o, r) {
                        for (var a = e.length, s = n, l = !1, c = 0, t = $(t); c < a; c++)e[c].id === s && (e[c].show ? (t.text("收起").prev().html(o), e[c].show = !1) : (t.text("更多").prev().html(r), e[c].show = !0), l = !0);
                        l || (t.text("收起").prev().html(o), e.push({id: s, show: !1}))
                    }
                }()
            };
            t.exports = {jqueryFnPack: m, globalFnPack: g, globalGetterPack: h}
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/pub.js", "/lib")
    }, {"./win": 62, "1YiZ5S": 4, buffer: 1}],
    60: [function (e, t, n) {
        (function (n, i, o, r, a, s, l, c, d) {
            function u(e) {
                var t = function (e, t) {
                    this.selector = t, this.ele = $(t), this.key = e
                };
                return t.prototype.set = function (t, n) {
                    return e.set(this.key, t, !1 !== n), this
                }, t.prototype.get = function () {
                    return e.get(this.key)
                }, t.prototype.update = function (t, n) {
                    return e.update(this.key, t, n)
                }, t
            }

            function f(e) {
                return function () {
                    var t, n, i, o, r, a = this;
                    return arguments[0].isScope ? (t = arguments[0], i = arguments[1], o = arguments[2], r = arguments[3]) : (n = arguments[0], t = n.scope, i = n.key, o = n.helper, r = n.allowHTML), a.each(function () {
                        var n = $(this), a = (n.prop("id"), b.call(n)), s = i || a, l = t[e](s, n, o, r);
                        n.data("x-couple", l).attr("x-" + e, s)
                    }), this
                }
            }

            var p = "actual" == document.documentElement.getAttribute("x-app") || "actual" == window.config.xApp,
                h = "[x-bind],[x-binding],[x-tp],[x-list],[x-map],[x-form],[x-table],[x-tree],[x-chart],select[x-act],[x-form-list],[x-select-wrap],[x-radio-wrap],[x-checkbox-wrap]";
            e("./injector-extractor");
            String._overlook = String._overlook || String.symbol();
            var m = function (e, t, n, i, o, r, a) {
                if (r > 5 || a > 99887766)return !1;
                var s = "_shadow_" + e;
                if (n.hasOwnProperty(e) && !n.hasOwnProperty(s) && (Object.defineProperty(n, s, {
                        value: n[e],
                        writable: !0,
                        enumerable: !1,
                        configurable: !0
                    }), Object.defineProperty(n, e, {
                        set: function (e) {
                            e === String._overlook ? n[s] = null : n[s] !== e || "object" == typeof e ? (n[s] = e, o.check(t, i, !0)) : n[s] = e
                        }, get: function () {
                            return n[s]
                        }, enumerable: !0, configurable: !0
                    }), "object" == typeof n[e]))for (var l in n[e])m(l, t, n[e], i, o, r + 1, a + 1)
            }, g = function (e, t, n) {
                if ("object" == typeof t)for (var i in t)m(i, e, t, t, n, 0, 0)
            }, b = function () {
                var e, t = $(this);
                return h.split(",").each(function (n) {
                    e || (n = n.replace(/\[|\]/g, ""), e = t.attr(n))
                }), e
            };
            $.fn.bind2 = $.fn.xBind = f("bind"), $.fn.binding = f("binding");
            var v = function () {
                var e, t = $(this), n = t.filter("[x-form]"), i = t.filter(":input");
                return 0 == t.length ? t : n.length ? 1 == n.length ? e = n.eq(0) : (e = n.filter("[x-prior]"), e.length ? e : (e = n.toArray().max('f => ~~f.getAttribute("x-up-time")'), $(e))) : i.length ? (e = i.filter("[x-prior]"), e.length ? e : i.eq(0)) : (e = t.filter("[x-prior]"), e.length ? e : t)
            }, x = function (e, t) {
                var n = h.replace(/\]/g, '="{0}">'.format(e)).replace(/\>/g, "]");
                return $(t || document.body).find(n)
            };
            t.exports = function () {
                var e = {}, t = Object.create(null), n = Object.create(null), i = Object.create(null), o = u(e);
                return e.extending({
                    get: function (e, i) {
                        var o;
                        return !1 === i ? t[e] : (p ? o = v.call(x(e)) : e in n && (o = v.call($(n[e]))), o && o.length && (t[e] = o.xVal()), t[e])
                    }, check: function (t, i, o) {
                        var r;
                        return r = p ? x(t) : $(n[t]), r.each(function (e, t) {
                            $(t).xVal(i, !0 === o)
                        }), e
                    }, set: function (n, o, r) {
                        if ("function" == typeof arguments[1] && !1 !== r)return e.update.apply(this, arguments);
                        if ("boolean" == typeof o) {
                            var a = arguments[arguments.length - 1];
                            a = "object" == typeof a ? a : document.body, e.get(n) != o && $(a).xScanDis(n, o)
                        }
                        t[n] = o, !1 !== r && (e.check(n, o, r), g(n, o, e));
                        var s = i[n];
                        return s && s.slice().fire(o), e
                    }, watch: function (t, n) {
                        return i[t] = i[t] || [], i[t].push(n), e
                    }, scan: function (t, n) {
                        var i = $(t).find("[{0}]".format("x-bind"));
                        if (i.each(function (t, n) {
                                var i = $(n), o = i.attr("x-bind");
                                o && e.bind(o, i)
                            }), i.removeAttr("x-bind"), n) {
                            var o = $(t).find("[{0}]".format("s-bind"));
                            o.each(function (t, n) {
                                var i = $(n), o = i.attr("s-bind");
                                e.binding(o, i)
                            }), o.removeAttr("s-bind")
                        }
                        return e
                    }, scanEx: function (t, n) {
                        if (!1 === window.config.xApp && !document.documentElement.hasAttribute("x-app") || !0 === window.config.xAppDone || document.documentElement.hasAttribute("x-init-done"))return !1;
                        var t = t || document;
                        return $(t).find(h).each(function (t, n) {
                            var i, o = $(n).filter(":not(.x-bind-done)"), r = o.parent().is("[x-select-wrap]"),
                                a = o.attr("x-act"), s = o.attr("x-bind"), l = b.call(o);
                            if ((i = o.is("select") && !r ? s : s || l) && (o.data("x-couple", e.bind(i, o, !1)), o.is(":input") || o.is(":checkbox") || o.is(":radio"))) {
                                var c = function (t, n, r) {
                                    console.log("watching input..."), n = n || o, r = r || i;
                                    var a = n.xVal();
                                    e.set(r, a, !0), e.set(r, a, !0)
                                };
                                o.parent(), o.is("[x-no-watch]") || o.is("select[x-list]") || (o.is("select") || o.is(":file") ? o.on("change", c) : o.prop("readonly") || o.on("input", c))
                            }
                            a && o.xLoad()
                        }), document.documentElement.setAttribute("x-init-done", ""), window.config.xAppDone = !0, e
                    }, binding: function (t, i, o, r) {
                        if (!t)return !1;
                        var a = "_shadow_" + t;
                        return n[a] || Object.defineProperty(e, t, {
                            set: function (n) {
                                e.set(a, n), g(t, n, e)
                            }, get: function () {
                                return e.get(a)
                            }, enumerable: !0, configurable: !1
                        }), e.bind(a, i, !1, o, r)
                    }, bind: function (i, r, a, s, l) {
                        "boolean" != typeof arguments[2] && (a = !1, s = arguments[2], l = arguments[3]);
                        var c;
                        return a ? (c = i, i = String.symbol(), t[i] = c) : c = t[i], n[i] = $(n[i]).add(r).attr("x-bind", i).addClass("x-bind-done"), $(r).xConfig({
                            helper: s,
                            allowHTML: l
                        }), i in t && e.set(i, c), new o(i, r, s, l, !0)
                    }, unbind: function (t, i) {
                        return null === t || "" === t ? i && $(i).each(function (n, i) {
                                var o = $(i);
                                (t = o.attr("x-bind")) && e.unbind(t, o)
                            }) : i ? n[t] && (n[t] = n[t].not(i)) : n[t] = null, e
                    }, update: function (n, i, o) {
                        var r, a = t[n];
                        return n in t && (1 == arguments.length ? r = a : "function" != typeof i ? r = a : o && Array.isArray(a) ? (a = JSON.clone(a), a.each(i), r = a) : (r = i(a), r = void 0 === r ? a : r), e.set(n, r, !0)), r
                    }, isScope: !0
                }, !0), e
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/scope.js", "/lib")
    }, {"./injector-extractor": 39, "1YiZ5S": 4, buffer: 1}],
    61: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            $.extend($.fn.validatebox.defaults.rules, {
                ip: {
                    validator: function (e) {
                        return /((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/.test(e)
                    }, message: "请输入正确的IP地址"
                }, contact: {
                    validator: function (e) {
                        return /^1\d{10}$|^0\d{2,3}-?\d{7,8}$/.test(e)
                    }, message: "请输入正确的固定电话或手机号码"
                }, port: {
                    validator: function (e) {
                        return /^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(e)
                    }, message: "端口号必须在1-65535之间"
                }, noChinese: {
                    validator: function (e) {
                        return !/^[\u0391-\uFFE5]+$/.test(e)
                    }, message: "账号密码不能包含中文"
                }, extLength: {
                    validator: function (e, t) {
                        e = e.trim();
                        var n = /[\u0391-\uFFE5]+/gm, i = /[^\u0391-\uFFE5]+/gm, o = e.match(n), r = e.match(i),
                            a = (o ? 2 * o.join("").length : 0) + (r ? r.join("").length : 0);
                        return t[2] = Math.ceil((a - t[1]) / 2), a >= t[0] && a <= t[1]
                    }, message: "已超出{2}字"
                }, extLengthCnAsOne: {
                    validator: function (e, t) {
                        e = e.trim();
                        var n = e.length;
                        return t[2] = n - t[1], n >= t[0] && n <= t[1]
                    }, message: "已超出{2}字"
                }, longitude: {
                    validator: function (e) {
                        var t = parseFloat(e);
                        return /^-?\d\d?\d?(\.\d\d?\d?\d?)?$/.test(e) && t <= 180 && t >= -180
                    }, message: "请输入-180到180之间的数字，可包括四位小数"
                }, latitude: {
                    validator: function (e) {
                        var t = parseFloat(e);
                        return /^-?\d\d?(\.\d\d?\d?\d?)?$/.test(e) && t <= 90 && t >= -90
                    }, message: "请输入-90到90之间的数字，可包括四位小数"
                }, isChineseID: {
                    validator: function (e) {
                        var t = "11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91",
                            n = 0, i = e.length, o = "", r = 0;
                        if (!/^\d{17}(\d|x)$/i.test(e) && !/^\d{15}$/i.test(e))return !1;
                        e = e.replace(/x$/i, "a");
                        var a = e.substr(0, 2);
                        if (!(t.indexOf(a) > 0))return !1;
                        if (18 == i) {
                            if (o = e.substr(6, 4) + "-" + Number(e.substr(10, 2)) + "-" + Number(e.substr(12, 2)), r = new Date(o.replace(/-/g, "/")), o != r.getFullYear() + "-" + (r.getMonth() + 1) + "-" + r.getDate())return !1;
                            for (var s = 17; s >= 0; s--)n += Math.pow(2, s) % 11 * parseInt(e.charAt(17 - s), 11);
                            if (n % 11 != 1)return !1
                        } else if (15 == i) {
                            o = "19" + e.substr(6, 2) + "-" + Number(e.substr(8, 2)) + "-" + Number(e.substr(10, 2)), r = new Date(o.replace(/-/g, "/"));
                            var l = r.getFullYear().toString() + "-" + (r.getMonth() + 1) + "-" + r.getDate();
                            if (o != l)return !1
                        }
                        return !0
                    }, message: "请输入正确的身份证号"
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/validate.js", "/lib")
    }, {"1YiZ5S": 4, buffer: 1}],
    62: [function (e, t, n) {
        (function (e, n, i, o, r, a, s, l, c) {
            t.exports = {
                $open: function (e, t, n, i) {
                    var o, r, a = window._top, s = document.body, l = {}, c = {}, d = a.byid("root-menu") || {},
                        u = 1 == t.dict || "dict" == t.mode, f = window.config.openAnimate || "fadeInDown",
                        p = function (e) {
                            var t = e.closest(".window"), n = t.children(".epanel-header"),
                                i = e.children(".win-fix-bar");
                            if (t.addClass("hidden"), c = {maxHeight: r}, l = {
                                    maxHeight: r,
                                    overflowY: "auto"
                                }, c.maxHeight = c.maxHeight - 5, l.maxHeight = l.maxHeight - 5, n.length) {
                                var o = getRect(n[0]).height;
                                l.maxHeight = l.maxHeight - o
                            }
                            if (i.length) {
                                var a = getRect(i[0]).height;
                                l.maxHeight = l.maxHeight - a, c.paddingBottom = a
                            }
                            t.css(c), e.css(l), t.removeClass("hidden"), e.on("click", ".cm-cancel-btn,.win-close-btn", function () {
                                $(this).closest(".window-body").$close()
                            })
                        }, h = function (e) {
                            "max" == t.width ? t.width = e.width - 20 : "full" == t.width && (t.width = e.width), "max" == t.height ? (t.height = e.height - 20, t.top = 10) : "full" == t.height || parseInt(t.height) > e.height ? (t.height = e.height, t.top = 0) : t.top = t.top || Math.min((e.height - ~~t.height) / 2, e == a ? 60 : 0), r = e.height - t.top
                        };
                    if ("string" == typeof t)return window.$append.apply(this, arguments);
                    "maximizable" in t || (t.maximizable = !1), "minimizable" in t || (t.minimizable = !1), "collapsible" in t || (t.collapsible = !1), "resizable" in t || (t._resizable = !1), "scroll" in t || (t.scroll = !0), "modal" in t || (t.modal = !0), "cache" in t || (t.cache = !1), "doSize" in t || (t.doSize = !0), t.shadow = !1, "title" in t || (t.title = " "), "height" in t || (t.height = "auto"), "mask" in t || (t.mask = "global"), "style" in t || (t.style = {}), "center" in t || (t.center = "global");
                    var m = t.onClose || Function.voidFn;
                    if ("normal" !== t.mode && window !== a) {
                        var g = _top.$("#admin-design-main"), b = _top.$(window.frameElement.parentNode),
                            v = $(s).children(".body-agent")[0] || $(s).children(":first-child")[0];
                        if (window._cancelGlobalReFixTbTime = (new Date).getTime(), g.hasClass("full-win-mode") ? t.mode = "full-win" : g.hasClass("help-mask-mode") ? t.mode = "help-mask" : t.mode = t.mode || "trans-agent", u && (t.mode = "help-mask") && (t.modal = !1), !1 !== t.modal && g.addClass(t.mode + "-mode"), "help-mask" == t.mode) {
                            h(window);
                            var x = s.scrollTop, w = function () {
                                s.scrollTop = x
                            };
                            u || $(window).on("scroll", w), t.onClose = function () {
                                u || $(window).off("scroll", w), 0 == $(s).children(".window-mask:visible").length && g.removeClass("trans-agent-mode help-mask-mode full-win-mode"), m(o)
                            };
                            var y = getRect(d).width, _ = window.innerWidth - parseInt(t.width),
                                C = t.width ? _ / -2 : -1 / 0, k = Math.max(y / -2, _ < y ? 0 : Math.min(C, 0));
                            "margin-left" in t.style || (t.style["margin-left"] = k)
                        } else if ("full-win" == t.mode) h(_top), b.addClass("full-wrap"), t.top = t.top || 50, t.onClose = function () {
                            g.removeClass("trans-agent-mode help-mask-mode full-win-mode"), b.removeClass("full-wrap"), $(s).removeClass("overflowHidden").removeClass("holdScrollWidth"), m(o)
                        }; else {
                            h(_top);
                            var T = s.scrollTop, j = s.scrollLeft;
                            $(s).addClass(_top.$("body").hasClass("sb-l-m") ? "in-sb-l-m-full-wrap" : "in-full-wrap"), b.addClass("full-wrap mock-agent"), v.scrollTop = T, $("[refix]").each(function () {
                                var e = $(this), t = e.attr("refix");
                                t = t || "y", "x" == t && (t = "refix-x"), "y" == t && (t = "refix-y"), "x,y" == t && (t = "refix-x refix-y"), e.attr("refix", t), e.addClass(t)
                            }), t.onClose = function () {
                                0 == $(s).children(".window.animated").length && (g.removeClass("trans-agent-mode help-mask-mode full-win-mode"), b.removeClass("full-wrap"), $(s).removeClass("in-full-wrap in-sb-l-m-full-wrap"), s.scrollTop = T, s.scrollLeft = j, $("[refix]").each(function () {
                                    var e = $(this), t = e.attr("refix");
                                    e.removeClass(t)
                                })), m(o)
                            }
                        }
                    }
                    if ((o = arguments[0].jquery ? arguments[0] : null) || 0 == e.indexOf("#")) o = $(e).addClass("e-win-wrap"), o.show().window(t).window("hcenter").parent().addClass("animated " + f).end(), p(o); else if (n) o = $('<div class="e-win-wrap" dynamic>').css({overflow: t.scroll ? "auto" : "hidden"}), window.$cache(e) ? (o.window(t).css(c).html(window.$cache(e)).parent().addClass("animated " + f).css(l).end(), setTimeout(function () {
                        i && i()
                    }, 0), p(o)) : o.window(t).css(c).load(getViewPath(e), function (t) {
                        window.$cache(e, t), i && i(), p(o)
                    }).parent().addClass("animated " + f).css(l).end(); else {
                        e = getViewPath(e);
                        var S = "" + Date.format("MMDDhhmmssS");
                        o = $('<div class="e-win-wrap overhide" dynamic win-id="{1}"><iframe scrolling="{0}" win-id="{1}"></iframe></div>'.format(t.scroll ? "auto" : "no", S)), a._mol_wins[S] = o.window(t).css(c).find("iframe").attr("src", e).end().parent().addClass("animated " + f).css(l).end()
                    }
                    return o.data("open-params", t), o
                }
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/win.js", "/lib")
    }, {"1YiZ5S": 4, buffer: 1}],
    63: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            var c = [].slice, d = function (e) {
                return e.hasClass("need-fix") || e.hasClass("need-fix-end")
            }, u = function (e, t) {
                if (window._cancelGlobalReFixTbTime = (new Date).getTime(), !e.length)return !1;
                var n = $(e[0].parentNode), i = c.call(e).orderby('o => +o.getAttribute("sort-index")');
                window._cancelGlobalReFixTbTime = (new Date).getTime(), e.remove(), i.each(function (e) {
                    n.append(e)
                })
            }, f = function (e, t) {
                var n, i, o = e.children("thead").children("tr"), r = o.children("th");
                window._cancelGlobalReFixTbTime = (new Date).getTime(), e.hide(), e.find(" >thead>tr>th , >tbody>tr>td ").each(function () {
                    this.hasAttribute("native-index") || this.setAttribute("native-index", $(this).index())
                }), n = r.toArray().orderby('th => +th.getAttribute("native-index")'), n.each(function (n, o) {
                    var r = $(n), a = r.text().trim(), s = t.where('o => o.cn.trim()=="{0}"'.format(a))[0],
                        l = 0 == s.custom ? "addClass" : "removeClass", c = s.sortIndex;
                    i = e.find(">tbody>tr>td").filter('[native-index="{0}"]'.format(o)), r.add(i)[l]("custom-col-hide").attr("sort-index", c)
                }), u(r), e.find(">tbody>tr").each(function (e, t) {
                    var n = $(t).children("td");
                    u(n)
                }), e.show();
                var a = e.attr("fixed-mode");
                a && e.fixTable(a)
            };
            $.fn.customCol = function (e) {
                if (!this.children().length)return this;
                if (this.hasClass("no-custom") || this.find(">thead>tr").length > 1)return this;
                e = e || "custom";
                var t = this, n = _top.$("body"), i = t.closest(".query-result"),
                    o = "cs-" + (window.iframe ? window.iframe.getAttribute("page-no") : $(".spa-view")[0] || {}.id) + (t.prop("id") || "table"),
                    r = t.children("thead"), a = r.children("tr").children("th"), s = localData.get(o);
                if (!o || !t.is("table"))return this;
                if (s)if (s.length != a.length) s = null; else {
                    s = s.orderby("r => r.cn");
                    var l = c.call(a).orderby("th => $(th).text()"), u = "列名改变? {0},  自定义项改变?{1} , 自定义固定列改变?{2}",
                        p = s.some(function (t, n) {
                            var i = t.cn != $(l[n]).text(), o = null == t.custom && l[n].hasAttribute(e),
                                r = null != t.custom && !l[n].hasAttribute(e),
                                a = t.needFix != (d($(l[n])) ? "fixed-item" : "");
                            return u = u.format(i, o || r, a), i || o || r || a
                        });
                    p && console.info(["custom表格结构变化,更新custom设置...", u, t.prop("id"), t]), p && (s = null)
                }
                if (s || (s = [], a.each(function (t, n) {
                        var i = $(n);
                        s[t] = {
                            cn: i.text(),
                            custom: this.hasAttribute(e) ? "false" === this.getAttribute("cs-init") ? 0 : 1 : null,
                            nativeIndex: t,
                            needFix: d(i) ? "fixed-item" : "",
                            sortIndex: this.getAttribute("sort-index") || t
                        }, n.setAttribute("sort-index", s[t].sortIndex)
                    }), localData.set(o, s)), f(t, s), !i.hasClass("has-custom-btn")) {
                    var h = $('<div class="custom-tool"><i class="fa icon-cogs" title="自定义列"></i></div>');
                    h.appendTo(i.addClass("has-custom-btn")), h.on("click", function () {
                        var e = "", i = localData.get(o);
                        i = i.orderby("r => +r.sortIndex"), i.each(function (t, n) {
                            e += '<li class="{2}"><input type="checkbox" id="{1}"/><label for="{1}"></label><u>{0}</u><label for="{1}" class="custom-col-switch" data-on="显示" data-off="隐藏"></label></li>'.format(t.cn, o + "-" + n, t.needFix)
                        });
                        var r = "temp-" + (new Date).getTime(),
                            a = _top.$('<div id="{0}" class="custom-setting-modal"><ul class="custom-col-options">{1}</ul><div class="btn-bar mb5"><b class="cm-cancel-btn">取 消</b><b class="cm-save-btn">确 认</b></div></div>'.format(r, e));
                        a.hide().appendTo(n), _top.$open(a, {
                            width: 360,
                            mode: "help-mask",
                            title: "自定义列",
                            closeAnimate: "fadeOutUp",
                            onClose: function () {
                                a.parent().remove()
                            }
                        }).focus(), a.find(":checkbox").each(function (e, t) {
                            t.checked = 0 != i[e].custom, t.disabled = null == i[e].custom
                        }), a.on("click", ".cm-save-btn", function () {
                            a.find("li").each(function (e) {
                                var t, n = top.$(this), o = n.find(":checkbox")[0];
                                o.disabled || (t = o.checked ? 1 : 0), i[e] = {
                                    cn: n.children("u").text(),
                                    custom: t,
                                    needFix: n.hasClass("fixed-item") ? "fixed-item" : "",
                                    sortIndex: e
                                }
                            }), localData.set(o, i), f(t, i), a.$close()
                        }).on("click", ".cm-cancel-btn", function () {
                            window._cancelGlobalReFixTbTime = (new Date).getTime(), a.$close()
                        }).on("click", "li", function (e) {
                            _top.$(e.target).is("input,label") || _top.$(this).find("input")[0].click()
                        }), _top.importing("jui", function () {
                            a.children(".custom-col-options").sortable({
                                cancel: "li:first-child,li:last-child,.fixed-item",
                                cursor: "move",
                                items: "li:not(:first-child,:last-child,.fixed-item)",
                                axis: "y"
                            }).on("sortstart", function (e, t) {
                            }).disableSelection()
                        })
                    })
                }
                return this
            }, $(function () {
                config.autoCustomCol && $('.query-result table:has("tbody"):not("[x-table]")').eq(0).customCol("cs")
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/xtp.customcols.js", "/lib")
    }, {"1YiZ5S": 4, buffer: 1}],
    64: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            window.extending("$filter", function (e, t, n) {
                n ? n.prototype.extending(e, t) : (String.prototype.extending(e, t), Number.prototype.extending(e, t), Boolean.prototype.extending(e, t))
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/xtp.filter.js", "/lib")
    }, {"1YiZ5S": 4, buffer: 1}],
    65: [function (e, t, n) {
        (function (t, n, i, o, r, a, s, l, c) {
            function d(e) {
                var t = e.parent();
                if (t.is(".native-fix-wrap")) {
                    if (!t.parent().is(".all-fix-wrap"))throw new Error("fix table wrap wrong, check the struct ! ");
                    t.parent().replaceWith(e)
                }
                return e.wrap('<div class="native-fix-wrap">').parent().wrap('<div class="all-fix-wrap">'), e.parent().parent()
            }

            var u = e("./ex.js");
            window.$.fn.fixTable = function (e, t) {
                if (!e)return this;
                var n = e, i = this, o = i.closest(".hook-table-wrap, .hook-result-wrap, .query-result"),
                    r = i.children("thead").find("th.need-fix").length > 0,
                    a = i.children("thead").find("th.need-fix-end").length > 0,
                    s = i.children("thead.need-fix").length > 0;
                return i.is(":empty") ? (i.closest(".all-fix-wrap").replaceWith(i), i.wrap('<div class="native-fix-wrap">').parent().wrap('<div class="all-fix-wrap">'), i) : !i[0] || i.is(".no-fix") || "all" == e && !(r || s || a) || "col" == e && !r && !a || "head" == e && !s ? (i.closest(".query-result").children(":not(.new-color-bar)").add(i).css("visibility", "visible"), i.closest(".query-result").children(".all-fix-wrap").find(".head-fix-wrap>table, table.cross-fix-cols-head, .col-fix-wrap>table").css("visibility", "visible"), i) : (i.is(".no-fix-head") ? "all" == e && (e = "col") : i.is(".no-fix-col") && "all" == e && (e = "head"), i.addClass("fixing") && o.addClass("changing"), d(i), setTimeout(function () {
                    u.time("calcTable");
                    var l, c, d, f = i.data("table-setting") || {},
                        p = "function" == typeof f.wrapHeight ? f.wrapHeight() : ~~f.wrapHeight || i.attr("wrap-height") || window.innerHeight - 120,
                        h = i.children("thead").children("tr").length > 1, m = i.parent(), g = m.parent(),
                        b = i.find(">thead>tr,>tbody>tr");
                    if (!h && i.children("thead").find("th").each(function (e, t) {
                            var n = $(t);
                            i.children("tbody").children("tr").each(function (t, i) {
                                var o = $(i).children("td").eq(e);
                                n.is(".need-fix") && o.addClass("need-fix"), n.is(".need-fix-end") && o.addClass("need-fix-end")
                            })
                        }), i.on("refitFix", function () {
                            l && l.add(d).children("tbody").children("tr").each(function (e, t) {
                                $(this).children("td").height(0);
                                var n = i.children("tbody").children("tr").eq(e);
                                n[0] && $(this).height(getComputedStyle(n[0]).height)
                            }), d && d.children("tbody").children("tr").each(function (e, t) {
                                $(this).children("td").height(0);
                                var n = i.children("tbody").children("tr").eq(e);
                                n[0] && $(this).height(getComputedStyle(n[0]).height)
                            })
                        }), u.hasScroll(m[0], "x", 0) || (e = "all" === e || "head" === e ? "head" : ""), u.time("calcCol"), ("col" == e || "all" == e) && r) {
                        u.time("colClone"), l = $(i.clone(!0)).width("auto").xRemoveAttrExceptTheme(), l.prop("id", "").children("thead,tbody").prop("id", ""), u.timeEnd("colClone");
                        var v = l.children("thead,tbody").children("tr");
                        u.time("calcCell"), v.each(function (e, t) {
                            var n, i = b.eq(e);
                            $(t).children().each(function (t, o) {
                                var r = $(o), a = "TH" == o.tagName;
                                if (r.is(".need-fix")) {
                                    if (window.config.testOptimize) {
                                        var s;
                                        s = a ? h ? getComputedStyle(i.children()[t]).height : heightThSt : singleRowMode ? heightSt : n = n || getComputedStyle(i.children()[t]).height, r.width(widthArrSt[t]).height(s)
                                    } else {
                                        var l = i.children().eq(t), c = getComputedStyle(l[0]);
                                        r.width(c.width), r.height(c.height)
                                    }
                                    a || i.hover(function () {
                                        r.addClass("hover-like")
                                    }, function () {
                                        r.removeClass("hover-like")
                                    }), a || r.hover(function () {
                                        g.find(">.col-end-fix-wrap>table>tbody>tr").eq(e - 1).add(i).addClass("hover-like")
                                    }, function () {
                                        g.find(">.col-end-fix-wrap>table>tbody>tr").eq(e - 1).add(i).removeClass("hover-like")
                                    })
                                } else r.remove()
                            })
                        }), u.timeEnd("calcCell"), l.wrap('<div class="col-fix-wrap">'), l.parent().appendTo(g)
                    }
                    if (u.timeEnd("calcCol"), ("col" == e || "all" == e) && a) {
                        d = $(i.clone(!0)).width("auto").xRemoveAttrExceptTheme(), d.children("thead,tbody").add(d).prop("id", "");
                        d.children("thead,tbody").children("tr").each(function (e, t) {
                            var n, i = b.eq(e);
                            $(this).children("th,td").each(function (e, t) {
                                var o = $(t), r = "TH" == t.tagName;
                                if (o.is(".need-fix-end")) {
                                    if (window.config.testOptimize) {
                                        var a;
                                        a = r ? h ? getComputedStyle(i.children()[e]).height : heightThSt : singleRowMode ? heightSt : n = n || getComputedStyle(i.children()[e]).height, o.width(widthArrSt[e]).height(a)
                                    } else {
                                        var s = i.children("th,td").eq(e), l = getComputedStyle(s[0]);
                                        o.width(l.width), o.height(l.height)
                                    }
                                    r || i.hover(function () {
                                        o.addClass("hover-like")
                                    }, function () {
                                        o.removeClass("hover-like")
                                    }), r || o.hover(function () {
                                        i.addClass("hover-like")
                                    }, function () {
                                        i.removeClass("hover-like")
                                    })
                                } else o.remove()
                            })
                        }), d.wrap('<div class="col-end-fix-wrap">'), d.parent().appendTo(g)
                    }
                    if (u.time("head"), ("head" == e || "all" == e) && s) {
                        u.time("headClone"), c = i.clone().width("auto").xRemoveAttrExceptTheme(), u.timeEnd("headClone"), u.time("headWrapHeight"), isNaN(p) && (p = window.innerHeight - getRect(i[0]).top - parseInt(getComputedStyle(document.body).paddingBottom) - parseInt(getComputedStyle(g.parent()[0] || g[0]).marginBottom) - (g.next().length ? getRect(g.next()[0]).height : 0) - 3), p = p > 300 ? p : window.height - 100, m.css({
                            "max-height": +p,
                            "min-height": 20
                        }), u.timeEnd("headWrapHeight"), u.time("headClientCalc"), g.children(".col-fix-wrap,.col-end-fix-wrap").height(m[0].clientHeight), u.timeEnd("headClientCalc"), u.time("headRemoveTbody"), c.children(":not(thead)").remove(), u.timeEnd("headRemoveTbody"), c.children().add(c).prop("id", ""), u.time("headMain");
                        var x = !1;
                        if (c.children("thead").children("tr").each(function (e) {
                                var t = i.children("thead").children("tr").eq(e);
                                $(this).children("th").each(function (e) {
                                    var n = $(this), i = t.children()[e], o = getComputedStyle(i);
                                    x = x || parseFloat(o.height) > 40, n.width(o.width), n.height(o.height)
                                })
                            }), u.timeEnd("headMain"), u.time("headCol"), r) {
                            var w = c.clone(!0).addClass("cross-fix-cols-head").xRemoveAttrExceptTheme();
                            w[0].id = "", w.children("thead").children("tr").children("th:not(.need-fix)").remove(), w.appendTo(g)
                        }
                        if (a) {
                            var y = c.clone(!0).addClass("cross-fix-cols-head-end").xRemoveAttrExceptTheme();
                            y[0].id = "", y.children("thead").children("tr").children("th:not(.need-fix-end)").remove();
                            var _ = m[0].offsetWidth - m[0].clientWidth;
                            y.appendTo(g), d && d.parent().css({zIndex: 1, right: _}), y.css({zIndex: 1, right: _})
                        }
                        u.timeEnd("headCol"), u.time("headScroll");
                        var C = window.hasScroll(m[0], "y");
                        c.width(getComputedStyle(i[0]).width).wrap('<div class="head-fix-wrap">'), c.parent().css({
                            width: m.width() - _,
                            paddingRight: C,
                            minWidth: "auto",
                            background: "transparent"
                        }).appendTo(g);
                        var k = parseFloat(getComputedStyle(c[0]).width), T = parseFloat(getComputedStyle(i[0]).width),
                            j = T - k;
                        j > 0 && j == C && c.parent().css({paddingRight: 0}), j < -1 && C && c.parent().css({width: "calc(100% - 5px)"});
                        var S = getRect(c.find("th")[0]).width, D = getRect(i.children("thead").find("th")[0]).width;
                        if (Math.abs(S - D)) {
                            console.info([S, D]);
                            var E = $(".native-fix-wrap>table>thead");
                            $(".head-fix-wrap>table>thead").replaceWith(E.clone().xRemoveAttrExceptTheme())
                        }
                    }
                    u.timeEnd("headScroll"), u.timeEnd("head");
                    var F = $(l).add(d), A = g ? g.height() : "";
                    "head" == e && c && m.scroll(function () {
                        c.css("right", this.scrollLeft)
                    }) && $(w).add(y).remove(), "col" == e && F.length && m.scroll(function () {
                        F.css("bottom", this.scrollTop)
                    }), "all" == e && (c || F.length) && m.scroll(function () {
                        c && c.css("right", this.scrollLeft), F.length && F.css("bottom", this.scrollTop)
                    }), i.children("tbody").children().length || g.height(A + 1), i.attr("fixed-mode", e), e && !i[0].hasAttribute("resize-reg") && $(window).resize($.debounce(function () {
                        console.log("window resize, table reFix"), g.animate({opacity: 0}, 50).promise().then(function () {
                            i.fixTable(n), g.animate({opacity: 1}, 50)
                        })
                    }, 80)), i.attr("resize-reg", ""), o.removeClass("changing"), "function" == typeof t && t(g), i.removeClass("fixing"), u.timeEnd("calcTable"), u.time("UIDrawTable"), setTimeout(function () {
                        if (u.hasScroll(m[0], "x", 0) || g.find(".col-fix-wrap,.col-fix-wrap,.cross-fix-cols-head,cross-fix-cols-head-end").remove(), u.hasScroll(m[0], "y", 0)) {
                            if (g.find(".head-fix-wrap").xCss("width", "calc(100% - 5px)"), !h && !x) {
                                c.parent().addClass("single-tr");
                                var e;
                                i.find(">thead>tr").eq(0).children("th").each(function (t, n) {
                                    var i = getComputedStyle(n), o = i.width;
                                    e = e || parseFloat(i.height) + 1 + "px", c.find(">thead>tr").eq(0).children("th").eq(t).xCss({
                                        "padding-top": "9px",
                                        width: o,
                                        height: e
                                    })
                                })
                            }
                        } else g.find(".head-fix-wrap").remove(), g.find(".head-fix-wrap").xCss("width", "100%");
                        i.parent().scrollTop(0).scrollLeft(0), u.timeEnd("UIDrawTable")
                    }, 0)
                }, 50), i)
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/xtp.fixtable.js", "/lib")
    }, {"./ex.js": 37, "1YiZ5S": 4, buffer: 1}],
    66: [function (e, t, n) {
        (function (n, i, o, r, a, s, l, c, d) {
            var u = function (e) {
                var t = $cache();
                return function (n, i, o, r, a) {
                    var s = arguments, l = e(n), c = "";
                    if ("string" != typeof i) {
                        c = l.attr("tpsource") || "";
                        var d = l.attr("id") || "", u = l.selector || "",
                            f = l.attr("tpcache") || l.attr("tpcache", e.random()).attr("tpcache");
                        if (!c && d && byid(d + "-tp") && (c = "#{0}-tp".format(d)), c = c || (d ? "#" + d : u), !(c = c || (f ? "[tpcache={0}]".format(f) : "")))throw new Error("The template tpsource was not found! check the container selector or id or attr:tpcache")
                    }
                    var p = function () {
                        var n, a, d = typeOf(i);
                        if (1 == s.length)return l.html(t[c]);
                        if ("number" === d)return l.html(new Array(i + 1).join(t[c]));
                        "string" === d ? (l.html(i), a = 5 == s.length ? s[4] : i) : l.is("[x-map]") ? (l.checkIn(i), a = i) : (a = i, l.html(window.$compile.apply(this, [t[c], i, o, r])).removeClass("xtp-hide").addClass("xtp-done")), l.is("tbody") ? l.parent("table").customCol("cs").fixTable("string" === d ? "" : "all") : l.is("table") && l.customCol("cs").fixTable("string" === d ? "" : "all");
                        var u, f;
                        return l.is("select") ? (u = "[x-selected]", f = ["x-selected"]) : (u = "[x-checked],[x-disable],[x-readonly],[x-value],[x-src]", f = u.replace(/\[|\]/g, "").split(",")), l.find(u).each(function (t, n) {
                            var i = e(n);
                            f.each(function (e) {
                                var t = e.replace("x-", "");
                                n.hasAttribute(e) && ("x-src" === e ? n.src = i.attr(e) : "x-value" === e ? i.val(i.attr(e)) : i.prop(t, "true" === i.attr(e)), n.removeAttribute(e))
                            })
                        }), l.data("current-data", a), l.is("table") ? (n = l.find(">tbody>tr"), "array" == d ? a = i : i.tbodyDataKey && (a = i[i.tbodyDataKey])) : "array" == d && (n = l.children(), a = i), n && a && n.each(function (t) {
                            e(this).data("current-data", a[t])
                        }), l.find("[xtp-widget]").widget(), l.find("[xtp-behavior]").behavior()
                    };
                    if (l.is("select")) {
                        var h, m = '<option value="{val}" {selected.asSelectedProp}>{txt}</option>', g = l.data(),
                            b = {};
                        t[c] = t[c] || l.html(), t[c] || (g.key4val && (m = m.replace("{val}", g.key4val)), g.key4txt && (m = m.replace("{txt}", g.key4txt)), g.keys && (m = m.replace("{txt}", g.keys.split(":")[0])) && (m = m.replace("{val}", g.keys.split(":")[1])), t[c] = m), g.hasOwnProperty("empty") && (h = t[c].match(/\{\w+\d*\w*\}/g).slice(-1)[0].replace(/\{|\}/g, ""), b[h] = g.empty, i = JSON.clone(i), i.unshift(b)), p.call(this)
                    } else if (t[c]) p.call(this); else if (c.indexOf(".htm") > 0) e.get(c, function (e) {
                        t[c] = e, p.call(this)
                    }); else {
                        var v = e(c).eq(0);
                        v.is("table") || v.is("tbody") || v.is("thead") || v.is("[x-list]") || v.is("[x-tp]") ? t[c] = v.html().trim().replace(/^\<\!\-\-/, "").replace(/\-\-\>$/, "") : t[c] = v.html(), p.call(this)
                    }
                    return l
                }
            }(window.jQuery);
            window.$.fn.template = function (e, t, n) {
                var i = arguments;
                return this.each(function () {
                    u.apply($(this).data("fix-data") || window, [this].concat([].slice.call(i)))
                })
            }, window.$.fn.fixData = window.$.fn.thisData = function (e) {
                return 0 == arguments.length ? this.data("fix-data") : this.each(function () {
                    $(this).data("fix-data", e)
                })
            }, window.$.fn.tpsource = function (e) {
                return 0 == arguments.length ? this[0].getAttribute("tpsource") : this.each(function () {
                    $(this).attr("tpsource", "function" == typeof e ? e($(this)) : e)
                })
            }, e("./xtp.filter"), e("./xtp.table"), e("./xtp.fixtable"), e("./xtp.customcols");
            var f = {$template: u};
            t.exports = f
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/xtp.js", "/lib")
    }, {"./xtp.customcols": 63, "./xtp.filter": 64, "./xtp.fixtable": 65, "./xtp.table": 67, "1YiZ5S": 4, buffer: 1}],
    67: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            function c(e, t) {
                "use strict";
                var n = $('<script type="template/text"><\/script>');
                return 0 === e.indexOf("<") ? (n.prop("id", "tpl-ct-tag-" + (t || $.random())), c.createdMap[e] = n.prop("id"), n.html(e)) : (n.prop("id", "tpl-ct-tag-" + e.replace(/\./g, "-")), n.html($module(e))), n.appendTo("body"), n.prop("id")
            }

            function d(e, t, n) {
                "use strict";
                e.key = e.key || e.map, e.render ? t.each(function (i, o) {
                    i.extending("_render4{0}{1}_".format(e.key, n), e.render.call(e, t[o][e.key], t[o], o))
                }) : e.template && (0 === e.template.indexOf("#") || (e.template = e.template.indexOf("<") > -1 ? "#" + e.template + "#" : "#" + c(e.template)))
            }

            function u(e, t) {
                "use strict";
                return e.render ? "{_render4" + e.key + t + "_}" : e.template ? "{{" + e.key + ":" + e.template + "}}" : "{" + e.key + (e.filter ? "." + e.filter : "") + "}"
            }

            function f(e) {
                var t, n = e.closest("table");
                return (n.is(".cross-fix-cols-head") || (n.is(".native-fix-wrap>table") || n.is(".col-fix-wrap>table")) && n.parent().parent().is(".all-fix-wrap")) && (t = n.closest(".all-fix-wrap").find(".col-end-fix-wrap>table")), t
            }

            c.createdMap = Object.create(null), $.fn.table = function (e) {
                var t = this, n = typeOf(arguments[0]);
                if ("array" === n || "null" === n) {
                    var i = t.data("table-config") || $module(t.attr("x-setting"));
                    return "object" == typeof i ? (i.data = arguments[0], t.table(i)) : t
                }
                var o = e.cols, r = e.data, a = e.helper, s = !1 !== e.allowHTML;
                if (!t.length || !o.length)return t;
                if (e && !e.hasOwnProperty("data"))return t.data("table-config", e).attr("x-table", "");
                if (!r || !r.length && !1 === e.alwaysShowTh)return t.template(r, a, s);
                var l = o.length,
                    c = '<th col-map="{1}" class="xtp-{0}-th-{1} {2} {3} {10}" {4} {6} {8} {9}>{7}{5}</th>',
                    p = '<td class="xtp-{0}-td-{1} {2} {3} {6}" rowspan="{7}">{5}{4}</td>';
                if ("string" == typeof o[0] && (o = o.select("r => {title:r,map:r}")), o.any("o => o.rowspan")) {
                    var h;
                    r.where("o => o.rowspan").each(function (e, t) {
                        h || (h = e.rownum || e.rowNum || t + 1), e.extending("$rowspanNum", h + t), e.extending("_rowspanNum", h + t)
                    })
                }
                if (e.fixCols) {
                    var m = e.fixCols.left, g = e.fixCols.right;
                    m && o.slice(0, m).each('o => o.fix="left",o.custom=false'), g && o.slice(l - g).each('o => o.fix="right",o.custom=false')
                }
                var b = "<tr>", v = "<tr>", x = "", w = "", y = "check" + $.random();
                !1 === e.custom && t.addClass("no-custom"), o.each(function (n, i) {
                    if (d(n, r, i), !n.hide) {
                        var o = n.cls || "";
                        "rownum" == n.key.lower().replace("$", "") && (o += " tleft "), x = c.format(t[0].id || "", n.key.split(".")[0], n.fix ? "left" == n.fix ? "need-fix" : "need-fix-end" : "", o, n.sort ? 'sort-name="{0}"'.format(n.sort) : "", n.title, !1 !== n.custom ? "string" == typeof n.custom ? n.custom : "cs" : "", e.check && 0 == i ? '<div class="xtp-check-wrap"><input type="checkbox" class="xtp-check-tr-all" xtp-check-for="{0}"></div>'.format(y) : "", !1 === n.customInit ? 'cs-init="false"' : "", "desc" == n.sortOrder ? 'sort-order="desc"' : "", n.sortOrder ? "sort-" + ("desc" == n.sortOrder ? "asc" : "desc") : ""), w = p.format(t[0].id || "", n.key.split(".")[0], n.fix ? "left" == n.fix ? "need-fix" : "need-fix-end" : "", o, u(n, i), e.check && 0 == i ? '<div class="xtp-check-wrap"><input type="checkbox"  class="xtp-check-tr" tr-param="{{0}}" tr-index="{$index.toString}" tr-rownum="{{1}}" xtp-checked="{_trChecked}" x-checked="{_trChecked}" xtp-check-cid="{2}"></div>'.format("string" == typeof e.check ? e.check : "", n.key, y) : "", n.rowspan ? "hideplus{rowspan}" : "", n.rowspan ? "{rowspan}" : ""), b += x + "\n", v += w + "\n"
                    }
                }), b += "</tr>", v += "</tr>";
                var _,
                    C = '<thead class="{0}">{1}</thead><tbody>{2}</tbody>'.format(!1 !== e.fixHead ? "need-fix" : "", b, $compile.bind(t.data("fix-data"))(v, r, a, s));
                if (!t.is("table"))throw new Error("the element is not a table!");
                _ = t.attr("x-table", "").addClass("typical-tb " + (e.cls || "")).template(C, null, null, r).data("table-config", e), _.hasClass("has-checkbox") && _.find("[xtp-checked]").each(function () {
                    this.checked = $(this).attr("xtp-checked")
                });
                var k = _.closest(".hook-table-wrap, .query-result");
                return k.length > 0 || (k = $("body")), e.check && k.on("click", ".xtp-check-tr-all", function (e) {
                    var t = $(this), n = this.checked;
                    k.find(".xtp-check-tr").filter('[xtp-check-cid="{0}"]'.format(t.attr("xtp-check-for"))).prop("checked", n).each(function (e) {
                        $(this).closest("tr").toggleClass("checked", n)
                    });
                    var i = f(t);
                    i && i.find(">tbody>tr").toggleClass("checked", n)
                }).on("click", ".xtp-check-tr", function (e) {
                    var t = $(this), n = this.checked, i = t.closest("tr").index();
                    k.find(".xtp-check-tr").filter('[xtp-check-cid="{0}"]'.format(t.attr("xtp-check-cid"))).filter('[tr-index="{0}"]'.format(t.attr("tr-index"))).prop("checked", n).each(function () {
                        $(this).closest("tr").toggleClass("checked", n)
                    });
                    var o = f(t);
                    o && o.find(">tbody>tr").eq(i).toggleClass("checked", n)
                }), e.callback = e.callback || Function.voidFn, !1 === e.fixCols ? setTimeout(e.callback, 0) : _.fixTable("all", e.callback), !1 === e.custom ? t : t.customCol("cs")
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/xtp.table.js", "/lib")
    }, {"1YiZ5S": 4, buffer: 1}],
    68: [function (e, t, n) {
        (function (e, n, i, o, r, a, s, l, c) {
            var d, n = window, u = Object.create(null), f = {_null_: ""}, p = function (e) {
                var t = $.extend(e, f);
                return t.xname = t["x-name"] = $(this).attr("x-name"), t
            }, h = function (e, t) {
                return $($compile(e, t))
            }, m = function () {
                return [].slice.call(this.attributes).some(function (e) {
                    return 0 == e.name.indexOf("data-")
                })
            };
            n.$widget = n.$widget || function (e, t) {
                    return u[e] = u[e] || t(), n.$widget
                }, n.$behavior = n.$behavior || n.$widget;
            var g = {
                behavior: function (e, t, n) {
                    return e.trim().split(" ").each(function (e) {
                        e = e.trim();
                        var t = u[e];
                        if (!t)throw new Error("can not find the behavior: " + e);
                        n = n.concat(t.importing || [])
                    }), n
                }, widget: function (e, t, n) {
                    var i = u[e];
                    if (!i)throw new Error("can not find the widget: " + e);
                    return "string" == typeof i.template && 0 != i.template.indexOf("<") && n.push(i.template), n.concat(i.importing || [])
                }, includeOrReplace: function (e, t, n) {
                    return n.push(e), n.concat((t.attr("importing") || "").split(","))
                }, include: function (e, t, n) {
                    return g.includeOrReplace(e, t, n)
                }, replace: function (e, t, n) {
                    return g.includeOrReplace(e, t, n)
                }
            }, b = {
                behavior: function (e, t, n, i) {
                    return e.trim().split(" ").each(function (e) {
                        e = e.trim();
                        var o = u[e];
                        if (!o)throw new Error("there has not behavior: " + e);
                        i.push(function () {
                            o.init.call(t, n), t.removeClass("x-widget-loading")
                        })
                    }), t
                }, widget: function (e, t, i, o) {
                    var r = u[e];
                    if (!r)throw new Error("can not find the widget/behavior:" + e);
                    var a = t.attr("behavior"), s = t[0].id, l = t[0].className, c = t.attr("x-hide"),
                        d = t.attr("x-show"), f = t.attr("x-bind"), p = t.attr("x-name"), m = r.boot || h;
                    i.name || (i.name = p, t.attr("data-name", i.name)), o.push(function () {
                        var e = n.$cache(r.template) || r.template, o = e ? m.call(t[0], e, i) : null;
                        o ? (o.addClass(l).prop("id", s).attr({
                            "x-name": p,
                            "x-hide": c,
                            "x-show": d,
                            "x-bind": f
                        }), t.replaceWith(o), r.init.call(o, i), o.removeClass("x-widget-loading"), o.scanSubWidget(), o.behavior(a)) : (r.init.call(t, i), t.removeClass("x-widget-loading"))
                    })
                }, includeOrReplace: function (e, t, i, o, r) {
                    r.push(function () {
                        var r, a = i.attr("behavior"), s = n.$cache(t), l = m.call(i[0]);
                        if (!s)throw new Error("the replace/include source is undefined in cahe");
                        "replace" == e ? (r = l ? $($compile(s, o, !0)) : $(s), i.replaceWith(r)) : (i.html(l ? $compile(s, o, !0) : s).removeAttr("include"), r = i), r.removeClass("x-widget-loading"), r.scanSubWidget(), r.behavior(a)
                    })
                }, replace: function (e, t, n, i) {
                    return b.includeOrReplace("replace", e, t, n, i)
                }, include: function (e, t, n, i) {
                    return b.includeOrReplace("include", e, t, n, i)
                }
            }, v = function (e, t, i) {
                var o = "string" == typeof t ? t : null, r = "function" == typeof t ? t : i, a = $.Deferred(), s = this,
                    l = [], c = [];
                return s.each(function (t, n) {
                    var i = $(n), r = p.call(this, i.data()), a = o || i.attr(e) || i.attr("xtp-" + e);
                    a && (i.addClass("x-widget-loading"), r.name || (r.name = i.attr("x-name"), i.attr("data-name", r.name)), l = g[e](a, i, l), b[e](a, i, r, c)), i.removeAttr(e)
                }), importing.apply(n, l.distinct().concat(function () {
                    c.fire(), "function" == typeof r && r(), a.resolve()
                })), a.promise()
            };
            ["replace", "include", "behavior", "widget"].forEach(function (e) {
                $.fn[e] = function () {
                    return v.apply(this, [e, arguments[0], arguments[1]])
                }
            }), $.fn.scanSubWidget = function (e) {
                var t = this;
                return t.find("[replace]").addBack().replace().done(function () {
                    return t.find("[include]").addBack().include()
                }).done(function () {
                    return t.find("[widget]").addBack().widget()
                }).done(function () {
                    return t.find("[behavior]").addBack().behavior()
                }).done(function () {
                    return "function" == typeof e && e()
                })
            }, t.exports = {
                reg: function (e) {
                    var t = n.importing;
                    if (t.getRegState())return null;
                    var i = this === window ? $("body") : $(this), o = [];
                    if (d = $(d).add(i.find("[widget]")).add(i.find("[replace],[include]")).add(i.find("[behavior]")), d.each(function (e, t) {
                            var n = $(t), i = n.attr("widget"), r = n.attr("behavior"), a = n.attr("replace"),
                                s = n.attr("include");
                            if (n.attr("widget-reg-done"))return !1;
                            a || s ? o = g.includeOrReplace(a || s, n, o) : i && (o = g.widget(i, n, o)), r && (o = g.behavior(r, n, o)), n.attr("widget-reg-done", !0)
                        }), t.setRegState(!0), o.where(" v => v ").length) {
                        var r = o.concat(e).distinct();
                        return function () {
                            t.apply(null, r)
                        }
                    }
                    return null
                }, init: function () {
                    var e = n.importing, t = [];
                    if (e.getInitState())return !1;
                    d.each(function (e, n) {
                        var i = $(n), o = p.call(this, i.data()), r = i.attr("widget"), a = i.attr("behavior"),
                            s = i.attr("replace"), l = i.attr("include");
                        if (i.attr("widget-init-done"))return !1;
                        r ? b.widget(r, i, o, t) : s ? b.replace(s, i, o, t) : l ? b.include(l, i, o, t) : a && b.behavior(a, i, o, t), i.removeAttr("widget").removeAttr("behavior").removeAttr("include").removeAttr("replace").attr("widget-init-done", !0)
                    }), e.setInitState(!0), t.fire()
                }
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/lib/xtp.widget.js", "/lib")
    }, {"1YiZ5S": 4, buffer: 1}],
    69: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            window.$resetter("childInput-agent", function (e) {
                var t = $(this);
                t.data(), t.attr("x-name");
                t.children("input").val("")
            })("dict", function (e, t, n) {
                var i = $(this), o = i.attr("dict-id"), r = $("#" + o + "_displayValue"), a = $("#" + o);
                r.val(""), a.val("")
            })("dict.select", function (e) {
                if (e) $(this).children("select").val(e); else {
                    var t = $(this).children("select").children("option").eq(0).val();
                    $(this).children("select").val(t)
                }
            })("dict.xkStyle", function (e, t, n) {
                return $(this).children("label:first").trigger("click")
            })("dict.AJLBDM.not-xk", function (e, t, n) {
                return xResetters.dict.call(this, e, t, n)
            })("xWrap.radio", function (e, t, n) {
                $(this).find("[type=radio]").each(function (e, t) {
                    t.checked = t.hasAttribute("default")
                })
            })("xWrap.select", function (e, t, n) {
                $(this).find("select").children().attr("selected", !1).eq(0).attr("selected", !0)
            })("xWrap.checkbox", function (e, t, n) {
                $(this).find(":checkbox").each(function (e, t) {
                    t.checked = t.hasAttribute("default")
                })
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/resetter.js", "/")
    }, {"1YiZ5S": 4, buffer: 1}],
    70: [function (e, t, n) {
        (function (t, n, i, o, r, a, s, l, c) {
            e("./widgets/btns"), e("./widgets/date-options"), e("./widgets/inline-select"), e("./widgets/x-select-wrap"), e("./widgets/auto-scroll-menu"), e("./widgets/more-condition"), e("./widgets/p-title"), e("./widgets/query-title"), e("./widgets/query-result"), e("./widgets/common-panel-heading"), e("./widgets/query-heading"), e("./widgets/query-header"), e("./widgets/go-top"), e("./widgets/textarea-hascount")
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/widget.js", "/")
    }, {
        "./widgets/auto-scroll-menu": 71,
        "./widgets/btns": 72,
        "./widgets/common-panel-heading": 73,
        "./widgets/date-options": 74,
        "./widgets/go-top": 75,
        "./widgets/inline-select": 76,
        "./widgets/more-condition": 77,
        "./widgets/p-title": 78,
        "./widgets/query-header": 79,
        "./widgets/query-heading": 80,
        "./widgets/query-result": 81,
        "./widgets/query-title": 82,
        "./widgets/textarea-hascount": 83,
        "./widgets/x-select-wrap": 84,
        "1YiZ5S": 4,
        buffer: 1
    }],
    71: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            $widget("auto-scroll-menu", function () {
                return {
                    template: "_temp/auto-scroll-menu.htm",
                    importing: "auto-scroll-menu.css",
                    boot: function (e, t) {
                        var n = t.info.split(";"), i = t.opt && t.opt.split(";"), o = {list: [], opt: []};
                        return n.each(function (e, t) {
                            var n = e.split(":");
                            o.list.push({
                                blockid: n[2],
                                blocklongcn: n[1],
                                blockcn: n[0],
                                active: 0 == t ? "active" : ""
                            })
                        }), i && i.each(function (e) {
                            var t = e.split(":");
                            o.opt.push({cls: t[1], title: t[0]})
                        }), $($compile(e, o))
                    },
                    init: function (e) {
                        var t = e.defaultwidth || 55, n = e.unfoldwidth || 135;
                        $(".main-nav").css("width", t).on("click", "li", function () {
                            var e = $(this), t = e.attr("pid");
                            e.addClass("active").siblings("li").removeClass("active"), $("html, body").animate({scrollTop: $("#" + t).offset().top - 5}, 0)
                        }).on("click", ".icon-angle-up", function () {
                            var e = $(this).closest(".main-nav").children("ul"), t = e.find(".active").index();
                            0 != t && e.children("li").eq(t - 1).trigger("click")
                        }).on("click", ".icon-angle-down", function () {
                            var e = $(this).closest(".main-nav").children("ul"), t = e.find(".active").index();
                            t != e.children("li").length - 1 && e.children("li").eq(t + 1).trigger("click")
                        }).on("click", ".icon-eject.o-left", function () {
                            var e = $(".main-nav"), t = $(this);
                            e.addClass("unfold"), e.animate({width: n}, function () {
                                t.removeClass("o-left").addClass("o-right"), e.children("ul").find("u").each(function (e, t) {
                                    $(t).html($(t).attr("blocklongcn"))
                                })
                            })
                        }).on("click", ".icon-eject.o-right", function () {
                            var e = $(".main-nav"), n = $(this);
                            e.children("ul").find("u").each(function (e, t) {
                                $(t).html($(t).attr("blockcn"))
                            }), e.animate({width: t}, function () {
                                n.removeClass("o-right").addClass("o-left"), e.removeClass("unfold")
                            })
                        }), $(window).on("scroll", function () {
                            var e = $("body");
                            $(".xui-panel").each(function () {
                                var t = $(this), n = t.offset().top - e.scrollTop();
                                n > 0 && n < 100 && ($(".main-nav ul li").removeClass("active"), $('[pid="{0}"]'.format(t.prop("id"))).addClass("active"))
                            })
                        })
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/widgets/auto-scroll-menu.js", "/widgets")
    }, {"1YiZ5S": 4, buffer: 1}],
    72: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            function c(e, t, n) {
                e.click($.dbs(function () {
                    e.trigger(t)
                }, 1200, !0))
            }

            $widget("query-reset-btns", function () {
                return {
                    template: "_temp/query-btns.htm", init: function (e) {
                        var t = $(this), n = e.resetTxt || "重 置", i = e.queryTxt || "查 询";
                        t.find(".cm-reset-btn").html(n), t.find(".cm-query-btn").html(i), c(t.find(".cm-query-btn"), "x-query"), c(t.find(".cm-reset-btn"), "x-reset")
                    }
                }
            })("query-btn", function () {
                return {
                    template: '<b class="cm-query-btn">查 询</b>', init: function (e) {
                        var t = e.txt || "查 询";
                        $(this).html(t), c($(this), "x-query")
                    }
                }
            })("reset-btn", function () {
                return {
                    template: '<b class="cm-reset-btn">重 置</b>', init: function (e) {
                        var t = e.txt || "重 置";
                        $(this).html(t), c($(this), "x-reset")
                    }
                }
            })("save-btn", function () {
                return {
                    template: '<b class="cm-save-btn">保 存</b>', init: function (e) {
                        c($(this), "x-save")
                    }
                }
            })("ok-btn", function () {
                return {
                    template: '<b class="cm-ok-btn">确 定</b>', init: function (e) {
                        c($(this), "x-ok")
                    }
                }
            })("cancel-btn", function () {
                return {
                    template: '<b class="cm-cancel-btn">取 消</b>', init: function (e) {
                        c($(this), "x-cancel")
                    }
                }
            })("close-btn", function () {
                return {
                    template: '<b class="cm-cancel-btn">关 闭</b>', init: function (e) {
                        c($(this), "x-close")
                    }
                }
            })("add-btn", function () {
                return {
                    template: '<i class="cm-btn-icon h-add orange-btn">添加</i>', init: function (e) {
                        var t = e.txt || "添加";
                        $(this).text(t), c($(this), "x-add")
                    }
                }
            })("remove-btn", function () {
                return {
                    template: '<i class="cm-btn-icon h-delete red-btn">删除</i>', init: function (e) {
                        $(this);
                        c($(this), "x-remove")
                    }
                }
            })("batch-remove-btn", function () {
                return {
                    template: '<i class="cm-btn-icon h-delete red-btn">批量删除</i>', init: function (e) {
                        $(this);
                        c($(this), "x-batch-remove")
                    }
                }
            })("edit-btn", function () {
                return {
                    template: '<i class="cm-btn-icon h-edit orange-btn">修改</i>', init: function (e) {
                        c($(this), "x-edit")
                    }
                }
            })("excel-btn", function () {
                return {
                    template: '<i class="cm-btn-icon h-export orange-btn">导出</i>', init: function (e) {
                        c($(this), "x-excel")
                    }
                }
            })("import-btn", function () {
                return {
                    template: '<i class="cm-btn-icon h-import orange-btn">导入</i>', init: function (e) {
                        c($(this), "x-import")
                    }
                }
            })("print-btn", function () {
                return {
                    template: '<i class="cm-btn-icon icon-print orange-btn">打印</i>', init: function (e) {
                        c($(this), "x-print")
                    }
                }
            })("send-btn", function () {
                return {
                    template: '<i class="cm-btn-icon h-goto orange-btn">发送</i>', init: function (e) {
                        c($(this), "x-send")
                    }
                }
            })("upload-btn", function () {
                return {
                    template: '<i class="cm-btn-icon h-upload orange-btn">上传</i>', init: function (e) {
                        c($(this), "x-upload")
                    }
                }
            })("download-btn", function () {
                return {
                    template: '<i class="cm-btn-icon h-download orange-btn">下载</i>', init: function (e) {
                        c($(this), "x-download")
                    }
                }
            })("return-btn", function () {
                return {
                    template: '<i class="cm-btn-icon icon-reply orange-btn">返回</i>', init: function (e) {
                        c($(this), "x-return")
                    }
                }
            })("copy-btn", function () {
                return {
                    template: '<i class="cm-btn-icon h-copy orange-btn">复制</i>', init: function (e) {
                        var t = e.txt || "复制";
                        $(this).text(t), c($(this), "x-copy")
                    }
                }
            })("xui-choose-wz", function () {
                return {
                    template: '<b id="ck-add-wz" class="cm-send-btn btn-icon choose-wz no-after-content">选择物证</b>',
                    init: function (e) {
                        c($(this), "x-choose-wz")
                    }
                }
            })("xui-remove-batch-btn", function () {
                return {
                    template: '<b class="btn-icon xui-remove-batch no-after-content">批量删除</b>', init: function (e) {
                        c($(this), "x-remove-batch")
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/widgets/btns.js", "/widgets")
    }, {"1YiZ5S": 4, buffer: 1}],
    73: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            $widget("common-panel-heading", function () {
                return {
                    template: '<div class="common-panel-heading"><ul class="clearfix"><li class="active">查询条件</li><li class="hider">历史查询条件</li><li>已保存条件</li></ul></div><div class="cq-condition al-history-condition"></div><div class="cq-condition al-save-condition"></div>',
                    init: function (e) {
                        var t = $(this), n = t.filter(".al-save-condition"), i = t.find("li");
                        "hide" == e.saved && t.find("ul>li:eq(2)").hide(), "show" == e.history && t.find("ul>li:eq(1)").show(), i.click(function () {
                            i.removeClass("active"), $(this).addClass("active");
                            var e = $(this).text();
                            "查询条件" == e ? n.hide().prev().hide().end().next().show() : "历史查询条件" == e ? n.hide().prev().show().end().next().hide() : "已保存条件" == e && n.show().prev().hide().end().next().hide()
                        })
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/widgets/common-panel-heading.js", "/widgets")
    }, {"1YiZ5S": 4, buffer: 1}],
    74: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            var c = {
                empty: "不限,无",
                today: "今天,当天,当天内",
                "3days": "近三天,3天",
                "5days": "近五天,5天内",
                week: "近一周,本周,7天内",
                prevMonth: "上月",
                month: "本月,当月内",
                season: "本季度",
                year: "本年,当年内"
            }, d = function (e) {
                var t = $(this);
                e = e || t.data();
                var n = t.find("u"), i = t.find("input");
                t.on("x-default", function (e) {
                    n.each(function (e, t) {
                        $(t).hasClass("default") && $(t).click()
                    }), e.stopPropagation()
                }), t.on("x-select", function (e, t) {
                    n.each(function (e, n) {
                        $(n).attr("val") == t && $(n).click()
                    }), e.stopPropagation()
                }), i.attr("data-bname", e.bname || "").attr("data-ename", e.ename || ""), t.extractor(function (e, t) {
                    return $extractor("rangeDate").call(i, e, t)
                }), t.injector(function (e, t, n) {
                    return $injector("rangeDate").call(i, e, t, n)
                }), t.resetter(function () {
                    t.find("span>u").eq(0).click()
                }), i.addClass("cm-input date-range-picker").daterangepicker()
            }, u = function (e) {
                var t = $(this), n = c[e.default];
                t.find(".date-range-picker");
                t.find(".date-select").children().click(function () {
                    var e = $(this);
                    e.addClass("active").siblings("u").removeClass("active");
                    var t = e.text(), n = e.parent().siblings(".text-time").children("input");
                    "不限" == t || "无" == t ? n.val("") : "今天" == t || "当天" == t || "当天内" == t ? n.val(DTU.today + "," + DTU.today) : "近三天" == t || "3天内" == t ? n.val(DTU.threeDaysBefore + "," + DTU.today) : "近五天" == t || "5天内" == t ? n.val(DTU.fiveDaysBefore + "," + DTU.today) : "近一周" == t || "本周" == t || "7天内" == t ? n.val(DTU.weekBegin + "," + DTU.weekEnd) : "本月" == t || "当月内" == t ? n.val(DTU.monthBegin + "," + DTU.monthEnd) : "上月" == t ? n.val(DTU.prevMonthBegin + "," + DTU.prevMonthEnd) : "本季度" == t ? n.val(DTU.seasonBegin + "," + DTU.seasonEnd) : "本年" != t && "当年内" != t || n.val(DTU.yearBegin + "," + DTU.yearEnd)
                }), parseInt(e.default) ? t.find("input").val(e.default) : t.find(".date-select").children().each(function () {
                    n && n.indexOf($(this).text()) > -1 && $(this).click()
                }), t.xMethod("getSelectedVal", function () {
                    return t.find("u.active").text()
                }), d.call(this, e)
            };
            $widget("date-options", function () {
                return {
                    template: "_temp/date-options.htm",
                    importing: ["daterangepicker", "currentDate", "inline-select"],
                    init: u
                }
            })("date-options2", function () {
                return {template: "_temp/date-options2.htm", importing: ["daterangepicker", "currentDate"], init: u}
            })("date-options3", function () {
                return {template: "_temp/date-options3.htm", importing: ["daterangepicker", "currentDate"], init: u}
            })("date-options4", function () {
                return {template: "_temp/date-options4.htm", importing: ["daterangepicker", "currentDate"], init: u}
            })("date-options5", function () {
                return {template: "_temp/date-options5.htm", importing: ["daterangepicker", "currentDate"], init: u}
            })("date-options6", function () {
                return {
                    template: "_temp/date-options6.htm",
                    importing: ["daterangepicker", "currentDate", "inline-select"],
                    init: u
                }
            })("date-options7", function () {
                return {template: "_temp/date-options7.htm", importing: ["daterangepicker", "currentDate"], init: u}
            })("date-options8", function () {
                return {template: "_temp/date-options8.htm", importing: ["daterangepicker", "currentDate"], init: u}
            })("date-options-all", function () {
                return {
                    template: "_temp/date-options-all.htm",
                    importing: ["daterangepicker", "currentDate"],
                    boot: function (e, t) {
                        var n = [{txt: "不限", cls: "default active"}];
                        return t.txtList = n.concat(t.txt.split(",").select("o=>{txt:o}")), $($compile(e, t))
                    },
                    init: u
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/widgets/date-options.js", "/widgets")
    }, {"1YiZ5S": 4, buffer: 1}],
    75: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            $widget("go-top", function () {
                return {
                    template: '<a class="go-top h-collapse" href="javascript:;" title="返回顶部"></a>',
                    init: function (e) {
                        var t = $(this), n = t.parent(), i = +e.threshold || 150, o = e.bottom;
                        void 0 !== o && t.css("bottom", o), n.scroll(function () {
                            n.scrollTop() < i ? t.fadeOut() : t.fadeIn()
                        }), t.click(function () {
                            t.parent().animate({scrollTop: 0}, 200)
                        })
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/widgets/go-top.js", "/widgets")
    }, {"1YiZ5S": 4, buffer: 1}],
    76: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            $widget("inline-select", function () {
                return {
                    importing: ["inline-select"], init: function (e) {
                        if (e.act) {
                            var t = $(this);
                            window["$" + (e.act.split("@")[1] || "get")](window.makeAct(e.act.split("@")[0], null, e.subprj), null, function (n) {
                                t.inlineSelect($.extend(e, {ops: n.data}))
                            }, !1)
                        } else if ("string" == typeof e.ops) {
                            var n = e.ops.split(",");
                            e.ops = n.select('o => { txt:o.split(":")[0].trim(), val:o.split(":")[1].trim() }'), $(this).inlineSelect(e)
                        } else $(this).inlineSelect(e)
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/widgets/inline-select.js", "/widgets")
    }, {"1YiZ5S": 4, buffer: 1}],
    77: [function (e, t, n) {
        (function (e, n, i, o, r, a, s, l, c) {
            function d(e) {
                var t = $(this), n = t.find("i.toggle-icon");
                t.on("click", function () {
                    $(".query-condition-hide").slideToggle(), n.toggleClass("icon-angle-down");
                    var e = n.is(".icon-angle-down") ? "展开查询条件" : "折叠查询条件";
                    t.attr("title", e).find("span").html(e)
                }), "open" == e.default && $(function () {
                    "展开查询条件" == t.attr("title") && t.click()
                })
            }

            function u(e) {
                var t = $(this);
                (e.selector ? t.find(e.selector) : t).on("click", function () {
                    $(".query-condition-hide").slideUp()
                })
            }

            function f() {
                $(this).on("click", function () {
                    $(".query-condition-hide").slideDown()
                })
            }

            $widget("more-condition", function () {
                return {
                    template: '<div class="more-condition" title="展开查询条件"><span>展开查询条件</span><i class="toggle-icon icon-angle-up icon-angle-down"></i></div>',
                    init: function (e) {
                        d.call(this, e)
                    }
                }
            }), t.exports = {toggleMoreCondition: d, hideMoreCondition: u, showMoreCondition: f}
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/widgets/more-condition.js", "/widgets")
    }, {"1YiZ5S": 4, buffer: 1}],
    78: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            function c(e) {
                var t = $(this);
                $.colorBox(e.share ? null : this), t.parent().fullPanel()
            }

            $widget("p-title", function () {
                return {
                    template: "_temp/panel-title.htm", importing: "panelCtrls", boot: function (e, t) {
                        var n = t.btns;
                        return n && (t.btns = str2obj(n.replace(/\'/g, '"'))), $($compile(e, t))
                    }, init: function (e) {
                        c.call(this, e)
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/widgets/p-title.js", "/widgets")
    }, {"1YiZ5S": 4, buffer: 1}],
    79: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            function c(e, t, n) {
                var i = '<div>                        <p>                            <i class="icon-remove del-condition" title="删除已保存条件"></i>                            <i class="icon-search search-condition" title="使用已保存条件查询"></i>                            <em>{0}</em>.                        </p>                        <ul class="clf"></ul>                    </div>',
                    o = $(i.format(t)), r = str2obj(n.queryContent);
                o.find(".del-condition").attr("del-id", n.id), o.find(".search-condition").data("queryCondition", r.queryObj), r.config.each(function (e) {
                    o.children("ul").append($compile('<li class="fl"><u>{title}</u><span>{content}</span></li>', e))
                }), e.append(o)
            }

            function d(e) {
                var t = e.xVal(), n = e.attr("storage-key"), i = [];
                return e.find(".hook-label").each(function (t, n) {
                    var o = $(n).parent(), r = o.attr("x-name") || o.find("[x-name]").attr("x-name"),
                        a = e.find('[x-name="{0}"]'.format(r)),
                        s = {title: $(n).text(), content: a.xMethod("getDisVal") ? a.xMethod("getDisVal")() : a.xVal()},
                        l = a.xVal();
                    null != l && "" !== l && i.push(s)
                }), {queryType: n, queryContent: obj2str({queryObj: t, config: i})}
            }

            function u(e) {
                var t = $(".query-condition-selected");
                e.find("[x-name]").each(function (e, n) {
                    if ($(n).xMethod("getSelectedVal") || $(n).xMethod("getDisVal")) {
                        var i = "qh-" + $.random();
                        $(n).attr("qh-id", i);
                        var o = $(n).xMethod("getSelectedVal") ? $(n).xMethod("getSelectedVal")() : $(n).xMethod("getDisVal")(),
                            r = {queryId: i, uTxt: o};
                        "不限" === o && (r.liCls = "hider"), t.children(".active-search-list").append($compile('<li qh-id="{queryId}" class="{liCls}">                                        <span>{uTxt}</span>                                        <em></em>                                    </li>', r))
                    }
                })
            }

            function f(e, t) {
                var n = e.next(), i = n.next(), o = t.find(".query-widget-wrap");
                t.find(".query-condition-selected").remove(), o.children("hr").after('<div class="query-condition-selected">                                <label class="mb0">已选条件：</label>                                <ul class="active-search-list clf"></ul>                                <p class="btn-save-condition">                                    <i class="icon-save"></i>                                    <a href="javascript:;">保存该条件</a>                                </p>                            </div>'), e.off("click.QH").on("click.QH", "[qh-id] u,[qh-id] label", function () {
                    var e = $(this).text(), t = $(this).closest("[qh-id]").attr("qh-id"),
                        n = $('.query-condition-selected>.active-search-list>li[qh-id="{0}"]'.format(t));
                    "不限" === e ? n.hide().find("span").html("") : n.show().find("span").html(e)
                }), o.off("x-query.QH").on("x-query.QH", function (t, i) {
                    if (!i) {
                        var o = d(e);
                        0 !== str2obj(o.queryContent).config.length && C.add(o).then(function (e) {
                            c(n, n.children("div").length + 1, e.data)
                        })
                    }
                }).off("click.QH").on("click.QH", ".btn-save-condition", function () {
                    var t = d(e);
                    0 !== str2obj(t.queryContent).config.length ? _.add(t).then(function (e) {
                        c(i, i.children("div").length + 1, e.data)
                    }) : toast(" 当前无需要保存的查询条件！").warn()
                }), u(e)
            }

            function p(e, t, n) {
                var i = location.pathname.replace(/.+\/|\..+$/g, "");
                t.each(function (e) {
                    var t = $(this), n = $('<div class="history-condition">'), o = $('<div class="saved-condition">'),
                        r = t.prop("id") || e, a = "{0}-form-{1}".format(i, r);
                    t.attr("storage-key", a), t.after(n), n.after(o), C.init(n, a), _.init(o, a)
                })
            }

            function h(e, t, n) {
                var i = e.find(">ul>li");
                i.click(function () {
                    i.removeClass("active"), $(this).addClass("active");
                    var e = $(this).text(), o = t.filter(":visible"), r = $(".history-condition").filter(":visible"),
                        a = $(".saved-condition").filter(":visible");
                    o.length > 0 ? (r = o.next(), a = r.next()) : r.length > 0 ? (o = r.prev(), a = r.next()) : a.length > 0 && (o = a.prev().prev(), r = a.prev()), "查询条件" === e ? (n.find(".query-widget-wrap").add(o).show(), $(".history-condition,.saved-condition").hide()) : "历史查询条件" === e ? (n.find(".query-widget-wrap").add(o).hide(), a.hide(), r.show()) : "已保存条件" === e && (n.find(".query-widget-wrap").add(o).hide(), r.hide(), a.show())
                }), e.on("x-resetHead", function () {
                    f(t.filter(":visible"), n)
                }), e.find(".hook-query-li").click($.dbs(function () {
                    e.trigger("x-resetHead")
                }, 800, !0))
            }

            function m(e, t, n) {
                n.on("click", ".query-condition-selected .active-search-list em", function () {
                    var e = $(this).closest("li"), n = e.attr("qh-id"),
                        i = t.filter(":visible").find('[qh-id="{0}"]:not(.query-condition-selected li)'.format(n));
                    e.hide().find("span").html(""), i.xReset()
                }).on("click", ".history-condition .del-condition", function () {
                    var e = $(this), t = e.closest(".history-condition");
                    C.del(e.attr("del-id")).then(function (n) {
                        toast(" 删除成功！").ok(), e.closest("div").remove(), t.children("div").each(function (e, t) {
                            $(t).find("em").text(e + 1)
                        })
                    })
                }).on("click", ".saved-condition .del-condition", function () {
                    var e = $(this), t = e.closest(".saved-condition");
                    _.del(e.attr("del-id")).then(function (n) {
                        toast(" 删除成功！").ok(), e.closest("div").remove(), t.children("div").each(function (e, t) {
                            $(t).find("em").text(e + 1)
                        })
                    })
                }).on("click", ".saved-condition .search-condition,.history-condition .search-condition", function () {
                    var e = $(this), t = e.data("queryCondition"), n = e.closest(".saved-condition,.history-condition");
                    (n.is(".history-condition") ? n.prev() : n.prev().prev()).trigger("x-query", [t])
                })
            }

            var g = makeAct("historyQueryAdd"), b = makeAct("historyQuery"), v = makeAct("historyQueryDel"),
                x = makeAct("savedQueryAdd"), w = makeAct("savedQuery"), y = makeAct("savedQueryDel"), _ = {
                    del: function (e) {
                        return $post(y, {id: e}, !1)
                    }, add: function (e) {
                        return $post(x, e, !1)
                    }, init: function (e, t) {
                        $post(w, {queryType: t}, function (t) {
                            t.data.each(function (t, n) {
                                c(e, n + 1, t)
                            })
                        }, !1)
                    }
                }, C = {
                    del: function (e) {
                        return $post(v, {id: e}, !1)
                    }, add: function (e) {
                        return $post(g, e, !1)
                    }, init: function (e, t) {
                        $post(b, {queryType: t}, function (t) {
                            t.data.each(function (t, n) {
                                c(e, n + 1, t)
                            })
                        }, !1)
                    }
                };
            $widget("query-header", function () {
                return {
                    template: '<div class="query-heading hook-query-head">                            <ul class="clf">                                <li class="active hook-query-li">查询条件</li>                                <li class="{history} hook-history-li">历史查询条件</li>                                <li class="{saved} hook-saved-li">已保存条件</li>                            </ul>                        </div>',
                    boot: function (e, t) {
                        return $($compile(e, t))
                    },
                    init: function (e) {
                        if ("hide" === e.saved && "hide" === e.history)return $(".hook-history-li, .hook-saved-li").remove();
                        var t = $(this), n = e["for-ready"] ? $(e["for-ready"]) : t.parent(),
                            i = e["for-form"] ? $(e["for-form"]) : t.nextAll("[x-form]").add(t.nextAll("div:not([x-form])").children("[x-form]"));
                        p(t, i, n), h(t, i, n), m(t, i, n), n.xReady(function () {
                            f(i.filter(":visible"), n)
                        })
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/widgets/query-header.js", "/widgets")
    }, {"1YiZ5S": 4, buffer: 1}],
    80: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            var c = makeAct("historyQueryAdd"), d = makeAct("historyQuery"), u = makeAct("historyQueryDel"),
                f = makeAct("savedQueryAdd"), p = makeAct("savedQuery"), h = makeAct("savedQueryDel"),
                m = function (e, t) {
                    $post(d, {queryType: t}, function (t) {
                        t.data.each(function (t, n) {
                            y(e, n + 1, t)
                        })
                    })
                }, g = function (e, t) {
                    $post(p, {queryType: t}, function (t) {
                        t.data.each(function (t, n) {
                            y(e, n + 1, t)
                        })
                    })
                }, b = function (e) {
                    return $post(c, e, function () {
                    })
                }, v = function (e) {
                    return $post(f, e, function () {
                    })
                }, x = function (e) {
                    return $post(u, {id: e}, function () {
                    })
                }, w = function (e) {
                    return $post(h, {id: e}, function () {
                    })
                }, y = function (e, t, n) {
                    var i = '<div>                                    <p>                                        <i class="icon-remove del-condition" title="删除已保存条件"></i>                                        <i class="icon-search search-condition" title="使用已保存条件查询"></i>                                        <em>{0}</em>.                                    </p>                                    <ul class="clearfix"></ul>                                </div>',
                        o = $(i.format(t)), r = str2obj(n.queryContent);
                    o.find(".del-condition").attr("delId", n.id), o.find(".search-condition").data("queryCon", r.queryStr), r.config.each(function (e) {
                        o.children("ul").append($compile('<li class="fl"><u>{title}</u><span>{content}</span></li>', e))
                    }), e.append(o)
                }, _ = function (e, t) {
                    var n = e.xVal(), i = [];
                    return e.find(".hook-label").each(function (t, n) {
                        var o = $(n).parent(), r = o.attr("x-name") || o.find("[x-name]").attr("x-name"),
                            a = e.find('[x-name="{0}"]'.format(r)),
                            s = {title: $(n).text(), content: a.xMethod("getDisVal") ? a.xMethod("getDisVal")() : a.xVal()};
                        a.xVal() && i.push(s)
                    }), {queryType: t, queryContent: obj2str({queryStr: n, config: i})}
                }, C = function (e) {
                    var t = $(".query-condition-selected");
                    e.find(".inline-select").each(function (e, n) {
                        var i = "qh-" + $.random();
                        $(n).attr("qh-id", i);
                        var o = $(n).find(".option>u.active"), r = {queryId: i, uTxt: o.text()};
                        "不限" === o.text() && (r.liCls = "hider"), t.children(".active-search-list").append($compile('<li qh-id="{queryId}" class="{liCls}">                                        <span>{uTxt}</span>                                        <em></em>                                    </li>', r))
                    })
                };
            $widget("query-heading", function () {
                return {
                    template: '<div class="query-heading hook-query-head">                    <ul class="clearfix">                        <li class="active">查询条件</li>                        <li class="{history}">历史查询条件</li>                        <li class="{saved}">已保存条件</li>                    </ul>                </div>',
                    boot: function (e, t) {
                        return $($compile(e, t))
                    },
                    init: function (e) {
                        var t = "hide" !== e.saved, n = "hide" !== e.history;
                        if (t || n) {
                            if (!e.forXForm)return void console.warn("query-heading组件展示‘历史查询条件’和‘已保存查询条件’，请配置data-for-x-form参数");
                            var i = $(this), o = i.find("li"), r = e.forXForm + "", a = r.split(","), s = [],
                                l = iframe.getAttribute("page-no"), c = [], d = [], u = [];
                            a.each(function (e, t) {
                                var n = $(e);
                                s.push(e + "@" + l), c.push("{0}:visible".format(e)), n.after('<div class="history-condition" for-x-form="{0}"></div>                          <div class="saved-condition" for-x-form="{0}"></div>'.format(e)), d.push('.history-condition[for-x-form="{0}"]:visible'.format(e)), u.push('.saved-condition[for-x-form="{0}"]:visible'.format(e)), m(n.next(), s[t]), g(n.next().next(), s[t])
                            });
                            var f, p, h;
                            o.click(function () {
                                o.removeClass("active"), $(this).addClass("active");
                                var e = $(this).text();
                                f = $(c.join(",")), p = $(d.join(",")), h = $(u.join(",")), f.length > 0 ? (p = f.next(), h = p.next()) : p.length > 0 ? (f = p.prev(), h = p.next()) : h.length > 0 && (f = h.prev().prev(), p = h.prev()), "查询条件" === e ? (f.show(), $(".query-widget-wrap").show(), p.hide(), h.hide()) : "历史查询条件" === e ? (f.hide(), $(".query-widget-wrap").hide(), p.show(), h.hide()) : "已保存条件" === e && (f.hide(), $(".query-widget-wrap").hide(), p.hide(), h.show())
                            });
                            var k = function (e, t, n) {
                                var i = $(".query-widget-wrap");
                                $(".query-condition-selected").remove(), i.children("hr").after('<div class="query-condition-selected">                                <label class="mb0">已选条件：</label>                                <ul class="active-search-list clearfix"></ul>                                <p class="btn-save-condition">                                    <i class="icon-save"></i>                                    <a href="javascript:void(0)">保存该条件</a>                                </p>                            </div>');
                                var o = $.map(a, function (t, n) {
                                    if (e.is($(t)))return n
                                });
                                e.off("click.QH").on("click.QH", ".inline-select u", function () {
                                    var e = $(this).text(), t = $(this).closest(".inline-select").attr("qh-id"),
                                        n = $('.query-condition-selected>.active-search-list>li[qh-id="{0}"]'.format(t));
                                    "不限" === e ? n.hide().find("span").html("") : n.show().find("span").html(e)
                                }), i.off("x-query.QH").on("x-query.QH", function (n, i) {
                                    if (!i) {
                                        var r = _(e, s[o]);
                                        0 !== str2obj(r.queryContent).config.length && b(r).then(function (e) {
                                            y(t, t.children("div").length + 1, e.data)
                                        })
                                    }
                                }).off("click.QH").on("click.QH", ".btn-save-condition", function () {
                                    var t = _(e, s[o]);
                                    0 !== str2obj(t.queryContent).config.length ? v(t).then(function (e) {
                                        y(n, n.children("div").length + 1, e.data)
                                    }) : toast(" 当前无需要保存的查询条件！").warn()
                                }), C(e)
                            }, T = function () {
                                i.on("x-resetHead", function () {
                                    i.find("li:eq(0)").click(), $(".history-condition,.saved-condition").hide(), f = $(c.join(",")), k(f, f.next(), f.next().next())
                                }), $(".body-agent").on("click", ".query-condition-selected .active-search-list em", function () {
                                    var e = $(this).closest("li"), t = e.attr("qh-id"),
                                        n = $(c.join(",")).find('.inline-select[qh-id="{0}"]'.format(t));
                                    e.hide(), e.find("span").html(""), n.xReset(), "不限" != n.find(".option>u.active").text() && n.find(".option>u:eq(0)").click()
                                }).on("click", ".history-condition .del-condition", function () {
                                    var e = $(this), t = e.closest(".history-condition");
                                    x(e.attr("delId")).then(function (n) {
                                        toast(" 删除成功！").ok(), e.closest("div").remove(), t.children("div").each(function (e, t) {
                                            $(t).find("em").text(e + 1)
                                        })
                                    })
                                }).on("click", ".saved-condition .del-condition", function () {
                                    var e = $(this), t = e.closest(".saved-condition");
                                    w(e.attr("delId")).then(function (n) {
                                        toast(" 删除成功！").ok(), e.closest("div").remove(),
                                            t.children("div").each(function (e, t) {
                                                $(t).find("em").text(e + 1)
                                            })
                                    })
                                }).on("click", ".saved-condition .search-condition,.history-condition .search-condition", function () {
                                    var e = $(this).data("queryCon");
                                    $(".query-widget-wrap").trigger("x-query", [e])
                                })
                            };
                            $(".body-agent").xReady(function () {
                                f = $(c.join(",")), k(f, f.next(), f.next().next()), T(), i.find("li:eq(0)").click($.dbs(function () {
                                    i.find("li:eq(0)").trigger("x-resetHead")
                                }, 1200, !0))
                            })
                        }
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/widgets/query-heading.js", "/widgets")
    }, {"1YiZ5S": 4, buffer: 1}],
    81: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            function c(e, t) {
                var n = $(this), i = {};
                (n.data("btns") || "").split(",").each(function (e) {
                    i[e + "Limit"] = !0
                }), t.title = t.title || "查询结果", t = $.extend(t, i)
            }

            function d(e) {
                var t = $(this);
                $.colorBox(e.share ? null : this), t.parent().fullPanel()
            }

            $widget("query-result", function () {
                return {
                    template: "_temp/query-result.htm", importing: "panelCtrls", boot: function (e, t) {
                        return c.apply(this, [e, t]), t.id = t.id || this.getAttribute("id"), t.cls = t.cls || this.className, $($compile(e, t))
                    }, init: function (e) {
                        var t = $(this);
                        d.call(t.children(".query-title")[0], e), e.tablehtml && t.find(".qr-tb").html("#" == e.tablehtml.slice(0, 1) ? $(e.tablehtml).html() : window.$cache(e.tablehtml)), t.on("up-count", function (e, n) {
                            t.children("div").find(".total-count").html(n)
                        }), t.on("x-check", function (e, n, i) {
                            [].concat(n).each(function (e) {
                                t.xCheckRow(e, i)
                            })
                        })
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/widgets/query-result.js", "/widgets")
    }, {"1YiZ5S": 4, buffer: 1}],
    82: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            function c(e, t) {
                var n = $(this), i = {};
                (n.data("btns") || "").split(",").each(function (e) {
                    i[e + "Limit"] = !0
                }), t.title = t.title || "查询结果", t = $.extend(t, i)
            }

            function d(e) {
                var t = $(this);
                $.colorBox(e.share ? null : this), t.parent().fullPanel()
            }

            $widget("query-title", function () {
                return {
                    template: "_temp/query-title.htm", importing: "panelCtrls", boot: function (e, t) {
                        return c.apply(this, [e, t]), $($compile(e, t))
                    }, init: function (e) {
                        d.call(this, e)
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/widgets/query-title.js", "/widgets")
    }, {"1YiZ5S": 4, buffer: 1}],
    83: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            $widget("textarea-hascount", function () {
                return {
                    template: "_temp/textarea-hascount.htm", init: function (e) {
                        var t = $(this);
                        t.children("textarea").on("input", function () {
                            var n = $(this), i = n.val().length;
                            if (e.maxlength && i > e.maxlength)return n.val(n.val().slice(0, e.maxlength)), void toast("输入字数超过{0}字".format(e.maxlength));
                            t.find(".length").html(i)
                        })
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/widgets/textarea-hascount.js", "/widgets")
    }, {"1YiZ5S": 4, buffer: 1}],
    84: [function (e, t, n) {
        (function (e, t, n, i, o, r, a, s, l) {
            $widget("x-select-wrap", function () {
                return {
                    template: '<p x-select-wrap x-bind="{xBind}">                       <select x-list="{xList}" data-keys="{keys}"> <option selected="[selected]" value="[val]">[txt]</option> </select>                  </p>',
                    boot: function (e, t) {
                        var n = $(this);
                        return t.xBind = n.attr("x-bind"), t.xList = n.attr("x-list"), $($compile(e, t).replace(/\[/g, "{").replace(/\]/g, "}"))
                    },
                    init: function (e) {
                    }
                }
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/widgets/x-select-wrap.js", "/widgets")
    }, {"1YiZ5S": 4, buffer: 1}]
}, {}, [31]);