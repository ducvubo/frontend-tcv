import { Archive, ArchiveX, File, Inbox, LucideIcon, Send, Trash2 } from 'lucide-react'

export const conTenSideBarCompany: {
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
    link: '/dashboard/admin/company'
  },
  {
    title: 'Drafts',
    label: '9',
    icon: File,
    variant: 'ghost',
    link: '/dashboard/admin/user'
  }
]

export const conTenSideBarAdmin: {
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
    link: '/dashboard/admin/company'
  },
  {
    title: 'Drafts',
    label: '9',
    icon: File,
    variant: 'ghost',
    link: '/dashboard/admin/user'
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
