import test from 'brittle'
import Corestore from 'corestore'
import process from 'bare-process'
import b4a from 'b4a'
import RAM from 'random-access-memory'

test('check if a corestore is not writtable', async function (t) {
  const store = new Corestore('./reader-storage')
  const core = store.get({ key: b4a.from(process.argv[2].substring(2, process.argv[2].length), 'hex') })
  await core.ready()
  store.close()
  t.is(core.writable, false)
  core.close()
})

test('does finding peers gives timeout', async function (t) {
  const store = new Corestore('./reader-storage')
  const core = store.get({ key: b4a.from(process.argv[2].substring(2, process.argv[2].length), 'hex') })
  await core.ready()
  const peers = t.test('find all peers')
  peers.plan(1)
  const foundPeers = store.findingPeers()
  store.close()
  setTimeout(() => peers.ok(foundPeers), 1000)
  core.close()
})

test('basic get with hex key', async function (t) {
  const store = new Corestore(RAM)
  const hexKey = 'a'.repeat(64)

  const core = store.get(hexKey)
  await core.ready()
  t.is(b4a.toString(core.key, 'hex'), hexKey)
})

test('basic get with with explicit hex key', async function (t) {
  const store = new Corestore(RAM)
  const hexKey = 'a'.repeat(64)

  const core = store.get({ key: hexKey })
  await core.ready()
  t.is(b4a.toString(core.key, 'hex'), hexKey)
})

test('storage locking', async function (t) {
  const store1 = new Corestore('./reader-storage')
  store1.ready()
  const store2 = new Corestore('./reader-storage')
  try {
    await store2.ready()
    t.fail('dir should have been locked')
  } catch {
    t.pass('dir was locked')
  }

  await store1.close()
})

test('session get after closing it', async function (t) {
  const store = new Corestore('./reader-storage')

  const session = store.session()
  await session.close()

  try {
    session.get({ key: b4a.from(process.argv[2].substring(2, process.argv[2].length), 'hex') })
    t.fail('Should have failed')
  } catch (err) {
    t.is(err.message, 'The corestore is closed')
  }

  await store.close()
})
