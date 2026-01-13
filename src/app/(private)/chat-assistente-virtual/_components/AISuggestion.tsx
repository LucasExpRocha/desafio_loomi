import { Bot } from "lucide-react";

interface AISuggestionProps {
  suggestion: string;
  timestamp: string;
  actions: ChatIAActionItem[];
}

export default function AISuggestion({ suggestion, timestamp, actions }: AISuggestionProps) {
  return (
    <div className="flex justify-end animate-fade-in">
      <div className="flex flex-col justify-end items-end">
        <div className="max-w-lg bg-[#E1F2FD]/20 px-3 py-2 rounded-2xl rounded-br-none border-2 border-white/20">
          <div className="flex items-center gap-2 font-montserrat font-semibold text-white/50 font-size-sm mb-1">
            <Bot className="w-4 h-4 " />
            <span>Sugestão da IA</span>
          </div>
          <p className="font-montserrat font-normal font-size-sm mb-2">
            {suggestion}
          </p>
          <div className="flex items-center justify-end gap-1 mt-2">
            <span className="font-montserrat font-normal text-xs">{timestamp}</span>
          </div>
        </div>
        <div className="flex flex-wrap justify-end gap-2 mt-2">
          {actions.map((action) => (
            <button
              key={action.id}
              className="bg-button-active text-sm py-3 px-5 rounded-full "
            >
              {action.action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
