import axios from "axios";
import { useEffect, useState } from "react";

const REPO = {
  owner: "sreetamdas",
  repo: "sreetamdas.com"
};

/** Add your relevant code here for the issue to reproduce */
export default function Home() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    async function getData() {
      const response = await getGitHubStats(REPO);
      console.log(response);
      setStats(response);
    }

    getData();
  }, []);

  return stats === null ? (
    <div>No data</div>
  ) : (
    <div>
      <p>Stars: {stats.stars}</p>
      <p>Forks: {stats.forks}</p>
    </div>
  );
}

export type StatsResult = {
  stars: number;
  forks: number;
};

type StatsQuery = {
  owner: string;
  repo: string;
};

/**
 * Fetch GitHub stats from /api/github/stats
 */
export async function getGitHubStats(body: StatsQuery) {
  const response = (
    await axios.post<StatsResult>("/api/github", body, {
      headers: {
        "Content-Type": "application/json"
      }
    })
  ).data;

  return response;
}
