import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        
        # 1. iPad Landscape (1194 x 768 inner window)
        page_land = await browser.new_page(viewport={"width": 1194, "height": 768})
        await page_land.goto("http://127.0.0.1:4173/#battle")
        await page_land.wait_for_load_state("networkidle")
        await asyncio.sleep(0.5)
        await page_land.screenshot(path="scratch/ipad_landscape_battle.png")
        print("Captured scratch/ipad_landscape_battle.png")

        # 2. iPad Portrait (834 x 1120 inner window)
        page_port = await browser.new_page(viewport={"width": 834, "height": 1120})
        await page_port.goto("http://127.0.0.1:4173/#battle")
        await page_port.wait_for_load_state("networkidle")
        await asyncio.sleep(0.5)
        await page_port.screenshot(path="scratch/ipad_portrait_battle.png")
        print("Captured scratch/ipad_portrait_battle.png")

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
