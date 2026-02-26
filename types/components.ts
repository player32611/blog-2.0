export interface ConfigProviderParams {
  children: React.ReactNode;
}

export interface ButtonParams {
  text: string;
  icon: React.ReactNode;
  size: 'small' | 'medium' | 'large';
  onClick: () => void;
}

export interface LoadingParams {
  ref: HTMLDivElement | null;
}
