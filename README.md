# Who Lived When

This is a fun, brief project to digitize the data once collected on Reddit's `r/dataisbeautiful` [Who Lived When](https://www.reddit.com/r/dataisbeautiful/comments/1ay3vuu/oc_who_lived_when_the_overlapping_lives_of/).
As fun as this is, I cannot take credit for the idea but I enjoy messing around with web development and figured why not
give it a try.

All of this data is currently stored locally `people.ts`, but it's entirely possible this grows and thus require changes.

## Getting Started

Use Node.js 26 and the pnpm 12.16.1 version declared in `package.json`.
Dependencies must be at least 48 hours old. Dependency build scripts remain
restricted; `@swc/core` uses its packaged native binary without running its install script.

### Checks

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm lint
pnpm exec tsc --noEmit
pnpm build
pnpm audit
```

### Development mode

```bash
pnpm install
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Production mode

```bash
pnpm install
pnpm run build
pnpm run start
```

Your app should be up and running on [http://localhost:3000](http://localhost:3000)!


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
