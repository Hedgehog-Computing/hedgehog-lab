/**
 * Credits: the babel plugin of operator overload is originally developed
 *
 * by Benjamin Fox at:
 * https://github.com/foxbenjaminfox/babel-plugin-overload
 */

import template from 'babel-template';

function invokedTemplate(op) {
  return template(`
    (function (LEFT_ARG, RIGHT_ARG) { 
      if (LEFT_ARG !== null && LEFT_ARG !== undefined
        && LEFT_ARG[Symbol.for("${op}")])
        return LEFT_ARG[Symbol.for("${op}")](RIGHT_ARG);
      else if (RIGHT_ARG instanceof Sym)
        return (sym(LEFT_ARG)[Symbol.for("${op}")](RIGHT_ARG));
      else if ( LEFT_ARG instanceof Array && (RIGHT_ARG instanceof Mat))
        return (mat(LEFT_ARG)[Symbol.for("${op}")](RIGHT_ARG));
      else if ( typeof LEFT_ARG === \'number\' && (RIGHT_ARG instanceof Mat))
        return (scalar(LEFT_ARG)[Symbol.for("${op}")](RIGHT_ARG));
      else
        return LEFT_ARG ${op} RIGHT_ARG;
    })
  `);
}

export default function ({ types: t }) {
  return {
    visitor: {
      BinaryExpression(path) {
        if (path.node.hasOwnProperty('_fromTemplate')) return;

        const func = invokedTemplate(path.node.operator)({
          LEFT_ARG: path.scope.generateUidIdentifier('left'),
          RIGHT_ARG: path.scope.generateUidIdentifier('right'),
        }).expression;

        path.replaceWith(
          t.callExpression(func, [path.node.left, path.node.right])
        );
      },
    },
  };
}
