export type Point = Record<'x' | 'y', number>

export abstract class SVGBaseElement {
  public get element(): SVGElement {
    return this._element
  }
  private _element: SVGElement

  constructor(tagName: keyof SVGElementTagNameMap) {
    this._element = document.createElementNS('http://www.w3.org/2000/svg', tagName)
  }

  public abstract setRotateAnimation(
    params: Record<'intervalInSeconds' | 'from' | 'to', number> & (
      {
        /**
         * @description `reference` used for CSS variable name (live binding)
         */
        delayInSeconds: { type: 'reference', name: string } | { type: 'value', value: number },
      } | {
        /** @deprecated */
        delayInSeconds: number,
      }
    ),
  ): SVGBaseElement

  public addToSet(set: Set<SVGBaseElement>): SVGBaseElement {
    set.add(this)
    return this
  }

  public addClass(className: string): SVGBaseElement {
    this.element.classList.add(className)
    return this
  }

  public destroy(): void {
    this._element.remove()
    Reflect.set(this, '_element', null)
  }

  public toString(): string {
    return this.element.outerHTML
  }
}
