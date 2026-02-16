// Archivo principal - main.js
// Manejo de la interfaz y flujo de la aplicación

let usuarioActual = null;
let datos = {};

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', () => {
    datos = Storage.cargarDatos();
    mostrarSeccion('loginSection');
});

// Funciones de navegación
function mostrarSeccion(seccionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    document.getElementById(seccionId).classList.remove('hidden');
}

function iniciarSesion() {
    const rol = document.getElementById('rolSelect').value;
    usuarioActual = { rol };
    
    document.getElementById('userInfo').innerHTML = `
        <span>👤 Rol: <strong>${rol}</strong></span>
    `;
    
    mostrarMenu();
    mostrarSeccion('menuSection');
}

function cerrarSesion() {
    usuarioActual = null;
    document.getElementById('userInfo').innerHTML = '';
    mostrarSeccion('loginSection');
}

function volverMenu() {
    mostrarSeccion('menuSection');
}

// Mostrar menú según rol
function mostrarMenu() {
    const menuOptions = document.getElementById('menuOptions');
    menuOptions.innerHTML = '';
    
    const opciones = obtenerOpcionesPorRol(usuarioActual.rol);
    
    opciones.forEach(opcion => {
        const btn = document.createElement('button');
        btn.className = 'menu-item';
        btn.textContent = opcion.texto;
        btn.onclick = opcion.accion;
        menuOptions.appendChild(btn);
    });
}

// Obtener opciones de menú por rol
function obtenerOpcionesPorRol(rol) {
    const menuCoordinador = [
        { texto: '👤 Registrar Camper', accion: () => mostrarFormulario('registrarCamper') },
        { texto: '👨‍🏫 Registrar Trainer', accion: () => mostrarFormulario('registrarTrainer') },
        { texto: '🛣️ Crear Ruta', accion: () => mostrarFormulario('crearRuta') },
        { texto: '📝 Registrar Nota Inicial', accion: () => mostrarFormulario('notaInicial') },
        { texto: '📚 Matricular Camper', accion: () => mostrarFormulario('matricular') },
        { texto: '📊 Reportes', accion: () => mostrarFormulario('reportes') },
        { texto: '💾 Exportar Datos', accion: exportarDatos },
        { texto: '🔄 Resetear Sistema', accion: resetearSistema }
    ];

    const menuTrainer = [
        { texto: '✏️ Evaluar Módulo', accion: () => mostrarFormulario('evaluarModulo') },
        { texto: '📋 Ver Mis Campers', accion: () => mostrarFormulario('misCampers') },
        { texto: '📊 Mis Estadísticas', accion: () => mostrarFormulario('misEstadisticas') }
    ];

    const menuCamper = [
        { texto: '📖 Ver Mis Notas', accion: () => mostrarFormulario('misNotas') },
        { texto: '📚 Mi Ruta', accion: () => mostrarFormulario('miRuta') }
    ];

    if (rol === ROLES.COORDINADOR) return menuCoordinador;
    if (rol === ROLES.TRAINER) return menuTrainer;
    if (rol === ROLES.CAMPER) return menuCamper;
    
    return [];
}

// Mostrar formularios
function mostrarFormulario(tipo) {
    const formContent = document.getElementById('formContent');
    formContent.innerHTML = '';
    
    switch(tipo) {
        case 'registrarCamper':
            formContent.innerHTML = formularioRegistrarCamper();
            break;
        case 'registrarTrainer':
            formContent.innerHTML = formularioRegistrarTrainer();
            break;
        case 'crearRuta':
            formContent.innerHTML = formularioCrearRuta();
            break;
        case 'notaInicial':
            formContent.innerHTML = formularioNotaInicial();
            break;
        case 'matricular':
            formContent.innerHTML = formularioMatricular();
            break;
        case 'evaluarModulo':
            formContent.innerHTML = formularioEvaluarModulo();
            break;
        case 'reportes':
            formContent.innerHTML = menuReportes();
            break;
        case 'misCampers':
            formContent.innerHTML = vistaTrainerCampers();
            break;
        case 'misEstadisticas':
            formContent.innerHTML = vistaTrainerEstadisticas();
            break;
        case 'misNotas':
            formContent.innerHTML = vistaCamperNotas();
            break;
        case 'miRuta':
            formContent.innerHTML = vistaCamperRuta();
            break;
    }
    
    mostrarSeccion('formSection');
}

// FORMULARIOS

function formularioRegistrarCamper() {
    return `
        <h2>Registrar Camper</h2>
        <form id="formCamper" onsubmit="return procesarRegistroCamper(event)">
            <div class="form-group">
                <label>Identificación:</label>
                <input type="text" name="identificacion" class="input" required>
            </div>
            <div class="form-group">
                <label>Nombres:</label>
                <input type="text" name="nombres" class="input" required>
            </div>
            <div class="form-group">
                <label>Apellidos:</label>
                <input type="text" name="apellidos" class="input" required>
            </div>
            <div class="form-group">
                <label>Dirección:</label>
                <input type="text" name="direccion" class="input" required>
            </div>
            <div class="form-group">
                <label>Acudiente:</label>
                <input type="text" name="acudiente" class="input" required>
            </div>
            <div class="form-group">
                <label>Teléfono Celular:</label>
                <input type="tel" name="celular" class="input" required>
            </div>
            <div class="form-group">
                <label>Teléfono Fijo:</label>
                <input type="tel" name="fijo" class="input">
            </div>
            <button type="submit" class="btn btn-primary">Registrar Camper</button>
        </form>
        <div id="resultado"></div>
    `;
}

function procesarRegistroCamper(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const datos = Object.fromEntries(formData);
    
    try {
        const errores = Campers.validarDatos(datos);
        if (errores.length > 0) {
            mostrarAlerta('error', errores.join('<br>'));
            return false;
        }
        
        const camper = Campers.crear(datos);
        mostrarAlerta('success', `Camper registrado exitosamente. ID: ${camper.id}`);
        form.reset();
    } catch (error) {
        mostrarAlerta('error', error.message);
    }
    
    return false;
}

function formularioRegistrarTrainer() {
    return `
        <h2>Registrar Trainer</h2>
        <form id="formTrainer" onsubmit="return procesarRegistroTrainer(event)">
            <div class="form-group">
                <label>Identificación:</label>
                <input type="text" name="identificacion" class="input" required>
            </div>
            <div class="form-group">
                <label>Nombres:</label>
                <input type="text" name="nombres" class="input" required>
            </div>
            <div class="form-group">
                <label>Apellidos:</label>
                <input type="text" name="apellidos" class="input" required>
            </div>
            <div class="form-group">
                <label>Email:</label>
                <input type="email" name="email" class="input" required>
            </div>
            <div class="form-group">
                <label>Teléfono:</label>
                <input type="tel" name="telefono" class="input" required>
            </div>
            <div class="form-group">
                <label>Especialidades (separadas por comas):</label>
                <input type="text" name="especialidades" class="input" placeholder="NodeJS, Java, Python">
            </div>
            <button type="submit" class="btn btn-primary">Registrar Trainer</button>
        </form>
        <div id="resultado"></div>
    `;
}

function procesarRegistroTrainer(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const datos = Object.fromEntries(formData);
    
    if (datos.especialidades) {
        datos.especialidades = datos.especialidades.split(',').map(e => e.trim());
    }
    
    try {
        const errores = Trainers.validarDatos(datos);
        if (errores.length > 0) {
            mostrarAlerta('error', errores.join('<br>'));
            return false;
        }
        
        const trainer = Trainers.crear(datos);
        mostrarAlerta('success', `Trainer registrado exitosamente. ID: ${trainer.id}`);
        form.reset();
    } catch (error) {
        mostrarAlerta('error', error.message);
    }
    
    return false;
}

function formularioCrearRuta() {
    return `
        <h2>Crear Nueva Ruta</h2>
        <form id="formRuta" onsubmit="return procesarCrearRuta(event)">
            <div class="form-group">
                <label>Nombre de la Ruta:</label>
                <input type="text" name="nombre" class="input" required>
            </div>
            <div class="form-group">
                <label>Duración (meses):</label>
                <input type="number" name="duracionMeses" class="input" value="6" min="1" required>
            </div>
            <h3>Módulos</h3>
            <div id="modulosContainer"></div>
            <button type="button" class="btn btn-secondary" onclick="agregarModuloRuta()">+ Agregar Módulo</button>
            <br><br>
            <button type="submit" class="btn btn-primary">Crear Ruta</button>
        </form>
        <div id="resultado"></div>
        <script>
            agregarModuloRuta(); // Agregar primer módulo
        </script>
    `;
}

function agregarModuloRuta() {
    const container = document.getElementById('modulosContainer');
    const index = container.children.length;
    
    const moduloHTML = `
        <div class="form-group" style="border: 1px solid #e2e8f0; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
            <label>Nombre del Módulo:</label>
            <input type="text" name="modulo_nombre_${index}" class="input" required>
            <label>Tecnologías (separadas por comas):</label>
            <input type="text" name="modulo_tecnologias_${index}" class="input" required>
            <label>Base de Datos Principal:</label>
            <input type="text" name="modulo_principal_${index}" class="input">
            <label>Base de Datos Alternativa:</label>
            <input type="text" name="modulo_alternativo_${index}" class="input">
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', moduloHTML);
}

function procesarCrearRuta(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    const datos = {
        nombre: formData.get('nombre'),
        duracionMeses: parseInt(formData.get('duracionMeses')),
        modulos: []
    };
    
    // Extraer módulos
    const modulosContainer = document.getElementById('modulosContainer');
    const totalModulos = modulosContainer.children.length;
    
    for (let i = 0; i < totalModulos; i++) {
        const modulo = {
            nombre: formData.get(`modulo_nombre_${i}`),
            tecnologias: formData.get(`modulo_tecnologias_${i}`).split(',').map(t => t.trim()),
            principal: formData.get(`modulo_principal_${i}`) || null,
            alternativo: formData.get(`modulo_alternativo_${i}`) || null
        };
        datos.modulos.push(modulo);
    }
    
    try {
        const errores = Rutas.validarDatos(datos);
        if (errores.length > 0) {
            mostrarAlerta('error', errores.join('<br>'));
            return false;
        }
        
        const ruta = Rutas.crear(datos);
        mostrarAlerta('success', `Ruta creada exitosamente: ${ruta.nombre}`);
        form.reset();
        document.getElementById('modulosContainer').innerHTML = '';
        agregarModuloRuta();
    } catch (error) {
        mostrarAlerta('error', error.message);
    }
    
    return false;
}

function formularioNotaInicial() {
    const campersInscritos = Campers.listarPorEstado(ESTADOS_CAMPER.INSCRITO);
    
    let opcionesCampers = '<option value="">Seleccione un camper</option>';
    campersInscritos.forEach(c => {
        opcionesCampers += `<option value="${c.id}">${c.nombres} ${c.apellidos} (${c.identificacion})</option>`;
    });
    
    return `
        <h2>Registrar Nota de Examen Inicial</h2>
        <form id="formNotaInicial" onsubmit="return procesarNotaInicial(event)">
            <div class="form-group">
                <label>Camper:</label>
                <select name="camperID" class="input" required>
                    ${opcionesCampers}
                </select>
            </div>
            <div class="form-group">
                <label>Nota Teórica (0-100):</label>
                <input type="number" name="teorica" class="input" min="0" max="100" step="0.1" required>
            </div>
            <div class="form-group">
                <label>Nota Práctica (0-100):</label>
                <input type="number" name="practica" class="input" min="0" max="100" step="0.1" required>
            </div>
            <button type="submit" class="btn btn-primary">Registrar Nota</button>
        </form>
        <div id="resultado"></div>
    `;
}

function procesarNotaInicial(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    try {
        const camperID = formData.get('camperID');
        const teorica = formData.get('teorica');
        const practica = formData.get('practica');
        
        const camper = Campers.registrarNotaInicial(camperID, teorica, practica);
        
        const aprobado = camper.notaExamenInicial.aprobado;
        const mensaje = aprobado 
            ? `✅ Camper APROBADO con promedio de ${camper.notaExamenInicial.promedio}` 
            : `❌ Camper NO APROBADO con promedio de ${camper.notaExamenInicial.promedio}`;
        
        mostrarAlerta(aprobado ? 'success' : 'error', mensaje);
        form.reset();
    } catch (error) {
        mostrarAlerta('error', error.message);
    }
    
    return false;
}

function formularioMatricular() {
    const campersAprobados = Campers.listarPorEstado(ESTADOS_CAMPER.APROBADO);
    const rutasActivas = Rutas.listarActivas();
    const trainersActivos = Trainers.listarActivos();
    const { salones } = Storage.cargarDatos();
    
    let opcionesCampers = '<option value="">Seleccione un camper</option>';
    campersAprobados.forEach(c => {
        opcionesCampers += `<option value="${c.id}">${c.nombres} ${c.apellidos}</option>`;
    });
    
    let opcionesRutas = '<option value="">Seleccione una ruta</option>';
    rutasActivas.forEach(r => {
        opcionesRutas += `<option value="${r.id}">${r.nombre}</option>`;
    });
    
    let opcionesTrainers = '<option value="">Seleccione un trainer</option>';
    trainersActivos.forEach(t => {
        opcionesTrainers += `<option value="${t.id}">${t.nombres} ${t.apellidos}</option>`;
    });
    
    let opcionesSalones = '<option value="">Seleccione un salón</option>';
    salones.forEach(s => {
        const disponibles = s.capacidad - s.ocupacion;
        opcionesSalones += `<option value="${s.id}">${s.nombre} (${disponibles} disponibles)</option>`;
    });
    
    return `
        <h2>Matricular Camper</h2>
        <form id="formMatricular" onsubmit="return procesarMatricular(event)">
            <div class="form-group">
                <label>Camper:</label>
                <select name="camperID" class="input" required>
                    ${opcionesCampers}
                </select>
            </div>
            <div class="form-group">
                <label>Ruta:</label>
                <select name="rutaID" class="input" required>
                    ${opcionesRutas}
                </select>
            </div>
            <div class="form-group">
                <label>Trainer:</label>
                <select name="trainerID" class="input" required>
                    ${opcionesTrainers}
                </select>
            </div>
            <div class="form-group">
                <label>Salón:</label>
                <select name="salonID" class="input" required>
                    ${opcionesSalones}
                </select>
            </div>
            <div class="form-group">
                <label>Fecha de Inicio:</label>
                <input type="date" name="fechaInicio" class="input" required>
            </div>
            <div class="form-group">
                <label>Horario:</label>
                <input type="text" name="horario" class="input" value="Lun-Vie 8:00-12:00" required>
            </div>
            <button type="submit" class="btn btn-primary">Matricular</button>
        </form>
        <div id="resultado"></div>
    `;
}

function procesarMatricular(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const datos = Object.fromEntries(formData);
    
    try {
        const errores = Matriculas.validarDatos(datos);
        if (errores.length > 0) {
            mostrarAlerta('error', errores.join('<br>'));
            return false;
        }
        
        const matricula = Matriculas.crear(datos);
        mostrarAlerta('success', `Matrícula creada exitosamente. ID: ${matricula.id}`);
        form.reset();
        
        // Recargar datos
        datos = Storage.cargarDatos();
    } catch (error) {
        mostrarAlerta('error', error.message);
    }
    
    return false;
}

function formularioEvaluarModulo() {
    const campersCursando = Campers.listarPorEstado(ESTADOS_CAMPER.CURSANDO);
    
    let opcionesCampers = '<option value="">Seleccione un camper</option>';
    campersCursando.forEach(c => {
        opcionesCampers += `<option value="${c.id}">${c.nombres} ${c.apellidos}</option>`;
    });
    
    return `
        <h2>Evaluar Módulo</h2>
        <form id="formEvaluar" onsubmit="return procesarEvaluacion(event)">
            <div class="form-group">
                <label>Camper:</label>
                <select name="camperID" class="input" required onchange="cargarModulosCamper(this.value)">
                    ${opcionesCampers}
                </select>
            </div>
            <div class="form-group">
                <label>Nombre del Módulo:</label>
                <input type="text" name="modulo" class="input" required>
            </div>
            <div class="form-group">
                <label>Nota Teórica (0-100) - Peso 30%:</label>
                <input type="number" name="teorica" class="input" min="0" max="100" step="0.1" required>
            </div>
            <div class="form-group">
                <label>Nota Práctica (0-100) - Peso 60%:</label>
                <input type="number" name="practica" class="input" min="0" max="100" step="0.1" required>
            </div>
            <div class="form-group">
                <label>Nota Trabajos/Quizes (0-100) - Peso 10%:</label>
                <input type="number" name="trabajos" class="input" min="0" max="100" step="0.1" required>
            </div>
            <button type="submit" class="btn btn-primary">Evaluar</button>
        </form>
        <div id="resultado"></div>
    `;
}

function procesarEvaluacion(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    const camperID = formData.get('camperID');
    const modulo = formData.get('modulo');
    const notas = {
        teorica: formData.get('teorica'),
        practica: formData.get('practica'),
        trabajos: formData.get('trabajos')
    };
    
    try {
        const evaluacion = Evaluaciones.registrar(camperID, modulo, notas);
        
        const aprobado = evaluacion.aprobado;
        const mensaje = aprobado 
            ? `✅ Módulo APROBADO con nota final: ${evaluacion.notaFinal}` 
            : `❌ Módulo REPROBADO con nota final: ${evaluacion.notaFinal}`;
        
        mostrarAlerta(aprobado ? 'success' : 'error', mensaje);
        form.reset();
    } catch (error) {
        mostrarAlerta('error', error.message);
    }
    
    return false;
}

// REPORTES

function menuReportes() {
    return `
        <h2>📊 Módulo de Reportes</h2>
        <div class="menu-grid">
            <button class="menu-item" onclick="verReporte('inscritos')">Campers Inscritos</button>
            <button class="menu-item" onclick="verReporte('aprobados')">Campers Aprobados</button>
            <button class="menu-item" onclick="verReporte('trainers')">Trainers Activos</button>
            <button class="menu-item" onclick="verReporte('bajoRendimiento')">Bajo Rendimiento</button>
            <button class="menu-item" onclick="verReporte('enRiesgo')">Campers en Riesgo</button>
            <button class="menu-item" onclick="verReporte('porRuta')">Por Ruta</button>
            <button class="menu-item" onclick="verReporte('estadisticas')">Estadísticas</button>
            <button class="menu-item" onclick="verReporte('dashboard')">Dashboard General</button>
        </div>
        <div id="reporteResultado"></div>
    `;
}

function verReporte(tipo) {
    const container = document.getElementById('reporteResultado');
    
    try {
        let html = '';
        
        switch(tipo) {
            case 'inscritos':
                const inscritos = Reportes.campersInscritos();
                html = generarTabla('Campers Inscritos', inscritos, ['id', 'nombres', 'apellidos', 'identificacion']);
                break;
            
            case 'aprobados':
                const aprobados = Reportes.campersAprobados();
                html = generarTabla('Campers Aprobados', aprobados, ['id', 'nombres', 'apellidos', 'identificacion']);
                break;
            
            case 'trainers':
                const trainers = Reportes.trainersActivos();
                html = generarTabla('Trainers Activos', trainers, ['id', 'nombres', 'apellidos', 'email']);
                break;
            
            case 'bajoRendimiento':
                const bajoRend = Reportes.campersBajoRendimiento();
                html = generarTabla('Campers con Bajo Rendimiento', bajoRend, ['id', 'nombres', 'apellidos', 'riesgo']);
                break;
            
            case 'enRiesgo':
                const enRiesgo = Reportes.campersEnRiesgo();
                html = generarTabla('Campers en Riesgo', enRiesgo, ['id', 'nombres', 'apellidos', 'estado']);
                break;
            
            case 'porRuta':
                html = formularioReportePorRuta();
                break;
            
            case 'estadisticas':
                html = formularioEstadisticas();
                break;
            
            case 'dashboard':
                const dashboard = Reportes.dashboardCompleto();
                html = generarDashboard(dashboard);
                break;
        }
        
        container.innerHTML = html;
    } catch (error) {
        container.innerHTML = `<div class="alert alert-error">${error.message}</div>`;
    }
}

function formularioReportePorRuta() {
    const rutas = Rutas.listarActivas();
    let opciones = '';
    rutas.forEach(r => {
        opciones += `<option value="${r.id}">${r.nombre}</option>`;
    });
    
    return `
        <h3>Reporte por Ruta</h3>
        <select class="input" onchange="mostrarReportePorRuta(this.value)">
            <option value="">Seleccione una ruta</option>
            ${opciones}
        </select>
        <div id="resultadoRuta"></div>
    `;
}

function mostrarReportePorRuta(rutaID) {
    if (!rutaID) return;
    
    const reporte = Reportes.campersPorRuta(rutaID);
    const container = document.getElementById('resultadoRuta');
    
    let html = `
        <h4>Ruta: ${reporte.ruta.nombre}</h4>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">${reporte.totalCampers}</div>
                <div class="stat-label">Campers</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${reporte.totalTrainers}</div>
                <div class="stat-label">Trainers</div>
            </div>
        </div>
    `;
    
    html += generarTabla('Campers en esta ruta', reporte.campers, ['nombres', 'apellidos', 'estado']);
    html += generarTabla('Trainers asignados', reporte.trainers, ['nombres', 'apellidos', 'email']);
    
    container.innerHTML = html;
}

function formularioEstadisticas() {
    const rutas = Rutas.listarActivas();
    let opcionesRutas = '';
    rutas.forEach(r => {
        opcionesRutas += `<option value="${r.id}">${r.nombre}</option>`;
    });
    
    const trainers = Trainers.listarActivos();
    let opcionesTrainers = '<option value="">Todos</option>';
    trainers.forEach(t => {
        opcionesTrainers += `<option value="${t.id}">${t.nombres} ${t.apellidos}</option>`;
    });
    
    return `
        <h3>Estadísticas de Módulos</h3>
        <div class="form-group">
            <label>Ruta:</label>
            <select id="rutaEst" class="input">
                <option value="">Seleccione una ruta</option>
                ${opcionesRutas}
            </select>
        </div>
        <div class="form-group">
            <label>Trainer:</label>
            <select id="trainerEst" class="input">
                ${opcionesTrainers}
            </select>
        </div>
        <button class="btn btn-primary" onclick="mostrarEstadisticas()">Ver Estadísticas</button>
        <div id="resultadoEstadisticas"></div>
    `;
}

function mostrarEstadisticas() {
    const rutaID = document.getElementById('rutaEst').value;
    const trainerID = document.getElementById('trainerEst').value || null;
    
    if (!rutaID) {
        alert('Seleccione una ruta');
        return;
    }
    
    const stats = Reportes.estadisticasModulos(rutaID, trainerID);
    const container = document.getElementById('resultadoEstadisticas');
    
    let html = `
        <h4>Ruta: ${stats.ruta}</h4>
        <h5>Trainer: ${stats.trainer}</h5>
    `;
    
    html += generarTabla('Estadísticas por Módulo', stats.estadisticas, 
        ['modulo', 'aprobados', 'reprobados', 'sinEvaluar', 'promedioGeneral', 'porcentajeAprobacion']);
    
    container.innerHTML = html;
}

function generarDashboard(dashboard) {
    const stats = dashboard.general.campers;
    
    let html = `
        <h3>📊 Dashboard General</h3>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">${stats.total}</div>
                <div class="stat-label">Total Campers</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.cursando}</div>
                <div class="stat-label">Cursando</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.graduados}</div>
                <div class="stat-label">Graduados</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.enRiesgo}</div>
                <div class="stat-label">En Riesgo</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${dashboard.general.totalTrainers}</div>
                <div class="stat-label">Trainers</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${dashboard.general.totalRutas}</div>
                <div class="stat-label">Rutas Activas</div>
            </div>
        </div>
    `;
    
    html += generarTabla('Comparativa de Rutas', dashboard.comparativaRutas, 
        ['ruta', 'totalCampers', 'aprobados', 'reprobados', 'promedioGeneral', 'tasaAprobacion']);
    
    return html;
}

// UTILIDADES

function generarTabla(titulo, datos, columnas) {
    if (!datos || datos.length === 0) {
        return `<div class="alert alert-error">No hay datos para mostrar</div>`;
    }
    
    let html = `<h3>${titulo}</h3><div class="table-container"><table><thead><tr>`;
    
    columnas.forEach(col => {
        html += `<th>${col.charAt(0).toUpperCase() + col.slice(1)}</th>`;
    });
    
    html += `</tr></thead><tbody>`;
    
    datos.forEach(item => {
        html += '<tr>';
        columnas.forEach(col => {
            let valor = item[col];
            
            if (typeof valor === 'boolean') {
                valor = valor ? '✅' : '❌';
            }
            
            if (typeof valor === 'object' && valor !== null) {
                valor = JSON.stringify(valor);
            }
            
            html += `<td>${valor ?? '-'}</td>`;
        });
        html += '</tr>';
    });
    
    html += '</tbody></table></div>';
    
    return html;
}

function mostrarAlerta(tipo, mensaje) {
    const container = document.getElementById('resultado');
    const clase = tipo === 'success' ? 'alert-success' : 'alert-error';
    
    container.innerHTML = `<div class="alert ${clase}">${mensaje}</div>`;
    
    setTimeout(() => {
        container.innerHTML = '';
    }, 5000);
}

function exportarDatos() {
    try {
        Storage.exportarJSON();
        alert('Datos exportados exitosamente');
    } catch (error) {
        alert('Error al exportar datos: ' + error.message);
    }
}

function resetearSistema() {
    if (confirm('¿Está seguro de resetear todo el sistema? Esta acción no se puede deshacer.')) {
        datos = Storage.resetear();
        alert('Sistema reseteado exitosamente');
        location.reload();
    }
}

// Vistas para Trainer
function vistaTrainerCampers() {
    // Aquí iría la lógica para mostrar los campers del trainer actual
    return `<h2>Mis Campers</h2><p>Funcionalidad en desarrollo...</p>`;
}

function vistaTrainerEstadisticas() {
    return `<h2>Mis Estadísticas</h2><p>Funcionalidad en desarrollo...</p>`;
}

// Vistas para Camper
function vistaCamperNotas() {
    // Por simplicidad, seleccionar primer camper
    const { campers } = Storage.cargarDatos();
    const camper = campers[0]; // En producción, esto sería el camper autenticado
    
    if (!camper) {
        return `<h2>Mis Notas</h2><div class="alert alert-error">No se encontró información del camper</div>`;
    }
    
    const evaluaciones = camper.modulos || [];
    const promedio = evaluaciones.length > 0 
        ? (evaluaciones.reduce((acc, ev) => acc + ev.notaFinal, 0) / evaluaciones.length).toFixed(2)
        : 0;
    
    let html = `
        <h2>📚 Mis Notas</h2>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">${evaluaciones.length}</div>
                <div class="stat-label">Módulos Cursados</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${promedio}</div>
                <div class="stat-label">Promedio General</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${evaluaciones.filter(e => e.aprobado).length}</div>
                <div class="stat-label">Módulos Aprobados</div>
            </div>
        </div>
    `;
    
    if (evaluaciones.length > 0) {
        html += generarTabla('Detalle de Notas', evaluaciones, 
            ['modulo', 'notaTeorica', 'notaPractica', 'notaTrabajos', 'notaFinal', 'aprobado']);
    } else {
        html += `<div class="alert alert-error">No tienes evaluaciones registradas aún</div>`;
    }
    
    return html;
}

function vistaCamperRuta() {
    const { campers, rutas, matriculas, trainers } = Storage.cargarDatos();
    const camper = campers[0]; // En producción, esto sería el camper autenticado
    
    if (!camper) {
        return `<h2>Mi Ruta</h2><div class="alert alert-error">No se encontró información del camper</div>`;
    }
    
    const matricula = matriculas.find(m => m.camperID === camper.id && m.activa);
    
    if (!matricula) {
        return `<h2>Mi Ruta</h2><div class="alert alert-error">No estás matriculado en ninguna ruta</div>`;
    }
    
    const ruta = rutas.find(r => r.id === matricula.rutaID);
    const trainer = trainers.find(t => t.id === matricula.trainerID);
    
    let html = `
        <h2>🛣️ Mi Ruta de Aprendizaje</h2>
        <div class="alert alert-success">
            <strong>Ruta:</strong> ${ruta.nombre}<br>
            <strong>Trainer:</strong> ${trainer.nombres} ${trainer.apellidos}<br>
            <strong>Horario:</strong> ${matricula.horario}<br>
            <strong>Inicio:</strong> ${new Date(matricula.fechaInicio).toLocaleDateString()}<br>
            <strong>Finalización:</strong> ${new Date(matricula.fechaFin).toLocaleDateString()}
        </div>
        
        <h3>Módulos del Programa</h3>
    `;
    
    ruta.modulos.forEach((modulo, index) => {
        const evaluacion = camper.modulos?.find(m => m.modulo === modulo.nombre);
        const estado = evaluacion 
            ? (evaluacion.aprobado ? '✅ Aprobado' : '❌ Reprobado')
            : '⏳ Pendiente';
        
        html += `
            <div style="border: 1px solid #e2e8f0; padding: 1rem; margin: 1rem 0; border-radius: 8px;">
                <h4>${index + 1}. ${modulo.nombre} ${estado}</h4>
                <p><strong>Tecnologías:</strong> ${modulo.tecnologias.join(', ')}</p>
                ${evaluacion ? `<p><strong>Nota Final:</strong> ${evaluacion.notaFinal}</p>` : ''}
            </div>
        `;
    });
    
    return html;
}