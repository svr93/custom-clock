// extension '*.js' is necessary for native ES2015 modules
import { CustomClockComponent } from '../component/index.js'

customElements.define('custom-clock', CustomClockComponent)

declare global {
  // tslint:disable-next-line interface-name
  interface HTMLElementTagNameMap {
    'custom-clock': CustomClockComponent,
  }
}
