export function cn(
  ...inputs: (string | false | undefined | { [key: string]: boolean })[]
) {
  const classes: string[] = [];

  inputs.forEach((input) => {
    if (typeof input === 'string' && input) {
      classes.push(input);
    } else if (typeof input === 'object' && input !== null) {
      Object.entries(input).forEach(([key, value]) => {
        if (value) {
          classes.push(key);
        }
      });
    }
  });

  return classes.join(' ');
}
