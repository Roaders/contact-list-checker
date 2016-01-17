
import contracts = require( '../contract/contracts.d.ts' );
import contact = require('./contactList');

export class ContactChecker {

    //  Constructor

    constructor( private _mailServerService: contracts.IMailServerService ) {

    }

    //  Public Functions

    checkContacts( contacts: Array<contracts.IContact> ): void {
        console.log( `Checking ${contacts.length} contacts` );

        this._mailServerService.lookupMailServers( contacts[0] ).subscribe(
            (contact) => this.handleContactWithMailServer( contact ),
            (error) => this.handleMailServerError( error ),
            () => this.handleMailServerLookupComplete()
        );
    }

    //  Private Functions

    private handleContactWithMailServer( contact: contracts.IHasMailServer ): void {
        console.log( `Contact mail server lookup complete: ${contact.email} ${contact.mailServers}` );
    }

    private handleMailServerError( error: any ): void {
        console.log( "Error looking up contact mail server" );
    }

    private handleMailServerLookupComplete(): void {
        console.log( "Mail server lookup complete" );
    }
}