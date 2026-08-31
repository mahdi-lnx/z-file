
import { test, expect } from "vitest"
import { cn } from "./general"

test("creating css class strings", () => {
    expect(cn(" bg-stone-50 ", false, "\t  mt-7 \n", false)).toBe("bg-stone-50 mt-7");
});

