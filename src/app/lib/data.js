// ── Shared data ──

const ROADMAP = [
  {
    level: 1,
    label: "Programming Basics",
    completed: true,
    color: "59,130,246",
    secondary: "37,99,235",
    desc: "Master the fundamentals of programming including variables, loops, conditions, and functions.",
    topics: ["Variables", "Data Types", "Operators", "Loops", "Functions"],
    theory: [
      {
        title: "Variables",
        body: "Variables are used to store values in memory.",
      },
      {
        title: "Loops",
        body: "Loops allow repeating a block of code multiple times.",
      },
    ],
    problems: [
      {
        id: 1,
        title: "Fizz Buzz",
        difficulty: "Easy",
        topic: "Programming Basics",
        solved: false,
        acceptance: 23.2,
        xp: 50,
        tags: ["Math", "Simulation"],
        companies: ["Amazon", "Google"],
        desc: "Given an integer n, return a string representation of numbers from 1 to n following FizzBuzz rules.",
        constraints: ["1 <= n <= 10^4"],
        examples: [
          {
            input: "n = 3",
            output: '["1","2","Fizz"]',
          },
        ],
        hints: ["Use modulo operator.", "Check 15 before 3 and 5."],
        starter: `function fizzBuzz(n) {
  // Write your code here
}`,
      },
    ],
  },
  {
    level: 2,
    label: "Programming Basics",
    completed: true,
    // active: true,
    color: "59,130,246",
    secondary: "37,99,235",
    desc: "Master the fundamentals of programming including variables, loops, conditions, and functions.",
    topics: ["Variables", "Data Types", "Operators", "Loops", "Functions"],
    theory: [
      {
        title: "Variables",
        body: "Variables are used to store values in memory.",
      },
      {
        title: "Loops",
        body: "Loops allow repeating a block of code multiple times.",
      },
    ],
    problems: [
      {
        id: 1,
        title: "Fizz Buzz",
        difficulty: "Easy",
        topic: "Programming Basics",
        solved: false,
        acceptance: 73.2,
        xp: 50,
        tags: ["Math", "Simulation"],
        companies: ["Amazon", "Google"],
        desc: "Given an integer n, return a string representation of numbers from 1 to n following FizzBuzz rules.",
        constraints: ["1 <= n <= 10^4"],
        examples: [
          {
            input: "n = 3",
            output: '["1","2","Fizz"]',
          },
        ],
        hints: ["Use modulo operator.", "Check 15 before 3 and 5."],
        starter: `function fizzBuzz(n) {
  // Write your code here
}`,
      },
    ],
  },
  {
    level: 3,
    label: "Programming Basics",
    completed: true,
    // locked: true,
    color: "59,130,246",
    secondary: "37,99,235",
    desc: "Master the fundamentals of programming including variables, loops, conditions, and functions.",
    topics: ["Variables", "Data Types", "Operators", "Loops", "Functions"],
    theory: [
      {
        title: "Variables",
        body: "Variables are used to store values in memory.",
      },
      {
        title: "Loops",
        body: "Loops allow repeating a block of code multiple times.",
      },
    ],
    problems: [
      {
        id: 1,
        title: "Fizz Buzz",
        difficulty: "Easy",
        topic: "Programming Basics",
        solved: false,
        acceptance: 73.2,
        xp: 50,
        tags: ["Math", "Simulation"],
        companies: ["Amazon", "Google"],
        desc: "Given an integer n, return a string representation of numbers from 1 to n following FizzBuzz rules.",
        constraints: ["1 <= n <= 10^4"],
        examples: [
          {
            input: "n = 3",
            output: '["1","2","Fizz"]',
          },
        ],
        hints: ["Use modulo operator.", "Check 15 before 3 and 5."],
        starter: `function fizzBuzz(n) {
  // Write your code here
}`,
      },
    ],
  },
  {
    level: 4,
    label: "Programming Basics",
    completed: true,
    // locked: true,
    color: "59,130,246",
    secondary: "37,99,235",
    desc: "Master the fundamentals of programming including variables, loops, conditions, and functions.",
    topics: ["Variables", "Data Types", "Operators", "Loops", "Functions"],
    theory: [
      {
        title: "Variables",
        body: "Variables are used to store values in memory.",
      },
      {
        title: "Loops",
        body: "Loops allow repeating a block of code multiple times.",
      },
    ],
    problems: [
      {
        id: 1,
        title: "Fizz Buzz",
        difficulty: "Easy",
        topic: "Programming Basics",
        solved: false,
        acceptance: 73.2,
        xp: 50,
        tags: ["Math", "Simulation"],
        companies: ["Amazon", "Google"],
        desc: "Given an integer n, return a string representation of numbers from 1 to n following FizzBuzz rules.",
        constraints: ["1 <= n <= 10^4"],
        examples: [
          {
            input: "n = 3",
            output: '["1","2","Fizz"]',
          },
        ],
        hints: ["Use modulo operator.", "Check 15 before 3 and 5."],
        starter: `function fizzBuzz(n) {
  // Write your code here
}`,
      },
    ],
  },
  {
    level: 5,
    label: "Programming Basics",
    completed: true,
    // locked: true,
    color: "59,130,246",
    secondary: "37,99,235",
    desc: "Master the fundamentals of programming including variables, loops, conditions, and functions.",
    topics: ["Variables", "Data Types", "Operators", "Loops", "Functions"],
    theory: [
      {
        title: "Variables",
        body: "Variables are used to store values in memory.",
      },
      {
        title: "Loops",
        body: "Loops allow repeating a block of code multiple times.",
      },
    ],
    problems: [
      {
        id: 1,
        title: "Fizz Buzz",
        difficulty: "Easy",
        topic: "Programming Basics",
        solved: false,
        acceptance: 73.2,
        xp: 50,
        tags: ["Math", "Simulation"],
        companies: ["Amazon", "Google"],
        desc: "Given an integer n, return a string representation of numbers from 1 to n following FizzBuzz rules.",
        constraints: ["1 <= n <= 10^4"],
        examples: [
          {
            input: "n = 3",
            output: '["1","2","Fizz"]',
          },
        ],
        hints: ["Use modulo operator.", "Check 15 before 3 and 5."],
        starter: `function fizzBuzz(n) {
  // Write your code here
}`,
      },
    ],
  },
  {
    level: 6,
    label: "Programming Basics",
    // completed: false,
    // locked: true,
    active: true,
    color: "59,130,246",
    secondary: "37,99,235",
    desc: "Master the fundamentals of programming including variables, loops, conditions, and functions.",
    topics: ["Variables", "Data Types", "Operators", "Loops", "Functions"],
    theory: [
      {
        title: "Variables",
        body: "Variables are used to store values in memory.",
      },
      {
        title: "Loops",
        body: "Loops allow repeating a block of code multiple times.",
      },
    ],
    problems: [
      {
        id: 1,
        title: "Fizz Buzz",
        difficulty: "Easy",
        topic: "Programming Basics",
        solved: false,
        acceptance: 73.2,
        level: 6,
        xp: 50,
        tags: ["Math", "Simulation"],
        companies: ["Amazon", "Google"],
        desc: "Given an integer n, return a string representation of numbers from 1 to n following FizzBuzz rules.",
        constraints: ["1 <= n <= 10^4"],
        examples: [
          {
            input: "n = 3",
            output: '["1","2","Fizz"]',
          },
        ],
        hints: ["Use modulo operator.", "Check 15 before 3 and 5."],
        starter: `function fizzBuzz(n) {
  // Write your code here
}`,
      },
    ],
  },
  {
    level: 10,
    label: "Programming Basics",
    completed: false,
    locked: true,
    color: "59,130,246",
    secondary: "37,99,235",
    desc: "Master the fundamentals of programming including variables, loops, conditions, and functions.",
    topics: ["Variables", "Data Types", "Operators", "Loops", "Functions"],
    theory: [
      {
        title: "Variables",
        body: "Variables are used to store values in memory.",
      },
      {
        title: "Loops",
        body: "Loops allow repeating a block of code multiple times.",
      },
    ],
    problems: [
      {
        id: 1,
        title: "Fizz Buzz",
        difficulty: "Easy",
        topic: "Programming Basics",
        solved: false,
        acceptance: 73.2,
        xp: 50,
        tags: ["Math", "Simulation"],
        companies: ["Amazon", "Google"],
        desc: "Given an integer n, return a string representation of numbers from 1 to n following FizzBuzz rules.",
        constraints: ["1 <= n <= 10^4"],
        examples: [
          {
            input: "n = 3",
            output: '["1","2","Fizz"]',
          },
        ],
        hints: ["Use modulo operator.", "Check 15 before 3 and 5."],
        starter: `function fizzBuzz(n) {
  // Write your code here
}`,
      },
    ],
  },
  {
    level: 7,
    label: "Programming Basics",
    completed: false,
    locked: true,
    color: "59,130,246",
    secondary: "37,99,235",
    desc: "Master the fundamentals of programming including variables, loops, conditions, and functions.",
    topics: ["Variables", "Data Types", "Operators", "Loops", "Functions"],
    theory: [
      {
        title: "Variables",
        body: "Variables are used to store values in memory.",
      },
      {
        title: "Loops",
        body: "Loops allow repeating a block of code multiple times.",
      },
    ],
    problems: [
      {
        id: 1,
        title: "Fizz Buzz",
        difficulty: "Easy",
        topic: "Programming Basics",
        solved: false,
        acceptance: 73.2,
        xp: 50,
        tags: ["Math", "Simulation"],
        companies: ["Amazon", "Google"],
        desc: "Given an integer n, return a string representation of numbers from 1 to n following FizzBuzz rules.",
        constraints: ["1 <= n <= 10^4"],
        examples: [
          {
            input: "n = 3",
            output: '["1","2","Fizz"]',
          },
        ],
        hints: ["Use modulo operator.", "Check 15 before 3 and 5."],
        starter: `function fizzBuzz(n) {
  // Write your code here
}`,
      },
    ],
  },
   {
    level: 8,
    label: "Programming Basics",
    completed: false,
    locked:true,
    color: "59,130,246",
    secondary: "37,99,235",
    desc: "Master the fundamentals of programming including variables, loops, conditions, and functions.",
    topics: [
      "Variables",
      "Data Types",
      "Operators",
      "Loops",
      "Functions"
    ],
    theory: [
      {
        title: "Variables",
        body: "Variables are used to store values in memory."
      },
      {
        title: "Loops",
        body: "Loops allow repeating a block of code multiple times."
      }
    ],
    problems: [
      {
        id: 1,
        title: "Fizz Buzz",
        difficulty: "Easy",
        topic: "Programming Basics",
        solved: false,
        acceptance: 73.2,
        xp: 50,
        tags: ["Math", "Simulation"],
        companies: ["Amazon", "Google"],
        desc: "Given an integer n, return a string representation of numbers from 1 to n following FizzBuzz rules.",
        constraints: [
          "1 <= n <= 10^4"
        ],
        examples: [
          {
            input: "n = 3",
            output: "[\"1\",\"2\",\"Fizz\"]"
          }
        ],
        hints: [
          "Use modulo operator.",
          "Check 15 before 3 and 5."
        ],
        starter: `function fizzBuzz(n) {
  // Write your code here
}`
      }
    ]
  },
   {
    level: 11,
    label: "Programming Basics",
    completed: false,
    locked:true,
    color: "59,130,246",
    secondary: "37,99,235",
    desc: "Master the fundamentals of programming including variables, loops, conditions, and functions.",
    topics: [
      "Variables",
      "Data Types",
      "Operators",
      "Loops",
      "Functions"
    ],
    theory: [
      {
        title: "Variables",
        body: "Variables are used to store values in memory."
      },
      {
        title: "Loops",
        body: "Loops allow repeating a block of code multiple times."
      }
    ],
    problems: [
      {
        id: 1,
        title: "Fizz Buzz",
        difficulty: "Easy",
        topic: "Programming Basics",
        solved: false,
        acceptance: 73.2,
        xp: 50,
        tags: ["Math", "Simulation"],
        companies: ["Amazon", "Google"],
        desc: "Given an integer n, return a string representation of numbers from 1 to n following FizzBuzz rules.",
        constraints: [
          "1 <= n <= 10^4"
        ],
        examples: [
          {
            input: "n = 3",
            output: "[\"1\",\"2\",\"Fizz\"]"
          }
        ],
        hints: [
          "Use modulo operator.",
          "Check 15 before 3 and 5."
        ],
        starter: `function fizzBuzz(n) {
  // Write your code here
}`
      }
    ]
  },
   {
    level: 12,
    label: "Programming Basics",
    completed: false,
    locked:true,
    color: "59,130,246",
    secondary: "37,99,235",
    desc: "Master the fundamentals of programming including variables, loops, conditions, and functions.",
    topics: [
      "Variables",
      "Data Types",
      "Operators",
      "Loops",
      "Functions"
    ],
    theory: [
      {
        title: "Variables",
        body: "Variables are used to store values in memory."
      },
      {
        title: "Loops",
        body: "Loops allow repeating a block of code multiple times."
      }
    ],
    problems: [
      {
        id: 1,
        title: "Fizz Buzz",
        difficulty: "Easy",
        topic: "Programming Basics",
        solved: false,
        acceptance: 73.2,
        xp: 50,
        tags: ["Math", "Simulation"],
        companies: ["Amazon", "Google"],
        desc: "Given an integer n, return a string representation of numbers from 1 to n following FizzBuzz rules.",
        constraints: [
          "1 <= n <= 10^4"
        ],
        examples: [
          {
            input: "n = 3",
            output: "[\"1\",\"2\",\"Fizz\"]"
          }
        ],
        hints: [
          "Use modulo operator.",
          "Check 15 before 3 and 5."
        ],
        starter: `function fizzBuzz(n) {
  // Write your code here
}`
      }
    ]
  }, {
    level: 13,
    label: "Programming Basics",
    completed: false,
    locked:true,
    color: "59,130,246",
    secondary: "37,99,235",
    desc: "Master the fundamentals of programming including variables, loops, conditions, and functions.",
    topics: [
      "Variables",
      "Data Types",
      "Operators",
      "Loops",
      "Functions"
    ],
    theory: [
      {
        title: "Variables",
        body: "Variables are used to store values in memory."
      },
      {
        title: "Loops",
        body: "Loops allow repeating a block of code multiple times."
      }
    ],
    problems: [
      {
        id: 1,
        title: "Fizz Buzz",
        difficulty: "Easy",
        topic: "Programming Basics",
        solved: false,
        acceptance: 73.2,
        xp: 50,
        tags: ["Math", "Simulation"],
        companies: ["Amazon", "Google"],
        desc: "Given an integer n, return a string representation of numbers from 1 to n following FizzBuzz rules.",
        constraints: [
          "1 <= n <= 10^4"
        ],
        examples: [
          {
            input: "n = 3",
            output: "[\"1\",\"2\",\"Fizz\"]"
          }
        ],
        hints: [
          "Use modulo operator.",
          "Check 15 before 3 and 5."
        ],
        starter: `function fizzBuzz(n) {
  // Write your code here
}`
      }
    ]
  }

];

export const diffColor = {
  Easy: {
    text: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/30",
  },
  Medium: {
    text: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/30",
  },
  Hard: {
    text: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-400/30",
  },
};

export const RoadmapNodes = ROADMAP;
export const LEVELS = ROADMAP;
export const PROBLEMS = ROADMAP.flatMap((node) => node.problems ?? node.problemIds ?? []);

