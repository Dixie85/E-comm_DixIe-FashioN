import request from 'supertest';
import app from './src/app';
// import {  } from './db/clothes.json';


describe('Testing GET endpoint', () => {

  test('Getting all ', async () => {
    const res = await request(app).get('/api/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(Db);
  });

  test('Error testing GET all , bad DB conecton', async () => {
    const res = await request(app).get('/api/');
    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual({message: 'Internal Server Error'});
  });
});


describe('Testing GET endpoint with ID', () => {

  test('Getting a  with ID', async () => {
    const res = await request(app).get('/api//1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(Db[1]);
  });

  test('Error testing GET a  with ID, not existing ID', async () => {
    const res = await request(app).get('/api//9999');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({message: ' with ID number 9999 not does not exist'});
  });

  test('Error testing GET a  with ID, bad DB conecton', async () => {
    const res = await request(app).get('/api/');
    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual({message: 'Internal Server Error'});
  });
});


describe('Testing POST endpoint ', () => {

  test('Post new ', async () => {
    const res = await request(app)
    .post('/api/')
    .set('Content-type', 'application/json')
    .send({
      name : 'Fifi',
      breed : 'Bulldog',
      birthDate : '2015-07-15'
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: '',
    });
  });

  test('Error testing POST a , all fields to be filled ', async () => {
    const res = await request(app)
    .post('/api/')
    .set('Content-type', 'application/json')
    .send({

    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({message: 'Bad request, Please make sure all fields are filled.'});
  });

  test('Error testing POST a , bad DB conecton', async () => {
    const res = await request(app).post('/api/');
    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual({message: 'Internal Server Error'});
  });
});


describe('Testing PUT endpoint', () => {

  test('PUT a  in the existing DB', async () => {
    const res = await request(app)
    .put('/api//2')
    .set('Content-type', 'application/json')
    .send({

    });
    expect(res.statusCode).toEqual(200);
    expect(res.body[3].name).toEqual('Fifi');
  });

  test('Error testing PUT a  in the existing DB, no data was send', async () => {
    const res = await request(app)
    .put('/api//2')
    .set('Content-type', 'application/json')
    .send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({message: 'Nothing was changed, no data provided.'});
  });

  test('Error testing PUT a , bad DB conecton', async () => {
    const res = await request(app).post('/api/');
    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual({message: 'Internal Server Error'});
  });
});


describe('Testing DELETE endpoint', () => {

  test('DELETE  from DB', async () => {
    const res = await request(app)
    .delete('/api//3')
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(Db.length - 1);
  });

  test('Error testing DELETE  from DB', async () => {
    const res = await request(app)
    .delete('/api//9999')
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({message: ' not found'});
  });

  test('Error testing DELETE , bad DB conecton', async () => {
    const res = await request(app).post('/api/');
    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual({message: 'Internal Server Error'});
  });
});