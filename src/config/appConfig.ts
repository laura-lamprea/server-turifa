import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../app.env') });

export interface AppConf {
    clientId: string | null;
    clientSecret: string | null;
    apiKey: string | null;
    authUri: string | null;
    authGrantType: string | null;
    apiBasePath: string | null;
}

const appConf: AppConf = {
    clientId: process.env.NEQUI_CLIENT_ID || null,
    clientSecret: process.env.NEQUI_CLIENT_SECRET || null,
    apiKey: process.env.NEQUI_API_KEY || null,
    authUri: process.env.NEQUI_AUTH_URI || null,
    authGrantType: process.env.NEQUI_AUTH_GRANT_TYPE || null,
    apiBasePath: process.env.NEQUI_API_BASE_PATH || null,
};

export default appConf;
