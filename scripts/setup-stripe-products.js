// Stripe商品・価格設定スクリプト
// 実行方法: node scripts/setup-stripe-products.js

const Stripe = require('stripe');
require('dotenv').config({ path: '.env.local' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
});

async function setupProducts() {
  try {
    console.log('Stripe商品・価格を設定中...');

    // 1. 初回導入費用の商品作成
    const setupProduct = await stripe.products.create({
      name: 'チャットボット導入サービス',
      description: '初回のみのセットアップ費用',
      metadata: {
        type: 'one_time',
        service: 'chatbot_setup',
      },
    });

    // 初回導入費用の価格作成
    const setupPrice = await stripe.prices.create({
      unit_amount: 2900000, // ¥29,000 (cents)
      currency: 'jpy',
      product: setupProduct.id,
      metadata: {
        type: 'one_time',
      },
    });

    // 2. 年間サブスクリプションの商品作成
    const subscriptionProduct = await stripe.products.create({
      name: 'チャットボット年間利用料',
      description: '年間サブスクリプション',
      metadata: {
        type: 'subscription',
        service: 'chatbot_annual',
      },
    });

    // 年間サブスクリプションの価格作成
    const subscriptionPrice = await stripe.prices.create({
      unit_amount: 1900000, // ¥19,000 (cents)
      currency: 'jpy',
      product: subscriptionProduct.id,
      recurring: {
        interval: 'year',
      },
      metadata: {
        type: 'subscription',
      },
    });

    console.log('✅ 商品・価格の作成が完了しました！');
    console.log('\n--- 作成された商品・価格 ---');
    console.log(`初回導入費用:`);
    console.log(`  商品ID: ${setupProduct.id}`);
    console.log(`  価格ID: ${setupPrice.id}`);
    console.log(`\n年間サブスクリプション:`);
    console.log(`  商品ID: ${subscriptionProduct.id}`);
    console.log(`  価格ID: ${subscriptionPrice.id}`);
    
    console.log('\n--- .env.localに追加してください ---');
    console.log(`STRIPE_SETUP_PRICE_ID=${setupPrice.id}`);
    console.log(`STRIPE_SUBSCRIPTION_PRICE_ID=${subscriptionPrice.id}`);

  } catch (error) {
    console.error('❌ エラーが発生しました:', error.message);
  }
}

setupProducts();
