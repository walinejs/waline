const baseURL = process.env.VERCEL_PREVIEW_URL;

const path = `/vercel-preview-e2e-${process.env.GITHUB_SHA}`;
const headers = {};

if (process.env.VERCEL_AUTOMATION_BYPASS_SECRET) {
  headers['x-vercel-protection-bypass'] = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
}

const listBefore = await fetch(`${baseURL}/api/comment?path=${encodeURIComponent(path)}`, {
  headers,
});

// const post = await fetch(`${baseURL}/api/comment`, {
//   method: 'POST',
//   headers: {
//     'content-type': 'application/json',
//   },
//   body: JSON.stringify({
//     nick: 'Vercel Preview Tester',
//     mail: 'vercel-preview@example.com',
//     link: 'https://example.com',
//     comment: 'Hello from Vercel Preview',
//     url: path,
//     ua: 'github-actions',
//   }),
// });
// const listAfter = await fetch(`${baseURL}/api/comment?path=${encodeURIComponent(path)}`);
