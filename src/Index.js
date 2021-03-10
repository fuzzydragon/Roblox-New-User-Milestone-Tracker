const Axios = require(`axios`)

let StartingId = null
const UserIdDelta = 100
const StartingIdPrecisionFactor = 0.999

async function Get(URL, Retry) {
    const Request = Axios.get(URL)

    return Request
        .then((Response) => Response.data)
        .catch(() => Retry ? Get(URL, Retry) : null)
}

async function LightGet(URL) {
    const Request = Axios.head(URL)

    return Request
        .then((Response) => Response.status)
        .catch((Error) => Error.response.status)
}

async function Start() {
    if (StartingId == null) {
        StartingId = 1e+10

        let Response = null

        while (Response != 200) {
            process.title = `Searching for good StartingId. Trying: ${StartingId}`
            Response = await LightGet(`https://www.roblox.com/users/${StartingId}/profile`)
            StartingId = Math.floor(StartingId * StartingIdPrecisionFactor)
        }
    }

    let UserId = StartingId

    while (true) {
        process.title = `Querying UserId: ${UserId}`

        const Response = await Get(`https://www.roblox.com/users/${UserId}/profile`, true)
        let Match = Response.match(/(\w+)(?= is one of the millions playing)/)

        if (Match) {
            Match = Match[0]
        }

        console.log(UserId, Match)
        UserId = UserId + UserIdDelta
    } 
}

Start()
