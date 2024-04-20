import "./styles.css";

import { Signal, effect } from "./signal-utils.mjs";

const renderApp = (id) => {
  const appEl = document.getElementById(id);
  appEl.innerHTML = `
    <div class="counter">
      <i class="odd" id="count">0</i>
    </div>
    `;
};

const updateCounter = count => document.getElementById("count").innerText = count;

const updateParity = (parity) => {
  const countEl = document.getElementById("count");
  const classNameToAdd = parity;
  const classNameToRemove = parity === "even" ? "odd" : "even";
  countEl.classList.add(classNameToAdd);
  countEl.classList.remove(classNameToRemove);
}

renderApp("app");

const counter = new Signal.State(0);
const isEven = new Signal.Computed(() => (counter.get() & 1) == 1);
const parity = new Signal.Computed(() => (isEven.get() ? "even" : "odd"));

effect(() => {
  updateCounter(counter.get());
  updateParity(parity.get());
});

setInterval(() => {
  counter.set(counter.get() + 1);
}, 1000);