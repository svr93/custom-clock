import { SVGBaseElement } from './svg/abstract/svg-base-element.js'
import { Circle } from './svg/circle.js'

export enum EAttribute {
  size,
}
type Attribute = keyof typeof EAttribute

enum EBorderColor {
  DEEP_PURPLE = '#7c4dff',
}

const OUTER_CIRCLE_RADIUS = 50
const INNER_CIRCLE_RADIUS = 48

const OUTER_CIRCLE_LEN = 2 * Math.PI * (OUTER_CIRCLE_RADIUS - 1)
const INNER_CIRCLE_LEN = 2 * Math.PI * (INNER_CIRCLE_RADIUS - 1)

export class CustomClockComponent extends HTMLElement {
  public static observedAttributes = Object.keys(EAttribute)
  public $highlightedHourList: number[] = []
  private _shadowRoot: ShadowRoot
  private parentDiv: HTMLDivElement

  private innerSVGElementSet = new Set<SVGBaseElement>()

  private constructor() {
    super()

    const template = document.createElement('template')
    /* eslint-disable indent */
    template.innerHTML = `
      <style>
        .outer-circle {
          stroke-dasharray: ${OUTER_CIRCLE_LEN};
          stroke-dashoffset: 0;
          animation: outer-circle 60s linear infinite;
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
        }
        @keyframes inner-circle {
          to {
            stroke-dashoffset: 0;
          }
        }
      </style>
      <div style="transform: rotate(-90deg)">
        <svg xlmns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          ${
            new Circle(OUTER_CIRCLE_RADIUS, { borderColor: EBorderColor.DEEP_PURPLE })
              .addClass('outer-circle')
              .addToSet(this.innerSVGElementSet)
          }
          ${
            new Circle(INNER_CIRCLE_RADIUS, { borderColor: EBorderColor.DEEP_PURPLE })
              .addClass('inner-circle')
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
}
