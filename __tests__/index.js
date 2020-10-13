const supertest = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');
const auth = require('../auth/auth-router');
beforeEach(async ()=>{
    await db.seed.run()
})
afterAll(async ()=>{
    await db.destroy()
})
describe('sprint test',()=>{
    it('GET /',async ()=>{
        const res = await supertest(server).get('/')
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
    })
    it('auth GET /',async ()=>{
        const res = await supertest(server).get('/api/auth/users')
        expect(res.status).toBe(401)
    })
    it('POST register/',async ()=>{
        const res = await supertest(server).post('/api/auth/register')
        .send({username:"testname",
        password:"12345"})
        expect(res.statusCode).toBe(201)
        expect(res.body[0].username).toBe("testname")
    })
})