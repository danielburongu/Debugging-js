/* global */

/**
 * Terminal String Styling & Logging Assignment - Final Version
 * Run: node terminal_string.js
 * CLI: node terminal_string.js <info|success|warn|error> "your message here"
 */

const COLORS = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  bold: "\x1b[1m",
  underline: "\x1b[4m",
  bgGreen: "\x1b[42m",
  bgBlack: "\x1b[40m",
};

// Clear screen for clean demo
console.clear();

/* BASIC DEMOS */
console.log(COLORS.red + "Program 1: Red Text" + COLORS.reset);
console.log(COLORS.green + "Program 1: Green Text" + COLORS.reset);
console.log(COLORS.blue + "Program 1: Blue Text" + COLORS.reset);

console.log(COLORS.bold + "Program 2: Bold Text" + COLORS.reset);
console.log(COLORS.underline + "Program 2: Underlined Text" + COLORS.reset);

console.log(
  COLORS.bgGreen + COLORS.red + " Program 3: Background + Red " + COLORS.reset
);

console.log(
  COLORS.bgBlack +
    COLORS.green +
    COLORS.bold +
    " Program 4: Combined Styles " +
    COLORS.reset
);

/* MENU */
console.log("\n" + COLORS.cyan + "Program 5: Menu" + COLORS.reset);
console.log("  1. Add Item");
console.log("  2. View Items");
console.log("  3. Exit\n");

/* HELPERS */
function clearLine() {
  process.stdout.write("\r\x1b[K");
}

function status(msg, type = "info") {
  const icons = {
    info: COLORS.cyan + "ℹ" + COLORS.reset,
    success: COLORS.green + "✓" + COLORS.reset,
    warn: COLORS.yellow + "⚠" + COLORS.reset,
    error: COLORS.red + "✗" + COLORS.reset,
  };
  console.log(`${icons[type] || icons.info} ${msg}`);
}

function logWithTime(msg) {
  const time = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  console.log(`[${time}] ${msg}`);
}

class Logger {
  static info(msg)    { logWithTime(`${COLORS.cyan}[INFO]${COLORS.reset} ${msg}`); }
  static success(msg) { logWithTime(`${COLORS.green}[SUCCESS]${COLORS.reset} ${msg}`); }
  static warn(msg)    { logWithTime(`${COLORS.yellow}[WARN]${COLORS.reset} ${msg}`); }
  static error(msg)   { logWithTime(`${COLORS.red}[ERROR]${COLORS.reset} ${msg}`); }
}

/* CLI SUPPORT */
function showHelp() {
  console.log(COLORS.cyan + "Terminal Styling Demo" + COLORS.reset);
  console.log("════");
  console.log("Commands:");
  console.log("  node terminal_string.js                          → show this demo");
  console.log("  node terminal_string.js info \"Starting up...\"    → info message");
  console.log("  node terminal_string.js success \"Done!\"          → success message");
  console.log("  node terminal_string.js warn \"Low stock\"         → warning");
  console.log("  node terminal_string.js error \"Failed\"           → error message");
  console.log("\nEnjoy the colors! \n");
}

function handleCLI() {
  const args = process.argv.slice(2);

  // Show help when no arguments are provided
  if (args.length === 0) {
    showHelp();
    return true;
  }

  const level = args[0].toLowerCase();
  const message = args.slice(1).join(" ");

  const handlers = {
    info: Logger.info,
    success: Logger.success,
    warn: Logger.warn,
    error: Logger.error,
  };

  if (handlers[level]) {
    handlers[level](message);
    return true;
  }

  console.log(
    COLORS.yellow +
      "Usage: node terminal_string.js <info|success|warn|error> \"your message\"" +
      COLORS.reset
  );
  return true;
}

/* ANIMATIONS */
function progressBar(callback) {
  let progress = 0;
  process.stdout.write("Program 6: Loading  0%");

  const interval = setInterval(() => {
    progress += 10;
    if (progress > 100) progress = 100;

    clearLine();
    process.stdout.write(`Program 6: Loading ${progress.toString().padStart(3)}%`);

    if (progress === 100) {
      clearInterval(interval);
      clearLine();
      console.log(COLORS.green + "Program 6: Loading 100% - Complete!" + COLORS.reset);
      console.log("");
      callback();
    }
  }, 180);
}

function spinner(done) {
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  let i = 0;

  process.stdout.write("Working... ");

  const interval = setInterval(() => {
    clearLine();
    process.stdout.write(`${frames[i = (i + 1) % frames.length]} Working... `);
  }, 80);

  setTimeout(() => {
    clearInterval(interval);
    clearLine();
    console.log(COLORS.green + "✔ Done" + COLORS.reset + "\n");
    done();
  }, 1800);
}

/* MAIN DEMO */
function mainDemo() {
  status("System initialized", "info");
  status("Database connected", "success");
  status("Missing config file", "error");
  status("Low stock alert", "warn");

  logWithTime("Regular timestamp log");

  console.table([
    { item: "Apples",  stock: 20, price: 4500 },
    { item: "Bananas", stock: 5,  price: 2800 },
    { item: "Mangoes", stock: 12, price: 7000 },
  ]);

  spinner(() => {
    console.log(COLORS.red +   "- old price: 5000" + COLORS.reset);
    console.log(COLORS.green + "+ new price: 4500" + COLORS.reset + "\n");

    const data = { store: "Karibu Groceries", items: 87, revenue: "2.4M" };
    console.log(COLORS.yellow + "Current status:" + COLORS.reset);
    console.log(JSON.stringify(data, null, 2) + "\n");

    const msg = "WELCOME TO KARIBU GROCERIES";
    const line = "═".repeat(msg.length + 4);
    console.log(`╔${line}╗`);
    console.log(`║  ${msg}  ║`);
    console.log(`╚${line}╝\n`);

    Logger.info("Application started successfully");
    Logger.success("All systems operational");
    Logger.warn("Bananas running low (5 left)");
    Logger.error("Payment gateway timeout");

    console.log("\n" + COLORS.cyan + "Try CLI mode examples:" + COLORS.reset);
    console.log("  node terminal_string.js success \"Order #124 completed!\"");
    console.log("  node terminal_string.js error \"Payment failed\"\n");
  });
}

// PROGRAM ENTRY POINT
if (handleCLI()) {
  // CLI mode log and exit (or show help)
  process.exit(0);
}

// demo
progressBar(mainDemo);