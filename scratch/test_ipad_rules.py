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
        
        # Add test CSS for tablet portrait
        await page.add_style_tag(content='''
            @media (min-width: 601px) and (max-width: 1024px) and (orientation: portrait) {
              .chapter-tag {
                top: 14px !important;
                left: 18px !important;
              }

              .battle-exit {
                top: 14px !important;
                right: 18px !important;
                z-index: 35 !important;
              }

              .enemy-hud {
                top: 54px !important;
                left: 50% !important;
                width: min(94vw, 760px) !important;
                transform: translateX(-50%) !important;
              }

              .dual-enemy-row {
                display: grid !important;
                grid-template-columns: 1fr 1fr !important;
                gap: 10px !important;
                width: 100% !important;
              }

              .dual-enemy-card {
                min-width: 0 !important;
                padding: 6px 12px !important;
              }

              .dual-enemy-card .hud-name b {
                font-size: 15px !important;
              }

              .dual-enemy-card .hud-atk-badge b {
                font-size: 12px !important;
              }

              .round-oracle {
                top: 140px !important;
                left: 50% !important;
                width: min(72vw, 420px) !important;
                transform: translateX(-50%) !important;
                padding: 8px 16px 10px !important;
              }

              .battle-damage-log {
                top: 140px !important;
                right: 18px !important;
                z-index: 35 !important;
              }

              .battle-character-wrap {
                left: 50% !important;
                top: clamp(210px, 20vh, 250px) !important;
                bottom: auto !important;
                width: min(72vw, 560px) !important;
                height: clamp(280px, 32vh, 380px) !important;
                transform: translateX(-50%) !important;
              }

              .battle-character-wrap.is-dual-stage {
                left: 50% !important;
                top: clamp(210px, 20vh, 250px) !important;
                bottom: auto !important;
                width: min(92vw, 740px) !important;
                height: clamp(280px, 32vh, 380px) !important;
                transform: translateX(-50%) !important;
              }

              .battle-character-wrap .character-single-slot img,
              .battle-character-wrap.is-dual-stage .character-dual-slot img {
                width: 100% !important;
                height: 100% !important;
                object-fit: contain !important;
                object-position: center top !important;
              }

              .battle-left-cluster {
                left: 50% !important;
                transform: translateX(-50%) !important;
                bottom: clamp(96px, 10.5vh, 120px) !important;
                width: min(88vw, 420px) !important;
                z-index: 25 !important;
                gap: 8px !important;
              }

              .hand-button {
                min-height: 44px !important;
                font-size: 15px !important;
              }

              .avg-dialogue {
                bottom: 12px !important;
                left: 50% !important;
                transform: translateX(-50%) !important;
                width: min(calc(100% - 36px), 760px) !important;
                min-height: 76px !important;
              }
            }
        ''')
        await asyncio.sleep(0.3)
        await page.screenshot(path="scratch/ipad_stage4_refined.png")
        print("Captured scratch/ipad_stage4_refined.png")

        # Also test Stage 1 (Single Boss) on iPad Air Portrait
        await page.evaluate('''() => {
            const dbg = window.__KORAKU_DEBUG__;
            dbg.view.startStage(1);
        }''')
        await asyncio.sleep(0.3)
        await page.screenshot(path="scratch/ipad_stage1_refined.png")
        print("Captured scratch/ipad_stage1_refined.png")

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
