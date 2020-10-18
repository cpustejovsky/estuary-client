export interface Note {
  Content: string
  Category: string
  Tags: string[]
  history: History
  ID: string | null
  CompletedDate: Date
}