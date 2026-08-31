import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        
        # Test iPad Air Portrait (820x1180)
        page = await browser.new_page(viewport={"width": 820, "height": 1180})
        await page.goto("http://127.0.0.1:4173/?debug#home")
        await page.wait_for_load_state("networkidle")
        await asyncio.sleep(0.3)
        await page.evaluate('''() => {
            const dbg = window.__KORAKU_DEBUG__;
            dbg.store.grantExperience(100000);
            dbg.view.startStage(4);
        }''')
        await asyncio.sleep(0.4)
        await page.screenshot(path="scratch/reproduce_ipad_stage4.png")
        print("Captured scratch/reproduce_ipad_stage4.png")

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
