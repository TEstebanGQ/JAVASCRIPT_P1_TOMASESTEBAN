// Módulo de Rutas

const Rutas = {
    // Crear nueva ruta
    crear(datos) {
        const ruta = {
            id: this.generarID(),
            nombre: datos.nombre,
            modulos: datos.modulos || [],
            duracionMeses: datos.duracionMeses || 6,
            activa: true,
            fechaCreacion: new Date().toISOString()
        };

        const { rutas } = Storage.cargarDatos();
        rutas.push(ruta);
        Storage.guardarRutas(rutas);
        
        return ruta;
    },

    // Generar ID único
    generarID() {
        return 'R' + Date.now().toString().slice(-6);
    },

    // Buscar ruta por ID
    buscarPorID(id) {
        const { rutas } = Storage.cargarDatos();
        return rutas.find(r => r.id === id);
    },

    // Buscar ruta por nombre
    buscarPorNombre(nombre) {
        const { rutas } = Storage.cargarDatos();
        return rutas.find(r => r.nombre.toLowerCase() === nombre.toLowerCase());
    },

    // Listar todas las rutas
    listarTodas() {
        const { rutas } = Storage.cargarDatos();
        return rutas;
    },

    // Listar rutas activas
    listarActivas() {
        const { rutas } = Storage.cargarDatos();
        return rutas.filter(r => r.activa === true);
    },

    // Agregar módulo a ruta
    agregarModulo(rutaID, modulo) {
        const { rutas } = Storage.cargarDatos();
        const ruta = rutas.find(r => r.id === rutaID);
        
        if (!ruta) {
            throw new Error('Ruta no encontrada');
        }

        ruta.modulos.push(modulo);
        Storage.guardarRutas(rutas);
        
        return ruta;
    },

    // Actualizar módulo
    actualizarModulo(rutaID, nombreModulo, nuevosDatos) {
        const { rutas } = Storage.cargarDatos();
        const ruta = rutas.find(r => r.id === rutaID);
        
        if (!ruta) {
            throw new Error('Ruta no encontrada');
        }

        const modulo = ruta.modulos.find(m => m.nombre === nombreModulo);
        
        if (!modulo) {
            throw new Error('Módulo no encontrado');
        }

        Object.assign(modulo, nuevosDatos);
        Storage.guardarRutas(rutas);
        
        return ruta;
    },

    // Eliminar módulo
    eliminarModulo(rutaID, nombreModulo) {
        const { rutas } = Storage.cargarDatos();
        const ruta = rutas.find(r => r.id === rutaID);
        
        if (!ruta) {
            throw new Error('Ruta no encontrada');
        }

        const index = ruta.modulos.findIndex(m => m.nombre === nombreModulo);
        
        if (index === -1) {
            throw new Error('Módulo no encontrado');
        }

        ruta.modulos.splice(index, 1);
        Storage.guardarRutas(rutas);
        
        return ruta;
    },

    // Actualizar ruta
    actualizar(rutaID, datos) {
        const { rutas } = Storage.cargarDatos();
        const ruta = rutas.find(r => r.id === rutaID);
        
        if (!ruta) {
            throw new Error('Ruta no encontrada');
        }

        Object.assign(ruta, datos);
        Storage.guardarRutas(rutas);
        
        return ruta;
    },

    // Desactivar ruta
    desactivar(rutaID) {
        const { rutas } = Storage.cargarDatos();
        const ruta = rutas.find(r => r.id === rutaID);
        
        if (!ruta) {
            throw new Error('Ruta no encontrada');
        }

        ruta.activa = false;
        Storage.guardarRutas(rutas);
        
        return ruta;
    },

    // Eliminar ruta
    eliminar(rutaID) {
        let { rutas } = Storage.cargarDatos();
        const index = rutas.findIndex(r => r.id === rutaID);
        
        if (index === -1) {
            throw new Error('Ruta no encontrada');
        }

        rutas.splice(index, 1);
        Storage.guardarRutas(rutas);
        
        return true;
    },

    // Obtener plantilla de módulo
    obtenerPlantillaModulo() {
        return {
            nombre: "",
            tecnologias: [],
            principal: null,
            alternativo: null
        };
    },

    // Validar datos de ruta
    validarDatos(datos) {
        const errores = [];

        if (!datos.nombre || datos.nombre.trim() === '') {
            errores.push('Nombre de la ruta es requerido');
        }

        if (!datos.modulos || datos.modulos.length === 0) {
            errores.push('Debe tener al menos un módulo');
        }

        return errores;
    },

    // Validar datos de módulo
    validarModulo(modulo) {
        const errores = [];

        if (!modulo.nombre || modulo.nombre.trim() === '') {
            errores.push('Nombre del módulo es requerido');
        }

        if (!modulo.tecnologias || modulo.tecnologias.length === 0) {
            errores.push('Debe tener al menos una tecnología');
        }

        return errores;
    }
};