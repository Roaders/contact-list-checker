
import ContactChecker = require('./src/pricklythistle/contactChecker/contactChecker');
import ContactList = require('./src/pricklythistle/contactChecker/contactList');
import AppArguments = require('./src/pricklythistle/contactChecker/appArguments');

new ContactList( AppArguments.inputFilename );
new ContactChecker();