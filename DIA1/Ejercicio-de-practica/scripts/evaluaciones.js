// Módulo de Evaluaciones

const Evaluaciones = {
    // Registrar evaluación de módulo
    registrar(camperID, moduloNombre, notas) {
        const camper = Campers.buscarPorID(camperID);
        
        if (!camper) {
            throw new Error('Camper no encontrado');
        }

        if (camper.estado !== ESTADOS_CAMPER.CURSANDO) {
            throw new Error('El camper debe estar cursando');
        }

        // Validar notas
        this.validarNotas(notas);

        // Calcular nota final
        const notaFinal = this.calcularNotaFinal(notas);

        // Crear evaluación
        const evaluacion = {
            modulo: moduloNombre,
            notaTeorica: parseFloat(notas.teorica),
            notaPractica: parseFloat(notas.practica),
            notaTrabajos: parseFloat(notas.trabajos),
            notaFinal: notaFinal,
            aprobado: notaFinal >= CONFIG_EVALUACION.NOTA_APROBATORIA,
            fecha: new Date().toISOString()
        };

        // Agregar evaluación al camper
        const { campers } = Storage.cargarDatos();
        const camperActual = campers.find(c => c.id === camperID);
        
        if (!camperActual.modulos) {
            camperActual.modulos = [];
        }

        camperActual.modulos.push(evaluacion);

        // Evaluar riesgo
        if (!evaluacion.aprobado) {
            camperActual.riesgo = true;
        }

        Storage.guardarCampers(campers);

        return evaluacion;
    },

    // Calcular nota final
    calcularNotaFinal(notas) {
        const teorica = parseFloat(notas.teorica) * CONFIG_EVALUACION.PESO_TEORICA;
        const practica = parseFloat(notas.practica) * CONFIG_EVALUACION.PESO_PRACTICA;
        const trabajos = parseFloat(notas.trabajos) * CONFIG_EVALUACION.PESO_TRABAJOS;
        
        return parseFloat((teorica + practica + trabajos).toFixed(2));
    },

    // Validar notas
    validarNotas(notas) {
        const errores = [];

        if (!notas.teorica || notas.teorica < 0 || notas.teorica > 100) {
            errores.push('Nota teórica debe estar entre 0 y 100');
        }

        if (!notas.practica || notas.practica < 0 || notas.practica > 100) {
            errores.push('Nota práctica debe estar entre 0 y 100');
        }

        if (!notas.trabajos || notas.trabajos < 0 || notas.trabajos > 100) {
            errores.push('Nota de trabajos debe estar entre 0 y 100');
        }

        if (errores.length > 0) {
            throw new Error(errores.join(', '));
        }

        return true;
    },

    // Obtener evaluaciones de un camper
    obtenerPorCamper(camperID) {
        const camper = Campers.buscarPorID(camperID);
        
        if (!camper) {
            throw new Error('Camper no encontrado');
        }

        return camper.modulos || [];
    },

    // Obtener promedio de un camper
    obtenerPromedio(camperID) {
        const evaluaciones = this.obtenerPorCamper(camperID);
        
        if (evaluaciones.length === 0) {
            return 0;
        }

        const suma = evaluaciones.reduce((acc, ev) => acc + ev.notaFinal, 0);
        return parseFloat((suma / evaluaciones.length).toFixed(2));
    },

    // Verificar si un camper tiene bajo rendimiento
    tieneBajoRendimiento(camperID) {
        const evaluaciones = this.obtenerPorCamper(camperID);
        return evaluaciones.some(ev => !ev.aprobado);
    },

    // Obtener campers con bajo rendimiento
    obtenerConBajoRendimiento() {
        const { campers } = Storage.cargarDatos();
        
        return campers.filter(camper => {
            if (!camper.modulos || camper.modulos.length === 0) {
                return false;
            }
            return camper.modulos.some(m => !m.aprobado);
        });
    },

    // Estadísticas por módulo
    estadisticasPorModulo(rutaID) {
        const matriculas = Matriculas.buscarPorRuta(rutaID);
        const ruta = Rutas.buscarPorID(rutaID);
        
        if (!ruta) {
            throw new Error('Ruta no encontrada');
        }

        const estadisticas = ruta.modulos.map(modulo => {
            let aprobados = 0;
            let reprobados = 0;
            let sinEvaluar = 0;

            matriculas.forEach(matricula => {
                const camper = Campers.buscarPorID(matricula.camperID);
                const evaluacion = camper.modulos?.find(m => m.modulo === modulo.nombre);

                if (!evaluacion) {
                    sinEvaluar++;
                } else if (evaluacion.aprobado) {
                    aprobados++;
                } else {
                    reprobados++;
                }
            });

            return {
                modulo: modulo.nombre,
                aprobados,
                reprobados,
                sinEvaluar,
                total: matriculas.length
            };
        });

        return estadisticas;
    },

    // Estadísticas por trainer
    estadisticasPorTrainer(trainerID) {
        const matriculas = Matriculas.buscarPorTrainer(trainerID);
        
        let totalAprobados = 0;
        let totalReprobados = 0;
        let totalSinEvaluar = 0;

        matriculas.forEach(matricula => {
            const camper = Campers.buscarPorID(matricula.camperID);
            
            if (!camper.modulos || camper.modulos.length === 0) {
                totalSinEvaluar++;
            } else {
                const aprobado = camper.modulos.every(m => m.aprobado);
                if (aprobado) {
                    totalAprobados++;
                } else {
                    totalReprobados++;
                }
            }
        });

        return {
            trainerID,
            totalCampers: matriculas.length,
            aprobados: totalAprobados,
            reprobados: totalReprobados,
            sinEvaluar: totalSinEvaluar
        };
    },

    // Actualizar evaluación
    actualizar(camperID, moduloNombre, nuevasNotas) {
        const { campers } = Storage.cargarDatos();
        const camper = campers.find(c => c.id === camperID);
        
        if (!camper) {
            throw new Error('Camper no encontrado');
        }

        const evaluacion = camper.modulos?.find(m => m.modulo === moduloNombre);
        
        if (!evaluacion) {
            throw new Error('Evaluación no encontrada');
        }

        // Validar y calcular nueva nota
        this.validarNotas(nuevasNotas);
        const notaFinal = this.calcularNotaFinal(nuevasNotas);

        evaluacion.notaTeorica = parseFloat(nuevasNotas.teorica);
        evaluacion.notaPractica = parseFloat(nuevasNotas.practica);
        evaluacion.notaTrabajos = parseFloat(nuevasNotas.trabajos);
        evaluacion.notaFinal = notaFinal;
        evaluacion.aprobado = notaFinal >= CONFIG_EVALUACION.NOTA_APROBATORIA;

        Storage.guardarCampers(campers);

        return evaluacion;
    },

    // Eliminar evaluación
    eliminar(camperID, moduloNombre) {
        const { campers } = Storage.cargarDatos();
        const camper = campers.find(c => c.id === camperID);
        
        if (!camper) {
            throw new Error('Camper no encontrado');
        }

        const index = camper.modulos?.findIndex(m => m.modulo === moduloNombre);
        
        if (index === -1) {
            throw new Error('Evaluación no encontrada');
        }

        camper.modulos.splice(index, 1);
        Storage.guardarCampers(campers);

        return true;
    }
};