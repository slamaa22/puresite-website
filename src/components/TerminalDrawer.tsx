import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, CornerDownLeft, Sparkles } from 'lucide-react';

interface TerminalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onScrollToPricing: () => void;
  onOpenContact: () => void;
}

interface CommandHistoryItem {
  command: string;
  output: React.ReactNode;
}

export const TerminalDrawer: React.FC<TerminalDrawerProps> = ({
  isOpen,
  onClose,
  onScrollToPricing,
  onOpenContact
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: 'welcome',
      output: (
        <div className="terminal-welcome-msg">
          <pre className="terminal-ascii">
{`   ____                 ____  _ _       
  |  _ \\ _   _ _ __ ___/ ___|(_) |_ ___ 
  | |_) | | | | '__/ _ \\___ \\| | __/ _ \\
  |  __/| |_| | | |  __/___) | | ||  __/
  |_|    \\__,_|_|  \\___|____/|_|\\__\\___|`}
          </pre>
          <p>
            Willkommen im PureSite Terminal. Handgeschrieben von HTL Kaindorf Entwicklern.
          </p>
          <p className="terminal-hint">
            Tippe <span className="term-highlight">help</span> für alle Befehle oder <span className="term-highlight">preis</span> für den Kalkulator.
          </p>
        </div>
      )
    }
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Scroll to bottom on new history
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    let outputNode: React.ReactNode = null;

    switch (trimmed) {
      case 'help':
        outputNode = (
          <div className="terminal-cmd-list">
            <p><strong>Verfügbare Befehle:</strong></p>
            <div className="cmd-row"><span className="term-cmd">preis / calc</span> - Zum interaktiven Modul-Kalkulator springen</div>
            <div className="cmd-row"><span className="term-cmd">demos</span> - 18 Live-Demos ansehen</div>
            <div className="cmd-row"><span className="term-cmd">stack</span> - Tech-Stack & Architektur anzeigen</div>
            <div className="cmd-row"><span className="term-cmd">htl / team</span> - Wer hinter PureSite steht (HTL Kaindorf)</div>
            <div className="cmd-row"><span className="term-cmd">kontakt</span> - Unverbindliches Projektgespräch anfragen</div>
            <div className="cmd-row"><span className="term-cmd">time</span> - Lokale Uhrzeit in der Steiermark</div>
            <div className="cmd-row"><span className="term-cmd">whoami</span> - Wer bist du?</div>
            <div className="cmd-row"><span className="term-cmd">clear</span> - Terminal-Fenster leeren</div>
            <div className="cmd-row"><span className="term-cmd">exit / quit</span> - Terminal schließen</div>
          </div>
        );
        break;

      case 'preis':
      case 'kalkulator':
      case 'calc':
        outputNode = (
          <p className="text-success">
            ✓ Springe zum Festpreis-Kalkulator...
          </p>
        );
        setTimeout(() => {
          onClose();
          onScrollToPricing();
        }, 500);
        break;

      case 'demos':
        outputNode = (
          <p className="text-success">
            ✓ Zu den Live-Demos...
          </p>
        );
        setTimeout(() => {
          onClose();
          onScrollToPricing();
        }, 500);
        break;

      case 'stack':
        outputNode = (
          <div className="terminal-stack-info">
            <p><strong>PureSite High-Performance Stack:</strong></p>
            <ul>
              <li><strong>Frontend:</strong> React 19, TypeScript, Vite 8, Pure CSS (No Heavy Frameworks)</li>
              <li><strong>Performance:</strong> Lighthouse 100/100, Ø 0.4s FCP, 0 WordPress Plugins</li>
              <li><strong>Datenschutz:</strong> 100% DSGVO, 0 Tracker Cookies nötig, Serverstandort Österreich</li>
              <li><strong>Hosting:</strong> Hochperformante NVMe-Cluster mit HTTP/3 & SSL-Zertifikaten</li>
            </ul>
          </div>
        );
        break;

      case 'htl':
      case 'team':
      case 'founders':
        outputNode = (
          <div className="terminal-team-info">
            <p><strong>Die Gründer:</strong></p>
            <p>• <strong>Maximilian Schlacher:</strong> Web-Entwicklung & UI/UX (HTL Kaindorf)</p>
            <p>• <strong>Loreno Zanaboni:</strong> Softwarearchitektur & Systeme (HTL Kaindorf)</p>
            <p className="mt-1">Gegründet in der Steiermark als Antwort auf langsame 8.000 € WordPress-Agenturseiten.</p>
          </div>
        );
        break;

      case 'kontakt':
      case 'anfrage':
        outputNode = (
          <p className="text-success">
            ✓ Öffne Kontaktformular...
          </p>
        );
        setTimeout(() => {
          onClose();
          onOpenContact();
        }, 500);
        break;

      case 'time':
        outputNode = (
          <p>
            Lokale Zeit in Graz, Steiermark: {new Date().toLocaleTimeString('de-AT', { timeZone: 'Europe/Vienna', hour: '2-digit', minute: '2-digit', second: '2-digit' })} Uhr
          </p>
        );
        break;

      case 'whoami':
        outputNode = (
          <p>
            Du bist ein willkommener Gast auf PureSite. Willkommen im modernen Web.
          </p>
        );
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        outputNode = (
          <p className="text-error">
            Befehl nicht gefunden: "{trimmed}". Tippe <span className="term-highlight">help</span> für alle Optionen.
          </p>
        );
        break;
    }

    setHistory(prev => [...prev, { command: trimmed, output: outputNode }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="terminal-overlay" onClick={onClose}>
      <div className="terminal-drawer-modal" onClick={e => e.stopPropagation()}>
        {/* Terminal Header Bar */}
        <div className="terminal-bar">
          <div className="terminal-dots">
            <span className="dot dot-red" onClick={onClose}></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>
          <div className="terminal-title">
            <Terminal size={14} />
            <span>puresite@styria: ~ (Tippe Befehle ein)</span>
          </div>
          <button className="terminal-close-btn" onClick={onClose} aria-label="Schließen">
            <X size={15} />
          </button>
        </div>

        {/* Terminal Screen Body */}
        <div className="terminal-body" onClick={() => inputRef.current?.focus()}>
          {history.map((item, idx) => (
            <div key={idx} className="terminal-entry">
              <div className="terminal-cmd-line">
                <span className="terminal-prompt">$</span>
                <span className="terminal-entered-cmd">{item.command}</span>
              </div>
              <div className="terminal-output">{item.output}</div>
            </div>
          ))}

          {/* Current Input Line */}
          <div className="terminal-input-row">
            <span className="terminal-prompt">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="terminal-active-input"
              placeholder="help, preis, stack, htl..."
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
            <button 
              className="terminal-send-btn" 
              onClick={() => {
                handleCommand(inputVal);
                setInputVal('');
              }}
              aria-label="Befehl ausführen"
            >
              <CornerDownLeft size={13} />
            </button>
          </div>
          <div ref={bottomRef} />
        </div>

        {/* Terminal Quick Actions Footer */}
        <div className="terminal-footer-quick">
          <span className="quick-label">Schnellbefehle:</span>
          <button onClick={() => handleCommand('preis')}>preis</button>
          <button onClick={() => handleCommand('stack')}>stack</button>
          <button onClick={() => handleCommand('htl')}>htl</button>
          <button onClick={() => handleCommand('kontakt')}>kontakt</button>
          <button onClick={() => handleCommand('clear')}>clear</button>
        </div>
      </div>
    </div>
  );
};
