import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './ui/command';
import {
  Home,
  FileText,
  BarChart3,
  Upload,
  BookOpen,
  Scale,
  FlaskConical,
  Search,
} from 'lucide-react';

const pages = [
  { name: 'Home', path: '/', icon: Home, keywords: ['landing', 'main'] },
  { name: 'Methodology', path: '/methodology', icon: FlaskConical, keywords: ['framework', 'scoring', 'dimensions', 'rubric', 'theory'] },
  { name: 'Prompts', path: '/prompts', icon: FileText, keywords: ['benchmark', 'test', 'questions', 'browse'] },
  { name: 'Leaderboard', path: '/leaderboard', icon: BarChart3, keywords: ['ranking', 'scores', 'models', 'comparison'] },
  { name: 'Submit Results', path: '/submit', icon: Upload, keywords: ['contribute', 'upload', 'evaluation'] },
  { name: 'Resources', path: '/resources', icon: BookOpen, keywords: ['download', 'template', 'guide', 'citation', 'faq'] },
  { name: 'License', path: '/license', icon: Scale, keywords: ['terms', 'usage', 'rights'] },
];

const quickActions = [
  { name: 'Copy Prompt 1.1 (HR)', action: 'copy-1.1', keywords: ['performance', 'review', 'leave'] },
  { name: 'Copy Prompt 1.2 (Product)', action: 'copy-1.2', keywords: ['pregnancy', 'notifications', 'app'] },
  { name: 'Copy Prompt 2.1 (Healthcare)', action: 'copy-2.1', keywords: ['session', 'timeout', 'portal'] },
];

import { prompts } from '../data/prompts';
import { copyToClipboard } from '../utils/clipboard';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = useCallback(
    (value: string) => {
      setOpen(false);
      if (value.startsWith('/')) {
        navigate(value);
      } else if (value.startsWith('copy-')) {
        const id = value.replace('copy-', '');
        const prompt = prompts.find((p) => p.id === id);
        if (prompt) {
          copyToClipboard(prompt.promptText);
        }
      }
    },
    [navigate]
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/50 text-sm text-slate-grey hover:bg-warm-grey hover:border-border transition-all"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="text-xs">Search</span>
        <kbd className="ml-2 pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-0.5 rounded border border-border/50 bg-warm-grey px-1.5 text-[10px] text-slate-grey">
          <span>⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Jump to page, copy a prompt..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {pages.map((page) => (
              <CommandItem
                key={page.path}
                value={`${page.name} ${page.keywords.join(' ')}`}
                onSelect={() => handleSelect(page.path)}
              >
                <page.icon className="mr-2 h-4 w-4 text-slate-grey" />
                {page.name}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Quick Copy Prompts">
            {quickActions.map((action) => (
              <CommandItem
                key={action.action}
                value={`${action.name} ${action.keywords.join(' ')}`}
                onSelect={() => handleSelect(action.action)}
              >
                <FileText className="mr-2 h-4 w-4 text-primary" />
                {action.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}