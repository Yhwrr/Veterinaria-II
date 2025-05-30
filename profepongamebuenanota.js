// ===========================
// 🧩 Variables globales
// ===========================
const clientes = [];
const mascotas = [];

let idClientes = 1;
let idMascotas = 1;

// ===========================
// 🧩 Utilidades
// ===========================
const generarIdClientes = () => idClientes++;
const generarIdMascotas = () => idMascotas++;

const validarTexto = (texto) => texto.trim() !== "";
const validarNumeroPositivo = (num) => !isNaN(num) && Number(num) > 0;

const estadosValidos = ["Sano", "Enfermo", "En tratamiento"];
const especiesValidas = ["Perro", "Gato", "Ave", "Reptil", "Otro"];

// ===========================
// 🔄 FUNCIONES ASÍNCRONAS
// ===========================

function registrarClienteAsync(callback) {
  const nombre = prompt("Nombre del cliente:");
  const cedula = prompt("Cédula:");
  const telefono = prompt("Teléfono:");
  const correo = prompt("Correo:");

  if (![nombre, cedula, telefono, correo].every(validarTexto)) {
    console.log("❌ Todos los campos deben estar completos.");
    return;
  }

  setTimeout(() => {
    clientes.push({
      id: generarIdClientes(),
      nombre,
      cedula,
      telefono,
      correo
    });
    console.log("✅ Cliente registrado correctamente:");
    console.log(clientes.at(-1));
    callback && callback();
  }, 1500);
}

function registrarMascotaAsync(callback) {
  const nombre = prompt("Nombre de la mascota:");
  const especie = prompt("Especie (Perro, Gato, Ave, Reptil, Otro):");
  const edad = parseInt(prompt("Edad (años):"));
  const peso = parseFloat(prompt("Peso (kg):"));
  const estado = prompt("Estado de salud (Sano, Enfermo, En tratamiento):");
  const cedulaCliente = prompt("Cédula del cliente:");

  if (!validarTexto(nombre) || !especiesValidas.includes(especie)) {
    console.log("❌ Especie o nombre inválidos.");
    return;
  }

  if (!validarNumeroPositivo(edad) || !validarNumeroPositivo(peso)) {
    console.log("❌ Edad y peso deben ser números positivos.");
    return;
  }

  if (!estadosValidos.includes(estado)) {
    console.log("❌ Estado de salud no válido.");
    return;
  }

  setTimeout(() => {
    const cliente = clientes.find(c => c.cedula === cedulaCliente);
    if (!cliente) {
      console.log("❌ Cliente no encontrado.");
      return;
    }

    mascotas.push({
      id: generarIdMascotas(),
      nombre,
      especie,
      edad,
      peso,
      estado,
      idCliente: cliente.id
    });

    console.log("✅ Mascota registrada correctamente:");
    console.log(mascotas.at(-1));
    callback && callback();
  }, 2000);
}

function buscarMascotaAsync(nombre) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const mascota = mascotas.find(m => m.nombre.toLowerCase() === nombre.toLowerCase());
      mascota ? resolve(mascota) : reject("❌ Mascota no encontrada.");
    }, 1500);
  });
}

async function actualizarEstadoAsync() {
  const nombre = prompt("Nombre de la mascota:");
  const nuevoEstado = prompt("Nuevo estado de salud (Sano, Enfermo, En tratamiento):");

  if (!estadosValidos.includes(nuevoEstado)) {
    console.log("❌ Estado no válido.");
    return;
  }

  await new Promise(resolve => setTimeout(resolve, 1000));

  const mascota = mascotas.find(m => m.nombre.toLowerCase() === nombre.toLowerCase());
  if (mascota) {
    mascota.estado = nuevoEstado;
    console.log("✅ Estado actualizado:");
    console.log(mascota);
  } else {
    console.log("❌ Mascota no encontrada.");
  }
}

function eliminarMascotaAsync(nombre) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mascotas.findIndex(m => m.nombre.toLowerCase() === nombre.toLowerCase());
      if (index >= 0) {
        const eliminada = mascotas.splice(index, 1)[0];
        resolve(eliminada);
      } else {
        reject("❌ Mascota no encontrada.");
      }
    }, 2000);
  });
}

async function verMascotasPorCedulaAsync() {
  const cedula = prompt("Cédula del cliente:");
  const cliente = clientes.find(c => c.cedula === cedula);

  if (!cliente) {
    console.log("❌ Cliente no encontrado.");
    return;
  }

  await new Promise(resolve => setTimeout(resolve, 2000));

  const mascotasDelCliente = mascotas.filter(m => m.idCliente === cliente.id);

  if (mascotasDelCliente.length === 0) {
    console.log("ℹ️ Este cliente no tiene mascotas registradas.");
  } else {
    console.log(`✅ Mascotas de ${cliente.nombre}:`);
    mascotasDelCliente.forEach(m => console.log(m));
  }
}

// ===========================
// 📋 MENÚ PRINCIPAL
// ===========================

async function menuAsync() {
  let salir = false;

  while (!salir) {
    const opcion = prompt(
      `📋 MENÚ VETERINARIA\n\n` +
      `1. Registrar cliente\n` +
      `2. Registrar mascota\n` +
      `3. Buscar mascota por nombre\n` +
      `4. Actualizar estado de mascota\n` +
      `5. Eliminar mascota por nombre\n` +
      `6. Ver mascotas de un cliente\n` +
      `0. Salir\n\n` +
      `Elige una opción:`
    );

    switch (opcion) {
      case "1":
        registrarClienteAsync();
        break;
      case "2":
        registrarMascotaAsync();
        break;
      case "3":
        const nombreBuscar = prompt("Nombre de la mascota a buscar:");
        buscarMascotaAsync(nombreBuscar)
          .then(m => console.log("✅ Mascota encontrada:", m))
          .catch(err => console.log(err));
        break;
      case "4":
        await actualizarEstadoAsync();
        break;
      case "5":
        const nombreEliminar = prompt("Nombre de la mascota a eliminar:");
        eliminarMascotaAsync(nombreEliminar)
          .then(m => console.log("🗑️ Mascota eliminada:", m))
          .catch(err => console.log(err));
        break;
      case "6":
        await verMascotasPorCedulaAsync();
        break;
      case "0":
        salir = true;
        console.log("👋 Hasta luego.");
        break;
      default:
        console.log("❌ Opción no válida.");
    }

    await new Promise(resolve => setTimeout(resolve, 1500));
  }
}

// ===========================
// ▶️ Iniciar el programa
// ===========================
menuAsync();
