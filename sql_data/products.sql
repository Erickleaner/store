create table products
(
    product_id    int unsigned null,
    product_name  varchar(20)  null,
    unit_price    float(8, 2)  null,
    unit_quantity varchar(15)  null,
    in_stock      int unsigned null,
    product_img   varchar(127) null,
    group_id      int unsigned null
)
    engine = MyISAM;

INSERT INTO assignment1.products (product_id, product_name, unit_price, unit_quantity, in_stock, product_img, group_id) VALUES (1000, 'Navel Oranges', 3.99, 'Bag 20', 200, 'oranges.png', 2002);
INSERT INTO assignment1.products (product_id, product_name, unit_price, unit_quantity, in_stock, product_img, group_id) VALUES (1001, 'T Bone Steak', 7, '1000 gram', 200, 't_Bone_steak.png', 2002);
INSERT INTO assignment1.products (product_id, product_name, unit_price, unit_quantity, in_stock, product_img, group_id) VALUES (1002, 'Fish Fingers', 2.55, '500 gram', 1500, 'fish_fingers.png', 2001);
INSERT INTO assignment1.products (product_id, product_name, unit_price, unit_quantity, in_stock, product_img, group_id) VALUES (1004, 'Instance Coffee', 2.89, '200 gram', 497, 'instance_coffee.png', 2003);
