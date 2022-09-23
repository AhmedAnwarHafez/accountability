import { createRouter } from './context'
import jwt from 'jsonwebtoken'

export const tokenRouter = createRouter().query('getToken', {
  async resolve() {
    const token = jwt.sign({ foo: 'bar' }, 'secret', {
      expiresIn: 1 * 60,
    })
    return {
      token,
    }
  },
})
