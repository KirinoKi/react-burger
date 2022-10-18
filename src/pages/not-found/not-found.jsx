import { Link } from 'react-router-dom';
import styles from "./not-found.module.css";
import notFoundImage from "../../images/404.png";
export function NotFound() {

  return (
    <div className={styles.conatiner}>
      <img src={notFoundImage} alt="404" />
        <Link className={`text text_type_main-default text_color_inactive ${styles.link}`} to="/">
          Вернуться на главную страницу
        </Link>
      </div>
  );
}
