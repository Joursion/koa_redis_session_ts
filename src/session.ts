import { Context } from "koa"
import {Cache} from './cache'

class Session {
    _ctx : Context
    opts: Object

    constructor(ctx, opts) {
        this._ctx = ctx
        this.opts = Object.assign({}, opts)
    }

    get session(key: string) : string {
        let v = async Cache.GET(key)
        return v
    }

    set session(key: string, value: any) : boolean{
        let res = async Cache.SET(key, value)
        return res
    }
}

export {
    Session
}