/// <reference types="cypress" />

import produtosPage from "../support/page_objects/produtos.page";

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('/')
    });
    beforeEach(() => {
        cy.visit('minha-conta')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        //TODO: Coloque todo o fluxo de teste aqui, considerando as boas práticas e otimizações

        //Login
        cy.fixture('perfil').then((dados) => {
            cy.login(dados.usuario, dados.senha)
        })
        cy.get('.page-title').should('contain', 'Minha conta')

        //Colocando produto no carrinho
        let qtd = 1
        produtosPage.buscarProduto('Ariel Roll Sleeve Sweatshirt')
        produtosPage.addProdutoCarrinho('L', 'Red', qtd)

        produtosPage.buscarProduto('Ingrid Running Jacket')
        produtosPage.addProdutoCarrinho('M', 'White', qtd)

        produtosPage.buscarProduto('Celeste Sports Bra')
        produtosPage.addProdutoCarrinho('XL', 'Yellow', qtd)

        produtosPage.buscarProduto('Daphne Full-Zip Hoodie')
        produtosPage.addProdutoCarrinho('S', 'Purple', qtd)

        //Verifica os itens do carrinho
        cy.get('.woocommerce-message > .button').click()

        //Realiza o checkout
        cy.get('.checkout-button').click()

        cy.get('#billing_address_1').clear().type('Rua das águias, número 15')
        cy.get('#billing_address_2').clear().type('Apartamento 102')
        cy.get('#billing_city').clear().type('Guarujá')
        cy.get('#billing_postcode').clear().type('51441-555')
        cy.get('#billing_phone').clear().type('95429-5245')
        cy.get('#order_comments').clear().type('Qualquer pessoa que estiver no endereço, pode receber a encomenda.')
        cy.get('#payment_method_cod').click()
        cy.get('#terms').check()

        cy.get('#place_order').click()

        cy.get('.breadcrumb > .active').should('contain', 'Checkout')
    });
})