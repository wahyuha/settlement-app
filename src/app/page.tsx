import styles from "./page.module.css";

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
          <div className={styles.containerUploader}>
            <div className={styles.uploadArea}>
              <input
                type="file"
                accept=".csv"
                className={styles.fileInput}
              />
              <button
                className={styles.uploadButton}
              >
                Choose CSV File
              </button>
            </div>
          </div>

          <div className={styles.containerBalance}>
            <h2 className={styles.titleBalance}>Balance</h2>
            <div className={styles.balanceValue}>
              Rp 10.000.000
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
