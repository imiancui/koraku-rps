import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        
        # 1. Stage 4 Dual Enemy Landscape
        page_land = await browser.new_page(viewport={"width": 1194, "height": 768})
        await page_land.goto("http://127.0.0.1:4173/?debug#home")
        await page_land.wait_for_load_state("networkidle")
        await asyncio.sleep(0.3)
        await page_land.evaluate('''() => {
            const dbg = window.__KORAKU_DEBUG__;
            dbg.store.state.profile.level = 10;
            dbg.store.state.profile.maxStage = 4;
            dbg.view.startStage(4);
        }''')
        await asyncio.sleep(0.5)
        await page_land.screenshot(path="scratch/stage4_landscape.png")
        print("Captured scratch/stage4_landscape.png")

        # 2. Stage 4 Dual Enemy Portrait
        page_port = await browser.new_page(viewport={"width": 834, "height": 1120})
        await page_port.goto("http://127.0.0.1:4173/?debug#home")
        await page_port.wait_for_load_state("networkidle")
        await asyncio.sleep(0.3)
        await page_port.evaluate('''() => {
            const dbg = window.__KORAKU_DEBUG__;
            dbg.store.state.profile.level = 10;
            dbg.store.state.profile.maxStage = 4;
            dbg.view.startStage(4);
        }''')
        await asyncio.sleep(0.5)
        await page_port.screenshot(path="scratch/stage4_portrait.png")
        print("Captured scratch/stage4_portrait.png")

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
