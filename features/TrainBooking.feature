Feature: As a user
    I want to book train tickets

    Background: before setup
        Given I open Trainline search page

    @smoke @regression
    Scenario: Check one way tickets
        When I enter from origin "London" and autoselect "London Euston"
        And I enter to destination "Manchester" and autoselect "Manchester Piccadilly"
        And I click outbound datewidget
        And I select date "2020-04-15"
        And I click getTickets button
        Then I should see Your Search header contains "London Euston to Manchester Piccadilly"
        And I should see Outward Travel Date "Wed 15 Apr 2020"
        And I should see OutwardDepartureStation as "London Euston"
        And I should see OutwardArrivalStation as "Manchester Piccadilly"
        And The departure date time & ticket prices should exist

    @regression
    Scenario Outline: Check multiple outward locations for one way tickets
        When I enter from origin "London" and autoselect "<FromOrigin>"
        And I enter to destination "Manchester" and autoselect "<ToDestination>"
        And I click outbound datewidget
        And I select date "<TravelDate>"
        And I click getTickets button
        Then I should see Your Search header contains "<ExpectedSearchHeader>"
        And I should see Outward Travel Date "<ExpectedTravelDate>"
        And I should see OutwardDepartureStation as "<FromOrigin>"
        And I should see OutwardArrivalStation as "<ToDestination>"
        And The departure date time & ticket prices should exist

        Examples:
            | FromOrigin              | ToDestination          | TravelDate | ExpectedSearchHeader                           | ExpectedTravelDate |
            | London Liverpool Street | Manchester Airport     | 2020-04-20 | London Liverpool Street to Manchester Airport  | Mon 20 Apr 2020    |
            | London Cannon Street    | Manchester Oxford Road | 2020-04-21 | London Cannon Street to Manchester Oxford Road | Tue 21 Apr 2020    |


    @regression
    Scenario Outline: Check Invalid From station error message
        When I enter from origin "<FromOrigin>"
        And I enter to destination "Manchester" and autoselect "<ToDestination>"
        And I click getTickets button
        Then I should see From station errorMessage "<ErrorMessage>"

        Examples:
            | FromOrigin | ToDestination         | ErrorMessage                              |
            | 2323232    | Manchester Piccadilly | Please enter a valid origin station name or code |
            | *())))))   | Manchester Piccadilly | Please enter a valid origin station name or code |
            |            | Manchester Piccadilly | Please enter the station you will be travelling from |

    @regression
    Scenario Outline: Check Invalid To station error message
        When I enter from origin "London" and autoselect "<FromOrigin>"
        And I enter to destination "<ToDestination>"
        And I click getTickets button
        And I should see To station errorMessage "<ErrorMessage>"

        Examples:
            | FromOrigin    | ToDestination | ErrorMessage                                       |
            | London Euston | 2323232       | Please enter a valid destination station name or code|
            | London Euston | *())))))      | Please enter a valid destination station name or code          |
            | London Euston |               | Please enter the station you will be travelling to |


   