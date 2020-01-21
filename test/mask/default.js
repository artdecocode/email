import makeTestSuite from '@zoroaster/mask'
import Context from '../context'
import email from '../../src'

export default makeTestSuite('test/result/default', {
  async getResults() {
    const res = await email({
      text: this.input,
    })
    return res
  },
  context: Context,
})