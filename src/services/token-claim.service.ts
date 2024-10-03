import {User} from "@prisma/client";
import {JsonValue} from "@prisma/client/runtime/library";

export type TokenClaimService = {
    id: string,
    role: string,
    email: string
}


export async function getClaim(claim: {
                                          Partner: {
                                                       id: string;
                                                       createdAt: Date;
                                                       updatedAt: Date;
                                                       name: string;
                                                       phoneNumber: string;
                                                       metadata: JsonValue | null;
                                                   } | null;
                                          User: {
                                                    id: string;
                                                    createdAt: Date;
                                                    updatedAt: Date;
                                                    firstName: string;
                                                    lastName: string;
                                                    dob: Date;
                                                    username: string | null;
                                                    phoneNumber: string;
                                                    metadata: JsonValue | null;
                                                } | null;
                                      } & {
                                          userId: string | null;
                                          email: string;
                                          partnerId: string | null;
                                          id: string;
                                          password: string;
                                          accountType: string;
                                          createdAt: Date;
                                          updatedAt: Date;

                                      }): Promise<TokenClaimService> {
    if (claim.userId) {
        const user = claim.User as User;
        return {
            role: "user",
            ...user,
            email: claim.email
        }
    }


    if (claim.partnerId) {
        const partner = claim.Partner;
        return {
            id: "",
            role: "partner",
            ...partner,
            email: claim.email
        };
    }
    return Promise.reject("Account is not user or partner");
}