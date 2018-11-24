import { SVGBaseElement } from './abstract/svg-base-element.js'

type Point = Record<'x' | 'y', number>

export class Line extends SVGBaseElement {
  constructor(p1: Point, p2: Point, params: Partial<{ color: string }> = {}) {
    super('line')
  }
}
