module.exports = function test(WORKERS) {
    'use strict';

    var jsSpark = require('js-spark')({workers: WORKERS});
    var task = jsSpark.jsSpark;
    var q = jsSpark.q;
    var _ = require('lodash');
    var gol = require('./gol')(task, _);
    var canvas = require('clivas');
    var frame = 0;

    return {
        task: task,
        draw: draw,
        q: q,
        gol: gol,
        _: _
    };

    function draw(data, time) {
        canvas.clear();
        canvas.line('This is part of the world, time to compute iteration: {red:' + time + '}' + ' ms' +
            '  Workers: {green:' + WORKERS + '}, Generation: {green:'+ frame +'}');
        canvas.line(data);
        canvas.cursor(true);
        frame++;
    }
};
