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
export function processRawInputs(tmpl?: TemplateStringsArray | any, ...vals: any[]): string | any {
  return tmpl?.raw ? String.raw(tmpl, ...vals) : tmpl;
}

/**
 * This function behaves the same as @function processRawInputs(),
 * except that substituion values will be automatically converted
 * into TeX if possible.
 *
 * @example
 * let a = mat([[1,1,4], [5,1,4]]);
 * rawInputsToTex`A = ${a}`; //=> "A = \begin{bmatrix}...\end{bmatrix}"
 *
 * @example
 * rawInputsToTex(a); //=> "\begin{bmatrix}...\end{bmatrix}"
 *
 * @param tmpl template call site object or anything
 * @param vals substituion values
 *
 * @returns
 *    1. the TeX string of the first argument if it contains `.toTex()` method;
 *    2. the generated string if the first argument is a template call site object
 *       (i.e. contains a `.raw` property);
 *    3. otherwise returns the first argument as is.
 */
export function rawInputsToTex(tmpl?: TemplateStringsArray | any, ...vals: any[]): string | any {
  // returns the TeX string of `tmpl` if it contains `.toTex()` method
  if (tmpl?.toTex) {
    return tmpl.toTex();
  }

  // automatically converts substituion values into TeX if possible
  vals = vals.map((v) => v?.toTex?.() ?? v);

  return processRawInputs(tmpl, ...vals);
}
