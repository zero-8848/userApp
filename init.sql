USE userdb;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50),
  phone VARCHAR(15),
  email VARCHAR(100),
  password VARCHAR(100)
);