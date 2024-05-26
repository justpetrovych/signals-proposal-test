import "./styles.css";

import { useSignal, useEffect, useComputed } from "./signal-utils.mjs";

const renderApp = (id) => {
  const appEl = document.getElementById(id);
  appEl.innerHTML = `
    <div class="counter">
      <i class="odd" id="count">0</i>
    </div>
    `;
};

const updateCounterDOM = count => document.getElementById("count").innerText = count;

const updateParityDOM = (parity) => {
  const countEl = document.getElementById("count");
  const classNameToAdd = parity;
  const classNameToRemove = parity === "even" ? "odd" : "even";
  countEl.classList.add(classNameToAdd);
  countEl.classList.remove(classNameToRemove);
}

renderApp("app");

const [getCounter, setCounter] = useSignal(0);

const [isEven] = useComputed(() => (getCounter() & 1) == 1);
const [getParity] = useComputed(() => (isEven() ? "even" : "odd"));

useEffect(() => {
  updateCounterDOM(getCounter());
  updateParityDOM(getParity());
});

setInterval(() => setCounter(getCounter() + 1), 1000);