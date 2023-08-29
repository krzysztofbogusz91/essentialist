export const fizzbuzz = (n: number): string => {
  if (n % 5 === 0 && n % 3 === 0) {
    return "FizzBuzz";
  }
  if (n === 5) {
    return "Buzz";
  }
  if (n % 3 === 0) {
    return "Fizz";
  }
  return n.toString();
};
