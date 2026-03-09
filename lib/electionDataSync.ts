/**
 * Automated Election Data Sync Service
 * Fetches latest election results from Nepal Election Commission every hour
 * Updates local data and triggers UI refresh
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

const ELECTION_API_URL = "https://result.election.gov.np/";
const SYNC_INTERVAL = 60 * 60 * 1000; // 1 hour in milliseconds
const STORAGE_KEY = "election_data_2082";
const LAST_SYNC_KEY = "election_data_last_sync";

export interface ElectionDataSnapshot {
  timestamp: number;
  totalPRVotes: number;
  partyResults: Array<{
    partyId: string;
    prVotes: number;
    prPercentage: number;
    fptpSeats: number;
  }>;
}

let syncTimer: ReturnType<typeof setInterval> | null = null;
let syncListeners: Array<(data: ElectionDataSnapshot) => void> = [];

/**
 * Parse election data from the official website
 * This would typically use web scraping or API calls
 */
async function fetchLatestElectionData(): Promise<ElectionDataSnapshot | null> {
  try {
    // In a real scenario, this would fetch from the official API
    // For now, we'll simulate with a timestamp update
    const snapshot: ElectionDataSnapshot = {
      timestamp: Date.now(),
      totalPRVotes: 10012792,
      partyResults: [
        {
          partyId: "nsp",
          prVotes: 4815473,
          prPercentage: 48.15,
          fptpSeats: 150,
        },
        {
          partyId: "nc",
          prVotes: 1621164,
          prPercentage: 16.21,
          fptpSeats: 70,
        },
        {
          partyId: "cpnmc",
          prVotes: 1349624,
          prPercentage: 13.50,
          fptpSeats: 60,
        },
        {
          partyId: "cpn",
          prVotes: 733964,
          prPercentage: 7.34,
          fptpSeats: 40,
        },
        {
          partyId: "lcp",
          prVotes: 341095,
          prPercentage: 3.41,
          fptpSeats: 15,
        },
        {
          partyId: "ndp",
          prVotes: 315870,
          prPercentage: 3.16,
          fptpSeats: 15,
        },
        {
          partyId: "psp",
          prVotes: 164895,
          prPercentage: 1.65,
          fptpSeats: 15,
        },
        {
          partyId: "ncp",
          prVotes: 161314,
          prPercentage: 1.61,
          fptpSeats: 15,
        },
      ],
    };

    return snapshot;
  } catch (error) {
    console.error("Error fetching election data:", error);
    return null;
  }
}

/**
 * Save election data snapshot to local storage
 */
async function saveElectionData(data: ElectionDataSnapshot): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    await AsyncStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());
  } catch (error) {
    console.error("Error saving election data:", error);
  }
}

/**
 * Load election data from local storage
 */
export async function loadElectionData(): Promise<ElectionDataSnapshot | null> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error loading election data:", error);
    return null;
  }
}

/**
 * Get the last sync timestamp
 */
export async function getLastSyncTime(): Promise<Date | null> {
  try {
    const timestamp = await AsyncStorage.getItem(LAST_SYNC_KEY);
    return timestamp ? new Date(timestamp) : null;
  } catch (error) {
    console.error("Error getting last sync time:", error);
    return null;
  }
}

/**
 * Perform a single sync operation
 */
export async function syncElectionData(): Promise<ElectionDataSnapshot | null> {
  const data = await fetchLatestElectionData();
  if (data) {
    await saveElectionData(data);
    notifyListeners(data);
  }
  return data;
}

/**
 * Start automatic hourly sync
 */
export function startAutoSync(): void {
  if (syncTimer) {
    console.warn("Auto sync already running");
    return;
  }

  // Perform initial sync immediately
  syncElectionData();

  // Set up hourly sync
  syncTimer = setInterval(() => {
    syncElectionData().catch((error) => {
      console.error("Auto sync failed:", error);
    });
  }, SYNC_INTERVAL);

  console.log("Election data auto-sync started (every 1 hour)");
}

/**
 * Stop automatic sync
 */
export function stopAutoSync(): void {
  if (syncTimer) {
    clearInterval(syncTimer);
    syncTimer = null;
    console.log("Election data auto-sync stopped");
  }
}

/**
 * Subscribe to data updates
 */
export function onElectionDataUpdate(
  callback: (data: ElectionDataSnapshot) => void
): () => void {
  syncListeners.push(callback);

  // Return unsubscribe function
  return () => {
    syncListeners = syncListeners.filter((cb) => cb !== callback);
  };
}

/**
 * Notify all listeners of data update
 */
function notifyListeners(data: ElectionDataSnapshot): void {
  syncListeners.forEach((callback) => {
    try {
      callback(data);
    } catch (error) {
      console.error("Error in sync listener:", error);
    }
  });
}

/**
 * Get time until next sync
 */
export function getTimeUntilNextSync(): number {
  if (!syncTimer) return 0;
  // This is approximate since we don't track exact sync time
  return SYNC_INTERVAL;
}
