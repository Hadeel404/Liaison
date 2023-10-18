import '../config.ts';
import dataSource, {
    initDB
} from '../dist/database/dataSource.js';
import {
    login,
    register,
    updateUser
} from "../dist/controllers/user.controller.js";
import jwt from 'jsonwebtoken';
import { User }  from '../dist/database/entities/User.model.js';

beforeAll(async () => {
    await initDB();
});

afterAll(async () => {
    await dataSource.destroy();
});

const tmpData = {
    "email": "asee@gmail.com",
    "password": "123@2022"
};

describe("Login process", () => {
    let data;

    beforeAll(async () => {
        try {
            data = await login(tmpData.email, tmpData.password);

        } catch (e) {
        }
    })

    it("returns a token", async () => {
        expect(data.token).toBeTruthy();
    });

    it("has a valid token", () => {
        const tokenIsValid = jwt.verify(data.token, process.env.SECRET_KEY || '');
        expect(tokenIsValid).toBeTruthy();
    });

    it("has valid payload", () => {
        const payload = jwt.decode(data.token, {
            json: true
        });
        expect(payload?.email).toEqual(tmpData.email);
    });
});

describe("register process", () => {
    let data;

    beforeAll(async () => {
        try {
            data = await register({
                "firstName": "test",
                "lastName": "test",
                "email": `test${parseInt(Math.random()*1000)}@gmail.com`,
                "password": "123@2022"
            });
        } catch (e) {
        }
    })

    it("user created", async () => {
        expect(data).toBeTruthy();
    });

});
describe("update user", () => {
    let data;

    beforeAll(async () => {
        try {
            const dataUser = await login(tmpData.email, tmpData.password);
            const user = await User.findOneBy({ email: dataUser?.email || '' })

            data = await updateUser(
                user,
                {
                "firstName": "updated",
                "lastName": `user${parseInt(Math.random()*1000)}`,
            });
        } catch (e) {
        }
    })

    it("user updated", async () => {
        expect(data).toBeTruthy();
    });

});