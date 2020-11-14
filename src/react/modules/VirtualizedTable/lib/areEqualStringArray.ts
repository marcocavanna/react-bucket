export default function areEqualStringArray(first: string[], second: string[]): boolean {
  return first.length === second.length && first.join('%%') === second.join('%%');
}
