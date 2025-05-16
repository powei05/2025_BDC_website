# 2025_BDC_website

This is the official frontend codebase for the **2025 BioDesign Challenge** website, developed by the Petrichor team. Built with **React** and **Vite**, this project emphasizes performance, scalability, and developer experience.

## 🔧 Tech Stack

- **React** – Declarative UI library for building user interfaces
- **Vite** – Lightning-fast build tool and development server
- **ESLint** – Linting for code quality and consistency
- **Node.js** – JavaScript runtime environment
- **TensorFlow.js** - Machine learning library for clothing detection
- **Docker** - Containerization for easy deployment

---

## 🚀 Getting Started

Follow the steps below to clone, set up, and run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/powei05/2025_BDC_website.git
```

### 2. Navigate into the project folder

```bash
cd 2025_BDC_website
```

### 3. Install Node.js (if you haven't already)

You can download Node.js from the official website: https://nodejs.org

### 4. Verify Node.js installation

```bash
node -v
```

### 5. Install project dependencies

```bash
npm install
```

This command installs all necessary packages defined in package.json.

### 6. Start the development server

```bash
npm run dev
```

Once the server is running, open your browser and go to:

```bash
http://localhost:5173
```

## 🐳 Docker Deployment

You can also run this application using Docker:

### 1. Build and run with Docker Compose

```bash
docker-compose up -d
```

This will build the Docker image and start the container. The application will be available at:

```
http://localhost
```

### 2. Stop the Docker container

```bash
docker-compose down
```

## 📷 Clothing Detection Demo

This project includes a clothing detection feature that demonstrates real-time clothing movement detection:

- Uses your device's camera to identify clothing items
- Highlights clothing areas when movement is detected
- Changes color (to yellow) in real-time when movement is detected

To try this feature:

1. Click the "Demo" button on the homepage or navigate to `/demo`
2. Allow camera access when prompted
3. Click "Start Detection"
4. Move to see the clothing detection in action

### 7. Project Structure

![Project Structure](./img/structure.png)

### 8. Maintainers

This project is maintained by the Petrichor Consulting Co., Ltd.
For any issues or contribution inquiries, please open an issue on GitHub or contact the team.
