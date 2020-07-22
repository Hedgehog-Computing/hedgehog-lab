declare module '*.less' {
  const content: { [key: string]: any };
  export default content;
}

declare module '*.worker.js' {
  const content: any;
  export default content;
}

declare module '*.txt' {
  const content: any;
  export default content;
}
