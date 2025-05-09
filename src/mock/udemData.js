const UDEM_INFO = {
  nombreUniversidad: "Universidad de Medellín",
  siglas: "UDEM",
  fundacion: 1950,
  acreditacion: "Alta Calidad - Resolución 017343 del 2022",
  lema: "Ciencia y Libertad",
  mision: "Formar profesionales competentes con sentido humano y responsabilidad social",
  vision: "Ser reconocida como una de las mejores universidades de Colombia para 2030",

  // Programas académicos completos
  programas: [
    { 
      nombre: "Administración de Agronegocios", 
      facultad: "Ciencias Económicas y Administrativas", 
      duracion: "8 semestres",
      modalidad: "Presencial",
      snies: "102841",
      creditos: 145,
      jornada: "Diurna/Nocturna"
    },
    { 
      nombre: "Administración de Empresas", 
      facultad: "Ciencias Económicas y Administrativas", 
      duracion: "8 semestres",
      modalidad: "Presencial",
      snies: "102842",
      creditos: 150,
      acreditacion: "AACSB"
    },
    { 
      nombre: "Administración de Empresas Turísticas", 
      facultad: "Ciencias Económicas y Administrativas", 
      duracion: "9 semestres",
      modalidad: "Presencial",
      snies: "102843"
    },
    { 
      nombre: "Ciencia Política", 
      facultad: "Ciencias Sociales y Humanas", 
      duracion: "8 semestres",
      modalidad: "Presencial",
      snies: "102844"
    },
    { 
      nombre: "Computación Científica", 
      facultad: "Ciencias Básicas", 
      duracion: "9 semestres",
      modalidad: "Presencial",
      snies: "102845"
    },
    { 
      nombre: "Derecho", 
      facultad: "Derecho", 
      duracion: "9 semestres",
      modalidad: "Presencial/Nocturno",
      snies: "102846",
      creditos: 165
    },
    { 
      nombre: "Diseño y Gestión de la Moda y el Textil", 
      facultad: "Diseño", 
      duracion: "8 semestres",
      modalidad: "Presencial",
      snies: "102847"
    },
    { 
      nombre: "Diseño y Gestión del Producto", 
      facultad: "Diseño", 
      duracion: "8 semestres",
      modalidad: "Presencial",
      snies: "102848"
    },
    { 
      nombre: "Economía", 
      facultad: "Ciencias Económicas y Administrativas", 
      duracion: "8 semestres",
      modalidad: "Presencial",
      snies: "102849"
    },
    { 
      nombre: "Ingeniería Ambiental", 
      facultad: "Ingenierías", 
      duracion: "10 semestres",
      modalidad: "Presencial",
      snies: "102850",
      acreditacion: "ABET"
    },
    { 
      nombre: "Ingeniería Civil", 
      facultad: "Ingenierías", 
      duracion: "10 semestres",
      modalidad: "Presencial",
      snies: "102851",
      acreditacion: "ABET"
    },
    { 
      nombre: "Ingeniería de Sistemas", 
      facultad: "Ingenierías", 
      duracion: "10 semestres",
      modalidad: "Presencial",
      snies: "102852",
      acreditacion: "ABET",
      enfasis: ["Inteligencia Artificial", "Ciberseguridad"]
    },
    { 
      nombre: "Ingeniería de Telecomunicaciones", 
      facultad: "Ingenierías", 
      duracion: "10 semestres",
      modalidad: "Presencial",
      snies: "102853"
    },
    { 
      nombre: "Ingeniería en Energía", 
      facultad: "Ingenierías", 
      duracion: "10 semestres",
      modalidad: "Presencial",
      snies: "102854"
    },
    { 
      nombre: "Ingeniería Financiera", 
      facultad: "Ingenierías", 
      duracion: "10 semestres",
      modalidad: "Presencial",
      snies: "102855"
    },
    { 
      nombre: "Ingeniería Industrial", 
      facultad: "Ingenierías", 
      duracion: "10 semestres",
      modalidad: "Presencial",
      snies: "102856",
      acreditacion: "ABET"
    },
    { 
      nombre: "Investigación Criminal", 
      facultad: "Derecho", 
      duracion: "9 semestres",
      modalidad: "Presencial",
      snies: "102857"
    },
    { 
      nombre: "Investigación Criminal Virtual", 
      facultad: "Derecho", 
      duracion: "9 semestres",
      modalidad: "Virtual",
      snies: "102858"
    },
    { 
      nombre: "Mercadeo", 
      facultad: "Ciencias Económicas y Administrativas", 
      duracion: "9 semestres",
      modalidad: "Presencial",
      snies: "102859"
    },
    { 
      nombre: "Negocios Internacionales", 
      facultad: "Ciencias Económicas y Administrativas", 
      duracion: "8 semestres",
      modalidad: "Presencial",
      snies: "102860"
    }
  ],

  // Información de campus
  campus: {
    principal: {
      nombre: "Campus El Poblado",
      direccion: "Carrera 87 # 30-65, Medellín",
      area: "45,000 m²",
      caracteristicas: [
        "Biblioteca con 150,000 volúmenes",
        "15 laboratorios especializados",
        "3 auditorios principales",
        "Zonas deportivas"
      ]
    },
    sedes: [
      {
        nombre: "Sede Centro",
        direccion: "Calle 10 # 22-04",
        programas: ["Derecho", "Ciencias Políticas"]
      }
    ]
  },

  // Admisiones ampliadas
  admisiones: {
    pregrado: {
      periodos: ["Enero", "Julio"],
      requisitos: [
        "Prueba Saber 11",
        "Fotocopia del diploma de bachiller",
        "Fotocopia del documento de identidad",
        "2 fotos 3x4"
      ],
      porcentajeIcfesMinimo: 50,
      fechasImportantes: {
        inscripciones: {
          primerPeriodo: "Octubre 1 - Noviembre 30",
          segundoPeriodo: "Mayo 1 - Junio 30"
        },
        entrevistas: "Diciembre y Julio",
        matriculaFinanciera: {
          primerPeriodo: "Enero 15-20",
          segundoPeriodo: "Julio 15-20"
        },
        inicioClases: {
          primerPeriodo: "Febrero 5",
          segundoPeriodo: "Agosto 5"
        }
      }
    },
    posgrado: {
      maestrias: [
        "Maestría en Derecho",
        "Maestría en Ingeniería de Software"
      ],
      doctorados: [
        "Doctorado en Ciencias Sociales",
        "Doctorado en Ingeniería"
      ]
    }
  },

  // Beneficios estudiantiles
  beneficios: {
    convenios: [
      {
        nombre: "SENA",
        descuento: "30% en matrícula"
      },
      {
        nombre: "Gobierno de Medellín",
        programa: "Becas Talento Medellín"
      }
    ],
    descuentos: [
      {
        tipo: "Hermanos",
        porcentaje: 10
      },
      {
        tipo: "Egresados",
        porcentaje: 15
      }
    ]
  },

  // Información de contacto ampliada
  contactos: {
    direccionPrincipal: "Carrera 87 # 30-65, Medellín",
    telefonos: {
      admisiones: "+57 604 1234567 Ext. 101",
      financiera: "+57 604 1234567 Ext. 102",
      emergencias: "+57 604 1234567 Ext. 911"
    },
    correos: {
      admisiones: "admisiones@udem.edu.co",
      rectoria: "rectoria@udem.edu.co",
      quejas: "pqrs@udem.edu.co"
    },
    sitioWeb: "www.udem.edu.co",
    redesSociales: {
      facebook: "facebook.com/UniversidadDeMedellin",
      instagram: "@udemcolombia",
      twitter: "@udem_twitter"
    },
    horarioAtencion: "Lunes a Viernes 8:00 am - 6:00 pm"
  },

  // Servicios estudiantiles
  servicios: [
    {
      nombre: "Bienestar Universitario",
      descripcion: "Programas de salud, deporte y cultura",
      responsable: "Dirección de Bienestar"
    },
    {
      nombre: "Bolsa de Empleo",
      descripcion: "Vinculación laboral para egresados",
      convenios: ["LinkedIn", "Computrabajo"]
    },
    {
      nombre: "Movilidad Internacional",
      programas: ["Erasmus+", "Intercambio AL"]
    }
  ],

  // Investigación
  investigacion: {
    grupos: 25,
    categorizados: {
      A1: 5,
      A: 8,
      B: 7,
      C: 5
    },
    lineas: [
      "Ingeniería y Tecnología",
      "Ciencias Sociales",
      "Derecho y Ciencias Políticas"
    ]
  },

  // Internacionalización
  internacionalizacion: {
    convenios: [
      {
        pais: "España",
        universidad: "Universidad de Barcelona",
        programa: "Intercambio académico"
      },
      {
        pais: "México",
        universidad: "UNAM",
        programa: "Doble titulación"
      }
    ],
    requisitos: {
      idioma: "B2 en inglés o idioma destino",
      promedio: 3.8,
      creditos: "Haber aprobado mínimo 60 créditos"
    }
  },

  // Fechas importantes (mantenidas del original)
  fechasImportantes: {
    inscripciones: "Enero y Julio de cada año",
    matriculaFinanciera: "Febrero y Agosto",
    inicioClases: "Febrero 5 y Agosto 5"
  }
};

export { UDEM_INFO };