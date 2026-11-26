# Semester 3 — Full Stack Web Development (Node.js → Express → React)

> **You are reading a complete, self-contained study guide / teaching pack.**
> It contains **every source file in this repository, in full**, organized as 7 progressive labs.
> It is written so that an AI agent (or a human tutor) can hand-hold you from "hello world in Node" to
> "React front-end talking to an Express back-end".

---

## 0. How to use this document

### 0.1 For the learner

Read the labs **in order**. Each lab has this shape:

1. **Goal** — what you should be able to do after the lab.
2. **Concepts** — explained from first principles (no prior Node knowledge assumed).
3. **Every file, in full**, with a per-file explanation and the **exact terminal commands** to run it.
4. **Expected output / what to observe**.
5. **Exercises** — do these; they are where the learning happens.

### 0.2 For the AI agent being handed this document

Use this contract when tutoring:

```
ROLE: You are a patient full-stack JS instructor.
INPUT: This README contains all source code for labs 1..7.
RULES:
 1. Never invent code. If you show a file, quote it from this README verbatim,
    or explicitly say "this is a new variation".
 2. Teach in the order lab1 -> lab7. Each lab depends on the previous one.
 3. Before explaining a file, ask the learner to predict its output. Then reveal.
 4. For every runnable file give: (a) the command, (b) the URL/port,
    (c) the expected console/browser output, (d) the 1-2 mistakes students
    actually make on this file (see "Gotchas" sections).
 5. Keep answers short; one concept per message. End each message with one
    small exercise.
 6. When the learner is stuck, first ask "what did the terminal print?",
    then reason from the actual output — never guess.
 7. Quiz style: ask "what will this print?" on the event-loop files (lab1)
    and on array methods (lab2, lab6).
 8. Only after lab7, introduce topics NOT in this repo (MongoDB, auth,
    TypeScript, testing) as "next steps", clearly flagged as outside scope.
```

### 0.3 Prerequisites

| Tool    | Version used here                          | Check     |
| ------- | ------------------------------------------ | --------- |
| Node.js | v18+ (v20+ recommended)                    | `node -v` |
| npm     | shipped with Node                          | `npm -v`  |
| Editor  | VS Code (repo has `.vscode/settings.json`) | —         |
| Browser | Chrome / Edge for testing HTTP servers     | —         |

> **Windows note (this repo lives on Windows):** all commands below are PowerShell-compatible.
> Use `;` not `&&` to chain commands.

### 0.4 Repository layout (source files only — `node_modules` omitted)

```
Sem 3/
├── .gitignore                  # ignores every lab's node_modules
├── .vscode/settings.json       # live-server port + CodeGPT key
├── lab5-home.png               # screenshot: lab5/public site
├── lab5-frontend-home.png      # screenshot: lab5/frontend site
│
├── lab1/                       # Node fundamentals + event loop + events
│   ├── EventLoop/
│   │   ├── task1.js            # call stack, synchronous flow
│   │   ├── task2.js            # timers, setImmediate, nextTick, async fs
│   │   ├── task3.js            # the classic ordering quiz
│   │   └── stud.txt            # file produced by task2.js
│   └── Fundamental/
│       ├── index.js            # functions & arrow functions
│       ├── eventEmitter.js     # on / once / off / emit / listenerCount
│       └── order.js            # EventEmitter as a mini pub-sub architecture
│
├── lab2/                       # fs/promises CRUD + a full CLI cart app
│   ├── index.js                # writeFile / readFile / appendFile
│   ├── prg2.js                 # mkdir / rm directory management
│   ├── CartProject.js          # 5-option readline shopping cart (JSON DB)
│   ├── product.json            # the "database"
│   ├── notes.txt, stud.txt     # sample data files
│   └── readme.md               # student's FS notes
│
├── lab3/                       # raw http module: routing, status, JSON, streams, REST
│   ├── prg1.js .. prg11.js     # 11 progressively harder servers
│   ├── tempCodeRunnerFile.js    # server.on('request') variant
│   ├── data/products.json      # 10 phones (streamed as JSON)
│   ├── data/chatgpt.txt        # plain-text stream demo
│   ├── pages/airtag.html       # full "Find My" dashboard page (547 lines)
│   ├── package.json            # type: module, nodemon
│   └── readme.md               # HTTP notes
│
├── lab4/                       # REST API over the http module (teams CRUD)
│   ├── app.js                  # router + body parsing + JSON envelope
│   └── teams.js                # in-memory repository (module split)
│
├── lab5/                       # Express.js
│   ├── app.js                  # minimal Express routing, 404 handler
│   ├── prg1.js                 # sendFile + express.static ("public")
│   ├── prg2.js                 # express.static("frontend") + 404
│   ├── public/                 # Northstar Studio site (served by prg1.js)
│   ├── frontend/               # variant of the same site (served by prg2.js)
│   └── readme.md               # Express setup notes
│
├── lab6/                       # Express + JSON REST API
│   ├── app.js                  # GET /api/products, GET /api/products/:id
│   └── data.js                 # 20 products (id, name, description, rating, price, image)
│
└── lab7/                       # React (Vite) + Tailwind + empty Express backend
    ├── backend/                # package.json only (app.js is empty)
    └── frontend/
        ├── index.html          # <div id="root"> + /src/main.jsx
        ├── vite.config.js      # react() + tailwindcss() plugins
        ├── eslint.config.js
        └── src/
            ├── main.jsx        # createRoot + StrictMode
            ├── App.jsx         # MyButton component
            ├── index.css       # full glassmorphism card theme
            ├── components/     # Book.jsx, Event.jsx, Fruit.jsx, Pen.jsx
            └── data/           # Books.js, Pens.js
```

### 0.5 The one-paragraph mental model

A browser asks for a URL → a **Node process** (or Express app) receives an **HTTP request object**
(`req.url`, `req.method`, `req.headers`, a streamed body) → your code runs **JavaScript on a single
thread** and schedules async work on the **event loop** → you write an **HTTP response**
(`res.writeHead`, `res.end`) → the browser renders HTML/CSS/JS → **React** on the client keeps the UI in
sync with data. Labs 1–4 build this from raw pieces; labs 5–6 use Express so you don't hand-roll routing;
lab 7 moves the view layer into a component tree.

---

## 0.6 Global quick-reference commands

```powershell
# run any script
node lab1\EventLoop\task1.js

# make a new npm project (ES modules everywhere in this repo)
npm init -y
# then set  "type": "module"  in package.json

# install dev tool that restarts on save
npm i nodemon -D

# npm scripts (defined in each lab's package.json)
npm start        # node app.js  (lab6, lab5, lab4...)
npm run dev      # nodemon app.js
```

| Port used | Lab                                                  | What runs there                      |
| --------- | ---------------------------------------------------- | ------------------------------------ |
| 3690      | lab3                                                 | prg1, prg2, prg3                     |
| 4444      | lab3 (prg4), lab5 (prg2)                             | product routes / frontend static     |
| 3000      | lab3 (prg5, prg7, prg9, prg10, prg11), lab5 (app.js) | mostly products/API                  |
| 5000      | lab4                                                 | teams REST API                       |
| 3333      | lab5 (prg1), lab6                                    | Northstar static site / products API |
| 5501      | `.vscode`                                            | Live Server extension                |
| 5173      | lab7                                                 | Vite dev server (default)            |

---

# LAB 1 — Node.js Fundamentals, the Event Loop and Events

**Goal:** understand _why_ Node exists (non-blocking single-threaded I/O), predict the order of
asynchronous callbacks, and use `EventEmitter` to decouple parts of a program.

**Concepts**

- **JavaScript runtime vs engine.** V8 executes JS; **Node** adds the _event loop_, _libuv thread
  pool_ (for file/network I/O), and modules (`fs`, `http`, `events`, …).
- **Call stack vs task queues.** Synchronous code runs to completion first. Then the loop drains, in
  priority order:
  1. **`process.nextTick` queue** (highest priority, after each operation)
  2. **microtasks / Promises** (`.then`, `await` continuations)
  3. **macrotasks**: `setTimeout`, `setInterval`, `setImmediate`, I/O callbacks
- **`setImmediate` vs `setTimeout(fn, 0)`** — `setImmediate` runs in the _check_ phase; `setTimeout`
  runs in the _timers_ phase. Order can flip depending on whether the loop started within 1 ms.
- **Events** — Node's core is an `EventEmitter`: objects `emit` named events; listener functions react.
  This is the "pub-sub" pattern that decouples a producer (order placed) from consumers (email,
  inventory, shipping, logging).

---

## 1.1 `lab1/Fundamental/index.js` — functions and arrow functions

```js
function sayHello(name) {
  console.log(`Hello ${name}`);
}

const sayHi = (name) => {
  console.log(`Hi ${name}`);
};

const findSum = (a, b) => {
  return a + b;
};

const sum = (a, b) => a + b;

sayHello("Anuj Sharma");
sayHi("Manju Sinha");
console.log("sum=", findSum(5, 6));
console.log("sum=", sum(5, 6));
```

**Explanation**

- A **function declaration** (`function f(){}`) is hoisted — usable before its definition.
- A **function expression** assigned to `const` is _not_ hoisted into a usable state.
- **Arrow functions** `(a,b) => a + b` have **implicit return** when there is no block `{}`.
  They also do not have their own `this` — important later in classes and callbacks.
- Backticks are **template literals**: `${expr}` is interpolated.

**Run:** `node lab1\Fundamental\index.js`

**Output**

```
Hello Anuj Sharma
Hi Manju Sinha
sum= 11
sum= 11
```

**Exercise:** add `const avg = (a,b) => (a+b)/2;` and print it. Then try
`console.log(sum(1,2,3))` — what happens and why? (Answer: extra args are ignored, so `3`.)

---

## 1.2 `lab1/Fundamental/eventEmitter.js` — on / once / off / emit / listenerCount

```js
import { EventEmitter } from "node:events";

const sayHi = (name) => {
  console.log(`${name} logged in`);
};

const task = new EventEmitter();

task.once("greet", () => {
  console.log("System Started");
});

task.on("greet", sayHi);
task.on("greet", (name) => {
  console.log(`${name} starts working`);
});
task.on("greet", (name) => {
  console.log(`${name} stopped working`);
});

task.off("greet", sayHi);

task.emit("greet", "Avish Bhati");

task.emit("greet", "Tony Stark");

task.once("exit", (name) => {
  console.log(`System Shutdown by ${name}`);
});

task.emit("exit", "The Manager");
task.emit("exit", "Employee");
console.log("total listener", task.listenerCount("greet"));
task.removeAllListeners("greet");
```

**Explanation (line by line, because this is the most quizzed file)**

| Call                                              | Meaning                                                                                                     |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `new EventEmitter()`                              | creates an object with an internal map `eventName -> [listeners]`                                           |
| `.once("greet", cb)`                              | listener that auto-removes itself after running **one** time                                                |
| `.on("greet", sayHi)`                             | persistent listener                                                                                         |
| `.off("greet", sayHi)` _(alias `removeListener`)_ | remove **by function reference** — works only if you keep a reference (that's why `sayHi` is a named const) |
| `.emit("greet","Avish Bhati")`                    | synchronously calls all listeners in registration order, passing `"Avish Bhati"`                            |
| `.once('exit', cb)`                               | fires once only                                                                                             |
| `.listenerCount(name)`                            | number of remaining listeners                                                                               |
| `.removeAllListeners(name)`                       | clears them                                                                                                 |

**Important:** in `task.on("greet", () => {...})` the `()` takes **no** parameter, so it receives and
ignores `"Avish Bhati"`. Over 2 emits: the `once` runs once (emit #1), `sayHi` was removed, listener 2
prints twice, listener 3 prints twice.

**Run:** `node lab1\Fundamental\eventEmitter.js`

**Output**

```
System Started
Avish Bhati starts working
Avish Bhati stopped working
Tony Stark starts working
Tony Stark stopped working
System Shutdown by The Manager
total listener 2
```

**Gotchas**

- `off("greet", () => {})` **does nothing** — a new arrow function is a different reference.
- Emitting an event with **no listeners** is a silent no-op… except `"error"`, which **throws** if
  unhandled. That's why `order.js` registers an `"error"` listener.

---

## 1.3 `lab1/Fundamental/order.js` — pub-sub architecture with a class

```js
import { EventEmitter } from "node:events";

class OrderSystem extends EventEmitter {
  placeOrder(order) {
    console.log(`Order received: #${order.id} for ${order.customerName}`);
    console.log("Saving order to database");

    this.emit("orderPlaced", order);
  }
}

const orderObj = new OrderSystem();

// Email Service
orderObj.on("orderPlaced", (order) => {
  console.log(`Sending confirmation email to ${order.email}`);
});

// Inventory Service
orderObj.on("orderPlaced", (order) => {
  order.items.forEach((item) => {
    console.log(`Reducing stock of ${item.name} by ${item.qty}`);
  });
});

// Shipping Service
orderObj.on("orderPlaced", (order) => {
  console.log(`Creating shipping label for order #${order.id}`);
});

// Logging
orderObj.on("orderPlaced", (order) => {
  console.log(`Logging order ${order.id} - total ₹${order.total}`);
});

// Error
orderObj.on("error", (err) => {
  console.log(err);
});

// Place Order
orderObj.placeOrder({
  id: "ORD10001",
  customerName: "Ramesh Solanki",
  email: "ramesh.sol27@gmail.com",
  items: [
    { name: "Wireless Mouse", qty: 1 },
    { name: "Wireless Headset", qty: 2 },
  ],
  total: 2399,
});
```

**Explanation** — `OrderSystem extends EventEmitter` gives the class `.on/.emit` for free.
`placeOrder` does its own work (fake DB save) then raises **one** event; **four independent
subscribers** react. The payment/cart code does not know or care that email, inventory, shipping and
logging exist. That is exactly the decoupling that makes checkout systems testable — you can add a
"loyalty points" listener without touching `placeOrder`.

Order of output = order of `.on` registration.

**Run:** `node lab1\Fundamental\order.js`

**Output**

```
Order received: #ORD10001 for Ramesh Solanki
Saving order to database
Sending confirmation email to ramesh.sol27@gmail.com
Reducing stock of Wireless Mouse by 1
Reducing stock of Wireless Headset by 2
Creating shipping label for order #ORD10001
Logging order ORD10001 - total ₹2399
```

**Exercise:** register a 5th listener that prints the total including 18% GST. Then convert every
listener into an `async` function — notice that `emit` does **not** await them, a classic bug.

---

## 1.4 `lab1/EventLoop/task1.js` — the call stack

```js
const f1 = () => {
  console.log("f1 starts");
  f2();
  console.log("f1 running");
  console.log("f1 end");
};
const f2 = () => {
  console.log("f2 starts");
  f3();
  console.log("f2 running");
  console.log("f2 ends");
};
const f3 = () => {
  console.log("f3 starts");
  console.log("f3 running");
  console.log("f3 end");
};
function main() {
  console.log("main");
  f1();
  console.log("end main");
}
main();

//Javascript - Synchronus and single threaded form.
//Limitation - Can't perform multiple tasks simultaneously.
//In asynchronus we use event loop to manage the call stack.
//Asynchronus call using timers:
// 1- Set time out.
// 2- Set immediate.
// 3- Process.next tick.
// 4- Set Interval.
```

**Explanation** — this is a plain **LIFO stack**. `main` pushes, calls `f1` (pushes), calls `f2`
(pushes), calls `f3` (pushes), `f3` returns (pops), then `f2` continues. Nothing is concurrent; the
"end" lines print only after inner calls return. The comments state the core limitation being solved
in the next files.

**Run / output**

```
main
f1 starts
f2 starts
f3 starts
f3 running
f3 end
f2 running
f2 ends
f1 running
f1 end
end main
```

**Quiz:** what prints if you move `console.log("f2 running")` _before_ `f3()`? (Answer: before
`f3 starts`.)

---

## 1.5 `lab1/EventLoop/task2.js` — all four async mechanisms at once

```js
import fs from "fs/promises";
const writeData = async () => {
  try {
    console.log("about to write....");
    await fs.writeFile("stud.txt", "Name:Raman Singh");
    console.log("filewritten");
  } catch (error) {
    console.log(error);
  }
};
const f1 = () => {
  console.log("f1");
};
const f2 = () => {
  console.log("f2");
};
const f3 = () => {
  console.log("f3");
};

const main = () => {
  console.log("main");
  setTimeout(f1, 0);
  setInterval(f2, 1000); // press ctrl + c to stop
  setImmediate(f2);
  process.nextTick(f3);
  writeData();
  console.log("end");
};
main();

//Promise - Payment ka tab tak wait kro jab tak aaye na.
//async/await
```

**Explanation**

- `setTimeout(f1, 0)` → timers phase (macrotask).
- `setInterval(f2, 1000)` → repeats **forever**; the process never exits by itself (hence the
  `ctrl + c` comment). This is the #1 reason a student's terminal "hangs".
- `setImmediate(f2)` → check phase, runs after the current poll cycle.
- `process.nextTick(f3)` → runs **before** promise continuations and before timers.
- `writeData()` is an `async` function: it logs "about to write....", hits `await fs.writeFile`,
  returns a pending promise, and the rest continues later. The file write is done by libuv's thread
  pool, so the main thread is free.

**Expected output (first ~1 second)**

```
main
about to write....
end
f3
filewritten
f2            (setImmediate)
f1            (setTimeout 0)
f2            (interval, after 1000 ms)
f2            (interval, every 1000 ms ...)
```

> `filewritten` may appear just before or just after `f2`/`f1` depending on disk speed —
> exactly the uncertainty the next exercise asks you to reason about.

**File produced:** `lab1/EventLoop/stud.txt` →

```
Name:Raman Singh
```

**Run:** `node lab1\EventLoop\task2.js` then `Ctrl + C`.

**Exercise:** comment out `setInterval`. Does the process exit on its own now? Why is that a good
demonstration that timers keep the loop alive?

---

## 1.6 `lab1/EventLoop/task3.js` — the classic ordering quiz

```js
console.log("1:start");
setTimeout(() => console.log("2:setTimeout"), 0);
setImmediate(() => console.log("3:setImmediate"));
process.nextTick(() => console.log("4:nextTick"));
console.log("5:end");
```

**Answer and reasoning**

```
1:start
5:end
4:nextTick
2:setTimeout        <- or 3:setImmediate first (see note)
3:setImmediate
```

1. All synchronous logs first: `1`, `5`.
2. `nextTick` queue beats everything async: `4`.
3. `setTimeout(0)` (timers phase) vs `setImmediate` (check phase): **order is not guaranteed when
   called from the main module** — it depends on how long the script took (< 1 ms → often timer
   first). Inside an I/O callback, `setImmediate` _always_ runs before `setTimeout`.

**Run:** `node lab1\EventLoop\task3.js` a few times. Then wrap the four async calls inside
`fs.readFile(__filename, () => { ... })` and observe `setImmediate` becoming deterministic.

**Gotchas**

- `nextTick` starving the loop: a recursive `process.nextTick` never lets I/O run.
- `await` inside a loop (`for ... await`) serialises I/O; `Promise.all` parallelises it.

---

# LAB 2 — File System (`fs/promises`) and a CLI Shopping Cart

**Goal:** persist data to disk (CRUD on files), understand `utf-8`, JSON, and build a real 5-option
menu-driven app with `readline/promises`.

**Concepts**

- `fs/promises` gives promise-based versions: `readFile`, `writeFile`, `appendFile`, `mkdir`, `rm`,
  `readdir`, `stat`, `rename`, `unlink`.
- Always pass `'utf-8'` when reading text, otherwise you get a `Buffer` (raw bytes).
- `JSON.stringify(obj, null, 2)` pretty-prints with 2-space indent → your "database file".
- `readline/promises`' `cin.question()` returns a **Promise<string>** (always a string — cast with
  `Number()`).
- A file as a database is fine for learning; concurrent writers will corrupt it (no locks).

**Student's own notes (`lab2/readme.md`, verbatim)**

```md
# FS: File System

- Used to store data permanently.
- Browser can't store such a large amount of data.
- #### CRUD - Create Remove/Read/Retrieve Update Delete.
- fs module communicates directly to your OS.
- Reading and writing files -> readfile() , writefile() , appendfile().
- Directory Management -> mkdir() , rmdir() , readdir().
- Metadata/Information -> stat() , lstat() , fstat().
- Watching for changes -> watch() , watchFile() , unwatchFile().
- Streaming Large Files -> createReadStream() , createWriteStream().
- File Operations -> rename() , truncate() , unlink() , link() , syslink().
- async -> asynchronous
- await -> waits for OS to make the file.
- To run a js file -> node <filename.js>
- "await" can be used with any promise in "async" function. That "async" function will be also accessed by "await" keyword.
- #### JSON -> Javascript Object Notation.
- {Key:Value} -> Json.
- utf-8 char code used for programming in web ; used to encode and decode the characters.
- Trim => Removes all succeeding and preceding whitespaces from string.
```

---

## 2.1 `lab2/index.js` — write / read / append

```js
import { writeFile, readFile, appendFile } from "fs/promises";

//await writeFile('stud.txt','Avish Bhati\nRoll No. : 356\nAdmission No. : 787');
//console.log("File written");
// const data = await readFile("stud.txt",'utf-8');
// console.log(`file contents : ${data}`);

const addContent = async (fname, content) => {
  await writeFile(fname, content);
  console.log(`${content} written in ${fname}`);
};

const readContent = async (fname) => {
  const data = await readFile(fname, "utf-8");
  return data;
};

const appendData = async (fname, content) => {
  await appendFile(fname, "\n" + content);
  console.log("data appended");
};

// await addContent("notes.txt","FS is easy in JS");
// console.log(await readContent("notes.txt"));

await appendData("notes.txt", "It can add, read and update contents");
console.log("Updated Content\n", await readContent("notes.txt"));
```

**Explanation**

- **Top-level `await`** works because `lab2` uses ESM (`type: module` isn't in lab2, but Node ≥ 14.8
  supports TLA in `.mjs`; `.js` needs `"type":"module"` — add it if you get
  `SyntaxError: await is only valid in async functions`). This is the single most common setup error
  in lab2.
- `writeFile` **overwrites**; `appendFile` **adds** (note the manual `"\n"`).
- `readContent` returns the string, so it can be `await`ed _and_ used in a template.

**Run:** `node lab2\index.js`

**Files involved**

- `lab2/notes.txt` (after run)

```
FS is easy in JS
It can add, read and update contents
```

- `lab2/stud.txt`

```
Avish Bhati
Roll No. : 356
Admission No. : 787

```

**Gotcha:** re-running `index.js` appends a duplicate line every time. That's expected — append is
not idempotent. Call `addContent` first to reset it.

---

## 2.2 `lab2/prg2.js` — directories

```js
import { mkdir, rm } from "fs/promises";

// await mkdir('uploads');
// await mkdir('uploads/images');

// await mkdir("docs/resume/data" , {recursive: true});

await rm("docs", { recursive: true });
```

**Explanation**

- `mkdir('uploads')` fails if it exists (`EEXIST`) — unless `{recursive: true}`, which also creates
  missing parents and does **not** throw when the path exists.
- `rm('docs', {recursive: true})` deletes a whole tree (the `rm -rf` equivalent — **careful**).

**Run (only once each):** uncomment `mkdir("docs/resume/data", {recursive:true})`, run, then restore
the `rm` line and run again.

**Exercise:** write a function `safeReset()` that removes `uploads` then recreates it.

---

## 2.3 `lab2/CartProject.js` — full CLI cart, JSON-file database

> The file's first 142 lines are a commented-out earlier version, kept for reference. Below is the
> **live** version (line 145 onwards). The differences worth noting: `updateQuantity` now supports
> `+` and `-`, `removeProduct` prints a "not found" branch correctly, and case 4 reads two values.

```js
import readline from "readline/promises";
import { stdin, stdout } from "process";
import { readFile, writeFile } from "fs/promises";

// Database using file starts
const FILE = "product.json";

const getCart = async () => {
  const data = await readFile(FILE, "utf-8");
  return JSON.parse(data);
};

const saveCart = async (cart) => {
  await writeFile(FILE, JSON.stringify(cart, null, 2));
};

const addToCart = async (product) => {
  const cart = await getCart();

  const isFoundInCart = cart.find((item) => item.id === product.id);

  if (isFoundInCart) {
    isFoundInCart.qty += 1;
  } else {
    cart.push(product);
    console.log(`${product.name} added to cart`);
  }

  await saveCart(cart);
};

const displayCart = async () => {
  const cart = await getCart();

  if (cart.length === 0) {
    console.log("🛒 Cart is empty");
    return;
  }

  console.table(cart);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  console.log(`Total payable amount Rs. ${total}`);
};

const removeProduct = async (pid) => {
  const cart = await getCart();
  const isFoundInCart = cart.find((item) => item.id === pid);
  let x = cart.length;
  const newProduct = cart.filter((item) => item.id !== pid);
  let y = newProduct.length;
  if (x > y) {
    console.log(`Product with id ${pid} is removed from cart`);
    await saveCart(newProduct);
  } else {
    console.log(`Product with id ${pid} not found in cart`);
  }
};

const updateQuantity = async (pid, option = "-") => {
  const cart = await getCart();
  const isFoundInCart = cart.find((item) => item.id === pid);

  if (isFoundInCart) {
    if (option === "+") {
      isFoundInCart.qty += 1;
    } else {
      if (isFoundInCart.qty === 1) {
        await removeProduct(pid);
        return;
      } else {
        isFoundInCart.qty -= 1;
      }
    }
    await saveCart(cart);
    console.log(`${isFoundInCart.name} quantity updated 🛒`);
  } else {
    console.log(`Product with ID ${pid} not found`);
  }
};

const main = async () => {
  let choice;
  const cin = readline.createInterface({
    input: stdin,
    output: stdout,
  });

  do {
    console.log("\nWelcome to Amazon Shopping 🛒");
    console.log("1. Show Cart");
    console.log("2. Add Product");
    console.log("3. Remove Product");
    console.log("4. Update Quantity");
    console.log("5. Checkout");

    choice = await cin.question("Enter your choice: ");

    switch (Number(choice)) {
      case 1:
        await displayCart();
        break;

      case 2:
        const item = await cin.question("Enter id,name,price,qty: ");
        const [id, name, price, qty] = item.split(",").map((p) => p.trim());

        await addToCart({
          id: Number(id),
          name,
          price: Number(price),
          qty: Number(qty),
        });
        break;

      case 3:
        let pid = await cin.question("Enter product id: ");
        await removeProduct(Number(pid));
        break;

      case 4:
        let pid2 = await cin.question("Enter product id and option(+ or -): ");
        const [pidVal, option] = pid2.split(",").map((p) => p.trim());
        await updateQuantity(Number(pidVal), option);
        break;

      case 5:
        console.log("Checkout");
        break;

      default:
        console.log("Invalid Choice! Try again ⚔️");
    }
  } while (Number(choice) !== 5);

  cin.close();
};

main();
```

**Explanation of the important patterns**

| Pattern                                                  | Why it matters                                                                                                                                   |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `getCart()` / `saveCart()`                               | the "repository layer" — every operation reads the whole file, mutates, writes it back. This is the seed of what a real DB does transactionally. |
| `cart.find(item => item.id === product.id)`              | **strict equality**: `"101" === 101` is false. Hence `Number(pid)` everywhere.                                                                   |
| `cart.length` before vs after `filter`                   | a "did anything change?" check without needing the found object.                                                                                 |
| `cart.reduce((sum,item)=> sum + item.price*item.qty, 0)` | the canonical total-price fold.                                                                                                                  |
| `readline.createInterface` + `do…while`                  | REPL-style loop; `cin.close()` releases stdin so the process can exit.                                                                           |
| `split(",").map(p => p.trim())`                          | parses `"5, Pen, 20, 2"` → `["5","Pen","20","2"]` (trim removes stray spaces).                                                                   |

**The database file `lab2/product.json`**

```json
[
  {
    "id": 101,
    "price": null,
    "qty": 1
  },
  {
    "id": 13,
    "name": "Laptop",
    "price": 123432,
    "qty": 2
  }
]
```

> Notice entry `101` has **no `name`** and `price: null` — it was added with a bad input line, so the
> cart total shows `NaN`. This is a genuine, useful bug to discuss: validate input before saving.

**Run**

```powershell
cd lab2
node CartProject.js
```

Then: `1` (show), `2` then `7,Pencil,10,3`, `4` then `7,+`, `1`, `3` then `7`, `1`, `5`.

**Expected total** with the shipped JSON: `null*1 + 123432*2` → `NaN` (entry 101). Delete entry
101 or fix its price to see `246864`.

**Bugs baked into this file (great teaching material)**

1. `addToCart` increments `qty` by 1 but ignores the user-entered `qty`.
2. `updateQuantity` with `-` when `qty===1` calls `removeProduct`, which **re-reads** the file — fine
   here, but a "read-modify-write twice" smell.
3. `let x` / `let y` should be `const`; the length comparison is a roundabout `filter().length !==
cart.length`.
4. No `try/catch` around `JSON.parse` — a corrupted `product.json` crashes the app.
5. `case 2` declares `const item` inside a `switch` without braces (allowed, but fragile).

**Exercise:** fix (1) so the entered quantity is used, and add a `6. Clear Cart` option.

---

## Lab 2 recap quiz

1. Why does `readFile` without `'utf-8'` give you numbers instead of text?
2. What's the difference between `writeFile` and `appendFile` in terms of real-world use?
3. Why must `pid` be converted with `Number()` before comparing to `item.id`?
4. What is the time complexity of `getCart()` as the cart grows?

---

# LAB 3 — Raw HTTP Servers with the `http` Module

**Goal:** build web servers with **no framework**, so that when Express arrives you know what it hides.

**Concepts**

- **HTTP is request/response text.** The client sends a method + path + headers (+ optional body); the
  server replies with a status code, headers, and a body.
- `req` (IncomingMessage) exposes: `req.url`, `req.method`, `req.headers`, `req.socket`, and is a
  **Readable stream** for the body (`req.on("data")`, `req.on("end")`).
- `res` (ServerResponse) exposes: `res.writeHead(status, headers)`, `res.setHeader(k,v)`,
  `res.statusCode`, `res.write(chunk)`, `res.end(body)`.
- **Content-Type** tells the browser how to interpret the body: `text/html`, `application/json`,
  `text/plain`, `text/css`, `application/javascript`.
- **Status codes used here:** 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden,
  404 Not Found, 500 Internal Server Error.
- **Streaming:** `createReadStream(path).pipe(res)` sends a big file in chunks instead of loading it
  into memory.

**Student's HTTP notes (`lab3/readme.md`, verbatim)**

```md
# Http Module:
- Hyper Text Transfer Protocol
- Html - Hyper Text Markup Language
- CSS - Cascade Style Sheet
- NPM - Node Package Manager
## Http Methods:
- req = url , method , socket , headers.
- Get - by default any browser.
- Post
- Put
- Patch
- Delete
### HTTP Status Codes: 
- 200 okay
- 201 created
- 400 Bad Request
- 401 UnAuthorized
- 403 Forbidden
- 404 Not Found
- 500 Internal Server Error
## Some imp terms: 
- npm -> node install krne ke liye.
- ctrl + C -> Terminate
- npm start -> server start
- npm run dev -> make changes in live server without terminating
- text/plain
- text/html
- text/json
- text/css
- text/js
## Server can send data
1. html content
2. html files
3. json data
4. plain text
5. css
6. jss
7. file

## Server can set Header to send data
1. res.writeHeader()
2. res.setHeader

## Server can set status code: 

1. res.statusCode()
2. res.writeHeader()

## request methods

1. get
2. post
3. put/patch
4. delete
5. Routes

# NPM Project

1. create project folder
2. right click on project folder and select open in integrated terminal
3. type `npm init -y` press enter
4. open package.json file from project folder
5. update type as `type:module` in package.json
6. type in terminal `npm i nodemon -D` to install nodemon, which restarts server while file changes.
   -D flag indicate intstall in dev dependency.
7. it creates node_modules folder and package-lock.json.
8. update .gitignore file and write project folder/node_modules.
9. update package.json to run the project, update script property as below
"scripts" : {
    "start" : "node app.js",
    "dev" : "nodemon app.js",
},
```

**Project setup used by every file in this lab — `lab3/package.json`**
```json
{
  "name": "lab-3",
  "version": "1.0.0",
  "description": "- Hyper Text Transfer Protocol\r - Html - Hyper Text Markup Language\r - CSS - Cascade Style Sheet\r - NPM - Node Package Manager",
  "main": "App.js",
  "scripts": {
    "start": "node prg11.js",
    "dev": "nodemon prg11.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "devDependencies": {
    "nodemon": "^3.1.14"
  }
}
```
> `"type": "module"` is what makes `import http from "http"` legal in a `.js` file.
> `nodemon` restarts the server whenever a file changes — without it you must `Ctrl+C` and re-run.

---

## 3.1 `lab3/prg1.js` — inspect a request

```js
import http from "http";

const server = http.createServer((req,res) => {
    console.log('Welcomme to Node JS');
    console.log(req.url);
    console.log("Request Method");

    console.log(req.method);

    console.log('Request Header');
    console.log(req.headers);
    console.log("Socket Info");
    console.log(req.socket);

    console.log(req.headers.host);
    
    res.end("hello ji");
    
});



const PORT = 3690;
server.listen(PORT,()=>{
    console.log("Hi the server is running");
    
})
```

**Explanation** — `http.createServer(handler)` returns a server; `handler(req,res)` runs **once per
request**. `res.end()` is mandatory, otherwise the browser spins forever waiting for the response.

**Run:** `node lab3\prg1.js`, open <http://localhost:3690/anything>. Terminal prints the URL path,
`GET`, the headers object (including `host`, `user-agent`, `accept`), and the socket (with
`remoteAddress` / `remotePort`). Browser shows `hello ji`.

**Gotcha:** `req.socket` is a huge circular object — printing it floods the terminal. Print
`req.socket.remoteAddress` instead.

---

## 3.2 `lab3/prg2.js` — status code + content type

```js
import http from "http";

const server = http.createServer((req,res)=>
{
    res.writeHead(201,{
        'content-type':"text/html",
    });
    res.end("<h1>Welcome to Server");
});


server.listen(3690, () => console.log("Server is running"));
```

**Explanation** — `writeHead(201, {content-type})` sets status **and** headers in one call, then
`res.end(html)` sends the body. Because the type is `text/html`, the browser **renders** the `<h1>`
instead of showing the tags.

**Verify:** DevTools → Network → the request shows status `201`. (In the visible page, 201 vs 200 looks
identical — the difference is semantic.)

**Gotcha:** two servers on the same port → `EADDRINUSE`. Kill the old one (`Ctrl+C`, or
`Get-Process node | Stop-Process` on Windows).

---

## 3.3 `lab3/prg3.js` — manual routing

```js
import http from "http";

const server = http.createServer((req,res)=>
{
    if(req.url == '/')
        res.end('<h1> Home Page</h1>')
    else if (req.url == '/about'){
        
        res.end("<h2>About Us Page</h2")}
    else if (req.url == '/product')
        res.end(`<h1>Mobile Phone</h1>
                 <h2>Price : 25000</h2>
                 <p>Discount: 5%</p>
                 <a href = '#'>Buy Now</a>`);
    else{
    res.statusCode = 404;
    res.end(
        `
       <h1>404, Not Found</h1>
       <p>Page not found</p>
       <a href = '/'>Home</a>`
    )
}

    
});



server.listen(3690,() => console.log("Server is running"));
```

**Explanation** — this is a **router** written by hand: `if/else` on `req.url`. The `else` branch is
the 404 handler.

**Two real bugs to notice**
1. `/about` responds with `"<h2>About Us Page</h2"` — the `>` is **missing** after `h2`. The browser
   still shows the text but the tag is malformed. Open View Source to confirm.
2. `req.url` includes the **query string**: `/product?id=1` will NOT match `"/product"`, so it falls to
   404. That's exactly why lab4 uses `url.parse`.

**Run:** visit `/`, `/about`, `/product`, `/nope`.

---

## 3.4 `lab3/prg4.js` — an e-commerce route set

```js
import http from 'http'

const server = http.createServer((req,res)=>{
    console.log("req.url : ",req.url);
    if(req.url == "/product"){
        res.end("<h1>procuct Page</h1>");
    } else if (req.url == "/cart"){
        res.end("<h1>product is added to cart</h1>")
    } else if(req.url === '/checkout'){
        res.end("<h1>Checkout page</h1>");
    } 
    else {
        res.statusCode = 404;
        res.end(`
            <h1>404, Not found</h1>
            <p>Page not found</p>
            <a href='/'>Home</a>`);
    }

})


server.listen(4444,()=> console.log("server is running"));
```

**Explanation** — same idea, different domain (product → cart → checkout). Note the 404 page links
back to `/`, which itself is not routed here and therefore also 404s — a nice exercise (add a `/` route).

---

## 3.5 `lab3/prg5.js` — serve JSON

```js
import http from 'http'
import { json } from 'stream/consumers';

const server = http.createServer((req,res)=>{
    res.writeHead(200,{"content-type":"application/json"});
    const product = {
        name:'Mobile',
        price: 25000,
        discout: "10%",
        company: "Samsung"
    };
   res.end(JSON.stringify(product));
})


server.listen(3000,()=> console.log("Server running"));
```

**Explanation** — an object cannot be sent over the wire; `JSON.stringify` turns it into text and the
`application/json` header tells the client to parse it. The unused `import { json }` is dead code
(remove it) and `discout` is a typo for `discount`.

**Run:** <http://localhost:3000/> → `{"name":"Mobile","price":25000,"discout":"10%","company":"Samsung"}`.
Chrome may pretty-print it.

---

## 3.6 `lab3/prg6.js` — generating a big file

```js
import {writeFile} from 'fs/promises'


for(let i=1; i<100000; i++){
    await writeFile('big.txt',`Hello Buddy: ${i}\n`, {flag: "a"});
}
```

**Explanation** — `{flag: "a"}` = **append** mode (same as `appendFile`). This writes ~100k lines, one
file open/close per line — *very* slow, which is the point of the next file: `big.txt` exists to make
reading it interesting.

**Better version (teaching moment):** build one big string once and `writeFile` it. Or use a
`createWriteStream` and `write` in a loop.

**Run:** `node lab3\prg6.js` then check `big.txt` size with `(Get-Item big.txt).Length`.

---

## 3.7 `lab3/prg7.js` — read whole file into memory

```js
import http from 'http'
import { readFile } from 'fs/promises';

const server = http.createServer(async (req,res)=>{
    const text = await readFile("big.txt")    
    res.end(text);
})

server.listen(3000,()=> console.log("server is running..."));
```

**Explanation** — works, but **every request** allocates the entire file in RAM. With 10 concurrent
requests on a 500 MB file you have 5 GB of memory use. This is the motivation for streams (prg9).

**Exercise:** add `console.log(process.memoryUsage())` inside the handler and compare with prg9.

---

## 3.8 `lab3/tempCodeRunnerFile.js` — event-style server

```js
import http from "http";

const server = http.createServer();
server.on('request',(req,res) => {
       res.write("Welcome to Server Side Programmming");
       res.end();
})

server.listen(5000,()=>{
    console.log("Server is running");
});
```

**Explanation** — `createServer(handler)` is *sugar* for `createServer()` + `.on('request', handler)`.
This file is VSCode's "Run Code" temp buffer, but it documents an important equivalence. `res.write`
can be called many times to stream pieces; `res.end()` finishes.

**Run:** <http://localhost:5000/> → "Welcome to Server Side Programmming".

---

## 3.9 `lab3/prg9.js` — streaming HTML, JSON and text files

```js
import { createReadStream } from 'fs';
import http from 'http'

const server = http.createServer((req,res)=>{
    if(req.url == "/"){
        res.setHeader("content-type","text/html");
        res.statusCode = 200;
    const stream = createReadStream('./pages/airtag.html',{encoding:"utf-8"});
    stream.pipe(res);
    }else if(req.url == '/mobile'){
        const stream = createReadStream("./data/products.json",{encoding:"utf-8"});
        res.writeHead(200,{"content-type":"text/json"});
        stream.pipe(res);
    }
    else if (req.url === '/manual'){

        const stream = createReadStream('./data/chatgpt.txt',{encoding:"utf-8"});
        res.writeHead(200,{"content-type":"text/plain"});
        stream.pipe(res);

    }else{
        res.statusCode = 404;
        res.end("Not Found");
    }
});

server.listen(3000,()=>console.log("prg9 is running at 3000...."));
```

**Explanation** — `createReadStream(path)` is a Readable; `.pipe(res)` is a Writable; `pipe`
connects them with backpressure, so memory stays constant regardless of file size. This is the most
important pattern for serving files.

**Run:** from `lab3` (`node prg9.js`), then:
- <http://localhost:3000/> → the **AirTag "Find My" dashboard** (see 3.10)
- <http://localhost:3000/mobile> → the 10-phone JSON array
- <http://localhost:3000/manual> → the ChatGPT paragraph as plain text
- anything else → `Not Found`

**Gotcha:** `text/json` is not a real MIME type — the correct one is `application/json`. Browsers
tolerate it. Also note the relative paths (`./pages/...`) mean you must `cd lab3` first, otherwise
`ENOENT`.

---

## 3.10 `lab3/pages/airtag.html` — a complete static page (547 lines)

This file is served by prg9 and demonstrates what "the server sends an HTML **file**" really means: a
full document with embedded CSS and JS.

**Key structure** (read it in VS Code; here are the parts that teach something):

```html
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display",
                     "Segoe UI", sans-serif; }
    body { background: #f5f5f7; color: #1d1d1f; min-height: 100vh; }

    header { height: 70px; background: rgba(255,255,255,0.9);
      backdrop-filter: blur(15px); border-bottom: 1px solid #ddd;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 7%; position: sticky; top: 0; z-index: 10; }

    .dashboard { display: grid; grid-template-columns: 1.5fr 1fr; gap: 25px; }

    .map { height: 520px; border-radius: 25px; overflow: hidden;
      position: relative;
      background:
        linear-gradient(45deg, #dce8d8 25%, transparent 25%),
        linear-gradient(-45deg, #dce8d8 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, #dce8d8 75%),
        linear-gradient(-45deg, transparent 75%, #dce8d8 75%);
      background-size: 80px 80px;
      background-position: 0 0, 0 40px, 40px -40px, -40px 0;
      border: 1px solid #ddd; }

    .pulse { animation: pulse 2s infinite; }
    @keyframes pulse {
      0%   { transform: scale(.8); opacity: .8; }
      70%  { transform: scale(1.4); opacity: .2; }
      100% { transform: scale(.8); opacity: .8; }
    }

    @media (max-width: 850px) {
      .dashboard { grid-template-columns: 1fr; }
      .map { height: 400px; }
      .menu { display: none; }
      .title h1 { font-size: 30px; }
    }
  </style>
```

**CSS techniques worth learning from this page**
- A **fake map**: four overlaid `linear-gradient`s with `background-size: 80px 80px` create a grid
  pattern — no image required.
- `.road` / `.road2`: absolutely-positioned white bars rotated 25° / -45° to look like streets.
- `.pulse` + `@keyframes` → the "radar ping" animation around the pin.
- `position: sticky; top: 0` header, `backdrop-filter: blur(15px)` frosted glass.
- `display: grid` two-column dashboard that collapses to one column under 850px.

**The markup**

```html
  <header>
    <div class="logo"><div class="airtag-logo">⌾</div> AirTag</div>
    <nav class="menu">
      <a href="#">Items</a><a href="#">People</a>
      <a href="#">Devices</a><a href="#">Account</a>
    </nav>
  </header>

  <main>
    <div class="title">
      <h1>Find My</h1>
      <p>Track your AirTag and keep your belongings close.</p>
    </div>

    <section class="dashboard">
      <div class="map">
        <div class="road"></div>
        <div class="road road2"></div>
        <div class="map-label">📍 Last known location</div>
        <div class="location"><div class="pulse"><div class="pin"></div></div></div>
      </div>

      <div class="panel">
        <div class="card">
          <div class="tag-header">
            <div class="tag-icon">⌾</div>
            <div><h2>Avish's Keys</h2><p>AirTag</p></div>
          </div>
          <div class="status" id="status">● Located just now</div>
          <div class="buttons">
            <button class="sound" onclick="playSound()">🔊 Play Sound</button>
            <button class="find" onclick="findNearby()">🧭 Find Nearby</button>
          </div>
        </div>

        <div class="card">
          <h3>Location</h3>
          <div class="info"><span>Distance</span><span id="distance">12 m away</span></div>
          <div class="info"><span>Last seen</span><span id="time">Just now</span></div>
          <div class="info"><span>Location</span><span>Ghaziabad, India</span></div>
        </div>

        <div class="card">
          <h3>Battery</h3>
          <div class="battery-container">
            <div class="battery-top"><span>Battery level</span><strong>78%</strong></div>
            <div class="battery-bar"><div class="battery-level"></div></div>
          </div>
        </div>

        <div class="card">
          <h3>AirTag Details</h3>
          <div class="info"><span>Item</span><span>Keys</span></div>
          <div class="info"><span>Tag ID</span><span>AT-2847</span></div>
          <div class="info"><span>Owner</span><span>Avish</span></div>
        </div>
      </div>
    </section>
  </main>
```

**The client-side JavaScript (bottom of the file) — DOM manipulation + `setTimeout`**

```html
  <script>
    function playSound() {
      const status = document.getElementById("status");
      status.innerHTML = "🔊 Playing sound...";
      setTimeout(() => {
        status.innerHTML = "● Sound finished";
      }, 3000);
    }

    function findNearby() {
      const distance = document.getElementById("distance");
      const status = document.getElementById("status");
      status.innerHTML = "🧭 Searching nearby...";
      setTimeout(() => {
        distance.innerHTML = "4 m away";
        status.innerHTML = "● AirTag found nearby";
      }, 2000);
    }

    // Update "last seen" time
    function updateTime() {
      const time = document.getElementById("time");
      const now = new Date();
      time.innerHTML =
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    updateTime();
  </script>
```

**What to try in the browser**
1. Click "Play Sound" → status changes instantly, then reverts after 3 s (a fake async action).
2. Click "Find Nearby" → distance changes from 12 m to 4 m after 2 s.
3. Resize the window under 850 px → layout becomes single-column and the nav disappears.

**Teaching point:** this is a *static* page — all state is hard-coded. Lab 7 (React) is about making
`status`/`distance` real **state** instead of `innerHTML` strings.

---

## 3.11 `lab3/data/products.json` — the phone catalogue (served by prg9)

```json
[
  {
    "id": 1, "brand": "Samsung", "model": "Galaxy S25", "price": 79999,
    "ram": "12GB", "storage": "256GB", "display": "6.2-inch AMOLED",
    "camera": "50MP", "battery": "4000mAh", "os": "Android 15"
  },
  {
    "id": 2, "brand": "Apple", "model": "iPhone 16", "price": 79900,
    "ram": "8GB", "storage": "128GB", "display": "6.1-inch OLED",
    "camera": "48MP", "battery": "3561mAh", "os": "iOS 18"
  },
  {
    "id": 3, "brand": "OnePlus", "model": "OnePlus 13", "price": 69999,
    "ram": "12GB", "storage": "256GB", "display": "6.82-inch AMOLED",
    "camera": "50MP", "battery": "6000mAh", "os": "Android 15"
  },
  {
    "id": 4, "brand": "Google", "model": "Pixel 9", "price": 79999,
    "ram": "12GB", "storage": "256GB", "display": "6.3-inch OLED",
    "camera": "50MP", "battery": "4700mAh", "os": "Android 14"
  },
  {
    "id": 5, "brand": "Xiaomi", "model": "Xiaomi 15", "price": 64999,
    "ram": "12GB", "storage": "512GB", "display": "6.36-inch AMOLED",
    "camera": "50MP", "battery": "5240mAh", "os": "Android 15"
  },
  {
    "id": 6, "brand": "Nothing", "model": "Nothing Phone 3", "price": 49999,
    "ram": "12GB", "storage": "256GB", "display": "6.7-inch AMOLED",
    "camera": "50MP", "battery": "5150mAh", "os": "Android 15"
  },
  {
    "id": 7, "brand": "Motorola", "model": "Edge 60 Pro", "price": 29999,
    "ram": "12GB", "storage": "256GB", "display": "6.7-inch pOLED",
    "camera": "50MP", "battery": "6000mAh", "os": "Android 15"
  },
  {
    "id": 8, "brand": "Realme", "model": "GT 7", "price": 39999,
    "ram": "12GB", "storage": "256GB", "display": "6.78-inch AMOLED",
    "camera": "50MP", "battery": "7000mAh", "os": "Android 15"
  },
  {
    "id": 9, "brand": "Vivo", "model": "Vivo X200", "price": 65999,
    "ram": "12GB", "storage": "256GB", "display": "6.67-inch AMOLED",
    "camera": "50MP", "battery": "5800mAh", "os": "Android 15"
  },
  {
    "id": 10, "brand": "OPPO", "model": "Find X8", "price": 69999,
    "ram": "12GB", "storage": "256GB", "display": "6.59-inch AMOLED",
    "camera": "50MP", "battery": "5630mAh", "os": "Android 15"
  }
]
```
*(Pretty-printed here for readability; the shipped file uses the same 10 records with the same
fields, one property per line.)*

**`lab3/data/chatgpt.txt`** (served at `/manual`)
```
ChatGPT is an AI-powered chatbot that can understand and generate human-like text. It can answer questions, explain difficult topics, help with coding, write content, summarize information, and assist with creative ideas. It is designed to make interacting with artificial intelligence simple and conversational.
```

---

## 3.12 `lab3/prg10.js` — method-aware routing (and its bug)

```js
import http from "http";

const server = http.createServer((req,res)=>{
    console.log("method")
    if(req.url == "/" && req.method === "GET"){
        res.end("<h1>Products details</h1>");
    }

    res.end("hello buddy");

})

server.listen(3000,()=>console.log("prg10 is running at port 3000"));
```

**Explanation / bug** — there is **no `return`** after the first `res.end`, so the handler continues
and calls `res.end("hello buddy")` on an already-finished response →
`ERR_STREAM_WRITE_AFTER_END` (or the second end is ignored depending on version). The browser shows
`<h1>Products details</h1>` because the first `end` already committed the body.

**Fix**
```js
    if (req.url === "/" && req.method === "GET") {
        return res.end("<h1>Products details</h1>");
    }
    res.statusCode = 404;
    res.end("hello buddy");
```
**This single bug is the best reason to learn Express**: `return res.send(...)` in route handlers and
Express stops there for you.

---

## 3.13 `lab3/prg11.js` — a full REST-ish API on raw `http`

```js
import http from "http";

const server = http.createServer((req,res)=>{
    if(req.url === '/' && req.method === 'GET'){
        res.end('home page')
    }
    else if(req.url === '/product'&& req.method === 'GET'){
        const products = [{
            id:1,
            name:'mobile',
            price: 2000,
        },{
            id:2,
            name:"duster",
            price:10,
        },
    ];
        res.end(JSON.stringify(products));
    }
    else if(req.url ==='/product' && req.method === 'POST'){
        //retrive data from client
        let body = "" ;
        req.on("data",(chunk)=>{
            body += chunk;
        })

        req.on("end",()=>{
            const products = JSON.parse(body)
        })
        // add data to database
        res.writeHead(201,{
            "content-type":"application/json",
        })
        //send back the status
        res.end(JSON.stringify({
            msg:"product added",
            products,
        }))
        res.end('add product')
    }
    else if(req.url ==='/product' && req.method === 'PUT'){
        res.end("update product")
    }else if(req.url ==='/product' && req.method === 'DELETE'){
        res.end('remove product')
    }else{
        res.statusCode = 400;
        res.end("not found");
    }
});

server.listen(3000,()=> console.log("your prg10 is running"));
```

**What it teaches**
- The **same path** `/product` behaves differently per **method** → this is the REST idea
  (GET=list, POST=create, PUT=update, DELETE=remove).
- **Reading the body**: accumulate `chunk`s on `"data"`, act on `"end"`. HTTP bodies arrive in pieces.

**Bugs (intentional teaching gold)**
1. `products` in the POST branch is declared **inside** `req.on("end", ...)` but used **outside** it →
   `ReferenceError: products is not defined` (or, in some scopes, an outer declaration). The `end`
   callback also runs asynchronously, *after* the response has already been sent.
2. `res.end()` is called **twice** (once with JSON, once with `'add product'`).
3. A POST without `Content-Type: application/json` body → `JSON.parse("")` throws.

**Correct pattern (compare with lab4's `parseJSONBody`)**: wrap body reading in a Promise, `await` it,
*then* send exactly one response.

**Run + test**
```powershell
node lab3\prg11.js
# in another terminal:
curl.exe http://localhost:3000/product
curl.exe -X POST http://localhost:3000/product -H "Content-Type: application/json" -d '{\"name\":\"pen\"}'
```

---

## Lab 3 recap quiz

1. Difference between `res.writeHead(404,{...})` and `res.statusCode = 404`?
2. Why does `/product?x=1` break `prg3.js`?
3. Why is `stream.pipe(res)` better than `res.end(await readFile(...))`?
4. What happens if you never call `res.end()`?
5. What must change in the POST handler of prg11 for it to actually echo the body?

---

# LAB 4 — A Real REST API: `/api/v1/teams` (raw `http`, but properly architectured)

**Goal:** take everything from lab3 and build a small **versioned REST API** with a *repository module*
separated from the *router*, correct status codes, body parsing, and query-string parsing.

**Concepts**

- **REST** = resources + HTTP verbs + status codes. `/api/v1/teams` is the collection;
  `/api/v1/teams/:id` is a single resource.
- **Versioning** (`v1`) lets you change the API later without breaking clients.
- **`url.parse(req.url, true)`** splits `/api/v1/teams/3?x=1` into
  `{ pathname: "/api/v1/teams/3", query: { x: "1" } }`. This fixes lab3's query-string bug.
- **Layered design:** `app.js` (HTTP concerns) + `teams.js` (data concerns). Swap the array for a
  database later and `app.js` barely changes.
- **Response envelope**: `{ count, data }`, `{ Message, data }`, `{ error }` — consistent shapes make
  clients simple.

**`lab4/package.json`**
```json
{
  "name": "lab-4",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "devDependencies": {
    "install": "^0.13.0",
    "nodemon": "^3.1.14",
    "to": "^0.2.9"
  }
}
```
> `install` and `to` are accidental dependencies (probably from a mistyped `npm i ... to install ...`).
> They are harmless but should be removed: `npm uninstall install to`.

---

## 4.1 `lab4/teams.js` — the data layer (repository pattern)

```js
let teams = [
    {id:1,
    tname:"Rusty",
    tl:'Aashish Raj Singh',
    email: "Ashi.raj@gamil.com",
    members: 6,
},
    {id:2,
    tname:"code Crafter",
    tl:'Manisha Singh',
    email: "mani.singh@gamil.com",
    members: 5,
},
];

let nextId = 3;


export const getAllTeams = ()=> teams;

export const getTeamById = (id)=> teams.find((team)=> team.id === id);

export const addTeam = (newTeam) => {
    const team = {id:nextId++, newTeam};
    teams.push(team);
    return team;
}


export const updateTeamById = (id, updateTeam)=>{
    const team = getTeamById(id);
    if(!team){
        return null;
    }
    Object.assign(team, updateTeam);
    return team;
}


export const deleteTeam = (id)=>{
    const index = teams.findIndex((team)=>team.id === id);
    if(index == -1) return false;
    teams.splice(index, 1);
    return true;
}
```

**Explanation**

| Function | Technique | Note |
|---|---|---|
| `getAllTeams` | returns the array | returns a **reference** — callers could mutate it. Safer: `return [...teams]` |
| `getTeamById` | `Array.find` | returns `undefined` if missing |
| `addTeam` | `nextId++` | post-increment: uses 3, then sets 4 — so ids are 1,2,3,4… |
| `updateTeamById` | `Object.assign` | **mutates** the existing object (in-place patch, like PATCH) |
| `deleteTeam` | `findIndex` + `splice` | `splice` mutates; `filter` would return a new array |

**Bug worth teaching:** `addTeam` stores `{id: 3, newTeam: {...}}` — it **nests** the payload under a
`newTeam` key instead of spreading it. So a created team looks like
`{"id":3,"newTeam":{"tname":"...","tl":"...","members":...}}` and `tname` is then `undefined` for that
record. Fix: `const team = { id: nextId++, ...newTeam };`. (Spotting this is a great exercise: create a
team via POST, then GET it and compare shapes.)

---

## 4.2 `lab4/app.js` — the HTTP layer

```js
import http from "http";
// import * as teams from "teams.js";
import { getAllTeams, addTeam, getTeamById, deleteTeam, updateTeamById } from "./teams.js";
import { parse as parseUrl } from "url";

const PORT = 5000;

const sendJson = (res, statusCode, data, keyword, msg) => {
  res.writeHead(statusCode, { "content-type": "application/json" });
  res.end(data === "undefined" ? "" : JSON.stringify({ [keyword]: msg, data }));
};

const parseJSONBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
};

const server = http.createServer(async (req, res) => {
  const { pathname, query } = parseUrl(req.url, true);
  const { method } = req;
  console.log("pathname:", pathname);
  console.log("query:", query);
  console.log("Method:", method);

  if (pathname === "/api/v1/teams" && method === "GET") {
    let teams = getAllTeams();
    return sendJson(res, 200, teams, "count", teams.length);
  } else if (pathname === "/api/v1/teams" && method == "POST") {
    const { tname, tl, members } = await parseJSONBody(req);
    if (!tname || !tl || !members)
      return sendJson(res,400, {
        error: "Team Name, Team Leader, or Members not defined",
      });
    const team = addTeam({ tname, tl, members });

    return sendJson(res, 201, team, "Message", "Team registered successfully");
  } 
  else if(pathname.startsWith("/api/v1/teams/")&& method === "GET"){
    const id = Number(pathname.split("/").pop());
    const team = getTeamById(id);

    if(!team)
      return sendJson(res,400 ,{
    erro: `Team with id: ${id} not found`,});
    return sendJson(res, 200, team, "Message", "Team Found");
  }
  
   else if(pathname.startsWith("/api/v1/teams/")&& method === "DELETE"){
    const id = Number(pathname.split("/").pop());
    const team = getTeamById(id);
    
    if(!team)
      return sendJson(res, 404, {
       error: `Team with id: ${id} not found`,
    });
    deleteTeam(id);

    return sendJson(res, 200, team, "Message", "Team Found");
  }

else if (pathname.startsWith("/api/v1/teams/") && method == "PUT") {
  const id = Number(pathname.split("/").pop());
  const oldteam = getTeamById(id);

   if(!oldteam)
      return sendJson(res, 404, {
       error: `Team with id: ${id} not found`,
    });

    const { tname, tl, members } = await parseJSONBody(req);
    if (!tname || !tl || !members)
      return sendJson(res,400, {
        error: "Team Name, Team Leader, or Members not defined",
      });

    
      const updateTeam = updateTeamById(id,{tname, tl, members});
    return sendJson(res, 200, updateTeam, "Message", "Team updated successfully");
  } 
  
  else {
    res.statusCode = 404;
    res.end("Not matching");
  }
});

server.listen(PORT, () => {
  console.log("SIH Server is running at ", PORT);
});
```

**Explanation of each helper**

- **`sendJson(res, status, data, keyword, msg)`** — the single exit point for JSON. Note the bug:
  `data === "undefined"` compares a value against the *string* `"undefined"`; it should be
  `typeof data === "undefined"`. As written, the guard almost never triggers. Also, when a caller passes
  only `{error: ...}` as `data`, the envelope becomes `{"undefined": null, "data": {"error": ...}}`
  — messy but harmless. A cleaner signature would be `sendJson(res, status, payload)`.
- **`parseJSONBody(req)`** — wraps a **stream** in a **Promise** so the handler can `await` it. This is
  the correct version of lab3's broken POST. `reject` on parse error and on stream error.
- **`parseUrl(req.url, true)`** — `true` = also parse the query string into an object.
- **`pathname.split("/").pop()`** — for `/api/v1/teams/3` → `"3"` → `Number("3")` → `3`. For
  `/api/v1/teams/abc` → `NaN` → `getTeamById(NaN)` → `undefined` → 400.
- **`return sendJson(...)`** — returns immediately and exits the handler (the fix for prg10's bug).

**Route table**

| Method | Path | Status on success | Body |
|---|---|---|---|
| GET | `/api/v1/teams` | 200 | `{count: N, data: [...]}` |
| GET | `/api/v1/teams/:id` | 200 / 400 | `{Message, data}` / `{erro}` |
| POST | `/api/v1/teams` | 201 / 400 | `{Message, data}` / `{error}` |
| PUT | `/api/v1/teams/:id` | 200 / 400 / 404 | `{Message, data}` |
| DELETE | `/api/v1/teams/:id` | 200 / 404 | `{Message, data}` (the deleted team) |
| * | anything else | 404 | plain text `Not matching` |

**Run and test**

```powershell
cd lab4
npm install
node app.js          # "SIH Server is running at 5000"

# list
curl.exe http://localhost:5000/api/v1/teams

# read one
curl.exe http://localhost:5000/api/v1/teams/1

# create
curl.exe -X POST http://localhost:5000/api/v1/teams -H "Content-Type: application/json" -d '{\"tname\":\"Byte Squad\",\"tl\":\"Avish\",\"members\":4}'

# full update
curl.exe -X PUT http://localhost:5000/api/v1/teams/1 -H "Content-Type: application/json" -d '{\"tname\":\"Rusty\",\"tl\":\"Aashish\",\"members\":7}'

# delete
curl.exe -X DELETE http://localhost:5000/api/v1/teams/2
```

**Consistency issues to fix as exercises**
1. GET-by-id returns **400** when not found; DELETE/PUT return **404**. Use 404 everywhere (400 means
   "bad request", 404 means "doesn't exist").
2. DELETE responds with `"Team Found"` — should be `"Team deleted"`.
3. `erro` typo in the GET-by-id error object.
4. Data lives in memory → restarting the server loses everything. (Next step: persist to
   `teams.json` using lab2's `fs/promises`.)
5. Note that the `parseUrl` import uses the legacy `url` module; modern code uses `new URL(req.url,
   "http://localhost")`.

---

# LAB 5 — Express.js: Routing, Static Files, and Serving a Website

**Goal:** replace manual `if/else` routing with Express, serve a multi-page static site, and see the
difference between `res.send`, `res.sendFile`, and `express.static`.

**Concepts**

- **Express** = thin framework over `http`: routing, `req.params`, `req.query`, `req.body` (with
  middleware), `res.send/json/status/sendFile`, and **middleware** (`app.use`).
- **Middleware** is a function `(req, res, next)` run in order — `express.static` is middleware.
- `app.use(handler)` with no path = "matches everything"; placed **last**, it becomes the 404 handler.
- **Static hosting**: everything inside the folder passed to `express.static` is publicly reachable by
  its relative path (`/styles.css`, `/images/a.png`) — no routes needed.
- `__dirname` does not exist in ESM → use `fileURLToPath(import.meta.url)` + `path.dirname`.

**Setup (from `lab5/readme.md`)**
```
1. create npm project `npm init -y `
2. update package.json `type:module`
3. install nodemon with `npm i nodemon -D`
4. install express with `npm i express`
5. update package.json
"scripts" : { "start" : "node app.js", "dev" : "nodemon app.js" }
```

**`lab5/package.json`**
```json
{
  "name": "lab5",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon prg2.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "devDependencies": { "nodemon": "^3.1.14" },
  "dependencies": { "express": "^5.2.1" }
}
```

---

## 5.1 `lab5/app.js` — the five HTTP verbs in 28 lines

```js
import express from "express";
const app = express();

app.get("/",(req,res)=>{
    res.send("<h1> Hello Express");
});

app.get('/about',(req,res)=>{
    res.send("WE are FSD Developer")
})

app.post('/login',(req,res)=>{
    res.send({msg:'user login'})
})

app.put('/user/update/1',(req,res)=>{
    res.send({msg:'user update'})
})

app.delete('/users/1',(req,res)=>{
    res.send({msg: 'remove user 1'})
})

app.use((req,res)=>{
    res.status(404).send("Not Found")
})

app.listen(3000, () => console.log("Server is running"));
```

**Explanation**
- `app.get/post/put/delete(path, handler)` — routing is declarative; no manual `req.method` checks.
- `res.send(string)` → `text/html`. `res.send(object)` → **automatically `application/json`**. That one
  behaviour saves a `JSON.stringify` + header every time.
- The final `app.use(404)` catches every unmatched request — the Express replacement for lab3's `else`.
- `app.listen(3000)` = `server.listen(3000)`.

**Run:** `node lab5\app.js`, then visit `/`, `/about`. `/login` via GET also returns 404 (because only
POST is registered) — good demonstration that routes are method+path pairs.

```powershell
curl.exe -X POST http://localhost:3000/login
curl.exe -X PUT  http://localhost:3000/user/update/1
curl.exe -X DELETE http://localhost:3000/users/1
```

---

## 5.2 `lab5/prg1.js` — `sendFile` + `express.static` (serves `public/`)

```js
import express from "express"
import path from 'path'
import {fileURLToPath} from "node:url";

const PORT = 3333;
const app = express();

const filename = fileURLToPath(import.meta.url); // reference of root folder
const dirname = path.dirname(filename);           // store the address of project folder



app.get("/",(req,res)=>{
    res.sendFile(path.join(dirname,"public","index.html"));
    // projectFolder/public/index.html
});

app.get("/about",(req,res)=>{
    res.sendFile(path.join(dirname,"public","about.html"));
});

app.get("/enquiry",(req,res)=>{
    res.sendFile(path.join(dirname,"public","enquiry.html"));
});

app.use(express.static(path.join(dirname, "public")));

app.listen(PORT,() => console.log("prg1 is running at ", PORT));
```

**Explanation**
- `fileURLToPath(import.meta.url)` → absolute path of `prg1.js`; `path.dirname(...)` → its folder.
  This is the ESM equivalent of CommonJS `__dirname`.
- `path.join(dirname,"public","index.html")` → **portable** path (correct separators on Windows).
- `res.sendFile(absPath)` streams the file and sets the content type from the extension.
- `app.use(express.static("public"))` is registered **after** the routes: `/` still maps to index.html
  via the route, and `/styles.css` is found by the static middleware. `express.static` alone would
  already serve `/index.html` and, with an `index.html` present, `/`.

**Run:** `node lab5\prg1.js` → <http://localhost:3333/>. Screenshot: `lab5-home.png` (see §5.6).

---

## 5.3 `lab5/prg2.js` — static only, different folder

```js
import express from "express"
import path from 'path'
import {fileURLToPath} from "node:url";


const PORT = 4444;

const app = express();

const filename = fileURLToPath(import.meta.url); // reference of root folder
const dirname = path.dirname(filename);           // store the address of project folder


app.use(express.static(path.join(dirname, "frontend")));

app.use((req,res)=>{
    res.status(404).send("Resource not found");
});

app.listen(PORT,() => console.log(`prg2 is running at `, PORT));
```

**Explanation** — same idea, but serves the **`frontend/`** folder and has only an auto-index page
(`index.html`). Any unknown path → the 404 middleware. This is the minimal "host a static site"
server; it's also the `npm run dev` target in lab5's package.json.

**Run:** `node lab5\prg2.js` → <http://localhost:4444/>. Screenshot: `lab5-frontend-home.png`.

---

## 5.4 `lab5/public/` — the Northstar Studio site (served by prg1.js)

Three pages + one stylesheet. This is the reference implementation of the design.

**`lab5/public/index.html`**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Northstar Studio creates thoughtful digital identities and experiences.">
  <title>Northstar Studio | Make it matter</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="site-header">
    <a class="brand" href="index.html" aria-label="Northstar Studio home"><span class="brand-mark">✦</span> NORTHSTAR</a>
    <nav class="site-nav" aria-label="Main navigation">
      <a class="active" href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="enquiry.html">Enquiry</a>
    </nav>
    <a class="header-cta" href="enquiry.html">Start a project <span>↗</span></a>
  </header>

  <main>
    <section class="hero page-width">
      <div class="hero-copy reveal">
        <p class="eyebrow"><span class="eyebrow-line"></span> Independent creative studio · Est. 2018</p>
        <h1>Make something<br><em>matter.</em></h1>
        <p class="hero-intro">We build clear, characterful brands and digital experiences for people shaping what comes next.</p>
        <a class="button button-dark" href="enquiry.html">Tell us everything <span>↗</span></a>
      </div>
      <div class="hero-art reveal reveal-delay" aria-label="Abstract sunrise artwork" role="img">
        <div class="orbit orbit-one"></div>
        <div class="orbit orbit-two"></div>
        <div class="sun"></div>
        <div class="art-caption">FIELD NOTE 001<br><strong>Ideas worth<br>following.</strong></div>
        <span class="art-coordinate">18° 31' N<br>73° 51' E</span>
      </div>
    </section>

    <section class="statement band-light">
      <div class="page-width statement-grid">
        <p class="eyebrow">01 / The north star</p>
        <div>
          <h2>Good work has a point of view.</h2>
          <p class="large-copy">Strategy gives it direction. Design gives it a voice. We bring both together to help ambitious teams move with confidence.</p>
        </div>
      </div>
    </section>

    <section class="services page-width">
      <div class="section-heading">
        <p class="eyebrow">02 / What we do</p>
        <h2>From first thought<br>to <em>full flight.</em></h2>
      </div>
      <div class="service-list">
        <article class="service-item"><span>01</span><h3>Brand direction</h3><p>Positioning, naming and identity systems with a pulse.</p><b>↗</b></article>
        <article class="service-item"><span>02</span><h3>Digital experiences</h3><p>Websites and products that feel as good as they work.</p><b>↗</b></article>
        <article class="service-item"><span>03</span><h3>Launch momentum</h3><p>Campaigns, content and toolkits built to travel.</p><b>↗</b></article>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="page-width footer-inner"><a class="brand" href="index.html"><span class="brand-mark">✦</span> NORTHSTAR</a><p>Good ideas deserve a clear sky.</p><a href="enquiry.html">Let’s talk ↗</a></div>
    <div class="page-width footer-bottom"><span>© 2026 Northstar Studio</span><span>Pune · India</span></div>
  </footer>
</body>
</html>
```

**`lab5/public/about.html`**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Meet Northstar Studio, an independent creative studio based in Pune.">
  <title>About | Northstar Studio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="site-header">
    <a class="brand" href="index.html" aria-label="Northstar Studio home"><span class="brand-mark">✦</span> NORTHSTAR</a>
    <nav class="site-nav" aria-label="Main navigation"><a href="index.html">Home</a><a class="active" href="about.html">About</a><a href="enquiry.html">Enquiry</a></nav>
    <a class="header-cta" href="enquiry.html">Start a project <span>↗</span></a>
  </header>
  <main>
    <section class="page-hero page-width">
      <p class="eyebrow"><span class="eyebrow-line"></span> About the studio</p>
      <h1>Curious by<br><em>nature.</em></h1>
      <p class="hero-intro">Northstar is a small, senior-led creative studio for organisations with something meaningful to say.</p>
    </section>
    <section class="about-intro"><div class="page-width"><h2>We believe the best work starts with a better question.</h2></div></section>
    <section class="about-grid page-width">
      <div><p class="eyebrow">01 / Our way</p><h2>Small team.<br>Wide lens.</h2></div>
      <div><p>We work at the intersection of strategy, design and technology. That means we can zoom out to find the real opportunity, then zoom in until every detail earns its place.</p><p>Our team stays intentionally compact. You get senior thinking, direct communication and the flexibility to make the work better as it takes shape.</p></div>
    </section>
  </main>
  <footer class="site-footer"><div class="page-width footer-inner"><a class="brand" href="index.html"><span class="brand-mark">✦</span> NORTHSTAR</a><p>Good ideas deserve a clear sky.</p><a href="enquiry.html">Let’s talk ↗</a></div><div class="page-width footer-bottom"><span>© 2026 Northstar Studio</span><span>Pune · India</span></div></footer>
</body>
</html>
```

**`lab5/public/enquiry.html`** — the only page with JavaScript (client-side form handling)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Start a project with Northstar Studio.">
  <title>Enquiry | Northstar Studio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="site-header">
    <a class="brand" href="index.html" aria-label="Northstar Studio home"><span class="brand-mark">✦</span> NORTHSTAR</a>
    <nav class="site-nav" aria-label="Main navigation"><a href="index.html">Home</a><a href="about.html">About</a><a class="active" href="enquiry.html">Enquiry</a></nav>
    <a class="header-cta" href="enquiry.html">Start a project <span>↗</span></a>
  </header>
  <main>
    <section class="contact-layout page-width">
      <div>
        <p class="eyebrow"><span class="eyebrow-line"></span> Your next chapter</p>
        <h1>Let’s make<br><em>some noise.</em></h1>
        <p class="hero-intro">Tell us what you’re building, where you’re stuck or what you’re dreaming about. We read every note.</p>
        <p class="contact-detail">Prefer a direct line?<br><a href="mailto:hello@northstar.studio">hello@northstar.studio</a><br>+91 98765 43210</p>
      </div>
      <form class="enquiry-form" id="enquiryForm">
        <div class="form-row"><div class="field"><label for="name">Your name</label><input id="name" name="name" type="text" autocomplete="name" required></div><div class="field"><label for="email">Email address</label><input id="email" name="email" type="email" autocomplete="email" required></div></div>
        <div class="field"><label for="company">Company / project</label><input id="company" name="company" type="text"></div>
        <div class="field"><label for="scope">What can we help with?</label><select id="scope" name="scope" required><option value="" selected disabled>Choose a direction</option><option>Brand direction</option><option>Digital experience</option><option>Launch momentum</option><option>Something else</option></select></div>
        <div class="field"><label for="message">A few words about it</label><textarea id="message" name="message" required></textarea></div>
        <div class="form-submit"><button class="button button-dark" type="submit">Send enquiry <span>↗</span></button><p class="form-status" id="formStatus" role="status" aria-live="polite"></p></div>
      </form>
    </section>
  </main>
  <footer class="site-footer"><div class="page-width footer-inner"><a class="brand" href="index.html"><span class="brand-mark">✦</span> NORTHSTAR</a><p>Good ideas deserve a clear sky.</p><a href="about.html">Meet the studio ↗</a></div><div class="page-width footer-bottom"><span>© 2026 Northstar Studio</span><span>Pune · India</span></div></footer>
  <script>
    document.getElementById('enquiryForm').addEventListener('submit', function (event) {
      event.preventDefault();
      const name = document.getElementById('name').value.trim();
      document.getElementById('formStatus').textContent = `Thanks, ${name}. We will be in touch soon.`;
      this.reset();
    });
  </script>
</body>
</html>
```

**Explanation of the form JS** — `submit` triggers a full page reload by default, which would lose the
message. `event.preventDefault()` stops that, reads the input, writes a status line, and clears the
form. `role="status" aria-live="polite"` makes screen readers announce the message. Note the data never
leaves the browser — wiring this to a real `POST` is the natural follow-up exercise once lab6's API
exists.

**`lab5/public/styles.css`** — design system for all three pages
```css
:root {
  --ink: #17231f;
  --paper: #f4f0e8;
  --paper-deep: #e8e1d4;
  --coral: #f26f5b;
  --mint: #b9d7c6;
  --yellow: #f2c94c;
  --line: rgba(23, 35, 31, .18);
  --muted: #66716b;
  --display: 'Syne', sans-serif;
  --mono: 'DM Mono', monospace;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; background: var(--paper); color: var(--ink); font-family: var(--display); }
a { color: inherit; text-decoration: none; }
.page-width { width: min(1180px, calc(100% - 96px)); margin-inline: auto; }
.site-header { display: flex; align-items: center; justify-content: space-between; gap: 24px; width: min(1280px, calc(100% - 64px)); margin: 0 auto; padding: 28px 0; }
.brand { display: inline-flex; align-items: center; gap: 9px; font-size: 14px; font-weight: 800; letter-spacing: .12em; white-space: nowrap; }
.brand-mark { display: grid; place-items: center; width: 24px; height: 24px; background: var(--coral); font-size: 15px; letter-spacing: 0; }
.site-nav { display: flex; gap: 34px; font: 12px var(--mono); text-transform: uppercase; letter-spacing: .06em; }
.site-nav a { color: var(--muted); transition: color .2s ease; }
.site-nav a:hover, .site-nav a.active { color: var(--ink); }
.site-nav a.active::before { content: '•'; color: var(--coral); margin-right: 7px; }
.header-cta { font: 12px var(--mono); border-bottom: 1px solid var(--ink); padding-bottom: 5px; }
.header-cta span, .button span { margin-left: 14px; font-size: 17px; }
.hero { min-height: 650px; display: grid; grid-template-columns: .93fr 1.07fr; align-items: center; gap: 70px; padding-top: 45px; padding-bottom: 105px; }
.eyebrow { display: flex; align-items: center; gap: 12px; margin: 0 0 25px; color: var(--muted); font: 11px var(--mono); letter-spacing: .04em; text-transform: uppercase; }
.eyebrow-line { width: 32px; height: 1px; background: var(--coral); }
h1, h2, h3, p { margin-top: 0; }
h1 { max-width: 620px; margin-bottom: 27px; font-size: clamp(64px, 8.5vw, 122px); line-height: .88; letter-spacing: -.09em; font-weight: 700; }
h1 em, h2 em { color: var(--coral); font-style: normal; }
.hero-intro { max-width: 385px; margin-bottom: 36px; color: #53605a; font: 16px/1.6 var(--mono); }
.button { display: inline-flex; align-items: center; padding: 17px 22px; font: 12px var(--mono); letter-spacing: .04em; transition: transform .2s ease, background .2s ease; }
.button:hover { transform: translateY(-3px); }
.button-dark { background: var(--ink); color: var(--paper); }
.hero-art { position: relative; min-height: 510px; overflow: hidden; background: var(--coral); isolation: isolate; }
.hero-art::before { content: ''; position: absolute; inset: 0; opacity: .18; background-image: linear-gradient(90deg, transparent 49%, var(--paper) 50%, transparent 51%), linear-gradient(0deg, transparent 49%, var(--paper) 50%, transparent 51%); background-size: 46px 46px; }
.sun { position: absolute; width: 275px; height: 275px; border-radius: 50%; background: var(--yellow); left: 50%; top: 48%; transform: translate(-50%, -50%); box-shadow: 0 0 0 1px rgba(23, 35, 31, .15); }
.orbit { position: absolute; z-index: -1; width: 550px; height: 220px; border: 1px solid var(--ink); border-radius: 50%; left: 50%; top: 48%; transform: translate(-50%, -50%) rotate(-26deg); }
.orbit-two { width: 680px; height: 340px; transform: translate(-50%, -50%) rotate(37deg); }
.art-caption { position: absolute; left: 29px; bottom: 28px; font: 10px/1.4 var(--mono); letter-spacing: .08em; }
.art-caption strong { display: block; margin-top: 9px; font: 700 26px/1.05 var(--display); letter-spacing: -.05em; }
.art-coordinate { position: absolute; right: 25px; top: 24px; font: 10px/1.5 var(--mono); text-align: right; }
.band-light { background: var(--mint); }
.statement { padding: 105px 0 110px; }
.statement-grid { display: grid; grid-template-columns: .55fr 1fr; gap: 100px; }
.statement h2, .section-heading h2 { max-width: 700px; margin-bottom: 25px; font-size: clamp(43px, 6vw, 76px); line-height: .93; letter-spacing: -.08em; }
.large-copy { max-width: 615px; margin: 0; color: #4c6459; font: 17px/1.7 var(--mono); }
.services { display: grid; grid-template-columns: .65fr 1fr; gap: 100px; padding-top: 125px; padding-bottom: 125px; }
.section-heading h2 { font-size: clamp(44px, 5vw, 68px); }
.service-list { border-top: 1px solid var(--line); }
.service-item { display: grid; grid-template-columns: 45px 1fr 28px; grid-template-rows: auto auto; align-items: start; column-gap: 14px; padding: 25px 0 29px; border-bottom: 1px solid var(--line); }
.service-item span, .service-item p { font: 11px var(--mono); color: var(--muted); }
.service-item span { grid-row: 1 / span 2; padding-top: 5px; }
.service-item h3 { margin: 0 0 8px; font-size: 22px; letter-spacing: -.05em; }
.service-item p { grid-column: 2; margin: 0; line-height: 1.5; }
.service-item b { grid-column: 3; grid-row: 1 / span 2; font-size: 20px; font-weight: 400; }
.site-footer { background: var(--ink); color: var(--paper); padding: 48px 0 22px; }
.footer-inner { display: flex; align-items: center; justify-content: space-between; padding-bottom: 55px; }
.footer-inner p { margin: 0; color: #aebbb3; font: 13px var(--mono); }
.footer-inner > a:last-child { color: var(--yellow); font: 13px var(--mono); }
.footer-bottom { display: flex; justify-content: space-between; padding-top: 20px; border-top: 1px solid rgba(244, 240, 232, .2); color: #91a098; font: 10px var(--mono); }
.page-hero { padding: 100px 0 125px; }
.page-hero h1 { max-width: 850px; margin-bottom: 30px; font-size: clamp(64px, 10vw, 145px); }
.page-hero .hero-intro { max-width: 600px; }
.about-intro { background: var(--coral); padding: 100px 0; }
.about-intro h2 { max-width: 900px; margin: 0; font-size: clamp(40px, 5.4vw, 75px); line-height: .95; letter-spacing: -.08em; }
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 100px; padding: 120px 0; }
.about-grid h2 { margin: 0 0 20px; font-size: 42px; letter-spacing: -.07em; }
.about-grid p { color: #56635d; font: 15px/1.8 var(--mono); }
.contact-layout { display: grid; grid-template-columns: .85fr 1.15fr; gap: 110px; padding: 65px 0 120px; }
.contact-layout h2 { margin-bottom: 24px; font-size: clamp(44px, 5vw, 70px); line-height: .92; letter-spacing: -.08em; }
.contact-detail { margin-top: 70px; color: var(--muted); font: 12px/1.8 var(--mono); }
.contact-detail a { color: var(--ink); border-bottom: 1px solid var(--coral); }
.enquiry-form { border-top: 1px solid var(--line); }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.field { display: flex; flex-direction: column; gap: 10px; padding: 22px 0; border-bottom: 1px solid var(--line); }
.field label { font: 10px var(--mono); color: var(--muted); text-transform: uppercase; letter-spacing: .05em; }
.field input, .field select, .field textarea { width: 100%; border: 0; outline: 0; padding: 0; resize: vertical; background: transparent; color: var(--ink); font: 18px var(--display); }
.field input:focus, .field select:focus, .field textarea:focus { color: var(--coral); }
.field textarea { min-height: 105px; }
.form-submit { display: flex; align-items: center; gap: 20px; margin-top: 28px; }
.form-submit button { border: 0; cursor: pointer; }
.form-status { margin: 0; color: #3e7657; font: 12px var(--mono); }
.reveal { animation: rise .8s ease both; }
.reveal-delay { animation-delay: .15s; }
@keyframes rise { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@media (max-width: 760px) {
  .page-width { width: min(100% - 40px, 560px); }
  .site-header { width: calc(100% - 40px); flex-wrap: wrap; padding: 20px 0; }
  .site-nav { order: 3; width: 100%; justify-content: space-between; gap: 10px; }
  .header-cta { display: none; }
  .hero, .statement-grid, .services, .about-grid, .contact-layout { grid-template-columns: 1fr; gap: 45px; }
  .hero { min-height: 0; padding-top: 70px; padding-bottom: 80px; }
  .hero-art { min-height: 360px; }
  .sun { width: 190px; height: 190px; }
  .orbit { width: 430px; height: 170px; }
  .orbit-two { width: 500px; height: 260px; }
  .statement, .about-intro { padding: 75px 0; }
  .services, .about-grid { padding-top: 80px; padding-bottom: 80px; }
  .statement-grid { gap: 10px; }
  .contact-layout { padding-top: 40px; padding-bottom: 80px; gap: 30px; }
  .contact-detail { margin-top: 35px; }
  .form-row { grid-template-columns: 1fr; gap: 0; }
  .footer-inner { align-items: flex-start; flex-direction: column; gap: 22px; padding-bottom: 38px; }
  .footer-bottom { gap: 10px; flex-direction: column; }
}
```

**CSS lesson list (in order of appearance)**
1. **CSS custom properties** on `:root` → one place to change the palette.
2. **`min()`/`clamp()`** for fluid width and typography (`font-size: clamp(64px, 8.5vw, 122px)`).
3. **`h1 em`** styled as coral, non-italic → the "matter." accent.
4. **Pseudo-element artwork**: `.hero-art::before` draws a grid; `.orbit` ellipses rotated with
   `transform: translate(-50%,-50%) rotate(...)`; `.sun` is a yellow circle.
5. **`font:` shorthand** (`font: 12px var(--mono)`) sets size+family at once.
6. **Grid layouts** with fractional columns (`grid-template-columns: .93fr 1.07fr`).
7. **Entry animation** `.reveal` + `@keyframes rise`, staggered via `.reveal-delay`.
8. **One media query at 760px** rewrites every grid to a single column, hides the header CTA.

---

## 5.5 `lab5/frontend/` — the earlier variant of the same site

`frontend/` is an *older/alternate* build: same content, different class names (`logo`, `nav`,
`kicker`, `lead`, `strip`, `footer` instead of `brand`, `site-nav`, `eyebrow`, `hero-intro`,
`band-light`, `site-footer`), an external `<script src="prg2.js" defer>` reference that does not exist
in the folder (so the console shows a 404 — good example of "why is my JS not running?"), and a
slightly different stylesheet. Served by `prg2.js` on port 4444.

**`lab5/frontend/index.html`**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Northstar Studio creates clear, characterful brands and digital experiences.">
  <title>Northstar Studio | Make it matter</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css"><script src="prg2.js" defer></script>
</head>
<body data-page="home">
  <header class="site-header"><a class="logo" href="index.html"><span class="logo-mark">✦</span> NORTHSTAR</a><nav class="nav" aria-label="Main navigation"><a data-page-link="home" href="index.html">Home</a><a data-page-link="about" href="about.html">About</a><a data-page-link="enquiry" href="enquiry.html">Enquiry</a></nav><a class="nav-cta" href="enquiry.html">Start a project <span class="arrow">↗</span></a></header>
  <main>
    <section class="hero container"><div class="reveal"><p class="kicker">Independent creative studio · Est. 2018</p><h1>Make something<br><em>matter.</em></h1><p class="lead">We build clear, characterful brands and digital experiences for people shaping what comes next.</p><a class="button button-dark" href="enquiry.html">Tell us everything <span class="arrow">↗</span></a></div><div class="art reveal delay" role="img" aria-label="Abstract sunrise artwork"><div class="sun"></div><div class="ring"></div><div class="ring second"></div><div class="art-label">FIELD NOTE 001<strong>Ideas worth<br>following.</strong></div><span class="art-coordinates">18° 31' N<br>73° 51' E</span></div></section>
    <section class="strip"><div class="container statement"><p class="kicker">01 / The north star</p><div><h2>Good work has a point of view.</h2><p>Strategy gives it direction. Design gives it a voice. We bring both together to help ambitious teams move with confidence.</p></div></div></section>
    <section class="container services"><div><p class="kicker">02 / What we do</p><h2>From first thought<br>to <em>full flight.</em></h2></div><div class="service-list"><article class="service"><small>01</small><div><h3>Brand direction</h3><p>Positioning, naming and identity systems with a pulse.</p></div><b>↗</b></article><article class="service"><small>02</small><div><h3>Digital experiences</h3><p>Websites and products that feel as good as they work.</p></div><b>↗</b></article><article class="service"><small>03</small><div><h3>Launch momentum</h3><p>Campaigns, content and toolkits built to travel.</p></div><b>↗</b></article></div></section>
  </main>
  <footer class="footer"><div class="container footer-main"><a class="logo" href="index.html"><span class="logo-mark">✦</span> NORTHSTAR</a><p>Good ideas deserve a clear sky.</p><a href="enquiry.html">Let’s talk ↗</a></div><div class="container footer-bottom"><span>© <span data-year></span> Northstar Studio</span><span>Pune · India</span></div></footer>
</body>
</html>
```
`frontend/about.html` and `frontend/enquiry.html` are the same layout with the same class names; they
carry the same content as their `public/` counterparts. `frontend/styles.css` is the matching
class-name variant of the design system (same palette and typography, `.container` instead of
`.page-width`, `.kicker` instead of `.eyebrow`, `.ring` instead of `.orbit`).

**Exercise:** diff `public/` against `frontend/` and explain why renaming CSS classes requires editing
every HTML file — the problem that CSS Modules / Tailwind solve in lab 7.

---

## 5.6 Screenshots

| File | Shows |
|---|---|
| `lab5-home.png` | `public/index.html` served by `prg1.js` (port 3333) — hero with coral art panel, dark footer |
| `lab5-frontend-home.png` | `frontend/index.html` served by `prg2.js` (port 4444) — same content, "logo/nav/kicker" class naming |

Compare them side by side: identical design, different source structure. That is the point of this lab.

---

# LAB 6 — Express + JSON REST API with route params

**Goal:** build a product API with a collection endpoint and a detail endpoint using `:id` params,
destructuring and `res.status().json()`.

**`lab6/package.json`**
```json
{
  "name": "lab6",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "devDependencies": { "nodemon": "^3.1.14" },
  "dependencies": { "express": "^5.2.1" }
}
```

## 6.1 `lab6/app.js`

```js
import express from "express";
import { products } from "./data.js";

const app = express();

app.get("/",(req,res)=>{
    res.send("<h1>Hello from express</h1>")
});

app.get("/api/products",(req,res)=> {
    const{description,rating,...rest } = products[0];
    const filterproducts = products.map((product) => {
        const{descripion,rating,...rest} = product;
        return rest;
    });
    // res.json(filterproducts);
    res.json({count:filterproducts.length, data: filterproducts})
    // res.json(products);
});

app.get("/api/products/:id",(req,res) => {
    const {id} = req.params;
    const product = products.find((item) => item.id === Number(id));

    if(!product) {
        res.status(400).json({msg:`product not found with id:${id}`});
    }else{
        res.status(200).json(product);
    }
});

app.listen(3333, ()=>{
    console.log("Server running at 3333")
});
```

**Explanation**

- **`...rest` (object rest)** — `const {description, rating, ...rest} = product;` copies the product
  *minus* the listed keys. Used to return a **slim list** (no long descriptions) while the detail
  endpoint returns the full object. This "list vs detail" split is standard API design.
- **Typo bug**: inside `map` the key is written `descripion` (missing `t`), so `description` is **not**
  removed from list items — only `rating` is. Run it and you'll see each item still has `description`.
  Fix the spelling to see the intended slim payload.
- The unused outer `const{description,rating,...rest} = products[0];` line does nothing (dead code).
- **`req.params`** — `:id` in the path becomes a **string**; compare with `Number(id)`.
- **`res.status(400).json({...})`** — for a missing resource this should be **404**; 400 is the
  recurring mistake across labs 4 and 6.
- `else` after `res.status(400).json(...)` is unnecessary if you `return` in the `if`.

**Run**
```powershell
cd lab6
npm install
npm run dev
```
- <http://localhost:3333/> → `<h1>Hello from express</h1>`
- <http://localhost:3333/api/products> → `{"count":20,"data":[...]}`
- <http://localhost:3333/api/products/5> → the full Backpack object
- <http://localhost:3333/api/products/abc> → `{"msg":"product not found with id:abc"}` with status 400

## 6.2 `lab6/data.js` — the dataset (first records shown)

```js
export const products = [
    {
      "id": 1,
      "name": "Wireless Headphones",
      "description": "Over-ear wireless headphones with immersive sound and comfortable ear cushions.",
      "rating": 4.5,
      "price": 2499,
      "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
    },
    {
      "id": 2,
      "name": "Smart Watch",
      "description": "Modern smartwatch with fitness tracking, notifications and health monitoring features.",
      "rating": 4.4,
      "price": 3499,
      "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
    },
    // ... 18 more: Gaming Mouse, Mechanical Keyboard, Laptop Backpack, Bluetooth Speaker,
    // Running Shoes, Cotton T-Shirt, Stainless Steel Water Bottle, USB-C Charger,
    // Portable SSD, Phone Stand, Fitness Resistance Bands, LED Desk Lamp,
    // Classic Wrist Watch, Gaming Controller, Ceramic Coffee Mug, Sunglasses,
    // Desk Organizer, Wireless Charging Pad
];
```

**Shape of every product**

| Field | Type | Example |
|---|---|---|
| `id` | number | 1–20 |
| `name` | string | "Smart Watch" |
| `description` | string | long marketing copy |
| `rating` | number | 4.5 |
| `price` | number (INR) | 3499 |
| `image` | string (URL) | Unsplash photo |

**Exercise 1:** fix `descripion` → `description` and confirm the list response loses descriptions.
**Exercise 2:** add `GET /api/products?maxPrice=2000` using `req.query.maxPrice`.
**Exercise 3:** add `GET /api/products?search=watch` filtering on `name`.
**Exercise 4:** raise a real 404 and move the data into `products.json` (reuse lab2's `fs/promises`
helpers).

---

# LAB 7 — React with Vite (+ Tailwind): Components, Props, JSX, Styling

**Goal:** build a React front-end with Vite, understand **components as functions returning JSX**,
**props**, **destructuring**, **event handlers**, **lists with keys**, and the three ways to style a
component. The `backend/` folder is scaffolded and intentionally empty — it's the hook for a future
front-end ↔ back-end connection.

**Concepts**

- **Vite** is the dev server + bundler (replaces Create React App). It serves ES modules directly and
  hot-reloads (**HMR**) on save.
- **JSX** looks like HTML but compiles to `React.createElement(...)`. Rules:
  `className` not `class`, `{expr}` for values, attributes camelCase (`onClick`, `style`), and a
  component must **return a single root** (or a fragment `<>…</>`).
- **Component** = a JS function whose name **starts with a capital letter**, taking `props` and
  returning JSX. It is used like `<Book />` and must be **closed** (`<Book />` or `<Book>…</Book>`).
- **Props are read-only.** You pass data down; you never mutate `props`.
- **State** (`useState`) is the missing piece for changing values — see the exercise in `App.jsx`.
- **Lists** need a stable `key` prop (an `id`), not the array index.

**Student's lab notes (`lab7/readme.md`, key points, verbatim excerpts)**
```
# Frontend - Backend
1. create project folder (lab7)
2. create frontend, backend folder within project folder
3. open terminal and split it to two
4. open frontend into left side terminal; backend into right side terminal
6. in backend
   a. initialize backend by `npm init -y`
   b. install nodemon by `npm i nodemon`
   c. open package.json from backend, update `type to module` and script
   d. create app.js
7. in frontend
   a. npm create vite@latest
   b. enter . as project name
   c. select framework as react from arrow key
   d. select variant as javascript from arrow key
   e. select esList for linting from arrow key
   f. select install and start the frontend

## components
1. simple js functions return html directory
2. it must starts with capital letter
3. it should be treated as html tag
4. it must be closed

## Object destructure
const {bname,price,quantity,rating,picurl} = props.book;
- does not depend on order, if property is not available then it initializes with null
const {price,picurl} = props.book;   // only takes price and picurl
const{price,...rest} = props.book;   // everything except price

## any components include styles
1. external css - create class in index.css and use in component
2. internal css - create property as object like
   const qtyStyle = { fontSize:"1rem", color:"blue", textAlign:"center",
                      backgroundColor:"Yellow", padding:"10px" }
   then apply with style attribute and pass the object
3. inline - 2 curly brackets with style attribute; CSS property must be camelCase

rafce - arrow ; rfce - function  (VSCode snippets)
### App.jsx should have minimum code.
- By default a button in html is a submit button.

## Add tailwind to an existing react project
1. Open terminal and go to project frontend folder.
2. npm install tailwindcss @tailwindcss/vite
3. Open vite.config.js
4. Add import tailwindcss from "@tailwindcss/vite";
5. open src/index.css and remove all contents, then add: @import "tailwindcss";
```

**`lab7/backend/package.json`** (backend exists but `app.js` is empty — a placeholder)
```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
     "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "dependencies": { "nodemon": "^3.1.14" }
}
```

**`lab7/frontend/package.json`**
```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.3.3",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "tailwindcss": "^4.3.3"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.7",
    "@vitejs/plugin-react": "^6.1.1",
    "eslint": "^10.10.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.6",
    "globals": "^17.12.0",
    "vite": "^8.3.0"
  }
}
```
> The shipped file pins these as caret ranges (`"@types/react": "^19.2.18"`,
> `"@types/react-dom": "^19.2.7"`, `"@eslint/js": "^10.0.1"`, `"vite": "^8.3.0"`, …). Only the
> **major** versions matter for this course: React 19, Vite 8, Tailwind 4, ESLint 10.

---

## 7.1 `lab7/frontend/index.html` — the single HTML shell

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>frontend</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**Explanation** — a React app is a **SPA**: the server always returns this one file. `#root` is the
mount point; `main.jsx` supplies everything inside it.

---

## 7.2 `lab7/frontend/src/main.jsx` — the entry point

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**Explanation**
- `createRoot(el).render(<App />)` — React 18+ API (replaces `ReactDOM.render`).
- `StrictMode` double-invokes render functions in development to surface impure code. This is why
  `console.log` in a component body appears **twice** — a very common student confusion.
- `import './index.css'` works because Vite handles CSS imports.

---

## 7.3 `lab7/frontend/src/App.jsx` — a component with a click handler

```jsx
import Book from "./components/Book";
import Fruit from "./components/Fruit";
import Pen from "./components/Pen";
import { books } from "./data/Books";
import { pens } from "./data/Pens";
import fruit from "./components/Fruit";
import Event from "./components/Event";

const MyButton = ()=>{
  let count = 1;
  
  const handleSubmit = ()=>{
    alert("button clicked", count);
    count++;
  };
  return(
    <button className="bg-black text-white text-xl rounded-md m-4
     px-4 py-2 onClick={handleSubmit}">
    Submit</button>
  )
}

export default function App(){
  return (
  <>
  <MyButton/>
  </>
  );
}
```

**Explanation and its three teaching bugs**

1. **The JSX attribute is inside the class string.** The `onClick={handleSubmit}` was typed *inside*
   `className="..."`, so the button has a nonsense class and **no click handler** — clicking does
   nothing. It must be `className="bg-black ... py-2" onClick={handleSubmit}` with the closing quote
   after `py-2`.
2. **`let count = 1` is reset on every render.** Even if the handler fired, `count` would always be 1.
   React needs **state**:
   ```jsx
   const [count, setCount] = useState(1);
   const handleSubmit = () => { alert(`button clicked ${count}`); setCount(count + 1); };
   ```
   Without `useState`, React never re-renders and never remembers the value.
3. **`alert("button clicked", count)`** — `window.alert` takes **one** argument; the second is ignored.
   Use a template literal.
4. The unused imports (`Book`, `Fruit`, `Pen`, `books`, `pens`, `fruit`, `Event`) plus the duplicate
   `import fruit from "./components/Fruit"` (same module, two names) are leftovers from practising
   component composition. **`App.jsx` should contain the minimum code** — move experiments into their
   own files and import one at a time.

**Run**
```powershell
cd lab7\frontend
npm install
npm run dev      # http://localhost:5173
```
You should see a black "Submit" button. Click it: nothing happens (bug 1). Fix bug 1 → the alert shows
`button clicked` only (bug 3). Add `useState` → the counter works (bug 2).

**Tailwind classes used:** `bg-black text-white text-xl rounded-md m-4 px-4 py-2`
= background, text colour, font size, corner radius, margin 1rem, horizontal/vertical padding.

---

## 7.4 `lab7/frontend/src/components/Book.jsx` — props + the three styling methods

```jsx
export default function Book(props) {
  const { rating, quantity, price, bname, picUrl } = props.book;

 const qtystyle = {
  display: "inline-block",
  fontSize: "0.85rem",
  fontWeight: "600",
  color: "#a78bfa",
  background: "rgba(167, 139, 250, 0.1)",
  padding: "7px 14px",
  marginTop: "10px",
  borderRadius: "999px",
  border: "1px solid rgba(167, 139, 250, 0.25)",
  letterSpacing: "0.4px",
};

 return (
    <div>
      <img src={picUrl} alt={bname} />

      <h1>{bname}</h1>

      <h2>Price: ₹{price}</h2>

      <h3 style = {qtystyle} >Quantity: {quantity}</h3>

      <h4 style = {{color : "red", textAlign:"center"}}>⭐ {rating}</h4>

      <button className="buy-btn">Buy Now</button>
    </div>
  );
}
```

**Explanation** — this one file demonstrates all three styling approaches:

| Method | Here | Notes |
|---|---|---|
| **Object style** (`qtystyle`) | `<h3 style={qtystyle}>` | defined outside JSX, reusable; camelCase keys, string values |
| **Inline** | `<h4 style={{color:"red", textAlign:"center"}}>` | double braces: outer `{}` = "expression", inner `{}` = object |
| **External CSS class** | `className="buy-btn"` | defined in `index.css` (see 7.8) |

**Usage (what `App.jsx` would look like when this component is used):**
```jsx
import Book from "./components/Book";
import { Books } from "./data/Books";

export default function App() {
  return (
    <div className="container">
      {Books.map((b, i) => <Book key={i} book={b} />)}
    </div>
  );
}
```
`props.book` is the whole object; destructuring picks out five fields. **Order does not matter**; a
missing field becomes `undefined` (rendered as nothing), not `null`.

**Note:** the data module exports `Books` (capital B), but `App.jsx` imports `{ books }` (lower case) →
`undefined`. Capital-vs-lowercase is the single most common "it renders nothing" bug in React. Align them.

---

## 7.5 `lab7/frontend/src/components/Fruit.jsx` — lists and conditional styling

```jsx
const products = [
    {title:'Cabbage', id: 1, isFruit: false},
    {title:'Potato', id: 2, isFruit: false},
    {title:'Banana', id: 3, isFruit: true},
    {title:'Apple', id: 4, isFruit: true},
];


const ListItem = products.map((item) => 
    <li key = {item.id} style = {{color: item.isFruit ? "red":"green"}}>{item.title}</li>
);

console.log(ListItem);


const Fruit = () => {
  return <ul>{ListItem}</ul>
};

export default Fruit;
```

**Explanation**
- `Array.map` returns an **array of elements**; React renders arrays of JSX fine.
- **`key={item.id}`** must be unique and stable — React uses it to match elements between renders.
  Using the index is discouraged when items can reorder.
- **Ternary in style** — `item.isFruit ? "red" : "green"` shows fruit in red, vegetables in green.
- `console.log(ListItem)` prints an array of React elements — note that each shows `{$$typeof:
  Symbol(react.element), type:'li', ...}`. Because of `StrictMode`, in a real component body you'd see
  it twice; here it's at module scope, so once.
- Returning `<ul>{ListItem}</ul>` wraps the array in a single root element — required by JSX.

**Rendered result:** red **Banana**, red **Apple**, green **Cabbage**, green **Potato**.

---

## 7.6 `lab7/frontend/src/components/Event.jsx` — event handling

```jsx
const MyButton = () =>{
    const handleClick = () => {
        alert('Button Clicked')
    }
    return(
        <button style = {{height:"40px",width:"100px"}} 
        onClick = {handleClick}>Click Me</button>
    )
};

const Event = () => {
  return (
    <div><MyButton/></div>
  );
}

export default Event;
```

**Explanation**
- `onClick={handleClick}` — pass the **function reference**, not `handleClick()` (that would run it
  during render and pass its return value, `undefined`).
- This is the corrected version of the mistake in `App.jsx`: the attribute is outside `style`.
- `<MyButton />` is self-closing; `MyButton` is capitalised so JSX treats it as a component, not a
  `<mybutton>` HTML tag.
- One file can export only one `default`; `MyButton` stays private to this module — a good pattern for
  "helper components".

**Exercise:** add `onClick={(e) => console.log(e.target)}` to inspect the synthetic event. Then make a
button that shows an `alert` with the current `count` using `useState`.

---

## 7.7 `lab7/frontend/src/components/Pen.jsx` — a second props shape

```jsx
import React from 'react'

const Pen = (props) => {
    const{picUrl,company,price} = props.pen;
  return (
    <div>
        <img src = {picUrl} alt = {company}/>
        <h3>{company}</h3>
        <h4> Rs. {price}</h4>
    </div>
  );
};

export default Pen;
```

**Explanation** — identical pattern to `Book`, but the prop is `props.pen` (so callers write
`<Pen pen={p} />`). `import React from 'react'` is **not needed** in React 17+ with the automatic JSX
runtime; it's harmless but can be deleted. `alt` improves accessibility and is required by lint rules.

**Usage**
```jsx
import Pen from "./components/Pen";
import { Pens } from "./data/Pens";

export default function App() {
  return <>{Pens.map((p, i) => <Pen key={i} pen={p} />)}</>;
}
```

---

## 7.8 `lab7/frontend/src/data/Books.js` and `src/data/Pens.js`

```js
// Books.js
export const Books = [{
  picUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9r8LCkI511HTcKPRyHxGLfr_8aVwurDWuenlnfqk-E2Rukgsc_ZjHyAs&s=10",
  bname: "React Design Pattern",
  price: 1199,
  quantity: 10,
  rating: 5.0,
},

{
  picUrl:
    "https://dryuc24b85zbr.cloudfront.net/tes/resources/6441170/image?width=500&height=500&version=1474643904786",
  bname: "React Design Pattern",
  price: 1199,
  quantity: 10,
  rating: 5.0,
},
]
```

```js
// Pens.js
export const Pens = [ {
  picUrl:
    "https://m.media-amazon.com/images/I/71xh6eJHcbL._AC_UL480_FMwebp_QL65_.jpg",
  bname: "React Design Pattern",
  price: 1199,
  quantity: 10,
  rating: 5.0,
},

{
  picUrl:
    "https://m.media-amazon.com/images/I/61+GYlpqs0L._AC_UL480_FMwebp_QL65_.jpg",
  bname: "React Design Pattern",
  price: 1199,
  quantity: 10,
  rating: 5.0,
},]
```

**Explanation** — `Books` matches `Book.jsx`'s expected fields (`picUrl, bname, price, quantity,
rating`). `Pens` uses the **same field names**, but `Pen.jsx` destructures `company` — which doesn't
exist here → `company` is `undefined` → the `<h3>` is empty and `alt` is empty. Perfect demonstration
of "the component contract is whatever the component destructures". Fix by changing `Pens.js` to
`{ picUrl, company, price }` (which is clearly what was intended — pen `company`s).

**Remember:** `export const X` is a **named export** → must be imported `{ X }`. `export default X` →
imported without braces. Mixing them up yields `undefined`, which then blows up as
"Cannot read properties of undefined".

---

## 7.9 `lab7/frontend/src/index.css` — the full component theme

`index.css` is imported globally by `main.jsx`, so its classes apply to every component. It defines the
look for the book-card grid (`.container`, `.page-title`, `.buy-btn`) used by `Book.jsx`.

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  font-family: "Poppins", "Segoe UI", sans-serif;
  color: #ffffff;

  background:
    radial-gradient(
      circle at 10% 10%,
      rgba(99, 102, 241, 0.18),
      transparent 30%
    ),
    radial-gradient(
      circle at 90% 90%,
      rgba(168, 85, 247, 0.18),
      transparent 30%
    ),
    #09090f;
}


/* ================================
   PAGE TITLE
================================ */

.page-title {
  text-align: center;
  padding: 55px 20px 10px;

  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -1.5px;

  background: linear-gradient(
    90deg,
    #ffffff,
    #a78bfa,
    #c084fc
  );

  background-clip: text;
  -webkit-background-clip: text;

  color: transparent;
  -webkit-text-fill-color: transparent;
}


/* ================================
   BOOK GRID
================================ */

.container {
  width: min(1200px, 92%);
  margin: 0 auto;
  padding: 45px 0 70px;

  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(240px, 1fr)
  );

  gap: 28px;
}


/* ================================
   BOOK CARD
================================ */

.container > div {
  position: relative;
  overflow: hidden;

  padding: 22px;

  border-radius: 22px;

  background: rgba(255, 255, 255, 0.065);

  border: 1px solid rgba(255, 255, 255, 0.12);

  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);

  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);

  transition:
    transform 0.35s ease,
    box-shadow 0.35s ease,
    border-color 0.35s ease;
}


/* Glowing corner */

.container > div::before {
  content: "";

  position: absolute;

  width: 140px;
  height: 140px;

  top: -75px;
  right: -75px;

  border-radius: 50%;

  background: #7c3aed;

  filter: blur(45px);

  opacity: 0.3;

  transition: 0.4s ease;
}


/* ================================
   CARD HOVER
================================ */

.container > div:hover {
  transform: translateY(-12px) scale(1.02);

  border-color: rgba(139, 92, 246, 0.55);

  box-shadow:
    0 30px 70px rgba(0, 0, 0, 0.5),
    0 0 35px rgba(124, 58, 237, 0.2);
}

.container > div:hover::before {
  transform: scale(1.5);
  opacity: 0.55;
}


/* ================================
   BOOK IMAGE
================================ */

.container img {
  width: 100%;
  height: 300px;

  display: block;

  object-fit: cover;

  border-radius: 16px;

  background: #181824;

  box-shadow:
    0 12px 30px rgba(0, 0, 0, 0.35);

  transition:
    transform 0.4s ease,
    box-shadow 0.4s ease;
}

.container > div:hover img {
  transform: scale(1.04);

  box-shadow:
    0 18px 40px rgba(0, 0, 0, 0.45);
}


/* ================================
   BOOK NAME
================================ */

.container h1 {
  margin-top: 22px;

  font-size: 1.35rem;
  font-weight: 700;

  line-height: 1.3;

  color: #ffffff;

  letter-spacing: -0.4px;
}


/* ================================
   PRICE
================================ */

.container h2 {
  margin-top: 12px;

  font-size: 1.15rem;
  font-weight: 700;

  color: #a78bfa;
}


/* ================================
   QUANTITY
================================ */

.container h3 {
  margin-top: 8px;

  font-size: 0.9rem;
  font-weight: 500;

  color: #aaaabb;
}


/* ================================
   RATING
================================ */

.container h4 {
  display: inline-flex;

  margin-top: 14px;
  padding: 7px 12px;

  border-radius: 30px;

  font-size: 0.85rem;
  font-weight: 600;

  color: #facc15;

  background: rgba(250, 204, 21, 0.1);

  border: 1px solid rgba(250, 204, 21, 0.2);
}


/* ================================
   CARD ENTRANCE ANIMATION
================================ */

.container > div {
  animation: cardAppear 0.6s ease both;
}

.container > div:nth-child(1) {
  animation-delay: 0.05s;
}

.container > div:nth-child(2) {
  animation-delay: 0.12s;
}

.container > div:nth-child(3) {
  animation-delay: 0.19s;
}

.container > div:nth-child(4) {
  animation-delay: 0.26s;
}

@keyframes cardAppear {
  from {
    opacity: 0;
    transform: translateY(25px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}


/* ================================
   MOBILE
================================ */

@media (max-width: 700px) {
  .page-title {
    padding-top: 35px;
    font-size: 2.2rem;
  }

  .container {
    width: 90%;
    padding-top: 30px;

    grid-template-columns: 1fr;
  }

  .container img {
    height: 350px;
  }
}


/* ================================
   SMALL MOBILE
================================ */

@media (max-width: 400px) {
  .container {
    width: 92%;
  }

  .container > div {
    padding: 16px;
  }
.container img {
  width: 100%;
  height: 300px;

  display: block;
  object-fit: cover;

  border-radius: 16px;

  background: transparent;

  mix-blend-mode: multiply;

  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);

  transition:
    transform 0.4s ease,
    box-shadow 0.4s ease;
}

.container > div:hover img {
  transform: scale(1.04);

  box-shadow:
    0 18px 40px rgba(0, 0, 0, 0.45);
}

  .page-title {
    font-size: 1.9rem;
  }
}

/* ================================
   BUY NOW BUTTON
================================ */

.buy-btn {
  width: 100%;
  margin-top: 20px;
  padding: 13px 20px;

  border: none;
  border-radius: 12px;

  background: linear-gradient(
    135deg,
    #7c3aed,
    #a855f7
  );

  color: white;

  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.3px;

  cursor: pointer;

  box-shadow:
    0 8px 20px rgba(124, 58, 237, 0.25);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease;
}


/* Hover */

.buy-btn:hover {
  transform: translateY(-3px);

  background: linear-gradient(
    135deg,
    #8b5cf6,
    #c084fc
  );

  box-shadow:
    0 12px 30px rgba(139, 92, 246, 0.45);
}


/* Click */

.buy-btn:active {
  transform: translateY(0) scale(0.97);

  box-shadow:
    0 5px 12px rgba(124, 58, 237, 0.25);
}
```

**Techniques to take away**
- **Dark glass card**: `rgba(255,255,255,0.065)` + `backdrop-filter: blur(15px)` + a 1px translucent
  border + inset highlight in `box-shadow`.
- **Glowing corner**: `.container > div::before` = blurred purple circle positioned off the top-right
  corner; on `:hover` it scales and brightens.
- **Gradient text**: `background-clip: text` + `color: transparent`.
- **`repeat(auto-fit, minmax(240px, 1fr))`** — responsive grid with **no media queries needed**.
- **Staggered entrance**: `animation-delay` per `nth-child`.
- **`mix-blend-mode: multiply`** (inside the ≤400px block) makes white-background product photos blend
  into the dark card.
- ⚠️ The `.container img` / `.container > div:hover img` rules appear **twice** (once globally, once
  inside the `max-width: 400px` block). CSS duplication — consolidate by keeping only the differences
  (`background: transparent; mix-blend-mode: multiply;`) in the media query.

> **Tailwind note:** `index.css` is a *hand-written* stylesheet. Adding Tailwind (as `vite.config.js`
> already does) means you would normally replace this file's contents with
> `@import "tailwindcss";` and use utility classes like `bg-black text-white rounded-md` — exactly as
> done in `App.jsx`. Keeping both is fine, and shows the two approaches side by side.

---

## 7.10 `lab7/frontend/src/App.css` — leftover Vite template CSS

```css
.counter { font-size: 16px; padding: 5px 10px; border-radius: 5px;
  color: var(--accent); background: var(--accent-bg);
  border: 2px solid transparent; transition: border-color 0.3s; margin-bottom: 24px;
  &:hover { border-color: var(--accent-border); }
  &:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
}

.hero { position: relative;
  .base, .framework, .vite { inset-inline: 0; margin: 0 auto; }
  .base { width: 170px; position: relative; z-index: 0; }
  .framework, .vite { position: absolute; }
  .framework { z-index: 1; top: 34px; height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg) scale(1.4); }
  .vite { z-index: 0; top: 107px; height: 26px; width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg) scale(0.8); }
}

#center { display: flex; flex-direction: column; gap: 25px;
  place-content: center; place-items: center; flex-grow: 1;
  @media (max-width: 1024px) { padding: 32px 20px 24px; gap: 18px; } }

#next-steps { display: flex; border-top: 1px solid var(--border); text-align: left;
  & > div { flex: 1 1 0; padding: 32px;
    @media (max-width: 1024px) { padding: 24px 20px; } }
  .icon { margin-bottom: 16px; width: 22px; height: 22px; }
  @media (max-width: 1024px) { flex-direction: column; text-align: center; } }

#docs { border-right: 1px solid var(--border);
  @media (max-width: 1024px) { border-right: none; border-bottom: 1px solid var(--border); } }

#next-steps ul { list-style: none; padding: 0; display: flex; gap: 8px; margin: 32px 0 0;
  .logo { height: 18px; }
  a { color: var(--text-h); font-size: 16px; border-radius: 6px; background: var(--social-bg);
      display: flex; padding: 6px 12px; align-items: center; gap: 8px;
      text-decoration: none; transition: box-shadow 0.3s;
    &:hover { box-shadow: var(--shadow); }
    .button-icon { height: 18px; width: 18px; } }
  @media (max-width: 1024px) { margin-top: 20px; flex-wrap: wrap; justify-content: center;
    li { flex: 1 1 calc(50% - 8px); }
    a { width: 100%; justify-content: center; box-sizing: border-box; } } }

#spacer { height: 88px; border-top: 1px solid var(--border);
  @media (max-width: 1024px) { height: 48px; } }

.ticks { position: relative; width: 100%;
  &::before, &::after { content: ''; position: absolute; top: -4.5px; border: 5px solid transparent; }
  &::before { left: 0; border-left-color: var(--border); }
  &::after { right: 0; border-right-color: var(--border); } }
```

**Explanation** — this is the **stock Vite + React template** stylesheet (note `.counter`, `.hero`,
`#next-steps`, `#docs`, `#spacer`, `.ticks` — nothing in this repo uses them). It is **not imported**
anywhere, so it has no effect. It is worth reading only as an example of:
- **Native CSS nesting** (`&`, nested selectors, nested `@media`) — supported in modern browsers with
  no preprocessor;
- 3-D transforms (`perspective(...) rotateX/Y/Z`) that make the framework logos sit on a tilted plane;
- `border-*-color` on a transparent border to draw a triangle (`.ticks::before/after`).

**Action:** delete the file and the `import './App.css'` line if present — dead code is a maintenance
cost. (Kept here as a teaching artifact.)

---

## 7.11 `lab7/frontend/vite.config.js` and `eslint.config.js`

```js
// vite.config.js
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```
- `react()` — JSX transform + Fast Refresh.
- `tailwindcss()` — the v4 Vite plugin, so utility classes work without a `tailwind.config.js` or
  PostCSS file. Combined with `@import "tailwindcss";` in the CSS entry, that's the whole setup.

```js
// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])
```
- Lints every `.js`/`.jsx` file, ignores `dist/`.
- `reactHooks` catches **rules of hooks** (e.g. calling `useState` inside an `if`).
- `reactRefresh` warns if a file exports non-components alongside components (breaks HMR).
- Run with `npm run lint`.

**`lab7/frontend/.gitignore`** (generated by Vite) ignores `node_modules`, `dist`, `.env*`, editor
folders, and logs.

---

## 7.12 Front-end ↔ Back-end (the unfinished piece)

`lab7/backend/app.js` is **empty** and `backend/package.json` exists. The intended next step, which
completes the course:

1. Write an Express API in `backend/app.js` (reuse lab6) on port 4000 that returns `Books`.
2. In React, replace the static import with a **fetch** inside `useEffect`:
   ```jsx
   import { useEffect, useState } from "react";

   export default function App() {
     const [books, setBooks] = useState([]);
     useEffect(() => {
       fetch("http://localhost:4000/api/books")
         .then((r) => r.json())
         .then((d) => setBooks(d.data));
     }, []);
     return <div className="container">{books.map((b) => <Book key={b.bname} book={b} />)}</div>;
   }
   ```
3. Deal with **CORS** in the backend: `npm i cors` and `app.use(cors())`. Without it the browser blocks
   the request and the console shows *"has been blocked by CORS policy"* — the most common
   frontend/backend integration error.
4. Run both: left terminal `npm run dev` (Vite, 5173), right terminal `npm run dev` (Express, 4000).

---

# Cross-lab cheat sheet

### Node / JS
| Topic | Where |
|---|---|
| Arrow vs declaration functions, template literals | `lab1/Fundamental/index.js` |
| EventEmitter lifecycle (`on/once/off/emit/listenerCount/removeAllListeners`) | `lab1/Fundamental/eventEmitter.js` |
| Pub-sub architecture / extending EventEmitter | `lab1/Fundamental/order.js` |
| Call stack | `lab1/EventLoop/task1.js` |
| `setTimeout` / `setInterval` / `setImmediate` / `process.nextTick` | `lab1/EventLoop/task2.js`, `task3.js` |
| `fs/promises`: read/write/append | `lab2/index.js` |
| `fs/promises`: mkdir/rm recursive | `lab2/prg2.js` |
| `readline/promises`, `do/while`, `switch`, `reduce`, `find`, `filter` | `lab2/CartProject.js` |
| Object destructuring + rest | `lab6/app.js`, `lab7/components/Book.jsx`, `Pen.jsx` |
| Array `map`/`find`/`findIndex`/`splice`/`Object.assign` | `lab4/teams.js` |
| Promise wrapper around a stream | `lab4/app.js` (`parseJSONBody`) |

### HTTP
| Topic | Where |
|---|---|
| `createServer`, `req.url/method/headers/socket` | `lab3/prg1.js` |
| `writeHead` + status + content-type | `lab3/prg2.js`, `prg5.js` |
| Manual routing / 404 | `lab3/prg3.js`, `prg4.js` |
| Serving big files: `readFile` vs `createReadStream().pipe(res)` | `lab3/prg7.js` vs `prg9.js` |
| Reading a POST body (`data` + `end`) | `lab3/prg11.js` (buggy), `lab4/app.js` (correct) |
| REST verbs on one path | `lab3/prg11.js`, `lab4/app.js` |
| `url.parse` → pathname + query | `lab4/app.js` |
| Versioned API `/api/v1/...` | `lab4/app.js` |
| Express routes, res.send/json/status | `lab5/app.js` |
| `sendFile` + `express.static` | `lab5/prg1.js`, `prg2.js` |
| Route params `:id` | `lab6/app.js` |
| Query strings via `req.query` | exercise on `lab6/app.js` |

### Front-end
| Topic | Where |
|---|---|
| Semantic HTML, forms, meta tags | `lab5/public/*.html` |
| CSS variables, grid, `clamp()`, media queries, keyframes | `lab5/public/styles.css`, `lab3/pages/airtag.html` |
| DOM + `addEventListener` + `preventDefault` | `lab5/public/enquiry.html` |
| Glassmorphism card theme | `lab7/frontend/src/index.css` |
| JSX, components, props, three styling methods | `lab7/frontend/src/components/Book.jsx` |
| Lists and `key` | `lab7/frontend/src/components/Fruit.jsx` |
| Event handlers | `lab7/frontend/src/components/Event.jsx` |
| Tailwind utilities | `lab7/frontend/src/App.jsx` |

### Known bugs in this repo (fix these to learn the most)

| # | File | Bug | Fix |
|---|---|---|---|
| 1 | `lab3/prg3.js` | `"</h2"` missing `>` | `"</h2>"` |
| 2 | `lab3/prg10.js` | missing `return`, double `res.end` | `return res.end(...)` + 404 fallback |
| 3 | `lab3/prg11.js` | `products` out of scope, double `end` | `await` body, single response |
| 4 | `lab3/prg9.js` | `text/json` MIME | `application/json` |
| 5 | `lab4/teams.js` | `addTeam` nests payload (`newTeam`) | `{ id: nextId++, ...newTeam }` |
| 6 | `lab4/app.js` | `data === "undefined"` string compare | `typeof data === "undefined"` |
| 7 | `lab4/app.js` | 400 vs 404 inconsistency, `erro` typo | use 404 everywhere |
| 8 | `lab6/app.js` | `descripion` typo → description not stripped | fix spelling |
| 9 | `lab6/app.js` | 400 for "not found" | `res.status(404)` |
| 10 | `lab7/App.jsx` | `onClick` inside `className` string | close quotes before `onClick` |
| 11 | `lab7/App.jsx` | `let count` instead of `useState` | `const [count,setCount]` |
| 12 | `lab7/App.jsx` | `alert("a", b)` | template literal |
| 13 | `lab7/App.jsx` | `{ books }` vs exported `Books` | match names |
| 14 | `lab7/Pen.jsx` vs `Pens.js` | `company` not in data | add `company` to `Pens.js` |
| 15 | `lab2/CartProject.js` | `qty` from input ignored on add | use `product.qty` |
| 16 | `lab5/frontend/index.html` | `<script src="prg2.js">` doesn't exist | remove or create it |

### Suggested 8-session teaching plan

| Session | Content | Deliverable |
|---|---|---|
| 1 | Modules, functions, EventEmitter (lab1 Fundamental) | A custom "chat room" emitter with 3 listeners |
| 2 | Event loop, timers, promises (lab1 EventLoop) | Predict-then-run the ordering quiz |
| 3 | `fs/promises`, JSON as DB (lab2) | Fix CartProject: honour qty, add "clear cart" |
| 4 | Raw `http`, routing, status, JSON (lab3 part 1) | Serve 4 pages + one JSON endpoint |
| 5 | Streams, static files, a full HTML page (lab3 part 2) | Serve `airtag.html` via streams |
| 6 | REST design with `http`, layered code (lab4) | Teams CRUD passing all curl tests |
| 7 | Express, static hosting, params (labs 5–6) | Products API + served website |
| 8 | React: components, props, state, Tailwind (lab7) | Product grid fetched from your own API |

### Glossary (quick)

- **ESM** — `import`/`export` modules; enabled with `"type": "module"`.
- **Middleware** — Express function with `(req,res,next)`.
- **REST** — resource-oriented HTTP API design.
- **CORS** — browser rule allowing a page from origin A to call origin B only if B sends
  `Access-Control-Allow-Origin`.
- **Props** — read-only data passed into a React component.
- **State** — data owned by a component that triggers re-render when changed (`useState`).
- **HMR** — hot module replacement; Vite updates the module without full reload.
- **Backpressure** — `pipe` slows the reader when the writer is full.
- **Hydration/Mount** — React attaching to a DOM node (`#root`).
