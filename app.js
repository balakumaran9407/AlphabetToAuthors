// --- GLOBAL NAVIGATION ---
const header = document.getElementById('header');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

// Close mobile menu on link clicks
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuToggle.textContent = '☰';
  });
});

// Auto-fill course selection from URL query if present
window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const courseParam = urlParams.get('course');
  const courseSelect = document.getElementById('course-select');
  if (courseSelect && courseParam) {
    const courseMap = {
      'junior_explorer': 'The Language Leap: Junior Explorer (Ages 5-8)',
      'wordsmiths': 'The Language Leap: The Wordsmiths (Ages 8-15)',
      'word_wizards': 'Word Wizards & Story Smiths (Creative Writing)',
      'young_orators': 'Young Orators & Debaters (Public Speaking - Kids)',
      'impactful_executive': 'The Impactful Executive (Public Speaking - Adults)',
      'chatty_champions': 'Chatty Champions (Spoken English - Kids)',
      'master_english': 'Corporate & Casual: Everyday English (Adults)',
      'grammar_games': 'Grammar Games & Vocabulary Vocals (Grammar)'
    };
    if (courseMap[courseParam]) {
      courseSelect.value = courseMap[courseParam];
      
      // Smooth scroll to contact section
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }
});

// --- COURSE CATEGORY FILTERING ---
const filterButtons = document.querySelectorAll('.filter-btn');
const courseCards = document.querySelectorAll('.course-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filterVal = btn.getAttribute('data-filter');

    courseCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (filterVal === 'all' || cardCategory === filterVal) {
        card.classList.remove('hidden');
        card.style.opacity = '0';
        card.style.display = 'flex';
        void card.offsetHeight; // force reflow
        card.style.transition = 'opacity 0.4s ease';
        card.style.opacity = '1';
      } else {
        card.style.display = 'none';
        card.classList.add('hidden');
      }
    });
  });
});

/// --- DYNAMIC COURSE DATA FOR MODALS ---
const coursesData = {
  junior_explorer: {
    title: "The Language Leap: Junior Explorer Edition",
    subtitle: "General English course for kids",
    age: "Ages 5 - 8",
    category: "general-english",
    classCategory: "category-english",
    duration: "21 Days",
    schedule: "Monday - Friday",
    fee: "Group class: ₹2,500 | Individual class: ₹3,500",
    description: "Nurture confidence and correct language habits in young minds. This course uses activity-based, play-centric instruction to build early sentences, correct mouth stretching (for phonetics), and active listening focus.",
    syllabus: [
      "Stretch your mouth", "Basics of sentences", "Talk with rhythm",
      "Everyday vocabulary reset", "Live the Present", "Go back to the Past",
      "Drive to Future tense", "Say bye to translation", "Little News reader",
      "Ready to announce?", "Ask for help", "Fill and link",
      "Fix your language", "Talk with flow", "Grammar essentials",
      "Reading is fun", "Listen carefully", "Creative thinker"
    ]
  },
  wordsmiths: {
    title: "The Language Leap: The Wordsmiths",
    subtitle: "General English course for older kids",
    age: "Ages 8 - 15",
    category: "general-english",
    classCategory: "category-english",
    duration: "21 Days",
    schedule: "Monday - Friday",
    fee: "Group class: ₹2,500 | Individual class: ₹3,500",
    description: "Formulate thoughts into fluent spoken and written English. Tailored for older children, this course targets translation-free speech, public announcements, structured essay basics, and grammatical precision.",
    syllabus: [
      "Stretch your mouth", "Basics of sentences", "Talk with rhythm",
      "Everyday vocabulary reset", "Live the Present", "Go back to the Past",
      "Drive to Future tense", "Say bye to translation", "Little News reader",
      "Ready to announce?", "Ask for help", "Fill and link",
      "Fix your language", "Talk with flow", "Grammar essentials",
      "Reading is fun", "Listen carefully", "Creative thinker"
    ]
  },
  word_wizards: {
    title: "Word Wizards and Story Smiths",
    subtitle: "Creative writing & storytelling for kids",
    age: "Ages 8 - 15",
    category: "public-speaking",
    classCategory: "category-speaking",
    duration: "10 Days",
    schedule: "Saturdays & Sundays",
    fee: "Course fee: ₹1,500",
    description: "Equip your child to build imaginary worlds and pen down compelling narratives. Focuses on storytelling principles, structure grids (Story Mountain), character shadowing, and drafting hooks.",
    syllabus: [
      { step: "Day 1", topic: "Sparking the Engine" },
      { step: "Day 2", topic: "The Heart of the Story" },
      { step: "Day 3", topic: "Building Worlds" },
      { step: "Day 4", topic: "The Shadow" },
      { step: "Day 5", topic: "Climbing the Story Mountain" },
      { step: "Day 6", topic: "Hooking the Reader" },
      { step: "Day 7", topic: "Making Them Talk" },
      { step: "Day 8", topic: "The Great Drafting Race" },
      { step: "Day 9", topic: "The Writer’s Laboratory" },
      { step: "Day 10", topic: "The Author’s Showcase" }
    ]
  },
  young_orators: {
    title: "Young Orators & Debaters",
    subtitle: "Public speaking & debate for kids",
    age: "Ages 8 - 15",
    category: "public-speaking",
    classCategory: "category-speaking",
    duration: "10 Days",
    schedule: "Monday - Friday",
    fee: "Course fee: ₹1,500",
    description: "Transform public speaking fear into impactful verbal arguments. Kids learn vocal dynamics, superhero posture, confidence mappings, audience hook methods, and live debate fundamentals.",
    syllabus: [
      "Introduction to Public Speaking", "Your voice is your power",
      "Your emotions and expressions are the key", "Stand like a super hero",
      "Narrate with confidence", "Map your island",
      "Hook the audience", "Fix your mistakes"
    ]
  },
  impactful_executive: {
    title: "The Impactful Executive",
    subtitle: "Public speaking for professionals",
    age: "Professionals / Adults",
    category: "public-speaking",
    classCategory: "category-speaking",
    duration: "5 Days",
    schedule: "Saturdays & Sundays",
    fee: "Course fee: ₹1,500",
    description: "Designed for corporate leaders and professionals looking to sharpen executive presence. Focuses on brief, clear verbal delivery, stage fright solutions, body language, and Q&A management.",
    syllabus: [
      { step: "Day 1", topic: "Cracking the Stage Fright Code" },
      { step: "Day 2", topic: "Structural Clarity & The Art of Executive Brevity" },
      { step: "Day 3", topic: "Executive Presence, Body Language & Vocal Dynamics" },
      { step: "Day 4", topic: "Handling the Hot Seat" },
      { step: "Day 5", topic: "The Final Showcase & Digital Delivery Excellence" }
    ]
  },
  chatty_champions: {
    title: "Chatty Champions",
    subtitle: "Spoken English for kids",
    age: "Kids Spoken English",
    category: "spoken-english",
    classCategory: "category-spoken",
    duration: "16 Days",
    schedule: "Thursdays & Fridays",
    fee: "Course fee: ₹1,700",
    description: "Develop natural social confidence in spoken English. Activity-focused training targeting small talk, debate structures, vocal mechanics, and interactive showstopper speeches.",
    syllabus: [
      { step: "Week 1", topic: "Me and My World" },
      { step: "Week 2", topic: "The Social Butterfly" },
      { step: "Week 3", topic: "The Explorer’s Guide" },
      { step: "Week 4", topic: "Time Travel" },
      { step: "Week 5", topic: "The Master Storyteller" },
      { step: "Week 6", topic: "The Great Debate" },
      { step: "Week 7", topic: "Voice Mechanics" },
      { step: "Week 8", topic: "The Showstopper" }
    ]
  },
  master_english: {
    title: "Corporate & Casual: Master Everyday English",
    subtitle: "Spoken English for adults",
    age: "Adults Spoken English",
    category: "spoken-english",
    classCategory: "category-spoken",
    duration: "8 Days",
    schedule: "Saturdays & Sundays",
    fee: "Course fee: ₹2,000",
    description: "Enhance professional presence, meeting updates, assertive expressions, and negotiation dialogue. Designed to deliver global spoken fluency, virtual etiquettes, and general confidence.",
    syllabus: [
      { step: "Week 1", topic: "Professional Presence & Small Talk" },
      { step: "Week 2", topic: "Meetings, Updates, & Expressing Opinions Assertively" },
      { step: "Week 3", topic: "High-Stakes Communication (Negotiation, Conflict, & Q&A)" },
      { step: "Week 4", topic: "Global Fluency, Vocal Delivery, & Virtual Meeting Etiquette" }
    ]
  },
  grammar_games: {
    title: "Grammar Games & Vocabulary Vocals",
    subtitle: "Basic Grammar course for kids",
    age: "Grammar & Vocab",
    category: "general-english",
    classCategory: "category-english",
    duration: "6 Weeks",
    schedule: "Tuesdays & Wednesdays",
    fee: "Course fee: ₹2,000",
    description: "Play-centric basic grammar course covering Noun Town, Verb Vibes, Adjectives, Subject-Verb constraints, Pronouns, and final grand orchestrations.",
    syllabus: [
      { step: "Week 1", topic: "The Noun Town & Sound Safaris" },
      { step: "Week 2", topic: "Action Actors & The Verb Vibes" },
      { step: "Week 3", topic: "Painting with Words (Adjectives & Adverbs)" },
      { step: "Week 4", topic: "The Sentence Mechanics (The Subject-Verb Puzzle)" },
      { step: "Week 5", topic: "The Secret Links (Pronouns & Prepositions)" },
      { step: "Week 6", topic: "The Story Orchestras (Grand Finale)" }
    ]
  }
};

// --- COURSE DETAILS MODAL CONTROLLERS ---
const courseModal = document.getElementById('course-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalContentArea = document.getElementById('modal-content-area');
const clickableCards = document.querySelectorAll('.clickable-card');

function openModal(courseId) {
  const data = coursesData[courseId];
  if (!data) return;

  // Build the modal contents dynamically
  let syllabusHtml = '';
  if (Array.isArray(data.syllabus) && typeof data.syllabus[0] === 'string') {
    // List item based syllabus
    syllabusHtml = `
      <ul class="modal-syllabus-list">
        ${data.syllabus.map(item => `<li>${item}</li>`).join('')}
      </ul>
    `;
  } else {
    // Timeline day/week based syllabus
    syllabusHtml = `
      <div class="modal-timeline">
        ${data.syllabus.map(item => `
          <div class="modal-timeline-day">
            <strong>${item.step}</strong>
            <span>${item.topic}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  modalContentArea.innerHTML = `
    <div class="modal-header-section ${data.classCategory}">
      <span class="course-age-badge">${data.age}</span>
      <h3 class="course-title" style="font-size: 1.75rem;">${data.title}</h3>
      <p class="course-subtitle" style="font-size: 0.95rem; opacity: 0.9;">${data.subtitle}</p>
    </div>
    <div class="modal-body-section">
      <p class="modal-desc">${data.description}</p>
      
      <div>
        <h4 class="modal-section-title">Program Logistics</h4>
        <div class="course-stats" style="border-bottom: none; padding-bottom: 0;">
          <div class="stat-item"><span class="stat-icon">⏱️</span> ${data.duration}</div>
          <div class="stat-item"><span class="stat-icon">📅</span> ${data.schedule}</div>
        </div>
        <p class="price-tier" style="margin-top: 0.75rem; font-size: 1.05rem;">
          Fee Detail: <strong>${data.fee}</strong>
        </p>
      </div>

      <div>
        <h4 class="modal-section-title">Course Curriculum Outline</h4>
        <div class="modal-syllabus-wrapper">
          ${syllabusHtml}
        </div>
      </div>
    </div>
    <div class="modal-footer-section">
      <button type="button" class="btn btn-secondary" id="modal-cancel-btn" style="margin-right: 0.75rem;">Close</button>
      <a href="#contact?course=${courseId}" class="btn btn-primary" id="modal-enroll-btn">Enroll / Book Demo Slot</a>
    </div>
  `;

  // Set category class on modal card for close button contrast styling
  const modalCard = courseModal.querySelector('.modal-card');
  if (modalCard) {
    modalCard.className = `modal-card ${data.classCategory}`;
  }

  // Display the modal
  courseModal.style.display = 'flex';
  // Trigger transition reflow
  void courseModal.offsetHeight;
  courseModal.classList.add('active');
  document.body.style.overflow = 'hidden'; // prevent background scrolling

  // Attach modal footer enroll and cancel click listeners
  document.getElementById('modal-cancel-btn').addEventListener('click', closeModal);
  document.getElementById('modal-enroll-btn').addEventListener('click', () => {
    closeModal();
    // Pre-fill course selection from the URL query in form handler
    const courseSelect = document.getElementById('course-select');
    const courseMap = {
      'junior_explorer': 'The Language Leap: Junior Explorer (Ages 5-8)',
      'wordsmiths': 'The Language Leap: The Wordsmiths (Ages 8-15)',
      'word_wizards': 'Word Wizards & Story Smiths (Creative Writing)',
      'young_orators': 'Young Orators & Debaters (Public Speaking - Kids)',
      'impactful_executive': 'The Impactful Executive (Public Speaking - Adults)',
      'chatty_champions': 'Chatty Champions (Spoken English - Kids)',
      'master_english': 'Corporate & Casual: Everyday English (Adults)',
      'grammar_games': 'Grammar Games & Vocabulary Vocals (Grammar)'
    };
    if (courseSelect && courseMap[courseId]) {
      courseSelect.value = courseMap[courseId];
    }
  });
}

function closeModal() {
  courseModal.classList.remove('active');
  document.body.style.overflow = ''; // restore scrolling
  setTimeout(() => {
    courseModal.style.display = 'none';
    const modalCard = courseModal.querySelector('.modal-card');
    if (modalCard) {
      modalCard.className = 'modal-card';
    }
  }, 300);
}

// Attach listeners to clickable cards
clickableCards.forEach(card => {
  card.addEventListener('click', () => {
    const courseId = card.getAttribute('data-course-id');
    openModal(courseId);
  });
});

// Attach modal close triggers
if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', closeModal);
}

// Click outside overlay to close
courseModal.addEventListener('click', (e) => {
  if (e.target === courseModal) {
    closeModal();
  }
});

// Escape key to close modal
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && courseModal.classList.contains('active')) {
    closeModal();
  }
});


// --- WHATSAPP REGISTER FORM HANDLER ---
const enrollmentForm = document.getElementById('enrollment-form');

enrollmentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const parentName = document.getElementById('parent-name').value;
  const childName = document.getElementById('child-name-input').value;
  const childAge = document.getElementById('child-age').value;
  const selectedCourse = document.getElementById('course-select').value;
  const messageVal = document.getElementById('message').value || "None";
  
  // Format WhatsApp message text
  const waMessage = `Hi Alphabet to Authors! 📚✨\n\nI would like to register my child for a course/demo session. Here are our registration details:\n\n👤 *Parent's Name:* ${parentName}\n👦 *Child's Name:* ${childName}\n👶 *Child's Age:* ${childAge} years\n🎓 *Selected Course:* ${selectedCourse}\n💬 *Questions/Preferences:* ${messageVal}\n\nPlease check slot availability and contact me. Thank you!`;
  
  // URL encode message parameter
  const encodedText = encodeURIComponent(waMessage);
  
  // Alphabet to Authors Official Number: 8667026579 (Format: 918667026579 for global WhatsApp API)
  const targetPhone = "918667026579";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodedText}`;
  
  // Open in new tab/redirect
  window.open(whatsappUrl, '_blank');
});
