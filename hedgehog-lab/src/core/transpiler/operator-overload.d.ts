export default function ({
  types: t,
}: {
  types: any;
}): {
  visitor: {
    BinaryExpression(path: any): void;
  };
};
