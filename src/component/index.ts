export class CustomClockComponent extends HTMLElement {
  public $highlightedHourList: number[] = []

  constructor() {
    super()

    const template = document.createElement('template')
    template.innerHTML = `
      <div>CustomClockComponent</div>
    `

    this.attachShadow({ mode: 'closed' }).appendChild(template.content)
  }
}
