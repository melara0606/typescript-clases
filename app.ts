// function calcular<T>(args:T) : T {
//   return args
// }
// calcular(15).toFixed(15)
// calcular("Hola mundo").toLowerCase()

// function functionGenerica<T>( hereo:T ) : T {
//   return hereo;
// }

// type Heroe  ={
//   nombre:string,
//   nombreReal:string
// }

// type Villano = {
//   nombre: string,
//   poder: string
// }

// let deepol = {
//   nombre: 'Deepool',
//   nombreReal: 'Winton',
//   poder: 'Regeneracion'
// }

// functionGenerica<Heroe>(deepol)
// functionGenerica<Villano>(deepol)

// class Cuadrado<T extends number|string|boolean> {
//   constructor(public base:T, public altura:T){
//   }
//   area(): number {
//     return +this.altura * +this.base
//   }
// }


// let cuadrado = new Cuadrado<number|boolean>(10, false)
// console.log( cuadrado.area() )

// function consola (contructor:Function) {
//   return console.log(contructor)
// }

// function decoratorFactory (imprimirConsola:boolean):Function {
//   if(imprimirConsola){
//     return consola
//   }else{
//     return new Function
//   }
// }

// @decoratorFactory(true)
// class Villano {
//   constructor(public nombre:string){
//   }
// }

function imprimible (contructor:Function) {
  contructor.prototype.get = function () {
    console.log(this)
  }
}

function planVillado (contructor:Function) {
  contructor.prototype.imprimir = function () {
    console.log( `El plan de ${ this.nombre } es conquistar el mundo` )
  }
}

function editable (isEditable:boolean = false) : Function {
  return function (target:any, nombrePropiedad:string, descriptor:PropertyDescriptor) {    
    descriptor.writable = isEditable
  }
}

function parametro (target:any, metodo:string, index:number) {
  console.log(arguments)
}

@imprimible
@planVillado
class Villano {
  constructor(public nombre:string, public poder:string){
  }

  @editable(true)
  plan () : void {
    console.log('El plan del guason')
  }

  imprimirConsola (target:any, @parametro plan:string, mensaje:string) {
    console.log('para poder probar el decorador de parametro')
  }
}

let villano = new Villano('Guason', 'super mente');
(<any>villano).imprimir();
(<any>villano).get();

villano.imprimirConsola(null, "texto", "persona");

try {
  villano.plan = function () {
    console.log('se modifico el plan');
  }
  villano.plan();  
} catch (error) {
  
}

