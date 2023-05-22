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

create table cursos (
	id int primary key auto_increment,
    curso varchar(100)
);

create table coordenadores (
	id int primary key auto_increment,
    curso varchar(100)
);

create table usuarios (
	id int primary key auto_increment,
    email varchar(100),
    senha varchar(30)
);