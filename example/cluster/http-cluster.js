'use strict';

const koa = require('koa');
const Central = require('../../lib').central;
const app = koa();

let ctl = new Central({
    timeout: 100, //ms
    parts: [
        3000, // just port
        [3001, 200] // port and related timeout
    ]
});

app.use(function *(next){
    if(this.url === '/'){
        yield Promise.resolve()
        .then(() => ctl.collect())
        .then((r) => {
            this.body = r;
        })
        .catch((e) => this.body = e.message);
    }

    yield next;
});

app.listen(8080);