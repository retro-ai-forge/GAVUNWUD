![GAVUN WUD](public/wud_preview.jpg)

The homepage of GAVUN WUD ($WUD), a memecoin on Polkadot.

$WUD launched on April 22nd, 2024 — Gavin Wood's birthday — as a tribute to the founder of Polkadot, Ethereum, and Web3, and quickly evolved into a full-blown community-powered movement. The site covers:

- **Flappy WUD** — a Flappy Bird-style game with on-chain wallet integration (SubWallet, Nova Wallet).
- **Gavun AI** — an autonomous agent trained on Polkadot data and Web3 lore, using OriginTrail's DKG.
- **WUD Universe** — a community-driven, gamified digital identity built on Unique Network, where every holder gets a personal cabin NFT that evolves with their holdings and activity.
- **Tokenomics & LP burns** — live liquidity/price data plus a public record of the LP burn campaign.
- NFT collections, ecosystem partners, and community links (Telegram, Discord, Twitter).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to load Inter and Karantina.

## Learn More

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploying to Google Cloud Run

Deploys are driven by [`rav`](https://pypi.org/project/rav/) (see `rav.yaml`), a Python CLI, so it needs a virtualenv:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

With the venv active, `rav` is on your `PATH` for the commands below.

```bash
# gcloud auth login
# after changing login email:
gcloud auth list
gcloud config list
gcloud config set account <email>
gcloud auth application-default login
gcloud auth application-default set-quota-project thewudlands
gcloud config set project thewudlands
gcloud auth print-access-token | docker login -u oauth2accesstoken --password-stdin https://europe-west1-docker.pkg.dev

# full build and deploy
# to prevent error: close local uvicorn and npm run dev
rav run gcp_full
```