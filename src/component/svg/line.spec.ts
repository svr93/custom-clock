import { Line } from './line.js'

describe('svg line class', () => {
  it('sets coordinates', () => {
    const line = new Line({ x: 2, y: 2 }, { x: 3, y: 3 })
    expect(Math.abs(
      Number(line.element.getAttribute('x1')) - Number(line.element.getAttribute('x2')),
    )).toBe(1)
  })

  it('sets `black` as default color', () => {
    const line = new Line({ x: 1, y: 2 }, { x: 3, y: 4 })
    document.body.appendChild(line.element)
    expect(['black', 'rgb(0, 0, 0)']).toContain(String(getComputedStyle(line.element).stroke))
    document.body.removeChild(line.element)
  })

  it('sets color if present', () => {
    const line = new Line({ x: 5, y: 6 }, { x: 7, y: 8 }, { color: {
      type: 'value',
      value: 'rgb(100, 200, 255)',
    } })
    document.body.appendChild(line.element)
    expect(getComputedStyle(line.element).stroke).toBe('rgb(100, 200, 255)')
    document.body.removeChild(line.element)
  })

  it('sets color via CSS variable', () => {
    const line = new Line({ x: 5, y: 6 }, { x: 7, y: 8 }, { color: {
      type: 'reference',
      name: 'color-test1',
    } })
    document.body.appendChild(line.element)
    document.body.style.setProperty('--color-test1', 'rgb(10, 20, 30)')

    expect(getComputedStyle(line.element).stroke).toBe('rgb(10, 20, 30)')

    document.body.removeChild(line.element)
    document.body.style.removeProperty('--color-test1')
  })
})
