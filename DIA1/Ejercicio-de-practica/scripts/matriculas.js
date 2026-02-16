// Módulo de Matrículas

const Matriculas = {
    // Crear nueva matrícula
    crear(datos) {
        // Validar que el camper esté aprobado
        const camper = Campers.buscarPorID(datos.camperID);
        if (!camper) {
            throw new Error('Camper no encontrado');
        }
        
        if (camper.estado !== ESTADOS_CAMPER.APROBADO) {
            throw new Error('El camper debe estar en estado Aprobado');
        }

        // Validar que la ruta exista
        const ruta = Rutas.buscarPorID(datos.rutaID);
        if (!ruta) {
            throw new Error('Ruta no encontrada');
        }

        // Validar que el trainer exista
        const trainer = Trainers.buscarPorID(datos.trainerID);
        if (!trainer) {
            throw new Error('Trainer no encontrado');
        }

        // Validar capacidad del salón
        const { salones } = Storage.cargarDatos();
        const salon = salones.find(s => s.id === datos.salonID);
        
        if (!salon) {
            throw new Error('Salón no encontrado');
        }

        if (salon.ocupacion >= salon.capacidad) {
            throw new Error('El salón ha alcanzado su capacidad máxima');
        }

        // Crear matrícula
        const matricula = {
            id: this.generarID(),
            camperID: datos.camperID,
            rutaID: datos.rutaID,
            trainerID: datos.trainerID,
            salonID: datos.salonID,
            fechaInicio: datos.fechaInicio || new Date().toISOString(),
            fechaFin: datos.fechaFin || this.calcularFechaFin(datos.fechaInicio, ruta.duracionMeses),
            horario: datos.horario || "Lun-Vie 8:00-12:00",
            activa: true,
            fechaMatricula: new Date().toISOString()
        };

        const { matriculas } = Storage.cargarDatos();
        matriculas.push(matricula);
        Storage.guardarMatriculas(matriculas);

        // Actualizar ocupación del salón
        salon.ocupacion++;
        Storage.guardarSalones(salones);

        // Actualizar estado del camper
        Campers.actualizarEstado(datos.camperID, ESTADOS_CAMPER.CURSANDO);

        // Actualizar ruta asignada del camper
        camper.rutaAsignada = datos.rutaID;
        Storage.guardarCampers([camper]);

        return matricula;
    },

    // Generar ID único
    generarID() {
        return 'M' + Date.now() + Math.random().toString(36).substr(2, 5);
    },

    // Calcular fecha de finalización
    calcularFechaFin(fechaInicio, meses) {
        const fecha = new Date(fechaInicio);
        fecha.setMonth(fecha.getMonth() + meses);
        return fecha.toISOString();
    },

    // Buscar matrícula por ID
    buscarPorID(id) {
        const { matriculas } = Storage.cargarDatos();
        return matriculas.find(m => m.id === id);
    },

    // Buscar matrículas por camper
    buscarPorCamper(camperID) {
        const { matriculas } = Storage.cargarDatos();
        return matriculas.filter(m => m.camperID === camperID);
    },

    // Buscar matrículas por ruta
    buscarPorRuta(rutaID) {
        const { matriculas } = Storage.cargarDatos();
        return matriculas.filter(m => m.rutaID === rutaID);
    },

    // Buscar matrículas por trainer
    buscarPorTrainer(trainerID) {
        const { matriculas } = Storage.cargarDatos();
        return matriculas.filter(m => m.trainerID === trainerID);
    },

    // Buscar matrículas por salón
    buscarPorSalon(salonID) {
        const { matriculas } = Storage.cargarDatos();
        return matriculas.filter(m => m.salonID === salonID);
    },

    // Listar todas las matrículas
    listarTodas() {
        const { matriculas } = Storage.cargarDatos();
        return matriculas;
    },

    // Listar matrículas activas
    listarActivas() {
        const { matriculas } = Storage.cargarDatos();
        return matriculas.filter(m => m.activa === true);
    },

    // Finalizar matrícula
    finalizar(matriculaID) {
        const { matriculas } = Storage.cargarDatos();
        const matricula = matriculas.find(m => m.id === matriculaID);
        
        if (!matricula) {
            throw new Error('Matrícula no encontrada');
        }

        matricula.activa = false;
        matricula.fechaFinalizacion = new Date().toISOString();
        Storage.guardarMatriculas(matriculas);

        // Liberar espacio en salón
        const { salones } = Storage.cargarDatos();
        const salon = salones.find(s => s.id === matricula.salonID);
        if (salon && salon.ocupacion > 0) {
            salon.ocupacion--;
            Storage.guardarSalones(salones);
        }

        return matricula;
    },

    // Obtener detalles completos de matrícula
    obtenerDetalles(matriculaID) {
        const matricula = this.buscarPorID(matriculaID);
        
        if (!matricula) {
            throw new Error('Matrícula no encontrada');
        }

        const camper = Campers.buscarPorID(matricula.camperID);
        const ruta = Rutas.buscarPorID(matricula.rutaID);
        const trainer = Trainers.buscarPorID(matricula.trainerID);
        const { salones } = Storage.cargarDatos();
        const salon = salones.find(s => s.id === matricula.salonID);

        return {
            ...matricula,
            camper,
            ruta,
            trainer,
            salon
        };
    },

    // Actualizar matrícula
    actualizar(matriculaID, datos) {
        const { matriculas } = Storage.cargarDatos();
        const matricula = matriculas.find(m => m.id === matriculaID);
        
        if (!matricula) {
            throw new Error('Matrícula no encontrada');
        }

        Object.assign(matricula, datos);
        Storage.guardarMatriculas(matriculas);
        
        return matricula;
    },

    // Obtener estadísticas de salones
    obtenerEstadisticasSalones() {
        const { salones, matriculas } = Storage.cargarDatos();
        
        return salones.map(salon => {
            const matriculasActivas = matriculas.filter(m => 
                m.salonID === salon.id && m.activa
            );

            return {
                ...salon,
                porcentajeOcupacion: (salon.ocupacion / salon.capacidad * 100).toFixed(2),
                disponibles: salon.capacidad - salon.ocupacion,
                matriculasActivas: matriculasActivas.length
            };
        });
    },

    // Validar datos
    validarDatos(datos) {
        const errores = [];

        if (!datos.camperID) {
            errores.push('Camper es requerido');
        }

        if (!datos.rutaID) {
            errores.push('Ruta es requerida');
        }

        if (!datos.trainerID) {
            errores.push('Trainer es requerido');
        }

        if (!datos.salonID) {
            errores.push('Salón es requerido');
        }

        return errores;
    }
};