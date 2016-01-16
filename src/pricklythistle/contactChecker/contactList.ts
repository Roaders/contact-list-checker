
import fs = require( "fs" );
import csv = require('csv');

export interface IContact {
    email: string;
    source: any;
}

export class ContactList {

    //  Constructor
    
    constructor(
        contactListFile: string,
        emailColumnName: string,
        callback?: ( err? ) => void
    ) {
        this._emailColumn = emailColumnName;
        this._callback = callback;

        this.loadContactList(contactListFile);
    }

    //  Private variables

    private _emailColumn: string;
    private _contacts: Array<IContact>;
    private _callback: (err?) => void;

    //  Properties

    get contacts() : Array<IContact> {
        return this._contacts ? this._contacts.slice() : null;
    }

    //  Private Functions
    
    private loadContactList( filename: string ) : void {

        console.log( `Loading contact list: ${filename}` );

        fs.readFile( filename, "utf8", (err, result) => this.handleContactListLoaded( err, result ) );
    }

    private handleContactListLoaded( loadError, result: string ): void {

        if ( loadError ) {
            console.log( `Error loading contact list: ${loadError}` );

            if(this._callback) {
                this._callback( loadError );
            }
            return;
        }

        console.log( "Contacts Loaded" );

        csv.parse( result, { relax: false, columns: true, quote:'"' }, ( parseError, contacts ) => this.handleParseResults( parseError, contacts ) );
    }

    private handleParseResults( parseError, contacts: Array<any> ): void {
        if ( parseError ) {
            console.log( `Error parsing contacts: ${parseError}` );
            if(this._callback) {
                this._callback( parseError );
            }
            return;
        }

        console.log( `contacts parsed: ${contacts.length}` );

        this._contacts = [];

        contacts.forEach( (contact) => {
            const email: string = contact[this._emailColumn];

            this._contacts.push( { email: email, source: contact } );
        } );

        if(this._callback) {
            this._callback();
        }

    }
}