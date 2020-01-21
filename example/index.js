import email from '../src'

(async () => {
  const res = await email({
    text: 'example',
  })
  console.log(res)
})()