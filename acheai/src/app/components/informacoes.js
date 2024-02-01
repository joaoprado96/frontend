import Head from 'next/head';

export default function Informacoes() {
    return (
        <>
            <Head>
                <title>AcheAi</title>
                <link rel="icon" type="image/png" href="/icons/logo.png" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
                <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css" />
                <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" />
            </Head>
            <div className="page3">
                <div className="quem-somos">
                    <div className="container-quem-somos">
                        <h2 className="mb-4" style={{ textAlign: "center" }}>🌟 Descubra o Universo AcheAí 🌟</h2>
                        <p>
                            Num mundo cheio de escolhas, a gente valoriza o seu tempo e seu dinheiro. Aqui no AcheAí, nosso compromisso é garantir que sua jornada seja simples, rápida e, o melhor de tudo, gratuita! Queremos conectar você aos lugares que realmente combinam com o que você procura, seja para saborear uma nova culinária, curtir um encontro descontraído ou até mesmo aqueles momentos de paz e sossego.
                        </p>
                        <p>
                            Em um piscar de olhos, te ajudamos a descobrir a experiência ideal, tornando a decisão muito mais fácil e os seus dias cheios de memórias marcantes. Vem com a gente explorar o prazer de escolher com estilo e autenticidade. Com AcheAí, cada escolha é uma nova aventura esperando por você!
                        </p>
                        <div className="tres-valores">
                            <div className="row">
                                <div className="col col-desktop-4">
                                    <img className="img-quem-somos" src="/icons/valor-1.png" alt="" />
                                    <p>Queremos criar</p>
                                    <h2>conexões...</h2>
                                </div>
                                <div className="col col-desktop-4">
                                    <img className="img-quem-somos" src="/icons/valor-2.png" alt="" />
                                    <p>A partir das nossas</p>
                                    <h2>necessidades...</h2>
                                </div>
                                <div className="col col-desktop-4">
                                    <img className="img-quem-somos" src="/icons/valor-3.png" alt="" />
                                    <p>E valorizamos nosso</p>
                                    <h2>tempo!</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
