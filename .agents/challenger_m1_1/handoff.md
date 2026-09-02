# Challenger 1 Empirical Challenge Report — Milestone 1

**Verdict**: **REQUEST_CHANGES**

---

## 1. Observation

1. **Kernel Dependency Injection & Factory Parameter Mismatch (`kernelFactory.js:27-28`)**:
   In `src/js/kernel/kernelFactory.js`:
   ```javascript
   22:   const now = options.now || (() => Date.now());
   23:   const random = options.random || (() => Math.random());
   24:   const bus = options.bus || new EventBus();
   25:   const persistence = options.persistence || new Persistence();
   26:   const store = new GameStore(bus, persistence, { now });
   27:   const battle = new BattleSystem(bus, store, { random, now });
   28:   const postBattle = new PostBattleSystem(bus, store, { random, now });
   ```
   Whereas `src/js/systems/BattleSystem.js` constructor is declared as:
   ```javascript
   13: export class BattleSystem {
   14:   constructor(bus, store, random = Math.random, now = Date.now) {
   15:     this.bus = bus;
   16:     this.store = store;
   17:     this.random = random;
   18:     this.now = typeof now === "function" ? now : () => Date.now();
   ```
   And `src/js/systems/PostBattleSystem.js` constructor is declared as:
   ```javascript
   3: export class PostBattleSystem {
   4:   constructor(bus, store, random = Math.random, now = null) {
   5:     this.bus = bus;
   6:     this.store = store;
   7:     this.random = random;
   8:     this.now = typeof now === "function" ? now : ...
   ```
   When `createKernel({ random, now })` or `new LocalGameClient({ random, now })` is invoked:
   - `BattleSystem.random` and `PostBattleSystem.random` receive the object `{ random, now }` as the 3rd argument.
   - `BattleSystem.now` and `PostBattleSystem.now` receive `undefined` as the 4th argument, silently falling back to `Date.now` / `performance.now`.
   - Executing `node .agents/challenger_m1_1/test_kernel_options_probe.mjs` resulted in verbatim unhandled exception:
     ```
     TypeError: this.random is not a function
         at getFilteredHand (file:///D:/game-dev/New-game-project-4/src/js/systems/BattleSystem.js:873:35)
         at BattleSystem.revealHands (file:///D:/game-dev/New-game-project-4/src/js/systems/BattleSystem.js:900:20)
     ```

2. **Injected Clocks & Non-Monotonic Time Travel Stress (`test_clock_timetravel.mjs`)**:
   - Backward time jumps (e.g. clock steps backward from t=100,000 to t=50,000 during battle): `durationSec` correctly resolved to `Math.max(1, ...)` and `dps` remained finite (zero `NaN`, zero division-by-zero).
   - Negative delta timestamps in `PostBattleSystem.getMarkerPosition(now)`: returned valid finite numbers (zero `NaN`).
   - 1,000 fast-forwarded battles executed cleanly with all recent battle DPS values strictly finite.

3. **5,000 Battle Permutations & Arithmetic Invariant Scanner (`test_battle_permutations.mjs`)**:
   - 5,000 simulated battles across stages 1 to 4 with diverse gear DOTs, damage reflect, shield reductions, and Momo touch dodge rates executed with 0 failures.
   - 10,000 watermelon strikes (boundary timestamps, extreme futures, auto-watermelon rounds) executed with 0 `NaN`.
   - 10,000 QTE & Dual-QTE permutations across all 8 directions and synthetic diagonal inputs completed without unhandled exceptions.
   - Recursive scan of all numerical state properties in `GameStore`, `BattleSystem`, and `PostBattleSystem` confirmed zero `NaN` and zero arithmetic corruption.

4. **1,000 Paired Dual Contract Parity (`test_dual_contract_parity.mjs`)**:
   - 1,000 randomized progression operations (`CHEAT_ADD_COINS`, `BUY_ITEM`, `BUY_EQUIPMENT`, `EQUIP_ITEM`, `UNEQUIP_ITEM`, `ALLOCATE_STAT`) yielded 100% exact state snapshot parity between Local and Remote representations.
   - Battle-in-progress lock (`BATTLE_IN_PROGRESS_LOCKED`) and pause policy limits (countdown only, max 3 pauses) verified on both ends.

---

## 2. Logic Chain

1. Requirement R1 and Milestone 1 mandate a pure JS game kernel with dependency injection for time travel and deterministic RNG replay.
2. In `src/js/kernel/kernelFactory.js` (lines 27-28), `BattleSystem` and `PostBattleSystem` are instantiated by passing `{ random, now }` as the 3rd argument.
3. Both `BattleSystem` and `PostBattleSystem` expect positional arguments `(bus, store, random, now)` and do not unpack options objects.
4. Consequently, `this.random` is assigned an Object `{ random, now }` rather than a function, causing immediate runtime crashes (`TypeError: this.random is not a function`) upon battle action execution, while `options.now` is completely ignored.
5. This breaks `LocalGameClient({ random, now })`, headless test setups, and deterministic replay kernels created via `createKernel`.
6. Therefore, the implementation requires a fix before Milestone 1 can be fully approved.

---

## 3. Caveats

- When `BattleSystem` and `PostBattleSystem` are instantiated directly with positional arguments `(bus, store, random, now)`, all systems perform with 100% mathematical integrity (0 NaN across 5,000 battles and 10,000 watermelon/QTE strikes).
- The baseline test suite (`npm test`) did not catch this issue because its tests either instantiated `new BattleSystem(bus, store)` without options or used positional arguments in unit tests rather than testing `createKernel({ random, now })`.

---

## 4. Conclusion

**Verdict: REQUEST_CHANGES**

### Required Fixes:
1. In `src/js/kernel/kernelFactory.js` (lines 27-28), pass `random` and `now` as positional arguments:
   ```javascript
   const battle = new BattleSystem(bus, store, random, now);
   const postBattle = new PostBattleSystem(bus, store, random, now);
   ```
2. In `src/js/systems/BattleSystem.js` and `src/js/systems/PostBattleSystem.js`, make the constructor robust to both positional arguments and options objects:
   ```javascript
   const rng = typeof random === "function" ? random : (random?.random || Math.random);
   const clk = typeof now === "function" ? now : (typeof random === "object" && typeof random?.now === "function" ? random.now : (() => Date.now()));
   ```

---

## 5. Verification Method

To independently reproduce the bug and verify the fix:
1. Run the empirical probe:
   ```powershell
   node .agents/challenger_m1_1/test_kernel_options_probe.mjs
   ```
2. Run the full adversarial stress test suites:
   ```powershell
   node .agents/challenger_m1_1/test_clock_timetravel.mjs
   node .agents/challenger_m1_1/test_battle_permutations.mjs
   node .agents/challenger_m1_1/test_dual_contract_parity.mjs
   ```
3. Run project baseline:
   ```powershell
   npm test
   ```
