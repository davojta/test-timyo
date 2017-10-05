import {
    palindrome,
    removeDublicates,
    logger,
    sum
} from './basics'


describe('removeDublicates', () => {
    it('should remove dublicates from array', () => {
        expect(removeDublicates(['1', '2', '2'])).toEqual(['1', '2']);

        const names = ['Mike', 'Matt', 'Nancy', 'Adam', 'Jenny', 'Nancy', 'Carl'];

        expect(removeDublicates(names)).toEqual(['Mike', 'Matt', 'Nancy', 'Adam', 'Jenny', 'Carl']);

    })
});

describe('polindrom', () => {
    it('should check if word is polindrom', () => {
        expect(palindrome('race car')).toBe(true);
        expect(palindrome('car')).toBe(false);
        expect(palindrome('never odd or even')).toBe(true);
    })
});

describe('sum', () => {
    it('should sum all numbers', () => {
        expect(sum(1)(2)(3)).toBe(6);
        expect(sum(10)(5)(0)).toBe(15);
    })
});

const originalLog = console.log;
describe('logger', () => {
    beforeEach(() => {
        console.log = jest.fn();
    });
    afterEach(() => {
        console.log = originalLog;
    });
    it('should log info about module', () => {
        const log = logger('moduleName');

        log('some info');

        expect(console.log.mock.calls[0][0]).toEqual('moduleName: some info')
    })
});
