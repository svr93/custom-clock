import { Point, SVGBaseElement } from './abstract/svg-base-element.js'

export class Line extends SVGBaseElement {
  constructor(p1: Point, p2: Point, params: Partial<{ color: string }> = {}) {
    super('line')

    this.element.setAttribute('x1', String(p1.x))
    this.element.setAttribute('x2', String(p2.x))

    this.element.setAttribute('y1', String(p1.y))
    this.element.setAttribute('y2', String(p2.y))

    this.element.setAttribute('stroke', params.color || 'black')
  }

  public setRotateAnimation(
    point: Point,
    params: Record<'intervalInSeconds' | 'delayInSeconds', number>,
  ): SVGBaseElement {
    this.appendAnimateTransformTags()
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
}
