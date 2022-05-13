Feature: User API

    Scenario: Get all users
        When I request "GET" "/users"
        Then the response code should be 403