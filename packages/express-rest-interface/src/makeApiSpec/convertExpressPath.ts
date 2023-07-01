// Converts an express-style path to an OpenAPI style path.
// Example:
//   - express path: /:ownerId/simpleItems
//   - OpenAPI path: /{ownerId}/simpleItems
export default function convertExpressPath(expressPath: string): string {
    return expressPath.replace(/:(\w+)/g, "{$1}");
}
