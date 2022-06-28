import styles from './Card.module.css'
const Card = () => {
    return (
        <>
            <div className={styles.cardContainer}>
                <div className={styles.cardTitle}>
                    <p>Planting Trees</p>
                </div>
                <div className={styles.cardContent}>
                    <p>this even will include planting trees at the university campus</p>
                </div>
                <div className={styles.dateContent}>
                    <p>

                    </p>
                </div>


            </div>
        </>
    )
}
export default Card;