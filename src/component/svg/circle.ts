import { SVGBaseElement } from './abstract/svg-base-element.js'

export class Circle extends SVGBaseElement {
  constructor(radius: number, params: Partial<{ borderColor: string, borderWidth: number }> = {}) {
    super('circle')
    const borderWidth = params.borderWidth || 1
    this.element.setAttribute('stroke-width', String(borderWidth))
    this.element.setAttribute('r', String(radius - borderWidth))

    this.element.setAttribute('cx', '50%')
    this.element.setAttribute('cy', '50%')
    // TODO: remove hard-coded `100`
    this.element.setAttribute('transform', 'rotate(-90) translate(-100)')
    this.element.setAttribute('fill', 'transparent')
    this.element.setAttribute('stroke', params.borderColor || 'black')
  }

  public setRotateAnimation(
    _params: Record<'intervalInSeconds' | 'delayInSeconds' | 'from' | 'to', number>,
  ): SVGBaseElement {
    console.error('NOT_IMPLEMENTED')
    return this
  }
}
