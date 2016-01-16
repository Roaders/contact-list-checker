
import contact = require('./contactList');

export class ContactChecker {

    checkContacts( contacts: Array<contact.IContact> ): void {
        console.log( `Checking ${contacts.length} contacts` );
    }
}