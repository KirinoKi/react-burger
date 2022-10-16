import AppHeader from "../app-header/app-header";
import LoaderStyle from "./loader.module.css";

export default function Loader() {
  return (
    <div className={LoaderStyle.main}>
      <AppHeader />
      <div className={LoaderStyle.loading}>
        <p className="text text_type_main-large text_color_inactive">
          Загрузка<span className={LoaderStyle.dotFlashing}></span>
        </p>
      </div>
    </div>
  );
}
