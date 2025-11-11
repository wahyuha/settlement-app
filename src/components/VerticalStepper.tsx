import styles from '@/styles/VerticalStepper.module.css';

export type StepStatus = 'pending' | 'in_progress' | 'completed' | 'error';

export interface Step {
  label: string;
  status: StepStatus;
  description?: string;
  content?: React.ReactNode;
}

interface VerticalStepperProps {
  steps: Step[];
}

export function VerticalStepper({ steps }: VerticalStepperProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Settlement Process</h2>
      <div className={styles.stepper}>
        {steps.map((step, index) => (
          <div key={index} className={styles.step}>
            <div className={styles.stepIndicator}>
              <div className={`${styles.stepCircle} ${styles[step.status]}`}>
                {step.status === 'completed' && <span>✅</span>}
                {step.status === 'error' && (<span>❌</span>)}
                {step.status === 'in_progress' && (<span>⏳</span>)}
                {step.status === 'pending' && (<span className={styles.stepNumber}>{index + 1}</span>)}
              </div>
            </div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepLabel}>{step.label}</h3>
              {step.description && (
                <p className={styles.stepDescription}>{step.description}</p>
              )}
              {step.content && (
                <div className={styles.stepExtraContent}>{step.content}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
