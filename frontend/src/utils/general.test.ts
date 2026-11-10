
import { test, expect } from "vitest"
import { cn } from "./general"

test("creating css class strings", () => {
    expect(cn(
        " bg-stone-50 ", undefined, null,
        false, "\t  mt-7 \n", false, null,
        undefined
    )).toBe("bg-stone-50 mt-7");
});

test("merging conflicting css class string", () => {
    expect(cn(
        "bg-stone-50",
        "bg-stone-100",
        "p-7",
        "pr-7",
        "p-9",
        "pr-9",
        "w-70",
        "w-90",
    )).toBe("bg-stone-100 p-9 pr-9 w-90");

    expect(cn(
        "bg-stone-50 bg-stone-100 p-7 pr-7 p-9 pr-9 w-70 w-90",
    )).toBe("bg-stone-100 p-9 pr-9 w-90");
});

