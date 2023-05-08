export class HelloWorld{
    public static async wishHello():Promise<String>{
        let resp = `Hello World!`
        return Promise.resolve(resp)
    }
}