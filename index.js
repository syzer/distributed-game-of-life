var jsSpark = require('js-spark')({workers: 1});
var task = jsSpark.jsSpark;
var q = jsSpark.q;
var _ = require('lodash');
var gol = require('./gol')(task, _);


var todos = [];
console.log(gol.test());
task([gol.getSpinner()]).thru(console.log).run().then(function(data){
    console.log('done', data);
});

function giveMeNiccerResponce(str) {
    return "THIS IS NICCER RESPONSE " + str + ' seriusly!';
}

// example with one job
//task([20, 30, 40, 50])
//    // this is executed on client side
//    .map(function addOne(num) {
//        return num + 1;
//    })
//    .filter(function isBiggerThen35(el) {
//        return 35 <= el;
//    })
//    .reduce(function sumUp(sum, num) {
//        return sum + num;
//    })
//    .thru(giveMeNiccerResponce)
//    .run()
//    .then(function (data) {
//        // this is executed on back on server
//        console.log(data);
//    });


//q.all(texts.map(function (el) {
//    return task(el)
//        .thru(bigramText)
//        .run()


//function mergeBig(texts) {
//    return q.all(texts.map(function (el) {
//        return task(el)
//            .thru(bigramText)
//            .run()
//    })).then(function reducer(data) {
//        //return _.mergeObjectsInArr(data);     // uncomment if u want to reduce on this worker
//        return task(data)
//            .thru(merger)
//            .run();
//    }).then(function cacheInDb(data) {
//        dataBase = data;
//        return data;
//    });
//}
//
//function merger(arr) {
//    var _ = this;
//
//    function mergeObjectsInArr(arr) {
//        return arr.reduce(function (acc, curr) {
//            return _.merge(acc, curr, objectMerger);
//        });
//    }
//
//    function objectMerger(a, b) {
//        if (a && b && _.isNumber(a) && _.isNumber(b)) {
//            return a + b;
//        }
//        if (_.isArray(a)) {
//            return a.concat(b);
//        }
//    }
//
//    return mergeObjectsInArr(arr);
//};
//
