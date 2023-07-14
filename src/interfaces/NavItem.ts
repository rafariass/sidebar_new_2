import { Badge } from './Badge'

export interface NavItem {
  title: string
  icon: string
  route: string
  badge: Badge | null
  elements: NavItem[]
}
