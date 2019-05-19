class Ancian{

    constructor(socket, player){

        this.canvas = document.getElementById("canvas")

        this.velhas = []

        this.velha = -1

        this.myplayer = player

        this.player = 0

        this.make = [
                    [0,1,2],[3,4,5],[6,7,8],
                    [0,3,6],[1,4,7],[2,5,8],
                    [0,4,8],[2,4,6] 
                    ]

        for (let i = 0; i < 9; i++) {
            
            var velha = document.createElement('div')
            velha.className = 'velha'
            velha.ativo = 0
            velha.valor = 0
            
            this.velhas.push(velha)

            for (let j = 0; j < 9; j++) {
                
                var campo = document.createElement('button')
                campo.className = 'campo'
                campo.ativo = 0
                campo.valor = 0
                campo.pos = j
                campo.velha = i

                campo.onclick = (event) => {
                    socket.emit('click',{velha : i, campo : j, player : this.myplayer})
                    this.play(event.target, this.myplayer)
                }

                velha.appendChild(campo)

            }

            this.canvas.appendChild(velha)
            
        }


        this.display()

        window.onresize = () => this.display()
        

    }

    display(){

        let wh = window.innerHeight
        let ww = window.innerWidth

        this.canvas.style = "100%"
        this.canvas.style.marginTop = (wh - ww)/2
        document.documentElement.style.backgroundSize = '400%'

        if(window.innerWidth > 2*wh) document.documentElement.style.backgroundSize = '100%'

        if(window.innerWidth > wh) {
            
            this.canvas.style.width = wh-17
            this.canvas.style.marginTop = 0

        }
        
        var cw = this.canvas.offsetWidth
        this.canvas.style.height = cw

        let vw = (cw/3) - 6

        for (const velha of this.velhas) {
            
            velha.style.width = vw
            velha.style.height = vw
 

            for (const campo of velha.children) {
                
                campo.style.width = (vw/3)-4
                campo.style.height = (vw/3)-4

            }

        }

    }

    play(bt, player){

        var marcas = ['x','o']

        if(player != this.player) return
        
        if(this.velha<0 || bt.velha == this.velha){

            if(!bt.ativo){

                var marca = marcas[this.player]

                bt.ativo = 1
                bt.valor = this.player
                this.velha = bt.pos

                bt.className += ' '+marca

                var possibilidades = this.make.filter((value) => {return value.includes(bt.pos)})

                if( this.check(possibilidades, this.velhas[bt.velha].children)){

                    this.velhas[bt.velha].innerHTML = ''    
                    this.velhas[bt.velha].className += ' '+marca
                    this.velhas[bt.velha].ativo = 1
                    this.velhas[bt.velha].valor = this.player

                    var possibilidades = this.make.filter((value) => {return value.includes(bt.velha)})

                    if( this.check(possibilidades, this.velhas)) alert("Player "+this.player+" venceu")

                }

                if(this.velhas[this.velha].ativo) this.velha = -1
                

                this.player = !this.player ? 1 : 0
            }
        }
    }

    check(possibilidades, lista){

        return possibilidades.some((i) =>{ 

            return i.every( (j) => {
            var celula = lista[j]
            return celula.ativo && celula.valor == this.player 
            })

        })

    }

}