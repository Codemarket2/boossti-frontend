interface IColor {
  main: string;
}
interface IPalette {
  primary: IColor;
  secondary: IColor;
  error: IColor;
}

const palette: IPalette = {
  primary: { main: '#6E00EE' },
  secondary: { main: '#03DAC5' },
  error: { main: '#B00020' },
};

export default palette;
