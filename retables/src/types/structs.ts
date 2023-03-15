type DotPrefix<T extends string> = T extends '' ? '' : `.${T}`;

export type NestedKeyOf<T> = (
    T extends object
        ? { [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<NestedKeyOf<T[K]>>}` }[Exclude<
              keyof T,
              symbol
          >]
        : ''
) extends infer D
    ? Extract<D, string>
    : never;
