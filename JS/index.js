class Usuario {
  constructor(nombre, servicio, monto, tasaRetencion, anio, bolsillo) {
    this.nombre = nombre;
    this.servicio = servicio;
    this.monto = monto;
    this.tasaRetencion = tasaRetencion;
    this.anio = anio;
    this.bolsillo = bolsillo;
  }
}
const datosForm = document.querySelector('#datosForm');
const nombre = document.querySelector('#nombre');
const servicio = document.querySelector('#servicio');
const monto = document.querySelector('#monto');
const tasaRetencion = document.querySelector('#tasa');
const anio = document.querySelector('#anioservicio');
const registros = document.querySelector('#registros');
let usuarios = [];
const jsonData = localStorage.getItem('usuarios');
if (jsonData) {
  usuarios = JSON.parse(jsonData);
}

actualizar();
datosForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // evento submit
  const montoValor = parseFloat(monto.value);
  const tasaRetencionValor = parseFloat(tasaRetencion.value);
  // cálculos dentro del evento submit
  const calculo = montoValor * (tasaRetencionValor / 100);
  const bolsillo = montoValor - calculo;
  const usuario = new Usuario(nombre.value, servicio.value, montoValor, tasaRetencionValor, anio.value, bolsillo);
  usuarios.push(usuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  actualizar();
  nombre.value = '';
  servicio.value = '';
  monto.value = '';
  tasaRetencion.value = '';
  anio.value = '';
});

function actualizar() {
  const soloServicio = usuarios.map(u => `${u.servicio} - Retención a pagar: ${u.bolsillo}`);
  registros.innerHTML = soloServicio.join('<br>');

  // uso de promise

  new Promise((espera1, espera2) => {
    setTimeout(() => {
      alert('Gracias por usar nuestra calculadora')
      espera1()
    }, 5_000)
  }).then(() => {
    setTimeout(() => {
      Swal.fire(
        '¿Tienes dudas?',
        'Escríbenos en nuestro formulario de contacto',
        'question'
      )
    }, 5_000)
  })

  // uso libreria 
  let timerInterval
  Swal.fire({
    title: 'Estamos realizando los calculos, favor espera en pantalla',
    html: 'Calculando, listo en <b></b> millisegundos.',
    timer: 2500,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
      const b = Swal.getHtmlContainer().querySelector('b')
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('Cerrando')
    }
  })
}



