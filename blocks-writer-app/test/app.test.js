import { test } from 'brittle'
import fsp from 'bare-fs/promises.js'

test('is dictionary key and value strings', async function (t) {
    const dict = JSON.parse(await fsp.readFile('./dict.json'))
    for (const { key, value } of dict) {
        t.is(typeof (key), 'string')
        t.is(typeof (value), 'string')
    }
})


