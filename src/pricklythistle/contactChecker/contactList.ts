
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
            if(err) {
                console.log(`Error loading contact list: ${err}`);
                return;
            }
            
            console.log( "Contacts Loaded" );
            
            csv.parse( data, [], ( result ) => {
                console.log( `contacts parsed: ${result}` );
            } );
        })
        
    }
    
}

export = ContactList;