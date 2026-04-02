import type { NextConfig } from "next";
import { execSync } from "child_process";

let lastCommitDate = "";
try {
  lastCommitDate = execSync('git log -1 --format=%cd --date=format:"%b %-d, %Y"')
    .toString()
    .trim();
} catch {
  lastCommitDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_LAST_COMMIT_DATE: lastCommitDate,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
