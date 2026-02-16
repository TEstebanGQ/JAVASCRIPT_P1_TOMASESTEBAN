// Módulo de Storage - Persistencia de datos con localStorage

const Storage = {
    // Cargar todos los datos
    cargarDatos() {
        try {
            const campers = JSON.parse(localStorage.getItem('campers')) || DATOS_INICIALES.campers;
            const trainers = JSON.parse(localStorage.getItem('trainers')) || DATOS_INICIALES.trainers;
            const rutas = JSON.parse(localStorage.getItem('rutas')) || DATOS_INICIALES.rutas;
            const matriculas = JSON.parse(localStorage.getItem('matriculas')) || DATOS_INICIALES.matriculas;
            const salones = JSON.parse(localStorage.getItem('salones')) || DATOS_INICIALES.salones;
            
            return { campers, trainers, rutas, matriculas, salones };
        } catch (error) {
            console.error('Error al cargar datos:', error);
            return DATOS_INICIALES;
        }
    },

    // Guardar campers
    guardarCampers(campers) {
        try {
            localStorage.setItem('campers', JSON.stringify(campers));
            return true;
        } catch (error) {
            console.error('Error al guardar campers:', error);
            return false;
        }
    },

    // Guardar trainers
    guardarTrainers(trainers) {
        try {
            localStorage.setItem('trainers', JSON.stringify(trainers));
            return true;
        } catch (error) {
            console.error('Error al guardar trainers:', error);
            return false;
        }
    },

    // Guardar rutas
    guardarRutas(rutas) {
        try {
            localStorage.setItem('rutas', JSON.stringify(rutas));
            return true;
        } catch (error) {
            console.error('Error al guardar rutas:', error);
            return false;
        }
    },

    // Guardar matrículas
    guardarMatriculas(matriculas) {
        try {
            localStorage.setItem('matriculas', JSON.stringify(matriculas));
            return true;
        } catch (error) {
            console.error('Error al guardar matrículas:', error);
            return false;
        }
    },

    // Guardar salones
    guardarSalones(salones) {
        try {
            localStorage.setItem('salones', JSON.stringify(salones));
            return true;
        } catch (error) {
            console.error('Error al guardar salones:', error);
            return false;
        }
    },

    // Guardar todos los datos
    guardarTodo(datos) {
        this.guardarCampers(datos.campers);
        this.guardarTrainers(datos.trainers);
        this.guardarRutas(datos.rutas);
        this.guardarMatriculas(datos.matriculas);
        this.guardarSalones(datos.salones);
    },

    // Resetear datos a valores iniciales
    resetear() {
        localStorage.clear();
        return DATOS_INICIALES;
    },

    // Exportar datos a JSON
    exportarJSON() {
        const datos = this.cargarDatos();
        const dataStr = JSON.stringify(datos, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'campus_datos_' + new Date().getTime() + '.json';
        link.click();
    },

    // Importar datos desde JSON
    importarJSON(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const datos = JSON.parse(e.target.result);
                    this.guardarTodo(datos);
                    resolve(datos);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }
};