var WORKERS = 10;
var jsSpark = require('js-spark')({workers: WORKERS});
var task = jsSpark.jsSpark;
var q = jsSpark.q;
var _ = require('lodash');
var gol = require('./gol')(task, _);

var canvas = require('clivas');

var frame = 0;

function draw(data, time) {
    canvas.clear();
    canvas.line('This is part of the world, time to compute iteration: {red:' + time + '}' + ' ms    Workers: {green:' + WORKERS + '}');
    canvas.line(data);
}

draw(_.times(100, gol.getPartOfWorld)[0], 'wait for it...');

//console.log('initial\n', gol.getSpinner(), '\n');
//console.log('\nn+1\n', gol.calc(gol.getSpinner()), '\n');

//console.log('initial\n', gol.getPartOfWorld(), '\n');
//console.log('\nn+1\n', gol.calc(gol.getPartOfWorld()), '\n');

//console.log(_.times(2, gol.getPartOfWorld).join(''));

var todos;

function nextWorld(world) {
    var then = new Date();
    todos = world
        .map(task)
        .map(function (task) {
            return task
                .thru(gol.calc)
                .run({times: 2});
        });

    q.all(todos)
        .then(function (data) {
            world = data;
            draw(data[0].split('\n')[0], new Date() - then);

            // recursive
            nextWorld(data);
        });
}

// start from bigger world
nextWorld(_.range(100).map(function () {
    return _.times(100, gol.getPartOfWorld).join('');
}));





