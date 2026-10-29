# PostureAI 🧍

### Your posture called. It wants a better working environment.

**PostureAI** is an open-source, privacy-first posture monitoring system that uses computer vision to track body alignment in real time. It visualizes your skeletal landmarks, measures posture-related angles, and aims to help you understand how your posture changes throughout the day.

No subscriptions. No cloud GPUs. No webcam footage uploaded to a server. Just computer vision, a little biomechanics, and hopefully fewer hours spent shaped like a question mark.

## ✨ Features

- **Real-time pose detection** — Track body landmarks using MediaPipe.
- **Skeletal visualization** — See detected landmarks and connections directly over your webcam feed.
- **Posture metrics** — Calculate neck-related angles, shoulder tilt, and other geometric measurements.
- **Personal baselines** — Planned support for comparing your current posture with your own reference measurements.
- **Local-first privacy** — Designed to process video on-device and store structured metrics locally.
- **Open source** — Built to be accessible, extensible, and free to use.

> **Development status:** Early development. Core pose detection and metric calculations exist in the prototype. Personal calibration, historical analytics, and advanced posture intelligence are still in development.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js + TypeScript | Frontend application |
| Tailwind CSS | User interface |
| MediaPipe Pose | Real-time pose estimation |
| HTML Canvas | Skeleton and measurement overlays |
| Zustand | Application state |
| IndexedDB / Dexie.js | Local data persistence |

## 🚀 Getting Started

**Prerequisites:** Node.js, npm, Git, and a webcam.

```bash
git clone https://github.com/YOUR_USERNAME/postureai.git
cd postureai
npm install
npm run dev
```

Open `http://localhost:3000` in your browser and grant camera access when prompted.

Replace `YOUR_USERNAME` with your GitHub username.

## 🏗️ What's Next?

- [ ] Rebuild the prototype with a modular V2 architecture.
- [ ] Improve measurement accuracy and landmark validation.
- [ ] Implement personal posture calibration.
- [ ] Add posture history and visual analytics.
- [ ] Develop intelligent, configurable break reminders.
- [ ] Investigate ML-based posture trend analysis.
- [ ] Bundle runtime assets for fully offline operation.

## 🔒 Privacy First

Your webcam feed should stay yours.

PostureAI is designed to process video locally and persist structured posture measurements rather than raw footage. Full offline operation is a goal, and requires bundling model assets and verifying that the application works without a network connection.

## 🤝 Contributing

Contributions, bug reports, and ideas are welcome. If you're interested in computer vision, biomechanics, or building privacy-first AI applications, feel free to get involved.

## 📄 License

Open-source licensing will be specified in the repository's `LICENSE` file.

---

**The goal:** Build a posture system that explains its measurements instead of throwing random numbers at you and calling it science.

*Built in the open. Designed with privacy in mind. One less excuse to become a desk goblin.*