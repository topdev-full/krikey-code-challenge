# Krikey Code Challenge
### Full Stack Engineer

## How to install
### 1. Git clone
```shell
git clone https://github.com/topdev-full/krikey-code-challenge.git
```
### 2. Install Node and PostgreSQL
### 3. Change .env files
#### - Copy frontend/.env.example to frontend/.env.production
#### - Set REACT_APP_SERVER_URL as http://localhost:5000 in .env.production file
#### - Copy backend/.env.example to backend/.env
#### - Set values related to the database as yours

### 4. Install node modules
```shell
cd frontend
npm i
cd ../backend
npm i
```
### 5. Build frontend
```shell
cd frontend
npm run build
```
### 6. Run server
```shell
cd backend
npm start
```