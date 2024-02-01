import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import Head from 'next/head';
import Link from 'next/link'; // Importe o componente Link aqui
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
    const [destaques, setDestaques] = useState([]);

    useEffect(() => {
        carregarFotos();
        // Outras lógicas que você precisa executar no carregamento
    }, []);

    const carregarFotos = async () => {
        try {
            const lugaresResponse = await fetch('https://application-backend.onrender.com/api/destaques/lugares');
            const lugares = await lugaresResponse.json();
            if (lugares && lugares.length > 0) {
                const randomIndex = Math.floor(Math.random() * lugares.length);
                const lugarIdSelecionado = lugares[randomIndex];

                const fotosResponse = await fetch(`https://application-backend.onrender.com/api/fotos-destaques/${lugarIdSelecionado}`);
                const fotos = await fotosResponse.json();
                setDestaques(fotos);
            } else {
                throw new Error('Nenhum lugar encontrado.');
            }
        } catch (error) {
            console.error('Erro ao carregar fotos:', error);
        }
    };

    const bufferToBase64 = (buf) => {
        var binstr = Array.prototype.map.call(buf, function (ch) {
            return String.fromCharCode(ch);
        }).join('');
        return btoa(binstr);
    };


    return (
        <>
            <Head>
                <title>AcheAi</title>
                <link rel="icon" type="image/png" href="/icons/logo.png" />
                <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css" />
            </Head>
            {/* Substitua pelo componente de Carrossel se necessário */}
            <div id="carouselNovidades" className="carousel-fullscreen"></div>

            <div className="page">
              {destaques.length > 0 && (
                  <Carousel>
                      {destaques.map((destaque, index) => (
                          <Carousel.Item key={index}>
                              <img
                                  className="d-block w-100"
                                  src={`data:${destaque.contentType};base64,${bufferToBase64(destaque.data.data)}`}
                                  alt={`Slide ${index}`}
                              />
                          </Carousel.Item>
                      ))}
                  </Carousel>
              )}
                <div className="container-central">
                    <img src="icons/logo.png" alt="Ache Aí" width="300" height="300" />
                    <h2 id="manchete" className="h2-titulo">Onde você quer ir hoje?</h2>
                    <br />
                    <p className="p-titulo">O melhor da gastronomia e entretenimento em um só lugar.</p>
                    <br />
                    <Link href="/estabelecimentos">
                        <p className="b-titulo">Encontrar</p>
                    </Link>
                </div>
            </div>
        </>
    );
}
