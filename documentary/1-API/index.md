## API

The package is available by importing its default function:

```js
import email from '@artdeco/email'
```

%~%

<typedef method="email">types/api.xml</typedef>

<typedef>types/index.xml</typedef>

When `html` and `text` are set, the `multipart/alternative` MIME type is set on the message that contains both representations. If only text is set, it will be sent without a MIME type. There's no way to currently add attachments.

%EXAMPLE: example/fn, ../src => @artdeco/email%
<!-- %FORK example% -->

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

%~%