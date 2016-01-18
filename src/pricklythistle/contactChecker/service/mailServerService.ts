/**
 * Created by Giles on 17/01/2016.
 */

import contracts = require( '../contract/contracts.d.ts' );
import Rx = require( 'rx' );
import dns = require( 'dns' );
import {IHasEmail} from "../contract/contracts";

export class MailServerService implements contracts.IMailServerService{

    //  Public Functions

    lookupMailServers( email: contracts.IHasEmail): Rx.Observable<contracts.IHasMailServer> {
        //console.log( `MailServerService looking up mail servers for ${email.email} email addresses` );

        const domain: string = email.email.substr( email.email.indexOf( "@" ) + 1 );

        //console.log( `Domain for ${email.email}: ${domain}` );

        return Rx.Observable.fromNodeCallback<string,Array<contracts.IMailExchange>,contracts.IHasMailServer>(
            this.makeMxRequest,
            this,
            (results) => this.updateHasEmail( email, results )
        )(domain)
            .catch( (error) => {
                //console.log( `Error getting mail server for domain ${domain} on email ${email.email}: ${error}` )
                return Rx.Observable.throw<contracts.IHasMailServer>( <contracts.IMxLookupError>{ error: error, hasEmail: email } );
            } )
            .do(
            (hasMailServer) =>{
                //console.log( `mail servers: ${hasMailServer.mailServers}` )
            });
    }

    private makeMxRequest( domain: string, callback: (err, addresses: string[]) => void ) : void {
        //console.log(`resolveMx for domain ${domain}`);
        dns.resolveMx(domain, callback);
    }

    private updateHasEmail( email: contracts.IHasEmail, mailServerResults: contracts.IMailExchange[] ) : contracts.IHasMailServer {
        const hasMailServer: contracts.IHasMailServer = <contracts.IHasMailServer>email;

        hasMailServer.mailServers = mailServerResults.map( (mailExchange) => {return mailExchange.exchange} );

        return hasMailServer;
    }
}