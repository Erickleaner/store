create table `groups`
(
    group_id   int unsigned null,
    group_name varchar(30)  null
)
    engine = MyISAM;

INSERT INTO assignment1.`groups` (group_id, group_name) VALUES (2001, 'Frozen Food');
INSERT INTO assignment1.`groups` (group_id, group_name) VALUES (2002, 'Fresh Food');
INSERT INTO assignment1.`groups` (group_id, group_name) VALUES (2003, 'Beverages');
