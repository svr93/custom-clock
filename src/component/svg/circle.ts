import { SVGBaseElement } from './abstract/svg-base-element.js'

export class Circle extends SVGBaseElement {
  constructor(radius: number) {
    super('circle')
    this.element.setAttribute('r', String(radius))

    this.element.setAttribute('cx', '50%')
    this.element.setAttribute('cy', '50%')
  }
}
