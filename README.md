# &lt;custom-clock&gt; Web Component

Simple clock component as native Custom Element

![clock](https://github.com/svr93/custom-clock/raw/master/img.gif)

## Browser support

Tested in Chrome 70, Firefox 64, Safari 12.0. You should use `Array.prototype.flatMap` polyfill for older browsers.

## Usage

```ts
import { CustomClockComponent } from 'custom-clock'
customElements.define('custom-clock', CustomClockComponent)
```

```html
<custom-clock size="100px"></custom-clock>
```

You can use existing JavaScript & TypeScript definitions via special import:

```ts
import 'custom-clock/dist/src/global-declarations'
```

### Attributes

- size (CSS value for clock width & height)
