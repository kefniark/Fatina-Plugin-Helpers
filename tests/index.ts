import * as test from 'tape';
import * as Fatina from 'fatina';
import * as Plugin from '../src/index';

Fatina.Init(false);
Fatina.LoadPlugin(Plugin.Get());

test('Test Init', function (t: any) {
	let fatina: any = {
		plugin: {}
	};
	let plugin = Plugin.Get();

	plugin.Init(fatina);

	t.equal('function', typeof fatina.plugin.AddHelpers, 'Check the fatina helper was added');
	t.throws(() => plugin.Init(fatina), 'Check the plugin cant be init twice');

	t.end();
});

test('Test Move', function (t: any) {
	let obj = GetNormalObject();

	let tween = obj.MoveTo(2, 2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.position.x, 2, 'Check the object moved properly');

	t.end();
});

test('Test Move X', function (t: any) {
	let obj = GetNormalObject();

	let tween = obj.MoveXTo(2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.position.x, 2, 'Check the object moved properly');

	t.end();
});

test('Test Move Y', function (t: any) {
	let obj = GetNormalObject();

	let tween = obj.MoveYTo(2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.position.y, 2, 'Check the object moved properly');

	t.end();
});

test('Test Move Relative', function (t: any) {
	let obj = GetNormalObject();
	obj.position.x = 1;

	let tween = obj.MoveToRel(2, 2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.position.x, 3, 'Check the object moved properly');

	t.end();
});

test('Test Move X Relative', function (t: any) {
	let obj = GetNormalObject();
	obj.position.x = 1;

	let tween = obj.MoveXToRel(2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.position.x, 3, 'Check the object moved properly');

	t.end();
});

test('Test Move Y Relative', function (t: any) {
	let obj = GetNormalObject();
	obj.position.y = 1;

	let tween = obj.MoveYToRel(2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.position.y, 3, 'Check the object moved properly');

	t.end();
});

test('Test PunchPosition', function (t: any) {
	let obj = GetNormalObject();

	let tween = obj.PunchPosition(2, 2, 3, 5);
	Fatina.Update(0.5);
	t.notEqual(obj.position.x, 0, 'Check the object moved properly');
	Fatina.Update(2.5);
	t.equal(obj.position.x, 0, 'Check the object went back to original position');
	t.ok(tween.IsFinished(), 'Check the tween is finished');

	t.end();
});

test('Test Shake', function (t: any) {
	let obj = GetNormalObject();

	let tween = obj.Shake(2, 2, 3, 5);
	Fatina.Update(0.5);
	t.notEqual(obj.position.x, 0, 'Check the object moved properly');
	Fatina.Update(2.5);
	t.equal(obj.position.x, 0, 'Check the object went back to original position');
	t.ok(tween.IsFinished(), 'Check the tween is finished');

	t.end();
});

test('Test Rotate', function (t: any) {
	let obj = GetNormalObject();

	let tween = obj.RotateTo(1, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.rotation, 1 , 'Check the object rotated properly');

	t.end();
});

test('Test RotateRelative', function (t: any) {
	let obj = GetNormalObject();
	obj.rotation = 1;

	let tween = obj.RotateToRel(1, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.rotation, 2 , 'Check the object rotated properly');

	t.end();
});

test('Test Rotate Deg', function (t: any) {
	let obj = GetNormalObject();

	let tween = obj.RotateDegTo(90, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.rotation, Math.PI / 2, 'Check the object rotated properly');

	t.end();
});

test('Test Rotate Deg Relative', function (t: any) {
	let obj = GetNormalObject();
	obj.rotation = Math.PI / 2;

	let tween = obj.RotateDegToRel(90, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.rotation, Math.PI, 'Check the object rotated properly');

	obj.RotateDegToRel(180, 5);
	Fatina.Update(5);
	t.equal(obj.rotation, Math.PI * 2, 'Check the object rotated properly');

	t.end();
});

test('Test PunchRotate', function (t: any) {
	let obj = GetNormalObject();

	let tween = obj.PunchRotate(2, 3, 5);
	Fatina.Update(0.5);
	t.notEqual(obj.rotation, 0, 'Check the object rotated properly');
	Fatina.Update(2.5);
	t.equal(obj.rotation, 0, 'Check the object went back to original rotation');
	t.ok(tween.IsFinished(), 'Check the tween is finished');

	t.end();
});

test('Test Fade', function (t: any) {
	let obj = GetNormalObject();

	let tween = obj.FadeTo(0.5, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.alpha, 0.5, 'Check the object alpha changed properly');

	t.end();
});

test('Test Scale', function (t: any) {
	let obj = GetNormalObject();

	let tween = obj.ScaleTo(2, 2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.scale.x, 2, 'Check the object scaled changed properly');

	t.end();
});

test('Test Scale X', function (t: any) {
	let obj = GetNormalObject();

	let tween = obj.ScaleXTo(2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.scale.x, 2, 'Check the object scaled changed properly');

	t.end();
});

test('Test Scale Y', function (t: any) {
	let obj = GetNormalObject();

	let tween = obj.ScaleYTo(2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.scale.y, 2, 'Check the object scaled changed properly');

	t.end();
});

test('Test Scale Relative', function (t: any) {
	let obj = GetNormalObject();

	let tween = obj.ScaleToRel(2, 2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.scale.x, 3, 'Check the object scaled changed properly');

	t.end();
});

test('Test Scale X Relative', function (t: any) {
	let obj = GetNormalObject();

	let tween = obj.ScaleXToRel(2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.scale.x, 3, 'Check the object scaled changed properly');

	t.end();
});

test('Test Scale Y Relative', function (t: any) {
	let obj = GetNormalObject();

	let tween = obj.ScaleYToRel(2, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.scale.y, 3, 'Check the object scaled changed properly');

	t.end();
});

test('Test PunchScale', function (t: any) {
	let obj = GetNormalObject();

	let tween = obj.PunchScale(2, 2, 3, 5);
	Fatina.Update(0.5);
	t.notEqual(obj.scale.x, 1, 'Check the object moved properly');
	Fatina.Update(2.5);
	t.equal(obj.scale.x, 1, 'Check the object went back to original position');
	t.ok(tween.IsFinished(), 'Check the tween is finished');

	t.end();
});

test('Test Color', function (t: any) {
	let obj = GetNormalObject();

	let tween = obj.ColorTo(1, 1, 1, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.hue.r, 1, 'Check the object color changed properly');

	t.end();
});

test('Test Color Relative', function (t: any) {
	let obj = GetNormalObject();
	obj.hue.r = 0.5;

	let tween = obj.ColorToRel(1, 1, 1, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.hue.r, 1.5, 'Check the object color changed properly');

	t.end();
});

test('Test Color RGB', function (t: any) {
	let obj = GetNormalObject();

	let tween = obj.ColorRGBTo('#FFFFFF', 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.hue.r, 1, 'Check the object color changed properly');

	t.end();
});

test('Test Color Relative', function (t: any) {
	let obj = GetNormalObject();
	obj.hue.r = 0.5;

	let tween = obj.ColorRGBToRel('0xFFFFFF', 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.hue.r, 1.5, 'Check the object color changed properly');

	t.end();
});

test('Test PunchColor', function (t: any) {
	let obj = GetNormalObject();

	let tween = obj.PunchColor(1, 1, 1, 3, 5);
	Fatina.Update(0.5);
	t.notEqual(obj.hue.r, 0, 'Check the object moved properly');
	Fatina.Update(2.5);
	t.equal(obj.hue.r, 0, 'Check the object went back to original position');
	t.ok(tween.IsFinished(), 'Check the tween is finished');

	t.end();
});

test('Test Tint Color', function (t: any) {
	let obj = GetPixiObject();

	let tween = obj.ColorTo(1, 1, 1, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.tint, 16777215, 'Check the object color changed properly');

	t.end();
});

test('Test Tint Color Relative', function (t: any) {
	let obj = GetPixiObject();
	obj.tint = 6688955;

	let tween = obj.ColorToRel(0.25, 0.25, 0.25, 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.tint, 10833914, 'Check the object color changed properly');

	t.end();
});

test('Test Tint Color RGB', function (t: any) {
	let obj = GetPixiObject();

	let tween = obj.ColorRGBTo('#FFFFFF', 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.tint, 16777215, 'Check the object color changed properly');

	t.end();
});

test('Test Tint Color Relative', function (t: any) {
	let obj = GetPixiObject();
	obj.tint = 6710886;

	let tween = obj.ColorRGBToRel('#222200', 5);
	t.notEqual(undefined, tween, 'Check a tween was created');
	Fatina.Update(5);
	t.equal(obj.tint, 8947814, 'Check the object color changed properly');

	t.end();
});

test('Test Tint PunchColor', function (t: any) {
	let obj = GetPixiObject();

	let tween = obj.PunchColor(1, 1, 1, 3, 5);
	Fatina.Update(0.5);
	t.notEqual(obj.tint, 0, 'Check the object moved properly');
	Fatina.Update(2.5);
	t.equal(obj.tint, 0, 'Check the object went back to original position');
	t.ok(tween.IsFinished(), 'Check the tween is finished');

	t.end();
});

function GetNormalObject() {
	// Create an object
	let obj: any = {
		position: {x: 0, y: 0 },
		scale: {x: 1, y: 1 },
		rotation: 0,
		alpha: 1,
		hue: { r: 0, g: 0, b: 0, a: 1 }
	};

	// Add plugin helpers to the object
	Fatina.plugin.AddHelpers(obj);
	return obj;
}

function GetPixiObject() {
	// Create an object
	let pixiObj: any = {
		position: {x: 0, y: 0 },
		scale: {x: 1, y: 1 },
		rotation: 0,
		alpha: 1,
		tint: '#000000'
	};

	// Add plugin helpers to the object
	Fatina.plugin.AddHelpers(pixiObj);
	return pixiObj;
}
