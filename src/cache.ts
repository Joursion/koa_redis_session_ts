import * as ioredis from 'ioredis'

const ONE_DAY = 24 * 60 * 60 * 1000

const defaultOp = {
    host: "localhost",
    app: "koa-sess",
    expire: ONE_DAY,
    port: 6379,
    database: 'symbol_koa_session',
    url: ''
}

interface CacheOp {
    app?: string
    host?: string
    expire?: number
    port?: number
    database?: string
    url?: string
}

class Cache  {
    redis: any
    constructor(options: CacheOp) {
        options = Object.assign(defaultOp, options);
        !options.url && (options.url = `${options.host}:${options.port}${options.database}`)
        this.redis = new ioredis(options)
    }

    GET(key: string) {
        return new Promise((resolve, reject) => {
            return resolve(this.redis.get(key))
        })
    }

    SET(key: string, value: any, expire?: number) {
        return new Promise((resolve, reject) => {
            return resolve(this.redis.set(key, value, expire))
        })
    }
}

export {
    Cache
}