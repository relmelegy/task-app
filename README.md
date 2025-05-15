# React Native Task Manager App (Expo)

This is a simple task manager app built with **React Native** using **Expo**. It supports both web and mobile platforms with platform-specific behavior for an optimal user experience.

## 🚀 Features

- ✅ Add new tasks
- ✅ Edit tasks (tap to edit on mobile, pencil icon on web)
- ✅ Delete tasks (swipe on mobile, trash icon on web)
- ✅ Mark tasks as completed (toggle check icon or tap on item)
- ✅ Auto-save on mobile when editing finishes
- ✅ Enter key support for adding and saving tasks on web
- ✅ Responsive and clean UI with gesture support

## 📱 Platform-specific behavior

| Feature             | Web               | Mobile (iOS/Android)     |
|---------------------|-------------------|--------------------------|
| Edit action         | Pencil icon       | Tap task text to edit    |
| Delete button       | Trash icon        | Swipe left to delete     |
| Save edit           | Enter key or Save | Tap away (auto-save)     |
| Add task            | Button / Enter    | Button only              |

<!--
## 🖼️ Screenshots

| Web                 | Mobile             |
|---------------------|--------------------|
| ![web](screenshots/web.png) | ![mobile](screenshots/mobile.png) |
-->

## 🛠️ Tech Stack

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/)
- [@expo/vector-icons](https://docs.expo.dev/guides/icons/)

## 🧑‍💻 Getting Started

1. Clone the repo:

```bash
git clone https://github.com/relmelegy/task-app.git
cd task-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the app:

```bash
npx expo start
```

You can run it on:
- Web: press `w`
- iOS Simulator: press `i`
- Android Emulator: press `a`
- Physical device with Expo Go app (scan QR code)

## 📂 Project Structure

```
components/
  ui/
    IconButton.tsx
    StyledInput.tsx
    styles.ts
  TaskItem.tsx
app/
  index.tsx
  _layout.tsx
```

## 📌 Notes

- The app is wrapped in `GestureHandlerRootView` to enable swipe gestures on mobile.
- Platform detection using `Platform.OS` is used to conditionally render UI and interactions for web vs. mobile.
- Feel free to contribute or customize the project!

## 🌐 Deployment

This app is deployed using [Expo Hosting](https://expo.dev/).

To deploy a new version:

```bash
npx expo export --platform web
eas deploy --platform web
```

To deploy to production:

```bash
eas deploy --platform web --prod
```

Production URL: [https://task-app.expo.app](https://task-app.expo.app)
