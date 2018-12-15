insert into person (first_name, last_name) values ('User', 'A');
insert into person (first_name, last_name) values ('User', 'S');
insert into person (first_name, last_name) values ('User', 'D');

insert into user (username, password, active, person_id) values ('a', '$2a$10$ukMhMWI/6GCu62P0Ag9KM.ka8OZ5584Tl0VQ9vKonck1eMMqW8IwK', true, select id from person where first_name = 'User' and last_name = 'A'); -- string
insert into user (username, password, active, person_id) values ('s', '$2a$10$ukMhMWI/6GCu62P0Ag9KM.ka8OZ5584Tl0VQ9vKonck1eMMqW8IwK', true, select id from person where first_name = 'User' and last_name = 'S'); -- string
insert into user (username, password, active, person_id) VALUES ('d', '$2a$10$ukMhMWI/6GCu62P0Ag9KM.ka8OZ5584Tl0VQ9vKonck1eMMqW8IwK', true, select id from person where first_name = 'User' and last_name = 'D'); -- string

insert into authority_group (name) values ('admin');
insert into authority_group (name) values ('user');

insert into authority_group_users (groups_id, users_id) values (select id from authority_group where name = 'admin', select id from user where username = 'a');
insert into authority_group_users (groups_id, users_id) values (select id from authority_group where name = 'user', select id from user where username = 'a');
insert into authority_group_users (groups_id, users_id) values (select id from authority_group where name = 'user', select id from user where username = 'd');
insert into authority_group_users (groups_id, users_id) values (select id from authority_group where name = 'user', select id from user where username = 's');

insert into authority (authority, group_id) values ('ADMIN', select id from authority_group where name = 'admin');
insert into authority (authority, group_id) values ('USER', select id from authority_group where name = 'user');

insert into movie (title, release, owner_id) values('Lord of the Rings', date'2001-12-19', select id from user where username = 'a');
insert into movie (title, release, owner_id) values('Lord of the Rings1', date'2002-01-02', select id from user where username = 'a');
insert into movie (title, release, owner_id) values('Lord of the Rings2', date'2002-01-03', select id from user where username = 'a');
insert into movie (title, release, owner_id) values('Lord of the Rings3', date'2002-01-04', select id from user where username = 's');
insert into movie (title, release, owner_id) values('Lord of the Rings4', date'2002-01-05', select id from user where username = 's');
insert into movie (title, release, owner_id) values('Lord of the Rings5', date'2002-01-06', select id from user where username = 's');
insert into movie (title, release, owner_id) values('Lord of the Rings6', date'2002-01-07', select id from user where username = 's');
insert into movie (title, release, owner_id) values('Lord of the Rings7', date'2002-01-08', select id from user where username = 'd');
insert into movie (title, release, owner_id) values('Lord of the Rings8', date'2002-01-09', select id from user where username = 'd');
insert into movie (title, release, owner_id) values('Lord of the Rings9', date'2002-01-10', select id from user where username = 'd');

insert into person (first_name, last_name) values ('Sean', 'Bean');

insert into actor (person_id) values( select id from person where first_name = 'Sean' and last_name = 'Bean');
insert into movie_actors(participates_id, actors_id) values ( select id from movie where title = 'Lord of the Rings', select id from actor where person_id = select id from person where first_name = 'Sean' and last_name = 'Bean');