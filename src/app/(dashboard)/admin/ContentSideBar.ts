import { Archive, ArchiveX, File, Inbox, LucideIcon, Send, Trash2 } from 'lucide-react'

export const conTenSideBar: {
  title: string
  label?: string
  icon: LucideIcon
  variant: 'default' | 'ghost'
  link?: string
}[] = [
  {
    title: 'Quản lý công ty',
    label: '128',
    icon: Inbox,
    variant: 'ghost',
    link: 'company'
  },
  {
    title: 'Drafts',
    label: '9',
    icon: File,
    variant: 'ghost',
    link: 'user'
  },
  {
    title: 'Sent',
    label: '',
    icon: Send,
    variant: 'ghost'
  },
  {
    title: 'Junk',
    label: '23',
    icon: ArchiveX,
    variant: 'ghost'
  },
  {
    title: 'Trash',
    label: '',
    icon: Trash2,
    variant: 'ghost'
  },
  {
    title: 'Archive',
    label: '',
    icon: Archive,
    variant: 'ghost'
  }
]
