# @artdeco/email

[![npm version](https://badge.fury.io/js/%40artdeco%2Femail.svg)](https://www.npmjs.com/package/@artdeco/email)

`@artdeco/email` Sends e-mails by direct connection to recipient's SMTP server with authorisation and TLS upgrade support to encrypt messages. You can use this for relay services also, such as https://www.smtp2go.com.

```sh
yarn add @artdeco/email
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [How Does It Work](#how-does-it-work)
- [API](#api)
- [`async email(mail: !Mail, data: { html: string, text: string }, config: !Config): void`](#async-emailmail-maildata--html-string-text-string-config-config-void)
  * [`Mail`](#type-mail)
  * [`Config`](#type-config)
  * [`Dkim`](#type-dkim)
- [Copyright & License](#copyright--license)

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/0.svg?sanitize=true">
</a></p>

## How Does It Work

You don't need to operate your own SMTP server to send messages: given an email address, you can resolve the MX server of the domain via DNS lookup, and connect to it directly. This package includes an SMTP client that will establish a socket connection, perform TLS upgrade, and authenticate users when necessary (see the bottom of the page for SMTP protocol commands link). After the connection is established, you can just send formatted message.

However, due to spam, most hosting providers such as Azure, _etc_ will block port 25 so you won't be able to do that. That's why there are many online services that allow to send messages via so-called relay services via additional ports like 2525. They usually provide an HTTP API as well, but this package has a standard SMTP client. A relay business-model is to maintain high reputation of their servers so that all messages will be delivered. Although there's only a limited number of free messages that can be sent per month, there's pretty much no alternative nowadays for production transactional emails therefore you just have to go with that.

On the other hand, you might be able to use [Gmail's SMTP server](https://kinsta.com/knowledgebase/free-smtp-server/) if you are a Google Apps customer.

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/1.svg?sanitize=true">
</a></p>

## API

The package is available by importing its default function:

```js
import email from '@artdeco/email'
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/2.svg?sanitize=true">
</a></p>

## <code>async <ins>email</ins>(</code><sub><br/>&nbsp;&nbsp;`mail: !Mail,`<br/>&nbsp;&nbsp;`data: { html: string, text: string },`<br/>&nbsp;&nbsp;`config: !Config,`<br/></sub><code>): <i>void</i></code>
Send e-mails by direct connection to recipient's SMTP server.
You will most probably want to use a relay SMTP server, as most cloud server providers (Azure, Alibaba) block port 25 for direct connections.

 - <kbd><strong>mail*</strong></kbd> <em><code><a href="#type-mail" title="The email object with information about the message.">!Mail</a></code></em>: The mail to send.
 - <kbd><strong>data*</strong></kbd> <em>`{ html: string, text: string }`</em>: The data.
 - <kbd><strong>config*</strong></kbd> <em><code><a href="#type-config" title="Options for the program.">!Config</a></code></em>: The config.

__<a name="type-mail">`Mail`</a>__: The email object with information about the message.


|   Name    |                   Type                    |                        Description                         |
| --------- | ----------------------------------------- | ---------------------------------------------------------- |
| __from*__ | <em>string</em>                           | The FROM field, e.g., `Hello World <hello@world.com>`.     |
| __to*__   | <em>string</em>                           | The TO field, e.g., `Foo Bar <foo@bar.co>`.                |
| cc        | <em>(string \| !Array&lt;string&gt;)</em> | Carbon copy the message to these recipients.               |
| bcc       | <em>string</em>                           | Blind carbon copy (without revealing) to these recipients. |
| subject   | <em>string</em>                           | The email subject.                                         |


__<a name="type-config">`Config`</a>__: Options for the program.


|   Name   |                                                                 Type                                                                  |                       Description                       | Default |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------- |
| dkim     | <em><a href="#type-dkim" title="DKIM information for signing messages. If you use a relay, this will not be required.">!Dkim</a></em> | DKIM configuration for signing emails.                  | -       |
| silent   | <em>boolean</em>                                                                                                                      | Disable printing to console.                            | `false` |
| smtpHost | <em>string</em>                                                                                                                       | SMTP host to connect to (e.g., an email relay service). | -       |
| smtpPort | <em>string</em>                                                                                                                       | The port to connect to SMTP server.                     | -       |
| user     | <em>string</em>                                                                                                                       | The username to use for login.                          | -       |
| pass     | <em>string</em>                                                                                                                       | The password for login.                                 | -       |


__<a name="type-dkim">`Dkim`</a>__: DKIM information for signing messages. If you use a relay, this will not be required.


|      Name       |      Type       |                                   Description                                    | Default |
| --------------- | --------------- | -------------------------------------------------------------------------------- | ------- |
| __privateKey*__ | <em>string</em> | The private key.                                                                 | -       |
| keySelector     | <em>string</em> | The selector.                                                                    | `dkim`  |
| domain          | <em>string</em> | The domain. This will be deducted from your email host from the `mail.to` field. | -       |

When `html` and `text` are set, the `multipart/alternative` MIME type is set on the message that contains both representations. If only text is set, it will be sent without a MIME type. There's no way to currently add attachments.

```js
import email from '@artdeco/email'
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
    user: process.env.SMTP2GO_USER,
    pass: process.env.SMTP2GO_PASSWORD,
  })
  return mail
}
```
```
MX connection created:  mail.smtp2go.com
recv protonmail.com > 220 mail.smtp2go.com ESMTP Exim 4.92-S2G Tue, 21 Jan 2020 21:03:56 +0000
send protonmail.com > EHLO akashic.page
recv protonmail.com >
recv protonmail.com > 250-mail.smtp2go.com Hello akashic.page [8.208.77.44]
recv protonmail.com > 250-SIZE 52428800
recv protonmail.com > 250-8BITMIME
recv protonmail.com > 250-DSN
recv protonmail.com > 250-PIPELINING
recv protonmail.com > 250-AUTH CRAM-MD5 PLAIN LOGIN
recv protonmail.com > 250-CHUNKING
recv protonmail.com > 250-STARTTLS
recv protonmail.com > 250-PRDR
recv protonmail.com > 250 HELP
send protonmail.com > STARTTLS
recv protonmail.com >
recv protonmail.com > 220 TLS go ahead
send protonmail.com > EHLO akashic.page
recv protonmail.com >
recv protonmail.com > 250-mail.smtp2go.com Hello akashic.page [8.208.77.44]
recv protonmail.com > 250-SIZE 52428800
recv protonmail.com > 250-8BITMIME
recv protonmail.com > 250-DSN
recv protonmail.com > 250-PIPELINING
recv protonmail.com > 250-AUTH CRAM-MD5 PLAIN LOGIN
recv protonmail.com > 250-CHUNKING
recv protonmail.com > 250-PRDR
recv protonmail.com > 250 HELP
send protonmail.com > MAIL FROM:<no-reply@akashic.page>
recv protonmail.com >
recv protonmail.com > 250 OK
send protonmail.com > RCPT TO:<artdecocode@protonmail.com>
recv protonmail.com >
recv protonmail.com > 250 Accepted <artdecocode@protonmail.com>
send protonmail.com > DATA
recv protonmail.com >
recv protonmail.com > 354 Enter message, ending with "." on a line by itself
send protonmail.com > Subject: Hello World
From: Akashic <no-reply@akashic.page>
To: Art Deco <artdecocode@protonmail.com>
Date: Tue, 21 Jan 2020 21:03:56 GMT
MIME-Version: 1.0
Message-ID: <45fc1664c17fc9a703e6b5d5302ab5632f4bec7b8cbc384e_1579640636645@akashic.page>
Content-Type: multipart/alternative; boundary=----e07b67289b0d805a68a96f108df443e8
X-Service: @artdeco/email

------e07b67289b0d805a68a96f108df443e8
Content-Type: text/html; charset=utf-8
Content-Transfer-Encoding: quoted-printable

HTML <span style="color:red">text</span>
------e07b67289b0d805a68a96f108df443e8
Content-Type: text/plain; charset=utf-8

text

------e07b67289b0d805a68a96f108df443e8--
send protonmail.com >
send protonmail.com > .
recv protonmail.com >
recv protonmail.com > 250 OK id=1iu0go-4Xa8vO-Qa
send protonmail.com > QUIT
recv protonmail.com >
recv protonmail.com > 221 mail.smtp2go.com closing connection
recv protonmail.com >
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/3.svg?sanitize=true">
</a></p>

## Copyright & License

- [SMTP commands reference](https://www.samlogic.net/articles/smtp-commands-reference.htm)

GNU Affero General Public License v3.0

Original work on the SMTP client from [node-sendmail](https://github.com/guileen/node-sendmail) by GreenPioneer, NGTmeaty and others under MIT license. Email formatting and DKIM support from [fannst-nodemailer](http://npmjs.com/package/fannst-nodemailer) by Luke Rieff under ISC license.


<table>
  <tr>
    <td><img src="https://avatars3.githubusercontent.com/u/38815725?v=4&amp;s=100" alt="artdecocode"></td>
    <td>© <a href="https://www.artd.eco">Art Deco</a> 2020</td>
  </tr>
</table>

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/-1.svg?sanitize=true">
</a></p>