import { getMonth } from "./index";

describe("Date helper", () => {
    describe("When getMonth is called", () => {
        it("should return 'janvier' for '2022-01-01' as date", () => {
            expect(getMonth("2022-01-01")).toBe("janvier");
        });

        it("should return 'juillet' for '2022-07-08' as date", () => {
            expect(getMonth("2022-07-08")).toBe("juillet");
        });

        it("should return 'Date invalide' for an invalid date", () => {
            expect(getMonth("invalid-date")).toBe("Date invalide");
        });

        it("should return 'mars' for a Date object (March 15, 2023)", () => {
            expect(getMonth(new Date(2023, 2, 15))).toBe("mars");
        });

        it("should return 'Date invalide' for an empty string", () => {
            expect(getMonth("")).toBe("Date invalide");
        });

        it("should return 'Date invalide' for a null value", () => {
            expect(getMonth(null)).toBe("Date invalide");
        });

        it("should return 'Date invalide' for an undefined value", () => {
            expect(getMonth(undefined)).toBe("Date invalide");
        });
    });
});


