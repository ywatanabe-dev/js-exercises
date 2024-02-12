type Result = Success | Failed;

interface Success {
  success: boolean;
  data: unknown;
}

interface Failed {
  success: boolean;
  error: unknown;
}

export function parseJson(input: string): Result {
  try {
    const result = JSON.parse(input);
    return { success: true, data: result };
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "";
    return { success: false, error: message };
  }
}
