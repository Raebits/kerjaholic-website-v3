

type StickyHeaderProps = {
    children: React.ReactNode,
    title?: string,
    onSearching ?: (val: string) => void,
    onSorting ?: (val: string) => void,
    onBack ?: (val: boolean) => void
}
  
export default StickyHeaderProps