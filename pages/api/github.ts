import { Octokit } from "@octokit/core";
import { NextApiRequest, NextApiResponse } from "next";

const octokit = new Octokit();

/**
 * Get the stars and forks of a repository
 */

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ stars: number; forks: number }>
) {
  try {
    const { owner, repo } = req.body;

    const {
      data: { stargazers_count: stars = 0, forks = 0 }
    } = await octokit.request("GET /repos/{owner}/{repo}", {
      owner,
      repo
    });
    console.log("success", stars, forks);

    res.status(200).send({ stars, forks });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Request using @octokit/core failed");

    res.status(200).send({ stars: 69, forks: 69 });
  }
}

export default handler;
