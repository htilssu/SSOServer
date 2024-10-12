import * as jose from 'jose';
import {SignJWT} from 'jose';
import ms from 'ms';

export const expiredTimeInMill = ms(process.env.TOKEN_LIFETIME ?? "7d")
export const expiredTimeInSecs = expiredTimeInMill / 1000;


const privateKey = process.env.RSA_PRIVATE_KEY!;
const publicKey = process.env.RSA_PUBLIC_KEY!;
let encodedPrivateKey: jose.KeyLike;
let encodedPublicKey: jose.KeyLike;
let jwk: jose.JWK;

async function load() {
    encodedPrivateKey = await jose.importPKCS8(privateKey, 'RS256', {
        extractable: true,
    });
    encodedPublicKey = await jose.importSPKI(publicKey, 'RS256', {
        extractable: true,
    })
    jwk = await jose.exportJWK(encodedPublicKey)
}

load().then();

export type TokenPayload = {
    [key: string]: string;
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
         typ: 'JWT',
     }).sign(encodedPrivateKey);
}


export const jwtVerify = async (token: string) => {
    try {
        return (await jose.jwtVerify(new Uint8Array(Buffer.from(token, 'utf8')), encodedPublicKey)).payload

    } catch (e) {
        if (e instanceof jose.errors.JWTExpired) {
        }
        return null;
    }
}

export {encodedPublicKey, jwk, encodedPrivateKey}