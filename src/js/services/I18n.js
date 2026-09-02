import {
  HANDS,
  DIRECTIONS,
  STAGES,
  SKILLS,
  ITEMS,
  EQUIPMENT_SLOTS,
  EQUIPMENT_ITEMS,
  GALLERY_ITEMS
} from "../config/gameConfig.js";

export const LOCALES = Object.freeze({
  "zh-Hant": { id: "zh-Hant", label: "繁體中文", code: "zh-TW" },
  "zh-Hans": { id: "zh-Hans", label: "简体中文", code: "zh-CN" },
  "en": { id: "en", label: "English", code: "en-US" },
  "ja": { id: "ja", label: "日本語", code: "ja-JP" }
});

export const LOCALE_ORDER = Object.freeze(["zh-Hant", "zh-Hans", "en", "ja"]);
export const DEFAULT_LOCALE = "en";
export const LOCALE_STORAGE_KEY = "koraku-rps-locale";

export const CHANGELOG_DATA = [
  {
    version: "0.0.21",
    date: "2026-09-03",
    tag: "Battle Mutation Lock UI, Multi-Viewport RWD Verification & Go-Live Runbook",
    changes: {
      "zh-Hant": [
        "【戰鬥中換裝與配點鎖定灰化 UI】依據 battleLockPolicy 政策，在線上對決與離線沙盒中，戰鬥進行期間自動灰化禁用換裝、卸裝、屬性配點與技能升級按鈕（添加 disabled 與 aria-disabled=\"true\"）。",
        "【即時鎖定提示與點擊防護】於能力成長與裝備畫面顯示專屬提示行，點擊鎖定中按鈕立即彈出「戰鬥進行中已鎖定換裝與配點」Toast 通知，戰鬥結算後即時自動恢復。",
        "【RWD 跨視口與動態 Resize 驗證 (RWD-REG-009)】實機通過手機 (375px)、平板 (768px)、桌面 (1280px/1920px) 響應式驗證，包含跨 12 格紙娃娃斷點動態縮放與中英雙語系排版防推擠。",
        "【上線日標準作業程序 (Go-Live Runbook)】完備 VPS 採購後 T-24h 基礎設施、T-2h 容器部署與 T-0h 公網真機簽核清單。"
      ],
      "zh-Hans": [
        "【战斗中换装与配点锁定灰化 UI】依据 battleLockPolicy 政策，在线上对决与离线沙盒中，战斗进行期间自动灰化禁用换装、卸装、属性配点与技能升级按钮（添加 disabled 与 aria-disabled=\"true\"）。",
        "【即时锁定提示与点击防护】于能力成长与装备画面显示专属提示行，点击锁定中按钮立即弹出“战斗进行中已锁定换装与配点”Toast 通知，战斗结算后即时自动恢复。",
        "【RWD 跨视口与动态 Resize 验证 (RWD-REG-009)】实机通过手机 (375px)、平板 (768px)、桌面 (1280px/1920px) 响应式验证，包含跨 12 格纸娃娃断点动态缩放与中英双语系排版防推挤。",
        "【上线日标准作业程序 (Go-Live Runbook)】完备 VPS 采购后 T-24h 基础设施、T-2h 容器部署与 T-0h 公网真机签核清单。"
      ],
      "en": [
        "【In-Battle Mutation Lock UI & Graying】According to battleLockPolicy, equip, unequip, stat allocation, and skill upgrade buttons are automatically disabled and grayed out (with disabled and aria-disabled=\"true\") during active combat.",
        "【Real-time Lock Notice & Click Interception】Displays dedicated lock notice text in Growth and Equipment panels; clicking locked buttons triggers an immediate \"Mutations locked during battle\" Toast alert, recovering automatically post-battle.",
        "【Multi-Viewport RWD & Dynamic Resize Verification (RWD-REG-009)】Verified on mobile (375px), tablet (768px), and desktop (1280px/1920px), ensuring flawless 12-slot paperdoll scaling and non-wrapping multi-language layouts.",
        "【Go-Live Day Runbook】Finalized complete operational runbook covering T-24h infrastructure setup, T-2h container deployment, and T-0h live environment verification."
      ],
      "ja": [
        "【戦闘中装備変更・ステータス割り振りロックUI】battleLockPolicyに基づき、戦闘中は装備の着脱、ステータス強化、スキル習得ボタンを自動的にグレーアウト・無効化（disabledおよびaria-disabled=\"true\"）。",
        "【リアルタイムロック通知＆タップ防止】能力成長および装備画面に専用の警告テキストを表示。ロック中のボタン操作時に「戦闘中は装備変更と能力配分がロックされています」Toastを表示し、戦闘終了時に自動復帰。",
        "【マルチビューポートRWD＆動的リサイズ検証 (RWD-REG-009)】モバイル (375px)、タブレット (768px)、デスクトップ (1280px/1920px) の実機描画を検証。12枠着せ替え欄の動的スケールと多言語レイアウトを保証。",
        "【本番リリース手順書 (Go-Live Runbook)】VPS調達後のT-24hインフラ構築、T-2hコンテナ配備、T-0h実機検証サインオフ手順を整備。"
      ]
    }
  },
  {
    version: "0.0.20",
    date: "2026-09-03",
    tag: "Online Authority Formalization, Real WebSocket E2E & Docker Staging Environment",
    changes: {
      "zh-Hant": [
        "【OpenSpec 線上權威行為規格化】正式建立 koraku-online-authority-formalization 規格變更提案，涵蓋三類裁決模型、單一寫入者保證、暫停次數限制、斷線 10 秒寬限自動結算與作弊指令 Dev 權限審計。",
        "【真實 WebSocket 雙端 E2E 整合測試】補齊真實 KorakuServer 與 RemoteGameClient 連線、出拳、QTE 判定至戰鬥結算全迴路測試，以及雙手出拳（hand2）左右拳槽位映射驗證。",
        "【戰鬥重放 (Replay) 全迴路保存與還原】實作 GameSession 戰鬥軌跡至 JsonStorage 儲存、讀回與 dispatchCommand 確定性重放驗證。",
        "【Docker Staging 演練環境】提供包含 Node.js 伺服器、Caddy (wss 反向代理) 與靜態 Client 的完整 Docker Compose 測試環境，完成缺變數 fail-fast、Origin 阻擋、10s 心跳保活與 20 併發負載煙霧實測。",
        "【可配置戰鬥中鎖定策略 (battleLockPolicy)】支援 always（全時鎖定）、countdown（倒數與結算開放）與 never（不鎖定）伺服器端環境變數配置。"
      ],
      "zh-Hans": [
        "【OpenSpec 线上权威行为规格化】正式建立 koraku-online-authority-formalization 规格变更提案，涵盖三类裁决模型、单一写入者保证、暂停次数限制、断线 10 秒宽限自动结算与作弊指令 Dev 权限审计。",
        "【真实 WebSocket 双端 E2E 集成测试】补齐真实 KorakuServer 与 RemoteGameClient 连线、出拳、QTE 判定至战斗结算全回路测试，以及双手出拳（hand2）左右拳槽位映射验证。",
        "【战斗重放 (Replay) 全回路保存与还原】实现 GameSession 战斗轨迹至 JsonStorage 储存、读回与 dispatchCommand 确定性重放验证。",
        "【Docker Staging 演练环境】提供包含 Node.js 服务器、Caddy (wss 反向代理) 与静态 Client 的完整 Docker Compose 测试环境，完成缺变量 fail-fast、Origin 阻挡、10s 心跳保活与 20 并发负载烟雾实测。",
        "【可配置战斗中锁定策略 (battleLockPolicy)】支持 always（全时锁定）、countdown（倒数与结算开放）与 never（不锁定）服务端环境变量配置。"
      ],
      "en": [
        "【OpenSpec Online Authority Formalization】Formally registered online authority specifications covering the three-class adjudication model, single writer guarantee (4001 kickout), pause limits, 10s disconnect auto-settlement, and cheat dev entitlement audit.",
        "【Real WebSocket Full E2E Integration Suite】Built comprehensive E2E tests using live KorakuServer and RemoteGameClient over real WebSockets, validating battle progression, post-battle ledger appending, and dual-hand slot mapping.",
        "【End-to-End Battle Replay Lifecycle】Implemented complete battle replay recording to JsonStorage, deserialization, and deterministic command replay verification.",
        "【Docker Staging Environment】Added multi-service Docker Compose suite (Server, Caddy wss proxy, static Client), verified with fail-fast env validation, Origin checks, 10s idle ping/pong, and 20-client load smoke test.",
        "【Configurable Battle Lock Policy】Added battleLockPolicy supporting 'always' (default), 'countdown' (open during countdown/settlement), and 'never' via server environment variables."
      ],
      "ja": [
        "【OpenSpec オンライン権威仕様の正式策定】3分類判定モデル、単一ライター保証（4001切断）、一時停止制限、切断10秒猶予自動精算、チートコマンドDev権限監査を正式仕様化。",
        "【実WebSocket双方向E2E統合テスト】実稼働KorakuServerとRemoteGameClientによるWebSocket接続、出拳、QTE判定、戦闘精算、両手出拳スロットマッピングの完全検証テストを構築。",
        "【戦闘リプレイ全工程の保存と再現】GameSessionの対戦ログをJsonStorageへ保存・復元し、dispatchCommandによる確定性リプレイ一致を実証。",
        "【Docker Staging検証環境】Node.jsサーバー、Caddy (wssリバースプロキシ)、静的ClientからなるDocker Compose環境を構築。環境変数検証、Origin遮断、10秒心拍維持、20並行負荷テストを実施。",
        "【戦闘中ロック方針の設定可能化 (battleLockPolicy)】always（常時ロック）、countdown（カウントダウン・精算時開放）、never（非ロック）の環境変数設定に対応。"
      ]
    }
  },
  {
    version: "0.0.19",
    date: "2026-09-02",
    tag: "PRNG Chi-Square Verification, Burst Rate Limiting & Anti-Cheat Audit",
    changes: {
      "zh-Hant": [
        "【確定性偽隨機數 (PRNG) 卡方分佈檢驗】通過卡方擬合優度檢定 (Chi-Square Goodness-of-Fit Test)，驗證剪刀石頭布出拳、摸摸技能與小樂閃避機率統計分佈均勻性與種子隔離性。",
        "【短視窗流量突發限制 (Burst Rate Limiting)】RateLimiter 升級支援 200ms 短週期微突發請求限制，有效防禦高頻腳本與連點外掛。",
        "【跨裝置轉移碼原子互斥保證】TransferManager 實作轉移碼兌換狀態原子鎖定，防止併發重複兌換 (Race Condition)。",
        "【4KB 封包大小上限與嚴格 Schema 白名單】Validator 全面檢驗客戶端入站指令信封，封包超過 4KB 或注入未宣告欄位立即攔截並記錄審計日誌。",
        "【追加專用經濟帳本 (Append-only Ledger)】玩家星砂、經驗值、藥水與裝備異動均寫入不可竄改之經濟帳本，記錄伺服器權威時間戳與來源。"
      ],
      "zh-Hans": [
        "【确定性伪随机数 (PRNG) 卡方分布检验】通过卡方拟合优度检验 (Chi-Square Goodness-of-Fit Test)，验证剪刀石头布出拳、摸摸技能与小乐闪避机率统计分布均匀性与种子隔离性。",
        "【短视窗流量突发限制 (Burst Rate Limiting)】RateLimiter 升级支持 200ms 短周期微突发请求限制，有效防御高频脚本与连点外挂。",
        "【跨装置转移码原子互斥保证】TransferManager 实现转移码兑换状态原子锁定，防止并发重复兑换 (Race Condition)。`",
        "【4KB 封包大小上限与严格 Schema 白名单】Validator 全面检验客户端入站指令信封，封包超过 4KB 或注入未宣告栏位立即拦截并记录审计日志。",
        "【追加专用经济账本 (Append-only Ledger)】玩家星砂、经验值、药水与装备异动均写入不可篡改之经济账本，记录服务器权威时间戳与来源。"
      ],
      "en": [
        "【Deterministic PRNG Chi-Square Statistical Verification】Passed Chi-Square Goodness-of-Fit Tests confirming statistical uniformity and seed isolation across RPS gestures, Momo skill activations, and dodge rates.",
        "【Burst Rate Limiting】Enhanced RateLimiter with 200ms micro-burst window protection to defend against high-frequency automated scripts and autoclickers.",
        "【Cross-Device Transfer Code Mutex Guarantee】Implemented atomic state locks in TransferManager to eliminate concurrent double-claim race conditions.",
        "【4KB Envelope Size Cap & Strict Schema Whitelist】Validator enforces strict field whitelisting and 4KB payload limits on all inbound client commands with security audit logging.",
        "【Append-Only Economic Ledger】Every mutation to star sand, XP, consumables, and equipment instances appends to an immutable audit ledger stamped with authoritative server time."
      ],
      "ja": [
        "【確定性擬似乱数 (PRNG) カイ二乗適合度検定】ジャンケン出拳、なでなでスキル発動、回避率の統計的均一性とシード隔離性をカイ二乗検定により実証。",
        "【バーストトラフィック制限】RateLimiterに200ms短周期マイクロバースト制限を導入し、高速自動スクリプトや連打ツールを防御。",
        "【引き継ぎコードのアトミック排他制御】TransferManagerに引き継ぎ状態の排他ロックを実装し、並行引き換えによる重複利用（Race Condition）を防止。",
        "【4KBパケット上限＆厳格スキーマ検証】Validatorが受信コマンドのスキーマと4KBサイズ上限を厳格審査し、不正パラメータ注入を遮断。",
        "【追記専用経済台帳 (Append-only Ledger)】星砂、経験値、アイテム、装備の全変動を不変の監査台帳に記録し、サーバー権威時刻を刻印。"
      ]
    }
  },
  {
    version: "0.0.18",
    date: "2026-09-02",
    tag: "Online-Ready Architecture, Zero-DOM Kernel Decoupling & Single Writer Guarantee",
    changes: {
      "zh-Hant": [
        "【零 DOM 核心解耦與雙客戶端架構】將戰鬥、摸摸技能、裝備計算與數值核心重構為零 DOM 純邏輯模組，支援 LocalGameClient（離線沙盒）與 RemoteGameClient（線上權威）無縫切換。",
        "【線上權威核心架構 (Authoritative Kernel)】所有戰鬥裁決、傷害計算、時序判定與數值結算皆由伺服器權威核心主導，客戶端僅表達操作意圖。",
        "【單一寫入者保證 (Single Writer Guarantee)】帳號於新裝置連線登入時，舊連線平滑斷開並收到 4001 踢出代碼（NEW_CONNECTION_ESTABLISHED），杜絕多開雙寫衝突。",
        "【三類判定模型與 150ms 時序寬限】QTE/切西瓜時序判定採客戶端主張與伺服器 150ms 寬限審計；出拳手勢採秘密承諾防過期；背包裝備採 cmdId 冪等指令序列化執行。",
        "【匿名裝置 Token 與帳號轉移】透過 HMAC-SHA256 簽發匿名裝置金鑰，支援產生一次性轉移碼進行無痛跨裝置繼承。"
      ],
      "zh-Hans": [
        "【零 DOM 核心解耦与双客户端架构】将战斗、摸摸技能、装备计算与数值核心重构为零 DOM 纯逻辑模块，支持 LocalGameClient（离线沙盒）与 RemoteGameClient（线上权威）无缝切换。",
        "【线上权威核心架构 (Authoritative Kernel)】所有战斗裁决、伤害计算、时序判定与数值结算皆由服务器权威核心主导，客户端仅表达操作意图。",
        "【单一写入者保证 (Single Writer Guarantee)】账号于新装置连线登入时，旧连线平滑断开并收到 4001 踢出代码（NEW_CONNECTION_ESTABLISHED），杜绝多开双写冲突。",
        "【三类判定模型与 150ms 时序宽限】QTE/切西瓜时序判定采客户端主张与服务器 150ms 宽限审计；出拳手势采秘密承诺防过期；背包装备采 cmdId 幂等指令序列化执行。",
        "【匿名装置 Token 与账号转移】透过 HMAC-SHA256 签发匿名装置金钥，支持产生一次性转移码进行无痛跨装置继承。"
      ],
      "en": [
        "【Zero-DOM Kernel Decoupling & Dual-Client Architecture】Refactored combat, Momo skills, equipment math, and stat progression into zero-DOM pure modules, enabling seamless switching between LocalGameClient (offline sandbox) and RemoteGameClient (online authoritative).",
        "【Authoritative Online Kernel】All combat outcomes, damage calculations, and rewards are computed authoritatively on the server; the client strictly sends intent commands.",
        "【Single Writer Guarantee (4001 Kickout)】When an account connects from a new device, active sessions receive a clean 4001 kickout code (NEW_CONNECTION_ESTABLISHED), permanently preventing concurrent write conflicts.",
        "【Three-Class Adjudication & 150ms Grace】Timing claims (QTE/watermelon) audited with 150ms network grace; RPS commitments expire upon round reveal; inventory mutations serialized with idempotent cmdIds.",
        "【Anonymous Device Tokens & Account Transfer】Cryptographic HMAC-SHA256 device tokens with one-time transfer code generation for smooth cross-device account migration."
      ],
      "ja": [
        "【ゼロDOMカーネル分離＆デュアルクライアント構造】戦闘、なでなでスキル、装備計算、ステータス計算をDOM非依存の純粋ロジックへ分離。LocalGameClient（オフライン）とRemoteGameClient（オンライン）を完全統一。",
        "【サーバー権威型ゲームカーネル】勝敗判定、ダメージ計算、報酬付与の全権をサーバーが掌握し、クライアントは操作意図のみを送信。",
        "【単一ライター保証（4001切断）】同一アカウントが新規接続された際、旧セッションを4001コード（NEW_CONNECTION_ESTABLISHED）で円滑に切断し多重ログインを防止。",
        "【3分類判定モデル＆150msネットワーク猶予】QTE・スイカ割り判定は150msの到着猶予で監査。ジャンケン出拳は秘密コミット方式で期限管理。アイテム操作はcmdId冪等キューで順序実行。",
        "【匿名端末トークン＆アカウント引き継ぎ】HMAC-SHA256署名による匿名端末認証とワンタイム引き継ぎコードによる端末間移行に対応。"
      ]
    }
  },
  {
    version: "0.0.17",
    date: "2026-09-02",
    tag: "Battle HUD Drag-and-Drop & Non-Overlapping Spawn Layout",
    changes: {
      "zh-Hant": [
        "【局內四大 HUD 自由拖曳擺放】戰鬥紀錄、回合倒數看板、自動刷關控制條、自動刷關切西瓜累計卡片全面支援滑鼠與觸控自由拖曳擺放。",
        "【無衝突預設生成佈局】重構各介面初始生成座標，自動刷關切西瓜卡片預設停靠於戰鬥紀錄下方，根除生成重疊遮擋問題。",
        "【視窗邊界約束與防誤觸】拖曳範圍嚴格限制於可視區域內（防拖出螢幕），設定 4px 移動門檻防止點擊按鈕誤觸拖曳。",
        "【座標記憶與雙擊重設】自訂座標自動儲存於 localStorage 跨對局持久化保持，雙擊標題列/手柄即可一鍵重設回預設位置。"
      ],
      "zh-Hans": [
        "【局内四大 HUD 自由拖曳摆放】战斗记录、回合倒数看板、自动刷关控制条、自动刷关切西瓜累计卡片全面支持鼠标与触控自由拖曳摆放。",
        "【无冲突默认生成布局】重构各界面初始生成坐标，自动刷关切西瓜卡片默认停靠于战斗记录下方，根除生成重叠遮挡问题。",
        "【视窗边界约束与防误触】拖曳范围严格限制于可视区域内（防拖出屏幕），设定 4px 移动门槛防止点击按钮误触拖曳。",
        "【坐标记忆与双击重设】自定义坐标自动保存于 localStorage 跨对局持久化保持，双击标题栏/手柄即可一键重设回默认位置。"
      ],
      "en": [
        "【Draggable Battle HUD Widgets】Battle Damage Log, Round Oracle, Auto-Battle Bar, and Auto-Watermelon Widget are now freely draggable across desktop and mobile screens.",
        "【Non-Overlapping Default Spawn Layout】Redesigned default spawn coordinates so the floating watermelon widget spawns below the battle damage log, permanently preventing overlaps.",
        "【Viewport Bounds Clamping & Click Guards】Keeps widgets safely within visible screen boundaries and enforces a 4px drag threshold to prevent accidental clicks.",
        "【Position Persistence & Double-Click Reset】Custom positions are saved in localStorage across battles and page reloads; double-clicking any drag handle instantly resets it to default."
      ],
      "ja": [
        "【戦闘HUDの自由ドラッグ配置】戦闘ダメージログ、ラウンド神託、自動周回バー、自動スイカ割りウィジェットがマウスおよびタッチ操作で自由にドラッグ配置可能に。",
        "【非干渉デフォルト生成レイアウト】初期生成座標を刷新し、スイカ割りカードがダメージログの下部に整列生成されることで、重なりによる視認性低下を根絶。",
        "【画面境界クランプ＆誤タップ防止】ウィジェットが画面外に出ないよう安全境界を維持し、4pxの移動しきい値によりボタン操作の誤ドラッグを防止。",
        "【座標永続化＆ダブルクリック初期化】カスタム位置をlocalStorageに保存し対戦を跨いで維持。ヘッダーのダブルクリックで即座に初期位置へ復元可能。"
      ]
    }
  },
  {
    version: "0.0.16",
    date: "2026-09-02",
    tag: "QTE Input Precision, Standee Appreciation Mode & Battle Navigation Guards",
    changes: {
      "zh-Hant": [
        "【能力成長未分配點數淺藍光暈】當角色升等持有剩餘能力或技能點數時，首頁「能力成長」按鈕邊緣呈現優雅的淺藍色呼吸外發光提示。",
        "【結算與切西瓜立繪全景欣賞開關】結算畫面新增「欣賞立繪」開關，可一鍵隱藏卡片與半透明遮罩，以 100% 原始色彩與亮度全景展示小樂立繪與泳裝差分。",
        "【對戰局內防誤觸離場確認彈窗】攔截瀏覽器上一頁、滑鼠側鍵（上下頁）與頁面關閉事件，彈出和風確認視窗，防止意外退出損失進度與獎勵。",
        "【戰鬥回合倒數時間戳持久化】修復刷新網頁 (F5) 回合倒數秒數重置的問題，以絕對時間戳精確繼承剩餘秒數，杜絕刷新漏洞。",
        "【QTE 實體鍵位解析與嚴格錯誤判定】優先採用 event.code 物理鍵位解析，徹底消除 Windows 輸入法組字與 Shift 鍵卡頓；非方向鍵（如 F/Space/J 等）嚴格判定為失誤並扣除容錯次數。"
      ],
      "zh-Hans": [
        "【能力成长未分配点数浅蓝光晕】当角色升等持有剩余能力或技能点数时，首页“能力成长”按钮边缘呈现优雅的浅蓝色呼吸外发光提示。",
        "【结算与切西瓜立绘全景欣赏开关】结算画面新增“欣赏立绘”开关，可一键隐藏卡片与半透明遮罩，以 100% 原始色彩与亮度全景展示小乐立绘与泳装差分。",
        "【对战局内防误触离场确认弹窗】拦截浏览器上一页、鼠标侧键（上下页）与页面关闭事件，弹出和风确认弹窗，防止意外退出损失进度与奖励。",
        "【战斗回合倒数时间戳持久化】修复刷新网页 (F5) 回合倒数秒数重置的问题，以绝对时间戳精确继承剩余秒数，杜绝刷新漏洞。",
        "【QTE 实体键位解析与严格错误判定】优先采用 event.code 物理键位解析，彻底消除 Windows 输入法组字与 Shift 键卡顿；非方向键（如 F/Space/J 等）严格判定为失误并扣除容错次数。"
      ],
      "en": [
        "【Growth Button Pending Points Cyan Glow】When unallocated stat or skill points are available upon leveling up, the Home 'Growth' button illuminates with a soft cyan pulsing glow.",
        "【Settlement Standee Appreciation Mode】Added a 'View Standee' toggle button to victory and watermelon screens, instantly hiding UI cards and dark masks to display Little Raku in full brightness.",
        "【In-Battle Navigation & Accidental Exit Guards】Intercepts browser back/forward history, mouse side buttons, and page unload with a shrine-themed confirmation dialog to prevent accidental progress loss.",
        "【Battle Countdown Timestamp Persistence】Fixed an issue where refreshing the page (F5) would reset round timers; remaining seconds are now preserved across reloads with absolute timestamps.",
        "【QTE Physical Code Mapping & Strict Error Detection】Directly binds event.code to eliminate Windows IME composition and Shift lag; unmapped action keys (e.g. F, Space, J) are strictly penalized as strikes."
      ],
      "ja": [
        "【能力成長未割り当てポイント水色発光】レベルアップ時に未使用のステータス・スキルポイントがある場合、ホーム画面の「能力成長」ボタンが水色の呼吸発光で通知します。",
        "【リザルト立ち絵鑑賞モード】勝利およびスイカ割り画面に「立ち絵鑑賞」切り替えボタンを新設。UIカードと半透明マスクを非表示にし、小楽の立ち絵・水着差分を100%の明るさで表示可能に。",
        "【対局離脱防止確認モーダル】ブラウザの戻る/進む、マウスサイドボタン、ページ更新を検知し、進行状況と報酬の損失を防ぐ和風確認モーダルを実装。",
        "【戦闘カウントダウンタイムスタンプ永続化】ページ更新(F5)でラウンド残り秒数がリセットされる不具合を修正し、絶対タイムスタンプで正確に残り時間を継承。",
        "【QTE物理キー解析＆無効キー厳格判定】event.codeによる直接判定を導入し、Windows日本語入力(IME)やShiftキーによる引っ掛かりを解消。方向以外の無効キー入力も即座にエラーとして判定。"
      ]
    }
  },
  {
    version: "0.0.15",
    date: "2026-09-02",
    tag: "4K & Ultra-Wide RWD Calibration: Home Dialogue Proximity Anchoring & Theater Settlement Stage",
    changes: {
      "zh-Hant": [
        "【4K 與大螢幕首頁對話氣泡緊密貼頭】修復高解析度下對話氣泡鎖定頂部導致與立繪脫節浮空的問題，動態計算小樂頭頂高度並將指針精準錨定於狐耳上方。",
        "【戰鬥結算雙欄劇場舞台與立繪無裁切】解除結算立繪容器高度限制，徹底解決 4K 下雙腿腳部被推落裁切的缺陷；實作中央雙欄舞台置中排版，消除中央巨大黑洞。",
        "【4K 戰鬥主場景比例均衡校準】優化大尺寸顯示器下 Boss HUD、神諭框、立繪與玩家操作面板的縱向比例與間距，呈現更具張力的對決體驗。"
      ],
      "zh-Hans": [
        "【4K 与大屏幕首页对话气泡紧密贴头】修复高分辨率下对话气泡锁定顶部导致与立绘脱节浮空的问题，动态计算小乐头顶高度并将指针精准锚定于狐耳上方。",
        "【战斗结算双栏剧场舞台与立绘无裁切】解除结算立绘容器高度限制，彻底解决 4K 下双腿脚部被推落裁切的缺陷；实作中央双栏舞台居中排版，消除中央巨大黑洞。",
        "【4K 战斗主场景比例均衡校准】优化大尺寸显示器下 Boss HUD、神谕框、立绘与玩家操作面板的纵向比例与间距，呈现更具张力的对决体验。"
      ],
      "en": [
        "【4K & Ultra-Wide Home Dialogue Bubble Proximity Anchoring】Fixed an issue where speech bubbles stayed locked near the top header on high-resolution screens; bubbles now anchor dynamically right above Little Raku's head with arrow pointing to her ears.",
        "【Victory Settlement Centered Stage & Full Standee Visibility】Decoupled settlement standee vertical constraints to prevent feet cutoff on 4K displays and introduced a centered dual-column stage eliminating vast empty voids.",
        "【4K Combat Arena Proportional Calibration】Balanced Boss HUD, round oracle, standee, and player controls on large monitors for a majestic and responsive battle presentation."
      ],
      "ja": [
        "【4K・大画面ホーム画面吹き出し頭部追従】高解像度環境で吹き出しが上部に固定されて立ち絵と乖離する問題を修正し、小楽の頭頂部・狐耳の真上へ的確に指すよう動的アンカーを実装。",
        "【勝利リザルト中央シアター配置＆立ち絵全身表示】リザルト立ち絵の縦制限を解除し、4K環境で足元が見切れる不具合を解消。左右カードと立ち絵を中央舞台に収容し広大な余白を最適化。",
        "【4K戦闘画面バランス調整】大画面でのBoss HUD、神託枠、立ち絵、操作UIの縦方向比率を再調整し、より迫力ある和風対決画面を構成。"
      ]
    }
  },
  {
    version: "0.0.14",
    date: "2026-09-02",
    tag: "RWD Regression Gate, Tablet Battle Positioning & Expanded Wide Dojo Workspace",
    changes: {
      "zh-Hant": [
        "【平板與緊湊直向戰鬥控制定位修復】修復 768×1024 平板等直向版型下玩家 HUD、手勢選擇器與快捷欄因包含塊變形導致向左偏移裁切的問題，確保控制按鈕等寬對齊且無外溢。",
        "【寬螢幕道場工作區置中擴展】於 ≥1280px 螢幕將修練道場題目與方向盤工作區由 820px 置中擴展至 1040px，按鈕尺寸同步優化放大，提供更寬敞舒適的操作體驗。",
        "【跨引擎 RWD 契約回歸門檻】建立全自動三引擎（Chromium / Firefox / WebKit）2,286 案例回歸驗收門檻，嚴格保護四向裁切、遮擋、必要控制可達性與動畫狀態穩定。"
      ],
      "zh-Hans": [
        "【平板与紧凑直向战斗控制定位修复】修复 768×1024 平板等直向版型下玩家 HUD、手势选择器与快捷栏因包含块变形导致向左偏移裁切的问题，确保控制按钮等宽对齐且无外溢。",
        "【宽屏幕道场工作区居中扩展】于 ≥1280px 屏幕将修炼道场题目与方向盘工作区由 820px 居中扩展至 1040px，按钮尺寸同步优化放大，提供更宽敞舒适的操作体验。",
        "【跨引擎 RWD 契约回归门槛】建立全自动三引擎（Chromium / Firefox / WebKit）2,286 案例回归验收门槛，严格保护四向裁切、遮挡、必要控制可达性与动画状态稳定。"
      ],
      "en": [
        "【Tablet Portrait Battle Control Positioning Fix】Fixed a containing-block transform issue on 768x1024 portrait layouts causing player HUD and hand selector to shift left and clip, restoring aligned and fully reachable controls.",
        "【Wide Screen Dojo Workspace Centering & Expansion】Expanded the Dojo QTE workspace and direction pads on screens ≥1280px from 820px to a centered 1040px with scaled direction buttons for an enhanced practice experience.",
        "【Cross-Engine RWD Regression Verification Gate】Established a 2,286-case regression test gate across Chromium, Firefox, and WebKit ensuring clipping, occlusion, reachability, and animation invariants are protected."
      ],
      "ja": [
        "【タブレット縦向き戦闘UIの配置修正】768×1024等の縦向きタブレット環境で包含ブロックの変形によりプレイヤーHUDや手勢選択枠が左にズレて見切れていた問題を修正し、均等幅で操作可能な配置に復元。",
        "【ワイド画面向け道場ワークスペースの中央配置と拡大】1280px以上の大画面において、修練道場の問題・方向パッド表示幅を820pxから1040pxへ中央揃えで拡大し、ボタン視認性と操作性を向上。",
        "【クロスエンジンRWDリグレッション検証ゲート確立】Chromium・Firefox・WebKitの3エンジン全2,286ケースに及ぶ自動回帰検証ゲートを整備し、表示崩れや到達不能、アニメーション安定性を厳格に保証。"
      ]
    }
  },
  {
    version: "0.0.13",
    date: "2026-08-31",
    tag: "Battle RWD Calibration: Portrait Standee Elevation & Landscape Dialogue Centering",
    changes: {
      "zh-Hant": [
        "【平板直向立繪高度抬升】修復 iPad 直向（834x1194 等）模式下小樂立繪過度沉底的問題，基準線調高至中央黃金分割點，消除中央大面積留白發空。",
        "【橫向對話框置中與尺寸修復】徹底修復橫向與短螢幕模式下對話框向左偏離螢幕 50% 造成裁切的排版 Bug，保持左右對稱置中且文字舒適排版。",
        "【猜拳儀表板安全避讓小樂面部】緊湊優化橫向模式下回合儀表板尺寸與立繪定位，確保小樂面部、五官與狐耳 100% 完整顯露，無任何圖層遮擋。"
      ],
      "zh-Hans": [
        "【平板直向立绘高度抬升】修复 iPad 直向（834x1194 等）模式下小乐立绘过度沉底的问题，基准线调高至中央黄金分割点，消除中央大面积留白发空。",
        "【横向对话框居中与尺寸修复】彻底修复横向与短屏幕模式下对话框向左偏离屏幕 50% 造成裁切的排版 Bug，保持左右对称居中且文字舒适排版。",
        "【猜拳仪表板安全避让小乐面部】紧凑优化横向模式下回合仪表板尺寸与立绘定位，确保小乐面部、五官与狐耳 100% 完整显露，无任何图层遮挡。"
      ],
      "en": [
        "【Tablet Portrait Standee Elevation】Elevated Little Raku's sprite baseline on portrait tablets (iPad 834x1194, etc.) to the central golden ratio, eliminating empty vertical gaps.",
        "【Landscape Dialogue Box Centering Fix】Fixed a critical layout bug where the dialogue box shifted 50% off-screen to the left on landscape/compact screens; now perfectly centered and symmetrical.",
        "【Round Oracle Facial Clearance】Streamlined the round oracle card and adjusted landscape standee placement to ensure Little Raku's face, ears, and expressions are 100% visible with zero overlay obstruction."
      ],
      "ja": [
        "【タブレット縦向き立ち絵の高さ引き上げ】iPad縦向き（834x1194など）で小楽の立ち絵が下に沈みすぎて中央に余白ができていた問題を修正し、画面中央の黄金比へ引き上げ。",
        "【横向き会話ウィンドウ中央揃え修復】横向き・短画面環境で会話枠が左へ50%ズレて見切れていたバグを解消し、左右対称の美しい中央揃えに復元。",
        "【じゃんけんラウンド枠と小楽顔グラの被り解消】横向きでのラウンド表示枠と立ち絵位置を微調整し、小楽の顔・耳・表情が一切隠れず美しく表示されるよう安全余白を確保。"
      ]
    }
  },
  {
    version: "0.0.12",
    date: "2026-08-31",
    tag: "Full State Persistence Across Page Refresh & Auto-Battle Continuity",
    changes: {
      "zh-Hant": [
        "【全頁面重新整理狀態保留】任何頁面（能力成長、緣側商店、狐娘圖鑑、修練道場、戰績紀錄等）在重新整理（F5 / 重新載入）後，100% 保持在最後停留位置，不產生畫面跳轉。",
        "【子頁籤與篩選器持久化】能力成長的配點/技能樹頁籤、緣側商店的裝備/道具分類篩選、圖鑑立繪差分等設定即時儲存，重載後完美還原。",
        "【戰鬥中與自動掛機無縫接續】手動戰鬥或自動刷關中重新整理時，精確保留玩家與 Boss 當前血量、魔力、回合數、自動掛機輪次勝負紀錄與切西瓜庫存累計亮燈，無縫接續戰鬥。"
      ],
      "zh-Hans": [
        "【全页面重新整理状态保留】任何页面（能力成长、缘侧商店、狐娘图鉴、修炼道场、战绩纪录等）在重新整理（F5 / 重新载入）后，100% 保持在最后停留位置，不产生画面跳转。",
        "【子标签与筛选器持久化】能力成长的配点/技能树标签、缘侧商店的装备/道具分类筛选、图鉴立绘差分等设定实时储存，重载后完美还原。",
        "【战斗中与自动挂机无缝接续】手动战斗或自动刷关中重新整理时，精确保留玩家与 Boss 当前血量、魔力、回合数、自动挂机轮次胜负纪录与切西瓜库存累计亮灯，无缝接续战斗。"
      ],
      "en": [
        "【Full Page State Persistence on Refresh】Refreshing the page (F5 / reload) from any screen (Growth, Shop, Gallery, Dojo, Records, etc.) preserves your exact location with zero disruptive screen jumps.",
        "【Subtab & Filter Continuity】Growth tabs (Stats vs Skills), Shop category filters (Potions, Weapons, Armor, Accessories), and Gallery variant selections are automatically saved and restored.",
        "【Seamless Battle & Auto-Battle Continuity】Refreshing during manual or auto-battles perfectly preserves player and boss HP/MP, current round, auto-battle progress/win-loss stats, and accumulated watermelon slices."
      ],
      "ja": [
        "【リロード時の全画面状態維持】どの画面（能力成長、ショップ、図鑑、道場、戦績など）でページを再読み込み（F5）しても、画面遷移を起こさず最後にいた場所を100%保持。",
        "【タブ・フィルター状態の永続化】能力成長のステータス/スキルタブ、ショップのカテゴリ絞り込み、図鑑の差分選択などが即座に保存され、リロード後も正確に復元。",
        "【戦闘中・自動周回のシームレス再開】手動戦闘や自動周回中にリロードしても、プレイヤーとBossの現在HP/MP、ラウンド数、自動周回勝敗数、スイカ割りストック点灯数を完全保持して戦闘を続行。"
      ]
    }
  },
  {
    version: "0.0.11",
    date: "2026-08-31",
    tag: "Tablet Landscape Desktop-Like Spacious Layout & Overlap Fix",
    changes: {
      "zh-Hant": [
        "【平板橫放寬螢幕佈局優化】重構 iPad Pro（11 吋/12.9 吋）與 Android 平板在橫向模式下的視覺佈局，擁有與電腦版一致之寬敞大氣空間。",
        "【首頁標題單行大氣呈現】修正主標題「狐樂・絆之勝負」在橫放平板時文字折行（「負」被擠至第二行）的問題，實裝單行防折行與流體字級縮放。",
        "【戰鬥場景元素重疊徹底修復】修復舊版絕對定位導致回合儀表板與 Boss 血條及角色面部重疊的 Bug，重塑垂直層次結構，消除元素碰撞。"
      ],
      "zh-Hans": [
        "【平板横放宽屏幕布局优化】重构 iPad Pro（11 吋/12.9 吋）与 Android 平板在横向模式下的视觉布局，拥有与电脑版一致之宽敞大气空间。",
        "【首页标题单行大气呈现】修正主标题「狐乐・绊之胜负」在横放平板时文字折行（「负」被挤至第二行）的问题，实装单行防折行与流体字级缩放。",
        "【战斗场景元素重叠彻底修复】修复旧版绝对定位导致回合仪表板与 Boss 血条及角色面部重叠的 Bug，重塑垂直层次结构，消除元素碰撞。"
      ],
      "en": [
        "【Tablet Landscape Spacious Layout】Redesigned the landscape layout for iPad Pro (11\"/12.9\") and Android tablets to provide a spacious, desktop-like immersive layout.",
        "【Home Title Single-Line Fix】Resolved an issue where the main title wrapped onto a second line on landscape tablets; now guaranteed to display cleanly on a single line with fluid typography.",
        "【Battle Scene Overlap Elimination】Completely removed legacy hardcoded positioning that caused the round oracle box to overlap the boss health bar and character face, restoring clean vertical layering."
      ],
      "ja": [
        "【タブレット横向き大画面レイアウト最適化】iPad Pro（11/12.9インチ）およびAndroidタブレットの横向き表示をPC版同様に開放感あふれるレイアウトへ全面刷新。",
        "【タイトル改行崩れ修正】横向きタブレットでメインタイトル「狐樂・絆之勝負」が途中で改行されていた問題を修正し、常に1行で美しく表示されるよう流体タイポグラフィを適用。",
        "【戦闘画面の要素重複解消】ラウンド通知枠とBossHPゲージ・キャラクター顔グラフィックが重なっていたレガシー絶対配置バグを完全解消し、階層構造を整理。"
      ]
    }
  },
  {
    version: "0.0.10",
    date: "2026-08-31",
    tag: "iPad Touch D-Pad Fix, Swipe QTE & Physical Keyboard Support",
    changes: {
      "zh-Hant": [
        "【iPad 與平板觸控方向盤修復】修正 CSS @media 選擇器語法導致 Safari 丟棄樣式塊之問題，確保 iPad Pro 11 吋/12.9 吋 (iPadOS Safari) 及各類平板在 QTE 反制時 100% 顯示方向按鍵。",
        "【QTE 8 方向手指滑動手勢輸入】全移動裝置（iOS/Android 手機與平板）現可直接在 QTE 反制畫面中用手指朝 8 方向滑動反制出拳，並完整保留虛擬按鍵點擊玩法，雙軌模式支援左右手分區獨立多指滑動。",
        "【外接實體鍵盤完全相容支援】平板與手機連接 Magic Keyboard 或藍牙鍵盤時，自動允許使用實體 WASD、方向鍵、數字鍵與所有快捷鍵（F、空白鍵、ESC）暢玩遊戲。"
      ],
      "zh-Hans": [
        "【iPad 与平板触控方向盘修复】修正 CSS @media 选择器语法导致 Safari 丢弃样式块之问题，确保 iPad Pro 11 吋/12.9 吋 (iPadOS Safari) 及各类平板在 QTE 反制时 100% 显示方向按键。",
        "【QTE 8 方向手指滑动势输入】全移动设备（iOS/Android 手机与平板）现可直接在 QTE 反制画面中用手指朝 8 方向滑动反制出拳，并完整保留虚拟按键点击玩法，双轨模式支援左右手分区独立多指滑动。",
        "【外接实体键盘完全相容支援】平板与手机连接 Magic Keyboard 或蓝牙键盘时，自动允许使用实体 WASD、方向键、数字键与所有快捷键（F、空白键、ESC）畅玩游戏。"
      ],
      "en": [
        "【iPad & Tablet Touch D-Pad Fix】Resolved a CSS @media selector parsing issue in Safari/WebKit, ensuring iPad Pro 11\"/12.9\" (iPadOS Safari) and all touch tablets reliably display on-screen QTE D-pad buttons.",
        "【8-Direction Swipe Gesture QTE】All mobile and tablet devices (iOS & Android) now support swiping in 8 directions across the counter area to execute QTE inputs, seamlessly coexisting with virtual buttons, plus multi-finger split-screen dual swiping.",
        "【Physical Keyboard Full Support】Connecting a Magic Keyboard or Bluetooth keyboard to tablets/phones now allows full use of physical arrow keys, WASD, numpad, and hotkeys (F, Space, ESC) exactly like desktop."
      ],
      "ja": [
        "【iPad・タブレット用QTE方向キー表示修正】Safari/WebKitにおけるCSS @media構文エラーを修正し、iPad Pro 11/12.9インチ（iPadOS Safari）や各種タブレットでQTE時に方向キーが確実に表示されるよう修正。",
        "【8方向スワイプジェスチャー入力対応】iOS/Androidのスマホ・タブレット全機種において、QTE画面で8方向に指をスワイプして反制入力が可能に（従来の仮想ボタンタップ操作も併用可能、デュアルQTE時の2本指独立スワイプ対応）。",
        "【外付け物理キーボード完全対応】iPadやスマホにMagic KeyboardやBluetoothキーボードを接続時、矢印キー・WASD・テンキーおよび各種ショートカット（F、Space、ESC）がPC版同様に即座に利用可能。"
      ]
    }
  },
  {
    version: "0.0.9",
    date: "2026-08-31",
    tag: "Dual QTE Desktop Layout & Input Failure Fix",
    changes: {
      "zh-Hant": [
        "【桌面版雙 QTE 邊框自適應修復】修正第 4 關雙生破綻與修練場雙軌模式在桌面版寬螢幕下，7 鍵序列因方塊過大而超出卡片邊框的問題，全面實裝響應式等比縮放與邊界保護。",
        "【QTE 斜向按錯判定失敗修復】修復目標為斜向方向時輸入無效正方向（如面對 ↗ 按下 ↓ 或 ←）被靜默忽略的漏洞，按錯立即扣減容錯次數並在達到上限時判定失敗。"
      ],
      "zh-Hans": [
        "【桌面版双 QTE 边框自适应修复】修正第 4 关双生破绽与修练场双轨模式在桌面版宽屏幕下，7 键序列因方块过大而超出卡片边框的问题，全面实装响应式等比缩放与边界保护。",
        "【QTE 斜向按错判定失败修复】修复目标为斜向方向时输入无效正方向（如面对 ↗ 按下 ↓ 或 ←）被静默忽略的漏洞，按错立即扣减容错次数并在达到上限时判定失败。"
      ],
      "en": [
        "【Dual QTE Desktop Layout Fix】Resolved the 7-arrow sequence overflowing the dual-track card boundaries on desktop screens in Stage 4 and Dojo mode with adaptive responsive scaling and boundary containment.",
        "【QTE Diagonal Input Failure Fix】Fixed a flaw where pressing invalid cardinal keys (e.g. pressing ↓ or ← on ↗) during diagonal QTE prompts was silently ignored; wrong inputs now correctly decrement error allowance and trigger failure when reaching max errors."
      ],
      "ja": [
        "【PC版デュアルQTE枠外はみ出し修正】第4章の双生破綻および道場双軌モードにおいて、7キー連続入力時にアイコンがカード枠外へはみ出す問題を解消し、レスポンシブ縮小と境界保護を適用。",
        "【QTE斜め入力時のミス判定修正】斜め入力（↗など）に対して無効な正方向キー（↓や←など）を押した際に判定が無視されていた不具合を修正し、ミス回数の加算および上限到達時の失敗判定を厳格化。"
      ]
    }
  },
  {
    version: "0.0.8",
    date: "2026-08-31",
    tag: "Tablet Touch D-Pad & Player HUD Fix",
    changes: {
      "zh-Hant": [
        "【平板觸控方向盤支援】修正 iPad、Android 平板與觸控螢幕被當作電腦鍵盤裝置的問題，全域啟用八方向與雙軌觸控方向盤。",
        "【玩家 HUD 雙行網格排版】重塑玩家 HUD 為雙行自適應網格，徹底根除 ATK 標籤與等級、血量數值碰撞重疊問題。",
        "【提示框與對話框層次優化】將 Toast 系統通知移至螢幕頂部，徹底杜絕提示訊息覆蓋底部血條、對話框與快捷欄。",
        "【修練場雙軌方向盤補完】修練場雙生假人練習模式同步支援雙軌觸控方向盤。"
      ],
      "zh-Hans": [
        "【平板触控方向盘支援】修正 iPad、Android 平板与触控屏幕被当作电脑键盘装置的问题，全局启用八方向与双轨触控方向盘。",
        "【玩家 HUD 双行网格排版】重塑玩家 HUD 为双行自适应网格，彻底根除 ATK 标签与等级、血量数值碰撞重叠问题。",
        "【提示框与对话框层次优化】将 Toast 系统通知移至屏幕顶部，彻底杜绝提示讯息覆盖底部血条、对话框与快捷栏。",
        "【修练场双轨方向盘补完】修练场双生假人练习模式同步支援双轨触控方向盘。"
      ],
      "en": [
        "【Tablet Touch D-Pad Support】Fixed tablets (iPad, Android, Surface) being misclassified as desktop PCs; on-screen 8-direction and dual D-pads are now fully accessible.",
        "【Player HUD 2-Row Grid Layout】Redesigned player HUD to a 2-row adaptive grid to permanently eliminate ATK badge overlaps with Level and HP numbers.",
        "【Toast Notification Re-anchoring】Moved toast system alerts to the top of the viewport to prevent obscuring bottom combat gauges, quick slots, and dialogue.",
        "【Dojo Dual Touch D-Pad】Added dual on-screen touch pads to Dojo Training Mode for touchscreen users."
      ],
      "ja": [
        "【タブレット向けタッチパッド対応】iPad や Android タブレットがPCと誤判定されキーボード入力を要求される問題を修正し、全方向タッチパッドを常時利用可能に。",
        "【プレイヤーHUDの2行グリッド化】プレイヤーHUDを2行構造に刷新し、ATKバッジとレベル・HP数値の重なりを完全解消。",
        "【トースト通知の配置適正化】システム通知（Toast）を画面上部に移動し、下部のHPバー・会話枠・ショートカットへの干渉を防止。",
        "【修練道場のデュアルパッド追加】道場モードの双軌練習にもデュアルタッチ方向パッドを実装。"
      ]
    }
  },
  {
    version: "0.0.7",
    date: "2026-08-31",
    tag: "Mobile Visual & RWD Precision Overhaul",
    changes: {
      "zh-Hant": [
        "【手機版戰鬥排版精準重構】重新計算關卡標籤、撤退按鈕、Boss 血條、回合神諭、傷害日誌與立繪之絕對垂直間距，徹底解決元素疊層與遮擋問題。",
        "【血量數值右側自適應對齊】全面強制 `.hud-name` 採單行無換行排版與 `margin-left: auto` 右側對齊，根除血量數值擠壓換行問題。",
        "【第四關雙 Boss 卡片雙行排版】重塑雙生 Boss 狀態卡為網格雙行架構，保證各尺寸手機均完整展示名稱與 ATK 數值，永不裁切。",
        "【CSS 快取深度更新】全域 CSS 檔案附加全新快取版本戳記，確保 iOS Safari 與行動端即時載入最新設計樣式。"
      ],
      "zh-Hans": [
        "【手机版战斗排版精准重构】重新计算关卡标签、撤退按钮、Boss 血条、回合神谕、伤害日志与立绘之绝对垂直间距，彻底解决元素叠层与遮挡问题。",
        "【血量数值右侧自适应对齐】全面强制 `.hud-name` 采用单行无换行排版与 `margin-left: auto` 右侧对齐，根除血量数值挤压换行问题。",
        "【第四关双 Boss 卡片双行排版】重塑双生 Boss 状态卡为网格双行架构，保证各尺寸手机均完整展示名称与 ATK 数值，永不裁切。",
        "【CSS 缓存深度更新】全局 CSS 文件附加全新缓存版本时间戳，确保 iOS Safari 与移动端即时加载最新设计样式。"
      ],
      "en": [
        "【Mobile Combat Layout Precision Overhaul】Recalculated vertical spacing for stage tag, exit button, Boss HUD, round oracle, damage log, and character sprites to completely eliminate overlaps.",
        "【HP Text Auto Right Alignment】Enforced flex single-row layout with `margin-left: auto` across all HUD bars, eliminating multi-line number stacking.",
        "【Stage 4 Dual Boss Card Grid】Refactored dual boss cards into an adaptive 2-row grid to guarantee complete visibility without edge clipping.",
        "【CSS Cache Buster Refresh】Refreshed CSS cache query timestamps across all stylesheet links to ensure immediate mobile browser rendering."
      ],
      "ja": [
        "【モバイル戦闘画面の精密レイアウト再構築】章タグ、撤退ボタン、ボスHPバー、ラウンド神託、ダメージログ、立ち絵の垂直配置を完全再計算し、重なりを解消。",
        "【HP数値の右揃え適応】`.hud-name` を1行フレックス化し `margin-left: auto` で右端に整列させ、数値の折り返し重なりを根絶。",
        "【第4章デュアルボスの2行グリッド化】デュアルボスのカードを2行構造に刷新し、画面幅に関わらず名前とATK数値が完全表示されるよう改善。",
        "【CSSキャッシュ更新】全スタイルシートのキャッシュパラメータを刷新し、iOS Safari 等の端末で即座に最新デザインが反映されるように対応。"
      ]
    }
  },
  {
    version: "0.0.6",
    date: "2026-08-31",
    tag: "UI & Audio Refactor",
    changes: {
      "zh-Hant": [
        "【戰鬥介面優化】重構手機版戰鬥排版：Boss 血條與玩家 HUD 採彈性水平對齊，徹底修復血量與魔力數值文字重疊問題。",
        "【第四關卡片防裁切】優化雙 Boss 狀態卡為雙行自適應排版，防止右側敵人卡片與 ATK 數值於手機螢幕邊緣被裁切。",
        "【小樂立繪與回合介面層次】微調小樂立繪垂直置中比例，避免與 Boss 血條、回合儀表及傷害日誌重疊。",
        "【更新日誌系統】點擊首頁版本號即可開啟獨立和風歷史更新日誌視窗，完整記錄所有版本歷程。",
        "【iOS 音訊防搶佔】將 AudioSession 模式切換為 Ambient 模式，不再打斷或暫停玩家於背景播放的 YouTube 或音樂 App。"
      ],
      "zh-Hans": [
        "【战斗界面优化】重构手机版战斗排版：Boss 血条与玩家 HUD 采用弹性水平对齐，彻底修复血量与魔力数值文字重叠问题。",
        "【第四关卡片防裁切】优化双 Boss 状态卡为双行自适应排版，防止右侧敌人卡片与 ATK 数值于手机屏幕边缘被裁切。",
        "【小乐立绘与回合界面层次】微调小乐立绘垂直置中比例，避免与 Boss 血条、回合仪表及伤害日志重叠。",
        "【更新日志系统】点击首页版本号即可开启独立和风历史更新日志视窗，完整记录所有版本历程。",
        "【iOS 音频防抢占】将 AudioSession 模式切换为 Ambient 模式，不再打断或暂停玩家在后台播放的 YouTube 或音乐 App。"
      ],
      "en": [
        "【Combat UI Refactor】Completely redesigned mobile combat HUD: flex layout for Boss and Player bars, fixing overlapping HP/MP text.",
        "【Stage 4 Dual Boss Fix】Applied 2-row adaptive layout for dual Boss cards to prevent right-edge clipping on mobile screens.",
        "【Character Layering】Fine-tuned Kohaku's sprite positioning to eliminate overlap with the Boss bar, round oracle, and damage logs.",
        "【Changelog Modal】Clicking the version badge opens a dedicated Japanese Shrine-style patch notes modal.",
        "【iOS Background Audio Fix】Configured AudioSession to Ambient mode so game sounds will no longer interrupt or pause YouTube/Spotify."
      ],
      "ja": [
        "【戦闘画面UI最適化】モバイル版の戦闘レイアウトを再構築：ボスHPバーとプレイヤーHUDの重なり不具合を完全修正。",
        "【第4章デュアルボス表示改善】2行適応型レイアウトにより、右側ボスのカードとATK数値が見切れる問題を解消。",
        "【立ち絵とラウンド表示の階層調整】小楽の立ち絵位置を微調整し、HPバー・ラウンド計器・ダメージログとの重なりを防止。",
        "【更新履歴モーダル】バージョン番号をタップすることで、和風デザインの更新履歴一覧ウィンドウを表示可能に。",
        "【iOS オーディオ改善】AudioSession を Ambient モードに変更し、YouTube や音楽のバックグラウンド再生を中断しないように改善。"
      ]
    }
  },
  {
    version: "0.0.5",
    date: "2026-08-31",
    tag: "iOS Safari Audio Fix",
    changes: {
      "zh-Hant": [
        "【iOS Web Audio 深度防護】加入 scheduler 防時鐘積壓重置機制，徹底解決切換 App 或背景節流時節點爆炸崩潰問題。",
        "【中斷自動恢復】註冊 context.onstatechange 與多重手勢喚醒鏈，支援 interrupted 狀態自動恢復。",
        "【合成器安全邊界】全面防護 AudioParam 自動化曲線時間，避免傳入過去時間導致 Safari 拋錯無聲。"
      ],
      "zh-Hans": [
        "【iOS Web Audio 深度防护】加入 scheduler 防时钟积压重置机制，彻底解决切换 App 或后台节流时节点爆炸崩溃问题。",
        "【中断自动恢复】注册 context.onstatechange 与多重手势唤醒链，支持 interrupted 状态自动恢复。",
        "【合成器安全边界】全面防护 AudioParam 自动化曲线时间，避免传入过去时间导致 Safari 报错无声。"
      ],
      "en": [
        "【iOS Web Audio Hardening】Added scheduler clock catch-up guard to prevent audio node backlog and engine crash upon backgrounding.",
        "【Interruption Auto-Recovery】Attached statechange and multi-gesture listeners to seamlessly resume from interrupted state.",
        "【AudioParam Safety】Enforced safe future time limits on all parameter automation curves."
      ],
      "ja": [
        "【iOS Web Audio 強化】スケジューラーのクロック遅延防止ガードを追加し、バックグラウンド復帰時のクラッシュを防止。",
        "【中断自動復帰】onstatechange と各種タッチイベントによる自動再開処理を追加。",
        "【AudioParam 安全対策】過去時間へのスケジューリング例外を防止するタイムクランプを実装。"
      ]
    }
  },
  {
    version: "0.0.4",
    date: "2026-08-31",
    tag: "Damage Log & Dual QTE",
    changes: {
      "zh-Hant": [
        "【傷害紀錄純淨化】全面在地化最近 5 筆傷害來源文字（如【猜拳獲勝】、【變拳克制】），杜絕顯示程式碼變數。",
        "【結算畫面隱藏】於對戰勝利或失敗結算時自動隱藏並清空即時傷害日誌，保持畫面乾淨整潔。",
        "【修練道場優化】清理首頁重複之修練場按鈕，保留目錄第 08 項修練道場。",
        "【雙軌 QTE 嚴格隔離】WASD 專屬左軌、方向鍵專屬右軌，兩側獨立判定且絕不互相干擾。"
      ],
      "zh-Hans": [
        "【伤害纪录纯净化】全面本地化最近 5 笔伤害来源文字，杜绝显示代码变量名。",
        "【结算画面隐藏】对局胜利或失败结算时自动隐藏并清空即时伤害日志。",
        "【修炼道场优化】清理首页重复之修炼场按钮，保留目录第 08 项修炼道场。",
        "【双轨 QTE 严格隔离】WASD 专属左轨、方向键专属右轨，两侧独立判定且互不干扰。"
      ],
      "en": [
        "【Clean Damage Log】Localized all combat damage source texts naturally without exposing code variable strings.",
        "【Settlement Auto-Hide】Automatically hides and clears the damage log box during victory and defeat screens.",
        "【Dojo Button Cleanup】Removed duplicate globe Dojo button from the home footer.",
        "【Dual QTE Key Segregation】WASD strictly controls left track, Arrow keys strictly control right track."
      ],
      "ja": [
        "【ダメージログ純化】ダメージ発生源を自然な翻訳テキストに統一し、変数名の露出を完全排除。",
        "【リザルト非表示】勝敗リザルト画面表示時にダメージログを自動で非表示・初期化。",
        "【道場ボタン整理】ホーム画面フッターの重複した道場ボタンを削除し、メニュー08番に統一。",
        "【2系統QTEの独立化】WASDは左レーン、矢印キーは右レーンのみに厳格割り当て。"
      ]
    }
  },
  {
    version: "0.0.3",
    date: "2026-08-30",
    tag: "Dojo & Silhouette Sandbox",
    changes: {
      "zh-Hant": [
        "【修練道場沙盒】新增單人與雙人木人樁自訂血量與傷害模式，支援中途安全退出。",
        "【影・小樂剪影】修復修練道場影小樂黑色剪影遮罩效果。",
        "【ATK 與數值框修復】修復戰鬥介面攻擊力數值超出外框與位置重疊問題。"
      ],
      "zh-Hans": [
        "【修炼道场沙盒】新增单人与双人假人桩自定义血量与伤害模式，支持中途安全退出。",
        "【影・小乐剪影】修复修炼道场影小乐黑色剪影遮罩效果。",
        "【ATK 与数值框修复】修复战斗界面攻击力数值超出外框与位置重叠问题。"
      ],
      "en": [
        "【Dojo Training Sandbox】Added custom HP and damage settings for single and dual training dummies with safe quit.",
        "【Silhouette Shader】Fixed black shadow silhouette mask for Shadow Kohaku in the Dojo.",
        "【ATK Badge Overflow Fix】Fixed ATK number overflowing container box."
      ],
      "ja": [
        "【修練道場サンドボックス】カスタムHP・攻撃力設定可能なシングル・デュアル案山子モードを実装。",
        "【影・小楽シルエット】道場内の影・小楽に漆黒のシルエットマスクを適用。",
        "【ATK枠溢れ修正】戦闘画面の攻撃力バッジ数値の枠みだしを修正。"
      ]
    }
  },
  {
    version: "0.0.2",
    date: "2026-08-30",
    tag: "QTE & Watermelon Slicing",
    changes: {
      "zh-Hant": [
        "【雙軌 QTE 系統】第四章加入左右雙軌獨立 QTE 判定與雙手解放機制。",
        "【切西瓜小遊戲】戰勝後觸發三刀切西瓜趣味玩法，附帶動態難度遞增與額外 EXP 結算。"
      ],
      "zh-Hans": [
        "【双轨 QTE 系统】第四章加入左右双轨独立 QTE 判定与双手解放机制。",
        "【切西瓜小游戏】战胜后触发三刀切西瓜趣味玩法，附带动态难度递增与额外 EXP 结算。"
      ],
      "en": [
        "【Dual-Track QTE】Added independent dual-track QTE mechanics and two-handed liberation for Chapter 4.",
        "【Watermelon Slicing Minigame】Post-battle 3-strike watermelon slicing with dynamic difficulty scaling and bonus EXP."
      ],
      "ja": [
        "【デュアルQTEシステム】第4章向けに左右独立レーンQTEと両手解放奥義を実装。",
        "【スイカ割りミニゲーム】勝利後の3段階スイカ割り判定と動的難易度上昇・ボーナスEXP清算を導入。"
      ]
    }
  },
  {
    version: "0.0.1",
    date: "2026-08-29",
    tag: "Localization & 12-Slot Gear",
    changes: {
      "zh-Hant": [
        "【4 語系在地化】全面支援繁體中文、簡體中文、英文與日文切換。",
        "【12 格位紙娃娃】新增頭盔、胸甲、肩甲、主副手、耳環、腰帶、戒指與鞋子等 12 格位武具系統。",
        "【實時 DPS 分析】引入理論 DPS 與實戰輸出統計紀錄。"
      ],
      "zh-Hans": [
        "【4 语系本地化】全面支持繁体中文、简体中文、英文与日文切换。",
        "【12 格位纸娃娃】新增头盔、胸甲、肩甲、主副手、耳环、腰带、戒指与鞋子等 12 格位武具系统。",
        "【实时 DPS 分析】引入理论 DPS 与实战输出统计纪录。"
      ],
      "en": [
        "【Full 4-Language Localization】Added complete translations for Traditional Chinese, Simplified Chinese, English, and Japanese.",
        "【12-Slot Paperdoll Equipment】Added comprehensive gear system including Helmet, Chestplate, Weapons, Badges, and Accessories.",
        "【DPS Analytics】Introduced Theoretical and Combat DPS metrics in Journey Records."
      ],
      "ja": [
        "【4言語ローカライズ】繁体字、簡体字、英語、日本語の完全対応。",
        "【12部位装備システム】兜、胸甲、主副手武器、耳飾り、指輪、靴などの装備紙人形システムを実装。",
        "【DPS分析】理論DPSおよび実戦DPSの記録・分析機能を導入。"
      ]
    }
  },
  {
    version: "0.0.0",
    date: "2026-08-28",
    tag: "Initial Release",
    changes: {
      "zh-Hant": [
        "【遊戲初始發布】經典和風猜拳博弈、四大章節梯度 BOSS、時機變拳秘術與小樂摸摸互動。"
      ],
      "zh-Hans": [
        "【游戏初始发布】经典和风猜拳博弈、四大章节梯度 BOSS、时机变拳秘术与小乐摸摸互动。"
      ],
      "en": [
        "【Initial Release】Japanese anime shrine aesthetic, 4 Chapter Bosses, Reaction Morph mechanic, and Kohaku pet skill."
      ],
      "ja": [
        "【初回リリース】和風ダーク神社調のじゃんけん勝負、4章のボス階層、時機変拳秘術、小楽なでなでインタラクションを公開。"
      ]
    }
  }
];

const DICTIONARY = {
  "zh-Hant": {
    meta: {
      title: "狐樂・絆之勝負",
      titleEm: "Endless Koraku",
      subtitle: "KORAKU NO SHŌBU",
      eyebrow: "じゃんけん・狐火異聞",
      lead: "五秒定一手。看穿她的指尖，在敗勢裡抓住唯一的反擊。"
    },
    ui: {
      playerProfile: "玩家資料",
      switchLanguage: "切換語系",
      toggleBgm: "切換背景音樂",
      toggleSfx: "切換遊戲音效",
      mainMenu: "主選單",
      battleRecords: "戰績",
      footerInfo: "頁腳資訊",
      changelog: "查看更新日誌",
      galleryZoom: "放大查看全圖",
      galleryZoomTitle: "放大鑑賞 (High-Res)",
      rpsBattle: "猜拳戰鬥",
      toggleAutoBattle: "暫停或繼續自動刷關",
      kohakuHp: "小樂生命值",
      battleLogToggle: "戰鬥紀錄（點擊切換顯示規模）",
      battleLogToggleTitle: "點擊切換顯示規模：最新1筆 / 近5筆 / 全紀錄",
      roundStatus: "本回合狀態",
      playerHpMp: "玩家生命與魔力",
      selectHand: "選擇出拳",
      itemSkillBar: "道具與技能快捷欄",
      counterQte: "反制 QTE",
      directionInput: "方向輸入",
      toggleUiVisibility: "欣賞立繪，隱藏或顯示結算介面",
      toggleUiVisibilityTitle: "欣賞立繪 (隱藏/顯示介面)",
      togglePanelSize: "放大或縮小面板",
      togglePanelSizeTitle: "放大/縮小面板",
      closeOverlay: "收起浮層",
      dojoQtePractice: "修練場 QTE 練習",
      closeModal: "關閉視窗",
      clickSelectAll: "點擊全選",
      openOriginalImage: "在新分頁開啟原圖 (支援雙指縮放與下載)",
      closeGalleryZoom: "關閉放大視圖",
      closeGalleryZoomTitle: "關閉 (ESC)",
      selectRockKey: "選擇石頭 (熱鍵: 1)",
      selectPaperKey: "選擇布 (熱鍵: 2)",
      selectScissorsKey: "選擇剪刀 (熱鍵: 3)",
      selectLeftRockKey: "左手石頭 (熱鍵: 1 或 Q)",
      selectLeftPaperKey: "左手布 (熱鍵: 2 或 W)",
      selectLeftScissorsKey: "左手剪刀 (熱鍵: 3 或 E)",
      selectRightRockKey: "右手石頭 (熱鍵: 7 或 J 或 Num1)",
      selectRightPaperKey: "右手布 (熱鍵: 8 或 K 或 Num2)",
      selectRightScissorsKey: "右手剪刀 (熱鍵: 9 或 L 或 Num3)",
      useHpPotionKey: "使用 HP 藥水 (熱鍵: 4 或 Q)",
      useMorphKey: "一秒內變拳 (熱鍵: F)",
      useMpPotionKey: "使用 MP 藥水 (熱鍵: 5 或 E)",

      home: "首頁",
      level: "等級",
      xp: "經驗",
      changelogTitle: "更新日誌",
      changelogSubtitle: "遊戲版本迭代與修復紀錄",
      closeChangelog: "關閉",
      coins: "星砂",
      soundToggle: "切換遊戲音效",
      sfxToggle: "切換遊戲音效",
      musicToggle: "切換背景音樂",
      musicToggleOn: "開啟背景音樂",
      musicToggleOff: "靜音背景音樂",
      sfxToggleOn: "開啟遊戲音效",
      sfxToggleOff: "靜音遊戲音效",
      musicOnToast: "背景音樂已開啟。",
      musicOffToast: "背景音樂已關閉。",
      sfxOnToast: "遊戲音效已開啟。",
      sfxOffToast: "遊戲音效已關閉。",
      rewardEarned: "獲得獎勵",
      zoomHighRes: "放大鑑賞",
      clickToZoom: "點擊全螢幕放大查看",
      closeLightbox: "關閉視圖",
      langToggle: "語系",
      back: "返回",
      wins: "勝",
      losses: "敗",
      deepestStage: "最深章節",
      receptionSeal: "對戰<br>受付中",
      openCheat: "測試調試 / 作弊選單",
      cheatAuthTitle: "作弊驗證",
      cheatAuthPrompt: "請輸入管理密碼以開啟測試選單：",
      cheatAuthPlaceholder: "輸入密碼 (8989)",
      cheatAuthConfirm: "解鎖選單",
      cheatAuthCancel: "取消",
      cheatAuthError: "密碼錯誤！無法開啟作弊選單。",
      cheatAuthSuccess: "密碼正確，作弊選單已解鎖！",
      galleryUnlockedTag: "已解鎖",
      galleryLockedTag: "尚未解鎖",
      resetSave: "重置存檔",
      resetConfirm: "確定要重置所有存檔進度嗎？此操作無法還原。",
      saveRecord: "存檔紀錄",
      saveRecordModalTitle: "存檔紀錄與種子碼管理",
      saveOverviewTitle: "當前存檔狀態概覽",
      saveOverviewLevel: "冒險等級",
      saveOverviewCoins: "持有星砂",
      saveOverviewStage: "最深章節",
      saveOverviewBattles: "總對局場次",
      saveOverviewEquipCount: "裝備持有",
      btnViewRecordsDetail: "查看戰績統計詳情 ›",
      saveRecordsHint: "存檔種子碼會完整保存所有冒險歷程、全章節戰績、手動/自動勝敗紀錄、歷程 DPS 分析與西瓜切中統計，跨裝置載入時將全部無損還原。",
      saveSeedExportTitle: "導出當前存檔種子碼",
      saveSeedExportDesc: "此字串包含您當前所有的等級、裝備、星砂、配點與戰績紀錄，可用於備份或跨裝置轉移：",
      btnCopySaveSeed: "複製種子碼",
      toastSeedCopied: "存檔種子碼已成功複製到剪貼簿！",
      saveSeedImportTitle: "輸入種子碼（跨裝置載入）",
      saveSeedImportDesc: "貼上其他裝置匯出的存檔種子碼，即可將冒險紀錄帶到本裝置：",
      importSeedPlaceholder: "在此貼上存檔種子碼（如 KORAKU1_...）",
      btnImportSaveSeed: "載入並套用種子碼",
      confirmImportSeed: "載入此種子碼將會覆蓋本裝置當前的存檔進度，確定要載入嗎？",
      confirmAbandonBattle: "現在撤退將不會得到星砂或經驗，確定離開嗎？",
      toastImportSuccess: "存檔種子碼已成功載入並套用！",
      toastImportFailed: "無效或損毀的存檔種子碼，請檢查是否複製完整。",
      toastSeedEmpty: "請先輸入或貼上存檔種子碼。",
      dangerZoneTitle: "存檔重置與刪除管理",
      dangerZoneDesc: "清除本裝置上的所有遊戲進度（等級、星砂、裝備、技能與戰績），回歸初始狀態：",
      btnModalResetSave: "重置存檔（清除所有紀錄）",
      // Online connection, transfer code, export, delete
      connConnecting: "連線中",
      connOnline: "線上連線",
      connOffline: "離線模式",
      connReconnecting: "重新連線中",
      connDisconnected: "連線中斷",
      connBannerConnecting: "正在連線至伺服器...",
      connBannerOnline: "已連線至權威伺服器",
      connBannerOffline: "目前處於本機離線沙盒模式",
      connBannerReconnecting: "連線中斷，正在嘗試重新連線...",
      connBannerDisconnected: "已與伺服器斷開連線",
      connectionModeToggle: "切換連線模式",
      connectionErrorVersionMismatch: "版本不符，請重新整理頁面載入最新版本。",
      connectionRateLimited: "操作過於頻繁，請稍後再試。",
      transferCode: "轉移碼",
      transferCodeModalTitle: "帳號跨裝置轉移碼管理",
      transferCodeIssueTitle: "簽發一次性轉移碼",
      transferCodeIssueDesc: "簽發一次性轉移碼，可在新裝置上輸入以遷移此帳號的所有進度。簽發後有效時間為 15 分鐘。",
      btnIssueTransferCode: "產生轉移碼",
      transferCodePrompt: "您的轉移碼如下（點擊複製）：",
      transferCodeExpiresIn: "有效期限：{minutes} 分鐘",
      btnCopyTransferCode: "複製轉移碼",
      toastTransferCodeCopied: "轉移碼已複製至剪貼簿！",
      transferCodeClaimTitle: "兌換轉移碼（移轉至此裝置）",
      transferCodeClaimDesc: "在下方輸入由原裝置簽發的轉移碼，此裝置將綁定並接收該帳號的所有進度：",
      transferCodePlaceholder: "輸入 8 位數轉移碼（如 KTR-XXXX-XXXX）",
      btnClaimTransferCode: "兌換並載入進度",
      confirmClaimTransferCode: "兌換轉移碼將會切換至該帳號，確定要兌換嗎？",
      toastTransferCodeSuccess: "帳號轉移成功！已載入最新存檔進度。",
      toastTransferCodeInvalid: "無效或已過期的轉移碼，請重新核對或重新簽發。",
      exportJson: "資料匯出 (JSON)",
      exportJsonTitle: "匯出完整帳號資料 (JSON)",
      exportJsonDesc: "下載包含等級、裝備實例、星砂經濟帳本與歷程統計之完整 JSON 存檔檔案：",
      btnDownloadJson: "下載 JSON 備份檔",
      btnCopyJson: "複製 JSON 內容",
      toastExportJsonSuccess: "帳號資料已成功匯出！",
      deleteAccount: "刪除帳號",
      deleteAccountTitle: "徹底刪除帳號與雲端紀錄",
      deleteAccountWarning: "【警告】此操作將永久銷毀伺服器與本機的所有角色數據、裝備與星砂紀錄，且無法透過任何方式復原！",
      deleteAccountConfirmPrompt: "若確認要刪除，請在下方輸入「DELETE」以確認：",
      btnConfirmDeleteAccount: "永久銷毀帳號",
      toastDeleteAccountSuccess: "帳號與所有進度已徹底刪除。",
      toastDeleteAccountMismatch: "確認文字不相符，取消刪除操作。",
      navDojo: "修練場",
      menuDojo: "修練道場",
      menuDojoSub: "QTE & SANDBOX",
      recentDamageLog: "戰鬥紀錄",
      damageSourceRps: "猜拳獲勝",
      damageSourceMorph: "變拳克制",
      damageSourceCounter: "QTE反制",
      damageSourceMomo: "摸摸偷襲",
      damageSourceBurn: "燃燒灼燒",
      damageSourceReflect: "鏡光反彈",
      damageSourceThunder: "神鳴追加",
      damageSourceBurst: "重劍暴擊",
      damageSourceEnemy: "敵方受擊",
      atkLabel: "ATK",
      // Main menu
      menuStages: "開始對局",
      menuStagesSub: "STORY BATTLE",
      menuGrowth: "能力成長",
      menuGrowthSub: "PLAYER GROWTH",
      menuShop: "緣側商店",
      menuShopSub: "ITEM SHOP",
      menuGallery: "狐娘圖鑑",
      menuGallerySub: "ILLUSTRATION GALLERY",
      menuGuide: "遊戲指南",
      menuGuideSub: "HOW TO PLAY",
      menuEquipment: "玩家裝備",
      menuEquipmentSub: "EQUIPMENT & BAG",
      menuRecords: "戰績統計",
      menuRecordsSub: "RECORDS & STATS",
      homeRecordsTitle: "旅程紀錄與戰鬥分析",
      homeRecordsDesc: "詳細記錄您在各章節的戰績、實戰輸出表現、裝備配置與各項成長統計。",
      theoreticalDps: "理論 DPS",
      combatDps: "實戰 DPS",
      currentEquipment: "當前穿戴裝備",
      currentLevelXp: "冒險等級與經驗",
      consumablesUsed: "消耗品使用累計",
      morphSuccesses: "變拳逆轉成功",
      momoStats: "偷摸發動",
      watermelonCutAnalysis: "切西瓜階段命中分析",
      strikeStage: "第 {index} 刀",
      strikeTotal: "三刀加總",
      successRate: "成功率",
      damageDealt: "造成傷害",
      damageTaken: "承受傷害",
      qteSuccessRate: "QTE 成功率",
      rewardsEarned: "獲取獎勵",
      recentBattlesTitle: "最近 100 局對戰紀錄",
      battleDuration: "戰鬥耗時",
      stageDamageDealt: "總造成傷害",
      stageDamageTaken: "總承受傷害",
      hpPotionCountUsed: "HP 藥水使用: {count} 瓶",
      mpPotionCountUsed: "MP 藥水使用: {count} 瓶",
      strikeAttempts: "{attempts} 刀 ({successes} 中 / {failures} 空)",
      resultWin: "勝利",
      resultLoss: "戰敗",
      modeAuto: "自動",
      modeManual: "手動",
      // Screens headings
      stagesTitle: "選擇章節",
      stagesSubtitle: "小樂會隨章節變得更有耐力。提升等級後，新的鏡界便會開啟。",
      shopTitle: "緣側商店",
      shopSubtitle: "選購靈藥與神威武裝。購入之裝備會直接放入裝備背包。",
      growthTitle: "能力成長",
      growthSubtitle: "升級獲得點數分配，或修煉強化必殺與雙手奧義。",
      galleryTitle: "狐娘圖鑑",
      gallerySubtitle: "記錄旅程中的點滴回憶與特別造型插畫。",
      guideTitle: "遊戲指南",
      guideSubtitle: "掌握猜拳決鬥、QTE 反制、時機變拳與雙手奧義的關鍵秘訣。",
      equipmentTitle: "裝備與背包",
      equipmentSubtitle: "穿戴神威裝備強化各項屬性，於對決中發揮特殊靈力加護。",
      // Equipment paperdoll
      paperdollTitle: "當前穿戴裝備",
      paperdollSummaryTitle: "✦ 角色穿戴紙娃娃與屬性總覽（點擊格位可直接卸下裝備）",
      paperdollEquipped: "已穿戴",
      paperdollEmpty: "無裝備",
      paperdollUnequipTip: "（點擊格位卸下）",
      bagTitle: "裝備背包",
      bagEmpty: "背包內目前沒有裝備。可至商店購買！",
      bagEquipBtn: "裝備",
      bagUnequipBtn: "卸下",
      bagEquippedBadge: "已穿戴",
      twoHandedBadge: "雙手武器",
      // Growth
      unallocatedSp: "未分配點數 (SP)",
      statHpName: "生命上限 (HP)",
      statHpDesc: "增加對決中的生存容錯率",
      statMpName: "靈力上限 (MP)",
      statMpDesc: "支撐變拳秘術與技能發動",
      statDmgName: "基礎攻擊 (DMG)",
      statDmgDesc: "提升常規猜拳勝出時的打擊傷害",
      btnAllocate: "分配 +1",
      skillsHeading: "奧義與必殺技能",
      btnUpgradeSkill: "升級技能",
      skillMaxLevel: "已達最高等級",
      skillLocked: "尚未解鎖（需 Lv.{level}）",
      skillCostSp: "消耗 {sp} SP",
      // Shop
      shopPaperdollToggle: "✦ 角色穿戴紙娃娃與屬性總覽（點擊格位可直接卸下裝備）",
      shopConsumablesHeading: "靈露藥水",
      shopEquipmentHeading: "神威裝備武裝",
      btnBuy: "購買",
      btnEquipDirect: "立即穿戴",
      itemOwned: "已持有",
      insufficientCoins: "星砂不足！",
      // Battle
      battleRounds: "回合",
      targetEnemy: "當前鎖定",
      playerLeftHand: "左手",
      playerRightHand: "右手",
      morphSkillBtn: "變拳秘術 (25 MP)",
      useHpPotion: "HP 藥水",
      useMpPotion: "MP 藥水",
      qteFailCount: "失誤",
      qteTimeRemaining: "反制時間",
      dualQteNotice: "雙重 QTE 反制！請連續輸入 WASD / 方向鍵！",
      // Post-battle
      postBattleVictoryTitle: "對局獲勝！",
      postBattleDefeatTitle: "對局惜敗...",
      postBattleVictoryDesc: "成功擊敗了小樂，獲得了豐富的經驗與星砂！",
      postBattleDefeatDesc: "未能抵擋小樂的猛攻，回去整備再戰吧！",
      btnAskSwimsuit: "請小樂換穿泳裝",
      btnPlayWatermelon: "進行海邊切西瓜挑戰",
      btnContinue: "返回章節選單",
      btnRetry: "再次挑戰",
      // Watermelon
      watermelonTitle: "蒙眼切西瓜大挑戰！",
      watermelonDesc: "當指針進入綠色完美區域時按下按鈕，考驗你的直覺與時機！",
      btnSliceWatermelon: "就是現在！切！",
      watermelonScore: "切中次數：",
      autoWatermelonStock: "累計切西瓜次數：{count} / 999",
      btnNextWatermelonRound: "進行下一輪切西瓜 (剩餘 {count})",
      btnStartWatermelonRound: "開始切西瓜",
      floatingWatermelonTitle: "🍉 蒙眼切西瓜 (自動刷關累積)",
      floatingWatermelonAimDesc: "白色指針進入綠色區域時按下揮刀！",
      floatingWatermelonFinished: "本輪三刀結束！累計剩餘：{count} 次",
      floatingWatermelonNoStock: "切西瓜次數已用盡，等待自動刷關勝場累積中...",
      // Guide
      guideRpsTitle: "基礎猜拳規則",
      guideRpsDesc: "剪刀剋布、布剋石頭、石頭剋剪刀。猜贏對小樂造成傷害，平手可能觸發摸摸，猜輸進入 QTE 反制階段。",
      guideQteTitle: "QTE 絕地反制",
      guideQteDesc: "猜輸後在限定時間內依序輸入方向鍵。反制成功可免除傷害並給予小樂反擊；失敗則承受重擊。",
      guideMorphTitle: "時機變拳秘術",
      guideMorphDesc: "在看到小樂出拳後的極短反應窗口內消耗 MP 發動變拳，可在 2 秒內手動選擇手勢反制小樂！若按錯將承擔輸拳或平手摸摸判定。",
      guideDualTitle: "雙手解放奧義",
      guideDualDesc: "在第四章解鎖雙手技能後，可同時以左手與右手獨立出拳，分別對決兩位小樂！",
      // Cheat Modal
      cheatModalTitle: "測試調試 / 作弊選單",
      cheatSetLevel: "設定等級",
      cheatAddCoins: "增加星砂 (+1000)",
      cheatAddSp: "增加技能點 (+50)",
      cheatUnlockAllStages: "解鎖所有關卡",
      cheatUnlockAllGallery: "解鎖所有圖鑑",
      cheatMaxAll: "滿級 + 99999 星砂 + 100 SP",
      cheatAddPotions: "獲得各 10 瓶藥水",
      cheatAddAllEquip: "獲得全套神威裝備",
      cheatClose: "關閉",
      // Stats summary
      statDamage: "攻擊",
      statHp: "生命",
      statMp: "魔力",
      statArmor: "減傷",
      statDodge: "閃避",
      statMpRegen: "魔力回復",
      statReflect: "反彈",
      statBurn: "燃燒",
      statFreeze: "冰凍",
      statThunder: "雷擊",
      statMomoBonus: "摸摸加成",
      statCoinBonus: "星砂加成",
      // Action strings
      enterStage: "進入對局　›",
      stageNeedLevel: "需達 Lv. {level}　🔒",
      stageCleared: "已締結・再次挑戰　✓",
      ruleFocus: "規則重點：",
      winReward: "勝利獎勵：",
      notCleared: "尚未通關",
      unlockRuleAfterClear: "打贏此關卡後揭曉具體規則",
      equippedBadge: "已裝備 ✓",
      ownedInBag: "背包持有",
      equipNow: "即刻穿戴",
      equipBuy: "購入",
      twoHandedOccupied: "⚔️ (雙手佔用)",
      unitDamage: "每次勝利傷害",
      unitMaxHp: "最大 HP",
      unitMaxMp: "最大 MP",
      statAllocDmgDesc: "每投入 1 點，對小樂造成的傷害增加 5。",
      statAllocHpDesc: "每投入 1 點，最大生命增加 10。",
      statAllocMpDesc: "每投入 1 點，最大魔力增加 10。",
      spInvestBtn: "投入 1 SP　＋",
      momoProcRate: "平手發動率",
      dualHandUnlocked: "已解放",
      dualHandLocked: "未解鎖",
      dualHandDescSub: "第四關雙手出拳",
      nextLevelRate: "下一級機率: {chance}%",
      notYetUnlocked: "尚未解鎖",
      unlockSwimsuitHint: "於對局勝利後觸發泳裝事件以解鎖",
      unlock2PHint: "需戰勝終ノ章（第四關）1 次以解鎖",
      btnAskSwimsuitSpace: "請小樂穿泳裝",
      btnPlayWatermelonSpace: "玩蒙眼切西瓜",
      btnNextStrikeSpace: "進行第 {attempt} 刀",
      btnRematch: "再次挑戰",
      btnSelectStages: "選擇章節",
      btnReturnHome: "回大廳",
      unrevealed: "未揭曉",
      preparing: "準備中",
      countdownCaption: "出拳倒數",
      morphCaption: "按 F 變拳",
      morphSelectCaption: "2秒內選擇變拳手勢！",
      qteCaption: "反制機會",
      settleCaption: "回合結算",
      battleWon: "勝",
      battleLost: "負",
      battleDraw: "和",
      // Auto-Battle & Frost & Pause
      btnAutoBattle: "⚡ 自動刷關",
      autoBattleModalTitle: "⚡ 自動連續刷關設定",
      autoBattleModalDesc: "連續自動進行關卡對局，依據角色當前屬性與裝備配置挑戰。獲勝時直接跳過切西瓜領取獎勵並接續下一場；失敗時自動扣除次數繼續重試。",
      autoBattleCountLabel: "選擇連續刷關次數：",
      autoBattleTimes: "{count} 次",
      btnStartAutoBattle: "⚡ 開始自動刷關",
      btnCancel: "取消",
      btnStopAutoBattle: "⏹ 停止刷關",
      btnPauseAutoBattle: "暫停刷關",
      btnResumeAutoBattle: "繼續刷關",
      autoBattleHudPaused: "自動刷關已暫停：第 {current} / {total} 次（勝: {wins}, 敗: {losses}）",
      autoBattleToastPaused: "已暫停自動刷關，可手動操作或再次點擊繼續。",
      autoBattleToastResumed: "已繼續自動刷關。",
      autoBattleHudRunning: "自動刷關中：第 {current} / {total} 次（勝: {wins}, 敗: {losses}）",
      autoBattleToastUpdateWin: "自動刷關：獲勝！剩餘 {remaining} 場...",
      autoBattleToastUpdateLoss: "自動刷關：戰敗！剩餘 {remaining} 場...",
      autoBattleToastFinished: "🎉 自動刷關完成！共進行 {total} 場（勝: {wins}, 敗: {losses}）。",
      autoBattleToastStopped: "已手動停止自動刷關。",
      mustClearOnceForAuto: "必須先手動戰勝該關卡一次後，才可開啟自動刷關！",
      frozenBadge: "❄️ 霜月冰結：小樂【{hand}】已被封印！",
      ownedCount: "擁有 {total}",
      equippedCountBadge: "(已裝備 {count})",
      pauseModalTitle: "⏸️ 對局暫停中",
      pauseModalDesc: "戰鬥與 QTE 計時已完全暫停。您可以隨時繼續對局，或放棄本場戰鬥返回大廳。",
      btnResumeBattle: "繼續戰鬥",
      btnAbandonBattle: "放棄對局 (返回大廳)",
      abandonBattleModalTitle: "⚠️ 離開對局確認",
      abandonBattleModalDesc: "確定要離開對戰嗎？離開將會失去當前戰鬥進度與未結算的獎勵！",
      btnConfirmAbandon: "確定離開",
      btnCancelAbandon: "繼續戰鬥",
      toggleSettlementUi: "欣賞立繪",
      hideSettlementUi: "欣賞立繪",
      showSettlementUi: "顯示介面",
      selectLanguage: "切換語系",
      homeRecordsTitle: "戰績與資源統計",
      homeRecordsDesc: "紀錄您與小樂的每一場對局、手動戰績、自動刷關成果及累計獲取的所有資源。",
      statTotalCoinsEarned: "累計獲得星砂",
      statTotalXpEarned: "累計獲得經驗",
      statTotalBattles: "總對局場次",
      statManualRecord: "手動對決戰績",
      statAutoRecord: "自動刷關戰績",
      statWatermelonHits: "西瓜切中累計",
      stageAttempts: "挑戰 {total} 次",
      stageRecordBadge: "自動勝 {autoWins} / 手動敗 {manualLosses}",
      stageStatsBreakdownTitle: "各章節挑戰統計",
      footerEndlessAliceLink: "前往 Steam 探索《Endless Alice》",
      times: "次",
    },
    hands: {
      rock: { label: "石頭", glyph: "✊" },
      paper: { label: "布", glyph: "✋" },
      scissors: { label: "剪刀", glyph: "✌" }
    },
    directions: {
      upLeft: "左上",
      up: "上",
      upRight: "右上",
      left: "左",
      right: "右",
      downLeft: "左下",
      down: "下",
      downRight: "右下"
    },
    stages: {
      1: {
        chapter: "壹ノ章",
        name: "初逢・朱鳥居",
        subtitle: "先從看穿她的小動作開始",
        bossRuleSummary: "5 秒／4 向容錯",
        bossRuleDetail: "亮拳倒數 5 秒、QTE 僅出現正 4 方向（按錯不計失敗），變拳時機 1.0 秒，小樂不閃避摸摸。"
      },
      2: {
        chapter: "貳ノ章",
        name: "夕映・狐火",
        subtitle: "黃昏會把猶豫照得一清二楚",
        bossRuleSummary: "3 秒",
        bossRuleDetail: "亮拳倒數 3 秒、QTE 包含 8 方向（按錯 2 次失敗），變拳時機 0.75 秒，小樂有 11% 機率閃避摸摸。"
      },
      3: {
        chapter: "參ノ章",
        name: "月下・九尾試",
        subtitle: "別被九道殘影騙走視線",
        bossRuleSummary: "3 秒",
        bossRuleDetail: "亮拳倒數 3 秒、QTE 7 鍵長度（按錯 1 次失敗），變拳時機 0.5 秒，小樂有 33% 機率閃避摸摸。"
      },
      4: {
        chapter: "終ノ章",
        name: "鏡界・白金小樂",
        subtitle: "跨越鏡面，迎戰雙生的 2P 色",
        bossRuleSummary: "3 秒／雙小樂雙血條",
        bossRuleDetail: "亮拳倒數 3 秒、雙小樂雙血條（受擊 2 倍傷害）、7 鍵 QTE，極限變拳時機 0.25 秒，小樂有 66% 機率閃避摸摸。"
      }
    },
    skills: {
      momo: {
        name: "摸摸",
        glyph: "撫",
        description: "平手時以機率自動發動，偷摸摸場上隨機一個小樂對其造成 25 點傷害。"
      },
      dualHand: {
        name: "雙手解放",
        glyph: "掌",
        description: "解放另一隻手！在第四關對決中可同時使用左手（對左小樂）與右手（對右小樂）獨立出拳。"
      }
    },
    items: {
      hpPotion: {
        name: "緋露藥",
        shortName: "HP 藥水",
        description: "神社特製緋紅靈露，使用後立即恢復 25 點生命值。"
      },
      mpPotion: {
        name: "蒼月露",
        shortName: "MP 藥水",
        description: "汲取月華凝成的靈泉，使用後立即恢復 25 點靈力值。"
      }
    },
    equipmentSlots: {
      head: "頭盔",
      shoulders: "肩甲",
      chest: "胸甲",
      belt: "腰帶",
      boots: "鞋子",
      mainHand: "主手武器",
      offHand: "副手武防",
      ring1: "戒指 1",
      ring2: "戒指 2",
      earring1: "耳環 1",
      earring2: "耳環 2",
      badge: "胸章"
    },
    equipment: {
      chest_samurai: {
        name: "玄武・金剛胸甲",
        description: "玄武神靈加護的重型鎧甲。受到的傷害直接減免 25 點（可與盾牌減傷疊加）。"
      },
      chest_ninja: {
        name: "靈狐・幻影羽織",
        description: "由九尾狐毛編織的靈幻羽織。猜輸受擊時有 25% 機率觸發殘影閃避，完全免疫本次傷害！"
      },
      chest_miko: {
        name: "淨世・白狐千早",
        description: "神社巫女穿著的純白千早服。每回合結束時回復 15 點 MP。"
      },
      chest_mirror: {
        name: "八咫・鏡光護胸",
        description: "鑲嵌神鏡碎片的護胸裝甲。受到小樂攻擊時，以鏡光反彈 40 點傷害給小樂。"
      },
      sword_flame: {
        name: "業火・炎之太刀",
        description: "刀身繚繞著永不熄滅的狐火。回合結束時對小樂造成 30 點燃燒傷害。"
      },
      sword_frost: {
        name: "霜月・冰結靈刃",
        description: "散發刺骨寒氣的靈刃。攻擊命中時 30% 機率觸發霜月冰結，隨機封印小樂下一回合的其中一種出拳手勢。"
      },
      sword_thunder: {
        name: "雷霆・神鳴迅劍",
        description: "雷鳴纏繞的刺劍。QTE 反制成功時追加 50 點雷擊傷害。"
      },
      sword_great_nine: {
        name: "破滅・九尾雙手巨劍",
        description: "蘊含九尾狂氣的雙手大劍（佔用雙手）。常規出拳獲勝傷害提高為 1.5 倍。"
      },
      shield_suzaku: {
        name: "結界・朱雀盾",
        description: "刻有朱雀神紋的靈盾。受到的猜輸與 QTE 失敗傷害降低 30 點。"
      },
      dagger_shadow: {
        name: "影月・短匕",
        description: "隱於夜幕的短匕。可裝備於主手或副手，平手摸摸傷害額外 +15 點。"
      },
      helm_fox: {
        name: "妖狐面具",
        description: "依小樂容貌雕琢的靈狐面具。提供均衡的生命、魔力與攻擊加成。"
      },
      shoulders_crimson: {
        name: "緋紅之肩鎧",
        description: "鳥居朱漆淬鍊的堅固肩鎧。大幅提升生命上限與攻擊力。"
      },
      belt_shimenawa: {
        name: "注連繩神靈腰帶",
        description: "神社結界編織的神繩腰帶。藥水回復效果額外提升 10 點。"
      },
      boots_gale: {
        name: "疾風之草履",
        description: "踏風而行的神行草履。QTE 反制時間延長 1.0 秒。"
      },
      earring_magatama: {
        name: "八尺瓊・勾玉耳環",
        description: "翠綠溫潤的古老勾玉。變拳技能 MP 消耗降低 5 點。"
      },
      ring_ruby: {
        name: "狐火紅玉戒指",
        description: "封印狐火靈氣的紅寶石戒指。提升生命與攻擊。"
      },
      ring_sapphire: {
        name: "月華藍玉戒指",
        description: "映照幽藍月光的寶石戒指。提升魔力與攻擊。"
      },
      badge_bond: {
        name: "絆之守護胸章",
        description: "與小樂深厚羈絆的信物。全面提升能力，且戰勝時額外獲得 20% 星砂。"
      }
    },
    dojo: {
      modalTitle: "修練場・特訓選單",
      modalSubtitle: "鍛鍊反應神經，測試數值與配裝極限",
      mode1Title: "模式一：純 QTE 無限反應練習",
      mode1Desc: "無猜拳與回合等待，純粹連續生成 QTE 按鍵指令，即時鍛鍊反應與鍵位記憶。",
      mode1Style1: "第一式・單軌連續 QTE",
      mode1Style1Desc: "標準 8 方向單軌鍵盤連續輸入練習",
      mode1Style2: "第二式・雙軌同步 QTE",
      mode1Style2Desc: "模擬第四關雙生 Boss 雙軌情境（左手 WASD，右手 方向鍵）",
      mode2Title: "模式二：戰鬥模擬與 DPS 測試沙盒",
      mode2Desc: "完整保留標準戰鬥節奏，對戰全黑小樂剪影假人，可自訂 HP 與傷害，無敗北壓力。",
      mode2Style1: "第一式・單體假人對決",
      mode2Style1Desc: "單個全黑剪影假人，測試單體 DPS 與變拳/反擊",
      mode2Style2: "第二式・雙生假人對決",
      mode2Style2Desc: "雙個全黑剪影假人，模擬第四關雙手出拳與雙軌反制",
      customHpLabel: "假人生命值 (HP)",
      customDmgLabel: "假人傷害值 (ATK)",
      zeroDamageHint: "（預設 0 傷害，對玩家無傷害，無敗北壓力）",
      btnStartPractice: "開始修練",
      btnExitDojo: "結束修練",
      combo: "連擊",
      maxCombo: "最高連擊",
      avgReaction: "平均反應",
      successRate: "成功率",
      dummySilhouette: "影・小樂",
      dummySilhouetteLeft: "影・小樂（左）",
      dummySilhouetteRight: "影・小樂（右）",
      chapterName: "修練場",
      dojoStatsTitle: "修練結算報告",
      btnReturnDojoMenu: "返回修練選單"
    },
    gallery: {
      koraku_default: {
        name: "巫女社・狐娘小樂",
        variantName: "預設造型",
        description: "守護朱鳥居的狐娘小樂。一身俐落的機甲巫女裝扮，總是帶著自信的微笑迎接挑戰者。"
      },
      koraku_2p: {
        name: "鏡界・白金小樂",
        variantName: "2P色小樂",
        description: "跨越鏡界之後顯現的白金姿態。銀髮與冰藍光芒交織，唯有突破終章試煉者方能得見。"
      },
      swimsuit_default: {
        name: "夏日祭・清涼泳裝",
        variantName: "預設泳裝",
        description: "小樂難得換上的清涼泳裝。在對局勝出後方能一窺風采。"
      },
      swimsuit_watermelon: {
        name: "海風・切西瓜",
        variantName: "切西瓜",
        description: "蒙眼切西瓜大獲全勝後，小樂得意洋洋展示成果的模樣。"
      }
    },
    dialogue: {
      watermelonNotAim: "西瓜遊戲尚未進入瞄準階段。",

      speakerPlayer: "旅人",
      speakerKohaku: "小樂",
      speakerPlatinumKohaku: "白金小樂",
      speakerNarrator: "旁白",
      homeGreeting: "準備好了嗎？這次可別把視線移開喔。",
      introNormal: "出拳一決。讓我看看你的決心吧。",
      introFinal: "鏡中的我，可不會手下留情。",
      chant3: "剪刀",
      chant2: "石頭",
      chant1: "布！",
      morphReaction: "咦……在最後一瞬間變拳了？",
      qteSingleBreak: "抓到破綻了！想躲開的話，就跟上我的節奏！",
      qteDualBreak: "雙重破綻！跟上我們的雙生節奏吧！",
      winDualMorphBoth: "雙手皆以變拳勝出！雙生之勢全數瓦解！",
      winDualBoth: "雙手皆贏！完美的雙重壓制！",
      winDualMorphSingle: "藉由變拳突破單側防線！",
      winDualSingle: "突破單側防線！",
      winDualMorphDoubleDmg: "雙手變拳全勝！造成雙倍傷害！",
      winDualDoubleDmg: "雙手出拳全勝！造成雙倍傷害！",
      winSingleMorph: "變拳逆轉獲勝！",
      winSingleNormal: "出拳獲勝！",
      drawMomoDodge: "平手之際試圖摸摸，但被{target}輕巧地躲開了！",
      drawMomoHit: "平手之際趁機摸摸！對{target}造成了 {damage} 點偷襲傷害！",
      drawNormal: "不分勝負，雙方平手！",
      deflectedSingleAttack: "化解了{target}的攻擊！",
      dualQteMiss: "雙生 QTE 反制失誤！",
      dualQteSuccess: "雙生 QTE 反制成功！完全逆轉戰局！",
      qteMiss: "QTE 反制失敗！",
      freezeNarration: "霜月冰結！小樂的「{hand}」被封印了！",
      dodgeDodge: "殘影閃避！成功避開了攻擊！",
      dodgeDodgeDual: "殘影閃避！避開了雙重攻擊！",
      postBattleWin: "這次是你贏了。要把勝利用在什麼願望上呢？",
      postBattleLoss: "還有什麼要說的嗎？回去再練練吧！",
      askSwimsuitLine: "泳裝？真拿你沒辦法……只准看一下喔。",
      watermelonAttempt: "第 {nextAttempt} 刀。白色指針進入綠色區域時，就喊『就是現在！』！",
      watermelonHit: "漂亮！這一刀切中了。還有 {remaining} 刀。",
      watermelonMiss: "差一點點！還有 {remaining} 刀，下一次再來。",
      watermelonAllHit: "三刀都結束了！切中 {successes} 次，真是有趣呢！",
      watermelonDone: "三刀都結束了。下次再一起抓準時機吧。",
      itemUsed: "使用「{name}」，恢復了 {restored} 點 {resource}。",
      serverDisconnectGrace: "連線中斷，正在為您保留戰鬥狀態（10 秒寬限期）...",
      serverConfigMismatch: "偵測到伺服器版本更新，請重新整理頁面以取得最新遊戲內容。",
      serverSessionReplaced: "您的帳號已在其他裝置或分頁連線，本連線已中斷。",
      serverInvalidCommand: "操作無法執行：{reason}",
      serverLockedInBattle: "戰鬥進行中，無法進行裝備更換或屬性配點！"
    },
    narration: {
      qteCounterPaper: "用手包裹住小樂的剪刀手——反制成功！",
      qteCounterScissors: "用布握住了小樂的小拳頭——反制成功！",
      qteCounterRock: "用五指交扣了小樂的軟綿綿小手手，離奇獲勝！"
    },
    toast: {
      levelRequirementNotMet: "等級尚未達到這一章的挑戰條件。"
    },
    combat: {
      morphWindowOnly: "變拳只能在看見小樂出拳後的反應時間內使用。",
      morphWindowExpired: "反應時間已過。",
      insufficientMp: "MP 不足，無法使用變拳。",
      tookDamage: "受到傷害",
      notInBattle: "目前不在戰鬥中。",
      itemNotFound: "找不到這個道具。",
      resourceFull: "{resource} 已經是滿的。",
      itemDepleted: "{name}已用完。"
    },
    shop: {
      itemNotFound: "找不到這件商品。",
      insufficientCoins: "星砂不足，完成對局後再來吧。",
      itemPurchased: "購入「{name}」！",
      equipmentPurchased: "購入「{name}」並已放入裝備背包！"
    },
    equip: {
      invalidItem: "無效的裝備。",
      notInInventory: "背包中沒有這件裝備。",
      invalidSlot: "無效的裝備欄位。",
      incompatibleSlot: "無法將「{name}」穿戴至 {slotName}。",
      equipped: "已穿戴「{name}」。",
      slotEmpty: "此欄位未裝備任何物品。",
      unequipped: "已卸下裝備。"
    },
    growth: {
      invalidStat: "無效的能力項目。",
      noPoints: "目前沒有可用點數。",
      statIncreased: "能力提升了。",
      invalidSkill: "無效的技能項目。",
      levelRequirementNotMet: "等級需達 Lv. {level} 方可學習此技能。",
      skillMaxLevel: "此技能已達最高等級。",
      insufficientPoints: "技能點數不足。",
      skillUpgraded: "「{name}」升級至 Lv. {level}！"
    },
    cheat: {
      updated: "數值已更新！",
      unlockedAll: "已解鎖全部 4 個關卡與 BOSS 說明！",
      unlockedGallery: "已解鎖全部圖鑑立繪！"
    },
    save: {
      transferCodeRequired: "請輸入轉移代碼。",
      transferCodeNotFound: "找不到此轉移代碼。",
      transferCodeAlreadyClaimed: "此轉移代碼已被使用。",
      transferCodeExpired: "轉移代碼已過期。",
      transferClaimFailed: "轉移代碼兌換失敗。",

      invalidCode: "請輸入有效的種子碼。",
      corruptCode: "無效或損毀的存檔種子碼。",
      imported: "存檔已成功載入！"
    },
    connection: {
      newConnectionEstablished: "此帳號已從另一裝置連線，您已被登出。",

      connecting: "連線中",
      online: "線上連線",
      offline: "離線模式",
      reconnecting: "重新連線中",
      disconnected: "連線中斷",
      highLatency: "延遲",
      kickedByNewConnection: "帳號已在其他裝置或分頁登入，本連線已安全斷開。",
      disconnectCountdown: "連線中斷，正在嘗試重新連線（剩餘 {seconds} 秒自動結算）...",
      bannerConnecting: "正在連線至伺服器...",
      bannerOnline: "已連線至權威伺服器",
      bannerOffline: "目前處於本機離線沙盒模式",
      bannerReconnecting: "連線中斷，正在嘗試重新連線...",
      bannerDisconnected: "已與伺服器斷開連線"
    },
    battle: {
      lockedDuringBattle: "戰鬥進行中已鎖定換裝與配點。"
    },
    battleLog: {
      lockedDuringBattle: "戰鬥進行中已鎖定換裝與配點。",
      battleInProgress: "戰鬥正在進行中。",
      battleStartFailed: "無法開始戰鬥。",
      noActiveBattle: "目前沒有進行中的戰鬥。",
      invalidPhasePause: "只能在倒數階段暫停。",
      useItemFailed: "道具使用失敗。",

      rpsWin: "猜拳【{hand}】獲勝，對 {target} 造成 {damage} 點傷害！",
      rpsLoss: "猜拳【{hand}】惜敗，受到 {damage} 點傷害！",
      rpsDraw: "雙方皆出【{hand}】，平手！",
      morphSuccess: "變拳【{hand}】逆轉成功！對 {target} 造成 {damage} 點傷害！",
      morphFailed: "變拳手勢被克制，判定失誤！",
      qteCounterSuccess: "QTE 絕地反制成功！解除危機並對 {target} 造成 {damage} 點反擊傷害！",
      qteCounterFail: "QTE 反制失敗！承受了 {damage} 點重擊！",
      momoProc: "摸摸平手偷襲發動！對 {target} 造成 {damage} 點偷襲傷害！",
      momoDodged: "小樂靈巧地閃避了摸摸偷襲！",
      burnDamage: "火焰太刀狐火灼燒，對 {target} 造成 {damage} 點燃燒傷害！",
      reflectDamage: "八咫鏡光反彈！將 {damage} 點傷害回敬給 {target}！",
      thunderDamage: "雷霆神鳴追加！對 {target} 額外追加 {damage} 點雷擊傷害！",
      frostFreeze: "霜月冰結靈刃發動！隨機封印了小樂下一回合的【{hand}】！",
      shadowDodge: "靈狐幻影羽織發動！25% 殘影成功完全迴避了本次傷害！",
      mpRegen: "淨世白狐千早發動！回合結算回復了 {amount} 點 MP。",
      potionUsed: "使用了【{item}】，恢復了 {amount} 點 {stat}！",
      roundTimeout: "出拳倒數逾時，判定為棄權輸拳！",
      battleDisconnectedSettled: "戰鬥因逾時未連線自動結算完成。",
      battlePauseCount: "戰鬥已暫停（本場剩餘暫停次數：{remaining} 次）。"
    }
  },

  "zh-Hans": {
    meta: {
      title: "狐乐・绊之胜负",
      titleEm: "Endless Koraku",
      subtitle: "KORAKU NO SHŌBU",
      eyebrow: "じゃんけん・狐火异闻",
      lead: "五秒定一手。看穿她的指尖，在败势中抓住唯一的反击。"
    },
    ui: {
      playerProfile: "玩家资料",
      switchLanguage: "切换语言",
      toggleBgm: "切换背景音乐",
      toggleSfx: "切换游戏音效",
      mainMenu: "主菜单",
      battleRecords: "战绩",
      footerInfo: "页脚信息",
      changelog: "查看更新日志",
      galleryZoom: "放大查看全图",
      galleryZoomTitle: "放大鉴赏 (High-Res)",
      rpsBattle: "猜拳战斗",
      toggleAutoBattle: "暂停或继续自动刷关",
      kohakuHp: "小乐生命值",
      battleLogToggle: "战斗纪录（点击切换显示规模）",
      battleLogToggleTitle: "点击切换显示规模：最新1条 / 近5条 / 全记录",
      roundStatus: "本回合状态",
      playerHpMp: "玩家生命与魔力",
      selectHand: "选择出拳",
      itemSkillBar: "道具与技能快捷栏",
      counterQte: "反制 QTE",
      directionInput: "方向输入",
      toggleUiVisibility: "欣赏立绘，隐藏或显示结算界面",
      toggleUiVisibilityTitle: "欣赏立绘 (隐藏/显示界面)",
      togglePanelSize: "放大或缩小面板",
      togglePanelSizeTitle: "放大/缩小面板",
      closeOverlay: "收起浮层",
      dojoQtePractice: "修练场 QTE 练习",
      closeModal: "关闭窗口",
      clickSelectAll: "点击全选",
      openOriginalImage: "在新标签页打开原图 (支持双指缩放与下载)",
      closeGalleryZoom: "关闭放大视图",
      closeGalleryZoomTitle: "关闭 (ESC)",
      selectRockKey: "选择石头 (热键: 1)",
      selectPaperKey: "选择布 (热键: 2)",
      selectScissorsKey: "选择剪刀 (热键: 3)",
      selectLeftRockKey: "左手石头 (热键: 1 或 Q)",
      selectLeftPaperKey: "左手布 (热键: 2 或 W)",
      selectLeftScissorsKey: "左手剪刀 (热键: 3 或 E)",
      selectRightRockKey: "右手石头 (热键: 7 或 J 或 Num1)",
      selectRightPaperKey: "右手布 (热键: 8 或 K 或 Num2)",
      selectRightScissorsKey: "右手剪刀 (热键: 9 或 L 或 Num3)",
      useHpPotionKey: "使用 HP 药水 (热键: 4 或 Q)",
      useMorphKey: "一秒内变拳 (热键: F)",
      useMpPotionKey: "使用 MP 药水 (热键: 5 或 E)",

      menuRecords: "战绩统计",
      menuRecordsSub: "RECORDS & STATS",
      homeRecordsTitle: "旅程纪录与战斗分析",
      homeRecordsDesc: "详细记录您在各章节的战绩、实战输出表现、装备配置与各项成长统计。",
      theoreticalDps: "理论 DPS",
      combatDps: "实战 DPS",
      currentEquipment: "当前穿戴装备",
      currentLevelXp: "冒险等级与经验",
      consumablesUsed: "消耗品使用累计",
      morphSuccesses: "变拳逆转成功",
      momoStats: "偷摸发动",
      watermelonCutAnalysis: "切西瓜阶段命中分析",
      strikeStage: "第 {index} 刀",
      strikeTotal: "三刀加总",
      successRate: "成功率",
      damageDealt: "造成伤害",
      damageTaken: "承受伤害",
      qteSuccessRate: "QTE 成功率",
      rewardsEarned: "获取奖励",
      recentBattlesTitle: "最近 100 局对战纪录",
      battleDuration: "战斗耗时",
      stageDamageDealt: "总造成伤害",
      stageDamageTaken: "总承受伤害",
      hpPotionCountUsed: "HP 药水使用: {count} 瓶",
      mpPotionCountUsed: "MP 药水使用: {count} 瓶",
      strikeAttempts: "{attempts} 刀 ({successes} 中 / {failures} 空)",
      resultWin: "胜利",
      resultLoss: "战败",
      modeAuto: "自动",
      modeManual: "手动",
      statTotalCoinsEarned: "累计获得星砂",
      statTotalXpEarned: "累计获得经验",
      statTotalBattles: "总对战场次",
      statManualRecord: "手动对决战绩",
      statAutoRecord: "自动刷关战绩",
      statWatermelonHits: "西瓜切中累计",
      stageAttempts: "挑战 {total} 次",
      stageRecordBadge: "自动胜 {autoWins} / 手动败 {manualLosses}",
      stageStatsBreakdownTitle: "各章节挑战统计",
      footerEndlessAliceLink: "前往 Steam 探索《Endless Alice》",
      times: "次",
      home: "首页",
      level: "等级",
      xp: "经验",
      changelogTitle: "更新日志",
      changelogSubtitle: "游戏版本迭代与修复纪录",
      closeChangelog: "关闭",
      coins: "星砂",
      soundToggle: "切换游戏音效",
      sfxToggle: "切换游戏音效",
      musicToggle: "切换背景音乐",
      musicToggleOn: "开启背景音乐",
      musicToggleOff: "静音背景音乐",
      sfxToggleOn: "开启游戏音效",
      sfxToggleOff: "静音游戏音效",
      musicOnToast: "背景音乐已开启。",
      musicOffToast: "背景音乐已关闭。",
      sfxOnToast: "游戏音效已开启。",
      sfxOffToast: "游戏音效已关闭。",
      rewardEarned: "获得奖励",
      zoomHighRes: "放大鉴赏",
      clickToZoom: "点击全屏放大查看",
      closeLightbox: "关闭视图",
      langToggle: "语言",
      back: "返回",
      wins: "胜",
      losses: "负",
      deepestStage: "最深章节",
      receptionSeal: "对战<br>接待中",
      openCheat: "测试调试 / 作弊菜单",
      cheatAuthTitle: "作弊验证",
      cheatAuthPrompt: "请输入管理密码以开启测试菜单：",
      cheatAuthPlaceholder: "输入密码 (8989)",
      cheatAuthConfirm: "解锁菜单",
      cheatAuthCancel: "取消",
      cheatAuthError: "密码错误！无法开启作弊菜单。",
      cheatAuthSuccess: "密码正确，作弊菜单已解锁！",
      galleryUnlockedTag: "已解锁",
      galleryLockedTag: "尚未解锁",
      resetSave: "重置存档",
      resetConfirm: "确定要重置所有存档进度吗？此操作无法撤销。",
      saveRecord: "存档记录",
      saveRecordModalTitle: "存档记录与种子码管理",
      saveOverviewTitle: "当前存档状态概览",
      saveOverviewLevel: "冒险等级",
      saveOverviewCoins: "持有星砂",
      saveOverviewStage: "最深章节",
      saveOverviewBattles: "总对战场次",
      saveOverviewEquipCount: "装备持有",
      btnViewRecordsDetail: "查看战绩统计详情 ›",
      saveRecordsHint: "存档种子码会完整保存所有冒险历程、全章节战绩、手动/自动胜败记录、历程 DPS 分析与西瓜切中统计，跨设备加载时将全部无损还原。",
      saveSeedExportTitle: "导出当前存档种子码",
      saveSeedExportDesc: "此字符串包含您当前所有的等级、装备、星砂、配点与战绩记录，可用于备份或跨设备转移：",
      btnCopySaveSeed: "复制种子码",
      toastSeedCopied: "存档种子码已成功复制到剪贴板！",
      saveSeedImportTitle: "输入种子码（跨设备加载）",
      saveSeedImportDesc: "粘贴其他设备导出的存档种子码，即可将冒险记录同步至本设备：",
      importSeedPlaceholder: "在此粘贴存档种子码（如 KORAKU1_...）",
      btnImportSaveSeed: "加载并应用种子码",
      confirmImportSeed: "加载此种子码将会覆盖本设备当前的存档进度，确定要加载吗？",
      confirmAbandonBattle: "现在撤退将不会得到星砂或经验，确定离开吗？",
      toastImportSuccess: "存档种子码已成功加载并应用！",
      toastImportFailed: "无效或损坏的存档种子码，请检查是否完整复制。",
      toastSeedEmpty: "请先输入或粘贴存档种子码。",
      dangerZoneTitle: "存档重置与删除管理",
      dangerZoneDesc: "清除本设备上的所有游戏进度（等级、星砂、装备、技能与战绩），回归初始状态：",
      btnModalResetSave: "重置存档（清除所有记录）",
      // Online connection, transfer code, export, delete
      connConnecting: "连接中",
      connOnline: "在线连接",
      connOffline: "离线模式",
      connReconnecting: "重新连接中",
      connDisconnected: "连接中断",
      connBannerConnecting: "正在连接至服务器...",
      connBannerOnline: "已连接至权威服务器",
      connBannerOffline: "当前处于本地离线沙盒模式",
      connBannerReconnecting: "连接中断，正在尝试重新连接...",
      connBannerDisconnected: "已与服务器断开连接",
      connectionModeToggle: "切换连接模式",
      connectionErrorVersionMismatch: "版本不符，请刷新页面加载最新版本。",
      connectionRateLimited: "操作过于频繁，请稍后再试。",
      transferCode: "转移码",
      transferCodeModalTitle: "账号跨设备转移码管理",
      transferCodeIssueTitle: "签发一次性转移码",
      transferCodeIssueDesc: "签发一次性转移码，可在新设备上输入以迁移此账号的所有进度。签发后有效时间为 15 分钟。",
      btnIssueTransferCode: "生成转移码",
      transferCodePrompt: "您的转移码如下（点击复制）：",
      transferCodeExpiresIn: "有效期限：{minutes} 分钟",
      btnCopyTransferCode: "复制转移码",
      toastTransferCodeCopied: "转移码已复制至剪贴板！",
      transferCodeClaimTitle: "兑换转移码（迁移至此设备）",
      transferCodeClaimDesc: "在下方输入由原设备签发的转移码，此设备将绑定并接收该账号的所有进度：",
      transferCodePlaceholder: "输入 8 位数转移码（如 KTR-XXXX-XXXX）",
      btnClaimTransferCode: "兑换并加载进度",
      confirmClaimTransferCode: "兑换转移码将会切换至该账号，确定要兑换吗？",
      toastTransferCodeSuccess: "账号转移成功！已加载最新存档进度。",
      toastTransferCodeInvalid: "无效或已过期的转移码，请重新核对或重新签发。",
      exportJson: "数据导出 (JSON)",
      exportJsonTitle: "导出完整账号数据 (JSON)",
      exportJsonDesc: "下载包含等级、装备实例、星砂经济账本与历程统计之完整 JSON 存档文件：",
      btnDownloadJson: "下载 JSON 备份文件",
      btnCopyJson: "复制 JSON 内容",
      toastExportJsonSuccess: "账号数据已成功导出！",
      deleteAccount: "删除账号",
      deleteAccountTitle: "彻底删除账号与云端纪录",
      deleteAccountWarning: "【警告】此操作将永久销毁服务器与本地的所有角色数据、装备与星砂纪录，且无法通过任何方式复原！",
      deleteAccountConfirmPrompt: "若确认要删除，请在下方输入“DELETE”以确认：",
      btnConfirmDeleteAccount: "永久销毁账号",
      toastDeleteAccountSuccess: "账号与所有进度已彻底删除。",
      toastDeleteAccountMismatch: "确认文字不相符，取消删除操作。",
      navDojo: "修练场",
      menuDojo: "修练道场",
      menuDojoSub: "QTE & SANDBOX",
      recentDamageLog: "战斗记录",
      damageSourceRps: "猜拳获胜",
      damageSourceMorph: "变拳克制",
      damageSourceCounter: "QTE反制",
      damageSourceMomo: "摸摸偷袭",
      damageSourceBurn: "燃烧灼烧",
      damageSourceReflect: "镜光反弹",
      damageSourceThunder: "神鸣追加",
      damageSourceBurst: "重剑暴击",
      damageSourceEnemy: "敌方受击",
      atkLabel: "ATK",
      menuStages: "开始对局",
      menuStagesSub: "STORY BATTLE",
      menuGrowth: "属性成长",
      menuGrowthSub: "PLAYER GROWTH",
      menuShop: "缘侧商店",
      menuShopSub: "ITEM SHOP",
      menuGallery: "狐娘图鉴",
      menuGallerySub: "ILLUSTRATION GALLERY",
      menuGuide: "游戏指南",
      menuGuideSub: "HOW TO PLAY",
      menuEquipment: "玩家装备",
      menuEquipmentSub: "EQUIPMENT & BAG",
      stagesTitle: "选择章节",
      stagesSubtitle: "小乐会随章节变得更有耐力。提升等级后，新的镜界便会开启。",
      shopTitle: "缘侧商店",
      shopSubtitle: "选购灵药与神威武装。购入之装备会直接放入装备背包。",
      growthTitle: "属性成长",
      growthSubtitle: "升级获得点数分配，或修练强化必杀与双手奥义。",
      galleryTitle: "狐娘图鉴",
      gallerySubtitle: "记录旅程中的点滴回忆与特别造型插画。",
      guideTitle: "游戏指南",
      guideSubtitle: "掌握猜拳决斗、QTE 反制、时机变拳与双手奥义的关键秘诀。",
      equipmentTitle: "装备与背包",
      equipmentSubtitle: "穿戴神威装备强化各项属性，于对决中发挥特殊灵力加护。",
      paperdollTitle: "当前穿戴装备",
      paperdollSummaryTitle: "✦ 角色穿戴纸娃娃与属性总览（点击格位可直接卸下装备）",
      paperdollEquipped: "已穿戴",
      paperdollEmpty: "无装备",
      paperdollUnequipTip: "（点击格位卸下）",
      bagTitle: "装备背包",
      bagEmpty: "背包内目前没有装备。可前往商店购买！",
      bagEquipBtn: "装备",
      bagUnequipBtn: "卸下",
      bagEquippedBadge: "已穿戴",
      twoHandedBadge: "双手武器",
      unallocatedSp: "未分配点数 (SP)",
      statHpName: "生命上限 (HP)",
      statHpDesc: "增加对决中的生存容错率",
      statMpName: "灵力上限 (MP)",
      statMpDesc: "支撑变拳秘术与技能发动",
      statDmgName: "基础攻击 (DMG)",
      statDmgDesc: "提升常规猜拳胜出时的打击伤害",
      btnAllocate: "分配 +1",
      skillsHeading: "奥义与必杀技能",
      btnUpgradeSkill: "升级技能",
      skillMaxLevel: "已达最高等级",
      skillLocked: "尚未解锁（需 Lv.{level}）",
      skillCostSp: "消耗 {sp} SP",
      shopPaperdollToggle: "✦ 角色穿戴纸娃娃与属性总览（点击格位可直接卸下装备）",
      shopConsumablesHeading: "灵露药水",
      shopEquipmentHeading: "神威装备武装",
      btnBuy: "购买",
      btnEquipDirect: "立即穿戴",
      itemOwned: "已持有",
      insufficientCoins: "星砂不足！",
      battleRounds: "回合",
      targetEnemy: "当前锁定",
      playerLeftHand: "左手",
      playerRightHand: "右手",
      morphSkillBtn: "变拳秘术 (25 MP)",
      useHpPotion: "HP 药水",
      useMpPotion: "MP 药水",
      qteFailCount: "失误",
      qteTimeRemaining: "反制时间",
      dualQteNotice: "双重 QTE 反制！请连续输入 WASD / 方向键！",
      postBattleVictoryTitle: "对局获胜！",
      postBattleDefeatTitle: "对局惜败...",
      postBattleVictoryDesc: "成功击败了小乐，获得了丰厚的经验与星砂！",
      postBattleDefeatDesc: "未能抵挡小乐的猛攻，回去整备再战吧！",
      btnAskSwimsuit: "请小乐换穿泳装",
      btnPlayWatermelon: "进行海边切西瓜挑战",
      btnContinue: "返回章节菜单",
      btnRetry: "再次挑战",
      watermelonTitle: "蒙眼切西瓜大挑战！",
      watermelonDesc: "当指针进入绿色完美区域时按下按钮，考验你的直觉与时机！",
      btnSliceWatermelon: "就是现在！切！",
      watermelonScore: "切中次数：",
      autoWatermelonStock: "累计切西瓜次数：{count} / 999",
      btnNextWatermelonRound: "进行下一轮切西瓜 (剩余 {count})",
      btnStartWatermelonRound: "开始切西瓜",
      floatingWatermelonTitle: "🍉 蒙眼切西瓜 (自动刷关累积)",
      floatingWatermelonAimDesc: "白色指针进入绿色区域时按下挥刀！",
      floatingWatermelonFinished: "本轮三刀结束！累计剩余：{count} 次",
      floatingWatermelonNoStock: "切西瓜次数已用尽，等待自动刷关胜场累积中...",
      guideRpsTitle: "基础猜拳规则",
      guideRpsDesc: "剪刀克布、布克石头、石头克剪刀。猜赢对小乐造成伤害，平手可能触发摸摸，猜输进入 QTE 反制阶段。",
      guideQteTitle: "QTE 绝地反制",
      guideQteDesc: "猜输后在限定时间内依次输入方向键。反制成功可免除伤害并给小乐予以反击；失败则承受重创。",
      guideMorphTitle: "时机变拳秘术",
      guideMorphDesc: "在看到小乐出拳后的极短反应窗口内消耗 MP 发动变拳，可在 2 秒内手动选择手势反制小乐！若按错将承担输拳或平手摸摸判定。",
      guideDualTitle: "双手解放奥义",
      guideDualDesc: "在第四章解锁双手技能后，可同时以左手与右手独立出拳，分别对决两位小乐！",
      cheatModalTitle: "测试调试 / 作弊菜单",
      cheatSetLevel: "设定等级",
      cheatAddCoins: "增加星砂 (+1000)",
      cheatAddSp: "增加技能点 (+50)",
      cheatUnlockAllStages: "解锁所有关卡",
      cheatUnlockAllGallery: "解锁所有图鉴",
      cheatMaxAll: "满级 + 99999 星砂 + 100 SP",
      cheatAddPotions: "获得各 10 瓶药水",
      cheatAddAllEquip: "获得全套神威装备",
      cheatClose: "关闭",
      statDamage: "攻击",
      statHp: "生命",
      statMp: "魔力",
      statArmor: "减伤",
      statDodge: "闪避",
      statMpRegen: "魔力回复",
      statReflect: "反弹",
      statBurn: "燃烧",
      statFreeze: "冰冻",
      statThunder: "雷击",
      statMomoBonus: "摸摸加成",
      statCoinBonus: "星砂加成",
      // Action strings
      enterStage: "进入对局　›",
      stageNeedLevel: "需达 Lv. {level}　🔒",
      stageCleared: "已缔结・再次挑战　✓",
      ruleFocus: "规则重点：",
      winReward: "胜利奖励：",
      notCleared: "尚未通关",
      unlockRuleAfterClear: "打赢此关卡后揭晓具体规则",
      equippedBadge: "已装备 ✓",
      ownedInBag: "背包持有",
      equipNow: "即刻穿戴",
      equipBuy: "购买",
      twoHandedOccupied: "⚔️ (双手占用)",
      unitDamage: "每次胜利伤害",
      unitMaxHp: "最大 HP",
      unitMaxMp: "最大 MP",
      statAllocDmgDesc: "每投入 1 点，对小乐造成的伤害增加 5。",
      statAllocHpDesc: "每投入 1 点，最大生命增加 10。",
      statAllocMpDesc: "每投入 1 点，最大魔力增加 10。",
      spInvestBtn: "投入 1 SP　＋",
      momoProcRate: "平手发动率",
      dualHandUnlocked: "已解放",
      dualHandLocked: "未解锁",
      dualHandDescSub: "第四关双手出拳",
      nextLevelRate: "下一级概率: {chance}%",
      notYetUnlocked: "尚未解锁",
      unlockSwimsuitHint: "于对局胜利后触发泳装事件以解锁",
      unlock2PHint: "需战胜终ノ章（第四关）1 次以解锁",
      btnAskSwimsuitSpace: "请小乐穿泳装",
      btnPlayWatermelonSpace: "玩蒙眼切西瓜",
      btnNextStrikeSpace: "进行第 {attempt} 刀",
      btnRematch: "再次挑战",
      btnSelectStages: "选择章节",
      btnReturnHome: "回大厅",
      unrevealed: "未揭晓",
      preparing: "准备中",
      countdownCaption: "出拳倒计时",
      morphCaption: "按 F 变拳",
      morphSelectCaption: "2秒内选择变拳手势！",
      qteCaption: "反制机会",
      settleCaption: "回合结算",
      battleWon: "胜",
      battleLost: "负",
      battleDraw: "和",
      // Auto-Battle & Frost & Pause
      btnAutoBattle: "⚡ 自动刷关",
      autoBattleModalTitle: "⚡ 自动连续刷关设置",
      autoBattleModalDesc: "连续自动进行关卡对局，依据角色当前属性与装备配置挑战。获胜时直接跳过切西瓜领取奖励并接续下一场；失败时自动扣除次数继续重试。",
      autoBattleCountLabel: "选择连续刷关次数：",
      autoBattleTimes: "{count} 次",
      btnStartAutoBattle: "⚡ 开始自动刷关",
      btnCancel: "取消",
      btnStopAutoBattle: "⏹ 停止刷关",
      btnPauseAutoBattle: "暂停刷关",
      btnResumeAutoBattle: "继续刷关",
      autoBattleHudPaused: "自动刷关已暂停：第 {current} / {total} 次（胜: {wins}, 败: {losses}）",
      autoBattleToastPaused: "已暂停自动刷关，可手动操作或再次点击继续。",
      autoBattleToastResumed: "已继续自动刷关。",
      autoBattleHudRunning: "自动刷关中：第 {current} / {total} 次（胜: {wins}, 败: {losses}）",
      autoBattleToastUpdateWin: "自动刷关：获胜！剩余 {remaining} 场...",
      autoBattleToastUpdateLoss: "自动刷关：战败！剩余 {remaining} 场...",
      autoBattleToastFinished: "🎉 自动刷关完成！共进行 {total} 场（胜: {wins}, 败: {losses}）。",
      autoBattleToastStopped: "已手动停止自动刷关。",
      mustClearOnceForAuto: "必须先手动战胜该关卡一次后，才可开启自动刷关！",
      frozenBadge: "❄️ 霜月冰结：小乐【{hand}】已被封印！",
      ownedCount: "拥有 {total}",
      equippedCountBadge: "(已装备 {count})",
      pauseModalTitle: "⏸️ 对局暂停中",
      pauseModalDesc: "战斗与 QTE 计时已完全暂停。您可以随时继续对局，或放弃本场战斗返回大厅。",
      btnResumeBattle: "继续战斗",
      btnAbandonBattle: "放弃对局 (返回大厅)",
      abandonBattleModalTitle: "⚠️ 离开对局确认",
      abandonBattleModalDesc: "确定要离开对战吗？离开将会失去当前战斗进度与未结算的奖励！",
      btnConfirmAbandon: "确定离开",
      btnCancelAbandon: "继续战斗",
      toggleSettlementUi: "欣赏立绘",
      hideSettlementUi: "欣赏立绘",
      showSettlementUi: "显示界面",
      selectLanguage: "切换语言",
    },
    hands: {
      rock: { label: "石头", glyph: "✊" },
      paper: { label: "布", glyph: "✋" },
      scissors: { label: "剪刀", glyph: "✌" }
    },
    directions: {
      upLeft: "左上",
      up: "上",
      upRight: "右上",
      left: "左",
      right: "右",
      downLeft: "左下",
      down: "下",
      downRight: "右下"
    },
    stages: {
      1: {
        chapter: "壹ノ章",
        name: "初遇・朱鸟居",
        subtitle: "先从看穿她的小动作开始",
        bossRuleSummary: "5 秒／4 向容错",
        bossRuleDetail: "亮拳倒计时 5 秒、QTE 仅出现正 4 方向（按错不计失败），变拳时机 1.0 秒，小乐不闪避摸摸。"
      },
      2: {
        chapter: "贰ノ章",
        name: "夕映・狐火",
        subtitle: "黄昏会把犹豫照得一清二楚",
        bossRuleSummary: "3 秒",
        bossRuleDetail: "亮拳倒计时 3 秒、QTE 包含 8 方向（按错 2 次失败），变拳时机 0.75 秒，小乐有 11% 概率闪避摸摸。"
      },
      3: {
        chapter: "叁ノ章",
        name: "月下・九尾试",
        subtitle: "别被九道残影骗走视线",
        bossRuleSummary: "3 秒",
        bossRuleDetail: "亮拳倒计时 3 秒、QTE 7 键长度（按错 1 次失败），变拳时机 0.5 秒，小乐有 33% 概率闪避摸摸。"
      },
      4: {
        chapter: "终ノ章",
        name: "镜界・白金小乐",
        subtitle: "跨越镜面，迎战双生的 2P 色",
        bossRuleSummary: "3 秒／双小乐双血条",
        bossRuleDetail: "亮拳倒计时 3 秒、双小乐双血条（受击 2 倍伤害）、7 键 QTE，极限变拳时机 0.25 秒，小乐有 66% 概率闪避摸摸。"
      }
    },
    skills: {
      momo: {
        name: "摸摸",
        glyph: "抚",
        description: "平手时以概率自动发动，偷摸摸场上随机一个小乐对其造成 25 点伤害。"
      },
      dualHand: {
        name: "双手解放",
        glyph: "掌",
        description: "解放另一只手！在第四关对决中可同时使用左手（对左小乐）与右手（对右小乐）独立出拳。"
      }
    },
    items: {
      hpPotion: {
        name: "绯露药",
        shortName: "HP 药水",
        description: "神社特制绯红灵露，使用后立即恢复 25 点生命值。"
      },
      mpPotion: {
        name: "苍月露",
        shortName: "MP 药水",
        description: "汲取月华凝成的灵泉，使用后立即恢复 25 点灵力值。"
      }
    },
    equipmentSlots: {
      head: "头盔",
      shoulders: "肩甲",
      chest: "胸甲",
      belt: "腰带",
      boots: "鞋子",
      mainHand: "主手武器",
      offHand: "副手武防",
      ring1: "戒指 1",
      ring2: "戒指 2",
      earring1: "耳环 1",
      earring2: "耳环 2",
      badge: "胸章"
    },
    equipment: {
      chest_samurai: {
        name: "玄武・金刚胸甲",
        description: "玄武神灵加护的重型铠甲。受到的伤害直接减免 25 点（可与盾牌减伤叠加）。"
      },
      chest_ninja: {
        name: "灵狐・幻影羽织",
        description: "由九尾狐毛编织的灵幻羽织。猜输受击时有 25% 概率触发残影闪避，完全免疫本次伤害！"
      },
      chest_miko: {
        name: "净世・白狐千早",
        description: "神社巫女穿着的纯白千早服。每回合结束时回复 15 点 MP。"
      },
      chest_mirror: {
        name: "八咫・镜光护胸",
        description: "镶嵌神镜碎片的护胸装甲。受到小乐攻击时，以镜光反弹 40 点伤害给小乐。"
      },
      sword_flame: {
        name: "业火・炎之太刀",
        description: "刀身缭绕着永不熄灭的狐火。回合结束时对小乐造成 30 点燃烧伤害。"
      },
      sword_frost: {
        name: "霜月・冰结灵刃",
        description: "散发刺骨寒气的灵刃。攻击命中时 30% 概率触发霜月冰结，随机封印小乐下一回合的其中一种出拳手势。"
      },
      sword_thunder: {
        name: "雷霆・神鸣迅剑",
        description: "雷鸣缠绕的刺剑。QTE 反制成功时追加 50 点雷击伤害。"
      },
      sword_great_nine: {
        name: "破灭・九尾双手巨剑",
        description: "蕴含九尾狂气的双手大剑（占用双手）。常规出拳获胜伤害提高为 1.5 倍。"
      },
      shield_suzaku: {
        name: "结界・朱雀盾",
        description: "刻有朱雀神纹的灵盾。受到的猜输与 QTE 失败伤害降低 30 点。"
      },
      dagger_shadow: {
        name: "影月・短匕",
        description: "隐于夜幕的短匕。可装备于主手或副手，平手摸摸伤害额外 +15 点。"
      },
      helm_fox: {
        name: "妖狐面具",
        description: "依小乐容貌雕琢的灵狐面具。提供均衡的生命、魔力与攻击加成。"
      },
      shoulders_crimson: {
        name: "绯红之肩铠",
        description: "鸟居朱漆淬炼的坚固肩铠。大幅提升生命上限与攻击力。"
      },
      belt_shimenawa: {
        name: "注连绳神灵腰带",
        description: "神社结界编织的神绳腰带。药水回复效果额外提升 10 点。"
      },
      boots_gale: {
        name: "疾风之草履",
        description: "踏风而行的神行草履。QTE 反制时间延长 1.0 秒。"
      },
      earring_magatama: {
        name: "八尺琼・勾玉耳环",
        description: "翠绿温润的古老勾玉。变拳技能 MP 消耗降低 5 点。"
      },
      ring_ruby: {
        name: "狐火红玉戒指",
        description: "封印狐火灵气的红宝石戒指。提升生命与攻击。"
      },
      ring_sapphire: {
        name: "月华蓝玉戒指",
        description: "映照幽蓝月光的宝石戒指。提升魔力与攻击。"
      },
      badge_bond: {
        name: "绊之守护胸章",
        description: "与小乐深厚羁绊的信物。全面提升能力，且战胜时额外获得 20% 星砂。"
      }
    },
    dojo: {
      modalTitle: "修练场・特训菜单",
      modalSubtitle: "锻炼反应神经，测试数值与配装极限",
      mode1Title: "模式一：纯 QTE 无限反应练习",
      mode1Desc: "无猜拳与回合等待，纯粹连续生成 QTE 按键指令，即时锻炼反应与键位记忆。",
      mode1Style1: "第一式・单轨连续 QTE",
      mode1Style1Desc: "标准 8 方向单轨键盘连续输入练习",
      mode1Style2: "第二式・双轨同步 QTE",
      mode1Style2Desc: "模拟第四关双生 Boss 双轨情境（左手 WASD，右手 方向键）",
      mode2Title: "模式二：战斗模拟与 DPS 测试沙盒",
      mode2Desc: "完整保留标准战斗节奏，对战全黑小乐剪影假人，可自订 HP 与伤害，无败北压力。",
      mode2Style1: "第一式・单体假人对决",
      mode2Style1Desc: "单个全黑剪影假人，测试单体 DPS 与变拳/反击",
      mode2Style2: "第二式・双生假人对决",
      mode2Style2Desc: "双个全黑剪影假人，模拟第四关双手出拳与双轨反制",
      customHpLabel: "假人生命值 (HP)",
      customDmgLabel: "假人伤害值 (ATK)",
      zeroDamageHint: "（预设 0 伤害，对玩家无伤害，无败北压力）",
      btnStartPractice: "开始修练",
      btnExitDojo: "结束修练",
      combo: "连击",
      maxCombo: "最高连击",
      avgReaction: "平均反应",
      successRate: "成功率",
      dummySilhouette: "影・小乐",
      dummySilhouetteLeft: "影・小乐（左）",
      dummySilhouetteRight: "影・小乐（右）",
      chapterName: "修练场",
      dojoStatsTitle: "修练结算报告",
      btnReturnDojoMenu: "返回修练菜单"
    },
    gallery: {
      koraku_default: {
        name: "巫女社・狐娘小乐",
        variantName: "默认造型",
        description: "守护朱鸟居的狐娘小乐。一身利落的机甲巫女装扮，总是带着自信的微笑迎接挑战者。"
      },
      koraku_2p: {
        name: "镜界・白金小乐",
        variantName: "2P色小乐",
        description: "跨越镜界之后显现的白金姿态。银发与冰蓝光芒交织，唯有突破终章试炼者方能得见。"
      },
      swimsuit_default: {
        name: "夏日祭・清凉泳装",
        variantName: "默认泳装",
        description: "小乐难得换上的清凉泳装。在对局胜出后方能一窥风采。"
      },
      swimsuit_watermelon: {
        name: "海风・切西瓜",
        variantName: "切西瓜",
        description: "蒙眼切西瓜大获全胜后，小乐得意洋洋展示成果的模样。"
      }
    },
    dialogue: {
      watermelonNotAim: "西瓜游戏尚未进入瞄准阶段。",

      speakerPlayer: "旅人",
      speakerKohaku: "小乐",
      speakerPlatinumKohaku: "白金小乐",
      speakerNarrator: "旁白",
      homeGreeting: "准备好了吗？这次可别移开视线哦。",
      introNormal: "出拳一决。让我看看你的决心吧。",
      introFinal: "镜中的我，可不会手下留情。",
      chant3: "剪刀",
      chant2: "石头",
      chant1: "布！",
      morphReaction: "咦……在最后一瞬间变拳了？",
      qteSingleBreak: "抓到破绽了！想躲开的话，就跟上我的节奏！",
      qteDualBreak: "双重破绽！跟上我们的双生节奏吧！",
      winDualMorphBoth: "双手皆以变拳胜出！双生之势全数瓦解！",
      winDualBoth: "双手皆赢！完美双重压制！",
      winDualMorphSingle: "借由变拳突破单侧防线！",
      winDualSingle: "突破单侧防线！",
      winDualMorphDoubleDmg: "双手变拳全胜！造成双倍伤害！",
      winDualDoubleDmg: "双手出拳全胜！造成双倍伤害！",
      winSingleMorph: "变拳逆转获胜！",
      winSingleNormal: "出拳获胜！",
      drawMomoDodge: "平手之际试图摸摸，但被{target}轻巧地躲开了！",
      drawMomoHit: "平手之际趁机摸摸！对{target}造成了 {damage} 点偷袭伤害！",
      drawNormal: "不分胜负，双方平手！",
      deflectedSingleAttack: "化解了{target}的攻击！",
      dualQteMiss: "双生 QTE 反制失误！",
      dualQteSuccess: "双生 QTE 反制成功！完全逆转战局！",
      qteMiss: "QTE 反制失败！",
      freezeNarration: "霜月冰结！小乐的“{hand}”被封印了！",
      dodgeDodge: "残影闪避！成功避开了攻击！",
      dodgeDodgeDual: "残影闪避！避开了双重攻击！",
      postBattleWin: "这次是你赢了。要把利用在什么愿望上呢？",
      postBattleLoss: "还有什么要说的吗？回去再练练吧！",
      askSwimsuitLine: "泳装？真拿你没办法……只准看一眼哦。",
      watermelonAttempt: "第 {nextAttempt} 刀。白色指针进入绿色区域时，就喊『就是现在！』！",
      watermelonHit: "漂亮！这一刀切中了。还有 {remaining} 刀。",
      watermelonMiss: "差一点点！还有 {remaining} 刀，下一次再来。",
      watermelonAllHit: "三刀都结束了！切中 {successes} 次，真是有趣呢！",
      watermelonDone: "三刀都结束了。下次再一起抓准时机吧。",
      itemUsed: "使用「{name}」，恢复了 {restored} 点 {resource}。",
      serverDisconnectGrace: "连接中断，正在为您保留战斗状态（10 秒宽限期）...",
      serverConfigMismatch: "检测到服务器版本更新，请刷新页面以获取最新游戏内容。",
      serverSessionReplaced: "您的账号已在其他设备或标签页连接，本连接已中断。",
      serverInvalidCommand: "操作无法执行：{reason}",
      serverLockedInBattle: "战斗进行中，无法进行装备更换或属性配点！"
    },
    narration: {
      qteCounterPaper: "用手包裹住小乐的剪刀手——反制成功！",
      qteCounterScissors: "用布握住了小乐的小拳头——反制成功！",
      qteCounterRock: "用五指交扣了小乐的软绵绵小手手，离奇获胜！"
    },
    toast: {
      levelRequirementNotMet: "等级尚未达到本章的挑战条件。"
    },
    combat: {
      morphWindowOnly: "变拳只能在看见小乐出拳后的反应时间内使用。",
      morphWindowExpired: "反应时间已过。",
      insufficientMp: "MP 不足，无法使用变拳。",
      tookDamage: "受到伤害",
      notInBattle: "当前不在战斗中。",
      itemNotFound: "找不到这个道具。",
      resourceFull: "{resource} 已经是满的。",
      itemDepleted: "{name}已用完。"
    },
    shop: {
      itemNotFound: "找不到这件商品。",
      insufficientCoins: "星砂不足，完成对局后再来吧。",
      itemPurchased: "购买了「{name}」！",
      equipmentPurchased: "购买了「{name}」并已放入装备背包！"
    },
    equip: {
      invalidItem: "无效的装备。",
      notInInventory: "背包中没有这件装备。",
      invalidSlot: "无效的装备栏位。",
      incompatibleSlot: "无法将「{name}」穿戴至 {slotName}。",
      equipped: "已穿戴「{name}」。",
      slotEmpty: "此栏位未装备任何物品。",
      unequipped: "已卸下装备。"
    },
    growth: {
      invalidStat: "无效的能力项目。",
      noPoints: "目前没有可用点数。",
      statIncreased: "能力提升了。",
      invalidSkill: "无效的技能项目。",
      levelRequirementNotMet: "等级需达 Lv. {level} 方可学习此技能。",
      skillMaxLevel: "此技能已达最高等级。",
      insufficientPoints: "技能点数不足。",
      skillUpgraded: "「{name}」升级至 Lv. {level}！"
    },
    cheat: {
      updated: "数值已更新！",
      unlockedAll: "已解锁全部 4 个关卡与 BOSS 说明！",
      unlockedGallery: "已解锁全部图鉴立绘！"
    },
    save: {
      transferCodeRequired: "请输入转移代码。",
      transferCodeNotFound: "找不到此转移代码。",
      transferCodeAlreadyClaimed: "此转移代码已被使用。",
      transferCodeExpired: "转移代码已过期。",
      transferClaimFailed: "转移代码兑换失败。",

      invalidCode: "请输入有效的种子码。",
      corruptCode: "无效或损坏的存档种子码。",
      imported: "存档已成功加载！"
    },
    connection: {
      newConnectionEstablished: "此账号已从另一设备连接，您已被登出。",

      connecting: "连接中",
      online: "在线连接",
      offline: "离线模式",
      reconnecting: "重新连接中",
      disconnected: "连接中断",
      highLatency: "延迟",
      kickedByNewConnection: "账号已在其他设备或标签页登录，本连接已安全断开。",
      disconnectCountdown: "连接中断，正在尝试重新连接（剩余 {seconds} 秒自动结算）...",
      bannerConnecting: "正在连接至服务器...",
      bannerOnline: "已连接至权威服务器",
      bannerOffline: "当前处于本地离线沙盒模式",
      bannerReconnecting: "连接中断，正在尝试重新连接...",
      bannerDisconnected: "已与服务器断开连接"
    },
    battle: {
      lockedDuringBattle: "战斗进行中已锁定换装与配点。"
    },
    battleLog: {
      lockedDuringBattle: "战斗进行中已锁定换装与配点。",
      battleInProgress: "战斗正在进行中。",
      battleStartFailed: "无法开始战斗。",
      noActiveBattle: "当前没有进行中的战斗。",
      invalidPhasePause: "只能在倒数阶段暂停。",
      useItemFailed: "道具使用失败。",

      rpsWin: "猜拳【{hand}】获胜，对 {target} 造成 {damage} 点伤害！",
      rpsLoss: "猜拳【{hand}】惜败，受到 {damage} 点伤害！",
      rpsDraw: "双方皆出【{hand}】，平手！",
      morphSuccess: "变拳【{hand}】逆转成功！对 {target} 造成 {damage} 点伤害！",
      morphFailed: "变拳手势被克制，判定失误！",
      qteCounterSuccess: "QTE 绝地反制成功！解除危机并对 {target} 造成 {damage} 点反击伤害！",
      qteCounterFail: "QTE 反制失败！承受了 {damage} 点重击！",
      momoProc: "摸摸平手偷袭发动！对 {target} 造成 {damage} 点偷袭伤害！",
      momoDodged: "小乐灵巧地闪避了摸摸偷袭！",
      burnDamage: "火焰太刀狐火灼烧，对 {target} 造成 {damage} 点燃烧伤害！",
      reflectDamage: "八咫镜光反弹！将 {damage} 点伤害回敬给 {target}！",
      thunderDamage: "雷霆神鸣追加！对 {target} 额外追加 {damage} 点雷击伤害！",
      frostFreeze: "霜月冰结灵刃发动！随机封印了小乐下一回合的【{hand}】！",
      shadowDodge: "灵狐幻影羽织发动！25% 残影成功完全回避了本次伤害！",
      mpRegen: "净世白狐千早发动！回合结算回复了 {amount} 点 MP。",
      potionUsed: "使用了【{item}】，恢复了 {amount} 点 {stat}！",
      roundTimeout: "出拳倒数超时，判定为弃权输拳！",
      battleDisconnectedSettled: "战斗因超时未连接自动结算完成。",
      battlePauseCount: "战斗已暂停（本场剩余暂停次数：{remaining} 次）。"
    }
  },

  "en": {
    meta: {
      title: "Kohaku: Bond of RPS",
      titleEm: "Endless Koraku",
      subtitle: "KORAKU NO SHŌBU",
      eyebrow: "Janken: Tales of Foxfire",
      lead: "Decide your hand in five seconds. Read her fingertip tells and seize the only counterattack in defeat."
    },
    ui: {
      playerProfile: "Player Profile",
      switchLanguage: "Switch Language",
      toggleBgm: "Toggle BGM",
      toggleSfx: "Toggle SFX",
      mainMenu: "Main Menu",
      battleRecords: "Battle Records",
      footerInfo: "Footer Information",
      changelog: "View Changelog",
      galleryZoom: "View Full Size",
      galleryZoomTitle: "Zoom (High-Res)",
      rpsBattle: "RPS Battle",
      toggleAutoBattle: "Pause or Resume Auto Battle",
      kohakuHp: "Kohaku HP",
      battleLogToggle: "Battle Log (Click to toggle size)",
      battleLogToggleTitle: "Click to toggle log size: latest 1 / recent 5 / all records",
      roundStatus: "Current Round Status",
      playerHpMp: "Player HP and MP",
      selectHand: "Select Hand",
      itemSkillBar: "Item & Skill Bar",
      counterQte: "Counter QTE",
      directionInput: "Direction Input",
      toggleUiVisibility: "Toggle UI Visibility",
      toggleUiVisibilityTitle: "Appreciate Artwork (Toggle UI)",
      togglePanelSize: "Toggle Panel Size",
      togglePanelSizeTitle: "Toggle Panel Size",
      closeOverlay: "Close Overlay",
      dojoQtePractice: "Dojo QTE Practice",
      closeModal: "Close Dialog",
      clickSelectAll: "Click to Select All",
      openOriginalImage: "Open original image in new tab",
      closeGalleryZoom: "Close Zoom View",
      closeGalleryZoomTitle: "Close (ESC)",
      selectRockKey: "Select Rock (Hotkey: 1)",
      selectPaperKey: "Select Paper (Hotkey: 2)",
      selectScissorsKey: "Select Scissors (Hotkey: 3)",
      selectLeftRockKey: "Left Rock (Hotkey: 1 or Q)",
      selectLeftPaperKey: "Left Paper (Hotkey: 2 or W)",
      selectLeftScissorsKey: "Left Scissors (Hotkey: 3 or E)",
      selectRightRockKey: "Right Rock (Hotkey: 7 or J or Num1)",
      selectRightPaperKey: "Right Paper (Hotkey: 8 or K or Num2)",
      selectRightScissorsKey: "Right Scissors (Hotkey: 9 or L or Num3)",
      useHpPotionKey: "Use HP Potion (Hotkey: 4 or Q)",
      useMorphKey: "Morph within 1s (Hotkey: F)",
      useMpPotionKey: "Use MP Potion (Hotkey: 5 or E)",

      menuRecords: "Records & Stats",
      menuRecordsSub: "RECORDS & STATS",
      homeRecordsTitle: "Journey Records & Combat Analysis",
      homeRecordsDesc: "Detailed records of your combat performance, gear loadout, and growth statistics across all chapters.",
      theoreticalDps: "Theoretical DPS",
      combatDps: "Combat DPS",
      currentEquipment: "Current Equipment Loadout",
      currentLevelXp: "Level & EXP Progress",
      consumablesUsed: "Consumables Used",
      morphSuccesses: "Morph Reversals",
      momoStats: "Momo Petting Procs",
      watermelonCutAnalysis: "Watermelon Slicing Stage Analysis",
      strikeStage: "Strike {index}",
      strikeTotal: "All 3 Strikes",
      successRate: "Success Rate",
      damageDealt: "Damage Dealt",
      damageTaken: "Damage Taken",
      qteSuccessRate: "QTE Success Rate",
      rewardsEarned: "Rewards Earned",
      recentBattlesTitle: "Recent 100 Battles Log",
      battleDuration: "Duration",
      stageDamageDealt: "Total Damage Dealt",
      stageDamageTaken: "Total Damage Taken",
      hpPotionCountUsed: "HP Potions Used: {count}",
      mpPotionCountUsed: "MP Potions Used: {count}",
      strikeAttempts: "{attempts} strikes ({successes} hit / {failures} miss)",
      resultWin: "WIN",
      resultLoss: "LOSS",
      modeAuto: "Auto",
      modeManual: "Manual",
      statTotalCoinsEarned: "Total Star Sand Earned",
      statTotalXpEarned: "Total EXP Earned",
      statTotalBattles: "Total Battles",
      statManualRecord: "Manual Record",
      statAutoRecord: "Auto Battle Record",
      statWatermelonHits: "Watermelon Slices Hit",
      stageAttempts: "Attempts: {total}",
      stageRecordBadge: "Auto Win: {autoWins} / Manual Loss: {manualLosses}",
      stageStatsBreakdownTitle: "Chapter Statistics Breakdown",
      footerEndlessAliceLink: "Explore 'Endless Alice' on Steam",
      times: "times",
      home: "Home",
      level: "Level",
      xp: "EXP",
      changelogTitle: "Changelog",
      changelogSubtitle: "Version history and patch notes",
      closeChangelog: "Close",
      coins: "Star Sand",
      soundToggle: "Toggle SFX",
      sfxToggle: "Toggle SFX",
      musicToggle: "Toggle Music",
      musicToggleOn: "Unmute Music",
      musicToggleOff: "Mute Music",
      sfxToggleOn: "Unmute SFX",
      sfxToggleOff: "Mute SFX",
      musicOnToast: "Background music enabled.",
      musicOffToast: "Background music disabled.",
      sfxOnToast: "Sound effects enabled.",
      sfxOffToast: "Sound effects disabled.",
      rewardEarned: "Rewards Earned",
      zoomHighRes: "Zoom HD",
      clickToZoom: "Click to view full resolution",
      closeLightbox: "Close",
      langToggle: "Language",
      back: "Back",
      wins: "Wins",
      losses: "Losses",
      deepestStage: "Deepest Chapter",
      receptionSeal: "Ready for<br>Battle",
      openCheat: "Debug & Cheat Menu",
      cheatAuthTitle: "Cheat Verification",
      cheatAuthPrompt: "Enter admin passcode to unlock the debug menu:",
      cheatAuthPlaceholder: "Passcode (8989)",
      cheatAuthConfirm: "Unlock",
      cheatAuthCancel: "Cancel",
      cheatAuthError: "Incorrect passcode! Debug menu remains locked.",
      cheatAuthSuccess: "Passcode accepted. Debug menu unlocked!",
      galleryUnlockedTag: "Unlocked",
      galleryLockedTag: "Locked",
      resetSave: "Reset Save",
      resetConfirm: "Are you sure you want to reset all save data? This cannot be undone.",
      saveRecord: "Save Records",
      saveRecordModalTitle: "Save Records & Seed Management",
      saveOverviewTitle: "Current Save Overview",
      saveOverviewLevel: "Adventure Level",
      saveOverviewCoins: "Star Sand",
      saveOverviewStage: "Deepest Chapter",
      saveOverviewBattles: "Total Battles",
      saveOverviewEquipCount: "Equipment Owned",
      btnViewRecordsDetail: "View Records & Stats ›",
      saveRecordsHint: "The save seed code encapsulates your complete journey, chapter clears, manual/auto win-loss records, DPS analysis, and watermelon stats—fully preserved across devices.",
      saveSeedExportTitle: "Export Current Save Seed Code",
      saveSeedExportDesc: "This seed code encapsulates your full level, equipment, star sand, skills, and battle history for backup or cross-device transfer:",
      btnCopySaveSeed: "Copy Seed Code",
      toastSeedCopied: "Save seed code copied to clipboard!",
      saveSeedImportTitle: "Import Seed Code (Cross-Device Transfer)",
      saveSeedImportDesc: "Paste a save seed code from another device to load and transfer your journey to this device:",
      importSeedPlaceholder: "Paste save seed code here (e.g. KORAKU1_...)",
      btnImportSaveSeed: "Load & Apply Seed Code",
      confirmImportSeed: "Loading this seed code will overwrite your current save progress on this device. Do you want to proceed?",
      confirmAbandonBattle: "Retreating now will forfeit all star dust and XP. Are you sure you want to leave?",
      toastImportSuccess: "Save seed code successfully loaded and applied!",
      toastImportFailed: "Invalid or corrupted save seed code. Please check that you copied the complete text.",
      toastSeedEmpty: "Please enter or paste a save seed code first.",
      dangerZoneTitle: "Save Reset & Deletion Management",
      dangerZoneDesc: "Clear all game progress on this device (level, star sand, equipment, skills, and stats) back to default initial state:",
      btnModalResetSave: "Reset Save (Clear All Progress)",
      // Online connection, transfer code, export, delete
      connConnecting: "Connecting",
      connOnline: "Online",
      connOffline: "Offline Mode",
      connReconnecting: "Reconnecting",
      connDisconnected: "Disconnected",
      connBannerConnecting: "Connecting to server...",
      connBannerOnline: "Connected to authoritative server",
      connBannerOffline: "Running in local offline sandbox mode",
      connBannerReconnecting: "Connection lost. Reconnecting...",
      connBannerDisconnected: "Disconnected from server",
      connectionModeToggle: "Toggle Connection Mode",
      connectionErrorVersionMismatch: "Client version mismatch. Please reload to sync latest version.",
      connectionRateLimited: "Too many requests. Please try again shortly.",
      transferCode: "Transfer Code",
      transferCodeModalTitle: "Account Transfer Code Management",
      transferCodeIssueTitle: "Issue One-Time Transfer Code",
      transferCodeIssueDesc: "Generate a one-time code to migrate this account's full progress to a new device. Valid for 15 minutes upon issuance.",
      btnIssueTransferCode: "Generate Transfer Code",
      transferCodePrompt: "Your transfer code (Click to copy):",
      transferCodeExpiresIn: "Expires in: {minutes} minutes",
      btnCopyTransferCode: "Copy Transfer Code",
      toastTransferCodeCopied: "Transfer code copied to clipboard!",
      transferCodeClaimTitle: "Claim Transfer Code (Transfer to this Device)",
      transferCodeClaimDesc: "Enter the transfer code issued from your origin device to bind and load account data:",
      transferCodePlaceholder: "Enter 8-character code (e.g. KTR-XXXX-XXXX)",
      btnClaimTransferCode: "Claim & Load Account",
      confirmClaimTransferCode: "Claiming this transfer code will switch this device to the target account. Continue?",
      toastTransferCodeSuccess: "Account transferred successfully! Loaded latest save progress.",
      toastTransferCodeInvalid: "Invalid or expired transfer code. Please check or reissue.",
      exportJson: "Export Account Data (JSON)",
      exportJsonTitle: "Export Account Data (JSON)",
      exportJsonDesc: "Download a full JSON backup including adventure level, equipment instances, economic audit ledger, and match records:",
      btnDownloadJson: "Download JSON Backup",
      btnCopyJson: "Copy JSON",
      toastExportJsonSuccess: "Account data exported successfully!",
      deleteAccount: "Delete Account",
      deleteAccountTitle: "Permanently Delete Account & Cloud Records",
      deleteAccountWarning: "[WARNING] This action permanently destroys all character data, equipment, and records on both server and client. This cannot be undone!",
      deleteAccountConfirmPrompt: "To confirm permanent deletion, type 'DELETE' below:",
      btnConfirmDeleteAccount: "Permanently Delete Account",
      toastDeleteAccountSuccess: "Account and all progress have been permanently deleted.",
      toastDeleteAccountMismatch: "Confirmation text does not match. Deletion cancelled.",
      navDojo: "Training Dojo",
      menuDojo: "Training Dojo",
      menuDojoSub: "QTE & SANDBOX",
      recentDamageLog: "Battle Log",
      damageSourceRps: "RPS Win",
      damageSourceMorph: "Morph Counter",
      damageSourceCounter: "QTE Counter",
      damageSourceMomo: "Momo Assist",
      damageSourceBurn: "Burn DOT",
      damageSourceReflect: "Mirror Reflect",
      damageSourceThunder: "Thunder Strike",
      damageSourceBurst: "Greatsword Burst",
      damageSourceEnemy: "Enemy Strike",
      atkLabel: "ATK",
      menuStages: "Story Battle",
      menuStagesSub: "STORY BATTLE",
      menuGrowth: "Player Growth",
      menuGrowthSub: "PLAYER GROWTH",
      menuShop: "Engawa Shop",
      menuShopSub: "ITEM SHOP",
      menuGallery: "Kohaku Gallery",
      menuGallerySub: "ILLUSTRATION GALLERY",
      menuGuide: "How to Play",
      menuGuideSub: "HOW TO PLAY",
      menuEquipment: "Equipment & Bag",
      menuEquipmentSub: "EQUIPMENT & BAG",
      stagesTitle: "Select Chapter",
      stagesSubtitle: "Kohaku becomes more resilient as you advance. Level up to unlock new mirror realms.",
      shopTitle: "Engawa Item Shop",
      shopSubtitle: "Stock up on elixirs and divine gear. Purchased equipment is stored in your inventory bag.",
      growthTitle: "Player Growth",
      growthSubtitle: "Allocate stat points gained from leveling up, or upgrade your Petting and Dual Hands masteries.",
      galleryTitle: "Kohaku Gallery",
      gallerySubtitle: "Cherish memorable moments and exclusive outfit artworks unlocked during your journey.",
      guideTitle: "How to Play",
      guideSubtitle: "Master the rhythm of RPS duels, QTE counters, Morph timing, and Dual Hands mastery.",
      equipmentTitle: "Equipment & Bag",
      equipmentSubtitle: "Equip divine gear to boost stats and unleash powerful combat passives during battles.",
      paperdollTitle: "Equipped Gear",
      paperdollSummaryTitle: "✦ Character Paperdoll & Total Stats (Click slot to unequip)",
      paperdollEquipped: "Equipped",
      paperdollEmpty: "Empty",
      paperdollUnequipTip: "(Click to unequip)",
      bagTitle: "Inventory Bag",
      bagEmpty: "No gear in your inventory yet. Visit the shop to purchase equipment!",
      bagEquipBtn: "Equip",
      bagUnequipBtn: "Unequip",
      bagEquippedBadge: "Equipped",
      twoHandedBadge: "Two-Handed",
      unallocatedSp: "Unallocated Points (SP)",
      statHpName: "Max Health (HP)",
      statHpDesc: "Enhances survival endurance during intense battles",
      statMpName: "Max Mana (MP)",
      statMpDesc: "Fuels Morph techniques and skill activations",
      statDmgName: "Base Attack (DMG)",
      statDmgDesc: "Increases strike damage dealt on winning RPS throws",
      btnAllocate: "+1 Point",
      skillsHeading: "Masteries & Special Skills",
      btnUpgradeSkill: "Upgrade Skill",
      skillMaxLevel: "Max Level Reached",
      skillLocked: "Locked (Requires Lv.{level})",
      skillCostSp: "Costs {sp} SP",
      shopPaperdollToggle: "✦ Character Paperdoll & Total Stats (Click slot to unequip)",
      shopConsumablesHeading: "Elixirs & Potions",
      shopEquipmentHeading: "Divine Armaments",
      btnBuy: "Buy",
      btnEquipDirect: "Equip Now",
      itemOwned: "Owned",
      insufficientCoins: "Not enough Star Sand!",
      battleRounds: "Round",
      targetEnemy: "Targeting",
      playerLeftHand: "Left Hand",
      playerRightHand: "Right Hand",
      morphSkillBtn: "Morph Technique (25 MP)",
      useHpPotion: "HP Potion",
      useMpPotion: "MP Potion",
      qteFailCount: "Misses",
      qteTimeRemaining: "Counter Window",
      dualQteNotice: "Dual QTE Counter! Input WASD / Arrow keys continuously!",
      postBattleVictoryTitle: "Victory!",
      postBattleDefeatTitle: "Defeat...",
      postBattleVictoryDesc: "You defeated Kohaku! Gained abundant EXP and Star Sand.",
      postBattleDefeatDesc: "Overwhelmed by Kohaku's barrage. Regroup and challenge her again!",
      btnAskSwimsuit: "Ask Kohaku to Wear Swimsuit",
      btnPlayWatermelon: "Watermelon Splitting Challenge",
      btnContinue: "Back to Stages",
      btnRetry: "Retry Battle",
      watermelonTitle: "Blindfolded Watermelon Split!",
      watermelonDesc: "Press the strike button when the indicator enters the green sweet spot!",
      btnSliceWatermelon: "Strike Now!",
      watermelonScore: "Clean Hits:",
      autoWatermelonStock: "Watermelon Slices Stored: {count} / 999",
      btnNextWatermelonRound: "Next Watermelon Round ({count} left)",
      btnStartWatermelonRound: "Start Watermelon Slicing",
      floatingWatermelonTitle: "🍉 Blindfolded Watermelon Slicing (Auto Stored)",
      floatingWatermelonAimDesc: "Strike when the white indicator is in the green zone!",
      floatingWatermelonFinished: "Round finished! Stored remaining: {count}",
      floatingWatermelonNoStock: "No stored watermelon slices left. Stacking with auto-battle wins...",
      guideRpsTitle: "Basic RPS Rules",
      guideRpsDesc: "Scissors beat Paper, Paper beats Rock, Rock beats Scissors. Winning deals damage, draws can trigger Petting, and losing triggers QTE Counter phase.",
      guideQteTitle: "Clutch QTE Counter",
      guideQteDesc: "When you lose a throw, input direction keys within the time limit. A successful counter cancels damage and strikes back!",
      guideMorphTitle: "Morph Technique",
      guideMorphDesc: "Spend MP during the reaction window to enter a 2s Morph state, allowing you to manually choose a counter hand! Wrong choices result in a loss or draw Momo check.",
      guideDualTitle: "Dual Hands Mastery",
      guideDualDesc: "Unlock Dual Hands in Chapter 4 to throw left and right hands independently against Twin Kohakus!",
      cheatModalTitle: "Debug & Cheat Menu",
      cheatSetLevel: "Set Level",
      cheatAddCoins: "+1000 Star Sand",
      cheatAddSp: "+50 SP Points",
      cheatUnlockAllStages: "Unlock All Stages",
      cheatUnlockAllGallery: "Unlock All Gallery",
      cheatMaxAll: "Max Lv. + 99999 Coins + 100 SP",
      cheatAddPotions: "Get 10x Potions",
      cheatAddAllEquip: "Grant All Divine Gear",
      cheatClose: "Close",
      statDamage: "Attack",
      statHp: "Health",
      statMp: "Mana",
      statArmor: "Armor Red.",
      statDodge: "Dodge",
      statMpRegen: "MP Regen",
      statReflect: "Reflect",
      statBurn: "Burn",
      statFreeze: "Freeze",
      statThunder: "Lightning",
      statMomoBonus: "Petting DMG",
      statCoinBonus: "Sand Boost",
      // Action strings
      enterStage: "Enter Battle ›",
      stageNeedLevel: "Requires Lv. {level} 🔒",
      stageCleared: "Cleared: Replay ✓",
      ruleFocus: "Key Rules: ",
      winReward: "Victory Rewards: ",
      notCleared: "Not Cleared",
      unlockRuleAfterClear: "Defeat this boss to reveal full rules",
      equippedBadge: "Equipped ✓",
      ownedInBag: "In Bag",
      equipNow: "Equip",
      equipBuy: "Buy",
      twoHandedOccupied: "⚔️ (Two-Handed)",
      unitDamage: "Per-win DMG",
      unitMaxHp: "Max HP",
      unitMaxMp: "Max MP",
      statAllocDmgDesc: "Each point increases strike damage dealt by +5.",
      statAllocHpDesc: "Each point increases Max HP by +10.",
      statAllocMpDesc: "Each point increases Max MP by +10.",
      spInvestBtn: "Invest 1 SP +",
      momoProcRate: "Draw Trigger Rate",
      dualHandUnlocked: "Unlocked",
      dualHandLocked: "Locked",
      dualHandDescSub: "Ch.4 Dual Throws",
      nextLevelRate: "Next Level Rate: {chance}%",
      notYetUnlocked: "Locked",
      unlockSwimsuitHint: "Defeat Kohaku to trigger swimsuit event and unlock",
      unlock2PHint: "Defeat Chapter 4 (Final Chapter) 1 time to unlock",
      btnAskSwimsuitSpace: "Ask Kohaku for Swimsuit",
      btnPlayWatermelonSpace: "Blindfolded Watermelon",
      btnNextStrikeSpace: "Strike #{attempt}",
      btnRematch: "Rematch",
      btnSelectStages: "Select Chapter",
      btnReturnHome: "Home Lobby",
      unrevealed: "Unrevealed",
      preparing: "Readying",
      countdownCaption: "RPS Countdown",
      morphCaption: "Press F to Morph",
      morphSelectCaption: "Select Counter Gesture (2s)!",
      qteCaption: "Counter Window",
      settleCaption: "Round Summary",
      battleWon: "WIN",
      battleLost: "LOSE",
      battleDraw: "DRAW",
      // Auto-Battle & Frost & Pause
      btnAutoBattle: "⚡ Auto-Battle",
      autoBattleModalTitle: "⚡ Auto-Battle Stage Config",
      autoBattleModalDesc: "Continuously battles the stage using your current character attributes and equipment. Wins claim rewards and skip watermelon to continue; losses deduct attempts and auto-retry.",
      autoBattleCountLabel: "Select continuous battle count:",
      autoBattleTimes: "{count} Times",
      btnStartAutoBattle: "⚡ Start Auto-Battle",
      btnCancel: "Cancel",
      btnStopAutoBattle: "⏹ Stop Auto",
      btnPauseAutoBattle: "Pause Auto",
      btnResumeAutoBattle: "Resume Auto",
      autoBattleHudPaused: "Auto-Battle Paused: Run {current} / {total} (Wins: {wins}, Losses: {losses})",
      autoBattleToastPaused: "Auto-battle paused. You can play manually or click to resume.",
      autoBattleToastResumed: "Auto-battle resumed.",
      autoBattleHudRunning: "Auto-Battling: Run {current} / {total} (Wins: {wins}, Losses: {losses})",
      autoBattleToastUpdateWin: "Auto-battle: Victory! {remaining} rounds remaining...",
      autoBattleToastUpdateLoss: "Auto-battle: Defeat! {remaining} rounds remaining...",
      autoBattleToastFinished: "🎉 Auto-battle complete! Total {total} rounds (Wins: {wins}, Losses: {losses}).",
      autoBattleToastStopped: "Auto-battle stopped manually.",
      mustClearOnceForAuto: "You must defeat this stage once before using auto-battle!",
      frozenBadge: "❄️ Frost Blade: Kohaku's [{hand}] is frozen!",
      ownedCount: "Owned {total}",
      equippedCountBadge: "(Equipped {count})",
      pauseModalTitle: "⏸️ Battle Paused",
      pauseModalDesc: "Battle and QTE timers are paused. You can resume at any time or abandon the battle to return home.",
      btnResumeBattle: "Resume Battle",
      btnAbandonBattle: "Abandon Battle (Return Home)",
      abandonBattleModalTitle: "⚠️ Leave Battle Confirmation",
      abandonBattleModalDesc: "Are you sure you want to leave? Current battle progress and uncollected rewards will be lost!",
      btnConfirmAbandon: "Leave Battle",
      btnCancelAbandon: "Continue",
      toggleSettlementUi: "View Standee",
      hideSettlementUi: "View Standee",
      showSettlementUi: "Show UI",
      selectLanguage: "Language",
    },
    hands: {
      rock: { label: "Rock", glyph: "✊" },
      paper: { label: "Paper", glyph: "✋" },
      scissors: { label: "Scissors", glyph: "✌" }
    },
    directions: {
      upLeft: "Up-Left",
      up: "Up",
      upRight: "Up-Right",
      left: "Left",
      right: "Right",
      downLeft: "Down-Left",
      down: "Down",
      downRight: "Down-Right"
    },
    stages: {
      1: {
        chapter: "Chapter 1",
        name: "First Encounter: Crimson Torii",
        subtitle: "Start by reading her subtle tells",
        bossRuleSummary: "5s / 4-way Fault-Tolerant",
        bossRuleDetail: "5s reveal countdown, 4 cardinal QTEs (misses don't penalize), 1.0s Morph window, Kohaku does not dodge Petting."
      },
      2: {
        chapter: "Chapter 2",
        name: "Sunset Foxfire",
        subtitle: "Twilight reveals every hesitation",
        bossRuleSummary: "3s",
        bossRuleDetail: "3s countdown, 8-directional QTE (fails on 2 misses), 0.75s Morph window, 11% Petting dodge rate."
      },
      3: {
        chapter: "Chapter 3",
        name: "Moonlit Trial of the Nine Tails",
        subtitle: "Don't let the nine afterimages deceive you",
        bossRuleSummary: "3s",
        bossRuleDetail: "3s countdown, 7-key QTE (fails on 1 miss), 0.5s Morph window, 33% Petting dodge rate."
      },
      4: {
        chapter: "Final Chapter",
        name: "Mirror Realm: Platinum Kohaku",
        subtitle: "Step through the mirror and face the twin 2P alter",
        bossRuleSummary: "3s / Twin Kohakus Dual HP",
        bossRuleDetail: "3s countdown, Twin Kohakus (takes 2x damage on hit), 7-key QTE, 0.25s tight Morph window, 66% Petting dodge rate."
      }
    },
    skills: {
      momo: {
        name: "Petting",
        glyph: "抚",
        description: "Triggers on RPS draws by chance to gently pet a random Kohaku, dealing 25 damage."
      },
      dualHand: {
        name: "Dual Hands",
        glyph: "掌",
        description: "Unlock your second hand! In Chapter 4, throw left hand (vs Left Kohaku) and right hand (vs Right Kohaku) independently."
      }
    },
    items: {
      hpPotion: {
        name: "Crimson Elixir",
        shortName: "HP Potion",
        description: "Shrine-crafted crimson elixir. Instantly restores 25 HP upon use."
      },
      mpPotion: {
        name: "Azure Moonlight Dew",
        shortName: "MP Potion",
        description: "Purified essence of moonlight. Instantly restores 25 MP upon use."
      }
    },
    equipmentSlots: {
      head: "Head",
      shoulders: "Shoulders",
      chest: "Chest",
      belt: "Belt",
      boots: "Boots",
      mainHand: "Main Hand",
      offHand: "Off Hand",
      ring1: "Ring 1",
      ring2: "Ring 2",
      earring1: "Earring 1",
      earring2: "Earring 2",
      badge: "Badge"
    },
    equipment: {
      chest_samurai: {
        name: "Genbu Adamantine Cuirass",
        description: "Heavy armor blessed by the divine Genbu. Directly reduces incoming damage by 25 (stacks with shield)."
      },
      chest_ninja: {
        name: "Spirit Fox Phantom Haori",
        description: "Woven from nine-tails fur. 25% chance on losing throw to trigger phantom dodge, completely nullifying damage!"
      },
      chest_miko: {
        name: "Purifying White Fox Chihaya",
        description: "Pure white ceremonial robe. Restores 15 MP at the end of every round."
      },
      chest_mirror: {
        name: "Yata Mirrorlight Breastplate",
        description: "Armor embedded with sacred mirror shards. Reflects 40 damage back to Kohaku when hit."
      },
      sword_flame: {
        name: "Hellfire Flame Katana",
        description: "Engulfed in inextinguishable foxfire. Inflicts 30 burn damage to Kohaku at the end of each round."
      },
      sword_frost: {
        name: "Frostmoon Freezing Spiritblade",
        description: "A spirit blade radiating piercing cold. On hit, 30% chance to freeze Kohaku's hand, sealing one random gesture next round."
      },
      sword_thunder: {
        name: "Thunder God Swift Rapier",
        description: "Crackling with lightning. Deals +50 bonus electric damage upon successful QTE counter."
      },
      sword_great_nine: {
        name: "Ruin: Nine-Tails Greatsword",
        description: "Infused with feral nine-tails fury (Two-Handed). Normal RPS win damage increased to 1.5x."
      },
      shield_suzaku: {
        name: "Barrier: Suzaku Shield",
        description: "Divine shield engraved with Suzaku crest. Reduces damage from RPS loss and failed QTE by 30."
      },
      dagger_shadow: {
        name: "Shadowmoon Dagger",
        description: "Concealed in darkness. Can be equipped in main or off hand; adds +15 bonus damage to draw Petting."
      },
      helm_fox: {
        name: "Kitsune Mask",
        description: "Carved in Kohaku's likeness. Provides balanced bonus to HP, MP, and Attack."
      },
      shoulders_crimson: {
        name: "Crimson Pauldrons",
        description: "Sturdy pauldrons tempered with shrine torii lacquer. Significantly boosts Max HP and Attack."
      },
      belt_shimenawa: {
        name: "Sacred Shimenawa Belt",
        description: "Woven with shrine warding cords. Potion restoration effects increased by +10."
      },
      boots_gale: {
        name: "Gale Waraji",
        description: "Wind-walking sandals. Extends QTE counter window by +1.0s."
      },
      earring_magatama: {
        name: "Yasakani Magatama Earring",
        description: "Ancient verdant jewel. Reduces MP cost of Morph technique by 5."
      },
      ring_ruby: {
        name: "Foxfire Ruby Ring",
        description: "Seals fiery fox spirit energy. Increases Max HP and Attack."
      },
      ring_sapphire: {
        name: "Moonlight Sapphire Ring",
        description: "Shimmers with cool moonlight. Increases Max MP and Attack."
      },
      badge_bond: {
        name: "Badge of Bond's Protection",
        description: "Token of deep bonding with Kohaku. Boosts all stats and grants +20% extra Star Sand on victory."
      }
    },
    dojo: {
      modalTitle: "Training Dojo & Sandbox",
      modalSubtitle: "Hone reflexes & test DPS build limits",
      mode1Title: "Mode 1: Pure Continuous QTE",
      mode1Desc: "No RPS or turns; continuous QTE sequence generation to sharpen muscle memory.",
      mode1Style1: "Style 1: Single Track QTE",
      mode1Style1Desc: "Standard 8-direction single-track keyboard drills",
      mode1Style2: "Style 2: Dual Track QTE",
      mode1Style2Desc: "Simulate Stage 4 dual-track controls (Left: WASD, Right: Arrows)",
      mode2Title: "Mode 2: Combat & DPS Sandbox",
      mode2Desc: "Full battle flow against solid-black Koyuki dummy with custom HP & damage, zero risk.",
      mode2Style1: "Style 1: Single Dummy Battle",
      mode2Style1Desc: "Single shadow silhouette dummy for DPS and morph counter practice",
      mode2Style2: "Style 2: Dual Dummy Battle",
      mode2Style2Desc: "Dual shadow silhouette dummies simulating Stage 4 dual hands & QTE",
      customHpLabel: "Dummy Max HP",
      customDmgLabel: "Dummy ATK Damage",
      zeroDamageHint: "(Default 0 DMG = player immune to loss)",
      btnStartPractice: "Start Practice",
      btnExitDojo: "End Practice",
      combo: "Combo",
      maxCombo: "Max Combo",
      avgReaction: "Avg Reaction",
      successRate: "Success Rate",
      dummySilhouette: "Shadow Kohaku",
      dummySilhouetteLeft: "Shadow Kohaku (L)",
      dummySilhouetteRight: "Shadow Kohaku (R)",
      chapterName: "Training Dojo",
      dojoStatsTitle: "Dojo Training Summary",
      btnReturnDojoMenu: "Return to Dojo Menu"
    },
    gallery: {
      koraku_default: {
        name: "Shrine Maiden: Fox Maiden Kohaku",
        variantName: "Default Outfit",
        description: "Kohaku the fox maiden guarding the Vermilion Torii. Dressed in her sleek cyber-miko outfit, she welcomes every challenger with a fearless smile."
      },
      koraku_2p: {
        name: "Mirror Realm: Platinum Kohaku",
        variantName: "2P Color",
        description: "The radiant platinum form appearing from beyond the mirror realm. Silver hair gleaming with azure light, unveiled only by champions of the Final Chapter."
      },
      swimsuit_default: {
        name: "Summer Festival: Breezy Swimsuit",
        variantName: "Default Swimsuit",
        description: "A rare sight of Kohaku in her refreshing summer swimsuit, revealed only after claiming victory."
      },
      swimsuit_watermelon: {
        name: "Ocean Breeze: Watermelon Split",
        variantName: "Watermelon Split",
        description: "Kohaku proudly showing off her triumph after acing the blindfolded watermelon splitting game."
      }
    },
    dialogue: {
      watermelonNotAim: "Watermelon game not in aim phase.",

      speakerPlayer: "Traveler",
      speakerKohaku: "Kohaku",
      speakerPlatinumKohaku: "Platinum Kohaku",
      speakerNarrator: "Narrator",
      homeGreeting: "Ready yet? Don't take your eyes off me this time!",
      introNormal: "Show me what you've got! Let's see your resolve.",
      introFinal: "The mirror version of me won't go easy on you!",
      chant3: "Scissors",
      chant2: "Rock",
      chant1: "Paper!",
      morphReaction: "Wait... you changed your hand at the last second?!",
      qteSingleBreak: "Caught you slipping! If you wanna dodge, keep up with my rhythm!",
      qteDualBreak: "Double opening! Can you match our twin rhythm?!",
      winDualMorphBoth: "Both hands won via Morph! The dual stance completely collapses!",
      winDualBoth: "Both hands won! A flawless dual suppression!",
      winDualMorphSingle: "Breached one side using Morph!",
      winDualSingle: "Breached one side!",
      winDualMorphDoubleDmg: "Dual Morph total victory! Deals double damage!",
      winDualDoubleDmg: "Both hands won! Deals double damage!",
      winSingleMorph: "Morph reversal victory!",
      winSingleNormal: "Round won!",
      drawMomoDodge: "Tried to pet on a draw, but {target} nimbly dodged!",
      drawMomoHit: "Petted during the draw! Dealt {damage} surprise damage to {target}!",
      drawNormal: "It's a draw! Hands matched!",
      deflectedSingleAttack: "Deflected {target}'s attack!",
      dualQteMiss: "Dual QTE counter failed!",
      dualQteSuccess: "Dual QTE counter succeeded! Total reversal!",
      qteMiss: "QTE counter failed!",
      freezeNarration: "Frost Freeze! Kohaku's '{hand}' is frozen!",
      dodgeDodge: "Shadow Dodge! Successfully evaded the attack!",
      dodgeDodgeDual: "Shadow Dodge! Evaded the dual attacks!",
      postBattleWin: "You got me this time! What wish are you gonna use this win for?",
      postBattleLoss: "Got anything else to say? Hit the training grounds and try again!",
      askSwimsuitLine: "A swimsuit? Geez, fine... but just a quick peek, okay!",
      watermelonAttempt: "Strike #{nextAttempt}! When the white needle hits the green zone, call 'NOW!'!",
      watermelonHit: "Nice cut! Sliced clean through! {remaining} strike(s) left.",
      watermelonMiss: "So close! Still got {remaining} strike(s) left. Go for it next!",
      watermelonAllHit: "All 3 strikes done! Sliced it {successes} time(s)—that was so much fun!",
      watermelonDone: "All 3 strikes finished. Let's get the timing right next time!",
      itemUsed: "Used \"{name}\", restoring {restored} {resource}.",
      serverDisconnectGrace: "Connection lost. Preserving battle state (10s grace period)...",
      serverConfigMismatch: "Server update detected. Please reload to sync the latest version.",
      serverSessionReplaced: "Your account has connected from another device or tab. Session terminated.",
      serverInvalidCommand: "Action rejected: {reason}",
      serverLockedInBattle: "Equipment and stat allocation are locked during active battle!"
    },
    narration: {
      qteCounterPaper: "Wrapped hands around Kohaku's scissors — Counter success!",
      qteCounterScissors: "Caught Kohaku's fist with paper — Counter success!",
      qteCounterRock: "Interlocked fingers with Kohaku's soft hand, a miraculous win!"
    },
    toast: {
      levelRequirementNotMet: "Your level does not meet the requirement for this chapter."
    },
    combat: {
      morphWindowOnly: "Morph can only be used during the reaction window after Kohaku plays her hand.",
      morphWindowExpired: "Reaction window has expired.",
      insufficientMp: "Insufficient MP to use Morph.",
      tookDamage: "Took damage",
      notInBattle: "Not currently in battle.",
      itemNotFound: "Item not found.",
      resourceFull: "{resource} is already full.",
      itemDepleted: "{name} is depleted."
    },
    shop: {
      itemNotFound: "Item not found in shop.",
      insufficientCoins: "Not enough Star Dust. Earn more from battles!",
      itemPurchased: "Purchased '{name}'!",
      equipmentPurchased: "Purchased '{name}' and added to inventory!"
    },
    equip: {
      invalidItem: "Invalid equipment.",
      notInInventory: "Equipment not found in inventory.",
      invalidSlot: "Invalid equipment slot.",
      incompatibleSlot: "Cannot equip '{name}' to {slotName}.",
      equipped: "Equipped '{name}'.",
      slotEmpty: "This slot is empty.",
      unequipped: "Equipment unequipped."
    },
    growth: {
      invalidStat: "Invalid stat.",
      noPoints: "No stat points available.",
      statIncreased: "Stat increased.",
      invalidSkill: "Invalid skill.",
      levelRequirementNotMet: "Requires Level {level} to learn this skill.",
      skillMaxLevel: "This skill has reached max level.",
      insufficientPoints: "Insufficient skill points.",
      skillUpgraded: "'{name}' upgraded to Lv. {level}!"
    },
    cheat: {
      updated: "Values updated!",
      unlockedAll: "Unlocked all 4 stages and Boss guides!",
      unlockedGallery: "Unlocked all gallery illustrations!"
    },
    save: {
      transferCodeRequired: "Transfer code is required.",
      transferCodeNotFound: "Transfer code not found.",
      transferCodeAlreadyClaimed: "Transfer code has already been claimed.",
      transferCodeExpired: "Transfer code has expired.",
      transferClaimFailed: "Transfer code claim failed.",

      invalidCode: "Please enter a valid save code.",
      corruptCode: "Invalid or corrupted save code.",
      imported: "Save data successfully imported!"
    },
    connection: {
      newConnectionEstablished: "Another connection for this account was established. You have been disconnected.",

      connecting: "Connecting",
      online: "Online",
      offline: "Offline",
      reconnecting: "Reconnecting",
      disconnected: "Disconnected",
      highLatency: "Ping",
      kickedByNewConnection: "Your account has connected from another device or tab. This session was safely disconnected.",
      disconnectCountdown: "Connection lost. Reconnecting (Auto-settling in {seconds}s)...",
      bannerConnecting: "Connecting to server...",
      bannerOnline: "Connected to authoritative server",
      bannerOffline: "Running in local offline sandbox mode",
      bannerReconnecting: "Connection lost. Reconnecting...",
      bannerDisconnected: "Disconnected from server"
    },
    battle: {
      lockedDuringBattle: "Equipment and stat allocation are locked during active battle."
    },
    battleLog: {
      lockedDuringBattle: "Equipment and stat allocation are locked during active battle.",
      battleInProgress: "Battle already in progress.",
      battleStartFailed: "Failed to start battle.",
      noActiveBattle: "No active battle session.",
      invalidPhasePause: "Pause is only allowed during countdown phase.",
      useItemFailed: "Failed to use item.",

      rpsWin: "RPS [{hand}] Win! Dealt {damage} damage to {target}!",
      rpsLoss: "RPS [{hand}] Loss! Took {damage} damage!",
      rpsDraw: "Both showed [{hand}], Draw!",
      morphSuccess: "Morph [{hand}] Reversal! Dealt {damage} damage to {target}!",
      morphFailed: "Morph hand was countered! Mistake penalized!",
      qteCounterSuccess: "QTE Counter Success! Avoided damage and countered {target} for {damage} damage!",
      qteCounterFail: "QTE Counter Failed! Took {damage} heavy damage!",
      momoProc: "Momo Petting Proc! Dealt {damage} surprise damage to {target}!",
      momoDodged: "Little Raku deftly dodged the Momo Petting!",
      burnDamage: "Hellfire Burn! Dealt {damage} fire damage to {target}!",
      reflectDamage: "Yata Mirror Reflect! Reflected {damage} damage back to {target}!",
      thunderDamage: "Thunder Strike Addition! Struck {target} for {damage} extra thunder damage!",
      frostFreeze: "Frost Blade Freeze! Sealed Little Raku's [{hand}] for the next round!",
      shadowDodge: "Fox Illusion Haori activated! 25% shadow dodge completely avoided damage!",
      mpRegen: "White Fox Chihaya activated! Restored {amount} MP.",
      potionUsed: "Used [{item}], restored {amount} {stat}!",
      roundTimeout: "Round countdown expired! Forfeited round!",
      battleDisconnectedSettled: "Battle automatically settled due to disconnect timeout.",
      battlePauseCount: "Battle paused (Remaining pauses: {remaining})."
    }
  },

  "ja": {
    meta: {
      title: "狐楽・絆の勝負",
      titleEm: "Endless Koraku",
      subtitle: "KORAKU NO SHŌBU",
      eyebrow: "じゃんけん・狐火異聞",
      lead: "五秒で一手。彼女の指先を見極め、劣勢の中で唯一の反撃を掴み取れ。"
    },
    ui: {
      playerProfile: "プレイヤー情報",
      switchLanguage: "言語切替",
      toggleBgm: "BGM切替",
      toggleSfx: "効果音切替",
      mainMenu: "メインメニュー",
      battleRecords: "戦績",
      footerInfo: "フッター情報",
      changelog: "更新履歴を見る",
      galleryZoom: "全画面で見る",
      galleryZoomTitle: "高解像度鑑賞",
      rpsBattle: "じゃんけんバトル",
      toggleAutoBattle: "自動周回の一時停止／再開",
      kohakuHp: "コハクのHP",
      battleLogToggle: "戦闘ログ（クリックで表示切替）",
      battleLogToggleTitle: "表示切替：最新1件／直近5件／全記録",
      roundStatus: "現在のラウンド状況",
      playerHpMp: "プレイヤーHP・MP",
      selectHand: "手を選ぶ",
      itemSkillBar: "アイテム・スキルバー",
      counterQte: "反撃QTE",
      directionInput: "方向入力",
      toggleUiVisibility: "UI表示切替",
      toggleUiVisibilityTitle: "立ち絵鑑賞（UI表示切替）",
      togglePanelSize: "パネルサイズ切替",
      togglePanelSizeTitle: "拡大／縮小",
      closeOverlay: "オーバーレイを閉じる",
      dojoQtePractice: "道場QTE練習",
      closeModal: "閉じる",
      clickSelectAll: "クリックして全選択",
      openOriginalImage: "新しいタブで原寸画像を開く",
      closeGalleryZoom: "拡大表示を閉じる",
      closeGalleryZoomTitle: "閉じる (ESC)",
      selectRockKey: "グーを選択 (キー: 1)",
      selectPaperKey: "パーを選択 (キー: 2)",
      selectScissorsKey: "チョキを選択 (キー: 3)",
      selectLeftRockKey: "左手グー (キー: 1 または Q)",
      selectLeftPaperKey: "左手パー (キー: 2 または W)",
      selectLeftScissorsKey: "左手チョキ (キー: 3 または E)",
      selectRightRockKey: "右手グー (キー: 7 または J または Num1)",
      selectRightPaperKey: "右手パー (キー: 8 または K または Num2)",
      selectRightScissorsKey: "右手チョキ (キー: 9 または L または Num3)",
      useHpPotionKey: "HPポーション使用 (キー: 4 または Q)",
      useMorphKey: "1秒以内に手を変える (キー: F)",
      useMpPotionKey: "MPポーション使用 (キー: 5 または E)",

      menuRecords: "戦績統計",
      menuRecordsSub: "RECORDS & STATS",
      homeRecordsTitle: "旅の記録と戦闘分析",
      homeRecordsDesc: "全章の戦績、実戦DPS、装備構成、成長記録の詳細分析。",
      theoreticalDps: "理論DPS",
      combatDps: "実戦DPS",
      currentEquipment: "現在の装備構成",
      currentLevelXp: "冒険レベルと経験値",
      consumablesUsed: "消費アイテム使用累計",
      morphSuccesses: "後出し変化成功",
      momoStats: "なでなで発動",
      watermelonCutAnalysis: "スイカ割り段階別命中分析",
      strikeStage: "第 {index} 刀",
      strikeTotal: "三刀合計",
      successRate: "成功率",
      damageDealt: "与ダメージ",
      damageTaken: "被ダメージ",
      qteSuccessRate: "QTE 成功率",
      rewardsEarned: "獲得報酬",
      recentBattlesTitle: "直近100局の対戦記録",
      battleDuration: "戦闘時間",
      stageDamageDealt: "累計与ダメージ",
      stageDamageTaken: "累計被ダメージ",
      hpPotionCountUsed: "HPポーション使用: {count}本",
      mpPotionCountUsed: "MPポーション使用: {count}本",
      strikeAttempts: "{attempts} 回 ({successes} 命中 / {failures} 失敗)",
      resultWin: "勝利",
      resultLoss: "敗北",
      modeAuto: "自動",
      modeManual: "手動",
      statTotalCoinsEarned: "累計獲得星砂",
      statTotalXpEarned: "累計獲得経験値",
      statTotalBattles: "総対局数",
      statManualRecord: "手動対決戦績",
      statAutoRecord: "自動周回戦績",
      statWatermelonHits: "スイカ命中累計",
      stageAttempts: "挑戦 {total} 回",
      stageRecordBadge: "自動勝 {autoWins} / 手動敗 {manualLosses}",
      stageStatsBreakdownTitle: "各章挑戦統計",
      footerEndlessAliceLink: "Steam で『Endless Alice』をチェック",
      times: "回",
      home: "ホーム",
      level: "レベル",
      xp: "経験値",
      changelogTitle: "更新履歴",
      changelogSubtitle: "バージョン履歴と更新記録",
      closeChangelog: "閉じる",
      coins: "星砂",
      soundToggle: "効果音切替",
      sfxToggle: "効果音切替",
      musicToggle: "BGM切替",
      musicToggleOn: "BGMを再生",
      musicToggleOff: "BGMを消音",
      sfxToggleOn: "効果音を再生",
      sfxToggleOff: "効果音を消音",
      musicOnToast: "BGMを有効にしました。",
      musicOffToast: "BGMを無効にしました。",
      sfxOnToast: "効果音を有効にしました。",
      sfxOffToast: "効果音を無効にしました。",
      rewardEarned: "獲得報酬",
      zoomHighRes: "拡大鑑賞",
      clickToZoom: "クリックで高画質全画面拡大",
      closeLightbox: "閉じる",
      langToggle: "言語",
      back: "戻る",
      wins: "勝利",
      losses: "敗北",
      deepestStage: "到達章",
      receptionSeal: "対戦<br>受付中",
      openCheat: "デバッグ・チート設定",
      cheatAuthTitle: "チート認証",
      cheatAuthPrompt: "管理パスワードを入力してデバッグメニューを開放します：",
      cheatAuthPlaceholder: "パスワード (8989)",
      cheatAuthConfirm: "解除",
      cheatAuthCancel: "キャンセル",
      cheatAuthError: "パスワードが正しくありません。",
      cheatAuthSuccess: "パスワードが一致しました。デバッグメニューを開放しました！",
      galleryUnlockedTag: "解放済み",
      galleryLockedTag: "未解放",
      resetSave: "セーブ初期化",
      resetConfirm: "すべてのセーブデータを初期化しますか？この操作は取り消せません。",
      saveRecord: "セーブ記録",
      saveRecordModalTitle: "セーブ記録とシード管理",
      saveOverviewTitle: "現在のセーブ状況概要",
      saveOverviewLevel: "冒険レベル",
      saveOverviewCoins: "所持星砂",
      saveOverviewStage: "到達章",
      saveOverviewBattles: "総対局数",
      saveOverviewEquipCount: "所持装備数",
      btnViewRecordsDetail: "戦績統計の詳細を見る ›",
      saveRecordsHint: "セーブシードには冒険履歴、全章の戦績、手動/自動勝敗、DPS分析、スイカ命中記録がすべて完全に保存され、他端末でも無損失で復元されます。",
      saveSeedExportTitle: "現在のセーブシードを出力",
      saveSeedExportDesc: "現在のレベル、装備、星砂、スキル配分、戦績記録を含むシードコードです。バックアップや他端末への移行に使用できます：",
      btnCopySaveSeed: "シードをコピー",
      toastSeedCopied: "セーブシードをクリップボードにコピーしました！",
      saveSeedImportTitle: "シードを入力（他端末から引き継ぎ）",
      saveSeedImportDesc: "他の端末から出力したセーブシードを貼り付けて、本端末に冒険記録を引き継ぎます：",
      importSeedPlaceholder: "ここにセーブシードを貼り付け（例: KORAKU1_...）",
      btnImportSaveSeed: "シードを読み込んで適用",
      confirmImportSeed: "このシードを読み込むと現在の端末の進行データが上書きされます。適用しますか？",
      confirmAbandonBattle: "今撤退すると星砂や経験値を獲得できません。本当に離脱しますか？",
      toastImportSuccess: "セーブシードが正常に読み込まれ、適用されました！",
      toastImportFailed: "無効または破損したセーブシードです。コピー内容を確認してください。",
      toastSeedEmpty: "セーブシードを入力または貼り付けてください。",
      dangerZoneTitle: "セーブデータ初期化・削除管理",
      dangerZoneDesc: "この端末に保存されているすべての進行状況（レベル、星砂、装備、スキル、戦績）を消去して初期状態に戻します：",
      btnModalResetSave: "全セーブデータを初期化（消去）",
      // Online connection, transfer code, export, delete
      connConnecting: "接続中",
      connOnline: "オンライン",
      connOffline: "オフラインモード",
      connReconnecting: "再接続中",
      connDisconnected: "切断",
      connBannerConnecting: "サーバーに接続中...",
      connBannerOnline: "権威サーバーに接続完了",
      connBannerOffline: "ローカルオフラインモードで実行中",
      connBannerReconnecting: "接続が切断されました。再接続を試みています...",
      connBannerDisconnected: "サーバーから切断されました",
      connectionModeToggle: "接続モード切り替え",
      connectionErrorVersionMismatch: "バージョンが一致しません。ページを再読み込みしてください。",
      connectionRateLimited: "リクエスト頻度が高すぎます。しばらく待ってから再試行してください。",
      transferCode: "引き継ぎコード",
      transferCodeModalTitle: "アカウント引き継ぎコード管理",
      transferCodeIssueTitle: "ワンタイム引き継ぎコードの発行",
      transferCodeIssueDesc: "新しい端末へアカウントデータを移行するためのワンタイムコードを発行します。有効期限は発行後15分間です。",
      btnIssueTransferCode: "引き継ぎコードを発行",
      transferCodePrompt: "あなたの引き継ぎコード（クリックでコピー）：",
      transferCodeExpiresIn: "有効期限：{minutes}分",
      btnCopyTransferCode: "コードをコピー",
      toastTransferCodeCopied: "引き継ぎコードをクリップボードにコピーしました！",
      transferCodeClaimTitle: "引き継ぎコードの入力（この端末へ移行）",
      transferCodeClaimDesc: "移行元端末で発行された引き継ぎコードを入力してください。この端末へ進行状況が引き継がれます：",
      transferCodePlaceholder: "引き継ぎコードを入力（例: KTR-XXXX-XXXX）",
      btnClaimTransferCode: "引き継ぎを実行して読み込む",
      confirmClaimTransferCode: "引き継ぎを実行すると、対象のアカウントに切り替わります。続行しますか？",
      toastTransferCodeSuccess: "引き継ぎが完了しました！最新データを読み込みました。",
      toastTransferCodeInvalid: "無効または期限切れの引き継ぎコードです。再度ご確認ください。",
      exportJson: "アカウントデータ出力 (JSON)",
      exportJsonTitle: "アカウント全データのエクスポート (JSON)",
      exportJsonDesc: "レベル、装備インスタンス、経済台帳、対戦履歴を含む全データのJSONファイルをダウンロードします：",
      btnDownloadJson: "JSONファイルをダウンロード",
      btnCopyJson: "JSONをコピー",
      toastExportJsonSuccess: "アカウントデータのエクスポートが完了しました！",
      deleteAccount: "アカウント削除",
      deleteAccountTitle: "アカウントとクラウド記録の完全削除",
      deleteAccountWarning: "【警告】この操作を行うと、サーバーおよびローカルのアカウント情報、装備、記録が完全に削除され、復元できなくなります！",
      deleteAccountConfirmPrompt: "削除を確定するには、以下に「DELETE」と入力してください：",
      btnConfirmDeleteAccount: "アカウントを完全に削除する",
      toastDeleteAccountSuccess: "アカウントと全進行データが完全に削除されました。",
      toastDeleteAccountMismatch: "確認テキストが一致しないため、削除を中止しました。",
      navDojo: "修練場",
      menuDojo: "修練道場",
      menuDojoSub: "QTE & SANDBOX",
      recentDamageLog: "戦闘ログ",
      damageSourceRps: "じゃんけん勝利",
      damageSourceMorph: "変拳カウンター",
      damageSourceCounter: "QTEカウンター",
      damageSourceMomo: "なでなで急襲",
      damageSourceBurn: "炎上ダメージ",
      damageSourceReflect: "鏡光反射",
      damageSourceThunder: "雷鳴追撃",
      damageSourceBurst: "大剣一撃",
      damageSourceEnemy: "敵の攻撃",
      atkLabel: "ATK",
      menuStages: "物語対戦",
      menuStagesSub: "STORY BATTLE",
      menuGrowth: "能力強化",
      menuGrowthSub: "PLAYER GROWTH",
      menuShop: "縁側商店",
      menuShopSub: "ITEM SHOP",
      menuGallery: "狐娘図鑑",
      menuGallerySub: "ILLUSTRATION GALLERY",
      menuGuide: "遊び方",
      menuGuideSub: "HOW TO PLAY",
      menuEquipment: "装備・荷物",
      menuEquipmentSub: "EQUIPMENT & BAG",
      stagesTitle: "章選択",
      stagesSubtitle: "章が進むほどコハクは手強くなります。レベルを上げて新たな鏡界を開放しましょう。",
      shopTitle: "縁側商店",
      shopSubtitle: "霊薬や神威武具を購入できます。購入した装備はそのまま荷物袋に格納されます。",
      growthTitle: "能力強化",
      growthSubtitle: "レベルアップで獲得したポイントを振り分けるか、奥義・必殺スキルを習得しましょう。",
      galleryTitle: "狐娘図鑑",
      gallerySubtitle: "旅の思い出と特別な衣装イラストを閲覧できます。",
      guideTitle: "遊び方",
      guideSubtitle: "じゃんけん対決、QTEカウンター、変拳、両手奥義の極意をマスターしましょう。",
      equipmentTitle: "装備と荷物",
      equipmentSubtitle: "神威装備を身に着けてステータスを強化し、対戦で特殊な加護を発動させましょう。",
      paperdollTitle: "現在の装備状況",
      paperdollSummaryTitle: "✦ 装備ペーパードール＆総合ステータス（枠クリックで装備解除）",
      paperdollEquipped: "装備中",
      paperdollEmpty: "未装備",
      paperdollUnequipTip: "（枠をクリックで解除）",
      bagTitle: "装備バッグ",
      bagEmpty: "バッグの中に装備がありません。縁側商店で購入してみましょう！",
      bagEquipBtn: "装備する",
      bagUnequipBtn: "外す",
      bagEquippedBadge: "装備中",
      twoHandedBadge: "両手持ち",
      unallocatedSp: "未割り当てポイント (SP)",
      statHpName: "最大体力 (HP)",
      statHpDesc: "対決における耐久力を向上させます",
      statMpName: "最大霊力 (MP)",
      statMpDesc: "変拳秘術やスキルの発動に必要です",
      statDmgName: "基礎攻撃力 (DMG)",
      statDmgDesc: "じゃんけん勝利時の与ダメージを高めます",
      btnAllocate: "強化 +1",
      skillsHeading: "奥義・必殺スキル",
      btnUpgradeSkill: "スキル強化",
      skillMaxLevel: "最大レベル到達",
      skillLocked: "未解放（必要 Lv.{level}）",
      skillCostSp: "消費 {sp} SP",
      shopPaperdollToggle: "✦ 装備ペーパードール＆総合ステータス（枠クリックで装備解除）",
      shopConsumablesHeading: "霊薬・ポーション",
      shopEquipmentHeading: "神威装備武具",
      btnBuy: "購入",
      btnEquipDirect: "今すぐ装備",
      itemOwned: "所持中",
      insufficientCoins: "星砂が足りません！",
      battleRounds: "ターン",
      targetEnemy: "ターゲット",
      playerLeftHand: "左手",
      playerRightHand: "右手",
      morphSkillBtn: "変拳秘術 (25 MP)",
      useHpPotion: "HP 薬水",
      useMpPotion: "MP 薬水",
      qteFailCount: "ミス",
      qteTimeRemaining: "反撃猶予",
      dualQteNotice: "ダブル QTE カウンター！WASD / 矢印キーを連続入力！",
      postBattleVictoryTitle: "対局勝利！",
      postBattleDefeatTitle: "対局敗北...",
      postBattleVictoryDesc: "コハクに勝利しました！経験値と星砂をたっぷり獲得！",
      postBattleDefeatDesc: "コハクの攻勢に敵いませんでした。態勢を立て直して再挑戦しましょう！",
      btnAskSwimsuit: "水着に着替えてもらう",
      btnPlayWatermelon: "海辺のスイカ割りに挑戦",
      btnContinue: "章選択へ戻る",
      btnRetry: "もう一度挑戦",
      watermelonTitle: "目隠しスイカ割りチャレンジ！",
      watermelonDesc: "白い針が緑のゾーンに入ったらボタンを押そう。直感とタイミングの勝負！",
      btnSliceWatermelon: "今だ！一刀両断！",
      watermelonScore: "命中回数：",
      autoWatermelonStock: "スイカ割り蓄積回数：{count} / 999",
      btnNextWatermelonRound: "次のスイカ割りを開始 (残り {count})",
      btnStartWatermelonRound: "スイカ割りを開始",
      floatingWatermelonTitle: "🍉 目隠しスイカ割り（自動周回蓄積）",
      floatingWatermelonAimDesc: "白い針が緑のゾーンに入ったらボタンを押そう！",
      floatingWatermelonFinished: "3太刀終了！蓄積残り：{count} 回",
      floatingWatermelonNoStock: "スイカ割り回数を使い切りました。自動周回で勝利すると蓄積されます...",
      guideRpsTitle: "基本じゃんけんルール",
      guideRpsDesc: "チョキはパーに勝ち、パーはグーに勝ち、グーはチョキに勝つ。勝ちでダメージ、あいこでナデナデ、負けで QTE 反撃へ突入。",
      guideQteTitle: "起死回生の QTE 反撃",
      guideQteDesc: "負けた直後の猶予時間内に方向キーを素早く入力。カウンター成功でダメージ無効＆反撃打撃を与えます！",
      guideMorphTitle: "刹那の変拳秘術",
      guideMorphDesc: "小楽の手が見えた反応時間内にMPを消費して変拳を発動！2秒以内に手勢を選択して反撃せよ。間違えた場合は敗北またはあいこの撫で判定になります。",
      guideDualTitle: "両手解放の極意",
      guideDualDesc: "第4章で両手スキルを解放すると、左手と右手で独立してじゃんけんが可能に！",
      cheatModalTitle: "デバッグ・チート設定",
      cheatSetLevel: "レベル変更",
      cheatAddCoins: "星砂追加 (+1000)",
      cheatAddSp: "SP追加 (+50)",
      cheatUnlockAllStages: "全ステージ開放",
      cheatUnlockAllGallery: "全図鑑開放",
      cheatMaxAll: "最大Lv + 99999 星砂 + 100 SP",
      cheatAddPotions: "各ポーション10個獲得",
      cheatAddAllEquip: "全神威装備を獲得",
      cheatClose: "閉じる",
      statDamage: "攻撃",
      statHp: "体力",
      statMp: "霊力",
      statArmor: "被ダメ軽減",
      statDodge: "回避",
      statMpRegen: "MP回復",
      statReflect: "反射",
      statBurn: "炎上",
      statFreeze: "氷結",
      statThunder: "雷撃",
      statMomoBonus: "ナデナデ加算",
      statCoinBonus: "星砂ボーナス",
      // Action strings
      enterStage: "対戦開始　›",
      stageNeedLevel: "Lv. {level} で解放 🔒",
      stageCleared: "撃破済・再挑戦　✓",
      ruleFocus: "ルール要点：",
      winReward: "勝利報酬：",
      notCleared: "未撃破",
      unlockRuleAfterClear: "このステージをクリアすると詳細ルールが解放されます",
      equippedBadge: "装備中 ✓",
      ownedInBag: "所持中",
      equipNow: "装備する",
      equipBuy: "購入",
      twoHandedOccupied: "⚔️ (両手占有)",
      unitDamage: "勝利時ダメージ",
      unitMaxHp: "最大 HP",
      unitMaxMp: "最大 MP",
      statAllocDmgDesc: "1ポイントにつき、与ダメージが5上昇。",
      statAllocHpDesc: "1ポイントにつき、最大HPが10上昇。",
      statAllocMpDesc: "1ポイントにつき、最大MPが10上昇。",
      spInvestBtn: "1 SP 割り当て ＋",
      momoProcRate: "あいこ発動率",
      dualHandUnlocked: "解放済",
      dualHandLocked: "未解放",
      dualHandDescSub: "第4章 両手出拳",
      nextLevelRate: "次レベル発動率: {chance}%",
      notYetUnlocked: "未解放",
      unlockSwimsuitHint: "対局勝利後に水着イベントを発生させて解放",
      unlock2PHint: "終ノ章（第4章）を1回勝利して解放",
      btnAskSwimsuitSpace: "水着に着替えてもらう",
      btnPlayWatermelonSpace: "目隠しスイカ割り",
      btnNextStrikeSpace: "{attempt}太刀目に挑戦",
      btnRematch: "再挑戦",
      btnSelectStages: "章選択",
      btnReturnHome: "ロビーへ",
      unrevealed: "未公開",
      preparing: "構え中",
      countdownCaption: "じゃんけん秒読",
      morphCaption: "Fキーで変拳",
      morphSelectCaption: "2秒以内に手勢を選択！",
      qteCaption: "反撃チャンス",
      settleCaption: "ターン結果",
      battleWon: "勝",
      battleLost: "負",
      battleDraw: "分",
      // Auto-Battle & Frost & Pause
      btnAutoBattle: "⚡ 自動周回",
      autoBattleModalTitle: "⚡ 自動連続周回設定",
      autoBattleModalDesc: "現在のステータスと装備構成でステージを連続周回します。勝利時はスイカ割りをスキップして報酬を獲得し次へ進み、敗北時は回数を消費して自動で再試行します。",
      autoBattleCountLabel: "連続周回回数を選択：",
      autoBattleTimes: "{count} 回",
      btnStartAutoBattle: "⚡ 自動周回を開始",
      btnCancel: "キャンセル",
      btnStopAutoBattle: "⏹ 周回停止",
      btnPauseAutoBattle: "周回一時停止",
      btnResumeAutoBattle: "周回再開",
      autoBattleHudRunning: "自動周回中：第 {current} / {total} 回（勝: {wins}, 敗: {losses}）",
      autoBattleHudPaused: "自動周回一時停止中：第 {current} / {total} 回（勝: {wins}, 敗: {losses}）",
      autoBattleToastUpdateWin: "自動周回：勝利！残り {remaining} 回...",
      autoBattleToastUpdateLoss: "自動周回：敗北！残り {remaining} 回...",
      autoBattleToastFinished: "🎉 自動周回完了！全 {total} 回（勝: {wins}, 敗: {losses}）。",
      autoBattleToastStopped: "自動周回を停止しました。",
      autoBattleToastPaused: "自動周回を一時停止しました。手動で続行するか再開を押してください。",
      autoBattleToastResumed: "自動周回を再開しました。",
      mustClearOnceForAuto: "自動周回を行うには、まず本ステージに一度勝利する必要があります！",
      frozenBadge: "❄️ 霜月氷結：コハクの【{hand}】は封印中！",
      ownedCount: "所持数 {total}",
      equippedCountBadge: "(装備中 {count})",
      pauseModalTitle: "⏸️ 対局一時停止中",
      pauseModalDesc: "バトルとQTEタイマーが停止中です。いつでも対局を再開、または対局を破棄して戻ることができます。",
      btnResumeBattle: "対戦再開",
      btnAbandonBattle: "対局破棄 (ロビーへ戻る)",
      abandonBattleModalTitle: "⚠️ 対戦離脱の確認",
      abandonBattleModalDesc: "対戦を離脱しますか？現在の進行状況と未精算の報酬は破棄されます。",
      btnConfirmAbandon: "離脱する",
      btnCancelAbandon: "戦闘を続ける",
      toggleSettlementUi: "立ち絵鑑賞",
      hideSettlementUi: "立ち絵鑑賞",
      showSettlementUi: "UIを表示",
      selectLanguage: "言語切替"
    },
    hands: {
      rock: { label: "グー", glyph: "✊" },
      paper: { label: "パー", glyph: "✋" },
      scissors: { label: "チョキ", glyph: "✌" }
    },
    directions: {
      upLeft: "左上",
      up: "上",
      upRight: "右上",
      left: "左",
      right: "右",
      downLeft: "左下",
      down: "下",
      downRight: "右下"
    },
    stages: {
      1: {
        chapter: "壱ノ章",
        name: "初逢・朱鳥居",
        subtitle: "彼女の仕草を見切ることから始めよう",
        bossRuleSummary: "5秒／4方向（ミス許容）",
        bossRuleDetail: "カウントダウン5秒、QTEは十字4方向のみ（押し間違い無罰則）、変拳猶予1.0秒、ナデナデ回避なし。"
      },
      2: {
        chapter: "弐ノ章",
        name: "夕映・狐火",
        subtitle: "黄昏は迷いを鮮明に映し出す",
        bossRuleSummary: "3秒",
        bossRuleDetail: "カウントダウン3秒、全8方向QTE（2回ミスで失敗）、変拳猶予0.75秒、ナデナデ回避率11%。"
      },
      3: {
        chapter: "参ノ章",
        name: "月下・九尾の試練",
        subtitle: "九つの残影に目を奪われるな",
        bossRuleSummary: "3秒",
        bossRuleDetail: "カウントダウン3秒、7連QTE（1回ミスで即失敗）、変拳猶予0.5秒、ナデナデ回避率33%。"
      },
      4: {
        chapter: "終ノ章",
        name: "鏡界・白金コハク",
        subtitle: "鏡を越え、双生の2Pカラーに挑め",
        bossRuleSummary: "3秒／双生コハク・2本ゲージ",
        bossRuleDetail: "カウントダウン3秒、双生コハク（被ダメージ2倍）、7連QTE、極限変拳猶予0.25秒、ナデナデ回避率66%。"
      }
    },
    skills: {
      momo: {
        name: "なでなで",
        glyph: "撫",
        description: "あいこ時に確率で発動。場のコハクを撫でて25ダメージを与える。"
      },
      dualHand: {
        name: "両手解放",
        glyph: "掌",
        description: "もう片方の手を解放！第4章にて左手（左コハク用）と右手（右コハク用）で同時に個別じゃんけんが可能になる。"
      }
    },
    items: {
      hpPotion: {
        name: "緋露薬",
        shortName: "HP 薬水",
        description: "神社謹製の緋色ポーション。使用すると体力が 25 回復します。"
      },
      mpPotion: {
        name: "蒼月露",
        shortName: "MP 薬水",
        description: "月光を宿した神聖な霊水。使用すると霊力が 25 回復します。"
      }
    },
    equipmentSlots: {
      head: "兜・仮面",
      shoulders: "肩当て",
      chest: "胸当て",
      belt: "腰帯",
      boots: "履物",
      mainHand: "主手武器",
      offHand: "副手武防",
      ring1: "指輪 1",
      ring2: "指輪 2",
      earring1: "耳飾り 1",
      earring2: "耳飾り 2",
      badge: "胸章"
    },
    equipment: {
      chest_samurai: {
        name: "玄武・金剛胸当て",
        description: "玄武の神霊が宿る重鎧。受けるダメージを直接 25 軽減（盾と重複可能）。"
      },
      chest_ninja: {
        name: "霊狐・幻影羽織",
        description: "九尾の毛で織られた羽織。負け被弾時に 25% の確率で残影回避が発動しノーダメ無効化！"
      },
      chest_miko: {
        name: "浄世・白狐千早",
        description: "神社の巫女が纏う白き千早。毎ターン終了時に MP を 15 回復。"
      },
      chest_mirror: {
        name: "八咫・鏡光胸当",
        description: "神鏡の破片を散りばめた胸甲。攻撃を受けた際、鏡光で 40 反射ダメージを返す。"
      },
      sword_flame: {
        name: "業火・炎の太刀",
        description: "決して消えぬ狐火を纏う太刀。ターン終了時にコハクへ 30 の炎上ダメージを与える。"
      },
      sword_frost: {
        name: "霜月・氷結霊刃",
        description: "凍てつく冷気を纏う霊刃。攻撃命中時 30% の確率で霜月氷結を発動し、次ターンの小楽の手の1つをランダムに封印する。"
      },
      sword_thunder: {
        name: "雷霆・神鳴迅剣",
        description: "雷光迸る刺剣。QTE カウンター成功時に 50 の追撃雷撃ダメージを与える。"
      },
      sword_great_nine: {
        name: "破滅・九尾両手巨剣",
        description: "九尾の狂気を宿す大剣（両手占有）。通常じゃんけん勝利時のダメージが 1.5 倍になる。"
      },
      shield_suzaku: {
        name: "結界・朱雀盾",
        description: "朱雀の神紋が刻まれた盾。じゃんけん負け及び QTE 失敗時の被ダメージを 30 軽減。"
      },
      dagger_shadow: {
        name: "影月・短匕",
        description: "夜陰に紛れる短刀。主手・副手どちらにも装備可能で、あいこナデナデのダメージ +15。"
      },
      helm_fox: {
        name: "妖狐の面",
        description: "コハクの姿を模した狐面。HP・MP・攻撃力をバランスよく強化。"
      },
      shoulders_crimson: {
        name: "緋紅の肩当て",
        description: "鳥居の朱漆で鍛えた堅牢な肩当て。最大 HP と攻撃力を大きく上昇させる。"
      },
      belt_shimenawa: {
        name: "注連縄神霊帯",
        description: "結界の注連縄で編まれた帯。ポーションの回復効果が +10 向上する。"
      },
      boots_gale: {
        name: "疾風の草履",
        description: "風を纏って走る神速の草履。QTE 反撃の猶予時間が +1.0 秒延長される。"
      },
      earring_magatama: {
        name: "八尺瓊勾玉の耳飾り",
        description: "神秘の翡翠勾玉。変拳スキルの消費 MP を 5 軽減。"
      },
      ring_ruby: {
        name: "狐火紅玉の指輪",
        description: "狐火の霊気を封じたルビーの指輪。HP と攻撃力を上昇させる。"
      },
      ring_sapphire: {
        name: "月華蒼玉の指輪",
        description: "蒼き月光を映すサファイアの指輪。MP と攻撃力を上昇させる。"
      },
      badge_bond: {
        name: "絆の守護バッジ",
        description: "コハクとの深い絆の証。全能力を高め、勝利時の獲得星砂が 20% 増加する。"
      }
    },
    dojo: {
      modalTitle: "修練場・特訓メニュー",
      modalSubtitle: "反射神経を鍛え、ビルドの限界を試す",
      mode1Title: "モード1：純粋QTE無限練習",
      mode1Desc: "じゃんけんやターンなし。純粋に連続QTEを生成し、反射とキー入力を鍛えます。",
      mode1Style1: "第一式・単軌連続QTE",
      mode1Style1Desc: "標準8方向単一トラック連続入力練習",
      mode1Style2: "第二式・双軌同時QTE",
      mode1Style2Desc: "第4章双生ボスの双軌状況を再現（左手WASD、右手方向キー）",
      mode2Title: "モード2：戦闘シミュレーション＆DPS検証",
      mode2Desc: "通常戦闘の流れで黒影小楽と対戦。HPとダメージを自由に設定可能、敗北リスクなし。",
      mode2Style1: "第一式・単体ダミー対決",
      mode2Style1Desc: "単体黒影ダミーでDPSと変拳・カウンターを検証",
      mode2Style2: "第二式・双生ダミー対決",
      mode2Style2Desc: "双生黒影ダミーで第4章の両手出しと双軌QTEを再現",
      customHpLabel: "ダミーHP設定",
      customDmgLabel: "ダミー攻撃力",
      zeroDamageHint: "（初期値0＝プレイヤーへのダメージなし、敗北なし）",
      btnStartPractice: "修練開始",
      btnExitDojo: "修練終了",
      combo: "コンボ",
      maxCombo: "最大コンボ",
      avgReaction: "平均反応",
      successRate: "成功率",
      dummySilhouette: "影・小楽",
      dummySilhouetteLeft: "影・小楽（左）",
      dummySilhouetteRight: "影・小楽（右）",
      chapterName: "修練場",
      dojoStatsTitle: "修練リザルト",
      btnReturnDojoMenu: "修練メニューへ戻る"
    },
    gallery: {
      koraku_default: {
        name: "神社・狐娘コハク",
        variantName: "デフォルト",
        description: "朱鳥居を守護する狐娘コハク。機甲巫女装束をまとい、不敵な笑みで挑戦者を迎え撃つ。"
      },
      koraku_2p: {
        name: "鏡界・白金コハク",
        variantName: "2Pカラー",
        description: "鏡界の彼方より現れし白金の姿。銀髪と蒼光をたたえ、終ノ章を制覇した猛者のみが目撃できる。"
      },
      swimsuit_default: {
        name: "夏祭り・清涼水着",
        variantName: "通常水着",
        description: "コハクが珍しく着替えた水着姿。勝負に勝った者だけが拝めるご褒美。"
      },
      swimsuit_watermelon: {
        name: "潮風・スイカ割り",
        variantName: "スイカ割り",
        description: "目隠しスイカ割りで完全勝利し、得意満面に成果を見せつけるコハク。"
      }
    },
    dialogue: {
      watermelonNotAim: "スイカ割りゲームはまだ照準段階に入っていません。",

      speakerPlayer: "旅人",
      speakerKohaku: "コハク",
      speakerPlatinumKohaku: "白金コハク",
      speakerNarrator: "ナレーション",
      homeGreeting: "準備はいい？今度は目を離しちゃダメだよ。",
      introNormal: "いざ勝負！君の覚悟、見せてもらおうかな。",
      introFinal: "鏡のボクは、手加減なんてしないよ！",
      chant3: "チョキ",
      chant2: "グー",
      chant1: "パー！",
      morphReaction: "えぇっ…最後の最後で手を変えたの…！？",
      qteSingleBreak: "スキあり！避けたいなら、ボクのリズムについてきて！",
      qteDualBreak: "ダブルでスキあり！ボクたち双子のリズムについてこられるかな？！",
      winDualMorphBoth: "変拳で両手とも完全勝利！双生の構えが崩壊！",
      winDualBoth: "両手とも勝利！見事な完全制圧！",
      winDualMorphSingle: "変拳で片側の防壁を突破！",
      winDualSingle: "片側の守りを突破！",
      winDualMorphDoubleDmg: "両手変拳で完全勝利！2倍の特大ダメージ！",
      winDualDoubleDmg: "両手出拳で完全勝利！2倍の特大ダメージ！",
      winSingleMorph: "変拳で逆転勝利！",
      winSingleNormal: "出拳勝利！",
      drawMomoDodge: "あいこで撫でようとしましたが、{target}に軽やかに躱されました！",
      drawMomoHit: "あいこに乗じてなでなで！{target}に {damage} の不意打ちダメージ！",
      drawNormal: "あいこで引き分け！",
      deflectedSingleAttack: "{target}の攻撃を受け流した！",
      dualQteMiss: "双生QTE反撃ミス！",
      dualQteSuccess: "双生QTE反撃成功！戦局を完全逆転！",
      qteMiss: "QTE反撃失敗！",
      freezeNarration: "霜月氷結！小楽の「{hand}」が封印された！",
      dodgeDodge: "残影回避！攻撃の完全回避に成功！",
      dodgeDodgeDual: "残影回避！二重攻撃の完全回避に成功！",
      postBattleWin: "今回はキミの勝ち！この勝利、どんなお願い事に使うの？",
      postBattleLoss: "まだ何か言いたいことある？もっと特訓してからおいで！",
      askSwimsuitLine: "水着？もう、しょうがないなぁ……ちょっとだけだからね！",
      watermelonAttempt: "{nextAttempt}太刀目！白い針が緑のゾーンに入ったら『今だ！』って叫んでね！",
      watermelonHit: "見事！綺麗にスライスできたね。あと{remaining}太刀！",
      watermelonMiss: "惜しい〜！あと{remaining}太刀、次こそ狙っていこう！",
      watermelonAllHit: "3太刀全部終了！{successes}回命中、めっちゃ楽しかったね！",
      watermelonDone: "3太刀終了〜。次はもっと息を合わせていこうね。",
      itemUsed: "「{name}」を使用し、{resource}を {restored} 回復しました。",
      serverDisconnectGrace: "接続が切断されました。戦闘状態を保持中（10秒間）...",
      serverConfigMismatch: "サーバーの更新を検知しました。最新バージョンに同期するため再読み込みしてください。",
      serverSessionReplaced: "別端末または別タブで接続されたため、このセッションを切断しました。",
      serverInvalidCommand: "操作を実行できませんでした: {reason}",
      serverLockedInBattle: "戦闘中は装備の変更やステータス割り振りは行えません！"
    },
    narration: {
      qteCounterPaper: "小楽のチョキを包み込んで――反撃成功！",
      qteCounterScissors: "小楽の小さなグーをパーで受け止め――反撃成功！",
      qteCounterRock: "小楽の柔らかな手と指を絡ませて、奇跡の大勝利！"
    },
    toast: {
      levelRequirementNotMet: "この章の挑戦レベルに達していません。"
    },
    combat: {
      morphWindowOnly: "変拳は小楽の手が見えた直後のリアクション時間内にのみ使用できます。",
      morphWindowExpired: "リアクション受付時間が終了しました。",
      insufficientMp: "MPが不足しているため変拳を使用できません。",
      tookDamage: "ダメージを受けました",
      notInBattle: "現在は戦闘中ではありません。",
      itemNotFound: "アイテムが見つかりません。",
      resourceFull: "{resource}は既に満タンです。",
      itemDepleted: "{name}は使い切りました。"
    },
    shop: {
      itemNotFound: "商品が見つかりません。",
      insufficientCoins: "星砂が足りません。対戦で集めてからまた来てください。",
      itemPurchased: "「{name}」を購入しました！",
      equipmentPurchased: "「{name}」を購入し、装備バッグに追加しました！"
    },
    equip: {
      invalidItem: "無効な装備です。",
      notInInventory: "バッグにこの装備がありません。",
      invalidSlot: "無効な装備スロットです。",
      incompatibleSlot: "「{name}」を {slotName} に装備することはできません。",
      equipped: "「{name}」を装備しました。",
      slotEmpty: "このスロットには何も装備されていません。",
      unequipped: "装備を外しました。"
    },
    growth: {
      invalidStat: "無効なステータス項目です。",
      noPoints: "使用可能なポイントがありません。",
      statIncreased: "ステータスが上昇しました。",
      invalidSkill: "無効なスキル項目です。",
      levelRequirementNotMet: "このスキルを習得するには Lv. {level} が必要です。",
      skillMaxLevel: "このスキルは既に最大レベルです。",
      insufficientPoints: "スキルポイントが不足しています。",
      skillUpgraded: "「{name}」が Lv. {level} に強化されました！"
    },
    cheat: {
      updated: "数値を更新しました！",
      unlockedAll: "全4章のステージとBOSS解説を解放しました！",
      unlockedGallery: "図鑑の全立ち絵イラストを解放しました！"
    },
    save: {
      transferCodeRequired: "引き継ぎコードを入力してください。",
      transferCodeNotFound: "引き継ぎコードが見つかりません。",
      transferCodeAlreadyClaimed: "この引き継ぎコードは既に使用されています。",
      transferCodeExpired: "引き継ぎコードの有効期限が切れています。",
      transferClaimFailed: "引き継ぎコードの受け取りに失敗しました。",

      invalidCode: "有効なセーブコードを入力してください。",
      corruptCode: "無効または破損したセーブコードです。",
      imported: "セーブデータを正常に読み込みました！"
    },
    connection: {
      newConnectionEstablished: "このアカウントで別の接続が確立されたため切断されました。",

      connecting: "接続中",
      online: "オンライン",
      offline: "オフライン",
      reconnecting: "再接続中",
      disconnected: "切断",
      highLatency: "遅延",
      kickedByNewConnection: "別端末または別タブで接続されたため、このセッションを切断しました。",
      disconnectCountdown: "接続が切断されました。再接続中（あと {seconds} 秒で自動精算）...",
      bannerConnecting: "サーバーに接続中...",
      bannerOnline: "権威サーバーに接続完了",
      bannerOffline: "ローカルオフラインモードで実行中",
      bannerReconnecting: "接続が切断されました。再接続を試みています...",
      bannerDisconnected: "サーバーから切断されました"
    },
    battle: {
      lockedDuringBattle: "戦闘中は装備の変更および能力値の配分が固定されています。"
    },
    battleLog: {
      lockedDuringBattle: "戦闘中は装備の変更および能力値の配分が固定されています。",
      battleInProgress: "戦闘が既に進行中です。",
      battleStartFailed: "戦闘の開始に失敗しました。",
      noActiveBattle: "アクティブな戦闘がありません。",
      invalidPhasePause: "一時停止はカウントダウン中のみ可能です。",
      useItemFailed: "アイテムの使用に失敗しました。",

      rpsWin: "じゃんけん【{hand}】で勝利！{target} に {damage} ダメージ！",
      rpsLoss: "じゃんけん【{hand}】で敗北... {damage} ダメージを受けた！",
      rpsDraw: "お互いに【{hand}】であいこ！",
      morphSuccess: "変拳【{hand}】で逆転成功！{target} に {damage} ダメージ！",
      morphFailed: "変拳が裏目に出て敗北判定！",
      qteCounterSuccess: "QTE 反制成功！危機を回避し {target} に {damage} の反撃ダメージ！",
      qteCounterFail: "QTE 反制失敗... {damage} の痛撃を受けた！",
      momoProc: "なでなで発動！{target} に {damage} の不意打ちダメージ！",
      momoDodged: "小楽は素早く身をかわしてなでなでを回避した！",
      burnDamage: "狐火の業火が炸裂！{target} に {damage} の燃焼ダメージ！",
      reflectDamage: "八咫の鏡が反射！{target} に {damage} ダメージを跳ね返した！",
      thunderDamage: "神鳴の雷光が追撃！{target} に {damage} の追加雷撃ダメージ！",
      frostFreeze: "霜月の氷結が発動！小楽の次ターンの【{hand}】を封印！",
      shadowDodge: "霊狐の羽織が発動！残影によりダメージを完全回避！",
      mpRegen: "白狐の千早が発動！MPを {amount} 回復。",
      potionUsed: "【{item}】を使用し、{stat} を {amount} 回復！",
      roundTimeout: "時間切れ！出し遅れにより敗北判定！",
      battleDisconnectedSettled: "切断タイムアウトにより戦闘が自動清算されました。",
      battlePauseCount: "戦闘を一時停止しました（残り一時停止可能回数: {remaining}回）。"
    }
  }
};

export class I18nService {
  constructor() {
    this.currentLocale = this.detectInitialLocale();
  }

  detectInitialLocale() {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
        if (saved && LOCALES[saved]) {
          return saved;
        }
      }
    } catch {
      // localStorage may fail in security restricted contexts
    }

    return this.detectSystemLocale();
  }

  detectSystemLocale(customNavigator = undefined) {
    try {
      const nav = customNavigator !== undefined ? customNavigator : (typeof navigator !== "undefined" ? navigator : null);
      if (nav) {
        const rawLanguages = Array.isArray(nav.languages) && nav.languages.length > 0
          ? nav.languages
          : [nav.language || ""];

        for (const lang of rawLanguages) {
          if (!lang) continue;
          const lower = lang.toLowerCase();
          if (lower.startsWith("zh")) {
            if (lower.includes("tw") || lower.includes("hk") || lower.includes("mo") || lower.includes("hant")) {
              return "zh-Hant";
            }
            return "zh-Hans";
          }
          if (lower.startsWith("ja")) {
            return "ja";
          }
          if (lower.startsWith("en")) {
            return "en";
          }
        }
      }
    } catch {
      // Fallback
    }

    return DEFAULT_LOCALE;
  }

  getLocale() {
    return this.currentLocale;
  }

  setLocale(locale) {
    if (!LOCALES[locale]) return false;
    this.currentLocale = locale;
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
      }
    } catch {
      // Ignore
    }
    return true;
  }

  cycleLocale() {
    const currentIndex = LOCALE_ORDER.indexOf(this.currentLocale);
    const nextIndex = (currentIndex + 1) % LOCALE_ORDER.length;
    const nextLocale = LOCALE_ORDER[nextIndex];
    this.setLocale(nextLocale);
    return nextLocale;
  }

  t(key, params = {}) {
    const segments = key.split(".");
    let current = DICTIONARY[this.currentLocale];

    for (const segment of segments) {
      if (current && typeof current === "object" && segment in current) {
        current = current[segment];
      } else {
        current = null;
        break;
      }
    }

    if (current === null || current === undefined) {
      // Fallback to default locale (en) or zh-Hant
      let fallback = DICTIONARY["en"];
      for (const segment of segments) {
        if (fallback && typeof fallback === "object" && segment in fallback) {
          fallback = fallback[segment];
        } else {
          fallback = null;
          break;
        }
      }
      if (fallback === null || fallback === undefined) {
        fallback = DICTIONARY["zh-Hant"];
        for (const segment of segments) {
          if (fallback && typeof fallback === "object" && segment in fallback) {
            fallback = fallback[segment];
          } else {
            fallback = null;
            break;
          }
        }
      }
      current = fallback ?? key;
    }

    if (typeof current !== "string") {
      return current ?? key;
    }

    return current.replace(/\{(\w+)\}/g, (_, k) => (params[k] !== undefined ? params[k] : `{${k}}`));
  }

  getLocalizedHand(handId) {
    const base = HANDS[handId];
    if (!base) return null;
    const loc = DICTIONARY[this.currentLocale]?.hands?.[handId] || DICTIONARY["zh-Hant"].hands[handId];
    return {
      ...base,
      label: loc?.label || base.label,
      glyph: loc?.glyph || base.glyph
    };
  }

  getLocalizedDirection(directionId) {
    const base = DIRECTIONS.find((d) => d.id === directionId);
    if (!base) return null;
    const label = DICTIONARY[this.currentLocale]?.directions?.[directionId] || base.label;
    return {
      ...base,
      label
    };
  }

  getLocalizedStage(stage) {
    if (!stage) return null;
    const loc = DICTIONARY[this.currentLocale]?.stages?.[stage.id] || DICTIONARY["zh-Hant"].stages[stage.id];
    if (!loc) return { ...stage };
    return {
      ...stage,
      chapter: loc.chapter || stage.chapter,
      name: loc.name || stage.name,
      subtitle: loc.subtitle || stage.subtitle,
      bossRuleSummary: loc.bossRuleSummary || stage.bossRuleSummary,
      bossRuleDetail: loc.bossRuleDetail || stage.bossRuleDetail
    };
  }

  getLocalizedSkill(skill) {
    if (!skill) return null;
    const loc = DICTIONARY[this.currentLocale]?.skills?.[skill.id] || DICTIONARY["zh-Hant"].skills[skill.id];
    if (!loc) return { ...skill };
    return {
      ...skill,
      name: loc.name || skill.name,
      glyph: loc.glyph || skill.glyph,
      description: loc.description || skill.description
    };
  }

  getLocalizedItem(item) {
    if (!item) return null;
    const loc = DICTIONARY[this.currentLocale]?.items?.[item.id] || DICTIONARY["zh-Hant"].items[item.id];
    if (!loc) return { ...item };
    return {
      ...item,
      name: loc.name || item.name,
      shortName: loc.shortName || item.shortName,
      description: loc.description || item.description
    };
  }

  getLocalizedEquipment(item) {
    if (!item) return null;
    const loc = DICTIONARY[this.currentLocale]?.equipment?.[item.id] || DICTIONARY["zh-Hant"].equipment[item.id];
    if (!loc) return { ...item };
    return {
      ...item,
      name: loc.name || item.name,
      description: loc.description || item.description
    };
  }

  getLocalizedEquipmentSlot(slotId) {
    const base = EQUIPMENT_SLOTS[slotId];
    if (!base) return null;
    const label = DICTIONARY[this.currentLocale]?.equipmentSlots?.[slotId] || base.label;
    return {
      ...base,
      label
    };
  }

  getLocalizedGalleryItem(item) {
    if (!item) return null;
    const loc = DICTIONARY[this.currentLocale]?.gallery?.[item.id] || DICTIONARY["zh-Hant"].gallery[item.id];
    if (!loc) return { ...item };
    return {
      ...item,
      name: loc.name || item.name,
      variantName: loc.variantName || item.variantName,
      description: loc.description || item.description
    };
  }

  getChangelog() {
    const locale = this.currentLocale || "zh-Hant";
    return CHANGELOG_DATA.map((entry) => ({
      version: entry.version,
      date: entry.date,
      tag: entry.tag,
      changes: entry.changes[locale] || entry.changes["zh-Hant"] || []
    }));
  }
}

export const I18n = new I18nService();

export { DICTIONARY };
