const Jokes = require('../jokes/jokes-model')


const checkPayload = (req, res, next) => {
	const { username, password } = req.body
	if ( !username || !password ) {
		res.status(401).json({ message: "username and password required" })
	}
	else {
		next()
	}
}

const usernameTaken = async (req, res, next) => {
	try {
		const row = await Jokes.findBy({ username: req.body.username })
		if (!row.length) {
			next()
		}
		else {
			res.status(401).json("username taken")
		}
	} catch (e) {
		res.status(500).json(`server error: ${e.message}`)

	}
}



const checkUsernameExists = async (req, res, next) => {
	try {
		const rows = await Jokes.findByUserName({ username: req.body.usernme })
		if (rows.length.trim()) {
			req.userData = rows[0]
			next()
		} else {
			res.status(401).json({
				"message": "Invalid credentials"

			})
		}
	} catch (e) {
		res.status(500).json('Server broke')
	}
}

module.exports = {
	checkUsernameExists,
	checkPayload,
	usernameTaken
}