import * as Fatina from 'fatina';
import * as test from 'tape';
import { Test } from 'tape';
import * as Plugin from '../src/index';

Fatina.init(false);
Fatina.loadPlugin(Plugin.get());

test('Test Init', (t: Test) => {
	const fatina: any = {
		plugin: { },
	};
	const plugin = Plugin.get();

	t.throws(() => plugin.init(undefined));
	plugin.init(fatina);

	t.equal('function', typeof fatina.plugin.addHelpers, 'Check the fatina helper was added');
	t.throws(() => plugin.init(fatina), 'Check the plugin cant be init twice');

	Fatina.plugin.addHelpers({});
	t.end();
});

test('Test Move', (t: Test) => {
	const obj = getNormalObject();

	const tween = obj.moveTo(2, 2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.update(5);
	t.equal(obj.position.x, 2, 'Check the object moved properly');

	t.end();
});

test('Test Move X', (t: Test) => {
	const obj = getNormalObject();

	const tween = obj.moveXTo(2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.update(5);
	t.equal(obj.position.x, 2, 'Check the object moved properly');

	t.end();
});

test('Test Move Y', (t: Test) => {
	const obj = getNormalObject();

	const tween = obj.moveYTo(2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.update(5);
	t.equal(obj.position.y, 2, 'Check the object moved properly');

	t.end();
});

test('Test Move Relative', (t: Test) => {
	const obj = getNormalObject();
	obj.position.x = 1;

	const tween = obj.moveToRel(2, 2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.update(5);
	t.equal(obj.position.x, 3, 'Check the object moved properly');

	t.notOk(obj.moveToRel(2, 2, 5, false).isRunning);
	t.end();
});

test('Test Move X Relative', (t: Test) => {
	const obj = getNormalObject();
	obj.position.x = 1;

	const tween = obj.moveXToRel(2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.update(5);
	t.equal(obj.position.x, 3, 'Check the object moved properly');

	t.notOk(obj.moveYToRel(2, 5, false).isRunning);
	t.end();
});

test('Test Move Y Relative', (t: Test) => {
	const obj = getNormalObject();
	obj.position.y = 1;

	const tween = obj.moveYToRel(2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.update(5);
	t.equal(obj.position.y, 3, 'Check the object moved properly');

	t.notOk(obj.moveYToRel(2, 5, false).isRunning);
	t.end();
});

test('Test PunchPosition', (t: Test) => {
	const obj = getNormalObject();

	const tween = obj.punchPosition(2, 2, 3, 5);
	Fatina.update(0.5);
	t.notEqual(obj.position.x, 0, 'Check the object moved properly');
	Fatina.update(2.5);
	t.equal(obj.position.x, 0, 'Check the object went back to original position');
	t.ok(tween.isFinished, 'Check the tween is finished');

	t.notOk(obj.punchPosition(2, 2, 3, 5, false).isRunning);

	obj.punchPosition(2, 2);
	t.end();
});

test('Test Shake', (t: Test) => {
	const obj = getNormalObject();

	const tween = obj.shake(2, 2, 3, 5);
	Fatina.update(0.5);
	t.notEqual(obj.position.x, 0, 'Check the object moved properly');
	Fatina.update(2.5);
	t.equal(obj.position.x, 0, 'Check the object went back to original position');
	t.ok(tween.isFinished, 'Check the tween is finished');

	t.notOk(obj.shake(2, 2, 3, 5, false).isRunning);
	obj.shake(2, 2);
	t.end();
});

test('Test Rotate', (t: Test) => {
	const obj = getNormalObject();

	const tween = obj.rotateTo(1, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.update(5);
	t.equal(obj.rotation, 1 , 'Check the object rotated properly');

	t.end();
});

test('Test RotateRelative', (t: Test) => {
	const obj = getNormalObject();
	obj.rotation = 1;

	const tween = obj.rotateToRel(1, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.update(5);
	t.equal(obj.rotation, 2 , 'Check the object rotated properly');

	t.notOk(obj.rotateToRel(1, 5, false).isRunning);
	t.end();
});

test('Test Rotate Deg', (t: Test) => {
	const obj = getNormalObject();

	const tween = obj.rotateDegTo(90, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.update(5);
	t.equal(obj.rotation, Math.PI / 2, 'Check the object rotated properly');

	t.end();
});

test('Test Rotate Deg Relative', (t: Test) => {
	const obj = getNormalObject();
	obj.rotation = Math.PI / 2;

	const tween = obj.rotateDegToRel(90, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.update(5);
	t.equal(obj.rotation, Math.PI, 'Check the object rotated properly');

	obj.rotateDegToRel(180, 5);
	Fatina.update(5);
	t.equal(obj.rotation, Math.PI * 2, 'Check the object rotated properly');

	t.notOk(obj.rotateDegToRel(90, 5, false).isRunning);
	t.end();
});

test('Test PunchRotate', (t: Test) => {
	const obj = getNormalObject();

	const tween = obj.punchRotate(2, 3, 5);
	Fatina.update(0.5);
	t.notEqual(obj.rotation, 0, 'Check the object rotated properly');
	Fatina.update(2.5);
	t.equal(obj.rotation, 0, 'Check the object went back to original rotation');
	t.ok(tween.isFinished, 'Check the tween is finished');

	t.notOk(obj.punchRotate(2, 3, 5, false).isRunning);
	obj.punchRotate(2);
	t.end();
});

test('Test Fade', (t: Test) => {
	const obj = getNormalObject();

	const tween = obj.fadeTo(0.5, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.update(5);
	t.equal(obj.alpha, 0.5, 'Check the object alpha changed properly');

	t.notOk(obj.fadeTo(0.5, 5, false).isRunning);
	t.end();
});

test('Test Scale', (t: Test) => {
	const obj = getNormalObject();

	const tween = obj.scaleTo(2, 2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.update(5);
	t.equal(obj.scale.x, 2, 'Check the object scaled changed properly');

	t.end();
});

test('Test Scale X', (t: Test) => {
	const obj = getNormalObject();

	const tween = obj.scaleXTo(2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.update(5);
	t.equal(obj.scale.x, 2, 'Check the object scaled changed properly');

	t.end();
});

test('Test Scale Y', (t: Test) => {
	const obj = getNormalObject();

	const tween = obj.scaleYTo(2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.update(5);
	t.equal(obj.scale.y, 2, 'Check the object scaled changed properly');

	t.end();
});

test('Test Scale Relative', (t: Test) => {
	const obj = getNormalObject();

	const tween = obj.scaleToRel(2, 2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.update(5);
	t.equal(obj.scale.x, 3, 'Check the object scaled changed properly');

	t.notOk(obj.scaleToRel(2, 2, 5, false).isRunning);
	t.end();
});

test('Test Scale X Relative', (t: Test) => {
	const obj = getNormalObject();

	const tween = obj.scaleXToRel(2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.update(5);
	t.equal(obj.scale.x, 3, 'Check the object scaled changed properly');

	t.notOk(obj.scaleXToRel(2, 5, false).isRunning);
	t.end();
});

test('Test Scale Y Relative', (t: Test) => {
	const obj = getNormalObject();

	const tween = obj.scaleYToRel(2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.update(5);
	t.equal(obj.scale.y, 3, 'Check the object scaled changed properly');

	t.notOk(obj.scaleYToRel(2, 5, false).isRunning);
	t.end();
});

test('Test PunchScale', (t: Test) => {
	const obj = getNormalObject();

	const tween = obj.punchScale(2, 2, 3, 5);
	Fatina.update(0.5);
	t.notEqual(obj.scale.x, 1, 'Check the object moved properly');
	Fatina.update(2.5);
	t.equal(obj.scale.x, 1, 'Check the object went back to original position');
	t.ok(tween.isFinished, 'Check the tween is finished');

	t.notOk(obj.punchScale(2, 2, 3, 5, false).isRunning);
	obj.punchScale(2, 2);
	t.end();
});

test('Test Color', (t: Test) => {
	const obj = getNormalObject();

	const tween = obj.colorTo(1, 1, 1, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.update(5);
	t.equal(obj.hue.r, 1, 'Check the object color changed properly');

	t.end();
});

test('Test Color Relative', (t: Test) => {
	const obj = getNormalObject();
	obj.hue.r = 0.5;

	const tween = obj.colorToRel(1, 1, 1, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.update(5);
	t.equal(obj.hue.r, 1.5, 'Check the object color changed properly');

	t.notOk(obj.colorToRel(1, 1, 1, 5, false).isRunning);
	t.end();
});

test('Test Color RGB', (t: Test) => {
	const obj = getNormalObject();

	const tween = obj.colorRGBTo('#FFFFFF', 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.update(5);
	t.equal(obj.hue.r, 1, 'Check the object color changed properly');

	t.end();
});

test('Test Color Relative', (t: Test) => {
	const obj = getNormalObject();
	obj.hue.r = 0.5;

	const tween = obj.colorRGBToRel('0xFFFFFF', 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.update(5);
	t.equal(obj.hue.r, 1.5, 'Check the object color changed properly');

	t.notOk(obj.colorRGBToRel('0xFFFFFF', 5, false).isRunning);
	t.end();
});

test('Test PunchColor', (t: Test) => {
	const obj = getNormalObject();

	const tween = obj.punchColor(1, 1, 1, 3, 5);
	Fatina.update(0.5);
	t.notEqual(obj.hue.r, 0, 'Check the object moved properly');
	Fatina.update(2.5);
	t.equal(obj.hue.r, 0, 'Check the object went back to original position');
	t.ok(tween.isFinished, 'Check the tween is finished');

	t.notOk(obj.punchColor(1, 1, 1, 3, 5, false).isRunning);
	obj.punchColor(1, 1, 1);
	t.end();
});

test('Test Tint Color', (t: Test) => {
	const obj = getPixiObject();

	const tween = obj.colorTo(1, 1, 1, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.update(5);
	t.equal(obj.tint, 16777215, 'Check the object color changed properly');

	t.end();
});

test('Test Tint Color Relative', (t: Test) => {
	const obj = getPixiObject();
	obj.tint = 6688955;

	const tween = obj.colorToRel(0.25, 0.25, 0.25, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.update(5);
	t.equal(obj.tint, 10833914, 'Check the object color changed properly');

	t.notOk(obj.colorToRel(0.25, 0.25, 0.25, 5, false).isRunning);
	t.end();
});

test('Test Tint Color RGB', (t: Test) => {
	const obj = getPixiObject();

	const tween = obj.colorRGBTo('#FFFFFF', 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.update(5);
	t.equal(obj.tint, 16777215, 'Check the object color changed properly');

	t.end();
});

test('Test Tint Color Relative', (t: Test) => {
	const obj = getPixiObject();
	obj.tint = 6710886;

	const tween = obj.colorRGBToRel('#222200', 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.update(5);
	t.equal(obj.tint, 8947814, 'Check the object color changed properly');

	t.notOk(obj.colorRGBToRel('#222200', 5, false).isRunning);
	t.end();
});

test('Test Tint Format', (t: Test) => {
	const obj = getPixiObject();

	obj.colorRGBToRel('0x002200', 5);
	Fatina.update(5);
	t.notEqual(0, obj.tint);

	obj.colorRGBToRel('0xFF002200', 5);
	Fatina.update(5);
	t.notEqual(0, obj.tint);

	obj.colorRGBToRel('002200', 5);
	Fatina.update(5);
	t.notEqual(0, obj.tint);

	obj.tint = NaN;

	obj.colorRGBToRel('#0022FF', 5);
	Fatina.update(5);
	t.notEqual(0, obj.tint);

	t.end();
});

test('Test Tint PunchColor', (t: Test) => {
	const obj = getPixiObject();

	const tween = obj.punchColor(1, 1, 1, 3, 5);
	Fatina.update(0.5);
	t.notEqual(obj.tint, 0, 'Check the object moved properly');
	Fatina.update(2.5);
	t.equal(obj.tint, 0, 'Check the object went back to original position');
	t.ok(tween.isFinished, 'Check the tween is finished');

	t.end();
});

function getNormalObject() {
	// Create an object
	const obj: any = {
		position: { x: 0, y: 0 },
		scale: { x: 1, y: 1 },
		rotation: 0,
		alpha: 1,
		hue: { r: 0, g: 0, b: 0, a: 1 },
	};

	// Add plugin helpers to the object
	Fatina.plugin.addHelpers(obj);
	return obj;
}

function getPixiObject() {
	// Create an object
	const pixiObj: any = {
		position: { x: 0, y: 0 },
		scale: { x: 1, y: 1 },
		rotation: 0,
		alpha: 1,
		tint: 0,
	};

	// Add plugin helpers to the object
	Fatina.plugin.addHelpers(pixiObj);
	return pixiObj;
}
