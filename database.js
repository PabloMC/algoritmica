/* ==========================================================================
   ALGORITMICA - MOCK DATABASE COORDINATOR & FIREBASE MIGRATION KIT
   ========================================================================== */

const DB_KEY = "algoritmica_database_state";

// 1. DEFAULT CLASSROOM DATA
// Populates classes and students on first load to simulate a complete school portal!
const DEFAULT_DB_STATE = {
  activeUserId: "alex",
  activeClassId: "class_1",
  classes: {
    "class_1": {
      id: "class_1",
      name: "Grade 8 Computer Science (Alpha)",
      students: ["alex", "maya", "liam", "sophia"]
    },
    "class_2": {
      id: "class_2",
      name: "Grade 8 Computing (Beta)",
      students: []
    }
  },
  students: {
    "alex": {
      id: "alex",
      name: "Alex Rivera",
      avatar: "AR",
      progress: {
        "l1_1": { completed: true, type: "quiz", score: 100, timestamp: "2026-05-22T14:30:00Z" }
      },
      codeSubmissions: {},
      activityLog: [
        { type: "quiz", lessonId: "l1_1", text: "completed the 'Decomposition' quiz with 100% accuracy", timestamp: "2026-05-22T14:30:00Z" }
      ]
    },
    "maya": {
      id: "maya",
      name: "Maya Lin",
      avatar: "ML",
      progress: {
        "l1_1": { completed: true, type: "quiz", score: 100, timestamp: "2026-05-21T09:15:00Z" },
        "l1_2": { completed: true, type: "quiz", score: 100, timestamp: "2026-05-21T09:40:00Z" },
        "l2_2": { completed: true, type: "workspace", score: 100, timestamp: "2026-05-22T11:05:00Z" }
      },
      codeSubmissions: {
        "l2_2": {
          code: `// Declare variable and check condition\nDECLARE age : INTEGER\nINPUT age\n\nIF age >= 18 THEN\n  OUTPUT "Adult"\nELSE\n  OUTPUT "Minor"\nENDIF`,
          timestamp: "2026-05-22T11:05:00Z",
          passed: true
        }
      },
      activityLog: [
        { type: "workspace", lessonId: "l2_2", text: "successfully solved the pseudocode challenge 'Sequence & Selection'", timestamp: "2026-05-22T11:05:00Z" },
        { type: "quiz", lessonId: "l1_2", text: "completed the 'Abstraction & Pattern' quiz with 100% accuracy", timestamp: "2026-05-21T09:40:00Z" },
        { type: "quiz", lessonId: "l1_1", text: "completed the 'Decomposition' quiz with 100% accuracy", timestamp: "2026-05-21T09:15:00Z" }
      ]
    },
    "liam": {
      id: "liam",
      name: "Liam O'Connor",
      avatar: "LO",
      progress: {
        "l1_1": { completed: true, type: "quiz", score: 66, timestamp: "2026-05-22T16:22:00Z" }
      },
      codeSubmissions: {},
      activityLog: [
        { type: "quiz", lessonId: "l1_1", text: "completed the 'Decomposition' quiz with 66% accuracy", timestamp: "2026-05-22T16:22:00Z" }
      ]
    },
    "sophia": {
      id: "sophia",
      name: "Sophia Martinez",
      avatar: "SM",
      progress: {},
      codeSubmissions: {},
      activityLog: [
        { type: "system", text: "joined the Algoritmica class", timestamp: "2026-05-20T10:00:00Z" }
      ]
    }
  }
};

// 2. CONTROLLER FUNCTIONS (INTERFACE FOR THE FRONTEND)

function getDatabaseState() {
  const data = localStorage.getItem(DB_KEY);
  if (!data) {
    localStorage.setItem(DB_KEY, JSON.stringify(DEFAULT_DB_STATE));
    return DEFAULT_DB_STATE;
  }
  return JSON.parse(data);
}

function saveDatabaseState(state) {
  localStorage.setItem(DB_KEY, JSON.stringify(state));
}

const db = {
  // A. USER AUTH HOOKS
  getCurrentUserId() {
    return getDatabaseState().activeUserId;
  },

  setCurrentUser(userId) {
    const state = getDatabaseState();
    if (state.students[userId]) {
      state.activeUserId = userId;
      saveDatabaseState(state);
      return true;
    }
    return false;
  },

  getCurrentUser() {
    const state = getDatabaseState();
    return state.students[state.activeUserId] || state.students["alex"];
  },

  // B. LMS CLASSES ENGINE
  getActiveClassId() {
    return getDatabaseState().activeClassId || "class_1";
  },

  setActiveClass(classId) {
    const state = getDatabaseState();
    if (state.classes[classId]) {
      state.activeClassId = classId;
      saveDatabaseState(state);
      return true;
    }
    return false;
  },

  getAllClasses() {
    return Object.values(getDatabaseState().classes);
  },

  createClass(className) {
    const state = getDatabaseState();
    const classId = "class_" + Date.now();
    
    state.classes[classId] = {
      id: classId,
      name: className,
      students: []
    };
    
    state.activeClassId = classId; // auto-switch
    saveDatabaseState(state);
    return classId;
  },

  // C. STUDENTS ENGINE
  getStudentsInClass(classId) {
    const state = getDatabaseState();
    const targetClass = state.classes[classId || state.activeClassId];
    if (!targetClass) return [];
    
    return targetClass.students.map(id => state.students[id]).filter(Boolean);
  },

  getAllStudents() {
    // Returns students inside the CURRENTLY ACTIVE class
    const state = getDatabaseState();
    return this.getStudentsInClass(state.activeClassId);
  },

  registerStudent(name) {
    const state = getDatabaseState();
    const studentId = "student_" + Date.now();
    
    // Init initials
    const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    
    // 1. Create Profile
    state.students[studentId] = {
      id: studentId,
      name: name,
      avatar: initials || "ST",
      progress: {},
      codeSubmissions: {},
      activityLog: [
        { type: "system", text: "created their student account on Algoritmica", timestamp: new Date().toISOString() }
      ]
    };
    
    // 2. Append to current selected class
    const activeClass = state.classes[state.activeClassId];
    if (activeClass) {
      activeClass.students.push(studentId);
      state.students[studentId].activityLog.push({
        type: "system", 
        text: `joined class '${activeClass.name}'`, 
        timestamp: new Date().toISOString()
      });
    }
    
    // 3. Auto Login as new student
    state.activeUserId = studentId;
    
    saveDatabaseState(state);
    return studentId;
  },

  addStudentToClass(name, classId) {
    const state = getDatabaseState();
    const studentId = "student_" + Date.now();
    const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

    // Create profile
    state.students[studentId] = {
      id: studentId,
      name: name,
      avatar: initials || "ST",
      progress: {},
      codeSubmissions: {},
      activityLog: [
        { type: "system", text: "registered by teacher and enrolled in class", timestamp: new Date().toISOString() }
      ]
    };

    // Add to class roster
    const targetClass = state.classes[classId];
    if (targetClass) {
      targetClass.students.push(studentId);
    }

    saveDatabaseState(state);
    return studentId;
  },

  // D. SUBMISSIONS HOOKS
  submitQuizResult(lessonId, score, answers) {
    const state = getDatabaseState();
    const userId = state.activeUserId;
    const student = state.students[userId];

    if (student) {
      const isCompleted = true;
      const timestamp = new Date().toISOString();
      
      // Update progress map
      student.progress[lessonId] = {
        completed: isCompleted,
        type: "quiz",
        score: score,
        timestamp: timestamp
      };

      // Add to student activity log
      const quizName = lessonId === "l1_1" ? "Decomposition" : "Abstraction & Pattern";
      student.activityLog.unshift({
        type: "quiz",
        lessonId: lessonId,
        text: `completed the '${quizName}' quiz with ${score}% accuracy`,
        timestamp: timestamp
      });

      saveDatabaseState(state);
    }
  },

  submitCodeChallenge(lessonId, code, passed) {
    const state = getDatabaseState();
    const userId = state.activeUserId;
    const student = state.students[userId];

    if (student) {
      const timestamp = new Date().toISOString();

      // Update code submissions
      student.codeSubmissions[lessonId] = {
        code: code,
        timestamp: timestamp,
        passed: passed
      };

      if (passed) {
        student.progress[lessonId] = {
          completed: true,
          type: "workspace",
          score: 100,
          timestamp: timestamp
        };

        // Determine challenge title
        let challengeName = "";
        if (lessonId === "l2_1") challengeName = "Data Types & Operators";
        else if (lessonId === "l2_2") challengeName = "Sequence & Selection";
        else if (lessonId === "l2_3") challengeName = "Loops & Iteration";
        else if (lessonId === "l2_4") challengeName = "Standard Methods (Totals & Averages)";
        else if (lessonId === "l2_5") challengeName = "Standard Methods (Max, Min & Search)";
        else if (lessonId === "l3_1") challengeName = "Python Data Types";
        else if (lessonId === "l3_2") challengeName = "Python Selection & Iteration";
        else if (lessonId === "l3_3") challengeName = "Python Standard Methods";

        // Add to log
        student.activityLog.unshift({
          type: "workspace",
          lessonId: lessonId,
          text: `successfully solved the challenge '${challengeName}'`,
          timestamp: timestamp
        });
      }

      saveDatabaseState(state);
    }
  },

  resetDatabase() {
    localStorage.removeItem(DB_KEY);
    return getDatabaseState();
  }
};

/* ==========================================================================
   3. FIREBASE PRODUCTION INTEGRATION KIT (MIGRATION GUIDE)
   ==========================================================================
   
   If you want to transition this application to a real production database using
   Google Firebase, simply do the following steps:

   STEP 1: Add the Firebase SDK inside index.html header:
   --------------------------------------------------------------------------
   <script type="module">
     import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
     import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
     import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

     // Configure Firebase Settings
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_PROJECT.firebaseapp.com",
       projectId: "YOUR_PROJECT",
       storageBucket: "YOUR_PROJECT.appspot.com",
       messagingSenderId: "YOUR_SENDER_ID",
       appId: "YOUR_APP_ID"
     };

     // Initialize Firebase
     const app = initializeApp(firebaseConfig);
     const db = getFirestore(app);
     const auth = getAuth(app);
   </script>

   STEP 2: Swap the LocalStorage DB driver functions with Firestore calls:
   --------------------------------------------------------------------------
   
   // A. To save a Student's Quiz Score in Firebase:
   async function firebaseSubmitQuizResult(userId, lessonId, score) {
     const studentDocRef = doc(db, "students", userId);
     const timestamp = new Date().toISOString();
     
     await updateDoc(studentDocRef, {
       [\`progress.\${lessonId}\`]: {
         completed: true,
         type: "quiz",
         score: score,
         timestamp: timestamp
       },
       activityLog: arrayUnion({
         type: "quiz",
         lessonId: lessonId,
         text: \`completed the quiz with \${score}% accuracy\`,
         timestamp: timestamp
       })
     });
   }

   // B. To save a student's code submission:
   async function firebaseSubmitCodeChallenge(userId, lessonId, code, passed) {
     const studentDocRef = doc(db, "students", userId);
     const timestamp = new Date().toISOString();
     
     const updates = {
       [\`codeSubmissions.\${lessonId}\`]: {
         code: code,
         timestamp: timestamp,
         passed: passed
       }
     };

     if (passed) {
       updates[\`progress.\${lessonId}\`] = {
         completed: true,
         type: "workspace",
         score: 100,
         timestamp: timestamp
       };
       updates.activityLog = arrayUnion({
         type: "workspace",
         lessonId: lessonId,
         text: \`successfully solved the code challenge\`,
         timestamp: timestamp
       });
     }
     
     await updateDoc(studentDocRef, updates);
   }

   // C. To retrieve all students for the Teacher Dashboard:
   import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
   
   async function firebaseGetAllStudents() {
     const querySnapshot = await getDocs(collection(db, "students"));
     const students = [];
     querySnapshot.forEach((doc) => {
       students.push({ id: doc.id, ...doc.data() });
     });
     return students;
   }
   ========================================================================== */
