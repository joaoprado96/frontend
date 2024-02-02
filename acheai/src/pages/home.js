import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link'; // Importe o componente Link aqui
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <title>AcheAi</title>
        <link rel="icon" type="image/png" href="/icons/logo.png" />
      </Head>
      <div className="video-background">
        <video
          autoPlay
          loop
          muted
          style={{
            position: "fixed", // Use fixed para cobrir toda a tela, ou absolute dentro de um container específico
            width: "100%",
            left: "50%",
            top: "50%",
            height: "100%",
            objectFit: "cover",
            transform: "translate(-50%, -50%)",
            zIndex: "-1", // Garante que o vídeo fique atrás de todo conteúdo
          }}
          src="/image/propaganda.mp4"
        >
          Seu navegador não suporta o elemento de vídeo.
        </video>
      </div>
      <div className="pagehome">
        <div className="container-central" style={{position: 'relative', zIndex: 2}}> {/* Garanta que esteja acima do vídeo */}
            <Image
            src="/icons/logo.png" // Caminho para a sua imagem
            alt="Ache Aí" // Texto alternativo para acessibilidade
            width={300} // Largura da imagem
            height={200} // Altura da imagem
            objectFit="contain" // Esta propriedade é opcional, ajusta como a imagem se encaixa na caixa delimitadora
          />
          <h2 id="manchete" className="h2-titulo">Onde você quer ir hoje?</h2>
          <p className="p-titulo">O melhor da gastronomia e entretenimento em um só lugar.</p>
          <Link href="/estabelecimentos"><p className="b-titulo">Encontrar</p></Link>
        </div>
      </div>
    </>
  );
}