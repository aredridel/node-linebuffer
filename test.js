var test = require('tap').test;
var linebuffer = require('./');

test('Test without trailing newline', function (t) {
    var lb = new linebuffer({encoding: 'utf8'});

    var chunks = [];
    lb.on('data', function(chunk) {
        chunks.push(chunk);
    });

    lb.on('end', function () {
        t.is(chunks.length, 3, "Got 3 chunks");
        t.is(chunks[0], "this is so beautiful", "first chunk intact");
        t.is(chunks[1], "what does it all mean?", "second chunk intact");
        t.is(chunks[2], " I'm so happy!", "third chunk intact");
        t.end();
    })

    lb.write("this is so beautiful\nwhat does it al");
    lb.write("l mean?\r\n I'm so happy!");
    lb.end();
});

test('Test with trailing line end', function (t) {
    var lb = new linebuffer({encoding: 'utf8'});

    var chunks = [];
    lb.on('data', function(chunk) {
        chunks.push(chunk);
    });

    lb.on('end', function () {
        t.is(chunks.length, 3, "Got 3 chunks");
        t.is(chunks[0], "this is so beautiful", "first chunk intact");
        t.is(chunks[1], "what does it all mean?", "second chunk intact");
        t.is(chunks[2], " I'm so happy!", "third chunk intact");
        t.end();
    })

    lb.write("this is so beautiful\nwhat does it al");
    lb.write("l mean?\r\n I'm so happy!");
    lb.end();
});


test('Test empty lines', function (t) {
    var lb = new linebuffer({encoding: 'utf8'});

    var chunks = [];
    lb.on('data', function(chunk) {
        chunks.push(chunk);
    });

    lb.on('end', function () {
        t.is(chunks.length, 3, "Got 3 chunks");
        t.is(chunks[0], "Hello", "first chunk intact");
        t.is(chunks[1], "", "second chunk empty");
        t.is(chunks[2], "world", "third chunk intact");
        t.end();
    })

    lb.write("Hello\n\n");
    lb.write("world");
    lb.end();
});

