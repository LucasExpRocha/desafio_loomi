type ChatIAMessageType = 'user_message' | 'assistant_message' | 'ai_suggestion';

type ChatIAMessage = {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  type: ChatIAMessageType;
};

type ChatIAInsightItem = {
  id: string;
  type: string;
  category: string;
};

type ChatIAInsightsSection = {
  title: string;
  insights: ChatIAInsightItem[];
};

type ChatIAActionPriority = 'high' | 'medium' | 'low';

type ChatIAActionItem = {
  id: string;
  action: string;
  priority: ChatIAActionPriority;
};

type ChatIAFutureStepsSection = {
  title: string;
  actions: ChatIAActionItem[];
};

type ChatIAConversationAnalysis = {
  insights: ChatIAInsightsSection;
  futureSteps: ChatIAFutureStepsSection;
};

type ChatIA = {
  messages: ChatIAMessage[];
  iaSuggestion: string;
  conversationAnalysis: ChatIAConversationAnalysis;
};
