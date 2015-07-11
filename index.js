var jsSpark = require('js-spark')({workers: 1});
var task = jsSpark.jsSpark;
var q = jsSpark.q;
var _ = require('lodash');
var gol = require('./gol')(task, _);

console.log('initial\n', gol.getSpinner(), '\n');
//console.log('\nn+1\n', gol.calc(gol.getSpinner()), '\n');

//console.log('initial\n', gol.getPartOfWorld(), '\n');
//console.log('\nn+1\n', gol.calc(gol.getPartOfWorld()), '\n');

var todos = _.range(100)
    .map(gol.getSpinner)
    .map(task)
    .map(function (task) {
        return task
            .thru(gol.calc)
            .run();
    });

q.all(todos).then(function (data) {
    console.log('all done', data[0]);
});
