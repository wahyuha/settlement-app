// Stepper store

import { create } from 'zustand';
import { Step } from '@/types/stepper';
import { defaultSteps } from '@/constants/step';

interface StepperStore {
  steps: Step[];
  updateStep: (index: number, updates: Partial<Step>) => void;
}

export const useStepperStore = create<StepperStore>((set) => ({
  steps: defaultSteps,
  updateStep: (index: number, updates: Partial<Step>) => set((state) => ({ steps: state.steps.map((step, i) => i === index ? { ...step, ...updates } : step) })),
}));