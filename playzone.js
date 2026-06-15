// --- TAB CONTROLLERS ---
const tabButtons = document.querySelectorAll('.tab-btn');
const demoPanels = document.querySelectorAll('.demo-panel');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // If it's a sub-tab (like modulation modes), don't trigger panel changes
    if (btn.hasAttribute('data-mod')) return;
    if (btn.classList.contains('toggle-side-btn')) return;

    tabButtons.forEach(b => {
      if (!b.hasAttribute('data-mod') && !b.classList.contains('toggle-side-btn')) {
        b.classList.remove('active');
      }
    });
    demoPanels.forEach(p => p.classList.remove('active'));
    
    btn.classList.add('active');
    const targetTabId = btn.getAttribute('data-tab');
    document.getElementById(targetTabId).classList.add('active');
  });
});


// --- 1. MAGIC STORY SPARKER LOGIC ---
const btnSpinReels = document.getElementById('btn-spin-reels');
const storyPlaceholder = document.getElementById('story-placeholder');
const storyResult = document.getElementById('story-result');
const storyPromptText = document.getElementById('story-prompt-text');

const reelHero = document.getElementById('reel-hero');
const reelConflict = document.getElementById('reel-conflict');
const reelTool = document.getElementById('reel-tool');

const smIntro = document.getElementById('sm-intro');
const smBuild = document.getElementById('sm-build');
const smClimax = document.getElementById('sm-climax');
const smFall = document.getElementById('sm-fall');
const smResolution = document.getElementById('sm-resolution');

// Library of story segments
const heroes = [
  { text: "A tiny detective squirrel 🐿️", key: "squirrel" },
  { text: "An astronaut who lost their keys 👨‍🚀", key: "astronaut" },
  { text: "A shy baby dragon who cannot breathe fire 🐉", key: "dragon" },
  { text: "A walking clockwork clock that talks too fast ⏰", key: "clock" }
];

const conflicts = [
  { text: "Lost their voice right before a big speech 🤫", key: "voice" },
  { text: "Discovered that gravity stopped working in their room 🌌", key: "gravity" },
  { text: "Needs to solve a riddle to open a magical door 🚪", key: "riddle" },
  { text: "Their shadow ran away to join a carnival 👥", key: "shadow" }
];

const tools = [
  { text: "A dictionary that translates animal whispers 📖", key: "dictionary" },
  { text: "A backpack filled with infinite marshmallows 🎒", key: "marshmallows" },
  { text: "A magic compass that points to what they need most 🧭", key: "compass" },
  { text: "A pocket watch that pauses time for 10 seconds ⏱️", key: "watch" }
];

// Pre-defined story outcomes mapped by key pairs
const storyOutcomes = {
  "squirrel_voice_dictionary": {
    intro: "Barnaby the Squirrel needs to deliver a speech to the Forest Council to save the ancient Oak Tree from loggers.",
    build: "He wakes up to find he can only squeak soundlessly. He tries writing on bark, but the council thinks he is playing cards.",
    climax: "Barnaby locates a magical Translator Dictionary in the hollow. He types his signs into it, projecting a booming translator voice to the crowd!",
    fall: "The Council is so moved by his structured argument that they vote to protect the Oak Tree immediately.",
    resolution: "Barnaby learns that communication isn't just about sound — it is about preparation and leveraging resources."
  },
  "dragon_riddle_compass": {
    intro: "Ignis the baby dragon wants to enter the Great Fire Festival, but guards lock the volcanic gates with a riddle.",
    build: "The riddle asks: 'What grows the more you share it?'. Ignis has no fire-breath to light the answer slot.",
    climax: "Ignis pulls out a glowing Compass. Following its needle, he doesn't find fire, but points it directly to the crowd of guards themselves.",
    fall: "He shares his nervous smile, and the compass glows red-hot as the guard shouts: 'A smile! The answer is happiness/smiles!'",
    resolution: "The gate opens. Ignis realizes that emotional intelligence is a far more powerful key than fire."
  },
  "astronaut_gravity_marshmallows": {
    intro: "Commander Leo is stranded in Space Station Gamma. Suddenly, the artificial gravity generator fails completely.",
    build: "Floating floats everywhere. He cannot reach the control lever to restart the generator, floating away from the terminal.",
    climax: "Leo opens his survival pack and pulls out infinite marshmallows, throwing them rapidly in the opposite direction of the lever.",
    fall: "The momentum of the sticky throw pushes him backwards (Newton's Third Law!) straight into the restart lever.",
    resolution: "Gravity restores. Leo laughs, realizing that physics is a coder's best storytelling device."
  },
  "clock_shadow_watch": {
    intro: "Tick-Tock the clockwork butler needs to serve tea to the Grand Mayor, but his shadow runs away to the carnival.",
    build: "Without a shadow, clockwork creatures are considered broken and will be recycled. The Mayor arrives in 5 minutes.",
    climax: "Tick-Tock uses a golden pocket watch to pause time. He runs to the carnival, catches his shadow, and clips it back on.",
    fall: "Time resumes just as the Mayor takes a sip. The shadow behaves perfectly, pouring the tea with grace.",
    resolution: "Tick-Tock learns that time management and quick composure can solve any high-stakes crisis."
  }
};

// Spinning interval animation
let isSpinning = false;
btnSpinReels.addEventListener('click', () => {
  if (isSpinning) return;
  isSpinning = true;
  
  btnSpinReels.disabled = true;
  storyPlaceholder.style.display = 'flex';
  storyResult.classList.remove('active');
  
  let ticks = 0;
  const maxTicks = 15;
  
  const spinInterval = setInterval(() => {
    // Cycle randomly through options
    const randomHero = heroes[Math.floor(Math.random() * heroes.length)];
    const randomConflict = conflicts[Math.floor(Math.random() * conflicts.length)];
    const randomTool = tools[Math.floor(Math.random() * tools.length)];
    
    reelHero.innerHTML = `<div class="reel-content text-spin">${randomHero.text}</div>`;
    reelConflict.innerHTML = `<div class="reel-content text-spin">${randomConflict.text}</div>`;
    reelTool.innerHTML = `<div class="reel-content text-spin">${randomTool.text}</div>`;
    
    ticks++;
    if (ticks >= maxTicks) {
      clearInterval(spinInterval);
      
      // Determine final landing result
      // We will select a predetermined outcome or build a default fallback
      const finalHero = heroes[Math.floor(Math.random() * heroes.length)];
      const finalConflict = conflicts[Math.floor(Math.random() * conflicts.length)];
      const finalTool = tools[Math.floor(Math.random() * tools.length)];
      
      reelHero.innerHTML = `<div class="reel-content">${finalHero.text}</div>`;
      reelConflict.innerHTML = `<div class="reel-content">${finalConflict.text}</div>`;
      reelTool.innerHTML = `<div class="reel-content">${finalTool.text}</div>`;
      
      storyPromptText.textContent = `Hero: ${finalHero.text} | Conflict: ${finalConflict.text} | Tool: ${finalTool.text}`;
      
      // Look up outcome, otherwise fallback
      const outcomeKey = `${finalHero.key}_${finalConflict.key}_${finalTool.key}`;
      const outcome = storyOutcomes[outcomeKey] || {
        intro: `Meet the protagonist, who is ${finalHero.text.charAt(0).toLowerCase() + finalHero.text.slice(1)}. They live in a peaceful town but face a major setback: ${finalConflict.text.charAt(0).toLowerCase() + finalConflict.text.slice(1)}.`,
        build: `To overcome this, they try typical approaches, but standard actions fail because of the constraints.`,
        climax: `Suddenly, they remember they carry ${finalTool.text.charAt(0).toLowerCase() + finalTool.text.slice(1)}. They use its unique properties in a highly creative way to bypass the problem.`,
        fall: `The trick succeeds immediately, resolving the bottleneck and earning them respect.`,
        resolution: `They learn that structured thought and the right tools make any adventure successful.`
      };
      
      smIntro.textContent = outcome.intro;
      smBuild.textContent = outcome.build;
      smClimax.textContent = outcome.climax;
      smFall.textContent = outcome.fall;
      smResolution.textContent = outcome.resolution;
      
      storyPlaceholder.style.display = 'none';
      storyResult.classList.add('active');
      
      btnSpinReels.disabled = false;
      isSpinning = false;
    }
  }, 100);
});


// --- 2. VOCAL ARENA LOGIC (TONGUE TWISTERS & SPEECH RECORD) ---
const twisterTextCard = document.getElementById('twister-text-card');
const btnEasy = document.getElementById('twister-easy-btn');
const btnMed = document.getElementById('twister-med-btn');
const btnHard = document.getElementById('twister-hard-btn');

const modBtns = document.querySelectorAll('[data-mod]');

const btnRecordSpeech = document.getElementById('btn-record-speech');
const btnStopRecord = document.getElementById('btn-stop-record');
const recStatusIndicator = document.getElementById('rec-status-indicator');
const recStatusText = document.getElementById('rec-status-text');
const vocalPlaceholder = document.getElementById('vocal-placeholder');
const vocalResult = document.getElementById('vocal-result');
const vocalTranscript = document.getElementById('vocal-transcript');
const vocalScoreBadge = document.getElementById('vocal-score-badge');
const vocalFeedback = document.getElementById('vocal-feedback');

const twisters = {
  easy: "Friendly frogs fly fast.",
  medium: "She sells seashells by the seashore.",
  hard: "If a dog chews shoes, whose shoes does he choose?"
};

let currentLevel = 'easy';
let currentMod = 'normal';

function updateTwisterDisplay() {
  twisterTextCard.textContent = `"${twisters[currentLevel]}"`;
  // Reset classes
  twisterTextCard.className = 'twister-card';
  if (currentMod !== 'normal') {
    twisterTextCard.classList.add(`mod-${currentMod}`);
  }
}

// Level changes
[btnEasy, btnMed, btnHard].forEach(btn => {
  btn.addEventListener('click', () => {
    [btnEasy, btnMed, btnHard].forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentLevel = btn.getAttribute('data-level');
    updateTwisterDisplay();
  });
});

// Modulation changes
modBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    modBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentMod = btn.getAttribute('data-mod');
    updateTwisterDisplay();
  });
});

// Speech Recognition API Integration
let recognition = null;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
}

let isRecording = false;
let hasProcessedResult = false;
let recognitionTimeout = null;

btnRecordSpeech.addEventListener('click', () => {
  if (isRecording) {
    stopRecording();
    return;
  }
  startRecording();
});

btnStopRecord.addEventListener('click', stopRecording);

function startRecording() {
  isRecording = true;
  hasProcessedResult = false;
  vocalPlaceholder.style.display = 'flex';
  vocalResult.classList.remove('active');
  
  btnRecordSpeech.innerHTML = '<span>🛑</span> Stop Recording';
  btnRecordSpeech.style.backgroundColor = '#1e3f4b';
  btnStopRecord.style.display = 'inline-flex';
  recStatusIndicator.style.display = 'flex';
  recStatusText.textContent = 'Listening... Read the twister aloud!';
  
  if (recognitionTimeout) {
    clearTimeout(recognitionTimeout);
  }
  recognitionTimeout = setTimeout(() => {
    if (isRecording) {
      console.log("Speech Recognition timed out. Auto-stopping and falling back to simulator...");
      stopRecording();
    }
  }, 8000); // 8-second safety timeout
  
  if (recognition) {
    try {
      recognition.start();
    } catch (err) {
      console.warn("Recognition already started: ", err);
    }
  } else {
    // Simulator Mode Fallback
    console.log("Speech recognition not supported on this browser. Running simulator...");
  }
}

function stopRecording() {
  isRecording = false;
  btnRecordSpeech.innerHTML = '<span>🎤</span> Start Speaking Challenge';
  btnRecordSpeech.style.backgroundColor = 'var(--color-danger)';
  btnStopRecord.style.display = 'none';
  recStatusIndicator.style.display = 'none';
  
  if (recognitionTimeout) {
    clearTimeout(recognitionTimeout);
    recognitionTimeout = null;
  }
  
  if (recognition) {
    try {
      recognition.stop();
    } catch (err) {
      console.warn("Recognition already stopped: ", err);
    }
  }
  
  // Wait short delay to see if onresult catches up.
  // If not, trigger simulated transcript fallback.
  setTimeout(() => {
    if (!hasProcessedResult) {
      console.log("No real-time transcript captured. Triggering simulated typing fallback...");
      simulateSpeechTranscript();
    }
  }, 400);
}

if (recognition) {
  recognition.onresult = (event) => {
    const speechResultText = event.results[0][0].transcript;
    processClarityResult(speechResultText);
  };
  
  recognition.onerror = (event) => {
    console.error("Speech Recognition Error: ", event.error);
    recStatusIndicator.style.display = 'none';
    if (event.error === 'not-allowed') {
      alert("Microphone permission is blocked. Running vocal simulator fallback instead.");
    }
    stopRecording();
  };
  
  recognition.onend = () => {
    if (isRecording) {
      stopRecording();
    }
  };
}

function processClarityResult(transcript) {
  hasProcessedResult = true;
  const target = twisters[currentLevel].toLowerCase().replace(/[.,?]/g, '');
  const cleanTranscript = transcript.toLowerCase().replace(/[.,?]/g, '');
  
  const targetWords = target.split(' ');
  const transcriptWords = cleanTranscript.split(' ');
  
  // Basic word overlap score
  let correctCount = 0;
  targetWords.forEach(word => {
    if (transcriptWords.includes(word)) {
      correctCount++;
    }
  });
  
  const score = Math.round((correctCount / targetWords.length) * 100);
  
  vocalTranscript.textContent = `"${transcript}"`;
  vocalScoreBadge.textContent = `Clarity: ${score}%`;
  
  // Custom feedbacks
  if (score >= 90) {
    vocalScoreBadge.style.backgroundColor = 'rgba(15, 118, 84, 0.15)';
    vocalScoreBadge.style.color = 'var(--color-success)';
    vocalFeedback.textContent = "Excellent articulation! Your vocal clarity is outstanding. You maintain crisp consonant sounds. 🏆🌟";
    vocalFeedback.style.color = 'var(--color-success)';
  } else if (score >= 70) {
    vocalScoreBadge.style.backgroundColor = 'rgba(241, 197, 92, 0.15)';
    vocalScoreBadge.style.color = 'var(--color-accent-dark)';
    vocalFeedback.textContent = "Good try! You got the rhythm. Focus on stretch-mouth actions for tricky starting sounds. 👏";
    vocalFeedback.style.color = 'var(--color-accent-dark)';
  } else {
    vocalScoreBadge.style.backgroundColor = 'rgba(194, 47, 47, 0.15)';
    vocalScoreBadge.style.color = 'var(--color-danger)';
    vocalFeedback.textContent = "A bit fast! Slow down, enunciate each syllable, and practice the rhythm first. 🎤";
    vocalFeedback.style.color = 'var(--color-danger)';
  }
  
  vocalPlaceholder.style.display = 'none';
  vocalResult.classList.add('active');
  
  if (window.innerWidth <= 768) {
    document.getElementById('vocal-output').scrollIntoView({ behavior: 'smooth' });
  }
}

function simulateSpeechTranscript() {
  vocalPlaceholder.style.display = 'flex';
  vocalResult.classList.remove('active');
  
  let typingTicks = 0;
  const textVal = twisters[currentLevel];
  vocalTranscript.textContent = "Recording audio waves...";
  
  const interval = setInterval(() => {
    typingTicks++;
    if (typingTicks === 1) vocalTranscript.textContent = "Decoding vocal syllables...";
    if (typingTicks === 2) {
      clearInterval(interval);
      // Produce high-fidelity result
      const simulatedText = textVal;
      processClarityResult(simulatedText);
    }
  }, 800);
}


// --- 3. IMPROV DEBATE DUELS ---
const btnDrawDebate = document.getElementById('btn-draw-debate');
const debateFlipCard = document.getElementById('debate-flip-card');
const debateStructureGuide = document.getElementById('debate-structure-guide');

const debateCardTopic = document.getElementById('debate-card-topic');
const debateCardBadge = document.getElementById('debate-card-badge');

const peelP = document.getElementById('peel-p');
const peelE = document.getElementById('peel-e');
const peelEx = document.getElementById('peel-ex');
const peelL = document.getElementById('peel-l');

const toggleProBtn = document.querySelector('.toggle-side-btn[data-side="pro"]');
const toggleConBtn = document.querySelector('.toggle-side-btn[data-side="con"]');

const debateDecks = [
  {
    topic: "Should school homework be banned?",
    category: "Kids Debate",
    pro: {
      p: "Homework should be banned to give children free time to play and develop social skills.",
      e: "Heavy homework loads lead to fatigue, stress, and take away hours that could be spent playing outside, bonding with family, or resting.",
      ex: "In Finland, schools assign virtually zero homework, yet they rank consistently among the top educational systems globally.",
      l: "Therefore, banning homework leads to happier, more balanced, and healthier children."
    },
    con: {
      p: "Homework is essential to reinforce concepts learned during class hours.",
      e: "Reviewing materials independently at home helps build self-discipline, memory consolidation, and good study habits.",
      ex: "Academic research shows that students who complete homework regularly score up to 15% higher in end-of-term examinations.",
      l: "Thus, homework is a crucial link that connects school lessons with personal success."
    }
  },
  {
    topic: "Are books better than video games?",
    category: "Communication Debate",
    pro: {
      p: "Books are far better because they build vocabulary and exercise the imagination.",
      e: "When reading, your brain acts as a director, creating all details, faces, and scenery. This significantly strengthens literacy and writing skills.",
      ex: "A study found that children who read daily score 20% higher on standard reading comprehension and spelling tests.",
      l: "Hence, books are the best fuel for creative and intellectual development."
    },
    con: {
      p: "Video games are superior because they train coordination and problem-solving.",
      e: "Active participation in game logic forces you to make fast strategy decisions, coordinate hand-eye movements, and collaborate in teams.",
      ex: "Surgeons who play video games regularly perform complex laparoscopic procedures 30% faster with fewer errors.",
      l: "So, video games build practical cognitive and reaction capabilities needed in modern jobs."
    }
  },
  {
    topic: "Should kids choose their own bedtimes?",
    category: "Kids Debate",
    pro: {
      p: "Kids should choose their bedtimes to practice independence and self-control.",
      e: "If children decide when to sleep, they learn to listen to their own bodies. When they feel tired the next day, they understand the direct natural consequence of staying up late.",
      ex: "Children in democratic experimental schools report better self-regulation and time-management skills.",
      l: "Therefore, trusting kids with bedtimes helps shape mature, self-aware individuals."
    },
    con: {
      p: "Parents must enforce strict bedtimes to ensure healthy brain development.",
      e: "Growing children require 9 to 11 hours of deep sleep to restore energy, grow physical tissues, and process cognitive memories.",
      ex: "Pediatric studies prove that irregular sleep patterns in kids lead to mood swings, lower attention spans, and poorer grades in school.",
      l: "Thus, enforced bedtimes protect a child's health and learning performance."
    }
  },
  {
    topic: "Should artificial intelligence be used to grade essays?",
    category: "Executive Debate",
    pro: {
      p: "AI grading should be used to provide instant, unbiased feedback to students.",
      e: "AI systems can scan grammar, structure, and vocabulary instantly, ensuring grading is identical for all students without human mood bias or fatigue.",
      ex: "Educational portals utilizing automated essay graders show a 40% reduction in grading cycle times, helping teachers focus on mentoring.",
      l: "Therefore, AI grading maximizes classroom feedback efficiency and objectivity."
    },
    con: {
      p: "AI grading lacks the empathy and deep contextual understanding of human teachers.",
      e: "Grading is not just checking boxes. It requires understanding creative styling, subtext, emotional hooks, and encouraging progress which machines cannot measure.",
      ex: "An experiment showed an AI gave a low grade to a famous historical speech because of unusual sentence lengths, failing to parse its rhetorical power.",
      l: "So, relying on machines for creative evaluation risks reducing writing to a formula."
    }
  }
];

let activeCard = null;
let activeSide = 'pro';

function displayArgument() {
  if (!activeCard) return;
  const sideData = activeCard[activeSide];
  
  peelP.textContent = sideData.p;
  peelE.textContent = sideData.e;
  peelEx.textContent = sideData.ex;
  peelL.textContent = sideData.l;
}

btnDrawDebate.addEventListener('click', () => {
  // Add flipping animation
  debateFlipCard.classList.remove('flipped');
  void debateFlipCard.offsetHeight; // reflow
  
  // Select a random new card
  const currentIndex = activeCard ? debateDecks.indexOf(activeCard) : -1;
  let nextCard = activeCard;
  
  // Prevent repeating the same topic twice consecutively
  while (nextCard === activeCard) {
    nextCard = debateDecks[Math.floor(Math.random() * debateDecks.length)];
  }
  
  activeCard = nextCard;
  
  // Populate back face before flip
  debateCardTopic.textContent = activeCard.topic;
  debateCardBadge.textContent = activeCard.category;
  
  // Reset active side button to PRO
  activeSide = 'pro';
  toggleProBtn.classList.add('active');
  toggleConBtn.classList.remove('active');
  
  displayArgument();
  
  setTimeout(() => {
    debateFlipCard.classList.add('flipped');
    debateStructureGuide.style.display = 'block';
  }, 150);
});

// Pro/Con side toggles
toggleProBtn.addEventListener('click', () => {
  toggleProBtn.classList.add('active');
  toggleConBtn.classList.remove('active');
  activeSide = 'pro';
  displayArgument();
});

toggleConBtn.addEventListener('click', () => {
  toggleProBtn.classList.remove('active');
  toggleConBtn.classList.add('active');
  activeSide = 'con';
  displayArgument();
});
