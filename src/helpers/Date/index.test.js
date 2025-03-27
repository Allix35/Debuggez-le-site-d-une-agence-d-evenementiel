import { getMonth } from "./index";

describe("Date helper", () => {

    // Bloc to test getMonth Function
    describe("When getMonth is called", () => {

        // Test 1 : If string format return "janvier"
        it("should return 'janvier' for '2022-01-01' as date", () => {
            expect(getMonth("2022-01-01")).toBe("janvier");
        });

        // Test 2 : Check july month
        it("should return 'juillet' for '2022-07-08' as date", () => {
            expect(getMonth("2022-07-08")).toBe("juillet");
        });

        // Test 3 : If invalide date return "Date invalide"
        it("should return 'Date invalide' for an invalid date", () => {
            expect(getMonth("invalid-date")).toBe("Date invalide");
        });

        // Test 4 : Checking if object Date functionning
        it("should return 'mars' for a Date object (March 15, 2023)", () => {
            expect(getMonth(new Date(2023, 2, 15))).toBe("mars");
            // Month 2 = mars 
        });

        // Test 5 : Empty string return "Date invalide"
        it("should return 'Date invalide' for an empty string", () => {
            expect(getMonth("")).toBe("Date invalide");
        });

        // Test 6 : If null return "Date invalide"
        it("should return 'Date invalide' for a null value", () => {
            expect(getMonth(null)).toBe("Date invalide");
        });

        // Test 7 : If undefined return "Date invalide"
        it("should return 'Date invalide' for an undefined value", () => {
            expect(getMonth(undefined)).toBe("Date invalide");
        });

    });
});



