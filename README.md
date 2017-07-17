## koa-cache

A simple cache middleware for koa. 

koa >= 2.x ,
Requires Node 7.6 or greater for async/await support.

## Usage

- `npm koa-redis-cache-ts`

```javascript
import * as Koa from "koa"
import * as Cache_ts from "koa-redis-cache-ts"

const app = new Koa()
const Cache = new Cache_ts({
    port: "",
    host: "",
    database: "",
    expire: "" // default is one day
})

app.use(Cache())

app.post('/', (ctx, next) => {
    ctx.SET('hello', 'world')  // set a key 'hello' with value 'world'
})

app.get('/', (ctx) => {
    let hello = await ctx.GET('hello')
    ctx.body = {
        hello: hello
    }
})
```
