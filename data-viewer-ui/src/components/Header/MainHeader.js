import { useContext } from "react";
import classes from "./MainHeader.module.css";
import AuthContext from "../../store/auth-context";
import { Link } from "react-router-dom";


const MainHeader = () => {

	const context = useContext(AuthContext);

	return (
		<header className={classes.header}>
			<h1>Data Viewer</h1>
			{context.isLoggedIn && (
				<Link to="/login">
					<button onClick={context.onLogout}>Logout</button>
				</Link>
			)}		
		</header>
	);
}

export default MainHeader;
