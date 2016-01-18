/**
 * Created by Giles on 17/01/2016.
 */

import RX = require( 'rx' );

export interface IHasEmail {
    email: string;
}

export interface IContact extends IHasEmail{
    source: any;
}

export interface IHasMailServer extends IHasEmail {
    mailServers: Array<string>
}


export interface IMxLookupError {
    error: string,
    hasEmail: IHasEmail
}

export interface IMailServerService {
    lookupMailServers( contact: IHasEmail ): RX.Observable<IHasMailServer>;
}

export interface IMailExchange {
    priority: number;
    exchange: string;
}