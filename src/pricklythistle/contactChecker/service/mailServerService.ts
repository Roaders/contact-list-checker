/**
 * Created by Giles on 17/01/2016.
 */

import contracts = require( '../contract/contracts.d.ts' );
import Rx = require( 'rx' );
import dns = require( 'dns' );

export class MailServerService implements contracts.IMailServerService{

    //  Public Functions

    lookupMailServers( email: contracts.IHasEmail): Rx.Observable<contracts.IHasMailServer> {
        console.log( `MailServerService looking up mail servers for ${email.email} email addresses` );

        const domain: string = email.email.substr( email.email.indexOf( "@" ) + 1 );

        console.log( `Domain for ${email.email}: ${domain}` );

        const getMxServerForDomain = Rx.Observable.fromNodeCallback<string,Array<contracts.IMailExchange>,contracts.IHasMailServer>(
            dns.resolveMx,
            this,
            (results) => this.updateHasEmail( email, results )
        );
        return getMxServerForDomain(domain);
    }

    private updateHasEmail( email: contracts.IHasEmail, mailServerResults: any[] ) : contracts.IHasMailServer {
        const hasMailServer: contracts.IHasMailServer = <contracts.IHasMailServer>email;

        hasMailServer.mailServers = mailServerResults.map( (mailExchange) => {return mailExchange.exchange} );

        return hasMailServer;
    }
}