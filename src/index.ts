import { IPlugin } from 'fatina';

/**
 * To get an instance of this plugin
 *
 * @export
 * @returns
 */
export function Get(): IPlugin {
	return new FatinaPluginHelpers();
}

/**
 * Declare a Fatina Plugin to add helpers to objects (pixi, ...)
 *
 * @export
 * @class FatinaPluginHelpers
 * @implements {IPlugin}
 */
class FatinaPluginHelpers implements IPlugin {
	public readonly name: string = 'fatina-plugin-helpers';
	private fatina: any;
	private init = false;

	public Init(fatina: any) {
		if (this.init) {
			throw new Error('Try to init the plugin twice : ' + name);
		}

		if (fatina === undefined || fatina === null || fatina.plugin === null) {
			throw new Error('Try to init the plugin without fatina : ' + name);
		}

		this.fatina = fatina;
		this.init = true;
		fatina.plugin.AddHelpers = this.AddHelpers.bind(this);
	}

	private AddHelpers(obj: any): void {
		// Add Helpers related to movement
		if (obj.position) {
			AddMoveHelpers(this.fatina, obj);
		}

		// Add Helpers related to rotation
		if (obj.rotation || obj.rotation === 0) {
			AddRotationHelpers(this.fatina, obj);
		}

		// Add Helpers related to alpha
		if (obj.alpha || obj.alpha === 0 || (obj.hue !== undefined && obj.hue.hasOwnProperty('a'))) {
			AddAlphaHelpers(this.fatina, obj);
		}

		// Add Helpers related to scale
		if (obj.scale) {
			AddScaleHelpers(this.fatina, obj);
		}

		// Add Helpers related to hue
		if (obj.hue) {
			AddHueHelpers(this.fatina, obj);
		} else if (obj.tint || obj.tint === 0) {
			AddTintHelpers(this.fatina, obj);
		}
	}
};

/**
 * Add Helpers related to movement
 *  - obj.MoveTo(x, y, duration);
 *  - obj.MoveXTo(x, duration);
 *  - obj.MoveYTo(y, duration);
 *  - obj.MoveToRel(x, y, duration);
 *  - obj.MoveXToRel(x, duration);
 *  - obj.MoveYToRel(y, duration);
 *  - obj.PunchPosition(x, y, duration, iteration);
 *  - obj.Shake(x, y, duration, iteration);
 *
 * @param {*} fatina
 * @param {*} obj
 */
function AddMoveHelpers(fatina: any, obj: any) {
	obj.MoveTo = function (x: number, y: number, duration: number, autoStart?: boolean) {
		let tween = fatina.Tween(this.position, ['x', 'y']).To({'x': x, 'y': y}, duration);
		return (autoStart === false) ? tween : tween.Start();
	};

	obj.MoveToRel = function (x: number, y: number, duration: number, autoStart?: boolean) {
		let tween = this.MoveTo(x, y, duration, false).SetRelative(true);
		return (autoStart === false) ? tween : tween.Start();
	};

	obj.MoveXTo = function (x: number, duration: number, autoStart?: boolean) {
		let tween = fatina.Tween(this.position, ['x']).To({'x': x }, duration);
		return (autoStart === false) ? tween : tween.Start();
	};

	obj.MoveXToRel = function (x: number, duration: number, autoStart?: boolean) {
		let tween = this.MoveXTo(x, duration, false).SetRelative(true);
		return (autoStart === false) ? tween : tween.Start();
	};

	obj.MoveYTo = function (y: number, duration: number, autoStart?: boolean) {
		let tween = fatina.Tween(this.position, ['y']).To({'y': y }, duration);
		return (autoStart === false) ? tween : tween.Start();
	};

	obj.MoveYToRel = function (y: number, duration: number, autoStart?: boolean) {
		let tween = this.MoveYTo(y, duration, false).SetRelative(true);
		return (autoStart === false) ? tween : tween.Start();
	};

	obj.PunchPosition = function (x: number, y: number, duration?: number, iteration?: number, autoStart?: boolean) {
		duration = duration || 60;
		iteration = iteration || 5;
		let originX = this.position.x;
		let originY = this.position.y;
		let sequence = fatina.Sequence();
		for (let i = 0; i < iteration; i ++) {
			let coef = (i % 2 === 0) ? 1 : -1;
			let nextX = originX + (coef * x / (i + 1));
			let nextY = originY + (coef * y / (i + 1));
			let dur = duration / 2 / iteration;
			sequence.Append(this.MoveTo(nextX, nextY, dur, false).Yoyo(1));
		}
		return (autoStart === false) ? sequence : sequence.Start();
	};

	obj.Shake = function (x: number, y: number, duration?: number, iteration?: number, autoStart?: boolean) {
		duration = duration || 60;
		iteration = iteration || 5;
		let originX = this.position.x;
		let originY = this.position.y;
		let sequence = fatina.Sequence();
		for (let i = 0; i < iteration; i ++) {
			let nextX = originX + (Math.random() * x * 2 - x);
			let nextY = originY + (Math.random() * y * 2 - y);
			let dur = duration / 2 / iteration;
			sequence.Append(this.MoveTo(nextX, nextY, dur, false).Yoyo(1));
		}
		return (autoStart === false) ? sequence : sequence.Start();
	};
}

/**
 * Add Helpers related to rotation
 *  - obj.RotateTo(angle, duration);
 *  - obj.RotateToRel(angle, duration);
 *  - obj.RotateDegTo(angle, duration);
 *  - obj.RotateDegToRel(angle, duration);
 *  - obj.PunchRotate(angle, duration, iteration)
 *
 * @param {*} fatina
 * @param {*} obj
 */
function AddRotationHelpers(fatina: any, obj: any) {
	obj.RotateTo = function (angle: number, duration: number, autoStart?: boolean) {
		let tween = fatina.Tween(this, ['rotation']).To({'rotation': angle}, duration);
		return (autoStart === false) ? tween : tween.Start();
	};

	obj.RotateToRel = function (angle: number, duration: number, autoStart?: boolean) {
		let tween = this.RotateTo(angle, duration, false).SetRelative(true);
		return (autoStart === false) ? tween : tween.Start();
	};

	obj.RotateDegTo = function (angle: number, duration: number, autoStart?: boolean) {
		angle = degToRad(angle);
		let tween = fatina.Tween(this, ['rotation']).To({'rotation': angle}, duration);
		return (autoStart === false) ? tween : tween.Start();
	};

	obj.RotateDegToRel = function (angle: number, duration: number, autoStart?: boolean) {
		let tween = this.RotateDegTo(angle, duration, false).SetRelative(true);
		return (autoStart === false) ? tween : tween.Start();
	};

	obj.PunchRotate = function (angle: number, duration?: number, iteration?: number, autoStart?: boolean) {
		duration = duration || 60;
		iteration = iteration || 5;
		let rotation = this.rotation;
		let sequence = fatina.Sequence();
		for (let i = 0; i < iteration; i ++) {
			let coef = (i % 2 === 0) ? 1 : -1;
			let ang = rotation + (coef * angle / (i + 1));
			let dur = duration / 2 / iteration;
			sequence.Append(this.RotateTo(ang, dur, false).Yoyo(1));
		}
		return (autoStart === false) ? sequence : sequence.Start();
	};
}

/**
 * Add Helpers related to alpha
 *  - obj.FadeTo(alpha, duration);
 *
 * @param {*} fatina
 * @param {*} obj
 */
function AddAlphaHelpers(fatina: any, obj: any) {
	obj.FadeTo = function (a: number, duration: number, autoStart?: boolean) {
		let tween = fatina.Tween(this, ['alpha']).To({'alpha': a}, duration);
		return (autoStart === false) ? tween : tween.Start();
	};
}

/**
 * Add Helpers related to scale
 *  - obj.ScaleTo(x, y, duration);
 *  - obj.ScaleXTo(x, duration);
 *  - obj.ScaleYTo(y, duration);
 *  - obj.ScaleToRel(x, y, duration);
 *  - obj.ScaleXToRel(x, duration);
 *  - obj.ScaleYToRel(y, duration);
 *  - obj.PunchScale(x, y, duration, iteration)
 *
 * @param {*} fatina
 * @param {*} obj
 */
function AddScaleHelpers(fatina: any, obj: any) {
	obj.ScaleTo = function (x: number, y: number, duration: number, autoStart?: boolean) {
		let tween = fatina.Tween(this.scale, ['x', 'y']).To({'x': x, 'y': y}, duration);
		return (autoStart === false) ? tween : tween.Start();
	};

	obj.ScaleToRel = function (x: number, y: number, duration: number, autoStart?: boolean) {
		let tween = this.ScaleTo(x, y, duration, false).SetRelative(true);
		return (autoStart === false) ? tween : tween.Start();
	};

	obj.ScaleXTo = function (x: number, duration: number, autoStart?: boolean) {
		let tween = fatina.Tween(this.scale, ['x']).To({'x': x}, duration);
		return (autoStart === false) ? tween : tween.Start();
	};

	obj.ScaleXToRel = function (x: number, duration: number, autoStart?: boolean) {
		let tween = this.ScaleXTo(x, duration, false).SetRelative(true);
		return (autoStart === false) ? tween : tween.Start();
	};

	obj.ScaleYTo = function (y: number, duration: number, autoStart?: boolean) {
		let tween = fatina.Tween(this.scale, ['y']).To({'y': y}, duration);
		return (autoStart === false) ? tween : tween.Start();
	};

	obj.ScaleYToRel = function (y: number, duration: number, autoStart?: boolean) {
		let tween = this.ScaleYTo(y, duration, false).SetRelative(true);
		return (autoStart === false) ? tween : tween.Start();
	};

	obj.PunchScale = function (x: number, y: number, duration?: number, iteration?: number, autoStart?: boolean) {
		duration = duration || 60;
		iteration = iteration || 5;
		let scaleX = this.scale.x;
		let scaleY = this.scale.y;
		let sequence = fatina.Sequence();
		for (let i = 0; i < iteration; i ++) {
			let coef = (i % 2 === 0) ? 1 : -1;
			let nextX = scaleX + (coef * x / (i + 1));
			let nextY = scaleY + (coef * y / (i + 1));
			let dur = duration / 2 / iteration;
			sequence.Append(this.ScaleTo(nextX, nextY, dur, false).Yoyo(1));
		}
		return (autoStart === false) ? sequence : sequence.Start();
	};
}

/**
 * Add Helpers related to colors / hue
 *  - obj.ColorTo(r, g, b, duration);
 *  - obj.ColorToRel(r, g, b, duration);
 *  - obj.ColorRGBTo(hex, duration);
 *  - obj.ColorRGBToRel(hex, duration);
 *  - obj.PunchColor(r, g, b, duration, iteration)
 *
 * @param {*} fatina
 * @param {*} obj
 */
function AddHueHelpers(fatina: any, obj: any) {
	obj.ColorTo = function (r: number, g: number, b: number, duration: number, autoStart?: boolean) {
		let tween = fatina.Tween(this.hue, ['r', 'g', 'b']).To({'r': r, 'g': g, 'b': b}, duration);
		return (autoStart === false) ? tween : tween.Start();
	};

	obj.ColorToRel = function (r: number, g: number, b: number, duration: number, autoStart?: boolean) {
		let tween = this.ColorTo(r, g, b, duration, false).SetRelative(true);
		return (autoStart === false) ? tween : tween.Start();
	};

	obj.ColorRGBTo = function (hex: string, duration: number, autoStart?: boolean) {
		let color = hexToRGB(hex);
		let tween = fatina.Tween(this.hue, ['r', 'g', 'b']).To({'r': color.r, 'g': color.g, 'b': color.b}, duration);
		return (autoStart === false) ? tween : tween.Start();
	};

	obj.ColorRGBToRel = function (hex: string, duration: number, autoStart?: boolean) {
		let tween = this.ColorRGBTo(hex, duration, false).SetRelative(true);
		return (autoStart === false) ? tween : tween.Start();
	};

	obj.PunchColor = function (r: number, g: number, b: number, duration?: number, iteration?: number, autoStart?: boolean) {
		duration = duration || 60;
		iteration = iteration || 5;
		let red = this.hue.r;
		let green = this.hue.g;
		let blue = this.hue.b;
		let sequence = fatina.Sequence();
		for (let i = 0; i < iteration; i ++) {
			let coef = (i % 2 === 0) ? 1 : -1;
			let nextRed = red + (coef * r / (i + 1));
			let nextGreen = green + (coef * g / (i + 1));
			let nextBlue = blue + (coef * b / (i + 1));
			let dur = duration / 2 / iteration;
			sequence.Append(this.ColorTo(nextRed, nextGreen, nextBlue, dur, false).Yoyo(1));
		}
		return (autoStart === false) ? sequence : sequence.Start();
	};
}

/**
 * Add Helpers related to colors / tint
 *  - obj.ColorTo(r, g, b, duration);
 *  - obj.ColorToRel(r, g, b, duration);
 *  - obj.ColorRGBTo(hex, duration);
 *  - obj.ColorRGBToRel(hex, duration);
 *  - obj.PunchColor(r, g, b, duration, iteration)
 *
 * @param {*} fatina
 * @param {*} obj
 */
function AddTintHelpers(fatina: any, obj: any) {
	obj.ColorTo = function (r: number, g: number, b: number, duration: number, autoStart?: boolean) {
		let tint = hexToRGB(this.tint.toString('16'));
		let tween = fatina.Tween(tint, ['r', 'g', 'b']).To({'r': r, 'g': g, 'b': b}, duration)
			.OnUpdate(() => this.tint = rgbToInt(tint));
		return (autoStart === false) ? tween : tween.Start();
	};

	obj.ColorToRel = function (r: number, g: number, b: number, duration: number, autoStart?: boolean) {
		let tween = this.ColorTo(r, g, b, duration, false).SetRelative(true);
		return (autoStart === false) ? tween : tween.Start();
	};

	obj.ColorRGBTo = function (hex: string, duration: number, autoStart?: boolean) {
		let tint = hexToRGB(this.tint.toString('16'));
		let color = hexToRGB(hex);
		let tween = fatina.Tween(tint, ['r', 'g', 'b']).To({'r': color.r, 'g': color.g, 'b': color.b}, duration)
			.OnUpdate(() => this.tint = rgbToInt(tint));
		return (autoStart === false) ? tween : tween.Start();
	};

	obj.ColorRGBToRel = function (hex: string, duration: number, autoStart?: boolean) {
		let tween = this.ColorRGBTo(hex, duration, false).SetRelative(true);
		return (autoStart === false) ? tween : tween.Start();
	};

	obj.PunchColor = function (r: number, g: number, b: number, duration?: number, iteration?: number, autoStart?: boolean) {
		duration = duration || 60;
		iteration = iteration || 5;
		let tint = hexToRGB(this.tint.toString('16'));

		let sequence = fatina.Sequence();
		for (let i = 0; i < iteration; i ++) {
			let coef = (i % 2 === 0) ? 1 : -1;
			let nextRed = tint.r + (coef * r / (i + 1));
			let nextGreen = tint.g + (coef * g / (i + 1));
			let nextBlue = tint.b + (coef * b / (i + 1));
			let dur = duration / 2 / iteration;
			sequence.Append(this.ColorTo(nextRed, nextGreen, nextBlue, dur, false).Yoyo(1));
		}
		return (autoStart === false) ? sequence : sequence.Start();
	};
}

/**
 * Helper to convert degrees to radians
 *
 * @param {number} angle
 * @returns {number}
 */
function degToRad(angle: number): number {
	return angle * Math.PI / 180;
}

/**
 * Helper to convert a hex string from "#AARRGGBB", "#RRGGBB", "0xAARRGGBB", "0xRRGGBB",
 * "AARRGGBB", or "RRGGBB" to an array of numbers
 *
 * @param {string} color
 * @returns
 */
function hexToRGB(color: string): any {
	if (color.charAt(0) === '#') {
		color = color.substr(1);
	} else if (color.indexOf('0x') === 0) {
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
		r: parseInt(color.substr(0, 2), 16) / 255, // Red
		g: parseInt(color.substr(2, 2), 16) / 255, // Green
		b: parseInt(color.substr(4, 2), 16) / 255  // Blue
	};
};

function rgbToInt(hue: any): number {
	if (!hue) {
		return 0;
	}
	let r = componentToInt(hue.r) * 256 * 256;
	let g = componentToInt(hue.g) * 256;
	let b = componentToInt(hue.b);
	return r + g + b;
}

function componentToInt(val: number): number {
	return Math.max(0, Math.min(255, Math.floor(val * 255)));
}
