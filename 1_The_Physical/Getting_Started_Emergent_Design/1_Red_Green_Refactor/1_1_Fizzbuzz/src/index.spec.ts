import { fizzBuzz } from "./fizzbuzz";

describe("fizzbuzz", () => {
  it("when passed 3 passes fizz", () => {
    const result = fizzBuzz(3);
    expect(result).toEqual("fizz");
  });
});
