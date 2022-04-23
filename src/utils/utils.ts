import * as AwesomePhonenumber from 'awesome-phonenumber';

export function range(start: number, end: number): number[] {
  return [...Array.from(Array.from(Array(1 + end - start)).keys())].map(
    v => start + v
  );
}

export function onEnterPress(doThis: () => void) {
  return (
    e: React.KeyboardEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLDivElement
    >
  ): void => {
    if (e.key === 'Enter') {
      doThis();
    }
  };
}

export function displayPhoneNumber(n: string): string {
  return new AwesomePhonenumber.default('+1' + n).getNumber('national');
}

export function displayPrice(priceInCents: number | undefined = 0): string {
  if (priceInCents !== 0) {
    priceInCents /= 100;
  }
  // return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3
  return (
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD', // TODO: Modify
      // maximumSignificantDigits: 2,
    }).format(priceInCents) + ''
  );
  // return '$' + Math.round((priceInCents + Number.EPSILON) * 100) / 100;
}

export function noop() {
  // Do nothing.
}

export function isNever(_: never): never {
  return _;
}
