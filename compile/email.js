#!/usr/bin/env node
             
const net = require('net');
const dns = require('dns');
const os = require('os');
const _crypto = require('crypto');
const tls = require('tls');             const C=net.createConnection;const D=dns.resolveMx;const G=(a,b=0,e=!1)=>{if(0===b&&!e)return a;a=a.split("\n",e?b+1:void 0);return e?a[a.length-1]:a.slice(b).join("\n")},H=(a,b=!1)=>G(a,2+(b?1:0)),I=a=>{({callee:{caller:a}}=a);return a};const J=os.homedir;const K=/\s+at.*(?:\(|\s)(.*)\)?/,L=/^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/,M=J(),N=a=>{const {pretty:b=!1,ignoredModules:e=["pirates"]}={},d=new RegExp(L.source.replace("IGNORED_MODULES",e.join("|")));return a.replace(/\\/g,"/").split("\n").filter(c=>{c=c.match(K);if(null===c||!c[1])return!0;c=c[1];return c.includes(".app/Contents/Resources/electron.asar")||c.includes(".app/Contents/Resources/default_app.asar")?!1:!d.test(c)}).filter(c=>
c.trim()).map(c=>b?c.replace(K,(f,m)=>f.replace(m,m.replace(M,"~"))):c).join("\n")};function R(a,b,e=!1){return function(d){var c=I(arguments),{stack:f}=Error();const m=G(f,2,!0),k=(f=d instanceof Error)?d.message:d;c=[`Error: ${k}`,...null!==c&&a===c||e?[b]:[m,b]].join("\n");c=N(c);return Object.assign(f?d:Error(),{message:k,stack:c})}};function S(a){var {stack:b}=Error();const e=I(arguments);b=H(b,a);return R(e,b,a)};function T(a,b){if(b>a-2)throw Error("Function does not accept that many arguments.");}async function U(a,b,e){const d=S(!0);if("function"!==typeof a)throw Error("Function must be passed.");const c=a.length;if(!c)throw Error("Function does not accept any arguments.");return await new Promise((f,m)=>{const k=(l,h)=>l?(l=d(l),m(l)):f(e||h);let g=[k];Array.isArray(b)?(b.forEach((l,h)=>{T(c,h)}),g=[...b,k]):1<Array.from(arguments).length&&(T(c,0),g=[b,k]);a(...g)})};function V(a){return(a=/[^@]+@([\w\d\-.]+)/.exec(a))&&a[1]}function aa(a){return a.reduce((b,e)=>{const d=V(e);b[d]=b[d]||[];b[d].push(e);return b},{})}
async function ba(a,{b,smtpHost:e,smtpPort:d,c,a:f}){if(-1==b){var m=async function(l){const h=g[l];if(!h)throw Error("Cannot connect to any SMTP server");try{return await new Promise((n,v)=>{try{const u=C(d,h.exchange,()=>{c.debug("MX connection created: ",h.exchange);n(u)})}catch(u){v(u)}})}catch(n){return await m(++l)}};let g;e?g=[{exchange:e}]:(g=await U(D,a),g.sort((l,h)=>l.priority-h.priority),c.debug("mx resolved: ",g));if(!g||!g.length)throw Error(`Cannot resolve Mx of <${a}>`);return await m(0)}const k=
C(b,f);return await new Promise((g,l)=>{k.on("error",h=>{l(Error('Error on connectMx (development) for "'+f+":"+b+'": '+h))});k.on("connect",()=>{c.debug("MX (development) connection created: "+f+":"+b);k.removeAllListeners("error");g(k)})})}function W(a){return a.replace(/^.+</,"").replace(/>\s*$/,"").trim()}function X(a){Array.isArray(a)||(a=a.split(","));return a.map(W)};const ca=_crypto.createHash,da=_crypto.createSign,Y=_crypto.randomBytes;var ea=["from","to","subject","date"],fa=/\s{1,}/g,ha=/\s+$/g;function ia(a,b){const e=da("RSA-SHA256");e.update(a);return e.sign(b,"base64")}function ja(a){a=a.split("\r\n").map(b=>{const [e,d]=b.split(": ");return{name:e,value:d}}).filter(({name:b})=>ea.includes(b.toLowerCase()));return{headers:a,h:a.map(({name:b})=>b.toLowerCase()).join(":"),g:a.map(({name:b,value:e})=>`${b.toLowerCase()}:${e}`).join("\n")+"\r\n"}}
function ka(a,b,e){a=ja(a);const d=["v=1","a=rsa-sha256","c=relaxed/relaxed","q=dns/txt",`d=${b.domain}`,`s=${b.keySelector}`,`h=${a.h}`,`t=${Date.now()}`,`x=${Date.now()+999999}`,`z=${a.headers.map(({name:m,value:k})=>`${m}:${k}`).join("|")}`,`bh=${e}`,"b="];b=ia(`dkim${a.g}}`,b.privateKey);d.push(`b=${b}`);let c="DKIM-Signature: ",f=0;d.forEach((m,k)=>{2<=f?(c+=`${m};\r\n${k<d.length?"\t":""}`,f=0):(c+=`${m}; `,f++)});return c};function la(a="unknown.host"){return`<${Y(24).toString("hex")}_${Date.now()}@${a}>`}
function ma(a,b,e,d,c,f={privateKey:null,keySelector:null,domain:null},{headers:m={"X-Service":"@artdeco/email"},host:k}={}){var g=`----${Y(16).toString("hex")}`;let l="";var h=!!d;a={Subject:e,From:a,To:b,Date:(new Date).toUTCString(),"MIME-Version":"1.0","Message-ID":la(k),...h?{"Content-Type":`multipart/alternative; boundary=${g}`}:{},...m};for(var n in a)l+=`${n}: ${a[n]}${"\r\n"}`;n="";h?(h=[],d&&h.push(["Content-Type: text/html; charset=utf-8\r\nContent-Transfer-Encoding: quoted-printable\r\n",d].join("\r\n")),
c&&(d=["Content-Type: text/plain; charset=utf-8\r\n",c.replace(/\n/g,"\r\n")],h.push(d.join("\r\n"))),n=n+`--${g}${"\r\n"}`+h.join(`${"\r\n"}--${g}${"\r\n"}`),n+=`${"\r\n"}${"\r\n"}--${g}--`):c&&(n+=c.replace(/\n/g,"\r\n"));f.domain&&f.keySelector&&f.privateKey&&(g=l,d=n.replace(fa," ").replace(ha,""),c=ca("SHA256"),c.update(d),d=c.digest("hex"),f=ka(g,f,d),l+=f);return l+"\r\n"+n};const na=tls.connect;/*
 {MIT} https://github.com/guileen/node-sendmail/
*/
async function oa(a,b,e,d,c,{c:f,rejectUnauthorized:m,f:k,a:g,b:l,smtpHost:h,smtpPort:n,user:v,pass:u}){let p=await ba(a,{c:f,a:g,b:l,smtpHost:h,smtpPort:n});const t=w=>{f.debug("send %s > %s",a,w);p.write(w+"\r\n")};p.setEncoding("utf8");let A="",x=0,y=0,z="";const O=[...v&&u?["AUTH LOGIN"]:[],`MAIL FROM:<${e}>`,...d.map(w=>`RCPT TO:<${w}>`),"DATA","QUIT",""],pa=v&&u?[(new Buffer(v)).toString("base64"),(new Buffer(u)).toString("base64")]:[];let E,B=!1,F;try{return await new Promise((w,P)=>{function qa(q,
r){switch(q){case 220:if("in-progress"==B){p.removeAllListeners("data");F=p;F.pause();p=na({socket:p,rejectUnauthorized:m},()=>{p.on("data",Q);p.removeAllListeners("close");p.removeAllListeners("end")});p.on("error",ra=>{f.error("Error on connectMx for: ",ra)});F.resume();B=!0;t(`EHLO ${b}`);break}/\besmtp\b/i.test(r)||k?E="EHLO":(B=!0,E="HELO");t(`${E} ${b}`);break;case 221:w(r);break;case 235:case 250:if(!B){/\bSTARTTLS\b/i.test(r)?(t("STARTTLS"),B="in-progress"):B=!0;break}case 251:x==O.length-
1&&(f.info("OK: %s %s",q,r),w(r));t(O[x]);x++;break;case 354:t(c);t("");t(".");break;case 334:t(pa[y]);y++;break;default:400<=q&&(f.warn("SMTP responds error code %s",q),P(Error(`SMTP code: ${q} msg: ${r}`)))}}const Q=q=>{A+=q;q=A.split("\r\n");q.forEach(r=>{f.debug("recv %s > %s",a,r);z+=r+"\r\n";" "==r[3]&&(qa(parseInt(r.substr(0,3),10),z),z="")});A=q[q.length-1]};p.on("data",Q);p.on("error",q=>{f.error("Fail to connect %s",a);P(q)})})}finally{p.removeAllListeners("data"),p.end()}};function Z(){};/*

 @artdeco/email: SMTP client to send email with TLS, DKIM and auth support.

 Copyright (C) 2020  Art Deco

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
module.exports={_email:async function(a,{html:b,text:e},d={}){const {silent:c=!1,c:f=c?{debug:Z,info:Z,warn:Z,error:Z}:{debug:console.log,info:console.info,warn:console.warn,error:console.error},dkim:{privateKey:m,keySelector:k="dkim"}={},b:g=-1,a:l="localhost",smtpPort:h=25,smtpHost:n=-1,rejectUnauthorized:v,f:u,user:p,pass:t}=d;d=[];a.to&&d.push(...X(a.to));a.cc&&d.push(...X(a.cc));a.bcc&&d.push(...X(a.bcc));d=aa(d);const A=W(a.from),x=V(A);a=ma(a.from,a.to,a.subject,b,e,{domain:x,keySelector:k,
privateKey:m},{host:x});b={};for(let y in d){e=d[y];try{const z=await oa(y,x,A,e,a,{c:f,rejectUnauthorized:v,f:u,a:l,b:g,smtpHost:n,smtpPort:h,user:p,pass:t});b[y]=z}catch(z){b[y]=z}}return b}};

//# sourceMappingURL=email.js.map