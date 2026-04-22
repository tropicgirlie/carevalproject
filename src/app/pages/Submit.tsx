import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { CheckCircle2 } from 'lucide-react';

export function Submit() {
  const [promptSet, setPromptSet] = useState<'all' | 'subset'>('all');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-[1160px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="border border-sage-green/30 bg-sage-green/5 p-12 text-center max-w-2xl mx-auto">
          <CheckCircle2 className="w-12 h-12 text-sage-green mx-auto mb-4" />
          <h2 className="text-deep-navy text-[1.8rem] mb-3">Thank you — almost there</h2>
          <p className="text-[16px] text-slate-grey leading-7 mb-6 max-w-lg mx-auto">
            Automated submission is coming soon. In the meantime, please email
            your results directly — we review every submission manually.
          </p>
          <a
            href="mailto:careval@momops.org?subject=CAREVAL%20Submission"
            className="inline-flex items-center gap-2 px-8 py-4 bg-deep-navy text-white text-[16px] font-semibold tracking-[0.12em] uppercase hover:bg-deep-navy/90 transition-colors"
          >
            Send to careval@momops.org
          </a>
          <p className="text-[16px] text-slate-grey mt-6">
            Attach your scores as a CSV or paste them in the email body. We aim
            to review within 5 working days.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1160px] mx-auto px-4 md:px-8 py-12 md:py-16 space-y-12">
      {/* Hero */}
      <section className="space-y-6">
        <div className="text-[16px] uppercase tracking-[0.14em] text-slate-grey bg-[#e8ebf5] inline-block px-3 py-1">
          Contribute
        </div>
        <h1 className="text-deep-navy max-w-[720px]">Submit Test Results</h1>
        <p className="max-w-[760px] text-slate-grey leading-relaxed">
          Help build the leaderboard by submitting your model evaluation results.
          All submissions are manually reviewed to ensure scoring accuracy.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary/20 bg-primary/5 text-[16px] text-primary font-medium">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Active development — automated ingestion coming Q1 2025. Email submissions accepted now.
        </div>
      </section>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Model Information */}
        <section className="border border-border/60 bg-white p-8 space-y-6">
          <h2 className="text-deep-navy text-[20px] font-semibold border-b border-border/50 pb-4">
            Model Information
          </h2>

          <div className="space-y-6">
            <div>
              <Label htmlFor="modelName" className="text-[16px]">Model Name *</Label>
              <Input
                id="modelName"
                type="text"
                placeholder="e.g., GPT-4"
                required
                className="mt-2 text-[16px]"
              />
            </div>

            <div>
              <Label htmlFor="version" className="text-[16px]">Version</Label>
              <Input
                id="version"
                type="text"
                placeholder="e.g., gpt-4-0613"
                className="mt-2 text-[16px]"
              />
            </div>

            <div>
              <Label htmlFor="testDate" className="text-[16px]">Test Date *</Label>
              <Input
                id="testDate"
                type="date"
                required
                className="mt-2 text-[16px]"
              />
            </div>
          </div>
        </section>

        {/* Testing Details */}
        <section className="border border-border/60 bg-white p-8 space-y-6">
          <h2 className="text-deep-navy text-[20px] font-semibold border-b border-border/50 pb-4">
            Testing Details
          </h2>

          <div className="space-y-6">
            <div>
              <Label className="text-[16px]">Prompts Used *</Label>
              <RadioGroup value={promptSet} onValueChange={(value) => setPromptSet(value as 'all' | 'subset')} className="mt-3 space-y-3">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all" className="font-normal cursor-pointer text-slate-grey text-[16px]">
                    All 50 prompts (recommended)
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="subset" id="subset" />
                  <Label htmlFor="subset" className="font-normal cursor-pointer text-slate-grey text-[16px]">
                    Subset: select domains
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {promptSet === 'subset' && (
              <div className="pl-6 space-y-3 bg-warm-grey/50 border border-border/40 p-6">
                <Label className="text-[16px] text-slate-grey">Select domains tested:</Label>
                <div className="space-y-3">
                  {['HR & Workplace', 'Healthcare', 'Product UX', 'Government Services', 'Education'].map(
                    (domain) => (
                      <label key={domain} className="flex items-center gap-3 text-slate-grey cursor-pointer text-[16px]">
                        <input type="checkbox" className="rounded border-border" />
                        {domain}
                      </label>
                    )
                  )}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="temperature" className="text-[16px]">Temperature</Label>
                <Input
                  id="temperature"
                  type="number"
                  step="0.1"
                  placeholder="0.7"
                  className="mt-2 text-[16px]"
                />
              </div>

              <div>
                <Label htmlFor="maxTokens" className="text-[16px]">Max Tokens</Label>
                <Input
                  id="maxTokens"
                  type="number"
                  placeholder="300"
                  className="mt-2 text-[16px]"
                />
              </div>

              <div>
                <Label htmlFor="runs" className="text-[16px]">Runs per Prompt</Label>
                <Input
                  id="runs"
                  type="number"
                  placeholder="3"
                  className="mt-2 text-[16px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Score Upload */}
        <section className="border border-border/60 bg-white p-8 space-y-6">
          <h2 className="text-deep-navy text-[20px] font-semibold border-b border-border/50 pb-4">
            Score Upload
          </h2>

          <div className="space-y-6">
            <div>
              <Label className="text-[16px]">Option 1: Upload CSV</Label>
              <div className="mt-3 flex gap-3">
                <Button type="button" variant="outline" size="sm" className="text-[16px]">
                  Download Template
                </Button>
                <Input
                  type="file"
                  accept=".csv"
                  className="flex-1 text-[16px]"
                />
              </div>
            </div>

            <div className="text-center text-[16px] text-slate-grey py-2">
              OR
            </div>

            <div>
              <Label htmlFor="manualScores" className="text-[16px]">Option 2: Manual Entry</Label>
              <Textarea
                id="manualScores"
                placeholder="Enter scores in format: Prompt ID, Score (e.g., 1.1, 7)"
                rows={6}
                className="mt-2 font-mono text-[16px]"
              />
            </div>
          </div>
        </section>

        {/* Verification */}
        <section className="border border-border/60 bg-white p-8 space-y-6">
          <h2 className="text-deep-navy text-[20px] font-semibold border-b border-border/50 pb-4">
            Verification (Required)
          </h2>

          <p className="text-[16px] text-slate-grey leading-7">
            To ensure scoring accuracy, please provide example responses from your model:
          </p>

          <div className="space-y-6">
            <div className="bg-warm-grey/30 border border-border/40 p-6 space-y-4">
              <Label className="text-[16px]">Example response from Prompt 1.1</Label>
              <Textarea
                placeholder="Paste your model's response here..."
                rows={4}
                className="mt-2 text-[16px]"
                required
              />
              <div className="flex items-center gap-3">
                <Label htmlFor="score1" className="text-[16px]">Your scoring:</Label>
                <Input
                  id="score1"
                  type="number"
                  min="0"
                  max="12"
                  placeholder="0-12"
                  className="w-24 text-[16px]"
                  required
                />
                <span className="text-[16px] text-slate-grey">/ 12</span>
              </div>
            </div>

            <div className="bg-warm-grey/30 border border-border/40 p-6 space-y-4">
              <Label className="text-[16px]">Example response from Prompt 2.1</Label>
              <Textarea
                placeholder="Paste your model's response here..."
                rows={4}
                className="mt-2 text-[16px]"
                required
              />
              <div className="flex items-center gap-3">
                <Label htmlFor="score2" className="text-[16px]">Your scoring:</Label>
                <Input
                  id="score2"
                  type="number"
                  min="0"
                  max="12"
                  placeholder="0-12"
                  className="w-24 text-[16px]"
                  required
                />
                <span className="text-[16px] text-slate-grey">/ 12</span>
              </div>
            </div>
          </div>
        </section>

        {/* Optional Information */}
        <section className="border border-border/60 bg-white p-8 space-y-6">
          <h2 className="text-deep-navy text-[20px] font-semibold border-b border-border/50 pb-4">
            Optional Information
          </h2>

          <div className="space-y-6">
            <div>
              <Label htmlFor="paper" className="text-[16px]">Research paper using CAREVAL</Label>
              <Input
                id="paper"
                type="url"
                placeholder="https://..."
                className="mt-2 text-[16px]"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-[16px]">Contact email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="mt-2 text-[16px]"
              />
              <p className="text-[16px] text-slate-grey mt-2">
                We'll only contact you about verification questions
              </p>
            </div>

            <div>
              <Label htmlFor="notes" className="text-[16px]">Additional notes</Label>
              <Textarea
                id="notes"
                placeholder="Any relevant details about your testing methodology..."
                rows={4}
                className="mt-2 text-[16px]"
              />
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" size="lg" className="px-10 py-6 text-[16px] font-semibold tracking-[0.12em] uppercase">
            Submit Results
          </Button>
        </div>
      </form>
    </div>
  );
}