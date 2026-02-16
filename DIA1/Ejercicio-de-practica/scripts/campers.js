// Módulo de Campers

const Campers = {
    // Crear nuevo camper
    crear(datos) {
        const camper = {
            id: this.generarID(),
            identificacion: datos.identificacion,
            nombres: datos.nombres,
            apellidos: datos.apellidos,
            direccion: datos.direccion,
            acudiente: datos.acudiente,
            telefonos: {
                celular: datos.celular,
                fijo: datos.fijo
            },
            estado: ESTADOS_CAMPER.INSCRITO,
            riesgo: false,
            notaExamenInicial: null,
            rutaAsignada: null,
            modulos: [],
            fechaRegistro: new Date().toISOString()
        };

        const { campers } = Storage.cargarDatos();
        campers.push(camper);
        Storage.guardarCampers(campers);
        
        return camper;
    },

    // Generar ID único
    generarID() {
        return 'C' + Date.now() + Math.random().toString(36).substr(2, 5);
    },

    // Buscar camper por ID
    buscarPorID(id) {
        const { campers } = Storage.cargarDatos();
        return campers.find(c => c.id === id || c.identificacion === id);
    },

    // Listar todos los campers
    listarTodos() {
        const { campers } = Storage.cargarDatos();
        return campers;
    },

    // Listar por estado
    listarPorEstado(estado) {
        const { campers } = Storage.cargarDatos();
        return campers.filter(c => c.estado === estado);
    },

    // Registrar nota de examen inicial
    registrarNotaInicial(camperID, notaTeorica, notaPractica) {
        const { campers } = Storage.cargarDatos();
        const camper = campers.find(c => c.id === camperID);
        
        if (!camper) {
            throw new Error('Camper no encontrado');
        }

        if (camper.estado !== ESTADOS_CAMPER.INSCRITO) {
            throw new Error('El camper debe estar en estado Inscrito');
        }

        const promedio = (parseFloat(notaTeorica) + parseFloat(notaPractica)) / 2;
        
        camper.notaExamenInicial = {
            teorica: parseFloat(notaTeorica),
            practica: parseFloat(notaPractica),
            promedio: promedio,
            aprobado: promedio >= CONFIG_EVALUACION.NOTA_APROBATORIA,
            fecha: new Date().toISOString()
        };

        if (camper.notaExamenInicial.aprobado) {
            camper.estado = ESTADOS_CAMPER.APROBADO;
        }

        Storage.guardarCampers(campers);
        return camper;
    },

    // Actualizar estado
    actualizarEstado(camperID, nuevoEstado) {
        const { campers } = Storage.cargarDatos();
        const camper = campers.find(c => c.id === camperID);
        
        if (!camper) {
            throw new Error('Camper no encontrado');
        }

        if (!Object.values(ESTADOS_CAMPER).includes(nuevoEstado)) {
            throw new Error('Estado inválido');
        }

        camper.estado = nuevoEstado;
        Storage.guardarCampers(campers);
        
        return camper;
    },

    // Actualizar riesgo
    actualizarRiesgo(camperID, enRiesgo) {
        const { campers } = Storage.cargarDatos();
        const camper = campers.find(c => c.id === camperID);
        
        if (!camper) {
            throw new Error('Camper no encontrado');
        }

        camper.riesgo = enRiesgo;
        Storage.guardarCampers(campers);
        
        return camper;
    },

    // Listar campers en riesgo
    listarEnRiesgo() {
        const { campers } = Storage.cargarDatos();
        return campers.filter(c => c.riesgo === true);
    },

    // Actualizar datos de camper
    actualizar(camperID, datos) {
        const { campers } = Storage.cargarDatos();
        const camper = campers.find(c => c.id === camperID);
        
        if (!camper) {
            throw new Error('Camper no encontrado');
        }

        Object.assign(camper, datos);
        Storage.guardarCampers(campers);
        
        return camper;
    },

    // Eliminar camper
    eliminar(camperID) {
        let { campers } = Storage.cargarDatos();
        const index = campers.findIndex(c => c.id === camperID);
        
        if (index === -1) {
            throw new Error('Camper no encontrado');
        }

        campers.splice(index, 1);
        Storage.guardarCampers(campers);
        
        return true;
    },

    // Obtener estadísticas
    obtenerEstadisticas() {
        const { campers } = Storage.cargarDatos();
        
        return {
            total: campers.length,
            inscritos: campers.filter(c => c.estado === ESTADOS_CAMPER.INSCRITO).length,
            aprobados: campers.filter(c => c.estado === ESTADOS_CAMPER.APROBADO).length,
            cursando: campers.filter(c => c.estado === ESTADOS_CAMPER.CURSANDO).length,
            graduados: campers.filter(c => c.estado === ESTADOS_CAMPER.GRADUADO).length,
            enRiesgo: campers.filter(c => c.riesgo === true).length
        };
    },

    // Validar campos
    validarDatos(datos) {
        const errores = [];

        if (!datos.identificacion || datos.identificacion.trim() === '') {
            errores.push('Identificación es requerida');
        }

        if (!datos.nombres || datos.nombres.trim() === '') {
            errores.push('Nombres son requeridos');
        }

        if (!datos.apellidos || datos.apellidos.trim() === '') {
            errores.push('Apellidos son requeridos');
        }

        if (!datos.celular || datos.celular.trim() === '') {
            errores.push('Teléfono celular es requerido');
        }

        return errores;
    }
};