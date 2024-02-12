/**
 * 複素数を表すクラス
 */
export class Complex {
  real: number; // 実部
  imaginary: number; // 虚部

  constructor(real: number, imaginary: number) {
    this.real = real;
    this.imaginary = imaginary;
  }
}

export function add(complex1: Complex, complex2: Complex): Complex {
  return new Complex(
    complex1.real + complex2.real,
    complex1.imaginary + complex2.imaginary
  );
}

export function sub(complex1: Complex, complex2: Complex): Complex {
  return new Complex(
    complex1.real - complex2.real,
    complex1.imaginary - complex2.imaginary
  );
}

export function mul(complex1: Complex, complex2: Complex): Complex {
  const real =
    complex1.real * complex2.real - complex1.imaginary * complex2.imaginary;
  const imaginary =
    complex1.real * complex2.imaginary + complex1.imaginary * complex2.real;
  return new Complex(real, imaginary);
}

export function div(complex1: Complex, complex2: Complex): Complex {
  const divisor = complex2.real ** 2 - complex2.imaginary ** 2;
  const dividend = mul(
    complex1,
    new Complex(complex2.real, -complex2.imaginary)
  );
  return new Complex(dividend.real / divisor, dividend.imaginary / divisor);
}
