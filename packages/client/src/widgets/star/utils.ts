import { getArticleCounter } from '@waline/api';

interface FetchReactionOption {
  serverURL: string;
  path: string;
  lang: string;
}

export const fetchReaction = async ({
  serverURL,
  lang,
  path,
}: FetchReactionOption): Promise<{ value: number[]; abort: () => void }> => {
  const reaction = [1, 2, 3, 4, 5];
  const controller = new AbortController();

  const abort = controller.abort.bind(controller);

  const [reactionData] = (await getArticleCounter({
    serverURL,
    lang,
    paths: [path],
    type: Array.from({ length: 5 }, (_, index) => `reaction${index}`),
    signal: controller.signal,
  })) as Record<string, number>[];

  return {
    value: reaction.map((_, index) => reactionData[`reaction${index}`]),
    abort,
  };
};

export const clampScore = (score: number): number => {
  if (Number.isNaN(score)) return 0;
  const normalized = Math.round(score);
  return Math.min(5, Math.max(0, normalized));
};

export const normalizeDistribution = (distribution: number[] = []): number[] =>
  Array.from({ length: 5 }, (_, index) => {
    const value = distribution[index] ?? 0;
    return typeof value === 'number' && value > 0 ? value : 0;
  });
