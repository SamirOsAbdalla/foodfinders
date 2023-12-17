import React from 'react'
import styles from './page.module.css'

export default function About() {
    return (
        <div className={styles.faq}>
            <div className={styles.faq__container}>
                <div className={styles.faq__item}>
                    <div className={styles.faq__question}>1.  Why do I sometimes get TripAdvisor results?</div>
                    <p className={styles.faq__answer}> This web application handles API results
                        from both Yelp and TripAdvisor. Based on some internal logic that can vary
                        depending on certain factors, such as the current filters, if the user is
                        clicking the button too many times the app will then begin to fetch
                        results from TripAdvisor so as to avoid too many calls to the Yelp API. Be decisive
                        with your clicks. Just kidding, click with impunity!
                    </p>
                </div>
                <div className={styles.faq__item}>
                    <div className={styles.faq__question}>2. Why are the results not matching the filter(s) I chose?</div>
                    <p className={styles.faq__answer}> Unfortunately, this can happen when there are no results
                        that match a certain filter. The API can still fetch restaurants around you, however,
                        those restaurants may not contain the filters that you wanted. Charge it to the game,
                        and maybe try something new?
                    </p>
                </div>
                <div className={styles.faq__item}>
                    <div className={styles.faq__question}>3. Why is nothing happening when I click the big blue button?</div>
                    <p className={styles.faq__answer}> Make sure you have your location services enabled. The application can
                        only work if it has your location since it needs to be able to find restaurants around you.
                        <strong>*Liam Neeson voice*</strong> I will find you, and I will feed you.
                    </p>
                </div>

            </div>
        </div>
    )
}
