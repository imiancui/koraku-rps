import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 390, "height": 844})
        await page.goto("http://127.0.0.1:4173/?debug#home")
        await page.wait_for_load_state("networkidle")
        await asyncio.sleep(0.3)
        
        await page.evaluate('''() => {
            const dbg = window.__KORAKU_DEBUG__;
            dbg.store.state.profile.level = 10;
            dbg.store.state.profile.maxStage = 4;
            dbg.view.startStage(4);
            // Simulate 6 damage/recovery log events
            dbg.view.addDamageLogEntry({ target: "enemy", targetId: "left", targetName: "白金小樂・左", amount: 400, source: "rps_win", round: 1, actionType: "attack" });
            dbg.view.addDamageLogEntry({ target: "player", targetName: "旅人", amount: 200, source: "enemy_attack", round: 1, actionType: "damaged" });
            dbg.view.addDamageLogEntry({ target: "player", targetName: "旅人", amount: 50, source: "heal_hp", round: 2, actionType: "heal", resource: "hp" });
            dbg.view.addDamageLogEntry({ target: "player", targetName: "旅人", amount: 15, source: "regen_mp", round: 2, actionType: "mana", resource: "mp" });
            dbg.view.addDamageLogEntry({ target: "enemy", targetId: "right", targetName: "白金小樂・右", amount: 600, source: "burst", round: 3, actionType: "attack" });
            dbg.view.addDamageLogEntry({ target: "enemy", targetId: "right", targetName: "白金小樂・右", amount: 30, source: "burn", round: 3, actionType: "burn" });
        }''')
        await asyncio.sleep(0.3)
        
        # Tier 1 (Default - collapsed, only latest entry)
        await page.screenshot(path="scratch/populated_tier1.png")
        print("Captured scratch/populated_tier1.png")
        
        # Click to toggle to Tier 2 (5 entries)
        await page.click('#battle-damage-log')
        await asyncio.sleep(0.3)
        await page.screenshot(path="scratch/populated_tier2.png")
        print("Captured scratch/populated_tier2.png")
        
        # Click to toggle to Tier 3 (100 entries capacity with scroll)
        await page.click('#battle-damage-log')
        await asyncio.sleep(0.3)
        await page.screenshot(path="scratch/populated_tier3.png")
        print("Captured scratch/populated_tier3.png")
        
        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
