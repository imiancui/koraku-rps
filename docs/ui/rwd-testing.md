# RWD Testing

Scope: Koraku RPS only. Stage A tooling, Stage B local repair evidence, the explicitly approved seventh-round Chromium visual baseline and the authorized Firefox/WebKit capability preflight are recorded here. AGENTS.md edits, task4.7, CI and publishing remain outside the completed scope.

## Commands and side effects

Run from New-game-project-4. All browser runs use task-owned, random loopback ports and fresh contexts. They read the existing index/CSS/bundle without building them. Outputs go to a fresh koraku-rwd-* directory under the OS temporary directory, printed at completion; older evidence is never replaced.

| Command | Actual scope |
| --- | --- |
| npm run test:rwd:stage-a | 77 required Stage A cases, Chromium only |
| npm run test:rwd:calibrate | 45 synthetic fixtures and 8 real-application injection/restoration probes |
| npm run test:rwd:states | 12 real game/overlay state-readiness cases at1440x900; not layout or complete input acceptance |
| npm run test:rwd:smoke | 30 core cases across5 viewports: navigation, save end, ordinary battle controls, dual battle QTE and dojo single/dual |
| npm run test:rwd:tooling | 7 error-collection/isolation/negative-state/coverage/baseline safety cases, including bounded visual-tolerance geometry controls |
| npm run test:rwd:stage-b-before | 140 Stage B cases:79 executable protection/repair cases plus61 candidate-generation cases |
| npm run test:rwd:candidates | Generate61 new candidates only; never approves or updates golden |
| npm run test:rwd:accept-baseline -- --source=<candidate-run> --approval=explicit-user-approval | After explicit human approval, validate and import an exact61-case candidate run, record hashes and update the approved manifest |
| npm run test:rwd:visual | Compare61 approved Chromium golden images; normal config cannot update snapshots |
| npm run test:rwd:full | Execute the independently frozen2,286-case union across Chromium/Firefox/WebKit; preflight fails before execution if a required browser is missing |
| npm run test:rwd:full -- --list | Discover and compare all29 engine/scope subruns without launching browser tests; result is NOT_RUN, never Full PASS |
| npm run test:rwd:repeat | Preflight, then run Chromium core Smoke3 and complete Full2 with zero retry and separately retained evidence |
| npm run test:rwd:repeat -- --list | Validate the Smoke3/Full2 plan and complete Full discovery without executing tests |
| npm run test:rwd:stage-a -- --list | Discovery only. Exit0 validates the list; coverage.json sets listOnly:true and test status not-run |
| npm run report:rwd -- <printed-output>/report | Open the native Playwright report |

The core Smoke viewports are360x800,390x844,768x1024,1440x900,1920x1080. The first three use browser touch-capability emulation and actual tap/swipe helpers; desktop samples use mouse/keyboard. The separate `test:rwd:smoke-stage-a` command remains the old five-case primary-navigation sample.

Do not run npm test/dev/start/build as a read-only probe: the existing bundle test and server build bundle.js. No game build or version change was performed for Stage A. The original22 Node test files are unchanged.

## Scope, discovery and safety

- [manifest.json](../../e2e/rwd/manifest.json) is the independent expected-case catalog. Stage B, core/complement Smoke, boundary, sweep, content/input/animation stress and the61-case Chromium visual lane are executable. Full/repeat orchestration is implemented with2,286 unique composite IDs across29 subruns: Chromium808, Firefox739 and WebKit739. Discovery is2,286/2,286; execution remains NOT_RUN while Firefox/WebKit are absent.
- The coverage reporter compares required IDs, discovered IDs and actual results. Missing/duplicate/unknown cases, empty selection, skipped cases, retries and failures cannot produce a successful executed scope.
- Browser specs use *.spec.js under e2e/rwd; Node's existing default discovery does not load them. Do not rename them to *.test.js or put them in test/.
- Normal config uses forbidOnly:true, retries:0 and updateSnapshots:none. Negative tests prove missing expected images fail on two runs without changing a sentinel baseline directory.
- The approved61-image Chromium baseline lives under `e2e/rwd/baselines/chromium`; [approved.json](../../e2e/rwd/baselines/approved.json) records explicit approval, source evidence, environment and SHA-256 per case. Normal config remains `updateSnapshots:none`.
- No browser is downloaded automatically. Stage A uses the installed Chromium matching Playwright1.62.1; missing binaries fail explicitly.
- Full preflight records executable paths and exits nonzero before running any case when Firefox/WebKit are missing. `--list` may validate discovery without binaries, but always reports tests NOT_RUN and `fullRwdAcceptance:false`.
- Playwright exposes trusted touchscreen tap but not cross-engine swipe. Chromium retains trusted CDP touch drag; Firefox/WebKit use the [documented manual legacy `TouchEvent` approach](https://playwright.dev/docs/touch-events) and record `trusted:false`. These events may exercise the app's swipe handlers, but a native content-pan case still has to change `scrollTop`; otherwise Full reports FAIL/NOT_RUN rather than manufacturing scroll.
- Firefox1538 and WebKit2336 were explicitly authorized, downloaded with Node system CA validation and launched as Firefox153.0/WebKit26.5. Three-engine fixture calibration is45/45 each. Their QTE pointer/touch/keyboard small-set cases pass, but native touch-pan cannot be generated by Playwright's public cross-engine API; see the OpenSpec evidence decision instead of treating a wheel fallback as touch.
- The test server serves only application asset routes and verifies resolved paths under the project. It does not serve agent junctions or sibling files.

## Detector calibration

The same [layout-audit.js](../../e2e/rwd/layout-audit.js) runs on synthetic fixtures and the real app.

| Family | Positive/negative/boundary evidence | Real-app probe |
| --- | --- | --- |
| Overflow | normal, excess80px,1px tolerance,2px failure, legal local scroll | root width injection/restoration |
| Clipping | four edges, clipped ancestor, tolerance, fixed escape and transformed fixed containing block | primary menu clipped by its ancestor |
| Presence | missing, hidden, hidden ancestor, expected hidden, disabled, ambiguous selector | remove and restore the actual menu control |
| Occlusion | child hit, header/footer blocking, non-interactive decoration, edge-only block | temporary blocking layer over the real control |
| Text | normal, horizontal/vertical crop, ellipsis, visible overflow, opened full-text disclosure | temporarily crop the real menu label |
| Target dimensions | normal, exact40px, below threshold and tolerance boundaries | shrink a known large control; not a blanket40px compliance claim |
| Overlay/scroll | contained/offscreen overlay, real scroll to final action, forbidden hidden scrolling | translate and restore the real save card |
| Exclusive groups | one/two/zero visible groups | show and restore the real alternate hand group |

Element clipping uses the browser's rectangular IntersectionObserver geometry; see [intersectionRect](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/intersectionRect). It does not establish painted character geometry or full pixel visibility. Hit testing uses center and four edge samples, not every pixel. Text checks currently target normal-flow labels and calibrated clipping/truncation; rotated/nonrectangular text or unusual positioned-escape cases need their own calibration before acceptance use. No calibration proves detection of every possible defect.

The minimum-size fixtures are synthetic thresholds. The game's40px versus30–32px requirements still need a product decision; there is no undersized-control allowlist.

## Real application states and reproducibility

- Existing debug entry points establish progression or genuine QTE systems, not fake UI. Other state transitions use actual buttons/radios; home Smoke uses the non-debug application.
- State contracts check the real screen, battle phase, enemy count, player dual-hand setting, QTE mode/sequence length, relevant DOM groups and overlay visibility.
- Maximum battle sequence7 and actual pure-dojo sequence5 remain distinct.
- Fonts and present image sources are awaited. Game time is frozen for readiness/probes after load, randomness is seeded, and metadata records this. These cases do not certify real-time animation behavior.
- Probe measurements wait for finite target/ancestor CSS transitions to finish; infinite decorations continue. Temporary changes are restored, storage is compared, and mutation/restoration failures are retained together.
- Browser/version, OS, Node, DPR, viewport, locale, actual touch capabilities, source hashes and state are attached. All evidence is browser-emulated, not real-device.

## Errors and reports

Console/page errors, unhandled rejection, failed requests and HTTP failures block ordinary cases. Warnings remain in every relevant evidence attachment and require review; they are not silently removed.

The monitored normal contexts emitted112 warnings in the final Stage A run, all the same AudioContext-before-user-gesture browser advisory. No unexpected application errors were recorded. The error-collection negative control intentionally injects errors in a separate disposable context and proves they are captured and rejected; those expected errors are not an app pass.

The final61-case visual run emitted244 instances of the same AudioContext advisory and zero blocking console/page/resource events. This is retained evidence, not a warning allowlist for unrelated messages.

Each run produces native HTML/JSON plus coverage.json, discovery.json and individually readable attachment files. Discovery-only reports are not test execution. Temporary candidate outputs are not baselines unless explicitly imported into the approved baseline manifest.

Concurrent Git note: an external workspace backup process created commit `956b0cb7edb48fbd6f10406327b3d316e2c578a7` during the cross-engine preflight. This agent did not invoke commit. The tested bundle/responsive/golden hashes remained unchanged; the commit is not treated as task-authorized release or publication.

Full/repeat preflight and discovery evidence (2026-09-02): final-worktree Full preflight exit1 at `C:/Users/Administrator/AppData/Local/Temp/koraku-rwd-full-PP6LKy`; Full discovery2,286/2,286 at `C:/Users/Administrator/AppData/Local/Temp/koraku-rwd-full-P1DRkG`; repeat discovery plan Smoke3/Full2/zero-retry at `C:/Users/Administrator/AppData/Local/Temp/koraku-rwd-repeat-pZDPUR`. New Chromium scope checks passed fixture45/45, probe8/8, Stage B protection79/79 and core Smoke30/30 at `koraku-rwd-61UWup`, `koraku-rwd-WIJsEA`, `koraku-rwd-FLm0Hd`, `koraku-rwd-t5KKsN`; post-fallback stress-input14/14 passed at `koraku-rwd-RbrWpO`. Final-worktree tooling7/7 and visual61/61 passed at `koraku-rwd-erwLvs` and `koraku-rwd-6FwxQE`.

Final Repeat and Full2 evidence (2026-09-02): completed via `npm run test:rwd:repeat` with zero retries. Repeat summary at `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-repeat-7mE7Sl` (`repeat-summary.json`, status `passed`, `fullRwdAcceptance:true`, `issues:[]`). Smoke core 3/3 passed at `koraku-rwd-eUWWds`, `koraku-rwd-tn7VYn`, `koraku-rwd-7fuuMm` (30/30 each). Full 2/2 passed at `koraku-rwd-full-8R3Qmx` and `koraku-rwd-full-l6Xk3z` (2,286/2,286 across 29 subruns each, 0 issues, code 0).

Final Stage A evidence: C:/Users/Administrator/AppData/Local/Temp/koraku-rwd-4EMSq5. Result77/77, exit0, no coverage gaps, one source-hash set. Explicit state expectations in the independent manifest are checked separately from the helper registry. Detailed chronology and limitations: [stage-a-progress.md](../../../openspec/changes/koraku-rwd-contract-regression-gate/stage-a-progress.md).

## Approved visual baseline

The user explicitly approved the seventh post-repair61-case set from `C:/Users/Administrator/AppData/Local/Temp/koraku-rwd-GS0OAR`. The baseline importer validates candidate coverage, case contracts, dimensions, source consistency and project ownership before replacing the61 Chromium images; it records both previous and current hashes. `npm run test:rwd:visual` cannot update snapshots. The default calibrated bound remains `maxDiffPixels:1400`; three post-import runs found stable text-raster differences of1606 pixels for390x844 stages-end and2794 pixels for1440x900 shop-end with no visible geometry movement, so only those cases use bounded1700/3000 overrides. A missing golden was tested twice: both runs failed nonzero, no snapshot was created, and the restored SHA-256 matched. The bounded overrides now also have a maintained negative control: unchanged states pass2/2, while moving every visible stage/shop card12 CSS px produces16031/19748 changed pixels and both child comparisons fail; tooling remains7/7 at `C:/Users/Administrator/AppData/Local/Temp/koraku-rwd-0J6dxl`. The post-cleanup normal visual lane passed61/61 at `C:/Users/Administrator/AppData/Local/Temp/koraku-rwd-tqHjfV`.

## Remaining acceptance and limitations

The same-source cross-engine repeat suite is fully Green: Smoke3 (30/30 x 3), Full2 (2,286/2,286 x 2 across 29 subruns: Chromium 808, Firefox 739, WebKit 739), 0 retries, 0 issues, `fullRwdAcceptance:true`. The split evidence contract is documented and enforced:
- Chromium retains trusted native touch-pan.
- Firefox/WebKit use touch-capable layouts + real wheel for content end reachability, marked `nativeTouchPan:false`.
- Firefox/WebKit manual pointer/touch dispatches test only Koraku's game swipe handlers, marked `trusted:false`.
- WebKit is desktop browser emulation, NOT physical Safari/iPad evidence.
- Physical devices, software keyboards, hardware safe areas, browser zoom, OS font scaling, unresolved zoom/touch-target product decisions, task 4.7 and final release verification remain unverified / pending human decision. Production source, bundle, version, cache query, AGENTS.md, push, and deployment remain strictly unexecuted.
