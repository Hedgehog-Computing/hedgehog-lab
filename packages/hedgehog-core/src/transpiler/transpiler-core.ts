import preprocessor from './preprocessor';
import operatorOverload from './operator-overload';
import { CodeSnippet, CodeSnippetType } from './CodeSnippetObject';

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

  //register @babel/plugin-proposal-class-properties
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const babelPluginProposalClassProperties = require('@babel/plugin-proposal-class-properties');
  babel.registerPlugin(
    '@babel/plugin-proposal-class-properties',
    babelPluginProposalClassProperties
  );

  const bablePluginProposalPrivateMethods = require('@babel/plugin-proposal-private-methods');
  babel.registerPlugin(
    '@babel/plugin-proposal-private-methods',
    bablePluginProposalPrivateMethods
  )

  // register and add @babel/plugin-proposal-class-properties

  //the real compiling function
  let result = '';
  // We will read the code snippet object list
  // use the babel to transpile the HHS code to JS code.
  // and keep the JS code as is.
  // All the results above will be combined into one string
  // and returned.
  const preprocessed_code = await preprocessor(source);
  for (const codeSnippet of preprocessed_code) {
    if (codeSnippet.type === CodeSnippetType.js) {
      result += codeSnippet.code;
    } else if (codeSnippet.type === CodeSnippetType.hhs) {
      const transpiled = babel.transform(
        codeSnippet.code, // the code
        {
          plugins: ['overload', ['@babel/plugin-proposal-class-properties', {"loose":true}], 
          ['@babel/plugin-proposal-private-methods',{"loose":true}]],
          presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
          filename: 'source.tsx',
          sourceType: 'script'
        }
      );
      result += transpiled.code;
    }
  }

  //return the code
  return result;
}

export default transpilerCore;
