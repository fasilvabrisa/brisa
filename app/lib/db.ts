import fs from "fs";
import path from "path";
import crypto from "crypto";

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: number;
};

export type WorkRequest = {
  id: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  category: string;
  location: string;
  createdAt: number;
};

export type Interest = {
  id: string;
  requestId: string;
  userId: string;
  userName: string;
  createdAt: number;
};

type DB = {
  users: User[];
  requests: WorkRequest[];
  interests: Interest[];
};

let _db: DB | null = null;

function loadDb(): DB {
  if (_db) return _db;
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    if (fs.existsSync(DB_FILE)) {
      _db = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
    } else {
      _db = { users: [], requests: [], interests: [] };
      saveDb();
    }
  } catch {
    _db = { users: [], requests: [], interests: [] };
  }
  return _db!;
}

function saveDb(): void {
  if (!_db) return;
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DB_FILE, JSON.stringify(_db, null, 2));
}

export function newId(): string {
  return crypto.randomUUID();
}

// Users
export function findUserByEmail(email: string): User | undefined {
  return loadDb().users.find((u) => u.email === email);
}

export function findUserById(id: string): User | undefined {
  return loadDb().users.find((u) => u.id === id);
}

export function createUser(data: Omit<User, "id" | "createdAt">): User {
  const db = loadDb();
  const user: User = { ...data, id: newId(), createdAt: Date.now() };
  db.users.push(user);
  saveDb();
  return user;
}

// Work requests
export function listRequests(): WorkRequest[] {
  return [...loadDb().requests].sort((a, b) => b.createdAt - a.createdAt);
}

export function findRequestById(id: string): WorkRequest | undefined {
  return loadDb().requests.find((r) => r.id === id);
}

export function createRequest(
  data: Omit<WorkRequest, "id" | "createdAt">
): WorkRequest {
  const db = loadDb();
  const request: WorkRequest = { ...data, id: newId(), createdAt: Date.now() };
  db.requests.push(request);
  saveDb();
  return request;
}

// Interests
export function listInterestsByRequest(requestId: string): Interest[] {
  return loadDb().interests.filter((i) => i.requestId === requestId);
}

export function findInterest(
  requestId: string,
  userId: string
): Interest | undefined {
  return loadDb().interests.find(
    (i) => i.requestId === requestId && i.userId === userId
  );
}

export function createInterest(
  data: Omit<Interest, "id" | "createdAt">
): Interest {
  const db = loadDb();
  const interest: Interest = { ...data, id: newId(), createdAt: Date.now() };
  db.interests.push(interest);
  saveDb();
  return interest;
}

export function deleteInterest(requestId: string, userId: string): void {
  const db = loadDb();
  db.interests = db.interests.filter(
    (i) => !(i.requestId === requestId && i.userId === userId)
  );
  saveDb();
}
