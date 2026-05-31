import nextVitals from 'eslint-config-next/core-web-vitals'
import prettier from 'eslint-config-prettier/flat'

const config = [
  {
    ignores: ['.next/**', '.open-next/**', '.wrangler/**', 'node_modules/**'],
  },
  ...nextVitals,
  prettier,
  {
    rules: {
      '@typescript-eslint/ban-ts-ignore': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@next/next/no-img-element': 'off',
    },
  },
]

export default config
