'use strict';

const tm = require('../lib');
const pid = process.pid;

const proc = tm.proc;

// *** IMPORTANT!!! ***
// after every operation 
// `proc.clear` should be called 
// to clear history data prevent memory leak

// the way of callback
proc.cb_stat(pid, function(err, value){
	console.log('cb err', err);
	console.log('cb value', value);
	proc.clear([pid]);
});

// the way of promise
Promise.resolve()
.then(() => proc.p_stat(pid))
.then((r) => console.log('promise', r))
.then(() => proc.clear([pid]))
.catch((e) => console.error(e));

// multi pid usage
Promise.resolve()
.then(() => proc.p_stats([pid, pid]))
.then((r) => console.log('multi-pid', r))
.then(() => proc.clear([pid, pid]))
.catch((e) => console.error(e));

// format process stat
proc.cb_stat(pid, function(err, value){
	console.log('cb formated err', err);
	console.log('cb formated value', proc.format(value));
	proc.clear([pid]);
});