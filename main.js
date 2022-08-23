class Producto{
    constructor(id,tipo,precio,cantidad){
        this.Id = parseInt(id)
        this.tipo = tipo
        this.precio = precio
        this.cantidad = cantidad
    }
}

async function myPromise(){ 
    return await new Promise((resolve, reject)=>{

        fetch("./datos.json").then(response => {
            resolve(response.json());
        }).catch(error =>{
            reject(error);
        }); 
    })
}    


// Menu de opciones
// let opc = 5

let valorOpc
let listaProductos = []
let boton1 = document.getElementById('boton1')
let opc = document.getElementById('opc')
let tipoTxt = ''

boton1.onclick = () => {

    console.log(opc.value)
    valorOpc= opc.value
    if (valorOpc == 1){
        let tituloTipo = document.getElementById('tituloTipo')
        let formProducto = document.getElementById('formProducto')
        tituloTipo.innerHTML = 'Agregar un Producto';
        formProducto.innerHTML = '<h3>Id del producto:</h3><input type="text" id="idProducto"><h3>Precio:</h3><input type="text" id="precio"><h3>Cantidad:</h3><input type="text" id="cantidad"> \n<select name="tipo" id="tipo"><option>Panaderia</option><option>Almacen</option><option>Verduleria</option></select><input type="submit" id="boton2" value="submit">'
        let idProducto = document.getElementById('idProducto')
        let boton2 = document.getElementById('boton2')
        let tipo = document.getElementById('tipo');
        let precioProducto = document.getElementById('precio')
        let cantidadProducto = document.getElementById('cantidad')        
        boton2.onclick = () =>{
            
            Swal.fire({
                icon: 'success',
                text: 'Se agrego Correctamente su Producto'
              })
              
            tipo.onchange = () =>{tipoTxt = tipo.options[tipo.selectedIndex].text }
            if(tipo.selectedIndex == 0){tipoTxt = 'Panaderia'}
            listaProductos.push( new Producto(idProducto.value,tipoTxt, precioProducto.value, cantidadProducto.value))
            console.log(idProducto.value +' ' + tipoTxt +' '+precioProducto.value+' '+cantidadProducto.value)
            
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
        var lista=document.getElementById("formProducto"); 
        recorrer(listaProductos, console.log)       
        listaProductos.sort(Comparacion)
        let tituloTipo = document.getElementById('tituloTipo')
        tituloTipo.innerHTML = 'Mostrar Lista de Productos Ordenada Por Id' 
        document.getElementById('formProducto').innerHTML = ''
        myPromise().then(result => result.forEach(data => {
            var linew= document.createElement("li");    
            var contenido = document.createTextNode(data.id + ' ' + data.tipo + ' ' + data.precio + ' ' + data.cantidad);
            lista.appendChild(linew);
            linew.appendChild(contenido);
    }))
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