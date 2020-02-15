var Reserva = function(horario, cantidadDePersonas, precioPorPersona, codigoDeDescuento){
    this.horario = horario;
    this.cantidadDePersonas = cantidadDePersonas;
    this.precioPorPersona = precioPorPersona;
    this.codigoDeDescuento = codigoDeDescuento;
}

Reserva.prototype.precioBase = function(){
    return this.cantidadDePersonas * this.precioPorPersona;
}

Reserva.prototype.descuentos = function(){
    let totalDescuentos;
    if(this.cantidadDePersonas >= 4 && this.cantidadDePersonas <= 6){
        totalDescuentos = this.precioBase()*0.05;
    }
    else if(this.cantidadDePersonas >= 7 && this.cantidadDePersonas <= 8){
        totalDescuentos = this.precioBase()*0.1;
    }
    else if(this.cantidadDePersonas > 8){
        totalDescuentos = this.precioBase()*0.15;
    }
    else if(this.codigoDeDescuento === "DES15"){
        totalDescuentos = this.precioBase()*1.5;
    }
    else if(this.codigoDeDescuento === "DES200"){
        totalDescuentos = 200;
    }
    else if(this.codigoDeDescuento === "DES1"){
        totalDescuentos = this.precioPorPersona;
    }
    else{
        totalDescuentos = 0;
    }
    return totalDescuentos;
}

Reserva.prototype.adicionales = function(){
    let totalAdicionales;

        if(this.horario.getDay() === 0 || this.horario.getDay() === 5 || this.horario.getDay() === 6 ){
            totalAdicionales = this.precioBase()*0.1;
            return totalAdicionales;
        }
        else if(this.horario.getHours() === 12 && this.horario.getHours() === 13 || this.horario.getHours() === 19 && this.horario.getHours() === 20 ){
            totalAdicionales = this.precioBase()*0.05;
            return totalAdicionales;
        }
        else{
            return 0;
        }
}

Reserva.prototype.precioFinal = function(){
    return this.precioBase() - this.descuentos() + this.adicionales();
}