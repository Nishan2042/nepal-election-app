/**
 * Hook to manage election data synchronization
 * Automatically starts sync on mount and stops on unmount
 */

import { useEffect, useState } from "react";
import {
  startAutoSync,
  stopAutoSync,
  loadElectionData,
  onElectionDataUpdate,
  getLastSyncTime,
  ElectionDataSnapshot,
} from "@/lib/electionDataSync";

export function useElectionDataSync() {
  const [data, setData] = useState<ElectionDataSnapshot | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    // Load cached data on mount
    const loadData = async () => {
      const cached = await loadElectionData();
      if (cached) {
        setData(cached);
      }
      const lastSync = await getLastSyncTime();
      if (lastSync) {
        setLastSyncTime(lastSync);
      }
    };

    loadData();

    // Start auto sync
    startAutoSync();

    // Subscribe to updates
    const unsubscribe = onElectionDataUpdate((newData) => {
      setData(newData);
      setLastSyncTime(new Date());
    });

    // Cleanup on unmount
    return () => {
      unsubscribe();
      stopAutoSync();
    };
  }, []);

  return {
    data,
    lastSyncTime,
    isSyncing,
  };
}
