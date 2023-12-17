import React from 'react'
import styles from './page.module.css'
import HungryButton from '@/components/HungryButton/HungryButton'

export default function About() {
    return (
        <div className={styles.about}>
            <div className={styles.about__container}>
                <div className={styles.header}>
                    Who&apos;s Hungry?
                </div>
                <p className={styles.paragraph}>Have you ever been indecisive about where to eat? Fear no more!
                    SpeedEats is here to remove any hesitancies about where to go.
                    Simply click the big blue button on the home page and enjoy a delectable meal.
                </p>
                <HungryButton />
            </div>

        </div>
    )
}
