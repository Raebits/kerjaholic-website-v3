

type StickyHeaderProps = {
    children: React.ReactNode,
    title?: string,
    useSorting?: boolean,
    useSearching?: boolean
    onSearching ?: (val: string) => void
    onSorting ?: (val: string) => void
}
  
export default StickyHeaderProps