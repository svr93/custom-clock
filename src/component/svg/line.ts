import { Point, SVGBaseElement } from './abstract/svg-base-element.js'

export class Line extends SVGBaseElement {
  constructor(p1: Point, p2: Point, params: Partial<{ color: string }> = {}) {
    super('line')

    this.element.setAttribute('x1', '0')
    this.element.setAttribute('x2', String(Math.abs(p2.x - p1.x)))

    this.element.setAttribute('y1', '0')
    this.element.setAttribute('y2', String(Math.abs(p2.y - p1.y)))

    const rP = this.selectRotationPoint(p1, p2)
    this.element.setAttribute('transform', `translate(${rP.x},${rP.y})`)

    this.element.setAttribute('stroke', params.color || 'black')
  }

  public setRotateAnimation(
    params: Record<'intervalInSeconds' | 'delayInSeconds' | 'from' | 'to', number>,
  ): SVGBaseElement {
    const [firstElement] = this.appendAnimateTransformTags()

    Object
      .entries({
        attributeName: 'transform',
        type: 'rotate',

        additive: 'sum',
        repeatCount: 'indefinite',

        begin: `${params.delayInSeconds}s`,
        dur: `${params.intervalInSeconds}s`,
        from: params.from,
        to: params.to,
      })
      .forEach(([key, value]) => firstElement.setAttribute(key, String(value)))

    return this
  }

  private appendAnimateTransformTags(): [SVGElement, SVGElement] {
    if (!this.element.children.length) {
      for (let i = 1; i <= 2; i++) {
        this.element.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'animateTransform'))
      }
    }
    const [first, second] = this.element.querySelectorAll('animateTransform')
    return [first as SVGElement, second as SVGElement]
  }

  /**
   * @description Selects a point nearest to the origin of coordinates
   */
  private selectRotationPoint(p1: Point, p2: Point): Point {
    const distance1 = Math.sqrt(p1.x ** 2 + p1.y ** 2)
    const distance2 = Math.sqrt(p2.x ** 2 + p2.y ** 2)
    return distance1 < distance2 ? p1 : p2
  }
}
