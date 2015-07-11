module.exports = function gol(jsSpark, _) {
    'use strict';

    var LIVE = '*';
    var DEAD = '.';

    return {
        test: test,
        getSpinner: getSpinner,
        calc: runAll
    };

    function calc(data) {
        console.log('hey', data);
    }

    function test() {
        console.warn(runAll(getSpinner()));
        return jsSpark(runAll(getSpinner()))
            .thru(calc)
            .run()
            .then(function (data) {
                console.warn('all done', data);
            })
            .catch(function (error) {
                console.error(error);
            })
    }

    function getSpinner() {
        return [
            '......',
            '..*...',
            '..*...',
            '..*...'
        ].join('\n');
    }

    function getPartOfWorld() {
        return [
            '.....................................................................*............................................................',
            '.............................................................*.*...*..............................................................',
            '..................................................................................................................................',
            '..............................................................*.*....*............................................................',
            '.............................................................*..*...*.............................................................',
            '.....................................................................*............................................................',
            '..................................................................................................................................',
            '.................................................................*..*.............................................................',
            '.............................................................*....*...............................................................',
            '.................................................................**...............................................................'
        ].join('\n');
    }

    function getNeibours(i, m, data) {
        return [
            1 === (i + 1) % m ? null : data[i - m - 1],
            data[i - m],
            0 === (i + 1) % m ? null : data[i - m + 1],
            1 === (i + 1) % m ? null : data[i - 1],
            0 === (i + 1) % m ? null : data[i + 1],       // on right boundary
            1 === (i + 1) % m ? null : data[i + m - 1],  // LEFT BOUNDARY
            data[i + m],
            0 === (i + 1) % m ? null : data[i + m + 1]
        ];
    }

    function countLives(acc, curr) {
        return LIVE === curr ? acc + 1 : acc;
    }

    function countLiveNeibours(i, m, data) {
        return getNeibours(i, m, data)
            .reduce(countLives, 0);
    }

    function applyRules(cell, neibours) {
        if (neibours < 2 || neibours > 3) {
            return DEAD;
        }
        if (neibours > 2 && neibours < 3) {
            return cell;
        }
        if (3 === neibours) {
            return LIVE;
        }
        return cell;
    }

    function nextGen(boardSize) {
        return _(boardSize[0]).map(function (el, i) {
            return applyRules(el, countLiveNeibours(i, boardSize[1], boardSize[0]));
        });
    }

    // maybe recursive
    function nThGeneration(boardSize, nth) {
        nth = nth || 1;
        var i = 0;
        while (i < nth) {
            boardSize[0] = nextGen(boardSize).join('');
            i += 1;
        }
        return boardSize;
    }

    // hardcore
    function convertBack(array) {
        var m = array[1];
        return _(array[0])
            .reduce(function addEOL(acc, el, i) {
                if (0 === (i + 1) % m && i !== array[0].length - 1) {
                    return acc + el + '\n';
                }
                return acc + el;
            })
    }

    // return all cells
    function convertInput(lines) {
        var m = lines.indexOf('\n');
        return [lines.replace(/\n/gi, ''), m];
    }

    function runAll(input) {
        function prepare(lines) {
            return convertBack(nThGeneration(convertInput(lines)))
        }
        return prepare(input);
    }

    function run(input) {
        return readLines(input, prepare);
    }

    function readLines(input, lineCallback) {
        return input
            .split('\n')
            .map(function (line, i) {
                if ('' === line) {
                    return;
                }
                return lineCallback(line, i);
            })
            .join('\n');
    }

};
