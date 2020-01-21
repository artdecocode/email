import { createSign, createHash } from 'crypto'

// == The config
const config = {
  b: {
    encoding: 'base64',
    algorithm: 'RSA-SHA256',
  },
  bh: {
    encoding: 'hex',
    algorithm: 'SHA256',
  },
  validHeaders: ['from', 'to', 'subject', 'date'],
  regex: {
    wsp: /\s{1,}/g,
    wspAtLineEnd: /\s+$/g,
  },
}
// == The methods
/**
 * Generates the signature.
 * @param {string} b
 * @param {string} privateKey
 */
function hashSignature(b, privateKey) {
  const sign = createSign(config.b.algorithm)
  sign.update(b)
  return sign.sign(privateKey, config.b.encoding)
}
/**
 * Hashes the body.
 * @param {string} bh
 */
function hashBody(bh) {
  const hash = createHash(config.bh.algorithm)
  hash.update(bh)
  return hash.digest(config.bh.encoding)
}
/**
 * Parses the headers to a usable format
 * @param {string} headersString The headers
 */
function headerParser(headersString) {
  const headers = headersString.split('\r\n')
    .map(h => {
      // = Splits the header at the :<SP>
      const [name, value] = h.split(': ')
      return { name, value }
    })
    .filter(({ name }) => {
      return config.validHeaders.includes(name.toLowerCase())
    })
  // == Adds the dkim required info
  const parsed = {
    headers,
    fields: headers
      .map(({ name }) => name.toLowerCase())
      .join(':'),
    fieldValues:
      headers
        .map(({ name, value }) => `${name.toLowerCase()}:${value}`)
        .join('\n') + '\r\n',
  }
  // == Returns the parsed
  return parsed
}
/**
 * Body preparation.
 * @param {string} body
 */
function canonicalizeBody(body) {
  return body.replace(config.regex.wsp, ' ').replace(config.regex.wspAtLineEnd, '')
}
/**
 * Builds the DKIM header
 * @param {string} headers
 * @param {_email.Dkim} dkim
 */
function buildDkimHeader(headers, dkim, bodyHash) {
  const parsed = headerParser(headers)

  const header = [
    `v=1`,
    `a=rsa-sha256`,
    `c=relaxed/relaxed`,
    `q=dns/txt`,
    `d=${dkim.domain}`,
    `s=${dkim.keySelector}`,
    `h=${parsed.fields}`,
    `t=${Date.now()}`,
    `x=${Date.now() + 999999}`,
    `z=${parsed.headers.map(({ name, value }) => `${name}:${value}`).join('|')}`,
    `bh=${bodyHash}`,
    `b=`,
  ]
  // == Prepares the header for hash
  const headerForSign = `dkim${parsed.fieldValues}}`
  // == Hashes the header
  const signature = hashSignature(headerForSign, dkim.privateKey)
  // == Appends the signature to the header
  header[header.length - 1] = `b=${signature}`
  // == Makes the header readable
  let result = 'DKIM-Signature: '
  let count = 0
  for (let i in header) {
    if (count >= 2) {
      result += `${header[i]};\r\n${i < header.length ? '\t' : ''}`
      count = 0
    } else {
      result += `${header[i]}; `
      count++
    }
  }
  return result
}

/*
 * @license
 * ISC License (ISC). Copyright 2020 https://www.npmjs.com/~skywa04885
 * https://www.npmjs.com/package/fannst-nodemailer
 */

/**
 * Generates a signature.
 * @param {string} headers The headers string
 * @param {!_email.Dkim} dkim
 * @param {string} body
 */
export default function generate(headers, dkim, body) {
  // == Prepares the body
  const cb = canonicalizeBody(body)
  const bodyHash = hashBody(cb)
  // == Builds the header
  return buildDkimHeader(headers, dkim, bodyHash)
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').Dkim} _email.Dkim
 */