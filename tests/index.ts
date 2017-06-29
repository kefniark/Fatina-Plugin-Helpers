import * as Fatina from 'fatina';
import * as test from 'tape';
import { Test } from 'tape';
import * as Plugin from '../src/index';

Fatina.Init(false);
Fatina.LoadPlugin(Plugin.Get());

test('Test Init', (t: Test) => {
	const fatina: any = {
		plugin: { },
	};
	const plugin = Plugin.Get();

	t.throws(() => plugin.Init(undefined));
	plugin.Init(fatina);

	t.equal('function', typeof fatina.plugin.AddHelpers, 'Check the fatina helper was added');
	t.throws(() => plugin.Init(fatina), 'Check the plugin cant be init twice');

	Fatina.plugin.AddHelpers({});
	t.end();
});

test('Test Move', (t: Test) => {
	const obj = GetNormalObject();

	const tween = obj.MoveTo(2, 2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.position.x, 2, 'Check the object moved properly');

	t.end();
});

test('Test Move X', (t: Test) => {
	const obj = GetNormalObject();

	const tween = obj.MoveXTo(2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.position.x, 2, 'Check the object moved properly');

	t.end();
});

test('Test Move Y', (t: Test) => {
	const obj = GetNormalObject();

	const tween = obj.MoveYTo(2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.position.y, 2, 'Check the object moved properly');

	t.end();
});

test('Test Move Relative', (t: Test) => {
	const obj = GetNormalObject();
	obj.position.x = 1;

	const tween = obj.MoveToRel(2, 2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.position.x, 3, 'Check the object moved properly');

	t.notOk(obj.MoveToRel(2, 2, 5, false).IsRunning());
	t.end();
});

test('Test Move X Relative', (t: Test) => {
	const obj = GetNormalObject();
	obj.position.x = 1;

	const tween = obj.MoveXToRel(2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.position.x, 3, 'Check the object moved properly');

	t.notOk(obj.MoveYToRel(2, 5, false).IsRunning());
	t.end();
});

test('Test Move Y Relative', (t: Test) => {
	const obj = GetNormalObject();
	obj.position.y = 1;

	const tween = obj.MoveYToRel(2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.position.y, 3, 'Check the object moved properly');

	t.notOk(obj.MoveYToRel(2, 5, false).IsRunning());
	t.end();
});

test('Test PunchPosition', (t: Test) => {
	const obj = GetNormalObject();

	const tween = obj.PunchPosition(2, 2, 3, 5);
	Fatina.Update(0.5);
	t.notEqual(obj.position.x, 0, 'Check the object moved properly');
	Fatina.Update(2.5);
	t.equal(obj.position.x, 0, 'Check the object went back to original position');
	t.ok(tween.IsFinished(), 'Check the tween is finished');

	t.notOk(obj.PunchPosition(2, 2, 3, 5, false).IsRunning());

	obj.PunchPosition(2, 2);
	t.end();
});

test('Test Shake', (t: Test) => {
	const obj = GetNormalObject();

	const tween = obj.Shake(2, 2, 3, 5);
	Fatina.Update(0.5);
	t.notEqual(obj.position.x, 0, 'Check the object moved properly');
	Fatina.Update(2.5);
	t.equal(obj.position.x, 0, 'Check the object went back to original position');
	t.ok(tween.IsFinished(), 'Check the tween is finished');

	t.notOk(obj.Shake(2, 2, 3, 5, false).IsRunning());
	obj.Shake(2, 2);
	t.end();
});

test('Test Rotate', (t: Test) => {
	const obj = GetNormalObject();

	const tween = obj.RotateTo(1, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.rotation, 1 , 'Check the object rotated properly');

	t.end();
});

test('Test RotateRelative', (t: Test) => {
	const obj = GetNormalObject();
	obj.rotation = 1;

	const tween = obj.RotateToRel(1, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.rotation, 2 , 'Check the object rotated properly');

	t.notOk(obj.RotateToRel(1, 5, false).IsRunning());
	t.end();
});

test('Test Rotate Deg', (t: Test) => {
	const obj = GetNormalObject();

	const tween = obj.RotateDegTo(90, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.rotation, Math.PI / 2, 'Check the object rotated properly');

	t.end();
});

test('Test Rotate Deg Relative', (t: Test) => {
	const obj = GetNormalObject();
	obj.rotation = Math.PI / 2;

	const tween = obj.RotateDegToRel(90, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.rotation, Math.PI, 'Check the object rotated properly');

	obj.RotateDegToRel(180, 5);
	Fatina.Update(5);
	t.equal(obj.rotation, Math.PI * 2, 'Check the object rotated properly');

	t.notOk(obj.RotateDegToRel(90, 5, false).IsRunning());
	t.end();
});

test('Test PunchRotate', (t: Test) => {
	const obj = GetNormalObject();

	const tween = obj.PunchRotate(2, 3, 5);
	Fatina.Update(0.5);
	t.notEqual(obj.rotation, 0, 'Check the object rotated properly');
	Fatina.Update(2.5);
	t.equal(obj.rotation, 0, 'Check the object went back to original rotation');
	t.ok(tween.IsFinished(), 'Check the tween is finished');

	t.notOk(obj.PunchRotate(2, 3, 5, false).IsRunning());
	obj.PunchRotate(2);
	t.end();
});

test('Test Fade', (t: Test) => {
	const obj = GetNormalObject();

	const tween = obj.FadeTo(0.5, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.alpha, 0.5, 'Check the object alpha changed properly');

	t.notOk(obj.FadeTo(0.5, 5, false).IsRunning());
	t.end();
});

test('Test Scale', (t: Test) => {
	const obj = GetNormalObject();

	const tween = obj.ScaleTo(2, 2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.scale.x, 2, 'Check the object scaled changed properly');

	t.end();
});

test('Test Scale X', (t: Test) => {
	const obj = GetNormalObject();

	const tween = obj.ScaleXTo(2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.scale.x, 2, 'Check the object scaled changed properly');

	t.end();
});

test('Test Scale Y', (t: Test) => {
	const obj = GetNormalObject();

	const tween = obj.ScaleYTo(2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.scale.y, 2, 'Check the object scaled changed properly');

	t.end();
});

test('Test Scale Relative', (t: Test) => {
	const obj = GetNormalObject();

	const tween = obj.ScaleToRel(2, 2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.scale.x, 3, 'Check the object scaled changed properly');

	t.notOk(obj.ScaleToRel(2, 2, 5, false).IsRunning());
	t.end();
});

test('Test Scale X Relative', (t: Test) => {
	const obj = GetNormalObject();

	const tween = obj.ScaleXToRel(2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.scale.x, 3, 'Check the object scaled changed properly');

	t.notOk(obj.ScaleXToRel(2, 5, false).IsRunning());
	t.end();
});

test('Test Scale Y Relative', (t: Test) => {
	const obj = GetNormalObject();

	const tween = obj.ScaleYToRel(2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.scale.y, 3, 'Check the object scaled changed properly');

	t.notOk(obj.ScaleYToRel(2, 5, false).IsRunning());
	t.end();
});

test('Test PunchScale', (t: Test) => {
	const obj = GetNormalObject();

	const tween = obj.PunchScale(2, 2, 3, 5);
	Fatina.Update(0.5);
	t.notEqual(obj.scale.x, 1, 'Check the object moved properly');
	Fatina.Update(2.5);
	t.equal(obj.scale.x, 1, 'Check the object went back to original position');
	t.ok(tween.IsFinished(), 'Check the tween is finished');

	t.notOk(obj.PunchScale(2, 2, 3, 5, false).IsRunning());
	obj.PunchScale(2, 2);
	t.end();
});

test('Test Color', (t: Test) => {
	const obj = GetNormalObject();

	const tween = obj.ColorTo(1, 1, 1, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.hue.r, 1, 'Check the object color changed properly');

	t.end();
});

test('Test Color Relative', (t: Test) => {
	const obj = GetNormalObject();
	obj.hue.r = 0.5;

	const tween = obj.ColorToRel(1, 1, 1, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.hue.r, 1.5, 'Check the object color changed properly');

	t.notOk(obj.ColorToRel(1, 1, 1, 5, false).IsRunning());
	t.end();
});

test('Test Color RGB', (t: Test) => {
	const obj = GetNormalObject();

	const tween = obj.ColorRGBTo('#FFFFFF', 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.hue.r, 1, 'Check the object color changed properly');

	t.end();
});

test('Test Color Relative', (t: Test) => {
	const obj = GetNormalObject();
	obj.hue.r = 0.5;

	const tween = obj.ColorRGBToRel('0xFFFFFF', 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.hue.r, 1.5, 'Check the object color changed properly');

	t.notOk(obj.ColorRGBToRel('0xFFFFFF', 5, false).IsRunning());
	t.end();
});

test('Test PunchColor', (t: Test) => {
	const obj = GetNormalObject();

	const tween = obj.PunchColor(1, 1, 1, 3, 5);
	Fatina.Update(0.5);
	t.notEqual(obj.hue.r, 0, 'Check the object moved properly');
	Fatina.Update(2.5);
	t.equal(obj.hue.r, 0, 'Check the object went back to original position');
	t.ok(tween.IsFinished(), 'Check the tween is finished');

	t.notOk(obj.PunchColor(1, 1, 1, 3, 5, false).IsRunning());
	obj.PunchColor(1, 1, 1);
	t.end();
});

test('Test Tint Color', (t: Test) => {
	const obj = GetPixiObject();

	const tween = obj.ColorTo(1, 1, 1, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.tint, 16777215, 'Check the object color changed properly');

	t.end();
});

test('Test Tint Color Relative', (t: Test) => {
	const obj = GetPixiObject();
	obj.tint = 6688955;

	const tween = obj.ColorToRel(0.25, 0.25, 0.25, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.tint, 10833914, 'Check the object color changed properly');

	t.notOk(obj.ColorToRel(0.25, 0.25, 0.25, 5, false).IsRunning());
	t.end();
});

test('Test Tint Color RGB', (t: Test) => {
	const obj = GetPixiObject();

	const tween = obj.ColorRGBTo('#FFFFFF', 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.tint, 16777215, 'Check the object color changed properly');

	t.end();
});

test('Test Tint Color Relative', (t: Test) => {
	const obj = GetPixiObject();
	obj.tint = 6710886;

	const tween = obj.ColorRGBToRel('#222200', 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.tint, 8947814, 'Check the object color changed properly');

	t.notOk(obj.ColorRGBToRel('#222200', 5, false).IsRunning());
	t.end();
});

test('Test Tint Format', (t: Test) => {
	const obj = GetPixiObject();

	obj.ColorRGBToRel('0x002200', 5);
	Fatina.Update(5);
	t.notEqual(0, obj.tint);

	obj.ColorRGBToRel('0xFF002200', 5);
	Fatina.Update(5);
	t.notEqual(0, obj.tint);

	obj.ColorRGBToRel('002200', 5);
	Fatina.Update(5);
	t.notEqual(0, obj.tint);

	obj.tint = NaN;

	obj.ColorRGBToRel('#0022FF', 5);
	Fatina.Update(5);
	t.notEqual(0, obj.tint);

	t.end();
});

test('Test Tint PunchColor', (t: Test) => {
	const obj = GetPixiObject();

	const tween = obj.PunchColor(1, 1, 1, 3, 5);
	Fatina.Update(0.5);
	t.notEqual(obj.tint, 0, 'Check the object moved properly');
	Fatina.Update(2.5);
	t.equal(obj.tint, 0, 'Check the object went back to original position');
	t.ok(tween.IsFinished(), 'Check the tween is finished');

	t.end();
});

function GetNormalObject() {
	// Create an object
	const obj: any = {
		position: {x: 0, y: 0 },
		scale: {x: 1, y: 1 },
		rotation: 0,
		alpha: 1,
		hue: { r: 0, g: 0, b: 0, a: 1 },
	};

	// Add plugin helpers to the object
	Fatina.plugin.AddHelpers(obj);
	return obj;
}

function GetPixiObject() {
	// Create an object
	const pixiObj: any = {
		position: {x: 0, y: 0 },
		scale: {x: 1, y: 1 },
		rotation: 0,
		alpha: 1,
		tint: 0,
	};

	// Add plugin helpers to the object
	Fatina.plugin.AddHelpers(pixiObj);
	return pixiObj;
}
