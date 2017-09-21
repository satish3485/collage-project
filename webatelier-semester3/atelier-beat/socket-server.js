var socketIo = require('socket.io')

var eventBus = require('./pubsub')

module.exports = function(httpServer) {
	var io = socketIo(httpServer)
	var clientNumber = 0;
	var datanam;
	// Socket.io server
	io.on('connect', function(socket){
		// console.log('Connected')
		clientNumber++;
		
			
		io.emit('clientNumber',clientNumber)
		
		socket.emit('clientsNumber', {c: clientNumber})

		socket.on('disconnect', function(){
			// console.log('Disconnected')
			clientNumber--;
			io.emit('clientNumber',clientNumber)
		})

		socket.on('error', function(err){
			console.log("Error: " + err)
		})

		socket.on('play', function(event){
			
			io.emit('play', event,clientNumber)
		})
		socket.on('pause', function(event){
			
			io.emit('pause', event,clientNumber)
		})
		socket.on('playSameSong', function(data){
			
			io.emit('playSameSong', data,clientNumber)
		})
		socket.on('seekBar', function(wStyle,time){
			
			io.emit('seekBar',wStyle,time,clientNumber)
		})
		
		
		// socket.on('player', function(data){
		// 	//data.comamnd 
		// }
		// socket.on('play', function(data){}
		// socket.on('stop', function(data){}
	})
	
	eventBus.on('track.deleted', function(event){
		io.emit('change-track', event)
	})

	eventBus.on('track.updated', function(event){
		io.emit('change-track', event)
	})
	eventBus.on('track.changeOrder', function(event){
		io.emit('change-changeOrder', event)
	})
	eventBus.on('album.deleted', function(event){
		io.emit('change-album', event)
	})
	eventBus.on('player.changet', function(event){
		io.emit('player-changet', event)
	})

	eventBus.on('album.updated', function(event){
		io.emit('change-album', event)
	})
	eventBus.on('Activity.Delete', function(event){
		io.emit('Delete-Activity', event)
	})
	eventBus.on('artist.deleted', function(event){
		io.emit('change-artist', event)
	})

	eventBus.on('artist.updated', function(event){
		io.emit('change-artist', event)
	})
	eventBus.on('mode-change', function(event){
		io.emit('mode.change', event,clientNumber)

	})
	eventBus.on('go-back-n', function(event){
		
		io.emit('go.back.n', event)

	})

}