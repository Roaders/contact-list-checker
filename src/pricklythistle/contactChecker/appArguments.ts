
class AppArguments {
    
    static get inputFilename() : string {
        if(process.argv.length < 3){
            throw new Error( "no input file defined in arguments" );
        }
        
        return process.argv[2];
    }
}

export = AppArguments;