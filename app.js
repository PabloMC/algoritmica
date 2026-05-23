/* ==========================================================================
   ALGORITMICA - CORE APPLICATION ROUTER & RENDER ENGINE
   ========================================================================== */

// 1. GLOBAL STATE
let state = {
  role: "student", // 'student' or 'teacher'
  activeRoute: "landing", // 'landing', 'student', 'lesson', 'teacher'
  activeLevelId: "level1",
  activeLessonId: null,

  // Quiz tracking
  quizIndex: 0,
  quizAnswers: [],
  quizCompleted: false,

  // Code editor buffer
  editorCodeBuffer: ""
};

// 2. INITIALIZATION ON PAGE LOAD
window.addEventListener("DOMContentLoaded", () => {
  // Setup quick role switcher
  setupQuickRoleSwitcher();

  // Parse state & draw initial page
  routeTo(state.activeRoute);
});

// 3. PERSISTENT SWITCHER CONTROLLER
function setupQuickRoleSwitcher() {
  const switcher = document.createElement("div");
  switcher.className = "role-quick-switcher";
  switcher.innerHTML = `
    <div class="switcher-label">Profile Switcher</div>
    <div class="switcher-btn-group">
      <button class="switcher-btn" id="switch-alex">Alex (Student)</button>
      <button class="switcher-btn" id="switch-maya">Maya (Student)</button>
      <button class="switcher-btn" id="switch-teacher">Pablo (Teacher)</button>
    </div>
    <button class="switcher-btn" onclick="openRegisterStudentModal()" style="margin-top: 0.35rem; width: 100%; border: 1px dashed var(--color-secondary); color: var(--color-secondary-light);">
      + Register Student
    </button>
  `;
  document.body.appendChild(switcher);

  // Add click events
  document.getElementById("switch-alex").addEventListener("click", () => {
    db.setCurrentUser("alex");
    state.role = "student";
    updateActiveSwitcherBtn();
    routeTo(state.activeRoute === "teacher" ? "student" : state.activeRoute);
  });

  document.getElementById("switch-maya").addEventListener("click", () => {
    db.setCurrentUser("maya");
    state.role = "student";
    updateActiveSwitcherBtn();
    routeTo(state.activeRoute === "teacher" ? "student" : state.activeRoute);
  });

  document.getElementById("switch-teacher").addEventListener("click", () => {
    // Triggers security verification before allowing switcher to change roles!
    openTeacherAuthModal(() => {
      state.role = "teacher";
      updateActiveSwitcherBtn();
      routeTo("teacher");
    });
  });

  updateActiveSwitcherBtn();
}

function updateActiveSwitcherBtn() {
  const alexBtn = document.getElementById("switch-alex");
  const mayaBtn = document.getElementById("switch-maya");
  const teacherBtn = document.getElementById("switch-teacher");

  if (!alexBtn || !mayaBtn || !teacherBtn) return;

  alexBtn.className = "switcher-btn";
  mayaBtn.className = "switcher-btn";
  teacherBtn.className = "switcher-btn";

  const currentStudent = db.getCurrentUserId();
  if (state.role === "student") {
    if (currentStudent === "alex") {
      alexBtn.classList.add("active-student");
    } else if (currentStudent === "maya") {
      mayaBtn.classList.add("active-student");
    }
  } else {
    teacherBtn.classList.add("active-teacher");
  }
}

// 4. ROUTER ENGINE WITH SECURITY GUARD
function routeTo(route, params = {}) {
  // ROUTE INTERCEPTION GUARD
  // If attempting to access teacher panels while unauthorized, intercept and prompt PIN!
  if (route === "teacher" && state.role !== "teacher") {
    openTeacherAuthModal(() => {
      state.role = "teacher";
      updateActiveSwitcherBtn();
      routeTo("teacher", params);
    });
    return; // Block execution
  }

  state.activeRoute = route;

  if (params.lessonId) {
    state.activeLessonId = params.lessonId;
  }

  // Re-draw standard page skeleton (Navbar and Main Canvas)
  renderNavbar();

  const appRoot = document.getElementById("app-root");
  appRoot.innerHTML = ""; // Clear content

  // Fade in container
  appRoot.style.opacity = 0;
  setTimeout(() => {
    appRoot.style.opacity = 1;
    appRoot.style.transition = "opacity 0.2s ease-in-out";
  }, 50);

  switch (route) {
    case "landing":
      renderLanding(appRoot);
      break;
    case "student":
      renderStudentDashboard(appRoot);
      break;
    case "lesson":
      renderLessonWorkspace(appRoot);
      break;
    case "teacher":
      renderTeacherDashboard(appRoot);
      break;
    default:
      renderLanding(appRoot);
  }
}

// 5. COMPONENT RENDERERS

// A. Navbar Renderer
function renderNavbar() {
  const header = document.querySelector("header");
  const currentUser = db.getCurrentUser();

  let navLinksHTML = "";
  if (state.role === "student") {
    navLinksHTML = `
      <div class="nav-link ${state.activeRoute === 'landing' ? 'active' : ''}" onclick="routeTo('landing')">Home</div>
      <div class="nav-link ${state.activeRoute === 'student' ? 'active' : ''}" onclick="routeTo('student')">My Path</div>
      <button class="btn btn-secondary" onclick="openRegisterStudentModal()" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;">
        + Join Class
      </button>
      <div class="nav-link" onclick="routeTo('teacher')" style="border: 1px solid var(--border-glass-glow); color: var(--color-primary-light);">Teacher Hub Guard</div>
      <div class="user-badge">
        <span class="user-dot"></span>
        <span>${currentUser.name}</span>
      </div>
    `;
  } else {
    navLinksHTML = `
      <div class="nav-link ${state.activeRoute === 'landing' ? 'active' : ''}" onclick="routeTo('landing')">Home</div>
      <div class="nav-link active" onclick="routeTo('teacher')">Teacher Dashboard</div>
      <div class="user-badge">
        <span class="user-dot teacher-dot"></span>
        <span>Pablo (Teacher)</span>
      </div>
    `;
  }

  header.innerHTML = `
    <div class="nav-container">
      <div class="logo-wrapper" onclick="routeTo('landing')" style="cursor:pointer">
        <div class="logo-icon">A</div>
        <div class="logo-text">Algoritmica</div>
      </div>
      <nav class="nav-links">
        ${navLinksHTML}
      </nav>
    </div>
  `;
}

// B. Landing Splash Page
function renderLanding(container) {
  container.innerHTML = `
    <div class="hero-section">
      <span class="hero-tag">IGCSE Computer Science Prep Platform</span>
      <h1 class="hero-title">Master Computational Thinking & Algorithms</h1>
      <p class="hero-subtitle">Interactive coding environment designed to bridge the gap between initial concepts, Pseudocode logic, and practical Python implementation.</p>
      <div style="display:flex; justify-content:center; gap:1rem;">
        <button class="btn btn-primary" onclick="routeTo('student')">Go to Classroom Path</button>
        <button class="btn btn-secondary" onclick="openRegisterStudentModal()">Register as Student</button>
      </div>
    </div>
    
    <h2 class="text-center" style="font-size: 2rem; margin-top: 3rem;">Syllabus Level Tracks</h2>
    <p class="text-center text-muted-desc margin-bottom-md">Divided into three comprehensive preparation tiers</p>
    
    <div class="level-grid">
      <!-- LEVEL 1 CARD (ACTIVE) -->
      <div class="card-glass level-card" style="cursor: pointer" onclick="routeTo('student')">
        <div class="level-header">
          <span class="badge badge-level">Level 1</span>
          <span class="badge badge-success">Active Syllabus</span>
        </div>
        <div class="level-num">L1</div>
        <h3 class="level-title">Computational Thinking & Python (Grade 8)</h3>
        <p class="level-desc">Tailored specifically for Grade 8. Develop rigorous logical models using flowcharts, structured Pseudocode assignments, and syntax-translated Python programs.</p>
        <ul class="level-features">
          <li class="level-feature-item">Decomposition & Abstraction Foundations</li>
          <li class="level-feature-item">IGCSE Conventions Pseudocode IDE</li>
          <li class="level-feature-item">Sequence, Selection (IF-THEN) & Loops</li>
          <li class="level-feature-item">Real-time Test Verification Suites</li>
        </ul>
        <button class="btn btn-primary" style="width: 100%; justify-content: center;">Enter Learning Path</button>
      </div>

      <!-- LEVEL 2 CARD (LOCKED PREVIEW) -->
      <div class="card-glass level-card locked">
        <div class="level-header">
          <span class="badge badge-level">Level 2</span>
          <span class="lock-badge">🔒 Locked</span>
        </div>
        <div class="level-num">L2</div>
        <h3 class="level-title">Computer Systems & Hardware Architecture</h3>
        <p class="level-desc">For Grade 9. Venture beneath software systems. Program logic gate networks, understand binary floating arithmetic, CPU registers, and network packet structures.</p>
        <ul class="level-features">
          <li class="level-feature-item">Von Neumann CPU Core & Registers</li>
          <li class="level-feature-item">Boolean Logic & Truth Table Builders</li>
          <li class="level-feature-item">Network Topologies & IP Packet Routing</li>
          <li class="level-feature-item">Storage Systems & Operating Systems</li>
        </ul>
      </div>

      <!-- LEVEL 3 CARD (LOCKED PREVIEW) -->
      <div class="card-glass level-card locked">
        <div class="level-header">
          <span class="badge badge-level">Level 3</span>
          <span class="lock-badge">🔒 Locked</span>
        </div>
        <div class="level-num">L3</div>
        <h3 class="level-title">Advanced Coding & Exam Preparation</h3>
        <p class="level-desc">For Grade 10. Ultimate IGCSE preparation track. Rigorous review of practical papers, structured file parsing, search indexing, and relational SQL databases.</p>
        <ul class="level-features">
          <li class="level-feature-item">File Handling, Input/Output streams</li>
          <li class="level-feature-item">Binary Search & Sorting Algorithms</li>
          <li class="level-feature-item">Database Schemas & SQL query structure</li>
          <li class="level-feature-item">Mock Board Exams & Practical Coding</li>
        </ul>
      </div>
    </div>
  `;
}

// C. Student Learning Path Dashboard
function renderStudentDashboard(container) {
  const currentUser = db.getCurrentUser();

  // Calculate completion percentage based on the new 10-lesson curriculum
  const totalLessons = 10;
  const completedLessons = Object.keys(currentUser.progress).length;
  const progressPercent = Math.round((completedLessons / totalLessons) * 100);

  container.innerHTML = `
    <div class="student-dashboard-header">
      <div>
        <h1 style="font-size: 2.2rem; margin-bottom: 0.5rem;">Hello, ${currentUser.name}!</h1>
        <p class="text-muted-desc">Welcome to your Level 1 IGCSE Preparation course map.</p>
      </div>
      
      <!-- Progress visual panel -->
      <div class="card-glass" style="padding: 1rem 1.5rem; display: flex; align-items: center; gap: 1.5rem;">
        <div class="progress-ring-container">
          <svg width="80" height="80">
            <circle stroke="rgba(255,255,255,0.05)" stroke-width="6" fill="transparent" r="32" cx="40" cy="40" />
            <circle stroke="var(--color-primary)" stroke-width="6" fill="transparent" r="32" cx="40" cy="40" 
                    stroke-dasharray="201.06" stroke-dashoffset="${201.06 - (201.06 * progressPercent / 100)}" 
                    stroke-linecap="round" transform="rotate(-90 40 40)" />
          </svg>
          <div class="progress-text">${progressPercent}%</div>
        </div>
        <div>
          <h4 style="margin-bottom: 0.25rem;">Level 1 Progress</h4>
          <p style="font-size: 0.85rem; color: var(--text-secondary);">${completedLessons} of ${totalLessons} Milestones Cleared</p>
        </div>
      </div>
    </div>

    <div class="module-container">
      ${CURRICULUM.levels[0].modules.map(module => {
    return `
          <div class="card-glass module-card">
            <div class="module-header">
              <h2 class="module-title">${module.title}</h2>
              <p class="module-subtitle">${module.description}</p>
            </div>
            
            <div class="lesson-list">
              ${module.lessons.map(lesson => {
      const lessonProgress = currentUser.progress[lesson.id];
      const isCompleted = !!lessonProgress;
      const scoreBadge = (isCompleted && lessonProgress.score !== undefined)
        ? `<span class="badge ${lessonProgress.score >= 70 ? 'badge-success' : 'badge-warning'}">${lessonProgress.score}% Score</span>`
        : "";

      return `
                  <div class="lesson-card ${isCompleted ? 'completed' : ''}" onclick="routeTo('lesson', {lessonId: '${lesson.id}'})">
                    <div class="lesson-top">
                      <span class="lesson-tag">${lesson.badge}</span>
                      <span style="font-size: 1.25rem;">${isCompleted ? '✅' : '👉'}</span>
                    </div>
                    <div>
                      <h3 class="lesson-name">${lesson.title}</h3>
                      <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.75rem;">${lesson.description}</p>
                    </div>
                    <div class="lesson-meta">
                      <span>⏱️ ${lesson.duration}</span>
                      ${scoreBadge}
                    </div>
                  </div>
                `;
    }).join("")}
            </div>
          </div>
        `;
  }).join("")}
    </div>
  `;
}

// D. Split-Screen Lesson Workspace
function renderLessonWorkspace(container) {
  // Find current lesson object
  let lesson = null;
  let nextLessonId = null;

  const level1 = CURRICULUM.levels[0];
  const allLessons = [];
  level1.modules.forEach(m => m.lessons.forEach(l => allLessons.push(l)));

  const lessonIndex = allLessons.findIndex(l => l.id === state.activeLessonId);
  if (lessonIndex !== -1) {
    lesson = allLessons[lessonIndex];
    if (lessonIndex + 1 < allLessons.length) {
      nextLessonId = allLessons[lessonIndex + 1].id;
    }
  }

  if (!lesson) {
    routeTo("student");
    return;
  }

  // Draw pane structure
  container.innerHTML = `
    <div style="margin-bottom: 1.5rem;">
      <button class="btn btn-secondary" onclick="routeTo('student')" style="padding: 0.4rem 1rem; font-size: 0.85rem;">
        ← Back to Learning Path
      </button>
    </div>
    
    <div class="workspace-layout">
      <!-- LEFT PANE: Theory Reader -->
      <div class="workspace-pane">
        <div class="pane-header">
          <div class="pane-title-group">
            <span class="badge badge-primary">${lesson.badge}</span>
            <h1 class="pane-title">${lesson.title}</h1>
          </div>
        </div>
        <div class="card-glass theory-content">
          ${lesson.content}
        </div>
      </div>
      
      <!-- RIGHT PANE: Interactive Sandbox -->
      <div class="workspace-pane">
        <div class="pane-header">
          <h2 class="pane-title">Active Sandbox</h2>
        </div>
        <div class="card-glass sandbox-card" id="sandbox-root">
          <!-- Dynamically filled with Quiz or IDE workspace -->
        </div>
      </div>
    </div>
  `;

  // Initialize Right Pane logic
  if (lesson.type === "quiz") {
    initQuizSandbox(lesson, nextLessonId);
  } else if (lesson.type === "workspace") {
    initIDESandbox(lesson, nextLessonId);
  }
}

// E. Quiz Workspace Handler
function initQuizSandbox(lesson, nextLessonId) {
  state.quizIndex = 0;
  state.quizAnswers = [];
  state.quizCompleted = false;

  function renderQuizQuestion() {
    const sandboxRoot = document.getElementById("sandbox-root");
    const qIndex = state.quizIndex;

    if (qIndex >= lesson.quiz.length) {
      // Calculate results
      let correctCount = 0;
      state.quizAnswers.forEach((ans, idx) => {
        if (ans === lesson.quiz[idx].answer) correctCount++;
      });
      const scorePercent = Math.round((correctCount / lesson.quiz.length) * 100);

      // Save result to Database
      db.submitQuizResult(lesson.id, scorePercent, state.quizAnswers);

      // Render Completion Page
      sandboxRoot.innerHTML = `
        <div class="quiz-container text-center" style="justify-content: center; gap: 2rem;">
          <div>
            <span style="font-size: 4rem;">🏆</span>
            <h2 style="font-size: 2.2rem; margin-top: 1rem; margin-bottom: 0.5rem;">Lesson Completed!</h2>
            <p class="text-muted-desc">Excellent work finishing the conceptual quiz.</p>
          </div>
          
          <div class="card-glass" style="max-width: 280px; margin: 0 auto; padding: 1.5rem; background: rgba(255,255,255,0.02)">
            <h4 style="margin-bottom: 0.5rem; color: var(--text-secondary);">Your Score</h4>
            <div style="font-size: 3.5rem; font-weight: 800; color: ${scorePercent >= 70 ? 'var(--color-success)' : 'var(--color-warning)'};">
              ${scorePercent}%
            </div>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">${correctCount} of ${lesson.quiz.length} correct</p>
          </div>

          <div style="display: flex; gap: 1rem; justify-content: center;">
            <button class="btn btn-secondary" onclick="routeTo('student')">Back to Course Path</button>
            ${nextLessonId
          ? `<button class="btn btn-primary" onclick="routeTo('lesson', {lessonId: '${nextLessonId}'})">Next Lesson →</button>`
          : `<button class="btn btn-primary" onclick="routeTo('student')">Course Finished! 🎉</button>`
        }
          </div>
        </div>
      `;
      return;
    }

    const item = lesson.quiz[qIndex];
    sandboxRoot.innerHTML = `
      <div class="quiz-container">
        <div>
          <div class="flex-between margin-bottom-sm">
            <span class="badge badge-primary">Question ${qIndex + 1} of ${lesson.quiz.length}</span>
            <span style="font-size: 0.85rem; color: var(--text-muted);">Syllabus Quiz</span>
          </div>
          <h3 class="quiz-question">${item.question}</h3>
          
          <div class="quiz-options">
            ${item.options.map((opt, idx) => {
      const letter = String.fromCharCode(65 + idx); // A, B, C, D
      return `
                <div class="quiz-option" data-idx="${idx}">
                  <span class="quiz-option-letter">${letter}</span>
                  <span>${opt}</span>
                </div>
              `;
    }).join("")}
          </div>
        </div>
        
        <div id="quiz-action-bar" style="display: flex; flex-direction: column; gap: 1rem;">
          <button class="btn btn-primary" id="quiz-btn-submit" disabled style="width: 100%;">Verify Answer</button>
        </div>
      </div>
    `;

    let selectedIdx = null;
    const options = sandboxRoot.querySelectorAll(".quiz-option");
    const submitBtn = document.getElementById("quiz-btn-submit");

    options.forEach(opt => {
      opt.addEventListener("click", () => {
        options.forEach(o => o.classList.remove("selected"));
        opt.classList.add("selected");
        selectedIdx = parseInt(opt.getAttribute("data-idx"));
        submitBtn.removeAttribute("disabled");
      });
    });

    submitBtn.addEventListener("click", () => {
      // Record answer
      state.quizAnswers.push(selectedIdx);
      const isCorrect = selectedIdx === item.answer;

      // Update styling
      options.forEach((opt, idx) => {
        opt.style.pointerEvents = "none"; // Disable clicks
        if (idx === item.answer) {
          opt.classList.add("correct");
        } else if (idx === selectedIdx && !isCorrect) {
          opt.classList.add("incorrect");
        }
      });

      // Add detailed explanation
      const container = sandboxRoot.querySelector(".quiz-container");
      const explanationDiv = document.createElement("div");
      explanationDiv.className = "quiz-explanation";
      explanationDiv.innerHTML = `
        <strong>${isCorrect ? '✅ Correct!' : '❌ Incorrect.'}</strong> ${item.explanation}
      `;

      // Place explanation above buttons
      const actionBar = document.getElementById("quiz-action-bar");
      container.insertBefore(explanationDiv, actionBar);

      // Update action button
      submitBtn.remove();
      const nextBtn = document.createElement("button");
      nextBtn.className = "btn btn-primary";
      nextBtn.style.width = "100%";
      nextBtn.innerText = qIndex + 1 === lesson.quiz.length ? "Finish Quiz" : "Next Question →";
      nextBtn.addEventListener("click", () => {
        state.quizIndex++;
        renderQuizQuestion();
      });
      actionBar.appendChild(nextBtn);
    });
  }

  renderQuizQuestion();
}

// F. IDE Code Workspace Handler
function initIDESandbox(lesson, nextLessonId) {
  const sandboxRoot = document.getElementById("sandbox-root");

  // Create IDE workspace structure
  sandboxRoot.innerHTML = `
    <div style="display:flex; flex-direction:column; height:100%;">
      <div class="margin-bottom-sm">
        <h4 style="margin-bottom:0.25rem;">Programming Challenge:</h4>
        <p style="font-size:0.85rem; color: var(--text-secondary); line-height: 1.4;">${lesson.workspace.challenge}</p>
      </div>
      
      <!-- Editor -->
      <div class="editor-container">
        <div class="editor-header">
          <div class="editor-dots">
            <span class="editor-dot red"></span>
            <span class="editor-dot yellow"></span>
            <span class="editor-dot green"></span>
          </div>
          <div>main.${lesson.workspace.language === 'pseudocode' ? 'pseudo' : 'py'}</div>
        </div>
        <div class="editor-body-wrapper">
          <div class="line-numbers" id="editor-linenumbers">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10</div>
          <textarea class="code-textarea" id="editor-textarea" spellcheck="false">${lesson.workspace.template}</textarea>
        </div>
      </div>
      
      <!-- Actions Bar -->
      <div class="flex-between margin-bottom-sm">
        <button class="btn btn-secondary" id="ide-btn-reset" style="padding: 0.45rem 1rem; font-size:0.85rem;">Reset Template</button>
        <button class="btn btn-success" id="ide-btn-run" style="padding: 0.5rem 1.5rem; font-size:0.95rem; box-shadow: 0 0 15px rgba(16,185,129,0.25);">
          🚀 Run Code & Verify
        </button>
      </div>
      
      <!-- Terminal Console -->
      <div class="terminal-container">
        <div class="terminal-header">
          <span>Terminal Output Console</span>
          <span style="font-size:0.75rem; color: var(--text-muted);">Stdout / Stderr</span>
        </div>
        <div class="terminal-body" id="terminal-stdout">
          <div class="terminal-row system">> System ready. Write your algorithm above and press "Run Code".</div>
        </div>
      </div>
      
      <!-- Next Lesson Area (hidden initially until passed) -->
      <div id="ide-next-container" class="margin-top-md text-center" style="display:none; animation: slideIn 0.3s ease-out;">
        <div class="card-glass" style="padding:1rem; border-color:var(--color-success); background:rgba(16,185,129,0.02); display:flex; justify-content:space-between; align-items:center;">
          <span style="color:var(--color-success); font-weight:600;">✨ Challenge Passed Successfully!</span>
          <div style="display:flex; gap:0.5rem;">
            <button class="btn btn-secondary" onclick="routeTo('student')" style="padding: 0.4rem 0.8rem; font-size:0.8rem;">Path</button>
            ${nextLessonId
      ? `<button class="btn btn-primary" onclick="routeTo('lesson', {lessonId: '${nextLessonId}'})" style="padding: 0.4rem 1rem; font-size:0.8rem;">Next Lesson →</button>`
      : `<button class="btn btn-primary" onclick="routeTo('student')" style="padding: 0.4rem 1rem; font-size:0.8rem;">Course Completed! 🎉</button>`
    }
          </div>
        </div>
      </div>
    </div>
  `;

  const textarea = document.getElementById("editor-textarea");
  const linenumbers = document.getElementById("editor-linenumbers");
  const stdout = document.getElementById("terminal-stdout");
  const runBtn = document.getElementById("ide-btn-run");
  const resetBtn = document.getElementById("ide-btn-reset");
  const nextContainer = document.getElementById("ide-next-container");

  // Keep Line numbers updated
  textarea.addEventListener("input", updateLineNumbers);
  textarea.addEventListener("scroll", () => {
    linenumbers.scrollTop = textarea.scrollTop;
  });

  // Reset lines
  function updateLineNumbers() {
    const textLines = textarea.value.split("\n");
    const count = Math.max(textLines.length, 10);
    let html = "";
    for (let i = 1; i <= count; i++) {
      html += i + "<br>";
    }
    linenumbers.innerHTML = html;
  }
  updateLineNumbers();

  // Reset template button
  resetBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset the code to the initial template?")) {
      textarea.value = lesson.workspace.template;
      updateLineNumbers();
      stdout.innerHTML = '<div class="terminal-row system">> System ready. Write your algorithm above and press "Run Code".</div>';
      nextContainer.style.display = "none";
    }
  });

  // Run Code
  runBtn.addEventListener("click", () => {
    const studentCode = textarea.value;
    stdout.innerHTML = '<div class="terminal-row system">> Compiling and running unit tests...</div>';

    // Smooth delay simulating interpreter loading
    setTimeout(() => {
      try {
        // Compile unit tester
        const testRunner = new Function("studentCode", lesson.workspace.verifyFn);
        const result = testRunner(studentCode);

        // Output terminal rows
        stdout.innerHTML = "";
        result.logs.forEach(log => {
          const row = document.createElement("div");
          row.className = `terminal-row ${log.type}`;
          row.innerText = log.text;
          stdout.appendChild(row);
        });

        // Auto scroll terminal to bottom
        stdout.scrollTop = stdout.scrollHeight;

        if (result.success) {
          // Play success chime or highlight
          db.submitCodeChallenge(lesson.id, studentCode, true);
          nextContainer.style.display = "block";

          // Confetti or visual indicator
          runBtn.style.boxShadow = "0 0 25px rgba(16,185,129,0.6)";
          setTimeout(() => {
            runBtn.style.boxShadow = "0 0 15px rgba(16,185,129,0.25)";
          }, 1500);
        } else {
          db.submitCodeChallenge(lesson.id, studentCode, false);
          nextContainer.style.display = "none";
        }
      } catch (err) {
        stdout.innerHTML = `
          <div class="terminal-row error">System Exception: Failed to run analysis engine.</div>
          <div class="terminal-row error">${err.message}</div>
        `;
      }
    }, 600);
  });
}

// G. Teacher Dashboard Component
function renderTeacherDashboard(container) {
  const students = db.getAllStudents();
  const classes = db.getAllClasses();
  const activeClassId = db.getActiveClassId();

  // Calculate average stats (out of 10 syllabus lessons now!)
  const totalStudents = students.length;
  let totalLessonsCompleted = 0;
  let totalScoreSum = 0;
  let quizCount = 0;

  students.forEach(s => {
    const progressCount = Object.keys(s.progress).length;
    totalLessonsCompleted += progressCount;

    Object.values(s.progress).forEach(prog => {
      if (prog.type === "quiz" && prog.score !== undefined) {
        totalScoreSum += prog.score;
        quizCount++;
      }
    });
  });

  const averageProgressPercent = totalStudents > 0 ? Math.round((totalLessonsCompleted / (totalStudents * 10)) * 100) : 0;
  const averageQuizAccuracy = quizCount > 0 ? Math.round(totalScoreSum / quizCount) : 100;

  // Generate unified classroom logs
  const unifiedLogs = [];
  students.forEach(s => {
    if (s.activityLog) {
      s.activityLog.forEach(log => {
        unifiedLogs.push({
          studentName: s.name,
          studentAvatar: s.avatar,
          ...log
        });
      });
    }
  });

  // Sort logs by timestamp desc
  unifiedLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  // Render Skeleton
  container.innerHTML = `
    <div class="teacher-header flex-between" style="flex-wrap: wrap; gap:1.5rem;">
      <div>
        <h1 style="font-size: 2.2rem; margin-bottom: 0.5rem;">Teacher Management Dashboard</h1>
        <p class="text-muted-desc">Dr. Smith's Classroom Hub: Grade 8 IGCSE Preparation course</p>
      </div>
      
      <!-- Class Selector Controls -->
      <div class="card-glass flex-between" style="padding:0.75rem 1.25rem; gap:1rem; background:rgba(255,255,255,0.01);">
        <div style="display:flex; align-items:center; gap:0.5rem;">
          <span style="font-size:0.85rem; color:var(--text-secondary); font-weight:600;">Active Class:</span>
          <select id="teacher-class-select" style="background:#0c111e; color:white; border:1px solid var(--border-glass); padding:0.45rem 0.85rem; border-radius:var(--radius-sm); font-family:var(--font-heading); font-size:0.85rem; outline:none; cursor:pointer;">
            ${classes.map(c => `
              <option value="${c.id}" ${c.id === activeClassId ? 'selected' : ''}>${c.name}</option>
            `).join("")}
          </select>
        </div>
        <button class="btn btn-primary" onclick="openCreateClassModal()" style="padding:0.45rem 1rem; font-size:0.8rem;">
          + New Class
        </button>
      </div>
    </div>

    <!-- Analytics Dashboard Cards -->
    <div class="metrics-row">
      <div class="card-glass metric-card">
        <div class="metric-icon-box metric-purple">👥</div>
        <div class="metric-info">
          <div class="metric-value">${totalStudents}</div>
          <div class="metric-label">Enrolled Students</div>
        </div>
      </div>
      
      <div class="card-glass metric-card">
        <div class="metric-icon-box metric-indigo">📈</div>
        <div class="metric-info">
          <div class="metric-value">${averageProgressPercent}%</div>
          <div class="metric-label">Avg. Syllabus Clearance</div>
        </div>
      </div>
      
      <div class="card-glass metric-card">
        <div class="metric-icon-box metric-success">🎯</div>
        <div class="metric-info">
          <div class="metric-value">${averageQuizAccuracy}%</div>
          <div class="metric-label">Avg. Quiz Accuracy</div>
        </div>
      </div>
      
      <div class="card-glass metric-card">
        <div class="metric-icon-box metric-cyan">🏆</div>
        <div class="metric-info">
          <div class="metric-value">${unifiedLogs.filter(l => l.type === 'workspace').length}</div>
          <div class="metric-label">IDE Milestones Unlocked</div>
        </div>
      </div>
    </div>

    <!-- Main Content Layout -->
    <div class="dashboard-grid">
      <!-- Left side: Students Progress Table Matrix -->
      <div>
        <div class="dashboard-title-bar">
          <h2 class="dashboard-section-title">Class Progress Grid (Syllabus v2)</h2>
          <button class="btn btn-secondary" onclick="resetClassDatabase()" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;">
            🔄 Reset Class Data
          </button>
        </div>
        
        <div class="table-responsive">
          <table class="progress-table">
            <thead>
              <tr>
                <th>Student</th>
                <th class="text-center">Mod 1: Thinking</th>
                <th class="text-center">Mod 2: Pseudocode</th>
                <th class="text-center">Mod 3: Python</th>
                <th class="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              ${students.length === 0
      ? `<tr><td colspan="5" align="center" style="color:var(--text-muted); padding:3rem;">No students registered in this class. Use the roster box below to enroll students!</td></tr>`
      : students.map(student => {
        const getDot = (id, name) => {
          const stateInfo = student.progress[id];
          if (!stateInfo) return `<div class="progress-dot" data-tooltip="${name}: Not Started"></div>`;
          if (stateInfo.completed) {
            const extra = stateInfo.score !== undefined ? ` (Score: ${stateInfo.score}%)` : "";
            return `<div class="progress-dot completed" data-tooltip="${name}: Completed${extra}"></div>`;
          }
          return `<div class="progress-dot in-progress" data-tooltip="${name}: In Progress"></div>`;
        };

        return `
                      <tr>
                        <td>
                          <div class="student-cell">
                            <div class="student-avatar" style="background: ${student.id === 'maya' ? 'linear-gradient(135deg, #06b6d4, #6366f1)' : 'var(--grad-hero)'}">
                              ${student.avatar}
                            </div>
                            <div>
                              <div style="font-size:0.95rem; font-weight:600;">${student.name}</div>
                              <div style="font-size:0.75rem; color:var(--text-muted);">Grade 8</div>
                            </div>
                          </div>
                        </td>
                        <td align="center">
                          <div class="progress-dot-grid" style="justify-content: center;">
                            ${getDot("l1_1", "Decomposition")}
                            ${getDot("l1_2", "Abstraction")}
                          </div>
                        </td>
                        <td align="center">
                          <div class="progress-dot-grid" style="justify-content: center;">
                            ${getDot("l2_1", "Data Types")}
                            ${getDot("l2_2", "IF-ELSE Selection")}
                            ${getDot("l2_3", "Loops & Iteration")}
                            ${getDot("l2_4", "Totals & Averages")}
                            ${getDot("l2_5", "Finding Maximum")}
                          </div>
                        </td>
                        <td align="center">
                          <div class="progress-dot-grid" style="justify-content: center;">
                            ${getDot("l3_1", "Python Casting")}
                            ${getDot("l3_2", "Python Loops")}
                            ${getDot("l3_3", "Python Totals")}
                          </div>
                        </td>
                        <td align="center">
                          <button class="btn btn-secondary" 
                                  onclick="openStudentInspector('${student.id}')" 
                                  style="padding: 0.35rem 0.65rem; font-size: 0.75rem;" 
                                  ${Object.keys(student.codeSubmissions).length === 0 ? 'disabled' : ''}>
                            🔬 Inspect Code
                          </button>
                        </td>
                      </tr>
                    `;
      }).join("")}
            </tbody>
          </table>
        </div>

        <!-- Class Roster Manager Form -->
        <div class="card-glass margin-top-md" style="padding:1.25rem 1.5rem; background:rgba(255,255,255,0.01);">
          <h4 style="margin-bottom:0.5rem; font-size:0.95rem; font-weight:600;"> Roster Manager: Enroll Student</h4>
          <div style="display:flex; gap:1rem;">
            <input type="text" id="roster-student-name" placeholder="Enter Student's Full Name" style="flex:1; background:#05070a; border:1px solid var(--border-glass); border-radius:var(--radius-sm); padding:0.5rem 1rem; color:white; outline:none; font-size:0.9rem;">
            <button class="btn btn-success" id="roster-enroll-btn" style="padding:0.5rem 1.25rem; font-size:0.85rem;">Enrol Student</button>
          </div>
        </div>
      </div>
      
      <!-- Right side: Activity Feed Log -->
      <div>
        <div class="dashboard-title-bar">
          <h2 class="dashboard-section-title">Recent Activity Feed</h2>
        </div>
        <div class="card-glass" style="max-height: 580px; overflow-y: auto; padding: 1.25rem;">
          <div class="activity-list">
            ${unifiedLogs.length === 0
      ? `<div style="color:var(--text-muted); font-size:0.85rem; text-align:center; padding: 2rem;">No recent activities logged.</div>`
      : unifiedLogs.map(log => {
        let icon = "📝";
        if (log.type === "quiz") icon = "🎯";
        if (log.type === "workspace") icon = "💻";
        if (log.type === "system") icon = "🤖";

        const dateText = new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        return `
                    <div class="activity-item">
                      <span class="activity-icon">${icon}</span>
                      <div class="activity-body">
                        <div>
                          <span class="activity-student">${log.studentName || 'System'}</span> 
                          <span>${log.text}</span>
                        </div>
                        <div class="activity-time">${dateText} - Algoritmica Engine</div>
                      </div>
                    </div>
                  `;
      }).join("")
    }
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach change listener to dropdown
  const classSelect = document.getElementById("teacher-class-select");
  if (classSelect) {
    classSelect.addEventListener("change", (e) => {
      db.setActiveClass(e.target.value);
      routeTo("teacher");
    });
  }

  // Attach listener to Enroll Roster Button
  const enrollBtn = document.getElementById("roster-enroll-btn");
  const rosterName = document.getElementById("roster-student-name");
  if (enrollBtn && rosterName) {
    enrollBtn.addEventListener("click", () => {
      const name = rosterName.value.trim();
      if (!name) {
        alert("Please enter a valid student name.");
        return;
      }
      db.addStudentToClass(name, activeClassId);
      rosterName.value = "";
      routeTo("teacher");
    });
  }
}

// I. CLASSROOM CREATION MODAL
window.openCreateClassModal = function () {
  const modalContainer = document.createElement("div");
  modalContainer.className = "inspector-overlay";
  modalContainer.id = "class-modal-overlay";
  modalContainer.innerHTML = `
    <div class="card-glass inspector-modal" style="max-width:420px; padding:1.5rem;">
      <div class="inspector-header" style="border:none; padding:0 0 1rem 0;">
        <h3 style="font-size: 1.25rem;">Create New Class</h3>
        <button onclick="closeCreateClassModal()" style="background:none; border:none; color:var(--text-secondary); font-size:1.5rem; cursor:pointer;">×</button>
      </div>
      <div class="inspector-body" style="padding:0;">
        <div class="margin-bottom-sm">
          <label style="font-size:0.8rem; color:var(--text-secondary); font-weight:600; display:block; margin-bottom:0.35rem;">CLASS NAME</label>
          <input type="text" id="class-modal-name-input" placeholder="e.g. Grade 8 Computing (Beta)" style="width:100%; background:#05070a; border:1px solid var(--border-glass); border-radius:var(--radius-sm); padding:0.6rem 1rem; color:white; outline:none; font-size:0.95rem;">
        </div>
        <button class="btn btn-primary" id="class-modal-submit-btn" style="width:100%; justify-content:center; margin-top:0.5rem;">
          Create & Switch Class
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modalContainer);

  document.getElementById("class-modal-submit-btn").addEventListener("click", () => {
    const nameInput = document.getElementById("class-modal-name-input");
    const name = nameInput.value.trim();
    if (!name) {
      alert("Please enter a valid class name.");
      return;
    }
    db.createClass(name);
    closeCreateClassModal();
    routeTo("teacher");
  });

  modalContainer.addEventListener("click", (e) => {
    if (e.target.id === "class-modal-overlay") {
      closeCreateClassModal();
    }
  });
};

window.closeCreateClassModal = function () {
  const modal = document.getElementById("class-modal-overlay");
  if (modal) modal.remove();
};

// J. STUDENT REGISTRATION MODAL
window.openRegisterStudentModal = function () {
  const modalContainer = document.createElement("div");
  modalContainer.className = "inspector-overlay";
  modalContainer.id = "register-modal-overlay";
  modalContainer.innerHTML = `
    <div class="card-glass inspector-modal" style="max-width:420px; padding:1.5rem;">
      <div class="inspector-header" style="border:none; padding:0 0 1rem 0;">
        <h3 style="font-size: 1.25rem;">Student Registration</h3>
        <button onclick="closeRegisterStudentModal()" style="background:none; border:none; color:var(--text-secondary); font-size:1.5rem; cursor:pointer;">×</button>
      </div>
      <div class="inspector-body" style="padding:0;">
        <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1rem; line-height:1.4;">
          Create a student profile to join the classroom. Your progress and editor files will save automatically to local storage.
        </p>
        <div class="margin-bottom-sm">
          <label style="font-size:0.8rem; color:var(--text-secondary); font-weight:600; display:block; margin-bottom:0.35rem;">YOUR FULL NAME</label>
          <input type="text" id="register-modal-name-input" placeholder="e.g. Liam O'Connor" style="width:100%; background:#05070a; border:1px solid var(--border-glass); border-radius:var(--radius-sm); padding:0.6rem 1rem; color:white; outline:none; font-size:0.95rem;">
        </div>
        <button class="btn btn-primary" id="register-modal-submit-btn" style="width:100%; justify-content:center; margin-top:0.5rem;">
          Register & Start Coding
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modalContainer);

  document.getElementById("register-modal-submit-btn").addEventListener("click", () => {
    const nameInput = document.getElementById("register-modal-name-input");
    const name = nameInput.value.trim();
    if (!name) {
      alert("Please enter your name to register.");
      return;
    }
    db.registerStudent(name);
    closeRegisterStudentModal();
    state.role = "student";
    updateActiveSwitcherBtn();
    routeTo("student");
  });

  modalContainer.addEventListener("click", (e) => {
    if (e.target.id === "register-modal-overlay") {
      closeRegisterStudentModal();
    }
  });
};

window.closeRegisterStudentModal = function () {
  const modal = document.getElementById("register-modal-overlay");
  if (modal) modal.remove();
};

// K. SECURE TEACHER GATEKEEPER PASSCODE MODAL
window.openTeacherAuthModal = function (onSuccess) {
  const modalContainer = document.createElement("div");
  modalContainer.className = "inspector-overlay";
  modalContainer.id = "teacher-auth-overlay";
  modalContainer.innerHTML = `
    <div class="card-glass inspector-modal" style="max-width:380px; padding:1.75rem; border-color:var(--color-primary); box-shadow:0 0 35px rgba(99, 102, 241, 0.25);">
      <div class="inspector-header" style="border:none; padding:0 0 0.75rem 0;">
        <h3 style="font-size: 1.25rem; font-family:'Outfit';">Administrative Security Guard</h3>
        <button onclick="closeTeacherAuthModal()" style="background:none; border:none; color:var(--text-secondary); font-size:1.5rem; cursor:pointer;">×</button>
      </div>
      <div class="inspector-body" style="padding:0;">
        <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1.25rem; line-height:1.45;">
          Please enter the Teacher Administrative PIN to unlock dashboard statistics, rosters, and coding submissions.
        </p>
        <div class="margin-bottom-sm">
          <label style="font-size:0.75rem; color:var(--text-secondary); font-weight:700; display:block; margin-bottom:0.35rem; letter-spacing:0.05em;">TEACHER ACCESS PIN</label>
          <input type="password" id="teacher-pin-input" placeholder="Enter PIN" style="width:100%; background:#05070a; border:1px solid var(--border-glass); border-radius:var(--radius-sm); padding:0.6rem 1rem; color:white; outline:none; font-size:1.1rem; text-align:center; letter-spacing:0.1em;" autofocus>
          <div id="teacher-pin-error" style="color:var(--color-error); font-size:0.8rem; margin-top:0.45rem; font-weight:600; display:none; animation:slideIn 0.2s ease;"></div>
        </div>
        <button class="btn btn-primary" id="teacher-pin-submit-btn" style="width:100%; justify-content:center; margin-top:0.5rem; box-shadow:var(--shadow-glow);">
          Verify Administrative PIN
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modalContainer);

  const pinInput = document.getElementById("teacher-pin-input");
  const errorMsg = document.getElementById("teacher-pin-error");
  const submitBtn = document.getElementById("teacher-pin-submit-btn");

  // Focus input
  pinInput.focus();

  // Listen for Enter key
  pinInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      verifyPIN();
    }
  });

  submitBtn.addEventListener("click", verifyPIN);

  function verifyPIN() {
    const pin = pinInput.value.trim();
    if (pin === "1234") {
      // Glow green and grant access!
      pinInput.style.borderColor = "var(--color-success)";
      errorMsg.style.color = "var(--color-success)";
      errorMsg.innerText = "Access Unlocked. Redirecting...";
      errorMsg.style.display = "block";

      setTimeout(() => {
        closeTeacherAuthModal();
        onSuccess();
      }, 500);
    } else {
      // Access Denied!
      pinInput.style.borderColor = "var(--color-error)";
      errorMsg.innerText = "Access Denied. Invalid Administrative PIN.";
      errorMsg.style.display = "block";
      pinInput.value = "";
      pinInput.focus();

      // Temporary shake simulation
      const card = modalContainer.querySelector(".inspector-modal");
      card.style.transform = "translateX(-8px)";
      setTimeout(() => card.style.transform = "translateX(8px)", 70);
      setTimeout(() => card.style.transform = "translateX(-4px)", 140);
      setTimeout(() => card.style.transform = "translateX(4px)", 210);
      setTimeout(() => card.style.transform = "none", 280);
    }
  }

  modalContainer.addEventListener("click", (e) => {
    if (e.target.id === "teacher-auth-overlay") {
      closeTeacherAuthModal();
    }
  });
};

window.closeTeacherAuthModal = function () {
  const modal = document.getElementById("teacher-auth-overlay");
  if (modal) modal.remove();
};

// H. Code Inspector Modal Manager
window.openStudentInspector = function (studentId) {
  const stateData = db.getAllStudents();
  const student = stateData.find(s => s.id === studentId);
  if (!student) return;

  const modalContainer = document.createElement("div");
  modalContainer.className = "inspector-overlay";
  modalContainer.id = "inspector-modal-overlay";

  const subsKeys = Object.keys(student.codeSubmissions);

  let tabsHTML = "";
  let panelsHTML = "";

  subsKeys.forEach((lessonId, idx) => {
    let title = "";
    if (lessonId === "l2_1") title = "Data Types";
    else if (lessonId === "l2_2") title = "IF Selection";
    else if (lessonId === "l2_3") title = "Loops Iteration";
    else if (lessonId === "l2_4") title = "Totals & Avg";
    else if (lessonId === "l2_5") title = "Extreme Max";
    else if (lessonId === "l3_1") title = "Python Casting";
    else if (lessonId === "l3_2") title = "Python Selection";
    else if (lessonId === "l3_3") title = "Python Totals";

    const item = student.codeSubmissions[lessonId];
    const cleanCode = item.code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const dateText = new Date(item.timestamp).toLocaleString();

    tabsHTML += `
      <button class="nav-link ${idx === 0 ? 'active' : ''}" 
              id="inspector-tab-${lessonId}" 
              onclick="switchInspectorTab('${lessonId}')" 
              style="padding:0.4rem 0.8rem; font-size:0.8rem;">
        ${title}
      </button>
    `;

    panelsHTML += `
      <div id="inspector-panel-${lessonId}" class="inspector-tab-panel" style="display: ${idx === 0 ? 'block' : 'none'};">
        <div style="font-size:0.85rem; color:var(--text-secondary); margin-bottom: 0.5rem; display:flex; justify-content:space-between;">
          <span>Submitted: ${dateText}</span>
          <span style="color:var(--color-success); font-weight:600;">Status: PASSED (100)</span>
        </div>
        <pre class="inspector-code-block">${cleanCode}</pre>
      </div>
    `;
  });

  modalContainer.innerHTML = `
    <div class="card-glass inspector-modal">
      <div class="inspector-header">
        <h3 style="font-size: 1.25rem;">Submissions by ${student.name}</h3>
        <button onclick="closeStudentInspector()" style="background:none; border:none; color:var(--text-secondary); font-size:1.5rem; cursor:pointer;">×</button>
      </div>
      <div class="inspector-body">
        <div class="nav-links" style="border-bottom: 1px solid var(--border-glass); padding-bottom: 0.75rem; margin-bottom:1rem; gap: 0.5rem;">
          ${tabsHTML}
        </div>
        <div>
          ${panelsHTML}
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modalContainer);

  // Close on outside click
  modalContainer.addEventListener("click", (e) => {
    if (e.target.id === "inspector-modal-overlay") {
      closeStudentInspector();
    }
  });
};

window.switchInspectorTab = function (lessonId) {
  const panels = document.querySelectorAll(".inspector-tab-panel");
  const tabs = document.querySelectorAll("#inspector-modal-overlay .nav-link");

  panels.forEach(p => p.style.display = "none");
  tabs.forEach(t => t.classList.remove("active"));

  document.getElementById(`inspector-panel-${lessonId}`).style.display = "block";
  document.getElementById(`inspector-tab-${lessonId}`).classList.add("active");
};

window.closeStudentInspector = function () {
  const modal = document.getElementById("inspector-modal-overlay");
  if (modal) {
    modal.remove();
  }
};

window.resetClassDatabase = function () {
  if (confirm("Are you sure you want to reset all student progress? This will delete your local test database.")) {
    db.resetDatabase();
    routeTo(state.activeRoute);
  }
};
