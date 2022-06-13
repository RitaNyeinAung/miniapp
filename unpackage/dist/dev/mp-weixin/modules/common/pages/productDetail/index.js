(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["modules/common/pages/productDetail/index"],{

/***/ 617:
/*!********************************************************************************************************************!*\
  !*** G:/miniapp/ycy-applet-vue/ycy-applet-vue/main.js?{"page":"modules%2Fcommon%2Fpages%2FproductDetail%2Findex"} ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 5);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _index = _interopRequireDefault(__webpack_require__(/*! ./modules/common/pages/productDetail/index.vue */ 618));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 618:
/*!*********************************************************************************************!*\
  !*** G:/miniapp/ycy-applet-vue/ycy-applet-vue/modules/common/pages/productDetail/index.vue ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_54f3516c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=54f3516c& */ 619);
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ 621);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&lang=scss& */ 623);
/* harmony import */ var _C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 19);

var renderjs





/* normalize component */

var component = Object(_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_54f3516c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_54f3516c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _index_vue_vue_type_template_id_54f3516c___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "modules/common/pages/productDetail/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 619:
/*!****************************************************************************************************************************!*\
  !*** G:/miniapp/ycy-applet-vue/ycy-applet-vue/modules/common/pages/productDetail/index.vue?vue&type=template&id=54f3516c& ***!
  \****************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_54f3516c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=template&id=54f3516c& */ 620);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_54f3516c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_54f3516c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_54f3516c___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_54f3516c___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 620:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!G:/miniapp/ycy-applet-vue/ycy-applet-vue/modules/common/pages/productDetail/index.vue?vue&type=template&id=54f3516c& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    uniNumberBox: function() {
      return __webpack_require__.e(/*! import() | components/uni-number-box/uni-number-box */ "components/uni-number-box/uni-number-box").then(__webpack_require__.bind(null, /*! @/components/uni-number-box/uni-number-box.vue */ 819))
    },
    uParse: function() {
      return Promise.all(/*! import() | uview-ui/components/u-parse/u-parse */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uview-ui/components/u-parse/u-parse")]).then(__webpack_require__.bind(null, /*! @/uview-ui/components/u-parse/u-parse.vue */ 970))
    },
    uTable: function() {
      return __webpack_require__.e(/*! import() | uview-ui/components/u-table/u-table */ "uview-ui/components/u-table/u-table").then(__webpack_require__.bind(null, /*! @/uview-ui/components/u-table/u-table.vue */ 980))
    },
    uTr: function() {
      return __webpack_require__.e(/*! import() | uview-ui/components/u-tr/u-tr */ "uview-ui/components/u-tr/u-tr").then(__webpack_require__.bind(null, /*! @/uview-ui/components/u-tr/u-tr.vue */ 987))
    },
    uTh: function() {
      return __webpack_require__.e(/*! import() | uview-ui/components/u-th/u-th */ "uview-ui/components/u-th/u-th").then(__webpack_require__.bind(null, /*! @/uview-ui/components/u-th/u-th.vue */ 994))
    },
    uTd: function() {
      return __webpack_require__.e(/*! import() | uview-ui/components/u-td/u-td */ "uview-ui/components/u-td/u-td").then(__webpack_require__.bind(null, /*! @/uview-ui/components/u-td/u-td.vue */ 1001))
    },
    uniSwipeAction: function() {
      return __webpack_require__.e(/*! import() | uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action */ "uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action").then(__webpack_require__.bind(null, /*! @/uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.vue */ 1008))
    },
    uniSwipeActionItem: function() {
      return Promise.all(/*! import() | uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.vue */ 1013))
    }
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var l0 =
    _vm.couponList.length > 0
      ? _vm.__map(_vm.couponList.slice(0, 2), function(coupon, __i0__) {
          var $orig = _vm.__get_orig(coupon)

          var g0 = parseInt(coupon.condition).toFixed(0)
          var g1 = parseInt(coupon.money).toFixed(0)
          return {
            $orig: $orig,
            g0: g0,
            g1: g1
          }
        })
      : null

  var l1 = _vm.__map(_vm.couponList, function(coupon, index) {
    var $orig = _vm.__get_orig(coupon)

    var f0 = _vm._f("date")(coupon.use_start_time)

    var f1 = _vm._f("date")(coupon.use_end_time)

    return {
      $orig: $orig,
      f0: f0,
      f1: f1
    }
  })

  if (!_vm._isMounted) {
    _vm.e0 = function(coupon) {
      var args = [],
        len = arguments.length - 1
      while (len-- > 0) args[len] = arguments[len + 1]

      var _temp = args[args.length - 1].currentTarget.dataset,
        _temp2 = _temp.eventParams || _temp["event-params"],
        coupon = _temp2.coupon

      var _temp, _temp2

      return _vm.receiveCoupon(coupon)
    }

    _vm.e1 = function(address) {
      var args = [],
        len = arguments.length - 1
      while (len-- > 0) args[len] = arguments[len + 1]

      var _temp3 = args[args.length - 1].currentTarget.dataset,
        _temp4 = _temp3.eventParams || _temp3["event-params"],
        address = _temp4.address

      var _temp3, _temp4

      return _vm.selectAddress(address)
    }
  }

  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l0: l0,
        l1: l1
      }
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 621:
/*!**********************************************************************************************************************!*\
  !*** G:/miniapp/ycy-applet-vue/ycy-applet-vue/modules/common/pages/productDetail/index.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=script&lang=js& */ 622);
/* harmony import */ var _C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 622:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!G:/miniapp/ycy-applet-vue/ycy-applet-vue/modules/common/pages/productDetail/index.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 30));




































































































































































































































































































































































































































































var _api = _interopRequireDefault(__webpack_require__(/*! @/api.js */ 8));
var _config = _interopRequireDefault(__webpack_require__(/*! @/config.js */ 9));
var _vuex = __webpack_require__(/*! vuex */ 7);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var share = function share() {__webpack_require__.e(/*! require.ensure | components/share */ "components/share").then((function () {return resolve(__webpack_require__(/*! @/components/share */ 921));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var uniNumberBox = function uniNumberBox() {__webpack_require__.e(/*! require.ensure | components/uni-number-box/uni-number-box */ "components/uni-number-box/uni-number-box").then((function () {return resolve(__webpack_require__(/*! @/components/uni-number-box/uni-number-box.vue */ 819));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var uParse = function uParse() {Promise.all(/*! require.ensure | components/gaoyia-parse/parse */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/gaoyia-parse/parse")]).then((function () {return resolve(__webpack_require__(/*! @/components/gaoyia-parse/parse.vue */ 1026));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var _default =

{
  components: {
    share: share,
    uniNumberBox: uniNumberBox,
    uParse: uParse },

  data: function data() {
    return {

      specClass: 'none',
      couponClass: 'none',
      addressClass: 'none',

      favorite: false,
      shareList: [],

      images: [], //轮播图
      currentCarouselIndex: 0, //当前轮播图Index
      productInfo: null,
      skuProducts: [], //规格商品
      specChild: [], //子规格
      specGroup: [], //父规格
      selectedSkuProduct: null, //已选规格
      selectedQuantity: 1, //defualt 1; 已选数量 
      selectedSpecKey: {}, //已选 规格
      noProductMatch: true, //是否有 已选中的规格商品
      tempSelectedSkuProduct: null, //临时 规格商品 用于 在 弹穿显示
      tempSelectedSpecKey: null,
      tempSelectedAddress: null, //临时地址

      couponList: [], //优惠劵
      commentList: [], //评论
      commentCount: 0, //评论数量
      consultList: [], //咨询
      consultCount: 0,

      merchatDelivery: '',
      deliveryCal: '', //配送费
      freightCal: '', //运费
      expressDelivery: '',
      shopInfo: null,
      goodsDetail: '', //商品详情
      goodsAttr: [],
      recommendSet: [], //推荐套餐
      config: _config.default,
      desc: "\n\t\t\t\t<div style=\"width:100%\">\n\t\t\t\t\t<img style=\"width:100%;display:block;\" src=\"https://gd3.alicdn.com/imgextra/i4/479184430/O1CN01nCpuLc1iaz4bcSN17_!!479184430.jpg_400x400.jpg\" />\n\t\t\t\t\t<img style=\"width:100%;display:block;\" src=\"https://gd2.alicdn.com/imgextra/i2/479184430/O1CN01gwbN931iaz4TzqzmG_!!479184430.jpg_400x400.jpg\" />\n\t\t\t\t\t<img style=\"width:100%;display:block;\" src=\"https://gd3.alicdn.com/imgextra/i3/479184430/O1CN018wVjQh1iaz4aupv1A_!!479184430.jpg_400x400.jpg\" />\n\t\t\t\t\t<img style=\"width:100%;display:block;\" src=\"https://gd4.alicdn.com/imgextra/i4/479184430/O1CN01tWg4Us1iaz4auqelt_!!479184430.jpg_400x400.jpg\" />\n\t\t\t\t\t<img style=\"width:100%;display:block;\" src=\"https://gd1.alicdn.com/imgextra/i1/479184430/O1CN01Tnm1rU1iaz4aVKcwP_!!479184430.jpg_400x400.jpg\" />\n\t\t\t\t</div>\n\t\t\t",








      cartBadge: 0 };


  },
  computed: _objectSpread({},


  (0, _vuex.mapState)(['cart', 'hasLogin', 'addressList', 'selectedAddress'])),

  onPullDownRefresh: function onPullDownRefresh() {var _this2 = this;

    uni.showLoading({
      title: '加载数据中' });

    var _this = this;
    uni.request({
      url: _api.default.getProductInfoById + '?id=' + _this.productInfo.id,
      success: function success(res) {
        uni.hideLoading();
        if (res.data.data) {
          _this2.images = res.data.data.images;
          _this2.productInfo = res.data.data.goods;
          //获取 优惠劵
          _this.getProductComment();
          _this.getCouponList();
          _this.getAddressList();
          _this.getConsultList();
          _this.getShopInfo();
          _this.getGoodDetail(); //商品详情
          _this.getGoodAttr();
          _this.getRecommendSet(); //获取推荐套餐
        }
      },
      fail: function fail(res) {
        console.log(res);
      } });

    uni.request({
      url: _api.default.getProductSpec + '?id=' + _this.productInfo.id,
      success: function success(res) {
        uni.hideLoading();
        if (res.data.data) {
          _this2.skuProducts = res.data.data.goods;
          _this2.specChild = res.data.data.spec.spec_children;
          _this2.specGroup = res.data.data.spec.spec_group;

          _this2.skuProducts.map(function (sku) {
            // 根据 key 添加 规格名称
            sku.key_text = '';
            var keys = sku.key.split('_');
            var specKey = {}; // 将 此商品的 规格 转成 object
            keys.forEach(function (key) {
              var temp = _this2.specChild.find(function (spec) {return spec.id == key;});
              if (temp != -1) {
                specKey[temp.spec_id] = temp.id;
                sku.key_text += temp.item + ' ';
              }
            });
            sku.specKey = specKey;
            return sku;
          });

          if (_this2.skuProducts.length > 0) {
            _this2.selectedSkuProduct = _this2.skuProducts[0];
            _this2.generateSpecKeyObject();
            _this2.noProductMatch = false;
            _this2.tempSelectedSkuProduct = _objectSpread({}, _this2.selectedSkuProduct);
            _this2.tempSelectedSpecKey = _objectSpread({}, _this2.selectedSpecKey);
          }



        }
      },
      fail: function fail(res) {
        uni.hideLoading();
      } });

  },
  onLoad: function onLoad(options) {var _this3 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var id, _this;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:

              //接收传值,id里面放的是标题，因为测试数据并没写id 
              id = options.id;

              //fetch data from server
              uni.showLoading({
                title: '加载数据中' });

              _this = _this3;
              uni.request({
                url: _api.default.getProductInfoById + '?id=' + id,
                success: function success(res) {
                  uni.hideLoading();
                  if (res.data.data) {
                    _this3.images = res.data.data.images;
                    _this3.productInfo = res.data.data.goods;
                    //获取 优惠劵
                    _this.getProductComment();
                    _this.getCouponList();
                    _this.getAddressList();
                    _this.getConsultList();
                    _this.getShopInfo();
                    _this.getGoodDetail(); //商品详情
                    _this.getGoodAttr();
                    _this.getRecommendSet(); //获取推荐套餐
                  }
                },
                fail: function fail(res) {
                  console.log(res);
                } });

              uni.request({
                url: _api.default.getProductSpec + '?id=' + id,
                success: function success(res) {
                  uni.hideLoading();
                  if (res.data.data) {
                    _this3.skuProducts = res.data.data.goods;
                    _this3.specChild = res.data.data.spec.spec_children;
                    _this3.specGroup = res.data.data.spec.spec_group;

                    _this3.skuProducts.map(function (sku) {
                      // 根据 key 添加 规格名称
                      sku.key_text = '';
                      var keys = sku.key.split('_');
                      var specKey = {}; // 将 此商品的 规格 转成 object
                      keys.forEach(function (key) {
                        var temp = _this3.specChild.find(function (spec) {return spec.id == key;});
                        if (temp != -1) {
                          specKey[temp.spec_id] = temp.id;
                          sku.key_text += temp.item + ' ';
                        }
                      });
                      sku.specKey = specKey;
                      return sku;
                    });

                    if (_this3.skuProducts.length > 0) {
                      _this3.selectedSkuProduct = _this3.skuProducts[0];
                      _this3.generateSpecKeyObject();
                      _this3.noProductMatch = false;
                      _this3.tempSelectedSkuProduct = _objectSpread({}, _this3.selectedSkuProduct);
                      _this3.tempSelectedSpecKey = _objectSpread({}, _this3.selectedSpecKey);
                    }



                  }
                },
                fail: function fail(res) {
                  uni.hideLoading();
                } });





              //规格 默认选中第一条
              // this.specList.forEach(item=>{
              // 	for(let cItem of this.specChildList){
              // 		if(cItem.pid === item.id){
              // 			this.$set(cItem, 'selected', true);
              // 			this.specSelected.push(cItem);
              // 			break; //forEach不能使用break
              // 		}
              // 	}
              // })
              // this.shareList = await this.$api.json('shareList');
            case 5:case "end":return _context.stop();}}}, _callee);}))();},
  methods: _objectSpread(_objectSpread(_objectSpread({},

  (0, _vuex.mapMutations)(['toggleLoginPopup', 'setAddressList', 'updateCart'])),

  (0, _vuex.mapActions)(['asyncGetAddressList'])), {}, {
    toggleSpec: function toggleSpec() {var _this4 = this;
      if (this.specClass === 'show') {
        this.specClass = 'hide';
        setTimeout(function () {
          _this4.specClass = 'none';
        }, 250);
      } else if (this.specClass === 'none') {
        this.specClass = 'show';
        this.tempSelectedSkuProduct = _objectSpread({}, this.selectedSkuProduct);
        this.tempSelectedSpecKey = _objectSpread({}, this.selectedSpecKey);
      }
    },
    toOrder: function toOrder() {
      var _this = this;
      if (!this.hasLogin) {
        uni.showToast({
          title: "请登录",
          icon: 'none' });

        return;
      }

      uni.navigateTo({
        url: '/modules/common/pages/productDetail/confirmOrder?good_id=' + _this.productInfo.id + '&num=' + _this.selectedQuantity,
        fail: function fail(e) {
          console.log(e);
        } });


    },
    toggleCoupon: function toggleCoupon() {var _this5 = this;
      if (this.couponList.length <= 0) return;
      if (this.couponClass === 'show') {
        this.couponClass = 'hide';
        setTimeout(function () {
          _this5.couponClass = 'none';
        }, 250);
      } else if (this.couponClass === 'none') {
        var token = uni.getStorageSync("token");
        if (!token) {
          this.toggleLoginPopup();
          return;
        }
        this.couponClass = 'show';
      }
      //优惠劵
    },
    //送货地址
    toggleAddress: function toggleAddress() {var _this6 = this;

      if (this.addressClass === 'show') {
        this.addressClass = 'hide';
        setTimeout(function () {
          _this6.addressClass = 'none';
        }, 250);
      } else if (this.addressClass === 'none') {
        var token = uni.getStorageSync("token");
        if (!token) {
          this.toggleLoginPopup();
          return;
        }
        this.addressClass = 'show';
      }
      //优惠劵
    },
    //完成规格选项
    confirmSelectedSpec: function confirmSelectedSpec() {
      if (!this.noProductMatch) {
        this.selectedSkuProduct = _objectSpread({}, this.tempSelectedSkuProduct);
        this.selectedSpecKey = _objectSpread({}, this.tempSelectedSpecKey);
      }
      this.toggleSpec();
    },
    addNewAddress: function addNewAddress() {
      uni.navigateTo({
        url: 'modules/common/pages/addNewAddress/index' });

    },
    //选择规格
    selectSpec: function selectSpec(spec) {
      if (this.tempSelectedSpecKey[spec.spec_id] && this.tempSelectedSpecKey[spec.spec_id] == spec.id) {
        //取消选择
        delete this.tempSelectedSpecKey[spec.spec_id];
      } else {
        this.tempSelectedSpecKey[spec.spec_id] = spec.id;
        this.tempSelectedSpecKey = this.tempSelectedSpecKey;
      }

      //get the price from sku for this spec
      var _this = this;
      var current = this.skuProducts.find(function (sku) {
        return JSON.stringify(sku.specKey) == JSON.stringify(_this.tempSelectedSpecKey);
      });


      if (current == undefined || current == -1) {

        this.noProductMatch = true;
      } else {
        this.tempSelectedSkuProduct = current;
        this.noProductMatch = false; // 没有可用的 规格 商品
      }



    },
    //生成 已选 规格 对象
    generateSpecKeyObject: function generateSpecKeyObject() {var _this7 = this;
      var selectedSpecKey = {};

      this.selectedSkuProduct.key.split('_').forEach(function (key) {
        var temp = _this7.specChild.find(function (spec) {return spec.id == key;});
        if (temp != -1) {
          selectedSpecKey[temp.spec_id] = temp.id;
        }
      });
      this.selectedSpecKey = selectedSpecKey;

    },
    getCouponList: function getCouponList() {
      var _this = this;
      uni.request({
        url: _api.default.getCouponList + '?store_id=' + this.productInfo.store_id,
        method: 'POST',
        data: {
          token: uni.getStorageSync('token') },

        success: function success(result) {
          if (result.data.data) {
            _this.couponList = result.data.data.records;
          }
        },
        fail: function fail(e) {
          console.log(e);
        } });

    },
    //领取优惠劵
    receiveCoupon: function receiveCoupon(coupon) {
      var _this = this;
      uni.showLoading({
        title: "领取优惠劵中" });

      uni.request({
        url: _api.default.getCoupon,
        method: 'POST',
        data: {
          token: uni.getStorageSync('token'),
          id: coupon.id },

        success: function success(result) {
          uni.hideLoading();
          console.log(result);
          if (result.data.data) {
            uni.showToast({
              title: "领卷成功" });

            _this.couponList.map(function (c) {
              if (c.id == coupon.id) {
                c.status = 1;
              }
              return c;
            });

          } else {
            if (result.data.status == 10001) {
              _this.toggleLoginPopup();
            }
          }

        },
        fail: function fail(e) {
          uni.hideLoading();
          console.log(e);
          uni.showToast({
            title: "领取失败" });

        } });

    },
    getAddressList: function getAddressList() {

      var _this = this;
      _this.asyncGetAddressList();
    },
    getProductComment: function getProductComment() {
      var _this = this;
      uni.request({
        url: _api.default.getProductComment + '?goods_id=' + _this.productInfo.id + '&type=0&status=4&page=1',
        method: 'GET',
        success: function success(result) {
          if (result.data.data) {
            _this.commentList = result.data.data.list;
            _this.commentCount = result.data.data.allCount;
          }
        },
        fail: function fail(e) {
          console.log(e);
        } });

    },
    //选择地址
    selectAddress: function selectAddress(address) {var _this8 = this;
      this.addressList.map(function (a) {
        if (a.id == address.id) {
          a.selected = true;
          _this8.selectedAddress = a;
        } else {
          a.selected = false;
        }
        return a;
      });
      this.toggleAddress();
    },
    getConsultList: function getConsultList() {
      var _this = this;
      uni.request({
        url: _api.default.getConsultList + '?page=1&' + 'goods_id=' + _this.productInfo.id,
        method: 'GET',
        success: function success(result) {
          if (result.data.data) {
            _this.consultList = result.data.data.records;
            _this.consultCount = result.data.data.countTotal;
          }
        },
        fail: function fail(e) {
          console.log(e);
        } });

    },
    toCommentPage: function toCommentPage() {
      var _this = this;
      uni.navigateTo({
        url: 'modules/common/pages/productComment/index?id=' + _this.productInfo.id });


    },
    toConsultPage: function toConsultPage() {
      var _this = this;
      uni.navigateTo({
        url: 'modules/common/pages/productConsult/index?id=' + _this.productInfo.id });


    },
    //登录后 刷新数据
    refreshData: function refreshData() {
      this.getCouponList();
      this.getAddressList();
    },
    //收藏
    toFavorite: function toFavorite() {
      this.favorite = !this.favorite;
    },
    buy: function buy() {
      uni.navigateTo({
        url: "/pages/order/createOrder" });

    },
    stopPrevent: function stopPrevent() {},
    addToCart: function addToCart() {
      var _this = this;
      uni.showLoading({
        title: '加入购物车中' });

      var token = uni.getStorageSync('token');

      uni.request({
        url: _api.default.addToCart,
        method: 'post',
        header: {
          'Authorization': 'Bearer ' + token },

        data: {
          'goods_id': _this.selectedSkuProduct.id,
          'price_new': _this.selectedSkuProduct.price_member,
          'goods_num': _this.selectedQuantity,
          'store_id': _this.shopInfo.id,
          'token': uni.getStorageSync('token') || '-' },

        success: function success(res) {
          if (res.data.status == 10001) {
            uni.hideLoading();
            uni.showToast({
              title: res.data.message,
              icon: 'none' });

            _this.setHasLogin(false);
          }
          uni.hideLoading();
          if (res.data.status == 1) {
            _this.updateCart({ type: "add", item: _this.selectedSkuProduct });
          }
          uni.showToast({
            title: '加入成功' });

        },
        fail: function fail(err) {
          uni.hideLoading();
          uni.showToast({
            title: '加入失败',
            icon: 'none' });

        } });

    },
    getExpressInfo: function getExpressInfo() {

      var _this = this;
      uni.request({
        url: _api.default.getExpressInfo,
        data: {
          goods_id: this.productInfo.id,
          token: uni.getStorageSync("token") },

        method: "POST",
        success: function success(res) {
          _this.expressDelivery = res.data.data;
        },
        fail: function fail(err) {
          _this.expressDelivery = err.data.data;
          console.log(err);
        } });

    },
    quantityChange: function quantityChange(data) {
      this.selectedQuantity = data.number;
    },
    carouselChange: function carouselChange(e) {
      this.currentCarouselIndex = e.detail.current;
    },
    getShopInfo: function getShopInfo() {
      var _this = this;
      uni.request({
        url: _api.default.shopInfo,
        data: {
          token: uni.getStorageSync("token"),
          id: _this.productInfo.store_id },

        success: function success(res) {
          _this.shopInfo = res.data.data;
        },
        fail: function fail(e) {
          console.log(e);
        } });

    },
    getGoodDetail: function getGoodDetail() {
      console.log("getting good detail");
      var _this = this;
      uni.request({
        url: _api.default.goodsDetail,
        data: {
          goods_id: _this.productInfo.id },

        method: "POST",
        success: function success(res) {
          _this.goodsDetail = res.data.data;
          console.log(_this.goodsDetail);
        },
        fail: function fail(e) {
          console.log(e);
        } });

    },
    getGoodAttr: function getGoodAttr() {
      var _this = this;
      uni.request({
        url: _api.default.goodsAttr,
        data: {
          id: _this.productInfo.id },

        method: "POST",
        success: function success(res) {
          console.log(res);
          if (res.data.data) {
            _this.goodsAttr = res.data.data.attr;
          }
        },
        fail: function fail(e) {
          console.log(e);
        } });

    },
    getRecommendSet: function getRecommendSet() {
      return;
      var _this = this;
      uni.request({
        url: _api.default.recommendSet,
        data: {
          goods_id: _this.productInfo.id },

        method: "POST",
        success: function success(res) {
          console.log(res);
          if (res.data.data) {
            _this.recommendSet = res.data.data;
          }
        },
        fail: function fail(e) {
          console.log(e);
        } });

    },
    addToCollection: function addToCollection() {
      var type = this.favorite ? 2 : 1;
      var goods_id = this.productInfo.id;
      uni.request({
        url: _api.default.AddToCollection,
        method: "POST",
        data: {
          goods_id: goods_id,
          type: type,
          token: uni.getStorageSync("token") },

        success: function success(res) {
          if (type == 1 && res.data.status == 1) {
            uni.showToast({
              title: "收藏成功",
              icon: "none" });

            this.favorite = true;
          }
        },
        fail: function fail(e) {
          console.log(e);
        } });

    } }),

  filters: {
    discount: function discount(price, _discount) {
      return (price * _discount / 100.00).toFixed(2);
    },
    date: function date(timestamp) {
      var date = new Date(timestamp);
      return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    } },

  watch: {
    selectedAddress: function selectedAddress(newVal, oldVal) {
      var _this = this;
      if (newVal) {
        uni.request({
          url: _api.default.deliveryCalc,
          method: 'POST',
          data: {
            token: uni.getStorageSync("token"),
            goods_id: _this.productInfo.id,
            prov_id: newVal.prov,
            dist_id: newVal.dist,
            city_id: newVal.city,
            store_id: _this.productInfo.store_id },

          success: function success(res) {
            if (res.data.status == 1) {
              _this.deliveryCal = res.data.data.money;
              _this.merchantDelivery = res.data.data.transport;
            }
            if (res.data.status == 0) {
              uni.request({
                url: _api.default.freightCalc,
                method: 'POST',
                data: {
                  token: uni.getStorageSync("token"),
                  goods_id: _this.productInfo.id,
                  prov_id: newVal.prov,
                  dist_id: newVal.dist,
                  city_id: newVal.city,
                  store_id: _this.productInfo.store_id },

                success: function success(res) {
                  _this.freightCal = res.data.data;

                },
                fail: function fail(e) {
                  console.log(e);
                } });

              _this.getExpressInfo();
            }
          },
          fail: function fail(e) {
            console.log(e);
          } });

      }
    },
    cart: function cart(newVal, oldVal) {
      this.cartBadge = newVal.length;
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 623:
/*!*******************************************************************************************************************************!*\
  !*** G:/miniapp/ycy-applet-vue/ycy-applet-vue/modules/common/pages/productDetail/index.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=style&index=0&lang=scss& */ 624);
/* harmony import */ var _C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Rita_Nyein_Aung_Downloads_HBuilderX_3_3_5_20211229_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 624:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!G:/miniapp/ycy-applet-vue/ycy-applet-vue/modules/common/pages/productDetail/index.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[617,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/modules/common/pages/productDetail/index.js.map