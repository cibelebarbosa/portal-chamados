create database dbApiChamados;

use dbApiChamados;

create table chamados (
	id int primary key auto_increment,
    titulo varchar(30),
    descricao varchar(100),
    status int,
    aluno int (30)
);

create table cursos (
	id int primary key auto_increment,
    curso varchar(100)
);

create table coordenadores (
	id int primary key auto_increment,
    curso varchar(100)
);

INSERT INTO cursos (curso) VALUES ('Educação Física');

select * from chamados;

insert into chamados ( titulo, descricao, status, ra, telefone, curso, aluno) values ( 'teste2', 'teste2', '0', '123', '123', '2', 'paulo');

ALTER TABLE chamados DROP COLUMN aluno, ADD column aluno varchar(30)