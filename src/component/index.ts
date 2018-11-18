import { SVGBaseElement } from './svg/abstract/svg-base-element.js'
import { Circle } from './svg/circle.js'

export enum EAttribute {
  size,
}
type Attribute = keyof typeof EAttribute

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
      <div>
        <svg xlmns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          ${
            new Circle(50).addToSet(this.innerSVGElementSet)
          }
        </svg>
      </div>
    `
    /* eslint-enable indent */

    this._shadowRoot = this.attachShadow({ mode: 'closed' })
    this._shadowRoot.appendChild(template.content)

    this.parentDiv = this._shadowRoot.children[0] as HTMLDivElement
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
