console.log("start test");

describe('Backend Tests', () => {
    it('should return true', () => {
        const result = true;
        require('chai').expect(result).to.be.true;
    });

    it('should not be null', () => {
        const result = 'Hello';
        require('chai').expect(result).to.not.be.null;
    });

    it('should return all galaxies', (done) => {
        const request = require('supertest');
        const app = require('../index.js');

        request(app)
            .get('/api/galaxies')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                require('chai').expect(res.body).to.be.an('array');
                done();
            });
    });
});






