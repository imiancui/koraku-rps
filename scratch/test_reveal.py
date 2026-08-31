import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1194, "height": 768})
        await page.goto("http://127.0.0.1:4173/?debug#home")
        await page.wait_for_load_state("networkidle")
        await asyncio.sleep(0.3)
        await page.evaluate('''() => {
            const dbg = window.__KORAKU_DEBUG__;
            dbg.store.state.profile.level = 10;
            dbg.store.state.profile.maxStage = 4;
            dbg.view.startStage(4);
        }''')
        await asyncio.sleep(0.5)
        # Select hand rock
        await page.click('[data-hand="rock"]')
        # Wait for countdown to finish and result to reveal (approx 3.2s)
        await asyncio.sleep(3.2)
        await page.screenshot(path="scratch/reveal_test_landscape.png")
        print("Captured scratch/reveal_test_landscape.png")
        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
