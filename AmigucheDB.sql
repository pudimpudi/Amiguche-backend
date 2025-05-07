CREATE DATABASE amiguche;

use amiguche;

--tirei a tabela contato,alterei os nomes das tabelas e tirei a função auto increment da tabela pedidos, explicação no file pedidos repository

CREATE TABLE produto(
    id_produto INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    categoria VARCHAR(50)
)

create TABLE variantes(
    id_variantes INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(400),
    preco DECIMAL(3,2),
    id_produto INT,
    FOREIGN KEY (id_produto) REFERENCES produto(id_produto)
)

CREATE TABLE imagens(
    id_imagens INT PRIMARY KEY AUTO_INCREMENT,
    caminho VARCHAR(200),
    id_variantes INT,
    id_produto INT,
    FOREIGN KEY (id_produto) REFERENCES produto(id_produto),
    FOREIGN KEY (id_variantes) REFERENCES variantes(id_variantes)
)

CREATE TABLE usuarios(
    id_usuarios INT PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(100),
    senha VARCHAR(50)
)


CREATE TABLE clientes(
    id_clientes INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(50) NOT NULL,
    endereco VARCHAR(200),
    cidade VARCHAR(50),
    estado VARCHAR(50),
    cep VARCHAR(10)
)

CREATE TABLE pedidos(
    id_pedidos INT PRIMARY KEY,
    data_pedido DATETIME,
    status VARCHAR(50),
    id_clientes INT,
    id_produto INT,
    Foreign Key (id_produto) REFERENCES produto(id_produto),
    FOREIGN KEY (id_clientes) REFERENCES clientes(id_clientes)
)

CREATE TABLE pedidos_produtos(
    id_pedidos_produtos INT PRIMARY KEY AUTO_INCREMENT,
    id_pedidos INT,
    id_produto INT,
    FOREIGN KEY (id_pedidos) REFERENCES pedidos(id_pedidos),
    FOREIGN KEY (id_produto) REFERENCES produto(id_produto)
)