import preprocess from './preprocess';
import operatorOverload from './operator-overload';

function transpilerCore(source) {
  //todo: move the registration of plugins and presets to the constructor
  const babel = require('@babel/standalone');

  //register the overload plugin
  babel.registerPlugin('overload', operatorOverload);

  //register preset-env
  babel.registerPreset('@babel/preset-env', require('@babel/preset-env'));

  //register typescript preset
  babel.registerPreset(
    '@babel/preset-typescript',
    require('@babel/preset-typescript')
  );

  //register flow
  babel.registerPreset('@babel/preset-flow', require('@babel/preset-flow'));

  //the real compiling function
  const transpiled = babel.transform(
    preprocess(source), // the code
    {
      plugins: ['overload'],
      presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
        '@babel/preset-flow',
      ],
      filename: 'temp.js',
      sourceType: 'script',
    }
  );

  //return the code
  console.log('The output of transpiler core is: \n' + transpiled.code);
  return transpiled.code;
}

export default transpilerCore;
