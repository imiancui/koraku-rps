import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        
        # 1. Mobile Home Screen (iPhone 390x844)
        page_home = await browser.new_page(viewport={"width": 390, "height": 844})
        await page_home.goto("http://127.0.0.1:4173/?debug#home")
        await page_home.wait_for_load_state("networkidle")
        await asyncio.sleep(0.4)
        await page_home.screenshot(path="scratch/mobile_home_bubble.png")
        print("Captured scratch/mobile_home_bubble.png")

        # 2. Mobile Stage 4 Battle Screen (Tier 1 collapsed)
        page_battle = await browser.new_page(viewport={"width": 390, "height": 844})
        await page_battle.goto("http://127.0.0.1:4173/?debug#home")
        await page_battle.wait_for_load_state("networkidle")
        await asyncio.sleep(0.3)
        await page_battle.evaluate('''() => {
            const dbg = window.__KORAKU_DEBUG__;
            dbg.store.state.profile.level = 10;
            dbg.store.state.profile.maxStage = 4;
            dbg.store.state.inventory.hpPotion = 10;
            dbg.store.state.inventory.mpPotion = 10;
            dbg.view.startStage(4);
        }''')
        await asyncio.sleep(0.4)
        # Select hand rock
        await page_battle.click('[data-hand="rock"]')
        # Use an HP potion
        await page_battle.click('[data-item="hpPotion"]')
        await asyncio.sleep(0.3)
        await page_battle.screenshot(path="scratch/mobile_battle_tier1.png")
        print("Captured scratch/mobile_battle_tier1.png")

        # Click Battle Log to toggle to Tier 2 (5 entries)
        await page_battle.click('#battle-damage-log')
        await asyncio.sleep(0.3)
        await page_battle.screenshot(path="scratch/mobile_battle_tier2.png")
        print("Captured scratch/mobile_battle_tier2.png")

        # Click Battle Log again to toggle to Tier 3 (15 entries / scrollable)
        await page_battle.click('#battle-damage-log')
        await asyncio.sleep(0.3)
        await page_battle.screenshot(path="scratch/mobile_battle_tier3.png")
        print("Captured scratch/mobile_battle_tier3.png")

        # 3. Mobile Stage 4 Dual QTE Screen
        page_qte = await browser.new_page(viewport={"width": 390, "height": 844}, has_touch=True)
        await page_qte.goto("http://127.0.0.1:4173/?debug#home")
        await page_qte.wait_for_load_state("networkidle")
        await asyncio.sleep(0.3)
        await page_qte.evaluate('''() => {
            const dbg = window.__KORAKU_DEBUG__;
            dbg.store.state.profile.level = 10;
            dbg.store.state.profile.maxStage = 4;
            dbg.view.startStage(4);
            // Trigger Dual QTE directly
            dbg.battle.startDualQte();
        }''')
        await asyncio.sleep(0.4)
        await page_qte.screenshot(path="scratch/mobile_dual_qte.png")
        print("Captured scratch/mobile_dual_qte.png")

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
