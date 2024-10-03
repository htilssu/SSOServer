import {hashPassword, verifyPassword} from "@/services/password.service.ts";

let user: { email: string, password: string };

beforeAll(async () => {
    user = {
        email: "tolashuu@gmail.com",
        password: await hashPassword("shuu2004")
    };
});

describe('sign-in test', () => {
    it('should be success', async () => {
        const sample = {
            email: "tolashuu@gmail.com",
            password: "shuu2004"
        };

        expect(await verifyPassword(sample.password, user.password)).toBe(true);
    });

    it('should be error login with incorrect password', async () => {
        const sample = {
            email: "tolashuu@gmail.com",
            password: "shuu2005"
        };

        expect(await verifyPassword(sample.password, user.password)).toBe(false);
    });

});

describe('verify token', () => {


});