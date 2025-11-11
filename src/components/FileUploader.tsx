import { useRef } from 'react';
import styles from '@/styles/FileUploader.module.css';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  uploading: boolean;
  success: boolean;
  error: string | null;
}

export default function FileUploader({ onFileSelect, uploading, success, error }: FileUploaderProps) {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        alert('Please select a CSV file');
        e.target.value = '';
        return;
      }
			onFileSelect(file);
		}

		e.target.value = '';
	}

	const handleButtonClick = () => {
		fileInputRef.current?.click();
	}
  return (
    <div className={styles.container}>
			<div className={styles.uploadArea}>
				<input
					type="file"
					accept=".csv"
					className={styles.fileInput}
					ref={fileInputRef}
					onChange={handleFileChange}
				/>
				<button
					className={styles.uploadButton}
					onClick={handleButtonClick}
					disabled={uploading}
				>
					{uploading ? 'Uploading...' : 'Choose CSV File'}
				</button>
			</div>

			{success && (
        <div className={styles.successMessage}>
          File uploaded successfully!
        </div>
      )}

      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}
		</div>
  );
}