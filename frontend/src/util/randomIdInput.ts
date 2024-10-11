export function randomId(name: string): string {
    return `${name}-${Math.random() * 1000000000000}`;
}
