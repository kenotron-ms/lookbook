import { FolderOpen, Share2, Link2, Download, FolderInput, Star, Edit3, Trash2 } from 'lucide-react';
import { useEffect, useRef } from 'react';

const menuItems = [
  { icon: FolderOpen, label: 'Open', action: 'open' },
  { icon: Share2, label: 'Share', action: 'share' },
  { icon: Link2, label: 'Get link', action: 'link' },
  { icon: Download, label: 'Download', action: 'download', dividerBefore: false, dividerAfter: true },
  { icon: FolderInput, label: 'Move to', action: 'move' },
  { icon: Star, label: 'Add to Starred', action: 'star' },
  { icon: Edit3, label: 'Rename', action: 'rename', dividerAfter: true },
  { icon: Trash2, label: 'Remove', action: 'remove', danger: true },
];

export default function ContextMenu({ x, y, file, onClose }) {
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  // Adjust position so menu doesn't go off-screen
  const adjustedX = x + 220 > window.innerWidth ? x - 220 : x;
  const adjustedY = y + menuItems.length * 40 > window.innerHeight ? y - menuItems.length * 40 : y;

  function handleAction(action) {
    onClose();
  }

  return (
    <div
      ref={menuRef}
      className="context-menu"
      style={{ left: adjustedX, top: adjustedY }}
    >
      {menuItems.map((item, i) => (
        <div key={item.action}>
          {item.dividerBefore && <div className="context-menu-divider" />}
          <div
            className={`context-menu-item ${item.danger ? 'danger' : ''}`}
            onClick={() => handleAction(item.action)}
          >
            <item.icon size={16} style={{ color: item.danger ? '#d93025' : '#5f6368' }} />
            <span>{item.label}</span>
          </div>
          {item.dividerAfter && <div className="context-menu-divider" />}
        </div>
      ))}
    </div>
  );
}
