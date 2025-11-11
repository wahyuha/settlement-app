'use client';

import { useCallback, useState } from 'react';
import { UploadResponse } from '@/types/transaction';
import type { Step } from '@/types/stepper';
import { useStepperStore } from '@/stores/stepper';

interface UseFileUploadResult {
  uploading: boolean;
  error: string | null;
  success: boolean;
  steps: Step[];
  uploadFile: (file: File) => Promise<void>;
  reset: () => void;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export function useFileUpload(): UseFileUploadResult {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { steps, updateStep } = useStepperStore();

  const uploadFile = async (file: File): Promise<void> => {
    setUploading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('file', file);

      updateStep(0, {
        status: 'in_progress',
        description: 'Uploading CSV file...',
      });

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        updateStep(0, {
          status: 'error',
          description: 'Uploading CSV file...',
        });
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json() as UploadResponse;
      setSuccess(true);

      // Step 1: Upload success
      updateStep(0, {
        status: 'completed',
        description: `File uploaded! Total rows: ${data.data}`,
      });

      // Step 2: Processing delay
      updateStep(1, {
        status: 'in_progress',
        description: 'Processing data...',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during upload');
    } finally {
      setUploading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    uploading,
    error,
    success,
    uploadFile,
    reset,
    steps,
  };
}
