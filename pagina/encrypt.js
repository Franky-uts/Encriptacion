//const { response } = require("express")

const imp_norm = document.getElementById('normal')
const imp_encript = document.getElementById('encriptado')
const boton_norm = document.getElementById('normal_btn')
const boton_encript = document.getElementById('encryp_btn')
const resp_norm = document.getElementById('normal_encript')
const resp_encript = document.getElementById('encriptado_norm')
var texto;

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
        console.log(response.texto)
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