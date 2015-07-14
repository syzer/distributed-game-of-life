#WAT

Run your js in multithreaded!. Harness up to 100% CPU power.
GOL done in distributed manner,


#HOW

Install node and npm, node-gyp, bower and git,
then:

`npm i --save gol`
`npm start`
and wait till 10 workers will do the job

change first line of `index.js` to use 2 workers
and observe that it takes twice more time to calculate the world

##Benchmark of calculations
of game of life

```
10 workes
vs 100times x 2xrecalculate x 100xpartsOfWolrd
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

## speedup
generally on 4 actual cores one can expect speedup of 3.9 times


#HOW

Change first line from 10 to 2 workers and run the script

you know the `drill`

```
    git clone
    cd
    npm install
    node index.js
```
