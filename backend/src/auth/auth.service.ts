import { Injectable } from '@nestjs/common';
import * as msal from '@azure/msal-node';
import { msalConfigSettings } from './auth-config.js'
import { Request, Response } from 'express';
import { JWTService } from '../utils/jwt.service.js';
@Injectable()
export class AuthService {

    private cryptoProvider: msal.CryptoProvider;
    private msalConfig: msal.Configuration
    private clientApplication: msal.ConfidentialClientApplication;
    constructor(
        private readonly jwtService: JWTService
    ) {
        this.cryptoProvider = new msal.CryptoProvider();
        this.msalConfig = msalConfigSettings;
        this.clientApplication = new msal.ConfidentialClientApplication({
            auth: { ...this.msalConfig.auth },
            system: this.msalConfig.system,
        });
    }


    async login() {
        const state = this.cryptoProvider.base64Encode(
            JSON.stringify({
                successRedirect: '/',
            })
        );
        const link = await this.clientApplication.getAuthCodeUrl({
            redirectUri: 'http://localhost:3000/redirect',
            scopes: ['user.read'],
            state: state,
        })

        return link;

    }

    async loginPKCE() {
        // 1. Initialize the Crypto Provider
        const cryptoProvider = new msal.CryptoProvider();

        // 2. Generate PKCE Codes
        const { challenge, verifier } = await cryptoProvider.generatePkceCodes();

        const statePayload = {
            successRedirect: '/',
            // CRITICAL: You must store the verifier somewhere (Session, Cookie, or encrypted State)
            // so you can retrieve it in the /redirect route to exchange the code for a token.
            pkceVerifier: verifier
        };

        const state = this.cryptoProvider.base64Encode(JSON.stringify(statePayload));


        const authCodeUrlParameters = {
            redirectUri: 'http://localhost:3000/redirect',
            scopes: ['user.read'],
            state: state,
            codeChallenge: challenge,          // Add this
            codeChallengeMethod: 'S256' ,        // Add this
        };

        const authCodeUrl = await this.clientApplication.getAuthCodeUrl(authCodeUrlParameters);

        return authCodeUrl;
    }

    async handleRedirect(req: Request, res: Response) {
    const { code, state } = req.query as { code: string, state: string };


    // Decode your state to get the verifier back
    const decodedState = JSON.parse(this.cryptoProvider.base64Decode(state));
    const originalVerifier = decodedState.pkceVerifier;

    try {
        const response = await this.clientApplication.acquireTokenByCode({
            code: code as string,
            redirectUri: 'http://localhost:3000/redirect',
            scopes: ['user.read'],
            codeVerifier: originalVerifier, // REQUIRED to complete the PKCE handshake
            authority: this.msalConfig.auth.authority
        });

        console.log('Access token:', response);

        const sessionToken = this.jwtService.generateSessionToken({
            sub: response?.account?.homeAccountId || '',
            access_token: response?.accessToken || ''
        });

        // Set the access token in an HTTP-only cookie for security
        res.cookie('accessToken', sessionToken, {
            httpOnly: true,   // Prevents client-side JavaScript access (mitigates XSS)
            secure: false,    // False for local HTTP development; true if using HTTPS
            sameSite: 'lax',  // Permits navigation from port 3000 to 5173 on localhost
            maxAge: 3600000   // 1 hour (aligns with typical token expiration)
        });

        return res.redirect('http://localhost:5173/dashboard');
        // Successfully logged in!
    } catch (error) {
        console.error(error);
        return res.status(500).send('Authentication failed');
    }
}

}
