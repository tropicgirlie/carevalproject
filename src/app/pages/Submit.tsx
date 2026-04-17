import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { CheckCircle2 } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/motion';

export function Submit() {
  const [promptSet, setPromptSet] = useState<'all' | 'subset'>('all');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <div className="mb-16">
        <FadeIn>
          <h1 className="gradient-text-navy mb-4">
            Submit CAREVAL Test Results
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-xl text-slate-grey leading-relaxed max-w-3xl">
            Help build the leaderboard by submitting your model evaluation results. All submissions are manually reviewed to ensure scoring accuracy.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-teal-light/10 border border-brand-teal-light/20 text-sm text-brand-teal-light font-medium">
            <span className="w-2 h-2 rounded-full bg-brand-teal-light animate-pulse" />
            Active development — automated ingestion coming Q1 2025. Email submissions accepted now.
          </div>
        </FadeIn>
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-green-50/50 border-2 border-sage-green rounded-2xl p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, delay: 0.2 }}
            >
              <CheckCircle2 className="w-16 h-16 text-sage-green mx-auto mb-4" />
            </motion.div>
            <h2 className="text-3xl font-semibold text-deep-navy mb-3">Thank you — almost there</h2>
            <p className="text-slate-grey text-lg mb-6 max-w-lg mx-auto">
              Automated submission is coming soon. In the meantime, please email your results directly — we review every submission manually.
            </p>
            <a
              href="mailto:careval@momops.org?subject=CAREVAL%20Submission"
              className="inline-flex items-center gap-2 px-8 py-4 bg-deep-navy text-white rounded-xl font-medium hover:bg-deep-navy/90 transition-colors"
            >
              Send to careval@momops.org
            </a>
            <p className="text-sm text-slate-grey mt-6">
              Attach your scores as a CSV or paste them in the email body. We aim to review within 5 working days.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Model Information */}
            <div className="bg-white rounded-2xl shadow-soft border border-border/50 p-8 space-y-6">
              <h2 className="text-2xl font-semibold text-deep-navy border-b border-border/50 pb-4">
                Model Information
              </h2>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="modelName">Model Name *</Label>
                  <Input
                    id="modelName"
                    type="text"
                    placeholder="e.g., GPT-4"
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="version">Version</Label>
                  <Input
                    id="version"
                    type="text"
                    placeholder="e.g., gpt-4-0613"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="testDate">Test Date *</Label>
                  <Input
                    id="testDate"
                    type="date"
                    required
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Testing Details */}
            <div className="bg-white rounded-2xl shadow-soft border border-border/50 p-8 space-y-6">
              <h2 className="text-2xl font-semibold text-deep-navy border-b border-border/50 pb-4">
                Testing Details
              </h2>

              <div className="space-y-6">
                <div>
                  <Label>Prompts Used *</Label>
                  <RadioGroup value={promptSet} onValueChange={(value) => setPromptSet(value as 'all' | 'subset')} className="mt-3 space-y-3">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="all" id="all" />
                      <Label htmlFor="all" className="font-normal cursor-pointer text-slate-grey">
                        All 50 prompts (recommended)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="subset" id="subset" />
                      <Label htmlFor="subset" className="font-normal cursor-pointer text-slate-grey">
                        Subset: select domains
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {promptSet === 'subset' && (
                  <div className="pl-6 space-y-3 bg-warm-grey/50 rounded-xl p-6">
                    <Label className="text-sm text-slate-grey">Select domains tested:</Label>
                    <div className="space-y-3">
                      {['HR & Workplace', 'Healthcare', 'Product UX', 'Government Services', 'Education'].map(
                        (domain) => (
                          <label key={domain} className="flex items-center gap-3 text-slate-grey cursor-pointer">
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
                    <Label htmlFor="temperature">Temperature</Label>
                    <Input
                      id="temperature"
                      type="number"
                      step="0.1"
                      placeholder="0.7"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="maxTokens">Max Tokens</Label>
                    <Input
                      id="maxTokens"
                      type="number"
                      placeholder="300"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="runs">Runs per Prompt</Label>
                    <Input
                      id="runs"
                      type="number"
                      placeholder="3"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Score Upload */}
            <div className="bg-white rounded-2xl shadow-soft border border-border/50 p-8 space-y-6">
              <h2 className="text-2xl font-semibold text-deep-navy border-b border-border/50 pb-4">
                Score Upload
              </h2>

              <div className="space-y-6">
                <div>
                  <Label>Option 1: Upload CSV</Label>
                  <div className="mt-3 flex gap-3">
                    <Button type="button" variant="outline" size="sm">
                      Download Template
                    </Button>
                    <Input
                      type="file"
                      accept=".csv"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="text-center text-sm text-slate-grey py-2">
                  OR
                </div>

                <div>
                  <Label htmlFor="manualScores">Option 2: Manual Entry</Label>
                  <Textarea
                    id="manualScores"
                    placeholder="Enter scores in format: Prompt ID, Score (e.g., 1.1, 7)"
                    rows={6}
                    className="mt-2 font-mono text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Verification */}
            <div className="bg-white rounded-2xl shadow-soft border border-border/50 p-8 space-y-6">
              <h2 className="text-2xl font-semibold text-deep-navy border-b border-border/50 pb-4">
                Verification (Required)
              </h2>

              <p className="text-slate-grey">
                To ensure scoring accuracy, please provide example responses from your model:
              </p>

              <div className="space-y-6">
                <div className="bg-warm-grey/30 rounded-xl p-6 space-y-4">
                  <Label>Example response from Prompt 1.1</Label>
                  <Textarea
                    placeholder="Paste your model's response here..."
                    rows={4}
                    className="mt-2"
                    required
                  />
                  <div className="flex items-center gap-3">
                    <Label htmlFor="score1">Your scoring:</Label>
                    <Input
                      id="score1"
                      type="number"
                      min="0"
                      max="12"
                      placeholder="0-12"
                      className="w-24"
                      required
                    />
                    <span className="text-slate-grey">/ 12</span>
                  </div>
                </div>

                <div className="bg-warm-grey/30 rounded-xl p-6 space-y-4">
                  <Label>Example response from Prompt 2.1</Label>
                  <Textarea
                    placeholder="Paste your model's response here..."
                    rows={4}
                    className="mt-2"
                    required
                  />
                  <div className="flex items-center gap-3">
                    <Label htmlFor="score2">Your scoring:</Label>
                    <Input
                      id="score2"
                      type="number"
                      min="0"
                      max="12"
                      placeholder="0-12"
                      className="w-24"
                      required
                    />
                    <span className="text-slate-grey">/ 12</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional Information */}
            <div className="bg-white rounded-2xl shadow-soft border border-border/50 p-8 space-y-6">
              <h2 className="text-2xl font-semibold text-deep-navy border-b border-border/50 pb-4">
                Optional Information
              </h2>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="paper">Research paper using CAREVAL</Label>
                  <Input
                    id="paper"
                    type="url"
                    placeholder="https://..."
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Contact email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="mt-2"
                  />
                  <p className="text-sm text-slate-grey mt-2">
                    We'll only contact you about verification questions
                  </p>
                </div>

                <div>
                  <Label htmlFor="notes">Additional notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any relevant details about your testing methodology..."
                    rows={4}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <FadeIn>
              <div className="flex justify-end">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button type="submit" size="lg" className="px-10 py-6 text-lg rounded-xl shadow-soft hover:shadow-glow">
                    Submit Results
                  </Button>
                </motion.div>
              </div>
            </FadeIn>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}