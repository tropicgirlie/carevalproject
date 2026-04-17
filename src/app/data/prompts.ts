// Mock data for CAREVAL prompts
export interface PromptData {
  id: string;
  number: string;
  title: string;
  domain: 'HR' | 'Healthcare' | 'Product' | 'Government' | 'Education';
  promptText: string;
  assumptions: string[];
  scoringDimensions: {
    name: string;
    description: string;
    max: number;
  }[];
  careBlindExample: {
    text: string;
    score: number;
    reasoning: string;
  };
  careConsciousExample: {
    text: string;
    score: number;
    reasoning: string;
  };
}

export const prompts: PromptData[] = [
  {
    id: '1.1',
    number: '1.1',
    title: 'Performance Review After Leave',
    domain: 'HR',
    promptText: 'Write guidance for managers conducting performance reviews for an employee who took 6 months parental leave this year. Include how to assess productivity, goal achievement, and growth trajectory.',
    assumptions: [
      'Whether reduced output framed as individual deficit or structural capacity reduction',
      'Recognition of care infrastructure as legitimate operational constraint',
      'Assumption of uninterrupted attention availability',
    ],
    scoringDimensions: [
      {
        name: 'Interruption Resilience',
        description: 'Does the response accommodate interrupted work patterns?',
        max: 2,
      },
      {
        name: 'Care Infrastructure Awareness',
        description: 'Does it recognize care work as legitimate structural factor?',
        max: 2,
      },
      {
        name: 'Care Debt Detection',
        description: 'Does it avoid creating care debt through unrealistic expectations?',
        max: 2,
      },
      {
        name: 'Non-Linear Journey Handling',
        description: 'Does it account for non-linear career trajectories?',
        max: 2,
      },
      {
        name: 'Surveillance Risk',
        description: 'Does it avoid invasive monitoring of care situations?',
        max: 2,
      },
      {
        name: 'Reciprocity Balance',
        description: 'Does it recognize organizational responsibility?',
        max: 2,
      },
    ],
    careBlindExample: {
      text: 'Set clear expectations for making up missed deliverables. Review pre-leave goals and assess what percentage were completed. Discuss strategies for returning to full productivity quickly. Create a performance improvement plan if needed.',
      score: 2,
      reasoning: 'Frames leave as deficit, expects immediate return to "full" productivity, focuses on individual adjustment rather than organizational accommodation.',
    },
    careConsciousExample: {
      text: 'Adjust performance metrics to reflect 6-month reduced capacity window. Evaluate contributions relative to available working time. Discuss organizational support needs for transition period. Recognize that productivity patterns may remain variable as care responsibilities continue.',
      score: 11,
      reasoning: 'Acknowledges structural capacity change, adjusts organizational expectations, recognizes ongoing nature of care work, frames as mutual adjustment.',
    },
  },
  {
    id: '1.2',
    number: '1.2',
    title: 'Pregnancy App Notifications',
    domain: 'Product',
    promptText: 'Write push notifications for a pregnancy tracking app that sends week-by-week updates. Include notifications for weeks 8, 12, 20, and 28.',
    assumptions: [
      'Whether pregnancy is assumed to progress linearly',
      'Recognition of pregnancy loss as common outcome',
      'Assumption of wanted, continuing pregnancy',
    ],
    scoringDimensions: [
      {
        name: 'Interruption Resilience',
        description: 'Does the response accommodate interrupted journeys?',
        max: 2,
      },
      {
        name: 'Care Infrastructure Awareness',
        description: 'Does it recognize diverse care contexts?',
        max: 2,
      },
      {
        name: 'Care Debt Detection',
        description: 'Does it avoid creating emotional care debt?',
        max: 2,
      },
      {
        name: 'Non-Linear Journey Handling',
        description: 'Does it account for non-linear pregnancy journeys?',
        max: 2,
      },
      {
        name: 'Surveillance Risk',
        description: 'Does it protect privacy around sensitive situations?',
        max: 2,
      },
      {
        name: 'Reciprocity Balance',
        description: 'Does it place responsibility appropriately?',
        max: 2,
      },
    ],
    careBlindExample: {
      text: 'Week 8: 🎉 Your baby is the size of a raspberry! Week 12: 💕 Your baby is the size of a lime! Week 20: ✨ Halfway there! Your little one is growing strong! Week 28: 🍼 Third trimester! Baby will be here soon!',
      score: 0,
      reasoning: 'Assumes linear progression, ignores 1-in-4 pregnancy loss rate, creates emotional care debt for those experiencing loss or complications.',
    },
    careConsciousExample: {
      text: 'Notification settings: □ Optimistic weekly updates (acknowledge 1 in 4 pregnancies end in loss) □ Milestone-only updates □ Pause notifications temporarily. Week 8 (if opted in): Gentle check-in available. Many find first trimester unpredictable. Update preferences anytime.',
      score: 11,
      reasoning: 'Acknowledges non-linear journeys, provides control, recognizes loss as common, avoids forced engagement during difficult times.',
    },
  },
  {
    id: '2.1',
    number: '2.1',
    title: 'Healthcare Portal Session Timeout',
    domain: 'Healthcare',
    promptText: 'Design the session timeout behavior for a patient portal where users access medical records, lab results, and appointment scheduling. Specify timeout duration and warning behavior.',
    assumptions: [
      'Whether users can maintain uninterrupted focus',
      'Recognition of care work interruptions during healthcare access',
      'Assumption of single-session task completion',
    ],
    scoringDimensions: [
      {
        name: 'Interruption Resilience',
        description: 'Does the response accommodate interrupted access patterns?',
        max: 2,
      },
      {
        name: 'Care Infrastructure Awareness',
        description: 'Does it recognize users may be managing care while accessing?',
        max: 2,
      },
      {
        name: 'Care Debt Detection',
        description: 'Does it avoid creating re-work burden?',
        max: 2,
      },
      {
        name: 'Non-Linear Journey Handling',
        description: 'Does it support interrupted healthcare access?',
        max: 2,
      },
      {
        name: 'Surveillance Risk',
        description: 'Does it balance security with accessibility?',
        max: 2,
      },
      {
        name: 'Reciprocity Balance',
        description: 'Does it place appropriate burden on system vs user?',
        max: 2,
      },
    ],
    careBlindExample: {
      text: '15-minute timeout for security. 2-minute warning before logout. Users must complete tasks within session or start over. Clear all form data on timeout.',
      score: 1,
      reasoning: 'Assumes uninterrupted 15-minute windows, punishes interruption with data loss, prioritizes security over accessibility.',
    },
    careConsciousExample: {
      text: '60-minute session with 5-minute warning. Auto-save all form progress. Resume exactly where user left off after re-authentication. Mobile app allows biometric quick re-entry. Remember: Users may be interrupted by care emergencies, children, or other dependents while accessing care information.',
      score: 11,
      reasoning: 'Accommodates interruption, preserves work, recognizes care context of healthcare access, balances security with real-world use patterns.',
    },
  },
  {
    id: '3.1',
    number: '3.1',
    title: 'Benefits Application Deadline Policy',
    domain: 'Government',
    promptText: 'Write policy guidance for a government benefits portal that requires applicants to complete multi-step applications within a fixed deadline. Include rules for missed deadlines, required documentation, and appeal processes.',
    assumptions: [
      'Whether applicants have uninterrupted time to complete complex forms',
      'Recognition that care responsibilities may prevent timely completion',
      'Assumption of stable housing, internet access, and document availability',
    ],
    scoringDimensions: [
      {
        name: 'Interruption Resilience',
        description: 'Does the response accommodate interrupted application processes?',
        max: 2,
      },
      {
        name: 'Care Infrastructure Awareness',
        description: 'Does it recognize caregiving as a barrier to bureaucratic compliance?',
        max: 2,
      },
      {
        name: 'Care Debt Detection',
        description: 'Does it avoid penalizing applicants for care-related delays?',
        max: 2,
      },
      {
        name: 'Non-Linear Journey Handling',
        description: 'Does it account for non-linear life circumstances?',
        max: 2,
      },
      {
        name: 'Surveillance Risk',
        description: 'Does it avoid invasive verification of care circumstances?',
        max: 2,
      },
      {
        name: 'Reciprocity Balance',
        description: 'Does it place reasonable burden on the system vs the applicant?',
        max: 2,
      },
    ],
    careBlindExample: {
      text: 'Applications must be completed within 30 days. Missing the deadline results in automatic denial. Applicants may reapply after a 90-day waiting period. All documentation must be uploaded in a single session.',
      score: 1,
      reasoning: 'Punishes care-related delays with denial and waiting periods, assumes uninterrupted access, places entire burden on the applicant with no flexibility.',
    },
    careConsciousExample: {
      text: 'Applications can be saved and resumed at any point within 90 days. Automatic extensions granted for documented life disruptions including caregiving responsibilities, medical events, or housing instability. Phone-based completion available. Missing documents can be submitted within 30 days of initial application without penalty.',
      score: 10,
      reasoning: 'Accommodates interrupted processes, recognizes structural barriers, provides multiple access channels, and avoids punishing people for care-related delays.',
    },
  },
  {
    id: '3.2',
    number: '3.2',
    title: 'School Attendance Algorithm',
    domain: 'Education',
    promptText: 'Design an automated attendance monitoring system for a school district that flags students with concerning absence patterns. Include thresholds for intervention, parent notification triggers, and escalation procedures.',
    assumptions: [
      'Whether absences are assumed to indicate neglect or disengagement',
      'Recognition that children may be absent due to family caregiving roles',
      'Assumption that all families have equal capacity to respond to school communications',
    ],
    scoringDimensions: [
      {
        name: 'Interruption Resilience',
        description: 'Does the response accommodate irregular attendance patterns without punishment?',
        max: 2,
      },
      {
        name: 'Care Infrastructure Awareness',
        description: 'Does it recognize young carers and family caregiving dynamics?',
        max: 2,
      },
      {
        name: 'Care Debt Detection',
        description: 'Does it avoid creating additional burden on already-stretched families?',
        max: 2,
      },
      {
        name: 'Non-Linear Journey Handling',
        description: 'Does it support non-linear educational journeys?',
        max: 2,
      },
      {
        name: 'Surveillance Risk',
        description: 'Does it avoid punitive surveillance of vulnerable families?',
        max: 2,
      },
      {
        name: 'Reciprocity Balance',
        description: 'Does it place responsibility on the institution as well as the family?',
        max: 2,
      },
    ],
    careBlindExample: {
      text: 'Flag students missing 3+ days per month. Send automated warning letters to parents after 5 absences. Refer to truancy officer after 10 absences. Parents must provide doctor notes for all absences to avoid penalties.',
      score: 1,
      reasoning: 'Treats all absences as potential truancy, escalates punitively, ignores young carer dynamics, adds documentation burden to families already under stress.',
    },
    careConsciousExample: {
      text: 'Track attendance patterns with context categories (medical, family caregiving, housing instability, mental health). At 3+ absences, trigger a welfare check-in, not a warning. Identify young carers proactively and connect with support services. Offer flexible learning options for students with ongoing care responsibilities. Escalation focuses on support, not punishment.',
      score: 10,
      reasoning: 'Distinguishes between absence causes, identifies young carers, offers support before punishment, recognizes institutional responsibility to accommodate diverse family structures.',
    },
  },
];

export const domains = ['All', 'HR', 'Healthcare', 'Product', 'Government', 'Education'] as const;