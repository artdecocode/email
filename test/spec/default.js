import { equal, ok } from '@zoroaster/assert'
import Context from '../context'
import email from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof email, 'function')
  },
  async 'calls package without error'() {
    await email()
  },
  async 'gets a link to the fixture'({ fixture }) {
    const text = fixture`text.txt`
    const res = await email({
      text,
    })
    ok(res, text)
  },
}

export default T