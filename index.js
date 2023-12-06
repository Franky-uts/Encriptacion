const express = require('express')
const app = express()
const cors = require('cors')
const CryptoJS = require("crypto-js")
const bodyParser = require('body-parser')
//const clave = "Holamundo"

app.use(cors())

app.use(bodyParser.json())

app.post('/encriptar',(req,res)=>{
    const {Texto} = req.params
    const data = req.body
    res.send({
        texto:CryptoJS.AES.encrypt(data.Texto, data.Clave).toString()
    })
})

app.post('/descriptar',(req,res)=>{
    const {Texto} = req.params
    const data = req.body
    res.send({
        texto:CryptoJS.AES.decrypt(data.Texto, data.Clave).toString(CryptoJS.enc.Utf8)
    })
})

app.listen(3000, ()=>{
    console.log('Hola xddd')
})