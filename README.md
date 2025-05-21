# 📝 CodeTyper

## 📌 Summary

`<CodeTyper />` is a web-based typing tool designed for developers who want to improve their speed and accuracy when writing code. This is a mini project developed over the course of one week as part of a exam. The solution is focused on speed, functionality, and user experience – with an emphasis on frontend development.

---

## 💡 Problem Statement

Popular typing tools focus on natural language text, but programming requires a different kind of muscle memory. Developers often need to type symbols like `{}`, `[]`, `()`, `;`, `</>` and follow patterns like `camelCase` and `PascalCase`, which demand separate practice.

---

## 🎯 Goal and Target Audience

**Goal:**  
Build a solution where users can practice writing real code snippets – and get feedback on WPM (words per minute), number of mistakes, time spent, accuracy, and more.

**Target Audience:**  
Developers, apprentices, students, or anyone switching between platforms (e.g., Mac vs PC) who wants to improve their coding speed.

---

## 🛠️ Technologies

- **Framework:** React + Remix
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State & UX:** Custom React hooks, modals, keyboard listeners
- **Auth & DB:** AWS Cognito + DynamoDB
- **Other Tools:** Vite, ESLint

---

## 🔄 Functionality

- Select or paste custom code
- Randomize word order
- Typing session with real-time WPM and counter display
- Save results to DB (per authenticated user)
- View previous results and open them in a modal

---

## 📚 Libraries Used

| Library                    | Purpose                                             |
| -------------------------- | --------------------------------------------------- |
| `react` / `react-dom`      | Core UI library                                     |
| `@remix-run/*`             | Fullstack routing and server rendering (Remix)      |
| `tailwindcss`              | Utility-first styling (configured via Vite)         |
| `react-oidc-context`       | Handles authentication flow via AWS Cognito         |
| `oidc-client-ts`           | OIDC token handling under the hood                  |
| `@aws-sdk/client-dynamodb` | Interact with DynamoDB                              |
| `@aws-sdk/lib-dynamodb`    | High-level DynamoDB helpers                         |
| `@aws-sdk/util-dynamodb`   | `marshall` / `unmarshall` for working with DynamoDB |
| `isbot`                    | Helps detect bot traffic (used internally by Remix) |

---

## 📊 Saved each typing session:

```json
{
  "id": "uuid",
  "userId": "cognito-sub",
  "email": "user@example.com",
  "wpm": 56,
  "mistakes": 4,
  "time": 37.45,
  "text": "Code the user has just written.",
  "createdAt": "date"
}
```

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

## 📜 Documentation

- `README.md` (this file)
- GitHub commit history
- Daily work logs and weekly planning
- Architecture diagram
- Flowchart for user interaction
- Change request and project scope documents
- Figma UI mockups

---

## ✅ Status

- Fully working demo (local environment)
- Areas for future improvement (e.g., usernames, hosting)

---
