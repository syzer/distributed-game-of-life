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
    canvas.line('This is part of the world, time to compute iteration: {red:' + time + '}' + ' ms' +
        '  Workers: {green:' + WORKERS + '}, Generation: {green:'+ frame +'}');
    canvas.line(data);
    canvas.cursor(true);
    frame++;
}

draw(_.times(100, gol.getPartOfWorld)[0], '0');

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
            draw(_.take(data[0].split('\n'), 10).join('\n'),
                new Date() - then
            );

            // recursive
            nextWorld(data);
        });
}

// start from bigger world
nextWorld(_.range(100).map(function () {
    return _.times(100, gol.getPartOfWorld).join('');
}));





