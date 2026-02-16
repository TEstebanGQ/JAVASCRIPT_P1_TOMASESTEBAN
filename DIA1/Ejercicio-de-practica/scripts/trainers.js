// Módulo de Trainers

const Trainers = {
    // Crear nuevo trainer
    crear(datos) {
        const trainer = {
            id: this.generarID(),
            identificacion: datos.identificacion,
            nombres: datos.nombres,
            apellidos: datos.apellidos,
            email: datos.email,
            telefono: datos.telefono,
            especialidades: datos.especialidades || [],
            rutasAsignadas: [],
            horarios: [],
            activo: true,
            fechaRegistro: new Date().toISOString()
        };

        const { trainers } = Storage.cargarDatos();
        trainers.push(trainer);
        Storage.guardarTrainers(trainers);
        
        return trainer;
    },

    // Generar ID único
    generarID() {
        return 'T' + Date.now() + Math.random().toString(36).substr(2, 5);
    },

    // Buscar trainer por ID
    buscarPorID(id) {
        const { trainers } = Storage.cargarDatos();
        return trainers.find(t => t.id === id || t.identificacion === id);
    },

    // Listar todos los trainers
    listarTodos() {
        const { trainers } = Storage.cargarDatos();
        return trainers;
    },

    // Listar trainers activos
    listarActivos() {
        const { trainers } = Storage.cargarDatos();
        return trainers.filter(t => t.activo === true);
    },

    // Asignar ruta a trainer
    asignarRuta(trainerID, rutaID, horario) {
        const { trainers } = Storage.cargarDatos();
        const trainer = trainers.find(t => t.id === trainerID);
        
        if (!trainer) {
            throw new Error('Trainer no encontrado');
        }

        // Verificar conflictos de horario
        const conflicto = trainer.horarios.some(h => 
            h.dia === horario.dia && this.hayConflictoHorario(h, horario)
        );

        if (conflicto) {
            throw new Error('Conflicto de horario detectado');
        }

        trainer.rutasAsignadas.push({
            rutaID,
            fechaAsignacion: new Date().toISOString(),
            activa: true
        });

        trainer.horarios.push({
            rutaID,
            dia: horario.dia,
            horaInicio: horario.horaInicio,
            horaFin: horario.horaFin
        });

        Storage.guardarTrainers(trainers);
        return trainer;
    },

    // Verificar conflicto de horario
    hayConflictoHorario(h1, h2) {
        const inicio1 = this.convertirHoraAMinutos(h1.horaInicio);
        const fin1 = this.convertirHoraAMinutos(h1.horaFin);
        const inicio2 = this.convertirHoraAMinutos(h2.horaInicio);
        const fin2 = this.convertirHoraAMinutos(h2.horaFin);

        return (inicio1 < fin2 && fin1 > inicio2);
    },

    // Convertir hora a minutos
    convertirHoraAMinutos(hora) {
        const [h, m] = hora.split(':').map(Number);
        return h * 60 + m;
    },

    // Actualizar trainer
    actualizar(trainerID, datos) {
        const { trainers } = Storage.cargarDatos();
        const trainer = trainers.find(t => t.id === trainerID);
        
        if (!trainer) {
            throw new Error('Trainer no encontrado');
        }

        Object.assign(trainer, datos);
        Storage.guardarTrainers(trainers);
        
        return trainer;
    },

    // Desactivar trainer
    desactivar(trainerID) {
        const { trainers } = Storage.cargarDatos();
        const trainer = trainers.find(t => t.id === trainerID);
        
        if (!trainer) {
            throw new Error('Trainer no encontrado');
        }

        trainer.activo = false;
        Storage.guardarTrainers(trainers);
        
        return trainer;
    },

    // Eliminar trainer
    eliminar(trainerID) {
        let { trainers } = Storage.cargarDatos();
        const index = trainers.findIndex(t => t.id === trainerID);
        
        if (index === -1) {
            throw new Error('Trainer no encontrado');
        }

        trainers.splice(index, 1);
        Storage.guardarTrainers(trainers);
        
        return true;
    },

    // Obtener trainers por ruta
    obtenerPorRuta(rutaID) {
        const { trainers } = Storage.cargarDatos();
        return trainers.filter(t => 
            t.rutasAsignadas.some(r => r.rutaID === rutaID && r.activa)
        );
    },

    // Validar datos
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

        if (!datos.email || !datos.email.includes('@')) {
            errores.push('Email válido es requerido');
        }

        return errores;
    }
};