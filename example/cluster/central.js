'use strict';

const Central = require('../../lib').central;

let ctl = new Central({
	timeout: 100, //ms
	parts: [
		3000, // just port
		[3001, 200], // port and related timeout
		3002,
		3003
	]
});

// start collect performance 
// from all part machine
Promise.resolve()
.then(() => ctl.collect())
.then((r) => {
	// would like this
	// [ { sys:
	//    { hostname: 'localhost.localdomain',
	//      uptime: '00:46:36',
	//      load: [Object],
	//      cpus: [Object],
	//      mem: [Object] },
	//   procs: [ [Object] ] },
	// { sys:
	//    { hostname: 'localhost.localdomain',
	//      uptime: '00:46:36',
	//      load: [Object],
	//      cpus: [Object],
	//      mem: [Object] },
	//   procs: [ [Object] ] } ]
	console.log(r);
})
.catch((e) => console.error(e));