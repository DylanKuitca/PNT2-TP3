new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos:[], //es para registrar los eventos de la partida
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.hayUnaPartidaEnJuego = true;
            this.saludJugador = 100;
            this.saludMonstruo = 100;
            this.turnos = [];
        },

        calcularDaño(min, max) {
           return Math.max(Math.floor(Math.random() * max) +1, min)
        },

        atacar: function () {
            let ataqueJugador = this.calcularDaño(this.rangoAtaque[0],this.rangoAtaque[this.rangoAtaque.length-1])
            this.saludMonstruo -= ataqueJugador;
            this.turnos.unshift({
                    esJugador: true,
                    text:`el jugador lastima el monstruo con ${ataqueJugador}`
            })
            if (this.verificarGanador()) {
                return;
            }

            this.ataqueDelMonstruo();
        },

        ataqueEspecial: function () {
            let ataqueJugador = this.calcularDaño(this.rangoAtaqueEspecial[0],this.rangoAtaqueEspecial[this.rangoAtaqueEspecial.length-1])
            this.saludMonstruo -= ataqueJugador;
            this.turnos.unshift({
                esJugador: true,
                text:`el jugador lastima con poder especial el monstruo con ${ataqueJugador}`
            })
            if (this.verificarGanador()) {
                return;
            }

            this.ataqueDelMonstruo();
        },

        curar: function () {
            if (this.saludJugador <= 90) {
                this.saludJugador += 10; 
                this.turnos.unshift({
                    esJugador: true,
                    text: `El jugador recuperó 10 de vida`
                })
            } else {
                this.saludJugador = 100;
                this.turnos.unshift({
                    esJugador: true,
                    text: `El jugador recuperó su vida`
                })
            }
            this.ataqueDelMonstruo();
        },

        registrarEvento(evento) {

        },
        terminarPartida: function () {
            this.hayUnaPartidaEnJuego = false;
            this.saludJugador = 100;
            this.saludMonstruo = 100;
            this.turnos = []
        },

        ataqueDelMonstruo: function () {
            let ataqueMonstruo = this.calcularDaño(this.rangoAtaqueDelMonstruo[0],this.rangoAtaqueDelMonstruo[this.rangoAtaqueDelMonstruo.length-1])
            this.turnos.unshift({
                esJugador: false,
                text:`el monstruo lastima al jugador ${ataqueMonstruo}`
        })
            this.saludJugador -= ataqueMonstruo;
            this.verificarGanador();
        },

        calcularHeridas: function (rango) {
            return 0

        },
        verificarGanador: function () {
           if (this.saludMonstruo <= 0) {
               if (confirm('Ganaste! Jugar de nuevo?')) {
                   this.empezarPartida();
               } else {
                   this.hayUnaPartidaEnJuego = false;
               }
               return true;
           } else if (this.saludJugador <= 0) {
               if (confirm('Perdiste! Jugar de nuevo?')) {
                   this.empezarPartida();
               } else {
                   this.hayUnaPartidaEnJuego = false;
               }
               return true;
           }
           return false;
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});