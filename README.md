# 🤖 Meme Messenger Bot

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Telegram](https://img.shields.io/badge/Telegram_Bot_API-26A5E4?style=flat&logo=telegram&logoColor=white)](https://core.telegram.org/bots/api)

A robust Telegram bot designed for seamless meme sharing, management, and storage. This project demonstrates a scalable backend architecture for handling real-time user interactions and data persistence.

---

## 🚀 Key Features

* **Meme Exchange:** Send and receive memes instantly through the Telegram interface.
* **Command-Driven Interface:** Intuitive interaction using custom Telegram commands.
* **Persistent Storage:** Secured user data and meme metadata storage using MongoDB.
* **Scalable Architecture:** Modular codebase for easy feature expansion and maintenance.
* **Broadcast System:** Built-in capability for administrative user notifications.

## 🛠 Tech Stack

* **Runtime:** Node.js
* **Framework:** Telegraf (Telegram Bot Framework)
* **Database:** MongoDB (via Mongoose)
* **Language:** JavaScript (ES6+)

## 📁 Project Structure

```
src/
 ├── bot.js          # Bot initialization & entry point
 ├── config/       # Command logic & message processing
 ├── models/       # Schema definitions & MongoDB connection
 └── modules/          # Helper functions & validation logic
```

## ⚙️ Installation & Setup

Follow these steps to get a local copy of the project up and running.

### 1. Prerequisites
Ensure you have the following installed:
* **Node.js** (v14.x or higher)
* **npm** (v6.x or higher)
* **MongoDB** (Local instance or Atlas cluster)

### 2. Clone the Repository
\`\`\`bash
git clone https://github.com/fineput/memesMessanger_bot.git
cd memesMessanger_bot
\`\`\`

### 3. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 4. Configuration
Create a \`.env\` file in the root directory and add your credentials:
\`\`\`env
BOT_TOKEN=your_telegram_bot_token
MONGO_URI=your_mongodb_connection_string
\`\`\`

### 5. Running the Bot
**Start the application:**
\`\`\`bash
npm start
\`\`\`

## 🔄 Logic Flow

1. **Request:** User sends a command or media to the bot.
2. **Processing:** Handlers parse the intent and validate the input.
3. **Persistence:** Data is fetched from or saved to the MongoDB cluster.
4. **Response:** The bot provides visual or textual feedback to the user.

## 🔮 Future Roadmap

- [ ] **Rating System:** Upvote/downvote memes to identify top content.
- [ ] **User Profiles:** Track shared memes and personal statistics.
- [ ] **AI Integration:** Automatic image description and tagging.
- [ ] **Web Dashboard:** A React-based interface to browse the meme database.

---

## 👤 Author

**Yaroslav Olefirenko**
* GitHub: [@fineput](https://github.com/fineput)
