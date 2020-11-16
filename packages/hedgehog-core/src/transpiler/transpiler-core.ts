import preprocessor from './preprocessor';
import operatorOverload from './operator-overload';

async function transpilerCore(source: string) {
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

  //the real compiling function
  let preprocessed_code = await preprocessor(source);
  const transpiled = babel.transform(
    preprocessed_code, // the code
    {
      plugins: ['overload'],
      presets: ['@babel/preset-env', '@babel/preset-typescript'],
      filename: 'temp.js',
      sourceType: 'script',
    }
  );

  //return the code
  console.log('The output of transpiler core is: \n' + transpiled.code);
  return transpiled.code;
}

export default transpilerCore;
