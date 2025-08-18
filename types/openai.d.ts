declare module 'openai' {
  // 型定義が見つからない環境向けの暫定宣言。
  // 実際の型は本家パッケージに含まれるため、依存関係が正しく入ればこちらは不要です。
  const OpenAI: any;
  export default OpenAI;
}


