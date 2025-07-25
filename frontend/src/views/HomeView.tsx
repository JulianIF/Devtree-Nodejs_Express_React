import Header from "../components/Header";
import SearchForm from "../components/SearchForm";


export default function HomeView()
{
    return(
        <>
        <Header/>
        
        <main className=" bg-gray-100 py-10 min-h-screen bg-no-repeat bg-right-top lg:bg-homepage-bg lg:bg-home-xl">
            <div className=" max-w-xl mx-auto mt-10">
                <div className="lg:w-1/2 px-10 lg:p-0 space-y-6">
                    <h1 className="text-6xl font-black">
                        All your <span className=" text-cyan-400">Social Networks </span> in a single Link
                    </h1>
                    <p className=" text-slate-800 text-xl"> Join multiple Developers already sharing their TikTok, Facebook, Github, YouTube and more</p>
                    <SearchForm/>
                </div>
            </div>
        </main>
        </>
    )
}