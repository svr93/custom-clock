export enum EAttribute {
  size,
}
type Attribute = keyof typeof EAttribute

export class CustomClockComponent extends HTMLElement {
  public static observedAttributes = Object.keys(EAttribute)
  public $highlightedHourList: number[] = []

  constructor() {
    super()

    const template = document.createElement('template')
    template.innerHTML = `
      <div>CustomClockComponent</div>
    `

    this.attachShadow({ mode: 'closed' }).appendChild(template.content)
  }

  public connectedCallback(): void {
    this.setAttribute('project', 'https://github.com/svr93/custom-clock')
  }

  public attributeChangedCallback(name: Attribute, _: string, newValue: string): void {
    console.log(`${name} new value: ${newValue}`)
  }
}
