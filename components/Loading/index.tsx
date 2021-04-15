import { CircularProgress } from "@material-ui/core";
import styles from "./Loading.module.scss";

export const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <CircularProgress />
    </div>
  );
};
