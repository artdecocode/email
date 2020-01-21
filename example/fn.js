import email from '../src'
import dotEnv from '@demimonde/dotenv'
dotEnv()

export default async () => {
  const mail = await email({
    from: 'Akashic <no-reply@akashic.page>',
    to: 'Art Deco <artdecocode@protonmail.com>',
    subject: 'Hello World',
  }, {
    html: 'HTML <span style="color:red">text</span>',
    text: 'text',
  }, {
    smtpHost: 'mail.smtp2go.com',
    smtpPort: 2525,
  })
  return mail
}