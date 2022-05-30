import { EventEmitter } from 'events'

const ticker = (num,cb) => {
    const eventEmitter = new EventEmitter()
    const tmstmp = Date.now()
    setTimeout(() => {
        if (num > 0) {
            eventEmitter.emit('tick', num)
            ticker(num - 50,cb)
            .on('tick',(num) => {
                console.log(num)
            })
        } else {
            cb('done')
        }
    },50)
    return eventEmitter
}

ticker(10000,(done) => {
    console.log(done)
}).on('tick',(num) => {
    console.log(num)
})