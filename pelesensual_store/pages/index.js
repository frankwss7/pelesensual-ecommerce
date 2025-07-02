import Head from 'next/head';
import ProductGrid from '../components/ProductGrid';

export default function Home() {
  return (
    <>
      <Head>
        <title>Pele Sensual - Moda Íntima</title>
        <meta name="description" content="Conforto, leveza e qualidade" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <header style={{ 
          textAlign: 'center', 
          padding: '40px 20px',
          background: 'linear-gradient(135deg, #c2185b, #e91e63)',
          color: 'white'
        }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
            Pele Sensual
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
            Conforto, leveza e qualidade
          </p>
        </header>

        <section style={{ minHeight: '80vh', background: '#f8f9fa' }}>
          <ProductGrid />
        </section>
      </main>
    </>
  );
}