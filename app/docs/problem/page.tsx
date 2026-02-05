"use client";
/* eslint-disable react/no-unescaped-entities */
import {
  PageHeader,
  Section,
  SectionTitle,
  SubSection,
  Paragraph,
  Lead,
  Callout,
  Quote,
  StatGrid,
  Stat,
  FeatureGrid,
  FeatureCard,
} from "../components";
import { AlertTriangle, DollarSign, Lock, Server, Trash2, Scale, Clock, Building } from "lucide-react";

export default function ProblemStatement() {
  return (
    <>
      <PageHeader
        badge="THE PROBLEM"
        title="Why Traditional Storage Fails"
        description="Cloud storage promised convenience, but delivered dependency. Here's why the current model is fundamentally broken—and why blockchain offers a better path."
        readTime="~3 min read"
      />

      <Section>
        <Quote author="Werner Vogels, CTO of Amazon">
          Everything fails, all the time.
        </Quote>

        <Lead>
          We've collectively uploaded trillions of files to the cloud, trusting
          companies to safeguard our digital lives. But this trust is
          misplaced—not because these companies are malicious, but because the
          incentives are fundamentally misaligned.
        </Lead>

        <Paragraph>
          When you upload a file to a traditional cloud service, you're not
          storing data—you're renting space. And like any rental agreement, the
          landlord holds all the power. They can raise prices, change terms,
          access your files, or simply decide you're no longer welcome. This
          isn't a bug in the system; it's the system working exactly as
          designed.
        </Paragraph>
      </Section>

      <SectionTitle>The Four Pillars of Failure</SectionTitle>

      <FeatureGrid>
        <FeatureCard
          icon={Trash2}
          title="Impermanence"
          description="Services shut down constantly. Google alone has killed 293 products. When they go, your data goes with them—often with just 30 days notice."
        />
        <FeatureCard
          icon={DollarSign}
          title="Compounding Costs"
          description="$10/month seems cheap until you realize it's $1,200 over 10 years, $6,000 over 50 years. Storage costs should decrease with time, not multiply."
        />
        <FeatureCard
          icon={Lock}
          title="False Privacy"
          description="'End-to-end encrypted' often means 'encrypted except when we need access.' Most services hold the keys to your data, whether they admit it or not."
        />
        <FeatureCard
          icon={Scale}
          title="Terms of Service"
          description="A 20,000-word legal document that changes whenever convenient. One day your content is fine; the next, it violates new 'community guidelines.'"
        />
      </FeatureGrid>

      <SectionTitle>The Shutdown Graveyard</SectionTitle>

      <Section>
        <Paragraph>
          History is littered with the corpses of storage services that
          promised permanence:
        </Paragraph>

        <div className="my-6 space-y-4">
          <div className="border border-white/10 p-4 bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-2">
              <Building className="h-4 w-4 text-red-400" />
              <span className="text-white font-medium">Google Photos (Free Unlimited)</span>
              <span className="text-white/30 text-sm">2015-2021</span>
            </div>
            <p className="text-white/50 text-sm">
              Millions of users uploaded high-quality photos trusting the "unlimited" promise.
              Google changed their mind, and suddenly those photos counted against quotas.
            </p>
          </div>

          <div className="border border-white/10 p-4 bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-2">
              <Building className="h-4 w-4 text-red-400" />
              <span className="text-white font-medium">Amazon Drive (Unlimited)</span>
              <span className="text-white/30 text-sm">2015-2017</span>
            </div>
            <p className="text-white/50 text-sm">
              Offered unlimited storage for $60/year. Two years later, the plan was discontinued.
              Users had to scramble to download terabytes of data before being charged per-GB rates.
            </p>
          </div>

          <div className="border border-white/10 p-4 bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-2">
              <Building className="h-4 w-4 text-red-400" />
              <span className="text-white font-medium">Megaupload</span>
              <span className="text-white/30 text-sm">2005-2012</span>
            </div>
            <p className="text-white/50 text-sm">
              50 million daily users. Shut down overnight by the US government.
              Millions of legitimate users lost access to their files permanently.
            </p>
          </div>

          <div className="border border-white/10 p-4 bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-2">
              <Building className="h-4 w-4 text-red-400" />
              <span className="text-white font-medium">MySpace</span>
              <span className="text-white/30 text-sm">2003-2019</span>
            </div>
            <p className="text-white/50 text-sm">
              In a server migration, MySpace "accidentally" deleted 12 years of user uploads—
              50 million songs from 14 million artists. Gone forever.
            </p>
          </div>
        </div>

        <Callout type="warning" title="The Pattern">
          These aren't isolated incidents. They're the inevitable result of a
          business model where your data is someone else's liability. When
          storage becomes unprofitable, your files become expendable.
        </Callout>
      </Section>

      <SectionTitle>The True Cost of "Free"</SectionTitle>

      <Section>
        <Paragraph>
          Free storage isn't free—you pay with your data, your attention, and
          your autonomy. But even paid storage has hidden costs that compound
          over time.
        </Paragraph>

        <StatGrid>
          <Stat value="$2,400" label="10 years at $20/mo" />
          <Stat value="$12,000" label="50 years at $20/mo" />
          <Stat value="$0" label="Helix after year 1" />
          <Stat value="∞" label="Helix storage duration" />
        </StatGrid>

        <Paragraph>
          Consider a photographer who accumulates 2TB of images over their
          career. At typical cloud rates, they'll pay thousands of dollars over
          their lifetime—and still won't own their storage. Their heirs will
          need to keep paying or lose everything.
        </Paragraph>

        <Paragraph>
          With Helix, that same photographer pays once. Their work remains
          accessible not just for their lifetime, but for their children's
          lifetime, and beyond. True digital inheritance becomes possible.
        </Paragraph>
      </Section>

      <SectionTitle>The Privacy Illusion</SectionTitle>

      <Section>
        <Paragraph>
          Major cloud providers have access to your files. This isn't
          speculation—it's in their terms of service. They scan your content
          for various purposes, from "improving services" to complying with
          government requests.
        </Paragraph>

        <div className="my-6 border border-white/10 p-6 bg-white/[0.02]">
          <p className="text-white/40 text-xs font-mono tracking-wider mb-4">
            WHAT THEY CAN DO WITH YOUR DATA
          </p>
          <ul className="space-y-3 text-white/60 text-sm">
            <li className="flex items-start gap-3">
              <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <span>Scan content for policy violations (often automated, error-prone)</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <span>Share data with law enforcement (often without your knowledge)</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <span>Use content to train AI models (increasingly common)</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <span>Terminate access based on subjective content policies</span>
            </li>
          </ul>
        </div>

        <Callout type="tip" title="The Helix Difference">
          With client-side encryption, your files are encrypted before they
          ever leave your device. We never see your data. We can't scan it, we
          can't share it, we can't use it for training. Mathematically
          impossible, not just policy-prohibited.
        </Callout>
      </Section>

      <SectionTitle>Centralization Risk</SectionTitle>

      <Section>
        <Paragraph>
          When you store data with a centralized provider, you're exposed to
          single points of failure:
        </Paragraph>

        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 border border-white/10">
            <Server className="h-5 w-5 text-[#d4622a] flex-shrink-0" />
            <div>
              <p className="text-white font-medium text-sm">Infrastructure Failure</p>
              <p className="text-white/40 text-xs mt-1">
                A single data center outage can make your files inaccessible for hours or days.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 border border-white/10">
            <Scale className="h-5 w-5 text-[#d4622a] flex-shrink-0" />
            <div>
              <p className="text-white font-medium text-sm">Legal Jurisdiction</p>
              <p className="text-white/40 text-xs mt-1">
                Your data is subject to the laws of wherever servers are located—often multiple countries.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 border border-white/10">
            <Building className="h-5 w-5 text-[#d4622a] flex-shrink-0" />
            <div>
              <p className="text-white font-medium text-sm">Corporate Decisions</p>
              <p className="text-white/40 text-xs mt-1">
                Acquisitions, pivots, and shutdowns happen without your input or consent.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 border border-white/10">
            <Clock className="h-5 w-5 text-[#d4622a] flex-shrink-0" />
            <div>
              <p className="text-white font-medium text-sm">Time Horizon</p>
              <p className="text-white/40 text-xs mt-1">
                No company plans in centuries. Your data's lifespan is limited by business cycles.
              </p>
            </div>
          </div>
        </div>

        <Paragraph>
          Decentralized storage inverts these risks. With thousands of
          independent nodes across the globe, there's no single point of
          failure, no single jurisdiction, and no corporate board that can
          decide your data's fate.
        </Paragraph>
      </Section>

      <SectionTitle>A Better Model Exists</SectionTitle>

      <Section>
        <Paragraph>
          The problems with traditional storage aren't unsolvable—they're
          unsolvable within the traditional model. Blockchain technology
          enables a fundamentally different approach:
        </Paragraph>

        <div className="my-6 border-l-2 border-[#d4622a]/50 pl-4 space-y-4">
          <div>
            <p className="text-white font-medium">Endowment-Based Pricing</p>
            <p className="text-white/50 text-sm mt-1">
              Pay once, and the payment generates returns that fund storage
              indefinitely. Like a university endowment, but for your data.
            </p>
          </div>
          <div>
            <p className="text-white font-medium">Cryptographic Ownership</p>
            <p className="text-white/50 text-sm mt-1">
              Your private keys prove ownership. No company can revoke access
              because no company grants it in the first place.
            </p>
          </div>
          <div>
            <p className="text-white font-medium">Protocol-Level Permanence</p>
            <p className="text-white/50 text-sm mt-1">
              Data persistence is enforced by code, not contracts. The network
              incentivizes storage without requiring trust.
            </p>
          </div>
        </div>

        <Quote>
          Helix doesn't ask you to trust us. We've built a system where trust
          isn't required—only mathematics and economics.
        </Quote>
      </Section>
    </>
  );
}
