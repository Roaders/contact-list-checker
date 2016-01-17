
import check = require('./src/pricklythistle/contactChecker/model/contactChecker');
import contact = require('./src/pricklythistle/contactChecker/model/contactList');
import AppArguments = require('./src/pricklythistle/contactChecker/util/appArguments');
import contracts = require( './src/pricklythistle/contactChecker/contract/contracts' );
import mailService = require( './src/pricklythistle/contactChecker/service/mailServerService' );

const mailServerService: contracts.IMailServerService = new mailService.MailServerService();
const contactList: contact.ContactList = new contact.ContactList( AppArguments.inputFilename, AppArguments.emailColumnName, (error) => handleContactsLoaded(error) );
const checker: check.ContactChecker = new check.ContactChecker( mailServerService );

function handleContactsLoaded( error? ): void {
    if(error){
        console.log( `Error loading contacts: ${error}` );
        return;
    }
    console.log( `${contactList.contacts.length} contacts loaded` );

    checker.checkContacts( contactList.contacts );
}