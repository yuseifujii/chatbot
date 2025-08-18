import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FormPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-center mb-8">申し込みフォーム</h1>
        <div>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSeK6IjTYXoYdUfRbpAmDxg-rgJxCEbpLySTAnsTqXXH_At5TA/viewform?usp=sharing&ouid=106111889620545617242"
            width="100%"
            height="1200"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
          >
            読み込んでいます…
          </iframe>
        </div>
      </main>
      <Footer />
    </>
  );
}
