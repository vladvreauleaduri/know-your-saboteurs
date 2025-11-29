
export enum SaboteurType {
  Judge = 'Judge',
  Stickler = 'Stickler',
  Pleaser = 'Pleaser',
  HyperAchiever = 'Hyper-Achiever',
  Victim = 'Victim',
  HyperRational = 'Hyper-Rational',
  HyperVigilant = 'Hyper-Vigilant',
  Restless = 'Restless',
  Controller = 'Controller'
}

export interface Question {
  id: number;
  text: string;
  saboteur: SaboteurType;
}

export interface AssessmentResult {
  [key: string]: number;
}

export interface SaboteurInfo {
  type: SaboteurType;
  description: string;
  color: string;
  icon: string; // emoji char
  characteristics: string[];
  lies: string[];
}

export type Theme = 'light' | 'dark';
