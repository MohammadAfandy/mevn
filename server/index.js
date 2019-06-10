const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// Middleware
app.use(bodyParser.json())
app.use(cors())

const players = require('./routes/api/players')

app.use('/api/players', players)

// Production Server
if (process.env.NODE_ENV === 'production') {
	// Static Folder
	app.use(express.static(__dirname + '/public/'))

	// SPA
	app.get(/.*/, (req, res) => {
		res.sendFile(__dirname + '/public/index.html')
	})
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on Port ${port}`))