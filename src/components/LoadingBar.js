// Footer.js
import BounceLoader from "react-spinners/BounceLoader"

const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "75vh",
    },
};

function LoadingBar() {
    return (
        <div style={styles.container}>
            <BounceLoader
                color="#ac64be"
                size = {150}
            />
        </div>
    );
}

export default LoadingBar;
