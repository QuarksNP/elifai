export function formatUpperCase(str: string) {
  const formattedStr = (
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  ).replaceAll('_', ' ');

  return formattedStr;
}
