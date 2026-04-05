(() => {
  const STORAGE_PREFIX = "detective_horror_novel_slot_";
  const META_PREFIX = "detective_horror_novel_meta";

  const $ = (id) => document.getElementById(id);

  const elements = {
    bgImage: $("bgImage"),
    speakerName: $("speakerName"),
    chapterLabel: $("chapterLabel"),
    textBox: $("textBox"),
    choices: $("choices"),
    clueList: $("clueList"),
    statusPanel: $("statusPanel"),
    nextButton: $("nextButton"),
    saveButton: $("saveButton"),
    loadButton: $("loadButton"),
    menuButton: $("menuButton"),
    logButton: $("logButton"),
    skipButton: $("skipButton"),
    menuModal: $("menuModal"),
    saveSlots: $("saveSlots"),
    logPanel: $("logPanel"),
    charLeft: $("charLeft"),
    charCenter: $("charCenter"),
    charRight: $("charRight")
  };

  const createBaseState = (carry = {}) => ({
    currentNodeId: window.GAME_DATA.initialNode,
    clues: [],
    flags: {},
    endingsUnlocked: carry.endingsUnlocked || [],
    log: [],
    currentText: "",
    currentSpeaker: "",
    currentChapter: "",
    choiceHistory: carry.choiceHistory || []
  });

  let state = createBaseState();
  let typingTimer = null;
  let fullText = "";
  let isTyping = false;
  let visibleChoices = [];

  function saveMeta() {
    localStorage.setItem(
      META_PREFIX,
      JSON.stringify({ endingsUnlocked: state.endingsUnlocked })
    );
  }

  function loadMeta() {
    try {
      const raw = localStorage.getItem(META_PREFIX);
      if (!raw) return { endingsUnlocked: [] };
      const parsed = JSON.parse(raw);
      return {
        endingsUnlocked: Array.isArray(parsed.endingsUnlocked) ? parsed.endingsUnlocked : []
      };
    } catch {
      return { endingsUnlocked: [] };
    }
  }

  function resetGame(preserveMeta = true) {
    const carry = preserveMeta ? loadMeta() : { endingsUnlocked: [] };
    state = createBaseState(carry);
    renderNode(window.GAME_DATA.initialNode, { applyEffects: true });
  }

  function getNode(nodeId) {
    return window.GAME_DATA.nodes[nodeId];
  }

  function resolveField(value) {
    if (typeof value === "function") {
      return value(state);
    }
    return value;
  }

  function pushLog(speaker, text) {
    const clean = `${speaker || "――"}：${text}`.trim();
    const last = state.log[state.log.length - 1];
    if (last !== clean) {
      state.log.push(clean);
      if (state.log.length > 100) state.log.shift();
    }
  }

  function applyNodeEffects(node) {
    if (!node || !node.onEnter) return;
    const effects = node.onEnter;

    if (effects.setFlags) {
      state.flags = { ...state.flags, ...effects.setFlags };
    }

    if (effects.addClues) {
      effects.addClues.forEach((clueId) => {
        if (!state.clues.includes(clueId)) {
          state.clues.push(clueId);
        }
      });
    }

    if (effects.addEnding && !state.endingsUnlocked.includes(effects.addEnding)) {
      state.endingsUnlocked.push(effects.addEnding);
      saveMeta();
    }
  }

  function renderCharacters(characters = {}) {
    const map = {
      left: elements.charLeft,
      center: elements.charCenter,
      right: elements.charRight
    };

    Object.entries(map).forEach(([position, el]) => {
      const conf = characters[position];
      if (!conf) {
        el.classList.add("hidden");
        el.classList.remove("dim");
        el.removeAttribute("src");
        return;
      }
      el.src = conf.src;
      el.classList.remove("hidden");
      el.classList.toggle("dim", !conf.focus);
    });
  }

  function renderClues() {
    elements.clueList.innerHTML = "";

    if (!state.clues.length) {
      const li = document.createElement("li");
      li.className = "notice";
      li.textContent = "まだ証拠はない。";
      elements.clueList.appendChild(li);
      return;
    }

    state.clues.forEach((clueId) => {
      const clue = window.GAME_DATA.clues[clueId];
      if (!clue) return;
      const li = document.createElement("li");
      li.innerHTML = `<strong>${clue.name}</strong><br>${clue.description}`;
      elements.clueList.appendChild(li);
    });
  }

  function renderStatus(statusConfig) {
    elements.statusPanel.innerHTML = "";
    const resolved = resolveField(statusConfig) || [];
    const merged = [
      ...resolved,
      { label: "解放済みED", value: `${state.endingsUnlocked.length} / 5` }
    ];

    merged.forEach((item) => {
      const div = document.createElement("div");
      div.className = "status-card";
      div.innerHTML = `<strong>${item.label}</strong>${item.value}`;
      elements.statusPanel.appendChild(div);
    });
  }

  function typeText(text, done) {
    clearInterval(typingTimer);
    fullText = text;
    elements.textBox.textContent = "";
    isTyping = true;
    let index = 0;

    typingTimer = setInterval(() => {
      index += 2;
      elements.textBox.textContent = fullText.slice(0, index);
      if (index >= fullText.length) {
        clearInterval(typingTimer);
        isTyping = false;
        elements.textBox.textContent = fullText;
        done();
      }
    }, 14);
  }

  function finishTyping() {
    if (!isTyping) return false;
    clearInterval(typingTimer);
    elements.textBox.textContent = fullText;
    isTyping = false;
    afterTextComplete();
    return true;
  }

  function buildChoiceButton(choice) {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = resolveField(choice.text);
    btn.addEventListener("click", () => handleChoice(choice));
    return btn;
  }

  function getVisibleChoices(node) {
    const raw = node.choices || [];
    return raw.filter((choice) => (choice.available ? choice.available(state) : true));
  }

  function afterTextComplete() {
    const node = getNode(state.currentNodeId);
    visibleChoices = getVisibleChoices(node);

    elements.choices.innerHTML = "";
    visibleChoices.forEach((choice) => {
      elements.choices.appendChild(buildChoiceButton(choice));
    });

    elements.nextButton.disabled = false;
    if (visibleChoices.length) {
      elements.nextButton.textContent = "CHOICE";
    } else if (node.next) {
      elements.nextButton.textContent = "NEXT";
    } else {
      elements.nextButton.textContent = "END";
    }
  }

  function renderNode(nodeId, options = {}) {
    const node = getNode(nodeId);
    if (!node) return;

    state.currentNodeId = nodeId;
    if (options.applyEffects !== false) applyNodeEffects(node);

    const text = resolveField(node.text) || "";
    const speaker = resolveField(node.speaker) || "――";
    const chapter = resolveField(node.chapter) || "";

    state.currentText = text;
    state.currentSpeaker = speaker;
    state.currentChapter = chapter;

    pushLog(speaker, text);

    elements.bgImage.src = node.background || "assets/bg_title.png";
    elements.speakerName.textContent = speaker;
    elements.chapterLabel.textContent = chapter;
    renderCharacters(node.characters || {});
    renderClues();
    renderStatus(node.status);
    elements.choices.innerHTML = "";
    elements.nextButton.disabled = true;
    elements.nextButton.textContent = "...";

    typeText(text, afterTextComplete);
    renderLogPanel();
    renderSaveSlots();
  }

  function handleChoice(choice) {
    if (choice.resetState) {
      const endings = [...state.endingsUnlocked];
      state = createBaseState({ endingsUnlocked: endings });
      saveMeta();
    }

    if (choice.setFlags) {
      state.flags = { ...state.flags, ...choice.setFlags };
    }

    if (choice.addClues) {
      choice.addClues.forEach((clueId) => {
        if (!state.clues.includes(clueId)) state.clues.push(clueId);
      });
    }

    state.choiceHistory.push(resolveField(choice.text));
    renderNode(choice.next, { applyEffects: true });
  }

  function handleNext() {
    if (finishTyping()) return;

    const node = getNode(state.currentNodeId);
    const choices = getVisibleChoices(node);
    if (choices.length) return;
    if (node.next) {
      renderNode(node.next, { applyEffects: true });
    }
  }

  function getSlotData(slotNumber) {
    try {
      const raw = localStorage.getItem(`${STORAGE_PREFIX}${slotNumber}`);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function saveToSlot(slotNumber) {
    const payload = {
      savedAt: new Date().toLocaleString("ja-JP"),
      snapshot: {
        state,
        nodeTitle: state.currentChapter,
        clueCount: state.clues.length
      }
    };

    localStorage.setItem(`${STORAGE_PREFIX}${slotNumber}`, JSON.stringify(payload));
    saveMeta();
    renderSaveSlots();
  }

  function loadFromSlot(slotNumber) {
    const data = getSlotData(slotNumber);
    if (!data?.snapshot?.state) return;

    state = data.snapshot.state;
    saveMeta();
    renderNode(state.currentNodeId, { applyEffects: false });
  }

  function renderSaveSlots() {
    elements.saveSlots.innerHTML = "";

    for (let slot = 1; slot <= 3; slot += 1) {
      const data = getSlotData(slot);
      const wrap = document.createElement("div");
      wrap.className = "slot-card";

      if (data) {
        wrap.innerHTML = `
          <h4>SLOT ${slot}</h4>
          <p>保存日時: ${data.savedAt}</p>
          <p>章: ${data.snapshot.nodeTitle || "-"}</p>
          <p>証拠数: ${data.snapshot.clueCount ?? 0}</p>
        `;
      } else {
        wrap.innerHTML = `
          <h4>SLOT ${slot}</h4>
          <p>未保存</p>
          <p class="notice">この枠に現在の進行を保存できます。</p>
        `;
      }

      const actions = document.createElement("div");
      actions.className = "slot-actions";

      const saveBtn = document.createElement("button");
      saveBtn.className = "ui-btn small accent";
      saveBtn.textContent = "SAVE";
      saveBtn.addEventListener("click", () => saveToSlot(slot));

      const loadBtn = document.createElement("button");
      loadBtn.className = "ui-btn small";
      loadBtn.textContent = "LOAD";
      loadBtn.disabled = !data;
      loadBtn.addEventListener("click", () => loadFromSlot(slot));

      actions.append(saveBtn, loadBtn);
      wrap.appendChild(actions);
      elements.saveSlots.appendChild(wrap);
    }
  }

  function renderLogPanel() {
    if (!state.log.length) {
      elements.logPanel.textContent = "ログはまだありません。";
      return;
    }
    elements.logPanel.textContent = state.log.join("\n\n");
    elements.logPanel.scrollTop = elements.logPanel.scrollHeight;
  }

  function openModal() {
    elements.menuModal.classList.remove("hidden");
    elements.menuModal.setAttribute("aria-hidden", "false");
    renderSaveSlots();
    renderLogPanel();
  }

  function closeModal() {
    elements.menuModal.classList.add("hidden");
    elements.menuModal.setAttribute("aria-hidden", "true");
  }

  function bindEvents() {
    elements.nextButton.addEventListener("click", handleNext);
    elements.skipButton.addEventListener("click", finishTyping);
    elements.saveButton.addEventListener("click", openModal);
    elements.loadButton.addEventListener("click", openModal);
    elements.menuButton.addEventListener("click", openModal);
    elements.logButton.addEventListener("click", openModal);

    elements.menuModal.addEventListener("click", (event) => {
      if (event.target === elements.menuModal || event.target.hasAttribute("data-close-modal")) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeModal();
        return;
      }
      if ([" ", "Enter"].includes(event.key) && !elements.menuModal.classList.contains("hidden")) {
        return;
      }
      if ([" ", "Enter"].includes(event.key)) {
        event.preventDefault();
        handleNext();
      }
    });
  }

  bindEvents();
  resetGame(true);
})();
