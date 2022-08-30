class Producto{
    constructor(id,tipo,precio,cantidad){
        this.Id = id
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
let listaProductos = []
let valorOpc
let boton1 = document.getElementById('boton1')
let opc = document.getElementById('opc')
let tipoTxt = ''
let encontrado = false

boton1.onclick = () => {
    listaProductos = []
    listaProductos= listaProductos.concat(JSON.parse(localStorage.getItem('listaP')))
    console.log(opc.value)
    valorOpc= opc.value
    if (valorOpc == 1){
        let agregarProducto = document.getElementById('agregarProducto')
        agregarProducto.innerHTML = '<section id="agregarProducto" class="agregarProd"> <h2 id="titulotipo"></h2><section><div id="formProducto"></div></div></section>'
        let tituloTipo = document.getElementById('titulotipo')
        let formProducto = document.getElementById('formProducto')
        tituloTipo.innerHTML = 'Agregar un Producto';
        formProducto.innerHTML = '<div class="inputForm"><h3>Id del producto:</h3><input type="text" id="idProducto"><h3>Precio:</h3><input type="text" id="precio"><h3>Cantidad:</h3><input type="text" id="cantidad"></div><div class="content-select"><select name="tipo" id="tipo"><option>Panaderia</option><option>Verduleria</option><option>Carniceria</option></select><i></i></div><input type="submit" id="boton2" class="button" value="submit">'
        let boton2 = document.getElementById('boton2')
        let tipo = document.getElementById('tipo');    
        let precioProducto = document.getElementById('precio')
        let cantidadProducto = document.getElementById('cantidad') 
        tipo.onchange = () =>{tipoTxt = tipo.options[tipo.selectedIndex].text }
        if(tipo.selectedIndex == 0){tipoTxt = 'Panaderia'}          
        boton2.onclick = () =>{
            let idProducto = document.getElementById('idProducto').value
            idProducto = parseInt(idProducto)        
            localStorage.clear('listaP')
            buscar(idProducto)
            if (encontrado == true){
                Swal.fire({
                    icon:'error',
                    text:'El id del producto ya existe'
                })
            }else{              
                if(listaProductos[0] == null){
                    listaProductos[0]= new Producto(idProducto,tipoTxt, precioProducto.value, cantidadProducto.value)
                }else{                                
                listaProductos.push( new Producto(idProducto,tipoTxt, precioProducto.value, cantidadProducto.value))
                }
                console.log(idProducto +' ' + tipoTxt +' '+precioProducto.value+' '+cantidadProducto.value)
                Swal.fire({
                    icon: 'success',
                    text: 'Se agrego Correctamente su Producto'
                })
            }
            encontrado = false
            localStorage.setItem('listaP',JSON.stringify(listaProductos))            
        }
    }else if(valorOpc == 2){
        var form=document.getElementById("agregarProducto");
        form.innerHTML= '<section id="agregarProducto" class="listprecio"> <h2 id="titulotipo"></h2><section><form id="formProduct"></form>'    
        tituloTipo = document.getElementById('titulotipo')
        tituloTipo.innerHTML = "Lista de Precios"
        var lista = document.getElementById('formProduct')
        myPromise().then(result => result.forEach(data => {
                var nuevoli= document.createElement("li");    
                var cont = document.createTextNode(data.tipo + ' ' + data.precio );
                lista.appendChild(nuevoli);
                nuevoli.appendChild(cont);
        }))
        document.getElementById('formProducto').innerHTML = ''
        
    }else if(valorOpc == 3){ 
        var form=document.getElementById("agregarProducto");
        form.innerHTML= '<section id="agregarProducto" class="listprecio"> <h2 id="titulotipo"></h2><section><form id="formProduct"></form>'
        recorrer(listaProductos, console.log)       
        listaProductos.sort(Comparacion)
        let tituloTipo = document.getElementById('titulotipo')
        tituloTipo.innerHTML = 'Mostrar Lista de Productos Ordenada Por Id' 
        document.getElementById('formProduct').innerHTML = ''
        agregarElementos()
   
    }
        
}
function agregarElementos(){ 
    var lista=document.getElementById("formProduct"); 
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
    if(listaProductos[0] != null ){
        for (i = 0; i < listaProductos.length; i++){
            if(listaProductos[i].Id == id){
                encontrado = true                
            }
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
function LeerDatos(){
    fetch('./datos.json')
}