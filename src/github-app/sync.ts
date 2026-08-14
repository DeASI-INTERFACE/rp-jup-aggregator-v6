import axios, { AxiosError } from 'axios';
import type { ExternalIssuePayload, SyncConfig } from './types';
const RETRYABLE = new Set([429, 500, 502, 503, 504]);
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
function isRetryable(e: unknown): boolean {
  if (e instanceof AxiosError && e.response) return RETRYABLE.has(e.response.status);
  return e instanceof AxiosError && !e.response;
}
export async function syncIssueToTracker(payload: ExternalIssuePayload, config: SyncConfig): Promise<void> {

const RETRYABLE_STATUS_CODES = new Set([429, 500, 502, 503, 504]);

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryable(error: unknown): boolean {
  if (error instanceof AxiosError && error.response) {
    return RETRYABLE_STATUS_CODES.has(error.response.status);
  }
  return error instanceof AxiosError && !error.response;
}

export async function syncIssueToTracker(
  payload: ExternalIssuePayload,
  config: SyncConfig,
): Promise<void> {
  let attempt = 0;
  while (attempt <= config.maxRetries) {
    try {
      await axios.post(config.trackerUrl, payload, {
        headers: { 'X-Api-Key': config.trackerToken, 'Content-Type': 'application/json' },
        timeout: config.timeoutMs,
        validateStatus: (s) => s >= 200 && s < 300,
      });
      return;
    } catch (e) {
      if (!isRetryable(e) || attempt === config.maxRetries) throw e;
      await sleep(config.retryDelayMs * Math.pow(2, attempt++));
        validateStatus: (status) => status >= 200 && status < 300,
      });
      return;
    } catch (error) {
      if (!isRetryable(error) || attempt === config.maxRetries) throw error;
      await sleep(config.retryDelayMs * Math.pow(2, attempt));
      attempt++;
    }
  }
}
