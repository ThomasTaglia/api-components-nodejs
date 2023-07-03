import { expect } from "chai";
import fastAndSafeJsonStringify from "../../src/utils/fastAndSafeJsonStringify";

describe("fastAndSafeJsonStringify util", () => {
    describe("stringifies any object without throwing", () => {
        it("case: object with circular references", () => {
            const nonThrower = () => {
                const obj: any = {};
                obj.obj = obj;
                fastAndSafeJsonStringify(obj);
            };
            expect(nonThrower).not.to.throw();
        });
    });
});
