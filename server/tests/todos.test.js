const request = require('supertest');
const app = require('../index.js');
const Todo = require('../models/todoSchema');
describe('GET /todos', () => {
    it('should return all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.statusCode).toBe(200);
        })
        .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
        .get('/todos/63f8f74b2ab086e5ca93c273')
        .expect(200)
        .expect((res) => {
            expect(res.statusCode).toBe(200);
        })
        .end(done);
    });

    it('should return 400 if todo not found', (done) => {
        request(app)
        .get('/todos/5b7a8c8a1c9d4400001c9d2e')
        .expect(400)
        .end(done);
    });
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {

        request(app)
        .post('/todos')
        .send({title:"Test todo text",status:"Progress"})
        .expect(200)
        .expect((res) => {
            expect(res.body.message).toBe("Todo Added Successfully");
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(3);//3 because we have 2 todos in db and we are adding one more
                done();
            }).catch((e) => done(e));
        });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(3);//3 because we have 2 todos in db and we are adding one more
                done();
            }).catch((e) => done(e));
        });
    });
});

describe('Put /todos', () => {
    it('should update todo', (done) => {
        request(app)
        .put('/todos')
        .send({id:"63f912d6009f1a5b68de1aac",title:"Test todo text",status:"Completed"})
        .expect(200)
        .expect((res) => {
            expect(res.body.message).toBe("Todo Updated Successfully");
        })
        .end(done);
    });

    it('should return 400 if todo not found', (done) => {
        request(app)
        .put('/todos')
        .send({id:"5b7a8c8a1c9d4400001c9d2e",title:"Test todo text",status:"Completed"})
        .expect(400)
        .end(done);
    });
});

describe('Delete /todos/:id', () => {
    it('should delete todo', (done) => {
        request(app)
        .delete('/todos/63f912d6009f1a5b68de1aac')
        .expect(200)
        .expect((res) => {
            expect(res.body.message).toBe("Todo Deleted Successfully");
        })
        .end(done);
    });

    it('should return 400 if todo not found', (done) => {
        request(app)
        .delete('/todos/5b7a8c8a1c9d4400001c9d2e')
        .expect(400)
        .end(done);
    });
});