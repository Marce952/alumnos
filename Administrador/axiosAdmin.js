// let host = 'https://apialumnos.netlify.app/api'
let host = 'http://localhost:3005'
// let host = 'http://localhost:3000/api'

const irAPrincipal = () => {
    let paginaPrincipal = "../Clases/Principal.html"
    location.href = paginaPrincipal
}

const irAAlumnos = () => {
    let paginaAlumnos = "alumnos.html"
    location.href = paginaAlumnos
}

const salir = () => {
    let paginaIndex = "../index.html"
    location.href = paginaIndex
}

const listadoDeAlumnos = () => {
    axios.get(`${host}/alumnos`)
        .then((resp) => {
            let tdNombre = document.getElementById('tdNombre')
            let tdApellido = document.getElementById('tdApellido')
            let tdTarea1 = document.getElementById('tdTarea1')
            let tdTarea2 = document.getElementById('tdTarea2')
            let tdTarea3 = document.getElementById('tdTarea3')
            let tdTarea4 = document.getElementById('tdTarea4')

            for (let i = 0; i < resp.data.length; i++) {
                const pNombre = document.createElement('p')
                const pApellido = document.createElement('p')
                const pDNI = document.createElement('p')
                const pTarea1 = document.createElement('p')
                const pTarea2 = document.createElement('p')
                const pTarea3 = document.createElement('p')
                const pTarea4 = document.createElement('p')

                pNombre.textContent = resp.data[i].nombre
                pApellido.textContent = resp.data[i].apellido
                pDNI.textContent = resp.data[i].dni
                pTarea1.textContent = resp.data[i].tarea1
                pTarea2.textContent = resp.data[i].tarea2
                pTarea3.textContent = resp.data[i].tarea3
                pTarea4.textContent = resp.data[i].tarea4

                tdNombre.appendChild(pNombre)
                tdApellido.appendChild(pApellido)
                tdDNI.appendChild(pDNI)

                pTarea1.textContent = resp.data[i].tarea1 == 1 ? 'S' : 'N'
                pTarea2.textContent = resp.data[i].tarea2 == 1 ? 'S' : 'N'
                pTarea3.textContent = resp.data[i].tarea3 == 1 ? 'S' : 'N'
                pTarea4.textContent = resp.data[i].tarea4 == 1 ? 'S' : 'N'

                tdTarea1.appendChild(pTarea1)
                tdTarea2.appendChild(pTarea2)
                tdTarea3.appendChild(pTarea3)
                tdTarea4.appendChild(pTarea4)
            }
        }).catch((error) => {
            console.log(error)
        })
}
