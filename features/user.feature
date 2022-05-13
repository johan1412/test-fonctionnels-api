Feature: User API

    Scenario: Get all users anonymously
        Given I load fixtures "user.json"
        When I request "GET" "/users"
        Then the response code should be 401

    Scenario: Get all users with user
        Given I load fixtures "user.json"
        And I am authenticated as "user"
        When I request "GET" "/users"
        Then the response code should be 403

    Scenario: Get all users with admin
        Given I load fixtures "user.json"
        And I am authenticated as "admin"
        When I request "GET" "/users"
        Then I should receive 2 users
        And the response code should be 200

    Scenario: Get a user with admin
        Given I load fixtures "user.json"
        And I am authenticated as "admin"
        When I request "GET" "/users/{{ user1.id }}"
        Then the response code should be 200
        And I should receive an element with the following attributes
            | id       | {{ user1.id }}       |
            | name     | {{ user1.name }}     |
            | email    | {{ user1.email }}    |
            | password | {{ user1.password }} |
            | role     | {{ user1.role }}     |

    Scenario: Get a user with user
        Given I load fixtures "user.json"
        And I am authenticated as "user"
        When I request "GET" "/users/{{ user1.id }}"
        Then the response code should be 403

    Scenario: Get a user anonymously
        Given I load fixtures "user.json"
        When I request "GET" "/users/{{ user1.id }}"
        Then the response code should be 401

    Scenario: Get a user with bad id
        Given I load fixtures "user.json"
        And I am authenticated as "admin"
        When I request "GET" "/users/-1"
        Then the response code should be 404

    Scenario: Create a user anonymously
        Given I load fixtures "user.json"
        Given I have a payload
            | name       | "nom"          |
            | email      | "test@test.fr" |
            | password   | "mdpmdpmdp"    |
        When I request "POST" "/users" with payload
        Then I should have a property "id"
        And I should have a property "name"
        And I should have a property "email"
        And I should have a property "password"
        And the response code should be 201
        And I should receive an element with the following attributes
            | name       | "nom"          |
            | email      | "test@test.fr" |
            | password   | "mdpmdpmdp"    |

    Scenario: Create a user with admin
        Given I load fixtures "user.json"
        And I am authenticated as "admin"
        And I have a payload
            | name       | "nom"          |
            | email      | "test@test.fr" |
            | password   | "mdpmdpmdp"    |
        When I request "POST" "/users" with payload
        Then I should have a property "id"
        And I should have a property "name"
        And I should have a property "email"
        And I should have a property "password"
        And the response code should be 201
        And I should receive an element with the following attributes
            | name       | "nom"          |
            | email      | "test@test.fr" |
            | password   | "mdpmdpmdp"    |

    Scenario: Create a user with user
        Given I load fixtures "user.json"
        And I am authenticated as "user"
        And I have a payload
            | name       | "nom"          |
            | email      | "test@test.fr" |
            | password   | "mdpmdpmdp"    |
        When I request "POST" "/users" with payload
        Then I should have a property "id"
        And I should have a property "name"
        And I should have a property "email"
        And I should have a property "password"
        And the response code should be 201
        And I should receive an element with the following attributes
            | name       | "nom"          |
            | email      | "test@test.fr" |
            | password   | "mdpmdpmdp"    |


    Scenario: Completely edit a user anonymously
        Given I load fixtures "user.json"
        And I have a payload
            | name       | "nom"          |
            | email      | "test@test.fr" |
            | password   | "mdpmdpmdp"    |
        When I request "PUT" "/users/{{ user1.id }}" with payload
        Then the response code should be 401

    Scenario: Completely edit a user with admin
        Given I load fixtures "user.json"
        And I am authenticated as "admin"
        And I have a payload
            | name       | "nom"          |
            | email      | "test@test.fr" |
            | password   | "mdpmdpmdp"    |
        When I request "PUT" "/users/{{ user1.id }}" with payload
        Then I should have a property "id"
        And I should have a property "name"
        And I should have a property "email"
        And I should have a property "password"
        And the response code should be 200
        And I should receive a element with the following attributes
            | name       | "nom"          |
            | email      | "test@test.fr" |
            | password   | "mdpmdpmdp"    |

    Scenario: Completely edit a user with wrong user
        Given I load fixtures "user.json"
        And I am authenticated as "user"
        And I have a payload
            | name       | "nom"          |
            | email      | "test@test.fr" |
            | password   | "mdpmdpmdp"    |
        When I request "PUT" "/users/{{ user1.id }}" with payload
        Then the response code should be 403

    Scenario: Completely edit a user with right user
        Given I load fixtures "user.json"
        And I am authenticated as "user"
        And I have a payload
            | name       | "nom"          |
            | email      | "test@test.fr" |
            | password   | "mdpmdpmdp"    |
        When I request "PUT" "/users/{{ user1.id }}" with payload
        Then I should have a property "id"
        And I should have a property "name"
        And I should have a property "email"
        And I should have a property "password"
        And the response code should be 200
        And I should receive a element with the following attributes
            | name       | "nom"          |
            | email      | "test@test.fr" |
            | password   | "mdpmdpmdp"    |

    Scenario: Partially edit a user anonymously
        Given I load fixtures "user.json"
        And I have a payload
            | email      | "test2@test2.fr" |
        When I request "PATCH" "/users/{{ user1.id }}" with payload
        Then the response code should be 403

    Scenario: Partially edit a user with admin
        Given I load fixtures "user.json"
        And I am authenticated as "admin"
        And I have a payload
            | email      | "test2@test2.fr" |
        When I request "PATCH" "/users/{{ user1.id }}" with payload
        And the response code should be 200
        And I should receive an element with the following attributes
            | name       | {{ user1.name }}     |
            | email      | "test2@test2.fr"     |
            | password   | {{ user1.password }} |

    Scenario: Partially edit a user with wrong user
        Given I load fixtures "user.json"
        And I am authenticated as "user"
        And I have a payload
            | email | "test3@test3.fr" |
        When I request "PATCH" "/users/{{ user1.id }}" with payload
        Then the response code should be 403
        
    Scenario: Partially edit a user with right user
        Given I load fixtures "user.json"
        And I am authenticated as "user"
        And I have a payload
            | email | "test3@test3.fr" |
        When I request "PATCH" "/users/{{ user1.id }}" with payload
        Then the response code should be 200
        And I should receive a element with the following attributes
            | name       | {{ user1.name }}     |
            | email      | "test3@test3.fr"     |
            | password   | {{ user1.password }} |

    Scenario: Delete a user anonymously
        Given I load fixtures "user.json"
        When I request "DELETE" "/users/{{ user1.id }}"
        Then the response code should be 401

    Scenario: Delete a user with admin
        Given I load fixtures "user.json"
        And I am authenticated as "admin"
        When I request "DELETE" "/users/{{ user1.id }}"
        Then the response code should be 200

    Scenario: Delete a user with right access
        Given I load fixtures "user.json"
        And I am authenticated as "user"
        When I request "DELETE" "/users/{{ user1.id }}"
        Then the response code should be 200

    Scenario: Delete a user with wrong access
        Given I load fixtures "user.json"
        And I am authenticated as "user"
        When I request "DELETE" "/users/{{ user1.id }}"
        Then the response code should be 403