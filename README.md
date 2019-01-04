# &lt;custom-clock&gt; Web Component

Simple clock component built with SVG & CSS Animations

![clock](https://github.com/svr93/custom-clock/raw/master/img.gif)

## Browser support

Tested in Chrome 70, Firefox 64, Safari 12.0. You should use `Array.prototype.flatMap` polyfill for older browsers.

## Usage

```ts
import { CustomClockComponent } from 'custom-clock'
customElements.define('custom-clock', CustomClockComponent)
```

```html
<custom-clock size="100px" stroke-color="#536dfe"></custom-clock>
```

You can use existing JavaScript & TypeScript definitions via special import:

```ts
import 'custom-clock/dist/src/global-declarations'
```

Please see [the discussion](https://twitter.com/treshugart/status/1072812098541957120) about predefined names.

### Attributes

- size (CSS value for clock width & height)
- stroke-color (CSS value)
