'use client';

import styles from "./page.module.css";

import FileUploader from "@/components/FileUploader";
import Balance from "@/components/Balance";
import TransactionTable from "@/components/TransactionTable";
import { VerticalStepper } from '@/components/VerticalStepper';
import { useSettlementData } from "@/hooks/useSettlementData";
import { useFileUpload } from "@/hooks/useFileUpload";

export default function Home() {
  const { 
    balance,
    issues: {
      items: issuesData,
      pagination
    },
    loading,
    refetchIssues,
    refetchBalance,
    error
  } = useSettlementData();
  const {
    uploadFile,
    uploading,
    success: uploadSuccess,
    error: uploadError,
    steps
  } = useFileUpload();

  const handleFileSelect = async (file: File) => {
    try {
      await uploadFile(file);
      refetchBalance();
      refetchIssues();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Settlement Dashboard</h1>
        <p className={styles.subtitle}>Upload CSV files</p>
      </header>

      {/* Uploader section */}
      <div className={styles.container}>
        <div className={styles.topSection}>
          <FileUploader
            onFileSelect={handleFileSelect}
            uploading={uploading}
            success={uploadSuccess}
            error={uploadError} />

          <Balance balance={balance} loading={loading} />
        </div>

        {error && (
          <div className={styles.error}>
            Error loading data: {error}
          </div>
        )}
        
      {uploading && (
        <div className={styles.uploading}>
          Uploading...
        </div>
      )}

      {uploadSuccess && (
        <VerticalStepper steps={steps} />
      )}

      <TransactionTable
        issues={issuesData}
        pagination={pagination}
        loading={loading}
        onPaginationChange={(page: number, limit: number) => refetchIssues(page, limit)} />
      </div>

    </main>
  );
}
