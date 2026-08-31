import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        
        # 1. Test Settlement Screen Reload Persistence
        page_settle = await browser.new_page(viewport={"width": 820, "height": 1180})
        await page_settle.goto("http://127.0.0.1:4173/?debug#home")
        await page_settle.wait_for_load_state("networkidle")
        await asyncio.sleep(0.3)
        
        # Win stage 1 to enter settlement screen
        await page_settle.evaluate('''() => {
            const dbg = window.__KORAKU_DEBUG__;
            dbg.view.startStage(1);
            // Defeat enemy to trigger victory settlement
            dbg.battle.state.enemies[0].hp = 0;
            dbg.battle.state.enemies[0].alive = false;
            dbg.battle.state.enemyHp = 0;
            dbg.battle.end(true);
        }''')
        # Wait for settlement overlay to appear (1.5s)
        await asyncio.sleep(1.8)
        await page_settle.screenshot(path="scratch/settlement_before_reload.png")
        print("Captured scratch/settlement_before_reload.png")
        
        # Now RELOAD the page
        await page_settle.reload()
        await page_settle.wait_for_load_state("networkidle")
        await asyncio.sleep(0.5)
        await page_settle.screenshot(path="scratch/settlement_after_reload.png")
        print("Captured scratch/settlement_after_reload.png")
        
        # Check if settlement overlay is active
        is_active = await page_settle.evaluate('''() => {
            return document.querySelector("#result-overlay")?.classList.contains("is-active");
        }''')
        print(f"Settlement overlay active after reload: {is_active}")
        assert is_active == True, "Settlement overlay should remain active after reload!"

        # 2. Test iPad Stage 4 Layout (Pure CSS from bundle)
        page_ipad4 = await browser.new_page(viewport={"width": 820, "height": 1180})
        await page_ipad4.goto("http://127.0.0.1:4173/?debug#home")
        await page_ipad4.wait_for_load_state("networkidle")
        await asyncio.sleep(0.3)
        await page_ipad4.evaluate('''() => {
            const dbg = window.__KORAKU_DEBUG__;
            dbg.store.grantExperience(100000);
            dbg.view.startStage(4);
        }''')
        await asyncio.sleep(0.4)
        await page_ipad4.screenshot(path="scratch/ipad_pure_stage4.png")
        print("Captured scratch/ipad_pure_stage4.png")

        # 3. Test iPad Stage 1 Layout (Pure CSS from bundle)
        page_ipad1 = await browser.new_page(viewport={"width": 820, "height": 1180})
        await page_ipad1.goto("http://127.0.0.1:4173/?debug#home")
        await page_ipad1.wait_for_load_state("networkidle")
        await asyncio.sleep(0.3)
        await page_ipad1.evaluate('''() => {
            const dbg = window.__KORAKU_DEBUG__;
            dbg.view.startStage(1);
        }''')
        await asyncio.sleep(0.4)
        await page_ipad1.screenshot(path="scratch/ipad_pure_stage1.png")
        print("Captured scratch/ipad_pure_stage1.png")

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
