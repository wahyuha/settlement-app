'use client';

import styles from "./page.module.css";

import FileUploader from "@/components/FileUploader";
import Balance from "@/components/Balance";
import { useSettlementData } from "@/hooks/useSettlementData";

export default function Home() {
  const { balance, loading, error } = useSettlementData();

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Settlement Dashboard</h1>
        <p className={styles.subtitle}>Upload CSV files</p>
      </header>

      {/* Uploader section */}
      <div className={styles.container}>
        <div className={styles.topSection}>
          <FileUploader />

          <Balance balance={balance} loading={loading} />
        </div>

        {error && (
          <div className={styles.error}>
            Error loading data: {error}
          </div>
        )}
        
      </div>
    </main>
  );
}
