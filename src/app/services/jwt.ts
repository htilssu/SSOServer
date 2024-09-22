import * as jose from 'jose';
import {SignJWT} from 'jose';
import humanInterval from "human-interval";

const privateKey = process.env.RSA_PRIVATE_KEY!;
const publicKey = process.env.RSA_PUBLIC_KEY!;
const encodedPrivateKey = await jose.importPKCS8(privateKey, 'RS256')
const encodedPublicKey = await jose.importSPKI(publicKey, 'RS256')
export const jwk = await jose.exportJWK(encodedPublicKey)

export const tokenLifetime = humanInterval(process.env.TOKEN_LIFETIME!);

export type TokenPayload = {
    id: string
    role: string
}

export const jwtSign = async (payload: TokenPayload) => {
    return await new SignJWT({
            iss: 'https://sso.htilssu.id.vn',
            sub: payload.id,
            ...payload
        }
    ).setExpirationTime(process.env.TOKEN_LIFETIME!)
     .setProtectedHeader({
         alg: 'RS256',
         typ: 'JWT'
     }).sign(encodedPrivateKey);
}


export const jwtVerify = async (token: string) => {
    return jose.jwtVerify(new Uint8Array(Buffer.from(token, 'utf8')), encodedPublicKey)
}