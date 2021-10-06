insert into clientes (nome, email, senha, telefone, endereco) values ('Giovana Betina Barbosa', 'giovanabetinabarbosa@gmail.com', 'ZjRxDsNQt4', '27998835914', 'Rua Tancredo Neves 639, Serra-ES');
insert into clientes (nome, email, senha, telefone, endereco) values ('Gael Geraldo da Conceição', 'ggconceicao@gmail.com', 'MRalkmBOJq', '69994235684', 'Rua Modigliani 148, Porto Velho-RO');
insert into clientes (nome, email, senha, telefone, endereco) values ('Francisca Isabel Vieira', 'franvieira@gmail.com', 'kW1bnjci70', '85827093319', 'Rua Dom Henrique 182, São Luís-MA');
insert into clientes (nome, email, senha, telefone, endereco) values ('Sarah Carolina da Conceição', 'ssarahcarolinadaconceicao@gmail.com', '54bOsJjloe', '71387384988', 'Rua Poeta Evaristo de Souza 460, Natal-RN');
insert into clientes (nome, email, senha, telefone, endereco) values ('Vitor Martin Pinto', 'vvitormartinpinto@gmail.com', 'GGh0SmQ5Wo', '13720467392', 'Rua Quarenta e Nove 356, São Luís-MA');

insert into autores (nome, email, telefone) values ('Carolina Milena Almada', 'ccarolinamilenaalmada@gmail.com', '83996565550');
insert into autores (nome, email, telefone) values ('Yago Raul da Rocha', 'yyagorauldarocha@gmail.com', '63987932013');
insert into autores (nome, email, telefone) values ('César Lucca Alves', 'cesarluccaalv@gmail.com', '63998823896');

insert into livros (nome, valor, estoque, autor_id) values ('APIs em Node.js', 90, 25, 1);
insert into livros (nome, valor, estoque, autor_id) values ('JavaScript Moderno', 60, 5, 1);
insert into livros (nome, valor, estoque, autor_id) values ('Express na Prática', 45, 35, 1);
insert into livros (nome, valor, estoque, autor_id) values ('Bancos de Dados Relacionais', 130, 15, 2);
insert into livros (nome, valor, estoque, autor_id) values ('Bancos de Dados NoSQL', 110, 2, 3);
insert into livros (nome, valor, estoque, autor_id) values ('Autenticação e Autorização em APIs', 70, 60, 3);

insert into vendas (valor, data, cliente_id, livro_id) values (90, '2000-08-10', 1, 1);
insert into vendas (valor, data, cliente_id, livro_id) values (60, '2000-10-20', 1, 2);
insert into vendas (valor, data, cliente_id, livro_id) values (130, '2000-10-12', 1, 4);
insert into vendas (valor, data, cliente_id, livro_id) values (60, '2000-01-6', 2, 2);
insert into vendas (valor, data, cliente_id, livro_id) values (45, '2000-03-2', 2, 3);
insert into vendas (valor, data, cliente_id, livro_id) values (110, '2000-04-9', 2, 5);
insert into vendas (valor, data, cliente_id, livro_id) values (90, '2000-02-11', 3, 1);
insert into vendas (valor, data, cliente_id, livro_id) values (60, '2000-04-15', 3, 2);
insert into vendas (valor, data, cliente_id, livro_id) values (45, '2000-05-14', 3, 3);
insert into vendas (valor, data, cliente_id, livro_id) values (130, '2000-06-12', 3, 4);
insert into vendas (valor, data, cliente_id, livro_id) values (110, '2000-09-19', 3, 5);
insert into vendas (valor, data, cliente_id, livro_id) values (70, '2000-12-20', 3, 6);
insert into vendas (valor, data, cliente_id, livro_id) values (110, '2000-11-2', 4, 5);
insert into vendas (valor, data, cliente_id, livro_id) values (70, '2000-11-9', 4, 6);
insert into vendas (valor, data, cliente_id, livro_id) values (45, '2000-12-14', 5, 3);


