/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function() {
    cy.visit('./src/index.html')    
  })
  it('verifica o título da aplicação', function() {
      cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios e envia o formulário', function() {
    const longText = 'teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste testeteste teste teste teste teste teste teste testeteste teste teste teste teste teste teste testeteste teste teste teste teste teste teste testeteste teste teste teste teste teste teste testeteste teste teste teste teste teste teste testeteste teste teste teste teste teste teste testeteste teste teste teste teste teste teste testeteste teste teste teste teste teste teste testeteste teste teste teste teste teste teste testeteste teste teste teste teste teste teste testeteste teste teste teste teste teste teste testeteste teste teste teste teste teste teste testeteste teste teste teste teste teste teste testeteste teste teste teste teste teste teste testeteste teste teste teste teste teste teste teste'
    cy.get('#firstName').type('Luana')
    cy.get('#lastName').type('Barth')
    cy.get('#email').type('luana@teste.com')
    cy.get('#open-text-area').type(longText, {delay:0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
    cy.get('#firstName').type('Luana')
    cy.get('#lastName').type('Barth')
    cy.get('#email').type('luana@teste,com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com valor não-numérico', function(){
    cy.get('#phone')
    .type('abcdefghij')
    .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    cy.get('#firstName').type('Luana')
    cy.get('#lastName').type('Barth')
    cy.get('#email').type('luana@teste.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    cy.get('#firstName')
    .type('Luana') //insere o valor Luana dentro do campo
    .should('have.value', 'Luana') //verifica se dentron do campo o valor é mesmo Luana
    .clear() //limpa o campo
    .should('have.value', '') //confere se o campo esta mesmo limpo, pois dentro das '' não tem nada
    cy.get('#lastName').type('Barth')
    .should('have.value', 'Barth')
    .clear() 
    .should('have.value', '')
    cy.get('#email').type('luana@teste.com')
    .should('have.value', 'luana@teste.com')
    .clear() 
    .should('have.value', '')
    cy.get('#phone').type('99999999999')
    .should('have.value', '99999999999')
    .clear()
    .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    cy.contains('button', 'Enviar').click() // se não quiser usar o texto do botão, usar o seguinte comando: y.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')//para ver a mensagem de erro 
  })

  it('envia o formuário com sucesso usando um comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit()// comandos no commands.js, essa linha abrevia tudo que tem la 
    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', function(){
    cy.get('#product').select('YouTube') // Seleção pelo texto YouTube
    .should('have.value', 'youtube')// o valor é com letra minuscula
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', function(){
    cy.get('#product').select('mentoria') //Seleção pelo valor, e como é vaor, o "mentoria" deve ser com letra minuscula
    .should('have.value', 'mentoria')
  })

  it('eleciona um produto (Blog) por seu índice', function(){
    cy.get('#product').select(1)
    .should('have.value', 'blog') 
  })

  it('marca o tipo de atendimento "Feedback"', function(){
    cy.get('input[type="radio"][value="feedback"]').check()
    .should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', function(){
    cy.get('input[type="radio"]')
    .should('have.length', 3) 
    .each(function($radio){
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    })
  })

  it('seleciona um arquivo da pasta fixtures', function(){
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')//selecionando um arquivo para dentro do campo
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', function(){
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('cypress/fixtures/example.json', {action: "drag-drop"})//arrastando um arquivo para dentro do campo
    .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
    .selectFile('@sampleFile')
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
    cy.get('#privacy a').should('have.attr','target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
    cy.get('#privacy a')
    .invoke('removeAttr', 'target')// talvez possa ser utilizado para verificar pdf ou visualização prévia abrindo ele na mesma pagina
    .click()

    cy.contains('Talking About Testing').should('be.visible')// aqui confere os elementos visiveis na nova pagina, texto, campos, etc
  })

 it('teste automatizados', function(){
  

 })

  })
