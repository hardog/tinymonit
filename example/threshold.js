'use strict';

const tm = require('../lib');
const pid = process.pid;

const osstat = tm.osstat;
const alarm = tm.alarm;

Promise.resolve()
// .then(() => osstat(pid)) also work
.then(() => osstat([pid]))
.then((r) => {

	console.log('cpu is not ok', alarm.should_cpu_alarm(r, 1));
	console.log('mem is not ok', alarm.should_mem_alarm(r));
	console.log('load is not ok', alarm.should_load_alarm(r));
	console.log('process nums is not ok', alarm.should_procs_alarm(r, 2));
	console.log('formated code', alarm.alarm_format(r));

})
.catch((e) => console.error(e.msg, e.stack));