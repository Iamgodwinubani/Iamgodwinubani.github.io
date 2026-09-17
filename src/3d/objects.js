/**
 * CSS 3D objects: phones, the Shield Up book, and the expertise cards.
 *
 * Pure CSS geometry (preserve-3d faces) driven by one requestAnimationFrame
 * loop. No WebGL, no dependencies — so these stay sharp and cost almost nothing
 * to load, and still work if the globe's WebGL is unavailable.
 *
 * Each object idles on its own, follows the pointer, and can be dragged.
 * With prefers-reduced-motion the idle motion stops; dragging still works.
 */

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(pointer: fine)").matches;

const objects = [];
let visible = 0;
let running = false;
let last = 0;

function register(el, opts) {
  const state = {
    el,
    target: el.querySelector("[data-3d-body]") || el,
    rx: 0,
    ry: 0,
    dragRx: 0,
    dragRy: 0,
    pointerRx: 0,
    pointerRy: 0,
    velocity: 0,
    dragging: false,
    onScreen: false,
    phase: Math.random() * Math.PI * 2,
    ...opts,
  };

  if (state.drag) {
    let lx = 0;
    let ly = 0;
    el.addEventListener("pointerdown", (e) => {
      state.dragging = true;
      lx = e.clientX;
      ly = e.clientY;
      el.setPointerCapture(e.pointerId);
      el.classList.add("is-dragging");
    });
    el.addEventListener("pointermove", (e) => {
      if (!state.dragging) return;
      const dx = e.clientX - lx;
      const dy = e.clientY - ly;
      lx = e.clientX;
      ly = e.clientY;
      state.velocity = dx * 0.5;
      state.dragRy += dx * 0.5;
      state.dragRx = Math.max(-35, Math.min(35, state.dragRx - dy * 0.3));
      start();
    });
    const end = () => {
      state.dragging = false;
      el.classList.remove("is-dragging");
    };
    el.addEventListener("pointerup", end);
    el.addEventListener("pointercancel", end);
  }

  if (state.follow && finePointer) {
    el.addEventListener("pointermove", (e) => {
      if (state.dragging) return;
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      state.pointerRy = nx * state.follow;
      state.pointerRx = -ny * state.follow;
      el.style.setProperty("--glare-x", `${(nx + 0.5) * 100}%`);
      el.style.setProperty("--glare-y", `${(ny + 0.5) * 100}%`);
      start();
    });
    el.addEventListener("pointerleave", () => {
      state.pointerRx = 0;
      state.pointerRy = 0;
      start();
    });
  }

  objects.push(state);
  return state;
}

function step(dt, time, force = false) {
  for (const o of objects) {
    if (!o.onScreen && !force) continue;

    /* Idle motion, unless the visitor has asked the OS for less motion. */
    let idleRx = 0;
    let idleRy = 0;
    if (!reduceMotion) {
      const s = time * 0.001 + o.phase;
      if (o.idle === "spin") {
        if (!o.dragging) o.dragRy += o.spinSpeed * dt;
      } else if (o.idle === "sway") {
        idleRy = Math.sin(s * 0.55) * o.swayY;
        idleRx = Math.sin(s * 0.8) * o.swayX;
      } else if (o.idle === "float") {
        idleRy = Math.sin(s * 0.6) * 4;
        idleRx = Math.cos(s * 0.5) * 3;
      }
    }

    if (!o.dragging && o.drag) {
      o.dragRy += o.velocity;
      o.velocity *= 0.92;
      /* Sway objects return to facing forward once let go. */
      if (o.idle !== "spin") {
        o.dragRy *= 0.94;
        o.dragRx *= 0.94;
      }
    }

    const tx = idleRx + o.pointerRx + o.dragRx;
    const ty = idleRy + o.pointerRy + o.dragRy;
    const ease = o.dragging ? 1 : 0.12;
    o.rx += (tx - o.rx) * ease;
    o.ry += (ty - o.ry) * ease;

    o.target.style.transform = `rotateX(${o.rx.toFixed(2)}deg) rotateY(${o.ry.toFixed(2)}deg)`;
  }
}

function loop(now) {
  if (!running) return;
  const dt = last ? Math.min((now - last) / 16.667, 3) : 1;
  last = now;
  step(dt, now);
  requestAnimationFrame(loop);
}

function start() {
  if (running || !visible) return;
  running = true;
  last = 0;
  requestAnimationFrame(loop);
}

const io = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    const o = objects.find((x) => x.el === entry.target);
    if (!o) continue;
    if (entry.isIntersecting && !o.onScreen) visible++;
    if (!entry.isIntersecting && o.onScreen) visible--;
    o.onScreen = entry.isIntersecting;
  }
  if (visible) start();
  else running = false;
});

document.querySelectorAll("[data-phone3d]").forEach((el) => {
  register(el, { idle: "sway", swayY: 24, swayX: 5, follow: 18, drag: true });
});

document.querySelectorAll("[data-book3d]").forEach((el) => {
  register(el, { idle: "spin", spinSpeed: 0.35, follow: 0, drag: true });
});

document.querySelectorAll("[data-card3d]").forEach((el) => {
  register(el, { idle: "float", follow: 14, drag: false });
});

objects.forEach((o) => io.observe(o.el));

/* Paint one frame now so nothing sits flat before the loop starts. */
step(1, performance.now(), true);
document.documentElement.classList.add("has-3d");
