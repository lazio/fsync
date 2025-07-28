import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw, Check } from "lucide-react";
import { useContentStore } from "@/stores/contentStore";
import { useMeetingStore } from "@/stores/meetingStore";
import { Button } from "@/components/ui/button";
import type { Prompt } from "@/types";
import styles from "./IceBreaker.module.scss";

export function IceBreaker() {
  const navigate = useNavigate();
  const { getActivePrompts } = useContentStore();
  const { setCurrentMeeting, addMeeting } = useMeetingStore();
  const [currentPrompt, setCurrentPrompt] = useState<Prompt | null>(null);
  const [usedPromptIds, setUsedPromptIds] = useState<string[]>([]);

  const selectRandomPrompt = () => {
    const activePrompts = getActivePrompts();
    const availablePrompts = activePrompts.filter(
      (p) => !usedPromptIds.includes(p.id),
    );

    if (availablePrompts.length === 0) {
      // Reset if all prompts have been used
      setUsedPromptIds([]);
      const randomIndex = Math.floor(Math.random() * activePrompts.length);
      setCurrentPrompt(activePrompts[randomIndex]);
      setUsedPromptIds([activePrompts[randomIndex].id]);
    } else {
      const randomIndex = Math.floor(Math.random() * availablePrompts.length);
      setCurrentPrompt(availablePrompts[randomIndex]);
      setUsedPromptIds([...usedPromptIds, availablePrompts[randomIndex].id]);
    }
  };

  useEffect(() => {
    selectRandomPrompt();

    // Create new meeting
    const meeting = {
      id: `meeting-${Date.now()}`,
      coupleId: "default-couple",
      startedAt: new Date(),
      cardIds: [],
    };
    addMeeting(meeting);
    setCurrentMeeting(meeting);
  }, []);

  const handleContinue = () => {
    if (currentPrompt) {
      setCurrentMeeting({
        id: `meeting-${Date.now()}`,
        coupleId: "default-couple",
        startedAt: new Date(),
        promptId: currentPrompt.id,
        cardIds: [],
      });
    }
    navigate("/meeting/check-in");
  };

  if (!currentPrompt) return null;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Ice Breaker</h1>
        <p className={styles.subtitle}>Start with something light</p>
      </header>

      <div className={styles.promptCard}>
        <p className={styles.promptText}>{currentPrompt.text}</p>
        {currentPrompt.category && (
          <span className={styles.category}>{currentPrompt.category}</span>
        )}
      </div>

      <div className={styles.actions}>
        <Button
          variant="ghost"
          onClick={selectRandomPrompt}
          className={styles.shuffleButton}
        >
          <RefreshCw size={20} />
          Different Prompt
        </Button>

        <Button variant="primary" size="lg" fullWidth onClick={handleContinue}>
          Done. Continue to Check-in
        </Button>
      </div>
    </div>
  );
}
