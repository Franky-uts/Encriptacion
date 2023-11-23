const express = require('express')
const app = express()
const cors = require('cors')
const CryptoJS = require("crypto-js")
const clave = "Holamundo"


app.use(cors())

app.get('/encriptar/:Texto',(req,res)=>{
    const {Texto} = req.params
    res.send({
        texto:CryptoJS.AES.encrypt(req.params.Texto, clave).toString()
    })
})

app.get('/descriptar/:Texto',(req,res)=>{
    const {Texto} = req.params
    res.send({
        texto:CryptoJS.AES.decrypt(req.params.Texto, clave).toString(CryptoJS.enc.Utf8)
    })
})

app.listen(3000, ()=>{
    console.log('Hola xddd')
})