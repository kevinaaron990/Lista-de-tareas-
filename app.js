//Creamos vatiables y llamoamos mediante documentgetelementbyid los documentos que vamos a modificar

const $datoNumero = document.getElementById('datoNumero');
const $datoMes = document.getElementById('datoMes');
const $datoAño = document.getElementById('datoAño');
const $datoTexto = document.getElementById('datoTexto');
//contendor de tareas
const $tareasContenedor = document.getElementById('tareasContenedor');

//Funcion para Setear la fechas
const establecerFecha = () =>{
    const dato = new Date();//date es constructor que nos Permite trabajar con fechas y horas.
    //modificamos el cada unos de nuestros elementos primero el textContent usamos la variable donde guadamos nuestro newDate
    //.tolocalstring 'es' de español,el dato y el valor

    $datoNumero.textContent = dato.toLocaleString('es', {day:'numeric'});//numeric 
    $datoMes.textContent = dato.toLocaleString('es', {month: 'long'});//long todo el texto
    $datoTexto.textContent = dato.toLocaleString('es',{weekday:'long'});//short abreviado
    $datoAño.textContent = dato.toLocaleString('es',{year:"numeric"});
};

//funcion agregarTarea del evento onsumbit que se va a enviar cuando el usuario envie una nueva tarea 
const agregarTarea = event => {
    event.preventDefault();//Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento
    //creamos y agregamos la tarea
    //tomamos el valor del input
    const { value } = event.target.tarea;//accedemos al valor mediante el target y el name del input
    if(!value) return;//si no hay value osea si el usuario no agrego nada evitamos que se agreguen tareas vacias osea sin valor,el return hace que se corte la ejecucion de la funcion
    const tarea = document.createElement('div');//creamos un elemento div 
    tarea.classList.add('tarea','modificarEstilo');// a mi div le estoy dando dos clases
    tarea.addEventListener('click',estadoDeTarea);//le agrego un evento click con una funcion 
    tarea.textContent = value;//agregamos dentro el texto que ingreso el usuario en value osea en el input
    $tareasContenedor.prepend(tarea);//agremaos el elemento creado a nuestro contenedor de tareas con prepend esto hace que agregue al principio de la lista, es decir se antepone cada elemento creado
    event.target.reset();//reseteanos el input cada ves que se ingresa una tarea 
};

//funcion cambiar estado de las tareas una vez haciendo clixk a la tarea 
const estadoDeTarea = e =>{
    e.target.classList.toggle('tareaHecha');/*accdemos a la clase de mi elemento div y con toggle preguntamos si no tiene la clase tareaHecha
                                                se la agregamos y si la tiene se la eliminamos */
};

//creamos una funcion para ordenar las tareas hechas y por hacer 

const orden = () =>{
    //creamos dos arrays donde vamos a ir agregando las tareas hechas y por hacer 
    const tareasHechas = [];
    const tareasPorHacer = [];
    //accedemos al contenedor de tareas despues con childNodes a los hijos que serian los div y con forEach iteramos por cada uno de ellos
    $tareasContenedor.childNodes.forEach(tarea =>{
        //preguntamos si en el div hijo esta la clase tareaHecha la agregamos al array tareas hechas con .push ,de lo contrario si no tiene esa clase la agreamos a tareasPorHcer
        tarea.classList.contains('tareaHecha') ? tareasHechas.push(tarea) : tareasPorHacer.push(tarea);

    })
    //esta funcion va a devolver con el return usando el spreed operator un array que primero esten las tareas que estan por hacer y depues las tareas hechas 
    return [...tareasPorHacer,...tareasHechas];
};
//creamos la funcion ordenartareas de mi boton ordenar tareas con el evento click

const ordenarTareas =() =>{
    //llamamos a orden() la funcion q hcimos arriba nos devuelve un array y lo interamos cada elemento con foreach y lo agregamos ordenado a mi $contenedor de tareas  
    orden().forEach(tarea => $tareasContenedor.appendChild(tarea))
};
establecerFecha();