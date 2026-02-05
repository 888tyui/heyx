"use client";
/* eslint-disable react/no-unescaped-entities */
import {
  PageHeader,
  Section,
  SectionTitle,
  SubSection,
  Paragraph,
  Lead,
  CodeBlock,
  Callout,
  Table,
  StatGrid,
  Stat,
  Quote,
  ComparisonTable,
  Timeline,
} from "../components";
import { Coins, TrendingDown, Calculator, Wallet, DollarSign, Clock, Zap } from "lucide-react";

export default function CostStructure() {
  return (
    <>
      <PageHeader
        badge="COST STRUCTURE"
        title="Pricing & Costs"
        description="Transparent, one-time pricing that makes sense. Pay once, store forever—here's exactly how it works."
        readTime="~2 min read"
      />

      <Section>
        <Quote>
          The best storage cost is no recurring cost.
        </Quote>

        <Lead>
          Helix charges a single, one-time fee based on file size. No monthly
          subscriptions, no storage tiers, no surprise charges. Your payment
          covers permanent storage through Arweave&apos;s endowment model.
        </Lead>
      </Section>

      <SectionTitle>Current Pricing</SectionTitle>

      <Section>
        <StatGrid>
          <Stat value="~$0.005" label="Per MB (one-time)" />
          <Stat value="~$5" label="Per GB (one-time)" />
          <Stat value="$0" label="Monthly fees" />
          <Stat value="∞" label="Storage duration" />
        </StatGrid>

        <Callout type="info" title="Dynamic Pricing">
          Actual costs are calculated in real-time based on current Arweave
          network conditions and SOL price. The prices above are typical
          examples—exact costs are shown before each upload.
        </Callout>
      </Section>

      <SectionTitle>Cost Breakdown</SectionTitle>

      <Section>
        <Paragraph>
          Your payment covers several components:
        </Paragraph>

        <div className="my-6 border border-white/10 rounded-lg overflow-hidden">
          <div className="p-4 bg-white/5 border-b border-white/10">
            <p className="text-white/40 text-xs font-mono tracking-wider">PAYMENT DISTRIBUTION</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-24 h-8 bg-[#d4622a] rounded flex items-center justify-center text-white text-sm font-medium">95%</div>
              <div>
                <p className="text-white font-medium">Arweave Endowment</p>
                <p className="text-white/50 text-sm">Permanent storage incentives, miner rewards, long-term fund</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-24 h-8 bg-purple-500 rounded flex items-center justify-center text-white text-sm font-medium">5%</div>
              <div>
                <p className="text-white font-medium">Irys Network Fee</p>
                <p className="text-white/50 text-sm">Bundling and instant availability</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-24 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-sm font-medium">&lt;0.01%</div>
              <div>
                <p className="text-white font-medium">Solana Gas</p>
                <p className="text-white/50 text-sm">Transaction fees (minimal)</p>
              </div>
            </div>
          </div>
        </div>

        <Table
          headers={["Component", "Purpose", "Approx. %"]}
          rows={[
            ["Arweave Endowment", "Funds permanent storage through returns", "~95%"],
            ["Irys Fee", "Bundling, instant availability, convenience", "~5%"],
            ["Solana Gas", "Transaction fees (minimal)", "<0.01%"],
          ]}
        />
      </Section>

      <SectionTitle>The Endowment Model</SectionTitle>

      <Section>
        <Paragraph>
          Arweave&apos;s pricing isn&apos;t based on monthly costs—it&apos;s based on a
          one-time endowment that generates returns to fund storage forever:
        </Paragraph>

        <div className="my-6 space-y-4">
          <div className="border border-[#d4622a]/30 rounded-lg p-6 bg-[#d4622a]/5">
            <p className="text-[#d4622a] text-xs font-mono tracking-wider mb-4">ENDOWMENT POOL</p>
            <div className="flex items-center justify-between gap-8">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-[#d4622a]/20 flex items-center justify-center mx-auto mb-2">
                  <DollarSign className="h-8 w-8 text-[#d4622a]" />
                </div>
                <p className="text-white font-medium text-sm">Principal</p>
                <p className="text-white/50 text-xs">Your Payment</p>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-[#d4622a] to-green-500 relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-white/50 text-xs">Conservative Investment</span>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-2">
                  <TrendingDown className="h-8 w-8 text-green-500" />
                </div>
                <p className="text-white font-medium text-sm">Returns</p>
                <p className="text-white/50 text-xs">~0.5% annually</p>
              </div>
            </div>
          </div>

          <Timeline
            items={[
              { time: "YEAR 1", title: "$0.10/GB/year", description: "Initial storage cost" },
              { time: "YEAR 10", title: "$0.02/GB/year", description: "-30%/year decline" },
              { time: "YEAR 50", title: "~$0.0001/GB/year", description: "Returns exceed costs" },
              { time: "YEAR 100+", title: "Essentially free", description: "Perpetual storage guaranteed" },
            ]}
          />
        </div>

        <Paragraph>
          The key insight: storage costs decline exponentially (Moore&apos;s law),
          but endowment returns remain relatively constant. Eventually, the
          returns far exceed the costs, making permanent storage sustainable.
        </Paragraph>

        <Callout type="tip" title="200+ Years">
          Economic modeling shows the endowment can sustain storage for over
          200 years under conservative assumptions. In practice, it&apos;s likely
          much longer as storage costs continue declining.
        </Callout>
      </Section>

      <SectionTitle>Cost Estimation</SectionTitle>

      <Section>
        <Paragraph>
          Before uploading, you&apos;ll see the exact cost. Here&apos;s how it&apos;s
          calculated:
        </Paragraph>

        <CodeBlock title="cost-calculation.ts">
{`// Get upload cost from Irys
async function getUploadCost(irys: WebIrys, fileSize: number) {
  // Irys returns cost in atomic units
  const priceAtomic = await irys.getPrice(fileSize);

  // Convert to SOL
  const priceSOL = irys.utils.fromAtomic(priceAtomic);

  return {
    bytes: fileSize,
    priceSOL: priceSOL.toNumber(),
    priceUSD: priceSOL.toNumber() * getCurrentSOLPrice(),
  };
}

// Example output:
// {
//   bytes: 1048576,        // 1 MB
//   priceSOL: 0.0000218,   // ~$0.005 at $230/SOL
//   priceUSD: 0.005
// }`}
        </CodeBlock>

        <SubSection>Sample Costs</SubSection>
        <Table
          headers={["File Size", "Approx. Cost (SOL)", "Approx. Cost (USD)"]}
          rows={[
            ["1 KB", "0.0000002", "$0.00005"],
            ["100 KB", "0.00002", "$0.005"],
            ["1 MB", "0.0002", "$0.05"],
            ["10 MB", "0.002", "$0.50"],
            ["100 MB", "0.02", "$5"],
            ["1 GB", "0.2", "$50"],
          ]}
        />

        <Paragraph>
          Note: Costs vary based on network conditions and SOL price. The
          table above uses approximate values for illustration.
        </Paragraph>
      </Section>

      <SectionTitle>Comparison with Traditional Storage</SectionTitle>

      <Section>
        <Paragraph>
          Here is a comparison of Helix to traditional cloud storage over time:
        </Paragraph>

        <ComparisonTable
          title="10-YEAR TOTAL COST FOR 100GB"
          left={{
            label: "TRADITIONAL CLOUD",
            items: [
              "Year 1: $24 ($2/month)",
              "Year 5: $120",
              "Year 10: $240",
              "Year 50: $1,200",
              "Year 100: $2,400",
              "Forever: ∞ (must keep paying)",
            ],
          }}
          right={{
            label: "HELIX (ONE-TIME)",
            items: [
              "Upload: $500 (one-time)",
              "Year 1: $0 additional",
              "Year 10: $0 additional",
              "Year 50: $0 additional",
              "Year 100: $0 additional",
              "Forever: $0 additional",
            ],
          }}
        />

        <div className="my-4 p-4 border border-green-500/30 bg-green-500/5 rounded-lg">
          <p className="text-green-400 font-medium">Break-even: ~2 years for 100GB</p>
          <p className="text-white/50 text-sm mt-1">After that: Pure savings</p>
        </div>

        <Callout type="info" title="Long-Term Value">
          The longer you need storage, the more valuable Helix becomes. For
          data meant to last decades or longer—family archives, research,
          creative works—the savings are substantial.
        </Callout>
      </Section>

      <SectionTitle>Funding Your Wallet</SectionTitle>

      <Section>
        <Paragraph>
          To use Helix, you need SOL in your Solana wallet. Here&apos;s how to
          acquire some:
        </Paragraph>

        <div className="my-6 space-y-4">
          <div className="flex items-start gap-4 p-4 border border-white/10">
            <div className="w-8 h-8 rounded-full bg-[#d4622a]/20 flex items-center justify-center text-[#d4622a] font-mono text-sm flex-shrink-0">
              1
            </div>
            <div>
              <p className="text-white font-medium text-sm">Create a Wallet</p>
              <p className="text-white/50 text-sm mt-1">
                Install Phantom (phantom.app) or Solflare (solflare.com) and
                create a new wallet. Save your seed phrase securely.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border border-white/10">
            <div className="w-8 h-8 rounded-full bg-[#d4622a]/20 flex items-center justify-center text-[#d4622a] font-mono text-sm flex-shrink-0">
              2
            </div>
            <div>
              <p className="text-white font-medium text-sm">Acquire SOL</p>
              <p className="text-white/50 text-sm mt-1">
                Purchase SOL on an exchange (Coinbase, Kraken, etc.) and
                withdraw to your wallet address. For most users, $10-20 of SOL
                will cover many uploads.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border border-white/10">
            <div className="w-8 h-8 rounded-full bg-[#d4622a]/20 flex items-center justify-center text-[#d4622a] font-mono text-sm flex-shrink-0">
              3
            </div>
            <div>
              <p className="text-white font-medium text-sm">Connect & Upload</p>
              <p className="text-white/50 text-sm mt-1">
                Connect your wallet to Helix and start uploading. The cost for
                each file is shown before you approve the transaction.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <SectionTitle>Fee Transparency</SectionTitle>

      <Section>
        <Paragraph>
          We believe in full transparency. Here&apos;s everything you pay:
        </Paragraph>

        <Table
          headers={["Fee Type", "Who Receives", "Purpose"]}
          rows={[
            ["Storage Fee", "Arweave Network", "Permanent storage endowment"],
            ["Bundling Fee", "Irys Network", "Data bundling and instant access"],
            ["Network Fee", "Solana Validators", "Transaction processing"],
          ]}
        />

        <Paragraph>
          Helix takes no additional fees. We&apos;re building for the ecosystem,
          not for extraction.
        </Paragraph>

        <Callout type="tip" title="Open Source Economics">
          Our code is open source. You can verify exactly where payments go.
          There&apos;s no hidden markup—what you pay is what the networks charge.
        </Callout>
      </Section>

      <SectionTitle>Frequently Asked Questions</SectionTitle>

      <Section>
        <div className="my-6 space-y-6">
          <div>
            <p className="text-white font-medium mb-2">What if SOL price changes?</p>
            <p className="text-white/50 text-sm">
              Prices are calculated in real-time. If SOL&apos;s USD value increases,
              you&apos;ll pay less SOL for the same storage. The endowment is
              denominated in AR (Arweave&apos;s token), which has its own economics.
            </p>
          </div>

          <div>
            <p className="text-white font-medium mb-2">Can prices go up?</p>
            <p className="text-white/50 text-sm">
              Network prices can fluctuate based on demand, but the long-term
              trend is downward as technology improves. Once you&apos;ve paid,
              your storage is locked in regardless of future prices.
            </p>
          </div>

          <div>
            <p className="text-white font-medium mb-2">What if Arweave shuts down?</p>
            <p className="text-white/50 text-sm">
              Arweave is a decentralized network with no single point of
              failure. As long as miners find it profitable to store data
              (which the endowment ensures), the network persists.
            </p>
          </div>

          <div>
            <p className="text-white font-medium mb-2">Are there any hidden costs?</p>
            <p className="text-white/50 text-sm">
              No. The price shown before upload is the total cost. There are no
              bandwidth fees, retrieval fees, or any other charges. Download
              your files unlimited times for free.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
