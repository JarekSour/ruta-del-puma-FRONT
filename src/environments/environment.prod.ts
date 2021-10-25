export const environment = {
    production: true,
    url_base: 'https://api.rutadelpuma.cl',

    admin: {
        login: '/admin/login'
    },
    planes: {
        getPlanes: '/planes/get-planes',
        updatePlan: '/planes/update-plan',
        addPlan: '/planes/add-plan'
    },
    responsables: {
        getResponsables: '/responsable/get-responsables',
        updateResponsable: '/responsable/update-responsable',
        addResponsable: '/responsable/add-responsable'
    },
    imagenes: {
        uploadImage: '/imagenes/upload-image',
        getAlbum: '/imagenes/get-album',
        deleteImage: '/imagenes/delete-image'
    },
    empresa: {
        getEmpresas: '/empresa/get-empresas',
        getEmpresa: '/empresa/get-empresa',
        addEmpresa: '/empresa/new-empresa',
        updateEmpresa: '/empresa/update-empresa'
    },
    suscripcion: {
        updateSuscripcion: '/suscripcion/update-suscripcion',
        addSuscripcion: '/suscripcion/add-suscripcion'
    },
    categorias: ['Transporte', 'Comercio', '¿Dónde comer?', 'Actividades', '¿Dónde dormir?', 'Salud y belleza', '¡Imperdibles de visitar!']

};
