
export function isSupportedCSSColor(color: string): boolean {
  return CSS.supports('color', color)
}

export function isSupportedCSSSize(size: string): boolean {
  return CSS.supports('width', size)
}
