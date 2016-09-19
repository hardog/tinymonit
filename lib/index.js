'use strict';

/**
 * **DEFINITION**
 * osstat: os stat structure
 * {
 * 	sys: {
 * 		hostname: 'xx',
 * 		loadavg: {},
 * 		...
 * 	},
 * 	procs: [{
 * 		name: 'p1-name',
 * 		cpu: '45%',
 * 		mem: 23Mb,
 * 		...
 * 	}, {
 * 		name: 'p2-name',
 * 		cpu: '80%'
 * 	}]
 * }
 */
exports.alarm = require('./alarm');
exports.osstat = require('./osstat');
exports.central = require('./central');
exports.part = require('./part');
exports.proc = require('./proc');
exports.os = require('./os');
