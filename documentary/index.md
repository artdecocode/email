# @artdeco/email

%NPM: @artdeco/email%

`@artdeco/email` Sends e-mails by direct connection to recipient's SMTP server with authorisation and TLS upgrade support to encrypt messages. You can use this for relay services also, such as https://www.smtp2go.com.

```sh
yarn add @artdeco/email
```

## Table Of Contents

%TOC%

%~%

## How Does It Work

You don't need to operate your own SMTP server to send messages: given an email address, you can resolve the MX server of the domain via DNS lookup, and connect to it directly. This package includes an SMTP client that will establish a socket connection, perform TLS upgrade, and authenticate users when necessary (see the bottom of the page for SMTP protocol commands link). After the connection is established, you can just send formatted message.

However, due to spam, most hosting providers such as Azure, _etc_ will block port 25 so you won't be able to do that. That's why there are many online services that allow to send messages via so-called relay services via additional ports like 2525. They usually provide an HTTP API as well, but this package has a standard SMTP client. A relay business-model is to maintain high reputation of their servers so that all messages will be delivered. Although there's only a limited number of free messages that can be sent per month, there's pretty much no alternative nowadays for production transactional emails therefore you just have to go with that.

On the other hand, you might be able to use [Gmail's SMTP server](https://kinsta.com/knowledgebase/free-smtp-server/) if you are a Google Apps customer.

%~%