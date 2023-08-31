// "mom" returns true
// "Mom" returns true
// "MoM" returns true
// "Momx" returns false
// "xMomx" returns true
// "Was It A Rat I Saw" returns true
// "Never Odd or Even" returns true
// "Never Odd or Even1" returns false
// "1Never Odd or Even1" returns true
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
