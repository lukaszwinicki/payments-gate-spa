export function getMissingFields<T extends Record<string, any>>(
    fields: Record<string, T[keyof T]>
): string[] {
    return Object.entries(fields)
        .filter(([, value]) => !value)
        .map(([label]) => label)
}
