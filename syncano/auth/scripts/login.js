/* global ARGS */
import crypto from 'crypto'
import {data, response} from 'syncano-server'
import {isEmail, sendMail} from './helpers'

const {email} = ARGS

if (!isEmail(email)) {
  response.json({
    message: 'Invalid email'
  }, 400)

  process.exit(0)
}

const token = crypto.randomBytes(16).toString('hex')
const code = crypto.randomBytes(3).toString('hex').substr(0, 5)
const validUntil = new Date()
validUntil.setMinutes(validUntil.getMinutes() + 15)

data.magic_links.create({
  email,
  token,
  code,
  valid_until: validUntil
}).then(() => {
  sendMail(email, token, code)

  response.json({token, code})
})
