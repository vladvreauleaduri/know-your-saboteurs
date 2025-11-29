
import { Question, SaboteurInfo, SaboteurType } from './types';

export const SABOTEURS: Record<SaboteurType, SaboteurInfo> = {
  [SaboteurType.Judge]: {
    type: SaboteurType.Judge,
    description: "The universal saboteur that beats you up over mistakes and obsessively searches for what is wrong with you, others, and the situation.",
    color: "#E65D4D", // Sketch Rust (Brightened)
    icon: "⚖️",
    characteristics: [
      "Finds faults with self, others, and circumstances.",
      "Causes much of our anxiety, stress, and unhappiness.",
      "Fixated on what is wrong rather than appreciation."
    ],
    lies: [
      "Without me, you'll turn lazy and ambitious.",
      "If I don't punish you, you won't learn.",
      "Everyone else is better than you."
    ]
  },
  [SaboteurType.Controller]: {
    type: SaboteurType.Controller,
    description: "Anxiety-based need to take charge and control situations and people's actions to one's own will.",
    color: "#EB7E5D", // Sketch Clay (Brightened)
    icon: "🎮",
    characteristics: [
      "High anxiety when things are not going their way.",
      "Connects with others through competition or conflict.",
      "Willful, confrontational, and straight-talking."
    ],
    lies: [
      "Without me, you can't get anything done.",
      "Others want you to take control.",
      "You are either in control or out of control."
    ]
  },
  [SaboteurType.HyperAchiever]: {
    type: SaboteurType.HyperAchiever,
    description: "Dependent on constant performance and achievement for self-respect and self-validation.",
    color: "#5B86A8", // Sketch Slate (Significantly lighter for dark mode)
    icon: "🏆",
    characteristics: [
      "Competitive, image-conscious, and hard-working.",
      "Good at covering up insecurities.",
      "Adapts personality to fit what is impressive to others."
    ],
    lies: [
      "Life is about achieving and producing results.",
      "Feelings are a distraction and get in the way.",
      "You are worthy only as long as you are successful."
    ]
  },
  [SaboteurType.Restless]: {
    type: SaboteurType.Restless,
    description: "Constantly in search of greater excitement in the next activity or constant busyness.",
    color: "#6BB394", // Sketch Sage (Brightened)
    icon: "🐇",
    characteristics: [
      "Easily distracted and scattered.",
      "Stays busy to avoid dealing with unpleasant feelings.",
      "Seeks variety and excitement over depth."
    ],
    lies: [
      "Life is too short to be slow.",
      "You are missing out on something better.",
      "Why be content when you can be excited?"
    ]
  },
  [SaboteurType.Stickler]: {
    type: SaboteurType.Stickler,
    description: "Perfectionism and a need for order and organization taken too far.",
    color: "#9582AB", // Lighter Purple/Lavender for contrast
    icon: "📏",
    characteristics: [
      "Punctual, methodical, and perfectionist.",
      "Highly critical of self and others for sloppiness.",
      "Strong need for order and clear rules."
    ],
    lies: [
      "It is up to me to fix the mess others create.",
      "Perfection is the only standard worth having.",
      "There is a right way and a wrong way to do everything."
    ]
  },
  [SaboteurType.Pleaser]: {
    type: SaboteurType.Pleaser,
    description: "Indirectly tries to gain acceptance and affection by helping, pleasing, rescuing, or flattering others.",
    color: "#D69E93", // Lighter Rose
    icon: "🤝",
    characteristics: [
      "Needs to be liked by everyone.",
      "Has difficulty expressing own needs.",
      "Resents being taken for granted, but doesn't say it."
    ],
    lies: [
      "I help others selflessly (but I expect appreciation).",
      "If I don't rescue them, who will?",
      "To be a good person, I must put others' needs first."
    ]
  },
  [SaboteurType.HyperVigilant]: {
    type: SaboteurType.HyperVigilant,
    description: "Continuous intense anxiety about all the dangers and what could go wrong.",
    color: "#EAB04E", // Sketch Ochre (Brightened)
    icon: "👀",
    characteristics: [
      "Always anxious about what could go wrong.",
      "Suspicious of others' motives.",
      "Seeks reassurance and safety in rules and procedures."
    ],
    lies: [
      "Life is full of dangers.",
      "If I don't stay alert, something terrible will happen.",
      "I can never rest."
    ]
  },
  [SaboteurType.HyperRational]: {
    type: SaboteurType.HyperRational,
    description: "Intense and exclusive focus on the rational processing of everything, including relationships.",
    color: "#7CBED9", // Lighter Cyan/Blue
    icon: "🤖",
    characteristics: [
      "Intellectual, analyzing, and secretive.",
      "Perceived as cold, distant, or arrogant.",
      "Discomfort with strong emotions in self and others."
    ],
    lies: [
      "The rational mind is the most important thing.",
      "Emotions are messy and irrational.",
      "I am smarter than everyone else."
    ]
  },
  [SaboteurType.Victim]: {
    type: SaboteurType.Victim,
    description: "Emotional and temperamental as a way to gain attention and affection.",
    color: "#8DA0B3", // Lighter Grey Blue
    icon: "😿",
    characteristics: [
      "Focuses on painful feelings.",
      "Feels misunderstood and alone.",
      "Uses moodiness to test others' commitment."
    ],
    lies: [
      "I am the most unfortunate person I know.",
      "No one understands how hard I have it.",
      "If I suffer enough, maybe someone will rescue me."
    ]
  }
};

export const QUESTIONS: Question[] = [
  // Judge
  { id: 1, text: "I am often harsh and critical with myself when I make a mistake.", saboteur: SaboteurType.Judge },
  { id: 2, text: "I find myself frequently judging others' actions or motives.", saboteur: SaboteurType.Judge },
  
  // Stickler
  { id: 3, text: "I get frustrated when things are not done exactly the 'right' way.", saboteur: SaboteurType.Stickler },
  { id: 4, text: "I am often told I am too much of a perfectionist.", saboteur: SaboteurType.Stickler },

  // Pleaser
  { id: 5, text: "I often say 'yes' to help others even when I don't have the time or energy.", saboteur: SaboteurType.Pleaser },
  { id: 6, text: "I worry a lot about whether people like me.", saboteur: SaboteurType.Pleaser },

  // Hyper-Achiever
  { id: 7, text: "My self-worth is largely tied to my professional or personal successes.", saboteur: SaboteurType.HyperAchiever },
  { id: 8, text: "I often neglect my feelings to focus on getting things done.", saboteur: SaboteurType.HyperAchiever },

  // Victim
  { id: 9, text: "I often feel misunderstood or that things are harder for me than others.", saboteur: SaboteurType.Victim },
  { id: 10, text: "I tend to withdraw and pout when I feel hurt.", saboteur: SaboteurType.Victim },

  // Hyper-Rational
  { id: 11, text: "I prefer to analyze situations with logic rather than getting involved in emotions.", saboteur: SaboteurType.HyperRational },
  { id: 12, text: "Others sometimes perceive me as cold or intellectually arrogant.", saboteur: SaboteurType.HyperRational },

  // Hyper-Vigilant
  { id: 13, text: "I am constantly scanning my environment for potential dangers or problems.", saboteur: SaboteurType.HyperVigilant },
  { id: 14, text: "I have a hard time relaxing because I feel I need to stay alert.", saboteur: SaboteurType.HyperVigilant },

  // Restless
  { id: 15, text: "I get bored easily and am always looking for the next exciting thing.", saboteur: SaboteurType.Restless },
  { id: 16, text: "I have trouble sticking with a task once the initial excitement wears off.", saboteur: SaboteurType.Restless },

  // Controller
  { id: 17, text: "I feel anxious when I am not in control of a situation.", saboteur: SaboteurType.Controller },
  { id: 18, text: "I push people to do things my way because I know it's the best way.", saboteur: SaboteurType.Controller },
];
