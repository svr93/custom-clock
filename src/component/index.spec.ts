
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
})
