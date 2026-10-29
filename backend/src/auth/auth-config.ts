import * as msal from '@azure/msal-node';
import * as dotenv from 'dotenv';
dotenv.config();
/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */

const msalConfigSettings: msal.Configuration = {
    auth: {
         clientId: process.env.CLIENT_ID ??"" , // This is the ONLY mandatory field that you need to supply.
         // WORKFORCE TENANT
         authority: process.env.CLOUD_INSTANCE+"" + process.env.TENANT_ID, //  Replace the placeholder with your tenant info
         // EXTERNAL TENANT
        clientSecret: process.env.CLIENT_SECRET ?? "", // This is the ONLY mandatory field that you need to supply.
        },
    system: {
        loggerOptions: {
            loggerCallback: (level:msal.LogLevel, message:string, containsPii:boolean) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case msal.LogLevel.Error:
                        console.error(message);
                        return;
                    case msal.LogLevel.Info:
                        console.info(message);
                        return;
                    case msal.LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case msal.LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            },
        },
    },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://learn.microsoft.com/en-us/entra/identity-platform/permissions-consent-overview#openid-connect-scopes
 */
const loginRequest = {
    scopes: ["User.Read"],
};

/**
 * An optional silentRequest object can be used to achieve silent SSO
 * between applications by providing a "login_hint" property.
 */

// const silentRequest = {
//   scopes: ["openid", "profile"],
//   loginHint: "example@domain.net"
// };

export  {msalConfigSettings,loginRequest};