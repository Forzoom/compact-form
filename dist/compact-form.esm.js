/**
 * 支持slot=default slot=left slot=right slot=content，当default存在时，其他3个将失效
 */
var script = {
  name: 'ListItem',
  props: {
    padding: {
      type: String,
      "default": 'normal'
    }
  },
  data: function data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {}
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "list-item",
    "class": ["padding-" + _vm.padding]
  }, [_vm._t("default", [_c("div", {
    staticClass: "clearfix"
  }, [_c("div", {
    staticClass: "list-item-left"
  }, [_vm._t("left")], 2), _vm._v(" "), _c("div", {
    staticClass: "list-item-right"
  }, [_vm._t("right")], 2), _vm._v(" "), _vm._t("content")], 2)])], 2);
};

var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-b53ef88e_0", {
    source: ".list-item {\n  position: relative;\n  padding: 12px 15px;\n  font-size: 16px;\n  line-height: 25px;\n  color: #000;\n}\n.list-item.padding-small {\n  padding: 7px 10px;\n}\n.list-item .list-item-left {\n  float: left;\n  max-width: 60%;\n}\n.list-item .list-item-right {\n  float: right;\n}\n.list-item .list-item-content {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.list-item .list-item-content.right {\n  text-align: right;\n}\n.list-item .list-item.placeholder .list-item-right {\n  color: #999;\n}\n.list-item .list-input {\n  font-size: 16px;\n  line-height: 22px;\n  background-color: transparent;\n  border: 0;\n  appearance: none;\n  -webkit-appearance: none;\n  box-sizing: border-box;\n}\n.list-item .list-input.block {\n  width: 100%;\n}\n.list-item .list-input.right {\n  text-align: right;\n  text-align-last: right;\n  text-align: -webkit-right;\n}\n.list-item .list-input.two {\n  height: 44px;\n}\n.list-item .list-input::-webkit-input-placeholder {\n  color: #999;\n}\n.list-item select.list-input.right {\n  direction: rtl;\n}\n.list-item select.list-input.right option {\n  text-align: right;\n  text-align-last: right;\n  text-align: -webkit-right;\n}\n.list-item .list-item-textarea {\n  width: 100%;\n  font-size: 16px;\n  line-height: 22px;\n  border: 0;\n  vertical-align: middle;\n  resize: none;\n}\n.list-item .list-item-textarea-length {\n  text-align: right;\n}\n.list-item .list-required {\n  color: #fc4548;\n}\n.list-item .list-item-placeholder-select {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  opacity: 0;\n}\n",
    map: {
      "version": 3,
      "sources": ["listItem.vue", "/Volumes/Repo2/repo/rebirth-project/compact-form/src/js/sections/listItem.vue"],
      "names": [],
      "mappings": "AAAA;EACE,kBAAkB;EAClB,kBAAkB;EAClB,eAAe;EACf,iBAAiB;EACjB,WAAW;AACb;AACA;EACE,iBAAiB;AACnB;AACA;EACE,WAAW;EACX,cAAc;AAChB;AACA;EACE,YAAY;AACd;AACA;EACE,gBAAgB;EAChB,uBAAuB;EACvB,mBAAmB;AACrB;AACA;EACE,iBAAiB;AACnB;AACA;EACE,WAAW;AACb;AACA;EACE,eAAe;EACf,iBAAiB;EACjB,6BAA6B;EAC7B,SAAS;EACT,gBAAgB;EAChB,wBAAwB;EACxB,sBAAsB;AACxB;AACA;EACE,WAAW;AACb;ACCA;EACA,iBAAA;EACA,sBAAA;EACA,yBAAA;ADCA;ACCA;EACA,YAAA;AACA;AACA;EACA,WAAA;AACA;AACA;EACA,cAAA;AACA;ADCA;ECCA,iBAAA;EACA,sBAAA;EACA,yBAAA;AACA;AACA;EACA,WAAA;EACA,eAAA;EACA,iBAAA;EACA,SAAA;EACA,sBAAA;EACA,YAAA;AACA;AACA;EACA,iBAAA;AACA;ADCA;ECCA,cAAA;AACA;AACA;EACA,kBAAA;EACA,MAAA;EDCE,QAAQ;ECCV,SAAA;EACA,OAAA;EACA,WAAA;EACA,UAAA;AACA",
      "file": "listItem.vue",
      "sourcesContent": [".list-item {\n  position: relative;\n  padding: 12px 15px;\n  font-size: 16px;\n  line-height: 25px;\n  color: #000;\n}\n.list-item.padding-small {\n  padding: 7px 10px;\n}\n.list-item .list-item-left {\n  float: left;\n  max-width: 60%;\n}\n.list-item .list-item-right {\n  float: right;\n}\n.list-item .list-item-content {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.list-item .list-item-content.right {\n  text-align: right;\n}\n.list-item .list-item.placeholder .list-item-right {\n  color: #999;\n}\n.list-item .list-input {\n  font-size: 16px;\n  line-height: 22px;\n  background-color: transparent;\n  border: 0;\n  appearance: none;\n  -webkit-appearance: none;\n  box-sizing: border-box;\n}\n.list-item .list-input.block {\n  width: 100%;\n}\n.list-item .list-input.right {\n  text-align: right;\n  text-align-last: right;\n  text-align: -webkit-right;\n}\n.list-item .list-input.two {\n  height: 44px;\n}\n.list-item .list-input::-webkit-input-placeholder {\n  color: #999;\n}\n.list-item select.list-input.right {\n  direction: rtl;\n}\n.list-item select.list-input.right option {\n  text-align: right;\n  text-align-last: right;\n  text-align: -webkit-right;\n}\n.list-item .list-item-textarea {\n  width: 100%;\n  font-size: 16px;\n  line-height: 22px;\n  border: 0;\n  vertical-align: middle;\n  resize: none;\n}\n.list-item .list-item-textarea-length {\n  text-align: right;\n}\n.list-item .list-required {\n  color: #fc4548;\n}\n.list-item .list-item-placeholder-select {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  opacity: 0;\n}\n", "<template>\n\n    <div class=\"list-item\" :class=\"['padding-' + padding]\">\n        <slot>\n            <div class=\"clearfix\">\n                <div class=\"list-item-left\">\n                    <slot name=\"left\"></slot>\n                </div>\n                <div class=\"list-item-right\">\n                    <slot name=\"right\"></slot>\n                </div>\n                <slot name=\"content\"></slot>\n            </div>\n        </slot>\n    </div>\n\n</template>\n<script lang=\"js\">\n\n/**\n * 支持slot=default slot=left slot=right slot=content，当default存在时，其他3个将失效\n */\nexport default {\n    name: 'ListItem',\n\n    props: {\n        padding: { type: String, default: 'normal' },\n    },\n\n    data: function data() {\n        return {};\n    },\n\n    computed: {},\n    watch: {},\n    methods: {},\n};\n</script>\n<style lang=\"less\">\n\n@list-font-size: 16px;\n@list-line-height: 25px;\n@list-padding-v: 12px;\n@list-padding-h: 15px;\n\n.list-item {\n    position: relative;\n    padding: @list-padding-v @list-padding-h;\n    font-size: @list-font-size;\n    line-height: @list-line-height;\n    color: #000;\n    &.padding-small {\n        padding: 7px 10px;\n    }\n\n    .list-item-left {\n        float: left;\n        max-width: 60%;\n    }\n    .list-item-right {\n        float: right;\n    }\n    .list-item-content {\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n    }\n    .list-item-content.right {\n        text-align: right;\n    }\n\n    .list-item.placeholder {\n        .list-item-right {\n            color: #999;\n        }\n    }\n\n    // 应用在input上\n    .list-input {\n        font-size: 16px;\n        line-height: 22px;\n        background-color: transparent;\n        border: 0;\n        // 删除原本样式\n        appearance: none;\n        -webkit-appearance: none;\n        box-sizing: border-box;\n        &.block {\n            width: 100%;\n        }\n        // 内容局右\n        &.right {\n            text-align: right;\n            text-align-last: right;\n            text-align: -webkit-right;\n        }\n        &.two {\n            height: 44px;\n        }\n        &::-webkit-input-placeholder {\n            color: #999;\n        }\n    }\n    select.list-input.right {\n        direction: rtl;\n        option {\n            text-align: right;\n            text-align-last: right;\n            text-align: -webkit-right;\n        }\n    }\n\n    // textarea的样式\n    .list-item-textarea {\n        width: 100%;\n        font-size: 16px;\n        line-height: 22px;\n        border: 0;\n        vertical-align: middle;\n        resize: none;\n    }\n    .list-item-textarea-length {\n        text-align: right;\n    }\n    .list-required {\n        color: #fc4548;\n    }\n    // select的样式\n    .list-item-placeholder-select {\n        position: absolute;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        left: 0;\n        width: 100%;\n        opacity: 0;\n    }\n}\n\n</style>\n"]
    },
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

var script$1 = {
  name: 'CompactInput',
  components: {
    ListItem: __vue_component__
  },
  props: {
    /** 标题 */
    title: {
      type: String
    },
    // 是否必填
    required: {
      type: Boolean,
      "default": false
    },
    // 数据
    value: {},
    // placeholder
    placeholder: {
      type: String,
      "default": '点击输入'
    },

    /** 类别 */
    type: {
      type: String,
      "default": 'text'
    },

    /** class */
    clazz: {}
  },
  data: function data() {
    return {
      // 值
      v: null
    };
  },
  computed: {},
  watch: {
    '$props.value': function $propsValue(val) {
      this.v = val;
    },
    v: function v(val) {
      this.$emit('input', val);
    }
  },
  methods: {
    onBlur: function onBlur() {
      this.$emit('blur');
    }
  },
  created: function created() {
    this.v = this.value;
  }
};

/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("ListItem", {
    "class": _vm.clazz
  }, [_c("label", {
    attrs: {
      slot: "left"
    },
    slot: "left"
  }, [_vm._v(_vm._s(_vm.title)), _vm.required ? _c("span", {
    staticClass: "list-required"
  }, [_vm._v("*")]) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "list-item-content",
    attrs: {
      slot: "content"
    },
    slot: "content"
  }, [_vm.type == "text" ? _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.v,
      expression: "v"
    }],
    staticClass: "list-input right block",
    attrs: {
      type: "text",
      placeholder: _vm.placeholder
    },
    domProps: {
      value: _vm.v
    },
    on: {
      blur: _vm.onBlur,
      input: function input($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.v = $event.target.value;
      }
    }
  }) : _vm._e(), _vm._v(" "), _vm.type == "tel" ? _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.v,
      expression: "v"
    }],
    staticClass: "list-input right block",
    attrs: {
      type: "tel",
      placeholder: _vm.placeholder
    },
    domProps: {
      value: _vm.v
    },
    on: {
      blur: _vm.onBlur,
      input: function input($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.v = $event.target.value;
      }
    }
  }) : _vm._e()])]);
};

var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;
/* style */

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = undefined;
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

export { __vue_component__$1 as CompactInput, __vue_component__ as ListItem };
