import { fizzbuzz } from "./fizzbuzz";

// each return value is a string
// 3 returns "Fizz"
// 5 returns "Buzz
// 15 returns "FizzBuzz"
// 9 returns "Fizz"
// 43 returns "43"
// 42 returns "Fizz"
// 45 returns "FizzBuzz"
// 102 (you decide, throw an Error or handle some other way)
// -12 (you decide, throw an Error or handle some other way)
// any non-number (you decide, throw an Error or handle some other way)

describe("fizzbuzz", () => {
  it.each([3, 9, 42])("should return Fizz when given %i", (n) => {
    expect(fizzbuzz(n)).toEqual("Fizz");
  });

  it.each([15, 45, 90])("should return Buzz when given %i", (n) => {
    expect(fizzbuzz(n)).toEqual("FizzBuzz");
  });

  it.each([5, 10, 20])("should return Buzz when given %i", (n) => {
    expect(fizzbuzz(n)).toEqual("Buzz");
  });

  it.each([1, 2, 2224])("should return %i when given %i", (n) => {
    expect(fizzbuzz(n)).toEqual(n.toString());
  });

  it("should return Fizz for -12", () => {
    expect(fizzbuzz(-12)).toEqual("Fizz");
  });

  it("should return value if not a number", () => {
    expect(fizzbuzz(undefined as any)).toEqual(undefined);
  });
});
