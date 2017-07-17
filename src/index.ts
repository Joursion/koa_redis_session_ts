import { Context } from "koa"
import {Cache} from './cache'
import {Session} from './session'

const ONE_DAY = 24 * 60 * 60 * 1000

class ContextSession {
    session: any
    ctx: Context
    opts: Object
    constructor(ctx, opts) {
        this.ctx = ctx
        this.opts = Object.assign({}, opts)
    }

    get() {
        const session = this.session
        session && return session
        return null
    }

    set(val: Object) {
        this.create(val)
    }

    create(val: Object) {
        this.session = new Session(this.ctx, val)
    }

    initCookie() {
        const {ctx, opts} = this
        const cookie = ctx.cookies.get(opts.key, opts)
        if(!cookie) {
            this.create()
            return 
        }

        let json 
        try {
            json = opts.decode(cookie)
        } catch(err) {
            if (!(err instanceof SyntaxError)) {
                ctx.cookies.set(opts.key, '', opts)
                err.headers = {
                    'set-cookie': ctx.response.get('set-cookie')
                }
                throw err
            }
        }
        this.create()
        return
    }



}


