import { SVGBaseElement } from './abstract/svg-base-element.js'
import { CSSColor } from './abstract/declarations/index'

export class Circle extends SVGBaseElement {
  constructor(radius: number, params: Partial<{
    borderColor: CSSColor,
    borderWidth: number,
  }> = {}) {
    super('circle')
    const borderWidth = params.borderWidth || 1
    this.element.setAttribute('stroke-width', String(borderWidth))
    this.element.setAttribute('r', String(radius - borderWidth))

    this.element.setAttribute('cx', '50%')
    this.element.setAttribute('cy', '50%')
    // TODO: remove hard-coded `100`
    this.element.setAttribute('transform', 'rotate(-90) translate(-100)')
    this.element.setAttribute('fill', 'transparent')
    this.element.style.setProperty('stroke', params.borderColor ? getColor(params.borderColor) : 'black')

    // TODO: remove copy-pasted code
    function getColor(color: CSSColor): string {
      return color.type === 'reference'
        ? `var(--${color.name})`
        : `${color.value}`
    }
  }

  public setRotateAnimation(
    _params: Record<'intervalInSeconds' | 'delayInSeconds' | 'from' | 'to', number>,
  ): SVGBaseElement {
    console.error('NOT_IMPLEMENTED')
    return this
  }
}
