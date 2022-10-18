import preloaderStyles from "./preloader.module.css";

export function Preloader() {
  return (
    <div className={preloaderStyles.container}>
      <div className={preloaderStyles.loader}></div>
    </div>
  )
}
