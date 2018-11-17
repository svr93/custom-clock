export abstract class SVGBaseElement {
  public get element(): SVGElement {
    return this._element
  }
  private _element: SVGElement

  constructor(tagName: keyof SVGElementTagNameMap) {
    this._element = document.createElementNS('http://www.w3.org/2000/svg', tagName)
  }

  public destroy(): void {
    this._element.remove()
    Reflect.set(this, '_element', null)
  }

  public toString(): string {
    return this.element.outerHTML
  }
}
