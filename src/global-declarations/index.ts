declare global {
  // tslint:disable-next-line interface-name
  interface HTMLElementTagNameMap {
    'custom-clock': import ('../component/').CustomClockComponent,
  }
}

export {}
