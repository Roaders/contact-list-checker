
import contracts = require( '../contract/contracts.d.ts' );
import contact = require('./contactList');
import Rx = require( 'rx' );

export class ContactChecker {

    //  Constructor

    constructor( private _mailServerService: contracts.IMailServerService ) {

    }

    //  Private Variables

    private _allContacts: contracts.IContact[];

    private _pendingMxLookup: contracts.IHasEmail[] = [];
    private _mxLookupError: contracts.IHasEmail[] = [];
    private _mxLookupComplete: contracts.IHasEmail[] = [];

    private _pendingEmailVerification: contracts.IHasEmail[] = [];
    private _emailValidationError: contracts.IHasEmail[] = [];

    private _emailValidated: contracts.IHasEmail[] = [];

    //  Public Functions

    checkContacts( contacts: contracts.IContact[] ): void {
        this._allContacts = contacts;
        this._pendingMxLookup = contacts.slice();

        console.log( `ContactChecker Checking ${contacts.length} contacts` );

        console.time( "resolving mail records" );

        Rx.Observable.from(contacts).flatMap<contracts.IHasMailServer>( (contact) => {
            return this._mailServerService.lookupMailServers( contact )
                .retry(3)
                .catch((error ) => this.catchMxError(error)).do( (result) => this.handleContactWithMailServer(result) );
        } ).subscribe(
            (validatedContact) => {},
            (error) => this.handleMailServerError( error ),
            () => this.handleMailServerLookupComplete()
        );

    }

    //  Private Functions

    private catchMxError(error: contracts.IMxLookupError): Rx.Observable<contracts.IHasMailServer> {
        //console.log(`Error loading mx servers for email ${error.hasEmail.email}: ${error.error}`);
        this.removeFromArray( error.hasEmail, this._pendingMxLookup )
        this._mxLookupError.push(<contracts.IContact>error.hasEmail);
        this.updateProgress();
        return Rx.Observable.empty<contracts.IHasMailServer>();
    }

    private handleContactWithMailServer( contact: contracts.IHasMailServer ): void {
        //console.log( `Contact mail server lookup complete: ${contact.email} -> ${contact.mailServers}` );
        this.removeFromArray( contact, this._pendingMxLookup );
        this._mxLookupComplete.push(contact);
        this._pendingEmailVerification.push(contact);
        this.updateProgress();
    }

    private handleMailServerError( error: any ): void {
        console.timeEnd( "resolving mail records" );
    }

    private handleMailServerLookupComplete(): void {
        console.log( "Mail server lookup complete" );
        console.timeEnd( "resolving mail records" );
    }

    private removeFromArray( item: any, array: Array<any> ): void {
        const index: number = array.indexOf( item );
        if(index >= 0) {
            array.splice(index,1);
        }
    }

    private updateProgress(): void {
        var message: string =`Domain lookup for ${this._mxLookupComplete.length} contacts out of ${this._allContacts.length} complete`;
        if( this._mxLookupError.length > 0 ) {
            message += ` (${this._mxLookupError.length} errors)`
        }
        process.stdout.write(message + "\033[0G");
    }
}