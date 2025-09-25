import express, { Request, Response } from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import path from "path";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files dari folder "public"
app.use(express.static("public"));

// Route utama -> kirim index.html
app.get("/", (_req: Request, res: Response) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

// Socket.IO logic
io.on("connection", (socket: Socket) => {
  console.log("🔌 User connected:", socket.id);

  // Pesan chat
  socket.on("chat message", (msg: string) => {
    console.log("💬 Message:", msg);
    io.emit("chat message", msg);
  });

  // Typing indicator
  socket.on("typing", () => {
    socket.broadcast.emit("typing");
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// Jalankan server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
