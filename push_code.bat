@echo off
echo Initializing Git...
git init
git add .
git commit -m "Initial commit - DJ Creative Core"
git branch -M main
git remote add origin https://github.com/simondani094-jpg/landingpage_demo.git
git push -u origin main
pause
