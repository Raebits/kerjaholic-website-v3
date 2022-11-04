

type ProjectListCardProps = {
    listId?: number,
    title?: string,
    totalColaborator?: number,
    totalTask?: number,
    creator?: string,
    createdDate?: string,
    messageUnread?: number,
    pic?: string,
    slug?: string,
    onClick ?: (slug:string) => void,
    done?: number,
    projectCreated?: string
}
  
export default ProjectListCardProps