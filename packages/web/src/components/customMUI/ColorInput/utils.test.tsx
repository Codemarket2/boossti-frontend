import { colorFromString } from './utils';

describe('colorFromString tests', () => {
  it('hex with hash returns correctly', () => {
    expect(colorFromString('#fff')).to.be.a('#fff');
    expect(colorFromString('#123')).to.be.a('#123');
    expect(colorFromString('#ffaaee')).to.be.a('#ffaaee');
    expect(colorFromString('#fffffff')).to.be.null;
    expect(colorFromString('#fffffg')).to.be.null;
  });

  it('hex without has returns correctly', () => {
    expect(colorFromString('fff')).to.be.a('#fff');
    expect(colorFromString('123')).to.be.a('#123');
    expect(colorFromString('ffaaee')).to.be.a('#ffaaee');
    expect(colorFromString('fffffff')).to.be.null;
    expect(colorFromString('fffffg')).to.be.null;
  });

  it('rgb, rgba values return correctly', () => {
    expect(colorFromString('rgb(255, 255, 255)')).to.be.a('rgb(255, 255, 255)');
    expect(colorFromString('rgb(100.22,100.55,100.2)')).to.be.a('rgb(100.22,100.55,100.2)');
    expect(colorFromString('rgb(255,255,255,0.5)')).to.be.null;
    expect(colorFromString('rgba(255, 255, 255, 1)')).to.be.a('rgba(255, 255, 255, 1)');
    expect(colorFromString('rgba(100.22,100.55,100.2, 0.5)')).to.be.a(
      'rgba(100.22,100.55,100.2, 0.5)',
    );
    expect(colorFromString('rgba(255,255,255)')).to.be.null;
  });

  it('hsl,hsla values return correctly', () => {
    expect(colorFromString('hsl(360, 100%, 50%)')).to.be.a('hsl(360, 100%, 50%)');
    expect(colorFromString('hsl(100,50%,10%)')).to.be.a('hsl(100,50%,10%)');
    expect(colorFromString('hsl(100,50,10)')).to.be.null;
    expect(colorFromString('hsl(360, 100%, 50%, 0.5)')).to.be.null;
    expect(colorFromString('hsla(360, 100%, 50%, 0.5)')).to.be.a('hsla(360, 100%, 50%, 0.5)');
    expect(colorFromString('hsla(100,50%,10%, 1)')).to.be.a('hsla(100,50%,10%, 1)');
    expect(colorFromString('hsla(255,100%,10%)')).to.be.null;
  });
});
