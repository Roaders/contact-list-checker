declare module "csv" {
    export function parse( data: string, options: ICsvOptions, callback: ( err, data: Array<any> ) => void );
    
    export interface ICsvOptions {
        
        //Set the field delimiter. One character only, defaults to comma.   
        delimiter?: string;
        //String used to delimit record rows or a special value; special constants are 'auto', 'unix', 'mac', 'windows', 'unicode'; defaults to 'auto' (discovered in source or 'unix' if no source is specified).
        rowDelimiter?: string;
        //Optionnal character surrounding a field, one character only, defaults to double quotes.
        quote?: string;
        //Set the escape character, one character only, defaults to double quotes.
        escape?: string;
        //List of fields as an array, a user defined callback accepting the first line and returning the column names or true if autodiscovered in the first CSV line, default to null, affect the result data set in the sense that records will be objects instead of arrays.
        columns?: Array<string> | boolean | ( ( firstLine: string ) => Array<string> );
        //Treat all the characters after this one as a comment, default to '#'.
        comment?: string;
        //Name of header-record title to name objects by.
        objname?: string;
        //Preserve quotes inside unquoted field.
        relax?: boolean;
        //Dont generate empty values for empty lines.
        skip_empty_lines?: boolean;
        //If true, ignore whitespace immediately around the delimiter, defaults to false. Does not remove whitespace in a quoted field.
        trim?: boolean;
        //If true, ignore whitespace immediately following the delimiter (i.e. left-trim all fields), defaults to false. Does not remove whitespace in a quoted field.
        ltrim?: boolean;
        //If true, ignore whitespace immediately preceding the delimiter (i.e. right-trim all fields), defaults to false. Does not remove whitespace in a quoted field.
        rtrim?: boolean;
        //If true, the parser will attempt to convert read data types to native types.
        auto_parse?: boolean;
        //If true, the parser will attempt to convert read data types to dates. It requires the "auto_parse" option.
        auto_parse_date?: boolean;
    }
}