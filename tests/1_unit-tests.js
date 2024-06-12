const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('convertHandler should correctly read a whole number input', function() {
        assert.equal(convertHandler.getNum('32mi'), 32);
    });
    
    test('convertHandler should correctly read a decimal number input', function() {
        assert.equal(convertHandler.getNum('3.2mi'), 3.2);
    });

    test('convertHandler should correctly read a fractional input', function() {
        assert.equal(convertHandler.getNum('1/2mi'), 0.5);
    });

    test('convertHandler should correctly read a fractional input with a decimal', function() {
        assert.equal(convertHandler.getNum('5.4/3mi'), 1.8);
    });

    test('convertHandler should correctly return an error on a double-fraction', function() {
        assert.equal(convertHandler.getNum('3/2/3mi'), 'invalid number');
    });

    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function() {
        assert.equal(convertHandler.getNum('mi'), 1);
    });

    test('convertHandler should correctly read each valid input unit', function() {
        const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
        validUnits.forEach(unit => {
            assert.equal(convertHandler.getUnit(`1${unit}`), unit);
        });
    });

    test('convertHandler should correctly return an error for an invalid input unit', function() {
        assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
    });

    test('convertHandler should return the correct return unit for each valid input unit', function() {
        const inputOutputMap = {
            'gal': 'L',
            'l': 'gal',
            'mi': 'km',
            'km': 'mi',
            'lbs': 'kg',
            'kg': 'lbs'
        };
        for (let input in inputOutputMap) {
            assert.equal(convertHandler.getReturnUnit(input), inputOutputMap[input]);
        }
    });

    test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function() {
        const spelledOutUnits = {
            'gal': 'gallons',
            'l': 'liters',
            'mi': 'miles',
            'km': 'kilometers',
            'lbs': 'pounds',
            'kg': 'kilograms'
        };
        for (let unit in spelledOutUnits) {
            assert.equal(convertHandler.spellOutUnit(unit), spelledOutUnits[unit]);
        }
    });

    test('convertHandler should correctly convert gal to L', function() {
        assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.00001);
    });

    test('convertHandler should correctly convert L to gal', function() {
        assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.00001);
    });

    test('convertHandler should correctly convert mi to km', function() {
        assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.00001);
    });

    test('convertHandler should correctly convert km to mi', function() {
        assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.00001);
    });

    test('convertHandler should correctly convert lbs to kg', function() {
        assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.00001);
    });

    test('convertHandler should correctly convert kg to lbs', function() {
        assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.00001);
    });
});