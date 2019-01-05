import { $enum } from '../../node_modules/ts-enum-util/src/index.js'

import { SVGBaseElement } from './svg/abstract/svg-base-element.js'
import { Circle } from './svg/circle.js'
import { Line } from './svg/line.js'

import { isSupportedCSSColor, isSupportedCSSSize } from '../utils/is-supported-css-value.js'

export enum EAttribute {
  'dial-size',
  'stroke-color',
}
type Attribute = keyof typeof EAttribute

enum EBorderColor {
  DEEP_PURPLE = '#7c4dff',
}

const VIEW_BOX_SIZE = 100

const OUTER_CIRCLE_RADIUS = 48
const INNER_CIRCLE_RADIUS = 46

const RADIUS_RATIO = OUTER_CIRCLE_RADIUS / INNER_CIRCLE_RADIUS
const TRANSLATE_RATIO = RADIUS_RATIO * (100 / OUTER_CIRCLE_RADIUS)

const OUTER_CIRCLE_LEN = 2 * Math.PI * (OUTER_CIRCLE_RADIUS - 1)
const INNER_CIRCLE_LEN = 2 * Math.PI * (INNER_CIRCLE_RADIUS - 1)

const STYLE = `
  g.circle {
    animation: g-circle 60s linear infinite;
    animation-delay: var(--secondDelay);
  }
  @keyframes g-circle {
    to {
      transform: translate(-${TRANSLATE_RATIO}%, -${TRANSLATE_RATIO}%) scale(${RADIUS_RATIO});
    }
  }
  .outer-circle {
    stroke-dasharray: ${OUTER_CIRCLE_LEN};
    stroke-dashoffset: ${OUTER_CIRCLE_LEN};
  }
  .inner-circle {
    stroke-dasharray: ${INNER_CIRCLE_LEN};
    stroke-dashoffset: ${INNER_CIRCLE_LEN};
  }
  .outer-circle,
  .inner-circle {
    animation: circle 60s linear infinite;
    animation-delay: var(--secondDelay);
  }

  @keyframes circle {
    to {
      stroke-dashoffset: 0;
    }
  }
`

const defaults = Object.freeze({
  'dial-size': '100px',
  'stroke-color': EBorderColor.DEEP_PURPLE,
})

export class CustomClockComponent extends HTMLElement {
  public static observedAttributes = $enum(EAttribute).getKeys()
  public static get defaults(): Record<Attribute, string> {
    return defaults
  }

  public $highlightedHourList: number[] = []
  private _shadowRoot: ShadowRoot
  private parentDiv: HTMLDivElement
  private get variableNamespace(): CSSStyleDeclaration {
    return this.parentDiv.style
  }

  private innerSVGElementSet = new Set<SVGBaseElement>()
  private date = new Date()

  private visibilityChangeListener = () => this.restartAnimation()

  private constructor() {
    super()

    const template = document.createElement('template')
    const center = {
      x: VIEW_BOX_SIZE / 2,
      y: VIEW_BOX_SIZE / 2,
    }
    /* eslint-disable indent */
    template.innerHTML = `
      <style>
        ${STYLE}
      </style>
      <div>
        <svg xlmns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW_BOX_SIZE} ${VIEW_BOX_SIZE}">
          <g class="circle">
            ${
              new Circle(OUTER_CIRCLE_RADIUS, { borderColor: { type: 'reference', name: 'strokeColor' } })
                .addToSet(this.innerSVGElementSet)
            }
          </g>
          <g class="circle">
            ${
              new Circle(OUTER_CIRCLE_RADIUS + 1, {
                borderColor: { type: 'value', value: 'white' },
                borderWidth: 2,
              })
                .addClass('outer-circle')
                .addToSet(this.innerSVGElementSet)
            }
          </g>
          <g class="circle">
            ${
              new Circle(INNER_CIRCLE_RADIUS, { borderColor: { type: 'reference', name: 'strokeColor' } })
                .addClass('inner-circle')
                .addToSet(this.innerSVGElementSet)
            }
          </g>
          ${
            // minute
            new Line(center, { ...center, x: center.x + INNER_CIRCLE_RADIUS / 1.125 }, {
              color: { type: 'reference', name: 'strokeColor' },
            })
            .setRotateAnimation({
              delayInSeconds: { type: 'reference', name: 'minuteDelay' },
              from: -90,
              intervalInSeconds: (60) * 60,
              to: 270,
            })
            .addToSet(this.innerSVGElementSet)
          }
          ${
            // hour
            new Line(center, { ...center, x: center.x + INNER_CIRCLE_RADIUS / 1.5 }, {
              color: { type: 'reference', name: 'strokeColor' },
            })
            .setRotateAnimation({
              delayInSeconds: { type: 'reference', name: 'hourDelay' },
              from: -90,
              intervalInSeconds: (60 ** 2) * 12,
              to: 270,
            })
            .addToSet(this.innerSVGElementSet)
          }
        </svg>
      </div>
    `
    /* eslint-enable indent */

    this._shadowRoot = this.attachShadow({ mode: 'closed' })
    this._shadowRoot.appendChild(template.content)

    this.parentDiv = this._shadowRoot.querySelector('div')!
  }

  public connectedCallback(): void {
    const { style } = this._shadowRoot.host as HTMLElement
    style.display = 'inline-block'
    if (!this.hasAttribute('dial-size')) {
      const size = CustomClockComponent.defaults['dial-size']
      Object.assign(this.parentDiv.style, { width: size, height: size })
    }
    if (!this.hasAttribute('stroke-color')) {
      this.variableNamespace.setProperty('--strokeColor', CustomClockComponent.defaults['stroke-color'])
    }
    this.setDelay()

    this.setAttribute('project', 'https://github.com/svr93/custom-clock')

    document.addEventListener('visibilitychange', this.visibilityChangeListener)
  }

  public disconnectedCallback(): void {
    this.innerSVGElementSet.forEach((item) => item.destroy())

    document.removeEventListener('visibilitychange', this.visibilityChangeListener)
  }

  public attributeChangedCallback(name: Attribute, _: string, newValue: string): void {
    switch (name) {
      case 'dial-size':
        if (newValue && !isSupportedCSSSize(newValue)) {
          console.warn(`Attribute 'dial-size' with value '${newValue}' is not supported`)
          if (Number.isFinite(+newValue)) {
            console.warn(`Did you mean '${newValue}px'?`)
          }
        }
        const size = newValue || CustomClockComponent.defaults['dial-size']
        Object.assign(this.parentDiv.style, { width: size, height: size })
        break
      case 'stroke-color':
        if (newValue && !isSupportedCSSColor(newValue)) {
          console.warn(`Attribute 'stroke-color' with value '${newValue}' is not supported`)
        }
        this.variableNamespace.setProperty('--strokeColor', newValue || CustomClockComponent.defaults['stroke-color'])
        break
    }
  }

  public hasAttribute(qualifiedName: Attribute | 'project'): boolean {
    return super.hasAttribute(qualifiedName)
  }

  public removeAttribute(qualifiedName: Attribute | 'project'): void {
    return super.removeAttribute(qualifiedName)
  }

  public setAttribute(qualifiedName: Attribute | 'project', value: string): void {
    return super.setAttribute(qualifiedName, value)
  }

  private setDelay(): void {
    const style = this.variableNamespace
    this.date = new Date()

    style.setProperty('--secondDelay', `${-this.date.getSeconds()}s`)
    style.setProperty('--minuteDelay', `${-60 * this.calculateMinuteHandShift()}s`)
    style.setProperty('--hourDelay', `${-(60 ** 2) * this.calculateHourHandShift()}s`)
  }

  private restartAnimation(): void {
    const elementList = this.getAnimatedElementList()
    const classTupleList = elementList.map((item) => Array.from(item.classList))
    elementList.forEach((item, i) => {
      item.classList.remove(...classTupleList[i])
    })
    this.triggerReflow()
    this.setDelay()
    elementList.forEach((item, i) => {
      item.classList.add(...classTupleList[i])
    })
  }

  private getAnimatedElementList(): HTMLElement[] {
    return Array
      .from(this.innerSVGElementSet)
      .map((item) => {
        const reference = item.element.getAttribute('data-reference')!
        return this._shadowRoot.querySelector<HTMLElement>(`[data-reference="${reference}"]`)!
      })
      .flatMap((item) => {
        return [item, item.parentElement!]
      })
  }

  // TODO: move to utils
  private triggerReflow(): void {
    void document.body.offsetHeight
  }

  private calculateMinuteHandShift(): number {
    return this.date.getMinutes() + this.date.getSeconds() / 60
  }

  private calculateHourHandShift(): number {
    return (this.date.getHours() % 12) + this.calculateMinuteHandShift() / 60
  }
}
