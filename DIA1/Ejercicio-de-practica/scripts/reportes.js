// Módulo de Reportes

const Reportes = {
    // 1. Listar campers inscritos
    campersInscritos() {
        return Campers.listarPorEstado(ESTADOS_CAMPER.INSCRITO);
    },

    // 2. Listar campers que aprobaron examen inicial
    campersAprobados() {
        return Campers.listarPorEstado(ESTADOS_CAMPER.APROBADO);
    },

    // 3. Listar trainers activos
    trainersActivos() {
        return Trainers.listarActivos();
    },

    // 4. Listar campers con bajo rendimiento
    campersBajoRendimiento() {
        return Evaluaciones.obtenerConBajoRendimiento();
    },

    // 5. Listar campers en riesgo
    campersEnRiesgo() {
        return Campers.listarEnRiesgo();
    },

    // 6. Campers y trainers por ruta
    campersPorRuta(rutaID) {
        const ruta = Rutas.buscarPorID(rutaID);
        const matriculas = Matriculas.buscarPorRuta(rutaID);
        const trainers = Trainers.obtenerPorRuta(rutaID);

        const campers = matriculas.map(m => {
            const camper = Campers.buscarPorID(m.camperID);
            return {
                ...camper,
                trainer: Trainers.buscarPorID(m.trainerID)
            };
        });

        return {
            ruta,
            campers,
            trainers,
            totalCampers: campers.length,
            totalTrainers: trainers.length
        };
    },

    // 7. Estadísticas por módulo, ruta y trainer
    estadisticasModulos(rutaID, trainerID = null) {
        const ruta = Rutas.buscarPorID(rutaID);
        
        if (!ruta) {
            throw new Error('Ruta no encontrada');
        }

        let matriculas = Matriculas.buscarPorRuta(rutaID);
        
        if (trainerID) {
            matriculas = matriculas.filter(m => m.trainerID === trainerID);
        }

        const estadisticas = ruta.modulos.map(modulo => {
            let aprobados = 0;
            let reprobados = 0;
            let sinEvaluar = 0;
            let notasPromedio = [];

            matriculas.forEach(matricula => {
                const camper = Campers.buscarPorID(matricula.camperID);
                const evaluacion = camper.modulos?.find(m => m.modulo === modulo.nombre);

                if (!evaluacion) {
                    sinEvaluar++;
                } else {
                    notasPromedio.push(evaluacion.notaFinal);
                    if (evaluacion.aprobado) {
                        aprobados++;
                    } else {
                        reprobados++;
                    }
                }
            });

            const promedio = notasPromedio.length > 0
                ? (notasPromedio.reduce((a, b) => a + b, 0) / notasPromedio.length).toFixed(2)
                : 0;

            return {
                modulo: modulo.nombre,
                aprobados,
                reprobados,
                sinEvaluar,
                total: matriculas.length,
                promedioGeneral: parseFloat(promedio),
                porcentajeAprobacion: matriculas.length > 0 
                    ? ((aprobados / (aprobados + reprobados)) * 100).toFixed(2) 
                    : 0
            };
        });

        return {
            ruta: ruta.nombre,
            trainer: trainerID ? Trainers.buscarPorID(trainerID)?.nombres : 'Todos',
            estadisticas
        };
    },

    // 8. Reporte general del sistema
    reporteGeneral() {
        const statsCampers = Campers.obtenerEstadisticas();
        const trainers = Trainers.listarTodos();
        const rutas = Rutas.listarActivas();
        const matriculas = Matriculas.listarActivas();
        const salones = Matriculas.obtenerEstadisticasSalones();

        return {
            campers: statsCampers,
            totalTrainers: trainers.length,
            totalRutas: rutas.length,
            totalMatriculas: matriculas.length,
            salones: salones
        };
    },

    // 9. Reporte de camper individual
    reporteCamper(camperID) {
        const camper = Campers.buscarPorID(camperID);
        
        if (!camper) {
            throw new Error('Camper no encontrado');
        }

        const matriculas = Matriculas.buscarPorCamper(camperID);
        const evaluaciones = Evaluaciones.obtenerPorCamper(camperID);
        const promedio = Evaluaciones.obtenerPromedio(camperID);

        let ruta = null;
        let trainer = null;
        let salon = null;

        if (matriculas.length > 0) {
            const matriculaActiva = matriculas.find(m => m.activa) || matriculas[0];
            ruta = Rutas.buscarPorID(matriculaActiva.rutaID);
            trainer = Trainers.buscarPorID(matriculaActiva.trainerID);
            const { salones } = Storage.cargarDatos();
            salon = salones.find(s => s.id === matriculaActiva.salonID);
        }

        return {
            camper,
            ruta,
            trainer,
            salon,
            evaluaciones,
            promedio,
            modulosAprobados: evaluaciones.filter(e => e.aprobado).length,
            modulosReprobados: evaluaciones.filter(e => !e.aprobado).length,
            totalModulos: evaluaciones.length
        };
    },

    // 10. Reporte de trainer
    reporteTrainer(trainerID) {
        const trainer = Trainers.buscarPorID(trainerID);
        
        if (!trainer) {
            throw new Error('Trainer no encontrado');
        }

        const matriculas = Matriculas.buscarPorTrainer(trainerID);
        const campers = matriculas.map(m => Campers.buscarPorID(m.camperID));
        
        const estadisticas = {
            totalCampers: campers.length,
            campersAprobados: 0,
            campersReprobados: 0,
            campersSinEvaluar: 0
        };

        campers.forEach(camper => {
            if (!camper.modulos || camper.modulos.length === 0) {
                estadisticas.campersSinEvaluar++;
            } else {
                const aprobado = camper.modulos.every(m => m.aprobado);
                if (aprobado) {
                    estadisticas.campersAprobados++;
                } else {
                    estadisticas.campersReprobados++;
                }
            }
        });

        return {
            trainer,
            matriculas,
            campers,
            estadisticas,
            rutasAsignadas: trainer.rutasAsignadas
        };
    },

    // 11. Comparativa de rutas
    comparativaRutas() {
        const rutas = Rutas.listarActivas();
        
        const comparativa = rutas.map(ruta => {
            const matriculas = Matriculas.buscarPorRuta(ruta.id);
            const campers = matriculas.map(m => Campers.buscarPorID(m.camperID));
            
            let totalAprobados = 0;
            let totalReprobados = 0;
            let promedios = [];

            campers.forEach(camper => {
                if (camper.modulos && camper.modulos.length > 0) {
                    const promedio = Evaluaciones.obtenerPromedio(camper.id);
                    promedios.push(promedio);
                    
                    const aprobado = camper.modulos.every(m => m.aprobado);
                    if (aprobado) {
                        totalAprobados++;
                    } else {
                        totalReprobados++;
                    }
                }
            });

            const promedioGeneral = promedios.length > 0
                ? (promedios.reduce((a, b) => a + b, 0) / promedios.length).toFixed(2)
                : 0;

            return {
                ruta: ruta.nombre,
                totalCampers: campers.length,
                aprobados: totalAprobados,
                reprobados: totalReprobados,
                promedioGeneral: parseFloat(promedioGeneral),
                tasaAprobacion: campers.length > 0 
                    ? ((totalAprobados / campers.length) * 100).toFixed(2) 
                    : 0
            };
        });

        return comparativa;
    },

    // 12. Exportar reporte a texto
    exportarTexto(tipo, datos) {
        let texto = `=== REPORTE: ${tipo.toUpperCase()} ===\n`;
        texto += `Fecha: ${new Date().toLocaleString()}\n\n`;
        texto += JSON.stringify(datos, null, 2);
        
        return texto;
    },

    // 13. Generar todas las estadísticas
    dashboardCompleto() {
        return {
            general: this.reporteGeneral(),
            campersBajoRendimiento: this.campersBajoRendimiento().length,
            campersEnRiesgo: this.campersEnRiesgo().length,
            comparativaRutas: this.comparativaRutas()
        };
    }
};