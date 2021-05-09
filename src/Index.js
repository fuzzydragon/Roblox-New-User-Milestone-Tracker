const axios = require(`axios`)

let startingID = null

const userIDDelta = 100
const startingIDPrecisionFactor = 0.99999

const legosURL = 'https://www.roblox.com/users/'

const get = (url, retry) => {
    return axios.get(url)
          .then((res) => res.data)
          .catch(() => retry ? get(url, retry) : null)
}

const lightGet(url) = (url) => {
    return axios.head(url)
            .then((res) => res.status)
            .catch((e) => e.response.status)
}

const init = async () => {
    if (startingID === null) {
        let res
        
        startingID = 2.5e+9
        console.log('No startingID entered. Searching for one...')
        while (res !== 200) {
            process.title = `Searching for good startingID. Trying: ${startingID}`
            res = await lightGet(`${legosURL}${startingID}/profile`)
            startingID = Math.floor(startingID * startingIDPrecisionFactor)
        }
    }
    
    let userID = startingID
    while (true) {
         process.title = `Querying UserId: ${userID}`

        const res = await get(`${legosURL}${userID}/profile`, true)
        let match = res.match(/(\w+)(?= is one of the millions playing)/)?.[0]

        console.log(userid, match)
        userid += userIDDelta  
    }
}

init()
