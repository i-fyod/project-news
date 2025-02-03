import Main from "./pages/Main/Main"
import Profile from "./pages/Profile/Profile"
import Navigation from "./components/Navigation/Navigation"
import { useState } from "react"

function App() {
	const [page, setPage] = useState<"main" | "saved" | "profile">("main");

	return (
		<>
			{page === "main" ? <Main /> : page === "saved" ? "" : <Profile />}
			<Navigation page={page} setPage={setPage}/>
		</>
	)
}

export default App
