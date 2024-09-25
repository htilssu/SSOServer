import {JsonValue} from "@prisma/client/runtime/library";

export type TokenClaim = {
    id: string,
    role: string
}

export type ClaimProps = {
                             User: {
                                 id: string;
                                 firstName: string;
                                 lastName: string;
                                 username: string | null;
                                 phoneNumber: string;
                                 metadata: JsonValue | null;
                             };
                             Partner: { id: string; name: string; };
                         } & {
                             id: string;
                             email: string;
                             password: string;
                             userId: string;
                             partnerId: string;
                         }

export async function getClaim(account: ClaimProps): Promise<TokenClaim> {
    if (account.userId) {
        const user = account.User
        return Promise.resolve({
            id: user.id,
            role: "user"
        });
    }


    if (account.partnerId) {
        const partner = account.Partner;
        return Promise.resolve({
            id: partner.id,
            role: "partner"
        });
    }
    return Promise.reject("Account is not user or partner");
}