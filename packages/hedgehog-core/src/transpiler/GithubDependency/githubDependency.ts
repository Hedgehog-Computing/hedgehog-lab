import { fetchURL } from '../FetchURL/fetchURL';

// This is the base URL for the GitHub user content API.
// It is used to fetch the content of the library from GitHub.
// For example, user wants to import a library from
// https://raw.githubusercontent.com/Hedgehog-Computing/math/main/QR.hhs
// Then, the user only needs to import as:
// github: Hedgehog-Computing/math/main/QR
// And hedgehog lab will compose the full URL as:
// GithubRawUserContentBaseUrl + 'Hedgehog-Computing/math/main/QR' + '.hhs'
const GithubRawUserContentBaseUrl = 'https://raw.githubusercontent.com/';

// Generate the full URL for the library and fetch from GitHub.
async function githubDependency(githubPackagePath: string): Promise<string> {
  const fullPath = GithubRawUserContentBaseUrl + githubPackagePath.trim() + '.hhs';
  const real_library = await fetchURL(fullPath);
  return real_library;
}

export { githubDependency };
