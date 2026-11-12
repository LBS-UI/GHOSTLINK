# GHOSTLINK // FIELD INTERFACE

A fictional, wrist-mounted spy-gadget web application. Mobile-first, installable,
offline-capable after the first visit, and built with plain HTML, CSS and
JavaScript. No build step, no backend, no API keys, no paid services.

---

## 1. Description

GHOSTLINK presents a cyan holographic field terminal across six modes:

| Mode | What it does |
|---|---|
| **Radar** | Animated sweep, range rings, crosshair, cardinals, generated contacts, pause/resume, speed slider |
| **Compass** | Rotating dial, numeric heading, cardinal label, real device-orientation support with a clearly labelled simulation fallback |
| **Camera** | User-initiated `getUserMedia` preview, viewfinder overlay, local frame capture/download |
| **Mission** | Editable title + notes, localStorage persistence, TXT export, confirmed clear, session activity log |
| **Diagnostics** | Honest capability report: network, screen, battery, camera/geo/orientation APIs, fullscreen, service worker, storage, plus opt-in location |
| **Sound** | Locally synthesised Web Audio ping/alert/scan, mute toggle, stop output |

The interface targets portrait phones, uses large touch targets, respects
`safe-area-inset`, avoids horizontal scrolling, and honours
`prefers-reduced-motion`.

---

## 2. File structure
