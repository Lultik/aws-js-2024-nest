INSERT INTO carts (id, user_id, created_at, updated_at, status) VALUES
('502c0301-64a8-4b5b-8b63-a931cc6470b1', '22e79ce0-97aa-47fa-8155-fb15d0f1aba2', NOW(), NOW(), 'OPEN'),
('64569ffe-2747-48a7-bc75-9d3fe94d1203', 'ae44dc62-95e9-4f39-bc27-9b9662e17656', NOW(), NOW(), 'ORDERED');

INSERT INTO cart_items (cart_id, product_id, count) VALUES
('502c0301-64a8-4b5b-8b63-a931cc6470b1', 'df5bb237-a769-4c7f-88b8-6dce6efab518', 2),
('502c0301-64a8-4b5b-8b63-a931cc6470b1', 'b5f0a319-a105-48b0-b594-8968d360b635', 3),
('64569ffe-2747-48a7-bc75-9d3fe94d1203', 'dd9be99b-34f4-4b5d-ae88-cbf469638e2c', 1);
