# Cinemov

To get started, run:

```bash
npm run dev
```

## Scripts

The table below provides names and descriptions of the npm scripts available in this project.

Each script is run using `npm run <script-name>`. For example: `npm run dev`.

| Name            | Description                                                                                                                                                                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prepare`       | The [`prepare` life cycle script](https://docs.npmjs.com/cli/v7/using-npm/scripts#life-cycle-scripts) is used to set up Git pre-commit hooks when people install dependencies, eg. using `npm install`. This script should not be run manually. |
| `test`          | Runs tests                                                                                                                                                                                                                                      |
| `dev`           | Runs the Next.js development server.                                                                                                                                                                                                            |
| `build`         | Generates a production build.                                                                                                                                                                                                                   |
| `start`         | Runs the Next.js production server built using `build` script.                                                                                                                                                                                  |
| `lint`          | Runs [ESLint](https://eslint.org/) to catch linting errors in the source code.                                                                                                                                                                  |
| `format`        | Formats all source code in the project.                                                                                                                                                                                                         |
| `format:check`  | Checks the formatting of all code in the project.                                                                                                                                                                                               |
| `deploy:vercel` | Deploy a preview deployment to Vercel                                                                                                                                                                                                           |

## Technologies

The table below gives an overview of the technologies used in this project, as well as places to learn more about them.

| Name            | Links                                                                                                                                                                                                           |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Next.js         | [Website](https://nextjs.org/) - [Docs](https://nextjs.org/docs) - [Learn Next.js](https://nextjs.org/learn) - [GitHub](https://github.com/vercel/next.js) - [Wikipedia](https://en.wikipedia.org/wiki/Next.js) |
| React           | [Website](https://reactjs.org/) - [Docs](https://reactjs.org/docs/getting-started.html) - [GitHub](https://github.com/facebook/react) - [Wikipedia](<https://en.wikipedia.org/wiki/React_(JavaScript_library)>) |
| TypeScript      | [Website](https://www.typescriptlang.org/) - [Docs](https://www.typescriptlang.org/docs/) - [GitHub](https://github.com/microsoft/TypeScript) - [Wikipedia](https://en.wikipedia.org/wiki/TypeScript)           |
| Tailwind CSS    | [Website](https://tailwindcss.com/) - [Docs](https://tailwindcss.com/docs) - [GitHub](https://github.com/tailwindlabs/tailwindcss)                                                                              |
| Framer Motion   | [Website](https://www.framer.com/motion/) - [Docs](https://www.framer.com/docs/) - [GitHub](https://github.com/framer/motion)                                                                                   |
| React Hook Form | [Website](https://react-hook-form.com/) - [Docs](https://react-hook-form.com/get-started) - [GitHub](https://github.com/react-hook-form/react-hook-form)                                                        |
| ESLint          | [Website](https://eslint.org/) - [Configuration](https://eslint.org/docs/user-guide/configuring/) - [Rules](https://eslint.org/docs/rules/) - [GitHub](https://github.com/eslint/eslint)                        |
| Prettier        | [Website](https://prettier.io/) - [Docs](https://prettier.io/docs/en/index.html) - [Options](https://prettier.io/docs/en/options.html) - [GitHub](https://github.com/prettier/prettier)                         |
| Husky           | [Website](https://typicode.github.io/husky/) - [Docs](https://typicode.github.io/husky/) - [GitHub](https://github.com/typicode/husky)                                                                          |
| lint-staged     | [Website](https://github.com/okonet/lint-staged) - [GitHub](https://github.com/okonet/lint-staged)                                                                                                              |
| npm             | [Website](https://www.npmjs.com/) - [Docs](https://docs.npmjs.com/) - [GitHub](https://github.com/npm/cli)                                                                                                      |
| GitHub Actions  | [Website](https://github.com/features/actions) - [Docs](https://docs.github.com/en/actions) - [Workflow syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)                |
| Vercel          | [Website](https://vercel.com/) - [Docs](https://vercel.com/docs) - [CLI Docs](https://vercel.com/docs/cli)                                                                                                      |

<details>
  <summary>Env Settings</summary>
  
```js
NEXT_PUBLIC_GITHUB_SECRET=6bb2835187cf3b57352ea2f059d13d2baf373887
NEXT_PUBLIC_GITHUB_ID=809edc894551fa11465e

NEXT_PUBLIC_GOOGLE_SECRET=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
NEXT_PUBLIC_GOOGLE_ID=570762733570-840o0em9ll3q1jnk7mag4got3g3jaspg.apps.googleusercontent.com
GOOGLE_APPLICATION_CREDENTIALS="./cinemov-compfest-firebase-adminsdk.json"

NEXT_PUBLIC_FIREBASE_APP_ID=1:570762733570:web:a01eceb9fbfee5b96cdf1b
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=570762733570
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=cinemov-compfest.appspot.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=cinemov-compfest
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=cinemov-compfest.firebaseapp.com
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCkSNdFjH5AnnX7QHbJYPDqJOULqyVNU-A

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=Jdnj6llhy8mlXrlhzZ+mP7vS+IMwRSVCBG0Hzz3EnyM=

FIREBASE_ADMIN_CONFIG_type=service_account
FIREBASE_ADMIN_CONFIG_project_id=cinemov-compfest
FIREBASE_ADMIN_CONFIG_private_key_id=e007dffaa055cd1bf19691d4bc5e444dde269c95
FIREBASE_ADMIN_CONFIG_private_key=-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDLWtKnjlsHf3nv\nfXN8+AHaoTb2OX8RiQR4Vd1qZCCqSdksV8S6AFvW3zhcKSu5LmKfK8tCltlEBnVk\nRB9Q7TIhDcUQNpl0mdZtel56ehu1wg4SUH0sihyaHCuyRziZ0RUGRsiWh+K3wU0b\nJl+hhqggThJlsh59vhfZ+tRd/66L5ai89gAi6QfdDHr7Q0BhIAsD8vwxGMt1CSZr\nYOrsiqu0NWBkzspyj5I8Vsk9Hufjp2C3wrbtTNSJOrDC+/FvVhL0nbytC85sePt6\nCTqdEWUjzKRvEQynqtDjy2jsNyKIPpIcxZ0nKZc/f5IqMuBhAvwmAd3iyRHTKqCA\nfUns8My5AgMBAAECggEAAUOcBPqN4mEVYG0irZ066pPT55oA01FmsWQXicy8Coiq\noTAvxTODlX6JhOckwh2Kzub+QTh2w+5PWNybZ18hhncBIGtaeBENLQFm+uCR8XSf\nwI4JLSnPVscxseoxEViR6yNR3NH5fyP/pz3yAOHwOorlIL01ZPURFqz6dAy0qIcs\nkRWeAoOw7C47Ae16uoFR5p/R99VHHGULVFCmd6WPYrkwzg5oHVf2mowqc3Yo9Tjb\nHLy3/F9Nes1QiasqxIDUP17o3BDeRnTlf2vCJ4y1JgIyiynXkOJjLBhW7HPDGlAm\n6V64qGuP4DQdwU9PlTYH+tW6dN1uAKLFpj54r+JioQKBgQD1RRH2CMn7Z5AW8ec6\n0BCtAw++XVMDU10R0uyvKKk693SvelS+AzB5V5hzH9fmEeaS5BuTffNQRR8xcxd+\nmT+BLzepXD7orzvs1ZCS8HXla7Durl/qFFmBK9Wo2kkoQAKpLYuiSHcRqDON6BFA\nhC70bUDjMItbjzEOGclCvuO7qQKBgQDUQFHyomZR/6g29nLh016DXDOMruFDkX6m\npigcbbUHcGxVvAuR1Q3BHVpyRE1dMF/6w+RyCcvXXyUi0LHtEAS6LSnJAH45fe7U\nUTqN8Pa2/lZi6mT0yRLuVGuyD+1+iFlNh53JOnAtAE9L9pgCDn0l5qy7kxhiRHnD\nUL76dLiykQKBgHW5EUXmMgxZSO+6bCHufBKOxZ+5a37NJH7JnpD0E0YaQAd5z/Lj\n1QBo6uNXBWmIbgNTOWkxqvd8NdymQUCijbiT0UOY4xkMAtdKKnpcsDnN1r65M5BG\n9C7ru0GwhCytjJlnIv5hicUP1q7mFGHDEEaBqgNh6YGo2QLLna5LsUMBAoGAUj0t\nw1Z7UNA/LDSnZKqSV1F1Q9BKxfRs30NIDWPQnbZIs5tt3C5x6t5luhqO40moFrCq\nJil3itZ5vBiiqBjpy/1N0GzZe4s465khl/fCkDrR2/e38ESsih25sL+NJNbNy0V9\ntIdpCXayQtukID/e672KNg+ThhfEGhKCPObW3ZECgYEAxie+o3ZNu3Rut+I4r80c\nDK+yEFWWmyY3xnbyqq2YorsQ9GrzpB18LAJWj50Y5sIhZ5D7zDd9VOpUxCwnU1lv\nN1VfhzsxDW0nFd3otX67r+q65HuGxGhQgpydGCwenvAu/4k1TFsIOUliqKFt3b6O\n6qcfWC+j33Tr3jJlra+sTtc=\n-----END PRIVATE KEY-----\n
FIREBASE_ADMIN_CONFIG_client_email=firebase-adminsdk-hjguv@cinemov-compfest.iam.gserviceaccount.com
FIREBASE_ADMIN_CONFIG_client_id=117778003433827725797
FIREBASE_ADMIN_CONFIG_auth_uri=https://accounts.google.com/o/oauth2/auth
FIREBASE_ADMIN_CONFIG_token_uri=https://oauth2.googleapis.com/token
FIREBASE_ADMIN_CONFIG_auth_provider_x509_cert_url=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_ADMIN_CONFIG_client_x509_cert_url=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-hjguv%40cinemov-compfest.iam.gserviceaccount.com

```

</details>
```
