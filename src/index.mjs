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

renderApp("app");

const [getCounter, setCounter] = useSignal(0);

const [isEven] = useComputed(() => (getCounter() & 1) == 1);
const [getParity] = useComputed(() => (isEven() ? "even" : "odd"));

useEffect(() => {
  const countEl = document.getElementById("count");
  countEl.innerText = getCounter();
  countEl.className = getParity();
});

setInterval(() => setCounter(getCounter() + 1), 1000);
