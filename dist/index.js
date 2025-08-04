var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  chatMessageSchema: () => chatMessageSchema,
  chatRequestSchema: () => chatRequestSchema,
  chatSessions: () => chatSessions,
  contacts: () => contacts,
  insertChatSessionSchema: () => insertChatSessionSchema,
  insertContactSchema: () => insertContactSchema
});
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  industry: text("industry"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var chatSessions = pgTable("chat_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull(),
  messages: json("messages").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var insertContactSchema = createInsertSchema(contacts).pick({
  firstName: true,
  lastName: true,
  email: true,
  company: true,
  industry: true,
  message: true
}).extend({
  industry: z.string().optional()
});
var insertChatSessionSchema = createInsertSchema(chatSessions).pick({
  sessionId: true,
  messages: true
});
var chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  timestamp: z.string()
});
var chatRequestSchema = z.object({
  message: z.string().min(1),
  sessionId: z.string().optional()
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
var MemStorage = class {
  contacts;
  chatSessions;
  constructor() {
    this.contacts = /* @__PURE__ */ new Map();
    this.chatSessions = /* @__PURE__ */ new Map();
  }
  async createContact(insertContact) {
    const id = randomUUID();
    const contact = {
      ...insertContact,
      industry: insertContact.industry || null,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }
  async getContact(id) {
    return this.contacts.get(id);
  }
  async createChatSession(insertSession) {
    const id = randomUUID();
    const session = {
      ...insertSession,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.chatSessions.set(insertSession.sessionId, session);
    return session;
  }
  async getChatSession(sessionId) {
    return this.chatSessions.get(sessionId);
  }
  async updateChatSession(sessionId, messages) {
    const existing = this.chatSessions.get(sessionId);
    if (!existing) {
      throw new Error("Chat session not found");
    }
    const updated = {
      ...existing,
      messages,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.chatSessions.set(sessionId, updated);
    return updated;
  }
};
var DatabaseStorage = class {
  async createContact(insertContact) {
    const [contact] = await db.insert(contacts).values(insertContact).returning();
    return contact;
  }
  async getContact(id) {
    const [contact] = await db.select().from(contacts).where(eq(contacts.id, id));
    return contact || void 0;
  }
  async createChatSession(insertSession) {
    const [session] = await db.insert(chatSessions).values(insertSession).returning();
    return session;
  }
  async getChatSession(sessionId) {
    const [session] = await db.select().from(chatSessions).where(eq(chatSessions.sessionId, sessionId));
    return session || void 0;
  }
  async updateChatSession(sessionId, messages) {
    const [session] = await db.update(chatSessions).set({ messages, updatedAt: /* @__PURE__ */ new Date() }).where(eq(chatSessions.sessionId, sessionId)).returning();
    if (!session) {
      throw new Error("Chat session not found");
    }
    return session;
  }
};
var storage = process.env.NODE_ENV === "production" ? new DatabaseStorage() : new MemStorage();

// server/lib/openai.ts
import OpenAI from "openai";
var openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});
async function generateChatResponse(message, conversationHistory = []) {
  try {
    const systemPrompt = `You are an AI business consultant for iLove AI, a global AI solutions company. You help businesses understand how AI agents can transform their operations.

Key services we offer:
- Customer Service Agents: 24/7 multilingual chatbots for customer support
- Business Intelligence Agents: AI-powered analytics and reporting
- E-commerce Agents: Personalized shopping assistants and inventory management
- Process Automation Agents: Workflow automation and document processing

Focus on:
- Understanding the client's business needs
- Explaining how AI can solve their specific challenges
- Highlighting benefits like cost reduction, efficiency gains, and improved customer satisfaction
- Mentioning our expertise with businesses worldwide
- Being professional yet approachable
- Asking follow-up questions to better understand their needs

Keep responses concise but informative. Always end with a question or call-to-action to continue the conversation.`;
    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
      { role: "user", content: message }
    ];
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      max_tokens: 500,
      temperature: 0.7
    });
    return response.choices[0].message.content || "I apologize, but I'm having trouble processing your request right now. Please try again or contact our team directly.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate AI response. Please try again later.");
  }
}

// server/lib/email.ts
import nodemailer from "nodemailer";
var transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || process.env.EMAIL_USER,
    pass: process.env.SMTP_PASS || process.env.EMAIL_PASS
  }
});
async function sendContactEmail(contactData) {
  try {
    const emailHTML = `
      <h2>New Contact Form Submission - iLove AI</h2>
      <p><strong>Name:</strong> ${contactData.firstName} ${contactData.lastName}</p>
      <p><strong>Email:</strong> ${contactData.email}</p>
      <p><strong>Company:</strong> ${contactData.company}</p>
      <p><strong>Industry:</strong> ${contactData.industry || "Not specified"}</p>
      <p><strong>Message:</strong></p>
      <p>${contactData.message}</p>
    `;
    await transporter.sendMail({
      from: process.env.SMTP_USER || "noreply@ilove-ai.co.za",
      to: process.env.CONTACT_EMAIL || "hello@ilove-ai.co.za",
      subject: `New Contact Form Submission from ${contactData.company}`,
      html: emailHTML
    });
    await transporter.sendMail({
      from: process.env.SMTP_USER || "noreply@ilove-ai.co.za",
      to: contactData.email,
      subject: "Thank you for contacting iLove AI",
      html: `
        <h2>Thank you for your interest in iLove AI!</h2>
        <p>Dear ${contactData.firstName},</p>
        <p>We've received your inquiry and our team will get back to you within 24 hours.</p>
        <p>In the meantime, feel free to explore our case studies and learn more about how we've helped businesses worldwide transform with AI.</p>
        <p>Best regards,<br>The iLove AI Team</p>
      `
    });
    return { success: true };
  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error("Failed to send email notification");
  }
}

// server/routes.ts
import { randomUUID as randomUUID2 } from "crypto";
async function registerRoutes(app2) {
  app2.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      try {
        await sendContactEmail(contactData);
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }
      res.json({
        success: true,
        message: "Thank you for your inquiry! We'll get back to you within 24 hours.",
        contactId: contact.id
      });
    } catch (error) {
      console.error("Contact submission error:", error);
      res.status(400).json({
        success: false,
        message: "Failed to submit contact form. Please try again."
      });
    }
  });
  app2.post("/api/chat", async (req, res) => {
    try {
      const { message, sessionId } = chatRequestSchema.parse(req.body);
      let currentSessionId = sessionId || randomUUID2();
      let conversationHistory = [];
      if (sessionId) {
        const existingSession = await storage.getChatSession(sessionId);
        if (existingSession) {
          conversationHistory = existingSession.messages;
        }
      }
      const aiResponse = await generateChatResponse(
        message,
        conversationHistory.map((msg) => ({ role: msg.role, content: msg.content }))
      );
      const userMessage = {
        role: "user",
        content: message,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
      const assistantMessage = {
        role: "assistant",
        content: aiResponse,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
      const updatedHistory = [...conversationHistory, userMessage, assistantMessage];
      if (sessionId && await storage.getChatSession(sessionId)) {
        await storage.updateChatSession(currentSessionId, updatedHistory);
      } else {
        await storage.createChatSession({
          sessionId: currentSessionId,
          messages: updatedHistory
        });
      }
      res.json({
        response: aiResponse,
        sessionId: currentSessionId
      });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({
        error: "I apologize, but I'm having trouble processing your request right now. Please try again or contact our team directly."
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port} - updated`);
  });
})();
