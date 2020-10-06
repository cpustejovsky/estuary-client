export interface Note {
  content: string
  category: string
  tags: string[]
  history: History
  id: string
  completedDate: Date
}