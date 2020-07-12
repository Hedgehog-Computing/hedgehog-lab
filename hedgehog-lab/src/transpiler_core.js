import preprocess from './transpiler_preprocess';


/*
Credits: the babel plugin of operator overload is originally developed 
by Benjamin Fox at:

https://github.com/foxbenjaminfox/babel-plugin-overload
*/
function operator_overload_raw_function(_ref) {
    var t = _ref.types;
  
    return {
      visitor: {
        BinaryExpression: function BinaryExpression(path) {
          if (path.node.hasOwnProperty('_fromTemplate')) return;
  
          var func = invokedTemplate(path.node.operator)({
            LEFT_ARG: path.scope.generateUidIdentifier("left"),
            RIGHT_ARG: path.scope.generateUidIdentifier("right")
          }).expression;
  
          path.replaceWith(t.callExpression(func, [path.node.left, path.node.right]));
        }
      }
    };
  };
  
  var _babelTemplate = require('babel-template');
  
  var _babelTemplate2 = _interopRequireDefault(_babelTemplate);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function invokedTemplate(op) {
    console.log("this is op") 
    console.log(op)
    return (0, _babelTemplate2.default)('\n      (function (LEFT_ARG, RIGHT_ARG) { \n        if (LEFT_ARG !== null && LEFT_ARG !== undefined\n             && LEFT_ARG[Symbol.for("' + op + '")])\n            return (LEFT_ARG[Symbol.for("' + op + '")](RIGHT_ARG))\n      else if (RIGHT_ARG instanceof Sym) return (sym(LEFT_ARG)[Symbol.for("' + op + '")](RIGHT_ARG))\n       else if ( LEFT_ARG instanceof Array && (RIGHT_ARG instanceof Mat)) return (mat(LEFT_ARG)[Symbol.for("' + op + '")](RIGHT_ARG)) \n          else if ( typeof LEFT_ARG === \'number\' && (RIGHT_ARG instanceof Mat)) return (scalar(LEFT_ARG)[Symbol.for("' + op + '")](RIGHT_ARG)) \n          else return LEFT_ARG ' + op + ' RIGHT_ARG\n      })\n  ');
  }


function transpiler_core(your_code:string):string{
    //todo: move the registration of plugins and presets to the constructor
    var babel = require('@babel/standalone');

    //register the overload plugin
    babel.registerPlugin(
        "overload", operator_overload_raw_function
    )

    //register preset-env
    babel.registerPreset(
        '@babel/preset-env', require('@babel/preset-env')
    )

    //register typescript preset
    babel.registerPreset(
        '@babel/preset-typescript', require('@babel/preset-typescript')
    )

    //register flow
    babel.registerPreset(
      '@babel/preset-flow', require('@babel/preset-flow')
    )

    //the real compiling function

    var output_vanilla_js_string = babel.transform(
      preprocess(your_code),   // the code
        {
            plugins:['overload'],
            presets: ["@babel/preset-env", '@babel/preset-typescript', '@babel/preset-flow'],
            filename: "temp.js",
            sourceType: "script"
        }
    )

    //return the code
    console.log("The output of transpiler core is: \n" + output_vanilla_js_string.code)
    return output_vanilla_js_string.code;
}

export default transpiler_core;