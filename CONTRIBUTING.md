# Contributing to ngx-tailwind-flex-ui 🚀

Thank you for considering contributing to this project! Your help is **greatly appreciated**.  
This guide will help you contribute effectively.

---

## 🛠️ How to Contribute

### 1️⃣ Fork & Clone the Repository
You **cannot push directly to this repository**.  
Instead, you must **fork the repository** and work in your own copy.

#### **Step 1: Fork the Repository**
1. Go to the **ngx-tailwind-flex-ui** repository on GitHub:  
   👉 [https://github.com/iarunsaragadam/ngx-tailwind-flex-ui](https://github.com/iarunsaragadam/ngx-tailwind-flex-ui)
2. Click the **Fork** button (top-right corner).
3. This creates **your own copy** of the project under `your-username/ngx-tailwind-flex-ui`.

#### **Step 2: Clone Your Fork Locally**
Once forked, open your terminal and run:
```sh
git clone https://github.com/YOUR_USERNAME/ngx-tailwind-flex-ui.git
cd ngx-tailwind-flex-ui
```

#### **Step 3: Set Up the Main Repository as an Upstream**
To keep your fork updated, connect it to the original repository:
```sh
git remote add upstream https://github.com/iarunsaragadam/ngx-tailwind-flex-ui.git
git fetch upstream
```

---

### 2️⃣ Follow Branching Strategy
This project follows **Trunk-Based Development**:

| Branch  | Purpose |
|---------|---------|
| `main`  | Always stable, deployable at all times |
| (Feature flags) | Features are merged into `main` behind flags |

All new contributions should be made in a **separate branch in your fork**.

---

### 3️⃣ Create a New Branch for Your Work
Before making any changes, **always create a new branch** inside your fork.

#### **Step 1: Create a Branch**
Run the following command (replace `feature-branch` with a meaningful name):
```sh
git checkout -b feature-branch
```

#### **Step 2: Make Your Changes**
- Edit the code, add new features, or fix bugs.
- Save your files.

#### **Step 3: Stage and Commit Your Changes**
Run:
```sh
git add .
git commit -m "feat: add new feature"
```

💡 **Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format** to ensure correct versioning.

---

### 4️⃣ Run Tests & Linting Before Pushing
Before submitting your changes, ensure they pass all checks:
```sh
npm run lint
npm run test
npm run build
```
⚠️ **If any test fails, CI will reject your PR. Fix issues before pushing!**

---

## 🔀 Creating a Pull Request (PR)

### ✅ **PR Checklist**
Before submitting a PR:
- [ ] **Ensure tests pass** (`npm run test`).
- [ ] **Write meaningful commit messages**.
- [ ] **Include relevant documentation**.
- [ ] **Target `main` branch**.
- [ ] **Use feature flags if your feature isn’t stable yet**.

### **Step-by-Step PR Flow**
#### **Step 1: Push Your Branch to Your Fork**
Since **all contributors must work from their fork**, you **must push your changes to your fork first**:
```sh
git push origin feature-branch
```

#### **Step 2: Create a Pull Request**
1. Go to **your forked repository** on GitHub.
2. Click the **"Compare & pull request"** button.
3. Ensure your PR **targets**:
   - **Base repository:** `iarunsaragadam/ngx-tailwind-flex-ui`
   - **Base branch:** `main`
   - **Head repository:** `your-username/ngx-tailwind-flex-ui`
   - **Compare branch:** `feature-branch`
4. Add a clear **PR title** and **description**.
5. Click **"Create Pull Request"**.

---

### 🔄 Keeping Your Fork Updated
Before making new contributions, **sync your fork** with the latest changes:

```sh
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
```
This ensures your fork is **up-to-date** before you create a new branch for additional contributions.

---

## 🚀 Automated Releases
This project uses **Semantic Release**:
- **Every commit to `main` triggers a `canary` release** (`@canary` on npm).
- **Stable releases** are created based on commit messages.
- **Changelogs & GitHub releases** are generated automatically.

---

## 📌 Code of Conduct
Please follow the [Code of Conduct](./CODE_OF_CONDUCT.md).

---

## 🎯 Need Help?
If you're unsure about something:
- Open a **GitHub Issue**.
- Ask in **Discussions**.
- Mention a maintainer in a PR.

We appreciate your contributions! ❤️🚀
