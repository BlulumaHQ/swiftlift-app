import { describe, expect, it, vi, afterEach } from "vitest";
import { readFileSync } from "node:fs";
import ts from "typescript";

// Exercise the deployed function's pure rules without starting its Deno server.
const source = readFileSync("supabase/functions/send-intake-confirmation/index.ts", "utf8");
const rules = source.slice(source.indexOf("const MIN_FILL_MS"), source.indexOf("serve(async"));
const javascript = ts.transpileModule(rules, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText;
const { spamReason } = new Function(`${javascript}; return { spamReason };`)() as {
  spamReason: (body: Record<string, unknown>, name: string) => string | null;
};
const now = 1800000000000;
const valid = { _t: now - 5000, website_hp: "" };

afterEach(() => vi.restoreAllMocks());

describe("confirmation spam protection", () => {
  it("silently blocks a populated honeypot", () => {
    expect(spamReason({ ...valid, website_hp: "https://spam.example" }, "John Lee")).toBe("honeypot");
  });
  it("requires a finite numeric timestamp", () => {
    expect(spamReason({}, "John Lee")).toBe("no_timestamp");
    expect(spamReason({ _t: "invalid" }, "John Lee")).toBe("no_timestamp");
  });
  it("requires at least 3000 milliseconds", () => {
    vi.spyOn(Date, "now").mockReturnValue(now);
    expect(spamReason({ _t: now - 2999 }, "John Lee")).toBe("too_fast");
    expect(spamReason({ _t: now - 3000 }, "John Lee")).toBeNull();
  });
  it("expires forms after 24 hours", () => {
    vi.spyOn(Date, "now").mockReturnValue(now);
    expect(spamReason({ _t: now - 86400001 }, "John Lee")).toBe("stale_form");
    expect(spamReason({ _t: now - 86400000 }, "John Lee")).toBeNull();
  });
  it("blocks long mixed-capital gibberish without rejecting ordinary names", () => {
    vi.spyOn(Date, "now").mockReturnValue(now);
    expect(spamReason(valid, "aBcDeFgHiJkl")).toBe("gibberish_name");
    expect(spamReason(valid, "Christopher")).toBeNull();
    expect(spamReason(valid, "John Lee")).toBeNull();
    expect(spamReason(valid, "王小明")).toBeNull();
  });
});