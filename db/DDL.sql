/* CRIANDO O BANCO DE DADOS */

CREATE DATABASE `conexao-carreira`;

USE `conexao-carreira`;

/* CRIANDO AS TABELAS */

/* TABELA usuario */

CREATE TABLE usuario (
    id SERIAL NOT NULL,
    nome VARCHAR(50) NOT NULL,
    nome_completo VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(30) NOT NULL,
    curso INT NOT NULL,
    estado INT NOT NULL,
    ativo BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);

/* TABELA habilidade */

CREATE TABLE habilidade (
    id SERIAL NOT NULL,
    usuario INT NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (usuario) REFERENCES usuario (id) ON UPDATE CASCADE ON DELETE CASCADE
);