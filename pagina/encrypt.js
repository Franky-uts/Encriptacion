const imp_norm = document.getElementById('normal')
const imp_encript = document.getElementById('encriptado')
const clave = document.getElementById('clave')
const clavedes = document.getElementById('clave-des')
const claveArch = document.getElementById('clave-nor-arch')
const clavedesArch = document.getElementById('clave-des-arch')
const boton_norm = document.getElementById('normal_btn')
const boton_encript = document.getElementById('encryp_btn')
const resp_norm = document.getElementById('normal_encript')
const resp_encript = document.getElementById('encriptado_norm')

var encr
var claveGlo
var Textos
var textoArchNorm
var textoArchEncr
var nombreArchivo

const btn_encrp = document.getElementById('archivo_encrip')
const btn_desencrp = document.getElementById('archivo_des')
//const label_encrip = document.getElementById('nombre_archivo_encrip')
//const label_desencrp = document.getElementById('nombre_archivo_desencrip')
const btn_des_encrp = document.getElementById('descargar_encrip')
const btn_des_desencrp = document.getElementById('descargar_desencrip')

const encrypt = async () =>{
    const response = await fetch(`http://127.0.0.1:3000/encriptar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "Clave": claveGlo,
            "Texto": encr
        })
      }).catch(err => console.error(err))
    return response.json().then(value=>{
        Textos = value.texto
    })
}

const unencrypt = async () =>{
    const response = await fetch(`http://127.0.0.1:3000/descriptar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "Clave": claveGlo,
            "Texto": encr
        })
      }).catch(err => console.error(err))
    return response.json().then(value=>{
        Textos = value.texto
    })
}

boton_norm.addEventListener('click',async ()=>{
    encr = imp_norm.value
    claveGlo = clave.value
    await encr
    await claveGlo
    await encrypt()
    resp_norm.value = Textos
})

boton_encript.addEventListener('click',async ()=>{
    encr = imp_encript.value
    claveGlo = clavedes.value
    await encr
    await claveGlo
    await unencrypt()
    resp_encript.value = Textos
})

const leerArchivo = (input,num) => {
    let file = input.files[0]
  
    let reader = new FileReader()

    nombreArchivo = file.name.split(".")[0]

    reader.readAsText(file)
  
    reader.onload = function() {
        switch (num) {
            case 1:
                textoArchNorm = reader.result
                break;
        
            case 2:
                textoArchEncr = reader.result
                break;
        }
        //console.log(reader.result)
    }
  
    reader.onerror = function() {
      console.log(reader.error)
    }

    
}

const descargarArchivo = (contenidoEnBlob, nombreArchivo) => {
    var reader = new FileReader();
    reader.onload = function (event) {
      var save = document.createElement('a');
      save.href = event.target.result;
      save.target = '_blank';
      save.download = nombreArchivo || 'archivo.dat';
      var clicEvent = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });
      save.dispatchEvent(clicEvent);
      (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
    reader.readAsDataURL(contenidoEnBlob);
  };

btn_des_encrp.addEventListener('click',async () =>{
    encr = textoArchNorm
    claveGlo = claveArch.value
    await encr
    await claveGlo
    await encrypt()
    let blob = new Blob([Textos],{type: 'text/plain'})
    descargarArchivo(blob,nombreArchivo+" - Encriptado")
})

btn_des_desencrp.addEventListener('click',async () =>{
    encr = textoArchEncr
    claveGlo = clavedesArch.value
    await encr
    await claveGlo
    await unencrypt()
    let blob = new Blob([Textos],{type: 'text/plain'})
    descargarArchivo(blob,nombreArchivo+" - Desencriptado")
})