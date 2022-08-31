/*
  Each code snippet contains a type annotation,
  and the type annotation is used to determine
  the type of the code snippet.

  If the type annotation is js, the code snippet
  will be kept as is, and will be executed as is.

  If the type annotation is hhs, the code snippet
  will be transformed into javascript before executed.
*/

export enum CodeSnippetType {
  js = 1,
  hhs = 2
}

export class CodeSnippet {
  type: CodeSnippetType;
  code: string;
  constructor(type: CodeSnippetType, code: string) {
    this.type = type;
    this.code = code;
  }
}
