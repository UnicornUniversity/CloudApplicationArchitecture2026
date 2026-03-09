*** Settings ***
Library    Collections
Library    RequestsLibrary
Library    String

*** Variables ***
${BASE_URL}    http://localhost:3001
${USERNAME}    testuser

*** Test Cases ***

Test Get Student By ID 22
    [Documentation]    Test retrieving student with ID 22 (Oscar Baker)
    [Tags]    students    get

    Create Session    api_session    ${BASE_URL}

    ${params}=    Create Dictionary    userName=${USERNAME}
    ${response}=    GET On Session    api_session    /students/get/22    params=${params}

    Should Be Equal As Integers    ${response.status_code}    200

    ${json_body}=    Set Variable    ${response.json()}

    Should Be Equal As Integers    ${json_body['id']}    22
    Should Be Equal    ${json_body['name']}    Oscar Baker
    Should Be Equal    ${json_body['dob']}    2006-06-14
    Should Be Equal As Integers    ${json_body['class']}    1


Test Get Performance Report
    [Documentation]    Test retrieving the performance report for all students
    [Tags]    reports    performance

    Create Session    api_session    ${BASE_URL}

    ${params}=    Create Dictionary    userName=${USERNAME}
    ${response}=    GET On Session    api_session    /reports/performance    params=${params}

    Should Be Equal As Integers    ${response.status_code}    200

    ${json_body}=    Set Variable    ${response.json()}

    # Check that response is a list
    Should Be True    isinstance(${json_body}, list)

    # Performance report should contain students with stats
    ${length}=    Get Length    ${json_body}
    Should Be Greater Than    ${length}    0

    # Check structure of first report entry
    ${first_entry}=    Get From List    ${json_body}    0
    Should Have Key    ${first_entry}    idStudent
    Should Have Key    ${first_entry}    nameStudent
    Should Have Key    ${first_entry}    dob
    Should Have Key    ${first_entry}    idClass
    Should Have Key    ${first_entry}    nameClass
    Should Have Key    ${first_entry}    subjectStats

    # Check subjectStats structure
    ${subjectStats}=    Get From Dictionary    ${first_entry}    subjectStats
    Should Be True    isinstance(${subjectStats}, list)
    ${stats_length}=    Get Length    ${subjectStats}
    Should Be Greater Than    ${stats_length}    0

    ${first_subject}=    Get From List    ${subjectStats}    0
    Should Have Key    ${first_subject}    idSubject
    Should Have Key    ${first_subject}    nameSubject
    Should Have Key    ${first_subject}    value

Test Get Performance Report Contains Student 22
    [Documentation]    Test that performance report contains Ava Baker (student 22)
    [Tags]    reports    performance    integration

    Create Session    api_session    ${BASE_URL}

    ${params}=    Create Dictionary    userName=${USERNAME}
    ${response}=    GET On Session    api_session    /reports/performance    params=${params}

    Should Be Equal As Integers    ${response.status_code}    200

    ${json_body}=    Set Variable    ${response.json()}

    # Find student 22 in the report
    ${student_found}=    Set Variable    False
    FOR    ${entry}    IN    @{json_body}
        ${id}=    Get From Dictionary    ${entry}    idStudent
        ${name}=    Get From Dictionary    ${entry}    nameStudent
        Run Keyword If    ${id} == 22    Log    Found student ${name} with ID ${id}
        Run Keyword If    ${id} == 22    Set Test Variable    ${student_found}    True
    END

    Should Be True    ${student_found}    Student 22 not found in performance report
    

Test Add Grade Successfully
    [Documentation]    Test adding a new grade for a student
    [Tags]    grades    post    add

    Create Session    api_session    ${BASE_URL}

    # Prepare grade data
    ${grade_data}=    Create Dictionary
    ...    idStudent=22
    ...    idSubject=1
    ...    date=2024-03-05
    ...    mark=5

    # Add userName as query parameter
    ${params}=    Create Dictionary    userName=${USERNAME}
    ${response}=    POST On Session    api_session    /grades/add
    ...    json=${grade_data}
    ...    params=${params}

    Should Be Equal As Integers    ${response.status_code}    200

    ${json_body}=    Set Variable    ${response.json()}

    # Verify response contains the same data
    Should Be Equal As Integers    ${json_body['idStudent']}    22
    Should Be Equal As Integers    ${json_body['idSubject']}    1
    Should Be Equal    ${json_body['date']}    2024-03-05
    Should Be Equal As Integers    ${json_body['mark']}    5
    

Test Add Grade With Different Values
    [Documentation]    Test adding another grade with different values
    [Tags]    grades    post    add

    Create Session    api_session    ${BASE_URL}

    # Prepare grade data for student 1, subject 2
    ${grade_data}=    Create Dictionary
    ...    idStudent=1
    ...    idSubject=2
    ...    date=2024-03-06
    ...    mark=3

    ${params}=    Create Dictionary    userName=${USERNAME}
    ${response}=    POST On Session    api_session    /grades/add
    ...    json=${grade_data}
    ...    params=${params}

    Should Be Equal As Integers    ${response.status_code}    200

    ${json_body}=    Set Variable    ${response.json()}

    Should Be Equal As Integers    ${json_body['idStudent']}    1
    Should Be Equal As Integers    ${json_body['idSubject']}    2
    Should Be Equal    ${json_body['date']}    2024-03-06
    Should Be Equal As Integers    ${json_body['mark']}    3
    

Test Add Grade Minimum Mark
    [Documentation]    Test adding a grade with minimum mark value (1)
    [Tags]    grades    post    add

    Create Session    api_session    ${BASE_URL}

    ${grade_data}=    Create Dictionary
    ...    idStudent=5
    ...    idSubject=3
    ...    date=2024-03-07
    ...    mark=1

    ${params}=    Create Dictionary    userName=${USERNAME}
    ${response}=    POST On Session    api_session    /grades/add
    ...    json=${grade_data}
    ...    params=${params}

    Should Be Equal As Integers    ${response.status_code}    200

    ${json_body}=    Set Variable    ${response.json()}

    Should Be Equal As Integers    ${json_body['mark']}    1
    

Test Add Grade Maximum Mark
    [Documentation]    Test adding a grade with maximum mark value (5)
    [Tags]    grades    post    add

    Create Session    api_session    ${BASE_URL}

    ${grade_data}=    Create Dictionary
    ...    idStudent=10
    ...    idSubject=2
    ...    date=2024-03-08
    ...    mark=5

    ${params}=    Create Dictionary    userName=${USERNAME}
    ${response}=    POST On Session    api_session    /grades/add
    ...    json=${grade_data}
    ...    params=${params}

    Should Be Equal As Integers    ${response.status_code}    200

    ${json_body}=    Set Variable    ${response.json()}

    Should Be Equal As Integers    ${json_body['mark']}    5
    

Test Get Student 22 Has Valid Structure
    [Documentation]    Test that student 22 response has all expected fields
    [Tags]    students    get    structure

    Create Session    api_session    ${BASE_URL}

    ${params}=    Create Dictionary    userName=${USERNAME}
    ${response}=    GET On Session    api_session    /students/get/22    params=${params}

    Should Be Equal As Integers    ${response.status_code}    200

    ${json_body}=    Set Variable    ${response.json()}

    # Verify all expected keys are present
    Should Have Key    ${json_body}    id
    Should Have Key    ${json_body}    name
    Should Have Key    ${json_body}    dob
    Should Have Key    ${json_body}    class

    # Verify data types
    Should Be True    isinstance(${json_body['id']}, int)
    Should Be True    isinstance(${json_body['name']}, str)
    Should Be True    isinstance(${json_body['dob']}, str)
    Should Be True    isinstance(${json_body['class']}, int)
    

Test Performance Report Has Correct Data Structure
    [Documentation]    Test that performance report follows correct schema
    [Tags]    reports    performance    schema

    Create Session    api_session    ${BASE_URL}

    ${params}=    Create Dictionary    userName=${USERNAME}
    ${response}=    GET On Session    api_session    /reports/performance    params=${params}

    Should Be Equal As Integers    ${response.status_code}    200

    ${json_body}=    Set Variable    ${response.json()}

    # Verify each entry has required fields
    FOR    ${entry}    IN    @{json_body}
        Should Have Key    ${entry}    idStudent
        Should Have Key    ${entry}    nameStudent
        Should Have Key    ${entry}    dob
        Should Have Key    ${entry}    idClass
        Should Have Key    ${entry}    nameClass
        Should Have Key    ${entry}    subjectStats

        # Verify subjectStats is a list with proper structure
        ${stats}=    Get From Dictionary    ${entry}    subjectStats
        FOR    ${stat}    IN    @{stats}
            Should Have Key    ${stat}    idSubject
            Should Have Key    ${stat}    nameSubject
            Should Have Key    ${stat}    value
        END
    END


*** Keywords ***

Should Have Key
    [Arguments]    ${dictionary}    ${key}
    [Documentation]    Keyword to check if dictionary has a specific key

    Should Be True    '${key}' in ${dictionary}    Dictionary does not have key '${key}'

