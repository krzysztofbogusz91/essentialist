import { palindrome } from "./index";

describe("palindrome checker", () => {
  it.each([
    ["mom", true],
    ["Mom", true],
    ["MoM", true],
    ["xMomx", true],
    ["Was It A Rat I Saw", true],
    ["Never Odd or Even", true],
    ["Momx", false],
    ["Never Odd or Even1", false],
    ["1Never Odd or Even1", true],
  ])("'%s' returns %p", (input, expected) => {
    expect(palindrome(input)).toBe(expected);
  });
});
