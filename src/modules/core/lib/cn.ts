export function cn(...inputs: (string | false | undefined)[]) {
  return inputs.filter(Boolean).join(' ');
}