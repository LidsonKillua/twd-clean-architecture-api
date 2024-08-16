import request from 'supertest'
import app from '@/main/config/app'

describe('Register Routes', () => {
  test('should return an account on success', async () => {
    app.post('/test_cors', (req, res) => {
        res.send()
    })

    await request(app)
      .post('/api/register')
      .send({
        name: 'Any Name',
        email: 'lidson@gmail.com'
      })
      .expect(201)
  })     
})