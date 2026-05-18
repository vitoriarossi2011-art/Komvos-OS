import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  HelpCircle, 
  Bell, 
  LayoutDashboard, 
  Calendar, 
  Trello, 
  Rocket, 
  Landmark, 
  Network, 
  Contact, 
  Brain,
  CheckCircle2,
  Circle,
  Palette,
  Image as ImageIcon,
  Layout as LayoutIcon,
  X,
  Check,
  Megaphone,
  Code2,
  CloudSun,
  StickyNote,
  CalendarDays,
  Info,
  User,
  LogOut,
  Shield,
  CreditCard,
  Users,
  Layers,
  Building2,
  Briefcase,
  GitGraph,
  Lock,
  ChevronRight,
  BookOpen,
  MessageSquare,
  Send,
  Moon,
  Sun
} from 'lucide-react';

const WeatherWidget = () => (
  <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 shadow-lg p-6 flex items-center justify-between pointer-events-auto w-full h-full">
    <div className="flex flex-col">
      <span className="text-sm font-bold text-grafite-texto dark:text-slate-300 opacity-50 uppercase tracking-wider">São Paulo</span>
      <span className="text-4xl font-bold text-grafite-texto dark:text-slate-100">24°C</span>
      <span className="text-xs font-medium text-on-surface-variant opacity-70">Parcialmente Nublado</span>
    </div>
    <div className="p-4 bg-yellow-400/10 rounded-full">
      <CloudSun className="w-12 h-12 text-yellow-500" />
    </div>
  </div>
);

const NotepadWidget = () => {
  const [note, setNote] = useState('Minhas notas rápidas...\n\n- Preparar apresentação\n- Ligar para fornecedor');
  
  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 shadow-lg p-6 flex flex-col pointer-events-auto w-full h-full">
      <div className="flex items-center gap-2 mb-3">
        <StickyNote className="w-4 h-4 text-brand-purple" />
        <h3 className="text-sm font-bold text-grafite-texto dark:text-slate-100">Bloco de Notas</h3>
      </div>
      <textarea 
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium text-grafite-texto dark:text-slate-200 resize-none placeholder-gray-400"
        placeholder="Escreva algo..."
      />
    </div>
  );
};

const MiniCalendarWidget = () => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const today = new Date().getDate();
  
  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 shadow-lg p-6 flex flex-col pointer-events-auto w-full h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-brand-purple" />
          <h3 className="text-sm font-bold text-grafite-texto dark:text-slate-100">Outubro</h3>
        </div>
        <span className="text-[10px] font-bold opacity-40 dark:text-slate-400 uppercase">2024</span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
          <span key={`${d}-${i}`} className="text-[9px] font-bold text-grafite-texto dark:text-slate-500 opacity-30">{d}</span>
        ))}
        {days.map(day => (
          <span 
            key={day} 
            className={`text-xs font-medium py-1.5 rounded-lg transition-colors ${day === today ? 'bg-brand-purple text-white shadow-md' : 'text-grafite-texto dark:text-slate-300 hover:bg-white/40 dark:hover:bg-white/10'}`}
          >
            {day}
          </span>
        ))}
      </div>
    </div>
  );
};

const AnnouncementsWidget = () => {
  const announcements = [
    { id: 1, title: 'Nova Política de RH', time: '2h atrás', priority: 'Média' },
    { id: 2, title: 'Evento de Integração Q4', time: 'Ontem', priority: 'Alta' },
  ];

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 shadow-lg p-6 flex flex-col pointer-events-auto w-full h-full">
      <div className="flex items-center gap-2 mb-4">
        <Info className="w-4 h-4 text-red-500" />
        <h3 className="text-sm font-bold text-grafite-texto dark:text-slate-100">Comunicados</h3>
      </div>
      <div className="space-y-3">
        {announcements.map(a => (
          <div key={a.id} className="p-3 bg-white/40 dark:bg-white/5 rounded-xl border border-white/10 dark:border-white/5 hover:border-brand-purple/20 transition-all cursor-pointer">
            <h4 className="text-xs font-bold text-grafite-texto dark:text-slate-200">{a.title}</h4>
            <div className="flex justify-between items-center mt-2">
              <span className="text-[9px] text-on-surface-variant dark:text-slate-400 opacity-60 font-medium">{a.time}</span>
              <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${a.priority === 'Alta' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>{a.priority}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface DockItemProps {
  icon?: React.ReactNode;
  label?: string;
  active?: boolean;
  divider?: boolean;
}

interface InternalDockItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  key?: React.Key;
}

interface WidgetConfig {
  id: string;
  name: string;
  visible: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex?: number;
}

interface ShortcutConfig {
  id: string;
  name: string;
  icon: React.ReactNode;
  visible: boolean;
  x: number;
  y: number;
  zIndex?: number;
}

// --- Components ---

interface DraggableShortcutProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  zIndex?: number;
  onUpdate: (id: string, x: number, y: number) => void;
  onFocus: (id: string) => void;
  onClose: (id: string) => void;
  onClick: () => void;
  key?: React.Key;
}

const DraggableShortcut = ({
  id,
  name,
  icon,
  x,
  y,
  zIndex = 10,
  onUpdate,
  onFocus,
  onClose,
  onClick
}: DraggableShortcutProps) => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      onMouseDown={() => onFocus(id)}
      onDragStart={() => onFocus(id)}
      onDragEnd={(_, info) => {
        onUpdate(id, x + info.offset.x, y + info.offset.y);
      }}
      initial={{ opacity: 0, scale: 0.8, x, y }}
      animate={{ opacity: 1, scale: 1, x, y }}
      style={{ 
        position: 'absolute',
        zIndex,
        width: 80,
        height: 100
      }}
      className="group flex flex-col items-center justify-center gap-2 cursor-pointer p-2"
    >
      {/* Close Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onClose(id);
        }}
        className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-red-500 hover:text-white backdrop-blur-md p-1 rounded-full border border-white/20 shadow-sm z-20"
      >
        <X className="w-2.5 h-2.5" />
      </button>

      <div 
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className="w-16 h-16 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md rounded-2xl border border-white/30 dark:border-white/10 shadow-sm flex items-center justify-center group-hover:bg-white/60 dark:group-hover:bg-white/20 transition-all hover:scale-110 active:scale-95"
      >
        <div className="scale-110">
          {icon}
        </div>
      </div>
      <span className="text-[10px] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] text-center w-full truncate px-1">
        {name}
      </span>
    </motion.div>
  );
};

interface DraggableWidgetProps {
  children: React.ReactNode;
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex?: number;
  onUpdate: (id: string, updates: Partial<WidgetConfig>) => void;
  onFocus: (id: string) => void;
  onClose: (id: string) => void;
  key?: React.Key;
}

const DraggableWidget = ({ 
  children, 
  id, 
  x, 
  y, 
  width, 
  height, 
  zIndex = 10,
  onUpdate,
  onFocus,
  onClose
}: DraggableWidgetProps) => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      onMouseDown={() => onFocus(id)}
      onDragStart={() => onFocus(id)}
      onDragEnd={(_, info) => {
        onUpdate(id, { x: x + info.offset.x, y: y + info.offset.y });
      }}
      initial={{ opacity: 0, scale: 0.9, x, y }}
      animate={{ opacity: 1, scale: 1, x, y }}
      style={{ 
        width, 
        height, 
        position: 'absolute',
        zIndex
      }}
      className="group"
    >
      {/* Drag Handle */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing bg-white/50 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20">
        <div className="w-4 h-1 bg-grafite-texto/20 rounded-full" />
      </div>

      {/* Close Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onClose(id);
        }}
        className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-red-500 hover:text-white backdrop-blur-md p-1.5 rounded-full border border-white/20 shadow-sm z-20 group/close"
      >
        <X className="w-3 h-3" />
      </button>

      <div className="w-full h-full relative overflow-hidden flex flex-col">
        {children}
        
        {/* Resize Handle */}
        <div 
          className="absolute bottom-1 right-1 w-4 h-4 cursor-nwse-resize opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          onMouseDown={(e) => {
            e.stopPropagation();
            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = width;
            const startHeight = height;

            const onMouseMove = (moveEvent: MouseEvent) => {
              const deltaX = moveEvent.clientX - startX;
              const deltaY = moveEvent.clientY - startY;
              onUpdate(id, { 
                width: Math.max(200, startWidth + deltaX), 
                height: Math.max(150, startHeight + deltaY) 
              });
            };

            const onMouseUp = () => {
              document.removeEventListener('mousemove', onMouseMove);
              document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
          }}
        >
          <div className="w-1.5 h-1.5 border-r-2 border-b-2 border-grafite-texto/30 rounded-br-sm" />
        </div>
      </div>
    </motion.div>
  );
};

const Logo = () => (
  <div className="flex items-center gap-2 cursor-pointer group">
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:scale-110">
      <path d="M8 8C12 12 12 28 8 32M6 10C10 14 10 26 6 30M10 6C14 10 14 30 10 34" stroke="#9184A8" strokeWidth="0.5" strokeOpacity="0.4" />
      <path d="M14 10V30M14 20L24 10M14 20L24 30" stroke="#9184A8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="28" cy="20" r="2" fill="#9184A8" fillOpacity="0.5" />
    </svg>
    <div className="flex items-baseline">
      <span className="text-xl font-bold text-grafite-texto dark:text-slate-100 tracking-tight">Komvos</span>
      <span className="text-xl font-bold text-brand-purple tracking-tight">OS</span>
    </div>
  </div>
);

const TopBar = ({ 
  onOpenSettings, 
  onOpenProfile, 
  onOpenNotifications, 
  onOpenHelp,
  onToggleDarkMode,
  isDarkMode,
  isNotificationsOpen 
}: { 
  onOpenSettings: () => void, 
  onOpenProfile: () => void, 
  onOpenNotifications: () => void,
  onOpenHelp: () => void,
  onToggleDarkMode: () => void,
  isDarkMode: boolean,
  isNotificationsOpen: boolean
}) => (
  <header className="fixed top-0 left-0 right-0 bg-white/20 dark:bg-slate-900/20 backdrop-blur-xl border-b border-white/10 dark:border-white/5 z-50">
    <div className="flex justify-between items-center w-full px-8 py-2">
      <Logo />
      <div className="flex items-center gap-4">
        <IconButton onClick={onToggleDarkMode} icon={isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 opacity-70" />} />
        <IconButton onClick={onOpenSettings} icon={<Settings className="w-5 h-5 opacity-70" />} />
        <IconButton onClick={onOpenHelp} icon={<HelpCircle className="w-5 h-5 opacity-70" />} />
        <div className="relative">
          <IconButton 
            onClick={onOpenNotifications} 
            icon={<Bell className={`w-5 h-5 transition-colors ${isNotificationsOpen ? 'text-brand-purple' : 'opacity-70'}`} />} 
          />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-brand-purple rounded-full"></span>
          
          <AnimatePresence>
            {isNotificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full mt-4 -right-4 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl border border-black/5 dark:border-white/10 overflow-hidden z-[100]"
                style={{ transformOrigin: 'top right' }}
              >
                {/* Arrow */}
                <div className="absolute -top-2 right-6 w-4 h-4 bg-white dark:bg-slate-900 rotate-45 border-t border-l border-black/5 dark:border-white/10"></div>
                
                <NotificationsWindowContent />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div 
          onClick={onOpenProfile}
          className="h-8 w-8 bg-brand-purple/80 rounded-full flex items-center justify-center text-white text-xs font-semibold ml-2 cursor-pointer shadow-sm border border-white/20 hover:scale-105 transition-transform"
        >
          JS
        </div>
      </div>
    </div>
  </header>
);

const IconButton = ({ icon, onClick }: { icon: React.ReactNode, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className="p-2 text-grafite-texto dark:text-slate-200 hover:bg-white/10 dark:hover:bg-white/5 rounded-full transition-all duration-200 active:scale-90 flex items-center justify-center"
  >
    {icon}
  </button>
);

const ClockWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false });
  const formattedDate = time.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 shadow-lg p-6 flex flex-col items-center justify-center text-center pointer-events-auto w-full h-full">
      <span className="text-5xl font-bold text-grafite-texto dark:text-slate-100 tracking-tight">{formattedTime}</span>
      <span className="text-sm text-on-surface-variant dark:text-slate-400 mt-2 capitalize font-medium">{formattedDate}</span>
    </div>
  );
};

const TasksWidget = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Revisar e-mails da manhã', completed: false },
    { id: 2, text: 'Daily Squad Alpha', completed: true },
    { id: 3, text: 'Aprovar orçamento de mídia', completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 shadow-lg p-6 pointer-events-auto w-full h-full flex flex-col">
      <h3 className="text-sm font-bold text-grafite-texto dark:text-slate-100 mb-4">Tarefas</h3>
      <div className="flex-1 overflow-y-auto space-y-2">
        {tasks.map(task => (
          <div 
            key={task.id} 
            onClick={() => toggleTask(task.id)}
            className="flex items-center gap-3 p-2 hover:bg-white/40 dark:hover:bg-white/5 rounded-xl cursor-pointer transition-colors group"
          >
            {task.completed ? (
              <CheckCircle2 className="w-5 h-5 text-brand-purple" />
            ) : (
              <Circle className="w-5 h-5 text-cinza-claro group-hover:text-brand-purple transition-colors" />
            )}
            <span className={`text-sm ${task.completed ? 'text-on-surface-variant dark:text-slate-500 line-through opacity-50' : 'text-grafite-texto dark:text-slate-300 font-medium'}`}>
              {task.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectsWidget = () => {
  const projects = [
    { id: 1, title: 'Campanha Q3', status: 'Ativo', icon: <Megaphone className="w-4 h-4" /> },
    { id: 2, title: 'Web App UX', status: 'Revisão', icon: <Code2 className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 shadow-lg p-6 pointer-events-auto w-full h-full flex flex-col">
      <h3 className="text-sm font-bold text-grafite-texto dark:text-slate-100 mb-4">Projetos</h3>
      <div className="flex-1 overflow-y-auto space-y-3">
        {projects.map(p => (
          <div key={p.id} className="flex items-center justify-between p-2 hover:bg-white/40 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand-purple/10 text-brand-purple rounded-lg group-hover:bg-brand-purple group-hover:text-white transition-colors">
                {p.icon}
              </div>
              <span className="text-sm font-medium text-grafite-texto dark:text-slate-300">{p.title}</span>
            </div>
            <span className="text-[10px] font-bold text-brand-purple opacity-70">{p.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dock = ({ 
  onDashboardClick, 
  isDashboardActive,
  onSettingsClick
}: { 
  onDashboardClick: () => void, 
  isDashboardActive: boolean,
  onSettingsClick: () => void
}) => {
  const dockItems: (DockItemProps & { onClick?: () => void })[] = [
    { icon: <img src="https://img.icons8.com/color/48/windows-11.png" className="w-6 h-6" />, label: 'Iniciar', onClick: onDashboardClick },
    { icon: <LayoutDashboard className="w-6 h-6" />, label: 'Dashboard', active: isDashboardActive, onClick: onDashboardClick },
    { icon: <Calendar className="w-6 h-6" />, label: 'Monday' },
    { icon: <Trello className="w-6 h-6" />, label: 'Ekyte' },
    { divider: true },
    { icon: <Rocket className="w-6 h-6" />, label: 'RD Station' },
    { icon: <Landmark className="w-6 h-6" />, label: 'Treasy' },
    { icon: <Network className="w-6 h-6" />, label: 'Mentor' },
    { divider: true },
    { icon: <Contact className="w-6 h-6" />, label: 'RD CRM' },
    { icon: <Brain className="w-6 h-6" />, label: 'Komvos Mind' },
    { divider: true },
    { icon: <Settings className="w-6 h-6" />, label: 'Configurações', onClick: onSettingsClick },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl rounded-xl px-2 py-1.5 flex items-center gap-1 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/30 dark:border-white/5"
      >
        {dockItems.map((item, idx) => (
          item.divider ? (
            <div key={idx} className="w-px h-6 bg-cinza-claro/30 self-center mx-1" />
          ) : (
            <DockItem 
              key={idx} 
              icon={item.icon!} 
              label={item.label!} 
              active={item.active} 
              onClick={item.onClick}
            />
          )
        ))}
      </motion.div>
    </div>
  );
};

const DockItem = ({ icon, label, active, onClick }: InternalDockItemProps & { onClick?: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -4 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-12 whitespace-nowrap bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-3 py-2 rounded-lg shadow-xl border border-cinza-claro/20 dark:border-white/10 text-[11px] font-medium text-grafite-texto dark:text-slate-200 z-50 pointer-events-none"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button 
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ bg: "rgba(255,255,255,0.4)" }}
        whileTap={{ scale: 0.95 }}
        className={`p-2.5 rounded-lg transition-all duration-200 relative group flex items-center justify-center ${isHovered ? 'bg-white/40 shadow-sm' : ''}`}
      >
        <div className={`${active ? 'scale-90 transition-transform' : ''}`}>
          {icon}
        </div>
        
        {active && (
          <motion.span 
            layoutId="dock-active-indicator"
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1 rounded-full bg-brand-purple"
          />
        )}
      </motion.button>
    </div>
  );
};

// --- Personalization & Context Menu ---

const ContextMenu = ({ x, y, onClose, onOpenPersonalize }: { x: number, y: number, onClose: () => void, onOpenPersonalize: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed z-[100] bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl border border-cinza-claro/20 dark:border-white/10 shadow-xl py-2 w-56 flex flex-col pointer-events-auto"
      style={{ top: y, left: x }}
    >
      <ContextMenuItem icon={<Palette className="w-4 h-4" />} label="Personalizar" onClick={() => { onOpenPersonalize(); onClose(); }} />
      <div className="h-px bg-cinza-claro/10 mx-2 my-1" />
      <ContextMenuItem label="Novo Arquivo" disabled />
      <ContextMenuItem label="Organizar Desktop" disabled />
    </motion.div>
  );
};

const ContextMenuItem = ({ icon, label, onClick, disabled }: { icon?: React.ReactNode, label: string, onClick?: () => void, disabled?: boolean }) => (
  <button 
    disabled={disabled}
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-2 hover:bg-brand-purple/10 transition-colors text-sm font-medium ${disabled ? 'opacity-40 cursor-default' : 'text-grafite-texto dark:text-slate-200'}`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const TabButton = ({ active, icon, label, onClick }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void, key?: React.Key }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all font-medium text-sm ${active ? 'bg-brand-purple text-white shadow-md shadow-brand-purple/20' : 'text-grafite-texto dark:text-slate-300 hover:bg-cinza-claro/10 dark:hover:bg-white/5'}`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const AdminUsersView = () => {
  const users = [
    { id: 1, name: 'Vinicius Otavio', email: 'vinicius@statum.com.br', role: 'Administrador', status: 'Ativo' },
    { id: 2, name: 'João Silva', email: 'joao.silva@akaiito.com.br', role: 'Diretor', status: 'Ativo' },
    { id: 3, name: 'Ana Souza', email: 'ana.souza@corp.com.br', role: 'Analista', status: 'Pendente' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-black/5 dark:border-white/10 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-black/5 dark:border-white/5 flex justify-between items-center bg-[#F9FAFB]/50 dark:bg-black/20">
        <h3 className="font-bold text-grafite-texto dark:text-slate-100">Lista de Usuários</h3>
        <button className="bg-brand-purple text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-brand-purple/20 hover:scale-105 active:scale-95 transition-all">
          + Convidar Usuário
        </button>
      </div>
      <div className="divide-y divide-black/5 dark:divide-white/5">
        {users.map(u => (
          <div key={u.id} className="p-4 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-cinza-claro/20 dark:bg-white/10 rounded-xl flex items-center justify-center font-bold text-grafite-texto/50 dark:text-slate-400 text-xs">
                {u.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-sm font-bold text-grafite-texto dark:text-slate-200">{u.name}</p>
                <p className="text-[10px] text-grafite-texto/50 dark:text-slate-400">{u.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <span className="text-[10px] font-bold text-grafite-texto/40 dark:text-slate-500 uppercase tracking-widest">{u.role}</span>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${u.status === 'Ativo' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'}`}>
                {u.status}
              </span>
              <ChevronRight className="w-4 h-4 text-grafite-texto/20 group-hover:text-brand-purple transition-all" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminPlaceholderView = ({ label, icon }: { label: string, icon: React.ReactNode }) => (
  <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
    <div className="p-8 bg-white rounded-[40px] border border-black/5 shadow-sm">
      {icon}
    </div>
    <div className="space-y-1">
      <h3 className="text-xl font-bold text-grafite-texto">Gestão de {label}</h3>
      <p className="text-sm text-grafite-texto/50 max-w-xs mx-auto">
        Configure e gerencie a estrutura de {label.toLowerCase()} do seu ecossistema.
      </p>
    </div>
    <button className="bg-brand-purple text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-brand-purple/20 hover:scale-105 active:scale-95 transition-all">
      Começar Setup
    </button>
  </div>
);

const AdminOrganogramaView = () => {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({ '1': true, '2': true });

  const orgData = {
    id: '1',
    name: 'CEO',
    role: 'Chief Executive Officer',
    children: [
      {
        id: '2',
        name: 'Marketing',
        role: 'Diretoria de Marketing',
        children: [
          { id: '4', name: 'Growth', role: 'Time de Crescimento' },
          { id: '5', name: 'Branding', role: 'Identidade & Marca' },
        ]
      },
      {
        id: '3',
        name: 'Tecnologia',
        role: 'Diretoria de Tecnologia',
        children: [
          { id: '6', name: 'Produto', role: 'UX/UI & Specs' },
          { id: '7', name: 'Engenharia', role: 'DevOps & App' },
        ]
      }
    ]
  };

  const toggleNode = (id: string) => {
    setExpandedNodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const OrgNode = ({ node, level = 0 }: { node: any, level?: number, key?: React.Key }) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes[node.id];

    return (
      <div className="flex flex-col items-center">
        <motion.div 
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`relative p-4 rounded-2xl border bg-white dark:bg-slate-900 shadow-sm transition-all min-w-[200px] text-center cursor-pointer group ${isExpanded ? 'border-brand-purple ring-4 ring-brand-purple/5' : 'border-black/5 dark:border-white/10 hover:border-brand-purple/50'}`}
          onClick={() => hasChildren && toggleNode(node.id)}
        >
          <div className={`w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center font-bold text-xs ${level === 0 ? 'bg-brand-purple text-white' : 'bg-cinza-claro/20 dark:bg-white/10 text-grafite-texto/50 dark:text-slate-400'}`}>
            {node.name[0]}
          </div>
          <h4 className="text-sm font-bold text-grafite-texto dark:text-slate-100">{node.name}</h4>
          <p className="text-[10px] text-grafite-texto/50 dark:text-slate-400 font-bold uppercase tracking-wider">{node.role}</p>
          
          {hasChildren && (
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 p-1 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 rounded-full shadow-sm group-hover:bg-brand-purple/10 group-hover:text-brand-purple transition-all">
              <ChevronRight className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
            </div>
          )}
        </motion.div>

        {hasChildren && isExpanded && (
          <div className="relative pt-8 flex gap-8">
            {/* Connection Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-black/10"></div>
            {node.children.map((child: any) => (
              <OrgNode key={child.id} node={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto p-12 min-h-0 bg-[#F9FAFB]/50 rounded-[32px] border border-black/5">
        <div className="inline-block min-w-full text-center">
          <OrgNode node={orgData} />
        </div>
      </div>
    </div>
  );
};

const PersonalizationWindowContent = ({ 
  onSetWallpaper, 
  onToggleWidget,
  onToggleShortcut,
  widgets,
  shortcuts,
  currentWallpaper 
}: { 
  onSetWallpaper: (url: string) => void, 
  onToggleWidget: (id: string) => void,
  onToggleShortcut: (id: string) => void,
  widgets: WidgetConfig[],
  shortcuts: ShortcutConfig[],
  currentWallpaper: string
}) => {
  const [activeTab, setActiveTab] = useState('wallpaper');

  const menuItems = [
    { id: 'wallpaper', label: 'Wallpaper', icon: <ImageIcon className="w-4 h-4" />, section: 'GERAL' },
    { id: 'widgets', label: 'Widgets', icon: <LayoutIcon className="w-4 h-4" />, section: 'GERAL' },
    { id: 'shortcuts', label: 'Atalhos', icon: <LayoutDashboard className="w-4 h-4" />, section: 'GERAL' },
    { id: 'admin_users', label: 'Usuários', icon: <Users className="w-4 h-4" />, section: 'ADMINISTRATIVO' },
    { id: 'admin_areas', label: 'Áreas', icon: <Layers className="w-4 h-4" />, section: 'ADMINISTRATIVO' },
    { id: 'admin_diretorias', label: 'Diretorias', icon: <Building2 className="w-4 h-4" />, section: 'ADMINISTRATIVO' },
    { id: 'admin_cargos', label: 'Cargos', icon: <Briefcase className="w-4 h-4" />, section: 'ADMINISTRATIVO' },
    { id: 'admin_organograma', label: 'Organograma', icon: <GitGraph className="w-4 h-4" />, section: 'ADMINISTRATIVO' },
    { id: 'admin_permissoes', label: 'Permissões', icon: <Lock className="w-4 h-4" />, section: 'ADMINISTRATIVO' },
  ];

  const wallpapers = [
    'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1970&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1635324200457-b50742f9b17c?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1635776062127-d365bbbb279a?q=80&w=2532&auto=format&fit=crop'
  ];

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar Navigation */}
      <div className="w-64 border-r border-black/5 dark:border-white/5 bg-[#F9FAFB] dark:bg-slate-900 flex flex-col p-4 shrink-0">
        <div className="mb-8 px-2">
          <div className="flex items-center gap-2 mb-1">
            <Settings className="w-4 h-4 text-brand-purple" />
            <span className="text-[10px] font-bold text-grafite-texto/40 dark:text-slate-500 uppercase tracking-widest">Sistema</span>
          </div>
          <h2 className="text-sm font-bold text-grafite-texto dark:text-slate-100">Configurações</h2>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto">
          <div>
            <p className="px-3 text-[9px] font-bold text-grafite-texto/30 uppercase tracking-tighter mb-2">Geral</p>
            {menuItems.filter(i => i.section === 'GERAL').map(item => (
              <TabButton 
                key={item.id} 
                active={activeTab === item.id} 
                icon={item.icon} 
                label={item.label} 
                onClick={() => setActiveTab(item.id)} 
              />
            ))}
          </div>

          <div>
            <p className="px-3 text-[9px] font-bold text-grafite-texto/30 uppercase tracking-tighter mb-2">Administrativo</p>
            <div className="space-y-1">
              {menuItems.filter(i => i.section === 'ADMINISTRATIVO').map(item => (
                <TabButton 
                  key={item.id} 
                  active={activeTab === item.id} 
                  icon={item.icon} 
                  label={item.label} 
                  onClick={() => setActiveTab(item.id)} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col bg-[#F9FAFB] dark:bg-slate-950 overflow-hidden">
        {activeTab === 'wallpaper' && (
          <div className="flex-1 p-10 overflow-y-auto space-y-8">
            <div>
              <h1 className="text-[32px] font-bold text-grafite-texto dark:text-slate-100 tracking-tight mb-2">Wallpaper</h1>
              <p className="text-sm text-grafite-texto/50 dark:text-slate-400 mb-8 font-medium">Escolha a atmosfera do seu espaço de trabalho.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {wallpapers.map((url, i) => (
                  <div 
                    key={i} 
                    onClick={() => onSetWallpaper(url)}
                    className="aspect-video rounded-3xl overflow-hidden cursor-pointer relative group border-2 border-transparent hover:border-brand-purple transition-all shadow-sm"
                  >
                    <img src={url} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="Wallpaper option" />
                    {currentWallpaper === url && (
                      <div className="absolute inset-0 bg-brand-purple/20 flex items-center justify-center">
                        <div className="bg-brand-purple text-white p-2 rounded-full shadow-lg">
                          <Check className="w-5 h-5" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'widgets' && (
          <div className="flex-1 p-10 overflow-y-auto space-y-8">
            <div>
              <h1 className="text-[32px] font-bold text-grafite-texto dark:text-slate-100 tracking-tight mb-2">Widgets do Sistema</h1>
              <p className="text-sm text-grafite-texto/50 dark:text-slate-400 mb-8 font-medium">Configure quais módulos estarão visíveis na área de trabalho.</p>
              <div className="space-y-4 max-w-2xl">
                {widgets.map(w => (
                  <div key={w.id} className="flex items-center justify-between p-5 bg-white dark:bg-slate-900 rounded-[24px] border border-black/5 dark:border-white/10 shadow-sm group hover:border-brand-purple/20 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-[#F8F9FA] dark:bg-slate-800 text-grafite-texto/40 dark:text-slate-500 rounded-2xl group-hover:bg-brand-purple/5 group-hover:text-brand-purple transition-colors">
                        <LayoutIcon className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-grafite-texto dark:text-slate-200">{w.name}</span>
                    </div>
                    <button 
                      onClick={() => onToggleWidget(w.id)}
                      className={`w-14 h-7 rounded-full transition-colors relative flex items-center px-1.5 ${w.visible ? 'bg-brand-purple' : 'bg-[#EEF0F2] dark:bg-slate-800'}`}
                    >
                      <motion.div 
                        animate={{ x: w.visible ? 28 : 0 }}
                        className="w-4 h-4 rounded-full bg-white shadow-md"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'shortcuts' && (
          <div className="flex-1 p-10 overflow-y-auto space-y-8">
            <div>
              <h1 className="text-[32px] font-bold text-grafite-texto dark:text-slate-100 tracking-tight mb-2">Atalhos do Dock</h1>
              <p className="text-sm text-grafite-texto/50 dark:text-slate-400 mb-8 font-medium">Fixe seus aplicativos favoritos diretamente na área de trabalho.</p>
              <div className="space-y-4 max-w-2xl">
                {shortcuts.map(s => (
                  <div key={s.id} className="flex items-center justify-between p-5 bg-white dark:bg-slate-900 rounded-[24px] border border-black/5 dark:border-white/10 shadow-sm group hover:border-brand-purple/20 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-[#F8F9FA] dark:bg-slate-800 text-grafite-texto/40 dark:text-slate-500 rounded-2xl group-hover:bg-brand-purple/5 group-hover:text-brand-purple transition-colors">
                        {s.icon}
                      </div>
                      <span className="font-bold text-grafite-texto dark:text-slate-200">{s.name}</span>
                    </div>
                    <button 
                      onClick={() => onToggleShortcut(s.id)}
                      className={`w-14 h-7 rounded-full transition-colors relative flex items-center px-1.5 ${s.visible ? 'bg-brand-purple' : 'bg-[#EEF0F2] dark:bg-slate-800'}`}
                    >
                      <motion.div 
                        animate={{ x: s.visible ? 28 : 0 }}
                        className="w-4 h-4 rounded-full bg-white shadow-md"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab.startsWith('admin_') && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-10 py-8 border-b border-black/5 dark:border-white/5 bg-white dark:bg-slate-900">
              <h1 className="text-[32px] font-bold text-grafite-texto dark:text-slate-100 tracking-tight">
                {menuItems.find(i => i.id === activeTab)?.label}
              </h1>
              <p className="text-sm text-grafite-texto/50 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed uppercase tracking-widest font-bold text-[10px]">
                Configuração Administrativa • Gestão de {menuItems.find(i => i.id === activeTab)?.label}
              </p>
            </div>

            <div className="flex-1 p-10 overflow-y-auto">
              {activeTab === 'admin_users' && <AdminUsersView />}
              {activeTab === 'admin_areas' && <AdminPlaceholderView label="Áreas" icon={<Layers className="w-12 h-12 text-brand-purple/40" />} />}
              {activeTab === 'admin_diretorias' && <AdminPlaceholderView label="Diretorias" icon={<Building2 className="w-12 h-12 text-brand-purple/40" />} />}
              {activeTab === 'admin_cargos' && <AdminPlaceholderView label="Cargos" icon={<Briefcase className="w-12 h-12 text-brand-purple/40" />} />}
              {activeTab === 'admin_organograma' && <AdminOrganogramaView />}
              {activeTab === 'admin_permissoes' && <AdminPlaceholderView label="Permissões" icon={<Lock className="w-12 h-12 text-brand-purple/40" />} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// --- Main App ---

const WindowFrame = ({ 
  title, 
  icon, 
  onClose, 
  onMinimize,
  children,
  zIndex,
  onFocus,
  defaultWidth = 600,
  defaultHeight = 450
}: { 
  title: string, 
  icon: React.ReactNode, 
  onClose: () => void, 
  onMinimize: () => void,
  children: React.ReactNode,
  zIndex: number,
  onFocus: () => void,
  defaultWidth?: number,
  defaultHeight?: number
}) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [size, setSize] = useState({ width: defaultWidth, height: defaultHeight });
  const [isResizing, setIsResizing] = useState(false);
  
  // Calculate center position
  const initialX = typeof window !== 'undefined' ? (window.innerWidth - size.width) / 2 : 100;
  const initialY = typeof window !== 'undefined' ? (window.innerHeight - size.height) / 2 - 40 : 100;

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    
    const startX = e.pageX;
    const startY = e.pageY;
    const startWidth = size.width;
    const startHeight = size.height;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.max(400, startWidth + (moveEvent.pageX - startX));
      const newHeight = Math.max(300, startHeight + (moveEvent.pageY - startY));
      setSize({ width: newWidth, height: newHeight });
    };

    const onMouseUp = () => {
      setIsResizing(false);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <motion.div 
      drag={!isMaximized && !isResizing}
      dragHandleClassName="window-handle"
      dragMomentum={false}
      onMouseDown={onFocus}
      initial={{ opacity: 0, scale: 0.95, x: initialX, y: initialY + 20 }}
      animate={isMaximized ? {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        width: '100%',
        height: 'calc(100% - 64px)',
        borderRadius: 0
      } : {
        opacity: 1,
        scale: 1,
        x: initialX,
        y: initialY,
        width: size.width,
        height: size.height,
        borderRadius: '0.75rem'
      }}
      exit={{ opacity: 0, scale: 0.9, y: initialY + 50, transition: { duration: 0.2 } }}
      transition={isResizing ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 25 }}
      className={`fixed z-[100] flex flex-col bg-white/90 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-2xl overflow-hidden pointer-events-auto`}
      style={{ zIndex }}
    >
      {/* Window Header */}
      <div className="window-handle flex items-center justify-between px-4 py-2 border-b border-cinza-claro/5 dark:border-white/5 cursor-grab active:cursor-grabbing bg-white/40 dark:bg-slate-800/40 shrink-0">
        <div className="flex items-center gap-3">
          <span className="opacity-80 scale-90">{icon}</span>
          <h2 className="text-[11px] font-medium text-grafite-texto dark:text-slate-100/90 tracking-tight">{title}</h2>
        </div>
        <div className="flex items-center -mr-2">
          <button 
            onClick={onMinimize} 
            className="p-2.5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
            title="Minimizar"
          >
            <div className="w-3 h-[1px] bg-grafite-texto dark:bg-slate-300 opacity-60 group-hover:opacity-100" />
          </button>
          <button 
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-2.5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
            title={isMaximized ? "Restaurar" : "Maximizar"}
          >
            <div className={`w-3 h-3 border border-grafite-texto dark:border-slate-300 opacity-60 group-hover:opacity-100 rounded-[1px] ${isMaximized ? 'relative' : ''}`}>
              {isMaximized && (
                <div className="absolute -top-1 -right-1 w-2 h-2 border border-grafite-texto dark:border-slate-300 bg-white/60 dark:bg-slate-800/60" />
              )}
            </div>
          </button>
          <button 
            onClick={onClose} 
            className="p-2.5 px-4 hover:bg-[#c42b1c] hover:text-white transition-all group"
            title="Fechar"
          >
            <X className="w-4 h-4 opacity-60 group-hover:opacity-100" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-hidden flex flex-col relative">
        {children}
        
        {/* Resize Handle */}
        {!isMaximized && (
          <div 
            onMouseDown={handleResizeStart}
            className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize flex items-end justify-end p-0.5 group"
          >
            <div className="w-2 h-2 border-r-2 border-b-2 border-black/10 group-hover:border-black/30 transition-colors rounded-br-sm" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ProfileWindowContent = () => {
  return (
    <div className="flex-1 flex flex-col bg-[#F9FAFB] dark:bg-slate-950 overflow-hidden">
      {/* Header Section */}
      <div className="px-10 py-8 border-b border-black/5 dark:border-white/5 bg-white dark:bg-slate-900">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-[32px] font-bold text-grafite-texto dark:text-slate-100 tracking-tight">Preferências do usuário</h1>
            <p className="text-sm text-grafite-texto/50 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Gerencie identidade, preferências de uso, disponibilidade de agenda e segurança da conta.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2 rounded-full border border-black/10 dark:border-white/10 text-xs font-bold text-grafite-texto/70 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              Perfil Completo
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Card: Perfil */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-[32px] border border-black/5 dark:border-white/10 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-grafite-texto dark:text-slate-100">Perfil</h2>
              <span className="text-[10px] font-bold text-grafite-texto/40 dark:text-slate-500 uppercase tracking-widest">Imagem Pública</span>
            </div>
            <p className="text-sm text-grafite-texto/50 dark:text-slate-400 mb-8">Dados que aparecem para outros usuários.</p>
            
            <div className="bg-[#F8F9FA] dark:bg-slate-800 rounded-3xl border border-black/5 dark:border-white/5 p-12 flex flex-col items-center justify-center text-center mb-8">
              <div className="w-32 h-32 bg-[#EEF0F2] dark:bg-slate-700 rounded-3xl flex items-center justify-center text-grafite-texto/40 dark:text-slate-400 text-4xl font-bold mb-6">
                VO
              </div>
              <h3 className="text-xl font-bold text-grafite-texto dark:text-slate-100 mb-1">Vinicius Otavio</h3>
              <p className="text-sm text-grafite-texto/50 dark:text-slate-400">vinicius@statum.com.br</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="bg-brand-purple/60 hover:bg-brand-purple text-white py-3.5 rounded-xl font-bold text-sm transition-all">
                Adicionar foto
              </button>
              <button className="bg-white dark:bg-slate-800 border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-grafite-texto/50 dark:text-slate-400 py-3.5 rounded-xl font-bold text-sm transition-all">
                Remover
              </button>
            </div>
            <p className="text-[10px] text-center text-grafite-texto/30 dark:text-slate-600 mt-4">JPG, PNG, WEBP ou GIF com até 5 MB</p>
          </div>

          {/* Right Card: Dados e preferências */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-[32px] border border-black/5 dark:border-white/10 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-grafite-texto dark:text-slate-100 max-w-[200px] leading-tight">Dados e preferências</h2>
              <span className="text-[10px] font-bold text-grafite-texto/40 dark:text-slate-500 uppercase tracking-widest text-right">Aplicado ao entrar na plataforma</span>
            </div>
            <p className="text-sm text-grafite-texto/50 dark:text-slate-400 mb-8">Identidade operacional, tema e vínculo principal.</p>

            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-grafite-texto/40 dark:text-slate-500 uppercase tracking-widest block mb-2 px-1">Nome de exibição</label>
                <input 
                  type="text" 
                  defaultValue="Vinicius Otavio"
                  className="w-full px-5 py-3.5 bg-white dark:bg-slate-800 border border-black/10 dark:border-white/10 rounded-2xl text-grafite-texto dark:text-slate-200 font-medium focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold text-grafite-texto/40 dark:text-slate-500 uppercase tracking-widest block mb-2 px-1">Tema Padrão</label>
                  <select className="w-full px-5 py-3.5 bg-white dark:bg-slate-800 border border-black/10 dark:border-white/10 rounded-2xl text-grafite-texto dark:text-slate-200 font-medium focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all outline-none appearance-none">
                    <option>Modo claro</option>
                    <option>Modo escuro</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-grafite-texto/40 dark:text-slate-500 uppercase tracking-widest block mb-2 px-1">Time Principal</label>
                  <select className="w-full px-5 py-3.5 bg-white dark:bg-slate-800 border border-black/10 dark:border-white/10 rounded-2xl text-grafite-texto dark:text-slate-200 font-medium focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all outline-none appearance-none">
                    <option>Sem time definido</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold text-grafite-texto/40 dark:text-slate-500 uppercase tracking-widest block mb-2 px-1">Dock — Visibilidade</label>
                  <select className="w-full px-5 py-3.5 bg-white dark:bg-slate-800 border border-black/10 dark:border-white/10 rounded-2xl text-grafite-texto dark:text-slate-200 font-medium focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all outline-none appearance-none">
                    <option>Sempre visível</option>
                    <option>Ocultar automaticamente</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-grafite-texto/40 dark:text-slate-500 uppercase tracking-widest block mb-2 px-1">Dock — Posição</label>
                  <select className="w-full px-5 py-3.5 bg-white dark:bg-slate-800 border border-black/10 dark:border-white/10 rounded-2xl text-grafite-texto dark:text-slate-200 font-medium focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all outline-none appearance-none">
                    <option>Inferior (centro)</option>
                    <option>Superior</option>
                    <option>Esquerda</option>
                    <option>Direita</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="inline-flex items-center px-4 py-2 bg-white dark:bg-slate-800 border border-black/10 dark:border-white/10 rounded-full text-[11px] font-bold text-grafite-texto/70 dark:text-slate-300 mt-4">
                  Time: <span className="text-grafite-texto dark:text-brand-purple ml-1">Sem time definido</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};


// Dashboard helpers and main app...

const DashboardCard = ({ name, detail, status, color, icon, progress, style = 'normal' }: any) => {
  if (style === 'classic') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-white/60 dark:border-white/10 hover:bg-white/80 dark:hover:bg-slate-800 transition-all group shadow-sm hover:shadow-md h-full flex flex-col justify-between"
      >
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-grafite-texto dark:text-slate-100 tracking-tight">{name}</h3>
          <p className="text-sm text-grafite-texto dark:text-slate-300 opacity-60 font-medium">{detail}</p>
        </div>
        <div className="mt-8 space-y-3">
          <div className="flex justify-between items-center hidden">
            <span className="text-xs font-bold text-grafite-texto/40 dark:text-slate-500">Progresso</span>
          </div>
          <div className="h-1.5 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: progress }}
              className={`h-full ${color}`}
            />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white/30 dark:bg-slate-900/30 rounded-2xl border border-white/40 dark:border-white/10 hover:bg-white/60 dark:hover:bg-slate-800 transition-all group shadow-sm hover:shadow-md flex flex-col h-full"
    >
      <div className="flex items-center justify-between mb-2">
        <div className={`p-4 rounded-xl text-white ${color} shadow-lg shadow-black/5 flex items-center justify-center scale-90`}>
          {icon}
        </div>
        <span className="text-2xl font-bold text-grafite-texto dark:text-slate-100 tracking-tight">{status}</span>
      </div>
      
      <div className="mt-4">
        <h3 className="text-sm font-bold text-grafite-texto dark:text-slate-100">{name}</h3>
        <p className="text-xs text-grafite-texto opacity-50 dark:text-slate-400 font-medium mb-4">{detail}</p>
        
        <div className="h-1.5 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: progress }}
            className={`h-full ${color}`}
          />
        </div>
      </div>
    </motion.div>
  );
};

const DashboardWindow = ({ onClose, onMinimize, zIndex, onFocus }: { 
  onClose: () => void, 
  onMinimize: () => void,
  zIndex: number,
  onFocus: () => void
}) => {
  const reports = [
    { name: 'Monday', detail: '12 Tarefas Pendentes', status: '82%', color: 'bg-blue-600', icon: <CalendarDays className="w-6 h-6" />, progress: '82%', style: 'classic' },
    { name: 'Ekyte', detail: '3 Campanhas em OKR', status: 'Ativo', color: 'bg-orange-500', icon: <Trello className="w-6 h-6" />, progress: '45%', style: 'classic' },
    { name: 'RD Station', detail: 'Leads gerados (mês)', status: '2.4k', color: 'bg-blue-700', icon: <Rocket className="w-6 h-6" />, progress: '65%', style: 'classic' },
    { name: 'Treasy', detail: 'Budget Q4 Restante', status: 'R$ 45k', color: 'bg-emerald-500', icon: <Landmark className="w-6 h-6" />, progress: '30%' },
    { name: 'Mentor', detail: 'Conexões Ativas', status: '15', color: 'bg-indigo-500', icon: <Network className="w-6 h-6" />, progress: '55%' },
    { name: 'RD CRM', detail: 'Pipeline de Vendas', status: 'R$ 120k', color: 'bg-blue-400', icon: <Contact className="w-6 h-6" />, progress: '40%' },
    { name: 'Komvos Mind', detail: 'Precisão da IA', status: '98%', color: 'bg-brand-purple', icon: <Brain className="w-6 h-6" />, progress: '98%' },
  ];

  return (
    <WindowFrame 
      title="Relatórios do Ecossistema" 
      icon={<LayoutDashboard className="w-4 h-4" />} 
      onClose={onClose} 
      onMinimize={onMinimize}
      zIndex={zIndex}
      onFocus={onFocus}
      defaultWidth={600}
      defaultHeight={450}
    >
      <div className="flex-1 p-10 overflow-y-auto bg-[#F8F9FA]/50 dark:bg-slate-900/50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reports.map((report, i) => (
            <div key={report.name} className={i === 6 ? "lg:col-span-1" : ""}>
              <DashboardCard {...report} />
            </div>
          ))}
        </div>
      </div>
    </WindowFrame>
  );
};

const HelpWindowContent = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [suggestion, setSuggestion] = useState('');
  const [sent, setSent] = useState(false);

  const faqs = [
    { q: 'Como adicionar novos widgets?', a: 'Clique com o botão direito no desktop ou vá em Personalização > Widgets.' },
    { q: 'Posso mudar o papel de parede?', a: 'Sim! Em Personalização > Wallpaper você encontra diversas opções.' },
    { q: 'Onde encontro minhas notificações?', a: 'No ícone de sininho na barra superior.' },
    { q: 'Como criar atalhos no desktop?', a: 'Em Personalização > Atalhos, você pode fixar apps do Dock no Desktop.' },
  ];

  const handleSendSuggestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) return;
    // Simulate sending
    setSent(true);
    setSuggestion('');
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      {/* Sidebar */}
      <div className="w-64 border-r border-black/5 dark:border-white/5 bg-[#F9FAFB] dark:bg-slate-950 flex flex-col p-6 gap-2">
        <button 
          onClick={() => setActiveTab('faq')}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all font-bold text-xs uppercase tracking-widest ${activeTab === 'faq' ? 'bg-brand-purple text-white shadow-md shadow-brand-purple/20' : 'text-grafite-texto/50 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5'}`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Central de Ajuda</span>
        </button>
        <button 
          onClick={() => setActiveTab('suggestions')}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all font-bold text-xs uppercase tracking-widest ${activeTab === 'suggestions' ? 'bg-brand-purple text-white shadow-md shadow-brand-purple/20' : 'text-grafite-texto/50 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5'}`}
        >
          <Megaphone className="w-4 h-4" />
          <span>Sugestões</span>
        </button>
        
        <div className="mt-auto p-4 bg-white dark:bg-slate-900 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm">
          <p className="text-[10px] font-bold text-grafite-texto/40 dark:text-slate-500 uppercase mb-2">Suporte Direto</p>
          <button className="w-full flex items-center justify-center gap-2 py-2 bg-brand-purple/5 text-brand-purple rounded-lg font-bold text-[10px] uppercase hover:bg-brand-purple/10 transition-colors">
            <MessageSquare className="w-3 h-3" />
            Falar com Analista
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-10 bg-white dark:bg-slate-900">
        {activeTab === 'faq' && (
          <div className="max-w-2xl">
            <h2 className="text-[32px] font-bold text-grafite-texto dark:text-slate-100 tracking-tight mb-2">Como podemos ajudar?</h2>
            <p className="text-sm text-grafite-texto/50 dark:text-slate-400 mb-8 font-medium">Explore nossa base de conhecimento para tirar suas dúvidas.</p>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-6 bg-[#F9FAFB] dark:bg-slate-950 rounded-[24px] border border-black/5 dark:border-white/5 hover:border-brand-purple/20 transition-all group">
                  <h4 className="text-sm font-bold text-grafite-texto dark:text-slate-100 mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-purple"></span>
                    {faq.q}
                  </h4>
                  <p className="text-sm text-grafite-texto/60 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'suggestions' && (
          <div className="max-w-2xl h-full flex flex-col">
            <h2 className="text-[32px] font-bold text-grafite-texto dark:text-slate-100 tracking-tight mb-2">Sugestões</h2>
            <p className="text-sm text-grafite-texto/50 dark:text-slate-400 mb-8 font-medium">Sua opinião é fundamental. O que podemos melhorar no Komvos OS?</p>
            
            <div className="flex-1 bg-[#F9FAFB] dark:bg-slate-950 rounded-[32px] border border-black/5 dark:border-white/5 p-8 flex flex-col items-center justify-center text-center">
              {sent ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-brand-purple/10 text-brand-purple rounded-full flex items-center justify-center mb-4">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-grafite-texto dark:text-slate-100 mb-2">Obrigado pela sugestão!</h3>
                  <p className="text-sm text-grafite-texto/50 dark:text-slate-400 font-medium">Nossa equipe de produto irá analisar seu feedback com carinho.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSendSuggestion} className="w-full h-full flex flex-col text-slate-900 dark:text-slate-100">
                  <div className="flex-1 relative mb-6">
                    <textarea 
                      value={suggestion}
                      onChange={(e) => setSuggestion(e.target.value)}
                      placeholder="Descreva sua sugestão ou melhoria aqui..."
                      className="w-full h-full bg-white dark:bg-slate-900 rounded-2xl border border-black/5 dark:border-white/10 p-6 text-sm font-medium placeholder-grafite-texto/20 focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all resize-none shadow-sm"
                    />
                  </div>
                  <button 
                    disabled={!suggestion.trim()}
                    className="w-full bg-brand-purple text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-brand-purple/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <Send className="w-4 h-4" />
                    Enviar Sugestão
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const NotificationsWindowContent = () => {
  const notifications = [
    { id: 1, title: 'Nova tarefa atribuída', message: 'Você foi marcado em "Review de Layout"', time: '5m atrás', type: 'task', read: false },
    { id: 2, title: 'Mensagem do Sistema', message: 'Manutenção programada para amanhã às 04:00', time: '1h atrás', type: 'system', read: false },
    { id: 3, title: 'Comentário em Projeto', message: 'Ana comentou no projeto "Redesign Site"', time: '3h atrás', type: 'comment', read: true },
    { id: 4, title: 'Relatório Mensal', message: 'Seu relatório de performance está pronto', time: '8h atrás', type: 'report', read: true },
  ];

  return (
    <div className="flex flex-col bg-[#F9FAFB] dark:bg-slate-950 overflow-hidden max-h-[500px]">
      <div className="px-6 py-5 border-b border-black/5 dark:border-white/5 bg-white dark:bg-slate-900">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-grafite-texto dark:text-slate-100 tracking-tight text-brand-purple">Notificações</h1>
            <p className="text-[10px] text-grafite-texto/50 dark:text-slate-400 mt-0.5 font-bold uppercase tracking-widest">Acompanhe as últimas atualizações</p>
          </div>
          <button className="text-[9px] font-bold text-brand-purple uppercase tracking-widest hover:underline">
            Limpar
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {notifications.map(n => (
          <div 
            key={n.id} 
            className={`p-4 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm transition-all flex items-start gap-3 ${n.read ? 'bg-white/50 dark:bg-slate-900/50 opacity-60' : 'bg-white dark:bg-slate-900 border-l-4 border-l-brand-purple'}`}
          >
            <div className={`p-2 rounded-lg shrink-0 ${n.read ? 'bg-black/5 dark:bg-white/5 text-grafite-texto/40 dark:text-slate-500' : 'bg-brand-purple/10 text-brand-purple'}`}>
              {n.type === 'task' && <CheckCircle2 className="w-4 h-4" />}
              {n.type === 'system' && <Shield className="w-4 h-4" />}
              {n.type === 'comment' && <Megaphone className="w-4 h-4" />}
              {n.type === 'report' && <GitGraph className="w-4 h-4" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-0.5">
                <h3 className="text-xs font-bold text-grafite-texto dark:text-slate-100 truncate pr-2">{n.title}</h3>
                <span className="text-[9px] font-medium text-grafite-texto/40 dark:text-slate-500 shrink-0">{n.time}</span>
              </div>
              <p className="text-[11px] text-grafite-texto/60 dark:text-slate-400 leading-relaxed line-clamp-2">{n.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white dark:bg-slate-900 border-t border-black/5 dark:border-white/5">
        <button className="w-full bg-[#F8F9FA] dark:bg-slate-800 hover:bg-black/5 dark:hover:bg-white/5 text-grafite-texto/50 dark:text-slate-500 py-2.5 rounded-xl font-bold text-[10px] transition-all uppercase tracking-widest">
          Ver Histórico Completo
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number } | null>(null);
  const [personalizeOpen, setPersonalizeOpen] = useState(false);
  const [personalizeMinimized, setPersonalizeMinimized] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [dashboardMinimized, setDashboardMinimized] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileMinimized, setProfileMinimized] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsMinimized, setNotificationsMinimized] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [helpMinimized, setHelpMinimized] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const [shortcuts, setShortcuts] = useState<ShortcutConfig[]>([
    { id: 'monday', name: 'Monday', icon: <Calendar className="w-6 h-6" />, visible: false, x: 1200, y: 50, zIndex: 10 },
    { id: 'ekyte', name: 'Ekyte', icon: <Trello className="w-6 h-6" />, visible: false, x: 1200, y: 160, zIndex: 11 },
    { id: 'rd_station', name: 'RD Station', icon: <Rocket className="w-6 h-6" />, visible: false, x: 1200, y: 270, zIndex: 12 },
    { id: 'treasy', name: 'Treasy', icon: <Landmark className="w-6 h-6" />, visible: false, x: 1200, y: 380, zIndex: 13 },
    { id: 'mentor', name: 'Mentor', icon: <Network className="w-6 h-6" />, visible: false, x: 1200, y: 490, zIndex: 14 },
    { id: 'rd_crm', name: 'RD CRM', icon: <Contact className="w-6 h-6" />, visible: false, x: 1200, y: 600, zIndex: 15 },
    { id: 'mind', name: 'Komvos Mind', icon: <Brain className="w-6 h-6" />, visible: false, x: 1300, y: 50, zIndex: 16 },
  ]);
  
  const [wallpaper, setWallpaper] = useState('https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1974&auto=format&fit=crop');
  
  const [widgets, setWidgets] = useState<WidgetConfig[]>([
    { id: 'clock', name: 'Relógio e Data', visible: false, x: 50, y: 50, width: 320, height: 160, zIndex: 10 },
    { id: 'tasks', name: 'Minhas Tarefas', visible: false, x: 510, y: 50, width: 320, height: 280, zIndex: 11 },
    { id: 'projects', name: 'Resumo de Projetos', visible: false, x: 50, y: 250, width: 320, height: 240, zIndex: 12 },
    { id: 'weather', name: 'Clima', visible: false, x: 510, y: 350, width: 320, height: 140, zIndex: 13 },
    { id: 'notepad', name: 'Bloco de Notas', visible: false, x: 850, y: 50, width: 320, height: 240, zIndex: 14 },
    { id: 'calendar', name: 'Calendário', visible: false, x: 850, y: 310, width: 320, height: 280, zIndex: 15 },
    { id: 'announcements', name: 'Comunicados', visible: false, x: 50, y: 510, width: 320, height: 200, zIndex: 16 },
  ]);

  const [maxZ, setMaxZ] = useState(20);
  const [personalizeZ, setPersonalizeZ] = useState(100);
  const [dashboardZ, setDashboardZ] = useState(101);
  const [profileZ, setProfileZ] = useState(102);
  const [notificationsZ, setNotificationsZ] = useState(103);
  const [helpZ, setHelpZ] = useState(104);

  const updateWidget = (id: string, updates: Partial<WidgetConfig>) => {
    setWidgets(prev => prev.map(w => w.id === id ? { ...w, ...updates } : w));
  };

  const focusWidget = (id: string) => {
    const nextZ = maxZ + 1;
    setMaxZ(nextZ);
    updateWidget(id, { zIndex: nextZ });
  };

  const focusShortcut = (id: string) => {
    const nextZ = maxZ + 1;
    setMaxZ(nextZ);
    setShortcuts(prev => prev.map(s => s.id === id ? { ...s, zIndex: nextZ } : s));
  };

  const updateShortcutPos = (id: string, x: number, y: number) => {
    setShortcuts(prev => prev.map(s => s.id === id ? { ...s, x, y } : s));
  };

  const focusWindow = (type: 'personalize' | 'dashboard' | 'profile' | 'notifications' | 'help') => {
    const nextZ = maxZ + 50;
    setMaxZ(nextZ);
    if (type === 'personalize') setPersonalizeZ(nextZ);
    else if (type === 'dashboard') setDashboardZ(nextZ);
    else if (type === 'profile') setProfileZ(nextZ);
    else if (type === 'notifications') setNotificationsZ(nextZ);
    else if (type === 'help') setHelpZ(nextZ);
  };

  const handleDashboardClick = () => {
    if (!dashboardOpen) {
      setDashboardOpen(true);
      setDashboardMinimized(false);
      focusWindow('dashboard');
    } else {
      setDashboardMinimized(!dashboardMinimized);
      if (dashboardMinimized) focusWindow('dashboard');
    }
  };

  const handleSettingsClick = () => {
    if (!personalizeOpen) {
      setPersonalizeOpen(true);
      setPersonalizeMinimized(false);
      focusWindow('personalize');
    } else {
      setPersonalizeMinimized(!personalizeMinimized);
      if (personalizeMinimized) focusWindow('personalize');
    }
  };

  const handleProfileClick = () => {
    if (!profileOpen) {
      setProfileOpen(true);
      setProfileMinimized(false);
      focusWindow('profile');
    } else {
      setProfileMinimized(!profileMinimized);
      if (profileMinimized) focusWindow('profile');
    }
  };

  const handleNotificationsClick = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  const handleHelpClick = () => {
    if (!helpOpen) {
      setHelpOpen(true);
      setHelpMinimized(false);
      focusWindow('help');
    } else {
      setHelpMinimized(!helpMinimized);
      if (helpMinimized) focusWindow('help');
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getWidgetComponent = (id: string) => {
    switch (id) {
      case 'clock': return <ClockWidget />;
      case 'tasks': return <TasksWidget />;
      case 'projects': return <ProjectsWidget />;
      case 'weather': return <WeatherWidget />;
      case 'notepad': return <NotepadWidget />;
      case 'calendar': return <MiniCalendarWidget />;
      case 'announcements': return <AnnouncementsWidget />;
      default: return null;
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleCloseContext = () => setContextMenu(null);
  
  const toggleWidget = (id: string) => {
    setWidgets(prev => {
      const isVisible = prev.find(w => w.id === id)?.visible;
      // If becoming visible, also bring to front
      if (!isVisible) {
        const nextZ = maxZ + 1;
        setMaxZ(nextZ);
        return prev.map(w => w.id === id ? { ...w, visible: true, zIndex: nextZ } : w);
      }
      return prev.map(w => w.id === id ? { ...w, visible: false } : w);
    });
  };

  const toggleShortcut = (id: string) => {
    setShortcuts(prev => {
      const isVisible = prev.find(s => s.id === id)?.visible;
      if (!isVisible) {
        const nextZ = maxZ + 1;
        setMaxZ(nextZ);
        return prev.map(s => s.id === id ? { ...s, visible: true, zIndex: nextZ } : s);
      }
      return prev.map(s => s.id === id ? { ...s, visible: false } : s);
    });
  };

  return (
    <div 
      className={`min-h-screen flex flex-col pt-16 px-8 select-none relative transition-all duration-700 ${isDarkMode ? 'dark' : ''}`} 
      style={{ 
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      onContextMenu={handleContextMenu}
      onClick={handleCloseContext}
    >
      <TopBar 
        onOpenSettings={handleSettingsClick} 
        onOpenProfile={handleProfileClick}
        onOpenNotifications={handleNotificationsClick}
        onOpenHelp={handleHelpClick}
        onToggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
        isNotificationsOpen={notificationsOpen}
      />
      
      <main className="flex-grow relative bg-transparent">
        {/* Shortcuts Layer */}
        <AnimatePresence>
          {shortcuts.filter(s => s.visible).map(s => (
            <DraggableShortcut 
              key={s.id}
              id={s.id}
              name={s.name}
              icon={s.icon}
              x={s.x}
              y={s.y}
              zIndex={s.zIndex}
              onUpdate={updateShortcutPos}
              onFocus={focusShortcut}
              onClose={toggleShortcut}
              onClick={() => {
                // Determine action based on ID
                if (s.id === 'monday') {/* Action if needed */}
              }}
            />
          ))}
        </AnimatePresence>

        {/* Widgets Layer */}
        <AnimatePresence>
          {widgets.filter(w => w.visible).map(w => (
            <DraggableWidget 
              key={w.id} 
              id={w.id}
              x={w.x}
              y={w.y}
              width={w.width}
              height={w.height}
              zIndex={w.zIndex}
              onUpdate={updateWidget}
              onFocus={focusWidget}
              onClose={toggleWidget}
            >
              {getWidgetComponent(w.id)}
            </DraggableWidget>
          ))}
        </AnimatePresence>
      </main>

      <Dock 
        onDashboardClick={handleDashboardClick} 
        isDashboardActive={dashboardOpen} 
        onSettingsClick={handleSettingsClick}
      />

      {/* Overlays */}
      <AnimatePresence>
        {contextMenu && (
          <ContextMenu 
            x={contextMenu.x} 
            y={contextMenu.y} 
            onClose={handleCloseContext} 
            onOpenPersonalize={handleSettingsClick} 
          />
        )}
      </AnimatePresence>

      {/* Dashboard Window */}
      <AnimatePresence>
        {dashboardOpen && !dashboardMinimized && (
          <DashboardWindow 
            onClose={() => setDashboardOpen(false)} 
            onMinimize={() => setDashboardMinimized(true)}
            zIndex={dashboardZ}
            onFocus={() => focusWindow('dashboard')}
          />
        )}
      </AnimatePresence>

      {/* Profile Window */}
      <AnimatePresence>
        {profileOpen && !profileMinimized && (
          <WindowFrame 
            title="Minha Conta" 
            icon={<User className="w-4 h-4" />} 
            onClose={() => setProfileOpen(false)} 
            onMinimize={() => setProfileMinimized(true)}
            zIndex={profileZ}
            onFocus={() => focusWindow('profile')}
            defaultWidth={1000}
            defaultHeight={700}
          >
            <ProfileWindowContent />
          </WindowFrame>
        )}
      </AnimatePresence>

      {/* Personalization Window */}
      <AnimatePresence>
        {personalizeOpen && !personalizeMinimized && (
          <WindowFrame 
            title="Personalização" 
            icon={<Palette className="w-4 h-4" />} 
            onClose={() => setPersonalizeOpen(false)} 
            onMinimize={() => setPersonalizeMinimized(true)}
            zIndex={personalizeZ}
            onFocus={() => focusWindow('personalize')}
            defaultWidth={1000}
            defaultHeight={750}
          >
            <PersonalizationWindowContent 
              onSetWallpaper={setWallpaper}
              onToggleWidget={toggleWidget}
              onToggleShortcut={toggleShortcut}
              widgets={widgets}
              shortcuts={shortcuts}
              currentWallpaper={wallpaper}
            />
          </WindowFrame>
        )}
      </AnimatePresence>

      {/* Help Window */}
      <AnimatePresence>
        {helpOpen && !helpMinimized && (
          <WindowFrame 
            title="Ajuda & Sugestões" 
            icon={<HelpCircle className="w-4 h-4" />} 
            onClose={() => setHelpOpen(false)} 
            onMinimize={() => setHelpMinimized(true)}
            zIndex={helpZ}
            onFocus={() => focusWindow('help')}
            defaultWidth={1000}
            defaultHeight={700}
          >
            <HelpWindowContent />
          </WindowFrame>
        )}
      </AnimatePresence>

      {/* Notifications Popover is inside TopBar */}
    </div>
  );
}
