const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Change this to your local file or hosted URL if needed
  await page.goto('http://localhost:3000/index.html');

  console.log('Running homepage tests...');

  // Check for page title
  const title = await page.title();
  console.assert(title.includes('Katie Duerig'), '❌ Page title missing or incorrect');

  // Check for navigation links
  const links = [
    'Home', 'Computer Science', 'Art', 'Plans', 'Projects', 'Contact'
  ];
  for (let text of links) {
    const linkVisible = await page.locator(`text=${text}`).isVisible();
    console.assert(linkVisible, `❌ Link "${text}" not visible`);
  }

  // Check for intro section
  const intro = await page.locator('h2', { hasText: 'Welcome!' }).isVisible();
  console.assert(intro, '❌ Welcome section not found');

  // Check if at least one image is visible
  const images = await page.locator('img');
  const count = await images.count();
  console.assert(count >= 1, '❌ No images found on the page');

  console.log('✅ All tests completed');

  await browser.close();
})();