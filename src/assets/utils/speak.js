export function speakGerman(word, onStart, onEnd) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "de-DE";
  utterance.rate = 0.9;

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;

  speechSynthesis.speak(utterance);
}

// import { useState } from "react";
// import { FaVolumeHigh } from "react-icons/fa6";



// // Внутри компонента:

// const [isSpeaking, setIsSpeaking] = useState(false);

// const handleSpeak = () => {
//   if (isSpeaking) return; // блокировка спама
//   speakGerman(currentCard.de, () => setIsSpeaking(true), () => setIsSpeaking(false));
// };

// return (
//   <button
//     onClick={handleSpeak}
//     title="Прослушать"
//     disabled={isSpeaking}
//     className={`image-flashcard-game__sound-btn ${isSpeaking ? "disabled" : ""}`}
//   >
//     <FaVolumeHigh className="image-flashcard-game__sound-icon" />
//   </button>
// );