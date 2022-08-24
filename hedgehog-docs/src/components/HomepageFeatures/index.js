import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Hedgehog Script',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        A simple, intuitive, and powerful scripting language based on JavaScript, with sweet syntax plugins for scientific computing, matrix operations, and package management.
      </>
    ),
  },
  {
    title: 'Run in Local Browser',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Write code in Hedgehog Script, compile and run it in your local browser - also you can use the Hedgehog Cloud Functions on the cloud server for free if you want.
      </>
    ),
  },
  {
    title: 'No Installation, No Setup',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        You don't need to install a package before using it - just import it as <code>*import package:function</code> to use it. Also you can save and share your function as <code>*import @YOUR_USERNAME/YOUR_FUNCTION_NAME</code>
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
