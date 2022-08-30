import "./index.scss"

const Skeleton =  (props) => {

    const {
        type,
        height,
        width
    } = props
    
    const classes = `skeleton ${type}`; 

    return (
        <div className={classes} style={{ height:height,width:width }}></div>
    )
}


export default Skeleton;