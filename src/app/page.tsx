import styles from "./page.module.css";

import FileUploader from "@/components/FileUploader";
import Balance from "@/components/Balance";

export default function Home() {
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

          <Balance />
        </div>
      </div>
    </main>
  );
}
