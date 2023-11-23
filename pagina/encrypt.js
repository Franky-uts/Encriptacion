//const { response } = require("express")

const imp_norm = document.getElementById('normal')
const imp_encript = document.getElementById('encriptado')
const boton_norm = document.getElementById('normal_btn')
const boton_encript = document.getElementById('encryp_btn')
const resp_norm = document.getElementById('normal_encript')
const resp_encript = document.getElementById('encriptado_norm')

var texto;

const btn_encrp = document.getElementById('archivo_encrip')
const btn_desencrp = document.getElementById('archivo_des')
//const label_encrip = document.getElementById('nombre_archivo_encrip')
//const label_desencrp = document.getElementById('nombre_archivo_desencrip')
const btn_des_encrp = document.getElementById('descargar_encrip')
const btn_des_desencrp = document.getElementById('descargar_desencrip')


const encrypt = async () =>{
    const options = {
        Method: 'GET'
    }

    await fetch(`http://127.0.0.1:3000/encriptar/${imp_norm.value}`,options)
    .then(response => response.json())
    .then(response =>{
        texto = response.texto
        console.log(response.texto)
    })
        .catch(err => console.error(err))
}

const unencrypt = async () =>{
    const options = {
        Method: 'GET'
    }

    await fetch(`http://127.0.0.1:3000/descriptar/${imp_encript.value}`,options)
    .then(response => response.json())
    .then(response =>{
        texto = response.texto
        //console.log(response.texto)
    })
        .catch(err => console.error(err))
}

boton_norm.addEventListener('click',async ()=>{
    await encrypt()
    resp_norm.value = texto
})

boton_encript.addEventListener('click',async ()=>{
    await unencrypt()
    resp_encript.value = texto
})

btn_encrp.addEventListener('click',async () =>{
    const referencias = await window.showOpenFilePicker({})
    const archivo = await referencias[0].getFile();
    const contenido = await archivo.text();		
    console.log(contenido)
})

btn_desencrp.addEventListener('click',async () =>{
    //alert("2")
})

btn_des_encrp.addEventListener('click',async () =>{
    //alert("3")
})

btn_des_desencrp.addEventListener('click',async () =>{
    //alert("4")
})