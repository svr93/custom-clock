
describe('attribute check', () => {
  it('checks `project` attribute', async (done) => {
    await customElements.whenDefined('custom-clock')
    const element = document.createElement('custom-clock')
    document.body.appendChild(element)

    expect(element.getAttribute('project')).toBe('https://github.com/svr93/custom-clock')
    done()
  })

  it('checks size attribute', async (done) => {
    await customElements.whenDefined('custom-clock')
    const element = document.createElement('custom-clock')
    document.body.appendChild(element)

    element.setAttribute('size', '200px')
    expect(Math.round(element.getBoundingClientRect().height)).toBe(200)
    expect(Math.round(element.getBoundingClientRect().width)).toBe(200)
    done()
  })

  it('checks default size attribute', async (done) => {
    await customElements.whenDefined('custom-clock')
    const element = document.createElement('custom-clock')
    document.body.appendChild(element)

    triggerReflow()
    checkDefaultSize()

    element.setAttribute('size', '200px')
    triggerReflow()
    element.removeAttribute('size')
    triggerReflow()
    checkDefaultSize()

    done()

    function checkDefaultSize(): void {
      expect(Math.round(element.getBoundingClientRect().height)).toBe(100)
      expect(Math.round(element.getBoundingClientRect().width)).toBe(100)
    }

    // TODO: move to utils
    function triggerReflow(): void {
      void document.body.offsetHeight
    }
  })
})
