Feature: Product API

    Scenario: Get all products anonymously
        Given I load fixtures "product.json"
        When I request "GET" "/api/products"
        Then the response code should be 401

    Scenario: Get all products with admin
        Given I load fixtures "user.json,product.json"
        And I am authenticated as "admin"
        When I request "GET" "/api/products"
        Then I should receive an empty array
        And the response code should be 200

    Scenario: Get all products with user
        Given I load fixtures "user.json,product.json"
        And I am authenticated as "user"
        When I request "GET" "/api/products"
        Then I should receive an empty array
        And the response code should be 200

    Scenario: Get all products with admin
        Given I load fixtures "user.json,product.json"
        And I am authenticated as "user"
        When I request "GET" "/api/products"
        Then I should receive 4 products
        And the response code should be 200

    Scenario: Get all products with user
        Given I load fixtures "user.json,product.json"
        And I am authenticated as "user"
        When I request "GET" "/api/products"
        Then I should receive 4 products
        And the response code should be 200

    Scenario: Get a product with admin
        Given I load fixtures "user.json,product.json"
        And I am authenticated as "admin"
        When I request "GET" "/api/products/{{ tshirt1.id }}"
        Then the response code should be 200
        And I should receive an element with the following attributes
            | id   | {{ tshirt1.id }}   |
            | name | {{ tshirt1.name }} |

    Scenario: Get a product with user
        Given I load fixtures "user.json,product.json"
        And I am authenticated as "user"
        When I request "GET" "/api/products/{{ tshirt1.id }}"
        Then the response code should be 200
        And I should receive an element with the following attributes
            | id   | {{ tshirt1.id }}   |
            | name | {{ tshirt1.name }} |

    Scenario: Get a product anonymously
        Given I load fixtures "product.json"
        When I request "GET" "/api/products/-1"
        Then the response code should be 401

    Scenario: Get a product with bad id
        Given I load fixtures "user.json,product.json"
        When I request "GET" "/api/products/-1"
        Then the response code should be 404

    Scenario: Create a product anonymously
        Given I load fixtures "product.json"
        Given I have a payload
            | name  | "new tshirt" |
            | price | 40        |
        When I request "POST" "/api/products" with payload
        Then the response code should be 401

    Scenario: Create a product with admin
        Given I load fixtures "user.json,product.json"
        And I am authenticated as "admin"
        And I have a payload
            | name  | "new tshirt" |
            | price | 40           |
        When I request "POST" "/api/products" with payload
        Then I should have a property "id"
        And I should have a property "name"
        And I should have a property "price"
        And the response code should be 201
        And I should receive a element with the following attributes
            | name  | "new tshirt" |
            | price | 40           |

    Scenario: Create a product with user
        Given I load fixtures "user.json,product.json"
        And I am authenticated as "user"
        And I have a payload
            | name  | "new tshirt" |
            | price | 40        |
        When I request "POST" "/api/products" with payload
        Then I should have a property "id"
        Then I should have a property "name"
        Then I should have a property "price"
        And the response code should be 201
        And I should receive a element with the following attributes
            | name  | "new tshirt" |
            | price | 100          |

    Scenario: Completely edit a product anonymously
        Given I load fixtures "user.json,product.json"
        And I have a payload
            | name  | "new name" |
            | price | 200        |
        When I request "PUT" "/api/products/{{ thsirt2.id }}" with payload
        Then the response code should be 401

    Scenario: Completely edit a product with admin
        Given I load fixtures "user.json,product.json"
        And I am authenticated as "admin"
        And I have a payload
            | name  | "new name" |
            | price | 200        |
        When I request "PUT" "/api/products/{{ thsirt2.id }}" with payload
        Then I should have a property "id"
        And I should have a property "name"
        And I should have a property "price"
        And the response code should be 200
        And I should receive a element with the following attributes
            | id    | 1          |
            | name  | "new name" |
            | price | 200        |

    Scenario: Completely edit a product with wrong user
        Given I load fixtures "user.json,product.json"
        And I am authenticated as "user"
        And I have a payload
            | name  | "new name" |
            | price | 200        |
        When I request "PUT" "/api/products/{{ thsirt2.id }}" with payload
        Then the response code should be 403

    Scenario: Completely edit a product with right user
        Given I load fixtures "user.json,product.json"
        And I am authenticated as "user"
        And I have a payload
            | name  | "new name" |
            | price | 200        |
        When I request "PUT" "/api/products/{{ thsirt2.id }}" with payload
        Then I should have a property "id"
        And the response code should be 200
        And I should receive a element with the following attributes
            | id    | 1          |
            | name  | "new name" |
            | price | 200        |

    Scenario: Partially edit a product anonymously
        Given I load fixtures "user.json,product.json"
        And I have a payload
            | price | 35         |
        When I request "PATCH" "/api/products/{{ pantalon1.id }}" with payload
        Then I should have a property "id"
        And the response code should be 200
        And I should receive a element with the following attributes
            | id    | {{ pantalon1.id }}    |
            | name  | {{ pantalon1.name }}  |
            | price | 35                    |

    Scenario: Partially edit a product with admin
        Given I load fixtures "user.json,product.json"
        And I am authenticated as "admin"
        And I have a payload
            | price | 35         |
        When I request "PATCH" "/api/products/{{ pantalon1.id }}" with payload
        Then I should have a property "id"
        And the response code should be 200
        And I should receive a element with the following attributes
            | id    | {{ pantalon1.id }}    |
            | name  | {{ pantalon1.name }}  |
            | price | 35                    |

    Scenario: Partially edit a product with wrong user
        Given I load fixtures "user.json,product.json"
        And I am authenticated as "user"
        And I have a payload
            | price | 45         |
        When I request "PATCH" "/api/products/1" with payload
        Then the response code should be 403
        
    Scenario: Partially edit a product with right user
        Given I load fixtures "user.json,product.json"
        And I am authenticated as "user"
        And I have a payload
            | price | 35         |
        When I request "PATCH" "/api/products/{{ pantalon1.id }}" with payload
        Then I should have a property "id"
        And the response code should be 200
        And I should receive a element with the following attributes
            | id    | {{ pantalon1.id }}    |
            | name  | {{ pantalon1.name }}  |
            | price | 35                    |

    Scenario: Delete a product anonymously
        Given I load fixtures "product.json"
        When I request "DELETE" "/api/products/{{ tshirt1.id }}"
        Then the response code should be 401

    Scenario: Delete a product with admin
        Given I load fixtures "user.json,product.json"
        And I am authenticated as "admin"
        When I request "DELETE" "/api/products/{{ tshirt2.id }}"
        Then the response code should be 200

    Scenario: Delete a product with right access
        Given I load fixtures "user.json,product.json"
        And I am authenticated as "user"
        When I request "DELETE" "/api/products/{{ pantalon1.id }}"
        Then the response code should be 200

    Scenario: Delete a product with wrong access
        Given I load fixtures "user.json,product.json"
        And I am authenticated as "user"
        When I request "DELETE" "/api/products/{{ pantalon2.id }}"
        Then the response code should be 403
