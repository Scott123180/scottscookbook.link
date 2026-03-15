import { setCookie, getCookie, deleteCookie } from "../cookies";

// JSDOM resets the cookie jar between test files but not between tests,
// so we clear cookies manually in beforeEach.
function clearAllCookies() {
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    if (name) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  });
}

describe("cookies", () => {
  beforeEach(() => {
    clearAllCookies();
  });

  describe("setCookie / getCookie", () => {
    it("stores and retrieves a value", () => {
      setCookie("provider", "AMAZON_FRESH");
      expect(getCookie("provider")).toBe("AMAZON_FRESH");
    });

    it("returns null for a missing key", () => {
      expect(getCookie("nonexistent")).toBeNull();
    });

    it("URL-encodes names containing spaces", () => {
      setCookie("my key", "hello");
      expect(getCookie("my key")).toBe("hello");
    });

    it("round-trips values containing special characters", () => {
      setCookie("pref", "a=b&c=d");
      expect(getCookie("pref")).toBe("a=b&c=d");
    });

    it("overwrites an existing cookie", () => {
      setCookie("color", "red");
      setCookie("color", "blue");
      expect(getCookie("color")).toBe("blue");
    });

    it("stores empty string value", () => {
      setCookie("empty", "");
      expect(getCookie("empty")).toBe("");
    });
  });

  describe("deleteCookie", () => {
    it("removes a cookie so getCookie returns null", () => {
      setCookie("temp", "value");
      expect(getCookie("temp")).toBe("value");
      deleteCookie("temp");
      expect(getCookie("temp")).toBeNull();
    });

    it("does not throw when deleting a non-existent cookie", () => {
      expect(() => deleteCookie("ghost")).not.toThrow();
    });
  });

});

