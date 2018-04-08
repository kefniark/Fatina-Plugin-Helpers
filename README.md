![Logo](logo.png)

# Fatina Helpers
Small & Light tweening library for **Games** / **Web**

* **Website**: [Here](https://kefniark.github.io/Fatina/)
* **API**: [Here](https://kefniark.github.io/Fatina/api/basic/)
* **Samples**: [Here](https://kefniark.github.io/Fatina/samples/generic/)

[![NPM Version](https://img.shields.io/npm/v/fatina-plugin-helpers.svg)](https://npmjs.org/package/fatina-plugin-helpers)
[![NPM Downloads](https://img.shields.io/npm/dm/fatina-plugin-helpers.svg)](https://npmjs.org/package/fatina-plugin-helpers)
[![Build Status](https://img.shields.io/travis/kefniark/Fatina-Plugin-Helpers.svg)](https://travis-ci.org/kefniark/Fatina-Plugin-Helpers)
[![Coverage Status](https://coveralls.io/repos/github/kefniark/Fatina-Plugin-Helpers/badge.svg?branch=master)](https://coveralls.io/github/kefniark/Fatina-Plugin-Helpers?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/d829934eb7014fd191c0777ecfe11acd)](https://www.codacy.com/app/kefniark/Fatina-Plugin-Helpers?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=kefniark/Fatina-Plugin-Helpers&amp;utm_campaign=Badge_Grade)
[![License](https://img.shields.io/npm/l/fatina-plugin-helpers.svg)](https://npmjs.org/package/fatina-plugin-helpers)

## Description
This plugin is just a set of helpers to provide a better integration of Fatina with javascript games library (pixi, phaser, ...)

**This plugin requires Fatina** : [Here](https://github.com/kefniark/Fatina)

## Getting Started

### Install
If you use directly the minified version
```ts
<script src="fatina-plugin-helpers.min.js"></script>
```
Or if you use NPM
```ts
> npm install fatina-plugin-helpers
```

### Init
```ts
// standard node.js require
var FatinaHelpers = require('fatina-plugin-helpers');
// OR
// standard import with typescript (typed version)
import * as FatinaHelpers from 'fatina-plugin-helpers';
```

and initialize (add this plugin to **Fatina**)
```ts
Fatina.init();
Fatina.loadPlugin(FatinaHelpers.get());
```

### Usage
You can now populate any kind of object with the following method (container, sprites, camera, ...)
```ts
Fatina.plugin.addHelpers(myObject);
```

## Methods
Here are the helpers automatically added:

### Position
Following methods use `.position.x` and `.position.y`

* myObject.**moveTo(x, y, duration)** : Move to an absolute position
* myObject.**moveXTo(x, duration)**
* myObject.**moveYTo(y, duration)**
* myObject.**moveToRel(x, y, duration)** : Move to a relative position
* myObject.**moveXToRel(x, duration)**
* myObject.**moveYToRel(y, duration)**
* myObject.**punchPosition(x, y, duration, iteration)** : Oscillate around the current position
* myObject.**shake(x, y, duration, iteration)** : Shake around the current position

### Rotation
Following methods use `.rotation`

* myObject.**rotateTo(angle, duration)** : Rotate to a specific angle in radiant (to PI/2)
* myObject.**rotateToRel(angle, duration)** : Rotate by a relative radiant angle (+PI/2)
* myObject.**rotateDegTo(angle, duration)** : Rotate to a specific angle in degrees (to 90°)
* myObject.**rotateDegToRel(angle, duration)** : Rotate to a specific angle in degrees (+90°)
* myObject.**punchRotate(angle, duration, iteration)**

### Alpha
Following method use `.alpha`

* myObject.**fadeTo(alpha, duration)** : Alpha is a float between 0 and 1 (1: fadeIn, 0: fadeOut)

### Scale
Following methods use `.scale.x` and `.scale.y`

* myObject.**scaleTo(x, y, duration)** : Scale to a specified value
* myObject.**scaleXTo(x, duration)**
* myObject.**scaleYTo(y, duration)**
* myObject.**scaleToRel(x, y, duration)**
* myObject.**scaleXToRel(x, duration)**
* myObject.**scaleYToRel(y, duration)**
* myObject.**punchScale(x, y, duration, iteration)**

### Color / Tint
Following methods use `.tint` or `.hue` (the color API are slightly different between libs)

* myObject.**colorTo(r, g, b, duration)** : R,G,B are float between 0-1
* myObject.**colorToRel(r, g, b, duration)**
* myObject.**colorRGBTo(hex, duration)** : hex is a string representation '#FFFFFF'
* myObject.**colorRGBToRel(hex, duration)**
* myObject.**punchColor(r, g, b, duration, iteration)**