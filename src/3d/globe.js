/**
 * Hero globe: a dotted Earth built from real coastlines, with a live trade
 * route from Abia, Nigeria to Shenzhen, China.
 *
 * Bundled by scripts/build-3d.js (esbuild, tree-shaken) into
 * assets/js/globe.min.js. Only the parts of three.js used here ship.
 */

import {
  AdditiveBlending,
  BackSide,
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Points,
  RingGeometry,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  TorusGeometry,
  TubeGeometry,
  Vector3,
  WebGLRenderer,
} from "three";
import { LAND_MASK, LAND_POINTS } from "./land-mask.js";

const DEG = Math.PI / 180;
const RADIUS = 1;

/* The route. Abia uses the state centre (Umuahia sits just north of it). */
const ORIGIN = { name: "Abia", country: "Nigeria", lat: 5.43, lon: 7.52 };
const DESTINATION = { name: "Shenzhen", country: "China", lat: 22.54, lon: 114.06 };

const BRAND = new Color("#1668ff");
const BRAND_BRIGHT = new Color("#5c9dff");

function latLonToVec3(lat, lon, r = RADIUS) {
  const phi = (90 - lat) * DEG;
  const theta = (lon + 180) * DEG;
  return new Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

/* Must match scripts/build-land-mask.js exactly. */
function landPositions() {
  const bits = Uint8Array.from(atob(LAND_MASK), (c) => c.charCodeAt(0));
  const golden = Math.PI * (3 - Math.sqrt(5));
  const out = [];
  for (let i = 0; i < LAND_POINTS; i++) {
    if (!(bits[i >> 3] & (1 << (i & 7)))) continue;
    const y = 1 - (i / (LAND_POINTS - 1)) * 2;
    const lat = Math.asin(y) / DEG;
    const lon = ((golden * i) % (2 * Math.PI)) / DEG - 180;
    const v = latLonToVec3(lat, lon, RADIUS * 1.001);
    out.push(v.x, v.y, v.z);
  }
  return out;
}

function makeDots() {
  const geo = new BufferGeometry();
  geo.setAttribute("position", new Float32BufferAttribute(landPositions(), 3));
  const mat = new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uColor: { value: BRAND_BRIGHT },
      uSize: { value: 2.6 },
      uPixelRatio: { value: 1 },
    },
    vertexShader: /* glsl */ `
      uniform float uSize;
      uniform float uPixelRatio;
      varying float vFacing;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vec3 n = normalize(normalMatrix * position);
        vFacing = dot(n, normalize(-mv.xyz));
        gl_Position = projectionMatrix * mv;
        gl_PointSize = uSize * uPixelRatio * (3.2 / -mv.z);
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      varying float vFacing;
      void main() {
        vec2 c = gl_PointCoord - 0.5;
        float d = length(c);
        if (d > 0.5) discard;
        float edge = smoothstep(0.5, 0.2, d);
        float limb = smoothstep(-0.05, 0.45, vFacing);
        gl_FragColor = vec4(uColor, edge * (0.25 + 0.75 * limb));
      }`,
  });
  return { points: new Points(geo, mat), material: mat };
}

function makeAtmosphere() {
  return new Mesh(
    new SphereGeometry(RADIUS * 1.24, 64, 64),
    new ShaderMaterial({
      side: BackSide,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: { uColor: { value: BRAND } },
      vertexShader: /* glsl */ `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        varying vec3 vNormal;
        void main() {
          float i = pow(max(0.0, 0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.6);
          gl_FragColor = vec4(uColor, 1.0) * i * 0.85;
        }`,
    })
  );
}

/* Great-circle arc lifted off the surface so it reads as a flight path. */
function makeArc(a, b) {
  const start = latLonToVec3(a.lat, a.lon);
  const end = latLonToVec3(b.lat, b.lon);
  const pts = [];
  const STEPS = 64;
  const angle = start.angleTo(end);
  for (let i = 0; i <= STEPS; i++) {
    const t = i / STEPS;
    const p = new Vector3()
      .copy(start)
      .multiplyScalar(Math.sin((1 - t) * angle))
      .add(new Vector3().copy(end).multiplyScalar(Math.sin(t * angle)))
      .divideScalar(Math.sin(angle))
      .normalize()
      .multiplyScalar(RADIUS * (1 + Math.sin(t * Math.PI) * 0.28));
    pts.push(p);
  }
  const curve = new CatmullRomCurve3(pts);
  const tube = new Mesh(
    new TubeGeometry(curve, 160, 0.0075, 8, false),
    new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: {
        uA: { value: BRAND },
        uB: { value: new Color("#ffffff") },
        uTime: { value: 0 },
      },
      vertexShader: /* glsl */ `
        varying float vT;
        void main() {
          vT = uv.x;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uA;
        uniform vec3 uB;
        uniform float uTime;
        varying float vT;
        void main() {
          float head = fract(uTime * 0.18);
          float glow = smoothstep(0.16, 0.0, abs(vT - head));
          vec3 col = mix(uA, uB, glow);
          float alpha = 0.55 + glow * 0.45;
          gl_FragColor = vec4(col, alpha);
        }`,
    })
  );
  return { tube, curve };
}

function makeMarker(lat, lon) {
  const group = new Group();
  const pos = latLonToVec3(lat, lon, RADIUS * 1.004);
  group.position.copy(pos);
  group.lookAt(new Vector3().copy(pos).multiplyScalar(2));

  const dot = new Mesh(
    new SphereGeometry(0.018, 16, 16),
    new MeshBasicMaterial({ color: 0xffffff })
  );
  const ring = new Mesh(
    new RingGeometry(0.03, 0.037, 48),
    new MeshBasicMaterial({
      color: BRAND_BRIGHT,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    })
  );
  group.add(dot, ring);
  return { group, ring, world: pos };
}

export function mountGlobe(host) {
  const canvas = host.querySelector("canvas");
  const labels = {
    origin: host.querySelector("[data-globe-label='origin']"),
    destination: host.querySelector("[data-globe-label='destination']"),
  };

  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch (e) {
    host.classList.add("globe-fallback");
    return;
  }

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scene = new Scene();
  const camera = new PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0, 4.6);

  const earth = new Group();
  scene.add(earth);

  /* Solid core hides the far side, so the dots read as a surface. */
  earth.add(
    new Mesh(
      new SphereGeometry(RADIUS * 0.992, 64, 64),
      new MeshBasicMaterial({ color: 0x02060f })
    )
  );

  const dots = makeDots();
  earth.add(dots.points);
  scene.add(makeAtmosphere());

  const arc = makeArc(ORIGIN, DESTINATION);
  earth.add(arc.tube);

  const a = makeMarker(ORIGIN.lat, ORIGIN.lon);
  const b = makeMarker(DESTINATION.lat, DESTINATION.lon);
  earth.add(a.group, b.group);

  /* Traveller that rides the route. */
  const traveller = new Mesh(
    new SphereGeometry(0.022, 16, 16),
    new MeshBasicMaterial({ color: 0xffffff })
  );
  earth.add(traveller);

  /* Orbit ring with a satellite, tilted off the equator. */
  const orbit = new Group();
  orbit.rotation.set(1.15, 0.2, 0.35);
  const ringMesh = new Mesh(
    new TorusGeometry(RADIUS * 1.42, 0.0022, 8, 200),
    new MeshBasicMaterial({ color: BRAND, transparent: true, opacity: 0.45 })
  );
  const sat = new Mesh(
    new SphereGeometry(0.02, 12, 12),
    new MeshBasicMaterial({ color: BRAND_BRIGHT })
  );
  orbit.add(ringMesh, sat);
  scene.add(orbit);

  /* Face the midpoint of the route toward the camera, tipped slightly. */
  const mid = new Vector3().copy(a.world).add(b.world).normalize();
  const baseYaw = -Math.atan2(mid.x, mid.z);
  let yaw = baseYaw;
  let pitch = 0.32;
  let velocity = 0;

  const AUTO_SPEED = reduceMotion ? 0 : 0.0012;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;

  canvas.addEventListener("pointerdown", (e) => {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
    host.classList.add("is-dragging");
  });
  canvas.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    velocity = dx * 0.005;
    yaw += velocity;
    pitch = Math.max(-0.9, Math.min(0.9, pitch + dy * 0.004));
  });
  const endDrag = () => {
    dragging = false;
    host.classList.remove("is-dragging");
  };
  canvas.addEventListener("pointerup", endDrag);
  canvas.addEventListener("pointercancel", endDrag);

  function resize() {
    const w = host.clientWidth;
    const h = host.clientHeight;
    if (!w || !h) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    dots.material.uniforms.uPixelRatio.value = dpr;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(host);
  resize();

  const tmp = new Vector3();
  function placeLabel(el, world) {
    if (!el) return;
    tmp.copy(world).applyMatrix4(earth.matrixWorld);
    const facing = tmp.clone().normalize().dot(camera.position.clone().normalize());
    tmp.project(camera);
    const x = (tmp.x * 0.5 + 0.5) * host.clientWidth;
    const y = (-tmp.y * 0.5 + 0.5) * host.clientHeight;
    el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    el.style.opacity = facing > 0.12 ? "1" : "0";
  }

  let t = 0;
  function frame(dt) {
    if (!dragging) {
      yaw += AUTO_SPEED * dt + velocity;
      velocity *= 0.94;
    }
    earth.rotation.set(pitch, yaw, 0);

    if (!reduceMotion) t += dt / 60;
    arc.tube.material.uniforms.uTime.value = t;

    const head = (t * 0.18) % 1;
    traveller.position.copy(arc.curve.getPointAt(head));
    traveller.visible = !reduceMotion;

    const pulse = reduceMotion ? 0.5 : (t * 0.9) % 1;
    for (const m of [a, b]) {
      m.ring.scale.setScalar(1 + pulse * 1.8);
      m.ring.material.opacity = 1 - pulse;
    }

    orbit.rotation.y += reduceMotion ? 0 : 0.0016 * dt;
    sat.position.set(Math.cos(t * 0.6) * RADIUS * 1.42, Math.sin(t * 0.6) * RADIUS * 1.42, 0);

    renderer.render(scene, camera);
    earth.updateMatrixWorld();
    placeLabel(labels.origin, a.world);
    placeLabel(labels.destination, b.world);
  }

  /* First frame immediately, so there is never a blank canvas. */
  frame(1);
  host.classList.add("globe-ready");

  let running = false;
  let last = 0;
  function loop(now) {
    if (!running) return;
    const dt = last ? Math.min((now - last) / 16.667, 3) : 1;
    last = now;
    frame(dt);
    requestAnimationFrame(loop);
  }
  function start() {
    if (running) return;
    running = true;
    last = 0;
    requestAnimationFrame(loop);
  }
  function stop() {
    running = false;
  }

  /* Only spend the GPU while the globe is on screen. */
  new IntersectionObserver((entries) => {
    entries[0].isIntersecting ? start() : stop();
  }).observe(host);
}

const host = document.querySelector("[data-globe]");
if (host) mountGlobe(host);
