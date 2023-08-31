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
  it.each(["mom", "Mom", "MoM"])("'%s' returns true", (input) => {
    expect(palindrome(input)).toBe(true);
  });

  it("'Momx' returns false", () => {
    expect(palindrome("Momx")).toBe(false);
  });
});
