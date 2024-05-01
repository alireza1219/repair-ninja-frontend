import { ColumnDef } from "@tanstack/react-table"
import { Category } from "@/models/Category"

export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
]
