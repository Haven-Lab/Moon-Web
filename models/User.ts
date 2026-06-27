import mongoose from "mongoose";

// ── Card Schema ──────────────────────────────────────────────
const CardSchema = new mongoose.Schema(
  {
    instanceId: {
      type: String,
      required: true,
      default: () =>
        "inst_" + Date.now() + Math.random().toString(36).slice(2, 6),
    },
    cardId: { type: String, required: true },
    name: String,
    description: String,
    tier: String,
    price: Number,
    series: String,
    creator: String,
    media: Buffer,
    mediaType: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },
    obtainedAt: { type: Date, default: Date.now },
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    locked: { type: Boolean, default: false },
    inAuction: { type: Boolean, default: false },
  },
  { _id: false }
);

// ── Bot Request Schema ───────────────────────────────────────
const BotRequestSchema = new mongoose.Schema(
  {
    number: Number,
    groupLink: String,
    reason: String,
    status: { type: String, default: "pending" },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

// ── Inventory Schema ─────────────────────────────────────────
const InventorySchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    boughtAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

// ── USER MODEL ───────────────────────────────────────────────
const UserSchema = new mongoose.Schema(
  {
    discordId: { type: String, unique: true, sparse: true },
    whatsappNumber: { type: String, unique: true, sparse: true },
    userId: { type: String, unique: true, sparse: true },
    phoneNumber: { type: String, unique: true, sparse: true },

    username: { type: String, default: "Unknown" },

    // ── Economy ──────────────────────────────────────────────
    balance: { type: Number, default: 50000 },
    bank: { type: Number, default: 0 },
    totalEarned: { type: Number, default: 0 },
    totalLost: { type: Number, default: 0 },
    stardust: { type: Number, default: 0 },
    diamonds: { type: Number, default: 0 },

    // ── Role System ──────────────────────────────────────────
    role: {
      type: String,
      enum: ["User", "Tester", "Mod", "Owner", "True Owner", "CDC"],
      default: "User",
    },
    isTrueOwner: { type: Boolean, default: false },
    isCDC: { type: Boolean, default: false },

    // ── Profile ──────────────────────────────────────────────
    bio: { type: String, default: "." },
    age: { type: Number, default: 0 },
    profileImage: { type: String, default: null },
    backgroundImage: { type: String, default: null },
    videoBackground: { type: String, default: null },

    // ── Inventory ────────────────────────────────────────────
    inventory: [InventorySchema],

    // ── Cards ────────────────────────────────────────────────
    cards: [CardSchema],
    cardLimit: { type: Number, default: 100 },

    // ── AFK ───────────────────────────────────────────────────
    afk: { type: Boolean, default: false },
    afkReason: { type: String, default: null },
    afkSince: { type: Date, default: null },

    // ── Bot requests ──────────────────────────────────────────
    botRequests: [BotRequestSchema],

    // ── MESSAGE COUNT ─────────────────────────────────────────
    messageCount: { type: Number, default: 0 },

    // ── HAVEN LINK ────────────────────────────────────────────
    haven: { type: mongoose.Schema.Types.ObjectId, ref: "Haven" },

    // ── SUSPENSION SYSTEM ─────────────────────────────────────
    suspended: { type: Boolean, default: false },
    suspendReason: { type: String, default: null },
    suspendedBy: { type: String, default: null },
    suspendUntil: { type: Date, default: null },
  },
  {
    timestamps: true,
    strict: false,
  }
);

// FIX: prevents model overwrite error in Next.js
export default mongoose.models.User ||
  mongoose.model("User", UserSchema);
