import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'cotecna-stencil-components',
  bundles: [
    { components: ['cotecna-multidropdown', 'cotecna-multidropdown-readable', 'cotecna-multidropdown-editable'] },
    { components: ['cotecna-dialog'] }
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
          src: '**/*.{jpg,png}',
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
    },
  ],
  globalStyle: "src/styles.scss",
  plugins: [
    sass({
      includePaths: ['./node_modules'],
      injectGlobalPaths: ["src/styles.scss"]
    })
  ]
};
