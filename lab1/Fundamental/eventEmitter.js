import {EventEmitter} from 'node:events'

const sayHi = (name) => {
    console.log(`${name} logged in`);
};

const task =  new EventEmitter();

task.once("greet",() => {
    console.log("System Started");
});

task.on("greet",sayHi);
task.on("greet",(name)=>{
    console.log(`${name} starts working`)
});
task.on("greet",(name)=>{
    console.log(`${name} stopped working`)
});

task.off("greet",sayHi);

task.emit("greet","Avish Bhati");

task.emit("greet","Tony Stark");

task.once('exit',(name) => {
    console.log(`System Shutdown by ${name}`);
});

task.emit("exit","The Manager");
task.emit("exit","Employee");
console.log("total listener",task.listenerCount("greet"));
task.removeAllListeners("greet");