"use client";
import { useCallback, useMemo, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Fira_Code } from "next/font/google";

const firaCode = Fira_Code({ subsets: ["latin"] });

export default function Home() {
  const [repoURL, setRepoURL] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [deployPreviewURL, setDeployPreviewURL] = useState<string | undefined>();

  const isValidURL = useMemo(() => {
    if (!repoURL || repoURL.trim() === "") return [false, null];
    const regex = new RegExp(
      /^(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/]+)\/([^\/]+)(?:\/)?$/
    );
    return [regex.test(repoURL), "Enter a valid GitHub Repository URL"];
  }, [repoURL]);

  const handleClickDeploy = useCallback(async () => {
    setLoading(true);

    try {
      console.log("Attempting to deploy with URL:", repoURL); // Added logging

      const { data } = await axios.post(`http://localhost:9000/project`, {
        gitURL: repoURL
      });

      if (data && data.data) {
        const { url } = data.data;
        setDeployPreviewURL(url);
      }
    } catch (error) {
      console.error("Deployment failed", error); // Enhanced logging
    } finally {
      setLoading(false);
    }
  }, [repoURL]);

  return (
    <main className="flex justify-center items-center h-[100vh]">
      <div className="w-[600px]">
        <span className="flex justify-start items-center gap-2">
          <Input
            disabled={loading}
            value={repoURL}
            onChange={(e) => setRepoURL(e.target.value)}
            type="url"
            placeholder="GitHub URL"
          />
        </span>
        <Input
          disabled={loading}
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          type="text"
          placeholder="Slug Name"
          className="mt-2"
        />
        <Button
          onClick={handleClickDeploy}
          disabled={!isValidURL[0] || loading}
          className="w-full mt-3"
        >
          {loading ? "In Progress" : "Deploy"}
        </Button>
        {deployPreviewURL && (
          <div className="mt-2 bg-slate-900 py-4 px-2 rounded-lg">
            <p>
              Preview URL{" "}
              <a
                target="_blank"
                className="text-sky-400 bg-sky-950 px-3 py-2 rounded-lg"
                href={deployPreviewURL}
              >
                {deployPreviewURL}
              </a>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
