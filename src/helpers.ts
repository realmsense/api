/**
 * Recursively make all properties of an interface optional
 */
export type DeepPartial<T> = {
    // eslint-disable-next-line @typescript-eslint/ban-types
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
}
