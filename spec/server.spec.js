const request = require("request");


describe('calc', ()=> {
    it("should multiply 2 by 3", ()=> {
        expect(2*2).toBe(4)
    })
});

describe('get messages', ()=> {
    it('should return 200 OK', (done)=> {
        request.get('http://localhost:3000/api/get/messages', (err, res)=> {
            expect(res.statusCode).toBe(200);
            done();
        });
    });
    it('should return non empty list', (done)=> {
        request.get('http://localhost:3000/api/get/messages', (err, res)=> {
            expect(JSON.parse(res.body).length).toBeGreaterThan(0);
            done();
        });
    });
});

describe('get messages from a user', ()=> {
    it('should resturn 200 OK', (done)=> {
        request.get('http://localhost:3000/api/get/messages/saurabh', (req, res)=> {
            expect(res.statusCode).toBe(200);
            done();
        });
    });
    it('should resturn message from specific user', (done)=> {
        request.get('http://localhost:3000/api/get/messages/saurabh', (req, res)=> {
            expect(JSON.parse(res.body).every(el=> {
                return el.name === 'saurabh'
            })).toBe(true);
            done();
        });
    });
});