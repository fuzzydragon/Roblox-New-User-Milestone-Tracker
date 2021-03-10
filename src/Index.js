const HTTPS = require("https")

let ID = 2426242000

const Delta = 100

async function HTTPSGet(URL) {
    const RequestPromise = new Promise((Resolve) => {
        const Request = HTTPS.request(URL, (Response) => {
            let Data = ""

            Response.on("data", (Chunk) => Data += Chunk)
            Response.on("end", () => Resolve([Response.statusCode, Data]))
        })

        Request.end()
    })

    return RequestPromise
}

async function Check() {
    const CheckURL = `https://www.roblox.com/users/${ID}/profile`

    const [Status, Response] = await HTTPSGet(CheckURL)
    
    const Reg = /(\w+)(?= is one of the millions playing)/
    let Match = Response.match(Reg)

    process.title = `Querying UserId: ${ID}`

    if (Status == 200) {
        if (Match) {
            Match = Match[0]
        }

        console.log(ID, Match)
        ID += Delta
    }
}

async function Start() {
    while (true) {
        await Check()
    }
}

Start()
