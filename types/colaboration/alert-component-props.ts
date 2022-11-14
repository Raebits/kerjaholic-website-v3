
type AlertComponentProps = {
    // children: React.ReactNode,
    showed?: boolean,
    setShowed?: (val:boolean) => void,
    title?: string,
    message?: string,
    isConfirmation?: (val:boolean) => void,
    icon?: string
}
  
export default AlertComponentProps