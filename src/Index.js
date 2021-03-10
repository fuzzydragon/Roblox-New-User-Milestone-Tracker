const Axios = require(`axios`)

let StartingId = null
const UserIdDelta = 100
const StartingIdPrecisionFactor = 0.95

async function Get(URL, Retry) {
    const Request = Axios.get(URL)

    return Request
        .then((Response) => Response.data)
        .catch(() => Retry ? Get(URL, Retry) : null)
}

async function Start() {
    if (StartingId == null) {
        StartingId = 10e+12 // Works until UserId 1 trillion exists

        let Response = null

        while (!Response) {
            process.title = `Searching for good StartingId. Trying: ${StartingId}`
            Response = await Get(`https://www.roblox.com/users/${StartingId}/profile`, false)
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
