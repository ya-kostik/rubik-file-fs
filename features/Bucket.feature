#language: en

@Bucket
Feature: Using Bucket
  Scenario: Write file
    Given Nikita creates bucket for some reason with 'main' name and '../files/' storage directory
    When he writes file './mocks/test.txt' in bucket with key 'test-copy.txt'
    Then file 'test-copy.txt.index' should exists in '../files/main/'
    And bucket should has 'test-copy.txt'
    And content of key 'test-copy.txt' in bucket 'main' will be equal to content of 'mocks/test.txt'
