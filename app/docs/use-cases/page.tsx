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
  FeatureGrid,
  FeatureCard,
} from "../components";
import {
  Image as ImageIcon,
  FileText,
  Music,
  Video,
  Database,
  Code,
  Briefcase,
  GraduationCap,
  Heart,
  Building,
  Scale,
  Globe,
  Cpu,
  Brain,
} from "lucide-react";

export default function UseCases() {
  return (
    <>
      <PageHeader
        badge="USE CASES"
        title="Who Uses Helix"
        description="From preserving family memories to archiving AI models, discover how people are using permanent decentralized storage."
        readTime="~3 min read"
      />

      <Section>
        <Lead>
          Helix isn't just for crypto enthusiasts. Anyone who values their
          data—and wants it to last—can benefit from permanent storage. Here
          are the people and organizations already using decentralized storage.
        </Lead>
      </Section>

      <SectionTitle>Personal Use</SectionTitle>

      <Section>
        <FeatureGrid>
          <FeatureCard
            icon={ImageIcon}
            title="Family Archives"
            description="Wedding photos, baby pictures, family videos. Memories that deserve to outlive cloud services and hard drives."
          />
          <FeatureCard
            icon={FileText}
            title="Important Documents"
            description="Birth certificates, property deeds, contracts. Documents you need accessible for decades, not just years."
          />
          <FeatureCard
            icon={Music}
            title="Creative Works"
            description="Music, art, writing. Your creative legacy, permanently preserved and provably yours via blockchain timestamp."
          />
          <FeatureCard
            icon={Heart}
            title="Digital Legacy"
            description="Create a time capsule for future generations. Letters, voice recordings, videos they can access forever."
          />
        </FeatureGrid>

        <Quote>
          I uploaded 20 years of family photos. My grandchildren will be able
          to access them without needing to remember my iCloud password.
        </Quote>

        <Callout type="tip" title="Digital Inheritance">
          Unlike traditional cloud storage that dies with your account, Helix
          files persist independently. Share the transaction IDs and encryption
          keys in your will, and your digital legacy is preserved.
        </Callout>
      </Section>

      <SectionTitle>Professional Use</SectionTitle>

      <Section>
        <FeatureGrid>
          <FeatureCard
            icon={Scale}
            title="Legal Evidence"
            description="Contracts, agreements, timestamped documents. Immutable proof of existence at a specific point in time."
          />
          <FeatureCard
            icon={Briefcase}
            title="Business Records"
            description="Financial records, audit trails, compliance documents. Permanent storage meets regulatory requirements."
          />
          <FeatureCard
            icon={GraduationCap}
            title="Academic Research"
            description="Research data, papers, datasets. Ensure your work remains accessible for verification and citation."
          />
          <FeatureCard
            icon={Code}
            title="Source Code"
            description="Version snapshots, release artifacts. Immutable code archives for auditing and historical reference."
          />
        </FeatureGrid>

        <SubSection>Legal & Compliance</SubSection>
        <Paragraph>
          Many industries require long-term document retention. Helix provides:
        </Paragraph>

        <div className="my-6 space-y-3">
          <div className="flex items-center gap-3 p-3 border border-white/10">
            <Scale className="h-4 w-4 text-[#d4622a]" />
            <span className="text-white/60 text-sm">Immutable timestamps proving document existence</span>
          </div>
          <div className="flex items-center gap-3 p-3 border border-white/10">
            <Scale className="h-4 w-4 text-[#d4622a]" />
            <span className="text-white/60 text-sm">Tamper-proof storage (any modification changes the hash)</span>
          </div>
          <div className="flex items-center gap-3 p-3 border border-white/10">
            <Scale className="h-4 w-4 text-[#d4622a]" />
            <span className="text-white/60 text-sm">Long-term accessibility exceeding typical retention requirements</span>
          </div>
          <div className="flex items-center gap-3 p-3 border border-white/10">
            <Scale className="h-4 w-4 text-[#d4622a]" />
            <span className="text-white/60 text-sm">Decentralized storage reducing single-vendor risk</span>
          </div>
        </div>
      </Section>

      <SectionTitle>AI & Machine Learning</SectionTitle>

      <Section>
        <FeatureGrid>
          <FeatureCard
            icon={Brain}
            title="Model Weights"
            description="Permanently store trained model weights. Share models without relying on centralized platforms."
          />
          <FeatureCard
            icon={Database}
            title="Training Datasets"
            description="Archive datasets with provable timestamps. Ensure reproducibility of research results."
          />
          <FeatureCard
            icon={Cpu}
            title="Model Cards"
            description="Store model documentation and benchmarks permanently. Create immutable records of model capabilities."
          />
          <FeatureCard
            icon={Code}
            title="Inference Code"
            description="Archive the exact code used for inference. Enable perfect reproducibility years later."
          />
        </FeatureGrid>

        <Callout type="info" title="AI Model Storage">
          As AI models become valuable assets, permanent storage becomes
          critical. Helix can store models of any size—from small fine-tuned
          adapters to full foundation models—with a single payment.
        </Callout>

        <Paragraph>
          Researchers and companies are using Helix to:
        </Paragraph>

        <div className="my-6 space-y-4">
          <div className="border border-white/10 p-4">
            <p className="text-white font-medium text-sm mb-2">Archive Training Checkpoints</p>
            <p className="text-white/50 text-sm">
              Store model checkpoints at key training milestones. Never lose
              progress, even if local storage fails.
            </p>
          </div>

          <div className="border border-white/10 p-4">
            <p className="text-white font-medium text-sm mb-2">Distribute Open Models</p>
            <p className="text-white/50 text-sm">
              Share open-source models via permanent URLs. No bandwidth limits,
              no hosting costs after initial upload.
            </p>
          </div>

          <div className="border border-white/10 p-4">
            <p className="text-white font-medium text-sm mb-2">Prove Model Provenance</p>
            <p className="text-white/50 text-sm">
              Timestamp model releases on blockchain. Establish priority and
              provenance for valuable intellectual property.
            </p>
          </div>
        </div>
      </Section>

      <SectionTitle>Organizations</SectionTitle>

      <Section>
        <FeatureGrid>
          <FeatureCard
            icon={Building}
            title="Nonprofits"
            description="Preserve institutional knowledge, grant documentation, and historical records beyond any individual's tenure."
          />
          <FeatureCard
            icon={Globe}
            title="News & Media"
            description="Archive articles, photos, and videos permanently. Protect journalism from censorship and link rot."
          />
          <FeatureCard
            icon={GraduationCap}
            title="Universities"
            description="Store research data, theses, and publications. Ensure academic work remains accessible indefinitely."
          />
          <FeatureCard
            icon={Building}
            title="Government"
            description="Public records, historical documents, transparency archives. Permanent, tamper-proof civic data."
          />
        </FeatureGrid>

        <SubSection>Case: Digital Archives</SubSection>
        <Paragraph>
          Libraries and archives face a constant challenge: digital preservation
          requires ongoing maintenance, migration, and funding. Every decade,
          formats change and storage media degrades.
        </Paragraph>

        <Paragraph>
          Helix offers a different model: pay once to permanently store digital
          collections. No migration needed, no format conversion, no ongoing
          costs. The content remains accessible via simple HTTP requests
          forever.
        </Paragraph>

        <Quote author="Digital Archivist">
          We were spending thousands annually just to keep our digital
          collections online. A one-time payment to Arweave solved our
          sustainability problem permanently.
        </Quote>
      </Section>

      <SectionTitle>Content Creators</SectionTitle>

      <Section>
        <Paragraph>
          Artists, musicians, writers, and creators of all kinds benefit from
          permanent storage:
        </Paragraph>

        <div className="my-6 space-y-4">
          <div className="flex items-start gap-4 p-4 border border-white/10">
            <Music className="h-5 w-5 text-[#d4622a] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium text-sm">Musicians</p>
              <p className="text-white/50 text-sm mt-1">
                Store masters, stems, and final mixes. Create an immutable
                discography that outlives streaming platforms.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border border-white/10">
            <ImageIcon className="h-5 w-5 text-[#d4622a] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium text-sm">Visual Artists</p>
              <p className="text-white/50 text-sm mt-1">
                Archive high-resolution originals. Prove creation dates for
                copyright. Store portfolio permanently.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border border-white/10">
            <Video className="h-5 w-5 text-[#d4622a] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium text-sm">Video Creators</p>
              <p className="text-white/50 text-sm mt-1">
                Backup raw footage and final cuts. Preserve your work
                independent of YouTube or other platforms.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border border-white/10">
            <FileText className="h-5 w-5 text-[#d4622a] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium text-sm">Writers</p>
              <p className="text-white/50 text-sm mt-1">
                Archive manuscripts, notes, and research. Create timestamped
                proof of authorship for unpublished works.
              </p>
            </div>
          </div>
        </div>

        <Callout type="tip" title="Proof of Creation">
          Every upload to Arweave is timestamped on the blockchain. This creates
          undeniable proof that you had possession of a file at a specific
          moment—useful for copyright disputes.
        </Callout>
      </Section>

      <SectionTitle>Getting Started</SectionTitle>

      <Section>
        <Paragraph>
          Ready to explore permanent storage for your use case? Here's how to
          begin:
        </Paragraph>

        <div className="my-6 space-y-4">
          <div className="flex items-start gap-4 p-4 border border-white/10">
            <div className="w-8 h-8 rounded-full bg-[#d4622a]/20 flex items-center justify-center text-[#d4622a] font-mono text-sm flex-shrink-0">
              1
            </div>
            <div>
              <p className="text-white font-medium text-sm">Connect Your Wallet</p>
              <p className="text-white/50 text-sm mt-1">
                Install Phantom or another Solana wallet and connect to Helix.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border border-white/10">
            <div className="w-8 h-8 rounded-full bg-[#d4622a]/20 flex items-center justify-center text-[#d4622a] font-mono text-sm flex-shrink-0">
              2
            </div>
            <div>
              <p className="text-white font-medium text-sm">Start Small</p>
              <p className="text-white/50 text-sm mt-1">
                Upload a test file to understand the process. Costs start at
                fractions of a cent for small files.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border border-white/10">
            <div className="w-8 h-8 rounded-full bg-[#d4622a]/20 flex items-center justify-center text-[#d4622a] font-mono text-sm flex-shrink-0">
              3
            </div>
            <div>
              <p className="text-white font-medium text-sm">Scale Up</p>
              <p className="text-white/50 text-sm mt-1">
                Once comfortable, upload larger files or batches. There's no
                limit on file size or quantity.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border border-white/10">
            <div className="w-8 h-8 rounded-full bg-[#d4622a]/20 flex items-center justify-center text-[#d4622a] font-mono text-sm flex-shrink-0">
              4
            </div>
            <div>
              <p className="text-white font-medium text-sm">Share & Access</p>
              <p className="text-white/50 text-sm mt-1">
                Use share links or direct Arweave URLs. Access your files from
                anywhere, anytime, forever.
              </p>
            </div>
          </div>
        </div>

        <Quote>
          Whatever your use case, the promise is the same: pay once, store
          forever, own your data completely.
        </Quote>
      </Section>
    </>
  );
}
