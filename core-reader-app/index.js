import Hyperswarm from 'hyperswarm'
import Corestore from 'corestore'
import b4a from 'b4a'

import { Node } from 'hyperbee/lib/messages.js'

const store = new Corestore('./reader-storage')

const swarm = new Hyperswarm()
Pear.teardown(() => swarm.destroy())

swarm.on('connection', conn => store.replicate(conn))
console.log(process.argv[2])
// // create or get the hypercore using the public key supplied as command-line argument
// const core = store.get({ key: b4a.from(process.argv[2], 'hex') })
// // wait till the properties of the hypercore instance are initialized
// await core.ready()

// const foundPeers = store.findingPeers()
// // join a topic
// swarm.join(core.discoveryKey)
// swarm.flush().then(() => foundPeers())

// // update the meta-data information of the hypercore instance
// await core.update()

// const seq = core.length - 1
// const lastBlock = await core.get(core.length - 1)

// // print the information about the last block or the latest block of the hypercore instance
// console.log(`Raw Block ${seq}:`, lastBlock)
// console.log(`Decoded Block ${seq}`, Node.decode(lastBlock))