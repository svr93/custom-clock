import { Point, SVGBaseElement } from './abstract/svg-base-element.js'

type CSSColor =
{ type: 'reference', name: string } |
{ type: 'value', value: string }

export class Line extends SVGBaseElement {
  constructor(p1: Point, p2: Point, params: Partial<{ color: CSSColor }> = {}) {
    super('line')

    this.element.setAttribute('x1', '0')
    this.element.setAttribute('x2', String(Math.abs(p2.x - p1.x)))

    this.element.setAttribute('y1', '0')
    this.element.setAttribute('y2', String(Math.abs(p2.y - p1.y)))

    const rP = this.selectRotationPoint(p1, p2)
    // this.element.setAttribute('transform', `translate(${rP.x},${rP.y})`)
    this.element.style.transform = `translate(${rP.x}%, ${rP.y}%)`

    this.element.style.setProperty('stroke', params.color ? getColor(params.color) : 'black')

    function getColor(color: CSSColor): string {
      return color.type === 'reference'
        ? `var(--${color.name})`
        : `${color.value}`
    }
  }

  public setRotateAnimation(
    params: Record<'intervalInSeconds' | 'from' | 'to', number> & {
      delayInSeconds: { type: 'reference', name: string } | { type: 'value', value: number },
    },
  ): SVGBaseElement {
    const [firstElement] = this.appendAnimateTransformTags()

    const rndClassName = `line-${Math.round(Math.random() * 10e4)}`
    this.element.classList.add(rndClassName)

    const styleText = `
      .${rndClassName} {
        animation: ${rndClassName} ${params.intervalInSeconds}s linear infinite;
        animation-delay: ${getAnimationDelay()};
      }
      @keyframes ${rndClassName} {
        from {
          transform: ${this.element.style.transform} rotate(${params.from}deg);
        }
        to {
          transform: ${this.element.style.transform} rotate(${params.to}deg);
        }
      }
    `
    const styleTag = document.createElement('style')
    styleTag.innerHTML = styleText
    this.element.appendChild(styleTag)

    return this

    function getAnimationDelay(): string {
      return params.delayInSeconds.type === 'reference'
        ? `var(--${params.delayInSeconds.name})`
        : `${params.delayInSeconds.value}s`
    }
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
