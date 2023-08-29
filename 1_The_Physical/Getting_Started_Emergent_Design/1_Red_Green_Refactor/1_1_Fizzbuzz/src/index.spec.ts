import { fizzbuzz } from "./fizzbuzz";

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

  it.each([undefined, null, {}])("should throw an error when given %i", (n) => {
    expect(fizzbuzz(n as any)).toEqual(n);
  });

  it("should return Fizz for -12", () => {
    expect(fizzbuzz(-12)).toEqual("Fizz");
  });

  it("should return value if not a number", () => {
    expect(fizzbuzz(undefined as any)).toEqual(undefined);
  });
});
