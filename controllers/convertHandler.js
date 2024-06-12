function ConvertHandler() {

  this.getNum = function(input) {
    let result;
    const numRegex = /^[^a-zA-Z]*/;
    result = input.match(numRegex)[0];

    if (result.includes('/')) {
      const fractions = result.split('/');
      if (fractions.length > 2) {
        return 'invalid number';
      }
      result = fractions[0] / fractions[1];
    }

    if (result === '') {
      return 1;
    }

    if (isNaN(result)) {
      return 'invalid number';
    }

    return parseFloat(result);
  };

  this.getUnit = function(input) {
    let result;
    const unitRegex = /[a-zA-Z]+$/;
    result = input.match(unitRegex)[0].toLowerCase();

    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    if (validUnits.indexOf(result) === -1) {
      return 'invalid unit';
    }

    return result;
  };

  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      'gal': 'L',
      'l': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };

    return unitMap[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function(unit) {
    const spelledOutUnits = {
      'gal': 'gallons',
      'l': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };

    return spelledOutUnits[unit.toLowerCase()];
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = 'invalid unit';
    }

    return parseFloat(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const initUnitStr = this.spellOutUnit(initUnit);
    const returnUnitStr = this.spellOutUnit(returnUnit);

    return `${initNum} ${initUnitStr} converts to ${returnNum} ${returnUnitStr}`;
  };

}

module.exports = ConvertHandler;
