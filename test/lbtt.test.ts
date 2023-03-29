import lbtt from '../src/lbtt'
import { expect, test} from '@jest/globals';
import { UserError } from '../src/types';

// Calculations verified against https://www.savills.co.uk/resources-and-tools/lbtt-calculator.aspx

/**
 * Test a number that will hit NO tiers (will not even enter the loop). 
 */
test('zero value', () => {
  expect(lbtt(0)).toBe(0);
});

/**
 * Test a small number that will hit NO tiers BUT will enter the loop. 
 */
test('zero value', () => {
    expect(lbtt(100000)).toBe(0);
  });

/**
 * Test a number that will hit all tiers. 
 */
test('million value', () => {
    expect(lbtt(1000000)).toBe(78350)
});

/**
 * Test a relatively large number we arbitrarily know the value for. 
 */
test('hundred million value', () => {
    expect(lbtt(100000000)).toBe(11958350)
});

/**
 * Test we can handle floating point numbers and rounding is done correctly. 
 */
test('floating point value', () => {
    expect(lbtt(500000)).toBe(23350)
    expect(lbtt(500000.99)).toBe(23350.10)
});

/**
 * Test we can handle negative numbers being inputted. 
 */
test('negative value', () => {
    try {
        lbtt(-1)   
    } catch (error) {
        expect(error).toBeInstanceOf(UserError);
        expect(error.message).toBe('Cannot parse negative numbers');
    }
});

/**
 * Test we can handle 'NaN' numbers being inputted. 
 */
test('not a number value', () => {
    try {
        lbtt(NaN)   
    } catch (error) {
        expect(error).toBeInstanceOf(UserError);
        expect(error.message).toBe('Cannot resolve a number from given input');
    }
});

/**
 * Test we can handle stupidly large numbers without overflowing. 
 * Not much point in asserting the return, just here to ensure an error isn't thrown.
 */
test('max number', () => {
    expect(lbtt(Number.MAX_VALUE))
});