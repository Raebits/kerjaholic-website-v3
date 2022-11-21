

type StickyHeaderProps = {
    children: React.ReactNode,
    title?: string,
    breadcrumb?: any,
    onSearching ?: (val: string) => void,
    onSorting ?: (val: string) => void,
    onBack ?: boolean,
    onFilter ?: (val: boolean) => void
}
  
export default StickyHeaderProps