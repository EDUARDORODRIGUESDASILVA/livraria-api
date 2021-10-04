DROP TABLE  IF EXISTS clientes CASCADE;
CREATE TABLE clientes (
cliente_id SERIAL PRIMARY KEY NOT NULL,
nome VARCHAR NOT NULL,
email VARCHAR NOT NULL,
senha VARCHAR NOT NULL,
telefone VARCHAR NOT NULL,
endereco VARCHAR NOT NULL
);


DROP TABLE  IF EXISTS autores CASCADE;
CREATE TABLE autores (
autor_id SERIAL PRIMARY KEY NOT NULL,
nome VARCHAR NOT NULL,
email VARCHAR NOT NULL,
telefone VARCHAR NOT NULL
);

DROP TABLE  IF EXISTS livros CASCADE;
CREATE TABLE livros (
livro_id SERIAL PRIMARY KEY,
nome VARCHAR NOT NULL,
valor NUMERIC NOT NULL,
estoque INT NOT NULL,
autor_id INT NOT NULL,
CONSTRAINT fk_autores FOREIGN KEY (autor_id) REFERENCES autores (autor_id)
);


DROP TABLE  IF EXISTS vendas CASCADE;
CREATE TABLE vendas (
venda_id SERIAL PRIMARY KEY,
valor NUMERIC NOT NULL,
data DATE NOT NULL,
cliente_id INT NOT NULL,
livro_id INT NOT NULL,
CONSTRAINT fk_clientes FOREIGN KEY (cliente_id) REFERENCES clientes (cliente_id),
CONSTRAINT fk_livros FOREIGN KEY (livro_id) REFERENCES livros (livro_id)
);

                                          ^