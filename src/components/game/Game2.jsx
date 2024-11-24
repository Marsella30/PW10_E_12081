import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './Game2.css';
import { FaFirefox } from 'react-icons/fa';

function Game2() {
    const wordCategories = {
        Hewan: [
            'kucing', 'singa', 'gajah', 'ular', 'elang', 
            'harimau', 'burung', 'kambing', 'ikan', 'ayam', 
            'kerbau', 'serigala', 'panda', 'kuda', 'domba', 
            'bebek', 'rusa', 'badak', 'cicak', 'lumba-lumba'
        ],
        Buah: [
            'apel', 'mangga', 'jeruk', 'pisang', 'anggur', 
            'nanas', 'kelapa', 'semangka', 'melon', 'durian', 
            'salak', 'jambu', 'cerry', 'lemon', 'rambutan', 
            'pepaya', 'stroberi', 'sirsak', 'belimbing', 'kiwi'
        ],
        Benda: [
            'meja', 'kursi', 'buku', 'televisi', 'jam', 
            'komputer', 'lampu', 'telepon', 'piring', 'sendok', 
            'gelas', 'tas', 'payung', 'sepatu', 'topi', 
            'kipas', 'lemari', 'kursi roda', 'sofa', 'bantal'
        ],
        Warna: [
            'merah', 'biru', 'kuning', 'hijau', 'ungu', 
            'putih', 'hitam', 'cokelat', 'jingga', 'abu-abu', 
            'emas', 'perak', 'navy', 'turquoise', 'peach', 
            'marun', 'lime', 'lavender', 'teal', 'cream'
        ],
        Negara: [
            'indonesia', 'jepang', 'korea', 'china', 'india', 
            'amerika', 'kanada', 'australia', 'brazil', 'argentina', 
            'italia', 'perancis', 'jerman', 'rusia', 'spanyol', 
            'portugal', 'mesir', 'afrika', 'thailand', 'vietnam'
        ],
    };
    
    const categories = Object.keys(wordCategories);
    const getRandomCategory = () => categories[Math.floor(Math.random() * categories.length)];

    const getRandomWord = (category) =>
        wordCategories[category][
            Math.floor(Math.random() * wordCategories[category].length)
        ];

    const [currentCategory, setCurrentCategory] = useState(getRandomCategory());
    const [selectedWord, setSelectedWord] = useState(
        getRandomWord(currentCategory)
    );
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [attempts, setAttempts] = useState(5);
    const [gameOver, setGameOver] = useState(false);
    const [isWin, setIsWin] = useState(false);

    const displayWord = selectedWord
        .split('')
        .map((letter) =>
            guessedLetters.includes(letter) ? letter : '_'
        )
        .join(' ');

    const successSound = new Audio("/success.mp3");
    const winSound = new Audio("/win.mp3");
    const errorSound = new Audio("/error.mp3");
    const loseSound = new Audio("/lose.mp3");

    const handleGuess = (letter) => {
        if (gameOver) return;

        if (guessedLetters.includes(letter)) {
            toast.info(`Anda sudah menebak huruf "${letter}"!`, {
                position: toast.TOP_RIGHT,
                theme: 'dark',
            });
            return;
        }

        setGuessedLetters((prev) => [...prev, letter]);

        if (selectedWord.includes(letter)) {
            successSound.play();
            toast.success(`Huruf "${letter}" benar!`, {
                position: toast.TOP_RIGHT,
                theme: 'dark',
            });

            if (selectedWord.split('').every((l) => guessedLetters.includes(l) || l === letter)) {
                setIsWin(true);
                setGameOver(true);
                winSound.play();
                toast.success('🏆 🎉 Anda Menang!', {
                    position: toast.TOP_RIGHT,
                    theme: 'dark',
                });
            }
        } else {
            errorSound.play();
            setAttempts((prev) => prev - 1);
            toast.error(`Huruf "${letter}" salah!`, {
                position: toast.TOP_RIGHT,
                theme: 'dark',
            });
            if (attempts - 1 === 0) {
                setGameOver(true);
                setIsWin(false);
                loseSound.play();
                toast.error('🥲 💔 Game Over!', {
                    position: toast.TOP_RIGHT,
                    theme: 'dark',
                });
            }
        }
    };

    const resetGame = () => {
        const newCategory = getRandomCategory();
        setCurrentCategory(newCategory);
        setSelectedWord(getRandomWord(newCategory));
        setGuessedLetters([]);
        setAttempts(5);
        setGameOver(false);
        setIsWin(false);
    };

    return (
        <div className="game2-container">
            <div className="bubbles">
                {Array.from({ length: 30 }).map((_, i) => (
                    <div
                        key={i}
                        className="bubble"
                        style={{ left: `${Math.random() * 100}%`, '--i': i }}
                    ></div>
                ))}
            </div>

            <h1 className="game2-title">
                <FaFirefox style={{ color: 'orange', marginRight: '10px' }} />
                Tantangan Tebak Kata Seru!
                <FaFirefox style={{ color: 'orange', marginRight: '10px' }} />
            </h1>
            <p className="game2-description">
                Selamat datang di arena <strong>Tebak Kata</strong>! Bisakah kamu menaklukkan kategori misterius ini: 
                <strong> {currentCategory.toUpperCase()} </strong>
            </p>

            <div className="game2-batas">
                <div className="guess-container">
                    <div className="word-display">
                        {selectedWord.split('').map((letter, idx) => (
                            <span key={idx}>
                                {guessedLetters.includes(letter) ? letter : ''}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="keyboard-container">
                    <div className="keyboard">
                        {'abcdefghijklmnopqrstuvwxyz'.split('').map((letter) => (
                            <button
                                key={letter}
                                className="keyboard-button"
                                onClick={() => handleGuess(letter)}
                                disabled={guessedLetters.includes(letter) || gameOver}
                            >
                                {letter}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="game2-info" >
                <p>Kesempatan Tersisa: {attempts}</p>
                {gameOver && (
                    <div className="container">
                        <button className="reset-button" onClick={resetGame}>
                            Main Lagi
                        </button>
                    </div>
                )}
            </div>
        </div>
            
    );
}

export default Game2;