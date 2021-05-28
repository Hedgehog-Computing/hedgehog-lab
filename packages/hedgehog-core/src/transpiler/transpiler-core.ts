import preprocessor from './preprocessor';
import operatorOverload from './operator-overload';

async function transpilerCore(source: string) {
  //todo: move the registration of plugins and presets to the constructor
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const babel = require('@babel/standalone');

  //register the overload plugin
  babel.registerPlugin('overload', operatorOverload);

  //register preset-env
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  babel.registerPreset('@babel/preset-env', require('@babel/preset-env'));

  //register jsx preset
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  babel.registerPreset('@babel/preset-react', require('@babel/preset-react'));

  //register typescript preset
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  babel.registerPreset('@babel/preset-typescript', require('@babel/preset-typescript'));

  //the real compiling function
  const preprocessed_code = await preprocessor(source);
  const transpiled = babel.transform(
    preprocessed_code, // the code
    {
      plugins: ['overload'],
      presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
      filename: 'source.tsx',
      sourceType: 'script',
    }
  );

  //return the code
  console.log('The output of transpiler core is: \n' + transpiled.code);
  return transpiled.code;
}

export default transpilerCore;
