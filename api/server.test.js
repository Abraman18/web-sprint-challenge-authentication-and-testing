const db = require('../data/dbConfig')
const request = require('supertest')
const server = require('./server')
const auth = require('./auth/auth-router')
const abraman = {
  username: 'abraman',
  password: 'chocolate'
}


test('sanity', () => {
  expect(true).toBe(true)
})

  beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
  })

  beforeEach(async () => {
    await db.seed.run()
  })

  afterAll(async () => {
    await db.destroy()
  })

  describe('endpoints', () => {
    describe(' [POST] /register', () => {
      test('responds with new user', async => {
        const res = await request(auth)
          .post('/register').send({
            username: 'abraman',
            password: 'chocolate'
          })
        expect(res.body).toMatchObject({
          id: 1,
          username: 'abraman',
          password: 'chocolate'
        })
      })
    })
  })

  describe('[POST] /login', () => {
    it('responds with new created user', async () => {
      let res
      res = await (await request(auth).post('/login')).send(abraman)
      expect(res.body).toMatchObject({ id: 1, ...abraman })
    })
    it('responds with 200 ok', async () => {
      const res = await request(auth).post('/login')
      expect(res.status).toBe(200)
    })
  })

