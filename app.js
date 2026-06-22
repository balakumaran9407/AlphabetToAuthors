import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDR9GXXbr-EOQ51qtBmWLyOfNYzB6IwHw",
  authDomain: "alphabettoauthors.firebaseapp.com",
  projectId: "alphabettoauthors",
  storageBucket: "alphabettoauthors.firebasestorage.app",
  messagingSenderId: "800982445059",
  appId: "1:800982445059:web:b3d26c25bbba8426d3f236"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
    subtitle: "Foundational English & Language Mastery",
    age: "Ages 5 - 8",
    category: "general-english",
    classCategory: "category-english",
    duration: "21 Days",
    schedule: "Monday - Friday",
    fee: "Group class: ₹2,500 | Individual class: ₹3,500",
    description: "Nurture confidence and instil impeccable language habits in young minds. This immersive program uses activity-based, play-centric instruction to build early sentence structure, master phonetics, and develop active listening skills for a strong English foundation.",
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
    subtitle: "Advanced English & Language Mastery",
    age: "Ages 8 - 15",
    category: "general-english",
    classCategory: "category-english",
    duration: "21 Days",
    schedule: "Monday - Friday",
    fee: "Group class: ₹2,500 | Individual class: ₹3,500",
    description: "Formulate complex thoughts into fluent, articulate spoken and written English. Tailored for older children, this program focuses on translation-free speech, confident public announcements, structured essay composition, and advanced grammatical precision.",
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
    subtitle: "Advanced Storytelling & Creative Expression",
    age: "Ages 8 - 15",
    category: "public-speaking",
    classCategory: "category-speaking",
    duration: "10 Days",
    schedule: "Saturdays & Sundays",
    fee: "Course fee: ₹1,500",
    description: "Equip your child to construct vivid imaginary worlds and author compelling narratives. This program dives deep into storytelling principles, structural grids like the Story Mountain, character shadowing, and crafting irresistible narrative hooks.",
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
    subtitle: "Confident Oratory & Debate Dynamics",
    age: "Ages 8 - 15",
    category: "public-speaking",
    classCategory: "category-speaking",
    duration: "10 Days",
    schedule: "Monday - Friday",
    fee: "Course fee: ₹1,500",
    description: "Transform the fear of public speaking into impactful verbal mastery. Students develop vocal dynamics, commanding posture, confidence mapping, audience engagement techniques, and the fundamental frameworks of live debate.",
    syllabus: [
      "Introduction to Public Speaking", "Your voice is your power",
      "Your emotions and expressions are the key", "Stand like a super hero",
      "Narrate with confidence", "Map your island",
      "Hook the audience", "Fix your mistakes"
    ]
  },
  impactful_executive: {
    title: "The Impactful Executive",
    subtitle: "Executive Presence & Corporate Articulation",
    age: "Professionals / Adults",
    category: "public-speaking",
    classCategory: "category-speaking",
    duration: "5 Days",
    schedule: "Saturdays & Sundays",
    fee: "Course fee: ₹1,500",
    description: "Designed exclusively for corporate leaders and professionals aiming to elevate their executive presence. This program focuses on concise verbal delivery, overcoming stage fright, mastering body language, and commanding high-stakes Q&A sessions.",
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
    subtitle: "Conversational Fluency & Social Confidence",
    age: "Kids Spoken English",
    category: "spoken-english",
    classCategory: "category-spoken",
    duration: "16 Days",
    schedule: "Thursdays & Fridays",
    fee: "Course fee: ₹1,700",
    description: "Cultivate natural, charismatic social confidence in spoken English. This highly interactive program targets the art of small talk, expressive vocal mechanics, and delivering show-stopping speeches with ease and flair.",
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
    subtitle: "Professional Fluency & Global Communication",
    age: "Adults Spoken English",
    category: "spoken-english",
    classCategory: "category-spoken",
    duration: "8 Days",
    schedule: "Saturdays & Sundays",
    fee: "Course fee: ₹2,000",
    description: "Enhance your professional presence, assertive expression, and negotiation dialogue. Designed to deliver global spoken fluency, polished virtual meeting etiquette, and unshakeable confidence in any speaking environment.",
    syllabus: [
      { step: "Week 1", topic: "Professional Presence & Small Talk" },
      { step: "Week 2", topic: "Meetings, Updates, & Expressing Opinions Assertively" },
      { step: "Week 3", topic: "High-Stakes Communication (Negotiation, Conflict, & Q&A)" },
      { step: "Week 4", topic: "Global Fluency, Vocal Delivery, & Virtual Meeting Etiquette" }
    ]
  },
  grammar_games: {
    title: "Grammar Games & Vocabulary Vocals",
    subtitle: "Core Grammar & Vocabulary Architecture",
    age: "Grammar & Vocab",
    category: "general-english",
    classCategory: "category-english",
    duration: "6 Weeks",
    schedule: "Tuesdays & Wednesdays",
    fee: "Course fee: ₹2,000",
    description: "A dynamic, play-centric grammar intensive that turns complex rules into engaging challenges. Covering essential building blocks from nouns and verbs to advanced sentence mechanics and grand linguistic orchestrations.",
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
      <a href="javascript:void(0)" class="btn btn-primary" id="modal-enroll-btn">Enroll / Book Demo Slot</a>
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
  document.getElementById('modal-enroll-btn').addEventListener('click', (e) => {
    e.preventDefault();
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

    // Smooth scroll to contact section
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
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

if (enrollmentForm) {
  enrollmentForm.addEventListener('submit', (e) => {
    const submitBtn = enrollmentForm.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.innerHTML = 'Preparing WhatsApp...';
      submitBtn.style.pointerEvents = 'none';
      submitBtn.style.opacity = '0.8';
    }

    e.preventDefault();

    const parentName = document.getElementById('parent-name').value;
    const childName = document.getElementById('child-name-input').value;
    const childAge = document.getElementById('child-age').value;
    const selectedCourse = document.getElementById('course-select').value;
    const messageVal = document.getElementById('message').value || "None";

    // Format WhatsApp message text
    const waMessage = `Hello Alphabets to Authors Team,\n\nI am reaching out to register for an upcoming course/demo session. Please find the registration details below:\n\n*Parent/Guardian Name:* ${parentName}\n*Participant's Name:* ${childName}\n*Participant's Age:* ${childAge} years\n*Selected Course:* ${selectedCourse}\n*Questions/Preferences:* ${messageVal}\n\nKindly confirm slot availability and further enrollment steps.\n\nThank you.`;

    // URL encode message parameter
    const encodedText = encodeURIComponent(waMessage);

    // Alphabet to Authors Official Number: 8667026579 (Format: 918667026579 for global WhatsApp API)
    const targetPhone = "918667026579";
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodedText}`;

    // Open in new tab/redirect
    window.open(whatsappUrl, '_blank');

    if (submitBtn) {
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.pointerEvents = 'auto';
        submitBtn.style.opacity = '1';
      }, 2000);
    }
  });
}

// --- SCROLL ANIMATIONS ---
const scrollElements = document.querySelectorAll('.animate-on-scroll');
const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
};
const displayScrollElement = (element) => {
  element.classList.add('is-visible');
};
const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.15)) {
      displayScrollElement(el);
    }
  })
}
window.addEventListener('scroll', () => {
  handleScrollAnimation();
});
window.addEventListener('load', () => {
  handleScrollAnimation();
});

// --- FEEDBACK FORM HANDLER ---
const feedbackForm = document.getElementById('feedback-form');
const testimonialsGrid = document.querySelector('.testimonials-grid');

function addFeedbackToDOM(feedback) {
  const stars = '★'.repeat(feedback.rating) + '☆'.repeat(5 - feedback.rating);
  const card = document.createElement('div');
  card.className = 'testimonial-card';
  // To avoid styling issues if we use simple prepend without the quote styling:
  card.innerHTML = `
    <div class="testimonial-stars">${stars}</div>
    <p class="testimonial-text">"${feedback.text}"</p>
    <div class="testimonial-author">
      <div class="author-avatar">${feedback.name.charAt(0).toUpperCase()}</div>
      <div class="author-info">
        <h3>${feedback.name}</h3>
        <span>${feedback.location || 'Anonymous'}</span>
      </div>
    </div>
  `;
  if (testimonialsGrid) {
    if (feedback.rating === 5) {
      testimonialsGrid.prepend(card);
    } else {
      testimonialsGrid.append(card);
    }
  }
}

async function loadFeedbacks() {
  try {
    const q = query(collection(db, "feedbacks"), orderBy("timestamp", "asc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      addFeedbackToDOM(doc.data());
    });
  } catch (e) {
    console.warn("Could not load feedbacks from Firebase: ", e);
    // Fallback or just ignore if firebase is not configured yet
  }
}

if (feedbackForm) {
  feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = feedbackForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Submitting...';
    submitBtn.disabled = true;

    const name = document.getElementById('feedback-name').value;
    const location = document.getElementById('feedback-location').value;
    const rating = parseInt(document.getElementById('feedback-rating').value);
    const text = document.getElementById('feedback-text').value;

    const newFeedback = {
      name,
      location,
      rating,
      text,
      timestamp: new Date()
    };

    try {
      // Save to Firebase Firestore
      await addDoc(collection(db, "feedbacks"), newFeedback);

      // Add to DOM
      addFeedbackToDOM(newFeedback);

      // Reset form
      feedbackForm.reset();
      alert('Thank you for your feedback! It has been added.');
    } catch (error) {
      console.warn("Error adding document: ", error);
      alert("Error submitting feedback. Did you configure Firebase yet?");
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Initialize feedbacks
window.addEventListener('DOMContentLoaded', () => {
  loadFeedbacks();
});

// --- LOAD MORE REVIEWS HANDLER ---
const loadMoreBtn = document.getElementById('load-more-reviews-btn');
if (loadMoreBtn && testimonialsGrid) {
  loadMoreBtn.addEventListener('click', () => {
    testimonialsGrid.classList.toggle('limit-reviews');
    if (testimonialsGrid.classList.contains('limit-reviews')) {
      loadMoreBtn.textContent = 'View More Reviews';
    } else {
      loadMoreBtn.textContent = 'Show Less';
    }
  });
}
