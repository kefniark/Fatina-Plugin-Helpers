(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("FatinaPluginHelpers", [], factory);
	else if(typeof exports === 'object')
		exports["FatinaPluginHelpers"] = factory();
	else
		root["FatinaPluginHelpers"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * To get an instance of this plugin
 *
 * @export
 * @returns
 */
function get() {
    return new FatinaPluginHelpers();
}
exports.get = get;
/**
 * Declare a Fatina Plugin to add helpers to objects (pixi, ...)
 *
 * @export
 * @class FatinaPluginHelpers
 * @implements {IPlugin}
 */
class FatinaPluginHelpers {
    constructor() {
        this.name = 'fatina-plugin-helpers';
        this.initialized = false;
    }
    init(fatina) {
        if (this.initialized) {
            throw new Error('Try to init the plugin twice : ' + name);
        }
        if (fatina === undefined || fatina === null || fatina.plugin === null) {
            throw new Error('Try to init the plugin without fatina : ' + name);
        }
        this.fatina = fatina;
        this.initialized = true;
        fatina.plugin.addHelpers = this.addHelpers.bind(this);
    }
    addHelpers(obj) {
        // Add Helpers related to movement
        if (obj.position) {
            addMoveHelpers(this.fatina, obj);
        }
        // Add Helpers related to rotation
        if (obj.rotation || obj.rotation === 0) {
            addRotationHelpers(this.fatina, obj);
        }
        // Add Helpers related to alpha
        if (obj.alpha || obj.alpha === 0 || (obj.hue !== undefined && obj.hue.hasOwnProperty('a'))) {
            addAlphaHelpers(this.fatina, obj);
        }
        // Add Helpers related to scale
        if (obj.scale) {
            addScaleHelpers(this.fatina, obj);
        }
        // Add Helpers related to hue
        if (obj.hue) {
            addHueHelpers(this.fatina, obj);
        }
        else if (obj.tint || obj.tint === 0) {
            addTintHelpers(this.fatina, obj);
        }
    }
}
/**
 * Add Helpers related to movement
 *  - obj.moveTo(x, y, duration);
 *  - obj.moveXTo(x, duration);
 *  - obj.moveYTo(y, duration);
 *  - obj.moveToRel(x, y, duration);
 *  - obj.moveXToRel(x, duration);
 *  - obj.moveYToRel(y, duration);
 *  - obj.punchPosition(x, y, duration, iteration);
 *  - obj.shake(x, y, duration, iteration);
 *
 * @param {*} fatina
 * @param {*} obj
 */
function addMoveHelpers(fatina, obj) {
    obj.moveTo = function (x, y, duration, autoStart) {
        const tween = fatina.tween(this.position, ['x', 'y']).to({ x, y }, duration);
        return (autoStart === false) ? tween : tween.start();
    };
    obj.moveToRel = function (x, y, duration, autoStart) {
        const tween = this.moveTo(x, y, duration, false).setRelative(true);
        return (autoStart === false) ? tween : tween.start();
    };
    obj.moveXTo = function (x, duration, autoStart) {
        const tween = fatina.tween(this.position, ['x']).to({ x }, duration);
        return (autoStart === false) ? tween : tween.start();
    };
    obj.moveXToRel = function (x, duration, autoStart) {
        const tween = this.moveXTo(x, duration, false).setRelative(true);
        return (autoStart === false) ? tween : tween.start();
    };
    obj.moveYTo = function (y, duration, autoStart) {
        const tween = fatina.tween(this.position, ['y']).to({ y }, duration);
        return (autoStart === false) ? tween : tween.start();
    };
    obj.moveYToRel = function (y, duration, autoStart) {
        const tween = this.moveYTo(y, duration, false).setRelative(true);
        return (autoStart === false) ? tween : tween.start();
    };
    obj.punchPosition = function (x, y, duration, iteration, autoStart) {
        duration = duration || 60;
        iteration = iteration || 5;
        const originX = this.position.x;
        const originY = this.position.y;
        const sequence = fatina.sequence();
        for (let i = 0; i < iteration; i++) {
            const coef = (i % 2 === 0) ? 1 : -1;
            const nextX = originX + (coef * x / (i + 1));
            const nextY = originY + (coef * y / (i + 1));
            const dur = duration / 2 / iteration;
            sequence.append(this.moveTo(nextX, nextY, dur, false).yoyo(1));
        }
        return (autoStart === false) ? sequence : sequence.start();
    };
    obj.shake = function (x, y, duration, iteration, autoStart) {
        duration = duration || 60;
        iteration = iteration || 5;
        const originX = this.position.x;
        const originY = this.position.y;
        const sequence = fatina.sequence();
        for (let i = 0; i < iteration; i++) {
            const nextX = originX + (Math.random() * x * 2 - x);
            const nextY = originY + (Math.random() * y * 2 - y);
            const dur = duration / 2 / iteration;
            sequence.append(this.moveTo(nextX, nextY, dur, false).yoyo(1));
        }
        return (autoStart === false) ? sequence : sequence.start();
    };
}
/**
 * Add Helpers related to rotation
 *  - obj.rotateTo(angle, duration);
 *  - obj.rotateToRel(angle, duration);
 *  - obj.rotateDegTo(angle, duration);
 *  - obj.rotateDegToRel(angle, duration);
 *  - obj.punchRotate(angle, duration, iteration)
 *
 * @param {*} fatina
 * @param {*} obj
 */
function addRotationHelpers(fatina, obj) {
    obj.rotateTo = function (angle, duration, autoStart) {
        const tween = fatina.tween(this, ['rotation']).to({ rotation: angle }, duration);
        return (autoStart === false) ? tween : tween.start();
    };
    obj.rotateToRel = function (angle, duration, autoStart) {
        const tween = this.rotateTo(angle, duration, false).setRelative(true);
        return (autoStart === false) ? tween : tween.start();
    };
    obj.rotateDegTo = function (angle, duration, autoStart) {
        angle = degToRad(angle);
        const tween = fatina.tween(this, ['rotation']).to({ rotation: angle }, duration);
        return (autoStart === false) ? tween : tween.start();
    };
    obj.rotateDegToRel = function (angle, duration, autoStart) {
        const tween = this.rotateDegTo(angle, duration, false).setRelative(true);
        return (autoStart === false) ? tween : tween.start();
    };
    obj.punchRotate = function (angle, duration, iteration, autoStart) {
        duration = duration || 60;
        iteration = iteration || 5;
        const rotation = this.rotation;
        const sequence = fatina.sequence();
        for (let i = 0; i < iteration; i++) {
            const coef = (i % 2 === 0) ? 1 : -1;
            const ang = rotation + (coef * angle / (i + 1));
            const dur = duration / 2 / iteration;
            sequence.append(this.rotateTo(ang, dur, false).yoyo(1));
        }
        return (autoStart === false) ? sequence : sequence.start();
    };
}
/**
 * Add Helpers related to alpha
 *  - obj.fadeTo(alpha, duration);
 *
 * @param {*} fatina
 * @param {*} obj
 */
function addAlphaHelpers(fatina, obj) {
    obj.fadeTo = function (a, duration, autoStart) {
        const tween = fatina.tween(this, ['alpha']).to({ alpha: a }, duration);
        return (autoStart === false) ? tween : tween.start();
    };
}
/**
 * Add Helpers related to scale
 *  - obj.scaleTo(x, y, duration);
 *  - obj.scaleXTo(x, duration);
 *  - obj.scaleYTo(y, duration);
 *  - obj.scaleToRel(x, y, duration);
 *  - obj.scaleXToRel(x, duration);
 *  - obj.scaleYToRel(y, duration);
 *  - obj.punchScale(x, y, duration, iteration)
 *
 * @param {*} fatina
 * @param {*} obj
 */
function addScaleHelpers(fatina, obj) {
    obj.scaleTo = function (x, y, duration, autoStart) {
        const tween = fatina.tween(this.scale, ['x', 'y']).to({ x, y }, duration);
        return (autoStart === false) ? tween : tween.start();
    };
    obj.scaleToRel = function (x, y, duration, autoStart) {
        const tween = this.scaleTo(x, y, duration, false).setRelative(true);
        return (autoStart === false) ? tween : tween.start();
    };
    obj.scaleXTo = function (x, duration, autoStart) {
        const tween = fatina.tween(this.scale, ['x']).to({ x }, duration);
        return (autoStart === false) ? tween : tween.start();
    };
    obj.scaleXToRel = function (x, duration, autoStart) {
        const tween = this.scaleXTo(x, duration, false).setRelative(true);
        return (autoStart === false) ? tween : tween.start();
    };
    obj.scaleYTo = function (y, duration, autoStart) {
        const tween = fatina.tween(this.scale, ['y']).to({ y }, duration);
        return (autoStart === false) ? tween : tween.start();
    };
    obj.scaleYToRel = function (y, duration, autoStart) {
        const tween = this.scaleYTo(y, duration, false).setRelative(true);
        return (autoStart === false) ? tween : tween.start();
    };
    obj.punchScale = function (x, y, duration, iteration, autoStart) {
        duration = duration || 60;
        iteration = iteration || 5;
        const scaleX = this.scale.x;
        const scaleY = this.scale.y;
        const sequence = fatina.sequence();
        for (let i = 0; i < iteration; i++) {
            const coef = (i % 2 === 0) ? 1 : -1;
            const nextX = scaleX + (coef * x / (i + 1));
            const nextY = scaleY + (coef * y / (i + 1));
            const dur = duration / 2 / iteration;
            sequence.append(this.scaleTo(nextX, nextY, dur, false).yoyo(1));
        }
        return (autoStart === false) ? sequence : sequence.start();
    };
}
/**
 * Add Helpers related to colors / hue
 *  - obj.colorTo(r, g, b, duration);
 *  - obj.colorToRel(r, g, b, duration);
 *  - obj.colorRGBTo(hex, duration);
 *  - obj.colorRGBToRel(hex, duration);
 *  - obj.punchColor(r, g, b, duration, iteration)
 *
 * @param {*} fatina
 * @param {*} obj
 */
function addHueHelpers(fatina, obj) {
    obj.colorTo = function (r, g, b, duration, autoStart) {
        const tween = fatina.tween(this.hue, ['r', 'g', 'b']).to({ r, g, b }, duration);
        return (autoStart === false) ? tween : tween.start();
    };
    obj.colorToRel = function (r, g, b, duration, autoStart) {
        const tween = this.colorTo(r, g, b, duration, false).setRelative(true);
        return (autoStart === false) ? tween : tween.start();
    };
    obj.colorRGBTo = function (hex, duration, autoStart) {
        const color = hexToRGB(hex);
        const tween = fatina.tween(this.hue, ['r', 'g', 'b']).to({ r: color.r, g: color.g, b: color.b }, duration);
        return (autoStart === false) ? tween : tween.start();
    };
    obj.colorRGBToRel = function (hex, duration, autoStart) {
        const tween = this.colorRGBTo(hex, duration, false).setRelative(true);
        return (autoStart === false) ? tween : tween.start();
    };
    obj.punchColor = function (r, g, b, duration, iteration, autoStart) {
        duration = duration || 60;
        iteration = iteration || 5;
        const red = this.hue.r;
        const green = this.hue.g;
        const blue = this.hue.b;
        const sequence = fatina.sequence();
        for (let i = 0; i < iteration; i++) {
            const coef = (i % 2 === 0) ? 1 : -1;
            const nextRed = red + (coef * r / (i + 1));
            const nextGreen = green + (coef * g / (i + 1));
            const nextBlue = blue + (coef * b / (i + 1));
            const dur = duration / 2 / iteration;
            sequence.append(this.colorTo(nextRed, nextGreen, nextBlue, dur, false).yoyo(1));
        }
        return (autoStart === false) ? sequence : sequence.start();
    };
}
/**
 * Add Helpers related to colors / tint
 *  - obj.colorTo(r, g, b, duration);
 *  - obj.colorToRel(r, g, b, duration);
 *  - obj.colorRGBTo(hex, duration);
 *  - obj.colorRGBToRel(hex, duration);
 *  - obj.punchColor(r, g, b, duration, iteration)
 *
 * @param {*} fatina
 * @param {*} obj
 */
function addTintHelpers(fatina, obj) {
    obj.colorTo = function (r, g, b, duration, autoStart) {
        const tint = hexToRGB(this.tint.toString('16'));
        const tween = fatina.tween(tint, ['r', 'g', 'b']).to({ r, g, b }, duration)
            .onUpdate(() => this.tint = rgbToInt(tint));
        return (autoStart === false) ? tween : tween.start();
    };
    obj.colorToRel = function (r, g, b, duration, autoStart) {
        const tween = this.colorTo(r, g, b, duration, false).setRelative(true);
        return (autoStart === false) ? tween : tween.start();
    };
    obj.colorRGBTo = function (hex, duration, autoStart) {
        const tint = hexToRGB(this.tint.toString('16'));
        const color = hexToRGB(hex);
        const tween = fatina.tween(tint, ['r', 'g', 'b']).to({ r: color.r, g: color.g, b: color.b }, duration)
            .onUpdate(() => this.tint = rgbToInt(tint));
        return (autoStart === false) ? tween : tween.start();
    };
    obj.colorRGBToRel = function (hex, duration, autoStart) {
        const tween = this.colorRGBTo(hex, duration, false).setRelative(true);
        return (autoStart === false) ? tween : tween.start();
    };
    obj.punchColor = function (r, g, b, duration, iteration, autoStart) {
        duration = duration || 60;
        iteration = iteration || 5;
        const tint = hexToRGB(this.tint.toString('16'));
        const sequence = fatina.sequence();
        for (let i = 0; i < iteration; i++) {
            const coef = (i % 2 === 0) ? 1 : -1;
            const nextRed = tint.r + (coef * r / (i + 1));
            const nextGreen = tint.g + (coef * g / (i + 1));
            const nextBlue = tint.b + (coef * b / (i + 1));
            const dur = duration / 2 / iteration;
            sequence.append(this.colorTo(nextRed, nextGreen, nextBlue, dur, false).yoyo(1));
        }
        return (autoStart === false) ? sequence : sequence.start();
    };
}
/**
 * Helper to convert degrees to radians
 *
 * @param {number} angle
 * @returns {number}
 */
function degToRad(angle) {
    return angle * Math.PI / 180;
}
/**
 * Helper to convert a hex string from "#AARRGGBB", "#RRGGBB", "0xAARRGGBB", "0xRRGGBB",
 * "AARRGGBB", or "RRGGBB" to an array of numbers
 *
 * @param {string} color
 * @returns
 */
function hexToRGB(color) {
    if (color.charAt(0) === '#') {
        color = color.substr(1);
    }
    else if (color.indexOf('0x') === 0) {
        color = color.substr(2);
    }
    if (color.length === 8) {
        color = color.substr(2);
    }
    // pad if necessary
    while (color.length < 6) {
        color = '0' + color;
    }
    return {
        r: parseInt(color.substr(0, 2), 16) / 255,
        g: parseInt(color.substr(2, 2), 16) / 255,
        b: parseInt(color.substr(4, 2), 16) / 255,
    };
}
function rgbToInt(hue) {
    if (!hue) {
        return 0;
    }
    const r = componentToInt(hue.r) * 256 * 256;
    const g = componentToInt(hue.g) * 256;
    const b = componentToInt(hue.b);
    return r + g + b;
}
function componentToInt(val) {
    return Math.max(0, Math.min(255, Math.floor(val * 255)));
}


/***/ })

/******/ });
});
//# sourceMappingURL=fatina-plugin-helpers.js.map