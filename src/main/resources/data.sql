insert into user (username, password, active) values ('admin', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', true );
insert into user (username, password, active) values ('a', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', true);
insert into user (username, password, active) values ('bob', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', true);

insert into authority_group (name) values ('admin');
insert into authority_group (name,) values ('user');

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


insert into movie (name, release) values('Lord of the Rings', date'2002-01-01');