let pagina = "Clases/Principal.html";


// ======== INDEX.HTML ==========



const localStorageInicio = (idAlumnos, nombre, apellido, dni, contraseña, tarea1, tarea2, tarea3, tarea4) => {
    let usuarioLocal = {
        idAlumnos,
        nombre,
        apellido,
        dni,
        contraseña,
        tarea1,
        tarea2,
        tarea3,
        tarea4
    }

    localStorage.setItem("usuario", JSON.stringify(usuarioLocal))
}

const cargarAlumnos = () => {
    axios.get('http://localhost:3005/alumnos')
        .then((resp) => {
            console.log(resp)
        }).catch((error) => {
            console.log(error)
        })

    console.log('ando')
}

const inicioSesionAlumnos = () => {
    const dniInicio = document.getElementById('dni').value
    const contraseñaInicio = document.getElementById('contraseña').value

    if (dniInicio == '' || contraseñaInicio == '') {
        alert('Ingresar dni y contraseña')
    } else {
        axios.get(`http://localhost:3005/alumnos/existe/${dniInicio}`)
            .then((resp) => {
                let existe = resp.data[0].existe

                if (existe == 0) {
                    alert('Este usuario no existe')
                } else {
                    axios.get(`http://localhost:3005/alumnos/dni/${dniInicio}`)
                        .then((resp) => {
                            let dniBD = resp.data[0].dni
                            let contra = resp.data[0].contraseña

                            if (contraseñaInicio == contra && dniInicio == dniBD) {
                                let usuarioActivo = resp.data[0]

                                let idAlumnos = usuarioActivo.idAlumnos
                                let nombre = usuarioActivo.nombre
                                let apellido = usuarioActivo.apellido
                                let dni = usuarioActivo.dni
                                let contraseña = usuarioActivo.contraseña
                                let tarea1 = usuarioActivo.tarea1
                                let tarea2 = usuarioActivo.tarea2
                                let tarea3 = usuarioActivo.tarea3
                                let tarea4 = usuarioActivo.tarea4


                                localStorageInicio(idAlumnos, nombre, apellido, dni, contraseña, tarea1, tarea2, tarea3, tarea4)

                                location.href = pagina
                                console.log('Contraseña y usuario correctos')
                            } else {
                                alert('El usuario no coincide con la contraseña')
                            }
                        })
                }
            })
    }
}

const inicioSesionAdmin = () => {
    let paginaAdmin = "Administrador/admin.html"
    const legajo = document.getElementById('dni').value
    const contraseñaAdmin = document.getElementById('contraseña').value

    if (legajo == '' || contraseñaAdmin == '') {
        alert('Ingresar dni y contraseña')
    } else {
        axios.get(`http://localhost:3005/administrador/legajo/${legajo}`)
            .then((resp) => {
                let legajoBD = resp.data[0].legajo
                let contraBD = resp.data[0].contraseña

                if (legajo == legajoBD && contraseñaAdmin == contraBD) {
                    let adminActivo = resp.data[0]
                    let idAdministrador = adminActivo.idAdministrador
                    let legajo = adminActivo.legajo
                    let contraseña = adminActivo.contraseña

                    location.href = paginaAdmin
                    console.log('Contraseña y usuario correctos')
                } else {
                    alert('El usuario no coincide con la contraseña')
                }
            })
    }

}

const inicioSesion = () => {
    const dniInicio = document.getElementById('dni').value

    if(dniInicio == '20045'){
        inicioSesionAdmin()
    }else{
        inicioSesionAlumnos()
    }
}

const btnIngresar = document.getElementById('btn-ingresar')

window.addEventListener('keypress', ({key}) => {
    if(key == 'Enter'){
        btnIngresar.click()
    }
})
// ======== REGISTRO.HTML ===========

const guardarAlumnos = () => {
    const nombre = document.getElementById('nombre').value
    const apellido = document.getElementById('apellido').value
    const dni = document.getElementById('dni').value
    const contraseña = document.getElementById('contraseña').value

    if (nombre != '' && apellido != '' && dni != '' && contraseña != '') {
        axios.get(`http://localhost:3005/alumnos/existe/${dni}`)
            .then((resp) => {
                let existe = resp.data[0].existe
                if (existe == 1) {
                    alert('Este dni está siendo usado')
                } else {
                    axios.post('http://localhost:3005/alumnos', {
                        nombre,
                        apellido,
                        dni,
                        contraseña
                    }).then((resp) => {
                        console.log(resp)
                    }).catch((error) => {
                        console.log(error)
                    })
                    console.log('Enviado')

                    alert("Usuario creado")
                }
            })
    } else {
        alert('No debe quedar ningun campo vacio')
    }

}

// ======== PRINCIPAL.HTML ===========

const alumnoActivo = () => {
    const nombreUsuario = document.getElementById('nombreUsuario')
    let usuarioActivoCargado = {}
    usuarioActivoCargado = JSON.parse(localStorage.getItem("usuario"))

    nombreUsuario.innerText = usuarioActivoCargado.nombre
}

const cerrarSesion = () => {
    location.href = "../index.html"
    localStorage.clear()
}

// ========= PERFIL.HMTL ==========
let usuarioActivoCargado = {}
usuarioActivoCargado = JSON.parse(localStorage.getItem("usuario"))

const nombreUsuario = document.getElementById('nombreUsuario')
const apellidoUsuario = document.getElementById('apellidoUsuario')
const dniUsuario = document.getElementById('dniUsuario')
const nombreUsuarioInp = document.getElementById('nombreUsuarioInp')
const apellidoUsuarioInp = document.getElementById('apellidoUsuarioInp')
const dniUsuarioInp = document.getElementById('dniUsuarioInp')
const contraseñaActualUsuarioInp = document.getElementById('contraseñaActualUsuarioInp')
const nuevaContraseñaUsuarioInp = document.getElementById('nuevaContraseñaUsuarioInp')
const confirmarNuevaContraseñaUsuarioInp = document.getElementById('confirmarNuevaContraseñaUsuarioInp')

const contraseñaActualUsuarioP = document.getElementById('contraseñaActualUsuarioP')
const nuevaContraseñaUsuarioP = document.getElementById('nuevaContraseñaUsuarioP')
const confirmarNuevaContraseñaUsuarioP = document.getElementById('confirmarNuevaContraseñaUsuarioP')

const btnCambiar = document.getElementById('btn-Cambiar')
const btnActualizar = document.getElementById('btn-Actualizar')
const btnCancelar = document.getElementById('btn-Cancelar')
const tituloDatos = document.getElementById('titulo-datos')

const perfil = () => {
    nombreUsuario.innerText = usuarioActivoCargado.nombre
    apellidoUsuario.innerText = usuarioActivoCargado.apellido
    dniUsuario.innerText = usuarioActivoCargado.dni
}

const btnCambiarDatos = () => {
    btnCambiar.hidden = true;
    btnActualizar.hidden = false;
    btnCancelar.hidden = false;
    tituloDatos.innerHTML = 'Actualizar Datos'

    nombreUsuarioInp.hidden = false
    nombreUsuario.hidden = true

    apellidoUsuarioInp.hidden = false
    apellidoUsuario.hidden = true

    dniUsuarioInp.hidden = false
    dniUsuario.hidden = true

    contraseñaActualUsuarioP.hidden = false
    contraseñaActualUsuarioInp.hidden = false
    nuevaContraseñaUsuarioP.hidden = false
    nuevaContraseñaUsuarioInp.hidden = false
    confirmarNuevaContraseñaUsuarioP.hidden = false
    confirmarNuevaContraseñaUsuarioInp.hidden = false

    nombreUsuarioInp.value = usuarioActivoCargado.nombre
    apellidoUsuarioInp.value = usuarioActivoCargado.apellido
    dniUsuarioInp.value = usuarioActivoCargado.dni
}

const btnCancelarDatos = () => {
    btnCambiar.hidden = false;
    btnActualizar.hidden = true;
    btnCancelar.hidden = true;
    tituloDatos.innerHTML = 'Datos personales'

    nombreUsuarioInp.hidden = true
    nombreUsuario.hidden = false

    apellidoUsuarioInp.hidden = true
    apellidoUsuario.hidden = false

    dniUsuarioInp.hidden = true
    dniUsuario.hidden = false

    contraseñaActualUsuarioP.hidden = true
    contraseñaActualUsuarioInp.hidden = true
    nuevaContraseñaUsuarioP.hidden = true
    nuevaContraseñaUsuarioInp.hidden = true
    confirmarNuevaContraseñaUsuarioP.hidden = true
    confirmarNuevaContraseñaUsuarioInp.hidden = true
}

const validarContraseñaActual = (contraseñaActual, contraseñaUsuario) => {
    return contraseñaActual == contraseñaUsuario
}

const validarNuevaContraseña = (nuevaContraseña, confirmarNuevaContraseña) => {
    return nuevaContraseña == confirmarNuevaContraseña
}

const comprobarDniExistente = (dni) => {
    return axios.get(`http://localhost:3005/alumnos/existe/${dni}`)
}

const actualizarDatosUsuario = (nombre, apellido, dni, contraseña, tarea1, tarea2, tarea3, tarea4) => {
    return axios.put(`http://localhost:3005/alumnos/${usuarioActivoCargado.idAlumnos}`, {
        nombre,
        apellido,
        dni,
        contraseña,
        tarea1,
        tarea2,
        tarea3,
        tarea4
    })
}

const btnActualizarDatos = async () => {
    let usuarioActivoCargado = {}
    usuarioActivoCargado = JSON.parse(localStorage.getItem("usuario"))

    try {
        const confirmado = confirm('¿Realmente quieres cambiar tus datos?')
        if (!confirmado) return

        const contraseñaActual = contraseñaActualUsuarioInp.value
        if (!validarContraseñaActual(contraseñaActual, usuarioActivoCargado.contraseña)) {
            throw new Error('La contraseña actual no es correcta')
        }

        const nuevaContraseña = nuevaContraseñaUsuarioInp.value
        const confirmarNuevaContraseña = confirmarNuevaContraseñaUsuarioInp.value
        if (!validarNuevaContraseña(nuevaContraseña, confirmarNuevaContraseña)) {
            throw new Error('Las contraseñas no coinciden')
        }

        const dni = dniUsuarioInp.value
        const existeDni = (await comprobarDniExistente(dni)).data[0].existe
        if (existeDni === 1 && dni != usuarioActivoCargado.dni) {
            throw new Error('El DNI ya está siendo utilizado por otro usuario')
        }

        const nombreNuevo = nombreUsuarioInp.value
        const apellidoNuevo = apellidoUsuarioInp.value
        const contraseñaNueva = nuevaContraseñaUsuarioInp.value

        await actualizarDatosUsuario(nombreNuevo, apellidoNuevo, dni, contraseñaNueva, usuarioActivoCargado.tarea1, usuarioActivoCargado.tarea2, usuarioActivoCargado.tarea3, usuarioActivoCargado.tarea4)

        console.log(usuarioActivoCargado.tarea1)
        localStorageInicio(usuarioActivoCargado.idAlumnos, nombreNuevo, apellidoNuevo, dni, contraseñaNueva, usuarioActivoCargado.tarea1, usuarioActivoCargado.tarea2, usuarioActivoCargado.tarea3, usuarioActivoCargado.tarea4)
        alert('Datos guardados con exito')
        btnCancelarDatos()
    }
    catch (error) {
        alert(error.message)
    }
}

// ========== CLASES.HTML ============

const completarTarea = () => {
    let usuarioActivoCargado = {}
    usuarioActivoCargado = JSON.parse(localStorage.getItem("usuario"))

    let tarea1Finalizada = document.getElementById('tarea1Finalizada')

    axios.put(`http://localhost:3005/alumnos/${usuarioActivoCargado.idAlumnos}`, {
        nombre: usuarioActivoCargado.nombre,
        apellido: usuarioActivoCargado.apellido,
        dni: usuarioActivoCargado.dni,
        contraseña: usuarioActivoCargado.contraseña,
        tarea1: '1',
        tarea2: usuarioActivoCargado.tarea2,
        tarea3: usuarioActivoCargado.tarea3,
        tarea4: usuarioActivoCargado.tarea4
    })

    tarea1Finalizada.hidden = true

    console.log('Tarea completada')
}

const tareaCompleta = () => {
    let usuarioActivoCargado = {}
    usuarioActivoCargado = JSON.parse(localStorage.getItem("usuario"))

    axios.get(`http://localhost:3005/alumnos/${usuarioActivoCargado.idAlumnos}`)
        .then((resp) => {
            let tarea1Completa = resp.data[0].tarea1

            if (tarea1Completa == 1) {
                let tarea1Finalizada = document.getElementById('tarea1Finalizada')
                tarea1Finalizada.hidden = true
            }
        })
}