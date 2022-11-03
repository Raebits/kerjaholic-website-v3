

type ProjectListCardProps = {
    title?: string,
    totalColaborator?: number,
    totalTask?: number,
    creator?: string,
    createdDate?: string,
    messageUnread?: number,
    pic?: string,
    slug?: string
    onClick ?: (slug:string) => void
}
  
export default ProjectListCardProps