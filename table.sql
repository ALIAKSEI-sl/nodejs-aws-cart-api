INSERT INTO cart_items (cart_id, product_id, count)
VALUES ('09af6985-9061-4356-8f92-2eeaa5464e5e', 'e7cd0f79-c949-4f5d-b918-c3f90a1fe242', 10),
       ('d030fcaf-e413-4dfa-b29b-3daa3a7a5727', 'c0734603-21f4-4ad2-8b73-27f342b5e816', 20),

INSERT INTO carts (id, user_id, created_at, updated_at, status)
VALUES ('09af6985-9061-4356-8f92-2eeaa5464e5e', '267851a1-295e-4291-8144-86888cde4276', CURRENT_DATE, CURRENT_DATE, 'OPEN'),
       ('d030fcaf-e413-4dfa-b29b-3daa3a7a5727', '9e0ff760-50de-4401-be0a-70471dec0475', CURRENT_DATE, CURRENT_DATE, 'ORDERED');
