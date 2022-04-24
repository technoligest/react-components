export type TConfettiId = 'app-wide-confetti' | 'modal-confetti';
import ConfettiGenerator from 'confetti-js';

export function renderConfetti(target: TConfettiId) {
  const confettiSettings = { target };
  const confetti = new ConfettiGenerator(confettiSettings);
  confetti.render();

  return () => confetti.clear();
}

export function clearConfetti(target: TConfettiId) {
  const confettiSettings = { target };
  const confetti = new ConfettiGenerator(confettiSettings);
  confetti.clear();
}
