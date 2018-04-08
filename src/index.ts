import { IPlugin } from 'fatina';

/**
 * To get an instance of this plugin
 *
 * @export
 * @returns
 */
export function get(): IPlugin {
	return new FatinaPluginHelpers();
}

export interface IPluginAnimator {
	addHelpers(obj: any): void;
}

/**
 * Declare a Fatina Plugin to add helpers to objects (pixi, ...)
 *
 * @export
 * @class FatinaPluginHelpers
 * @implements {IPlugin}
 */
class FatinaPluginHelpers implements IPlugin {
	public readonly name = 'fatina-plugin-helpers';
	private fatina: any;
	private initialized = false;

	public init(fatina: any) {
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

	private addHelpers(obj: any): void {
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
		} else if (obj.tint || obj.tint === 0) {
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
function addMoveHelpers(fatina: any, obj: any) {
	obj.moveTo = function (x: number, y: number, duration: number, autoStart?: boolean) {
		const tween = fatina.tween(this.position, ['x', 'y']).to({ x, y }, duration);
		return (autoStart === false) ? tween : tween.start();
	};

	obj.moveToRel = function (x: number, y: number, duration: number, autoStart?: boolean) {
		const tween = this.moveTo(x, y, duration, false).setRelative(true);
		return (autoStart === false) ? tween : tween.start();
	};

	obj.moveXTo = function (x: number, duration: number, autoStart?: boolean) {
		const tween = fatina.tween(this.position, ['x']).to({ x }, duration);
		return (autoStart === false) ? tween : tween.start();
	};

	obj.moveXToRel = function (x: number, duration: number, autoStart?: boolean) {
		const tween = this.moveXTo(x, duration, false).setRelative(true);
		return (autoStart === false) ? tween : tween.start();
	};

	obj.moveYTo = function (y: number, duration: number, autoStart?: boolean) {
		const tween = fatina.tween(this.position, ['y']).to({ y }, duration);
		return (autoStart === false) ? tween : tween.start();
	};

	obj.moveYToRel = function (y: number, duration: number, autoStart?: boolean) {
		const tween = this.moveYTo(y, duration, false).setRelative(true);
		return (autoStart === false) ? tween : tween.start();
	};

	obj.punchPosition = function (x: number, y: number, duration?: number, iteration?: number, autoStart?: boolean) {
		duration = duration || 60;
		iteration = iteration || 5;
		const originX = this.position.x;
		const originY = this.position.y;
		const sequence = fatina.sequence();
		for (let i = 0; i < iteration; i ++) {
			const coef = (i % 2 === 0) ? 1 : -1;
			const nextX = originX + (coef * x / (i + 1));
			const nextY = originY + (coef * y / (i + 1));
			const dur = duration / 2 / iteration;
			sequence.append(this.moveTo(nextX, nextY, dur, false).yoyo(1));
		}
		return (autoStart === false) ? sequence : sequence.start();
	};

	obj.shake = function (x: number, y: number, duration?: number, iteration?: number, autoStart?: boolean) {
		duration = duration || 60;
		iteration = iteration || 5;
		const originX = this.position.x;
		const originY = this.position.y;
		const sequence = fatina.sequence();
		for (let i = 0; i < iteration; i ++) {
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
function addRotationHelpers(fatina: any, obj: any) {
	obj.rotateTo = function (angle: number, duration: number, autoStart?: boolean) {
		const tween = fatina.tween(this, ['rotation']).to({ rotation: angle }, duration);
		return (autoStart === false) ? tween : tween.start();
	};

	obj.rotateToRel = function (angle: number, duration: number, autoStart?: boolean) {
		const tween = this.rotateTo(angle, duration, false).setRelative(true);
		return (autoStart === false) ? tween : tween.start();
	};

	obj.rotateDegTo = function (angle: number, duration: number, autoStart?: boolean) {
		angle = degToRad(angle);
		const tween = fatina.tween(this, ['rotation']).to({ rotation: angle }, duration);
		return (autoStart === false) ? tween : tween.start();
	};

	obj.rotateDegToRel = function (angle: number, duration: number, autoStart?: boolean) {
		const tween = this.rotateDegTo(angle, duration, false).setRelative(true);
		return (autoStart === false) ? tween : tween.start();
	};

	obj.punchRotate = function (angle: number, duration?: number, iteration?: number, autoStart?: boolean) {
		duration = duration || 60;
		iteration = iteration || 5;
		const rotation = this.rotation;
		const sequence = fatina.sequence();
		for (let i = 0; i < iteration; i ++) {
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
function addAlphaHelpers(fatina: any, obj: any) {
	obj.fadeTo = function (a: number, duration: number, autoStart?: boolean) {
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
function addScaleHelpers(fatina: any, obj: any) {
	obj.scaleTo = function (x: number, y: number, duration: number, autoStart?: boolean) {
		const tween = fatina.tween(this.scale, ['x', 'y']).to({ x, y }, duration);
		return (autoStart === false) ? tween : tween.start();
	};

	obj.scaleToRel = function (x: number, y: number, duration: number, autoStart?: boolean) {
		const tween = this.scaleTo(x, y, duration, false).setRelative(true);
		return (autoStart === false) ? tween : tween.start();
	};

	obj.scaleXTo = function (x: number, duration: number, autoStart?: boolean) {
		const tween = fatina.tween(this.scale, ['x']).to({ x }, duration);
		return (autoStart === false) ? tween : tween.start();
	};

	obj.scaleXToRel = function (x: number, duration: number, autoStart?: boolean) {
		const tween = this.scaleXTo(x, duration, false).setRelative(true);
		return (autoStart === false) ? tween : tween.start();
	};

	obj.scaleYTo = function (y: number, duration: number, autoStart?: boolean) {
		const tween = fatina.tween(this.scale, ['y']).to({ y }, duration);
		return (autoStart === false) ? tween : tween.start();
	};

	obj.scaleYToRel = function (y: number, duration: number, autoStart?: boolean) {
		const tween = this.scaleYTo(y, duration, false).setRelative(true);
		return (autoStart === false) ? tween : tween.start();
	};

	obj.punchScale = function (x: number, y: number, duration?: number, iteration?: number, autoStart?: boolean) {
		duration = duration || 60;
		iteration = iteration || 5;
		const scaleX = this.scale.x;
		const scaleY = this.scale.y;
		const sequence = fatina.sequence();
		for (let i = 0; i < iteration; i ++) {
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
function addHueHelpers(fatina: any, obj: any) {
	obj.colorTo = function (r: number, g: number, b: number, duration: number, autoStart?: boolean) {
		const tween = fatina.tween(this.hue, ['r', 'g', 'b']).to({ r, g, b }, duration);
		return (autoStart === false) ? tween : tween.start();
	};

	obj.colorToRel = function (r: number, g: number, b: number, duration: number, autoStart?: boolean) {
		const tween = this.colorTo(r, g, b, duration, false).setRelative(true);
		return (autoStart === false) ? tween : tween.start();
	};

	obj.colorRGBTo = function (hex: string, duration: number, autoStart?: boolean) {
		const color = hexToRGB(hex);
		const tween = fatina.tween(this.hue, ['r', 'g', 'b']).to({ r: color.r, g: color.g, b: color.b }, duration);
		return (autoStart === false) ? tween : tween.start();
	};

	obj.colorRGBToRel = function (hex: string, duration: number, autoStart?: boolean) {
		const tween = this.colorRGBTo(hex, duration, false).setRelative(true);
		return (autoStart === false) ? tween : tween.start();
	};

	obj.punchColor = function (r: number, g: number, b: number, duration?: number, iteration?: number, autoStart?: boolean) {
		duration = duration || 60;
		iteration = iteration || 5;
		const red = this.hue.r;
		const green = this.hue.g;
		const blue = this.hue.b;
		const sequence = fatina.sequence();
		for (let i = 0; i < iteration; i ++) {
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
function addTintHelpers(fatina: any, obj: any) {
	obj.colorTo = function (r: number, g: number, b: number, duration: number, autoStart?: boolean) {
		const tint = hexToRGB(this.tint.toString('16'));
		const tween = fatina.tween(tint, ['r', 'g', 'b']).to({ r, g, b }, duration)
			.onUpdate(() => this.tint = rgbToInt(tint));
		return (autoStart === false) ? tween : tween.start();
	};

	obj.colorToRel = function (r: number, g: number, b: number, duration: number, autoStart?: boolean) {
		const tween = this.colorTo(r, g, b, duration, false).setRelative(true);
		return (autoStart === false) ? tween : tween.start();
	};

	obj.colorRGBTo = function (hex: string, duration: number, autoStart?: boolean) {
		const tint = hexToRGB(this.tint.toString('16'));
		const color = hexToRGB(hex);
		const tween = fatina.tween(tint, ['r', 'g', 'b']).to({ r: color.r, g: color.g, b: color.b }, duration)
			.onUpdate(() => this.tint = rgbToInt(tint));
		return (autoStart === false) ? tween : tween.start();
	};

	obj.colorRGBToRel = function (hex: string, duration: number, autoStart?: boolean) {
		const tween = this.colorRGBTo(hex, duration, false).setRelative(true);
		return (autoStart === false) ? tween : tween.start();
	};

	obj.punchColor = function (r: number, g: number, b: number, duration?: number, iteration?: number, autoStart?: boolean) {
		duration = duration || 60;
		iteration = iteration || 5;
		const tint = hexToRGB(this.tint.toString('16'));

		const sequence = fatina.sequence();
		for (let i = 0; i < iteration; i ++) {
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
		b: parseInt(color.substr(4, 2), 16) / 255,  // Blue
	};
}

function rgbToInt(hue: any): number {
	if (!hue) {
		return 0;
	}
	const r = componentToInt(hue.r) * 256 * 256;
	const g = componentToInt(hue.g) * 256;
	const b = componentToInt(hue.b);
	return r + g + b;
}

function componentToInt(val: number): number {
	return Math.max(0, Math.min(255, Math.floor(val * 255)));
}
