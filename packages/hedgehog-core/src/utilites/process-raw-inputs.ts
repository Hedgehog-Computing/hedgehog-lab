/**
 * Processes the raw string inputs using `String.raw()`.
 *
 * @example
 * // called as a normal function
 * processRawInputs('Results:\\n' + res);
 *
 * @example
 * // called as a tag function
 * processRawInputs`Results:\n${res}`
 *
 * @param tmpl template call site object or anything
 * @param vals substituion values
 *
 * @returns the generated string when the first argument is a
 *    template call site object(i.e. contains a `.raw` property),
 *    otherwise returns the first argument as is.
 */
export default function processRawInputs(
  tmpl?: TemplateStringsArray | any,
  ...vals: any[]
): string | any {
  return tmpl?.raw ? String.raw(tmpl, ...vals) : tmpl;
}
