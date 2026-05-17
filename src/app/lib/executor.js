/**
 * executor.js — Safe JS code runner
 */

/**
 * Parse "nums = [2,7,11,15], target = 9"
 * Returns { names: ["nums","target"], values: [[2,7,11,15], 9] }
 */
function parseInput(inputStr) {
  const names = [];
  const values = [];
  const s = inputStr.trim();
  let i = 0;

  while (i < s.length) {
    // Read variable name (letters/digits/_)
    while (i < s.length && !/[a-zA-Z_]/.test(s[i])) i++;
    if (i >= s.length) break;

    let nameStart = i;
    while (i < s.length && /[a-zA-Z0-9_]/.test(s[i])) i++;
    const name = s.slice(nameStart, i);

    // skip whitespace then '='
    while (i < s.length && s[i] === " ") i++;
    if (s[i] !== "=") continue;
    i++; // skip '='
    while (i < s.length && s[i] === " ") i++;

    // Read value
    let value;
    if (s[i] === "[") {
      let depth = 0, start = i;
      while (i < s.length) {
        if (s[i] === "[") depth++;
        else if (s[i] === "]") { depth--; if (depth === 0) { i++; break; } }
        i++;
      }
      try { value = JSON.parse(s.slice(start, i)); }
      catch { value = s.slice(start, i); }
    } else if (s[i] === '"' || s[i] === "'") {
      const q = s[i]; i++;
      let start = i;
      while (i < s.length && s[i] !== q) i++;
      value = s.slice(start, i); i++;
    } else {
      let start = i;
      while (i < s.length && s[i] !== ",") i++;
      const token = s.slice(start, i).trim();
      if (token === "true") value = true;
      else if (token === "false") value = false;
      else if (token === "null") value = null;
      else if (!isNaN(Number(token)) && token !== "") value = Number(token);
      else value = token;
    }

    names.push(name);
    values.push(value);
  }

  return { names, values };
}

function serialize(val) {
  if (val === undefined) return "undefined";
  if (val === null) return "null";
  if (typeof val === "string") return val;
  return JSON.stringify(val);
}

function isEqual(got, expected) {
  return String(got).replace(/\s/g, "") === String(expected).replace(/\s/g, "");
}

export function runAllTests(userCode, examples) {
  const fnMatch = userCode.match(/function\s+(\w+)\s*\(/);
  if (!fnMatch) {
    return {
      status: "error",
      error: "No named function found. Write: function yourFunctionName(...) { }",
      cases: [],
      runtime: "—",
      allPassed: false,
    };
  }
  const fnName = fnMatch[1];

  const totalStart = performance.now();

  const cases = examples.map((ex, idx) => {
    const logs = [];
    const origLog = console.log;
    console.log = (...a) =>
      logs.push(a.map(x => typeof x === "object" ? JSON.stringify(x) : String(x)).join(" "));

    let got, error;
    const start = performance.now();

    try {
      const { names, values } = parseInput(ex.input);

      // Inject named variables + call function
      // e.g: const nums = [2,7,11,15]; const target = 9; return twoSum(nums, target);
      const varDeclarations = names
        .map((n, i) => `var ${n} = __vals__[${i}];`)
        .join("\n");

      const callArgs = names.join(", ");

      const fn = new Function("__vals__", `
        ${userCode}
        ${varDeclarations}
        return ${fnName}(${callArgs});
      `);

      got = fn(values);
    } catch (e) {
      error = e.message;
    } finally {
      console.log = origLog;
    }

    const runtime = (performance.now() - start).toFixed(1) + "ms";
    const gotStr = serialize(got);
    const passed = !error && isEqual(gotStr, ex.output);

    return {
      index: idx + 1,
      input: ex.input,
      expected: ex.output,
      got: gotStr,
      passed,
      error: error ?? null,
      logs,
      runtime,
    };
  });

  const runtime = (performance.now() - totalStart).toFixed(0) + "ms";
  const allPassed = cases.every(c => c.passed);
  const hasError = cases.some(c => c.error);

  return {
    status: hasError ? "error" : allPassed ? "accepted" : "wrong_answer",
    cases,
    runtime,
    allPassed,
  };
}
