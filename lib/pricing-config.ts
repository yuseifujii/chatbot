/**
 * 料金設定の一元管理ファイル
 * このファイルの値を変更すると、PricingSection、Terms、Legalページの料金が自動的に更新されます
 */

export const pricingConfig = {
  // 導入初期費用
  initialFee: {
    amount: 22000,
    unit: "円",
    campaignAmount: 0,
    isCampaign: true,
    label: "導入初期費用",
    description: "カスタムChatBOT開発費用"
  },
  
  // サービス維持費
  maintenanceFee: {
    amount: 11000,
    unit: "円/年",
    label: "サービス維持費",
    description: "年額利用料"
  },
  
  // 導入サポート/追加変更
  supportFee: {
    amount: "無料",
    label: "導入サポート/追加変更",
    description: "オプションサービス"
  }
} as const;

/**
 * 初年度の合計金額を計算
 */
export function calculateFirstYearTotal() {
  const initialCost = pricingConfig.initialFee.isCampaign 
    ? pricingConfig.initialFee.campaignAmount 
    : pricingConfig.initialFee.amount;
  const maintenanceCost = pricingConfig.maintenanceFee.amount;
  
  return {
    total: initialCost + maintenanceCost,
    originalTotal: pricingConfig.initialFee.amount + maintenanceCost,
    savings: pricingConfig.initialFee.amount - initialCost
  };
}

/**
 * 2年目以降の年額費用
 */
export function getAnnualFee() {
  return pricingConfig.maintenanceFee.amount;
}

/**
 * 表示用のフォーマット済み価格を取得
 */
export function getFormattedPrices() {
  return {
    initialFee: {
      original: `¥${pricingConfig.initialFee.amount.toLocaleString()}`,
      campaign: pricingConfig.initialFee.isCampaign 
        ? `¥${pricingConfig.initialFee.campaignAmount.toLocaleString()}`
        : null,
      taxIncluded: `${pricingConfig.initialFee.amount.toLocaleString()}円（税込）`
    },
    maintenanceFee: {
      amount: `¥${pricingConfig.maintenanceFee.amount.toLocaleString()}`,
      taxIncluded: `${pricingConfig.maintenanceFee.amount.toLocaleString()}円（税込・年額）`
    },
    supportFee: {
      amount: pricingConfig.supportFee.amount
    }
  };
}

