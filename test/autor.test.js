require('jest')
const supertest = require('supertest')
const request = supertest('http://localhost:3000')

describe('/cliente', () => {
  test('POST - Criar um novo autor', async () => {
    const payloadRequest1 = {
      nome: 'Autor Teste 1',
      email: 'teste@gmail.com',
      telefone: '99-99999-9999'
    }
    const res = await request.post('/autor')
      .send(payloadRequest1)
    expect(res.status).toBe(201)
    expect(res.body.nome).toBe(payloadRequest1.nome)
    expect(res.body.email).toBe(payloadRequest1.email)
    expect(res.body.telefone).toBe(payloadRequest1.telefone)
  })

  test('PUT - Atualizar um cliente', async () => {
    const payloadRequest1 = {
      nome: 'Autor Teste 1',
      email: 'teste@gmail.com',
      telefone: '99-99999-9999'
    }
    const res = await request.post('/autor')
      .send(payloadRequest1)
    expect(res.status).toBe(201)

    payloadRequest1.autorId = res.body.autorId
    payloadRequest1.nome = 'Autor 1 PUT'
    payloadRequest1.email = 'teste2@gmail.com'
    payloadRequest1.telefone = '99-99999-9992'

    const res2 = await request.put('/autor')
      .send(payloadRequest1)

    expect(res2.status).toBe(200)
    expect(res2.body.nome).toBe(payloadRequest1.nome)
    expect(res2.body.email).toBe(payloadRequest1.email)
    expect(res2.body.telefone).toBe(payloadRequest1.telefone)
  })

  test('DELETE - Apagar um autor', async () => {
    const payloadRequest1 = {
      nome: 'Autor Teste 1',
      email: 'teste@gmail.com',
      telefone: '99-99999-9999'
    }
    const res = await request.post('/autor')
      .send(payloadRequest1)
    expect(res.status).toBe(201)

    const id = res.body.autorId
    const res2 = await request.delete(`/autor/${id}`)

    expect(res2.status).toBe(200)
  })

  test('GET - Listar Autores', async () => {
    const res = await request.get('/autor')
    expect(res.status).toBe(200)
    const autores = res.body
    autores.forEach(autor => {
    //  expect(client.senha).toBe(undefined)
    })
  })
})
