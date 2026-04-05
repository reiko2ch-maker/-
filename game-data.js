const majorEvidenceCount = (state) => {
  const ids = [
    "ledger",
    "blackLily",
    "tape",
    "watch",
    "widowLie",
    "ring",
    "muddyBoots",
    "lullaby",
    "ritual",
    "hiddenPassage",
    "photo"
  ];
  return ids.filter((id) => state.clues.includes(id)).length;
};

window.GAME_DATA = {
  title: "残響探偵・雨乃町奇譚",
  initialNode: "title",
  clues: {
    requestLetter: {
      name: "依頼状",
      description: "久条家から届いた簡潔な依頼状。『主人が書斎で死んだ。警察より先に、真実を見てほしい』。"
    },
    ledger: {
      name: "破られた帳簿",
      description: "古い寄付台帳。孤児院への送金欄があるが、数ページだけ故意に引き裂かれている。"
    },
    blackLily: {
      name: "黒百合の紋",
      description: "久条家が隠していた家紋。書斎の床板にも同じ意匠が刻まれていた。"
    },
    tape: {
      name: "録音テープ",
      description: "被害者の声が残る。『子守歌が始まったら、子供部屋を開けるな』。最後に女の悲鳴。"
    },
    watch: {
      name: "止まった懐中時計",
      description: "23時17分で止まっている。死の時刻を示すか、意図的な偽装かは不明。"
    },
    widowLie: {
      name: "玲葉夫人の証言の揺れ",
      description: "夫人は『昨夜は一度も廊下に出ていない』と言ったが、窓の雨跡と証言が噛み合わない。"
    },
    ring: {
      name: "血のついた指輪",
      description: "玲葉夫人の結婚指輪。被害者の机の裏に落ちていた。強く掴み合った痕跡がある。"
    },
    muddyBoots: {
      name: "泥の長靴",
      description: "温室の裏口にあった長靴。地下通路の湿った土と同じ泥が付着している。"
    },
    lullaby: {
      name: "途切れた子守歌",
      description: "使用人の志乃が無意識に口ずさんだ旋律。被害者のテープにも同じ節が録音されていた。"
    },
    ritual: {
      name: "地下の儀式陣",
      description: "地下室の床に描かれた古い陣。血痕は新しく、昨夜も何かが行われていた。"
    },
    hiddenPassage: {
      name: "隠し通路",
      description: "地下から子供部屋の暖炉裏へ繋がる通路。長年閉ざされていたが、昨夜は使われた形跡がある。"
    },
    photo: {
      name: "古写真",
      description: "十六年前の家族写真。少女・美緒の顔立ちは、今の使用人の志乃と酷似している。"
    },
    silverKey: {
      name: "銀の鍵",
      description: "玲葉夫人が持っていた旧館の鍵。地下の扉と子供部屋の封印に合う。"
    }
  },
  endings: {
    truth: "真相解明エンド",
    humanSin: "人間の罪エンド",
    falseAccusation: "誤認エンド",
    devoured: "喪失エンド",
    concealment: "隠蔽エンド"
  },
  nodes: {
    title: {
      chapter: "PROLOGUE",
      speaker: "SYSTEM",
      background: "assets/bg_title.png",
      status: [
        { label: "主人公", value: "私立探偵・九条アキラ" },
        { label: "舞台", value: "雨乃町外れ、久条洋館" },
        { label: "目的", value: "密室殺人と館に残る『残響』の真相を暴く" }
      ],
      text: "六月の終わり、雨乃町は丸ごと海へ沈みかけたような湿気に包まれていた。\n\nその夜、私の事務所に届いた一通の依頼状が、久しぶりに『まともではない事件』の匂いを運んできた。",
      onEnter: { addClues: ["requestLetter"] },
      choices: [
        { text: "事件を始める", next: "office_intro" }
      ]
    },

    office_intro: {
      chapter: "PROLOGUE",
      speaker: "アキラ",
      background: "assets/bg_office.png",
      characters: {
        left: { src: "assets/chara_detective.png", focus: true }
      },
      status: [
        { label: "依頼人", value: "久条玲葉" },
        { label: "被害者", value: "久条源司" },
        { label: "警察到着", value: "夜明け前" }
      ],
      text: "差出人は久条玲葉。旧家・久条家の当主夫人だ。\n\n『主人が書斎で死にました。警察が来る前に、どうか見てください。もし本当に“あれ”が戻ったのなら、もう私たちでは止められない』",
      next: "manor_arrival"
    },

    manor_arrival: {
      chapter: "CHAPTER 1 / 来訪",
      speaker: "地の文",
      background: "assets/bg_manor_exterior.png",
      characters: {
        center: { src: "assets/chara_shadow.png", focus: false }
      },
      status: [
        { label: "天候", value: "豪雨" },
        { label: "異常", value: "門前で足音が一つ多い" },
        { label: "館の噂", value: "十六年前に少女が消えた" }
      ],
      text: "洋館は崖の上に立ち、稲妻のたびに別の形へ歪んで見えた。\n\n門をくぐった瞬間、背後でぬかるみを踏む音がした。振り返っても、雨しかいない。だが、気配だけは確かに一人分多かった。",
      next: "foyer_intro"
    },

    foyer_intro: {
      chapter: "CHAPTER 1 / 来訪",
      speaker: "玲葉",
      background: "assets/bg_foyer.png",
      characters: {
        left: { src: "assets/chara_detective.png", focus: false },
        right: { src: "assets/chara_widow.png", focus: true }
      },
      status: [
        { label: "同席者", value: "夫人、使用人、庭師" },
        { label: "死体発見", value: "23時半頃" },
        { label: "館の状態", value: "一部の扉が内側から封鎖" }
      ],
      text: "『主人は書斎で刺されていました。けれど……誰もその部屋へ入れなかったんです』\n\n玲葉夫人の指先は震えていた。恐怖だけではない。何かを隠す人間の震え方だった。\n\nまずは館を歩き、証拠を集める必要がある。",
      next: "investigation_hub"
    },

    investigation_hub: {
      chapter: "CHAPTER 2 / 初動捜査",
      speaker: "アキラ",
      background: "assets/bg_foyer.png",
      characters: {
        left: { src: "assets/chara_detective.png", focus: true }
      },
      status: (state) => [
        { label: "集めた証拠", value: `${majorEvidenceCount(state)} / 8以上で推理が安定` },
        { label: "重要経路", value: state.clues.includes("hiddenPassage") ? "地下の隠し通路を確認済み" : "地下の封鎖が気になる" },
        { label: "不穏要素", value: state.clues.includes("lullaby") ? "子守歌と子供部屋が繋がった" : "館のどこかで歌声がする" }
      ],
      text: (state) => {
        const openText = [];
        if (!state.flags.visitedStudy) openText.push("書斎");
        if (!state.flags.visitedVictimRoom) openText.push("被害者の私室");
        if (!state.flags.visitedWidow) openText.push("玲葉夫人への聞き取り");
        if (!state.flags.visitedMaid) openText.push("使用人・志乃への聞き取り");
        if (!state.flags.visitedGreenhouse) openText.push("温室");
        if (!state.flags.visitedBasement) openText.push("地下の封鎖区域");
        if (!state.flags.visitedNursery && state.clues.includes("hiddenPassage")) openText.push("子供部屋");

        const roomList = openText.length ? openText.join("、") : "主要な調査は一通り終わっている。";
        return `館は広いが、嘘の逃げ道は意外と少ない。\n\n今、私が向かえる先は ${roomList}。\n\n証拠が足りないまま犯人を決めれば、この館は喜んで私を飲み込む。`;
      },
      choices: [
        { text: "書斎を調べる", next: "study_search", available: (state) => !state.flags.visitedStudy },
        { text: "被害者の私室を調べる", next: "victim_room", available: (state) => !state.flags.visitedVictimRoom },
        { text: "玲葉夫人に話を聞く", next: "widow_interview", available: (state) => !state.flags.visitedWidow },
        { text: "使用人・志乃に話を聞く", next: "maid_interview", available: (state) => !state.flags.visitedMaid },
        { text: "温室を調べる", next: "greenhouse_search", available: (state) => !state.flags.visitedGreenhouse },
        { text: "地下の封鎖区域へ向かう", next: "basement_gate" },
        { text: "子供部屋へ向かう", next: "nursery_search", available: (state) => state.clues.includes("hiddenPassage") && !state.flags.visitedNursery },
        { text: "証拠を整理して推理する", next: "deduction_table", available: (state) => majorEvidenceCount(state) >= 5 }
      ]
    },

    study_search: {
      chapter: "CHAPTER 2 / 書斎",
      speaker: "アキラ",
      background: "assets/bg_study.png",
      characters: {
        left: { src: "assets/chara_detective.png", focus: true }
      },
      status: [
        { label: "発見", value: "破られた帳簿 / 家紋" },
        { label: "違和感", value: "血痕が机より床板に偏る" },
        { label: "推測", value: "死体はここで刺されたが、争いは別の場所で始まった" }
      ],
      onEnter: {
        setFlags: { visitedStudy: true },
        addClues: ["ledger", "blackLily"]
      },
      text: "書斎の壁一面には家系図と寄付の記録が並んでいた。だが、一冊の台帳だけが乱暴に破かれている。\n\n机をどけると、床板に黒百合の紋があった。飾りではない。血を吸わせるための印だ。\n\n誰かが、久条家の古い秘密を昨夜ここで掘り返した。",
      choices: [
        { text: "ロビーへ戻る", next: "investigation_hub" }
      ]
    },

    victim_room: {
      chapter: "CHAPTER 2 / 私室",
      speaker: "アキラ",
      background: "assets/bg_bedroom.png",
      characters: {
        left: { src: "assets/chara_detective.png", focus: true }
      },
      status: [
        { label: "発見", value: "録音テープ / 止まった時計" },
        { label: "最後の音", value: "女の悲鳴と子守歌" },
        { label: "疑問", value: "23:17と発見時刻がずれる" }
      ],
      onEnter: {
        setFlags: { visitedVictimRoom: true },
        addClues: ["tape", "watch"]
      },
      text: "私室の蓄音機には、半分だけ巻き戻されたテープが残っていた。\n\n再生すると、源司の掠れた声が流れる。『もし子守歌が始まったら、子供部屋は開けるな。美緒を、また閉じ込めることになる』\n\n次の瞬間、椅子が倒れる音、女の息、そして切れたような悲鳴。時計は23時17分で止まっていた。",
      choices: [
        { text: "ロビーへ戻る", next: "investigation_hub" }
      ]
    },

    widow_interview: {
      chapter: "CHAPTER 2 / 聞き取り",
      speaker: "玲葉",
      background: "assets/bg_foyer.png",
      characters: {
        left: { src: "assets/chara_detective.png", focus: false },
        right: { src: "assets/chara_widow.png", focus: true }
      },
      status: [
        { label: "印象", value: "怯えと覚悟が混ざっている" },
        { label: "収穫", value: "証言の揺れ / 銀の鍵" },
        { label: "要注意", value: "左手の薬指だけ濡れて白い" }
      ],
      onEnter: {
        setFlags: { visitedWidow: true },
        addClues: ["widowLie", "silverKey"]
      },
      text: "『私は昨夜、部屋を出ていません』\n\nそう言い切った夫人の左手には、結婚指輪の跡だけが薄く残っていた。問い詰めると、彼女は視線を落とし、旧館の銀の鍵を差し出す。\n\n『地下へ行くなら、それが要るはずです。……あの人は、また何かを始めていました』",
      choices: [
        { text: "指輪についてさらに聞く", next: "widow_ring_followup" },
        { text: "ロビーへ戻る", next: "investigation_hub" }
      ]
    },

    widow_ring_followup: {
      chapter: "CHAPTER 2 / 聞き取り",
      speaker: "玲葉",
      background: "assets/bg_foyer.png",
      characters: {
        left: { src: "assets/chara_detective.png", focus: false },
        right: { src: "assets/chara_widow.png", focus: true }
      },
      status: [
        { label: "追加証拠", value: "血のついた指輪" },
        { label: "夫人の告白", value: "『昨夜、源司に腕を掴まれた』" },
        { label: "評価", value: "殺意よりも防衛の気配" }
      ],
      onEnter: { addClues: ["ring"] },
      text: "『指輪は……書斎で落としました。主人が、私を地下へ連れて行こうとして』\n\n玲葉夫人はそこまで言って、唇を噛んだ。\n\n彼女は源司を恐れていた。だが、それだけで刺殺に至るだろうか。今の時点では、まだ決め手にならない。",
      choices: [
        { text: "ロビーへ戻る", next: "investigation_hub" }
      ]
    },

    maid_interview: {
      chapter: "CHAPTER 2 / 聞き取り",
      speaker: "志乃",
      background: "assets/bg_servants_room.png",
      characters: {
        left: { src: "assets/chara_detective.png", focus: false },
        right: { src: "assets/chara_maid.png", focus: true }
      },
      status: [
        { label: "印象", value: "静かだが目だけが怯えている" },
        { label: "収穫", value: "子守歌の旋律" },
        { label: "違和感", value: "『知らないはずの部屋』の位置を知っている" }
      ],
      onEnter: {
        setFlags: { visitedMaid: true },
        addClues: ["lullaby"]
      },
      text: "志乃は茶を置き、無意識のように短い子守歌を口ずさんだ。\n\nその旋律は、源司のテープに残っていたものと同じだった。\n\n『どうしてその歌を？』と聞くと、彼女は一拍遅れて答える。『……昔から、夢の中で聞こえるんです。名前も知らない女の子が、ずっと』",
      choices: [
        { text: "ロビーへ戻る", next: "investigation_hub" }
      ]
    },

    greenhouse_search: {
      chapter: "CHAPTER 2 / 温室",
      speaker: "アキラ",
      background: "assets/bg_greenhouse.png",
      characters: {
        left: { src: "assets/chara_detective.png", focus: true },
        right: { src: "assets/chara_gardener.png", focus: false }
      },
      status: [
        { label: "発見", value: "泥の長靴" },
        { label: "庭師の主張", value: "『昨夜は排水を見ただけ』" },
        { label: "判断", value: "犯人候補にはなるが決め手は弱い" }
      ],
      onEnter: {
        setFlags: { visitedGreenhouse: true },
        addClues: ["muddyBoots"]
      },
      text: "温室の裏口は半開きで、床には館の中では見ない粘り気のある泥が残っていた。\n\n隅に放られた長靴にも同じ泥。庭師・権藤のものだ。\n\nだが、泥の量のわりに温室には争った跡がない。誰かが権藤を『犯人に見せるため』に使った可能性もある。",
      choices: [
        { text: "ロビーへ戻る", next: "investigation_hub" }
      ]
    },

    basement_gate: {
      chapter: "CHAPTER 3 / 地下",
      speaker: "アキラ",
      background: "assets/bg_basement_gate.png",
      characters: {
        left: { src: "assets/chara_detective.png", focus: true }
      },
      status: [
        { label: "扉", value: "旧式の鍵穴" },
        { label: "館の気配", value: "扉の向こうだけ空気が冷たい" },
        { label: "必要条件", value: "銀の鍵" }
      ],
      text: (state) => state.clues.includes("silverKey")
        ? "地下へ降りる扉は、玲葉夫人の鍵であっさり開いた。\n\n開いた瞬間、湿った冷気と、古い血の鉄臭さが吹き上がってくる。"
        : "地下への扉は頑丈に閉ざされている。\n\n鍵穴は古く、館の誰かが持つ専用の鍵が必要だ。今ここで無理にこじ開けるべきではない。",
      choices: [
        { text: "地下へ進む", next: "basement_search", available: (state) => state.clues.includes("silverKey") },
        { text: "ロビーへ戻る", next: "investigation_hub" }
      ]
    },

    basement_search: {
      chapter: "CHAPTER 3 / 地下",
      speaker: "アキラ",
      background: "assets/bg_basement.png",
      characters: {
        left: { src: "assets/chara_detective.png", focus: true },
        center: { src: "assets/chara_shadow.png", focus: false }
      },
      status: [
        { label: "発見", value: "儀式陣 / 隠し通路" },
        { label: "確定", value: "昨夜ここで何かが再演された" },
        { label: "危険度", value: "高" }
      ],
      onEnter: {
        setFlags: { visitedBasement: true },
        addClues: ["ritual", "hiddenPassage"]
      },
      text: "地下室の床には、書斎の黒百合と同じ紋を中心にした陣が描かれていた。\n\n乾いた跡の上に、新しい血が重なっている。昨夜、ここで儀式が行われたのは間違いない。\n\n壁面を探ると、隠し扉が音もなく開き、細い通路が子供部屋の方角へ伸びていた。暗闇の奥から、かすかに歌が聞こえる。",
      choices: [
        { text: "子供部屋へ向かう準備をする", next: "investigation_hub" },
        { text: "歌を追って単独で通路に入る", next: "shadow_bad_end" }
      ]
    },

    nursery_search: {
      chapter: "CHAPTER 4 / 子供部屋",
      speaker: "アキラ",
      background: "assets/bg_nursery.png",
      characters: {
        left: { src: "assets/chara_detective.png", focus: true },
        right: { src: "assets/chara_maid.png", focus: false }
      },
      status: [
        { label: "発見", value: "古写真" },
        { label: "真実", value: "志乃と美緒の顔が一致" },
        { label: "仮説", value: "志乃は久条家の失われた少女・美緒" }
      ],
      onEnter: {
        setFlags: { visitedNursery: true },
        addClues: ["photo"]
      },
      text: "子供部屋は封じられていたというより、時間ごと閉じ込められていた。\n\n棚の奥に隠された古写真には、十六年前に行方不明になった少女・美緒が写っている。\n\nその顔は、今この館で働く志乃そのものだった。\n\n志乃は失われた娘であり、同時に、誰かがそれを隠し続けてきた証拠でもある。",
      choices: [
        { text: "証拠を整理して推理する", next: "deduction_table" },
        { text: "ロビーへ戻る", next: "investigation_hub" }
      ]
    },

    deduction_table: {
      chapter: "CHAPTER 5 / 推理",
      speaker: "アキラ",
      background: "assets/bg_deduction.png",
      characters: {
        left: { src: "assets/chara_detective.png", focus: true }
      },
      status: (state) => [
        { label: "主要証拠数", value: `${majorEvidenceCount(state)}件` },
        { label: "人間側の容疑", value: state.clues.includes("ring") ? "玲葉夫人が最有力" : "断定には不足" },
        { label: "怪異側の容疑", value: state.clues.includes("ritual") ? "儀式再演の影響が濃厚" : "まだ仮説段階" }
      ],
      text: "書斎の血、地下の陣、子守歌、古写真。\n\nこの事件は、単なる刺殺では終わらない。人間の罪と、この館に残った残響が重なっている。\n\nここで何を真実とみなすかで、結末は大きく変わる。",
      choices: [
        {
          text: "庭師・権藤を犯人だと断定する",
          next: "ending_false_accusation"
        },
        {
          text: "玲葉夫人が源司を刺したと追及する",
          next: "widow_confrontation",
          available: (state) => state.clues.includes("ring") && state.clues.includes("widowLie")
        },
        {
          text: "志乃＝美緒として、久条家の過去を暴く",
          next: "shino_reveal",
          available: (state) => state.clues.includes("photo") && state.clues.includes("lullaby")
        },
        {
          text: "儀式そのものを止めるため地下へ向かう",
          next: "ritual_finale",
          available: (state) => state.clues.includes("ritual") && state.clues.includes("hiddenPassage") && state.clues.includes("tape")
        },
        {
          text: "もう少し調べ直す",
          next: "investigation_hub"
        }
      ]
    },

    widow_confrontation: {
      chapter: "CHAPTER 5 / 対峙",
      speaker: "玲葉",
      background: "assets/bg_foyer.png",
      characters: {
        left: { src: "assets/chara_detective.png", focus: false },
        right: { src: "assets/chara_widow.png", focus: true }
      },
      status: [
        { label: "判明", value: "玲葉は源司を刺している" },
        { label: "未判明", value: "その直前に何が起きたか" },
        { label: "分岐", value: "ここで深掘るか、犯行だけで終えるか" }
      ],
      text: "『はい。私が刺しました』\n\n玲葉夫人は、観念したように言った。\n\n『でも、あれは殺意じゃない。源司はまた美緒を地下へ連れて行こうとしていた。止めようとしたら、逆に……』\n\nここで彼女を犯人として終わらせることもできる。だが、それではこの館の本当の夜は終わらない。",
      choices: [
        { text: "ここで事件を終わらせる", next: "ending_human_sin" },
        {
          text: "志乃と地下の儀式まで含めて真相を追う",
          next: "ritual_finale",
          available: (state) => state.clues.includes("photo") && state.clues.includes("ritual") && state.clues.includes("tape")
        },
        { text: "推理に戻る", next: "deduction_table" }
      ]
    },

    shino_reveal: {
      chapter: "CHAPTER 5 / 対峙",
      speaker: "志乃",
      background: "assets/bg_nursery.png",
      characters: {
        left: { src: "assets/chara_detective.png", focus: false },
        right: { src: "assets/chara_maid.png", focus: true }
      },
      status: [
        { label: "判明", value: "志乃＝美緒" },
        { label: "感情", value: "記憶は断片的にしか戻っていない" },
        { label: "核心", value: "昨夜、誰かが『もう一度閉じ込めよう』とした" }
      ],
      text: "古写真を見せると、志乃は指先を震わせた。\n\n『……私、ここにいた。小さい頃、ここで歌を聞いてた。鍵をかけられて、暗くて、苦しくて……』\n\n彼女の記憶は途切れている。だが少なくとも、久条家は少女・美緒を“失った”のではない。“隠した”のだ。",
      choices: [
        {
          text: "地下へ行き、儀式を止める",
          next: "ritual_finale",
          available: (state) => state.clues.includes("ritual") && state.clues.includes("hiddenPassage") && state.clues.includes("tape")
        },
        { text: "夫人の犯行だけを警察に渡す", next: "ending_human_sin" },
        { text: "推理に戻る", next: "deduction_table" }
      ]
    },

    ritual_finale: {
      chapter: "FINAL / 地下祭壇",
      speaker: "地の文",
      background: "assets/bg_final_ritual.png",
      characters: {
        left: { src: "assets/chara_detective.png", focus: false },
        center: { src: "assets/chara_shadow.png", focus: true },
        right: { src: "assets/chara_maid.png", focus: false }
      },
      status: [
        { label: "確定事項", value: "源司は昨夜、儀式を再演しようとしていた" },
        { label: "核心", value: "玲葉は美緒を守ろうとして源司を刺した" },
        { label: "残る選択", value: "真実を暴くか、館ごと黙らせるか" }
      ],
      text: "地下祭壇で待っていたのは、怪物ではなく“繰り返された夜”そのものだった。\n\n源司は十六年前と同じように、美緒を家に縫い留める儀式を再演しようとした。\n玲葉はそれを止めようとして源司を刺し、志乃――美緒は再び子守歌に引きずられかけた。\n\n残っているのは、この真実をどう終わらせるかだけだ。",
      choices: [
        { text: "証拠を揃え、久条家の罪を公にする", next: "ending_truth" },
        { text: "帳簿と儀式陣を焼き払い、事件を事故として閉じる", next: "ending_concealment" }
      ]
    },

    shadow_bad_end: {
      chapter: "BAD END",
      speaker: "地の文",
      background: "assets/bg_shadow_end.png",
      characters: {
        center: { src: "assets/chara_shadow.png", focus: true }
      },
      status: [
        { label: "結末", value: "喪失エンド" },
        { label: "原因", value: "証拠を揃えずに残響へ踏み込んだ" },
        { label: "教訓", value: "この館は、単独行動を最も好む" }
      ],
      onEnter: { addEnding: "devoured" },
      text: "私は歌を追い、灯りも持たずに通路へ踏み込んだ。\n\n次の瞬間、暗闇の奥から伸びた無数の手が、肩と喉と足首を掴んだ。\n\n『まだ一人足りない』\n\nそう囁く声を最後に、館は私の名前まで飲み込んだ。",
      choices: [
        { text: "タイトルへ戻る", next: "title", resetState: true }
      ]
    },

    ending_false_accusation: {
      chapter: "ENDING C",
      speaker: "地の文",
      background: "assets/bg_ending_false.png",
      characters: {
        left: { src: "assets/chara_gardener.png", focus: true },
        right: { src: "assets/chara_shadow.png", focus: false }
      },
      status: [
        { label: "結末", value: "誤認エンド" },
        { label: "内容", value: "庭師は連行されるが、館の歌は止まらない" },
        { label: "後味", value: "真犯人も真相も残ったまま" }
      ],
      onEnter: { addEnding: "falseAccusation" },
      text: "泥の長靴だけを根拠に、私は権藤を犯人だと断じた。\n\n彼は怒鳴り、玲葉は泣き、志乃は何も言わなかった。\n\n数日後、久条洋館が無人のまま焼け落ちたという知らせを聞く。現場では、子守歌だけが最後まで聞こえていたらしい。",
      choices: [
        { text: "タイトルへ戻る", next: "title", resetState: true }
      ]
    },

    ending_human_sin: {
      chapter: "ENDING B",
      speaker: "地の文",
      background: "assets/bg_ending_human.png",
      characters: {
        left: { src: "assets/chara_widow.png", focus: true },
        right: { src: "assets/chara_maid.png", focus: false }
      },
      status: [
        { label: "結末", value: "人間の罪エンド" },
        { label: "内容", value: "玲葉は自首し、事件は正当防衛に近い形で閉じる" },
        { label: "未解決", value: "美緒と館の残響は残された" }
      ],
      onEnter: { addEnding: "humanSin" },
      text: "玲葉夫人は、源司を刺した責任を一人で背負った。\n\nそれで人間の事件としては終わる。だが、子供部屋の歌は止まらない。\n\n志乃は館を去り、私は報告書に書けない一行を胸にしまった。\n\n――真実は、まだ半分しか掘り起こされていない。",
      choices: [
        { text: "タイトルへ戻る", next: "title", resetState: true }
      ]
    },

    ending_truth: {
      chapter: "ENDING A",
      speaker: "地の文",
      background: "assets/bg_ending_truth.png",
      characters: {
        left: { src: "assets/chara_detective.png", focus: true },
        right: { src: "assets/chara_maid.png", focus: false }
      },
      status: [
        { label: "結末", value: "真相解明エンド" },
        { label: "内容", value: "久条家の儀式と隠蔽が暴かれる" },
        { label: "余韻", value: "雨は止み、歌も二度と聞こえない" }
      ],
      onEnter: { addEnding: "truth" },
      text: "私は帳簿、写真、テープ、地下の陣をすべて警察へ渡した。\n\n久条家は十六年前、娘を『失った』のではなく、家名のために地下へ閉じ込め、その後も存在を隠し続けていた。昨夜、源司は儀式を再演しようとし、玲葉は美緒を守るために彼を刺した。\n\n館の罪が白日の下に晒された朝、雨は静かに上がった。志乃――美緒は初めて、自分の本当の名前で空を見上げた。",
      choices: [
        { text: "タイトルへ戻る", next: "title", resetState: true }
      ]
    },

    ending_concealment: {
      chapter: "ENDING D",
      speaker: "地の文",
      background: "assets/bg_ending_concealment.png",
      characters: {
        center: { src: "assets/chara_shadow.png", focus: false },
        right: { src: "assets/chara_detective.png", focus: true }
      },
      status: [
        { label: "結末", value: "隠蔽エンド" },
        { label: "内容", value: "事件は消えるが、真実も消える" },
        { label: "後遺症", value: "探偵は時折、子守歌を聞く" }
      ],
      onEnter: { addEnding: "concealment" },
      text: "私は帳簿を焼き、陣を潰し、テープを割った。\n\n事件は『豪雨の夜に起きた家庭内の惨事』として処理される。誰もそれ以上を掘らない。\n\nけれど帰りの車内で、ラジオも点けていないのに、かすかな子守歌が聞こえた。\n\n終わらせたのではない。見えなくしただけだ。",
      choices: [
        { text: "タイトルへ戻る", next: "title", resetState: true }
      ]
    }
  }
};
