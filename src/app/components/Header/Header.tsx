import Link from "next/link";

export default function Header(props: { currentPage: string }){
    return(
        <header className="flex w-screen h-32 bg-slate-900 top-0 left-0 fixed">
            <div className="flex flex-row justify-center items-center h-full w-full">
            <Link
                    className={`border-2 ${
                        props.currentPage === 'Usuarios' ? "bg-cyan-950" : "bg-cyan-900"
                    } border-cyan-900 p-3 rounded-s-lg m-5 text-white hover:bg-cyan-950 ease-out transition-all`}
                    href="/Usuario"
                >
                    Usuarios
                </Link>
                <Link
                    className={`border-2 ${
                        props.currentPage === 'Home' ? "bg-cyan-950" : "bg-cyan-900"
                    } border-cyan-900 p-3 rounded-s-lg m-5 text-white hover:bg-cyan-950 ease-out transition-all`}
                    href="/"
                >
                    Home
                </Link>
            </div>
        </header>
    )
}