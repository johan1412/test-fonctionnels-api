Feature: Tag API

    Scenario: Get all tags
        When I request "GET" "/tags"
        Then I should receive an empty array
        And the response code should be 200
        And I should receive an array with 0 elements