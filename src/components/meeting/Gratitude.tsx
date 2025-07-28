import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useMeetingStore } from "@/stores/meetingStore";
import { Button } from "@/components/ui/button";
import styles from "./Gratitude.module.scss";

export function Gratitude() {
  const navigate = useNavigate();
  const { currentMeeting, updateMeeting } = useMeetingStore();
  const [gratitude1, setGratitude1] = useState("");
  const [gratitude2, setGratitude2] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const handleComplete = () => {
    if (currentMeeting) {
      updateMeeting(currentMeeting.id, {
        gratitude1,
        gratitude2,
      });
    }

    // Show confetti animation
    setShowConfetti(true);

    setTimeout(() => {
      navigate("/meeting/summary");
    }, 2000);
  };

  useEffect(() => {
    if (showConfetti) {
      // Create confetti elements
      const confettiCount = 50;
      const container = document.getElementById("confetti-container");

      if (container) {
        for (let i = 0; i < confettiCount; i++) {
          const confetti = document.createElement("div");
          confetti.className = styles.confetti;
          confetti.style.left = Math.random() * 100 + "%";
          confetti.style.animationDelay = Math.random() * 3 + "s";
          confetti.style.backgroundColor = [
            "var(--lilac)",
            "var(--teal)",
            "var(--yellow)",
          ][Math.floor(Math.random() * 3)];
          container.appendChild(confetti);
        }

        // Clean up after animation
        setTimeout(() => {
          container.innerHTML = "";
        }, 4000);
      }
    }
  }, [showConfetti]);

  return (
    <div className={styles.page}>
      <div id="confetti-container" className={styles.confettiContainer} />

      <header className={styles.header}>
        <div className={styles.heartIcon}>
          <Heart size={48} fill="var(--lilac)" color="var(--lilac)" />
        </div>
        <h1 className={styles.title}>Gratitude</h1>
        <p className={styles.subtitle}>
          Share what you appreciate about each other
        </p>
      </header>

      <div className={styles.gratitudeCards}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Partner 1 → Partner 2</h3>
          <p className={styles.prompt}>
            What do you appreciate about your partner?
          </p>
          <textarea
            value={gratitude1}
            onChange={(e) => setGratitude1(e.target.value)}
            placeholder="I appreciate..."
            className={styles.textarea}
          />
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Partner 2 → Partner 1</h3>
          <p className={styles.prompt}>
            What do you appreciate about your partner?
          </p>
          <textarea
            value={gratitude2}
            onChange={(e) => setGratitude2(e.target.value)}
            placeholder="I appreciate..."
            className={styles.textarea}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleComplete}
          className={styles.completeButton}
        >
          <Heart size={20} />
          Share Gratitude
        </Button>
      </div>
    </div>
  );
}
