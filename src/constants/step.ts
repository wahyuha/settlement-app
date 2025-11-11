import { Step } from "@/types/stepper";

export const defaultSteps: Step[] = [
	{
		label: 'Upload CSV File',
		status: 'pending',
		description: 'Waiting for file upload...',
	},
	{
		label: 'Processing Data',
		status: 'pending',
		description: 'Preparing to process transactions...',
	},
	{
		label: 'Check for Issues',
		status: 'pending',
		description: 'Retrieving failed and pending transactions...',
	},
	{
		label: 'Complete Settlement',
		status: 'pending',
		description: 'Finalizing settlement process...',
	},
];