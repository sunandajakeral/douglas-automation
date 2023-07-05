# douglas-automation
Douglas - QA recruitment test

# Version 1.0

# Added
- Added tests:
    - successful login
    - login with empty credentials
    - login with invalid credentials
    - login with valid email id and empty password
    - reset password
    - login with email having invalid format
    - stay loggedIn after successful login
    - error message disappears when valid email is entered
    - login with valid email id and a password having less than 6 characters
    - hide/show password

# Installation
- Clone the repository: `git clone <ssh>`
- Install the dependencies: `npm install`

# Usage
- Run the tests using the command `npm run e2e:test`
- See the reports using the command `npm run e2e:show:report`