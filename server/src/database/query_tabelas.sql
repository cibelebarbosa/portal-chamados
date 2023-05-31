create database dbApiChamados;

use dbApiChamados;

create table chamados (
	id int primary key auto_increment,
    titulo varchar(30),
    descricao varchar(100),
    status int,
    data_registro timestamp null default current_timestamp,
    ra varchar(30),
    telefone varchar(30),
    curso int,
    aluno varchar (30),
    comentario varchar(30)
);

create table usuarios (
	id int primary key auto_increment,
    id_coordenador int,
    email varchar(100),
    senha varchar(30),
    FOREIGN KEY (id_coordenador) REFERENCES coordenadores(id)
);

create table coordenadores (
	id int primary key auto_increment,
    nome varchar(100),
    email varchar(100)
);

create table escalas (
	id_escala int primary key auto_increment,
    id_coordenador int,
	FOREIGN KEY (id_coordenador) REFERENCES coordenadores(id),
    dia int,
    horaInicio varchar(30),
    horaFim varchar(30)
);


