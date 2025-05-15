# React Native Task Manager App (Expo)

This is a simple task manager app built with **React Native** using **Expo**. It supports both web and mobile platforms with platform-specific behavior for an optimal user experience.

## 🚀 Features

- ✅ Add new tasks
- ✅ Edit tasks (tap to edit on mobile, pencil icon on web)
- ✅ Delete tasks (swipe on mobile, trash icon on web)
- ✅ Mark tasks as completed
- ✅ Auto-save on mobile when editing finishes
- ✅ Enter key support for adding and saving tasks on web
- ✅ Responsive and clean UI with gesture support

## 📱 Platform-specific behavior

| Feature             | Web               | Mobile (iOS/Android)     |
|---------------------|-------------------|--------------------------|
| Edit button         | Pencil icon       | Tap task text to edit    |
| Delete button       | Trash icon        | Swipe left to delete     |
| Save edit           | Enter key or Save | Tap away (auto-save)     |
| Add task            | Button / Enter    | Button only              |

## 🛠️ Tech Stack

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/)
- [@expo/vector-icons](https://docs.expo.dev/guides/icons/)

## 🧑‍💻 Getting Started

1. Clone the repo:

```bash
git clone https://github.com/your-username/task-app.git
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

- Make sure to wrap the app in `GestureHandlerRootView` for swipe gestures.
- Uses platform detection with `Platform.OS` to conditionally render UI and behavior.

---

Feel free to contribute or customize!
