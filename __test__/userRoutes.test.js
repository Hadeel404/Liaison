import '../config.ts';
import dataSource, {
    initDB
} from '../dist/database/dataSource.js';
import express from "express";
import request from "supertest";
import cookieParser from 'cookie-parser';
import usersRouter from "../dist/routes/user.routes.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(cookieParser());

app.use(express.json());
app.use("/users", usersRouter);
app.use(express.urlencoded({
    extended: false
}));

beforeAll(async () => {
    await initDB();
});

afterAll(async () => {
    await dataSource.destroy();
});
const tmpEmail = `test${parseInt(Math.random()*10000)}@gmail.com`;
let token = '';
const tmpData = {
    "email": tmpEmail,
    "password": "123@2022"
};


describe("register process", () => {
    it("should register new user", async () => {
        const user = {
            ...tmpData,
            "firstName": "test",
            "lastName": "test",
        };
        const response = await request(app).post("/users/register").send(user);
        expect(response.status).toBe(201);
    });
});
describe("Login process", () => {
    it("should login with valid credentials", async () => {
        const user = {
            ...tmpData
        };

        const response = await request(app).post("/users/login").send(user);
        token = response.body.token
        expect(response.status).toBe(200);
    });
});



describe("update profile process", () => {

    it("should update profile", async () => {
        const user = {

            "firstName": "test0",
            "lastName": "test0",
        };
        const response = await request(app).put("/users/profile").set('Cookie', `token=${token}`).send(user);
        expect(response.status).toBe(200);
    });
});
describe("update profile process", () => {

    it("should not update profile", async () => {
        const user = {
            "firstName": "test0",
            "lastName": "test0",
        };
        const response = await request(app).put("/users/profile").send(user);
        expect(response.status).toBe(401);
    });
});