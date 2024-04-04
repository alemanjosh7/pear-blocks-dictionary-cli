import { test, solo, skip, todo, configure } from 'brittle'

test('asynchronous', async function (t) {
  await new Promise(r => setTimeout(r, 10000))
  t.pass()
})

test('basic', function (t) {
  t.is(typeof Date.now(), 'number')
  t.not(typeof Date.now(), 'string')

  t.ok(Date.now() > 0)
  t.absent(null)

  t.comment('text')

  t.alike({ a: 1 }, { a: 1 })
  t.unlike({ a: 2 }, { a: 3 })

  t.pass()
  t.fail()
})