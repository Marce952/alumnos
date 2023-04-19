let pagina = "Clases/Principal.html";
let host = 'https://apialumnos.netlify.app/api'
// let host = 'http://localhost:3005'
// let host = 'http://localhost:3000/api'

// ======== INDEX.HTML ==========



const localStorageInicio = (idAlumnos, nombre, apellido, dni, password, tarea1, tarea2, tarea3, tarea4) => {
    let usuarioLocal = {
        idAlumnos,
        nombre,
        apellido,
        dni,
        password,
        tarea1,
        tarea2,
        tarea3,
        tarea4
    }

    localStorage.setItem("usuario", JSON.stringify(usuarioLocal))
}

const cargarAlumnos = () => {
    axios.get(`${host}/alumnos`)
        .then((resp) => {
            console.log(resp)
        }).catch((error) => {
            console.log(error)
        })

    console.log('ando')
}

const inicioSesionAlumnos = () => {
    const dniInicio = document.getElementById('dni').value
    const passwordInicio = document.getElementById('password').value

    if (dniInicio == '' || passwordInicio == '') {
        alert('Ingresar dni y password')
    } else {
        axios.get(`${host}/alumnos/existe/${dniInicio}`)
            .then((resp) => {
                let existe = resp.data[0].existe

                if (existe == 0) {
                    alert('Este usuario no existe')
                } else {
                    axios.get(`${host}/alumnos/dni/${dniInicio}`)
                        .then((resp) => {
                            let dniBD = resp.data[0].dni
                            let contra = resp.data[0].password

                            if (passwordInicio == contra && dniInicio == dniBD) {
                                let usuarioActivo = resp.data[0]

                                let idAlumnos = usuarioActivo.idAlumnos
                                let nombre = usuarioActivo.nombre
                                let apellido = usuarioActivo.apellido
                                let dni = usuarioActivo.dni
                                let password = usuarioActivo.password
                                let tarea1 = usuarioActivo.tarea1
                                let tarea2 = usuarioActivo.tarea2
                                let tarea3 = usuarioActivo.tarea3
                                let tarea4 = usuarioActivo.tarea4


                                localStorageInicio(idAlumnos, nombre, apellido, dni, password, tarea1, tarea2, tarea3, tarea4)

                                location.href = pagina
                                console.log('password y usuario correctos')
                            } else {
                                alert('El usuario no coincide con la password')
                            }
                        })
                }
            })
    }
}

const inicioSesionAdmin = () => {
    let paginaAdmin = "Administrador/admin.html"
    const legajo = document.getElementById('dni').value
    const passwordAdmin = document.getElementById('password').value

    if (legajo == '' || passwordAdmin == '') {
        alert('Ingresar dni y password')
    } else {
        axios.get(`${host}/administrador/legajo/${legajo}`)
            .then((resp) => {
                let legajoBD = resp.data[0].legajo
                let contraBD = resp.data[0].password

                if (legajo == legajoBD && passwordAdmin == contraBD) {
                    let adminActivo = resp.data[0]
                    let idAdministrador = adminActivo.idAdministrador
                    let legajo = adminActivo.legajo
                    let password = adminActivo.password

                    location.href = paginaAdmin
                    console.log('password y usuario correctos')
                } else {
                    alert('El usuario no coincide con la password')
                }
            })
    }

}

const inicioSesion = () => {
    const dniInicio = document.getElementById('dni').value

    if (dniInicio == '20045') {
        inicioSesionAdmin()
    } else {
        inicioSesionAlumnos()
    }
}

const btnIngresar = document.getElementById('btn-ingresar')

window.addEventListener('keypress', ({ key }) => {
    if (key == 'Enter') {
        btnIngresar.click()
    }
})
// ======== REGISTRO.HTML ===========

const guardarAlumnos = () => {
    const nombre = document.getElementById('nombre').value
    const apellido = document.getElementById('apellido').value
    const dni = document.getElementById('dni').value
    const password = document.getElementById('password').value
    const confirmarPassword = document.getElementById('confirmarPassword').value

    if (nombre != '' && apellido != '' && dni != '' && password != '' & password.length >= '8') {
        if(password == confirmarPassword){
            axios.get(`${host}/alumnos/existe/${dni}`)
            .then((resp) => {
                let existe = resp.data[0].existe
                if (existe == 1) {
                    alert('Este dni está siendo usado')
                } else {
                    axios.post(`${host}/alumnos`, {
                        nombre,
                        apellido,
                        dni,
                        password
                    }).then((resp) => {
                        console.log(resp)
                    }).catch((error) => {
                        console.log(error)
                    })
                    console.log('Enviado')

                    alert("Usuario creado")
                    location.href = '../index.html'
                }
            })
        }else{
            alert('Las contraseñas no coinciden')
        }
    } else {
        alert('No debe quedar ningun campo vacio y la password debe ser Mayor a 8 caracteres')
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
const passwordActualUsuarioInp = document.getElementById('passwordActualUsuarioInp')
const nuevapasswordUsuarioInp = document.getElementById('nuevapasswordUsuarioInp')
const confirmarNuevapasswordUsuarioInp = document.getElementById('confirmarNuevapasswordUsuarioInp')

const passwordActualUsuarioP = document.getElementById('passwordActualUsuarioP')
const nuevapasswordUsuarioP = document.getElementById('nuevapasswordUsuarioP')
const confirmarNuevapasswordUsuarioP = document.getElementById('confirmarNuevapasswordUsuarioP')

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

    passwordActualUsuarioP.hidden = false
    passwordActualUsuarioInp.hidden = false
    nuevapasswordUsuarioP.hidden = false
    nuevapasswordUsuarioInp.hidden = false
    confirmarNuevapasswordUsuarioP.hidden = false
    confirmarNuevapasswordUsuarioInp.hidden = false

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

    passwordActualUsuarioP.hidden = true
    passwordActualUsuarioInp.hidden = true
    nuevapasswordUsuarioP.hidden = true
    nuevapasswordUsuarioInp.hidden = true
    confirmarNuevapasswordUsuarioP.hidden = true
    confirmarNuevapasswordUsuarioInp.hidden = true

    location.reload()
}

const validarpasswordActual = (passwordActual, passwordUsuario) => {
    return passwordActual == passwordUsuario
}

const validarNuevapassword = (nuevapassword, confirmarNuevapassword) => {
    return nuevapassword == confirmarNuevapassword
}

const comprobarDniExistente = (dni) => {
    return axios.get(`${host}/alumnos/existe/${dni}`)
}

const actualizarDatosUsuario = (nombre, apellido, dni, password, tarea1, tarea2, tarea3, tarea4) => {
    return axios.put(`${host}/alumnos/${usuarioActivoCargado.idAlumnos}`, {
        nombre,
        apellido,
        dni,
        password,
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

        const passwordActual = passwordActualUsuarioInp.value
        if (!validarpasswordActual(passwordActual, usuarioActivoCargado.password)) {
            throw new Error('La contraseña actual no es correcta')
        }

        const nuevapassword = nuevapasswordUsuarioInp.value
        const confirmarNuevapassword = confirmarNuevapasswordUsuarioInp.value

        if (!validarNuevapassword(nuevapassword, confirmarNuevapassword)) {
            throw new Error('Las contraseñas no coinciden')
        }

        const dni = dniUsuarioInp.value
        const existeDni = (await comprobarDniExistente(dni)).data[0].existe
        if (existeDni === 1 && dni != usuarioActivoCargado.dni) {
            throw new Error('El DNI ya está siendo utilizado por otro usuario')
        }

        const nombreNuevo = nombreUsuarioInp.value
        const apellidoNuevo = apellidoUsuarioInp.value

        let passwordNueva = passwordActual; // Se inicializa con la password actual
        if (nuevapassword && confirmarNuevapassword && validarNuevapassword(nuevapassword, confirmarNuevapassword)) {
            passwordNueva = nuevapassword; // Se actualiza con la nueva password
        }

        await actualizarDatosUsuario(nombreNuevo, apellidoNuevo, dni, passwordNueva, usuarioActivoCargado.tarea1, usuarioActivoCargado.tarea2, usuarioActivoCargado.tarea3, usuarioActivoCargado.tarea4)
        
        localStorageInicio(usuarioActivoCargado.idAlumnos, nombreNuevo, apellidoNuevo, dni, passwordNueva, usuarioActivoCargado.tarea1, usuarioActivoCargado.tarea2, usuarioActivoCargado.tarea3, usuarioActivoCargado.tarea4)
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

    axios.put(`${host}/alumnos/${usuarioActivoCargado.idAlumnos}`, {
        nombre: usuarioActivoCargado.nombre,
        apellido: usuarioActivoCargado.apellido,
        dni: usuarioActivoCargado.dni,
        password: usuarioActivoCargado.password,
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

    axios.get(`${host}/alumnos/${usuarioActivoCargado.idAlumnos}`)
        .then((resp) => {
            let tarea1Completa = resp.data[0].tarea1

            if (tarea1Completa == 1) {
                let tarea1Finalizada = document.getElementById('tarea1Finalizada')
                tarea1Finalizada.hidden = true
            }
        })
}
