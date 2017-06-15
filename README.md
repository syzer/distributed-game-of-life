#WAT

[![Greenkeeper badge](https://badges.greenkeeper.io/syzer/distributed-game-of-life.svg)](https://greenkeeper.io/)

JS implementation of all time favorite game of life.
Game Of Life -> link

Run your game of life on multicore.

... wait what?..... js multicore?.. what madness is that?

YES. that's right:
Run your js in multithreaded!. Harness up to 100% CPU power.

**Simply**
GOL done in distributed manner.


#HOW

Install node and npm, node-gyp, bower and git,
then:

`npm i --save gol`
`npm start`
and wait till other thread(s) will do the job

Then change first line of `index.js` to use 2 or even 10 workers/threads,
and observe how much time to calculate whole game changes.


##Benchmark of calculations
of game of life

```
10 workers (threads)
vs 100times x 2x recalculate x 100xpartsOfWolrd
1: 6617ms
1: 5957ms
1: 5870ms
```

```
1 worker (single thread)
vs 100times x 2xrecalculate x 100xpartsOfWolrd
1: 22223ms
1: 23846ms
1: 24604ms
```

## speedup / 'does it scale?'
Generally on 4 actual cores one can expect speedup of 3.9 times
So short answer... yes it does.

## 'but its so slow?'

1. If my math is right we only display 1 millionth part of world.
2. You can always write mote effective GOL, and then run it multicore.
3. If you do.. remember to Pull Request me, so otheres can enjoy.

#HOW

Change first line from 1 to 2 or even 10 workers and run the script.
Observe how the speed of world generation changes....
***Isn't that exiting?***
If you feel particularly adventurous, you might even go for 50 threads.
Do not worry.. they are quite light weight.

Installation:
you know the `drill`....

```
    git clone
    cd
    npm install
    node index.js
```

# Documentation

`cat docs/multicore_all_things.txt`

tested on mac & windows

Need volunteer to run it in Linux!
