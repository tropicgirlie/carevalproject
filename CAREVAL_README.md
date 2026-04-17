# CAREVAL - Care-Blindness Evaluation for AI Systems

A comprehensive benchmark tool for detecting care infrastructure erasure as systematic bias in AI systems.

## Overview

CAREVAL is a research-grade benchmark tool (similar to GLUE/SuperGLUE for NLP) that evaluates AI systems for care-blindness. The systematic assumption of uninterrupted attention, absence of dependents, and linear trajectories.

## Features

### Pages

1. **Home** (`/`)
   - Hero section with value proposition
   - Example prompt comparison (care-blind vs care-conscious)
   - Leaderboard preview
   - Quick start guide for different user types

2. **Methodology** (`/methodology`)
   - Theoretical foundation (MomOps framework)
   - Six scoring dimensions explained in detail
   - Testing protocol
   - Annotation schema
   - Research validation

3. **Prompts** (`/prompts`)
   - Expandable/collapsible prompt cards
   - Domain filtering (All, HR, Healthcare, Product, Government, Education)
   - Copy-to-clipboard functionality
   - Detailed scoring rubrics
   - Reference responses (care-blind and care-conscious examples)
   - Download options for each prompt

4. **Leaderboard** (`/leaderboard`)
   - Overall scores table
   - Domain breakdown view
   - Progress bars for visual comparison
   - Model selection for detailed analysis
   - Care-consciousness threshold indicator

5. **Submit** (`/submit`)
   - Model information form
   - Testing details (prompts used, parameters)
   - Score upload (CSV or manual entry)
   - Verification examples required
   - Optional contact/research paper linking

6. **Resources** (`/resources`)
   - Scoring template download
   - Testing guide
   - Citation guide (BibTeX, APA)
   - FAQ section
   - Contact information

## Design Principles

- **Research-grade aesthetic**: Clean, monospace fonts, minimal styling
- **Transparency first**: All methodology publicly visible
- **Minimal friction**: No account required to use
- **Progressive disclosure**: Expandable sections to manage information density
- **Accessibility**: WCAG AA compliant colors and interactions

## Data Structure

### Prompts
Each prompt includes:
- ID and domain classification
- Full prompt text
- Assumptions being tested
- 6-dimension scoring rubric (0-2 points each, max 12)
- Care-blind example (low score)
- Care-conscious example (high score)
- Reasoning for scores

### Leaderboard
Each entry includes:
- Model name and version
- Overall score (average across all prompts)
- Test date
- Domain-specific breakdowns
- Comparison to care-consciousness threshold (9/12)

## Scoring Dimensions

1. **Interruption Resilience** - Accommodates interrupted work patterns
2. **Care Infrastructure Awareness** - Recognizes care work as structural factor
3. **Care Debt Detection** - Avoids creating unrealistic expectations
4. **Non-Linear Journey Handling** - Accounts for non-linear trajectories
5. **Surveillance Risk** - Protects privacy around care situations
6. **Reciprocity Balance** - Appropriate organizational responsibility

## Technical Stack

- React 18.3.1 with React Router
- TypeScript
- Tailwind CSS v4
- Radix UI components
- Lucide React icons

## Mock Data

Currently includes 3 sample prompts across different domains and 5 leaderboard entries for major LLMs. In production, this would be expanded to:
- 50 benchmark prompts (10 per domain)
- Full leaderboard with community submissions
- Download functionality for datasets
- API for automated scoring (future enhancement)

## Usage

### For Researchers
1. Browse prompts by domain
2. Copy prompts to test your model
3. Score responses using 6-dimension rubric
4. Submit results to leaderboard

### For Companies
1. Filter prompts by relevant domain
2. Test AI features internally
3. Identify specific failure modes
4. Iterate on care-consciousness

### For Developers
1. Review reference responses
2. Understand scoring methodology
3. Improve system design
4. Optional: contribute to leaderboard

## Future Enhancements

- API access for automated evaluation
- Automated scoring with trained classifier
- Training dataset for fine-tuning
- Community submissions and discussion
- Expanded prompt library (100+ prompts)
- Integration with Hugging Face

## Contact

careval@momops.org
https://careval.org