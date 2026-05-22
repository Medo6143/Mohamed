const SESSION_KEY = "mw_session_id";
const TRACKED_KEY = "mw_session_tracked";

function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

async function track(eventType: string, projectId?: string) {
  try {
    await fetch("/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventType, projectId, sessionId: getSessionId() }),
    });
  } catch {
    // Fail silently — analytics should never break the site
  }
}

export function trackPageView() {
  const key = `${TRACKED_KEY}_page`;
  if (sessionStorage.getItem(key)) return;
  sessionStorage.setItem(key, "1");
  track("page_view");
}

export function trackProjectView(projectId: string) {
  const key = `${TRACKED_KEY}_proj_${projectId}`;
  if (sessionStorage.getItem(key)) return;
  sessionStorage.setItem(key, "1");
  track("project_view", projectId);
}
