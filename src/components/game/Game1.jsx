import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Dice6, TargetIcon, TimerReset, ArrowUp, ArrowDown } from 'lucide-react';
import './Game1.css';

function Game1() {
    const [guess, setGuess] = useState('Invalid');
    const [attempts, setAttempts] = useState(4);
    const [circles, setCircles] = useState([true, true, true, true]);
    const [randomNumber, setRandomNumber] = useState(
        Math.floor(Math.random() * 10) + 1
    );
    const [message, setMessage] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [isWin, setIsWin] = useState(false);

    const handleGuess = () => {
        if(!guess || isNaN(guess) || guess < 1 || guess > 10){
            toast.warn('Masukkan angka antara 1  dan 10', {
                position: toast.TOP_RIGHT,
                theme: 'dark',
            });
            return;
        }

        const userGuess = parseInt(guess);

        if(userGuess == randomNumber) {
            if(!isWin){
                toast.success('🏆 🎉 Berhasil menebak angka!', {
                    position: toast.TOP_RIGHT,
                    theme: 'dark',
                });
                setIsWin(true);
            }else{
                toast.success('🏆 🎉 Sudah Berhasil menebak angka!', {
                    position: toast.TOP_RIGHT,
                    theme: 'dark',
                });
            }
        }else{
            const newCircles = [...circles];
            newCircles[4 - attempts] = false;
            setCircles(newCircles);
            setAttempts(attempts - 1);

            if(attempts - 1 === 0){
                toast.error('🥲 💔 Gagal menebak angka!', {
                    position: toast.TOP_RIGHT,
                    theme: 'dark',
                });
                setGameOver(true);
                setIsWin(false);
            }else{
                setMessage(
                    userGuess < randomNumber
                        ? 'Terlalu rendah!'
                        : 'Terlalu tinggi!'
                );
            }
        }
    };

    const resetGame = () => {
        setGuess('');
        setAttempts(4);
        setCircles([true, true, true, true]);
        setRandomNumber(Math.floor(Math.random()*10)+1);
        setMessage('');
        setGameOver(false);
        setIsWin(false);
    }

    useEffect(() => {
        if(isWin) {
            console.log('Game selesai. Nomor acak: ', randomNumber);
        }
    }, [isWin, randomNumber]);
        
    return (
        <div className="game1-container">
            <div className="game1-header">
                <h1 className="game1-title">
                    <Dice6 size={20} color="#fff" style={{marginRight: '0.5rem'}} /> 
                        Tebak Angka
                </h1>
                <p className="game1-subtitle">Tebak angka dari 1 sampai 10 dalam 4 kesempatan</p>
            </div>

            <div className="input-section">
                <label className="input-label">
                    <TargetIcon size={18} color='#22d3ee' style={{marginRight: '0.5rem'}}/>
                        Masukkan Angka
                </label>

                <div className="circle-container">
                    {circles.map((isBlue, index) => (
                        <div
                            key={index}
                            className="circle"
                            style={{
                                backgroundColor: isBlue ? '#22d3ee' : '#ef4444',
                            }}
                        ></div>
                    ))}
                </div>

                {!gameOver ? (
                    <input
                        type="number"
                        className="custom-input1"
                        placeholder="1-10"
                        value={guess}
                        onChange={(e) => setGuess(e.target.value)}
                        disabled={isWin}
                    />
                ) : null}
                
                {!gameOver ? (
                    <button className="submit-button" onClick={handleGuess}>
                        <TargetIcon size={18} color='#fff' style={{marginRight: '0.5rem'}}/>
                            Tebak Angka
                    </button>
                ) : (
                    gameOver && !isWin && (
                        <button className={`retry-button ${isWin ? 'retry-win' : 'retry-lose'}`} onClick={resetGame}>
                            <TimerReset size={18} color='#fff' backgroundColor="#ef4444" style={{marginRight: '0.5rem'}}/>
                                Coba Lagi
                        </button>
                    )
                )}
            </div>

        <div className="message-container">
            {message && !gameOver && (
                <div className="message-box">
                    {message === "Terlalu rendah!" ? (
                        <ArrowDown size={18} color='#f87171' backgroundColor="#ef4444" style={{marginRight: '0.5rem'}}/>
                    ) : (
                        <ArrowUp size={18} color='#f87171' backgroundColor="#ef4444" style={{marginRight: '0.5rem'}}/>
                    )}
                        {message}
                </div>
            )}
            <p className="message-attempts">kesempatan tersisa: {attempts}</p>
        </div>
    </div>
    );
}
export default Game1;