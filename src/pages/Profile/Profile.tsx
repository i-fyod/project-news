import Header from "../../components/Header/Header";
import Switch from "../../components/Switch/Switch";
import styles from "./Profile.module.sass";

function Profile() {
    return (
        <div className={`container ${styles.profile}`}>
            <header className={styles.profile__header}>
                <Header size="big" title="Personal Profile" subTitle="Author & Writer" />
                <Switch />
            </header>
            <p className={styles.profile__description}>
                <svg
                    className={styles.profile__description_icon}
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000">
                    <g id="ic_fluent_text_description_24_filled" fill="#9397A0" fillRule="nonzero">
                        <path
                            d="M3,17 L15,17 C15.5522847,17 16,17.4477153 16,18 C16,18.5128358 15.6139598,18.9355072 15.1166211,18.9932723 L15,19 L3,19 C2.44771525,19 2,18.5522847 2,18 C2,17.4871642 2.38604019,17.0644928 2.88337887,17.0067277 L3,17 L15,17 L3,17 Z M3,13 L21,13 C21.5522847,13 22,13.4477153 22,14 C22,14.5128358 21.6139598,14.9355072 21.1166211,14.9932723 L21,15 L3,15 C2.44771525,15 2,14.5522847 2,14 C2,13.4871642 2.38604019,13.0644928 2.88337887,13.0067277 L3,13 L21,13 L3,13 Z M3,9 L21,9 C21.5522847,9 22,9.44771525 22,10 C22,10.5128358 21.6139598,10.9355072 21.1166211,10.9932723 L21,11 L3,11 C2.44771525,11 2,10.5522847 2,10 C2,9.48716416 2.38604019,9.06449284 2.88337887,9.00672773 L3,9 L21,9 L3,9 Z"
                            id="🎨-Color"></path>
                    </g>
                </svg>
                Every piece of chocolate I ever ate is getting back at me.. desserts are very
                revengeful..
            </p>
        </div>
    );
}

export default Profile;
