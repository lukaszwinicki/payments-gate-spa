export function getMissingFields<T extends Record<string, unknown>>(
    fields: T
): (keyof T)[] {
    return Object.entries(fields)
        .filter(([, value]) => value === null || value === '')
        .map(([key]) => key as keyof T)
}