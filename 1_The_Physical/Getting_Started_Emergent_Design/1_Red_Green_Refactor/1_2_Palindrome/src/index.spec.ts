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
  it("'mom' returns true", () => {
    expect(palindrome("mom")).toBe(true);
  });

  it("'Mom' returns true", () => {
    expect(palindrome("Mom")).toBe(true);
  });

  it("'MoM' returns true", () => {
    expect(palindrome("MoM")).toBe(true);
  });

  it("'Momx' returns false", () => {
    expect(palindrome("Momx")).toBe(false);
  });
});
