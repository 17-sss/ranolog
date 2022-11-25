type UtterancTextAttributes = {
  [key in 'src' | 'repo' | 'issue-term' | 'label' | 'crossorigin' | 'async']: string;
};
type UtterancTheme =
  | 'github-light'
  | 'github-dark'
  | 'preferred-color-scheme'
  | 'github-dark-orange'
  | 'icy-dark'
  | 'dark-blue'
  | 'photon-dark'
  | 'boxy-light'
  | 'gruvbox-dark';
export interface UtterancAttributes extends UtterancTextAttributes {
  theme: UtterancTheme;
}

export const utterancAttrs: UtterancAttributes = {
  src: 'https://utteranc.es/client.js',
  repo: '17-sss/ranolog',
  'issue-term': 'pathname',
  label: 'comment',
  theme: 'github-light',
  crossorigin: 'anonymous',
  async: 'true',
};
