class Producto{
    constructor(id,tipo,precio,cantidad){
        this.Id = parseInt(id)
        this.tipo = tipo
        this.precio = precio
        this.cantidad = cantidad
    }
}

// Menu de opciones
// let opc = 5
let valorOpc
let listaProductos = []
let boton1 = document.getElementById('boton1')
let opc = document.getElementById('opc')
boton1.onclick = () => {
    console.log(opc.value)
    valorOpc= opc.value
    listaProductos = JSON.parse(localStorage.getItem('listaproduct'))
    if (valorOpc == 1){
        let tituloTipo = document.getElementById('tituloTipo')
        let formProducto = document.getElementById('formProducto')
        tituloTipo.innerHTML = 'Agregar un Producto';
        formProducto.innerHTML = '<h3>Id del producto:</h3><input type="text" id="idProducto"><h3>Precio:</h3><input type="text" id="precio"><h3>Cantidad:</h3><input type="text" id="cantidad"> \n<select name="tipo" id="tipo"><option>Panaderia</option><option>Almacen</option><option>Verduleria</option></select><input type="submit" id="boton2" value="submit">'
        let idProducto = document.getElementById('idProducto')
        let boton2 = document.getElementById('boton2')
        let tipo = document.getElementById('tipo').value
        let precioProducto = document.getElementById('precio')
        let cantidadProducto = document.getElementById('cantidad')        
        boton2.onclick = () =>{
            listaProductos.push( new Producto(idProducto.value,tipo, precioProducto.value, cantidadProducto.value))
            console.log(idProducto.value +' ' + tipo +' '+precioProducto.value+' '+cantidadProducto.value)
            localStorage.setItem('listaproduct', JSON.stringify(listaProductos))
        }
    }else if(valorOpc == 2){
        let tituloTipo = document.getElementById('tituloTipo')
        tituloTipo.innerHTML = 'Modificar Valores De un producto' 
        let formProducto = document.getElementById('formProducto') 
        formProducto.innerHTML ='<h3>Buscar mediante Id de producto</h3><input type="text" id="buscarId"><input type="button" id="btnBuscar">'
        let btnBuscar = document.getElementById('btnBuscar')
        btnBuscar.onclick = () => {
            let buscarId = document.getElementById('buscarId')
            console.log(listaProductos[buscar(buscarId.value)])
            
        }
        
    }else if(valorOpc == 3){
        recorrer(listaProductos, console.log)       
        listaProductos.sort(Comparacion)
        let tituloTipo = document.getElementById('tituloTipo')
        tituloTipo.innerHTML = 'Mostrar Lista de Productos Ordenada Por Id' 
        document.getElementById('formProducto').innerHTML = ''
        agregarElementos();
    }
        
}
function agregarElementos(){ 
    var lista=document.getElementById("formProducto"); 
    listaProductos.forEach(function(data){
        var linew= document.createElement("li");    
        var contenido = document.createTextNode(data.Id + ' ' + data.tipo + ' ' + data.precio + ' ' + data.cantidad);
        lista.appendChild(linew);
        linew.appendChild(contenido);
    
    })
}

    
function recorrer(array, funcion){
    for (const elemento of array){
        funcion[elemento]
    }
}



// while (opc != 0){
   
//     if (opc == 1){
//         alert('Agregar un Producto')
//         let id = prompt('Id Del Producto')
//         let tipo = prompt('Seleccione el Tipo de Producto\n 1-Panaderia\n 2-Almacen\n 3-Verduleria\n')
//         tipo = parseInt(tipo)
//         switch (tipo){
//             case 1: 
//                 tipo = 'Panaderia'
//                 break
//             case 2:
//                 tipo = 'Almacen'
//                 break
//             case 3:
//                 tipo = 'Verduleria'
//                 break
//         }
//         let precio = prompt('Cargue el Precio del producto')
//         let cantidad = prompt('Cargue la cantidad del producto')
//         listaProductos.push( new Producto(id,tipo, precio, cantidad))
//     }else if (opc == 2){
//         alert('Modificar un producto')
//         id = prompt('Id del producto a modificar')
//         a = buscar(id)
//         console.log(listaProductos[a])
//         let mod = prompt('Que desea modificar?\n 1-Tipo\n 2-Precio\n 3-cantidad')
//         mod = parseInt(mod)
//         switch(mod){
//             case 1:
//                 tipo = prompt('Nuevo Tipo de Producto\n 1-Panaderia\n 2-Almacen\n 3-Verduleria\n')
//                 tipo = parseInt(tipo)    
//                 break
//             case 2:
//                 listaProductos[a].precio = prompt('Nuevo Precio:')
//                 break
//             case 3:
//                 listaProductos[a].cantidad = prompt('Nueva Cantidad: ')
//                 break   
//         }
//         switch (tipo){
//             case 1: 
//                 listaProductos[a].tipo = 'Panaderia'
//                 break
//             case 2:
//                 listaProductos[a].tipo = 'Almacen'
//                 break
//             case 3:
//                 listaProductos[a].tipo  = 'Verduleria'
//                 break
//         }

//     }else if(opc == 3){
//         listaProductos.sort(Comparacion)
//         for (i = 0; i<= listaProductos.length;i++){
//             console.log(listaProductos[i])
//         }
//         // let n = listaProductos.length

//         // for (let i=0; i<= n -1;i++){
//         //     for(let j=i +1;j <= n; j++){
//         //         if (listaProductos[i].Id > listaProductos[j].Id){
//         //             listaProductos[i] , listaProductos[j]= listaProductos[j],listaProductos[i]
//         //         }
//         //     }
//         // }

//         // for (i = 0; i <= listaProductos.length; i++){
//         //     console.log(listaProductos[i])
//         // }
//     }
    
// }
function buscar(id){
    for (i = 0; i <= listaProductos.length; i++){
        if(listaProductos[i].Id == id){
            return i
        }
    }
}

function Comparacion(a, b){
    if (a.Id < b.Id){
        return - 1
    }else if (a.Id > b.Id){
        return 1
    }else{
        return 0
    }

    
}
// LOCAL STORAGE
