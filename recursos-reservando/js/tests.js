var expect = chai.expect;

describe(`Testeo de Clase Restarurante`, function(){
    let restoParaPrueba = new Restaurant(22, "Byron Hoxton", "Hamburguesa", "Londres", ["14:00", "16:00", "21:30"], "../img/hamburguesa3.jpg", [4, 9, 10, 10, 6]);

    it('Cuando se reserve un horario, debe eliminarse del arreglo', function(){
        restoParaPrueba.reservarHorario("16:00");
        expect(restoParaPrueba.horarios).to.include("14:00","21:30").but.not.include("16:00");
    })
    it('El restaurante no posee el horario, el arreglo no se modifica', function(){
        restoParaPrueba.reservarHorario("13:00");
        expect(restoParaPrueba.horarios).to.not.have.own.property("13:00");
        expect(restoParaPrueba.horarios.length).to.equal(2);
    })

    it('Se intenta reservar un horario pero no se le pasan parametros, el arreglo no se modifica', function(){
        restoParaPrueba.reservarHorario("");
        expect(restoParaPrueba.horarios.length).to.equal(2);
    })
    it('Dado una cantidad de puntuaciones, se calcula el promedio', function(){
        let promedio = restoParaPrueba.obtenerPuntuacion();
        expect(promedio).to.equal(7.8)

    })
    it('Si un restaurant no tiene calificacion, la puntuacion es 0', function(){
        restoParaPrueba.calificaciones = [];
        expect(restoParaPrueba.obtenerPuntuacion()).to.equal(0);
    })
    it('Si una calificación recibe un valor entero, se agrega al array', function(){
        restoParaPrueba.calificar(7);
        expect(restoParaPrueba.calificaciones).to.eql([7]);
    })
});

describe('Testeo de clase Listado', function(){
    let ListadoParaPrueba = new Listado(listadoDeRestaurantes);

    it('Buscar restaurante a partir de un ID', function(){
        let restaurante = ListadoParaPrueba.buscarRestaurante(1);
        expect(restaurante.id).to.equal(1);
    })
    it('Buscar restaurantes a partir de ciudades', function(){
         let restaurante = ListadoParaPrueba.obtenerRestaurantes(null,"Londres", null)
        expect(restaurante.length).to.equal(4);
    })
    
    it('Buscar restaurantes a partir de rubros', function(){
        let restaurante = ListadoParaPrueba.obtenerRestaurantes('Asiática',null, null)
        expect(restaurante.length).to.equal(3);
    })
    it('Buscar restaurantes a partir de horarios', function(){
        let restaurante = ListadoParaPrueba.obtenerRestaurantes(null,null,"12:00")
        expect(restaurante.length).to.equal(11);

    })
});

describe('Testeo de la clase RESERVA', function(){
    let reservaDePrueba = new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");
    let reservaConAdicionales = new Reserva(new Date(2020, 0, 24, 18), 3, 200, "DES1");

    it('El objeto  reserva se crea correctamente', function(){
    expect(reservaDePrueba).not.to.be.equal("null")
    })
    it('El objeto reserva calcula precio de Base', function(){
        expect(reservaDePrueba.precioBase()).to.equal(300);
        expect(reservaConAdicionales.precioBase()).to.equal(600);
    })
    it('El objeto reserva calcula el valor de los descuentos', function(){
        expect(reservaDePrueba.descuentos()).to.be.equal(200);
        expect(reservaConAdicionales.descuentos()).to.be.equal(200);

    })
    it('El objeto reserva calcula el valor total de los adicionales', function(){
        expect(reservaDePrueba.adicionales()).to.be.equal(0);
        expect(reservaConAdicionales.adicionales()).to.equal(60);
    })
    it('El objeto reserva calcula precio final correctamente', function(){
        expect(reservaDePrueba.precioFinal()).to.equal(100);
        expect(reservaConAdicionales.precioFinal()).to.equal(460);
    })
});