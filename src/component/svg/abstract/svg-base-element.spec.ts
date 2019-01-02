import { SVGBaseElement } from './svg-base-element.js'

describe('`data-reference` property', () => {
  const C = class extends SVGBaseElement {
    public setRotateAnimation(_params: unknown): SVGBaseElement {
      return this
    }
  }

  it('should exists', () => {
    expect(new C('clipPath').element.hasAttribute('data-reference')).toBe(true)
  })

  it('should be unique', () => {
    expect(
      new C('ellipse').element.getAttribute('data-reference'),
    ).not.toBe(
      new C('ellipse').element.getAttribute('data-reference'),
    )
  })
})
