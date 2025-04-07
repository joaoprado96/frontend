import { Carousel } from "@/components/organisms/organisms/Carousel";
import { Navbar } from "@/components/organisms/organisms/Navigation/Navbar";
import { ScrollCarousel } from "@/components/organisms/organisms/ScrollCarousel";
import beberedancar from '@/assets/categorias/beberedancar.png';
import primeiroencontro from '@/assets/categorias/primeiroencontro.png';

export function Estabelecimentos() {

    const imagensTipoEvento = {
        "beber e dançar": "icons/beberedancar.png",
        "primeiro encontro": "icons/primeiroencontro.png",
        "conversar": "icons/conversar.png",
        "lugar romântico": "icons/romantico.png",
        "rolê de amigos": "icons/reuniao.png",
        "encontro familiar": "icons/familiar.png",
        "aniversário": "icons/aniversario.png",
        "happy hour": "icons/happyhour.png",
        "assistir jogos": "icons/jogos.png",
        "casas noturnas": "icons/balada.png",
        "experiência gastronômica": "icons/experiencia.png",
        "cabaré/boates": "icons/cabare.png",
        "música ao vivo": "icons/musica.png",
        "karaokês": "icons/karaoke.png",
        "LGBTQIA+": "icons/lgbtqia.png",
        "temáticos": "icons/tematicos.png",
        "sair sozinho/a": "icons/sairsozinha.png",
        "rolê geek": "icons/geek.png",
        "brunches": "icons/brunches-1.png",
        "para crianças": "icons/kids.png"
    };

    const categorias = [
        {
            src: beberedancar,
            title: 'beber e dançar',
            onClick: () => console.log('1'),
        },
        {
            src: primeiroencontro,
            title: 'Primeiro Encontro',
            onClick: () => console.log('2'),
        }
    ];

    return (
        <>
            <Navbar />

            <ScrollCarousel items={categorias} />
        </>
    )
}