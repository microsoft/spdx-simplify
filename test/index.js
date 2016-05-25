var chai = require('chai');
var simplify = require('../lib/index');

var expect = chai.expect;

describe('simplify', () => {
  it('single license should return that license', () => {
    expect(simplify('MIT')).to.deep.equal(['MIT']);
  });
  it('two licenses and\'d should return a Multiple License', () => {
    expect(simplify('MIT AND BSD-2-Clause')).to.deep.equal(['MultipleLicenses']);
  });
  it('two licenses or\'d should return both licenses', () => {
    expect(simplify('MIT OR BSD-2-Clause')).to.deep.equal(['MIT', 'BSD-2-Clause']);
  });
  it('combination or and and and\'d subexpression should return or\'d license and Multiple License', () => {
    expect(simplify('MIT OR (BSD-2-Clause AND GPL-2.0)')).to.deep.equal(['MIT', 'MultipleLicenses']);
  });
  it('combination or and and or\'d subexpression should return all licenses', () => {
    expect(simplify('MIT OR (BSD-2-Clause OR GPL-2.0)')).to.deep.equal(['MIT', 'BSD-2-Clause', 'GPL-2.0']);
  });
  it('nested expressions should return correct licenses', () => {
    expect(simplify('MIT OR (BSD-2-Clause OR (BSD-3-Clause AND Unlicense))')).to.deep.equal(['MIT', 'BSD-2-Clause', 'MultipleLicenses']);
  });
  it('order of expressions is honored', () => {
    expect(simplify('MIT OR BSD-3-Clause AND Unlicense')).to.deep.equal(['MIT', 'MultipleLicenses']);
  });
  it('invalid expressions return an empty list of licenses', () => {
    expect(simplify('MIT OR')).to.deep.equal([]);
  });
});