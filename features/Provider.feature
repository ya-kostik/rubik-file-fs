#language: en

@Provider
Feature: Using FS Provider
  Scenario: Writing file
    Given Nikita creates File kubik and application
    And creates Config kubik with 'mocks/test-config/' path
    And adds 'FS' Provider to File's instance
    And starts application
    And creates readable stream from 'mocks/test.txt'
    When he writes file with key 'test.txt' and bucket 'main'
    Then file kubik has key 'test.txt' in bucket 'main'
    And content of key 'test.txt' in bucket 'main' will be equal to content of 'mocks/test.txt'

  Scenario: Reading file
    Given Nikita creates File kubik and application
    And creates Config kubik with 'mocks/test-config/' path
    And adds 'FS' Provider to File's instance
    And starts application
    And creates readable stream from 'mocks/test.txt'
    And he writes file with key 'test.txt' and bucket 'main'
    When he reads file with key 'test.txt' and bucket 'main'
    Then content of the returned readable stream will be equal to content of './mocks/test.txt'

  Scenario: Removing file
    Given Nikita creates File kubik and application
    And creates Config kubik with 'mocks/test-config/' path
    And adds 'FS' Provider to File's instance
    And starts application
    And creates readable stream from 'mocks/test.txt'
    And he writes file with key 'test.txt' and bucket 'main'
    When he removes file with key 'test.txt' and bucket 'main'
    Then file kubik hasn't key 'test.txt' in bucket 'main'
