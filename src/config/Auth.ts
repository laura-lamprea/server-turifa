import AppConf from './appConfig';
import moment from 'moment';

const axios = require('axios');
const { clientId, clientSecret, authGrantType, authUri } = AppConf;

let token: string | null = null;
let tokenType: string | null = null;
let expiresAt: moment.Moment | null = null; 


async function auth() {
    try {
        const authorization = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`;        
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': authorization
        };

        const endpoint = `${authUri}?grant_type=${authGrantType}`;

        const response = await axios.post(endpoint, null, { headers });

        if (response.status === 200 && response.data) {
            token = response.data.access_token;
            tokenType = response.data.token_type;
            expiresAt = moment(new Date()).add(response.data.expires_in, 'seconds'); 
        } else {
            throw new Error('Unable to connect to Nequi. Please check credentials and network connectivity.'); 
        }
    } catch (error) {
        console.error('Authentication error:', error); 
        throw new Error('Authentication failed. Please try again later.'); 
    }
}

async function getToken(full = true): Promise<string | null> {
    if (!isValidToken()) {
        await auth();
    }

    return full ? `${tokenType} ${token}` : token;
}

function isValidToken(): boolean {
    if (!expiresAt) {
        return false;
    }

    return moment().isBefore(expiresAt);
}

export { auth, getToken, isValidToken };
