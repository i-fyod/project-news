import styles from "./Image.module.sass"

const Image = ({image}) => {
    return (
        image ? <img src={image} alt="Изображение новости" className={styles.image} /> : null
    )
}

export default Image;