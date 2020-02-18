#language: en

@Bucket
Feature: Using Bucket
  Scenario: Write file
    Given Nikita creates bucket for some reason with 'main' name and '../files/' storage directory
    When he writes file './mocks/test.txt' in bucket with key 'test-copy.txt'
    Then file 'test-copy.txt.index' should exists in '../files/main/'
    And bucket should has 'test-copy.txt'
    And content of key 'test-copy.txt' in bucket 'main' will be equal to content of 'mocks/test.txt'

  Scenario: Read file
    Given Nikita creates bucket for some reason with 'main' name and '../files/' storage directory
    And he writes file './mocks/test.txt' in bucket with key 'test-copy.txt'
    When he reads file 'test-copy.txt' from bucket
    Then content of the returned readable stream will be equal to content of './mocks/test.txt'

  Scenario: Remove file
    Given Nikita creates bucket for some reason with 'main' name and '../files/' storage directory
    When he writes file './mocks/test.txt' in bucket with key 'test-copy.txt'
    Then file 'test-copy.txt.index' should exists in '../files/main/'
    And he removes file with key 'test-copy.txt'
    Then file 'test-copy.txt.index' shouldn't exists in '../files/main/'
    And bucket shouldn't has 'test-copy.txt'
