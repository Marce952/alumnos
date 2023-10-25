create database nora_romano;
use nora_romano;

create table alumnos(
	idAlumnos int auto_increment primary key,
	nombre varchar(100) not null,
    password varchar(100) not null,
    dni int not null unique,
    contraseña varchar(50) not null,
	tarea1 bool default 0,
    tarea2 bool default 0,
    tarea3 bool default 0,
    tarea4 bool default 0
);

create table administrador(
	idAdministrador int auto_increment primary key,
	legajo int not null,
    password varchar(50) not null
);

select * from alumnos;

update alumnos set contraseña = 1234 where idAlumnos = 2;
select * from administrador;
select * from alumnos;

insert into administrador (legajo, contraseña) values (20045, 'admin1234NR');


alter table alumnos modify tarea4 char default '0';
alter table alumnos add tarea2 bool default 0;
alter table alumnos add tarea3 bool default 0;
alter table alumnos add tarea4 bool default 0;

update alumnos set tarea1 = 0 where dni = 123;
update alumnos set tarea2 = 0 where dni = 123;
update alumnos set tarea3 = 0 where dni = 123;
update alumnos set tarea4 = 0 where dni = 123;

select * from alumnos;
desc alumnos;
