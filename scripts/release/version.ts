import { prerelease } from "semver";

export interface Answers {
  bump: string;
  customVersion: string;
  npmTag: string;
}

export const versions: Record<string, string> = {};

export const getVersion = (answers: Answers): string =>
  answers.customVersion || versions[answers.bump];

export const isPreRelease = (version: string): boolean =>
  Boolean(prerelease(version));

export const getNpmTags = (version: string): string[] => {
  if (isPreRelease(version)) return ["next", "alpha", "beta", "latest"];

  return ["latest", "beta", "alpha", "next"];
};
