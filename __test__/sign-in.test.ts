import {hashPassword, verifyPassword} from "@/app/services/encoder";
import {jwtSign} from "@/app/services/jwt";
import {ClaimProps, getClaim} from "@/app/services/token-claim";

let user: { email: string, password: string };

beforeAll(async () => {
    user = {
        email: "tolashuu@gmail.com",
        password: await hashPassword("shuu2004")
    }
})


describe('sign-in test', () => {
    it('should be success', async () => {
        const sample = {
            email: "tolashuu@gmail.com",
            password: "shuu2004"
        }

        expect(await verifyPassword(sample.password, user.password)).toBe(true)
    });

    it('should be error login', async () => {
        const sample = {
            email: "tolashuu@gmail.com",
            password: "shuu2005"
        }

        expect(await verifyPassword(sample.password, user.password)).toBe(false)
    });
});
describe('verify token', () => {

    it('should be success', async () => {
       /* const userAccount: ClaimProps = {
            User: {
                id: "1",
                firstName: "",
                lastName: "",
                username: null,
                phoneNumber: "",
                metadata: null
            },
        }
        const payload = await getClaim(userAccount)
        const token = await jwtSign(payload)*/
    })
});