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
            dbg.view.startStage(1);
        }''')
        await asyncio.sleep(0.5)
        # Select hand rock
        await page.click('[data-hand="rock"]')
        # Wait for countdown to finish and result to reveal (approx 5.2s for stage 1)
        await asyncio.sleep(5.3)
        await page.screenshot(path="scratch/reveal_test_stage1.png")
        print("Captured scratch/reveal_test_stage1.png")
        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
