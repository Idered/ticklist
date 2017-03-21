/* global CONFIG, META */
import fetch from 'node-fetch'
import FormData from 'form-data'

const {MAILGUN_API_KEY, MAILGUN_DOMAIN} = CONFIG

export function isEmail (str) {
  // eslint-disable-next-line no-control-regex, no-useless-escape
  const regex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i

  return regex.test(str)
}

export function sendMail (email, token, code) {
  const url = `https://api:${MAILGUN_API_KEY}@api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`
  const data = new FormData()

  data.append('from', 'Ticklist <auth@ticklist.io>')
  data.append('to', email)
  data.append('subject', 'Verify your email address to use ticklist')
  data.append('html', `
    Hello! <br /><br />

    Verify that the provided security code matches <b>${code}</b> before proceeding. <br /><br />

    Then please follow this <a href="https://${META.instance}.${META.space_host}/auth/confirm/?email=${email}&token=${token}">link</a> to verify your email address.
  `)

  fetch(url, {
    method: 'POST',
    body: data
  })
}
