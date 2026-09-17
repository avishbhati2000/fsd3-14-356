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