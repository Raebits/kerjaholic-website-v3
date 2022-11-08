

type StickyHeaderProps = {
    children: React.ReactNode,
    title?: string,
    useSorting?: boolean,
    useSearching?: boolean,
    onSearching ?: (val: string) => void,
    onSorting ?: (val: string) => void,
    mainPage?: boolean,
    onBack ?: (val: boolean) => void
}
  
export default StickyHeaderProps