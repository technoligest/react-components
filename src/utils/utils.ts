export function range(start: number, end: number): number[] {
  return [...Array.from(Array.from(Array(1 + end - start)).keys())].map(
    v => start + v
  );
}
