import { Circle } from './circle.js'

describe('svg circle class', () => {
  it('returns element string reprecentation', () => {
    expect(new Circle().toString()).toContain('<circle')
  })
})
