var models = require('../');



models.pacoteLocationHistory.drop().then(function() {
    return models.pacote.drop();
}).then(function() {
    return models.user.drop();
}).then(function() {
    return models.site.drop();
}).then(function() {
    return models.pessoaJuridica.drop();
}).then(function() {
    return models.material.drop();
}).then(function() {
    return models.tipoMaterial.drop();
}).then(function() {
    return models.connection.sync({ force: true });
}).then(function() {
    return models.pessoaJuridica.create({
        name: 'YouGreen',
        cnpj: '01.234.567.890/0001-00',
        tipo: 'Cooperativa'
    });

})
.then(function(element) {
    return models.user.create({
        name: 'Roger',
        email: 'blablabla',
        password: '123456',
        pessoaJuridicaId: element.id
    })
})
.then(function(element) {
    return models.site.create({
        cep: '02202-000',
        logradouro: 'Rua Aldeia Vinte de Setembro',
        numero: '510',
        bairro: 'Vila Ede',
        cidade: 'São Paulo',
        estado: 'SP',
        lat: -23.494307,
        lng: -46.595016,
        pessoaJuridicaId: element.pessoaJuridicaId
    });
})
.then(function(element) {
    
    return models.user.create({
        name: 'Andre Rácz',
        email: 'andre.racz@gmail.com',
        password: '123456',
        admin: true

    })
}).then(function(element) {
    return models.tipoMaterial.bulkCreate(
        [   {simpleName:'plastico', name:'Plástico'}, 
            {simpleName:'vidro', name:'Vidro'},
            {simpleName:'aluminio', name: 'Alumínio'},
            {simpleName:'tetrapack', name: 'Tetrapack'},
            {simpleName:'papel', name: 'Papel'},
            {simpleName:'outros', name: 'Outros'}
        ]);
}).then(function(element) {
    return models.material.bulkCreate(
        [   {name:'PET', tipoMaterialId: 1}, 
            {name:'Vidro Transparente', tipoMaterialId: 2}, 
            {name:'Latinha', tipoMaterialId: 3}, 
            {name:'Tetrapak', tipoMaterialId: 4}, 
            {name:'Papel Branco', tipoMaterialId: 5}, 
            {name:'Ferro', tipoMaterialId: 6}, 
        ]);
});

    