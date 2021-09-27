const https = require(`./modules/https/index.js`)
const cli = require(`./modules/cli/index.js`)

const { "--id": startId, "--delta": deltaId } = cli.flags()

async function task(id, delta) {
	id = parseInt(id)
	delta = parseInt(delta) || 1

	while (true) {
		process.title = `querying: ${id}`

		const response = await https.get(`https://www.roblox.com/users/${id}/profile`)
		const description = response.body.match(/(\w+)(?= is one of the millions)/)

		if (description) {
			const name = description[0]

			console.log(id, name)
			id += delta
		}
	}
}

task(startId, deltaId)
