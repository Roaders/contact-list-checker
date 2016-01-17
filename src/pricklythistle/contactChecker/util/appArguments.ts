
class AppArguments {
    
    static get inputFilename() : string {
        if(process.argv.length < 4){
            throw new Error( "no input file defined in arguments" );
        }
        
        return process.argv[3];
    }

    static get emailColumnName(): string {
        if(process.argv.length < 3){
            throw new Error( "no email column name specified in arguments" );
        }

        return process.argv[2];

    }
}

export = AppArguments;