(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("FatinaPluginHelpers", [], factory);
	else if(typeof exports === 'object')
		exports["FatinaPluginHelpers"] = factory();
	else
		root["FatinaPluginHelpers"] = factory();
})(this, function() {
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function Get() {
    return new FatinaPluginHelpers();
}
exports.Get = Get;
var FatinaPluginHelpers = (function () {
    function FatinaPluginHelpers() {
        this.name = 'fatina-plugin-helpers';
        this.init = false;
    }
    FatinaPluginHelpers.prototype.Init = function (fatina) {
        if (this.init) {
            throw new Error('Try to init the plugin twice : ' + name);
        }
        if (fatina === undefined || fatina === null || fatina.plugin === null) {
            throw new Error('Try to init the plugin without fatina : ' + name);
        }
        this.fatina = fatina;
        this.init = true;
        fatina.plugin.AddHelpers = this.AddHelpers.bind(this);
    };
    FatinaPluginHelpers.prototype.AddHelpers = function (obj) {
        if (obj.position) {
            AddMoveHelpers(this.fatina, obj);
        }
        if (obj.rotation || obj.rotation === 0) {
            AddRotationHelpers(this.fatina, obj);
        }
        if (obj.alpha || obj.alpha === 0 || (obj.hue !== undefined && obj.hue.hasOwnProperty('a'))) {
            AddAlphaHelpers(this.fatina, obj);
        }
        if (obj.scale) {
            AddScaleHelpers(this.fatina, obj);
        }
        if (obj.hue) {
            AddHueHelpers(this.fatina, obj);
        }
        else if (obj.tint || obj.tint === 0) {
            AddTintHelpers(this.fatina, obj);
        }
    };
    return FatinaPluginHelpers;
}());
;
function AddMoveHelpers(fatina, obj) {
    obj.MoveTo = function (x, y, duration, autoStart) {
        var tween = fatina.Tween(this.position, ['x', 'y']).To({ x: x, y: y }, duration);
        return (autoStart === false) ? tween : tween.Start();
    };
    obj.MoveToRel = function (x, y, duration, autoStart) {
        var tween = this.MoveTo(x, y, duration, false).SetRelative(true);
        return (autoStart === false) ? tween : tween.Start();
    };
    obj.MoveXTo = function (x, duration, autoStart) {
        var tween = fatina.Tween(this.position, ['x']).To({ x: x }, duration);
        return (autoStart === false) ? tween : tween.Start();
    };
    obj.MoveXToRel = function (x, duration, autoStart) {
        var tween = this.MoveXTo(x, duration, false).SetRelative(true);
        return (autoStart === false) ? tween : tween.Start();
    };
    obj.MoveYTo = function (y, duration, autoStart) {
        var tween = fatina.Tween(this.position, ['y']).To({ y: y }, duration);
        return (autoStart === false) ? tween : tween.Start();
    };
    obj.MoveYToRel = function (y, duration, autoStart) {
        var tween = this.MoveYTo(y, duration, false).SetRelative(true);
        return (autoStart === false) ? tween : tween.Start();
    };
    obj.PunchPosition = function (x, y, duration, iteration, autoStart) {
        duration = duration || 60;
        iteration = iteration || 5;
        var originX = this.position.x;
        var originY = this.position.y;
        var sequence = fatina.Sequence();
        for (var i = 0; i < iteration; i++) {
            var coef = (i % 2 === 0) ? 1 : -1;
            var nextX = originX + (coef * x / (i + 1));
            var nextY = originY + (coef * y / (i + 1));
            var dur = duration / 2 / iteration;
            sequence.Append(this.MoveTo(nextX, nextY, dur, false).Yoyo(1));
        }
        return (autoStart === false) ? sequence : sequence.Start();
    };
    obj.Shake = function (x, y, duration, iteration, autoStart) {
        duration = duration || 60;
        iteration = iteration || 5;
        var originX = this.position.x;
        var originY = this.position.y;
        var sequence = fatina.Sequence();
        for (var i = 0; i < iteration; i++) {
            var nextX = originX + (Math.random() * x * 2 - x);
            var nextY = originY + (Math.random() * y * 2 - y);
            var dur = duration / 2 / iteration;
            sequence.Append(this.MoveTo(nextX, nextY, dur, false).Yoyo(1));
        }
        return (autoStart === false) ? sequence : sequence.Start();
    };
}
function AddRotationHelpers(fatina, obj) {
    obj.RotateTo = function (angle, duration, autoStart) {
        var tween = fatina.Tween(this, ['rotation']).To({ rotation: angle }, duration);
        return (autoStart === false) ? tween : tween.Start();
    };
    obj.RotateToRel = function (angle, duration, autoStart) {
        var tween = this.RotateTo(angle, duration, false).SetRelative(true);
        return (autoStart === false) ? tween : tween.Start();
    };
    obj.RotateDegTo = function (angle, duration, autoStart) {
        angle = degToRad(angle);
        var tween = fatina.Tween(this, ['rotation']).To({ rotation: angle }, duration);
        return (autoStart === false) ? tween : tween.Start();
    };
    obj.RotateDegToRel = function (angle, duration, autoStart) {
        var tween = this.RotateDegTo(angle, duration, false).SetRelative(true);
        return (autoStart === false) ? tween : tween.Start();
    };
    obj.PunchRotate = function (angle, duration, iteration, autoStart) {
        duration = duration || 60;
        iteration = iteration || 5;
        var rotation = this.rotation;
        var sequence = fatina.Sequence();
        for (var i = 0; i < iteration; i++) {
            var coef = (i % 2 === 0) ? 1 : -1;
            var ang = rotation + (coef * angle / (i + 1));
            var dur = duration / 2 / iteration;
            sequence.Append(this.RotateTo(ang, dur, false).Yoyo(1));
        }
        return (autoStart === false) ? sequence : sequence.Start();
    };
}
function AddAlphaHelpers(fatina, obj) {
    obj.FadeTo = function (a, duration, autoStart) {
        var tween = fatina.Tween(this, ['alpha']).To({ alpha: a }, duration);
        return (autoStart === false) ? tween : tween.Start();
    };
}
function AddScaleHelpers(fatina, obj) {
    obj.ScaleTo = function (x, y, duration, autoStart) {
        var tween = fatina.Tween(this.scale, ['x', 'y']).To({ x: x, y: y }, duration);
        return (autoStart === false) ? tween : tween.Start();
    };
    obj.ScaleToRel = function (x, y, duration, autoStart) {
        var tween = this.ScaleTo(x, y, duration, false).SetRelative(true);
        return (autoStart === false) ? tween : tween.Start();
    };
    obj.ScaleXTo = function (x, duration, autoStart) {
        var tween = fatina.Tween(this.scale, ['x']).To({ x: x }, duration);
        return (autoStart === false) ? tween : tween.Start();
    };
    obj.ScaleXToRel = function (x, duration, autoStart) {
        var tween = this.ScaleXTo(x, duration, false).SetRelative(true);
        return (autoStart === false) ? tween : tween.Start();
    };
    obj.ScaleYTo = function (y, duration, autoStart) {
        var tween = fatina.Tween(this.scale, ['y']).To({ y: y }, duration);
        return (autoStart === false) ? tween : tween.Start();
    };
    obj.ScaleYToRel = function (y, duration, autoStart) {
        var tween = this.ScaleYTo(y, duration, false).SetRelative(true);
        return (autoStart === false) ? tween : tween.Start();
    };
    obj.PunchScale = function (x, y, duration, iteration, autoStart) {
        duration = duration || 60;
        iteration = iteration || 5;
        var scaleX = this.scale.x;
        var scaleY = this.scale.y;
        var sequence = fatina.Sequence();
        for (var i = 0; i < iteration; i++) {
            var coef = (i % 2 === 0) ? 1 : -1;
            var nextX = scaleX + (coef * x / (i + 1));
            var nextY = scaleY + (coef * y / (i + 1));
            var dur = duration / 2 / iteration;
            sequence.Append(this.ScaleTo(nextX, nextY, dur, false).Yoyo(1));
        }
        return (autoStart === false) ? sequence : sequence.Start();
    };
}
function AddHueHelpers(fatina, obj) {
    obj.ColorTo = function (r, g, b, duration, autoStart) {
        var tween = fatina.Tween(this.hue, ['r', 'g', 'b']).To({ r: r, g: g, b: b }, duration);
        return (autoStart === false) ? tween : tween.Start();
    };
    obj.ColorToRel = function (r, g, b, duration, autoStart) {
        var tween = this.ColorTo(r, g, b, duration, false).SetRelative(true);
        return (autoStart === false) ? tween : tween.Start();
    };
    obj.ColorRGBTo = function (hex, duration, autoStart) {
        var color = hexToRGB(hex);
        var tween = fatina.Tween(this.hue, ['r', 'g', 'b']).To({ r: color.r, g: color.g, b: color.b }, duration);
        return (autoStart === false) ? tween : tween.Start();
    };
    obj.ColorRGBToRel = function (hex, duration, autoStart) {
        var tween = this.ColorRGBTo(hex, duration, false).SetRelative(true);
        return (autoStart === false) ? tween : tween.Start();
    };
    obj.PunchColor = function (r, g, b, duration, iteration, autoStart) {
        duration = duration || 60;
        iteration = iteration || 5;
        var red = this.hue.r;
        var green = this.hue.g;
        var blue = this.hue.b;
        var sequence = fatina.Sequence();
        for (var i = 0; i < iteration; i++) {
            var coef = (i % 2 === 0) ? 1 : -1;
            var nextRed = red + (coef * r / (i + 1));
            var nextGreen = green + (coef * g / (i + 1));
            var nextBlue = blue + (coef * b / (i + 1));
            var dur = duration / 2 / iteration;
            sequence.Append(this.ColorTo(nextRed, nextGreen, nextBlue, dur, false).Yoyo(1));
        }
        return (autoStart === false) ? sequence : sequence.Start();
    };
}
function AddTintHelpers(fatina, obj) {
    obj.ColorTo = function (r, g, b, duration, autoStart) {
        var _this = this;
        var tint = hexToRGB(this.tint.toString('16'));
        var tween = fatina.Tween(tint, ['r', 'g', 'b']).To({ r: r, g: g, b: b }, duration)
            .OnUpdate(function () { return _this.tint = rgbToInt(tint); });
        return (autoStart === false) ? tween : tween.Start();
    };
    obj.ColorToRel = function (r, g, b, duration, autoStart) {
        var tween = this.ColorTo(r, g, b, duration, false).SetRelative(true);
        return (autoStart === false) ? tween : tween.Start();
    };
    obj.ColorRGBTo = function (hex, duration, autoStart) {
        var _this = this;
        var tint = hexToRGB(this.tint.toString('16'));
        var color = hexToRGB(hex);
        var tween = fatina.Tween(tint, ['r', 'g', 'b']).To({ r: color.r, g: color.g, b: color.b }, duration)
            .OnUpdate(function () { return _this.tint = rgbToInt(tint); });
        return (autoStart === false) ? tween : tween.Start();
    };
    obj.ColorRGBToRel = function (hex, duration, autoStart) {
        var tween = this.ColorRGBTo(hex, duration, false).SetRelative(true);
        return (autoStart === false) ? tween : tween.Start();
    };
    obj.PunchColor = function (r, g, b, duration, iteration, autoStart) {
        duration = duration || 60;
        iteration = iteration || 5;
        var tint = hexToRGB(this.tint.toString('16'));
        var sequence = fatina.Sequence();
        for (var i = 0; i < iteration; i++) {
            var coef = (i % 2 === 0) ? 1 : -1;
            var nextRed = tint.r + (coef * r / (i + 1));
            var nextGreen = tint.g + (coef * g / (i + 1));
            var nextBlue = tint.b + (coef * b / (i + 1));
            var dur = duration / 2 / iteration;
            sequence.Append(this.ColorTo(nextRed, nextGreen, nextBlue, dur, false).Yoyo(1));
        }
        return (autoStart === false) ? sequence : sequence.Start();
    };
}
function degToRad(angle) {
    return angle * Math.PI / 180;
}
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
    while (color.length < 6) {
        color = '0' + color;
    }
    return {
        r: parseInt(color.substr(0, 2), 16) / 255,
        g: parseInt(color.substr(2, 2), 16) / 255,
        b: parseInt(color.substr(4, 2), 16) / 255,
    };
}
;
function rgbToInt(hue) {
    if (!hue) {
        return 0;
    }
    var r = componentToInt(hue.r) * 256 * 256;
    var g = componentToInt(hue.g) * 256;
    var b = componentToInt(hue.b);
    return r + g + b;
}
function componentToInt(val) {
    return Math.max(0, Math.min(255, Math.floor(val * 255)));
}


/***/ })
/******/ ]);
});
//# sourceMappingURL=fatina-plugin-helpers.js.map