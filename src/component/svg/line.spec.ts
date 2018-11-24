import { Line } from './line.js'

describe('svg line class', () => {
  it('sets coordinates', () => {
    const line = new Line({ x: 2, y: 2 }, { x: 3, y: 3 })
    expect(Math.abs(
      Number(line.element.getAttribute('x1')) - Number(line.element.getAttribute('x2')),
    )).toBe(1)
  })
})
