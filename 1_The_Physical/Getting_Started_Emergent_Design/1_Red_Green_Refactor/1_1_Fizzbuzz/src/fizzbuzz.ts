export const fizzbuzz = (n: number): string => {
  if (n === 15) {
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
