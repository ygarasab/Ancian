const express = require('express')
const socket = require('socket.io')
const bodyParser = require('body-parser')
var session = require('express-session');

const port = process.env.PORT || 5000

urlParser = bodyParser.urlencoded({extended:false})

app = express()	
	
	.use(express.static('public'))

	.use(session({secret:'XASDASDA'}))

	.set('view engine', 'ejs')

	.get('/', (req, res) => {

		var username = req.session.username

		if(username) res.redirect('/home')

		else res.render('username')

	})

	.get('/home', (req,res) => {

		var username = req.session.username

		if(!username) res.redirect('/')

		else res.render('home', req.session)

	})

	.get('/salas', (req,res) => {

		var username = req.session.username

		if(!username) res.redirect('/')

		else res.render('sala', req.session)

	})

	.get('/play/:sala', (req, res) =>{

		var username = req.session.username

		if(!username) res.redirect('/')

		else res.render('game', {username : username, sala : req.params.sala})

	})

	.post('/home',urlParser, (req, res) => {

		req.session.username = req.body.username
		var username = req.session.username

		console.log(username)

		res.render('home',req.session )

	})


server = app.listen(port, () => console.log(`Listening on ${ port }`))

var io = socket(server)
io

	.on('connection', (socket) => {
		
		console.log('[ LOG ] Socket conectado ## Id ', socket.id)
		

		socket

		.on('chat', (data) => {

			console.log('[ LOG ] Emitindo mensagem')
			io.sockets.emit('chat', data)

		})

		.on('play', (data) => {

			socket.join(data.sala)

			socket.nome = data.name
			socket.salinha = data.sala

			io.to(data.sala).emit('hi', (socket.nome))

		})

		.on('start', () => io.to(socket.salinha).emit('start',socket.nome))

		.on('click', (data) => {
			io.to(socket.salinha).emit('clicked',data)
			console.log(data)
		})

		.on('disconnect',() => {

			socket.leave(socket.salinha)

			io.to('hub').emit('sala off', socket.salinha)

		})

		.on('procurando salas', () => {

			socket.join('hub')
			io.emit('ouvindo salas')

		})

		.on('sala on', (nome) => {

			io.to('hub').emit('sala on', nome)

		})

		.on('sala off', (nome) => {

			io.to('hub').emit('sala off', nome)

		})



	})

	

