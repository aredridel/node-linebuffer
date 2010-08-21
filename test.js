var linebuffer = require('linebuffer')

var lb = new linebuffer.LineBuffer()

lb.on('data', function(data) {
	console.log("Line: " + data)
})

lb.setEncoding('utf-8')

lb.write("this is so beautiful\nwhat does it al")
lb.write("l mean?\r\n I'm so happy!")
lb.end()
