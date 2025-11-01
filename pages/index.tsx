import React, { useEffect, useState } from "react";
import Head from "next/head";

interface Flower {
  name: string;
  message: string;
  emoji: string;
}

const Home: React.FC = () => {
  const [todayFlower, setTodayFlower] = useState<Flower | null>(null);
  const [showSecret, setShowSecret] = useState(false);
  const [missCount, setMissCount] = useState(0);
  const [nickname, setNickname] = useState("bestie");
  const [isCuckooPlaying, setIsCuckooPlaying] = useState(true);

  useEffect(() => {
    const pool: Flower[] = [
      { name: "Pink Peony", message: "You made my life softer in seconds.", emoji: "🌸" },
      { name: "Cherry Blossom", message: "I think of you even in tiny moments.", emoji: "🌺" },
      { name: "Garden Rose", message: "You became a necessity, not an option.", emoji: "🌹" },
      { name: "Tulip", message: "Distance can't stop me from missing you.", emoji: "🌷" },
      { name: "Camellia", message: "You are the sweetest constant I never knew I needed.", emoji: "🌼" },
    ];
    setTodayFlower(pool[Math.floor(Math.random() * pool.length)]);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("miss-count");
      const savedName = window.localStorage.getItem("gf-nickname");
      if (saved) setMissCount(Number(saved));
      if (savedName) setNickname(savedName);
    }
  }, []);

  const handleMissClick = () => {
    setMissCount((prev) => {
      const next = prev + 1;
      if (typeof window !== "undefined") {
        window.localStorage.setItem("miss-count", String(next));
      }
      return next;
    });
  };

  const handleNicknameChange = (value: string) => {
    setNickname(value);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("gf-nickname", value);
    }
  };

  return (
    <>
      <Head>
        <title>For my cutest flower</title>
      </Head>
      <main className="relative min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-pink-100 text-rose-900">
        {/* floating background flowers */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-30">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className={`absolute ${index % 2 === 0 ? "animate-bounce" : "animate-pulse"} text-4xl`}
              style={{
                top: `${(index * 10) % 90}%`,
                left: `${(index * 12) % 90}%`,
              }}
            >
              {index % 3 === 0 ? "🌸" : index % 3 === 1 ? "🌷" : "🌺"}
            </div>
          ))}
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-10 flex flex-col gap-8">
          <header className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-md p-6 flex flex-col gap-4">
            <p className="text-sm uppercase tracking-wide text-rose-400 font-semibold">Hey pretty flower</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-rose-900">You are very, very important to me.</h1>
            <p className="text-rose-700">
              In such a tiny span of time, you slipped into my days like sunshine and now I cannot imagine a day without you.
              You are cute, chaotic, kind, and absolutely the best in the world. This little page is just to remind you that I miss you a lot. 🌷
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <label className="flex items-center gap-2 bg-rose-50 rounded-full px-3 py-1">
                <span className="text-sm text-rose-500">Your name here:</span>
                <input
                  value={nickname}
                  onChange={(e) => handleNicknameChange(e.target.value)}
                  className="bg-transparent text-rose-800 font-semibold focus:outline-none placeholder:text-rose-300"
                  placeholder="my flower"
                />
              </label>
              {todayFlower ? (
                <div className="flex items-center gap-2 bg-rose-100 rounded-full px-3 py-1">
                  <span className="text-lg">{todayFlower.emoji}</span>
                  <span className="text-sm">
                    Today's bloom: <span className="font-semibold">{todayFlower.name}</span> — {todayFlower.message}
                  </span>
                </div>
              ) : null}
            </div>
          </header>

          {/* Surprise element */}
          <section className="bg-white/80 rounded-3xl shadow-md p-6 flex flex-col sm:flex-row gap-6 items-center">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-rose-900 mb-2 flex items-center gap-2">🌸 Secret Bloom just for you</h2>
              <p className="text-rose-700 mb-4">
                Tap the pink envelope to open a little garden letter from me. I promise it's soft and full of you.
              </p>
              <p className="text-sm text-rose-400">A cute surprise never hurts, right?</p>
            </div>
            <button
              onClick={() => setShowSecret((prev) => !prev)}
              className={`relative transition-all duration-300 rounded-2xl px-6 py-5 ${
                showSecret ? "bg-pink-100 shadow-inner" : "bg-gradient-to-b from-pink-400 to-rose-400 shadow-lg"
              } text-white flex flex-col items-center gap-2`}
            >
              <span className="text-3xl">{showSecret ? "💗" : "💌"}</span>
              <span className="text-sm font-semibold">{showSecret ? "Close it" : "Open it!"}</span>
            </button>
          </section>
          {showSecret && (
            <div className="bg-rose-50 border border-rose-100 rounded-3xl p-6 shadow-inner flex flex-col gap-3 animate-pulse">
              <p className="text-sm uppercase tracking-wide text-rose-400 font-semibold">my soft message</p>
              <p className="text-lg text-rose-900">
                {nickname ? nickname : "you"}, you became a necessity in my life in the most unexpected way. I miss you in the fun moments, in the
                quiet ones, and in every time I see something cute or flowery.
              </p>
              <p className="text-rose-700">
                Thank you for existing exactly the way you do — bubbly, lovely, and sunshine-level pretty. Please stay.
              </p>
              <p className="text-right text-rose-500 font-medium">— cutu:) , thinking of you 🌷</p>
            </div>
          )}

          {/* Miss Count Button */}
          <section className="bg-white/80 rounded-3xl shadow-md p-6 flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-rose-900 flex items-center gap-2">🌷 Miss counter</h2>
            <p className="text-rose-700">
              Every time you think of me (or I think of you), press this. Let's see how dramatic I am about missing you. Spoiler: very.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleMissClick}
                className="bg-gradient-to-r from-rose-400 to-pink-400 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition"
              >
                I miss her right now 💖
              </button>
              <div className="flex items-baseline gap-2 bg-rose-50 rounded-2xl px-4 py-3">
                <span className="text-4xl font-bold text-rose-500">{missCount}</span>
                <span className="text-rose-400 text-sm">times I missed you</span>
              </div>
            </div>
            <p className="text-xs text-rose-400">
              This number stays even if you close the tab. Because missing you doesn't go away that easily 🥺
            </p>
          </section>

          {/* Cuckoo Bird Section */}
          <section className="bg-white/80 rounded-3xl shadow-md p-6 flex flex-col gap-4 items-center text-center">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold text-rose-900">🐦 My cute cuckooooo!</h2>
              <button
                onClick={() => setIsCuckooPlaying((prev) => !prev)}
                className="text-xs bg-rose-100 text-rose-500 px-3 py-1 rounded-full font-medium"
              >
                {isCuckooPlaying ? "Pause" : "Make it sing"}
              </button>
            </div>
            <p className="text-rose-700">Because even the birds should know you are special.</p>
            <div className="relative flex items-center justify-center w-full">
              <div
                className={`flex items-center justify-center bg-gradient-to-b from-rose-200 to-pink-200 w-28 h-28 rounded-full shadow-inner border-4 border-pink-100 ${
                  isCuckooPlaying ? "animate-bounce" : ""
                }`}
              >
                <div className="bg-rose-500 w-10 h-10 rounded-full relative">
                  <div className="absolute -right-3 top-2 w-4 h-3 bg-yellow-200 rounded-tr-full rounded-br-full rotate-12" />
                  <div className="absolute -left-4 top-4 w-5 h-5 bg-rose-300 rounded-full animate-ping" />
                </div>
              </div>
              <div className="ml-6 flex flex-col items-start gap-2">
                <p className={`text-3xl font-extrabold text-rose-500 drop-shadow-sm ${isCuckooPlaying ? "animate-pulse" : ""}`}>
                  Cuckoooooooo!!
                </p>
                <p className="bg-rose-50 text-rose-500 rounded-full px-3 py-1 text-xs font-medium">
                  singing just for {nickname ? nickname : "you"} 💕
                </p>
              </div>
            </div>
          </section>

          <footer className="py-6 text-center text-rose-400 text-sm">
            Built with so much care, flowers, pink, and missing-you energy. 💖
          </footer>
        </div>
      </main>
    </>
  );
};

export default Home;
