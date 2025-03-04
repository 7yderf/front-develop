/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable vue/max-len */
/* eslint-disable default-param-last */
// eslint-disable-next-line import/no-extraneous-dependencies
import Swal from 'sweetalert2'

const optionsSweet = {

  toast: {
    position: 'top-end',
    toast: true,
    didOpen: toast => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  },
}

export function showAlert(type, title = '', message = '', timer = 5000) {
  const options = {
    success: {
      iconHtml: '<i class="fas fa-check"></i>',
      title: title || '¡Listo!',
      text: message || 'Operación realizada con éxito',
      timer,
      confirmButtonText: 'Listo',
      confirmButtonColor: 'green',
      showCloseButton: true,
      closeButtonHtml: '<i class="fas fa-times"></i>',
      showConfirmButton: !timer,
      timerProgressBar: !!timer,
      background: '#c5e2c6',
      customClass: {
        container: 'width-alert-toast',
        popup: 'alert-toast',
        icon: 'alert-toast-icon',
        title: 'alert-toast-title',
      },
      ...optionsSweet.toast,
    },
    error: {
      icon: 'error',
      title: title || 'Error',
      text: message || 'Algo salió mal, por favor intenta de nuevo',
      timer,
      confirmButtonText: 'Try again',
      confirmButtonColor: 'red',
      showConfirmButton: !timer,
      timerProgressBar: !!timer,
      customClass: {
        container: 'width-alert-toast',
        popup: 'alert-toast',
      },
      ...optionsSweet.toast,
    },
    warning: {
      icon: 'warning',
      title: title || '¡Atención!',
      text: message || 'Por favor verifica los datos ingresados',
      timer,
      confirmButtonText: 'Ok',
      confirmButtonColor: 'orange',
      showConfirmButton: !timer,
      timerProgressBar: !!timer,
      customClass: {
        container: 'width-alert-toast',
        popup: 'alert-toast',
      },
      ...optionsSweet.toast,
    },
  }

  // si timer es null, no se cerrará automáticamente
  if (!timer) delete options[type].timer
  if (!timer) delete options[type].didOpen

  return Swal.fire(options[type])
}

export async function showConfirm(message = '¿Estás seguro de realizar esta acción?', confirmText = 'Sí, estoy seguro', type = 'error', cancelText = 'Cancelar') {
  const result = await Swal.fire({
    icon: type,
    title: message,
    text: '',
    cancelButtonText: cancelText,
    showCancelButton: true,
    confirmButtonText: confirmText,
    allowOutsideClick: false,
    customClass: {
      confirmButton: 'btn btn-primary rounded-pill mt-2',
      cancelButton: 'btn btn-secondary rounded-pill mt-2',
      actions: 'flex-row-reverse',
      title: 'alert-toast-title-bar',
      container: 'alert-toast-container',
    },
    width: '40rem',
  })
  return result
}
export async function showConfirmDelete(title = 'Eliminar', confirmText = 'Sí, estoy seguro', message = '¿Está seguro de que desea eliminar este CFDI? Esta acción no se puede deshacer.') {
  const result = await Swal.fire({
    icon: 'warning',
    title,
    text: message,
    cancelButtonText: 'Cancelar',
    showCancelButton: true,
    confirmButtonText: confirmText,
    allowOutsideClick: false,
    showCloseButton: true,
    customClass: {
      popup: 'swal2-popup-delete',
      closeButton: 'swal2-close-delete',
      icon: 'swal2-icon-delete',
      title: 'swal2-title-delete',
      htmlContainer: 'swal2-html-container-delete p-5 my-5',
      actions: 'flex-row-reverse m-0 w-100 justify-content-start px-5 py-3 swal2-actions-delete',
      confirmButton: 'btn btn-primary rounded-pill mt-2',
      cancelButton: 'btn btn-secondary rounded-pill mt-2',
    },
  })
  return result
}
export async function showConfirmProgress(title = 'Consultando al SAT', message) {
  const result = await Swal.fire({
    imageUrl: 'https://imr.demosturn.com/media/logos/imr-logo.png', // Aquí pones la URL de la imagen
    imageHeight: 60, // Puedes ajustar el tamaño de la imagen
    imageAlt: 'Logo IMR',
    title,
    html: `
      <div class="swal-container-bar">
        <div class="progress-bar">
          <div class="progress-bar-value"></div>
        </div>
      </div>
      <p class="swal-message-bar" >${message}</p>
    `,
    text: message,
    showCancelButton: true,
    confirmButtonText: 'Esperar',
    cancelButtonText: 'Cancelar',
    heightAuto: false,
    allowOutsideClick: false,
    customClass: {
      confirmButton: 'btn btn-primary rounded-pill mt-2',
      cancelButton: 'btn btn-secondary rounded-pill mt-2',
      actions: 'flex-row-reverse',
      title: 'alert-toast-title-bar',
      container: 'alert-toast-container',
    },
  })
  return result
}

export async function geneticAlert(title = 'Algo salió mal, por favor intente de nuevo.', message, type, timer = 50000) {
  return Swal.fire({
    icon: type,
    title,
    text: message,
    timer,
    confirmButtonText: `${type === 'error' ? 'Try again' : 'Done'}`,
    heightAuto: false,
    customClass: {
      confirmButton: `sweet__btn sweet__btn--${type}`,
    },
  })
}
export async function genericAlertWhite(title = 'Algo salió mal, por favor intente de nuevo.', message, type, timer = 5000) {
  return Swal.fire({
    icon: type,
    title,
    text: message,
    timer,
    confirmButtonText: 'Aceptar',
    heightAuto: false,
    allowOutsideClick: false,
    customClass: {
      confirmButton: 'btn btn-primary rounded-pill mt-2',
      container: 'alert-toast-container',
    },
  })
}
export async function alertProgress(title = 'Procesando ', message, img, timer = 35000) {
  return Swal.fire({
    imageUrl: `http://localhost:8080/${img}`, // Aquí pones la URL de la imagen
    imageHeight: 200, // Puedes ajustar el tamaño de la imagen
    imageAlt: 'Logo IMR',
    title,
    html: `
      <p class="swal-message-bar" >${message}</p>
      
    `,
    text: message,
    timer,
    heightAuto: false,
    allowOutsideClick: false,
    confirmButtonText: 'Aceptar',
    customClass: {
      title: 'alert-toast-title-bar',
      container: 'alert-toast-container',
      confirmButton: 'btn btn-primary rounded-pill mt-2',
      image: 'alert-image-winner',
    },
  })
}
