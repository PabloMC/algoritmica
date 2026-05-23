/* ==========================================================================
   ALGORITMICA - CURRICULUM DATABASE
   ========================================================================== */

const CURRICULUM = {
  levels: [
    {
      id: "level1",
      title: "Level 1: Computational Thinking & Algorithms",
      grade: "Grade 8",
      description: "Understand the foundation of computer science. Learn problem-solving, build step-by-step logic in Pseudocode, and translate algorithms to working Python programs.",
      status: "active",
      modules: [
        {
          id: "m1",
          title: "Module 1: Computational Thinking Foundations",
          description: "Discover the 4 key pillars used by computer scientists to break down and solve complex problems.",
          lessons: [
            {
              id: "l1_1",
              title: "Decomposition: Breaking It Down",
              type: "quiz",
              duration: "10 min",
              badge: "Theory + Quiz",
              description: "Learn how to divide massive, complicated tasks into tiny, easily solvable sub-problems.",
              content: `
                <h2>Decomposition</h2>
                <p>Imagine you want to build a smartphone app like Instagram. If you try to write the entire app all at once, you will quickly become overwhelmed. Where do you start? How do you manage the database, the user interface, the camera integration, and notifications?</p>
                <p>This is where <strong>Decomposition</strong> comes in. Decomposition is the process of breaking a complex problem down into smaller, more manageable sub-problems.</p>
                
                <h3>Why Decomposition Matters</h3>
                <ul>
                  <li><strong>Makes tasks manageable:</strong> Solving five small, simple problems is much easier than solving one giant, scary problem.</li>
                  <li><strong>Enables team collaboration:</strong> Different software developers can work on different sub-problems simultaneously (e.g., one person designs the login screen, another works on photo filters).</li>
                  <li><strong>Speeds up debugging:</strong> Finding an error in a tiny function is significantly faster than searching through millions of lines of code.</li>
                </ul>

                <blockquote>
                  <strong>Real World Example: Baking a Chocolate Cake</strong><br>
                  Instead of looking at the cake as a single object, we decompose the task:
                  <ol>
                    <li>Gather the raw ingredients (flour, cocoa, eggs).</li>
                    <li>Mix wet and dry ingredients in separate bowls.</li>
                    <li>Preheat the oven and grease the cake pan.</li>
                    <li>Bake for 35 minutes at 180°C.</li>
                    <li>Prepare the chocolate frosting and decorate.</li>
                  </ol>
                </blockquote>

                <h3>Decomposition in Computer Science</h3>
                <p>When designing an algorithm (such as a search engine), we decompose it into sub-tasks: receiving the user query, cleaning the text query, searching the database index, ranking results by relevance, and drawing the web page interface.</p>
              `,
              quiz: [
                {
                  question: "What is the primary definition of Decomposition in computer science?",
                  options: [
                    "Translating a Python program directly into binary computer code.",
                    "Breaking a complex problem down into smaller, more manageable sub-problems.",
                    "Deleting old files from a hard drive to free up space.",
                    "Repeating a set of instructions until a specific condition is met."
                  ],
                  answer: 1,
                  explanation: "Decomposition literally means 'de-composing' or breaking down a large problem into smaller parts, making it easier to solve and understand."
                },
                {
                  question: "Which of the following is NOT an advantage of decomposition?",
                  options: [
                    "It allows different programmers to work on separate modules at the same time.",
                    "It makes code much easier to test and debug.",
                    "It guarantees that a program will run twice as fast.",
                    "It makes the overall design process less overwhelming."
                  ],
                  answer: 2,
                  explanation: "Decomposition helps organize, write, and debug code, but it doesn't automatically guarantee CPU execution speed increases."
                },
                {
                  question: "If you were decomposing the task of building a 'Mario Platformer Game', which sub-problem belongs to the physics module?",
                  options: [
                    "Saving the player's high scores to a high-score database.",
                    "Playing a victory sound effect when Mario grabs a star.",
                    "Calculating Mario's speed, jump height, and gravity when falling.",
                    "Drawing the main menu button elements on screen."
                  ],
                  answer: 2,
                  explanation: "Calculating jumps, gravity, and speed are physics calculations, representing a distinct decomposed module of the game."
                }
              ]
            },
            {
              id: "l1_2",
              title: "Abstraction & Pattern Recognition",
              type: "quiz",
              duration: "15 min",
              badge: "Theory + Quiz",
              description: "Filter out irrelevant details and identify similarities to build reusable models.",
              content: `
                <h2>Pattern Recognition & Abstraction</h2>
                <p>Once we have decomposed a large problem, we use two more computational thinking pillars to solve those sub-problems efficiently: <strong>Pattern Recognition</strong> and <strong>Abstraction</strong>.</p>
                
                <h3>1. Pattern Recognition</h3>
                <p>Pattern recognition is the process of looking for similarities, trends, or shared characteristics within or among problems. If we find a pattern we have solved before, we can reuse that solution!</p>
                <p>For example, if you are building characters in a game, you will notice that both enemies and friendly NPCs have X/Y coordinates, health bars, and movement actions. Instead of writing separate code for every character, we recognize the pattern and write a single 'character structure'.</p>

                <h3>2. Abstraction</h3>
                <p>Abstraction is the art of <strong>filtering out unnecessary details</strong> to focus strictly on the information that is essential to solving the problem. It is about hiding complexity.</p>
                
                <blockquote>
                  <strong>Classic Example: The Subway Map</strong><br>
                  A subway map is a perfect abstraction. It does not show actual street widths, trees, buildings, or geographical curvature. It only shows transit lines, station sequences, and transfer hubs. If it included every tree and house, it would be impossible to read! The designers filtered out the 'noise' to focus only on what you need: how to get from Station A to Station B.
                </blockquote>

                <h3>Why is Abstraction Crucial?</h3>
                <p>Computers have limited memory, and human minds have limited attention spans. Abstraction allows us to create general 'models' or templates of variables and processes, enabling us to write elegant, reusable, and clean code.</p>
              `,
              quiz: [
                {
                  question: "What is the main goal of Abstraction?",
                  options: [
                    "To hide the detailed implementation and focus only on the essential features.",
                    "To find visual pictures and icons to insert into a website design.",
                    "To duplicate code blocks multiple times to ensure the system is redundant.",
                    "To write out every possible detail of a system so the computer knows everything."
                  ],
                  answer: 0,
                  explanation: "Abstraction is about simplification—removing unnecessary details to focus on what matters."
                },
                {
                  question: "A transit map shows line connections but omits exact physical street shapes. This is an example of:",
                  options: [
                    "Decomposition",
                    "Abstraction",
                    "Selection",
                    "Compilation"
                  ],
                  answer: 1,
                  explanation: "It is Abstraction because it removes geographical details that are irrelevant to transit navigation."
                },
                {
                  question: "Recognizing that searching for a student record by ID and searching for a product by barcode use the same basic search logic is an example of:",
                  options: [
                    "Decomposition",
                    "Iteration",
                    "Pattern Recognition",
                    "Logic Gate mapping"
                  ],
                  answer: 2,
                  explanation: "Identifying that two different tasks share the same core underlying mechanism is Pattern Recognition, allowing you to reuse search algorithms."
                }
              ]
            }
          ]
        },
        {
          id: "m2",
          title: "Module 2: Algorithmic Logic & Pseudocode",
          description: "Step away from specific coding syntax and master structured algorithmic thinking using formal IGCSE pseudocode.",
          lessons: [
            {
              id: "l2_1",
              title: "Data Types and Operators",
              type: "workspace",
              duration: "20 min",
              badge: "Code Workspace",
              description: "Declare variables and assign values using the five standard IGCSE data types.",
              content: `
                <h2>Data Types and Operators in Pseudocode</h2>
                <p>An **algorithm** is a sequence of precise instructions. When designing algorithms, we store information in **Variables**. Every variable has a specific **Data Type** that dictates what kind of data it can hold.</p>

                <h3>The Five Standard IGCSE Data Types</h3>
                <ul>
                  <li><code>INTEGER</code>: Positive or negative whole numbers (e.g., <code>15</code>, <code>0</code>, <code>-325</code>).</li>
                  <li><code>REAL</code>: Positive or negative numbers containing decimal points (e.g., <code>3.14</code>, <code>-18.9</code>).</li>
                  <li><code>CHAR</code>: A single character (e.g., <code>'A'</code>, <code>'?'</code>, <code>'9'</code>).</li>
                  <li><code>STRING</code>: A sequence of zero or more characters (e.g., <code>"Hello World"</code>, <code>"Sam"</code>).</li>
                  <li><code>BOOLEAN</code>: Logical values (<code>TRUE</code> or <code>FALSE</code>).</li>
                </ul>

                <h3>1. Variable Declaration</h3>
                <p>In formal IGCSE Pseudocode, we must declare a variable's data type before using it: </p>
                <div class="code-block">
DECLARE points : INTEGER
DECLARE playerName : STRING
DECLARE isWinner : BOOLEAN
                </div>

                <h3>2. Assignment Operator (<-)</h3>
                <p>We assign values using a left-pointing arrow <code>&lt;-</code>. Do not use a single equals sign (<code>=</code>) in pseudocode assignment!</p>
                <div class="code-block">
playerName <- "Sam"
points <- 150
isWinner <- TRUE
                </div>

                <h3>3. Basic Input & Output</h3>
                <ul>
                  <li><code>INPUT variable</code>: Fetches user input and stores it.</li>
                  <li><code>OUTPUT expression</code>: Displays values or text on screen.</li>
                </ul>
              `,
              workspace: {
                language: "pseudocode",
                challenge: "Write a pseudocode algorithm that declares an INTEGER variable named `points`, a STRING variable named `playerName`, assigns `\"Sam\"` to `playerName` and `100` to `points`. Finally, print the variable values using a single OUTPUT command in the exact format: `OUTPUT playerName, \" scored \", points, \" points\"`",
                template: `// 1. Declare playerName and points below:
DECLARE playerName : STRING
DECLARE points : INTEGER

// 2. Assign "Sam" and 100 below:
playerName <- "Sam"


// 3. Write your OUTPUT statement below:
`,
                verifyFn: `
                  const code = studentCode.trim();
                  
                  let hasDeclarePlayer = /DECLARE\\s+playerName\\s*:\\s*STRING/i.test(code);
                  let hasDeclarePoints = /DECLARE\\s+points\\s*:\\s*INTEGER/i.test(code);
                  let hasAssignPlayer = /playerName\\s*<-\\s*["']Sam["']/i.test(code);
                  let hasAssignPoints = /points\\s*<-\\s*100/.test(code);
                  let hasOutput = /OUTPUT\\s+playerName/i.test(code) && code.toLowerCase().includes("scored") && code.toLowerCase().includes("points");
                  
                  let terminalLogs = [];
                  terminalLogs.push({type: 'system', text: '> Initializing IGCSE data type verification...'});
                  
                  if (!hasDeclarePlayer) {
                    terminalLogs.push({type: 'error', text: 'Syntax Error: Missing declaration "DECLARE playerName : STRING".'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  if (!hasDeclarePoints) {
                    terminalLogs.push({type: 'error', text: 'Syntax Error: Missing declaration "DECLARE points : INTEGER".'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  if (!hasAssignPlayer) {
                    terminalLogs.push({type: 'error', text: 'Execution Error: Make sure to assign "Sam" to playerName using "<-".'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  if (!hasAssignPoints) {
                    terminalLogs.push({type: 'error', text: 'Execution Error: Make sure to assign 100 to points using "<-".'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  if (!hasOutput) {
                    terminalLogs.push({type: 'error', text: 'Logic Error: Write a correct OUTPUT statement incorporating playerName, " scored ", points, " points".'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  terminalLogs.push({type: 'success', text: 'Stdout: Sam scored 100 points'});
                  terminalLogs.push({type: 'success', text: 'All test cases passed! Variables and types declared successfully.'});
                  return { success: true, logs: terminalLogs };
                `
              }
            },
            {
              id: "l2_2",
              title: "Sequence and Selection (IF-THEN-ELSE)",
              type: "workspace",
              duration: "25 min",
              badge: "Code Workspace",
              description: "Build branching logical decisions in Pseudocode using relational checks.",
              content: `
                <h2>Selection (IF-THEN-ELSE)</h2>
                <p>Algorithms execute in a <strong>Sequence</strong> (line-by-line from top to bottom) unless we direct them otherwise. <strong>Selection</strong> allows our algorithm to take different paths depending on a condition.</p>
                
                <h3>The IF Statement Syntax</h3>
                <p>In IGCSE Pseudocode, selection is represented with <code>IF</code>, <code>THEN</code>, <code>ELSE</code>, and <code>ENDIF</code>.</p>

                <div class="code-block">
DECLARE temperature : INTEGER
INPUT temperature

IF temperature > 30 THEN
  OUTPUT "It is hot"
ELSE
  OUTPUT "It is pleasant"
ENDIF
                </div>

                <h3>Boolean Operators</h3>
                <p>Boolean operators compare or combine values and return a logical <code>TRUE</code> or <code>FALSE</code>. In IGCSE Pseudocode, these operators include both comparison and logical gates:</p>
                <ul>
                  <li><code>=</code> : Equal to</li>
                  <li><code><></code> : Not equal to</li>
                  <li><code>></code> : Greater than</li>
                  <li><code><</code> : Less than</li>
                  <li><code>>=</code> : Greater than or equal to</li>
                  <li><code><=</code> : Less than or equal to</li>
                  <li><code>AND</code> : Returns TRUE only if both inputs are TRUE</li>
                  <li><code>OR</code> : Returns TRUE if at least one input is TRUE</li>
                  <li><code>NOT</code> : Reverses the logical state (NOT TRUE = FALSE)</li>
                </ul>
              `,
              workspace: {
                language: "pseudocode",
                challenge: "Write a selection algorithm. Read an integer input into a declared variable `age`. If `age` is greater than or equal to 18, output `\"Adult\"`. Otherwise, output `\"Minor\"`. Remember to close the statement with ENDIF.",
                template: `DECLARE age : INTEGER
INPUT age

// Write your IF-THEN-ELSE block below:

`,
                verifyFn: `
                  const code = studentCode.toUpperCase().trim();
                  let hasIf = code.includes('IF') && code.includes('THEN');
                  let hasElse = code.includes('ELSE');
                  let hasEndIf = code.includes('ENDIF') || code.includes('END IF');
                  let hasAgeCheck = code.includes('AGE') && (code.includes('>= 18') || code.includes('18 <=') || code.includes('> 17'));
                  let hasOutput1 = code.includes('ADULT');
                  let hasOutput2 = code.includes('MINOR');
                  
                  let terminalLogs = [];
                  terminalLogs.push({type: 'system', text: '> Starting selection test suite...'});
                  
                  if (!hasIf) {
                    terminalLogs.push({type: 'error', text: 'Syntax Error: You must open a selection block using "IF <condition> THEN".'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  if (!hasAgeCheck) {
                    terminalLogs.push({type: 'error', text: 'Logic Error: Condition incorrect. Check if age is greater than or equal to 18 using "age >= 18".'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  if (!hasElse) {
                    terminalLogs.push({type: 'error', text: 'Logic Error: Missing "ELSE" block to handle when age is less than 18.'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  if (!hasEndIf) {
                    terminalLogs.push({type: 'error', text: 'Syntax Error: Remember to close your selection structure using "ENDIF".'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  if (!hasOutput1 || !hasOutput2) {
                    terminalLogs.push({type: 'error', text: 'Execution Error: Print exactly "Adult" in the IF branch, and "Minor" in the ELSE branch.'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  terminalLogs.push({type: 'info', text: 'Running test case 1 (age = 22)...'});
                  terminalLogs.push({type: 'success', text: '-> Output: "Adult" [OK]'});
                  terminalLogs.push({type: 'info', text: 'Running test case 2 (age = 12)...'});
                  terminalLogs.push({type: 'success', text: '-> Output: "Minor" [OK]'});
                  terminalLogs.push({type: 'success', text: 'Success! Branch selection logic behaves correctly.'});
                  return { success: true, logs: terminalLogs };
                `
              }
            },
            {
              id: "l2_3",
              title: "Loops & Iteration (FOR, WHILE, REPEAT)",
              type: "workspace",
              duration: "25 min",
              badge: "Code Workspace",
              description: "Build repetitive loops in Pseudocode to automate algorithms.",
              content: `
                <h2>Loops & Iteration in Pseudocode</h2>
                <p>Computers are exceptional at executing repetitive actions without error. In computer science, repeating instructions is called <strong>Iteration</strong> or <strong>Looping</strong>.</p>
                <p>In IGCSE Computer Science, you must know and apply **three different types of loops**:</p>

                <h3>1. Count-Controlled Loop (FOR ... TO ... NEXT)</h3>
                <p>Used when the number of repetitions is **known beforehand** (fixed iteration).</p>
                <div class="code-block">
DECLARE count : INTEGER
FOR count <- 1 TO 5
  OUTPUT "Hello"
NEXT count
                </div>

                <h3>2. Pre-Condition Loop (WHILE ... DO ... ENDWHILE)</h3>
                <p>Used when the loop may repeat **zero or more times**. The loop condition is tested **at the top** before entering the loop.</p>
                <div class="code-block">
DECLARE index : INTEGER
index <- 1
WHILE index <= 5 DO
  OUTPUT index
  index <- index + 1
ENDWHILE
                </div>

                <h3>3. Post-Condition Loop (REPEAT ... UNTIL)</h3>
                <p>Used when the loop must execute **at least once**. The loop condition is tested **at the bottom** after executing the block.</p>
                <div class="code-block">
DECLARE attempt : INTEGER
attempt <- 1
REPEAT
  OUTPUT "Trying..."
  attempt <- attempt + 1
UNTIL attempt > 3
                </div>
              `,
              workspace: {
                language: "pseudocode",
                challenge: "Write a pseudocode loop. Declare an INTEGER variable named `count`. Implement a count-controlled `FOR count <- 1 TO 5` loop. Inside the loop, print the variable `count` using `OUTPUT count`. Finish the loop using `NEXT count`.",
                template: `DECLARE count : INTEGER

// Write your FOR loop below to print numbers 1 to 5:

`,
                verifyFn: `
                  const code = studentCode.toUpperCase().trim();
                  let hasDeclare = code.includes('DECLARE COUNT : INTEGER') || code.includes('DECLARE COUNT:INTEGER');
                  let hasFor = code.includes('FOR COUNT <- 1 TO 5') || code.includes('FOR COUNT<-1 TO 5') || code.includes('FOR COUNT <- 1  TO 5');
                  let hasOutput = code.includes('OUTPUT COUNT');
                  let hasNext = code.includes('NEXT COUNT') || code.includes('NEXT  COUNT') || code.includes('ENDFOR') || code.includes('END FOR') || code.includes('NEXT');
                  
                  let terminalLogs = [];
                  terminalLogs.push({type: 'system', text: '> Initializing loop validation runner...'});
                  
                  if (!hasDeclare) {
                    terminalLogs.push({type: 'error', text: 'Syntax Error: Declare the counter variable: "DECLARE count : INTEGER".'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  if (!hasFor) {
                    terminalLogs.push({type: 'error', text: 'Syntax Error: Initiate the loop from 1 to 5: "FOR count <- 1 TO 5".'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  if (!hasOutput) {
                    terminalLogs.push({type: 'error', text: 'Logic Error: Print the active count inside the loop: "OUTPUT count".'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  if (!hasNext) {
                    terminalLogs.push({type: 'error', text: 'Syntax Error: Close the FOR structure with "NEXT count".'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  terminalLogs.push({type: 'success', text: '1\\n2\\n3\\n4\\n5'});
                  terminalLogs.push({type: 'success', text: 'Loop test successful! Clean pseudocode iteration achieved.'});
                  return { success: true, logs: terminalLogs };
                `
              }
            },
            {
              id: "l2_4",
              title: "Standard Methods: Totals & Averages",
              type: "workspace",
              duration: "25 min",
              badge: "Code Workspace",
              description: "Learn standard algorithms to calculate running sums and averages in loops.",
              content: `
                <h2>Standard Methods of Solution: Totals and Averages</h2>
                <p>In your IGCSE exams, you will be expected to write algorithms to solve standard, recurring tasks. Two of the most common standard methods are: </p>
                
                <h3>1. Running Totals (Summing)</h3>
                <p>To calculate a running total, we initialize an accumulator variable (usually <code>total</code> or <code>sum</code>) to <code>0</code> before our loop. Inside the loop, we input a number and add it to our accumulator.</p>
                <div class="code-block">
DECLARE total : INTEGER
DECLARE num : INTEGER
total <- 0

FOR count <- 1 TO 3
  INPUT num
  total <- total + num
NEXT count
                </div>

                <h3>2. Calculating Averages</h3>
                <p>To find the average, we divide our final total by the total number of items processed. The average variable is declared as a <code>REAL</code> type since division often yields decimal values.</p>
                <div class="code-block">
DECLARE average : REAL
average <- total / 3
OUTPUT average
                </div>
              `,
              workspace: {
                language: "pseudocode",
                challenge: "Write a pseudocode algorithm that calculates the sum and average of three input numbers. Initialize `total` to `0`, use a `FOR count <- 1 TO 3` loop to INPUT the numbers into `num` and add them to `total`. After the loop, calculate the average in a REAL variable named `average` and print it.",
                template: `DECLARE total : INTEGER
DECLARE num : INTEGER
DECLARE count : INTEGER
DECLARE average : REAL

total <- 0

// Write your FOR loop and average calculation below:
`,
                verifyFn: `
                  const code = studentCode.toUpperCase().trim();
                  
                  let hasForLoop = code.includes('FOR') && code.includes('TO 3') && (code.includes('NEXT') || code.includes('END FOR') || code.includes('ENDFOR'));
                  let hasAccumulator = code.includes('TOTAL <- TOTAL + NUM') || code.includes('TOTAL <- NUM + TOTAL') || code.includes('TOTAL<-TOTAL+NUM');
                  let hasAverage = code.includes('AVERAGE <- TOTAL / 3') || code.includes('AVERAGE<-TOTAL/3');
                  let hasOutput = code.includes('OUTPUT AVERAGE');
                  
                  let terminalLogs = [];
                  terminalLogs.push({type: 'system', text: '> Starting Totals & Averages test suite...'});
                  
                  if (!hasForLoop) {
                    terminalLogs.push({type: 'error', text: 'Syntax Error: Write a loop repeating 3 times ("FOR count <- 1 TO 3" finished with "NEXT count").'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  if (!hasAccumulator) {
                    terminalLogs.push({type: 'error', text: 'Logic Error: Accumulate inputs inside the loop using "total <- total + num".'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  if (!hasAverage) {
                    terminalLogs.push({type: 'error', text: 'Logic Error: Calculate the average by dividing total by 3: "average <- total / 3".'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  if (!hasOutput) {
                    terminalLogs.push({type: 'error', text: 'Execution Error: Output the calculated average using "OUTPUT average".'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  terminalLogs.push({type: 'info', text: 'Simulating inputs: 10, 15, 20...'});
                  terminalLogs.push({type: 'success', text: '-> Calculated Total: 45 [OK]'});
                  terminalLogs.push({type: 'success', text: '-> Calculated Average: 15.0 [OK]'});
                  terminalLogs.push({type: 'success', text: 'Great! You have mastered the running totals and averages algorithm.'});
                  return { success: true, logs: terminalLogs };
                `
              }
            },
            {
              id: "l2_5",
              title: "Standard Methods: Finding Max, Min & Counting",
              type: "workspace",
              duration: "25 min",
              badge: "Code Workspace",
              description: "Build logic to find the largest/smallest values in an array and count occurrences.",
              content: `
                <h2>Standard Methods: Max, Min, and Counting</h2>
                <p>Other vital standard algorithms you must memorize for your exams are finding extreme values (Maximum and Minimum) and counting specific records.</p>
                
                <h3>1. Finding Maximum and Minimum</h3>
                <p>To find the maximum, we initialize a variable <code>maxVal</code> to an extremely small number. As we loop and input values, we compare each input to <code>maxVal</code>. If the input is larger, we update <code>maxVal</code>.</p>
                <div class="code-block">
DECLARE maxVal : INTEGER
maxVal <- -9999  // initialize to a very small number

FOR i <- 1 TO 3
  INPUT num
  IF num > maxVal THEN
    maxVal <- num
  ENDIF
NEXT i
                </div>

                <h3>2. Counting Occurrences</h3>
                <p>Counting counts how many times a condition is true. We initialize a counter to <code>0</code>. If our test condition passes (e.g. <code>mark >= 50</code>), we increment the counter: <code>passCount <- passCount + 1</code>.</p>
              `,
              workspace: {
                language: "pseudocode",
                challenge: "Write an algorithm to find the largest of three input numbers. Initialize `maxVal` to `-9999`. Loop 3 times to input values into `num`. If `num` is greater than `maxVal`, update `maxVal <- num`. Output the final `maxVal` at the end.",
                template: `DECLARE maxVal : INTEGER
DECLARE num : INTEGER
DECLARE i : INTEGER

maxVal <- -9999

// Write your loop logic to find the maximum below:
`,
                verifyFn: `
                  const code = studentCode.toUpperCase().trim();
                  
                  let hasLoop = code.includes('FOR') && code.includes('TO 3') && (code.includes('NEXT') || code.includes('END FOR') || code.includes('ENDFOR'));
                  let hasInput = code.includes('INPUT NUM');
                  let hasComparison = code.includes('NUM > MAXVAL') || code.includes('MAXVAL < NUM');
                  let hasAssignment = code.includes('MAXVAL <- NUM') || code.includes('MAXVAL<-NUM');
                  let hasOutput = code.includes('OUTPUT MAXVAL');
                  
                  let terminalLogs = [];
                  terminalLogs.push({type: 'system', text: '> Executing Extreme Value evaluation suite...'});
                  
                  if (!hasLoop) {
                    terminalLogs.push({type: 'error', text: 'Syntax Error: Create a loop that executes 3 times ("FOR i <- 1 TO 3").'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  if (!hasInput) {
                    terminalLogs.push({type: 'error', text: 'Execution Error: Remember to fetch user input inside the loop using "INPUT num".'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  if (!hasComparison) {
                    terminalLogs.push({type: 'error', text: 'Logic Error: Write a comparison IF statement checking if "num > maxVal".'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  if (!hasAssignment) {
                    terminalLogs.push({type: 'error', text: 'Logic Error: Update the maximum value inside the IF block using "maxVal <- num".'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  if (!hasOutput) {
                    terminalLogs.push({type: 'error', text: 'Execution Error: Output the final maximum value at the end of the script using "OUTPUT maxVal".'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  terminalLogs.push({type: 'info', text: 'Testing input stream: [15, 89, 42]...'});
                  terminalLogs.push({type: 'success', text: '-> Maximum detected: 89 [OK]'});
                  terminalLogs.push({type: 'success', text: 'Success! Max-finding standard algorithm validated.'});
                  return { success: true, logs: terminalLogs };
                `
              }
            }
          ]
        },
        {
          id: "m3",
          title: "Module 3: Transitioning to Python Programming",
          description: "Apply your computational thinking skills directly to writing executable Python code.",
          lessons: [
            {
              id: "l3_1",
              title: "Python Data Types and Casting",
              type: "workspace",
              duration: "20 min",
              badge: "Python IDE",
              description: "Declare variables and perform explicit type casting in Python.",
              content: `
                <h2>Python Data Types and Casting</h2>
                <p>Welcome to <strong>Python</strong>! Python is a dynamic programming language. You do not need to explicitly declare data types like in Pseudocode. However, Python still keeps track of types behind the scenes:</p>
                
                <h3>Python Equivalent Types</h3>
                <ul>
                  <li><code>int</code>: Whole numbers (e.g. <code>x = 10</code>)</li>
                  <li><code>float</code>: Decimal numbers (e.g. <code>y = 3.14</code>)</li>
                  <li><code>str</code>: Text strings (e.g. <code>name = "Sam"</code>)</li>
                  <li><code>bool</code>: Boolean states (e.g. <code>passed = True</code>)</li>
                </ul>

                <h3>Type Casting</h3>
                <p>In Python, the <code>input()</code> function ALWAYS returns data as a **string**. If you want to perform math calculations with user input, you must cast (convert) the string into an integer or float using <code>int()</code> or <code>float()</code>:</p>
                <div class="code-block">
user_input = input("Enter a number: ")
number = int(user_input)  # converts string to integer
double_it = number * 2
                </div>
              `,
              workspace: {
                language: "python",
                challenge: "Write Python code that takes a mock string variable named `input_str` (pre-defined as `\"15\"`), converts it to an integer, multiplies it by 2, saves it in a variable named `double_val`, and prints the result using `print(double_val)`.",
                template: `# Mock variable is defined
input_str = "15"

# Convert input_str, double it, and print double_val:
`,
                verifyFn: `
                  const code = studentCode.trim();
                  
                  let hasIntConversion = /int\\s*\\(\\s*input_str\\s*\\)/.test(code);
                  let hasDoubleVal = /double_val\\s*=/.test(code);
                  let hasMath = /double_val\\s*=\\s*(int\\s*\\(\\s*input_str\\s*\\)\\s*\\*\\s*2|2\\s*\\*\\s*int\\s*\\(\\s*input_str\\s*\\)|30)/.test(code);
                  let hasPrint = /print\\s*\\(\\s*double_val\\s*\\)/.test(code);
                  
                  let terminalLogs = [];
                  terminalLogs.push({type: 'system', text: '$ python main.py'});
                  
                  if (!hasIntConversion) {
                    terminalLogs.push({type: 'error', text: 'Type Error: You must convert the string "input_str" using the int() function.'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  if (!hasDoubleVal) {
                    terminalLogs.push({type: 'error', text: 'Syntax Error: Declare a variable named "double_val" to store the calculation.'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  if (!hasMath) {
                    terminalLogs.push({type: 'error', text: 'Logic Error: Store the doubled integer value inside "double_val".'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  if (!hasPrint) {
                    terminalLogs.push({type: 'error', text: 'Execution Error: Output the final result using print(double_val).'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  terminalLogs.push({type: 'success', text: '30'});
                  terminalLogs.push({type: 'success', text: 'Excellent! Casting logic applied perfectly.'});
                  return { success: true, logs: terminalLogs };
                `
              }
            },
            {
              id: "l3_2",
              title: "Python Selection & Iteration",
              type: "workspace",
              duration: "25 min",
              badge: "Python IDE",
              description: "Build loops and conditionals in Python incorporating strict indentation rules.",
              content: `
                <h2>Selection & Iteration in Python</h2>
                <p>Translating selection and loops from Pseudocode to Python is highly straightforward. The key difference is that Python does not use blocks ending in <code>ENDIF</code> or <code>NEXT</code>. Instead, it uses a colon (<code>:</code>) and **strict indentation**.</p>
                
                <h3>1. Selection (IF-ELSE)</h3>
                <div class="code-block">
if score >= 50:
    print("PASS")
else:
    print("FAIL")
                </div>

                <h3>2. Iteration (FOR loops)</h3>
                <p>The standard range loop starts at <code>0</code> by default, and excludes the upper limit. To loop from 1 to 5, we use <code>range(1, 6)</code>:</p>
                <div class="code-block">
for i in range(1, 6):
    print(i)
                </div>
              `,
              workspace: {
                language: "python",
                challenge: "Write a Python program that uses a `for` loop to iterate from `1` to `10` inclusive. Inside the loop, use an `if` statement to print only the EVEN numbers (where `i % 2 == 0`).",
                template: `# Write your loop below to print even numbers between 1 and 10:

`,
                verifyFn: `
                  const code = studentCode.trim();
                  
                  let hasFor = /for\\s+\\w+\\s+in\\s+range\\s*\\(/.test(code);
                  let hasCorrectRange = /range\\s*\\(\\s*1\\s*,\\s*11\\s*\\)/.test(code);
                  let hasIf = /if\\s+/.test(code) && /%\\s*2\\s*==\\s*0/.test(code);
                  let hasPrint = /print\\s*\\(\\s*\\w+\\s*\\)/.test(code);
                  
                  let terminalLogs = [];
                  terminalLogs.push({type: 'system', text: '$ python main.py'});
                  
                  if (!hasFor) {
                    terminalLogs.push({type: 'error', text: 'Syntax Error: Implement a "for" loop.'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  if (!hasCorrectRange) {
                    terminalLogs.push({type: 'error', text: 'Range Error: Use "range(1, 11)" to loop from 1 to 10 inclusive.'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  if (!hasIf) {
                    terminalLogs.push({type: 'error', text: 'Logic Error: Include an "if" statement check using modulo: "if i % 2 == 0:".'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  if (!hasPrint) {
                    terminalLogs.push({type: 'error', text: 'Execution Error: Call "print" inside the conditional block, making sure to indent it.'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  terminalLogs.push({type: 'success', text: '2\\n4\\n6\\n8\\n10'});
                  terminalLogs.push({type: 'success', text: 'Congratulations! Even-number loop selector ran successfully.'});
                  return { success: true, logs: terminalLogs };
                `
              }
            },
            {
              id: "l3_3",
              title: "Python Standard Methods: Totals",
              type: "workspace",
              duration: "25 min",
              badge: "Python IDE",
              description: "Translate the Totals and Averages algorithm into functional Python code.",
              content: `
                <h2>Translating Standard Methods to Python</h2>
                <p>Let's unite everything we have learned by writing the running totals and averages algorithm directly in Python.</p>
                <p>To accumulate inputs in Python:</p>
                <ol>
                  <li>Initialize <code>total = 0</code></li>
                  <li>Write a loop to process items.</li>
                  <li>In Python, we can shorthand accumulator statements using the addition assignment operator (<code>+=</code>): <code>total += num</code> which is equivalent to <code>total = total + num</code>.</li>
                  <li>Divide the total by the count: <code>average = total / count</code>.</li>
                </ol>
              `,
              workspace: {
                language: "python",
                challenge: "Translate our standard totals algorithm. We have a pre-defined list of inputs `inputs = [10, 20, 30]`. Initialize `total = 0`, write a `for` loop to iterate over the inputs list, adding each number to `total`. After the loop, calculate `average = total / 3` and print the average.",
                template: `inputs = [10, 20, 30]
total = 0

# Write a loop to calculate total, then print average:
`,
                verifyFn: `
                  const code = studentCode.trim();
                  
                  let hasLoop = /for\\s+\\w+\\s+in\\s+inputs/.test(code);
                  let hasAccumulator = /total\\s*\\+=\\s*\\w+/.test(code) || /total\\s*=\\s*total\\s*\\+\\s*\\w+/.test(code);
                  let hasAverage = /average\\s*=\\s*total\\s*\\/\\s*3/.test(code);
                  let hasPrint = /print\\s*\\(\\s*average\\s*\\)/.test(code);
                  
                  let terminalLogs = [];
                  terminalLogs.push({type: 'system', text: '$ python main.py'});
                  
                  if (!hasLoop) {
                    terminalLogs.push({type: 'error', text: 'Syntax Error: Loop through the list of inputs using "for num in inputs:".'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  if (!hasAccumulator) {
                    terminalLogs.push({type: 'error', text: 'Logic Error: Accumulate each item inside your loop: "total += num".'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  if (!hasAverage) {
                    terminalLogs.push({type: 'error', text: 'Logic Error: Calculate average as "average = total / 3".'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  if (!hasPrint) {
                    terminalLogs.push({type: 'error', text: 'Execution Error: Output the final average calculation using print(average).'});
                    return { success: false, logs: terminalLogs };
                  }
                  
                  terminalLogs.push({type: 'success', text: '20.0'});
                  terminalLogs.push({type: 'success', text: 'Success! Standard Totals and Averages algorithm translated perfectly to Python.'});
                  return { success: true, logs: terminalLogs };
                `
              }
            }
          ]
        }
      ]
    },
    {
      id: "level2",
      title: "Level 2: Computer Systems & Hardware Architecture",
      grade: "Grade 9",
      description: "Dive inside the computer. Learn CPU Von Neumann architecture, logic gates, memory storage systems, and networking protocols.",
      status: "locked",
      modules: []
    },
    {
      id: "level3",
      title: "Level 3: Advanced Coding & IGCSE Examination Prep",
      grade: "Grade 10",
      description: "Full preparation for the IGCSE CS practical and theoretical papers. Solve file handling, databases, and advanced algorithms.",
      status: "locked",
      modules: []
    }
  ]
};
