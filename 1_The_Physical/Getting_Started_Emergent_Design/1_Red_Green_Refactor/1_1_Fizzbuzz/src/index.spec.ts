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
  it("3 should return Fizz", () => {
    expect(fizzbuzz(3)).toEqual("Fizz");
  });

  it("5 should return Buzz", () => {
    expect(fizzbuzz(5)).toEqual("Buzz");
  });

  it("15 should return FizzBuzz", () => {
    expect(fizzbuzz(15)).toEqual("FizzBuzz");
  });
});
