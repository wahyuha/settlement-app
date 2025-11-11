export type StepStatus = 'pending' | 'in_progress' | 'completed' | 'error';

export interface Step {
  label: string;
  status: StepStatus;
  description?: string;
}
