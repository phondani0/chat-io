const expect = require('expect');

const {
    generateMsg
} = require('./message');

describe('generateMsg', () => {
    it('should generate correct message object', () => {
        const from = 'jen';
        const text = 'some message';
        const message = generateMsg(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({
            from,
            text
        });
    })
})