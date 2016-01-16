
import fs = require( "fs" );
import csv = require('csv');

class ContactList {
    
    //  Constructor
    
    constructor( contactListFile: string ) {
        this.loadContactList(contactListFile);
    }
    
    //  Private Functions
    
    private loadContactList( filename: string ) : void {
        
        console.log( `Loading contact list: ${filename}` );
        
        fs.readFile(filename, "utf8", ( err, data) => {
            console.log( "Contacts Loaded" );
        })
        
    }
    
}

export = ContactList;