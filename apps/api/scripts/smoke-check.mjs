const args = process.argv.slice(2).filter((arg) => arg !== '--');
const baseUrlArg = args[0];
const baseUrl = (baseUrlArg ?? process.env.API_BASE_URL ?? '').replace(/\/$/, '');

if (!baseUrl) {
   console.error(
      'Missing API base URL. Use: pnpm --filter api smoke:deploy -- https://your-api-url'
   );
   process.exit(1);
}

const checks = [
   {
      name: 'health',
      path: '/health',
      expectedStatus: 200,
      validate: async (res) => {
         const body = await res.json();
         return body && body.ok === true;
      }
   },
   {
      name: 'plans',
      path: '/api/plans',
      expectedStatus: 200,
      validate: async (res) => Array.isArray(await res.json())
   },
   {
      name: 'stripe plans',
      path: '/api/stripe/plans',
      expectedStatus: 200,
      validate: async (res) => Array.isArray(await res.json())
   }
];

let hasFailure = false;

for (const check of checks) {
   const url = `${baseUrl}${check.path}`;

   try {
      const response = await fetch(url);

      if (response.status !== check.expectedStatus) {
         hasFailure = true;
         console.error(
            `[FAIL] ${check.name}: expected ${check.expectedStatus}, got ${response.status} (${url})`
         );
         continue;
      }

      const bodyIsValid = await check.validate(response);
      if (!bodyIsValid) {
         hasFailure = true;
         console.error(
            `[FAIL] ${check.name}: response payload did not match expected shape (${url})`
         );
         continue;
      }

      console.log(`[PASS] ${check.name}: ${url}`);
   } catch (error) {
      hasFailure = true;
      console.error(`[FAIL] ${check.name}: request error for ${url}`);
      console.error(error instanceof Error ? error.message : String(error));
   }
}

if (hasFailure) {
   process.exit(1);
}

console.log('Smoke checks passed.');
