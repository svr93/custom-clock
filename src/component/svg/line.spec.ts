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
    expect(line.element.getAttribute('stroke')).toBe('black')
  })

  it('sets color if present', () => {
    const line = new Line({ x: 5, y: 6 }, { x: 7, y: 8 }, { color: 'rgb(100, 200, 300)' })
    expect(line.element.getAttribute('stroke')).toBe('rgb(100, 200, 300)')
  })

  /* unused because of CSS animations instead of SMIL (FF bug)
  it('creates animation for line', () => {
    const line = new Line({ x: 9, y: 10 }, { x: 11, y: 12 })
    line.setRotateAnimation({ intervalInSeconds: 60 * 60, delayInSeconds: 1 * 60, from: 0, to: 10 })
    line.setRotateAnimation({ intervalInSeconds: 60 * 60, delayInSeconds: 2 * 60, from: 1, to: 11 })
    expect(line.element.children[0].tagName).toBe('animateTransform')
  })
  */
})
