import { $enum } from '../../node_modules/ts-enum-util/src/index.js'

import { SVGBaseElement } from './svg/abstract/svg-base-element.js'
import { Circle } from './svg/circle.js'
import { Line } from './svg/line.js'

export enum EAttribute {
  size,
}
type Attribute = keyof typeof EAttribute

enum EBorderColor {
  DEEP_PURPLE = '#7c4dff',
}

const VIEW_BOX_SIZE = 100

const OUTER_CIRCLE_RADIUS = 48
const INNER_CIRCLE_RADIUS = 46

const RADIUS_RATIO = OUTER_CIRCLE_RADIUS / INNER_CIRCLE_RADIUS
const TRANSLATE_RATIO = RADIUS_RATIO * (VIEW_BOX_SIZE / OUTER_CIRCLE_RADIUS)

const OUTER_CIRCLE_LEN = 2 * Math.PI * (OUTER_CIRCLE_RADIUS - 1)
const INNER_CIRCLE_LEN = 2 * Math.PI * (INNER_CIRCLE_RADIUS - 1)

const STYLE = `
  :host {
    --delay: 0s;
  }
  g.circle {
    animation: g-circle 60s linear infinite;
    animation-delay: var(--delay);
  }
  @keyframes g-circle {
    to {
      transform: translate(-${TRANSLATE_RATIO}%, -${TRANSLATE_RATIO}%) scale(${RADIUS_RATIO});
    }
  }
  .outer-circle {
    stroke-dasharray: ${OUTER_CIRCLE_LEN};
    stroke-dashoffset: 0;
    animation: outer-circle 60s linear infinite;
    animation-delay: var(--delay);
  }
  @keyframes outer-circle {
    to {
      stroke-dashoffset: ${-OUTER_CIRCLE_LEN};
    }
  }

  .inner-circle {
    stroke-dasharray: ${INNER_CIRCLE_LEN};
    stroke-dashoffset: ${INNER_CIRCLE_LEN};
    animation: inner-circle 60s linear infinite;
    animation-delay: var(--delay);
  }
  @keyframes inner-circle {
    to {
      stroke-dashoffset: 0;
    }
  }
`

export class CustomClockComponent extends HTMLElement {
  public static observedAttributes = $enum(EAttribute).getKeys()
  public $highlightedHourList: number[] = []
  private _shadowRoot: ShadowRoot
  private parentDiv: HTMLDivElement

  private innerSVGElementSet = new Set<SVGBaseElement>()
  private date = new Date()

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
              new Circle(OUTER_CIRCLE_RADIUS, { borderColor: EBorderColor.DEEP_PURPLE })
                .addClass('outer-circle')
                .addToSet(this.innerSVGElementSet)
            }
          </g>
          <g class="circle">
            ${
              new Circle(INNER_CIRCLE_RADIUS, { borderColor: EBorderColor.DEEP_PURPLE })
                .addClass('inner-circle')
                .addToSet(this.innerSVGElementSet)
            }
          </g>
          ${
            // minute
            new Line(center, { ...center, x: center.x + INNER_CIRCLE_RADIUS / 1.125 }, {
              color: EBorderColor.DEEP_PURPLE,
            })
            .setRotateAnimation({
              delayInSeconds: -(60) * this.calculateMinuteHandShift(),
              from: -90,
              intervalInSeconds: (60) * 60,
              to: 270,
            })
            .addToSet(this.innerSVGElementSet)
          }
          ${
            // hour
            new Line(center, { ...center, x: center.x + INNER_CIRCLE_RADIUS / 1.5 }, {
              color: EBorderColor.DEEP_PURPLE,
            })
            .setRotateAnimation({
              delayInSeconds: -(60 ** 2) * this.calculateHourHandShift(),
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
    style.setProperty('--delay', `${-this.date.getSeconds()}s`)

    this.setAttribute('project', 'https://github.com/svr93/custom-clock')
  }

  public disconnectedCallback(): void {
    this.innerSVGElementSet.forEach((item) => item.destroy())
  }

  public attributeChangedCallback(name: Attribute, _: string, newValue: string): void {
    switch (name) {
      case 'size':
        Object.assign(this.parentDiv.style, { width: newValue, height: newValue })
    }
  }

  private restartAnimation(): void {
    const elementList = this.getAnimatedElementList()
    const classTupleList = elementList.map((item) => Array.from(item.classList))
    elementList.forEach((item, i) => {
      item.classList.remove(...classTupleList[i])
    })
    this.triggerReflow()
    // TODO: change variables
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
