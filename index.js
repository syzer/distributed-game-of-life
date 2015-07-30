var threads = 10;

var helper = require('./helper')(threads);
var draw = helper.draw;
var q = helper.q;
var task = helper.task;
var gol = helper.gol;
var _ = helper._;

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





