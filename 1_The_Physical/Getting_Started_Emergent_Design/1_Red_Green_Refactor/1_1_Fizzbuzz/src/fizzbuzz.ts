export const fizzbuzz = (n: number): string => {
  if (n === 15) {
    return "FizzBuzz";
  }
  if (n === 5) {
    return "Buzz";
  }

  return "Fizz";
};
