import safeJsonStringify from "safe-json-stringify";

export default function fastAndSafeJsonStringify(obj: any) {
    try {
        return JSON.stringify(obj);
    } catch (err) {
        return safeJsonStringify(obj);
    }
}
