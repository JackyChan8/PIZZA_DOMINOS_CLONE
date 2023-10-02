!function (r) {
    var e = {};

    function t(n) {
        if (e[n]) return e[n].exports;
        var u = e[n] = {i: n, l: !1, exports: {}};
        return r[n].call(u.exports, u, u.exports, t), u.l = !0, u.exports
    }

    t.m = r, t.c = e, t.d = function (r, e, n) {
        t.o(r, e) || Object.defineProperty(r, e, {configurable: !1, enumerable: !0, get: n})
    }, t.n = function (r) {
        var e = r && r.__esModule ? function () {
            return r.default
        } : function () {
            return r
        };
        return t.d(e, "a", e), e
    }, t.o = function (r, e) {
        return Object.prototype.hasOwnProperty.call(r, e)
    }, t.p = "/", t(t.s = 13)
}({
    13: function (r, e, t) {
        r.exports = t("jUCC")
    }, "4q2+": function (r, e, t) {
        "use strict";
        let n, u, a = () => {
            n.defaultStack.context = document.body, window.addEventListener("resize", () => {
                u && clearTimeout(u), u = setTimeout(() => {
                    n.positionAll()
                }, 10)
            })
        }, s = r => {
            r.overlay.parentNode && r.overlay.parentNode.removeChild(r.overlay)
        };
        const o = (r, e) => ("object" != typeof r && (r = {text: r}), e && (r.type = e), {
            target: document.body,
            data: r
        });
        var i = {
            runModules(r) {
                if ("init" === r) {
                    for (let r in n.modules) if (n.modules.hasOwnProperty(r) && "function" == typeof n.modules[r].init) {
                        const e = n.modules[r].init(this);
                        this.initModule(e)
                    }
                } else {
                    const {_modules: e} = this.get();
                    for (let t in e) {
                        if (!e.hasOwnProperty(t)) continue;
                        const n = Object.assign({_notice: this, _options: this.get()}, this.get().modules[t]);
                        e[t].set(n), "function" == typeof e[t][r] && e[t][r]()
                    }
                }
            }, initModule(r) {
                const {modules: e} = this.get();
                e.hasOwnProperty(r.constructor.key) || (e[r.constructor.key] = {});
                const t = Object.assign({_notice: this, _options: this.get()}, e[r.constructor.key]);
                r.initModule(t);
                const {_modules: n} = this.get();
                n[r.constructor.key] = r
            }, update(r) {
                const e = this.get().hide, t = this.get().icon;
                this.set(r), this.runModules("update"), this.get().hide ? e || this.queueClose() : this.cancelClose(), this.queuePosition();
                const {icon: n} = this.get();
                return n !== t && (!0 === n && "fontawesome5" === this.get().icons || "string" == typeof n && n.match(/(^| )fa[srlb]($| )/)) && (this.set({icon: !1}), this.set({icon: n})), this
            }, open() {
                const {_state: r, hide: e} = this.get();
                if ("opening" === r) return;
                if ("open" === r) return void (e && this.queueClose());
                this.set({
                    _state: "opening",
                    _animatingClass: "ui-pnotify-initial-hidden"
                }), this.runModules("beforeOpen");
                let {stack: t} = this.get();
                if (!this.refs.elem.parentNode || t && t.context && t.context !== this.refs.elem.parentNode) if (t && t.context) t.context.appendChild(this.refs.elem); else {
                    if (!document.body) throw new Error("No context to open this notice in.");
                    document.body.appendChild(this.refs.elem)
                }
                return setTimeout(() => {
                    t && (t.animation = !1, n.positionAll(), t.animation = !0), this.animateIn(() => {
                        this.get().hide && this.queueClose(), this.set({_state: "open"}), this.runModules("afterOpen")
                    })
                }, 0), this
            }, remove(r) {
                return this.close(r)
            }, close(r) {
                const {_state: e} = this.get();
                if ("closing" === e || "closed" === e) return;
                this.set({_state: "closing", _timerHide: !!r}), this.runModules("beforeClose");
                const {_timer: t} = this.get();
                return t && clearTimeout && (clearTimeout(t), this.set({_timer: null})), this.animateOut(() => {
                    if (this.set({_state: "closed"}), this.runModules("afterClose"), this.queuePosition(), this.get().remove && this.refs.elem.parentNode.removeChild(this.refs.elem), this.runModules("beforeDestroy"), this.get().destroy && null !== n.notices) {
                        const r = n.notices.indexOf(this);
                        -1 !== r && n.notices.splice(r, 1)
                    }
                    this.runModules("afterDestroy")
                }), this
            }, animateIn(r) {
                this.set({_animating: "in"});
                const e = () => {
                    this.refs.elem.removeEventListener("transitionend", e);
                    const {_animTimer: t, _animating: n, _moduleIsNoticeOpen: u} = this.get();
                    if (t && clearTimeout(t), "in" !== n) return;
                    let a = u;
                    if (!a) {
                        const r = this.refs.elem.getBoundingClientRect();
                        for (let e in r) if (r[e] > 0) {
                            a = !0;
                            break
                        }
                    }
                    a ? (r && r.call(), this.set({_animating: !1})) : this.set({_animTimer: setTimeout(e, 40)})
                };
                "fade" === this.get().animation ? (this.refs.elem.addEventListener("transitionend", e), this.set({_animatingClass: "ui-pnotify-in"}), this.refs.elem.style.opacity, this.set({_animatingClass: "ui-pnotify-in ui-pnotify-fade-in"}), this.set({_animTimer: setTimeout(e, 650)})) : (this.set({_animatingClass: "ui-pnotify-in"}), e())
            }, animateOut(r) {
                this.set({_animating: "out"});
                const e = () => {
                    this.refs.elem.removeEventListener("transitionend", e);
                    const {_animTimer: t, _animating: u, _moduleIsNoticeOpen: a} = this.get();
                    if (t && clearTimeout(t), "out" !== u) return;
                    let o = a;
                    if (!o) {
                        const r = this.refs.elem.getBoundingClientRect();
                        for (let e in r) if (r[e] > 0) {
                            o = !0;
                            break
                        }
                    }
                    if (this.refs.elem.style.opacity && "0" !== this.refs.elem.style.opacity && o) this.set({_animTimer: setTimeout(e, 40)}); else {
                        this.set({_animatingClass: ""});
                        const {stack: e} = this.get();
                        if (e && e.overlay) {
                            let r = !1;
                            for (let t = 0; t < n.notices.length; t++) {
                                const u = n.notices[t];
                                if (u !== this && u.get().stack === e && "closed" !== u.get()._state) {
                                    r = !0;
                                    break
                                }
                            }
                            r || s(e)
                        }
                        r && r.call(), this.set({_animating: !1})
                    }
                };
                "fade" === this.get().animation ? (this.refs.elem.addEventListener("transitionend", e), this.set({_animatingClass: "ui-pnotify-in"}), this.set({_animTimer: setTimeout(e, 650)})) : (this.set({_animatingClass: ""}), e())
            }, position() {
                let {stack: r} = this.get(), e = this.refs.elem;
                if (!r) return;
                if (r.context || (r.context = document.body), "number" != typeof r.nextpos1 && (r.nextpos1 = r.firstpos1), "number" != typeof r.nextpos2 && (r.nextpos2 = r.firstpos2), "number" != typeof r.addpos2 && (r.addpos2 = 0), !e.classList.contains("ui-pnotify-in") && !e.classList.contains("ui-pnotify-initial-hidden")) return this;
                r.modal && (r.overlay || (r => {
                    const e = document.createElement("div");
                    e.classList.add("ui-pnotify-modal-overlay"), r.context !== document.body && (e.style.height = r.context.scrollHeight + "px", e.style.width = r.context.scrollWidth + "px"), e.addEventListener("click", () => {
                        r.overlayClose && n.closeStack(r)
                    }), r.overlay = e
                })(r), (r => {
                    r.overlay.parentNode !== r.context && (r.overlay = r.context.insertBefore(r.overlay, r.context.firstChild))
                })(r)), e.getBoundingClientRect(), r.animation && this.set({_moveClass: "ui-pnotify-move"});
                let t, u = r.context === document.body ? window.innerHeight : r.context.scrollHeight,
                    a = r.context === document.body ? window.innerWidth : r.context.scrollWidth;
                if (r.dir1) {
                    let n;
                    switch (t = {down: "top", up: "bottom", left: "right", right: "left"}[r.dir1], r.dir1) {
                        case"down":
                            n = e.offsetTop;
                            break;
                        case"up":
                            n = u - e.scrollHeight - e.offsetTop;
                            break;
                        case"left":
                            n = a - e.scrollWidth - e.offsetLeft;
                            break;
                        case"right":
                            n = e.offsetLeft
                    }
                    void 0 === r.firstpos1 && (r.firstpos1 = n, r.nextpos1 = r.firstpos1)
                }
                if (r.dir1 && r.dir2) {
                    let t, n = {down: "top", up: "bottom", left: "right", right: "left"}[r.dir2];
                    switch (r.dir2) {
                        case"down":
                            t = e.offsetTop;
                            break;
                        case"up":
                            t = u - e.scrollHeight - e.offsetTop;
                            break;
                        case"left":
                            t = a - e.scrollWidth - e.offsetLeft;
                            break;
                        case"right":
                            t = e.offsetLeft
                    }
                    void 0 === r.firstpos2 && (r.firstpos2 = t, r.nextpos2 = r.firstpos2);
                    const s = r.nextpos1 + e.offsetHeight + (void 0 === r.spacing1 ? 25 : r.spacing1),
                        o = r.nextpos1 + e.offsetWidth + (void 0 === r.spacing1 ? 25 : r.spacing1);
                    switch ((("down" === r.dir1 || "up" === r.dir1) && s > u || ("left" === r.dir1 || "right" === r.dir1) && o > a) && (r.nextpos1 = r.firstpos1, r.nextpos2 += r.addpos2 + (void 0 === r.spacing2 ? 25 : r.spacing2), r.addpos2 = 0), "number" == typeof r.nextpos2 && (e.style[n] = r.nextpos2 + "px", r.animation || e.style[n]), r.dir2) {
                        case"down":
                        case"up":
                            e.offsetHeight + (parseFloat(e.style.marginTop, 10) || 0) + (parseFloat(e.style.marginBottom, 10) || 0) > r.addpos2 && (r.addpos2 = e.offsetHeight);
                            break;
                        case"left":
                        case"right":
                            e.offsetWidth + (parseFloat(e.style.marginLeft, 10) || 0) + (parseFloat(e.style.marginRight, 10) || 0) > r.addpos2 && (r.addpos2 = e.offsetWidth)
                    }
                } else if (r.dir1) {
                    let t, n;
                    switch (r.dir1) {
                        case"down":
                        case"up":
                            n = ["left", "right"], t = r.context.scrollWidth / 2 - e.offsetWidth / 2;
                            break;
                        case"left":
                        case"right":
                            n = ["top", "bottom"], t = u / 2 - e.offsetHeight / 2
                    }
                    e.style[n[0]] = t + "px", e.style[n[1]] = "auto", r.animation || e.style[n[0]]
                }
                if (r.dir1) switch ("number" == typeof r.nextpos1 && (e.style[t] = r.nextpos1 + "px", r.animation || e.style[t]), r.dir1) {
                    case"down":
                    case"up":
                        r.nextpos1 += e.offsetHeight + (void 0 === r.spacing1 ? 25 : r.spacing1);
                        break;
                    case"left":
                    case"right":
                        r.nextpos1 += e.offsetWidth + (void 0 === r.spacing1 ? 25 : r.spacing1)
                } else {
                    let t = a / 2 - e.offsetWidth / 2, n = u / 2 - e.offsetHeight / 2;
                    e.style.left = t + "px", e.style.top = n + "px", r.animation || e.style.left
                }
                return this
            }, queuePosition(r) {
                return u && clearTimeout(u), r || (r = 10), u = setTimeout(() => {
                    n.positionAll()
                }, r), this
            }, cancelRemove() {
                return this.cancelClose()
            }, cancelClose() {
                const {_timer: r, _animTimer: e, _state: t, animation: n} = this.get();
                return r && clearTimeout(r), e && clearTimeout(e), "closing" === t && this.set({
                    _state: "open",
                    _animating: !1,
                    _animatingClass: "fade" === n ? "ui-pnotify-in ui-pnotify-fade-in" : "ui-pnotify-in"
                }), this
            }, queueRemove() {
                return this.queueClose()
            }, queueClose() {
                return this.cancelClose(), this.set({_timer: setTimeout(() => this.close(!0), isNaN(this.get().delay) ? 0 : this.get().delay)}), this
            }, addModuleClass(...r) {
                const {_moduleClasses: e} = this.get();
                for (let t = 0; t < r.length; t++) {
                    let n = r[t];
                    -1 === e.indexOf(n) && e.push(n)
                }
                this.set({_moduleClasses: e})
            }, removeModuleClass(...r) {
                const {_moduleClasses: e} = this.get();
                for (let t = 0; t < r.length; t++) {
                    let n = r[t];
                    const u = e.indexOf(n);
                    -1 !== u && e.splice(u, 1)
                }
                this.set({_moduleClasses: e})
            }, hasModuleClass(...r) {
                const {_moduleClasses: e} = this.get();
                for (let t = 0; t < r.length; t++) {
                    let n = r[t];
                    if (-1 === e.indexOf(n)) return !1
                }
                return !0
            }
        };

        function l(r, e, t) {
            var n, u, a = t.module;
            if (a) var s = new a({root: r.root});
            return s && s.on("init", function (e) {
                r.initModule(e.module)
            }), {
                key: e, first: null, c() {
                    n = P(), u = P(), s && s._fragment.c(), this.first = n
                }, m(r, e) {
                    E(n, r, e), E(u, r, e), s && s._mount(r, e)
                }, d(r) {
                    r && (j(n), j(u)), s && s.destroy(r)
                }
            }
        }

        function c(r, e) {
            var t, n, u, a;
            return {
                c() {
                    t = x("div"), (n = x("span")).className = u = !0 === e.icon ? e._icons[e.type] ? e._icons[e.type] : "" : e.icon, t.className = a = "ui-pnotify-icon " + (e._styles.icon ? e._styles.icon : "")
                }, m(e, u) {
                    E(t, e, u), w(n, t), r.refs.iconContainer = t
                }, p(r, e) {
                    (r.icon || r._icons || r.type) && u !== (u = !0 === e.icon ? e._icons[e.type] ? e._icons[e.type] : "" : e.icon) && (n.className = u), r._styles && a !== (a = "ui-pnotify-icon " + (e._styles.icon ? e._styles.icon : "")) && (t.className = a)
                }, d(e) {
                    e && j(t), r.refs.iconContainer === t && (r.refs.iconContainer = null)
                }
            }
        }

        function b(r, e) {
            var t, n;
            return {
                c() {
                    t = x("noscript"), n = x("noscript")
                }, m(r, u) {
                    E(t, r, u), t.insertAdjacentHTML("afterend", e.title), E(n, r, u)
                }, p(r, e) {
                    r.title && (A(t, n), t.insertAdjacentHTML("afterend", e.title))
                }, d(r) {
                    r && (A(t, n), j(t), j(n))
                }
            }
        }

        function f(r, e) {
            var t;
            return {
                c() {
                    t = _(e.title)
                }, m(r, e) {
                    E(t, r, e)
                }, p(r, e) {
                    r.title && (t.data = e.title)
                }, d(r) {
                    r && j(t)
                }
            }
        }

        function p(r, e) {
            var t, n;

            function u(r) {
                return r.titleTrusted ? b : f
            }

            var a = u(e), s = a(r, e);
            return {
                c() {
                    t = x("h4"), s.c(), t.className = n = "ui-pnotify-title " + (e._styles.title ? e._styles.title : "")
                }, m(e, n) {
                    E(t, e, n), s.m(t, null), r.refs.titleContainer = t
                }, p(e, o) {
                    a === (a = u(o)) && s ? s.p(e, o) : (s.d(1), (s = a(r, o)).c(), s.m(t, null)), e._styles && n !== (n = "ui-pnotify-title " + (o._styles.title ? o._styles.title : "")) && (t.className = n)
                }, d(e) {
                    e && j(t), s.d(), r.refs.titleContainer === t && (r.refs.titleContainer = null)
                }
            }
        }

        function d(r, e) {
            var t, n;
            return {
                c() {
                    t = x("noscript"), n = x("noscript")
                }, m(r, u) {
                    E(t, r, u), t.insertAdjacentHTML("afterend", e.text), E(n, r, u)
                }, p(r, e) {
                    r.text && (A(t, n), t.insertAdjacentHTML("afterend", e.text))
                }, d(r) {
                    r && (A(t, n), j(t), j(n))
                }
            }
        }

        function h(r, e) {
            var t;
            return {
                c() {
                    t = _(e.text)
                }, m(r, e) {
                    E(t, r, e)
                }, p(r, e) {
                    r.text && (t.data = e.text)
                }, d(r) {
                    r && j(t)
                }
            }
        }

        function g(r, e) {
            var t, n;

            function u(r) {
                return r.textTrusted ? d : h
            }

            var a = u(e), s = a(r, e);
            return {
                c() {
                    t = x("div"), s.c(), t.className = n = "ui-pnotify-text " + (e._styles.text ? e._styles.text : ""), S(t, "role", "alert")
                }, m(e, n) {
                    E(t, e, n), s.m(t, null), r.refs.textContainer = t
                }, p(e, o) {
                    a === (a = u(o)) && s ? s.p(e, o) : (s.d(1), (s = a(r, o)).c(), s.m(t, null)), e._styles && n !== (n = "ui-pnotify-text " + (o._styles.text ? o._styles.text : "")) && (t.className = n)
                }, d(e) {
                    e && j(t), s.d(), r.refs.textContainer === t && (r.refs.textContainer = null)
                }
            }
        }

        function k(r, e, t) {
            var n, u, a = t.module;
            if (a) var s = new a({root: r.root});
            return s && s.on("init", function (e) {
                r.initModule(e.module)
            }), {
                key: e, first: null, c() {
                    n = P(), u = P(), s && s._fragment.c(), this.first = n
                }, m(r, e) {
                    E(n, r, e), E(u, r, e), s && s._mount(r, e)
                }, d(r) {
                    r && (j(n), j(u)), s && s.destroy(r)
                }
            }
        }

        function m(r, e, t) {
            const n = Object.create(r);
            return n.module = e[t], n.each_value = e, n.module_index = t, n
        }

        function v(r, e, t) {
            const n = Object.create(r);
            return n.module = e[t], n.each_value_1 = e, n.module_index_1 = t, n
        }

        function y(r) {
            (function (r, e) {
                r._handlers = C(), r._bind = e._bind, r.options = e, r.root = e.root || r, r.store = r.root.store || e.store
            })(this, r), this.refs = {}, this._state = D(function () {
                const r = Object.assign({
                    _state: "initializing",
                    _timer: null,
                    _animTimer: null,
                    _animating: !1,
                    _animatingClass: "",
                    _moveClass: "",
                    _timerHide: !1,
                    _moduleClasses: [],
                    _moduleIsNoticeOpen: !1,
                    _modules: {},
                    _modulesPrependContainer: n.modulesPrependContainer,
                    _modulesAppendContainer: n.modulesAppendContainer
                }, n.defaults);
                return r.modules = Object.assign({}, n.defaults.modules), r
            }(), r.data), this._recompute({
                styling: 1,
                icons: 1,
                width: 1,
                minHeight: 1
            }, this._state), this._intro = !0, document.getElementById("svelte-1eldsjg-style") || function () {
                var r = x("style");
                r.id = "svelte-1eldsjg-style", r.textContent = 'body > .ui-pnotify{position:fixed;z-index:100040}body > .ui-pnotify.ui-pnotify-modal{z-index:100042}.ui-pnotify{position:absolute;height:auto;z-index:1;display:none}.ui-pnotify.ui-pnotify-modal{z-index:3}.ui-pnotify.ui-pnotify-in{display:block}.ui-pnotify.ui-pnotify-initial-hidden{display:block;visibility:hidden}.ui-pnotify.ui-pnotify-move{transition:left .5s ease, top .5s ease, right .5s ease, bottom .5s ease}.ui-pnotify.ui-pnotify-fade-slow{transition:opacity .4s linear;opacity:0}.ui-pnotify.ui-pnotify-fade-slow.ui-pnotify.ui-pnotify-move{transition:opacity .4s linear, left .5s ease, top .5s ease, right .5s ease, bottom .5s ease}.ui-pnotify.ui-pnotify-fade-normal{transition:opacity .25s linear;opacity:0}.ui-pnotify.ui-pnotify-fade-normal.ui-pnotify.ui-pnotify-move{transition:opacity .25s linear, left .5s ease, top .5s ease, right .5s ease, bottom .5s ease}.ui-pnotify.ui-pnotify-fade-fast{transition:opacity .1s linear;opacity:0}.ui-pnotify.ui-pnotify-fade-fast.ui-pnotify.ui-pnotify-move{transition:opacity .1s linear, left .5s ease, top .5s ease, right .5s ease, bottom .5s ease}.ui-pnotify.ui-pnotify-fade-in{opacity:1}.ui-pnotify .ui-pnotify-shadow{-webkit-box-shadow:0px 6px 28px 0px rgba(0,0,0,0.1);-moz-box-shadow:0px 6px 28px 0px rgba(0,0,0,0.1);box-shadow:0px 6px 28px 0px rgba(0,0,0,0.1)}.ui-pnotify-container{background-position:0 0;padding:.8em;height:100%;margin:0}.ui-pnotify-container:after{content:" ";visibility:hidden;display:block;height:0;clear:both}.ui-pnotify-container.ui-pnotify-sharp{-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.ui-pnotify-title{display:block;white-space:pre-line;margin-bottom:.4em;margin-top:0}.ui-pnotify.ui-pnotify-with-icon .ui-pnotify-title,.ui-pnotify.ui-pnotify-with-icon .ui-pnotify-text{margin-left:24px}[dir=rtl] .ui-pnotify.ui-pnotify-with-icon .ui-pnotify-title,[dir=rtl] .ui-pnotify.ui-pnotify-with-icon .ui-pnotify-text{margin-right:24px;margin-left:0}.ui-pnotify-title-bs4{font-size:1.2rem}.ui-pnotify-text{display:block;white-space:pre-line}.ui-pnotify-icon,.ui-pnotify-icon span{display:block;float:left}[dir=rtl] .ui-pnotify-icon,[dir=rtl] .ui-pnotify-icon span{float:right}.ui-pnotify-icon-bs3 > span{position:relative;top:2px}.ui-pnotify-icon-bs4 > span{position:relative;top:4px}.ui-pnotify-modal-overlay{background-color:rgba(0, 0, 0, .4);top:0;left:0;position:absolute;height:100%;width:100%;z-index:2}body > .ui-pnotify-modal-overlay{position:fixed;z-index:100041}', w(r, document.head)
            }(), r.root || (this._oncreate = [], this._beforecreate = [], this._aftercreate = []), this._fragment = function (r, e) {
                var t, n, u, a, s, o, i, b, f, d = [], h = C(), y = [], P = C(), A = e._modulesPrependContainer;
                const D = r => r.module.key;
                for (var M = 0; M < A.length; M += 1) {
                    let t = m(e, A, M), n = D(t);
                    d[M] = h[n] = l(r, n, t)
                }
                var O = !1 !== e.icon && c(r, e), q = !1 !== e.title && p(r, e), H = !1 !== e.text && g(r, e),
                    B = e._modulesAppendContainer;
                const R = r => r.module.key;
                for (M = 0; M < B.length; M += 1) {
                    let t = v(e, B, M), n = R(t);
                    y[M] = P[n] = k(r, n, t)
                }

                function I(e) {
                    r.fire("mouseover", e)
                }

                function F(e) {
                    r.fire("mouseout", e)
                }

                function W(e) {
                    r.fire("mouseenter", e)
                }

                function $(e) {
                    r.fire("mouseleave", e)
                }

                function V(e) {
                    r.fire("mousemove", e)
                }

                function G(e) {
                    r.fire("mousedown", e)
                }

                function U(e) {
                    r.fire("mouseup", e)
                }

                function X(e) {
                    r.fire("click", e)
                }

                function K(e) {
                    r.fire("dblclick", e)
                }

                function Y(e) {
                    r.fire("focus", e)
                }

                function J(e) {
                    r.fire("blur", e)
                }

                function Q(e) {
                    r.fire("touchstart", e)
                }

                function Z(e) {
                    r.fire("touchmove", e)
                }

                function rr(e) {
                    r.fire("touchend", e)
                }

                function er(e) {
                    r.fire("touchcancel", e)
                }

                return {
                    c() {
                        for (t = x("div"), n = x("div"), M = 0; M < d.length; M += 1) d[M].c();
                        for (u = _("\n    "), O && O.c(), a = _("\n    "), q && q.c(), s = _("\n    "), H && H.c(), o = _("\n    "), M = 0; M < y.length; M += 1) y[M].c();
                        n.className = i = "\n        ui-pnotify-container\n        " + (e._styles.container ? e._styles.container : "") + "\n        " + (e._styles[e.type] ? e._styles[e.type] : "") + "\n        " + e.cornerClass + "\n        " + (e.shadow ? "ui-pnotify-shadow" : "") + "\n      ", n.style.cssText = b = e._widthStyle + " " + e._minHeightStyle, S(n, "role", "alert"), T(t, "mouseover", I), T(t, "mouseout", F), T(t, "mouseenter", W), T(t, "mouseleave", $), T(t, "mousemove", V), T(t, "mousedown", G), T(t, "mouseup", U), T(t, "click", X), T(t, "dblclick", K), T(t, "focus", Y), T(t, "blur", J), T(t, "touchstart", Q), T(t, "touchmove", Z), T(t, "touchend", rr), T(t, "touchcancel", er), t.className = f = "\n      ui-pnotify\n      " + (!1 !== e.icon ? "ui-pnotify-with-icon" : "") + "\n      " + (e._styles.element ? e._styles.element : "") + "\n      " + e.addClass + "\n      " + e._animatingClass + "\n      " + e._moveClass + "\n      " + ("fade" === e.animation ? "ui-pnotify-fade-" + e.animateSpeed : "") + "\n      " + (e.stack && e.stack.modal ? "ui-pnotify-modal" : "") + "\n      " + e._moduleClasses.join(" ") + "\n    ", S(t, "aria-live", "assertive"), S(t, "role", "alertdialog"), S(t, "ui-pnotify", !0)
                    }, m(e, i) {
                        for (E(t, e, i), w(n, t), M = 0; M < d.length; M += 1) d[M].m(n, null);
                        for (w(u, n), O && O.m(n, null), w(a, n), q && q.m(n, null), w(s, n), H && H.m(n, null), w(o, n), M = 0; M < y.length; M += 1) y[M].m(n, null);
                        r.refs.container = n, r.refs.elem = t
                    }, p(e, x) {
                        const w = x._modulesPrependContainer;
                        d = L(d, r, e, D, 0, x, w, h, n, N, l, "m", u, m), !1 !== x.icon ? O ? O.p(e, x) : ((O = c(r, x)).c(), O.m(n, a)) : O && (O.d(1), O = null), !1 !== x.title ? q ? q.p(e, x) : ((q = p(r, x)).c(), q.m(n, s)) : q && (q.d(1), q = null), !1 !== x.text ? H ? H.p(e, x) : ((H = g(r, x)).c(), H.m(n, o)) : H && (H.d(1), H = null);
                        const C = x._modulesAppendContainer;
                        y = L(y, r, e, R, 0, x, C, P, n, N, k, "m", null, v), (e._styles || e.type || e.cornerClass || e.shadow) && i !== (i = "\n        ui-pnotify-container\n        " + (x._styles.container ? x._styles.container : "") + "\n        " + (x._styles[x.type] ? x._styles[x.type] : "") + "\n        " + x.cornerClass + "\n        " + (x.shadow ? "ui-pnotify-shadow" : "") + "\n      ") && (n.className = i), (e._widthStyle || e._minHeightStyle) && b !== (b = x._widthStyle + " " + x._minHeightStyle) && (n.style.cssText = b), (e.icon || e._styles || e.addClass || e._animatingClass || e._moveClass || e.animation || e.animateSpeed || e.stack || e._moduleClasses) && f !== (f = "\n      ui-pnotify\n      " + (!1 !== x.icon ? "ui-pnotify-with-icon" : "") + "\n      " + (x._styles.element ? x._styles.element : "") + "\n      " + x.addClass + "\n      " + x._animatingClass + "\n      " + x._moveClass + "\n      " + ("fade" === x.animation ? "ui-pnotify-fade-" + x.animateSpeed : "") + "\n      " + (x.stack && x.stack.modal ? "ui-pnotify-modal" : "") + "\n      " + x._moduleClasses.join(" ") + "\n    ") && (t.className = f)
                    }, d(e) {
                        for (e && j(t), M = 0; M < d.length; M += 1) d[M].d();
                        for (O && O.d(), q && q.d(), H && H.d(), M = 0; M < y.length; M += 1) y[M].d();
                        r.refs.container === n && (r.refs.container = null), z(t, "mouseover", I), z(t, "mouseout", F), z(t, "mouseenter", W), z(t, "mouseleave", $), z(t, "mousemove", V), z(t, "mousedown", G), z(t, "mouseup", U), z(t, "click", X), z(t, "dblclick", K), z(t, "focus", Y), z(t, "blur", J), z(t, "touchstart", Q), z(t, "touchmove", Z), z(t, "touchend", rr), z(t, "touchcancel", er), r.refs.elem === t && (r.refs.elem = null)
                    }
                }
            }(this, this._state), this.root._oncreate.push(() => {
                (function () {
                    this.on("mouseenter", r => {
                        if (this.get().mouseReset && "out" === this.get()._animating) {
                            if (!this.get()._timerHide) return;
                            this.cancelClose()
                        }
                        this.get().hide && this.get().mouseReset && this.cancelClose()
                    }), this.on("mouseleave", r => {
                        this.get().hide && this.get().mouseReset && "out" !== this.get()._animating && this.queueClose(), n.positionAll()
                    });
                    let {stack: r} = this.get();
                    r && "top" === r.push ? n.notices.splice(0, 0, this) : n.notices.push(this), this.runModules("init"), this.set({_state: "closed"}), this.get().autoDisplay && this.open()
                }).call(this), this.fire("update", {
                    changed: function (r, e) {
                        for (var t in e) r[t] = 1;
                        return r
                    }({}, this._state), current: this._state
                })
            }), r.target && (this._fragment.c(), this._mount(r.target, r.anchor), this._lock = !0, M(this._beforecreate), M(this._oncreate), M(this._aftercreate), this._lock = !1)
        }

        function x(r) {
            return document.createElement(r)
        }

        function w(r, e) {
            e.appendChild(r)
        }

        function C() {
            return Object.create(null)
        }

        function _(r) {
            return document.createTextNode(r)
        }

        function S(r, e, t) {
            r.setAttribute(e, t)
        }

        function T(r, e, t) {
            r.addEventListener(e, t, !1)
        }

        function E(r, e, t) {
            e.insertBefore(r, t)
        }

        function L(r, e, t, n, u, a, s, o, i, l, c, b, f, p) {
            for (var d = r.length, h = s.length, g = d, k = {}; g--;) k[r[g].key] = g;
            var m = [], v = {}, y = {};
            for (g = h; g--;) {
                var x = p(a, s, g), w = n(x), C = o[w];
                C ? u && C.p(t, x) : (C = c(e, w, x)).c(), m[g] = v[w] = C, w in k && (y[w] = Math.abs(g - k[w]))
            }
            var _ = {}, S = {};

            function T(r) {
                r[b](i, f), o[r.key] = r, f = r.first, h--
            }

            for (; d && h;) {
                var E = m[h - 1], L = r[d - 1], N = E.key, j = L.key;
                E === L ? (f = E.first, d--, h--) : v[j] ? !o[N] || _[N] ? T(E) : S[j] ? d-- : y[N] > y[j] ? (S[N] = !0, T(E)) : (_[j] = !0, d--) : (l(L, o), d--)
            }
            for (; d--;) v[(L = r[d]).key] || l(L, o);
            for (; h;) T(m[h - 1]);
            return m
        }

        function N(r, e) {
            r.d(1), e[r.key] = null
        }

        function j(r) {
            r.parentNode.removeChild(r)
        }

        function z(r, e, t) {
            r.removeEventListener(e, t, !1)
        }

        function P() {
            return document.createComment("")
        }

        function A(r, e) {
            for (; r.nextSibling && r.nextSibling !== e;) r.parentNode.removeChild(r.nextSibling)
        }

        function D(r, e) {
            for (var t in e) r[t] = e[t];
            return r
        }

        function M(r) {
            for (; r && r.length;) r.shift()()
        }

        function O() {
        }

        D(y.prototype, {
            destroy: function (r) {
                this.destroy = O, this.fire("destroy"), this.set = O, this._fragment.d(!1 !== r), this._fragment = null, this._state = {}
            }, get: function () {
                return this._state
            }, fire: function (r, e) {
                var t = r in this._handlers && this._handlers[r].slice();
                if (t) for (var n = 0; n < t.length; n += 1) {
                    var u = t[n];
                    u.__calling || (u.__calling = !0, u.call(this, e), u.__calling = !1)
                }
            }, on: function (r, e) {
                var t = this._handlers[r] || (this._handlers[r] = []);
                return t.push(e), {
                    cancel: function () {
                        var r = t.indexOf(e);
                        ~r && t.splice(r, 1)
                    }
                }
            }, set: function (r) {
                this._set(D({}, r)), this.root._lock || (this.root._lock = !0, M(this.root._beforecreate), M(this.root._oncreate), M(this.root._aftercreate), this.root._lock = !1)
            }, _set: function (r) {
                var e = this._state, t = {}, n = !1;
                for (var u in r) this._differs(r[u], e[u]) && (t[u] = n = !0);
                n && (this._state = D(D({}, e), r), this._recompute(t, this._state), this._bind && this._bind(t, this._state), this._fragment && (this.fire("state", {
                    changed: t,
                    current: this._state,
                    previous: e
                }), this._fragment.p(t, this._state), this.fire("update", {
                    changed: t,
                    current: this._state,
                    previous: e
                })))
            }, _mount: function (r, e) {
                this._fragment[this._fragment.i ? "i" : "m"](r, e || null)
            }, _differs: function (r, e) {
                return r != r ? e == e : r !== e || r && "object" == typeof r || "function" == typeof r
            }
        }), D(y.prototype, i), y.prototype._recompute = function (r, e) {
            r.styling && this._differs(e._styles, e._styles = function ({styling: r}) {
                return "object" == typeof r ? r : n.styling[r]
            }(e)) && (r._styles = !0), r.icons && this._differs(e._icons, e._icons = function ({icons: r}) {
                return "object" == typeof r ? r : n.icons[r]
            }(e)) && (r._icons = !0), r.width && this._differs(e._widthStyle, e._widthStyle = function ({width: r}) {
                return "string" == typeof r ? "width: " + r + ";" : ""
            }(e)) && (r._widthStyle = !0), r.minHeight && this._differs(e._minHeightStyle, e._minHeightStyle = function ({minHeight: r}) {
                return "string" == typeof r ? "min-height: " + r + ";" : ""
            }(e)) && (r._minHeightStyle = !0)
        }, (n = y).VERSION = "4.0.0-alpha.3", n.defaultStack = {
            dir1: "down",
            dir2: "left",
            firstpos1: 25,
            firstpos2: 25,
            spacing1: 36,
            spacing2: 36,
            push: "bottom",
            context: window && document.body
        }, n.defaults = {
            title: !1,
            titleTrusted: !1,
            text: !1,
            textTrusted: !1,
            styling: "brighttheme",
            icons: "brighttheme",
            addClass: "",
            cornerClass: "",
            autoDisplay: !0,
            width: "360px",
            minHeight: "16px",
            type: "notice",
            icon: !0,
            animation: "fade",
            animateSpeed: "normal",
            shadow: !0,
            hide: !0,
            delay: 8e3,
            mouseReset: !0,
            remove: !0,
            destroy: !0,
            stack: n.defaultStack,
            modules: {}
        }, n.notices = [], n.modules = {}, n.modulesPrependContainer = [], n.modulesAppendContainer = [], n.alert = (r => new n(o(r))), n.notice = (r => new n(o(r, "notice"))), n.info = (r => new n(o(r, "info"))), n.success = (r => new n(o(r, "success"))), n.error = (r => new n(o(r, "error"))), n.removeAll = (() => {
            n.closeAll()
        }), n.closeAll = (() => {
            for (let r = 0; r < n.notices.length; r++) n.notices[r].close && n.notices[r].close(!1)
        }), n.removeStack = (r => {
            n.closeStack(r)
        }), n.closeStack = (r => {
            if (!1 !== r) for (let e = 0; e < n.notices.length; e++) n.notices[e].close && n.notices[e].get().stack === r && n.notices[e].close(!1)
        }), n.positionAll = (() => {
            if (u && clearTimeout(u), u = null, n.notices.length > 0) {
                for (let r = 0; r < n.notices.length; r++) {
                    let e = n.notices[r], {stack: t} = e.get();
                    t && (t.overlay && s(t), t.nextpos1 = t.firstpos1, t.nextpos2 = t.firstpos2, t.addpos2 = 0)
                }
                for (let r = 0; r < n.notices.length; r++) n.notices[r].position()
            } else delete n.defaultStack.nextpos1, delete n.defaultStack.nextpos2
        }), n.styling = {
            brighttheme: {
                container: "brighttheme",
                notice: "brighttheme-notice",
                info: "brighttheme-info",
                success: "brighttheme-success",
                error: "brighttheme-error"
            },
            bootstrap3: {
                container: "alert",
                notice: "alert-warning",
                info: "alert-info",
                success: "alert-success",
                error: "alert-danger",
                icon: "ui-pnotify-icon-bs3"
            },
            bootstrap4: {
                container: "alert",
                notice: "alert-warning",
                info: "alert-info",
                success: "alert-success",
                error: "alert-danger",
                icon: "ui-pnotify-icon-bs4",
                title: "ui-pnotify-title-bs4"
            }
        }, n.icons = {
            brighttheme: {
                notice: "brighttheme-icon-notice",
                info: "brighttheme-icon-info",
                success: "brighttheme-icon-success",
                error: "brighttheme-icon-error"
            },
            bootstrap3: {
                notice: "glyphicon glyphicon-exclamation-sign",
                info: "glyphicon glyphicon-info-sign",
                success: "glyphicon glyphicon-ok-sign",
                error: "glyphicon glyphicon-warning-sign"
            },
            fontawesome4: {
                notice: "fa fa-exclamation-circle",
                info: "fa fa-info-circle",
                success: "fa fa-check-circle",
                error: "fa fa-exclamation-triangle"
            },
            fontawesome5: {
                notice: "fas fa-exclamation-circle",
                info: "fas fa-info-circle",
                success: "fas fa-check-circle",
                error: "fas fa-exclamation-triangle"
            }
        }, window && document.body ? a() : document.addEventListener("DOMContentLoaded", a);
        var q = y, H = t("7t+N"), B = t.n(H), R = function () {
            function r(r, e) {
                for (var t = 0; t < e.length; t++) {
                    var n = e[t];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(r, n.key, n)
                }
            }

            return function (e, t, n) {
                return t && r(e.prototype, t), n && r(e, n), e
            }
        }();
        var I = function () {
            function r() {
                !function (r, e) {
                    if (!(r instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, r)
            }

            return R(r, null, [{
                key: "sendNotify", value: function (r, e) {
                    q[r]({text: e, width: "375px", buttons: {closer: !0, sticker: !1}, delay: 3400})
                }
            }, {
                key: "addFontLink", value: function () {
                    var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                    if ("" !== r && 0 !== B()('link[data-fontname="{$fontName}"]').length) {
                        var e = "https://donatepay.ru/assets/fonts/" + (r = encodeURI(r)) + "/style.css",
                            t = new XMLHttpRequest;
                        t.open("HEAD", e, !1), t.send(), 404 === t.status && (e = "https://fonts.googleapis.com/css?family=" + r + "&subset=latin,cyrillic"), B()("head").append(B()('<link data-fontname="' + r + '" href="' + e + '" rel="stylesheet" type="text/css">'))
                    }
                }
            }]), r
        }();
        e.a = I
    }, "7t+N": function (r, e, t) {
        var n;
        !function (e, t) {
            "use strict";
            "object" == typeof r && "object" == typeof r.exports ? r.exports = e.document ? t(e, !0) : function (r) {
                if (!r.document) throw new Error("jQuery requires a window with a document");
                return t(r)
            } : t(e)
        }("undefined" != typeof window ? window : this, function (t, u) {
            "use strict";
            var a = [], s = t.document, o = Object.getPrototypeOf, i = a.slice, l = a.concat, c = a.push, b = a.indexOf,
                f = {}, p = f.toString, d = f.hasOwnProperty, h = d.toString, g = h.call(Object), k = {};

            function m(r, e) {
                var t = (e = e || s).createElement("script");
                t.text = r, e.head.appendChild(t).parentNode.removeChild(t)
            }

            var v = function (r, e) {
                return new v.fn.init(r, e)
            }, y = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, x = /^-ms-/, w = /-([a-z])/g, C = function (r, e) {
                return e.toUpperCase()
            };

            function _(r) {
                var e = !!r && "length" in r && r.length, t = v.type(r);
                return "function" !== t && !v.isWindow(r) && ("array" === t || 0 === e || "number" == typeof e && e > 0 && e - 1 in r)
            }

            v.fn = v.prototype = {
                jquery: "3.2.1", constructor: v, length: 0, toArray: function () {
                    return i.call(this)
                }, get: function (r) {
                    return null == r ? i.call(this) : r < 0 ? this[r + this.length] : this[r]
                }, pushStack: function (r) {
                    var e = v.merge(this.constructor(), r);
                    return e.prevObject = this, e
                }, each: function (r) {
                    return v.each(this, r)
                }, map: function (r) {
                    return this.pushStack(v.map(this, function (e, t) {
                        return r.call(e, t, e)
                    }))
                }, slice: function () {
                    return this.pushStack(i.apply(this, arguments))
                }, first: function () {
                    return this.eq(0)
                }, last: function () {
                    return this.eq(-1)
                }, eq: function (r) {
                    var e = this.length, t = +r + (r < 0 ? e : 0);
                    return this.pushStack(t >= 0 && t < e ? [this[t]] : [])
                }, end: function () {
                    return this.prevObject || this.constructor()
                }, push: c, sort: a.sort, splice: a.splice
            }, v.extend = v.fn.extend = function () {
                var r, e, t, n, u, a, s = arguments[0] || {}, o = 1, i = arguments.length, l = !1;
                for ("boolean" == typeof s && (l = s, s = arguments[o] || {}, o++), "object" == typeof s || v.isFunction(s) || (s = {}), o === i && (s = this, o--); o < i; o++) if (null != (r = arguments[o])) for (e in r) t = s[e], s !== (n = r[e]) && (l && n && (v.isPlainObject(n) || (u = Array.isArray(n))) ? (u ? (u = !1, a = t && Array.isArray(t) ? t : []) : a = t && v.isPlainObject(t) ? t : {}, s[e] = v.extend(l, a, n)) : void 0 !== n && (s[e] = n));
                return s
            }, v.extend({
                expando: "jQuery" + ("3.2.1" + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (r) {
                    throw new Error(r)
                }, noop: function () {
                }, isFunction: function (r) {
                    return "function" === v.type(r)
                }, isWindow: function (r) {
                    return null != r && r === r.window
                }, isNumeric: function (r) {
                    var e = v.type(r);
                    return ("number" === e || "string" === e) && !isNaN(r - parseFloat(r))
                }, isPlainObject: function (r) {
                    var e, t;
                    return !(!r || "[object Object]" !== p.call(r)) && (!(e = o(r)) || "function" == typeof (t = d.call(e, "constructor") && e.constructor) && h.call(t) === g)
                }, isEmptyObject: function (r) {
                    var e;
                    for (e in r) return !1;
                    return !0
                }, type: function (r) {
                    return null == r ? r + "" : "object" == typeof r || "function" == typeof r ? f[p.call(r)] || "object" : typeof r
                }, globalEval: function (r) {
                    m(r)
                }, camelCase: function (r) {
                    return r.replace(x, "ms-").replace(w, C)
                }, each: function (r, e) {
                    var t, n = 0;
                    if (_(r)) for (t = r.length; n < t && !1 !== e.call(r[n], n, r[n]); n++) ; else for (n in r) if (!1 === e.call(r[n], n, r[n])) break;
                    return r
                }, trim: function (r) {
                    return null == r ? "" : (r + "").replace(y, "")
                }, makeArray: function (r, e) {
                    var t = e || [];
                    return null != r && (_(Object(r)) ? v.merge(t, "string" == typeof r ? [r] : r) : c.call(t, r)), t
                }, inArray: function (r, e, t) {
                    return null == e ? -1 : b.call(e, r, t)
                }, merge: function (r, e) {
                    for (var t = +e.length, n = 0, u = r.length; n < t; n++) r[u++] = e[n];
                    return r.length = u, r
                }, grep: function (r, e, t) {
                    for (var n = [], u = 0, a = r.length, s = !t; u < a; u++) !e(r[u], u) !== s && n.push(r[u]);
                    return n
                }, map: function (r, e, t) {
                    var n, u, a = 0, s = [];
                    if (_(r)) for (n = r.length; a < n; a++) null != (u = e(r[a], a, t)) && s.push(u); else for (a in r) null != (u = e(r[a], a, t)) && s.push(u);
                    return l.apply([], s)
                }, guid: 1, proxy: function (r, e) {
                    var t, n, u;
                    if ("string" == typeof e && (t = r[e], e = r, r = t), v.isFunction(r)) return n = i.call(arguments, 2), (u = function () {
                        return r.apply(e || this, n.concat(i.call(arguments)))
                    }).guid = r.guid = r.guid || v.guid++, u
                }, now: Date.now, support: k
            }), "function" == typeof Symbol && (v.fn[Symbol.iterator] = a[Symbol.iterator]), v.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (r, e) {
                f["[object " + e + "]"] = e.toLowerCase()
            });
            var S = function (r) {
                var e, t, n, u, a, s, o, i, l, c, b, f, p, d, h, g, k, m, v, y = "sizzle" + 1 * new Date,
                    x = r.document, w = 0, C = 0, _ = sr(), S = sr(), T = sr(), E = function (r, e) {
                        return r === e && (b = !0), 0
                    }, L = {}.hasOwnProperty, N = [], j = N.pop, z = N.push, P = N.push, A = N.slice, D = function (r, e) {
                        for (var t = 0, n = r.length; t < n; t++) if (r[t] === e) return t;
                        return -1
                    },
                    M = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    O = "[\\x20\\t\\r\\n\\f]", q = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
                    H = "\\[" + O + "*(" + q + ")(?:" + O + "*([*^$|!~]?=)" + O + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + q + "))|)" + O + "*\\]",
                    B = ":(" + q + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + H + ")*)|.*)\\)|)",
                    R = new RegExp(O + "+", "g"),
                    I = new RegExp("^" + O + "+|((?:^|[^\\\\])(?:\\\\.)*)" + O + "+$", "g"),
                    F = new RegExp("^" + O + "*," + O + "*"), W = new RegExp("^" + O + "*([>+~]|" + O + ")" + O + "*"),
                    $ = new RegExp("=" + O + "*([^\\]'\"]*?)" + O + "*\\]", "g"), V = new RegExp(B),
                    G = new RegExp("^" + q + "$"), U = {
                        ID: new RegExp("^#(" + q + ")"),
                        CLASS: new RegExp("^\\.(" + q + ")"),
                        TAG: new RegExp("^(" + q + "|[*])"),
                        ATTR: new RegExp("^" + H),
                        PSEUDO: new RegExp("^" + B),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + O + "*(even|odd|(([+-]|)(\\d*)n|)" + O + "*(?:([+-]|)" + O + "*(\\d+)|))" + O + "*\\)|)", "i"),
                        bool: new RegExp("^(?:" + M + ")$", "i"),
                        needsContext: new RegExp("^" + O + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + O + "*((?:-\\d)?\\d*)" + O + "*\\)|)(?=[^-]|$)", "i")
                    }, X = /^(?:input|select|textarea|button)$/i, K = /^h\d$/i, Y = /^[^{]+\{\s*\[native \w/,
                    J = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, Q = /[+~]/,
                    Z = new RegExp("\\\\([\\da-f]{1,6}" + O + "?|(" + O + ")|.)", "ig"), rr = function (r, e, t) {
                        var n = "0x" + e - 65536;
                        return n != n || t ? e : n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
                    }, er = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, tr = function (r, e) {
                        return e ? "\0" === r ? "Р С—РЎвЂ”Р вЂ¦" : r.slice(0, -1) + "\\" + r.charCodeAt(r.length - 1).toString(16) + " " : "\\" + r
                    }, nr = function () {
                        f()
                    }, ur = mr(function (r) {
                        return !0 === r.disabled && ("form" in r || "label" in r)
                    }, {dir: "parentNode", next: "legend"});
                try {
                    P.apply(N = A.call(x.childNodes), x.childNodes), N[x.childNodes.length].nodeType
                } catch (r) {
                    P = {
                        apply: N.length ? function (r, e) {
                            z.apply(r, A.call(e))
                        } : function (r, e) {
                            for (var t = r.length, n = 0; r[t++] = e[n++];) ;
                            r.length = t - 1
                        }
                    }
                }

                function ar(r, e, n, u) {
                    var a, o, l, c, b, d, k, m = e && e.ownerDocument, w = e ? e.nodeType : 9;
                    if (n = n || [], "string" != typeof r || !r || 1 !== w && 9 !== w && 11 !== w) return n;
                    if (!u && ((e ? e.ownerDocument || e : x) !== p && f(e), e = e || p, h)) {
                        if (11 !== w && (b = J.exec(r))) if (a = b[1]) {
                            if (9 === w) {
                                if (!(l = e.getElementById(a))) return n;
                                if (l.id === a) return n.push(l), n
                            } else if (m && (l = m.getElementById(a)) && v(e, l) && l.id === a) return n.push(l), n
                        } else {
                            if (b[2]) return P.apply(n, e.getElementsByTagName(r)), n;
                            if ((a = b[3]) && t.getElementsByClassName && e.getElementsByClassName) return P.apply(n, e.getElementsByClassName(a)), n
                        }
                        if (t.qsa && !T[r + " "] && (!g || !g.test(r))) {
                            if (1 !== w) m = e, k = r; else if ("object" !== e.nodeName.toLowerCase()) {
                                for ((c = e.getAttribute("id")) ? c = c.replace(er, tr) : e.setAttribute("id", c = y), o = (d = s(r)).length; o--;) d[o] = "#" + c + " " + kr(d[o]);
                                k = d.join(","), m = Q.test(r) && hr(e.parentNode) || e
                            }
                            if (k) try {
                                return P.apply(n, m.querySelectorAll(k)), n
                            } catch (r) {
                            } finally {
                                c === y && e.removeAttribute("id")
                            }
                        }
                    }
                    return i(r.replace(I, "$1"), e, n, u)
                }

                function sr() {
                    var r = [];
                    return function e(t, u) {
                        return r.push(t + " ") > n.cacheLength && delete e[r.shift()], e[t + " "] = u
                    }
                }

                function or(r) {
                    return r[y] = !0, r
                }

                function ir(r) {
                    var e = p.createElement("fieldset");
                    try {
                        return !!r(e)
                    } catch (r) {
                        return !1
                    } finally {
                        e.parentNode && e.parentNode.removeChild(e), e = null
                    }
                }

                function lr(r, e) {
                    for (var t = r.split("|"), u = t.length; u--;) n.attrHandle[t[u]] = e
                }

                function cr(r, e) {
                    var t = e && r, n = t && 1 === r.nodeType && 1 === e.nodeType && r.sourceIndex - e.sourceIndex;
                    if (n) return n;
                    if (t) for (; t = t.nextSibling;) if (t === e) return -1;
                    return r ? 1 : -1
                }

                function br(r) {
                    return function (e) {
                        return "input" === e.nodeName.toLowerCase() && e.type === r
                    }
                }

                function fr(r) {
                    return function (e) {
                        var t = e.nodeName.toLowerCase();
                        return ("input" === t || "button" === t) && e.type === r
                    }
                }

                function pr(r) {
                    return function (e) {
                        return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === r : e.disabled === r : e.isDisabled === r || e.isDisabled !== !r && ur(e) === r : e.disabled === r : "label" in e && e.disabled === r
                    }
                }

                function dr(r) {
                    return or(function (e) {
                        return e = +e, or(function (t, n) {
                            for (var u, a = r([], t.length, e), s = a.length; s--;) t[u = a[s]] && (t[u] = !(n[u] = t[u]))
                        })
                    })
                }

                function hr(r) {
                    return r && void 0 !== r.getElementsByTagName && r
                }

                for (e in t = ar.support = {}, a = ar.isXML = function (r) {
                    var e = r && (r.ownerDocument || r).documentElement;
                    return !!e && "HTML" !== e.nodeName
                }, f = ar.setDocument = function (r) {
                    var e, u, s = r ? r.ownerDocument || r : x;
                    return s !== p && 9 === s.nodeType && s.documentElement ? (d = (p = s).documentElement, h = !a(p), x !== p && (u = p.defaultView) && u.top !== u && (u.addEventListener ? u.addEventListener("unload", nr, !1) : u.attachEvent && u.attachEvent("onunload", nr)), t.attributes = ir(function (r) {
                        return r.className = "i", !r.getAttribute("className")
                    }), t.getElementsByTagName = ir(function (r) {
                        return r.appendChild(p.createComment("")), !r.getElementsByTagName("*").length
                    }), t.getElementsByClassName = Y.test(p.getElementsByClassName), t.getById = ir(function (r) {
                        return d.appendChild(r).id = y, !p.getElementsByName || !p.getElementsByName(y).length
                    }), t.getById ? (n.filter.ID = function (r) {
                        var e = r.replace(Z, rr);
                        return function (r) {
                            return r.getAttribute("id") === e
                        }
                    }, n.find.ID = function (r, e) {
                        if (void 0 !== e.getElementById && h) {
                            var t = e.getElementById(r);
                            return t ? [t] : []
                        }
                    }) : (n.filter.ID = function (r) {
                        var e = r.replace(Z, rr);
                        return function (r) {
                            var t = void 0 !== r.getAttributeNode && r.getAttributeNode("id");
                            return t && t.value === e
                        }
                    }, n.find.ID = function (r, e) {
                        if (void 0 !== e.getElementById && h) {
                            var t, n, u, a = e.getElementById(r);
                            if (a) {
                                if ((t = a.getAttributeNode("id")) && t.value === r) return [a];
                                for (u = e.getElementsByName(r), n = 0; a = u[n++];) if ((t = a.getAttributeNode("id")) && t.value === r) return [a]
                            }
                            return []
                        }
                    }), n.find.TAG = t.getElementsByTagName ? function (r, e) {
                        return void 0 !== e.getElementsByTagName ? e.getElementsByTagName(r) : t.qsa ? e.querySelectorAll(r) : void 0
                    } : function (r, e) {
                        var t, n = [], u = 0, a = e.getElementsByTagName(r);
                        if ("*" === r) {
                            for (; t = a[u++];) 1 === t.nodeType && n.push(t);
                            return n
                        }
                        return a
                    }, n.find.CLASS = t.getElementsByClassName && function (r, e) {
                        if (void 0 !== e.getElementsByClassName && h) return e.getElementsByClassName(r)
                    }, k = [], g = [], (t.qsa = Y.test(p.querySelectorAll)) && (ir(function (r) {
                        d.appendChild(r).innerHTML = "<a id='" + y + "'></a><select id='" + y + "-\r\\' msallowcapture=''><option selected=''></option></select>", r.querySelectorAll("[msallowcapture^='']").length && g.push("[*^$]=" + O + "*(?:''|\"\")"), r.querySelectorAll("[selected]").length || g.push("\\[" + O + "*(?:value|" + M + ")"), r.querySelectorAll("[id~=" + y + "-]").length || g.push("~="), r.querySelectorAll(":checked").length || g.push(":checked"), r.querySelectorAll("a#" + y + "+*").length || g.push(".#.+[+~]")
                    }), ir(function (r) {
                        r.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                        var e = p.createElement("input");
                        e.setAttribute("type", "hidden"), r.appendChild(e).setAttribute("name", "D"), r.querySelectorAll("[name=d]").length && g.push("name" + O + "*[*^$|!~]?="), 2 !== r.querySelectorAll(":enabled").length && g.push(":enabled", ":disabled"), d.appendChild(r).disabled = !0, 2 !== r.querySelectorAll(":disabled").length && g.push(":enabled", ":disabled"), r.querySelectorAll("*,:x"), g.push(",.*:")
                    })), (t.matchesSelector = Y.test(m = d.matches || d.webkitMatchesSelector || d.mozMatchesSelector || d.oMatchesSelector || d.msMatchesSelector)) && ir(function (r) {
                        t.disconnectedMatch = m.call(r, "*"), m.call(r, "[s!='']:x"), k.push("!=", B)
                    }), g = g.length && new RegExp(g.join("|")), k = k.length && new RegExp(k.join("|")), e = Y.test(d.compareDocumentPosition), v = e || Y.test(d.contains) ? function (r, e) {
                        var t = 9 === r.nodeType ? r.documentElement : r, n = e && e.parentNode;
                        return r === n || !(!n || 1 !== n.nodeType || !(t.contains ? t.contains(n) : r.compareDocumentPosition && 16 & r.compareDocumentPosition(n)))
                    } : function (r, e) {
                        if (e) for (; e = e.parentNode;) if (e === r) return !0;
                        return !1
                    }, E = e ? function (r, e) {
                        if (r === e) return b = !0, 0;
                        var n = !r.compareDocumentPosition - !e.compareDocumentPosition;
                        return n || (1 & (n = (r.ownerDocument || r) === (e.ownerDocument || e) ? r.compareDocumentPosition(e) : 1) || !t.sortDetached && e.compareDocumentPosition(r) === n ? r === p || r.ownerDocument === x && v(x, r) ? -1 : e === p || e.ownerDocument === x && v(x, e) ? 1 : c ? D(c, r) - D(c, e) : 0 : 4 & n ? -1 : 1)
                    } : function (r, e) {
                        if (r === e) return b = !0, 0;
                        var t, n = 0, u = r.parentNode, a = e.parentNode, s = [r], o = [e];
                        if (!u || !a) return r === p ? -1 : e === p ? 1 : u ? -1 : a ? 1 : c ? D(c, r) - D(c, e) : 0;
                        if (u === a) return cr(r, e);
                        for (t = r; t = t.parentNode;) s.unshift(t);
                        for (t = e; t = t.parentNode;) o.unshift(t);
                        for (; s[n] === o[n];) n++;
                        return n ? cr(s[n], o[n]) : s[n] === x ? -1 : o[n] === x ? 1 : 0
                    }, p) : p
                }, ar.matches = function (r, e) {
                    return ar(r, null, null, e)
                }, ar.matchesSelector = function (r, e) {
                    if ((r.ownerDocument || r) !== p && f(r), e = e.replace($, "='$1']"), t.matchesSelector && h && !T[e + " "] && (!k || !k.test(e)) && (!g || !g.test(e))) try {
                        var n = m.call(r, e);
                        if (n || t.disconnectedMatch || r.document && 11 !== r.document.nodeType) return n
                    } catch (r) {
                    }
                    return ar(e, p, null, [r]).length > 0
                }, ar.contains = function (r, e) {
                    return (r.ownerDocument || r) !== p && f(r), v(r, e)
                }, ar.attr = function (r, e) {
                    (r.ownerDocument || r) !== p && f(r);
                    var u = n.attrHandle[e.toLowerCase()],
                        a = u && L.call(n.attrHandle, e.toLowerCase()) ? u(r, e, !h) : void 0;
                    return void 0 !== a ? a : t.attributes || !h ? r.getAttribute(e) : (a = r.getAttributeNode(e)) && a.specified ? a.value : null
                }, ar.escape = function (r) {
                    return (r + "").replace(er, tr)
                }, ar.error = function (r) {
                    throw new Error("Syntax error, unrecognized expression: " + r)
                }, ar.uniqueSort = function (r) {
                    var e, n = [], u = 0, a = 0;
                    if (b = !t.detectDuplicates, c = !t.sortStable && r.slice(0), r.sort(E), b) {
                        for (; e = r[a++];) e === r[a] && (u = n.push(a));
                        for (; u--;) r.splice(n[u], 1)
                    }
                    return c = null, r
                }, u = ar.getText = function (r) {
                    var e, t = "", n = 0, a = r.nodeType;
                    if (a) {
                        if (1 === a || 9 === a || 11 === a) {
                            if ("string" == typeof r.textContent) return r.textContent;
                            for (r = r.firstChild; r; r = r.nextSibling) t += u(r)
                        } else if (3 === a || 4 === a) return r.nodeValue
                    } else for (; e = r[n++];) t += u(e);
                    return t
                }, (n = ar.selectors = {
                    cacheLength: 50,
                    createPseudo: or,
                    match: U,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {dir: "parentNode", first: !0},
                        " ": {dir: "parentNode"},
                        "+": {dir: "previousSibling", first: !0},
                        "~": {dir: "previousSibling"}
                    },
                    preFilter: {
                        ATTR: function (r) {
                            return r[1] = r[1].replace(Z, rr), r[3] = (r[3] || r[4] || r[5] || "").replace(Z, rr), "~=" === r[2] && (r[3] = " " + r[3] + " "), r.slice(0, 4)
                        }, CHILD: function (r) {
                            return r[1] = r[1].toLowerCase(), "nth" === r[1].slice(0, 3) ? (r[3] || ar.error(r[0]), r[4] = +(r[4] ? r[5] + (r[6] || 1) : 2 * ("even" === r[3] || "odd" === r[3])), r[5] = +(r[7] + r[8] || "odd" === r[3])) : r[3] && ar.error(r[0]), r
                        }, PSEUDO: function (r) {
                            var e, t = !r[6] && r[2];
                            return U.CHILD.test(r[0]) ? null : (r[3] ? r[2] = r[4] || r[5] || "" : t && V.test(t) && (e = s(t, !0)) && (e = t.indexOf(")", t.length - e) - t.length) && (r[0] = r[0].slice(0, e), r[2] = t.slice(0, e)), r.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function (r) {
                            var e = r.replace(Z, rr).toLowerCase();
                            return "*" === r ? function () {
                                return !0
                            } : function (r) {
                                return r.nodeName && r.nodeName.toLowerCase() === e
                            }
                        }, CLASS: function (r) {
                            var e = _[r + " "];
                            return e || (e = new RegExp("(^|" + O + ")" + r + "(" + O + "|$)")) && _(r, function (r) {
                                return e.test("string" == typeof r.className && r.className || void 0 !== r.getAttribute && r.getAttribute("class") || "")
                            })
                        }, ATTR: function (r, e, t) {
                            return function (n) {
                                var u = ar.attr(n, r);
                                return null == u ? "!=" === e : !e || (u += "", "=" === e ? u === t : "!=" === e ? u !== t : "^=" === e ? t && 0 === u.indexOf(t) : "*=" === e ? t && u.indexOf(t) > -1 : "$=" === e ? t && u.slice(-t.length) === t : "~=" === e ? (" " + u.replace(R, " ") + " ").indexOf(t) > -1 : "|=" === e && (u === t || u.slice(0, t.length + 1) === t + "-"))
                            }
                        }, CHILD: function (r, e, t, n, u) {
                            var a = "nth" !== r.slice(0, 3), s = "last" !== r.slice(-4), o = "of-type" === e;
                            return 1 === n && 0 === u ? function (r) {
                                return !!r.parentNode
                            } : function (e, t, i) {
                                var l, c, b, f, p, d, h = a !== s ? "nextSibling" : "previousSibling", g = e.parentNode,
                                    k = o && e.nodeName.toLowerCase(), m = !i && !o, v = !1;
                                if (g) {
                                    if (a) {
                                        for (; h;) {
                                            for (f = e; f = f[h];) if (o ? f.nodeName.toLowerCase() === k : 1 === f.nodeType) return !1;
                                            d = h = "only" === r && !d && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (d = [s ? g.firstChild : g.lastChild], s && m) {
                                        for (v = (p = (l = (c = (b = (f = g)[y] || (f[y] = {}))[f.uniqueID] || (b[f.uniqueID] = {}))[r] || [])[0] === w && l[1]) && l[2], f = p && g.childNodes[p]; f = ++p && f && f[h] || (v = p = 0) || d.pop();) if (1 === f.nodeType && ++v && f === e) {
                                            c[r] = [w, p, v];
                                            break
                                        }
                                    } else if (m && (v = p = (l = (c = (b = (f = e)[y] || (f[y] = {}))[f.uniqueID] || (b[f.uniqueID] = {}))[r] || [])[0] === w && l[1]), !1 === v) for (; (f = ++p && f && f[h] || (v = p = 0) || d.pop()) && ((o ? f.nodeName.toLowerCase() !== k : 1 !== f.nodeType) || !++v || (m && ((c = (b = f[y] || (f[y] = {}))[f.uniqueID] || (b[f.uniqueID] = {}))[r] = [w, v]), f !== e));) ;
                                    return (v -= u) === n || v % n == 0 && v / n >= 0
                                }
                            }
                        }, PSEUDO: function (r, e) {
                            var t,
                                u = n.pseudos[r] || n.setFilters[r.toLowerCase()] || ar.error("unsupported pseudo: " + r);
                            return u[y] ? u(e) : u.length > 1 ? (t = [r, r, "", e], n.setFilters.hasOwnProperty(r.toLowerCase()) ? or(function (r, t) {
                                for (var n, a = u(r, e), s = a.length; s--;) r[n = D(r, a[s])] = !(t[n] = a[s])
                            }) : function (r) {
                                return u(r, 0, t)
                            }) : u
                        }
                    },
                    pseudos: {
                        not: or(function (r) {
                            var e = [], t = [], n = o(r.replace(I, "$1"));
                            return n[y] ? or(function (r, e, t, u) {
                                for (var a, s = n(r, null, u, []), o = r.length; o--;) (a = s[o]) && (r[o] = !(e[o] = a))
                            }) : function (r, u, a) {
                                return e[0] = r, n(e, null, a, t), e[0] = null, !t.pop()
                            }
                        }), has: or(function (r) {
                            return function (e) {
                                return ar(r, e).length > 0
                            }
                        }), contains: or(function (r) {
                            return r = r.replace(Z, rr), function (e) {
                                return (e.textContent || e.innerText || u(e)).indexOf(r) > -1
                            }
                        }), lang: or(function (r) {
                            return G.test(r || "") || ar.error("unsupported lang: " + r), r = r.replace(Z, rr).toLowerCase(), function (e) {
                                var t;
                                do {
                                    if (t = h ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (t = t.toLowerCase()) === r || 0 === t.indexOf(r + "-")
                                } while ((e = e.parentNode) && 1 === e.nodeType);
                                return !1
                            }
                        }), target: function (e) {
                            var t = r.location && r.location.hash;
                            return t && t.slice(1) === e.id
                        }, root: function (r) {
                            return r === d
                        }, focus: function (r) {
                            return r === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(r.type || r.href || ~r.tabIndex)
                        }, enabled: pr(!1), disabled: pr(!0), checked: function (r) {
                            var e = r.nodeName.toLowerCase();
                            return "input" === e && !!r.checked || "option" === e && !!r.selected
                        }, selected: function (r) {
                            return r.parentNode && r.parentNode.selectedIndex, !0 === r.selected
                        }, empty: function (r) {
                            for (r = r.firstChild; r; r = r.nextSibling) if (r.nodeType < 6) return !1;
                            return !0
                        }, parent: function (r) {
                            return !n.pseudos.empty(r)
                        }, header: function (r) {
                            return K.test(r.nodeName)
                        }, input: function (r) {
                            return X.test(r.nodeName)
                        }, button: function (r) {
                            var e = r.nodeName.toLowerCase();
                            return "input" === e && "button" === r.type || "button" === e
                        }, text: function (r) {
                            var e;
                            return "input" === r.nodeName.toLowerCase() && "text" === r.type && (null == (e = r.getAttribute("type")) || "text" === e.toLowerCase())
                        }, first: dr(function () {
                            return [0]
                        }), last: dr(function (r, e) {
                            return [e - 1]
                        }), eq: dr(function (r, e, t) {
                            return [t < 0 ? t + e : t]
                        }), even: dr(function (r, e) {
                            for (var t = 0; t < e; t += 2) r.push(t);
                            return r
                        }), odd: dr(function (r, e) {
                            for (var t = 1; t < e; t += 2) r.push(t);
                            return r
                        }), lt: dr(function (r, e, t) {
                            for (var n = t < 0 ? t + e : t; --n >= 0;) r.push(n);
                            return r
                        }), gt: dr(function (r, e, t) {
                            for (var n = t < 0 ? t + e : t; ++n < e;) r.push(n);
                            return r
                        })
                    }
                }).pseudos.nth = n.pseudos.eq, {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) n.pseudos[e] = br(e);
                for (e in {submit: !0, reset: !0}) n.pseudos[e] = fr(e);

                function gr() {
                }

                function kr(r) {
                    for (var e = 0, t = r.length, n = ""; e < t; e++) n += r[e].value;
                    return n
                }

                function mr(r, e, t) {
                    var n = e.dir, u = e.next, a = u || n, s = t && "parentNode" === a, o = C++;
                    return e.first ? function (e, t, u) {
                        for (; e = e[n];) if (1 === e.nodeType || s) return r(e, t, u);
                        return !1
                    } : function (e, t, i) {
                        var l, c, b, f = [w, o];
                        if (i) {
                            for (; e = e[n];) if ((1 === e.nodeType || s) && r(e, t, i)) return !0
                        } else for (; e = e[n];) if (1 === e.nodeType || s) if (c = (b = e[y] || (e[y] = {}))[e.uniqueID] || (b[e.uniqueID] = {}), u && u === e.nodeName.toLowerCase()) e = e[n] || e; else {
                            if ((l = c[a]) && l[0] === w && l[1] === o) return f[2] = l[2];
                            if (c[a] = f, f[2] = r(e, t, i)) return !0
                        }
                        return !1
                    }
                }

                function vr(r) {
                    return r.length > 1 ? function (e, t, n) {
                        for (var u = r.length; u--;) if (!r[u](e, t, n)) return !1;
                        return !0
                    } : r[0]
                }

                function yr(r, e, t, n, u) {
                    for (var a, s = [], o = 0, i = r.length, l = null != e; o < i; o++) (a = r[o]) && (t && !t(a, n, u) || (s.push(a), l && e.push(o)));
                    return s
                }

                function xr(r, e, t, n, u, a) {
                    return n && !n[y] && (n = xr(n)), u && !u[y] && (u = xr(u, a)), or(function (a, s, o, i) {
                        var l, c, b, f = [], p = [], d = s.length, h = a || function (r, e, t) {
                                for (var n = 0, u = e.length; n < u; n++) ar(r, e[n], t);
                                return t
                            }(e || "*", o.nodeType ? [o] : o, []), g = !r || !a && e ? h : yr(h, f, r, o, i),
                            k = t ? u || (a ? r : d || n) ? [] : s : g;
                        if (t && t(g, k, o, i), n) for (l = yr(k, p), n(l, [], o, i), c = l.length; c--;) (b = l[c]) && (k[p[c]] = !(g[p[c]] = b));
                        if (a) {
                            if (u || r) {
                                if (u) {
                                    for (l = [], c = k.length; c--;) (b = k[c]) && l.push(g[c] = b);
                                    u(null, k = [], l, i)
                                }
                                for (c = k.length; c--;) (b = k[c]) && (l = u ? D(a, b) : f[c]) > -1 && (a[l] = !(s[l] = b))
                            }
                        } else k = yr(k === s ? k.splice(d, k.length) : k), u ? u(null, s, k, i) : P.apply(s, k)
                    })
                }

                function wr(r) {
                    for (var e, t, u, a = r.length, s = n.relative[r[0].type], o = s || n.relative[" "], i = s ? 1 : 0, c = mr(function (r) {
                        return r === e
                    }, o, !0), b = mr(function (r) {
                        return D(e, r) > -1
                    }, o, !0), f = [function (r, t, n) {
                        var u = !s && (n || t !== l) || ((e = t).nodeType ? c(r, t, n) : b(r, t, n));
                        return e = null, u
                    }]; i < a; i++) if (t = n.relative[r[i].type]) f = [mr(vr(f), t)]; else {
                        if ((t = n.filter[r[i].type].apply(null, r[i].matches))[y]) {
                            for (u = ++i; u < a && !n.relative[r[u].type]; u++) ;
                            return xr(i > 1 && vr(f), i > 1 && kr(r.slice(0, i - 1).concat({value: " " === r[i - 2].type ? "*" : ""})).replace(I, "$1"), t, i < u && wr(r.slice(i, u)), u < a && wr(r = r.slice(u)), u < a && kr(r))
                        }
                        f.push(t)
                    }
                    return vr(f)
                }

                return gr.prototype = n.filters = n.pseudos, n.setFilters = new gr, s = ar.tokenize = function (r, e) {
                    var t, u, a, s, o, i, l, c = S[r + " "];
                    if (c) return e ? 0 : c.slice(0);
                    for (o = r, i = [], l = n.preFilter; o;) {
                        for (s in t && !(u = F.exec(o)) || (u && (o = o.slice(u[0].length) || o), i.push(a = [])), t = !1, (u = W.exec(o)) && (t = u.shift(), a.push({
                            value: t,
                            type: u[0].replace(I, " ")
                        }), o = o.slice(t.length)), n.filter) !(u = U[s].exec(o)) || l[s] && !(u = l[s](u)) || (t = u.shift(), a.push({
                            value: t,
                            type: s,
                            matches: u
                        }), o = o.slice(t.length));
                        if (!t) break
                    }
                    return e ? o.length : o ? ar.error(r) : S(r, i).slice(0)
                }, o = ar.compile = function (r, e) {
                    var t, u = [], a = [], o = T[r + " "];
                    if (!o) {
                        for (e || (e = s(r)), t = e.length; t--;) (o = wr(e[t]))[y] ? u.push(o) : a.push(o);
                        (o = T(r, function (r, e) {
                            var t = e.length > 0, u = r.length > 0, a = function (a, s, o, i, c) {
                                var b, d, g, k = 0, m = "0", v = a && [], y = [], x = l,
                                    C = a || u && n.find.TAG("*", c), _ = w += null == x ? 1 : Math.random() || .1,
                                    S = C.length;
                                for (c && (l = s === p || s || c); m !== S && null != (b = C[m]); m++) {
                                    if (u && b) {
                                        for (d = 0, s || b.ownerDocument === p || (f(b), o = !h); g = r[d++];) if (g(b, s || p, o)) {
                                            i.push(b);
                                            break
                                        }
                                        c && (w = _)
                                    }
                                    t && ((b = !g && b) && k--, a && v.push(b))
                                }
                                if (k += m, t && m !== k) {
                                    for (d = 0; g = e[d++];) g(v, y, s, o);
                                    if (a) {
                                        if (k > 0) for (; m--;) v[m] || y[m] || (y[m] = j.call(i));
                                        y = yr(y)
                                    }
                                    P.apply(i, y), c && !a && y.length > 0 && k + e.length > 1 && ar.uniqueSort(i)
                                }
                                return c && (w = _, l = x), v
                            };
                            return t ? or(a) : a
                        }(a, u))).selector = r
                    }
                    return o
                }, i = ar.select = function (r, e, t, u) {
                    var a, i, l, c, b, f = "function" == typeof r && r, p = !u && s(r = f.selector || r);
                    if (t = t || [], 1 === p.length) {
                        if ((i = p[0] = p[0].slice(0)).length > 2 && "ID" === (l = i[0]).type && 9 === e.nodeType && h && n.relative[i[1].type]) {
                            if (!(e = (n.find.ID(l.matches[0].replace(Z, rr), e) || [])[0])) return t;
                            f && (e = e.parentNode), r = r.slice(i.shift().value.length)
                        }
                        for (a = U.needsContext.test(r) ? 0 : i.length; a-- && (l = i[a], !n.relative[c = l.type]);) if ((b = n.find[c]) && (u = b(l.matches[0].replace(Z, rr), Q.test(i[0].type) && hr(e.parentNode) || e))) {
                            if (i.splice(a, 1), !(r = u.length && kr(i))) return P.apply(t, u), t;
                            break
                        }
                    }
                    return (f || o(r, p))(u, e, !h, t, !e || Q.test(r) && hr(e.parentNode) || e), t
                }, t.sortStable = y.split("").sort(E).join("") === y, t.detectDuplicates = !!b, f(), t.sortDetached = ir(function (r) {
                    return 1 & r.compareDocumentPosition(p.createElement("fieldset"))
                }), ir(function (r) {
                    return r.innerHTML = "<a href='#'></a>", "#" === r.firstChild.getAttribute("href")
                }) || lr("type|href|height|width", function (r, e, t) {
                    if (!t) return r.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
                }), t.attributes && ir(function (r) {
                    return r.innerHTML = "<input/>", r.firstChild.setAttribute("value", ""), "" === r.firstChild.getAttribute("value")
                }) || lr("value", function (r, e, t) {
                    if (!t && "input" === r.nodeName.toLowerCase()) return r.defaultValue
                }), ir(function (r) {
                    return null == r.getAttribute("disabled")
                }) || lr(M, function (r, e, t) {
                    var n;
                    if (!t) return !0 === r[e] ? e.toLowerCase() : (n = r.getAttributeNode(e)) && n.specified ? n.value : null
                }), ar
            }(t);
            v.find = S, v.expr = S.selectors, v.expr[":"] = v.expr.pseudos, v.uniqueSort = v.unique = S.uniqueSort, v.text = S.getText, v.isXMLDoc = S.isXML, v.contains = S.contains, v.escapeSelector = S.escape;
            var T = function (r, e, t) {
                for (var n = [], u = void 0 !== t; (r = r[e]) && 9 !== r.nodeType;) if (1 === r.nodeType) {
                    if (u && v(r).is(t)) break;
                    n.push(r)
                }
                return n
            }, E = function (r, e) {
                for (var t = []; r; r = r.nextSibling) 1 === r.nodeType && r !== e && t.push(r);
                return t
            }, L = v.expr.match.needsContext;

            function N(r, e) {
                return r.nodeName && r.nodeName.toLowerCase() === e.toLowerCase()
            }

            var j = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i, z = /^.[^:#\[\.,]*$/;

            function P(r, e, t) {
                return v.isFunction(e) ? v.grep(r, function (r, n) {
                    return !!e.call(r, n, r) !== t
                }) : e.nodeType ? v.grep(r, function (r) {
                    return r === e !== t
                }) : "string" != typeof e ? v.grep(r, function (r) {
                    return b.call(e, r) > -1 !== t
                }) : z.test(e) ? v.filter(e, r, t) : (e = v.filter(e, r), v.grep(r, function (r) {
                    return b.call(e, r) > -1 !== t && 1 === r.nodeType
                }))
            }

            v.filter = function (r, e, t) {
                var n = e[0];
                return t && (r = ":not(" + r + ")"), 1 === e.length && 1 === n.nodeType ? v.find.matchesSelector(n, r) ? [n] : [] : v.find.matches(r, v.grep(e, function (r) {
                    return 1 === r.nodeType
                }))
            }, v.fn.extend({
                find: function (r) {
                    var e, t, n = this.length, u = this;
                    if ("string" != typeof r) return this.pushStack(v(r).filter(function () {
                        for (e = 0; e < n; e++) if (v.contains(u[e], this)) return !0
                    }));
                    for (t = this.pushStack([]), e = 0; e < n; e++) v.find(r, u[e], t);
                    return n > 1 ? v.uniqueSort(t) : t
                }, filter: function (r) {
                    return this.pushStack(P(this, r || [], !1))
                }, not: function (r) {
                    return this.pushStack(P(this, r || [], !0))
                }, is: function (r) {
                    return !!P(this, "string" == typeof r && L.test(r) ? v(r) : r || [], !1).length
                }
            });
            var A, D = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
            (v.fn.init = function (r, e, t) {
                var n, u;
                if (!r) return this;
                if (t = t || A, "string" == typeof r) {
                    if (!(n = "<" === r[0] && ">" === r[r.length - 1] && r.length >= 3 ? [null, r, null] : D.exec(r)) || !n[1] && e) return !e || e.jquery ? (e || t).find(r) : this.constructor(e).find(r);
                    if (n[1]) {
                        if (e = e instanceof v ? e[0] : e, v.merge(this, v.parseHTML(n[1], e && e.nodeType ? e.ownerDocument || e : s, !0)), j.test(n[1]) && v.isPlainObject(e)) for (n in e) v.isFunction(this[n]) ? this[n](e[n]) : this.attr(n, e[n]);
                        return this
                    }
                    return (u = s.getElementById(n[2])) && (this[0] = u, this.length = 1), this
                }
                return r.nodeType ? (this[0] = r, this.length = 1, this) : v.isFunction(r) ? void 0 !== t.ready ? t.ready(r) : r(v) : v.makeArray(r, this)
            }).prototype = v.fn, A = v(s);
            var M = /^(?:parents|prev(?:Until|All))/, O = {children: !0, contents: !0, next: !0, prev: !0};

            function q(r, e) {
                for (; (r = r[e]) && 1 !== r.nodeType;) ;
                return r
            }

            v.fn.extend({
                has: function (r) {
                    var e = v(r, this), t = e.length;
                    return this.filter(function () {
                        for (var r = 0; r < t; r++) if (v.contains(this, e[r])) return !0
                    })
                }, closest: function (r, e) {
                    var t, n = 0, u = this.length, a = [], s = "string" != typeof r && v(r);
                    if (!L.test(r)) for (; n < u; n++) for (t = this[n]; t && t !== e; t = t.parentNode) if (t.nodeType < 11 && (s ? s.index(t) > -1 : 1 === t.nodeType && v.find.matchesSelector(t, r))) {
                        a.push(t);
                        break
                    }
                    return this.pushStack(a.length > 1 ? v.uniqueSort(a) : a)
                }, index: function (r) {
                    return r ? "string" == typeof r ? b.call(v(r), this[0]) : b.call(this, r.jquery ? r[0] : r) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                }, add: function (r, e) {
                    return this.pushStack(v.uniqueSort(v.merge(this.get(), v(r, e))))
                }, addBack: function (r) {
                    return this.add(null == r ? this.prevObject : this.prevObject.filter(r))
                }
            }), v.each({
                parent: function (r) {
                    var e = r.parentNode;
                    return e && 11 !== e.nodeType ? e : null
                }, parents: function (r) {
                    return T(r, "parentNode")
                }, parentsUntil: function (r, e, t) {
                    return T(r, "parentNode", t)
                }, next: function (r) {
                    return q(r, "nextSibling")
                }, prev: function (r) {
                    return q(r, "previousSibling")
                }, nextAll: function (r) {
                    return T(r, "nextSibling")
                }, prevAll: function (r) {
                    return T(r, "previousSibling")
                }, nextUntil: function (r, e, t) {
                    return T(r, "nextSibling", t)
                }, prevUntil: function (r, e, t) {
                    return T(r, "previousSibling", t)
                }, siblings: function (r) {
                    return E((r.parentNode || {}).firstChild, r)
                }, children: function (r) {
                    return E(r.firstChild)
                }, contents: function (r) {
                    return N(r, "iframe") ? r.contentDocument : (N(r, "template") && (r = r.content || r), v.merge([], r.childNodes))
                }
            }, function (r, e) {
                v.fn[r] = function (t, n) {
                    var u = v.map(this, e, t);
                    return "Until" !== r.slice(-5) && (n = t), n && "string" == typeof n && (u = v.filter(n, u)), this.length > 1 && (O[r] || v.uniqueSort(u), M.test(r) && u.reverse()), this.pushStack(u)
                }
            });
            var H = /[^\x20\t\r\n\f]+/g;

            function B(r) {
                return r
            }

            function R(r) {
                throw r
            }

            function I(r, e, t, n) {
                var u;
                try {
                    r && v.isFunction(u = r.promise) ? u.call(r).done(e).fail(t) : r && v.isFunction(u = r.then) ? u.call(r, e, t) : e.apply(void 0, [r].slice(n))
                } catch (r) {
                    t.apply(void 0, [r])
                }
            }

            v.Callbacks = function (r) {
                r = "string" == typeof r ? function (r) {
                    var e = {};
                    return v.each(r.match(H) || [], function (r, t) {
                        e[t] = !0
                    }), e
                }(r) : v.extend({}, r);
                var e, t, n, u, a = [], s = [], o = -1, i = function () {
                    for (u = u || r.once, n = e = !0; s.length; o = -1) for (t = s.shift(); ++o < a.length;) !1 === a[o].apply(t[0], t[1]) && r.stopOnFalse && (o = a.length, t = !1);
                    r.memory || (t = !1), e = !1, u && (a = t ? [] : "")
                }, l = {
                    add: function () {
                        return a && (t && !e && (o = a.length - 1, s.push(t)), function e(t) {
                            v.each(t, function (t, n) {
                                v.isFunction(n) ? r.unique && l.has(n) || a.push(n) : n && n.length && "string" !== v.type(n) && e(n)
                            })
                        }(arguments), t && !e && i()), this
                    }, remove: function () {
                        return v.each(arguments, function (r, e) {
                            for (var t; (t = v.inArray(e, a, t)) > -1;) a.splice(t, 1), t <= o && o--
                        }), this
                    }, has: function (r) {
                        return r ? v.inArray(r, a) > -1 : a.length > 0
                    }, empty: function () {
                        return a && (a = []), this
                    }, disable: function () {
                        return u = s = [], a = t = "", this
                    }, disabled: function () {
                        return !a
                    }, lock: function () {
                        return u = s = [], t || e || (a = t = ""), this
                    }, locked: function () {
                        return !!u
                    }, fireWith: function (r, t) {
                        return u || (t = [r, (t = t || []).slice ? t.slice() : t], s.push(t), e || i()), this
                    }, fire: function () {
                        return l.fireWith(this, arguments), this
                    }, fired: function () {
                        return !!n
                    }
                };
                return l
            }, v.extend({
                Deferred: function (r) {
                    var e = [["notify", "progress", v.Callbacks("memory"), v.Callbacks("memory"), 2], ["resolve", "done", v.Callbacks("once memory"), v.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", v.Callbacks("once memory"), v.Callbacks("once memory"), 1, "rejected"]],
                        n = "pending", u = {
                            state: function () {
                                return n
                            }, always: function () {
                                return a.done(arguments).fail(arguments), this
                            }, catch: function (r) {
                                return u.then(null, r)
                            }, pipe: function () {
                                var r = arguments;
                                return v.Deferred(function (t) {
                                    v.each(e, function (e, n) {
                                        var u = v.isFunction(r[n[4]]) && r[n[4]];
                                        a[n[1]](function () {
                                            var r = u && u.apply(this, arguments);
                                            r && v.isFunction(r.promise) ? r.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[n[0] + "With"](this, u ? [r] : arguments)
                                        })
                                    }), r = null
                                }).promise()
                            }, then: function (r, n, u) {
                                var a = 0;

                                function s(r, e, n, u) {
                                    return function () {
                                        var o = this, i = arguments, l = function () {
                                            var t, l;
                                            if (!(r < a)) {
                                                if ((t = n.apply(o, i)) === e.promise()) throw new TypeError("Thenable self-resolution");
                                                l = t && ("object" == typeof t || "function" == typeof t) && t.then, v.isFunction(l) ? u ? l.call(t, s(a, e, B, u), s(a, e, R, u)) : (a++, l.call(t, s(a, e, B, u), s(a, e, R, u), s(a, e, B, e.notifyWith))) : (n !== B && (o = void 0, i = [t]), (u || e.resolveWith)(o, i))
                                            }
                                        }, c = u ? l : function () {
                                            try {
                                                l()
                                            } catch (t) {
                                                v.Deferred.exceptionHook && v.Deferred.exceptionHook(t, c.stackTrace), r + 1 >= a && (n !== R && (o = void 0, i = [t]), e.rejectWith(o, i))
                                            }
                                        };
                                        r ? c() : (v.Deferred.getStackHook && (c.stackTrace = v.Deferred.getStackHook()), t.setTimeout(c))
                                    }
                                }

                                return v.Deferred(function (t) {
                                    e[0][3].add(s(0, t, v.isFunction(u) ? u : B, t.notifyWith)), e[1][3].add(s(0, t, v.isFunction(r) ? r : B)), e[2][3].add(s(0, t, v.isFunction(n) ? n : R))
                                }).promise()
                            }, promise: function (r) {
                                return null != r ? v.extend(r, u) : u
                            }
                        }, a = {};
                    return v.each(e, function (r, t) {
                        var s = t[2], o = t[5];
                        u[t[1]] = s.add, o && s.add(function () {
                            n = o
                        }, e[3 - r][2].disable, e[0][2].lock), s.add(t[3].fire), a[t[0]] = function () {
                            return a[t[0] + "With"](this === a ? void 0 : this, arguments), this
                        }, a[t[0] + "With"] = s.fireWith
                    }), u.promise(a), r && r.call(a, a), a
                }, when: function (r) {
                    var e = arguments.length, t = e, n = Array(t), u = i.call(arguments), a = v.Deferred(),
                        s = function (r) {
                            return function (t) {
                                n[r] = this, u[r] = arguments.length > 1 ? i.call(arguments) : t, --e || a.resolveWith(n, u)
                            }
                        };
                    if (e <= 1 && (I(r, a.done(s(t)).resolve, a.reject, !e), "pending" === a.state() || v.isFunction(u[t] && u[t].then))) return a.then();
                    for (; t--;) I(u[t], s(t), a.reject);
                    return a.promise()
                }
            });
            var F = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
            v.Deferred.exceptionHook = function (r, e) {
                t.console && t.console.warn && r && F.test(r.name) && t.console.warn("jQuery.Deferred exception: " + r.message, r.stack, e)
            }, v.readyException = function (r) {
                t.setTimeout(function () {
                    throw r
                })
            };
            var W = v.Deferred();

            function $() {
                s.removeEventListener("DOMContentLoaded", $), t.removeEventListener("load", $), v.ready()
            }

            v.fn.ready = function (r) {
                return W.then(r).catch(function (r) {
                    v.readyException(r)
                }), this
            }, v.extend({
                isReady: !1, readyWait: 1, ready: function (r) {
                    (!0 === r ? --v.readyWait : v.isReady) || (v.isReady = !0, !0 !== r && --v.readyWait > 0 || W.resolveWith(s, [v]))
                }
            }), v.ready.then = W.then, "complete" === s.readyState || "loading" !== s.readyState && !s.documentElement.doScroll ? t.setTimeout(v.ready) : (s.addEventListener("DOMContentLoaded", $), t.addEventListener("load", $));
            var V = function (r, e, t, n, u, a, s) {
                var o = 0, i = r.length, l = null == t;
                if ("object" === v.type(t)) for (o in u = !0, t) V(r, e, o, t[o], !0, a, s); else if (void 0 !== n && (u = !0, v.isFunction(n) || (s = !0), l && (s ? (e.call(r, n), e = null) : (l = e, e = function (r, e, t) {
                    return l.call(v(r), t)
                })), e)) for (; o < i; o++) e(r[o], t, s ? n : n.call(r[o], o, e(r[o], t)));
                return u ? r : l ? e.call(r) : i ? e(r[0], t) : a
            }, G = function (r) {
                return 1 === r.nodeType || 9 === r.nodeType || !+r.nodeType
            };

            function U() {
                this.expando = v.expando + U.uid++
            }

            U.uid = 1, U.prototype = {
                cache: function (r) {
                    var e = r[this.expando];
                    return e || (e = {}, G(r) && (r.nodeType ? r[this.expando] = e : Object.defineProperty(r, this.expando, {
                        value: e,
                        configurable: !0
                    }))), e
                }, set: function (r, e, t) {
                    var n, u = this.cache(r);
                    if ("string" == typeof e) u[v.camelCase(e)] = t; else for (n in e) u[v.camelCase(n)] = e[n];
                    return u
                }, get: function (r, e) {
                    return void 0 === e ? this.cache(r) : r[this.expando] && r[this.expando][v.camelCase(e)]
                }, access: function (r, e, t) {
                    return void 0 === e || e && "string" == typeof e && void 0 === t ? this.get(r, e) : (this.set(r, e, t), void 0 !== t ? t : e)
                }, remove: function (r, e) {
                    var t, n = r[this.expando];
                    if (void 0 !== n) {
                        if (void 0 !== e) {
                            t = (e = Array.isArray(e) ? e.map(v.camelCase) : (e = v.camelCase(e)) in n ? [e] : e.match(H) || []).length;
                            for (; t--;) delete n[e[t]]
                        }
                        (void 0 === e || v.isEmptyObject(n)) && (r.nodeType ? r[this.expando] = void 0 : delete r[this.expando])
                    }
                }, hasData: function (r) {
                    var e = r[this.expando];
                    return void 0 !== e && !v.isEmptyObject(e)
                }
            };
            var X = new U, K = new U, Y = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, J = /[A-Z]/g;

            function Q(r, e, t) {
                var n;
                if (void 0 === t && 1 === r.nodeType) if (n = "data-" + e.replace(J, "-$&").toLowerCase(), "string" == typeof (t = r.getAttribute(n))) {
                    try {
                        t = function (r) {
                            return "true" === r || "false" !== r && ("null" === r ? null : r === +r + "" ? +r : Y.test(r) ? JSON.parse(r) : r)
                        }(t)
                    } catch (r) {
                    }
                    K.set(r, e, t)
                } else t = void 0;
                return t
            }

            v.extend({
                hasData: function (r) {
                    return K.hasData(r) || X.hasData(r)
                }, data: function (r, e, t) {
                    return K.access(r, e, t)
                }, removeData: function (r, e) {
                    K.remove(r, e)
                }, _data: function (r, e, t) {
                    return X.access(r, e, t)
                }, _removeData: function (r, e) {
                    X.remove(r, e)
                }
            }), v.fn.extend({
                data: function (r, e) {
                    var t, n, u, a = this[0], s = a && a.attributes;
                    if (void 0 === r) {
                        if (this.length && (u = K.get(a), 1 === a.nodeType && !X.get(a, "hasDataAttrs"))) {
                            for (t = s.length; t--;) s[t] && 0 === (n = s[t].name).indexOf("data-") && (n = v.camelCase(n.slice(5)), Q(a, n, u[n]));
                            X.set(a, "hasDataAttrs", !0)
                        }
                        return u
                    }
                    return "object" == typeof r ? this.each(function () {
                        K.set(this, r)
                    }) : V(this, function (e) {
                        var t;
                        if (a && void 0 === e) return void 0 !== (t = K.get(a, r)) ? t : void 0 !== (t = Q(a, r)) ? t : void 0;
                        this.each(function () {
                            K.set(this, r, e)
                        })
                    }, null, e, arguments.length > 1, null, !0)
                }, removeData: function (r) {
                    return this.each(function () {
                        K.remove(this, r)
                    })
                }
            }), v.extend({
                queue: function (r, e, t) {
                    var n;
                    if (r) return e = (e || "fx") + "queue", n = X.get(r, e), t && (!n || Array.isArray(t) ? n = X.access(r, e, v.makeArray(t)) : n.push(t)), n || []
                }, dequeue: function (r, e) {
                    e = e || "fx";
                    var t = v.queue(r, e), n = t.length, u = t.shift(), a = v._queueHooks(r, e);
                    "inprogress" === u && (u = t.shift(), n--), u && ("fx" === e && t.unshift("inprogress"), delete a.stop, u.call(r, function () {
                        v.dequeue(r, e)
                    }, a)), !n && a && a.empty.fire()
                }, _queueHooks: function (r, e) {
                    var t = e + "queueHooks";
                    return X.get(r, t) || X.access(r, t, {
                        empty: v.Callbacks("once memory").add(function () {
                            X.remove(r, [e + "queue", t])
                        })
                    })
                }
            }), v.fn.extend({
                queue: function (r, e) {
                    var t = 2;
                    return "string" != typeof r && (e = r, r = "fx", t--), arguments.length < t ? v.queue(this[0], r) : void 0 === e ? this : this.each(function () {
                        var t = v.queue(this, r, e);
                        v._queueHooks(this, r), "fx" === r && "inprogress" !== t[0] && v.dequeue(this, r)
                    })
                }, dequeue: function (r) {
                    return this.each(function () {
                        v.dequeue(this, r)
                    })
                }, clearQueue: function (r) {
                    return this.queue(r || "fx", [])
                }, promise: function (r, e) {
                    var t, n = 1, u = v.Deferred(), a = this, s = this.length, o = function () {
                        --n || u.resolveWith(a, [a])
                    };
                    for ("string" != typeof r && (e = r, r = void 0), r = r || "fx"; s--;) (t = X.get(a[s], r + "queueHooks")) && t.empty && (n++, t.empty.add(o));
                    return o(), u.promise(e)
                }
            });
            var Z = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                rr = new RegExp("^(?:([+-])=|)(" + Z + ")([a-z%]*)$", "i"), er = ["Top", "Right", "Bottom", "Left"],
                tr = function (r, e) {
                    return "none" === (r = e || r).style.display || "" === r.style.display && v.contains(r.ownerDocument, r) && "none" === v.css(r, "display")
                }, nr = function (r, e, t, n) {
                    var u, a, s = {};
                    for (a in e) s[a] = r.style[a], r.style[a] = e[a];
                    for (a in u = t.apply(r, n || []), e) r.style[a] = s[a];
                    return u
                };

            function ur(r, e, t, n) {
                var u, a = 1, s = 20, o = n ? function () {
                        return n.cur()
                    } : function () {
                        return v.css(r, e, "")
                    }, i = o(), l = t && t[3] || (v.cssNumber[e] ? "" : "px"),
                    c = (v.cssNumber[e] || "px" !== l && +i) && rr.exec(v.css(r, e));
                if (c && c[3] !== l) {
                    l = l || c[3], t = t || [], c = +i || 1;
                    do {
                        c /= a = a || ".5", v.style(r, e, c + l)
                    } while (a !== (a = o() / i) && 1 !== a && --s)
                }
                return t && (c = +c || +i || 0, u = t[1] ? c + (t[1] + 1) * t[2] : +t[2], n && (n.unit = l, n.start = c, n.end = u)), u
            }

            var ar = {};

            function sr(r) {
                var e, t = r.ownerDocument, n = r.nodeName, u = ar[n];
                return u || (e = t.body.appendChild(t.createElement(n)), u = v.css(e, "display"), e.parentNode.removeChild(e), "none" === u && (u = "block"), ar[n] = u, u)
            }

            function or(r, e) {
                for (var t, n, u = [], a = 0, s = r.length; a < s; a++) (n = r[a]).style && (t = n.style.display, e ? ("none" === t && (u[a] = X.get(n, "display") || null, u[a] || (n.style.display = "")), "" === n.style.display && tr(n) && (u[a] = sr(n))) : "none" !== t && (u[a] = "none", X.set(n, "display", t)));
                for (a = 0; a < s; a++) null != u[a] && (r[a].style.display = u[a]);
                return r
            }

            v.fn.extend({
                show: function () {
                    return or(this, !0)
                }, hide: function () {
                    return or(this)
                }, toggle: function (r) {
                    return "boolean" == typeof r ? r ? this.show() : this.hide() : this.each(function () {
                        tr(this) ? v(this).show() : v(this).hide()
                    })
                }
            });
            var ir = /^(?:checkbox|radio)$/i, lr = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i, cr = /^$|\/(?:java|ecma)script/i,
                br = {
                    option: [1, "<select multiple='multiple'>", "</select>"],
                    thead: [1, "<table>", "</table>"],
                    col: [2, "<table><colgroup>", "</colgroup></table>"],
                    tr: [2, "<table><tbody>", "</tbody></table>"],
                    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                    _default: [0, "", ""]
                };

            function fr(r, e) {
                var t;
                return t = void 0 !== r.getElementsByTagName ? r.getElementsByTagName(e || "*") : void 0 !== r.querySelectorAll ? r.querySelectorAll(e || "*") : [], void 0 === e || e && N(r, e) ? v.merge([r], t) : t
            }

            function pr(r, e) {
                for (var t = 0, n = r.length; t < n; t++) X.set(r[t], "globalEval", !e || X.get(e[t], "globalEval"))
            }

            br.optgroup = br.option, br.tbody = br.tfoot = br.colgroup = br.caption = br.thead, br.th = br.td;
            var dr, hr, gr = /<|&#?\w+;/;

            function kr(r, e, t, n, u) {
                for (var a, s, o, i, l, c, b = e.createDocumentFragment(), f = [], p = 0, d = r.length; p < d; p++) if ((a = r[p]) || 0 === a) if ("object" === v.type(a)) v.merge(f, a.nodeType ? [a] : a); else if (gr.test(a)) {
                    for (s = s || b.appendChild(e.createElement("div")), o = (lr.exec(a) || ["", ""])[1].toLowerCase(), i = br[o] || br._default, s.innerHTML = i[1] + v.htmlPrefilter(a) + i[2], c = i[0]; c--;) s = s.lastChild;
                    v.merge(f, s.childNodes), (s = b.firstChild).textContent = ""
                } else f.push(e.createTextNode(a));
                for (b.textContent = "", p = 0; a = f[p++];) if (n && v.inArray(a, n) > -1) u && u.push(a); else if (l = v.contains(a.ownerDocument, a), s = fr(b.appendChild(a), "script"), l && pr(s), t) for (c = 0; a = s[c++];) cr.test(a.type || "") && t.push(a);
                return b
            }

            dr = s.createDocumentFragment().appendChild(s.createElement("div")), (hr = s.createElement("input")).setAttribute("type", "radio"), hr.setAttribute("checked", "checked"), hr.setAttribute("name", "t"), dr.appendChild(hr), k.checkClone = dr.cloneNode(!0).cloneNode(!0).lastChild.checked, dr.innerHTML = "<textarea>x</textarea>", k.noCloneChecked = !!dr.cloneNode(!0).lastChild.defaultValue;
            var mr = s.documentElement, vr = /^key/, yr = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
                xr = /^([^.]*)(?:\.(.+)|)/;

            function wr() {
                return !0
            }

            function Cr() {
                return !1
            }

            function _r() {
                try {
                    return s.activeElement
                } catch (r) {
                }
            }

            function Sr(r, e, t, n, u, a) {
                var s, o;
                if ("object" == typeof e) {
                    for (o in "string" != typeof t && (n = n || t, t = void 0), e) Sr(r, o, t, n, e[o], a);
                    return r
                }
                if (null == n && null == u ? (u = t, n = t = void 0) : null == u && ("string" == typeof t ? (u = n, n = void 0) : (u = n, n = t, t = void 0)), !1 === u) u = Cr; else if (!u) return r;
                return 1 === a && (s = u, (u = function (r) {
                    return v().off(r), s.apply(this, arguments)
                }).guid = s.guid || (s.guid = v.guid++)), r.each(function () {
                    v.event.add(this, e, u, n, t)
                })
            }

            v.event = {
                global: {}, add: function (r, e, t, n, u) {
                    var a, s, o, i, l, c, b, f, p, d, h, g = X.get(r);
                    if (g) for (t.handler && (t = (a = t).handler, u = a.selector), u && v.find.matchesSelector(mr, u), t.guid || (t.guid = v.guid++), (i = g.events) || (i = g.events = {}), (s = g.handle) || (s = g.handle = function (e) {
                        return void 0 !== v && v.event.triggered !== e.type ? v.event.dispatch.apply(r, arguments) : void 0
                    }), l = (e = (e || "").match(H) || [""]).length; l--;) p = h = (o = xr.exec(e[l]) || [])[1], d = (o[2] || "").split(".").sort(), p && (b = v.event.special[p] || {}, p = (u ? b.delegateType : b.bindType) || p, b = v.event.special[p] || {}, c = v.extend({
                        type: p,
                        origType: h,
                        data: n,
                        handler: t,
                        guid: t.guid,
                        selector: u,
                        needsContext: u && v.expr.match.needsContext.test(u),
                        namespace: d.join(".")
                    }, a), (f = i[p]) || ((f = i[p] = []).delegateCount = 0, b.setup && !1 !== b.setup.call(r, n, d, s) || r.addEventListener && r.addEventListener(p, s)), b.add && (b.add.call(r, c), c.handler.guid || (c.handler.guid = t.guid)), u ? f.splice(f.delegateCount++, 0, c) : f.push(c), v.event.global[p] = !0)
                }, remove: function (r, e, t, n, u) {
                    var a, s, o, i, l, c, b, f, p, d, h, g = X.hasData(r) && X.get(r);
                    if (g && (i = g.events)) {
                        for (l = (e = (e || "").match(H) || [""]).length; l--;) if (p = h = (o = xr.exec(e[l]) || [])[1], d = (o[2] || "").split(".").sort(), p) {
                            for (b = v.event.special[p] || {}, f = i[p = (n ? b.delegateType : b.bindType) || p] || [], o = o[2] && new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = a = f.length; a--;) c = f[a], !u && h !== c.origType || t && t.guid !== c.guid || o && !o.test(c.namespace) || n && n !== c.selector && ("**" !== n || !c.selector) || (f.splice(a, 1), c.selector && f.delegateCount--, b.remove && b.remove.call(r, c));
                            s && !f.length && (b.teardown && !1 !== b.teardown.call(r, d, g.handle) || v.removeEvent(r, p, g.handle), delete i[p])
                        } else for (p in i) v.event.remove(r, p + e[l], t, n, !0);
                        v.isEmptyObject(i) && X.remove(r, "handle events")
                    }
                }, dispatch: function (r) {
                    var e, t, n, u, a, s, o = v.event.fix(r), i = new Array(arguments.length),
                        l = (X.get(this, "events") || {})[o.type] || [], c = v.event.special[o.type] || {};
                    for (i[0] = o, e = 1; e < arguments.length; e++) i[e] = arguments[e];
                    if (o.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, o)) {
                        for (s = v.event.handlers.call(this, o, l), e = 0; (u = s[e++]) && !o.isPropagationStopped();) for (o.currentTarget = u.elem, t = 0; (a = u.handlers[t++]) && !o.isImmediatePropagationStopped();) o.rnamespace && !o.rnamespace.test(a.namespace) || (o.handleObj = a, o.data = a.data, void 0 !== (n = ((v.event.special[a.origType] || {}).handle || a.handler).apply(u.elem, i)) && !1 === (o.result = n) && (o.preventDefault(), o.stopPropagation()));
                        return c.postDispatch && c.postDispatch.call(this, o), o.result
                    }
                }, handlers: function (r, e) {
                    var t, n, u, a, s, o = [], i = e.delegateCount, l = r.target;
                    if (i && l.nodeType && !("click" === r.type && r.button >= 1)) for (; l !== this; l = l.parentNode || this) if (1 === l.nodeType && ("click" !== r.type || !0 !== l.disabled)) {
                        for (a = [], s = {}, t = 0; t < i; t++) void 0 === s[u = (n = e[t]).selector + " "] && (s[u] = n.needsContext ? v(u, this).index(l) > -1 : v.find(u, this, null, [l]).length), s[u] && a.push(n);
                        a.length && o.push({elem: l, handlers: a})
                    }
                    return l = this, i < e.length && o.push({elem: l, handlers: e.slice(i)}), o
                }, addProp: function (r, e) {
                    Object.defineProperty(v.Event.prototype, r, {
                        enumerable: !0,
                        configurable: !0,
                        get: v.isFunction(e) ? function () {
                            if (this.originalEvent) return e(this.originalEvent)
                        } : function () {
                            if (this.originalEvent) return this.originalEvent[r]
                        },
                        set: function (e) {
                            Object.defineProperty(this, r, {enumerable: !0, configurable: !0, writable: !0, value: e})
                        }
                    })
                }, fix: function (r) {
                    return r[v.expando] ? r : new v.Event(r)
                }, special: {
                    load: {noBubble: !0}, focus: {
                        trigger: function () {
                            if (this !== _r() && this.focus) return this.focus(), !1
                        }, delegateType: "focusin"
                    }, blur: {
                        trigger: function () {
                            if (this === _r() && this.blur) return this.blur(), !1
                        }, delegateType: "focusout"
                    }, click: {
                        trigger: function () {
                            if ("checkbox" === this.type && this.click && N(this, "input")) return this.click(), !1
                        }, _default: function (r) {
                            return N(r.target, "a")
                        }
                    }, beforeunload: {
                        postDispatch: function (r) {
                            void 0 !== r.result && r.originalEvent && (r.originalEvent.returnValue = r.result)
                        }
                    }
                }
            }, v.removeEvent = function (r, e, t) {
                r.removeEventListener && r.removeEventListener(e, t)
            }, v.Event = function (r, e) {
                if (!(this instanceof v.Event)) return new v.Event(r, e);
                r && r.type ? (this.originalEvent = r, this.type = r.type, this.isDefaultPrevented = r.defaultPrevented || void 0 === r.defaultPrevented && !1 === r.returnValue ? wr : Cr, this.target = r.target && 3 === r.target.nodeType ? r.target.parentNode : r.target, this.currentTarget = r.currentTarget, this.relatedTarget = r.relatedTarget) : this.type = r, e && v.extend(this, e), this.timeStamp = r && r.timeStamp || v.now(), this[v.expando] = !0
            }, v.Event.prototype = {
                constructor: v.Event,
                isDefaultPrevented: Cr,
                isPropagationStopped: Cr,
                isImmediatePropagationStopped: Cr,
                isSimulated: !1,
                preventDefault: function () {
                    var r = this.originalEvent;
                    this.isDefaultPrevented = wr, r && !this.isSimulated && r.preventDefault()
                },
                stopPropagation: function () {
                    var r = this.originalEvent;
                    this.isPropagationStopped = wr, r && !this.isSimulated && r.stopPropagation()
                },
                stopImmediatePropagation: function () {
                    var r = this.originalEvent;
                    this.isImmediatePropagationStopped = wr, r && !this.isSimulated && r.stopImmediatePropagation(), this.stopPropagation()
                }
            }, v.each({
                altKey: !0,
                bubbles: !0,
                cancelable: !0,
                changedTouches: !0,
                ctrlKey: !0,
                detail: !0,
                eventPhase: !0,
                metaKey: !0,
                pageX: !0,
                pageY: !0,
                shiftKey: !0,
                view: !0,
                char: !0,
                charCode: !0,
                key: !0,
                keyCode: !0,
                button: !0,
                buttons: !0,
                clientX: !0,
                clientY: !0,
                offsetX: !0,
                offsetY: !0,
                pointerId: !0,
                pointerType: !0,
                screenX: !0,
                screenY: !0,
                targetTouches: !0,
                toElement: !0,
                touches: !0,
                which: function (r) {
                    var e = r.button;
                    return null == r.which && vr.test(r.type) ? null != r.charCode ? r.charCode : r.keyCode : !r.which && void 0 !== e && yr.test(r.type) ? 1 & e ? 1 : 2 & e ? 3 : 4 & e ? 2 : 0 : r.which
                }
            }, v.event.addProp), v.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, function (r, e) {
                v.event.special[r] = {
                    delegateType: e, bindType: e, handle: function (r) {
                        var t, n = r.relatedTarget, u = r.handleObj;
                        return n && (n === this || v.contains(this, n)) || (r.type = u.origType, t = u.handler.apply(this, arguments), r.type = e), t
                    }
                }
            }), v.fn.extend({
                on: function (r, e, t, n) {
                    return Sr(this, r, e, t, n)
                }, one: function (r, e, t, n) {
                    return Sr(this, r, e, t, n, 1)
                }, off: function (r, e, t) {
                    var n, u;
                    if (r && r.preventDefault && r.handleObj) return n = r.handleObj, v(r.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler), this;
                    if ("object" == typeof r) {
                        for (u in r) this.off(u, e, r[u]);
                        return this
                    }
                    return !1 !== e && "function" != typeof e || (t = e, e = void 0), !1 === t && (t = Cr), this.each(function () {
                        v.event.remove(this, r, t, e)
                    })
                }
            });
            var Tr = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
                Er = /<script|<style|<link/i, Lr = /checked\s*(?:[^=]|=\s*.checked.)/i, Nr = /^true\/(.*)/,
                jr = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

            function zr(r, e) {
                return N(r, "table") && N(11 !== e.nodeType ? e : e.firstChild, "tr") && v(">tbody", r)[0] || r
            }

            function Pr(r) {
                return r.type = (null !== r.getAttribute("type")) + "/" + r.type, r
            }

            function Ar(r) {
                var e = Nr.exec(r.type);
                return e ? r.type = e[1] : r.removeAttribute("type"), r
            }

            function Dr(r, e) {
                var t, n, u, a, s, o, i, l;
                if (1 === e.nodeType) {
                    if (X.hasData(r) && (a = X.access(r), s = X.set(e, a), l = a.events)) for (u in delete s.handle, s.events = {}, l) for (t = 0, n = l[u].length; t < n; t++) v.event.add(e, u, l[u][t]);
                    K.hasData(r) && (o = K.access(r), i = v.extend({}, o), K.set(e, i))
                }
            }

            function Mr(r, e, t, n) {
                e = l.apply([], e);
                var u, a, s, o, i, c, b = 0, f = r.length, p = f - 1, d = e[0], h = v.isFunction(d);
                if (h || f > 1 && "string" == typeof d && !k.checkClone && Lr.test(d)) return r.each(function (u) {
                    var a = r.eq(u);
                    h && (e[0] = d.call(this, u, a.html())), Mr(a, e, t, n)
                });
                if (f && (a = (u = kr(e, r[0].ownerDocument, !1, r, n)).firstChild, 1 === u.childNodes.length && (u = a), a || n)) {
                    for (o = (s = v.map(fr(u, "script"), Pr)).length; b < f; b++) i = u, b !== p && (i = v.clone(i, !0, !0), o && v.merge(s, fr(i, "script"))), t.call(r[b], i, b);
                    if (o) for (c = s[s.length - 1].ownerDocument, v.map(s, Ar), b = 0; b < o; b++) i = s[b], cr.test(i.type || "") && !X.access(i, "globalEval") && v.contains(c, i) && (i.src ? v._evalUrl && v._evalUrl(i.src) : m(i.textContent.replace(jr, ""), c))
                }
                return r
            }

            function Or(r, e, t) {
                for (var n, u = e ? v.filter(e, r) : r, a = 0; null != (n = u[a]); a++) t || 1 !== n.nodeType || v.cleanData(fr(n)), n.parentNode && (t && v.contains(n.ownerDocument, n) && pr(fr(n, "script")), n.parentNode.removeChild(n));
                return r
            }

            v.extend({
                htmlPrefilter: function (r) {
                    return r.replace(Tr, "<$1></$2>")
                }, clone: function (r, e, t) {
                    var n, u, a, s, o, i, l, c = r.cloneNode(!0), b = v.contains(r.ownerDocument, r);
                    if (!(k.noCloneChecked || 1 !== r.nodeType && 11 !== r.nodeType || v.isXMLDoc(r))) for (s = fr(c), n = 0, u = (a = fr(r)).length; n < u; n++) o = a[n], i = s[n], void 0, "input" === (l = i.nodeName.toLowerCase()) && ir.test(o.type) ? i.checked = o.checked : "input" !== l && "textarea" !== l || (i.defaultValue = o.defaultValue);
                    if (e) if (t) for (a = a || fr(r), s = s || fr(c), n = 0, u = a.length; n < u; n++) Dr(a[n], s[n]); else Dr(r, c);
                    return (s = fr(c, "script")).length > 0 && pr(s, !b && fr(r, "script")), c
                }, cleanData: function (r) {
                    for (var e, t, n, u = v.event.special, a = 0; void 0 !== (t = r[a]); a++) if (G(t)) {
                        if (e = t[X.expando]) {
                            if (e.events) for (n in e.events) u[n] ? v.event.remove(t, n) : v.removeEvent(t, n, e.handle);
                            t[X.expando] = void 0
                        }
                        t[K.expando] && (t[K.expando] = void 0)
                    }
                }
            }), v.fn.extend({
                detach: function (r) {
                    return Or(this, r, !0)
                }, remove: function (r) {
                    return Or(this, r)
                }, text: function (r) {
                    return V(this, function (r) {
                        return void 0 === r ? v.text(this) : this.empty().each(function () {
                            1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = r)
                        })
                    }, null, r, arguments.length)
                }, append: function () {
                    return Mr(this, arguments, function (r) {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || zr(this, r).appendChild(r)
                    })
                }, prepend: function () {
                    return Mr(this, arguments, function (r) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var e = zr(this, r);
                            e.insertBefore(r, e.firstChild)
                        }
                    })
                }, before: function () {
                    return Mr(this, arguments, function (r) {
                        this.parentNode && this.parentNode.insertBefore(r, this)
                    })
                }, after: function () {
                    return Mr(this, arguments, function (r) {
                        this.parentNode && this.parentNode.insertBefore(r, this.nextSibling)
                    })
                }, empty: function () {
                    for (var r, e = 0; null != (r = this[e]); e++) 1 === r.nodeType && (v.cleanData(fr(r, !1)), r.textContent = "");
                    return this
                }, clone: function (r, e) {
                    return r = null != r && r, e = null == e ? r : e, this.map(function () {
                        return v.clone(this, r, e)
                    })
                }, html: function (r) {
                    return V(this, function (r) {
                        var e = this[0] || {}, t = 0, n = this.length;
                        if (void 0 === r && 1 === e.nodeType) return e.innerHTML;
                        if ("string" == typeof r && !Er.test(r) && !br[(lr.exec(r) || ["", ""])[1].toLowerCase()]) {
                            r = v.htmlPrefilter(r);
                            try {
                                for (; t < n; t++) 1 === (e = this[t] || {}).nodeType && (v.cleanData(fr(e, !1)), e.innerHTML = r);
                                e = 0
                            } catch (r) {
                            }
                        }
                        e && this.empty().append(r)
                    }, null, r, arguments.length)
                }, replaceWith: function () {
                    var r = [];
                    return Mr(this, arguments, function (e) {
                        var t = this.parentNode;
                        v.inArray(this, r) < 0 && (v.cleanData(fr(this)), t && t.replaceChild(e, this))
                    }, r)
                }
            }), v.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function (r, e) {
                v.fn[r] = function (r) {
                    for (var t, n = [], u = v(r), a = u.length - 1, s = 0; s <= a; s++) t = s === a ? this : this.clone(!0), v(u[s])[e](t), c.apply(n, t.get());
                    return this.pushStack(n)
                }
            });
            var qr = /^margin/, Hr = new RegExp("^(" + Z + ")(?!px)[a-z%]+$", "i"), Br = function (r) {
                var e = r.ownerDocument.defaultView;
                return e && e.opener || (e = t), e.getComputedStyle(r)
            };

            function Rr(r, e, t) {
                var n, u, a, s, o = r.style;
                return (t = t || Br(r)) && ("" !== (s = t.getPropertyValue(e) || t[e]) || v.contains(r.ownerDocument, r) || (s = v.style(r, e)), !k.pixelMarginRight() && Hr.test(s) && qr.test(e) && (n = o.width, u = o.minWidth, a = o.maxWidth, o.minWidth = o.maxWidth = o.width = s, s = t.width, o.width = n, o.minWidth = u, o.maxWidth = a)), void 0 !== s ? s + "" : s
            }

            function Ir(r, e) {
                return {
                    get: function () {
                        if (!r()) return (this.get = e).apply(this, arguments);
                        delete this.get
                    }
                }
            }

            !function () {
                function r() {
                    if (i) {
                        i.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", i.innerHTML = "", mr.appendChild(o);
                        var r = t.getComputedStyle(i);
                        e = "1%" !== r.top, a = "2px" === r.marginLeft, n = "4px" === r.width, i.style.marginRight = "50%", u = "4px" === r.marginRight, mr.removeChild(o), i = null
                    }
                }

                var e, n, u, a, o = s.createElement("div"), i = s.createElement("div");
                i.style && (i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", k.clearCloneStyle = "content-box" === i.style.backgroundClip, o.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", o.appendChild(i), v.extend(k, {
                    pixelPosition: function () {
                        return r(), e
                    }, boxSizingReliable: function () {
                        return r(), n
                    }, pixelMarginRight: function () {
                        return r(), u
                    }, reliableMarginLeft: function () {
                        return r(), a
                    }
                }))
            }();
            var Fr = /^(none|table(?!-c[ea]).+)/, Wr = /^--/,
                $r = {position: "absolute", visibility: "hidden", display: "block"},
                Vr = {letterSpacing: "0", fontWeight: "400"}, Gr = ["Webkit", "Moz", "ms"],
                Ur = s.createElement("div").style;

            function Xr(r) {
                var e = v.cssProps[r];
                return e || (e = v.cssProps[r] = function (r) {
                    if (r in Ur) return r;
                    for (var e = r[0].toUpperCase() + r.slice(1), t = Gr.length; t--;) if ((r = Gr[t] + e) in Ur) return r
                }(r) || r), e
            }

            function Kr(r, e, t) {
                var n = rr.exec(e);
                return n ? Math.max(0, n[2] - (t || 0)) + (n[3] || "px") : e
            }

            function Yr(r, e, t, n, u) {
                var a, s = 0;
                for (a = t === (n ? "border" : "content") ? 4 : "width" === e ? 1 : 0; a < 4; a += 2) "margin" === t && (s += v.css(r, t + er[a], !0, u)), n ? ("content" === t && (s -= v.css(r, "padding" + er[a], !0, u)), "margin" !== t && (s -= v.css(r, "border" + er[a] + "Width", !0, u))) : (s += v.css(r, "padding" + er[a], !0, u), "padding" !== t && (s += v.css(r, "border" + er[a] + "Width", !0, u)));
                return s
            }

            function Jr(r, e, t) {
                var n, u = Br(r), a = Rr(r, e, u), s = "border-box" === v.css(r, "boxSizing", !1, u);
                return Hr.test(a) ? a : (n = s && (k.boxSizingReliable() || a === r.style[e]), "auto" === a && (a = r["offset" + e[0].toUpperCase() + e.slice(1)]), (a = parseFloat(a) || 0) + Yr(r, e, t || (s ? "border" : "content"), n, u) + "px")
            }

            function Qr(r, e, t, n, u) {
                return new Qr.prototype.init(r, e, t, n, u)
            }

            v.extend({
                cssHooks: {
                    opacity: {
                        get: function (r, e) {
                            if (e) {
                                var t = Rr(r, "opacity");
                                return "" === t ? "1" : t
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
                style: function (r, e, t, n) {
                    if (r && 3 !== r.nodeType && 8 !== r.nodeType && r.style) {
                        var u, a, s, o = v.camelCase(e), i = Wr.test(e), l = r.style;
                        if (i || (e = Xr(o)), s = v.cssHooks[e] || v.cssHooks[o], void 0 === t) return s && "get" in s && void 0 !== (u = s.get(r, !1, n)) ? u : l[e];
                        "string" === (a = typeof t) && (u = rr.exec(t)) && u[1] && (t = ur(r, e, u), a = "number"), null != t && t == t && ("number" === a && (t += u && u[3] || (v.cssNumber[o] ? "" : "px")), k.clearCloneStyle || "" !== t || 0 !== e.indexOf("background") || (l[e] = "inherit"), s && "set" in s && void 0 === (t = s.set(r, t, n)) || (i ? l.setProperty(e, t) : l[e] = t))
                    }
                },
                css: function (r, e, t, n) {
                    var u, a, s, o = v.camelCase(e);
                    return Wr.test(e) || (e = Xr(o)), (s = v.cssHooks[e] || v.cssHooks[o]) && "get" in s && (u = s.get(r, !0, t)), void 0 === u && (u = Rr(r, e, n)), "normal" === u && e in Vr && (u = Vr[e]), "" === t || t ? (a = parseFloat(u), !0 === t || isFinite(a) ? a || 0 : u) : u
                }
            }), v.each(["height", "width"], function (r, e) {
                v.cssHooks[e] = {
                    get: function (r, t, n) {
                        if (t) return !Fr.test(v.css(r, "display")) || r.getClientRects().length && r.getBoundingClientRect().width ? Jr(r, e, n) : nr(r, $r, function () {
                            return Jr(r, e, n)
                        })
                    }, set: function (r, t, n) {
                        var u, a = n && Br(r), s = n && Yr(r, e, n, "border-box" === v.css(r, "boxSizing", !1, a), a);
                        return s && (u = rr.exec(t)) && "px" !== (u[3] || "px") && (r.style[e] = t, t = v.css(r, e)), Kr(0, t, s)
                    }
                }
            }), v.cssHooks.marginLeft = Ir(k.reliableMarginLeft, function (r, e) {
                if (e) return (parseFloat(Rr(r, "marginLeft")) || r.getBoundingClientRect().left - nr(r, {marginLeft: 0}, function () {
                    return r.getBoundingClientRect().left
                })) + "px"
            }), v.each({margin: "", padding: "", border: "Width"}, function (r, e) {
                v.cssHooks[r + e] = {
                    expand: function (t) {
                        for (var n = 0, u = {}, a = "string" == typeof t ? t.split(" ") : [t]; n < 4; n++) u[r + er[n] + e] = a[n] || a[n - 2] || a[0];
                        return u
                    }
                }, qr.test(r) || (v.cssHooks[r + e].set = Kr)
            }), v.fn.extend({
                css: function (r, e) {
                    return V(this, function (r, e, t) {
                        var n, u, a = {}, s = 0;
                        if (Array.isArray(e)) {
                            for (n = Br(r), u = e.length; s < u; s++) a[e[s]] = v.css(r, e[s], !1, n);
                            return a
                        }
                        return void 0 !== t ? v.style(r, e, t) : v.css(r, e)
                    }, r, e, arguments.length > 1)
                }
            }), v.Tween = Qr, Qr.prototype = {
                constructor: Qr, init: function (r, e, t, n, u, a) {
                    this.elem = r, this.prop = t, this.easing = u || v.easing._default, this.options = e, this.start = this.now = this.cur(), this.end = n, this.unit = a || (v.cssNumber[t] ? "" : "px")
                }, cur: function () {
                    var r = Qr.propHooks[this.prop];
                    return r && r.get ? r.get(this) : Qr.propHooks._default.get(this)
                }, run: function (r) {
                    var e, t = Qr.propHooks[this.prop];
                    return this.options.duration ? this.pos = e = v.easing[this.easing](r, this.options.duration * r, 0, 1, this.options.duration) : this.pos = e = r, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), t && t.set ? t.set(this) : Qr.propHooks._default.set(this), this
                }
            }, Qr.prototype.init.prototype = Qr.prototype, Qr.propHooks = {
                _default: {
                    get: function (r) {
                        var e;
                        return 1 !== r.elem.nodeType || null != r.elem[r.prop] && null == r.elem.style[r.prop] ? r.elem[r.prop] : (e = v.css(r.elem, r.prop, "")) && "auto" !== e ? e : 0
                    }, set: function (r) {
                        v.fx.step[r.prop] ? v.fx.step[r.prop](r) : 1 !== r.elem.nodeType || null == r.elem.style[v.cssProps[r.prop]] && !v.cssHooks[r.prop] ? r.elem[r.prop] = r.now : v.style(r.elem, r.prop, r.now + r.unit)
                    }
                }
            }, Qr.propHooks.scrollTop = Qr.propHooks.scrollLeft = {
                set: function (r) {
                    r.elem.nodeType && r.elem.parentNode && (r.elem[r.prop] = r.now)
                }
            }, v.easing = {
                linear: function (r) {
                    return r
                }, swing: function (r) {
                    return .5 - Math.cos(r * Math.PI) / 2
                }, _default: "swing"
            }, v.fx = Qr.prototype.init, v.fx.step = {};
            var Zr, re, ee = /^(?:toggle|show|hide)$/, te = /queueHooks$/;

            function ne() {
                re && (!1 === s.hidden && t.requestAnimationFrame ? t.requestAnimationFrame(ne) : t.setTimeout(ne, v.fx.interval), v.fx.tick())
            }

            function ue() {
                return t.setTimeout(function () {
                    Zr = void 0
                }), Zr = v.now()
            }

            function ae(r, e) {
                var t, n = 0, u = {height: r};
                for (e = e ? 1 : 0; n < 4; n += 2 - e) u["margin" + (t = er[n])] = u["padding" + t] = r;
                return e && (u.opacity = u.width = r), u
            }

            function se(r, e, t) {
                for (var n, u = (oe.tweeners[e] || []).concat(oe.tweeners["*"]), a = 0, s = u.length; a < s; a++) if (n = u[a].call(t, e, r)) return n
            }

            function oe(r, e, t) {
                var n, u, a = 0, s = oe.prefilters.length, o = v.Deferred().always(function () {
                    delete i.elem
                }), i = function () {
                    if (u) return !1;
                    for (var e = Zr || ue(), t = Math.max(0, l.startTime + l.duration - e), n = 1 - (t / l.duration || 0), a = 0, s = l.tweens.length; a < s; a++) l.tweens[a].run(n);
                    return o.notifyWith(r, [l, n, t]), n < 1 && s ? t : (s || o.notifyWith(r, [l, 1, 0]), o.resolveWith(r, [l]), !1)
                }, l = o.promise({
                    elem: r,
                    props: v.extend({}, e),
                    opts: v.extend(!0, {specialEasing: {}, easing: v.easing._default}, t),
                    originalProperties: e,
                    originalOptions: t,
                    startTime: Zr || ue(),
                    duration: t.duration,
                    tweens: [],
                    createTween: function (e, t) {
                        var n = v.Tween(r, l.opts, e, t, l.opts.specialEasing[e] || l.opts.easing);
                        return l.tweens.push(n), n
                    },
                    stop: function (e) {
                        var t = 0, n = e ? l.tweens.length : 0;
                        if (u) return this;
                        for (u = !0; t < n; t++) l.tweens[t].run(1);
                        return e ? (o.notifyWith(r, [l, 1, 0]), o.resolveWith(r, [l, e])) : o.rejectWith(r, [l, e]), this
                    }
                }), c = l.props;
                for (!function (r, e) {
                    var t, n, u, a, s;
                    for (t in r) if (u = e[n = v.camelCase(t)], a = r[t], Array.isArray(a) && (u = a[1], a = r[t] = a[0]), t !== n && (r[n] = a, delete r[t]), (s = v.cssHooks[n]) && "expand" in s) for (t in a = s.expand(a), delete r[n], a) t in r || (r[t] = a[t], e[t] = u); else e[n] = u
                }(c, l.opts.specialEasing); a < s; a++) if (n = oe.prefilters[a].call(l, r, c, l.opts)) return v.isFunction(n.stop) && (v._queueHooks(l.elem, l.opts.queue).stop = v.proxy(n.stop, n)), n;
                return v.map(c, se, l), v.isFunction(l.opts.start) && l.opts.start.call(r, l), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), v.fx.timer(v.extend(i, {
                    elem: r,
                    anim: l,
                    queue: l.opts.queue
                })), l
            }

            v.Animation = v.extend(oe, {
                tweeners: {
                    "*": [function (r, e) {
                        var t = this.createTween(r, e);
                        return ur(t.elem, r, rr.exec(e), t), t
                    }]
                }, tweener: function (r, e) {
                    v.isFunction(r) ? (e = r, r = ["*"]) : r = r.match(H);
                    for (var t, n = 0, u = r.length; n < u; n++) t = r[n], oe.tweeners[t] = oe.tweeners[t] || [], oe.tweeners[t].unshift(e)
                }, prefilters: [function (r, e, t) {
                    var n, u, a, s, o, i, l, c, b = "width" in e || "height" in e, f = this, p = {}, d = r.style,
                        h = r.nodeType && tr(r), g = X.get(r, "fxshow");
                    for (n in t.queue || (null == (s = v._queueHooks(r, "fx")).unqueued && (s.unqueued = 0, o = s.empty.fire, s.empty.fire = function () {
                        s.unqueued || o()
                    }), s.unqueued++, f.always(function () {
                        f.always(function () {
                            s.unqueued--, v.queue(r, "fx").length || s.empty.fire()
                        })
                    })), e) if (u = e[n], ee.test(u)) {
                        if (delete e[n], a = a || "toggle" === u, u === (h ? "hide" : "show")) {
                            if ("show" !== u || !g || void 0 === g[n]) continue;
                            h = !0
                        }
                        p[n] = g && g[n] || v.style(r, n)
                    }
                    if ((i = !v.isEmptyObject(e)) || !v.isEmptyObject(p)) for (n in b && 1 === r.nodeType && (t.overflow = [d.overflow, d.overflowX, d.overflowY], null == (l = g && g.display) && (l = X.get(r, "display")), "none" === (c = v.css(r, "display")) && (l ? c = l : (or([r], !0), l = r.style.display || l, c = v.css(r, "display"), or([r]))), ("inline" === c || "inline-block" === c && null != l) && "none" === v.css(r, "float") && (i || (f.done(function () {
                        d.display = l
                    }), null == l && (c = d.display, l = "none" === c ? "" : c)), d.display = "inline-block")), t.overflow && (d.overflow = "hidden", f.always(function () {
                        d.overflow = t.overflow[0], d.overflowX = t.overflow[1], d.overflowY = t.overflow[2]
                    })), i = !1, p) i || (g ? "hidden" in g && (h = g.hidden) : g = X.access(r, "fxshow", {display: l}), a && (g.hidden = !h), h && or([r], !0), f.done(function () {
                        for (n in h || or([r]), X.remove(r, "fxshow"), p) v.style(r, n, p[n])
                    })), i = se(h ? g[n] : 0, n, f), n in g || (g[n] = i.start, h && (i.end = i.start, i.start = 0))
                }], prefilter: function (r, e) {
                    e ? oe.prefilters.unshift(r) : oe.prefilters.push(r)
                }
            }), v.speed = function (r, e, t) {
                var n = r && "object" == typeof r ? v.extend({}, r) : {
                    complete: t || !t && e || v.isFunction(r) && r,
                    duration: r,
                    easing: t && e || e && !v.isFunction(e) && e
                };
                return v.fx.off ? n.duration = 0 : "number" != typeof n.duration && (n.duration in v.fx.speeds ? n.duration = v.fx.speeds[n.duration] : n.duration = v.fx.speeds._default), null != n.queue && !0 !== n.queue || (n.queue = "fx"), n.old = n.complete, n.complete = function () {
                    v.isFunction(n.old) && n.old.call(this), n.queue && v.dequeue(this, n.queue)
                }, n
            }, v.fn.extend({
                fadeTo: function (r, e, t, n) {
                    return this.filter(tr).css("opacity", 0).show().end().animate({opacity: e}, r, t, n)
                }, animate: function (r, e, t, n) {
                    var u = v.isEmptyObject(r), a = v.speed(e, t, n), s = function () {
                        var e = oe(this, v.extend({}, r), a);
                        (u || X.get(this, "finish")) && e.stop(!0)
                    };
                    return s.finish = s, u || !1 === a.queue ? this.each(s) : this.queue(a.queue, s)
                }, stop: function (r, e, t) {
                    var n = function (r) {
                        var e = r.stop;
                        delete r.stop, e(t)
                    };
                    return "string" != typeof r && (t = e, e = r, r = void 0), e && !1 !== r && this.queue(r || "fx", []), this.each(function () {
                        var e = !0, u = null != r && r + "queueHooks", a = v.timers, s = X.get(this);
                        if (u) s[u] && s[u].stop && n(s[u]); else for (u in s) s[u] && s[u].stop && te.test(u) && n(s[u]);
                        for (u = a.length; u--;) a[u].elem !== this || null != r && a[u].queue !== r || (a[u].anim.stop(t), e = !1, a.splice(u, 1));
                        !e && t || v.dequeue(this, r)
                    })
                }, finish: function (r) {
                    return !1 !== r && (r = r || "fx"), this.each(function () {
                        var e, t = X.get(this), n = t[r + "queue"], u = t[r + "queueHooks"], a = v.timers,
                            s = n ? n.length : 0;
                        for (t.finish = !0, v.queue(this, r, []), u && u.stop && u.stop.call(this, !0), e = a.length; e--;) a[e].elem === this && a[e].queue === r && (a[e].anim.stop(!0), a.splice(e, 1));
                        for (e = 0; e < s; e++) n[e] && n[e].finish && n[e].finish.call(this);
                        delete t.finish
                    })
                }
            }), v.each(["toggle", "show", "hide"], function (r, e) {
                var t = v.fn[e];
                v.fn[e] = function (r, n, u) {
                    return null == r || "boolean" == typeof r ? t.apply(this, arguments) : this.animate(ae(e, !0), r, n, u)
                }
            }), v.each({
                slideDown: ae("show"),
                slideUp: ae("hide"),
                slideToggle: ae("toggle"),
                fadeIn: {opacity: "show"},
                fadeOut: {opacity: "hide"},
                fadeToggle: {opacity: "toggle"}
            }, function (r, e) {
                v.fn[r] = function (r, t, n) {
                    return this.animate(e, r, t, n)
                }
            }), v.timers = [], v.fx.tick = function () {
                var r, e = 0, t = v.timers;
                for (Zr = v.now(); e < t.length; e++) (r = t[e])() || t[e] !== r || t.splice(e--, 1);
                t.length || v.fx.stop(), Zr = void 0
            }, v.fx.timer = function (r) {
                v.timers.push(r), v.fx.start()
            }, v.fx.interval = 13, v.fx.start = function () {
                re || (re = !0, ne())
            }, v.fx.stop = function () {
                re = null
            }, v.fx.speeds = {slow: 600, fast: 200, _default: 400}, v.fn.delay = function (r, e) {
                return r = v.fx && v.fx.speeds[r] || r, e = e || "fx", this.queue(e, function (e, n) {
                    var u = t.setTimeout(e, r);
                    n.stop = function () {
                        t.clearTimeout(u)
                    }
                })
            }, function () {
                var r = s.createElement("input"), e = s.createElement("select").appendChild(s.createElement("option"));
                r.type = "checkbox", k.checkOn = "" !== r.value, k.optSelected = e.selected, (r = s.createElement("input")).value = "t", r.type = "radio", k.radioValue = "t" === r.value
            }();
            var ie, le = v.expr.attrHandle;
            v.fn.extend({
                attr: function (r, e) {
                    return V(this, v.attr, r, e, arguments.length > 1)
                }, removeAttr: function (r) {
                    return this.each(function () {
                        v.removeAttr(this, r)
                    })
                }
            }), v.extend({
                attr: function (r, e, t) {
                    var n, u, a = r.nodeType;
                    if (3 !== a && 8 !== a && 2 !== a) return void 0 === r.getAttribute ? v.prop(r, e, t) : (1 === a && v.isXMLDoc(r) || (u = v.attrHooks[e.toLowerCase()] || (v.expr.match.bool.test(e) ? ie : void 0)), void 0 !== t ? null === t ? void v.removeAttr(r, e) : u && "set" in u && void 0 !== (n = u.set(r, t, e)) ? n : (r.setAttribute(e, t + ""), t) : u && "get" in u && null !== (n = u.get(r, e)) ? n : null == (n = v.find.attr(r, e)) ? void 0 : n)
                }, attrHooks: {
                    type: {
                        set: function (r, e) {
                            if (!k.radioValue && "radio" === e && N(r, "input")) {
                                var t = r.value;
                                return r.setAttribute("type", e), t && (r.value = t), e
                            }
                        }
                    }
                }, removeAttr: function (r, e) {
                    var t, n = 0, u = e && e.match(H);
                    if (u && 1 === r.nodeType) for (; t = u[n++];) r.removeAttribute(t)
                }
            }), ie = {
                set: function (r, e, t) {
                    return !1 === e ? v.removeAttr(r, t) : r.setAttribute(t, t), t
                }
            }, v.each(v.expr.match.bool.source.match(/\w+/g), function (r, e) {
                var t = le[e] || v.find.attr;
                le[e] = function (r, e, n) {
                    var u, a, s = e.toLowerCase();
                    return n || (a = le[s], le[s] = u, u = null != t(r, e, n) ? s : null, le[s] = a), u
                }
            });
            var ce = /^(?:input|select|textarea|button)$/i, be = /^(?:a|area)$/i;

            function fe(r) {
                return (r.match(H) || []).join(" ")
            }

            function pe(r) {
                return r.getAttribute && r.getAttribute("class") || ""
            }

            v.fn.extend({
                prop: function (r, e) {
                    return V(this, v.prop, r, e, arguments.length > 1)
                }, removeProp: function (r) {
                    return this.each(function () {
                        delete this[v.propFix[r] || r]
                    })
                }
            }), v.extend({
                prop: function (r, e, t) {
                    var n, u, a = r.nodeType;
                    if (3 !== a && 8 !== a && 2 !== a) return 1 === a && v.isXMLDoc(r) || (e = v.propFix[e] || e, u = v.propHooks[e]), void 0 !== t ? u && "set" in u && void 0 !== (n = u.set(r, t, e)) ? n : r[e] = t : u && "get" in u && null !== (n = u.get(r, e)) ? n : r[e]
                }, propHooks: {
                    tabIndex: {
                        get: function (r) {
                            var e = v.find.attr(r, "tabindex");
                            return e ? parseInt(e, 10) : ce.test(r.nodeName) || be.test(r.nodeName) && r.href ? 0 : -1
                        }
                    }
                }, propFix: {for: "htmlFor", class: "className"}
            }), k.optSelected || (v.propHooks.selected = {
                get: function (r) {
                    var e = r.parentNode;
                    return e && e.parentNode && e.parentNode.selectedIndex, null
                }, set: function (r) {
                    var e = r.parentNode;
                    e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex)
                }
            }), v.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
                v.propFix[this.toLowerCase()] = this
            }), v.fn.extend({
                addClass: function (r) {
                    var e, t, n, u, a, s, o, i = 0;
                    if (v.isFunction(r)) return this.each(function (e) {
                        v(this).addClass(r.call(this, e, pe(this)))
                    });
                    if ("string" == typeof r && r) for (e = r.match(H) || []; t = this[i++];) if (u = pe(t), n = 1 === t.nodeType && " " + fe(u) + " ") {
                        for (s = 0; a = e[s++];) n.indexOf(" " + a + " ") < 0 && (n += a + " ");
                        u !== (o = fe(n)) && t.setAttribute("class", o)
                    }
                    return this
                }, removeClass: function (r) {
                    var e, t, n, u, a, s, o, i = 0;
                    if (v.isFunction(r)) return this.each(function (e) {
                        v(this).removeClass(r.call(this, e, pe(this)))
                    });
                    if (!arguments.length) return this.attr("class", "");
                    if ("string" == typeof r && r) for (e = r.match(H) || []; t = this[i++];) if (u = pe(t), n = 1 === t.nodeType && " " + fe(u) + " ") {
                        for (s = 0; a = e[s++];) for (; n.indexOf(" " + a + " ") > -1;) n = n.replace(" " + a + " ", " ");
                        u !== (o = fe(n)) && t.setAttribute("class", o)
                    }
                    return this
                }, toggleClass: function (r, e) {
                    var t = typeof r;
                    return "boolean" == typeof e && "string" === t ? e ? this.addClass(r) : this.removeClass(r) : v.isFunction(r) ? this.each(function (t) {
                        v(this).toggleClass(r.call(this, t, pe(this), e), e)
                    }) : this.each(function () {
                        var e, n, u, a;
                        if ("string" === t) for (n = 0, u = v(this), a = r.match(H) || []; e = a[n++];) u.hasClass(e) ? u.removeClass(e) : u.addClass(e); else void 0 !== r && "boolean" !== t || ((e = pe(this)) && X.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || !1 === r ? "" : X.get(this, "__className__") || ""))
                    })
                }, hasClass: function (r) {
                    var e, t, n = 0;
                    for (e = " " + r + " "; t = this[n++];) if (1 === t.nodeType && (" " + fe(pe(t)) + " ").indexOf(e) > -1) return !0;
                    return !1
                }
            });
            var de = /\r/g;
            v.fn.extend({
                val: function (r) {
                    var e, t, n, u = this[0];
                    return arguments.length ? (n = v.isFunction(r), this.each(function (t) {
                        var u;
                        1 === this.nodeType && (null == (u = n ? r.call(this, t, v(this).val()) : r) ? u = "" : "number" == typeof u ? u += "" : Array.isArray(u) && (u = v.map(u, function (r) {
                            return null == r ? "" : r + ""
                        })), (e = v.valHooks[this.type] || v.valHooks[this.nodeName.toLowerCase()]) && "set" in e && void 0 !== e.set(this, u, "value") || (this.value = u))
                    })) : u ? (e = v.valHooks[u.type] || v.valHooks[u.nodeName.toLowerCase()]) && "get" in e && void 0 !== (t = e.get(u, "value")) ? t : "string" == typeof (t = u.value) ? t.replace(de, "") : null == t ? "" : t : void 0
                }
            }), v.extend({
                valHooks: {
                    option: {
                        get: function (r) {
                            var e = v.find.attr(r, "value");
                            return null != e ? e : fe(v.text(r))
                        }
                    }, select: {
                        get: function (r) {
                            var e, t, n, u = r.options, a = r.selectedIndex, s = "select-one" === r.type,
                                o = s ? null : [], i = s ? a + 1 : u.length;
                            for (n = a < 0 ? i : s ? a : 0; n < i; n++) if (((t = u[n]).selected || n === a) && !t.disabled && (!t.parentNode.disabled || !N(t.parentNode, "optgroup"))) {
                                if (e = v(t).val(), s) return e;
                                o.push(e)
                            }
                            return o
                        }, set: function (r, e) {
                            for (var t, n, u = r.options, a = v.makeArray(e), s = u.length; s--;) ((n = u[s]).selected = v.inArray(v.valHooks.option.get(n), a) > -1) && (t = !0);
                            return t || (r.selectedIndex = -1), a
                        }
                    }
                }
            }), v.each(["radio", "checkbox"], function () {
                v.valHooks[this] = {
                    set: function (r, e) {
                        if (Array.isArray(e)) return r.checked = v.inArray(v(r).val(), e) > -1
                    }
                }, k.checkOn || (v.valHooks[this].get = function (r) {
                    return null === r.getAttribute("value") ? "on" : r.value
                })
            });
            var he = /^(?:focusinfocus|focusoutblur)$/;
            v.extend(v.event, {
                trigger: function (r, e, n, u) {
                    var a, o, i, l, c, b, f, p = [n || s], h = d.call(r, "type") ? r.type : r,
                        g = d.call(r, "namespace") ? r.namespace.split(".") : [];
                    if (o = i = n = n || s, 3 !== n.nodeType && 8 !== n.nodeType && !he.test(h + v.event.triggered) && (h.indexOf(".") > -1 && (h = (g = h.split(".")).shift(), g.sort()), c = h.indexOf(":") < 0 && "on" + h, (r = r[v.expando] ? r : new v.Event(h, "object" == typeof r && r)).isTrigger = u ? 2 : 3, r.namespace = g.join("."), r.rnamespace = r.namespace ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, r.result = void 0, r.target || (r.target = n), e = null == e ? [r] : v.makeArray(e, [r]), f = v.event.special[h] || {}, u || !f.trigger || !1 !== f.trigger.apply(n, e))) {
                        if (!u && !f.noBubble && !v.isWindow(n)) {
                            for (l = f.delegateType || h, he.test(l + h) || (o = o.parentNode); o; o = o.parentNode) p.push(o), i = o;
                            i === (n.ownerDocument || s) && p.push(i.defaultView || i.parentWindow || t)
                        }
                        for (a = 0; (o = p[a++]) && !r.isPropagationStopped();) r.type = a > 1 ? l : f.bindType || h, (b = (X.get(o, "events") || {})[r.type] && X.get(o, "handle")) && b.apply(o, e), (b = c && o[c]) && b.apply && G(o) && (r.result = b.apply(o, e), !1 === r.result && r.preventDefault());
                        return r.type = h, u || r.isDefaultPrevented() || f._default && !1 !== f._default.apply(p.pop(), e) || !G(n) || c && v.isFunction(n[h]) && !v.isWindow(n) && ((i = n[c]) && (n[c] = null), v.event.triggered = h, n[h](), v.event.triggered = void 0, i && (n[c] = i)), r.result
                    }
                }, simulate: function (r, e, t) {
                    var n = v.extend(new v.Event, t, {type: r, isSimulated: !0});
                    v.event.trigger(n, null, e)
                }
            }), v.fn.extend({
                trigger: function (r, e) {
                    return this.each(function () {
                        v.event.trigger(r, e, this)
                    })
                }, triggerHandler: function (r, e) {
                    var t = this[0];
                    if (t) return v.event.trigger(r, e, t, !0)
                }
            }), v.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (r, e) {
                v.fn[e] = function (r, t) {
                    return arguments.length > 0 ? this.on(e, null, r, t) : this.trigger(e)
                }
            }), v.fn.extend({
                hover: function (r, e) {
                    return this.mouseenter(r).mouseleave(e || r)
                }
            }), k.focusin = "onfocusin" in t, k.focusin || v.each({
                focus: "focusin",
                blur: "focusout"
            }, function (r, e) {
                var t = function (r) {
                    v.event.simulate(e, r.target, v.event.fix(r))
                };
                v.event.special[e] = {
                    setup: function () {
                        var n = this.ownerDocument || this, u = X.access(n, e);
                        u || n.addEventListener(r, t, !0), X.access(n, e, (u || 0) + 1)
                    }, teardown: function () {
                        var n = this.ownerDocument || this, u = X.access(n, e) - 1;
                        u ? X.access(n, e, u) : (n.removeEventListener(r, t, !0), X.remove(n, e))
                    }
                }
            });
            var ge = t.location, ke = v.now(), me = /\?/;
            v.parseXML = function (r) {
                var e;
                if (!r || "string" != typeof r) return null;
                try {
                    e = (new t.DOMParser).parseFromString(r, "text/xml")
                } catch (r) {
                    e = void 0
                }
                return e && !e.getElementsByTagName("parsererror").length || v.error("Invalid XML: " + r), e
            };
            var ve = /\[\]$/, ye = /\r?\n/g, xe = /^(?:submit|button|image|reset|file)$/i,
                we = /^(?:input|select|textarea|keygen)/i;

            function Ce(r, e, t, n) {
                var u;
                if (Array.isArray(e)) v.each(e, function (e, u) {
                    t || ve.test(r) ? n(r, u) : Ce(r + "[" + ("object" == typeof u && null != u ? e : "") + "]", u, t, n)
                }); else if (t || "object" !== v.type(e)) n(r, e); else for (u in e) Ce(r + "[" + u + "]", e[u], t, n)
            }

            v.param = function (r, e) {
                var t, n = [], u = function (r, e) {
                    var t = v.isFunction(e) ? e() : e;
                    n[n.length] = encodeURIComponent(r) + "=" + encodeURIComponent(null == t ? "" : t)
                };
                if (Array.isArray(r) || r.jquery && !v.isPlainObject(r)) v.each(r, function () {
                    u(this.name, this.value)
                }); else for (t in r) Ce(t, r[t], e, u);
                return n.join("&")
            }, v.fn.extend({
                serialize: function () {
                    return v.param(this.serializeArray())
                }, serializeArray: function () {
                    return this.map(function () {
                        var r = v.prop(this, "elements");
                        return r ? v.makeArray(r) : this
                    }).filter(function () {
                        var r = this.type;
                        return this.name && !v(this).is(":disabled") && we.test(this.nodeName) && !xe.test(r) && (this.checked || !ir.test(r))
                    }).map(function (r, e) {
                        var t = v(this).val();
                        return null == t ? null : Array.isArray(t) ? v.map(t, function (r) {
                            return {name: e.name, value: r.replace(ye, "\r\n")}
                        }) : {name: e.name, value: t.replace(ye, "\r\n")}
                    }).get()
                }
            });
            var _e = /%20/g, Se = /#.*$/, Te = /([?&])_=[^&]*/, Ee = /^(.*?):[ \t]*([^\r\n]*)$/gm,
                Le = /^(?:GET|HEAD)$/, Ne = /^\/\//, je = {}, ze = {}, Pe = "*/".concat("*"), Ae = s.createElement("a");

            function De(r) {
                return function (e, t) {
                    "string" != typeof e && (t = e, e = "*");
                    var n, u = 0, a = e.toLowerCase().match(H) || [];
                    if (v.isFunction(t)) for (; n = a[u++];) "+" === n[0] ? (n = n.slice(1) || "*", (r[n] = r[n] || []).unshift(t)) : (r[n] = r[n] || []).push(t)
                }
            }

            function Me(r, e, t, n) {
                var u = {}, a = r === ze;

                function s(o) {
                    var i;
                    return u[o] = !0, v.each(r[o] || [], function (r, o) {
                        var l = o(e, t, n);
                        return "string" != typeof l || a || u[l] ? a ? !(i = l) : void 0 : (e.dataTypes.unshift(l), s(l), !1)
                    }), i
                }

                return s(e.dataTypes[0]) || !u["*"] && s("*")
            }

            function Oe(r, e) {
                var t, n, u = v.ajaxSettings.flatOptions || {};
                for (t in e) void 0 !== e[t] && ((u[t] ? r : n || (n = {}))[t] = e[t]);
                return n && v.extend(!0, r, n), r
            }

            Ae.href = ge.href, v.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: ge.href,
                    type: "GET",
                    isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(ge.protocol),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": Pe,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript"
                    },
                    contents: {xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/},
                    responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
                    converters: {"* text": String, "text html": !0, "text json": JSON.parse, "text xml": v.parseXML},
                    flatOptions: {url: !0, context: !0}
                },
                ajaxSetup: function (r, e) {
                    return e ? Oe(Oe(r, v.ajaxSettings), e) : Oe(v.ajaxSettings, r)
                },
                ajaxPrefilter: De(je),
                ajaxTransport: De(ze),
                ajax: function (r, e) {
                    "object" == typeof r && (e = r, r = void 0), e = e || {};
                    var n, u, a, o, i, l, c, b, f, p, d = v.ajaxSetup({}, e), h = d.context || d,
                        g = d.context && (h.nodeType || h.jquery) ? v(h) : v.event, k = v.Deferred(),
                        m = v.Callbacks("once memory"), y = d.statusCode || {}, x = {}, w = {}, C = "canceled", _ = {
                            readyState: 0, getResponseHeader: function (r) {
                                var e;
                                if (c) {
                                    if (!o) for (o = {}; e = Ee.exec(a);) o[e[1].toLowerCase()] = e[2];
                                    e = o[r.toLowerCase()]
                                }
                                return null == e ? null : e
                            }, getAllResponseHeaders: function () {
                                return c ? a : null
                            }, setRequestHeader: function (r, e) {
                                return null == c && (r = w[r.toLowerCase()] = w[r.toLowerCase()] || r, x[r] = e), this
                            }, overrideMimeType: function (r) {
                                return null == c && (d.mimeType = r), this
                            }, statusCode: function (r) {
                                var e;
                                if (r) if (c) _.always(r[_.status]); else for (e in r) y[e] = [y[e], r[e]];
                                return this
                            }, abort: function (r) {
                                var e = r || C;
                                return n && n.abort(e), S(0, e), this
                            }
                        };
                    if (k.promise(_), d.url = ((r || d.url || ge.href) + "").replace(Ne, ge.protocol + "//"), d.type = e.method || e.type || d.method || d.type, d.dataTypes = (d.dataType || "*").toLowerCase().match(H) || [""], null == d.crossDomain) {
                        l = s.createElement("a");
                        try {
                            l.href = d.url, l.href = l.href, d.crossDomain = Ae.protocol + "//" + Ae.host != l.protocol + "//" + l.host
                        } catch (r) {
                            d.crossDomain = !0
                        }
                    }
                    if (d.data && d.processData && "string" != typeof d.data && (d.data = v.param(d.data, d.traditional)), Me(je, d, e, _), c) return _;
                    for (f in (b = v.event && d.global) && 0 == v.active++ && v.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !Le.test(d.type), u = d.url.replace(Se, ""), d.hasContent ? d.data && d.processData && 0 === (d.contentType || "").indexOf("application/x-www-form-urlencoded") && (d.data = d.data.replace(_e, "+")) : (p = d.url.slice(u.length), d.data && (u += (me.test(u) ? "&" : "?") + d.data, delete d.data), !1 === d.cache && (u = u.replace(Te, "$1"), p = (me.test(u) ? "&" : "?") + "_=" + ke++ + p), d.url = u + p), d.ifModified && (v.lastModified[u] && _.setRequestHeader("If-Modified-Since", v.lastModified[u]), v.etag[u] && _.setRequestHeader("If-None-Match", v.etag[u])), (d.data && d.hasContent && !1 !== d.contentType || e.contentType) && _.setRequestHeader("Content-Type", d.contentType), _.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + Pe + "; q=0.01" : "") : d.accepts["*"]), d.headers) _.setRequestHeader(f, d.headers[f]);
                    if (d.beforeSend && (!1 === d.beforeSend.call(h, _, d) || c)) return _.abort();
                    if (C = "abort", m.add(d.complete), _.done(d.success), _.fail(d.error), n = Me(ze, d, e, _)) {
                        if (_.readyState = 1, b && g.trigger("ajaxSend", [_, d]), c) return _;
                        d.async && d.timeout > 0 && (i = t.setTimeout(function () {
                            _.abort("timeout")
                        }, d.timeout));
                        try {
                            c = !1, n.send(x, S)
                        } catch (r) {
                            if (c) throw r;
                            S(-1, r)
                        }
                    } else S(-1, "No Transport");

                    function S(r, e, s, o) {
                        var l, f, p, x, w, C = e;
                        c || (c = !0, i && t.clearTimeout(i), n = void 0, a = o || "", _.readyState = r > 0 ? 4 : 0, l = r >= 200 && r < 300 || 304 === r, s && (x = function (r, e, t) {
                            for (var n, u, a, s, o = r.contents, i = r.dataTypes; "*" === i[0];) i.shift(), void 0 === n && (n = r.mimeType || e.getResponseHeader("Content-Type"));
                            if (n) for (u in o) if (o[u] && o[u].test(n)) {
                                i.unshift(u);
                                break
                            }
                            if (i[0] in t) a = i[0]; else {
                                for (u in t) {
                                    if (!i[0] || r.converters[u + " " + i[0]]) {
                                        a = u;
                                        break
                                    }
                                    s || (s = u)
                                }
                                a = a || s
                            }
                            if (a) return a !== i[0] && i.unshift(a), t[a]
                        }(d, _, s)), x = function (r, e, t, n) {
                            var u, a, s, o, i, l = {}, c = r.dataTypes.slice();
                            if (c[1]) for (s in r.converters) l[s.toLowerCase()] = r.converters[s];
                            for (a = c.shift(); a;) if (r.responseFields[a] && (t[r.responseFields[a]] = e), !i && n && r.dataFilter && (e = r.dataFilter(e, r.dataType)), i = a, a = c.shift()) if ("*" === a) a = i; else if ("*" !== i && i !== a) {
                                if (!(s = l[i + " " + a] || l["* " + a])) for (u in l) if ((o = u.split(" "))[1] === a && (s = l[i + " " + o[0]] || l["* " + o[0]])) {
                                    !0 === s ? s = l[u] : !0 !== l[u] && (a = o[0], c.unshift(o[1]));
                                    break
                                }
                                if (!0 !== s) if (s && r.throws) e = s(e); else try {
                                    e = s(e)
                                } catch (r) {
                                    return {state: "parsererror", error: s ? r : "No conversion from " + i + " to " + a}
                                }
                            }
                            return {state: "success", data: e}
                        }(d, x, _, l), l ? (d.ifModified && ((w = _.getResponseHeader("Last-Modified")) && (v.lastModified[u] = w), (w = _.getResponseHeader("etag")) && (v.etag[u] = w)), 204 === r || "HEAD" === d.type ? C = "nocontent" : 304 === r ? C = "notmodified" : (C = x.state, f = x.data, l = !(p = x.error))) : (p = C, !r && C || (C = "error", r < 0 && (r = 0))), _.status = r, _.statusText = (e || C) + "", l ? k.resolveWith(h, [f, C, _]) : k.rejectWith(h, [_, C, p]), _.statusCode(y), y = void 0, b && g.trigger(l ? "ajaxSuccess" : "ajaxError", [_, d, l ? f : p]), m.fireWith(h, [_, C]), b && (g.trigger("ajaxComplete", [_, d]), --v.active || v.event.trigger("ajaxStop")))
                    }

                    return _
                },
                getJSON: function (r, e, t) {
                    return v.get(r, e, t, "json")
                },
                getScript: function (r, e) {
                    return v.get(r, void 0, e, "script")
                }
            }), v.each(["get", "post"], function (r, e) {
                v[e] = function (r, t, n, u) {
                    return v.isFunction(t) && (u = u || n, n = t, t = void 0), v.ajax(v.extend({
                        url: r,
                        type: e,
                        dataType: u,
                        data: t,
                        success: n
                    }, v.isPlainObject(r) && r))
                }
            }), v._evalUrl = function (r) {
                return v.ajax({url: r, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, throws: !0})
            }, v.fn.extend({
                wrapAll: function (r) {
                    var e;
                    return this[0] && (v.isFunction(r) && (r = r.call(this[0])), e = v(r, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function () {
                        for (var r = this; r.firstElementChild;) r = r.firstElementChild;
                        return r
                    }).append(this)), this
                }, wrapInner: function (r) {
                    return v.isFunction(r) ? this.each(function (e) {
                        v(this).wrapInner(r.call(this, e))
                    }) : this.each(function () {
                        var e = v(this), t = e.contents();
                        t.length ? t.wrapAll(r) : e.append(r)
                    })
                }, wrap: function (r) {
                    var e = v.isFunction(r);
                    return this.each(function (t) {
                        v(this).wrapAll(e ? r.call(this, t) : r)
                    })
                }, unwrap: function (r) {
                    return this.parent(r).not("body").each(function () {
                        v(this).replaceWith(this.childNodes)
                    }), this
                }
            }), v.expr.pseudos.hidden = function (r) {
                return !v.expr.pseudos.visible(r)
            }, v.expr.pseudos.visible = function (r) {
                return !!(r.offsetWidth || r.offsetHeight || r.getClientRects().length)
            }, v.ajaxSettings.xhr = function () {
                try {
                    return new t.XMLHttpRequest
                } catch (r) {
                }
            };
            var qe = {0: 200, 1223: 204}, He = v.ajaxSettings.xhr();
            k.cors = !!He && "withCredentials" in He, k.ajax = He = !!He, v.ajaxTransport(function (r) {
                var e, n;
                if (k.cors || He && !r.crossDomain) return {
                    send: function (u, a) {
                        var s, o = r.xhr();
                        if (o.open(r.type, r.url, r.async, r.username, r.password), r.xhrFields) for (s in r.xhrFields) o[s] = r.xhrFields[s];
                        for (s in r.mimeType && o.overrideMimeType && o.overrideMimeType(r.mimeType), r.crossDomain || u["X-Requested-With"] || (u["X-Requested-With"] = "XMLHttpRequest"), u) o.setRequestHeader(s, u[s]);
                        e = function (r) {
                            return function () {
                                e && (e = n = o.onload = o.onerror = o.onabort = o.onreadystatechange = null, "abort" === r ? o.abort() : "error" === r ? "number" != typeof o.status ? a(0, "error") : a(o.status, o.statusText) : a(qe[o.status] || o.status, o.statusText, "text" !== (o.responseType || "text") || "string" != typeof o.responseText ? {binary: o.response} : {text: o.responseText}, o.getAllResponseHeaders()))
                            }
                        }, o.onload = e(), n = o.onerror = e("error"), void 0 !== o.onabort ? o.onabort = n : o.onreadystatechange = function () {
                            4 === o.readyState && t.setTimeout(function () {
                                e && n()
                            })
                        }, e = e("abort");
                        try {
                            o.send(r.hasContent && r.data || null)
                        } catch (r) {
                            if (e) throw r
                        }
                    }, abort: function () {
                        e && e()
                    }
                }
            }), v.ajaxPrefilter(function (r) {
                r.crossDomain && (r.contents.script = !1)
            }), v.ajaxSetup({
                accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
                contents: {script: /\b(?:java|ecma)script\b/},
                converters: {
                    "text script": function (r) {
                        return v.globalEval(r), r
                    }
                }
            }), v.ajaxPrefilter("script", function (r) {
                void 0 === r.cache && (r.cache = !1), r.crossDomain && (r.type = "GET")
            }), v.ajaxTransport("script", function (r) {
                var e, t;
                if (r.crossDomain) return {
                    send: function (n, u) {
                        e = v("<script>").prop({
                            charset: r.scriptCharset,
                            src: r.url
                        }).on("load error", t = function (r) {
                            e.remove(), t = null, r && u("error" === r.type ? 404 : 200, r.type)
                        }), s.head.appendChild(e[0])
                    }, abort: function () {
                        t && t()
                    }
                }
            });
            var Be, Re = [], Ie = /(=)\?(?=&|$)|\?\?/;
            v.ajaxSetup({
                jsonp: "callback", jsonpCallback: function () {
                    var r = Re.pop() || v.expando + "_" + ke++;
                    return this[r] = !0, r
                }
            }), v.ajaxPrefilter("json jsonp", function (r, e, n) {
                var u, a, s,
                    o = !1 !== r.jsonp && (Ie.test(r.url) ? "url" : "string" == typeof r.data && 0 === (r.contentType || "").indexOf("application/x-www-form-urlencoded") && Ie.test(r.data) && "data");
                if (o || "jsonp" === r.dataTypes[0]) return u = r.jsonpCallback = v.isFunction(r.jsonpCallback) ? r.jsonpCallback() : r.jsonpCallback, o ? r[o] = r[o].replace(Ie, "$1" + u) : !1 !== r.jsonp && (r.url += (me.test(r.url) ? "&" : "?") + r.jsonp + "=" + u), r.converters["script json"] = function () {
                    return s || v.error(u + " was not called"), s[0]
                }, r.dataTypes[0] = "json", a = t[u], t[u] = function () {
                    s = arguments
                }, n.always(function () {
                    void 0 === a ? v(t).removeProp(u) : t[u] = a, r[u] && (r.jsonpCallback = e.jsonpCallback, Re.push(u)), s && v.isFunction(a) && a(s[0]), s = a = void 0
                }), "script"
            }), k.createHTMLDocument = ((Be = s.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Be.childNodes.length), v.parseHTML = function (r, e, t) {
                return "string" != typeof r ? [] : ("boolean" == typeof e && (t = e, e = !1), e || (k.createHTMLDocument ? ((n = (e = s.implementation.createHTMLDocument("")).createElement("base")).href = s.location.href, e.head.appendChild(n)) : e = s), u = j.exec(r), a = !t && [], u ? [e.createElement(u[1])] : (u = kr([r], e, a), a && a.length && v(a).remove(), v.merge([], u.childNodes)));
                var n, u, a
            }, v.fn.load = function (r, e, t) {
                var n, u, a, s = this, o = r.indexOf(" ");
                return o > -1 && (n = fe(r.slice(o)), r = r.slice(0, o)), v.isFunction(e) ? (t = e, e = void 0) : e && "object" == typeof e && (u = "POST"), s.length > 0 && v.ajax({
                    url: r,
                    type: u || "GET",
                    dataType: "html",
                    data: e
                }).done(function (r) {
                    a = arguments, s.html(n ? v("<div>").append(v.parseHTML(r)).find(n) : r)
                }).always(t && function (r, e) {
                    s.each(function () {
                        t.apply(this, a || [r.responseText, e, r])
                    })
                }), this
            }, v.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (r, e) {
                v.fn[e] = function (r) {
                    return this.on(e, r)
                }
            }), v.expr.pseudos.animated = function (r) {
                return v.grep(v.timers, function (e) {
                    return r === e.elem
                }).length
            }, v.offset = {
                setOffset: function (r, e, t) {
                    var n, u, a, s, o, i, l = v.css(r, "position"), c = v(r), b = {};
                    "static" === l && (r.style.position = "relative"), o = c.offset(), a = v.css(r, "top"), i = v.css(r, "left"), ("absolute" === l || "fixed" === l) && (a + i).indexOf("auto") > -1 ? (s = (n = c.position()).top, u = n.left) : (s = parseFloat(a) || 0, u = parseFloat(i) || 0), v.isFunction(e) && (e = e.call(r, t, v.extend({}, o))), null != e.top && (b.top = e.top - o.top + s), null != e.left && (b.left = e.left - o.left + u), "using" in e ? e.using.call(r, b) : c.css(b)
                }
            }, v.fn.extend({
                offset: function (r) {
                    if (arguments.length) return void 0 === r ? this : this.each(function (e) {
                        v.offset.setOffset(this, r, e)
                    });
                    var e, t, n, u, a = this[0];
                    return a ? a.getClientRects().length ? (n = a.getBoundingClientRect(), t = (e = a.ownerDocument).documentElement, u = e.defaultView, {
                        top: n.top + u.pageYOffset - t.clientTop,
                        left: n.left + u.pageXOffset - t.clientLeft
                    }) : {top: 0, left: 0} : void 0
                }, position: function () {
                    if (this[0]) {
                        var r, e, t = this[0], n = {top: 0, left: 0};
                        return "fixed" === v.css(t, "position") ? e = t.getBoundingClientRect() : (r = this.offsetParent(), e = this.offset(), N(r[0], "html") || (n = r.offset()), n = {
                            top: n.top + v.css(r[0], "borderTopWidth", !0),
                            left: n.left + v.css(r[0], "borderLeftWidth", !0)
                        }), {
                            top: e.top - n.top - v.css(t, "marginTop", !0),
                            left: e.left - n.left - v.css(t, "marginLeft", !0)
                        }
                    }
                }, offsetParent: function () {
                    return this.map(function () {
                        for (var r = this.offsetParent; r && "static" === v.css(r, "position");) r = r.offsetParent;
                        return r || mr
                    })
                }
            }), v.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (r, e) {
                var t = "pageYOffset" === e;
                v.fn[r] = function (n) {
                    return V(this, function (r, n, u) {
                        var a;
                        if (v.isWindow(r) ? a = r : 9 === r.nodeType && (a = r.defaultView), void 0 === u) return a ? a[e] : r[n];
                        a ? a.scrollTo(t ? a.pageXOffset : u, t ? u : a.pageYOffset) : r[n] = u
                    }, r, n, arguments.length)
                }
            }), v.each(["top", "left"], function (r, e) {
                v.cssHooks[e] = Ir(k.pixelPosition, function (r, t) {
                    if (t) return t = Rr(r, e), Hr.test(t) ? v(r).position()[e] + "px" : t
                })
            }), v.each({Height: "height", Width: "width"}, function (r, e) {
                v.each({padding: "inner" + r, content: e, "": "outer" + r}, function (t, n) {
                    v.fn[n] = function (u, a) {
                        var s = arguments.length && (t || "boolean" != typeof u),
                            o = t || (!0 === u || !0 === a ? "margin" : "border");
                        return V(this, function (e, t, u) {
                            var a;
                            return v.isWindow(e) ? 0 === n.indexOf("outer") ? e["inner" + r] : e.document.documentElement["client" + r] : 9 === e.nodeType ? (a = e.documentElement, Math.max(e.body["scroll" + r], a["scroll" + r], e.body["offset" + r], a["offset" + r], a["client" + r])) : void 0 === u ? v.css(e, t, o) : v.style(e, t, u, o)
                        }, e, s ? u : void 0, s)
                    }
                })
            }), v.fn.extend({
                bind: function (r, e, t) {
                    return this.on(r, null, e, t)
                }, unbind: function (r, e) {
                    return this.off(r, null, e)
                }, delegate: function (r, e, t, n) {
                    return this.on(e, r, t, n)
                }, undelegate: function (r, e, t) {
                    return 1 === arguments.length ? this.off(r, "**") : this.off(e, r || "**", t)
                }
            }), v.holdReady = function (r) {
                r ? v.readyWait++ : v.ready(!0)
            }, v.isArray = Array.isArray, v.parseJSON = JSON.parse, v.nodeName = N, void 0 === (n = function () {
                return v
            }.apply(e, [])) || (r.exports = n);
            var Fe = t.jQuery, We = t.$;
            return v.noConflict = function (r) {
                return t.$ === v && (t.$ = We), r && t.jQuery === v && (t.jQuery = Fe), v
            }, u || (t.jQuery = t.$ = v), v
        })
    }, ZIR9: function (r, e, t) {
        var n, u;
        !function () {
            function t(r, e) {
                t._assign(this, t._defaultProps), this.options = t._assign({}, t.defaultOptions, e || {}), this.numberSource = arguments.length ? r : "", this.number = t._getNumber(this.numberSource);
                var n = t._getBank(this.number);
                n && (this.bankAlias = n.alias, this.bankName = n.name, this.bankNameEn = n.nameEn, this.bankCountry = n.country, this.bankUrl = n.url, this.bankLogoPng = t._getLogo(this.options.banksLogosPath, n.logoPng), this.bankLogoSvg = t._getLogo(this.options.banksLogosPath, n.logoSvg), this.bankLogo = t._getLogoByPreferredExt(this.bankLogoPng, this.bankLogoSvg, this.options.preferredExt), this.bankLogoStyle = n.logoStyle, this.backgroundColor = n.backgroundColor, this.backgroundColors = n.backgroundColors, this.backgroundLightness = n.backgroundLightness, this.textColor = n.text), this.backgroundGradient = t._getGradient(this.backgroundColors, this.options.gradientDegrees);
                var u = t._getBrand(this.number);
                if (u) {
                    this.brandAlias = u.alias, this.brandName = u.name;
                    var a = t._getBrandLogoBasename(this.brandAlias, this.options.brandLogoPolicy, this.backgroundLightness, this.bankLogoStyle);
                    this.brandLogoPng = t._getLogo(this.options.brandsLogosPath, a, "png"), this.brandLogoSvg = t._getLogo(this.options.brandsLogosPath, a, "svg"), this.brandLogo = t._getLogoByPreferredExt(this.brandLogoPng, this.brandLogoSvg, this.options.preferredExt), this.codeName = u.codeName, this.codeLength = u.codeLength, this.numberLengths = u.lengths, this.numberGaps = u.gaps
                }
                this.numberBlocks = t._getBlocks(this.numberGaps, this.numberLengths), this.numberMask = t._getMask(this.options.maskDigitSymbol, this.options.maskDelimiterSymbol, this.numberBlocks), this.numberNice = t._getNumberNice(this.number, this.numberGaps)
            }

            t._defaultProps = {
                bankAlias: null,
                bankName: null,
                bankNameEn: null,
                bankCountry: null,
                bankUrl: null,
                bankLogo: null,
                bankLogoPng: null,
                bankLogoSvg: null,
                bankLogoStyle: null,
                backgroundColor: "#eeeeee",
                backgroundColors: ["#eeeeee", "#dddddd"],
                backgroundLightness: "light",
                backgroundGradient: null,
                textColor: "#000",
                brandAlias: null,
                brandName: null,
                brandLogo: null,
                brandLogoPng: null,
                brandLogoSvg: null,
                codeName: null,
                codeLength: null,
                numberMask: null,
                numberGaps: [4, 8, 12],
                numberBlocks: null,
                numberLengths: [12, 13, 14, 15, 16, 17, 18, 19],
                numberNice: null,
                number: null,
                numberSource: null,
                options: {}
            }, t.defaultOptions = {
                banksLogosPath: "/bower_components/card-info/dist/banks-logos/",
                brandsLogosPath: "/bower_components/card-info/dist/brands-logos/",
                brandLogoPolicy: "auto",
                preferredExt: "svg",
                maskDigitSymbol: "0",
                maskDelimiterSymbol: " ",
                gradientDegrees: 135
            }, t._banks = {}, t._prefixes = {}, t._brands = [{
                alias: "visa",
                name: "Visa",
                codeName: "CVV",
                codeLength: 3,
                gaps: [4, 8, 12],
                lengths: [16],
                pattern: /^4\d*$/
            }, {
                alias: "master-card",
                name: "MasterCard",
                codeName: "CVC",
                codeLength: 3,
                gaps: [4, 8, 12],
                lengths: [16],
                pattern: /^(5[1-5]|222[1-9]|2[3-6]|27[0-1]|2720)\d*$/
            }, {
                alias: "american-express",
                name: "American Express",
                codeName: "CID",
                codeLength: 4,
                gaps: [4, 10],
                lengths: [15],
                pattern: /^3[47]\d*$/
            }, {
                alias: "diners-club",
                name: "Diners Club",
                codeName: "CVV",
                codeLength: 3,
                gaps: [4, 10],
                lengths: [14],
                pattern: /^3(0[0-5]|[689])\d*$/
            }, {
                alias: "discover",
                name: "Discover",
                codeName: "CID",
                codeLength: 3,
                gaps: [4, 8, 12],
                lengths: [16, 19],
                pattern: /^(6011|65|64[4-9])\d*$/
            }, {
                alias: "jcb",
                name: "JCB",
                codeName: "CVV",
                codeLength: 3,
                gaps: [4, 8, 12],
                lengths: [16],
                pattern: /^(2131|1800|35)\d*$/
            }, {
                alias: "unionpay",
                name: "UnionPay",
                codeName: "CVN",
                codeLength: 3,
                gaps: [4, 8, 12],
                lengths: [16, 17, 18, 19],
                pattern: /^62[0-5]\d*$/
            }, {
                alias: "maestro",
                name: "Maestro",
                codeName: "CVC",
                codeLength: 3,
                gaps: [4, 8, 12],
                lengths: [12, 13, 14, 15, 16, 17, 18, 19],
                pattern: /^(5[0678]|6304|6390|6054|6271|67)\d*$/
            }, {
                alias: "mir",
                name: "MIR",
                codeName: "CVC",
                codeLength: 3,
                gaps: [4, 8, 12],
                lengths: [16],
                pattern: /^22\d*$/
            }], t._assign = function () {
                for (var r = arguments[0], e = 1; e < arguments.length; e++) {
                    var n = arguments[e];
                    for (var u in n) n.hasOwnProperty(u) && (n[u] instanceof Array ? r[u] = t._assign([], n[u]) : r[u] = n[u])
                }
                return r
            }, t._getNumber = function (r) {
                var e = r + "";
                return /^[\d ]*$/.test(e) ? e.replace(/\D/g, "") : ""
            }, t._getBank = function (r) {
                if (!(r.length < 6)) {
                    var e = r.substr(0, 6);
                    return this._prefixes[e] ? this._banks[this._prefixes[e]] : void 0
                }
            }, t._getBrand = function (r) {
                for (var e = [], t = 0; t < this._brands.length; t++) this._brands[t].pattern.test(r) && e.push(this._brands[t]);
                if (1 === e.length) return e[0]
            }, t._getLogo = function (r, e, t) {
                return e ? r + (t ? e + "." + t : e) : null
            }, t._getBrandLogoBasename = function (r, e, t, n) {
                switch (e) {
                    case"auto":
                        return r + "-" + (n || "colored");
                    case"colored":
                        return r + "-colored";
                    case"mono":
                        return r + ("light" === t ? "-black" : "-white");
                    case"black":
                        return r + "-black";
                    case"white":
                        return r + "-white"
                }
            }, t._getLogoByPreferredExt = function (r, e, t) {
                return r || e ? r ? e ? r.substr(r.length - 3) === t ? r : e : r : e : null
            }, t._getGradient = function (r, e) {
                return "linear-gradient(" + e + "deg, " + r.join(", ") + ")"
            }, t._getBlocks = function (r, e) {
                for (var t = e[e.length - 1], n = [], u = r.length - 1; u >= 0; u--) {
                    var a = t - r[u];
                    t -= a, n.push(a)
                }
                return n.push(t), n.reverse()
            }, t._getMask = function (r, e, t) {
                for (var n = "", u = 0; u < t.length; u++) n += (u ? e : "") + Array(t[u] + 1).join(r);
                return n
            }, t._getNumberNice = function (r, e) {
                for (var t = [0].concat(e).concat([r.length]), n = [], u = 0; t[u] < r.length; u++) {
                    var a = t[u], s = Math.min(t[u + 1], r.length);
                    n.push(r.substring(a, s))
                }
                return n.join(" ")
            }, t._addBanks = function (r) {
                this._assign(this._banks, r)
            }, t._addPrefixes = function (r) {
                this._assign(this._prefixes, r)
            }, t.addBanksAndPrefixes = function (r) {
                this._addBanks(r.banks), this._addPrefixes(r.prefixes)
            }, t.getBanks = function (r) {
                r = t._assign({}, t.defaultOptions, r || {});
                var e = [], n = ["png", "svg"], u = ["Png", "Svg"];
                for (var a in this._banks) if (this._banks.hasOwnProperty(a)) {
                    for (var s = t._assign({}, this._banks[a]), o = 0; o < n.length; o++) {
                        var i = "logo" + u[o];
                        s[i] && (s[i] = t._getLogo(r.banksLogosPath, s[i]))
                    }
                    s.backgroundGradient = t._getGradient(s.backgroundColors, r.gradientDegrees), s.logo = t._getLogoByPreferredExt(s.logoPng, s.logoSvg, r.preferredExt), e.push(s)
                }
                return e
            }, t.getBrands = function (r) {
                r = t._assign({}, t.defaultOptions, r || {});
                for (var e = [], n = ["colored", "black", "white"], u = ["png", "svg"], a = ["Colored", "Black", "White"], s = ["Png", "Svg"], o = 0; o < this._brands.length; o++) {
                    var i = t._assign({}, this._brands[o]);
                    i.blocks = t._getBlocks(i.gaps, i.lengths), i.mask = t._getMask(r.maskDigitSymbol, r.maskDelimiterSymbol, i.blocks);
                    for (var l = 0; l < n.length; l++) {
                        for (var c = "logo" + a[l], b = 0; b < u.length; b++) i[c + s[b]] = t._getLogo(r.brandsLogosPath, i.alias + "-" + n[l], u[b]);
                        i[c] = t._getLogoByPreferredExt(i[c + "Png"], i[c + "Svg"], r.preferredExt)
                    }
                    e.push(i)
                }
                return e
            }, t.setDefaultOptions = function (r) {
                this._assign(t.defaultOptions, r)
            }, void 0 !== r && r.exports && (e = r.exports = t), e.CardInfo = t
        }(), n = {
            "ru-absolut": {
                name: "Р  РЎвЂ™Р  Р’В±Р РЋР С“Р  РЎвЂўР  Р’В»Р РЋР вЂ№Р РЋРІР‚С™ Р  РІР‚ВР  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                nameEn: "Absolut Bank",
                url: "http://absolutbank.ru/",
                backgroundColor: "#fdb89a",
                backgroundColors: ["#fbd6c5", "#fdb89a"],
                backgroundLightness: "light",
                logoStyle: "colored",
                text: "#676766",
                alias: "ru-absolut",
                country: "ru",
                logoPng: "ru-absolut.png"
            },
            "ru-akbars": {
                name: "Р  РЎвЂ™Р  РЎвЂќ Р  РІР‚ВР  Р’В°Р РЋР вЂљР РЋР С“",
                nameEn: "AK Bars",
                url: "https://www.akbars.ru/",
                backgroundColor: "#01973e",
                backgroundColors: ["#01973e", "#04632b"],
                backgroundLightness: "dark",
                logoStyle: "white",
                text: "#fff",
                alias: "ru-akbars",
                country: "ru",
                logoPng: "ru-akbars.png"
            },
            "ru-alfa": {
                name: "Р  РЎвЂ™Р  Р’В»Р РЋР Р‰Р РЋРІР‚С›Р  Р’В°-Р  РІР‚ВР  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                nameEn: "Alfa-Bank",
                url: "https://alfabank.ru/",
                backgroundColor: "#ef3124",
                backgroundColors: ["#ef3124", "#d6180b"],
                backgroundLightness: "dark",
                logoStyle: "white",
                text: "#fff",
                alias: "ru-alfa",
                country: "ru",
                logoPng: "ru-alfa.png",
                logoSvg: "ru-alfa.svg"
            },
            "ru-atb": {
                name: "Р  РЎвЂ™Р  Р’В·Р  РЎвЂР  Р’В°Р РЋРІР‚С™Р РЋР С“Р  РЎвЂќР  РЎвЂў-Р  РЎС›Р  РЎвЂР РЋРІР‚В¦Р  РЎвЂўР  РЎвЂўР  РЎвЂќР  Р’ВµР  Р’В°Р  Р вЂ¦Р РЋР С“Р  РЎвЂќР  РЎвЂР  РІвЂћвЂ“ Р  РІР‚ВР  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                nameEn: "Р  РЎвЂ™Р  Р’В·Р  РЎвЂР  Р’В°Р РЋРІР‚С™Р РЋР С“Р  РЎвЂќР  РЎвЂў-Р  РЎС›Р  РЎвЂР РЋРІР‚В¦Р  РЎвЂўР  РЎвЂўР  РЎвЂќР  Р’ВµР  Р’В°Р  Р вЂ¦Р РЋР С“Р  РЎвЂќР  РЎвЂР  РІвЂћвЂ“ Р  РІР‚ВР  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                url: "https://www.atb.su/",
                backgroundColor: "#eeeeee",
                backgroundColors: ["#eeeeee", "#dea184"],
                backgroundLightness: "light",
                logoStyle: "colored",
                text: "#373a36",
                alias: "ru-atb",
                country: "ru",
                logoPng: "ru-atb.png",
                logoSvg: "ru-atb.svg"
            },
            "ru-avangard": {
                name: "Р  РЎвЂ™Р  Р вЂ Р  Р’В°Р  Р вЂ¦Р  РЎвЂ“Р  Р’В°Р РЋР вЂљР  РўвЂ",
                nameEn: "Avangard",
                url: "https://www.avangard.ru/",
                backgroundColor: "#095b34",
                backgroundColors: ["#0f8e52", "#095b34"],
                backgroundLightness: "dark",
                logoStyle: "white",
                text: "#fff",
                alias: "ru-avangard",
                country: "ru",
                logoPng: "ru-avangard.png"
            },
            "ru-binbank": {
                name: "Р  РІР‚ВР  РЎвЂР  Р вЂ¦Р  Р’В±Р  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                nameEn: "B&N Bank Public",
                url: "https://www.binbank.ru/",
                backgroundColor: "#cdeafd",
                backgroundColors: ["#cdeafd", "#9cc0d9"],
                backgroundLightness: "light",
                logoStyle: "colored",
                text: "#004c81",
                alias: "ru-binbank",
                country: "ru",
                logoPng: "ru-binbank.png",
                logoSvg: "ru-binbank.svg"
            },
            "ru-ceb": {
                name: "Р  РЎв„ўР РЋР вЂљР  Р’ВµР  РўвЂР  РЎвЂР РЋРІР‚С™ Р  РІР‚СћР  Р вЂ Р РЋР вЂљР  РЎвЂўР  РЎвЂ”Р  Р’В° Р  РІР‚ВР  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                nameEn: "Credit Europe Bank",
                url: "https://www.crediteurope.ru/",
                backgroundColor: "#e0eaf7",
                backgroundColors: ["#e0eaf7", "#f7dfdf"],
                backgroundLightness: "light",
                logoStyle: "colored",
                text: "#1c297b",
                alias: "ru-ceb",
                country: "ru",
                logoPng: "ru-ceb.png",
                logoSvg: "ru-ceb.svg"
            },
            "ru-cetelem": {
                name: "Р  Р Р‹Р  Р’ВµР РЋРІР‚С™Р  Р’ВµР  Р’В»Р  Р’ВµР  РЎВ Р  РІР‚ВР  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                nameEn: "Cetelem Bank",
                url: "https://www.cetelem.ru/",
                backgroundColor: "#ceecb7",
                backgroundColors: ["#ceecb7", "#8bbb75"],
                backgroundLightness: "light",
                logoStyle: "colored",
                text: "#167158",
                alias: "ru-cetelem",
                country: "ru",
                logoPng: "ru-cetelem.png",
                logoSvg: "ru-cetelem.svg"
            },
            "ru-citi": {
                name: "Р  Р Р‹Р  РЎвЂР РЋРІР‚С™Р  РЎвЂР  Р’В±Р  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                nameEn: "Citibank",
                url: "https://www.citibank.ru/",
                backgroundColor: "#008bd0",
                backgroundColors: ["#00bcf2", "#004e90"],
                backgroundLightness: "dark",
                logoStyle: "white",
                text: "#fff",
                alias: "ru-citi",
                country: "ru",
                logoPng: "ru-citi.png",
                logoSvg: "ru-citi.svg"
            },
            "ru-globex": {
                name: "Р  РІР‚СљР  Р’В»Р  РЎвЂўР  Р’В±Р РЋР РЉР  РЎвЂќР РЋР С“",
                nameEn: "Globexbank",
                url: "http://www.globexbank.ru/",
                backgroundColor: "#9bdaff",
                backgroundColors: ["#9bdaff", "#ffd2a2"],
                backgroundLightness: "light",
                logoStyle: "colored",
                text: "#072761",
                alias: "ru-globex",
                country: "ru",
                logoPng: "ru-globex.png"
            },
            "ru-gpb": {
                name: "Р  РІР‚СљР  Р’В°Р  Р’В·Р  РЎвЂ”Р РЋР вЂљР  РЎвЂўР  РЎВР  Р’В±Р  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                nameEn: "Gazprombank",
                url: "http://www.gazprombank.ru/",
                backgroundColor: "#02356c",
                backgroundColors: ["#044b98", "#02356c"],
                backgroundLightness: "dark",
                logoStyle: "white",
                text: "#fff",
                alias: "ru-gpb",
                country: "ru",
                logoPng: "ru-gpb.png",
                logoSvg: "ru-gpb.svg"
            },
            "ru-hcf": {
                name: "Р  РўС’Р  РЎвЂўР РЋРЎвЂњР  РЎВ Р  РЎв„ўР РЋР вЂљР  Р’ВµР  РўвЂР  РЎвЂР РЋРІР‚С™ Р  РІР‚ВР  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                nameEn: "HCF Bank",
                url: "http://homecredit.ru/",
                backgroundColor: "#e41701",
                backgroundColors: ["#e41701", "#bd1908"],
                backgroundLightness: "dark",
                logoStyle: "white",
                text: "#fff",
                alias: "ru-hcf",
                country: "ru",
                logoPng: "ru-hcf.png",
                logoSvg: "ru-hcf.svg"
            },
            "ru-jugra": {
                name: "Р  Р’В®Р  РЎвЂ“Р РЋР вЂљР  Р’В°",
                nameEn: "Jugra",
                url: "http://www.jugra.ru/",
                backgroundColor: "#d6ffe6",
                backgroundColors: ["#d6ffe6", "#fff1e4"],
                backgroundLightness: "light",
                logoStyle: "colored",
                text: "#088237",
                alias: "ru-jugra",
                country: "ru",
                logoPng: "ru-jugra.png"
            },
            "ru-mib": {
                name: "Р  РЎС™Р  РЎвЂўР РЋР С“Р  РЎвЂќР  РЎвЂўР  Р вЂ Р РЋР С“Р  РЎвЂќР  РЎвЂР  РІвЂћвЂ“ Р  Р’ВР  Р вЂ¦Р  РўвЂР РЋРЎвЂњР РЋР С“Р РЋРІР‚С™Р РЋР вЂљР  РЎвЂР  Р’В°Р  Р’В»Р РЋР Р‰Р  Р вЂ¦Р РЋРІР‚в„–Р  РІвЂћвЂ“ Р  РІР‚ВР  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                nameEn: "MosР РЋР С“ow Industrial Bank",
                url: "http://www.minbank.ru/",
                backgroundColor: "#8f0e0f",
                backgroundColors: ["#ce4647", "#8f0e0f"],
                backgroundLightness: "dark",
                logoStyle: "white",
                text: "#fff",
                alias: "ru-mib",
                country: "ru",
                logoPng: "ru-mib.png"
            },
            "ru-mkb": {
                name: "Р  РЎС™Р  РЎвЂўР РЋР С“Р  РЎвЂќР  РЎвЂўР  Р вЂ Р РЋР С“Р  РЎвЂќР  РЎвЂР  РІвЂћвЂ“ Р  РЎв„ўР РЋР вЂљР  Р’ВµР  РўвЂР  РЎвЂР РЋРІР‚С™Р  Р вЂ¦Р РЋРІР‚в„–Р  РІвЂћвЂ“ Р  РІР‚ВР  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                nameEn: "Credit Bank of Moscow",
                url: "https://mkb.ru/",
                backgroundColor: "#eeeeee",
                backgroundColors: ["#eeeeee", "#f9dee8"],
                backgroundLightness: "light",
                logoStyle: "colored",
                text: "#ae0039",
                alias: "ru-mkb",
                country: "ru",
                logoPng: "ru-mkb.png"
            },
            "ru-mob": {
                name: "Р  РЎС™Р  РЎвЂўР РЋР С“Р  РЎвЂќР  РЎвЂўР  Р вЂ Р РЋР С“Р  РЎвЂќР  РЎвЂР  РІвЂћвЂ“ Р  РЎвЂєР  Р’В±Р  Р’В»Р  Р’В°Р РЋР С“Р РЋРІР‚С™Р  Р вЂ¦Р  РЎвЂўР  РІвЂћвЂ“ Р  РІР‚ВР  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                nameEn: "Mosoblbank",
                url: "http://www.mosoblbank.ru/",
                backgroundColor: "#dd3c3d",
                backgroundColors: ["#e14041", "#8e2222"],
                backgroundLightness: "dark",
                logoStyle: "white",
                text: "#fff",
                alias: "ru-mob",
                country: "ru",
                logoPng: "ru-mob.png"
            },
            "ru-mts": {
                name: "Р  РЎС™Р  РЎС›Р  Р Р‹ Р  РІР‚ВР  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                nameEn: "MTS Bank",
                url: "http://www.mtsbank.ru/",
                backgroundColor: "#de1612",
                backgroundColors: ["#ff0000", "#ba0e0a"],
                backgroundLightness: "dark",
                logoStyle: "white",
                text: "#fff",
                alias: "ru-mts",
                country: "ru",
                logoPng: "ru-mts.png",
                logoSvg: "ru-mts.svg"
            },
            "ru-novikom": {
                name: "Р  РЎСљР  РЎвЂўР  Р вЂ Р  РЎвЂР  РЎвЂќР  РЎвЂўР  РЎВР  Р’В±Р  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                nameEn: "Novikombank",
                url: "http://www.novikom.ru/",
                backgroundColor: "#00529b",
                backgroundColors: ["#00529b", "#0a4477"],
                backgroundLightness: "dark",
                logoStyle: "white",
                text: "#fff",
                alias: "ru-novikom",
                country: "ru",
                logoPng: "ru-novikom.png",
                logoSvg: "ru-novikom.svg"
            },
            "ru-open": {
                name: "Р  Р’В¤Р  РЎв„ў Р  РЎвЂєР РЋРІР‚С™Р  РЎвЂќР РЋР вЂљР РЋРІР‚в„–Р РЋРІР‚С™Р  РЎвЂР  Р’Вµ",
                nameEn: "Otkritie FC",
                url: "https://www.open.ru/",
                backgroundColor: "#00b3e1",
                backgroundColors: ["#29c9f3", "#00b3e1"],
                backgroundLightness: "dark",
                logoStyle: "white",
                text: "#fff",
                alias: "ru-open",
                country: "ru",
                logoPng: "ru-open.png",
                logoSvg: "ru-open.svg"
            },
            "ru-otp": {
                name: "Р  РЎвЂєР  РЎС›Р  РЎСџ Р  РІР‚ВР  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                nameEn: "OTP Bank",
                url: "https://www.otpbank.ru/",
                backgroundColor: "#acff90",
                backgroundColors: ["#acff90", "#9edabf"],
                backgroundLightness: "light",
                logoStyle: "colored",
                text: "#006437",
                alias: "ru-otp",
                country: "ru",
                logoPng: "ru-otp.png",
                logoSvg: "ru-otp.svg"
            },
            "ru-pochta": {
                name: "Р  РЎСџР  РЎвЂўР РЋРІР‚РЋР РЋРІР‚С™Р  Р’В° Р  РІР‚ВР  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                nameEn: "Pochtabank",
                url: "https://www.pochtabank.ru/",
                backgroundColor: "#efefef",
                backgroundColors: ["#efefef", "#dbe1ff"],
                backgroundLightness: "light",
                logoStyle: "colored",
                text: "#001689",
                alias: "ru-pochta",
                country: "ru",
                logoPng: "ru-pochta.png",
                logoSvg: "ru-pochta.svg"
            },
            "ru-psb": {
                name: "Р  РЎСџР РЋР вЂљР  РЎвЂўР  РЎВР РЋР С“Р  Р вЂ Р РЋР РЏР  Р’В·Р РЋР Р‰Р  Р’В±Р  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                nameEn: "Promsvyazbank",
                url: "http://www.psbank.ru/",
                backgroundColor: "#c5cfef",
                backgroundColors: ["#f7d1b5", "#c5cfef"],
                backgroundLightness: "light",
                logoStyle: "colored",
                text: "#274193",
                alias: "ru-psb",
                country: "ru",
                logoPng: "ru-psb.png",
                logoSvg: "ru-psb.svg"
            },
            "ru-raiffeisen": {
                name: "Р   Р  Р’В°Р  РІвЂћвЂ“Р РЋРІР‚С›Р РЋРІР‚С›Р  Р’В°Р  РІвЂћвЂ“Р  Р’В·Р  Р’ВµР  Р вЂ¦Р  Р’В±Р  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                nameEn: "Raiffeisenbank bank",
                url: "https://www.raiffeisen.ru/",
                backgroundColor: "#efe6a2",
                backgroundColors: ["#eeeeee", "#efe6a2"],
                backgroundLightness: "light",
                logoStyle: "black",
                text: "#000",
                alias: "ru-raiffeisen",
                country: "ru",
                logoPng: "ru-raiffeisen.png",
                logoSvg: "ru-raiffeisen.svg"
            },
            "ru-reb": {
                name: "Р   Р  РЎвЂўР РЋР С“Р  РІР‚СћР  Р вЂ Р РЋР вЂљР  РЎвЂўР  РІР‚ВР  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                nameEn: "Rosevrobank",
                url: "http://www.rosevrobank.ru/",
                backgroundColor: "#4b1650",
                backgroundColors: ["#8b2d8e", "#4b1650"],
                backgroundLightness: "dark",
                logoStyle: "white",
                text: "#fff",
                alias: "ru-reb",
                country: "ru",
                logoPng: "ru-reb.png"
            },
            "ru-ren": {
                name: "Р   Р  Р’ВµР  Р вЂ¦Р  Р’ВµР РЋР С“Р РЋР С“Р  Р’В°Р  Р вЂ¦Р РЋР С“ Р  РЎв„ўР РЋР вЂљР  Р’ВµР  РўвЂР  РЎвЂР РЋРІР‚С™",
                nameEn: "Renaissance Capital",
                url: "https://rencredit.ru/",
                backgroundColor: "#ffe6f1",
                backgroundColors: ["#ffe6f1", "#f9fff1"],
                backgroundLightness: "light",
                logoStyle: "colored",
                text: "#439539",
                alias: "ru-ren",
                country: "ru",
                logoPng: "ru-ren.png"
            },
            "ru-rgs": {
                name: "Р   Р  РЎвЂўР РЋР С“Р  РЎвЂ“Р  РЎвЂўР РЋР С“Р РЋР С“Р РЋРІР‚С™Р РЋР вЂљР  Р’В°Р РЋРІР‚В¦ Р  РІР‚ВР  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                nameEn: "Rosgosstrakh Bank",
                url: "https://www.rgsbank.ru/",
                backgroundColor: "#b31b2c",
                backgroundColors: ["#b31b2c", "#6f030f"],
                backgroundLightness: "dark",
                logoStyle: "colored",
                text: "#ffe2b8",
                alias: "ru-rgs",
                country: "ru",
                logoPng: "ru-rgs.png",
                logoSvg: "ru-rgs.svg"
            },
            "ru-rosbank": {
                name: "Р   Р  РЎвЂўР РЋР С“Р  Р’В±Р  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                nameEn: "Rosbank bank",
                url: "http://www.rosbank.ru/",
                backgroundColor: "#d3b9ba",
                backgroundColors: ["#d3b9ba", "#b1898b"],
                backgroundLightness: "light",
                logoStyle: "black",
                text: "#000",
                alias: "ru-rosbank",
                country: "ru",
                logoPng: "ru-rosbank.png",
                logoSvg: "ru-rosbank.svg"
            },
            "ru-roscap": {
                name: "Р   Р  РЎвЂўР РЋР С“Р РЋР С“Р  РЎвЂР  РІвЂћвЂ“Р РЋР С“Р  РЎвЂќР  РЎвЂР  РІвЂћвЂ“ Р  РЎв„ўР  Р’В°Р  РЎвЂ”Р  РЎвЂР РЋРІР‚С™Р  Р’В°Р  Р’В»",
                nameEn: "Rossiysky Capital",
                url: "http://www.roscap.ru/",
                backgroundColor: "#ffdcc1",
                backgroundColors: ["#ffdcc1", "#ffced0"],
                backgroundLightness: "light",
                logoStyle: "colored",
                text: "#000",
                alias: "ru-roscap",
                country: "ru",
                logoPng: "ru-roscap.png"
            },
            "ru-rossiya": {
                name: "Р   Р  РЎвЂўР РЋР С“Р РЋР С“Р  РЎвЂР РЋР РЏ",
                nameEn: "Rossiya",
                url: "http://www.abr.ru/",
                backgroundColor: "#eeeeee",
                backgroundColors: ["#eeeeee", "#98c2dd"],
                backgroundLightness: "light",
                logoStyle: "colored",
                text: "#07476e",
                alias: "ru-rossiya",
                country: "ru",
                logoPng: "ru-rossiya.png"
            },
            "ru-rsb": {
                name: "Р   Р РЋРЎвЂњР РЋР С“Р РЋР С“Р  РЎвЂќР  РЎвЂР  РІвЂћвЂ“ Р  Р Р‹Р РЋРІР‚С™Р  Р’В°Р  Р вЂ¦Р  РўвЂР  Р’В°Р РЋР вЂљР РЋРІР‚С™",
                nameEn: "Russian Standard Bank",
                url: "https://www.rsb.ru/",
                backgroundColor: "#414042",
                backgroundColors: ["#6a656f", "#414042"],
                backgroundLightness: "dark",
                logoStyle: "white",
                text: "#fff",
                alias: "ru-rsb",
                country: "ru",
                logoPng: "ru-rsb.png",
                logoSvg: "ru-rsb.svg"
            },
            "ru-rshb": {
                name: "Р   Р  РЎвЂўР РЋР С“Р РЋР С“Р  Р’ВµР  Р’В»Р РЋР Р‰Р РЋРІР‚В¦Р  РЎвЂўР  Р’В·Р  Р’В±Р  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                nameEn: "Rosselkhozbank",
                url: "http://www.rshb.ru/",
                backgroundColor: "#007f2b",
                backgroundColors: ["#007f2b", "#005026"],
                backgroundLightness: "dark",
                logoStyle: "white",
                text: "#ffcd00",
                alias: "ru-rshb",
                country: "ru",
                logoPng: "ru-rshb.png",
                logoSvg: "ru-rshb.svg"
            },
            "ru-sberbank": {
                name: "Р  Р Р‹Р  Р’В±Р  Р’ВµР РЋР вЂљР  Р’В±Р  Р’В°Р  Р вЂ¦Р  РЎвЂќ Р   Р  РЎвЂўР РЋР С“Р РЋР С“Р  РЎвЂР  РЎвЂ",
                nameEn: "Sberbank",
                url: "https://www.sberbank.ru/",
                backgroundColor: "#1a9f29",
                backgroundColors: ["#1a9f29", "#0d7518"],
                backgroundLightness: "dark",
                logoStyle: "white",
                text: "#fff",
                alias: "ru-sberbank",
                country: "ru",
                logoPng: "ru-sberbank.png",
                logoSvg: "ru-sberbank.svg"
            },
            "ru-skb": {
                name: "Р  Р Р‹Р  РЎв„ўР  РІР‚В-Р  РІР‚ВР  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                nameEn: "SKB-Bank",
                url: "http://www.skbbank.ru/",
                backgroundColor: "#006b5a",
                backgroundColors: ["#31a899", "#006b5a"],
                backgroundLightness: "dark",
                logoStyle: "white",
                text: "#fff",
                alias: "ru-skb",
                country: "ru",
                logoPng: "ru-skb.png"
            },
            "ru-smp": {
                name: "Р  Р Р‹Р  РЎС™Р  РЎСџ Р  РІР‚ВР  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                nameEn: "SMP Bank",
                url: "http://smpbank.ru/",
                backgroundColor: "#9fe5ff",
                backgroundColors: ["#9fe5ff", "#5ea6d6"],
                backgroundLightness: "light",
                logoStyle: "colored",
                text: "#005288",
                alias: "ru-smp",
                country: "ru",
                logoPng: "ru-smp.png",
                logoSvg: "ru-smp.svg"
            },
            "ru-sovkom": {
                name: "Р  Р Р‹Р  РЎвЂўР  Р вЂ Р  РЎвЂќР  РЎвЂўР  РЎВР  Р’В±Р  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                nameEn: "Sovcombank bank",
                url: "https://sovcombank.ru/",
                backgroundColor: "#c9e4f6",
                backgroundColors: ["#c9e4f6", "#f5fafd"],
                backgroundLightness: "light",
                logoStyle: "colored",
                text: "#004281",
                alias: "ru-sovkom",
                country: "ru",
                logoPng: "ru-sovkom.png"
            },
            "ru-spb": {
                name: "Р  РІР‚ВР  Р’В°Р  Р вЂ¦Р  РЎвЂќ Р вЂ™Р’В«Р  Р Р‹Р  Р’В°Р  Р вЂ¦Р  РЎвЂќР РЋРІР‚С™-Р  РЎСџР  Р’ВµР РЋРІР‚С™Р  Р’ВµР РЋР вЂљР  Р’В±Р РЋРЎвЂњР РЋР вЂљР  РЎвЂ“Р вЂ™Р’В»",
                nameEn: "Bank Saint Petersburg",
                url: "https://www.bspb.ru/",
                backgroundColor: "#ffcfcf",
                backgroundColors: ["#ffcfcf", "#d2553f"],
                backgroundLightness: "light",
                logoStyle: "colored",
                text: "#000",
                alias: "ru-spb",
                country: "ru",
                logoPng: "ru-spb.png"
            },
            "ru-sviaz": {
                name: "Р  Р Р‹Р  Р вЂ Р РЋР РЏР  Р’В·Р РЋР Р‰-Р  РІР‚ВР  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                nameEn: "Sviaz-Bank",
                url: "https://www.sviaz-bank.ru/",
                backgroundColor: "#d2e0ec",
                backgroundColors: ["#d2e0ec", "#caecd8"],
                backgroundLightness: "light",
                logoStyle: "colored",
                text: "#165a9a",
                alias: "ru-sviaz",
                country: "ru",
                logoPng: "ru-sviaz.png"
            },
            "ru-tcb": {
                name: "Р  РЎС›Р РЋР вЂљР  Р’В°Р  Р вЂ¦Р РЋР С“Р  РЎвЂќР  Р’В°Р  РЎвЂ”Р  РЎвЂР РЋРІР‚С™Р  Р’В°Р  Р’В»Р  Р’В±Р  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                nameEn: "Transcapitalbank",
                url: "https://www.tkbbank.ru/",
                backgroundColor: "#8cf5f4",
                backgroundColors: ["#8cf5f4", "#ffe6bf"],
                backgroundLightness: "light",
                logoStyle: "colored",
                text: "#005599",
                alias: "ru-tcb",
                country: "ru",
                logoPng: "ru-tcb.png"
            },
            "ru-tinkoff": {
                name: "Р  РЎС›Р  РЎвЂР  Р вЂ¦Р РЋР Р‰Р  РЎвЂќР  РЎвЂўР РЋРІР‚С›Р РЋРІР‚С› Р  РІР‚ВР  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                nameEn: "Tinkoff Bank",
                url: "https://www.tinkoff.ru/",
                backgroundColor: "#333",
                backgroundColors: ["#444", "#222"],
                backgroundLightness: "dark",
                logoStyle: "white",
                text: "#fff",
                alias: "ru-tinkoff",
                country: "ru",
                logoPng: "ru-tinkoff.png",
                logoSvg: "ru-tinkoff.svg"
            },
            "ru-trust": {
                name: "Р  РЎС›Р РЋР вЂљР  Р’В°Р РЋР С“Р РЋРІР‚С™",
                nameEn: "Trust",
                url: "http://www.trust.ru/",
                backgroundColor: "#231f20",
                backgroundColors: ["#403739", "#231f20"],
                backgroundLightness: "dark",
                logoStyle: "white",
                text: "#fff",
                alias: "ru-trust",
                country: "ru",
                logoPng: "ru-trust.png"
            },
            "ru-ubrd": {
                name: "Р  Р в‚¬Р РЋР вЂљР  Р’В°Р  Р’В»Р РЋР Р‰Р РЋР С“Р  РЎвЂќР  РЎвЂР  РІвЂћвЂ“ Р  РІР‚ВР  Р’В°Р  Р вЂ¦Р  РЎвЂќ Р   Р  Р’ВµР  РЎвЂќР  РЎвЂўР  Р вЂ¦Р РЋР С“Р РЋРІР‚С™Р РЋР вЂљР РЋРЎвЂњР  РЎвЂќР РЋРІР‚ Р  РЎвЂР  РЎвЂ Р  РЎвЂ Р   Р  Р’В°Р  Р’В·Р  Р вЂ Р  РЎвЂР РЋРІР‚С™Р  РЎвЂР РЋР РЏ",
                nameEn: "UBRD",
                url: "http://www.ubrr.ru/",
                backgroundColor: "#ffd9e4",
                backgroundColors: ["#ffd9e4", "#b6d1e3"],
                backgroundLightness: "light",
                logoStyle: "black",
                text: "#000",
                alias: "ru-ubrd",
                country: "ru",
                logoPng: "ru-ubrd.png"
            },
            "ru-ucb": {
                name: "Р  Р’В®Р  Р вЂ¦Р  РЎвЂР  РЎв„ўР РЋР вЂљР  Р’ВµР  РўвЂР  РЎвЂР РЋРІР‚С™ Р  РІР‚ВР  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                nameEn: "UniCredit Bank",
                url: "https://www.unicreditbank.ru/",
                backgroundColor: "#250c0c",
                backgroundColors: ["#402727", "#250c0c"],
                backgroundLightness: "dark",
                logoStyle: "white",
                text: "#fff",
                alias: "ru-ucb",
                country: "ru",
                logoPng: "ru-ucb.png",
                logoSvg: "ru-ucb.svg"
            },
            "ru-uralsib": {
                name: "Р  РІР‚ВР  Р’В°Р  Р вЂ¦Р  РЎвЂќ Р  Р в‚¬Р РЋР вЂљР  Р’В°Р  Р’В»Р РЋР С“Р  РЎвЂР  Р’В±",
                nameEn: "Uralsib",
                url: "https://www.uralsib.ru/",
                backgroundColor: "#2c4257",
                backgroundColors: ["#6289aa", "#2c4257"],
                backgroundLightness: "dark",
                logoStyle: "white",
                text: "#fff",
                alias: "ru-uralsib",
                country: "ru",
                logoPng: "ru-uralsib.png",
                logoSvg: "ru-uralsib.svg"
            },
            "ru-vbrr": {
                name: "Р  РІР‚в„ўР РЋР С“Р  Р’ВµР РЋР вЂљР  РЎвЂўР РЋР С“Р РЋР С“Р  РЎвЂР  РІвЂћвЂ“Р РЋР С“Р  РЎвЂќР  РЎвЂР  РІвЂћвЂ“ Р  РІР‚ВР  Р’В°Р  Р вЂ¦Р  РЎвЂќ Р   Р  Р’В°Р  Р’В·Р  Р вЂ Р  РЎвЂР РЋРІР‚С™Р  РЎвЂР РЋР РЏ Р   Р  Р’ВµР  РЎвЂ“Р  РЎвЂР  РЎвЂўР  Р вЂ¦Р  РЎвЂўР  Р вЂ ",
                nameEn: "Russian Regional Development Bank",
                url: "https://www.vbrr.ru/",
                backgroundColor: "#173e6d",
                backgroundColors: ["#4a5e75", "#173e6d"],
                backgroundLightness: "dark",
                logoStyle: "white",
                text: "#fff",
                alias: "ru-vbrr",
                country: "ru",
                logoPng: "ru-vbrr.png",
                logoSvg: "ru-vbrr.svg"
            },
            "ru-veb": {
                name: "Р  РІР‚в„ўР  РЎвЂўР РЋР С“Р РЋРІР‚С™Р  РЎвЂўР РЋРІР‚РЋР  Р вЂ¦Р РЋРІР‚в„–Р  РІвЂћвЂ“ Р  Р’В­Р  РЎвЂќР РЋР С“Р  РЎвЂ”Р РЋР вЂљР  Р’ВµР РЋР С“Р РЋР С“ Р  РІР‚ВР  Р’В°Р  Р вЂ¦Р  РЎвЂќ",
                nameEn: "Eastern Express Bank",
                url: "https://www.vostbank.ru/",
                backgroundColor: "#004e96",
                backgroundColors: ["#004e96", "#ee3224"],
                backgroundLightness: "dark",
                logoStyle: "white",
                text: "#fff",
                alias: "ru-veb",
                country: "ru",
                logoPng: "ru-veb.png",
                logoSvg: "ru-veb.svg"
            },
            "ru-vozrozhdenie": {
                name: "Р  РІР‚в„ўР  РЎвЂўР  Р’В·Р РЋР вЂљР  РЎвЂўР  Р’В¶Р  РўвЂР  Р’ВµР  Р вЂ¦Р  РЎвЂР  Р’Вµ",
                nameEn: "Bank Vozrozhdenie",
                url: "http://www.vbank.ru/",
                backgroundColor: "#cedae6",
                backgroundColors: ["#cedae6", "#a4abb3"],
                backgroundLightness: "light",
                logoStyle: "colored",
                text: "#13427b",
                alias: "ru-vozrozhdenie",
                country: "ru",
                logoPng: "ru-vozrozhdenie.png",
                logoSvg: "ru-vozrozhdenie.svg"
            },
            "ru-vtb": {
                name: "Р  РІР‚в„ўР  РЎС›Р  РІР‚В Р  РІР‚ВР  Р’В°Р  Р вЂ¦Р  РЎвЂќ Р  РЎС™Р  РЎвЂўР РЋР С“Р  РЎвЂќР  Р вЂ Р РЋРІР‚в„–",
                nameEn: "VTB Bank",
                url: "http://www.vtb.ru/",
                backgroundColor: "#1d2d70",
                backgroundColors: ["#264489", "#1d2d70"],
                backgroundLightness: "dark",
                logoStyle: "white",
                text: "#fff",
                alias: "ru-vtb",
                country: "ru",
                logoPng: "ru-vtb.png",
                logoSvg: "ru-vtb.svg"
            },
            "ru-vtb24": {
                name: "Р  РІР‚в„ўР  РЎС›Р  РІР‚В 24",
                nameEn: "VTB 24",
                url: "https://www.vtb24.ru/",
                backgroundColor: "#c4cde4",
                backgroundColors: ["#c4cde4", "#9fabcc", "#dca9ad"],
                backgroundLightness: "light",
                logoStyle: "colored",
                text: "#0a2972",
                alias: "ru-vtb24",
                country: "ru",
                logoPng: "ru-vtb24.png"
            },
            "ru-zenit": {
                name: "Р  РІР‚вЂќР  Р’ВµР  Р вЂ¦Р  РЎвЂР РЋРІР‚С™",
                nameEn: "Zenit",
                url: "https://www.zenit.ru/",
                backgroundColor: "#008c99",
                backgroundColors: ["#3fc2ce", "#008c99"],
                backgroundLightness: "dark",
                logoStyle: "white",
                text: "#fff",
                alias: "ru-zenit",
                country: "ru",
                logoPng: "ru-zenit.png",
                logoSvg: "ru-zenit.svg"
            }
        }, u = {
            220001: "ru-gpb",
            220003: "ru-psb",
            220006: "ru-sviaz",
            220008: "ru-rossiya",
            220020: "ru-mib",
            220022: "ru-binbank",
            220023: "ru-avangard",
            220030: "ru-raiffeisen",
            220488: "ru-smp",
            360769: "ru-rsb",
            375117: "ru-rsb",
            400079: "ru-akbars",
            400171: "ru-reb",
            400244: "ru-uralsib",
            400812: "ru-rosbank",
            400814: "ru-rosbank",
            400866: "ru-rosbank",
            401173: "ru-open",
            402107: "ru-vtb",
            402177: "ru-raiffeisen",
            402178: "ru-raiffeisen",
            402179: "ru-raiffeisen",
            402311: "ru-otp",
            402312: "ru-otp",
            402313: "ru-otp",
            402326: "ru-mib",
            402327: "ru-mib",
            402328: "ru-mib",
            402333: "ru-sberbank",
            402429: "ru-globex",
            402457: "ru-novikom",
            402507: "ru-psb",
            402532: "ru-sovkom",
            402533: "ru-sovkom",
            402534: "ru-sovkom",
            402549: "ru-mib",
            402877: "ru-tcb",
            402909: "ru-novikom",
            402910: "ru-novikom",
            402911: "ru-novikom",
            402948: "ru-binbank",
            402949: "ru-binbank",
            403184: "ru-vozrozhdenie",
            403218: "ru-roscap",
            403324: "ru-globex",
            403780: "ru-mkb",
            403894: "ru-binbank",
            403896: "ru-avangard",
            403897: "ru-avangard",
            403898: "ru-avangard",
            404111: "ru-uralsib",
            404114: "ru-avangard",
            404136: "ru-gpb",
            404204: "ru-mts",
            404224: "ru-mts",
            404266: "ru-mts",
            404267: "ru-mts",
            404268: "ru-mts",
            404269: "ru-mts",
            404270: "ru-gpb",
            404586: "ru-open",
            404807: "ru-raiffeisen",
            404862: "ru-rosbank",
            404863: "ru-rosbank",
            404885: "ru-raiffeisen",
            404890: "ru-rosbank",
            404892: "ru-rosbank",
            404906: "ru-psb",
            405225: "ru-binbank",
            405226: "ru-binbank",
            405436: "ru-rosbank",
            405658: "ru-open",
            405665: "ru-roscap",
            405666: "ru-roscap",
            405667: "ru-roscap",
            405669: "ru-roscap",
            405870: "ru-open",
            405990: "ru-pochta",
            405991: "ru-pochta",
            405992: "ru-pochta",
            405993: "ru-pochta",
            406140: "ru-vbrr",
            406141: "ru-vbrr",
            406356: "ru-mts",
            406364: "ru-hcf",
            406372: "ru-absolut",
            406744: "ru-vtb24",
            406767: "ru-rosbank",
            406777: "ru-jugra",
            406778: "ru-jugra",
            406779: "ru-jugra",
            406780: "ru-jugra",
            406781: "ru-jugra",
            406977: "ru-vtb24",
            407178: "ru-open",
            407564: "ru-rosbank",
            408373: "ru-ceb",
            408396: "ru-alfa",
            408397: "ru-alfa",
            409356: "ru-open",
            409357: "ru-open",
            409358: "ru-open",
            409398: "ru-vtb24",
            409681: "ru-otp",
            409682: "ru-uralsib",
            409794: "ru-binbank",
            410085: "ru-binbank",
            410086: "ru-binbank",
            410213: "ru-uralsib",
            410323: "ru-trust",
            410584: "ru-alfa",
            410695: "ru-skb",
            410696: "ru-skb",
            410730: "ru-vozrozhdenie",
            410731: "ru-vozrozhdenie",
            411641: "ru-binbank",
            411647: "ru-ceb",
            411648: "ru-ceb",
            411649: "ru-ceb",
            411669: "ru-mob",
            411670: "ru-mob",
            411671: "ru-mob",
            411676: "ru-spb",
            411790: "ru-rsb",
            411791: "ru-psb",
            411900: "ru-trust",
            411945: "ru-roscap",
            412434: "ru-zenit",
            412519: "ru-rosbank",
            412746: "ru-binbank",
            412776: "ru-citi",
            413047: "ru-ucb",
            413052: "ru-vozrozhdenie",
            413203: "ru-vbrr",
            413204: "ru-vbrr",
            413205: "ru-vbrr",
            413877: "ru-skb",
            413878: "ru-skb",
            413879: "ru-skb",
            414035: "ru-vozrozhdenie",
            414076: "ru-open",
            414379: "ru-rosbank",
            414563: "ru-roscap",
            414656: "ru-zenit",
            414657: "ru-zenit",
            414658: "ru-zenit",
            414659: "ru-zenit",
            415025: "ru-ubrd",
            415400: "ru-alfa",
            415428: "ru-alfa",
            415429: "ru-alfa",
            415430: "ru-raiffeisen",
            415481: "ru-alfa",
            415482: "ru-alfa",
            415822: "ru-reb",
            416132: "ru-absolut",
            416700: "ru-binbank",
            416701: "ru-binbank",
            416702: "ru-binbank",
            416703: "ru-binbank",
            416790: "ru-binbank",
            416791: "ru-binbank",
            416792: "ru-binbank",
            416920: "ru-ceb",
            416927: "ru-vtb",
            416928: "ru-vtb",
            416982: "ru-rgs",
            416983: "ru-rgs",
            416984: "ru-rgs",
            417250: "ru-rsb",
            417251: "ru-rsb",
            417252: "ru-rsb",
            417253: "ru-rsb",
            417254: "ru-rsb",
            417291: "ru-rsb",
            417398: "ru-sberbank",
            417689: "ru-binbank",
            418260: "ru-vtb",
            418261: "ru-vtb",
            418262: "ru-vtb",
            418362: "ru-sovkom",
            418363: "ru-sovkom",
            418364: "ru-sovkom",
            418384: "ru-rshb",
            418385: "ru-rshb",
            418386: "ru-rshb",
            418387: "ru-rshb",
            418388: "ru-rshb",
            418831: "ru-vtb24",
            418906: "ru-reb",
            418907: "ru-reb",
            418908: "ru-reb",
            418909: "ru-reb",
            419149: "ru-atb",
            419150: "ru-atb",
            419151: "ru-atb",
            419152: "ru-atb",
            419153: "ru-atb",
            419163: "ru-avangard",
            419164: "ru-avangard",
            419292: "ru-mkb",
            419293: "ru-citi",
            419349: "ru-citi",
            419370: "ru-uralsib",
            419519: "ru-binbank",
            419539: "ru-alfa",
            419540: "ru-alfa",
            419636: "ru-otp",
            419718: "ru-rsb",
            419804: "ru-uralsib",
            419805: "ru-uralsib",
            419810: "ru-uralsib",
            419905: "ru-rossiya",
            420336: "ru-absolut",
            420337: "ru-absolut",
            420705: "ru-raiffeisen",
            421179: "ru-citi",
            421394: "ru-rosbank",
            421398: "ru-gpb",
            421637: "ru-sovkom",
            421647: "ru-sovkom",
            421648: "ru-rosbank",
            421651: "ru-binbank",
            421919: "ru-absolut",
            422096: "ru-sovkom",
            422097: "ru-sovkom",
            422098: "ru-binbank",
            422104: "ru-binbank",
            422105: "ru-binbank",
            422287: "ru-raiffeisen",
            422372: "ru-uralsib",
            422608: "ru-rshb",
            422838: "ru-vozrozhdenie",
            422839: "ru-vozrozhdenie",
            423078: "ru-sberbank",
            423169: "ru-rosbank",
            423197: "ru-spb",
            423218: "ru-vozrozhdenie",
            423569: "ru-absolut",
            424204: "ru-uralsib",
            424205: "ru-uralsib",
            424206: "ru-uralsib",
            424207: "ru-uralsib",
            424290: "ru-uralsib",
            424291: "ru-uralsib",
            424436: "ru-akbars",
            424437: "ru-akbars",
            424438: "ru-akbars",
            424439: "ru-akbars",
            424440: "ru-akbars",
            424473: "ru-uralsib",
            424474: "ru-uralsib",
            424475: "ru-uralsib",
            424476: "ru-uralsib",
            424553: "ru-trust",
            424554: "ru-trust",
            424555: "ru-trust",
            424561: "ru-psb",
            424562: "ru-psb",
            424563: "ru-psb",
            424901: "ru-sovkom",
            424917: "ru-gpb",
            424944: "ru-sovkom",
            424974: "ru-gpb",
            424975: "ru-gpb",
            424976: "ru-gpb",
            425153: "ru-rosbank",
            425534: "ru-veb",
            425535: "ru-veb",
            425553: "ru-veb",
            425620: "ru-raiffeisen",
            425693: "ru-smp",
            425694: "ru-smp",
            425695: "ru-smp",
            425696: "ru-smp",
            425874: "ru-binbank",
            425884: "ru-raiffeisen",
            425885: "ru-raiffeisen",
            426101: "ru-alfa",
            426102: "ru-alfa",
            426113: "ru-alfa",
            426114: "ru-alfa",
            426201: "ru-trust",
            426334: "ru-trust",
            426335: "ru-trust",
            426390: "ru-uralsib",
            426396: "ru-uralsib",
            426803: "ru-psb",
            426804: "ru-psb",
            426809: "ru-rossiya",
            426810: "ru-rossiya",
            426811: "ru-rossiya",
            426812: "ru-rossiya",
            426813: "ru-rossiya",
            426814: "ru-rossiya",
            426815: "ru-rossiya",
            426890: "ru-gpb",
            427229: "ru-vtb24",
            427230: "ru-vtb24",
            427326: "ru-gpb",
            427400: "ru-sberbank",
            427401: "ru-sberbank",
            427402: "ru-sberbank",
            427403: "ru-sberbank",
            427404: "ru-sberbank",
            427405: "ru-sberbank",
            427406: "ru-sberbank",
            427407: "ru-sberbank",
            427408: "ru-sberbank",
            427409: "ru-sberbank",
            427410: "ru-sberbank",
            427411: "ru-sberbank",
            427412: "ru-sberbank",
            427413: "ru-sberbank",
            427414: "ru-sberbank",
            427415: "ru-sberbank",
            427416: "ru-sberbank",
            427417: "ru-sberbank",
            427418: "ru-sberbank",
            427419: "ru-sberbank",
            427420: "ru-sberbank",
            427421: "ru-sberbank",
            427422: "ru-sberbank",
            427423: "ru-sberbank",
            427424: "ru-sberbank",
            427425: "ru-sberbank",
            427426: "ru-sberbank",
            427427: "ru-sberbank",
            427428: "ru-sberbank",
            427429: "ru-sberbank",
            427430: "ru-sberbank",
            427431: "ru-sberbank",
            427432: "ru-sberbank",
            427433: "ru-sberbank",
            427434: "ru-sberbank",
            427435: "ru-sberbank",
            427436: "ru-sberbank",
            427437: "ru-sberbank",
            427438: "ru-sberbank",
            427439: "ru-sberbank",
            427440: "ru-sberbank",
            427441: "ru-sberbank",
            427442: "ru-sberbank",
            427443: "ru-sberbank",
            427444: "ru-sberbank",
            427445: "ru-sberbank",
            427446: "ru-sberbank",
            427447: "ru-sberbank",
            427448: "ru-sberbank",
            427449: "ru-sberbank",
            427450: "ru-sberbank",
            427451: "ru-sberbank",
            427452: "ru-sberbank",
            427453: "ru-sberbank",
            427454: "ru-sberbank",
            427455: "ru-sberbank",
            427456: "ru-sberbank",
            427457: "ru-sberbank",
            427458: "ru-sberbank",
            427459: "ru-sberbank",
            427460: "ru-sberbank",
            427461: "ru-sberbank",
            427462: "ru-sberbank",
            427463: "ru-sberbank",
            427464: "ru-sberbank",
            427465: "ru-sberbank",
            427466: "ru-sberbank",
            427467: "ru-sberbank",
            427468: "ru-sberbank",
            427469: "ru-sberbank",
            427470: "ru-sberbank",
            427471: "ru-sberbank",
            427472: "ru-sberbank",
            427473: "ru-sberbank",
            427474: "ru-sberbank",
            427475: "ru-sberbank",
            427476: "ru-sberbank",
            427477: "ru-sberbank",
            427491: "ru-sberbank",
            427499: "ru-sberbank",
            427600: "ru-sberbank",
            427601: "ru-sberbank",
            427602: "ru-sberbank",
            427603: "ru-sberbank",
            427604: "ru-sberbank",
            427605: "ru-sberbank",
            427606: "ru-sberbank",
            427607: "ru-sberbank",
            427608: "ru-sberbank",
            427609: "ru-sberbank",
            427610: "ru-sberbank",
            427611: "ru-sberbank",
            427612: "ru-sberbank",
            427613: "ru-sberbank",
            427614: "ru-sberbank",
            427615: "ru-sberbank",
            427616: "ru-sberbank",
            427617: "ru-sberbank",
            427618: "ru-sberbank",
            427619: "ru-sberbank",
            427620: "ru-sberbank",
            427621: "ru-sberbank",
            427622: "ru-sberbank",
            427623: "ru-sberbank",
            427624: "ru-sberbank",
            427625: "ru-sberbank",
            427626: "ru-sberbank",
            427627: "ru-sberbank",
            427628: "ru-sberbank",
            427629: "ru-sberbank",
            427630: "ru-sberbank",
            427631: "ru-sberbank",
            427632: "ru-sberbank",
            427633: "ru-sberbank",
            427634: "ru-sberbank",
            427635: "ru-sberbank",
            427636: "ru-sberbank",
            427637: "ru-sberbank",
            427638: "ru-sberbank",
            427639: "ru-sberbank",
            427640: "ru-sberbank",
            427641: "ru-sberbank",
            427642: "ru-sberbank",
            427643: "ru-sberbank",
            427644: "ru-sberbank",
            427645: "ru-sberbank",
            427646: "ru-sberbank",
            427647: "ru-sberbank",
            427648: "ru-sberbank",
            427649: "ru-sberbank",
            427650: "ru-sberbank",
            427651: "ru-sberbank",
            427652: "ru-sberbank",
            427653: "ru-sberbank",
            427654: "ru-sberbank",
            427655: "ru-sberbank",
            427656: "ru-sberbank",
            427657: "ru-sberbank",
            427658: "ru-sberbank",
            427659: "ru-sberbank",
            427660: "ru-sberbank",
            427661: "ru-sberbank",
            427662: "ru-sberbank",
            427663: "ru-sberbank",
            427664: "ru-sberbank",
            427665: "ru-sberbank",
            427666: "ru-sberbank",
            427667: "ru-sberbank",
            427668: "ru-sberbank",
            427669: "ru-sberbank",
            427670: "ru-sberbank",
            427671: "ru-sberbank",
            427672: "ru-sberbank",
            427673: "ru-sberbank",
            427674: "ru-sberbank",
            427675: "ru-sberbank",
            427676: "ru-sberbank",
            427677: "ru-sberbank",
            427678: "ru-sberbank",
            427679: "ru-sberbank",
            427680: "ru-sberbank",
            427681: "ru-sberbank",
            427682: "ru-sberbank",
            427683: "ru-sberbank",
            427684: "ru-sberbank",
            427685: "ru-sberbank",
            427686: "ru-sberbank",
            427687: "ru-sberbank",
            427688: "ru-sberbank",
            427689: "ru-sberbank",
            427690: "ru-sberbank",
            427692: "ru-sberbank",
            427693: "ru-sberbank",
            427694: "ru-sberbank",
            427695: "ru-sberbank",
            427696: "ru-sberbank",
            427697: "ru-sberbank",
            427699: "ru-sberbank",
            427714: "ru-alfa",
            427715: "ru-rosbank",
            427725: "ru-binbank",
            427760: "ru-citi",
            427761: "ru-citi",
            427806: "ru-roscap",
            427807: "ru-roscap",
            427808: "ru-roscap",
            427827: "ru-uralsib",
            427828: "ru-uralsib",
            427853: "ru-sovkom",
            427900: "ru-sberbank",
            427901: "ru-sberbank",
            427902: "ru-sberbank",
            427903: "ru-sberbank",
            427904: "ru-sberbank",
            427905: "ru-sberbank",
            427906: "ru-sberbank",
            427907: "ru-sberbank",
            427908: "ru-sberbank",
            427909: "ru-sberbank",
            427910: "ru-sberbank",
            427911: "ru-sberbank",
            427912: "ru-sberbank",
            427913: "ru-sberbank",
            427914: "ru-sberbank",
            427915: "ru-sberbank",
            427916: "ru-sberbank",
            427917: "ru-sberbank",
            427918: "ru-sberbank",
            427919: "ru-sberbank",
            427920: "ru-sberbank",
            427921: "ru-sberbank",
            427922: "ru-sberbank",
            427923: "ru-sberbank",
            427924: "ru-sberbank",
            427925: "ru-sberbank",
            427926: "ru-sberbank",
            427927: "ru-sberbank",
            427928: "ru-sberbank",
            427929: "ru-sberbank",
            427930: "ru-sberbank",
            427931: "ru-sberbank",
            427932: "ru-sberbank",
            427933: "ru-sberbank",
            427934: "ru-sberbank",
            427935: "ru-sberbank",
            427936: "ru-sberbank",
            427937: "ru-sberbank",
            427938: "ru-sberbank",
            427939: "ru-sberbank",
            427940: "ru-sberbank",
            427941: "ru-sberbank",
            427942: "ru-sberbank",
            427943: "ru-sberbank",
            427944: "ru-sberbank",
            427945: "ru-sberbank",
            427946: "ru-sberbank",
            427947: "ru-sberbank",
            427948: "ru-sberbank",
            427949: "ru-sberbank",
            427950: "ru-sberbank",
            427951: "ru-sberbank",
            427952: "ru-sberbank",
            427953: "ru-sberbank",
            427954: "ru-sberbank",
            427955: "ru-sberbank",
            427956: "ru-sberbank",
            427957: "ru-sberbank",
            427958: "ru-sberbank",
            427959: "ru-sberbank",
            427960: "ru-sberbank",
            427961: "ru-sberbank",
            427962: "ru-sberbank",
            427963: "ru-sberbank",
            427964: "ru-sberbank",
            427965: "ru-sberbank",
            427966: "ru-sberbank",
            427967: "ru-sberbank",
            427968: "ru-sberbank",
            427969: "ru-sberbank",
            427970: "ru-sberbank",
            427971: "ru-sberbank",
            427972: "ru-sberbank",
            427973: "ru-sberbank",
            427974: "ru-sberbank",
            427975: "ru-sberbank",
            427976: "ru-sberbank",
            427977: "ru-sberbank",
            427978: "ru-sberbank",
            427979: "ru-sberbank",
            427980: "ru-sberbank",
            427981: "ru-sberbank",
            427982: "ru-sberbank",
            427983: "ru-sberbank",
            427984: "ru-sberbank",
            427985: "ru-sberbank",
            427986: "ru-sberbank",
            427987: "ru-sberbank",
            427988: "ru-sberbank",
            427989: "ru-sberbank",
            427990: "ru-sberbank",
            427991: "ru-sberbank",
            427992: "ru-sberbank",
            427993: "ru-sberbank",
            427994: "ru-sberbank",
            427995: "ru-sberbank",
            427996: "ru-sberbank",
            427997: "ru-sberbank",
            427998: "ru-sberbank",
            427999: "ru-sberbank",
            428252: "ru-absolut",
            428253: "ru-absolut",
            428254: "ru-absolut",
            428266: "ru-zenit",
            428666: "ru-atb",
            428804: "ru-alfa",
            428905: "ru-alfa",
            428906: "ru-alfa",
            428925: "ru-spb",
            429015: "ru-veb",
            429016: "ru-veb",
            429037: "ru-open",
            429038: "ru-open",
            429039: "ru-open",
            429040: "ru-open",
            429096: "ru-open",
            429196: "ru-uralsib",
            429197: "ru-uralsib",
            429565: "ru-vtb24",
            429749: "ru-vtb24",
            429796: "ru-zenit",
            429797: "ru-zenit",
            429798: "ru-zenit",
            429811: "ru-uralsib",
            430081: "ru-rosbank",
            430088: "ru-rosbank",
            430180: "ru-ubrd",
            430181: "ru-ubrd",
            430289: "ru-sviaz",
            430299: "ru-gpb",
            430323: "ru-ucb",
            430439: "ru-ubrd",
            430708: "ru-rossiya",
            430709: "ru-rossiya",
            431112: "ru-uralsib",
            431113: "ru-uralsib",
            431114: "ru-uralsib",
            431165: "ru-open",
            431166: "ru-open",
            431359: "ru-rgs",
            431416: "ru-alfa",
            431417: "ru-alfa",
            431727: "ru-alfa",
            431854: "ru-ren",
            431855: "ru-ren",
            431856: "ru-ren",
            431857: "ru-ren",
            431890: "ru-ren",
            432050: "ru-globex",
            432058: "ru-skb",
            432158: "ru-ceb",
            432169: "ru-uralsib",
            432259: "ru-uralsib",
            432260: "ru-uralsib",
            432417: "ru-open",
            432498: "ru-raiffeisen",
            432560: "ru-ucb",
            432638: "ru-rosbank",
            432947: "ru-otp",
            432948: "ru-otp",
            432949: "ru-otp",
            433011: "ru-uralsib",
            433102: "ru-vozrozhdenie",
            433300: "ru-ucb",
            433316: "ru-gpb",
            433336: "ru-ucb",
            434135: "ru-alfa",
            434146: "ru-open",
            434147: "ru-open",
            434148: "ru-open",
            434149: "ru-uralsib",
            435139: "ru-ubrd",
            435986: "ru-rshb",
            436100: "ru-rshb",
            436104: "ru-rshb",
            436398: "ru-novikom",
            436865: "ru-otp",
            437348: "ru-rsb",
            437349: "ru-spb",
            437524: "ru-skb",
            437540: "ru-trust",
            437541: "ru-trust",
            437772: "ru-tinkoff",
            437773: "ru-tinkoff",
            437784: "ru-tinkoff",
            438046: "ru-citi",
            438143: "ru-alfa",
            438254: "ru-vozrozhdenie",
            438933: "ru-rosbank",
            438970: "ru-rosbank",
            438971: "ru-rosbank",
            439000: "ru-alfa",
            439054: "ru-sviaz",
            439055: "ru-sviaz",
            439056: "ru-sviaz",
            439057: "ru-sviaz",
            439077: "ru-alfa",
            439243: "ru-globex",
            439244: "ru-globex",
            439245: "ru-globex",
            439246: "ru-globex",
            439250: "ru-globex",
            439251: "ru-globex",
            440237: "ru-alfa",
            440399: "ru-vozrozhdenie",
            440503: "ru-rosbank",
            440504: "ru-rosbank",
            440505: "ru-rosbank",
            440540: "ru-rosbank",
            440541: "ru-rosbank",
            440610: "ru-uralsib",
            440664: "ru-uralsib",
            440665: "ru-uralsib",
            440666: "ru-uralsib",
            440668: "ru-uralsib",
            440680: "ru-uralsib",
            440682: "ru-uralsib",
            440683: "ru-uralsib",
            440689: "ru-uralsib",
            440690: "ru-uralsib",
            440849: "ru-rosbank",
            440850: "ru-rosbank",
            441108: "ru-globex",
            441273: "ru-vbrr",
            441318: "ru-sviaz",
            442466: "ru-uralsib",
            443222: "ru-mkb",
            443223: "ru-mkb",
            443271: "ru-mkb",
            443272: "ru-mkb",
            443273: "ru-mkb",
            443274: "ru-mkb",
            443275: "ru-roscap",
            443306: "ru-absolut",
            443307: "ru-absolut",
            443308: "ru-absolut",
            443309: "ru-absolut",
            443884: "ru-veb",
            443885: "ru-veb",
            443886: "ru-veb",
            443887: "ru-veb",
            443888: "ru-veb",
            444002: "ru-binbank",
            444023: "ru-binbank",
            444024: "ru-binbank",
            444025: "ru-binbank",
            444094: "ru-veb",
            444238: "ru-smp",
            444239: "ru-smp",
            444240: "ru-smp",
            444241: "ru-smp",
            444429: "ru-rsb",
            445433: "ru-hcf",
            445434: "ru-hcf",
            445435: "ru-hcf",
            445436: "ru-hcf",
            445977: "ru-raiffeisen",
            446050: "ru-psb",
            446065: "ru-open",
            446098: "ru-hcf",
            446320: "ru-veb",
            446674: "ru-vtb",
            446915: "ru-hcf",
            446916: "ru-raiffeisen",
            446917: "ru-raiffeisen",
            446950: "ru-tcb",
            447362: "ru-binbank",
            447363: "ru-binbank",
            447516: "ru-trust",
            447603: "ru-raiffeisen",
            447624: "ru-raiffeisen",
            447817: "ru-psb",
            447818: "ru-psb",
            447824: "ru-psb",
            448331: "ru-vtb24",
            448343: "ru-vtb24",
            448344: "ru-vtb24",
            448346: "ru-vtb24",
            448369: "ru-vtb24",
            449572: "ru-hcf",
            450251: "ru-rosbank",
            451382: "ru-psb",
            452235: "ru-rossiya",
            452236: "ru-rossiya",
            453558: "ru-uralsib",
            453559: "ru-uralsib",
            453560: "ru-uralsib",
            453561: "ru-uralsib",
            456515: "ru-trust",
            456516: "ru-trust",
            456587: "ru-ceb",
            456588: "ru-ceb",
            457647: "ru-rsb",
            457802: "ru-mts",
            457816: "ru-open",
            457817: "ru-open",
            457818: "ru-open",
            457819: "ru-open",
            458218: "ru-binbank",
            458279: "ru-alfa",
            458280: "ru-alfa",
            458281: "ru-alfa",
            458410: "ru-alfa",
            458411: "ru-alfa",
            458443: "ru-alfa",
            458450: "ru-alfa",
            458473: "ru-atb",
            458488: "ru-atb",
            458489: "ru-atb",
            458490: "ru-atb",
            458493: "ru-open",
            458559: "ru-novikom",
            458722: "ru-rossiya",
            458723: "ru-rossiya",
            458731: "ru-absolut",
            459226: "ru-skb",
            459230: "ru-otp",
            459290: "ru-uralsib",
            459328: "ru-roscap",
            459937: "ru-rosbank",
            460493: "ru-rosbank",
            462013: "ru-mts",
            462235: "ru-vtb24",
            462729: "ru-raiffeisen",
            462730: "ru-raiffeisen",
            462758: "ru-raiffeisen",
            462776: "ru-ucb",
            462779: "ru-raiffeisen",
            464405: "ru-vozrozhdenie",
            464485: "ru-trust",
            464636: "ru-akbars",
            464787: "ru-vtb24",
            464827: "ru-absolut",
            464828: "ru-absolut",
            464842: "ru-vtb24",
            465203: "ru-binbank",
            465204: "ru-binbank",
            465205: "ru-binbank",
            465227: "ru-alfa",
            465578: "ru-raiffeisen",
            465882: "ru-gpb",
            466047: "ru-uralsib",
            466048: "ru-uralsib",
            466049: "ru-uralsib",
            466050: "ru-uralsib",
            466163: "ru-ren",
            466164: "ru-ren",
            466174: "ru-ren",
            466500: "ru-roscap",
            466505: "ru-roscap",
            466511: "ru-roscap",
            466512: "ru-roscap",
            466513: "ru-roscap",
            466514: "ru-roscap",
            467033: "ru-trust",
            467058: "ru-vtb24",
            467485: "ru-open",
            467486: "ru-open",
            467487: "ru-open",
            467564: "ru-sviaz",
            467810: "ru-uralsib",
            467811: "ru-uralsib",
            467812: "ru-uralsib",
            467933: "ru-roscap",
            468596: "ru-smp",
            469339: "ru-binbank",
            469360: "ru-citi",
            469362: "ru-ucb",
            469376: "ru-globex",
            469670: "ru-smp",
            470127: "ru-tinkoff",
            470342: "ru-uralsib",
            470434: "ru-zenit",
            470673: "ru-avangard",
            470674: "ru-avangard",
            470675: "ru-avangard",
            471225: "ru-rgs",
            471226: "ru-ubrd",
            471358: "ru-mkb",
            471436: "ru-novikom",
            471439: "ru-uralsib",
            471440: "ru-uralsib",
            471441: "ru-uralsib",
            471487: "ru-vtb24",
            471499: "ru-uralsib",
            472235: "ru-zenit",
            472252: "ru-reb",
            472313: "ru-vtb",
            472345: "ru-psb",
            472346: "ru-psb",
            472347: "ru-psb",
            472348: "ru-psb",
            472445: "ru-hcf",
            472446: "ru-ucb",
            472480: "ru-mib",
            472489: "ru-rgs",
            472879: "ru-skb",
            472933: "ru-veb",
            472934: "ru-veb",
            473841: "ru-rgs",
            473849: "ru-citi",
            473850: "ru-citi",
            473853: "ru-rosbank",
            473854: "ru-rosbank",
            473855: "ru-rosbank",
            473869: "ru-tcb",
            474218: "ru-rosbank",
            475098: "ru-sviaz",
            475791: "ru-alfa",
            476036: "ru-raiffeisen",
            476206: "ru-psb",
            476207: "ru-psb",
            476208: "ru-psb",
            476280: "ru-rossiya",
            476804: "ru-veb",
            476827: "ru-rosbank",
            476946: "ru-rossiya",
            477714: "ru-alfa",
            477908: "ru-rosbank",
            477932: "ru-alfa",
            477960: "ru-alfa",
            477964: "ru-alfa",
            477986: "ru-rosbank",
            478264: "ru-rosbank",
            478265: "ru-rosbank",
            478266: "ru-rosbank",
            478273: "ru-avangard",
            478387: "ru-atb",
            478474: "ru-tcb",
            478475: "ru-tcb",
            478476: "ru-tcb",
            478741: "ru-raiffeisen",
            478752: "ru-alfa",
            479004: "ru-alfa",
            479087: "ru-alfa",
            479713: "ru-spb",
            479768: "ru-spb",
            479769: "ru-spb",
            479770: "ru-spb",
            479771: "ru-spb",
            479772: "ru-spb",
            479773: "ru-spb",
            479788: "ru-spb",
            480232: "ru-zenit",
            480623: "ru-alfa",
            480938: "ru-mib",
            481776: "ru-sberbank",
            481779: "ru-sberbank",
            481781: "ru-sberbank",
            482413: "ru-psb",
            483175: "ru-rsb",
            483176: "ru-rsb",
            483177: "ru-rsb",
            483973: "ru-uralsib",
            483974: "ru-uralsib",
            483975: "ru-uralsib",
            483976: "ru-uralsib",
            483977: "ru-uralsib",
            483979: "ru-uralsib",
            483980: "ru-uralsib",
            484800: "ru-open",
            485071: "ru-rossiya",
            485463: "ru-sberbank",
            485467: "ru-citi",
            485608: "ru-ucb",
            485649: "ru-open",
            486031: "ru-trust",
            486065: "ru-rsb",
            486322: "ru-mob",
            486666: "ru-citi",
            487415: "ru-gpb",
            487416: "ru-gpb",
            487417: "ru-gpb",
            488951: "ru-skb",
            489042: "ru-ucb",
            489099: "ru-ucb",
            489169: "ru-uralsib",
            489186: "ru-reb",
            489195: "ru-vtb",
            489196: "ru-vtb",
            489327: "ru-vtb24",
            489347: "ru-vtb24",
            489348: "ru-vtb24",
            489349: "ru-vtb24",
            489350: "ru-vtb24",
            489354: "ru-gpb",
            490736: "ru-vozrozhdenie",
            490815: "ru-uralsib",
            490816: "ru-raiffeisen",
            490818: "ru-ucb",
            490855: "ru-ucb",
            490986: "ru-trust",
            493475: "ru-trust",
            494343: "ru-trust",
            498629: "ru-vtb24",
            498868: "ru-vozrozhdenie",
            499932: "ru-rosbank",
            499966: "ru-rosbank",
            508406: "ru-raiffeisen",
            510047: "ru-rsb",
            510060: "ru-vtb",
            510069: "ru-raiffeisen",
            510070: "ru-raiffeisen",
            510074: "ru-ucb",
            510082: "ru-roscap",
            510092: "ru-rsb",
            510098: "ru-rosbank",
            510125: "ru-roscap",
            510126: "ru-alfa",
            510144: "ru-vtb24",
            510154: "ru-mib",
            510162: "ru-roscap",
            510166: "ru-roscap",
            510172: "ru-uralsib",
            510173: "ru-roscap",
            510411: "ru-uralsib",
            510412: "ru-uralsib",
            510424: "ru-uralsib",
            510429: "ru-uralsib",
            510436: "ru-uralsib",
            510444: "ru-uralsib",
            510453: "ru-rosbank",
            510464: "ru-zenit",
            510469: "ru-zenit",
            510483: "ru-uralsib",
            510494: "ru-uralsib",
            510495: "ru-vtb",
            510499: "ru-uralsib",
            510508: "ru-uralsib",
            510511: "ru-mib",
            511741: "ru-uralsib",
            512003: "ru-rosbank",
            512051: "ru-roscap",
            512082: "ru-roscap",
            512273: "ru-ceb",
            512298: "ru-uralsib",
            512347: "ru-roscap",
            512378: "ru-vtb",
            512394: "ru-uralsib",
            512419: "ru-uralsib",
            512424: "ru-uralsib",
            512442: "ru-roscap",
            512444: "ru-ren",
            512449: "ru-zenit",
            512450: "ru-vtb",
            512478: "ru-rgs",
            512510: "ru-uralsib",
            512594: "ru-roscap",
            512626: "ru-roscap",
            512636: "ru-uralsib",
            512641: "ru-roscap",
            512643: "ru-roscap",
            512741: "ru-uralsib",
            512756: "ru-rosbank",
            512762: "ru-citi",
            512771: "ru-rosbank",
            512777: "ru-uralsib",
            512788: "ru-uralsib",
            512808: "ru-rosbank",
            512821: "ru-roscap",
            513022: "ru-rosbank",
            513222: "ru-uralsib",
            513459: "ru-roscap",
            513691: "ru-rsb",
            513768: "ru-roscap",
            513769: "ru-roscap",
            514014: "ru-roscap",
            514017: "ru-open",
            514082: "ru-gpb",
            514515: "ru-uralsib",
            514529: "ru-rosbank",
            514930: "ru-rosbank",
            515243: "ru-open",
            515548: "ru-sberbank",
            515587: "ru-mib",
            515605: "ru-rosbank",
            515681: "ru-jugra",
            515739: "ru-mib",
            515760: "ru-zenit",
            515764: "ru-smp",
            515770: "ru-mkb",
            515774: "ru-otp",
            515777: "ru-uralsib",
            515785: "ru-binbank",
            515792: "ru-uralsib",
            515840: "ru-uralsib",
            515842: "ru-sberbank",
            515844: "ru-uralsib",
            515848: "ru-psb",
            515854: "ru-citi",
            515861: "ru-uralsib",
            515862: "ru-roscap",
            515876: "ru-raiffeisen",
            515887: "ru-uralsib",
            515899: "ru-open",
            515900: "ru-uralsib",
            516009: "ru-otp",
            516025: "ru-uralsib",
            516116: "ru-ren",
            516150: "ru-ren",
            516161: "ru-uralsib",
            516206: "ru-uralsib",
            516333: "ru-zenit",
            516354: "ru-open",
            516356: "ru-mib",
            516358: "ru-zenit",
            516372: "ru-zenit",
            516387: "ru-open",
            516444: "ru-hcf",
            516445: "ru-uralsib",
            516448: "ru-uralsib",
            516454: "ru-gpb",
            516456: "ru-zenit",
            516473: "ru-psb",
            516570: "ru-vtb",
            516587: "ru-vtb",
            516906: "ru-trust",
            517202: "ru-otp",
            517375: "ru-gpb",
            517508: "ru-open",
            517538: "ru-rosbank",
            517583: "ru-rosbank",
            517593: "ru-gpb",
            517667: "ru-zenit",
            517803: "ru-roscap",
            517807: "ru-roscap",
            517822: "ru-rosbank",
            517955: "ru-mts",
            518025: "ru-uralsib",
            518038: "ru-rosbank",
            518048: "ru-uralsib",
            518079: "ru-rosbank",
            518095: "ru-uralsib",
            518223: "ru-uralsib",
            518228: "ru-gpb",
            518275: "ru-uralsib",
            518316: "ru-uralsib",
            518318: "ru-uralsib",
            518331: "ru-roscap",
            518365: "ru-roscap",
            518372: "ru-uralsib",
            518373: "ru-gpb",
            518392: "ru-uralsib",
            518406: "ru-rosbank",
            518449: "ru-uralsib",
            518499: "ru-uralsib",
            518505: "ru-vtb",
            518522: "ru-uralsib",
            518533: "ru-uralsib",
            518580: "ru-rosbank",
            518586: "ru-binbank",
            518591: "ru-vtb24",
            518598: "ru-roscap",
            518607: "ru-uralsib",
            518621: "ru-uralsib",
            518640: "ru-vtb24",
            518642: "ru-rosbank",
            518647: "ru-zenit",
            518681: "ru-avangard",
            518683: "ru-uralsib",
            518704: "ru-gpb",
            518714: "ru-rosbank",
            518727: "ru-uralsib",
            518753: "ru-trust",
            518774: "ru-reb",
            518781: "ru-reb",
            518788: "ru-binbank",
            518795: "ru-roscap",
            518805: "ru-uralsib",
            518816: "ru-gpb",
            518820: "ru-smp",
            518827: "ru-sviaz",
            518864: "ru-rosbank",
            518874: "ru-uralsib",
            518876: "ru-binbank",
            518882: "ru-rosbank",
            518884: "ru-smp",
            518885: "ru-trust",
            518889: "ru-rosbank",
            518901: "ru-tinkoff",
            518902: "ru-gpb",
            518909: "ru-uralsib",
            518911: "ru-uralsib",
            518916: "ru-roscap",
            518946: "ru-psb",
            518970: "ru-psb",
            518971: "ru-sviaz",
            518977: "ru-psb",
            518981: "ru-psb",
            518996: "ru-ucb",
            518997: "ru-ucb",
            519304: "ru-vtb24",
            519327: "ru-roscap",
            519333: "ru-vozrozhdenie",
            519346: "ru-uralsib",
            519350: "ru-roscap",
            519747: "ru-alfa",
            519778: "ru-alfa",
            519998: "ru-vtb24",
            520006: "ru-uralsib",
            520035: "ru-uralsib",
            520036: "ru-rosbank",
            520047: "ru-rosbank",
            520085: "ru-psb",
            520088: "ru-psb",
            520093: "ru-roscap",
            520113: "ru-mib",
            520305: "ru-citi",
            520306: "ru-citi",
            520328: "ru-binbank",
            520348: "ru-roscap",
            520350: "ru-zenit",
            520373: "ru-citi",
            520377: "ru-citi",
            520633: "ru-sberbank",
            520666: "ru-roscap",
            520685: "ru-roscap",
            520902: "ru-rosbank",
            520905: "ru-ren",
            520920: "ru-smp",
            520935: "ru-akbars",
            520957: "ru-citi",
            520985: "ru-akbars",
            520993: "ru-citi",
            520996: "ru-uralsib",
            521124: "ru-psb",
            521144: "ru-ceb",
            521155: "ru-gpb",
            521159: "ru-mts",
            521172: "ru-rgs",
            521178: "ru-alfa",
            521194: "ru-zenit",
            521310: "ru-rgs",
            521324: "ru-tinkoff",
            521326: "ru-smp",
            521330: "ru-otp",
            521374: "ru-rosbank",
            521379: "ru-uralsib",
            521381: "ru-uralsib",
            521508: "ru-rosbank",
            521528: "ru-mob",
            521589: "ru-zenit",
            521658: "ru-uralsib",
            521779: "ru-uralsib",
            521801: "ru-mkb",
            521820: "ru-uralsib",
            521830: "ru-ceb",
            521847: "ru-uralsib",
            521879: "ru-uralsib",
            522016: "ru-binbank",
            522022: "ru-uralsib",
            522042: "ru-roscap",
            522083: "ru-uralsib",
            522117: "ru-open",
            522193: "ru-gpb",
            522199: "ru-hcf",
            522212: "ru-uralsib",
            522223: "ru-avangard",
            522224: "ru-avangard",
            522230: "ru-uralsib",
            522455: "ru-rsb",
            522456: "ru-zenit",
            522458: "ru-ucb",
            522470: "ru-otp",
            522477: "ru-gpb",
            522511: "ru-rosbank",
            522513: "ru-rosbank",
            522588: "ru-rsb",
            522592: "ru-cetelem",
            522598: "ru-vtb24",
            522705: "ru-rosbank",
            522711: "ru-rosbank",
            522826: "ru-gpb",
            522828: "ru-alfa",
            522833: "ru-roscap",
            522851: "ru-zenit",
            522858: "ru-spb",
            522860: "ru-sberbank",
            522862: "ru-roscap",
            522881: "ru-sovkom",
            522965: "ru-uralsib",
            522970: "ru-uralsib",
            522988: "ru-gpb",
            522989: "ru-gpb",
            523281: "ru-uralsib",
            523436: "ru-roscap",
            523546: "ru-roscap",
            523558: "ru-roscap",
            523559: "ru-roscap",
            523688: "ru-psb",
            523701: "ru-alfa",
            523755: "ru-zenit",
            523787: "ru-rosbank",
            524001: "ru-rosbank",
            524004: "ru-uralsib",
            524381: "ru-rsb",
            524390: "ru-uralsib",
            524448: "ru-rshb",
            524468: "ru-tinkoff",
            524477: "ru-vtb",
            524602: "ru-mts",
            524614: "ru-rosbank",
            524620: "ru-citi",
            524655: "ru-mkb",
            524665: "ru-ceb",
            524776: "ru-uralsib",
            524818: "ru-uralsib",
            524829: "ru-sberbank",
            524835: "ru-hcf",
            524838: "ru-open",
            524853: "ru-mib",
            524856: "ru-roscap",
            524861: "ru-rosbank",
            524862: "ru-binbank",
            524943: "ru-mob",
            525236: "ru-uralsib",
            525245: "ru-rosbank",
            525247: "ru-rosbank",
            525248: "ru-uralsib",
            525443: "ru-uralsib",
            525446: "ru-rshb",
            525494: "ru-psb",
            525689: "ru-citi",
            525696: "ru-uralsib",
            525714: "ru-uralsib",
            525719: "ru-open",
            525735: "ru-roscap",
            525740: "ru-gpb",
            525741: "ru-rosbank",
            525744: "ru-binbank",
            525751: "ru-uralsib",
            525758: "ru-roscap",
            525767: "ru-roscap",
            525768: "ru-roscap",
            525776: "ru-roscap",
            525778: "ru-rosbank",
            525781: "ru-roscap",
            525784: "ru-gpb",
            525794: "ru-rosbank",
            525833: "ru-gpb",
            525932: "ru-trust",
            525933: "ru-hcf",
            526090: "ru-roscap",
            526280: "ru-psb",
            526393: "ru-roscap",
            526462: "ru-rosbank",
            526469: "ru-vozrozhdenie",
            526483: "ru-gpb",
            526532: "ru-vtb",
            526589: "ru-vtb24",
            526818: "ru-rgs",
            526839: "ru-otp",
            526857: "ru-uralsib",
            526891: "ru-zenit",
            526940: "ru-roscap",
            526981: "ru-rosbank",
            526984: "ru-rosbank",
            526992: "ru-uralsib",
            527001: "ru-uralsib",
            527023: "ru-mob",
            527196: "ru-uralsib",
            527348: "ru-sviaz",
            527393: "ru-rosbank",
            527415: "ru-roscap",
            527444: "ru-gpb",
            527450: "ru-binbank",
            527574: "ru-uralsib",
            527576: "ru-sberbank",
            527594: "ru-citi",
            527622: "ru-roscap",
            527640: "ru-rosbank",
            527643: "ru-rosbank",
            527658: "ru-uralsib",
            527663: "ru-rosbank",
            527785: "ru-vtb",
            527792: "ru-mib",
            527798: "ru-vtb",
            527883: "ru-vtb24",
            528014: "ru-uralsib",
            528015: "ru-rosbank",
            528016: "ru-roscap",
            528053: "ru-raiffeisen",
            528068: "ru-uralsib",
            528090: "ru-rosbank",
            528154: "ru-vtb24",
            528249: "ru-vbrr",
            528270: "ru-rosbank",
            528588: "ru-akbars",
            528593: "ru-roscap",
            528701: "ru-psb",
            528704: "ru-uralsib",
            528808: "ru-raiffeisen",
            528809: "ru-raiffeisen",
            528819: "ru-rosbank",
            528933: "ru-rosbank",
            529025: "ru-vtb24",
            529071: "ru-roscap",
            529100: "ru-rosbank",
            529101: "ru-rosbank",
            529160: "ru-psb",
            529170: "ru-sovkom",
            529208: "ru-zenit",
            529247: "ru-rosbank",
            529260: "ru-open",
            529273: "ru-uralsib",
            529278: "ru-gpb",
            529293: "ru-uralsib",
            529295: "ru-smp",
            529426: "ru-roscap",
            529436: "ru-uralsib",
            529437: "ru-rosbank",
            529446: "ru-roscap",
            529448: "ru-roscap",
            529450: "ru-uralsib",
            529461: "ru-uralsib",
            529488: "ru-gpb",
            529497: "ru-roscap",
            529813: "ru-rosbank",
            529860: "ru-uralsib",
            529862: "ru-rosbank",
            529889: "ru-sviaz",
            529938: "ru-vtb24",
            529968: "ru-otp",
            530035: "ru-uralsib",
            530036: "ru-smp",
            530078: "ru-roscap",
            530114: "ru-gpb",
            530142: "ru-uralsib",
            530143: "ru-uralsib",
            530145: "ru-uralsib",
            530171: "ru-sviaz",
            530172: "ru-ucb",
            530183: "ru-open",
            530184: "ru-vtb24",
            530215: "ru-rosbank",
            530229: "ru-vtb",
            530266: "ru-citi",
            530279: "ru-uralsib",
            530403: "ru-open",
            530412: "ru-rosbank",
            530413: "ru-atb",
            530416: "ru-rosbank",
            530441: "ru-psb",
            530445: "ru-sovkom",
            530526: "ru-uralsib",
            530527: "ru-absolut",
            530595: "ru-roscap",
            530758: "ru-uralsib",
            530800: "ru-rosbank",
            530827: "ru-alfa",
            530867: "ru-raiffeisen",
            530900: "ru-spb",
            530979: "ru-uralsib",
            530993: "ru-gpb",
            531034: "ru-ceb",
            531038: "ru-uralsib",
            531073: "ru-uralsib",
            531207: "ru-uralsib",
            531222: "ru-rosbank",
            531233: "ru-vtb24",
            531236: "ru-ucb",
            531237: "ru-alfa",
            531305: "ru-gpb",
            531310: "ru-sberbank",
            531315: "ru-ren",
            531316: "ru-avangard",
            531318: "ru-trust",
            531327: "ru-hcf",
            531332: "ru-sviaz",
            531344: "ru-ucb",
            531351: "ru-binbank",
            531425: "ru-binbank",
            531428: "ru-otp",
            531452: "ru-vtb",
            531534: "ru-psb",
            531562: "ru-roscap",
            531652: "ru-roscap",
            531657: "ru-uralsib",
            531674: "ru-open",
            531809: "ru-citi",
            531853: "ru-binbank",
            531858: "ru-uralsib",
            531943: "ru-psb",
            532058: "ru-rosbank",
            532130: "ru-open",
            532184: "ru-mkb",
            532186: "ru-spb",
            532301: "ru-open",
            532310: "ru-roscap",
            532315: "ru-ceb",
            532320: "ru-uralsib",
            532326: "ru-cetelem",
            532328: "ru-uralsib",
            532334: "ru-roscap",
            532336: "ru-rosbank",
            532356: "ru-vbrr",
            532436: "ru-roscap",
            532441: "ru-roscap",
            532461: "ru-zenit",
            532463: "ru-zenit",
            532472: "ru-uralsib",
            532475: "ru-uralsib",
            532583: "ru-uralsib",
            532684: "ru-gpb",
            532809: "ru-rosbank",
            532835: "ru-binbank",
            532917: "ru-roscap",
            532921: "ru-roscap",
            532947: "ru-atb",
            532974: "ru-citi",
            533151: "ru-binbank",
            533166: "ru-uralsib",
            533201: "ru-citi",
            533205: "ru-sberbank",
            533206: "ru-avangard",
            533213: "ru-mts",
            533214: "ru-zenit",
            533327: "ru-gpb",
            533469: "ru-rsb",
            533594: "ru-raiffeisen",
            533595: "ru-sovkom",
            533611: "ru-uralsib",
            533614: "ru-binbank",
            533616: "ru-raiffeisen",
            533668: "ru-roscap",
            533669: "ru-sberbank",
            533681: "ru-citi",
            533684: "ru-rosbank",
            533685: "ru-otp",
            533689: "ru-rsb",
            533725: "ru-roscap",
            533736: "ru-mts",
            533794: "ru-roscap",
            533795: "ru-rosbank",
            533925: "ru-rosbank",
            533954: "ru-zenit",
            534128: "ru-uralsib",
            534130: "ru-gpb",
            534132: "ru-uralsib",
            534134: "ru-roscap",
            534136: "ru-uralsib",
            534148: "ru-uralsib",
            534156: "ru-uralsib",
            534162: "ru-rshb",
            534171: "ru-gpb",
            534183: "ru-roscap",
            534194: "ru-uralsib",
            534196: "ru-gpb",
            534251: "ru-rosbank",
            534254: "ru-vozrozhdenie",
            534266: "ru-rsb",
            534293: "ru-rosbank",
            534296: "ru-uralsib",
            534297: "ru-rosbank",
            534449: "ru-rosbank",
            534462: "ru-psb",
            534469: "ru-open",
            534493: "ru-vtb",
            534495: "ru-psb",
            534577: "ru-rosbank",
            534601: "ru-vtb",
            534645: "ru-rosbank",
            534661: "ru-open",
            534669: "ru-open",
            534921: "ru-rosbank",
            534927: "ru-uralsib",
            535023: "ru-psb",
            535027: "ru-open",
            535058: "ru-psb",
            535082: "ru-vtb24",
            535108: "ru-open",
            535946: "ru-avangard",
            536095: "ru-open",
            536114: "ru-trust",
            536176: "ru-uralsib",
            536186: "ru-uralsib",
            536370: "ru-roscap",
            536392: "ru-raiffeisen",
            536400: "ru-uralsib",
            536409: "ru-rshb",
            536443: "ru-roscap",
            536454: "ru-uralsib",
            536464: "ru-roscap",
            536466: "ru-mib",
            536500: "ru-hcf",
            536511: "ru-hcf",
            536554: "ru-roscap",
            536569: "ru-rosbank",
            536672: "ru-mts",
            536829: "ru-vtb24",
            536960: "ru-uralsib",
            536995: "ru-gpb",
            537627: "ru-gpb",
            537643: "ru-alfa",
            537705: "ru-uralsib",
            537709: "ru-uralsib",
            537713: "ru-roscap",
            537715: "ru-uralsib",
            537730: "ru-uralsib",
            537734: "ru-uralsib",
            537737: "ru-roscap",
            537770: "ru-jugra",
            537965: "ru-raiffeisen",
            538010: "ru-rshb",
            538395: "ru-roscap",
            538397: "ru-uralsib",
            538800: "ru-uralsib",
            538828: "ru-roscap",
            538998: "ru-uralsib",
            539036: "ru-binbank",
            539037: "ru-uralsib",
            539102: "ru-rosbank",
            539114: "ru-ceb",
            539600: "ru-binbank",
            539607: "ru-zenit",
            539613: "ru-zenit",
            539617: "ru-uralsib",
            539621: "ru-psb",
            539673: "ru-avangard",
            539704: "ru-psb",
            539710: "ru-uralsib",
            539721: "ru-binbank",
            539726: "ru-citi",
            539839: "ru-gpb",
            539850: "ru-zenit",
            539852: "ru-uralsib",
            539861: "ru-psb",
            539864: "ru-roscap",
            539865: "ru-roscap",
            539869: "ru-roscap",
            539898: "ru-zenit",
            540014: "ru-roscap",
            540035: "ru-rosbank",
            540053: "ru-rosbank",
            540111: "ru-uralsib",
            540149: "ru-rosbank",
            540169: "ru-vtb24",
            540194: "ru-binbank",
            540229: "ru-rosbank",
            540308: "ru-roscap",
            540400: "ru-uralsib",
            540455: "ru-binbank",
            540602: "ru-roscap",
            540616: "ru-mts",
            540642: "ru-binbank",
            540664: "ru-gpb",
            540674: "ru-gpb",
            540687: "ru-uralsib",
            540708: "ru-uralsib",
            540768: "ru-uralsib",
            540788: "ru-citi",
            540794: "ru-uralsib",
            540834: "ru-uralsib",
            540923: "ru-uralsib",
            540927: "ru-roscap",
            541031: "ru-rosbank",
            541152: "ru-binbank",
            541269: "ru-psb",
            541279: "ru-uralsib",
            541294: "ru-binbank",
            541354: "ru-uralsib",
            541435: "ru-mts",
            541450: "ru-ceb",
            541456: "ru-uralsib",
            541503: "ru-psb",
            541600: "ru-spb",
            541632: "ru-uralsib",
            541754: "ru-zenit",
            541778: "ru-zenit",
            541789: "ru-uralsib",
            541895: "ru-roscap",
            541903: "ru-rosbank",
            541904: "ru-rosbank",
            541920: "ru-uralsib",
            541975: "ru-roscap",
            541983: "ru-uralsib",
            541997: "ru-absolut",
            542033: "ru-mkb",
            542048: "ru-rsb",
            542058: "ru-rosbank",
            542112: "ru-uralsib",
            542246: "ru-uralsib",
            542247: "ru-roscap",
            542255: "ru-gpb",
            542289: "ru-open",
            542340: "ru-psb",
            542475: "ru-open",
            542501: "ru-open",
            542504: "ru-binbank",
            542577: "ru-sberbank",
            542581: "ru-roscap",
            542600: "ru-roscap",
            542654: "ru-atb",
            542751: "ru-vbrr",
            542772: "ru-raiffeisen",
            542932: "ru-roscap",
            542963: "ru-rosbank",
            543015: "ru-uralsib",
            543019: "ru-open",
            543038: "ru-binbank",
            543101: "ru-spb",
            543127: "ru-rosbank",
            543211: "ru-mkb",
            543236: "ru-zenit",
            543354: "ru-uralsib",
            543366: "ru-binbank",
            543367: "ru-roscap",
            543435: "ru-uralsib",
            543618: "ru-roscap",
            543664: "ru-roscap",
            543672: "ru-gpb",
            543724: "ru-gpb",
            543728: "ru-roscap",
            543749: "ru-uralsib",
            543762: "ru-gpb",
            543763: "ru-sberbank",
            543807: "ru-uralsib",
            543874: "ru-psb",
            543942: "ru-sberbank",
            544025: "ru-zenit",
            544026: "ru-gpb",
            544069: "ru-roscap",
            544092: "ru-open",
            544117: "ru-binbank",
            544123: "ru-mts",
            544175: "ru-roscap",
            544195: "ru-uralsib",
            544212: "ru-roscap",
            544218: "ru-open",
            544237: "ru-raiffeisen",
            544263: "ru-rosbank",
            544270: "ru-roscap",
            544272: "ru-uralsib",
            544326: "ru-uralsib",
            544331: "ru-sberbank",
            544343: "ru-open",
            544367: "ru-uralsib",
            544369: "ru-uralsib",
            544417: "ru-uralsib",
            544429: "ru-rsb",
            544439: "ru-uralsib",
            544462: "ru-uralsib",
            544491: "ru-rosbank",
            544499: "ru-open",
            544552: "ru-uralsib",
            544561: "ru-gpb",
            544573: "ru-open",
            544754: "ru-roscap",
            544800: "ru-psb",
            544852: "ru-zenit",
            544885: "ru-roscap",
            544886: "ru-atb",
            544905: "ru-rosbank",
            544962: "ru-open",
            545037: "ru-sberbank",
            545101: "ru-gpb",
            545115: "ru-raiffeisen",
            545117: "ru-zenit",
            545151: "ru-rosbank",
            545152: "ru-sberbank",
            545160: "ru-rsb",
            545182: "ru-citi",
            545200: "ru-uralsib",
            545204: "ru-rosbank",
            545214: "ru-otp",
            545224: "ru-vtb24",
            545266: "ru-uralsib",
            545272: "ru-uralsib",
            545350: "ru-psb",
            545362: "ru-roscap",
            545364: "ru-rosbank",
            545379: "ru-rosbank",
            545472: "ru-uralsib",
            545490: "ru-roscap",
            545511: "ru-roscap",
            545529: "ru-rosbank",
            545539: "ru-uralsib",
            545540: "ru-uralsib",
            545547: "ru-rosbank",
            545572: "ru-rosbank",
            545575: "ru-rosbank",
            545592: "ru-uralsib",
            545638: "ru-uralsib",
            545655: "ru-uralsib",
            545701: "ru-uralsib",
            545742: "ru-uralsib",
            545744: "ru-uralsib",
            545761: "ru-uralsib",
            545762: "ru-hcf",
            545778: "ru-uralsib",
            545789: "ru-uralsib",
            545792: "ru-uralsib",
            545799: "ru-uralsib",
            545807: "ru-gpb",
            545817: "ru-uralsib",
            545840: "ru-sberbank",
            545868: "ru-uralsib",
            545896: "ru-zenit",
            545916: "ru-uralsib",
            545929: "ru-zenit",
            546031: "ru-sberbank",
            546339: "ru-uralsib",
            546340: "ru-uralsib",
            546468: "ru-uralsib",
            546551: "ru-uralsib",
            546593: "ru-uralsib",
            546662: "ru-uralsib",
            546679: "ru-uralsib",
            546718: "ru-uralsib",
            546766: "ru-psb",
            546842: "ru-uralsib",
            546844: "ru-uralsib",
            546850: "ru-sovkom",
            546901: "ru-sberbank",
            546902: "ru-sberbank",
            546903: "ru-sberbank",
            546904: "ru-sberbank",
            546905: "ru-sberbank",
            546906: "ru-sberbank",
            546907: "ru-sberbank",
            546908: "ru-sberbank",
            546909: "ru-sberbank",
            546910: "ru-sberbank",
            546911: "ru-sberbank",
            546912: "ru-sberbank",
            546913: "ru-sberbank",
            546916: "ru-sberbank",
            546917: "ru-sberbank",
            546918: "ru-sberbank",
            546920: "ru-sberbank",
            546922: "ru-sberbank",
            546925: "ru-sberbank",
            546926: "ru-sberbank",
            546927: "ru-sberbank",
            546928: "ru-sberbank",
            546929: "ru-sberbank",
            546930: "ru-sberbank",
            546931: "ru-sberbank",
            546932: "ru-sberbank",
            546933: "ru-sberbank",
            546935: "ru-sberbank",
            546936: "ru-sberbank",
            546937: "ru-sberbank",
            546938: "ru-sberbank",
            546939: "ru-sberbank",
            546940: "ru-sberbank",
            546941: "ru-sberbank",
            546942: "ru-sberbank",
            546943: "ru-sberbank",
            546944: "ru-sberbank",
            546945: "ru-sberbank",
            546946: "ru-sberbank",
            546947: "ru-sberbank",
            546948: "ru-sberbank",
            546949: "ru-sberbank",
            546950: "ru-sberbank",
            546951: "ru-sberbank",
            546952: "ru-sberbank",
            546953: "ru-sberbank",
            546954: "ru-sberbank",
            546955: "ru-sberbank",
            546956: "ru-sberbank",
            546959: "ru-sberbank",
            546960: "ru-sberbank",
            546961: "ru-sberbank",
            546962: "ru-sberbank",
            546963: "ru-sberbank",
            546964: "ru-sberbank",
            546966: "ru-sberbank",
            546967: "ru-sberbank",
            546968: "ru-sberbank",
            546969: "ru-sberbank",
            546970: "ru-sberbank",
            546972: "ru-sberbank",
            546974: "ru-sberbank",
            546975: "ru-sberbank",
            546976: "ru-sberbank",
            546977: "ru-sberbank",
            546996: "ru-roscap",
            546998: "ru-sberbank",
            546999: "ru-sberbank",
            547070: "ru-rosbank",
            547151: "ru-roscap",
            547228: "ru-uralsib",
            547243: "ru-binbank",
            547253: "ru-uralsib",
            547257: "ru-uralsib",
            547258: "ru-uralsib",
            547262: "ru-rsb",
            547298: "ru-uralsib",
            547300: "ru-uralsib",
            547306: "ru-uralsib",
            547314: "ru-uralsib",
            547319: "ru-uralsib",
            547324: "ru-uralsib",
            547329: "ru-psb",
            547348: "ru-gpb",
            547377: "ru-binbank",
            547421: "ru-uralsib",
            547447: "ru-uralsib",
            547449: "ru-open",
            547470: "ru-rosbank",
            547490: "ru-citi",
            547547: "ru-uralsib",
            547550: "ru-ceb",
            547563: "ru-uralsib",
            547576: "ru-uralsib",
            547580: "ru-uralsib",
            547601: "ru-rshb",
            547610: "ru-roscap",
            547613: "ru-raiffeisen",
            547616: "ru-open",
            547665: "ru-uralsib",
            547681: "ru-rosbank",
            547699: "ru-uralsib",
            547705: "ru-rosbank",
            547728: "ru-ucb",
            547743: "ru-vozrozhdenie",
            547761: "ru-uralsib",
            547796: "ru-uralsib",
            547801: "ru-binbank",
            547851: "ru-uralsib",
            547859: "ru-roscap",
            547901: "ru-sberbank",
            547902: "ru-sberbank",
            547905: "ru-sberbank",
            547906: "ru-sberbank",
            547907: "ru-sberbank",
            547910: "ru-sberbank",
            547911: "ru-sberbank",
            547912: "ru-sberbank",
            547913: "ru-sberbank",
            547920: "ru-sberbank",
            547922: "ru-sberbank",
            547925: "ru-sberbank",
            547926: "ru-sberbank",
            547927: "ru-sberbank",
            547928: "ru-sberbank",
            547930: "ru-sberbank",
            547931: "ru-sberbank",
            547932: "ru-sberbank",
            547935: "ru-sberbank",
            547936: "ru-sberbank",
            547937: "ru-sberbank",
            547938: "ru-sberbank",
            547940: "ru-sberbank",
            547942: "ru-sberbank",
            547943: "ru-sberbank",
            547944: "ru-sberbank",
            547945: "ru-sberbank",
            547947: "ru-sberbank",
            547948: "ru-sberbank",
            547949: "ru-sberbank",
            547950: "ru-sberbank",
            547951: "ru-sberbank",
            547952: "ru-sberbank",
            547953: "ru-sberbank",
            547954: "ru-sberbank",
            547955: "ru-sberbank",
            547956: "ru-sberbank",
            547959: "ru-sberbank",
            547960: "ru-sberbank",
            547961: "ru-sberbank",
            547962: "ru-sberbank",
            547964: "ru-sberbank",
            547966: "ru-sberbank",
            547969: "ru-sberbank",
            547972: "ru-sberbank",
            547976: "ru-sberbank",
            547998: "ru-sberbank",
            547999: "ru-sberbank",
            548027: "ru-gpb",
            548035: "ru-mts",
            548062: "ru-roscap",
            548072: "ru-roscap",
            548073: "ru-roscap",
            548092: "ru-binbank",
            548137: "ru-uralsib",
            548138: "ru-uralsib",
            548164: "ru-raiffeisen",
            548172: "ru-psb",
            548173: "ru-roscap",
            548177: "ru-uralsib",
            548186: "ru-roscap",
            548204: "ru-roscap",
            548205: "ru-uralsib",
            548214: "ru-uralsib",
            548225: "ru-rosbank",
            548235: "ru-rsb",
            548246: "ru-uralsib",
            548249: "ru-uralsib",
            548265: "ru-binbank",
            548266: "ru-uralsib",
            548268: "ru-uralsib",
            548269: "ru-psb",
            548270: "ru-binbank",
            548272: "ru-uralsib",
            548291: "ru-uralsib",
            548294: "ru-uralsib",
            548301: "ru-roscap",
            548308: "ru-vozrozhdenie",
            548309: "ru-vozrozhdenie",
            548326: "ru-uralsib",
            548328: "ru-roscap",
            548335: "ru-roscap",
            548351: "ru-mib",
            548386: "ru-skb",
            548387: "ru-tinkoff",
            548393: "ru-uralsib",
            548401: "ru-sberbank",
            548402: "ru-sberbank",
            548403: "ru-sberbank",
            548404: "ru-roscap",
            548405: "ru-sberbank",
            548406: "ru-sberbank",
            548407: "ru-sberbank",
            548409: "ru-rosbank",
            548410: "ru-sberbank",
            548411: "ru-sberbank",
            548412: "ru-sberbank",
            548413: "ru-sberbank",
            548416: "ru-sberbank",
            548420: "ru-sberbank",
            548422: "ru-sberbank",
            548425: "ru-sberbank",
            548426: "ru-sberbank",
            548427: "ru-sberbank",
            548428: "ru-sberbank",
            548429: "ru-psb",
            548430: "ru-sberbank",
            548431: "ru-sberbank",
            548432: "ru-sberbank",
            548435: "ru-sberbank",
            548436: "ru-sberbank",
            548438: "ru-sberbank",
            548440: "ru-sberbank",
            548442: "ru-sberbank",
            548443: "ru-sberbank",
            548444: "ru-sberbank",
            548445: "ru-sberbank",
            548447: "ru-sberbank",
            548448: "ru-sberbank",
            548449: "ru-sberbank",
            548450: "ru-sberbank",
            548451: "ru-sberbank",
            548452: "ru-sberbank",
            548453: "ru-uralsib",
            548454: "ru-sberbank",
            548455: "ru-sberbank",
            548456: "ru-sberbank",
            548459: "ru-sberbank",
            548460: "ru-sberbank",
            548461: "ru-sberbank",
            548462: "ru-sberbank",
            548463: "ru-sberbank",
            548464: "ru-sberbank",
            548466: "ru-sberbank",
            548468: "ru-sberbank",
            548469: "ru-sberbank",
            548470: "ru-sberbank",
            548472: "ru-sberbank",
            548476: "ru-sberbank",
            548477: "ru-sberbank",
            548484: "ru-open",
            548490: "ru-roscap",
            548498: "ru-sberbank",
            548499: "ru-sberbank",
            548504: "ru-uralsib",
            548511: "ru-uralsib",
            548554: "ru-roscap",
            548571: "ru-uralsib",
            548588: "ru-uralsib",
            548601: "ru-alfa",
            548655: "ru-alfa",
            548673: "ru-alfa",
            548674: "ru-alfa",
            548704: "ru-uralsib",
            548706: "ru-uralsib",
            548713: "ru-uralsib",
            548745: "ru-hcf",
            548752: "ru-uralsib",
            548753: "ru-roscap",
            548754: "ru-roscap",
            548755: "ru-roscap",
            548767: "ru-zenit",
            548768: "ru-zenit",
            548771: "ru-zenit",
            548777: "ru-roscap",
            548783: "ru-roscap",
            548784: "ru-roscap",
            548785: "ru-roscap",
            548791: "ru-roscap",
            548796: "ru-rosbank",
            548899: "ru-uralsib",
            548921: "ru-rosbank",
            548934: "ru-uralsib",
            548996: "ru-uralsib",
            548997: "ru-uralsib",
            548999: "ru-gpb",
            549000: "ru-gpb",
            549014: "ru-uralsib",
            549015: "ru-uralsib",
            549024: "ru-open",
            549025: "ru-open",
            549068: "ru-rosbank",
            549071: "ru-skb",
            549074: "ru-roscap",
            549081: "ru-rosbank",
            549098: "ru-gpb",
            549223: "ru-vtb24",
            549229: "ru-uralsib",
            549251: "ru-uralsib",
            549255: "ru-uralsib",
            549256: "ru-uralsib",
            549257: "ru-uralsib",
            549258: "ru-roscap",
            549264: "ru-uralsib",
            549268: "ru-rosbank",
            549270: "ru-vtb24",
            549274: "ru-uralsib",
            549283: "ru-uralsib",
            549285: "ru-uralsib",
            549302: "ru-ucb",
            549303: "ru-uralsib",
            549306: "ru-uralsib",
            549307: "ru-uralsib",
            549314: "ru-roscap",
            549347: "ru-uralsib",
            549349: "ru-binbank",
            549376: "ru-spb",
            549401: "ru-uralsib",
            549411: "ru-zenit",
            549424: "ru-uralsib",
            549425: "ru-psb",
            549439: "ru-psb",
            549447: "ru-uralsib",
            549454: "ru-uralsib",
            549470: "ru-roscap",
            549475: "ru-rosbank",
            549478: "ru-rosbank",
            549483: "ru-uralsib",
            549512: "ru-binbank",
            549522: "ru-uralsib",
            549523: "ru-binbank",
            549524: "ru-psb",
            549574: "ru-roscap",
            549597: "ru-roscap",
            549600: "ru-gpb",
            549614: "ru-gpb",
            549647: "ru-uralsib",
            549654: "ru-uralsib",
            549715: "ru-rshb",
            549716: "ru-uralsib",
            549822: "ru-rosbank",
            549829: "ru-rosbank",
            549830: "ru-uralsib",
            549848: "ru-open",
            549855: "ru-rosbank",
            549865: "ru-rosbank",
            549870: "ru-mib",
            549873: "ru-uralsib",
            549881: "ru-uralsib",
            549882: "ru-zenit",
            549887: "ru-roscap",
            549888: "ru-zenit",
            549935: "ru-roscap",
            549965: "ru-jugra",
            549966: "ru-jugra",
            549969: "ru-roscap",
            550006: "ru-uralsib",
            550025: "ru-binbank",
            550064: "ru-rosbank",
            550070: "ru-roscap",
            550143: "ru-rosbank",
            550165: "ru-rosbank",
            550210: "ru-rosbank",
            550219: "ru-zenit",
            550235: "ru-roscap",
            550251: "ru-sberbank",
            550446: "ru-open",
            550467: "ru-rosbank",
            550468: "ru-uralsib",
            550484: "ru-raiffeisen",
            550547: "ru-rosbank",
            550583: "ru-mts",
            551950: "ru-roscap",
            551960: "ru-tinkoff",
            551979: "ru-rosbank",
            551985: "ru-rosbank",
            551989: "ru-rosbank",
            551993: "ru-rosbank",
            551996: "ru-rosbank",
            552055: "ru-gpb",
            552151: "ru-rosbank",
            552175: "ru-alfa",
            552186: "ru-alfa",
            552549: "ru-roscap",
            552573: "ru-citi",
            552574: "ru-citi",
            552603: "ru-roscap",
            552613: "ru-reb",
            552618: "ru-mts",
            552680: "ru-mkb",
            552702: "ru-gpb",
            552708: "ru-open",
            552729: "ru-ren",
            552845: "ru-uralsib",
            552866: "ru-binbank",
            552958: "ru-akbars",
            553000: "ru-uralsib",
            553069: "ru-rosbank",
            553128: "ru-rosbank",
            553420: "ru-tinkoff",
            553496: "ru-raiffeisen",
            553581: "ru-uralsib",
            553584: "ru-uralsib",
            553690: "ru-rosbank",
            553909: "ru-rosbank",
            553964: "ru-rosbank",
            554279: "ru-psb",
            554317: "ru-rosbank",
            554324: "ru-rosbank",
            554326: "ru-rosbank",
            554364: "ru-roscap",
            554365: "ru-roscap",
            554372: "ru-binbank",
            554373: "ru-binbank",
            554384: "ru-vtb",
            554386: "ru-vtb24",
            554393: "ru-vtb24",
            554524: "ru-smp",
            554546: "ru-uralsib",
            554549: "ru-rosbank",
            554562: "ru-uralsib",
            554581: "ru-uralsib",
            554607: "ru-uralsib",
            554615: "ru-uralsib",
            554651: "ru-uralsib",
            554713: "ru-rosbank",
            554733: "ru-rosbank",
            554759: "ru-psb",
            554761: "ru-rosbank",
            554780: "ru-zenit",
            554781: "ru-psb",
            554782: "ru-rosbank",
            554844: "ru-rosbank",
            555057: "ru-citi",
            555058: "ru-citi",
            555079: "ru-rosbank",
            555156: "ru-alfa",
            555921: "ru-alfa",
            555928: "ru-alfa",
            555933: "ru-alfa",
            555947: "ru-alfa",
            555949: "ru-alfa",
            555957: "ru-alfa",
            556052: "ru-gpb",
            556056: "ru-sviaz",
            556057: "ru-uralsib",
            557029: "ru-zenit",
            557030: "ru-zenit",
            557036: "ru-uralsib",
            557056: "ru-ceb",
            557057: "ru-ceb",
            557071: "ru-mib",
            557072: "ru-mib",
            557073: "ru-binbank",
            557106: "ru-uralsib",
            557107: "ru-uralsib",
            557646: "ru-rosbank",
            557724: "ru-rosbank",
            557734: "ru-hcf",
            557737: "ru-ren",
            557808: "ru-trust",
            557809: "ru-trust",
            557841: "ru-rosbank",
            557842: "ru-rosbank",
            557848: "ru-rosbank",
            557849: "ru-rosbank",
            557942: "ru-zenit",
            557944: "ru-zenit",
            557946: "ru-open",
            557948: "ru-open",
            557959: "ru-roscap",
            557960: "ru-zenit",
            557969: "ru-roscap",
            557970: "ru-uralsib",
            557976: "ru-binbank",
            557977: "ru-rosbank",
            557980: "ru-rosbank",
            557981: "ru-psb",
            557986: "ru-mib",
            558254: "ru-psb",
            558258: "ru-rosbank",
            558268: "ru-psb",
            558273: "ru-raiffeisen",
            558274: "ru-rosbank",
            558275: "ru-uralsib",
            558296: "ru-rosbank",
            558298: "ru-trust",
            558326: "ru-uralsib",
            558334: "ru-alfa",
            558354: "ru-uralsib",
            558355: "ru-gpb",
            558356: "ru-uralsib",
            558374: "ru-uralsib",
            558385: "ru-jugra",
            558391: "ru-uralsib",
            558416: "ru-rosbank",
            558462: "ru-mib",
            558463: "ru-uralsib",
            558480: "ru-rosbank",
            558488: "ru-roscap",
            558504: "ru-rosbank",
            558516: "ru-psb",
            558518: "ru-vtb24",
            558535: "ru-avangard",
            558536: "ru-raiffeisen",
            558605: "ru-rosbank",
            558620: "ru-open",
            558622: "ru-raiffeisen",
            558625: "ru-binbank",
            558636: "ru-binbank",
            558651: "ru-uralsib",
            558664: "ru-uralsib",
            558672: "ru-psb",
            558673: "ru-rosbank",
            558690: "ru-uralsib",
            558696: "ru-zenit",
            558713: "ru-vbrr",
            559066: "ru-vtb",
            559255: "ru-gpb",
            559264: "ru-open",
            559448: "ru-rosbank",
            559456: "ru-mib",
            559476: "ru-rosbank",
            559488: "ru-rosbank",
            559596: "ru-rosbank",
            559598: "ru-rosbank",
            559615: "ru-rosbank",
            559645: "ru-zenit",
            559811: "ru-rosbank",
            559813: "ru-ceb",
            559814: "ru-rosbank",
            559899: "ru-rosbank",
            559901: "ru-sberbank",
            559969: "ru-rosbank",
            559992: "ru-gpb",
            605461: "ru-sberbank",
            605462: "ru-uralsib",
            627119: "ru-alfa",
            639002: "ru-sberbank",
            670505: "ru-roscap",
            670508: "ru-psb",
            670512: "ru-zenit",
            670518: "ru-open",
            670521: "ru-roscap",
            670550: "ru-rosbank",
            670555: "ru-atb",
            670556: "ru-roscap",
            670557: "ru-rosbank",
            670560: "ru-rosbank",
            670567: "ru-rosbank",
            670575: "ru-rosbank",
            670583: "ru-psb",
            670587: "ru-open",
            670594: "ru-roscap",
            670601: "ru-roscap",
            670602: "ru-roscap",
            670605: "ru-roscap",
            670607: "ru-rosbank",
            670611: "ru-psb",
            670614: "ru-zenit",
            670623: "ru-roscap",
            670624: "ru-roscap",
            670625: "ru-roscap",
            670628: "ru-roscap",
            670633: "ru-roscap",
            670637: "ru-skb",
            670638: "ru-roscap",
            670646: "ru-rosbank",
            670647: "ru-rosbank",
            670652: "ru-rosbank",
            670654: "ru-psb",
            670661: "ru-psb",
            670663: "ru-roscap",
            670671: "ru-roscap",
            670674: "ru-rosbank",
            670676: "ru-roscap",
            670694: "ru-rosbank",
            670818: "ru-roscap",
            670819: "ru-rosbank",
            670828: "ru-rosbank",
            670846: "ru-roscap",
            670849: "ru-rosbank",
            670851: "ru-rosbank",
            670852: "ru-mob",
            670869: "ru-rosbank",
            670893: "ru-roscap",
            670981: "ru-roscap",
            670992: "ru-uralsib",
            670995: "ru-uralsib",
            670996: "ru-rosbank",
            671106: "ru-uralsib",
            671109: "ru-vtb",
            671111: "ru-vtb",
            671122: "ru-gpb",
            671123: "ru-zenit",
            671136: "ru-uralsib",
            671137: "ru-rosbank",
            671148: "ru-vtb",
            671172: "ru-vtb",
            676195: "ru-sberbank",
            676196: "ru-sberbank",
            676230: "ru-alfa",
            676231: "ru-open",
            676245: "ru-jugra",
            676280: "ru-sberbank",
            676333: "ru-raiffeisen",
            676347: "ru-rosbank",
            676371: "ru-roscap",
            676397: "ru-vozrozhdenie",
            676428: "ru-binbank",
            676444: "ru-psb",
            676445: "ru-roscap",
            676450: "ru-rosbank",
            676454: "ru-gpb",
            676463: "ru-avangard",
            676501: "ru-rosbank",
            676523: "ru-zenit",
            676528: "ru-uralsib",
            676533: "ru-rosbank",
            676565: "ru-rsb",
            676586: "ru-ceb",
            676625: "ru-raiffeisen",
            676642: "ru-trust",
            676664: "ru-rosbank",
            676668: "ru-rosbank",
            676672: "ru-ucb",
            676697: "ru-open",
            676800: "ru-vtb24",
            676802: "ru-vtb24",
            676803: "ru-vtb24",
            676805: "ru-vtb24",
            676845: "ru-vtb24",
            676851: "ru-vtb24",
            676859: "ru-roscap",
            676860: "ru-vtb24",
            676861: "ru-vtb24",
            676881: "ru-reb",
            676884: "ru-mts",
            676888: "ru-vtb24",
            676893: "ru-vtb24",
            676896: "ru-vtb24",
            676934: "ru-binbank",
            676939: "ru-vtb24",
            676946: "ru-rosbank",
            676947: "ru-binbank",
            676967: "ru-mkb",
            676974: "ru-vtb24",
            676979: "ru-roscap",
            676984: "ru-uralsib",
            676989: "ru-roscap",
            676990: "ru-gpb",
            676998: "ru-binbank",
            677018: "ru-roscap",
            677040: "ru-ren",
            677058: "ru-binbank",
            677076: "ru-rosbank",
            677084: "ru-zenit",
            677088: "ru-akbars",
            677110: "ru-gpb",
            677112: "ru-rosbank",
            677128: "ru-sberbank",
            677136: "ru-roscap",
            677146: "ru-roscap",
            677151: "ru-vtb",
            677175: "ru-smp",
            677189: "ru-rgs",
            677194: "ru-vtb24",
            677222: "ru-rosbank",
            677223: "ru-roscap",
            677228: "ru-roscap",
            677229: "ru-roscap",
            677234: "ru-rosbank",
            677235: "ru-rosbank",
            677240: "ru-rosbank",
            677245: "ru-rosbank",
            677257: "ru-roscap",
            677260: "ru-zenit",
            677261: "ru-uralsib",
            677263: "ru-psb",
            677267: "ru-roscap",
            677271: "ru-vtb24",
            677272: "ru-roscap",
            677275: "ru-binbank",
            677276: "ru-binbank",
            677285: "ru-roscap",
            677288: "ru-roscap",
            677289: "ru-roscap",
            677302: "ru-roscap",
            677303: "ru-rosbank",
            677305: "ru-roscap",
            677309: "ru-rosbank",
            677314: "ru-rosbank",
            677315: "ru-rosbank",
            677318: "ru-roscap",
            677319: "ru-roscap",
            677327: "ru-zenit",
            677329: "ru-zenit",
            677335: "ru-roscap",
            677336: "ru-roscap",
            677338: "ru-roscap",
            677342: "ru-rosbank",
            677343: "ru-rosbank",
            677345: "ru-rosbank",
            677349: "ru-roscap",
            677358: "ru-binbank",
            677359: "ru-rosbank",
            677360: "ru-rosbank",
            677363: "ru-trust",
            677366: "ru-smp",
            677367: "ru-sviaz",
            677370: "ru-psb",
            677371: "ru-psb",
            677372: "ru-psb",
            677374: "ru-roscap",
            677375: "ru-rosbank",
            677376: "ru-rosbank",
            677380: "ru-zenit",
            677382: "ru-uralsib",
            677388: "ru-zenit",
            677389: "ru-zenit",
            677391: "ru-rsb",
            677401: "ru-rosbank",
            677405: "ru-psb",
            677406: "ru-binbank",
            677408: "ru-uralsib",
            677424: "ru-roscap",
            677428: "ru-roscap",
            677430: "ru-uralsib",
            677431: "ru-uralsib",
            677444: "ru-roscap",
            677456: "ru-roscap",
            677457: "ru-roscap",
            677458: "ru-zenit",
            677459: "ru-zenit",
            677461: "ru-psb",
            677462: "ru-psb",
            677466: "ru-roscap",
            677467: "ru-rosbank",
            677468: "ru-rosbank",
            677470: "ru-vtb24",
            677471: "ru-vtb24",
            677484: "ru-gpb",
            677493: "ru-zenit",
            677496: "ru-mob",
            677497: "ru-zenit",
            677501: "ru-roscap",
            677505: "ru-binbank",
            677506: "ru-psb",
            677507: "ru-rosbank",
            677510: "ru-zenit",
            677514: "ru-zenit",
            677518: "ru-smp",
            677578: "ru-roscap",
            677579: "ru-rosbank",
            677585: "ru-gpb",
            677597: "ru-rosbank",
            677600: "ru-roscap",
            677611: "ru-roscap",
            677617: "ru-rosbank",
            677646: "ru-roscap",
            677649: "ru-vbrr",
            677655: "ru-roscap",
            677656: "ru-roscap",
            677659: "ru-zenit",
            677660: "ru-zenit",
            677684: "ru-mts",
            677688: "ru-roscap",
            677694: "ru-roscap",
            677714: "ru-roscap",
            677721: "ru-rosbank",
            679074: "ru-uralsib"
        }, e.CardInfo._banks = n, e.CardInfo._prefixes = u
    }, jUCC: function (r, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        var n = t("ZIR9"), u = t.n(n), a = t("7t+N"), s = t.n(a), o = t("4q2+"), i = t("t+Rb");
        t.n(i);
        s()(function () {
            o.a.addFontLink("OpenSans");
            var r = s()("#front"), e = s()("#bank-link"), t = s()("#brand-logo"), n = s()("#number"), a = s()("#code");
            n.on("keyup change paste", function () {
                var s = new u.a(n.val(), {
                    banksLogosPath: "https://donatepay.ru/assets/build/images/cardInfo/banks-logos/",
                    brandsLogosPath: "https://donatepay.ru/assets/build/images/cardInfo/brands-logos/"
                });
                s.bankUrl ? e.css("backgroundImage", 'url("' + s.bankLogo + '")').show() : e.hide(), r.css({
                    background: s.backgroundGradient,
                    color: s.textColor
                }), a.attr("placeholder", s.codeName ? s.codeName : ""), n.mask(s.numberMask), s.brandLogo ? t.attr("src", s.brandLogo).attr("alt", s.brandName).show() : t.hide()
            }).trigger("keyup")
        })
    }, "t+Rb": function (r, e, t) {
        var n, u, a, s;
        s = function (r) {
            "use strict";
            var e = function (e, t, n) {
                var u = {
                    invalid: [], getCaret: function () {
                        try {
                            var r, t = 0, n = e.get(0), a = document.selection, s = n.selectionStart;
                            return a && -1 === navigator.appVersion.indexOf("MSIE 10") ? ((r = a.createRange()).moveStart("character", -u.val().length), t = r.text.length) : (s || "0" === s) && (t = s), t
                        } catch (r) {
                        }
                    }, setCaret: function (r) {
                        try {
                            if (e.is(":focus")) {
                                var t, n = e.get(0);
                                n.setSelectionRange ? n.setSelectionRange(r, r) : ((t = n.createTextRange()).collapse(!0), t.moveEnd("character", r), t.moveStart("character", r), t.select())
                            }
                        } catch (r) {
                        }
                    }, events: function () {
                        e.on("keydown.mask", function (r) {
                            e.data("mask-keycode", r.keyCode || r.which), e.data("mask-previus-value", e.val()), e.data("mask-previus-caret-pos", u.getCaret()), u.maskDigitPosMapOld = u.maskDigitPosMap
                        }).on(r.jMaskGlobals.useInput ? "input.mask" : "keyup.mask", u.behaviour).on("paste.mask drop.mask", function () {
                            setTimeout(function () {
                                e.keydown().keyup()
                            }, 100)
                        }).on("change.mask", function () {
                            e.data("changed", !0)
                        }).on("blur.mask", function () {
                            o === u.val() || e.data("changed") || e.trigger("change"), e.data("changed", !1)
                        }).on("blur.mask", function () {
                            o = u.val()
                        }).on("focus.mask", function (e) {
                            !0 === n.selectOnFocus && r(e.target).select()
                        }).on("focusout.mask", function () {
                            n.clearIfNotMatch && !a.test(u.val()) && u.val("")
                        })
                    }, getRegexMask: function () {
                        for (var r, e, n, u, a, o, i = [], l = 0; l < t.length; l++) (r = s.translation[t.charAt(l)]) ? (e = r.pattern.toString().replace(/.{1}$|^.{1}/g, ""), n = r.optional, (u = r.recursive) ? (i.push(t.charAt(l)), a = {
                            digit: t.charAt(l),
                            pattern: e
                        }) : i.push(n || u ? e + "?" : e)) : i.push(t.charAt(l).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
                        return o = i.join(""), a && (o = o.replace(new RegExp("(" + a.digit + "(.*" + a.digit + ")?)"), "($1)?").replace(new RegExp(a.digit, "g"), a.pattern)), new RegExp(o)
                    }, destroyEvents: function () {
                        e.off(["input", "keydown", "keyup", "paste", "drop", "blur", "focusout", ""].join(".mask "))
                    }, val: function (r) {
                        var t, n = e.is("input") ? "val" : "text";
                        return arguments.length > 0 ? (e[n]() !== r && e[n](r), t = e) : t = e[n](), t
                    }, calculateCaretPosition: function () {
                        var r = e.data("mask-previus-value") || "", t = u.getMasked(), n = u.getCaret();
                        if (r !== t) {
                            var a = e.data("mask-previus-caret-pos") || 0, s = t.length, o = r.length, i = 0, l = 0,
                                c = 0, b = 0, f = 0;
                            for (f = n; f < s && u.maskDigitPosMap[f]; f++) l++;
                            for (f = n - 1; f >= 0 && u.maskDigitPosMap[f]; f--) i++;
                            for (f = n - 1; f >= 0; f--) u.maskDigitPosMap[f] && c++;
                            for (f = a - 1; f >= 0; f--) u.maskDigitPosMapOld[f] && b++;
                            if (n > o) n = 10 * s; else if (a >= n && a !== o) {
                                if (!u.maskDigitPosMapOld[n]) {
                                    var p = n;
                                    n -= b - c, n -= i, u.maskDigitPosMap[n] && (n = p)
                                }
                            } else n > a && (n += c - b, n += l)
                        }
                        return n
                    }, behaviour: function (t) {
                        t = t || window.event, u.invalid = [];
                        var n = e.data("mask-keycode");
                        if (-1 === r.inArray(n, s.byPassKeys)) {
                            var a = u.getMasked(), o = u.getCaret();
                            return setTimeout(function () {
                                u.setCaret(u.calculateCaretPosition())
                            }, r.jMaskGlobals.keyStrokeCompensation), u.val(a), u.setCaret(o), u.callbacks(t)
                        }
                    }, getMasked: function (r, e) {
                        var a, o, i, l = [], c = void 0 === e ? u.val() : e + "", b = 0, f = t.length, p = 0,
                            d = c.length, h = 1, g = "push", k = -1, m = 0, v = [];
                        for (n.reverse ? (g = "unshift", h = -1, a = 0, b = f - 1, p = d - 1, o = function () {
                            return b > -1 && p > -1
                        }) : (a = f - 1, o = function () {
                            return b < f && p < d
                        }); o();) {
                            var y = t.charAt(b), x = c.charAt(p), w = s.translation[y];
                            w ? (x.match(w.pattern) ? (l[g](x), w.recursive && (-1 === k ? k = b : b === a && b !== k && (b = k - h), a === k && (b -= h)), b += h) : x === i ? (m--, i = void 0) : w.optional ? (b += h, p -= h) : w.fallback ? (l[g](w.fallback), b += h, p -= h) : u.invalid.push({
                                p: p,
                                v: x,
                                e: w.pattern
                            }), p += h) : (r || l[g](y), x === y ? (v.push(p), p += h) : (i = y, v.push(p + m), m++), b += h)
                        }
                        var C = t.charAt(a);
                        f !== d + 1 || s.translation[C] || l.push(C);
                        var _ = l.join("");
                        return u.mapMaskdigitPositions(_, v, d), _
                    }, mapMaskdigitPositions: function (r, e, t) {
                        var a = n.reverse ? r.length - t : 0;
                        u.maskDigitPosMap = {};
                        for (var s = 0; s < e.length; s++) u.maskDigitPosMap[e[s] + a] = 1
                    }, callbacks: function (r) {
                        var a = u.val(), s = a !== o, i = [a, r, e, n], l = function (r, e, t) {
                            "function" == typeof n[r] && e && n[r].apply(this, t)
                        };
                        l("onChange", !0 === s, i), l("onKeyPress", !0 === s, i), l("onComplete", a.length === t.length, i), l("onInvalid", u.invalid.length > 0, [a, r, e, u.invalid, n])
                    }
                };
                e = r(e);
                var a, s = this, o = u.val();
                t = "function" == typeof t ? t(u.val(), void 0, e, n) : t, s.mask = t, s.options = n, s.remove = function () {
                    var r = u.getCaret();
                    return s.options.placeholder && e.removeAttr("placeholder"), e.data("mask-maxlength") && e.removeAttr("maxlength"), u.destroyEvents(), u.val(s.getCleanVal()), u.setCaret(r), e
                }, s.getCleanVal = function () {
                    return u.getMasked(!0)
                }, s.getMaskedVal = function (r) {
                    return u.getMasked(!1, r)
                }, s.init = function (o) {
                    if (o = o || !1, n = n || {}, s.clearIfNotMatch = r.jMaskGlobals.clearIfNotMatch, s.byPassKeys = r.jMaskGlobals.byPassKeys, s.translation = r.extend({}, r.jMaskGlobals.translation, n.translation), s = r.extend(!0, {}, s, n), a = u.getRegexMask(), o) u.events(), u.val(u.getMasked()); else {
                        n.placeholder && e.attr("placeholder", n.placeholder), e.data("mask") && e.attr("autocomplete", "off");
                        for (var i = 0, l = !0; i < t.length; i++) {
                            var c = s.translation[t.charAt(i)];
                            if (c && c.recursive) {
                                l = !1;
                                break
                            }
                        }
                        l && e.attr("maxlength", t.length).data("mask-maxlength", !0), u.destroyEvents(), u.events();
                        var b = u.getCaret();
                        u.val(u.getMasked()), u.setCaret(b)
                    }
                }, s.init(!e.is("input"))
            };
            r.maskWatchers = {};
            var t = function () {
                var t = r(this), u = {}, a = t.attr("data-mask");
                if (t.attr("data-mask-reverse") && (u.reverse = !0), t.attr("data-mask-clearifnotmatch") && (u.clearIfNotMatch = !0), "true" === t.attr("data-mask-selectonfocus") && (u.selectOnFocus = !0), n(t, a, u)) return t.data("mask", new e(this, a, u))
            }, n = function (e, t, n) {
                n = n || {};
                var u = r(e).data("mask"), a = JSON.stringify, s = r(e).val() || r(e).text();
                try {
                    return "function" == typeof t && (t = t(s)), "object" != typeof u || a(u.options) !== a(n) || u.mask !== t
                } catch (r) {
                }
            };
            r.fn.mask = function (t, u) {
                u = u || {};
                var a = this.selector, s = r.jMaskGlobals, o = s.watchInterval, i = u.watchInputs || s.watchInputs,
                    l = function () {
                        if (n(this, t, u)) return r(this).data("mask", new e(this, t, u))
                    };
                return r(this).each(l), a && "" !== a && i && (clearInterval(r.maskWatchers[a]), r.maskWatchers[a] = setInterval(function () {
                    r(document).find(a).each(l)
                }, o)), this
            }, r.fn.masked = function (r) {
                return this.data("mask").getMaskedVal(r)
            }, r.fn.unmask = function () {
                return clearInterval(r.maskWatchers[this.selector]), delete r.maskWatchers[this.selector], this.each(function () {
                    var e = r(this).data("mask");
                    e && e.remove().removeData("mask")
                })
            }, r.fn.cleanVal = function () {
                return this.data("mask").getCleanVal()
            }, r.applyDataMask = function (e) {
                ((e = e || r.jMaskGlobals.maskElements) instanceof r ? e : r(e)).filter(r.jMaskGlobals.dataMaskAttr).each(t)
            };
            var u, a, s, o = {
                maskElements: "input,td,span,div",
                dataMaskAttr: "*[data-mask]",
                dataMask: !0,
                watchInterval: 300,
                watchInputs: !0,
                keyStrokeCompensation: 10,
                useInput: !/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent) && (u = "input", s = document.createElement("div"), (a = (u = "on" + u) in s) || (s.setAttribute(u, "return;"), a = "function" == typeof s[u]), s = null, a),
                watchDataMask: !1,
                byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
                translation: {
                    0: {pattern: /\d/},
                    9: {pattern: /\d/, optional: !0},
                    "#": {pattern: /\d/, recursive: !0},
                    A: {pattern: /[a-zA-Z0-9]/},
                    S: {pattern: /[a-zA-Z]/}
                }
            };
            r.jMaskGlobals = r.jMaskGlobals || {}, (o = r.jMaskGlobals = r.extend(!0, {}, o, r.jMaskGlobals)).dataMask && r.applyDataMask(), setInterval(function () {
                r.jMaskGlobals.watchDataMask && r.applyDataMask()
            }, o.watchInterval)
        }, window.jQuery, window.Zepto, u = [t("7t+N")], void 0 === (a = "function" == typeof (n = s) ? n.apply(e, u) : n) || (r.exports = a)
    }
});