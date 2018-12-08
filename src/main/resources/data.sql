insert into person (first_name, last_name) values ('Super', 'User');

insert into user (username, password, active) values ('admin', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', true ); -- a
insert into user (username, password, active, person_id) values ('a', '$2a$10$ukMhMWI/6GCu62P0Ag9KM.ka8OZ5584Tl0VQ9vKonck1eMMqW8IwK', true, select id from person where first_name = 'Super' and last_name = 'User'); -- string
insert into user (username, password, active) values ('bob', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', true); -- a
insert into user (username, password, active) VALUES ('s', '$2a$10$ukMhMWI/6GCu62P0Ag9KM.ka8OZ5584Tl0VQ9vKonck1eMMqW8IwK', true); -- string
insert into user (username, password, active) VALUES ('user', '$2a$10$SUqrCmfdsIXGUWGhHW.9JOwQeSVVeQIPYFb7btSE.dI9e8ygb1Jge', true); -- string
insert into user (username, password, active) VALUES ('ad', '$2a$10$YI5SRl5OwiLS//AL.zGo/O6YxLWogcbIPkV54Zp9F7TXZ4Tk6JXRe', true); -- L
insert into user (username, password, active) VALUES ('superadmin', '$2a$10$.vqKeONK..aJ1Dy1P6z5peftRXek8S0dBC4hJmiIUe8lezmO4t9nu', true); -- string




insert into authority_group (name) values ('admin');
insert into authority_group (name) values ('user');

insert into authority_group_users (groups_id, users_id) values (select id from authority_group where name = 'admin', select id from user where username = 'admin');
insert into authority_group_users (groups_id, users_id) values (select id from authority_group where name = 'user', select id from user where username = 'admin');
insert into authority_group_users (groups_id, users_id) values (select id from authority_group where name = 'user', select id from user where username = 'a');

insert into authority (authority, group_id) values ('USER.CREATE', select id from authority_group where name = 'admin');
insert into authority (authority, group_id) values ('USER.READ:ANY', select id from authority_group where name = 'admin');
insert into authority (authority, group_id) values ('USER.UPDATE:ANY', select id from authority_group where name = 'admin');
insert into authority (authority, group_id) values ('USER.DELETE:ANY', select id from authority_group where name = 'admin');
insert into authority (authority, group_id) values ('ROUTE.HELLO', select id from authority_group where name = 'admin');

insert into authority (authority, group_id) values ('USER.READ:SELF', select id from authority_group where name = 'user');
insert into authority (authority, group_id) values ('USER.UPDATE:SELF', select id from authority_group where name = 'user');
insert into authority (authority, group_id) values ('USER.DELETE:SELF', select id from authority_group where name = 'user');
insert into authority (authority, group_id) values ('ROUTE.DASHBOARD', select id from authority_group where name = 'user');
insert into authority (authority, group_id) values ('READ', select id from authority_group where name = 'user');
insert into authority (authority, group_id) values ('WRITE', select id from authority_group where name = 'user');

insert into movie (title, release) values('Lord of the Rings', date'2002-01-01');
insert into movie (title, release) values('Lord of the Rings1', date'2002-01-02');
insert into movie (title, release) values('Lord of the Rings2', date'2002-01-03');
insert into movie (title, release) values('Lord of the Rings3', date'2002-01-04');
insert into movie (title, release) values('Lord of the Rings4', date'2002-01-05');
insert into movie (title, release) values('Lord of the Rings5', date'2002-01-06');
insert into movie (title, release) values('Lord of the Rings6', date'2002-01-07');
insert into movie (title, release) values('Lord of the Rings7', date'2002-01-08');
insert into movie (title, release) values('Lord of the Rings8', date'2002-01-09');
insert into movie (title, release) values('Lord of the Rings9', date'2002-01-10');