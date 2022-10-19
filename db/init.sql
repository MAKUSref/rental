CREATE TABLE products (
    product_id INT GENERATED ALWAYS AS IDENTITY,
    product_type character varying(255) NOT NULL,
    base_price FLOAT NOT NULL,
    title character varying(255) NOT NULL,
    category character varying(255) NOT NULL,
    serialNumber character varying(255) NOT NULL,
    difficulty_level  character varying(255),
    PRIMARY KEY(product_id)
);

CREATE TABLE clients (
    client_name character varying(255) NOT NULL,
    client_surname character varying(255) NOT NULL,
    client_pid character varying(255) NOT NULL,
    PRIMARY KEY(client_pid)
);


CREATE TABLE addresses (
    client_pid INT NOT NULL,
    city character varying(255) NOT NULL,
    street character varying(255) NOT NULL,
    house_number character varying(255) NOT NULL,
    CONSTRAINT fk_clients
        FOREIGN KEY(client_pid)
            REFERENCES clients(client_pid)
);


CREATE TABLE rents (
    rent_id INT NOT NULL,
    client_pid INT NOT NULL,
    product_id INT NOT NULL,
    rent_cost FLOAT,
    begin_time DATE NOT NULL DEFAULT CURRENT_DATE,
    end_time DATE,
    PRIMARY KEY(rent_id),
    CONSTRAINT fk_clients
        FOREIGN KEY(client_pid)
            REFERENCES clients(client_pid),

    CONSTRAINT fk_products
        FOREIGN KEY(product_id)
            REFERENCES products(product_id)
)


INSERT INTO 
    products (product_type, base_price, title, category, serialNumber) 
VALUES 
    ('Movie', 3, 'Dracula', 'horror', 'asdcvgtre2213fvds'), 
    ('Movie', 4, 'Shrek', 'family', 'ajsf89132finsahf'), 
    ('Movie', 2, 'Mask', 'family', 'j9f09ano291sa'), 
    ('Movie', 1, 'Potop', 'history', 'da2d12fgrtyn'), 
    ('Movie', 5, 'Avatar', 'family', 'asdcvgtre2213fvds'),
    ('Music', 3, 'Michael Jackson', 'pop', 'asdcvgtre2213fvds'),
    ('Music', 4, 'Marlyn Manson', 'metal', 'ajsf89132finsahf'),
    ('Music', 2, 'Zenek Martyniuk', 'disco-polo', 'j9f09ano291sa'),
    ('Music', 1, 'Bracia Figo Fagot', 'disco-polo', 'da2d12fgrtyn'),
    ('Music', 5, 'Nirvana', 'rock', 'asdcvgtre2213fvds');


INSERT INTO 
    products(product_type, base_price, title, category, serialNumber, difficulty_level)
VALUES 
    ('VideoGame', 3, 'Tomb Rider', 'adventure', 'asdcvgtre2213fvds', 'Easy'),
    ('VideoGame', 4, 'Pacman', 'old', 'ajsf89132finsahf', 'Hard'),
    ('VideoGame', 2, 'Snake', 'old', 'j9f09ano291sa', 'Easy'),
    ('BoardGame', 1, 'Munchkin', 'card', 'da2d12fgrtyn', 'Medium'),
    ('BoardGame', 5, 'Chess', 'logic', 'asdcvgtre2213fvds', 'Easy');