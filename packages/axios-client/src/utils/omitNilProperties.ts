import { isArray, isNil, isPlainObject, omitBy } from "lodash";

export function omitNilProperties(value: any): any {
    if (isArray(value)) {
        return value.map((item: any) => omitNilProperties(item));
    } else if (isPlainObject(value)) {
        Object.keys(value).forEach((key) => {
            value[key] = omitNilProperties(value[key]);
        });
        return omitBy(value, isNil);
    }
    return value;
}
