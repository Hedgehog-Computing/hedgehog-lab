export function isPlainObject(item: unknown): item is Record<keyof never, unknown> {
    return (
        item !== null &&
        typeof item === 'object' &&
        // TS thinks `item is possibly null` even though this was our first guard.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        item.constructor === Object
    );
}

export interface DeepmergeOptions {
    clone?: boolean;
}

export default function deepmerge<T>(
    target: T,
    source: unknown,
    options: DeepmergeOptions = {clone: true},
): T {
    const output = options.clone ? {...target} : target;

    if (isPlainObject(target) && isPlainObject(source)) {
        Object.keys(source).forEach((key) => {
            // Avoid prototype pollution
            if (key === '__proto__') {
                return;
            }

            if (isPlainObject(source[key]) && key in target && isPlainObject(target[key])) {
                // Since `output` is a clone of `target` and we have narrowed `target` in this block we can cast to the same type.
                (output as Record<keyof never, unknown>)[key] = deepmerge(target[key], source[key], options);
            } else {
                (output as Record<keyof never, unknown>)[key] = source[key];
            }
        });
    }

    return output;
}
