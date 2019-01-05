# Change Log

## 2.0.0 (January 5, 2019)

* Attribute `size` was renamed to `dial-size` (see [discussion](https://github.com/svr93/custom-clock/issues/28))

* Make `hasAttribute`, `removeAttribute`, `setAttribute` methods type-safe

## 1.2.1 (January 5, 2019)

* Default value used for `size` attribute - 100px

* Each attribute change passes through `CSS.supports` validation; warning used in case of unacceptable value

## 1.1.1 (January 4, 2019)

* Remove unused `animateTransform` tags

* Move CSS variables to nested div (keep internal state in shadow-root)

* Reduce npm package size

## 1.1.0 (January 4, 2019)

* New attribute added: `stroke-color`

## 1.0.0 (January 3, 2019)

* Change description & add useful information about predefined names

## 0.0.2 - 2018-12-02

* Remove unnecessary dependencies (nodemon)

* Add `ts-enum-util` lib to fix incorrect `observedAttributes` array

* Use stable TypeScript version (3.0, compatible with `ts-enum-util`)

## 0.0.3 - 2018-12-03

* Fix npm metadata; ready to publish

## 0.0.4 - 2019-01-01

* Fix line rendering in Firefox. Firefox doesn't support SMIL animations inside Web Components, so CSS animations used

## 0.0.5 - 2019-01-01

* Smooth switching between circles

## 0.0.6 - 2019-01-02

* Restore time after background->foreground switch

## 0.0.7 - 2019-01-03

* Fix Safari SVG `stroke-dashoffset` problem: Safari doesn't support negative values

## 0.0.8 - 2019-01-03

* Update README
