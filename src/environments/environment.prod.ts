export const environment = {
    production: true,
    url_base: 'http://localhost:8000',

    admin: {
        login: '/adm-login'
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
    }

};
