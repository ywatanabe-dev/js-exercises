export function deleteOddNumber(
  input: Record<string, number>
): Record<string, number> {
  const odd_props: string[] = [];

  for (const prop in input) {
    if (input[prop] % 2 !== 0) {
      odd_props.push(prop);
    }
  }

  for (const prop of odd_props) {
    delete input[prop];
  }

  return input;
}
