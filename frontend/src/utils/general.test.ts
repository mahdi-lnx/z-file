
import { test, expect } from "vitest"
import { cn } from "./general"

test("creating css class strings", () => {
    expect(cn(
        " bg-stone-50 ", undefined, null,
        false, "\t  mt-7 \n", false, null,
        undefined
    )).toBe("bg-stone-50 mt-7");
});

