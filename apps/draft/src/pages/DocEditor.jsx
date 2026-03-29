import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FileText, Star, Share2, MoreHorizontal, ChevronDown,
  Bold, Italic, Underline, Strikethrough, Link, Image,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Indent, Outdent, MessageSquare,
  Type, Printer, Undo, Redo, CheckSquare, Menu,
  Users, MessageCircle, History, Search, Settings,
  ChevronRight, ArrowLeft
} from 'lucide-react'
import { collaborators, comments, docContent } from '../data/docs.js'

const MENU_ITEMS = ['File', 'Edit', 'View', 'Insert', 'Format', 'Tools', 'Extensions', 'Help']

function ToolbarDivider() {
  return <div className="w-px h-5 bg-[#dadce0] mx-1 shrink-0" />
}

function ToolbarBtn({ children, active, title, wide }) {
  return (
    <button
      title={title}
      className={`flex items-center justify-center rounded px-1.5 h-7 text-[13px] transition-colors shrink-0 ${
        active
          ? 'bg-[#c2e7ff] text-[#001d35]'
          : 'text-[#1f2937] hover:bg-[#f1f3f4]'
      } ${wide ? 'min-w-[80px] gap-1' : 'min-w-[28px]'}`}
    >
      {children}
    </button>
  )
}

function ColorSwatch({ color, title }) {
  return (
    <button title={title} className="flex flex-col items-center justify-center w-7 h-7 rounded hover:bg-[#f1f3f4] shrink-0">
      <Type size={13} color="#1f2937" />
      <div className="w-4 h-1 rounded-sm mt-0.5" style={{ background: color }} />
    </button>
  )
}

function OutlinePanel({ sections, activeSection, onSelect }) {
  const headings = sections.filter(s => s.type === 'h1')
  return (
    <div className="w-56 shrink-0 border-r border-[#dadce0] bg-white overflow-y-auto py-4">
      <div className="px-4 mb-3">
        <p className="text-[11px] font-medium text-[#5f6368] uppercase tracking-wider">Document outline</p>
      </div>
      <div className="space-y-0.5">
        {headings.map((h, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`w-full text-left px-4 py-1.5 text-[13px] rounded-r-full transition-colors ${
              activeSection === i
                ? 'bg-[#e8f0fe] text-[#1a73e8] font-medium'
                : 'text-[#1f2937] hover:bg-[#f8f9fa]'
            }`}
          >
            <span className="pl-1 border-l-2 border-current">{h.text}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function CommentBubble({ comment, onClose }) {
  return (
    <div
      className="absolute right-[-280px] top-0 w-64 bg-white rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.18)] border border-[#dadce0] z-20 p-3"
    >
      <div className="flex items-start gap-2 mb-2">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
          style={{ background: comment.color }}
        >
          {comment.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-semibold text-[#1f2937]">{comment.author}</p>
          <p className="text-[11px] text-[#5f6368]">{comment.time}</p>
        </div>
        <button onClick={onClose} className="text-[#5f6368] hover:text-[#1f2937] text-xs shrink-0">✕</button>
      </div>
      <p className="text-[13px] text-[#1f2937] leading-snug mb-3">{comment.text}</p>
      <div className="flex items-center gap-2">
        <input
          placeholder="Reply..."
          className="flex-1 text-[12px] border border-[#dadce0] rounded-full px-3 py-1 outline-none focus:border-[#1a73e8]"
        />
        <button className="text-[12px] text-[#1a73e8] font-medium hover:underline shrink-0">Reply</button>
      </div>
    </div>
  )
}

function DocBody({ content }) {
  const [showComment, setShowComment] = useState(true)

  return (
    <div
      className="bg-white mx-auto my-8 px-16 py-14 relative"
      style={{
        width: '816px',
        minHeight: '1056px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
      }}
    >
      {/* Title */}
      <h1
        contentEditable
        suppressContentEditableWarning
        className="text-[26pt] font-normal text-[#1f2937] mb-6 leading-tight outline-none"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        {content.title}
      </h1>

      {content.sections.map((section, idx) => {
        if (section.type === 'h1') {
          return (
            <h2
              key={idx}
              contentEditable
              suppressContentEditableWarning
              className="text-[16pt] font-normal text-[#1f2937] mt-7 mb-3 outline-none"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {section.text}
            </h2>
          )
        }

        if (section.type === 'p') {
          return (
            <p
              key={idx}
              contentEditable
              suppressContentEditableWarning
              className="text-[11pt] text-[#1f2937] leading-relaxed mb-3 outline-none"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              {section.text}
            </p>
          )
        }

        if (section.type === 'ul') {
          return (
            <ul key={idx} className="mb-3 ml-6 space-y-1">
              {section.items.map((item, i) => {
                // Highlight the first item (Non-Goals heading area) and attach comment
                const isHighlighted = i === 0 && idx === 5
                return (
                  <li
                    key={i}
                    className="text-[11pt] text-[#1f2937] leading-relaxed relative"
                    style={{ fontFamily: 'Arial, sans-serif', listStyleType: 'disc' }}
                  >
                    {isHighlighted ? (
                      <span className="relative">
                        <span className="comment-highlight">{item}</span>
                        {showComment && (
                          <CommentBubble
                            comment={comments[0]}
                            onClose={() => setShowComment(false)}
                          />
                        )}
                      </span>
                    ) : item}
                  </li>
                )
              })}
            </ul>
          )
        }

        if (section.type === 'ol') {
          return (
            <ol key={idx} className="mb-3 ml-6 space-y-1">
              {section.items.map((item, i) => (
                <li
                  key={i}
                  className="text-[11pt] text-[#1f2937] leading-relaxed"
                  style={{ fontFamily: 'Arial, sans-serif', listStyleType: 'decimal' }}
                >
                  {item}
                </li>
              ))}
            </ol>
          )
        }

        if (section.type === 'table') {
          return (
            <div key={idx} className="my-4 overflow-x-auto">
              <table className="doc-table">
                <thead>
                  <tr>
                    {section.headers.map((h, i) => (
                      <th key={i}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.rows.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) => (
                        <td key={ci}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }

        return null
      })}
    </div>
  )
}

export default function DocEditor() {
  const navigate = useNavigate()
  const [docTitle, setDocTitle] = useState('Product Requirements Document')
  const [starred, setStarred] = useState(false)
  const [activeSection, setActiveSection] = useState(0)
  const [showOutline, setShowOutline] = useState(true)
  const [activeMenu, setActiveMenu] = useState(null)

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      {/* Top bar — logo + title + actions */}
      <div className="bg-white border-b border-[#dadce0] px-3 pt-2 pb-0">
        {/* Row 1: logo, title, share */}
        <div className="flex items-center gap-2 mb-1">
          <button onClick={() => navigate('/')} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f1f3f4] transition-colors">
            <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: '#e8f0fe' }}>
              <FileText size={16} color="#1a73e8" />
            </div>
          </button>

          {/* Title + metadata */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                className="text-[18px] text-[#1f2937] font-medium bg-transparent outline-none border border-transparent hover:border-[#dadce0] focus:border-[#1a73e8] rounded px-1 py-0.5 min-w-[200px]"
              />
              <button
                onClick={() => setStarred(!starred)}
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#f1f3f4] transition-colors"
                title={starred ? 'Unstar' : 'Star'}
              >
                <Star
                  size={15}
                  fill={starred ? '#fbbc04' : 'none'}
                  color={starred ? '#fbbc04' : '#5f6368'}
                />
              </button>
              <button className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#f1f3f4] transition-colors" title="Move to folder">
                <MoreHorizontal size={15} color="#5f6368" />
              </button>
            </div>
            <div className="flex items-center gap-3 pl-1">
              <span className="text-[11px] text-[#5f6368]">All changes saved in Drive</span>
            </div>
          </div>

          {/* Right: collaborators + share */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Collaborator avatars */}
            <div className="flex items-center gap-1 mr-1">
              <span className="text-[12px] text-[#5f6368] mr-1">2 others editing</span>
              <div className="flex -space-x-1.5">
                {collaborators.slice(0, 3).map((c) => (
                  <div
                    key={c.id}
                    title={`${c.name} — ${c.cursor}`}
                    className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold cursor-pointer"
                    style={{ background: c.color }}
                  >
                    {c.initials}
                  </div>
                ))}
              </div>
            </div>
            {/* Comment button */}
            <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f1f3f4] transition-colors">
              <MessageSquare size={16} color="#5f6368" />
            </button>
            {/* Share button */}
            <button
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-white text-[14px] font-medium transition-colors"
              style={{ background: '#1a73e8' }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#1557b0'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#1a73e8'}
            >
              <Share2 size={14} />
              Share
            </button>
            {/* More options */}
            <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f1f3f4] transition-colors">
              <MoreHorizontal size={16} color="#5f6368" />
            </button>
          </div>
        </div>

        {/* Menu bar */}
        <div className="flex items-center gap-0">
          {MENU_ITEMS.map((item) => (
            <button
              key={item}
              className={`px-3 py-1.5 text-[13px] rounded transition-colors ${
                activeMenu === item
                  ? 'bg-[#e8f0fe] text-[#1a73e8]'
                  : 'text-[#1f2937] hover:bg-[#f1f3f4]'
              }`}
              onClick={() => setActiveMenu(activeMenu === item ? null : item)}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Formatting toolbar */}
        <div className="flex items-center gap-0.5 py-1.5 overflow-x-auto">
          {/* Undo / Redo */}
          <ToolbarBtn title="Undo (Ctrl+Z)"><Undo size={14} /></ToolbarBtn>
          <ToolbarBtn title="Redo (Ctrl+Y)"><Redo size={14} /></ToolbarBtn>
          <ToolbarBtn title="Print"><Printer size={14} /></ToolbarBtn>

          <ToolbarDivider />

          {/* Zoom */}
          <ToolbarBtn wide title="Zoom">
            <span className="text-[12px]">100%</span>
            <ChevronDown size={11} />
          </ToolbarBtn>

          <ToolbarDivider />

          {/* Paragraph style */}
          <ToolbarBtn wide title="Paragraph styles">
            <span className="text-[12px]">Normal text</span>
            <ChevronDown size={11} />
          </ToolbarBtn>

          <ToolbarDivider />

          {/* Font name */}
          <ToolbarBtn wide title="Font">
            <span className="text-[12px] font-medium">Inter</span>
            <ChevronDown size={11} />
          </ToolbarBtn>

          {/* Font size */}
          <ToolbarBtn title="Font size">
            <span className="text-[12px] w-5 text-center">11</span>
          </ToolbarBtn>

          <ToolbarDivider />

          {/* Formatting */}
          <ToolbarBtn title="Bold (Ctrl+B)"><Bold size={14} /></ToolbarBtn>
          <ToolbarBtn title="Italic (Ctrl+I)"><Italic size={14} /></ToolbarBtn>
          <ToolbarBtn title="Underline (Ctrl+U)"><Underline size={14} /></ToolbarBtn>
          <ToolbarBtn title="Strikethrough"><Strikethrough size={14} /></ToolbarBtn>

          <ToolbarDivider />

          {/* Colors */}
          <ColorSwatch color="#ea4335" title="Text color" />
          <button title="Highlight" className="flex flex-col items-center justify-center w-7 h-7 rounded hover:bg-[#f1f3f4] shrink-0">
            <span className="text-[11px] font-bold text-[#1f2937]">A</span>
            <div className="w-4 h-1 rounded-sm mt-0.5" style={{ background: '#fbbc04' }} />
          </button>

          <ToolbarDivider />

          {/* Link + Image */}
          <ToolbarBtn title="Insert link"><Link size={14} /></ToolbarBtn>
          <ToolbarBtn title="Insert image"><Image size={14} /></ToolbarBtn>
          <ToolbarBtn title="Insert comment"><MessageSquare size={14} /></ToolbarBtn>

          <ToolbarDivider />

          {/* Alignment */}
          <ToolbarBtn active title="Align left"><AlignLeft size={14} /></ToolbarBtn>
          <ToolbarBtn title="Align center"><AlignCenter size={14} /></ToolbarBtn>
          <ToolbarBtn title="Align right"><AlignRight size={14} /></ToolbarBtn>
          <ToolbarBtn title="Justify"><AlignJustify size={14} /></ToolbarBtn>

          <ToolbarDivider />

          {/* Lists */}
          <ToolbarBtn title="Bulleted list"><List size={14} /></ToolbarBtn>
          <ToolbarBtn title="Numbered list"><ListOrdered size={14} /></ToolbarBtn>
          <ToolbarBtn title="Checklist"><CheckSquare size={14} /></ToolbarBtn>

          <ToolbarDivider />

          {/* Indent */}
          <ToolbarBtn title="Decrease indent"><Outdent size={14} /></ToolbarBtn>
          <ToolbarBtn title="Increase indent"><Indent size={14} /></ToolbarBtn>
        </div>
      </div>

      {/* Body: outline + ruler + doc */}
      <div className="flex flex-1 overflow-hidden">
        {/* Outline sidebar */}
        {showOutline && (
          <OutlinePanel
            sections={docContent.sections}
            activeSection={activeSection}
            onSelect={setActiveSection}
          />
        )}

        {/* Main scroll area */}
        <div className="flex-1 overflow-y-auto doc-scroll bg-[#f8f9fa]">
          {/* Page ruler */}
          <div className="ruler sticky top-0 z-10 flex items-center" style={{ width: '100%' }}>
            <div className="mx-auto flex items-end gap-0" style={{ width: '816px' }}>
              {/* Ruler tick marks */}
              {Array.from({ length: 21 }).map((_, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  {i % 2 === 0 && (
                    <span className="text-[9px] text-[#5f6368] leading-none mb-0.5">{i / 2}</span>
                  )}
                  <div className={`w-px bg-[#9aa0a6] ${i % 2 === 0 ? 'h-3' : 'h-1.5'}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Document page */}
          <DocBody content={docContent} />
        </div>

        {/* Right panel: comments toggle (collapsed) */}
        <div className="w-10 shrink-0 bg-white border-l border-[#dadce0] flex flex-col items-center py-3 gap-3">
          <button
            title="Show comments"
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f1f3f4] transition-colors"
          >
            <MessageCircle size={15} color="#5f6368" />
          </button>
          <button title="Show history" className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f1f3f4] transition-colors">
            <History size={15} color="#5f6368" />
          </button>
          <button title="Outline" onClick={() => setShowOutline(!showOutline)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f1f3f4] transition-colors">
            <Menu size={15} color={showOutline ? '#1a73e8' : '#5f6368'} />
          </button>
        </div>
      </div>
    </div>
  )
}