import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'cotecna-stencil-components',
  bundles: [
    { components: ['cotecna-multidropdown', 'cotecna-multidropdown-readable', 'cotecna-multidropdown-editable'] },
    { components: ['cotecna-dialog'] },
    { components: ['cotecna-email-box'] },
    { components: ['cotecna-ocr'] },
    { components: ['cotecna-object-counter'] }
  ],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'dist-custom-elements',
      copy: [
        {
          src: '**/*.{jpg,png,svg}',
          dest: 'dist/components/assets'
        }
      ]
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        {
          src: '**/*.{jpg,png,svg}',
          dest: 'assets'
        }
      ]
    },
  ],
  globalStyle: "src/styles.scss",
  plugins: [
    sass({
      includePaths: ['./node_modules'],
      injectGlobalPaths: ["src/styles.scss"]
    })
  ],
  //Uncomment to debug
  // devServer: {
  //   reloadStrategy: 'pageReload',
  //   port: 3333,
  //   address: 'http://192.168.0.11:3333'
  // }
};
