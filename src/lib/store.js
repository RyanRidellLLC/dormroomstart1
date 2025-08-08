// super-simple localStorage store you can swap for Supabase later
const KEY_THREADS = 'dv_forum_threads_v1';
const KEY_COMMENTS = 'dv_forum_comments_v1';

const read = (key) => JSON.parse(localStorage.getItem(key) || '[]');
const write = (key, val) => localStorage.setItem(key, JSON.stringify(val));

export function listThreads({ tab, search = '', university = 'All', stage = 'All' } = {}) {
  const threads = read(KEY_THREADS);
  return threads
    .filter(t => (tab ? t.tab === tab : true))
    .filter(t => (university === 'All' ? true : t.university === university))
    .filter(t => (stage === 'All' ? true : t.stage === stage))
    .filter(t => {
      const q = search.toLowerCase();
      return !q || t.title.toLowerCase().includes(q) || t.body.toLowerCase().includes(q) || t.tags.join(',').toLowerCase().includes(q);
    })
    .sort((a,b) => (b.updatedAt || b.createdAt) - (a.updatedAt || a.createdAt));
}

export function getThread(id) {
  return read(KEY_THREADS).find(t => t.id === id);
}

export function createThread(thread) {
  const threads = read(KEY_THREADS);
  const id = crypto.randomUUID();
  const now = Date.now();
  const newThread = { id, createdAt: now, updatedAt: now, ...thread, comments: 0 };
  threads.unshift(newThread);
  write(KEY_THREADS, threads);
  return newThread;
}

export function listComments(threadId) {
  return read(KEY_COMMENTS).filter(c => c.threadId === threadId).sort((a,b) => a.createdAt - b.createdAt);
}

export function addComment(threadId, comment) {
  const comments = read(KEY_COMMENTS);
  const id = crypto.randomUUID();
  const now = Date.now();
  comments.push({ id, threadId, createdAt: now, ...comment });
  write(KEY_COMMENTS, comments);

  // bump thread updatedAt + comment count
  const threads = read(KEY_THREADS).map(t => {
    if (t.id === threadId) return { ...t, updatedAt: now, comments: (t.comments || 0) + 1 };
    return t;
  });
  write(KEY_THREADS, threads);

  return { id, threadId, createdAt: now, ...comment };
}

export function seedIfEmpty() {
  const threads = read(KEY_THREADS);
  if (threads.length) return;

  const seed = [
    {
      title: "How do you structure a 60-sec pitch?",
      body: "Looking for a tight structure investors love. Problem → Solution → Traction → Ask?",
      tab: "founders", tags: ["pitch","feedback"], stage: "ideas", university: "Stanford"
    },
    {
      title: "Investor diligence checklist for pre-revenue?",
      body: "What do you actually look for besides the team and market?",
      tab: "investors", tags: ["diligence","pre-revenue"], stage: "ideas", university: "MIT"
    },
    {
      title: "Office hours: Go-to-market for campus apps",
      body: "Happy to review GTM plans this Friday. Drop your one-liners.",
      tab: "mentors", tags: ["GTM","review"], stage: "revenue", university: "Harvard"
    }
  ];
  seed.forEach(createThread);
}
