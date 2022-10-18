import SeperatorGrayComponentProps from "../../types/common/seperator-gray-component-props";

export default function SeperatorGrayComponent({ className, height, color }: SeperatorGrayComponentProps): JSX.Element {

    return (
        <div className={className + " col p-0 m-0"} style={{
                backgroundColor: (color == null)? "#F9F9F9" : color,
                height: ((height == null)? 4 : 1) + "px"
            }}>
        </div>
    )
}
  