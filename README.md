# Contact List Checker

[![Greenkeeper badge](https://badges.greenkeeper.io/Roaders/contact-list-checker.svg)](https://greenkeeper.io/)
A Node.js / Typescript app for checking all the email addresses in a contact list

## Compilation

Install typescript (globally)

    npm install -g typescript

Install tsd (globally)

    npm install -g tsd

install required dependencies:

    npm install

install Typescript declaraions:

    tsd install

compile the app:

    tsc

## Running

### In Node.js

```bash
node app.js "emailColumnNameInCsvFile" -inputFile.csv -outputFile.csv
```
