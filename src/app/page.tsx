import indexTexts from '@/content/index'

export default function Home() {
  return (
    <>
       <nav
            className="lg:w-[80%] sm:w-[85%] w-full h-14 flex justify-between items-center fixed top-0 backdrop-blur-sm px-5"
        >
            <ul className="flex flex-row gap-5">
                <li
                    className="hover:translate-y-1 hover:font-semibold transition-all text-sm md:text-base"
                >
                    <a href="#politicas">Política de privacidad</a>
                </li>
                <li
                    className="hover:translate-y-1 hover:font-semibold transition-all text-sm md:text-base"
                >
                    <a href="#terminos">Términos y condiciones</a>
                </li>
            </ul>
            <a
                href="/auth/login"
                className="p-2 rounded shadow bg-[#FF7A00] text-white font-semibold transition-all hover:-translate-y-1"
                >Iniciar Sesión</a
            >
        </nav>
        <div className="w-full flex justify-center h-full min-h-[100vh]">
            <div
                className="lg:w-[80%] sm:w-[85%] w-full h-full min-h-[100vh] flex justify-center items-center my-20 md:my-15"
            >
                <div className="w-full h-auto">
                    <div className="w-full flex flex-row gap-2 lg:px-10 px-2">
                        <div className="flex flex-col gap-2 w-full">
                            <h1 className="font-bold text-2xl text-[#FF7A00]">
                                {indexTexts.TITLE_HOME}<span
                                    className="hover:animate-spin">👋</span
                                >
                            </h1>
                            {
                                indexTexts.CONTENT_HOME.map((t, index) => (
                                    <p key={index}>{t.text}</p>
                                ))
                            }
                            <strong
                                >{indexTexts.STRONG_TEXT_CONTENT_HOME}</strong
                            >
                            <div
                                className="w-full flex flex-row flex-wrap justify-center items-center gap-5"
                            >
                                {
                                    indexTexts.TEXT_CONTENT_CARDS.map((t, index) => (
                                        <div className="w-full max-w-md p-6 grid gap-6 border-[0.2px] border-gray-300 shadow-md rounded-lg transition-all hover:-translate-y-1 hover:border-[#ff7a00]" key={index}>
                                            <div className="flex items-center gap-4">
                                                <div className="bg-[#FF7A00] rounded-md p-3 flex items-center justify-center">
                                                    <i
                                                        className={`${t.icon} text-white`}
                                                    />
                                                </div>
                                                <h4 className="text-2xl font-bold">
                                                    {t.title}
                                                </h4>
                                            </div>
                                            <p className="text-muted-foreground">
                                                {t.description}
                                            </p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            className="w-full flex justify-center h-full bg-[#FF7A00]"
            id="politicas"
        >
            <div
                className="lg:w-[65%] md:w-[75%] sm:w-[85%] w-full h-full flex justify-center items-center my-20"
            >
                <div className="w-full h-auto">
                    <div
                        className="flex flex-col gap-4 w-full text-white lg:px-10 px-2"
                    >
                        <h2 className="text-2xl font-bold text-center">
                            Política de privacidad
                        </h2>
                        <div className="flex flex-col gap-3">
                            {
                                indexTexts.PRIVACY_POLICY_CONTENT.map((p, index) => (
                                    <div className="flex flex-col gap-1" key={index}>
                                        <strong>{p.title}</strong>
                                        <p>{p.content}</p>
                                        {p.subtext &&
                                            p.subtext.map((t, keyIndex) => <p  key={keyIndex}>{t}</p>)}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            className="w-full flex flex-col items-center justify-center h-full"
            id="terminos"
        >
            <div
                className="lg:w-[65%] md:w-[75%] sm:w-[85%] w-full h-full flex justify-center items-center my-20"
            >
                <div className="w-full h-auto">
                    <div className="flex flex-col gap-4 w-full lg:px-10 px-2">
                        <h2 className="text-2xl font-bold text-center">
                            {indexTexts.TERMS_AND_CONDITIONS_TITLE}
                        </h2>
                        <div className="flex flex-col gap-3">
                            {
                                indexTexts.TERMS_AND_CONDITIONS_CONTENT &&
                                    indexTexts.TERMS_AND_CONDITIONS_CONTENT.map(
                                        (t, index) => (
                                            <div className="flex flex-col gap-1" key={index}>
                                                <strong>{t.title}</strong>
                                                {t.subtext.map((sub, keyIndex) => (
                                                    <p key={keyIndex}>{sub}</p>
                                                ))}
                                            </div>
                                        )
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <footer
                className="w-full flex justify-center items-center shadow-lg h-10"
            >
                <p className="text-center font-bold text-[10px] md:text-base">
                    Copyright © 2024 Naranja Erp. Todos los derechos
                    reservados. <span
                        className="hover:-translate-y-1 hover:scale-105 transition-all"
                        ><a href="#politicas" className="text-[#FF7A00]"
                            >Política de privacidad</a
                        ></span
                    >
                </p>
            </footer>
        </div>
    </>
  );
}
