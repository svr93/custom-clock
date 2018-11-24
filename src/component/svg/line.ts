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
}
