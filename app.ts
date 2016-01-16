
import check = require('./src/pricklythistle/contactChecker/contactChecker');
import contact = require('./src/pricklythistle/contactChecker/contactList');
import AppArguments = require('./src/pricklythistle/contactChecker/appArguments');

const contactList: contact.ContactList = new contact.ContactList( AppArguments.inputFilename, AppArguments.emailColumnName, (error) => handleContactsLoaded(error) );
const checker: check.ContactChecker = new check.ContactChecker();

function handleContactsLoaded( error? ): void {
    if(error){
        console.log( `Error loading contacts: ${error}` );
        return;
    }
    console.log( `${contactList.contacts.length} contacts loaded` );

    checker.checkContacts( contactList.contacts );
}