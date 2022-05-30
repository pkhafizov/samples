import { EventEmitter } from 'events'

const ticker = (num,count,cb) => {
    const eventEmitter = new EventEmitter()
    const tmstmp = Date.now()    
    setTimeout(() => {
        if (num > 0) {
            count++
            tmstmp % 5 === 0 ? eventEmitter.emit('tick',num) : eventEmitter.emit('error') && cb(new Error('Error'))
            ticker(num - 50,count,cb)
            .on('tick',(num) => {
                console.log(num)
            }).on('error',() => {
                console.log('error')
            })
        } else {
            cb(null,count)
        }
    },50)
    return eventEmitter
}

ticker(1000,0,(err, count) => {
    if (err) {
        console.log('error')
    } else
    console.log(`done ${count}`)
}).on('tick',(num) => {
    console.log(num)
}).on('error',() => {
    console.log('error')
})