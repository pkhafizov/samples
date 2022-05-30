const { EventEmitter } = require('events')
const { readFile } = require('fs')
class SampleProcessing extends EventEmitter {
  constructor() {
      super()
      this.files = []
  }
  addFile (file) {
    this.files.push(file)
    return this
  }
  processing() {
    this.emit('start', 'start')                  
    for (const file of this.files) {
      readFile(file, 'utf8', (err, content) => {
        if (err) {
          return this.emit('error', err)
        }
        this.emit('fileread','read')
      })
    }
    this.emit('end', 'end')
    return this
  }
}
const sampleProcessing = new SampleProcessing()
sampleProcessing
.addFile('fileA.txt')
.addFile('fileB.json')
.processing()
.on('start', (content) => console.log(content))
.on('fileread', (content) => console.log(content))
.on('end', (content) => console.log(content))
.on('error', err => console.error(`Error emitted ${err.message}`))