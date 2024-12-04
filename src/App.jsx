import Header from "./components/Header/Header"
import NewsGallery from "./components/NewsGallery/NewsGallery"
import NewsList from "./components/NewsList/NewsList"
import Navigation from "./components/Navigation/Navigation"

function App() {
	return (
		<>
			<div className="container">
				<Header />	
			</div>
			<NewsGallery />
			<div className="container">
				<NewsList />
			</div>
			<Navigation />
		</>
		
	)
}

export default App
