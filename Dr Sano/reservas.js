// reservas.js - Lógica del formulario de reservas (solo para la página reservas.html)

(function() {
  const form = document.getElementById('reservaForm');
  const mensajeDiv = document.getElementById('mensajeReserva');

  if (!form) return; // Si no existe el formulario, no ejecutar

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener valores del formulario
    const nombre = document.getElementById('nombrePaciente').value.trim();
    const email = document.getElementById('emailPaciente').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const especialidad = document.getElementById('especialidadReserva').value;
    const fecha = document.getElementById('fechaReserva').value;
    const hora = document.getElementById('horaReserva').value;
    const comentarios = document.getElementById('comentarios').value.trim();

    // Validaciones
    if (nombre === "") {
      mostrarMensaje("❌ Por favor, ingresa tu nombre completo.", "danger");
      return;
    }
    
    if (email === "" || !email.includes("@") || !email.includes(".")) {
      mostrarMensaje("❌ Ingresa un correo electrónico válido.", "danger");
      return;
    }
    
    if (fecha === "") {
      mostrarMensaje("❌ Selecciona una fecha para tu reserva.", "danger");
      return;
    }
    
    // Validar que la fecha no sea anterior a hoy
    const fechaSeleccionada = new Date(fecha);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    if (fechaSeleccionada < hoy) {
      mostrarMensaje("⚠️ La fecha no puede ser anterior al día de hoy. Elige una fecha futura.", "warning");
      return;
    }

    // Simular reserva exitosa
    const mensajeExito = `✅ ¡Reserva solicitada, ${nombre}! Hemos registrado tu cita para ${especialidad} el día ${fecha} a las ${hora}. Te enviaremos un correo a ${email} con la confirmación. Nuestro equipo se pondrá en contacto.`;
    mostrarMensaje(mensajeExito, "success");

    // Limpiar formulario después del envío exitoso
    form.reset();
    document.getElementById('especialidadReserva').value = "Cardiología";
    document.getElementById('horaReserva').value = "10:00";
  });

  function mostrarMensaje(mensaje, tipo) {
    mensajeDiv.textContent = mensaje;
    mensajeDiv.classList.remove('d-none', 'alert-success', 'alert-danger', 'alert-warning');
    
    if (tipo === 'success') {
      mensajeDiv.classList.add('alert-success');
    } else if (tipo === 'danger') {
      mensajeDiv.classList.add('alert-danger');
    } else if (tipo === 'warning') {
      mensajeDiv.classList.add('alert-warning');
    }
    
    // Scroll suave al mensaje
    mensajeDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Ocultar mensaje después de 6 segundos
    setTimeout(() => {
      mensajeDiv.classList.add('d-none');
    }, 6000);
  }
})();