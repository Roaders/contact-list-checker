# Contact List Checker
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

### In Browser

```bash
node app.js -launchServer
```

This should launch a webpage but if not access the app at [http://localhost/index.html](http://localhost/index.html)
