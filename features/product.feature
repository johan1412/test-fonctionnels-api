Feature: Product API

    Scenario: Get all products anonymously
        Given I load fixtures "product.json"
        When I request "GET" "/products"
        Then the response code should be 401

    Scenario: Get all products with admin
        Given I load fixtures "user.json"
        And I am authenticated as "admin"
        When I request "GET" "/products"
        Then I should receive an empty array
        And the response code should be 200

    Scenario: Get all products with user
        Given I load fixtures "user.json"
        And I am authenticated as "user"
        When I request "GET" "/products"
        Then I should receive an empty array
        And the response code should be 200

    Scenario: Get all products with admin
        Given I load fixtures "user.json,product.json"
        And I am authenticated as "user"
        When I request "GET" "/products"
        Then I should receive 4 products
        And the response code should be 200

    Scenario: Get all products with user
        Given I load fixtures "user.json,product.json"
        And I am authenticated as "user"
        When I request "GET" "/products"
        Then I should receive 4 products
        And the response code should be 200

    Scenario: Get a product
        Given I load fixtures "product.json"
        When I request "GET" "/products/{{ tshirt1.id }}"
        Then I should receive an element with the following attributes
            | id   | {{ tshirt1.id }}   |
            | name | {{ tshirt1.name }} |

    Scenario: Create a product
        Given I have a payload
            | name  | "Product 1" |
            | price | 100         |
        When I request "POST" "/products" with payload
        Then I should have the following properties
            | "id"    |
            | "name"  |
            | "price" |
        And the response code should be 201
        And I should receive a element with the following attributes
            | name  | "Product 1" |
            | price | 100         |

    Scenario: Completelly edit a product
        Given I load fixtures "user.json,product.json"
        And I am authenticated as "admin"
        And I have a payload
            | name  | "Product test" |
            | price | 200            |
        When I request "PUT" "/products/{{ thsirt2.id }}" with payload
        Then I should have a property "id"
        And the response code should be 200
        And I should receive a element with the following attributes
            | id    | 1              |
            | name  | "Product test" |
            | price | 200            |

    Scenario: Partially edit a product
        Given I have a payload
            | name  | "Product 1" |
            | price | 200         |
        When I request "PATCH" "/products/1" with payload
        Then I should have a property "id"
        And the response code should be 200
        And I should receive a element with the following attributes
            | id    | 1           |
            | name  | "Product 1" |
            | price | 200         |

    Scenario: Delete a product with right access
        When I request "DELETE" "/products/1"
        Then the response code should be 200

    Scenario: Delete a product with wrong access
        When I request "DELETE" "/products/2"
        Then the response code should be 403