/**
 * Credits: the babel plugin of operator overload is originally developed
 *
 * by Benjamin Fox at:
 * https://github.com/foxbenjaminfox/babel-plugin-overload
 */

// @ts-ignore
import template from 'babel-template';
import * as types from '@babel/types';

function invokedTemplate(op: any) {
  return template(`
    (function (LEFT_ARG, RIGHT_ARG) { 
      if (LEFT_ARG !== null && LEFT_ARG !== undefined
        && LEFT_ARG[Symbol.for("${op}")])
        return LEFT_ARG[Symbol.for("${op}")](RIGHT_ARG);
      else if (RIGHT_ARG instanceof Sym)
        return (sym(LEFT_ARG)[Symbol.for("${op}")](RIGHT_ARG));
      else if (Array.isArray(LEFT_ARG) && (RIGHT_ARG instanceof Mat))
        return (mat(LEFT_ARG)[Symbol.for("${op}")](RIGHT_ARG));
      else if ( typeof LEFT_ARG === 'number' && (RIGHT_ARG instanceof Mat))
        return (scalar(LEFT_ARG)[Symbol.for("${op}")](RIGHT_ARG));
      else
        return LEFT_ARG ${op} RIGHT_ARG;
    })
  `);
}

export default function ({ types: t }: { types: typeof types }) {
  return {
    visitor: {
      BinaryExpression(path: any) {
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
