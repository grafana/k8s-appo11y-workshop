import { browser } from 'k6/browser';
import { check } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';

export const options = {
    scenarios: {
      ui: {
        executor: 'shared-iterations',
        options: {
          browser: {
            type: 'chromium',
          },
        },
      },
    },
    thresholds: {
      checks: ['rate==1.0'],
    },
  };

export default async function () {
    const page = await browser.newPage();

    try {
        // Navigate to Grafana login page
        await page.goto('https://grafana-enterprise.zez.duckdns.org/login',{ waitUntil: 'networkidle' });
        await page.screenshot({ path: 'screenshots/loginpage.png' });

        // Click on the OIDC login button
        const loginbutton = page.locator('a[href="login/generic_oauth"]');
        await loginbutton.click(); 

        // Wait for the OIDC provider login page to load
        await page.waitForSelector('input[name="username"]');
        await page.screenshot({ path: 'screenshots/keycloak.png' });

        // Fill in the OIDC login form
        await page.fill('input[name="username"]', 'backowner');
        await page.fill('input[name="password"]', 'passwords');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(3000);
        await check(page.locator('h1'), {
            'welcome-msg': async lo => await lo.textContent() == 'Welcome to Grafana'
        });
        await page.screenshot({ path: 'screenshots/grafana.png' });
    } finally {
        // Close the browser
        await page.close();
    }
}