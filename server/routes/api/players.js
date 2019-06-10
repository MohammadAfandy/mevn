const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

// GET
router.get('/', async (req, res) => {
	const players = await loadPlayersCollection()
	res.send(await players.find({}).toArray())
})

// POST
router.post('/', async (req, res) => {
	const players = await loadPlayersCollection()
	players.insertOne({
		name: req.body.name,
		position: req.body.position,
		details: req.body.details,
		createdDate: new Date()
	})

	res.status(201).send()
})

// DELETE
router.delete('/:id', async (req, res) => {
	const players = await loadPlayersCollection()
	await players.deleteOne({_id: new mongodb.ObjectId(req.params.id)})

	res.status(200).send()
})


async function loadPlayersCollection() {
	const client = await mongodb.MongoClient.connect('mongodb+srv://mohafandy:liverpool1892@cluster0-spmz4.mongodb.net/crud-app?retryWrites=true&w=majority', {
		useNewUrlParser: true
	})

	return client.db('crud-app').collection('players')
}

module.exports = router