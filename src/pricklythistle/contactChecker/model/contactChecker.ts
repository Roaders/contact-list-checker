
import contracts = require( '../contract/contracts.d.ts' );
import contact = require('./contactList');
import Rx = require( 'rx' );

export class ContactChecker {

    //  Constructor

    constructor( private _mailServerService: contracts.IMailServerService ) {

    }

    //  Public Functions

    checkContacts( contacts: Array<contracts.IContact> ): void {
        console.log( `ContactChecker Checking ${contacts.length} contacts` );

        console.time( "resolving mail records" );

        Rx.Observable.from(contacts).flatMap<contracts.IHasMailServer>( (contact) => {
            return this._mailServerService.lookupMailServers( contact )
        } ).subscribe(
            (contactWithMailServer) => this.handleContactWithMailServer( contactWithMailServer ),
            (error) => this.handleMailServerError( error ),
            () => this.handleMailServerLookupComplete()
        );

    }

    //  Private Functions

    private handleContactWithMailServer( contact: contracts.IHasMailServer ): void {
        console.log( `Contact mail server lookup complete: ${contact.email} -> ${contact.mailServers}` );
        
    }

    private handleMailServerError( error: any ): void {
        console.timeEnd( "resolving mail records" );
    }

    private handleMailServerLookupComplete(): void {
        console.log( "Mail server lookup complete" );
        console.timeEnd( "resolving mail records" );
    }
}