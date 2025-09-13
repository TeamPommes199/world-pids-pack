# Contributing to World PIDS Pack

Would you like to create your own PIDs and add them to the pack, or modify existing ones?
If so, here is a tutorial showing you how to get the pack, edit it, and submit your changes:

## 1. Fork the Repository
- Click the **"Fork"** button in the top-right corner of the repo page.
  - This creates a copy of the project in your GitHub account.
 
## 2. Clone Your Fork
Open a terminal and run:
```bash
git clone https://github.com/YOUR_USERNAME/world-pids-pack
cd world-pids-pack
```
- replace YOUR_USERNAME with your username

## 3. Create a New Branch
- It’s recommended to work on a separate branch:
```bash
git checkout -b feature/your-change-name
```
- feature can be replaced with things like:
  - fix - when your changes fix something
  - change - when you e. g. update a PIDs background
  - feature - when you add a new PIDs **feature/special**
  - pids - when you add a completly new PIDs background or script
 
## 4. Make Your Changes
- Edit or add files as needed.
- Keep the existing folder structure.

## 5. Commit Your Changes
```bash
git add .
git commit -m "Describe your changes here"
```

## 6. Push to Your Fork
```bash
git push origin feature/your-change-name
```

## 7. Open a Pull Request
- Go to your fork on GitHub.
- Click "Compare & pull request".
- Write a short description of what you changed.
- Submit the pull request.


## Contributor License Agreement

By submitting code to this repository, you agree that:

- Your contribution will become part of the **World-PIDs-Pack** project.
- Your contribution will be distributed under the same license as the project (see [LICENSE](LICENSE.txt)).
- You still retain the rights to use your own code elsewhere.
- You cannot hold the project maintainers liable for using your contribution as part of the pack.
