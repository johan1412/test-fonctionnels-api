Feature: Tag API

    Scenario: Get all tags anonymously
        Given I load fixtures "tag.json"
        When I request "GET" "/api/tags"
        Then the response code should be 401

    Scenario: Get all tags with user
        Given I load fixtures "tag.json"
        And I am authenticated as "user"
        When I request "GET" "/api/tags"
        Then the response code should be 200

    Scenario: Get all tags with admin
        Given I load fixtures "user.json"
        And I am authenticated as "admin"
        When I request "GET" "/api/tags"
        Then I should receive 2 tags
        And the response code should be 200

    Scenario: Get a tag with admin
        Given I load fixtures "user.json"
        And I am authenticated as "admin"
        When I request "GET" "/api/tags/{{ haut.id }}"
        Then the response code should be 200
        And I should receive an element with the following attributes
            | id       | {{ haut.id }}    |
            | label    | {{ haut.label }} |

    Scenario: Get a tag with user
        Given I load fixtures "user.json"
        And I am authenticated as "user"
        When I request "GET" "/api/tags/{{ haut.id }}"
        Then the response code should be 200
        And I should receive an element with the following attributes
            | id       | {{ haut.id }}    |
            | label    | {{ haut.label }} |

    Scenario: Get a tag anonymously
        Given I load fixtures "user.json"
        When I request "GET" "/api/tags/{{ haut.id }}"
        Then the response code should be 401

    Scenario: Get a tag with bad id
        Given I load fixtures "user.json"
        And I am authenticated as "admin"
        When I request "GET" "/api/tags/-1"
        Then the response code should be 404

    Scenario: Create a tag anonymously
        Given I load fixtures "user.json"
        Given I have a payload
            | label       | "milieu" |
        When I request "POST" "/api/tags" with payload
        Then I should have a property "label"
        And the response code should be 201
        And I should receive an element with the following attributes
            | label    | "milieu" |

    Scenario: Create a tag with admin
        Given I load fixtures "user.json"
        And I am authenticated as "admin"
        And I have a payload
            | label    | "haut2" |
        When I request "POST" "/api/tags" with payload
        Then I should have a property "id"
        And I should have a property "label"
        And the response code should be 201
        And I should receive an element with the following attributes
            | label    | "haut2" |

    Scenario: Create a tag with user
        Given I load fixtures "user.json"
        And I am authenticated as "user"
        And I have a payload
            | label    | "bas2" |
        When I request "POST" "/api/tags" with payload
        Then I should have a property "id"
        And I should have a property "label"
        And the response code should be 201
        And I should receive an element with the following attributes
            | label    | "bas2" |


    Scenario: Completely edit a tag anonymously
        Given I load fixtures "user.json"
        And I have a payload
            | label    | "bas3" |
        When I request "PUT" "/api/tags/{{ bas.id }}" with payload
        Then the response code should be 401