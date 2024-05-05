const isValidUrl = require("../../services/validation");

describe("isValidUrl", () => {
  // Test that a URL missing a protocol returns undefined
  it("returns undefined when the URL is missing a protocol", () => {
    const url = "www.offerzen.com";
    const result = isValidUrl(url);
    expect(result).toBeUndefined();
  });

  // Test that a URL with a path is returned as is
  it("returns the URL when it has a path", () => {
    const url = "http://www.a24group.com/path";
    const result = isValidUrl(url);
    expect(result).toBe(url);
  });

  // Test that a URL with a query string is returned as is
  it("returns the URL when it has a query string", () => {
    const url = "http://www.a24group.com?query=string";
    const result = isValidUrl(url);
    expect(result).toBe(url);
  });

  // Test that a URL with a fragment is returned as is
  it("returns the URL when it has a fragment", () => {
    const url = "http://www.a24group.com#fragment";
    const result = isValidUrl(url);
    expect(result).toBe(url);
  });
});
