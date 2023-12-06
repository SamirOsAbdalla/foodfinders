import styles from './page.module.css'
import Navbar from '@/components/Navbar/Navbar'
import MainPage from '@/components/MainPage/MainPage'

export default function Home() {
  return (
    <main className={styles.main}>
      <MainPage />
    </main>
  )
}
