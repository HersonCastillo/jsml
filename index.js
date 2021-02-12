/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/core/change-detection.js":
/*!***************************************!*\
  !*** ./dist/core/change-detection.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.ChangeDetection = void 0;\r\nclass ChangeDetection {\r\n    constructor(page, pageFunction) {\r\n        this.page = page;\r\n        this.pageFunction = pageFunction;\r\n    }\r\n    update() {\r\n        const { renderContext } = this.page;\r\n        renderContext(this.pageFunction, this.page);\r\n    }\r\n}\r\nexports.ChangeDetection = ChangeDetection;\r\n\n\n//# sourceURL=webpack://@htevez/jsml/./dist/core/change-detection.js?");

/***/ }),

/***/ "./dist/core/component.js":
/*!********************************!*\
  !*** ./dist/core/component.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\r\nvar __rest = (this && this.__rest) || function (s, e) {\r\n    var t = {};\r\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\r\n        t[p] = s[p];\r\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\r\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\r\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\r\n                t[p[i]] = s[p[i]];\r\n        }\r\n    return t;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Component = void 0;\r\nclass Component {\r\n    constructor(element, args) {\r\n        this.element = element;\r\n        this.args = args;\r\n    }\r\n    render() {\r\n        if (typeof this.element === 'function') {\r\n            const CurrentComponent = this.element;\r\n            this.element = CurrentComponent(this.args);\r\n        }\r\n        return this.createElement(this.element);\r\n    }\r\n    createElement(jsElement) {\r\n        const { classes, child, events, tag, style } = jsElement, rest = __rest(jsElement, [\"classes\", \"child\", \"events\", \"tag\", \"style\"]);\r\n        const domElement = document.createElement(tag);\r\n        if (style) {\r\n            this.assignStyle(domElement, style);\r\n        }\r\n        if (classes) {\r\n            this.assignClasses(domElement, classes);\r\n        }\r\n        if (events && events.length) {\r\n            this.assignEvents(domElement, events);\r\n        }\r\n        if (Object.keys(rest).length) {\r\n            this.assignUnsigedProperties(domElement, rest);\r\n        }\r\n        if (child) {\r\n            if (typeof child === 'string') {\r\n                domElement.innerHTML = child;\r\n            }\r\n            else {\r\n                if (Array.isArray(child) && child.length) {\r\n                    for (const currentChild of child) {\r\n                        const currentChildElement = this.createElement(currentChild);\r\n                        this.appendChild(domElement, currentChildElement);\r\n                    }\r\n                }\r\n                else {\r\n                    const childElement = this.createElement(child);\r\n                    this.appendChild(domElement, childElement);\r\n                }\r\n            }\r\n        }\r\n        return domElement;\r\n    }\r\n    appendChild(element, node) {\r\n        if (element && node) {\r\n            element.appendChild(node);\r\n        }\r\n    }\r\n    assignStyle(element, style) {\r\n        if (element && style) {\r\n            for (const styleElement in style) {\r\n                element.style[styleElement] = style[styleElement];\r\n            }\r\n        }\r\n    }\r\n    assignClasses(element, classes) {\r\n        if (element && classes && classes.length) {\r\n            for (const className of classes) {\r\n                if (element && element.classList) {\r\n                    element.classList.add(className);\r\n                }\r\n            }\r\n        }\r\n    }\r\n    assignEvents(element, events) {\r\n        if (element && events && events.length) {\r\n            for (const event of events) {\r\n                const { name, handler } = event;\r\n                element.addEventListener(name, handler);\r\n            }\r\n        }\r\n    }\r\n    assignUnsigedProperties(element, props) {\r\n        if (element) {\r\n            for (const prop in props) {\r\n                element.setAttribute(prop, String(props[prop]));\r\n            }\r\n        }\r\n    }\r\n}\r\nexports.Component = Component;\r\n\n\n//# sourceURL=webpack://@htevez/jsml/./dist/core/component.js?");

/***/ }),

/***/ "./dist/core/page.js":
/*!***************************!*\
  !*** ./dist/core/page.js ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Page = void 0;\r\nconst change_detection_1 = __webpack_require__(/*! ./change-detection */ \"./dist/core/change-detection.js\");\r\nconst component_1 = __webpack_require__(/*! ./component */ \"./dist/core/component.js\");\r\nconst routing_1 = __webpack_require__(/*! ./routing */ \"./dist/core/routing.js\");\r\nclass Page {\r\n    constructor(zone, page, args) {\r\n        this.zone = zone;\r\n        this.page = page;\r\n        this.args = args;\r\n    }\r\n    get safeZone() {\r\n        return this.zone;\r\n    }\r\n    manageRoutes(routes) {\r\n        if (routes && routes.length) {\r\n            const routing = new routing_1.Routing(routes, this);\r\n            routing.start();\r\n        }\r\n    }\r\n    appendChilds(element, childs) {\r\n        if (childs && childs.length) {\r\n            for (const child of childs) {\r\n                element.appendChild(child);\r\n            }\r\n        }\r\n    }\r\n    components(components) {\r\n        if (components && components.length) {\r\n            return components.map((component) => (new component_1.Component(component).render()));\r\n        }\r\n        return [];\r\n    }\r\n    applyBodyComponents(body, zone) {\r\n        const bodyComponents = [];\r\n        if (body && body.length) {\r\n            bodyComponents.push(...this.components(body));\r\n            if (bodyComponents.length) {\r\n                this.appendChilds(zone, bodyComponents);\r\n            }\r\n        }\r\n        return bodyComponents;\r\n    }\r\n    updateDocumentTitle(title) {\r\n        const domTitleElement = document.querySelector('title');\r\n        domTitleElement.innerText = title;\r\n    }\r\n    renderContext(pageElement, pageInstance) {\r\n        const context = new Page(pageInstance.safeZone, pageElement, {\r\n            changeDetection: new change_detection_1.ChangeDetection(this, pageElement)\r\n        });\r\n        context.render();\r\n    }\r\n    render(routing = false) {\r\n        if (typeof this.page === 'function') {\r\n            const PageComponent = this.page;\r\n            this.page = PageComponent(Object.assign(Object.assign({}, this.args), { changeDetection: new change_detection_1.ChangeDetection(this, PageComponent) }));\r\n        }\r\n        const { body, title, routes } = this.page;\r\n        const components = this.applyBodyComponents(body, this.zone);\r\n        if (title && title.length) {\r\n            this.updateDocumentTitle(title);\r\n        }\r\n        if (!routing && routes && routes.length) {\r\n            this.manageRoutes(routes);\r\n        }\r\n        return components;\r\n    }\r\n}\r\nexports.Page = Page;\r\n\n\n//# sourceURL=webpack://@htevez/jsml/./dist/core/page.js?");

/***/ }),

/***/ "./dist/core/routing.js":
/*!******************************!*\
  !*** ./dist/core/routing.js ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Routing = void 0;\r\nclass Routing {\r\n    constructor(routes, pageInstance) {\r\n        this.routes = routes;\r\n        this.pageInstance = pageInstance;\r\n        this.currentHash = location.hash;\r\n        window.onhashchange = this.hashChangeEvent.bind(this);\r\n    }\r\n    start() {\r\n        const currentRoute = this.manageCurrentHash();\r\n        this.renderPage(currentRoute);\r\n    }\r\n    hashChangeEvent() {\r\n        this.currentHash = location.hash;\r\n        const currentRoute = this.manageCurrentHash();\r\n        this.renderPage(currentRoute);\r\n    }\r\n    manageCurrentHash() {\r\n        if (this.currentHash.length === 0) {\r\n            location.href = \"#\";\r\n            return null;\r\n        }\r\n        const route = this.currentHash.replace('#', '');\r\n        return route.trim();\r\n    }\r\n    evaluateCleanZone(route) {\r\n        if (route) {\r\n            const currentRoute = this.currentRoute;\r\n            if (currentRoute) {\r\n                return currentRoute.path !== route.path;\r\n            }\r\n            else {\r\n                return true;\r\n            }\r\n        }\r\n        return false;\r\n    }\r\n    cleanZone() {\r\n        this.pageInstance.safeZone.innerHTML = \"\";\r\n    }\r\n    renderPage(currentPath) {\r\n        const { routes } = this;\r\n        const notFound = routes.find((route) => (route.path.includes('**')));\r\n        const currentPage = routes.find((route) => (route.path.includes(currentPath))\r\n            || (Boolean(route.default) && !currentPath));\r\n        if (currentPage) {\r\n            this.prepareRenderization(currentPage);\r\n        }\r\n        else if (notFound) {\r\n            this.prepareRenderization(notFound);\r\n        }\r\n        else {\r\n            throw Error('Wrong routing configuration');\r\n        }\r\n    }\r\n    prepareRenderization(route) {\r\n        const { page } = route;\r\n        const renderStatus = this.evaluateCleanZone(route);\r\n        this.currentRoute = route;\r\n        if (renderStatus) {\r\n            this.cleanZone();\r\n            this.pageInstance.renderContext(page, this.pageInstance);\r\n        }\r\n    }\r\n}\r\nexports.Routing = Routing;\r\n\n\n//# sourceURL=webpack://@htevez/jsml/./dist/core/routing.js?");

/***/ }),

/***/ "./dist/index.js":
/*!***********************!*\
  !*** ./dist/index.js ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Component = exports.Page = void 0;\r\nvar page_1 = __webpack_require__(/*! ./core/page */ \"./dist/core/page.js\");\r\nObject.defineProperty(exports, \"Page\", ({ enumerable: true, get: function () { return page_1.Page; } }));\r\nvar component_1 = __webpack_require__(/*! ./core/component */ \"./dist/core/component.js\");\r\nObject.defineProperty(exports, \"Component\", ({ enumerable: true, get: function () { return component_1.Component; } }));\r\n\n\n//# sourceURL=webpack://@htevez/jsml/./dist/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./dist/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;