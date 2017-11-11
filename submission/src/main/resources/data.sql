--Currency table
INSERT INTO CURRENCY (code, name)         VALUES ('HUF', 'Hungarian Forint');
INSERT INTO CURRENCY (code, name, symbol) VALUES ('EUR', 'Euro', '€');
INSERT INTO CURRENCY (code, name, symbol) VALUES ('GBP', 'Pound sterling', '£');
INSERT INTO CURRENCY (code, name, symbol) VALUES ('USD', 'United States dollar', '$');
INSERT INTO CURRENCY (code, name, symbol) VALUES ('ZWR', 'Zimbabwean dollar', 'Z$');

--CurrencyRate table
INSERT INTO CURRENCY (from, to, rate) VALUES ('HUF', 'HUF', 1);
INSERT INTO CURRENCY (from, to, rate) VALUES ('HUF', 'EUR', 0.00320630974);
INSERT INTO CURRENCY (from, to, rate) VALUES ('HUF', 'GBP', 0.00283548143);
INSERT INTO CURRENCY (from, to, rate) VALUES ('HUF', 'USD', 0.00374);
INSERT INTO CURRENCY (from, to, rate) VALUES ('HUF', 'ZWR', 3.73);

INSERT INTO CURRENCY (from, to, rate) VALUES ('EUR', 'HUF', 311.885027);
INSERT INTO CURRENCY (from, to, rate) VALUES ('EUR', 'EUR', 1);
INSERT INTO CURRENCY (from, to, rate) VALUES ('EUR', 'GBP', 0.8843442);
INSERT INTO CURRENCY (from, to, rate) VALUES ('EUR', 'USD', 1.16645);
INSERT INTO CURRENCY (from, to, rate) VALUES ('EUR', 'ZWR', 422.175);

INSERT INTO CURRENCY (from, to, rate) VALUES ('GBP', 'HUF', 352.673797);
INSERT INTO CURRENCY (from, to, rate) VALUES ('GBP', 'EUR', 1.13078143);
INSERT INTO CURRENCY (from, to, rate) VALUES ('GBP', 'GBP', 1);
INSERT INTO CURRENCY (from, to, rate) VALUES ('GBP', 'USD', 1.31900);
INSERT INTO CURRENCY (from, to, rate) VALUES ('GBP', 'ZWR', 477.369);

INSERT INTO CURRENCY (from, to, rate) VALUES ('USD', 'HUF', 267.379679);
INSERT INTO CURRENCY (from, to, rate) VALUES ('USD', 'EUR', 0.85730207);
INSERT INTO CURRENCY (from, to, rate) VALUES ('USD', 'GBP', 0.758150114);
INSERT INTO CURRENCY (from, to, rate) VALUES ('USD', 'USD', 1);
INSERT INTO CURRENCY (from, to, rate) VALUES ('USD', 'ZWR', 361.900);

INSERT INTO CURRENCY (from, to, rate) VALUES ('ZWR', 'HUF', 0.742134);
INSERT INTO CURRENCY (from, to, rate) VALUES ('ZWR', 'EUR', 0.00236869);
INSERT INTO CURRENCY (from, to, rate) VALUES ('ZWR', 'GBP', 0.00209482);
INSERT INTO CURRENCY (from, to, rate) VALUES ('ZWR', 'USD', 0.00276319);
INSERT INTO CURRENCY (from, to, rate) VALUES ('ZWR', 'ZWR', 1);


