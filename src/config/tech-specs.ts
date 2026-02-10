import {
  Sparkles,
  CircleDollarSign,
  Clapperboard,
  Wand2,
  Terminal,
  Rocket,
  BookOpen,
  Mail,
  HardDrive,
  type LucideIcon,
} from "lucide-react";

export interface TechSpec {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const TECH_SPECS: TechSpec[] = [
  {
    title: "Aplikacja Gemini",
    description:
      "Zyskaj większy dostęp do naszego najinteligentniejszego modelu 3 Pro, funkcji Deep Research i generowania obrazów za pomocą Nano Banana Pro, a także odblokuj generowanie filmów za pomocą Veo 3.1 Fast.",
    icon: Sparkles,
  },
  {
    title: "1000 punktów miesięcznie do wydania na AI",
    description:
      "Środki do wykorzystania na generowanie filmów w usługach Flow i Whisk.",
    icon: CircleDollarSign,
  },
  {
    title: "Flow",
    description:
      "Wyższy poziom dostępu w naszym narzędziu AI do tworzenia filmów umożliwiającym tworzenie scen filmowych i historii, w tym ograniczony dostęp do Veo 3.1.",
    icon: Clapperboard,
  },
  {
    title: "Whisk",
    description:
      "Większy dostęp do tworzenia filmów na podstawie obrazów za pomocą Veo 3.",
    icon: Wand2,
  },
  {
    title: "Gemini Code Assist i interfejs wiersza poleceń Gemini",
    description:
      "Wyższe dzienne limity żądań w interfejsie wiersza poleceń Gemini i rozszerzeniach IDE Gemini Code Assist.",
    icon: Terminal,
  },
  {
    title: "Google Antigravity",
    description:
      "Wyższe limity liczby żądań dla modelu agenta w Google Antigravity, naszej opartej na agentach platformie dla programistów.",
    icon: Rocket,
  },
  {
    title: "NotebookLM",
    description:
      "Asystent, który pomaga w zbieraniu informacji i pisaniu, z 5 razy większą liczbą podsumowań audio, notatek i innych funkcji.",
    icon: BookOpen,
  },
  {
    title: "Gemini w Gmailu, Dokumentach, Vids i innych usługach",
    description:
      "Możliwość korzystania z Gemini bezpośrednio w aplikacjach Google.",
    icon: Mail,
  },
  {
    title: "Miejsce na dane",
    description:
      "Łącznie 2 TB miejsca na dane w Zdjęciach Google, na Dysku i w Gmailu.",
    icon: HardDrive,
  },
];
