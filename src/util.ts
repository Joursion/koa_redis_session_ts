class util {

    decode(string: string): any {
        const data = Buffer.from(string, 'base64').toString('utf8')
        const json = JSON.parse(data)
        return json
    }

    encode(data: any): string {
        const d = JSON.stringify(data)
        return Buffer.from(d).toString('base64')
    }

}
export default util